

/*jslint nomen:true, browser:true*/
/*jshint expr:true*/
/*global YUI, YApp*/

/**
@module router-middleware
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

        handler = Y.Handlers[classify(name + '-handler')] || function (req, res) {
            var ControllerClass,
                ModelClass,
                controller,
                model;

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

        handlers = [].concat([marker, app.renderer, handler]);

		YApp.route(path, handlers);

	};

}, '@VERSION', {
	requires: [
        'renderer-middleware'
	],
	affinity: 'client'
});
