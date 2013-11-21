/*
 * Copyright (c) 2013, Yahoo! Inc.  All rights reserved.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE.txt file for terms.
 */

/*jslint nomen:true, node:true*/
/*global YUI*/

YUI.add('default-view-client', function (Y, NAME) {

    'use strict';

    Y.DefaultView = Y.View;

}, '@VERSION', {
    affinity: 'client',
    requires: ['base', 'view'],
    condition: {
        name: 'default-view-client',
        trigger: 'default-view',
        when: 'instead'
    }
});
