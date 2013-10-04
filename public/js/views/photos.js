/*
 * Copyright (c) 2013, Yahoo! Inc.  All rights reserved.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE.txt file for terms.
 */

/*jslint nomen:true, node:true*/
/* global YUI*/

YUI.add('pn-photos-view', function (Y, NAME) {

    var PN = Y.PN,
        PhotosView,
        start = 0,
        count = 4;

    PhotosView = Y.Base.create('photosView', Y.View, [], {

        photosTemplate: Y.Template.get('photonews/photos'),

        events: {
            // setup events
        },

        initializer: function (config) {
        },

        render: function () {
            var my = this,
                container = this.get('container'),
                html = '<h3> No Photos Available </h3>',
                model = Y.FlickrModel,
                query = 'yahoo';


            // TODO move model out of "render" for decouple
            model.search(query, start, count, function (err, photos) {

                // Append the container element to the DOM if its not already on
                // the page
                if (!container.inDoc()) {
                    Y.one('body').append(container);
                }

                if (err) {
                    console.log('Error loading photos for query "%s" :', query, err);
                    container.setHTML(html);
                    return this;
                }

                html = my.photosTemplate({ src: 'photos', photos: photos });
                container.setHTML(html);

                return this;
            });
        },

        // for pagination
        prev: function (e) {
        },
        next: function (e) {
        },

        ATTRS: {
            container: {
                valueFn: function () {
                    return Y.Node.create('<div class="photos"/>');
                }
            }
        }
    });

    Y.namespace('PN').PhotosView = PhotosView;

}, '0.0.1', {
    affinity: 'client',
    requires: [
        'view',
        'flickr-model',
        'photonews-template-photos'
    ]
});
