YUI.add("routes/search-photos",function(e,t,n,r){"use strict";function i(e,t,n){var r=e.query&&e.query.q||"miami";e.store.find("photos",{query:r}).then(function(e){var n,i=e.toJSON();for(n=0;n<i.length;n++)i[n].query=r;t.render("search",{items:i})},n)}return r["default"]=i,r},"@VERSION@",{es:!0,requires:[]});