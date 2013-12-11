/*jslint nomen:true, node:true*/
/*jshint newcap:false, expr:true*/
/*global page*/

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
    expstate = require('express-state'),
    utils = require('connect').utils;

function dispatch(req, res, next) {
    var annotations = req.annotations,
        routeModuleName = 'routes/' + (annotations.route || annotations.name);

    req.app.yui.import([routeModuleName], function (route) {
        route['default'](req, res, next);
    });
}

function context(req, res, next) {
    var annotations = req.app.annotations[req.route.path],
        controllerModuleName = 'controllers/' + (annotations.controller || 'main');

    // creating a controller and the corresponding store
    req.app.yui.import([controllerModuleName, 'store', 'handlebars-helpers'], function (controller, Y) {

        var defaultClientRoutes = req.app.getRouteMap({
                controller: undefined
            });

        req.annotations = annotations;
        req.store = req.store || new Y.Store();
        req.controller = req.controller || new (controller['default'])({
            store: req.store
        });

        // hack to pass available views from controller into `res.render()`
        // which is something that yaf already does well in the client side.
        res.locals.__views__ = req.controller.views;

        // exposing the serialized store into the client side
        res.expose(req.store, 'DATA');

        // exposing routes in the domain of the current controller
        res.expose(utils.merge(defaultClientRoutes, req.app.getRouteMap({
            controller: annotations.controller || 'main'
        })), 'ROUTES');
        res.expose(req.annotations.name, 'activeRouteName');

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
