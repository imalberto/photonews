YUI.add('routes/news', function (Y, NAME, __imports__, __exports__) {
    "use strict";

    /*jslint nomen:true, node:true*/
    /*jshint esnext:true*/

    var AboutRoute = function (req, res, next) {
        req.store.find('news', {}).then(function (model) {
            res.render('news', {items: model.toJSON()});
        }, next);
    };

    __exports__["default"] = AboutRoute;
    return __exports__;
}, '@VERSION@', {"es": true, "requires": []});
