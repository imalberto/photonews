/*
 * Copyright (c) 2013, Yahoo! Inc.  All rights reserved.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE.txt file for terms.
 */

/*jslint nomen:true*/
/*jshint esnext:true*/

import NewsModel from 'models/news';
import NewsController from 'controllers/news';

var NewsHandler = function (req, res) {

    var ControllerClass = NewsController,
        ModelClass = NewsModel,
        controller,
        model,
        data;

    data = (req.cache && req.cache.news) || [];
    model = new ModelClass(data);
    controller = new ControllerClass({ name: 'news', model: model });

    res.render('news', controller);

};

export default NewsHandler;
