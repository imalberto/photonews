/*jslint nomen:true, node:true*/
/*jshint newcap:false, expr:true*/
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

var expann = require('express-annotations'),
    expmap = require('express-map'),
    expstate = require('express-state');

function rehydrateClientApp(config) {
    var importHackReference = this.yui.import;

    this.yui.use('store', 'import', 'handlebars-helpers', function (Y) {
        var store = new Y.Store(Y.config.global.DATA);
            routes = Y.config.global.ROUTES,
            annotations = {},
            activeRoute = routes[Y.config.global.activeRouteName];
            controllerModuleName = 'controllers/' + (activeRoute.annotations.controller || 'main');

        // importing controller script to get the app running
        Y.import(controllerModuleName, function (controller) {

            var yaf = new (controller['default'])(Y.merge({
                store: store,
                transitions: true,
                root: '/',
                serverRouting: true
            }, config));

            function dispatch(req, res, next) {
                var annotations = req.annotations,
                    routeModuleName = 'routes/' + (annotations.route || annotations.name);

                Y.import([routeModuleName], function (route) {
                    route['default'](req, res, next);
                });
            }

            function context(req, res, next) {
                req.annotations = annotations[req.route.path];
                req.store = store;
                req.controller = yaf;
                res.render = function (viewName, data) {
                    var className,
                        templateData,
                        rendered,
                        viewInfo;

                    className = viewName + '-view';
                    rendered = yaf.get('viewContainer').one('.' + className);
                    templateData = Array.isArray(data) ? { items: data } : data;
                    viewInfo = yaf.getViewInfo(viewName);

                    if ((rendered && viewInfo && !viewInfo.instance) ||
                            (rendered && viewInfo && viewInfo.instance &&
                            yaf.get('activeView') === viewInfo.instance &&
                            viewInfo.preserve)) {
                        yaf.showContent(rendered, {
                            view: viewName,
                            update: false,
                            transition: false
                        });
                    } else {
                        yaf.showView(viewName, {
                            container: Y.Node.create('<div class="' + className + '"></div>'),
                            locals: templateData
                        }, {
                            render: true,
                            update: true
                        });
                    }
                };
                next();
            }

            Object.keys(routes).forEach(function (name) {
                var routeConfig = routes[name];
                yaf.route(routeConfig.path, [context, dispatch]);
                annotations[routeConfig.path] = routes[name].annotations;
            });

            yaf.render({ rendered: true }).dispatch();

        });
    });
}

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
        res.expose(req.app.getRouteMap({
            controller: req.annotations.controller
        }), 'ROUTES');
        res.expose(req.annotations.name, 'activeRouteName');
        // exposing the rehydration script
        res.expose(rehydrateClientApp, 'app.rehydrate');

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
