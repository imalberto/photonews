
/*jslint nomen:true, node:true*/
/*global YUI*/

YUI.add('news-model', function (Y, NAME) {

    var Class,
        classify = Y.PN.util.classify;

    Class = Y.Base.create('newsModelListClass', Y.ModelList, [], {
        model: Y.Models.PostModel,

        API_KEY: '84921e87fb8f2fc338c3ff9bf51a412e',

        _process: function (search, raw) {
            var articles = [],
                article,
                results,
                total,
                i;

            raw.query = raw.query || {};
            raw.query.count = raw.query.count || 0;

            if (raw.query.count === 0) {
                return articles;
            }

            results = raw.query.results.posts.post;
            // total = parseInt(raw.query.results.posts.total, 10) || 0;
            total = results.length;
            for (i = 0; i < total; i = i + 1) {
                article = results[i];
                if (!article) {
                    continue;
                }
                // Attach the result.
                articles.push({
                    id: article.id,
                    content: article['regular-body'],
                    title: article['regular-title'],
                    url: article.url,
                    format: article.format,
                    publisher: article.publisher,
                    image: article.image,
                    timestamp: article['unix-timestamp'],
                    publishedDate: article.date,
                    tag: article.tag
                });
            }

            return articles;

        },

        search: function (search, start, count, callback) {

            var my = this,
                articles,
                select;

            // articles = my._process(search, Y.MockTumblrModel);
            // callback(null, articles);
            // return;
            //
            search = search || 'senate';

            count /= 1;
            start /= 1;

            select = 'select * from tumblr.posts where username="{search}" ' +
                        'and start={start} and num={count}';
            select = Y.Lang.sub(select, {search: "yahoo"});
            select = Y.Lang.sub(select, {start: start});
            select = Y.Lang.sub(select, {count: count});

            Y.log('YQL: ' + select, 'debug', NAME);
            
            Y.YQL(select, function (raw) {
                articles = my._process(search, raw);
                callback(null, articles);
            });
            
        },

        initializer: function () {
        },

        sync: function (action, options, cb) {
            if (action !== 'read') {
                return cb(new Error('action not supported: ' + action));
            }
        
            this.search('yahoo', 2, 5, function (err, articles) {
                cb(err, articles);
            });
        }

        // findAll: function () {
        //     var my = this;

        //     return new YPromise(function (fulfill, reject) {
        //         YQL.find(xxx, function (err, data) {
        //             if (err) {
        //                 reject(err);
        //                 return;
        //             }

        //             my.setAttrs(data);

        //             fulfill(my);
        //         });
        //     });
        // },
        // find: function (id) {
        //     return {};
        // }

    }, {
        ATTRS: {
        }
    });

    Y.namespace('Models')[classify(NAME)] = Class;

}, '@VERSION', { requires: [
    'yql',
    'util',
    'model-list',
    'promise',
    'post-model'
]});
