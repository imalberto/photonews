YUI.add("views/photos", function(Y, NAME, __imports__, __exports__) {
    "use strict";
    /*jslint nomen:true, node:true*/
    /*jshint esnext:true*/

    var PN = __imports__["pn"].PN;
    var Template = __imports__["photonews-template-photos"].Template;

    var PhotosView = PN.View.extend({

        photosTemplate: Template.get('photonews/photos'),

        events: {},

        render: function () {
            var container = this.get('container'),
                locals = this.get('locals'),
                html;

            if (!locals.items) {
                html = '<h3>No Photos Available </h3>';
            } else {
                html = this.photosTemplate({ items: locals.items });
            }
            container.setHTML(html);
            return this;
        }

    });

    __exports__["default"] = PhotosView;
    return __exports__;
}, "@VERSION@", {"es":true,"requires":["pn","photonews-template-photos"]});