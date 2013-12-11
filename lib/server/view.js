/*
 * Copyright (c) 2013, Yahoo! Inc.  All rights reserved.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE file for terms.
 */

/*jslint node: true, nomen: true */

'use strict';

function expressView(app) {

    if (app['@view']) { return app; }

    // Brand.
    Object.defineProperty(app, '@view', {
        value: expressView
    });

    // Modifies the Express `app`.
    app.set('view', function (name, options) {
        options = options || {};
        return {
            // piping the important pieces to shim the view instance
            name: name,
            path: 'synthetic/' + name,
            render: function (opts, fn) {
                var ViewClass = opts.__views__[name].type,
                    layout = opts.layout || app.get('layout'),
                    callback = fn,
                    view;

                if (layout) {
                    callback = function (err, html) {
                        // super hack for the layout composition
                        app.yui.use('photonews-template-' + layout);
                        // todo: propagate context from opts to 1st argument
                        // to preserve the engine helpers
                        fn(null, app.yui._Y.Template.get('photonews/' + layout)({
                            name: name,
                            output: html,
                            // todo, this should be in handlebars-helpers, not in here!
                            viewOutlet: function () {
                                return '<div class="' + this.name + '-view">' + this.output + '</div>';
                            }
                        }));
                    };
                }
                view = new ViewClass({
                    locals: opts
                });
                view.render();
                // render is async, and this is a hack to collect output from the
                // view render() when on the server side
                callback(null, view.get('output'));
            }
        };
    });

    return app;
}

exports.extend = expressView;
