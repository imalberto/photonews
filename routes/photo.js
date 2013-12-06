
/*jslint nomen:true, node:true*/
/*jshint esnext:true*/

import {Base} from 'base-build';
import {BaseRoute} from 'base-route';
import PhotoModel from 'models/photo';
// import PhotoModels from 'models/photos';
// import {Promise} from 'promise';
import {config as Yconfig} from 'yui';

var PhotoRoute = Base.create('photo-route', BaseRoute, [], {
    initializer: function (config) {
        console.log('PhotoRoute initialized: ' + config);
    },

    model: function (config) {

        var photoId,
            model,
            photos;

        this.config = config;

        photos = this.getPhotos();

        photoId = config.params.id || 0;

        // TODO use a more appropriate `id` !
        if (photos.length > 0) {
            model = new PhotoModel(photos[photoId]);
        } else {
            throw new Error('NOT YET IMPLEMENTED');
        }

        return model;
    },

    setupController: function (controller, model) {
        PhotoRoute.superclass.setupController.call(this, controller, model);

        var id = this.config.params.id;

        // Not needed, but just to prove a point
        controller.photos = this.getPhotos();
        controller.prev = +id - 1;
        controller.next = +id + 1;
    },

    getPhotos: function () {
        var photos = [];

        if (typeof window !== 'undefined') {
            photos = (Yconfig.global.DATA.photos &&
                        Yconfig.global.DATA.photos.items) || [];
        }
        return photos;
    }
}, {
    ATTRS: {
    }
});

export default PhotoRoute;

