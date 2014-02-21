/*jslint node:true*/
/*global describe, it*/

var assert = require('chai').assert,
    librouter = require('../lib/server/router');

describe('exports', function () {
    it('should export extend, dispatch and context', function () {
        assert.isFunction(librouter.extend, 'extend is not exported');
        assert.isFunction(librouter.dispatch, 'context is not exported');
        assert.isFunction(librouter.context, 'context is not exported');
    });
});

describe('test extend', function () {
    it('should augment app', function () {
        var app = {
                param: function () {},
                response: {
                    expose: function () {}
                }
            },
            ret;
        ret = librouter.extend(app, '@testing');

        assert.isDefined(ret, 'librouter.extend() should return app');
        assert.isDefined(app['@testing'], 'missing @testing brand');

    });
});

describe('Array', function () {
    describe('#indexOf()', function () {
        it('should return -1 when the value is not present', function () {
            assert.equal(-1, [1, 2, 3].indexOf(5));
            assert.equal(-1, [1, 2, 3].indexOf(0));
        });
    });
});

