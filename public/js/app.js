/*
 * Copyright (c) 2013, Yahoo! Inc.  All rights reserved.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE.txt file for terms.
 */

/*jslint nomen:true, node:true*/
/*global YUI*/


YUI.add('pn-app', function (Y, NAME) {
    var PhotoNews;

    PhotoNews = Y.Base.create('photoNews', Y.App, [], {

        // namedroutes: [
        //     { name: 'home', callbacks: 'handleHome' },
        //     { name: 'photos', callbacks: [ 'handlePhotos' ] },
        //     { name: 'news', callbacks: [ 'handleNews' ] },
        //     { name: 'about', callbacks: [ 'handleAbout' ] }
        // ],

        root: '/',
        serverRouting: true,

        // views: {
        //     home: {
        //         type: 'PN.HomeView',
        //         preserve: true
        //     },
        //     news: {
        //         type: 'PN.NewsView',
        //         preserve: true
        //     },
        //     photos: {
        //         type: 'PN.PhotosView',
        //         preserve: true
        //     },
        //     about: {
        //         type: 'PN.AboutView',
        //         preserve: false
        //     }
        // },

        // photos: new Y.ModelList(),
        // articles: new Y.ModelList(),

        transitions: {
            navigate: 'fade',
            toChild: 'fade',
            toParent: 'fade'
        },

        initializer: function () {
            // TODO
            console.log('!!! initializer !!!');
        },

        render: function (options) {
            var viewContainer,
                container,
                content;

            PhotoNews.superclass.render.apply(this, arguments);

            options = options || {};

            if (options.rendered) {
                return this;
            }

            container = this.get('container');
            viewContainer = this.get('viewContainer');

            // TODO setup initial view

            return this;
        },

        dummy: function () {
            console.log('!!! DUMMY !!!');
        }

        // handleHome: function (req, res, next) {
        //     var rendered = this.get('viewContainer').one('#home'),
        //         config;

        //     config = { };

        //     if (rendered) {
        //         this.showContent(rendered, {
        //             view: {
        //                 name: 'home',
        //                 config: config
        //             },
        //             update: true,
        //             transition: false
        //         });
        //     } else {
        //         this.showView('home', config, { render: true, update: true });
        //     }
        // },

        // handlePhotos: function (req) {
        //     var rendered = this.get('viewContainer').one('#photos'),
        //         keyword = this.get('keyword'),
        //         key = req.params.key,
        //         config;

        //     config = {
        //         foo: 'bar'
        //     };

        //     if (rendered) {
        //         this.showContent(rendered, {
        //             view: {
        //                 name: 'photos',
        //                 config: config
        //             },

        //             update: false,
        //             transition: false
        //         });
        //     } else {
        //         this.showView('photos', config, { render: true, update: true });
        //     }

        // },

        // handleNews: function (req, res, next) {
        //     var rendered = this.get('viewContainer').one('#news'),
        //         keyword = this.get('keyword'),
        //         key = req.params.key,
        //         config;

        //     config = {
        //         foo: 'bar'
        //     };

        //     if (rendered) {
        //         this.showContent(rendered, {
        //             view: {
        //                 name: 'news',
        //                 config: config
        //             },

        //             update: false,
        //             transition: false
        //         });
        //     } else {
        //         this.showView('news', config, { render: true, update: true });
        //     }

        // },

        // handleAbout: function (req, res, next) {
        //     var rendered = this.get('viewContainer').one('#about'),
        //         config;

        //     config = { };

        //     if (rendered) {
        //         this.showContent(rendered, {
        //             view: {
        //                 name: 'about',
        //                 config: config
        //             },
        //             update: true,
        //             transition: false
        //         });
        //     } else {
        //         this.showView('about', config, { render: true, update: true });
        //     }
        // }

        // loadPhotos: function () {
        // },

        // loadNews: function () {
        // }
    }, {
        ATTRS: {
        }
    });

    Y.namespace('PN').App = PhotoNews;

}, '0.0.1', {
    affinity: 'client',
    requires: [
        'app',
        'model',
        'model-list'
    ]
});
