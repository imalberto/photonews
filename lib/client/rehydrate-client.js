/*jslint nomen:true, node:true*/
/*global YUI*/

YUI.add('rehydrate-client', function (Y) {

    'use strict';

    var store = new Y.Store(Y.config.global.DATA),
        routes = Y.config.global.ROUTES,
        annotations = {},
        app;

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
        req.controller = app;
        res.render = function (viewName, locals) {
            app.render(viewName, locals);
        };
        next();
    }

    // setting up some alias for the client side to function
    Y.BaseView = Y.ReactView;
    Y.BaseController = Y.App;

    Y.rehydrate = function (config) {
        return new Y.Promise(function (fulfill/*, reject*/) {
            Y.import('controllers/main', function (controller) {

                app = new (controller['default'])(Y.merge({
                    root: '/',
                    transitions: true,
                    serverRouting: true
                }, config));

                Object.keys(routes).forEach(function (name) {
                    var routeConfig = routes[name];
                    app.route(routeConfig.path, [context, dispatch]);
                    annotations[routeConfig.path] = routes[name].annotations;
                });

                app.dispatch();

                fulfill(app);
            });
        });
    };

}, '@VERSION', {
    affinity: 'client',
    requires: [
        'store', 'import', 'handlebars-helpers', 'promise', 'app', 'view-client'
    ]
});
