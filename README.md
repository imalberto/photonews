
photonews-lib
=============

This is the micro library that is used by the
[photonews](http://github.com/imalberto/photonews) as shared infrastructure
that is build on top of [modown](https://npmjs.org/search?q=modown)
components.

## Instructions

From your application directory, edit your `package.json` with the following
`dependencies`:

    "photonews-lib": "git://github.com/imalberto/photonews-lib"

## Application Structure

```
lib/ (core module as part of the micro library)
tests/ (unit tests)
```

## API Docs

    npm run docs

The API docs will be generated under the directory `apidocs/`.

You can also browse the documentation
[here](http://rawgithub.com/imalberto/photonews-lib/master/apidocs/index.html).
