/*
 * Copyright (c) 2013, Yahoo! Inc.  All rights reserved.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE.txt file for terms.
 */

/*jslint nomen:true, node:true*/
/*jshint expr:true*/

/**
@module renderer
**/

'use strict';

var isPromise = require('yui/promise').Promise.isPromise,
    batch = require('yui/promise').batch,
    mix = require('yui/yui').mix;

function render(options) {
    options || (options = {});
    return function (req, res, next) {

        var _render;

        _render = res.render.bind(res);

        function errorReport(err) {
            next(err); // give control back to express
        }

        /**
         * @param {String} name
         * @param {Object|Promise} ctx
         */
        res.render = function (name, ctx) {

            var pageTemplateName = name,
                pageTemplateData,
                promises = [],
                key,
                namespace = 'DATA.' + name;

            ctx || (ctx = {});

            // TODO centralize res.expose in a single place

            if (isPromise(ctx)) {
                ctx.then(function (data) {
                    if (Array.isArray(data)) {
                        pageTemplateData = { items: data };
                    } else {
                        pageTemplateData = data || {};
                    }
                    res.expose(pageTemplateData, namespace);
                    pageTemplateData.viewName = name;
                    // TODO this belong to the render engine
                    pageTemplateData.viewOutlet = function () {
                        return '<div class="' + this.viewName + '-view">' + this.outlet + '</div>';
                    };
                    _render(pageTemplateName, pageTemplateData);
                }, errorReport)
                .then(null, errorReport);
            } else {
                if (Object.prototype.toString.call(ctx) !== '[object Object]') {
                    return errorReport(new Error('controller should be an object or a promise'));
                }

                for (key in ctx) {
                    if (ctx.hasOwnProperty(key)) {
                        if (isPromise(ctx[key])) {
                            promises.push(ctx[key]);
                        }
                    }
                }
                if (promises.length > 0) {
                    batch.apply(batch, promises)
                        .then(function (data) {
                            var merged = {};

                            if (Array.isArray(data)) {
                                Array.forEach(function (d) {
                                    merged = mix(merged, d);
                                });
                            } else {
                                merged = data;
                            }
                            res.expose(merged, namespace);
                            _render(pageTemplateName, merged);

                        }, errorReport)
                        .then(null, errorReport);
                } else {
                    res.expose(ctx, namespace);
                    _render(pageTemplateName, ctx);
                }
            }
        };
        next();
    };
}


module.exports = render;
