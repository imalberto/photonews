/*
 * Copyright (c) 2013, Yahoo! Inc.  All rights reserved.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE.txt file for terms.
 */

/*jslint nomen:true, node:true*/
/*global YUI*/

YUI.add('base-model', function (Y, NAME) {

    'use strict';

    Y.BaseModel = Y.Base.create(NAME, Y.Model, [], {}, {});

}, '@VERSION', { requires: [
    'base',
    'model'
]});

