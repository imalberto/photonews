
/*jslint nomen:true, node:true*/
/*global YUI*/

/**
Base controller that other controllers should extend from.

Overwrite `modelClass` to specify which model to use for this controller.

**/

// TODO default-controller or base-controller ?
YUI.add('default-controller', function (Y, NAME) {
	var classify = Y.PN.util.classify;

	function Class() {
		Class.superclass.constructor.apply(this, arguments);
	}

	Class.NAME = classify(NAME);
	Class.ATTRS = {
		modelClass: {
			value: Y.Models.DefaultModel
		},
		model: {
			value: null
		},
		models: {
			value: []
		}
	};

	Y.extend(Class, Y.Base, {
		initializer: function (config) {
			var Class = this.get('modelClass'),
                model = this.get('model');

            if (config.model) {
                this.set('model', config.model);
            } else {
                if (!model) {
                    this.set('model', new Class());
                    model = this.get('model');
                }
            }

			this._promise = new Y.Promise(function (fulfill, reject) {
				model.load({}, function (err, res) {
					if (err) {
						console.error('** ERROR **: default-controller.initializer() failed: %s', err);
						reject(err);
						return;
					}
					fulfill(res);
				});
			});
		},
		then: function (fulfill, reject) {
			return this._promise.then(fulfill, reject);
		}
	});

	Y.namespace('Controllers')[classify(NAME)] = Class;

}, '@VERSION', { requires: [
	'promise',
    'default-model',
	'util'
]});
