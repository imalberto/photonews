import {Models} from 'default-model';
import {PN} from 'util';
import {ModelList} from 'model-list';
import 'model-list';
import 'post-model';
import {Base} from 'base';
import {YQL} from 'yql';
import {Lang} from 'yui';

var Class,
    classify = PN.util.classify;

Class = Base.create('news-model', ModelList, [], {
    model: Models.PostModel,

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

        search = search || 'senate';

        count /= 1;
        start /= 1;

        select = 'select * from tumblr.posts where username="{search}" ' +
                    'and start={start} and num={count}';
        select = Lang.sub(select, {search: 'yahoo'});
        select = Lang.sub(select, {start: start});
        select = Lang.sub(select, {count: count});

        YQL(select, function (raw) {
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

}, {
    ATTRS: {
    }
});

Models[classify(Class.NAME)] = Class;

export default Class;
