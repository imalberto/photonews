/*
 * Copyright (c) 2013, Yahoo! Inc.  All rights reserved.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE.txt file for terms.
 */

/*jslint nomen:true*/
/*jshint esnext:true*/

import NewsModel from 'models/news';
import NewsController from 'controllers/news';
import {config} from 'yui';

var Route;

Route = function (req, res) {

    var ControllerClass = NewsController,
        ModelClass = NewsModel,
        controller,
        model,
        GlobalDATA = config.global.DATA,
        data;

    data = (GlobalDATA && GlobalDATA.news) || [];
    model = new ModelClass(data);
    controller = new ControllerClass({ name: 'news', model: model });

    res.render('news', controller);

};

export default Route;
