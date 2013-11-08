/*
 * Copyright (c) 2013, Yahoo! Inc.  All rights reserved.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE.txt file for terms.
 */

/*jslint nomen:true, browser:true*/
/*global DATA, YUI*/


YUI.add('pn-app', function (Y, NAME) {
    'use strict';

    var PhotoNews;

    PhotoNews = Y.Base.create('photoNews', Y.App, [], {

        root: '/',
        serverRouting: true,

        transitions: {
            navigate: 'fade',
            toChild: 'fade',
            toParent: 'fade'
        },

        initializer: function () {
            // TODO
            Y.log('!!! initializer !!!', 'info', NAME);

            this.on('photosView:next', this.nextPhotos);
            this.on('photosView:prev', this.prevPhotos);
        },

        render: function (options) {
            var viewContainer,
                container;

            PhotoNews.superclass.render.apply(this, arguments);

            options = options || {};

            if (options.rendered) {
                return this;
            }

            container = this.get('container');
            viewContainer = this.get('viewContainer');

            // Setup initial view here if content is not prerendered on the
            // server

            return this;
        },

        nextPhotos: function () {
            var model;
            model = this.get('model');
            model.load({}, function (err, res) {
            });
        },
        prevPhotos: function () {
            var model;
            model = this.get('model');
            model.load({}, function (err, res) {
            });
        }

    }, {
        ATTRS: {
            // data: {
            //     value: null
            // },

            // raw data, possibly rendered on the server side
            data: {
                valueFn: function () {
                    var path = this.getPath(),
                        data;

                    if (path === '/news') {
                        data = DATA || [];
                    } else if (path === '/photos') {
                        data = DATA || [];
                    } else {
                        data = {};
                    }
                    return data;
                }
            },

            // helper
            model: {
                valueFn: function () {
                    var path = this.getPath(),
                        model;

                    if (path === '/news') {
                        model = new Y.Models.NewsModel(this.get('data'));
                    } else if (path === '/photos') {
                        model = new Y.Models.NewsModel(this.get('data'));
                    } else {
                        model = new Y.Model();
                    }
                    return model;
                }
            },

            // Indicate state that the app is booting up from server rendering
            bootstrap: {
                value: false
            }
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
