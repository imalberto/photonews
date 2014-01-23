/*jslint nomen:true, node:true*/
/*jshint esnext:true*/

import {PN} from 'pn';
import AboutComponent from 'jsx/about';

var AboutView = PN.View.extend({

    component: AboutComponent,

    render: function () {
        var container = this.get('container'),
            locals = this.get('locals');

        this.renderComponent(locals, container);

        return this;
    }

});

export default AboutView;
