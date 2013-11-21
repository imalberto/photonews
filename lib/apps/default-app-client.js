/*
 * Copyright (c) 2013, Yahoo! Inc.  All rights reserved.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE.txt file for terms.
 */

/*jslint nomen:true, node:true*/
/*global YUI*/

YUI.add('default-app-client', function (Y, NAME) {

    'use strict';

    Y.DefaultApp = Y.App;

}, '@VERSION', {
    affinity: 'client',
    requires: ['base', 'app'],
    condition: {
        name: 'default-app-client',
        trigger: 'default-app',
        when: 'instead'
    }
});
