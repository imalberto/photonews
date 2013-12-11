/*jslint nomen:true, node:true*/
/*global YUI*/

YUI.add('import', function (Y, NAME) {

    'use strict';

    Y.import = function (modules, callback) {
        var args = [].concat(modules);
        args.push(function (Y) {
            var r = [],
                i;
            for (i = 0; i < modules.length; i += 1) {
                r.push(Y.Env._exported[modules[i]] || Y);
            }
            callback.apply(this, r);
        });
        Y.use.apply(Y, args);
    };

}, '@VERSION', { requires: [] });
