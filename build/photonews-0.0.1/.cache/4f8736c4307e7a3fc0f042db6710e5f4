/*jslint nomen:true, node:true*/
/*global YUI*/

YUI.add('store', function (Y/*, NAME*/) {

    'use strict';

    // TODO: this needs a lot of work

    function ModelMock() {}

    ModelMock.prototype = {
        toJSON: function () { return {}; }
    };

    function importAndCreate(name, callback) {
        // TODO remove this condition
        if (['news', 'photos'].indexOf(name) !== -1) {
            Y.import(['models/' + name], function (m) {
                callback(null, (new m['default']()));
            });
        } else {
            callback(new Error('Unkown model: ' + name));
        }
    }

    function rehydrate(name, data, callback) {
        // TODO remove this condition
        if (['news', 'photos'].indexOf(name) !== -1) {
            Y.import(['models/' + name], function (m) {
                callback(null, (new m['default'](data)));
            });
        } else {
            callback(new Error('Unkown model: ' + name));
        }
    }

    function Store(config, container) {
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

            return new Y.Promise(function (fulfill, reject) {

                function load(model) {
                    model.load(options, function (err) {
                        if (err) {
                            return reject(err);
                        }
                        cache[name] = model;
                        fulfill(model);
                    });
                }

                if (!model) {
                    importAndCreate(name, function (err, model) {
                        if (err) {
                            // if the module does not exists, then just fulfill with
                            // empty object
                            return fulfill(new ModelMock());
                        }
                        load(model);
                    });
                } else if (!Y.Lang.isFunction(model.load)) {
                    rehydrate(name, model, function (err, model) {
                        if (err) {
                            // if the module does not exists, then just fulfill with
                            // empty object
                            return fulfill(new ModelMock());
                        }
                        load(model);
                    });
                } else {
                    load(model);
                }

            });
        },

        toJSON: function () {
            return this._data;
        }

    };

    Y.Store = Store;

}, '@VERSION', { requires: ['promise'] });
