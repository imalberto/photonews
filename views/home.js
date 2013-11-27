/*jslint nomen:true, node:true*/
/*jshint esnext:true*/

import {BaseView} from 'base-view';
import {Template} from 'photonews-template-home';
import {Base} from 'base-build';

var HomeView = Base.create('home-view', BaseView, [], {

    template: Template.get('photonews/home'),

    events: {},

    initializer: function (config) {
        this.config = config;
    },

    render: function () {
        var container = this.get('container'),
            html;

        html = this.template({ src: 'home'});
        container.setHTML(html);

        return this;
    }

});

export default HomeView;
