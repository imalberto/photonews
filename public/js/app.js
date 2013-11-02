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

        root: '/',
        serverRouting: true,

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
        }

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
