/*jslint nomen:true, node:true*/
/*jshint esnext:true*/

import {PN} from 'pn';

var PostModel = PN.Model.extend({});

PostModel.ATTRS = {
    title: {
        value: ''
    },
    url: {
        value: ''
    },
    content: {
        value: ''
    }
};

export default PostModel;
