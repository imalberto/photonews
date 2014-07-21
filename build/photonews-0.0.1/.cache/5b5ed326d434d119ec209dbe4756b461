YUI.add("photonews-template-main",function(Y, NAME){
   var fn = Y.Template.Handlebars.revive(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function";


  buffer += "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n    <meta charset=\"utf-8\" />\n\n    <title>PhotoNews web app showcasing \"modown\" libraries</title>\n    <meta name=\"description\" content=\"modown mojito\" />\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\" />\n    <meta name=\"apple-mobile-web-app-capable\" content=\"yes\" />\n\n\n    <script src=\"http://code.jquery.com/jquery-2.1.1.min.js\"></script>\n    <link rel=\"stylesheet\" href=\"/css/justifiedGallery.min.css\" />\n    <script src=\"/js/jquery.justifiedGallery.min.js\"></script>\n\n    <link rel=\"stylesheet\" href=\"http://yui.yahooapis.com/pure/0.3.0/pure-min.css\">\n    <link rel=\"stylesheet\" href=\"/css/style.css\">\n    <!-- TODO selectively include css assets based on route -->\n    <!-- <link rel=\"stylesheet\" href=\"http://purecss.io/combo/1.6.3?/css/layouts/blog.css\"> -->\n\n</head>\n<body>\n\n    <div id=\"pn-container\">\n\n        <!--\n        <div class=\"header\">\n            <div class=\"pure-menu pure-menu-open pure-menu-horizontal\">\n                <a class=\"pure-menu-heading\" href=\"/\">Photo Search</a>\n                <ul>\n                    <li><form action=\"/search/photos\" class=\"pure-form\"><input class=\"search-box\" type=\"text\" name=\"q\" placeholder=\"Search\"/></form></li>\n                    <li class=\"pure-menu-selected\"><a href=\"/news\">News</a></li>\n                    <li><a href=\"/photos\">Photos</a></li>\n                    <li><a href=\"/about\">About</a></li>\n                    <li><a href=\"/photos\">Photos</a></li>\n                    <li><a href=\"/about\">About</a></li>\n                </ul>\n            </div>\n        </div>\n        -->\n\n        <div id=\"pn-view-container\">\n            ";
  if (stack1 = helpers.viewOutlet) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.viewOutlet; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n        </div>\n\n    </div>\n\n    <script>";
  if (stack1 = helpers.state) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.state; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</script>\n    <script>\n        // TODO: use app.yui.import() or System.import()\n        app.yui.use('rehydrate-client', function (Y) {\n            Y.rehydrate({\n                container: '#pn-container',\n                viewContainer: '#pn-view-container'\n            });\n        });\n    </script>\n</body>\n</html>\n";
  return buffer;
  }),
       partials = {};

   Y.Array.each([], function (name) {
       var fn = Y.Template.get("photonews/" + name);
       if (fn) {
           partials[name] = fn;
       }
   });

   Y.Template.register("photonews/main", function (data, options) {
       options = options || {};
       options.partials = options.partials ? Y.merge(partials, options.partials) : partials;
       return fn(data, options);
   });
}, "", {requires: ["template-base","handlebars-base"]});