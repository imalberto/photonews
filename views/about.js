/*jslint nomen:true, node:true*/
/*jshint esnext:true*/

import {PN} from 'pn';
import AboutComponent from 'jsx/about';

var AboutView = PN.View.extend({

    template: null,

    events: {},

    initializer: function () {
        this.template = AboutComponent();
    },

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
    }

});

export default AboutView;
