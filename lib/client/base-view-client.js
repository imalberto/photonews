/*jslint nomen:true, node:true*/
/*global YUI*/

YUI.add('base-view-client', function (Y) {

    'use strict';

    Y.BaseView = Y.View;

}, '@VERSION', {
    affinity: 'client',
    requires: ['base', 'view'],
    condition: {
        name: 'base-view-client',
        trigger: 'base-view',
        when: 'instead'
    }
});
