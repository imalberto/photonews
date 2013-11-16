/*
 * Copyright (c) 2013, Yahoo! Inc.  All rights reserved.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE.txt file for terms.
 */

/*jslint nomen:true, node:true*/
/*jshint esnext:true*/

import {Views} from 'default-view';
import {View} from 'view';
import {Template} from 'photonews-template-about';
import {Base} from 'base';
import {log} from 'yui';
import {one} from 'yui';
import {View} from 'view';
import {Node} from 'yui';



var AboutView;

AboutView = Base.create('about-view', View, [], {

    template: Template.get('photonews/about'),

    events: {
    },

    initializer: function (config) {
        this.config = config;
        log('Initialized !!!', 'info', NAME);
    },

    render: function () {
        var container = this.get('container'),
            html = '<h3> Default Landing Page</h3>';

        if (!container.inDoc()) {
            one('body').append(container);
        }

        html = this.template({ src: 'home'});
        container.setHTML(html);

        return this;
    },

    ATTRS: {
        container: {
            valueFn: function () {
                return Node.create('<div class="about-view"/>');
            }
        }
    }
});

Views.AboutView = AboutView;

export default AboutView;

