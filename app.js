/*
 * Copyright (c) 2013, Yahoo! Inc.  All rights reserved.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE.txt file for terms.
 */

/*jslint nomen:true, node:true*/
/*global PN*/

'use strict';

var debug = require('debug')('app'),
    express = require('express'),
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
    var Y = app.yui.use('util',
                        'default-controller', 'default-model',
                        'news-controller', 'photos-controller',
                        'news-model', 'photos-model',
                        'post-model', 'photo-model',
                        'news-handler'),
        router = require('lib/router');

    Y.Env.runtime = 'server';
    router.extend(app);

    // TODO find a more efficient way to determine if all modules are loaded
    if (!Y.Models.DefaultModel) {
        console.error('** ERROR **: YUI modules not loaded in server instance');
        return;
    }

    // Showing the various ways to register routes
    app.page('home', '/'); // use default model, default controller
    app.page('news', '/news'); // use custom model, default controller
    app.page('photos'); // use custom model, custom controller

    // app.page('about', '/about'); // only static content; default model, default controller
    /*
    app.page('contact', '/aboutus', function (req, res) {
        res.render('aboutus');
    });
    app.page('admin', '/admin', function (req, res, next) {
        // authenticate request here
        req.params.isAuth = true;
        next();
    }, function (req, res) {
        if (req.params.isAuth) {
            res.render('admin');
        } else {
            res.render('notfound');
        }
    });
    */

    PN.ROUTES.routes = app.getRouteMap();
    PN.VIEWS.views = app.getViewsConfig();
    app.expose(PN, 'PN');

    app.listen(appPort, function () {
        console.log('Ready to serve on port %s', appPort);
    });
});
