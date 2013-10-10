/*
 * Copyright (c) 2013, Yahoo! Inc.  All rights reserved.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE.txt file for terms.
 */

/*jslint nomen:true, node:true*/
/*global YUI*/

// home-handler.js
YUI.add('home-handler', function (Y, NAME) {
    var Route,
        util = Y.PN.util;

    Route = Y.namespace('Handlers')[util.classify(NAME)] = function (req, res) {

        var renderer = Y.Renderer,
            config;

        config = {
            viewName: 'home',
            locals: {}
        };
        renderer.render(config, req, res);
    };
}, '0.0.1', {
    requires: ['util', 'renderer']
});

