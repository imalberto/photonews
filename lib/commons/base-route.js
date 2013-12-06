
/*jslint nomen:true, node:true*/
/*global YUI*/

YUI.add('base-route', function (Y, NAME) {

    'use strict';

    // placeholder for the app on the server, but on the client
    // this module will be replaced with another module that
    // implements a more suitable class for the client.
    Y.BaseRoute = Y.Base.create(NAME, Y.Base, [], {
        model: function () {
            return new Y.Model();
        },
        setupController: function (controller, model) {
            if (model !== 'undefined') {
                controller.set('model', model);
            }
        }
    }, {
        ATTRS: {
        }
    });

}, '@VERSION', {
    requires: ['base']
});
