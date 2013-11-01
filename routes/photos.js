/*
 * Copyright (c) 2013, Yahoo! Inc.  All rights reserved.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE.txt file for terms.
 */

/*jslint nomen:true, node:true*/

// var Y;
// 
// function photos(req, res) {
//     Y = Y || res.app.yui.use('flickr-model');
// 
//     var model = Y.FlickrModel,
//         query = req.params.query || 'scotland',
//         start = 0,
//         count = 4;
// 
//     model.search(query, start, count, function (err, photos) {
//         if (err) {
//             console.log('error loading photos');
//             res.render('error');
//             return;
//         }
//         res.render('photos', {
//             gallery: true,
//             src: 'photos',
//             photos: photos
//         });
//     });
// }
// 
// 
// module.exports = photos;
