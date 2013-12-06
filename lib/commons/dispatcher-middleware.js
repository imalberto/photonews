/*jslint nomen:true, node:true*/
/*jshint unused:false*/
/*global YUI*/

YUI.add('dispatcher-middleware', function (Y) {

    'use strict';

    var classify = Y.PNUtil.classify;

    Y.PNDispatcher = function (name) {

        return function (req, res) {

            var RouteClass = Y.Routes[classify(name + '-route')],
                ControllerClass = Y.Controllers[classify(name + '-controller')],
                ModelClass = Y.Models[classify(name + '-model')],
                config,
                controller,
                model,
                route,
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

            config = {
                params: req.params || {},
                query: req.query || {}
            };

            // Router is reponsible for hooking up the correct model, the
            // correct controller, and the correct view which will point to a
            // handlebars template.
            //
            if (RouteClass) {
                route = new RouteClass();
                // NOTE can also pass req.params to model() here and have
                //      model() return a Promise instead the
                //      controller.toJSON() ?
                //
                // TODO should route.model() return the class, or the instance
                //      of the model ??
                if (typeof route.model === 'function') {
                    model = route.model(config);
                } else if (ModelClass) {
                    model = new ModelClass();
                } else {
                    // empty model since we're not sure what to do
                    model = Y.Model();
                }

                // model = route.modelP(Y.merge({}, {
                //     params: req.params,
                //     query: req.query
                // }));
            } else {
                route = new Y.Routes.BaseRoute();
                if (ModelClass) {
                    // TODO instead of creating a base one here, why not
                    //      generate a new one for `name` ?
                    model = new ModelClass(data);
                } else {
                    model = route.model(data);
                }
            }

            config = {
                params: req.params || {},
                query: req.query || {},
                name: name
            };
            if (ControllerClass) {
                controller = new ControllerClass(config);
            } else {
                controller = new Y.Controllers.BaseController(config);
            }

            route.setupController(controller, model);

            //////
            // config = Y.merge({}, req.params || {}, {
            //     query: req.query,
            //     name: name
            // });
            // ModelClass = ControllerClass.modelClass;

            // if (ControllerClass) {
            //     controller = new ControllerClass(config);
            // } else {
            //     controller = new Y.Controllers.BaseController(config);
            // }

            // ModelClass = controller.get('modelClass') ||
            //                 Y.Models[classify(name + '-model')];
            // // HACK there is no way to know if `data` matches the `model`
            // //      ModelList should accept Array
            // //      Model should accept Object
            // model = new ModelClass(data);
            // controller.set('model', model);

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

            res.render(name, controller.toJSON());

        };
    };

}, '@VERSION', { requires: [
    'base-controller',
    'model',
    'util'
]});
