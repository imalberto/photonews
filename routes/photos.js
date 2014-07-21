
/*jslint nomen:true, node:true*/
/*jshint esnext:true*/

function PhotosRoute(req, res, next) {
    // sharing this route for photos and search-photos routes
    var query = (req.query && req.query.q) || 'jpop 2014';
    var count = (req.query && req.query.c) || 1;
    req.store.find('photos', { query: query, count: count }).then(function (model) {
        res.render('photos', {items: model.toJSON()});
    }, next);
}

export default PhotosRoute;
