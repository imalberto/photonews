/*
 * Copyright (c) 2013, Yahoo! Inc.  All rights reserved.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE.txt file for terms.
 */

/*jslint nomen:true, node:true*/
/*global YUI, YApp*/


YUI.add('renderer', function (Y, NAME) {
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
                    container: Y.Node.create('<div class="' + className + '"></div>')
                }, {
                    render: true,
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
