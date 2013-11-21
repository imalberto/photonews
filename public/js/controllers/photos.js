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

var Class = Base.create('photos-controller', DefaultController, {}, {
    ATTRS: {
        modelClass: {
            value: PhotosModel
        }
    }
});

export default Class;
