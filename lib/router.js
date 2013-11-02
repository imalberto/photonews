
/*jslint nomen:true, node:true*/
/*jshint expr:true*/
/*global mapRoute, getViewsConfig, registerHandlers, registerControllers,
  registerModels, page, handler, model, controller*/

/**
`router` plugin that extends `express` `app`.

Usage:

    var express = require('express'),
        app = express(),
        router = require('./lib/router');

    router.extend(app);

@module router
**/

'use strict';

var libfs = require('fs'),
    libpath = require('path'),
    assert = require('assert'),
    util = require('./util'),
    classify = util.classify,
    expann = require('express-annotations'),
    expmap = require('express-map'),
    expyui = require('express-yui'),
    // YUI = require('yui').YUI,
    // Y = YUI(),
    DefaultModelClass,
    DefaultControllerClass,
    NewsModelClass,
    NewsModelListClass,
    YBase = require('yui/base').Base,
    YModel = require('yui/model').Model,
    YModelList = require('yui/model-list').ModelList,
    YPromise = require('yui/promise').Promise,
    Ywhen = require('yui/promise').when,
    Ybatch = require('yui/promise').batch,
    Ymix = require('yui').mix,
    YExtend = require('yui').extend;

// Y.applyConfig({ useSync: true });
// Y.use('model', 'model-list');
// assert(Y.Base, 'Y.Base not loaded');



/**
@public
**/
function extend(app, brand) {
    if (!app[brand]) {
        Object.defineProperty(app, brand || '@modown-router', { value: true });

        expmap.extend(app);
        expann.extend(app);


        app._controllers = {};
        app._handlers = {};
        app._models = {};

        app.controller = controller;
        app.handler = handler;
        app.model = model;
        app.page = page;
        app.registerHandlers = registerHandlers;
        app.registerControllers = registerControllers;
        app.registerModels = registerModels;

        // app.mapRoute = mapRoute;
        app.getViewsConfig = getViewsConfig;

        app.use(require('./middleware/renderer')());
    }

    return app;
}




///////////////////////////////////////////////////////////////////////////////
// Attached to `app`
///////////////////////////////////////////////////////////////////////////////

/**
Given `name` is set to "foo", the following will be inferred:
- path = "/foo"
- controller: "foo-controller"
- model: "foo-model"
- handler: "foo-handler"

@param {String} name
@param {String} path
**/
function page(name, path) {
    /*jshint validthis:true */
    var app = this,
        handler,
        fetcher;

    path || (path = '/' + name);

    handler = app.handler(name) || function (req, res, next) {

        var app = req.app,
            Y = app.yui.use(), // TODO async on client
            ControllerClass,
            ModelClass,
            controller,
            model;

        // model = req._fw.model;

        ControllerClass = app.controller(name);
        ModelClass = app.model(name);

        if (ModelClass) {
            // TODO should use `req.params` vs `app`
            model = new ModelClass(req.params);
        } else {
            model = new Y.Models.DefaultModel(req.params);
            // model = {};
        }

        if (ControllerClass) {
            // NOTE passing {model:model} to the constructor is **optional**
            controller = new ControllerClass({model: model});
            // OR: controller.set('model', model);
        } else {
            // controller = new DefaultControllerClass(model);
            // controller = new Y.Controllers.DefaultController({model: model});

            // By default, the default controller will use the default model
            // (which does not do much)
            controller = new Y.Controllers.DefaultController({model: model});
        }


        // monkey patch res.render
        // TODO handle client side
        // res.originalRender = res.render;
        // res.render = function (templateName, controller) {
        //     // req.params.news_id => use find()
        //     //
        //     controller.get('model').then(function (articles) {
        //         res.originalRender(templateName, {
        //             src: 'news',
        //             articles: articles
        //         });
        //     });
        // };

        // TODO have a plugin that redefine res.render
        // 
        // controller is the one that should be triggering the fetch
        res.render(name, controller);
    };

    app.get(path, expyui.expose(), handler);
    app.map(path, name);
}

function getViewsConfig() {
    /*jshint validthis:true */
    var app = this,
        routes,
        views;

    routes = app.getRouteMap();
    views = {};
    Object.keys(routes).forEach(function (name) {
        var routeConfig = routes[name];

        views[name] = {
            type: 'Views.' + classify(name) + 'View',
            preserve: false
        };
    });

    return views;
}

function registerControllers() {
    /*jshint validthis:true*/
    var app = this,
        // TODO handle async on client
        Y = app.yui.use(),
        names,
        controllers,
        loc;

    // TODO use locator to figure out those 
    names = [
        'news',
        'photos'
    ];

    names.forEach(function (name) {
        var controllerName = name + '-controller';
        app.controller(name, Y.Controllers[classify(controllerName)]);
    });
    console.log('Register Controllers OK');
}

