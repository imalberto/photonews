/*
 * Copyright (c) 2013, Yahoo! Inc.  All rights reserved.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE.txt file for terms.
 */

/*jslint nomen:true, node:true*/
/*jshint esnext:true*/

import {BaseView} from 'base-view';
import {Template} from 'photonews-template-about';
import {Base} from 'base-build';

var AboutView = Base.create('about-view', BaseView, [], {

    template: Template.get('photonews/about'),

    events: {},

    initializer: function (config) {
        this.config = config;
    },

    render: function () {
        var container = this.get('container'),
            html;

        html = this.template({ src: 'about' });
        container.setHTML(html);

        return this;
    }

});

export default AboutView;
