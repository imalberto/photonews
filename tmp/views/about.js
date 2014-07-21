YUI.add("views/about", function(Y, NAME, __imports__, __exports__) {
    "use strict";
    /*jslint nomen:true, node:true*/
    /*jshint esnext:true*/

    var PN = __imports__["pn"].PN;
    var Template = __imports__["photonews-template-about"].Template;

    var AboutView = PN.View.extend({

        template: Template.get('photonews/about'),

        events: {},

        render: function () {
            var container = this.get('container'),
                html;

            html = this.template({ src: 'about' });
            container.setHTML(html);

            return this;
        }

    });

    __exports__["default"] = AboutView;
    return __exports__;
}, "@VERSION@", {"es":true,"requires":["pn","photonews-template-about"]});