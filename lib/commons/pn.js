/*jslint nomen:true, node:true*/
/*global YUI*/

YUI.add('pn', function (Y) {

    'use strict';

    var classify    = Y.PNUtil.classify,
        Controllers = Y.namespace('Controllers'),
        Models      = Y.namespace('Models'),
        Routes      = Y.namespace('Routes'),
        Views       = Y.namespace('Views');

    Controllers.register = function (name, ControllerClass) {
        ControllerClass.NAME = classify(name + '-controller');
        Controllers[ControllerClass.NAME] = ControllerClass;
    };

    Models.register = function (name, ModelClass) {
        ModelClass.NAME = classify(name + '-model');
        Models[ModelClass.NAME] = ModelClass;
    };

    Routes.register = function (name, RouteClass) {
        RouteClass.NAME = classify(name + '-route');
        Routes[RouteClass.NAME] = RouteClass;
    };

    Views.register = function (name, ViewClass) {
        ViewClass.NAME = classify(name + '-view');
        Views[ViewClass.NAME] = ViewClass;
    };

    // registering default stuff
    Controllers.register('base', Y.BaseController);
    Routes.register('base', Y.BaseRoute);
    Routes.register('base', Y.BaseRoute);

    if (Y.BaseView) {
        Views.register('base', Y.BaseView);
    }

    //
    Y.controllerFor = function (name) {
        var selector = (name === 'base') ? name : name + '-controller';
        return Y.Controllers[classify(selector)];
    };
    Y.modelFor = function (name) {
        var selector = (name === 'base') ? name : name + '-model';
        return Y.Models[classify(selector)];
    };
    Y.routeFor = function (name) {
        var selector = (name === 'base') ? name : name + '-route';
        return Y.Routes[classify(selector)];
    };

}, '@VERSION', {
    requires: [
        'util',
        'base-controller',
        'base-view'
    ]
});
