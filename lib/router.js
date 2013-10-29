
/*jslint nomen:true, node:true*/
/*global mapRoute*/

/**
`router` plugin that extends `express` `app`.

Usage:

    var express = require('express'),
        app = express(),
        router = require('./lib/router');

    router.extend(app);

    app.mapRoute(...);


**/

'use strict';

var classify = require('./util').classify,
    expann = require('express-annotations'),
    expmap = require('express-map'),
    expyui = require('express-yui');

function extend(app, brand) {
    if (!app[brand]) {
        Object.defineProperty(app, brand || '@pn-router', { value: true });

        expmap.extend(app);
        expann.extend(app);

        app.mapRoute = mapRoute;
        app.getViewsConfig = getViewsConfig;
    }

    return app;
}

function mapRoute() {
    var app = this,
        args = [].slice.call(arguments),
        name = args[0],
        path = args[1],
        handlerNames = args.slice(2),
        handlers = [],
        Y = app.yui._Y;

    handlerNames.forEach(function (handlerName) {

        var fname = classify(handlerName);

        if (handlerName.indexOf('-model') > -1) {
            // TODO
        } else if (handlerName.indexOf('-handler') > -1) {
            handlers.push(Y.Handlers[fname]);
        } else {
            console.error('** ERROR ** : unknown handle type: ' + handlerName);
        }
    });
    
    app.get.apply(app, [].concat(path).concat(expyui.expose()).concat(handlers));
    app.map(path, name);
    app.annotate(path, {
        dispatch: {
            handlerNames: handlerNames
        }
    });
}

function getViewsConfig() {
    var app = this,
        routes,
        views;

    routes = app.getRouteMap();
    views = {};
    Object.keys(routes).forEach(function (name) {
        var routeConfig = routes[name];

        views[name] = {
            type: 'Views.' + classify(name) + 'View',
            preserve: false
        };
    });

    return views;
}

module.exports.extend = extend;


