/*jslint nomen:true, node:true*/
/*global YUI*/

YUI.add('dispatcher-middleware', function (Y) {

    'use strict';

    var classify = Y.PNUtil.classify;

    Y.PNDispatcher = function (name) {

        return function (req, res) {

            var ControllerClass = Y.Controllers[classify(name + '-controller')],
                // ModelClass = Y.Models[classify(name + '-model')],
                ModelClass,
                controller,
                model,
                config,
                data;

            // FIXME - photo-controller is using photos-model, which is a problem
            //         using the above logic
            //       - the controller should dictate what model it uses
            //       - only if controller does not specify one, should the
            //         dispatch select one

            // FIXME
            // This block here should only be exexcuted during bootstrap.
            if (typeof window !== 'undefined') {
                data = Y.config.global.DATA[name];
            }

            config = Y.merge({}, req.params || {}, {
                query: req.query,
                name: name
            });
            ModelClass = ControllerClass.modelClass;

            if (ControllerClass) {
                controller = new ControllerClass(config);
            } else {
                controller = new Y.Controllers.BaseController(config);
            }

            ModelClass = controller.get('modelClass') ||
                            Y.Models[classify(name + '-model')];
            // HACK there is no way to know if `data` matches the `model`
            //      ModelList should accept Array
            //      Model should accept Object
            model = new ModelClass(data);
            controller.set('model', model);

            // if (ModelClass) {
            //     model = new ModelClass(data);
            // } else {
            //     model = new Y.Model(data);
            // }

            // config = Y.merge({}, req.params || {}, {
            //     query: req.query,
            //     name: name,
            //     model: model
            // });
            // if (ControllerClass) {
            //     controller = new ControllerClass(config);
            // } else {
            //     controller = new Y.Controllers.BaseController(config);
            // }

            res.render(name, controller);

        };
    };

}, '@VERSION', { requires: [
    'base-controller',
    'model',
    'util'
]});
