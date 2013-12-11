/*jslint nomen:true, node:true*/
/*global YUI*/

YUI.add('base-controller-client', function (Y, NAME) {

    'use strict';

    Y.BaseController = Y.App;

}, '@VERSION', {
    affinity: 'client',
    requires: ['app'],
    condition: {
        name: 'base-controller-client',
        trigger: 'base-controller',
        when: 'instead'
    }
});
