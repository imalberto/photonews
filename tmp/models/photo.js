YUI.add("models/photo", function(Y, NAME, __imports__, __exports__) {
    "use strict";
    /*jslint nomen:true*/
    /*jshint esnext:true*/

    var PN = __imports__["pn"].PN;

    var PhotoModel = PN.Model.extend({});
    PhotoModel.ATTRS = {
        title: {
            value: ''
        },
        url: {
            value: ''
        }
    };

    __exports__["default"] = PhotoModel;
    return __exports__;
}, "@VERSION@", {"es":true,"requires":["pn"]});