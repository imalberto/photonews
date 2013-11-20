/*
 * Copyright (c) 2013, Yahoo! Inc.  All rights reserved.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE.txt file for terms.
 */

/*jslint nomen:true*/
/*jshint esnext:true*/
/*global */

import {Models} from 'default-model';
import {PN} from 'util';
import {ModelList} from 'model-list';
import 'model-list';
import PostModel from 'models/post';
import {Base} from 'base';
import {YQL} from 'yql';
import {Lang} from 'yui';

var Class,
    classify = PN.util.classify;

Class = Base.create('news-model', ModelList, [], {
    model: PostModel,

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

    sync: function (action, options, cb) {
        if (action !== 'read') {
            return cb(new Error('action not supported: ' + action));
        }

        return cb(null, this.news());

        this.search('yahoo', 2, 5, function (err, articles) {
            cb(err, articles);
        });
    },

    news: function () {
        return
            [
                {
                    "content": "<p><em>by Marissa Mayer, Yahoo CEO</em></p>\n<p>We\u2019ve worked hard over the years to earn our users\u2019 trust and we fight hard to preserve it.</p>\n<p>As you know, there have been a number of reports over the last six months about the U.S. government secretly accessing user data without the knowledge of tech companies, including Yahoo. I want to reiterate what we have said in the past: Yahoo has never given access to our data centers to the NSA or to any other government agency. Ever.</p>\n<p>There is nothing more important to us than protecting our users\u2019 privacy. To that end, we recently announced that we will make Yahoo Mail even more secure by introducing https (SSL - Secure Sockets Layer) encryption with a 2048-bit key across our network by January 8, 2014.</p>\n<p>Today we are announcing that we will extend that effort across <em><strong>all</strong></em> Yahoo products. More specifically this means we will:</p>\n<ul><li><strong><span>Encrypt all information that moves between our data centers by the end of Q1\u00a02014;</span></strong></li>\n<li><strong><span>Offer users an option to encrypt all data flow to/from Yahoo by the end of Q1\u00a02014;</span></strong></li>\n<li><span><strong>Work closely with our international Mail partners to ensure that Yahoo co-branded Mail accounts are https-enabled</strong>.</span></li>\n</ul><p><span>As we have said before, we will continue to evaluate how we can protect our users\u2019 privacy and their data. We appreciate, and certainly do not take for granted, the trust our users place in us.</span></p>",
                    "format": "html",
                    "id": "67373852814",
                    "publishedDate": "Mon, 18 Nov 2013 11:30:04",
                    "tag": [
                        "yahoo",
                        "privacy",
                        "security"
                    ],
                    "timestamp": "1384792204",
                    "title": "Our Commitment to Protecting Your Information",
                    "url": "http://yahoo.tumblr.com/post/67373852814"
                },
                {
                    "content": "<p>When you\u2019re a company that\u2019s been around as long as Yahoo, there are lots of fun things that you stumble across. This year, we found a huge list of domain names that the company has owned for quite some time.</p>\n<p>As we discussed what to do with them, it became obvious that it was time to set them free&#8230;back into the wild of the Internet. Surely, creative people, businesses and entrepreneurs could come up with something great to do with them. They could even spark some brand new ideas or companies.</p>\n<p><span id=\"docs-internal-guid-58d3f0d9-4ffe-0741-d3a9-34398a8f1874\"><span>Tomorrow, we\u2019re starting a week-long auction that includes well over a hundred premium domain names. How </span><em>premium</em><span> you ask? How about </span><strong>sandwich.com</strong><span>? That\u2019s a pretty awesome name, and now it\u2019s back on the market!</span></span></p>\n<p><span><span><img alt=\"image\" src=\"http://media.tumblr.com/c690b1947b8e0f3cfd0defca087ae8b6/tumblr_inline_mw6tc4UjwX1qhxx5s.gif\"/></span></span></p>\n<p><span>Get ready to bid on your favorites, here\u2019s a partial look at the treasure you\u2019ll find:</span></p>\n<p>- <strong>Crackers.com</strong> (Snack-rating site?)<br/> - <strong>AV.com</strong> (Reminds me of high school)<br/> - <strong>Jockeys.com</strong> (A social network for people who ride horses?)<br/> - <strong>Sled.com</strong> (Winter is coming)<br/> - <strong>Blogsport.com</strong> (Could be great if blogging ever became an Olympic sport!)</p>\n<p><a href=\"https://www.sedo.com/search/searchresult.php4?&amp;auctionevent=yahoo\"><strong>Go here to find the list</strong></a>. The Domainapalooza starts on the 14th and goes through the 21st, and we&#8217;ll be adding more domain names during the week.</p>\n<p><span id=\"docs-internal-guid-58d3f0d9-4ffe-beb4-80da-f6704448bdfd\"><span></span><span>Happy bidding!</span></span></p>\n<p><em>by Kevin Kramer, Deputy General Counsel</em></p>",
                    "format": "html",
                    "id": "66874924826",
                    "publishedDate": "Wed, 13 Nov 2013 10:05:56",
                    "tag": [
                        "yahoo",
                        "domains",
                        "domain names",
                        "sandwich"
                    ],
                    "timestamp": "1384355156",
                    "title": "Domainapalooza!",
                    "url": "http://yahoo.tumblr.com/post/66874924826"
                },
                {
                    "format": "html",
                    "id": "66776965149",
                    "publishedDate": "Tue, 12 Nov 2013 09:01:24",
                    "timestamp": "1384264884",
                    "url": "http://yahoo.tumblr.com/post/66776965149"
                },
                {
                    "content": "<p><em>Emily Jipson, Head of Product, Yahoo Finance</em></p>\n<p class=\"normal\">Earlier this week we <a href=\"http://yahoo.tumblr.com/post/66180432419/new-yahoo-finance-app-goes-public\">introduced</a> a new Yahoo Finance app for iPhone and iPad, and today we are launching a redesigned <a href=\"http://finance.yahoo.com\">Yahoo Finance</a> for the web. This clean new design aims to provide you with access to the stocks you care about, a stream of relevant business news, deeper data integration, and more.</p>\n<p class=\"normal\">One of the first changes you\u2019ll notice is a list of stocks at the top left, which makes monitoring the companies that you care about easy from any page on Yahoo Finance.</p>\n<p class=\"normal\">The new Yahoo Finance Portfolio lets you sync your brokerage accounts for a real-time view of your performance.\u00a0 Now, it\u2019s faster and easier to see your best and worst performing investments, right from the new Finance homepage.</p>\n<p class=\"normal\"><img alt=\"image\" src=\"http://media.tumblr.com/51095bbfa27506d750f23dfdea81c351/tumblr_inline_mvxdu46biw1qhxx5s.gif\"/></p>\n<p class=\"normal\">We\u2019ve integrated the Markets section with the homepage to allow you to get greater insight into broad market performance. With the new calendar feature, you can see the day\u2019s market-moving events.\u00a0 And with Trending Tickers, you can view which stocks are trending right now with Yahoo Finance users.</p>\n<p class=\"normal\"><img alt=\"image\" src=\"http://media.tumblr.com/fb2c88780bfb781c8cf7ce1a28b3c455/tumblr_inline_mvxdvhDs6h1qhxx5s.gif\"/></p>\n<p>We&#8217;d love for you to give the new experience a spin and please feel free to send us your <a href=\"http://yahoo.uservoice.com/forums/207809-finance-gs%20\">feedback</a>.</p>",
                    "format": "html",
                    "id": "66368834286",
                    "publishedDate": "Fri, 08 Nov 2013 08:55:02",
                    "timestamp": "1383918902",
                    "title": "Investing in our Yahoo Finance Homepage",
                    "url": "http://yahoo.tumblr.com/post/66368834286"
                },
                {
                    "content": "<p><em>by Alex Diaz, VP Mobile and Emerging Products</em></p>\n<p class=\"normal\">Today we\u2019re excited to introduce an updated Yahoo Finance app for iPhone and iPad - an entirely redesigned experience to help you follow the stocks and companies you care about most. Yahoo Finance delivers personalized news, real-time data and insights wherever you are, whenever you need it.</p>\n\n<p class=\"normal\">At the center of the Yahoo Finance app are the companies and stocks you care about - whether it\u2019s breaking news and information, beautiful interactive charts or real time price changes you can easily follow any company to get personalized information and make sure you keep up to date on changes.</p>\n\n<p class=\"normal\">The Yahoo Finance app for iPhone and iPad was reimagined to deliver a beautiful personalized experience with a <strike>s</strike>tream of top news and data based on your favorite stocks and interests. We\u2019ve added Push Notifications to keep you in the know as important stories break &#8212; so you can make quick and informed decisions on the stocks and companies you follow.</p>\n\n<p class=\"normal\">Yahoo Finance includes completely redesigned interactive stock charts to track historical changes, and easily compare performance to identify trends.</p>\n\n<p class=\"normal\"><img alt=\"image\" src=\"http://media.tumblr.com/368337dcd1b0978db53b2fd6f751de35/tumblr_inline_mvudd8LrIW1qhxx5s.gif\"/></p>\n<p class=\"normal\">It&#8217;s now easier than ever to visualize company and market data by swiping, pinching and panning across the chart. You can also compare any stock, market or index to see related price changes.</p>\n\n<p class=\"normal\">We&#8217;re really excited about the new Yahoo Finance app and hope that you are too. The app is available in the US and you can download it free on the <a href=\"https://itunes.apple.com/us/app/yahoo!-finance/id328412701?mt=8\">App Store.</a></p>\n\n<p><a href=\"https://itunes.apple.com/us/app/yahoo!-finance/id328412701?mt=8\"><span><span><span><img alt=\"image\" src=\"http://media.tumblr.com/7110e60be14e2449ad56a9aaeb98ae8c/tumblr_inline_mvtd3rotui1qhxx5s.jpg\"/></span></span></span></a></p>\n<div>\n<div align=\"center\"><iframe frameborder=\"0\" height=\"315\" src=\"//www.youtube.com/embed/CGNga8JnPao\" width=\"560\"></iframe></div>\n</div>",
                    "format": "html",
                    "id": "66180432419",
                    "publishedDate": "Wed, 06 Nov 2013 07:30:00",
                    "tag": [
                        "Yahoo Finance",
                        "finance",
                        "portfolio",
                        "mobile"
                    ],
                    "timestamp": "1383741000",
                    "title": "New Yahoo Finance App Goes Public",
                    "url": "http://yahoo.tumblr.com/post/66180432419"
                }
            ];
    }

}, {
    ATTRS: {}
});

Models[classify(Class.NAME)] = Class;

export default Class;
