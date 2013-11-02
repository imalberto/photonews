
/*jslint nomen:true, node:true*/
/*global YUI*/

YUI.add('photos-controller', function (Y, NAME) {
	var classify = Y.PN.util.classify,
        Class;

    Class = Y.Base.create('photosControllerClass', Y.Controllers.DefaultController, {
    }, {
        ATTRS: {
            // specify the model class to use for this controller
            // optional: if not specified, a default `NewsModel` will be used
            modelClass: {
                value: Y.Models.PhotosModel
            }
        }
    });

	Y.namespace('Controllers')[classify(NAME)] = Class;


}, '@VERSION', { requires: [
    'default-controller',
	'photos-model',
	'promise',
	'util'
]});
