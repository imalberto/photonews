/*jslint nomen:true, node:true*/
/*global YUI*/

YUI.add('base-view', function (Y, NAME) {

	'use strict';

    // placeholder for the view on the server, but on the client
    // this module will be replaced with another module that
    // implements a more suitable class for the client.
    Y.BaseView = Y.Base.create(NAME, Y.Base, [], {}, {});

}, '@VERSION', {
    requires: ['base']
});
