YUI.add("views/search-photo", function(Y, NAME, __imports__, __exports__) {
    "use strict";
    /*jslint nomen:true, node:true*/
    /*jshint esnext:true*/

    var PN = __imports__["pn"].PN;
    var Template = __imports__["photonews-template-search-photo"].Template;

    var SearchPhotoView = PN.View.extend({

        photoTemplate: Template.get('photonews/search-photo'),

        events: {
            '.left-arrow': {
                click: 'prev'
            },
            '.right-arrow': {
                click: 'next'
            }
        },

        render: function () {
            var container = this.get('container'),
                locals = this.get('locals'),
                html;

            html = this.photoTemplate({
                prev : locals.prev,
                next : locals.next,
                photo: locals.photo,
                query: locals.query
            });

            container.setHTML(html);
            return this;
        },

        // for pagination
        prev: function (e) {
            var container = this.get('container'),
                prevId    = container.one('.left-arrow').getData('page');

            e.preventDefault();

            this.fire('photo:navigate', {
                photoId: prevId
            });
        },

        next: function (e) {
            var container = this.get('container'),
                nextId    = container.one('.right-arrow').getData('page');

            e.preventDefault();

            this.fire('photo:navigate', {
                photoId: nextId
            });
        }

    });

    __exports__["default"] = SearchPhotoView;
    return __exports__;
}, "@VERSION@", {"es":true,"requires":["pn","photonews-template-search-photo"]});