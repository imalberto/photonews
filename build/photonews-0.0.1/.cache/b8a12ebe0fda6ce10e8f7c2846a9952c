YUI.add("views/news", function(Y, NAME, __imports__, __exports__) {
    "use strict";
    /*jslint nomen:true, node:true*/
    /*jshint esnext:true*/

    var PN = __imports__["pn"].PN;
    var Template = __imports__["photonews-template-news"].Template;

    var NewsView = PN.View.extend({

        newsTemplate: Template.get('photonews/news'),

        events: {},

        render: function () {
            var container = this.get('container'),
                locals = this.get('locals'),
                html;

            if (!locals.items) {
                html = '<h3> No Posts Available </h3>';
            } else {
                html = this.newsTemplate({ items: locals.items });
            }

            container.setHTML(html);
            return this;
        },

        // pagination
        next: function () {
            // todo
        },

        prev: function () {
            // todo
        }

    });

    __exports__["default"] = NewsView;
    return __exports__;
}, "@VERSION@", {"es":true,"requires":["pn","photonews-template-news"]});