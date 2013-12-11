
/*jslint nomen:true, node:true*/
/*jshint esnext:true*/

function PhotoRoute(req, res, next) {
    req.store.find('photos', { query: 'miami' }).then(function (model) {

        var selectedPhoto = model.item(req.params.id),
            data = ({
                photo: selectedPhoto,
                nextPhoto: model.item(model.indexOf(selectedPhoto) + 1),
                prevPhoto: model.item(model.indexOf(selectedPhoto) - 1),
            }).toJSON();

        res.render('photo', data);

    }, next);
}

export default PhotoRoute;