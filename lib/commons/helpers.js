/*jslint nomen:true, node:true*/
/*global YUI*/

YUI.add('handlebars-helpers', function (Y, NAME) {

    'use strict';

    Y.Handlebars.registerHelper('viewOutlet', function () {
        return '<div class="' + this.name + '-view">' + this.output + '</div>';
    });

}, '@VERSION', { requires: ['handlebars-base'] });
