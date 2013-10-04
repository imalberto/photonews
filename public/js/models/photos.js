/*
 * Copyright (c) 2013, Yahoo! Inc.  All rights reserved.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE.txt file for terms.
 */

/*jslint nomen:true, node:true*/
/*global YUI*/

// Still WIP - currently not in use
YUI.add('pn-photos', function (Y, NAME) {
    var Photos,
        photos,
        start = 0,
        count = 6;

    Photos = Y.Base.create('photos', Y.LazyModelList, [], {
        model: Y.PN.Photo,

        sync: function (action, options, cb) {
            if (action !== 'read') {
                return cb('Only "read" is supported.');
            }

            // TODO add a cache layer
            // TODO query YQL here
            
            Y.FlickrModel.search("yahoo", start, count, function (err, photos) {
                if (err) {
                    Y.log('FlickrModel.search failed: ' + err, 'error', NAME);
                    cb(null, []);
                    return;
                }

                if (photos) {
                    cb(null, photos);
                    return;
                }
            });

        },

        getNext: function () {
        },
        getPrev: function () {
        }
    });

    Y.namespace('PN').Photos = Photos;

}, '0.0.1', {
    affinity: 'client',
    requires: [
        'lazy-model-list',
        'flickr-model'
    ]
});
