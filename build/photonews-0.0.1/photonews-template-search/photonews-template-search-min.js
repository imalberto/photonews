YUI.add("photonews-template-search",function(e,t){var n=e.Template.Handlebars.revive(function(e,t,n,r,i){function l(e,t){var r="",i;return r+='\n        <div class="pure-u-1-3 photo-box">\n        <a href="/search/photo/',(i=n.index)?i=i.call(e,{hash:{},data:t}):(i=e.index,i=typeof i===u?i.apply(e):i),r+=a(i)+"?q=",(i=n.query)?i=i.call(e,{hash:{},data:t}):(i=e.query,i=typeof i===u?i.apply(e):i),r+=a(i)+'">\n                <img src="',(i=n.url)?i=i.call(e,{hash:{},data:t}):(i=e.url,i=typeof i===u?i.apply(e):i),r+=a(i)+'"\n                     alt="',(i=n.title)?i=i.call(e,{hash:{},data:t}):(i=e.title,i=typeof i===u?i.apply(e):i),r+=a(i)+'">\n            </a>\n            <aside class="photo-box-caption">\n                <!--\n                ',(i=n.title)?i=i.call(e,{hash:{},data:t}):(i=e.title,i=typeof i===u?i.apply(e):i),r+=a(i)+'\n                <span>\n                    by <a href="',(i=n.url)?i=i.call(e,{hash:{},data:t}):(i=e.url,i=typeof i===u?i.apply(e):i),r+=a(i)+'">',(i=n.user)?i=i.call(e,{hash:{},data:t}):(i=e.user,i=typeof i===u?i.apply(e):i),r+=a(i)+'</a> / <a href="http://creativecommons.org/licenses/by-nc-sa/2.0/">cc</a>\n                </span>\n                -->\n            </aside>\n        </div>\n    ',r}this.compilerInfo=[4,">= 1.0.0"],n=this.merge(n,e.helpers),i=i||{};var s="",o,u="function",a=this.escapeExpression,f=this;s+='<div class="pure-g-r">\n    <!--\n    <div class="pure-u-2-3 text-box">\n        <div class="l-box">\n            <h1 class="text-box-head">The city is your museum.</h1>\n            <p class="text-box-subhead">Explore the public art that makes your neighborhood beautiful</p>\n            <p class="text-box-byline">Powered by Yahoo open source technology, and photos from the Flickr and Tumblr community.</p>\n            <p class="text-box-byline">Built by Yahoo engineers, for the community around us all.</p>\n        </div>\n    </div>\n    -->\n    ',o=n.each.call(t,t.items,{hash:{},inverse:f.noop,fn:f.program(1,l,i),data:i});if(o||o===0)s+=o;return s+="\n</div>\n",s}),r={};e.Array.each([],function(t){var n=e.Template.get("photonews/"+t);n&&(r[t]=n)}),e.Template.register("photonews/search",function(t,i){return i=i||{},i.partials=i.partials?e.merge(r,i.partials):r,n(t,i)})},"@VERSION@",{requires:["template-base","handlebars-base"]});
