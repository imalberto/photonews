/*jshint esnext:true*/

// import NewsModel from 'models/news';
import {BaseController} from 'base-controller';
import {Base} from 'base-build';

var NewsController = Base.create('news-controller', BaseController, {}, {
    ATTRS: {
        // specify the model class to use for this controller
        // optional: if not specified, a default `NewsModel` will be used

        // modelClass: {
        //     value: NewsModel
        // }
    }
});

export default NewsController;
