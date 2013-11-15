/*
 * Copyright (c) 2013, Yahoo! Inc.  All rights reserved.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE.txt file for terms.
 */

/*jslint nomen:true, node:true*/
/*jshint esnext:true*/

import {Model} from 'model';
import {Models} from 'default-model';
import {Base} from 'base';
import {PN} from 'util';

var Class,
    classify = PN.util.classify;

Class = Base.create('post-model', Model, [], {
    initializer: function () {
    }
}, {
    ATTRS: {
        title: {
            value: ''
        },
        url: {
            value: ''
        },
        content: {
            value: ''
        }
    }
});

Models[classify(Class.NAME)] = Class;

export default Class;

