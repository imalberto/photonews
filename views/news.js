/*jslint nomen:true, node:true*/
/*jshint esnext:true*/

import {BaseView} from 'base-view';
import {Template} from 'photonews-template-news';
import {Base} from 'base-build';

var NewsView = Base.create('news-view', BaseView, [], {

    newsTemplate: Template.get('photonews/news'),

    events: {},

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

export default NewsView;
