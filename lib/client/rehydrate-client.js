/*jslint nomen:true, node:true*/
/*global YUI*/

YUI.add('rehydrate-client', function (Y, NAME) {

    'use strict';

    var store = new Y.Store(Y.config.global.DATA),
        routes = Y.config.global.ROUTES,
        annotations = {},
        activeRoute = routes[Y.config.global.activeRouteName],
        controllerModuleName = 'controllers/' + (activeRoute.annotations.controller || 'main');

    Y.rehydrate = function (config) {

        return new Y.Promise(function (fulfill, reject) {

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

                fulfill(yaf);

            });

        });

    };

}, '@VERSION', {
    affinity: 'client',
    requires: ['store', 'import', 'handlebars-helpers', 'promise', 'controllers/main']
});
