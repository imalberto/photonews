/*jslint nomen:true, browser:true*/
/*jshint esnext:true*/

import AboutViewClass from 'views/about';
import HomeViewClass from 'views/home';
import PhotosViewClass from 'views/photos';
import PhotoViewClass from 'views/photo';
import NewsViewClass from 'views/news';
import SearchViewClass from 'views/search';
import SearchPhotoViewClass from 'views/search-photo';

import {PN} from 'pn';

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

export default MainController;
