
/*jslint nomen:true, node:true*/
/*global YUI*/

YUI.add('news-controller', function (Y, NAME) {
	var classify = Y.PN.util.classify,
        Class;

    Class = Y.Base.create('newsControllerClass', Y.Controllers.DefaultController, {
    }, {
        ATTRS: {
            // specify the model class to use for this controller
            // optional: if not specified, a default `NewsModel` will be used
            modelClass: {
                value: Y.Models.NewsModel
            }
        }
    });

	Y.namespace('Controllers')[classify(NAME)] = Class;

	// function Class() {
    // Class.superclass.constructor.apply(this, arguments);
	// }

	// Class.NAME = classify(NAME);
	// Class.ATTRS = {
    // modelClass: {
    //     value: Y.Models.NewsModelList
    // },
    // model: {
    //     value: null
    // },
    // models: {
    //     value: []
    // }
	// };

	// Y.extend(Class, Y.Base, {
    // initializer: function () {
    //     var model = this.get('model');

    //         if (!model) {
    //             this.set('model', new Class());
    //             model = this.get('model');
    //         }

    //      this._promise = new Y.Promise(function (fulfill, reject) {
    //          model.load({}, function (err, res) {
    //              if (err) {
    //                  console.error('** ERROR **: news-controller.initializer() failed: %s', err);
    //                  reject(err);
    //                  return;
    //              }
    //              fulfill(res);
    //          });
    //      });
    //  },
    //  then: function (fulfill, reject) {
    //      return this._promise.then(fulfill, reject);
    //  }
    // });

	// Y.namespace('Controllers')[classify(NAME)] = Class;
}, '@VERSION', { requires: [
    'default-controller',
	'news-model',
	'promise',
	'util'
]});
