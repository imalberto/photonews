YUI.add("resize-client",function(e){"use strict";function n(t,n){n-=t.length*5;var r=0,i,s;for(i=0;i<t.length;++i)s=e.one(t[i]),r+=s.getData("width")/s.getData("height");return n/r}function r(n,r){var i,s,o,u;t.push(r);for(i=0;i<n.length;++i)s=e.one(n[i]),u=r*s.getData("width")/s.getData("height"),s.setStyle("width",u),s.setStyle("height",o)}function i(t){var i=window.innerWidth-50,s=0,o=e.all("img"),u,a,f;e:while(o.length>0){for(u=1;u<o.length+1;++u){f=o.slice(0,u),a=n(f,i);if(a<t){r(f,a),s++,o=o.slice(u);continue e}}r(f,Math.min(t,a)),s++;break}console.log(s)}var t=[];e.resize=i},"@VERSION@",{affinity:"client",requires:["node"]});
