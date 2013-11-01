

/*jslint nomen:true, node:true*/
/*global YUI*/

YUI.add('about-handler', function (Y, NAME) {

	'use strict';

	var classify = Y.PN.util.classify,
		Route;

	Route = Y.namespace('Handlers')[classify(NAME)] = function (req, res) {
		var renderer = Y.Renderer,
			config = {};

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