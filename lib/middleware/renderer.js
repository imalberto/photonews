
/*jslint nomen:true, node:true*/
/*jshint expr:true*/

/**
@module renderer
**/

'use strict';

function render(options) {
    options || (options = {});
    return function (req, res, next) {

        var _render;

        _render = res.render.bind(res);

        /**
         * @param {String} name
         * @param {Object} ctx
         */
        res.render = function (name, ctx) {

            ctx || (ctx = {});

            if (typeof ctx !== 'undefined' && typeof ctx.then === 'function') {
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
                _render(name, ctx);
            }
        };
        next();
    };
}


module.exports = render;
