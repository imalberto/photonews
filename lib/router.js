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
    expyui = require('express-yui');


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
        Y = app.yui._Y,
        callbacks = [],
        handlers,
        handler;

    path || (path = '/' + name);

    if (typeof path !== 'function') {
        if (arguments.length > 2) {
            callbacks = [].slice.call(arguments, 2);
        }
    } else {
        callbacks = [].slice.call(arguments, 1);
    }

    handlers = [path, expyui.expose()];

    app.controller(name);
    app.model(name);

    if (callbacks.length === 0) {
        handler = app.handler(name) || Y.Handlers.DefaultHandler(name);

        handlers.push(handler);
    } else {
        // TODO validate that they are middleware like functions
        handlers = handlers.concat(callbacks);
    }

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

        app.use(require('./middleware/renderer')());
        debug('lib/router init OK');
    }

    return app;
}


module.exports = {
    extend: extend,
    expose: expose
};
