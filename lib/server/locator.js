/*jslint nomen:true, node:true*/
/*jshint expr:true*/

/**
`locator` plugin that extends `express` `app`.

Usage:

    var express = require('express'),
        app = express(),
        locator = require('./lib/server/locator');

    locator.extend(app);

@module lib/server/locator
**/

'use strict';

var Locator = require('locator'),
    LocatorHandlebars = require('locator-handlebars'),
    LocatorYUI = require('locator-yui');

/**
@method parseBundle
@param {Object} config configuration object passed to Locator
@return {ExpressApp}
**/
function parseBundle(config) {
    /*jshint validthis:true*/
    var app = this,
        loc;

    if (!config.buildDirectory) {
        throw new Error('Locator: parseBundle() missing ' +
                        '"buildDirectory" configuration');
    }

    if (!config.applicationDirectory) {
        throw new Error('Locator: parseBundle() missing ' +
                        '"applicationDirectory"');
    }

    loc = new Locator({
        buildDirectory: config.buildDirectory
    });

    loc.plug(new LocatorHandlebars({format: 'yui'}))
        .plug(new LocatorYUI())
        .parseBundle(config.applicationDirectory);

    app.set('locator', loc);

    return app;
}

function extend(app, brand) {
    if (!app[brand]) {
        Object.defineProperty(app, brand || '@modown-router', { value: true });
        app.parseBundle = parseBundle;
    }

    return app;
}
module.exports = {
    extend: extend
};
