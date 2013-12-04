/*
 * Copyright (c) 2013, Yahoo! Inc.  All rights reserved.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE.txt file for terms.
 */

/*jslint nomen:true*/
/*jshint esnext:true*/

import PhotosModel from 'models/photos';
import {extend, merge} from 'oop';
import {Base} from 'base-build';
import {Promise} from 'promise';

'use strict';

function PhotoController() {
    PhotoController.superclass.constructor.apply(this, arguments);
};

PhotoController.ATTRS = {
    modelClass: {
        value: PhotosModel
    },
    model: {
        value: null
    },
    name: {
        value: 'search'
    }
};

extend(PhotoController, Base, {
    initializer: function (config) {
        var modelClass  = this.get('modelClass'),
            name        = this.get('name'),
            model       = new modelClass(),
            photoId     = config.id,
            self        = this;

        this.set('model', model);

        this._promise = new Promise(function (fulfill, reject) {
            if (model.isNew ? !model.isNew() : (model.size() > 0)) {
                fulfill(self.mergeData(model, photoId));
            }

            model.load({name: name}, function (err) {
                if (err) {
                    console.error('** ERROR **: photo-controller.initializer() failed: %s', err);
                    reject(err);
                    return;
                }

                fulfill(self.mergeData(model, photoId));
            });
        });
    },

    mergeData: function (model, id) {
        var photo,
            mergedPhoto;

        photo = model.item(id);

        if (photo) {
            mergedPhoto = merge(photo.toJSON(), {
                prev: +id - 1,
                next: +id + 1 
            });

            console.log(mergedPhoto);
            return mergedPhoto;
        }

        return null;
    },

    then: function (fulfill, reject) {
        return this._promise.then(fulfill, reject);
    }
});

export default PhotoController;

