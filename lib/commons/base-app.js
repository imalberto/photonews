/*
 * Copyright (c) 2013, Yahoo! Inc.  All rights reserved.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE.txt file for terms.
 */

/*jslint nomen:true, node:true*/
/*global YUI*/

YUI.add('base-app', function (Y, NAME) {

    'use strict';

    // placeholder for the app on the server, but on the client
    // this module will be replaced with another module that
    // implements a more suitable class for the client.
    Y.BaseApp = Y.Base.create(NAME, Y.Base, [], {}, {});

}, '@VERSION', {
    requires: ['base']
});
