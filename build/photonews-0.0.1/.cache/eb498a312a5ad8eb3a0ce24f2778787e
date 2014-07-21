YUI.add("routes/default", function(Y, NAME, __imports__, __exports__) {
    "use strict";

    /*jslint nomen:true, node:true*/
    /*jshint esnext:true*/

    var DefaultRoute = function (req, res, next) {
        var name = req.annotations.name;
        req.store.find(name, req.params).then(function (model) {
            res.render(name, model.toJSON());
        }, next).then(null, next);
    };

    __exports__["default"] = DefaultRoute;
    return __exports__;
}, "@VERSION@", {"es":true,"requires":[]});