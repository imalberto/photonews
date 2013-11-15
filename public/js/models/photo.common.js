
/*jslint nomen:true, node:true*/
/*global YUI*/

YUI.add('photo-model', function (Y, NAME) {

    'use strict';

    var Class,
        classify = Y.PN.util.classify;

    Class = Y.Base.create('photoModelClass', Y.Model, [], {
        initializer: function () {
        }
    }, {
        ATTRS: {
            // "id" is managed by Y.Model
            title: {
                value: ''
            },
            url: {
                value: ''
            }
        }
    });

    Y.namespace('Models')[classify(NAME)] = Class;

}, '@VERSION', { requires: [
    'model'
]});
