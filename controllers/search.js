
/*jslint nomen:true*/
/*jshint esnext:true*/

// import PhotosModel from 'models/photos';
// import {extend} from 'oop';
import {BaseController} from 'base-controller';
import {Base} from 'base-build';
import {Promise} from 'promise';

'use strict';

var SearchController = Base.create('search-controller', BaseController, [], {

    /**
    @params {Object} config
        @params {Object} config.params
        @params {Object} config.query
        @params {String} config.name
    **/
    //
    // Unless customizing initializer, no need to define it. `BaseController`
    // will take care of saving the `config`.
    //
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
        var model = this.get('model');

        return new Promise(function (fulfill, reject) {
            if (model && Promise.isPromise(model)) {
                model.then(function (json) {
                    fulfill(json);
                });
            } else if (model) {
                fulfill(model);
            } else {
                reject(new Error('controllers/search: invalid model'));
            }
        });
    }
}, {
    ATTRS: {
        model: {
            value: null
        },
        name: {
            value: 'search'
        }
    }
});

export default SearchController;
