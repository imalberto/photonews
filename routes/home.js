
var Y;

/*jslint nomen:true, node:true*/
function home(req, res) {
    Y = Y || req.app.yui.use();

    res.render('home');
}

module.exports = home;

