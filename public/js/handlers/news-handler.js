/*
 * Copyright (c) 2013, Yahoo! Inc.  All rights reserved.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE.txt file for terms.
 */

/*jslint nomen:true, node:true*/
/*global YUI*/

YUI.add('news-handler', function (Y, NAME) {
    var Route,
        util = Y.PN.util;

    Route = Y.namespace('Handlers')[util.classify(NAME)] = function (req, res) {

        var renderer = Y.Renderer,
            model = Y.NewsModel,
            start = req.params.start || 0,
            count = req.params.count || 2,
            config,
            query,

        query = req.params.q || 'senate';

        // TODO this handler is acting as a controller
        //      move the "data fetching" as a middleware prior to executing
        //      this handler
        model.search(query, start, count, function (err, articles) {
            if (err) {
                console.error('** ERROR ** Error loading articles for query "%s"', query);
                return renderer.render('error');
            }

            config = {
                viewName: 'news',
                locals: { articles: articles }
            };
            renderer.render(config, req, res);
        });
    };

}, '0.0.1', {
    requires: ['util', 'renderer', 'news-model']
});


