

/*jslint nomen:true, node:true*/
/*global YUI*/

YUI.add('about-handler', function (Y, NAME) {

    'use strict';

    var classify = Y.PN.util.classify;

    Y.namespace('Handlers')[classify(NAME)] = function (req, res) {

        // Default handler on the server will create a default model, and
        // a default controller if necessary (if not specified), and will
        // res.render() by passing the name.
        //
        // The same thing should be done on the client side.
        res.render('about');
    };

}, '@VERSION', {
    requires: [
        'util'
    ]
});
