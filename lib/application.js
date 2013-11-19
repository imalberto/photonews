/*
 * Copyright (c) 2013, Yahoo! Inc.  All rights reserved.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE.txt file for terms.
 */

/*jslint nomen:true, node:true*/
/*jshint expr:true*/


/**
@module application
**/

'use strict';

var expview = require('express-view'),
    expyui = require('express-yui'),
    registry = require('./registry'),
    store = require('./store');

/**
@public
**/
function extend(app, brand) {
    if (!app[brand]) {
        Object.defineProperty(app, brand || '@modown-application', { value: true });

        expview.extend(app);
        expyui.extend(app);

        store.extend(app);
        registry.extend(app);
    }
}

module.exports = {
    extend: extend
};

