/*
 * Copyright (c) 2013, Yahoo! Inc.  All rights reserved.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE.txt file for terms.
 */

/*jslint nomen:true, node:true*/
/*jshint esnext:true*/

import {Model} from 'model';
import {Base} from 'base-build';

var PostModel = Base.create('post-model', Model, [], {}, {

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

export default PostModel;
