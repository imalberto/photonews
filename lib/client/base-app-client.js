/*jslint nomen:true, node:true*/
/*global YUI*/

YUI.add('base-app-client', function (Y) {

    'use strict';

    Y.BaseApp = Y.App;

}, '@VERSION', {
    affinity: 'client',
    requires: ['base', 'app'],
    condition: {
        name: 'base-app-client',
        trigger: 'base-app',
        when: 'instead'
    }
});
