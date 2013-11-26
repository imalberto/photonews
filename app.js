/*
 * Copyright (c) 2013, Yahoo! Inc.  All rights reserved.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE.txt file for terms.
 */

/*jslint nomen:true, node:true*/

'use strict';

var express = require('express'),
    expyui = require('express-yui'),
    librouter = require('./lib/server/router'),
    libapp = require('./lib/server/application'),
    locator = require('./locator'),
    app,
    appPort;

// creating express app
app = express();

// Augment "app"
libapp.extend(app);
librouter.extend(app);

// default express app configuration
appPort = process.env.PORT || 8666;
app.set('app port', appPort);
app.set('layout', 'main');
app.enable('strict routing');

// setup Locator to abstract the filesystem
locator(app);

// creating default namespace to expose data to the client
app.expose({}, 'DATA');

// regular express.js middleware
app.use(express.compress());
app.use(express.favicon());

// move to CDN if necessary
app.use('/css', expyui['static'](__dirname + '/public/css'));
app.use(expyui['static'](__dirname + '/build'));
app.yui.setCoreFromAppOrigin();
app.yui.applyConfig({
    debug: true,
    combine: false
});

// expose the router configuration
app.use(librouter.expose());

// waiting for yui to get ready to receive traffic
app.yui.ready(function (err) {
    if (err) {
        console.error('------------------------------------------------------');
        console.error(err);
        console.error(err.stack);
        console.error('------------------------------------------------------');
        return;
    }

    // getting all modules provisioned for the server side
    app.yui.use('pnapp');

    app.page('home', '/');
    app.page('news', '/news');
    app.page('photos');
    app.page('about', '/about');

    // app.page('about', '/about', function (req, res) {
    //     res.render('about');
    // });

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

    app.listen(appPort, function () {
        console.log('Ready to serve on port %s', appPort);
    });
});
