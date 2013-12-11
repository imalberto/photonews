/*jslint nomen:true, node:true*/
/*global YUI*/

YUI.add('base-controller-client', function (Y, NAME) {

    'use strict';

    Y.BaseController = Y.Base.create(NAME, Y.App, [Y.BaseController], {}, {});

}, '@VERSION', {
    affinity: 'client',
    requires: ['base', 'app'],
    condition: {
        name: 'base-controller-client',
        trigger: 'base-controller',
        when: 'after'
    }
});
