/*jslint nomen:true, node:true*/
/*global YUI*/

YUI.add('base-controller', function (Y) {

    'use strict';

    function BaseController() {
        BaseController.superclass.constructor.apply(this, arguments);
    }

    BaseController.ATTRS = {
        // modelClass: {
        //     value: Y.Model
        // },
        config: {
            value: {},
        },
        model: {
            value: null
        },
        models: {
            value: []
        },
        name: {
            value: undefined
        },
        params: {
            valueFn: function () {
                var config = this.get('config');
                return config.params || {};
            }
        },
        query: {
            valueFn: function () {
                var config = this.get('config');
                return config.query || {};
            }
        }
    };

    Y.extend(BaseController, Y.Base, {
        initializer: function (config) {
            // TODO move `config` as an attribute of the controller
            this.config = config;
        },
        toJSON: function () {
            var model = this.get('model'),
                name = this.get('name');

            return new Y.Promise(function (fulfill, reject) {

                if (model.isNew ? !model.isNew() : (model.size() > 0)) {
                    fulfill(model.toJSON());
                    return;
                }

                model.load({name: name}, function (err/*, res*/) {
                    if (err) {
                        console.error('** ERROR **: base-controller.initializer() failed: %s', err);
                        reject(err);
                        return;
                    }
                    fulfill(model.toJSON());
                });
            });
        }
        // then: function (fulfill, reject) {
        //     return this._promise.then(fulfill, reject);
        // }
    });

    Y.BaseController = BaseController;

}, '@VERSION', { requires: [
    'promise',
    'model'
]});
