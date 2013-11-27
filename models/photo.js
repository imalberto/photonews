/*jslint nomen:true*/
/*jshint esnext:true*/

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
