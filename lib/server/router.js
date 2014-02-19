/*jslint nomen:true, node:true*/
/*jshint newcap:false, expr:true*/

/**
`router` plugin that extends `express` `app`.

Usage:

    var express = require('express'),
        app = express(),
        router = require('./lib/server/router');

    router.extend(app);

@module lib/server/router
**/

'use strict';

var expann = require('express-annotations'),
    expmap = require('express-map'),
    expstate = require('express-state');

function dispatch(req, res, next) {
    var annotations = req.annotations,
        routeModuleName = 'routes/' + (annotations.route || annotations.name);

    req.app.yui.import([routeModuleName], function (route) {
        route['default'](req, res, next);
    });
}

function context(req, res, next) {
    req.app.yui.import('controllers/main', function (controller/*, Y*/) {
        // creating a controller and the corresponding store
        req.annotations = req.app.annotations[req.route.path];
        req.store = req.store || new (req.app.yui._Y.Store)();
        // making controller accesible thru the view engine
        res.locals.controller = res.locals.controller || new (controller['default'])();
        // exposing the serialized store into the client side
        res.expose(req.store, 'DATA');
        // exposing routes
        res.expose(req.app.getRouteMap(), 'ROUTES');
        // done with the context, moving on!
        next();
    });
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
    }
    return app;
}

module.exports = {
    extend: extend,
    dispatch: dispatch,
    context: context
};
