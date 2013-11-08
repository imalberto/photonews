
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
         * Example usage:
         *
         *     res.render('foo', Y.Controllers.MyCustomController);
         *     res.render('foo', new Y.Promise(//load model//));
         *     res.render('foo', {
         *         value: '1',
         *         loader: new Y.Promise(//load model//)
         *     });
         *     res.render('foo', {
         *         value: '1',
         *         laodData1: new Y.Promise(//load model//),
         *         laodData2: new Y.Promise(//load model//)
         *     });
         *
         * @param {String} name
         * @param {Object|Promise} ctx
         */
        res.render = function (name, ctx) {

            var pageTemplateName = name + '-page',
                pageTemplateData,
                promises = [],
                key;

           ctx || (ctx = {});

           // TODO centralize res.expose in a single place

            if (isPromise(ctx)) {
                // TODO Use Y.Promise to determine if this a promise, vs using .then
                ctx.then(function (data) {

                    if (Array.isArray(data)) {
                        pageTemplateData = { items: data };
                    } else {
                        pageTemplateData = data;
                    }
                    res.expose(pageTemplateData, 'DATA');
                    _render(pageTemplateName, pageTemplateData);
                }, function (err) {
                    console.error('** ERROR **: res.render failed: %s', err);
                    next(err); // give control back to express
                });
            } else {
                if (Object.prototype.toString.call(ctx) !== '[object Object]') {
                    return next(new Error('controller should be an object or a promise'));
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
                            // merge the data if necessary
                            if (Array.isArray(data)) {
                                Array.forEach(function (d) {
                                    merged = mix(merged, d);
                                });
                            } else {
                                merged = data;
                            }
                            res.expose(merged, 'DATA');
                            _render(pageTemplateName, merged);

                        }, function (err) {
                            next(err);
                        });
                } else {
                    res.expose(ctx, 'DATA');
                    _render(pageTemplateName, ctx);
                }
            }
        };
        next();
    };
}


module.exports = render;
