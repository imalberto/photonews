
/*jslint nomen:true, node:true*/

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
global.PN = {};
PN.CACHE = {};
PN.CONFIG = {};

////
// app express setup
loc = new Locator({
    buildDirectory: __dirname + '/build'
});

app = express();

appPort = process.env.PORT || 8666;
app.set('app port', appPort);
app.set('locator', loc);
app.set('layout', 'index');

expmap.extend(app);
expstate.extend(app);
expview.extend(app);
expyui.extend(app);

////
// middleware
//app.use(express.compress());
//app.use(express.favicon());

// for production: move to CDN
app.use(expyui['static'](__dirname + '/build'));
app.yui.setCoreFromAppOrigin();
app.yui.applyConfig({
    debug: true,
    combine: false
});

////
// routes
routes = require('./routes');

function mapRoute(name, path, callbacks) {
    app.get(path, expyui.expose(), callbacks);
    app.map(path, name);
}
console.log(routes);

mapRoute('home', '/', routes.home);
mapRoute('news', '/news', routes.news);
mapRoute('photos', '/photos', routes.photos);
mapRoute('about', '/about', routes.about);

PN.ROUTES = { routes: app.getRouteMap() };
app.expose(PN);

loc.plug(new LocatorHandlebars({ format: 'yui' }))
    .plug(new LocatorYUI({ config: { cache: true } }))
    .parseBundle(__dirname);

// using the 'ready' feature in app.yui
app.yui.ready(function (err) {
    if (err) {
        console.log(err);
        console.log(err.stack);
        return;
    }

    // preload the server instance before serving requests
    var Y = app.yui.use('flickr-model', 'news-model');
    if (!Y.FlickrModel) {
        console.error('** ERROR **: YUI modules not loaded in server instance');
        return;
    }

    app.listen(appPort, function () {
        console.log('Ready to serve on port %s', appPort);
    });
});
