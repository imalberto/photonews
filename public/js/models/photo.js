/*
 * Copyright (c) 2013, Yahoo! Inc.  All rights reserved.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE.txt file for terms.
 */

/*jslint nomen:true*/
/*jshint esnext:true*/
/*global */

import {Model} from 'model';
import {Base} from 'base-build';

var PhotoModel = Base.create('photo-model', Model, [], {}, {
    ATTRS: {
        title: {
            value: ''
        },
        url: {
            value: ''
        }
    }
});

export default PhotoModel;
