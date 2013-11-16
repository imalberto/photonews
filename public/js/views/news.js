/*
 * Copyright (c) 2013, Yahoo! Inc.  All rights reserved.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE.txt file for terms.
 */

/*jslint nomen:true, node:true*/
/*jshint esnext:true*/

import {View} from 'view';
import {Views} from 'default-view';
import {Template} from 'photonews-template-news';
import {Base} from 'base';
import {log} from 'yui';
import {one} from 'yui';

var NewsView;

NewsView = Base.create('news-view', View, [], {

    newsTemplate: Template.get('photonews/news'),

    events: {
    },

    initializer: function (config) {
        this.config = config;
        log('Initialized !!!', 'info', NAME);
    },

    render: function () {
        var my = this,
            container = this.get('container'),
            locals = this.get('locals'),
            html = '<h3> No Posts Available </h3>';

        if (!container.inDoc()) {
            one('body').append(container);
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

Views.NewsView = NewsView;

export default NewsView;

