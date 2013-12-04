/*jslint nomen:true, node:true*/
/*jshint esnext:true*/

import {BaseView} from 'base-view';
import {Template} from 'photonews-template-photo';
import {Base} from 'base-build';

var PhotoView = Base.create('photo-view', BaseView, [], {

    photoTemplate: Template.get('photonews/photo'),

    events: {
        '.left-arrow': {
            click: 'prev'
        },
        '.right-arrow': {
            click: 'next'
        }
    },

    initializer: function (config) {        
        this.config = config;
    },

    render: function () {
        var container = this.get('container'),
            locals = this.get('locals'),
            html;

        html = this.photoTemplate({
            prev : locals.prev,
            next : locals.next, 
            url  : locals.url
        });

        container.setHTML(html);
        return this;
    },

    // for pagination
    prev: function (e) {
        var container = this.get('container'),
            prevPage  = container.one('.left-arrow').getData('page');

        e.preventDefault();

        this.fire('photo:navigate', {
            page: prevPage
        });
    },

    next: function (e) {
        var container = this.get('container'),
            nextPage  = container.one('.right-arrow').getData('page');

        e.preventDefault();

        this.fire('photo:navigate', {
            page: nextPage
        });
    }

});

export default PhotoView;
