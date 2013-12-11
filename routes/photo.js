
/*jslint nomen:true, node:true*/
/*jshint esnext:true*/

function PhotoRoute(req, res, next) {
    var query = (req.query && req.query.q) || 'miami';
    req.store.find('photos', { query: query }).then(function (model) {

        // TODO: add express-params into app.js so we don't need
        // to do this parseInt thing
        var index = parseInt(req.params.id, 10) || 0,
            selectedPhoto = model.item(index),
            data = {
                photo: selectedPhoto.toJSON(),
                prev: (index > 0) ? (index - 1) : index,
                next: (index < model.size()) ? (index + 1) : index,
                nextPhoto: model.item(model.indexOf(selectedPhoto) + 1),
                prevPhoto: model.item(model.indexOf(selectedPhoto) - 1)
            };

        res.render('photo', data);

    }, next);
}

export default PhotoRoute;
