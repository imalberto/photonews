/*
 * Copyright (c) 2013, Yahoo! Inc.  All rights reserved.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE.txt file for terms.
 */

/*jslint nomen:true, node:true*/
/*jshint esnext:true*/

import {DefaultView} from 'default-view';
import {Template} from 'photonews-template-photos';
import {Base} from 'base-build';

var PhotosView = Base.create('photos-view', DefaultView, [], {

    photosTemplate: Template.get('photonews/photos'),

    events: {},

    initializer: function (config) {
        this.config = config;
    },

    render: function () {
        var container = this.get('container'),
            locals = this.get('locals'),
            html;

        if (!locals.items) {
            html = '<h3>No Photos Available </h3>';
        } else {
            html = this.photosTemplate({ items: locals.items });
        }
        container.setHTML(html);
        return this;
    },

    // for pagination
    prev: function () {
        // todo
    },

    next: function () {
        // todo
    }

});

export default PhotosView;
