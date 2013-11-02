

/*jslint nomen:true, browser:true*/
/*jshint expr:true*/
/*global console, YUI, YApp*/

/**
Implement the renderer on the client
**/
YUI.add('router-middleware', function (Y, NAME) {

	'use strict';

	var app = window.app;

	app.page = function (name, path) {

        var handlers = [],
			Y = app.yui._Y,
			classify = Y.PN.util.classify,
            handler;

        // for debugging
        function marker(req, res, next) {
            Y.log('----------------------------------------------', 'info', NAME);
            Y.log('XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX', 'info', NAME);
            Y.log('----------------------------------------------', 'info', NAME);
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
        'renderer-middleware'
	],
	affinity: 'client'
});
