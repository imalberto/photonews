/*
 * Copyright (c) 2013, Yahoo! Inc.  All rights reserved.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE.txt file for terms.
 */

/*jslint nomen:true*/
/*jshint esnext:true*/
/*global */

import {Models} from 'default-model';
import {Model} from 'model';
import {Base} from 'base';
import {PN} from 'util';

var Class,
    classify = PN.util.classify;

Class = Base.create('photo-model', Model, [], {}, {
    ATTRS: {
        title: {
            value: ''
        },
        url: {
            value: ''
        }
    }
});

Models[classify(Class.NAME)] = Class;

export default Class;
