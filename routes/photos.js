
/*jslint nomen:true, node:true*/
/*jshint esnext:true*/

function PhotosRoute(req, res, next) {
    // sharing this route for photos and search-photos routes
    var query = (req.query && req.query.q) || 'jpop 2014';
    req.store.find('photos', { query: query }).then(function (model) {
        res.render('photos', {items: model.toJSON()});
    }, next);
}

export default PhotosRoute;
