/*
 * Copyright (c) 2013, Yahoo! Inc.  All rights reserved.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE.txt file for terms.
 */

/*jslint nomen:true, node:true*/
/*global YUI*/

YUI.add('news-handler', function (Y, NAME) {
    'use strict';

    var Route,
        classify = Y.PN.util.classify;

    Route = Y.namespace('Handlers')[classify(NAME)] = function (req, res) {

        var ControllerClass = Y.Controllers.NewsController,
            ModelClass = Y.Models.NewsModel,
            controller,
            model,
            data = (Y.config.global.DATA && Y.config.global.DATA['news']) || [];

        model = new ModelClass(data);
        controller = new ControllerClass({name: 'news', model: model});

        res.render('news', controller);

    };

}, '0.0.1', {
    requires: [
        'util',
        'news-controller',
        'news-model'
    ]
});


