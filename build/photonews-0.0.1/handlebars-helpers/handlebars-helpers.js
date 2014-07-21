YUI.add('handlebars-helpers', function (Y) {

    'use strict';

    Y.Handlebars.registerHelper('viewOutlet', function () {
        return '<div class="' + this.name + '-view">' + this.output + '</div>';
    });

}, '@VERSION@', {"requires": ["handlebars-base"]});
