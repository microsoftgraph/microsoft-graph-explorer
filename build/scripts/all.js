/*! hellojs v1.14.0 | (c) 2012-2016 Andrew Dodson | MIT https://adodson.com/hello.js/LICENSE */
Object.create||(Object.create=function(){function e(){}return function(t){if(1!=arguments.length)throw new Error("Object.create implementation only accepts one parameter.");return e.prototype=t,new e}}()),Object.keys||(Object.keys=function(e,t,n){n=[];for(t in e)n.hasOwnProperty.call(e,t)&&n.push(t);return n}),Array.prototype.indexOf||(Array.prototype.indexOf=function(e){for(var t=0;t<this.length;t++)if(this[t]===e)return t;return-1}),Array.prototype.forEach||(Array.prototype.forEach=function(e){if(void 0===this||null===this)throw new TypeError;var t=Object(this),n=t.length>>>0;if("function"!=typeof e)throw new TypeError;for(var o=arguments.length>=2?arguments[1]:void 0,i=0;n>i;i++)i in t&&e.call(o,t[i],i,t);return this}),Array.prototype.filter||(Array.prototype.filter=function(e,t){var n=[];return this.forEach(function(o,i,r){e.call(t||void 0,o,i,r)&&n.push(o)}),n}),Array.prototype.map||(Array.prototype.map=function(e,t){var n=[];return this.forEach(function(o,i,r){n.push(e.call(t||void 0,o,i,r))}),n}),Array.isArray||(Array.isArray=function(e){return"[object Array]"===Object.prototype.toString.call(e)}),"object"!=typeof window||"object"!=typeof window.location||window.location.assign||(window.location.assign=function(e){window.location=e}),Function.prototype.bind||(Function.prototype.bind=function(e){function t(){}if("function"!=typeof this)throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");var n=[].slice,o=n.call(arguments,1),i=this,r=function(){return i.apply(this instanceof t?this:e||window,o.concat(n.call(arguments)))};return t.prototype=this.prototype,r.prototype=new t,r});var hello=function(e){return hello.use(e)};hello.utils={extend:function(e){return Array.prototype.slice.call(arguments,1).forEach(function(t){if(Array.isArray(e)&&Array.isArray(t))Array.prototype.push.apply(e,t);else if(e instanceof Object&&t instanceof Object&&e!==t)for(var n in t)e[n]=hello.utils.extend(e[n],t[n]);else Array.isArray(t)&&(t=t.slice(0)),e=t}),e}},hello.utils.extend(hello,{settings:{redirect_uri:window.location.href.split("#")[0],response_type:"token",display:"popup",state:"",oauth_proxy:"https://auth-server.herokuapp.com/proxy",timeout:2e4,popup:{resizable:1,scrollbars:1,width:500,height:550},scope:["basic"],scope_map:{basic:""},default_service:null,force:null,page_uri:window.location.href},services:{},use:function(e){var t=Object.create(this);return t.settings=Object.create(this.settings),e&&(t.settings.default_service=e),t.utils.Event.call(t),t},init:function(e,t){var n=this.utils;if(!e)return this.services;for(var o in e)e.hasOwnProperty(o)&&"object"!=typeof e[o]&&(e[o]={id:e[o]});return n.extend(this.services,e),t&&(n.extend(this.settings,t),"redirect_uri"in t&&(this.settings.redirect_uri=n.url(t.redirect_uri).href)),this},login:function(){function e(e,t){hello.emit(e,t)}function t(e){return e}function n(e){return!!e}var o,i=this,r=i.utils,a=r.error,s=r.Promise(),l=r.args({network:"s",options:"o",callback:"f"},arguments),u=r.diffKey(l.options,i.settings),c=l.options=r.merge(i.settings,l.options||{});if(c.popup=r.merge(i.settings.popup,l.options.popup||{}),l.network=l.network||i.settings.default_service,s.proxy.then(l.callback,l.callback),s.proxy.then(e.bind(this,"auth.login auth"),e.bind(this,"auth.failed auth")),"string"!=typeof l.network||!(l.network in i.services))return s.reject(a("invalid_network","The provided network was not recognized"));var d=i.services[l.network],f=r.globalEvent(function(e){var t;t=e?JSON.parse(e):a("cancelled","The authentication was not completed"),t.error?s.reject(t):(r.store(t.network,t),s.fulfill({network:t.network,authResponse:t}))}),p=r.url(c.redirect_uri).href,m=d.oauth.response_type||c.response_type;/\bcode\b/.test(m)&&!d.oauth.grant&&(m=m.replace(/\bcode\b/,"token")),l.qs=r.merge(u,{client_id:encodeURIComponent(d.id),response_type:encodeURIComponent(m),redirect_uri:encodeURIComponent(p),state:{client_id:d.id,network:l.network,display:c.display,callback:f,state:c.state,redirect_uri:p}});var h=r.store(l.network),g=/[,\s]+/,v=i.settings.scope?[i.settings.scope.toString()]:[],y=r.merge(i.settings.scope_map,d.scope||{});if(c.scope&&v.push(c.scope.toString()),h&&"scope"in h&&h.scope instanceof String&&v.push(h.scope),v=v.join(",").split(g),v=r.unique(v).filter(n),l.qs.state.scope=v.join(","),v=v.map(function(e){return e in y?y[e]:e}),v=v.join(",").split(g),v=r.unique(v).filter(n),l.qs.scope=v.join(d.scope_delim||","),c.force===!1&&h&&"access_token"in h&&h.access_token&&"expires"in h&&h.expires>(new Date).getTime()/1e3){var w=r.diff((h.scope||"").split(g),(l.qs.state.scope||"").split(g));if(0===w.length)return s.fulfill({unchanged:!0,network:l.network,authResponse:h}),s}if("page"===c.display&&c.page_uri&&(l.qs.state.page_uri=r.url(c.page_uri).href),"login"in d&&"function"==typeof d.login&&d.login(l),(!/\btoken\b/.test(m)||parseInt(d.oauth.version,10)<2||"none"===c.display&&d.oauth.grant&&h&&h.refresh_token)&&(l.qs.state.oauth=d.oauth,l.qs.state.oauth_proxy=c.oauth_proxy),l.qs.state=encodeURIComponent(JSON.stringify(l.qs.state)),1===parseInt(d.oauth.version,10)?o=r.qs(c.oauth_proxy,l.qs,t):"none"===c.display&&d.oauth.grant&&h&&h.refresh_token?(l.qs.refresh_token=h.refresh_token,o=r.qs(c.oauth_proxy,l.qs,t)):o=r.qs(d.oauth.auth,l.qs,t),e("auth.init",l),"none"===c.display)r.iframe(o,p);else if("popup"===c.display)var _=r.popup(o,p,c.popup),b=setInterval(function(){if((!_||_.closed)&&(clearInterval(b),!s.state)){var e=a("cancelled","Login has been cancelled");_||(e=a("blocked","Popup was blocked")),e.network=l.network,s.reject(e)}},100);else window.location=o;return s.proxy},logout:function(){function e(e,t){hello.emit(e,t)}var t=this,n=t.utils,o=n.error,i=n.Promise(),r=n.args({name:"s",options:"o",callback:"f"},arguments);if(r.options=r.options||{},i.proxy.then(r.callback,r.callback),i.proxy.then(e.bind(this,"auth.logout auth"),e.bind(this,"error")),r.name=r.name||this.settings.default_service,r.authResponse=n.store(r.name),!r.name||r.name in t.services)if(r.name&&r.authResponse){var a=function(e){n.store(r.name,null),i.fulfill(hello.utils.merge({network:r.name},e||{}))},s={};if(r.options.force){var l=t.services[r.name].logout;if(l)if("function"==typeof l&&(l=l(a,r)),"string"==typeof l)n.iframe(l),s.force=null,s.message="Logout success on providers site was indeterminate";else if(void 0===l)return i.proxy}a(s)}else i.reject(o("invalid_session","There was no session to remove"));else i.reject(o("invalid_network","The network was unrecognized"));return i.proxy},getAuthResponse:function(e){return e=e||this.settings.default_service,e&&e in this.services?this.utils.store(e)||null:null},events:{}}),hello.utils.extend(hello.utils,{error:function(e,t){return{error:{code:e,message:t}}},qs:function(e,t,n){if(t){n=n||encodeURIComponent;for(var o in t){var i="([\\?\\&])"+o+"=[^\\&]*",r=new RegExp(i);e.match(r)&&(e=e.replace(r,"$1"+o+"="+n(t[o])),delete t[o])}}return this.isEmpty(t)?e:e+(e.indexOf("?")>-1?"&":"?")+this.param(t,n)},param:function(e,t){var n,o,i={};if("string"==typeof e){if(t=t||decodeURIComponent,o=e.replace(/^[\#\?]/,"").match(/([^=\/\&]+)=([^\&]+)/g))for(var r=0;r<o.length;r++)n=o[r].match(/([^=]+)=(.*)/),i[n[1]]=t(n[2]);return i}t=t||encodeURIComponent;var a=e;i=[];for(var s in a)a.hasOwnProperty(s)&&a.hasOwnProperty(s)&&i.push([s,"?"===a[s]?"?":t(a[s])].join("="));return i.join("&")},store:function(){function e(){var e={};try{e=JSON.parse(n.getItem("hello"))||{}}catch(t){}return e}function t(e){n.setItem("hello",JSON.stringify(e))}for(var n,o=["localStorage","sessionStorage"],i=-1,r="test";o[++i];)try{n=window[o[i]],n.setItem(r+i,i),n.removeItem(r+i);break}catch(a){n=null}if(!n){var s=null;n={getItem:function(e){e+="=";for(var t=document.cookie.split(";"),n=0;n<t.length;n++){var o=t[n].replace(/(^\s+|\s+$)/,"");if(o&&0===o.indexOf(e))return o.substr(e.length)}return s},setItem:function(e,t){s=t,document.cookie=e+"="+t}},s=n.getItem("hello")}return function(n,o,i){var r=e();if(n&&void 0===o)return r[n]||null;if(n&&null===o)try{delete r[n]}catch(a){r[n]=null}else{if(!n)return r;r[n]=o}return t(r),r||null}}(),append:function(e,t,n){var o="string"==typeof e?document.createElement(e):e;if("object"==typeof t)if("tagName"in t)n=t;else for(var i in t)if(t.hasOwnProperty(i))if("object"==typeof t[i])for(var r in t[i])t[i].hasOwnProperty(r)&&(o[i][r]=t[i][r]);else"html"===i?o.innerHTML=t[i]:/^on/.test(i)?o[i]=t[i]:o.setAttribute(i,t[i]);return"body"===n?!function a(){document.body?document.body.appendChild(o):setTimeout(a,16)}():"object"==typeof n?n.appendChild(o):"string"==typeof n&&document.getElementsByTagName(n)[0].appendChild(o),o},iframe:function(e){this.append("iframe",{src:e,style:{position:"absolute",left:"-1000px",bottom:0,height:"1px",width:"1px"}},"body")},merge:function(){var e=Array.prototype.slice.call(arguments);return e.unshift({}),this.extend.apply(null,e)},args:function(e,t){var n={},o=0,i=null,r=null;for(r in e)if(e.hasOwnProperty(r))break;if(1===t.length&&"object"==typeof t[0]&&"o!"!=e[r])for(r in t[0])if(e.hasOwnProperty(r)&&r in e)return t[0];for(r in e)if(e.hasOwnProperty(r))if(i=typeof t[o],"function"==typeof e[r]&&e[r].test(t[o])||"string"==typeof e[r]&&(e[r].indexOf("s")>-1&&"string"===i||e[r].indexOf("o")>-1&&"object"===i||e[r].indexOf("i")>-1&&"number"===i||e[r].indexOf("a")>-1&&"object"===i||e[r].indexOf("f")>-1&&"function"===i))n[r]=t[o++];else if("string"==typeof e[r]&&e[r].indexOf("!")>-1)return!1;return n},url:function(e){if(e){if(window.URL&&URL instanceof Function&&0!==URL.length)return new URL(e,window.location);var t=document.createElement("a");return t.href=e,t.cloneNode(!1)}return window.location},diff:function(e,t){return t.filter(function(t){return-1===e.indexOf(t)})},diffKey:function(e,t){if(e||!t){var n={};for(var o in e)o in t||(n[o]=e[o]);return n}return e},unique:function(e){return Array.isArray(e)?e.filter(function(t,n){return e.indexOf(t)===n}):[]},isEmpty:function(e){if(!e)return!0;if(Array.isArray(e))return!e.length;if("object"==typeof e)for(var t in e)if(e.hasOwnProperty(t))return!1;return!0},Promise:function(){var e=0,t=1,n=2,o=function(t){return this instanceof o?(this.id="Thenable/1.0.6",this.state=e,this.fulfillValue=void 0,this.rejectReason=void 0,this.onFulfilled=[],this.onRejected=[],this.proxy={then:this.then.bind(this)},void("function"==typeof t&&t.call(this,this.fulfill.bind(this),this.reject.bind(this)))):new o(t)};o.prototype={fulfill:function(e){return i(this,t,"fulfillValue",e)},reject:function(e){return i(this,n,"rejectReason",e)},then:function(e,t){var n=this,i=new o;return n.onFulfilled.push(s(e,i,"fulfill")),n.onRejected.push(s(t,i,"reject")),r(n),i.proxy}};var i=function(t,n,o,i){return t.state===e&&(t.state=n,t[o]=i,r(t)),t},r=function(e){e.state===t?a(e,"onFulfilled",e.fulfillValue):e.state===n&&a(e,"onRejected",e.rejectReason)},a=function(e,t,n){if(0!==e[t].length){var o=e[t];e[t]=[];var i=function(){for(var e=0;e<o.length;e++)o[e](n)};"object"==typeof process&&"function"==typeof process.nextTick?process.nextTick(i):"function"==typeof setImmediate?setImmediate(i):setTimeout(i,0)}},s=function(e,t,n){return function(o){if("function"!=typeof e)t[n].call(t,o);else{var i;try{i=e(o)}catch(r){return void t.reject(r)}l(t,i)}}},l=function(e,t){if(e===t||e.proxy===t)return void e.reject(new TypeError("cannot resolve promise with itself"));var n;if("object"==typeof t&&null!==t||"function"==typeof t)try{n=t.then}catch(o){return void e.reject(o)}if("function"!=typeof n)e.fulfill(t);else{var i=!1;try{n.call(t,function(n){i||(i=!0,n===t?e.reject(new TypeError("circular thenable chain")):l(e,n))},function(t){i||(i=!0,e.reject(t))})}catch(o){i||e.reject(o)}}};return o}(),Event:function(){var e=/[\s\,]+/;return this.parent={events:this.events,findEvents:this.findEvents,parent:this.parent,utils:this.utils},this.events={},this.on=function(t,n){if(n&&"function"==typeof n)for(var o=t.split(e),i=0;i<o.length;i++)this.events[o[i]]=[n].concat(this.events[o[i]]||[]);return this},this.off=function(e,t){return this.findEvents(e,function(e,n){t&&this.events[e][n]!==t||(this.events[e][n]=null)}),this},this.emit=function(e){var t=Array.prototype.slice.call(arguments,1);t.push(e);for(var n=function(n,o){t[t.length-1]="*"===n?e:n,this.events[n][o].apply(this,t)},o=this;o&&o.findEvents;)o.findEvents(e+",*",n),o=o.parent;return this},this.emitAfter=function(){var e=this,t=arguments;return setTimeout(function(){e.emit.apply(e,t)},0),this},this.findEvents=function(t,n){var o=t.split(e);for(var i in this.events)if(this.events.hasOwnProperty(i)&&o.indexOf(i)>-1)for(var r=0;r<this.events[i].length;r++)this.events[i][r]&&n.call(this,i,r)},this},globalEvent:function(e,t){return t=t||"_hellojs_"+parseInt(1e12*Math.random(),10).toString(36),window[t]=function(){try{e.apply(this,arguments)&&delete window[t]}catch(n){console.error(n)}},t},popup:function(e,t,n){var o=document.documentElement;if(n.height){var i=void 0!==window.screenTop?window.screenTop:screen.top,r=screen.height||window.innerHeight||o.clientHeight;n.top=parseInt((r-n.height)/2,10)+i}if(n.width){var a=void 0!==window.screenLeft?window.screenLeft:screen.left,s=screen.width||window.innerWidth||o.clientWidth;n.left=parseInt((s-n.width)/2,10)+a}var l=[];Object.keys(n).forEach(function(e){var t=n[e];l.push(e+(null!==t?"="+t:""))}),-1!==navigator.userAgent.indexOf("Safari")&&-1===navigator.userAgent.indexOf("Chrome")&&(e=t+"#oauth_redirect="+encodeURIComponent(encodeURIComponent(e)));var u=window.open(e,"_blank",l.join(","));return u&&u.focus&&u.focus(),u},responseHandler:function(e,t){function n(e,t,n){var r=e.callback,s=e.network;if(a.store(s,e),!("display"in e&&"page"===e.display)){if(n&&r&&r in n){try{delete e.callback}catch(l){}a.store(s,e);var u=JSON.stringify(e);try{o(n,r)(u)}catch(l){}}i()}}function o(e,t){return 0!==t.indexOf("_hellojs_")?function(){throw"Could not execute callback "+t}:e[t]}function i(){if(e.frameElement)t.document.body.removeChild(e.frameElement);else{try{e.close()}catch(n){}e.addEventListener&&e.addEventListener("load",function(){e.close()})}}var r,a=this,s=e.location;if(r=a.param(s.search),r&&r.state&&(r.code||r.oauth_token)){var l=JSON.parse(r.state);r.redirect_uri=l.redirect_uri||s.href.replace(/[\?\#].*$/,"");var u=l.oauth_proxy+"?"+a.param(r);return void s.assign(u)}if(r=a.merge(a.param(s.search||""),a.param(s.hash||"")),r&&"state"in r){try{var c=JSON.parse(r.state);a.extend(r,c)}catch(d){console.error("Could not decode state parameter")}if("access_token"in r&&r.access_token&&r.network)r.expires_in&&0!==parseInt(r.expires_in,10)||(r.expires_in=0),r.expires_in=parseInt(r.expires_in,10),r.expires=(new Date).getTime()/1e3+(r.expires_in||31536e3),n(r,e,t);else if("error"in r&&r.error&&r.network)r.error={code:r.error,message:r.error_message||r.error_description},n(r,e,t);else if(r.callback&&r.callback in t){var f="result"in r&&r.result?JSON.parse(r.result):!1;o(t,r.callback)(f),i()}r.page_uri&&s.assign(r.page_uri)}else if("oauth_redirect"in r)return void s.assign(decodeURIComponent(r.oauth_redirect))}}),hello.utils.Event.call(hello),function(e){var t={},n={};e.on("auth.login, auth.logout",function(n){n&&"object"==typeof n&&n.network&&(t[n.network]=e.utils.store(n.network)||{})}),function o(){var i=(new Date).getTime()/1e3,r=function(t){e.emit("auth."+t,{network:a,authResponse:s})};for(var a in e.services)if(e.services.hasOwnProperty(a)){if(!e.services[a].id)continue;var s=e.utils.store(a)||{},l=e.services[a],u=t[a]||{};if(s&&"callback"in s){var c=s.callback;try{delete s.callback}catch(d){}e.utils.store(a,s);try{window[c](s)}catch(d){}}if(s&&"expires"in s&&s.expires<i){var f=l.refresh||s.refresh_token;!f||a in n&&!(n[a]<i)?f||a in n||(r("expired"),n[a]=!0):(e.emit("notice",a+" has expired trying to resignin"),e.login(a,{display:"none",force:!1}),n[a]=i+600);continue}if(u.access_token===s.access_token&&u.expires===s.expires)continue;!s.access_token&&u.access_token?r("logout"):s.access_token&&!u.access_token?r("login"):s.expires!==u.expires&&r("update"),t[a]=s,a in n&&delete n[a]}setTimeout(o,1e3)}()}(hello),hello.api=function(){function e(e){e=e.replace(/\@\{([a-z\_\-]+)(\|.*?)?\}/gi,function(e,t,n){var a=n?n.replace(/^\|/,""):"";return t in r.query?(a=r.query[t],delete r.query[t]):r.data&&t in r.data?(a=r.data[t],delete r.data[t]):n||i.reject(o("missing_attribute","The attribute "+t+" is missing from the request")),a}),e.match(/^https?:\/\//)||(e=u.base+e),r.url=e,n.request(r,function(e,t){if(!r.formatResponse)return void(("object"==typeof t?t.statusCode>=400:"object"==typeof e&&"error"in e)?i.reject(e):i.fulfill(e));if(e===!0?e={success:!0}:e||(e={}),"delete"===r.method&&(e=!e||n.isEmpty(e)?{success:!0}:e),u.wrap&&(r.path in u.wrap||"default"in u.wrap)){var o=r.path in u.wrap?r.path:"default",a=((new Date).getTime(),u.wrap[o](e,t,r));a&&(e=a)}e&&"paging"in e&&e.paging.next&&("?"===e.paging.next[0]?e.paging.next=r.path+e.paging.next:e.paging.next+="#"+r.path),!e||"error"in e?i.reject(e):i.fulfill(e)})}var t=this,n=t.utils,o=n.error,i=n.Promise(),r=n.args({path:"s!",query:"o",method:"s",data:"o",timeout:"i",callback:"f"},arguments);r.method=(r.method||"get").toLowerCase(),r.headers=r.headers||{},r.query=r.query||{},"get"!==r.method&&"delete"!==r.method||(n.extend(r.query,r.data),r.data={});var a=r.data=r.data||{};if(i.then(r.callback,r.callback),!r.path)return i.reject(o("invalid_path","Missing the path parameter from the request"));r.path=r.path.replace(/^\/+/,"");var s=(r.path.split(/[\/\:]/,2)||[])[0].toLowerCase();if(s in t.services){r.network=s;var l=new RegExp("^"+s+":?/?");r.path=r.path.replace(l,"")}r.network=t.settings.default_service=r.network||t.settings.default_service;var u=t.services[r.network];if(!u)return i.reject(o("invalid_network","Could not match the service requested: "+r.network));if(r.method in u&&r.path in u[r.method]&&u[r.method][r.path]===!1)return i.reject(o("invalid_path","The provided path is not available on the selected network"));r.oauth_proxy||(r.oauth_proxy=t.settings.oauth_proxy),"proxy"in r||(r.proxy=r.oauth_proxy&&u.oauth&&1===parseInt(u.oauth.version,10)),"timeout"in r||(r.timeout=t.settings.timeout),"formatResponse"in r||(r.formatResponse=!0),r.authResponse=t.getAuthResponse(r.network),r.authResponse&&r.authResponse.access_token&&(r.query.access_token=r.authResponse.access_token);var c,d=r.path;r.options=n.clone(r.query),r.data=n.clone(a);var f=u[{"delete":"del"}[r.method]||r.method]||{};if("get"===r.method){var p=d.split(/[\?#]/)[1];p&&(n.extend(r.query,n.param(p)),d=d.replace(/\?.*?(#|$)/,"$1"))}return(c=d.match(/#(.+)/,""))?(d=d.split("#")[0],r.path=c[1]):d in f?(r.path=d,d=f[d]):"default"in f&&(d=f["default"]),r.redirect_uri=t.settings.redirect_uri,r.xhr=u.xhr,r.jsonp=u.jsonp,r.form=u.form,"function"==typeof d?d(r,e):e(d),i.proxy},hello.utils.extend(hello.utils,{request:function(e,t){function n(e,t){var n;e.authResponse&&e.authResponse.oauth&&1===parseInt(e.authResponse.oauth.version,10)&&(n=e.query.access_token,delete e.query.access_token,e.proxy=!0),!e.data||"get"!==e.method&&"delete"!==e.method||(o.extend(e.query,e.data),e.data=null);var i=o.qs(e.url,e.query);e.proxy&&(i=o.qs(e.oauth_proxy,{path:i,access_token:n||"",then:e.proxy_response_type||("get"===e.method.toLowerCase()?"redirect":"proxy"),method:e.method.toLowerCase(),suppress_response_codes:!0})),t(i)}var o=this,i=o.error;o.isEmpty(e.data)||"FileList"in window||!o.hasBinary(e.data)||(e.xhr=!1,e.jsonp=!1);var r=this.request_cors(function(){return void 0===e.xhr||e.xhr&&("function"!=typeof e.xhr||e.xhr(e,e.query))});if(r)return void n(e,function(n){var i=o.xhr(e.method,n,e.headers,e.data,t);i.onprogress=e.onprogress||null,i.upload&&e.onuploadprogress&&(i.upload.onprogress=e.onuploadprogress)});var a=e.query;if(e.query=o.clone(e.query),e.callbackID=o.globalEvent(),e.jsonp!==!1){if(e.query.callback=e.callbackID,"function"==typeof e.jsonp&&e.jsonp(e,e.query),"get"===e.method)return void n(e,function(n){o.jsonp(n,t,e.callbackID,e.timeout)});e.query=a}if(e.form!==!1){e.query.redirect_uri=e.redirect_uri,e.query.state=JSON.stringify({callback:e.callbackID});var s;if("function"==typeof e.form&&(s=e.form(e,e.query)),"post"===e.method&&s!==!1)return void n(e,function(n){o.post(n,e.data,s,t,e.callbackID,e.timeout)})}t(i("invalid_request","There was no mechanism for handling this request"))},request_cors:function(e){return"withCredentials"in new XMLHttpRequest&&e()},domInstance:function(e,t){var n="HTML"+(e||"").replace(/^[a-z]/,function(e){return e.toUpperCase()})+"Element";return t?window[n]?t instanceof window[n]:window.Element?t instanceof window.Element&&(!e||t.tagName&&t.tagName.toLowerCase()===e):!(t instanceof Object||t instanceof Array||t instanceof String||t instanceof Number)&&t.tagName&&t.tagName.toLowerCase()===e:!1},clone:function(e){if(null===e||"object"!=typeof e||e instanceof Date||"nodeName"in e||this.isBinary(e)||"function"==typeof FormData&&e instanceof FormData)return e;if(Array.isArray(e))return e.map(this.clone.bind(this));var t={};for(var n in e)t[n]=this.clone(e[n]);return t},xhr:function(e,t,n,o,i){function r(e){for(var t,n={},o=/([a-z\-]+):\s?(.*);?/gi;t=o.exec(e);)n[t[1]]=t[2];return n}var a=new XMLHttpRequest,s=this.error,l=!1;"blob"===e&&(l=e,e="GET"),e=e.toUpperCase(),a.onload=function(t){var n=a.response;try{n=JSON.parse(a.responseText)}catch(o){401===a.status&&(n=s("access_denied",a.statusText))}var l=r(a.getAllResponseHeaders());l.statusCode=a.status,i(n||("GET"===e?s("empty_response","Could not get resource"):{}),l)},a.onerror=function(e){var t=a.responseText;try{t=JSON.parse(a.responseText)}catch(n){}i(t||s("access_denied","Could not get resource"))};var u;if("GET"===e||"DELETE"===e)o=null;else if(o&&"string"!=typeof o&&!(o instanceof FormData)&&!(o instanceof File)&&!(o instanceof Blob)){var c=new FormData;for(u in o)o.hasOwnProperty(u)&&(o[u]instanceof HTMLInputElement?"files"in o[u]&&o[u].files.length>0&&c.append(u,o[u].files[0]):o[u]instanceof Blob?c.append(u,o[u],o.name):c.append(u,o[u]));o=c}if(a.open(e,t,!0),l&&("responseType"in a?a.responseType=l:a.overrideMimeType("text/plain; charset=x-user-defined")),n)for(u in n)a.setRequestHeader(u,n[u]);return a.send(o),a},jsonp:function(e,t,n,o){var i,r=this,a=r.error,s=0,l=document.getElementsByTagName("head")[0],u=a("server_error","server_error"),c=function(){s++||window.setTimeout(function(){t(u),l.removeChild(d)},0)};n=r.globalEvent(function(e){return u=e,!0},n),e=e.replace(new RegExp("=\\?(&|$)"),"="+n+"$1");var d=r.append("script",{id:n,name:n,src:e,async:!0,onload:c,onerror:c,onreadystatechange:function(){/loaded|complete/i.test(this.readyState)&&c()}});window.navigator.userAgent.toLowerCase().indexOf("opera")>-1&&(i=r.append("script",{text:"document.getElementById('"+n+"').onerror();"}),d.async=!1),o&&window.setTimeout(function(){u=a("timeout","timeout"),c()},o),l.appendChild(d),i&&l.appendChild(i)},post:function(e,t,n,o,i,r){var a,s=this,l=s.error,u=document,c=null,d=[],f=0,p=null,m=0,h=function(e){m++||o(e)};s.globalEvent(h,i);var g;try{g=u.createElement('<iframe name="'+i+'">')}catch(v){g=u.createElement("iframe")}if(g.name=i,g.id=i,g.style.display="none",n&&n.callbackonload&&(g.onload=function(){h({response:"posted",message:"Content was posted"})}),r&&setTimeout(function(){h(l("timeout","The post operation timed out"))},r),u.body.appendChild(g),s.domInstance("form",t)){for(c=t.form,f=0;f<c.elements.length;f++)c.elements[f]!==t&&c.elements[f].setAttribute("disabled",!0);t=c}if(s.domInstance("form",t))for(c=t,f=0;f<c.elements.length;f++)c.elements[f].disabled||"file"!==c.elements[f].type||(c.encoding=c.enctype="multipart/form-data",c.elements[f].setAttribute("name","file"));else{for(p in t)t.hasOwnProperty(p)&&s.domInstance("input",t[p])&&"file"===t[p].type&&(c=t[p].form,c.encoding=c.enctype="multipart/form-data");c||(c=u.createElement("form"),u.body.appendChild(c),a=c);var y;for(p in t)if(t.hasOwnProperty(p)){var w=s.domInstance("input",t[p])||s.domInstance("textArea",t[p])||s.domInstance("select",t[p]);if(w&&t[p].form===c)w&&t[p].name!==p&&(t[p].setAttribute("name",p),t[p].name=p);else{var _=c.elements[p];if(y)for(_ instanceof NodeList||(_=[_]),f=0;f<_.length;f++)_[f].parentNode.removeChild(_[f]);y=u.createElement("input"),y.setAttribute("type","hidden"),y.setAttribute("name",p),w?y.value=t[p].value:s.domInstance(null,t[p])?y.value=t[p].innerHTML||t[p].innerText:y.value=t[p],c.appendChild(y)}}for(f=0;f<c.elements.length;f++)y=c.elements[f],y.name in t||y.getAttribute("disabled")===!0||(y.setAttribute("disabled",!0),d.push(y))}c.setAttribute("method","POST"),c.setAttribute("target",i),c.target=i,c.setAttribute("action",e),setTimeout(function(){c.submit(),setTimeout(function(){try{a&&a.parentNode.removeChild(a)}catch(e){try{console.error("HelloJS: could not remove iframe")}catch(t){}}for(var n=0;n<d.length;n++)d[n]&&(d[n].setAttribute("disabled",!1),d[n].disabled=!1)},0)},100)},hasBinary:function(e){for(var t in e)if(e.hasOwnProperty(t)&&this.isBinary(e[t]))return!0;return!1},isBinary:function(e){return e instanceof Object&&(this.domInstance("input",e)&&"file"===e.type||"FileList"in window&&e instanceof window.FileList||"File"in window&&e instanceof window.File||"Blob"in window&&e instanceof window.Blob)},toBlob:function(e){var t=/^data\:([^;,]+(\;charset=[^;,]+)?)(\;base64)?,/i,n=e.match(t);if(!n)return e;for(var o=atob(e.replace(t,"")),i=[],r=0;r<o.length;r++)i.push(o.charCodeAt(r));return new Blob([new Uint8Array(i)],{type:n[1]})}}),function(e){var t=e.api,n=e.utils;n.extend(n,{dataToJSON:function(e){var t=this,n=window,o=e.data;if(t.domInstance("form",o)?o=t.nodeListToJSON(o.elements):"NodeList"in n&&o instanceof NodeList?o=t.nodeListToJSON(o):t.domInstance("input",o)&&(o=t.nodeListToJSON([o])),("File"in n&&o instanceof n.File||"Blob"in n&&o instanceof n.Blob||"FileList"in n&&o instanceof n.FileList)&&(o={file:o}),!("FormData"in n&&o instanceof n.FormData))for(var i in o)if(o.hasOwnProperty(i))if("FileList"in n&&o[i]instanceof n.FileList)1===o[i].length&&(o[i]=o[i][0]);else{if(t.domInstance("input",o[i])&&"file"===o[i].type)continue;t.domInstance("input",o[i])||t.domInstance("select",o[i])||t.domInstance("textArea",o[i])?o[i]=o[i].value:t.domInstance(null,o[i])&&(o[i]=o[i].innerHTML||o[i].innerText)}return e.data=o,o},nodeListToJSON:function(e){for(var t={},n=0;n<e.length;n++){var o=e[n];!o.disabled&&o.name&&("file"===o.type?t[o.name]=o:t[o.name]=o.value||o.innerHTML)}return t}}),e.api=function(){var e=n.args({path:"s!",method:"s",data:"o",timeout:"i",callback:"f"},arguments);return e.data&&n.dataToJSON(e),t.call(this,e)}}(hello),hello.utils.responseHandler(window,window.opener||window.parent),"object"==typeof chrome&&"object"==typeof chrome.identity&&chrome.identity.launchWebAuthFlow&&!function(){function e(t,n){var o={closed:!1};return chrome.identity.launchWebAuthFlow({url:t,interactive:n},function(t){if(void 0===t)return void(o.closed=!0);var n=hello.utils.url(t),i={location:{assign:function(t){e(t,!1)},search:n.search,hash:n.hash,href:n.href},close:function(){}};hello.utils.responseHandler(i,window)}),o}hello.utils.popup=function(t){return e(t,!0)},hello.utils.iframe=function(t){e(t,!1)},hello.utils.request_cors=function(e){return e(),!0};var t={};chrome.storage.local.get("hello",function(e){t=e.hello||{}}),hello.utils.store=function(e,n){return 0===arguments.length?t:1===arguments.length?t[e]||null:n?(t[e]=n,chrome.storage.local.set({hello:t}),n):null===n?(delete t[e],chrome.storage.local.set({hello:t}),null):void 0}}(),function(){if(/^file:\/{3}[^\/]/.test(window.location.href)&&window.cordova){hello.utils.iframe=function(e,t){hello.utils.popup(e,t,{hidden:"yes"})};var e=hello.utils.popup;hello.utils.popup=function(t,n,o){var i=e.call(this,t,n,o);try{if(i&&i.addEventListener){var r=hello.utils.url(n),a=r.origin||r.protocol+"//"+r.hostname;i.addEventListener("loadstart",function(e){var t=e.url;if(0===t.indexOf(a)){var n=hello.utils.url(t),o={location:{assign:function(e){i.executeScript({code:'window.location.href = "'+e+';"'})},search:n.search,hash:n.hash,href:n.href},close:function(){if(i.close){i.close();try{i.closed=!0}catch(e){}}}};hello.utils.responseHandler(o,window)}})}}catch(s){}return i}}}(),function(e){function t(e){e&&"error"in e&&(e.error={code:"server_error",message:e.error.message||e.error})}function n(t,n,o){if(!("object"!=typeof t||"undefined"!=typeof Blob&&t instanceof Blob||"undefined"!=typeof ArrayBuffer&&t instanceof ArrayBuffer||"error"in t)){var i=("app_folder"!==t.root?t.root:"")+t.path.replace(/\&/g,"%26");i=i.replace(/^\//,""),t.thumb_exists&&(t.thumbnail=o.oauth_proxy+"?path="+encodeURIComponent("https://api-content.dropbox.com/1/thumbnails/auto/"+i+"?format=jpeg&size=m")+"&access_token="+o.options.access_token),t.type=t.is_dir?"folder":t.mime_type,t.name=t.path.replace(/.*\//g,""),t.is_dir?t.files=i.replace(/^\//,""):(t.downloadLink=e.settings.oauth_proxy+"?path="+encodeURIComponent("https://api-content.dropbox.com/1/files/auto/"+i)+"&access_token="+o.options.access_token,t.file="https://api-content.dropbox.com/1/files/auto/"+i),t.id||(t.id=t.path.replace(/^\//,""))}}function o(e){return function(t,n){delete t.query.limit,n(e)}}var i={version:"1.0",auth:"https://www.dropbox.com/1/oauth/authorize",request:"https://api.dropbox.com/1/oauth/request_token",token:"https://api.dropbox.com/1/oauth/access_token"},r={version:2,auth:"https://www.dropbox.com/1/oauth2/authorize",grant:"https://api.dropbox.com/1/oauth2/token"};e.init({dropbox:{name:"Dropbox",oauth:r,login:function(t){t.qs.scope="";var n=decodeURIComponent(t.qs.redirect_uri);0===n.indexOf("http:")&&0!==n.indexOf("http://localhost/")?e.services.dropbox.oauth=i:e.services.dropbox.oauth=r,t.options.popup.width=1e3,t.options.popup.height=1e3},base:"https://api.dropbox.com/1/",root:"sandbox",get:{me:"account/info","me/files":o("metadata/auto/@{parent|}"),"me/folder":o("metadata/auto/@{id}"),"me/folders":o("metadata/auto/"),"default":function(e,t){e.path.match("https://api-content.dropbox.com/1/files/")&&(e.method="blob"),t(e.path)}},post:{"me/files":function(t,n){var o=t.data.parent,i=t.data.name;t.data={file:t.data.file},"string"==typeof t.data.file&&(t.data.file=e.utils.toBlob(t.data.file)),n("https://api-content.dropbox.com/1/files_put/auto/"+o+"/"+i)},"me/folders":function(t,n){var o=t.data.name;t.data={},n("fileops/create_folder?root=@{root|sandbox}&"+e.utils.param({path:o}))}},del:{"me/files":"fileops/delete?root=@{root|sandbox}&path=@{id}","me/folder":"fileops/delete?root=@{root|sandbox}&path=@{id}"},wrap:{me:function(e){if(t(e),!e.uid)return e;e.name=e.display_name;var n=e.name.split(" ");return e.first_name=n.shift(),e.last_name=n.join(" "),e.id=e.uid,delete e.uid,delete e.display_name,e},"default":function(e,o,i){return t(e),e.is_dir&&e.contents&&(e.data=e.contents,delete e.contents,e.data.forEach(function(t){t.root=e.root,n(t,o,i)})),n(e,o,i),e.is_deleted&&(e.success=!0),e}},xhr:function(e){if(e.data&&e.data.file){var t=e.data.file;t&&(t.files?e.data=t.files[0]:e.data=t)}return"delete"===e.method&&(e.method="post"),!0},form:function(e,t){delete t.state,delete t.redirect_uri}}})}(hello),function(e){function t(e){return e.id&&(e.thumbnail=e.picture="https://graph.facebook.com/"+e.id+"/picture"),e}function n(e){return"data"in e&&e.data.forEach(t),e}function o(e,t,n){if("boolean"==typeof e&&(e={success:e}),e&&"data"in e){var o=n.query.access_token;if(!(e.data instanceof Array)){var r=e.data;delete e.data,e.data=[r]}e.data.forEach(function(e){e.picture&&(e.thumbnail=e.picture),e.pictures=(e.images||[]).sort(function(e,t){return e.width-t.width}),e.cover_photo&&e.cover_photo.id&&(e.thumbnail=i+e.cover_photo.id+"/picture?access_token="+o),"album"===e.type&&(e.files=e.photos=i+e.id+"/photos"),e.can_upload&&(e.upload_location=i+e.id+"/photos")})}return e}e.init({facebook:{name:"Facebook",oauth:{version:2,auth:"https://www.facebook.com/dialog/oauth/",grant:"https://graph.facebook.com/oauth/access_token"},scope:{basic:"public_profile",email:"email",
share:"user_posts",birthday:"user_birthday",events:"user_events",photos:"user_photos",videos:"user_videos",friends:"user_friends",files:"user_photos,user_videos",publish_files:"user_photos,user_videos,publish_actions",publish:"publish_actions",offline_access:""},refresh:!1,login:function(e){e.options.force&&(e.qs.auth_type="reauthenticate"),e.qs.display=e.options.display||"popup"},logout:function(t,n){var o=e.utils.globalEvent(t),i=encodeURIComponent(e.settings.redirect_uri+"?"+e.utils.param({callback:o,result:JSON.stringify({force:!0}),state:"{}"})),r=(n.authResponse||{}).access_token;return e.utils.iframe("https://www.facebook.com/logout.php?next="+i+"&access_token="+r),r?void 0:!1},base:"https://graph.facebook.com/v2.7/",get:{me:"me?fields=email,first_name,last_name,name,timezone,verified","me/friends":"me/friends","me/following":"me/friends","me/followers":"me/friends","me/share":"me/feed","me/like":"me/likes","me/files":"me/albums","me/albums":"me/albums?fields=cover_photo,name","me/album":"@{id}/photos?fields=picture","me/photos":"me/photos","me/photo":"@{id}","friend/albums":"@{id}/albums","friend/photos":"@{id}/photos"},post:{"me/share":"me/feed","me/photo":"@{id}"},wrap:{me:t,"me/friends":n,"me/following":n,"me/followers":n,"me/albums":o,"me/photos":o,"me/files":o,"default":o},xhr:function(t,n){return"get"!==t.method&&"post"!==t.method||(n.suppress_response_codes=!0),"post"===t.method&&t.data&&"string"==typeof t.data.file&&(t.data.file=e.utils.toBlob(t.data.file)),!0},jsonp:function(t,n){var o=t.method;"get"===o||e.utils.hasBinary(t.data)?"delete"===t.method&&(n.method="delete",t.method="post"):(t.data.method=o,t.method="get")},form:function(e){return{callbackonload:!0}}}});var i="https://graph.facebook.com/"}(hello),function(e){function t(t,n,o){var i=(o?"":"flickr:")+"?method="+t+"&api_key="+e.services.flickr.id+"&format=json";for(var r in n)n.hasOwnProperty(r)&&(i+="&"+r+"="+n[r]);return i}function n(t){var n=e.getAuthResponse("flickr");t(n&&n.user_nsid?n.user_nsid:null)}function o(e,o){return o||(o={}),function(i,r){n(function(n){o.user_id=n,r(t(e,o,!0))})}}function i(e,t){var n="https://www.flickr.com/images/buddyicon.gif";return e.nsid&&e.iconserver&&e.iconfarm&&(n="https://farm"+e.iconfarm+".staticflickr.com/"+e.iconserver+"/buddyicons/"+e.nsid+(t?"_"+t:"")+".jpg"),n}function r(e,t,n,o,i){return i=i?"_"+i:"","https://farm"+t+".staticflickr.com/"+n+"/"+e+"_"+o+i+".jpg"}function a(e){e&&e.stat&&"ok"!=e.stat.toLowerCase()&&(e.error={code:"invalid_request",message:e.message})}function s(e){if(e.photoset||e.photos){var t="photoset"in e?"photoset":"photos";e=u(e,t),d(e),e.data=e.photo,delete e.photo;for(var n=0;n<e.data.length;n++){var o=e.data[n];o.name=o.title,o.picture=r(o.id,o.farm,o.server,o.secret,""),o.pictures=l(o.id,o.farm,o.server,o.secret),o.source=r(o.id,o.farm,o.server,o.secret,"b"),o.thumbnail=r(o.id,o.farm,o.server,o.secret,"m")}}return e}function l(e,t,n,o){var i=2048,a=[{id:"t",max:100},{id:"m",max:240},{id:"n",max:320},{id:"",max:500},{id:"z",max:640},{id:"c",max:800},{id:"b",max:1024},{id:"h",max:1600},{id:"k",max:2048},{id:"o",max:i}];return a.map(function(i){return{source:r(e,t,n,o,i.id),width:i.max,height:i.max}})}function u(e,t){return t in e?e=e[t]:"error"in e||(e.error={code:"invalid_request",message:e.message||"Failed to get data from Flickr"}),e}function c(e){if(a(e),e.contacts){e=u(e,"contacts"),d(e),e.data=e.contact,delete e.contact;for(var t=0;t<e.data.length;t++){var n=e.data[t];n.id=n.nsid,n.name=n.realname||n.username,n.thumbnail=i(n,"m")}}return e}function d(e){e.page&&e.pages&&e.page!==e.pages&&(e.paging={next:"?page="+ ++e.page})}e.init({flickr:{name:"Flickr",oauth:{version:"1.0a",auth:"https://www.flickr.com/services/oauth/authorize?perms=read",request:"https://www.flickr.com/services/oauth/request_token",token:"https://www.flickr.com/services/oauth/access_token"},base:"https://api.flickr.com/services/rest",get:{me:o("flickr.people.getInfo"),"me/friends":o("flickr.contacts.getList",{per_page:"@{limit|50}"}),"me/following":o("flickr.contacts.getList",{per_page:"@{limit|50}"}),"me/followers":o("flickr.contacts.getList",{per_page:"@{limit|50}"}),"me/albums":o("flickr.photosets.getList",{per_page:"@{limit|50}"}),"me/album":o("flickr.photosets.getPhotos",{photoset_id:"@{id}"}),"me/photos":o("flickr.people.getPhotos",{per_page:"@{limit|50}"})},wrap:{me:function(e){if(a(e),e=u(e,"person"),e.id){if(e.realname){e.name=e.realname._content;var t=e.name.split(" ");e.first_name=t.shift(),e.last_name=t.join(" ")}e.thumbnail=i(e,"l"),e.picture=i(e,"l")}return e},"me/friends":c,"me/followers":c,"me/following":c,"me/albums":function(e){return a(e),e=u(e,"photosets"),d(e),e.photoset&&(e.data=e.photoset,e.data.forEach(function(e){e.name=e.title._content,e.photos="https://api.flickr.com/services/rest"+t("flickr.photosets.getPhotos",{photoset_id:e.id},!0)}),delete e.photoset),e},"me/photos":function(e){return a(e),s(e)},"default":function(e){return a(e),s(e)}},xhr:!1,jsonp:function(e,t){"get"==e.method&&(delete t.callback,t.jsoncallback=e.callbackID)}}})}(hello),function(e){function t(e){!e.meta||400!==e.meta.code&&401!==e.meta.code||(e.error={code:"access_denied",message:e.meta.errorDetail})}function n(e){e&&e.id&&(e.thumbnail=e.photo.prefix+"100x100"+e.photo.suffix,e.name=e.firstName+" "+e.lastName,e.first_name=e.firstName,e.last_name=e.lastName,e.contact&&e.contact.email&&(e.email=e.contact.email))}function o(e,t){var n=t.access_token;return delete t.access_token,t.oauth_token=n,t.v=20121125,!0}e.init({foursquare:{name:"Foursquare",oauth:{version:2,auth:"https://foursquare.com/oauth2/authenticate",grant:"https://foursquare.com/oauth2/access_token"},refresh:!0,base:"https://api.foursquare.com/v2/",get:{me:"users/self","me/friends":"users/self/friends","me/followers":"users/self/friends","me/following":"users/self/friends"},wrap:{me:function(e){return t(e),e&&e.response&&(e=e.response.user,n(e)),e},"default":function(e){return t(e),e&&"response"in e&&"friends"in e.response&&"items"in e.response.friends&&(e.data=e.response.friends.items,e.data.forEach(n),delete e.response),e}},xhr:o,jsonp:o}})}(hello),function(e){function t(e,t){var n=t?t.statusCode:e&&"meta"in e&&"status"in e.meta&&e.meta.status;401!==n&&403!==n||(e.error={code:"access_denied",message:e.message||(e.data?e.data.message:"Could not get response")},delete e.message)}function n(e){e.id&&(e.thumbnail=e.picture=e.avatar_url,e.name=e.login)}function o(e,t,n){if(e.data&&e.data.length&&t&&t.Link){var o=t.Link.match(/<(.*?)>;\s*rel=\"next\"/);o&&(e.paging={next:o[1]})}}e.init({github:{name:"GitHub",oauth:{version:2,auth:"https://github.com/login/oauth/authorize",grant:"https://github.com/login/oauth/access_token",response_type:"code"},scope:{email:"user:email"},base:"https://api.github.com/",get:{me:"user","me/friends":"user/following?per_page=@{limit|100}","me/following":"user/following?per_page=@{limit|100}","me/followers":"user/followers?per_page=@{limit|100}","me/like":"user/starred?per_page=@{limit|100}"},wrap:{me:function(e,o){return t(e,o),n(e),e},"default":function(e,i,r){return t(e,i),Array.isArray(e)&&(e={data:e}),e.data&&(o(e,i,r),e.data.forEach(n)),e}},xhr:function(e){return"get"!==e.method&&e.data&&(e.headers=e.headers||{},e.headers["Content-Type"]="application/json","object"==typeof e.data&&(e.data=JSON.stringify(e.data))),!0}}})}(hello),function(e){function t(e){return parseInt(e,10)}function n(e){return c(e),e.data=e.items,delete e.items,e}function o(e){return e.error?void 0:(e.name||(e.name=e.title||e.message),e.picture||(e.picture=e.thumbnailLink),e.thumbnail||(e.thumbnail=e.thumbnailLink),"application/vnd.google-apps.folder"===e.mimeType&&(e.type="folder",e.files="https://www.googleapis.com/drive/v2/files?q=%22"+e.id+"%22+in+parents"),e)}function i(e){return{source:e.url,width:e.width,height:e.height}}function r(e){e.data=e.feed.entry.map(u),delete e.feed}function a(e){if(c(e),"feed"in e&&"entry"in e.feed)e.data=e.feed.entry.map(u),delete e.feed;else{if("entry"in e)return u(e.entry);"items"in e?(e.data=e.items.map(o),delete e.items):o(e)}return e}function s(e){e.name=e.displayName||e.name,e.picture=e.picture||(e.image?e.image.url:null),e.thumbnail=e.picture}function l(e,t,n){c(e);if("feed"in e&&"entry"in e.feed){for(var o=n.query.access_token,i=0;i<e.feed.entry.length;i++){var r=e.feed.entry[i];if(r.id=r.id.$t,r.name=r.title.$t,delete r.title,r.gd$email&&(r.email=r.gd$email&&r.gd$email.length>0?r.gd$email[0].address:null,r.emails=r.gd$email,delete r.gd$email),r.updated&&(r.updated=r.updated.$t),r.link){var a=r.link.length>0?r.link[0].href:null;a&&r.link[0].gd$etag&&(a+=(a.indexOf("?")>-1?"&":"?")+"access_token="+o,r.picture=a,r.thumbnail=a),delete r.link}r.category&&delete r.category}e.data=e.feed.entry,delete e.feed}return e}function u(e){var t,n=e.media$group,o=n.media$content.length?n.media$content[0]:{},r=n.media$content||[],a=n.media$thumbnail||[],s=r.concat(a).map(i).sort(function(e,t){return e.width-t.width}),l=0,u={id:e.id.$t,name:e.title.$t,description:e.summary.$t,updated_time:e.updated.$t,created_time:e.published.$t,picture:o?o.url:null,pictures:s,images:[],thumbnail:o?o.url:null,width:o.width,height:o.height};if("link"in e)for(l=0;l<e.link.length;l++){var c=e.link[l];if(c.rel.match(/\#feed$/)){u.upload_location=u.files=u.photos=c.href;break}}if("category"in e&&e.category.length)for(t=e.category,l=0;l<t.length;l++)t[l].scheme&&t[l].scheme.match(/\#kind$/)&&(u.type=t[l].term.replace(/^.*?\#/,""));return"media$thumbnail"in n&&n.media$thumbnail.length&&(t=n.media$thumbnail,u.thumbnail=t[0].url,u.images=t.map(i)),t=n.media$content,t&&t.length&&u.images.push(i(t[0])),u}function c(e){if("feed"in e&&e.feed.openSearch$itemsPerPage){var n=t(e.feed.openSearch$itemsPerPage.$t),o=t(e.feed.openSearch$startIndex.$t),i=t(e.feed.openSearch$totalResults.$t);i>o+n&&(e.paging={next:"?start="+(o+n)})}else"nextPageToken"in e&&(e.paging={next:"?pageToken="+e.nextPageToken})}function d(){function e(e){var n=new FileReader;n.onload=function(n){t(btoa(n.target.result),e.type+r+"Content-Transfer-Encoding: base64")},n.readAsBinaryString(e)}function t(e,t){n.push(r+"Content-Type: "+t+r+r+e),i--,s()}var n=[],o=(1e10*Math.random()).toString(32),i=0,r="\r\n",a=r+"--"+o,s=function(){},l=/^data\:([^;,]+(\;charset=[^;,]+)?)(\;base64)?,/i;this.append=function(n,o){"string"!=typeof n&&"length"in Object(n)||(n=[n]);for(var a=0;a<n.length;a++){i++;var s=n[a];if("undefined"!=typeof File&&s instanceof File||"undefined"!=typeof Blob&&s instanceof Blob)e(s);else if("string"==typeof s&&s.match(l)){var u=s.match(l);t(s.replace(l,""),u[1]+r+"Content-Transfer-Encoding: base64")}else t(s,o)}},this.onready=function(e){(s=function(){0===i&&(n.unshift(""),n.push("--"),e(n.join(a),o),n=[])})()}}function f(e,t){var n={};e.data&&"undefined"!=typeof HTMLInputElement&&e.data instanceof HTMLInputElement&&(e.data={file:e.data}),!e.data.name&&Object(Object(e.data.file).files).length&&"post"===e.method&&(e.data.name=e.data.file.files[0].name),"post"===e.method?e.data={title:e.data.name,parents:[{id:e.data.parent||"root"}],file:e.data.file}:(n=e.data,e.data={},n.parent&&(e.data.parents=[{id:e.data.parent||"root"}]),n.file&&(e.data.file=n.file),n.name&&(e.data.title=n.name));var o;if("file"in e.data&&(o=e.data.file,delete e.data.file,"object"==typeof o&&"files"in o&&(o=o.files),!o||!o.length))return void t({error:{code:"request_invalid",message:"There were no files attached with this request to upload"}});var i=new d;i.append(JSON.stringify(e.data),"application/json"),o&&i.append(o),i.onready(function(o,i){e.headers["content-type"]='multipart/related; boundary="'+i+'"',e.data=o,t("upload/drive/v2/files"+(n.id?"/"+n.id:"")+"?uploadType=multipart")})}function p(e){if("object"==typeof e.data)try{e.data=JSON.stringify(e.data),e.headers["content-type"]="application/json"}catch(t){}}var m="https://www.google.com/m8/feeds/contacts/default/full?v=3.0&alt=json&max-results=@{limit|1000}&start-index=@{start|1}";e.init({google:{name:"Google Plus",oauth:{version:2,auth:"https://accounts.google.com/o/oauth2/auth",grant:"https://accounts.google.com/o/oauth2/token"},scope:{basic:"https://www.googleapis.com/auth/plus.me profile",email:"email",birthday:"",events:"",photos:"https://picasaweb.google.com/data/",videos:"http://gdata.youtube.com",friends:"https://www.google.com/m8/feeds, https://www.googleapis.com/auth/plus.login",files:"https://www.googleapis.com/auth/drive.readonly",publish:"",publish_files:"https://www.googleapis.com/auth/drive",share:"",create_event:"",offline_access:""},scope_delim:" ",login:function(e){"code"===e.qs.response_type&&(e.qs.access_type="offline"),e.options.force&&(e.qs.approval_prompt="force")},base:"https://www.googleapis.com/",get:{me:"plus/v1/people/me","me/friends":"plus/v1/people/me/people/visible?maxResults=@{limit|100}","me/following":m,"me/followers":m,"me/contacts":m,"me/share":"plus/v1/people/me/activities/public?maxResults=@{limit|100}","me/feed":"plus/v1/people/me/activities/public?maxResults=@{limit|100}","me/albums":"https://picasaweb.google.com/data/feed/api/user/default?alt=json&max-results=@{limit|100}&start-index=@{start|1}","me/album":function(e,t){var n=e.query.id;delete e.query.id,t(n.replace("/entry/","/feed/"))},"me/photos":"https://picasaweb.google.com/data/feed/api/user/default?alt=json&kind=photo&max-results=@{limit|100}&start-index=@{start|1}","me/file":"drive/v2/files/@{id}","me/files":"drive/v2/files?q=%22@{parent|root}%22+in+parents+and+trashed=false&maxResults=@{limit|100}","me/folders":"drive/v2/files?q=%22@{id|root}%22+in+parents+and+mimeType+=+%22application/vnd.google-apps.folder%22+and+trashed=false&maxResults=@{limit|100}","me/folder":"drive/v2/files?q=%22@{id|root}%22+in+parents+and+trashed=false&maxResults=@{limit|100}"},post:{"me/files":f,"me/folders":function(e,t){e.data={title:e.data.name,parents:[{id:e.data.parent||"root"}],mimeType:"application/vnd.google-apps.folder"},t("drive/v2/files")}},put:{"me/files":f},del:{"me/files":"drive/v2/files/@{id}","me/folder":"drive/v2/files/@{id}"},patch:{"me/file":"drive/v2/files/@{id}"},wrap:{me:function(e){return e.id&&(e.last_name=e.family_name||(e.name?e.name.familyName:null),e.first_name=e.given_name||(e.name?e.name.givenName:null),e.emails&&e.emails.length&&(e.email=e.emails[0].value),s(e)),e},"me/friends":function(e){return e.items&&(c(e),e.data=e.items,e.data.forEach(s),delete e.items),e},"me/contacts":l,"me/followers":l,"me/following":l,"me/share":n,"me/feed":n,"me/albums":a,"me/photos":r,"default":a},xhr:function(t){return"post"===t.method||"put"===t.method?p(t):"patch"===t.method&&(e.utils.extend(t.query,t.data),t.data=null),!0},form:!1}})}(hello),function(e){function t(e){return{source:e.url,width:e.width,height:e.height}}function n(e){return"string"==typeof e?{error:{code:"invalid_request",message:e}}:(e&&"meta"in e&&"error_type"in e.meta&&(e.error={code:e.meta.error_type,message:e.meta.error_message}),e)}function o(e){return r(e),e&&"data"in e&&e.data.forEach(i),e}function i(e){e.id&&(e.thumbnail=e.profile_picture,e.name=e.full_name||e.username)}function r(e){"pagination"in e&&(e.paging={next:e.pagination.next_url},delete e.pagination)}e.init({instagram:{name:"Instagram",oauth:{version:2,auth:"https://instagram.com/oauth/authorize/",grant:"https://api.instagram.com/oauth/access_token"},refresh:!0,scope:{basic:"basic",photos:"",friends:"relationships",publish:"likes comments",email:"",share:"",publish_files:"",files:"",videos:"",offline_access:""},scope_delim:" ",base:"https://api.instagram.com/v1/",get:{me:"users/self","me/feed":"users/self/feed?count=@{limit|100}","me/photos":"users/self/media/recent?min_id=0&count=@{limit|100}","me/friends":"users/self/follows?count=@{limit|100}","me/following":"users/self/follows?count=@{limit|100}","me/followers":"users/self/followed-by?count=@{limit|100}","friend/photos":"users/@{id}/media/recent?min_id=0&count=@{limit|100}"},post:{"me/like":function(e,t){var n=e.data.id;e.data={},t("media/"+n+"/likes")}},del:{"me/like":"media/@{id}/likes"},wrap:{me:function(e){return n(e),"data"in e&&(e.id=e.data.id,e.thumbnail=e.data.profile_picture,e.name=e.data.full_name||e.data.username),e},"me/friends":o,"me/following":o,"me/followers":o,"me/photos":function(e){return n(e),r(e),"data"in e&&(e.data=e.data.filter(function(e){return"image"===e.type}),e.data.forEach(function(e){e.name=e.caption?e.caption.text:null,e.thumbnail=e.images.thumbnail.url,e.picture=e.images.standard_resolution.url,e.pictures=Object.keys(e.images).map(function(n){var o=e.images[n];return t(o)}).sort(function(e,t){return e.width-t.width})})),e},"default":function(e){return e=n(e),r(e),e}},xhr:function(e,t){var n=e.method,o="get"!==n;return o&&("post"!==n&&"put"!==n||!e.query.access_token||(e.data.access_token=e.query.access_token,delete e.query.access_token),e.proxy=o),o},form:!1}})}(hello),function(e){function t(e,t){var n,i;return e&&"Message"in e&&(i=e.Message,delete e.Message,"ErrorCode"in e?(n=e.ErrorCode,delete e.ErrorCode):n=o(t),e.error={code:n,message:i,details:e}),e}function n(e,t){var n=t.access_token;return delete t.access_token,e.headers.Authorization="Bearer "+n,"get"!==e.method&&e.data&&(e.headers["Content-Type"]="application/json","object"==typeof e.data&&(e.data=JSON.stringify(e.data))),"put"===e.method&&(e.method="patch"),!0}function o(e){switch(e.statusCode){case 400:return"invalid_request";case 403:return"stale_token";case 401:return"invalid_token";case 500:return"server_error";default:return"server_error"}}e.init({joinme:{name:"join.me",oauth:{version:2,auth:"https://secure.join.me/api/public/v1/auth/oauth2",grant:"https://secure.join.me/api/public/v1/auth/oauth2"},refresh:!1,scope:{basic:"user_info",user:"user_info",scheduler:"scheduler",start:"start_meeting",email:"",friends:"",share:"",publish:"",photos:"",publish_files:"",files:"",videos:"",offline_access:""},scope_delim:" ",login:function(e){e.options.popup.width=400,e.options.popup.height=700},base:"https://api.join.me/v1/",get:{me:"user",meetings:"meetings","meetings/info":"meetings/@{id}"},post:{"meetings/start/adhoc":function(e,t){t("meetings/start")},"meetings/start/scheduled":function(e,t){var n=e.data.meetingId;e.data={},t("meetings/"+n+"/start")},"meetings/schedule":function(e,t){t("meetings")}},patch:{"meetings/update":function(e,t){t("meetings/"+e.data.meetingId)}},del:{"meetings/delete":"meetings/@{id}"},wrap:{me:function(e,n){return t(e,n),e.email?(e.name=e.fullName,e.first_name=e.name.split(" ")[0],e.last_name=e.name.split(" ")[1],e.id=e.email,e):e},"default":function(e,n){return t(e,n),e}},xhr:n}})}(hello),function(e){function t(e){e&&"errorCode"in e&&(e.error={code:e.status,message:e.message})}function n(e){return e.error?void 0:(e.first_name=e.firstName,e.last_name=e.lastName,e.name=e.formattedName||e.first_name+" "+e.last_name,e.thumbnail=e.pictureUrl,e.email=e.emailAddress,e)}function o(e){return t(e),i(e),e.values&&(e.data=e.values.map(n),delete e.values),e}function i(e){"_count"in e&&"_start"in e&&e._count+e._start<e._total&&(e.paging={next:"?start="+(e._start+e._count)+"&count="+e._count})}function r(e,t){"{}"===JSON.stringify(e)&&200===t.statusCode&&(e.success=!0)}function a(e){e.access_token&&(e.oauth2_access_token=e.access_token,delete e.access_token)}function s(e,t){e.headers["x-li-format"]="json";var n=e.data.id;e.data=("delete"!==e.method).toString(),e.method="put",t("people/~/network/updates/key="+n+"/is-liked")}e.init({linkedin:{oauth:{version:2,response_type:"code",auth:"https://www.linkedin.com/uas/oauth2/authorization",grant:"https://www.linkedin.com/uas/oauth2/accessToken"},refresh:!0,scope:{basic:"r_basicprofile",email:"r_emailaddress",files:"",friends:"",photos:"",publish:"w_share",publish_files:"w_share",share:"",videos:"",offline_access:""},scope_delim:" ",base:"https://api.linkedin.com/v1/",get:{me:"people/~:(picture-url,first-name,last-name,id,formatted-name,email-address)","me/share":"people/~/network/updates?count=@{limit|250}"},post:{"me/share":function(e,t){var n={visibility:{code:"anyone"}};e.data.id?n.attribution={share:{id:e.data.id}}:(n.comment=e.data.message,e.data.picture&&e.data.link&&(n.content={"submitted-url":e.data.link,"submitted-image-url":e.data.picture})),e.data=JSON.stringify(n),t("people/~/shares?format=json")},"me/like":s},del:{"me/like":s},wrap:{me:function(e){return t(e),n(e),e},"me/friends":o,"me/following":o,"me/followers":o,"me/share":function(e){return t(e),i(e),e.values&&(e.data=e.values.map(n),e.data.forEach(function(e){e.message=e.headline}),delete e.values),e},"default":function(e,n){t(e),r(e,n),i(e)}},jsonp:function(e,t){a(t),"get"===e.method&&(t.format="jsonp",t["error-callback"]=e.callbackID)},xhr:function(e,t){return"get"!==e.method?(a(t),e.headers["Content-Type"]="application/json",e.headers["x-li-format"]="json",e.proxy=!0,!0):!1}}})}(hello),function(e){function t(e,t){var n=t.access_token;return delete t.access_token,t.oauth_token=n,t["_status_code_map[302]"]=200,!0}function n(e){return e.id&&(e.picture=e.avatar_url,e.thumbnail=e.avatar_url,e.name=e.username||e.full_name),e}function o(e){"next_href"in e&&(e.paging={next:e.next_href})}e.init({soundcloud:{name:"SoundCloud",oauth:{version:2,auth:"https://soundcloud.com/connect",grant:"https://soundcloud.com/oauth2/token"},base:"https://api.soundcloud.com/",get:{me:"me.json","me/friends":"me/followings.json","me/followers":"me/followers.json","me/following":"me/followings.json","default":function(e,t){t(e.path+".json")}},wrap:{me:function(e){return n(e),e},"default":function(e){return Array.isArray(e)&&(e={data:e.map(n)}),o(e),e}},xhr:t,jsonp:t}})}(hello),function(e){function t(e){if(e.id){if(e.name){var t=e.name.split(" ");e.first_name=t.shift(),e.last_name=t.join(" ")}e.thumbnail=e.profile_image_url_https||e.profile_image_url}return e}function n(e){return o(e),i(e),e.users&&(e.data=e.users.map(t),delete e.users),e}function o(e){if(e.errors){var t=e.errors[0];e.error={code:"request_failed",message:t.message}}}function i(e){"next_cursor_str"in e&&(e.paging={next:"?cursor="+e.next_cursor_str})}function r(e){return Array.isArray(e)?{data:e}:e}var a="https://api.twitter.com/";e.init({twitter:{oauth:{version:"1.0a",auth:a+"oauth/authenticate",request:a+"oauth/request_token",token:a+"oauth/access_token"},login:function(e){var t="?force_login=true";this.oauth.auth=this.oauth.auth.replace(t,"")+(e.options.force?t:"")},base:a+"1.1/",get:{me:"account/verify_credentials.json","me/friends":"friends/list.json?count=@{limit|200}","me/following":"friends/list.json?count=@{limit|200}","me/followers":"followers/list.json?count=@{limit|200}","me/share":"statuses/user_timeline.json?count=@{limit|200}","me/like":"favorites/list.json?count=@{limit|200}"},post:{"me/share":function(t,n){var o=t.data;t.data=null;var i=[];o.message&&(i.push(o.message),delete o.message),o.link&&(i.push(o.link),delete o.link),o.picture&&(i.push(o.picture),delete o.picture),i.length&&(o.status=i.join(" ")),o.file?(o["media[]"]=o.file,delete o.file,t.data=o,n("statuses/update_with_media.json")):"id"in o?n("statuses/retweet/"+o.id+".json"):(e.utils.extend(t.query,o),n("statuses/update.json?include_entities=1"))},"me/like":function(e,t){var n=e.data.id;e.data=null,t("favorites/create.json?id="+n)}},del:{"me/like":function(){p.method="post";var e=p.data.id;p.data=null,callback("favorites/destroy.json?id="+e)}},wrap:{me:function(e){return o(e),t(e),e},"me/friends":n,"me/followers":n,"me/following":n,"me/share":function(e){return o(e),i(e),!e.error&&"length"in e?{data:e}:e},"default":function(e){return e=r(e),i(e),e}},xhr:function(e){return"get"!==e.method}}})}(hello),function(e){function t(e,t){return null!==e&&"response"in e&&null!==e.response&&e.response.length&&(e=e.response[0],e.id=e.uid,e.thumbnail=e.picture=e.photo_max,e.name=e.first_name+" "+e.last_name,t.authResponse&&null!==t.authResponse.email&&(e.email=t.authResponse.email)),e}function n(e){if(e.error){var t=e.error;e.error={code:t.error_code,message:t.error_msg}}}e.init({vk:{name:"Vk",oauth:{version:2,auth:"https://oauth.vk.com/authorize",grant:"https://oauth.vk.com/access_token"},scope:{email:"email",friends:"friends",photos:"photos",videos:"video",share:"share",offline_access:"offline"},refresh:!0,login:function(e){e.qs.display=window.navigator&&window.navigator.userAgent&&/ipad|phone|phone|android/.test(window.navigator.userAgent.toLowerCase())?"mobile":"popup"},base:"https://api.vk.com/method/",get:{me:function(e,t){e.query.fields="id,first_name,last_name,photo_max",t("users.get")}},wrap:{me:function(e,o,i){return n(e),t(e,i)}},xhr:!1,jsonp:!0,form:!1}})}(hello),function(e){function t(e){return"data"in e&&e.data.forEach(function(e){e.picture&&(e.thumbnail=e.picture),e.images&&(e.pictures=e.images.map(n).sort(function(e,t){return e.width-t.width}))}),e}function n(e){return{width:e.width,height:e.height,source:e.source}}function o(e){return"data"in e&&e.data.forEach(function(e){e.photos=e.files="https://apis.live.net/v5.0/"+e.id+"/photos"}),e}function i(e,t,n){if(e.id){var o=n.query.access_token;if(e.emails&&(e.email=e.emails.preferred),e.is_friend!==!1){var i=e.user_id||e.id;e.thumbnail=e.picture="https://apis.live.net/v5.0/"+i+"/picture?access_token="+o}}return e}function r(e,t,n){return"data"in e&&e.data.forEach(function(e){i(e,t,n)}),e}e.init({windows:{name:"Windows live",oauth:{version:2,auth:"https://login.live.com/oauth20_authorize.srf",grant:"https://login.live.com/oauth20_token.srf"},refresh:!0,logout:function(){return"http://login.live.com/oauth20_logout.srf?ts="+(new Date).getTime()},scope:{basic:"wl.signin,wl.basic",email:"wl.emails",birthday:"wl.birthday",events:"wl.calendars",photos:"wl.photos",videos:"wl.photos",friends:"wl.contacts_emails",files:"wl.skydrive",publish:"wl.share",publish_files:"wl.skydrive_update",share:"wl.share",create_event:"wl.calendars_update,wl.events_create",offline_access:"wl.offline_access"},base:"https://apis.live.net/v5.0/",get:{me:"me","me/friends":"me/friends","me/following":"me/contacts","me/followers":"me/friends","me/contacts":"me/contacts","me/albums":"me/albums","me/album":"@{id}/files","me/photo":"@{id}","me/files":"@{parent|me/skydrive}/files","me/folders":"@{id|me/skydrive}/files","me/folder":"@{id|me/skydrive}/files"},post:{"me/albums":"me/albums","me/album":"@{id}/files/","me/folders":"@{id|me/skydrive/}","me/files":"@{parent|me/skydrive}/files"},del:{"me/album":"@{id}","me/photo":"@{id}","me/folder":"@{id}","me/files":"@{id}"},wrap:{me:i,"me/friends":r,"me/contacts":r,"me/followers":r,"me/following":r,"me/albums":o,"me/photos":t,"default":t},xhr:function(t){return"get"===t.method||"delete"===t.method||e.utils.hasBinary(t.data)||("string"==typeof t.data.file?t.data.file=e.utils.toBlob(t.data.file):(t.data=JSON.stringify(t.data),t.headers={"Content-Type":"application/json"})),!0},jsonp:function(t){"get"===t.method||e.utils.hasBinary(t.data)||(t.data.method=t.method,t.method="get")}}})}(hello),function(e){function t(e){e&&"meta"in e&&"error_type"in e.meta&&(e.error={code:e.meta.error_type,message:e.meta.error_message})}function n(e){if(t(e),e.query&&e.query.results&&e.query.results.profile){e=e.query.results.profile,e.id=e.guid,e.last_name=e.familyName,e.first_name=e.givenName||e.nickname;var n=[];e.first_name&&n.push(e.first_name),e.last_name&&n.push(e.last_name),e.name=n.join(" "),e.email=e.emails&&e.emails[0]?e.emails[0].handle:null,e.thumbnail=e.image?e.image.imageUrl:null}return e}function o(e,n,o){t(e),r(e,n,o);return e.query&&e.query.results&&e.query.results.contact&&(e.data=e.query.results.contact,delete e.query,Array.isArray(e.data)||(e.data=[e.data]),e.data.forEach(i)),e}function i(e){e.id=null,!e.fields||e.fields instanceof Array||(e.fields=[e.fields]),(e.fields||[]).forEach(function(t){"email"===t.type&&(e.email=t.value),"name"===t.type&&(e.first_name=t.value.givenName,e.last_name=t.value.familyName,e.name=t.value.givenName+" "+t.value.familyName),"yahooid"===t.type&&(e.id=t.value)})}function r(e,t,n){return e.query&&e.query.count&&n.options&&(e.paging={next:"?start="+(e.query.count+(+n.options.start||1))}),e}function a(e){return"https://query.yahooapis.com/v1/yql?q="+(e+" limit @{limit|100} offset @{start|0}").replace(/\s/g,"%20")+"&format=json"}e.init({yahoo:{oauth:{version:"1.0a",auth:"https://api.login.yahoo.com/oauth/v2/request_auth",request:"https://api.login.yahoo.com/oauth/v2/get_request_token",token:"https://api.login.yahoo.com/oauth/v2/get_token"},login:function(e){e.options.popup.width=560;try{delete e.qs.state.scope}catch(t){}},base:"https://social.yahooapis.com/v1/",get:{me:a("select * from social.profile(0) where guid=me"),"me/friends":a("select * from social.contacts(0) where guid=me"),"me/following":a("select * from social.contacts(0) where guid=me")},wrap:{me:n,"me/friends":o,"me/following":o,"default":r}}})}(hello),"function"==typeof define&&define.amd&&define(function(){return hello}),"object"==typeof module&&module.exports&&(module.exports=hello);
// ------------------------------------------------------------------------------
//  Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.  See License in the project root for license information.
// ------------------------------------------------------------------------------

'use strict';

angular.module('ApiExplorer', ['ngAnimate', 'ngMaterial'])
    .config(['$mdThemingProvider', function ($mdThemingProvider) {

    $mdThemingProvider.definePalette('O365PrimaryPalette', {
            '50': 'e9f0fc',
            '100': 'd3e2f8',
            '200': 'bdd3f5',
            '300': '91b6ee', 
            '400': '6599e7',
            '500': '4685e2', //blue
            '600': '387be0',
            '700': '226ddd',
            '800': '1f62c7', 
            '900': '1c57b0',
            'A100': 'FF6A00', 
            'A200': 'FF6A00', 
            'A400': 'FF6A00', 
            'A700': 'FF6A00', 
            'contrastDefaultColor': 'light',   
            'contrastDarkColors': ['50', '100', 
                '200', '300', '400', 'A100'],
            'contrastLightColors': undefined 
    });
    
    $mdThemingProvider.definePalette('O365AccentPalette', {
            '50': 'ffc499',
            '100': 'ffb580',
            '200': 'ffa666',
            '300': 'ff974d', 
            '400': 'ff8833',
            '500': 'FF6A00', //orange
            '600': 'e66000',
            '700': 'cc5500',
            '800': 'b34a00', 
            '900': '994000',
            'A100': 'FF6A00',
            'A200': 'FF6A00', 
            'A400': 'FF6A00', 
            'A700': 'FF6A00', 
    });

    $mdThemingProvider.theme('default').primaryPalette('O365PrimaryPalette');
    $mdThemingProvider.theme('default').accentPalette('O365AccentPalette');
}]);
'use strict';
function run($scope, url, apiService) {
    $scope.$emit('urlChange', url);
}
function formatXml(xml) {
    var reg = /(>)\s*(<)(\/*)/g;
    var wsexp = / *(.*) +\n/g;
    var contexp = /(<.+>)(.+\n)/g;
    xml = xml.replace(reg, '$1\n$2$3').replace(wsexp, '$1\n').replace(contexp, '$1\n$2');
    var pad = 0;
    var formatted = '';
    var lines = xml.split('\n');
    var indent = 0;
    var lastType = 'other';
    var transitions = {
        'single->single': 0,
        'single->closing': -1,
        'single->opening': 0,
        'single->other': 0,
        'closing->single': 0,
        'closing->closing': -1,
        'closing->opening': 0,
        'closing->other': 0,
        'opening->single': 1,
        'opening->closing': 0,
        'opening->opening': 1,
        'opening->other': 1,
        'other->single': 0,
        'other->closing': -1,
        'other->opening': 0,
        'other->other': 0
    };
    for (var i = 0; i < lines.length; i++) {
        var ln = lines[i];
        var single = Boolean(ln.match(/<.+\/>/));
        var closing = Boolean(ln.match(/<\/.+>/));
        var opening = Boolean(ln.match(/<[^!].*>/));
        var type = single ? 'single' : closing ? 'closing' : opening ? 'opening' : 'other';
        var fromTo = lastType + '->' + type;
        lastType = type;
        var padding = '';
        indent += transitions[fromTo];
        for (var j = 0; j < indent; j++) {
            padding += '\t';
        }
        if (fromTo == 'opening->closing')
            formatted = formatted.substr(0, formatted.length - 1) + ln + '\n';
        else
            formatted += padding + ln + '\n';
    }
    return formatted;
}
;
function insertHeadersIntoResponseViewer(headers, status) {
    var responseObj = {};
    if (headers != null) {
        responseObj = headers();
    }
    responseObj["Status Code"] = status;
    var headersArr = [];
    for (var headerName in responseObj) {
        headersArr.push(headerName + ": " + responseObj[headerName]);
    }
    getJsonViewer().getSession().setValue("");
    getJsonViewer().getSession().insert(0, headersArr.join("\n"));
}
function showResults(results, headers, status, responseContentType) {
    getJsonViewer().setValue("");
    insertHeadersIntoResponseViewer(headers, status);
    getJsonViewer().getSession().insert(0, results);
    if (responseContentType)
        getJsonViewer().getSession().setMode("ace/mode/" + responseContentType);
}
function handleImageResponse($scope, apiService, startTime, headers, status, handleUnsuccessfulQueryResponse) {
    apiService.performQuery('GET_BINARY')($scope.getSearchText()).then(function (result) {
        var blob = new Blob([result.data], { type: "image/jpeg" });
        var imageUrl = window.URL.createObjectURL(blob);
        var imageResultViewer = document.getElementById("img");
        imageResultViewer.src = imageUrl;
        $scope.showImage = true;
        insertHeadersIntoResponseViewer(result.headers, result.status);
        $scope.requestInProgress = false;
    }, handleUnsuccessfulQueryResponse);
}
function handleHtmlResponse($scope, startTime, results, headers, status) {
    $scope.requestInProgress = false;
    showResults(results, headers, status, "html");
}
function handleJsonResponse($scope, startTime, results, headers, status) {
    results = JSON.stringify(results, null, 4);
    $scope.requestInProgress = false;
    showResults(results, headers, status, "json");
}
function handleXmlResponse($scope, startTime, results, headers, status) {
    results = formatXml(results);
    $scope.requestInProgress = false;
    showResults(results, headers, status, "xml");
}
function isImageResponse(headers) {
    var contentType = getContentType(headers);
    return contentType === "application/octet-stream" || contentType.substr(0, 6) === "image/";
}
function isHtmlResponse(headers) {
    var contentType = getContentType(headers);
    return contentType === "text/html" || contentType === "application/xhtml+xml";
}
function isXmlResponse(results) {
    return JSON.stringify(results, null, 4).indexOf("<?xml") != -1;
}
function isJsonResponse(headers) {
    var contentType = getContentType(headers);
    return contentType === "application/json";
}
function getContentType(headers) {
    var full = headers("content-type");
    var delimiterPos = full.indexOf(";");
    if (delimiterPos != -1) {
        return full.substr(0, delimiterPos);
    }
    else {
        return full;
    }
}
function getEntitySets(metadata) {
    var entitySetsObj = {};
    var entitySetsAndSingletons = $(($.parseHTML(metadata))[1]).find("EntityContainer")[0].children;
    for (var i = 0; i < entitySetsAndSingletons.length; i++) {
        var set = entitySetsAndSingletons[i];
        var entitySetOrSingleton = null;
        if (set.tagName == "ENTITYSET") {
            entitySetOrSingleton = {
                name: set.getAttribute("name"),
                isEntitySet: true,
                type: set.getAttribute("entitytype"),
                isACollection: true
            };
        }
        else if (set.tagName == "SINGLETON") {
            entitySetOrSingleton = {
                name: set.getAttribute("name"),
                isEntitySet: false,
                type: set.getAttribute("type"),
                isACollection: false
            };
        }
        else {
            console.error("Found unexpected type in metadata under EntityContainer");
        }
        entitySetsObj[entitySetOrSingleton.name] = entitySetOrSingleton;
    }
    return entitySetsObj;
}
function formatRequestHeaders(headers) {
    var obj = {};
    var parts = headers.replace(/^\s+|,\s*$/g, '').split('\n');
    for (var i = 0, len = parts.length; i < len; i++) {
        var match = parts[i].match(/^\s*"?([^":]*)"?\s*:\s*"?([^"]*)\s*$/);
        if (match) {
            obj[match[1]] = match[2];
        }
    }
    return obj;
}
function createEntityTypeObject(DOMarray) {
    var entityTypes = {};
    for (var i = 0; i < DOMarray.length; i++) {
        var EntityType = {
            name: DOMarray[i].getAttribute("name"),
            links: {}
        };
        var children = DOMarray[i].children;
        for (var j = 0; j < children.length; j++) {
            if (children[j].attributes.length > 0) {
                var childName = children[j].getAttribute("name");
                var type = children[j].getAttribute("type");
                var urlObject = {
                    isACollection: false,
                    name: childName,
                    isEntitySet: false,
                    type: type
                };
                if (type.indexOf("Collection(") == 0) {
                    urlObject.isACollection = true;
                    urlObject.type = type.split("(")[1].split(")")[0];
                }
                EntityType.links[childName] = urlObject;
            }
        }
        entityTypes[EntityType.name] = EntityType;
    }
    return entityTypes;
}
function showRequestHeaders($scope) {
    getHeadersEditor().getSession().setValue("");
    var requestHeaders = "Content-Type: application/json";
    getHeadersEditor().getSession().insert(0, requestHeaders);
}
function getEntityTypes(metadata) {
    var entities = {};
    var entityTypes = $(($.parseHTML(metadata))[1]).find("EntityType");
    jQuery.extend(entities, createEntityTypeObject(entityTypes));
    var complexTypes = $(($.parseHTML(metadata))[1]).find("ComplexType");
    jQuery.extend(entities, createEntityTypeObject(complexTypes));
    return entities;
}
function getEntityFromTypeName(service, typePossiblyWithPrefix) {
    var entityTypeData = service.cache.get(service.selectedVersion + "EntityTypeData");
    var type = typePossiblyWithPrefix.split("microsoft.graph.").pop();
    return entityTypeData[type];
}
function constructGraphLinksFromServicePath(service) {
    var urlPathArr = service.text.split("https://graph.microsoft.com/");
    if (urlPathArr.length <= 1)
        return [];
    var segments = urlPathArr[1].split("/");
    var version = segments.shift();
    var graph = [];
    var entityContainerData = service.cache.get(service.selectedVersion + "EntitySetData");
    if (entityContainerData === undefined)
        return [];
    while (segments.length > 0) {
        var segment = segments.shift();
        if (graph.length == 0) {
            if (segment in entityContainerData) {
                var node_1 = entityContainerData[segment];
                graph.push(node_1);
            }
        }
        else {
            var lastGraphItem = graph[graph.length - 1];
            var lastGraphItemEntity = getEntityFromTypeName(service, lastGraphItem.type);
            if (lastGraphItemEntity === undefined) {
                continue;
            }
            if (lastGraphItemEntity.links !== undefined && segment in lastGraphItemEntity.links) {
                graph.push(lastGraphItemEntity.links[segment]);
            }
            else if (lastGraphItem.isACollection && segment != "") {
                graph.push({
                    isACollection: false,
                    isEntitySet: false,
                    name: segment,
                    type: lastGraphItem.type
                });
            }
        }
    }
    return graph;
}
function combineUrlOptionsWithCurrentUrl(service, urlOptions) {
    var graphFromServiceUrl = constructGraphLinksFromServicePath(service);
    var baseUrl = [];
    while (graphFromServiceUrl.length > 0) {
        var lastSegment = graphFromServiceUrl.shift();
        baseUrl.push(lastSegment.name);
    }
    var baseUrlFinal = "https://graph.microsoft.com/" + service.selectedVersion;
    if (baseUrl.length > 0) {
        baseUrlFinal += "/" + baseUrl.join('/');
    }
    var autocompleteUrls = [];
    for (var urlAutoCompleteSuffix in urlOptions) {
        autocompleteUrls.push(baseUrlFinal + '/' + urlOptions[urlAutoCompleteSuffix]);
    }
    return autocompleteUrls;
}
function getUrlsFromServiceURL(service) {
    var graphFromServiceUrl = constructGraphLinksFromServicePath(service);
    if (graphFromServiceUrl.length > 0) {
        var lastNode = graphFromServiceUrl.pop();
        if (lastNode.isACollection)
            return [];
        var entity = getEntityFromTypeName(service, lastNode.type);
        if (!entity)
            return [];
        return combineUrlOptionsWithCurrentUrl(service, Object.keys(entity.links));
    }
    else {
        var entityContainerData = service.cache.get(service.selectedVersion + "EntitySetData");
        if (entityContainerData === undefined) {
            return [];
        }
        return combineUrlOptionsWithCurrentUrl(service, Object.keys(entityContainerData));
    }
}
function showRequestBodyEditor() {
    s.tabConfig.disableRequestBodyEditor = false;
    s.tabConfig.hideContent = false;
    showRequestHeaders(s);
    $(function () {
        initializeJsonEditor();
        setSelectedTab(1);
    });
}
function setSelectedTab(num) {
    if (num >= 2 || num < 0) {
        return;
    }
    s.tabConfig.selected = num;
    s.tabConfig.previousSelected = s.tabConfig.selected;
}
function handleQueryString(service, actionValue, versionValue, requestValue) {
    if (actionValue) {
        service.selectedOption = actionValue.toUpperCase();
        if (service.selectedOption === 'POST' || service.selectedOption === 'PATCH') {
            if (hello('msft').getAuthResponse() != null)
                showRequestBodyEditor();
        }
    }
    if (versionValue) {
        service.selectedVersion = versionValue;
    }
    if (requestValue) {
        service.text = "https://graph.microsoft.com/" + service.selectedVersion + "/" + requestValue;
    }
}
function getUrlsFromEntityType(service, entity) {
    var entityTypes = service.cache.get(service.selectedVersion + "EntityTypeData");
    var type = entityTypes[entity.name];
    return combineUrlOptionsWithCurrentUrl(service, Object.keys(type.links));
}
function parseMetadata(service) {
    var entitySetData, entityTypeData;
    if (!service.cache.get(service.selectedVersion + "Metadata")) {
        console.log("parsing metadata");
        service.getMetadata().then(function (results) {
            var metadata = results.data;
            service.cache.put(service.selectedVersion + "Metadata", results);
            entitySetData = getEntitySets(metadata);
            service.cache.put(service.selectedVersion + "EntitySetData", entitySetData);
            entityTypeData = getEntityTypes(metadata);
            service.cache.put(service.selectedVersion + "EntityTypeData", entityTypeData);
            console.log("metadata successfully parsed");
        }, function (err, status) {
            console.error("metadata could not be parsed");
        });
    }
}
//# sourceMappingURL=api-explorer-helpers.js.map
// ------------------------------------------------------------------------------
//  Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.  See License in the project root for license information.
// ------------------------------------------------------------------------------

'use strict';

angular.module('ApiExplorer')
.config(function($locationProvider) {
    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false,
        rewriteLinks: false
    });
    
})
.factory('ApiExplorerSvc', [function () {
    var apiExplorerService = {};
    return apiExplorerService;
}]);
// ------------------------------------------------------------------------------
//  Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.  See License in the project root for license information.
// ------------------------------------------------------------------------------

'use strict';

angular.module('ApiExplorer')
    .factory('ApiExplorerSvc', ['$http', '$cacheFactory', function ($http, $cacheFactory) {
        return {
            text: 'https://graph.microsoft.com/v1.0/me/',

            selectedVersion: "v1.0",

            selectedOption: "GET",

            cache: $cacheFactory('myCache'),
            
            performAnonymousQuery: function (queryType) {
                return function (query, postString, requestHeaders) {
                    var headersObj = {
                        "Authorization": "Bearer {token:https://graph.microsoft.com/}",
                        "Accept": "application/json"
                    };

                    if (requestHeaders && requestHeaders["Authorization"]){
                        headersObj["Authorization"] = requestHeaders["Authorization"];
                    }

                    if (requestHeaders && requestHeaders["Accept"]){
                        headersObj["Accept"] = requestHeaders["Accept"];
                    }

                    var request = {
                        url: 'https://proxy.apisandbox.msdn.microsoft.com/svc?url=' + encodeURIComponent(query),
                        method: 'GET',
                        headers: headersObj
                    }

                    if (queryType == "GET_BINARY") {
                        request["responseType"] = "arraybuffer";
                    }

                    if (queryType == "GET_BINARY" || queryType == "GET") {
                        return $http(request);
                    }
                };
            },

            performQuery: function (queryType) {
                return function (query, postString, requestHeaders) {
                    switch(queryType) {
                        case "GET":
                            return $http.get(query, {headers : requestHeaders});
                        case "GET_BINARY":
                            return $http.get(query, {responseType:"arraybuffer"}, {headers : requestHeaders});
                        case "POST":
                            return $http.post(query, postString, {headers : requestHeaders});
                        case "PATCH":
                            return $http.patch(query, postString, {headers : requestHeaders});
                        case "DELETE":
                            return $http.delete(query, {headers : requestHeaders});
                    }
                };
            },
            
            getMetadata: function() {
                return this.performAnonymousQuery("GET")("https://graph.microsoft.com/" + this.selectedVersion + "/$metadata");
            }
        }
    }]);
var s;
var GraphBaseUrl = "https://graph.microsoft.com/";
var GraphVersions = ['beta', 'v1.0'];
angular.module('ApiExplorer')
    .controller('ApiExplorerCtrl', ['$scope', '$http', '$location', 'ApiExplorerSvc', '$timeout', '$templateCache', '$mdDialog', '$sce', function ($scope, $http, $location, apiService, $timeout, $templateCache, $mdDialog, $sce) {
        s = $scope;
        $scope.userInfo = {};
        $scope.getAssetPath = function (relPath) {
            return s.pathToBuildDir + "/" + relPath;
        };
        $scope.finishAdminConsertFlow = function () {
            hello('msft_token_refresh').login({
                display: 'popup',
                response_type: "token",
                redirect_uri: $scope.redirectUrl,
                scope: $scope.scopes + " " + $scope.adminScopes,
                response_mode: 'fragment',
                prompt: 'none',
                domain_hint: 'organizations',
                login_hint: $scope.userInfo.preferred_username
            }, function (res) {
                if (res.authResponse) {
                    var accessToken = res.authResponse.access_token;
                    $http.defaults.headers.common['Authorization'] = 'Bearer ' + accessToken;
                }
            }, function (res) {
                console.error(res);
            });
        };
        hello.on('auth.login', function (auth) {
            var accessToken;
            if (auth.network == "msft_token_refresh") {
                accessToken = hello('msft_token_refresh').getAuthResponse().access_token;
            }
            else if (auth.network == "msft") {
                var authResponse = hello('msft').getAuthResponse();
                accessToken = authResponse.access_token;
            }
            if (accessToken) {
                $http.defaults.headers.common['Authorization'] = 'Bearer ' + accessToken;
                apiService.performQuery("GET")("https://graph.microsoft.com/v1.0/me")
                    .then(function (result) {
                    var resultBody = result.data;
                    $scope.userInfo = {
                        preferred_username: resultBody.mail
                    };
                }, function (res) {
                    console.error(res);
                });
            }
        });
        $scope.tabConfig = {
            disableRequestBodyEditor: true,
            hideContent: true,
            selected: 0
        };
        $scope.showImage = false;
        $scope.tabConfig.previousSelected = $scope.tabConfig.selected;
        $scope.processTabClick = function () {
            var switchingTabs = $scope.tabConfig.previousSelected != $scope.tabConfig.selected;
            if (!switchingTabs)
                $scope.tabConfig.hideContent = !$scope.tabConfig.hideContent;
            $scope.tabConfig.previousSelected = $scope.tabConfig.selected;
        };
        var requestVal = $location.search().request;
        var actionVal = $location.search().method;
        var bodyVal = $location.search().body;
        var versionVal = $location.search().version;
        var headersVal = $location.search().headers;
        handleQueryString(apiService, actionVal, versionVal, requestVal);
        $timeout(function () {
            initializeHeadersEditor(headersVal);
            initializeJsonViewer($scope, apiService);
        });
        parseMetadata(apiService);
        $scope.isAuthenticated = function () {
            var session = hello('msft').getAuthResponse();
            if (session === null)
                return false;
            var currentTime = (new Date()).getTime() / 1000;
            return session && session.access_token && session.expires > currentTime;
        };
        $scope.$watch("getEditor()", function (event, args) {
            initializeJsonEditor(bodyVal);
        });
        $scope.login = function () {
            hello('msft').login({
                display: 'page',
                response_type: "id_token token",
                nonce: 'graph_explorer',
                prompt: 'login',
                msafed: 0
            }, function (res) {
            }, function () {
                console.error('error signing in');
            });
        };
        $scope.logout = function () {
            apiService.selectedOption = "GET";
            $scope.tabConfig.disableRequestBodyEditor = true;
            setSelectedTab(0);
            hello('msft').logout(null, { force: true });
            delete $scope.userInfo;
        };
        $scope.getSearchText = function () {
            return apiService.text;
        };
        $scope.getCurrentEntityName = function () {
            if (!apiService.text)
                return null;
            var txt = apiService.text;
            var pathArr = txt.split("/").filter((function (a) { return a.length > 0; }));
            return pathArr.pop();
        };
        $scope.canInsertTemplate = function () {
            return apiService.selectedOption == "POST" && checkCanInsertTemplate(apiService.text);
        };
        $scope.insertPostTemplate = function () {
            var entity = $scope.getCurrentEntityName();
            var strToInsert = JSON.stringify(postTemplates[entity], null, 2).trim();
            var fullUserEmail = $scope.userInfo.preferred_username;
            var domain = fullUserEmail.split("@")[1];
            strToInsert = strToInsert.replace(/AUTHENTICATED_DOMAIN/g, domain);
            strToInsert = strToInsert.replace(/FULL_USER_EMAIL/g, fullUserEmail);
            initializeJsonEditor(strToInsert);
        };
        function checkCanInsertTemplate(URL) {
            s;
            var entity = $scope.getCurrentEntityName();
            var canInsertTemplate = entity in postTemplates;
            return canInsertTemplate;
        }
        $scope.showShareDialog = function (ev) {
            $mdDialog.show({
                controller: ShareDialogController,
                templateUrl: pathToBuildDir + '/assets/views/shareDialog.tmpl.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: true,
                scope: $scope.$new(),
                locals: {
                    apiService: apiService,
                    $sce: $sce,
                    headers: formatRequestHeaders(getHeadersEditor().getSession().getValue()),
                    body: getJsonViewer().getSession().getValue()
                },
            })
                .then(function (answer) {
                $scope.status = 'You said the information was "' + answer + '".';
            }, function () {
                $scope.status = 'You cancelled the dialog.';
            });
        };
    }]);
angular.module('ApiExplorer')
    .controller('DropdownCtrl', ['$scope', 'ApiExplorerSvc', function ($scope, apiService) {
        $scope.onItemClick = function (choice) {
            if (choice != apiService.selectedOption) {
                apiService.selectedOption = choice;
                apiService.text = apiService.text.replace(/https:\/\/graph.microsoft.com($|\/([\w]|\.)*($|\/))/, ("https://graph.microsoft.com/" + apiService.selectedVersion + "/"));
                if (choice == 'POST' || choice == 'PATCH') {
                    showRequestBodyEditor();
                }
                else if (choice == 'GET' || choice == 'DELETE') {
                    s.tabConfig.disableRequestBodyEditor = true;
                    setSelectedTab(0);
                }
            }
        };
        $scope.items = [
            'GET',
            'POST',
            'PATCH',
            'DELETE'
        ];
        $scope.getServiceOption = function () {
            return apiService.selectedOption;
        };
    }]);
angular.module('ApiExplorer')
    .controller('VersionCtrl', ['$scope', 'ApiExplorerSvc', function ($scope, apiService) {
        $scope.items = GraphVersions;
        $scope.getServiceVersion = function () {
            return apiService.selectedVersion;
        };
        $scope.onItemClick = function (choice) {
            if (apiService.selectedVersion !== choice) {
                apiService.selectedVersion = choice;
                apiService.text = apiService.text.replace(/https:\/\/graph.microsoft.com($|\/([\w]|\.)*($|\/))/, ("https://graph.microsoft.com/" + apiService.selectedVersion + "/"));
                $scope.$parent.$broadcast('updateUrlFromServiceText');
                parseMetadata(apiService);
            }
        };
    }]);
angular.module('ApiExplorer').controller('datalistCtrl', ['$scope', 'ApiExplorerSvc', function ($scope, apiService) {
        $scope.searchTextChange = function (searchText) {
            apiService.text = searchText;
            var graphPathStartingWithVersion = searchText.split(GraphBaseUrl);
            if (graphPathStartingWithVersion.length < 2) {
                return;
            }
            var possibleGraphPathArr = graphPathStartingWithVersion[1].split('/');
            if (possibleGraphPathArr.length == 0) {
                return;
            }
            var possibleVersion = possibleGraphPathArr[0];
            if (GraphVersions.indexOf(possibleVersion) != -1) {
                apiService.selectedVersion = possibleVersion;
                parseMetadata(apiService);
            }
        };
        $scope.getRequestHistory = function () {
            return requestHistory;
        };
        $scope.$on('updateUrlFromServiceText', function (event, data) {
            $scope.text = apiService.text;
        });
        $scope.searchTextChange(apiService.text);
        $scope.searchText = apiService.text;
        $scope.getMatches = function (query) {
            var urls = getUrlsFromServiceURL(apiService);
            return urls.filter(function (option) {
                var queryInOption = (option.indexOf(query) > -1);
                return queryInOption;
            });
        };
        if (window['runTests'])
            runAutoCompleteTests(apiService);
    }]);
angular.module('ApiExplorer').controller('FormCtrl', ['$scope', 'ApiExplorerSvc', function ($scope, apiService) {
        $scope.requestInProgress = false;
        $scope.insufficientPrivileges = false;
        if (hello('msft').getAuthResponse() != null &&
            (apiService.selectedOption === 'POST' || apiService.selectedOption === 'PATCH')) {
            showRequestBodyEditor();
        }
        else {
            setSelectedTab(0);
        }
        $scope.$parent.$on("urlChange", function (event, args) {
            msGraphLinkResolution($scope, getJsonViewer().getSession().getValue(), args, apiService);
        });
        $scope.historyOnClick = function (historyItem) {
            apiService.text = historyItem.urlText;
            $scope.$broadcast('updateUrlFromServiceText');
            apiService.selectedVersion = historyItem.selectedVersion;
            apiService.selectedOption = historyItem.htmlOption;
            parseMetadata(apiService);
            if (historyItem.htmlOption == 'POST' || historyItem.htmlOption == 'PATCH') {
                if (getJsonViewer()) {
                    getJsonViewer().getSession().setValue(historyItem.jsonInput);
                }
                else {
                    console.error("json editor watch event not firing");
                }
            }
            else {
                if (getJsonViewer()) {
                    getJsonViewer().getSession().setValue("");
                }
            }
            $scope.submit();
        };
        $scope.closeAdminConsentBar = function () {
            $scope.insufficientPrivileges = false;
        };
        $scope.getAdminConsent = function () {
            hello('msft_admin_consent').login({
                display: 'popup'
            }).then(function () {
                $scope.finishAdminConsertFlow();
            }, function () {
                $scope.finishAdminConsertFlow();
            });
        };
        $scope.submit = function () {
            $scope.requestInProgress = true;
            var historyObj = {
                urlText: apiService.text,
                selectedVersion: apiService.selectedVersion,
                htmlOption: apiService.selectedOption,
                jsonInput: null
            };
            if (historyObj.htmlOption == 'POST' || historyObj.htmlOption == 'PATCH') {
                historyObj.jsonInput = getRequestBodyEditor().getSession().getValue();
            }
            $scope.showImage = false;
            var postBody;
            if (getRequestBodyEditor() != undefined) {
                postBody = getRequestBodyEditor().getSession().getValue();
            }
            var requestHeaders = "";
            if (getHeadersEditor() != undefined) {
                requestHeaders = getHeadersEditor().getSession().getValue();
                requestHeaders = formatRequestHeaders(requestHeaders);
            }
            var startTime = new Date();
            function handleSuccessfulQueryResponse(result) {
                var status = result.status;
                var headers = result.headers;
                var resultBody = result.data;
                if (isImageResponse(headers)) {
                    handleImageResponse($scope, apiService, startTime, headers, status, handleUnsuccessfulQueryResponse);
                }
                else if (isHtmlResponse(headers)) {
                    handleHtmlResponse($scope, startTime, resultBody, headers, status);
                }
                else if (isXmlResponse(result)) {
                    handleXmlResponse($scope, startTime, resultBody, headers, status);
                }
                else {
                    handleJsonResponse($scope, startTime, resultBody, headers, status);
                }
                historyObj.duration = (new Date()).getTime() - startTime.getTime();
                saveHistoryObject(historyObj, status);
                $scope.insufficientPrivileges = false;
            }
            function handleUnsuccessfulQueryResponse(result) {
                var status = result.status;
                var headers = result.headers;
                handleJsonResponse($scope, startTime, result.data, headers, status);
                historyObj.duration = (new Date()).getTime() - startTime.getTime();
                saveHistoryObject(historyObj, status);
                if (status === 401 || status === 403) {
                    $scope.insufficientPrivileges = true;
                }
            }
            if ($scope.isAuthenticated()) {
                apiService.performQuery(apiService.selectedOption)(apiService.text, postBody, requestHeaders)
                    .then(handleSuccessfulQueryResponse, handleUnsuccessfulQueryResponse);
            }
            else {
                apiService.performAnonymousQuery(apiService.selectedOption)(apiService.text, postBody, requestHeaders)
                    .then(handleSuccessfulQueryResponse, handleUnsuccessfulQueryResponse);
            }
        };
    }]);
//# sourceMappingURL=api-explorer-ctrl.js.map
var scripts = document.getElementsByTagName("script");
var src = scripts[scripts.length - 1].src;
var pathToBuildDir = src.split('/').slice(0, -2).join('/');
angular.module('ApiExplorer')
    .directive('apiExplorer', function () {
    return {
        scope: {
            strings: '=',
            language: '=',
            scopes: '=',
            adminScopes: '=',
            clientId: '=',
            redirectUrl: '='
        },
        templateUrl: pathToBuildDir + '/assets/views/explorer.html',
        controller: function ($scope) {
            $scope.pathToBuildDir = pathToBuildDir;
            $scope.str = loc_strings['en_us'];
            if ($scope.language) {
                $scope.str = loc_strings[$scope.language];
            }
            angular.extend($scope.str, $scope.strings);
            hello.init({
                msft: $scope.clientId
            }, {
                scope: $scope.scopes,
                redirect_uri: window.location.pathname
            });
            hello.init({
                msft_admin_consent: $scope.clientId,
                msft_token_refresh: $scope.clientId,
            }, {
                redirect_uri: window.location.pathname
            });
        }
    };
});
//# sourceMappingURL=api-explorer-directive.js.map
function getRequestBodyEditor() {
    var requestBodyEditorElement = document.getElementById("jsonEditor");
    return ace.edit(requestBodyEditorElement);
}
function getHeadersEditor() {
    var requestHeaderEditorElement = document.getElementById("jsonEditorHeaders");
    return ace.edit(requestHeaderEditorElement);
}
function getJsonViewer() {
    var jsonViewerElement = document.getElementById("jsonViewer");
    return ace.edit(jsonViewerElement);
}
function initializeJsonEditor(bodyVal) {
    var editor = getRequestBodyEditor();
    commonAceSetup(editor);
    editor.getSession().setMode("ace/mode/javascript");
    if (bodyVal) {
        editor.getSession().insert({ row: 0, column: 0 }, bodyVal);
    }
}
function initializeHeadersEditor(headersVal) {
    var editor = getHeadersEditor();
    commonAceSetup(editor);
    if (headersVal) {
        editor.getSession().insert(0, headersVal);
    }
    editor.moveCursorTo(1, 0);
}
function commonAceSetup(editor) {
    editor.setShowPrintMargin(false);
    editor.$blockScrolling = Infinity;
    editor.renderer.setOption('showLineNumbers', false);
    editor.commands.bindKey("Tab", null);
}
//# sourceMappingURL=api-explorer-jseditor.js.map
function endsWithSlash(serviceText) {
    return serviceText.charAt(serviceText.length - 1) == '/';
}
function msGraphLinkResolution($scope, body, args, service) {
    if (args.indexOf("https://") == -1) {
        if (service.text.indexOf(args.substr(1)) != -1) {
        }
        else if (service.text.indexOf("/me") != -1 && service.text.indexOf("/me/") == -1 && service.text.indexOf("/memberOf") == -1) {
            service.text = service.text.replace("/me", "") + "/users/" + args.substr(1);
        }
        else {
            var index = body.indexOf(args.substr(1));
            var typeIndex = body.lastIndexOf('@odata.type', index);
            if (typeIndex != -1) {
                var typeIndexEnd = body.indexOf("\n", typeIndex);
                var type = body.substr(typeIndex, typeIndexEnd - typeIndex);
                type = type.replace("@odata.type\": \"#microsoft.graph.", "");
                type = type.replace("\"", "").replace(",", "");
                service.text = "https://graph.microsoft.com/v1.0/" + type + "s/" + args.substr(1);
            }
            else {
                if (service.text.indexOf("?") != -1) {
                    service.text = service.text.substr(0, service.text.indexOf("?"));
                }
                var linkUrl = [service.text, args.substr(1)];
                if (endsWithSlash(service.text))
                    service.text = linkUrl.join("");
                else
                    service.text = linkUrl.join("/");
            }
        }
    }
    else {
        service.text = args.replace("\"", "");
    }
    if (service.text && endsWithSlash(service.text)) {
        service.text += '/';
    }
    $scope.$broadcast('updateUrlFromServiceText');
    $scope.submit();
}
//# sourceMappingURL=api-explorer-msgraph.js.map
hello.init({
    msft: {
        oauth: {
            version: 2,
            auth: 'https://login.microsoftonline.com/organizations/oauth2/v2.0/authorize',
            grant: 'https://login.microsoftonline.com/organizations/oauth2/v2.0/token'
        },
        scope_delim: ' ',
        form: false
    }, msft_admin_consent: {
        oauth: {
            version: 2,
            auth: 'https://login.microsoftonline.com/common/adminconsent',
            grant: 'https://login.microsoftonline.com/common/oauth2/v2.0/token'
        },
        scope_delim: ' ',
        form: false
    }, msft_token_refresh: {
        oauth: {
            version: 2,
            auth: 'https://login.microsoftonline.com/common/oauth2/v2.0/authorize',
            grant: 'https://login.microsoftonline.com/common/oauth2/v2.0/token'
        },
        scope_delim: ' ',
        form: false
    }
});
//# sourceMappingURL=auth.js.map
function createShareLink(fullRequestUrl, action, version) {    
    return window.location.origin + window.location.pathname + "?request=" + extractGraphEndpoint(fullRequestUrl) + "&method=" + action + "&version=" + version;
}

function extractGraphEndpoint(fullRequestUrl) {
    requestUrl = fullRequestUrl.split('.com')
    requestUrl.shift();
    
    var requestUrlComponents = requestUrl[0].split('/');
    requestUrlComponents.shift(); //remove empty item
    requestUrlComponents.shift(); //remove version
    return (requestUrlComponents.join('/'));
}

function isPostOrPatch(option) {
    return  option == "POST" || option == "PATCH";
}

function ShareDialogController($scope, $mdDialog, apiService, $sce, headers, body) {
    var _apiService = apiService;
    $scope.hide = function() {
        $mdDialog.hide();
    };

    $scope.cancel = function() {
        $mdDialog.cancel();
    };
    
    $scope.getShareLink = function() {
        var requestUrl = $scope.getSearchText();
        return createShareLink(requestUrl, _apiService.selectedOption, _apiService.selectedVersion);
    }

    $scope.generateSuperAgentCode = function() {
        var requestUrl = $scope.getSearchText();

        var fullGraphUrl = "https://graph.microsoft.com/" + _apiService.selectedVersion + "/" + extractGraphEndpoint(requestUrl);

        var tab = function() {
            return "<span style='padding-left:15px'></span>";
        }

        var line = function() {
            return "<br>"
        }

        var str = "request";
        str += line() + tab() + "." + _apiService.selectedOption.toLocaleLowerCase() + "(\"" + fullGraphUrl + "\")"

        if (Object.keys(headers).length > 0) {
            str += line() + tab() + ".set(" + JSON.stringify(headers) + ")";
        }

        if (isPostOrPatch( _apiService.selectedOption)) {
            try {
                var bodyObj = JSON.parse(body);
                if (bodyObj) {
                    str += line() + tab() + ".send(" + JSON.stringify(bodyObj) + ")";
                }
            } catch(e) {

            }
        }
 
        str += line() + tab() + ".end(function(err, res) {"
        str += line() + tab() + tab() + "console.log(res);"
        str += line() + tab() + "});"
        return $sce.trustAsHtml(str);
    }
}
function initializeJsonViewer($scope, apiService) {
    $(document).ready(function () {
        var jsonViewer = getJsonViewer();
        commonAceSetup(jsonViewer);
        jsonViewer.getSession().setMode("ace/mode/javascript");
        jsonViewer.setOptions({
            readOnly: true,
            highlightActiveLine: false,
            highlightGutterLine: false,
        });
        jsonViewer.getSession().setUseWorker(false);
        jsonViewer.renderer.$cursorLayer.element.style.opacity = 0;
        define("hoverlink", ["require", "exports"], function (require, exports, module) {
            "use strict";
            var oop = require("ace/lib/oop");
            var event = require("ace/lib/event");
            var Range = require("ace/range").Range;
            var EventEmitter = require("ace/lib/event_emitter").EventEmitter;
            var HoverLink = function (jsonViewer) {
                if (jsonViewer.hoverLink)
                    return;
                jsonViewer.hoverLink = this;
                this.jsonViewer = jsonViewer;
                this.update = this.update.bind(this);
                this.onMouseMove = this.onMouseMove.bind(this);
                this.onMouseOut = this.onMouseOut.bind(this);
                this.onClick = this.onClick.bind(this);
                event.addListener(jsonViewer.renderer.scroller, "mousemove", this.onMouseMove);
                event.addListener(jsonViewer.renderer.content, "mouseout", this.onMouseOut);
                event.addListener(jsonViewer.renderer.content, "click", this.onClick);
            };
            (function () {
                oop.implement(this, EventEmitter);
                this.token = {};
                this.range = new Range();
                this.update = function () {
                    this.$timer = null;
                    var jsonViewer = this.jsonViewer;
                    var renderer = jsonViewer.renderer;
                    var canvasPos = renderer.scroller.getBoundingClientRect();
                    var offset = (this.x + renderer.scrollLeft - canvasPos.left - renderer.$padding) / renderer.characterWidth;
                    var row = Math.floor((this.y + renderer.scrollTop - canvasPos.top) / renderer.lineHeight);
                    var col = Math.round(offset);
                    var screenPos = {
                        row: row,
                        column: col,
                        side: offset - col > 0 ? 1 : -1
                    };
                    var session = jsonViewer.session;
                    var docPos = session.screenToDocumentPosition(screenPos.row, screenPos.column);
                    var selectionRange = jsonViewer.selection.getRange();
                    if (!selectionRange.isEmpty()) {
                        if (selectionRange.start.row <= row && selectionRange.end.row >= row)
                            return this.clear();
                    }
                    var line = jsonViewer.session.getLine(docPos.row);
                    if (docPos.column == line.length) {
                        var clippedPos = jsonViewer.session.documentToScreenPosition(docPos.row, docPos.column);
                        if (clippedPos.column != screenPos.column) {
                            return this.clear();
                        }
                    }
                    var token = this.findLink(docPos.row, docPos.column);
                    this.link = token;
                    if (!token) {
                        return this.clear();
                    }
                    this.isOpen = true;
                    jsonViewer.renderer.setCursorStyle("pointer");
                    session.removeMarker(this.marker);
                    this.range = new Range(token.row, token.start, token.row, token.start + token.value.length);
                    this.marker = session.addMarker(this.range, "ace_link_marker", "text", true);
                };
                this.clear = function () {
                    if (this.isOpen) {
                        this.jsonViewer.session.removeMarker(this.marker);
                        this.jsonViewer.renderer.setCursorStyle("");
                        this.isOpen = false;
                    }
                };
                this.getMatchAround = function (regExp, string, col) {
                    var match;
                    regExp.lastIndex = 0;
                    string.replace(regExp, function (str) {
                        var offset = arguments[arguments.length - 2];
                        var length = str.length;
                        if (offset <= col && offset + length >= col)
                            match = {
                                start: offset,
                                value: str
                            };
                    });
                    return match;
                };
                this.onClick = function () {
                    var jsonViewer = this.jsonViewer;
                    var renderer = jsonViewer.renderer;
                    var canvasPos = renderer.scroller.getBoundingClientRect();
                    var offset = (this.x + renderer.scrollLeft - canvasPos.left - renderer.$padding) / renderer.characterWidth;
                    var row = Math.floor((this.y + renderer.scrollTop - canvasPos.top) / renderer.lineHeight);
                    var col = Math.round(offset);
                    if (this.link) {
                        if (row != this.link.row || !(col > this.link.start && col < this.link.start + this.link.value.length)) {
                            return;
                        }
                        this.link.jsonViewer = this.jsonViewer;
                        this._signal("open", this.link);
                        this.clear();
                    }
                };
                this.findLink = function (row, column) {
                    var jsonViewer = this.jsonViewer;
                    var session = jsonViewer.session;
                    var line = session.getLine(row);
                    var match = this.getMatchAround(/https?:\/\/[^\s"]+/g, line, column);
                    if (!match) {
                        var match = this.getMatchAround(/"id": "[^\s"']+/g, line, column);
                        if (!match)
                            return;
                        match = this.getMatchAround(/"[^\s"']+/g, line, column);
                        if (!match)
                            return;
                    }
                    match.row = row;
                    return match;
                };
                this.onMouseMove = function (e) {
                    if (this.jsonViewer.$mouseHandler.isMousePressed) {
                        if (!this.jsonViewer.selection.isEmpty())
                            this.clear();
                        return;
                    }
                    this.x = e.clientX;
                    this.y = e.clientY;
                    this.update();
                };
                this.onMouseOut = function (e) {
                    this.clear();
                };
                this.destroy = function () {
                    this.onMouseOut();
                    event.removeListener(this.jsonViewer.renderer.scroller, "mousemove", this.onMouseMove);
                    event.removeListener(this.jsonViewer.renderer.content, "mouseout", this.onMouseOut);
                    delete this.jsonViewer.hoverLink;
                };
            }).call(HoverLink.prototype);
            exports.HoverLink = HoverLink;
        });
        require(['hoverlink'], function (hoverlink) {
            var HoverLink = require("hoverlink").HoverLink;
            jsonViewer.hoverLink = new HoverLink(jsonViewer);
            jsonViewer.hoverLink.on("open", function (x) {
                run($scope, x.value, apiService);
            });
        });
    });
}
//# sourceMappingURL=api-explorer-jsviewer.js.map
'use strict';
var apiService;
(function (apiService) {
    function init(http, cacheFactory) {
        apiService.$http = http;
        apiService.cache = cacheFactory('myCache');
    }
    apiService.init = init;
    apiService.text = 'https://graph.microsoft.com/v1.0/me/';
    apiService.selectedVersion = "v1.0";
    apiService.selectedOption = "GET";
    apiService.performAnonymousQuery = function (queryType) {
        return function (query, postString, requestHeaders) {
            var headersObj = {
                "Authorization": "Bearer {token:https://graph.microsoft.com/}",
                "Accept": "application/json"
            };
            if (requestHeaders && requestHeaders["Authorization"]) {
                headersObj["Authorization"] = requestHeaders["Authorization"];
            }
            if (requestHeaders && requestHeaders["Accept"]) {
                headersObj["Accept"] = requestHeaders["Accept"];
            }
            var request = {
                url: 'https://proxy.apisandbox.msdn.microsoft.com/svc?url=' + encodeURIComponent(query),
                method: 'GET',
                headers: headersObj
            };
            if (queryType == "GET_BINARY") {
                request["responseType"] = "arraybuffer";
            }
            if (queryType == "GET_BINARY" || queryType == "GET") {
                return apiService.$http(request);
            }
        };
    };
    function performQuery(queryType) {
        return function (query, postString, requestHeaders) {
            switch (queryType) {
                case "GET":
                    return apiService.$http.get(query, { headers: requestHeaders });
                case "GET_BINARY":
                    return apiService.$http.get(query, { responseType: "arraybuffer" }, { headers: requestHeaders });
                case "POST":
                    return apiService.$http.post(query, postString, { headers: requestHeaders });
                case "PATCH":
                    return apiService.$http.patch(query, postString, { headers: requestHeaders });
                case "DELETE":
                    return apiService.$http.delete(query, { headers: requestHeaders });
            }
        };
    }
    apiService.performQuery = performQuery;
    function getMetadata() {
        return this.performAnonymousQuery("GET")("https://graph.microsoft.com/" + this.selectedVersion + "/$metadata");
    }
    apiService.getMetadata = getMetadata;
})(apiService || (apiService = {}));
;
//# sourceMappingURL=api-explorer-svc.js.map
var requestHistory = [];
var LocalStorageKeyGraphRequestHistory = "GRAPH_REQUEST_HISTORY";
function saveHistoryToLocalStorage() {
    localStorage.setItem(LocalStorageKeyGraphRequestHistory, JSON.stringify(requestHistory));
}
function loadHistoryFromLocalStorage() {
    var possibleHistory = localStorage.getItem(LocalStorageKeyGraphRequestHistory);
    if (possibleHistory == null) {
        return;
    }
    requestHistory = JSON.parse(possibleHistory);
}
function saveHistoryObject(historyObject, statusCode) {
    historyObject.successful = statusCode >= 200 && statusCode < 300;
    historyObject.statusCode = statusCode;
    historyObject.requestId = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 10);
    requestHistory.splice(0, 0, historyObject);
    saveHistoryToLocalStorage();
}
function fetchRequestHistory() {
    return requestHistory;
}
loadHistoryFromLocalStorage();
//# sourceMappingURL=history.js.map
var loc_strings = {};
loc_strings['fr-FR'] = { "To try the explorer, please ": "Pour essayer l’afficheur, veuillez ", "sign in": "se connecter", " with your work or school account from Microsoft.": " avec votre compte scolaire ou professionnel de Microsoft.", "Submit": "Envoyer", "Using demo tenant": "À l’aide du client de démonstration", "sign out": "se déconnecter", "History": "Historique", "Method": "Méthode", "Query": "Requête", "Status Code": "Code d'état", "Duration": "Durée", "Go": "Rechercher", "YES": "OUI", "NO": "NON", "request header": "en-tête de la demande", "request body": "corps de la demande", "response": "réponse" };
loc_strings['es-ES'] = { "To try the explorer, please ": "Para utilizar el probador, ", "sign in": "iniciar sesión", " with your work or school account from Microsoft.": " con su cuenta profesional o educativa de Microsoft.", "Submit": "Enviar", "Using demo tenant": "Uso de inquilinos de demostración", "sign out": "cerrar sesión", "History": "Historial", "Method": "Método", "Query": "Consulta", "Status Code": "Código de estado", "Duration": "Duración", "Go": "Ir", "YES": "SÍ", "NO": "NO", "request header": "encabezado de solicitud", "request body": "cuerpo de solicitud", "response": "respuesta" };
loc_strings['en-US'] = { "To try the explorer, please ": "To try the explorer, please ", "sign in": "sign in", " with your work or school account from Microsoft.": " with your work or school account from Microsoft.", "Submit": "Submit", "Using demo tenant": "Using demo tenant", "sign out": "sign out", "History": "History", "Method": "Method", "Query": "Query", "Status Code": "Status Code", "Duration": "Duration", "Go": "Go", "YES": "YES", "NO": "NO", "request header": "request header", "request body": "request body", "response": "response", "login_to_send_requests": "Login to change the request type", "ShareQuery": "Share Query" };
loc_strings['de-DE'] = { "To try the explorer, please ": "Um den Tester auszuprobieren, ", "sign in": "Anmelden", " with your work or school account from Microsoft.": " mit Ihrem Geschäfts- oder Schulkonto von Microsoft an.", "Submit": "Senden", "Using demo tenant": "Verwenden des Demomandanten", "sign out": "Abmelden", "History": "Verlauf", "Method": "Methode", "Query": "Abfrage", "Status Code": "Statuscode", "Duration": "Dauer", "Go": "OK", "YES": "JA", "NO": "NEIN", "request header": "Anforderungsheader", "request body": "Anforderungstextkörper", "response": "Antwort" };
loc_strings['ru-RU'] = { "To try the explorer, please ": "Чтобы опробовать песочницу, ", "sign in": "войти", " with your work or school account from Microsoft.": " с помощью рабочей или учебной учетной записи от корпорации Майкрософт.", "Submit": "Отправить", "Using demo tenant": "С помощью демонстрационного клиента", "sign out": "выйти", "History": "Журнал", "Method": "Метод", "Query": "Запрос", "Status Code": "Код состояния", "Duration": "Длительность", "Go": "Перейти", "YES": "ДА", "NO": "НЕТ", "request header": "заголовок запроса", "request body": "текст запроса", "response": "ответ" };
loc_strings['ja-JP'] = { "To try the explorer, please ": "エクスプローラーをお試しいただくには、Microsoft の職場または学校アカウントで ", "sign in": "サインイン", " with your work or school account from Microsoft.": " します。", "Submit": "送信", "Using demo tenant": "デモ テナントを使用しています", "sign out": "サインアウト", "History": "履歴", "Method": "メソッド", "Query": "クエリ", "Status Code": "状態コード", "Duration": "期間", "Go": "検索", "YES": "はい", "NO": "いいえ", "request header": "要求ヘッダー", "request body": "要求本文", "response": "応答" };
loc_strings['pt-BR'] = { "To try the explorer, please ": "Para experimentar o Explorador, ", "sign in": "entrar", " with your work or school account from Microsoft.": " com a sua conta corporativa ou de estudante da Microsoft.", "Submit": "Enviar", "Using demo tenant": "Usando o Locatário de Demonstração", "sign out": "sair", "History": "Histórico", "Method": "Método", "Query": "Consulta", "Status Code": "Código de Status", "Duration": "Duração", "Go": "Ir", "YES": "SIM", "NO": "NÃO", "request header": "cabeçalho da solicitação", "request body": "corpo da solicitação", "response": "resposta" };
loc_strings['zh-CN'] = { "To try the explorer, please ": "若要尝试浏览器，请 使用你的 Microsoft 工作或学校帐户", "sign in": "登录", " with your work or school account from Microsoft.": "。", "Submit": "提交", "Using demo tenant": "使用演示租户", "sign out": "注销", "History": "历史记录", "Method": "方法", "Query": "查询", "Status Code": "状态代码", "Duration": "持续时间", "Go": "转到", "YES": "是", "NO": "否", "request header": "请求标题", "request body": "请求正文", "response": "响应" };
//# sourceMappingURL=loc_strings.js.map
var postTemplates = {
    messages: {
        "subject": "Meet for lunch?",
        "body": {
            "contentType": "Text",
            "content": "The new cafeteria is open."
        },
        "toRecipients": [
            {
                "emailAddress": {
                    "address": "garthf@contoso.com"
                }
            }
        ]
    },
    events: {
        "subject": "My event",
        "start": {
            "dateTime": "2017-05-07T16:15:00.0000000",
            "timeZone": "UTC"
        },
        "end": {
            "dateTime": "2017-06-07T16:15:00.0000000",
            "timeZone": "UTC"
        },
    },
    sendMail: {
        "message": {
            "subject": "Meet for lunch?",
            "body": {
                "contentType": "Text",
                "content": "The new cafeteria is open."
            },
            "toRecipients": [
                {
                    "emailAddress": {
                        "address": "garthf@contoso.com"
                    }
                }
            ]
        },
        "saveToSentItems": "false"
    },
    findMeetingTimes: {
        "attendees": [
            {
                "emailAddress": {
                    "address": "FULL_USER_EMAIL",
                    "name": "Alex Darrow"
                },
                "type": "Required"
            }
        ],
        "timeConstraint": {
            "timeslots": [
                {
                    "start": {
                        "dateTime": "2016-10-20T07:00:00",
                        "timeZone": "Pacific Standard Time"
                    },
                    "end": {
                        "dateTime": "2016-10-20T17:00:00",
                        "timeZone": "Pacific Standard Time"
                    }
                }
            ]
        },
        "locationConstraint": {
            "isRequired": "false",
            "suggestLocation": "true",
            "locations": [
                {
                    "displayName": "Conf Room 32/1368",
                    "locationEmailAddress": "conf32room1368@imgeek.onmicrosoft.com"
                }
            ]
        },
        "meetingDuration": "PT1H"
    },
    users: {
        "accountEnabled": true,
        "city": "Seattle",
        "country": "United States",
        "department": "Sales & Marketing",
        "displayName": "Melissa Darrow",
        "givenName": "Melissa",
        "jobTitle": "Marketing Director",
        "mailNickname": "MelissaD",
        "passwordPolicies": "DisablePasswordExpiration",
        "passwordProfile": {
            "password": "Test1234",
            "forceChangePasswordNextSignIn": false
        },
        "officeLocation": "131/1105",
        "postalCode": "98052",
        "preferredLanguage": "en-US",
        "state": "WA",
        "streetAddress": "9256 Towne Center Dr., Suite 400",
        "surname": "Darrow",
        "mobilePhone": "+1 206 555 0110",
        "usageLocation": "US",
        "userPrincipalName": "MelissaD@AUTHENTICATED_DOMAIN",
    },
    groups: {
        "@odata.type": "#Microsoft.Graph.Group",
        "description": "This group is the best ever",
        "displayName": "Unified group 3ef15",
        "groupTypes": [
            "Unified"
        ],
        "mailEnabled": true,
        "mailNickname": "Group911e5",
        "securityEnabled": true
    },
    contacts: {
        "givenName": "Pavel",
        "surname": "Bansky",
        "emailAddresses": [
            {
                "address": "pavelb@fabrikam.onmicrosoft.com",
                "name": "Pavel Bansky"
            }
        ],
        "businessPhones": [
            "+1 732 555 0102"
        ]
    }
};
var templateNames = {
    messages: 'message',
    events: 'event',
    sendMail: 'email'
};
//# sourceMappingURL=postTemplates.js.map
function createShareLink(fullRequestUrl, action, version) {
    return window.location.origin + window.location.pathname + "?request=" + extractGraphEndpoint(fullRequestUrl) + "&method=" + action + "&version=" + version;
}
function extractGraphEndpoint(fullRequestUrl) {
    var requestUrl = fullRequestUrl.split('.com');
    requestUrl.shift();
    var requestUrlComponents = requestUrl[0].split('/');
    requestUrlComponents.shift();
    requestUrlComponents.shift();
    return (requestUrlComponents.join('/'));
}
function isPostOrPatch(option) {
    return option == "POST" || option == "PATCH";
}
function ShareDialogController($scope, $mdDialog, apiService, $sce, headers, body) {
    var _apiService = apiService;
    $scope.hide = function () {
        $mdDialog.hide();
    };
    $scope.cancel = function () {
        $mdDialog.cancel();
    };
    $scope.getShareLink = function () {
        var requestUrl = $scope.getSearchText();
        return createShareLink(requestUrl, _apiService.selectedOption, _apiService.selectedVersion);
    };
    $scope.generateSuperAgentCode = function () {
        var requestUrl = $scope.getSearchText();
        var fullGraphUrl = "https://graph.microsoft.com/" + _apiService.selectedVersion + "/" + extractGraphEndpoint(requestUrl);
        var tab = function () {
            return "<span style='padding-left:15px'></span>";
        };
        var line = function () {
            return "<br>";
        };
        var str = "request";
        str += line() + tab() + "." + _apiService.selectedOption.toLocaleLowerCase() + "(\"" + fullGraphUrl + "\")";
        if (Object.keys(headers).length > 0) {
            str += line() + tab() + ".set(" + JSON.stringify(headers) + ")";
        }
        if (isPostOrPatch(_apiService.selectedOption)) {
            try {
                var bodyObj = JSON.parse(body);
                if (bodyObj) {
                    str += line() + tab() + ".send(" + JSON.stringify(bodyObj) + ")";
                }
            }
            catch (e) {
            }
        }
        str += line() + tab() + ".end(function(err, res) {";
        str += line() + tab() + tab() + "console.log(res);";
        str += line() + tab() + "});";
        return $sce.trustAsHtml(str);
    };
}
//# sourceMappingURL=share-dialog.js.map
var simOptions = {};
var link, node;
function startSimFromGraphResponse(data) {
    var nodes = [];
    var links = [];
    var lastGraphNode = constructGraphLinksFromFullPath(apiService.text).pop();
    var entityId = data['id'];
    nodes.push({
        id: entityId,
        type: "entity",
        label: data['displayName']
    });
    for (var key in data) {
        if (key.indexOf("odata") != -1)
            continue;
        if (data[key] === null)
            continue;
        nodes.push({
            id: entityId + key,
            type: "PROPERTY_KEY",
            label: key
        });
        links.push({
            source: entityId,
            target: entityId + key
        });
        var propertyValueNodeId = "value-" + entityId + key;
        nodes.push({
            id: propertyValueNodeId,
            type: "PROPERTY_VALUE",
            label: JSON.stringify(data[key])
        });
        links.push({
            source: propertyValueNodeId,
            target: entityId + key
        });
    }
    var entityLinks = getEntityFromTypeName(lastGraphNode.type).links;
    for (var entityLink in entityLinks) {
        var link_1 = entityLinks[entityLink];
        if (link_1.tagName == "NAVIGATIONPROPERTY") {
            var nodeId = "$nav_property_" + entityId + "_" + link_1.name;
            nodes.push({
                id: nodeId,
                label: link_1.name,
                type: "NAVIGATIONPROPERTY"
            });
            links.push({
                source: entityId,
                target: nodeId
            });
        }
    }
    startSim(nodes, links);
}
function startSim(nodes, links) {
    simOptions.svg = d3.select("#visual-explorer");
    simOptions.svg.selectAll("*").remove();
    simOptions.width = simOptions.svg.attr("width");
    simOptions.height = simOptions.svg.attr("height");
    simOptions.nodes = nodes;
    simOptions.links = links;
    var manyBodyForce = d3.forceManyBody().strength([-500]);
    simOptions.simulation = d3.forceSimulation()
        .force("link", d3.forceLink().id(function (d) { return d.id; }).distance(function (link) { return link.target.type == "NAVIGATIONPROPERTY" ? 400 : 100; }))
        .force("charge", manyBodyForce)
        .force("center", d3.forceCenter(simOptions.width / 2, simOptions.height / 2));
    initLinks();
    initNodes();
    resetSimulation();
}
function initLinks() {
    link = simOptions.svg.append("g")
        .attr("class", "links")
        .selectAll("line")
        .enter().append("line");
}
function initNodes() {
    node = simOptions.svg.selectAll(".node")
        .enter().append("g")
        .attr("class", "node");
    return node;
}
function commonLinkSetup(l) {
    return l
        .attr("stroke-width", function (d) { return 5; });
}
function resetLinks() {
    link = link.data(simOptions.links);
    link.exit().remove();
    link = commonLinkSetup(link.enter().append("line")).merge(link);
    return link;
}
function commonNodeSetup(n) {
    var color = d3.scaleOrdinal(d3.schemeCategory20);
    return n.attr("r", 50)
        .attr("fill", function (d) { return color(d.type); })
        .attr("stroke", "#757575")
        .attr("stroke-width", 0)
        .call(d3.drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended));
}
function resetSvgNodes() {
    node = node.data(simOptions.nodes, function (d) { return d.id; });
    node.exit().remove();
    var baseEl = node
        .enter().append("g");
    commonNodeSetup(baseEl
        .append("circle")
        .attr("class", "node"));
    var circles = baseEl.selectAll("circle");
    circles.on("mouseover", function () { d3.select(this).transition().attr("stroke-width", "3").style("cursor", "pointer"); });
    circles.on("mouseout", function () { d3.select(this).transition().attr("stroke-width", "0").style("cursor", "default"); });
    baseEl.append("text")
        .text(function (d) { return d.label; });
    return baseEl;
}
function resetSimulation() {
    var nodeBaseElements = resetSvgNodes();
    var links = resetLinks();
    simOptions.simulation
        .nodes(simOptions.nodes)
        .on("tick", function () {
        ticked(nodeBaseElements, links);
    });
    simOptions.simulation
        .force("link")
        .links(simOptions.links);
    simOptions.simulation.alphaTarget(0.3).restart();
}
function ticked(nodes, links) {
    links
        .attr("x1", function (d) { return d.source.x; })
        .attr("y1", function (d) { return d.source.y; })
        .attr("x2", function (d) { return d.target.x; })
        .attr("y2", function (d) { return d.target.y; });
    nodes.selectAll("circle").attr("transform", function (d) { return "translate(" + d.x + "," + d.y + ")"; });
    nodes.selectAll("text").attr("transform", function (d) { return "translate(" + d.x + "," + d.y + ")"; });
}
function dragstarted(d) {
    if (!d3.event.active)
        simOptions.simulation.alphaTarget(0.3).restart();
    d.fx = d.x;
    d.fy = d.y;
}
function dragged(d) {
    d.fx = d3.event.x;
    d.fy = d3.event.y;
}
function dragended(d) {
    if (!d3.event.active)
        simOptions.simulation.alphaTarget(0);
    d.fx = null;
    d.fy = null;
}
//# sourceMappingURL=visualizer.js.map
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImhlbGxvLmFsbC5taW4uanMiLCJhcGktZXhwbG9yZXItaW5pdC5qcyIsImFwaS1leHBsb3Jlci1oZWxwZXJzLmpzIiwiYXBpLWV4cGxvcmVyLWFwcC5qcyIsImFwaS1leHBsb3Jlci1zdmMuanMiLCJhcGktZXhwbG9yZXItY3RybC5qcyIsImFwaS1leHBsb3Jlci1kaXJlY3RpdmUuanMiLCJhcGktZXhwbG9yZXItanNlZGl0b3IuanMiLCJhcGktZXhwbG9yZXItbXNncmFwaC5qcyIsImF1dGguanMiLCJzaGFyZS1kaWFsb2cuanMiLCJhcGktZXhwbG9yZXItanN2aWV3ZXIuanMiLCJoaXN0b3J5LmpzIiwibG9jX3N0cmluZ3MuanMiLCJwb3N0VGVtcGxhdGVzLmpzIiwidmlzdWFsaXplci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUNGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDakRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2xWQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2xCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3JFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDalZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNyQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2xDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN6Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUMzQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNyRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBUDdKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QVEzREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDdkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDVEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBSnJJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUt4REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJhbGwuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiEgaGVsbG9qcyB2MS4xNC4wIHwgKGMpIDIwMTItMjAxNiBBbmRyZXcgRG9kc29uIHwgTUlUIGh0dHBzOi8vYWRvZHNvbi5jb20vaGVsbG8uanMvTElDRU5TRSAqL1xyXG5PYmplY3QuY3JlYXRlfHwoT2JqZWN0LmNyZWF0ZT1mdW5jdGlvbigpe2Z1bmN0aW9uIGUoKXt9cmV0dXJuIGZ1bmN0aW9uKHQpe2lmKDEhPWFyZ3VtZW50cy5sZW5ndGgpdGhyb3cgbmV3IEVycm9yKFwiT2JqZWN0LmNyZWF0ZSBpbXBsZW1lbnRhdGlvbiBvbmx5IGFjY2VwdHMgb25lIHBhcmFtZXRlci5cIik7cmV0dXJuIGUucHJvdG90eXBlPXQsbmV3IGV9fSgpKSxPYmplY3Qua2V5c3x8KE9iamVjdC5rZXlzPWZ1bmN0aW9uKGUsdCxuKXtuPVtdO2Zvcih0IGluIGUpbi5oYXNPd25Qcm9wZXJ0eS5jYWxsKGUsdCkmJm4ucHVzaCh0KTtyZXR1cm4gbn0pLEFycmF5LnByb3RvdHlwZS5pbmRleE9mfHwoQXJyYXkucHJvdG90eXBlLmluZGV4T2Y9ZnVuY3Rpb24oZSl7Zm9yKHZhciB0PTA7dDx0aGlzLmxlbmd0aDt0KyspaWYodGhpc1t0XT09PWUpcmV0dXJuIHQ7cmV0dXJuLTF9KSxBcnJheS5wcm90b3R5cGUuZm9yRWFjaHx8KEFycmF5LnByb3RvdHlwZS5mb3JFYWNoPWZ1bmN0aW9uKGUpe2lmKHZvaWQgMD09PXRoaXN8fG51bGw9PT10aGlzKXRocm93IG5ldyBUeXBlRXJyb3I7dmFyIHQ9T2JqZWN0KHRoaXMpLG49dC5sZW5ndGg+Pj4wO2lmKFwiZnVuY3Rpb25cIiE9dHlwZW9mIGUpdGhyb3cgbmV3IFR5cGVFcnJvcjtmb3IodmFyIG89YXJndW1lbnRzLmxlbmd0aD49Mj9hcmd1bWVudHNbMV06dm9pZCAwLGk9MDtuPmk7aSsrKWkgaW4gdCYmZS5jYWxsKG8sdFtpXSxpLHQpO3JldHVybiB0aGlzfSksQXJyYXkucHJvdG90eXBlLmZpbHRlcnx8KEFycmF5LnByb3RvdHlwZS5maWx0ZXI9ZnVuY3Rpb24oZSx0KXt2YXIgbj1bXTtyZXR1cm4gdGhpcy5mb3JFYWNoKGZ1bmN0aW9uKG8saSxyKXtlLmNhbGwodHx8dm9pZCAwLG8saSxyKSYmbi5wdXNoKG8pfSksbn0pLEFycmF5LnByb3RvdHlwZS5tYXB8fChBcnJheS5wcm90b3R5cGUubWFwPWZ1bmN0aW9uKGUsdCl7dmFyIG49W107cmV0dXJuIHRoaXMuZm9yRWFjaChmdW5jdGlvbihvLGkscil7bi5wdXNoKGUuY2FsbCh0fHx2b2lkIDAsbyxpLHIpKX0pLG59KSxBcnJheS5pc0FycmF5fHwoQXJyYXkuaXNBcnJheT1mdW5jdGlvbihlKXtyZXR1cm5cIltvYmplY3QgQXJyYXldXCI9PT1PYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoZSl9KSxcIm9iamVjdFwiIT10eXBlb2Ygd2luZG93fHxcIm9iamVjdFwiIT10eXBlb2Ygd2luZG93LmxvY2F0aW9ufHx3aW5kb3cubG9jYXRpb24uYXNzaWdufHwod2luZG93LmxvY2F0aW9uLmFzc2lnbj1mdW5jdGlvbihlKXt3aW5kb3cubG9jYXRpb249ZX0pLEZ1bmN0aW9uLnByb3RvdHlwZS5iaW5kfHwoRnVuY3Rpb24ucHJvdG90eXBlLmJpbmQ9ZnVuY3Rpb24oZSl7ZnVuY3Rpb24gdCgpe31pZihcImZ1bmN0aW9uXCIhPXR5cGVvZiB0aGlzKXRocm93IG5ldyBUeXBlRXJyb3IoXCJGdW5jdGlvbi5wcm90b3R5cGUuYmluZCAtIHdoYXQgaXMgdHJ5aW5nIHRvIGJlIGJvdW5kIGlzIG5vdCBjYWxsYWJsZVwiKTt2YXIgbj1bXS5zbGljZSxvPW4uY2FsbChhcmd1bWVudHMsMSksaT10aGlzLHI9ZnVuY3Rpb24oKXtyZXR1cm4gaS5hcHBseSh0aGlzIGluc3RhbmNlb2YgdD90aGlzOmV8fHdpbmRvdyxvLmNvbmNhdChuLmNhbGwoYXJndW1lbnRzKSkpfTtyZXR1cm4gdC5wcm90b3R5cGU9dGhpcy5wcm90b3R5cGUsci5wcm90b3R5cGU9bmV3IHQscn0pO3ZhciBoZWxsbz1mdW5jdGlvbihlKXtyZXR1cm4gaGVsbG8udXNlKGUpfTtoZWxsby51dGlscz17ZXh0ZW5kOmZ1bmN0aW9uKGUpe3JldHVybiBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsMSkuZm9yRWFjaChmdW5jdGlvbih0KXtpZihBcnJheS5pc0FycmF5KGUpJiZBcnJheS5pc0FycmF5KHQpKUFycmF5LnByb3RvdHlwZS5wdXNoLmFwcGx5KGUsdCk7ZWxzZSBpZihlIGluc3RhbmNlb2YgT2JqZWN0JiZ0IGluc3RhbmNlb2YgT2JqZWN0JiZlIT09dClmb3IodmFyIG4gaW4gdCllW25dPWhlbGxvLnV0aWxzLmV4dGVuZChlW25dLHRbbl0pO2Vsc2UgQXJyYXkuaXNBcnJheSh0KSYmKHQ9dC5zbGljZSgwKSksZT10fSksZX19LGhlbGxvLnV0aWxzLmV4dGVuZChoZWxsbyx7c2V0dGluZ3M6e3JlZGlyZWN0X3VyaTp3aW5kb3cubG9jYXRpb24uaHJlZi5zcGxpdChcIiNcIilbMF0scmVzcG9uc2VfdHlwZTpcInRva2VuXCIsZGlzcGxheTpcInBvcHVwXCIsc3RhdGU6XCJcIixvYXV0aF9wcm94eTpcImh0dHBzOi8vYXV0aC1zZXJ2ZXIuaGVyb2t1YXBwLmNvbS9wcm94eVwiLHRpbWVvdXQ6MmU0LHBvcHVwOntyZXNpemFibGU6MSxzY3JvbGxiYXJzOjEsd2lkdGg6NTAwLGhlaWdodDo1NTB9LHNjb3BlOltcImJhc2ljXCJdLHNjb3BlX21hcDp7YmFzaWM6XCJcIn0sZGVmYXVsdF9zZXJ2aWNlOm51bGwsZm9yY2U6bnVsbCxwYWdlX3VyaTp3aW5kb3cubG9jYXRpb24uaHJlZn0sc2VydmljZXM6e30sdXNlOmZ1bmN0aW9uKGUpe3ZhciB0PU9iamVjdC5jcmVhdGUodGhpcyk7cmV0dXJuIHQuc2V0dGluZ3M9T2JqZWN0LmNyZWF0ZSh0aGlzLnNldHRpbmdzKSxlJiYodC5zZXR0aW5ncy5kZWZhdWx0X3NlcnZpY2U9ZSksdC51dGlscy5FdmVudC5jYWxsKHQpLHR9LGluaXQ6ZnVuY3Rpb24oZSx0KXt2YXIgbj10aGlzLnV0aWxzO2lmKCFlKXJldHVybiB0aGlzLnNlcnZpY2VzO2Zvcih2YXIgbyBpbiBlKWUuaGFzT3duUHJvcGVydHkobykmJlwib2JqZWN0XCIhPXR5cGVvZiBlW29dJiYoZVtvXT17aWQ6ZVtvXX0pO3JldHVybiBuLmV4dGVuZCh0aGlzLnNlcnZpY2VzLGUpLHQmJihuLmV4dGVuZCh0aGlzLnNldHRpbmdzLHQpLFwicmVkaXJlY3RfdXJpXCJpbiB0JiYodGhpcy5zZXR0aW5ncy5yZWRpcmVjdF91cmk9bi51cmwodC5yZWRpcmVjdF91cmkpLmhyZWYpKSx0aGlzfSxsb2dpbjpmdW5jdGlvbigpe2Z1bmN0aW9uIGUoZSx0KXtoZWxsby5lbWl0KGUsdCl9ZnVuY3Rpb24gdChlKXtyZXR1cm4gZX1mdW5jdGlvbiBuKGUpe3JldHVybiEhZX12YXIgbyxpPXRoaXMscj1pLnV0aWxzLGE9ci5lcnJvcixzPXIuUHJvbWlzZSgpLGw9ci5hcmdzKHtuZXR3b3JrOlwic1wiLG9wdGlvbnM6XCJvXCIsY2FsbGJhY2s6XCJmXCJ9LGFyZ3VtZW50cyksdT1yLmRpZmZLZXkobC5vcHRpb25zLGkuc2V0dGluZ3MpLGM9bC5vcHRpb25zPXIubWVyZ2UoaS5zZXR0aW5ncyxsLm9wdGlvbnN8fHt9KTtpZihjLnBvcHVwPXIubWVyZ2UoaS5zZXR0aW5ncy5wb3B1cCxsLm9wdGlvbnMucG9wdXB8fHt9KSxsLm5ldHdvcms9bC5uZXR3b3JrfHxpLnNldHRpbmdzLmRlZmF1bHRfc2VydmljZSxzLnByb3h5LnRoZW4obC5jYWxsYmFjayxsLmNhbGxiYWNrKSxzLnByb3h5LnRoZW4oZS5iaW5kKHRoaXMsXCJhdXRoLmxvZ2luIGF1dGhcIiksZS5iaW5kKHRoaXMsXCJhdXRoLmZhaWxlZCBhdXRoXCIpKSxcInN0cmluZ1wiIT10eXBlb2YgbC5uZXR3b3JrfHwhKGwubmV0d29yayBpbiBpLnNlcnZpY2VzKSlyZXR1cm4gcy5yZWplY3QoYShcImludmFsaWRfbmV0d29ya1wiLFwiVGhlIHByb3ZpZGVkIG5ldHdvcmsgd2FzIG5vdCByZWNvZ25pemVkXCIpKTt2YXIgZD1pLnNlcnZpY2VzW2wubmV0d29ya10sZj1yLmdsb2JhbEV2ZW50KGZ1bmN0aW9uKGUpe3ZhciB0O3Q9ZT9KU09OLnBhcnNlKGUpOmEoXCJjYW5jZWxsZWRcIixcIlRoZSBhdXRoZW50aWNhdGlvbiB3YXMgbm90IGNvbXBsZXRlZFwiKSx0LmVycm9yP3MucmVqZWN0KHQpOihyLnN0b3JlKHQubmV0d29yayx0KSxzLmZ1bGZpbGwoe25ldHdvcms6dC5uZXR3b3JrLGF1dGhSZXNwb25zZTp0fSkpfSkscD1yLnVybChjLnJlZGlyZWN0X3VyaSkuaHJlZixtPWQub2F1dGgucmVzcG9uc2VfdHlwZXx8Yy5yZXNwb25zZV90eXBlOy9cXGJjb2RlXFxiLy50ZXN0KG0pJiYhZC5vYXV0aC5ncmFudCYmKG09bS5yZXBsYWNlKC9cXGJjb2RlXFxiLyxcInRva2VuXCIpKSxsLnFzPXIubWVyZ2UodSx7Y2xpZW50X2lkOmVuY29kZVVSSUNvbXBvbmVudChkLmlkKSxyZXNwb25zZV90eXBlOmVuY29kZVVSSUNvbXBvbmVudChtKSxyZWRpcmVjdF91cmk6ZW5jb2RlVVJJQ29tcG9uZW50KHApLHN0YXRlOntjbGllbnRfaWQ6ZC5pZCxuZXR3b3JrOmwubmV0d29yayxkaXNwbGF5OmMuZGlzcGxheSxjYWxsYmFjazpmLHN0YXRlOmMuc3RhdGUscmVkaXJlY3RfdXJpOnB9fSk7dmFyIGg9ci5zdG9yZShsLm5ldHdvcmspLGc9L1ssXFxzXSsvLHY9aS5zZXR0aW5ncy5zY29wZT9baS5zZXR0aW5ncy5zY29wZS50b1N0cmluZygpXTpbXSx5PXIubWVyZ2UoaS5zZXR0aW5ncy5zY29wZV9tYXAsZC5zY29wZXx8e30pO2lmKGMuc2NvcGUmJnYucHVzaChjLnNjb3BlLnRvU3RyaW5nKCkpLGgmJlwic2NvcGVcImluIGgmJmguc2NvcGUgaW5zdGFuY2VvZiBTdHJpbmcmJnYucHVzaChoLnNjb3BlKSx2PXYuam9pbihcIixcIikuc3BsaXQoZyksdj1yLnVuaXF1ZSh2KS5maWx0ZXIobiksbC5xcy5zdGF0ZS5zY29wZT12LmpvaW4oXCIsXCIpLHY9di5tYXAoZnVuY3Rpb24oZSl7cmV0dXJuIGUgaW4geT95W2VdOmV9KSx2PXYuam9pbihcIixcIikuc3BsaXQoZyksdj1yLnVuaXF1ZSh2KS5maWx0ZXIobiksbC5xcy5zY29wZT12LmpvaW4oZC5zY29wZV9kZWxpbXx8XCIsXCIpLGMuZm9yY2U9PT0hMSYmaCYmXCJhY2Nlc3NfdG9rZW5cImluIGgmJmguYWNjZXNzX3Rva2VuJiZcImV4cGlyZXNcImluIGgmJmguZXhwaXJlcz4obmV3IERhdGUpLmdldFRpbWUoKS8xZTMpe3ZhciB3PXIuZGlmZigoaC5zY29wZXx8XCJcIikuc3BsaXQoZyksKGwucXMuc3RhdGUuc2NvcGV8fFwiXCIpLnNwbGl0KGcpKTtpZigwPT09dy5sZW5ndGgpcmV0dXJuIHMuZnVsZmlsbCh7dW5jaGFuZ2VkOiEwLG5ldHdvcms6bC5uZXR3b3JrLGF1dGhSZXNwb25zZTpofSksc31pZihcInBhZ2VcIj09PWMuZGlzcGxheSYmYy5wYWdlX3VyaSYmKGwucXMuc3RhdGUucGFnZV91cmk9ci51cmwoYy5wYWdlX3VyaSkuaHJlZiksXCJsb2dpblwiaW4gZCYmXCJmdW5jdGlvblwiPT10eXBlb2YgZC5sb2dpbiYmZC5sb2dpbihsKSwoIS9cXGJ0b2tlblxcYi8udGVzdChtKXx8cGFyc2VJbnQoZC5vYXV0aC52ZXJzaW9uLDEwKTwyfHxcIm5vbmVcIj09PWMuZGlzcGxheSYmZC5vYXV0aC5ncmFudCYmaCYmaC5yZWZyZXNoX3Rva2VuKSYmKGwucXMuc3RhdGUub2F1dGg9ZC5vYXV0aCxsLnFzLnN0YXRlLm9hdXRoX3Byb3h5PWMub2F1dGhfcHJveHkpLGwucXMuc3RhdGU9ZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KGwucXMuc3RhdGUpKSwxPT09cGFyc2VJbnQoZC5vYXV0aC52ZXJzaW9uLDEwKT9vPXIucXMoYy5vYXV0aF9wcm94eSxsLnFzLHQpOlwibm9uZVwiPT09Yy5kaXNwbGF5JiZkLm9hdXRoLmdyYW50JiZoJiZoLnJlZnJlc2hfdG9rZW4/KGwucXMucmVmcmVzaF90b2tlbj1oLnJlZnJlc2hfdG9rZW4sbz1yLnFzKGMub2F1dGhfcHJveHksbC5xcyx0KSk6bz1yLnFzKGQub2F1dGguYXV0aCxsLnFzLHQpLGUoXCJhdXRoLmluaXRcIixsKSxcIm5vbmVcIj09PWMuZGlzcGxheSlyLmlmcmFtZShvLHApO2Vsc2UgaWYoXCJwb3B1cFwiPT09Yy5kaXNwbGF5KXZhciBfPXIucG9wdXAobyxwLGMucG9wdXApLGI9c2V0SW50ZXJ2YWwoZnVuY3Rpb24oKXtpZigoIV98fF8uY2xvc2VkKSYmKGNsZWFySW50ZXJ2YWwoYiksIXMuc3RhdGUpKXt2YXIgZT1hKFwiY2FuY2VsbGVkXCIsXCJMb2dpbiBoYXMgYmVlbiBjYW5jZWxsZWRcIik7X3x8KGU9YShcImJsb2NrZWRcIixcIlBvcHVwIHdhcyBibG9ja2VkXCIpKSxlLm5ldHdvcms9bC5uZXR3b3JrLHMucmVqZWN0KGUpfX0sMTAwKTtlbHNlIHdpbmRvdy5sb2NhdGlvbj1vO3JldHVybiBzLnByb3h5fSxsb2dvdXQ6ZnVuY3Rpb24oKXtmdW5jdGlvbiBlKGUsdCl7aGVsbG8uZW1pdChlLHQpfXZhciB0PXRoaXMsbj10LnV0aWxzLG89bi5lcnJvcixpPW4uUHJvbWlzZSgpLHI9bi5hcmdzKHtuYW1lOlwic1wiLG9wdGlvbnM6XCJvXCIsY2FsbGJhY2s6XCJmXCJ9LGFyZ3VtZW50cyk7aWYoci5vcHRpb25zPXIub3B0aW9uc3x8e30saS5wcm94eS50aGVuKHIuY2FsbGJhY2ssci5jYWxsYmFjayksaS5wcm94eS50aGVuKGUuYmluZCh0aGlzLFwiYXV0aC5sb2dvdXQgYXV0aFwiKSxlLmJpbmQodGhpcyxcImVycm9yXCIpKSxyLm5hbWU9ci5uYW1lfHx0aGlzLnNldHRpbmdzLmRlZmF1bHRfc2VydmljZSxyLmF1dGhSZXNwb25zZT1uLnN0b3JlKHIubmFtZSksIXIubmFtZXx8ci5uYW1lIGluIHQuc2VydmljZXMpaWYoci5uYW1lJiZyLmF1dGhSZXNwb25zZSl7dmFyIGE9ZnVuY3Rpb24oZSl7bi5zdG9yZShyLm5hbWUsbnVsbCksaS5mdWxmaWxsKGhlbGxvLnV0aWxzLm1lcmdlKHtuZXR3b3JrOnIubmFtZX0sZXx8e30pKX0scz17fTtpZihyLm9wdGlvbnMuZm9yY2Upe3ZhciBsPXQuc2VydmljZXNbci5uYW1lXS5sb2dvdXQ7aWYobClpZihcImZ1bmN0aW9uXCI9PXR5cGVvZiBsJiYobD1sKGEscikpLFwic3RyaW5nXCI9PXR5cGVvZiBsKW4uaWZyYW1lKGwpLHMuZm9yY2U9bnVsbCxzLm1lc3NhZ2U9XCJMb2dvdXQgc3VjY2VzcyBvbiBwcm92aWRlcnMgc2l0ZSB3YXMgaW5kZXRlcm1pbmF0ZVwiO2Vsc2UgaWYodm9pZCAwPT09bClyZXR1cm4gaS5wcm94eX1hKHMpfWVsc2UgaS5yZWplY3QobyhcImludmFsaWRfc2Vzc2lvblwiLFwiVGhlcmUgd2FzIG5vIHNlc3Npb24gdG8gcmVtb3ZlXCIpKTtlbHNlIGkucmVqZWN0KG8oXCJpbnZhbGlkX25ldHdvcmtcIixcIlRoZSBuZXR3b3JrIHdhcyB1bnJlY29nbml6ZWRcIikpO3JldHVybiBpLnByb3h5fSxnZXRBdXRoUmVzcG9uc2U6ZnVuY3Rpb24oZSl7cmV0dXJuIGU9ZXx8dGhpcy5zZXR0aW5ncy5kZWZhdWx0X3NlcnZpY2UsZSYmZSBpbiB0aGlzLnNlcnZpY2VzP3RoaXMudXRpbHMuc3RvcmUoZSl8fG51bGw6bnVsbH0sZXZlbnRzOnt9fSksaGVsbG8udXRpbHMuZXh0ZW5kKGhlbGxvLnV0aWxzLHtlcnJvcjpmdW5jdGlvbihlLHQpe3JldHVybntlcnJvcjp7Y29kZTplLG1lc3NhZ2U6dH19fSxxczpmdW5jdGlvbihlLHQsbil7aWYodCl7bj1ufHxlbmNvZGVVUklDb21wb25lbnQ7Zm9yKHZhciBvIGluIHQpe3ZhciBpPVwiKFtcXFxcP1xcXFwmXSlcIitvK1wiPVteXFxcXCZdKlwiLHI9bmV3IFJlZ0V4cChpKTtlLm1hdGNoKHIpJiYoZT1lLnJlcGxhY2UocixcIiQxXCIrbytcIj1cIituKHRbb10pKSxkZWxldGUgdFtvXSl9fXJldHVybiB0aGlzLmlzRW1wdHkodCk/ZTplKyhlLmluZGV4T2YoXCI/XCIpPi0xP1wiJlwiOlwiP1wiKSt0aGlzLnBhcmFtKHQsbil9LHBhcmFtOmZ1bmN0aW9uKGUsdCl7dmFyIG4sbyxpPXt9O2lmKFwic3RyaW5nXCI9PXR5cGVvZiBlKXtpZih0PXR8fGRlY29kZVVSSUNvbXBvbmVudCxvPWUucmVwbGFjZSgvXltcXCNcXD9dLyxcIlwiKS5tYXRjaCgvKFtePVxcL1xcJl0rKT0oW15cXCZdKykvZykpZm9yKHZhciByPTA7cjxvLmxlbmd0aDtyKyspbj1vW3JdLm1hdGNoKC8oW149XSspPSguKikvKSxpW25bMV1dPXQoblsyXSk7cmV0dXJuIGl9dD10fHxlbmNvZGVVUklDb21wb25lbnQ7dmFyIGE9ZTtpPVtdO2Zvcih2YXIgcyBpbiBhKWEuaGFzT3duUHJvcGVydHkocykmJmEuaGFzT3duUHJvcGVydHkocykmJmkucHVzaChbcyxcIj9cIj09PWFbc10/XCI/XCI6dChhW3NdKV0uam9pbihcIj1cIikpO3JldHVybiBpLmpvaW4oXCImXCIpfSxzdG9yZTpmdW5jdGlvbigpe2Z1bmN0aW9uIGUoKXt2YXIgZT17fTt0cnl7ZT1KU09OLnBhcnNlKG4uZ2V0SXRlbShcImhlbGxvXCIpKXx8e319Y2F0Y2godCl7fXJldHVybiBlfWZ1bmN0aW9uIHQoZSl7bi5zZXRJdGVtKFwiaGVsbG9cIixKU09OLnN0cmluZ2lmeShlKSl9Zm9yKHZhciBuLG89W1wibG9jYWxTdG9yYWdlXCIsXCJzZXNzaW9uU3RvcmFnZVwiXSxpPS0xLHI9XCJ0ZXN0XCI7b1srK2ldOyl0cnl7bj13aW5kb3dbb1tpXV0sbi5zZXRJdGVtKHIraSxpKSxuLnJlbW92ZUl0ZW0ocitpKTticmVha31jYXRjaChhKXtuPW51bGx9aWYoIW4pe3ZhciBzPW51bGw7bj17Z2V0SXRlbTpmdW5jdGlvbihlKXtlKz1cIj1cIjtmb3IodmFyIHQ9ZG9jdW1lbnQuY29va2llLnNwbGl0KFwiO1wiKSxuPTA7bjx0Lmxlbmd0aDtuKyspe3ZhciBvPXRbbl0ucmVwbGFjZSgvKF5cXHMrfFxccyskKS8sXCJcIik7aWYobyYmMD09PW8uaW5kZXhPZihlKSlyZXR1cm4gby5zdWJzdHIoZS5sZW5ndGgpfXJldHVybiBzfSxzZXRJdGVtOmZ1bmN0aW9uKGUsdCl7cz10LGRvY3VtZW50LmNvb2tpZT1lK1wiPVwiK3R9fSxzPW4uZ2V0SXRlbShcImhlbGxvXCIpfXJldHVybiBmdW5jdGlvbihuLG8saSl7dmFyIHI9ZSgpO2lmKG4mJnZvaWQgMD09PW8pcmV0dXJuIHJbbl18fG51bGw7aWYobiYmbnVsbD09PW8pdHJ5e2RlbGV0ZSByW25dfWNhdGNoKGEpe3Jbbl09bnVsbH1lbHNle2lmKCFuKXJldHVybiByO3Jbbl09b31yZXR1cm4gdChyKSxyfHxudWxsfX0oKSxhcHBlbmQ6ZnVuY3Rpb24oZSx0LG4pe3ZhciBvPVwic3RyaW5nXCI9PXR5cGVvZiBlP2RvY3VtZW50LmNyZWF0ZUVsZW1lbnQoZSk6ZTtpZihcIm9iamVjdFwiPT10eXBlb2YgdClpZihcInRhZ05hbWVcImluIHQpbj10O2Vsc2UgZm9yKHZhciBpIGluIHQpaWYodC5oYXNPd25Qcm9wZXJ0eShpKSlpZihcIm9iamVjdFwiPT10eXBlb2YgdFtpXSlmb3IodmFyIHIgaW4gdFtpXSl0W2ldLmhhc093blByb3BlcnR5KHIpJiYob1tpXVtyXT10W2ldW3JdKTtlbHNlXCJodG1sXCI9PT1pP28uaW5uZXJIVE1MPXRbaV06L15vbi8udGVzdChpKT9vW2ldPXRbaV06by5zZXRBdHRyaWJ1dGUoaSx0W2ldKTtyZXR1cm5cImJvZHlcIj09PW4/IWZ1bmN0aW9uIGEoKXtkb2N1bWVudC5ib2R5P2RvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQobyk6c2V0VGltZW91dChhLDE2KX0oKTpcIm9iamVjdFwiPT10eXBlb2Ygbj9uLmFwcGVuZENoaWxkKG8pOlwic3RyaW5nXCI9PXR5cGVvZiBuJiZkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShuKVswXS5hcHBlbmRDaGlsZChvKSxvfSxpZnJhbWU6ZnVuY3Rpb24oZSl7dGhpcy5hcHBlbmQoXCJpZnJhbWVcIix7c3JjOmUsc3R5bGU6e3Bvc2l0aW9uOlwiYWJzb2x1dGVcIixsZWZ0OlwiLTEwMDBweFwiLGJvdHRvbTowLGhlaWdodDpcIjFweFwiLHdpZHRoOlwiMXB4XCJ9fSxcImJvZHlcIil9LG1lcmdlOmZ1bmN0aW9uKCl7dmFyIGU9QXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzKTtyZXR1cm4gZS51bnNoaWZ0KHt9KSx0aGlzLmV4dGVuZC5hcHBseShudWxsLGUpfSxhcmdzOmZ1bmN0aW9uKGUsdCl7dmFyIG49e30sbz0wLGk9bnVsbCxyPW51bGw7Zm9yKHIgaW4gZSlpZihlLmhhc093blByb3BlcnR5KHIpKWJyZWFrO2lmKDE9PT10Lmxlbmd0aCYmXCJvYmplY3RcIj09dHlwZW9mIHRbMF0mJlwibyFcIiE9ZVtyXSlmb3IociBpbiB0WzBdKWlmKGUuaGFzT3duUHJvcGVydHkocikmJnIgaW4gZSlyZXR1cm4gdFswXTtmb3IociBpbiBlKWlmKGUuaGFzT3duUHJvcGVydHkocikpaWYoaT10eXBlb2YgdFtvXSxcImZ1bmN0aW9uXCI9PXR5cGVvZiBlW3JdJiZlW3JdLnRlc3QodFtvXSl8fFwic3RyaW5nXCI9PXR5cGVvZiBlW3JdJiYoZVtyXS5pbmRleE9mKFwic1wiKT4tMSYmXCJzdHJpbmdcIj09PWl8fGVbcl0uaW5kZXhPZihcIm9cIik+LTEmJlwib2JqZWN0XCI9PT1pfHxlW3JdLmluZGV4T2YoXCJpXCIpPi0xJiZcIm51bWJlclwiPT09aXx8ZVtyXS5pbmRleE9mKFwiYVwiKT4tMSYmXCJvYmplY3RcIj09PWl8fGVbcl0uaW5kZXhPZihcImZcIik+LTEmJlwiZnVuY3Rpb25cIj09PWkpKW5bcl09dFtvKytdO2Vsc2UgaWYoXCJzdHJpbmdcIj09dHlwZW9mIGVbcl0mJmVbcl0uaW5kZXhPZihcIiFcIik+LTEpcmV0dXJuITE7cmV0dXJuIG59LHVybDpmdW5jdGlvbihlKXtpZihlKXtpZih3aW5kb3cuVVJMJiZVUkwgaW5zdGFuY2VvZiBGdW5jdGlvbiYmMCE9PVVSTC5sZW5ndGgpcmV0dXJuIG5ldyBVUkwoZSx3aW5kb3cubG9jYXRpb24pO3ZhciB0PWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJhXCIpO3JldHVybiB0LmhyZWY9ZSx0LmNsb25lTm9kZSghMSl9cmV0dXJuIHdpbmRvdy5sb2NhdGlvbn0sZGlmZjpmdW5jdGlvbihlLHQpe3JldHVybiB0LmZpbHRlcihmdW5jdGlvbih0KXtyZXR1cm4tMT09PWUuaW5kZXhPZih0KX0pfSxkaWZmS2V5OmZ1bmN0aW9uKGUsdCl7aWYoZXx8IXQpe3ZhciBuPXt9O2Zvcih2YXIgbyBpbiBlKW8gaW4gdHx8KG5bb109ZVtvXSk7cmV0dXJuIG59cmV0dXJuIGV9LHVuaXF1ZTpmdW5jdGlvbihlKXtyZXR1cm4gQXJyYXkuaXNBcnJheShlKT9lLmZpbHRlcihmdW5jdGlvbih0LG4pe3JldHVybiBlLmluZGV4T2YodCk9PT1ufSk6W119LGlzRW1wdHk6ZnVuY3Rpb24oZSl7aWYoIWUpcmV0dXJuITA7aWYoQXJyYXkuaXNBcnJheShlKSlyZXR1cm4hZS5sZW5ndGg7aWYoXCJvYmplY3RcIj09dHlwZW9mIGUpZm9yKHZhciB0IGluIGUpaWYoZS5oYXNPd25Qcm9wZXJ0eSh0KSlyZXR1cm4hMTtyZXR1cm4hMH0sUHJvbWlzZTpmdW5jdGlvbigpe3ZhciBlPTAsdD0xLG49MixvPWZ1bmN0aW9uKHQpe3JldHVybiB0aGlzIGluc3RhbmNlb2Ygbz8odGhpcy5pZD1cIlRoZW5hYmxlLzEuMC42XCIsdGhpcy5zdGF0ZT1lLHRoaXMuZnVsZmlsbFZhbHVlPXZvaWQgMCx0aGlzLnJlamVjdFJlYXNvbj12b2lkIDAsdGhpcy5vbkZ1bGZpbGxlZD1bXSx0aGlzLm9uUmVqZWN0ZWQ9W10sdGhpcy5wcm94eT17dGhlbjp0aGlzLnRoZW4uYmluZCh0aGlzKX0sdm9pZChcImZ1bmN0aW9uXCI9PXR5cGVvZiB0JiZ0LmNhbGwodGhpcyx0aGlzLmZ1bGZpbGwuYmluZCh0aGlzKSx0aGlzLnJlamVjdC5iaW5kKHRoaXMpKSkpOm5ldyBvKHQpfTtvLnByb3RvdHlwZT17ZnVsZmlsbDpmdW5jdGlvbihlKXtyZXR1cm4gaSh0aGlzLHQsXCJmdWxmaWxsVmFsdWVcIixlKX0scmVqZWN0OmZ1bmN0aW9uKGUpe3JldHVybiBpKHRoaXMsbixcInJlamVjdFJlYXNvblwiLGUpfSx0aGVuOmZ1bmN0aW9uKGUsdCl7dmFyIG49dGhpcyxpPW5ldyBvO3JldHVybiBuLm9uRnVsZmlsbGVkLnB1c2gocyhlLGksXCJmdWxmaWxsXCIpKSxuLm9uUmVqZWN0ZWQucHVzaChzKHQsaSxcInJlamVjdFwiKSkscihuKSxpLnByb3h5fX07dmFyIGk9ZnVuY3Rpb24odCxuLG8saSl7cmV0dXJuIHQuc3RhdGU9PT1lJiYodC5zdGF0ZT1uLHRbb109aSxyKHQpKSx0fSxyPWZ1bmN0aW9uKGUpe2Uuc3RhdGU9PT10P2EoZSxcIm9uRnVsZmlsbGVkXCIsZS5mdWxmaWxsVmFsdWUpOmUuc3RhdGU9PT1uJiZhKGUsXCJvblJlamVjdGVkXCIsZS5yZWplY3RSZWFzb24pfSxhPWZ1bmN0aW9uKGUsdCxuKXtpZigwIT09ZVt0XS5sZW5ndGgpe3ZhciBvPWVbdF07ZVt0XT1bXTt2YXIgaT1mdW5jdGlvbigpe2Zvcih2YXIgZT0wO2U8by5sZW5ndGg7ZSsrKW9bZV0obil9O1wib2JqZWN0XCI9PXR5cGVvZiBwcm9jZXNzJiZcImZ1bmN0aW9uXCI9PXR5cGVvZiBwcm9jZXNzLm5leHRUaWNrP3Byb2Nlc3MubmV4dFRpY2soaSk6XCJmdW5jdGlvblwiPT10eXBlb2Ygc2V0SW1tZWRpYXRlP3NldEltbWVkaWF0ZShpKTpzZXRUaW1lb3V0KGksMCl9fSxzPWZ1bmN0aW9uKGUsdCxuKXtyZXR1cm4gZnVuY3Rpb24obyl7aWYoXCJmdW5jdGlvblwiIT10eXBlb2YgZSl0W25dLmNhbGwodCxvKTtlbHNle3ZhciBpO3RyeXtpPWUobyl9Y2F0Y2gocil7cmV0dXJuIHZvaWQgdC5yZWplY3Qocil9bCh0LGkpfX19LGw9ZnVuY3Rpb24oZSx0KXtpZihlPT09dHx8ZS5wcm94eT09PXQpcmV0dXJuIHZvaWQgZS5yZWplY3QobmV3IFR5cGVFcnJvcihcImNhbm5vdCByZXNvbHZlIHByb21pc2Ugd2l0aCBpdHNlbGZcIikpO3ZhciBuO2lmKFwib2JqZWN0XCI9PXR5cGVvZiB0JiZudWxsIT09dHx8XCJmdW5jdGlvblwiPT10eXBlb2YgdCl0cnl7bj10LnRoZW59Y2F0Y2gobyl7cmV0dXJuIHZvaWQgZS5yZWplY3Qobyl9aWYoXCJmdW5jdGlvblwiIT10eXBlb2YgbillLmZ1bGZpbGwodCk7ZWxzZXt2YXIgaT0hMTt0cnl7bi5jYWxsKHQsZnVuY3Rpb24obil7aXx8KGk9ITAsbj09PXQ/ZS5yZWplY3QobmV3IFR5cGVFcnJvcihcImNpcmN1bGFyIHRoZW5hYmxlIGNoYWluXCIpKTpsKGUsbikpfSxmdW5jdGlvbih0KXtpfHwoaT0hMCxlLnJlamVjdCh0KSl9KX1jYXRjaChvKXtpfHxlLnJlamVjdChvKX19fTtyZXR1cm4gb30oKSxFdmVudDpmdW5jdGlvbigpe3ZhciBlPS9bXFxzXFwsXSsvO3JldHVybiB0aGlzLnBhcmVudD17ZXZlbnRzOnRoaXMuZXZlbnRzLGZpbmRFdmVudHM6dGhpcy5maW5kRXZlbnRzLHBhcmVudDp0aGlzLnBhcmVudCx1dGlsczp0aGlzLnV0aWxzfSx0aGlzLmV2ZW50cz17fSx0aGlzLm9uPWZ1bmN0aW9uKHQsbil7aWYobiYmXCJmdW5jdGlvblwiPT10eXBlb2Ygbilmb3IodmFyIG89dC5zcGxpdChlKSxpPTA7aTxvLmxlbmd0aDtpKyspdGhpcy5ldmVudHNbb1tpXV09W25dLmNvbmNhdCh0aGlzLmV2ZW50c1tvW2ldXXx8W10pO3JldHVybiB0aGlzfSx0aGlzLm9mZj1mdW5jdGlvbihlLHQpe3JldHVybiB0aGlzLmZpbmRFdmVudHMoZSxmdW5jdGlvbihlLG4pe3QmJnRoaXMuZXZlbnRzW2VdW25dIT09dHx8KHRoaXMuZXZlbnRzW2VdW25dPW51bGwpfSksdGhpc30sdGhpcy5lbWl0PWZ1bmN0aW9uKGUpe3ZhciB0PUFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywxKTt0LnB1c2goZSk7Zm9yKHZhciBuPWZ1bmN0aW9uKG4sbyl7dFt0Lmxlbmd0aC0xXT1cIipcIj09PW4/ZTpuLHRoaXMuZXZlbnRzW25dW29dLmFwcGx5KHRoaXMsdCl9LG89dGhpcztvJiZvLmZpbmRFdmVudHM7KW8uZmluZEV2ZW50cyhlK1wiLCpcIixuKSxvPW8ucGFyZW50O3JldHVybiB0aGlzfSx0aGlzLmVtaXRBZnRlcj1mdW5jdGlvbigpe3ZhciBlPXRoaXMsdD1hcmd1bWVudHM7cmV0dXJuIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtlLmVtaXQuYXBwbHkoZSx0KX0sMCksdGhpc30sdGhpcy5maW5kRXZlbnRzPWZ1bmN0aW9uKHQsbil7dmFyIG89dC5zcGxpdChlKTtmb3IodmFyIGkgaW4gdGhpcy5ldmVudHMpaWYodGhpcy5ldmVudHMuaGFzT3duUHJvcGVydHkoaSkmJm8uaW5kZXhPZihpKT4tMSlmb3IodmFyIHI9MDtyPHRoaXMuZXZlbnRzW2ldLmxlbmd0aDtyKyspdGhpcy5ldmVudHNbaV1bcl0mJm4uY2FsbCh0aGlzLGkscil9LHRoaXN9LGdsb2JhbEV2ZW50OmZ1bmN0aW9uKGUsdCl7cmV0dXJuIHQ9dHx8XCJfaGVsbG9qc19cIitwYXJzZUludCgxZTEyKk1hdGgucmFuZG9tKCksMTApLnRvU3RyaW5nKDM2KSx3aW5kb3dbdF09ZnVuY3Rpb24oKXt0cnl7ZS5hcHBseSh0aGlzLGFyZ3VtZW50cykmJmRlbGV0ZSB3aW5kb3dbdF19Y2F0Y2gobil7Y29uc29sZS5lcnJvcihuKX19LHR9LHBvcHVwOmZ1bmN0aW9uKGUsdCxuKXt2YXIgbz1kb2N1bWVudC5kb2N1bWVudEVsZW1lbnQ7aWYobi5oZWlnaHQpe3ZhciBpPXZvaWQgMCE9PXdpbmRvdy5zY3JlZW5Ub3A/d2luZG93LnNjcmVlblRvcDpzY3JlZW4udG9wLHI9c2NyZWVuLmhlaWdodHx8d2luZG93LmlubmVySGVpZ2h0fHxvLmNsaWVudEhlaWdodDtuLnRvcD1wYXJzZUludCgoci1uLmhlaWdodCkvMiwxMCkraX1pZihuLndpZHRoKXt2YXIgYT12b2lkIDAhPT13aW5kb3cuc2NyZWVuTGVmdD93aW5kb3cuc2NyZWVuTGVmdDpzY3JlZW4ubGVmdCxzPXNjcmVlbi53aWR0aHx8d2luZG93LmlubmVyV2lkdGh8fG8uY2xpZW50V2lkdGg7bi5sZWZ0PXBhcnNlSW50KChzLW4ud2lkdGgpLzIsMTApK2F9dmFyIGw9W107T2JqZWN0LmtleXMobikuZm9yRWFjaChmdW5jdGlvbihlKXt2YXIgdD1uW2VdO2wucHVzaChlKyhudWxsIT09dD9cIj1cIit0OlwiXCIpKX0pLC0xIT09bmF2aWdhdG9yLnVzZXJBZ2VudC5pbmRleE9mKFwiU2FmYXJpXCIpJiYtMT09PW5hdmlnYXRvci51c2VyQWdlbnQuaW5kZXhPZihcIkNocm9tZVwiKSYmKGU9dCtcIiNvYXV0aF9yZWRpcmVjdD1cIitlbmNvZGVVUklDb21wb25lbnQoZW5jb2RlVVJJQ29tcG9uZW50KGUpKSk7dmFyIHU9d2luZG93Lm9wZW4oZSxcIl9ibGFua1wiLGwuam9pbihcIixcIikpO3JldHVybiB1JiZ1LmZvY3VzJiZ1LmZvY3VzKCksdX0scmVzcG9uc2VIYW5kbGVyOmZ1bmN0aW9uKGUsdCl7ZnVuY3Rpb24gbihlLHQsbil7dmFyIHI9ZS5jYWxsYmFjayxzPWUubmV0d29yaztpZihhLnN0b3JlKHMsZSksIShcImRpc3BsYXlcImluIGUmJlwicGFnZVwiPT09ZS5kaXNwbGF5KSl7aWYobiYmciYmciBpbiBuKXt0cnl7ZGVsZXRlIGUuY2FsbGJhY2t9Y2F0Y2gobCl7fWEuc3RvcmUocyxlKTt2YXIgdT1KU09OLnN0cmluZ2lmeShlKTt0cnl7byhuLHIpKHUpfWNhdGNoKGwpe319aSgpfX1mdW5jdGlvbiBvKGUsdCl7cmV0dXJuIDAhPT10LmluZGV4T2YoXCJfaGVsbG9qc19cIik/ZnVuY3Rpb24oKXt0aHJvd1wiQ291bGQgbm90IGV4ZWN1dGUgY2FsbGJhY2sgXCIrdH06ZVt0XX1mdW5jdGlvbiBpKCl7aWYoZS5mcmFtZUVsZW1lbnQpdC5kb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKGUuZnJhbWVFbGVtZW50KTtlbHNle3RyeXtlLmNsb3NlKCl9Y2F0Y2gobil7fWUuYWRkRXZlbnRMaXN0ZW5lciYmZS5hZGRFdmVudExpc3RlbmVyKFwibG9hZFwiLGZ1bmN0aW9uKCl7ZS5jbG9zZSgpfSl9fXZhciByLGE9dGhpcyxzPWUubG9jYXRpb247aWYocj1hLnBhcmFtKHMuc2VhcmNoKSxyJiZyLnN0YXRlJiYoci5jb2RlfHxyLm9hdXRoX3Rva2VuKSl7dmFyIGw9SlNPTi5wYXJzZShyLnN0YXRlKTtyLnJlZGlyZWN0X3VyaT1sLnJlZGlyZWN0X3VyaXx8cy5ocmVmLnJlcGxhY2UoL1tcXD9cXCNdLiokLyxcIlwiKTt2YXIgdT1sLm9hdXRoX3Byb3h5K1wiP1wiK2EucGFyYW0ocik7cmV0dXJuIHZvaWQgcy5hc3NpZ24odSl9aWYocj1hLm1lcmdlKGEucGFyYW0ocy5zZWFyY2h8fFwiXCIpLGEucGFyYW0ocy5oYXNofHxcIlwiKSksciYmXCJzdGF0ZVwiaW4gcil7dHJ5e3ZhciBjPUpTT04ucGFyc2Uoci5zdGF0ZSk7YS5leHRlbmQocixjKX1jYXRjaChkKXtjb25zb2xlLmVycm9yKFwiQ291bGQgbm90IGRlY29kZSBzdGF0ZSBwYXJhbWV0ZXJcIil9aWYoXCJhY2Nlc3NfdG9rZW5cImluIHImJnIuYWNjZXNzX3Rva2VuJiZyLm5ldHdvcmspci5leHBpcmVzX2luJiYwIT09cGFyc2VJbnQoci5leHBpcmVzX2luLDEwKXx8KHIuZXhwaXJlc19pbj0wKSxyLmV4cGlyZXNfaW49cGFyc2VJbnQoci5leHBpcmVzX2luLDEwKSxyLmV4cGlyZXM9KG5ldyBEYXRlKS5nZXRUaW1lKCkvMWUzKyhyLmV4cGlyZXNfaW58fDMxNTM2ZTMpLG4ocixlLHQpO2Vsc2UgaWYoXCJlcnJvclwiaW4gciYmci5lcnJvciYmci5uZXR3b3JrKXIuZXJyb3I9e2NvZGU6ci5lcnJvcixtZXNzYWdlOnIuZXJyb3JfbWVzc2FnZXx8ci5lcnJvcl9kZXNjcmlwdGlvbn0sbihyLGUsdCk7ZWxzZSBpZihyLmNhbGxiYWNrJiZyLmNhbGxiYWNrIGluIHQpe3ZhciBmPVwicmVzdWx0XCJpbiByJiZyLnJlc3VsdD9KU09OLnBhcnNlKHIucmVzdWx0KTohMTtvKHQsci5jYWxsYmFjaykoZiksaSgpfXIucGFnZV91cmkmJnMuYXNzaWduKHIucGFnZV91cmkpfWVsc2UgaWYoXCJvYXV0aF9yZWRpcmVjdFwiaW4gcilyZXR1cm4gdm9pZCBzLmFzc2lnbihkZWNvZGVVUklDb21wb25lbnQoci5vYXV0aF9yZWRpcmVjdCkpfX0pLGhlbGxvLnV0aWxzLkV2ZW50LmNhbGwoaGVsbG8pLGZ1bmN0aW9uKGUpe3ZhciB0PXt9LG49e307ZS5vbihcImF1dGgubG9naW4sIGF1dGgubG9nb3V0XCIsZnVuY3Rpb24obil7biYmXCJvYmplY3RcIj09dHlwZW9mIG4mJm4ubmV0d29yayYmKHRbbi5uZXR3b3JrXT1lLnV0aWxzLnN0b3JlKG4ubmV0d29yayl8fHt9KX0pLGZ1bmN0aW9uIG8oKXt2YXIgaT0obmV3IERhdGUpLmdldFRpbWUoKS8xZTMscj1mdW5jdGlvbih0KXtlLmVtaXQoXCJhdXRoLlwiK3Qse25ldHdvcms6YSxhdXRoUmVzcG9uc2U6c30pfTtmb3IodmFyIGEgaW4gZS5zZXJ2aWNlcylpZihlLnNlcnZpY2VzLmhhc093blByb3BlcnR5KGEpKXtpZighZS5zZXJ2aWNlc1thXS5pZCljb250aW51ZTt2YXIgcz1lLnV0aWxzLnN0b3JlKGEpfHx7fSxsPWUuc2VydmljZXNbYV0sdT10W2FdfHx7fTtpZihzJiZcImNhbGxiYWNrXCJpbiBzKXt2YXIgYz1zLmNhbGxiYWNrO3RyeXtkZWxldGUgcy5jYWxsYmFja31jYXRjaChkKXt9ZS51dGlscy5zdG9yZShhLHMpO3RyeXt3aW5kb3dbY10ocyl9Y2F0Y2goZCl7fX1pZihzJiZcImV4cGlyZXNcImluIHMmJnMuZXhwaXJlczxpKXt2YXIgZj1sLnJlZnJlc2h8fHMucmVmcmVzaF90b2tlbjshZnx8YSBpbiBuJiYhKG5bYV08aSk/Znx8YSBpbiBufHwocihcImV4cGlyZWRcIiksblthXT0hMCk6KGUuZW1pdChcIm5vdGljZVwiLGErXCIgaGFzIGV4cGlyZWQgdHJ5aW5nIHRvIHJlc2lnbmluXCIpLGUubG9naW4oYSx7ZGlzcGxheTpcIm5vbmVcIixmb3JjZTohMX0pLG5bYV09aSs2MDApO2NvbnRpbnVlfWlmKHUuYWNjZXNzX3Rva2VuPT09cy5hY2Nlc3NfdG9rZW4mJnUuZXhwaXJlcz09PXMuZXhwaXJlcyljb250aW51ZTshcy5hY2Nlc3NfdG9rZW4mJnUuYWNjZXNzX3Rva2VuP3IoXCJsb2dvdXRcIik6cy5hY2Nlc3NfdG9rZW4mJiF1LmFjY2Vzc190b2tlbj9yKFwibG9naW5cIik6cy5leHBpcmVzIT09dS5leHBpcmVzJiZyKFwidXBkYXRlXCIpLHRbYV09cyxhIGluIG4mJmRlbGV0ZSBuW2FdfXNldFRpbWVvdXQobywxZTMpfSgpfShoZWxsbyksaGVsbG8uYXBpPWZ1bmN0aW9uKCl7ZnVuY3Rpb24gZShlKXtlPWUucmVwbGFjZSgvXFxAXFx7KFthLXpcXF9cXC1dKykoXFx8Lio/KT9cXH0vZ2ksZnVuY3Rpb24oZSx0LG4pe3ZhciBhPW4/bi5yZXBsYWNlKC9eXFx8LyxcIlwiKTpcIlwiO3JldHVybiB0IGluIHIucXVlcnk/KGE9ci5xdWVyeVt0XSxkZWxldGUgci5xdWVyeVt0XSk6ci5kYXRhJiZ0IGluIHIuZGF0YT8oYT1yLmRhdGFbdF0sZGVsZXRlIHIuZGF0YVt0XSk6bnx8aS5yZWplY3QobyhcIm1pc3NpbmdfYXR0cmlidXRlXCIsXCJUaGUgYXR0cmlidXRlIFwiK3QrXCIgaXMgbWlzc2luZyBmcm9tIHRoZSByZXF1ZXN0XCIpKSxhfSksZS5tYXRjaCgvXmh0dHBzPzpcXC9cXC8vKXx8KGU9dS5iYXNlK2UpLHIudXJsPWUsbi5yZXF1ZXN0KHIsZnVuY3Rpb24oZSx0KXtpZighci5mb3JtYXRSZXNwb25zZSlyZXR1cm4gdm9pZCgoXCJvYmplY3RcIj09dHlwZW9mIHQ/dC5zdGF0dXNDb2RlPj00MDA6XCJvYmplY3RcIj09dHlwZW9mIGUmJlwiZXJyb3JcImluIGUpP2kucmVqZWN0KGUpOmkuZnVsZmlsbChlKSk7aWYoZT09PSEwP2U9e3N1Y2Nlc3M6ITB9OmV8fChlPXt9KSxcImRlbGV0ZVwiPT09ci5tZXRob2QmJihlPSFlfHxuLmlzRW1wdHkoZSk/e3N1Y2Nlc3M6ITB9OmUpLHUud3JhcCYmKHIucGF0aCBpbiB1LndyYXB8fFwiZGVmYXVsdFwiaW4gdS53cmFwKSl7dmFyIG89ci5wYXRoIGluIHUud3JhcD9yLnBhdGg6XCJkZWZhdWx0XCIsYT0oKG5ldyBEYXRlKS5nZXRUaW1lKCksdS53cmFwW29dKGUsdCxyKSk7YSYmKGU9YSl9ZSYmXCJwYWdpbmdcImluIGUmJmUucGFnaW5nLm5leHQmJihcIj9cIj09PWUucGFnaW5nLm5leHRbMF0/ZS5wYWdpbmcubmV4dD1yLnBhdGgrZS5wYWdpbmcubmV4dDplLnBhZ2luZy5uZXh0Kz1cIiNcIityLnBhdGgpLCFlfHxcImVycm9yXCJpbiBlP2kucmVqZWN0KGUpOmkuZnVsZmlsbChlKX0pfXZhciB0PXRoaXMsbj10LnV0aWxzLG89bi5lcnJvcixpPW4uUHJvbWlzZSgpLHI9bi5hcmdzKHtwYXRoOlwicyFcIixxdWVyeTpcIm9cIixtZXRob2Q6XCJzXCIsZGF0YTpcIm9cIix0aW1lb3V0OlwiaVwiLGNhbGxiYWNrOlwiZlwifSxhcmd1bWVudHMpO3IubWV0aG9kPShyLm1ldGhvZHx8XCJnZXRcIikudG9Mb3dlckNhc2UoKSxyLmhlYWRlcnM9ci5oZWFkZXJzfHx7fSxyLnF1ZXJ5PXIucXVlcnl8fHt9LFwiZ2V0XCIhPT1yLm1ldGhvZCYmXCJkZWxldGVcIiE9PXIubWV0aG9kfHwobi5leHRlbmQoci5xdWVyeSxyLmRhdGEpLHIuZGF0YT17fSk7dmFyIGE9ci5kYXRhPXIuZGF0YXx8e307aWYoaS50aGVuKHIuY2FsbGJhY2ssci5jYWxsYmFjayksIXIucGF0aClyZXR1cm4gaS5yZWplY3QobyhcImludmFsaWRfcGF0aFwiLFwiTWlzc2luZyB0aGUgcGF0aCBwYXJhbWV0ZXIgZnJvbSB0aGUgcmVxdWVzdFwiKSk7ci5wYXRoPXIucGF0aC5yZXBsYWNlKC9eXFwvKy8sXCJcIik7dmFyIHM9KHIucGF0aC5zcGxpdCgvW1xcL1xcOl0vLDIpfHxbXSlbMF0udG9Mb3dlckNhc2UoKTtpZihzIGluIHQuc2VydmljZXMpe3IubmV0d29yaz1zO3ZhciBsPW5ldyBSZWdFeHAoXCJeXCIrcytcIjo/Lz9cIik7ci5wYXRoPXIucGF0aC5yZXBsYWNlKGwsXCJcIil9ci5uZXR3b3JrPXQuc2V0dGluZ3MuZGVmYXVsdF9zZXJ2aWNlPXIubmV0d29ya3x8dC5zZXR0aW5ncy5kZWZhdWx0X3NlcnZpY2U7dmFyIHU9dC5zZXJ2aWNlc1tyLm5ldHdvcmtdO2lmKCF1KXJldHVybiBpLnJlamVjdChvKFwiaW52YWxpZF9uZXR3b3JrXCIsXCJDb3VsZCBub3QgbWF0Y2ggdGhlIHNlcnZpY2UgcmVxdWVzdGVkOiBcIityLm5ldHdvcmspKTtpZihyLm1ldGhvZCBpbiB1JiZyLnBhdGggaW4gdVtyLm1ldGhvZF0mJnVbci5tZXRob2RdW3IucGF0aF09PT0hMSlyZXR1cm4gaS5yZWplY3QobyhcImludmFsaWRfcGF0aFwiLFwiVGhlIHByb3ZpZGVkIHBhdGggaXMgbm90IGF2YWlsYWJsZSBvbiB0aGUgc2VsZWN0ZWQgbmV0d29ya1wiKSk7ci5vYXV0aF9wcm94eXx8KHIub2F1dGhfcHJveHk9dC5zZXR0aW5ncy5vYXV0aF9wcm94eSksXCJwcm94eVwiaW4gcnx8KHIucHJveHk9ci5vYXV0aF9wcm94eSYmdS5vYXV0aCYmMT09PXBhcnNlSW50KHUub2F1dGgudmVyc2lvbiwxMCkpLFwidGltZW91dFwiaW4gcnx8KHIudGltZW91dD10LnNldHRpbmdzLnRpbWVvdXQpLFwiZm9ybWF0UmVzcG9uc2VcImluIHJ8fChyLmZvcm1hdFJlc3BvbnNlPSEwKSxyLmF1dGhSZXNwb25zZT10LmdldEF1dGhSZXNwb25zZShyLm5ldHdvcmspLHIuYXV0aFJlc3BvbnNlJiZyLmF1dGhSZXNwb25zZS5hY2Nlc3NfdG9rZW4mJihyLnF1ZXJ5LmFjY2Vzc190b2tlbj1yLmF1dGhSZXNwb25zZS5hY2Nlc3NfdG9rZW4pO3ZhciBjLGQ9ci5wYXRoO3Iub3B0aW9ucz1uLmNsb25lKHIucXVlcnkpLHIuZGF0YT1uLmNsb25lKGEpO3ZhciBmPXVbe1wiZGVsZXRlXCI6XCJkZWxcIn1bci5tZXRob2RdfHxyLm1ldGhvZF18fHt9O2lmKFwiZ2V0XCI9PT1yLm1ldGhvZCl7dmFyIHA9ZC5zcGxpdCgvW1xcPyNdLylbMV07cCYmKG4uZXh0ZW5kKHIucXVlcnksbi5wYXJhbShwKSksZD1kLnJlcGxhY2UoL1xcPy4qPygjfCQpLyxcIiQxXCIpKX1yZXR1cm4oYz1kLm1hdGNoKC8jKC4rKS8sXCJcIikpPyhkPWQuc3BsaXQoXCIjXCIpWzBdLHIucGF0aD1jWzFdKTpkIGluIGY/KHIucGF0aD1kLGQ9ZltkXSk6XCJkZWZhdWx0XCJpbiBmJiYoZD1mW1wiZGVmYXVsdFwiXSksci5yZWRpcmVjdF91cmk9dC5zZXR0aW5ncy5yZWRpcmVjdF91cmksci54aHI9dS54aHIsci5qc29ucD11Lmpzb25wLHIuZm9ybT11LmZvcm0sXCJmdW5jdGlvblwiPT10eXBlb2YgZD9kKHIsZSk6ZShkKSxpLnByb3h5fSxoZWxsby51dGlscy5leHRlbmQoaGVsbG8udXRpbHMse3JlcXVlc3Q6ZnVuY3Rpb24oZSx0KXtmdW5jdGlvbiBuKGUsdCl7dmFyIG47ZS5hdXRoUmVzcG9uc2UmJmUuYXV0aFJlc3BvbnNlLm9hdXRoJiYxPT09cGFyc2VJbnQoZS5hdXRoUmVzcG9uc2Uub2F1dGgudmVyc2lvbiwxMCkmJihuPWUucXVlcnkuYWNjZXNzX3Rva2VuLGRlbGV0ZSBlLnF1ZXJ5LmFjY2Vzc190b2tlbixlLnByb3h5PSEwKSwhZS5kYXRhfHxcImdldFwiIT09ZS5tZXRob2QmJlwiZGVsZXRlXCIhPT1lLm1ldGhvZHx8KG8uZXh0ZW5kKGUucXVlcnksZS5kYXRhKSxlLmRhdGE9bnVsbCk7dmFyIGk9by5xcyhlLnVybCxlLnF1ZXJ5KTtlLnByb3h5JiYoaT1vLnFzKGUub2F1dGhfcHJveHkse3BhdGg6aSxhY2Nlc3NfdG9rZW46bnx8XCJcIix0aGVuOmUucHJveHlfcmVzcG9uc2VfdHlwZXx8KFwiZ2V0XCI9PT1lLm1ldGhvZC50b0xvd2VyQ2FzZSgpP1wicmVkaXJlY3RcIjpcInByb3h5XCIpLG1ldGhvZDplLm1ldGhvZC50b0xvd2VyQ2FzZSgpLHN1cHByZXNzX3Jlc3BvbnNlX2NvZGVzOiEwfSkpLHQoaSl9dmFyIG89dGhpcyxpPW8uZXJyb3I7by5pc0VtcHR5KGUuZGF0YSl8fFwiRmlsZUxpc3RcImluIHdpbmRvd3x8IW8uaGFzQmluYXJ5KGUuZGF0YSl8fChlLnhocj0hMSxlLmpzb25wPSExKTt2YXIgcj10aGlzLnJlcXVlc3RfY29ycyhmdW5jdGlvbigpe3JldHVybiB2b2lkIDA9PT1lLnhocnx8ZS54aHImJihcImZ1bmN0aW9uXCIhPXR5cGVvZiBlLnhocnx8ZS54aHIoZSxlLnF1ZXJ5KSl9KTtpZihyKXJldHVybiB2b2lkIG4oZSxmdW5jdGlvbihuKXt2YXIgaT1vLnhocihlLm1ldGhvZCxuLGUuaGVhZGVycyxlLmRhdGEsdCk7aS5vbnByb2dyZXNzPWUub25wcm9ncmVzc3x8bnVsbCxpLnVwbG9hZCYmZS5vbnVwbG9hZHByb2dyZXNzJiYoaS51cGxvYWQub25wcm9ncmVzcz1lLm9udXBsb2FkcHJvZ3Jlc3MpfSk7dmFyIGE9ZS5xdWVyeTtpZihlLnF1ZXJ5PW8uY2xvbmUoZS5xdWVyeSksZS5jYWxsYmFja0lEPW8uZ2xvYmFsRXZlbnQoKSxlLmpzb25wIT09ITEpe2lmKGUucXVlcnkuY2FsbGJhY2s9ZS5jYWxsYmFja0lELFwiZnVuY3Rpb25cIj09dHlwZW9mIGUuanNvbnAmJmUuanNvbnAoZSxlLnF1ZXJ5KSxcImdldFwiPT09ZS5tZXRob2QpcmV0dXJuIHZvaWQgbihlLGZ1bmN0aW9uKG4pe28uanNvbnAobix0LGUuY2FsbGJhY2tJRCxlLnRpbWVvdXQpfSk7ZS5xdWVyeT1hfWlmKGUuZm9ybSE9PSExKXtlLnF1ZXJ5LnJlZGlyZWN0X3VyaT1lLnJlZGlyZWN0X3VyaSxlLnF1ZXJ5LnN0YXRlPUpTT04uc3RyaW5naWZ5KHtjYWxsYmFjazplLmNhbGxiYWNrSUR9KTt2YXIgcztpZihcImZ1bmN0aW9uXCI9PXR5cGVvZiBlLmZvcm0mJihzPWUuZm9ybShlLGUucXVlcnkpKSxcInBvc3RcIj09PWUubWV0aG9kJiZzIT09ITEpcmV0dXJuIHZvaWQgbihlLGZ1bmN0aW9uKG4pe28ucG9zdChuLGUuZGF0YSxzLHQsZS5jYWxsYmFja0lELGUudGltZW91dCl9KX10KGkoXCJpbnZhbGlkX3JlcXVlc3RcIixcIlRoZXJlIHdhcyBubyBtZWNoYW5pc20gZm9yIGhhbmRsaW5nIHRoaXMgcmVxdWVzdFwiKSl9LHJlcXVlc3RfY29yczpmdW5jdGlvbihlKXtyZXR1cm5cIndpdGhDcmVkZW50aWFsc1wiaW4gbmV3IFhNTEh0dHBSZXF1ZXN0JiZlKCl9LGRvbUluc3RhbmNlOmZ1bmN0aW9uKGUsdCl7dmFyIG49XCJIVE1MXCIrKGV8fFwiXCIpLnJlcGxhY2UoL15bYS16XS8sZnVuY3Rpb24oZSl7cmV0dXJuIGUudG9VcHBlckNhc2UoKX0pK1wiRWxlbWVudFwiO3JldHVybiB0P3dpbmRvd1tuXT90IGluc3RhbmNlb2Ygd2luZG93W25dOndpbmRvdy5FbGVtZW50P3QgaW5zdGFuY2VvZiB3aW5kb3cuRWxlbWVudCYmKCFlfHx0LnRhZ05hbWUmJnQudGFnTmFtZS50b0xvd2VyQ2FzZSgpPT09ZSk6ISh0IGluc3RhbmNlb2YgT2JqZWN0fHx0IGluc3RhbmNlb2YgQXJyYXl8fHQgaW5zdGFuY2VvZiBTdHJpbmd8fHQgaW5zdGFuY2VvZiBOdW1iZXIpJiZ0LnRhZ05hbWUmJnQudGFnTmFtZS50b0xvd2VyQ2FzZSgpPT09ZTohMX0sY2xvbmU6ZnVuY3Rpb24oZSl7aWYobnVsbD09PWV8fFwib2JqZWN0XCIhPXR5cGVvZiBlfHxlIGluc3RhbmNlb2YgRGF0ZXx8XCJub2RlTmFtZVwiaW4gZXx8dGhpcy5pc0JpbmFyeShlKXx8XCJmdW5jdGlvblwiPT10eXBlb2YgRm9ybURhdGEmJmUgaW5zdGFuY2VvZiBGb3JtRGF0YSlyZXR1cm4gZTtpZihBcnJheS5pc0FycmF5KGUpKXJldHVybiBlLm1hcCh0aGlzLmNsb25lLmJpbmQodGhpcykpO3ZhciB0PXt9O2Zvcih2YXIgbiBpbiBlKXRbbl09dGhpcy5jbG9uZShlW25dKTtyZXR1cm4gdH0seGhyOmZ1bmN0aW9uKGUsdCxuLG8saSl7ZnVuY3Rpb24gcihlKXtmb3IodmFyIHQsbj17fSxvPS8oW2EtelxcLV0rKTpcXHM/KC4qKTs/L2dpO3Q9by5leGVjKGUpOyluW3RbMV1dPXRbMl07cmV0dXJuIG59dmFyIGE9bmV3IFhNTEh0dHBSZXF1ZXN0LHM9dGhpcy5lcnJvcixsPSExO1wiYmxvYlwiPT09ZSYmKGw9ZSxlPVwiR0VUXCIpLGU9ZS50b1VwcGVyQ2FzZSgpLGEub25sb2FkPWZ1bmN0aW9uKHQpe3ZhciBuPWEucmVzcG9uc2U7dHJ5e249SlNPTi5wYXJzZShhLnJlc3BvbnNlVGV4dCl9Y2F0Y2gobyl7NDAxPT09YS5zdGF0dXMmJihuPXMoXCJhY2Nlc3NfZGVuaWVkXCIsYS5zdGF0dXNUZXh0KSl9dmFyIGw9cihhLmdldEFsbFJlc3BvbnNlSGVhZGVycygpKTtsLnN0YXR1c0NvZGU9YS5zdGF0dXMsaShufHwoXCJHRVRcIj09PWU/cyhcImVtcHR5X3Jlc3BvbnNlXCIsXCJDb3VsZCBub3QgZ2V0IHJlc291cmNlXCIpOnt9KSxsKX0sYS5vbmVycm9yPWZ1bmN0aW9uKGUpe3ZhciB0PWEucmVzcG9uc2VUZXh0O3RyeXt0PUpTT04ucGFyc2UoYS5yZXNwb25zZVRleHQpfWNhdGNoKG4pe31pKHR8fHMoXCJhY2Nlc3NfZGVuaWVkXCIsXCJDb3VsZCBub3QgZ2V0IHJlc291cmNlXCIpKX07dmFyIHU7aWYoXCJHRVRcIj09PWV8fFwiREVMRVRFXCI9PT1lKW89bnVsbDtlbHNlIGlmKG8mJlwic3RyaW5nXCIhPXR5cGVvZiBvJiYhKG8gaW5zdGFuY2VvZiBGb3JtRGF0YSkmJiEobyBpbnN0YW5jZW9mIEZpbGUpJiYhKG8gaW5zdGFuY2VvZiBCbG9iKSl7dmFyIGM9bmV3IEZvcm1EYXRhO2Zvcih1IGluIG8pby5oYXNPd25Qcm9wZXJ0eSh1KSYmKG9bdV1pbnN0YW5jZW9mIEhUTUxJbnB1dEVsZW1lbnQ/XCJmaWxlc1wiaW4gb1t1XSYmb1t1XS5maWxlcy5sZW5ndGg+MCYmYy5hcHBlbmQodSxvW3VdLmZpbGVzWzBdKTpvW3VdaW5zdGFuY2VvZiBCbG9iP2MuYXBwZW5kKHUsb1t1XSxvLm5hbWUpOmMuYXBwZW5kKHUsb1t1XSkpO289Y31pZihhLm9wZW4oZSx0LCEwKSxsJiYoXCJyZXNwb25zZVR5cGVcImluIGE/YS5yZXNwb25zZVR5cGU9bDphLm92ZXJyaWRlTWltZVR5cGUoXCJ0ZXh0L3BsYWluOyBjaGFyc2V0PXgtdXNlci1kZWZpbmVkXCIpKSxuKWZvcih1IGluIG4pYS5zZXRSZXF1ZXN0SGVhZGVyKHUsblt1XSk7cmV0dXJuIGEuc2VuZChvKSxhfSxqc29ucDpmdW5jdGlvbihlLHQsbixvKXt2YXIgaSxyPXRoaXMsYT1yLmVycm9yLHM9MCxsPWRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwiaGVhZFwiKVswXSx1PWEoXCJzZXJ2ZXJfZXJyb3JcIixcInNlcnZlcl9lcnJvclwiKSxjPWZ1bmN0aW9uKCl7cysrfHx3aW5kb3cuc2V0VGltZW91dChmdW5jdGlvbigpe3QodSksbC5yZW1vdmVDaGlsZChkKX0sMCl9O249ci5nbG9iYWxFdmVudChmdW5jdGlvbihlKXtyZXR1cm4gdT1lLCEwfSxuKSxlPWUucmVwbGFjZShuZXcgUmVnRXhwKFwiPVxcXFw/KCZ8JClcIiksXCI9XCIrbitcIiQxXCIpO3ZhciBkPXIuYXBwZW5kKFwic2NyaXB0XCIse2lkOm4sbmFtZTpuLHNyYzplLGFzeW5jOiEwLG9ubG9hZDpjLG9uZXJyb3I6YyxvbnJlYWR5c3RhdGVjaGFuZ2U6ZnVuY3Rpb24oKXsvbG9hZGVkfGNvbXBsZXRlL2kudGVzdCh0aGlzLnJlYWR5U3RhdGUpJiZjKCl9fSk7d2luZG93Lm5hdmlnYXRvci51c2VyQWdlbnQudG9Mb3dlckNhc2UoKS5pbmRleE9mKFwib3BlcmFcIik+LTEmJihpPXIuYXBwZW5kKFwic2NyaXB0XCIse3RleHQ6XCJkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnXCIrbitcIicpLm9uZXJyb3IoKTtcIn0pLGQuYXN5bmM9ITEpLG8mJndpbmRvdy5zZXRUaW1lb3V0KGZ1bmN0aW9uKCl7dT1hKFwidGltZW91dFwiLFwidGltZW91dFwiKSxjKCl9LG8pLGwuYXBwZW5kQ2hpbGQoZCksaSYmbC5hcHBlbmRDaGlsZChpKX0scG9zdDpmdW5jdGlvbihlLHQsbixvLGkscil7dmFyIGEscz10aGlzLGw9cy5lcnJvcix1PWRvY3VtZW50LGM9bnVsbCxkPVtdLGY9MCxwPW51bGwsbT0wLGg9ZnVuY3Rpb24oZSl7bSsrfHxvKGUpfTtzLmdsb2JhbEV2ZW50KGgsaSk7dmFyIGc7dHJ5e2c9dS5jcmVhdGVFbGVtZW50KCc8aWZyYW1lIG5hbWU9XCInK2krJ1wiPicpfWNhdGNoKHYpe2c9dS5jcmVhdGVFbGVtZW50KFwiaWZyYW1lXCIpfWlmKGcubmFtZT1pLGcuaWQ9aSxnLnN0eWxlLmRpc3BsYXk9XCJub25lXCIsbiYmbi5jYWxsYmFja29ubG9hZCYmKGcub25sb2FkPWZ1bmN0aW9uKCl7aCh7cmVzcG9uc2U6XCJwb3N0ZWRcIixtZXNzYWdlOlwiQ29udGVudCB3YXMgcG9zdGVkXCJ9KX0pLHImJnNldFRpbWVvdXQoZnVuY3Rpb24oKXtoKGwoXCJ0aW1lb3V0XCIsXCJUaGUgcG9zdCBvcGVyYXRpb24gdGltZWQgb3V0XCIpKX0sciksdS5ib2R5LmFwcGVuZENoaWxkKGcpLHMuZG9tSW5zdGFuY2UoXCJmb3JtXCIsdCkpe2ZvcihjPXQuZm9ybSxmPTA7ZjxjLmVsZW1lbnRzLmxlbmd0aDtmKyspYy5lbGVtZW50c1tmXSE9PXQmJmMuZWxlbWVudHNbZl0uc2V0QXR0cmlidXRlKFwiZGlzYWJsZWRcIiwhMCk7dD1jfWlmKHMuZG9tSW5zdGFuY2UoXCJmb3JtXCIsdCkpZm9yKGM9dCxmPTA7ZjxjLmVsZW1lbnRzLmxlbmd0aDtmKyspYy5lbGVtZW50c1tmXS5kaXNhYmxlZHx8XCJmaWxlXCIhPT1jLmVsZW1lbnRzW2ZdLnR5cGV8fChjLmVuY29kaW5nPWMuZW5jdHlwZT1cIm11bHRpcGFydC9mb3JtLWRhdGFcIixjLmVsZW1lbnRzW2ZdLnNldEF0dHJpYnV0ZShcIm5hbWVcIixcImZpbGVcIikpO2Vsc2V7Zm9yKHAgaW4gdCl0Lmhhc093blByb3BlcnR5KHApJiZzLmRvbUluc3RhbmNlKFwiaW5wdXRcIix0W3BdKSYmXCJmaWxlXCI9PT10W3BdLnR5cGUmJihjPXRbcF0uZm9ybSxjLmVuY29kaW5nPWMuZW5jdHlwZT1cIm11bHRpcGFydC9mb3JtLWRhdGFcIik7Y3x8KGM9dS5jcmVhdGVFbGVtZW50KFwiZm9ybVwiKSx1LmJvZHkuYXBwZW5kQ2hpbGQoYyksYT1jKTt2YXIgeTtmb3IocCBpbiB0KWlmKHQuaGFzT3duUHJvcGVydHkocCkpe3ZhciB3PXMuZG9tSW5zdGFuY2UoXCJpbnB1dFwiLHRbcF0pfHxzLmRvbUluc3RhbmNlKFwidGV4dEFyZWFcIix0W3BdKXx8cy5kb21JbnN0YW5jZShcInNlbGVjdFwiLHRbcF0pO2lmKHcmJnRbcF0uZm9ybT09PWMpdyYmdFtwXS5uYW1lIT09cCYmKHRbcF0uc2V0QXR0cmlidXRlKFwibmFtZVwiLHApLHRbcF0ubmFtZT1wKTtlbHNle3ZhciBfPWMuZWxlbWVudHNbcF07aWYoeSlmb3IoXyBpbnN0YW5jZW9mIE5vZGVMaXN0fHwoXz1bX10pLGY9MDtmPF8ubGVuZ3RoO2YrKylfW2ZdLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoX1tmXSk7eT11LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKSx5LnNldEF0dHJpYnV0ZShcInR5cGVcIixcImhpZGRlblwiKSx5LnNldEF0dHJpYnV0ZShcIm5hbWVcIixwKSx3P3kudmFsdWU9dFtwXS52YWx1ZTpzLmRvbUluc3RhbmNlKG51bGwsdFtwXSk/eS52YWx1ZT10W3BdLmlubmVySFRNTHx8dFtwXS5pbm5lclRleHQ6eS52YWx1ZT10W3BdLGMuYXBwZW5kQ2hpbGQoeSl9fWZvcihmPTA7ZjxjLmVsZW1lbnRzLmxlbmd0aDtmKyspeT1jLmVsZW1lbnRzW2ZdLHkubmFtZSBpbiB0fHx5LmdldEF0dHJpYnV0ZShcImRpc2FibGVkXCIpPT09ITB8fCh5LnNldEF0dHJpYnV0ZShcImRpc2FibGVkXCIsITApLGQucHVzaCh5KSl9Yy5zZXRBdHRyaWJ1dGUoXCJtZXRob2RcIixcIlBPU1RcIiksYy5zZXRBdHRyaWJ1dGUoXCJ0YXJnZXRcIixpKSxjLnRhcmdldD1pLGMuc2V0QXR0cmlidXRlKFwiYWN0aW9uXCIsZSksc2V0VGltZW91dChmdW5jdGlvbigpe2Muc3VibWl0KCksc2V0VGltZW91dChmdW5jdGlvbigpe3RyeXthJiZhLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoYSl9Y2F0Y2goZSl7dHJ5e2NvbnNvbGUuZXJyb3IoXCJIZWxsb0pTOiBjb3VsZCBub3QgcmVtb3ZlIGlmcmFtZVwiKX1jYXRjaCh0KXt9fWZvcih2YXIgbj0wO248ZC5sZW5ndGg7bisrKWRbbl0mJihkW25dLnNldEF0dHJpYnV0ZShcImRpc2FibGVkXCIsITEpLGRbbl0uZGlzYWJsZWQ9ITEpfSwwKX0sMTAwKX0saGFzQmluYXJ5OmZ1bmN0aW9uKGUpe2Zvcih2YXIgdCBpbiBlKWlmKGUuaGFzT3duUHJvcGVydHkodCkmJnRoaXMuaXNCaW5hcnkoZVt0XSkpcmV0dXJuITA7cmV0dXJuITF9LGlzQmluYXJ5OmZ1bmN0aW9uKGUpe3JldHVybiBlIGluc3RhbmNlb2YgT2JqZWN0JiYodGhpcy5kb21JbnN0YW5jZShcImlucHV0XCIsZSkmJlwiZmlsZVwiPT09ZS50eXBlfHxcIkZpbGVMaXN0XCJpbiB3aW5kb3cmJmUgaW5zdGFuY2VvZiB3aW5kb3cuRmlsZUxpc3R8fFwiRmlsZVwiaW4gd2luZG93JiZlIGluc3RhbmNlb2Ygd2luZG93LkZpbGV8fFwiQmxvYlwiaW4gd2luZG93JiZlIGluc3RhbmNlb2Ygd2luZG93LkJsb2IpfSx0b0Jsb2I6ZnVuY3Rpb24oZSl7dmFyIHQ9L15kYXRhXFw6KFteOyxdKyhcXDtjaGFyc2V0PVteOyxdKyk/KShcXDtiYXNlNjQpPywvaSxuPWUubWF0Y2godCk7aWYoIW4pcmV0dXJuIGU7Zm9yKHZhciBvPWF0b2IoZS5yZXBsYWNlKHQsXCJcIikpLGk9W10scj0wO3I8by5sZW5ndGg7cisrKWkucHVzaChvLmNoYXJDb2RlQXQocikpO3JldHVybiBuZXcgQmxvYihbbmV3IFVpbnQ4QXJyYXkoaSldLHt0eXBlOm5bMV19KX19KSxmdW5jdGlvbihlKXt2YXIgdD1lLmFwaSxuPWUudXRpbHM7bi5leHRlbmQobix7ZGF0YVRvSlNPTjpmdW5jdGlvbihlKXt2YXIgdD10aGlzLG49d2luZG93LG89ZS5kYXRhO2lmKHQuZG9tSW5zdGFuY2UoXCJmb3JtXCIsbyk/bz10Lm5vZGVMaXN0VG9KU09OKG8uZWxlbWVudHMpOlwiTm9kZUxpc3RcImluIG4mJm8gaW5zdGFuY2VvZiBOb2RlTGlzdD9vPXQubm9kZUxpc3RUb0pTT04obyk6dC5kb21JbnN0YW5jZShcImlucHV0XCIsbykmJihvPXQubm9kZUxpc3RUb0pTT04oW29dKSksKFwiRmlsZVwiaW4gbiYmbyBpbnN0YW5jZW9mIG4uRmlsZXx8XCJCbG9iXCJpbiBuJiZvIGluc3RhbmNlb2Ygbi5CbG9ifHxcIkZpbGVMaXN0XCJpbiBuJiZvIGluc3RhbmNlb2Ygbi5GaWxlTGlzdCkmJihvPXtmaWxlOm99KSwhKFwiRm9ybURhdGFcImluIG4mJm8gaW5zdGFuY2VvZiBuLkZvcm1EYXRhKSlmb3IodmFyIGkgaW4gbylpZihvLmhhc093blByb3BlcnR5KGkpKWlmKFwiRmlsZUxpc3RcImluIG4mJm9baV1pbnN0YW5jZW9mIG4uRmlsZUxpc3QpMT09PW9baV0ubGVuZ3RoJiYob1tpXT1vW2ldWzBdKTtlbHNle2lmKHQuZG9tSW5zdGFuY2UoXCJpbnB1dFwiLG9baV0pJiZcImZpbGVcIj09PW9baV0udHlwZSljb250aW51ZTt0LmRvbUluc3RhbmNlKFwiaW5wdXRcIixvW2ldKXx8dC5kb21JbnN0YW5jZShcInNlbGVjdFwiLG9baV0pfHx0LmRvbUluc3RhbmNlKFwidGV4dEFyZWFcIixvW2ldKT9vW2ldPW9baV0udmFsdWU6dC5kb21JbnN0YW5jZShudWxsLG9baV0pJiYob1tpXT1vW2ldLmlubmVySFRNTHx8b1tpXS5pbm5lclRleHQpfXJldHVybiBlLmRhdGE9byxvfSxub2RlTGlzdFRvSlNPTjpmdW5jdGlvbihlKXtmb3IodmFyIHQ9e30sbj0wO248ZS5sZW5ndGg7bisrKXt2YXIgbz1lW25dOyFvLmRpc2FibGVkJiZvLm5hbWUmJihcImZpbGVcIj09PW8udHlwZT90W28ubmFtZV09bzp0W28ubmFtZV09by52YWx1ZXx8by5pbm5lckhUTUwpfXJldHVybiB0fX0pLGUuYXBpPWZ1bmN0aW9uKCl7dmFyIGU9bi5hcmdzKHtwYXRoOlwicyFcIixtZXRob2Q6XCJzXCIsZGF0YTpcIm9cIix0aW1lb3V0OlwiaVwiLGNhbGxiYWNrOlwiZlwifSxhcmd1bWVudHMpO3JldHVybiBlLmRhdGEmJm4uZGF0YVRvSlNPTihlKSx0LmNhbGwodGhpcyxlKX19KGhlbGxvKSxoZWxsby51dGlscy5yZXNwb25zZUhhbmRsZXIod2luZG93LHdpbmRvdy5vcGVuZXJ8fHdpbmRvdy5wYXJlbnQpLFwib2JqZWN0XCI9PXR5cGVvZiBjaHJvbWUmJlwib2JqZWN0XCI9PXR5cGVvZiBjaHJvbWUuaWRlbnRpdHkmJmNocm9tZS5pZGVudGl0eS5sYXVuY2hXZWJBdXRoRmxvdyYmIWZ1bmN0aW9uKCl7ZnVuY3Rpb24gZSh0LG4pe3ZhciBvPXtjbG9zZWQ6ITF9O3JldHVybiBjaHJvbWUuaWRlbnRpdHkubGF1bmNoV2ViQXV0aEZsb3coe3VybDp0LGludGVyYWN0aXZlOm59LGZ1bmN0aW9uKHQpe2lmKHZvaWQgMD09PXQpcmV0dXJuIHZvaWQoby5jbG9zZWQ9ITApO3ZhciBuPWhlbGxvLnV0aWxzLnVybCh0KSxpPXtsb2NhdGlvbjp7YXNzaWduOmZ1bmN0aW9uKHQpe2UodCwhMSl9LHNlYXJjaDpuLnNlYXJjaCxoYXNoOm4uaGFzaCxocmVmOm4uaHJlZn0sY2xvc2U6ZnVuY3Rpb24oKXt9fTtoZWxsby51dGlscy5yZXNwb25zZUhhbmRsZXIoaSx3aW5kb3cpfSksb31oZWxsby51dGlscy5wb3B1cD1mdW5jdGlvbih0KXtyZXR1cm4gZSh0LCEwKX0saGVsbG8udXRpbHMuaWZyYW1lPWZ1bmN0aW9uKHQpe2UodCwhMSl9LGhlbGxvLnV0aWxzLnJlcXVlc3RfY29ycz1mdW5jdGlvbihlKXtyZXR1cm4gZSgpLCEwfTt2YXIgdD17fTtjaHJvbWUuc3RvcmFnZS5sb2NhbC5nZXQoXCJoZWxsb1wiLGZ1bmN0aW9uKGUpe3Q9ZS5oZWxsb3x8e319KSxoZWxsby51dGlscy5zdG9yZT1mdW5jdGlvbihlLG4pe3JldHVybiAwPT09YXJndW1lbnRzLmxlbmd0aD90OjE9PT1hcmd1bWVudHMubGVuZ3RoP3RbZV18fG51bGw6bj8odFtlXT1uLGNocm9tZS5zdG9yYWdlLmxvY2FsLnNldCh7aGVsbG86dH0pLG4pOm51bGw9PT1uPyhkZWxldGUgdFtlXSxjaHJvbWUuc3RvcmFnZS5sb2NhbC5zZXQoe2hlbGxvOnR9KSxudWxsKTp2b2lkIDB9fSgpLGZ1bmN0aW9uKCl7aWYoL15maWxlOlxcL3szfVteXFwvXS8udGVzdCh3aW5kb3cubG9jYXRpb24uaHJlZikmJndpbmRvdy5jb3Jkb3ZhKXtoZWxsby51dGlscy5pZnJhbWU9ZnVuY3Rpb24oZSx0KXtoZWxsby51dGlscy5wb3B1cChlLHQse2hpZGRlbjpcInllc1wifSl9O3ZhciBlPWhlbGxvLnV0aWxzLnBvcHVwO2hlbGxvLnV0aWxzLnBvcHVwPWZ1bmN0aW9uKHQsbixvKXt2YXIgaT1lLmNhbGwodGhpcyx0LG4sbyk7dHJ5e2lmKGkmJmkuYWRkRXZlbnRMaXN0ZW5lcil7dmFyIHI9aGVsbG8udXRpbHMudXJsKG4pLGE9ci5vcmlnaW58fHIucHJvdG9jb2wrXCIvL1wiK3IuaG9zdG5hbWU7aS5hZGRFdmVudExpc3RlbmVyKFwibG9hZHN0YXJ0XCIsZnVuY3Rpb24oZSl7dmFyIHQ9ZS51cmw7aWYoMD09PXQuaW5kZXhPZihhKSl7dmFyIG49aGVsbG8udXRpbHMudXJsKHQpLG89e2xvY2F0aW9uOnthc3NpZ246ZnVuY3Rpb24oZSl7aS5leGVjdXRlU2NyaXB0KHtjb2RlOid3aW5kb3cubG9jYXRpb24uaHJlZiA9IFwiJytlKyc7XCInfSl9LHNlYXJjaDpuLnNlYXJjaCxoYXNoOm4uaGFzaCxocmVmOm4uaHJlZn0sY2xvc2U6ZnVuY3Rpb24oKXtpZihpLmNsb3NlKXtpLmNsb3NlKCk7dHJ5e2kuY2xvc2VkPSEwfWNhdGNoKGUpe319fX07aGVsbG8udXRpbHMucmVzcG9uc2VIYW5kbGVyKG8sd2luZG93KX19KX19Y2F0Y2gocyl7fXJldHVybiBpfX19KCksZnVuY3Rpb24oZSl7ZnVuY3Rpb24gdChlKXtlJiZcImVycm9yXCJpbiBlJiYoZS5lcnJvcj17Y29kZTpcInNlcnZlcl9lcnJvclwiLG1lc3NhZ2U6ZS5lcnJvci5tZXNzYWdlfHxlLmVycm9yfSl9ZnVuY3Rpb24gbih0LG4sbyl7aWYoIShcIm9iamVjdFwiIT10eXBlb2YgdHx8XCJ1bmRlZmluZWRcIiE9dHlwZW9mIEJsb2ImJnQgaW5zdGFuY2VvZiBCbG9ifHxcInVuZGVmaW5lZFwiIT10eXBlb2YgQXJyYXlCdWZmZXImJnQgaW5zdGFuY2VvZiBBcnJheUJ1ZmZlcnx8XCJlcnJvclwiaW4gdCkpe3ZhciBpPShcImFwcF9mb2xkZXJcIiE9PXQucm9vdD90LnJvb3Q6XCJcIikrdC5wYXRoLnJlcGxhY2UoL1xcJi9nLFwiJTI2XCIpO2k9aS5yZXBsYWNlKC9eXFwvLyxcIlwiKSx0LnRodW1iX2V4aXN0cyYmKHQudGh1bWJuYWlsPW8ub2F1dGhfcHJveHkrXCI/cGF0aD1cIitlbmNvZGVVUklDb21wb25lbnQoXCJodHRwczovL2FwaS1jb250ZW50LmRyb3Bib3guY29tLzEvdGh1bWJuYWlscy9hdXRvL1wiK2krXCI/Zm9ybWF0PWpwZWcmc2l6ZT1tXCIpK1wiJmFjY2Vzc190b2tlbj1cIitvLm9wdGlvbnMuYWNjZXNzX3Rva2VuKSx0LnR5cGU9dC5pc19kaXI/XCJmb2xkZXJcIjp0Lm1pbWVfdHlwZSx0Lm5hbWU9dC5wYXRoLnJlcGxhY2UoLy4qXFwvL2csXCJcIiksdC5pc19kaXI/dC5maWxlcz1pLnJlcGxhY2UoL15cXC8vLFwiXCIpOih0LmRvd25sb2FkTGluaz1lLnNldHRpbmdzLm9hdXRoX3Byb3h5K1wiP3BhdGg9XCIrZW5jb2RlVVJJQ29tcG9uZW50KFwiaHR0cHM6Ly9hcGktY29udGVudC5kcm9wYm94LmNvbS8xL2ZpbGVzL2F1dG8vXCIraSkrXCImYWNjZXNzX3Rva2VuPVwiK28ub3B0aW9ucy5hY2Nlc3NfdG9rZW4sdC5maWxlPVwiaHR0cHM6Ly9hcGktY29udGVudC5kcm9wYm94LmNvbS8xL2ZpbGVzL2F1dG8vXCIraSksdC5pZHx8KHQuaWQ9dC5wYXRoLnJlcGxhY2UoL15cXC8vLFwiXCIpKX19ZnVuY3Rpb24gbyhlKXtyZXR1cm4gZnVuY3Rpb24odCxuKXtkZWxldGUgdC5xdWVyeS5saW1pdCxuKGUpfX12YXIgaT17dmVyc2lvbjpcIjEuMFwiLGF1dGg6XCJodHRwczovL3d3dy5kcm9wYm94LmNvbS8xL29hdXRoL2F1dGhvcml6ZVwiLHJlcXVlc3Q6XCJodHRwczovL2FwaS5kcm9wYm94LmNvbS8xL29hdXRoL3JlcXVlc3RfdG9rZW5cIix0b2tlbjpcImh0dHBzOi8vYXBpLmRyb3Bib3guY29tLzEvb2F1dGgvYWNjZXNzX3Rva2VuXCJ9LHI9e3ZlcnNpb246MixhdXRoOlwiaHR0cHM6Ly93d3cuZHJvcGJveC5jb20vMS9vYXV0aDIvYXV0aG9yaXplXCIsZ3JhbnQ6XCJodHRwczovL2FwaS5kcm9wYm94LmNvbS8xL29hdXRoMi90b2tlblwifTtlLmluaXQoe2Ryb3Bib3g6e25hbWU6XCJEcm9wYm94XCIsb2F1dGg6cixsb2dpbjpmdW5jdGlvbih0KXt0LnFzLnNjb3BlPVwiXCI7dmFyIG49ZGVjb2RlVVJJQ29tcG9uZW50KHQucXMucmVkaXJlY3RfdXJpKTswPT09bi5pbmRleE9mKFwiaHR0cDpcIikmJjAhPT1uLmluZGV4T2YoXCJodHRwOi8vbG9jYWxob3N0L1wiKT9lLnNlcnZpY2VzLmRyb3Bib3gub2F1dGg9aTplLnNlcnZpY2VzLmRyb3Bib3gub2F1dGg9cix0Lm9wdGlvbnMucG9wdXAud2lkdGg9MWUzLHQub3B0aW9ucy5wb3B1cC5oZWlnaHQ9MWUzfSxiYXNlOlwiaHR0cHM6Ly9hcGkuZHJvcGJveC5jb20vMS9cIixyb290Olwic2FuZGJveFwiLGdldDp7bWU6XCJhY2NvdW50L2luZm9cIixcIm1lL2ZpbGVzXCI6byhcIm1ldGFkYXRhL2F1dG8vQHtwYXJlbnR8fVwiKSxcIm1lL2ZvbGRlclwiOm8oXCJtZXRhZGF0YS9hdXRvL0B7aWR9XCIpLFwibWUvZm9sZGVyc1wiOm8oXCJtZXRhZGF0YS9hdXRvL1wiKSxcImRlZmF1bHRcIjpmdW5jdGlvbihlLHQpe2UucGF0aC5tYXRjaChcImh0dHBzOi8vYXBpLWNvbnRlbnQuZHJvcGJveC5jb20vMS9maWxlcy9cIikmJihlLm1ldGhvZD1cImJsb2JcIiksdChlLnBhdGgpfX0scG9zdDp7XCJtZS9maWxlc1wiOmZ1bmN0aW9uKHQsbil7dmFyIG89dC5kYXRhLnBhcmVudCxpPXQuZGF0YS5uYW1lO3QuZGF0YT17ZmlsZTp0LmRhdGEuZmlsZX0sXCJzdHJpbmdcIj09dHlwZW9mIHQuZGF0YS5maWxlJiYodC5kYXRhLmZpbGU9ZS51dGlscy50b0Jsb2IodC5kYXRhLmZpbGUpKSxuKFwiaHR0cHM6Ly9hcGktY29udGVudC5kcm9wYm94LmNvbS8xL2ZpbGVzX3B1dC9hdXRvL1wiK28rXCIvXCIraSl9LFwibWUvZm9sZGVyc1wiOmZ1bmN0aW9uKHQsbil7dmFyIG89dC5kYXRhLm5hbWU7dC5kYXRhPXt9LG4oXCJmaWxlb3BzL2NyZWF0ZV9mb2xkZXI/cm9vdD1Ae3Jvb3R8c2FuZGJveH0mXCIrZS51dGlscy5wYXJhbSh7cGF0aDpvfSkpfX0sZGVsOntcIm1lL2ZpbGVzXCI6XCJmaWxlb3BzL2RlbGV0ZT9yb290PUB7cm9vdHxzYW5kYm94fSZwYXRoPUB7aWR9XCIsXCJtZS9mb2xkZXJcIjpcImZpbGVvcHMvZGVsZXRlP3Jvb3Q9QHtyb290fHNhbmRib3h9JnBhdGg9QHtpZH1cIn0sd3JhcDp7bWU6ZnVuY3Rpb24oZSl7aWYodChlKSwhZS51aWQpcmV0dXJuIGU7ZS5uYW1lPWUuZGlzcGxheV9uYW1lO3ZhciBuPWUubmFtZS5zcGxpdChcIiBcIik7cmV0dXJuIGUuZmlyc3RfbmFtZT1uLnNoaWZ0KCksZS5sYXN0X25hbWU9bi5qb2luKFwiIFwiKSxlLmlkPWUudWlkLGRlbGV0ZSBlLnVpZCxkZWxldGUgZS5kaXNwbGF5X25hbWUsZX0sXCJkZWZhdWx0XCI6ZnVuY3Rpb24oZSxvLGkpe3JldHVybiB0KGUpLGUuaXNfZGlyJiZlLmNvbnRlbnRzJiYoZS5kYXRhPWUuY29udGVudHMsZGVsZXRlIGUuY29udGVudHMsZS5kYXRhLmZvckVhY2goZnVuY3Rpb24odCl7dC5yb290PWUucm9vdCxuKHQsbyxpKX0pKSxuKGUsbyxpKSxlLmlzX2RlbGV0ZWQmJihlLnN1Y2Nlc3M9ITApLGV9fSx4aHI6ZnVuY3Rpb24oZSl7aWYoZS5kYXRhJiZlLmRhdGEuZmlsZSl7dmFyIHQ9ZS5kYXRhLmZpbGU7dCYmKHQuZmlsZXM/ZS5kYXRhPXQuZmlsZXNbMF06ZS5kYXRhPXQpfXJldHVyblwiZGVsZXRlXCI9PT1lLm1ldGhvZCYmKGUubWV0aG9kPVwicG9zdFwiKSwhMH0sZm9ybTpmdW5jdGlvbihlLHQpe2RlbGV0ZSB0LnN0YXRlLGRlbGV0ZSB0LnJlZGlyZWN0X3VyaX19fSl9KGhlbGxvKSxmdW5jdGlvbihlKXtmdW5jdGlvbiB0KGUpe3JldHVybiBlLmlkJiYoZS50aHVtYm5haWw9ZS5waWN0dXJlPVwiaHR0cHM6Ly9ncmFwaC5mYWNlYm9vay5jb20vXCIrZS5pZCtcIi9waWN0dXJlXCIpLGV9ZnVuY3Rpb24gbihlKXtyZXR1cm5cImRhdGFcImluIGUmJmUuZGF0YS5mb3JFYWNoKHQpLGV9ZnVuY3Rpb24gbyhlLHQsbil7aWYoXCJib29sZWFuXCI9PXR5cGVvZiBlJiYoZT17c3VjY2VzczplfSksZSYmXCJkYXRhXCJpbiBlKXt2YXIgbz1uLnF1ZXJ5LmFjY2Vzc190b2tlbjtpZighKGUuZGF0YSBpbnN0YW5jZW9mIEFycmF5KSl7dmFyIHI9ZS5kYXRhO2RlbGV0ZSBlLmRhdGEsZS5kYXRhPVtyXX1lLmRhdGEuZm9yRWFjaChmdW5jdGlvbihlKXtlLnBpY3R1cmUmJihlLnRodW1ibmFpbD1lLnBpY3R1cmUpLGUucGljdHVyZXM9KGUuaW1hZ2VzfHxbXSkuc29ydChmdW5jdGlvbihlLHQpe3JldHVybiBlLndpZHRoLXQud2lkdGh9KSxlLmNvdmVyX3Bob3RvJiZlLmNvdmVyX3Bob3RvLmlkJiYoZS50aHVtYm5haWw9aStlLmNvdmVyX3Bob3RvLmlkK1wiL3BpY3R1cmU/YWNjZXNzX3Rva2VuPVwiK28pLFwiYWxidW1cIj09PWUudHlwZSYmKGUuZmlsZXM9ZS5waG90b3M9aStlLmlkK1wiL3Bob3Rvc1wiKSxlLmNhbl91cGxvYWQmJihlLnVwbG9hZF9sb2NhdGlvbj1pK2UuaWQrXCIvcGhvdG9zXCIpfSl9cmV0dXJuIGV9ZS5pbml0KHtmYWNlYm9vazp7bmFtZTpcIkZhY2Vib29rXCIsb2F1dGg6e3ZlcnNpb246MixhdXRoOlwiaHR0cHM6Ly93d3cuZmFjZWJvb2suY29tL2RpYWxvZy9vYXV0aC9cIixncmFudDpcImh0dHBzOi8vZ3JhcGguZmFjZWJvb2suY29tL29hdXRoL2FjY2Vzc190b2tlblwifSxzY29wZTp7YmFzaWM6XCJwdWJsaWNfcHJvZmlsZVwiLGVtYWlsOlwiZW1haWxcIixcclxuc2hhcmU6XCJ1c2VyX3Bvc3RzXCIsYmlydGhkYXk6XCJ1c2VyX2JpcnRoZGF5XCIsZXZlbnRzOlwidXNlcl9ldmVudHNcIixwaG90b3M6XCJ1c2VyX3Bob3Rvc1wiLHZpZGVvczpcInVzZXJfdmlkZW9zXCIsZnJpZW5kczpcInVzZXJfZnJpZW5kc1wiLGZpbGVzOlwidXNlcl9waG90b3MsdXNlcl92aWRlb3NcIixwdWJsaXNoX2ZpbGVzOlwidXNlcl9waG90b3MsdXNlcl92aWRlb3MscHVibGlzaF9hY3Rpb25zXCIscHVibGlzaDpcInB1Ymxpc2hfYWN0aW9uc1wiLG9mZmxpbmVfYWNjZXNzOlwiXCJ9LHJlZnJlc2g6ITEsbG9naW46ZnVuY3Rpb24oZSl7ZS5vcHRpb25zLmZvcmNlJiYoZS5xcy5hdXRoX3R5cGU9XCJyZWF1dGhlbnRpY2F0ZVwiKSxlLnFzLmRpc3BsYXk9ZS5vcHRpb25zLmRpc3BsYXl8fFwicG9wdXBcIn0sbG9nb3V0OmZ1bmN0aW9uKHQsbil7dmFyIG89ZS51dGlscy5nbG9iYWxFdmVudCh0KSxpPWVuY29kZVVSSUNvbXBvbmVudChlLnNldHRpbmdzLnJlZGlyZWN0X3VyaStcIj9cIitlLnV0aWxzLnBhcmFtKHtjYWxsYmFjazpvLHJlc3VsdDpKU09OLnN0cmluZ2lmeSh7Zm9yY2U6ITB9KSxzdGF0ZTpcInt9XCJ9KSkscj0obi5hdXRoUmVzcG9uc2V8fHt9KS5hY2Nlc3NfdG9rZW47cmV0dXJuIGUudXRpbHMuaWZyYW1lKFwiaHR0cHM6Ly93d3cuZmFjZWJvb2suY29tL2xvZ291dC5waHA/bmV4dD1cIitpK1wiJmFjY2Vzc190b2tlbj1cIityKSxyP3ZvaWQgMDohMX0sYmFzZTpcImh0dHBzOi8vZ3JhcGguZmFjZWJvb2suY29tL3YyLjcvXCIsZ2V0OnttZTpcIm1lP2ZpZWxkcz1lbWFpbCxmaXJzdF9uYW1lLGxhc3RfbmFtZSxuYW1lLHRpbWV6b25lLHZlcmlmaWVkXCIsXCJtZS9mcmllbmRzXCI6XCJtZS9mcmllbmRzXCIsXCJtZS9mb2xsb3dpbmdcIjpcIm1lL2ZyaWVuZHNcIixcIm1lL2ZvbGxvd2Vyc1wiOlwibWUvZnJpZW5kc1wiLFwibWUvc2hhcmVcIjpcIm1lL2ZlZWRcIixcIm1lL2xpa2VcIjpcIm1lL2xpa2VzXCIsXCJtZS9maWxlc1wiOlwibWUvYWxidW1zXCIsXCJtZS9hbGJ1bXNcIjpcIm1lL2FsYnVtcz9maWVsZHM9Y292ZXJfcGhvdG8sbmFtZVwiLFwibWUvYWxidW1cIjpcIkB7aWR9L3Bob3Rvcz9maWVsZHM9cGljdHVyZVwiLFwibWUvcGhvdG9zXCI6XCJtZS9waG90b3NcIixcIm1lL3Bob3RvXCI6XCJAe2lkfVwiLFwiZnJpZW5kL2FsYnVtc1wiOlwiQHtpZH0vYWxidW1zXCIsXCJmcmllbmQvcGhvdG9zXCI6XCJAe2lkfS9waG90b3NcIn0scG9zdDp7XCJtZS9zaGFyZVwiOlwibWUvZmVlZFwiLFwibWUvcGhvdG9cIjpcIkB7aWR9XCJ9LHdyYXA6e21lOnQsXCJtZS9mcmllbmRzXCI6bixcIm1lL2ZvbGxvd2luZ1wiOm4sXCJtZS9mb2xsb3dlcnNcIjpuLFwibWUvYWxidW1zXCI6byxcIm1lL3Bob3Rvc1wiOm8sXCJtZS9maWxlc1wiOm8sXCJkZWZhdWx0XCI6b30seGhyOmZ1bmN0aW9uKHQsbil7cmV0dXJuXCJnZXRcIiE9PXQubWV0aG9kJiZcInBvc3RcIiE9PXQubWV0aG9kfHwobi5zdXBwcmVzc19yZXNwb25zZV9jb2Rlcz0hMCksXCJwb3N0XCI9PT10Lm1ldGhvZCYmdC5kYXRhJiZcInN0cmluZ1wiPT10eXBlb2YgdC5kYXRhLmZpbGUmJih0LmRhdGEuZmlsZT1lLnV0aWxzLnRvQmxvYih0LmRhdGEuZmlsZSkpLCEwfSxqc29ucDpmdW5jdGlvbih0LG4pe3ZhciBvPXQubWV0aG9kO1wiZ2V0XCI9PT1vfHxlLnV0aWxzLmhhc0JpbmFyeSh0LmRhdGEpP1wiZGVsZXRlXCI9PT10Lm1ldGhvZCYmKG4ubWV0aG9kPVwiZGVsZXRlXCIsdC5tZXRob2Q9XCJwb3N0XCIpOih0LmRhdGEubWV0aG9kPW8sdC5tZXRob2Q9XCJnZXRcIil9LGZvcm06ZnVuY3Rpb24oZSl7cmV0dXJue2NhbGxiYWNrb25sb2FkOiEwfX19fSk7dmFyIGk9XCJodHRwczovL2dyYXBoLmZhY2Vib29rLmNvbS9cIn0oaGVsbG8pLGZ1bmN0aW9uKGUpe2Z1bmN0aW9uIHQodCxuLG8pe3ZhciBpPShvP1wiXCI6XCJmbGlja3I6XCIpK1wiP21ldGhvZD1cIit0K1wiJmFwaV9rZXk9XCIrZS5zZXJ2aWNlcy5mbGlja3IuaWQrXCImZm9ybWF0PWpzb25cIjtmb3IodmFyIHIgaW4gbiluLmhhc093blByb3BlcnR5KHIpJiYoaSs9XCImXCIrcitcIj1cIituW3JdKTtyZXR1cm4gaX1mdW5jdGlvbiBuKHQpe3ZhciBuPWUuZ2V0QXV0aFJlc3BvbnNlKFwiZmxpY2tyXCIpO3QobiYmbi51c2VyX25zaWQ/bi51c2VyX25zaWQ6bnVsbCl9ZnVuY3Rpb24gbyhlLG8pe3JldHVybiBvfHwobz17fSksZnVuY3Rpb24oaSxyKXtuKGZ1bmN0aW9uKG4pe28udXNlcl9pZD1uLHIodChlLG8sITApKX0pfX1mdW5jdGlvbiBpKGUsdCl7dmFyIG49XCJodHRwczovL3d3dy5mbGlja3IuY29tL2ltYWdlcy9idWRkeWljb24uZ2lmXCI7cmV0dXJuIGUubnNpZCYmZS5pY29uc2VydmVyJiZlLmljb25mYXJtJiYobj1cImh0dHBzOi8vZmFybVwiK2UuaWNvbmZhcm0rXCIuc3RhdGljZmxpY2tyLmNvbS9cIitlLmljb25zZXJ2ZXIrXCIvYnVkZHlpY29ucy9cIitlLm5zaWQrKHQ/XCJfXCIrdDpcIlwiKStcIi5qcGdcIiksbn1mdW5jdGlvbiByKGUsdCxuLG8saSl7cmV0dXJuIGk9aT9cIl9cIitpOlwiXCIsXCJodHRwczovL2Zhcm1cIit0K1wiLnN0YXRpY2ZsaWNrci5jb20vXCIrbitcIi9cIitlK1wiX1wiK28raStcIi5qcGdcIn1mdW5jdGlvbiBhKGUpe2UmJmUuc3RhdCYmXCJva1wiIT1lLnN0YXQudG9Mb3dlckNhc2UoKSYmKGUuZXJyb3I9e2NvZGU6XCJpbnZhbGlkX3JlcXVlc3RcIixtZXNzYWdlOmUubWVzc2FnZX0pfWZ1bmN0aW9uIHMoZSl7aWYoZS5waG90b3NldHx8ZS5waG90b3Mpe3ZhciB0PVwicGhvdG9zZXRcImluIGU/XCJwaG90b3NldFwiOlwicGhvdG9zXCI7ZT11KGUsdCksZChlKSxlLmRhdGE9ZS5waG90byxkZWxldGUgZS5waG90bztmb3IodmFyIG49MDtuPGUuZGF0YS5sZW5ndGg7bisrKXt2YXIgbz1lLmRhdGFbbl07by5uYW1lPW8udGl0bGUsby5waWN0dXJlPXIoby5pZCxvLmZhcm0sby5zZXJ2ZXIsby5zZWNyZXQsXCJcIiksby5waWN0dXJlcz1sKG8uaWQsby5mYXJtLG8uc2VydmVyLG8uc2VjcmV0KSxvLnNvdXJjZT1yKG8uaWQsby5mYXJtLG8uc2VydmVyLG8uc2VjcmV0LFwiYlwiKSxvLnRodW1ibmFpbD1yKG8uaWQsby5mYXJtLG8uc2VydmVyLG8uc2VjcmV0LFwibVwiKX19cmV0dXJuIGV9ZnVuY3Rpb24gbChlLHQsbixvKXt2YXIgaT0yMDQ4LGE9W3tpZDpcInRcIixtYXg6MTAwfSx7aWQ6XCJtXCIsbWF4OjI0MH0se2lkOlwiblwiLG1heDozMjB9LHtpZDpcIlwiLG1heDo1MDB9LHtpZDpcInpcIixtYXg6NjQwfSx7aWQ6XCJjXCIsbWF4OjgwMH0se2lkOlwiYlwiLG1heDoxMDI0fSx7aWQ6XCJoXCIsbWF4OjE2MDB9LHtpZDpcImtcIixtYXg6MjA0OH0se2lkOlwib1wiLG1heDppfV07cmV0dXJuIGEubWFwKGZ1bmN0aW9uKGkpe3JldHVybntzb3VyY2U6cihlLHQsbixvLGkuaWQpLHdpZHRoOmkubWF4LGhlaWdodDppLm1heH19KX1mdW5jdGlvbiB1KGUsdCl7cmV0dXJuIHQgaW4gZT9lPWVbdF06XCJlcnJvclwiaW4gZXx8KGUuZXJyb3I9e2NvZGU6XCJpbnZhbGlkX3JlcXVlc3RcIixtZXNzYWdlOmUubWVzc2FnZXx8XCJGYWlsZWQgdG8gZ2V0IGRhdGEgZnJvbSBGbGlja3JcIn0pLGV9ZnVuY3Rpb24gYyhlKXtpZihhKGUpLGUuY29udGFjdHMpe2U9dShlLFwiY29udGFjdHNcIiksZChlKSxlLmRhdGE9ZS5jb250YWN0LGRlbGV0ZSBlLmNvbnRhY3Q7Zm9yKHZhciB0PTA7dDxlLmRhdGEubGVuZ3RoO3QrKyl7dmFyIG49ZS5kYXRhW3RdO24uaWQ9bi5uc2lkLG4ubmFtZT1uLnJlYWxuYW1lfHxuLnVzZXJuYW1lLG4udGh1bWJuYWlsPWkobixcIm1cIil9fXJldHVybiBlfWZ1bmN0aW9uIGQoZSl7ZS5wYWdlJiZlLnBhZ2VzJiZlLnBhZ2UhPT1lLnBhZ2VzJiYoZS5wYWdpbmc9e25leHQ6XCI/cGFnZT1cIisgKytlLnBhZ2V9KX1lLmluaXQoe2ZsaWNrcjp7bmFtZTpcIkZsaWNrclwiLG9hdXRoOnt2ZXJzaW9uOlwiMS4wYVwiLGF1dGg6XCJodHRwczovL3d3dy5mbGlja3IuY29tL3NlcnZpY2VzL29hdXRoL2F1dGhvcml6ZT9wZXJtcz1yZWFkXCIscmVxdWVzdDpcImh0dHBzOi8vd3d3LmZsaWNrci5jb20vc2VydmljZXMvb2F1dGgvcmVxdWVzdF90b2tlblwiLHRva2VuOlwiaHR0cHM6Ly93d3cuZmxpY2tyLmNvbS9zZXJ2aWNlcy9vYXV0aC9hY2Nlc3NfdG9rZW5cIn0sYmFzZTpcImh0dHBzOi8vYXBpLmZsaWNrci5jb20vc2VydmljZXMvcmVzdFwiLGdldDp7bWU6byhcImZsaWNrci5wZW9wbGUuZ2V0SW5mb1wiKSxcIm1lL2ZyaWVuZHNcIjpvKFwiZmxpY2tyLmNvbnRhY3RzLmdldExpc3RcIix7cGVyX3BhZ2U6XCJAe2xpbWl0fDUwfVwifSksXCJtZS9mb2xsb3dpbmdcIjpvKFwiZmxpY2tyLmNvbnRhY3RzLmdldExpc3RcIix7cGVyX3BhZ2U6XCJAe2xpbWl0fDUwfVwifSksXCJtZS9mb2xsb3dlcnNcIjpvKFwiZmxpY2tyLmNvbnRhY3RzLmdldExpc3RcIix7cGVyX3BhZ2U6XCJAe2xpbWl0fDUwfVwifSksXCJtZS9hbGJ1bXNcIjpvKFwiZmxpY2tyLnBob3Rvc2V0cy5nZXRMaXN0XCIse3Blcl9wYWdlOlwiQHtsaW1pdHw1MH1cIn0pLFwibWUvYWxidW1cIjpvKFwiZmxpY2tyLnBob3Rvc2V0cy5nZXRQaG90b3NcIix7cGhvdG9zZXRfaWQ6XCJAe2lkfVwifSksXCJtZS9waG90b3NcIjpvKFwiZmxpY2tyLnBlb3BsZS5nZXRQaG90b3NcIix7cGVyX3BhZ2U6XCJAe2xpbWl0fDUwfVwifSl9LHdyYXA6e21lOmZ1bmN0aW9uKGUpe2lmKGEoZSksZT11KGUsXCJwZXJzb25cIiksZS5pZCl7aWYoZS5yZWFsbmFtZSl7ZS5uYW1lPWUucmVhbG5hbWUuX2NvbnRlbnQ7dmFyIHQ9ZS5uYW1lLnNwbGl0KFwiIFwiKTtlLmZpcnN0X25hbWU9dC5zaGlmdCgpLGUubGFzdF9uYW1lPXQuam9pbihcIiBcIil9ZS50aHVtYm5haWw9aShlLFwibFwiKSxlLnBpY3R1cmU9aShlLFwibFwiKX1yZXR1cm4gZX0sXCJtZS9mcmllbmRzXCI6YyxcIm1lL2ZvbGxvd2Vyc1wiOmMsXCJtZS9mb2xsb3dpbmdcIjpjLFwibWUvYWxidW1zXCI6ZnVuY3Rpb24oZSl7cmV0dXJuIGEoZSksZT11KGUsXCJwaG90b3NldHNcIiksZChlKSxlLnBob3Rvc2V0JiYoZS5kYXRhPWUucGhvdG9zZXQsZS5kYXRhLmZvckVhY2goZnVuY3Rpb24oZSl7ZS5uYW1lPWUudGl0bGUuX2NvbnRlbnQsZS5waG90b3M9XCJodHRwczovL2FwaS5mbGlja3IuY29tL3NlcnZpY2VzL3Jlc3RcIit0KFwiZmxpY2tyLnBob3Rvc2V0cy5nZXRQaG90b3NcIix7cGhvdG9zZXRfaWQ6ZS5pZH0sITApfSksZGVsZXRlIGUucGhvdG9zZXQpLGV9LFwibWUvcGhvdG9zXCI6ZnVuY3Rpb24oZSl7cmV0dXJuIGEoZSkscyhlKX0sXCJkZWZhdWx0XCI6ZnVuY3Rpb24oZSl7cmV0dXJuIGEoZSkscyhlKX19LHhocjohMSxqc29ucDpmdW5jdGlvbihlLHQpe1wiZ2V0XCI9PWUubWV0aG9kJiYoZGVsZXRlIHQuY2FsbGJhY2ssdC5qc29uY2FsbGJhY2s9ZS5jYWxsYmFja0lEKX19fSl9KGhlbGxvKSxmdW5jdGlvbihlKXtmdW5jdGlvbiB0KGUpeyFlLm1ldGF8fDQwMCE9PWUubWV0YS5jb2RlJiY0MDEhPT1lLm1ldGEuY29kZXx8KGUuZXJyb3I9e2NvZGU6XCJhY2Nlc3NfZGVuaWVkXCIsbWVzc2FnZTplLm1ldGEuZXJyb3JEZXRhaWx9KX1mdW5jdGlvbiBuKGUpe2UmJmUuaWQmJihlLnRodW1ibmFpbD1lLnBob3RvLnByZWZpeCtcIjEwMHgxMDBcIitlLnBob3RvLnN1ZmZpeCxlLm5hbWU9ZS5maXJzdE5hbWUrXCIgXCIrZS5sYXN0TmFtZSxlLmZpcnN0X25hbWU9ZS5maXJzdE5hbWUsZS5sYXN0X25hbWU9ZS5sYXN0TmFtZSxlLmNvbnRhY3QmJmUuY29udGFjdC5lbWFpbCYmKGUuZW1haWw9ZS5jb250YWN0LmVtYWlsKSl9ZnVuY3Rpb24gbyhlLHQpe3ZhciBuPXQuYWNjZXNzX3Rva2VuO3JldHVybiBkZWxldGUgdC5hY2Nlc3NfdG9rZW4sdC5vYXV0aF90b2tlbj1uLHQudj0yMDEyMTEyNSwhMH1lLmluaXQoe2ZvdXJzcXVhcmU6e25hbWU6XCJGb3Vyc3F1YXJlXCIsb2F1dGg6e3ZlcnNpb246MixhdXRoOlwiaHR0cHM6Ly9mb3Vyc3F1YXJlLmNvbS9vYXV0aDIvYXV0aGVudGljYXRlXCIsZ3JhbnQ6XCJodHRwczovL2ZvdXJzcXVhcmUuY29tL29hdXRoMi9hY2Nlc3NfdG9rZW5cIn0scmVmcmVzaDohMCxiYXNlOlwiaHR0cHM6Ly9hcGkuZm91cnNxdWFyZS5jb20vdjIvXCIsZ2V0OnttZTpcInVzZXJzL3NlbGZcIixcIm1lL2ZyaWVuZHNcIjpcInVzZXJzL3NlbGYvZnJpZW5kc1wiLFwibWUvZm9sbG93ZXJzXCI6XCJ1c2Vycy9zZWxmL2ZyaWVuZHNcIixcIm1lL2ZvbGxvd2luZ1wiOlwidXNlcnMvc2VsZi9mcmllbmRzXCJ9LHdyYXA6e21lOmZ1bmN0aW9uKGUpe3JldHVybiB0KGUpLGUmJmUucmVzcG9uc2UmJihlPWUucmVzcG9uc2UudXNlcixuKGUpKSxlfSxcImRlZmF1bHRcIjpmdW5jdGlvbihlKXtyZXR1cm4gdChlKSxlJiZcInJlc3BvbnNlXCJpbiBlJiZcImZyaWVuZHNcImluIGUucmVzcG9uc2UmJlwiaXRlbXNcImluIGUucmVzcG9uc2UuZnJpZW5kcyYmKGUuZGF0YT1lLnJlc3BvbnNlLmZyaWVuZHMuaXRlbXMsZS5kYXRhLmZvckVhY2gobiksZGVsZXRlIGUucmVzcG9uc2UpLGV9fSx4aHI6byxqc29ucDpvfX0pfShoZWxsbyksZnVuY3Rpb24oZSl7ZnVuY3Rpb24gdChlLHQpe3ZhciBuPXQ/dC5zdGF0dXNDb2RlOmUmJlwibWV0YVwiaW4gZSYmXCJzdGF0dXNcImluIGUubWV0YSYmZS5tZXRhLnN0YXR1czs0MDEhPT1uJiY0MDMhPT1ufHwoZS5lcnJvcj17Y29kZTpcImFjY2Vzc19kZW5pZWRcIixtZXNzYWdlOmUubWVzc2FnZXx8KGUuZGF0YT9lLmRhdGEubWVzc2FnZTpcIkNvdWxkIG5vdCBnZXQgcmVzcG9uc2VcIil9LGRlbGV0ZSBlLm1lc3NhZ2UpfWZ1bmN0aW9uIG4oZSl7ZS5pZCYmKGUudGh1bWJuYWlsPWUucGljdHVyZT1lLmF2YXRhcl91cmwsZS5uYW1lPWUubG9naW4pfWZ1bmN0aW9uIG8oZSx0LG4pe2lmKGUuZGF0YSYmZS5kYXRhLmxlbmd0aCYmdCYmdC5MaW5rKXt2YXIgbz10LkxpbmsubWF0Y2goLzwoLio/KT47XFxzKnJlbD1cXFwibmV4dFxcXCIvKTtvJiYoZS5wYWdpbmc9e25leHQ6b1sxXX0pfX1lLmluaXQoe2dpdGh1Yjp7bmFtZTpcIkdpdEh1YlwiLG9hdXRoOnt2ZXJzaW9uOjIsYXV0aDpcImh0dHBzOi8vZ2l0aHViLmNvbS9sb2dpbi9vYXV0aC9hdXRob3JpemVcIixncmFudDpcImh0dHBzOi8vZ2l0aHViLmNvbS9sb2dpbi9vYXV0aC9hY2Nlc3NfdG9rZW5cIixyZXNwb25zZV90eXBlOlwiY29kZVwifSxzY29wZTp7ZW1haWw6XCJ1c2VyOmVtYWlsXCJ9LGJhc2U6XCJodHRwczovL2FwaS5naXRodWIuY29tL1wiLGdldDp7bWU6XCJ1c2VyXCIsXCJtZS9mcmllbmRzXCI6XCJ1c2VyL2ZvbGxvd2luZz9wZXJfcGFnZT1Ae2xpbWl0fDEwMH1cIixcIm1lL2ZvbGxvd2luZ1wiOlwidXNlci9mb2xsb3dpbmc/cGVyX3BhZ2U9QHtsaW1pdHwxMDB9XCIsXCJtZS9mb2xsb3dlcnNcIjpcInVzZXIvZm9sbG93ZXJzP3Blcl9wYWdlPUB7bGltaXR8MTAwfVwiLFwibWUvbGlrZVwiOlwidXNlci9zdGFycmVkP3Blcl9wYWdlPUB7bGltaXR8MTAwfVwifSx3cmFwOnttZTpmdW5jdGlvbihlLG8pe3JldHVybiB0KGUsbyksbihlKSxlfSxcImRlZmF1bHRcIjpmdW5jdGlvbihlLGkscil7cmV0dXJuIHQoZSxpKSxBcnJheS5pc0FycmF5KGUpJiYoZT17ZGF0YTplfSksZS5kYXRhJiYobyhlLGksciksZS5kYXRhLmZvckVhY2gobikpLGV9fSx4aHI6ZnVuY3Rpb24oZSl7cmV0dXJuXCJnZXRcIiE9PWUubWV0aG9kJiZlLmRhdGEmJihlLmhlYWRlcnM9ZS5oZWFkZXJzfHx7fSxlLmhlYWRlcnNbXCJDb250ZW50LVR5cGVcIl09XCJhcHBsaWNhdGlvbi9qc29uXCIsXCJvYmplY3RcIj09dHlwZW9mIGUuZGF0YSYmKGUuZGF0YT1KU09OLnN0cmluZ2lmeShlLmRhdGEpKSksITB9fX0pfShoZWxsbyksZnVuY3Rpb24oZSl7ZnVuY3Rpb24gdChlKXtyZXR1cm4gcGFyc2VJbnQoZSwxMCl9ZnVuY3Rpb24gbihlKXtyZXR1cm4gYyhlKSxlLmRhdGE9ZS5pdGVtcyxkZWxldGUgZS5pdGVtcyxlfWZ1bmN0aW9uIG8oZSl7cmV0dXJuIGUuZXJyb3I/dm9pZCAwOihlLm5hbWV8fChlLm5hbWU9ZS50aXRsZXx8ZS5tZXNzYWdlKSxlLnBpY3R1cmV8fChlLnBpY3R1cmU9ZS50aHVtYm5haWxMaW5rKSxlLnRodW1ibmFpbHx8KGUudGh1bWJuYWlsPWUudGh1bWJuYWlsTGluayksXCJhcHBsaWNhdGlvbi92bmQuZ29vZ2xlLWFwcHMuZm9sZGVyXCI9PT1lLm1pbWVUeXBlJiYoZS50eXBlPVwiZm9sZGVyXCIsZS5maWxlcz1cImh0dHBzOi8vd3d3Lmdvb2dsZWFwaXMuY29tL2RyaXZlL3YyL2ZpbGVzP3E9JTIyXCIrZS5pZCtcIiUyMitpbitwYXJlbnRzXCIpLGUpfWZ1bmN0aW9uIGkoZSl7cmV0dXJue3NvdXJjZTplLnVybCx3aWR0aDplLndpZHRoLGhlaWdodDplLmhlaWdodH19ZnVuY3Rpb24gcihlKXtlLmRhdGE9ZS5mZWVkLmVudHJ5Lm1hcCh1KSxkZWxldGUgZS5mZWVkfWZ1bmN0aW9uIGEoZSl7aWYoYyhlKSxcImZlZWRcImluIGUmJlwiZW50cnlcImluIGUuZmVlZCllLmRhdGE9ZS5mZWVkLmVudHJ5Lm1hcCh1KSxkZWxldGUgZS5mZWVkO2Vsc2V7aWYoXCJlbnRyeVwiaW4gZSlyZXR1cm4gdShlLmVudHJ5KTtcIml0ZW1zXCJpbiBlPyhlLmRhdGE9ZS5pdGVtcy5tYXAobyksZGVsZXRlIGUuaXRlbXMpOm8oZSl9cmV0dXJuIGV9ZnVuY3Rpb24gcyhlKXtlLm5hbWU9ZS5kaXNwbGF5TmFtZXx8ZS5uYW1lLGUucGljdHVyZT1lLnBpY3R1cmV8fChlLmltYWdlP2UuaW1hZ2UudXJsOm51bGwpLGUudGh1bWJuYWlsPWUucGljdHVyZX1mdW5jdGlvbiBsKGUsdCxuKXtjKGUpO2lmKFwiZmVlZFwiaW4gZSYmXCJlbnRyeVwiaW4gZS5mZWVkKXtmb3IodmFyIG89bi5xdWVyeS5hY2Nlc3NfdG9rZW4saT0wO2k8ZS5mZWVkLmVudHJ5Lmxlbmd0aDtpKyspe3ZhciByPWUuZmVlZC5lbnRyeVtpXTtpZihyLmlkPXIuaWQuJHQsci5uYW1lPXIudGl0bGUuJHQsZGVsZXRlIHIudGl0bGUsci5nZCRlbWFpbCYmKHIuZW1haWw9ci5nZCRlbWFpbCYmci5nZCRlbWFpbC5sZW5ndGg+MD9yLmdkJGVtYWlsWzBdLmFkZHJlc3M6bnVsbCxyLmVtYWlscz1yLmdkJGVtYWlsLGRlbGV0ZSByLmdkJGVtYWlsKSxyLnVwZGF0ZWQmJihyLnVwZGF0ZWQ9ci51cGRhdGVkLiR0KSxyLmxpbmspe3ZhciBhPXIubGluay5sZW5ndGg+MD9yLmxpbmtbMF0uaHJlZjpudWxsO2EmJnIubGlua1swXS5nZCRldGFnJiYoYSs9KGEuaW5kZXhPZihcIj9cIik+LTE/XCImXCI6XCI/XCIpK1wiYWNjZXNzX3Rva2VuPVwiK28sci5waWN0dXJlPWEsci50aHVtYm5haWw9YSksZGVsZXRlIHIubGlua31yLmNhdGVnb3J5JiZkZWxldGUgci5jYXRlZ29yeX1lLmRhdGE9ZS5mZWVkLmVudHJ5LGRlbGV0ZSBlLmZlZWR9cmV0dXJuIGV9ZnVuY3Rpb24gdShlKXt2YXIgdCxuPWUubWVkaWEkZ3JvdXAsbz1uLm1lZGlhJGNvbnRlbnQubGVuZ3RoP24ubWVkaWEkY29udGVudFswXTp7fSxyPW4ubWVkaWEkY29udGVudHx8W10sYT1uLm1lZGlhJHRodW1ibmFpbHx8W10scz1yLmNvbmNhdChhKS5tYXAoaSkuc29ydChmdW5jdGlvbihlLHQpe3JldHVybiBlLndpZHRoLXQud2lkdGh9KSxsPTAsdT17aWQ6ZS5pZC4kdCxuYW1lOmUudGl0bGUuJHQsZGVzY3JpcHRpb246ZS5zdW1tYXJ5LiR0LHVwZGF0ZWRfdGltZTplLnVwZGF0ZWQuJHQsY3JlYXRlZF90aW1lOmUucHVibGlzaGVkLiR0LHBpY3R1cmU6bz9vLnVybDpudWxsLHBpY3R1cmVzOnMsaW1hZ2VzOltdLHRodW1ibmFpbDpvP28udXJsOm51bGwsd2lkdGg6by53aWR0aCxoZWlnaHQ6by5oZWlnaHR9O2lmKFwibGlua1wiaW4gZSlmb3IobD0wO2w8ZS5saW5rLmxlbmd0aDtsKyspe3ZhciBjPWUubGlua1tsXTtpZihjLnJlbC5tYXRjaCgvXFwjZmVlZCQvKSl7dS51cGxvYWRfbG9jYXRpb249dS5maWxlcz11LnBob3Rvcz1jLmhyZWY7YnJlYWt9fWlmKFwiY2F0ZWdvcnlcImluIGUmJmUuY2F0ZWdvcnkubGVuZ3RoKWZvcih0PWUuY2F0ZWdvcnksbD0wO2w8dC5sZW5ndGg7bCsrKXRbbF0uc2NoZW1lJiZ0W2xdLnNjaGVtZS5tYXRjaCgvXFwja2luZCQvKSYmKHUudHlwZT10W2xdLnRlcm0ucmVwbGFjZSgvXi4qP1xcIy8sXCJcIikpO3JldHVyblwibWVkaWEkdGh1bWJuYWlsXCJpbiBuJiZuLm1lZGlhJHRodW1ibmFpbC5sZW5ndGgmJih0PW4ubWVkaWEkdGh1bWJuYWlsLHUudGh1bWJuYWlsPXRbMF0udXJsLHUuaW1hZ2VzPXQubWFwKGkpKSx0PW4ubWVkaWEkY29udGVudCx0JiZ0Lmxlbmd0aCYmdS5pbWFnZXMucHVzaChpKHRbMF0pKSx1fWZ1bmN0aW9uIGMoZSl7aWYoXCJmZWVkXCJpbiBlJiZlLmZlZWQub3BlblNlYXJjaCRpdGVtc1BlclBhZ2Upe3ZhciBuPXQoZS5mZWVkLm9wZW5TZWFyY2gkaXRlbXNQZXJQYWdlLiR0KSxvPXQoZS5mZWVkLm9wZW5TZWFyY2gkc3RhcnRJbmRleC4kdCksaT10KGUuZmVlZC5vcGVuU2VhcmNoJHRvdGFsUmVzdWx0cy4kdCk7aT5vK24mJihlLnBhZ2luZz17bmV4dDpcIj9zdGFydD1cIisobytuKX0pfWVsc2VcIm5leHRQYWdlVG9rZW5cImluIGUmJihlLnBhZ2luZz17bmV4dDpcIj9wYWdlVG9rZW49XCIrZS5uZXh0UGFnZVRva2VufSl9ZnVuY3Rpb24gZCgpe2Z1bmN0aW9uIGUoZSl7dmFyIG49bmV3IEZpbGVSZWFkZXI7bi5vbmxvYWQ9ZnVuY3Rpb24obil7dChidG9hKG4udGFyZ2V0LnJlc3VsdCksZS50eXBlK3IrXCJDb250ZW50LVRyYW5zZmVyLUVuY29kaW5nOiBiYXNlNjRcIil9LG4ucmVhZEFzQmluYXJ5U3RyaW5nKGUpfWZ1bmN0aW9uIHQoZSx0KXtuLnB1c2gocitcIkNvbnRlbnQtVHlwZTogXCIrdCtyK3IrZSksaS0tLHMoKX12YXIgbj1bXSxvPSgxZTEwKk1hdGgucmFuZG9tKCkpLnRvU3RyaW5nKDMyKSxpPTAscj1cIlxcclxcblwiLGE9citcIi0tXCIrbyxzPWZ1bmN0aW9uKCl7fSxsPS9eZGF0YVxcOihbXjssXSsoXFw7Y2hhcnNldD1bXjssXSspPykoXFw7YmFzZTY0KT8sL2k7dGhpcy5hcHBlbmQ9ZnVuY3Rpb24obixvKXtcInN0cmluZ1wiIT10eXBlb2YgbiYmXCJsZW5ndGhcImluIE9iamVjdChuKXx8KG49W25dKTtmb3IodmFyIGE9MDthPG4ubGVuZ3RoO2ErKyl7aSsrO3ZhciBzPW5bYV07aWYoXCJ1bmRlZmluZWRcIiE9dHlwZW9mIEZpbGUmJnMgaW5zdGFuY2VvZiBGaWxlfHxcInVuZGVmaW5lZFwiIT10eXBlb2YgQmxvYiYmcyBpbnN0YW5jZW9mIEJsb2IpZShzKTtlbHNlIGlmKFwic3RyaW5nXCI9PXR5cGVvZiBzJiZzLm1hdGNoKGwpKXt2YXIgdT1zLm1hdGNoKGwpO3Qocy5yZXBsYWNlKGwsXCJcIiksdVsxXStyK1wiQ29udGVudC1UcmFuc2Zlci1FbmNvZGluZzogYmFzZTY0XCIpfWVsc2UgdChzLG8pfX0sdGhpcy5vbnJlYWR5PWZ1bmN0aW9uKGUpeyhzPWZ1bmN0aW9uKCl7MD09PWkmJihuLnVuc2hpZnQoXCJcIiksbi5wdXNoKFwiLS1cIiksZShuLmpvaW4oYSksbyksbj1bXSl9KSgpfX1mdW5jdGlvbiBmKGUsdCl7dmFyIG49e307ZS5kYXRhJiZcInVuZGVmaW5lZFwiIT10eXBlb2YgSFRNTElucHV0RWxlbWVudCYmZS5kYXRhIGluc3RhbmNlb2YgSFRNTElucHV0RWxlbWVudCYmKGUuZGF0YT17ZmlsZTplLmRhdGF9KSwhZS5kYXRhLm5hbWUmJk9iamVjdChPYmplY3QoZS5kYXRhLmZpbGUpLmZpbGVzKS5sZW5ndGgmJlwicG9zdFwiPT09ZS5tZXRob2QmJihlLmRhdGEubmFtZT1lLmRhdGEuZmlsZS5maWxlc1swXS5uYW1lKSxcInBvc3RcIj09PWUubWV0aG9kP2UuZGF0YT17dGl0bGU6ZS5kYXRhLm5hbWUscGFyZW50czpbe2lkOmUuZGF0YS5wYXJlbnR8fFwicm9vdFwifV0sZmlsZTplLmRhdGEuZmlsZX06KG49ZS5kYXRhLGUuZGF0YT17fSxuLnBhcmVudCYmKGUuZGF0YS5wYXJlbnRzPVt7aWQ6ZS5kYXRhLnBhcmVudHx8XCJyb290XCJ9XSksbi5maWxlJiYoZS5kYXRhLmZpbGU9bi5maWxlKSxuLm5hbWUmJihlLmRhdGEudGl0bGU9bi5uYW1lKSk7dmFyIG87aWYoXCJmaWxlXCJpbiBlLmRhdGEmJihvPWUuZGF0YS5maWxlLGRlbGV0ZSBlLmRhdGEuZmlsZSxcIm9iamVjdFwiPT10eXBlb2YgbyYmXCJmaWxlc1wiaW4gbyYmKG89by5maWxlcyksIW98fCFvLmxlbmd0aCkpcmV0dXJuIHZvaWQgdCh7ZXJyb3I6e2NvZGU6XCJyZXF1ZXN0X2ludmFsaWRcIixtZXNzYWdlOlwiVGhlcmUgd2VyZSBubyBmaWxlcyBhdHRhY2hlZCB3aXRoIHRoaXMgcmVxdWVzdCB0byB1cGxvYWRcIn19KTt2YXIgaT1uZXcgZDtpLmFwcGVuZChKU09OLnN0cmluZ2lmeShlLmRhdGEpLFwiYXBwbGljYXRpb24vanNvblwiKSxvJiZpLmFwcGVuZChvKSxpLm9ucmVhZHkoZnVuY3Rpb24obyxpKXtlLmhlYWRlcnNbXCJjb250ZW50LXR5cGVcIl09J211bHRpcGFydC9yZWxhdGVkOyBib3VuZGFyeT1cIicraSsnXCInLGUuZGF0YT1vLHQoXCJ1cGxvYWQvZHJpdmUvdjIvZmlsZXNcIisobi5pZD9cIi9cIituLmlkOlwiXCIpK1wiP3VwbG9hZFR5cGU9bXVsdGlwYXJ0XCIpfSl9ZnVuY3Rpb24gcChlKXtpZihcIm9iamVjdFwiPT10eXBlb2YgZS5kYXRhKXRyeXtlLmRhdGE9SlNPTi5zdHJpbmdpZnkoZS5kYXRhKSxlLmhlYWRlcnNbXCJjb250ZW50LXR5cGVcIl09XCJhcHBsaWNhdGlvbi9qc29uXCJ9Y2F0Y2godCl7fX12YXIgbT1cImh0dHBzOi8vd3d3Lmdvb2dsZS5jb20vbTgvZmVlZHMvY29udGFjdHMvZGVmYXVsdC9mdWxsP3Y9My4wJmFsdD1qc29uJm1heC1yZXN1bHRzPUB7bGltaXR8MTAwMH0mc3RhcnQtaW5kZXg9QHtzdGFydHwxfVwiO2UuaW5pdCh7Z29vZ2xlOntuYW1lOlwiR29vZ2xlIFBsdXNcIixvYXV0aDp7dmVyc2lvbjoyLGF1dGg6XCJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20vby9vYXV0aDIvYXV0aFwiLGdyYW50OlwiaHR0cHM6Ly9hY2NvdW50cy5nb29nbGUuY29tL28vb2F1dGgyL3Rva2VuXCJ9LHNjb3BlOntiYXNpYzpcImh0dHBzOi8vd3d3Lmdvb2dsZWFwaXMuY29tL2F1dGgvcGx1cy5tZSBwcm9maWxlXCIsZW1haWw6XCJlbWFpbFwiLGJpcnRoZGF5OlwiXCIsZXZlbnRzOlwiXCIscGhvdG9zOlwiaHR0cHM6Ly9waWNhc2F3ZWIuZ29vZ2xlLmNvbS9kYXRhL1wiLHZpZGVvczpcImh0dHA6Ly9nZGF0YS55b3V0dWJlLmNvbVwiLGZyaWVuZHM6XCJodHRwczovL3d3dy5nb29nbGUuY29tL204L2ZlZWRzLCBodHRwczovL3d3dy5nb29nbGVhcGlzLmNvbS9hdXRoL3BsdXMubG9naW5cIixmaWxlczpcImh0dHBzOi8vd3d3Lmdvb2dsZWFwaXMuY29tL2F1dGgvZHJpdmUucmVhZG9ubHlcIixwdWJsaXNoOlwiXCIscHVibGlzaF9maWxlczpcImh0dHBzOi8vd3d3Lmdvb2dsZWFwaXMuY29tL2F1dGgvZHJpdmVcIixzaGFyZTpcIlwiLGNyZWF0ZV9ldmVudDpcIlwiLG9mZmxpbmVfYWNjZXNzOlwiXCJ9LHNjb3BlX2RlbGltOlwiIFwiLGxvZ2luOmZ1bmN0aW9uKGUpe1wiY29kZVwiPT09ZS5xcy5yZXNwb25zZV90eXBlJiYoZS5xcy5hY2Nlc3NfdHlwZT1cIm9mZmxpbmVcIiksZS5vcHRpb25zLmZvcmNlJiYoZS5xcy5hcHByb3ZhbF9wcm9tcHQ9XCJmb3JjZVwiKX0sYmFzZTpcImh0dHBzOi8vd3d3Lmdvb2dsZWFwaXMuY29tL1wiLGdldDp7bWU6XCJwbHVzL3YxL3Blb3BsZS9tZVwiLFwibWUvZnJpZW5kc1wiOlwicGx1cy92MS9wZW9wbGUvbWUvcGVvcGxlL3Zpc2libGU/bWF4UmVzdWx0cz1Ae2xpbWl0fDEwMH1cIixcIm1lL2ZvbGxvd2luZ1wiOm0sXCJtZS9mb2xsb3dlcnNcIjptLFwibWUvY29udGFjdHNcIjptLFwibWUvc2hhcmVcIjpcInBsdXMvdjEvcGVvcGxlL21lL2FjdGl2aXRpZXMvcHVibGljP21heFJlc3VsdHM9QHtsaW1pdHwxMDB9XCIsXCJtZS9mZWVkXCI6XCJwbHVzL3YxL3Blb3BsZS9tZS9hY3Rpdml0aWVzL3B1YmxpYz9tYXhSZXN1bHRzPUB7bGltaXR8MTAwfVwiLFwibWUvYWxidW1zXCI6XCJodHRwczovL3BpY2FzYXdlYi5nb29nbGUuY29tL2RhdGEvZmVlZC9hcGkvdXNlci9kZWZhdWx0P2FsdD1qc29uJm1heC1yZXN1bHRzPUB7bGltaXR8MTAwfSZzdGFydC1pbmRleD1Ae3N0YXJ0fDF9XCIsXCJtZS9hbGJ1bVwiOmZ1bmN0aW9uKGUsdCl7dmFyIG49ZS5xdWVyeS5pZDtkZWxldGUgZS5xdWVyeS5pZCx0KG4ucmVwbGFjZShcIi9lbnRyeS9cIixcIi9mZWVkL1wiKSl9LFwibWUvcGhvdG9zXCI6XCJodHRwczovL3BpY2FzYXdlYi5nb29nbGUuY29tL2RhdGEvZmVlZC9hcGkvdXNlci9kZWZhdWx0P2FsdD1qc29uJmtpbmQ9cGhvdG8mbWF4LXJlc3VsdHM9QHtsaW1pdHwxMDB9JnN0YXJ0LWluZGV4PUB7c3RhcnR8MX1cIixcIm1lL2ZpbGVcIjpcImRyaXZlL3YyL2ZpbGVzL0B7aWR9XCIsXCJtZS9maWxlc1wiOlwiZHJpdmUvdjIvZmlsZXM/cT0lMjJAe3BhcmVudHxyb290fSUyMitpbitwYXJlbnRzK2FuZCt0cmFzaGVkPWZhbHNlJm1heFJlc3VsdHM9QHtsaW1pdHwxMDB9XCIsXCJtZS9mb2xkZXJzXCI6XCJkcml2ZS92Mi9maWxlcz9xPSUyMkB7aWR8cm9vdH0lMjIraW4rcGFyZW50cythbmQrbWltZVR5cGUrPSslMjJhcHBsaWNhdGlvbi92bmQuZ29vZ2xlLWFwcHMuZm9sZGVyJTIyK2FuZCt0cmFzaGVkPWZhbHNlJm1heFJlc3VsdHM9QHtsaW1pdHwxMDB9XCIsXCJtZS9mb2xkZXJcIjpcImRyaXZlL3YyL2ZpbGVzP3E9JTIyQHtpZHxyb290fSUyMitpbitwYXJlbnRzK2FuZCt0cmFzaGVkPWZhbHNlJm1heFJlc3VsdHM9QHtsaW1pdHwxMDB9XCJ9LHBvc3Q6e1wibWUvZmlsZXNcIjpmLFwibWUvZm9sZGVyc1wiOmZ1bmN0aW9uKGUsdCl7ZS5kYXRhPXt0aXRsZTplLmRhdGEubmFtZSxwYXJlbnRzOlt7aWQ6ZS5kYXRhLnBhcmVudHx8XCJyb290XCJ9XSxtaW1lVHlwZTpcImFwcGxpY2F0aW9uL3ZuZC5nb29nbGUtYXBwcy5mb2xkZXJcIn0sdChcImRyaXZlL3YyL2ZpbGVzXCIpfX0scHV0OntcIm1lL2ZpbGVzXCI6Zn0sZGVsOntcIm1lL2ZpbGVzXCI6XCJkcml2ZS92Mi9maWxlcy9Ae2lkfVwiLFwibWUvZm9sZGVyXCI6XCJkcml2ZS92Mi9maWxlcy9Ae2lkfVwifSxwYXRjaDp7XCJtZS9maWxlXCI6XCJkcml2ZS92Mi9maWxlcy9Ae2lkfVwifSx3cmFwOnttZTpmdW5jdGlvbihlKXtyZXR1cm4gZS5pZCYmKGUubGFzdF9uYW1lPWUuZmFtaWx5X25hbWV8fChlLm5hbWU/ZS5uYW1lLmZhbWlseU5hbWU6bnVsbCksZS5maXJzdF9uYW1lPWUuZ2l2ZW5fbmFtZXx8KGUubmFtZT9lLm5hbWUuZ2l2ZW5OYW1lOm51bGwpLGUuZW1haWxzJiZlLmVtYWlscy5sZW5ndGgmJihlLmVtYWlsPWUuZW1haWxzWzBdLnZhbHVlKSxzKGUpKSxlfSxcIm1lL2ZyaWVuZHNcIjpmdW5jdGlvbihlKXtyZXR1cm4gZS5pdGVtcyYmKGMoZSksZS5kYXRhPWUuaXRlbXMsZS5kYXRhLmZvckVhY2gocyksZGVsZXRlIGUuaXRlbXMpLGV9LFwibWUvY29udGFjdHNcIjpsLFwibWUvZm9sbG93ZXJzXCI6bCxcIm1lL2ZvbGxvd2luZ1wiOmwsXCJtZS9zaGFyZVwiOm4sXCJtZS9mZWVkXCI6bixcIm1lL2FsYnVtc1wiOmEsXCJtZS9waG90b3NcIjpyLFwiZGVmYXVsdFwiOmF9LHhocjpmdW5jdGlvbih0KXtyZXR1cm5cInBvc3RcIj09PXQubWV0aG9kfHxcInB1dFwiPT09dC5tZXRob2Q/cCh0KTpcInBhdGNoXCI9PT10Lm1ldGhvZCYmKGUudXRpbHMuZXh0ZW5kKHQucXVlcnksdC5kYXRhKSx0LmRhdGE9bnVsbCksITB9LGZvcm06ITF9fSl9KGhlbGxvKSxmdW5jdGlvbihlKXtmdW5jdGlvbiB0KGUpe3JldHVybntzb3VyY2U6ZS51cmwsd2lkdGg6ZS53aWR0aCxoZWlnaHQ6ZS5oZWlnaHR9fWZ1bmN0aW9uIG4oZSl7cmV0dXJuXCJzdHJpbmdcIj09dHlwZW9mIGU/e2Vycm9yOntjb2RlOlwiaW52YWxpZF9yZXF1ZXN0XCIsbWVzc2FnZTplfX06KGUmJlwibWV0YVwiaW4gZSYmXCJlcnJvcl90eXBlXCJpbiBlLm1ldGEmJihlLmVycm9yPXtjb2RlOmUubWV0YS5lcnJvcl90eXBlLG1lc3NhZ2U6ZS5tZXRhLmVycm9yX21lc3NhZ2V9KSxlKX1mdW5jdGlvbiBvKGUpe3JldHVybiByKGUpLGUmJlwiZGF0YVwiaW4gZSYmZS5kYXRhLmZvckVhY2goaSksZX1mdW5jdGlvbiBpKGUpe2UuaWQmJihlLnRodW1ibmFpbD1lLnByb2ZpbGVfcGljdHVyZSxlLm5hbWU9ZS5mdWxsX25hbWV8fGUudXNlcm5hbWUpfWZ1bmN0aW9uIHIoZSl7XCJwYWdpbmF0aW9uXCJpbiBlJiYoZS5wYWdpbmc9e25leHQ6ZS5wYWdpbmF0aW9uLm5leHRfdXJsfSxkZWxldGUgZS5wYWdpbmF0aW9uKX1lLmluaXQoe2luc3RhZ3JhbTp7bmFtZTpcIkluc3RhZ3JhbVwiLG9hdXRoOnt2ZXJzaW9uOjIsYXV0aDpcImh0dHBzOi8vaW5zdGFncmFtLmNvbS9vYXV0aC9hdXRob3JpemUvXCIsZ3JhbnQ6XCJodHRwczovL2FwaS5pbnN0YWdyYW0uY29tL29hdXRoL2FjY2Vzc190b2tlblwifSxyZWZyZXNoOiEwLHNjb3BlOntiYXNpYzpcImJhc2ljXCIscGhvdG9zOlwiXCIsZnJpZW5kczpcInJlbGF0aW9uc2hpcHNcIixwdWJsaXNoOlwibGlrZXMgY29tbWVudHNcIixlbWFpbDpcIlwiLHNoYXJlOlwiXCIscHVibGlzaF9maWxlczpcIlwiLGZpbGVzOlwiXCIsdmlkZW9zOlwiXCIsb2ZmbGluZV9hY2Nlc3M6XCJcIn0sc2NvcGVfZGVsaW06XCIgXCIsYmFzZTpcImh0dHBzOi8vYXBpLmluc3RhZ3JhbS5jb20vdjEvXCIsZ2V0OnttZTpcInVzZXJzL3NlbGZcIixcIm1lL2ZlZWRcIjpcInVzZXJzL3NlbGYvZmVlZD9jb3VudD1Ae2xpbWl0fDEwMH1cIixcIm1lL3Bob3Rvc1wiOlwidXNlcnMvc2VsZi9tZWRpYS9yZWNlbnQ/bWluX2lkPTAmY291bnQ9QHtsaW1pdHwxMDB9XCIsXCJtZS9mcmllbmRzXCI6XCJ1c2Vycy9zZWxmL2ZvbGxvd3M/Y291bnQ9QHtsaW1pdHwxMDB9XCIsXCJtZS9mb2xsb3dpbmdcIjpcInVzZXJzL3NlbGYvZm9sbG93cz9jb3VudD1Ae2xpbWl0fDEwMH1cIixcIm1lL2ZvbGxvd2Vyc1wiOlwidXNlcnMvc2VsZi9mb2xsb3dlZC1ieT9jb3VudD1Ae2xpbWl0fDEwMH1cIixcImZyaWVuZC9waG90b3NcIjpcInVzZXJzL0B7aWR9L21lZGlhL3JlY2VudD9taW5faWQ9MCZjb3VudD1Ae2xpbWl0fDEwMH1cIn0scG9zdDp7XCJtZS9saWtlXCI6ZnVuY3Rpb24oZSx0KXt2YXIgbj1lLmRhdGEuaWQ7ZS5kYXRhPXt9LHQoXCJtZWRpYS9cIituK1wiL2xpa2VzXCIpfX0sZGVsOntcIm1lL2xpa2VcIjpcIm1lZGlhL0B7aWR9L2xpa2VzXCJ9LHdyYXA6e21lOmZ1bmN0aW9uKGUpe3JldHVybiBuKGUpLFwiZGF0YVwiaW4gZSYmKGUuaWQ9ZS5kYXRhLmlkLGUudGh1bWJuYWlsPWUuZGF0YS5wcm9maWxlX3BpY3R1cmUsZS5uYW1lPWUuZGF0YS5mdWxsX25hbWV8fGUuZGF0YS51c2VybmFtZSksZX0sXCJtZS9mcmllbmRzXCI6byxcIm1lL2ZvbGxvd2luZ1wiOm8sXCJtZS9mb2xsb3dlcnNcIjpvLFwibWUvcGhvdG9zXCI6ZnVuY3Rpb24oZSl7cmV0dXJuIG4oZSkscihlKSxcImRhdGFcImluIGUmJihlLmRhdGE9ZS5kYXRhLmZpbHRlcihmdW5jdGlvbihlKXtyZXR1cm5cImltYWdlXCI9PT1lLnR5cGV9KSxlLmRhdGEuZm9yRWFjaChmdW5jdGlvbihlKXtlLm5hbWU9ZS5jYXB0aW9uP2UuY2FwdGlvbi50ZXh0Om51bGwsZS50aHVtYm5haWw9ZS5pbWFnZXMudGh1bWJuYWlsLnVybCxlLnBpY3R1cmU9ZS5pbWFnZXMuc3RhbmRhcmRfcmVzb2x1dGlvbi51cmwsZS5waWN0dXJlcz1PYmplY3Qua2V5cyhlLmltYWdlcykubWFwKGZ1bmN0aW9uKG4pe3ZhciBvPWUuaW1hZ2VzW25dO3JldHVybiB0KG8pfSkuc29ydChmdW5jdGlvbihlLHQpe3JldHVybiBlLndpZHRoLXQud2lkdGh9KX0pKSxlfSxcImRlZmF1bHRcIjpmdW5jdGlvbihlKXtyZXR1cm4gZT1uKGUpLHIoZSksZX19LHhocjpmdW5jdGlvbihlLHQpe3ZhciBuPWUubWV0aG9kLG89XCJnZXRcIiE9PW47cmV0dXJuIG8mJihcInBvc3RcIiE9PW4mJlwicHV0XCIhPT1ufHwhZS5xdWVyeS5hY2Nlc3NfdG9rZW58fChlLmRhdGEuYWNjZXNzX3Rva2VuPWUucXVlcnkuYWNjZXNzX3Rva2VuLGRlbGV0ZSBlLnF1ZXJ5LmFjY2Vzc190b2tlbiksZS5wcm94eT1vKSxvfSxmb3JtOiExfX0pfShoZWxsbyksZnVuY3Rpb24oZSl7ZnVuY3Rpb24gdChlLHQpe3ZhciBuLGk7cmV0dXJuIGUmJlwiTWVzc2FnZVwiaW4gZSYmKGk9ZS5NZXNzYWdlLGRlbGV0ZSBlLk1lc3NhZ2UsXCJFcnJvckNvZGVcImluIGU/KG49ZS5FcnJvckNvZGUsZGVsZXRlIGUuRXJyb3JDb2RlKTpuPW8odCksZS5lcnJvcj17Y29kZTpuLG1lc3NhZ2U6aSxkZXRhaWxzOmV9KSxlfWZ1bmN0aW9uIG4oZSx0KXt2YXIgbj10LmFjY2Vzc190b2tlbjtyZXR1cm4gZGVsZXRlIHQuYWNjZXNzX3Rva2VuLGUuaGVhZGVycy5BdXRob3JpemF0aW9uPVwiQmVhcmVyIFwiK24sXCJnZXRcIiE9PWUubWV0aG9kJiZlLmRhdGEmJihlLmhlYWRlcnNbXCJDb250ZW50LVR5cGVcIl09XCJhcHBsaWNhdGlvbi9qc29uXCIsXCJvYmplY3RcIj09dHlwZW9mIGUuZGF0YSYmKGUuZGF0YT1KU09OLnN0cmluZ2lmeShlLmRhdGEpKSksXCJwdXRcIj09PWUubWV0aG9kJiYoZS5tZXRob2Q9XCJwYXRjaFwiKSwhMH1mdW5jdGlvbiBvKGUpe3N3aXRjaChlLnN0YXR1c0NvZGUpe2Nhc2UgNDAwOnJldHVyblwiaW52YWxpZF9yZXF1ZXN0XCI7Y2FzZSA0MDM6cmV0dXJuXCJzdGFsZV90b2tlblwiO2Nhc2UgNDAxOnJldHVyblwiaW52YWxpZF90b2tlblwiO2Nhc2UgNTAwOnJldHVyblwic2VydmVyX2Vycm9yXCI7ZGVmYXVsdDpyZXR1cm5cInNlcnZlcl9lcnJvclwifX1lLmluaXQoe2pvaW5tZTp7bmFtZTpcImpvaW4ubWVcIixvYXV0aDp7dmVyc2lvbjoyLGF1dGg6XCJodHRwczovL3NlY3VyZS5qb2luLm1lL2FwaS9wdWJsaWMvdjEvYXV0aC9vYXV0aDJcIixncmFudDpcImh0dHBzOi8vc2VjdXJlLmpvaW4ubWUvYXBpL3B1YmxpYy92MS9hdXRoL29hdXRoMlwifSxyZWZyZXNoOiExLHNjb3BlOntiYXNpYzpcInVzZXJfaW5mb1wiLHVzZXI6XCJ1c2VyX2luZm9cIixzY2hlZHVsZXI6XCJzY2hlZHVsZXJcIixzdGFydDpcInN0YXJ0X21lZXRpbmdcIixlbWFpbDpcIlwiLGZyaWVuZHM6XCJcIixzaGFyZTpcIlwiLHB1Ymxpc2g6XCJcIixwaG90b3M6XCJcIixwdWJsaXNoX2ZpbGVzOlwiXCIsZmlsZXM6XCJcIix2aWRlb3M6XCJcIixvZmZsaW5lX2FjY2VzczpcIlwifSxzY29wZV9kZWxpbTpcIiBcIixsb2dpbjpmdW5jdGlvbihlKXtlLm9wdGlvbnMucG9wdXAud2lkdGg9NDAwLGUub3B0aW9ucy5wb3B1cC5oZWlnaHQ9NzAwfSxiYXNlOlwiaHR0cHM6Ly9hcGkuam9pbi5tZS92MS9cIixnZXQ6e21lOlwidXNlclwiLG1lZXRpbmdzOlwibWVldGluZ3NcIixcIm1lZXRpbmdzL2luZm9cIjpcIm1lZXRpbmdzL0B7aWR9XCJ9LHBvc3Q6e1wibWVldGluZ3Mvc3RhcnQvYWRob2NcIjpmdW5jdGlvbihlLHQpe3QoXCJtZWV0aW5ncy9zdGFydFwiKX0sXCJtZWV0aW5ncy9zdGFydC9zY2hlZHVsZWRcIjpmdW5jdGlvbihlLHQpe3ZhciBuPWUuZGF0YS5tZWV0aW5nSWQ7ZS5kYXRhPXt9LHQoXCJtZWV0aW5ncy9cIituK1wiL3N0YXJ0XCIpfSxcIm1lZXRpbmdzL3NjaGVkdWxlXCI6ZnVuY3Rpb24oZSx0KXt0KFwibWVldGluZ3NcIil9fSxwYXRjaDp7XCJtZWV0aW5ncy91cGRhdGVcIjpmdW5jdGlvbihlLHQpe3QoXCJtZWV0aW5ncy9cIitlLmRhdGEubWVldGluZ0lkKX19LGRlbDp7XCJtZWV0aW5ncy9kZWxldGVcIjpcIm1lZXRpbmdzL0B7aWR9XCJ9LHdyYXA6e21lOmZ1bmN0aW9uKGUsbil7cmV0dXJuIHQoZSxuKSxlLmVtYWlsPyhlLm5hbWU9ZS5mdWxsTmFtZSxlLmZpcnN0X25hbWU9ZS5uYW1lLnNwbGl0KFwiIFwiKVswXSxlLmxhc3RfbmFtZT1lLm5hbWUuc3BsaXQoXCIgXCIpWzFdLGUuaWQ9ZS5lbWFpbCxlKTplfSxcImRlZmF1bHRcIjpmdW5jdGlvbihlLG4pe3JldHVybiB0KGUsbiksZX19LHhocjpufX0pfShoZWxsbyksZnVuY3Rpb24oZSl7ZnVuY3Rpb24gdChlKXtlJiZcImVycm9yQ29kZVwiaW4gZSYmKGUuZXJyb3I9e2NvZGU6ZS5zdGF0dXMsbWVzc2FnZTplLm1lc3NhZ2V9KX1mdW5jdGlvbiBuKGUpe3JldHVybiBlLmVycm9yP3ZvaWQgMDooZS5maXJzdF9uYW1lPWUuZmlyc3ROYW1lLGUubGFzdF9uYW1lPWUubGFzdE5hbWUsZS5uYW1lPWUuZm9ybWF0dGVkTmFtZXx8ZS5maXJzdF9uYW1lK1wiIFwiK2UubGFzdF9uYW1lLGUudGh1bWJuYWlsPWUucGljdHVyZVVybCxlLmVtYWlsPWUuZW1haWxBZGRyZXNzLGUpfWZ1bmN0aW9uIG8oZSl7cmV0dXJuIHQoZSksaShlKSxlLnZhbHVlcyYmKGUuZGF0YT1lLnZhbHVlcy5tYXAobiksZGVsZXRlIGUudmFsdWVzKSxlfWZ1bmN0aW9uIGkoZSl7XCJfY291bnRcImluIGUmJlwiX3N0YXJ0XCJpbiBlJiZlLl9jb3VudCtlLl9zdGFydDxlLl90b3RhbCYmKGUucGFnaW5nPXtuZXh0OlwiP3N0YXJ0PVwiKyhlLl9zdGFydCtlLl9jb3VudCkrXCImY291bnQ9XCIrZS5fY291bnR9KX1mdW5jdGlvbiByKGUsdCl7XCJ7fVwiPT09SlNPTi5zdHJpbmdpZnkoZSkmJjIwMD09PXQuc3RhdHVzQ29kZSYmKGUuc3VjY2Vzcz0hMCl9ZnVuY3Rpb24gYShlKXtlLmFjY2Vzc190b2tlbiYmKGUub2F1dGgyX2FjY2Vzc190b2tlbj1lLmFjY2Vzc190b2tlbixkZWxldGUgZS5hY2Nlc3NfdG9rZW4pfWZ1bmN0aW9uIHMoZSx0KXtlLmhlYWRlcnNbXCJ4LWxpLWZvcm1hdFwiXT1cImpzb25cIjt2YXIgbj1lLmRhdGEuaWQ7ZS5kYXRhPShcImRlbGV0ZVwiIT09ZS5tZXRob2QpLnRvU3RyaW5nKCksZS5tZXRob2Q9XCJwdXRcIix0KFwicGVvcGxlL34vbmV0d29yay91cGRhdGVzL2tleT1cIituK1wiL2lzLWxpa2VkXCIpfWUuaW5pdCh7bGlua2VkaW46e29hdXRoOnt2ZXJzaW9uOjIscmVzcG9uc2VfdHlwZTpcImNvZGVcIixhdXRoOlwiaHR0cHM6Ly93d3cubGlua2VkaW4uY29tL3Vhcy9vYXV0aDIvYXV0aG9yaXphdGlvblwiLGdyYW50OlwiaHR0cHM6Ly93d3cubGlua2VkaW4uY29tL3Vhcy9vYXV0aDIvYWNjZXNzVG9rZW5cIn0scmVmcmVzaDohMCxzY29wZTp7YmFzaWM6XCJyX2Jhc2ljcHJvZmlsZVwiLGVtYWlsOlwicl9lbWFpbGFkZHJlc3NcIixmaWxlczpcIlwiLGZyaWVuZHM6XCJcIixwaG90b3M6XCJcIixwdWJsaXNoOlwid19zaGFyZVwiLHB1Ymxpc2hfZmlsZXM6XCJ3X3NoYXJlXCIsc2hhcmU6XCJcIix2aWRlb3M6XCJcIixvZmZsaW5lX2FjY2VzczpcIlwifSxzY29wZV9kZWxpbTpcIiBcIixiYXNlOlwiaHR0cHM6Ly9hcGkubGlua2VkaW4uY29tL3YxL1wiLGdldDp7bWU6XCJwZW9wbGUvfjoocGljdHVyZS11cmwsZmlyc3QtbmFtZSxsYXN0LW5hbWUsaWQsZm9ybWF0dGVkLW5hbWUsZW1haWwtYWRkcmVzcylcIixcIm1lL3NoYXJlXCI6XCJwZW9wbGUvfi9uZXR3b3JrL3VwZGF0ZXM/Y291bnQ9QHtsaW1pdHwyNTB9XCJ9LHBvc3Q6e1wibWUvc2hhcmVcIjpmdW5jdGlvbihlLHQpe3ZhciBuPXt2aXNpYmlsaXR5Ontjb2RlOlwiYW55b25lXCJ9fTtlLmRhdGEuaWQ/bi5hdHRyaWJ1dGlvbj17c2hhcmU6e2lkOmUuZGF0YS5pZH19OihuLmNvbW1lbnQ9ZS5kYXRhLm1lc3NhZ2UsZS5kYXRhLnBpY3R1cmUmJmUuZGF0YS5saW5rJiYobi5jb250ZW50PXtcInN1Ym1pdHRlZC11cmxcIjplLmRhdGEubGluayxcInN1Ym1pdHRlZC1pbWFnZS11cmxcIjplLmRhdGEucGljdHVyZX0pKSxlLmRhdGE9SlNPTi5zdHJpbmdpZnkobiksdChcInBlb3BsZS9+L3NoYXJlcz9mb3JtYXQ9anNvblwiKX0sXCJtZS9saWtlXCI6c30sZGVsOntcIm1lL2xpa2VcIjpzfSx3cmFwOnttZTpmdW5jdGlvbihlKXtyZXR1cm4gdChlKSxuKGUpLGV9LFwibWUvZnJpZW5kc1wiOm8sXCJtZS9mb2xsb3dpbmdcIjpvLFwibWUvZm9sbG93ZXJzXCI6byxcIm1lL3NoYXJlXCI6ZnVuY3Rpb24oZSl7cmV0dXJuIHQoZSksaShlKSxlLnZhbHVlcyYmKGUuZGF0YT1lLnZhbHVlcy5tYXAobiksZS5kYXRhLmZvckVhY2goZnVuY3Rpb24oZSl7ZS5tZXNzYWdlPWUuaGVhZGxpbmV9KSxkZWxldGUgZS52YWx1ZXMpLGV9LFwiZGVmYXVsdFwiOmZ1bmN0aW9uKGUsbil7dChlKSxyKGUsbiksaShlKX19LGpzb25wOmZ1bmN0aW9uKGUsdCl7YSh0KSxcImdldFwiPT09ZS5tZXRob2QmJih0LmZvcm1hdD1cImpzb25wXCIsdFtcImVycm9yLWNhbGxiYWNrXCJdPWUuY2FsbGJhY2tJRCl9LHhocjpmdW5jdGlvbihlLHQpe3JldHVyblwiZ2V0XCIhPT1lLm1ldGhvZD8oYSh0KSxlLmhlYWRlcnNbXCJDb250ZW50LVR5cGVcIl09XCJhcHBsaWNhdGlvbi9qc29uXCIsZS5oZWFkZXJzW1wieC1saS1mb3JtYXRcIl09XCJqc29uXCIsZS5wcm94eT0hMCwhMCk6ITF9fX0pfShoZWxsbyksZnVuY3Rpb24oZSl7ZnVuY3Rpb24gdChlLHQpe3ZhciBuPXQuYWNjZXNzX3Rva2VuO3JldHVybiBkZWxldGUgdC5hY2Nlc3NfdG9rZW4sdC5vYXV0aF90b2tlbj1uLHRbXCJfc3RhdHVzX2NvZGVfbWFwWzMwMl1cIl09MjAwLCEwfWZ1bmN0aW9uIG4oZSl7cmV0dXJuIGUuaWQmJihlLnBpY3R1cmU9ZS5hdmF0YXJfdXJsLGUudGh1bWJuYWlsPWUuYXZhdGFyX3VybCxlLm5hbWU9ZS51c2VybmFtZXx8ZS5mdWxsX25hbWUpLGV9ZnVuY3Rpb24gbyhlKXtcIm5leHRfaHJlZlwiaW4gZSYmKGUucGFnaW5nPXtuZXh0OmUubmV4dF9ocmVmfSl9ZS5pbml0KHtzb3VuZGNsb3VkOntuYW1lOlwiU291bmRDbG91ZFwiLG9hdXRoOnt2ZXJzaW9uOjIsYXV0aDpcImh0dHBzOi8vc291bmRjbG91ZC5jb20vY29ubmVjdFwiLGdyYW50OlwiaHR0cHM6Ly9zb3VuZGNsb3VkLmNvbS9vYXV0aDIvdG9rZW5cIn0sYmFzZTpcImh0dHBzOi8vYXBpLnNvdW5kY2xvdWQuY29tL1wiLGdldDp7bWU6XCJtZS5qc29uXCIsXCJtZS9mcmllbmRzXCI6XCJtZS9mb2xsb3dpbmdzLmpzb25cIixcIm1lL2ZvbGxvd2Vyc1wiOlwibWUvZm9sbG93ZXJzLmpzb25cIixcIm1lL2ZvbGxvd2luZ1wiOlwibWUvZm9sbG93aW5ncy5qc29uXCIsXCJkZWZhdWx0XCI6ZnVuY3Rpb24oZSx0KXt0KGUucGF0aCtcIi5qc29uXCIpfX0sd3JhcDp7bWU6ZnVuY3Rpb24oZSl7cmV0dXJuIG4oZSksZX0sXCJkZWZhdWx0XCI6ZnVuY3Rpb24oZSl7cmV0dXJuIEFycmF5LmlzQXJyYXkoZSkmJihlPXtkYXRhOmUubWFwKG4pfSksbyhlKSxlfX0seGhyOnQsanNvbnA6dH19KX0oaGVsbG8pLGZ1bmN0aW9uKGUpe2Z1bmN0aW9uIHQoZSl7aWYoZS5pZCl7aWYoZS5uYW1lKXt2YXIgdD1lLm5hbWUuc3BsaXQoXCIgXCIpO2UuZmlyc3RfbmFtZT10LnNoaWZ0KCksZS5sYXN0X25hbWU9dC5qb2luKFwiIFwiKX1lLnRodW1ibmFpbD1lLnByb2ZpbGVfaW1hZ2VfdXJsX2h0dHBzfHxlLnByb2ZpbGVfaW1hZ2VfdXJsfXJldHVybiBlfWZ1bmN0aW9uIG4oZSl7cmV0dXJuIG8oZSksaShlKSxlLnVzZXJzJiYoZS5kYXRhPWUudXNlcnMubWFwKHQpLGRlbGV0ZSBlLnVzZXJzKSxlfWZ1bmN0aW9uIG8oZSl7aWYoZS5lcnJvcnMpe3ZhciB0PWUuZXJyb3JzWzBdO2UuZXJyb3I9e2NvZGU6XCJyZXF1ZXN0X2ZhaWxlZFwiLG1lc3NhZ2U6dC5tZXNzYWdlfX19ZnVuY3Rpb24gaShlKXtcIm5leHRfY3Vyc29yX3N0clwiaW4gZSYmKGUucGFnaW5nPXtuZXh0OlwiP2N1cnNvcj1cIitlLm5leHRfY3Vyc29yX3N0cn0pfWZ1bmN0aW9uIHIoZSl7cmV0dXJuIEFycmF5LmlzQXJyYXkoZSk/e2RhdGE6ZX06ZX12YXIgYT1cImh0dHBzOi8vYXBpLnR3aXR0ZXIuY29tL1wiO2UuaW5pdCh7dHdpdHRlcjp7b2F1dGg6e3ZlcnNpb246XCIxLjBhXCIsYXV0aDphK1wib2F1dGgvYXV0aGVudGljYXRlXCIscmVxdWVzdDphK1wib2F1dGgvcmVxdWVzdF90b2tlblwiLHRva2VuOmErXCJvYXV0aC9hY2Nlc3NfdG9rZW5cIn0sbG9naW46ZnVuY3Rpb24oZSl7dmFyIHQ9XCI/Zm9yY2VfbG9naW49dHJ1ZVwiO3RoaXMub2F1dGguYXV0aD10aGlzLm9hdXRoLmF1dGgucmVwbGFjZSh0LFwiXCIpKyhlLm9wdGlvbnMuZm9yY2U/dDpcIlwiKX0sYmFzZTphK1wiMS4xL1wiLGdldDp7bWU6XCJhY2NvdW50L3ZlcmlmeV9jcmVkZW50aWFscy5qc29uXCIsXCJtZS9mcmllbmRzXCI6XCJmcmllbmRzL2xpc3QuanNvbj9jb3VudD1Ae2xpbWl0fDIwMH1cIixcIm1lL2ZvbGxvd2luZ1wiOlwiZnJpZW5kcy9saXN0Lmpzb24/Y291bnQ9QHtsaW1pdHwyMDB9XCIsXCJtZS9mb2xsb3dlcnNcIjpcImZvbGxvd2Vycy9saXN0Lmpzb24/Y291bnQ9QHtsaW1pdHwyMDB9XCIsXCJtZS9zaGFyZVwiOlwic3RhdHVzZXMvdXNlcl90aW1lbGluZS5qc29uP2NvdW50PUB7bGltaXR8MjAwfVwiLFwibWUvbGlrZVwiOlwiZmF2b3JpdGVzL2xpc3QuanNvbj9jb3VudD1Ae2xpbWl0fDIwMH1cIn0scG9zdDp7XCJtZS9zaGFyZVwiOmZ1bmN0aW9uKHQsbil7dmFyIG89dC5kYXRhO3QuZGF0YT1udWxsO3ZhciBpPVtdO28ubWVzc2FnZSYmKGkucHVzaChvLm1lc3NhZ2UpLGRlbGV0ZSBvLm1lc3NhZ2UpLG8ubGluayYmKGkucHVzaChvLmxpbmspLGRlbGV0ZSBvLmxpbmspLG8ucGljdHVyZSYmKGkucHVzaChvLnBpY3R1cmUpLGRlbGV0ZSBvLnBpY3R1cmUpLGkubGVuZ3RoJiYoby5zdGF0dXM9aS5qb2luKFwiIFwiKSksby5maWxlPyhvW1wibWVkaWFbXVwiXT1vLmZpbGUsZGVsZXRlIG8uZmlsZSx0LmRhdGE9byxuKFwic3RhdHVzZXMvdXBkYXRlX3dpdGhfbWVkaWEuanNvblwiKSk6XCJpZFwiaW4gbz9uKFwic3RhdHVzZXMvcmV0d2VldC9cIitvLmlkK1wiLmpzb25cIik6KGUudXRpbHMuZXh0ZW5kKHQucXVlcnksbyksbihcInN0YXR1c2VzL3VwZGF0ZS5qc29uP2luY2x1ZGVfZW50aXRpZXM9MVwiKSl9LFwibWUvbGlrZVwiOmZ1bmN0aW9uKGUsdCl7dmFyIG49ZS5kYXRhLmlkO2UuZGF0YT1udWxsLHQoXCJmYXZvcml0ZXMvY3JlYXRlLmpzb24/aWQ9XCIrbil9fSxkZWw6e1wibWUvbGlrZVwiOmZ1bmN0aW9uKCl7cC5tZXRob2Q9XCJwb3N0XCI7dmFyIGU9cC5kYXRhLmlkO3AuZGF0YT1udWxsLGNhbGxiYWNrKFwiZmF2b3JpdGVzL2Rlc3Ryb3kuanNvbj9pZD1cIitlKX19LHdyYXA6e21lOmZ1bmN0aW9uKGUpe3JldHVybiBvKGUpLHQoZSksZX0sXCJtZS9mcmllbmRzXCI6bixcIm1lL2ZvbGxvd2Vyc1wiOm4sXCJtZS9mb2xsb3dpbmdcIjpuLFwibWUvc2hhcmVcIjpmdW5jdGlvbihlKXtyZXR1cm4gbyhlKSxpKGUpLCFlLmVycm9yJiZcImxlbmd0aFwiaW4gZT97ZGF0YTplfTplfSxcImRlZmF1bHRcIjpmdW5jdGlvbihlKXtyZXR1cm4gZT1yKGUpLGkoZSksZX19LHhocjpmdW5jdGlvbihlKXtyZXR1cm5cImdldFwiIT09ZS5tZXRob2R9fX0pfShoZWxsbyksZnVuY3Rpb24oZSl7ZnVuY3Rpb24gdChlLHQpe3JldHVybiBudWxsIT09ZSYmXCJyZXNwb25zZVwiaW4gZSYmbnVsbCE9PWUucmVzcG9uc2UmJmUucmVzcG9uc2UubGVuZ3RoJiYoZT1lLnJlc3BvbnNlWzBdLGUuaWQ9ZS51aWQsZS50aHVtYm5haWw9ZS5waWN0dXJlPWUucGhvdG9fbWF4LGUubmFtZT1lLmZpcnN0X25hbWUrXCIgXCIrZS5sYXN0X25hbWUsdC5hdXRoUmVzcG9uc2UmJm51bGwhPT10LmF1dGhSZXNwb25zZS5lbWFpbCYmKGUuZW1haWw9dC5hdXRoUmVzcG9uc2UuZW1haWwpKSxlfWZ1bmN0aW9uIG4oZSl7aWYoZS5lcnJvcil7dmFyIHQ9ZS5lcnJvcjtlLmVycm9yPXtjb2RlOnQuZXJyb3JfY29kZSxtZXNzYWdlOnQuZXJyb3JfbXNnfX19ZS5pbml0KHt2azp7bmFtZTpcIlZrXCIsb2F1dGg6e3ZlcnNpb246MixhdXRoOlwiaHR0cHM6Ly9vYXV0aC52ay5jb20vYXV0aG9yaXplXCIsZ3JhbnQ6XCJodHRwczovL29hdXRoLnZrLmNvbS9hY2Nlc3NfdG9rZW5cIn0sc2NvcGU6e2VtYWlsOlwiZW1haWxcIixmcmllbmRzOlwiZnJpZW5kc1wiLHBob3RvczpcInBob3Rvc1wiLHZpZGVvczpcInZpZGVvXCIsc2hhcmU6XCJzaGFyZVwiLG9mZmxpbmVfYWNjZXNzOlwib2ZmbGluZVwifSxyZWZyZXNoOiEwLGxvZ2luOmZ1bmN0aW9uKGUpe2UucXMuZGlzcGxheT13aW5kb3cubmF2aWdhdG9yJiZ3aW5kb3cubmF2aWdhdG9yLnVzZXJBZ2VudCYmL2lwYWR8cGhvbmV8cGhvbmV8YW5kcm9pZC8udGVzdCh3aW5kb3cubmF2aWdhdG9yLnVzZXJBZ2VudC50b0xvd2VyQ2FzZSgpKT9cIm1vYmlsZVwiOlwicG9wdXBcIn0sYmFzZTpcImh0dHBzOi8vYXBpLnZrLmNvbS9tZXRob2QvXCIsZ2V0OnttZTpmdW5jdGlvbihlLHQpe2UucXVlcnkuZmllbGRzPVwiaWQsZmlyc3RfbmFtZSxsYXN0X25hbWUscGhvdG9fbWF4XCIsdChcInVzZXJzLmdldFwiKX19LHdyYXA6e21lOmZ1bmN0aW9uKGUsbyxpKXtyZXR1cm4gbihlKSx0KGUsaSl9fSx4aHI6ITEsanNvbnA6ITAsZm9ybTohMX19KX0oaGVsbG8pLGZ1bmN0aW9uKGUpe2Z1bmN0aW9uIHQoZSl7cmV0dXJuXCJkYXRhXCJpbiBlJiZlLmRhdGEuZm9yRWFjaChmdW5jdGlvbihlKXtlLnBpY3R1cmUmJihlLnRodW1ibmFpbD1lLnBpY3R1cmUpLGUuaW1hZ2VzJiYoZS5waWN0dXJlcz1lLmltYWdlcy5tYXAobikuc29ydChmdW5jdGlvbihlLHQpe3JldHVybiBlLndpZHRoLXQud2lkdGh9KSl9KSxlfWZ1bmN0aW9uIG4oZSl7cmV0dXJue3dpZHRoOmUud2lkdGgsaGVpZ2h0OmUuaGVpZ2h0LHNvdXJjZTplLnNvdXJjZX19ZnVuY3Rpb24gbyhlKXtyZXR1cm5cImRhdGFcImluIGUmJmUuZGF0YS5mb3JFYWNoKGZ1bmN0aW9uKGUpe2UucGhvdG9zPWUuZmlsZXM9XCJodHRwczovL2FwaXMubGl2ZS5uZXQvdjUuMC9cIitlLmlkK1wiL3Bob3Rvc1wifSksZX1mdW5jdGlvbiBpKGUsdCxuKXtpZihlLmlkKXt2YXIgbz1uLnF1ZXJ5LmFjY2Vzc190b2tlbjtpZihlLmVtYWlscyYmKGUuZW1haWw9ZS5lbWFpbHMucHJlZmVycmVkKSxlLmlzX2ZyaWVuZCE9PSExKXt2YXIgaT1lLnVzZXJfaWR8fGUuaWQ7ZS50aHVtYm5haWw9ZS5waWN0dXJlPVwiaHR0cHM6Ly9hcGlzLmxpdmUubmV0L3Y1LjAvXCIraStcIi9waWN0dXJlP2FjY2Vzc190b2tlbj1cIitvfX1yZXR1cm4gZX1mdW5jdGlvbiByKGUsdCxuKXtyZXR1cm5cImRhdGFcImluIGUmJmUuZGF0YS5mb3JFYWNoKGZ1bmN0aW9uKGUpe2koZSx0LG4pfSksZX1lLmluaXQoe3dpbmRvd3M6e25hbWU6XCJXaW5kb3dzIGxpdmVcIixvYXV0aDp7dmVyc2lvbjoyLGF1dGg6XCJodHRwczovL2xvZ2luLmxpdmUuY29tL29hdXRoMjBfYXV0aG9yaXplLnNyZlwiLGdyYW50OlwiaHR0cHM6Ly9sb2dpbi5saXZlLmNvbS9vYXV0aDIwX3Rva2VuLnNyZlwifSxyZWZyZXNoOiEwLGxvZ291dDpmdW5jdGlvbigpe3JldHVyblwiaHR0cDovL2xvZ2luLmxpdmUuY29tL29hdXRoMjBfbG9nb3V0LnNyZj90cz1cIisobmV3IERhdGUpLmdldFRpbWUoKX0sc2NvcGU6e2Jhc2ljOlwid2wuc2lnbmluLHdsLmJhc2ljXCIsZW1haWw6XCJ3bC5lbWFpbHNcIixiaXJ0aGRheTpcIndsLmJpcnRoZGF5XCIsZXZlbnRzOlwid2wuY2FsZW5kYXJzXCIscGhvdG9zOlwid2wucGhvdG9zXCIsdmlkZW9zOlwid2wucGhvdG9zXCIsZnJpZW5kczpcIndsLmNvbnRhY3RzX2VtYWlsc1wiLGZpbGVzOlwid2wuc2t5ZHJpdmVcIixwdWJsaXNoOlwid2wuc2hhcmVcIixwdWJsaXNoX2ZpbGVzOlwid2wuc2t5ZHJpdmVfdXBkYXRlXCIsc2hhcmU6XCJ3bC5zaGFyZVwiLGNyZWF0ZV9ldmVudDpcIndsLmNhbGVuZGFyc191cGRhdGUsd2wuZXZlbnRzX2NyZWF0ZVwiLG9mZmxpbmVfYWNjZXNzOlwid2wub2ZmbGluZV9hY2Nlc3NcIn0sYmFzZTpcImh0dHBzOi8vYXBpcy5saXZlLm5ldC92NS4wL1wiLGdldDp7bWU6XCJtZVwiLFwibWUvZnJpZW5kc1wiOlwibWUvZnJpZW5kc1wiLFwibWUvZm9sbG93aW5nXCI6XCJtZS9jb250YWN0c1wiLFwibWUvZm9sbG93ZXJzXCI6XCJtZS9mcmllbmRzXCIsXCJtZS9jb250YWN0c1wiOlwibWUvY29udGFjdHNcIixcIm1lL2FsYnVtc1wiOlwibWUvYWxidW1zXCIsXCJtZS9hbGJ1bVwiOlwiQHtpZH0vZmlsZXNcIixcIm1lL3Bob3RvXCI6XCJAe2lkfVwiLFwibWUvZmlsZXNcIjpcIkB7cGFyZW50fG1lL3NreWRyaXZlfS9maWxlc1wiLFwibWUvZm9sZGVyc1wiOlwiQHtpZHxtZS9za3lkcml2ZX0vZmlsZXNcIixcIm1lL2ZvbGRlclwiOlwiQHtpZHxtZS9za3lkcml2ZX0vZmlsZXNcIn0scG9zdDp7XCJtZS9hbGJ1bXNcIjpcIm1lL2FsYnVtc1wiLFwibWUvYWxidW1cIjpcIkB7aWR9L2ZpbGVzL1wiLFwibWUvZm9sZGVyc1wiOlwiQHtpZHxtZS9za3lkcml2ZS99XCIsXCJtZS9maWxlc1wiOlwiQHtwYXJlbnR8bWUvc2t5ZHJpdmV9L2ZpbGVzXCJ9LGRlbDp7XCJtZS9hbGJ1bVwiOlwiQHtpZH1cIixcIm1lL3Bob3RvXCI6XCJAe2lkfVwiLFwibWUvZm9sZGVyXCI6XCJAe2lkfVwiLFwibWUvZmlsZXNcIjpcIkB7aWR9XCJ9LHdyYXA6e21lOmksXCJtZS9mcmllbmRzXCI6cixcIm1lL2NvbnRhY3RzXCI6cixcIm1lL2ZvbGxvd2Vyc1wiOnIsXCJtZS9mb2xsb3dpbmdcIjpyLFwibWUvYWxidW1zXCI6byxcIm1lL3Bob3Rvc1wiOnQsXCJkZWZhdWx0XCI6dH0seGhyOmZ1bmN0aW9uKHQpe3JldHVyblwiZ2V0XCI9PT10Lm1ldGhvZHx8XCJkZWxldGVcIj09PXQubWV0aG9kfHxlLnV0aWxzLmhhc0JpbmFyeSh0LmRhdGEpfHwoXCJzdHJpbmdcIj09dHlwZW9mIHQuZGF0YS5maWxlP3QuZGF0YS5maWxlPWUudXRpbHMudG9CbG9iKHQuZGF0YS5maWxlKToodC5kYXRhPUpTT04uc3RyaW5naWZ5KHQuZGF0YSksdC5oZWFkZXJzPXtcIkNvbnRlbnQtVHlwZVwiOlwiYXBwbGljYXRpb24vanNvblwifSkpLCEwfSxqc29ucDpmdW5jdGlvbih0KXtcImdldFwiPT09dC5tZXRob2R8fGUudXRpbHMuaGFzQmluYXJ5KHQuZGF0YSl8fCh0LmRhdGEubWV0aG9kPXQubWV0aG9kLHQubWV0aG9kPVwiZ2V0XCIpfX19KX0oaGVsbG8pLGZ1bmN0aW9uKGUpe2Z1bmN0aW9uIHQoZSl7ZSYmXCJtZXRhXCJpbiBlJiZcImVycm9yX3R5cGVcImluIGUubWV0YSYmKGUuZXJyb3I9e2NvZGU6ZS5tZXRhLmVycm9yX3R5cGUsbWVzc2FnZTplLm1ldGEuZXJyb3JfbWVzc2FnZX0pfWZ1bmN0aW9uIG4oZSl7aWYodChlKSxlLnF1ZXJ5JiZlLnF1ZXJ5LnJlc3VsdHMmJmUucXVlcnkucmVzdWx0cy5wcm9maWxlKXtlPWUucXVlcnkucmVzdWx0cy5wcm9maWxlLGUuaWQ9ZS5ndWlkLGUubGFzdF9uYW1lPWUuZmFtaWx5TmFtZSxlLmZpcnN0X25hbWU9ZS5naXZlbk5hbWV8fGUubmlja25hbWU7dmFyIG49W107ZS5maXJzdF9uYW1lJiZuLnB1c2goZS5maXJzdF9uYW1lKSxlLmxhc3RfbmFtZSYmbi5wdXNoKGUubGFzdF9uYW1lKSxlLm5hbWU9bi5qb2luKFwiIFwiKSxlLmVtYWlsPWUuZW1haWxzJiZlLmVtYWlsc1swXT9lLmVtYWlsc1swXS5oYW5kbGU6bnVsbCxlLnRodW1ibmFpbD1lLmltYWdlP2UuaW1hZ2UuaW1hZ2VVcmw6bnVsbH1yZXR1cm4gZX1mdW5jdGlvbiBvKGUsbixvKXt0KGUpLHIoZSxuLG8pO3JldHVybiBlLnF1ZXJ5JiZlLnF1ZXJ5LnJlc3VsdHMmJmUucXVlcnkucmVzdWx0cy5jb250YWN0JiYoZS5kYXRhPWUucXVlcnkucmVzdWx0cy5jb250YWN0LGRlbGV0ZSBlLnF1ZXJ5LEFycmF5LmlzQXJyYXkoZS5kYXRhKXx8KGUuZGF0YT1bZS5kYXRhXSksZS5kYXRhLmZvckVhY2goaSkpLGV9ZnVuY3Rpb24gaShlKXtlLmlkPW51bGwsIWUuZmllbGRzfHxlLmZpZWxkcyBpbnN0YW5jZW9mIEFycmF5fHwoZS5maWVsZHM9W2UuZmllbGRzXSksKGUuZmllbGRzfHxbXSkuZm9yRWFjaChmdW5jdGlvbih0KXtcImVtYWlsXCI9PT10LnR5cGUmJihlLmVtYWlsPXQudmFsdWUpLFwibmFtZVwiPT09dC50eXBlJiYoZS5maXJzdF9uYW1lPXQudmFsdWUuZ2l2ZW5OYW1lLGUubGFzdF9uYW1lPXQudmFsdWUuZmFtaWx5TmFtZSxlLm5hbWU9dC52YWx1ZS5naXZlbk5hbWUrXCIgXCIrdC52YWx1ZS5mYW1pbHlOYW1lKSxcInlhaG9vaWRcIj09PXQudHlwZSYmKGUuaWQ9dC52YWx1ZSl9KX1mdW5jdGlvbiByKGUsdCxuKXtyZXR1cm4gZS5xdWVyeSYmZS5xdWVyeS5jb3VudCYmbi5vcHRpb25zJiYoZS5wYWdpbmc9e25leHQ6XCI/c3RhcnQ9XCIrKGUucXVlcnkuY291bnQrKCtuLm9wdGlvbnMuc3RhcnR8fDEpKX0pLGV9ZnVuY3Rpb24gYShlKXtyZXR1cm5cImh0dHBzOi8vcXVlcnkueWFob29hcGlzLmNvbS92MS95cWw/cT1cIisoZStcIiBsaW1pdCBAe2xpbWl0fDEwMH0gb2Zmc2V0IEB7c3RhcnR8MH1cIikucmVwbGFjZSgvXFxzL2csXCIlMjBcIikrXCImZm9ybWF0PWpzb25cIn1lLmluaXQoe3lhaG9vOntvYXV0aDp7dmVyc2lvbjpcIjEuMGFcIixhdXRoOlwiaHR0cHM6Ly9hcGkubG9naW4ueWFob28uY29tL29hdXRoL3YyL3JlcXVlc3RfYXV0aFwiLHJlcXVlc3Q6XCJodHRwczovL2FwaS5sb2dpbi55YWhvby5jb20vb2F1dGgvdjIvZ2V0X3JlcXVlc3RfdG9rZW5cIix0b2tlbjpcImh0dHBzOi8vYXBpLmxvZ2luLnlhaG9vLmNvbS9vYXV0aC92Mi9nZXRfdG9rZW5cIn0sbG9naW46ZnVuY3Rpb24oZSl7ZS5vcHRpb25zLnBvcHVwLndpZHRoPTU2MDt0cnl7ZGVsZXRlIGUucXMuc3RhdGUuc2NvcGV9Y2F0Y2godCl7fX0sYmFzZTpcImh0dHBzOi8vc29jaWFsLnlhaG9vYXBpcy5jb20vdjEvXCIsZ2V0OnttZTphKFwic2VsZWN0ICogZnJvbSBzb2NpYWwucHJvZmlsZSgwKSB3aGVyZSBndWlkPW1lXCIpLFwibWUvZnJpZW5kc1wiOmEoXCJzZWxlY3QgKiBmcm9tIHNvY2lhbC5jb250YWN0cygwKSB3aGVyZSBndWlkPW1lXCIpLFwibWUvZm9sbG93aW5nXCI6YShcInNlbGVjdCAqIGZyb20gc29jaWFsLmNvbnRhY3RzKDApIHdoZXJlIGd1aWQ9bWVcIil9LHdyYXA6e21lOm4sXCJtZS9mcmllbmRzXCI6byxcIm1lL2ZvbGxvd2luZ1wiOm8sXCJkZWZhdWx0XCI6cn19fSl9KGhlbGxvKSxcImZ1bmN0aW9uXCI9PXR5cGVvZiBkZWZpbmUmJmRlZmluZS5hbWQmJmRlZmluZShmdW5jdGlvbigpe3JldHVybiBoZWxsb30pLFwib2JqZWN0XCI9PXR5cGVvZiBtb2R1bGUmJm1vZHVsZS5leHBvcnRzJiYobW9kdWxlLmV4cG9ydHM9aGVsbG8pOyIsIi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4vLyAgQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uICBBbGwgUmlnaHRzIFJlc2VydmVkLiAgTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiAgU2VlIExpY2Vuc2UgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cclxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcblxyXG4ndXNlIHN0cmljdCc7XHJcblxyXG5hbmd1bGFyLm1vZHVsZSgnQXBpRXhwbG9yZXInLCBbJ25nQW5pbWF0ZScsICduZ01hdGVyaWFsJ10pXHJcbiAgICAuY29uZmlnKFsnJG1kVGhlbWluZ1Byb3ZpZGVyJywgZnVuY3Rpb24gKCRtZFRoZW1pbmdQcm92aWRlcikge1xyXG5cclxuICAgICRtZFRoZW1pbmdQcm92aWRlci5kZWZpbmVQYWxldHRlKCdPMzY1UHJpbWFyeVBhbGV0dGUnLCB7XHJcbiAgICAgICAgICAgICc1MCc6ICdlOWYwZmMnLFxyXG4gICAgICAgICAgICAnMTAwJzogJ2QzZTJmOCcsXHJcbiAgICAgICAgICAgICcyMDAnOiAnYmRkM2Y1JyxcclxuICAgICAgICAgICAgJzMwMCc6ICc5MWI2ZWUnLCBcclxuICAgICAgICAgICAgJzQwMCc6ICc2NTk5ZTcnLFxyXG4gICAgICAgICAgICAnNTAwJzogJzQ2ODVlMicsIC8vYmx1ZVxyXG4gICAgICAgICAgICAnNjAwJzogJzM4N2JlMCcsXHJcbiAgICAgICAgICAgICc3MDAnOiAnMjI2ZGRkJyxcclxuICAgICAgICAgICAgJzgwMCc6ICcxZjYyYzcnLCBcclxuICAgICAgICAgICAgJzkwMCc6ICcxYzU3YjAnLFxyXG4gICAgICAgICAgICAnQTEwMCc6ICdGRjZBMDAnLCBcclxuICAgICAgICAgICAgJ0EyMDAnOiAnRkY2QTAwJywgXHJcbiAgICAgICAgICAgICdBNDAwJzogJ0ZGNkEwMCcsIFxyXG4gICAgICAgICAgICAnQTcwMCc6ICdGRjZBMDAnLCBcclxuICAgICAgICAgICAgJ2NvbnRyYXN0RGVmYXVsdENvbG9yJzogJ2xpZ2h0JywgICBcclxuICAgICAgICAgICAgJ2NvbnRyYXN0RGFya0NvbG9ycyc6IFsnNTAnLCAnMTAwJywgXHJcbiAgICAgICAgICAgICAgICAnMjAwJywgJzMwMCcsICc0MDAnLCAnQTEwMCddLFxyXG4gICAgICAgICAgICAnY29udHJhc3RMaWdodENvbG9ycyc6IHVuZGVmaW5lZCBcclxuICAgIH0pO1xyXG4gICAgXHJcbiAgICAkbWRUaGVtaW5nUHJvdmlkZXIuZGVmaW5lUGFsZXR0ZSgnTzM2NUFjY2VudFBhbGV0dGUnLCB7XHJcbiAgICAgICAgICAgICc1MCc6ICdmZmM0OTknLFxyXG4gICAgICAgICAgICAnMTAwJzogJ2ZmYjU4MCcsXHJcbiAgICAgICAgICAgICcyMDAnOiAnZmZhNjY2JyxcclxuICAgICAgICAgICAgJzMwMCc6ICdmZjk3NGQnLCBcclxuICAgICAgICAgICAgJzQwMCc6ICdmZjg4MzMnLFxyXG4gICAgICAgICAgICAnNTAwJzogJ0ZGNkEwMCcsIC8vb3JhbmdlXHJcbiAgICAgICAgICAgICc2MDAnOiAnZTY2MDAwJyxcclxuICAgICAgICAgICAgJzcwMCc6ICdjYzU1MDAnLFxyXG4gICAgICAgICAgICAnODAwJzogJ2IzNGEwMCcsIFxyXG4gICAgICAgICAgICAnOTAwJzogJzk5NDAwMCcsXHJcbiAgICAgICAgICAgICdBMTAwJzogJ0ZGNkEwMCcsXHJcbiAgICAgICAgICAgICdBMjAwJzogJ0ZGNkEwMCcsIFxyXG4gICAgICAgICAgICAnQTQwMCc6ICdGRjZBMDAnLCBcclxuICAgICAgICAgICAgJ0E3MDAnOiAnRkY2QTAwJywgXHJcbiAgICB9KTtcclxuXHJcbiAgICAkbWRUaGVtaW5nUHJvdmlkZXIudGhlbWUoJ2RlZmF1bHQnKS5wcmltYXJ5UGFsZXR0ZSgnTzM2NVByaW1hcnlQYWxldHRlJyk7XHJcbiAgICAkbWRUaGVtaW5nUHJvdmlkZXIudGhlbWUoJ2RlZmF1bHQnKS5hY2NlbnRQYWxldHRlKCdPMzY1QWNjZW50UGFsZXR0ZScpO1xyXG59XSk7IiwiJ3VzZSBzdHJpY3QnO1xyXG5mdW5jdGlvbiBydW4oJHNjb3BlLCB1cmwsIGFwaVNlcnZpY2UpIHtcclxuICAgICRzY29wZS4kZW1pdCgndXJsQ2hhbmdlJywgdXJsKTtcclxufVxyXG5mdW5jdGlvbiBmb3JtYXRYbWwoeG1sKSB7XHJcbiAgICB2YXIgcmVnID0gLyg+KVxccyooPCkoXFwvKikvZztcclxuICAgIHZhciB3c2V4cCA9IC8gKiguKikgK1xcbi9nO1xyXG4gICAgdmFyIGNvbnRleHAgPSAvKDwuKz4pKC4rXFxuKS9nO1xyXG4gICAgeG1sID0geG1sLnJlcGxhY2UocmVnLCAnJDFcXG4kMiQzJykucmVwbGFjZSh3c2V4cCwgJyQxXFxuJykucmVwbGFjZShjb250ZXhwLCAnJDFcXG4kMicpO1xyXG4gICAgdmFyIHBhZCA9IDA7XHJcbiAgICB2YXIgZm9ybWF0dGVkID0gJyc7XHJcbiAgICB2YXIgbGluZXMgPSB4bWwuc3BsaXQoJ1xcbicpO1xyXG4gICAgdmFyIGluZGVudCA9IDA7XHJcbiAgICB2YXIgbGFzdFR5cGUgPSAnb3RoZXInO1xyXG4gICAgdmFyIHRyYW5zaXRpb25zID0ge1xyXG4gICAgICAgICdzaW5nbGUtPnNpbmdsZSc6IDAsXHJcbiAgICAgICAgJ3NpbmdsZS0+Y2xvc2luZyc6IC0xLFxyXG4gICAgICAgICdzaW5nbGUtPm9wZW5pbmcnOiAwLFxyXG4gICAgICAgICdzaW5nbGUtPm90aGVyJzogMCxcclxuICAgICAgICAnY2xvc2luZy0+c2luZ2xlJzogMCxcclxuICAgICAgICAnY2xvc2luZy0+Y2xvc2luZyc6IC0xLFxyXG4gICAgICAgICdjbG9zaW5nLT5vcGVuaW5nJzogMCxcclxuICAgICAgICAnY2xvc2luZy0+b3RoZXInOiAwLFxyXG4gICAgICAgICdvcGVuaW5nLT5zaW5nbGUnOiAxLFxyXG4gICAgICAgICdvcGVuaW5nLT5jbG9zaW5nJzogMCxcclxuICAgICAgICAnb3BlbmluZy0+b3BlbmluZyc6IDEsXHJcbiAgICAgICAgJ29wZW5pbmctPm90aGVyJzogMSxcclxuICAgICAgICAnb3RoZXItPnNpbmdsZSc6IDAsXHJcbiAgICAgICAgJ290aGVyLT5jbG9zaW5nJzogLTEsXHJcbiAgICAgICAgJ290aGVyLT5vcGVuaW5nJzogMCxcclxuICAgICAgICAnb3RoZXItPm90aGVyJzogMFxyXG4gICAgfTtcclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGluZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICB2YXIgbG4gPSBsaW5lc1tpXTtcclxuICAgICAgICB2YXIgc2luZ2xlID0gQm9vbGVhbihsbi5tYXRjaCgvPC4rXFwvPi8pKTtcclxuICAgICAgICB2YXIgY2xvc2luZyA9IEJvb2xlYW4obG4ubWF0Y2goLzxcXC8uKz4vKSk7XHJcbiAgICAgICAgdmFyIG9wZW5pbmcgPSBCb29sZWFuKGxuLm1hdGNoKC88W14hXS4qPi8pKTtcclxuICAgICAgICB2YXIgdHlwZSA9IHNpbmdsZSA/ICdzaW5nbGUnIDogY2xvc2luZyA/ICdjbG9zaW5nJyA6IG9wZW5pbmcgPyAnb3BlbmluZycgOiAnb3RoZXInO1xyXG4gICAgICAgIHZhciBmcm9tVG8gPSBsYXN0VHlwZSArICctPicgKyB0eXBlO1xyXG4gICAgICAgIGxhc3RUeXBlID0gdHlwZTtcclxuICAgICAgICB2YXIgcGFkZGluZyA9ICcnO1xyXG4gICAgICAgIGluZGVudCArPSB0cmFuc2l0aW9uc1tmcm9tVG9dO1xyXG4gICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgaW5kZW50OyBqKyspIHtcclxuICAgICAgICAgICAgcGFkZGluZyArPSAnXFx0JztcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGZyb21UbyA9PSAnb3BlbmluZy0+Y2xvc2luZycpXHJcbiAgICAgICAgICAgIGZvcm1hdHRlZCA9IGZvcm1hdHRlZC5zdWJzdHIoMCwgZm9ybWF0dGVkLmxlbmd0aCAtIDEpICsgbG4gKyAnXFxuJztcclxuICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIGZvcm1hdHRlZCArPSBwYWRkaW5nICsgbG4gKyAnXFxuJztcclxuICAgIH1cclxuICAgIHJldHVybiBmb3JtYXR0ZWQ7XHJcbn1cclxuO1xyXG5mdW5jdGlvbiBpbnNlcnRIZWFkZXJzSW50b1Jlc3BvbnNlVmlld2VyKGhlYWRlcnMsIHN0YXR1cykge1xyXG4gICAgdmFyIHJlc3BvbnNlT2JqID0ge307XHJcbiAgICBpZiAoaGVhZGVycyAhPSBudWxsKSB7XHJcbiAgICAgICAgcmVzcG9uc2VPYmogPSBoZWFkZXJzKCk7XHJcbiAgICB9XHJcbiAgICByZXNwb25zZU9ialtcIlN0YXR1cyBDb2RlXCJdID0gc3RhdHVzO1xyXG4gICAgdmFyIGhlYWRlcnNBcnIgPSBbXTtcclxuICAgIGZvciAodmFyIGhlYWRlck5hbWUgaW4gcmVzcG9uc2VPYmopIHtcclxuICAgICAgICBoZWFkZXJzQXJyLnB1c2goaGVhZGVyTmFtZSArIFwiOiBcIiArIHJlc3BvbnNlT2JqW2hlYWRlck5hbWVdKTtcclxuICAgIH1cclxuICAgIGdldEpzb25WaWV3ZXIoKS5nZXRTZXNzaW9uKCkuc2V0VmFsdWUoXCJcIik7XHJcbiAgICBnZXRKc29uVmlld2VyKCkuZ2V0U2Vzc2lvbigpLmluc2VydCgwLCBoZWFkZXJzQXJyLmpvaW4oXCJcXG5cIikpO1xyXG59XHJcbmZ1bmN0aW9uIHNob3dSZXN1bHRzKHJlc3VsdHMsIGhlYWRlcnMsIHN0YXR1cywgcmVzcG9uc2VDb250ZW50VHlwZSkge1xyXG4gICAgZ2V0SnNvblZpZXdlcigpLnNldFZhbHVlKFwiXCIpO1xyXG4gICAgaW5zZXJ0SGVhZGVyc0ludG9SZXNwb25zZVZpZXdlcihoZWFkZXJzLCBzdGF0dXMpO1xyXG4gICAgZ2V0SnNvblZpZXdlcigpLmdldFNlc3Npb24oKS5pbnNlcnQoMCwgcmVzdWx0cyk7XHJcbiAgICBpZiAocmVzcG9uc2VDb250ZW50VHlwZSlcclxuICAgICAgICBnZXRKc29uVmlld2VyKCkuZ2V0U2Vzc2lvbigpLnNldE1vZGUoXCJhY2UvbW9kZS9cIiArIHJlc3BvbnNlQ29udGVudFR5cGUpO1xyXG59XHJcbmZ1bmN0aW9uIGhhbmRsZUltYWdlUmVzcG9uc2UoJHNjb3BlLCBhcGlTZXJ2aWNlLCBzdGFydFRpbWUsIGhlYWRlcnMsIHN0YXR1cywgaGFuZGxlVW5zdWNjZXNzZnVsUXVlcnlSZXNwb25zZSkge1xyXG4gICAgYXBpU2VydmljZS5wZXJmb3JtUXVlcnkoJ0dFVF9CSU5BUlknKSgkc2NvcGUuZ2V0U2VhcmNoVGV4dCgpKS50aGVuKGZ1bmN0aW9uIChyZXN1bHQpIHtcclxuICAgICAgICB2YXIgYmxvYiA9IG5ldyBCbG9iKFtyZXN1bHQuZGF0YV0sIHsgdHlwZTogXCJpbWFnZS9qcGVnXCIgfSk7XHJcbiAgICAgICAgdmFyIGltYWdlVXJsID0gd2luZG93LlVSTC5jcmVhdGVPYmplY3RVUkwoYmxvYik7XHJcbiAgICAgICAgdmFyIGltYWdlUmVzdWx0Vmlld2VyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJpbWdcIik7XHJcbiAgICAgICAgaW1hZ2VSZXN1bHRWaWV3ZXIuc3JjID0gaW1hZ2VVcmw7XHJcbiAgICAgICAgJHNjb3BlLnNob3dJbWFnZSA9IHRydWU7XHJcbiAgICAgICAgaW5zZXJ0SGVhZGVyc0ludG9SZXNwb25zZVZpZXdlcihyZXN1bHQuaGVhZGVycywgcmVzdWx0LnN0YXR1cyk7XHJcbiAgICAgICAgJHNjb3BlLnJlcXVlc3RJblByb2dyZXNzID0gZmFsc2U7XHJcbiAgICB9LCBoYW5kbGVVbnN1Y2Nlc3NmdWxRdWVyeVJlc3BvbnNlKTtcclxufVxyXG5mdW5jdGlvbiBoYW5kbGVIdG1sUmVzcG9uc2UoJHNjb3BlLCBzdGFydFRpbWUsIHJlc3VsdHMsIGhlYWRlcnMsIHN0YXR1cykge1xyXG4gICAgJHNjb3BlLnJlcXVlc3RJblByb2dyZXNzID0gZmFsc2U7XHJcbiAgICBzaG93UmVzdWx0cyhyZXN1bHRzLCBoZWFkZXJzLCBzdGF0dXMsIFwiaHRtbFwiKTtcclxufVxyXG5mdW5jdGlvbiBoYW5kbGVKc29uUmVzcG9uc2UoJHNjb3BlLCBzdGFydFRpbWUsIHJlc3VsdHMsIGhlYWRlcnMsIHN0YXR1cykge1xyXG4gICAgcmVzdWx0cyA9IEpTT04uc3RyaW5naWZ5KHJlc3VsdHMsIG51bGwsIDQpO1xyXG4gICAgJHNjb3BlLnJlcXVlc3RJblByb2dyZXNzID0gZmFsc2U7XHJcbiAgICBzaG93UmVzdWx0cyhyZXN1bHRzLCBoZWFkZXJzLCBzdGF0dXMsIFwianNvblwiKTtcclxufVxyXG5mdW5jdGlvbiBoYW5kbGVYbWxSZXNwb25zZSgkc2NvcGUsIHN0YXJ0VGltZSwgcmVzdWx0cywgaGVhZGVycywgc3RhdHVzKSB7XHJcbiAgICByZXN1bHRzID0gZm9ybWF0WG1sKHJlc3VsdHMpO1xyXG4gICAgJHNjb3BlLnJlcXVlc3RJblByb2dyZXNzID0gZmFsc2U7XHJcbiAgICBzaG93UmVzdWx0cyhyZXN1bHRzLCBoZWFkZXJzLCBzdGF0dXMsIFwieG1sXCIpO1xyXG59XHJcbmZ1bmN0aW9uIGlzSW1hZ2VSZXNwb25zZShoZWFkZXJzKSB7XHJcbiAgICB2YXIgY29udGVudFR5cGUgPSBnZXRDb250ZW50VHlwZShoZWFkZXJzKTtcclxuICAgIHJldHVybiBjb250ZW50VHlwZSA9PT0gXCJhcHBsaWNhdGlvbi9vY3RldC1zdHJlYW1cIiB8fCBjb250ZW50VHlwZS5zdWJzdHIoMCwgNikgPT09IFwiaW1hZ2UvXCI7XHJcbn1cclxuZnVuY3Rpb24gaXNIdG1sUmVzcG9uc2UoaGVhZGVycykge1xyXG4gICAgdmFyIGNvbnRlbnRUeXBlID0gZ2V0Q29udGVudFR5cGUoaGVhZGVycyk7XHJcbiAgICByZXR1cm4gY29udGVudFR5cGUgPT09IFwidGV4dC9odG1sXCIgfHwgY29udGVudFR5cGUgPT09IFwiYXBwbGljYXRpb24veGh0bWwreG1sXCI7XHJcbn1cclxuZnVuY3Rpb24gaXNYbWxSZXNwb25zZShyZXN1bHRzKSB7XHJcbiAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkocmVzdWx0cywgbnVsbCwgNCkuaW5kZXhPZihcIjw/eG1sXCIpICE9IC0xO1xyXG59XHJcbmZ1bmN0aW9uIGlzSnNvblJlc3BvbnNlKGhlYWRlcnMpIHtcclxuICAgIHZhciBjb250ZW50VHlwZSA9IGdldENvbnRlbnRUeXBlKGhlYWRlcnMpO1xyXG4gICAgcmV0dXJuIGNvbnRlbnRUeXBlID09PSBcImFwcGxpY2F0aW9uL2pzb25cIjtcclxufVxyXG5mdW5jdGlvbiBnZXRDb250ZW50VHlwZShoZWFkZXJzKSB7XHJcbiAgICB2YXIgZnVsbCA9IGhlYWRlcnMoXCJjb250ZW50LXR5cGVcIik7XHJcbiAgICB2YXIgZGVsaW1pdGVyUG9zID0gZnVsbC5pbmRleE9mKFwiO1wiKTtcclxuICAgIGlmIChkZWxpbWl0ZXJQb3MgIT0gLTEpIHtcclxuICAgICAgICByZXR1cm4gZnVsbC5zdWJzdHIoMCwgZGVsaW1pdGVyUG9zKTtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgIHJldHVybiBmdWxsO1xyXG4gICAgfVxyXG59XHJcbmZ1bmN0aW9uIGdldEVudGl0eVNldHMobWV0YWRhdGEpIHtcclxuICAgIHZhciBlbnRpdHlTZXRzT2JqID0ge307XHJcbiAgICB2YXIgZW50aXR5U2V0c0FuZFNpbmdsZXRvbnMgPSAkKCgkLnBhcnNlSFRNTChtZXRhZGF0YSkpWzFdKS5maW5kKFwiRW50aXR5Q29udGFpbmVyXCIpWzBdLmNoaWxkcmVuO1xyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBlbnRpdHlTZXRzQW5kU2luZ2xldG9ucy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIHZhciBzZXQgPSBlbnRpdHlTZXRzQW5kU2luZ2xldG9uc1tpXTtcclxuICAgICAgICB2YXIgZW50aXR5U2V0T3JTaW5nbGV0b24gPSBudWxsO1xyXG4gICAgICAgIGlmIChzZXQudGFnTmFtZSA9PSBcIkVOVElUWVNFVFwiKSB7XHJcbiAgICAgICAgICAgIGVudGl0eVNldE9yU2luZ2xldG9uID0ge1xyXG4gICAgICAgICAgICAgICAgbmFtZTogc2V0LmdldEF0dHJpYnV0ZShcIm5hbWVcIiksXHJcbiAgICAgICAgICAgICAgICBpc0VudGl0eVNldDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIHR5cGU6IHNldC5nZXRBdHRyaWJ1dGUoXCJlbnRpdHl0eXBlXCIpLFxyXG4gICAgICAgICAgICAgICAgaXNBQ29sbGVjdGlvbjogdHJ1ZVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChzZXQudGFnTmFtZSA9PSBcIlNJTkdMRVRPTlwiKSB7XHJcbiAgICAgICAgICAgIGVudGl0eVNldE9yU2luZ2xldG9uID0ge1xyXG4gICAgICAgICAgICAgICAgbmFtZTogc2V0LmdldEF0dHJpYnV0ZShcIm5hbWVcIiksXHJcbiAgICAgICAgICAgICAgICBpc0VudGl0eVNldDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICB0eXBlOiBzZXQuZ2V0QXR0cmlidXRlKFwidHlwZVwiKSxcclxuICAgICAgICAgICAgICAgIGlzQUNvbGxlY3Rpb246IGZhbHNlXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiRm91bmQgdW5leHBlY3RlZCB0eXBlIGluIG1ldGFkYXRhIHVuZGVyIEVudGl0eUNvbnRhaW5lclwiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZW50aXR5U2V0c09ialtlbnRpdHlTZXRPclNpbmdsZXRvbi5uYW1lXSA9IGVudGl0eVNldE9yU2luZ2xldG9uO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGVudGl0eVNldHNPYmo7XHJcbn1cclxuZnVuY3Rpb24gZm9ybWF0UmVxdWVzdEhlYWRlcnMoaGVhZGVycykge1xyXG4gICAgdmFyIG9iaiA9IHt9O1xyXG4gICAgdmFyIHBhcnRzID0gaGVhZGVycy5yZXBsYWNlKC9eXFxzK3wsXFxzKiQvZywgJycpLnNwbGl0KCdcXG4nKTtcclxuICAgIGZvciAodmFyIGkgPSAwLCBsZW4gPSBwYXJ0cy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xyXG4gICAgICAgIHZhciBtYXRjaCA9IHBhcnRzW2ldLm1hdGNoKC9eXFxzKlwiPyhbXlwiOl0qKVwiP1xccyo6XFxzKlwiPyhbXlwiXSopXFxzKiQvKTtcclxuICAgICAgICBpZiAobWF0Y2gpIHtcclxuICAgICAgICAgICAgb2JqW21hdGNoWzFdXSA9IG1hdGNoWzJdO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBvYmo7XHJcbn1cclxuZnVuY3Rpb24gY3JlYXRlRW50aXR5VHlwZU9iamVjdChET01hcnJheSkge1xyXG4gICAgdmFyIGVudGl0eVR5cGVzID0ge307XHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IERPTWFycmF5Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgdmFyIEVudGl0eVR5cGUgPSB7XHJcbiAgICAgICAgICAgIG5hbWU6IERPTWFycmF5W2ldLmdldEF0dHJpYnV0ZShcIm5hbWVcIiksXHJcbiAgICAgICAgICAgIGxpbmtzOiB7fVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgdmFyIGNoaWxkcmVuID0gRE9NYXJyYXlbaV0uY2hpbGRyZW47XHJcbiAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBjaGlsZHJlbi5sZW5ndGg7IGorKykge1xyXG4gICAgICAgICAgICBpZiAoY2hpbGRyZW5bal0uYXR0cmlidXRlcy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgY2hpbGROYW1lID0gY2hpbGRyZW5bal0uZ2V0QXR0cmlidXRlKFwibmFtZVwiKTtcclxuICAgICAgICAgICAgICAgIHZhciB0eXBlID0gY2hpbGRyZW5bal0uZ2V0QXR0cmlidXRlKFwidHlwZVwiKTtcclxuICAgICAgICAgICAgICAgIHZhciB1cmxPYmplY3QgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaXNBQ29sbGVjdGlvbjogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogY2hpbGROYW1lLFxyXG4gICAgICAgICAgICAgICAgICAgIGlzRW50aXR5U2V0OiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICB0eXBlOiB0eXBlXHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgaWYgKHR5cGUuaW5kZXhPZihcIkNvbGxlY3Rpb24oXCIpID09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICB1cmxPYmplY3QuaXNBQ29sbGVjdGlvbiA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgdXJsT2JqZWN0LnR5cGUgPSB0eXBlLnNwbGl0KFwiKFwiKVsxXS5zcGxpdChcIilcIilbMF07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBFbnRpdHlUeXBlLmxpbmtzW2NoaWxkTmFtZV0gPSB1cmxPYmplY3Q7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZW50aXR5VHlwZXNbRW50aXR5VHlwZS5uYW1lXSA9IEVudGl0eVR5cGU7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZW50aXR5VHlwZXM7XHJcbn1cclxuZnVuY3Rpb24gc2hvd1JlcXVlc3RIZWFkZXJzKCRzY29wZSkge1xyXG4gICAgZ2V0SGVhZGVyc0VkaXRvcigpLmdldFNlc3Npb24oKS5zZXRWYWx1ZShcIlwiKTtcclxuICAgIHZhciByZXF1ZXN0SGVhZGVycyA9IFwiQ29udGVudC1UeXBlOiBhcHBsaWNhdGlvbi9qc29uXCI7XHJcbiAgICBnZXRIZWFkZXJzRWRpdG9yKCkuZ2V0U2Vzc2lvbigpLmluc2VydCgwLCByZXF1ZXN0SGVhZGVycyk7XHJcbn1cclxuZnVuY3Rpb24gZ2V0RW50aXR5VHlwZXMobWV0YWRhdGEpIHtcclxuICAgIHZhciBlbnRpdGllcyA9IHt9O1xyXG4gICAgdmFyIGVudGl0eVR5cGVzID0gJCgoJC5wYXJzZUhUTUwobWV0YWRhdGEpKVsxXSkuZmluZChcIkVudGl0eVR5cGVcIik7XHJcbiAgICBqUXVlcnkuZXh0ZW5kKGVudGl0aWVzLCBjcmVhdGVFbnRpdHlUeXBlT2JqZWN0KGVudGl0eVR5cGVzKSk7XHJcbiAgICB2YXIgY29tcGxleFR5cGVzID0gJCgoJC5wYXJzZUhUTUwobWV0YWRhdGEpKVsxXSkuZmluZChcIkNvbXBsZXhUeXBlXCIpO1xyXG4gICAgalF1ZXJ5LmV4dGVuZChlbnRpdGllcywgY3JlYXRlRW50aXR5VHlwZU9iamVjdChjb21wbGV4VHlwZXMpKTtcclxuICAgIHJldHVybiBlbnRpdGllcztcclxufVxyXG5mdW5jdGlvbiBnZXRFbnRpdHlGcm9tVHlwZU5hbWUoc2VydmljZSwgdHlwZVBvc3NpYmx5V2l0aFByZWZpeCkge1xyXG4gICAgdmFyIGVudGl0eVR5cGVEYXRhID0gc2VydmljZS5jYWNoZS5nZXQoc2VydmljZS5zZWxlY3RlZFZlcnNpb24gKyBcIkVudGl0eVR5cGVEYXRhXCIpO1xyXG4gICAgdmFyIHR5cGUgPSB0eXBlUG9zc2libHlXaXRoUHJlZml4LnNwbGl0KFwibWljcm9zb2Z0LmdyYXBoLlwiKS5wb3AoKTtcclxuICAgIHJldHVybiBlbnRpdHlUeXBlRGF0YVt0eXBlXTtcclxufVxyXG5mdW5jdGlvbiBjb25zdHJ1Y3RHcmFwaExpbmtzRnJvbVNlcnZpY2VQYXRoKHNlcnZpY2UpIHtcclxuICAgIHZhciB1cmxQYXRoQXJyID0gc2VydmljZS50ZXh0LnNwbGl0KFwiaHR0cHM6Ly9ncmFwaC5taWNyb3NvZnQuY29tL1wiKTtcclxuICAgIGlmICh1cmxQYXRoQXJyLmxlbmd0aCA8PSAxKVxyXG4gICAgICAgIHJldHVybiBbXTtcclxuICAgIHZhciBzZWdtZW50cyA9IHVybFBhdGhBcnJbMV0uc3BsaXQoXCIvXCIpO1xyXG4gICAgdmFyIHZlcnNpb24gPSBzZWdtZW50cy5zaGlmdCgpO1xyXG4gICAgdmFyIGdyYXBoID0gW107XHJcbiAgICB2YXIgZW50aXR5Q29udGFpbmVyRGF0YSA9IHNlcnZpY2UuY2FjaGUuZ2V0KHNlcnZpY2Uuc2VsZWN0ZWRWZXJzaW9uICsgXCJFbnRpdHlTZXREYXRhXCIpO1xyXG4gICAgaWYgKGVudGl0eUNvbnRhaW5lckRhdGEgPT09IHVuZGVmaW5lZClcclxuICAgICAgICByZXR1cm4gW107XHJcbiAgICB3aGlsZSAoc2VnbWVudHMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgIHZhciBzZWdtZW50ID0gc2VnbWVudHMuc2hpZnQoKTtcclxuICAgICAgICBpZiAoZ3JhcGgubGVuZ3RoID09IDApIHtcclxuICAgICAgICAgICAgaWYgKHNlZ21lbnQgaW4gZW50aXR5Q29udGFpbmVyRGF0YSkge1xyXG4gICAgICAgICAgICAgICAgdmFyIG5vZGVfMSA9IGVudGl0eUNvbnRhaW5lckRhdGFbc2VnbWVudF07XHJcbiAgICAgICAgICAgICAgICBncmFwaC5wdXNoKG5vZGVfMSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHZhciBsYXN0R3JhcGhJdGVtID0gZ3JhcGhbZ3JhcGgubGVuZ3RoIC0gMV07XHJcbiAgICAgICAgICAgIHZhciBsYXN0R3JhcGhJdGVtRW50aXR5ID0gZ2V0RW50aXR5RnJvbVR5cGVOYW1lKHNlcnZpY2UsIGxhc3RHcmFwaEl0ZW0udHlwZSk7XHJcbiAgICAgICAgICAgIGlmIChsYXN0R3JhcGhJdGVtRW50aXR5ID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChsYXN0R3JhcGhJdGVtRW50aXR5LmxpbmtzICE9PSB1bmRlZmluZWQgJiYgc2VnbWVudCBpbiBsYXN0R3JhcGhJdGVtRW50aXR5LmxpbmtzKSB7XHJcbiAgICAgICAgICAgICAgICBncmFwaC5wdXNoKGxhc3RHcmFwaEl0ZW1FbnRpdHkubGlua3Nbc2VnbWVudF0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKGxhc3RHcmFwaEl0ZW0uaXNBQ29sbGVjdGlvbiAmJiBzZWdtZW50ICE9IFwiXCIpIHtcclxuICAgICAgICAgICAgICAgIGdyYXBoLnB1c2goe1xyXG4gICAgICAgICAgICAgICAgICAgIGlzQUNvbGxlY3Rpb246IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIGlzRW50aXR5U2V0OiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBzZWdtZW50LFxyXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6IGxhc3RHcmFwaEl0ZW0udHlwZVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZ3JhcGg7XHJcbn1cclxuZnVuY3Rpb24gY29tYmluZVVybE9wdGlvbnNXaXRoQ3VycmVudFVybChzZXJ2aWNlLCB1cmxPcHRpb25zKSB7XHJcbiAgICB2YXIgZ3JhcGhGcm9tU2VydmljZVVybCA9IGNvbnN0cnVjdEdyYXBoTGlua3NGcm9tU2VydmljZVBhdGgoc2VydmljZSk7XHJcbiAgICB2YXIgYmFzZVVybCA9IFtdO1xyXG4gICAgd2hpbGUgKGdyYXBoRnJvbVNlcnZpY2VVcmwubGVuZ3RoID4gMCkge1xyXG4gICAgICAgIHZhciBsYXN0U2VnbWVudCA9IGdyYXBoRnJvbVNlcnZpY2VVcmwuc2hpZnQoKTtcclxuICAgICAgICBiYXNlVXJsLnB1c2gobGFzdFNlZ21lbnQubmFtZSk7XHJcbiAgICB9XHJcbiAgICB2YXIgYmFzZVVybEZpbmFsID0gXCJodHRwczovL2dyYXBoLm1pY3Jvc29mdC5jb20vXCIgKyBzZXJ2aWNlLnNlbGVjdGVkVmVyc2lvbjtcclxuICAgIGlmIChiYXNlVXJsLmxlbmd0aCA+IDApIHtcclxuICAgICAgICBiYXNlVXJsRmluYWwgKz0gXCIvXCIgKyBiYXNlVXJsLmpvaW4oJy8nKTtcclxuICAgIH1cclxuICAgIHZhciBhdXRvY29tcGxldGVVcmxzID0gW107XHJcbiAgICBmb3IgKHZhciB1cmxBdXRvQ29tcGxldGVTdWZmaXggaW4gdXJsT3B0aW9ucykge1xyXG4gICAgICAgIGF1dG9jb21wbGV0ZVVybHMucHVzaChiYXNlVXJsRmluYWwgKyAnLycgKyB1cmxPcHRpb25zW3VybEF1dG9Db21wbGV0ZVN1ZmZpeF0pO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGF1dG9jb21wbGV0ZVVybHM7XHJcbn1cclxuZnVuY3Rpb24gZ2V0VXJsc0Zyb21TZXJ2aWNlVVJMKHNlcnZpY2UpIHtcclxuICAgIHZhciBncmFwaEZyb21TZXJ2aWNlVXJsID0gY29uc3RydWN0R3JhcGhMaW5rc0Zyb21TZXJ2aWNlUGF0aChzZXJ2aWNlKTtcclxuICAgIGlmIChncmFwaEZyb21TZXJ2aWNlVXJsLmxlbmd0aCA+IDApIHtcclxuICAgICAgICB2YXIgbGFzdE5vZGUgPSBncmFwaEZyb21TZXJ2aWNlVXJsLnBvcCgpO1xyXG4gICAgICAgIGlmIChsYXN0Tm9kZS5pc0FDb2xsZWN0aW9uKVxyXG4gICAgICAgICAgICByZXR1cm4gW107XHJcbiAgICAgICAgdmFyIGVudGl0eSA9IGdldEVudGl0eUZyb21UeXBlTmFtZShzZXJ2aWNlLCBsYXN0Tm9kZS50eXBlKTtcclxuICAgICAgICBpZiAoIWVudGl0eSlcclxuICAgICAgICAgICAgcmV0dXJuIFtdO1xyXG4gICAgICAgIHJldHVybiBjb21iaW5lVXJsT3B0aW9uc1dpdGhDdXJyZW50VXJsKHNlcnZpY2UsIE9iamVjdC5rZXlzKGVudGl0eS5saW5rcykpO1xyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgICAgdmFyIGVudGl0eUNvbnRhaW5lckRhdGEgPSBzZXJ2aWNlLmNhY2hlLmdldChzZXJ2aWNlLnNlbGVjdGVkVmVyc2lvbiArIFwiRW50aXR5U2V0RGF0YVwiKTtcclxuICAgICAgICBpZiAoZW50aXR5Q29udGFpbmVyRGF0YSA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBbXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGNvbWJpbmVVcmxPcHRpb25zV2l0aEN1cnJlbnRVcmwoc2VydmljZSwgT2JqZWN0LmtleXMoZW50aXR5Q29udGFpbmVyRGF0YSkpO1xyXG4gICAgfVxyXG59XHJcbmZ1bmN0aW9uIHNob3dSZXF1ZXN0Qm9keUVkaXRvcigpIHtcclxuICAgIHMudGFiQ29uZmlnLmRpc2FibGVSZXF1ZXN0Qm9keUVkaXRvciA9IGZhbHNlO1xyXG4gICAgcy50YWJDb25maWcuaGlkZUNvbnRlbnQgPSBmYWxzZTtcclxuICAgIHNob3dSZXF1ZXN0SGVhZGVycyhzKTtcclxuICAgICQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGluaXRpYWxpemVKc29uRWRpdG9yKCk7XHJcbiAgICAgICAgc2V0U2VsZWN0ZWRUYWIoMSk7XHJcbiAgICB9KTtcclxufVxyXG5mdW5jdGlvbiBzZXRTZWxlY3RlZFRhYihudW0pIHtcclxuICAgIGlmIChudW0gPj0gMiB8fCBudW0gPCAwKSB7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgcy50YWJDb25maWcuc2VsZWN0ZWQgPSBudW07XHJcbiAgICBzLnRhYkNvbmZpZy5wcmV2aW91c1NlbGVjdGVkID0gcy50YWJDb25maWcuc2VsZWN0ZWQ7XHJcbn1cclxuZnVuY3Rpb24gaGFuZGxlUXVlcnlTdHJpbmcoc2VydmljZSwgYWN0aW9uVmFsdWUsIHZlcnNpb25WYWx1ZSwgcmVxdWVzdFZhbHVlKSB7XHJcbiAgICBpZiAoYWN0aW9uVmFsdWUpIHtcclxuICAgICAgICBzZXJ2aWNlLnNlbGVjdGVkT3B0aW9uID0gYWN0aW9uVmFsdWUudG9VcHBlckNhc2UoKTtcclxuICAgICAgICBpZiAoc2VydmljZS5zZWxlY3RlZE9wdGlvbiA9PT0gJ1BPU1QnIHx8IHNlcnZpY2Uuc2VsZWN0ZWRPcHRpb24gPT09ICdQQVRDSCcpIHtcclxuICAgICAgICAgICAgaWYgKGhlbGxvKCdtc2Z0JykuZ2V0QXV0aFJlc3BvbnNlKCkgIT0gbnVsbClcclxuICAgICAgICAgICAgICAgIHNob3dSZXF1ZXN0Qm9keUVkaXRvcigpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGlmICh2ZXJzaW9uVmFsdWUpIHtcclxuICAgICAgICBzZXJ2aWNlLnNlbGVjdGVkVmVyc2lvbiA9IHZlcnNpb25WYWx1ZTtcclxuICAgIH1cclxuICAgIGlmIChyZXF1ZXN0VmFsdWUpIHtcclxuICAgICAgICBzZXJ2aWNlLnRleHQgPSBcImh0dHBzOi8vZ3JhcGgubWljcm9zb2Z0LmNvbS9cIiArIHNlcnZpY2Uuc2VsZWN0ZWRWZXJzaW9uICsgXCIvXCIgKyByZXF1ZXN0VmFsdWU7XHJcbiAgICB9XHJcbn1cclxuZnVuY3Rpb24gZ2V0VXJsc0Zyb21FbnRpdHlUeXBlKHNlcnZpY2UsIGVudGl0eSkge1xyXG4gICAgdmFyIGVudGl0eVR5cGVzID0gc2VydmljZS5jYWNoZS5nZXQoc2VydmljZS5zZWxlY3RlZFZlcnNpb24gKyBcIkVudGl0eVR5cGVEYXRhXCIpO1xyXG4gICAgdmFyIHR5cGUgPSBlbnRpdHlUeXBlc1tlbnRpdHkubmFtZV07XHJcbiAgICByZXR1cm4gY29tYmluZVVybE9wdGlvbnNXaXRoQ3VycmVudFVybChzZXJ2aWNlLCBPYmplY3Qua2V5cyh0eXBlLmxpbmtzKSk7XHJcbn1cclxuZnVuY3Rpb24gcGFyc2VNZXRhZGF0YShzZXJ2aWNlKSB7XHJcbiAgICB2YXIgZW50aXR5U2V0RGF0YSwgZW50aXR5VHlwZURhdGE7XHJcbiAgICBpZiAoIXNlcnZpY2UuY2FjaGUuZ2V0KHNlcnZpY2Uuc2VsZWN0ZWRWZXJzaW9uICsgXCJNZXRhZGF0YVwiKSkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwicGFyc2luZyBtZXRhZGF0YVwiKTtcclxuICAgICAgICBzZXJ2aWNlLmdldE1ldGFkYXRhKCkudGhlbihmdW5jdGlvbiAocmVzdWx0cykge1xyXG4gICAgICAgICAgICB2YXIgbWV0YWRhdGEgPSByZXN1bHRzLmRhdGE7XHJcbiAgICAgICAgICAgIHNlcnZpY2UuY2FjaGUucHV0KHNlcnZpY2Uuc2VsZWN0ZWRWZXJzaW9uICsgXCJNZXRhZGF0YVwiLCByZXN1bHRzKTtcclxuICAgICAgICAgICAgZW50aXR5U2V0RGF0YSA9IGdldEVudGl0eVNldHMobWV0YWRhdGEpO1xyXG4gICAgICAgICAgICBzZXJ2aWNlLmNhY2hlLnB1dChzZXJ2aWNlLnNlbGVjdGVkVmVyc2lvbiArIFwiRW50aXR5U2V0RGF0YVwiLCBlbnRpdHlTZXREYXRhKTtcclxuICAgICAgICAgICAgZW50aXR5VHlwZURhdGEgPSBnZXRFbnRpdHlUeXBlcyhtZXRhZGF0YSk7XHJcbiAgICAgICAgICAgIHNlcnZpY2UuY2FjaGUucHV0KHNlcnZpY2Uuc2VsZWN0ZWRWZXJzaW9uICsgXCJFbnRpdHlUeXBlRGF0YVwiLCBlbnRpdHlUeXBlRGF0YSk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwibWV0YWRhdGEgc3VjY2Vzc2Z1bGx5IHBhcnNlZFwiKTtcclxuICAgICAgICB9LCBmdW5jdGlvbiAoZXJyLCBzdGF0dXMpIHtcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIm1ldGFkYXRhIGNvdWxkIG5vdCBiZSBwYXJzZWRcIik7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn1cclxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YXBpLWV4cGxvcmVyLWhlbHBlcnMuanMubWFwIiwiLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbi8vICBDb3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi4gIEFsbCBSaWdodHMgUmVzZXJ2ZWQuICBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuICBTZWUgTGljZW5zZSBpbiB0aGUgcHJvamVjdCByb290IGZvciBsaWNlbnNlIGluZm9ybWF0aW9uLlxyXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHJcbid1c2Ugc3RyaWN0JztcclxuXHJcbmFuZ3VsYXIubW9kdWxlKCdBcGlFeHBsb3JlcicpXHJcbi5jb25maWcoZnVuY3Rpb24oJGxvY2F0aW9uUHJvdmlkZXIpIHtcclxuICAgICRsb2NhdGlvblByb3ZpZGVyLmh0bWw1TW9kZSh7XHJcbiAgICAgICAgZW5hYmxlZDogdHJ1ZSxcclxuICAgICAgICByZXF1aXJlQmFzZTogZmFsc2UsXHJcbiAgICAgICAgcmV3cml0ZUxpbmtzOiBmYWxzZVxyXG4gICAgfSk7XHJcbiAgICBcclxufSlcclxuLmZhY3RvcnkoJ0FwaUV4cGxvcmVyU3ZjJywgW2Z1bmN0aW9uICgpIHtcclxuICAgIHZhciBhcGlFeHBsb3JlclNlcnZpY2UgPSB7fTtcclxuICAgIHJldHVybiBhcGlFeHBsb3JlclNlcnZpY2U7XHJcbn1dKTsiLCIndXNlIHN0cmljdCc7XHJcbnZhciBhcGlTZXJ2aWNlO1xyXG4oZnVuY3Rpb24gKGFwaVNlcnZpY2UpIHtcclxuICAgIGZ1bmN0aW9uIGluaXQoaHR0cCwgY2FjaGVGYWN0b3J5KSB7XHJcbiAgICAgICAgYXBpU2VydmljZS4kaHR0cCA9IGh0dHA7XHJcbiAgICAgICAgYXBpU2VydmljZS5jYWNoZSA9IGNhY2hlRmFjdG9yeSgnbXlDYWNoZScpO1xyXG4gICAgfVxyXG4gICAgYXBpU2VydmljZS5pbml0ID0gaW5pdDtcclxuICAgIGFwaVNlcnZpY2UudGV4dCA9ICdodHRwczovL2dyYXBoLm1pY3Jvc29mdC5jb20vdjEuMC9tZS8nO1xyXG4gICAgYXBpU2VydmljZS5zZWxlY3RlZFZlcnNpb24gPSBcInYxLjBcIjtcclxuICAgIGFwaVNlcnZpY2Uuc2VsZWN0ZWRPcHRpb24gPSBcIkdFVFwiO1xyXG4gICAgYXBpU2VydmljZS5wZXJmb3JtQW5vbnltb3VzUXVlcnkgPSBmdW5jdGlvbiAocXVlcnlUeXBlKSB7XHJcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChxdWVyeSwgcG9zdFN0cmluZywgcmVxdWVzdEhlYWRlcnMpIHtcclxuICAgICAgICAgICAgdmFyIGhlYWRlcnNPYmogPSB7XHJcbiAgICAgICAgICAgICAgICBcIkF1dGhvcml6YXRpb25cIjogXCJCZWFyZXIge3Rva2VuOmh0dHBzOi8vZ3JhcGgubWljcm9zb2Z0LmNvbS99XCIsXHJcbiAgICAgICAgICAgICAgICBcIkFjY2VwdFwiOiBcImFwcGxpY2F0aW9uL2pzb25cIlxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICBpZiAocmVxdWVzdEhlYWRlcnMgJiYgcmVxdWVzdEhlYWRlcnNbXCJBdXRob3JpemF0aW9uXCJdKSB7XHJcbiAgICAgICAgICAgICAgICBoZWFkZXJzT2JqW1wiQXV0aG9yaXphdGlvblwiXSA9IHJlcXVlc3RIZWFkZXJzW1wiQXV0aG9yaXphdGlvblwiXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAocmVxdWVzdEhlYWRlcnMgJiYgcmVxdWVzdEhlYWRlcnNbXCJBY2NlcHRcIl0pIHtcclxuICAgICAgICAgICAgICAgIGhlYWRlcnNPYmpbXCJBY2NlcHRcIl0gPSByZXF1ZXN0SGVhZGVyc1tcIkFjY2VwdFwiXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB2YXIgcmVxdWVzdCA9IHtcclxuICAgICAgICAgICAgICAgIHVybDogJ2h0dHBzOi8vcHJveHkuYXBpc2FuZGJveC5tc2RuLm1pY3Jvc29mdC5jb20vc3ZjP3VybD0nICsgZW5jb2RlVVJJQ29tcG9uZW50KHF1ZXJ5KSxcclxuICAgICAgICAgICAgICAgIG1ldGhvZDogJ0dFVCcsXHJcbiAgICAgICAgICAgICAgICBoZWFkZXJzOiBoZWFkZXJzT2JqXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIGlmIChxdWVyeVR5cGUgPT0gXCJHRVRfQklOQVJZXCIpIHtcclxuICAgICAgICAgICAgICAgIHJlcXVlc3RbXCJyZXNwb25zZVR5cGVcIl0gPSBcImFycmF5YnVmZmVyXCI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHF1ZXJ5VHlwZSA9PSBcIkdFVF9CSU5BUllcIiB8fCBxdWVyeVR5cGUgPT0gXCJHRVRcIikge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGFwaVNlcnZpY2UuJGh0dHAocmVxdWVzdCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgfTtcclxuICAgIGZ1bmN0aW9uIHBlcmZvcm1RdWVyeShxdWVyeVR5cGUpIHtcclxuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKHF1ZXJ5LCBwb3N0U3RyaW5nLCByZXF1ZXN0SGVhZGVycykge1xyXG4gICAgICAgICAgICBzd2l0Y2ggKHF1ZXJ5VHlwZSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSBcIkdFVFwiOlxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBhcGlTZXJ2aWNlLiRodHRwLmdldChxdWVyeSwgeyBoZWFkZXJzOiByZXF1ZXN0SGVhZGVycyB9KTtcclxuICAgICAgICAgICAgICAgIGNhc2UgXCJHRVRfQklOQVJZXCI6XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGFwaVNlcnZpY2UuJGh0dHAuZ2V0KHF1ZXJ5LCB7IHJlc3BvbnNlVHlwZTogXCJhcnJheWJ1ZmZlclwiIH0sIHsgaGVhZGVyczogcmVxdWVzdEhlYWRlcnMgfSk7XHJcbiAgICAgICAgICAgICAgICBjYXNlIFwiUE9TVFwiOlxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBhcGlTZXJ2aWNlLiRodHRwLnBvc3QocXVlcnksIHBvc3RTdHJpbmcsIHsgaGVhZGVyczogcmVxdWVzdEhlYWRlcnMgfSk7XHJcbiAgICAgICAgICAgICAgICBjYXNlIFwiUEFUQ0hcIjpcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gYXBpU2VydmljZS4kaHR0cC5wYXRjaChxdWVyeSwgcG9zdFN0cmluZywgeyBoZWFkZXJzOiByZXF1ZXN0SGVhZGVycyB9KTtcclxuICAgICAgICAgICAgICAgIGNhc2UgXCJERUxFVEVcIjpcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gYXBpU2VydmljZS4kaHR0cC5kZWxldGUocXVlcnksIHsgaGVhZGVyczogcmVxdWVzdEhlYWRlcnMgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgfVxyXG4gICAgYXBpU2VydmljZS5wZXJmb3JtUXVlcnkgPSBwZXJmb3JtUXVlcnk7XHJcbiAgICBmdW5jdGlvbiBnZXRNZXRhZGF0YSgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5wZXJmb3JtQW5vbnltb3VzUXVlcnkoXCJHRVRcIikoXCJodHRwczovL2dyYXBoLm1pY3Jvc29mdC5jb20vXCIgKyB0aGlzLnNlbGVjdGVkVmVyc2lvbiArIFwiLyRtZXRhZGF0YVwiKTtcclxuICAgIH1cclxuICAgIGFwaVNlcnZpY2UuZ2V0TWV0YWRhdGEgPSBnZXRNZXRhZGF0YTtcclxufSkoYXBpU2VydmljZSB8fCAoYXBpU2VydmljZSA9IHt9KSk7XHJcbjtcclxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YXBpLWV4cGxvcmVyLXN2Yy5qcy5tYXAiLCJ2YXIgcztcclxudmFyIEdyYXBoQmFzZVVybCA9IFwiaHR0cHM6Ly9ncmFwaC5taWNyb3NvZnQuY29tL1wiO1xyXG52YXIgR3JhcGhWZXJzaW9ucyA9IFsnYmV0YScsICd2MS4wJ107XHJcbmFuZ3VsYXIubW9kdWxlKCdBcGlFeHBsb3JlcicpXHJcbiAgICAuY29udHJvbGxlcignQXBpRXhwbG9yZXJDdHJsJywgWyckc2NvcGUnLCAnJGh0dHAnLCAnJGxvY2F0aW9uJywgJ0FwaUV4cGxvcmVyU3ZjJywgJyR0aW1lb3V0JywgJyR0ZW1wbGF0ZUNhY2hlJywgJyRtZERpYWxvZycsICckc2NlJywgZnVuY3Rpb24gKCRzY29wZSwgJGh0dHAsICRsb2NhdGlvbiwgYXBpU2VydmljZSwgJHRpbWVvdXQsICR0ZW1wbGF0ZUNhY2hlLCAkbWREaWFsb2csICRzY2UpIHtcclxuICAgICAgICBzID0gJHNjb3BlO1xyXG4gICAgICAgICRzY29wZS51c2VySW5mbyA9IHt9O1xyXG4gICAgICAgICRzY29wZS5nZXRBc3NldFBhdGggPSBmdW5jdGlvbiAocmVsUGF0aCkge1xyXG4gICAgICAgICAgICByZXR1cm4gcy5wYXRoVG9CdWlsZERpciArIFwiL1wiICsgcmVsUGF0aDtcclxuICAgICAgICB9O1xyXG4gICAgICAgICRzY29wZS5maW5pc2hBZG1pbkNvbnNlcnRGbG93ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBoZWxsbygnbXNmdF90b2tlbl9yZWZyZXNoJykubG9naW4oe1xyXG4gICAgICAgICAgICAgICAgZGlzcGxheTogJ3BvcHVwJyxcclxuICAgICAgICAgICAgICAgIHJlc3BvbnNlX3R5cGU6IFwidG9rZW5cIixcclxuICAgICAgICAgICAgICAgIHJlZGlyZWN0X3VyaTogJHNjb3BlLnJlZGlyZWN0VXJsLFxyXG4gICAgICAgICAgICAgICAgc2NvcGU6ICRzY29wZS5zY29wZXMgKyBcIiBcIiArICRzY29wZS5hZG1pblNjb3BlcyxcclxuICAgICAgICAgICAgICAgIHJlc3BvbnNlX21vZGU6ICdmcmFnbWVudCcsXHJcbiAgICAgICAgICAgICAgICBwcm9tcHQ6ICdub25lJyxcclxuICAgICAgICAgICAgICAgIGRvbWFpbl9oaW50OiAnb3JnYW5pemF0aW9ucycsXHJcbiAgICAgICAgICAgICAgICBsb2dpbl9oaW50OiAkc2NvcGUudXNlckluZm8ucHJlZmVycmVkX3VzZXJuYW1lXHJcbiAgICAgICAgICAgIH0sIGZ1bmN0aW9uIChyZXMpIHtcclxuICAgICAgICAgICAgICAgIGlmIChyZXMuYXV0aFJlc3BvbnNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGFjY2Vzc1Rva2VuID0gcmVzLmF1dGhSZXNwb25zZS5hY2Nlc3NfdG9rZW47XHJcbiAgICAgICAgICAgICAgICAgICAgJGh0dHAuZGVmYXVsdHMuaGVhZGVycy5jb21tb25bJ0F1dGhvcml6YXRpb24nXSA9ICdCZWFyZXIgJyArIGFjY2Vzc1Rva2VuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LCBmdW5jdGlvbiAocmVzKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKHJlcyk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgaGVsbG8ub24oJ2F1dGgubG9naW4nLCBmdW5jdGlvbiAoYXV0aCkge1xyXG4gICAgICAgICAgICB2YXIgYWNjZXNzVG9rZW47XHJcbiAgICAgICAgICAgIGlmIChhdXRoLm5ldHdvcmsgPT0gXCJtc2Z0X3Rva2VuX3JlZnJlc2hcIikge1xyXG4gICAgICAgICAgICAgICAgYWNjZXNzVG9rZW4gPSBoZWxsbygnbXNmdF90b2tlbl9yZWZyZXNoJykuZ2V0QXV0aFJlc3BvbnNlKCkuYWNjZXNzX3Rva2VuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKGF1dGgubmV0d29yayA9PSBcIm1zZnRcIikge1xyXG4gICAgICAgICAgICAgICAgdmFyIGF1dGhSZXNwb25zZSA9IGhlbGxvKCdtc2Z0JykuZ2V0QXV0aFJlc3BvbnNlKCk7XHJcbiAgICAgICAgICAgICAgICBhY2Nlc3NUb2tlbiA9IGF1dGhSZXNwb25zZS5hY2Nlc3NfdG9rZW47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGFjY2Vzc1Rva2VuKSB7XHJcbiAgICAgICAgICAgICAgICAkaHR0cC5kZWZhdWx0cy5oZWFkZXJzLmNvbW1vblsnQXV0aG9yaXphdGlvbiddID0gJ0JlYXJlciAnICsgYWNjZXNzVG9rZW47XHJcbiAgICAgICAgICAgICAgICBhcGlTZXJ2aWNlLnBlcmZvcm1RdWVyeShcIkdFVFwiKShcImh0dHBzOi8vZ3JhcGgubWljcm9zb2Z0LmNvbS92MS4wL21lXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciByZXN1bHRCb2R5ID0gcmVzdWx0LmRhdGE7XHJcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLnVzZXJJbmZvID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwcmVmZXJyZWRfdXNlcm5hbWU6IHJlc3VsdEJvZHkubWFpbFxyXG4gICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbiAocmVzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihyZXMpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICAkc2NvcGUudGFiQ29uZmlnID0ge1xyXG4gICAgICAgICAgICBkaXNhYmxlUmVxdWVzdEJvZHlFZGl0b3I6IHRydWUsXHJcbiAgICAgICAgICAgIGhpZGVDb250ZW50OiB0cnVlLFxyXG4gICAgICAgICAgICBzZWxlY3RlZDogMFxyXG4gICAgICAgIH07XHJcbiAgICAgICAgJHNjb3BlLnNob3dJbWFnZSA9IGZhbHNlO1xyXG4gICAgICAgICRzY29wZS50YWJDb25maWcucHJldmlvdXNTZWxlY3RlZCA9ICRzY29wZS50YWJDb25maWcuc2VsZWN0ZWQ7XHJcbiAgICAgICAgJHNjb3BlLnByb2Nlc3NUYWJDbGljayA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdmFyIHN3aXRjaGluZ1RhYnMgPSAkc2NvcGUudGFiQ29uZmlnLnByZXZpb3VzU2VsZWN0ZWQgIT0gJHNjb3BlLnRhYkNvbmZpZy5zZWxlY3RlZDtcclxuICAgICAgICAgICAgaWYgKCFzd2l0Y2hpbmdUYWJzKVxyXG4gICAgICAgICAgICAgICAgJHNjb3BlLnRhYkNvbmZpZy5oaWRlQ29udGVudCA9ICEkc2NvcGUudGFiQ29uZmlnLmhpZGVDb250ZW50O1xyXG4gICAgICAgICAgICAkc2NvcGUudGFiQ29uZmlnLnByZXZpb3VzU2VsZWN0ZWQgPSAkc2NvcGUudGFiQ29uZmlnLnNlbGVjdGVkO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgdmFyIHJlcXVlc3RWYWwgPSAkbG9jYXRpb24uc2VhcmNoKCkucmVxdWVzdDtcclxuICAgICAgICB2YXIgYWN0aW9uVmFsID0gJGxvY2F0aW9uLnNlYXJjaCgpLm1ldGhvZDtcclxuICAgICAgICB2YXIgYm9keVZhbCA9ICRsb2NhdGlvbi5zZWFyY2goKS5ib2R5O1xyXG4gICAgICAgIHZhciB2ZXJzaW9uVmFsID0gJGxvY2F0aW9uLnNlYXJjaCgpLnZlcnNpb247XHJcbiAgICAgICAgdmFyIGhlYWRlcnNWYWwgPSAkbG9jYXRpb24uc2VhcmNoKCkuaGVhZGVycztcclxuICAgICAgICBoYW5kbGVRdWVyeVN0cmluZyhhcGlTZXJ2aWNlLCBhY3Rpb25WYWwsIHZlcnNpb25WYWwsIHJlcXVlc3RWYWwpO1xyXG4gICAgICAgICR0aW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaW5pdGlhbGl6ZUhlYWRlcnNFZGl0b3IoaGVhZGVyc1ZhbCk7XHJcbiAgICAgICAgICAgIGluaXRpYWxpemVKc29uVmlld2VyKCRzY29wZSwgYXBpU2VydmljZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcGFyc2VNZXRhZGF0YShhcGlTZXJ2aWNlKTtcclxuICAgICAgICAkc2NvcGUuaXNBdXRoZW50aWNhdGVkID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB2YXIgc2Vzc2lvbiA9IGhlbGxvKCdtc2Z0JykuZ2V0QXV0aFJlc3BvbnNlKCk7XHJcbiAgICAgICAgICAgIGlmIChzZXNzaW9uID09PSBudWxsKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB2YXIgY3VycmVudFRpbWUgPSAobmV3IERhdGUoKSkuZ2V0VGltZSgpIC8gMTAwMDtcclxuICAgICAgICAgICAgcmV0dXJuIHNlc3Npb24gJiYgc2Vzc2lvbi5hY2Nlc3NfdG9rZW4gJiYgc2Vzc2lvbi5leHBpcmVzID4gY3VycmVudFRpbWU7XHJcbiAgICAgICAgfTtcclxuICAgICAgICAkc2NvcGUuJHdhdGNoKFwiZ2V0RWRpdG9yKClcIiwgZnVuY3Rpb24gKGV2ZW50LCBhcmdzKSB7XHJcbiAgICAgICAgICAgIGluaXRpYWxpemVKc29uRWRpdG9yKGJvZHlWYWwpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgICRzY29wZS5sb2dpbiA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaGVsbG8oJ21zZnQnKS5sb2dpbih7XHJcbiAgICAgICAgICAgICAgICBkaXNwbGF5OiAncGFnZScsXHJcbiAgICAgICAgICAgICAgICByZXNwb25zZV90eXBlOiBcImlkX3Rva2VuIHRva2VuXCIsXHJcbiAgICAgICAgICAgICAgICBub25jZTogJ2dyYXBoX2V4cGxvcmVyJyxcclxuICAgICAgICAgICAgICAgIHByb21wdDogJ2xvZ2luJyxcclxuICAgICAgICAgICAgICAgIG1zYWZlZDogMFxyXG4gICAgICAgICAgICB9LCBmdW5jdGlvbiAocmVzKSB7XHJcbiAgICAgICAgICAgIH0sIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ2Vycm9yIHNpZ25pbmcgaW4nKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICAkc2NvcGUubG9nb3V0ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBhcGlTZXJ2aWNlLnNlbGVjdGVkT3B0aW9uID0gXCJHRVRcIjtcclxuICAgICAgICAgICAgJHNjb3BlLnRhYkNvbmZpZy5kaXNhYmxlUmVxdWVzdEJvZHlFZGl0b3IgPSB0cnVlO1xyXG4gICAgICAgICAgICBzZXRTZWxlY3RlZFRhYigwKTtcclxuICAgICAgICAgICAgaGVsbG8oJ21zZnQnKS5sb2dvdXQobnVsbCwgeyBmb3JjZTogdHJ1ZSB9KTtcclxuICAgICAgICAgICAgZGVsZXRlICRzY29wZS51c2VySW5mbztcclxuICAgICAgICB9O1xyXG4gICAgICAgICRzY29wZS5nZXRTZWFyY2hUZXh0ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gYXBpU2VydmljZS50ZXh0O1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgJHNjb3BlLmdldEN1cnJlbnRFbnRpdHlOYW1lID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAoIWFwaVNlcnZpY2UudGV4dClcclxuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgICAgICB2YXIgdHh0ID0gYXBpU2VydmljZS50ZXh0O1xyXG4gICAgICAgICAgICB2YXIgcGF0aEFyciA9IHR4dC5zcGxpdChcIi9cIikuZmlsdGVyKChmdW5jdGlvbiAoYSkgeyByZXR1cm4gYS5sZW5ndGggPiAwOyB9KSk7XHJcbiAgICAgICAgICAgIHJldHVybiBwYXRoQXJyLnBvcCgpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgJHNjb3BlLmNhbkluc2VydFRlbXBsYXRlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gYXBpU2VydmljZS5zZWxlY3RlZE9wdGlvbiA9PSBcIlBPU1RcIiAmJiBjaGVja0Nhbkluc2VydFRlbXBsYXRlKGFwaVNlcnZpY2UudGV4dCk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICAkc2NvcGUuaW5zZXJ0UG9zdFRlbXBsYXRlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB2YXIgZW50aXR5ID0gJHNjb3BlLmdldEN1cnJlbnRFbnRpdHlOYW1lKCk7XHJcbiAgICAgICAgICAgIHZhciBzdHJUb0luc2VydCA9IEpTT04uc3RyaW5naWZ5KHBvc3RUZW1wbGF0ZXNbZW50aXR5XSwgbnVsbCwgMikudHJpbSgpO1xyXG4gICAgICAgICAgICB2YXIgZnVsbFVzZXJFbWFpbCA9ICRzY29wZS51c2VySW5mby5wcmVmZXJyZWRfdXNlcm5hbWU7XHJcbiAgICAgICAgICAgIHZhciBkb21haW4gPSBmdWxsVXNlckVtYWlsLnNwbGl0KFwiQFwiKVsxXTtcclxuICAgICAgICAgICAgc3RyVG9JbnNlcnQgPSBzdHJUb0luc2VydC5yZXBsYWNlKC9BVVRIRU5USUNBVEVEX0RPTUFJTi9nLCBkb21haW4pO1xyXG4gICAgICAgICAgICBzdHJUb0luc2VydCA9IHN0clRvSW5zZXJ0LnJlcGxhY2UoL0ZVTExfVVNFUl9FTUFJTC9nLCBmdWxsVXNlckVtYWlsKTtcclxuICAgICAgICAgICAgaW5pdGlhbGl6ZUpzb25FZGl0b3Ioc3RyVG9JbnNlcnQpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgZnVuY3Rpb24gY2hlY2tDYW5JbnNlcnRUZW1wbGF0ZShVUkwpIHtcclxuICAgICAgICAgICAgcztcclxuICAgICAgICAgICAgdmFyIGVudGl0eSA9ICRzY29wZS5nZXRDdXJyZW50RW50aXR5TmFtZSgpO1xyXG4gICAgICAgICAgICB2YXIgY2FuSW5zZXJ0VGVtcGxhdGUgPSBlbnRpdHkgaW4gcG9zdFRlbXBsYXRlcztcclxuICAgICAgICAgICAgcmV0dXJuIGNhbkluc2VydFRlbXBsYXRlO1xyXG4gICAgICAgIH1cclxuICAgICAgICAkc2NvcGUuc2hvd1NoYXJlRGlhbG9nID0gZnVuY3Rpb24gKGV2KSB7XHJcbiAgICAgICAgICAgICRtZERpYWxvZy5zaG93KHtcclxuICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6IFNoYXJlRGlhbG9nQ29udHJvbGxlcixcclxuICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiBwYXRoVG9CdWlsZERpciArICcvYXNzZXRzL3ZpZXdzL3NoYXJlRGlhbG9nLnRtcGwuaHRtbCcsXHJcbiAgICAgICAgICAgICAgICBwYXJlbnQ6IGFuZ3VsYXIuZWxlbWVudChkb2N1bWVudC5ib2R5KSxcclxuICAgICAgICAgICAgICAgIHRhcmdldEV2ZW50OiBldixcclxuICAgICAgICAgICAgICAgIGNsaWNrT3V0c2lkZVRvQ2xvc2U6IHRydWUsXHJcbiAgICAgICAgICAgICAgICBzY29wZTogJHNjb3BlLiRuZXcoKSxcclxuICAgICAgICAgICAgICAgIGxvY2Fsczoge1xyXG4gICAgICAgICAgICAgICAgICAgIGFwaVNlcnZpY2U6IGFwaVNlcnZpY2UsXHJcbiAgICAgICAgICAgICAgICAgICAgJHNjZTogJHNjZSxcclxuICAgICAgICAgICAgICAgICAgICBoZWFkZXJzOiBmb3JtYXRSZXF1ZXN0SGVhZGVycyhnZXRIZWFkZXJzRWRpdG9yKCkuZ2V0U2Vzc2lvbigpLmdldFZhbHVlKCkpLFxyXG4gICAgICAgICAgICAgICAgICAgIGJvZHk6IGdldEpzb25WaWV3ZXIoKS5nZXRTZXNzaW9uKCkuZ2V0VmFsdWUoKVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChhbnN3ZXIpIHtcclxuICAgICAgICAgICAgICAgICRzY29wZS5zdGF0dXMgPSAnWW91IHNhaWQgdGhlIGluZm9ybWF0aW9uIHdhcyBcIicgKyBhbnN3ZXIgKyAnXCIuJztcclxuICAgICAgICAgICAgfSwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgJHNjb3BlLnN0YXR1cyA9ICdZb3UgY2FuY2VsbGVkIHRoZSBkaWFsb2cuJztcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfTtcclxuICAgIH1dKTtcclxuYW5ndWxhci5tb2R1bGUoJ0FwaUV4cGxvcmVyJylcclxuICAgIC5jb250cm9sbGVyKCdEcm9wZG93bkN0cmwnLCBbJyRzY29wZScsICdBcGlFeHBsb3JlclN2YycsIGZ1bmN0aW9uICgkc2NvcGUsIGFwaVNlcnZpY2UpIHtcclxuICAgICAgICAkc2NvcGUub25JdGVtQ2xpY2sgPSBmdW5jdGlvbiAoY2hvaWNlKSB7XHJcbiAgICAgICAgICAgIGlmIChjaG9pY2UgIT0gYXBpU2VydmljZS5zZWxlY3RlZE9wdGlvbikge1xyXG4gICAgICAgICAgICAgICAgYXBpU2VydmljZS5zZWxlY3RlZE9wdGlvbiA9IGNob2ljZTtcclxuICAgICAgICAgICAgICAgIGFwaVNlcnZpY2UudGV4dCA9IGFwaVNlcnZpY2UudGV4dC5yZXBsYWNlKC9odHRwczpcXC9cXC9ncmFwaC5taWNyb3NvZnQuY29tKCR8XFwvKFtcXHddfFxcLikqKCR8XFwvKSkvLCAoXCJodHRwczovL2dyYXBoLm1pY3Jvc29mdC5jb20vXCIgKyBhcGlTZXJ2aWNlLnNlbGVjdGVkVmVyc2lvbiArIFwiL1wiKSk7XHJcbiAgICAgICAgICAgICAgICBpZiAoY2hvaWNlID09ICdQT1NUJyB8fCBjaG9pY2UgPT0gJ1BBVENIJykge1xyXG4gICAgICAgICAgICAgICAgICAgIHNob3dSZXF1ZXN0Qm9keUVkaXRvcigpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoY2hvaWNlID09ICdHRVQnIHx8IGNob2ljZSA9PSAnREVMRVRFJykge1xyXG4gICAgICAgICAgICAgICAgICAgIHMudGFiQ29uZmlnLmRpc2FibGVSZXF1ZXN0Qm9keUVkaXRvciA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgc2V0U2VsZWN0ZWRUYWIoMCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgICAgICRzY29wZS5pdGVtcyA9IFtcclxuICAgICAgICAgICAgJ0dFVCcsXHJcbiAgICAgICAgICAgICdQT1NUJyxcclxuICAgICAgICAgICAgJ1BBVENIJyxcclxuICAgICAgICAgICAgJ0RFTEVURSdcclxuICAgICAgICBdO1xyXG4gICAgICAgICRzY29wZS5nZXRTZXJ2aWNlT3B0aW9uID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gYXBpU2VydmljZS5zZWxlY3RlZE9wdGlvbjtcclxuICAgICAgICB9O1xyXG4gICAgfV0pO1xyXG5hbmd1bGFyLm1vZHVsZSgnQXBpRXhwbG9yZXInKVxyXG4gICAgLmNvbnRyb2xsZXIoJ1ZlcnNpb25DdHJsJywgWyckc2NvcGUnLCAnQXBpRXhwbG9yZXJTdmMnLCBmdW5jdGlvbiAoJHNjb3BlLCBhcGlTZXJ2aWNlKSB7XHJcbiAgICAgICAgJHNjb3BlLml0ZW1zID0gR3JhcGhWZXJzaW9ucztcclxuICAgICAgICAkc2NvcGUuZ2V0U2VydmljZVZlcnNpb24gPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBhcGlTZXJ2aWNlLnNlbGVjdGVkVmVyc2lvbjtcclxuICAgICAgICB9O1xyXG4gICAgICAgICRzY29wZS5vbkl0ZW1DbGljayA9IGZ1bmN0aW9uIChjaG9pY2UpIHtcclxuICAgICAgICAgICAgaWYgKGFwaVNlcnZpY2Uuc2VsZWN0ZWRWZXJzaW9uICE9PSBjaG9pY2UpIHtcclxuICAgICAgICAgICAgICAgIGFwaVNlcnZpY2Uuc2VsZWN0ZWRWZXJzaW9uID0gY2hvaWNlO1xyXG4gICAgICAgICAgICAgICAgYXBpU2VydmljZS50ZXh0ID0gYXBpU2VydmljZS50ZXh0LnJlcGxhY2UoL2h0dHBzOlxcL1xcL2dyYXBoLm1pY3Jvc29mdC5jb20oJHxcXC8oW1xcd118XFwuKSooJHxcXC8pKS8sIChcImh0dHBzOi8vZ3JhcGgubWljcm9zb2Z0LmNvbS9cIiArIGFwaVNlcnZpY2Uuc2VsZWN0ZWRWZXJzaW9uICsgXCIvXCIpKTtcclxuICAgICAgICAgICAgICAgICRzY29wZS4kcGFyZW50LiRicm9hZGNhc3QoJ3VwZGF0ZVVybEZyb21TZXJ2aWNlVGV4dCcpO1xyXG4gICAgICAgICAgICAgICAgcGFyc2VNZXRhZGF0YShhcGlTZXJ2aWNlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICB9XSk7XHJcbmFuZ3VsYXIubW9kdWxlKCdBcGlFeHBsb3JlcicpLmNvbnRyb2xsZXIoJ2RhdGFsaXN0Q3RybCcsIFsnJHNjb3BlJywgJ0FwaUV4cGxvcmVyU3ZjJywgZnVuY3Rpb24gKCRzY29wZSwgYXBpU2VydmljZSkge1xyXG4gICAgICAgICRzY29wZS5zZWFyY2hUZXh0Q2hhbmdlID0gZnVuY3Rpb24gKHNlYXJjaFRleHQpIHtcclxuICAgICAgICAgICAgYXBpU2VydmljZS50ZXh0ID0gc2VhcmNoVGV4dDtcclxuICAgICAgICAgICAgdmFyIGdyYXBoUGF0aFN0YXJ0aW5nV2l0aFZlcnNpb24gPSBzZWFyY2hUZXh0LnNwbGl0KEdyYXBoQmFzZVVybCk7XHJcbiAgICAgICAgICAgIGlmIChncmFwaFBhdGhTdGFydGluZ1dpdGhWZXJzaW9uLmxlbmd0aCA8IDIpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB2YXIgcG9zc2libGVHcmFwaFBhdGhBcnIgPSBncmFwaFBhdGhTdGFydGluZ1dpdGhWZXJzaW9uWzFdLnNwbGl0KCcvJyk7XHJcbiAgICAgICAgICAgIGlmIChwb3NzaWJsZUdyYXBoUGF0aEFyci5sZW5ndGggPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHZhciBwb3NzaWJsZVZlcnNpb24gPSBwb3NzaWJsZUdyYXBoUGF0aEFyclswXTtcclxuICAgICAgICAgICAgaWYgKEdyYXBoVmVyc2lvbnMuaW5kZXhPZihwb3NzaWJsZVZlcnNpb24pICE9IC0xKSB7XHJcbiAgICAgICAgICAgICAgICBhcGlTZXJ2aWNlLnNlbGVjdGVkVmVyc2lvbiA9IHBvc3NpYmxlVmVyc2lvbjtcclxuICAgICAgICAgICAgICAgIHBhcnNlTWV0YWRhdGEoYXBpU2VydmljZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgICAgICRzY29wZS5nZXRSZXF1ZXN0SGlzdG9yeSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHJlcXVlc3RIaXN0b3J5O1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgJHNjb3BlLiRvbigndXBkYXRlVXJsRnJvbVNlcnZpY2VUZXh0JywgZnVuY3Rpb24gKGV2ZW50LCBkYXRhKSB7XHJcbiAgICAgICAgICAgICRzY29wZS50ZXh0ID0gYXBpU2VydmljZS50ZXh0O1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgICRzY29wZS5zZWFyY2hUZXh0Q2hhbmdlKGFwaVNlcnZpY2UudGV4dCk7XHJcbiAgICAgICAgJHNjb3BlLnNlYXJjaFRleHQgPSBhcGlTZXJ2aWNlLnRleHQ7XHJcbiAgICAgICAgJHNjb3BlLmdldE1hdGNoZXMgPSBmdW5jdGlvbiAocXVlcnkpIHtcclxuICAgICAgICAgICAgdmFyIHVybHMgPSBnZXRVcmxzRnJvbVNlcnZpY2VVUkwoYXBpU2VydmljZSk7XHJcbiAgICAgICAgICAgIHJldHVybiB1cmxzLmZpbHRlcihmdW5jdGlvbiAob3B0aW9uKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgcXVlcnlJbk9wdGlvbiA9IChvcHRpb24uaW5kZXhPZihxdWVyeSkgPiAtMSk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcXVlcnlJbk9wdGlvbjtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBpZiAod2luZG93WydydW5UZXN0cyddKVxyXG4gICAgICAgICAgICBydW5BdXRvQ29tcGxldGVUZXN0cyhhcGlTZXJ2aWNlKTtcclxuICAgIH1dKTtcclxuYW5ndWxhci5tb2R1bGUoJ0FwaUV4cGxvcmVyJykuY29udHJvbGxlcignRm9ybUN0cmwnLCBbJyRzY29wZScsICdBcGlFeHBsb3JlclN2YycsIGZ1bmN0aW9uICgkc2NvcGUsIGFwaVNlcnZpY2UpIHtcclxuICAgICAgICAkc2NvcGUucmVxdWVzdEluUHJvZ3Jlc3MgPSBmYWxzZTtcclxuICAgICAgICAkc2NvcGUuaW5zdWZmaWNpZW50UHJpdmlsZWdlcyA9IGZhbHNlO1xyXG4gICAgICAgIGlmIChoZWxsbygnbXNmdCcpLmdldEF1dGhSZXNwb25zZSgpICE9IG51bGwgJiZcclxuICAgICAgICAgICAgKGFwaVNlcnZpY2Uuc2VsZWN0ZWRPcHRpb24gPT09ICdQT1NUJyB8fCBhcGlTZXJ2aWNlLnNlbGVjdGVkT3B0aW9uID09PSAnUEFUQ0gnKSkge1xyXG4gICAgICAgICAgICBzaG93UmVxdWVzdEJvZHlFZGl0b3IoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHNldFNlbGVjdGVkVGFiKDApO1xyXG4gICAgICAgIH1cclxuICAgICAgICAkc2NvcGUuJHBhcmVudC4kb24oXCJ1cmxDaGFuZ2VcIiwgZnVuY3Rpb24gKGV2ZW50LCBhcmdzKSB7XHJcbiAgICAgICAgICAgIG1zR3JhcGhMaW5rUmVzb2x1dGlvbigkc2NvcGUsIGdldEpzb25WaWV3ZXIoKS5nZXRTZXNzaW9uKCkuZ2V0VmFsdWUoKSwgYXJncywgYXBpU2VydmljZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgJHNjb3BlLmhpc3RvcnlPbkNsaWNrID0gZnVuY3Rpb24gKGhpc3RvcnlJdGVtKSB7XHJcbiAgICAgICAgICAgIGFwaVNlcnZpY2UudGV4dCA9IGhpc3RvcnlJdGVtLnVybFRleHQ7XHJcbiAgICAgICAgICAgICRzY29wZS4kYnJvYWRjYXN0KCd1cGRhdGVVcmxGcm9tU2VydmljZVRleHQnKTtcclxuICAgICAgICAgICAgYXBpU2VydmljZS5zZWxlY3RlZFZlcnNpb24gPSBoaXN0b3J5SXRlbS5zZWxlY3RlZFZlcnNpb247XHJcbiAgICAgICAgICAgIGFwaVNlcnZpY2Uuc2VsZWN0ZWRPcHRpb24gPSBoaXN0b3J5SXRlbS5odG1sT3B0aW9uO1xyXG4gICAgICAgICAgICBwYXJzZU1ldGFkYXRhKGFwaVNlcnZpY2UpO1xyXG4gICAgICAgICAgICBpZiAoaGlzdG9yeUl0ZW0uaHRtbE9wdGlvbiA9PSAnUE9TVCcgfHwgaGlzdG9yeUl0ZW0uaHRtbE9wdGlvbiA9PSAnUEFUQ0gnKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZ2V0SnNvblZpZXdlcigpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZ2V0SnNvblZpZXdlcigpLmdldFNlc3Npb24oKS5zZXRWYWx1ZShoaXN0b3J5SXRlbS5qc29uSW5wdXQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihcImpzb24gZWRpdG9yIHdhdGNoIGV2ZW50IG5vdCBmaXJpbmdcIik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZ2V0SnNvblZpZXdlcigpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZ2V0SnNvblZpZXdlcigpLmdldFNlc3Npb24oKS5zZXRWYWx1ZShcIlwiKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAkc2NvcGUuc3VibWl0KCk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICAkc2NvcGUuY2xvc2VBZG1pbkNvbnNlbnRCYXIgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICRzY29wZS5pbnN1ZmZpY2llbnRQcml2aWxlZ2VzID0gZmFsc2U7XHJcbiAgICAgICAgfTtcclxuICAgICAgICAkc2NvcGUuZ2V0QWRtaW5Db25zZW50ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBoZWxsbygnbXNmdF9hZG1pbl9jb25zZW50JykubG9naW4oe1xyXG4gICAgICAgICAgICAgICAgZGlzcGxheTogJ3BvcHVwJ1xyXG4gICAgICAgICAgICB9KS50aGVuKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICRzY29wZS5maW5pc2hBZG1pbkNvbnNlcnRGbG93KCk7XHJcbiAgICAgICAgICAgIH0sIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICRzY29wZS5maW5pc2hBZG1pbkNvbnNlcnRGbG93KCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgJHNjb3BlLnN1Ym1pdCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgJHNjb3BlLnJlcXVlc3RJblByb2dyZXNzID0gdHJ1ZTtcclxuICAgICAgICAgICAgdmFyIGhpc3RvcnlPYmogPSB7XHJcbiAgICAgICAgICAgICAgICB1cmxUZXh0OiBhcGlTZXJ2aWNlLnRleHQsXHJcbiAgICAgICAgICAgICAgICBzZWxlY3RlZFZlcnNpb246IGFwaVNlcnZpY2Uuc2VsZWN0ZWRWZXJzaW9uLFxyXG4gICAgICAgICAgICAgICAgaHRtbE9wdGlvbjogYXBpU2VydmljZS5zZWxlY3RlZE9wdGlvbixcclxuICAgICAgICAgICAgICAgIGpzb25JbnB1dDogbnVsbFxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICBpZiAoaGlzdG9yeU9iai5odG1sT3B0aW9uID09ICdQT1NUJyB8fCBoaXN0b3J5T2JqLmh0bWxPcHRpb24gPT0gJ1BBVENIJykge1xyXG4gICAgICAgICAgICAgICAgaGlzdG9yeU9iai5qc29uSW5wdXQgPSBnZXRSZXF1ZXN0Qm9keUVkaXRvcigpLmdldFNlc3Npb24oKS5nZXRWYWx1ZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICRzY29wZS5zaG93SW1hZ2UgPSBmYWxzZTtcclxuICAgICAgICAgICAgdmFyIHBvc3RCb2R5O1xyXG4gICAgICAgICAgICBpZiAoZ2V0UmVxdWVzdEJvZHlFZGl0b3IoKSAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIHBvc3RCb2R5ID0gZ2V0UmVxdWVzdEJvZHlFZGl0b3IoKS5nZXRTZXNzaW9uKCkuZ2V0VmFsdWUoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB2YXIgcmVxdWVzdEhlYWRlcnMgPSBcIlwiO1xyXG4gICAgICAgICAgICBpZiAoZ2V0SGVhZGVyc0VkaXRvcigpICE9IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgcmVxdWVzdEhlYWRlcnMgPSBnZXRIZWFkZXJzRWRpdG9yKCkuZ2V0U2Vzc2lvbigpLmdldFZhbHVlKCk7XHJcbiAgICAgICAgICAgICAgICByZXF1ZXN0SGVhZGVycyA9IGZvcm1hdFJlcXVlc3RIZWFkZXJzKHJlcXVlc3RIZWFkZXJzKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB2YXIgc3RhcnRUaW1lID0gbmV3IERhdGUoKTtcclxuICAgICAgICAgICAgZnVuY3Rpb24gaGFuZGxlU3VjY2Vzc2Z1bFF1ZXJ5UmVzcG9uc2UocmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgc3RhdHVzID0gcmVzdWx0LnN0YXR1cztcclxuICAgICAgICAgICAgICAgIHZhciBoZWFkZXJzID0gcmVzdWx0LmhlYWRlcnM7XHJcbiAgICAgICAgICAgICAgICB2YXIgcmVzdWx0Qm9keSA9IHJlc3VsdC5kYXRhO1xyXG4gICAgICAgICAgICAgICAgaWYgKGlzSW1hZ2VSZXNwb25zZShoZWFkZXJzKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGhhbmRsZUltYWdlUmVzcG9uc2UoJHNjb3BlLCBhcGlTZXJ2aWNlLCBzdGFydFRpbWUsIGhlYWRlcnMsIHN0YXR1cywgaGFuZGxlVW5zdWNjZXNzZnVsUXVlcnlSZXNwb25zZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmIChpc0h0bWxSZXNwb25zZShoZWFkZXJzKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGhhbmRsZUh0bWxSZXNwb25zZSgkc2NvcGUsIHN0YXJ0VGltZSwgcmVzdWx0Qm9keSwgaGVhZGVycywgc3RhdHVzKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKGlzWG1sUmVzcG9uc2UocmVzdWx0KSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGhhbmRsZVhtbFJlc3BvbnNlKCRzY29wZSwgc3RhcnRUaW1lLCByZXN1bHRCb2R5LCBoZWFkZXJzLCBzdGF0dXMpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaGFuZGxlSnNvblJlc3BvbnNlKCRzY29wZSwgc3RhcnRUaW1lLCByZXN1bHRCb2R5LCBoZWFkZXJzLCBzdGF0dXMpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaGlzdG9yeU9iai5kdXJhdGlvbiA9IChuZXcgRGF0ZSgpKS5nZXRUaW1lKCkgLSBzdGFydFRpbWUuZ2V0VGltZSgpO1xyXG4gICAgICAgICAgICAgICAgc2F2ZUhpc3RvcnlPYmplY3QoaGlzdG9yeU9iaiwgc3RhdHVzKTtcclxuICAgICAgICAgICAgICAgICRzY29wZS5pbnN1ZmZpY2llbnRQcml2aWxlZ2VzID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZnVuY3Rpb24gaGFuZGxlVW5zdWNjZXNzZnVsUXVlcnlSZXNwb25zZShyZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgIHZhciBzdGF0dXMgPSByZXN1bHQuc3RhdHVzO1xyXG4gICAgICAgICAgICAgICAgdmFyIGhlYWRlcnMgPSByZXN1bHQuaGVhZGVycztcclxuICAgICAgICAgICAgICAgIGhhbmRsZUpzb25SZXNwb25zZSgkc2NvcGUsIHN0YXJ0VGltZSwgcmVzdWx0LmRhdGEsIGhlYWRlcnMsIHN0YXR1cyk7XHJcbiAgICAgICAgICAgICAgICBoaXN0b3J5T2JqLmR1cmF0aW9uID0gKG5ldyBEYXRlKCkpLmdldFRpbWUoKSAtIHN0YXJ0VGltZS5nZXRUaW1lKCk7XHJcbiAgICAgICAgICAgICAgICBzYXZlSGlzdG9yeU9iamVjdChoaXN0b3J5T2JqLCBzdGF0dXMpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHN0YXR1cyA9PT0gNDAxIHx8IHN0YXR1cyA9PT0gNDAzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLmluc3VmZmljaWVudFByaXZpbGVnZXMgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICgkc2NvcGUuaXNBdXRoZW50aWNhdGVkKCkpIHtcclxuICAgICAgICAgICAgICAgIGFwaVNlcnZpY2UucGVyZm9ybVF1ZXJ5KGFwaVNlcnZpY2Uuc2VsZWN0ZWRPcHRpb24pKGFwaVNlcnZpY2UudGV4dCwgcG9zdEJvZHksIHJlcXVlc3RIZWFkZXJzKVxyXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKGhhbmRsZVN1Y2Nlc3NmdWxRdWVyeVJlc3BvbnNlLCBoYW5kbGVVbnN1Y2Nlc3NmdWxRdWVyeVJlc3BvbnNlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGFwaVNlcnZpY2UucGVyZm9ybUFub255bW91c1F1ZXJ5KGFwaVNlcnZpY2Uuc2VsZWN0ZWRPcHRpb24pKGFwaVNlcnZpY2UudGV4dCwgcG9zdEJvZHksIHJlcXVlc3RIZWFkZXJzKVxyXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKGhhbmRsZVN1Y2Nlc3NmdWxRdWVyeVJlc3BvbnNlLCBoYW5kbGVVbnN1Y2Nlc3NmdWxRdWVyeVJlc3BvbnNlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICB9XSk7XHJcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWFwaS1leHBsb3Jlci1jdHJsLmpzLm1hcCIsInZhciBzY3JpcHRzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJzY3JpcHRcIik7XHJcbnZhciBzcmMgPSBzY3JpcHRzW3NjcmlwdHMubGVuZ3RoIC0gMV0uc3JjO1xyXG52YXIgcGF0aFRvQnVpbGREaXIgPSBzcmMuc3BsaXQoJy8nKS5zbGljZSgwLCAtMikuam9pbignLycpO1xyXG5hbmd1bGFyLm1vZHVsZSgnQXBpRXhwbG9yZXInKVxyXG4gICAgLmRpcmVjdGl2ZSgnYXBpRXhwbG9yZXInLCBmdW5jdGlvbiAoKSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIHNjb3BlOiB7XHJcbiAgICAgICAgICAgIHN0cmluZ3M6ICc9JyxcclxuICAgICAgICAgICAgbGFuZ3VhZ2U6ICc9JyxcclxuICAgICAgICAgICAgc2NvcGVzOiAnPScsXHJcbiAgICAgICAgICAgIGFkbWluU2NvcGVzOiAnPScsXHJcbiAgICAgICAgICAgIGNsaWVudElkOiAnPScsXHJcbiAgICAgICAgICAgIHJlZGlyZWN0VXJsOiAnPSdcclxuICAgICAgICB9LFxyXG4gICAgICAgIHRlbXBsYXRlVXJsOiBwYXRoVG9CdWlsZERpciArICcvYXNzZXRzL3ZpZXdzL2V4cGxvcmVyLmh0bWwnLFxyXG4gICAgICAgIGNvbnRyb2xsZXI6IGZ1bmN0aW9uICgkc2NvcGUpIHtcclxuICAgICAgICAgICAgJHNjb3BlLnBhdGhUb0J1aWxkRGlyID0gcGF0aFRvQnVpbGREaXI7XHJcbiAgICAgICAgICAgICRzY29wZS5zdHIgPSBsb2Nfc3RyaW5nc1snZW5fdXMnXTtcclxuICAgICAgICAgICAgaWYgKCRzY29wZS5sYW5ndWFnZSkge1xyXG4gICAgICAgICAgICAgICAgJHNjb3BlLnN0ciA9IGxvY19zdHJpbmdzWyRzY29wZS5sYW5ndWFnZV07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgYW5ndWxhci5leHRlbmQoJHNjb3BlLnN0ciwgJHNjb3BlLnN0cmluZ3MpO1xyXG4gICAgICAgICAgICBoZWxsby5pbml0KHtcclxuICAgICAgICAgICAgICAgIG1zZnQ6ICRzY29wZS5jbGllbnRJZFxyXG4gICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICBzY29wZTogJHNjb3BlLnNjb3BlcyxcclxuICAgICAgICAgICAgICAgIHJlZGlyZWN0X3VyaTogd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBoZWxsby5pbml0KHtcclxuICAgICAgICAgICAgICAgIG1zZnRfYWRtaW5fY29uc2VudDogJHNjb3BlLmNsaWVudElkLFxyXG4gICAgICAgICAgICAgICAgbXNmdF90b2tlbl9yZWZyZXNoOiAkc2NvcGUuY2xpZW50SWQsXHJcbiAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgIHJlZGlyZWN0X3VyaTogd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbn0pO1xyXG4vLyMgc291cmNlTWFwcGluZ1VSTD1hcGktZXhwbG9yZXItZGlyZWN0aXZlLmpzLm1hcCIsImZ1bmN0aW9uIGdldFJlcXVlc3RCb2R5RWRpdG9yKCkge1xyXG4gICAgdmFyIHJlcXVlc3RCb2R5RWRpdG9yRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwianNvbkVkaXRvclwiKTtcclxuICAgIHJldHVybiBhY2UuZWRpdChyZXF1ZXN0Qm9keUVkaXRvckVsZW1lbnQpO1xyXG59XHJcbmZ1bmN0aW9uIGdldEhlYWRlcnNFZGl0b3IoKSB7XHJcbiAgICB2YXIgcmVxdWVzdEhlYWRlckVkaXRvckVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImpzb25FZGl0b3JIZWFkZXJzXCIpO1xyXG4gICAgcmV0dXJuIGFjZS5lZGl0KHJlcXVlc3RIZWFkZXJFZGl0b3JFbGVtZW50KTtcclxufVxyXG5mdW5jdGlvbiBnZXRKc29uVmlld2VyKCkge1xyXG4gICAgdmFyIGpzb25WaWV3ZXJFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJqc29uVmlld2VyXCIpO1xyXG4gICAgcmV0dXJuIGFjZS5lZGl0KGpzb25WaWV3ZXJFbGVtZW50KTtcclxufVxyXG5mdW5jdGlvbiBpbml0aWFsaXplSnNvbkVkaXRvcihib2R5VmFsKSB7XHJcbiAgICB2YXIgZWRpdG9yID0gZ2V0UmVxdWVzdEJvZHlFZGl0b3IoKTtcclxuICAgIGNvbW1vbkFjZVNldHVwKGVkaXRvcik7XHJcbiAgICBlZGl0b3IuZ2V0U2Vzc2lvbigpLnNldE1vZGUoXCJhY2UvbW9kZS9qYXZhc2NyaXB0XCIpO1xyXG4gICAgaWYgKGJvZHlWYWwpIHtcclxuICAgICAgICBlZGl0b3IuZ2V0U2Vzc2lvbigpLmluc2VydCh7IHJvdzogMCwgY29sdW1uOiAwIH0sIGJvZHlWYWwpO1xyXG4gICAgfVxyXG59XHJcbmZ1bmN0aW9uIGluaXRpYWxpemVIZWFkZXJzRWRpdG9yKGhlYWRlcnNWYWwpIHtcclxuICAgIHZhciBlZGl0b3IgPSBnZXRIZWFkZXJzRWRpdG9yKCk7XHJcbiAgICBjb21tb25BY2VTZXR1cChlZGl0b3IpO1xyXG4gICAgaWYgKGhlYWRlcnNWYWwpIHtcclxuICAgICAgICBlZGl0b3IuZ2V0U2Vzc2lvbigpLmluc2VydCgwLCBoZWFkZXJzVmFsKTtcclxuICAgIH1cclxuICAgIGVkaXRvci5tb3ZlQ3Vyc29yVG8oMSwgMCk7XHJcbn1cclxuZnVuY3Rpb24gY29tbW9uQWNlU2V0dXAoZWRpdG9yKSB7XHJcbiAgICBlZGl0b3Iuc2V0U2hvd1ByaW50TWFyZ2luKGZhbHNlKTtcclxuICAgIGVkaXRvci4kYmxvY2tTY3JvbGxpbmcgPSBJbmZpbml0eTtcclxuICAgIGVkaXRvci5yZW5kZXJlci5zZXRPcHRpb24oJ3Nob3dMaW5lTnVtYmVycycsIGZhbHNlKTtcclxuICAgIGVkaXRvci5jb21tYW5kcy5iaW5kS2V5KFwiVGFiXCIsIG51bGwpO1xyXG59XHJcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWFwaS1leHBsb3Jlci1qc2VkaXRvci5qcy5tYXAiLCJmdW5jdGlvbiBlbmRzV2l0aFNsYXNoKHNlcnZpY2VUZXh0KSB7XHJcbiAgICByZXR1cm4gc2VydmljZVRleHQuY2hhckF0KHNlcnZpY2VUZXh0Lmxlbmd0aCAtIDEpID09ICcvJztcclxufVxyXG5mdW5jdGlvbiBtc0dyYXBoTGlua1Jlc29sdXRpb24oJHNjb3BlLCBib2R5LCBhcmdzLCBzZXJ2aWNlKSB7XHJcbiAgICBpZiAoYXJncy5pbmRleE9mKFwiaHR0cHM6Ly9cIikgPT0gLTEpIHtcclxuICAgICAgICBpZiAoc2VydmljZS50ZXh0LmluZGV4T2YoYXJncy5zdWJzdHIoMSkpICE9IC0xKSB7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKHNlcnZpY2UudGV4dC5pbmRleE9mKFwiL21lXCIpICE9IC0xICYmIHNlcnZpY2UudGV4dC5pbmRleE9mKFwiL21lL1wiKSA9PSAtMSAmJiBzZXJ2aWNlLnRleHQuaW5kZXhPZihcIi9tZW1iZXJPZlwiKSA9PSAtMSkge1xyXG4gICAgICAgICAgICBzZXJ2aWNlLnRleHQgPSBzZXJ2aWNlLnRleHQucmVwbGFjZShcIi9tZVwiLCBcIlwiKSArIFwiL3VzZXJzL1wiICsgYXJncy5zdWJzdHIoMSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB2YXIgaW5kZXggPSBib2R5LmluZGV4T2YoYXJncy5zdWJzdHIoMSkpO1xyXG4gICAgICAgICAgICB2YXIgdHlwZUluZGV4ID0gYm9keS5sYXN0SW5kZXhPZignQG9kYXRhLnR5cGUnLCBpbmRleCk7XHJcbiAgICAgICAgICAgIGlmICh0eXBlSW5kZXggIT0gLTEpIHtcclxuICAgICAgICAgICAgICAgIHZhciB0eXBlSW5kZXhFbmQgPSBib2R5LmluZGV4T2YoXCJcXG5cIiwgdHlwZUluZGV4KTtcclxuICAgICAgICAgICAgICAgIHZhciB0eXBlID0gYm9keS5zdWJzdHIodHlwZUluZGV4LCB0eXBlSW5kZXhFbmQgLSB0eXBlSW5kZXgpO1xyXG4gICAgICAgICAgICAgICAgdHlwZSA9IHR5cGUucmVwbGFjZShcIkBvZGF0YS50eXBlXFxcIjogXFxcIiNtaWNyb3NvZnQuZ3JhcGguXCIsIFwiXCIpO1xyXG4gICAgICAgICAgICAgICAgdHlwZSA9IHR5cGUucmVwbGFjZShcIlxcXCJcIiwgXCJcIikucmVwbGFjZShcIixcIiwgXCJcIik7XHJcbiAgICAgICAgICAgICAgICBzZXJ2aWNlLnRleHQgPSBcImh0dHBzOi8vZ3JhcGgubWljcm9zb2Z0LmNvbS92MS4wL1wiICsgdHlwZSArIFwicy9cIiArIGFyZ3Muc3Vic3RyKDEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgaWYgKHNlcnZpY2UudGV4dC5pbmRleE9mKFwiP1wiKSAhPSAtMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHNlcnZpY2UudGV4dCA9IHNlcnZpY2UudGV4dC5zdWJzdHIoMCwgc2VydmljZS50ZXh0LmluZGV4T2YoXCI/XCIpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHZhciBsaW5rVXJsID0gW3NlcnZpY2UudGV4dCwgYXJncy5zdWJzdHIoMSldO1xyXG4gICAgICAgICAgICAgICAgaWYgKGVuZHNXaXRoU2xhc2goc2VydmljZS50ZXh0KSlcclxuICAgICAgICAgICAgICAgICAgICBzZXJ2aWNlLnRleHQgPSBsaW5rVXJsLmpvaW4oXCJcIik7XHJcbiAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgc2VydmljZS50ZXh0ID0gbGlua1VybC5qb2luKFwiL1wiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgIHNlcnZpY2UudGV4dCA9IGFyZ3MucmVwbGFjZShcIlxcXCJcIiwgXCJcIik7XHJcbiAgICB9XHJcbiAgICBpZiAoc2VydmljZS50ZXh0ICYmIGVuZHNXaXRoU2xhc2goc2VydmljZS50ZXh0KSkge1xyXG4gICAgICAgIHNlcnZpY2UudGV4dCArPSAnLyc7XHJcbiAgICB9XHJcbiAgICAkc2NvcGUuJGJyb2FkY2FzdCgndXBkYXRlVXJsRnJvbVNlcnZpY2VUZXh0Jyk7XHJcbiAgICAkc2NvcGUuc3VibWl0KCk7XHJcbn1cclxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YXBpLWV4cGxvcmVyLW1zZ3JhcGguanMubWFwIiwiaGVsbG8uaW5pdCh7XHJcbiAgICBtc2Z0OiB7XHJcbiAgICAgICAgb2F1dGg6IHtcclxuICAgICAgICAgICAgdmVyc2lvbjogMixcclxuICAgICAgICAgICAgYXV0aDogJ2h0dHBzOi8vbG9naW4ubWljcm9zb2Z0b25saW5lLmNvbS9vcmdhbml6YXRpb25zL29hdXRoMi92Mi4wL2F1dGhvcml6ZScsXHJcbiAgICAgICAgICAgIGdyYW50OiAnaHR0cHM6Ly9sb2dpbi5taWNyb3NvZnRvbmxpbmUuY29tL29yZ2FuaXphdGlvbnMvb2F1dGgyL3YyLjAvdG9rZW4nXHJcbiAgICAgICAgfSxcclxuICAgICAgICBzY29wZV9kZWxpbTogJyAnLFxyXG4gICAgICAgIGZvcm06IGZhbHNlXHJcbiAgICB9LCBtc2Z0X2FkbWluX2NvbnNlbnQ6IHtcclxuICAgICAgICBvYXV0aDoge1xyXG4gICAgICAgICAgICB2ZXJzaW9uOiAyLFxyXG4gICAgICAgICAgICBhdXRoOiAnaHR0cHM6Ly9sb2dpbi5taWNyb3NvZnRvbmxpbmUuY29tL2NvbW1vbi9hZG1pbmNvbnNlbnQnLFxyXG4gICAgICAgICAgICBncmFudDogJ2h0dHBzOi8vbG9naW4ubWljcm9zb2Z0b25saW5lLmNvbS9jb21tb24vb2F1dGgyL3YyLjAvdG9rZW4nXHJcbiAgICAgICAgfSxcclxuICAgICAgICBzY29wZV9kZWxpbTogJyAnLFxyXG4gICAgICAgIGZvcm06IGZhbHNlXHJcbiAgICB9LCBtc2Z0X3Rva2VuX3JlZnJlc2g6IHtcclxuICAgICAgICBvYXV0aDoge1xyXG4gICAgICAgICAgICB2ZXJzaW9uOiAyLFxyXG4gICAgICAgICAgICBhdXRoOiAnaHR0cHM6Ly9sb2dpbi5taWNyb3NvZnRvbmxpbmUuY29tL2NvbW1vbi9vYXV0aDIvdjIuMC9hdXRob3JpemUnLFxyXG4gICAgICAgICAgICBncmFudDogJ2h0dHBzOi8vbG9naW4ubWljcm9zb2Z0b25saW5lLmNvbS9jb21tb24vb2F1dGgyL3YyLjAvdG9rZW4nXHJcbiAgICAgICAgfSxcclxuICAgICAgICBzY29wZV9kZWxpbTogJyAnLFxyXG4gICAgICAgIGZvcm06IGZhbHNlXHJcbiAgICB9XHJcbn0pO1xyXG4vLyMgc291cmNlTWFwcGluZ1VSTD1hdXRoLmpzLm1hcCIsImZ1bmN0aW9uIGNyZWF0ZVNoYXJlTGluayhmdWxsUmVxdWVzdFVybCwgYWN0aW9uLCB2ZXJzaW9uKSB7XHJcbiAgICByZXR1cm4gd2luZG93LmxvY2F0aW9uLm9yaWdpbiArIHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZSArIFwiP3JlcXVlc3Q9XCIgKyBleHRyYWN0R3JhcGhFbmRwb2ludChmdWxsUmVxdWVzdFVybCkgKyBcIiZtZXRob2Q9XCIgKyBhY3Rpb24gKyBcIiZ2ZXJzaW9uPVwiICsgdmVyc2lvbjtcclxufVxyXG5mdW5jdGlvbiBleHRyYWN0R3JhcGhFbmRwb2ludChmdWxsUmVxdWVzdFVybCkge1xyXG4gICAgdmFyIHJlcXVlc3RVcmwgPSBmdWxsUmVxdWVzdFVybC5zcGxpdCgnLmNvbScpO1xyXG4gICAgcmVxdWVzdFVybC5zaGlmdCgpO1xyXG4gICAgdmFyIHJlcXVlc3RVcmxDb21wb25lbnRzID0gcmVxdWVzdFVybFswXS5zcGxpdCgnLycpO1xyXG4gICAgcmVxdWVzdFVybENvbXBvbmVudHMuc2hpZnQoKTtcclxuICAgIHJlcXVlc3RVcmxDb21wb25lbnRzLnNoaWZ0KCk7XHJcbiAgICByZXR1cm4gKHJlcXVlc3RVcmxDb21wb25lbnRzLmpvaW4oJy8nKSk7XHJcbn1cclxuZnVuY3Rpb24gaXNQb3N0T3JQYXRjaChvcHRpb24pIHtcclxuICAgIHJldHVybiBvcHRpb24gPT0gXCJQT1NUXCIgfHwgb3B0aW9uID09IFwiUEFUQ0hcIjtcclxufVxyXG5mdW5jdGlvbiBTaGFyZURpYWxvZ0NvbnRyb2xsZXIoJHNjb3BlLCAkbWREaWFsb2csIGFwaVNlcnZpY2UsICRzY2UsIGhlYWRlcnMsIGJvZHkpIHtcclxuICAgIHZhciBfYXBpU2VydmljZSA9IGFwaVNlcnZpY2U7XHJcbiAgICAkc2NvcGUuaGlkZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAkbWREaWFsb2cuaGlkZSgpO1xyXG4gICAgfTtcclxuICAgICRzY29wZS5jYW5jZWwgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgJG1kRGlhbG9nLmNhbmNlbCgpO1xyXG4gICAgfTtcclxuICAgICRzY29wZS5nZXRTaGFyZUxpbmsgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIHJlcXVlc3RVcmwgPSAkc2NvcGUuZ2V0U2VhcmNoVGV4dCgpO1xyXG4gICAgICAgIHJldHVybiBjcmVhdGVTaGFyZUxpbmsocmVxdWVzdFVybCwgX2FwaVNlcnZpY2Uuc2VsZWN0ZWRPcHRpb24sIF9hcGlTZXJ2aWNlLnNlbGVjdGVkVmVyc2lvbik7XHJcbiAgICB9O1xyXG4gICAgJHNjb3BlLmdlbmVyYXRlU3VwZXJBZ2VudENvZGUgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIHJlcXVlc3RVcmwgPSAkc2NvcGUuZ2V0U2VhcmNoVGV4dCgpO1xyXG4gICAgICAgIHZhciBmdWxsR3JhcGhVcmwgPSBcImh0dHBzOi8vZ3JhcGgubWljcm9zb2Z0LmNvbS9cIiArIF9hcGlTZXJ2aWNlLnNlbGVjdGVkVmVyc2lvbiArIFwiL1wiICsgZXh0cmFjdEdyYXBoRW5kcG9pbnQocmVxdWVzdFVybCk7XHJcbiAgICAgICAgdmFyIHRhYiA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIFwiPHNwYW4gc3R5bGU9J3BhZGRpbmctbGVmdDoxNXB4Jz48L3NwYW4+XCI7XHJcbiAgICAgICAgfTtcclxuICAgICAgICB2YXIgbGluZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIFwiPGJyPlwiO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgdmFyIHN0ciA9IFwicmVxdWVzdFwiO1xyXG4gICAgICAgIHN0ciArPSBsaW5lKCkgKyB0YWIoKSArIFwiLlwiICsgX2FwaVNlcnZpY2Uuc2VsZWN0ZWRPcHRpb24udG9Mb2NhbGVMb3dlckNhc2UoKSArIFwiKFxcXCJcIiArIGZ1bGxHcmFwaFVybCArIFwiXFxcIilcIjtcclxuICAgICAgICBpZiAoT2JqZWN0LmtleXMoaGVhZGVycykubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICBzdHIgKz0gbGluZSgpICsgdGFiKCkgKyBcIi5zZXQoXCIgKyBKU09OLnN0cmluZ2lmeShoZWFkZXJzKSArIFwiKVwiO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoaXNQb3N0T3JQYXRjaChfYXBpU2VydmljZS5zZWxlY3RlZE9wdGlvbikpIHtcclxuICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgIHZhciBib2R5T2JqID0gSlNPTi5wYXJzZShib2R5KTtcclxuICAgICAgICAgICAgICAgIGlmIChib2R5T2JqKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3RyICs9IGxpbmUoKSArIHRhYigpICsgXCIuc2VuZChcIiArIEpTT04uc3RyaW5naWZ5KGJvZHlPYmopICsgXCIpXCI7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBzdHIgKz0gbGluZSgpICsgdGFiKCkgKyBcIi5lbmQoZnVuY3Rpb24oZXJyLCByZXMpIHtcIjtcclxuICAgICAgICBzdHIgKz0gbGluZSgpICsgdGFiKCkgKyB0YWIoKSArIFwiY29uc29sZS5sb2cocmVzKTtcIjtcclxuICAgICAgICBzdHIgKz0gbGluZSgpICsgdGFiKCkgKyBcIn0pO1wiO1xyXG4gICAgICAgIHJldHVybiAkc2NlLnRydXN0QXNIdG1sKHN0cik7XHJcbiAgICB9O1xyXG59XHJcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXNoYXJlLWRpYWxvZy5qcy5tYXAiLCJmdW5jdGlvbiBpbml0aWFsaXplSnNvblZpZXdlcigkc2NvcGUsIGFwaVNlcnZpY2UpIHtcclxuICAgICQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIganNvblZpZXdlciA9IGdldEpzb25WaWV3ZXIoKTtcclxuICAgICAgICBjb21tb25BY2VTZXR1cChqc29uVmlld2VyKTtcclxuICAgICAgICBqc29uVmlld2VyLmdldFNlc3Npb24oKS5zZXRNb2RlKFwiYWNlL21vZGUvamF2YXNjcmlwdFwiKTtcclxuICAgICAgICBqc29uVmlld2VyLnNldE9wdGlvbnMoe1xyXG4gICAgICAgICAgICByZWFkT25seTogdHJ1ZSxcclxuICAgICAgICAgICAgaGlnaGxpZ2h0QWN0aXZlTGluZTogZmFsc2UsXHJcbiAgICAgICAgICAgIGhpZ2hsaWdodEd1dHRlckxpbmU6IGZhbHNlLFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGpzb25WaWV3ZXIuZ2V0U2Vzc2lvbigpLnNldFVzZVdvcmtlcihmYWxzZSk7XHJcbiAgICAgICAganNvblZpZXdlci5yZW5kZXJlci4kY3Vyc29yTGF5ZXIuZWxlbWVudC5zdHlsZS5vcGFjaXR5ID0gMDtcclxuICAgICAgICBkZWZpbmUoXCJob3ZlcmxpbmtcIiwgW1wicmVxdWlyZVwiLCBcImV4cG9ydHNcIl0sIGZ1bmN0aW9uIChyZXF1aXJlLCBleHBvcnRzLCBtb2R1bGUpIHtcclxuICAgICAgICAgICAgXCJ1c2Ugc3RyaWN0XCI7XHJcbiAgICAgICAgICAgIHZhciBvb3AgPSByZXF1aXJlKFwiYWNlL2xpYi9vb3BcIik7XHJcbiAgICAgICAgICAgIHZhciBldmVudCA9IHJlcXVpcmUoXCJhY2UvbGliL2V2ZW50XCIpO1xyXG4gICAgICAgICAgICB2YXIgUmFuZ2UgPSByZXF1aXJlKFwiYWNlL3JhbmdlXCIpLlJhbmdlO1xyXG4gICAgICAgICAgICB2YXIgRXZlbnRFbWl0dGVyID0gcmVxdWlyZShcImFjZS9saWIvZXZlbnRfZW1pdHRlclwiKS5FdmVudEVtaXR0ZXI7XHJcbiAgICAgICAgICAgIHZhciBIb3ZlckxpbmsgPSBmdW5jdGlvbiAoanNvblZpZXdlcikge1xyXG4gICAgICAgICAgICAgICAgaWYgKGpzb25WaWV3ZXIuaG92ZXJMaW5rKVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIGpzb25WaWV3ZXIuaG92ZXJMaW5rID0gdGhpcztcclxuICAgICAgICAgICAgICAgIHRoaXMuanNvblZpZXdlciA9IGpzb25WaWV3ZXI7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZSA9IHRoaXMudXBkYXRlLmJpbmQodGhpcyk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm9uTW91c2VNb3ZlID0gdGhpcy5vbk1vdXNlTW92ZS5iaW5kKHRoaXMpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5vbk1vdXNlT3V0ID0gdGhpcy5vbk1vdXNlT3V0LmJpbmQodGhpcyk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm9uQ2xpY2sgPSB0aGlzLm9uQ2xpY2suYmluZCh0aGlzKTtcclxuICAgICAgICAgICAgICAgIGV2ZW50LmFkZExpc3RlbmVyKGpzb25WaWV3ZXIucmVuZGVyZXIuc2Nyb2xsZXIsIFwibW91c2Vtb3ZlXCIsIHRoaXMub25Nb3VzZU1vdmUpO1xyXG4gICAgICAgICAgICAgICAgZXZlbnQuYWRkTGlzdGVuZXIoanNvblZpZXdlci5yZW5kZXJlci5jb250ZW50LCBcIm1vdXNlb3V0XCIsIHRoaXMub25Nb3VzZU91dCk7XHJcbiAgICAgICAgICAgICAgICBldmVudC5hZGRMaXN0ZW5lcihqc29uVmlld2VyLnJlbmRlcmVyLmNvbnRlbnQsIFwiY2xpY2tcIiwgdGhpcy5vbkNsaWNrKTtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIG9vcC5pbXBsZW1lbnQodGhpcywgRXZlbnRFbWl0dGVyKTtcclxuICAgICAgICAgICAgICAgIHRoaXMudG9rZW4gPSB7fTtcclxuICAgICAgICAgICAgICAgIHRoaXMucmFuZ2UgPSBuZXcgUmFuZ2UoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuJHRpbWVyID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICB2YXIganNvblZpZXdlciA9IHRoaXMuanNvblZpZXdlcjtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgcmVuZGVyZXIgPSBqc29uVmlld2VyLnJlbmRlcmVyO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBjYW52YXNQb3MgPSByZW5kZXJlci5zY3JvbGxlci5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgb2Zmc2V0ID0gKHRoaXMueCArIHJlbmRlcmVyLnNjcm9sbExlZnQgLSBjYW52YXNQb3MubGVmdCAtIHJlbmRlcmVyLiRwYWRkaW5nKSAvIHJlbmRlcmVyLmNoYXJhY3RlcldpZHRoO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciByb3cgPSBNYXRoLmZsb29yKCh0aGlzLnkgKyByZW5kZXJlci5zY3JvbGxUb3AgLSBjYW52YXNQb3MudG9wKSAvIHJlbmRlcmVyLmxpbmVIZWlnaHQpO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBjb2wgPSBNYXRoLnJvdW5kKG9mZnNldCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHNjcmVlblBvcyA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcm93OiByb3csXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbHVtbjogY29sLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzaWRlOiBvZmZzZXQgLSBjb2wgPiAwID8gMSA6IC0xXHJcbiAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgc2Vzc2lvbiA9IGpzb25WaWV3ZXIuc2Vzc2lvbjtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgZG9jUG9zID0gc2Vzc2lvbi5zY3JlZW5Ub0RvY3VtZW50UG9zaXRpb24oc2NyZWVuUG9zLnJvdywgc2NyZWVuUG9zLmNvbHVtbik7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHNlbGVjdGlvblJhbmdlID0ganNvblZpZXdlci5zZWxlY3Rpb24uZ2V0UmFuZ2UoKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIXNlbGVjdGlvblJhbmdlLmlzRW1wdHkoKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoc2VsZWN0aW9uUmFuZ2Uuc3RhcnQucm93IDw9IHJvdyAmJiBzZWxlY3Rpb25SYW5nZS5lbmQucm93ID49IHJvdylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmNsZWFyKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHZhciBsaW5lID0ganNvblZpZXdlci5zZXNzaW9uLmdldExpbmUoZG9jUG9zLnJvdyk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRvY1Bvcy5jb2x1bW4gPT0gbGluZS5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGNsaXBwZWRQb3MgPSBqc29uVmlld2VyLnNlc3Npb24uZG9jdW1lbnRUb1NjcmVlblBvc2l0aW9uKGRvY1Bvcy5yb3csIGRvY1Bvcy5jb2x1bW4pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY2xpcHBlZFBvcy5jb2x1bW4gIT0gc2NyZWVuUG9zLmNvbHVtbikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuY2xlYXIoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB2YXIgdG9rZW4gPSB0aGlzLmZpbmRMaW5rKGRvY1Bvcy5yb3csIGRvY1Bvcy5jb2x1bW4pO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubGluayA9IHRva2VuO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghdG9rZW4pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuY2xlYXIoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pc09wZW4gPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIGpzb25WaWV3ZXIucmVuZGVyZXIuc2V0Q3Vyc29yU3R5bGUoXCJwb2ludGVyXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHNlc3Npb24ucmVtb3ZlTWFya2VyKHRoaXMubWFya2VyKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJhbmdlID0gbmV3IFJhbmdlKHRva2VuLnJvdywgdG9rZW4uc3RhcnQsIHRva2VuLnJvdywgdG9rZW4uc3RhcnQgKyB0b2tlbi52YWx1ZS5sZW5ndGgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubWFya2VyID0gc2Vzc2lvbi5hZGRNYXJrZXIodGhpcy5yYW5nZSwgXCJhY2VfbGlua19tYXJrZXJcIiwgXCJ0ZXh0XCIsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2xlYXIgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuaXNPcGVuKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuanNvblZpZXdlci5zZXNzaW9uLnJlbW92ZU1hcmtlcih0aGlzLm1hcmtlcik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuanNvblZpZXdlci5yZW5kZXJlci5zZXRDdXJzb3JTdHlsZShcIlwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5pc09wZW4gPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgdGhpcy5nZXRNYXRjaEFyb3VuZCA9IGZ1bmN0aW9uIChyZWdFeHAsIHN0cmluZywgY29sKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIG1hdGNoO1xyXG4gICAgICAgICAgICAgICAgICAgIHJlZ0V4cC5sYXN0SW5kZXggPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgIHN0cmluZy5yZXBsYWNlKHJlZ0V4cCwgZnVuY3Rpb24gKHN0cikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgb2Zmc2V0ID0gYXJndW1lbnRzW2FyZ3VtZW50cy5sZW5ndGggLSAyXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGxlbmd0aCA9IHN0ci5sZW5ndGg7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvZmZzZXQgPD0gY29sICYmIG9mZnNldCArIGxlbmd0aCA+PSBjb2wpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXRjaCA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGFydDogb2Zmc2V0LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBzdHJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG1hdGNoO1xyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgIHRoaXMub25DbGljayA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIganNvblZpZXdlciA9IHRoaXMuanNvblZpZXdlcjtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgcmVuZGVyZXIgPSBqc29uVmlld2VyLnJlbmRlcmVyO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBjYW52YXNQb3MgPSByZW5kZXJlci5zY3JvbGxlci5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgb2Zmc2V0ID0gKHRoaXMueCArIHJlbmRlcmVyLnNjcm9sbExlZnQgLSBjYW52YXNQb3MubGVmdCAtIHJlbmRlcmVyLiRwYWRkaW5nKSAvIHJlbmRlcmVyLmNoYXJhY3RlcldpZHRoO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciByb3cgPSBNYXRoLmZsb29yKCh0aGlzLnkgKyByZW5kZXJlci5zY3JvbGxUb3AgLSBjYW52YXNQb3MudG9wKSAvIHJlbmRlcmVyLmxpbmVIZWlnaHQpO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBjb2wgPSBNYXRoLnJvdW5kKG9mZnNldCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMubGluaykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocm93ICE9IHRoaXMubGluay5yb3cgfHwgIShjb2wgPiB0aGlzLmxpbmsuc3RhcnQgJiYgY29sIDwgdGhpcy5saW5rLnN0YXJ0ICsgdGhpcy5saW5rLnZhbHVlLmxlbmd0aCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxpbmsuanNvblZpZXdlciA9IHRoaXMuanNvblZpZXdlcjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fc2lnbmFsKFwib3BlblwiLCB0aGlzLmxpbmspO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNsZWFyKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZmluZExpbmsgPSBmdW5jdGlvbiAocm93LCBjb2x1bW4pIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIganNvblZpZXdlciA9IHRoaXMuanNvblZpZXdlcjtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgc2Vzc2lvbiA9IGpzb25WaWV3ZXIuc2Vzc2lvbjtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgbGluZSA9IHNlc3Npb24uZ2V0TGluZShyb3cpO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBtYXRjaCA9IHRoaXMuZ2V0TWF0Y2hBcm91bmQoL2h0dHBzPzpcXC9cXC9bXlxcc1wiXSsvZywgbGluZSwgY29sdW1uKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIW1hdGNoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBtYXRjaCA9IHRoaXMuZ2V0TWF0Y2hBcm91bmQoL1wiaWRcIjogXCJbXlxcc1wiJ10rL2csIGxpbmUsIGNvbHVtbik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghbWF0Y2gpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1hdGNoID0gdGhpcy5nZXRNYXRjaEFyb3VuZCgvXCJbXlxcc1wiJ10rL2csIGxpbmUsIGNvbHVtbik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghbWF0Y2gpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIG1hdGNoLnJvdyA9IHJvdztcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbWF0Y2g7XHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgdGhpcy5vbk1vdXNlTW92ZSA9IGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuanNvblZpZXdlci4kbW91c2VIYW5kbGVyLmlzTW91c2VQcmVzc2VkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghdGhpcy5qc29uVmlld2VyLnNlbGVjdGlvbi5pc0VtcHR5KCkpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNsZWFyKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy54ID0gZS5jbGllbnRYO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMueSA9IGUuY2xpZW50WTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZSgpO1xyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgIHRoaXMub25Nb3VzZU91dCA9IGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jbGVhcigpO1xyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZGVzdHJveSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm9uTW91c2VPdXQoKTtcclxuICAgICAgICAgICAgICAgICAgICBldmVudC5yZW1vdmVMaXN0ZW5lcih0aGlzLmpzb25WaWV3ZXIucmVuZGVyZXIuc2Nyb2xsZXIsIFwibW91c2Vtb3ZlXCIsIHRoaXMub25Nb3VzZU1vdmUpO1xyXG4gICAgICAgICAgICAgICAgICAgIGV2ZW50LnJlbW92ZUxpc3RlbmVyKHRoaXMuanNvblZpZXdlci5yZW5kZXJlci5jb250ZW50LCBcIm1vdXNlb3V0XCIsIHRoaXMub25Nb3VzZU91dCk7XHJcbiAgICAgICAgICAgICAgICAgICAgZGVsZXRlIHRoaXMuanNvblZpZXdlci5ob3Zlckxpbms7XHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB9KS5jYWxsKEhvdmVyTGluay5wcm90b3R5cGUpO1xyXG4gICAgICAgICAgICBleHBvcnRzLkhvdmVyTGluayA9IEhvdmVyTGluaztcclxuICAgICAgICB9KTtcclxuICAgICAgICByZXF1aXJlKFsnaG92ZXJsaW5rJ10sIGZ1bmN0aW9uIChob3ZlcmxpbmspIHtcclxuICAgICAgICAgICAgdmFyIEhvdmVyTGluayA9IHJlcXVpcmUoXCJob3ZlcmxpbmtcIikuSG92ZXJMaW5rO1xyXG4gICAgICAgICAgICBqc29uVmlld2VyLmhvdmVyTGluayA9IG5ldyBIb3ZlckxpbmsoanNvblZpZXdlcik7XHJcbiAgICAgICAgICAgIGpzb25WaWV3ZXIuaG92ZXJMaW5rLm9uKFwib3BlblwiLCBmdW5jdGlvbiAoeCkge1xyXG4gICAgICAgICAgICAgICAgcnVuKCRzY29wZSwgeC52YWx1ZSwgYXBpU2VydmljZSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcbn1cclxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YXBpLWV4cGxvcmVyLWpzdmlld2VyLmpzLm1hcCIsInZhciByZXF1ZXN0SGlzdG9yeSA9IFtdO1xyXG52YXIgTG9jYWxTdG9yYWdlS2V5R3JhcGhSZXF1ZXN0SGlzdG9yeSA9IFwiR1JBUEhfUkVRVUVTVF9ISVNUT1JZXCI7XHJcbmZ1bmN0aW9uIHNhdmVIaXN0b3J5VG9Mb2NhbFN0b3JhZ2UoKSB7XHJcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShMb2NhbFN0b3JhZ2VLZXlHcmFwaFJlcXVlc3RIaXN0b3J5LCBKU09OLnN0cmluZ2lmeShyZXF1ZXN0SGlzdG9yeSkpO1xyXG59XHJcbmZ1bmN0aW9uIGxvYWRIaXN0b3J5RnJvbUxvY2FsU3RvcmFnZSgpIHtcclxuICAgIHZhciBwb3NzaWJsZUhpc3RvcnkgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShMb2NhbFN0b3JhZ2VLZXlHcmFwaFJlcXVlc3RIaXN0b3J5KTtcclxuICAgIGlmIChwb3NzaWJsZUhpc3RvcnkgPT0gbnVsbCkge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIHJlcXVlc3RIaXN0b3J5ID0gSlNPTi5wYXJzZShwb3NzaWJsZUhpc3RvcnkpO1xyXG59XHJcbmZ1bmN0aW9uIHNhdmVIaXN0b3J5T2JqZWN0KGhpc3RvcnlPYmplY3QsIHN0YXR1c0NvZGUpIHtcclxuICAgIGhpc3RvcnlPYmplY3Quc3VjY2Vzc2Z1bCA9IHN0YXR1c0NvZGUgPj0gMjAwICYmIHN0YXR1c0NvZGUgPCAzMDA7XHJcbiAgICBoaXN0b3J5T2JqZWN0LnN0YXR1c0NvZGUgPSBzdGF0dXNDb2RlO1xyXG4gICAgaGlzdG9yeU9iamVjdC5yZXF1ZXN0SWQgPSBNYXRoLnJhbmRvbSgpLnRvU3RyaW5nKDM2KS5yZXBsYWNlKC9bXmEtel0rL2csICcnKS5zdWJzdHIoMCwgMTApO1xyXG4gICAgcmVxdWVzdEhpc3Rvcnkuc3BsaWNlKDAsIDAsIGhpc3RvcnlPYmplY3QpO1xyXG4gICAgc2F2ZUhpc3RvcnlUb0xvY2FsU3RvcmFnZSgpO1xyXG59XHJcbmZ1bmN0aW9uIGZldGNoUmVxdWVzdEhpc3RvcnkoKSB7XHJcbiAgICByZXR1cm4gcmVxdWVzdEhpc3Rvcnk7XHJcbn1cclxubG9hZEhpc3RvcnlGcm9tTG9jYWxTdG9yYWdlKCk7XHJcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWhpc3RvcnkuanMubWFwIiwidmFyIGxvY19zdHJpbmdzID0ge307XHJcbmxvY19zdHJpbmdzWydmci1GUiddID0geyBcIlRvIHRyeSB0aGUgZXhwbG9yZXIsIHBsZWFzZSBcIjogXCJQb3VyIGVzc2F5ZXIgbOKAmWFmZmljaGV1ciwgdmV1aWxsZXogXCIsIFwic2lnbiBpblwiOiBcInNlIGNvbm5lY3RlclwiLCBcIiB3aXRoIHlvdXIgd29yayBvciBzY2hvb2wgYWNjb3VudCBmcm9tIE1pY3Jvc29mdC5cIjogXCIgYXZlYyB2b3RyZSBjb21wdGUgc2NvbGFpcmUgb3UgcHJvZmVzc2lvbm5lbCBkZSBNaWNyb3NvZnQuXCIsIFwiU3VibWl0XCI6IFwiRW52b3llclwiLCBcIlVzaW5nIGRlbW8gdGVuYW50XCI6IFwiw4AgbOKAmWFpZGUgZHUgY2xpZW50IGRlIGTDqW1vbnN0cmF0aW9uXCIsIFwic2lnbiBvdXRcIjogXCJzZSBkw6ljb25uZWN0ZXJcIiwgXCJIaXN0b3J5XCI6IFwiSGlzdG9yaXF1ZVwiLCBcIk1ldGhvZFwiOiBcIk3DqXRob2RlXCIsIFwiUXVlcnlcIjogXCJSZXF1w6p0ZVwiLCBcIlN0YXR1cyBDb2RlXCI6IFwiQ29kZSBkJ8OpdGF0XCIsIFwiRHVyYXRpb25cIjogXCJEdXLDqWVcIiwgXCJHb1wiOiBcIlJlY2hlcmNoZXJcIiwgXCJZRVNcIjogXCJPVUlcIiwgXCJOT1wiOiBcIk5PTlwiLCBcInJlcXVlc3QgaGVhZGVyXCI6IFwiZW4tdMOqdGUgZGUgbGEgZGVtYW5kZVwiLCBcInJlcXVlc3QgYm9keVwiOiBcImNvcnBzIGRlIGxhIGRlbWFuZGVcIiwgXCJyZXNwb25zZVwiOiBcInLDqXBvbnNlXCIgfTtcclxubG9jX3N0cmluZ3NbJ2VzLUVTJ10gPSB7IFwiVG8gdHJ5IHRoZSBleHBsb3JlciwgcGxlYXNlIFwiOiBcIlBhcmEgdXRpbGl6YXIgZWwgcHJvYmFkb3IsIFwiLCBcInNpZ24gaW5cIjogXCJpbmljaWFyIHNlc2nDs25cIiwgXCIgd2l0aCB5b3VyIHdvcmsgb3Igc2Nob29sIGFjY291bnQgZnJvbSBNaWNyb3NvZnQuXCI6IFwiIGNvbiBzdSBjdWVudGEgcHJvZmVzaW9uYWwgbyBlZHVjYXRpdmEgZGUgTWljcm9zb2Z0LlwiLCBcIlN1Ym1pdFwiOiBcIkVudmlhclwiLCBcIlVzaW5nIGRlbW8gdGVuYW50XCI6IFwiVXNvIGRlIGlucXVpbGlub3MgZGUgZGVtb3N0cmFjacOzblwiLCBcInNpZ24gb3V0XCI6IFwiY2VycmFyIHNlc2nDs25cIiwgXCJIaXN0b3J5XCI6IFwiSGlzdG9yaWFsXCIsIFwiTWV0aG9kXCI6IFwiTcOpdG9kb1wiLCBcIlF1ZXJ5XCI6IFwiQ29uc3VsdGFcIiwgXCJTdGF0dXMgQ29kZVwiOiBcIkPDs2RpZ28gZGUgZXN0YWRvXCIsIFwiRHVyYXRpb25cIjogXCJEdXJhY2nDs25cIiwgXCJHb1wiOiBcIklyXCIsIFwiWUVTXCI6IFwiU8ONXCIsIFwiTk9cIjogXCJOT1wiLCBcInJlcXVlc3QgaGVhZGVyXCI6IFwiZW5jYWJlemFkbyBkZSBzb2xpY2l0dWRcIiwgXCJyZXF1ZXN0IGJvZHlcIjogXCJjdWVycG8gZGUgc29saWNpdHVkXCIsIFwicmVzcG9uc2VcIjogXCJyZXNwdWVzdGFcIiB9O1xyXG5sb2Nfc3RyaW5nc1snZW4tVVMnXSA9IHsgXCJUbyB0cnkgdGhlIGV4cGxvcmVyLCBwbGVhc2UgXCI6IFwiVG8gdHJ5IHRoZSBleHBsb3JlciwgcGxlYXNlIFwiLCBcInNpZ24gaW5cIjogXCJzaWduIGluXCIsIFwiIHdpdGggeW91ciB3b3JrIG9yIHNjaG9vbCBhY2NvdW50IGZyb20gTWljcm9zb2Z0LlwiOiBcIiB3aXRoIHlvdXIgd29yayBvciBzY2hvb2wgYWNjb3VudCBmcm9tIE1pY3Jvc29mdC5cIiwgXCJTdWJtaXRcIjogXCJTdWJtaXRcIiwgXCJVc2luZyBkZW1vIHRlbmFudFwiOiBcIlVzaW5nIGRlbW8gdGVuYW50XCIsIFwic2lnbiBvdXRcIjogXCJzaWduIG91dFwiLCBcIkhpc3RvcnlcIjogXCJIaXN0b3J5XCIsIFwiTWV0aG9kXCI6IFwiTWV0aG9kXCIsIFwiUXVlcnlcIjogXCJRdWVyeVwiLCBcIlN0YXR1cyBDb2RlXCI6IFwiU3RhdHVzIENvZGVcIiwgXCJEdXJhdGlvblwiOiBcIkR1cmF0aW9uXCIsIFwiR29cIjogXCJHb1wiLCBcIllFU1wiOiBcIllFU1wiLCBcIk5PXCI6IFwiTk9cIiwgXCJyZXF1ZXN0IGhlYWRlclwiOiBcInJlcXVlc3QgaGVhZGVyXCIsIFwicmVxdWVzdCBib2R5XCI6IFwicmVxdWVzdCBib2R5XCIsIFwicmVzcG9uc2VcIjogXCJyZXNwb25zZVwiLCBcImxvZ2luX3RvX3NlbmRfcmVxdWVzdHNcIjogXCJMb2dpbiB0byBjaGFuZ2UgdGhlIHJlcXVlc3QgdHlwZVwiLCBcIlNoYXJlUXVlcnlcIjogXCJTaGFyZSBRdWVyeVwiIH07XHJcbmxvY19zdHJpbmdzWydkZS1ERSddID0geyBcIlRvIHRyeSB0aGUgZXhwbG9yZXIsIHBsZWFzZSBcIjogXCJVbSBkZW4gVGVzdGVyIGF1c3p1cHJvYmllcmVuLCBcIiwgXCJzaWduIGluXCI6IFwiQW5tZWxkZW5cIiwgXCIgd2l0aCB5b3VyIHdvcmsgb3Igc2Nob29sIGFjY291bnQgZnJvbSBNaWNyb3NvZnQuXCI6IFwiIG1pdCBJaHJlbSBHZXNjaMOkZnRzLSBvZGVyIFNjaHVsa29udG8gdm9uIE1pY3Jvc29mdCBhbi5cIiwgXCJTdWJtaXRcIjogXCJTZW5kZW5cIiwgXCJVc2luZyBkZW1vIHRlbmFudFwiOiBcIlZlcndlbmRlbiBkZXMgRGVtb21hbmRhbnRlblwiLCBcInNpZ24gb3V0XCI6IFwiQWJtZWxkZW5cIiwgXCJIaXN0b3J5XCI6IFwiVmVybGF1ZlwiLCBcIk1ldGhvZFwiOiBcIk1ldGhvZGVcIiwgXCJRdWVyeVwiOiBcIkFiZnJhZ2VcIiwgXCJTdGF0dXMgQ29kZVwiOiBcIlN0YXR1c2NvZGVcIiwgXCJEdXJhdGlvblwiOiBcIkRhdWVyXCIsIFwiR29cIjogXCJPS1wiLCBcIllFU1wiOiBcIkpBXCIsIFwiTk9cIjogXCJORUlOXCIsIFwicmVxdWVzdCBoZWFkZXJcIjogXCJBbmZvcmRlcnVuZ3NoZWFkZXJcIiwgXCJyZXF1ZXN0IGJvZHlcIjogXCJBbmZvcmRlcnVuZ3N0ZXh0a8O2cnBlclwiLCBcInJlc3BvbnNlXCI6IFwiQW50d29ydFwiIH07XHJcbmxvY19zdHJpbmdzWydydS1SVSddID0geyBcIlRvIHRyeSB0aGUgZXhwbG9yZXIsIHBsZWFzZSBcIjogXCLQp9GC0L7QsdGLINC+0L/RgNC+0LHQvtCy0LDRgtGMINC/0LXRgdC+0YfQvdC40YbRgywgXCIsIFwic2lnbiBpblwiOiBcItCy0L7QudGC0LhcIiwgXCIgd2l0aCB5b3VyIHdvcmsgb3Igc2Nob29sIGFjY291bnQgZnJvbSBNaWNyb3NvZnQuXCI6IFwiINGBINC/0L7QvNC+0YnRjNGOINGA0LDQsdC+0YfQtdC5INC40LvQuCDRg9GH0LXQsdC90L7QuSDRg9GH0LXRgtC90L7QuSDQt9Cw0L/QuNGB0Lgg0L7RgiDQutC+0YDQv9C+0YDQsNGG0LjQuCDQnNCw0LnQutGA0L7RgdC+0YTRgi5cIiwgXCJTdWJtaXRcIjogXCLQntGC0L/RgNCw0LLQuNGC0YxcIiwgXCJVc2luZyBkZW1vIHRlbmFudFwiOiBcItChINC/0L7QvNC+0YnRjNGOINC00LXQvNC+0L3RgdGC0YDQsNGG0LjQvtC90L3QvtCz0L4g0LrQu9C40LXQvdGC0LBcIiwgXCJzaWduIG91dFwiOiBcItCy0YvQudGC0LhcIiwgXCJIaXN0b3J5XCI6IFwi0JbRg9GA0L3QsNC7XCIsIFwiTWV0aG9kXCI6IFwi0JzQtdGC0L7QtFwiLCBcIlF1ZXJ5XCI6IFwi0JfQsNC/0YDQvtGBXCIsIFwiU3RhdHVzIENvZGVcIjogXCLQmtC+0LQg0YHQvtGB0YLQvtGP0L3QuNGPXCIsIFwiRHVyYXRpb25cIjogXCLQlNC70LjRgtC10LvRjNC90L7RgdGC0YxcIiwgXCJHb1wiOiBcItCf0LXRgNC10LnRgtC4XCIsIFwiWUVTXCI6IFwi0JTQkFwiLCBcIk5PXCI6IFwi0J3QldCiXCIsIFwicmVxdWVzdCBoZWFkZXJcIjogXCLQt9Cw0LPQvtC70L7QstC+0Log0LfQsNC/0YDQvtGB0LBcIiwgXCJyZXF1ZXN0IGJvZHlcIjogXCLRgtC10LrRgdGCINC30LDQv9GA0L7RgdCwXCIsIFwicmVzcG9uc2VcIjogXCLQvtGC0LLQtdGCXCIgfTtcclxubG9jX3N0cmluZ3NbJ2phLUpQJ10gPSB7IFwiVG8gdHJ5IHRoZSBleHBsb3JlciwgcGxlYXNlIFwiOiBcIuOCqOOCr+OCueODl+ODreODvOODqeODvOOCkuOBiuippuOBl+OBhOOBn+OBoOOBj+OBq+OBr+OAgU1pY3Jvc29mdCDjga7ogbfloLTjgb7jgZ/jga/lrabmoKHjgqLjgqvjgqbjg7Pjg4jjgacgXCIsIFwic2lnbiBpblwiOiBcIuOCteOCpOODs+OCpOODs1wiLCBcIiB3aXRoIHlvdXIgd29yayBvciBzY2hvb2wgYWNjb3VudCBmcm9tIE1pY3Jvc29mdC5cIjogXCIg44GX44G+44GZ44CCXCIsIFwiU3VibWl0XCI6IFwi6YCB5L+hXCIsIFwiVXNpbmcgZGVtbyB0ZW5hbnRcIjogXCLjg4fjg6Ig44OG44OK44Oz44OI44KS5L2/55So44GX44Gm44GE44G+44GZXCIsIFwic2lnbiBvdXRcIjogXCLjgrXjgqTjg7PjgqLjgqbjg4hcIiwgXCJIaXN0b3J5XCI6IFwi5bGl5q20XCIsIFwiTWV0aG9kXCI6IFwi44Oh44K944OD44OJXCIsIFwiUXVlcnlcIjogXCLjgq/jgqjjg6pcIiwgXCJTdGF0dXMgQ29kZVwiOiBcIueKtuaFi+OCs+ODvOODiVwiLCBcIkR1cmF0aW9uXCI6IFwi5pyf6ZaTXCIsIFwiR29cIjogXCLmpJzntKJcIiwgXCJZRVNcIjogXCLjga/jgYRcIiwgXCJOT1wiOiBcIuOBhOOBhOOBiFwiLCBcInJlcXVlc3QgaGVhZGVyXCI6IFwi6KaB5rGC44OY44OD44OA44O8XCIsIFwicmVxdWVzdCBib2R5XCI6IFwi6KaB5rGC5pys5paHXCIsIFwicmVzcG9uc2VcIjogXCLlv5znrZRcIiB9O1xyXG5sb2Nfc3RyaW5nc1sncHQtQlInXSA9IHsgXCJUbyB0cnkgdGhlIGV4cGxvcmVyLCBwbGVhc2UgXCI6IFwiUGFyYSBleHBlcmltZW50YXIgbyBFeHBsb3JhZG9yLCBcIiwgXCJzaWduIGluXCI6IFwiZW50cmFyXCIsIFwiIHdpdGggeW91ciB3b3JrIG9yIHNjaG9vbCBhY2NvdW50IGZyb20gTWljcm9zb2Z0LlwiOiBcIiBjb20gYSBzdWEgY29udGEgY29ycG9yYXRpdmEgb3UgZGUgZXN0dWRhbnRlIGRhIE1pY3Jvc29mdC5cIiwgXCJTdWJtaXRcIjogXCJFbnZpYXJcIiwgXCJVc2luZyBkZW1vIHRlbmFudFwiOiBcIlVzYW5kbyBvIExvY2F0w6FyaW8gZGUgRGVtb25zdHJhw6fDo29cIiwgXCJzaWduIG91dFwiOiBcInNhaXJcIiwgXCJIaXN0b3J5XCI6IFwiSGlzdMOzcmljb1wiLCBcIk1ldGhvZFwiOiBcIk3DqXRvZG9cIiwgXCJRdWVyeVwiOiBcIkNvbnN1bHRhXCIsIFwiU3RhdHVzIENvZGVcIjogXCJDw7NkaWdvIGRlIFN0YXR1c1wiLCBcIkR1cmF0aW9uXCI6IFwiRHVyYcOnw6NvXCIsIFwiR29cIjogXCJJclwiLCBcIllFU1wiOiBcIlNJTVwiLCBcIk5PXCI6IFwiTsODT1wiLCBcInJlcXVlc3QgaGVhZGVyXCI6IFwiY2FiZcOnYWxobyBkYSBzb2xpY2l0YcOnw6NvXCIsIFwicmVxdWVzdCBib2R5XCI6IFwiY29ycG8gZGEgc29saWNpdGHDp8Ojb1wiLCBcInJlc3BvbnNlXCI6IFwicmVzcG9zdGFcIiB9O1xyXG5sb2Nfc3RyaW5nc1snemgtQ04nXSA9IHsgXCJUbyB0cnkgdGhlIGV4cGxvcmVyLCBwbGVhc2UgXCI6IFwi6Iul6KaB5bCd6K+V5rWP6KeI5Zmo77yM6K+3IOS9v+eUqOS9oOeahCBNaWNyb3NvZnQg5bel5L2c5oiW5a2m5qCh5biQ5oi3XCIsIFwic2lnbiBpblwiOiBcIueZu+W9lVwiLCBcIiB3aXRoIHlvdXIgd29yayBvciBzY2hvb2wgYWNjb3VudCBmcm9tIE1pY3Jvc29mdC5cIjogXCLjgIJcIiwgXCJTdWJtaXRcIjogXCLmj5DkuqRcIiwgXCJVc2luZyBkZW1vIHRlbmFudFwiOiBcIuS9v+eUqOa8lOekuuenn+aIt1wiLCBcInNpZ24gb3V0XCI6IFwi5rOo6ZSAXCIsIFwiSGlzdG9yeVwiOiBcIuWOhuWPsuiusOW9lVwiLCBcIk1ldGhvZFwiOiBcIuaWueazlVwiLCBcIlF1ZXJ5XCI6IFwi5p+l6K+iXCIsIFwiU3RhdHVzIENvZGVcIjogXCLnirbmgIHku6PnoIFcIiwgXCJEdXJhdGlvblwiOiBcIuaMgee7reaXtumXtFwiLCBcIkdvXCI6IFwi6L2s5YiwXCIsIFwiWUVTXCI6IFwi5pivXCIsIFwiTk9cIjogXCLlkKZcIiwgXCJyZXF1ZXN0IGhlYWRlclwiOiBcIuivt+axguagh+mimFwiLCBcInJlcXVlc3QgYm9keVwiOiBcIuivt+axguato+aWh1wiLCBcInJlc3BvbnNlXCI6IFwi5ZON5bqUXCIgfTtcclxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9bG9jX3N0cmluZ3MuanMubWFwIiwidmFyIHBvc3RUZW1wbGF0ZXMgPSB7XHJcbiAgICBtZXNzYWdlczoge1xyXG4gICAgICAgIFwic3ViamVjdFwiOiBcIk1lZXQgZm9yIGx1bmNoP1wiLFxyXG4gICAgICAgIFwiYm9keVwiOiB7XHJcbiAgICAgICAgICAgIFwiY29udGVudFR5cGVcIjogXCJUZXh0XCIsXHJcbiAgICAgICAgICAgIFwiY29udGVudFwiOiBcIlRoZSBuZXcgY2FmZXRlcmlhIGlzIG9wZW4uXCJcclxuICAgICAgICB9LFxyXG4gICAgICAgIFwidG9SZWNpcGllbnRzXCI6IFtcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgXCJlbWFpbEFkZHJlc3NcIjoge1xyXG4gICAgICAgICAgICAgICAgICAgIFwiYWRkcmVzc1wiOiBcImdhcnRoZkBjb250b3NvLmNvbVwiXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICBdXHJcbiAgICB9LFxyXG4gICAgZXZlbnRzOiB7XHJcbiAgICAgICAgXCJzdWJqZWN0XCI6IFwiTXkgZXZlbnRcIixcclxuICAgICAgICBcInN0YXJ0XCI6IHtcclxuICAgICAgICAgICAgXCJkYXRlVGltZVwiOiBcIjIwMTctMDUtMDdUMTY6MTU6MDAuMDAwMDAwMFwiLFxyXG4gICAgICAgICAgICBcInRpbWVab25lXCI6IFwiVVRDXCJcclxuICAgICAgICB9LFxyXG4gICAgICAgIFwiZW5kXCI6IHtcclxuICAgICAgICAgICAgXCJkYXRlVGltZVwiOiBcIjIwMTctMDYtMDdUMTY6MTU6MDAuMDAwMDAwMFwiLFxyXG4gICAgICAgICAgICBcInRpbWVab25lXCI6IFwiVVRDXCJcclxuICAgICAgICB9LFxyXG4gICAgfSxcclxuICAgIHNlbmRNYWlsOiB7XHJcbiAgICAgICAgXCJtZXNzYWdlXCI6IHtcclxuICAgICAgICAgICAgXCJzdWJqZWN0XCI6IFwiTWVldCBmb3IgbHVuY2g/XCIsXHJcbiAgICAgICAgICAgIFwiYm9keVwiOiB7XHJcbiAgICAgICAgICAgICAgICBcImNvbnRlbnRUeXBlXCI6IFwiVGV4dFwiLFxyXG4gICAgICAgICAgICAgICAgXCJjb250ZW50XCI6IFwiVGhlIG5ldyBjYWZldGVyaWEgaXMgb3Blbi5cIlxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcInRvUmVjaXBpZW50c1wiOiBbXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgXCJlbWFpbEFkZHJlc3NcIjoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBcImFkZHJlc3NcIjogXCJnYXJ0aGZAY29udG9zby5jb21cIlxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXCJzYXZlVG9TZW50SXRlbXNcIjogXCJmYWxzZVwiXHJcbiAgICB9LFxyXG4gICAgZmluZE1lZXRpbmdUaW1lczoge1xyXG4gICAgICAgIFwiYXR0ZW5kZWVzXCI6IFtcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgXCJlbWFpbEFkZHJlc3NcIjoge1xyXG4gICAgICAgICAgICAgICAgICAgIFwiYWRkcmVzc1wiOiBcIkZVTExfVVNFUl9FTUFJTFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwibmFtZVwiOiBcIkFsZXggRGFycm93XCJcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJSZXF1aXJlZFwiXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICBdLFxyXG4gICAgICAgIFwidGltZUNvbnN0cmFpbnRcIjoge1xyXG4gICAgICAgICAgICBcInRpbWVzbG90c1wiOiBbXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgXCJzdGFydFwiOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiZGF0ZVRpbWVcIjogXCIyMDE2LTEwLTIwVDA3OjAwOjAwXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwidGltZVpvbmVcIjogXCJQYWNpZmljIFN0YW5kYXJkIFRpbWVcIlxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgXCJlbmRcIjoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBcImRhdGVUaW1lXCI6IFwiMjAxNi0xMC0yMFQxNzowMDowMFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcInRpbWVab25lXCI6IFwiUGFjaWZpYyBTdGFuZGFyZCBUaW1lXCJcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIF1cclxuICAgICAgICB9LFxyXG4gICAgICAgIFwibG9jYXRpb25Db25zdHJhaW50XCI6IHtcclxuICAgICAgICAgICAgXCJpc1JlcXVpcmVkXCI6IFwiZmFsc2VcIixcclxuICAgICAgICAgICAgXCJzdWdnZXN0TG9jYXRpb25cIjogXCJ0cnVlXCIsXHJcbiAgICAgICAgICAgIFwibG9jYXRpb25zXCI6IFtcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBcImRpc3BsYXlOYW1lXCI6IFwiQ29uZiBSb29tIDMyLzEzNjhcIixcclxuICAgICAgICAgICAgICAgICAgICBcImxvY2F0aW9uRW1haWxBZGRyZXNzXCI6IFwiY29uZjMycm9vbTEzNjhAaW1nZWVrLm9ubWljcm9zb2Z0LmNvbVwiXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIF1cclxuICAgICAgICB9LFxyXG4gICAgICAgIFwibWVldGluZ0R1cmF0aW9uXCI6IFwiUFQxSFwiXHJcbiAgICB9LFxyXG4gICAgdXNlcnM6IHtcclxuICAgICAgICBcImFjY291bnRFbmFibGVkXCI6IHRydWUsXHJcbiAgICAgICAgXCJjaXR5XCI6IFwiU2VhdHRsZVwiLFxyXG4gICAgICAgIFwiY291bnRyeVwiOiBcIlVuaXRlZCBTdGF0ZXNcIixcclxuICAgICAgICBcImRlcGFydG1lbnRcIjogXCJTYWxlcyAmIE1hcmtldGluZ1wiLFxyXG4gICAgICAgIFwiZGlzcGxheU5hbWVcIjogXCJNZWxpc3NhIERhcnJvd1wiLFxyXG4gICAgICAgIFwiZ2l2ZW5OYW1lXCI6IFwiTWVsaXNzYVwiLFxyXG4gICAgICAgIFwiam9iVGl0bGVcIjogXCJNYXJrZXRpbmcgRGlyZWN0b3JcIixcclxuICAgICAgICBcIm1haWxOaWNrbmFtZVwiOiBcIk1lbGlzc2FEXCIsXHJcbiAgICAgICAgXCJwYXNzd29yZFBvbGljaWVzXCI6IFwiRGlzYWJsZVBhc3N3b3JkRXhwaXJhdGlvblwiLFxyXG4gICAgICAgIFwicGFzc3dvcmRQcm9maWxlXCI6IHtcclxuICAgICAgICAgICAgXCJwYXNzd29yZFwiOiBcIlRlc3QxMjM0XCIsXHJcbiAgICAgICAgICAgIFwiZm9yY2VDaGFuZ2VQYXNzd29yZE5leHRTaWduSW5cIjogZmFsc2VcclxuICAgICAgICB9LFxyXG4gICAgICAgIFwib2ZmaWNlTG9jYXRpb25cIjogXCIxMzEvMTEwNVwiLFxyXG4gICAgICAgIFwicG9zdGFsQ29kZVwiOiBcIjk4MDUyXCIsXHJcbiAgICAgICAgXCJwcmVmZXJyZWRMYW5ndWFnZVwiOiBcImVuLVVTXCIsXHJcbiAgICAgICAgXCJzdGF0ZVwiOiBcIldBXCIsXHJcbiAgICAgICAgXCJzdHJlZXRBZGRyZXNzXCI6IFwiOTI1NiBUb3duZSBDZW50ZXIgRHIuLCBTdWl0ZSA0MDBcIixcclxuICAgICAgICBcInN1cm5hbWVcIjogXCJEYXJyb3dcIixcclxuICAgICAgICBcIm1vYmlsZVBob25lXCI6IFwiKzEgMjA2IDU1NSAwMTEwXCIsXHJcbiAgICAgICAgXCJ1c2FnZUxvY2F0aW9uXCI6IFwiVVNcIixcclxuICAgICAgICBcInVzZXJQcmluY2lwYWxOYW1lXCI6IFwiTWVsaXNzYURAQVVUSEVOVElDQVRFRF9ET01BSU5cIixcclxuICAgIH0sXHJcbiAgICBncm91cHM6IHtcclxuICAgICAgICBcIkBvZGF0YS50eXBlXCI6IFwiI01pY3Jvc29mdC5HcmFwaC5Hcm91cFwiLFxyXG4gICAgICAgIFwiZGVzY3JpcHRpb25cIjogXCJUaGlzIGdyb3VwIGlzIHRoZSBiZXN0IGV2ZXJcIixcclxuICAgICAgICBcImRpc3BsYXlOYW1lXCI6IFwiVW5pZmllZCBncm91cCAzZWYxNVwiLFxyXG4gICAgICAgIFwiZ3JvdXBUeXBlc1wiOiBbXHJcbiAgICAgICAgICAgIFwiVW5pZmllZFwiXHJcbiAgICAgICAgXSxcclxuICAgICAgICBcIm1haWxFbmFibGVkXCI6IHRydWUsXHJcbiAgICAgICAgXCJtYWlsTmlja25hbWVcIjogXCJHcm91cDkxMWU1XCIsXHJcbiAgICAgICAgXCJzZWN1cml0eUVuYWJsZWRcIjogdHJ1ZVxyXG4gICAgfSxcclxuICAgIGNvbnRhY3RzOiB7XHJcbiAgICAgICAgXCJnaXZlbk5hbWVcIjogXCJQYXZlbFwiLFxyXG4gICAgICAgIFwic3VybmFtZVwiOiBcIkJhbnNreVwiLFxyXG4gICAgICAgIFwiZW1haWxBZGRyZXNzZXNcIjogW1xyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBcImFkZHJlc3NcIjogXCJwYXZlbGJAZmFicmlrYW0ub25taWNyb3NvZnQuY29tXCIsXHJcbiAgICAgICAgICAgICAgICBcIm5hbWVcIjogXCJQYXZlbCBCYW5za3lcIlxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgXSxcclxuICAgICAgICBcImJ1c2luZXNzUGhvbmVzXCI6IFtcclxuICAgICAgICAgICAgXCIrMSA3MzIgNTU1IDAxMDJcIlxyXG4gICAgICAgIF1cclxuICAgIH1cclxufTtcclxudmFyIHRlbXBsYXRlTmFtZXMgPSB7XHJcbiAgICBtZXNzYWdlczogJ21lc3NhZ2UnLFxyXG4gICAgZXZlbnRzOiAnZXZlbnQnLFxyXG4gICAgc2VuZE1haWw6ICdlbWFpbCdcclxufTtcclxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9cG9zdFRlbXBsYXRlcy5qcy5tYXAiLCJ2YXIgc2ltT3B0aW9ucyA9IHt9O1xyXG52YXIgbGluaywgbm9kZTtcclxuZnVuY3Rpb24gc3RhcnRTaW1Gcm9tR3JhcGhSZXNwb25zZShkYXRhKSB7XHJcbiAgICB2YXIgbm9kZXMgPSBbXTtcclxuICAgIHZhciBsaW5rcyA9IFtdO1xyXG4gICAgdmFyIGxhc3RHcmFwaE5vZGUgPSBjb25zdHJ1Y3RHcmFwaExpbmtzRnJvbUZ1bGxQYXRoKGFwaVNlcnZpY2UudGV4dCkucG9wKCk7XHJcbiAgICB2YXIgZW50aXR5SWQgPSBkYXRhWydpZCddO1xyXG4gICAgbm9kZXMucHVzaCh7XHJcbiAgICAgICAgaWQ6IGVudGl0eUlkLFxyXG4gICAgICAgIHR5cGU6IFwiZW50aXR5XCIsXHJcbiAgICAgICAgbGFiZWw6IGRhdGFbJ2Rpc3BsYXlOYW1lJ11cclxuICAgIH0pO1xyXG4gICAgZm9yICh2YXIga2V5IGluIGRhdGEpIHtcclxuICAgICAgICBpZiAoa2V5LmluZGV4T2YoXCJvZGF0YVwiKSAhPSAtMSlcclxuICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgaWYgKGRhdGFba2V5XSA9PT0gbnVsbClcclxuICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgbm9kZXMucHVzaCh7XHJcbiAgICAgICAgICAgIGlkOiBlbnRpdHlJZCArIGtleSxcclxuICAgICAgICAgICAgdHlwZTogXCJQUk9QRVJUWV9LRVlcIixcclxuICAgICAgICAgICAgbGFiZWw6IGtleVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGxpbmtzLnB1c2goe1xyXG4gICAgICAgICAgICBzb3VyY2U6IGVudGl0eUlkLFxyXG4gICAgICAgICAgICB0YXJnZXQ6IGVudGl0eUlkICsga2V5XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdmFyIHByb3BlcnR5VmFsdWVOb2RlSWQgPSBcInZhbHVlLVwiICsgZW50aXR5SWQgKyBrZXk7XHJcbiAgICAgICAgbm9kZXMucHVzaCh7XHJcbiAgICAgICAgICAgIGlkOiBwcm9wZXJ0eVZhbHVlTm9kZUlkLFxyXG4gICAgICAgICAgICB0eXBlOiBcIlBST1BFUlRZX1ZBTFVFXCIsXHJcbiAgICAgICAgICAgIGxhYmVsOiBKU09OLnN0cmluZ2lmeShkYXRhW2tleV0pXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgbGlua3MucHVzaCh7XHJcbiAgICAgICAgICAgIHNvdXJjZTogcHJvcGVydHlWYWx1ZU5vZGVJZCxcclxuICAgICAgICAgICAgdGFyZ2V0OiBlbnRpdHlJZCArIGtleVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgdmFyIGVudGl0eUxpbmtzID0gZ2V0RW50aXR5RnJvbVR5cGVOYW1lKGxhc3RHcmFwaE5vZGUudHlwZSkubGlua3M7XHJcbiAgICBmb3IgKHZhciBlbnRpdHlMaW5rIGluIGVudGl0eUxpbmtzKSB7XHJcbiAgICAgICAgdmFyIGxpbmtfMSA9IGVudGl0eUxpbmtzW2VudGl0eUxpbmtdO1xyXG4gICAgICAgIGlmIChsaW5rXzEudGFnTmFtZSA9PSBcIk5BVklHQVRJT05QUk9QRVJUWVwiKSB7XHJcbiAgICAgICAgICAgIHZhciBub2RlSWQgPSBcIiRuYXZfcHJvcGVydHlfXCIgKyBlbnRpdHlJZCArIFwiX1wiICsgbGlua18xLm5hbWU7XHJcbiAgICAgICAgICAgIG5vZGVzLnB1c2goe1xyXG4gICAgICAgICAgICAgICAgaWQ6IG5vZGVJZCxcclxuICAgICAgICAgICAgICAgIGxhYmVsOiBsaW5rXzEubmFtZSxcclxuICAgICAgICAgICAgICAgIHR5cGU6IFwiTkFWSUdBVElPTlBST1BFUlRZXCJcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGxpbmtzLnB1c2goe1xyXG4gICAgICAgICAgICAgICAgc291cmNlOiBlbnRpdHlJZCxcclxuICAgICAgICAgICAgICAgIHRhcmdldDogbm9kZUlkXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHN0YXJ0U2ltKG5vZGVzLCBsaW5rcyk7XHJcbn1cclxuZnVuY3Rpb24gc3RhcnRTaW0obm9kZXMsIGxpbmtzKSB7XHJcbiAgICBzaW1PcHRpb25zLnN2ZyA9IGQzLnNlbGVjdChcIiN2aXN1YWwtZXhwbG9yZXJcIik7XHJcbiAgICBzaW1PcHRpb25zLnN2Zy5zZWxlY3RBbGwoXCIqXCIpLnJlbW92ZSgpO1xyXG4gICAgc2ltT3B0aW9ucy53aWR0aCA9IHNpbU9wdGlvbnMuc3ZnLmF0dHIoXCJ3aWR0aFwiKTtcclxuICAgIHNpbU9wdGlvbnMuaGVpZ2h0ID0gc2ltT3B0aW9ucy5zdmcuYXR0cihcImhlaWdodFwiKTtcclxuICAgIHNpbU9wdGlvbnMubm9kZXMgPSBub2RlcztcclxuICAgIHNpbU9wdGlvbnMubGlua3MgPSBsaW5rcztcclxuICAgIHZhciBtYW55Qm9keUZvcmNlID0gZDMuZm9yY2VNYW55Qm9keSgpLnN0cmVuZ3RoKFstNTAwXSk7XHJcbiAgICBzaW1PcHRpb25zLnNpbXVsYXRpb24gPSBkMy5mb3JjZVNpbXVsYXRpb24oKVxyXG4gICAgICAgIC5mb3JjZShcImxpbmtcIiwgZDMuZm9yY2VMaW5rKCkuaWQoZnVuY3Rpb24gKGQpIHsgcmV0dXJuIGQuaWQ7IH0pLmRpc3RhbmNlKGZ1bmN0aW9uIChsaW5rKSB7IHJldHVybiBsaW5rLnRhcmdldC50eXBlID09IFwiTkFWSUdBVElPTlBST1BFUlRZXCIgPyA0MDAgOiAxMDA7IH0pKVxyXG4gICAgICAgIC5mb3JjZShcImNoYXJnZVwiLCBtYW55Qm9keUZvcmNlKVxyXG4gICAgICAgIC5mb3JjZShcImNlbnRlclwiLCBkMy5mb3JjZUNlbnRlcihzaW1PcHRpb25zLndpZHRoIC8gMiwgc2ltT3B0aW9ucy5oZWlnaHQgLyAyKSk7XHJcbiAgICBpbml0TGlua3MoKTtcclxuICAgIGluaXROb2RlcygpO1xyXG4gICAgcmVzZXRTaW11bGF0aW9uKCk7XHJcbn1cclxuZnVuY3Rpb24gaW5pdExpbmtzKCkge1xyXG4gICAgbGluayA9IHNpbU9wdGlvbnMuc3ZnLmFwcGVuZChcImdcIilcclxuICAgICAgICAuYXR0cihcImNsYXNzXCIsIFwibGlua3NcIilcclxuICAgICAgICAuc2VsZWN0QWxsKFwibGluZVwiKVxyXG4gICAgICAgIC5lbnRlcigpLmFwcGVuZChcImxpbmVcIik7XHJcbn1cclxuZnVuY3Rpb24gaW5pdE5vZGVzKCkge1xyXG4gICAgbm9kZSA9IHNpbU9wdGlvbnMuc3ZnLnNlbGVjdEFsbChcIi5ub2RlXCIpXHJcbiAgICAgICAgLmVudGVyKCkuYXBwZW5kKFwiZ1wiKVxyXG4gICAgICAgIC5hdHRyKFwiY2xhc3NcIiwgXCJub2RlXCIpO1xyXG4gICAgcmV0dXJuIG5vZGU7XHJcbn1cclxuZnVuY3Rpb24gY29tbW9uTGlua1NldHVwKGwpIHtcclxuICAgIHJldHVybiBsXHJcbiAgICAgICAgLmF0dHIoXCJzdHJva2Utd2lkdGhcIiwgZnVuY3Rpb24gKGQpIHsgcmV0dXJuIDU7IH0pO1xyXG59XHJcbmZ1bmN0aW9uIHJlc2V0TGlua3MoKSB7XHJcbiAgICBsaW5rID0gbGluay5kYXRhKHNpbU9wdGlvbnMubGlua3MpO1xyXG4gICAgbGluay5leGl0KCkucmVtb3ZlKCk7XHJcbiAgICBsaW5rID0gY29tbW9uTGlua1NldHVwKGxpbmsuZW50ZXIoKS5hcHBlbmQoXCJsaW5lXCIpKS5tZXJnZShsaW5rKTtcclxuICAgIHJldHVybiBsaW5rO1xyXG59XHJcbmZ1bmN0aW9uIGNvbW1vbk5vZGVTZXR1cChuKSB7XHJcbiAgICB2YXIgY29sb3IgPSBkMy5zY2FsZU9yZGluYWwoZDMuc2NoZW1lQ2F0ZWdvcnkyMCk7XHJcbiAgICByZXR1cm4gbi5hdHRyKFwiclwiLCA1MClcclxuICAgICAgICAuYXR0cihcImZpbGxcIiwgZnVuY3Rpb24gKGQpIHsgcmV0dXJuIGNvbG9yKGQudHlwZSk7IH0pXHJcbiAgICAgICAgLmF0dHIoXCJzdHJva2VcIiwgXCIjNzU3NTc1XCIpXHJcbiAgICAgICAgLmF0dHIoXCJzdHJva2Utd2lkdGhcIiwgMClcclxuICAgICAgICAuY2FsbChkMy5kcmFnKClcclxuICAgICAgICAub24oXCJzdGFydFwiLCBkcmFnc3RhcnRlZClcclxuICAgICAgICAub24oXCJkcmFnXCIsIGRyYWdnZWQpXHJcbiAgICAgICAgLm9uKFwiZW5kXCIsIGRyYWdlbmRlZCkpO1xyXG59XHJcbmZ1bmN0aW9uIHJlc2V0U3ZnTm9kZXMoKSB7XHJcbiAgICBub2RlID0gbm9kZS5kYXRhKHNpbU9wdGlvbnMubm9kZXMsIGZ1bmN0aW9uIChkKSB7IHJldHVybiBkLmlkOyB9KTtcclxuICAgIG5vZGUuZXhpdCgpLnJlbW92ZSgpO1xyXG4gICAgdmFyIGJhc2VFbCA9IG5vZGVcclxuICAgICAgICAuZW50ZXIoKS5hcHBlbmQoXCJnXCIpO1xyXG4gICAgY29tbW9uTm9kZVNldHVwKGJhc2VFbFxyXG4gICAgICAgIC5hcHBlbmQoXCJjaXJjbGVcIilcclxuICAgICAgICAuYXR0cihcImNsYXNzXCIsIFwibm9kZVwiKSk7XHJcbiAgICB2YXIgY2lyY2xlcyA9IGJhc2VFbC5zZWxlY3RBbGwoXCJjaXJjbGVcIik7XHJcbiAgICBjaXJjbGVzLm9uKFwibW91c2VvdmVyXCIsIGZ1bmN0aW9uICgpIHsgZDMuc2VsZWN0KHRoaXMpLnRyYW5zaXRpb24oKS5hdHRyKFwic3Ryb2tlLXdpZHRoXCIsIFwiM1wiKS5zdHlsZShcImN1cnNvclwiLCBcInBvaW50ZXJcIik7IH0pO1xyXG4gICAgY2lyY2xlcy5vbihcIm1vdXNlb3V0XCIsIGZ1bmN0aW9uICgpIHsgZDMuc2VsZWN0KHRoaXMpLnRyYW5zaXRpb24oKS5hdHRyKFwic3Ryb2tlLXdpZHRoXCIsIFwiMFwiKS5zdHlsZShcImN1cnNvclwiLCBcImRlZmF1bHRcIik7IH0pO1xyXG4gICAgYmFzZUVsLmFwcGVuZChcInRleHRcIilcclxuICAgICAgICAudGV4dChmdW5jdGlvbiAoZCkgeyByZXR1cm4gZC5sYWJlbDsgfSk7XHJcbiAgICByZXR1cm4gYmFzZUVsO1xyXG59XHJcbmZ1bmN0aW9uIHJlc2V0U2ltdWxhdGlvbigpIHtcclxuICAgIHZhciBub2RlQmFzZUVsZW1lbnRzID0gcmVzZXRTdmdOb2RlcygpO1xyXG4gICAgdmFyIGxpbmtzID0gcmVzZXRMaW5rcygpO1xyXG4gICAgc2ltT3B0aW9ucy5zaW11bGF0aW9uXHJcbiAgICAgICAgLm5vZGVzKHNpbU9wdGlvbnMubm9kZXMpXHJcbiAgICAgICAgLm9uKFwidGlja1wiLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdGlja2VkKG5vZGVCYXNlRWxlbWVudHMsIGxpbmtzKTtcclxuICAgIH0pO1xyXG4gICAgc2ltT3B0aW9ucy5zaW11bGF0aW9uXHJcbiAgICAgICAgLmZvcmNlKFwibGlua1wiKVxyXG4gICAgICAgIC5saW5rcyhzaW1PcHRpb25zLmxpbmtzKTtcclxuICAgIHNpbU9wdGlvbnMuc2ltdWxhdGlvbi5hbHBoYVRhcmdldCgwLjMpLnJlc3RhcnQoKTtcclxufVxyXG5mdW5jdGlvbiB0aWNrZWQobm9kZXMsIGxpbmtzKSB7XHJcbiAgICBsaW5rc1xyXG4gICAgICAgIC5hdHRyKFwieDFcIiwgZnVuY3Rpb24gKGQpIHsgcmV0dXJuIGQuc291cmNlLng7IH0pXHJcbiAgICAgICAgLmF0dHIoXCJ5MVwiLCBmdW5jdGlvbiAoZCkgeyByZXR1cm4gZC5zb3VyY2UueTsgfSlcclxuICAgICAgICAuYXR0cihcIngyXCIsIGZ1bmN0aW9uIChkKSB7IHJldHVybiBkLnRhcmdldC54OyB9KVxyXG4gICAgICAgIC5hdHRyKFwieTJcIiwgZnVuY3Rpb24gKGQpIHsgcmV0dXJuIGQudGFyZ2V0Lnk7IH0pO1xyXG4gICAgbm9kZXMuc2VsZWN0QWxsKFwiY2lyY2xlXCIpLmF0dHIoXCJ0cmFuc2Zvcm1cIiwgZnVuY3Rpb24gKGQpIHsgcmV0dXJuIFwidHJhbnNsYXRlKFwiICsgZC54ICsgXCIsXCIgKyBkLnkgKyBcIilcIjsgfSk7XHJcbiAgICBub2Rlcy5zZWxlY3RBbGwoXCJ0ZXh0XCIpLmF0dHIoXCJ0cmFuc2Zvcm1cIiwgZnVuY3Rpb24gKGQpIHsgcmV0dXJuIFwidHJhbnNsYXRlKFwiICsgZC54ICsgXCIsXCIgKyBkLnkgKyBcIilcIjsgfSk7XHJcbn1cclxuZnVuY3Rpb24gZHJhZ3N0YXJ0ZWQoZCkge1xyXG4gICAgaWYgKCFkMy5ldmVudC5hY3RpdmUpXHJcbiAgICAgICAgc2ltT3B0aW9ucy5zaW11bGF0aW9uLmFscGhhVGFyZ2V0KDAuMykucmVzdGFydCgpO1xyXG4gICAgZC5meCA9IGQueDtcclxuICAgIGQuZnkgPSBkLnk7XHJcbn1cclxuZnVuY3Rpb24gZHJhZ2dlZChkKSB7XHJcbiAgICBkLmZ4ID0gZDMuZXZlbnQueDtcclxuICAgIGQuZnkgPSBkMy5ldmVudC55O1xyXG59XHJcbmZ1bmN0aW9uIGRyYWdlbmRlZChkKSB7XHJcbiAgICBpZiAoIWQzLmV2ZW50LmFjdGl2ZSlcclxuICAgICAgICBzaW1PcHRpb25zLnNpbXVsYXRpb24uYWxwaGFUYXJnZXQoMCk7XHJcbiAgICBkLmZ4ID0gbnVsbDtcclxuICAgIGQuZnkgPSBudWxsO1xyXG59XHJcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXZpc3VhbGl6ZXIuanMubWFwIl19
