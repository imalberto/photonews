/*jslint nomen:true, node:true*/
/*jshint esnext:true*/

import {PN} from 'pn';
import HomeComponent from 'jsx/home';

var HomeView = PN.View.extend({

    component: HomeComponent,

    events: {},

    render: function () {
        var container = this.get('container');

        this.renderComponent({}, container);

        return this;
    }

});

export default HomeView;
