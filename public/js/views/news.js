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

    events: {},

    initializer: function (config) {
        this.config = config;
    },

    render: function () {
        var container = this.get('container'),
            locals = this.get('locals'),
            html;

        if (!locals.items) {
            html = '<h3> No Posts Available </h3>';
        } else {
            html = this.newsTemplate({ items: locals.items });
        }

        container.setHTML(html);
        return this;
    },

    // pagination
    next: function () {
        // todo
    },

    prev: function () {
        // todo
    }

});

Views.NewsView = NewsView;

export default NewsView;
