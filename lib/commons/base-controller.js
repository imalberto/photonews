/*jslint nomen:true, node:true*/
/*global YUI*/

YUI.add('base-controller', function (Y, NAME) {

    'use strict';

    function BaseController(config) {
        this.store = config.store;
    }

    BaseController.prototype = {
        /* in case we want to extend yaf */
    };

    Y.BaseController = BaseController;

}, '@VERSION', {
    requires: []
});
