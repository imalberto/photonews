
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

                ctx.then(function (data) {
                    var pageTemplateName = name + '-page',
                        outlet;

                    if (Array.isArray(data)) {
                        outlet = { items: data };
                    } else {
                        outlet = data;
                    }

                    _render(pageTemplateName, outlet);
                }, function (err) {
                    console.error('** ERROR **: res.render failed: %s', err);
                    _render('error');
                });

            } else {
                _render(name, ctx);
            }
        };
        next();
    };
}


module.exports = render;
