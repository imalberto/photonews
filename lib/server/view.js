/*jslint node: true, nomen: true */
/* jshint -W064 */

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

var utils = require('connect').utils,
    React = require('react-tools').React;

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
                var ComponentClass = opts.controller.views[name].component,
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
                                return this.output;
                            }
                        }, opts);
                        // super hack for the layout composition
                        app.yui.use('photonews-template-' + layout);
                        fn(null, app.yui._Y.Template.get('photonews/' + layout)(o));
                    };
                }

                view = ComponentClass(opts);
                React.renderComponentToString(view, function (html) {
                    callback(null, html);
                });
            }
        };
    });

    return app;
}

exports.extend = expressView;
