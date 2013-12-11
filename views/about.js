/*jslint nomen:true, node:true*/
/*jshint esnext:true*/

import {PN} from 'pn';
import {Template} from 'photonews-template-about';

var AboutView = PN.View.extend({

    template: Template.get('photonews/about'),

    events: {},

    render: function () {
        var container = this.get('container'),
            html;

        html = this.template({ src: 'about' });
        container.setHTML(html);

        return this;
    }

});

export default AboutView;
