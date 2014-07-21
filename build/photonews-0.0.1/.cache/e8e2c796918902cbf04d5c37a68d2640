YUI.add("views/search", function(Y, NAME, __imports__, __exports__) {
    "use strict";
    /*
     * Copyright (c) 2013, Yahoo! Inc.  All rights reserved.
     * Copyrights licensed under the New BSD License.
     * See the accompanying LICENSE.txt file for terms.
     */

    /*jslint nomen:true, node:true*/
    /*jshint esnext:true*/

    var PN = __imports__["pn"].PN;
    var Template = __imports__["photonews-template-search"].Template;

    var SearchView = PN.View.extend({

        photosTemplate: Template.get('photonews/search'),

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

    __exports__["default"] = SearchView;
    return __exports__;
}, "@VERSION@", {"es":true,"requires":["pn","photonews-template-search"]});