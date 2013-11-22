/*
 * Copyright (c) 2013, Yahoo! Inc.  All rights reserved.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE.txt file for terms.
 */

/*jslint nomen:true, browser:true*/
/*jshint expr:true*/
/*global YUI, YApp*/

/**
@module router-middleware
**/
YUI.add('router-middleware', function (Y, NAME) {

	'use strict';

    var app = Y.config.global.app;

	app.page = function (name, path) {

        var handlers = [],
			classify = Y.PN.util.classify,
            DATA = Y.config.global.DATA || {},
            handler;

        path || (path = '/' + name);

        handler = Y.Handlers[classify(name + '-handler')] || Y.Handlers.DefaultHandler(name);

        this.pageView.route(path, [app.renderer, handler]);

	};

}, '@VERSION', {
	requires: [
        'renderer-middleware',
        'default-handler'
	],
	affinity: 'client'
});
