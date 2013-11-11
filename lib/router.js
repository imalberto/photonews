/*
 * Copyright (c) 2013, Yahoo! Inc.  All rights reserved.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE.txt file for terms.
 */

/*jslint nomen:true, node:true*/
/*jshint expr:true*/
/*global getViewsConfig, registerHandlers, registerControllers,
  registerModels, page, handler, model, controller*/

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
    classify = require('./js/util').classify;

/**
@public
**/
function extend(app, brand) {
    if (!app[brand]) {
        Object.defineProperty(app, brand || '@modown-router', { value: true });

        expmap.extend(app);
        expann.extend(app);
        expstate.extend(app);

        app._controllers = {};
        app._handlers = {};
        app._models = {};

        app.controller = controller;
        app.handler = handler;
        app.model = model;
        app.page = page;

        app.getViewsConfig = getViewsConfig;
        app.getServerModules = getServerModules;

        app.use(require('./middleware/renderer')());
    }

    return app;
}

/**
@method getServerModules 
@public
**/
function getServerModules() {
    /*jshint validthis:true*/
    var app = this,
        serverModules;

    serverModules = Object.keys(app.yui._serverModules).filter(function (modName) {
        if (modName.indexOf('-template-') === -1) {
            return true;
        }
        return false;
    });
    return serverModules;
}


/**
@method expose
@public
**/
function expose() {
    var init = false;
    return function (req, res, next) {
        var app = req.app;
        if (!init) {
            app.expose({
                CLIENT_MODULES: Object.keys(app.yui._clientModules),
                ROUTES: app.getRouteMap(),
                VIEWS: app.getViewsConfig()
            });
            init = true;
        }
        next();
    };
}


///////////////////////////////////////////////////////////////////////////////


/**
@method page
@public
@param {String} name
@param {String} path
@return {ExpressApp}
**/
function page(name, path) {
    /*jshint validthis:true */
    var app = this,
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

    if (callbacks.length === 0) {
        handler = app.handler(name) || function (req, res) {

            var app = req.app,
                Y = app.yui.use(),
                ControllerClass,
                ModelClass,
                controller,
                model;

            ControllerClass = app.controller(name);
            ModelClass = app.model(name);

            if (ModelClass) {
                model = new ModelClass(req.params);
            } else {
                model = new Y.Models.DefaultModel(req.params);
            }

            if (ControllerClass) {
                controller = new ControllerClass({model: model});
            } else {
                controller = new Y.Controllers.DefaultController({model: model});
            }

            res.render(name, controller);
        };
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
@method getViewsConfig
@public
@return {Object}
**/
function getViewsConfig() {
    /*jshint validthis:true */
    var app = this,
        routes,
        views;

    routes = app.getRouteMap();
    views = {};
    Object.keys(routes).forEach(function (name) {
        views[name] = {
            type: 'Views.' + classify(name) + 'View',
            preserve: false
        };
    });

    return views;
}


///////////////////////////////////////////////////////////////////////////////

/**
@method controller
@public
@param {String} name
**/
function controller(name) {
    /*jshint validthis:true*/
    var app = this,
        Y = app.yui.use(),
        controllerName = classify(name + '-controller');

    if (!app._controllers[name] && Y.Controllers[controllerName]) {
        app._controllers[name] = Y.Controllers[controllerName];
        debug('Register controller "%s" OK', name);
    }

    return app._controllers[name];
}

/**
@method model 
@public
@param {String} name
**/
function model(name) {
    /*jshint validthis:true*/
    var app = this,
        Y = app.yui.use(),
        modelName = classify(name + '-model');

    if (!app._models[name] && Y.Models[modelName]) {
        app._models[name] = Y.Models[modelName];
        debug('Register model "%s" OK', name);
    }
    return app._models[name];
}

// res.expose(model, 'model'); /// app.model()

/**
@method handler
@public
@param {String} name
**/
function handler(name) {
    /*jshint validthis:true*/
    var app = this,
        Y = app.yui.use(),
        handlerName = classify(name + '-handler');

    if (!app._handlers[name] && Y.Handlers[handlerName]) {
        app._handlers[name] = Y.Handlers[handlerName];
        debug('Registered handler "%s" OK', name);
    }
    return app._handlers[name];
}


module.exports = {
    extend: extend,
    expose: expose
};

