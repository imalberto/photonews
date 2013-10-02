
/*jslint nomen:true, node:true*/
/*global YUI*/


// PhotoNews App
YUI.add('pn-app', function (Y, NAME) {
    var PhotoNews;

    PhotoNews = Y.Base.create('photoNews', Y.App, [], {
        titleTemplate: 'foo.handlebars',
        headerTemplate: 'foo.handlebars',

        namedRoutes: ROUTES, // grab from global

        root: '/',
        serverRouting: true,

        views: {
            photo: {
                type: 'PN.PhotoView',
                preserve: true
            },
            news: {
                type: 'PN.NewsView',
                preserve: true
            }
        },

        transitions: {
            navigate: 'fade',
            toChild: 'fade',
            toParent: 'fade'
        },

        initializer: function () {
            // TODO
        },

        render: function (options) {
            PhotoNews.superclass.render.apply(this, arguments);

            options = options || {};

            // don't render on first load, since the server response has
            // already done so
            if (options.rendered) {
                return this;
            }

            // TODO setup initial view
            //

            return this;
        },

        handlePhotos: function (req, res, next) {
            var my = this,
                keyword = self.get('keyword'),
                key = req.params.key;

            // TODO
            // load photos
            // create and render view

            next();
        },

        handleNews: function (req, res, next) {
            var my = this,
                keyword = self.get('keyword'),
                key = req.params.key;

            // TODO
            // load news
            // create and render view

            next();
        },

        loadPhotos: function () {
        },

        loadNews: function () {
        }
    }, {
        ATTRS: {
        }
    });

    Y.namespace('PN').App = PhotoNews;

}, '0.0.1', {
    affinity: 'client',
    requires: [
        'app-base'
    ]
});
