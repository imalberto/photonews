/*jslint nomen:true, node:true*/
/*global YUI*/

YUI.add('base-controller', function (Y) {

    'use strict';

    function BaseController() {
        BaseController.superclass.constructor.apply(this, arguments);
    }

    BaseController.ATTRS = {
        modelClass: {
            value: Y.Model
        },
        model: {
            value: null
        },
        models: {
            value: []
        },
        name: {
            value: undefined
        }
    };

    Y.extend(BaseController, Y.Base, {
        initializer: function (config) {
            var ModelClass = this.get('modelClass'),
                model = this.get('model'),
                name = this.get('name');

            if (!model) {
                if (config.model) {
                    this.set('model', config.model);
                } else {
                    model = new ModelClass();
                    this.set('model', model);
                }
            }

            this._promise = new Y.Promise(function (fulfill, reject) {
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

            // var promises = [];
            // this.models.forEach(function (model) {
            //     promises.push(
            //         new YPromise(function (fulfill, reject) {
            //             model.load({}, function (err, res) {
            //                 if (err) {
            //                     return reject(err);
            //                 }
            //                 fulfill(res);
            //             });
            //         })
            //     );
            // });
            // this.batchPromises = Ybatch(promises);

        },
        then: function (fulfill, reject) {
            return this._promise.then(fulfill, reject);
        }
    });

    Y.BaseController = BaseController;

}, '@VERSION', { requires: [
    'promise',
    'model'
]});
