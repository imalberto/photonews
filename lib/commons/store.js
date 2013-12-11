/*jslint nomen:true, node:true*/
/*global YUI*/

YUI.add('store', function (Y, NAME) {

    'use strict';

    function ModelMock() {}

    ModelMock.prototype = {
        toJSON: function () { return {}; }
    };

    function Store (config, container) {
        this._data = config || {};
        this.container = container;
    }

    Store.prototype = {

        add: function (name, model) {
            this._data[name] = model;
        },

        // todo: implement findById, findAll, findQuery
        // this implementation is findQuery
        find: function (name, options) {
            var cache = this._data,
                model = cache[name];

            return new Y.Promise(function(fulfill, reject) {

                function load () {
                    model.load(options, function (err) {
                        if (err) {
                            return reject(err);
                        }
                        cache[name] = model;
                        fulfill(model);
                    });
                }

                if (!model) {
                    if (name in ['views', 'photos']) {
                        try {
                            Y.import(['models/' + name], function (m) {
                                model = new (m['default'])();
                                load();
                            });
                        } catch (e) {
                            // if the module does not exists, then just fulfill with
                            // empty object
                            fulfill(new ModelMock());
                        }
                    } else {
                        fulfill(new ModelMock());
                    }
                } else {
                    load();
                }

            });
        },

        toJSON: function () {
            return this._data.toJSON();
        }

    };

    Y.Store = Store;

}, '@VERSION', { requires: ['promise'] });
