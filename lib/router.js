
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
    expyui = require('express-yui'),
    classify;

/**
@public
**/
function extend(app, brand) {
    if (!app[brand]) {
        var Y = app.yui.use();

        classify = Y.PN.util.classify;

        Object.defineProperty(app, brand || '@modown-router', { value: true });

        expmap.extend(app);
        expann.extend(app);


        app._controllers = {};
        app._handlers = {};
        app._models = {};

        app.controller = controller;
        app.handler = handler;
        app.model = model;
        app.page = page;
        app.registerHandlers = registerHandlers;
        app.registerControllers = registerControllers;
        app.registerModels = registerModels;

        // app.mapRoute = mapRoute;
        app.getViewsConfig = getViewsConfig;

        app.use(require('./middleware/renderer')());


        app.registerHandlers();
        app.registerModels();
        app.registerControllers();
    }

    return app;
}




///////////////////////////////////////////////////////////////////////////////
// Attached to `app`
///////////////////////////////////////////////////////////////////////////////

/**
Given `name` is set to "foo", the following will be inferred:
- path = "/foo"
- controller: "foo-controller"
- model: "foo-model"
- handler: "foo-handler"

@param {String} name
@param {String} path
**/
function page(name, path) {
    /*jshint validthis:true */
    var app = this,
        callbacks = [],
        handlers,
        handler;

    path || (path = '/' + name);

    if (typeof path !== 'function') {
        // page('foo')
        // page('foo', '/foo')
        // page('foo', '/foo', handler)
        if (arguments.length > 2) {
            callbacks = [].slice.call(arguments, 2);
        }
    } else {
       path || (path = '/' + name);
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

    // app.get(path, expyui.expose(), handler);
    app.get.apply(app, handlers);
    app.map(path, name);
}

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

function registerControllers() {
    /*jshint validthis:true*/
    var app = this,
        Y = app.yui.use(),
        names;

    // TODO use locator to figure out those 
    names = [
        'news',
        'photos'
    ];

    names.forEach(function (name) {
        var controllerName = name + '-controller';
        app.controller(name, Y.Controllers[classify(controllerName)]);
    });
    debug('Register Controllers OK');
}

function registerModels() {
    /*jshint validthis:true*/
    var app = this,
        Y = app.yui.use(),
        names;

    // TODO use locator to figure out those
    names = [
        // Add more route names here
        'news',
        'photos'
    ];

    names.forEach(function (name) {
        // app.model(name, require(libpath.resolve(__dirname, '..', 'models2/' + name)));
        //
        // The model name does not infer if it is a Y.Model vs Y.ModelList
        var modelName = name + '-model';

        app.model(name, Y.Models[classify(modelName)]);
    });
    debug('Register Models OK');
}

function registerHandlers() {
    /*jshint validthis:true*/
    var app = this,
        Y = app.yui.use(),
        // not using 'photos-handler', but instead using the default one
        // handlers = ['home', 'news', 'about'];
        handlers = [];

    handlers.forEach(function (name) {
        app.handler(name, Y.Handlers[classify(name + '-handler')]);
    });

    // handlers.forEach(function (name) {
    //     app.handler(name, require(libpath.resolve(__dirname, '..', 'routes/' + name)));
    // });
    debug('Register Handlers OK');
}


///////////////////////////////////////////////////////////////////////////////

// Simple registry-like functions to store and lookup meta classes


function controller(name, controllerClass) {
    /*jshint validthis:true*/
    if (controllerClass) {
        this._controllers[name] = controllerClass;
        debug('Register controller "%s" OK', name);
    }
    return this._controllers[name];
}

function model(name, modelClass) {
    /*jshint validthis:true*/
    if (modelClass) {
        this._models[name] = modelClass;
        debug('Register model "%s" OK', name);
    }
    return this._models[name];
}


function handler(name, fn) {
    /*jshint validthis:true*/
    if (fn) {
        this._handlers[name] = fn;
        debug('Registered handler "%s" OK', name);
    }
    return this._handlers[name];
}


module.exports.extend = extend;

