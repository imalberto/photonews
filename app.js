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
    router = require('lib/router'),
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
// setup Locator
loc = new Locator({
    buildDirectory: __dirname + '/build'
});

////
// app setup
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
        console.error('------------------------------------------------------');
        console.error(err);
        console.error(err.stack);
        console.error('------------------------------------------------------');
        return;
    }

    // TODO helper to load all those modules detected by Locator
    var Y = app.yui.use('util',
                        'default-controller', 'default-model',
                        'news-controller', 'photos-controller',
                        'news-model', 'photos-model',
                        'post-model', 'photo-model',
                        'news-handler');

    // var Y = app.yui.use(Object.keys(app.yui._serverModules));
    router.extend(app);

    // Showing the various usecases to register routes
    app.page('home', '/'); // setting '/' as the path vs the default '/home'
    app.page('news', '/news'); // same as app.page('news');
    app.page('photos'); // will default to '/photos'

    // app.page('about', '/about');

    //
    // app.page('contact', '/aboutus', function (req, res) {
    //     res.render('aboutus');
    // });

    // add a middleware, and a handler
    // app.page('admin', '/admin', function (req, res, next) {
    //     // authenticate request here
    //     req.params.isAuth = true;
    //     next();
    // }, function (req, res) {
    //     if (req.params.isAuth) {
    //         res.render('admin');
    //     } else {
    //         res.render('notfound');
    //     }
    // });

    PN.ROUTES.routes = app.getRouteMap();
    PN.VIEWS.views = app.getViewsConfig();
    app.expose(PN, 'PN');
    // app.use(router.expose());

    app.listen(appPort, function () {
        console.log('Ready to serve on port %s', appPort);
    });
});
