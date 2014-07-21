YUI.add('photonews-template-photo', function (Y, NAME){
   var fn = Y.Template.Handlebars.revive(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, stack2, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div class=\"pure-g-r\">\n  <a data-page=\"";
  if (stack1 = helpers.prev) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.prev; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" href=\"/photo/";
  if (stack1 = helpers.prev) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.prev; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" class=\"left-arrow\">\n  </a>\n  <div class=\"photo-container\">\n    <div class=\"photo-image\">\n      <img src=\""
    + escapeExpression(((stack1 = ((stack1 = depth0.photo),stack1 == null || stack1 === false ? stack1 : stack1.url)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" />\n    </div>\n  </div>\n  <a data-page=\"";
  if (stack2 = helpers.next) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
  else { stack2 = depth0.next; stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2; }
  buffer += escapeExpression(stack2)
    + "\" href=\"/photo/";
  if (stack2 = helpers.next) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
  else { stack2 = depth0.next; stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2; }
  buffer += escapeExpression(stack2)
    + "\" class=\"right-arrow\">\n  </a>\n</div>\n";
  return buffer;
  }),
       partials = {};

   Y.Array.each([], function (name) {
       var fn = Y.Template.get("photonews/" + name);
       if (fn) {
           partials[name] = fn;
       }
   });

   Y.Template.register("photonews/photo", function (data, options) {
       options = options || {};
       options.partials = options.partials ? Y.merge(partials, options.partials) : partials;
       return fn(data, options);
   });
}, '@VERSION@', {"requires": ["template-base", "handlebars-base"]});
