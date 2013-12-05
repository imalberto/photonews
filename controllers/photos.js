/*jslint nomen:true*/
/*jshint esnext:true*/

// import PhotosModel from 'models/photos';
import {Base} from 'base-build';
import {BaseController} from 'base-controller';

var PhotosController = Base.create('base-controller', BaseController, {}, {
    ATTRS: {
        // modelClass: {
        //     value: PhotosModel
        // }
    }
});

export default PhotosController;
