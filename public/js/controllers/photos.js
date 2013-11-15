/*
 * Copyright (c) 2013, Yahoo! Inc.  All rights reserved.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE.txt file for terms.
 */

/*jslint nomen:true*/
/*jshint esnext:true*/

import PhotosModel from 'models/photos';

import {Base} from 'base';
import {Controllers} from 'default-controller';
import {PN} from 'util';


var classify = PN.util.classify,
    Class;

Class = Base.create('photos-controller', Controllers.DefaultController, {
}, {
    ATTRS: {
        modelClass: {
            value: PhotosModel
        }
    }
});

Controllers[classify(Class.NAME)] = Class;

export default Class;

