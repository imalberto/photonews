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
    expview = require('express-view'),
    expyui = require('express-yui'),
    router = require('lib/router'),
    locator = require('./locator'),
    app,
    appPort,
    loc;

////
// app setup
app = express();
appPort = process.env.PORT || 8666;
app.set('app port', appPort);
app.set('layout', 'main');

// setup Locator and mount it on "app"
locator(app);

// Augment "app" with useful "modown" extensions
expview.extend(app);
expyui.extend(app);
router.extend(app);


////
// regular express.js middleware
app.use(express.compress());
app.use(express.favicon());

// move to CDN if necessary
app.use(expyui['static'](__dirname + '/build'));
app.yui.setCoreFromAppOrigin();
app.yui.applyConfig({
    debug: true,
    combine: false
});

// expose the router configuration
app.use(router.expose());

app.yui.ready(function (err) {
    if (err) {
        console.error('------------------------------------------------------');
        console.error(err);
        console.error(err.stack);
        console.error('------------------------------------------------------');
        return;
    }

    var Y = app.yui.use.apply(app.yui, app.getServerModules());

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
    //         next(new Error('User not authenticated'));
    //     }
    // });
    //

    app.listen(appPort, function () {
        console.log('Ready to serve on port %s', appPort);
    });
});
