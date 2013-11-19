/*
 * Copyright (c) 2013, Yahoo! Inc.  All rights reserved.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE.txt file for terms.
 */

/*jslint nomen:true, node:true*/
/*global YUI*/

YUI.add('default-handler', function (Y, NAME) {

    var classify = Y.PN.util.classify;

    function DefaultHandler(name) {

        // Extract the controller and model class here
        var ControllerClass,
            ModelClass;

        ControllerClass = Y.Controllers[classify(name + '-controller')];
        ModelClass = Y.Models[classify(name + '-model')];

        return function (req, res) {

            var controller,
                model,
                config,
                data = {};

            if (typeof window !== 'undefined') {
                data = Y.global.config.DATA;
            } else {
                data = req.params;
            }

            if (ModelClass) {
                model = new ModelClass(data);
            } else {
                model = new Y.Models.DefaultModel(data);
            }

            config = { name: name, model: model };
            if (ControllerClass) {
                controller = new ControllerClass(config);
            } else {
                controller = new Y.Controllers.DefaultController(config);
            }

            res.render(name, controller);

        };
    };

    Y.DefaultHandler = DefaultHandler;

}, '@VERSION', { requires: [
    'util'
]});
