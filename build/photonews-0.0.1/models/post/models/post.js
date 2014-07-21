YUI.add('models/post', function (Y, NAME, __imports__, __exports__) {
    "use strict";
    /*jslint nomen:true, node:true*/
    /*jshint esnext:true*/

    var PN = __imports__["pn"].PN;

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

    __exports__["default"] = PostModel;
    return __exports__;
}, '@VERSION@', {"es": true, "requires": ["pn"]});
