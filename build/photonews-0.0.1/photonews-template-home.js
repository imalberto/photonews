YUI.add("photonews-template-home",function(Y, NAME){
   var fn = Y.Template.Handlebars.revive(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div class=\"pure-g-r\">\n	<div class=\"pure-u-1-5\">\n	</div>\n	<div class=\"pure-u-3-5\">\n		<h4>Landing Page</h4>\n		<div>\n    Use the links in the top menu to naviage between <a href=\"/news\">news</a> \n    and <a href=\"/photos\">photos</a>.\n		</div>\n	</div>\n	<div class=\"pure-u-1-5\">\n	</div>\n</div>\n";
  }),
       partials = {};

   Y.Array.each([], function (name) {
       var fn = Y.Template.get("photonews/" + name);
       if (fn) {
           partials[name] = fn;
       }
   });

   Y.Template.register("photonews/home", function (data, options) {
       options = options || {};
       options.partials = options.partials ? Y.merge(partials, options.partials) : partials;
       return fn(data, options);
   });
}, "", {requires: ["template-base","handlebars-base"]});