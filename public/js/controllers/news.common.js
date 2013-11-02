
/*jslint nomen:true, node:true*/
/*global YUI*/

YUI.add('news-controller', function (Y, NAME) {
    'use strict';

	var classify = Y.PN.util.classify,
        Class;

    Class = Y.Base.create('newsControllerClass', Y.Controllers.DefaultController, {
    }, {
        ATTRS: {
            // specify the model class to use for this controller
            // optional: if not specified, a default `NewsModel` will be used
            modelClass: {
                value: Y.Models.NewsModel
            }
        }
    });

	Y.namespace('Controllers')[classify(NAME)] = Class;

}, '@VERSION', { requires: [
    'default-controller',
	'news-model',
	'promise',
	'util'
]});
