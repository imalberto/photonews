
/*jslint nomen:true, node:true*/
/*jshint esnext:true*/

import {Base} from 'base-build';
import {BaseRoute} from 'base-route';
import PhotosModel from 'models/photos';
import {Promise} from 'promise';
import {config as Yconfig} from 'yui';

var SearchRoute = Base.create('search-route', BaseRoute, [], {

    /**
    @params {Object} config
        @params {Object} config.params
        @params {Object} config.query
        @params {String} config.name
    @return {Object|Promise}
    **/
    model: function (config) {
       return new Promise(function (fulfill, reject) {
            var model = new PhotosModel();

            // reset the global photos cache
            if (typeof window !== 'undefined') {
                Yconfig.global.DATA.photos = [];
            }

            model.load({query: config.query.q}, function (err) {
                if (err) {
                    return reject(err);
                }
                fulfill(model.toJSON());
            });
       });
    },

    setupController: function (controller, model) {
        SearchRoute.superclass.setupController.call(this, controller, model);

        // Add any kind of syntatic data here required for the view
        controller.XXX = 'YYY';

        // OR if the attribute is defined
        // controller.set('FOO', 'BAR');

        // add custom code here
    }
}, {
    ATTRS: {
    }
});

export default SearchRoute;

