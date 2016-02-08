/*!
 * Bowl.js
 * Javascript module loader for browser - v1.1.0 (2016-02-08T16:42:21+0800)
 * http://jraiser.org/ | Released under MIT license
 */
!function(e,t){"use strict";function r(e,t){p.logs.push("["+e+"]"+t)}function n(e){for(var t in e)if(e.hasOwnProperty(t))return!1;return!0}function a(e,t){for(var r in t)t.hasOwnProperty(r)&&(e[r]=t[r]);return e}function i(e){return null==e?"":String(e).replace(/^\s+/,"").replace(/\s+$/,"")}function o(e){return g(e)?e:[e]}function u(e){return/^(?:[a-z]+:)?\/{2,}/i.test(e)}function s(e){var t=y.createElement("div");return t.innerHTML='<a href="'+e+'"></a>',e=t.firstChild.href,t=null,e}function d(e,t){return/^\//.test(e)?(t=h.appPath,e=e.substr(1)):/^\./.test(e)||(t=h.libPath),s(t+e)}function c(e,t){var r=e=i(e),n=!/^\./.test(e);if(n&&m[r])return m[r];var a="",o="";e=e.replace(/#(.*)$/,function(e,t){return i(t)&&(a=e),""}).replace(/\?(.*)$/,function(e,t){return i(t)&&(o=e),""}).replace(/([^\\\/]+)@([^\\\/]+)/g,function(e,t,r){return t+"/"+r+"/"+t}).split("/");var s,c=e.pop()||"index",l=c.lastIndexOf(".");-1!==l&&(s=c.substr(l+1),c=c.substr(0,l)),s=s||"js";var f=/-debug$/;"#nondebug"!==a&&h.debug&&!f.test(c)?c+="-debug":!h.debug&&f.test(c)&&(c=c.replace(f,"")),e.push(c+"."+s);var p=e.join("/")+o;u(p)||(p=d(p,t||""));var y=h.map;if(y)for(var v=0;v<y.length;v++)"function"==typeof y[v]?p=y[v](p):g(y[v])&&(p=p.replace(y[v][0],y[v][1]));return n&&(m[r]=p),p}function l(e){var t,r=/(?:^|[^.$])\brequire\s*\(\s*(["'])([^"'\s\)]+)\1\s*\)/g,n=[];for(e=e.replace(/^\s*\/\*[\s\S]*?\*\/\s*$/gm,"").replace(/^\s*\/\/.*$/gm,"");t=r.exec(e);)t[2]&&n.push(t[2]);return n}function f(e,t,n,a){this._factory=t,this._deps=n,this._dirname=a,r("module","create: "+(e||"")),e?this.setId(e):f.anonymous=this}if(!e.bowljs){var p=e.bowljs={version:"1.1.0",logs:[]},h={},y=e.document,v=e.attachEvent&&!(null!=e.opera&&"[object Opera]"===e.opera.toString()),g=Array.isArray||function(){var e=Object.prototype.toString;return function(t){return"[object Array]"===e.call(t)}}(),m={},b=function(){var e,t,n="onload"in y.createElement("script")?"onload":"onreadystatechange",a=y.head||y.getElementsByTagName("head")[0],i={},o=[];return{getCurrentScript:function(){if(e)return e;if(t&&"interactive"===t.readyState)return t;for(var r=0;r<o.length;r++)if("interactive"===o[r].readyState)return t=o[r]},load:function(u,s){var d=i[u];if(r("scriptLoader","load: "+u),r("scriptLoader","status: "+d),d)2===d&&s&&s();else{i[u]=1;var c=y.createElement("script");switch(typeof h.charset){case"function":c.charset=h.charset(u);break;case"string":c.charset=h.charset}c.async=!0,c.src=u,c[n]=c.onerror=function(){var e=c.readyState;if(!e||"loaded"===e||"complete"===e){i[u]=2,r("scriptLoader","onload: "+u),c[n]=c.onerror=null,a.removeChild(c);for(var d=o.length-1;d>=0;d--)if(o[d]===c){o.splice(d,1);break}c=t=null,s&&s()}},o.push(c),e=c,a.insertBefore(c,a.firstChild),e=null}}}}(),_=function(){var e={};return{add:function(t,n){r("dependentChain","add"),r("dependentChain","moduleId: "+t),r("dependentChain","depId: "+n);var a=e[n]=e[n]||[];a.push(t)},get:function(t){return e[t]},clear:function(t){r("dependentChain","remove"),r("dependentChain","depId: "+t),delete e[t]}}}(),x=function(){function e(){return a++,"#"+a+"#"}function n(){for(var e;(e=i[0])&&e.isReady();)i.shift(),delete f.all[e.id()],e.execute()}var a=0,i=[],o={init:function(){for(var e=this,t=h.preload.slice(),a=0,i=0,o=0;o<t.length;o++)t[o]&&(i++,b.load(c(t[o]),function(){a++,a>=i&&(r("taskManager","preload complete"),delete e._scripts,n())}));i&&(e._scripts=t)},id:function(){return"#preload#"},isReady:function(){return this._scripts===t},execute:function(){}};return{add:function(t){h.preload||(o=null),o&&(i.push(o),o.init(),o=null),i.push(t),t.setId(e())},tryExecute:n}}(),w=e.require=function(e,t){r("globalRequire",e),x.add(new f(null,t,o(e)))};w.resolve=function(e){return c(e)},a(f,{require:function(e){var t=f.all[e];if(t)return t.exports();throw new Error('module "'+e+'" does not exist')},isReady:function(e){var t=f.all[e];return t&&t.isReady()},load:function(e){f.all[e]||(r("Module","load: "+e),b.load(e,function(){if(!f.all[e]&&(!v&&f.anonymous&&f.anonymous.setId(e),!f.all[e]))throw new Error('module "'+e+'" lost')}))},all:{}}),a(f.prototype,{setId:function(e){var t=this;if(t._id)throw new Error("module id cannot be changed");if(r("module","setId: "+e),t._id=e,f.anonymous===t&&delete f.anonymous,!f.all[e]){f.all[e]=t,t._dirname=t._dirname||(t.isTask()?"":e.substr(0,e.lastIndexOf("/")+1));var a=t._deps;if(a){for(var i,o=t._readyStates={},u=0;u<a.length;u++)a[u]&&(t._deps[u]=i=c(a[u],t._dirname),f.isReady(i)||(_.add(e,i),o[i]=!0,r("module","notReady: "+i),f.load(i)));n(o)&&delete t._readyStates}t._checkReady()}},_checkReady:function(){var e=this.isReady(),t=this.id();if(r("module","id: "+t),r("module","checkReady: "+e),e)if(this.isTask())x.tryExecute();else{var n=_.get(t);if(n){for(var a,i=n.length-1;i>=0;i--)a=f.all[n[i]],a&&(a.notifyReady(t),r("module","notifyTo: "+n[i]));_.clear(t)}}},id:function(){return this._id},isTask:function(){return/^#\d+#$/.test(this._id)},isReady:function(){return this._readyStates===t},notifyReady:function(e){var t=this._readyStates;t&&(delete t[e],n(t)&&delete this._readyStates),this._checkReady()},execute:function(){r("module","execute: "+this.id());for(var e=this._deps,t=[],n=e.length-1;n>=0;n--)t[n]=f.all[e[n]].exports();this._factory&&this._factory.apply(window,t)},exports:function(){var e=this,t=e._executedModule;if(!t){if(t={id:e.id()},r("module","export: "+t.id),"function"==typeof e._factory){t.exports={};var n=function(t){return f.require(c(t,e._dirname))};n.async=function(t,n){r("asyncRequire",t),x.add(new f(null,n,o(t),e._dirname))},n.resolve=function(t){return c(t,e._dirname)};var a=e._factory.call(window,n,t.exports,t);a&&(t.exports=a)}else t.exports=e._factory;e._executedModule=t}return t.exports}}),e.define=function(){var e,t,n,a=arguments;switch(a.length){case 1:n=a[0],t=l(n.toString());break;case 2:t=a[0],n=a[1];break;case 3:e=c(a[0]),t=a[1],n=a[2]}if(!e&&v){var i=b.getCurrentScript();i&&(e=i.src)}r("globalDefine",e||""),new f(e,n,o(t))},e.define.amd={},p.config=function(t){var r=function(e){return u(e)||(e=s(e)),"/"!==e.charAt(e.length-1)&&(e+="/"),e};t.libPath&&(h.libPath=r(t.libPath)),t.appPath&&(h.appPath=r(t.appPath)),t.map&&(h.map=h.map.concat(t.map));var n=e.location.search;/[?|&]debug(&|$)/.test(n)?h.debug=!0:/[?|&]nondebug(&|$)/.test(n)?h.debug=!1:null!=t.debug&&(h.debug=!!t.debug),h.charset=t.charset,h.preload=t.preload},p.config({libPath:"./",appPath:"./",debug:!1})}}(window);