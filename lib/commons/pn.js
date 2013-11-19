/*
 * Copyright (c) 2013, Yahoo! Inc.  All rights reserved.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE.txt file for terms.
 */

/*jslint nomen:true, node:true*/
/*global YUI*/

YUI.add('pn', function (Y, NAME) {

    'use strict';

    var classify    = Y.PN.util.classify,
        Controllers = Y.namespace('Controllers'),
        Models      = Y.namespace('Models'),
        Views       = Y.namespace('Views'),
        Handlers    = Y.namespace('Handlers');

    Controllers.register = function (name, ControllerClass) {
        ControllerClass.NAME = classify(name + '-controller');
        Controllers[ControllerClass.NAME] = ControllerClass;
    };

    Models.register = function (name, ModelClass) {
        ModelClass.NAME = classify(name + '-model');
        Models[ModelClass.NAME] = ModelClass;
    };

    Views.register = function (name, ViewClass) {
        ViewClass.NAME = classify(name + '-view');
        Views[ViewClass.NAME] = ViewClass;
    };

    Handlers.register = function (name, HandlerClass) {
        Handlers[classify(name + '-handler')] = HandlerClass;
    };

    // registering default stuff
    Controllers.register('default', Y.DefaultController);
    Models.register('default', Y.DefaultModel);
    Handlers.register('default', Y.DefaultHandler);

    if (Y.DefaultView) {
        Views.register('default', Y.DefaultView);
    }

}, '@VERSION', {
    requires: [
        'util',
        'default-model',
        'default-controller',
        'default-handler'
    ],
    optionalRequires: ['default-view']
});
