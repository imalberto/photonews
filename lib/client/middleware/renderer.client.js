
/*jslint nomen:true, browser:true*/
/*jshint expr:true*/
/*global YUI*/

/**
@module renderer-middleware
**/
YUI.add('renderer-middleware', function (Y, NAME) {
    'use strict';

    var app = window.app;

	app.renderer = function (req, res, next) {

		if (!res.req) {
			Y.log('** ERROR ** Invalid middleware stack', 'error', NAME);
			return next();
		}

		/**
        Example usage:

			res.render('news', controller);

        @param {String} viewName
        @param {Promise|Object} controller
		**/
		res.render = function (viewName, controller) {

            controller || (controller = {});

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
                            prepend: false,
                            render: true,
                            update: true
                        });
                    }
                });
            } else {
                res.render(viewName, controller);
            }
		};

		next();
	};

}, '@VERSION', {
    requires: [
    ],
    affinity: 'client'
});


