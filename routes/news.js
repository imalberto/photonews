
/*jslint nomen:true, node:true*/

var Y;

function news(req, res) {
    Y = Y || res.app.yui.use('news-model');

    var model = Y.NewsModel;

    model.search('senate', 0, 3, function (articles) {
        res.render('news', {
            src: 'news',
            articles: articles
        });
    });
}


module.exports = news;
