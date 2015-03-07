
/*jslint nomen:true, node:true*/
/*jshint esnext:true*/

function PhotosRoute(req, res, next) {
    // sharing this route for photos and search-photos routes
    var query = (req.query && req.query.q) || 'miami',
        count = (req.query && req.query.c) || 1;
    req.store.find('photos', { query: query, count: count }).then(function (model) {
        var i,
            items = model.toJSON();

        for (i = 0; i < items.length; i++) {
            items[i].query = query;
        }

        res.render('search', {items: items});
    }, next);
}

export default PhotosRoute;
