/*
 * Copyright (c) 2013, Yahoo! Inc.  All rights reserved.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE.txt file for terms.
 */

/*jslint nomen:true, node:true*/

/**
Blueprint for handlers

function (req, res) {
    var model = new Y.Models.NewsModel(req.params),
        controller = new Y.Controllers.NewsController(model);

    controller.then(function (err, data) {
        if (err) {
            return res.render('error', // error context //);
        }
        res.render('news', {items: data});    
    });
}

**/

// var Y;
// 
// function news(req, res) {
//     Y = Y || res.app.yui.use('news-model');
// 
//     var model = Y.NewsModel,
//         query = req.params.query;
// 
//     query = query || 'senate';
// 
//     model.search(query, 0, 2, function (err, articles) {
//         if (err) {
//             console.log('Error loading articles for query "%s"', query);
//             res.render('error');
//             return;
//         }
// 
//         res.render('news', {
//             src: 'news',
//             articles: articles
//         });
//     });
// }
// 
// 
// module.exports = news;
