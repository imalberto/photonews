

/*jslint nomen:true, node:true*/
/*global YUI*/

YUI.add('about-handler', function (Y, NAME) {

	'use strict';

	var classify = Y.PN.util.classify,
		Route;

	Route = Y.namespace('Handlers')[classify(NAME)] = function (req, res) {
		var renderer = Y.Renderer,
			config = {};

		// Default handler on the server will create a default model, and 
		// a default controller if necessary (if not specified), and will
		// res.render() by passing the name.
		//
		// The same thing should be done on the client side.
		renderer.render(config, req, res);
	};

}, '@VERSION', {
	requires: [
		'model',
		'renderer',
		'util'
	],
	affinity: 'client'
});