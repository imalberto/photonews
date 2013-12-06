
/*jslint nomen:true*/
/*jshint esnext:true*/

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
    initializer: function (config) {
       this.config = config;
    },

    /**
    This method returns a Promise or object to load the model based on any
    configuration (if necessary) that was passed in via the `initializer`
    method.

    @return {Object|Promise}
    **/
    toJSON: function () {
        var model = this.get('model');

        return new Promise(function (fulfill) {
            if (model && Promise.isPromise(model)) {
                model.then(function (json) {
                    fulfill(json);
                });
            } else {
                fulfill([]);
            }
        });

        // return new Promise(function (fulfill, reject) {
        //     if (model && typeof model.toJSON === 'function') {
        //         fulfill(model.toJSON());
        //     } else {
        //         reject(new Error('invalid model: ' + name + '-model'));
        //     }
        // });
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
