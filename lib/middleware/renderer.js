
/*jslint nomen:true, node:true*/
/*jshint expr:true*/

/**
@module renderer
**/

'use strict';

var isPromise = require(__dirname + '/../js/util').isPromise,
    batch = require('yui/promise').batch,
    mix = require('yui/yui').mix;

function render(options) {
    options || (options = {});
    return function (req, res, next) {

        var _render;

        _render = res.render.bind(res);

        /**
         * @param {String} name
         * @param {Object|Promise} ctx
         */
        res.render = function (name, ctx) {

            var promises = [],
                key;

            ctx || (ctx = {});

            if (isPromise(ctx)) {
                // TODO Use Y.Promise to determine if this a promise, vs using .then
                ctx.then(function (data) {
                    var pageTemplateName = name + '-page',
                        templateData;

                    if (Array.isArray(data)) {
                        templateData = { items: data };
                    } else {
                        templateData = data;
                    }

                    /**
                    res.render('foo', {
                        bar: 1,
                        foo: newYPromise
                    })
                    **/
                    _render(pageTemplateName, templateData);
                }, function (err) {
                    console.error('** ERROR **: res.render failed: %s', err);
                    next(err); // give control back to express
                });
            } else {
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
                            // merge the data if necessary
                            if (Array.isArray(data)) {
                                Array.forEach(function (d) {
                                    merged = mix(merged, d);
                                });
                            } else {
                                merged = data;
                            }
                            _render(name, merged);
                        });
                } else {
                    _render(name, ctx);
                }
            }
        };
        next();
    };
}


module.exports = render;
