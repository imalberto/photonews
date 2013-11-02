

/*jslint nomen:true, browser:true*/
/*jshint expr:true*/
/*global console, YUI, YApp*/

/**
Implement the renderer on the client
**/
YUI.add('router-middleware', function (Y, NAME) {

	'use strict';

	var app = window.app;

	if (typeof document !== 'undefined' && !app) {
		console.error('** ERROR ** something is fishy');
		return;
	}

	// Assumption is that windows.app is created on client bootstrap
	app.renderer = function (req, res, next) {

		if (!res.req) {
			console.error('** ERROR ** Invalid middleware stack');
			return next();
		}

		/**
		Prior to calling `res.render`, the actual handler should make sure the
		correct model and controller are created.

			res.render('news', controller);

        @param {String} viewName
        @param {Promise|Object} controller
		**/
		res.render = function (viewName, controller) {

            // var viewName,
            //     className,
            //     locals,
            //     app = YApp,
            //     rendered;

            if (typeof controller !== 'undefined' &&
                    typeof controller.then === 'function') {
                controller.then(function (data) {
                    var YApp = window.YApp,
                        className,
                        rendered,
                        outlet;

                    className = viewName + '-view';
                    rendered = YApp.get('viewContainer').one('.' + className);

                    if (Array.isArray(data)) {
                        outlet = { items: data };
                    } else {
                        outlet = data;
                    }

                    if (rendered) {
                        YApp.showContent(rendered, {
                            view: viewName,
                            config: {}
                        });
                    } else {
                        YApp.showView(viewName, {
                            container: Y.Node.create('<div class="' + className + '"></div>'),
                            // The `view` will use the outlet to render the
                            // template, as such we call it `locals`.
                            locals: outlet
                        }, {
                            render: true,
                            // prepend: true,
                            update: true
                        });
                    }
                });
            } else {
                res.render(viewName, controller);
            }

            // // viewName = config.viewName;
            // className = viewName + '-view';
            // rendered = app.get('viewContainer').one('.' + className);
            // // locals = config.locals || {};

            // if (rendered) {
            //     app.showContent(rendered, {
            //         view: viewName,
            //         config: {}
            //     });
            // } else {
            //     app.showView(viewName, {
            //         container: Y.Node.create('<div class="' + className + '"></div>'),
            //         locals: locals
            //     }, {
            //         render: true,
            //         // prepend: true,
            //         update: true
            //     });
            // }
		};

		next();
	};

	app.page = function (name, path) {

        var handlers = [],
			Y = app.yui._Y,
			classify = Y.PN.util.classify,
            handler;

        // for debugging
        function marker(req, res, next) {
            console.log('----------------------------------------------');
            console.log('XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX');
            console.log('----------------------------------------------');
            next();
        }

        path || (path = '/' + name);

        // TODO standardize how handlers are named and registered on both
        // runtimes
        handler = Y.Handlers[classify(name + '-handler')] || function (req, res) {
            var ControllerClass,
                ModelClass,
                controller,
                model;

            // TODO provide a registration process simmilar to the server
            // runtime
            ControllerClass = Y.Controllers[classify(name + '-controller')];
            ModelClass = Y.Models[classify(name + '-model')];

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

		handlers.push(marker);
		handlers.push(app.renderer);
        handlers.push(handler);
		// handlers.push(Y.Handlers[classify(name + '-handler')]);

		YApp.route(path, handlers);

	};

}, '@VERSION', {
	requires: [
	],
	affinity: 'client'
});
