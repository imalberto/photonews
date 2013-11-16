/*
 * Copyright (c) 2013, Yahoo! Inc.  All rights reserved.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE.txt file for terms.
 */

/*jslint nomen:true, node:true*/
/*jshint esnext:true*/
/*global YApp*/

import {View} from 'view';
import {Template} from 'photonews-template-home';
import {Base} from 'base';
import {Views} from 'default-view';
import {log} from 'yui';
import {one} from 'yui';

var HomeView;

HomeView = Base.create('home-view', View, [], {

    template: Template.get('photonews/home'),

    events: {
    },

    initializer: function (config) {
        this.config = config;
        log('Initialized !!!', 'info', NAME);
    },

    render: function () {
        var container = this.get('container'),
            html = 'Loading ...';

        if (!container.inDoc()) {
            one('body').append(container);
        }

        html = this.template({ src: 'home'});

        container.setHTML(html);

        return this;
    },

    ATTRS: {}
});

Views.HomeView = HomeView;

export default HomeView;
