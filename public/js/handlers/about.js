/*
 * Copyright (c) 2013, Yahoo! Inc.  All rights reserved.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE.txt file for terms.
 */

/*jslint nomen:true*/
/*jshint esnext:true*/

import {Handlers} from 'default-handler';

function Handler(req, res) {
    res.render('about');
};

Handlers.AboutHandler = Handler;

export default Handler;
