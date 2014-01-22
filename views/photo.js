/*jslint nomen:true, node:true*/
/*jshint esnext:true*/

import {PN} from 'pn';
import PhotoComponent from 'jsx/photo';

var PhotoView = PN.View.extend({

    template: PhotoComponent(),


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

        html = this.renderComponent({
            prev : locals.prev,
            next : locals.next,
            photo: locals.photo,
            news: locals.news
        }, container);

        if (html) {
            container.setHTML(html);
        }
        return this;
    },

    // for pagination
    // prev: function (e) {
    //     var container = this.get('container'),
    //         prevId    = container.one('.left-arrow').getData('page');

    //     e.preventDefault();

    //     this.fire('photo:navigate', {
    //         photoId: prevId
    //     });
    // },

    // next: function (e) {
    //     var container = this.get('container'),
    //         nextId    = container.one('.right-arrow').getData('page');

    //     e.preventDefault();

    //     this.fire('photo:navigate', {
    //         photoId: nextId
    //     });
    // }

});

export default PhotoView;
