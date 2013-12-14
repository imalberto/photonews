/*jslint nomen:true*/
/*jshint esnext:true*/

import {PN} from 'pn';

var PhotoModel = PN.Model.extend({});
PhotoModel.ATTRS = {
    title: {
        value: ''
    },
    url: {
        value: ''
    }
};

export default PhotoModel;
