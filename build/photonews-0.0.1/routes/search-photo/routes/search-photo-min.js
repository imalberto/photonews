YUI.add("routes/search-photo",function(e,t,n,r){"use strict";function i(e,t,n){var r=e.query&&e.query.q||"miami";e.store.find("photos",{query:r}).then(function(n){var i=parseInt(e.params.id,10)||0,s=n.item(i),o={query:r,photo:s.toJSON(),prev:i>0?i-1:i,next:i<n.size()?i+1:i,nextPhoto:n.item(n.indexOf(s)+1),prevPhoto:n.item(n.indexOf(s)-1)};t.render("search-photo",o)},n)}return r["default"]=i,r},"@VERSION@",{es:!0,requires:[]});
