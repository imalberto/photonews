/*
 * Copyright (c) 2013, Yahoo! Inc.  All rights reserved.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE.txt file for terms.
 */

/*jslint nomen:true, node:true*/
/*global YUI*/

YUI.add('default-controller', function (Y, NAME) {

    'use strict';

    function Class() {
        Class.superclass.constructor.apply(this, arguments);
    }

    Class.ATTRS = {
        modelClass: {
            value: Y.DefaultModel
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

    Y.extend(Class, Y.Base, {
        initializer: function (config) {
            var ModelClass = this.get('modelClass'),
                model = this.get('model'),
                name = this.get('name');

            if (config.model) {
                this.set('model', config.model);
            } else {
                if (!model) {
                    this.set('model', new ModelClass());
                    model = this.get('model');
                }
            }

            this._promise = new Y.Promise(function (fulfill, reject) {
                if (model.model && model.size() > 0) {
                    fulfill(model.toJSON());
                    return;
                }

                model.load({name: name}, function (err, res) {
                    if (err) {
                        console.error('** ERROR **: default-controller.initializer() failed: %s', err);
                        reject(err);
                        return;
                    }
                    fulfill(res);
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

    Y.DefaultController = Class;

}, '@VERSION', { requires: [
    'promise',
    'default-model'
]});
