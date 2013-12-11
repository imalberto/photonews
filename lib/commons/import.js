/*jslint nomen:true, node:true*/
/*global YUI*/

YUI.add('import', function (Y, NAME) {

    'use strict';

    Y.import = function (modules, callback) {
        modules = Y.Array(modules);
        modules.push(function (Y) {
            var r = [],
                i;
            modules.pop(); // removing the callback
            for (i = 0; i < modules.length; i += 1) {
                r.push(Y.Env._exported[modules[i]] || Y);
            }
            callback.apply(this, r);
        });
        Y.use.apply(Y, modules);
    };

}, '@VERSION', { requires: [] });
