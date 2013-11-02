
/*jslint nomen:true, node:true*/
/*global YUI*/

YUI.add('template-model', function (Y, NAME) {

    'use strict';

    var Class,
        classify = Y.PN.util.classify;

    Class = Y.Base.create('templateModelClass', Y.Model, [], {
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

