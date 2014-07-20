/*
* Copyright (c) 2013, Yahoo! Inc. All rights reserved.
* Copyrights licensed under the New BSD License.
* See the accompanying LICENSE file for terms.
*/

/*jslint node:true, nomen:true*/
/*global YUI*/

"use strict";


YUI().use(
    'store',
    'test',
    function (Y) {
        // var YUITest = require('yuitest'),
        //     A = YUITest.Assert,
        //     OA = YUITest.ObjectAssert,
        //     mockery = require('mockery'),
        //     suite;
        var A = Y.Test.Assert,
            // OA = Y.Test.ObjectAssert,
            // mockery = require('mockery'),
            suite;

        suite = new Y.Test.Suite("store-test suite");

        suite.add(new Y.Test.TestCase({
            name: "store-test",

            setUp: function () {
                // mockery.registerMock('./yui', mockYUIClass);
                // mockery.enable({
                //     warnOnReplace: false,
                //     warnOnUnregistered: false
                // });
            },

            tearDown: function () {
                // mockery.deregisterMock('./yui');
                // mockery.disable();
            },

            "test Y.Store namespace": function () {
                A.isNotUndefined(Y.Store);
            }

        }));

        Y.Test.TestRunner.add(suite);
    }
);
