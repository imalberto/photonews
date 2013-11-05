
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
    classify = require('./js/util').classify;
    // YYUI = require('yui').YUI,
    // YY,
    // classify;

// YY = YYUI({
//     modules: {
//         'util': {
//             fullpath: './util.common.js'
//         }
//     }
// // }).use('util', function (YYY) {
// //     classify = YYY.PN.util.classify;
// });
// // YY.applyConfig({useSync: true});
// // YY.use('util');

/**
@public
**/
function extend(app, brand) {
    if (!app[brand]) {
        // var Y = app.yui.use();
        // classify = Y.PN.util.classify;

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

        app.getViewsConfig = getViewsConfig;

        app.use(require('./middleware/renderer')());

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


///////////////////////////////////////////////////////////////////////////////

// Simple registry-like functions to store and lookup meta classes


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


module.exports.extend = extend;

