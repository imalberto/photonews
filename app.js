/*jslint nomen:true, node:true*/

'use strict';

var express = require('express'),
    expyui  = require('express-yui'),
    libview    = require('./lib/server/view'),
    librouter  = require('./lib/server/router'),
    liblocator = require('./lib/server/locator'),
    app,
    appPort;

// creating express app
app = express();

// Augment "app"
expyui.extend(app);
libview.extend(app);
librouter.extend(app);
liblocator.extend(app);

// default express app configuration
appPort = process.env.PORT || 8666;
app.set('app port', appPort);
app.set('layout', 'main');
app.enable('strict routing');

// setup Locator to abstract the filesystem
app.parseBundle({
    buildDirectory: __dirname + '/build',
    applicationDirectory: __dirname
});

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

// expose yui configuration
app.use(expyui.expose());

app.get('/', librouter.context, librouter.dispatch);
app.map('/', 'home');
app.annotate('/', {
    route: 'default'
});

app.get('/news', librouter.context, librouter.dispatch);
app.map('/news', 'news');

app.get('/photos', librouter.context, librouter.dispatch);
app.map('/photos', 'photos');

app.get('/photo', librouter.context, librouter.dispatch);
app.map('/photo', 'photo');

app.get('/search/photos', librouter.context, librouter.dispatch);
app.map('/search/photos', 'search-photos');
app.annotate('/search/photos', { view: 'photos', route: 'photos' });

app.get('/search/photo', librouter.context, librouter.dispatch);
app.map('/search/photo', 'search-photo');
app.annotate('/search/photo', { view: 'photo' });

app.get('/about', librouter.context, librouter.dispatch);
app.map('/about', 'about');
app.annotate('/about', {
    controller: 'main',
    view: 'about',
    route: 'default'
});

// waiting for yui to get ready to receive traffic
app.yui.ready(function (err) {
    if (err) {
        console.error('------------------------------------------------------');
        console.error(err);
        console.error(err.stack);
        console.error('------------------------------------------------------');
        return;
    }
    // hack to get import working on the server side until express-yui solves this
    app.yui.use('import');
    app.yui.import = app.yui._Y.import;

    app.listen(appPort, function () {
        console.log('Ready to serve on port %s', appPort);
    });
});
