/*
 * Copyright (c) 2013, Yahoo! Inc.  All rights reserved.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE.txt file for terms.
 */

/*jslint nomen:true, node:true*/
/*global YUI*/

YUI.add('base-view-client', function (Y) {

    'use strict';

    Y.BaseView = Y.View;

}, '@VERSION', {
    affinity: 'client',
    requires: ['base', 'view'],
    condition: {
        name: 'base-view-client',
        trigger: 'base-view',
        when: 'instead'
    }
});
