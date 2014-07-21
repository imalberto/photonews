YUI.add('photonews-template-about', function (Y, NAME){
   var fn = Y.Template.Handlebars.revive(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<h5>About PhotoNews</h5>\n";
  }),
       partials = {};

   Y.Array.each([], function (name) {
       var fn = Y.Template.get("photonews/" + name);
       if (fn) {
           partials[name] = fn;
       }
   });

   Y.Template.register("photonews/about", function (data) {
       return fn(data, {
           partials: partials
       });
   });
}, '@VERSION@', {"requires": ["template-base", "handlebars-base"]});
