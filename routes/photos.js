

/*jslint nomen:true, node:true*/

var Y;

function photos(req, res) {
    Y = Y || res.app.yui.use('flickr-model');

    var model = Y.FlickrModel,
        start = 0,
        count = 6;

    model.search('scotland', start, count, function (photos) {
        res.render('photos', {
            gallery: true,
            src: 'photos',
            photos: photos
        });
    });
}


module.exports = photos;
