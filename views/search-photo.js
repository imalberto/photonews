/*jslint nomen:true, node:true*/
/*jshint esnext:true*/

import {PN} from 'pn';
import {Template} from 'photonews-template-search-photo';

var SearchPhotoView = PN.View.extend({

    photoTemplate: Template.get('photonews/search-photo'),

    events: {
        '.left-arrow': {
            click: 'prev'
        },
        '.right-arrow': {
            click: 'next'
        }
    },

    render: function () {
        var container = this.get('container'),
            locals = this.get('locals'),
            html;

        html = this.photoTemplate({
            prev : locals.prev,
            next : locals.next,
            photo: locals.photo,
            query: locals.query
        });

        container.setHTML(html);
        return this;
    },

    // for pagination
    prev: function (e) {
        var container = this.get('container'),
            prevId    = container.one('.left-arrow').getData('page');

        e.preventDefault();

        this.fire('photo:navigate', {
            photoId: prevId
        });
    },

    next: function (e) {
        var container = this.get('container'),
            nextId    = container.one('.right-arrow').getData('page');

        e.preventDefault();

        this.fire('photo:navigate', {
            photoId: nextId
        });
    }

});

export default SearchPhotoView;
