/*
 * Copyright (c) 2013, Yahoo! Inc.  All rights reserved.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE.txt file for terms.
 */

/*jslint nomen:true, node:true*/
/*jshint expr:true*/
/*global getServerModules*/

/**
@module store
**/


/**
@method getServerModules
@public
**/
function getServerModules() {
    /*jshint validthis:true*/
    var app = this,
        serverModules;

    serverModules = Object.keys(app.yui._serverModules).filter(function (modName) {
        if (modName.indexOf('-template-') === -1 && modName.indexOf('-view') === -1) {
            return true;
        }
        return false;
    });
    return serverModules;
}

/**
@public
**/
function extend(app, brand) {
    if (!app[brand]) {
        Object.defineProperty(app, brand || '@modown-store', { value: true });

        app.getServerModules = getServerModules;
    }

    return app;
}

module.exports = {
    extend: extend
};
