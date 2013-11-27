/*jslint nomen:true, node:true*/
/*global YUI*/

YUI.add('base-model', function (Y, NAME) {

    'use strict';

    Y.BaseModel = Y.Base.create(NAME, Y.Model, [], {}, {});

}, '@VERSION', { requires: [
    'base',
    'model'
]});

