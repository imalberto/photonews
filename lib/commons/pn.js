/*jslint nomen:true, node:true*/
/*global YUI*/

YUI.add('pn', function (Y) {

    'use strict';

    var DummyBaseController,
        DummyBaseView,
        React;

    React = Y.config.global.React;

    Y.PN = {
        Controller: {
            extend: function (px, sx, extensions) {
                return Y.Base.create('controller', Y.BaseController || DummyBaseController, extensions || [], px || {}, sx || {});
            }
        },
        View: {
            extend: function (px, sx, extensions) {
                return Y.Base.create('view', Y.BaseView || DummyBaseView, extensions || [], px || {}, sx || {});
            }
        },
        Model: {
            extend: function (px, sx, extensions) {
                return Y.Base.create('model', Y.Model, extensions || [], px || {}, sx || {});
            }
        },
        ModelList: {
            extend: function (px, sx, extensions) {
                return Y.Base.create('model', Y.ModelList, extensions || [], px || {}, sx || {});
            }
        }
    };


    DummyBaseController = function () {};
    DummyBaseView = Y.Base.create('view', Y.BaseCore, [], {
        renderComponent: function (locals, container) {
            var result,
                instance;

            instance = this.template(locals);
            React.renderComponentToString(instance, function (html) {
                result = html;
            });
            return result;
        }
    }, {
        // HACK until we get a View that works fine on the server side
        ATTRS: {
            locals: {},
            container: {
                valueFn: function (html) {
                    var that = this;
                    return {
                        setHTML: function (html) {
                            that._set('output', html);
                        }
                    };
                }
            },
            output: {
                readOnly: true
            }
        }
    });

}, '@VERSION', {
    requires: [
        'model',
        'model-list',
        'base-core',
        'base-build'
    ]
});
