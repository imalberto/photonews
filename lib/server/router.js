/*
 * Copyright (c) 2013, Yahoo! Inc.  All rights reserved.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE.txt file for terms.
 */

/*jslint nomen:true, node:true*/
/*jshint expr:true*/
/*global page*/

/**
`router` plugin that extends `express` `app`.

Usage:

    var express = require('express'),
        app = express(),
        router = require('./lib/router');

    router.extend(app);

@module router
**/

'use strict';

var debug = require('debug')('lib:router'),
    expann = require('express-annotations'),
    expmap = require('express-map'),
    expstate = require('express-state'),
    expyui = require('express-yui'),
    PNRenderer = require('./renderer-middleware');

/**
Exposes the modules loader metadata and the routes configuration to the
user agent.

@method expose
**/
function expose() {
    var init = false;
    return function (req, res, next) {
        var app = req.app;
        if (!init) {
            app.expose({
                ROUTES: app.getRouteMap()
            });
            init = true;
        }
        next();
    };
}



/**
@method page
@param {String} name
@param {String} path
@return {ExpressApp}
**/
function page(name, path) {
    /*jshint validthis:true */
    var app = this,
        callbacks = [],
        handlers;

    path || (path = '/' + name);

    if (typeof path !== 'function') {
        if (arguments.length > 2) {
            callbacks = [].slice.call(arguments, 2);
        }
    } else {
        callbacks = [].slice.call(arguments, 1);
    }

    handlers = [path, expyui.expose(), PNRenderer(name)].concat(callbacks);
    handlers.push(function (req, res, next) {
        // this is the last middleware in the callback list, and
        // it will always try to dispatch a page based on the `app.page() definition
        req.app.yui.use('dispatcher-middleware', function (Y) {
            Y.PNDispatcher(name)(req, res, next);
        });
    });

    app.get.apply(app, handlers);
    app.map(path, name);

    return app;
}

/**
@method extend
**/
function extend(app, brand) {
    if (!app[brand]) {
        Object.defineProperty(app, brand || '@modown-router', { value: true });

        expmap.extend(app);
        expann.extend(app);
        expstate.extend(app);

        app.page = page;

        debug('lib/router init OK');
    }

    return app;
}


module.exports = {
    extend: extend,
    expose: expose
};
