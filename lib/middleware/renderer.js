
/*jslint nomen:true, node:true*/

/**
server side renderer
**/

function render(options) {
    return function (req, res, next) {

        var _render;

        _render = res.render.bind(res);

        /**
         * @param {String} name
         * @param {Object} ctx
         */
        res.render = function (name, ctx) {
            if (typeof ctx !== "undefined" && typeof ctx.then === 'function') {

                // handle batch 
                // ctx.then(function (data) {
                //     var outlet;
                //     // assert(Array.isArray(data), 'data has to be an Array');

                //     if (data.length === 1 && Array.isArray(data[0])) {
                //         outlet = { items: data[0] };
                //     } else {
                //         outlet = data;
                //     }

                //     _render(name, outlet);
                // }, function (err) {
                //     console.error('** ERROR **: res.render failed: %s', err);
                //     _render('error');
                // });

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
