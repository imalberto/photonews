/*
 * Copyright (c) 2013, Yahoo! Inc.  All rights reserved.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE.txt file for terms.
 */

/*jslint nomen:true, node:true*/
/*global YUI*/

YUI.add('flickr-model', function (Y, NAME) {

    var API_KEY = '84921e87fb8f2fc338c3ff9bf51a412e';

    Y.FlickrModel = {
        init: function (config) {
            this.config = config;
        },

        _process: function (search, raw) {
            var photos = [],
                photo,
                i;

            raw.query = raw.query || {};
            raw.query.count = raw.query.count || 0;

            if (raw.query.count === 0) {
                return photos;
            }

            for (i = 0; i < raw.query.count; i = i + 1) {
                photo = raw.query.results.photo[i];
                photo.url = 'http://farm' + photo.farm + '.static.flickr.com/' + photo.server + '/' + photo.id + '_' + photo.secret + '.jpg';
                photo.title = (!photo.title) ? search + ':' + i : photo.title;
                // Attach the result.
                photos.push({
                    id: photo.id,
                    title: photo.title,
                    url: photo.url
                });
            }

            return photos;

        },

        search: function (search, start, count, callback) {

            var my = this,
                photos,
                select;

            // photos = my._process(search, Y.MockFlickrModel);
            // callback(null, photos);
            // return;
            // 
            search = search || 'mojito';

            count /= 1;
            start /= 1;

            select = 'select * from ' + 'flickr.photos.search ' +
                    '(' + (start || 0) + ',' + (count || 4) + ') ' +
                    'where has_geo="true" and ' + 'tags="' + search + '"' +
                    'and api_key="' + API_KEY + '"';
            Y.log('YQL: ' + select, 'debug', NAME);
            
            Y.YQL(select, function (raw) {
                photos = my._process(search, raw);
                callback(null, photos);
            });
            
        }
    };

}, '0.0.1', { requires: ['yql', 'mock-flickr-model'] });
