/*
 * Copyright (c) 2013, Yahoo! Inc.  All rights reserved.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE.txt file for terms.
 */

/*jslint nomen:true, node:true*/
/*global YUI*/

YUI.add('base-app-client', function (Y) {

    'use strict';

    Y.BaseApp = Y.App;

}, '@VERSION', {
    affinity: 'client',
    requires: ['base', 'app'],
    condition: {
        name: 'base-app-client',
        trigger: 'base-app',
        when: 'instead'
    }
});
