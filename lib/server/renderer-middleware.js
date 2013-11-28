/*jslint nomen:true, node:true*/
/*jshint expr:true*/

/**
@module renderer
**/

'use strict';

var isPromise = require('yui/promise').Promise.isPromise,
    batch = require('yui/promise').batch,
    mix = require('yui/yui').mix;

function PNRenderer(name) {

    return function (req, res, next) {

        var _expressRender = res.render.bind(res),
            Y = req.app.yui._Y;

        // _render = res.render.bind(res);

        function _render(name, data) {
            var ViewClass = Y.Views[Y.PNUtil.classify(name + '-view')] || Y.BaseView,
                foo = new ViewClass({
                    locals: data
                });
            foo.render();
            _expressRender(req.app.set('hack-layout'), {
                viewName: name,
                // TODO this belong to the render engine
                viewOutlet: function () {
                    return '<div class="' + this.viewName + '-view">' + this.outlet + '</div>';
                },
                outlet: foo.get('output')
            });
        };

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


module.exports = PNRenderer;
