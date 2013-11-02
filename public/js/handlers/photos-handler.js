/*
 * Copyright (c) 2013, Yahoo! Inc.  All rights reserved.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE.txt file for terms.
 */

/*jslint nomen:true, node:true*/
/*global YUI*/

/**
For demo purposes, /photos is going to use a default handler.
**/

// YUI.add('photos-handler', function (Y, NAME) {
//     'use strict';
//
//     var Route,
//         util = Y.PN.util;
//
//     Route = Y.namespace('Handlers')[util.classify(NAME)] = function (req, res) {
//
//         var renderer = Y.Renderer,
//             ModelClass = Y.Models.PhotosModel,
//             model,
//             config,
//             query;
//
//         model = new ModelClass(req.params);
//
//         query = req.params.q || 'eiffel';
//
//         model.load(function (err, response) {
//             if (err) {
//                 console.error('** ERROR ** failed loading articles for query "%s"', query);
//                 return renderer.render('error');
//             }
//             config = {
//                 viewName: 'photos',
//                 locals: { items: response }
//             };
//             renderer.render(config, req, res);
//         });
//     };
//
// }, '0.0.1', { requires: [
//     'util',
//     'renderer',
//     'photos-model'
// ]});


