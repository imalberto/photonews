/*jslint nomen:true, node:true*/
/*jshint expr:true*/

var Locator = require('locator'),
    LocatorHandlebars = require('locator-handlebars'),
    LocatorYUI = require('locator-yui');

module.exports = function (app) {
    var loc;

    loc = new Locator({
        buildDirectory: __dirname + '/build'
    });

    // expyui and expview dependency on locator
    loc.plug(new LocatorHandlebars({format: 'yui'}))
        .plug(new LocatorYUI())
        .parseBundle(__dirname);

    app.set('locator', loc);
};
