/*
 * Copyright (c) 2013, Yahoo! Inc.  All rights reserved.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE.txt file for terms.
 */

/*jslint nomen:true, node:true*/
/*jshint esnext:true*/

import {View} from 'view';
import {Views} from 'default-view';
import {Template} from 'photonews-template-photos';
import {Base} from 'base';
import {log} from 'yui';
import {one} from 'yui';


var PhotosView;

PhotosView = Base.create('photos-view', View, [], {

    photosTemplate: Template.get('photonews/photos'),

    events: {
    },

    initializer: function (config) {
        this.config = config;
        log('Initialized !!!', 'info', NAME);

    },

    render: function () {
        var my = this,
            container = this.get('container'),
            locals = this.get('locals'),
            html = '<h3> No Photos Available </h3>';


        // Append the container element to the DOM if its not already on
        // the page
        if (!container.inDoc()) {
            one('body').append(container);
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

Views.PhotosView = PhotosView;

export default PhotosView;

