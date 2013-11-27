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

        path || (path = '/' + name);

        this.pageView.route(path, [Y.PNRenderer(name), Y.PNDispatcher(name)]);

	};

    app.rehydrate = function (pageView) {
        var that = this,
            routes = Y.config.global.ROUTES;

        this.pageView = pageView;

        Object.keys(routes).forEach(function (name) {
            var routeConfig = routes[name];
            that.page(name, routeConfig.path);
        });

        this.pageView.render({ rendered: true }).dispatch();
    };

}, '@VERSION', {
	requires: [
        'renderer-middleware',
        'dispatcher-middleware'
	],
	affinity: 'client'
});
