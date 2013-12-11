
/*jslint nomen:true, node:true*/
/*jshint esnext:true*/

function SearchPhotoRoute(req, res, next) {
    req.store.find('photos', { query: req.query.q }).then(function (model) {

        var selectedPhoto = model.item(req.params.id);
            data = ({
                photo: selectedPhoto,
                nextPhoto: model.item(model.indexOf(selectedPhoto) + 1),
                prevPhoto: model.item(model.indexOf(selectedPhoto) - 1),
            }).toJSON();

        res.render('photo', data);

    }, next);
}

export default SearchPhotoRoute;
