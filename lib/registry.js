/*
 * Copyright (c) 2013, Yahoo! Inc.  All rights reserved.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE.txt file for terms.
 */

/*jslint nomen:true, node:true*/
/*jshint expr:true*/
/*global controller, model, handler*/

/**
@module registry
**/

'use strict';

var debug = require('debug')('lib:registry'),
    classify = require('./js/util').classify;


/**
@method controller
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

/**
@method extend
**/
function extend(app, brand) {
    if (!app[brand]) {
        Object.defineProperty(app, brand || '@modown-registry', { value: true });

        app._controllers = {};
        app._handlers = {};
        app._models = {};

        app.controller = controller;
        app.handler = handler;
        app.model = model;
    }
}

module.exports = {
    extend: extend
};

