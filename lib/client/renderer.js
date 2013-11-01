/*
 * Copyright (c) 2013, Yahoo! Inc.  All rights reserved.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE.txt file for terms.
 */

/*jslint nomen:true, node:true*/
/*global YUI, YApp*/


YUI.add('renderer', function (Y, NAME) {
    'use strict';

    Y.Renderer = {

        render: function (config, req, res) {
            if (Y.Env.runtime && Y.Env.runtime === 'server') {
                Y.Renderer._renderServer(config, req, res);
            } else {
                Y.Renderer._renderClient(config, req, res);
            }
        },

        _renderServer: function (config, req, res) {
            var viewName = config.viewName,
                locals = config.locals;

            viewName += '-page';
            res.render(viewName, locals);
        },

        /**
        @protected
        @param {Object} config
            @param {String} config.viewName
            @param {Object} config.locals objects that will be used as the
            context when rendering the template
        @param {Object} options
            @param {Boolean} options.render see `showView()` options; if true,
            forces the view to be rendered. By default, a view is only rendered
            if the view was newly created by this method.
            @param {Boolean} options.update see `showView()` options; if true,
            the view will have its attributes updated by passing the `config`
            object to its `setAttrs` method. Only applicable if the view already
            exists.
        @param {Object} req optional
        @param {Object} res optional
        **/
        _renderClient: function (config, req, res) {
            var viewName,
                className,
                locals,
                app = YApp,
                rendered;


            viewName = config.viewName;
            className = viewName + '-view';
            rendered = app.get('viewContainer').one('.' + className);
            locals = config.locals || {};

            if (rendered) {
                app.showContent(rendered, {
                    view: viewName,
                    config: {}
                });
            } else {
                app.showView(viewName, {
                    container: Y.Node.create('<div class="' + className + '"></div>'),
                    locals: locals
                }, {
                    render: true,
                    // prepend: true,
                    update: true
                });
            }

        }
    };
}, '@VERSION', {
    requires: []
    // requires: ['app', 'view']
    // affinity: 'client'
});
