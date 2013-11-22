/*
 * Copyright (c) 2013, Yahoo! Inc.  All rights reserved.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE.txt file for terms.
 */
/*jshint esnext:true*/

import NewsModel from 'models/news';
import {DefaultController} from 'default-controller';
import {Base} from 'base-build';

var NewsController = Base.create('news-controller', DefaultController, {
initializer: function () {
debugger;
}


}, {
    ATTRS: {
        // specify the model class to use for this controller
        // optional: if not specified, a default `NewsModel` will be used
        modelClass: {
            value: NewsModel
        }
    }
});

//export default NewsController;
