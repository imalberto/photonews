/*jslint nomen:true*/
/*jshint esnext:true*/

// import PhotosModel from 'models/photos';
import {merge} from 'oop';
import {Base} from 'base-build';
import {Promise} from 'promise';


var PhotoController = Base.create("photo-controller", Base, [], {

    initializer: function (config) {
        this.config = config;

    },

    /**
    TODO Find a more appropriate name for this

    @return {Object|Promise}
    **/
    toJSON: function () {
        var model = this.get('model'),
            data = {prev: this.prev, next: this.next};

        return new Promise(function (fulfill) {
            fulfill(merge(data, model.toJSON()));
        });
        // OR return model.toJSON();
    }

}, {
    ATTRS: {
        model: {
            value: null
        },
        name: {
            value: 'search'
        }
    }
});

export default PhotoController;

