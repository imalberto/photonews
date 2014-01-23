/*jslint nomen:true, node:true*/
/*jshint esnext:true*/

import {PN} from 'pn';
import PhotosComponent from 'jsx/photos';

var PhotosView = PN.View.extend({

    component: PhotosComponent,

    render: function () {
        var container = this.get('container'),
            locals = this.get('locals');

        this.renderComponent(locals, container);

        return this;
    }

});

export default PhotosView;
