YUI.add("pn",function(e){"use strict";var t,n;e.PN={Controller:{extend:function(n,r,i){return e.Base.create("controller",e.BaseController||t,i||[],n||{},r||{})}},View:{extend:function(t,r,i){return e.Base.create("view",e.BaseView||n,i||[],t||{},r||{})}},Model:{extend:function(t,n,r){return e.Base.create("model",e.Model,r||[],t||{},n||{})}},ModelList:{extend:function(t,n,r){return e.Base.create("model",e.ModelList,r||[],t||{},n||{})}}},t=function(){},n=e.Base.create("view",e.BaseCore,[],{},{ATTRS:{locals:{},container:{valueFn:function(){var e=this;return{setHTML:function(t){e._set("output",t)}}}},output:{readOnly:!0}}})},"@VERSION@",{requires:["model","model-list","base-core","base-build"]});