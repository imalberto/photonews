/*
 * Copyright (c) 2013, Yahoo! Inc.  All rights reserved.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE.txt file for terms.
 */

/*jslint nomen:true, node:true*/
/* global YUI*/

YUI.add('photos-view', function (Y, NAME) {

    'use strict';

    var PhotosView;

    PhotosView = Y.Base.create('photosView', Y.View, [], {

        photosTemplate: Y.Template.get('photonews/photos'),

        events: {
            // setup events
        },

        initializer: function (config) {
            this.config = config;
            Y.log('Initialized !!!', 'info', NAME);
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
        prev: function () {
            console.log('IMPLEMENT ME');
        },
        next: function () {
            console.log('IMPLEMENT ME');
        },

        ATTRS: {
        }
    });

    Y.namespace('Views').PhotosView = PhotosView;

}, '@VERSION', {
    affinity: 'client',
    requires: [
        'view',
        'photonews-template-photos'
    ]
});
