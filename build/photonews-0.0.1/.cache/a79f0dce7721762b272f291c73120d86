YUI.add("routes/photos", function(Y, NAME, __imports__, __exports__) {
    "use strict";

    /*jslint nomen:true, node:true*/
    /*jshint esnext:true*/

    function PhotosRoute(req, res, next) {
        // sharing this route for photos and search-photos routes
        var query = (req.query && req.query.q) || 'jpop 2014',
            count = (req.query && req.query.c) || 1;
        req.store.find('photos', { query: query, count: count }).then(function (model) {
            res.render('photos', {items: model.toJSON()});
        }, next);
    }

    __exports__["default"] = PhotosRoute;
    return __exports__;
}, "@VERSION@", {"es":true,"requires":[]});