/*jslint nomen:true, browser:true*/
/*jshint esnext:true*/
/*global React*/

import AboutComponent from 'jsx/about';
import HomeComponent from 'jsx/home';
import PhotosComponent from 'jsx/photos';
import PhotoComponent from 'jsx/photo';
import NewsComponent from 'jsx/news';

import {ReactView} from 'yui';
import {PN} from 'pn';

var MainController = PN.Controller.extend({

    events: {
        '.search-box': {
            'keypress': 'enter'
        }
    },

    views: {
        photos: {
            type: ReactView,
            component: PhotosComponent,
            preserve: true
        },
        photo: {
            type: ReactView,
            component: PhotoComponent,
            preserve: true
        },
        about: {
            component: AboutComponent,
            type: ReactView,
            preserve: true
        },
        home: {
            type: ReactView,
            component: HomeComponent,
            preserve: true
        },
        news: {
            type: ReactView,
            component: NewsComponent,
            preserve: true
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
            component,
            className,
            rendered,
            viewInfo,
            view;
        MainController.superclass.render.apply(this, arguments);

        viewInfo = this.views[viewName];
        component = viewInfo.component;

        this.showView(viewName, {
            container: viewContainer,
            component: component,
            locals: locals
        }, {
            update: true,
            render: true
        });
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
            this.navigate('/photos?q=' + query);
        }
    }

});

export default MainController;
