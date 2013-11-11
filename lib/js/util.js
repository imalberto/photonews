/*
 * Copyright (c) 2013, Yahoo! Inc.  All rights reserved.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE.txt file for terms.
 */

/*jslint nomen:true, node:true*/
/*global define,Y, YUI*/

'use strict';

var CAMELIZE_REGEXP = (/(\-|_|\.|\s)+(.)?/g),
    DECAMELIZE_REGEXP = (/([a-z])([A-Z])/g);

function camelize(str) {
    return str.replace(CAMELIZE_REGEXP, function (match, separator, chr) {
        return chr ? chr.toUpperCase() : '';
    }).replace(/^([A-Z])/, function (match, separator, chr) {
        return match.toLowerCase();
    });
}


function decamelize(str) {
    return str.replace(DECAMELIZE_REGEXP, '$1_$2').toLowerCase();
}

function classify(str) {
    var parts = str.split("."),
        out = [],
        camelized,
        i,
        l;

    for (i = 0, l = parts.length; i < l; i++) {
        camelized = camelize(parts[i]);
        out.push(camelized.charAt(0).toUpperCase() + camelized.substr(1));
    }

    return out.join(".");
}

function isPromise(p) {
    if (!!p && typeof p.then === 'function') {
        return true;
    }
    return false;
}

(function (root, factory) {
    if (typeof YUI !== 'undefined' && typeof YUI.add === 'function') {
        Y.namespace('PN').util = factory();
    } else if (typeof define === 'function' && define.amd) {
        define(factory);
    } else if (typeof exports === 'object') {
        module.exports = factory();
    } else {
        root.returnExports = factory();
    }

}(this, function () {
    return {
        classify: classify,
        camelize: camelize,
        decamelize: decamelize,
        isPromise: isPromise
    };
}));

