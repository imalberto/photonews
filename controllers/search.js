
/*jslint nomen:true*/
/*jshint esnext:true*/
/*global console*/

// import PhotosModel from 'models/photos';
// import {extend} from 'oop';
import {BaseController} from 'base-controller';
import {Base} from 'base-build';
import {Promise} from 'promise';

'use strict';

var SearchController = Base.create('search-controller', BaseController, [], {

    // This hook can be used to customize the controller based on the incoming
    // configuration passed in.
    //
    // config: {
    //   params: {}
    //   query: {},
    //   name: {}
    // }
    // initializer: function (config) {
    //    this.config = config; 
    // },

    /**
    This method returns a Promise or object to load the model based on any
    configuration (if necessary) that was passed in via the `initializer`
    method.

    @return {Object|Promise} 
    **/
    toJSON: function () {
        var model = this.get('model'),
            name = this.get('name'),
            q = this.config.query.q;

        return new Promise(function (fulfill, reject) {

            // FIXME doing a search, so let's not reuse cache
            // TODO need a flag to detect if it's the same search, and if so do
            //      not redo the same query.
            //
            // if (model.isNew ? !model.isNew() : (model.size() > 0)) {
            //     fulfill(model.toJSON());
            //     return;
            // }

            model.load({name: name, query: q}, function (err/*, res*/) {
                if (err) {
                    console.error('** ERROR **: base-controller.initializer() failed: %s', err);
                    reject(err);
                    return;
                }
                fulfill(model.toJSON());
            });
        });
        // return SearchController.superclass.toJSON.call(this);
    }

    // initializerXX: function (config) {
    //     var modelClass  = this.get('modelClass'),
    //         name        = this.get('name'),
    //         model       = new modelClass(),
    //         query       = config.query.q;

    //     this.set('model', model);

    //     this._promise = new Promise(function (fulfill, reject) {
    //         if (model.isNew ? !model.isNew() : (model.size() > 0)) {
    //             fulfill(model.toJSON());
    //             return;
    //         }

    //         model.load({name: name, query: query}, function (err) {
    //             if (err) {
    //                 console.error('** ERROR **: search-controller.initializer() failed: %s', err);
    //                 reject(err);
    //                 return;
    //             }
    //             fulfill(model.toJSON());
    //         });
    //     });
    // },

    // then: function (fulfill, reject) {
    //     return this._promise.then(fulfill, reject);
    // }
}, {
    ATTRS: {
        // modelClass: {
        //     value: PhotosModel
        // },
        model: {
            value: null
        },
        name: {
            value: 'search'
        }
    }
});

export default SearchController;
