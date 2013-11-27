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
