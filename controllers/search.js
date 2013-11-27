/*
 * Copyright (c) 2013, Yahoo! Inc.  All rights reserved.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE.txt file for terms.
 */

/*jslint nomen:true*/
/*jshint esnext:true*/

import PhotosModel from 'models/photos';
import {Base} from 'base-build';
import {DefaultController} from 'default-controller';

var SearchController = Base.create('search-controller', DefaultController, [], {
    initializer: function (config) {
        // Pass the search query to the model for loading
        this.set('modelOptions', {
            searchQuery: config.query.q
        });
    }
}, {
    ATTRS: {
        modelClass: {
            value: PhotosModel
        },

        modelOptions: {
            value: ''
        }
    }
});

export default SearchController;
