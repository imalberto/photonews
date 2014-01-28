
/*jslint nomen:true, node:true*/
/*jshint esnext:true*/

var NewsRoute = function (req, res, next) {
    req.store.find('news', {}).then(function (model) {
        res.render('news', {items: model.toJSON()});
    }, next);
};

export default NewsRoute;
