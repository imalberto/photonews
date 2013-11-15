/*
 * Copyright (c) 2013, Yahoo! Inc.  All rights reserved.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE.txt file for terms.
 */

/*jslint nomen:true*/
/*jshint esnext:true*/

import NewsModel from 'models/news';
import {Handlers} from 'default-handler';
import {Controllers} from 'default-controller';
import {config} from 'yui';

var Route;

Route = function (req, res) {

    var ControllerClass = Controllers.NewsController,
        ModelClass = NewsModel,
        controller,
        model,
        // TODO access DATA via Y.config.global
        DATA,
        data;

    if (typeof document !== 'undefined') {
        DATA = window.DATA;
    } else {
        DATA = global.DATA;
    }
    data = (DATA && DATA.news) || [];
    model = new ModelClass(data);
    controller = new ControllerClass({name: 'news', model: model});

    res.render('news', controller);

};


Handlers.NewsHandler = Route;

export default Route;

