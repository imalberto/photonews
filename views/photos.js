/*jslint nomen:true, node:true*/
/*jshint esnext:true*/

import {BaseView} from 'base-view';
import {Template} from 'photonews-template-photos';
import {Base} from 'base-build';

var PhotosView = Base.create('photos-view', BaseView, [], {

    photosTemplate: Template.get('photonews/photos'),

    events: {},

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
