/*
 * Copyright (c) 2013, Yahoo! Inc.  All rights reserved.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE.txt file for terms.
 */

/*jslint nomen:true, node:true*/
/*global YUI*/

YUI.add('news-view', function (Y, NAME) {

    var NewsView,
        start = 0,
        count = 2;

    NewsView = Y.Base.create('newsView', Y.View, [], {

        newsTemplate: Y.Template.get('photonews/news'),

        events: {
        },

        initializer: function (config) {
        },

        render: function () {
            var my = this,
                app = YApp,
                container = this.get('container'),
                html = '<h3> No Articles Update Available </h3>',
                model = Y.NewsModel,
                query = 'senate';


            // TODO move model out of the "render" method
            model.search(query, start, count, function (err, articles) {

                if (!container.inDoc()) {
                    Y.one('body').append(container);
                    // Y.one(app.get('viewContainer')).append(container);
                }

                if (err) {
                    console.log('Error loading articles for query "%s" :', query, err);
                    container.setHTML(html);
                    return this;
                }

                html = my.newsTemplate({ src: 'news', articles: articles});
                container.setHTML(html);

                return this;
            });
        },

        // pagination
        next: function (e) {
        },
        prev: function (e) {
        },

        ATTRS: {
            container: {
                valueFn: function () {
                    return Y.Node.create('<div class="news-view-container"/>');
                }
            }
        }
    });

    Y.namespace('Views').NewsView = NewsView;

}, '0.0.1', {
    affinity: 'client',
    requires: [
        'view',
        'news-model',
        'photonews-template-news'
    ]
});
