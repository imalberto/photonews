/*jslint nomen:true, node:true*/
/*jshint esnext:true*/

import {PN} from 'pn';
import {Template} from 'photonews-template-home';

var HomeView = PN.View.extend({

    template: Template.get('photonews/home'),

    events: {},

    render: function () {
        var container = this.get('container'),
            html;

        html = this.template({ src: 'home'});
        container.setHTML(html);

        return this;
    }

});

export default HomeView;
