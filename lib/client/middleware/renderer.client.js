/*
 * Copyright (c) 2013, Yahoo! Inc.  All rights reserved.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE.txt file for terms.
 */

/*jslint nomen:true, browser:true*/
/*jshint expr:true*/
/*global YUI*/

/**
@module renderer-middleware
**/
YUI.add('renderer-middleware', function (Y, NAME) {
    'use strict';

    var app = Y.config.global.app,
        isPromise = Y.Promise.isPromise;

	app.renderer = function (req, res, next) {

		if (!res.req) {
			Y.log('** ERROR ** Invalid middleware stack', 'error', NAME);
			return next();
		}

		/**
        @param {String} viewName
        @param {Promise|Object} controller
		**/
		res.render = function (viewName, controller) {

            var promises = [],
                key;

            controller || (controller = {});

            if (isPromise(controller)) {
                controller.then(function (data) {
                    var YApp = Y.config.global.YApp,
                        className,
                        rendered,
                        templateData;

                    className = viewName + '-view';
                    rendered = YApp.get('viewContainer').one('.' + className);

                    if (Array.isArray(data)) {
                        templateData = { items: data };
                    } else {
                        templateData = data;
                    }

                    if (rendered) {
                        YApp.showContent(rendered, {
                            view: viewName,
                            //
                            config: {
                                render: true,
                                update: true
                            }
                        });
                    } else {
                        YApp.showView(viewName, {
                            container: Y.Node.create('<div class="' + className + '"></div>'),
                            locals: templateData
                        }, {
                            prepend: false,
                            render: true,
                            update: true
                        });
                    }
                });
            } else {
                for (key in controller) {
                    if (controller.hasOwnProperty(key)) {
                        if (isPromise(controller[key])) {
                            promises.push(controller[key]);
                        }
                    }
                }
                if (promises.length > 0) {
                    Y.batch.apply(Y.batch, promises)
                        .then(function (data) {
                            var merged = {};

                            if (Array.isArray(data)) {
                                Array.forEach(function (d) {
                                    merged = Y.mix(merged, d);
                                });
                            } else {
                                merged = data;
                            }
                            res.render(name, merged);
                        });
                } else {
                    res.render(name, controller);
                }
            }
		};

		next();
	};

}, '@VERSION', {
    requires: [
        'promise',
        'util'
    ],
    affinity: 'client'
});


