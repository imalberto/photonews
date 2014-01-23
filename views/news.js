/*jslint nomen:true, node:true*/
/*jshint esnext:true*/

import {PN} from 'pn';
import NewsComponent from 'jsx/news';

var NewsView = PN.View.extend({

    component: NewsComponent,

    events: {},

    render: function () {
        var container = this.get('container'),
            locals = this.get('locals');

        this.renderComponent(locals, container);

        return this;
    },

    // pagination
    next: function () {
        // todo
    },

    prev: function () {
        // todo
    }

});

export default NewsView;
