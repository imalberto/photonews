/*
 * Copyright (c) 2013, Yahoo! Inc.  All rights reserved.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE.txt file for terms.
 */

/*jslint nomen:true, node:true*/
/*global YUI, YApp*/

YUI.add('news-view', function (Y, NAME) {
    'use strict';

    var NewsView;

    NewsView = Y.Base.create('newsView', Y.View, [], {

        newsTemplate: Y.Template.get('photonews/news'),

        events: {
        },

        initializer: function (config) {
            this.config = config;
            Y.log('Initialized !!!', 'info', NAME);
        },

        render: function () {
            var my = this,
                container = this.get('container'),
                locals = this.get('locals'),
                html = 'Loading ...';

            if (!container.inDoc()) {
                Y.one('body').append(container);
            }

            if (!locals.items) {
                console.error('Error loading news items');
                container.setHTML('Error loading news items');
                return;
            }

            html = my.newsTemplate({items: locals.items});
            container.setHTML(html);

            return this;
        },

        // pagination
        next: function () {
            console.log('IMPLEMENT ME');
        },
        prev: function () {
            console.log('IMPLEMENT ME');
        },

        ATTRS: {}
    });

    Y.namespace('Views').NewsView = NewsView;

}, '@VERSION', {
    affinity: 'client',
    requires: [
        'view',
        'photonews-template-news'
    ]
});
