/*jslint nomen:true, node:true*/
/*jshint esnext:true*/

import PhotoModel from 'models/photo';
import {ModelList} from 'model-list';
import {Base} from 'base-build';
import {YQL} from 'yql';
import {config} from 'yui';

var PhotosModelList = Base.create('photos-model', ModelList, [], {
    model: PhotoModel,

    API_KEY: '84921e87fb8f2fc338c3ff9bf51a412e',

    initializer: function (config) {
        this.config = config;
    },

    // @params {String} options.query the filter to apply to the search results
    sync: function (action, options, cb) {
        if (action !== 'read') {
            return cb(new Error('action not supported: ' + action));
        }

        if (typeof window !== 'undefined') {
            if (config.global.DATA && config.global.DATA.photos) {
                var photos = config.global.DATA.photos;
                if (photos.items && photos.items.length > 0) {
                    return cb(null, photos.items);
                }
            }
        }

        this.search(options.query, 2, 13, function (err, articles) {
            cb(err, articles);
        });
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
                index: i,
                title: photo.title,
                url: photo.url,
                user: photo.ownername
            });
        }

        return photos;

    },

    search: function (search, start, count, callback) {

        var my = this,
            select;

        search = search || 'eiffel';

        count /= 1;
        start /= 1;

        select = 'select * from ' + 'flickr.photos.search ' +
                '(' + (start || 0) + ',' + (count || 4) + ') ' +
                'where has_geo="true" and ' + 'tags="' + search + '"' +
                'and extras="owner_name" ' +
                'and api_key="' + this.API_KEY + '"';

// returning mocking values for development
// console.warn('using mock data for query: ' + select);
// return callback(null, my._process(search, this.photosMock()));

        // Uncomment to test with live data
        //
        YQL(select, function (raw) {
             var photos = my._process(search, raw);
             callback(null, photos);
        });

    },

    photosMock: function () {
        return {
            "query": {
                "count": 13,
                "created": "2013-11-21T19:37:59Z",
                "lang": "en-US",
                "results": {
                    "photo": [{
                        "farm": "4",
                        "id": "10969304735",
                        "isfamily": "0",
                        "isfriend": "0",
                        "ispublic": "1",
                        "owner": "23020238@N04",
                        "ownername": "Miscolo",
                        "secret": "21304f8c7d",
                        "server": "3707",
                        "title": "Paris 01"
                    }, {
                        "farm": "8",
                        "id": "10967732045",
                        "isfamily": "0",
                        "isfriend": "0",
                        "ispublic": "1",
                        "owner": "45989911@N06",
                        "ownername": "JF Morazzani",
                        "secret": "508937b141",
                        "server": "7427",
                        "title": "Paris 2013"
                    }, {
                        "farm": "3",
                        "id": "10967711693",
                        "isfamily": "0",
                        "isfriend": "0",
                        "ispublic": "1",
                        "owner": "29672764@N04",
                        "ownername": "pedritop (www.ppedreira.com)",
                        "secret": "6dc25d03f8",
                        "server": "2836",
                        "title": "Torre Eiffel"
                    }, {
                        "farm": "6",
                        "id": "10962734554",
                        "isfamily": "0",
                        "isfriend": "0",
                        "ispublic": "1",
                        "owner": "62077150@N06",
                        "ownername": "gregorywass",
                        "secret": "78766528ff",
                        "server": "5549",
                        "title": "Paris, 1990"
                    }, {
                        "farm": "4",
                        "id": "10959609953",
                        "isfamily": "0",
                        "isfriend": "0",
                        "ispublic": "1",
                        "owner": "50158335@N03",
                        "ownername": "Alexandre LC",
                        "secret": "a0717e30d6",
                        "server": "3759",
                        "title": "Paris1"
                    }, {
                        "farm": "4",
                        "id": "10958887276",
                        "isfamily": "0",
                        "isfriend": "0",
                        "ispublic": "1",
                        "owner": "36336201@N00",
                        "ownername": "Scottmh",
                        "secret": "4fbd02bd42",
                        "server": "3804",
                        "title": "Eiffel Tower"
                    }, {
                        "farm": "8",
                        "id": "10951853275",
                        "isfamily": "0",
                        "isfriend": "0",
                        "ispublic": "1",
                        "owner": "26045503@N05",
                        "ownername": "schmollmolch",
                        "secret": "cbc320b9dc",
                        "server": "7303",
                        "title": "<3"
                    }, {
                        "farm": "4",
                        "id": "10950075626",
                        "isfamily": "0",
                        "isfriend": "0",
                        "ispublic": "1",
                        "owner": "29672764@N04",
                        "ownername": "pedritop (www.ppedreira.com)",
                        "secret": "cb4ef5301c",
                        "server": "3826",
                        "title": "Vista desde la torre eiffel"
                    }, {
                        "farm": "3",
                        "id": "10934357666",
                        "isfamily": "0",
                        "isfriend": "0",
                        "ispublic": "1",
                        "owner": "45115614@N05",
                        "ownername": "R.G. Photographe",
                        "secret": "81436cd0b4",
                        "server": "2889",
                        "title": "Mercure admirant le coucher de soleil sur la Tour Eiffel. PARIS"
                    }, {
                        "farm": "3",
                        "id": "10931315673",
                        "isfamily": "0",
                        "isfriend": "0",
                        "ispublic": "1",
                        "owner": "96536076@N07",
                        "ownername": "Andrea Moscato",
                        "secret": "2fc37466f2",
                        "server": "2867",
                        "title": "Tour Eiffel - Paris, France"
                    }, {
                        "farm": "3",
                        "id": "10930927194",
                        "isfamily": "0",
                        "isfriend": "0",
                        "ispublic": "1",
                        "owner": "29672764@N04",
                        "ownername": "pedritop (www.ppedreira.com)",
                        "secret": "37ab648d70",
                        "server": "2828",
                        "title": "A falta de una novia..."
                    }, {
                        "farm": "4",
                        "id": "10928752686",
                        "isfamily": "0",
                        "isfriend": "0",
                        "ispublic": "1",
                        "owner": "52371140@N02",
                        "ownername": "M. Levaillant",
                        "secret": "9035bf61ab",
                        "server": "3731",
                        "title": "IMG_9016"
                    }, {
                        "farm": "8",
                        "id": "10922452074",
                        "isfamily": "0",
                        "isfriend": "0",
                        "ispublic": "1",
                        "owner": "52371140@N02",
                        "ownername": "M. Levaillant",
                        "secret": "c968329846",
                        "server": "7360",
                        "title": "IMG_9110-Edit"
                    }]
                }
            }
        };
    }
}, {});

export default PhotosModelList;
