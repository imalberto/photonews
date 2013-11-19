YUI.add("yuidoc-meta", function(Y) {
   Y.YUIDoc = { meta: {
    "classes": [],
    "modules": [
        "application",
        "registry",
        "renderer",
        "renderer-middleware",
        "router",
        "router-middleware",
        "store"
    ],
    "allModules": [
        {
            "displayName": "application",
            "name": "application"
        },
        {
            "displayName": "registry",
            "name": "registry"
        },
        {
            "displayName": "renderer",
            "name": "renderer"
        },
        {
            "displayName": "renderer-middleware",
            "name": "renderer-middleware"
        },
        {
            "displayName": "router",
            "name": "router",
            "description": "`router` plugin that extends `express` `app`.\n\nUsage:\n\n    var express = require('express'),\n        app = express(),\n        router = require('./lib/router');\n\n    router.extend(app);"
        },
        {
            "displayName": "router-middleware",
            "name": "router-middleware"
        },
        {
            "displayName": "store",
            "name": "store"
        }
    ]
} };
});