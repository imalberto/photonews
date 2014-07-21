YUI.add('photonews-template-photos', function (Y, NAME){
   var fn = Y.Template.Handlebars.revive(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n            <div>\n                <img src=\"";
  if (stack1 = helpers.url) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.url; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\"\n                     alt=\"";
  if (stack1 = helpers.title) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.title; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\"\n                     data-height=\"";
  if (stack1 = helpers['data-height']) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0['data-height']; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\"\n                     data-width=\"";
  if (stack1 = helpers['data-width']) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0['data-width']; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\"/>\n             </div>\n        ";
  return buffer;
  }

  buffer += "<div class=\"pure-g-r\">\n\n<!--\n        <div class=\"pure-u-1-3 photo-box\">\n            <a href=\"/photo/";
  if (stack1 = helpers.index) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.index; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\">\n                <img src=\"";
  if (stack1 = helpers.url) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.url; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\"\n                     alt=\"";
  if (stack1 = helpers.title) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.title; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\"\n                     data-height=\"";
  if (stack1 = helpers['data-height']) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0['data-height']; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\"\n                     data-width=\"";
  if (stack1 = helpers['data-width']) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0['data-width']; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\">\n            </a>\n        </div>\n-->\n\n    <div id=\"mygallery\">\n        ";
  stack1 = helpers.each.call(depth0, depth0.items, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    </div>\n\n\n    <script>\n      $('#mygallery').justifiedGallery({\n          rowHeight: 480, // default is 120\n          margins: 2, // default is 1\n          lastRow: 'hide', // default is nojustify\n          captions: false, // default is true\n          randomize: true, // default is false\n          cssAnimation: false, // default is false\n      });\n    </script>\n</div>\n";
  return buffer;
  }),
       partials = {};

   Y.Array.each([], function (name) {
       var fn = Y.Template.get("photonews/" + name);
       if (fn) {
           partials[name] = fn;
       }
   });

   Y.Template.register("photonews/photos", function (data, options) {
       options = options || {};
       options.partials = options.partials ? Y.merge(partials, options.partials) : partials;
       return fn(data, options);
   });
}, '@VERSION@', {"requires": ["template-base", "handlebars-base"]});
