/*
 * Copyright (c) 2013, Yahoo! Inc.  All rights reserved.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE.txt file for terms.
 */

/*jslint nomen:true, node:true*/
/*global PN*/

'use strict';

var express = require('express'),
    expmap = require('express-map'),
    expstate = require('express-state'),
    expview = require('express-view'),
    expyui = require('express-yui'),
    Locator = require('locator'),
    LocatorHandlebars = require('locator-handlebars'),
    LocatorYUI = require('locator-yui'),
    app,
    appPort,
    loc;

////
// global
global.PN = {
    CACHE: {},
    CONFIG: {},
    ROUTES: {},
    VIEWS: {}
};

////
// app setup
loc = new Locator({
    buildDirectory: __dirname + '/build'
});

app = express();

appPort = process.env.PORT || 8666;
app.set('app port', appPort);
app.set('locator', loc);
app.set('layout', 'main');

expmap.extend(app);
expstate.extend(app);
expview.extend(app);
expyui.extend(app);

app.use(require('./lib/middleware/renderer')());

////
// middleware
app.use(express.compress());
app.use(express.favicon());

// move to CDN if necessary
app.use(expyui['static'](__dirname + '/build'));
app.yui.setCoreFromAppOrigin();
app.yui.applyConfig({
    debug: true,
    combine: false
});

loc.plug(new LocatorHandlebars({ format: 'yui' }))
    .plug(new LocatorYUI())
    // Add more locator-plugins here as necessary
    .parseBundle(__dirname);

app.yui.ready(function (err) {
    if (err) {
        console.log(err);
        console.log(err.stack);
        return;
    }

   // TODO helper to load all those modules detected by Locator
    var Y = app.yui.use('util', 'renderer',
                        'default-controller', 'default-model',
                        'news-controller', 'photos-controller',
                        'news-model', 'photos-model',
                        'post-model', 'photo-model',
                        'home-handler', 'news-handler'),
        router = require('lib/router');

    Y.Env.runtime = 'server';
    router.extend(app);

    if (!Y.Models.DefaultModel) {
        console.error('** ERROR **: YUI modules not loaded in server instance');
        return;
    }

    // register any custom handlers
    // TODO consolidate 
    app.registerHandlers();
    app.registerModels();
    app.registerControllers();

    // show homepage landing (no model)
    app.page('home', '/'); // use default model, default controller
    // TODO what convention to use to tell the handler to use a model vs
    // model-list ?
    app.page('news', '/news'); // use custom model, default controller
    // TODO How to tell which model to use ?
    // TODO Should the controller the one that dictates which to use ?

    // app.page('news', 'news-model-list', '/news');
    app.page('photos', '/photos'); // use custom model, custom controller

    app.page('about', '/about'); // only static content; default model, default controller
    app.page('contact');

    // app.page('photos'); // default to /photos

    // app.mapRoute('home', '/', 'home-handler');
    // app.mapRoute('news', '/news', 'news-handler');
    // app.mapRoute('photo', '/photos/:photo_id');
    //
    // mapRoute('photos', '/photos', 'photos-handler');
    // mapRoute('about', '/about', 'about-handler');

    PN.ROUTES.routes = app.getRouteMap();
    PN.VIEWS.views = app.getViewsConfig();
    app.expose(PN, 'PN');

    app.listen(appPort, function () {
        console.log('Ready to serve on port %s', appPort);
    });
});
