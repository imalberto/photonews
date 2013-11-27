/*jslint nomen:true, node:true*/
/*global YUI*/

YUI.add('pn', function (Y) {

    'use strict';

    var classify    = Y.PNUtil.classify,
        Controllers = Y.namespace('Controllers'),
        Models      = Y.namespace('Models'),
        Views       = Y.namespace('Views');

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

    // registering default stuff
    Controllers.register('base', Y.BaseController);
    Models.register('base', Y.BaseModel);

    if (Y.BaseView) {
        Views.register('base', Y.BaseView);
    }

}, '@VERSION', {
    requires: [
        'util',
        'base-model',
        'base-controller',
        'base-view'
    ]
});
