/*jslint nomen:true, node:true*/
/*jshint esnext:true*/

var DEFAULT_QUERY = 'golden gate bridge';

function PhotosRoute(req, res, next) {
    // sharing this route for photos and search-photos routes
    var query = (req.query && req.query.q) || DEFAULT_QUERY;

    req.store.find('photos', { query: query}).then(function (model) {
        res.render('photos', {
            query: query,
            items: model.toJSON()
        });
    }, next);
}

export default PhotosRoute;
