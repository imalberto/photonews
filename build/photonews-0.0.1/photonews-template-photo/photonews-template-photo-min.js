YUI.add("photonews-template-photo",function(e,t){var n=e.Template.Handlebars.revive(function(e,t,n,r,i){this.compilerInfo=[4,">= 1.0.0"],n=this.merge(n,e.helpers),i=i||{};var s="",o,u,a="function",f=this.escapeExpression;return s+='<div class="pure-g-r">\n  <a data-page="',(o=n.prev)?o=o.call(t,{hash:{},data:i}):(o=t.prev,o=typeof o===a?o.apply(t):o),s+=f(o)+'" href="/photo/',(o=n.prev)?o=o.call(t,{hash:{},data:i}):(o=t.prev,o=typeof o===a?o.apply(t):o),s+=f(o)+'" class="left-arrow">\n  </a>\n  <div class="photo-container">\n    <div class="photo-image">\n      <img src="'+f((o=(o=t.photo,o==null||o===!1?o:o.url),typeof o===a?o.apply(t):o))+'" />\n    </div>\n  </div>\n  <a data-page="',(u=n.next)?u=u.call(t,{hash:{},data:i}):(u=t.next,u=typeof u===a?u.apply(t):u),s+=f(u)+'" href="/photo/',(u=n.next)?u=u.call(t,{hash:{},data:i}):(u=t.next,u=typeof u===a?u.apply(t):u),s+=f(u)+'" class="right-arrow">\n  </a>\n</div>\n',s}),r={};e.Array.each([],function(t){var n=e.Template.get("photonews/"+t);n&&(r[t]=n)}),e.Template.register("photonews/photo",function(e){return n(e,{partials:r})})},"@VERSION@",{requires:["template-base","handlebars-base"]});
