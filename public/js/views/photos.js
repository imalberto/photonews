/*
 * Copyright (c) 2013, Yahoo! Inc.  All rights reserved.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE.txt file for terms.
 */

/*jslint nomen:true, node:true*/
/* global YUI*/

YUI.add('photos-view', function (Y, NAME) {

    var PhotosView,
        start = 0,
        count = 4;

    PhotosView = Y.Base.create('photosView', Y.View, [], {

        photosTemplate: Y.Template.get('photonews/photos'),

        events: {
            // setup events
        },

        initializer: function (config) {
            //
        },

        render: function () {
            var my = this,
                container = this.get('container'),
                locals = this.get('locals'),
                html = '<h3> No Photos Available </h3>';


            // Append the container element to the DOM if its not already on
            // the page
            if (!container.inDoc()) {
                Y.one('body').append(container);
            }

            if (!locals.items) {
                console.log('Error loading photos');
                container.setHTML(html);
                return this;
            }

            html = my.photosTemplate({items: locals.items});
            container.setHTML(html);

            return this;
        },

        // for pagination
        prev: function (e) {
        },
        next: function (e) {
        },

        ATTRS: {
        }

        // ATTRS: {
        //     container: {
        //         valueFn: function () {
        //             return Y.Node.create('<div class="photos-view"/>');
        //         }
        //     }
        // }
    });

    Y.namespace('Views').PhotosView = PhotosView;

}, '0.0.1', {
    affinity: 'client',
    requires: [
        'view',
        'photos-model',
        'photonews-template-photos'
    ]
});
