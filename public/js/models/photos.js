/*
 * Copyright (c) 2013, Yahoo! Inc.  All rights reserved.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE.txt file for terms.
 */

/*jslint nomen:true, node:true*/
/*jshint esnext:true*/
/*global */

import PhotoModel from 'models/photo';
import {ModelList} from 'model-list';
import {Base} from 'base-build';
import {YQL} from 'yql';

var API_KEY = '84921e87fb8f2fc338c3ff9bf51a412e',
    Class;

Class = Base.create('photos-model', ModelList, [], {
    model: PhotoModel,

    initializer: function (config) {
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
                url: photo.url,
                user: photo.ownername
            });
        }

        return photos;

    },

    search: function (search, start, count, callback) {

        var my = this,
            photos,
            select;

        search = search || 'mojito';

        count /= 1;
        start /= 1;

        select = 'select * from ' + 'flickr.photos.search ' +
                '(' + (start || 0) + ',' + (count || 4) + ') ' +
                'where has_geo="true" and ' + 'tags="' + search + '"' +
                'and extras="owner_name" ' +
                'and api_key="' + API_KEY + '"';

        YQL(select, function (raw) {
            photos = my._process(search, raw);
            callback(null, photos);
        });

    },

    sync: function (action, options, cb) {
        if (action !== 'read') {
            return cb(new Error('action not supported: ' + action));
        }

        return cb(null, this.photos());

        this.search('eiffel', 2, 13, function (err, articles) {
            cb(err, articles);
        });
    },

    photos: function () {
        return
            [
                {
                    "id": "10934357666",
                    "title": "Mercure admirant le coucher de soleil sur la Tour Eiffel. PARIS",
                    "url": "http://farm3.static.flickr.com/2889/10934357666_81436cd0b4.jpg",
                    "user": "R.G. Photographe"
                },
                {
                    "id": "10931315673",
                    "title": "Tour Eiffel - Paris, France",
                    "url": "http://farm3.static.flickr.com/2867/10931315673_2fc37466f2.jpg",
                    "user": "Andrea Moscato"
                },
                {
                    "id": "10930927194",
                    "title": "A falta de una novia...",
                    "url": "http://farm3.static.flickr.com/2828/10930927194_37ab648d70.jpg",
                    "user": "pedritop (www.ppedreira.com)"
                },
                {
                    "id": "10928752686",
                    "title": "IMG_9016",
                    "url": "http://farm4.static.flickr.com/3731/10928752686_9035bf61ab.jpg",
                    "user": "M. Levaillant"
                },
                {
                    "id": "10922452074",
                    "title": "IMG_9110-Edit",
                    "url": "http://farm8.static.flickr.com/7360/10922452074_c968329846.jpg",
                    "user": "M. Levaillant"
                },
                {
                    "id": "10922256336",
                    "title": "IMG_8855-Edit",
                    "url": "http://farm6.static.flickr.com/5502/10922256336_8cb9220bd4.jpg",
                    "user": "M. Levaillant"
                },
                {
                    "id": "10922368203",
                    "title": "IMG_8648-Edit",
                    "url": "http://farm6.static.flickr.com/5502/10922368203_4d6fed3214.jpg",
                    "user": "M. Levaillant"
                },
                {
                    "id": "10922156366",
                    "title": "IMG_8760-Edit",
                    "url": "http://farm4.static.flickr.com/3753/10922156366_c8a929503c.jpg",
                    "user": "M. Levaillant"
                },
                {
                    "id": "10922263974",
                    "title": "IMG_8826-Edit",
                    "url": "http://farm4.static.flickr.com/3831/10922263974_c8fe974b6c.jpg",
                    "user": "M. Levaillant"
                },
                {
                    "id": "10922174336",
                    "title": "IMG_8789-Edit",
                    "url": "http://farm8.static.flickr.com/7291/10922174336_340235968a.jpg",
                    "user": "M. Levaillant"
                },
                {
                    "id": "10922211876",
                    "title": "IMG_8840-Edit",
                    "url": "http://farm8.static.flickr.com/7392/10922211876_59b634d373.jpg",
                    "user": "M. Levaillant"
                },
                {
                    "id": "10922097866",
                    "title": "IMG_8628-Edit",
                    "url": "http://farm3.static.flickr.com/2823/10922097866_14bf955030.jpg",
                    "user": "M. Levaillant"
                },
                {
                    "id": "10910863345",
                    "title": "Tour Eiffel",
                    "url": "http://farm4.static.flickr.com/3685/10910863345_98f2f8c5fd.jpg",
                    "user": "Roger_Ribas"
                }
            ];
    }
}, {});

export default Class;
