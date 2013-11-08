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
        util = Y.PN.util;

    Route = Y.namespace('Handlers')[util.classify(NAME)] = function (req, res) {

        var ControllerClass = Y.Controllers.NewsController,
            ModelClass = Y.Models.NewsModel,
            controller,
            model;

        // TODO generalize the model creation to reuse data already added to
        //      instead of fetching from server again.
        model = new ModelClass(req.params);
        controller = new ControllerClass({model: model});

        res.render('news', controller);

    };

}, '0.0.1', {
    requires: [
        'util',
        'news-controller',
        'news-model'
    ]
});


