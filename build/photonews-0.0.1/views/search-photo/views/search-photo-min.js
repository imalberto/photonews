YUI.add("views/search-photo",function(e,t,n,r){"use strict";var i=n.pn.PN,s=n["photonews-template-search-photo"].Template,o=i.View.extend({photoTemplate:s.get("photonews/search-photo"),events:{".left-arrow":{click:"prev"},".right-arrow":{click:"next"}},render:function(){var e=this.get("container"),t=this.get("locals"),n;return n=this.photoTemplate({prev:t.prev,next:t.next,photo:t.photo,query:t.query}),e.setHTML(n),this},prev:function(e){var t=this.get("container"),n=t.one(".left-arrow").getData("page");e.preventDefault(),this.fire("photo:navigate",{photoId:n})},next:function(e){var t=this.get("container"),n=t.one(".right-arrow").getData("page");e.preventDefault(),this.fire("photo:navigate",{photoId:n})}});return r["default"]=o,r},"@VERSION@",{es:!0,requires:["pn","photonews-template-search-photo"]});