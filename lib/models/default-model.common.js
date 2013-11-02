
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

