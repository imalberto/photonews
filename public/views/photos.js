

/*jslint nomen:true, node:true*/
/* global YUI*/

YUI.add('pn-photos-module', function (Y, NAME) {

    var PN = Y.PN,
        PhotoView;

    PhotoView = Y.Base.create('photoView', Y.View, [], {
        containerTemplate: '<div class="photos"/>',
        template: 'foo.handlebars',
        photoTemplate: 'foo.handlebars',

        events: {
            '.photo a': { click: 'select' }
        },

        initializer: function (config) {
        },

        attachEvents: function () {
            return this;
        },

        render: function () {
            return this;
        },

        more: function (e) {
            // TODO
        }
    });

    Y.namespace('PN').PhotoView = PhotoView;
}, '0.0.1', {
    affinity: 'client',
    requires: [
        'view'
        // load known templates
    ]
});
