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
                query: req.query || {},
                name: name
            };

            // Router is reponsible for hooking up the correct model, the
            // correct controller, and the correct view which will point to a
            // handlebars template.
            //
            if (RouteClass) {
                route = new RouteClass();
                if (typeof route.model === 'function') {
                    model = route.model(config);
                } else if (ModelClass) {
                    model = new ModelClass();
                } else {
                    // empty model since we're not sure what to do
                    model = Y.Model();
                }

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

            if (ControllerClass) {
                controller = new ControllerClass(config);
            } else {
                controller = new Y.Controllers.BaseController(config);
            }

            route.setupController(controller, model);

            res.render(name, controller.toJSON());

        };
    };

}, '@VERSION', { requires: [
    'base-controller',
    'model',
    'util'
]});
