YUI.add('models/news', function (Y, NAME, __imports__, __exports__) {
    "use strict";
    /*jslint nomen:true*/
    /*jshint esnext:true*/
    /*global console*/

    var PostModel = __imports__["models/post"]["default"];
    var YQL = __imports__["yql"].YQL;
    var Lang = __imports__["yui"].Lang;
    var PN = __imports__["pn"].PN;

    var NewsModelList = PN.ModelList.extend({

        model: PostModel,

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
                select;

            search = search || 'senate';

            count /= 1;
            start /= 1;

            select = 'select * from tumblr.posts where username="{search}" ' +
                        'and start={start} and num={count}';
            select = Lang.sub(select, {search: 'yahoo'});
            select = Lang.sub(select, {start: start});
            select = Lang.sub(select, {count: count});

    // returning mocking values for development
    console.warn('using mock data for query: ' + select);
    return callback(null, my._process(search, this.newsMock()));

            // Uncomment to test with live data
            //
            // YQL(select, function (raw) {
            //    var articles = my._process(search, raw);
            //     callback(null, articles);
            // });

        },

        sync: function (action, options, cb) {
            if (action !== 'read') {
                return cb(new Error('action not supported: ' + action));
            }

            this.search('yahoo', 2, 5, function (err, articles) {
                cb(err, articles);
            });
        },

        newsMock: function () {
            return {
                "query": {
                    "count": 1,
                    "created": "2013-11-21T19:41:27Z",
                    "lang": "en-US",
                    "results": {
                        "posts": {
                            "start": "2",
                            "total": "84",
                            "post": [{
                                "date": "Mon, 18 Nov 2013 11:30:04",
                                "date-gmt": "2013-11-18 16:30:04 GMT",
                                "format": "html",
                                "id": "67373852814",
                                "reblog-key": "4ZZsd2pR",
                                "slug": "our-commitment-to-protecting-your-information",
                                "type": "regular",
                                "unix-timestamp": "1384792204",
                                "url": "http://yahoo.tumblr.com/post/67373852814",
                                "url-with-slug": "http://yahoo.tumblr.com/post/67373852814/our-commitment-to-protecting-your-information",
                                "regular-title": "Our Commitment to Protecting Your Information",
                                "regular-body": "<p><em>by Marissa Mayer, Yahoo CEO</em></p>\n<p>We’ve worked hard over the years to earn our users’ trust and we fight hard to preserve it.</p>\n<p>As you know, there have been a number of reports over the last six months about the U.S. government secretly accessing user data without the knowledge of tech companies, including Yahoo. I want to reiterate what we have said in the past: Yahoo has never given access to our data centers to the NSA or to any other government agency. Ever.</p>\n<p>There is nothing more important to us than protecting our users’ privacy. To that end, we recently announced that we will make Yahoo Mail even more secure by introducing https (SSL - Secure Sockets Layer) encryption with a 2048-bit key across our network by January 8, 2014.</p>\n<p>Today we are announcing that we will extend that effort across <em><strong>all</strong></em> Yahoo products. More specifically this means we will:</p>\n<ul><li><strong><span>Encrypt all information that moves between our data centers by the end of Q1 2014;</span></strong></li>\n<li><strong><span>Offer users an option to encrypt all data flow to/from Yahoo by the end of Q1 2014;</span></strong></li>\n<li><span><strong>Work closely with our international Mail partners to ensure that Yahoo co-branded Mail accounts are https-enabled</strong>.</span></li>\n</ul><p><span>As we have said before, we will continue to evaluate how we can protect our users’ privacy and their data. We appreciate, and certainly do not take for granted, the trust our users place in us.</span></p>",
                                "tag": ["yahoo", "privacy", "security"]
                            }, {
                                "date": "Wed, 13 Nov 2013 10:05:56",
                                "date-gmt": "2013-11-13 15:05:56 GMT",
                                "format": "html",
                                "id": "66874924826",
                                "reblog-key": "WMby6BGy",
                                "slug": "domainapalooza",
                                "type": "regular",
                                "unix-timestamp": "1384355156",
                                "url": "http://yahoo.tumblr.com/post/66874924826",
                                "url-with-slug": "http://yahoo.tumblr.com/post/66874924826/domainapalooza",
                                "regular-title": "Domainapalooza!",
                                "regular-body": "<p>When you’re a company that’s been around as long as Yahoo, there are lots of fun things that you stumble across. This year, we found a huge list of domain names that the company has owned for quite some time.</p>\n<p>As we discussed what to do with them, it became obvious that it was time to set them free&#8230;back into the wild of the Internet. Surely, creative people, businesses and entrepreneurs could come up with something great to do with them. They could even spark some brand new ideas or companies.</p>\n<p><span id=\"docs-internal-guid-58d3f0d9-4ffe-0741-d3a9-34398a8f1874\"><span>Tomorrow, we’re starting a week-long auction that includes well over a hundred premium domain names. How </span><em>premium</em><span> you ask? How about </span><strong>sandwich.com</strong><span>? That’s a pretty awesome name, and now it’s back on the market!</span></span></p>\n<p><span><span><img alt=\"image\" src=\"http://media.tumblr.com/c690b1947b8e0f3cfd0defca087ae8b6/tumblr_inline_mw6tc4UjwX1qhxx5s.gif\"/></span></span></p>\n<p><span>Get ready to bid on your favorites, here’s a partial look at the treasure you’ll find:</span></p>\n<p>- <strong>Crackers.com</strong> (Snack-rating site?)<br/> - <strong>AV.com</strong> (Reminds me of high school)<br/> - <strong>Jockeys.com</strong> (A social network for people who ride horses?)<br/> - <strong>Sled.com</strong> (Winter is coming)<br/> - <strong>Blogsport.com</strong> (Could be great if blogging ever became an Olympic sport!)</p>\n<p><a href=\"https://www.sedo.com/search/searchresult.php4?&amp;auctionevent=yahoo\"><strong>Go here to find the list</strong></a>. The Domainapalooza starts on the 14th and goes through the 21st, and we&#8217;ll be adding more domain names during the week.</p>\n<p><span id=\"docs-internal-guid-58d3f0d9-4ffe-beb4-80da-f6704448bdfd\"><span></span><span>Happy bidding!</span></span></p>\n<p><em>by Kevin Kramer, Deputy General Counsel</em></p>",
                                "tag": ["yahoo", "domains", "domain names", "sandwich"]
                            }, {
                                "date": "Tue, 12 Nov 2013 09:01:24",
                                "date-gmt": "2013-11-12 14:01:24 GMT",
                                "format": "html",
                                "id": "66776965149",
                                "reblog-key": "7vFSDn1C",
                                "slug": "yahoo-news-matt-bai-joins-yahoo-news-as-national",
                                "type": "link",
                                "unix-timestamp": "1384264884",
                                "url": "http://yahoo.tumblr.com/post/66776965149",
                                "url-with-slug": "http://yahoo.tumblr.com/post/66776965149/yahoo-news-matt-bai-joins-yahoo-news-as-national",
                                "link-text": "Yahoo News: Matt Bai joins Yahoo News as National Political Columnist",
                                "link-url": "http://yahoonews.tumblr.com/post/66776918889/matt-bai-joins-yahoo-news-as-national-political",
                                "link-description": "<p><a class=\"tumblr_blog\" href=\"http://yahoonews.tumblr.com/post/66776918889/matt-bai-joins-yahoo-news-as-national-political\">yahoonews</a>:</p>\n<blockquote>\n<p><span><img alt=\"image\" src=\"http://media.tumblr.com/a1c8e90fe8054653aea6015bf4622cee/tumblr_inline_mw4hxqnZHh1qca1gz.png\"/></span></p>\n<p><span>Yahoo News has hired Matt Bai, former chief political correspondent for the </span><span>New York Times Magazine</span><span>, as national political columnist. In his new role, Bai will offer unique commentary and deep analysis of politics in Washington and around the country. </span></p>\n<p><span>“Matt Bai is one of the best&#8230;</span></p>\n</blockquote>"
                            }, {
                                "date": "Fri, 08 Nov 2013 08:55:02",
                                "date-gmt": "2013-11-08 13:55:02 GMT",
                                "format": "html",
                                "id": "66368834286",
                                "reblog-key": "Pg2HWjYD",
                                "slug": "investing-in-our-yahoo-finance-homepage",
                                "type": "regular",
                                "unix-timestamp": "1383918902",
                                "url": "http://yahoo.tumblr.com/post/66368834286",
                                "url-with-slug": "http://yahoo.tumblr.com/post/66368834286/investing-in-our-yahoo-finance-homepage",
                                "regular-title": "Investing in our Yahoo Finance Homepage",
                                "regular-body": "<p><em>Emily Jipson, Head of Product, Yahoo Finance</em></p>\n<p class=\"normal\">Earlier this week we <a href=\"http://yahoo.tumblr.com/post/66180432419/new-yahoo-finance-app-goes-public\">introduced</a> a new Yahoo Finance app for iPhone and iPad, and today we are launching a redesigned <a href=\"http://finance.yahoo.com\">Yahoo Finance</a> for the web. This clean new design aims to provide you with access to the stocks you care about, a stream of relevant business news, deeper data integration, and more.</p>\n<p class=\"normal\">One of the first changes you’ll notice is a list of stocks at the top left, which makes monitoring the companies that you care about easy from any page on Yahoo Finance.</p>\n<p class=\"normal\">The new Yahoo Finance Portfolio lets you sync your brokerage accounts for a real-time view of your performance.  Now, it’s faster and easier to see your best and worst performing investments, right from the new Finance homepage.</p>\n<p class=\"normal\"><img alt=\"image\" src=\"http://media.tumblr.com/51095bbfa27506d750f23dfdea81c351/tumblr_inline_mvxdu46biw1qhxx5s.gif\"/></p>\n<p class=\"normal\">We’ve integrated the Markets section with the homepage to allow you to get greater insight into broad market performance. With the new calendar feature, you can see the day’s market-moving events.  And with Trending Tickers, you can view which stocks are trending right now with Yahoo Finance users.</p>\n<p class=\"normal\"><img alt=\"image\" src=\"http://media.tumblr.com/fb2c88780bfb781c8cf7ce1a28b3c455/tumblr_inline_mvxdvhDs6h1qhxx5s.gif\"/></p>\n<p>We&#8217;d love for you to give the new experience a spin and please feel free to send us your <a href=\"http://yahoo.uservoice.com/forums/207809-finance-gs%20\">feedback</a>.</p>"
                            }, {
                                "date": "Wed, 06 Nov 2013 07:30:00",
                                "date-gmt": "2013-11-06 12:30:00 GMT",
                                "format": "html",
                                "id": "66180432419",
                                "reblog-key": "CUAl2sXm",
                                "slug": "new-yahoo-finance-app-goes-public",
                                "type": "regular",
                                "unix-timestamp": "1383741000",
                                "url": "http://yahoo.tumblr.com/post/66180432419",
                                "url-with-slug": "http://yahoo.tumblr.com/post/66180432419/new-yahoo-finance-app-goes-public",
                                "regular-title": "New Yahoo Finance App Goes Public",
                                "regular-body": "<p><em>by Alex Diaz, VP Mobile and Emerging Products</em></p>\n<p class=\"normal\">Today we’re excited to introduce an updated Yahoo Finance app for iPhone and iPad - an entirely redesigned experience to help you follow the stocks and companies you care about most. Yahoo Finance delivers personalized news, real-time data and insights wherever you are, whenever you need it.</p>\n\n<p class=\"normal\">At the center of the Yahoo Finance app are the companies and stocks you care about - whether it’s breaking news and information, beautiful interactive charts or real time price changes you can easily follow any company to get personalized information and make sure you keep up to date on changes.</p>\n\n<p class=\"normal\">The Yahoo Finance app for iPhone and iPad was reimagined to deliver a beautiful personalized experience with a <strike>s</strike>tream of top news and data based on your favorite stocks and interests. We’ve added Push Notifications to keep you in the know as important stories break &#8212; so you can make quick and informed decisions on the stocks and companies you follow.</p>\n\n<p class=\"normal\">Yahoo Finance includes completely redesigned interactive stock charts to track historical changes, and easily compare performance to identify trends.</p>\n\n<p class=\"normal\"><img alt=\"image\" src=\"http://media.tumblr.com/368337dcd1b0978db53b2fd6f751de35/tumblr_inline_mvudd8LrIW1qhxx5s.gif\"/></p>\n<p class=\"normal\">It&#8217;s now easier than ever to visualize company and market data by swiping, pinching and panning across the chart. You can also compare any stock, market or index to see related price changes.</p>\n\n<p class=\"normal\">We&#8217;re really excited about the new Yahoo Finance app and hope that you are too. The app is available in the US and you can download it free on the <a href=\"https://itunes.apple.com/us/app/yahoo!-finance/id328412701?mt=8\">App Store.</a></p>\n\n<p><a href=\"https://itunes.apple.com/us/app/yahoo!-finance/id328412701?mt=8\"><span><span><span><img alt=\"image\" src=\"http://media.tumblr.com/7110e60be14e2449ad56a9aaeb98ae8c/tumblr_inline_mvtd3rotui1qhxx5s.jpg\"/></span></span></span></a></p>\n<div>\n<div align=\"center\"><iframe frameborder=\"0\" height=\"315\" src=\"//www.youtube.com/embed/CGNga8JnPao\" width=\"560\"></iframe></div>\n</div>",
                                "tag": ["Yahoo Finance", "finance", "portfolio", "mobile"]
                            }]
                        }
                    }
                }
            };
        }

    });

    __exports__["default"] = NewsModelList;
    return __exports__;
}, '@VERSION@', {"es": true, "requires": ["models/post", "yql", "yui", "pn"]});
