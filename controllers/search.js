/*
 * Copyright (c) 2013, Yahoo! Inc.  All rights reserved.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE.txt file for terms.
 */

/*jslint nomen:true*/
/*jshint esnext:true*/

import PhotosModel from 'models/photos';
import {extend} from 'oop';
import {Base} from 'base-build';
import {Promise} from 'promise';

'use strict';

function SearchController() {
    SearchController.superclass.constructor.apply(this, arguments);
};

SearchController.ATTRS = {
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

extend(SearchController, Base, {
    initializer: function (config) {
        var modelClass  = this.get('modelClass'),
            name        = this.get('name'),
            model       = new modelClass(),
            query       = config.query.q;

        this.set('model', model);

        this._promise = new Promise(function (fulfill, reject) {
            if (model.isNew ? !model.isNew() : (model.size() > 0)) {
                fulfill(model.toJSON());
                return;
            }

            model.load({name: name, query: query}, function (err) {
                if (err) {
                    console.error('** ERROR **: search-controller.initializer() failed: %s', err);
                    reject(err);
                    return;
                }
                fulfill(model.toJSON());
            });
        });
    },

    then: function (fulfill, reject) {
        this._promise.then(fulfill, reject);
    }
});

export default SearchController;
