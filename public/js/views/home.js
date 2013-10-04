/*
 * Copyright (c) 2013, Yahoo! Inc.  All rights reserved.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE.txt file for terms.
 */

/*jslint nomen:true, node:true*/
/* global YUI*/

YUI.add('pn-home-view', function (Y, NAME) {

    var PN = Y.PN,
        HomeView,
        start = 0,
        count = 6;

    HomeView = Y.Base.create('homeView', Y.View, [], {

        template: Y.Template.get('photonews/home'),

        events: {
        },

        initializer: function (config) {
        },

        render: function () {
            var container = this.get('container'),
                html = '<h3> Default Landing Page</h3>';


            if (!container.inDoc()) {
                Y.one('body').append(container);
            }

            html = this.template({ src: 'home'});
            container.setHTML(html);

            return this;
        },

        ATTRS: {
            container: {
                valueFn: function () {
                    return Y.Node.create('<div class="home"/>');
                }
            }
        }
    });

    Y.namespace('PN').HomeView = HomeView;

}, '0.0.1', {
    affinity: 'client',
    requires: [
        'view',
        'photonews-template-home'
    ]
});
