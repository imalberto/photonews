
/*jslint nomen:true, node:true*/
/*jshint esnext:true*/

var DefaultRoute = function (req, res, next) {
    var name = req.annotations.name;
    req.store.find(name, req.params).then(function (model) {
        res.render(name, model.toJSON());
    }, next).then(null, next);
};

export default DefaultRoute;
