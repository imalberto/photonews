YUI.add('controllers/main', function (Y, NAME, __imports__, __exports__) {
    "use strict";
    /*jslint nomen:true, browser:true*/
    /*jshint esnext:true*/

    var AboutViewClass = __imports__["views/about"]["default"];
    var HomeViewClass = __imports__["views/home"]["default"];
    var PhotosViewClass = __imports__["views/photos"]["default"];
    var PhotoViewClass = __imports__["views/photo"]["default"];
    var NewsViewClass = __imports__["views/news"]["default"];
    var SearchViewClass = __imports__["views/search"]["default"];
    var SearchPhotoViewClass = __imports__["views/search-photo"]["default"];

    var PN = __imports__["pn"].PN;

    var MainController = PN.Controller.extend({

        events: {
            '.search-box': {
                'keypress': 'enter'
            }
        },

        views: {
            home: {
                type: HomeViewClass,
                preserve: true
            },
            news: {
                type: NewsViewClass,
                preserve: false
            },
            photos: {
                type: PhotosViewClass,
                preserve: false
            },
            photo: {
                type: PhotoViewClass,
                preserve: false
            },
            about: {
                type: AboutViewClass,
                preserve: true
            },
            search: {
                type: SearchViewClass,
                preserve: false
            },
            'search-photo': {
                type: SearchPhotoViewClass,
                preserve: false
            }
        },

        transitions: {
            navigate: 'fade',
            toChild: 'fade',
            toParent: 'fade'
        },

        initializer: function () {
            var container = this.get('container'),
                searchBox = container.one('.search-box');

            // Set up and cache often-used DOM elements as attributes
            this.set('searchBox', searchBox);
        },

        render: function (viewName, locals) {
            var viewContainer = this.get('viewContainer'),
                className,
                rendered,
                viewInfo;

            MainController.superclass.render.apply(this, arguments);

            className = viewName + '-view';
            rendered = viewContainer.one('.' + className);
            viewInfo = this.getViewInfo(viewName);

            if ((rendered && viewInfo && !viewInfo.instance) ||
                    (rendered && viewInfo && viewInfo.instance &&
                    this.get('activeView') === viewInfo.instance &&
                    viewInfo.preserve)) {
                this.showContent(rendered, {
                    view: viewName,
                    update: false,
                    transition: false
                });
            } else {
                this.showView(viewName, {
                    container: viewContainer.create('<div class="' + className + '"></div>'),
                    locals: locals
                }, {
                    render: true,
                    update: true
                });
            }

            return this;
        },

        enter: function (e) {
            var ENTER_KEY = 13;

            if (e.keyCode === ENTER_KEY) {
                e.preventDefault();
                this.searchQuery();
            }
        },

        searchQuery: function () {
            var query = this.get('searchBox').get('value');

            if (query) {
                this.navigate('/search/photos?q=' + query);
            }
        },

        navigatePhotos: function (e) {
            this.navigate('/photo/' + e.photoId);
        }

    });

    __exports__["default"] = MainController;
    return __exports__;
}, '@VERSION@', {
    "es": true,
    "requires": [
        "views/about",
        "views/home",
        "views/photos",
        "views/photo",
        "views/news",
        "views/search",
        "views/search-photo",
        "pn"
    ]
});
