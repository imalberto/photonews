/*
 * Copyright (c) 2013, Yahoo! Inc.  All rights reserved.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE.txt file for terms.
 */

/*jslint nomen:true, node:true*/
/*global YUI*/

YUI.add('default-model', function (Y, NAME) {
    'use strict';

    var Class,
        classify = Y.PN.util.classify;

    Class = Y.Base.create('defaultModelClass', Y.Model, [], {
        initializer: function () {
        }
    }, {
        ATTRS: {
        }
    });

    // DefaultModel
    Y.namespace('Models')[classify(NAME)] = Class;

}, '@VERSION', { requires: [
    'model',
    'util'
]});

