/*jslint nomen:true, node:true*/
/*jshint esnext:true*/

import {PN} from 'pn';
import {config} from 'yui';

import PhotosComponent from 'jsx/photos';

var React = config.global.React;

var PhotosView = PN.View.extend({

    template: PhotosComponent,

    // photosTemplate: function (locals, container) {
    //     var result,
    //         instance;

    //     instance = PhotosComponent(locals);
    //     if (container && container._node) {
    //         // render on client
    //         // Let React take over
    //         React.renderComponent(
    //             instance,
    //             container._node
    //         );
    //     } else {
    //         // render on server
    //         instance = PhotosComponent(locals);
    //         React.renderComponentToString(instance, function (html) {
    //             result = html;
    //         });
    //         return result;
    //     }
    // },

    events: {},

    render: function () {
        var container = this.get('container'),
            locals = this.get('locals'),
            html;

        // NOTE: handle rendering both on server and client runtimes
        html = this.renderComponent(locals, container);
        if (html) {
            container.setHTML(html);
        }

        return this;
        // var container = this.get('container'),
        //     locals = this.get('locals'),
        //     html;

        // if (!locals.items) {
        //     html = '<h3>No Photos Available </h3>';
        // } else {
        //     html = this.photosTemplate({ items: locals.items });
        // }

        // html = this.photosTemplate({
        //     items: locals.items
        // }, container);

        // if (html) {
        //     container.setHTML(html);
        // }
        // return this;
    }

});

export default PhotosView;
