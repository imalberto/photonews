/*jslint node: true, nomen: true */

/**
`locator` plugin that extends `express` `app`.

Usage:

    var express = require('express'),
        app = express(),
        view = require('./lib/server/view');

    view.extend(app);

@module lib/server/view
**/

'use strict';

var utils = require('connect').utils;

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
                var ViewClass = opts.controller.views[name].type,
                    layout = opts.layout || app.get('layout'),
                    callback = fn,
                    view;

                if (layout) {
                    callback = function (err, html) {
                        var o = utils.merge({
                            name: name,
                            output: html,
                            // todo, this should be in handlebars-helpers, not in here!
                            viewOutlet: function () {
                                return '<div class="' + this.name + '-view">' + this.output + '</div>';
                            }
                        }, opts);
                        // super hack for the layout composition
                        app.yui.use('photonews-template-' + layout);
                        fn(null, app.yui._Y.Template.get('photonews/' + layout)(o));
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
