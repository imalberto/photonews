/*jslint nomen:true, node:true*/
/*global YUI*/

YUI.add('pn', function (Y) {

    'use strict';

    Y.PN = {
        Controller: {
            extend: function (px, sx, extensions) {
                return Y.Base.create('controller', Y.BaseController, extensions || [], px || {}, sx || {});
            }
        },
        View: {
            extend: function (px, sx, extensions) {
                return Y.Base.create('view', Y.BaseView, extensions || [], px || {}, sx || {});
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

}, '@VERSION', {
    requires: [
        'base-controller',
        'base-view',
        'model',
        'model-list',
        'base-build'
    ]
});
