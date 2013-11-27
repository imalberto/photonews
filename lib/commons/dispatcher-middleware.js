/*jslint nomen:true, node:true*/
/*global YUI*/

YUI.add('dispatcher-middleware', function (Y) {

    'use strict';

    var classify = Y.PNUtil.classify;

    Y.PNDispatcher = function (name) {

        return function (req, res) {

            var ControllerClass = Y.Controllers[classify(name + '-controller')],
                ModelClass = Y.Models[classify(name + '-model')],
                controller,
                model,
                config,
                data;

            if (typeof window !== 'undefined') {
                data = Y.config.global.DATA[name];
            }

            if (ModelClass) {
                model = new ModelClass(data);
            } else {
                model = new Y.Model(data);
            }

            config = Y.merge({}, req.params || {}, {
                query: req.query,
                name: name,
                model: model
            });
            if (ControllerClass) {
                controller = new ControllerClass(config);
            } else {
                controller = new Y.Controllers.BaseController(config);
            }

            res.render(name, controller);

        };
    };

}, '@VERSION', { requires: [
    'base-controller',
    'model',
    'util'
]});
