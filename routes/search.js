
/*jslint nomen:true, node:true*/
/*jshint esnext:true*/

import {Base} from 'base-build';
import {BaseRoute} from 'base-route';
import PhotosModel from 'models/photos';
import {Promise} from 'promise';

var SearchRoute = Base.create('search-route', BaseRoute, [], {
    initializer: function (config) {
        console.log('SearchRoute initialized: ' + config);
    },

    /**
    @params {Object} config
        @params {Object} config.params
        @params {Object} config.query
    @return {Object}
    **/
    model: function (config) {
       return new Promise(function (fulfill, reject) {
            var model = new PhotosModel();

            model.load({query: config.query.q}, function (err) {
                if (err) {
                    return reject(err);
                }
                fulfill(model.toJSON());
            });
       });
    },

    modelX: function (data) {

        // return new Promise(function (fulfill, reject) {
        //     var model = new PhotosModel();

        //     // TODO check for model.isNew() etc to fulfill the promise 
        //     //      immediately if data is ready

        //     model.load({/*params here*/}, function (err) {
        //         if (err) {
        //             return reject(err);
        //         }

        //         fulfill(model.toJSON);
        //     });
        // });

        // In this case, we are using the PhotosModel
        var model = new PhotosModel(data);

        // return a promise ??
        return model;
    },

    setupController: function (controller, model) {
        SearchRoute.superclass.setupController.call(this, controller, model);

        controller.FOO = 'BAR';
        // OR the attribute is defined
        // controller.set('FOO', 'BAR');

        // add custom code here
    }
}, {
    ATTRS: {
    }
});

export default SearchRoute;

