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
        //
        photos: {
            type: PhotosViewClass,
            preserve: true
        },
        photo: {
            type: PhotoViewClass,
            preserve: true
        },
        about: {
            type: AboutViewClass,
            preserve: true
        },
        home: {
            type: HomeViewClass,
            preserve: true
        },
        news: {
            type: NewsViewClass,
            preserve: true
        },
        //
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

    /**
    This `render` is different from the `app.render()` function.

    This provides a consistent api for the library to render a view the same way
    when running on either client or server env.

    In order to support Y.View vs React Components, App framework has to
    understand the difference between the two.
    **/
    render: function (viewName, locals) {
        var viewContainer = this.get('viewContainer'),
            className,
            rendered,
            viewInfo,
            view;

        MainController.superclass.render.apply(this, arguments);

        className = viewName + '-view';
        rendered = viewContainer.one('.' + className);
        viewInfo = this.getViewInfo(viewName);

        if (!viewInfo) {
            // TODO what's the best way to handle this?
            throw new Error('No valid view found');
        }

        if (rendered && !viewInfo.instance) {
            // server generated on that first request
            this.showContent(rendered, {
                view: viewName,
                update: true,
                transition: false
            });
        } else if (rendered && viewInfo.instance &&
                      this.get('activeView') === viewInfo.instance) {
            // rerendering the same view
            // not calling showView as we don't want any transition here

            view = viewInfo.instance;
            view.setAttrs({
                container: viewContainer.one('.' + className),
                locals: locals
            });
            view.render();

        } else if (!rendered && viewInfo.instance &&
                      this.get('activeView') !== viewInfo.instance) {
            // revisiting a previously already loaded view

            // unmount the current view before loading the new one
            var activeViewContainer = this.get('activeView').get('container');
            React.unmountComponentAtNode(
                activeViewContainer._node ||
                activeViewContainer
            );

            this.showView(viewName, {
                container: viewContainer.one('.' + className),
                locals: locals
            }, {
                render: true,
                update: true
            });

        } else {
            // first time loading this view

            if (rendered) {
                throw new Error('Inconsistent state');
            }

            // Set the container so that React has a place to render
            rendered = viewContainer.create('<div class="' + className + '"></div>');
            viewContainer.appendChild(rendered);

            // Let yaf does the transition
            this.showView(viewName, {
                container: viewContainer.one('.' + className),
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
    }

    // navigatePhotos: function (e) {
    //     this.navigate('/photo/' + e.photoId);
    // }

});

export default MainController;
