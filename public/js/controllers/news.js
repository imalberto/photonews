import {Controllers} from 'default-controller';
import {PN} from 'util';
import NewsModel from 'model/news';
import {Base} from 'base';

var classify = PN.util.classify,
    Class;

Class = Base.create('news-controller', Controllers.DefaultController, {
}, {
    ATTRS: {
        // specify the model class to use for this controller
        // optional: if not specified, a default `NewsModel` will be used
        modelClass: {
            value: NewsModel
        }
    }
});

Controllers[classify(Class.NAME)] = Class;

export default Class;
