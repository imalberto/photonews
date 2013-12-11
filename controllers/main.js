/*jslint nomen:true, browser:true*/
/*jshint esnext:true*/

import AboutViewClass from 'views/about';
import HomeViewClass from 'views/home';
import PhotosViewClass from 'views/photos';
import PhotoViewClass from 'views/photo';
import NewsViewClass from 'views/news';
import SearchViewClass from 'views/search';

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
            preserve: true
        },
        photos: {
            type: PhotosViewClass,
            preserve: true
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

        // Set up any other necessary

        // this.on('photo:navigate', this.navigatePhotos);
    },

    render: function (options) {
        MainController.superclass.render.apply(this, arguments);

        options = options || {};

        if (options.rendered) {
            return this;
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
            this.navigate('/search?q=' + query);
        } else {
            this.navigate('/search');
        }
    },

    navigatePhotos: function (e) {
        this.navigate('/photo/' + e.photoId);
    }

});

export default MainController;