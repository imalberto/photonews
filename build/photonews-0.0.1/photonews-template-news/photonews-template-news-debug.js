YUI.add('photonews-template-news', function (Y, NAME){
   var fn = Y.Template.Handlebars.revive(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, options, functionType="function", escapeExpression=this.escapeExpression, self=this, blockHelperMissing=helpers.blockHelperMissing;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n				<section class=\"post\">\n					<header class=\"post-header\">\n						<h4 class=\"post-title\">";
  if (stack1 = helpers.title) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.title; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</h4>\n						<p class=\"post-meta\">\n							Published on ";
  if (stack1 = helpers.publishedDate) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.publishedDate; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + ".\n						</p>\n					</header>\n					<div class=\"post-description\">\n						<p>\n							";
  if (stack1 = helpers.content) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.content; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n						</p>\n					</div>\n				</section>\n				";
  return buffer;
  }

  buffer += "<div class=\"pure-g-r\">\n	<div class=\"pure-u-1-5\">\n	</div>\n	<div class=\"pure-u-3-5\">\n		<div class=\"content\">\n			<div class=\"posts\">\n				<h1 class=\"content-subhead\">Latest Stories</h1>\n\n				<!-- A single blog post -->	\n				";
  options = {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data};
  if (stack1 = helpers.items) { stack1 = stack1.call(depth0, options); }
  else { stack1 = depth0.items; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  if (!helpers.items) { stack1 = blockHelperMissing.call(depth0, stack1, options); }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n			</div> <!-- <div class=\"posts\"> -->\n		</div>\n	</div>\n	<div class=\"pure-u-1-5\">\n	</div>\n</div>\n\n<p></p>\n<!-- TODO add some space here, and center the paginator -->\n<!--\n<div style=\"text-align: center;\">\n	<ul class=\"pure-paginator\">\n	    <li><a class=\"pure-button prev\" href=\"#\">&#171;</a></li>\n	    <li><a class=\"pure-button pure-button-active\" href=\"#\">1</a></li>\n	    <li><a class=\"pure-button\" href=\"#\">2</a></li>\n	    <li><a class=\"pure-button\" href=\"#\">3</a></li>\n	    <li><a class=\"pure-button\" href=\"#\">4</a></li>\n	    <li><a class=\"pure-button\" href=\"#\">5</a></li>\n	    <li><a class=\"pure-button next\" href=\"#\">&#187;</a></li>\n	</ul>\n</div>\n-->\n\n";
  return buffer;
  }),
       partials = {};

   Y.Array.each([], function (name) {
       var fn = Y.Template.get("photonews/" + name);
       if (fn) {
           partials[name] = fn;
       }
   });

   Y.Template.register("photonews/news", function (data, options) {
       options = options || {};
       options.partials = options.partials ? Y.merge(partials, options.partials) : partials;
       return fn(data, options);
   });
}, '@VERSION@', {"requires": ["template-base", "handlebars-base"]});
