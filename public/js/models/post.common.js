
/*jslint nomen:true, node:true*/
/*global YUI*/

YUI.add('post-model', function (Y, NAME) {

    'use strict';

    var Class,
        classify = Y.PN.util.classify;

    Class = Y.Base.create('postModelClass', Y.Model, [], {
        initializer: function () {
        }
    }, {
        ATTRS: {
            title: {
                value: ''
            },
            url: {
                value: ''
            },
            content: {
                value: ''
            }
        }
    });

    Y.namespace('Models')[classify(NAME)] = Class;

}, '@VERSION', { requires: [
    'model',
    'util'
]});
