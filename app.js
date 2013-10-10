/*
 * Copyright (c) 2013, Yahoo! Inc.  All rights reserved.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE.txt file for terms.
 */

/*jslint nomen:true, node:true*/
/*global PN*/
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
    loc,
    routes;

////
// global
global.PN = {
    CACHE: {},
    CONFIG: {}
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

////
// routes
// routes = require('./routes');
// mapRoute('home', '/', routes.home);
// mapRoute('news', '/news', routes.news);
// mapRoute('photos', '/photos', routes.photos);
// mapRoute('about', '/about', routes.about);

loc.plug(new LocatorHandlebars({ format: 'yui' }))
    .plug(new LocatorYUI())
    .parseBundle(__dirname);

app.yui.ready(function (err) {
    if (err) {
        console.log(err);
        console.log(err.stack);
        return;
    }

    var Y = app.yui.use('util', 'renderer',
                        'home-handler', 'news-handler',
                        'flickr-model', 'news-model'),
        classify = Y.PN.util.classify,
        routes,
        views;

    if (!Y.FlickrModel) {
        console.error('** ERROR **: YUI modules not loaded in server instance');
        return;
    }

    Y.Env.runtime = 'server';

    /**
    @param {String} name
    @param {String} path
    @param {Function} handlerName* 1..n
    **/
    function mapRoute() {

        var args = [].slice.call(arguments),
            name = args[0],
            path = args[1],
            handlerNames = args.slice(2),
            handlers = [];

        handlerNames.forEach(function (handlerName) {
            handlers.push(Y.Handlers[classify(handlerName)]);
        });
        
        app.get.apply(app, [].concat(path).concat(expyui.expose()).concat(handlers));
        app.map(path, name);
        app.annotate(path, {
            dispatch: {
                handlerNames: handlerNames
            }
        });
    }

    mapRoute('home', '/', 'home-handler');
    mapRoute('news', '/news', 'news-handler');

    routes = app.getRouteMap();
    views = {};
    Object.keys(routes).forEach(function (name) {
        var routeConfig = routes[name];

        views[name] = {
            type: 'Views.' + classify(name) + 'View', // 'Views.HomeView'
            preserve: true // default
        };
    });


    PN.ROUTES = { routes: routes};
    PN.VIEWS = { views: views};
    app.expose(PN, 'PN');

    app.listen(appPort, function () {
        console.log('Ready to serve on port %s', appPort);
    });
});
