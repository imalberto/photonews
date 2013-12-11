
/*jslint nomen:true, node:true*/
/*jshint esnext:true*/

function SearchPhotoRoute(req, res, next) {
    var query = (req.query && req.query.q) || 'miami';

    req.store.find('photos', {query: query}).then(function (model) {
        var index = parseInt(req.params.id, 10) || 0,
            selectedPhoto = model.item(index),
            data = {
                query: query,
                photo: selectedPhoto.toJSON(),
                prev: (index > 0) ? (index - 1) : index,
                next: (index < model.size()) ? (index + 1) : index,
                nextPhoto: model.item(model.indexOf(selectedPhoto) + 1),
                prevPhoto: model.item(model.indexOf(selectedPhoto) - 1)
            };

        res.render('search-photo', data);

    }, next);
}

export default SearchPhotoRoute;
