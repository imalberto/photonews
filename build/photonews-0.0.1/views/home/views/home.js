YUI.add('views/home', function (Y, NAME, __imports__, __exports__) {
    "use strict";
    /*jslint nomen:true, node:true*/
    /*jshint esnext:true*/

    var PN = __imports__["pn"].PN;
    var Template = __imports__["photonews-template-home"].Template;

    var HomeView = PN.View.extend({

        template: Template.get('photonews/home'),

        events: {},

        render: function () {
            var container = this.get('container'),
                html;

            html = this.template({ src: 'home'});
            container.setHTML(html);

            return this;
        }

    });

    __exports__["default"] = HomeView;
    return __exports__;
}, '@VERSION@', {"es": true, "requires": ["pn", "photonews-template-home"]});
