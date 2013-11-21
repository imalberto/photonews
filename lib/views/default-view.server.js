/*
 * Copyright (c) 2013, Yahoo! Inc.  All rights reserved.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE.txt file for terms.
 */

/*jslint nomen:true, node:true*/
/*global YUI*/

YUI.add('default-view', function (Y, NAME) {

    'use strict';

    Y.DefaultView = Y.Base.create(NAME, Y.Base, [], {}, {});

}, '@VERSION', {
    affinity: 'server',
    requires: ['base']
});
