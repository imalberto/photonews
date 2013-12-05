
/*jslint nomen:true, node:true*/
/*jshint esnext:true*/

import {Base} from 'base-build';
import {BaseRoute} from 'base-route';
import PhotosModel from 'models/photos';
//import {Promise} from 'promise';

var SearchRoute = Base.create('search-route', BaseRoute, [], {
    initializer: function (config) {
        console.log('SearchRoute initialized: ' + config);
    },

    /**
    @return {Object}
    **/
    model: function () {

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

        // // In this case, we are using the PhotosModel
        var model = new PhotosModel();

        // return a promise ??
        return model;
    },

    setupController: function (controller, model) {
        controller.set('model', model);
    }
}, {
    ATTRS: {
    }
});

export default SearchRoute;

