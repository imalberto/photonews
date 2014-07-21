YUI.add("photonews-template-main",function(e,t){var n=e.Template.Handlebars.revive(function(e,t,n,r,i){this.compilerInfo=[4,">= 1.0.0"],n=this.merge(n,e.helpers),i=i||{};var s="",o,u="function";s+='<!DOCTYPE html>\n<html lang="en">\n<head>\n    <meta charset="utf-8" />\n\n    <title>PhotoNews web app showcasing "modown" libraries</title>\n    <meta name="description" content="modown mojito" />\n    <meta name="viewport" content="width=device-width, initial-scale=1.0" />\n    <meta name="apple-mobile-web-app-capable" content="yes" />\n\n\n    <script src="http://code.jquery.com/jquery-2.1.1.min.js"></script>\n    <link rel="stylesheet" href="/css/justifiedGallery.min.css" />\n    <script src="/js/jquery.justifiedGallery.min.js"></script>\n\n    <link rel="stylesheet" href="http://yui.yahooapis.com/pure/0.3.0/pure-min.css">\n    <link rel="stylesheet" href="/css/style.css">\n    <!-- TODO selectively include css assets based on route -->\n    <!-- <link rel="stylesheet" href="http://purecss.io/combo/1.6.3?/css/layouts/blog.css"> -->\n\n</head>\n<body>\n\n    <div id="pn-container">\n\n        <!--\n        <div class="header">\n            <div class="pure-menu pure-menu-open pure-menu-horizontal">\n                <a class="pure-menu-heading" href="/">Photo Search</a>\n                <ul>\n                    <li><form action="/search/photos" class="pure-form"><input class="search-box" type="text" name="q" placeholder="Search"/></form></li>\n                    <li class="pure-menu-selected"><a href="/news">News</a></li>\n                    <li><a href="/photos">Photos</a></li>\n                    <li><a href="/about">About</a></li>\n                    <li><a href="/photos">Photos</a></li>\n                    <li><a href="/about">About</a></li>\n                </ul>\n            </div>\n        </div>\n        -->\n\n        <div id="pn-view-container">\n            ',(o=n.viewOutlet)?o=o.call(t,{hash:{},data:i}):(o=t.viewOutlet,o=typeof o===u?o.apply(t):o);if(o||o===0)s+=o;s+="\n        </div>\n\n    </div>\n\n    <script>",(o=n.state)?o=o.call(t,{hash:{},data:i}):(o=t.state,o=typeof o===u?o.apply(t):o);if(o||o===0)s+=o;return s+="</script>\n    <script>\n        // TODO: use app.yui.import() or System.import()\n        app.yui.use('rehydrate-client', function (Y) {\n            Y.rehydrate({\n                container: '#pn-container',\n                viewContainer: '#pn-view-container'\n            });\n        });\n    </script>\n</body>\n</html>\n",s}),r={};e.Array.each([],function(t){var n=e.Template.get("photonews/"+t);n&&(r[t]=n)}),e.Template.register("photonews/main",function(t,i){return i=i||{},i.partials=i.partials?e.merge(r,i.partials):r,n(t,i)})},"@VERSION@",{requires:["template-base","handlebars-base"]});