YUI.add("store",function(e){"use strict";function t(){}function n(t,n){["news","photos"].indexOf(t)!==-1?e.import(["models/"+t],function(e){n(null,new e["default"])}):n(new Error("Unkown model: "+t))}function r(t,n,r){["news","photos"].indexOf(t)!==-1?e.import(["models/"+t],function(e){r(null,new e["default"](n))}):r(new Error("Unkown model: "+t))}function i(e,t){this._data=e||{},this.container=t}t.prototype={toJSON:function(){return{}}},i.prototype={add:function(e,t){this._data[e]=t},find:function(i,s){var o=this._data,u=o[i];return new e.Promise(function(a,f){function l(e){e.load(s,function(t){if(t)return f(t);o[i]=e,a(e)})}u?e.Lang.isFunction(u.load)?l(u):r(i,u,function(e,n){if(e)return a(new t);l(n)}):n(i,function(e,n){if(e)return a(new t);l(n)})})},toJSON:function(){return this._data}},e.Store=i},"@VERSION@",{requires:["promise"]});