function registerModels() {
    /*jshint validthis:true*/
    var app = this,
        // TODO handle async case on the client
        Y = app.yui.use(),
        // TODO query locator
        names;

    names = [
        // Add more route names here
        'news',
        'photos'
    ];

    names.forEach(function (name) {
        // app.model(name, require(libpath.resolve(__dirname, '..', 'models2/' + name)));
        //
        // The model name does not infer if it is a Y.Model vs Y.ModelList
        var modelName = name + '-model';

        app.model(name, Y.Models[classify(modelName)]);
    });
    console.log('Register Models OK');
}

function registerHandlers() {
    /*jshint validthis:true*/
    var app = this,
        handlers = ['about'];

    handlers.forEach(function (name) {
        app.handler(name, require(libpath.resolve(__dirname, '..', 'routes/' + name)));
    });
    console.log('Register Handlers OK');
}


///////////////////////////////////////////////////////////////////////////////
// PRIVATE
///////////////////////////////////////////////////////////////////////////////


function controller(name, controllerClass) {
    /*jshint validthis:true*/
    if (controllerClass) {
        this._controllers[name] = controllerClass;
        console.log('Register controller "%s" OK', name);
    }
    return this._controllers[name];
}

function model(name, modelClass) {
    /*jshint validthis:true*/
    if (modelClass) {
        this._models[name] = modelClass;
        console.log('Register model "%s" OK', name);
    }
    return this._models[name];
}


function handler(name, fn) {
    /*jshint validthis:true*/
    if (fn) {
        this._handlers[name] = fn;
        console.log('Registered handler "%s" OK', name);
    }
    return this._handlers[name];
}


///////////////////////////////////////////////////////////////////////////////
// Class
/////////////////////////////////////////////////////////////////////////////// 

// var model = new DefaultModelClass();
// var promise = model.findAll().then(function (fulfill, reject) {
// 
// });


/**
@protected
**/
// function DefaultControllerClass(models) {
//     var my = this;
// 
//     if (!Array.isArray(models)) {
//         this.models = [models];
//     } else {
//         this.models = models;
//     }
// 
//     // console.log('Using model "%s"', model.id);
//     // Object.keys(model).forEach(function (prop) {
//     //     // TODO Bind the model to the controller via Y.Model ?
//     //     my[prop] = model[prop];
//     // });
// 
//     // TODO find indirect way to save the model
//     // this.model = model;
//     // this.model.load();
// 
//     // NOTE: handle array of models by using BatchPromise
// 
//     this._promise = new YPromise(function (fulfill, reject) {
//         my.models[0].load({}, function (err, res) {
//             if (err) {
//                 return reject(err);
//             }
//             fulfill(res);
//         });
//     });
// 
//     // var promises = [];
//     // this.models.forEach(function (model) {
//     //     promises.push(
//     //         new YPromise(function (fulfill, reject) {
//     //             model.load({}, function (err, res) {
//     //                 if (err) {
//     //                     return reject(err);
//     //                 }
//     //                 fulfill(res);
//     //             });
//     //         })
//     //     );
//     // });
//     // this.batchPromises = Ybatch(promises);
// }

// DefaultControllerClass.prototype = {
//     get: function (key) {
// 
//         if (key === 'model') {
//             return this.model;
//         }
// 
//         // controller has priority
//         if (this[key]) {
//             return this[key];
//         }
// 
//         return this.model.get(key);
//     },
// 
//     then: function (fulfill, reject) {
//         return this._promise.then(fulfill, reject);
//     },
// 
//     // then: function (fulfill, reject) {
//     //     return this.batchPromises.then(fulfill, reject);
//     // },
// 
//     /**
//     Default serializer
//     **/
//     toJSON: function () {
//         return Ymix({/* add custom properties from controller here */}, model.toJSON());
//     }
// 
// };



// function mapRoute(name, path) {
//     var app = this,
//         args = [].slice.call(arguments),
//         handlerNames = args.slice(2),
//         handlers = [],
//         Y = app.yui._Y;
// 
//     handlerNames.forEach(function (handlerName) {
// 
//         var fname = classify(handlerName);
// 
//         if (handlerName.indexOf('-model') > -1) {
//             // TODO
//         } else if (handlerName.indexOf('-handler') > -1) {
//             handlers.push(Y.Handlers[fname]);
//         } else {
//             console.error('** ERROR ** : unknown handle type: ' + handlerName);
//         }
//     });
//     
//     app.get.apply(app, [].concat(path).concat(expyui.expose()).concat(handlers));
//     app.map(path, name);
//     app.annotate(path, {
//         dispatch: {
//             handlerNames: handlerNames
//         }
//     });
// }


module.exports.extend = extend;

