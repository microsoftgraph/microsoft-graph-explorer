!function a(b,c,d){function e(g,h){if(!c[g]){if(!b[g]){var i="function"==typeof require&&require;if(!h&&i)return i(g,!0);if(f)return f(g,!0);var j=new Error("Cannot find module '"+g+"'");throw j.code="MODULE_NOT_FOUND",j}var k=c[g]={exports:{}};b[g][0].call(k.exports,function(a){var c=b[g][1][a];return e(c?c:a)},k,k.exports,a,b,c,d)}return c[g].exports}for(var f="function"==typeof require&&require,g=0;g<d.length;g++)e(d[g]);return e}({1:[function(a,b,c){function d(a){this.message=a}function e(a){var b=String(a).replace(/=+$/,"");if(b.length%4==1)throw new d("'atob' failed: The string to be decoded is not correctly encoded.");for(var c,e,g=0,h=0,i="";e=b.charAt(h++);~e&&(c=g%4?64*c+e:e,g++%4)?i+=String.fromCharCode(255&c>>(-2*g&6)):0)e=f.indexOf(e);return i}var f="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";d.prototype=new Error,d.prototype.name="InvalidCharacterError",b.exports="undefined"!=typeof window&&window.atob&&window.atob.bind(window)||e},{}],2:[function(a,b,c){function d(a){return decodeURIComponent(e(a).replace(/(.)/g,function(a,b){var c=b.charCodeAt(0).toString(16).toUpperCase();return c.length<2&&(c="0"+c),"%"+c}))}var e=a("./atob");b.exports=function(a){var b=a.replace(/-/g,"+").replace(/_/g,"/");switch(b.length%4){case 0:break;case 2:b+="==";break;case 3:b+="=";break;default:throw"Illegal base64url string!"}try{return d(b)}catch(c){return e(b)}}},{"./atob":1}],3:[function(a,b,c){"use strict";var d=a("./base64_url_decode");b.exports=function(a,b){if("string"!=typeof a)throw new Error("Invalid token specified");b=b||{};var c=b.header===!0?0:1;return JSON.parse(d(a.split(".")[c]))}},{"./base64_url_decode":2}],4:[function(a,b,c){(function(b){var c=a("./lib/index");"function"==typeof b.window.define&&b.window.define.amd?b.window.define("jwt_decode",function(){return c}):b.window&&(b.window.jwt_decode=c)}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{"./lib/index":3}]},{},[4]);
/*! hellojs v1.14.0 | (c) 2012-2016 Andrew Dodson | MIT https://adodson.com/hello.js/LICENSE */
// ES5 Object.create
if (!Object.create) {

	// Shim, Object create
	// A shim for Object.create(), it adds a prototype to a new object
	Object.create = (function() {

		function F() {}

		return function(o) {

			if (arguments.length != 1) {
				throw new Error('Object.create implementation only accepts one parameter.');
			}

			F.prototype = o;
			return new F();
		};

	})();

}

// ES5 Object.keys
if (!Object.keys) {
	Object.keys = function(o, k, r) {
		r = [];
		for (k in o) {
			if (r.hasOwnProperty.call(o, k))
				r.push(k);
		}

		return r;
	};
}

// ES5 [].indexOf
if (!Array.prototype.indexOf) {
	Array.prototype.indexOf = function(s) {

		for (var j = 0; j < this.length; j++) {
			if (this[j] === s) {
				return j;
			}
		}

		return -1;
	};
}

// ES5 [].forEach
if (!Array.prototype.forEach) {
	Array.prototype.forEach = function(fun/*, thisArg*/) {

		if (this === void 0 || this === null) {
			throw new TypeError();
		}

		var t = Object(this);
		var len = t.length >>> 0;
		if (typeof fun !== 'function') {
			throw new TypeError();
		}

		var thisArg = arguments.length >= 2 ? arguments[1] : void 0;
		for (var i = 0; i < len; i++) {
			if (i in t) {
				fun.call(thisArg, t[i], i, t);
			}
		}

		return this;
	};
}

// ES5 [].filter
if (!Array.prototype.filter) {
	Array.prototype.filter = function(fun, thisArg) {

		var a = [];
		this.forEach(function(val, i, t) {
			if (fun.call(thisArg || void 0, val, i, t)) {
				a.push(val);
			}
		});

		return a;
	};
}

// Production steps of ECMA-262, Edition 5, 15.4.4.19
// Reference: http://es5.github.io/#x15.4.4.19
if (!Array.prototype.map) {

	Array.prototype.map = function(fun, thisArg) {

		var a = [];
		this.forEach(function(val, i, t) {
			a.push(fun.call(thisArg || void 0, val, i, t));
		});

		return a;
	};
}

// ES5 isArray
if (!Array.isArray) {

	// Function Array.isArray
	Array.isArray = function(o) {
		return Object.prototype.toString.call(o) === '[object Array]';
	};

}

// Test for location.assign
if (typeof window === 'object' && typeof window.location === 'object' && !window.location.assign) {

	window.location.assign = function(url) {
		window.location = url;
	};

}

// Test for Function.bind
if (!Function.prototype.bind) {

	// MDN
	// Polyfill IE8, does not support native Function.bind
	Function.prototype.bind = function(b) {

		if (typeof this !== 'function') {
			throw new TypeError('Function.prototype.bind - what is trying to be bound is not callable');
		}

		function C() {}

		var a = [].slice;
		var f = a.call(arguments, 1);
		var _this = this;
		var D = function() {
			return _this.apply(this instanceof C ? this : b || window, f.concat(a.call(arguments)));
		};

		C.prototype = this.prototype;
		D.prototype = new C();

		return D;
	};

}

/**
 * @hello.js
 *
 * HelloJS is a client side Javascript SDK for making OAuth2 logins and subsequent REST calls.
 *
 * @author Andrew Dodson
 * @website https://adodson.com/hello.js/
 *
 * @copyright Andrew Dodson, 2012 - 2015
 * @license MIT: You are free to use and modify this code for any use, on the condition that this copyright notice remains.
 */

var hello = function(name) {
	return hello.use(name);
};

hello.utils = {

	// Extend the first object with the properties and methods of the second
	extend: function(r /*, a[, b[, ...]] */) {

		// Get the arguments as an array but ommit the initial item
		Array.prototype.slice.call(arguments, 1).forEach(function(a) {
			if (Array.isArray(r) && Array.isArray(a)) {
				Array.prototype.push.apply(r, a);
			}
			else if (r instanceof Object && a instanceof Object && r !== a) {
				for (var x in a) {
					r[x] = hello.utils.extend(r[x], a[x]);
				}
			}
			else {

				if (Array.isArray(a)) {
					// Clone it
					a = a.slice(0);
				}

				r = a;
			}
		});

		return r;
	}
};

// Core library
hello.utils.extend(hello, {

	settings: {

		// OAuth2 authentication defaults
		redirect_uri: window.location.href.split('#')[0],
		response_type: 'token',
		display: 'popup',
		state: '',

		// OAuth1 shim
		// The path to the OAuth1 server for signing user requests
		// Want to recreate your own? Checkout https://github.com/MrSwitch/node-oauth-shim
		oauth_proxy: 'https://auth-server.herokuapp.com/proxy',

		// API timeout in milliseconds
		timeout: 20000,

		// Popup Options
		popup: {
			resizable: 1,
			scrollbars: 1,
			width: 500,
			height: 550
		},

		// Default scope
		// Many services require atleast a profile scope,
		// HelloJS automatially includes the value of provider.scope_map.basic
		// If that's not required it can be removed via hello.settings.scope.length = 0;
		scope: ['basic'],

		// Scope Maps
		// This is the default module scope, these are the defaults which each service is mapped too.
		// By including them here it prevents the scope from being applied accidentally
		scope_map: {
			basic: ''
		},

		// Default service / network
		default_service: null,

		// Force authentication
		// When hello.login is fired.
		// (null): ignore current session expiry and continue with login
		// (true): ignore current session expiry and continue with login, ask for user to reauthenticate
		// (false): if the current session looks good for the request scopes return the current session.
		force: null,

		// Page URL
		// When 'display=page' this property defines where the users page should end up after redirect_uri
		// Ths could be problematic if the redirect_uri is indeed the final place,
		// Typically this circumvents the problem of the redirect_url being a dumb relay page.
		page_uri: window.location.href
	},

	// Service configuration objects
	services: {},

	// Use
	// Define a new instance of the HelloJS library with a default service
	use: function(service) {

		// Create self, which inherits from its parent
		var self = Object.create(this);

		// Inherit the prototype from its parent
		self.settings = Object.create(this.settings);

		// Define the default service
		if (service) {
			self.settings.default_service = service;
		}

		// Create an instance of Events
		self.utils.Event.call(self);

		return self;
	},

	// Initialize
	// Define the client_ids for the endpoint services
	// @param object o, contains a key value pair, service => clientId
	// @param object opts, contains a key value pair of options used for defining the authentication defaults
	// @param number timeout, timeout in seconds
	init: function(services, options) {

		var utils = this.utils;

		if (!services) {
			return this.services;
		}

		// Define provider credentials
		// Reformat the ID field
		for (var x in services) {if (services.hasOwnProperty(x)) {
			if (typeof (services[x]) !== 'object') {
				services[x] = {id: services[x]};
			}
		}}

		// Merge services if there already exists some
		utils.extend(this.services, services);

		// Update the default settings with this one.
		if (options) {
			utils.extend(this.settings, options);

			// Do this immediatly incase the browser changes the current path.
			if ('redirect_uri' in options) {
				this.settings.redirect_uri = utils.url(options.redirect_uri).href;
			}
		}

		return this;
	},

	// Login
	// Using the endpoint
	// @param network stringify       name to connect to
	// @param options object    (optional)  {display mode, is either none|popup(default)|page, scope: email,birthday,publish, .. }
	// @param callback  function  (optional)  fired on signin
	login: function() {

		// Create an object which inherits its parent as the prototype and constructs a new event chain.
		var _this = this;
		var utils = _this.utils;
		var error = utils.error;
		var promise = utils.Promise();

		// Get parameters
		var p = utils.args({network: 's', options: 'o', callback: 'f'}, arguments);

		// Local vars
		var url;

		// Get all the custom options and store to be appended to the querystring
		var qs = utils.diffKey(p.options, _this.settings);

		// Merge/override options with app defaults
		var opts = p.options = utils.merge(_this.settings, p.options || {});

		// Merge/override options with app defaults
		opts.popup = utils.merge(_this.settings.popup, p.options.popup || {});

		// Network
		p.network = p.network || _this.settings.default_service;

		// Bind callback to both reject and fulfill states
		promise.proxy.then(p.callback, p.callback);

		// Trigger an event on the global listener
		function emit(s, value) {
			hello.emit(s, value);
		}

		promise.proxy.then(emit.bind(this, 'auth.login auth'), emit.bind(this, 'auth.failed auth'));

		// Is our service valid?
		if (typeof (p.network) !== 'string' || !(p.network in _this.services)) {
			// Trigger the default login.
			// Ahh we dont have one.
			return promise.reject(error('invalid_network', 'The provided network was not recognized'));
		}

		var provider = _this.services[p.network];

		// Create a global listener to capture events triggered out of scope
		var callbackId = utils.globalEvent(function(str) {

			// The responseHandler returns a string, lets save this locally
			var obj;

			if (str) {
				obj = JSON.parse(str);
			}
			else {
				obj = error('cancelled', 'The authentication was not completed');
			}

			// Handle these response using the local
			// Trigger on the parent
			if (!obj.error) {

				// Save on the parent window the new credentials
				// This fixes an IE10 bug i think... atleast it does for me.
				utils.store(obj.network, obj);

				// Fulfill a successful login
				promise.fulfill({
					network: obj.network,
					authResponse: obj
				});
			}
			else {
				// Reject a successful login
				promise.reject(obj);
			}
		});

		var redirectUri = utils.url(opts.redirect_uri).href;

		// May be a space-delimited list of multiple, complementary types
		var responseType = provider.oauth.response_type || opts.response_type;

		// Fallback to token if the module hasn't defined a grant url
		if (/\bcode\b/.test(responseType) && !provider.oauth.grant) {
			responseType = responseType.replace(/\bcode\b/, 'token');
		}

		// Query string parameters, we may pass our own arguments to form the querystring
		p.qs = utils.merge(qs, {
			client_id: encodeURIComponent(provider.id),
			response_type: encodeURIComponent(responseType),
			redirect_uri: encodeURIComponent(redirectUri),
			state: {
				client_id: provider.id,
				network: p.network,
				display: opts.display,
				callback: callbackId,
				state: opts.state,
				redirect_uri: redirectUri
			}
		});

		// Get current session for merging scopes, and for quick auth response
		var session = utils.store(p.network);

		// Scopes (authentication permisions)
		// Ensure this is a string - IE has a problem moving Arrays between windows
		// Append the setup scope
		var SCOPE_SPLIT = /[,\s]+/;

		// Include default scope settings (cloned).
		var scope = _this.settings.scope ? [_this.settings.scope.toString()] : [];

		// Extend the providers scope list with the default
		var scopeMap = utils.merge(_this.settings.scope_map, provider.scope || {});

		// Add user defined scopes...
		if (opts.scope) {
			scope.push(opts.scope.toString());
		}

		// Append scopes from a previous session.
		// This helps keep app credentials constant,
		// Avoiding having to keep tabs on what scopes are authorized
		if (session && 'scope' in session && session.scope instanceof String) {
			scope.push(session.scope);
		}

		// Join and Split again
		scope = scope.join(',').split(SCOPE_SPLIT);

		// Format remove duplicates and empty values
		scope = utils.unique(scope).filter(filterEmpty);

		// Save the the scopes to the state with the names that they were requested with.
		p.qs.state.scope = scope.join(',');

		// Map scopes to the providers naming convention
		scope = scope.map(function(item) {
			// Does this have a mapping?
			return (item in scopeMap) ? scopeMap[item] : item;
		});

		// Stringify and Arrayify so that double mapped scopes are given the chance to be formatted
		scope = scope.join(',').split(SCOPE_SPLIT);

		// Again...
		// Format remove duplicates and empty values
		scope = utils.unique(scope).filter(filterEmpty);

		// Join with the expected scope delimiter into a string
		p.qs.scope = scope.join(provider.scope_delim || ',');

		// Is the user already signed in with the appropriate scopes, valid access_token?
		if (opts.force === false) {

			if (session && 'access_token' in session && session.access_token && 'expires' in session && session.expires > ((new Date()).getTime() / 1e3)) {
				// What is different about the scopes in the session vs the scopes in the new login?
				var diff = utils.diff((session.scope || '').split(SCOPE_SPLIT), (p.qs.state.scope || '').split(SCOPE_SPLIT));
				if (diff.length === 0) {

					// OK trigger the callback
					promise.fulfill({
						unchanged: true,
						network: p.network,
						authResponse: session
					});

					// Nothing has changed
					return promise;
				}
			}
		}

		// Page URL
		if (opts.display === 'page' && opts.page_uri) {
			// Add a page location, place to endup after session has authenticated
			p.qs.state.page_uri = utils.url(opts.page_uri).href;
		}

		// Bespoke
		// Override login querystrings from auth_options
		if ('login' in provider && typeof (provider.login) === 'function') {
			// Format the paramaters according to the providers formatting function
			provider.login(p);
		}

		// Add OAuth to state
		// Where the service is going to take advantage of the oauth_proxy
		if (!/\btoken\b/.test(responseType) ||
		parseInt(provider.oauth.version, 10) < 2 ||
		(opts.display === 'none' && provider.oauth.grant && session && session.refresh_token)) {

			// Add the oauth endpoints
			p.qs.state.oauth = provider.oauth;

			// Add the proxy url
			p.qs.state.oauth_proxy = opts.oauth_proxy;

		}

		// Convert state to a string
		p.qs.state = encodeURIComponent(JSON.stringify(p.qs.state));

		// URL
		if (parseInt(provider.oauth.version, 10) === 1) {

			// Turn the request to the OAuth Proxy for 3-legged auth
			url = utils.qs(opts.oauth_proxy, p.qs, encodeFunction);
		}

		// Refresh token
		else if (opts.display === 'none' && provider.oauth.grant && session && session.refresh_token) {

			// Add the refresh_token to the request
			p.qs.refresh_token = session.refresh_token;

			// Define the request path
			url = utils.qs(opts.oauth_proxy, p.qs, encodeFunction);
		}
		else {
			url = utils.qs(provider.oauth.auth, p.qs, encodeFunction);
		}

		// Broadcast this event as an auth:init
		emit('auth.init', p);

		// Execute
		// Trigger how we want self displayed
		if (opts.display === 'none') {
			// Sign-in in the background, iframe
			utils.iframe(url, redirectUri);
		}

		// Triggering popup?
		else if (opts.display === 'popup') {

			var popup = utils.popup(url, redirectUri, opts.popup);

			var timer = setInterval(function() {
				if (!popup || popup.closed) {
					clearInterval(timer);
					if (!promise.state) {

						var response = error('cancelled', 'Login has been cancelled');

						if (!popup) {
							response = error('blocked', 'Popup was blocked');
						}

						response.network = p.network;

						promise.reject(response);
					}
				}
			}, 100);
		}

		else {
			window.location = url;
		}

		return promise.proxy;

		function encodeFunction(s) {return s;}

		function filterEmpty(s) {return !!s;}
	},

	// Remove any data associated with a given service
	// @param string name of the service
	// @param function callback
	logout: function() {

		var _this = this;
		var utils = _this.utils;
		var error = utils.error;

		// Create a new promise
		var promise = utils.Promise();

		var p = utils.args({name:'s', options: 'o', callback: 'f'}, arguments);

		p.options = p.options || {};

		// Add callback to events
		promise.proxy.then(p.callback, p.callback);

		// Trigger an event on the global listener
		function emit(s, value) {
			hello.emit(s, value);
		}

		promise.proxy.then(emit.bind(this, 'auth.logout auth'), emit.bind(this, 'error'));

		// Network
		p.name = p.name || this.settings.default_service;
		p.authResponse = utils.store(p.name);

		if (p.name && !(p.name in _this.services)) {

			promise.reject(error('invalid_network', 'The network was unrecognized'));

		}
		else if (p.name && p.authResponse) {

			// Define the callback
			var callback = function(opts) {

				// Remove from the store
				utils.store(p.name, null);

				// Emit events by default
				promise.fulfill(hello.utils.merge({network:p.name}, opts || {}));
			};

			// Run an async operation to remove the users session
			var _opts = {};
			if (p.options.force) {
				var logout = _this.services[p.name].logout;
				if (logout) {
					// Convert logout to URL string,
					// If no string is returned, then this function will handle the logout async style
					if (typeof (logout) === 'function') {
						logout = logout(callback, p);
					}

					// If logout is a string then assume URL and open in iframe.
					if (typeof (logout) === 'string') {
						utils.iframe(logout);
						_opts.force = null;
						_opts.message = 'Logout success on providers site was indeterminate';
					}
					else if (logout === undefined) {
						// The callback function will handle the response.
						return promise.proxy;
					}
				}
			}

			// Remove local credentials
			callback(_opts);
		}
		else {
			promise.reject(error('invalid_session', 'There was no session to remove'));
		}

		return promise.proxy;
	},

	// Returns all the sessions that are subscribed too
	// @param string optional, name of the service to get information about.
	getAuthResponse: function(service) {

		// If the service doesn't exist
		service = service || this.settings.default_service;

		if (!service || !(service in this.services)) {
			return null;
		}

		return this.utils.store(service) || null;
	},

	// Events: placeholder for the events
	events: {}
});

// Core utilities
hello.utils.extend(hello.utils, {

	// Error
	error: function(code, message) {
		return {
			error: {
				code: code,
				message: message
			}
		};
	},

	// Append the querystring to a url
	// @param string url
	// @param object parameters
	qs: function(url, params, formatFunction) {

		if (params) {

			// Set default formatting function
			formatFunction = formatFunction || encodeURIComponent;

			// Override the items in the URL which already exist
			for (var x in params) {
				var str = '([\\?\\&])' + x + '=[^\\&]*';
				var reg = new RegExp(str);
				if (url.match(reg)) {
					url = url.replace(reg, '$1' + x + '=' + formatFunction(params[x]));
					delete params[x];
				}
			}
		}

		if (!this.isEmpty(params)) {
			return url + (url.indexOf('?') > -1 ? '&' : '?') + this.param(params, formatFunction);
		}

		return url;
	},

	// Param
	// Explode/encode the parameters of an URL string/object
	// @param string s, string to decode
	param: function(s, formatFunction) {
		var b;
		var a = {};
		var m;

		if (typeof (s) === 'string') {

			formatFunction = formatFunction || decodeURIComponent;

			m = s.replace(/^[\#\?]/, '').match(/([^=\/\&]+)=([^\&]+)/g);
			if (m) {
				for (var i = 0; i < m.length; i++) {
					b = m[i].match(/([^=]+)=(.*)/);
					a[b[1]] = formatFunction(b[2]);
				}
			}

			return a;
		}
		else {

			formatFunction = formatFunction || encodeURIComponent;

			var o = s;

			a = [];

			for (var x in o) {if (o.hasOwnProperty(x)) {
				if (o.hasOwnProperty(x)) {
					a.push([x, o[x] === '?' ? '?' : formatFunction(o[x])].join('='));
				}
			}}

			return a.join('&');
		}
	},

	// Local storage facade
	store: (function() {

		var a = ['localStorage', 'sessionStorage'];
		var i = -1;
		var prefix = 'test';

		// Set LocalStorage
		var localStorage;

		while (a[++i]) {
			try {
				// In Chrome with cookies blocked, calling localStorage throws an error
				localStorage = window[a[i]];
				localStorage.setItem(prefix + i, i);
				localStorage.removeItem(prefix + i);
				break;
			}
			catch (e) {
				localStorage = null;
			}
		}

		if (!localStorage) {

			var cache = null;

			localStorage = {
				getItem: function(prop) {
					prop = prop + '=';
					var m = document.cookie.split(';');
					for (var i = 0; i < m.length; i++) {
						var _m = m[i].replace(/(^\s+|\s+$)/, '');
						if (_m && _m.indexOf(prop) === 0) {
							return _m.substr(prop.length);
						}
					}

					return cache;
				},

				setItem: function(prop, value) {
					cache = value;
					document.cookie = prop + '=' + value;
				}
			};

			// Fill the cache up
			cache = localStorage.getItem('hello');
		}

		function get() {
			var json = {};
			try {
				json = JSON.parse(localStorage.getItem('hello')) || {};
			}
			catch (e) {}

			return json;
		}

		function set(json) {
			localStorage.setItem('hello', JSON.stringify(json));
		}

		// Check if the browser support local storage
		return function(name, value, days) {

			// Local storage
			var json = get();

			if (name && value === undefined) {
				return json[name] || null;
			}
			else if (name && value === null) {
				try {
					delete json[name];
				}
				catch (e) {
					json[name] = null;
				}
			}
			else if (name) {
				json[name] = value;
			}
			else {
				return json;
			}

			set(json);

			return json || null;
		};

	})(),

	// Create and Append new DOM elements
	// @param node string
	// @param attr object literal
	// @param dom/string
	append: function(node, attr, target) {

		var n = typeof (node) === 'string' ? document.createElement(node) : node;

		if (typeof (attr) === 'object') {
			if ('tagName' in attr) {
				target = attr;
			}
			else {
				for (var x in attr) {if (attr.hasOwnProperty(x)) {
					if (typeof (attr[x]) === 'object') {
						for (var y in attr[x]) {if (attr[x].hasOwnProperty(y)) {
							n[x][y] = attr[x][y];
						}}
					}
					else if (x === 'html') {
						n.innerHTML = attr[x];
					}

					// IE doesn't like us setting methods with setAttribute
					else if (!/^on/.test(x)) {
						n.setAttribute(x, attr[x]);
					}
					else {
						n[x] = attr[x];
					}
				}}
			}
		}

		if (target === 'body') {
			(function self() {
				if (document.body) {
					document.body.appendChild(n);
				}
				else {
					setTimeout(self, 16);
				}
			})();
		}
		else if (typeof (target) === 'object') {
			target.appendChild(n);
		}
		else if (typeof (target) === 'string') {
			document.getElementsByTagName(target)[0].appendChild(n);
		}

		return n;
	},

	// An easy way to create a hidden iframe
	// @param string src
	iframe: function(src) {
		this.append('iframe', {src: src, style: {position:'absolute', left: '-1000px', bottom: 0, height: '1px', width: '1px'}}, 'body');
	},

	// Recursive merge two objects into one, second parameter overides the first
	// @param a array
	merge: function(/* Args: a, b, c, .. n */) {
		var args = Array.prototype.slice.call(arguments);
		args.unshift({});
		return this.extend.apply(null, args);
	},

	// Makes it easier to assign parameters, where some are optional
	// @param o object
	// @param a arguments
	args: function(o, args) {

		var p = {};
		var i = 0;
		var t = null;
		var x = null;

		// 'x' is the first key in the list of object parameters
		for (x in o) {if (o.hasOwnProperty(x)) {
			break;
		}}

		// Passing in hash object of arguments?
		// Where the first argument can't be an object
		if ((args.length === 1) && (typeof (args[0]) === 'object') && o[x] != 'o!') {

			// Could this object still belong to a property?
			// Check the object keys if they match any of the property keys
			for (x in args[0]) {if (o.hasOwnProperty(x)) {
				// Does this key exist in the property list?
				if (x in o) {
					// Yes this key does exist so its most likely this function has been invoked with an object parameter
					// Return first argument as the hash of all arguments
					return args[0];
				}
			}}
		}

		// Else loop through and account for the missing ones.
		for (x in o) {if (o.hasOwnProperty(x)) {

			t = typeof (args[i]);

			if ((typeof (o[x]) === 'function' && o[x].test(args[i])) || (typeof (o[x]) === 'string' && (
			(o[x].indexOf('s') > -1 && t === 'string') ||
			(o[x].indexOf('o') > -1 && t === 'object') ||
			(o[x].indexOf('i') > -1 && t === 'number') ||
			(o[x].indexOf('a') > -1 && t === 'object') ||
			(o[x].indexOf('f') > -1 && t === 'function')
			))
			) {
				p[x] = args[i++];
			}

			else if (typeof (o[x]) === 'string' && o[x].indexOf('!') > -1) {
				return false;
			}
		}}

		return p;
	},

	// Returns a URL instance
	url: function(path) {

		// If the path is empty
		if (!path) {
			return window.location;
		}

		// Chrome and FireFox support new URL() to extract URL objects
		else if (window.URL && URL instanceof Function && URL.length !== 0) {
			return new URL(path, window.location);
		}

		// Ugly shim, it works!
		else {
			var a = document.createElement('a');
			a.href = path;
			return a.cloneNode(false);
		}
	},

	diff: function(a, b) {
		return b.filter(function(item) {
			return a.indexOf(item) === -1;
		});
	},

	// Get the different hash of properties unique to `a`, and not in `b`
	diffKey: function(a, b) {
		if (a || !b) {
			var r = {};
			for (var x in a) {
				// Does the property not exist?
				if (!(x in b)) {
					r[x] = a[x];
				}
			}

			return r;
		}

		return a;
	},

	// Unique
	// Remove duplicate and null values from an array
	// @param a array
	unique: function(a) {
		if (!Array.isArray(a)) { return []; }

		return a.filter(function(item, index) {
			// Is this the first location of item
			return a.indexOf(item) === index;
		});
	},

	isEmpty: function(obj) {

		// Scalar
		if (!obj)
			return true;

		// Array
		if (Array.isArray(obj)) {
			return !obj.length;
		}
		else if (typeof (obj) === 'object') {
			// Object
			for (var key in obj) {
				if (obj.hasOwnProperty(key)) {
					return false;
				}
			}
		}

		return true;
	},

	//jscs:disable

	/*!
	 **  Thenable -- Embeddable Minimum Strictly-Compliant Promises/A+ 1.1.1 Thenable
	 **  Copyright (c) 2013-2014 Ralf S. Engelschall <http://engelschall.com>
	 **  Licensed under The MIT License <http://opensource.org/licenses/MIT>
	 **  Source-Code distributed on <http://github.com/rse/thenable>
	 */
	Promise: (function(){
		/*  promise states [Promises/A+ 2.1]  */
		var STATE_PENDING   = 0;                                         /*  [Promises/A+ 2.1.1]  */
		var STATE_FULFILLED = 1;                                         /*  [Promises/A+ 2.1.2]  */
		var STATE_REJECTED  = 2;                                         /*  [Promises/A+ 2.1.3]  */

		/*  promise object constructor  */
		var api = function (executor) {
			/*  optionally support non-constructor/plain-function call  */
			if (!(this instanceof api))
				return new api(executor);

			/*  initialize object  */
			this.id           = "Thenable/1.0.6";
			this.state        = STATE_PENDING; /*  initial state  */
			this.fulfillValue = undefined;     /*  initial value  */     /*  [Promises/A+ 1.3, 2.1.2.2]  */
			this.rejectReason = undefined;     /*  initial reason */     /*  [Promises/A+ 1.5, 2.1.3.2]  */
			this.onFulfilled  = [];            /*  initial handlers  */
			this.onRejected   = [];            /*  initial handlers  */

			/*  provide optional information-hiding proxy  */
			this.proxy = {
				then: this.then.bind(this)
			};

			/*  support optional executor function  */
			if (typeof executor === "function")
				executor.call(this, this.fulfill.bind(this), this.reject.bind(this));
		};

		/*  promise API methods  */
		api.prototype = {
			/*  promise resolving methods  */
			fulfill: function (value) { return deliver(this, STATE_FULFILLED, "fulfillValue", value); },
			reject:  function (value) { return deliver(this, STATE_REJECTED,  "rejectReason", value); },

			/*  "The then Method" [Promises/A+ 1.1, 1.2, 2.2]  */
			then: function (onFulfilled, onRejected) {
				var curr = this;
				var next = new api();                                    /*  [Promises/A+ 2.2.7]  */
				curr.onFulfilled.push(
					resolver(onFulfilled, next, "fulfill"));             /*  [Promises/A+ 2.2.2/2.2.6]  */
				curr.onRejected.push(
					resolver(onRejected,  next, "reject" ));             /*  [Promises/A+ 2.2.3/2.2.6]  */
				execute(curr);
				return next.proxy;                                       /*  [Promises/A+ 2.2.7, 3.3]  */
			}
		};

		/*  deliver an action  */
		var deliver = function (curr, state, name, value) {
			if (curr.state === STATE_PENDING) {
				curr.state = state;                                      /*  [Promises/A+ 2.1.2.1, 2.1.3.1]  */
				curr[name] = value;                                      /*  [Promises/A+ 2.1.2.2, 2.1.3.2]  */
				execute(curr);
			}
			return curr;
		};

		/*  execute all handlers  */
		var execute = function (curr) {
			if (curr.state === STATE_FULFILLED)
				execute_handlers(curr, "onFulfilled", curr.fulfillValue);
			else if (curr.state === STATE_REJECTED)
				execute_handlers(curr, "onRejected",  curr.rejectReason);
		};

		/*  execute particular set of handlers  */
		var execute_handlers = function (curr, name, value) {
			/* global process: true */
			/* global setImmediate: true */
			/* global setTimeout: true */

			/*  short-circuit processing  */
			if (curr[name].length === 0)
				return;

			/*  iterate over all handlers, exactly once  */
			var handlers = curr[name];
			curr[name] = [];                                             /*  [Promises/A+ 2.2.2.3, 2.2.3.3]  */
			var func = function () {
				for (var i = 0; i < handlers.length; i++)
					handlers[i](value);                                  /*  [Promises/A+ 2.2.5]  */
			};

			/*  execute procedure asynchronously  */                     /*  [Promises/A+ 2.2.4, 3.1]  */
			if (typeof process === "object" && typeof process.nextTick === "function")
				process.nextTick(func);
			else if (typeof setImmediate === "function")
				setImmediate(func);
			else
				setTimeout(func, 0);
		};

		/*  generate a resolver function  */
		var resolver = function (cb, next, method) {
			return function (value) {
				if (typeof cb !== "function")                            /*  [Promises/A+ 2.2.1, 2.2.7.3, 2.2.7.4]  */
					next[method].call(next, value);                      /*  [Promises/A+ 2.2.7.3, 2.2.7.4]  */
				else {
					var result;
					try { result = cb(value); }                          /*  [Promises/A+ 2.2.2.1, 2.2.3.1, 2.2.5, 3.2]  */
					catch (e) {
						next.reject(e);                                  /*  [Promises/A+ 2.2.7.2]  */
						return;
					}
					resolve(next, result);                               /*  [Promises/A+ 2.2.7.1]  */
				}
			};
		};

		/*  "Promise Resolution Procedure"  */                           /*  [Promises/A+ 2.3]  */
		var resolve = function (promise, x) {
			/*  sanity check arguments  */                               /*  [Promises/A+ 2.3.1]  */
			if (promise === x || promise.proxy === x) {
				promise.reject(new TypeError("cannot resolve promise with itself"));
				return;
			}

			/*  surgically check for a "then" method
				(mainly to just call the "getter" of "then" only once)  */
			var then;
			if ((typeof x === "object" && x !== null) || typeof x === "function") {
				try { then = x.then; }                                   /*  [Promises/A+ 2.3.3.1, 3.5]  */
				catch (e) {
					promise.reject(e);                                   /*  [Promises/A+ 2.3.3.2]  */
					return;
				}
			}

			/*  handle own Thenables    [Promises/A+ 2.3.2]
				and similar "thenables" [Promises/A+ 2.3.3]  */
			if (typeof then === "function") {
				var resolved = false;
				try {
					/*  call retrieved "then" method */                  /*  [Promises/A+ 2.3.3.3]  */
					then.call(x,
						/*  resolvePromise  */                           /*  [Promises/A+ 2.3.3.3.1]  */
						function (y) {
							if (resolved) return; resolved = true;       /*  [Promises/A+ 2.3.3.3.3]  */
							if (y === x)                                 /*  [Promises/A+ 3.6]  */
								promise.reject(new TypeError("circular thenable chain"));
							else
								resolve(promise, y);
						},

						/*  rejectPromise  */                            /*  [Promises/A+ 2.3.3.3.2]  */
						function (r) {
							if (resolved) return; resolved = true;       /*  [Promises/A+ 2.3.3.3.3]  */
							promise.reject(r);
						}
					);
				}
				catch (e) {
					if (!resolved)                                       /*  [Promises/A+ 2.3.3.3.3]  */
						promise.reject(e);                               /*  [Promises/A+ 2.3.3.3.4]  */
				}
				return;
			}

			/*  handle other values  */
			promise.fulfill(x);                                          /*  [Promises/A+ 2.3.4, 2.3.3.4]  */
		};

		/*  export API  */
		return api;
	})(),

	//jscs:enable

	// Event
	// A contructor superclass for adding event menthods, on, off, emit.
	Event: function() {

		var separator = /[\s\,]+/;

		// If this doesn't support getPrototype then we can't get prototype.events of the parent
		// So lets get the current instance events, and add those to a parent property
		this.parent = {
			events: this.events,
			findEvents: this.findEvents,
			parent: this.parent,
			utils: this.utils
		};

		this.events = {};

		// On, subscribe to events
		// @param evt   string
		// @param callback  function
		this.on = function(evt, callback) {

			if (callback && typeof (callback) === 'function') {
				var a = evt.split(separator);
				for (var i = 0; i < a.length; i++) {

					// Has this event already been fired on this instance?
					this.events[a[i]] = [callback].concat(this.events[a[i]] || []);
				}
			}

			return this;
		};

		// Off, unsubscribe to events
		// @param evt   string
		// @param callback  function
		this.off = function(evt, callback) {

			this.findEvents(evt, function(name, index) {
				if (!callback || this.events[name][index] === callback) {
					this.events[name][index] = null;
				}
			});

			return this;
		};

		// Emit
		// Triggers any subscribed events
		this.emit = function(evt /*, data, ... */) {

			// Get arguments as an Array, knock off the first one
			var args = Array.prototype.slice.call(arguments, 1);
			args.push(evt);

			// Handler
			var handler = function(name, index) {

				// Replace the last property with the event name
				args[args.length - 1] = (name === '*' ? evt : name);

				// Trigger
				this.events[name][index].apply(this, args);
			};

			// Find the callbacks which match the condition and call
			var _this = this;
			while (_this && _this.findEvents) {

				// Find events which match
				_this.findEvents(evt + ',*', handler);
				_this = _this.parent;
			}

			return this;
		};

		//
		// Easy functions
		this.emitAfter = function() {
			var _this = this;
			var args = arguments;
			setTimeout(function() {
				_this.emit.apply(_this, args);
			}, 0);

			return this;
		};

		this.findEvents = function(evt, callback) {

			var a = evt.split(separator);

			for (var name in this.events) {if (this.events.hasOwnProperty(name)) {

				if (a.indexOf(name) > -1) {

					for (var i = 0; i < this.events[name].length; i++) {

						// Does the event handler exist?
						if (this.events[name][i]) {
							// Emit on the local instance of this
							callback.call(this, name, i);
						}
					}
				}
			}}
		};

		return this;
	},

	// Global Events
	// Attach the callback to the window object
	// Return its unique reference
	globalEvent: function(callback, guid) {
		// If the guid has not been supplied then create a new one.
		guid = guid || '_hellojs_' + parseInt(Math.random() * 1e12, 10).toString(36);

		// Define the callback function
		window[guid] = function() {
			// Trigger the callback
			try {
				if (callback.apply(this, arguments)) {
					delete window[guid];
				}
			}
			catch (e) {
				console.error(e);
			}
		};

		return guid;
	},

	// Trigger a clientside popup
	// This has been augmented to support PhoneGap
	popup: function(url, redirectUri, options) {

		var documentElement = document.documentElement;

		// Multi Screen Popup Positioning (http://stackoverflow.com/a/16861050)
		// Credit: http://www.xtf.dk/2011/08/center-new-popup-window-even-on.html
		// Fixes dual-screen position                         Most browsers      Firefox

		if (options.height) {
			var dualScreenTop = window.screenTop !== undefined ? window.screenTop : screen.top;
			var height = screen.height || window.innerHeight || documentElement.clientHeight;
			options.top = parseInt((height - options.height) / 2, 10) + dualScreenTop;
		}

		if (options.width) {
			var dualScreenLeft = window.screenLeft !== undefined ? window.screenLeft : screen.left;
			var width = screen.width || window.innerWidth || documentElement.clientWidth;
			options.left = parseInt((width - options.width) / 2, 10) + dualScreenLeft;
		}

		// Convert options into an array
		var optionsArray = [];
		Object.keys(options).forEach(function(name) {
			var value = options[name];
			optionsArray.push(name + (value !== null ? '=' + value : ''));
		});

		// Call the open() function with the initial path
		//
		// OAuth redirect, fixes URI fragments from being lost in Safari
		// (URI Fragments within 302 Location URI are lost over HTTPS)
		// Loading the redirect.html before triggering the OAuth Flow seems to fix it.
		//
		// Firefox  decodes URL fragments when calling location.hash.
		//  - This is bad if the value contains break points which are escaped
		//  - Hence the url must be encoded twice as it contains breakpoints.
		if (navigator.userAgent.indexOf('Safari') !== -1 && navigator.userAgent.indexOf('Chrome') === -1) {
			url = redirectUri + '#oauth_redirect=' + encodeURIComponent(encodeURIComponent(url));
		}

		var popup = window.open(
			url,
			'_blank',
			optionsArray.join(',')
		);

		if (popup && popup.focus) {
			popup.focus();
		}

		return popup;
	},

	// OAuth and API response handler
	responseHandler: function(window, parent) {

		var _this = this;
		var p;
		var location = window.location;

		// Is this an auth relay message which needs to call the proxy?
		p = _this.param(location.search);

		// OAuth2 or OAuth1 server response?
		if (p && p.state && (p.code || p.oauth_token)) {

			var state = JSON.parse(p.state);

			// Add this path as the redirect_uri
			p.redirect_uri = state.redirect_uri || location.href.replace(/[\?\#].*$/, '');

			// Redirect to the host
			var path = state.oauth_proxy + '?' + _this.param(p);

			location.assign(path);

			return;
		}

		// Save session, from redirected authentication
		// #access_token has come in?
		//
		// FACEBOOK is returning auth errors within as a query_string... thats a stickler for consistency.
		// SoundCloud is the state in the querystring and the token in the hashtag, so we'll mix the two together

		p = _this.merge(_this.param(location.search || ''), _this.param(location.hash || ''));

		// If p.state
		if (p && 'state' in p) {

			// Remove any addition information
			// E.g. p.state = 'facebook.page';
			try {
				var a = JSON.parse(p.state);
				_this.extend(p, a);
			}
			catch (e) {
				console.error('Could not decode state parameter');
			}

			// Access_token?
			if (('access_token' in p && p.access_token) && p.network) {

				if (!p.expires_in || parseInt(p.expires_in, 10) === 0) {
					// If p.expires_in is unset, set to 0
					p.expires_in = 0;
				}

				p.expires_in = parseInt(p.expires_in, 10);
				p.expires = ((new Date()).getTime() / 1e3) + (p.expires_in || (60 * 60 * 24 * 365));

				// Lets use the "state" to assign it to one of our networks
				authCallback(p, window, parent);
			}

			// Error=?
			// &error_description=?
			// &state=?
			else if (('error' in p && p.error) && p.network) {

				p.error = {
					code: p.error,
					message: p.error_message || p.error_description
				};

				// Let the state handler handle it
				authCallback(p, window, parent);
			}

			// API call, or a cancelled login
			// Result is serialized JSON string
			else if (p.callback && p.callback in parent) {

				// Trigger a function in the parent
				var res = 'result' in p && p.result ? JSON.parse(p.result) : false;

				// Trigger the callback on the parent
				callback(parent, p.callback)(res);
				closeWindow();
			}

			// If this page is still open
			if (p.page_uri) {
				location.assign(p.page_uri);
			}
		}

		// OAuth redirect, fixes URI fragments from being lost in Safari
		// (URI Fragments within 302 Location URI are lost over HTTPS)
		// Loading the redirect.html before triggering the OAuth Flow seems to fix it.
		else if ('oauth_redirect' in p) {

			location.assign(decodeURIComponent(p.oauth_redirect));
			return;
		}

		// Trigger a callback to authenticate
		function authCallback(obj, window, parent) {

			var cb = obj.callback;
			var network = obj.network;

			// Trigger the callback on the parent
			_this.store(network, obj);

			// If this is a page request it has no parent or opener window to handle callbacks
			if (('display' in obj) && obj.display === 'page') {
				return;
			}

			// Remove from session object
			if (parent && cb && cb in parent) {

				try {
					delete obj.callback;
				}
				catch (e) {}

				// Update store
				_this.store(network, obj);

				// Call the globalEvent function on the parent
				// It's safer to pass back a string to the parent,
				// Rather than an object/array (better for IE8)
				var str = JSON.stringify(obj);

				try {
					callback(parent, cb)(str);
				}
				catch (e) {
					// Error thrown whilst executing parent callback
				}
			}

			closeWindow();
		}

		function callback(parent, callbackID) {
			if (callbackID.indexOf('_hellojs_') !== 0) {
				return function() {
					throw 'Could not execute callback ' + callbackID;
				};
			}

			return parent[callbackID];
		}

		function closeWindow() {

			if (window.frameElement) {
				// Inside an iframe, remove from parent
				parent.document.body.removeChild(window.frameElement);
			}
			else {
				// Close this current window
				try {
					window.close();
				}
				catch (e) {}

				// IOS bug wont let us close a popup if still loading
				if (window.addEventListener) {
					window.addEventListener('load', function() {
						window.close();
					});
				}
			}

		}
	}
});

// Events
// Extend the hello object with its own event instance
hello.utils.Event.call(hello);

///////////////////////////////////
// Monitoring session state
// Check for session changes
///////////////////////////////////

(function(hello) {

	// Monitor for a change in state and fire
	var oldSessions = {};

	// Hash of expired tokens
	var expired = {};

	// Listen to other triggers to Auth events, use these to update this
	hello.on('auth.login, auth.logout', function(auth) {
		if (auth && typeof (auth) === 'object' && auth.network) {
			oldSessions[auth.network] = hello.utils.store(auth.network) || {};
		}
	});

	(function self() {

		var CURRENT_TIME = ((new Date()).getTime() / 1e3);
		var emit = function(eventName) {
			hello.emit('auth.' + eventName, {
				network: name,
				authResponse: session
			});
		};

		// Loop through the services
		for (var name in hello.services) {if (hello.services.hasOwnProperty(name)) {

			if (!hello.services[name].id) {
				// We haven't attached an ID so dont listen.
				continue;
			}

			// Get session
			var session = hello.utils.store(name) || {};
			var provider = hello.services[name];
			var oldSess = oldSessions[name] || {};

			// Listen for globalEvents that did not get triggered from the child
			if (session && 'callback' in session) {

				// To do remove from session object...
				var cb = session.callback;
				try {
					delete session.callback;
				}
				catch (e) {}

				// Update store
				// Removing the callback
				hello.utils.store(name, session);

				// Emit global events
				try {
					window[cb](session);
				}
				catch (e) {}
			}

			// Refresh token
			if (session && ('expires' in session) && session.expires < CURRENT_TIME) {

				// If auto refresh is possible
				// Either the browser supports
				var refresh = provider.refresh || session.refresh_token;

				// Has the refresh been run recently?
				if (refresh && (!(name in expired) || expired[name] < CURRENT_TIME)) {
					// Try to resignin
					hello.emit('notice', name + ' has expired trying to resignin');
					hello.login(name, {display: 'none', force: false});

					// Update expired, every 10 minutes
					expired[name] = CURRENT_TIME + 600;
				}

				// Does this provider not support refresh
				else if (!refresh && !(name in expired)) {
					// Label the event
					emit('expired');
					expired[name] = true;
				}

				// If session has expired then we dont want to store its value until it can be established that its been updated
				continue;
			}

			// Has session changed?
			else if (oldSess.access_token === session.access_token &&
			oldSess.expires === session.expires) {
				continue;
			}

			// Access_token has been removed
			else if (!session.access_token && oldSess.access_token) {
				emit('logout');
			}

			// Access_token has been created
			else if (session.access_token && !oldSess.access_token) {
				emit('login');
			}

			// Access_token has been updated
			else if (session.expires !== oldSess.expires) {
				emit('update');
			}

			// Updated stored session
			oldSessions[name] = session;

			// Remove the expired flags
			if (name in expired) {
				delete expired[name];
			}
		}}

		// Check error events
		setTimeout(self, 1000);
	})();

})(hello);

// EOF CORE lib
//////////////////////////////////

/////////////////////////////////////////
// API
// @param path    string
// @param query   object (optional)
// @param method  string (optional)
// @param data    object (optional)
// @param timeout integer (optional)
// @param callback  function (optional)

hello.api = function() {

	// Shorthand
	var _this = this;
	var utils = _this.utils;
	var error = utils.error;

	// Construct a new Promise object
	var promise = utils.Promise();

	// Arguments
	var p = utils.args({path: 's!', query: 'o', method: 's', data: 'o', timeout: 'i', callback: 'f'}, arguments);

	// Method
	p.method = (p.method || 'get').toLowerCase();

	// Headers
	p.headers = p.headers || {};

	// Query
	p.query = p.query || {};

	// If get, put all parameters into query
	if (p.method === 'get' || p.method === 'delete') {
		utils.extend(p.query, p.data);
		p.data = {};
	}

	var data = p.data = p.data || {};

	// Completed event callback
	promise.then(p.callback, p.callback);

	// Remove the network from path, e.g. facebook:/me/friends
	// Results in { network : facebook, path : me/friends }
	if (!p.path) {
		return promise.reject(error('invalid_path', 'Missing the path parameter from the request'));
	}

	p.path = p.path.replace(/^\/+/, '');
	var a = (p.path.split(/[\/\:]/, 2) || [])[0].toLowerCase();

	if (a in _this.services) {
		p.network = a;
		var reg = new RegExp('^' + a + ':?\/?');
		p.path = p.path.replace(reg, '');
	}

	// Network & Provider
	// Define the network that this request is made for
	p.network = _this.settings.default_service = p.network || _this.settings.default_service;
	var o = _this.services[p.network];

	// INVALID
	// Is there no service by the given network name?
	if (!o) {
		return promise.reject(error('invalid_network', 'Could not match the service requested: ' + p.network));
	}

	// PATH
	// As long as the path isn't flagged as unavaiable, e.g. path == false

	if (!(!(p.method in o) || !(p.path in o[p.method]) || o[p.method][p.path] !== false)) {
		return promise.reject(error('invalid_path', 'The provided path is not available on the selected network'));
	}

	// PROXY
	// OAuth1 calls always need a proxy

	if (!p.oauth_proxy) {
		p.oauth_proxy = _this.settings.oauth_proxy;
	}

	if (!('proxy' in p)) {
		p.proxy = p.oauth_proxy && o.oauth && parseInt(o.oauth.version, 10) === 1;
	}

	// TIMEOUT
	// Adopt timeout from global settings by default

	if (!('timeout' in p)) {
		p.timeout = _this.settings.timeout;
	}

	// Format response
	// Whether to run the raw response through post processing.
	if (!('formatResponse' in p)) {
		p.formatResponse = true;
	}

	// Get the current session
	// Append the access_token to the query
	p.authResponse = _this.getAuthResponse(p.network);
	if (p.authResponse && p.authResponse.access_token) {
		p.query.access_token = p.authResponse.access_token;
	}

	var url = p.path;
	var m;

	// Store the query as options
	// This is used to populate the request object before the data is augmented by the prewrap handlers.
	p.options = utils.clone(p.query);

	// Clone the data object
	// Prevent this script overwriting the data of the incoming object.
	// Ensure that everytime we run an iteration the callbacks haven't removed some data
	p.data = utils.clone(data);

	// URL Mapping
	// Is there a map for the given URL?
	var actions = o[{'delete': 'del'}[p.method] || p.method] || {};

	// Extrapolate the QueryString
	// Provide a clean path
	// Move the querystring into the data
	if (p.method === 'get') {

		var query = url.split(/[\?#]/)[1];
		if (query) {
			utils.extend(p.query, utils.param(query));

			// Remove the query part from the URL
			url = url.replace(/\?.*?(#|$)/, '$1');
		}
	}

	// Is the hash fragment defined
	if ((m = url.match(/#(.+)/, ''))) {
		url = url.split('#')[0];
		p.path = m[1];
	}
	else if (url in actions) {
		p.path = url;
		url = actions[url];
	}
	else if ('default' in actions) {
		url = actions['default'];
	}

	// Redirect Handler
	// This defines for the Form+Iframe+Hash hack where to return the results too.
	p.redirect_uri = _this.settings.redirect_uri;

	// Define FormatHandler
	// The request can be procesed in a multitude of ways
	// Here's the options - depending on the browser and endpoint
	p.xhr = o.xhr;
	p.jsonp = o.jsonp;
	p.form = o.form;

	// Make request
	if (typeof (url) === 'function') {
		// Does self have its own callback?
		url(p, getPath);
	}
	else {
		// Else the URL is a string
		getPath(url);
	}

	return promise.proxy;

	// If url needs a base
	// Wrap everything in
	function getPath(url) {

		// Format the string if it needs it
		url = url.replace(/\@\{([a-z\_\-]+)(\|.*?)?\}/gi, function(m, key, defaults) {
			var val = defaults ? defaults.replace(/^\|/, '') : '';
			if (key in p.query) {
				val = p.query[key];
				delete p.query[key];
			}
			else if (p.data && key in p.data) {
				val = p.data[key];
				delete p.data[key];
			}
			else if (!defaults) {
				promise.reject(error('missing_attribute', 'The attribute ' + key + ' is missing from the request'));
			}

			return val;
		});

		// Add base
		if (!url.match(/^https?:\/\//)) {
			url = o.base + url;
		}

		// Define the request URL
		p.url = url;

		// Make the HTTP request with the curated request object
		// CALLBACK HANDLER
		// @ response object
		// @ statusCode integer if available
		utils.request(p, function(r, headers) {

			// Is this a raw response?
			if (!p.formatResponse) {
				// Bad request? error statusCode or otherwise contains an error response vis JSONP?
				if (typeof headers === 'object' ? (headers.statusCode >= 400) : (typeof r === 'object' && 'error' in r)) {
					promise.reject(r);
				}
				else {
					promise.fulfill(r);
				}

				return;
			}

			// Should this be an object
			if (r === true) {
				r = {success:true};
			}
			else if (!r) {
				r = {};
			}

			// The delete callback needs a better response
			if (p.method === 'delete') {
				r = (!r || utils.isEmpty(r)) ? {success:true} : r;
			}

			// FORMAT RESPONSE?
			// Does self request have a corresponding formatter
			if (o.wrap && ((p.path in o.wrap) || ('default' in o.wrap))) {
				var wrap = (p.path in o.wrap ? p.path : 'default');
				var time = (new Date()).getTime();

				// FORMAT RESPONSE
				var b = o.wrap[wrap](r, headers, p);

				// Has the response been utterly overwritten?
				// Typically self augments the existing object.. but for those rare occassions
				if (b) {
					r = b;
				}
			}

			// Is there a next_page defined in the response?
			if (r && 'paging' in r && r.paging.next) {

				// Add the relative path if it is missing from the paging/next path
				if (r.paging.next[0] === '?') {
					r.paging.next = p.path + r.paging.next;
				}

				// The relative path has been defined, lets markup the handler in the HashFragment
				else {
					r.paging.next += '#' + p.path;
				}
			}

			// Dispatch to listeners
			// Emit events which pertain to the formatted response
			if (!r || 'error' in r) {
				promise.reject(r);
			}
			else {
				promise.fulfill(r);
			}
		});
	}
};

// API utilities
hello.utils.extend(hello.utils, {

	// Make an HTTP request
	request: function(p, callback) {

		var _this = this;
		var error = _this.error;

		// This has to go through a POST request
		if (!_this.isEmpty(p.data) && !('FileList' in window) && _this.hasBinary(p.data)) {

			// Disable XHR and JSONP
			p.xhr = false;
			p.jsonp = false;
		}

		// Check if the browser and service support CORS
		var cors = this.request_cors(function() {
			// If it does then run this...
			return ((p.xhr === undefined) || (p.xhr && (typeof (p.xhr) !== 'function' || p.xhr(p, p.query))));
		});

		if (cors) {

			formatUrl(p, function(url) {

				var x = _this.xhr(p.method, url, p.headers, p.data, callback);
				x.onprogress = p.onprogress || null;

				// Windows Phone does not support xhr.upload, see #74
				// Feature detect
				if (x.upload && p.onuploadprogress) {
					x.upload.onprogress = p.onuploadprogress;
				}

			});

			return;
		}

		// Clone the query object
		// Each request modifies the query object and needs to be tared after each one.
		var _query = p.query;

		p.query = _this.clone(p.query);

		// Assign a new callbackID
		p.callbackID = _this.globalEvent();

		// JSONP
		if (p.jsonp !== false) {

			// Clone the query object
			p.query.callback = p.callbackID;

			// If the JSONP is a function then run it
			if (typeof (p.jsonp) === 'function') {
				p.jsonp(p, p.query);
			}

			// Lets use JSONP if the method is 'get'
			if (p.method === 'get') {

				formatUrl(p, function(url) {
					_this.jsonp(url, callback, p.callbackID, p.timeout);
				});

				return;
			}
			else {
				// It's not compatible reset query
				p.query = _query;
			}

		}

		// Otherwise we're on to the old school, iframe hacks and JSONP
		if (p.form !== false) {

			// Add some additional query parameters to the URL
			// We're pretty stuffed if the endpoint doesn't like these
			p.query.redirect_uri = p.redirect_uri;
			p.query.state = JSON.stringify({callback:p.callbackID});

			var opts;

			if (typeof (p.form) === 'function') {

				// Format the request
				opts = p.form(p, p.query);
			}

			if (p.method === 'post' && opts !== false) {

				formatUrl(p, function(url) {
					_this.post(url, p.data, opts, callback, p.callbackID, p.timeout);
				});

				return;
			}
		}

		// None of the methods were successful throw an error
		callback(error('invalid_request', 'There was no mechanism for handling this request'));

		return;

		// Format URL
		// Constructs the request URL, optionally wraps the URL through a call to a proxy server
		// Returns the formatted URL
		function formatUrl(p, callback) {

			// Are we signing the request?
			var sign;

			// OAuth1
			// Remove the token from the query before signing
			if (p.authResponse && p.authResponse.oauth && parseInt(p.authResponse.oauth.version, 10) === 1) {

				// OAUTH SIGNING PROXY
				sign = p.query.access_token;

				// Remove the access_token
				delete p.query.access_token;

				// Enfore use of Proxy
				p.proxy = true;
			}

			// POST body to querystring
			if (p.data && (p.method === 'get' || p.method === 'delete')) {
				// Attach the p.data to the querystring.
				_this.extend(p.query, p.data);
				p.data = null;
			}

			// Construct the path
			var path = _this.qs(p.url, p.query);

			// Proxy the request through a server
			// Used for signing OAuth1
			// And circumventing services without Access-Control Headers
			if (p.proxy) {
				// Use the proxy as a path
				path = _this.qs(p.oauth_proxy, {
					path: path,
					access_token: sign || '',

					// This will prompt the request to be signed as though it is OAuth1
					then: p.proxy_response_type || (p.method.toLowerCase() === 'get' ? 'redirect' : 'proxy'),
					method: p.method.toLowerCase(),
					suppress_response_codes: true
				});
			}

			callback(path);
		}
	},

	// Test whether the browser supports the CORS response
	request_cors: function(callback) {
		return 'withCredentials' in new XMLHttpRequest() && callback();
	},

	// Return the type of DOM object
	domInstance: function(type, data) {
		var test = 'HTML' + (type || '').replace(
			/^[a-z]/,
			function(m) {
				return m.toUpperCase();
			}

		) + 'Element';

		if (!data) {
			return false;
		}

		if (window[test]) {
			return data instanceof window[test];
		}
		else if (window.Element) {
			return data instanceof window.Element && (!type || (data.tagName && data.tagName.toLowerCase() === type));
		}
		else {
			return (!(data instanceof Object || data instanceof Array || data instanceof String || data instanceof Number) && data.tagName && data.tagName.toLowerCase() === type);
		}
	},

	// Create a clone of an object
	clone: function(obj) {
		// Does not clone DOM elements, nor Binary data, e.g. Blobs, Filelists
		if (obj === null || typeof (obj) !== 'object' || obj instanceof Date || 'nodeName' in obj || this.isBinary(obj) || (typeof FormData === 'function' && obj instanceof FormData)) {
			return obj;
		}

		if (Array.isArray(obj)) {
			// Clone each item in the array
			return obj.map(this.clone.bind(this));
		}

		// But does clone everything else.
		var clone = {};
		for (var x in obj) {
			clone[x] = this.clone(obj[x]);
		}

		return clone;
	},

	// XHR: uses CORS to make requests
	xhr: function(method, url, headers, data, callback) {

		var r = new XMLHttpRequest();
		var error = this.error;

		// Binary?
		var binary = false;
		if (method === 'blob') {
			binary = method;
			method = 'GET';
		}

		method = method.toUpperCase();

		// Xhr.responseType 'json' is not supported in any of the vendors yet.
		r.onload = function(e) {
			var json = r.response;
			try {
				json = JSON.parse(r.responseText);
			}
			catch (_e) {
				if (r.status === 401) {
					json = error('access_denied', r.statusText);
				}
			}

			var headers = headersToJSON(r.getAllResponseHeaders());
			headers.statusCode = r.status;

			callback(json || (method === 'GET' ? error('empty_response', 'Could not get resource') : {}), headers);
		};

		r.onerror = function(e) {
			var json = r.responseText;
			try {
				json = JSON.parse(r.responseText);
			}
			catch (_e) {}

			callback(json || error('access_denied', 'Could not get resource'));
		};

		var x;

		// Should we add the query to the URL?
		if (method === 'GET' || method === 'DELETE') {
			data = null;
		}
		else if (data && typeof (data) !== 'string' && !(data instanceof FormData) && !(data instanceof File) && !(data instanceof Blob)) {
			// Loop through and add formData
			var f = new FormData();
			for (x in data) if (data.hasOwnProperty(x)) {
				if (data[x] instanceof HTMLInputElement) {
					if ('files' in data[x] && data[x].files.length > 0) {
						f.append(x, data[x].files[0]);
					}
				}
				else if (data[x] instanceof Blob) {
					f.append(x, data[x], data.name);
				}
				else {
					f.append(x, data[x]);
				}
			}

			data = f;
		}

		// Open the path, async
		r.open(method, url, true);

		if (binary) {
			if ('responseType' in r) {
				r.responseType = binary;
			}
			else {
				r.overrideMimeType('text/plain; charset=x-user-defined');
			}
		}

		// Set any bespoke headers
		if (headers) {
			for (x in headers) {
				r.setRequestHeader(x, headers[x]);
			}
		}

		r.send(data);

		return r;

		// Headers are returned as a string
		function headersToJSON(s) {
			var r = {};
			var reg = /([a-z\-]+):\s?(.*);?/gi;
			var m;
			while ((m = reg.exec(s))) {
				r[m[1]] = m[2];
			}

			return r;
		}
	},

	// JSONP
	// Injects a script tag into the DOM to be executed and appends a callback function to the window object
	// @param string/function pathFunc either a string of the URL or a callback function pathFunc(querystringhash, continueFunc);
	// @param function callback a function to call on completion;
	jsonp: function(url, callback, callbackID, timeout) {

		var _this = this;
		var error = _this.error;

		// Change the name of the callback
		var bool = 0;
		var head = document.getElementsByTagName('head')[0];
		var operaFix;
		var result = error('server_error', 'server_error');
		var cb = function() {
			if (!(bool++)) {
				window.setTimeout(function() {
					callback(result);
					head.removeChild(script);
				}, 0);
			}

		};

		// Add callback to the window object
		callbackID = _this.globalEvent(function(json) {
			result = json;
			return true;

			// Mark callback as done
		}, callbackID);

		// The URL is a function for some cases and as such
		// Determine its value with a callback containing the new parameters of this function.
		url = url.replace(new RegExp('=\\?(&|$)'), '=' + callbackID + '$1');

		// Build script tag
		var script = _this.append('script', {
			id: callbackID,
			name: callbackID,
			src: url,
			async: true,
			onload: cb,
			onerror: cb,
			onreadystatechange: function() {
				if (/loaded|complete/i.test(this.readyState)) {
					cb();
				}
			}
		});

		// Opera fix error
		// Problem: If an error occurs with script loading Opera fails to trigger the script.onerror handler we specified
		//
		// Fix:
		// By setting the request to synchronous we can trigger the error handler when all else fails.
		// This action will be ignored if we've already called the callback handler "cb" with a successful onload event
		if (window.navigator.userAgent.toLowerCase().indexOf('opera') > -1) {
			operaFix = _this.append('script', {
				text: 'document.getElementById(\'' + callbackID + '\').onerror();'
			});
			script.async = false;
		}

		// Add timeout
		if (timeout) {
			window.setTimeout(function() {
				result = error('timeout', 'timeout');
				cb();
			}, timeout);
		}

		// TODO: add fix for IE,
		// However: unable recreate the bug of firing off the onreadystatechange before the script content has been executed and the value of "result" has been defined.
		// Inject script tag into the head element
		head.appendChild(script);

		// Append Opera Fix to run after our script
		if (operaFix) {
			head.appendChild(operaFix);
		}
	},

	// Post
	// Send information to a remote location using the post mechanism
	// @param string uri path
	// @param object data, key value data to send
	// @param function callback, function to execute in response
	post: function(url, data, options, callback, callbackID, timeout) {

		var _this = this;
		var error = _this.error;
		var doc = document;

		// This hack needs a form
		var form = null;
		var reenableAfterSubmit = [];
		var newform;
		var i = 0;
		var x = null;
		var bool = 0;
		var cb = function(r) {
			if (!(bool++)) {
				callback(r);
			}
		};

		// What is the name of the callback to contain
		// We'll also use this to name the iframe
		_this.globalEvent(cb, callbackID);

		// Build the iframe window
		var win;
		try {
			// IE7 hack, only lets us define the name here, not later.
			win = doc.createElement('<iframe name="' + callbackID + '">');
		}
		catch (e) {
			win = doc.createElement('iframe');
		}

		win.name = callbackID;
		win.id = callbackID;
		win.style.display = 'none';

		// Override callback mechanism. Triggger a response onload/onerror
		if (options && options.callbackonload) {
			// Onload is being fired twice
			win.onload = function() {
				cb({
					response: 'posted',
					message: 'Content was posted'
				});
			};
		}

		if (timeout) {
			setTimeout(function() {
				cb(error('timeout', 'The post operation timed out'));
			}, timeout);
		}

		doc.body.appendChild(win);

		// If we are just posting a single item
		if (_this.domInstance('form', data)) {
			// Get the parent form
			form = data.form;

			// Loop through and disable all of its siblings
			for (i = 0; i < form.elements.length; i++) {
				if (form.elements[i] !== data) {
					form.elements[i].setAttribute('disabled', true);
				}
			}

			// Move the focus to the form
			data = form;
		}

		// Posting a form
		if (_this.domInstance('form', data)) {
			// This is a form element
			form = data;

			// Does this form need to be a multipart form?
			for (i = 0; i < form.elements.length; i++) {
				if (!form.elements[i].disabled && form.elements[i].type === 'file') {
					form.encoding = form.enctype = 'multipart/form-data';
					form.elements[i].setAttribute('name', 'file');
				}
			}
		}
		else {
			// Its not a form element,
			// Therefore it must be a JSON object of Key=>Value or Key=>Element
			// If anyone of those values are a input type=file we shall shall insert its siblings into the form for which it belongs.
			for (x in data) if (data.hasOwnProperty(x)) {
				// Is this an input Element?
				if (_this.domInstance('input', data[x]) && data[x].type === 'file') {
					form = data[x].form;
					form.encoding = form.enctype = 'multipart/form-data';
				}
			}

			// Do If there is no defined form element, lets create one.
			if (!form) {
				// Build form
				form = doc.createElement('form');
				doc.body.appendChild(form);
				newform = form;
			}

			var input;

			// Add elements to the form if they dont exist
			for (x in data) if (data.hasOwnProperty(x)) {

				// Is this an element?
				var el = (_this.domInstance('input', data[x]) || _this.domInstance('textArea', data[x]) || _this.domInstance('select', data[x]));

				// Is this not an input element, or one that exists outside the form.
				if (!el || data[x].form !== form) {

					// Does an element have the same name?
					var inputs = form.elements[x];
					if (input) {
						// Remove it.
						if (!(inputs instanceof NodeList)) {
							inputs = [inputs];
						}

						for (i = 0; i < inputs.length; i++) {
							inputs[i].parentNode.removeChild(inputs[i]);
						}

					}

					// Create an input element
					input = doc.createElement('input');
					input.setAttribute('type', 'hidden');
					input.setAttribute('name', x);

					// Does it have a value attribute?
					if (el) {
						input.value = data[x].value;
					}
					else if (_this.domInstance(null, data[x])) {
						input.value = data[x].innerHTML || data[x].innerText;
					}
					else {
						input.value = data[x];
					}

					form.appendChild(input);
				}

				// It is an element, which exists within the form, but the name is wrong
				else if (el && data[x].name !== x) {
					data[x].setAttribute('name', x);
					data[x].name = x;
				}
			}

			// Disable elements from within the form if they weren't specified
			for (i = 0; i < form.elements.length; i++) {

				input = form.elements[i];

				// Does the same name and value exist in the parent
				if (!(input.name in data) && input.getAttribute('disabled') !== true) {
					// Disable
					input.setAttribute('disabled', true);

					// Add re-enable to callback
					reenableAfterSubmit.push(input);
				}
			}
		}

		// Set the target of the form
		form.setAttribute('method', 'POST');
		form.setAttribute('target', callbackID);
		form.target = callbackID;

		// Update the form URL
		form.setAttribute('action', url);

		// Submit the form
		// Some reason this needs to be offset from the current window execution
		setTimeout(function() {
			form.submit();

			setTimeout(function() {
				try {
					// Remove the iframe from the page.
					//win.parentNode.removeChild(win);
					// Remove the form
					if (newform) {
						newform.parentNode.removeChild(newform);
					}
				}
				catch (e) {
					try {
						console.error('HelloJS: could not remove iframe');
					}
					catch (ee) {}
				}

				// Reenable the disabled form
				for (var i = 0; i < reenableAfterSubmit.length; i++) {
					if (reenableAfterSubmit[i]) {
						reenableAfterSubmit[i].setAttribute('disabled', false);
						reenableAfterSubmit[i].disabled = false;
					}
				}
			}, 0);
		}, 100);
	},

	// Some of the providers require that only multipart is used with non-binary forms.
	// This function checks whether the form contains binary data
	hasBinary: function(data) {
		for (var x in data) if (data.hasOwnProperty(x)) {
			if (this.isBinary(data[x])) {
				return true;
			}
		}

		return false;
	},

	// Determines if a variable Either Is or like a FormInput has the value of a Blob

	isBinary: function(data) {

		return data instanceof Object && (
		(this.domInstance('input', data) && data.type === 'file') ||
		('FileList' in window && data instanceof window.FileList) ||
		('File' in window && data instanceof window.File) ||
		('Blob' in window && data instanceof window.Blob));

	},

	// Convert Data-URI to Blob string
	toBlob: function(dataURI) {
		var reg = /^data\:([^;,]+(\;charset=[^;,]+)?)(\;base64)?,/i;
		var m = dataURI.match(reg);
		if (!m) {
			return dataURI;
		}

		var binary = atob(dataURI.replace(reg, ''));
		var array = [];
		for (var i = 0; i < binary.length; i++) {
			array.push(binary.charCodeAt(i));
		}

		return new Blob([new Uint8Array(array)], {type: m[1]});
	}

});

// EXTRA: Convert FormElement to JSON for POSTing
// Wrappers to add additional functionality to existing functions
(function(hello) {

	// Copy original function
	var api = hello.api;
	var utils = hello.utils;

	utils.extend(utils, {

		// DataToJSON
		// This takes a FormElement|NodeList|InputElement|MixedObjects and convers the data object to JSON.
		dataToJSON: function(p) {

			var _this = this;
			var w = window;
			var data = p.data;

			// Is data a form object
			if (_this.domInstance('form', data)) {
				data = _this.nodeListToJSON(data.elements);
			}
			else if ('NodeList' in w && data instanceof NodeList) {
				data = _this.nodeListToJSON(data);
			}
			else if (_this.domInstance('input', data)) {
				data = _this.nodeListToJSON([data]);
			}

			// Is data a blob, File, FileList?
			if (('File' in w && data instanceof w.File) ||
				('Blob' in w && data instanceof w.Blob) ||
				('FileList' in w && data instanceof w.FileList)) {
				data = {file: data};
			}

			// Loop through data if it's not form data it must now be a JSON object
			if (!('FormData' in w && data instanceof w.FormData)) {

				for (var x in data) if (data.hasOwnProperty(x)) {

					if ('FileList' in w && data[x] instanceof w.FileList) {
						if (data[x].length === 1) {
							data[x] = data[x][0];
						}
					}
					else if (_this.domInstance('input', data[x]) && data[x].type === 'file') {
						continue;
					}
					else if (_this.domInstance('input', data[x]) ||
						_this.domInstance('select', data[x]) ||
						_this.domInstance('textArea', data[x])) {
						data[x] = data[x].value;
					}
					else if (_this.domInstance(null, data[x])) {
						data[x] = data[x].innerHTML || data[x].innerText;
					}
				}
			}

			p.data = data;
			return data;
		},

		// NodeListToJSON
		// Given a list of elements extrapolate their values and return as a json object
		nodeListToJSON: function(nodelist) {

			var json = {};

			// Create a data string
			for (var i = 0; i < nodelist.length; i++) {

				var input = nodelist[i];

				// If the name of the input is empty or diabled, dont add it.
				if (input.disabled || !input.name) {
					continue;
				}

				// Is this a file, does the browser not support 'files' and 'FormData'?
				if (input.type === 'file') {
					json[input.name] = input;
				}
				else {
					json[input.name] = input.value || input.innerHTML;
				}
			}

			return json;
		}
	});

	// Replace it
	hello.api = function() {

		// Get arguments
		var p = utils.args({path: 's!', method: 's', data:'o', timeout: 'i', callback: 'f'}, arguments);

		// Change for into a data object
		if (p.data) {
			utils.dataToJSON(p);
		}

		return api.call(this, p);
	};

})(hello);

/////////////////////////////////////
//
// Save any access token that is in the current page URL
// Handle any response solicited through iframe hash tag following an API request
//
/////////////////////////////////////

hello.utils.responseHandler(window, window.opener || window.parent);

// Script to support ChromeApps
// This overides the hello.utils.popup method to support chrome.identity.launchWebAuthFlow
// See https://developer.chrome.com/apps/app_identity#non

// Is this a chrome app?

if (typeof chrome === 'object' && typeof chrome.identity === 'object' && chrome.identity.launchWebAuthFlow) {

	(function() {

		// Swap the popup method
		hello.utils.popup = function(url) {

			return _open(url, true);

		};

		// Swap the hidden iframe method
		hello.utils.iframe = function(url) {

			_open(url, false);

		};

		// Swap the request_cors method
		hello.utils.request_cors = function(callback) {

			callback();

			// Always run as CORS

			return true;
		};

		// Swap the storage method
		var _cache = {};
		chrome.storage.local.get('hello', function(r) {
			// Update the cache
			_cache = r.hello || {};
		});

		hello.utils.store = function(name, value) {

			// Get all
			if (arguments.length === 0) {
				return _cache;
			}

			// Get
			if (arguments.length === 1) {
				return _cache[name] || null;
			}

			// Set
			if (value) {
				_cache[name] = value;
				chrome.storage.local.set({hello: _cache});
				return value;
			}

			// Delete
			if (value === null) {
				delete _cache[name];
				chrome.storage.local.set({hello: _cache});
				return null;
			}
		};

		// Open function
		function _open(url, interactive) {

			// Launch
			var ref = {
				closed: false
			};

			// Launch the webAuthFlow
			chrome.identity.launchWebAuthFlow({
				url: url,
				interactive: interactive
			}, function(responseUrl) {

				// Did the user cancel this prematurely
				if (responseUrl === undefined) {
					ref.closed = true;
					return;
				}

				// Split appart the URL
				var a = hello.utils.url(responseUrl);

				// The location can be augmented in to a location object like so...
				// We dont have window operations on the popup so lets create some
				var _popup = {
					location: {

						// Change the location of the popup
						assign: function(url) {

							// If there is a secondary reassign
							// In the case of OAuth1
							// Trigger this in non-interactive mode.
							_open(url, false);
						},

						search: a.search,
						hash: a.hash,
						href: a.href
					},
					close: function() {}
				};

				// Then this URL contains information which HelloJS must process
				// URL string
				// Window - any action such as window relocation goes here
				// Opener - the parent window which opened this, aka this script

				hello.utils.responseHandler(_popup, window);
			});

			// Return the reference
			return ref;
		}

	})();
}

// Phonegap override for hello.phonegap.js
(function() {

	// Is this a phonegap implementation?
	if (!(/^file:\/{3}[^\/]/.test(window.location.href) && window.cordova)) {
		// Cordova is not included.
		return;
	}

	// Augment the hidden iframe method
	hello.utils.iframe = function(url, redirectUri) {
		hello.utils.popup(url, redirectUri, {hidden: 'yes'});
	};

	// Augment the popup
	var utilPopup = hello.utils.popup;

	// Replace popup
	hello.utils.popup = function(url, redirectUri, options) {

		// Run the standard
		var popup = utilPopup.call(this, url, redirectUri, options);

		// Create a function for reopening the popup, and assigning events to the new popup object
		// PhoneGap support
		// Add an event listener to listen to the change in the popup windows URL
		// This must appear before popup.focus();
		try {
			if (popup && popup.addEventListener) {

				// Get the origin of the redirect URI

				var a = hello.utils.url(redirectUri);
				var redirectUriOrigin = a.origin || (a.protocol + '//' + a.hostname);

				// Listen to changes in the InAppBrowser window

				popup.addEventListener('loadstart', function(e) {

					var url = e.url;

					// Is this the path, as given by the redirectUri?
					// Check the new URL agains the redirectUriOrigin.
					// According to #63 a user could click 'cancel' in some dialog boxes ....
					// The popup redirects to another page with the same origin, yet we still wish it to close.

					if (url.indexOf(redirectUriOrigin) !== 0) {
						return;
					}

					// Split appart the URL
					var a = hello.utils.url(url);

					// We dont have window operations on the popup so lets create some
					// The location can be augmented in to a location object like so...

					var _popup = {
						location: {
							// Change the location of the popup
							assign: function(location) {

								// Unfourtunatly an app is may not change the location of a InAppBrowser window.
								// So to shim this, just open a new one.
								popup.executeScript({code: 'window.location.href = "' + location + ';"'});
							},

							search: a.search,
							hash: a.hash,
							href: a.href
						},
						close: function() {
							if (popup.close) {
								popup.close();
								try {
									popup.closed = true;
								}
								catch (_e) {}
							}
						}
					};

					// Then this URL contains information which HelloJS must process
					// URL string
					// Window - any action such as window relocation goes here
					// Opener - the parent window which opened this, aka this script

					hello.utils.responseHandler(_popup, window);

				});
			}
		}
		catch (e) {}

		return popup;
	};

})();

(function(hello) {

	// OAuth1
	var OAuth1Settings = {
		version: '1.0',
		auth: 'https://www.dropbox.com/1/oauth/authorize',
		request: 'https://api.dropbox.com/1/oauth/request_token',
		token: 'https://api.dropbox.com/1/oauth/access_token'
	};

	// OAuth2 Settings
	var OAuth2Settings = {
		version: 2,
		auth: 'https://www.dropbox.com/1/oauth2/authorize',
		grant: 'https://api.dropbox.com/1/oauth2/token'
	};

	// Initiate the Dropbox module
	hello.init({

		dropbox: {

			name: 'Dropbox',

			oauth: OAuth2Settings,

			login: function(p) {
				// OAuth2 non-standard adjustments
				p.qs.scope = '';

				// Should this be run as OAuth1?
				// If the redirect_uri is is HTTP (non-secure) then its required to revert to the OAuth1 endpoints
				var redirect = decodeURIComponent(p.qs.redirect_uri);
				if (redirect.indexOf('http:') === 0 && redirect.indexOf('http://localhost/') !== 0) {

					// Override the dropbox OAuth settings.
					hello.services.dropbox.oauth = OAuth1Settings;
				}
				else {
					// Override the dropbox OAuth settings.
					hello.services.dropbox.oauth = OAuth2Settings;
				}

				// The dropbox login window is a different size
				p.options.popup.width = 1000;
				p.options.popup.height = 1000;
			},

			/*
				Dropbox does not allow insecure HTTP URI's in the redirect_uri field
				...otherwise I'd love to use OAuth2

				Follow request https://forums.dropbox.com/topic.php?id=106505

				p.qs.response_type = 'code';
				oauth: {
					version: 2,
					auth: 'https://www.dropbox.com/1/oauth2/authorize',
					grant: 'https://api.dropbox.com/1/oauth2/token'
				}
			*/

			// API Base URL
			base: 'https://api.dropbox.com/1/',

			// Bespoke setting: this is states whether to use the custom environment of Dropbox or to use their own environment
			// Because it's notoriously difficult for Dropbox too provide access from other webservices, this defaults to Sandbox
			root: 'sandbox',

			// Map GET requests
			get: {
				me: 'account/info',

				// Https://www.dropbox.com/developers/core/docs#metadata
				'me/files': req('metadata/auto/@{parent|}'),
				'me/folder': req('metadata/auto/@{id}'),
				'me/folders': req('metadata/auto/'),

				'default': function(p, callback) {
					if (p.path.match('https://api-content.dropbox.com/1/files/')) {
						// This is a file, return binary data
						p.method = 'blob';
					}

					callback(p.path);
				}
			},

			post: {
				'me/files': function(p, callback) {

					var path = p.data.parent;
					var fileName = p.data.name;

					p.data = {
						file: p.data.file
					};

					// Does this have a data-uri to upload as a file?
					if (typeof (p.data.file) === 'string') {
						p.data.file = hello.utils.toBlob(p.data.file);
					}

					callback('https://api-content.dropbox.com/1/files_put/auto/' + path + '/' + fileName);
				},

				'me/folders': function(p, callback) {

					var name = p.data.name;
					p.data = {};

					callback('fileops/create_folder?root=@{root|sandbox}&' + hello.utils.param({
						path: name
					}));
				}
			},

			// Map DELETE requests
			del: {
				'me/files': 'fileops/delete?root=@{root|sandbox}&path=@{id}',
				'me/folder': 'fileops/delete?root=@{root|sandbox}&path=@{id}'
			},

			wrap: {
				me: function(o) {
					formatError(o);
					if (!o.uid) {
						return o;
					}

					o.name = o.display_name;
					var m = o.name.split(' ');
					o.first_name = m.shift();
					o.last_name = m.join(' ');
					o.id = o.uid;
					delete o.uid;
					delete o.display_name;
					return o;
				},

				'default': function(o, headers, req) {
					formatError(o);
					if (o.is_dir && o.contents) {
						o.data = o.contents;
						delete o.contents;

						o.data.forEach(function(item) {
							item.root = o.root;
							formatFile(item, headers, req);
						});
					}

					formatFile(o, headers, req);

					if (o.is_deleted) {
						o.success = true;
					}

					return o;
				}
			},

			// Doesn't return the CORS headers
			xhr: function(p) {

				// The proxy supports allow-cross-origin-resource
				// Alas that's the only thing we're using.
				if (p.data && p.data.file) {
					var file = p.data.file;
					if (file) {
						if (file.files) {
							p.data = file.files[0];
						}
						else {
							p.data = file;
						}
					}
				}

				if (p.method === 'delete') {
					p.method = 'post';
				}

				return true;
			},

			form: function(p, qs) {
				delete qs.state;
				delete qs.redirect_uri;
			}
		}
	});

	function formatError(o) {
		if (o && 'error' in o) {
			o.error = {
				code: 'server_error',
				message: o.error.message || o.error
			};
		}
	}

	function formatFile(o, headers, req) {

		if (typeof o !== 'object' ||
			(typeof Blob !== 'undefined' && o instanceof Blob) ||
			(typeof ArrayBuffer !== 'undefined' && o instanceof ArrayBuffer)) {
			// This is a file, let it through unformatted
			return;
		}

		if ('error' in o) {
			return;
		}

		var path = (o.root !== 'app_folder' ? o.root : '') + o.path.replace(/\&/g, '%26');
		path = path.replace(/^\//, '');
		if (o.thumb_exists) {
			o.thumbnail = req.oauth_proxy + '?path=' +
			encodeURIComponent('https://api-content.dropbox.com/1/thumbnails/auto/' + path + '?format=jpeg&size=m') + '&access_token=' + req.options.access_token;
		}

		o.type = (o.is_dir ? 'folder' : o.mime_type);
		o.name = o.path.replace(/.*\//g, '');
		if (o.is_dir) {
			o.files = path.replace(/^\//, '');
		}
		else {
			o.downloadLink = hello.settings.oauth_proxy + '?path=' +
			encodeURIComponent('https://api-content.dropbox.com/1/files/auto/' + path) + '&access_token=' + req.options.access_token;
			o.file = 'https://api-content.dropbox.com/1/files/auto/' + path;
		}

		if (!o.id) {
			o.id = o.path.replace(/^\//, '');
		}

		// O.media = 'https://api-content.dropbox.com/1/files/' + path;
	}

	function req(str) {
		return function(p, cb) {
			delete p.query.limit;
			cb(str);
		};
	}

})(hello);

(function(hello) {

	hello.init({

		facebook: {

			name: 'Facebook',

			// SEE https://developers.facebook.com/docs/facebook-login/manually-build-a-login-flow/v2.1
			oauth: {
				version: 2,
				auth: 'https://www.facebook.com/dialog/oauth/',
				grant: 'https://graph.facebook.com/oauth/access_token'
			},

			// Authorization scopes
			scope: {
				basic: 'public_profile',
				email: 'email',
				share: 'user_posts',
				birthday: 'user_birthday',
				events: 'user_events',
				photos: 'user_photos',
				videos: 'user_videos',
				friends: 'user_friends',
				files: 'user_photos,user_videos',
				publish_files: 'user_photos,user_videos,publish_actions',
				publish: 'publish_actions',

				// Deprecated in v2.0
				// Create_event	: 'create_event',

				offline_access: ''
			},

			// Refresh the access_token
			refresh: false,

			login: function(p) {

				// Reauthenticate
				// https://developers.facebook.com/docs/facebook-login/reauthentication
				if (p.options.force) {
					p.qs.auth_type = 'reauthenticate';
				}

				// Set the display value
				p.qs.display = p.options.display || 'popup';
			},

			logout: function(callback, options) {
				// Assign callback to a global handler
				var callbackID = hello.utils.globalEvent(callback);
				var redirect = encodeURIComponent(hello.settings.redirect_uri + '?' + hello.utils.param({callback:callbackID, result: JSON.stringify({force:true}), state: '{}'}));
				var token = (options.authResponse || {}).access_token;
				hello.utils.iframe('https://www.facebook.com/logout.php?next=' + redirect + '&access_token=' + token);

				// Possible responses:
				// String URL	- hello.logout should handle the logout
				// Undefined	- this function will handle the callback
				// True - throw a success, this callback isn't handling the callback
				// False - throw a error
				if (!token) {
					// If there isn't a token, the above wont return a response, so lets trigger a response
					return false;
				}
			},

			// API Base URL
			base: 'https://graph.facebook.com/v2.7/',

			// Map GET requests
			get: {
				me: 'me?fields=email,first_name,last_name,name,timezone,verified',
				'me/friends': 'me/friends',
				'me/following': 'me/friends',
				'me/followers': 'me/friends',
				'me/share': 'me/feed',
				'me/like': 'me/likes',
				'me/files': 'me/albums',
				'me/albums': 'me/albums?fields=cover_photo,name',
				'me/album': '@{id}/photos?fields=picture',
				'me/photos': 'me/photos',
				'me/photo': '@{id}',
				'friend/albums': '@{id}/albums',
				'friend/photos': '@{id}/photos'

				// Pagination
				// Https://developers.facebook.com/docs/reference/api/pagination/
			},

			// Map POST requests
			post: {
				'me/share': 'me/feed',
				'me/photo': '@{id}'

				// Https://developers.facebook.com/docs/graph-api/reference/v2.2/object/likes/
			},

			wrap: {
				me: formatUser,
				'me/friends': formatFriends,
				'me/following': formatFriends,
				'me/followers': formatFriends,
				'me/albums': format,
				'me/photos': format,
				'me/files': format,
				'default': format
			},

			// Special requirements for handling XHR
			xhr: function(p, qs) {
				if (p.method === 'get' || p.method === 'post') {
					qs.suppress_response_codes = true;
				}

				// Is this a post with a data-uri?
				if (p.method === 'post' && p.data && typeof (p.data.file) === 'string') {
					// Convert the Data-URI to a Blob
					p.data.file = hello.utils.toBlob(p.data.file);
				}

				return true;
			},

			// Special requirements for handling JSONP fallback
			jsonp: function(p, qs) {
				var m = p.method;
				if (m !== 'get' && !hello.utils.hasBinary(p.data)) {
					p.data.method = m;
					p.method = 'get';
				}
				else if (p.method === 'delete') {
					qs.method = 'delete';
					p.method = 'post';
				}
			},

			// Special requirements for iframe form hack
			form: function(p) {
				return {
					// Fire the callback onload
					callbackonload: true
				};
			}
		}
	});

	var base = 'https://graph.facebook.com/';

	function formatUser(o) {
		if (o.id) {
			o.thumbnail = o.picture = 'https://graph.facebook.com/' + o.id + '/picture';
		}

		return o;
	}

	function formatFriends(o) {
		if ('data' in o) {
			o.data.forEach(formatUser);
		}

		return o;
	}

	function format(o, headers, req) {
		if (typeof o === 'boolean') {
			o = {success: o};
		}

		if (o && 'data' in o) {
			var token = req.query.access_token;

			if (!(o.data instanceof Array)) {
				var data = o.data;
				delete o.data;
				o.data = [data];
			}

			o.data.forEach(function(d) {

				if (d.picture) {
					d.thumbnail = d.picture;
				}

				d.pictures = (d.images || [])
					.sort(function(a, b) {
						return a.width - b.width;
					});

				if (d.cover_photo && d.cover_photo.id) {
					d.thumbnail = base + d.cover_photo.id + '/picture?access_token=' + token;
				}

				if (d.type === 'album') {
					d.files = d.photos = base + d.id + '/photos';
				}

				if (d.can_upload) {
					d.upload_location = base + d.id + '/photos';
				}
			});
		}

		return o;
	}

})(hello);

(function(hello) {

	hello.init({

		flickr: {

			name: 'Flickr',

			// Ensure that you define an oauth_proxy
			oauth: {
				version: '1.0a',
				auth: 'https://www.flickr.com/services/oauth/authorize?perms=read',
				request: 'https://www.flickr.com/services/oauth/request_token',
				token: 'https://www.flickr.com/services/oauth/access_token'
			},

			// API base URL
			base: 'https://api.flickr.com/services/rest',

			// Map GET resquests
			get: {
				me: sign('flickr.people.getInfo'),
				'me/friends': sign('flickr.contacts.getList', {per_page:'@{limit|50}'}),
				'me/following': sign('flickr.contacts.getList', {per_page:'@{limit|50}'}),
				'me/followers': sign('flickr.contacts.getList', {per_page:'@{limit|50}'}),
				'me/albums': sign('flickr.photosets.getList', {per_page:'@{limit|50}'}),
				'me/album': sign('flickr.photosets.getPhotos', {photoset_id: '@{id}'}),
				'me/photos': sign('flickr.people.getPhotos', {per_page:'@{limit|50}'})
			},

			wrap: {
				me: function(o) {
					formatError(o);
					o = checkResponse(o, 'person');
					if (o.id) {
						if (o.realname) {
							o.name = o.realname._content;
							var m = o.name.split(' ');
							o.first_name = m.shift();
							o.last_name = m.join(' ');
						}

						o.thumbnail = getBuddyIcon(o, 'l');
						o.picture = getBuddyIcon(o, 'l');
					}

					return o;
				},

				'me/friends': formatFriends,
				'me/followers': formatFriends,
				'me/following': formatFriends,
				'me/albums': function(o) {
					formatError(o);
					o = checkResponse(o, 'photosets');
					paging(o);
					if (o.photoset) {
						o.data = o.photoset;
						o.data.forEach(function(item) {
							item.name = item.title._content;
							item.photos = 'https://api.flickr.com/services/rest' + getApiUrl('flickr.photosets.getPhotos', {photoset_id: item.id}, true);
						});

						delete o.photoset;
					}

					return o;
				},

				'me/photos': function(o) {
					formatError(o);
					return formatPhotos(o);
				},

				'default': function(o) {
					formatError(o);
					return formatPhotos(o);
				}
			},

			xhr: false,

			jsonp: function(p, qs) {
				if (p.method == 'get') {
					delete qs.callback;
					qs.jsoncallback = p.callbackID;
				}
			}
		}
	});

	function getApiUrl(method, extraParams, skipNetwork) {
		var url = ((skipNetwork) ? '' : 'flickr:') +
			'?method=' + method +
			'&api_key=' + hello.services.flickr.id +
			'&format=json';
		for (var param in extraParams) {
			if (extraParams.hasOwnProperty(param)) {
				url += '&' + param + '=' + extraParams[param];
			}
		}

		return url;
	}

	// This is not exactly neat but avoid to call
	// The method 'flickr.test.login' for each api call

	function withUser(cb) {
		var auth = hello.getAuthResponse('flickr');
		cb(auth && auth.user_nsid ? auth.user_nsid : null);
	}

	function sign(url, params) {
		if (!params) {
			params = {};
		}

		return function(p, callback) {
			withUser(function(userId) {
				params.user_id = userId;
				callback(getApiUrl(url, params, true));
			});
		};
	}

	function getBuddyIcon(profile, size) {
		var url = 'https://www.flickr.com/images/buddyicon.gif';
		if (profile.nsid && profile.iconserver && profile.iconfarm) {
			url = 'https://farm' + profile.iconfarm + '.staticflickr.com/' +
				profile.iconserver + '/' +
				'buddyicons/' + profile.nsid +
				((size) ? '_' + size : '') + '.jpg';
		}

		return url;
	}

	// See: https://www.flickr.com/services/api/misc.urls.html
	function createPhotoUrl(id, farm, server, secret, size) {
		size = (size) ? '_' + size : '';
		return 'https://farm' + farm + '.staticflickr.com/' + server + '/' + id + '_' + secret + size + '.jpg';
	}

	function formatUser(o) {
	}

	function formatError(o) {
		if (o && o.stat && o.stat.toLowerCase() != 'ok') {
			o.error = {
				code: 'invalid_request',
				message: o.message
			};
		}
	}

	function formatPhotos(o) {
		if (o.photoset || o.photos) {
			var set = ('photoset' in o) ? 'photoset' : 'photos';
			o = checkResponse(o, set);
			paging(o);
			o.data = o.photo;
			delete o.photo;
			for (var i = 0; i < o.data.length; i++) {
				var photo = o.data[i];
				photo.name = photo.title;
				photo.picture = createPhotoUrl(photo.id, photo.farm, photo.server, photo.secret, '');
				photo.pictures = createPictures(photo.id, photo.farm, photo.server, photo.secret);
				photo.source = createPhotoUrl(photo.id, photo.farm, photo.server, photo.secret, 'b');
				photo.thumbnail = createPhotoUrl(photo.id, photo.farm, photo.server, photo.secret, 'm');
			}
		}

		return o;
	}

	// See: https://www.flickr.com/services/api/misc.urls.html
	function createPictures(id, farm, server, secret) {

		var NO_LIMIT = 2048;
		var sizes = [
			{id: 't', max: 100},
			{id: 'm', max: 240},
			{id: 'n', max: 320},
			{id: '', max: 500},
			{id: 'z', max: 640},
			{id: 'c', max: 800},
			{id: 'b', max: 1024},
			{id: 'h', max: 1600},
			{id: 'k', max: 2048},
			{id: 'o', max: NO_LIMIT}
		];

		return sizes.map(function(size) {
			return {
				source: createPhotoUrl(id, farm, server, secret, size.id),

				// Note: this is a guess that's almost certain to be wrong (unless square source)
				width: size.max,
				height: size.max
			};
		});
	}

	function checkResponse(o, key) {

		if (key in o) {
			o = o[key];
		}
		else if (!('error' in o)) {
			o.error = {
				code: 'invalid_request',
				message: o.message || 'Failed to get data from Flickr'
			};
		}

		return o;
	}

	function formatFriends(o) {
		formatError(o);
		if (o.contacts) {
			o = checkResponse(o, 'contacts');
			paging(o);
			o.data = o.contact;
			delete o.contact;
			for (var i = 0; i < o.data.length; i++) {
				var item = o.data[i];
				item.id = item.nsid;
				item.name = item.realname || item.username;
				item.thumbnail = getBuddyIcon(item, 'm');
			}
		}

		return o;
	}

	function paging(res) {
		if (res.page && res.pages && res.page !== res.pages) {
			res.paging = {
				next: '?page=' + (++res.page)
			};
		}
	}

})(hello);

(function(hello) {

	hello.init({

		foursquare: {

			name: 'Foursquare',

			oauth: {
				// See: https://developer.foursquare.com/overview/auth
				version: 2,
				auth: 'https://foursquare.com/oauth2/authenticate',
				grant: 'https://foursquare.com/oauth2/access_token'
			},

			// Refresh the access_token once expired
			refresh: true,

			base: 'https://api.foursquare.com/v2/',

			get: {
				me: 'users/self',
				'me/friends': 'users/self/friends',
				'me/followers': 'users/self/friends',
				'me/following': 'users/self/friends'
			},

			wrap: {
				me: function(o) {
					formatError(o);
					if (o && o.response) {
						o = o.response.user;
						formatUser(o);
					}

					return o;
				},

				'default': function(o) {
					formatError(o);

					// Format friends
					if (o && 'response' in o && 'friends' in o.response && 'items' in o.response.friends) {
						o.data = o.response.friends.items;
						o.data.forEach(formatUser);
						delete o.response;
					}

					return o;
				}
			},

			xhr: formatRequest,
			jsonp: formatRequest
		}
	});

	function formatError(o) {
		if (o.meta && (o.meta.code === 400 || o.meta.code === 401)) {
			o.error = {
				code: 'access_denied',
				message: o.meta.errorDetail
			};
		}
	}

	function formatUser(o) {
		if (o && o.id) {
			o.thumbnail = o.photo.prefix + '100x100' + o.photo.suffix;
			o.name = o.firstName + ' ' + o.lastName;
			o.first_name = o.firstName;
			o.last_name = o.lastName;
			if (o.contact) {
				if (o.contact.email) {
					o.email = o.contact.email;
				}
			}
		}
	}

	function formatRequest(p, qs) {
		var token = qs.access_token;
		delete qs.access_token;
		qs.oauth_token = token;
		qs.v = 20121125;
		return true;
	}

})(hello);

(function(hello) {

	hello.init({

		github: {

			name: 'GitHub',

			oauth: {
				version: 2,
				auth: 'https://github.com/login/oauth/authorize',
				grant: 'https://github.com/login/oauth/access_token',
				response_type: 'code'
			},

			scope: {
				email: 'user:email'
			},

			base: 'https://api.github.com/',

			get: {
				me: 'user',
				'me/friends': 'user/following?per_page=@{limit|100}',
				'me/following': 'user/following?per_page=@{limit|100}',
				'me/followers': 'user/followers?per_page=@{limit|100}',
				'me/like': 'user/starred?per_page=@{limit|100}'
			},

			wrap: {
				me: function(o, headers) {

					formatError(o, headers);
					formatUser(o);

					return o;
				},

				'default': function(o, headers, req) {

					formatError(o, headers);

					if (Array.isArray(o)) {
						o = {data:o};
					}

					if (o.data) {
						paging(o, headers, req);
						o.data.forEach(formatUser);
					}

					return o;
				}
			},

			xhr: function(p) {

				if (p.method !== 'get' && p.data) {

					// Serialize payload as JSON
					p.headers = p.headers || {};
					p.headers['Content-Type'] = 'application/json';
					if (typeof (p.data) === 'object') {
						p.data = JSON.stringify(p.data);
					}
				}

				return true;
			}
		}
	});

	function formatError(o, headers) {
		var code = headers ? headers.statusCode : (o && 'meta' in o && 'status' in o.meta && o.meta.status);
		if ((code === 401 || code === 403)) {
			o.error = {
				code: 'access_denied',
				message: o.message || (o.data ? o.data.message : 'Could not get response')
			};
			delete o.message;
		}
	}

	function formatUser(o) {
		if (o.id) {
			o.thumbnail = o.picture = o.avatar_url;
			o.name = o.login;
		}
	}

	function paging(res, headers, req) {
		if (res.data && res.data.length && headers && headers.Link) {
			var next = headers.Link.match(/<(.*?)>;\s*rel=\"next\"/);
			if (next) {
				res.paging = {
					next: next[1]
				};
			}
		}
	}

})(hello);

(function(hello) {

	var contactsUrl = 'https://www.google.com/m8/feeds/contacts/default/full?v=3.0&alt=json&max-results=@{limit|1000}&start-index=@{start|1}';

	hello.init({

		google: {

			name: 'Google Plus',

			// See: http://code.google.com/apis/accounts/docs/OAuth2UserAgent.html
			oauth: {
				version: 2,
				auth: 'https://accounts.google.com/o/oauth2/auth',
				grant: 'https://accounts.google.com/o/oauth2/token'
			},

			// Authorization scopes
			scope: {
				basic: 'https://www.googleapis.com/auth/plus.me profile',
				email: 'email',
				birthday: '',
				events: '',
				photos: 'https://picasaweb.google.com/data/',
				videos: 'http://gdata.youtube.com',
				friends: 'https://www.google.com/m8/feeds, https://www.googleapis.com/auth/plus.login',
				files: 'https://www.googleapis.com/auth/drive.readonly',
				publish: '',
				publish_files: 'https://www.googleapis.com/auth/drive',
				share: '',
				create_event: '',
				offline_access: ''
			},

			scope_delim: ' ',

			login: function(p) {

				if (p.qs.response_type === 'code') {

					// Let's set this to an offline access to return a refresh_token
					p.qs.access_type = 'offline';
				}

				// Reauthenticate
				// https://developers.google.com/identity/protocols/
				if (p.options.force) {
					p.qs.approval_prompt = 'force';
				}
			},

			// API base URI
			base: 'https://www.googleapis.com/',

			// Map GET requests
			get: {
				me: 'plus/v1/people/me',

				// Deprecated Sept 1, 2014
				//'me': 'oauth2/v1/userinfo?alt=json',

				// See: https://developers.google.com/+/api/latest/people/list
				'me/friends': 'plus/v1/people/me/people/visible?maxResults=@{limit|100}',
				'me/following': contactsUrl,
				'me/followers': contactsUrl,
				'me/contacts': contactsUrl,
				'me/share': 'plus/v1/people/me/activities/public?maxResults=@{limit|100}',
				'me/feed': 'plus/v1/people/me/activities/public?maxResults=@{limit|100}',
				'me/albums': 'https://picasaweb.google.com/data/feed/api/user/default?alt=json&max-results=@{limit|100}&start-index=@{start|1}',
				'me/album': function(p, callback) {
					var key = p.query.id;
					delete p.query.id;
					callback(key.replace('/entry/', '/feed/'));
				},

				'me/photos': 'https://picasaweb.google.com/data/feed/api/user/default?alt=json&kind=photo&max-results=@{limit|100}&start-index=@{start|1}',

				// See: https://developers.google.com/drive/v2/reference/files/list
				'me/file': 'drive/v2/files/@{id}',
				'me/files': 'drive/v2/files?q=%22@{parent|root}%22+in+parents+and+trashed=false&maxResults=@{limit|100}',

				// See: https://developers.google.com/drive/v2/reference/files/list
				'me/folders': 'drive/v2/files?q=%22@{id|root}%22+in+parents+and+mimeType+=+%22application/vnd.google-apps.folder%22+and+trashed=false&maxResults=@{limit|100}',

				// See: https://developers.google.com/drive/v2/reference/files/list
				'me/folder': 'drive/v2/files?q=%22@{id|root}%22+in+parents+and+trashed=false&maxResults=@{limit|100}'
			},

			// Map POST requests
			post: {

				// Google Drive
				'me/files': uploadDrive,
				'me/folders': function(p, callback) {
					p.data = {
						title: p.data.name,
						parents: [{id: p.data.parent || 'root'}],
						mimeType: 'application/vnd.google-apps.folder'
					};
					callback('drive/v2/files');
				}
			},

			// Map PUT requests
			put: {
				'me/files': uploadDrive
			},

			// Map DELETE requests
			del: {
				'me/files': 'drive/v2/files/@{id}',
				'me/folder': 'drive/v2/files/@{id}'
			},

			// Map PATCH requests
			patch: {
				'me/file': 'drive/v2/files/@{id}'
			},

			wrap: {
				me: function(o) {
					if (o.id) {
						o.last_name = o.family_name || (o.name ? o.name.familyName : null);
						o.first_name = o.given_name || (o.name ? o.name.givenName : null);

						if (o.emails && o.emails.length) {
							o.email = o.emails[0].value;
						}

						formatPerson(o);
					}

					return o;
				},

				'me/friends': function(o) {
					if (o.items) {
						paging(o);
						o.data = o.items;
						o.data.forEach(formatPerson);
						delete o.items;
					}

					return o;
				},

				'me/contacts': formatFriends,
				'me/followers': formatFriends,
				'me/following': formatFriends,
				'me/share': formatFeed,
				'me/feed': formatFeed,
				'me/albums': gEntry,
				'me/photos': formatPhotos,
				'default': gEntry
			},

			xhr: function(p) {

				if (p.method === 'post' || p.method === 'put') {
					toJSON(p);
				}
				else if (p.method === 'patch') {
					hello.utils.extend(p.query, p.data);
					p.data = null;
				}

				return true;
			},

			// Don't even try submitting via form.
			// This means no POST operations in <=IE9
			form: false
		}
	});

	function toInt(s) {
		return parseInt(s, 10);
	}

	function formatFeed(o) {
		paging(o);
		o.data = o.items;
		delete o.items;
		return o;
	}

	// Format: ensure each record contains a name, id etc.
	function formatItem(o) {
		if (o.error) {
			return;
		}

		if (!o.name) {
			o.name = o.title || o.message;
		}

		if (!o.picture) {
			o.picture = o.thumbnailLink;
		}

		if (!o.thumbnail) {
			o.thumbnail = o.thumbnailLink;
		}

		if (o.mimeType === 'application/vnd.google-apps.folder') {
			o.type = 'folder';
			o.files = 'https://www.googleapis.com/drive/v2/files?q=%22' + o.id + '%22+in+parents';
		}

		return o;
	}

	function formatImage(image) {
		return {
			source: image.url,
			width: image.width,
			height: image.height
		};
	}

	function formatPhotos(o) {
		o.data = o.feed.entry.map(formatEntry);
		delete o.feed;
	}

	// Google has a horrible JSON API
	function gEntry(o) {
		paging(o);

		if ('feed' in o && 'entry' in o.feed) {
			o.data = o.feed.entry.map(formatEntry);
			delete o.feed;
		}

		// Old style: Picasa, etc.
		else if ('entry' in o) {
			return formatEntry(o.entry);
		}

		// New style: Google Drive & Plus
		else if ('items' in o) {
			o.data = o.items.map(formatItem);
			delete o.items;
		}
		else {
			formatItem(o);
		}

		return o;
	}

	function formatPerson(o) {
		o.name = o.displayName || o.name;
		o.picture = o.picture || (o.image ? o.image.url : null);
		o.thumbnail = o.picture;
	}

	function formatFriends(o, headers, req) {
		paging(o);
		var r = [];
		if ('feed' in o && 'entry' in o.feed) {
			var token = req.query.access_token;
			for (var i = 0; i < o.feed.entry.length; i++) {
				var a = o.feed.entry[i];

				a.id	= a.id.$t;
				a.name	= a.title.$t;
				delete a.title;
				if (a.gd$email) {
					a.email	= (a.gd$email && a.gd$email.length > 0) ? a.gd$email[0].address : null;
					a.emails = a.gd$email;
					delete a.gd$email;
				}

				if (a.updated) {
					a.updated = a.updated.$t;
				}

				if (a.link) {

					var pic = (a.link.length > 0) ? a.link[0].href : null;
					if (pic && a.link[0].gd$etag) {
						pic += (pic.indexOf('?') > -1 ? '&' : '?') + 'access_token=' + token;
						a.picture = pic;
						a.thumbnail = pic;
					}

					delete a.link;
				}

				if (a.category) {
					delete a.category;
				}
			}

			o.data = o.feed.entry;
			delete o.feed;
		}

		return o;
	}

	function formatEntry(a) {

		var group = a.media$group;
		var photo = group.media$content.length ? group.media$content[0] : {};
		var mediaContent = group.media$content || [];
		var mediaThumbnail = group.media$thumbnail || [];

		var pictures = mediaContent
			.concat(mediaThumbnail)
			.map(formatImage)
			.sort(function(a, b) {
				return a.width - b.width;
			});

		var i = 0;
		var _a;
		var p = {
			id: a.id.$t,
			name: a.title.$t,
			description: a.summary.$t,
			updated_time: a.updated.$t,
			created_time: a.published.$t,
			picture: photo ? photo.url : null,
			pictures: pictures,
			images: [],
			thumbnail: photo ? photo.url : null,
			width: photo.width,
			height: photo.height
		};

		// Get feed/children
		if ('link' in a) {
			for (i = 0; i < a.link.length; i++) {
				var d = a.link[i];
				if (d.rel.match(/\#feed$/)) {
					p.upload_location = p.files = p.photos = d.href;
					break;
				}
			}
		}

		// Get images of different scales
		if ('category' in a && a.category.length) {
			_a = a.category;
			for (i = 0; i < _a.length; i++) {
				if (_a[i].scheme && _a[i].scheme.match(/\#kind$/)) {
					p.type = _a[i].term.replace(/^.*?\#/, '');
				}
			}
		}

		// Get images of different scales
		if ('media$thumbnail' in group && group.media$thumbnail.length) {
			_a = group.media$thumbnail;
			p.thumbnail = _a[0].url;
			p.images = _a.map(formatImage);
		}

		_a = group.media$content;

		if (_a && _a.length) {
			p.images.push(formatImage(_a[0]));
		}

		return p;
	}

	function paging(res) {

		// Contacts V2
		if ('feed' in res && res.feed.openSearch$itemsPerPage) {
			var limit = toInt(res.feed.openSearch$itemsPerPage.$t);
			var start = toInt(res.feed.openSearch$startIndex.$t);
			var total = toInt(res.feed.openSearch$totalResults.$t);

			if ((start + limit) < total) {
				res.paging = {
					next: '?start=' + (start + limit)
				};
			}
		}
		else if ('nextPageToken' in res) {
			res.paging = {
				next: '?pageToken=' + res.nextPageToken
			};
		}
	}

	// Construct a multipart message
	function Multipart() {

		// Internal body
		var body = [];
		var boundary = (Math.random() * 1e10).toString(32);
		var counter = 0;
		var lineBreak = '\r\n';
		var delim = lineBreak + '--' + boundary;
		var ready = function() {};

		var dataUri = /^data\:([^;,]+(\;charset=[^;,]+)?)(\;base64)?,/i;

		// Add file
		function addFile(item) {
			var fr = new FileReader();
			fr.onload = function(e) {
				addContent(btoa(e.target.result), item.type + lineBreak + 'Content-Transfer-Encoding: base64');
			};

			fr.readAsBinaryString(item);
		}

		// Add content
		function addContent(content, type) {
			body.push(lineBreak + 'Content-Type: ' + type + lineBreak + lineBreak + content);
			counter--;
			ready();
		}

		// Add new things to the object
		this.append = function(content, type) {

			// Does the content have an array
			if (typeof (content) === 'string' || !('length' in Object(content))) {
				// Converti to multiples
				content = [content];
			}

			for (var i = 0; i < content.length; i++) {

				counter++;

				var item = content[i];

				// Is this a file?
				// Files can be either Blobs or File types
				if (
					(typeof (File) !== 'undefined' && item instanceof File) ||
					(typeof (Blob) !== 'undefined' && item instanceof Blob)
				) {
					// Read the file in
					addFile(item);
				}

				// Data-URI?
				// Data:[<mime type>][;charset=<charset>][;base64],<encoded data>
				// /^data\:([^;,]+(\;charset=[^;,]+)?)(\;base64)?,/i
				else if (typeof (item) === 'string' && item.match(dataUri)) {
					var m = item.match(dataUri);
					addContent(item.replace(dataUri, ''), m[1] + lineBreak + 'Content-Transfer-Encoding: base64');
				}

				// Regular string
				else {
					addContent(item, type);
				}
			}
		};

		this.onready = function(fn) {
			ready = function() {
				if (counter === 0) {
					// Trigger ready
					body.unshift('');
					body.push('--');
					fn(body.join(delim), boundary);
					body = [];
				}
			};

			ready();
		};
	}

	// Upload to Drive
	// If this is PUT then only augment the file uploaded
	// PUT https://developers.google.com/drive/v2/reference/files/update
	// POST https://developers.google.com/drive/manage-uploads
	function uploadDrive(p, callback) {

		var data = {};

		// Test for DOM element
		if (p.data &&
			(typeof (HTMLInputElement) !== 'undefined' && p.data instanceof HTMLInputElement)
		) {
			p.data = {file: p.data};
		}

		if (!p.data.name && Object(Object(p.data.file).files).length && p.method === 'post') {
			p.data.name = p.data.file.files[0].name;
		}

		if (p.method === 'post') {
			p.data = {
				title: p.data.name,
				parents: [{id: p.data.parent || 'root'}],
				file: p.data.file
			};
		}
		else {

			// Make a reference
			data = p.data;
			p.data = {};

			// Add the parts to change as required
			if (data.parent) {
				p.data.parents = [{id: p.data.parent || 'root'}];
			}

			if (data.file) {
				p.data.file = data.file;
			}

			if (data.name) {
				p.data.title = data.name;
			}
		}

		// Extract the file, if it exists from the data object
		// If the File is an INPUT element lets just concern ourselves with the NodeList
		var file;
		if ('file' in p.data) {
			file = p.data.file;
			delete p.data.file;

			if (typeof (file) === 'object' && 'files' in file) {
				// Assign the NodeList
				file = file.files;
			}

			if (!file || !file.length) {
				callback({
					error: {
						code: 'request_invalid',
						message: 'There were no files attached with this request to upload'
					}
				});
				return;
			}
		}

		// Set type p.data.mimeType = Object(file[0]).type || 'application/octet-stream';

		// Construct a multipart message
		var parts = new Multipart();
		parts.append(JSON.stringify(p.data), 'application/json');

		// Read the file into a  base64 string... yep a hassle, i know
		// FormData doesn't let us assign our own Multipart headers and HTTP Content-Type
		// Alas GoogleApi need these in a particular format
		if (file) {
			parts.append(file);
		}

		parts.onready(function(body, boundary) {

			p.headers['content-type'] = 'multipart/related; boundary="' + boundary + '"';
			p.data = body;

			callback('upload/drive/v2/files' + (data.id ? '/' + data.id : '') + '?uploadType=multipart');
		});

	}

	function toJSON(p) {
		if (typeof (p.data) === 'object') {
			// Convert the POST into a javascript object
			try {
				p.data = JSON.stringify(p.data);
				p.headers['content-type'] = 'application/json';
			}
			catch (e) {}
		}
	}

})(hello);

(function(hello) {

	hello.init({

		instagram: {

			name: 'Instagram',

			oauth: {
				// See: http://instagram.com/developer/authentication/
				version: 2,
				auth: 'https://instagram.com/oauth/authorize/',
				grant: 'https://api.instagram.com/oauth/access_token'
			},

			// Refresh the access_token once expired
			refresh: true,

			scope: {
				basic: 'basic',
				photos: '',
				friends: 'relationships',
				publish: 'likes comments',
				email: '',
				share: '',
				publish_files: '',
				files: '',
				videos: '',
				offline_access: ''
			},

			scope_delim: ' ',

			base: 'https://api.instagram.com/v1/',

			get: {
				me: 'users/self',
				'me/feed': 'users/self/feed?count=@{limit|100}',
				'me/photos': 'users/self/media/recent?min_id=0&count=@{limit|100}',
				'me/friends': 'users/self/follows?count=@{limit|100}',
				'me/following': 'users/self/follows?count=@{limit|100}',
				'me/followers': 'users/self/followed-by?count=@{limit|100}',
				'friend/photos': 'users/@{id}/media/recent?min_id=0&count=@{limit|100}'
			},

			post: {
				'me/like': function(p, callback) {
					var id = p.data.id;
					p.data = {};
					callback('media/' + id + '/likes');
				}
			},

			del: {
				'me/like': 'media/@{id}/likes'
			},

			wrap: {
				me: function(o) {

					formatError(o);

					if ('data' in o) {
						o.id = o.data.id;
						o.thumbnail = o.data.profile_picture;
						o.name = o.data.full_name || o.data.username;
					}

					return o;
				},

				'me/friends': formatFriends,
				'me/following': formatFriends,
				'me/followers': formatFriends,
				'me/photos': function(o) {

					formatError(o);
					paging(o);

					if ('data' in o) {
						o.data = o.data.filter(function(d) {
							return d.type === 'image';
						});

						o.data.forEach(function(d) {
							d.name = d.caption ? d.caption.text : null;
							d.thumbnail = d.images.thumbnail.url;
							d.picture = d.images.standard_resolution.url;
							d.pictures = Object.keys(d.images)
								.map(function(key) {
									var image = d.images[key];
									return formatImage(image);
								})
								.sort(function(a, b) {
									return a.width - b.width;
								});
						});
					}

					return o;
				},

				'default': function(o) {
					o = formatError(o);
					paging(o);
					return o;
				}
			},

			// Instagram does not return any CORS Headers
			// So besides JSONP we're stuck with proxy
			xhr: function(p, qs) {

				var method = p.method;
				var proxy = method !== 'get';

				if (proxy) {

					if ((method === 'post' || method === 'put') && p.query.access_token) {
						p.data.access_token = p.query.access_token;
						delete p.query.access_token;
					}

					// No access control headers
					// Use the proxy instead
					p.proxy = proxy;
				}

				return proxy;
			},

			// No form
			form: false
		}
	});

	function formatImage(image) {
		return {
			source: image.url,
			width: image.width,
			height: image.height
		};
	}

	function formatError(o) {
		if (typeof o === 'string') {
			return {
				error: {
					code: 'invalid_request',
					message: o
				}
			};
		}

		if (o && 'meta' in o && 'error_type' in o.meta) {
			o.error = {
				code: o.meta.error_type,
				message: o.meta.error_message
			};
		}

		return o;
	}

	function formatFriends(o) {
		paging(o);
		if (o && 'data' in o) {
			o.data.forEach(formatFriend);
		}

		return o;
	}

	function formatFriend(o) {
		if (o.id) {
			o.thumbnail = o.profile_picture;
			o.name = o.full_name || o.username;
		}
	}

	// See: http://instagram.com/developer/endpoints/
	function paging(res) {
		if ('pagination' in res) {
			res.paging = {
				next: res.pagination.next_url
			};
			delete res.pagination;
		}
	}

})(hello);

(function(hello) {

	hello.init({

		joinme: {

			name: 'join.me',

			oauth: {
				version: 2,
				auth: 'https://secure.join.me/api/public/v1/auth/oauth2',
				grant: 'https://secure.join.me/api/public/v1/auth/oauth2'
			},

			refresh: false,

			scope: {
				basic: 'user_info',
				user: 'user_info',
				scheduler: 'scheduler',
				start: 'start_meeting',
				email: '',
				friends: '',
				share: '',
				publish: '',
				photos: '',
				publish_files: '',
				files: '',
				videos: '',
				offline_access: ''
			},

			scope_delim: ' ',

			login: function(p) {
				p.options.popup.width = 400;
				p.options.popup.height = 700;
			},

			base: 'https://api.join.me/v1/',

			get: {
				me: 'user',
				meetings: 'meetings',
				'meetings/info': 'meetings/@{id}'
			},

			post: {
				'meetings/start/adhoc': function(p, callback) {
					callback('meetings/start');
				},

				'meetings/start/scheduled': function(p, callback) {
					var meetingId = p.data.meetingId;
					p.data = {};
					callback('meetings/' + meetingId + '/start');
				},

				'meetings/schedule': function(p, callback) {
					callback('meetings');
				}
			},

			patch: {
				'meetings/update': function(p, callback) {
					callback('meetings/' + p.data.meetingId);
				}
			},

			del: {
				'meetings/delete': 'meetings/@{id}'
			},

			wrap: {
				me: function(o, headers) {
					formatError(o, headers);

					if (!o.email) {
						return o;
					}

					o.name = o.fullName;
					o.first_name = o.name.split(' ')[0];
					o.last_name = o.name.split(' ')[1];
					o.id = o.email;

					return o;
				},

				'default': function(o, headers) {
					formatError(o, headers);

					return o;
				}
			},

			xhr: formatRequest

		}
	});

	function formatError(o, headers) {
		var errorCode;
		var message;
		var details;

		if (o && ('Message' in o)) {
			message = o.Message;
			delete o.Message;

			if ('ErrorCode' in o) {
				errorCode = o.ErrorCode;
				delete o.ErrorCode;
			}
			else {
				errorCode = getErrorCode(headers);
			}

			o.error = {
				code: errorCode,
				message: message,
				details: o
			};
		}

		return o;
	}

	function formatRequest(p, qs) {
		// Move the access token from the request body to the request header
		var token = qs.access_token;
		delete qs.access_token;
		p.headers.Authorization = 'Bearer ' + token;

		// Format non-get requests to indicate json body
		if (p.method !== 'get' && p.data) {
			p.headers['Content-Type'] = 'application/json';
			if (typeof (p.data) === 'object') {
				p.data = JSON.stringify(p.data);
			}
		}

		if (p.method === 'put') {
			p.method = 'patch';
		}

		return true;
	}

	function getErrorCode(headers) {
		switch (headers.statusCode) {
			case 400:
				return 'invalid_request';
			case 403:
				return 'stale_token';
			case 401:
				return 'invalid_token';
			case 500:
				return 'server_error';
			default:
				return 'server_error';
		}
	}

}(hello));

(function(hello) {

	hello.init({

		linkedin: {

			oauth: {
				version: 2,
				response_type: 'code',
				auth: 'https://www.linkedin.com/uas/oauth2/authorization',
				grant: 'https://www.linkedin.com/uas/oauth2/accessToken'
			},

			// Refresh the access_token once expired
			refresh: true,

			scope: {
				basic: 'r_basicprofile',
				email: 'r_emailaddress',
				files: '',
				friends: '',
				photos: '',
				publish: 'w_share',
				publish_files: 'w_share',
				share: '',
				videos: '',
				offline_access: ''
			},
			scope_delim: ' ',

			base: 'https://api.linkedin.com/v1/',

			get: {
				me: 'people/~:(picture-url,first-name,last-name,id,formatted-name,email-address)',

				// See: http://developer.linkedin.com/documents/get-network-updates-and-statistics-api
				'me/share': 'people/~/network/updates?count=@{limit|250}'
			},

			post: {

				// See: https://developer.linkedin.com/documents/api-requests-json
				'me/share': function(p, callback) {
					var data = {
						visibility: {
							code: 'anyone'
						}
					};

					if (p.data.id) {

						data.attribution = {
							share: {
								id: p.data.id
							}
						};

					}
					else {
						data.comment = p.data.message;
						if (p.data.picture && p.data.link) {
							data.content = {
								'submitted-url': p.data.link,
								'submitted-image-url': p.data.picture
							};
						}
					}

					p.data = JSON.stringify(data);

					callback('people/~/shares?format=json');
				},

				'me/like': like
			},

			del:{
				'me/like': like
			},

			wrap: {
				me: function(o) {
					formatError(o);
					formatUser(o);
					return o;
				},

				'me/friends': formatFriends,
				'me/following': formatFriends,
				'me/followers': formatFriends,
				'me/share': function(o) {
					formatError(o);
					paging(o);
					if (o.values) {
						o.data = o.values.map(formatUser);
						o.data.forEach(function(item) {
							item.message = item.headline;
						});

						delete o.values;
					}

					return o;
				},

				'default': function(o, headers) {
					formatError(o);
					empty(o, headers);
					paging(o);
				}
			},

			jsonp: function(p, qs) {
				formatQuery(qs);
				if (p.method === 'get') {
					qs.format = 'jsonp';
					qs['error-callback'] = p.callbackID;
				}
			},

			xhr: function(p, qs) {
				if (p.method !== 'get') {
					formatQuery(qs);
					p.headers['Content-Type'] = 'application/json';

					// Note: x-li-format ensures error responses are not returned in XML
					p.headers['x-li-format'] = 'json';
					p.proxy = true;
					return true;
				}

				return false;
			}
		}
	});

	function formatError(o) {
		if (o && 'errorCode' in o) {
			o.error = {
				code: o.status,
				message: o.message
			};
		}
	}

	function formatUser(o) {
		if (o.error) {
			return;
		}

		o.first_name = o.firstName;
		o.last_name = o.lastName;
		o.name = o.formattedName || (o.first_name + ' ' + o.last_name);
		o.thumbnail = o.pictureUrl;
		o.email = o.emailAddress;
		return o;
	}

	function formatFriends(o) {
		formatError(o);
		paging(o);
		if (o.values) {
			o.data = o.values.map(formatUser);
			delete o.values;
		}

		return o;
	}

	function paging(res) {
		if ('_count' in res && '_start' in res && (res._count + res._start) < res._total) {
			res.paging = {
				next: '?start=' + (res._start + res._count) + '&count=' + res._count
			};
		}
	}

	function empty(o, headers) {
		if (JSON.stringify(o) === '{}' && headers.statusCode === 200) {
			o.success = true;
		}
	}

	function formatQuery(qs) {
		// LinkedIn signs requests with the parameter 'oauth2_access_token'
		// ... yeah another one who thinks they should be different!
		if (qs.access_token) {
			qs.oauth2_access_token = qs.access_token;
			delete qs.access_token;
		}
	}

	function like(p, callback) {
		p.headers['x-li-format'] = 'json';
		var id = p.data.id;
		p.data = (p.method !== 'delete').toString();
		p.method = 'put';
		callback('people/~/network/updates/key=' + id + '/is-liked');
	}

})(hello);

// See: https://developers.soundcloud.com/docs/api/reference
(function(hello) {

	hello.init({

		soundcloud: {
			name: 'SoundCloud',

			oauth: {
				version: 2,
				auth: 'https://soundcloud.com/connect',
				grant: 'https://soundcloud.com/oauth2/token'
			},

			// Request path translated
			base: 'https://api.soundcloud.com/',
			get: {
				me: 'me.json',

				// Http://developers.soundcloud.com/docs/api/reference#me
				'me/friends': 'me/followings.json',
				'me/followers': 'me/followers.json',
				'me/following': 'me/followings.json',

				// See: http://developers.soundcloud.com/docs/api/reference#activities
				'default': function(p, callback) {

					// Include '.json at the end of each request'
					callback(p.path + '.json');
				}
			},

			// Response handlers
			wrap: {
				me: function(o) {
					formatUser(o);
					return o;
				},

				'default': function(o) {
					if (Array.isArray(o)) {
						o = {
							data: o.map(formatUser)
						};
					}

					paging(o);
					return o;
				}
			},

			xhr: formatRequest,
			jsonp: formatRequest
		}
	});

	function formatRequest(p, qs) {
		// Alter the querystring
		var token = qs.access_token;
		delete qs.access_token;
		qs.oauth_token = token;
		qs['_status_code_map[302]'] = 200;
		return true;
	}

	function formatUser(o) {
		if (o.id) {
			o.picture = o.avatar_url;
			o.thumbnail = o.avatar_url;
			o.name = o.username || o.full_name;
		}

		return o;
	}

	// See: http://developers.soundcloud.com/docs/api/reference#activities
	function paging(res) {
		if ('next_href' in res) {
			res.paging = {
				next: res.next_href
			};
		}
	}

})(hello);

(function(hello) {

	var base = 'https://api.twitter.com/';

	hello.init({

		twitter: {

			// Ensure that you define an oauth_proxy
			oauth: {
				version: '1.0a',
				auth: base + 'oauth/authenticate',
				request: base + 'oauth/request_token',
				token: base + 'oauth/access_token'
			},

			login: function(p) {
				// Reauthenticate
				// https://dev.twitter.com/oauth/reference/get/oauth/authenticate
				var prefix = '?force_login=true';
				this.oauth.auth = this.oauth.auth.replace(prefix, '') + (p.options.force ? prefix : '');
			},

			base: base + '1.1/',

			get: {
				me: 'account/verify_credentials.json',
				'me/friends': 'friends/list.json?count=@{limit|200}',
				'me/following': 'friends/list.json?count=@{limit|200}',
				'me/followers': 'followers/list.json?count=@{limit|200}',

				// Https://dev.twitter.com/docs/api/1.1/get/statuses/user_timeline
				'me/share': 'statuses/user_timeline.json?count=@{limit|200}',

				// Https://dev.twitter.com/rest/reference/get/favorites/list
				'me/like': 'favorites/list.json?count=@{limit|200}'
			},

			post: {
				'me/share': function(p, callback) {

					var data = p.data;
					p.data = null;

					var status = [];

					// Change message to status
					if (data.message) {
						status.push(data.message);
						delete data.message;
					}

					// If link is given
					if (data.link) {
						status.push(data.link);
						delete data.link;
					}

					if (data.picture) {
						status.push(data.picture);
						delete data.picture;
					}

					// Compound all the components
					if (status.length) {
						data.status = status.join(' ');
					}

					// Tweet media
					if (data.file) {
						data['media[]'] = data.file;
						delete data.file;
						p.data = data;
						callback('statuses/update_with_media.json');
					}

					// Retweet?
					else if ('id' in data) {
						callback('statuses/retweet/' + data.id + '.json');
					}

					// Tweet
					else {
						// Assign the post body to the query parameters
						hello.utils.extend(p.query, data);
						callback('statuses/update.json?include_entities=1');
					}
				},

				// See: https://dev.twitter.com/rest/reference/post/favorites/create
				'me/like': function(p, callback) {
					var id = p.data.id;
					p.data = null;
					callback('favorites/create.json?id=' + id);
				}
			},

			del: {

				// See: https://dev.twitter.com/rest/reference/post/favorites/destroy
				'me/like': function() {
					p.method = 'post';
					var id = p.data.id;
					p.data = null;
					callback('favorites/destroy.json?id=' + id);
				}
			},

			wrap: {
				me: function(res) {
					formatError(res);
					formatUser(res);
					return res;
				},

				'me/friends': formatFriends,
				'me/followers': formatFriends,
				'me/following': formatFriends,

				'me/share': function(res) {
					formatError(res);
					paging(res);
					if (!res.error && 'length' in res) {
						return {data: res};
					}

					return res;
				},

				'default': function(res) {
					res = arrayToDataResponse(res);
					paging(res);
					return res;
				}
			},
			xhr: function(p) {

				// Rely on the proxy for non-GET requests.
				return (p.method !== 'get');
			}
		}
	});

	function formatUser(o) {
		if (o.id) {
			if (o.name) {
				var m = o.name.split(' ');
				o.first_name = m.shift();
				o.last_name = m.join(' ');
			}

			// See: https://dev.twitter.com/overview/general/user-profile-images-and-banners
			o.thumbnail = o.profile_image_url_https || o.profile_image_url;
		}

		return o;
	}

	function formatFriends(o) {
		formatError(o);
		paging(o);
		if (o.users) {
			o.data = o.users.map(formatUser);
			delete o.users;
		}

		return o;
	}

	function formatError(o) {
		if (o.errors) {
			var e = o.errors[0];
			o.error = {
				code: 'request_failed',
				message: e.message
			};
		}
	}

	// Take a cursor and add it to the path
	function paging(res) {
		// Does the response include a 'next_cursor_string'
		if ('next_cursor_str' in res) {
			// See: https://dev.twitter.com/docs/misc/cursoring
			res.paging = {
				next: '?cursor=' + res.next_cursor_str
			};
		}
	}

	function arrayToDataResponse(res) {
		return Array.isArray(res) ? {data: res} : res;
	}

	/**
	// The documentation says to define user in the request
	// Although its not actually required.

	var user_id;

	function withUserId(callback){
		if(user_id){
			callback(user_id);
		}
		else{
			hello.api('twitter:/me', function(o){
				user_id = o.id;
				callback(o.id);
			});
		}
	}

	function sign(url){
		return function(p, callback){
			withUserId(function(user_id){
				callback(url+'?user_id='+user_id);
			});
		};
	}
	*/

})(hello);

// Vkontakte (vk.com)
(function(hello) {

	hello.init({

		vk: {
			name: 'Vk',

			// See https://vk.com/dev/oauth_dialog
			oauth: {
				version: 2,
				auth: 'https://oauth.vk.com/authorize',
				grant: 'https://oauth.vk.com/access_token'
			},

			// Authorization scopes
			// See https://vk.com/dev/permissions
			scope: {
				email: 'email',
				friends: 'friends',
				photos: 'photos',
				videos: 'video',
				share: 'share',
				offline_access: 'offline'
			},

			// Refresh the access_token
			refresh: true,

			login: function(p) {
				p.qs.display = window.navigator &&
					window.navigator.userAgent &&
					/ipad|phone|phone|android/.test(window.navigator.userAgent.toLowerCase()) ? 'mobile' : 'popup';
			},

			// API Base URL
			base: 'https://api.vk.com/method/',

			// Map GET requests
			get: {
				me: function(p, callback) {
					p.query.fields = 'id,first_name,last_name,photo_max';
					callback('users.get');
				}
			},

			wrap: {
				me: function(res, headers, req) {
					formatError(res);
					return formatUser(res, req);
				}
			},

			// No XHR
			xhr: false,

			// All requests should be JSONP as of missing CORS headers in https://api.vk.com/method/*
			jsonp: true,

			// No form
			form: false
		}
	});

	function formatUser(o, req) {

		if (o !== null && 'response' in o && o.response !== null && o.response.length) {
			o = o.response[0];
			o.id = o.uid;
			o.thumbnail = o.picture = o.photo_max;
			o.name = o.first_name + ' ' + o.last_name;

			if (req.authResponse && req.authResponse.email !== null)
				o.email = req.authResponse.email;
		}

		return o;
	}

	function formatError(o) {

		if (o.error) {
			var e = o.error;
			o.error = {
				code: e.error_code,
				message: e.error_msg
			};
		}
	}

})(hello);

(function(hello) {

	hello.init({
		windows: {
			name: 'Windows live',

			// REF: http://msdn.microsoft.com/en-us/library/hh243641.aspx
			oauth: {
				version: 2,
				auth: 'https://login.live.com/oauth20_authorize.srf',
				grant: 'https://login.live.com/oauth20_token.srf'
			},

			// Refresh the access_token once expired
			refresh: true,

			logout: function() {
				return 'http://login.live.com/oauth20_logout.srf?ts=' + (new Date()).getTime();
			},

			// Authorization scopes
			scope: {
				basic: 'wl.signin,wl.basic',
				email: 'wl.emails',
				birthday: 'wl.birthday',
				events: 'wl.calendars',
				photos: 'wl.photos',
				videos: 'wl.photos',
				friends: 'wl.contacts_emails',
				files: 'wl.skydrive',
				publish: 'wl.share',
				publish_files: 'wl.skydrive_update',
				share: 'wl.share',
				create_event: 'wl.calendars_update,wl.events_create',
				offline_access: 'wl.offline_access'
			},

			// API base URL
			base: 'https://apis.live.net/v5.0/',

			// Map GET requests
			get: {

				// Friends
				me: 'me',
				'me/friends': 'me/friends',
				'me/following': 'me/contacts',
				'me/followers': 'me/friends',
				'me/contacts': 'me/contacts',

				'me/albums': 'me/albums',

				// Include the data[id] in the path
				'me/album': '@{id}/files',
				'me/photo': '@{id}',

				// Files
				'me/files': '@{parent|me/skydrive}/files',
				'me/folders': '@{id|me/skydrive}/files',
				'me/folder': '@{id|me/skydrive}/files'
			},

			// Map POST requests
			post: {
				'me/albums': 'me/albums',
				'me/album': '@{id}/files/',

				'me/folders': '@{id|me/skydrive/}',
				'me/files': '@{parent|me/skydrive}/files'
			},

			// Map DELETE requests
			del: {
				// Include the data[id] in the path
				'me/album': '@{id}',
				'me/photo': '@{id}',
				'me/folder': '@{id}',
				'me/files': '@{id}'
			},

			wrap: {
				me: formatUser,

				'me/friends': formatFriends,
				'me/contacts': formatFriends,
				'me/followers': formatFriends,
				'me/following': formatFriends,
				'me/albums': formatAlbums,
				'me/photos': formatDefault,
				'default': formatDefault
			},

			xhr: function(p) {
				if (p.method !== 'get' && p.method !== 'delete' && !hello.utils.hasBinary(p.data)) {

					// Does this have a data-uri to upload as a file?
					if (typeof (p.data.file) === 'string') {
						p.data.file = hello.utils.toBlob(p.data.file);
					}
					else {
						p.data = JSON.stringify(p.data);
						p.headers = {
							'Content-Type': 'application/json'
						};
					}
				}

				return true;
			},

			jsonp: function(p) {
				if (p.method !== 'get' && !hello.utils.hasBinary(p.data)) {
					p.data.method = p.method;
					p.method = 'get';
				}
			}
		}
	});

	function formatDefault(o) {
		if ('data' in o) {
			o.data.forEach(function(d) {
				if (d.picture) {
					d.thumbnail = d.picture;
				}

				if (d.images) {
					d.pictures = d.images
						.map(formatImage)
						.sort(function(a, b) {
							return a.width - b.width;
						});
				}
			});
		}

		return o;
	}

	function formatImage(image) {
		return {
			width: image.width,
			height: image.height,
			source: image.source
		};
	}

	function formatAlbums(o) {
		if ('data' in o) {
			o.data.forEach(function(d) {
				d.photos = d.files = 'https://apis.live.net/v5.0/' + d.id + '/photos';
			});
		}

		return o;
	}

	function formatUser(o, headers, req) {
		if (o.id) {
			var token = req.query.access_token;
			if (o.emails) {
				o.email = o.emails.preferred;
			}

			// If this is not an non-network friend
			if (o.is_friend !== false) {
				// Use the id of the user_id if available
				var id = (o.user_id || o.id);
				o.thumbnail = o.picture = 'https://apis.live.net/v5.0/' + id + '/picture?access_token=' + token;
			}
		}

		return o;
	}

	function formatFriends(o, headers, req) {
		if ('data' in o) {
			o.data.forEach(function(d) {
				formatUser(d, headers, req);
			});
		}

		return o;
	}

})(hello);

(function(hello) {

	hello.init({

		yahoo: {

			// Ensure that you define an oauth_proxy
			oauth: {
				version: '1.0a',
				auth: 'https://api.login.yahoo.com/oauth/v2/request_auth',
				request: 'https://api.login.yahoo.com/oauth/v2/get_request_token',
				token: 'https://api.login.yahoo.com/oauth/v2/get_token'
			},

			// Login handler
			login: function(p) {
				// Change the default popup window to be at least 560
				// Yahoo does dynamically change it on the fly for the signin screen (only, what if your already signed in)
				p.options.popup.width = 560;

				// Yahoo throws an parameter error if for whatever reason the state.scope contains a comma, so lets remove scope
				try {delete p.qs.state.scope;}
				catch (e) {}
			},

			base: 'https://social.yahooapis.com/v1/',

			get: {
				me: yql('select * from social.profile(0) where guid=me'),
				'me/friends': yql('select * from social.contacts(0) where guid=me'),
				'me/following': yql('select * from social.contacts(0) where guid=me')
			},
			wrap: {
				me: formatUser,

				// Can't get IDs
				// It might be better to loop through the social.relationship table with has unique IDs of users.
				'me/friends': formatFriends,
				'me/following': formatFriends,
				'default': paging
			}
		}
	});

	/*
		// Auto-refresh fix: bug in Yahoo can't get this to work with node-oauth-shim
		login : function(o){
			// Is the user already logged in
			var auth = hello('yahoo').getAuthResponse();

			// Is this a refresh token?
			if(o.options.display==='none'&&auth&&auth.access_token&&auth.refresh_token){
				// Add the old token and the refresh token, including path to the query
				// See http://developer.yahoo.com/oauth/guide/oauth-refreshaccesstoken.html
				o.qs.access_token = auth.access_token;
				o.qs.refresh_token = auth.refresh_token;
				o.qs.token_url = 'https://api.login.yahoo.com/oauth/v2/get_token';
			}
		},
	*/

	function formatError(o) {
		if (o && 'meta' in o && 'error_type' in o.meta) {
			o.error = {
				code: o.meta.error_type,
				message: o.meta.error_message
			};
		}
	}

	function formatUser(o) {

		formatError(o);
		if (o.query && o.query.results && o.query.results.profile) {
			o = o.query.results.profile;
			o.id = o.guid;
			o.last_name = o.familyName;
			o.first_name = o.givenName || o.nickname;
			var a = [];
			if (o.first_name) {
				a.push(o.first_name);
			}

			if (o.last_name) {
				a.push(o.last_name);
			}

			o.name = a.join(' ');
			o.email = (o.emails && o.emails[0]) ? o.emails[0].handle : null;
			o.thumbnail = o.image ? o.image.imageUrl : null;
		}

		return o;
	}

	function formatFriends(o, headers, request) {
		formatError(o);
		paging(o, headers, request);
		var contact;
		var field;
		if (o.query && o.query.results && o.query.results.contact) {
			o.data = o.query.results.contact;
			delete o.query;

			if (!Array.isArray(o.data)) {
				o.data = [o.data];
			}

			o.data.forEach(formatFriend);
		}

		return o;
	}

	function formatFriend(contact) {
		contact.id = null;

		// #362: Reports of responses returning a single item, rather than an Array of items.
		// Format the contact.fields to be an array.
		if (contact.fields && !(contact.fields instanceof Array)) {
			contact.fields = [contact.fields];
		}

		(contact.fields || []).forEach(function(field) {
			if (field.type === 'email') {
				contact.email = field.value;
			}

			if (field.type === 'name') {
				contact.first_name = field.value.givenName;
				contact.last_name = field.value.familyName;
				contact.name = field.value.givenName + ' ' + field.value.familyName;
			}

			if (field.type === 'yahooid') {
				contact.id = field.value;
			}
		});
	}

	function paging(res, headers, request) {

		// See: http://developer.yahoo.com/yql/guide/paging.html#local_limits
		if (res.query && res.query.count && request.options) {
			res.paging = {
				next: '?start=' + (res.query.count + (+request.options.start || 1))
			};
		}

		return res;
	}

	function yql(q) {
		return 'https://query.yahooapis.com/v1/yql?q=' + (q + ' limit @{limit|100} offset @{start|0}').replace(/\s/g, '%20') + '&format=json';
	}

})(hello);

// Register as anonymous AMD module
if (typeof define === 'function' && define.amd) {
	define(function() {
		return hello;
	});
}

// CommonJS module for browserify
if (typeof module === 'object' && module.exports) {
	module.exports = hello;
}

/*! hellojs v1.14.0 | (c) 2012-2016 Andrew Dodson | MIT https://adodson.com/hello.js/LICENSE */
// ES5 Object.create
if (!Object.create) {

	// Shim, Object create
	// A shim for Object.create(), it adds a prototype to a new object
	Object.create = (function() {

		function F() {}

		return function(o) {

			if (arguments.length != 1) {
				throw new Error('Object.create implementation only accepts one parameter.');
			}

			F.prototype = o;
			return new F();
		};

	})();

}

// ES5 Object.keys
if (!Object.keys) {
	Object.keys = function(o, k, r) {
		r = [];
		for (k in o) {
			if (r.hasOwnProperty.call(o, k))
				r.push(k);
		}

		return r;
	};
}

// ES5 [].indexOf
if (!Array.prototype.indexOf) {
	Array.prototype.indexOf = function(s) {

		for (var j = 0; j < this.length; j++) {
			if (this[j] === s) {
				return j;
			}
		}

		return -1;
	};
}

// ES5 [].forEach
if (!Array.prototype.forEach) {
	Array.prototype.forEach = function(fun/*, thisArg*/) {

		if (this === void 0 || this === null) {
			throw new TypeError();
		}

		var t = Object(this);
		var len = t.length >>> 0;
		if (typeof fun !== 'function') {
			throw new TypeError();
		}

		var thisArg = arguments.length >= 2 ? arguments[1] : void 0;
		for (var i = 0; i < len; i++) {
			if (i in t) {
				fun.call(thisArg, t[i], i, t);
			}
		}

		return this;
	};
}

// ES5 [].filter
if (!Array.prototype.filter) {
	Array.prototype.filter = function(fun, thisArg) {

		var a = [];
		this.forEach(function(val, i, t) {
			if (fun.call(thisArg || void 0, val, i, t)) {
				a.push(val);
			}
		});

		return a;
	};
}

// Production steps of ECMA-262, Edition 5, 15.4.4.19
// Reference: http://es5.github.io/#x15.4.4.19
if (!Array.prototype.map) {

	Array.prototype.map = function(fun, thisArg) {

		var a = [];
		this.forEach(function(val, i, t) {
			a.push(fun.call(thisArg || void 0, val, i, t));
		});

		return a;
	};
}

// ES5 isArray
if (!Array.isArray) {

	// Function Array.isArray
	Array.isArray = function(o) {
		return Object.prototype.toString.call(o) === '[object Array]';
	};

}

// Test for location.assign
if (typeof window === 'object' && typeof window.location === 'object' && !window.location.assign) {

	window.location.assign = function(url) {
		window.location = url;
	};

}

// Test for Function.bind
if (!Function.prototype.bind) {

	// MDN
	// Polyfill IE8, does not support native Function.bind
	Function.prototype.bind = function(b) {

		if (typeof this !== 'function') {
			throw new TypeError('Function.prototype.bind - what is trying to be bound is not callable');
		}

		function C() {}

		var a = [].slice;
		var f = a.call(arguments, 1);
		var _this = this;
		var D = function() {
			return _this.apply(this instanceof C ? this : b || window, f.concat(a.call(arguments)));
		};

		C.prototype = this.prototype;
		D.prototype = new C();

		return D;
	};

}

/**
 * @hello.js
 *
 * HelloJS is a client side Javascript SDK for making OAuth2 logins and subsequent REST calls.
 *
 * @author Andrew Dodson
 * @website https://adodson.com/hello.js/
 *
 * @copyright Andrew Dodson, 2012 - 2015
 * @license MIT: You are free to use and modify this code for any use, on the condition that this copyright notice remains.
 */

var hello = function(name) {
	return hello.use(name);
};

hello.utils = {

	// Extend the first object with the properties and methods of the second
	extend: function(r /*, a[, b[, ...]] */) {

		// Get the arguments as an array but ommit the initial item
		Array.prototype.slice.call(arguments, 1).forEach(function(a) {
			if (Array.isArray(r) && Array.isArray(a)) {
				Array.prototype.push.apply(r, a);
			}
			else if (r instanceof Object && a instanceof Object && r !== a) {
				for (var x in a) {
					r[x] = hello.utils.extend(r[x], a[x]);
				}
			}
			else {

				if (Array.isArray(a)) {
					// Clone it
					a = a.slice(0);
				}

				r = a;
			}
		});

		return r;
	}
};

// Core library
hello.utils.extend(hello, {

	settings: {

		// OAuth2 authentication defaults
		redirect_uri: window.location.href.split('#')[0],
		response_type: 'token',
		display: 'popup',
		state: '',

		// OAuth1 shim
		// The path to the OAuth1 server for signing user requests
		// Want to recreate your own? Checkout https://github.com/MrSwitch/node-oauth-shim
		oauth_proxy: 'https://auth-server.herokuapp.com/proxy',

		// API timeout in milliseconds
		timeout: 20000,

		// Popup Options
		popup: {
			resizable: 1,
			scrollbars: 1,
			width: 500,
			height: 550
		},

		// Default scope
		// Many services require atleast a profile scope,
		// HelloJS automatially includes the value of provider.scope_map.basic
		// If that's not required it can be removed via hello.settings.scope.length = 0;
		scope: ['basic'],

		// Scope Maps
		// This is the default module scope, these are the defaults which each service is mapped too.
		// By including them here it prevents the scope from being applied accidentally
		scope_map: {
			basic: ''
		},

		// Default service / network
		default_service: null,

		// Force authentication
		// When hello.login is fired.
		// (null): ignore current session expiry and continue with login
		// (true): ignore current session expiry and continue with login, ask for user to reauthenticate
		// (false): if the current session looks good for the request scopes return the current session.
		force: null,

		// Page URL
		// When 'display=page' this property defines where the users page should end up after redirect_uri
		// Ths could be problematic if the redirect_uri is indeed the final place,
		// Typically this circumvents the problem of the redirect_url being a dumb relay page.
		page_uri: window.location.href
	},

	// Service configuration objects
	services: {},

	// Use
	// Define a new instance of the HelloJS library with a default service
	use: function(service) {

		// Create self, which inherits from its parent
		var self = Object.create(this);

		// Inherit the prototype from its parent
		self.settings = Object.create(this.settings);

		// Define the default service
		if (service) {
			self.settings.default_service = service;
		}

		// Create an instance of Events
		self.utils.Event.call(self);

		return self;
	},

	// Initialize
	// Define the client_ids for the endpoint services
	// @param object o, contains a key value pair, service => clientId
	// @param object opts, contains a key value pair of options used for defining the authentication defaults
	// @param number timeout, timeout in seconds
	init: function(services, options) {

		var utils = this.utils;

		if (!services) {
			return this.services;
		}

		// Define provider credentials
		// Reformat the ID field
		for (var x in services) {if (services.hasOwnProperty(x)) {
			if (typeof (services[x]) !== 'object') {
				services[x] = {id: services[x]};
			}
		}}

		// Merge services if there already exists some
		utils.extend(this.services, services);

		// Update the default settings with this one.
		if (options) {
			utils.extend(this.settings, options);

			// Do this immediatly incase the browser changes the current path.
			if ('redirect_uri' in options) {
				this.settings.redirect_uri = utils.url(options.redirect_uri).href;
			}
		}

		return this;
	},

	// Login
	// Using the endpoint
	// @param network stringify       name to connect to
	// @param options object    (optional)  {display mode, is either none|popup(default)|page, scope: email,birthday,publish, .. }
	// @param callback  function  (optional)  fired on signin
	login: function() {

		// Create an object which inherits its parent as the prototype and constructs a new event chain.
		var _this = this;
		var utils = _this.utils;
		var error = utils.error;
		var promise = utils.Promise();

		// Get parameters
		var p = utils.args({network: 's', options: 'o', callback: 'f'}, arguments);

		// Local vars
		var url;

		// Get all the custom options and store to be appended to the querystring
		var qs = utils.diffKey(p.options, _this.settings);

		// Merge/override options with app defaults
		var opts = p.options = utils.merge(_this.settings, p.options || {});

		// Merge/override options with app defaults
		opts.popup = utils.merge(_this.settings.popup, p.options.popup || {});

		// Network
		p.network = p.network || _this.settings.default_service;

		// Bind callback to both reject and fulfill states
		promise.proxy.then(p.callback, p.callback);

		// Trigger an event on the global listener
		function emit(s, value) {
			hello.emit(s, value);
		}

		promise.proxy.then(emit.bind(this, 'auth.login auth'), emit.bind(this, 'auth.failed auth'));

		// Is our service valid?
		if (typeof (p.network) !== 'string' || !(p.network in _this.services)) {
			// Trigger the default login.
			// Ahh we dont have one.
			return promise.reject(error('invalid_network', 'The provided network was not recognized'));
		}

		var provider = _this.services[p.network];

		// Create a global listener to capture events triggered out of scope
		var callbackId = utils.globalEvent(function(str) {

			// The responseHandler returns a string, lets save this locally
			var obj;

			if (str) {
				obj = JSON.parse(str);
			}
			else {
				obj = error('cancelled', 'The authentication was not completed');
			}

			// Handle these response using the local
			// Trigger on the parent
			if (!obj.error) {

				// Save on the parent window the new credentials
				// This fixes an IE10 bug i think... atleast it does for me.
				utils.store(obj.network, obj);

				// Fulfill a successful login
				promise.fulfill({
					network: obj.network,
					authResponse: obj
				});
			}
			else {
				// Reject a successful login
				promise.reject(obj);
			}
		});

		var redirectUri = utils.url(opts.redirect_uri).href;

		// May be a space-delimited list of multiple, complementary types
		var responseType = provider.oauth.response_type || opts.response_type;

		// Fallback to token if the module hasn't defined a grant url
		if (/\bcode\b/.test(responseType) && !provider.oauth.grant) {
			responseType = responseType.replace(/\bcode\b/, 'token');
		}

		// Query string parameters, we may pass our own arguments to form the querystring
		p.qs = utils.merge(qs, {
			client_id: encodeURIComponent(provider.id),
			response_type: encodeURIComponent(responseType),
			redirect_uri: encodeURIComponent(redirectUri),
			state: {
				client_id: provider.id,
				network: p.network,
				display: opts.display,
				callback: callbackId,
				state: opts.state,
				redirect_uri: redirectUri
			}
		});

		// Get current session for merging scopes, and for quick auth response
		var session = utils.store(p.network);

		// Scopes (authentication permisions)
		// Ensure this is a string - IE has a problem moving Arrays between windows
		// Append the setup scope
		var SCOPE_SPLIT = /[,\s]+/;

		// Include default scope settings (cloned).
		var scope = _this.settings.scope ? [_this.settings.scope.toString()] : [];

		// Extend the providers scope list with the default
		var scopeMap = utils.merge(_this.settings.scope_map, provider.scope || {});

		// Add user defined scopes...
		if (opts.scope) {
			scope.push(opts.scope.toString());
		}

		// Append scopes from a previous session.
		// This helps keep app credentials constant,
		// Avoiding having to keep tabs on what scopes are authorized
		if (session && 'scope' in session && session.scope instanceof String) {
			scope.push(session.scope);
		}

		// Join and Split again
		scope = scope.join(',').split(SCOPE_SPLIT);

		// Format remove duplicates and empty values
		scope = utils.unique(scope).filter(filterEmpty);

		// Save the the scopes to the state with the names that they were requested with.
		p.qs.state.scope = scope.join(',');

		// Map scopes to the providers naming convention
		scope = scope.map(function(item) {
			// Does this have a mapping?
			return (item in scopeMap) ? scopeMap[item] : item;
		});

		// Stringify and Arrayify so that double mapped scopes are given the chance to be formatted
		scope = scope.join(',').split(SCOPE_SPLIT);

		// Again...
		// Format remove duplicates and empty values
		scope = utils.unique(scope).filter(filterEmpty);

		// Join with the expected scope delimiter into a string
		p.qs.scope = scope.join(provider.scope_delim || ',');

		// Is the user already signed in with the appropriate scopes, valid access_token?
		if (opts.force === false) {

			if (session && 'access_token' in session && session.access_token && 'expires' in session && session.expires > ((new Date()).getTime() / 1e3)) {
				// What is different about the scopes in the session vs the scopes in the new login?
				var diff = utils.diff((session.scope || '').split(SCOPE_SPLIT), (p.qs.state.scope || '').split(SCOPE_SPLIT));
				if (diff.length === 0) {

					// OK trigger the callback
					promise.fulfill({
						unchanged: true,
						network: p.network,
						authResponse: session
					});

					// Nothing has changed
					return promise;
				}
			}
		}

		// Page URL
		if (opts.display === 'page' && opts.page_uri) {
			// Add a page location, place to endup after session has authenticated
			p.qs.state.page_uri = utils.url(opts.page_uri).href;
		}

		// Bespoke
		// Override login querystrings from auth_options
		if ('login' in provider && typeof (provider.login) === 'function') {
			// Format the paramaters according to the providers formatting function
			provider.login(p);
		}

		// Add OAuth to state
		// Where the service is going to take advantage of the oauth_proxy
		if (!/\btoken\b/.test(responseType) ||
		parseInt(provider.oauth.version, 10) < 2 ||
		(opts.display === 'none' && provider.oauth.grant && session && session.refresh_token)) {

			// Add the oauth endpoints
			p.qs.state.oauth = provider.oauth;

			// Add the proxy url
			p.qs.state.oauth_proxy = opts.oauth_proxy;

		}

		// Convert state to a string
		p.qs.state = encodeURIComponent(JSON.stringify(p.qs.state));

		// URL
		if (parseInt(provider.oauth.version, 10) === 1) {

			// Turn the request to the OAuth Proxy for 3-legged auth
			url = utils.qs(opts.oauth_proxy, p.qs, encodeFunction);
		}

		// Refresh token
		else if (opts.display === 'none' && provider.oauth.grant && session && session.refresh_token) {

			// Add the refresh_token to the request
			p.qs.refresh_token = session.refresh_token;

			// Define the request path
			url = utils.qs(opts.oauth_proxy, p.qs, encodeFunction);
		}
		else {
			url = utils.qs(provider.oauth.auth, p.qs, encodeFunction);
		}

		// Broadcast this event as an auth:init
		emit('auth.init', p);

		// Execute
		// Trigger how we want self displayed
		if (opts.display === 'none') {
			// Sign-in in the background, iframe
			utils.iframe(url, redirectUri);
		}

		// Triggering popup?
		else if (opts.display === 'popup') {

			var popup = utils.popup(url, redirectUri, opts.popup);

			var timer = setInterval(function() {
				if (!popup || popup.closed) {
					clearInterval(timer);
					if (!promise.state) {

						var response = error('cancelled', 'Login has been cancelled');

						if (!popup) {
							response = error('blocked', 'Popup was blocked');
						}

						response.network = p.network;

						promise.reject(response);
					}
				}
			}, 100);
		}

		else {
			window.location = url;
		}

		return promise.proxy;

		function encodeFunction(s) {return s;}

		function filterEmpty(s) {return !!s;}
	},

	// Remove any data associated with a given service
	// @param string name of the service
	// @param function callback
	logout: function() {

		var _this = this;
		var utils = _this.utils;
		var error = utils.error;

		// Create a new promise
		var promise = utils.Promise();

		var p = utils.args({name:'s', options: 'o', callback: 'f'}, arguments);

		p.options = p.options || {};

		// Add callback to events
		promise.proxy.then(p.callback, p.callback);

		// Trigger an event on the global listener
		function emit(s, value) {
			hello.emit(s, value);
		}

		promise.proxy.then(emit.bind(this, 'auth.logout auth'), emit.bind(this, 'error'));

		// Network
		p.name = p.name || this.settings.default_service;
		p.authResponse = utils.store(p.name);

		if (p.name && !(p.name in _this.services)) {

			promise.reject(error('invalid_network', 'The network was unrecognized'));

		}
		else if (p.name && p.authResponse) {

			// Define the callback
			var callback = function(opts) {

				// Remove from the store
				utils.store(p.name, null);

				// Emit events by default
				promise.fulfill(hello.utils.merge({network:p.name}, opts || {}));
			};

			// Run an async operation to remove the users session
			var _opts = {};
			if (p.options.force) {
				var logout = _this.services[p.name].logout;
				if (logout) {
					// Convert logout to URL string,
					// If no string is returned, then this function will handle the logout async style
					if (typeof (logout) === 'function') {
						logout = logout(callback, p);
					}

					// If logout is a string then assume URL and open in iframe.
					if (typeof (logout) === 'string') {
						utils.iframe(logout);
						_opts.force = null;
						_opts.message = 'Logout success on providers site was indeterminate';
					}
					else if (logout === undefined) {
						// The callback function will handle the response.
						return promise.proxy;
					}
				}
			}

			// Remove local credentials
			callback(_opts);
		}
		else {
			promise.reject(error('invalid_session', 'There was no session to remove'));
		}

		return promise.proxy;
	},

	// Returns all the sessions that are subscribed too
	// @param string optional, name of the service to get information about.
	getAuthResponse: function(service) {

		// If the service doesn't exist
		service = service || this.settings.default_service;

		if (!service || !(service in this.services)) {
			return null;
		}

		return this.utils.store(service) || null;
	},

	// Events: placeholder for the events
	events: {}
});

// Core utilities
hello.utils.extend(hello.utils, {

	// Error
	error: function(code, message) {
		return {
			error: {
				code: code,
				message: message
			}
		};
	},

	// Append the querystring to a url
	// @param string url
	// @param object parameters
	qs: function(url, params, formatFunction) {

		if (params) {

			// Set default formatting function
			formatFunction = formatFunction || encodeURIComponent;

			// Override the items in the URL which already exist
			for (var x in params) {
				var str = '([\\?\\&])' + x + '=[^\\&]*';
				var reg = new RegExp(str);
				if (url.match(reg)) {
					url = url.replace(reg, '$1' + x + '=' + formatFunction(params[x]));
					delete params[x];
				}
			}
		}

		if (!this.isEmpty(params)) {
			return url + (url.indexOf('?') > -1 ? '&' : '?') + this.param(params, formatFunction);
		}

		return url;
	},

	// Param
	// Explode/encode the parameters of an URL string/object
	// @param string s, string to decode
	param: function(s, formatFunction) {
		var b;
		var a = {};
		var m;

		if (typeof (s) === 'string') {

			formatFunction = formatFunction || decodeURIComponent;

			m = s.replace(/^[\#\?]/, '').match(/([^=\/\&]+)=([^\&]+)/g);
			if (m) {
				for (var i = 0; i < m.length; i++) {
					b = m[i].match(/([^=]+)=(.*)/);
					a[b[1]] = formatFunction(b[2]);
				}
			}

			return a;
		}
		else {

			formatFunction = formatFunction || encodeURIComponent;

			var o = s;

			a = [];

			for (var x in o) {if (o.hasOwnProperty(x)) {
				if (o.hasOwnProperty(x)) {
					a.push([x, o[x] === '?' ? '?' : formatFunction(o[x])].join('='));
				}
			}}

			return a.join('&');
		}
	},

	// Local storage facade
	store: (function() {

		var a = ['localStorage', 'sessionStorage'];
		var i = -1;
		var prefix = 'test';

		// Set LocalStorage
		var localStorage;

		while (a[++i]) {
			try {
				// In Chrome with cookies blocked, calling localStorage throws an error
				localStorage = window[a[i]];
				localStorage.setItem(prefix + i, i);
				localStorage.removeItem(prefix + i);
				break;
			}
			catch (e) {
				localStorage = null;
			}
		}

		if (!localStorage) {

			var cache = null;

			localStorage = {
				getItem: function(prop) {
					prop = prop + '=';
					var m = document.cookie.split(';');
					for (var i = 0; i < m.length; i++) {
						var _m = m[i].replace(/(^\s+|\s+$)/, '');
						if (_m && _m.indexOf(prop) === 0) {
							return _m.substr(prop.length);
						}
					}

					return cache;
				},

				setItem: function(prop, value) {
					cache = value;
					document.cookie = prop + '=' + value;
				}
			};

			// Fill the cache up
			cache = localStorage.getItem('hello');
		}

		function get() {
			var json = {};
			try {
				json = JSON.parse(localStorage.getItem('hello')) || {};
			}
			catch (e) {}

			return json;
		}

		function set(json) {
			localStorage.setItem('hello', JSON.stringify(json));
		}

		// Check if the browser support local storage
		return function(name, value, days) {

			// Local storage
			var json = get();

			if (name && value === undefined) {
				return json[name] || null;
			}
			else if (name && value === null) {
				try {
					delete json[name];
				}
				catch (e) {
					json[name] = null;
				}
			}
			else if (name) {
				json[name] = value;
			}
			else {
				return json;
			}

			set(json);

			return json || null;
		};

	})(),

	// Create and Append new DOM elements
	// @param node string
	// @param attr object literal
	// @param dom/string
	append: function(node, attr, target) {

		var n = typeof (node) === 'string' ? document.createElement(node) : node;

		if (typeof (attr) === 'object') {
			if ('tagName' in attr) {
				target = attr;
			}
			else {
				for (var x in attr) {if (attr.hasOwnProperty(x)) {
					if (typeof (attr[x]) === 'object') {
						for (var y in attr[x]) {if (attr[x].hasOwnProperty(y)) {
							n[x][y] = attr[x][y];
						}}
					}
					else if (x === 'html') {
						n.innerHTML = attr[x];
					}

					// IE doesn't like us setting methods with setAttribute
					else if (!/^on/.test(x)) {
						n.setAttribute(x, attr[x]);
					}
					else {
						n[x] = attr[x];
					}
				}}
			}
		}

		if (target === 'body') {
			(function self() {
				if (document.body) {
					document.body.appendChild(n);
				}
				else {
					setTimeout(self, 16);
				}
			})();
		}
		else if (typeof (target) === 'object') {
			target.appendChild(n);
		}
		else if (typeof (target) === 'string') {
			document.getElementsByTagName(target)[0].appendChild(n);
		}

		return n;
	},

	// An easy way to create a hidden iframe
	// @param string src
	iframe: function(src) {
		this.append('iframe', {src: src, style: {position:'absolute', left: '-1000px', bottom: 0, height: '1px', width: '1px'}}, 'body');
	},

	// Recursive merge two objects into one, second parameter overides the first
	// @param a array
	merge: function(/* Args: a, b, c, .. n */) {
		var args = Array.prototype.slice.call(arguments);
		args.unshift({});
		return this.extend.apply(null, args);
	},

	// Makes it easier to assign parameters, where some are optional
	// @param o object
	// @param a arguments
	args: function(o, args) {

		var p = {};
		var i = 0;
		var t = null;
		var x = null;

		// 'x' is the first key in the list of object parameters
		for (x in o) {if (o.hasOwnProperty(x)) {
			break;
		}}

		// Passing in hash object of arguments?
		// Where the first argument can't be an object
		if ((args.length === 1) && (typeof (args[0]) === 'object') && o[x] != 'o!') {

			// Could this object still belong to a property?
			// Check the object keys if they match any of the property keys
			for (x in args[0]) {if (o.hasOwnProperty(x)) {
				// Does this key exist in the property list?
				if (x in o) {
					// Yes this key does exist so its most likely this function has been invoked with an object parameter
					// Return first argument as the hash of all arguments
					return args[0];
				}
			}}
		}

		// Else loop through and account for the missing ones.
		for (x in o) {if (o.hasOwnProperty(x)) {

			t = typeof (args[i]);

			if ((typeof (o[x]) === 'function' && o[x].test(args[i])) || (typeof (o[x]) === 'string' && (
			(o[x].indexOf('s') > -1 && t === 'string') ||
			(o[x].indexOf('o') > -1 && t === 'object') ||
			(o[x].indexOf('i') > -1 && t === 'number') ||
			(o[x].indexOf('a') > -1 && t === 'object') ||
			(o[x].indexOf('f') > -1 && t === 'function')
			))
			) {
				p[x] = args[i++];
			}

			else if (typeof (o[x]) === 'string' && o[x].indexOf('!') > -1) {
				return false;
			}
		}}

		return p;
	},

	// Returns a URL instance
	url: function(path) {

		// If the path is empty
		if (!path) {
			return window.location;
		}

		// Chrome and FireFox support new URL() to extract URL objects
		else if (window.URL && URL instanceof Function && URL.length !== 0) {
			return new URL(path, window.location);
		}

		// Ugly shim, it works!
		else {
			var a = document.createElement('a');
			a.href = path;
			return a.cloneNode(false);
		}
	},

	diff: function(a, b) {
		return b.filter(function(item) {
			return a.indexOf(item) === -1;
		});
	},

	// Get the different hash of properties unique to `a`, and not in `b`
	diffKey: function(a, b) {
		if (a || !b) {
			var r = {};
			for (var x in a) {
				// Does the property not exist?
				if (!(x in b)) {
					r[x] = a[x];
				}
			}

			return r;
		}

		return a;
	},

	// Unique
	// Remove duplicate and null values from an array
	// @param a array
	unique: function(a) {
		if (!Array.isArray(a)) { return []; }

		return a.filter(function(item, index) {
			// Is this the first location of item
			return a.indexOf(item) === index;
		});
	},

	isEmpty: function(obj) {

		// Scalar
		if (!obj)
			return true;

		// Array
		if (Array.isArray(obj)) {
			return !obj.length;
		}
		else if (typeof (obj) === 'object') {
			// Object
			for (var key in obj) {
				if (obj.hasOwnProperty(key)) {
					return false;
				}
			}
		}

		return true;
	},

	//jscs:disable

	/*!
	 **  Thenable -- Embeddable Minimum Strictly-Compliant Promises/A+ 1.1.1 Thenable
	 **  Copyright (c) 2013-2014 Ralf S. Engelschall <http://engelschall.com>
	 **  Licensed under The MIT License <http://opensource.org/licenses/MIT>
	 **  Source-Code distributed on <http://github.com/rse/thenable>
	 */
	Promise: (function(){
		/*  promise states [Promises/A+ 2.1]  */
		var STATE_PENDING   = 0;                                         /*  [Promises/A+ 2.1.1]  */
		var STATE_FULFILLED = 1;                                         /*  [Promises/A+ 2.1.2]  */
		var STATE_REJECTED  = 2;                                         /*  [Promises/A+ 2.1.3]  */

		/*  promise object constructor  */
		var api = function (executor) {
			/*  optionally support non-constructor/plain-function call  */
			if (!(this instanceof api))
				return new api(executor);

			/*  initialize object  */
			this.id           = "Thenable/1.0.6";
			this.state        = STATE_PENDING; /*  initial state  */
			this.fulfillValue = undefined;     /*  initial value  */     /*  [Promises/A+ 1.3, 2.1.2.2]  */
			this.rejectReason = undefined;     /*  initial reason */     /*  [Promises/A+ 1.5, 2.1.3.2]  */
			this.onFulfilled  = [];            /*  initial handlers  */
			this.onRejected   = [];            /*  initial handlers  */

			/*  provide optional information-hiding proxy  */
			this.proxy = {
				then: this.then.bind(this)
			};

			/*  support optional executor function  */
			if (typeof executor === "function")
				executor.call(this, this.fulfill.bind(this), this.reject.bind(this));
		};

		/*  promise API methods  */
		api.prototype = {
			/*  promise resolving methods  */
			fulfill: function (value) { return deliver(this, STATE_FULFILLED, "fulfillValue", value); },
			reject:  function (value) { return deliver(this, STATE_REJECTED,  "rejectReason", value); },

			/*  "The then Method" [Promises/A+ 1.1, 1.2, 2.2]  */
			then: function (onFulfilled, onRejected) {
				var curr = this;
				var next = new api();                                    /*  [Promises/A+ 2.2.7]  */
				curr.onFulfilled.push(
					resolver(onFulfilled, next, "fulfill"));             /*  [Promises/A+ 2.2.2/2.2.6]  */
				curr.onRejected.push(
					resolver(onRejected,  next, "reject" ));             /*  [Promises/A+ 2.2.3/2.2.6]  */
				execute(curr);
				return next.proxy;                                       /*  [Promises/A+ 2.2.7, 3.3]  */
			}
		};

		/*  deliver an action  */
		var deliver = function (curr, state, name, value) {
			if (curr.state === STATE_PENDING) {
				curr.state = state;                                      /*  [Promises/A+ 2.1.2.1, 2.1.3.1]  */
				curr[name] = value;                                      /*  [Promises/A+ 2.1.2.2, 2.1.3.2]  */
				execute(curr);
			}
			return curr;
		};

		/*  execute all handlers  */
		var execute = function (curr) {
			if (curr.state === STATE_FULFILLED)
				execute_handlers(curr, "onFulfilled", curr.fulfillValue);
			else if (curr.state === STATE_REJECTED)
				execute_handlers(curr, "onRejected",  curr.rejectReason);
		};

		/*  execute particular set of handlers  */
		var execute_handlers = function (curr, name, value) {
			/* global process: true */
			/* global setImmediate: true */
			/* global setTimeout: true */

			/*  short-circuit processing  */
			if (curr[name].length === 0)
				return;

			/*  iterate over all handlers, exactly once  */
			var handlers = curr[name];
			curr[name] = [];                                             /*  [Promises/A+ 2.2.2.3, 2.2.3.3]  */
			var func = function () {
				for (var i = 0; i < handlers.length; i++)
					handlers[i](value);                                  /*  [Promises/A+ 2.2.5]  */
			};

			/*  execute procedure asynchronously  */                     /*  [Promises/A+ 2.2.4, 3.1]  */
			if (typeof process === "object" && typeof process.nextTick === "function")
				process.nextTick(func);
			else if (typeof setImmediate === "function")
				setImmediate(func);
			else
				setTimeout(func, 0);
		};

		/*  generate a resolver function  */
		var resolver = function (cb, next, method) {
			return function (value) {
				if (typeof cb !== "function")                            /*  [Promises/A+ 2.2.1, 2.2.7.3, 2.2.7.4]  */
					next[method].call(next, value);                      /*  [Promises/A+ 2.2.7.3, 2.2.7.4]  */
				else {
					var result;
					try { result = cb(value); }                          /*  [Promises/A+ 2.2.2.1, 2.2.3.1, 2.2.5, 3.2]  */
					catch (e) {
						next.reject(e);                                  /*  [Promises/A+ 2.2.7.2]  */
						return;
					}
					resolve(next, result);                               /*  [Promises/A+ 2.2.7.1]  */
				}
			};
		};

		/*  "Promise Resolution Procedure"  */                           /*  [Promises/A+ 2.3]  */
		var resolve = function (promise, x) {
			/*  sanity check arguments  */                               /*  [Promises/A+ 2.3.1]  */
			if (promise === x || promise.proxy === x) {
				promise.reject(new TypeError("cannot resolve promise with itself"));
				return;
			}

			/*  surgically check for a "then" method
				(mainly to just call the "getter" of "then" only once)  */
			var then;
			if ((typeof x === "object" && x !== null) || typeof x === "function") {
				try { then = x.then; }                                   /*  [Promises/A+ 2.3.3.1, 3.5]  */
				catch (e) {
					promise.reject(e);                                   /*  [Promises/A+ 2.3.3.2]  */
					return;
				}
			}

			/*  handle own Thenables    [Promises/A+ 2.3.2]
				and similar "thenables" [Promises/A+ 2.3.3]  */
			if (typeof then === "function") {
				var resolved = false;
				try {
					/*  call retrieved "then" method */                  /*  [Promises/A+ 2.3.3.3]  */
					then.call(x,
						/*  resolvePromise  */                           /*  [Promises/A+ 2.3.3.3.1]  */
						function (y) {
							if (resolved) return; resolved = true;       /*  [Promises/A+ 2.3.3.3.3]  */
							if (y === x)                                 /*  [Promises/A+ 3.6]  */
								promise.reject(new TypeError("circular thenable chain"));
							else
								resolve(promise, y);
						},

						/*  rejectPromise  */                            /*  [Promises/A+ 2.3.3.3.2]  */
						function (r) {
							if (resolved) return; resolved = true;       /*  [Promises/A+ 2.3.3.3.3]  */
							promise.reject(r);
						}
					);
				}
				catch (e) {
					if (!resolved)                                       /*  [Promises/A+ 2.3.3.3.3]  */
						promise.reject(e);                               /*  [Promises/A+ 2.3.3.3.4]  */
				}
				return;
			}

			/*  handle other values  */
			promise.fulfill(x);                                          /*  [Promises/A+ 2.3.4, 2.3.3.4]  */
		};

		/*  export API  */
		return api;
	})(),

	//jscs:enable

	// Event
	// A contructor superclass for adding event menthods, on, off, emit.
	Event: function() {

		var separator = /[\s\,]+/;

		// If this doesn't support getPrototype then we can't get prototype.events of the parent
		// So lets get the current instance events, and add those to a parent property
		this.parent = {
			events: this.events,
			findEvents: this.findEvents,
			parent: this.parent,
			utils: this.utils
		};

		this.events = {};

		// On, subscribe to events
		// @param evt   string
		// @param callback  function
		this.on = function(evt, callback) {

			if (callback && typeof (callback) === 'function') {
				var a = evt.split(separator);
				for (var i = 0; i < a.length; i++) {

					// Has this event already been fired on this instance?
					this.events[a[i]] = [callback].concat(this.events[a[i]] || []);
				}
			}

			return this;
		};

		// Off, unsubscribe to events
		// @param evt   string
		// @param callback  function
		this.off = function(evt, callback) {

			this.findEvents(evt, function(name, index) {
				if (!callback || this.events[name][index] === callback) {
					this.events[name][index] = null;
				}
			});

			return this;
		};

		// Emit
		// Triggers any subscribed events
		this.emit = function(evt /*, data, ... */) {

			// Get arguments as an Array, knock off the first one
			var args = Array.prototype.slice.call(arguments, 1);
			args.push(evt);

			// Handler
			var handler = function(name, index) {

				// Replace the last property with the event name
				args[args.length - 1] = (name === '*' ? evt : name);

				// Trigger
				this.events[name][index].apply(this, args);
			};

			// Find the callbacks which match the condition and call
			var _this = this;
			while (_this && _this.findEvents) {

				// Find events which match
				_this.findEvents(evt + ',*', handler);
				_this = _this.parent;
			}

			return this;
		};

		//
		// Easy functions
		this.emitAfter = function() {
			var _this = this;
			var args = arguments;
			setTimeout(function() {
				_this.emit.apply(_this, args);
			}, 0);

			return this;
		};

		this.findEvents = function(evt, callback) {

			var a = evt.split(separator);

			for (var name in this.events) {if (this.events.hasOwnProperty(name)) {

				if (a.indexOf(name) > -1) {

					for (var i = 0; i < this.events[name].length; i++) {

						// Does the event handler exist?
						if (this.events[name][i]) {
							// Emit on the local instance of this
							callback.call(this, name, i);
						}
					}
				}
			}}
		};

		return this;
	},

	// Global Events
	// Attach the callback to the window object
	// Return its unique reference
	globalEvent: function(callback, guid) {
		// If the guid has not been supplied then create a new one.
		guid = guid || '_hellojs_' + parseInt(Math.random() * 1e12, 10).toString(36);

		// Define the callback function
		window[guid] = function() {
			// Trigger the callback
			try {
				if (callback.apply(this, arguments)) {
					delete window[guid];
				}
			}
			catch (e) {
				console.error(e);
			}
		};

		return guid;
	},

	// Trigger a clientside popup
	// This has been augmented to support PhoneGap
	popup: function(url, redirectUri, options) {

		var documentElement = document.documentElement;

		// Multi Screen Popup Positioning (http://stackoverflow.com/a/16861050)
		// Credit: http://www.xtf.dk/2011/08/center-new-popup-window-even-on.html
		// Fixes dual-screen position                         Most browsers      Firefox

		if (options.height) {
			var dualScreenTop = window.screenTop !== undefined ? window.screenTop : screen.top;
			var height = screen.height || window.innerHeight || documentElement.clientHeight;
			options.top = parseInt((height - options.height) / 2, 10) + dualScreenTop;
		}

		if (options.width) {
			var dualScreenLeft = window.screenLeft !== undefined ? window.screenLeft : screen.left;
			var width = screen.width || window.innerWidth || documentElement.clientWidth;
			options.left = parseInt((width - options.width) / 2, 10) + dualScreenLeft;
		}

		// Convert options into an array
		var optionsArray = [];
		Object.keys(options).forEach(function(name) {
			var value = options[name];
			optionsArray.push(name + (value !== null ? '=' + value : ''));
		});

		// Call the open() function with the initial path
		//
		// OAuth redirect, fixes URI fragments from being lost in Safari
		// (URI Fragments within 302 Location URI are lost over HTTPS)
		// Loading the redirect.html before triggering the OAuth Flow seems to fix it.
		//
		// Firefox  decodes URL fragments when calling location.hash.
		//  - This is bad if the value contains break points which are escaped
		//  - Hence the url must be encoded twice as it contains breakpoints.
		if (navigator.userAgent.indexOf('Safari') !== -1 && navigator.userAgent.indexOf('Chrome') === -1) {
			url = redirectUri + '#oauth_redirect=' + encodeURIComponent(encodeURIComponent(url));
		}

		var popup = window.open(
			url,
			'_blank',
			optionsArray.join(',')
		);

		if (popup && popup.focus) {
			popup.focus();
		}

		return popup;
	},

	// OAuth and API response handler
	responseHandler: function(window, parent) {

		var _this = this;
		var p;
		var location = window.location;

		// Is this an auth relay message which needs to call the proxy?
		p = _this.param(location.search);

		// OAuth2 or OAuth1 server response?
		if (p && p.state && (p.code || p.oauth_token)) {

			var state = JSON.parse(p.state);

			// Add this path as the redirect_uri
			p.redirect_uri = state.redirect_uri || location.href.replace(/[\?\#].*$/, '');

			// Redirect to the host
			var path = state.oauth_proxy + '?' + _this.param(p);

			location.assign(path);

			return;
		}

		// Save session, from redirected authentication
		// #access_token has come in?
		//
		// FACEBOOK is returning auth errors within as a query_string... thats a stickler for consistency.
		// SoundCloud is the state in the querystring and the token in the hashtag, so we'll mix the two together

		p = _this.merge(_this.param(location.search || ''), _this.param(location.hash || ''));

		// If p.state
		if (p && 'state' in p) {

			// Remove any addition information
			// E.g. p.state = 'facebook.page';
			try {
				var a = JSON.parse(p.state);
				_this.extend(p, a);
			}
			catch (e) {
				console.error('Could not decode state parameter');
			}

			// Access_token?
			if (('access_token' in p && p.access_token) && p.network) {

				if (!p.expires_in || parseInt(p.expires_in, 10) === 0) {
					// If p.expires_in is unset, set to 0
					p.expires_in = 0;
				}

				p.expires_in = parseInt(p.expires_in, 10);
				p.expires = ((new Date()).getTime() / 1e3) + (p.expires_in || (60 * 60 * 24 * 365));

				// Lets use the "state" to assign it to one of our networks
				authCallback(p, window, parent);
			}

			// Error=?
			// &error_description=?
			// &state=?
			else if (('error' in p && p.error) && p.network) {

				p.error = {
					code: p.error,
					message: p.error_message || p.error_description
				};

				// Let the state handler handle it
				authCallback(p, window, parent);
			}

			// API call, or a cancelled login
			// Result is serialized JSON string
			else if (p.callback && p.callback in parent) {

				// Trigger a function in the parent
				var res = 'result' in p && p.result ? JSON.parse(p.result) : false;

				// Trigger the callback on the parent
				callback(parent, p.callback)(res);
				closeWindow();
			}

			// If this page is still open
			if (p.page_uri) {
				location.assign(p.page_uri);
			}
		}

		// OAuth redirect, fixes URI fragments from being lost in Safari
		// (URI Fragments within 302 Location URI are lost over HTTPS)
		// Loading the redirect.html before triggering the OAuth Flow seems to fix it.
		else if ('oauth_redirect' in p) {

			location.assign(decodeURIComponent(p.oauth_redirect));
			return;
		}

		// Trigger a callback to authenticate
		function authCallback(obj, window, parent) {

			var cb = obj.callback;
			var network = obj.network;

			// Trigger the callback on the parent
			_this.store(network, obj);

			// If this is a page request it has no parent or opener window to handle callbacks
			if (('display' in obj) && obj.display === 'page') {
				return;
			}

			// Remove from session object
			if (parent && cb && cb in parent) {

				try {
					delete obj.callback;
				}
				catch (e) {}

				// Update store
				_this.store(network, obj);

				// Call the globalEvent function on the parent
				// It's safer to pass back a string to the parent,
				// Rather than an object/array (better for IE8)
				var str = JSON.stringify(obj);

				try {
					callback(parent, cb)(str);
				}
				catch (e) {
					// Error thrown whilst executing parent callback
				}
			}

			closeWindow();
		}

		function callback(parent, callbackID) {
			if (callbackID.indexOf('_hellojs_') !== 0) {
				return function() {
					throw 'Could not execute callback ' + callbackID;
				};
			}

			return parent[callbackID];
		}

		function closeWindow() {

			if (window.frameElement) {
				// Inside an iframe, remove from parent
				parent.document.body.removeChild(window.frameElement);
			}
			else {
				// Close this current window
				try {
					window.close();
				}
				catch (e) {}

				// IOS bug wont let us close a popup if still loading
				if (window.addEventListener) {
					window.addEventListener('load', function() {
						window.close();
					});
				}
			}

		}
	}
});

// Events
// Extend the hello object with its own event instance
hello.utils.Event.call(hello);

///////////////////////////////////
// Monitoring session state
// Check for session changes
///////////////////////////////////

(function(hello) {

	// Monitor for a change in state and fire
	var oldSessions = {};

	// Hash of expired tokens
	var expired = {};

	// Listen to other triggers to Auth events, use these to update this
	hello.on('auth.login, auth.logout', function(auth) {
		if (auth && typeof (auth) === 'object' && auth.network) {
			oldSessions[auth.network] = hello.utils.store(auth.network) || {};
		}
	});

	(function self() {

		var CURRENT_TIME = ((new Date()).getTime() / 1e3);
		var emit = function(eventName) {
			hello.emit('auth.' + eventName, {
				network: name,
				authResponse: session
			});
		};

		// Loop through the services
		for (var name in hello.services) {if (hello.services.hasOwnProperty(name)) {

			if (!hello.services[name].id) {
				// We haven't attached an ID so dont listen.
				continue;
			}

			// Get session
			var session = hello.utils.store(name) || {};
			var provider = hello.services[name];
			var oldSess = oldSessions[name] || {};

			// Listen for globalEvents that did not get triggered from the child
			if (session && 'callback' in session) {

				// To do remove from session object...
				var cb = session.callback;
				try {
					delete session.callback;
				}
				catch (e) {}

				// Update store
				// Removing the callback
				hello.utils.store(name, session);

				// Emit global events
				try {
					window[cb](session);
				}
				catch (e) {}
			}

			// Refresh token
			if (session && ('expires' in session) && session.expires < CURRENT_TIME) {

				// If auto refresh is possible
				// Either the browser supports
				var refresh = provider.refresh || session.refresh_token;

				// Has the refresh been run recently?
				if (refresh && (!(name in expired) || expired[name] < CURRENT_TIME)) {
					// Try to resignin
					hello.emit('notice', name + ' has expired trying to resignin');
					hello.login(name, {display: 'none', force: false});

					// Update expired, every 10 minutes
					expired[name] = CURRENT_TIME + 600;
				}

				// Does this provider not support refresh
				else if (!refresh && !(name in expired)) {
					// Label the event
					emit('expired');
					expired[name] = true;
				}

				// If session has expired then we dont want to store its value until it can be established that its been updated
				continue;
			}

			// Has session changed?
			else if (oldSess.access_token === session.access_token &&
			oldSess.expires === session.expires) {
				continue;
			}

			// Access_token has been removed
			else if (!session.access_token && oldSess.access_token) {
				emit('logout');
			}

			// Access_token has been created
			else if (session.access_token && !oldSess.access_token) {
				emit('login');
			}

			// Access_token has been updated
			else if (session.expires !== oldSess.expires) {
				emit('update');
			}

			// Updated stored session
			oldSessions[name] = session;

			// Remove the expired flags
			if (name in expired) {
				delete expired[name];
			}
		}}

		// Check error events
		setTimeout(self, 1000);
	})();

})(hello);

// EOF CORE lib
//////////////////////////////////

/////////////////////////////////////////
// API
// @param path    string
// @param query   object (optional)
// @param method  string (optional)
// @param data    object (optional)
// @param timeout integer (optional)
// @param callback  function (optional)

hello.api = function() {

	// Shorthand
	var _this = this;
	var utils = _this.utils;
	var error = utils.error;

	// Construct a new Promise object
	var promise = utils.Promise();

	// Arguments
	var p = utils.args({path: 's!', query: 'o', method: 's', data: 'o', timeout: 'i', callback: 'f'}, arguments);

	// Method
	p.method = (p.method || 'get').toLowerCase();

	// Headers
	p.headers = p.headers || {};

	// Query
	p.query = p.query || {};

	// If get, put all parameters into query
	if (p.method === 'get' || p.method === 'delete') {
		utils.extend(p.query, p.data);
		p.data = {};
	}

	var data = p.data = p.data || {};

	// Completed event callback
	promise.then(p.callback, p.callback);

	// Remove the network from path, e.g. facebook:/me/friends
	// Results in { network : facebook, path : me/friends }
	if (!p.path) {
		return promise.reject(error('invalid_path', 'Missing the path parameter from the request'));
	}

	p.path = p.path.replace(/^\/+/, '');
	var a = (p.path.split(/[\/\:]/, 2) || [])[0].toLowerCase();

	if (a in _this.services) {
		p.network = a;
		var reg = new RegExp('^' + a + ':?\/?');
		p.path = p.path.replace(reg, '');
	}

	// Network & Provider
	// Define the network that this request is made for
	p.network = _this.settings.default_service = p.network || _this.settings.default_service;
	var o = _this.services[p.network];

	// INVALID
	// Is there no service by the given network name?
	if (!o) {
		return promise.reject(error('invalid_network', 'Could not match the service requested: ' + p.network));
	}

	// PATH
	// As long as the path isn't flagged as unavaiable, e.g. path == false

	if (!(!(p.method in o) || !(p.path in o[p.method]) || o[p.method][p.path] !== false)) {
		return promise.reject(error('invalid_path', 'The provided path is not available on the selected network'));
	}

	// PROXY
	// OAuth1 calls always need a proxy

	if (!p.oauth_proxy) {
		p.oauth_proxy = _this.settings.oauth_proxy;
	}

	if (!('proxy' in p)) {
		p.proxy = p.oauth_proxy && o.oauth && parseInt(o.oauth.version, 10) === 1;
	}

	// TIMEOUT
	// Adopt timeout from global settings by default

	if (!('timeout' in p)) {
		p.timeout = _this.settings.timeout;
	}

	// Format response
	// Whether to run the raw response through post processing.
	if (!('formatResponse' in p)) {
		p.formatResponse = true;
	}

	// Get the current session
	// Append the access_token to the query
	p.authResponse = _this.getAuthResponse(p.network);
	if (p.authResponse && p.authResponse.access_token) {
		p.query.access_token = p.authResponse.access_token;
	}

	var url = p.path;
	var m;

	// Store the query as options
	// This is used to populate the request object before the data is augmented by the prewrap handlers.
	p.options = utils.clone(p.query);

	// Clone the data object
	// Prevent this script overwriting the data of the incoming object.
	// Ensure that everytime we run an iteration the callbacks haven't removed some data
	p.data = utils.clone(data);

	// URL Mapping
	// Is there a map for the given URL?
	var actions = o[{'delete': 'del'}[p.method] || p.method] || {};

	// Extrapolate the QueryString
	// Provide a clean path
	// Move the querystring into the data
	if (p.method === 'get') {

		var query = url.split(/[\?#]/)[1];
		if (query) {
			utils.extend(p.query, utils.param(query));

			// Remove the query part from the URL
			url = url.replace(/\?.*?(#|$)/, '$1');
		}
	}

	// Is the hash fragment defined
	if ((m = url.match(/#(.+)/, ''))) {
		url = url.split('#')[0];
		p.path = m[1];
	}
	else if (url in actions) {
		p.path = url;
		url = actions[url];
	}
	else if ('default' in actions) {
		url = actions['default'];
	}

	// Redirect Handler
	// This defines for the Form+Iframe+Hash hack where to return the results too.
	p.redirect_uri = _this.settings.redirect_uri;

	// Define FormatHandler
	// The request can be procesed in a multitude of ways
	// Here's the options - depending on the browser and endpoint
	p.xhr = o.xhr;
	p.jsonp = o.jsonp;
	p.form = o.form;

	// Make request
	if (typeof (url) === 'function') {
		// Does self have its own callback?
		url(p, getPath);
	}
	else {
		// Else the URL is a string
		getPath(url);
	}

	return promise.proxy;

	// If url needs a base
	// Wrap everything in
	function getPath(url) {

		// Format the string if it needs it
		url = url.replace(/\@\{([a-z\_\-]+)(\|.*?)?\}/gi, function(m, key, defaults) {
			var val = defaults ? defaults.replace(/^\|/, '') : '';
			if (key in p.query) {
				val = p.query[key];
				delete p.query[key];
			}
			else if (p.data && key in p.data) {
				val = p.data[key];
				delete p.data[key];
			}
			else if (!defaults) {
				promise.reject(error('missing_attribute', 'The attribute ' + key + ' is missing from the request'));
			}

			return val;
		});

		// Add base
		if (!url.match(/^https?:\/\//)) {
			url = o.base + url;
		}

		// Define the request URL
		p.url = url;

		// Make the HTTP request with the curated request object
		// CALLBACK HANDLER
		// @ response object
		// @ statusCode integer if available
		utils.request(p, function(r, headers) {

			// Is this a raw response?
			if (!p.formatResponse) {
				// Bad request? error statusCode or otherwise contains an error response vis JSONP?
				if (typeof headers === 'object' ? (headers.statusCode >= 400) : (typeof r === 'object' && 'error' in r)) {
					promise.reject(r);
				}
				else {
					promise.fulfill(r);
				}

				return;
			}

			// Should this be an object
			if (r === true) {
				r = {success:true};
			}
			else if (!r) {
				r = {};
			}

			// The delete callback needs a better response
			if (p.method === 'delete') {
				r = (!r || utils.isEmpty(r)) ? {success:true} : r;
			}

			// FORMAT RESPONSE?
			// Does self request have a corresponding formatter
			if (o.wrap && ((p.path in o.wrap) || ('default' in o.wrap))) {
				var wrap = (p.path in o.wrap ? p.path : 'default');
				var time = (new Date()).getTime();

				// FORMAT RESPONSE
				var b = o.wrap[wrap](r, headers, p);

				// Has the response been utterly overwritten?
				// Typically self augments the existing object.. but for those rare occassions
				if (b) {
					r = b;
				}
			}

			// Is there a next_page defined in the response?
			if (r && 'paging' in r && r.paging.next) {

				// Add the relative path if it is missing from the paging/next path
				if (r.paging.next[0] === '?') {
					r.paging.next = p.path + r.paging.next;
				}

				// The relative path has been defined, lets markup the handler in the HashFragment
				else {
					r.paging.next += '#' + p.path;
				}
			}

			// Dispatch to listeners
			// Emit events which pertain to the formatted response
			if (!r || 'error' in r) {
				promise.reject(r);
			}
			else {
				promise.fulfill(r);
			}
		});
	}
};

// API utilities
hello.utils.extend(hello.utils, {

	// Make an HTTP request
	request: function(p, callback) {

		var _this = this;
		var error = _this.error;

		// This has to go through a POST request
		if (!_this.isEmpty(p.data) && !('FileList' in window) && _this.hasBinary(p.data)) {

			// Disable XHR and JSONP
			p.xhr = false;
			p.jsonp = false;
		}

		// Check if the browser and service support CORS
		var cors = this.request_cors(function() {
			// If it does then run this...
			return ((p.xhr === undefined) || (p.xhr && (typeof (p.xhr) !== 'function' || p.xhr(p, p.query))));
		});

		if (cors) {

			formatUrl(p, function(url) {

				var x = _this.xhr(p.method, url, p.headers, p.data, callback);
				x.onprogress = p.onprogress || null;

				// Windows Phone does not support xhr.upload, see #74
				// Feature detect
				if (x.upload && p.onuploadprogress) {
					x.upload.onprogress = p.onuploadprogress;
				}

			});

			return;
		}

		// Clone the query object
		// Each request modifies the query object and needs to be tared after each one.
		var _query = p.query;

		p.query = _this.clone(p.query);

		// Assign a new callbackID
		p.callbackID = _this.globalEvent();

		// JSONP
		if (p.jsonp !== false) {

			// Clone the query object
			p.query.callback = p.callbackID;

			// If the JSONP is a function then run it
			if (typeof (p.jsonp) === 'function') {
				p.jsonp(p, p.query);
			}

			// Lets use JSONP if the method is 'get'
			if (p.method === 'get') {

				formatUrl(p, function(url) {
					_this.jsonp(url, callback, p.callbackID, p.timeout);
				});

				return;
			}
			else {
				// It's not compatible reset query
				p.query = _query;
			}

		}

		// Otherwise we're on to the old school, iframe hacks and JSONP
		if (p.form !== false) {

			// Add some additional query parameters to the URL
			// We're pretty stuffed if the endpoint doesn't like these
			p.query.redirect_uri = p.redirect_uri;
			p.query.state = JSON.stringify({callback:p.callbackID});

			var opts;

			if (typeof (p.form) === 'function') {

				// Format the request
				opts = p.form(p, p.query);
			}

			if (p.method === 'post' && opts !== false) {

				formatUrl(p, function(url) {
					_this.post(url, p.data, opts, callback, p.callbackID, p.timeout);
				});

				return;
			}
		}

		// None of the methods were successful throw an error
		callback(error('invalid_request', 'There was no mechanism for handling this request'));

		return;

		// Format URL
		// Constructs the request URL, optionally wraps the URL through a call to a proxy server
		// Returns the formatted URL
		function formatUrl(p, callback) {

			// Are we signing the request?
			var sign;

			// OAuth1
			// Remove the token from the query before signing
			if (p.authResponse && p.authResponse.oauth && parseInt(p.authResponse.oauth.version, 10) === 1) {

				// OAUTH SIGNING PROXY
				sign = p.query.access_token;

				// Remove the access_token
				delete p.query.access_token;

				// Enfore use of Proxy
				p.proxy = true;
			}

			// POST body to querystring
			if (p.data && (p.method === 'get' || p.method === 'delete')) {
				// Attach the p.data to the querystring.
				_this.extend(p.query, p.data);
				p.data = null;
			}

			// Construct the path
			var path = _this.qs(p.url, p.query);

			// Proxy the request through a server
			// Used for signing OAuth1
			// And circumventing services without Access-Control Headers
			if (p.proxy) {
				// Use the proxy as a path
				path = _this.qs(p.oauth_proxy, {
					path: path,
					access_token: sign || '',

					// This will prompt the request to be signed as though it is OAuth1
					then: p.proxy_response_type || (p.method.toLowerCase() === 'get' ? 'redirect' : 'proxy'),
					method: p.method.toLowerCase(),
					suppress_response_codes: true
				});
			}

			callback(path);
		}
	},

	// Test whether the browser supports the CORS response
	request_cors: function(callback) {
		return 'withCredentials' in new XMLHttpRequest() && callback();
	},

	// Return the type of DOM object
	domInstance: function(type, data) {
		var test = 'HTML' + (type || '').replace(
			/^[a-z]/,
			function(m) {
				return m.toUpperCase();
			}

		) + 'Element';

		if (!data) {
			return false;
		}

		if (window[test]) {
			return data instanceof window[test];
		}
		else if (window.Element) {
			return data instanceof window.Element && (!type || (data.tagName && data.tagName.toLowerCase() === type));
		}
		else {
			return (!(data instanceof Object || data instanceof Array || data instanceof String || data instanceof Number) && data.tagName && data.tagName.toLowerCase() === type);
		}
	},

	// Create a clone of an object
	clone: function(obj) {
		// Does not clone DOM elements, nor Binary data, e.g. Blobs, Filelists
		if (obj === null || typeof (obj) !== 'object' || obj instanceof Date || 'nodeName' in obj || this.isBinary(obj) || (typeof FormData === 'function' && obj instanceof FormData)) {
			return obj;
		}

		if (Array.isArray(obj)) {
			// Clone each item in the array
			return obj.map(this.clone.bind(this));
		}

		// But does clone everything else.
		var clone = {};
		for (var x in obj) {
			clone[x] = this.clone(obj[x]);
		}

		return clone;
	},

	// XHR: uses CORS to make requests
	xhr: function(method, url, headers, data, callback) {

		var r = new XMLHttpRequest();
		var error = this.error;

		// Binary?
		var binary = false;
		if (method === 'blob') {
			binary = method;
			method = 'GET';
		}

		method = method.toUpperCase();

		// Xhr.responseType 'json' is not supported in any of the vendors yet.
		r.onload = function(e) {
			var json = r.response;
			try {
				json = JSON.parse(r.responseText);
			}
			catch (_e) {
				if (r.status === 401) {
					json = error('access_denied', r.statusText);
				}
			}

			var headers = headersToJSON(r.getAllResponseHeaders());
			headers.statusCode = r.status;

			callback(json || (method === 'GET' ? error('empty_response', 'Could not get resource') : {}), headers);
		};

		r.onerror = function(e) {
			var json = r.responseText;
			try {
				json = JSON.parse(r.responseText);
			}
			catch (_e) {}

			callback(json || error('access_denied', 'Could not get resource'));
		};

		var x;

		// Should we add the query to the URL?
		if (method === 'GET' || method === 'DELETE') {
			data = null;
		}
		else if (data && typeof (data) !== 'string' && !(data instanceof FormData) && !(data instanceof File) && !(data instanceof Blob)) {
			// Loop through and add formData
			var f = new FormData();
			for (x in data) if (data.hasOwnProperty(x)) {
				if (data[x] instanceof HTMLInputElement) {
					if ('files' in data[x] && data[x].files.length > 0) {
						f.append(x, data[x].files[0]);
					}
				}
				else if (data[x] instanceof Blob) {
					f.append(x, data[x], data.name);
				}
				else {
					f.append(x, data[x]);
				}
			}

			data = f;
		}

		// Open the path, async
		r.open(method, url, true);

		if (binary) {
			if ('responseType' in r) {
				r.responseType = binary;
			}
			else {
				r.overrideMimeType('text/plain; charset=x-user-defined');
			}
		}

		// Set any bespoke headers
		if (headers) {
			for (x in headers) {
				r.setRequestHeader(x, headers[x]);
			}
		}

		r.send(data);

		return r;

		// Headers are returned as a string
		function headersToJSON(s) {
			var r = {};
			var reg = /([a-z\-]+):\s?(.*);?/gi;
			var m;
			while ((m = reg.exec(s))) {
				r[m[1]] = m[2];
			}

			return r;
		}
	},

	// JSONP
	// Injects a script tag into the DOM to be executed and appends a callback function to the window object
	// @param string/function pathFunc either a string of the URL or a callback function pathFunc(querystringhash, continueFunc);
	// @param function callback a function to call on completion;
	jsonp: function(url, callback, callbackID, timeout) {

		var _this = this;
		var error = _this.error;

		// Change the name of the callback
		var bool = 0;
		var head = document.getElementsByTagName('head')[0];
		var operaFix;
		var result = error('server_error', 'server_error');
		var cb = function() {
			if (!(bool++)) {
				window.setTimeout(function() {
					callback(result);
					head.removeChild(script);
				}, 0);
			}

		};

		// Add callback to the window object
		callbackID = _this.globalEvent(function(json) {
			result = json;
			return true;

			// Mark callback as done
		}, callbackID);

		// The URL is a function for some cases and as such
		// Determine its value with a callback containing the new parameters of this function.
		url = url.replace(new RegExp('=\\?(&|$)'), '=' + callbackID + '$1');

		// Build script tag
		var script = _this.append('script', {
			id: callbackID,
			name: callbackID,
			src: url,
			async: true,
			onload: cb,
			onerror: cb,
			onreadystatechange: function() {
				if (/loaded|complete/i.test(this.readyState)) {
					cb();
				}
			}
		});

		// Opera fix error
		// Problem: If an error occurs with script loading Opera fails to trigger the script.onerror handler we specified
		//
		// Fix:
		// By setting the request to synchronous we can trigger the error handler when all else fails.
		// This action will be ignored if we've already called the callback handler "cb" with a successful onload event
		if (window.navigator.userAgent.toLowerCase().indexOf('opera') > -1) {
			operaFix = _this.append('script', {
				text: 'document.getElementById(\'' + callbackID + '\').onerror();'
			});
			script.async = false;
		}

		// Add timeout
		if (timeout) {
			window.setTimeout(function() {
				result = error('timeout', 'timeout');
				cb();
			}, timeout);
		}

		// TODO: add fix for IE,
		// However: unable recreate the bug of firing off the onreadystatechange before the script content has been executed and the value of "result" has been defined.
		// Inject script tag into the head element
		head.appendChild(script);

		// Append Opera Fix to run after our script
		if (operaFix) {
			head.appendChild(operaFix);
		}
	},

	// Post
	// Send information to a remote location using the post mechanism
	// @param string uri path
	// @param object data, key value data to send
	// @param function callback, function to execute in response
	post: function(url, data, options, callback, callbackID, timeout) {

		var _this = this;
		var error = _this.error;
		var doc = document;

		// This hack needs a form
		var form = null;
		var reenableAfterSubmit = [];
		var newform;
		var i = 0;
		var x = null;
		var bool = 0;
		var cb = function(r) {
			if (!(bool++)) {
				callback(r);
			}
		};

		// What is the name of the callback to contain
		// We'll also use this to name the iframe
		_this.globalEvent(cb, callbackID);

		// Build the iframe window
		var win;
		try {
			// IE7 hack, only lets us define the name here, not later.
			win = doc.createElement('<iframe name="' + callbackID + '">');
		}
		catch (e) {
			win = doc.createElement('iframe');
		}

		win.name = callbackID;
		win.id = callbackID;
		win.style.display = 'none';

		// Override callback mechanism. Triggger a response onload/onerror
		if (options && options.callbackonload) {
			// Onload is being fired twice
			win.onload = function() {
				cb({
					response: 'posted',
					message: 'Content was posted'
				});
			};
		}

		if (timeout) {
			setTimeout(function() {
				cb(error('timeout', 'The post operation timed out'));
			}, timeout);
		}

		doc.body.appendChild(win);

		// If we are just posting a single item
		if (_this.domInstance('form', data)) {
			// Get the parent form
			form = data.form;

			// Loop through and disable all of its siblings
			for (i = 0; i < form.elements.length; i++) {
				if (form.elements[i] !== data) {
					form.elements[i].setAttribute('disabled', true);
				}
			}

			// Move the focus to the form
			data = form;
		}

		// Posting a form
		if (_this.domInstance('form', data)) {
			// This is a form element
			form = data;

			// Does this form need to be a multipart form?
			for (i = 0; i < form.elements.length; i++) {
				if (!form.elements[i].disabled && form.elements[i].type === 'file') {
					form.encoding = form.enctype = 'multipart/form-data';
					form.elements[i].setAttribute('name', 'file');
				}
			}
		}
		else {
			// Its not a form element,
			// Therefore it must be a JSON object of Key=>Value or Key=>Element
			// If anyone of those values are a input type=file we shall shall insert its siblings into the form for which it belongs.
			for (x in data) if (data.hasOwnProperty(x)) {
				// Is this an input Element?
				if (_this.domInstance('input', data[x]) && data[x].type === 'file') {
					form = data[x].form;
					form.encoding = form.enctype = 'multipart/form-data';
				}
			}

			// Do If there is no defined form element, lets create one.
			if (!form) {
				// Build form
				form = doc.createElement('form');
				doc.body.appendChild(form);
				newform = form;
			}

			var input;

			// Add elements to the form if they dont exist
			for (x in data) if (data.hasOwnProperty(x)) {

				// Is this an element?
				var el = (_this.domInstance('input', data[x]) || _this.domInstance('textArea', data[x]) || _this.domInstance('select', data[x]));

				// Is this not an input element, or one that exists outside the form.
				if (!el || data[x].form !== form) {

					// Does an element have the same name?
					var inputs = form.elements[x];
					if (input) {
						// Remove it.
						if (!(inputs instanceof NodeList)) {
							inputs = [inputs];
						}

						for (i = 0; i < inputs.length; i++) {
							inputs[i].parentNode.removeChild(inputs[i]);
						}

					}

					// Create an input element
					input = doc.createElement('input');
					input.setAttribute('type', 'hidden');
					input.setAttribute('name', x);

					// Does it have a value attribute?
					if (el) {
						input.value = data[x].value;
					}
					else if (_this.domInstance(null, data[x])) {
						input.value = data[x].innerHTML || data[x].innerText;
					}
					else {
						input.value = data[x];
					}

					form.appendChild(input);
				}

				// It is an element, which exists within the form, but the name is wrong
				else if (el && data[x].name !== x) {
					data[x].setAttribute('name', x);
					data[x].name = x;
				}
			}

			// Disable elements from within the form if they weren't specified
			for (i = 0; i < form.elements.length; i++) {

				input = form.elements[i];

				// Does the same name and value exist in the parent
				if (!(input.name in data) && input.getAttribute('disabled') !== true) {
					// Disable
					input.setAttribute('disabled', true);

					// Add re-enable to callback
					reenableAfterSubmit.push(input);
				}
			}
		}

		// Set the target of the form
		form.setAttribute('method', 'POST');
		form.setAttribute('target', callbackID);
		form.target = callbackID;

		// Update the form URL
		form.setAttribute('action', url);

		// Submit the form
		// Some reason this needs to be offset from the current window execution
		setTimeout(function() {
			form.submit();

			setTimeout(function() {
				try {
					// Remove the iframe from the page.
					//win.parentNode.removeChild(win);
					// Remove the form
					if (newform) {
						newform.parentNode.removeChild(newform);
					}
				}
				catch (e) {
					try {
						console.error('HelloJS: could not remove iframe');
					}
					catch (ee) {}
				}

				// Reenable the disabled form
				for (var i = 0; i < reenableAfterSubmit.length; i++) {
					if (reenableAfterSubmit[i]) {
						reenableAfterSubmit[i].setAttribute('disabled', false);
						reenableAfterSubmit[i].disabled = false;
					}
				}
			}, 0);
		}, 100);
	},

	// Some of the providers require that only multipart is used with non-binary forms.
	// This function checks whether the form contains binary data
	hasBinary: function(data) {
		for (var x in data) if (data.hasOwnProperty(x)) {
			if (this.isBinary(data[x])) {
				return true;
			}
		}

		return false;
	},

	// Determines if a variable Either Is or like a FormInput has the value of a Blob

	isBinary: function(data) {

		return data instanceof Object && (
		(this.domInstance('input', data) && data.type === 'file') ||
		('FileList' in window && data instanceof window.FileList) ||
		('File' in window && data instanceof window.File) ||
		('Blob' in window && data instanceof window.Blob));

	},

	// Convert Data-URI to Blob string
	toBlob: function(dataURI) {
		var reg = /^data\:([^;,]+(\;charset=[^;,]+)?)(\;base64)?,/i;
		var m = dataURI.match(reg);
		if (!m) {
			return dataURI;
		}

		var binary = atob(dataURI.replace(reg, ''));
		var array = [];
		for (var i = 0; i < binary.length; i++) {
			array.push(binary.charCodeAt(i));
		}

		return new Blob([new Uint8Array(array)], {type: m[1]});
	}

});

// EXTRA: Convert FormElement to JSON for POSTing
// Wrappers to add additional functionality to existing functions
(function(hello) {

	// Copy original function
	var api = hello.api;
	var utils = hello.utils;

	utils.extend(utils, {

		// DataToJSON
		// This takes a FormElement|NodeList|InputElement|MixedObjects and convers the data object to JSON.
		dataToJSON: function(p) {

			var _this = this;
			var w = window;
			var data = p.data;

			// Is data a form object
			if (_this.domInstance('form', data)) {
				data = _this.nodeListToJSON(data.elements);
			}
			else if ('NodeList' in w && data instanceof NodeList) {
				data = _this.nodeListToJSON(data);
			}
			else if (_this.domInstance('input', data)) {
				data = _this.nodeListToJSON([data]);
			}

			// Is data a blob, File, FileList?
			if (('File' in w && data instanceof w.File) ||
				('Blob' in w && data instanceof w.Blob) ||
				('FileList' in w && data instanceof w.FileList)) {
				data = {file: data};
			}

			// Loop through data if it's not form data it must now be a JSON object
			if (!('FormData' in w && data instanceof w.FormData)) {

				for (var x in data) if (data.hasOwnProperty(x)) {

					if ('FileList' in w && data[x] instanceof w.FileList) {
						if (data[x].length === 1) {
							data[x] = data[x][0];
						}
					}
					else if (_this.domInstance('input', data[x]) && data[x].type === 'file') {
						continue;
					}
					else if (_this.domInstance('input', data[x]) ||
						_this.domInstance('select', data[x]) ||
						_this.domInstance('textArea', data[x])) {
						data[x] = data[x].value;
					}
					else if (_this.domInstance(null, data[x])) {
						data[x] = data[x].innerHTML || data[x].innerText;
					}
				}
			}

			p.data = data;
			return data;
		},

		// NodeListToJSON
		// Given a list of elements extrapolate their values and return as a json object
		nodeListToJSON: function(nodelist) {

			var json = {};

			// Create a data string
			for (var i = 0; i < nodelist.length; i++) {

				var input = nodelist[i];

				// If the name of the input is empty or diabled, dont add it.
				if (input.disabled || !input.name) {
					continue;
				}

				// Is this a file, does the browser not support 'files' and 'FormData'?
				if (input.type === 'file') {
					json[input.name] = input;
				}
				else {
					json[input.name] = input.value || input.innerHTML;
				}
			}

			return json;
		}
	});

	// Replace it
	hello.api = function() {

		// Get arguments
		var p = utils.args({path: 's!', method: 's', data:'o', timeout: 'i', callback: 'f'}, arguments);

		// Change for into a data object
		if (p.data) {
			utils.dataToJSON(p);
		}

		return api.call(this, p);
	};

})(hello);

/////////////////////////////////////
//
// Save any access token that is in the current page URL
// Handle any response solicited through iframe hash tag following an API request
//
/////////////////////////////////////

hello.utils.responseHandler(window, window.opener || window.parent);

// Script to support ChromeApps
// This overides the hello.utils.popup method to support chrome.identity.launchWebAuthFlow
// See https://developer.chrome.com/apps/app_identity#non

// Is this a chrome app?

if (typeof chrome === 'object' && typeof chrome.identity === 'object' && chrome.identity.launchWebAuthFlow) {

	(function() {

		// Swap the popup method
		hello.utils.popup = function(url) {

			return _open(url, true);

		};

		// Swap the hidden iframe method
		hello.utils.iframe = function(url) {

			_open(url, false);

		};

		// Swap the request_cors method
		hello.utils.request_cors = function(callback) {

			callback();

			// Always run as CORS

			return true;
		};

		// Swap the storage method
		var _cache = {};
		chrome.storage.local.get('hello', function(r) {
			// Update the cache
			_cache = r.hello || {};
		});

		hello.utils.store = function(name, value) {

			// Get all
			if (arguments.length === 0) {
				return _cache;
			}

			// Get
			if (arguments.length === 1) {
				return _cache[name] || null;
			}

			// Set
			if (value) {
				_cache[name] = value;
				chrome.storage.local.set({hello: _cache});
				return value;
			}

			// Delete
			if (value === null) {
				delete _cache[name];
				chrome.storage.local.set({hello: _cache});
				return null;
			}
		};

		// Open function
		function _open(url, interactive) {

			// Launch
			var ref = {
				closed: false
			};

			// Launch the webAuthFlow
			chrome.identity.launchWebAuthFlow({
				url: url,
				interactive: interactive
			}, function(responseUrl) {

				// Did the user cancel this prematurely
				if (responseUrl === undefined) {
					ref.closed = true;
					return;
				}

				// Split appart the URL
				var a = hello.utils.url(responseUrl);

				// The location can be augmented in to a location object like so...
				// We dont have window operations on the popup so lets create some
				var _popup = {
					location: {

						// Change the location of the popup
						assign: function(url) {

							// If there is a secondary reassign
							// In the case of OAuth1
							// Trigger this in non-interactive mode.
							_open(url, false);
						},

						search: a.search,
						hash: a.hash,
						href: a.href
					},
					close: function() {}
				};

				// Then this URL contains information which HelloJS must process
				// URL string
				// Window - any action such as window relocation goes here
				// Opener - the parent window which opened this, aka this script

				hello.utils.responseHandler(_popup, window);
			});

			// Return the reference
			return ref;
		}

	})();
}

// Phonegap override for hello.phonegap.js
(function() {

	// Is this a phonegap implementation?
	if (!(/^file:\/{3}[^\/]/.test(window.location.href) && window.cordova)) {
		// Cordova is not included.
		return;
	}

	// Augment the hidden iframe method
	hello.utils.iframe = function(url, redirectUri) {
		hello.utils.popup(url, redirectUri, {hidden: 'yes'});
	};

	// Augment the popup
	var utilPopup = hello.utils.popup;

	// Replace popup
	hello.utils.popup = function(url, redirectUri, options) {

		// Run the standard
		var popup = utilPopup.call(this, url, redirectUri, options);

		// Create a function for reopening the popup, and assigning events to the new popup object
		// PhoneGap support
		// Add an event listener to listen to the change in the popup windows URL
		// This must appear before popup.focus();
		try {
			if (popup && popup.addEventListener) {

				// Get the origin of the redirect URI

				var a = hello.utils.url(redirectUri);
				var redirectUriOrigin = a.origin || (a.protocol + '//' + a.hostname);

				// Listen to changes in the InAppBrowser window

				popup.addEventListener('loadstart', function(e) {

					var url = e.url;

					// Is this the path, as given by the redirectUri?
					// Check the new URL agains the redirectUriOrigin.
					// According to #63 a user could click 'cancel' in some dialog boxes ....
					// The popup redirects to another page with the same origin, yet we still wish it to close.

					if (url.indexOf(redirectUriOrigin) !== 0) {
						return;
					}

					// Split appart the URL
					var a = hello.utils.url(url);

					// We dont have window operations on the popup so lets create some
					// The location can be augmented in to a location object like so...

					var _popup = {
						location: {
							// Change the location of the popup
							assign: function(location) {

								// Unfourtunatly an app is may not change the location of a InAppBrowser window.
								// So to shim this, just open a new one.
								popup.executeScript({code: 'window.location.href = "' + location + ';"'});
							},

							search: a.search,
							hash: a.hash,
							href: a.href
						},
						close: function() {
							if (popup.close) {
								popup.close();
								try {
									popup.closed = true;
								}
								catch (_e) {}
							}
						}
					};

					// Then this URL contains information which HelloJS must process
					// URL string
					// Window - any action such as window relocation goes here
					// Opener - the parent window which opened this, aka this script

					hello.utils.responseHandler(_popup, window);

				});
			}
		}
		catch (e) {}

		return popup;
	};

})();

// Register as anonymous AMD module
if (typeof define === 'function' && define.amd) {
	define(function() {
		return hello;
	});
}

// CommonJS module for browserify
if (typeof module === 'object' && module.exports) {
	module.exports = hello;
}

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
// ------------------------------------------------------------------------------
//  Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.  See License in the project root for license information.
// ------------------------------------------------------------------------------

'use strict';

var run = function ($scope, url, apiService) {
    $scope.$emit('urlChange', url);
}

var formatXml = function (xml) {
    var reg = /(>)\s*(<)(\/*)/g; // updated Mar 30, 2015
    var wsexp = / *(.*) +\n/g;
    var contexp = /(<.+>)(.+\n)/g;
    xml = xml.replace(reg, '$1\n$2$3').replace(wsexp, '$1\n').replace(contexp, '$1\n$2');
    var pad = 0;
    var formatted = '';
    var lines = xml.split('\n');
    var indent = 0;
    var lastType = 'other';
    // 4 types of tags - single, closing, opening, other (text, doctype, comment) - 4*4 = 16 transitions 
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
        var single = Boolean(ln.match(/<.+\/>/)); // is this line a single tag? ex. <br />
        var closing = Boolean(ln.match(/<\/.+>/)); // is this a closing tag? ex. </a>
        var opening = Boolean(ln.match(/<[^!].*>/)); // is this even a tag (that's not <!something>)
        var type = single ? 'single' : closing ? 'closing' : opening ? 'opening' : 'other';
        var fromTo = lastType + '->' + type;
        lastType = type;
        var padding = '';

        indent += transitions[fromTo];
        for (var j = 0; j < indent; j++) {
            padding += '\t';
        }
        if (fromTo == 'opening->closing')
            formatted = formatted.substr(0, formatted.length - 1) + ln + '\n'; // substr removes line break (\n) from prev loop
        else
            formatted += padding + ln + '\n';
    }

    return formatted;
};

var showDuration = function($scope, startTime) {
    var endTime = new Date();
    $scope.duration = (endTime.getTime() - startTime.getTime());
    $scope.requestInProgress = false;
}



var showHeaders = function($scope, headers, status) {
   var responseObj = {};
    if (headers != null) {
        responseObj = headers();
    }
    
    responseObj["Status Code"] = status;
    var responseHeaders = headersToString(responseObj);
    
    $scope.jsonViewer.getSession().setValue("");
    $scope.jsonViewer.getSession().insert(0, responseHeaders);
}

var headersToString = function(headers){
      var returnStr = "";
      for(var key in headers) {
          returnStr += key + ": " + headers[key] + "\n";
      } 
    return returnStr;
}

var showResults = function ($scope, results, headers, status) {
    $scope.jsonViewer.setValue("");
    showHeaders($scope, headers, status);
    $scope.jsonViewer.getSession().insert(0, results);
}

var handleImageResponse = function ($scope, apiService, startTime, results, headers, status, handleUnsuccessfulQueryResponse) {
    apiService.performQuery('GET_BINARY')($scope.text, "").success(function (results, status, headers) {
        var arr = new Uint8Array(results);
        //  Don't use fromCharCode.apply as it blows the stack with moderate size images
        var raw = "";
        for (var i = 0; i < arr.length; i++) {
            raw = raw + String.fromCharCode(arr[i]);
        }
        var b64 = btoa(raw);
        var dataURL = "data:image/jpeg;base64," + b64;

        document.getElementById("img").src = dataURL;
        $scope.showJsonViewer = false;
        $scope.showImage = true;
        showHeaders($scope, headers);
        showDuration($scope, startTime);
    }).error(handleUnsuccessfulQueryResponse);
}

var handleHtmlResponse = function ($scope, startTime, results, headers, status) {
    setJsonViewerContentType("html");
    showDuration($scope, startTime);
    showResults($scope, results, headers, status);
}

var handleJsonResponse = function ($scope, startTime, results, headers, status) {
    setJsonViewerContentType("json");
    results = JSON.stringify(results, null, 4);
    showDuration($scope, startTime);
    showResults($scope, results, headers, status);
}

var handleXmlResponse = function ($scope, startTime, results, headers, status) {
    setJsonViewerContentType("xml");
    results = formatXml(results);
    showDuration($scope, startTime);
    showResults($scope, results, headers, status);
}

var isImageResponse = function (headers) {
    var contentType = getContentType(headers);
    return contentType === "application/octet-stream" || contentType.substr(0, 6) === "image/";
}

var isHtmlResponse = function (headers) {
    var contentType = getContentType(headers);
    return contentType === "text/html" || contentType === "application/xhtml+xml";
}

var isXmlResponse = function (results) {
    // Don't use headers, cos xml could be of a million content types.
    return JSON.stringify(results, null, 4).indexOf("<?xml") != -1;
}

var isJsonResponse = function (headers) {
    var contentType = getContentType(headers);
    return contentType === "application/json";
}

var getContentType = function(headers) {
    var full = headers("content-type");
    var delimiterPos = full.indexOf(";");
    if (delimiterPos != -1) {
        return full.substr(0, delimiterPos);
    } else {
        return full;
    }
}



var getEntitySets = function(XML) {
    var entitySetArray = {};
    var entitySets = $(($.parseHTML(XML))[2]).find("EntityContainer")[0].children;
    for(var i=0; i<entitySets.length; i++){
           var EntitySet = {};
           var name = entitySets[i].attributes[0].nodeValue;
           name = name.substring(2, name.length-2);
           EntitySet.name = name;
           EntitySet.isEntitySet = true;
           EntitySet.URLS = [];
           var type = entitySets[i].attributes[1].nodeValue;
           var index = type.indexOf("graph.")
           type = type.substring(index+6, type.length-2);
           EntitySet.entityType = type;
           entitySetArray[EntitySet.name] = EntitySet;
    }
    return entitySetArray;
}



var findNameIndex = function(array) {
    for(var i=0; i<array.length; i++) {
        if(array[i].name === "name") {
            return i;
        }
    }
}

var findTypeIndex = function(array){
    for(var i=0; i<array.length; i++){
        if(array[i].name === "type"){
            return i;
        }
    }
}

var formatRequestHeaders = function(headers){
    var obj = {};
    var parts = headers.replace(/^\s+|,\s*$/g, '').split('\n');
    
    for(var i = 0, len = parts.length; i < len; i++) {
        var match = parts[i].match(/^\s*"?([^":]*)"?\s*:\s*"?([^"]*)\s*$/);
        if(match) {
            obj[match[1]] = match[2];
        }
    }
    
   return obj; 
}

var createEntityTypeObject = function(returnArray, DOMarray) {
    for(var i=0; i<DOMarray.length; i++){
           var EntityType = {};
           var name = DOMarray[i].attributes["name"].nodeValue;
           name = name.substring(2, name.length-2);
           EntityType.name = name;
           EntityType.isEntitySet = false;
           EntityType.URLS = [];
           var children = DOMarray[i].children;
           for(var j=0; j<children.length; j++){
                 if(children[j].attributes.length > 0){
                     var nameIndex = findNameIndex(children[j].attributes);
                     var typeIndex = findTypeIndex(children[j].attributes);
                     var childName = children[j].attributes[nameIndex].nodeValue;
                     childName = childName.substring(2, childName.length-2);
                     var collection = children[j].attributes[typeIndex].nodeValue;
                     collection = collection.substring(2, 12);
                     var type = children[j].attributes[typeIndex].nodeValue;
                     var index = type.lastIndexOf(".")
                     type = type.substring(index+1, type.length-2);
                     if(type.charAt(type.length-1) == ")"){
                         type = type.substring(0, type.length-1);
                     }
                     var urlObject = {};
                     urlObject.isACollection = (collection === "Collection") && (index >0);
                     urlObject.name = childName;
                     urlObject.type = type;
                     EntityType.URLS.push(urlObject);
                 }
           }
        
            returnArray[EntityType.name] = EntityType;
    }    
    return returnArray;
}

var showRequestHeaders = function($scope) {
    if (!$scope.jsonEditorHeaders) return;
    $scope.jsonEditorHeaders.getSession().setValue("");
    var requestHeaders = "Content-Type: application/json"
    $scope.jsonEditorHeaders.getSession().insert(0, requestHeaders);
}

var getEntityTypes = function(XML){
    var entityTypesArray = {};
    var entityTypes = $(($.parseHTML(XML))[2]).find("EntityType");
    entityTypesArray = createEntityTypeObject(entityTypesArray, entityTypes);
    
    var complexTypes = $(($.parseHTML(XML))[2]).find("ComplexType");
    entityTypesArray = createEntityTypeObject(entityTypesArray, complexTypes);
    
    return entityTypesArray;
}

var myTrim = function(word){
      var returnWord = word;
      if(returnWord != null){
          while(returnWord.charAt(returnWord.length-1) == "/" ){
              returnWord = returnWord.replace(/\/$/, "");
          }
          return returnWord; 
      }
} 

var getEntityName = function(URL){
     var returnWord = myTrim(URL);
     if(returnWord != null){
         returnWord = returnWord.substring(returnWord.lastIndexOf("/")+1, returnWord.length);
     }
     return returnWord;
}


var getPreviousCall = function(URL, entityName){
    var index = URL.indexOf(entityName);
    return URL.substr(0, index-1);
}


var setEntity = function(entityItem, service, lastCallSuccessful) {
    
   if (getEntityName(service.text) == service.selectedVersion) {
             var entityObj = {};
             entityObj.name = service.selectedVersion;
             service.entity = entityObj; 
             return;
    } else {
       var entityName = getEntityName(service.text);
    }
    
    var prevCallName = getEntityName(getPreviousCall(service.text, entityName));
    var twoPrevCallsName = getEntityName(getPreviousCall(getPreviousCall(service.text, entityName), prevCallName));
    if (entityName === "me" && lastCallSuccessful) {
        prevCallName = "users";
    } else if (twoPrevCallsName === "me" && lastCallSuccessful) {
        twoPrevCallsName = "user";
    }
    
    var entitySet = service.cache.get(service.selectedVersion + "EntitySetData")[prevCallName];
    var entityType = service.cache.get(service.selectedVersion + "EntityTypeData")[prevCallName]; 
    var twoPrevEntityType = service.cache.get(service.selectedVersion + "EntityTypeData")[twoPrevCallsName];
    var twoPrevEntitySet = service.cache.get(service.selectedVersion + "EntitySetData")[twoPrevCallsName];
    var collection = false;
    if (twoPrevEntitySet) {
        for(var i=0; i<twoPrevEntitySet.URLS.length; i++){
            if(twoPrevEntitySet.URLS[i].name == prevCallName){
                collection = twoPrevEntitySet.URLS[i].isACollection;
            }
        }
    } else if (twoPrevEntityType) {
        for(var i=0; i<twoPrevEntityType.URLS.length; i++){
            if(twoPrevEntityType.URLS[i].name == prevCallName){
                collection = twoPrevEntityType.URLS[i].isACollection;
                var collectionType = twoPrevEntityType.URLS[i].type;
                break;
            }
        }
    }
    
    service.entityNameIsAnId =
        (((entitySet && !entityType) || (entitySet && twoPrevCallsName === service.selectedVersion))
        && lastCallSuccessful && (prevCallName != "me"))
        || (collection && lastCallSuccessful);
    
    if (service.entityNameIsAnId) {
        //$log.log("entity name is an id");
        var typeName;
        if (collection) {
            //$log.log("is a collection");
            typeName = collectionType;
            //$log.log(typeName);
        } else if (entitySet) {
            typeName = entitySet.entityType;
        }

        service.entity = service.cache.get(service.selectedVersion + "EntityTypeData")[typeName];
    }
    else {
        if (!entityType && entitySet) {
            entityType = setToSetOrType(service, entitySet.entityType);
        }

        if (entityType) {
            
            // IE claims array.find code below has syntax error, probably due to lack of support.
            // var matchingElement = entityType.URLS.find(u => u.name === entityName && !u.isACollection);
            var matchingElement = null;
            for (var i = 0; i < entityType.URLS.length; i++) {
                if (entityType.URLS[i].name == entityName && !entityType.URLS[i].isACollection) {
                    matchingElement = entityType.URLS[i];
                    break;
                }
            }

            if (matchingElement) {
                service.entity = setToSetOrType(service, matchingElement.type);
            }
            else {
                service.entity = null;
            }
        } else {
            service.entity = setToSetOrType(service, entityName, prevCallName);
        }
    }
}

var setToSetOrType = function(service, entityName, prevCallName) {
      var isEntitySet = service.cache.get(service.selectedVersion + "EntitySetData")[entityName];
      var isEntityType = service.cache.get(service.selectedVersion + "EntityTypeData")[entityName];
      if(isEntitySet && !isEntityType){
          return isEntitySet;
      }else if(isEntityType && !isEntitySet){
          return isEntityType;
      }else if(isEntitySet && isEntityType){
           if(prevCallName === service.selectedVersion){
               return isEntitySet
           }else{
               return isEntityType;
           }
      }
    
}

var showRequestBodyEditor = function() {
    s.tabConfig.disableRequestBodyEditor = false;
    s.tabConfig.hideContent = false;
    showRequestHeaders(s);
    $(function() {
        initializeJsonEditor(s);
        setSelectedTab(1);
    })
}

var setSelectedTab = function(num) {
    if (num >= 2 || num < 0) {
        return;
    }
    s.tabConfig.selected = num;
    s.tabConfig.previousSelected = s.tabConfig.selected;
}

var handleQueryString = function(service, actionValue, versionValue, requestValue) {
    if(actionValue){
        service.selectedOption = actionValue.toUpperCase();
        if(service.selectedOption === 'POST' || service.selectedOption === 'PATCH') {
            if(hello('msft').getAuthResponse() != null)
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

var parseMetadata = function(service, $scope){
    var entitySetData, entityTypeData;
    if(!service.cache.get(service.selectedVersion + "Metadata")) {
         console.log("parsing metadata");
         service.getMetadata().then(function(results) {
                results = JSON.stringify(results).trim();
                service.cache.put(service.selectedVersion + "Metadata", results);
                entitySetData = getEntitySets(results);
                service.cache.put(service.selectedVersion + "EntitySetData", entitySetData);
                entityTypeData = getEntityTypes(results);
                service.cache.put(service.selectedVersion + "EntityTypeData", entityTypeData);
                console.log("metadata successfully parsed");
                if(service.entity == ""){
                    service.entity = entityTypeData["user"];
                }else{
                    service.entity = entityTypeData[getEntityName(service.text)];
                }
                
          $scope.$root.$broadcast("updateUrlOptions");
         }, function(err, status){
            console.error("metadata could not be parsed");
         });
     } else {
          $scope.$root.$broadcast("updateUrlOptions");
     }
}
// ------------------------------------------------------------------------------
//  Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.  See License in the project root for license information.
// ------------------------------------------------------------------------------

'use strict';

angular.module('ApiExplorer')
.config(function($locationProvider) {
    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
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

            showJsonEditor: false,

            showJsonViewer: true,

            cache: $cacheFactory('myCache'),
            
            entity: "",
            
            entityNameIsAnId: false,
            
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
// This is a generated file from bundleLocFiles.js 

var loc_strings = {};

loc_strings['de-DE'] = {"To try the explorer, please ":"Um den Tester auszuprobieren, ","sign in":"Anmelden"," with your work or school account from Microsoft.":" mit Ihrem Geschäfts- oder Schulkonto von Microsoft an.","Submit":"Senden","Using demo tenant":"Verwenden des Demomandanten","sign out":"Abmelden","History":"Verlauf","Method":"Methode","Query":"Abfrage","Status Code":"Statuscode","Duration":"Dauer","Go":"OK","YES":"JA","NO":"NEIN","request header":"Anforderungsheader","request body":"Anforderungstextkörper","response":"Antwort"}

loc_strings['en-us'] = {"To try the explorer, please ":"To try the explorer, please ","sign in":"sign in"," with your work or school account from Microsoft.":" with your work or school account from Microsoft.","Submit":"Submit","Using demo tenant":"Using demo tenant","sign out":"sign out","History":"History","Method":"Method","Query":"Query","Status Code":"Status Code","Duration":"Duration","Go":"Go","YES":"YES","NO":"NO","request header":"request header","request body":"request body","response":"response","login_to_send_requests":"Login to change the request type"}

loc_strings['pt-BR'] = {"To try the explorer, please ":"Para experimentar o Explorador, ","sign in":"entrar"," with your work or school account from Microsoft.":" com a sua conta corporativa ou de estudante da Microsoft.","Submit":"Enviar","Using demo tenant":"Usando o Locatário de Demonstração","sign out":"sair","History":"Histórico","Method":"Método","Query":"Consulta","Status Code":"Código de Status","Duration":"Duração","Go":"Ir","YES":"SIM","NO":"NÃO","request header":"cabeçalho da solicitação","request body":"corpo da solicitação","response":"resposta"}

loc_strings['es-ES'] = {"To try the explorer, please ":"Para utilizar el probador, ","sign in":"iniciar sesión"," with your work or school account from Microsoft.":" con su cuenta profesional o educativa de Microsoft.","Submit":"Enviar","Using demo tenant":"Uso de inquilinos de demostración","sign out":"cerrar sesión","History":"Historial","Method":"Método","Query":"Consulta","Status Code":"Código de estado","Duration":"Duración","Go":"Ir","YES":"SÍ","NO":"NO","request header":"encabezado de solicitud","request body":"cuerpo de solicitud","response":"respuesta"}

loc_strings['ja-JP'] = {"To try the explorer, please ":"エクスプローラーをお試しいただくには、Microsoft の職場または学校アカウントで ","sign in":"サインイン"," with your work or school account from Microsoft.":" します。","Submit":"送信","Using demo tenant":"デモ テナントを使用しています","sign out":"サインアウト","History":"履歴","Method":"メソッド","Query":"クエリ","Status Code":"状態コード","Duration":"期間","Go":"検索","YES":"はい","NO":"いいえ","request header":"要求ヘッダー","request body":"要求本文","response":"応答"}

loc_strings['ru-RU'] = {"To try the explorer, please ":"Чтобы опробовать песочницу, ","sign in":"войти"," with your work or school account from Microsoft.":" с помощью рабочей или учебной учетной записи от корпорации Майкрософт.","Submit":"Отправить","Using demo tenant":"С помощью демонстрационного клиента","sign out":"выйти","History":"Журнал","Method":"Метод","Query":"Запрос","Status Code":"Код состояния","Duration":"Длительность","Go":"Перейти","YES":"ДА","NO":"НЕТ","request header":"заголовок запроса","request body":"текст запроса","response":"ответ"}

loc_strings['zh-CN'] = {"To try the explorer, please ":"若要尝试浏览器，请 使用你的 Microsoft 工作或学校帐户","sign in":"登录"," with your work or school account from Microsoft.":"。","Submit":"提交","Using demo tenant":"使用演示租户","sign out":"注销","History":"历史记录","Method":"方法","Query":"查询","Status Code":"状态代码","Duration":"持续时间","Go":"转到","YES":"是","NO":"否","request header":"请求标题","request body":"请求正文","response":"响应"}

loc_strings['fr-FR'] = {"To try the explorer, please ":"Pour essayer l’afficheur, veuillez ","sign in":"se connecter"," with your work or school account from Microsoft.":" avec votre compte scolaire ou professionnel de Microsoft.","Submit":"Envoyer","Using demo tenant":"À l’aide du client de démonstration","sign out":"se déconnecter","History":"Historique","Method":"Méthode","Query":"Requête","Status Code":"Code d'état","Duration":"Durée","Go":"Rechercher","YES":"OUI","NO":"NON","request header":"en-tête de la demande","request body":"corps de la demande","response":"réponse"}
// ------------------------------------------------------------------------------
//  Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.  See License in the project root for license information.
// ------------------------------------------------------------------------------

var s;
angular.module('ApiExplorer')
    .controller('ApiExplorerCtrl', ['$scope', '$http', '$location', 'ApiExplorerSvc', '$timeout', '$templateCache', '$mdDialog', '$sce', function ($scope, $http, $location, apiService, $timeout, $templateCache, $mdDialog, $sce ) {

        s = $scope;
        $scope.userInfo = {};

        $scope.getAssetPath = function(relPath) {
            return s.pathToBuildDir + "/"+ relPath;
        }

        $scope.finishAdminConsertFlow = function() {
            // silently get a new access token with the admin scopes
            hello('msft_token_refresh').login({
                display: 'popup',
                response_type: "token",
                redirect_uri: $scope.redirectUrl,
                scope: $scope.scopes + " " + $scope.adminScopes,
                response_mode: 'fragment',
                prompt: 'none',
                domain_hint: 'organizations',
                login_hint: $scope.userInfo.preferred_username
            }, function(res) {
                if (res.authResponse) {
                    var accessToken = res.authResponse.access_token;
                    $http.defaults.headers.common['Authorization'] = 'Bearer ' + accessToken;
                }
            }, function(res) {
                console.error(res);
            });
        }

        hello.on('auth.login', function (auth) {
            var accessToken;

            if (auth.network == "msft_token_refresh") {
                accessToken = hello('msft_token_refresh').getAuthResponse().access_token;
            } else if (auth.network == "msft") {
                var authResponse = hello('msft').getAuthResponse()

                accessToken = authResponse.access_token;

                var jwt;
                if ('id_token' in authResponse) {
                    jwt = authResponse['id_token'];
                }

                var decodedJwt = jwt_decode(jwt);
                
                $scope.userInfo = {
                    preferred_username: decodedJwt.preferred_username
                }

                $scope.$apply();

            }

            if (accessToken) {
                $http.defaults.headers.common['Authorization'] = 'Bearer ' + accessToken;
            }
        });
        
        $scope.showJsonEditor = apiService.showJsonEditor;
        $scope.showJsonViewer = apiService.showJsonViewer;
        $scope.tabConfig = {
            disableRequestBodyEditor: true,
            hideContent: true,
            selected: 0
        }
        $scope.showImage = false;

        // $scope.$watch("tabConfig.selected", function() {
        // })

        // $scope.onTabSelected = function(index) {
        //     tabConfig.previousSelected = $scope.tabConfig.selected;
        // }

        $scope.tabConfig.previousSelected = $scope.tabConfig.selected;
        $scope.processTabClick = function() {
            var switchingTabs = $scope.tabConfig.previousSelected != $scope.tabConfig.selected;
            if (!switchingTabs)
                $scope.tabConfig.hideContent = !$scope.tabConfig.hideContent;
            $scope.tabConfig.previousSelected = $scope.tabConfig.selected;
        }

        // For deep linking into the Graph Explorer
        var requestVal = $location.search().request;
        var actionVal = $location.search().method;
        var bodyVal = $location.search().body;
        var versionVal = $location.search().version;
        var headersVal = $location.search().headers;
        

        handleQueryString(apiService, actionVal, versionVal, requestVal);
        
        $timeout(function() {
            initializeJsonEditorHeaders($scope, headersVal);
            initializeJsonViewer($scope, apiService);
        });

        parseMetadata(apiService, $scope);

        $scope.isAuthenticated = function() {
            var session = hello('msft').getAuthResponse();

            if (session === null) return false;
            var currentTime = (new Date()).getTime() / 1000;
            return session && session.access_token && session.expires > currentTime;
        };

        $scope.getEditor = function() {
            return apiService.showJsonEditor;
        }

        $scope.$watch("getEditor()", function(event, args) {
            $scope.showJsonEditor = $scope.getEditor();
            initializeJsonEditor($scope, bodyVal);
            // if ($scope.showJsonEditor) {
            // }
        });

        // https://docs.microsoft.com/en-us/azure/active-directory/active-directory-v2-protocols-implicit
        $scope.login = function () {
            hello('msft').login({
                display: 'page',
                response_type: "id_token token",
                nonce: 'graph_explorer',
                prompt: 'login'
            }, function(res) {

            }, function() {
                console.error('error signing in');
            });
        };

        $scope.logout = function () {
            hello('msft').logout(null, {force:true});
            delete $scope.userInfo;
        };

        $scope.isActive = function (viewLocation) {
            return viewLocation === $location.path();
        };

        var rawSearchText = "";
        $scope.setRawSearchText = function(text) {
            rawSearchText = text;
        }

        $scope.getRawSearchText = function() {
            return rawSearchText;
        }

        $scope.getCurrentEntityName = function() {
            if (!rawSearchText) return null;
            return rawSearchText.split("/").filter((function(a) { return a.length > 0})).pop();
        }

        $scope.canInsertTemplate = function() {
            return apiService.selectedOption == "POST" && checkCanInsertTemplate(rawSearchText);
        }

        $scope.insertPostTemplate = function() {
            var entity = $scope.getCurrentEntityName();
            var strToInsert = JSON.stringify(postTemplates[entity], null, 2).trim();

            var domain = $scope.userInfo.preferred_username.split("@")[1];

            strToInsert = strToInsert.replace(/AUTHENTICATED_DOMAIN/g, domain);

            initializeJsonEditor($scope, strToInsert);
        }

        function checkCanInsertTemplate(URL) {
            // get 'messages' from 'https://graph.microsoft.com/v1.0/me/messages'
            var entity = $scope.getCurrentEntityName()
            var canInsertTemplate = entity in postTemplates;
            return canInsertTemplate;
        }


        $scope.showShareDialog = function(ev) {
            $mdDialog.show({
                controller: ShareDialogController,
                templateUrl: pathToBuildDir + '/assets/views/shareDialog.tmpl.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose:true,
                scope: $scope.$new(),
                locals: {
                    apiService: apiService,
                    $sce: $sce,
                    headers: formatRequestHeaders($scope.jsonEditorHeaders.getSession().getValue()),
                    body: $scope.jsonEditor.getSession().getValue()
                },
            })
            .then(function(answer) {
                $scope.status = 'You said the information was "' + answer + '".';
            }, function() {
                $scope.status = 'You cancelled the dialog.';
            });
        };

}]);

angular.module('ApiExplorer')
    .controller('DropdownCtrl', ['$scope', 'ApiExplorerSvc', function ($scope, apiService) {

        $scope.selectedOption = apiService.selectedOption;

        $scope.onItemClick = function(choice) {
            $scope.selectedOption = choice;
        }

        $scope.items = [
            'GET',
            'POST',
            'PATCH',
            'DELETE'
        ];

        $scope.getServiceOption = function() {
            return apiService.selectedOption;
        }

        $scope.getOption = function() {
            return $scope.selectedOption;
        }

        $scope.$watch("getOption()", function(newVal, oldVal) {
            if (oldVal !== newVal) {
                apiService.selectedOption = $scope.selectedOption;
                apiService.text = apiService.text.replace(/https:\/\/graph.microsoft.com($|\/([\w]|\.)*($|\/))/, ("https://graph.microsoft.com/" + apiService.selectedVersion + "/"));
                if ($scope.selectedOption == 'POST' || $scope.selectedOption == 'PATCH') {

                    // investigate why $scope doesn't work here
                    showRequestBodyEditor();
                } else if ($scope.selectedOption == 'GET' || $scope.selectedOption == 'DELETE') {
                    s.tabConfig.disableRequestBodyEditor = true;
                    setSelectedTab(0);
                }
            }
        });

    }]);

angular.module('ApiExplorer')
    .controller('VersionCtrl', ['$scope', 'ApiExplorerSvc', function ($scope, apiService) {
        $scope.selectedVersion = apiService.selectedVersion;

        $scope.items = [
            'beta',
            'v1.0'
        ];

        $scope.getVersion = function() {
            return $scope.selectedVersion;
        }

        $scope.getServiceVersion = function() {
            return apiService.selectedVersion;
        }

        $scope.onItemClick = function(choice) {
            $scope.selectedVersion = choice;
            apiService.selectedVersion = choice;
        }
        $scope.$watch("getVersion()", function(newVal, oldVal) {
            if (oldVal !== newVal) {
                apiService.selectedVersion = $scope.selectedVersion;
                if ($scope.$parent.searchText) {
                    apiService.text = $scope.$parent.searchText.replace(/https:\/\/graph.microsoft.com($|\/([\w]|\.)*($|\/))/, ("https://graph.microsoft.com/" + apiService.selectedVersion + "/"));
                } else {
                    apiService.text = apiService.text.replace(/https:\/\/graph.microsoft.com($|\/([\w]|\.)*($|\/))/, ("https://graph.microsoft.com/" + apiService.selectedVersion + "/"));    
                }
                parseMetadata(apiService, $scope);
            }
        });
}]);

angular.module('ApiExplorer').controller('datalistCtrl', ['$scope', 'ApiExplorerSvc', function ($scope, apiService) {
    $scope.urlArray = [];

    $scope.getEntity = function() {
        return apiService.entity;
    }

    $scope.getText = function() {
        return apiService.text;
    }

    $scope.getRequestHistory = function() {
        return requestHistory;
    }

    $scope.$watch("getText()", function(event, args) {
            $scope.text = apiService.text;
            this.searchText = $scope.text;
    });

    $scope.$parent.setRawSearchText(apiService.text);

    $scope.searchTextChange = function(searchText) {
        this.searchText = searchText;        
        $scope.$parent.setRawSearchText(searchText);
        if (searchText.charAt(searchText.length-1) === "/" && apiService.entity && getEntityName(searchText) !== apiService.entity.name) {
            apiService.text = searchText;
            setEntity(getEntityName(searchText), apiService, true);
        }
    }

    function updateUrlOptions() {
        var urlOptions = {};
        console.log("updating url options for", apiService.entity);
        if (apiService.entity && apiService.entity.name === apiService.selectedVersion) {
                urlOptions = apiService.cache.get(apiService.selectedVersion + "EntitySetData");
                apiService.entity.name = apiService.selectedVersion;
        } else if (apiService.entity != null) {
            urlOptions = apiService.entity.URLS;
        } else {
            return;
        }

        //for each new URL to add
        for(var x in urlOptions) {
            var separator = '';
            if (apiService.text.charAt((apiService.text).length-1) != '/') {
                separator = '/'
            }

            urlOptions[x].autocompleteVal = apiService.text + separator + urlOptions[x].name;

            if ($scope.urlArray.indexOf(urlOptions[x]) == -1)
                $scope.urlArray.push(urlOptions[x]);
        }
    };

    // mostly used for the initial page load, when the entity is set (me/user),  load the possible URL options
    $scope.$watch("getEntity()", function(newValue, oldValue) {
        if (oldValue !== newValue)
            updateUrlOptions()
    }, true);

    $scope.getMatches = function(query) {
        return $scope.urlArray.filter(function(option) {
            var queryInOption = (option.autocompleteVal.indexOf(query)>-1);
            var queryIsEmpty = (getEntityName(query).length == 0);

            return queryIsEmpty || queryInOption;
        });
    }

    $scope.processAutocompleteClick = function(item) {
        $scope.$parent.selectedItemChange(item)
        
        if (item && item.autocompleteVal)
            $scope.$parent.setRawSearchText(item.autocompleteVal);
    }

    if (window.runTests)
         runAutoCompleteTests(apiService);

}]);


angular.module('ApiExplorer').controller('FormCtrl', ['$scope', 'ApiExplorerSvc', function ($scope, apiService) {
    $scope.text = apiService.text;
    $scope.requestInProgress = false;
    $scope.entityItem = null;
    $scope.insufficientPrivileges = false;

    // $scope.getAssetPath = function(relPath) {
    //     return $scope.$parent.pathToBuildDir + relPath
    // }

    if (hello('msft').getAuthResponse() != null && 
        (apiService.selectedOption === 'POST' || apiService.selectedOption === 'PATCH')) {
            showRequestBodyEditor();
    } else {
        setSelectedTab(0);
    }

    $scope.submissionInProgress = false;
            
    $scope.getText = function() {
        return apiService.text;
    }
    
    $scope.$watch("getText()", function(event, args) {
        $scope.text = apiService.text;
    });
 
    // custom link re-routing logic to resolve links
    $scope.$parent.$on("urlChange", function (event, args) {
        msGraphLinkResolution($scope, $scope.$parent.jsonViewer.getSession().getValue(), args, apiService);
    });
    
    // function called when link in the back button history is clicked
    $scope.historyOnClick = function(historyItem) {
        $scope.text = historyItem.urlText;
        apiService.selectedVersion = historyItem.selectedVersion;
        apiService.selectedOption = historyItem.htmlOption;

        if (historyItem.htmlOption == 'POST' || historyItem.htmlOption == 'PATCH') {
            apiService.showJsonEditor = true;
            if ($scope.jsonEditor) {
                $scope.jsonEditor.getSession().setValue(historyItem.jsonInput);
            } else {
                console.error("json editor watch event not firing");
            }
        } else {
            //clear jsonEditor
            if ($scope.jsonEditor) {
                $scope.jsonEditor.getSession().setValue("");
            }
            apiService.showJsonEditor = false;

        }
        $scope.submit($scope.text);
    }
    
    $scope.closeAdminConsentBar = function() {
        $scope.insufficientPrivileges = false;
    }

    $scope.getAdminConsent = function () {
        hello('msft_admin_consent').login({
            display: 'popup'
        }).then(function() {
            $scope.finishAdminConsertFlow();
        }, function() {
            $scope.finishAdminConsertFlow();
        })
    }
    
    $scope.selectedItemChange = function(item) {
        $scope.entityItem = item;
    }
    

    $scope.submit = function (query) {
        if (!query) {
            return;
        }

        apiService.text = query;
        $scope.requestInProgress = true;

        //create an object to store the api call
        var historyObj = {};

        historyObj.urlText = query;
        historyObj.selectedVersion = apiService.selectedVersion;
        historyObj.htmlOption = apiService.selectedOption;
        historyObj.jsonInput = "";


        if (historyObj.htmlOption == 'POST' || historyObj.htmlOption == 'PATCH') {
            historyObj.jsonInput = $scope.jsonEditor.getSession().getValue();
        }

        $scope.showJsonViewer = true;
        $scope.showImage = false;


        var postBody = "";
        if ($scope.jsonEditor != undefined) {
            postBody = $scope.jsonEditor.getSession().getValue();
        }

        var requestHeaders = "";
        if ($scope.jsonEditorHeaders != undefined) {
            requestHeaders = $scope.jsonEditorHeaders.getSession().getValue();
            requestHeaders = formatRequestHeaders(requestHeaders);
        }

        var startTime = new Date();

        function handleSuccessfulQueryResponse(result) {
            var status = result.status;
            var headers = result.headers;

            if (isImageResponse(headers)) {
                handleImageResponse($scope, apiService, startTime, result, headers, status, handleUnsuccessfulQueryResponse);
            } else if (isHtmlResponse(headers)) {
                handleHtmlResponse($scope, startTime, result, headers, status);
            } else if (isXmlResponse(result)) {
                handleXmlResponse($scope, startTime, result, headers, status);
            } else {
                handleJsonResponse($scope, startTime, result.data, headers, status);
            }

            saveHistoryObject(historyObj, status, new Date() - startTime);

            if (apiService.cache.get(apiService.selectedVersion + "Metadata") && apiService.selectedOption == "GET") {
                setEntity($scope.entityItem, apiService, true, apiService.text);
            }

            $scope.insufficientPrivileges = false;
        }

        function handleUnsuccessfulQueryResponse(result) {
            var status = result.status;
            var headers = result.headers;
            handleJsonResponse($scope, startTime, result.data, headers, status);
            saveHistoryObject(historyObj, status, new Date() - startTime);
            if (apiService.cache.get(apiService.selectedVersion + "Metadata") && apiService.selectedOption == "GET") {
                setEntity($scope.entityItem, apiService, false, apiService.text);
            }

            if (status === 401 || status === 403) {
                $scope.insufficientPrivileges = true;
            }
        }


        if ($scope.isAuthenticated()) {
            apiService.performQuery(apiService.selectedOption)(apiService.text, postBody, requestHeaders)
                .then(handleSuccessfulQueryResponse, handleUnsuccessfulQueryResponse);

        } else {
            apiService.performAnonymousQuery(apiService.selectedOption)(apiService.text, postBody, requestHeaders)
                .then(handleSuccessfulQueryResponse, handleUnsuccessfulQueryResponse);
        }
    };
}]);
// ------------------------------------------------------------------------------
//  Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.  See License in the project root for license information.
// ------------------------------------------------------------------------------

// get the path to this script
var scripts = document.getElementsByTagName("script")
var src = scripts[scripts.length-1].src;
var pathToBuildDir = src.split('/').slice(0, -2).join('/');

angular.module('ApiExplorer')
    .directive('apiExplorer', function() {
        return {
            scope: {
                strings: '=',
                language: '=',
                scopes: '=',
                adminScopes: '=',
                clientId: '=',
                redirectUrl: '='
            },
            templateUrl: pathToBuildDir+'/assets/views/explorer.html',
            controller: function ($scope) {
                $scope.pathToBuildDir = pathToBuildDir;

                // default strings
                $scope.str = loc_strings['en_us'];

                // if the user specified a language, use that instead
                if ($scope.language) {
                    $scope.str = loc_strings[$scope.language];
                }

                // merge $scope.strings into $scope.str
                angular.extend($scope.str, $scope.strings);


                hello.init( {
                    msft: $scope.clientId
                }, {
                    scope: $scope.scopes,
                    redirect_uri: window.location.pathname //required to remove extra url params that make URLs not match
                });

                hello.init( {
                    msft_admin_consent: $scope.clientId,
                    msft_token_refresh: $scope.clientId,
                }, {
                    redirect_uri: window.location.pathname
                });
            }
        };
    });
// ------------------------------------------------------------------------------
//  Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.  See License in the project root for license information.
// ------------------------------------------------------------------------------

function initializeJsonEditor($scope, bodyVal) {
    var jsonViewerElement = document.getElementById("jsonEditor");
    jsonEditor = ace.edit(jsonViewerElement);
    jsonEditor.getSession().setMode("ace/mode/javascript");
    jsonEditor.$blockScrolling = Infinity;
    
    jsonEditor.setShowPrintMargin(false);
    if (bodyVal) {
        jsonEditor.getSession().insert({row:0, column:0}, bodyVal);
    } else {
        jsonEditor.getSession().insert(0, " ");
    }

    jsonEditor.renderer.setOption('showLineNumbers', false);
    //accessibility - keyboard dependant users must be able to "tab out" of session
    jsonEditor.commands.bindKey("Tab", null);
    $scope.jsonEditor = jsonEditor;
}

function initializeJsonEditorHeaders($scope, headersVal) {
    var jsonViewerElement = document.getElementById("jsonEditorHeaders");
    if (!jsonViewerElement) {
        console.error('cannot find #jsonEditorHeaders')
    }
    jsonEditorHeaders = ace.edit(jsonViewerElement);
    jsonEditorHeaders.setShowPrintMargin(false);

    jsonEditorHeaders.$blockScrolling = Infinity;
    //accessibility - keyboard dependant users must be able to "tab out" of session
    if(headersVal) {
        jsonEditorHeaders.getSession().insert(0, headersVal);
    } else {
        jsonEditorHeaders.getSession().insert(0, " ");
    }
    jsonEditorHeaders.renderer.setOption('showLineNumbers', false);
    jsonEditorHeaders.moveCursorTo(1,0);
    jsonEditorHeaders.commands.bindKey("Tab", null);
    $scope.jsonEditorHeaders = jsonEditorHeaders;
}
// ------------------------------------------------------------------------------
//  Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.  See License in the project root for license information.
// ------------------------------------------------------------------------------

function initializeJsonViewer($scope, apiService) {
    $(function() {
    
        var jsonViewerElement = document.getElementById("jsonViewer");
        jsonViewer = ace.edit(jsonViewerElement);
        jsonViewer.getSession().setMode("ace/mode/javascript");
        
        jsonViewer.$blockScrolling = Infinity;
        jsonViewer.renderer.setOption('showLineNumbers', false);
        
        jsonViewer.setOptions({
            readOnly: true,
            highlightActiveLine: false,
            highlightGutterLine: false,
        });
        jsonViewer.setShowPrintMargin(false);
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
                    this.isOpen = true
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
                        this.clear()
                    }
                };

                this.findLink = function (row, column) {
                    var jsonViewer = this.jsonViewer;
                    var session = jsonViewer.session;
                    var line = session.getLine(row);

                    var match = this.getMatchAround(/https?:\/\/[^\s"]+/g, line, column);
                    if (!match) {
                        var match = this.getMatchAround(/"id": "[^\s"']+/g, line, column);
                        if (!match) return;
                        match = this.getMatchAround(/"[^\s"']+/g, line, column);
                        if (!match) return;
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

        HoverLink = require("hoverlink").HoverLink
        jsonViewer.hoverLink = new HoverLink(jsonViewer);
        jsonViewer.hoverLink.on("open", function (x) {
            run($scope, x.value, apiService);
        })

        $scope.jsonViewer = jsonViewer;
    });
}

function setJsonViewerContentType(mode) {
    jsonViewer.getSession().setMode("ace/mode/" + mode);
}
// ------------------------------------------------------------------------------
//  Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.  See License in the project root for license information.
// ------------------------------------------------------------------------------

var msGraphLinkResolution = function ($scope, body, args, service) {
    if (args.indexOf("https://") == -1) {
        if (service.text.indexOf(args.substr(1)) != -1) {

        } else if (service.text.indexOf("/me") != -1 && service.text.indexOf("/me/") == -1 && service.text.indexOf("/memberOf") == -1) {
            service.text = service.text.replace("/me", "") + "/users/" + args.substr(1);
        } else {

            // if type exists
            var index = body.indexOf(args.substr(1));
            var typeIndex = body.lastIndexOf('@odata.type', index);
            if (typeIndex != -1) {
                var typeIndexEnd = body.indexOf("\n", typeIndex);
                var type = body.substr(typeIndex, typeIndexEnd - typeIndex);
                type = type.replace("@odata.type\": \"#microsoft.graph.", "");
                type = type.replace("\"", "").replace(",", "");
                service.text = "https://graph.microsoft.com/v1.0/" + type + "s/" + args.substr(1);
            } else {
                if (service.text.indexOf("?") != -1) {
                    service.text = service.text.substr(0, service.text.indexOf("?"));
                }
                service.text = service.text + "/" + args.substr(1);
            }
        }
    } else {
        service.text = args.replace("\"", "");
    }
    //$scope.selectedOptions = 'GET';
    if(service.text && service.text.charAt(service.text.length-1) != '/'){
                service.text += '/';
    }
    $scope.submit(service.text);
}
// ------------------------------------------------------------------------------
//  Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.  See License in the project root for license information.
// ------------------------------------------------------------------------------

hello.init({
	msft: {
		oauth: {
			version: 2,
			auth: 'https://login.microsoftonline.com/common/oauth2/v2.0/authorize',
			grant: 'https://login.microsoftonline.com/common/oauth2/v2.0/token'
		},
		scope_delim: ' ',

		// Don't even try submitting via form.
		// This means no POST operations in <=IE9
		form: false
	}, msft_admin_consent: {
		oauth: {
			version: 2,
			auth: 'https://login.microsoftonline.com/common/adminconsent',
			grant: 'https://login.microsoftonline.com/common/oauth2/v2.0/token'
		},
		scope_delim: ' ',

		// Don't even try submitting via form.
		// This means no POST operations in <=IE9
		form: false
	}, msft_token_refresh: {
		oauth: {
			version: 2,
			auth: 'https://login.microsoftonline.com/common/oauth2/v2.0/authorize',
			grant: 'https://login.microsoftonline.com/common/oauth2/v2.0/token'
		},
		scope_delim: ' ',

		// Don't even try submitting via form.
		// This means no POST operations in <=IE9
		form: false
	}
});
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
        "attendees": [{
            "emailAddress": {
                "address": "AlexD@microsoft.com",
                "name": "Alex Darrow"
            },
            "type": "Required"
        }, {
            "emailAddress": {
                "address": "GarthF@imgeek.onmicrosoft.com",
                "name": "Garth Fort"
            },
            "type": "Required"
        }],
        "timeConstraint": {
            "timeslots": [{
                "start": {
                    "date": "2016-04-18",
                    "time": "9:00:00",
                    "timeZone": "Pacific Standard Time"
                },
                "end": {
                    "date": "2016-04-18",
                    "time": "18:00:00",
                    "timeZone": "Pacific Standard Time"
                }
            }]
        },
        "locationConstraint": [{
            "isRequired": "false",
            "suggestLocation": "true",
            "locations": [{
                "displayName": "Conf Room 32/1368",
                "locationEmailAddress": "conf32room1368@imgeek.onmicrosoft.com"
            }]
        }],
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
    }
}

var templateNames = {
    messages: 'message',
    events: 'event',
    sendMail: 'email'
}
var requestHistory = [];
var LocalStorageKeyGraphRequestHistory = "GRAPH_REQUEST_HISTORY";

function saveHistoryToLocalStorage() {
    localStorage.setItem(LocalStorageKeyGraphRequestHistory, JSON.stringify(requestHistory));
}

function loadHistoryFromLocalStorage() {
    var possibleHistory = localStorage.getItem(LocalStorageKeyGraphRequestHistory);
    if (possibleHistory != null) {
        requestHistory = JSON.parse(possibleHistory);
        requestHistory = requestHistory.filter(function(value, index, self) { 
            return self.indexOf(value) === index;   
        });
    }
}


function saveHistoryObject(historyObject, statusCode, duration) {
    historyObject.successful = statusCode >= 200 && statusCode < 300;
    historyObject.statusCode = statusCode;
    historyObject.duration = duration;
    requestHistory.splice(0, 0, historyObject); //add history object to the array

    saveHistoryToLocalStorage();
}


// init scripts


loadHistoryFromLocalStorage();


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
        var requestUrl = $scope.getRawSearchText();
        return createShareLink(requestUrl, _apiService.selectedOption, _apiService.selectedVersion);
    }

    $scope.generateSuperAgentCode = function() {
        var requestUrl = $scope.getRawSearchText();

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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImp3dC1kZWNvZGUubWluLmpzIiwiaGVsbG8uYWxsLmpzIiwiaGVsbG8uanMiLCJhcGktZXhwbG9yZXItaW5pdC5qcyIsImFwaS1leHBsb3Jlci1oZWxwZXJzLmpzIiwiYXBpLWV4cGxvcmVyLWFwcC5qcyIsImFwaS1leHBsb3Jlci1zdmMuanMiLCJsb2Nfc3RyaW5ncy5qcyIsImFwaS1leHBsb3Jlci1jdHJsLmpzIiwiYXBpLWV4cGxvcmVyLWRpcmVjdGl2ZS5qcyIsImFwaS1leHBsb3Jlci1qc2VkaXRvci5qcyIsImFwaS1leHBsb3Jlci1qc3ZpZXdlci5qcyIsImFwaS1leHBsb3Jlci1tc2dyYXBoLmpzIiwiYXV0aC5qcyIsInBvc3RUZW1wbGF0ZXMuanMiLCJoaXN0b3J5LmpzIiwic2hhcmUtZGlhbG9nLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNsc0xBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2orRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2pEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDL2NBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2pCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUM3RUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNsQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDbGhCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ25EQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDdk1BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDcENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDdkNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDM0hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDakNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImFsbC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiFmdW5jdGlvbiBhKGIsYyxkKXtmdW5jdGlvbiBlKGcsaCl7aWYoIWNbZ10pe2lmKCFiW2ddKXt2YXIgaT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFoJiZpKXJldHVybiBpKGcsITApO2lmKGYpcmV0dXJuIGYoZywhMCk7dmFyIGo9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitnK1wiJ1wiKTt0aHJvdyBqLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsan12YXIgaz1jW2ddPXtleHBvcnRzOnt9fTtiW2ddWzBdLmNhbGwoay5leHBvcnRzLGZ1bmN0aW9uKGEpe3ZhciBjPWJbZ11bMV1bYV07cmV0dXJuIGUoYz9jOmEpfSxrLGsuZXhwb3J0cyxhLGIsYyxkKX1yZXR1cm4gY1tnXS5leHBvcnRzfWZvcih2YXIgZj1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGc9MDtnPGQubGVuZ3RoO2crKyllKGRbZ10pO3JldHVybiBlfSh7MTpbZnVuY3Rpb24oYSxiLGMpe2Z1bmN0aW9uIGQoYSl7dGhpcy5tZXNzYWdlPWF9ZnVuY3Rpb24gZShhKXt2YXIgYj1TdHJpbmcoYSkucmVwbGFjZSgvPSskLyxcIlwiKTtpZihiLmxlbmd0aCU0PT0xKXRocm93IG5ldyBkKFwiJ2F0b2InIGZhaWxlZDogVGhlIHN0cmluZyB0byBiZSBkZWNvZGVkIGlzIG5vdCBjb3JyZWN0bHkgZW5jb2RlZC5cIik7Zm9yKHZhciBjLGUsZz0wLGg9MCxpPVwiXCI7ZT1iLmNoYXJBdChoKyspO35lJiYoYz1nJTQ/NjQqYytlOmUsZysrJTQpP2krPVN0cmluZy5mcm9tQ2hhckNvZGUoMjU1JmM+PigtMipnJjYpKTowKWU9Zi5pbmRleE9mKGUpO3JldHVybiBpfXZhciBmPVwiQUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVphYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5ejAxMjM0NTY3ODkrLz1cIjtkLnByb3RvdHlwZT1uZXcgRXJyb3IsZC5wcm90b3R5cGUubmFtZT1cIkludmFsaWRDaGFyYWN0ZXJFcnJvclwiLGIuZXhwb3J0cz1cInVuZGVmaW5lZFwiIT10eXBlb2Ygd2luZG93JiZ3aW5kb3cuYXRvYiYmd2luZG93LmF0b2IuYmluZCh3aW5kb3cpfHxlfSx7fV0sMjpbZnVuY3Rpb24oYSxiLGMpe2Z1bmN0aW9uIGQoYSl7cmV0dXJuIGRlY29kZVVSSUNvbXBvbmVudChlKGEpLnJlcGxhY2UoLyguKS9nLGZ1bmN0aW9uKGEsYil7dmFyIGM9Yi5jaGFyQ29kZUF0KDApLnRvU3RyaW5nKDE2KS50b1VwcGVyQ2FzZSgpO3JldHVybiBjLmxlbmd0aDwyJiYoYz1cIjBcIitjKSxcIiVcIitjfSkpfXZhciBlPWEoXCIuL2F0b2JcIik7Yi5leHBvcnRzPWZ1bmN0aW9uKGEpe3ZhciBiPWEucmVwbGFjZSgvLS9nLFwiK1wiKS5yZXBsYWNlKC9fL2csXCIvXCIpO3N3aXRjaChiLmxlbmd0aCU0KXtjYXNlIDA6YnJlYWs7Y2FzZSAyOmIrPVwiPT1cIjticmVhaztjYXNlIDM6Yis9XCI9XCI7YnJlYWs7ZGVmYXVsdDp0aHJvd1wiSWxsZWdhbCBiYXNlNjR1cmwgc3RyaW5nIVwifXRyeXtyZXR1cm4gZChiKX1jYXRjaChjKXtyZXR1cm4gZShiKX19fSx7XCIuL2F0b2JcIjoxfV0sMzpbZnVuY3Rpb24oYSxiLGMpe1widXNlIHN0cmljdFwiO3ZhciBkPWEoXCIuL2Jhc2U2NF91cmxfZGVjb2RlXCIpO2IuZXhwb3J0cz1mdW5jdGlvbihhLGIpe2lmKFwic3RyaW5nXCIhPXR5cGVvZiBhKXRocm93IG5ldyBFcnJvcihcIkludmFsaWQgdG9rZW4gc3BlY2lmaWVkXCIpO2I9Ynx8e307dmFyIGM9Yi5oZWFkZXI9PT0hMD8wOjE7cmV0dXJuIEpTT04ucGFyc2UoZChhLnNwbGl0KFwiLlwiKVtjXSkpfX0se1wiLi9iYXNlNjRfdXJsX2RlY29kZVwiOjJ9XSw0OltmdW5jdGlvbihhLGIsYyl7KGZ1bmN0aW9uKGIpe3ZhciBjPWEoXCIuL2xpYi9pbmRleFwiKTtcImZ1bmN0aW9uXCI9PXR5cGVvZiBiLndpbmRvdy5kZWZpbmUmJmIud2luZG93LmRlZmluZS5hbWQ/Yi53aW5kb3cuZGVmaW5lKFwiand0X2RlY29kZVwiLGZ1bmN0aW9uKCl7cmV0dXJuIGN9KTpiLndpbmRvdyYmKGIud2luZG93Lmp3dF9kZWNvZGU9Yyl9KS5jYWxsKHRoaXMsXCJ1bmRlZmluZWRcIiE9dHlwZW9mIGdsb2JhbD9nbG9iYWw6XCJ1bmRlZmluZWRcIiE9dHlwZW9mIHNlbGY/c2VsZjpcInVuZGVmaW5lZFwiIT10eXBlb2Ygd2luZG93P3dpbmRvdzp7fSl9LHtcIi4vbGliL2luZGV4XCI6M31dfSx7fSxbNF0pOyIsIi8qISBoZWxsb2pzIHYxLjE0LjAgfCAoYykgMjAxMi0yMDE2IEFuZHJldyBEb2Rzb24gfCBNSVQgaHR0cHM6Ly9hZG9kc29uLmNvbS9oZWxsby5qcy9MSUNFTlNFICovXHJcbi8vIEVTNSBPYmplY3QuY3JlYXRlXHJcbmlmICghT2JqZWN0LmNyZWF0ZSkge1xyXG5cclxuXHQvLyBTaGltLCBPYmplY3QgY3JlYXRlXHJcblx0Ly8gQSBzaGltIGZvciBPYmplY3QuY3JlYXRlKCksIGl0IGFkZHMgYSBwcm90b3R5cGUgdG8gYSBuZXcgb2JqZWN0XHJcblx0T2JqZWN0LmNyZWF0ZSA9IChmdW5jdGlvbigpIHtcclxuXHJcblx0XHRmdW5jdGlvbiBGKCkge31cclxuXHJcblx0XHRyZXR1cm4gZnVuY3Rpb24obykge1xyXG5cclxuXHRcdFx0aWYgKGFyZ3VtZW50cy5sZW5ndGggIT0gMSkge1xyXG5cdFx0XHRcdHRocm93IG5ldyBFcnJvcignT2JqZWN0LmNyZWF0ZSBpbXBsZW1lbnRhdGlvbiBvbmx5IGFjY2VwdHMgb25lIHBhcmFtZXRlci4nKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0Ri5wcm90b3R5cGUgPSBvO1xyXG5cdFx0XHRyZXR1cm4gbmV3IEYoKTtcclxuXHRcdH07XHJcblxyXG5cdH0pKCk7XHJcblxyXG59XHJcblxyXG4vLyBFUzUgT2JqZWN0LmtleXNcclxuaWYgKCFPYmplY3Qua2V5cykge1xyXG5cdE9iamVjdC5rZXlzID0gZnVuY3Rpb24obywgaywgcikge1xyXG5cdFx0ciA9IFtdO1xyXG5cdFx0Zm9yIChrIGluIG8pIHtcclxuXHRcdFx0aWYgKHIuaGFzT3duUHJvcGVydHkuY2FsbChvLCBrKSlcclxuXHRcdFx0XHRyLnB1c2goayk7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIHI7XHJcblx0fTtcclxufVxyXG5cclxuLy8gRVM1IFtdLmluZGV4T2ZcclxuaWYgKCFBcnJheS5wcm90b3R5cGUuaW5kZXhPZikge1xyXG5cdEFycmF5LnByb3RvdHlwZS5pbmRleE9mID0gZnVuY3Rpb24ocykge1xyXG5cclxuXHRcdGZvciAodmFyIGogPSAwOyBqIDwgdGhpcy5sZW5ndGg7IGorKykge1xyXG5cdFx0XHRpZiAodGhpc1tqXSA9PT0gcykge1xyXG5cdFx0XHRcdHJldHVybiBqO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIC0xO1xyXG5cdH07XHJcbn1cclxuXHJcbi8vIEVTNSBbXS5mb3JFYWNoXHJcbmlmICghQXJyYXkucHJvdG90eXBlLmZvckVhY2gpIHtcclxuXHRBcnJheS5wcm90b3R5cGUuZm9yRWFjaCA9IGZ1bmN0aW9uKGZ1bi8qLCB0aGlzQXJnKi8pIHtcclxuXHJcblx0XHRpZiAodGhpcyA9PT0gdm9pZCAwIHx8IHRoaXMgPT09IG51bGwpIHtcclxuXHRcdFx0dGhyb3cgbmV3IFR5cGVFcnJvcigpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHZhciB0ID0gT2JqZWN0KHRoaXMpO1xyXG5cdFx0dmFyIGxlbiA9IHQubGVuZ3RoID4+PiAwO1xyXG5cdFx0aWYgKHR5cGVvZiBmdW4gIT09ICdmdW5jdGlvbicpIHtcclxuXHRcdFx0dGhyb3cgbmV3IFR5cGVFcnJvcigpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHZhciB0aGlzQXJnID0gYXJndW1lbnRzLmxlbmd0aCA+PSAyID8gYXJndW1lbnRzWzFdIDogdm9pZCAwO1xyXG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBsZW47IGkrKykge1xyXG5cdFx0XHRpZiAoaSBpbiB0KSB7XHJcblx0XHRcdFx0ZnVuLmNhbGwodGhpc0FyZywgdFtpXSwgaSwgdCk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gdGhpcztcclxuXHR9O1xyXG59XHJcblxyXG4vLyBFUzUgW10uZmlsdGVyXHJcbmlmICghQXJyYXkucHJvdG90eXBlLmZpbHRlcikge1xyXG5cdEFycmF5LnByb3RvdHlwZS5maWx0ZXIgPSBmdW5jdGlvbihmdW4sIHRoaXNBcmcpIHtcclxuXHJcblx0XHR2YXIgYSA9IFtdO1xyXG5cdFx0dGhpcy5mb3JFYWNoKGZ1bmN0aW9uKHZhbCwgaSwgdCkge1xyXG5cdFx0XHRpZiAoZnVuLmNhbGwodGhpc0FyZyB8fCB2b2lkIDAsIHZhbCwgaSwgdCkpIHtcclxuXHRcdFx0XHRhLnB1c2godmFsKTtcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblxyXG5cdFx0cmV0dXJuIGE7XHJcblx0fTtcclxufVxyXG5cclxuLy8gUHJvZHVjdGlvbiBzdGVwcyBvZiBFQ01BLTI2MiwgRWRpdGlvbiA1LCAxNS40LjQuMTlcclxuLy8gUmVmZXJlbmNlOiBodHRwOi8vZXM1LmdpdGh1Yi5pby8jeDE1LjQuNC4xOVxyXG5pZiAoIUFycmF5LnByb3RvdHlwZS5tYXApIHtcclxuXHJcblx0QXJyYXkucHJvdG90eXBlLm1hcCA9IGZ1bmN0aW9uKGZ1biwgdGhpc0FyZykge1xyXG5cclxuXHRcdHZhciBhID0gW107XHJcblx0XHR0aGlzLmZvckVhY2goZnVuY3Rpb24odmFsLCBpLCB0KSB7XHJcblx0XHRcdGEucHVzaChmdW4uY2FsbCh0aGlzQXJnIHx8IHZvaWQgMCwgdmFsLCBpLCB0KSk7XHJcblx0XHR9KTtcclxuXHJcblx0XHRyZXR1cm4gYTtcclxuXHR9O1xyXG59XHJcblxyXG4vLyBFUzUgaXNBcnJheVxyXG5pZiAoIUFycmF5LmlzQXJyYXkpIHtcclxuXHJcblx0Ly8gRnVuY3Rpb24gQXJyYXkuaXNBcnJheVxyXG5cdEFycmF5LmlzQXJyYXkgPSBmdW5jdGlvbihvKSB7XHJcblx0XHRyZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG8pID09PSAnW29iamVjdCBBcnJheV0nO1xyXG5cdH07XHJcblxyXG59XHJcblxyXG4vLyBUZXN0IGZvciBsb2NhdGlvbi5hc3NpZ25cclxuaWYgKHR5cGVvZiB3aW5kb3cgPT09ICdvYmplY3QnICYmIHR5cGVvZiB3aW5kb3cubG9jYXRpb24gPT09ICdvYmplY3QnICYmICF3aW5kb3cubG9jYXRpb24uYXNzaWduKSB7XHJcblxyXG5cdHdpbmRvdy5sb2NhdGlvbi5hc3NpZ24gPSBmdW5jdGlvbih1cmwpIHtcclxuXHRcdHdpbmRvdy5sb2NhdGlvbiA9IHVybDtcclxuXHR9O1xyXG5cclxufVxyXG5cclxuLy8gVGVzdCBmb3IgRnVuY3Rpb24uYmluZFxyXG5pZiAoIUZ1bmN0aW9uLnByb3RvdHlwZS5iaW5kKSB7XHJcblxyXG5cdC8vIE1ETlxyXG5cdC8vIFBvbHlmaWxsIElFOCwgZG9lcyBub3Qgc3VwcG9ydCBuYXRpdmUgRnVuY3Rpb24uYmluZFxyXG5cdEZ1bmN0aW9uLnByb3RvdHlwZS5iaW5kID0gZnVuY3Rpb24oYikge1xyXG5cclxuXHRcdGlmICh0eXBlb2YgdGhpcyAhPT0gJ2Z1bmN0aW9uJykge1xyXG5cdFx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKCdGdW5jdGlvbi5wcm90b3R5cGUuYmluZCAtIHdoYXQgaXMgdHJ5aW5nIHRvIGJlIGJvdW5kIGlzIG5vdCBjYWxsYWJsZScpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGZ1bmN0aW9uIEMoKSB7fVxyXG5cclxuXHRcdHZhciBhID0gW10uc2xpY2U7XHJcblx0XHR2YXIgZiA9IGEuY2FsbChhcmd1bWVudHMsIDEpO1xyXG5cdFx0dmFyIF90aGlzID0gdGhpcztcclxuXHRcdHZhciBEID0gZnVuY3Rpb24oKSB7XHJcblx0XHRcdHJldHVybiBfdGhpcy5hcHBseSh0aGlzIGluc3RhbmNlb2YgQyA/IHRoaXMgOiBiIHx8IHdpbmRvdywgZi5jb25jYXQoYS5jYWxsKGFyZ3VtZW50cykpKTtcclxuXHRcdH07XHJcblxyXG5cdFx0Qy5wcm90b3R5cGUgPSB0aGlzLnByb3RvdHlwZTtcclxuXHRcdEQucHJvdG90eXBlID0gbmV3IEMoKTtcclxuXHJcblx0XHRyZXR1cm4gRDtcclxuXHR9O1xyXG5cclxufVxyXG5cclxuLyoqXHJcbiAqIEBoZWxsby5qc1xyXG4gKlxyXG4gKiBIZWxsb0pTIGlzIGEgY2xpZW50IHNpZGUgSmF2YXNjcmlwdCBTREsgZm9yIG1ha2luZyBPQXV0aDIgbG9naW5zIGFuZCBzdWJzZXF1ZW50IFJFU1QgY2FsbHMuXHJcbiAqXHJcbiAqIEBhdXRob3IgQW5kcmV3IERvZHNvblxyXG4gKiBAd2Vic2l0ZSBodHRwczovL2Fkb2Rzb24uY29tL2hlbGxvLmpzL1xyXG4gKlxyXG4gKiBAY29weXJpZ2h0IEFuZHJldyBEb2Rzb24sIDIwMTIgLSAyMDE1XHJcbiAqIEBsaWNlbnNlIE1JVDogWW91IGFyZSBmcmVlIHRvIHVzZSBhbmQgbW9kaWZ5IHRoaXMgY29kZSBmb3IgYW55IHVzZSwgb24gdGhlIGNvbmRpdGlvbiB0aGF0IHRoaXMgY29weXJpZ2h0IG5vdGljZSByZW1haW5zLlxyXG4gKi9cclxuXHJcbnZhciBoZWxsbyA9IGZ1bmN0aW9uKG5hbWUpIHtcclxuXHRyZXR1cm4gaGVsbG8udXNlKG5hbWUpO1xyXG59O1xyXG5cclxuaGVsbG8udXRpbHMgPSB7XHJcblxyXG5cdC8vIEV4dGVuZCB0aGUgZmlyc3Qgb2JqZWN0IHdpdGggdGhlIHByb3BlcnRpZXMgYW5kIG1ldGhvZHMgb2YgdGhlIHNlY29uZFxyXG5cdGV4dGVuZDogZnVuY3Rpb24ociAvKiwgYVssIGJbLCAuLi5dXSAqLykge1xyXG5cclxuXHRcdC8vIEdldCB0aGUgYXJndW1lbnRzIGFzIGFuIGFycmF5IGJ1dCBvbW1pdCB0aGUgaW5pdGlhbCBpdGVtXHJcblx0XHRBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpLmZvckVhY2goZnVuY3Rpb24oYSkge1xyXG5cdFx0XHRpZiAoQXJyYXkuaXNBcnJheShyKSAmJiBBcnJheS5pc0FycmF5KGEpKSB7XHJcblx0XHRcdFx0QXJyYXkucHJvdG90eXBlLnB1c2guYXBwbHkociwgYSk7XHJcblx0XHRcdH1cclxuXHRcdFx0ZWxzZSBpZiAociBpbnN0YW5jZW9mIE9iamVjdCAmJiBhIGluc3RhbmNlb2YgT2JqZWN0ICYmIHIgIT09IGEpIHtcclxuXHRcdFx0XHRmb3IgKHZhciB4IGluIGEpIHtcclxuXHRcdFx0XHRcdHJbeF0gPSBoZWxsby51dGlscy5leHRlbmQoclt4XSwgYVt4XSk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHRcdGVsc2Uge1xyXG5cclxuXHRcdFx0XHRpZiAoQXJyYXkuaXNBcnJheShhKSkge1xyXG5cdFx0XHRcdFx0Ly8gQ2xvbmUgaXRcclxuXHRcdFx0XHRcdGEgPSBhLnNsaWNlKDApO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0ciA9IGE7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cclxuXHRcdHJldHVybiByO1xyXG5cdH1cclxufTtcclxuXHJcbi8vIENvcmUgbGlicmFyeVxyXG5oZWxsby51dGlscy5leHRlbmQoaGVsbG8sIHtcclxuXHJcblx0c2V0dGluZ3M6IHtcclxuXHJcblx0XHQvLyBPQXV0aDIgYXV0aGVudGljYXRpb24gZGVmYXVsdHNcclxuXHRcdHJlZGlyZWN0X3VyaTogd2luZG93LmxvY2F0aW9uLmhyZWYuc3BsaXQoJyMnKVswXSxcclxuXHRcdHJlc3BvbnNlX3R5cGU6ICd0b2tlbicsXHJcblx0XHRkaXNwbGF5OiAncG9wdXAnLFxyXG5cdFx0c3RhdGU6ICcnLFxyXG5cclxuXHRcdC8vIE9BdXRoMSBzaGltXHJcblx0XHQvLyBUaGUgcGF0aCB0byB0aGUgT0F1dGgxIHNlcnZlciBmb3Igc2lnbmluZyB1c2VyIHJlcXVlc3RzXHJcblx0XHQvLyBXYW50IHRvIHJlY3JlYXRlIHlvdXIgb3duPyBDaGVja291dCBodHRwczovL2dpdGh1Yi5jb20vTXJTd2l0Y2gvbm9kZS1vYXV0aC1zaGltXHJcblx0XHRvYXV0aF9wcm94eTogJ2h0dHBzOi8vYXV0aC1zZXJ2ZXIuaGVyb2t1YXBwLmNvbS9wcm94eScsXHJcblxyXG5cdFx0Ly8gQVBJIHRpbWVvdXQgaW4gbWlsbGlzZWNvbmRzXHJcblx0XHR0aW1lb3V0OiAyMDAwMCxcclxuXHJcblx0XHQvLyBQb3B1cCBPcHRpb25zXHJcblx0XHRwb3B1cDoge1xyXG5cdFx0XHRyZXNpemFibGU6IDEsXHJcblx0XHRcdHNjcm9sbGJhcnM6IDEsXHJcblx0XHRcdHdpZHRoOiA1MDAsXHJcblx0XHRcdGhlaWdodDogNTUwXHJcblx0XHR9LFxyXG5cclxuXHRcdC8vIERlZmF1bHQgc2NvcGVcclxuXHRcdC8vIE1hbnkgc2VydmljZXMgcmVxdWlyZSBhdGxlYXN0IGEgcHJvZmlsZSBzY29wZSxcclxuXHRcdC8vIEhlbGxvSlMgYXV0b21hdGlhbGx5IGluY2x1ZGVzIHRoZSB2YWx1ZSBvZiBwcm92aWRlci5zY29wZV9tYXAuYmFzaWNcclxuXHRcdC8vIElmIHRoYXQncyBub3QgcmVxdWlyZWQgaXQgY2FuIGJlIHJlbW92ZWQgdmlhIGhlbGxvLnNldHRpbmdzLnNjb3BlLmxlbmd0aCA9IDA7XHJcblx0XHRzY29wZTogWydiYXNpYyddLFxyXG5cclxuXHRcdC8vIFNjb3BlIE1hcHNcclxuXHRcdC8vIFRoaXMgaXMgdGhlIGRlZmF1bHQgbW9kdWxlIHNjb3BlLCB0aGVzZSBhcmUgdGhlIGRlZmF1bHRzIHdoaWNoIGVhY2ggc2VydmljZSBpcyBtYXBwZWQgdG9vLlxyXG5cdFx0Ly8gQnkgaW5jbHVkaW5nIHRoZW0gaGVyZSBpdCBwcmV2ZW50cyB0aGUgc2NvcGUgZnJvbSBiZWluZyBhcHBsaWVkIGFjY2lkZW50YWxseVxyXG5cdFx0c2NvcGVfbWFwOiB7XHJcblx0XHRcdGJhc2ljOiAnJ1xyXG5cdFx0fSxcclxuXHJcblx0XHQvLyBEZWZhdWx0IHNlcnZpY2UgLyBuZXR3b3JrXHJcblx0XHRkZWZhdWx0X3NlcnZpY2U6IG51bGwsXHJcblxyXG5cdFx0Ly8gRm9yY2UgYXV0aGVudGljYXRpb25cclxuXHRcdC8vIFdoZW4gaGVsbG8ubG9naW4gaXMgZmlyZWQuXHJcblx0XHQvLyAobnVsbCk6IGlnbm9yZSBjdXJyZW50IHNlc3Npb24gZXhwaXJ5IGFuZCBjb250aW51ZSB3aXRoIGxvZ2luXHJcblx0XHQvLyAodHJ1ZSk6IGlnbm9yZSBjdXJyZW50IHNlc3Npb24gZXhwaXJ5IGFuZCBjb250aW51ZSB3aXRoIGxvZ2luLCBhc2sgZm9yIHVzZXIgdG8gcmVhdXRoZW50aWNhdGVcclxuXHRcdC8vIChmYWxzZSk6IGlmIHRoZSBjdXJyZW50IHNlc3Npb24gbG9va3MgZ29vZCBmb3IgdGhlIHJlcXVlc3Qgc2NvcGVzIHJldHVybiB0aGUgY3VycmVudCBzZXNzaW9uLlxyXG5cdFx0Zm9yY2U6IG51bGwsXHJcblxyXG5cdFx0Ly8gUGFnZSBVUkxcclxuXHRcdC8vIFdoZW4gJ2Rpc3BsYXk9cGFnZScgdGhpcyBwcm9wZXJ0eSBkZWZpbmVzIHdoZXJlIHRoZSB1c2VycyBwYWdlIHNob3VsZCBlbmQgdXAgYWZ0ZXIgcmVkaXJlY3RfdXJpXHJcblx0XHQvLyBUaHMgY291bGQgYmUgcHJvYmxlbWF0aWMgaWYgdGhlIHJlZGlyZWN0X3VyaSBpcyBpbmRlZWQgdGhlIGZpbmFsIHBsYWNlLFxyXG5cdFx0Ly8gVHlwaWNhbGx5IHRoaXMgY2lyY3VtdmVudHMgdGhlIHByb2JsZW0gb2YgdGhlIHJlZGlyZWN0X3VybCBiZWluZyBhIGR1bWIgcmVsYXkgcGFnZS5cclxuXHRcdHBhZ2VfdXJpOiB3aW5kb3cubG9jYXRpb24uaHJlZlxyXG5cdH0sXHJcblxyXG5cdC8vIFNlcnZpY2UgY29uZmlndXJhdGlvbiBvYmplY3RzXHJcblx0c2VydmljZXM6IHt9LFxyXG5cclxuXHQvLyBVc2VcclxuXHQvLyBEZWZpbmUgYSBuZXcgaW5zdGFuY2Ugb2YgdGhlIEhlbGxvSlMgbGlicmFyeSB3aXRoIGEgZGVmYXVsdCBzZXJ2aWNlXHJcblx0dXNlOiBmdW5jdGlvbihzZXJ2aWNlKSB7XHJcblxyXG5cdFx0Ly8gQ3JlYXRlIHNlbGYsIHdoaWNoIGluaGVyaXRzIGZyb20gaXRzIHBhcmVudFxyXG5cdFx0dmFyIHNlbGYgPSBPYmplY3QuY3JlYXRlKHRoaXMpO1xyXG5cclxuXHRcdC8vIEluaGVyaXQgdGhlIHByb3RvdHlwZSBmcm9tIGl0cyBwYXJlbnRcclxuXHRcdHNlbGYuc2V0dGluZ3MgPSBPYmplY3QuY3JlYXRlKHRoaXMuc2V0dGluZ3MpO1xyXG5cclxuXHRcdC8vIERlZmluZSB0aGUgZGVmYXVsdCBzZXJ2aWNlXHJcblx0XHRpZiAoc2VydmljZSkge1xyXG5cdFx0XHRzZWxmLnNldHRpbmdzLmRlZmF1bHRfc2VydmljZSA9IHNlcnZpY2U7XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gQ3JlYXRlIGFuIGluc3RhbmNlIG9mIEV2ZW50c1xyXG5cdFx0c2VsZi51dGlscy5FdmVudC5jYWxsKHNlbGYpO1xyXG5cclxuXHRcdHJldHVybiBzZWxmO1xyXG5cdH0sXHJcblxyXG5cdC8vIEluaXRpYWxpemVcclxuXHQvLyBEZWZpbmUgdGhlIGNsaWVudF9pZHMgZm9yIHRoZSBlbmRwb2ludCBzZXJ2aWNlc1xyXG5cdC8vIEBwYXJhbSBvYmplY3QgbywgY29udGFpbnMgYSBrZXkgdmFsdWUgcGFpciwgc2VydmljZSA9PiBjbGllbnRJZFxyXG5cdC8vIEBwYXJhbSBvYmplY3Qgb3B0cywgY29udGFpbnMgYSBrZXkgdmFsdWUgcGFpciBvZiBvcHRpb25zIHVzZWQgZm9yIGRlZmluaW5nIHRoZSBhdXRoZW50aWNhdGlvbiBkZWZhdWx0c1xyXG5cdC8vIEBwYXJhbSBudW1iZXIgdGltZW91dCwgdGltZW91dCBpbiBzZWNvbmRzXHJcblx0aW5pdDogZnVuY3Rpb24oc2VydmljZXMsIG9wdGlvbnMpIHtcclxuXHJcblx0XHR2YXIgdXRpbHMgPSB0aGlzLnV0aWxzO1xyXG5cclxuXHRcdGlmICghc2VydmljZXMpIHtcclxuXHRcdFx0cmV0dXJuIHRoaXMuc2VydmljZXM7XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gRGVmaW5lIHByb3ZpZGVyIGNyZWRlbnRpYWxzXHJcblx0XHQvLyBSZWZvcm1hdCB0aGUgSUQgZmllbGRcclxuXHRcdGZvciAodmFyIHggaW4gc2VydmljZXMpIHtpZiAoc2VydmljZXMuaGFzT3duUHJvcGVydHkoeCkpIHtcclxuXHRcdFx0aWYgKHR5cGVvZiAoc2VydmljZXNbeF0pICE9PSAnb2JqZWN0Jykge1xyXG5cdFx0XHRcdHNlcnZpY2VzW3hdID0ge2lkOiBzZXJ2aWNlc1t4XX07XHJcblx0XHRcdH1cclxuXHRcdH19XHJcblxyXG5cdFx0Ly8gTWVyZ2Ugc2VydmljZXMgaWYgdGhlcmUgYWxyZWFkeSBleGlzdHMgc29tZVxyXG5cdFx0dXRpbHMuZXh0ZW5kKHRoaXMuc2VydmljZXMsIHNlcnZpY2VzKTtcclxuXHJcblx0XHQvLyBVcGRhdGUgdGhlIGRlZmF1bHQgc2V0dGluZ3Mgd2l0aCB0aGlzIG9uZS5cclxuXHRcdGlmIChvcHRpb25zKSB7XHJcblx0XHRcdHV0aWxzLmV4dGVuZCh0aGlzLnNldHRpbmdzLCBvcHRpb25zKTtcclxuXHJcblx0XHRcdC8vIERvIHRoaXMgaW1tZWRpYXRseSBpbmNhc2UgdGhlIGJyb3dzZXIgY2hhbmdlcyB0aGUgY3VycmVudCBwYXRoLlxyXG5cdFx0XHRpZiAoJ3JlZGlyZWN0X3VyaScgaW4gb3B0aW9ucykge1xyXG5cdFx0XHRcdHRoaXMuc2V0dGluZ3MucmVkaXJlY3RfdXJpID0gdXRpbHMudXJsKG9wdGlvbnMucmVkaXJlY3RfdXJpKS5ocmVmO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIHRoaXM7XHJcblx0fSxcclxuXHJcblx0Ly8gTG9naW5cclxuXHQvLyBVc2luZyB0aGUgZW5kcG9pbnRcclxuXHQvLyBAcGFyYW0gbmV0d29yayBzdHJpbmdpZnkgICAgICAgbmFtZSB0byBjb25uZWN0IHRvXHJcblx0Ly8gQHBhcmFtIG9wdGlvbnMgb2JqZWN0ICAgIChvcHRpb25hbCkgIHtkaXNwbGF5IG1vZGUsIGlzIGVpdGhlciBub25lfHBvcHVwKGRlZmF1bHQpfHBhZ2UsIHNjb3BlOiBlbWFpbCxiaXJ0aGRheSxwdWJsaXNoLCAuLiB9XHJcblx0Ly8gQHBhcmFtIGNhbGxiYWNrICBmdW5jdGlvbiAgKG9wdGlvbmFsKSAgZmlyZWQgb24gc2lnbmluXHJcblx0bG9naW46IGZ1bmN0aW9uKCkge1xyXG5cclxuXHRcdC8vIENyZWF0ZSBhbiBvYmplY3Qgd2hpY2ggaW5oZXJpdHMgaXRzIHBhcmVudCBhcyB0aGUgcHJvdG90eXBlIGFuZCBjb25zdHJ1Y3RzIGEgbmV3IGV2ZW50IGNoYWluLlxyXG5cdFx0dmFyIF90aGlzID0gdGhpcztcclxuXHRcdHZhciB1dGlscyA9IF90aGlzLnV0aWxzO1xyXG5cdFx0dmFyIGVycm9yID0gdXRpbHMuZXJyb3I7XHJcblx0XHR2YXIgcHJvbWlzZSA9IHV0aWxzLlByb21pc2UoKTtcclxuXHJcblx0XHQvLyBHZXQgcGFyYW1ldGVyc1xyXG5cdFx0dmFyIHAgPSB1dGlscy5hcmdzKHtuZXR3b3JrOiAncycsIG9wdGlvbnM6ICdvJywgY2FsbGJhY2s6ICdmJ30sIGFyZ3VtZW50cyk7XHJcblxyXG5cdFx0Ly8gTG9jYWwgdmFyc1xyXG5cdFx0dmFyIHVybDtcclxuXHJcblx0XHQvLyBHZXQgYWxsIHRoZSBjdXN0b20gb3B0aW9ucyBhbmQgc3RvcmUgdG8gYmUgYXBwZW5kZWQgdG8gdGhlIHF1ZXJ5c3RyaW5nXHJcblx0XHR2YXIgcXMgPSB1dGlscy5kaWZmS2V5KHAub3B0aW9ucywgX3RoaXMuc2V0dGluZ3MpO1xyXG5cclxuXHRcdC8vIE1lcmdlL292ZXJyaWRlIG9wdGlvbnMgd2l0aCBhcHAgZGVmYXVsdHNcclxuXHRcdHZhciBvcHRzID0gcC5vcHRpb25zID0gdXRpbHMubWVyZ2UoX3RoaXMuc2V0dGluZ3MsIHAub3B0aW9ucyB8fCB7fSk7XHJcblxyXG5cdFx0Ly8gTWVyZ2Uvb3ZlcnJpZGUgb3B0aW9ucyB3aXRoIGFwcCBkZWZhdWx0c1xyXG5cdFx0b3B0cy5wb3B1cCA9IHV0aWxzLm1lcmdlKF90aGlzLnNldHRpbmdzLnBvcHVwLCBwLm9wdGlvbnMucG9wdXAgfHwge30pO1xyXG5cclxuXHRcdC8vIE5ldHdvcmtcclxuXHRcdHAubmV0d29yayA9IHAubmV0d29yayB8fCBfdGhpcy5zZXR0aW5ncy5kZWZhdWx0X3NlcnZpY2U7XHJcblxyXG5cdFx0Ly8gQmluZCBjYWxsYmFjayB0byBib3RoIHJlamVjdCBhbmQgZnVsZmlsbCBzdGF0ZXNcclxuXHRcdHByb21pc2UucHJveHkudGhlbihwLmNhbGxiYWNrLCBwLmNhbGxiYWNrKTtcclxuXHJcblx0XHQvLyBUcmlnZ2VyIGFuIGV2ZW50IG9uIHRoZSBnbG9iYWwgbGlzdGVuZXJcclxuXHRcdGZ1bmN0aW9uIGVtaXQocywgdmFsdWUpIHtcclxuXHRcdFx0aGVsbG8uZW1pdChzLCB2YWx1ZSk7XHJcblx0XHR9XHJcblxyXG5cdFx0cHJvbWlzZS5wcm94eS50aGVuKGVtaXQuYmluZCh0aGlzLCAnYXV0aC5sb2dpbiBhdXRoJyksIGVtaXQuYmluZCh0aGlzLCAnYXV0aC5mYWlsZWQgYXV0aCcpKTtcclxuXHJcblx0XHQvLyBJcyBvdXIgc2VydmljZSB2YWxpZD9cclxuXHRcdGlmICh0eXBlb2YgKHAubmV0d29yaykgIT09ICdzdHJpbmcnIHx8ICEocC5uZXR3b3JrIGluIF90aGlzLnNlcnZpY2VzKSkge1xyXG5cdFx0XHQvLyBUcmlnZ2VyIHRoZSBkZWZhdWx0IGxvZ2luLlxyXG5cdFx0XHQvLyBBaGggd2UgZG9udCBoYXZlIG9uZS5cclxuXHRcdFx0cmV0dXJuIHByb21pc2UucmVqZWN0KGVycm9yKCdpbnZhbGlkX25ldHdvcmsnLCAnVGhlIHByb3ZpZGVkIG5ldHdvcmsgd2FzIG5vdCByZWNvZ25pemVkJykpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHZhciBwcm92aWRlciA9IF90aGlzLnNlcnZpY2VzW3AubmV0d29ya107XHJcblxyXG5cdFx0Ly8gQ3JlYXRlIGEgZ2xvYmFsIGxpc3RlbmVyIHRvIGNhcHR1cmUgZXZlbnRzIHRyaWdnZXJlZCBvdXQgb2Ygc2NvcGVcclxuXHRcdHZhciBjYWxsYmFja0lkID0gdXRpbHMuZ2xvYmFsRXZlbnQoZnVuY3Rpb24oc3RyKSB7XHJcblxyXG5cdFx0XHQvLyBUaGUgcmVzcG9uc2VIYW5kbGVyIHJldHVybnMgYSBzdHJpbmcsIGxldHMgc2F2ZSB0aGlzIGxvY2FsbHlcclxuXHRcdFx0dmFyIG9iajtcclxuXHJcblx0XHRcdGlmIChzdHIpIHtcclxuXHRcdFx0XHRvYmogPSBKU09OLnBhcnNlKHN0cik7XHJcblx0XHRcdH1cclxuXHRcdFx0ZWxzZSB7XHJcblx0XHRcdFx0b2JqID0gZXJyb3IoJ2NhbmNlbGxlZCcsICdUaGUgYXV0aGVudGljYXRpb24gd2FzIG5vdCBjb21wbGV0ZWQnKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0Ly8gSGFuZGxlIHRoZXNlIHJlc3BvbnNlIHVzaW5nIHRoZSBsb2NhbFxyXG5cdFx0XHQvLyBUcmlnZ2VyIG9uIHRoZSBwYXJlbnRcclxuXHRcdFx0aWYgKCFvYmouZXJyb3IpIHtcclxuXHJcblx0XHRcdFx0Ly8gU2F2ZSBvbiB0aGUgcGFyZW50IHdpbmRvdyB0aGUgbmV3IGNyZWRlbnRpYWxzXHJcblx0XHRcdFx0Ly8gVGhpcyBmaXhlcyBhbiBJRTEwIGJ1ZyBpIHRoaW5rLi4uIGF0bGVhc3QgaXQgZG9lcyBmb3IgbWUuXHJcblx0XHRcdFx0dXRpbHMuc3RvcmUob2JqLm5ldHdvcmssIG9iaik7XHJcblxyXG5cdFx0XHRcdC8vIEZ1bGZpbGwgYSBzdWNjZXNzZnVsIGxvZ2luXHJcblx0XHRcdFx0cHJvbWlzZS5mdWxmaWxsKHtcclxuXHRcdFx0XHRcdG5ldHdvcms6IG9iai5uZXR3b3JrLFxyXG5cdFx0XHRcdFx0YXV0aFJlc3BvbnNlOiBvYmpcclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0fVxyXG5cdFx0XHRlbHNlIHtcclxuXHRcdFx0XHQvLyBSZWplY3QgYSBzdWNjZXNzZnVsIGxvZ2luXHJcblx0XHRcdFx0cHJvbWlzZS5yZWplY3Qob2JqKTtcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblxyXG5cdFx0dmFyIHJlZGlyZWN0VXJpID0gdXRpbHMudXJsKG9wdHMucmVkaXJlY3RfdXJpKS5ocmVmO1xyXG5cclxuXHRcdC8vIE1heSBiZSBhIHNwYWNlLWRlbGltaXRlZCBsaXN0IG9mIG11bHRpcGxlLCBjb21wbGVtZW50YXJ5IHR5cGVzXHJcblx0XHR2YXIgcmVzcG9uc2VUeXBlID0gcHJvdmlkZXIub2F1dGgucmVzcG9uc2VfdHlwZSB8fCBvcHRzLnJlc3BvbnNlX3R5cGU7XHJcblxyXG5cdFx0Ly8gRmFsbGJhY2sgdG8gdG9rZW4gaWYgdGhlIG1vZHVsZSBoYXNuJ3QgZGVmaW5lZCBhIGdyYW50IHVybFxyXG5cdFx0aWYgKC9cXGJjb2RlXFxiLy50ZXN0KHJlc3BvbnNlVHlwZSkgJiYgIXByb3ZpZGVyLm9hdXRoLmdyYW50KSB7XHJcblx0XHRcdHJlc3BvbnNlVHlwZSA9IHJlc3BvbnNlVHlwZS5yZXBsYWNlKC9cXGJjb2RlXFxiLywgJ3Rva2VuJyk7XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gUXVlcnkgc3RyaW5nIHBhcmFtZXRlcnMsIHdlIG1heSBwYXNzIG91ciBvd24gYXJndW1lbnRzIHRvIGZvcm0gdGhlIHF1ZXJ5c3RyaW5nXHJcblx0XHRwLnFzID0gdXRpbHMubWVyZ2UocXMsIHtcclxuXHRcdFx0Y2xpZW50X2lkOiBlbmNvZGVVUklDb21wb25lbnQocHJvdmlkZXIuaWQpLFxyXG5cdFx0XHRyZXNwb25zZV90eXBlOiBlbmNvZGVVUklDb21wb25lbnQocmVzcG9uc2VUeXBlKSxcclxuXHRcdFx0cmVkaXJlY3RfdXJpOiBlbmNvZGVVUklDb21wb25lbnQocmVkaXJlY3RVcmkpLFxyXG5cdFx0XHRzdGF0ZToge1xyXG5cdFx0XHRcdGNsaWVudF9pZDogcHJvdmlkZXIuaWQsXHJcblx0XHRcdFx0bmV0d29yazogcC5uZXR3b3JrLFxyXG5cdFx0XHRcdGRpc3BsYXk6IG9wdHMuZGlzcGxheSxcclxuXHRcdFx0XHRjYWxsYmFjazogY2FsbGJhY2tJZCxcclxuXHRcdFx0XHRzdGF0ZTogb3B0cy5zdGF0ZSxcclxuXHRcdFx0XHRyZWRpcmVjdF91cmk6IHJlZGlyZWN0VXJpXHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cclxuXHRcdC8vIEdldCBjdXJyZW50IHNlc3Npb24gZm9yIG1lcmdpbmcgc2NvcGVzLCBhbmQgZm9yIHF1aWNrIGF1dGggcmVzcG9uc2VcclxuXHRcdHZhciBzZXNzaW9uID0gdXRpbHMuc3RvcmUocC5uZXR3b3JrKTtcclxuXHJcblx0XHQvLyBTY29wZXMgKGF1dGhlbnRpY2F0aW9uIHBlcm1pc2lvbnMpXHJcblx0XHQvLyBFbnN1cmUgdGhpcyBpcyBhIHN0cmluZyAtIElFIGhhcyBhIHByb2JsZW0gbW92aW5nIEFycmF5cyBiZXR3ZWVuIHdpbmRvd3NcclxuXHRcdC8vIEFwcGVuZCB0aGUgc2V0dXAgc2NvcGVcclxuXHRcdHZhciBTQ09QRV9TUExJVCA9IC9bLFxcc10rLztcclxuXHJcblx0XHQvLyBJbmNsdWRlIGRlZmF1bHQgc2NvcGUgc2V0dGluZ3MgKGNsb25lZCkuXHJcblx0XHR2YXIgc2NvcGUgPSBfdGhpcy5zZXR0aW5ncy5zY29wZSA/IFtfdGhpcy5zZXR0aW5ncy5zY29wZS50b1N0cmluZygpXSA6IFtdO1xyXG5cclxuXHRcdC8vIEV4dGVuZCB0aGUgcHJvdmlkZXJzIHNjb3BlIGxpc3Qgd2l0aCB0aGUgZGVmYXVsdFxyXG5cdFx0dmFyIHNjb3BlTWFwID0gdXRpbHMubWVyZ2UoX3RoaXMuc2V0dGluZ3Muc2NvcGVfbWFwLCBwcm92aWRlci5zY29wZSB8fCB7fSk7XHJcblxyXG5cdFx0Ly8gQWRkIHVzZXIgZGVmaW5lZCBzY29wZXMuLi5cclxuXHRcdGlmIChvcHRzLnNjb3BlKSB7XHJcblx0XHRcdHNjb3BlLnB1c2gob3B0cy5zY29wZS50b1N0cmluZygpKTtcclxuXHRcdH1cclxuXHJcblx0XHQvLyBBcHBlbmQgc2NvcGVzIGZyb20gYSBwcmV2aW91cyBzZXNzaW9uLlxyXG5cdFx0Ly8gVGhpcyBoZWxwcyBrZWVwIGFwcCBjcmVkZW50aWFscyBjb25zdGFudCxcclxuXHRcdC8vIEF2b2lkaW5nIGhhdmluZyB0byBrZWVwIHRhYnMgb24gd2hhdCBzY29wZXMgYXJlIGF1dGhvcml6ZWRcclxuXHRcdGlmIChzZXNzaW9uICYmICdzY29wZScgaW4gc2Vzc2lvbiAmJiBzZXNzaW9uLnNjb3BlIGluc3RhbmNlb2YgU3RyaW5nKSB7XHJcblx0XHRcdHNjb3BlLnB1c2goc2Vzc2lvbi5zY29wZSk7XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gSm9pbiBhbmQgU3BsaXQgYWdhaW5cclxuXHRcdHNjb3BlID0gc2NvcGUuam9pbignLCcpLnNwbGl0KFNDT1BFX1NQTElUKTtcclxuXHJcblx0XHQvLyBGb3JtYXQgcmVtb3ZlIGR1cGxpY2F0ZXMgYW5kIGVtcHR5IHZhbHVlc1xyXG5cdFx0c2NvcGUgPSB1dGlscy51bmlxdWUoc2NvcGUpLmZpbHRlcihmaWx0ZXJFbXB0eSk7XHJcblxyXG5cdFx0Ly8gU2F2ZSB0aGUgdGhlIHNjb3BlcyB0byB0aGUgc3RhdGUgd2l0aCB0aGUgbmFtZXMgdGhhdCB0aGV5IHdlcmUgcmVxdWVzdGVkIHdpdGguXHJcblx0XHRwLnFzLnN0YXRlLnNjb3BlID0gc2NvcGUuam9pbignLCcpO1xyXG5cclxuXHRcdC8vIE1hcCBzY29wZXMgdG8gdGhlIHByb3ZpZGVycyBuYW1pbmcgY29udmVudGlvblxyXG5cdFx0c2NvcGUgPSBzY29wZS5tYXAoZnVuY3Rpb24oaXRlbSkge1xyXG5cdFx0XHQvLyBEb2VzIHRoaXMgaGF2ZSBhIG1hcHBpbmc/XHJcblx0XHRcdHJldHVybiAoaXRlbSBpbiBzY29wZU1hcCkgPyBzY29wZU1hcFtpdGVtXSA6IGl0ZW07XHJcblx0XHR9KTtcclxuXHJcblx0XHQvLyBTdHJpbmdpZnkgYW5kIEFycmF5aWZ5IHNvIHRoYXQgZG91YmxlIG1hcHBlZCBzY29wZXMgYXJlIGdpdmVuIHRoZSBjaGFuY2UgdG8gYmUgZm9ybWF0dGVkXHJcblx0XHRzY29wZSA9IHNjb3BlLmpvaW4oJywnKS5zcGxpdChTQ09QRV9TUExJVCk7XHJcblxyXG5cdFx0Ly8gQWdhaW4uLi5cclxuXHRcdC8vIEZvcm1hdCByZW1vdmUgZHVwbGljYXRlcyBhbmQgZW1wdHkgdmFsdWVzXHJcblx0XHRzY29wZSA9IHV0aWxzLnVuaXF1ZShzY29wZSkuZmlsdGVyKGZpbHRlckVtcHR5KTtcclxuXHJcblx0XHQvLyBKb2luIHdpdGggdGhlIGV4cGVjdGVkIHNjb3BlIGRlbGltaXRlciBpbnRvIGEgc3RyaW5nXHJcblx0XHRwLnFzLnNjb3BlID0gc2NvcGUuam9pbihwcm92aWRlci5zY29wZV9kZWxpbSB8fCAnLCcpO1xyXG5cclxuXHRcdC8vIElzIHRoZSB1c2VyIGFscmVhZHkgc2lnbmVkIGluIHdpdGggdGhlIGFwcHJvcHJpYXRlIHNjb3BlcywgdmFsaWQgYWNjZXNzX3Rva2VuP1xyXG5cdFx0aWYgKG9wdHMuZm9yY2UgPT09IGZhbHNlKSB7XHJcblxyXG5cdFx0XHRpZiAoc2Vzc2lvbiAmJiAnYWNjZXNzX3Rva2VuJyBpbiBzZXNzaW9uICYmIHNlc3Npb24uYWNjZXNzX3Rva2VuICYmICdleHBpcmVzJyBpbiBzZXNzaW9uICYmIHNlc3Npb24uZXhwaXJlcyA+ICgobmV3IERhdGUoKSkuZ2V0VGltZSgpIC8gMWUzKSkge1xyXG5cdFx0XHRcdC8vIFdoYXQgaXMgZGlmZmVyZW50IGFib3V0IHRoZSBzY29wZXMgaW4gdGhlIHNlc3Npb24gdnMgdGhlIHNjb3BlcyBpbiB0aGUgbmV3IGxvZ2luP1xyXG5cdFx0XHRcdHZhciBkaWZmID0gdXRpbHMuZGlmZigoc2Vzc2lvbi5zY29wZSB8fCAnJykuc3BsaXQoU0NPUEVfU1BMSVQpLCAocC5xcy5zdGF0ZS5zY29wZSB8fCAnJykuc3BsaXQoU0NPUEVfU1BMSVQpKTtcclxuXHRcdFx0XHRpZiAoZGlmZi5sZW5ndGggPT09IDApIHtcclxuXHJcblx0XHRcdFx0XHQvLyBPSyB0cmlnZ2VyIHRoZSBjYWxsYmFja1xyXG5cdFx0XHRcdFx0cHJvbWlzZS5mdWxmaWxsKHtcclxuXHRcdFx0XHRcdFx0dW5jaGFuZ2VkOiB0cnVlLFxyXG5cdFx0XHRcdFx0XHRuZXR3b3JrOiBwLm5ldHdvcmssXHJcblx0XHRcdFx0XHRcdGF1dGhSZXNwb25zZTogc2Vzc2lvblxyXG5cdFx0XHRcdFx0fSk7XHJcblxyXG5cdFx0XHRcdFx0Ly8gTm90aGluZyBoYXMgY2hhbmdlZFxyXG5cdFx0XHRcdFx0cmV0dXJuIHByb21pc2U7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gUGFnZSBVUkxcclxuXHRcdGlmIChvcHRzLmRpc3BsYXkgPT09ICdwYWdlJyAmJiBvcHRzLnBhZ2VfdXJpKSB7XHJcblx0XHRcdC8vIEFkZCBhIHBhZ2UgbG9jYXRpb24sIHBsYWNlIHRvIGVuZHVwIGFmdGVyIHNlc3Npb24gaGFzIGF1dGhlbnRpY2F0ZWRcclxuXHRcdFx0cC5xcy5zdGF0ZS5wYWdlX3VyaSA9IHV0aWxzLnVybChvcHRzLnBhZ2VfdXJpKS5ocmVmO1xyXG5cdFx0fVxyXG5cclxuXHRcdC8vIEJlc3Bva2VcclxuXHRcdC8vIE92ZXJyaWRlIGxvZ2luIHF1ZXJ5c3RyaW5ncyBmcm9tIGF1dGhfb3B0aW9uc1xyXG5cdFx0aWYgKCdsb2dpbicgaW4gcHJvdmlkZXIgJiYgdHlwZW9mIChwcm92aWRlci5sb2dpbikgPT09ICdmdW5jdGlvbicpIHtcclxuXHRcdFx0Ly8gRm9ybWF0IHRoZSBwYXJhbWF0ZXJzIGFjY29yZGluZyB0byB0aGUgcHJvdmlkZXJzIGZvcm1hdHRpbmcgZnVuY3Rpb25cclxuXHRcdFx0cHJvdmlkZXIubG9naW4ocCk7XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gQWRkIE9BdXRoIHRvIHN0YXRlXHJcblx0XHQvLyBXaGVyZSB0aGUgc2VydmljZSBpcyBnb2luZyB0byB0YWtlIGFkdmFudGFnZSBvZiB0aGUgb2F1dGhfcHJveHlcclxuXHRcdGlmICghL1xcYnRva2VuXFxiLy50ZXN0KHJlc3BvbnNlVHlwZSkgfHxcclxuXHRcdHBhcnNlSW50KHByb3ZpZGVyLm9hdXRoLnZlcnNpb24sIDEwKSA8IDIgfHxcclxuXHRcdChvcHRzLmRpc3BsYXkgPT09ICdub25lJyAmJiBwcm92aWRlci5vYXV0aC5ncmFudCAmJiBzZXNzaW9uICYmIHNlc3Npb24ucmVmcmVzaF90b2tlbikpIHtcclxuXHJcblx0XHRcdC8vIEFkZCB0aGUgb2F1dGggZW5kcG9pbnRzXHJcblx0XHRcdHAucXMuc3RhdGUub2F1dGggPSBwcm92aWRlci5vYXV0aDtcclxuXHJcblx0XHRcdC8vIEFkZCB0aGUgcHJveHkgdXJsXHJcblx0XHRcdHAucXMuc3RhdGUub2F1dGhfcHJveHkgPSBvcHRzLm9hdXRoX3Byb3h5O1xyXG5cclxuXHRcdH1cclxuXHJcblx0XHQvLyBDb252ZXJ0IHN0YXRlIHRvIGEgc3RyaW5nXHJcblx0XHRwLnFzLnN0YXRlID0gZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHAucXMuc3RhdGUpKTtcclxuXHJcblx0XHQvLyBVUkxcclxuXHRcdGlmIChwYXJzZUludChwcm92aWRlci5vYXV0aC52ZXJzaW9uLCAxMCkgPT09IDEpIHtcclxuXHJcblx0XHRcdC8vIFR1cm4gdGhlIHJlcXVlc3QgdG8gdGhlIE9BdXRoIFByb3h5IGZvciAzLWxlZ2dlZCBhdXRoXHJcblx0XHRcdHVybCA9IHV0aWxzLnFzKG9wdHMub2F1dGhfcHJveHksIHAucXMsIGVuY29kZUZ1bmN0aW9uKTtcclxuXHRcdH1cclxuXHJcblx0XHQvLyBSZWZyZXNoIHRva2VuXHJcblx0XHRlbHNlIGlmIChvcHRzLmRpc3BsYXkgPT09ICdub25lJyAmJiBwcm92aWRlci5vYXV0aC5ncmFudCAmJiBzZXNzaW9uICYmIHNlc3Npb24ucmVmcmVzaF90b2tlbikge1xyXG5cclxuXHRcdFx0Ly8gQWRkIHRoZSByZWZyZXNoX3Rva2VuIHRvIHRoZSByZXF1ZXN0XHJcblx0XHRcdHAucXMucmVmcmVzaF90b2tlbiA9IHNlc3Npb24ucmVmcmVzaF90b2tlbjtcclxuXHJcblx0XHRcdC8vIERlZmluZSB0aGUgcmVxdWVzdCBwYXRoXHJcblx0XHRcdHVybCA9IHV0aWxzLnFzKG9wdHMub2F1dGhfcHJveHksIHAucXMsIGVuY29kZUZ1bmN0aW9uKTtcclxuXHRcdH1cclxuXHRcdGVsc2Uge1xyXG5cdFx0XHR1cmwgPSB1dGlscy5xcyhwcm92aWRlci5vYXV0aC5hdXRoLCBwLnFzLCBlbmNvZGVGdW5jdGlvbik7XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gQnJvYWRjYXN0IHRoaXMgZXZlbnQgYXMgYW4gYXV0aDppbml0XHJcblx0XHRlbWl0KCdhdXRoLmluaXQnLCBwKTtcclxuXHJcblx0XHQvLyBFeGVjdXRlXHJcblx0XHQvLyBUcmlnZ2VyIGhvdyB3ZSB3YW50IHNlbGYgZGlzcGxheWVkXHJcblx0XHRpZiAob3B0cy5kaXNwbGF5ID09PSAnbm9uZScpIHtcclxuXHRcdFx0Ly8gU2lnbi1pbiBpbiB0aGUgYmFja2dyb3VuZCwgaWZyYW1lXHJcblx0XHRcdHV0aWxzLmlmcmFtZSh1cmwsIHJlZGlyZWN0VXJpKTtcclxuXHRcdH1cclxuXHJcblx0XHQvLyBUcmlnZ2VyaW5nIHBvcHVwP1xyXG5cdFx0ZWxzZSBpZiAob3B0cy5kaXNwbGF5ID09PSAncG9wdXAnKSB7XHJcblxyXG5cdFx0XHR2YXIgcG9wdXAgPSB1dGlscy5wb3B1cCh1cmwsIHJlZGlyZWN0VXJpLCBvcHRzLnBvcHVwKTtcclxuXHJcblx0XHRcdHZhciB0aW1lciA9IHNldEludGVydmFsKGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdGlmICghcG9wdXAgfHwgcG9wdXAuY2xvc2VkKSB7XHJcblx0XHRcdFx0XHRjbGVhckludGVydmFsKHRpbWVyKTtcclxuXHRcdFx0XHRcdGlmICghcHJvbWlzZS5zdGF0ZSkge1xyXG5cclxuXHRcdFx0XHRcdFx0dmFyIHJlc3BvbnNlID0gZXJyb3IoJ2NhbmNlbGxlZCcsICdMb2dpbiBoYXMgYmVlbiBjYW5jZWxsZWQnKTtcclxuXHJcblx0XHRcdFx0XHRcdGlmICghcG9wdXApIHtcclxuXHRcdFx0XHRcdFx0XHRyZXNwb25zZSA9IGVycm9yKCdibG9ja2VkJywgJ1BvcHVwIHdhcyBibG9ja2VkJyk7XHJcblx0XHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHRcdHJlc3BvbnNlLm5ldHdvcmsgPSBwLm5ldHdvcms7XHJcblxyXG5cdFx0XHRcdFx0XHRwcm9taXNlLnJlamVjdChyZXNwb25zZSk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9LCAxMDApO1xyXG5cdFx0fVxyXG5cclxuXHRcdGVsc2Uge1xyXG5cdFx0XHR3aW5kb3cubG9jYXRpb24gPSB1cmw7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIHByb21pc2UucHJveHk7XHJcblxyXG5cdFx0ZnVuY3Rpb24gZW5jb2RlRnVuY3Rpb24ocykge3JldHVybiBzO31cclxuXHJcblx0XHRmdW5jdGlvbiBmaWx0ZXJFbXB0eShzKSB7cmV0dXJuICEhczt9XHJcblx0fSxcclxuXHJcblx0Ly8gUmVtb3ZlIGFueSBkYXRhIGFzc29jaWF0ZWQgd2l0aCBhIGdpdmVuIHNlcnZpY2VcclxuXHQvLyBAcGFyYW0gc3RyaW5nIG5hbWUgb2YgdGhlIHNlcnZpY2VcclxuXHQvLyBAcGFyYW0gZnVuY3Rpb24gY2FsbGJhY2tcclxuXHRsb2dvdXQ6IGZ1bmN0aW9uKCkge1xyXG5cclxuXHRcdHZhciBfdGhpcyA9IHRoaXM7XHJcblx0XHR2YXIgdXRpbHMgPSBfdGhpcy51dGlscztcclxuXHRcdHZhciBlcnJvciA9IHV0aWxzLmVycm9yO1xyXG5cclxuXHRcdC8vIENyZWF0ZSBhIG5ldyBwcm9taXNlXHJcblx0XHR2YXIgcHJvbWlzZSA9IHV0aWxzLlByb21pc2UoKTtcclxuXHJcblx0XHR2YXIgcCA9IHV0aWxzLmFyZ3Moe25hbWU6J3MnLCBvcHRpb25zOiAnbycsIGNhbGxiYWNrOiAnZid9LCBhcmd1bWVudHMpO1xyXG5cclxuXHRcdHAub3B0aW9ucyA9IHAub3B0aW9ucyB8fCB7fTtcclxuXHJcblx0XHQvLyBBZGQgY2FsbGJhY2sgdG8gZXZlbnRzXHJcblx0XHRwcm9taXNlLnByb3h5LnRoZW4ocC5jYWxsYmFjaywgcC5jYWxsYmFjayk7XHJcblxyXG5cdFx0Ly8gVHJpZ2dlciBhbiBldmVudCBvbiB0aGUgZ2xvYmFsIGxpc3RlbmVyXHJcblx0XHRmdW5jdGlvbiBlbWl0KHMsIHZhbHVlKSB7XHJcblx0XHRcdGhlbGxvLmVtaXQocywgdmFsdWUpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHByb21pc2UucHJveHkudGhlbihlbWl0LmJpbmQodGhpcywgJ2F1dGgubG9nb3V0IGF1dGgnKSwgZW1pdC5iaW5kKHRoaXMsICdlcnJvcicpKTtcclxuXHJcblx0XHQvLyBOZXR3b3JrXHJcblx0XHRwLm5hbWUgPSBwLm5hbWUgfHwgdGhpcy5zZXR0aW5ncy5kZWZhdWx0X3NlcnZpY2U7XHJcblx0XHRwLmF1dGhSZXNwb25zZSA9IHV0aWxzLnN0b3JlKHAubmFtZSk7XHJcblxyXG5cdFx0aWYgKHAubmFtZSAmJiAhKHAubmFtZSBpbiBfdGhpcy5zZXJ2aWNlcykpIHtcclxuXHJcblx0XHRcdHByb21pc2UucmVqZWN0KGVycm9yKCdpbnZhbGlkX25ldHdvcmsnLCAnVGhlIG5ldHdvcmsgd2FzIHVucmVjb2duaXplZCcpKTtcclxuXHJcblx0XHR9XHJcblx0XHRlbHNlIGlmIChwLm5hbWUgJiYgcC5hdXRoUmVzcG9uc2UpIHtcclxuXHJcblx0XHRcdC8vIERlZmluZSB0aGUgY2FsbGJhY2tcclxuXHRcdFx0dmFyIGNhbGxiYWNrID0gZnVuY3Rpb24ob3B0cykge1xyXG5cclxuXHRcdFx0XHQvLyBSZW1vdmUgZnJvbSB0aGUgc3RvcmVcclxuXHRcdFx0XHR1dGlscy5zdG9yZShwLm5hbWUsIG51bGwpO1xyXG5cclxuXHRcdFx0XHQvLyBFbWl0IGV2ZW50cyBieSBkZWZhdWx0XHJcblx0XHRcdFx0cHJvbWlzZS5mdWxmaWxsKGhlbGxvLnV0aWxzLm1lcmdlKHtuZXR3b3JrOnAubmFtZX0sIG9wdHMgfHwge30pKTtcclxuXHRcdFx0fTtcclxuXHJcblx0XHRcdC8vIFJ1biBhbiBhc3luYyBvcGVyYXRpb24gdG8gcmVtb3ZlIHRoZSB1c2VycyBzZXNzaW9uXHJcblx0XHRcdHZhciBfb3B0cyA9IHt9O1xyXG5cdFx0XHRpZiAocC5vcHRpb25zLmZvcmNlKSB7XHJcblx0XHRcdFx0dmFyIGxvZ291dCA9IF90aGlzLnNlcnZpY2VzW3AubmFtZV0ubG9nb3V0O1xyXG5cdFx0XHRcdGlmIChsb2dvdXQpIHtcclxuXHRcdFx0XHRcdC8vIENvbnZlcnQgbG9nb3V0IHRvIFVSTCBzdHJpbmcsXHJcblx0XHRcdFx0XHQvLyBJZiBubyBzdHJpbmcgaXMgcmV0dXJuZWQsIHRoZW4gdGhpcyBmdW5jdGlvbiB3aWxsIGhhbmRsZSB0aGUgbG9nb3V0IGFzeW5jIHN0eWxlXHJcblx0XHRcdFx0XHRpZiAodHlwZW9mIChsb2dvdXQpID09PSAnZnVuY3Rpb24nKSB7XHJcblx0XHRcdFx0XHRcdGxvZ291dCA9IGxvZ291dChjYWxsYmFjaywgcCk7XHJcblx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0Ly8gSWYgbG9nb3V0IGlzIGEgc3RyaW5nIHRoZW4gYXNzdW1lIFVSTCBhbmQgb3BlbiBpbiBpZnJhbWUuXHJcblx0XHRcdFx0XHRpZiAodHlwZW9mIChsb2dvdXQpID09PSAnc3RyaW5nJykge1xyXG5cdFx0XHRcdFx0XHR1dGlscy5pZnJhbWUobG9nb3V0KTtcclxuXHRcdFx0XHRcdFx0X29wdHMuZm9yY2UgPSBudWxsO1xyXG5cdFx0XHRcdFx0XHRfb3B0cy5tZXNzYWdlID0gJ0xvZ291dCBzdWNjZXNzIG9uIHByb3ZpZGVycyBzaXRlIHdhcyBpbmRldGVybWluYXRlJztcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdGVsc2UgaWYgKGxvZ291dCA9PT0gdW5kZWZpbmVkKSB7XHJcblx0XHRcdFx0XHRcdC8vIFRoZSBjYWxsYmFjayBmdW5jdGlvbiB3aWxsIGhhbmRsZSB0aGUgcmVzcG9uc2UuXHJcblx0XHRcdFx0XHRcdHJldHVybiBwcm9taXNlLnByb3h5O1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0Ly8gUmVtb3ZlIGxvY2FsIGNyZWRlbnRpYWxzXHJcblx0XHRcdGNhbGxiYWNrKF9vcHRzKTtcclxuXHRcdH1cclxuXHRcdGVsc2Uge1xyXG5cdFx0XHRwcm9taXNlLnJlamVjdChlcnJvcignaW52YWxpZF9zZXNzaW9uJywgJ1RoZXJlIHdhcyBubyBzZXNzaW9uIHRvIHJlbW92ZScpKTtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gcHJvbWlzZS5wcm94eTtcclxuXHR9LFxyXG5cclxuXHQvLyBSZXR1cm5zIGFsbCB0aGUgc2Vzc2lvbnMgdGhhdCBhcmUgc3Vic2NyaWJlZCB0b29cclxuXHQvLyBAcGFyYW0gc3RyaW5nIG9wdGlvbmFsLCBuYW1lIG9mIHRoZSBzZXJ2aWNlIHRvIGdldCBpbmZvcm1hdGlvbiBhYm91dC5cclxuXHRnZXRBdXRoUmVzcG9uc2U6IGZ1bmN0aW9uKHNlcnZpY2UpIHtcclxuXHJcblx0XHQvLyBJZiB0aGUgc2VydmljZSBkb2Vzbid0IGV4aXN0XHJcblx0XHRzZXJ2aWNlID0gc2VydmljZSB8fCB0aGlzLnNldHRpbmdzLmRlZmF1bHRfc2VydmljZTtcclxuXHJcblx0XHRpZiAoIXNlcnZpY2UgfHwgIShzZXJ2aWNlIGluIHRoaXMuc2VydmljZXMpKSB7XHJcblx0XHRcdHJldHVybiBudWxsO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiB0aGlzLnV0aWxzLnN0b3JlKHNlcnZpY2UpIHx8IG51bGw7XHJcblx0fSxcclxuXHJcblx0Ly8gRXZlbnRzOiBwbGFjZWhvbGRlciBmb3IgdGhlIGV2ZW50c1xyXG5cdGV2ZW50czoge31cclxufSk7XHJcblxyXG4vLyBDb3JlIHV0aWxpdGllc1xyXG5oZWxsby51dGlscy5leHRlbmQoaGVsbG8udXRpbHMsIHtcclxuXHJcblx0Ly8gRXJyb3JcclxuXHRlcnJvcjogZnVuY3Rpb24oY29kZSwgbWVzc2FnZSkge1xyXG5cdFx0cmV0dXJuIHtcclxuXHRcdFx0ZXJyb3I6IHtcclxuXHRcdFx0XHRjb2RlOiBjb2RlLFxyXG5cdFx0XHRcdG1lc3NhZ2U6IG1lc3NhZ2VcclxuXHRcdFx0fVxyXG5cdFx0fTtcclxuXHR9LFxyXG5cclxuXHQvLyBBcHBlbmQgdGhlIHF1ZXJ5c3RyaW5nIHRvIGEgdXJsXHJcblx0Ly8gQHBhcmFtIHN0cmluZyB1cmxcclxuXHQvLyBAcGFyYW0gb2JqZWN0IHBhcmFtZXRlcnNcclxuXHRxczogZnVuY3Rpb24odXJsLCBwYXJhbXMsIGZvcm1hdEZ1bmN0aW9uKSB7XHJcblxyXG5cdFx0aWYgKHBhcmFtcykge1xyXG5cclxuXHRcdFx0Ly8gU2V0IGRlZmF1bHQgZm9ybWF0dGluZyBmdW5jdGlvblxyXG5cdFx0XHRmb3JtYXRGdW5jdGlvbiA9IGZvcm1hdEZ1bmN0aW9uIHx8IGVuY29kZVVSSUNvbXBvbmVudDtcclxuXHJcblx0XHRcdC8vIE92ZXJyaWRlIHRoZSBpdGVtcyBpbiB0aGUgVVJMIHdoaWNoIGFscmVhZHkgZXhpc3RcclxuXHRcdFx0Zm9yICh2YXIgeCBpbiBwYXJhbXMpIHtcclxuXHRcdFx0XHR2YXIgc3RyID0gJyhbXFxcXD9cXFxcJl0pJyArIHggKyAnPVteXFxcXCZdKic7XHJcblx0XHRcdFx0dmFyIHJlZyA9IG5ldyBSZWdFeHAoc3RyKTtcclxuXHRcdFx0XHRpZiAodXJsLm1hdGNoKHJlZykpIHtcclxuXHRcdFx0XHRcdHVybCA9IHVybC5yZXBsYWNlKHJlZywgJyQxJyArIHggKyAnPScgKyBmb3JtYXRGdW5jdGlvbihwYXJhbXNbeF0pKTtcclxuXHRcdFx0XHRcdGRlbGV0ZSBwYXJhbXNbeF07XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKCF0aGlzLmlzRW1wdHkocGFyYW1zKSkge1xyXG5cdFx0XHRyZXR1cm4gdXJsICsgKHVybC5pbmRleE9mKCc/JykgPiAtMSA/ICcmJyA6ICc/JykgKyB0aGlzLnBhcmFtKHBhcmFtcywgZm9ybWF0RnVuY3Rpb24pO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiB1cmw7XHJcblx0fSxcclxuXHJcblx0Ly8gUGFyYW1cclxuXHQvLyBFeHBsb2RlL2VuY29kZSB0aGUgcGFyYW1ldGVycyBvZiBhbiBVUkwgc3RyaW5nL29iamVjdFxyXG5cdC8vIEBwYXJhbSBzdHJpbmcgcywgc3RyaW5nIHRvIGRlY29kZVxyXG5cdHBhcmFtOiBmdW5jdGlvbihzLCBmb3JtYXRGdW5jdGlvbikge1xyXG5cdFx0dmFyIGI7XHJcblx0XHR2YXIgYSA9IHt9O1xyXG5cdFx0dmFyIG07XHJcblxyXG5cdFx0aWYgKHR5cGVvZiAocykgPT09ICdzdHJpbmcnKSB7XHJcblxyXG5cdFx0XHRmb3JtYXRGdW5jdGlvbiA9IGZvcm1hdEZ1bmN0aW9uIHx8IGRlY29kZVVSSUNvbXBvbmVudDtcclxuXHJcblx0XHRcdG0gPSBzLnJlcGxhY2UoL15bXFwjXFw/XS8sICcnKS5tYXRjaCgvKFtePVxcL1xcJl0rKT0oW15cXCZdKykvZyk7XHJcblx0XHRcdGlmIChtKSB7XHJcblx0XHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBtLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdFx0XHRiID0gbVtpXS5tYXRjaCgvKFtePV0rKT0oLiopLyk7XHJcblx0XHRcdFx0XHRhW2JbMV1dID0gZm9ybWF0RnVuY3Rpb24oYlsyXSk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRyZXR1cm4gYTtcclxuXHRcdH1cclxuXHRcdGVsc2Uge1xyXG5cclxuXHRcdFx0Zm9ybWF0RnVuY3Rpb24gPSBmb3JtYXRGdW5jdGlvbiB8fCBlbmNvZGVVUklDb21wb25lbnQ7XHJcblxyXG5cdFx0XHR2YXIgbyA9IHM7XHJcblxyXG5cdFx0XHRhID0gW107XHJcblxyXG5cdFx0XHRmb3IgKHZhciB4IGluIG8pIHtpZiAoby5oYXNPd25Qcm9wZXJ0eSh4KSkge1xyXG5cdFx0XHRcdGlmIChvLmhhc093blByb3BlcnR5KHgpKSB7XHJcblx0XHRcdFx0XHRhLnB1c2goW3gsIG9beF0gPT09ICc/JyA/ICc/JyA6IGZvcm1hdEZ1bmN0aW9uKG9beF0pXS5qb2luKCc9JykpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fX1cclxuXHJcblx0XHRcdHJldHVybiBhLmpvaW4oJyYnKTtcclxuXHRcdH1cclxuXHR9LFxyXG5cclxuXHQvLyBMb2NhbCBzdG9yYWdlIGZhY2FkZVxyXG5cdHN0b3JlOiAoZnVuY3Rpb24oKSB7XHJcblxyXG5cdFx0dmFyIGEgPSBbJ2xvY2FsU3RvcmFnZScsICdzZXNzaW9uU3RvcmFnZSddO1xyXG5cdFx0dmFyIGkgPSAtMTtcclxuXHRcdHZhciBwcmVmaXggPSAndGVzdCc7XHJcblxyXG5cdFx0Ly8gU2V0IExvY2FsU3RvcmFnZVxyXG5cdFx0dmFyIGxvY2FsU3RvcmFnZTtcclxuXHJcblx0XHR3aGlsZSAoYVsrK2ldKSB7XHJcblx0XHRcdHRyeSB7XHJcblx0XHRcdFx0Ly8gSW4gQ2hyb21lIHdpdGggY29va2llcyBibG9ja2VkLCBjYWxsaW5nIGxvY2FsU3RvcmFnZSB0aHJvd3MgYW4gZXJyb3JcclxuXHRcdFx0XHRsb2NhbFN0b3JhZ2UgPSB3aW5kb3dbYVtpXV07XHJcblx0XHRcdFx0bG9jYWxTdG9yYWdlLnNldEl0ZW0ocHJlZml4ICsgaSwgaSk7XHJcblx0XHRcdFx0bG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0ocHJlZml4ICsgaSk7XHJcblx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdH1cclxuXHRcdFx0Y2F0Y2ggKGUpIHtcclxuXHRcdFx0XHRsb2NhbFN0b3JhZ2UgPSBudWxsO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKCFsb2NhbFN0b3JhZ2UpIHtcclxuXHJcblx0XHRcdHZhciBjYWNoZSA9IG51bGw7XHJcblxyXG5cdFx0XHRsb2NhbFN0b3JhZ2UgPSB7XHJcblx0XHRcdFx0Z2V0SXRlbTogZnVuY3Rpb24ocHJvcCkge1xyXG5cdFx0XHRcdFx0cHJvcCA9IHByb3AgKyAnPSc7XHJcblx0XHRcdFx0XHR2YXIgbSA9IGRvY3VtZW50LmNvb2tpZS5zcGxpdCgnOycpO1xyXG5cdFx0XHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBtLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdFx0XHRcdHZhciBfbSA9IG1baV0ucmVwbGFjZSgvKF5cXHMrfFxccyskKS8sICcnKTtcclxuXHRcdFx0XHRcdFx0aWYgKF9tICYmIF9tLmluZGV4T2YocHJvcCkgPT09IDApIHtcclxuXHRcdFx0XHRcdFx0XHRyZXR1cm4gX20uc3Vic3RyKHByb3AubGVuZ3RoKTtcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdHJldHVybiBjYWNoZTtcclxuXHRcdFx0XHR9LFxyXG5cclxuXHRcdFx0XHRzZXRJdGVtOiBmdW5jdGlvbihwcm9wLCB2YWx1ZSkge1xyXG5cdFx0XHRcdFx0Y2FjaGUgPSB2YWx1ZTtcclxuXHRcdFx0XHRcdGRvY3VtZW50LmNvb2tpZSA9IHByb3AgKyAnPScgKyB2YWx1ZTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH07XHJcblxyXG5cdFx0XHQvLyBGaWxsIHRoZSBjYWNoZSB1cFxyXG5cdFx0XHRjYWNoZSA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdoZWxsbycpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGZ1bmN0aW9uIGdldCgpIHtcclxuXHRcdFx0dmFyIGpzb24gPSB7fTtcclxuXHRcdFx0dHJ5IHtcclxuXHRcdFx0XHRqc29uID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnaGVsbG8nKSkgfHwge307XHJcblx0XHRcdH1cclxuXHRcdFx0Y2F0Y2ggKGUpIHt9XHJcblxyXG5cdFx0XHRyZXR1cm4ganNvbjtcclxuXHRcdH1cclxuXHJcblx0XHRmdW5jdGlvbiBzZXQoanNvbikge1xyXG5cdFx0XHRsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnaGVsbG8nLCBKU09OLnN0cmluZ2lmeShqc29uKSk7XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gQ2hlY2sgaWYgdGhlIGJyb3dzZXIgc3VwcG9ydCBsb2NhbCBzdG9yYWdlXHJcblx0XHRyZXR1cm4gZnVuY3Rpb24obmFtZSwgdmFsdWUsIGRheXMpIHtcclxuXHJcblx0XHRcdC8vIExvY2FsIHN0b3JhZ2VcclxuXHRcdFx0dmFyIGpzb24gPSBnZXQoKTtcclxuXHJcblx0XHRcdGlmIChuYW1lICYmIHZhbHVlID09PSB1bmRlZmluZWQpIHtcclxuXHRcdFx0XHRyZXR1cm4ganNvbltuYW1lXSB8fCBudWxsO1xyXG5cdFx0XHR9XHJcblx0XHRcdGVsc2UgaWYgKG5hbWUgJiYgdmFsdWUgPT09IG51bGwpIHtcclxuXHRcdFx0XHR0cnkge1xyXG5cdFx0XHRcdFx0ZGVsZXRlIGpzb25bbmFtZV07XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdGNhdGNoIChlKSB7XHJcblx0XHRcdFx0XHRqc29uW25hbWVdID0gbnVsbDtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdFx0ZWxzZSBpZiAobmFtZSkge1xyXG5cdFx0XHRcdGpzb25bbmFtZV0gPSB2YWx1ZTtcclxuXHRcdFx0fVxyXG5cdFx0XHRlbHNlIHtcclxuXHRcdFx0XHRyZXR1cm4ganNvbjtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0c2V0KGpzb24pO1xyXG5cclxuXHRcdFx0cmV0dXJuIGpzb24gfHwgbnVsbDtcclxuXHRcdH07XHJcblxyXG5cdH0pKCksXHJcblxyXG5cdC8vIENyZWF0ZSBhbmQgQXBwZW5kIG5ldyBET00gZWxlbWVudHNcclxuXHQvLyBAcGFyYW0gbm9kZSBzdHJpbmdcclxuXHQvLyBAcGFyYW0gYXR0ciBvYmplY3QgbGl0ZXJhbFxyXG5cdC8vIEBwYXJhbSBkb20vc3RyaW5nXHJcblx0YXBwZW5kOiBmdW5jdGlvbihub2RlLCBhdHRyLCB0YXJnZXQpIHtcclxuXHJcblx0XHR2YXIgbiA9IHR5cGVvZiAobm9kZSkgPT09ICdzdHJpbmcnID8gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChub2RlKSA6IG5vZGU7XHJcblxyXG5cdFx0aWYgKHR5cGVvZiAoYXR0cikgPT09ICdvYmplY3QnKSB7XHJcblx0XHRcdGlmICgndGFnTmFtZScgaW4gYXR0cikge1xyXG5cdFx0XHRcdHRhcmdldCA9IGF0dHI7XHJcblx0XHRcdH1cclxuXHRcdFx0ZWxzZSB7XHJcblx0XHRcdFx0Zm9yICh2YXIgeCBpbiBhdHRyKSB7aWYgKGF0dHIuaGFzT3duUHJvcGVydHkoeCkpIHtcclxuXHRcdFx0XHRcdGlmICh0eXBlb2YgKGF0dHJbeF0pID09PSAnb2JqZWN0Jykge1xyXG5cdFx0XHRcdFx0XHRmb3IgKHZhciB5IGluIGF0dHJbeF0pIHtpZiAoYXR0clt4XS5oYXNPd25Qcm9wZXJ0eSh5KSkge1xyXG5cdFx0XHRcdFx0XHRcdG5beF1beV0gPSBhdHRyW3hdW3ldO1xyXG5cdFx0XHRcdFx0XHR9fVxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0ZWxzZSBpZiAoeCA9PT0gJ2h0bWwnKSB7XHJcblx0XHRcdFx0XHRcdG4uaW5uZXJIVE1MID0gYXR0clt4XTtcclxuXHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHQvLyBJRSBkb2Vzbid0IGxpa2UgdXMgc2V0dGluZyBtZXRob2RzIHdpdGggc2V0QXR0cmlidXRlXHJcblx0XHRcdFx0XHRlbHNlIGlmICghL15vbi8udGVzdCh4KSkge1xyXG5cdFx0XHRcdFx0XHRuLnNldEF0dHJpYnV0ZSh4LCBhdHRyW3hdKTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdGVsc2Uge1xyXG5cdFx0XHRcdFx0XHRuW3hdID0gYXR0clt4XTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9fVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKHRhcmdldCA9PT0gJ2JvZHknKSB7XHJcblx0XHRcdChmdW5jdGlvbiBzZWxmKCkge1xyXG5cdFx0XHRcdGlmIChkb2N1bWVudC5ib2R5KSB7XHJcblx0XHRcdFx0XHRkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKG4pO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRlbHNlIHtcclxuXHRcdFx0XHRcdHNldFRpbWVvdXQoc2VsZiwgMTYpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSkoKTtcclxuXHRcdH1cclxuXHRcdGVsc2UgaWYgKHR5cGVvZiAodGFyZ2V0KSA9PT0gJ29iamVjdCcpIHtcclxuXHRcdFx0dGFyZ2V0LmFwcGVuZENoaWxkKG4pO1xyXG5cdFx0fVxyXG5cdFx0ZWxzZSBpZiAodHlwZW9mICh0YXJnZXQpID09PSAnc3RyaW5nJykge1xyXG5cdFx0XHRkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSh0YXJnZXQpWzBdLmFwcGVuZENoaWxkKG4pO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBuO1xyXG5cdH0sXHJcblxyXG5cdC8vIEFuIGVhc3kgd2F5IHRvIGNyZWF0ZSBhIGhpZGRlbiBpZnJhbWVcclxuXHQvLyBAcGFyYW0gc3RyaW5nIHNyY1xyXG5cdGlmcmFtZTogZnVuY3Rpb24oc3JjKSB7XHJcblx0XHR0aGlzLmFwcGVuZCgnaWZyYW1lJywge3NyYzogc3JjLCBzdHlsZToge3Bvc2l0aW9uOidhYnNvbHV0ZScsIGxlZnQ6ICctMTAwMHB4JywgYm90dG9tOiAwLCBoZWlnaHQ6ICcxcHgnLCB3aWR0aDogJzFweCd9fSwgJ2JvZHknKTtcclxuXHR9LFxyXG5cclxuXHQvLyBSZWN1cnNpdmUgbWVyZ2UgdHdvIG9iamVjdHMgaW50byBvbmUsIHNlY29uZCBwYXJhbWV0ZXIgb3ZlcmlkZXMgdGhlIGZpcnN0XHJcblx0Ly8gQHBhcmFtIGEgYXJyYXlcclxuXHRtZXJnZTogZnVuY3Rpb24oLyogQXJnczogYSwgYiwgYywgLi4gbiAqLykge1xyXG5cdFx0dmFyIGFyZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMpO1xyXG5cdFx0YXJncy51bnNoaWZ0KHt9KTtcclxuXHRcdHJldHVybiB0aGlzLmV4dGVuZC5hcHBseShudWxsLCBhcmdzKTtcclxuXHR9LFxyXG5cclxuXHQvLyBNYWtlcyBpdCBlYXNpZXIgdG8gYXNzaWduIHBhcmFtZXRlcnMsIHdoZXJlIHNvbWUgYXJlIG9wdGlvbmFsXHJcblx0Ly8gQHBhcmFtIG8gb2JqZWN0XHJcblx0Ly8gQHBhcmFtIGEgYXJndW1lbnRzXHJcblx0YXJnczogZnVuY3Rpb24obywgYXJncykge1xyXG5cclxuXHRcdHZhciBwID0ge307XHJcblx0XHR2YXIgaSA9IDA7XHJcblx0XHR2YXIgdCA9IG51bGw7XHJcblx0XHR2YXIgeCA9IG51bGw7XHJcblxyXG5cdFx0Ly8gJ3gnIGlzIHRoZSBmaXJzdCBrZXkgaW4gdGhlIGxpc3Qgb2Ygb2JqZWN0IHBhcmFtZXRlcnNcclxuXHRcdGZvciAoeCBpbiBvKSB7aWYgKG8uaGFzT3duUHJvcGVydHkoeCkpIHtcclxuXHRcdFx0YnJlYWs7XHJcblx0XHR9fVxyXG5cclxuXHRcdC8vIFBhc3NpbmcgaW4gaGFzaCBvYmplY3Qgb2YgYXJndW1lbnRzP1xyXG5cdFx0Ly8gV2hlcmUgdGhlIGZpcnN0IGFyZ3VtZW50IGNhbid0IGJlIGFuIG9iamVjdFxyXG5cdFx0aWYgKChhcmdzLmxlbmd0aCA9PT0gMSkgJiYgKHR5cGVvZiAoYXJnc1swXSkgPT09ICdvYmplY3QnKSAmJiBvW3hdICE9ICdvIScpIHtcclxuXHJcblx0XHRcdC8vIENvdWxkIHRoaXMgb2JqZWN0IHN0aWxsIGJlbG9uZyB0byBhIHByb3BlcnR5P1xyXG5cdFx0XHQvLyBDaGVjayB0aGUgb2JqZWN0IGtleXMgaWYgdGhleSBtYXRjaCBhbnkgb2YgdGhlIHByb3BlcnR5IGtleXNcclxuXHRcdFx0Zm9yICh4IGluIGFyZ3NbMF0pIHtpZiAoby5oYXNPd25Qcm9wZXJ0eSh4KSkge1xyXG5cdFx0XHRcdC8vIERvZXMgdGhpcyBrZXkgZXhpc3QgaW4gdGhlIHByb3BlcnR5IGxpc3Q/XHJcblx0XHRcdFx0aWYgKHggaW4gbykge1xyXG5cdFx0XHRcdFx0Ly8gWWVzIHRoaXMga2V5IGRvZXMgZXhpc3Qgc28gaXRzIG1vc3QgbGlrZWx5IHRoaXMgZnVuY3Rpb24gaGFzIGJlZW4gaW52b2tlZCB3aXRoIGFuIG9iamVjdCBwYXJhbWV0ZXJcclxuXHRcdFx0XHRcdC8vIFJldHVybiBmaXJzdCBhcmd1bWVudCBhcyB0aGUgaGFzaCBvZiBhbGwgYXJndW1lbnRzXHJcblx0XHRcdFx0XHRyZXR1cm4gYXJnc1swXTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH19XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gRWxzZSBsb29wIHRocm91Z2ggYW5kIGFjY291bnQgZm9yIHRoZSBtaXNzaW5nIG9uZXMuXHJcblx0XHRmb3IgKHggaW4gbykge2lmIChvLmhhc093blByb3BlcnR5KHgpKSB7XHJcblxyXG5cdFx0XHR0ID0gdHlwZW9mIChhcmdzW2ldKTtcclxuXHJcblx0XHRcdGlmICgodHlwZW9mIChvW3hdKSA9PT0gJ2Z1bmN0aW9uJyAmJiBvW3hdLnRlc3QoYXJnc1tpXSkpIHx8ICh0eXBlb2YgKG9beF0pID09PSAnc3RyaW5nJyAmJiAoXHJcblx0XHRcdChvW3hdLmluZGV4T2YoJ3MnKSA+IC0xICYmIHQgPT09ICdzdHJpbmcnKSB8fFxyXG5cdFx0XHQob1t4XS5pbmRleE9mKCdvJykgPiAtMSAmJiB0ID09PSAnb2JqZWN0JykgfHxcclxuXHRcdFx0KG9beF0uaW5kZXhPZignaScpID4gLTEgJiYgdCA9PT0gJ251bWJlcicpIHx8XHJcblx0XHRcdChvW3hdLmluZGV4T2YoJ2EnKSA+IC0xICYmIHQgPT09ICdvYmplY3QnKSB8fFxyXG5cdFx0XHQob1t4XS5pbmRleE9mKCdmJykgPiAtMSAmJiB0ID09PSAnZnVuY3Rpb24nKVxyXG5cdFx0XHQpKVxyXG5cdFx0XHQpIHtcclxuXHRcdFx0XHRwW3hdID0gYXJnc1tpKytdO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRlbHNlIGlmICh0eXBlb2YgKG9beF0pID09PSAnc3RyaW5nJyAmJiBvW3hdLmluZGV4T2YoJyEnKSA+IC0xKSB7XHJcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0XHR9XHJcblx0XHR9fVxyXG5cclxuXHRcdHJldHVybiBwO1xyXG5cdH0sXHJcblxyXG5cdC8vIFJldHVybnMgYSBVUkwgaW5zdGFuY2VcclxuXHR1cmw6IGZ1bmN0aW9uKHBhdGgpIHtcclxuXHJcblx0XHQvLyBJZiB0aGUgcGF0aCBpcyBlbXB0eVxyXG5cdFx0aWYgKCFwYXRoKSB7XHJcblx0XHRcdHJldHVybiB3aW5kb3cubG9jYXRpb247XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gQ2hyb21lIGFuZCBGaXJlRm94IHN1cHBvcnQgbmV3IFVSTCgpIHRvIGV4dHJhY3QgVVJMIG9iamVjdHNcclxuXHRcdGVsc2UgaWYgKHdpbmRvdy5VUkwgJiYgVVJMIGluc3RhbmNlb2YgRnVuY3Rpb24gJiYgVVJMLmxlbmd0aCAhPT0gMCkge1xyXG5cdFx0XHRyZXR1cm4gbmV3IFVSTChwYXRoLCB3aW5kb3cubG9jYXRpb24pO1xyXG5cdFx0fVxyXG5cclxuXHRcdC8vIFVnbHkgc2hpbSwgaXQgd29ya3MhXHJcblx0XHRlbHNlIHtcclxuXHRcdFx0dmFyIGEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XHJcblx0XHRcdGEuaHJlZiA9IHBhdGg7XHJcblx0XHRcdHJldHVybiBhLmNsb25lTm9kZShmYWxzZSk7XHJcblx0XHR9XHJcblx0fSxcclxuXHJcblx0ZGlmZjogZnVuY3Rpb24oYSwgYikge1xyXG5cdFx0cmV0dXJuIGIuZmlsdGVyKGZ1bmN0aW9uKGl0ZW0pIHtcclxuXHRcdFx0cmV0dXJuIGEuaW5kZXhPZihpdGVtKSA9PT0gLTE7XHJcblx0XHR9KTtcclxuXHR9LFxyXG5cclxuXHQvLyBHZXQgdGhlIGRpZmZlcmVudCBoYXNoIG9mIHByb3BlcnRpZXMgdW5pcXVlIHRvIGBhYCwgYW5kIG5vdCBpbiBgYmBcclxuXHRkaWZmS2V5OiBmdW5jdGlvbihhLCBiKSB7XHJcblx0XHRpZiAoYSB8fCAhYikge1xyXG5cdFx0XHR2YXIgciA9IHt9O1xyXG5cdFx0XHRmb3IgKHZhciB4IGluIGEpIHtcclxuXHRcdFx0XHQvLyBEb2VzIHRoZSBwcm9wZXJ0eSBub3QgZXhpc3Q/XHJcblx0XHRcdFx0aWYgKCEoeCBpbiBiKSkge1xyXG5cdFx0XHRcdFx0clt4XSA9IGFbeF07XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRyZXR1cm4gcjtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gYTtcclxuXHR9LFxyXG5cclxuXHQvLyBVbmlxdWVcclxuXHQvLyBSZW1vdmUgZHVwbGljYXRlIGFuZCBudWxsIHZhbHVlcyBmcm9tIGFuIGFycmF5XHJcblx0Ly8gQHBhcmFtIGEgYXJyYXlcclxuXHR1bmlxdWU6IGZ1bmN0aW9uKGEpIHtcclxuXHRcdGlmICghQXJyYXkuaXNBcnJheShhKSkgeyByZXR1cm4gW107IH1cclxuXHJcblx0XHRyZXR1cm4gYS5maWx0ZXIoZnVuY3Rpb24oaXRlbSwgaW5kZXgpIHtcclxuXHRcdFx0Ly8gSXMgdGhpcyB0aGUgZmlyc3QgbG9jYXRpb24gb2YgaXRlbVxyXG5cdFx0XHRyZXR1cm4gYS5pbmRleE9mKGl0ZW0pID09PSBpbmRleDtcclxuXHRcdH0pO1xyXG5cdH0sXHJcblxyXG5cdGlzRW1wdHk6IGZ1bmN0aW9uKG9iaikge1xyXG5cclxuXHRcdC8vIFNjYWxhclxyXG5cdFx0aWYgKCFvYmopXHJcblx0XHRcdHJldHVybiB0cnVlO1xyXG5cclxuXHRcdC8vIEFycmF5XHJcblx0XHRpZiAoQXJyYXkuaXNBcnJheShvYmopKSB7XHJcblx0XHRcdHJldHVybiAhb2JqLmxlbmd0aDtcclxuXHRcdH1cclxuXHRcdGVsc2UgaWYgKHR5cGVvZiAob2JqKSA9PT0gJ29iamVjdCcpIHtcclxuXHRcdFx0Ly8gT2JqZWN0XHJcblx0XHRcdGZvciAodmFyIGtleSBpbiBvYmopIHtcclxuXHRcdFx0XHRpZiAob2JqLmhhc093blByb3BlcnR5KGtleSkpIHtcclxuXHRcdFx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gdHJ1ZTtcclxuXHR9LFxyXG5cclxuXHQvL2pzY3M6ZGlzYWJsZVxyXG5cclxuXHQvKiFcclxuXHQgKiogIFRoZW5hYmxlIC0tIEVtYmVkZGFibGUgTWluaW11bSBTdHJpY3RseS1Db21wbGlhbnQgUHJvbWlzZXMvQSsgMS4xLjEgVGhlbmFibGVcclxuXHQgKiogIENvcHlyaWdodCAoYykgMjAxMy0yMDE0IFJhbGYgUy4gRW5nZWxzY2hhbGwgPGh0dHA6Ly9lbmdlbHNjaGFsbC5jb20+XHJcblx0ICoqICBMaWNlbnNlZCB1bmRlciBUaGUgTUlUIExpY2Vuc2UgPGh0dHA6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9NSVQ+XHJcblx0ICoqICBTb3VyY2UtQ29kZSBkaXN0cmlidXRlZCBvbiA8aHR0cDovL2dpdGh1Yi5jb20vcnNlL3RoZW5hYmxlPlxyXG5cdCAqL1xyXG5cdFByb21pc2U6IChmdW5jdGlvbigpe1xyXG5cdFx0LyogIHByb21pc2Ugc3RhdGVzIFtQcm9taXNlcy9BKyAyLjFdICAqL1xyXG5cdFx0dmFyIFNUQVRFX1BFTkRJTkcgICA9IDA7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvKiAgW1Byb21pc2VzL0ErIDIuMS4xXSAgKi9cclxuXHRcdHZhciBTVEFURV9GVUxGSUxMRUQgPSAxOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLyogIFtQcm9taXNlcy9BKyAyLjEuMl0gICovXHJcblx0XHR2YXIgU1RBVEVfUkVKRUNURUQgID0gMjsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8qICBbUHJvbWlzZXMvQSsgMi4xLjNdICAqL1xyXG5cclxuXHRcdC8qICBwcm9taXNlIG9iamVjdCBjb25zdHJ1Y3RvciAgKi9cclxuXHRcdHZhciBhcGkgPSBmdW5jdGlvbiAoZXhlY3V0b3IpIHtcclxuXHRcdFx0LyogIG9wdGlvbmFsbHkgc3VwcG9ydCBub24tY29uc3RydWN0b3IvcGxhaW4tZnVuY3Rpb24gY2FsbCAgKi9cclxuXHRcdFx0aWYgKCEodGhpcyBpbnN0YW5jZW9mIGFwaSkpXHJcblx0XHRcdFx0cmV0dXJuIG5ldyBhcGkoZXhlY3V0b3IpO1xyXG5cclxuXHRcdFx0LyogIGluaXRpYWxpemUgb2JqZWN0ICAqL1xyXG5cdFx0XHR0aGlzLmlkICAgICAgICAgICA9IFwiVGhlbmFibGUvMS4wLjZcIjtcclxuXHRcdFx0dGhpcy5zdGF0ZSAgICAgICAgPSBTVEFURV9QRU5ESU5HOyAvKiAgaW5pdGlhbCBzdGF0ZSAgKi9cclxuXHRcdFx0dGhpcy5mdWxmaWxsVmFsdWUgPSB1bmRlZmluZWQ7ICAgICAvKiAgaW5pdGlhbCB2YWx1ZSAgKi8gICAgIC8qICBbUHJvbWlzZXMvQSsgMS4zLCAyLjEuMi4yXSAgKi9cclxuXHRcdFx0dGhpcy5yZWplY3RSZWFzb24gPSB1bmRlZmluZWQ7ICAgICAvKiAgaW5pdGlhbCByZWFzb24gKi8gICAgIC8qICBbUHJvbWlzZXMvQSsgMS41LCAyLjEuMy4yXSAgKi9cclxuXHRcdFx0dGhpcy5vbkZ1bGZpbGxlZCAgPSBbXTsgICAgICAgICAgICAvKiAgaW5pdGlhbCBoYW5kbGVycyAgKi9cclxuXHRcdFx0dGhpcy5vblJlamVjdGVkICAgPSBbXTsgICAgICAgICAgICAvKiAgaW5pdGlhbCBoYW5kbGVycyAgKi9cclxuXHJcblx0XHRcdC8qICBwcm92aWRlIG9wdGlvbmFsIGluZm9ybWF0aW9uLWhpZGluZyBwcm94eSAgKi9cclxuXHRcdFx0dGhpcy5wcm94eSA9IHtcclxuXHRcdFx0XHR0aGVuOiB0aGlzLnRoZW4uYmluZCh0aGlzKVxyXG5cdFx0XHR9O1xyXG5cclxuXHRcdFx0LyogIHN1cHBvcnQgb3B0aW9uYWwgZXhlY3V0b3IgZnVuY3Rpb24gICovXHJcblx0XHRcdGlmICh0eXBlb2YgZXhlY3V0b3IgPT09IFwiZnVuY3Rpb25cIilcclxuXHRcdFx0XHRleGVjdXRvci5jYWxsKHRoaXMsIHRoaXMuZnVsZmlsbC5iaW5kKHRoaXMpLCB0aGlzLnJlamVjdC5iaW5kKHRoaXMpKTtcclxuXHRcdH07XHJcblxyXG5cdFx0LyogIHByb21pc2UgQVBJIG1ldGhvZHMgICovXHJcblx0XHRhcGkucHJvdG90eXBlID0ge1xyXG5cdFx0XHQvKiAgcHJvbWlzZSByZXNvbHZpbmcgbWV0aG9kcyAgKi9cclxuXHRcdFx0ZnVsZmlsbDogZnVuY3Rpb24gKHZhbHVlKSB7IHJldHVybiBkZWxpdmVyKHRoaXMsIFNUQVRFX0ZVTEZJTExFRCwgXCJmdWxmaWxsVmFsdWVcIiwgdmFsdWUpOyB9LFxyXG5cdFx0XHRyZWplY3Q6ICBmdW5jdGlvbiAodmFsdWUpIHsgcmV0dXJuIGRlbGl2ZXIodGhpcywgU1RBVEVfUkVKRUNURUQsICBcInJlamVjdFJlYXNvblwiLCB2YWx1ZSk7IH0sXHJcblxyXG5cdFx0XHQvKiAgXCJUaGUgdGhlbiBNZXRob2RcIiBbUHJvbWlzZXMvQSsgMS4xLCAxLjIsIDIuMl0gICovXHJcblx0XHRcdHRoZW46IGZ1bmN0aW9uIChvbkZ1bGZpbGxlZCwgb25SZWplY3RlZCkge1xyXG5cdFx0XHRcdHZhciBjdXJyID0gdGhpcztcclxuXHRcdFx0XHR2YXIgbmV4dCA9IG5ldyBhcGkoKTsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvKiAgW1Byb21pc2VzL0ErIDIuMi43XSAgKi9cclxuXHRcdFx0XHRjdXJyLm9uRnVsZmlsbGVkLnB1c2goXHJcblx0XHRcdFx0XHRyZXNvbHZlcihvbkZ1bGZpbGxlZCwgbmV4dCwgXCJmdWxmaWxsXCIpKTsgICAgICAgICAgICAgLyogIFtQcm9taXNlcy9BKyAyLjIuMi8yLjIuNl0gICovXHJcblx0XHRcdFx0Y3Vyci5vblJlamVjdGVkLnB1c2goXHJcblx0XHRcdFx0XHRyZXNvbHZlcihvblJlamVjdGVkLCAgbmV4dCwgXCJyZWplY3RcIiApKTsgICAgICAgICAgICAgLyogIFtQcm9taXNlcy9BKyAyLjIuMy8yLjIuNl0gICovXHJcblx0XHRcdFx0ZXhlY3V0ZShjdXJyKTtcclxuXHRcdFx0XHRyZXR1cm4gbmV4dC5wcm94eTsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvKiAgW1Byb21pc2VzL0ErIDIuMi43LCAzLjNdICAqL1xyXG5cdFx0XHR9XHJcblx0XHR9O1xyXG5cclxuXHRcdC8qICBkZWxpdmVyIGFuIGFjdGlvbiAgKi9cclxuXHRcdHZhciBkZWxpdmVyID0gZnVuY3Rpb24gKGN1cnIsIHN0YXRlLCBuYW1lLCB2YWx1ZSkge1xyXG5cdFx0XHRpZiAoY3Vyci5zdGF0ZSA9PT0gU1RBVEVfUEVORElORykge1xyXG5cdFx0XHRcdGN1cnIuc3RhdGUgPSBzdGF0ZTsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8qICBbUHJvbWlzZXMvQSsgMi4xLjIuMSwgMi4xLjMuMV0gICovXHJcblx0XHRcdFx0Y3VycltuYW1lXSA9IHZhbHVlOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLyogIFtQcm9taXNlcy9BKyAyLjEuMi4yLCAyLjEuMy4yXSAgKi9cclxuXHRcdFx0XHRleGVjdXRlKGN1cnIpO1xyXG5cdFx0XHR9XHJcblx0XHRcdHJldHVybiBjdXJyO1xyXG5cdFx0fTtcclxuXHJcblx0XHQvKiAgZXhlY3V0ZSBhbGwgaGFuZGxlcnMgICovXHJcblx0XHR2YXIgZXhlY3V0ZSA9IGZ1bmN0aW9uIChjdXJyKSB7XHJcblx0XHRcdGlmIChjdXJyLnN0YXRlID09PSBTVEFURV9GVUxGSUxMRUQpXHJcblx0XHRcdFx0ZXhlY3V0ZV9oYW5kbGVycyhjdXJyLCBcIm9uRnVsZmlsbGVkXCIsIGN1cnIuZnVsZmlsbFZhbHVlKTtcclxuXHRcdFx0ZWxzZSBpZiAoY3Vyci5zdGF0ZSA9PT0gU1RBVEVfUkVKRUNURUQpXHJcblx0XHRcdFx0ZXhlY3V0ZV9oYW5kbGVycyhjdXJyLCBcIm9uUmVqZWN0ZWRcIiwgIGN1cnIucmVqZWN0UmVhc29uKTtcclxuXHRcdH07XHJcblxyXG5cdFx0LyogIGV4ZWN1dGUgcGFydGljdWxhciBzZXQgb2YgaGFuZGxlcnMgICovXHJcblx0XHR2YXIgZXhlY3V0ZV9oYW5kbGVycyA9IGZ1bmN0aW9uIChjdXJyLCBuYW1lLCB2YWx1ZSkge1xyXG5cdFx0XHQvKiBnbG9iYWwgcHJvY2VzczogdHJ1ZSAqL1xyXG5cdFx0XHQvKiBnbG9iYWwgc2V0SW1tZWRpYXRlOiB0cnVlICovXHJcblx0XHRcdC8qIGdsb2JhbCBzZXRUaW1lb3V0OiB0cnVlICovXHJcblxyXG5cdFx0XHQvKiAgc2hvcnQtY2lyY3VpdCBwcm9jZXNzaW5nICAqL1xyXG5cdFx0XHRpZiAoY3VycltuYW1lXS5sZW5ndGggPT09IDApXHJcblx0XHRcdFx0cmV0dXJuO1xyXG5cclxuXHRcdFx0LyogIGl0ZXJhdGUgb3ZlciBhbGwgaGFuZGxlcnMsIGV4YWN0bHkgb25jZSAgKi9cclxuXHRcdFx0dmFyIGhhbmRsZXJzID0gY3VycltuYW1lXTtcclxuXHRcdFx0Y3VycltuYW1lXSA9IFtdOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8qICBbUHJvbWlzZXMvQSsgMi4yLjIuMywgMi4yLjMuM10gICovXHJcblx0XHRcdHZhciBmdW5jID0gZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgaGFuZGxlcnMubGVuZ3RoOyBpKyspXHJcblx0XHRcdFx0XHRoYW5kbGVyc1tpXSh2YWx1ZSk7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8qICBbUHJvbWlzZXMvQSsgMi4yLjVdICAqL1xyXG5cdFx0XHR9O1xyXG5cclxuXHRcdFx0LyogIGV4ZWN1dGUgcHJvY2VkdXJlIGFzeW5jaHJvbm91c2x5ICAqLyAgICAgICAgICAgICAgICAgICAgIC8qICBbUHJvbWlzZXMvQSsgMi4yLjQsIDMuMV0gICovXHJcblx0XHRcdGlmICh0eXBlb2YgcHJvY2VzcyA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgcHJvY2Vzcy5uZXh0VGljayA9PT0gXCJmdW5jdGlvblwiKVxyXG5cdFx0XHRcdHByb2Nlc3MubmV4dFRpY2soZnVuYyk7XHJcblx0XHRcdGVsc2UgaWYgKHR5cGVvZiBzZXRJbW1lZGlhdGUgPT09IFwiZnVuY3Rpb25cIilcclxuXHRcdFx0XHRzZXRJbW1lZGlhdGUoZnVuYyk7XHJcblx0XHRcdGVsc2VcclxuXHRcdFx0XHRzZXRUaW1lb3V0KGZ1bmMsIDApO1xyXG5cdFx0fTtcclxuXHJcblx0XHQvKiAgZ2VuZXJhdGUgYSByZXNvbHZlciBmdW5jdGlvbiAgKi9cclxuXHRcdHZhciByZXNvbHZlciA9IGZ1bmN0aW9uIChjYiwgbmV4dCwgbWV0aG9kKSB7XHJcblx0XHRcdHJldHVybiBmdW5jdGlvbiAodmFsdWUpIHtcclxuXHRcdFx0XHRpZiAodHlwZW9mIGNiICE9PSBcImZ1bmN0aW9uXCIpICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8qICBbUHJvbWlzZXMvQSsgMi4yLjEsIDIuMi43LjMsIDIuMi43LjRdICAqL1xyXG5cdFx0XHRcdFx0bmV4dFttZXRob2RdLmNhbGwobmV4dCwgdmFsdWUpOyAgICAgICAgICAgICAgICAgICAgICAvKiAgW1Byb21pc2VzL0ErIDIuMi43LjMsIDIuMi43LjRdICAqL1xyXG5cdFx0XHRcdGVsc2Uge1xyXG5cdFx0XHRcdFx0dmFyIHJlc3VsdDtcclxuXHRcdFx0XHRcdHRyeSB7IHJlc3VsdCA9IGNiKHZhbHVlKTsgfSAgICAgICAgICAgICAgICAgICAgICAgICAgLyogIFtQcm9taXNlcy9BKyAyLjIuMi4xLCAyLjIuMy4xLCAyLjIuNSwgMy4yXSAgKi9cclxuXHRcdFx0XHRcdGNhdGNoIChlKSB7XHJcblx0XHRcdFx0XHRcdG5leHQucmVqZWN0KGUpOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvKiAgW1Byb21pc2VzL0ErIDIuMi43LjJdICAqL1xyXG5cdFx0XHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRyZXNvbHZlKG5leHQsIHJlc3VsdCk7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8qICBbUHJvbWlzZXMvQSsgMi4yLjcuMV0gICovXHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9O1xyXG5cdFx0fTtcclxuXHJcblx0XHQvKiAgXCJQcm9taXNlIFJlc29sdXRpb24gUHJvY2VkdXJlXCIgICovICAgICAgICAgICAgICAgICAgICAgICAgICAgLyogIFtQcm9taXNlcy9BKyAyLjNdICAqL1xyXG5cdFx0dmFyIHJlc29sdmUgPSBmdW5jdGlvbiAocHJvbWlzZSwgeCkge1xyXG5cdFx0XHQvKiAgc2FuaXR5IGNoZWNrIGFyZ3VtZW50cyAgKi8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLyogIFtQcm9taXNlcy9BKyAyLjMuMV0gICovXHJcblx0XHRcdGlmIChwcm9taXNlID09PSB4IHx8IHByb21pc2UucHJveHkgPT09IHgpIHtcclxuXHRcdFx0XHRwcm9taXNlLnJlamVjdChuZXcgVHlwZUVycm9yKFwiY2Fubm90IHJlc29sdmUgcHJvbWlzZSB3aXRoIGl0c2VsZlwiKSk7XHJcblx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQvKiAgc3VyZ2ljYWxseSBjaGVjayBmb3IgYSBcInRoZW5cIiBtZXRob2RcclxuXHRcdFx0XHQobWFpbmx5IHRvIGp1c3QgY2FsbCB0aGUgXCJnZXR0ZXJcIiBvZiBcInRoZW5cIiBvbmx5IG9uY2UpICAqL1xyXG5cdFx0XHR2YXIgdGhlbjtcclxuXHRcdFx0aWYgKCh0eXBlb2YgeCA9PT0gXCJvYmplY3RcIiAmJiB4ICE9PSBudWxsKSB8fCB0eXBlb2YgeCA9PT0gXCJmdW5jdGlvblwiKSB7XHJcblx0XHRcdFx0dHJ5IHsgdGhlbiA9IHgudGhlbjsgfSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLyogIFtQcm9taXNlcy9BKyAyLjMuMy4xLCAzLjVdICAqL1xyXG5cdFx0XHRcdGNhdGNoIChlKSB7XHJcblx0XHRcdFx0XHRwcm9taXNlLnJlamVjdChlKTsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8qICBbUHJvbWlzZXMvQSsgMi4zLjMuMl0gICovXHJcblx0XHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQvKiAgaGFuZGxlIG93biBUaGVuYWJsZXMgICAgW1Byb21pc2VzL0ErIDIuMy4yXVxyXG5cdFx0XHRcdGFuZCBzaW1pbGFyIFwidGhlbmFibGVzXCIgW1Byb21pc2VzL0ErIDIuMy4zXSAgKi9cclxuXHRcdFx0aWYgKHR5cGVvZiB0aGVuID09PSBcImZ1bmN0aW9uXCIpIHtcclxuXHRcdFx0XHR2YXIgcmVzb2x2ZWQgPSBmYWxzZTtcclxuXHRcdFx0XHR0cnkge1xyXG5cdFx0XHRcdFx0LyogIGNhbGwgcmV0cmlldmVkIFwidGhlblwiIG1ldGhvZCAqLyAgICAgICAgICAgICAgICAgIC8qICBbUHJvbWlzZXMvQSsgMi4zLjMuM10gICovXHJcblx0XHRcdFx0XHR0aGVuLmNhbGwoeCxcclxuXHRcdFx0XHRcdFx0LyogIHJlc29sdmVQcm9taXNlICAqLyAgICAgICAgICAgICAgICAgICAgICAgICAgIC8qICBbUHJvbWlzZXMvQSsgMi4zLjMuMy4xXSAgKi9cclxuXHRcdFx0XHRcdFx0ZnVuY3Rpb24gKHkpIHtcclxuXHRcdFx0XHRcdFx0XHRpZiAocmVzb2x2ZWQpIHJldHVybjsgcmVzb2x2ZWQgPSB0cnVlOyAgICAgICAvKiAgW1Byb21pc2VzL0ErIDIuMy4zLjMuM10gICovXHJcblx0XHRcdFx0XHRcdFx0aWYgKHkgPT09IHgpICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLyogIFtQcm9taXNlcy9BKyAzLjZdICAqL1xyXG5cdFx0XHRcdFx0XHRcdFx0cHJvbWlzZS5yZWplY3QobmV3IFR5cGVFcnJvcihcImNpcmN1bGFyIHRoZW5hYmxlIGNoYWluXCIpKTtcclxuXHRcdFx0XHRcdFx0XHRlbHNlXHJcblx0XHRcdFx0XHRcdFx0XHRyZXNvbHZlKHByb21pc2UsIHkpO1xyXG5cdFx0XHRcdFx0XHR9LFxyXG5cclxuXHRcdFx0XHRcdFx0LyogIHJlamVjdFByb21pc2UgICovICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8qICBbUHJvbWlzZXMvQSsgMi4zLjMuMy4yXSAgKi9cclxuXHRcdFx0XHRcdFx0ZnVuY3Rpb24gKHIpIHtcclxuXHRcdFx0XHRcdFx0XHRpZiAocmVzb2x2ZWQpIHJldHVybjsgcmVzb2x2ZWQgPSB0cnVlOyAgICAgICAvKiAgW1Byb21pc2VzL0ErIDIuMy4zLjMuM10gICovXHJcblx0XHRcdFx0XHRcdFx0cHJvbWlzZS5yZWplY3Qocik7XHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdCk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdGNhdGNoIChlKSB7XHJcblx0XHRcdFx0XHRpZiAoIXJlc29sdmVkKSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8qICBbUHJvbWlzZXMvQSsgMi4zLjMuMy4zXSAgKi9cclxuXHRcdFx0XHRcdFx0cHJvbWlzZS5yZWplY3QoZSk7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8qICBbUHJvbWlzZXMvQSsgMi4zLjMuMy40XSAgKi9cclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQvKiAgaGFuZGxlIG90aGVyIHZhbHVlcyAgKi9cclxuXHRcdFx0cHJvbWlzZS5mdWxmaWxsKHgpOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8qICBbUHJvbWlzZXMvQSsgMi4zLjQsIDIuMy4zLjRdICAqL1xyXG5cdFx0fTtcclxuXHJcblx0XHQvKiAgZXhwb3J0IEFQSSAgKi9cclxuXHRcdHJldHVybiBhcGk7XHJcblx0fSkoKSxcclxuXHJcblx0Ly9qc2NzOmVuYWJsZVxyXG5cclxuXHQvLyBFdmVudFxyXG5cdC8vIEEgY29udHJ1Y3RvciBzdXBlcmNsYXNzIGZvciBhZGRpbmcgZXZlbnQgbWVudGhvZHMsIG9uLCBvZmYsIGVtaXQuXHJcblx0RXZlbnQ6IGZ1bmN0aW9uKCkge1xyXG5cclxuXHRcdHZhciBzZXBhcmF0b3IgPSAvW1xcc1xcLF0rLztcclxuXHJcblx0XHQvLyBJZiB0aGlzIGRvZXNuJ3Qgc3VwcG9ydCBnZXRQcm90b3R5cGUgdGhlbiB3ZSBjYW4ndCBnZXQgcHJvdG90eXBlLmV2ZW50cyBvZiB0aGUgcGFyZW50XHJcblx0XHQvLyBTbyBsZXRzIGdldCB0aGUgY3VycmVudCBpbnN0YW5jZSBldmVudHMsIGFuZCBhZGQgdGhvc2UgdG8gYSBwYXJlbnQgcHJvcGVydHlcclxuXHRcdHRoaXMucGFyZW50ID0ge1xyXG5cdFx0XHRldmVudHM6IHRoaXMuZXZlbnRzLFxyXG5cdFx0XHRmaW5kRXZlbnRzOiB0aGlzLmZpbmRFdmVudHMsXHJcblx0XHRcdHBhcmVudDogdGhpcy5wYXJlbnQsXHJcblx0XHRcdHV0aWxzOiB0aGlzLnV0aWxzXHJcblx0XHR9O1xyXG5cclxuXHRcdHRoaXMuZXZlbnRzID0ge307XHJcblxyXG5cdFx0Ly8gT24sIHN1YnNjcmliZSB0byBldmVudHNcclxuXHRcdC8vIEBwYXJhbSBldnQgICBzdHJpbmdcclxuXHRcdC8vIEBwYXJhbSBjYWxsYmFjayAgZnVuY3Rpb25cclxuXHRcdHRoaXMub24gPSBmdW5jdGlvbihldnQsIGNhbGxiYWNrKSB7XHJcblxyXG5cdFx0XHRpZiAoY2FsbGJhY2sgJiYgdHlwZW9mIChjYWxsYmFjaykgPT09ICdmdW5jdGlvbicpIHtcclxuXHRcdFx0XHR2YXIgYSA9IGV2dC5zcGxpdChzZXBhcmF0b3IpO1xyXG5cdFx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgYS5sZW5ndGg7IGkrKykge1xyXG5cclxuXHRcdFx0XHRcdC8vIEhhcyB0aGlzIGV2ZW50IGFscmVhZHkgYmVlbiBmaXJlZCBvbiB0aGlzIGluc3RhbmNlP1xyXG5cdFx0XHRcdFx0dGhpcy5ldmVudHNbYVtpXV0gPSBbY2FsbGJhY2tdLmNvbmNhdCh0aGlzLmV2ZW50c1thW2ldXSB8fCBbXSk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRyZXR1cm4gdGhpcztcclxuXHRcdH07XHJcblxyXG5cdFx0Ly8gT2ZmLCB1bnN1YnNjcmliZSB0byBldmVudHNcclxuXHRcdC8vIEBwYXJhbSBldnQgICBzdHJpbmdcclxuXHRcdC8vIEBwYXJhbSBjYWxsYmFjayAgZnVuY3Rpb25cclxuXHRcdHRoaXMub2ZmID0gZnVuY3Rpb24oZXZ0LCBjYWxsYmFjaykge1xyXG5cclxuXHRcdFx0dGhpcy5maW5kRXZlbnRzKGV2dCwgZnVuY3Rpb24obmFtZSwgaW5kZXgpIHtcclxuXHRcdFx0XHRpZiAoIWNhbGxiYWNrIHx8IHRoaXMuZXZlbnRzW25hbWVdW2luZGV4XSA9PT0gY2FsbGJhY2spIHtcclxuXHRcdFx0XHRcdHRoaXMuZXZlbnRzW25hbWVdW2luZGV4XSA9IG51bGw7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRcdHJldHVybiB0aGlzO1xyXG5cdFx0fTtcclxuXHJcblx0XHQvLyBFbWl0XHJcblx0XHQvLyBUcmlnZ2VycyBhbnkgc3Vic2NyaWJlZCBldmVudHNcclxuXHRcdHRoaXMuZW1pdCA9IGZ1bmN0aW9uKGV2dCAvKiwgZGF0YSwgLi4uICovKSB7XHJcblxyXG5cdFx0XHQvLyBHZXQgYXJndW1lbnRzIGFzIGFuIEFycmF5LCBrbm9jayBvZmYgdGhlIGZpcnN0IG9uZVxyXG5cdFx0XHR2YXIgYXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMSk7XHJcblx0XHRcdGFyZ3MucHVzaChldnQpO1xyXG5cclxuXHRcdFx0Ly8gSGFuZGxlclxyXG5cdFx0XHR2YXIgaGFuZGxlciA9IGZ1bmN0aW9uKG5hbWUsIGluZGV4KSB7XHJcblxyXG5cdFx0XHRcdC8vIFJlcGxhY2UgdGhlIGxhc3QgcHJvcGVydHkgd2l0aCB0aGUgZXZlbnQgbmFtZVxyXG5cdFx0XHRcdGFyZ3NbYXJncy5sZW5ndGggLSAxXSA9IChuYW1lID09PSAnKicgPyBldnQgOiBuYW1lKTtcclxuXHJcblx0XHRcdFx0Ly8gVHJpZ2dlclxyXG5cdFx0XHRcdHRoaXMuZXZlbnRzW25hbWVdW2luZGV4XS5hcHBseSh0aGlzLCBhcmdzKTtcclxuXHRcdFx0fTtcclxuXHJcblx0XHRcdC8vIEZpbmQgdGhlIGNhbGxiYWNrcyB3aGljaCBtYXRjaCB0aGUgY29uZGl0aW9uIGFuZCBjYWxsXHJcblx0XHRcdHZhciBfdGhpcyA9IHRoaXM7XHJcblx0XHRcdHdoaWxlIChfdGhpcyAmJiBfdGhpcy5maW5kRXZlbnRzKSB7XHJcblxyXG5cdFx0XHRcdC8vIEZpbmQgZXZlbnRzIHdoaWNoIG1hdGNoXHJcblx0XHRcdFx0X3RoaXMuZmluZEV2ZW50cyhldnQgKyAnLConLCBoYW5kbGVyKTtcclxuXHRcdFx0XHRfdGhpcyA9IF90aGlzLnBhcmVudDtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0cmV0dXJuIHRoaXM7XHJcblx0XHR9O1xyXG5cclxuXHRcdC8vXHJcblx0XHQvLyBFYXN5IGZ1bmN0aW9uc1xyXG5cdFx0dGhpcy5lbWl0QWZ0ZXIgPSBmdW5jdGlvbigpIHtcclxuXHRcdFx0dmFyIF90aGlzID0gdGhpcztcclxuXHRcdFx0dmFyIGFyZ3MgPSBhcmd1bWVudHM7XHJcblx0XHRcdHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0X3RoaXMuZW1pdC5hcHBseShfdGhpcywgYXJncyk7XHJcblx0XHRcdH0sIDApO1xyXG5cclxuXHRcdFx0cmV0dXJuIHRoaXM7XHJcblx0XHR9O1xyXG5cclxuXHRcdHRoaXMuZmluZEV2ZW50cyA9IGZ1bmN0aW9uKGV2dCwgY2FsbGJhY2spIHtcclxuXHJcblx0XHRcdHZhciBhID0gZXZ0LnNwbGl0KHNlcGFyYXRvcik7XHJcblxyXG5cdFx0XHRmb3IgKHZhciBuYW1lIGluIHRoaXMuZXZlbnRzKSB7aWYgKHRoaXMuZXZlbnRzLmhhc093blByb3BlcnR5KG5hbWUpKSB7XHJcblxyXG5cdFx0XHRcdGlmIChhLmluZGV4T2YobmFtZSkgPiAtMSkge1xyXG5cclxuXHRcdFx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5ldmVudHNbbmFtZV0ubGVuZ3RoOyBpKyspIHtcclxuXHJcblx0XHRcdFx0XHRcdC8vIERvZXMgdGhlIGV2ZW50IGhhbmRsZXIgZXhpc3Q/XHJcblx0XHRcdFx0XHRcdGlmICh0aGlzLmV2ZW50c1tuYW1lXVtpXSkge1xyXG5cdFx0XHRcdFx0XHRcdC8vIEVtaXQgb24gdGhlIGxvY2FsIGluc3RhbmNlIG9mIHRoaXNcclxuXHRcdFx0XHRcdFx0XHRjYWxsYmFjay5jYWxsKHRoaXMsIG5hbWUsIGkpO1xyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9fVxyXG5cdFx0fTtcclxuXHJcblx0XHRyZXR1cm4gdGhpcztcclxuXHR9LFxyXG5cclxuXHQvLyBHbG9iYWwgRXZlbnRzXHJcblx0Ly8gQXR0YWNoIHRoZSBjYWxsYmFjayB0byB0aGUgd2luZG93IG9iamVjdFxyXG5cdC8vIFJldHVybiBpdHMgdW5pcXVlIHJlZmVyZW5jZVxyXG5cdGdsb2JhbEV2ZW50OiBmdW5jdGlvbihjYWxsYmFjaywgZ3VpZCkge1xyXG5cdFx0Ly8gSWYgdGhlIGd1aWQgaGFzIG5vdCBiZWVuIHN1cHBsaWVkIHRoZW4gY3JlYXRlIGEgbmV3IG9uZS5cclxuXHRcdGd1aWQgPSBndWlkIHx8ICdfaGVsbG9qc18nICsgcGFyc2VJbnQoTWF0aC5yYW5kb20oKSAqIDFlMTIsIDEwKS50b1N0cmluZygzNik7XHJcblxyXG5cdFx0Ly8gRGVmaW5lIHRoZSBjYWxsYmFjayBmdW5jdGlvblxyXG5cdFx0d2luZG93W2d1aWRdID0gZnVuY3Rpb24oKSB7XHJcblx0XHRcdC8vIFRyaWdnZXIgdGhlIGNhbGxiYWNrXHJcblx0XHRcdHRyeSB7XHJcblx0XHRcdFx0aWYgKGNhbGxiYWNrLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykpIHtcclxuXHRcdFx0XHRcdGRlbGV0ZSB3aW5kb3dbZ3VpZF07XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHRcdGNhdGNoIChlKSB7XHJcblx0XHRcdFx0Y29uc29sZS5lcnJvcihlKTtcclxuXHRcdFx0fVxyXG5cdFx0fTtcclxuXHJcblx0XHRyZXR1cm4gZ3VpZDtcclxuXHR9LFxyXG5cclxuXHQvLyBUcmlnZ2VyIGEgY2xpZW50c2lkZSBwb3B1cFxyXG5cdC8vIFRoaXMgaGFzIGJlZW4gYXVnbWVudGVkIHRvIHN1cHBvcnQgUGhvbmVHYXBcclxuXHRwb3B1cDogZnVuY3Rpb24odXJsLCByZWRpcmVjdFVyaSwgb3B0aW9ucykge1xyXG5cclxuXHRcdHZhciBkb2N1bWVudEVsZW1lbnQgPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQ7XHJcblxyXG5cdFx0Ly8gTXVsdGkgU2NyZWVuIFBvcHVwIFBvc2l0aW9uaW5nIChodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vYS8xNjg2MTA1MClcclxuXHRcdC8vIENyZWRpdDogaHR0cDovL3d3dy54dGYuZGsvMjAxMS8wOC9jZW50ZXItbmV3LXBvcHVwLXdpbmRvdy1ldmVuLW9uLmh0bWxcclxuXHRcdC8vIEZpeGVzIGR1YWwtc2NyZWVuIHBvc2l0aW9uICAgICAgICAgICAgICAgICAgICAgICAgIE1vc3QgYnJvd3NlcnMgICAgICBGaXJlZm94XHJcblxyXG5cdFx0aWYgKG9wdGlvbnMuaGVpZ2h0KSB7XHJcblx0XHRcdHZhciBkdWFsU2NyZWVuVG9wID0gd2luZG93LnNjcmVlblRvcCAhPT0gdW5kZWZpbmVkID8gd2luZG93LnNjcmVlblRvcCA6IHNjcmVlbi50b3A7XHJcblx0XHRcdHZhciBoZWlnaHQgPSBzY3JlZW4uaGVpZ2h0IHx8IHdpbmRvdy5pbm5lckhlaWdodCB8fCBkb2N1bWVudEVsZW1lbnQuY2xpZW50SGVpZ2h0O1xyXG5cdFx0XHRvcHRpb25zLnRvcCA9IHBhcnNlSW50KChoZWlnaHQgLSBvcHRpb25zLmhlaWdodCkgLyAyLCAxMCkgKyBkdWFsU2NyZWVuVG9wO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmIChvcHRpb25zLndpZHRoKSB7XHJcblx0XHRcdHZhciBkdWFsU2NyZWVuTGVmdCA9IHdpbmRvdy5zY3JlZW5MZWZ0ICE9PSB1bmRlZmluZWQgPyB3aW5kb3cuc2NyZWVuTGVmdCA6IHNjcmVlbi5sZWZ0O1xyXG5cdFx0XHR2YXIgd2lkdGggPSBzY3JlZW4ud2lkdGggfHwgd2luZG93LmlubmVyV2lkdGggfHwgZG9jdW1lbnRFbGVtZW50LmNsaWVudFdpZHRoO1xyXG5cdFx0XHRvcHRpb25zLmxlZnQgPSBwYXJzZUludCgod2lkdGggLSBvcHRpb25zLndpZHRoKSAvIDIsIDEwKSArIGR1YWxTY3JlZW5MZWZ0O1xyXG5cdFx0fVxyXG5cclxuXHRcdC8vIENvbnZlcnQgb3B0aW9ucyBpbnRvIGFuIGFycmF5XHJcblx0XHR2YXIgb3B0aW9uc0FycmF5ID0gW107XHJcblx0XHRPYmplY3Qua2V5cyhvcHRpb25zKS5mb3JFYWNoKGZ1bmN0aW9uKG5hbWUpIHtcclxuXHRcdFx0dmFyIHZhbHVlID0gb3B0aW9uc1tuYW1lXTtcclxuXHRcdFx0b3B0aW9uc0FycmF5LnB1c2gobmFtZSArICh2YWx1ZSAhPT0gbnVsbCA/ICc9JyArIHZhbHVlIDogJycpKTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdC8vIENhbGwgdGhlIG9wZW4oKSBmdW5jdGlvbiB3aXRoIHRoZSBpbml0aWFsIHBhdGhcclxuXHRcdC8vXHJcblx0XHQvLyBPQXV0aCByZWRpcmVjdCwgZml4ZXMgVVJJIGZyYWdtZW50cyBmcm9tIGJlaW5nIGxvc3QgaW4gU2FmYXJpXHJcblx0XHQvLyAoVVJJIEZyYWdtZW50cyB3aXRoaW4gMzAyIExvY2F0aW9uIFVSSSBhcmUgbG9zdCBvdmVyIEhUVFBTKVxyXG5cdFx0Ly8gTG9hZGluZyB0aGUgcmVkaXJlY3QuaHRtbCBiZWZvcmUgdHJpZ2dlcmluZyB0aGUgT0F1dGggRmxvdyBzZWVtcyB0byBmaXggaXQuXHJcblx0XHQvL1xyXG5cdFx0Ly8gRmlyZWZveCAgZGVjb2RlcyBVUkwgZnJhZ21lbnRzIHdoZW4gY2FsbGluZyBsb2NhdGlvbi5oYXNoLlxyXG5cdFx0Ly8gIC0gVGhpcyBpcyBiYWQgaWYgdGhlIHZhbHVlIGNvbnRhaW5zIGJyZWFrIHBvaW50cyB3aGljaCBhcmUgZXNjYXBlZFxyXG5cdFx0Ly8gIC0gSGVuY2UgdGhlIHVybCBtdXN0IGJlIGVuY29kZWQgdHdpY2UgYXMgaXQgY29udGFpbnMgYnJlYWtwb2ludHMuXHJcblx0XHRpZiAobmF2aWdhdG9yLnVzZXJBZ2VudC5pbmRleE9mKCdTYWZhcmknKSAhPT0gLTEgJiYgbmF2aWdhdG9yLnVzZXJBZ2VudC5pbmRleE9mKCdDaHJvbWUnKSA9PT0gLTEpIHtcclxuXHRcdFx0dXJsID0gcmVkaXJlY3RVcmkgKyAnI29hdXRoX3JlZGlyZWN0PScgKyBlbmNvZGVVUklDb21wb25lbnQoZW5jb2RlVVJJQ29tcG9uZW50KHVybCkpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHZhciBwb3B1cCA9IHdpbmRvdy5vcGVuKFxyXG5cdFx0XHR1cmwsXHJcblx0XHRcdCdfYmxhbmsnLFxyXG5cdFx0XHRvcHRpb25zQXJyYXkuam9pbignLCcpXHJcblx0XHQpO1xyXG5cclxuXHRcdGlmIChwb3B1cCAmJiBwb3B1cC5mb2N1cykge1xyXG5cdFx0XHRwb3B1cC5mb2N1cygpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBwb3B1cDtcclxuXHR9LFxyXG5cclxuXHQvLyBPQXV0aCBhbmQgQVBJIHJlc3BvbnNlIGhhbmRsZXJcclxuXHRyZXNwb25zZUhhbmRsZXI6IGZ1bmN0aW9uKHdpbmRvdywgcGFyZW50KSB7XHJcblxyXG5cdFx0dmFyIF90aGlzID0gdGhpcztcclxuXHRcdHZhciBwO1xyXG5cdFx0dmFyIGxvY2F0aW9uID0gd2luZG93LmxvY2F0aW9uO1xyXG5cclxuXHRcdC8vIElzIHRoaXMgYW4gYXV0aCByZWxheSBtZXNzYWdlIHdoaWNoIG5lZWRzIHRvIGNhbGwgdGhlIHByb3h5P1xyXG5cdFx0cCA9IF90aGlzLnBhcmFtKGxvY2F0aW9uLnNlYXJjaCk7XHJcblxyXG5cdFx0Ly8gT0F1dGgyIG9yIE9BdXRoMSBzZXJ2ZXIgcmVzcG9uc2U/XHJcblx0XHRpZiAocCAmJiBwLnN0YXRlICYmIChwLmNvZGUgfHwgcC5vYXV0aF90b2tlbikpIHtcclxuXHJcblx0XHRcdHZhciBzdGF0ZSA9IEpTT04ucGFyc2UocC5zdGF0ZSk7XHJcblxyXG5cdFx0XHQvLyBBZGQgdGhpcyBwYXRoIGFzIHRoZSByZWRpcmVjdF91cmlcclxuXHRcdFx0cC5yZWRpcmVjdF91cmkgPSBzdGF0ZS5yZWRpcmVjdF91cmkgfHwgbG9jYXRpb24uaHJlZi5yZXBsYWNlKC9bXFw/XFwjXS4qJC8sICcnKTtcclxuXHJcblx0XHRcdC8vIFJlZGlyZWN0IHRvIHRoZSBob3N0XHJcblx0XHRcdHZhciBwYXRoID0gc3RhdGUub2F1dGhfcHJveHkgKyAnPycgKyBfdGhpcy5wYXJhbShwKTtcclxuXHJcblx0XHRcdGxvY2F0aW9uLmFzc2lnbihwYXRoKTtcclxuXHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHJcblx0XHQvLyBTYXZlIHNlc3Npb24sIGZyb20gcmVkaXJlY3RlZCBhdXRoZW50aWNhdGlvblxyXG5cdFx0Ly8gI2FjY2Vzc190b2tlbiBoYXMgY29tZSBpbj9cclxuXHRcdC8vXHJcblx0XHQvLyBGQUNFQk9PSyBpcyByZXR1cm5pbmcgYXV0aCBlcnJvcnMgd2l0aGluIGFzIGEgcXVlcnlfc3RyaW5nLi4uIHRoYXRzIGEgc3RpY2tsZXIgZm9yIGNvbnNpc3RlbmN5LlxyXG5cdFx0Ly8gU291bmRDbG91ZCBpcyB0aGUgc3RhdGUgaW4gdGhlIHF1ZXJ5c3RyaW5nIGFuZCB0aGUgdG9rZW4gaW4gdGhlIGhhc2h0YWcsIHNvIHdlJ2xsIG1peCB0aGUgdHdvIHRvZ2V0aGVyXHJcblxyXG5cdFx0cCA9IF90aGlzLm1lcmdlKF90aGlzLnBhcmFtKGxvY2F0aW9uLnNlYXJjaCB8fCAnJyksIF90aGlzLnBhcmFtKGxvY2F0aW9uLmhhc2ggfHwgJycpKTtcclxuXHJcblx0XHQvLyBJZiBwLnN0YXRlXHJcblx0XHRpZiAocCAmJiAnc3RhdGUnIGluIHApIHtcclxuXHJcblx0XHRcdC8vIFJlbW92ZSBhbnkgYWRkaXRpb24gaW5mb3JtYXRpb25cclxuXHRcdFx0Ly8gRS5nLiBwLnN0YXRlID0gJ2ZhY2Vib29rLnBhZ2UnO1xyXG5cdFx0XHR0cnkge1xyXG5cdFx0XHRcdHZhciBhID0gSlNPTi5wYXJzZShwLnN0YXRlKTtcclxuXHRcdFx0XHRfdGhpcy5leHRlbmQocCwgYSk7XHJcblx0XHRcdH1cclxuXHRcdFx0Y2F0Y2ggKGUpIHtcclxuXHRcdFx0XHRjb25zb2xlLmVycm9yKCdDb3VsZCBub3QgZGVjb2RlIHN0YXRlIHBhcmFtZXRlcicpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQvLyBBY2Nlc3NfdG9rZW4/XHJcblx0XHRcdGlmICgoJ2FjY2Vzc190b2tlbicgaW4gcCAmJiBwLmFjY2Vzc190b2tlbikgJiYgcC5uZXR3b3JrKSB7XHJcblxyXG5cdFx0XHRcdGlmICghcC5leHBpcmVzX2luIHx8IHBhcnNlSW50KHAuZXhwaXJlc19pbiwgMTApID09PSAwKSB7XHJcblx0XHRcdFx0XHQvLyBJZiBwLmV4cGlyZXNfaW4gaXMgdW5zZXQsIHNldCB0byAwXHJcblx0XHRcdFx0XHRwLmV4cGlyZXNfaW4gPSAwO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0cC5leHBpcmVzX2luID0gcGFyc2VJbnQocC5leHBpcmVzX2luLCAxMCk7XHJcblx0XHRcdFx0cC5leHBpcmVzID0gKChuZXcgRGF0ZSgpKS5nZXRUaW1lKCkgLyAxZTMpICsgKHAuZXhwaXJlc19pbiB8fCAoNjAgKiA2MCAqIDI0ICogMzY1KSk7XHJcblxyXG5cdFx0XHRcdC8vIExldHMgdXNlIHRoZSBcInN0YXRlXCIgdG8gYXNzaWduIGl0IHRvIG9uZSBvZiBvdXIgbmV0d29ya3NcclxuXHRcdFx0XHRhdXRoQ2FsbGJhY2socCwgd2luZG93LCBwYXJlbnQpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQvLyBFcnJvcj0/XHJcblx0XHRcdC8vICZlcnJvcl9kZXNjcmlwdGlvbj0/XHJcblx0XHRcdC8vICZzdGF0ZT0/XHJcblx0XHRcdGVsc2UgaWYgKCgnZXJyb3InIGluIHAgJiYgcC5lcnJvcikgJiYgcC5uZXR3b3JrKSB7XHJcblxyXG5cdFx0XHRcdHAuZXJyb3IgPSB7XHJcblx0XHRcdFx0XHRjb2RlOiBwLmVycm9yLFxyXG5cdFx0XHRcdFx0bWVzc2FnZTogcC5lcnJvcl9tZXNzYWdlIHx8IHAuZXJyb3JfZGVzY3JpcHRpb25cclxuXHRcdFx0XHR9O1xyXG5cclxuXHRcdFx0XHQvLyBMZXQgdGhlIHN0YXRlIGhhbmRsZXIgaGFuZGxlIGl0XHJcblx0XHRcdFx0YXV0aENhbGxiYWNrKHAsIHdpbmRvdywgcGFyZW50KTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0Ly8gQVBJIGNhbGwsIG9yIGEgY2FuY2VsbGVkIGxvZ2luXHJcblx0XHRcdC8vIFJlc3VsdCBpcyBzZXJpYWxpemVkIEpTT04gc3RyaW5nXHJcblx0XHRcdGVsc2UgaWYgKHAuY2FsbGJhY2sgJiYgcC5jYWxsYmFjayBpbiBwYXJlbnQpIHtcclxuXHJcblx0XHRcdFx0Ly8gVHJpZ2dlciBhIGZ1bmN0aW9uIGluIHRoZSBwYXJlbnRcclxuXHRcdFx0XHR2YXIgcmVzID0gJ3Jlc3VsdCcgaW4gcCAmJiBwLnJlc3VsdCA/IEpTT04ucGFyc2UocC5yZXN1bHQpIDogZmFsc2U7XHJcblxyXG5cdFx0XHRcdC8vIFRyaWdnZXIgdGhlIGNhbGxiYWNrIG9uIHRoZSBwYXJlbnRcclxuXHRcdFx0XHRjYWxsYmFjayhwYXJlbnQsIHAuY2FsbGJhY2spKHJlcyk7XHJcblx0XHRcdFx0Y2xvc2VXaW5kb3coKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0Ly8gSWYgdGhpcyBwYWdlIGlzIHN0aWxsIG9wZW5cclxuXHRcdFx0aWYgKHAucGFnZV91cmkpIHtcclxuXHRcdFx0XHRsb2NhdGlvbi5hc3NpZ24ocC5wYWdlX3VyaSk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHQvLyBPQXV0aCByZWRpcmVjdCwgZml4ZXMgVVJJIGZyYWdtZW50cyBmcm9tIGJlaW5nIGxvc3QgaW4gU2FmYXJpXHJcblx0XHQvLyAoVVJJIEZyYWdtZW50cyB3aXRoaW4gMzAyIExvY2F0aW9uIFVSSSBhcmUgbG9zdCBvdmVyIEhUVFBTKVxyXG5cdFx0Ly8gTG9hZGluZyB0aGUgcmVkaXJlY3QuaHRtbCBiZWZvcmUgdHJpZ2dlcmluZyB0aGUgT0F1dGggRmxvdyBzZWVtcyB0byBmaXggaXQuXHJcblx0XHRlbHNlIGlmICgnb2F1dGhfcmVkaXJlY3QnIGluIHApIHtcclxuXHJcblx0XHRcdGxvY2F0aW9uLmFzc2lnbihkZWNvZGVVUklDb21wb25lbnQocC5vYXV0aF9yZWRpcmVjdCkpO1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gVHJpZ2dlciBhIGNhbGxiYWNrIHRvIGF1dGhlbnRpY2F0ZVxyXG5cdFx0ZnVuY3Rpb24gYXV0aENhbGxiYWNrKG9iaiwgd2luZG93LCBwYXJlbnQpIHtcclxuXHJcblx0XHRcdHZhciBjYiA9IG9iai5jYWxsYmFjaztcclxuXHRcdFx0dmFyIG5ldHdvcmsgPSBvYmoubmV0d29yaztcclxuXHJcblx0XHRcdC8vIFRyaWdnZXIgdGhlIGNhbGxiYWNrIG9uIHRoZSBwYXJlbnRcclxuXHRcdFx0X3RoaXMuc3RvcmUobmV0d29yaywgb2JqKTtcclxuXHJcblx0XHRcdC8vIElmIHRoaXMgaXMgYSBwYWdlIHJlcXVlc3QgaXQgaGFzIG5vIHBhcmVudCBvciBvcGVuZXIgd2luZG93IHRvIGhhbmRsZSBjYWxsYmFja3NcclxuXHRcdFx0aWYgKCgnZGlzcGxheScgaW4gb2JqKSAmJiBvYmouZGlzcGxheSA9PT0gJ3BhZ2UnKSB7XHJcblx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQvLyBSZW1vdmUgZnJvbSBzZXNzaW9uIG9iamVjdFxyXG5cdFx0XHRpZiAocGFyZW50ICYmIGNiICYmIGNiIGluIHBhcmVudCkge1xyXG5cclxuXHRcdFx0XHR0cnkge1xyXG5cdFx0XHRcdFx0ZGVsZXRlIG9iai5jYWxsYmFjaztcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0Y2F0Y2ggKGUpIHt9XHJcblxyXG5cdFx0XHRcdC8vIFVwZGF0ZSBzdG9yZVxyXG5cdFx0XHRcdF90aGlzLnN0b3JlKG5ldHdvcmssIG9iaik7XHJcblxyXG5cdFx0XHRcdC8vIENhbGwgdGhlIGdsb2JhbEV2ZW50IGZ1bmN0aW9uIG9uIHRoZSBwYXJlbnRcclxuXHRcdFx0XHQvLyBJdCdzIHNhZmVyIHRvIHBhc3MgYmFjayBhIHN0cmluZyB0byB0aGUgcGFyZW50LFxyXG5cdFx0XHRcdC8vIFJhdGhlciB0aGFuIGFuIG9iamVjdC9hcnJheSAoYmV0dGVyIGZvciBJRTgpXHJcblx0XHRcdFx0dmFyIHN0ciA9IEpTT04uc3RyaW5naWZ5KG9iaik7XHJcblxyXG5cdFx0XHRcdHRyeSB7XHJcblx0XHRcdFx0XHRjYWxsYmFjayhwYXJlbnQsIGNiKShzdHIpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRjYXRjaCAoZSkge1xyXG5cdFx0XHRcdFx0Ly8gRXJyb3IgdGhyb3duIHdoaWxzdCBleGVjdXRpbmcgcGFyZW50IGNhbGxiYWNrXHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRjbG9zZVdpbmRvdygpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGZ1bmN0aW9uIGNhbGxiYWNrKHBhcmVudCwgY2FsbGJhY2tJRCkge1xyXG5cdFx0XHRpZiAoY2FsbGJhY2tJRC5pbmRleE9mKCdfaGVsbG9qc18nKSAhPT0gMCkge1xyXG5cdFx0XHRcdHJldHVybiBmdW5jdGlvbigpIHtcclxuXHRcdFx0XHRcdHRocm93ICdDb3VsZCBub3QgZXhlY3V0ZSBjYWxsYmFjayAnICsgY2FsbGJhY2tJRDtcclxuXHRcdFx0XHR9O1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRyZXR1cm4gcGFyZW50W2NhbGxiYWNrSURdO1xyXG5cdFx0fVxyXG5cclxuXHRcdGZ1bmN0aW9uIGNsb3NlV2luZG93KCkge1xyXG5cclxuXHRcdFx0aWYgKHdpbmRvdy5mcmFtZUVsZW1lbnQpIHtcclxuXHRcdFx0XHQvLyBJbnNpZGUgYW4gaWZyYW1lLCByZW1vdmUgZnJvbSBwYXJlbnRcclxuXHRcdFx0XHRwYXJlbnQuZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZCh3aW5kb3cuZnJhbWVFbGVtZW50KTtcclxuXHRcdFx0fVxyXG5cdFx0XHRlbHNlIHtcclxuXHRcdFx0XHQvLyBDbG9zZSB0aGlzIGN1cnJlbnQgd2luZG93XHJcblx0XHRcdFx0dHJ5IHtcclxuXHRcdFx0XHRcdHdpbmRvdy5jbG9zZSgpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRjYXRjaCAoZSkge31cclxuXHJcblx0XHRcdFx0Ly8gSU9TIGJ1ZyB3b250IGxldCB1cyBjbG9zZSBhIHBvcHVwIGlmIHN0aWxsIGxvYWRpbmdcclxuXHRcdFx0XHRpZiAod2luZG93LmFkZEV2ZW50TGlzdGVuZXIpIHtcclxuXHRcdFx0XHRcdHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0XHRcdHdpbmRvdy5jbG9zZSgpO1xyXG5cdFx0XHRcdFx0fSk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblxyXG5cdFx0fVxyXG5cdH1cclxufSk7XHJcblxyXG4vLyBFdmVudHNcclxuLy8gRXh0ZW5kIHRoZSBoZWxsbyBvYmplY3Qgd2l0aCBpdHMgb3duIGV2ZW50IGluc3RhbmNlXHJcbmhlbGxvLnV0aWxzLkV2ZW50LmNhbGwoaGVsbG8pO1xyXG5cclxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuLy8gTW9uaXRvcmluZyBzZXNzaW9uIHN0YXRlXHJcbi8vIENoZWNrIGZvciBzZXNzaW9uIGNoYW5nZXNcclxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuXHJcbihmdW5jdGlvbihoZWxsbykge1xyXG5cclxuXHQvLyBNb25pdG9yIGZvciBhIGNoYW5nZSBpbiBzdGF0ZSBhbmQgZmlyZVxyXG5cdHZhciBvbGRTZXNzaW9ucyA9IHt9O1xyXG5cclxuXHQvLyBIYXNoIG9mIGV4cGlyZWQgdG9rZW5zXHJcblx0dmFyIGV4cGlyZWQgPSB7fTtcclxuXHJcblx0Ly8gTGlzdGVuIHRvIG90aGVyIHRyaWdnZXJzIHRvIEF1dGggZXZlbnRzLCB1c2UgdGhlc2UgdG8gdXBkYXRlIHRoaXNcclxuXHRoZWxsby5vbignYXV0aC5sb2dpbiwgYXV0aC5sb2dvdXQnLCBmdW5jdGlvbihhdXRoKSB7XHJcblx0XHRpZiAoYXV0aCAmJiB0eXBlb2YgKGF1dGgpID09PSAnb2JqZWN0JyAmJiBhdXRoLm5ldHdvcmspIHtcclxuXHRcdFx0b2xkU2Vzc2lvbnNbYXV0aC5uZXR3b3JrXSA9IGhlbGxvLnV0aWxzLnN0b3JlKGF1dGgubmV0d29yaykgfHwge307XHJcblx0XHR9XHJcblx0fSk7XHJcblxyXG5cdChmdW5jdGlvbiBzZWxmKCkge1xyXG5cclxuXHRcdHZhciBDVVJSRU5UX1RJTUUgPSAoKG5ldyBEYXRlKCkpLmdldFRpbWUoKSAvIDFlMyk7XHJcblx0XHR2YXIgZW1pdCA9IGZ1bmN0aW9uKGV2ZW50TmFtZSkge1xyXG5cdFx0XHRoZWxsby5lbWl0KCdhdXRoLicgKyBldmVudE5hbWUsIHtcclxuXHRcdFx0XHRuZXR3b3JrOiBuYW1lLFxyXG5cdFx0XHRcdGF1dGhSZXNwb25zZTogc2Vzc2lvblxyXG5cdFx0XHR9KTtcclxuXHRcdH07XHJcblxyXG5cdFx0Ly8gTG9vcCB0aHJvdWdoIHRoZSBzZXJ2aWNlc1xyXG5cdFx0Zm9yICh2YXIgbmFtZSBpbiBoZWxsby5zZXJ2aWNlcykge2lmIChoZWxsby5zZXJ2aWNlcy5oYXNPd25Qcm9wZXJ0eShuYW1lKSkge1xyXG5cclxuXHRcdFx0aWYgKCFoZWxsby5zZXJ2aWNlc1tuYW1lXS5pZCkge1xyXG5cdFx0XHRcdC8vIFdlIGhhdmVuJ3QgYXR0YWNoZWQgYW4gSUQgc28gZG9udCBsaXN0ZW4uXHJcblx0XHRcdFx0Y29udGludWU7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdC8vIEdldCBzZXNzaW9uXHJcblx0XHRcdHZhciBzZXNzaW9uID0gaGVsbG8udXRpbHMuc3RvcmUobmFtZSkgfHwge307XHJcblx0XHRcdHZhciBwcm92aWRlciA9IGhlbGxvLnNlcnZpY2VzW25hbWVdO1xyXG5cdFx0XHR2YXIgb2xkU2VzcyA9IG9sZFNlc3Npb25zW25hbWVdIHx8IHt9O1xyXG5cclxuXHRcdFx0Ly8gTGlzdGVuIGZvciBnbG9iYWxFdmVudHMgdGhhdCBkaWQgbm90IGdldCB0cmlnZ2VyZWQgZnJvbSB0aGUgY2hpbGRcclxuXHRcdFx0aWYgKHNlc3Npb24gJiYgJ2NhbGxiYWNrJyBpbiBzZXNzaW9uKSB7XHJcblxyXG5cdFx0XHRcdC8vIFRvIGRvIHJlbW92ZSBmcm9tIHNlc3Npb24gb2JqZWN0Li4uXHJcblx0XHRcdFx0dmFyIGNiID0gc2Vzc2lvbi5jYWxsYmFjaztcclxuXHRcdFx0XHR0cnkge1xyXG5cdFx0XHRcdFx0ZGVsZXRlIHNlc3Npb24uY2FsbGJhY2s7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdGNhdGNoIChlKSB7fVxyXG5cclxuXHRcdFx0XHQvLyBVcGRhdGUgc3RvcmVcclxuXHRcdFx0XHQvLyBSZW1vdmluZyB0aGUgY2FsbGJhY2tcclxuXHRcdFx0XHRoZWxsby51dGlscy5zdG9yZShuYW1lLCBzZXNzaW9uKTtcclxuXHJcblx0XHRcdFx0Ly8gRW1pdCBnbG9iYWwgZXZlbnRzXHJcblx0XHRcdFx0dHJ5IHtcclxuXHRcdFx0XHRcdHdpbmRvd1tjYl0oc2Vzc2lvbik7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdGNhdGNoIChlKSB7fVxyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQvLyBSZWZyZXNoIHRva2VuXHJcblx0XHRcdGlmIChzZXNzaW9uICYmICgnZXhwaXJlcycgaW4gc2Vzc2lvbikgJiYgc2Vzc2lvbi5leHBpcmVzIDwgQ1VSUkVOVF9USU1FKSB7XHJcblxyXG5cdFx0XHRcdC8vIElmIGF1dG8gcmVmcmVzaCBpcyBwb3NzaWJsZVxyXG5cdFx0XHRcdC8vIEVpdGhlciB0aGUgYnJvd3NlciBzdXBwb3J0c1xyXG5cdFx0XHRcdHZhciByZWZyZXNoID0gcHJvdmlkZXIucmVmcmVzaCB8fCBzZXNzaW9uLnJlZnJlc2hfdG9rZW47XHJcblxyXG5cdFx0XHRcdC8vIEhhcyB0aGUgcmVmcmVzaCBiZWVuIHJ1biByZWNlbnRseT9cclxuXHRcdFx0XHRpZiAocmVmcmVzaCAmJiAoIShuYW1lIGluIGV4cGlyZWQpIHx8IGV4cGlyZWRbbmFtZV0gPCBDVVJSRU5UX1RJTUUpKSB7XHJcblx0XHRcdFx0XHQvLyBUcnkgdG8gcmVzaWduaW5cclxuXHRcdFx0XHRcdGhlbGxvLmVtaXQoJ25vdGljZScsIG5hbWUgKyAnIGhhcyBleHBpcmVkIHRyeWluZyB0byByZXNpZ25pbicpO1xyXG5cdFx0XHRcdFx0aGVsbG8ubG9naW4obmFtZSwge2Rpc3BsYXk6ICdub25lJywgZm9yY2U6IGZhbHNlfSk7XHJcblxyXG5cdFx0XHRcdFx0Ly8gVXBkYXRlIGV4cGlyZWQsIGV2ZXJ5IDEwIG1pbnV0ZXNcclxuXHRcdFx0XHRcdGV4cGlyZWRbbmFtZV0gPSBDVVJSRU5UX1RJTUUgKyA2MDA7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHQvLyBEb2VzIHRoaXMgcHJvdmlkZXIgbm90IHN1cHBvcnQgcmVmcmVzaFxyXG5cdFx0XHRcdGVsc2UgaWYgKCFyZWZyZXNoICYmICEobmFtZSBpbiBleHBpcmVkKSkge1xyXG5cdFx0XHRcdFx0Ly8gTGFiZWwgdGhlIGV2ZW50XHJcblx0XHRcdFx0XHRlbWl0KCdleHBpcmVkJyk7XHJcblx0XHRcdFx0XHRleHBpcmVkW25hbWVdID0gdHJ1ZTtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdC8vIElmIHNlc3Npb24gaGFzIGV4cGlyZWQgdGhlbiB3ZSBkb250IHdhbnQgdG8gc3RvcmUgaXRzIHZhbHVlIHVudGlsIGl0IGNhbiBiZSBlc3RhYmxpc2hlZCB0aGF0IGl0cyBiZWVuIHVwZGF0ZWRcclxuXHRcdFx0XHRjb250aW51ZTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0Ly8gSGFzIHNlc3Npb24gY2hhbmdlZD9cclxuXHRcdFx0ZWxzZSBpZiAob2xkU2Vzcy5hY2Nlc3NfdG9rZW4gPT09IHNlc3Npb24uYWNjZXNzX3Rva2VuICYmXHJcblx0XHRcdG9sZFNlc3MuZXhwaXJlcyA9PT0gc2Vzc2lvbi5leHBpcmVzKSB7XHJcblx0XHRcdFx0Y29udGludWU7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdC8vIEFjY2Vzc190b2tlbiBoYXMgYmVlbiByZW1vdmVkXHJcblx0XHRcdGVsc2UgaWYgKCFzZXNzaW9uLmFjY2Vzc190b2tlbiAmJiBvbGRTZXNzLmFjY2Vzc190b2tlbikge1xyXG5cdFx0XHRcdGVtaXQoJ2xvZ291dCcpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQvLyBBY2Nlc3NfdG9rZW4gaGFzIGJlZW4gY3JlYXRlZFxyXG5cdFx0XHRlbHNlIGlmIChzZXNzaW9uLmFjY2Vzc190b2tlbiAmJiAhb2xkU2Vzcy5hY2Nlc3NfdG9rZW4pIHtcclxuXHRcdFx0XHRlbWl0KCdsb2dpbicpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQvLyBBY2Nlc3NfdG9rZW4gaGFzIGJlZW4gdXBkYXRlZFxyXG5cdFx0XHRlbHNlIGlmIChzZXNzaW9uLmV4cGlyZXMgIT09IG9sZFNlc3MuZXhwaXJlcykge1xyXG5cdFx0XHRcdGVtaXQoJ3VwZGF0ZScpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQvLyBVcGRhdGVkIHN0b3JlZCBzZXNzaW9uXHJcblx0XHRcdG9sZFNlc3Npb25zW25hbWVdID0gc2Vzc2lvbjtcclxuXHJcblx0XHRcdC8vIFJlbW92ZSB0aGUgZXhwaXJlZCBmbGFnc1xyXG5cdFx0XHRpZiAobmFtZSBpbiBleHBpcmVkKSB7XHJcblx0XHRcdFx0ZGVsZXRlIGV4cGlyZWRbbmFtZV07XHJcblx0XHRcdH1cclxuXHRcdH19XHJcblxyXG5cdFx0Ly8gQ2hlY2sgZXJyb3IgZXZlbnRzXHJcblx0XHRzZXRUaW1lb3V0KHNlbGYsIDEwMDApO1xyXG5cdH0pKCk7XHJcblxyXG59KShoZWxsbyk7XHJcblxyXG4vLyBFT0YgQ09SRSBsaWJcclxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG5cclxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuLy8gQVBJXHJcbi8vIEBwYXJhbSBwYXRoICAgIHN0cmluZ1xyXG4vLyBAcGFyYW0gcXVlcnkgICBvYmplY3QgKG9wdGlvbmFsKVxyXG4vLyBAcGFyYW0gbWV0aG9kICBzdHJpbmcgKG9wdGlvbmFsKVxyXG4vLyBAcGFyYW0gZGF0YSAgICBvYmplY3QgKG9wdGlvbmFsKVxyXG4vLyBAcGFyYW0gdGltZW91dCBpbnRlZ2VyIChvcHRpb25hbClcclxuLy8gQHBhcmFtIGNhbGxiYWNrICBmdW5jdGlvbiAob3B0aW9uYWwpXHJcblxyXG5oZWxsby5hcGkgPSBmdW5jdGlvbigpIHtcclxuXHJcblx0Ly8gU2hvcnRoYW5kXHJcblx0dmFyIF90aGlzID0gdGhpcztcclxuXHR2YXIgdXRpbHMgPSBfdGhpcy51dGlscztcclxuXHR2YXIgZXJyb3IgPSB1dGlscy5lcnJvcjtcclxuXHJcblx0Ly8gQ29uc3RydWN0IGEgbmV3IFByb21pc2Ugb2JqZWN0XHJcblx0dmFyIHByb21pc2UgPSB1dGlscy5Qcm9taXNlKCk7XHJcblxyXG5cdC8vIEFyZ3VtZW50c1xyXG5cdHZhciBwID0gdXRpbHMuYXJncyh7cGF0aDogJ3MhJywgcXVlcnk6ICdvJywgbWV0aG9kOiAncycsIGRhdGE6ICdvJywgdGltZW91dDogJ2knLCBjYWxsYmFjazogJ2YnfSwgYXJndW1lbnRzKTtcclxuXHJcblx0Ly8gTWV0aG9kXHJcblx0cC5tZXRob2QgPSAocC5tZXRob2QgfHwgJ2dldCcpLnRvTG93ZXJDYXNlKCk7XHJcblxyXG5cdC8vIEhlYWRlcnNcclxuXHRwLmhlYWRlcnMgPSBwLmhlYWRlcnMgfHwge307XHJcblxyXG5cdC8vIFF1ZXJ5XHJcblx0cC5xdWVyeSA9IHAucXVlcnkgfHwge307XHJcblxyXG5cdC8vIElmIGdldCwgcHV0IGFsbCBwYXJhbWV0ZXJzIGludG8gcXVlcnlcclxuXHRpZiAocC5tZXRob2QgPT09ICdnZXQnIHx8IHAubWV0aG9kID09PSAnZGVsZXRlJykge1xyXG5cdFx0dXRpbHMuZXh0ZW5kKHAucXVlcnksIHAuZGF0YSk7XHJcblx0XHRwLmRhdGEgPSB7fTtcclxuXHR9XHJcblxyXG5cdHZhciBkYXRhID0gcC5kYXRhID0gcC5kYXRhIHx8IHt9O1xyXG5cclxuXHQvLyBDb21wbGV0ZWQgZXZlbnQgY2FsbGJhY2tcclxuXHRwcm9taXNlLnRoZW4ocC5jYWxsYmFjaywgcC5jYWxsYmFjayk7XHJcblxyXG5cdC8vIFJlbW92ZSB0aGUgbmV0d29yayBmcm9tIHBhdGgsIGUuZy4gZmFjZWJvb2s6L21lL2ZyaWVuZHNcclxuXHQvLyBSZXN1bHRzIGluIHsgbmV0d29yayA6IGZhY2Vib29rLCBwYXRoIDogbWUvZnJpZW5kcyB9XHJcblx0aWYgKCFwLnBhdGgpIHtcclxuXHRcdHJldHVybiBwcm9taXNlLnJlamVjdChlcnJvcignaW52YWxpZF9wYXRoJywgJ01pc3NpbmcgdGhlIHBhdGggcGFyYW1ldGVyIGZyb20gdGhlIHJlcXVlc3QnKSk7XHJcblx0fVxyXG5cclxuXHRwLnBhdGggPSBwLnBhdGgucmVwbGFjZSgvXlxcLysvLCAnJyk7XHJcblx0dmFyIGEgPSAocC5wYXRoLnNwbGl0KC9bXFwvXFw6XS8sIDIpIHx8IFtdKVswXS50b0xvd2VyQ2FzZSgpO1xyXG5cclxuXHRpZiAoYSBpbiBfdGhpcy5zZXJ2aWNlcykge1xyXG5cdFx0cC5uZXR3b3JrID0gYTtcclxuXHRcdHZhciByZWcgPSBuZXcgUmVnRXhwKCdeJyArIGEgKyAnOj9cXC8/Jyk7XHJcblx0XHRwLnBhdGggPSBwLnBhdGgucmVwbGFjZShyZWcsICcnKTtcclxuXHR9XHJcblxyXG5cdC8vIE5ldHdvcmsgJiBQcm92aWRlclxyXG5cdC8vIERlZmluZSB0aGUgbmV0d29yayB0aGF0IHRoaXMgcmVxdWVzdCBpcyBtYWRlIGZvclxyXG5cdHAubmV0d29yayA9IF90aGlzLnNldHRpbmdzLmRlZmF1bHRfc2VydmljZSA9IHAubmV0d29yayB8fCBfdGhpcy5zZXR0aW5ncy5kZWZhdWx0X3NlcnZpY2U7XHJcblx0dmFyIG8gPSBfdGhpcy5zZXJ2aWNlc1twLm5ldHdvcmtdO1xyXG5cclxuXHQvLyBJTlZBTElEXHJcblx0Ly8gSXMgdGhlcmUgbm8gc2VydmljZSBieSB0aGUgZ2l2ZW4gbmV0d29yayBuYW1lP1xyXG5cdGlmICghbykge1xyXG5cdFx0cmV0dXJuIHByb21pc2UucmVqZWN0KGVycm9yKCdpbnZhbGlkX25ldHdvcmsnLCAnQ291bGQgbm90IG1hdGNoIHRoZSBzZXJ2aWNlIHJlcXVlc3RlZDogJyArIHAubmV0d29yaykpO1xyXG5cdH1cclxuXHJcblx0Ly8gUEFUSFxyXG5cdC8vIEFzIGxvbmcgYXMgdGhlIHBhdGggaXNuJ3QgZmxhZ2dlZCBhcyB1bmF2YWlhYmxlLCBlLmcuIHBhdGggPT0gZmFsc2VcclxuXHJcblx0aWYgKCEoIShwLm1ldGhvZCBpbiBvKSB8fCAhKHAucGF0aCBpbiBvW3AubWV0aG9kXSkgfHwgb1twLm1ldGhvZF1bcC5wYXRoXSAhPT0gZmFsc2UpKSB7XHJcblx0XHRyZXR1cm4gcHJvbWlzZS5yZWplY3QoZXJyb3IoJ2ludmFsaWRfcGF0aCcsICdUaGUgcHJvdmlkZWQgcGF0aCBpcyBub3QgYXZhaWxhYmxlIG9uIHRoZSBzZWxlY3RlZCBuZXR3b3JrJykpO1xyXG5cdH1cclxuXHJcblx0Ly8gUFJPWFlcclxuXHQvLyBPQXV0aDEgY2FsbHMgYWx3YXlzIG5lZWQgYSBwcm94eVxyXG5cclxuXHRpZiAoIXAub2F1dGhfcHJveHkpIHtcclxuXHRcdHAub2F1dGhfcHJveHkgPSBfdGhpcy5zZXR0aW5ncy5vYXV0aF9wcm94eTtcclxuXHR9XHJcblxyXG5cdGlmICghKCdwcm94eScgaW4gcCkpIHtcclxuXHRcdHAucHJveHkgPSBwLm9hdXRoX3Byb3h5ICYmIG8ub2F1dGggJiYgcGFyc2VJbnQoby5vYXV0aC52ZXJzaW9uLCAxMCkgPT09IDE7XHJcblx0fVxyXG5cclxuXHQvLyBUSU1FT1VUXHJcblx0Ly8gQWRvcHQgdGltZW91dCBmcm9tIGdsb2JhbCBzZXR0aW5ncyBieSBkZWZhdWx0XHJcblxyXG5cdGlmICghKCd0aW1lb3V0JyBpbiBwKSkge1xyXG5cdFx0cC50aW1lb3V0ID0gX3RoaXMuc2V0dGluZ3MudGltZW91dDtcclxuXHR9XHJcblxyXG5cdC8vIEZvcm1hdCByZXNwb25zZVxyXG5cdC8vIFdoZXRoZXIgdG8gcnVuIHRoZSByYXcgcmVzcG9uc2UgdGhyb3VnaCBwb3N0IHByb2Nlc3NpbmcuXHJcblx0aWYgKCEoJ2Zvcm1hdFJlc3BvbnNlJyBpbiBwKSkge1xyXG5cdFx0cC5mb3JtYXRSZXNwb25zZSA9IHRydWU7XHJcblx0fVxyXG5cclxuXHQvLyBHZXQgdGhlIGN1cnJlbnQgc2Vzc2lvblxyXG5cdC8vIEFwcGVuZCB0aGUgYWNjZXNzX3Rva2VuIHRvIHRoZSBxdWVyeVxyXG5cdHAuYXV0aFJlc3BvbnNlID0gX3RoaXMuZ2V0QXV0aFJlc3BvbnNlKHAubmV0d29yayk7XHJcblx0aWYgKHAuYXV0aFJlc3BvbnNlICYmIHAuYXV0aFJlc3BvbnNlLmFjY2Vzc190b2tlbikge1xyXG5cdFx0cC5xdWVyeS5hY2Nlc3NfdG9rZW4gPSBwLmF1dGhSZXNwb25zZS5hY2Nlc3NfdG9rZW47XHJcblx0fVxyXG5cclxuXHR2YXIgdXJsID0gcC5wYXRoO1xyXG5cdHZhciBtO1xyXG5cclxuXHQvLyBTdG9yZSB0aGUgcXVlcnkgYXMgb3B0aW9uc1xyXG5cdC8vIFRoaXMgaXMgdXNlZCB0byBwb3B1bGF0ZSB0aGUgcmVxdWVzdCBvYmplY3QgYmVmb3JlIHRoZSBkYXRhIGlzIGF1Z21lbnRlZCBieSB0aGUgcHJld3JhcCBoYW5kbGVycy5cclxuXHRwLm9wdGlvbnMgPSB1dGlscy5jbG9uZShwLnF1ZXJ5KTtcclxuXHJcblx0Ly8gQ2xvbmUgdGhlIGRhdGEgb2JqZWN0XHJcblx0Ly8gUHJldmVudCB0aGlzIHNjcmlwdCBvdmVyd3JpdGluZyB0aGUgZGF0YSBvZiB0aGUgaW5jb21pbmcgb2JqZWN0LlxyXG5cdC8vIEVuc3VyZSB0aGF0IGV2ZXJ5dGltZSB3ZSBydW4gYW4gaXRlcmF0aW9uIHRoZSBjYWxsYmFja3MgaGF2ZW4ndCByZW1vdmVkIHNvbWUgZGF0YVxyXG5cdHAuZGF0YSA9IHV0aWxzLmNsb25lKGRhdGEpO1xyXG5cclxuXHQvLyBVUkwgTWFwcGluZ1xyXG5cdC8vIElzIHRoZXJlIGEgbWFwIGZvciB0aGUgZ2l2ZW4gVVJMP1xyXG5cdHZhciBhY3Rpb25zID0gb1t7J2RlbGV0ZSc6ICdkZWwnfVtwLm1ldGhvZF0gfHwgcC5tZXRob2RdIHx8IHt9O1xyXG5cclxuXHQvLyBFeHRyYXBvbGF0ZSB0aGUgUXVlcnlTdHJpbmdcclxuXHQvLyBQcm92aWRlIGEgY2xlYW4gcGF0aFxyXG5cdC8vIE1vdmUgdGhlIHF1ZXJ5c3RyaW5nIGludG8gdGhlIGRhdGFcclxuXHRpZiAocC5tZXRob2QgPT09ICdnZXQnKSB7XHJcblxyXG5cdFx0dmFyIHF1ZXJ5ID0gdXJsLnNwbGl0KC9bXFw/I10vKVsxXTtcclxuXHRcdGlmIChxdWVyeSkge1xyXG5cdFx0XHR1dGlscy5leHRlbmQocC5xdWVyeSwgdXRpbHMucGFyYW0ocXVlcnkpKTtcclxuXHJcblx0XHRcdC8vIFJlbW92ZSB0aGUgcXVlcnkgcGFydCBmcm9tIHRoZSBVUkxcclxuXHRcdFx0dXJsID0gdXJsLnJlcGxhY2UoL1xcPy4qPygjfCQpLywgJyQxJyk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHQvLyBJcyB0aGUgaGFzaCBmcmFnbWVudCBkZWZpbmVkXHJcblx0aWYgKChtID0gdXJsLm1hdGNoKC8jKC4rKS8sICcnKSkpIHtcclxuXHRcdHVybCA9IHVybC5zcGxpdCgnIycpWzBdO1xyXG5cdFx0cC5wYXRoID0gbVsxXTtcclxuXHR9XHJcblx0ZWxzZSBpZiAodXJsIGluIGFjdGlvbnMpIHtcclxuXHRcdHAucGF0aCA9IHVybDtcclxuXHRcdHVybCA9IGFjdGlvbnNbdXJsXTtcclxuXHR9XHJcblx0ZWxzZSBpZiAoJ2RlZmF1bHQnIGluIGFjdGlvbnMpIHtcclxuXHRcdHVybCA9IGFjdGlvbnNbJ2RlZmF1bHQnXTtcclxuXHR9XHJcblxyXG5cdC8vIFJlZGlyZWN0IEhhbmRsZXJcclxuXHQvLyBUaGlzIGRlZmluZXMgZm9yIHRoZSBGb3JtK0lmcmFtZStIYXNoIGhhY2sgd2hlcmUgdG8gcmV0dXJuIHRoZSByZXN1bHRzIHRvby5cclxuXHRwLnJlZGlyZWN0X3VyaSA9IF90aGlzLnNldHRpbmdzLnJlZGlyZWN0X3VyaTtcclxuXHJcblx0Ly8gRGVmaW5lIEZvcm1hdEhhbmRsZXJcclxuXHQvLyBUaGUgcmVxdWVzdCBjYW4gYmUgcHJvY2VzZWQgaW4gYSBtdWx0aXR1ZGUgb2Ygd2F5c1xyXG5cdC8vIEhlcmUncyB0aGUgb3B0aW9ucyAtIGRlcGVuZGluZyBvbiB0aGUgYnJvd3NlciBhbmQgZW5kcG9pbnRcclxuXHRwLnhociA9IG8ueGhyO1xyXG5cdHAuanNvbnAgPSBvLmpzb25wO1xyXG5cdHAuZm9ybSA9IG8uZm9ybTtcclxuXHJcblx0Ly8gTWFrZSByZXF1ZXN0XHJcblx0aWYgKHR5cGVvZiAodXJsKSA9PT0gJ2Z1bmN0aW9uJykge1xyXG5cdFx0Ly8gRG9lcyBzZWxmIGhhdmUgaXRzIG93biBjYWxsYmFjaz9cclxuXHRcdHVybChwLCBnZXRQYXRoKTtcclxuXHR9XHJcblx0ZWxzZSB7XHJcblx0XHQvLyBFbHNlIHRoZSBVUkwgaXMgYSBzdHJpbmdcclxuXHRcdGdldFBhdGgodXJsKTtcclxuXHR9XHJcblxyXG5cdHJldHVybiBwcm9taXNlLnByb3h5O1xyXG5cclxuXHQvLyBJZiB1cmwgbmVlZHMgYSBiYXNlXHJcblx0Ly8gV3JhcCBldmVyeXRoaW5nIGluXHJcblx0ZnVuY3Rpb24gZ2V0UGF0aCh1cmwpIHtcclxuXHJcblx0XHQvLyBGb3JtYXQgdGhlIHN0cmluZyBpZiBpdCBuZWVkcyBpdFxyXG5cdFx0dXJsID0gdXJsLnJlcGxhY2UoL1xcQFxceyhbYS16XFxfXFwtXSspKFxcfC4qPyk/XFx9L2dpLCBmdW5jdGlvbihtLCBrZXksIGRlZmF1bHRzKSB7XHJcblx0XHRcdHZhciB2YWwgPSBkZWZhdWx0cyA/IGRlZmF1bHRzLnJlcGxhY2UoL15cXHwvLCAnJykgOiAnJztcclxuXHRcdFx0aWYgKGtleSBpbiBwLnF1ZXJ5KSB7XHJcblx0XHRcdFx0dmFsID0gcC5xdWVyeVtrZXldO1xyXG5cdFx0XHRcdGRlbGV0ZSBwLnF1ZXJ5W2tleV07XHJcblx0XHRcdH1cclxuXHRcdFx0ZWxzZSBpZiAocC5kYXRhICYmIGtleSBpbiBwLmRhdGEpIHtcclxuXHRcdFx0XHR2YWwgPSBwLmRhdGFba2V5XTtcclxuXHRcdFx0XHRkZWxldGUgcC5kYXRhW2tleV07XHJcblx0XHRcdH1cclxuXHRcdFx0ZWxzZSBpZiAoIWRlZmF1bHRzKSB7XHJcblx0XHRcdFx0cHJvbWlzZS5yZWplY3QoZXJyb3IoJ21pc3NpbmdfYXR0cmlidXRlJywgJ1RoZSBhdHRyaWJ1dGUgJyArIGtleSArICcgaXMgbWlzc2luZyBmcm9tIHRoZSByZXF1ZXN0JykpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRyZXR1cm4gdmFsO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0Ly8gQWRkIGJhc2VcclxuXHRcdGlmICghdXJsLm1hdGNoKC9eaHR0cHM/OlxcL1xcLy8pKSB7XHJcblx0XHRcdHVybCA9IG8uYmFzZSArIHVybDtcclxuXHRcdH1cclxuXHJcblx0XHQvLyBEZWZpbmUgdGhlIHJlcXVlc3QgVVJMXHJcblx0XHRwLnVybCA9IHVybDtcclxuXHJcblx0XHQvLyBNYWtlIHRoZSBIVFRQIHJlcXVlc3Qgd2l0aCB0aGUgY3VyYXRlZCByZXF1ZXN0IG9iamVjdFxyXG5cdFx0Ly8gQ0FMTEJBQ0sgSEFORExFUlxyXG5cdFx0Ly8gQCByZXNwb25zZSBvYmplY3RcclxuXHRcdC8vIEAgc3RhdHVzQ29kZSBpbnRlZ2VyIGlmIGF2YWlsYWJsZVxyXG5cdFx0dXRpbHMucmVxdWVzdChwLCBmdW5jdGlvbihyLCBoZWFkZXJzKSB7XHJcblxyXG5cdFx0XHQvLyBJcyB0aGlzIGEgcmF3IHJlc3BvbnNlP1xyXG5cdFx0XHRpZiAoIXAuZm9ybWF0UmVzcG9uc2UpIHtcclxuXHRcdFx0XHQvLyBCYWQgcmVxdWVzdD8gZXJyb3Igc3RhdHVzQ29kZSBvciBvdGhlcndpc2UgY29udGFpbnMgYW4gZXJyb3IgcmVzcG9uc2UgdmlzIEpTT05QP1xyXG5cdFx0XHRcdGlmICh0eXBlb2YgaGVhZGVycyA9PT0gJ29iamVjdCcgPyAoaGVhZGVycy5zdGF0dXNDb2RlID49IDQwMCkgOiAodHlwZW9mIHIgPT09ICdvYmplY3QnICYmICdlcnJvcicgaW4gcikpIHtcclxuXHRcdFx0XHRcdHByb21pc2UucmVqZWN0KHIpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRlbHNlIHtcclxuXHRcdFx0XHRcdHByb21pc2UuZnVsZmlsbChyKTtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdHJldHVybjtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0Ly8gU2hvdWxkIHRoaXMgYmUgYW4gb2JqZWN0XHJcblx0XHRcdGlmIChyID09PSB0cnVlKSB7XHJcblx0XHRcdFx0ciA9IHtzdWNjZXNzOnRydWV9O1xyXG5cdFx0XHR9XHJcblx0XHRcdGVsc2UgaWYgKCFyKSB7XHJcblx0XHRcdFx0ciA9IHt9O1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQvLyBUaGUgZGVsZXRlIGNhbGxiYWNrIG5lZWRzIGEgYmV0dGVyIHJlc3BvbnNlXHJcblx0XHRcdGlmIChwLm1ldGhvZCA9PT0gJ2RlbGV0ZScpIHtcclxuXHRcdFx0XHRyID0gKCFyIHx8IHV0aWxzLmlzRW1wdHkocikpID8ge3N1Y2Nlc3M6dHJ1ZX0gOiByO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQvLyBGT1JNQVQgUkVTUE9OU0U/XHJcblx0XHRcdC8vIERvZXMgc2VsZiByZXF1ZXN0IGhhdmUgYSBjb3JyZXNwb25kaW5nIGZvcm1hdHRlclxyXG5cdFx0XHRpZiAoby53cmFwICYmICgocC5wYXRoIGluIG8ud3JhcCkgfHwgKCdkZWZhdWx0JyBpbiBvLndyYXApKSkge1xyXG5cdFx0XHRcdHZhciB3cmFwID0gKHAucGF0aCBpbiBvLndyYXAgPyBwLnBhdGggOiAnZGVmYXVsdCcpO1xyXG5cdFx0XHRcdHZhciB0aW1lID0gKG5ldyBEYXRlKCkpLmdldFRpbWUoKTtcclxuXHJcblx0XHRcdFx0Ly8gRk9STUFUIFJFU1BPTlNFXHJcblx0XHRcdFx0dmFyIGIgPSBvLndyYXBbd3JhcF0ociwgaGVhZGVycywgcCk7XHJcblxyXG5cdFx0XHRcdC8vIEhhcyB0aGUgcmVzcG9uc2UgYmVlbiB1dHRlcmx5IG92ZXJ3cml0dGVuP1xyXG5cdFx0XHRcdC8vIFR5cGljYWxseSBzZWxmIGF1Z21lbnRzIHRoZSBleGlzdGluZyBvYmplY3QuLiBidXQgZm9yIHRob3NlIHJhcmUgb2NjYXNzaW9uc1xyXG5cdFx0XHRcdGlmIChiKSB7XHJcblx0XHRcdFx0XHRyID0gYjtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdC8vIElzIHRoZXJlIGEgbmV4dF9wYWdlIGRlZmluZWQgaW4gdGhlIHJlc3BvbnNlP1xyXG5cdFx0XHRpZiAociAmJiAncGFnaW5nJyBpbiByICYmIHIucGFnaW5nLm5leHQpIHtcclxuXHJcblx0XHRcdFx0Ly8gQWRkIHRoZSByZWxhdGl2ZSBwYXRoIGlmIGl0IGlzIG1pc3NpbmcgZnJvbSB0aGUgcGFnaW5nL25leHQgcGF0aFxyXG5cdFx0XHRcdGlmIChyLnBhZ2luZy5uZXh0WzBdID09PSAnPycpIHtcclxuXHRcdFx0XHRcdHIucGFnaW5nLm5leHQgPSBwLnBhdGggKyByLnBhZ2luZy5uZXh0O1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0Ly8gVGhlIHJlbGF0aXZlIHBhdGggaGFzIGJlZW4gZGVmaW5lZCwgbGV0cyBtYXJrdXAgdGhlIGhhbmRsZXIgaW4gdGhlIEhhc2hGcmFnbWVudFxyXG5cdFx0XHRcdGVsc2Uge1xyXG5cdFx0XHRcdFx0ci5wYWdpbmcubmV4dCArPSAnIycgKyBwLnBhdGg7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQvLyBEaXNwYXRjaCB0byBsaXN0ZW5lcnNcclxuXHRcdFx0Ly8gRW1pdCBldmVudHMgd2hpY2ggcGVydGFpbiB0byB0aGUgZm9ybWF0dGVkIHJlc3BvbnNlXHJcblx0XHRcdGlmICghciB8fCAnZXJyb3InIGluIHIpIHtcclxuXHRcdFx0XHRwcm9taXNlLnJlamVjdChyKTtcclxuXHRcdFx0fVxyXG5cdFx0XHRlbHNlIHtcclxuXHRcdFx0XHRwcm9taXNlLmZ1bGZpbGwocik7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cdH1cclxufTtcclxuXHJcbi8vIEFQSSB1dGlsaXRpZXNcclxuaGVsbG8udXRpbHMuZXh0ZW5kKGhlbGxvLnV0aWxzLCB7XHJcblxyXG5cdC8vIE1ha2UgYW4gSFRUUCByZXF1ZXN0XHJcblx0cmVxdWVzdDogZnVuY3Rpb24ocCwgY2FsbGJhY2spIHtcclxuXHJcblx0XHR2YXIgX3RoaXMgPSB0aGlzO1xyXG5cdFx0dmFyIGVycm9yID0gX3RoaXMuZXJyb3I7XHJcblxyXG5cdFx0Ly8gVGhpcyBoYXMgdG8gZ28gdGhyb3VnaCBhIFBPU1QgcmVxdWVzdFxyXG5cdFx0aWYgKCFfdGhpcy5pc0VtcHR5KHAuZGF0YSkgJiYgISgnRmlsZUxpc3QnIGluIHdpbmRvdykgJiYgX3RoaXMuaGFzQmluYXJ5KHAuZGF0YSkpIHtcclxuXHJcblx0XHRcdC8vIERpc2FibGUgWEhSIGFuZCBKU09OUFxyXG5cdFx0XHRwLnhociA9IGZhbHNlO1xyXG5cdFx0XHRwLmpzb25wID0gZmFsc2U7XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gQ2hlY2sgaWYgdGhlIGJyb3dzZXIgYW5kIHNlcnZpY2Ugc3VwcG9ydCBDT1JTXHJcblx0XHR2YXIgY29ycyA9IHRoaXMucmVxdWVzdF9jb3JzKGZ1bmN0aW9uKCkge1xyXG5cdFx0XHQvLyBJZiBpdCBkb2VzIHRoZW4gcnVuIHRoaXMuLi5cclxuXHRcdFx0cmV0dXJuICgocC54aHIgPT09IHVuZGVmaW5lZCkgfHwgKHAueGhyICYmICh0eXBlb2YgKHAueGhyKSAhPT0gJ2Z1bmN0aW9uJyB8fCBwLnhocihwLCBwLnF1ZXJ5KSkpKTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdGlmIChjb3JzKSB7XHJcblxyXG5cdFx0XHRmb3JtYXRVcmwocCwgZnVuY3Rpb24odXJsKSB7XHJcblxyXG5cdFx0XHRcdHZhciB4ID0gX3RoaXMueGhyKHAubWV0aG9kLCB1cmwsIHAuaGVhZGVycywgcC5kYXRhLCBjYWxsYmFjayk7XHJcblx0XHRcdFx0eC5vbnByb2dyZXNzID0gcC5vbnByb2dyZXNzIHx8IG51bGw7XHJcblxyXG5cdFx0XHRcdC8vIFdpbmRvd3MgUGhvbmUgZG9lcyBub3Qgc3VwcG9ydCB4aHIudXBsb2FkLCBzZWUgIzc0XHJcblx0XHRcdFx0Ly8gRmVhdHVyZSBkZXRlY3RcclxuXHRcdFx0XHRpZiAoeC51cGxvYWQgJiYgcC5vbnVwbG9hZHByb2dyZXNzKSB7XHJcblx0XHRcdFx0XHR4LnVwbG9hZC5vbnByb2dyZXNzID0gcC5vbnVwbG9hZHByb2dyZXNzO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cclxuXHRcdC8vIENsb25lIHRoZSBxdWVyeSBvYmplY3RcclxuXHRcdC8vIEVhY2ggcmVxdWVzdCBtb2RpZmllcyB0aGUgcXVlcnkgb2JqZWN0IGFuZCBuZWVkcyB0byBiZSB0YXJlZCBhZnRlciBlYWNoIG9uZS5cclxuXHRcdHZhciBfcXVlcnkgPSBwLnF1ZXJ5O1xyXG5cclxuXHRcdHAucXVlcnkgPSBfdGhpcy5jbG9uZShwLnF1ZXJ5KTtcclxuXHJcblx0XHQvLyBBc3NpZ24gYSBuZXcgY2FsbGJhY2tJRFxyXG5cdFx0cC5jYWxsYmFja0lEID0gX3RoaXMuZ2xvYmFsRXZlbnQoKTtcclxuXHJcblx0XHQvLyBKU09OUFxyXG5cdFx0aWYgKHAuanNvbnAgIT09IGZhbHNlKSB7XHJcblxyXG5cdFx0XHQvLyBDbG9uZSB0aGUgcXVlcnkgb2JqZWN0XHJcblx0XHRcdHAucXVlcnkuY2FsbGJhY2sgPSBwLmNhbGxiYWNrSUQ7XHJcblxyXG5cdFx0XHQvLyBJZiB0aGUgSlNPTlAgaXMgYSBmdW5jdGlvbiB0aGVuIHJ1biBpdFxyXG5cdFx0XHRpZiAodHlwZW9mIChwLmpzb25wKSA9PT0gJ2Z1bmN0aW9uJykge1xyXG5cdFx0XHRcdHAuanNvbnAocCwgcC5xdWVyeSk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdC8vIExldHMgdXNlIEpTT05QIGlmIHRoZSBtZXRob2QgaXMgJ2dldCdcclxuXHRcdFx0aWYgKHAubWV0aG9kID09PSAnZ2V0Jykge1xyXG5cclxuXHRcdFx0XHRmb3JtYXRVcmwocCwgZnVuY3Rpb24odXJsKSB7XHJcblx0XHRcdFx0XHRfdGhpcy5qc29ucCh1cmwsIGNhbGxiYWNrLCBwLmNhbGxiYWNrSUQsIHAudGltZW91dCk7XHJcblx0XHRcdFx0fSk7XHJcblxyXG5cdFx0XHRcdHJldHVybjtcclxuXHRcdFx0fVxyXG5cdFx0XHRlbHNlIHtcclxuXHRcdFx0XHQvLyBJdCdzIG5vdCBjb21wYXRpYmxlIHJlc2V0IHF1ZXJ5XHJcblx0XHRcdFx0cC5xdWVyeSA9IF9xdWVyeTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdH1cclxuXHJcblx0XHQvLyBPdGhlcndpc2Ugd2UncmUgb24gdG8gdGhlIG9sZCBzY2hvb2wsIGlmcmFtZSBoYWNrcyBhbmQgSlNPTlBcclxuXHRcdGlmIChwLmZvcm0gIT09IGZhbHNlKSB7XHJcblxyXG5cdFx0XHQvLyBBZGQgc29tZSBhZGRpdGlvbmFsIHF1ZXJ5IHBhcmFtZXRlcnMgdG8gdGhlIFVSTFxyXG5cdFx0XHQvLyBXZSdyZSBwcmV0dHkgc3R1ZmZlZCBpZiB0aGUgZW5kcG9pbnQgZG9lc24ndCBsaWtlIHRoZXNlXHJcblx0XHRcdHAucXVlcnkucmVkaXJlY3RfdXJpID0gcC5yZWRpcmVjdF91cmk7XHJcblx0XHRcdHAucXVlcnkuc3RhdGUgPSBKU09OLnN0cmluZ2lmeSh7Y2FsbGJhY2s6cC5jYWxsYmFja0lEfSk7XHJcblxyXG5cdFx0XHR2YXIgb3B0cztcclxuXHJcblx0XHRcdGlmICh0eXBlb2YgKHAuZm9ybSkgPT09ICdmdW5jdGlvbicpIHtcclxuXHJcblx0XHRcdFx0Ly8gRm9ybWF0IHRoZSByZXF1ZXN0XHJcblx0XHRcdFx0b3B0cyA9IHAuZm9ybShwLCBwLnF1ZXJ5KTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0aWYgKHAubWV0aG9kID09PSAncG9zdCcgJiYgb3B0cyAhPT0gZmFsc2UpIHtcclxuXHJcblx0XHRcdFx0Zm9ybWF0VXJsKHAsIGZ1bmN0aW9uKHVybCkge1xyXG5cdFx0XHRcdFx0X3RoaXMucG9zdCh1cmwsIHAuZGF0YSwgb3B0cywgY2FsbGJhY2ssIHAuY2FsbGJhY2tJRCwgcC50aW1lb3V0KTtcclxuXHRcdFx0XHR9KTtcclxuXHJcblx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gTm9uZSBvZiB0aGUgbWV0aG9kcyB3ZXJlIHN1Y2Nlc3NmdWwgdGhyb3cgYW4gZXJyb3JcclxuXHRcdGNhbGxiYWNrKGVycm9yKCdpbnZhbGlkX3JlcXVlc3QnLCAnVGhlcmUgd2FzIG5vIG1lY2hhbmlzbSBmb3IgaGFuZGxpbmcgdGhpcyByZXF1ZXN0JykpO1xyXG5cclxuXHRcdHJldHVybjtcclxuXHJcblx0XHQvLyBGb3JtYXQgVVJMXHJcblx0XHQvLyBDb25zdHJ1Y3RzIHRoZSByZXF1ZXN0IFVSTCwgb3B0aW9uYWxseSB3cmFwcyB0aGUgVVJMIHRocm91Z2ggYSBjYWxsIHRvIGEgcHJveHkgc2VydmVyXHJcblx0XHQvLyBSZXR1cm5zIHRoZSBmb3JtYXR0ZWQgVVJMXHJcblx0XHRmdW5jdGlvbiBmb3JtYXRVcmwocCwgY2FsbGJhY2spIHtcclxuXHJcblx0XHRcdC8vIEFyZSB3ZSBzaWduaW5nIHRoZSByZXF1ZXN0P1xyXG5cdFx0XHR2YXIgc2lnbjtcclxuXHJcblx0XHRcdC8vIE9BdXRoMVxyXG5cdFx0XHQvLyBSZW1vdmUgdGhlIHRva2VuIGZyb20gdGhlIHF1ZXJ5IGJlZm9yZSBzaWduaW5nXHJcblx0XHRcdGlmIChwLmF1dGhSZXNwb25zZSAmJiBwLmF1dGhSZXNwb25zZS5vYXV0aCAmJiBwYXJzZUludChwLmF1dGhSZXNwb25zZS5vYXV0aC52ZXJzaW9uLCAxMCkgPT09IDEpIHtcclxuXHJcblx0XHRcdFx0Ly8gT0FVVEggU0lHTklORyBQUk9YWVxyXG5cdFx0XHRcdHNpZ24gPSBwLnF1ZXJ5LmFjY2Vzc190b2tlbjtcclxuXHJcblx0XHRcdFx0Ly8gUmVtb3ZlIHRoZSBhY2Nlc3NfdG9rZW5cclxuXHRcdFx0XHRkZWxldGUgcC5xdWVyeS5hY2Nlc3NfdG9rZW47XHJcblxyXG5cdFx0XHRcdC8vIEVuZm9yZSB1c2Ugb2YgUHJveHlcclxuXHRcdFx0XHRwLnByb3h5ID0gdHJ1ZTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0Ly8gUE9TVCBib2R5IHRvIHF1ZXJ5c3RyaW5nXHJcblx0XHRcdGlmIChwLmRhdGEgJiYgKHAubWV0aG9kID09PSAnZ2V0JyB8fCBwLm1ldGhvZCA9PT0gJ2RlbGV0ZScpKSB7XHJcblx0XHRcdFx0Ly8gQXR0YWNoIHRoZSBwLmRhdGEgdG8gdGhlIHF1ZXJ5c3RyaW5nLlxyXG5cdFx0XHRcdF90aGlzLmV4dGVuZChwLnF1ZXJ5LCBwLmRhdGEpO1xyXG5cdFx0XHRcdHAuZGF0YSA9IG51bGw7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdC8vIENvbnN0cnVjdCB0aGUgcGF0aFxyXG5cdFx0XHR2YXIgcGF0aCA9IF90aGlzLnFzKHAudXJsLCBwLnF1ZXJ5KTtcclxuXHJcblx0XHRcdC8vIFByb3h5IHRoZSByZXF1ZXN0IHRocm91Z2ggYSBzZXJ2ZXJcclxuXHRcdFx0Ly8gVXNlZCBmb3Igc2lnbmluZyBPQXV0aDFcclxuXHRcdFx0Ly8gQW5kIGNpcmN1bXZlbnRpbmcgc2VydmljZXMgd2l0aG91dCBBY2Nlc3MtQ29udHJvbCBIZWFkZXJzXHJcblx0XHRcdGlmIChwLnByb3h5KSB7XHJcblx0XHRcdFx0Ly8gVXNlIHRoZSBwcm94eSBhcyBhIHBhdGhcclxuXHRcdFx0XHRwYXRoID0gX3RoaXMucXMocC5vYXV0aF9wcm94eSwge1xyXG5cdFx0XHRcdFx0cGF0aDogcGF0aCxcclxuXHRcdFx0XHRcdGFjY2Vzc190b2tlbjogc2lnbiB8fCAnJyxcclxuXHJcblx0XHRcdFx0XHQvLyBUaGlzIHdpbGwgcHJvbXB0IHRoZSByZXF1ZXN0IHRvIGJlIHNpZ25lZCBhcyB0aG91Z2ggaXQgaXMgT0F1dGgxXHJcblx0XHRcdFx0XHR0aGVuOiBwLnByb3h5X3Jlc3BvbnNlX3R5cGUgfHwgKHAubWV0aG9kLnRvTG93ZXJDYXNlKCkgPT09ICdnZXQnID8gJ3JlZGlyZWN0JyA6ICdwcm94eScpLFxyXG5cdFx0XHRcdFx0bWV0aG9kOiBwLm1ldGhvZC50b0xvd2VyQ2FzZSgpLFxyXG5cdFx0XHRcdFx0c3VwcHJlc3NfcmVzcG9uc2VfY29kZXM6IHRydWVcclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0Y2FsbGJhY2socGF0aCk7XHJcblx0XHR9XHJcblx0fSxcclxuXHJcblx0Ly8gVGVzdCB3aGV0aGVyIHRoZSBicm93c2VyIHN1cHBvcnRzIHRoZSBDT1JTIHJlc3BvbnNlXHJcblx0cmVxdWVzdF9jb3JzOiBmdW5jdGlvbihjYWxsYmFjaykge1xyXG5cdFx0cmV0dXJuICd3aXRoQ3JlZGVudGlhbHMnIGluIG5ldyBYTUxIdHRwUmVxdWVzdCgpICYmIGNhbGxiYWNrKCk7XHJcblx0fSxcclxuXHJcblx0Ly8gUmV0dXJuIHRoZSB0eXBlIG9mIERPTSBvYmplY3RcclxuXHRkb21JbnN0YW5jZTogZnVuY3Rpb24odHlwZSwgZGF0YSkge1xyXG5cdFx0dmFyIHRlc3QgPSAnSFRNTCcgKyAodHlwZSB8fCAnJykucmVwbGFjZShcclxuXHRcdFx0L15bYS16XS8sXHJcblx0XHRcdGZ1bmN0aW9uKG0pIHtcclxuXHRcdFx0XHRyZXR1cm4gbS50b1VwcGVyQ2FzZSgpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0KSArICdFbGVtZW50JztcclxuXHJcblx0XHRpZiAoIWRhdGEpIHtcclxuXHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmICh3aW5kb3dbdGVzdF0pIHtcclxuXHRcdFx0cmV0dXJuIGRhdGEgaW5zdGFuY2VvZiB3aW5kb3dbdGVzdF07XHJcblx0XHR9XHJcblx0XHRlbHNlIGlmICh3aW5kb3cuRWxlbWVudCkge1xyXG5cdFx0XHRyZXR1cm4gZGF0YSBpbnN0YW5jZW9mIHdpbmRvdy5FbGVtZW50ICYmICghdHlwZSB8fCAoZGF0YS50YWdOYW1lICYmIGRhdGEudGFnTmFtZS50b0xvd2VyQ2FzZSgpID09PSB0eXBlKSk7XHJcblx0XHR9XHJcblx0XHRlbHNlIHtcclxuXHRcdFx0cmV0dXJuICghKGRhdGEgaW5zdGFuY2VvZiBPYmplY3QgfHwgZGF0YSBpbnN0YW5jZW9mIEFycmF5IHx8IGRhdGEgaW5zdGFuY2VvZiBTdHJpbmcgfHwgZGF0YSBpbnN0YW5jZW9mIE51bWJlcikgJiYgZGF0YS50YWdOYW1lICYmIGRhdGEudGFnTmFtZS50b0xvd2VyQ2FzZSgpID09PSB0eXBlKTtcclxuXHRcdH1cclxuXHR9LFxyXG5cclxuXHQvLyBDcmVhdGUgYSBjbG9uZSBvZiBhbiBvYmplY3RcclxuXHRjbG9uZTogZnVuY3Rpb24ob2JqKSB7XHJcblx0XHQvLyBEb2VzIG5vdCBjbG9uZSBET00gZWxlbWVudHMsIG5vciBCaW5hcnkgZGF0YSwgZS5nLiBCbG9icywgRmlsZWxpc3RzXHJcblx0XHRpZiAob2JqID09PSBudWxsIHx8IHR5cGVvZiAob2JqKSAhPT0gJ29iamVjdCcgfHwgb2JqIGluc3RhbmNlb2YgRGF0ZSB8fCAnbm9kZU5hbWUnIGluIG9iaiB8fCB0aGlzLmlzQmluYXJ5KG9iaikgfHwgKHR5cGVvZiBGb3JtRGF0YSA9PT0gJ2Z1bmN0aW9uJyAmJiBvYmogaW5zdGFuY2VvZiBGb3JtRGF0YSkpIHtcclxuXHRcdFx0cmV0dXJuIG9iajtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAoQXJyYXkuaXNBcnJheShvYmopKSB7XHJcblx0XHRcdC8vIENsb25lIGVhY2ggaXRlbSBpbiB0aGUgYXJyYXlcclxuXHRcdFx0cmV0dXJuIG9iai5tYXAodGhpcy5jbG9uZS5iaW5kKHRoaXMpKTtcclxuXHRcdH1cclxuXHJcblx0XHQvLyBCdXQgZG9lcyBjbG9uZSBldmVyeXRoaW5nIGVsc2UuXHJcblx0XHR2YXIgY2xvbmUgPSB7fTtcclxuXHRcdGZvciAodmFyIHggaW4gb2JqKSB7XHJcblx0XHRcdGNsb25lW3hdID0gdGhpcy5jbG9uZShvYmpbeF0pO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBjbG9uZTtcclxuXHR9LFxyXG5cclxuXHQvLyBYSFI6IHVzZXMgQ09SUyB0byBtYWtlIHJlcXVlc3RzXHJcblx0eGhyOiBmdW5jdGlvbihtZXRob2QsIHVybCwgaGVhZGVycywgZGF0YSwgY2FsbGJhY2spIHtcclxuXHJcblx0XHR2YXIgciA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xyXG5cdFx0dmFyIGVycm9yID0gdGhpcy5lcnJvcjtcclxuXHJcblx0XHQvLyBCaW5hcnk/XHJcblx0XHR2YXIgYmluYXJ5ID0gZmFsc2U7XHJcblx0XHRpZiAobWV0aG9kID09PSAnYmxvYicpIHtcclxuXHRcdFx0YmluYXJ5ID0gbWV0aG9kO1xyXG5cdFx0XHRtZXRob2QgPSAnR0VUJztcclxuXHRcdH1cclxuXHJcblx0XHRtZXRob2QgPSBtZXRob2QudG9VcHBlckNhc2UoKTtcclxuXHJcblx0XHQvLyBYaHIucmVzcG9uc2VUeXBlICdqc29uJyBpcyBub3Qgc3VwcG9ydGVkIGluIGFueSBvZiB0aGUgdmVuZG9ycyB5ZXQuXHJcblx0XHRyLm9ubG9hZCA9IGZ1bmN0aW9uKGUpIHtcclxuXHRcdFx0dmFyIGpzb24gPSByLnJlc3BvbnNlO1xyXG5cdFx0XHR0cnkge1xyXG5cdFx0XHRcdGpzb24gPSBKU09OLnBhcnNlKHIucmVzcG9uc2VUZXh0KTtcclxuXHRcdFx0fVxyXG5cdFx0XHRjYXRjaCAoX2UpIHtcclxuXHRcdFx0XHRpZiAoci5zdGF0dXMgPT09IDQwMSkge1xyXG5cdFx0XHRcdFx0anNvbiA9IGVycm9yKCdhY2Nlc3NfZGVuaWVkJywgci5zdGF0dXNUZXh0KTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHZhciBoZWFkZXJzID0gaGVhZGVyc1RvSlNPTihyLmdldEFsbFJlc3BvbnNlSGVhZGVycygpKTtcclxuXHRcdFx0aGVhZGVycy5zdGF0dXNDb2RlID0gci5zdGF0dXM7XHJcblxyXG5cdFx0XHRjYWxsYmFjayhqc29uIHx8IChtZXRob2QgPT09ICdHRVQnID8gZXJyb3IoJ2VtcHR5X3Jlc3BvbnNlJywgJ0NvdWxkIG5vdCBnZXQgcmVzb3VyY2UnKSA6IHt9KSwgaGVhZGVycyk7XHJcblx0XHR9O1xyXG5cclxuXHRcdHIub25lcnJvciA9IGZ1bmN0aW9uKGUpIHtcclxuXHRcdFx0dmFyIGpzb24gPSByLnJlc3BvbnNlVGV4dDtcclxuXHRcdFx0dHJ5IHtcclxuXHRcdFx0XHRqc29uID0gSlNPTi5wYXJzZShyLnJlc3BvbnNlVGV4dCk7XHJcblx0XHRcdH1cclxuXHRcdFx0Y2F0Y2ggKF9lKSB7fVxyXG5cclxuXHRcdFx0Y2FsbGJhY2soanNvbiB8fCBlcnJvcignYWNjZXNzX2RlbmllZCcsICdDb3VsZCBub3QgZ2V0IHJlc291cmNlJykpO1xyXG5cdFx0fTtcclxuXHJcblx0XHR2YXIgeDtcclxuXHJcblx0XHQvLyBTaG91bGQgd2UgYWRkIHRoZSBxdWVyeSB0byB0aGUgVVJMP1xyXG5cdFx0aWYgKG1ldGhvZCA9PT0gJ0dFVCcgfHwgbWV0aG9kID09PSAnREVMRVRFJykge1xyXG5cdFx0XHRkYXRhID0gbnVsbDtcclxuXHRcdH1cclxuXHRcdGVsc2UgaWYgKGRhdGEgJiYgdHlwZW9mIChkYXRhKSAhPT0gJ3N0cmluZycgJiYgIShkYXRhIGluc3RhbmNlb2YgRm9ybURhdGEpICYmICEoZGF0YSBpbnN0YW5jZW9mIEZpbGUpICYmICEoZGF0YSBpbnN0YW5jZW9mIEJsb2IpKSB7XHJcblx0XHRcdC8vIExvb3AgdGhyb3VnaCBhbmQgYWRkIGZvcm1EYXRhXHJcblx0XHRcdHZhciBmID0gbmV3IEZvcm1EYXRhKCk7XHJcblx0XHRcdGZvciAoeCBpbiBkYXRhKSBpZiAoZGF0YS5oYXNPd25Qcm9wZXJ0eSh4KSkge1xyXG5cdFx0XHRcdGlmIChkYXRhW3hdIGluc3RhbmNlb2YgSFRNTElucHV0RWxlbWVudCkge1xyXG5cdFx0XHRcdFx0aWYgKCdmaWxlcycgaW4gZGF0YVt4XSAmJiBkYXRhW3hdLmZpbGVzLmxlbmd0aCA+IDApIHtcclxuXHRcdFx0XHRcdFx0Zi5hcHBlbmQoeCwgZGF0YVt4XS5maWxlc1swXSk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdGVsc2UgaWYgKGRhdGFbeF0gaW5zdGFuY2VvZiBCbG9iKSB7XHJcblx0XHRcdFx0XHRmLmFwcGVuZCh4LCBkYXRhW3hdLCBkYXRhLm5hbWUpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRlbHNlIHtcclxuXHRcdFx0XHRcdGYuYXBwZW5kKHgsIGRhdGFbeF0pO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0ZGF0YSA9IGY7XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gT3BlbiB0aGUgcGF0aCwgYXN5bmNcclxuXHRcdHIub3BlbihtZXRob2QsIHVybCwgdHJ1ZSk7XHJcblxyXG5cdFx0aWYgKGJpbmFyeSkge1xyXG5cdFx0XHRpZiAoJ3Jlc3BvbnNlVHlwZScgaW4gcikge1xyXG5cdFx0XHRcdHIucmVzcG9uc2VUeXBlID0gYmluYXJ5O1xyXG5cdFx0XHR9XHJcblx0XHRcdGVsc2Uge1xyXG5cdFx0XHRcdHIub3ZlcnJpZGVNaW1lVHlwZSgndGV4dC9wbGFpbjsgY2hhcnNldD14LXVzZXItZGVmaW5lZCcpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gU2V0IGFueSBiZXNwb2tlIGhlYWRlcnNcclxuXHRcdGlmIChoZWFkZXJzKSB7XHJcblx0XHRcdGZvciAoeCBpbiBoZWFkZXJzKSB7XHJcblx0XHRcdFx0ci5zZXRSZXF1ZXN0SGVhZGVyKHgsIGhlYWRlcnNbeF0pO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0ci5zZW5kKGRhdGEpO1xyXG5cclxuXHRcdHJldHVybiByO1xyXG5cclxuXHRcdC8vIEhlYWRlcnMgYXJlIHJldHVybmVkIGFzIGEgc3RyaW5nXHJcblx0XHRmdW5jdGlvbiBoZWFkZXJzVG9KU09OKHMpIHtcclxuXHRcdFx0dmFyIHIgPSB7fTtcclxuXHRcdFx0dmFyIHJlZyA9IC8oW2EtelxcLV0rKTpcXHM/KC4qKTs/L2dpO1xyXG5cdFx0XHR2YXIgbTtcclxuXHRcdFx0d2hpbGUgKChtID0gcmVnLmV4ZWMocykpKSB7XHJcblx0XHRcdFx0clttWzFdXSA9IG1bMl07XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHJldHVybiByO1xyXG5cdFx0fVxyXG5cdH0sXHJcblxyXG5cdC8vIEpTT05QXHJcblx0Ly8gSW5qZWN0cyBhIHNjcmlwdCB0YWcgaW50byB0aGUgRE9NIHRvIGJlIGV4ZWN1dGVkIGFuZCBhcHBlbmRzIGEgY2FsbGJhY2sgZnVuY3Rpb24gdG8gdGhlIHdpbmRvdyBvYmplY3RcclxuXHQvLyBAcGFyYW0gc3RyaW5nL2Z1bmN0aW9uIHBhdGhGdW5jIGVpdGhlciBhIHN0cmluZyBvZiB0aGUgVVJMIG9yIGEgY2FsbGJhY2sgZnVuY3Rpb24gcGF0aEZ1bmMocXVlcnlzdHJpbmdoYXNoLCBjb250aW51ZUZ1bmMpO1xyXG5cdC8vIEBwYXJhbSBmdW5jdGlvbiBjYWxsYmFjayBhIGZ1bmN0aW9uIHRvIGNhbGwgb24gY29tcGxldGlvbjtcclxuXHRqc29ucDogZnVuY3Rpb24odXJsLCBjYWxsYmFjaywgY2FsbGJhY2tJRCwgdGltZW91dCkge1xyXG5cclxuXHRcdHZhciBfdGhpcyA9IHRoaXM7XHJcblx0XHR2YXIgZXJyb3IgPSBfdGhpcy5lcnJvcjtcclxuXHJcblx0XHQvLyBDaGFuZ2UgdGhlIG5hbWUgb2YgdGhlIGNhbGxiYWNrXHJcblx0XHR2YXIgYm9vbCA9IDA7XHJcblx0XHR2YXIgaGVhZCA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdoZWFkJylbMF07XHJcblx0XHR2YXIgb3BlcmFGaXg7XHJcblx0XHR2YXIgcmVzdWx0ID0gZXJyb3IoJ3NlcnZlcl9lcnJvcicsICdzZXJ2ZXJfZXJyb3InKTtcclxuXHRcdHZhciBjYiA9IGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRpZiAoIShib29sKyspKSB7XHJcblx0XHRcdFx0d2luZG93LnNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0XHRjYWxsYmFjayhyZXN1bHQpO1xyXG5cdFx0XHRcdFx0aGVhZC5yZW1vdmVDaGlsZChzY3JpcHQpO1xyXG5cdFx0XHRcdH0sIDApO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0fTtcclxuXHJcblx0XHQvLyBBZGQgY2FsbGJhY2sgdG8gdGhlIHdpbmRvdyBvYmplY3RcclxuXHRcdGNhbGxiYWNrSUQgPSBfdGhpcy5nbG9iYWxFdmVudChmdW5jdGlvbihqc29uKSB7XHJcblx0XHRcdHJlc3VsdCA9IGpzb247XHJcblx0XHRcdHJldHVybiB0cnVlO1xyXG5cclxuXHRcdFx0Ly8gTWFyayBjYWxsYmFjayBhcyBkb25lXHJcblx0XHR9LCBjYWxsYmFja0lEKTtcclxuXHJcblx0XHQvLyBUaGUgVVJMIGlzIGEgZnVuY3Rpb24gZm9yIHNvbWUgY2FzZXMgYW5kIGFzIHN1Y2hcclxuXHRcdC8vIERldGVybWluZSBpdHMgdmFsdWUgd2l0aCBhIGNhbGxiYWNrIGNvbnRhaW5pbmcgdGhlIG5ldyBwYXJhbWV0ZXJzIG9mIHRoaXMgZnVuY3Rpb24uXHJcblx0XHR1cmwgPSB1cmwucmVwbGFjZShuZXcgUmVnRXhwKCc9XFxcXD8oJnwkKScpLCAnPScgKyBjYWxsYmFja0lEICsgJyQxJyk7XHJcblxyXG5cdFx0Ly8gQnVpbGQgc2NyaXB0IHRhZ1xyXG5cdFx0dmFyIHNjcmlwdCA9IF90aGlzLmFwcGVuZCgnc2NyaXB0Jywge1xyXG5cdFx0XHRpZDogY2FsbGJhY2tJRCxcclxuXHRcdFx0bmFtZTogY2FsbGJhY2tJRCxcclxuXHRcdFx0c3JjOiB1cmwsXHJcblx0XHRcdGFzeW5jOiB0cnVlLFxyXG5cdFx0XHRvbmxvYWQ6IGNiLFxyXG5cdFx0XHRvbmVycm9yOiBjYixcclxuXHRcdFx0b25yZWFkeXN0YXRlY2hhbmdlOiBmdW5jdGlvbigpIHtcclxuXHRcdFx0XHRpZiAoL2xvYWRlZHxjb21wbGV0ZS9pLnRlc3QodGhpcy5yZWFkeVN0YXRlKSkge1xyXG5cdFx0XHRcdFx0Y2IoKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cclxuXHRcdC8vIE9wZXJhIGZpeCBlcnJvclxyXG5cdFx0Ly8gUHJvYmxlbTogSWYgYW4gZXJyb3Igb2NjdXJzIHdpdGggc2NyaXB0IGxvYWRpbmcgT3BlcmEgZmFpbHMgdG8gdHJpZ2dlciB0aGUgc2NyaXB0Lm9uZXJyb3IgaGFuZGxlciB3ZSBzcGVjaWZpZWRcclxuXHRcdC8vXHJcblx0XHQvLyBGaXg6XHJcblx0XHQvLyBCeSBzZXR0aW5nIHRoZSByZXF1ZXN0IHRvIHN5bmNocm9ub3VzIHdlIGNhbiB0cmlnZ2VyIHRoZSBlcnJvciBoYW5kbGVyIHdoZW4gYWxsIGVsc2UgZmFpbHMuXHJcblx0XHQvLyBUaGlzIGFjdGlvbiB3aWxsIGJlIGlnbm9yZWQgaWYgd2UndmUgYWxyZWFkeSBjYWxsZWQgdGhlIGNhbGxiYWNrIGhhbmRsZXIgXCJjYlwiIHdpdGggYSBzdWNjZXNzZnVsIG9ubG9hZCBldmVudFxyXG5cdFx0aWYgKHdpbmRvdy5uYXZpZ2F0b3IudXNlckFnZW50LnRvTG93ZXJDYXNlKCkuaW5kZXhPZignb3BlcmEnKSA+IC0xKSB7XHJcblx0XHRcdG9wZXJhRml4ID0gX3RoaXMuYXBwZW5kKCdzY3JpcHQnLCB7XHJcblx0XHRcdFx0dGV4dDogJ2RvY3VtZW50LmdldEVsZW1lbnRCeUlkKFxcJycgKyBjYWxsYmFja0lEICsgJ1xcJykub25lcnJvcigpOydcclxuXHRcdFx0fSk7XHJcblx0XHRcdHNjcmlwdC5hc3luYyA9IGZhbHNlO1xyXG5cdFx0fVxyXG5cclxuXHRcdC8vIEFkZCB0aW1lb3V0XHJcblx0XHRpZiAodGltZW91dCkge1xyXG5cdFx0XHR3aW5kb3cuc2V0VGltZW91dChmdW5jdGlvbigpIHtcclxuXHRcdFx0XHRyZXN1bHQgPSBlcnJvcigndGltZW91dCcsICd0aW1lb3V0Jyk7XHJcblx0XHRcdFx0Y2IoKTtcclxuXHRcdFx0fSwgdGltZW91dCk7XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gVE9ETzogYWRkIGZpeCBmb3IgSUUsXHJcblx0XHQvLyBIb3dldmVyOiB1bmFibGUgcmVjcmVhdGUgdGhlIGJ1ZyBvZiBmaXJpbmcgb2ZmIHRoZSBvbnJlYWR5c3RhdGVjaGFuZ2UgYmVmb3JlIHRoZSBzY3JpcHQgY29udGVudCBoYXMgYmVlbiBleGVjdXRlZCBhbmQgdGhlIHZhbHVlIG9mIFwicmVzdWx0XCIgaGFzIGJlZW4gZGVmaW5lZC5cclxuXHRcdC8vIEluamVjdCBzY3JpcHQgdGFnIGludG8gdGhlIGhlYWQgZWxlbWVudFxyXG5cdFx0aGVhZC5hcHBlbmRDaGlsZChzY3JpcHQpO1xyXG5cclxuXHRcdC8vIEFwcGVuZCBPcGVyYSBGaXggdG8gcnVuIGFmdGVyIG91ciBzY3JpcHRcclxuXHRcdGlmIChvcGVyYUZpeCkge1xyXG5cdFx0XHRoZWFkLmFwcGVuZENoaWxkKG9wZXJhRml4KTtcclxuXHRcdH1cclxuXHR9LFxyXG5cclxuXHQvLyBQb3N0XHJcblx0Ly8gU2VuZCBpbmZvcm1hdGlvbiB0byBhIHJlbW90ZSBsb2NhdGlvbiB1c2luZyB0aGUgcG9zdCBtZWNoYW5pc21cclxuXHQvLyBAcGFyYW0gc3RyaW5nIHVyaSBwYXRoXHJcblx0Ly8gQHBhcmFtIG9iamVjdCBkYXRhLCBrZXkgdmFsdWUgZGF0YSB0byBzZW5kXHJcblx0Ly8gQHBhcmFtIGZ1bmN0aW9uIGNhbGxiYWNrLCBmdW5jdGlvbiB0byBleGVjdXRlIGluIHJlc3BvbnNlXHJcblx0cG9zdDogZnVuY3Rpb24odXJsLCBkYXRhLCBvcHRpb25zLCBjYWxsYmFjaywgY2FsbGJhY2tJRCwgdGltZW91dCkge1xyXG5cclxuXHRcdHZhciBfdGhpcyA9IHRoaXM7XHJcblx0XHR2YXIgZXJyb3IgPSBfdGhpcy5lcnJvcjtcclxuXHRcdHZhciBkb2MgPSBkb2N1bWVudDtcclxuXHJcblx0XHQvLyBUaGlzIGhhY2sgbmVlZHMgYSBmb3JtXHJcblx0XHR2YXIgZm9ybSA9IG51bGw7XHJcblx0XHR2YXIgcmVlbmFibGVBZnRlclN1Ym1pdCA9IFtdO1xyXG5cdFx0dmFyIG5ld2Zvcm07XHJcblx0XHR2YXIgaSA9IDA7XHJcblx0XHR2YXIgeCA9IG51bGw7XHJcblx0XHR2YXIgYm9vbCA9IDA7XHJcblx0XHR2YXIgY2IgPSBmdW5jdGlvbihyKSB7XHJcblx0XHRcdGlmICghKGJvb2wrKykpIHtcclxuXHRcdFx0XHRjYWxsYmFjayhyKTtcclxuXHRcdFx0fVxyXG5cdFx0fTtcclxuXHJcblx0XHQvLyBXaGF0IGlzIHRoZSBuYW1lIG9mIHRoZSBjYWxsYmFjayB0byBjb250YWluXHJcblx0XHQvLyBXZSdsbCBhbHNvIHVzZSB0aGlzIHRvIG5hbWUgdGhlIGlmcmFtZVxyXG5cdFx0X3RoaXMuZ2xvYmFsRXZlbnQoY2IsIGNhbGxiYWNrSUQpO1xyXG5cclxuXHRcdC8vIEJ1aWxkIHRoZSBpZnJhbWUgd2luZG93XHJcblx0XHR2YXIgd2luO1xyXG5cdFx0dHJ5IHtcclxuXHRcdFx0Ly8gSUU3IGhhY2ssIG9ubHkgbGV0cyB1cyBkZWZpbmUgdGhlIG5hbWUgaGVyZSwgbm90IGxhdGVyLlxyXG5cdFx0XHR3aW4gPSBkb2MuY3JlYXRlRWxlbWVudCgnPGlmcmFtZSBuYW1lPVwiJyArIGNhbGxiYWNrSUQgKyAnXCI+Jyk7XHJcblx0XHR9XHJcblx0XHRjYXRjaCAoZSkge1xyXG5cdFx0XHR3aW4gPSBkb2MuY3JlYXRlRWxlbWVudCgnaWZyYW1lJyk7XHJcblx0XHR9XHJcblxyXG5cdFx0d2luLm5hbWUgPSBjYWxsYmFja0lEO1xyXG5cdFx0d2luLmlkID0gY2FsbGJhY2tJRDtcclxuXHRcdHdpbi5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG5cclxuXHRcdC8vIE92ZXJyaWRlIGNhbGxiYWNrIG1lY2hhbmlzbS4gVHJpZ2dnZXIgYSByZXNwb25zZSBvbmxvYWQvb25lcnJvclxyXG5cdFx0aWYgKG9wdGlvbnMgJiYgb3B0aW9ucy5jYWxsYmFja29ubG9hZCkge1xyXG5cdFx0XHQvLyBPbmxvYWQgaXMgYmVpbmcgZmlyZWQgdHdpY2VcclxuXHRcdFx0d2luLm9ubG9hZCA9IGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdGNiKHtcclxuXHRcdFx0XHRcdHJlc3BvbnNlOiAncG9zdGVkJyxcclxuXHRcdFx0XHRcdG1lc3NhZ2U6ICdDb250ZW50IHdhcyBwb3N0ZWQnXHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdH07XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKHRpbWVvdXQpIHtcclxuXHRcdFx0c2V0VGltZW91dChmdW5jdGlvbigpIHtcclxuXHRcdFx0XHRjYihlcnJvcigndGltZW91dCcsICdUaGUgcG9zdCBvcGVyYXRpb24gdGltZWQgb3V0JykpO1xyXG5cdFx0XHR9LCB0aW1lb3V0KTtcclxuXHRcdH1cclxuXHJcblx0XHRkb2MuYm9keS5hcHBlbmRDaGlsZCh3aW4pO1xyXG5cclxuXHRcdC8vIElmIHdlIGFyZSBqdXN0IHBvc3RpbmcgYSBzaW5nbGUgaXRlbVxyXG5cdFx0aWYgKF90aGlzLmRvbUluc3RhbmNlKCdmb3JtJywgZGF0YSkpIHtcclxuXHRcdFx0Ly8gR2V0IHRoZSBwYXJlbnQgZm9ybVxyXG5cdFx0XHRmb3JtID0gZGF0YS5mb3JtO1xyXG5cclxuXHRcdFx0Ly8gTG9vcCB0aHJvdWdoIGFuZCBkaXNhYmxlIGFsbCBvZiBpdHMgc2libGluZ3NcclxuXHRcdFx0Zm9yIChpID0gMDsgaSA8IGZvcm0uZWxlbWVudHMubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0XHRpZiAoZm9ybS5lbGVtZW50c1tpXSAhPT0gZGF0YSkge1xyXG5cdFx0XHRcdFx0Zm9ybS5lbGVtZW50c1tpXS5zZXRBdHRyaWJ1dGUoJ2Rpc2FibGVkJywgdHJ1ZSk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQvLyBNb3ZlIHRoZSBmb2N1cyB0byB0aGUgZm9ybVxyXG5cdFx0XHRkYXRhID0gZm9ybTtcclxuXHRcdH1cclxuXHJcblx0XHQvLyBQb3N0aW5nIGEgZm9ybVxyXG5cdFx0aWYgKF90aGlzLmRvbUluc3RhbmNlKCdmb3JtJywgZGF0YSkpIHtcclxuXHRcdFx0Ly8gVGhpcyBpcyBhIGZvcm0gZWxlbWVudFxyXG5cdFx0XHRmb3JtID0gZGF0YTtcclxuXHJcblx0XHRcdC8vIERvZXMgdGhpcyBmb3JtIG5lZWQgdG8gYmUgYSBtdWx0aXBhcnQgZm9ybT9cclxuXHRcdFx0Zm9yIChpID0gMDsgaSA8IGZvcm0uZWxlbWVudHMubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0XHRpZiAoIWZvcm0uZWxlbWVudHNbaV0uZGlzYWJsZWQgJiYgZm9ybS5lbGVtZW50c1tpXS50eXBlID09PSAnZmlsZScpIHtcclxuXHRcdFx0XHRcdGZvcm0uZW5jb2RpbmcgPSBmb3JtLmVuY3R5cGUgPSAnbXVsdGlwYXJ0L2Zvcm0tZGF0YSc7XHJcblx0XHRcdFx0XHRmb3JtLmVsZW1lbnRzW2ldLnNldEF0dHJpYnV0ZSgnbmFtZScsICdmaWxlJyk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHRlbHNlIHtcclxuXHRcdFx0Ly8gSXRzIG5vdCBhIGZvcm0gZWxlbWVudCxcclxuXHRcdFx0Ly8gVGhlcmVmb3JlIGl0IG11c3QgYmUgYSBKU09OIG9iamVjdCBvZiBLZXk9PlZhbHVlIG9yIEtleT0+RWxlbWVudFxyXG5cdFx0XHQvLyBJZiBhbnlvbmUgb2YgdGhvc2UgdmFsdWVzIGFyZSBhIGlucHV0IHR5cGU9ZmlsZSB3ZSBzaGFsbCBzaGFsbCBpbnNlcnQgaXRzIHNpYmxpbmdzIGludG8gdGhlIGZvcm0gZm9yIHdoaWNoIGl0IGJlbG9uZ3MuXHJcblx0XHRcdGZvciAoeCBpbiBkYXRhKSBpZiAoZGF0YS5oYXNPd25Qcm9wZXJ0eSh4KSkge1xyXG5cdFx0XHRcdC8vIElzIHRoaXMgYW4gaW5wdXQgRWxlbWVudD9cclxuXHRcdFx0XHRpZiAoX3RoaXMuZG9tSW5zdGFuY2UoJ2lucHV0JywgZGF0YVt4XSkgJiYgZGF0YVt4XS50eXBlID09PSAnZmlsZScpIHtcclxuXHRcdFx0XHRcdGZvcm0gPSBkYXRhW3hdLmZvcm07XHJcblx0XHRcdFx0XHRmb3JtLmVuY29kaW5nID0gZm9ybS5lbmN0eXBlID0gJ211bHRpcGFydC9mb3JtLWRhdGEnO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0Ly8gRG8gSWYgdGhlcmUgaXMgbm8gZGVmaW5lZCBmb3JtIGVsZW1lbnQsIGxldHMgY3JlYXRlIG9uZS5cclxuXHRcdFx0aWYgKCFmb3JtKSB7XHJcblx0XHRcdFx0Ly8gQnVpbGQgZm9ybVxyXG5cdFx0XHRcdGZvcm0gPSBkb2MuY3JlYXRlRWxlbWVudCgnZm9ybScpO1xyXG5cdFx0XHRcdGRvYy5ib2R5LmFwcGVuZENoaWxkKGZvcm0pO1xyXG5cdFx0XHRcdG5ld2Zvcm0gPSBmb3JtO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHR2YXIgaW5wdXQ7XHJcblxyXG5cdFx0XHQvLyBBZGQgZWxlbWVudHMgdG8gdGhlIGZvcm0gaWYgdGhleSBkb250IGV4aXN0XHJcblx0XHRcdGZvciAoeCBpbiBkYXRhKSBpZiAoZGF0YS5oYXNPd25Qcm9wZXJ0eSh4KSkge1xyXG5cclxuXHRcdFx0XHQvLyBJcyB0aGlzIGFuIGVsZW1lbnQ/XHJcblx0XHRcdFx0dmFyIGVsID0gKF90aGlzLmRvbUluc3RhbmNlKCdpbnB1dCcsIGRhdGFbeF0pIHx8IF90aGlzLmRvbUluc3RhbmNlKCd0ZXh0QXJlYScsIGRhdGFbeF0pIHx8IF90aGlzLmRvbUluc3RhbmNlKCdzZWxlY3QnLCBkYXRhW3hdKSk7XHJcblxyXG5cdFx0XHRcdC8vIElzIHRoaXMgbm90IGFuIGlucHV0IGVsZW1lbnQsIG9yIG9uZSB0aGF0IGV4aXN0cyBvdXRzaWRlIHRoZSBmb3JtLlxyXG5cdFx0XHRcdGlmICghZWwgfHwgZGF0YVt4XS5mb3JtICE9PSBmb3JtKSB7XHJcblxyXG5cdFx0XHRcdFx0Ly8gRG9lcyBhbiBlbGVtZW50IGhhdmUgdGhlIHNhbWUgbmFtZT9cclxuXHRcdFx0XHRcdHZhciBpbnB1dHMgPSBmb3JtLmVsZW1lbnRzW3hdO1xyXG5cdFx0XHRcdFx0aWYgKGlucHV0KSB7XHJcblx0XHRcdFx0XHRcdC8vIFJlbW92ZSBpdC5cclxuXHRcdFx0XHRcdFx0aWYgKCEoaW5wdXRzIGluc3RhbmNlb2YgTm9kZUxpc3QpKSB7XHJcblx0XHRcdFx0XHRcdFx0aW5wdXRzID0gW2lucHV0c107XHJcblx0XHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHRcdGZvciAoaSA9IDA7IGkgPCBpbnB1dHMubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0XHRcdFx0XHRpbnB1dHNbaV0ucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChpbnB1dHNbaV0pO1xyXG5cdFx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdC8vIENyZWF0ZSBhbiBpbnB1dCBlbGVtZW50XHJcblx0XHRcdFx0XHRpbnB1dCA9IGRvYy5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xyXG5cdFx0XHRcdFx0aW5wdXQuc2V0QXR0cmlidXRlKCd0eXBlJywgJ2hpZGRlbicpO1xyXG5cdFx0XHRcdFx0aW5wdXQuc2V0QXR0cmlidXRlKCduYW1lJywgeCk7XHJcblxyXG5cdFx0XHRcdFx0Ly8gRG9lcyBpdCBoYXZlIGEgdmFsdWUgYXR0cmlidXRlP1xyXG5cdFx0XHRcdFx0aWYgKGVsKSB7XHJcblx0XHRcdFx0XHRcdGlucHV0LnZhbHVlID0gZGF0YVt4XS52YWx1ZTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdGVsc2UgaWYgKF90aGlzLmRvbUluc3RhbmNlKG51bGwsIGRhdGFbeF0pKSB7XHJcblx0XHRcdFx0XHRcdGlucHV0LnZhbHVlID0gZGF0YVt4XS5pbm5lckhUTUwgfHwgZGF0YVt4XS5pbm5lclRleHQ7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRlbHNlIHtcclxuXHRcdFx0XHRcdFx0aW5wdXQudmFsdWUgPSBkYXRhW3hdO1xyXG5cdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdGZvcm0uYXBwZW5kQ2hpbGQoaW5wdXQpO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0Ly8gSXQgaXMgYW4gZWxlbWVudCwgd2hpY2ggZXhpc3RzIHdpdGhpbiB0aGUgZm9ybSwgYnV0IHRoZSBuYW1lIGlzIHdyb25nXHJcblx0XHRcdFx0ZWxzZSBpZiAoZWwgJiYgZGF0YVt4XS5uYW1lICE9PSB4KSB7XHJcblx0XHRcdFx0XHRkYXRhW3hdLnNldEF0dHJpYnV0ZSgnbmFtZScsIHgpO1xyXG5cdFx0XHRcdFx0ZGF0YVt4XS5uYW1lID0geDtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdC8vIERpc2FibGUgZWxlbWVudHMgZnJvbSB3aXRoaW4gdGhlIGZvcm0gaWYgdGhleSB3ZXJlbid0IHNwZWNpZmllZFxyXG5cdFx0XHRmb3IgKGkgPSAwOyBpIDwgZm9ybS5lbGVtZW50cy5sZW5ndGg7IGkrKykge1xyXG5cclxuXHRcdFx0XHRpbnB1dCA9IGZvcm0uZWxlbWVudHNbaV07XHJcblxyXG5cdFx0XHRcdC8vIERvZXMgdGhlIHNhbWUgbmFtZSBhbmQgdmFsdWUgZXhpc3QgaW4gdGhlIHBhcmVudFxyXG5cdFx0XHRcdGlmICghKGlucHV0Lm5hbWUgaW4gZGF0YSkgJiYgaW5wdXQuZ2V0QXR0cmlidXRlKCdkaXNhYmxlZCcpICE9PSB0cnVlKSB7XHJcblx0XHRcdFx0XHQvLyBEaXNhYmxlXHJcblx0XHRcdFx0XHRpbnB1dC5zZXRBdHRyaWJ1dGUoJ2Rpc2FibGVkJywgdHJ1ZSk7XHJcblxyXG5cdFx0XHRcdFx0Ly8gQWRkIHJlLWVuYWJsZSB0byBjYWxsYmFja1xyXG5cdFx0XHRcdFx0cmVlbmFibGVBZnRlclN1Ym1pdC5wdXNoKGlucHV0KTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHQvLyBTZXQgdGhlIHRhcmdldCBvZiB0aGUgZm9ybVxyXG5cdFx0Zm9ybS5zZXRBdHRyaWJ1dGUoJ21ldGhvZCcsICdQT1NUJyk7XHJcblx0XHRmb3JtLnNldEF0dHJpYnV0ZSgndGFyZ2V0JywgY2FsbGJhY2tJRCk7XHJcblx0XHRmb3JtLnRhcmdldCA9IGNhbGxiYWNrSUQ7XHJcblxyXG5cdFx0Ly8gVXBkYXRlIHRoZSBmb3JtIFVSTFxyXG5cdFx0Zm9ybS5zZXRBdHRyaWJ1dGUoJ2FjdGlvbicsIHVybCk7XHJcblxyXG5cdFx0Ly8gU3VibWl0IHRoZSBmb3JtXHJcblx0XHQvLyBTb21lIHJlYXNvbiB0aGlzIG5lZWRzIHRvIGJlIG9mZnNldCBmcm9tIHRoZSBjdXJyZW50IHdpbmRvdyBleGVjdXRpb25cclxuXHRcdHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcblx0XHRcdGZvcm0uc3VibWl0KCk7XHJcblxyXG5cdFx0XHRzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdHRyeSB7XHJcblx0XHRcdFx0XHQvLyBSZW1vdmUgdGhlIGlmcmFtZSBmcm9tIHRoZSBwYWdlLlxyXG5cdFx0XHRcdFx0Ly93aW4ucGFyZW50Tm9kZS5yZW1vdmVDaGlsZCh3aW4pO1xyXG5cdFx0XHRcdFx0Ly8gUmVtb3ZlIHRoZSBmb3JtXHJcblx0XHRcdFx0XHRpZiAobmV3Zm9ybSkge1xyXG5cdFx0XHRcdFx0XHRuZXdmb3JtLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQobmV3Zm9ybSk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdGNhdGNoIChlKSB7XHJcblx0XHRcdFx0XHR0cnkge1xyXG5cdFx0XHRcdFx0XHRjb25zb2xlLmVycm9yKCdIZWxsb0pTOiBjb3VsZCBub3QgcmVtb3ZlIGlmcmFtZScpO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0Y2F0Y2ggKGVlKSB7fVxyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0Ly8gUmVlbmFibGUgdGhlIGRpc2FibGVkIGZvcm1cclxuXHRcdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IHJlZW5hYmxlQWZ0ZXJTdWJtaXQubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0XHRcdGlmIChyZWVuYWJsZUFmdGVyU3VibWl0W2ldKSB7XHJcblx0XHRcdFx0XHRcdHJlZW5hYmxlQWZ0ZXJTdWJtaXRbaV0uc2V0QXR0cmlidXRlKCdkaXNhYmxlZCcsIGZhbHNlKTtcclxuXHRcdFx0XHRcdFx0cmVlbmFibGVBZnRlclN1Ym1pdFtpXS5kaXNhYmxlZCA9IGZhbHNlO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSwgMCk7XHJcblx0XHR9LCAxMDApO1xyXG5cdH0sXHJcblxyXG5cdC8vIFNvbWUgb2YgdGhlIHByb3ZpZGVycyByZXF1aXJlIHRoYXQgb25seSBtdWx0aXBhcnQgaXMgdXNlZCB3aXRoIG5vbi1iaW5hcnkgZm9ybXMuXHJcblx0Ly8gVGhpcyBmdW5jdGlvbiBjaGVja3Mgd2hldGhlciB0aGUgZm9ybSBjb250YWlucyBiaW5hcnkgZGF0YVxyXG5cdGhhc0JpbmFyeTogZnVuY3Rpb24oZGF0YSkge1xyXG5cdFx0Zm9yICh2YXIgeCBpbiBkYXRhKSBpZiAoZGF0YS5oYXNPd25Qcm9wZXJ0eSh4KSkge1xyXG5cdFx0XHRpZiAodGhpcy5pc0JpbmFyeShkYXRhW3hdKSkge1xyXG5cdFx0XHRcdHJldHVybiB0cnVlO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIGZhbHNlO1xyXG5cdH0sXHJcblxyXG5cdC8vIERldGVybWluZXMgaWYgYSB2YXJpYWJsZSBFaXRoZXIgSXMgb3IgbGlrZSBhIEZvcm1JbnB1dCBoYXMgdGhlIHZhbHVlIG9mIGEgQmxvYlxyXG5cclxuXHRpc0JpbmFyeTogZnVuY3Rpb24oZGF0YSkge1xyXG5cclxuXHRcdHJldHVybiBkYXRhIGluc3RhbmNlb2YgT2JqZWN0ICYmIChcclxuXHRcdCh0aGlzLmRvbUluc3RhbmNlKCdpbnB1dCcsIGRhdGEpICYmIGRhdGEudHlwZSA9PT0gJ2ZpbGUnKSB8fFxyXG5cdFx0KCdGaWxlTGlzdCcgaW4gd2luZG93ICYmIGRhdGEgaW5zdGFuY2VvZiB3aW5kb3cuRmlsZUxpc3QpIHx8XHJcblx0XHQoJ0ZpbGUnIGluIHdpbmRvdyAmJiBkYXRhIGluc3RhbmNlb2Ygd2luZG93LkZpbGUpIHx8XHJcblx0XHQoJ0Jsb2InIGluIHdpbmRvdyAmJiBkYXRhIGluc3RhbmNlb2Ygd2luZG93LkJsb2IpKTtcclxuXHJcblx0fSxcclxuXHJcblx0Ly8gQ29udmVydCBEYXRhLVVSSSB0byBCbG9iIHN0cmluZ1xyXG5cdHRvQmxvYjogZnVuY3Rpb24oZGF0YVVSSSkge1xyXG5cdFx0dmFyIHJlZyA9IC9eZGF0YVxcOihbXjssXSsoXFw7Y2hhcnNldD1bXjssXSspPykoXFw7YmFzZTY0KT8sL2k7XHJcblx0XHR2YXIgbSA9IGRhdGFVUkkubWF0Y2gocmVnKTtcclxuXHRcdGlmICghbSkge1xyXG5cdFx0XHRyZXR1cm4gZGF0YVVSSTtcclxuXHRcdH1cclxuXHJcblx0XHR2YXIgYmluYXJ5ID0gYXRvYihkYXRhVVJJLnJlcGxhY2UocmVnLCAnJykpO1xyXG5cdFx0dmFyIGFycmF5ID0gW107XHJcblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGJpbmFyeS5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHRhcnJheS5wdXNoKGJpbmFyeS5jaGFyQ29kZUF0KGkpKTtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gbmV3IEJsb2IoW25ldyBVaW50OEFycmF5KGFycmF5KV0sIHt0eXBlOiBtWzFdfSk7XHJcblx0fVxyXG5cclxufSk7XHJcblxyXG4vLyBFWFRSQTogQ29udmVydCBGb3JtRWxlbWVudCB0byBKU09OIGZvciBQT1NUaW5nXHJcbi8vIFdyYXBwZXJzIHRvIGFkZCBhZGRpdGlvbmFsIGZ1bmN0aW9uYWxpdHkgdG8gZXhpc3RpbmcgZnVuY3Rpb25zXHJcbihmdW5jdGlvbihoZWxsbykge1xyXG5cclxuXHQvLyBDb3B5IG9yaWdpbmFsIGZ1bmN0aW9uXHJcblx0dmFyIGFwaSA9IGhlbGxvLmFwaTtcclxuXHR2YXIgdXRpbHMgPSBoZWxsby51dGlscztcclxuXHJcblx0dXRpbHMuZXh0ZW5kKHV0aWxzLCB7XHJcblxyXG5cdFx0Ly8gRGF0YVRvSlNPTlxyXG5cdFx0Ly8gVGhpcyB0YWtlcyBhIEZvcm1FbGVtZW50fE5vZGVMaXN0fElucHV0RWxlbWVudHxNaXhlZE9iamVjdHMgYW5kIGNvbnZlcnMgdGhlIGRhdGEgb2JqZWN0IHRvIEpTT04uXHJcblx0XHRkYXRhVG9KU09OOiBmdW5jdGlvbihwKSB7XHJcblxyXG5cdFx0XHR2YXIgX3RoaXMgPSB0aGlzO1xyXG5cdFx0XHR2YXIgdyA9IHdpbmRvdztcclxuXHRcdFx0dmFyIGRhdGEgPSBwLmRhdGE7XHJcblxyXG5cdFx0XHQvLyBJcyBkYXRhIGEgZm9ybSBvYmplY3RcclxuXHRcdFx0aWYgKF90aGlzLmRvbUluc3RhbmNlKCdmb3JtJywgZGF0YSkpIHtcclxuXHRcdFx0XHRkYXRhID0gX3RoaXMubm9kZUxpc3RUb0pTT04oZGF0YS5lbGVtZW50cyk7XHJcblx0XHRcdH1cclxuXHRcdFx0ZWxzZSBpZiAoJ05vZGVMaXN0JyBpbiB3ICYmIGRhdGEgaW5zdGFuY2VvZiBOb2RlTGlzdCkge1xyXG5cdFx0XHRcdGRhdGEgPSBfdGhpcy5ub2RlTGlzdFRvSlNPTihkYXRhKTtcclxuXHRcdFx0fVxyXG5cdFx0XHRlbHNlIGlmIChfdGhpcy5kb21JbnN0YW5jZSgnaW5wdXQnLCBkYXRhKSkge1xyXG5cdFx0XHRcdGRhdGEgPSBfdGhpcy5ub2RlTGlzdFRvSlNPTihbZGF0YV0pO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQvLyBJcyBkYXRhIGEgYmxvYiwgRmlsZSwgRmlsZUxpc3Q/XHJcblx0XHRcdGlmICgoJ0ZpbGUnIGluIHcgJiYgZGF0YSBpbnN0YW5jZW9mIHcuRmlsZSkgfHxcclxuXHRcdFx0XHQoJ0Jsb2InIGluIHcgJiYgZGF0YSBpbnN0YW5jZW9mIHcuQmxvYikgfHxcclxuXHRcdFx0XHQoJ0ZpbGVMaXN0JyBpbiB3ICYmIGRhdGEgaW5zdGFuY2VvZiB3LkZpbGVMaXN0KSkge1xyXG5cdFx0XHRcdGRhdGEgPSB7ZmlsZTogZGF0YX07XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdC8vIExvb3AgdGhyb3VnaCBkYXRhIGlmIGl0J3Mgbm90IGZvcm0gZGF0YSBpdCBtdXN0IG5vdyBiZSBhIEpTT04gb2JqZWN0XHJcblx0XHRcdGlmICghKCdGb3JtRGF0YScgaW4gdyAmJiBkYXRhIGluc3RhbmNlb2Ygdy5Gb3JtRGF0YSkpIHtcclxuXHJcblx0XHRcdFx0Zm9yICh2YXIgeCBpbiBkYXRhKSBpZiAoZGF0YS5oYXNPd25Qcm9wZXJ0eSh4KSkge1xyXG5cclxuXHRcdFx0XHRcdGlmICgnRmlsZUxpc3QnIGluIHcgJiYgZGF0YVt4XSBpbnN0YW5jZW9mIHcuRmlsZUxpc3QpIHtcclxuXHRcdFx0XHRcdFx0aWYgKGRhdGFbeF0ubGVuZ3RoID09PSAxKSB7XHJcblx0XHRcdFx0XHRcdFx0ZGF0YVt4XSA9IGRhdGFbeF1bMF07XHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdGVsc2UgaWYgKF90aGlzLmRvbUluc3RhbmNlKCdpbnB1dCcsIGRhdGFbeF0pICYmIGRhdGFbeF0udHlwZSA9PT0gJ2ZpbGUnKSB7XHJcblx0XHRcdFx0XHRcdGNvbnRpbnVlO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0ZWxzZSBpZiAoX3RoaXMuZG9tSW5zdGFuY2UoJ2lucHV0JywgZGF0YVt4XSkgfHxcclxuXHRcdFx0XHRcdFx0X3RoaXMuZG9tSW5zdGFuY2UoJ3NlbGVjdCcsIGRhdGFbeF0pIHx8XHJcblx0XHRcdFx0XHRcdF90aGlzLmRvbUluc3RhbmNlKCd0ZXh0QXJlYScsIGRhdGFbeF0pKSB7XHJcblx0XHRcdFx0XHRcdGRhdGFbeF0gPSBkYXRhW3hdLnZhbHVlO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0ZWxzZSBpZiAoX3RoaXMuZG9tSW5zdGFuY2UobnVsbCwgZGF0YVt4XSkpIHtcclxuXHRcdFx0XHRcdFx0ZGF0YVt4XSA9IGRhdGFbeF0uaW5uZXJIVE1MIHx8IGRhdGFbeF0uaW5uZXJUZXh0O1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0cC5kYXRhID0gZGF0YTtcclxuXHRcdFx0cmV0dXJuIGRhdGE7XHJcblx0XHR9LFxyXG5cclxuXHRcdC8vIE5vZGVMaXN0VG9KU09OXHJcblx0XHQvLyBHaXZlbiBhIGxpc3Qgb2YgZWxlbWVudHMgZXh0cmFwb2xhdGUgdGhlaXIgdmFsdWVzIGFuZCByZXR1cm4gYXMgYSBqc29uIG9iamVjdFxyXG5cdFx0bm9kZUxpc3RUb0pTT046IGZ1bmN0aW9uKG5vZGVsaXN0KSB7XHJcblxyXG5cdFx0XHR2YXIganNvbiA9IHt9O1xyXG5cclxuXHRcdFx0Ly8gQ3JlYXRlIGEgZGF0YSBzdHJpbmdcclxuXHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBub2RlbGlzdC5sZW5ndGg7IGkrKykge1xyXG5cclxuXHRcdFx0XHR2YXIgaW5wdXQgPSBub2RlbGlzdFtpXTtcclxuXHJcblx0XHRcdFx0Ly8gSWYgdGhlIG5hbWUgb2YgdGhlIGlucHV0IGlzIGVtcHR5IG9yIGRpYWJsZWQsIGRvbnQgYWRkIGl0LlxyXG5cdFx0XHRcdGlmIChpbnB1dC5kaXNhYmxlZCB8fCAhaW5wdXQubmFtZSkge1xyXG5cdFx0XHRcdFx0Y29udGludWU7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHQvLyBJcyB0aGlzIGEgZmlsZSwgZG9lcyB0aGUgYnJvd3NlciBub3Qgc3VwcG9ydCAnZmlsZXMnIGFuZCAnRm9ybURhdGEnP1xyXG5cdFx0XHRcdGlmIChpbnB1dC50eXBlID09PSAnZmlsZScpIHtcclxuXHRcdFx0XHRcdGpzb25baW5wdXQubmFtZV0gPSBpbnB1dDtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0ZWxzZSB7XHJcblx0XHRcdFx0XHRqc29uW2lucHV0Lm5hbWVdID0gaW5wdXQudmFsdWUgfHwgaW5wdXQuaW5uZXJIVE1MO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0cmV0dXJuIGpzb247XHJcblx0XHR9XHJcblx0fSk7XHJcblxyXG5cdC8vIFJlcGxhY2UgaXRcclxuXHRoZWxsby5hcGkgPSBmdW5jdGlvbigpIHtcclxuXHJcblx0XHQvLyBHZXQgYXJndW1lbnRzXHJcblx0XHR2YXIgcCA9IHV0aWxzLmFyZ3Moe3BhdGg6ICdzIScsIG1ldGhvZDogJ3MnLCBkYXRhOidvJywgdGltZW91dDogJ2knLCBjYWxsYmFjazogJ2YnfSwgYXJndW1lbnRzKTtcclxuXHJcblx0XHQvLyBDaGFuZ2UgZm9yIGludG8gYSBkYXRhIG9iamVjdFxyXG5cdFx0aWYgKHAuZGF0YSkge1xyXG5cdFx0XHR1dGlscy5kYXRhVG9KU09OKHApO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBhcGkuY2FsbCh0aGlzLCBwKTtcclxuXHR9O1xyXG5cclxufSkoaGVsbG8pO1xyXG5cclxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG4vL1xyXG4vLyBTYXZlIGFueSBhY2Nlc3MgdG9rZW4gdGhhdCBpcyBpbiB0aGUgY3VycmVudCBwYWdlIFVSTFxyXG4vLyBIYW5kbGUgYW55IHJlc3BvbnNlIHNvbGljaXRlZCB0aHJvdWdoIGlmcmFtZSBoYXNoIHRhZyBmb2xsb3dpbmcgYW4gQVBJIHJlcXVlc3RcclxuLy9cclxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG5cclxuaGVsbG8udXRpbHMucmVzcG9uc2VIYW5kbGVyKHdpbmRvdywgd2luZG93Lm9wZW5lciB8fCB3aW5kb3cucGFyZW50KTtcclxuXHJcbi8vIFNjcmlwdCB0byBzdXBwb3J0IENocm9tZUFwcHNcclxuLy8gVGhpcyBvdmVyaWRlcyB0aGUgaGVsbG8udXRpbHMucG9wdXAgbWV0aG9kIHRvIHN1cHBvcnQgY2hyb21lLmlkZW50aXR5LmxhdW5jaFdlYkF1dGhGbG93XHJcbi8vIFNlZSBodHRwczovL2RldmVsb3Blci5jaHJvbWUuY29tL2FwcHMvYXBwX2lkZW50aXR5I25vblxyXG5cclxuLy8gSXMgdGhpcyBhIGNocm9tZSBhcHA/XHJcblxyXG5pZiAodHlwZW9mIGNocm9tZSA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIGNocm9tZS5pZGVudGl0eSA9PT0gJ29iamVjdCcgJiYgY2hyb21lLmlkZW50aXR5LmxhdW5jaFdlYkF1dGhGbG93KSB7XHJcblxyXG5cdChmdW5jdGlvbigpIHtcclxuXHJcblx0XHQvLyBTd2FwIHRoZSBwb3B1cCBtZXRob2RcclxuXHRcdGhlbGxvLnV0aWxzLnBvcHVwID0gZnVuY3Rpb24odXJsKSB7XHJcblxyXG5cdFx0XHRyZXR1cm4gX29wZW4odXJsLCB0cnVlKTtcclxuXHJcblx0XHR9O1xyXG5cclxuXHRcdC8vIFN3YXAgdGhlIGhpZGRlbiBpZnJhbWUgbWV0aG9kXHJcblx0XHRoZWxsby51dGlscy5pZnJhbWUgPSBmdW5jdGlvbih1cmwpIHtcclxuXHJcblx0XHRcdF9vcGVuKHVybCwgZmFsc2UpO1xyXG5cclxuXHRcdH07XHJcblxyXG5cdFx0Ly8gU3dhcCB0aGUgcmVxdWVzdF9jb3JzIG1ldGhvZFxyXG5cdFx0aGVsbG8udXRpbHMucmVxdWVzdF9jb3JzID0gZnVuY3Rpb24oY2FsbGJhY2spIHtcclxuXHJcblx0XHRcdGNhbGxiYWNrKCk7XHJcblxyXG5cdFx0XHQvLyBBbHdheXMgcnVuIGFzIENPUlNcclxuXHJcblx0XHRcdHJldHVybiB0cnVlO1xyXG5cdFx0fTtcclxuXHJcblx0XHQvLyBTd2FwIHRoZSBzdG9yYWdlIG1ldGhvZFxyXG5cdFx0dmFyIF9jYWNoZSA9IHt9O1xyXG5cdFx0Y2hyb21lLnN0b3JhZ2UubG9jYWwuZ2V0KCdoZWxsbycsIGZ1bmN0aW9uKHIpIHtcclxuXHRcdFx0Ly8gVXBkYXRlIHRoZSBjYWNoZVxyXG5cdFx0XHRfY2FjaGUgPSByLmhlbGxvIHx8IHt9O1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0aGVsbG8udXRpbHMuc3RvcmUgPSBmdW5jdGlvbihuYW1lLCB2YWx1ZSkge1xyXG5cclxuXHRcdFx0Ly8gR2V0IGFsbFxyXG5cdFx0XHRpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMCkge1xyXG5cdFx0XHRcdHJldHVybiBfY2FjaGU7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdC8vIEdldFxyXG5cdFx0XHRpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMSkge1xyXG5cdFx0XHRcdHJldHVybiBfY2FjaGVbbmFtZV0gfHwgbnVsbDtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0Ly8gU2V0XHJcblx0XHRcdGlmICh2YWx1ZSkge1xyXG5cdFx0XHRcdF9jYWNoZVtuYW1lXSA9IHZhbHVlO1xyXG5cdFx0XHRcdGNocm9tZS5zdG9yYWdlLmxvY2FsLnNldCh7aGVsbG86IF9jYWNoZX0pO1xyXG5cdFx0XHRcdHJldHVybiB2YWx1ZTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0Ly8gRGVsZXRlXHJcblx0XHRcdGlmICh2YWx1ZSA9PT0gbnVsbCkge1xyXG5cdFx0XHRcdGRlbGV0ZSBfY2FjaGVbbmFtZV07XHJcblx0XHRcdFx0Y2hyb21lLnN0b3JhZ2UubG9jYWwuc2V0KHtoZWxsbzogX2NhY2hlfSk7XHJcblx0XHRcdFx0cmV0dXJuIG51bGw7XHJcblx0XHRcdH1cclxuXHRcdH07XHJcblxyXG5cdFx0Ly8gT3BlbiBmdW5jdGlvblxyXG5cdFx0ZnVuY3Rpb24gX29wZW4odXJsLCBpbnRlcmFjdGl2ZSkge1xyXG5cclxuXHRcdFx0Ly8gTGF1bmNoXHJcblx0XHRcdHZhciByZWYgPSB7XHJcblx0XHRcdFx0Y2xvc2VkOiBmYWxzZVxyXG5cdFx0XHR9O1xyXG5cclxuXHRcdFx0Ly8gTGF1bmNoIHRoZSB3ZWJBdXRoRmxvd1xyXG5cdFx0XHRjaHJvbWUuaWRlbnRpdHkubGF1bmNoV2ViQXV0aEZsb3coe1xyXG5cdFx0XHRcdHVybDogdXJsLFxyXG5cdFx0XHRcdGludGVyYWN0aXZlOiBpbnRlcmFjdGl2ZVxyXG5cdFx0XHR9LCBmdW5jdGlvbihyZXNwb25zZVVybCkge1xyXG5cclxuXHRcdFx0XHQvLyBEaWQgdGhlIHVzZXIgY2FuY2VsIHRoaXMgcHJlbWF0dXJlbHlcclxuXHRcdFx0XHRpZiAocmVzcG9uc2VVcmwgPT09IHVuZGVmaW5lZCkge1xyXG5cdFx0XHRcdFx0cmVmLmNsb3NlZCA9IHRydWU7XHJcblx0XHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHQvLyBTcGxpdCBhcHBhcnQgdGhlIFVSTFxyXG5cdFx0XHRcdHZhciBhID0gaGVsbG8udXRpbHMudXJsKHJlc3BvbnNlVXJsKTtcclxuXHJcblx0XHRcdFx0Ly8gVGhlIGxvY2F0aW9uIGNhbiBiZSBhdWdtZW50ZWQgaW4gdG8gYSBsb2NhdGlvbiBvYmplY3QgbGlrZSBzby4uLlxyXG5cdFx0XHRcdC8vIFdlIGRvbnQgaGF2ZSB3aW5kb3cgb3BlcmF0aW9ucyBvbiB0aGUgcG9wdXAgc28gbGV0cyBjcmVhdGUgc29tZVxyXG5cdFx0XHRcdHZhciBfcG9wdXAgPSB7XHJcblx0XHRcdFx0XHRsb2NhdGlvbjoge1xyXG5cclxuXHRcdFx0XHRcdFx0Ly8gQ2hhbmdlIHRoZSBsb2NhdGlvbiBvZiB0aGUgcG9wdXBcclxuXHRcdFx0XHRcdFx0YXNzaWduOiBmdW5jdGlvbih1cmwpIHtcclxuXHJcblx0XHRcdFx0XHRcdFx0Ly8gSWYgdGhlcmUgaXMgYSBzZWNvbmRhcnkgcmVhc3NpZ25cclxuXHRcdFx0XHRcdFx0XHQvLyBJbiB0aGUgY2FzZSBvZiBPQXV0aDFcclxuXHRcdFx0XHRcdFx0XHQvLyBUcmlnZ2VyIHRoaXMgaW4gbm9uLWludGVyYWN0aXZlIG1vZGUuXHJcblx0XHRcdFx0XHRcdFx0X29wZW4odXJsLCBmYWxzZSk7XHJcblx0XHRcdFx0XHRcdH0sXHJcblxyXG5cdFx0XHRcdFx0XHRzZWFyY2g6IGEuc2VhcmNoLFxyXG5cdFx0XHRcdFx0XHRoYXNoOiBhLmhhc2gsXHJcblx0XHRcdFx0XHRcdGhyZWY6IGEuaHJlZlxyXG5cdFx0XHRcdFx0fSxcclxuXHRcdFx0XHRcdGNsb3NlOiBmdW5jdGlvbigpIHt9XHJcblx0XHRcdFx0fTtcclxuXHJcblx0XHRcdFx0Ly8gVGhlbiB0aGlzIFVSTCBjb250YWlucyBpbmZvcm1hdGlvbiB3aGljaCBIZWxsb0pTIG11c3QgcHJvY2Vzc1xyXG5cdFx0XHRcdC8vIFVSTCBzdHJpbmdcclxuXHRcdFx0XHQvLyBXaW5kb3cgLSBhbnkgYWN0aW9uIHN1Y2ggYXMgd2luZG93IHJlbG9jYXRpb24gZ29lcyBoZXJlXHJcblx0XHRcdFx0Ly8gT3BlbmVyIC0gdGhlIHBhcmVudCB3aW5kb3cgd2hpY2ggb3BlbmVkIHRoaXMsIGFrYSB0aGlzIHNjcmlwdFxyXG5cclxuXHRcdFx0XHRoZWxsby51dGlscy5yZXNwb25zZUhhbmRsZXIoX3BvcHVwLCB3aW5kb3cpO1xyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRcdC8vIFJldHVybiB0aGUgcmVmZXJlbmNlXHJcblx0XHRcdHJldHVybiByZWY7XHJcblx0XHR9XHJcblxyXG5cdH0pKCk7XHJcbn1cclxuXHJcbi8vIFBob25lZ2FwIG92ZXJyaWRlIGZvciBoZWxsby5waG9uZWdhcC5qc1xyXG4oZnVuY3Rpb24oKSB7XHJcblxyXG5cdC8vIElzIHRoaXMgYSBwaG9uZWdhcCBpbXBsZW1lbnRhdGlvbj9cclxuXHRpZiAoISgvXmZpbGU6XFwvezN9W15cXC9dLy50ZXN0KHdpbmRvdy5sb2NhdGlvbi5ocmVmKSAmJiB3aW5kb3cuY29yZG92YSkpIHtcclxuXHRcdC8vIENvcmRvdmEgaXMgbm90IGluY2x1ZGVkLlxyXG5cdFx0cmV0dXJuO1xyXG5cdH1cclxuXHJcblx0Ly8gQXVnbWVudCB0aGUgaGlkZGVuIGlmcmFtZSBtZXRob2RcclxuXHRoZWxsby51dGlscy5pZnJhbWUgPSBmdW5jdGlvbih1cmwsIHJlZGlyZWN0VXJpKSB7XHJcblx0XHRoZWxsby51dGlscy5wb3B1cCh1cmwsIHJlZGlyZWN0VXJpLCB7aGlkZGVuOiAneWVzJ30pO1xyXG5cdH07XHJcblxyXG5cdC8vIEF1Z21lbnQgdGhlIHBvcHVwXHJcblx0dmFyIHV0aWxQb3B1cCA9IGhlbGxvLnV0aWxzLnBvcHVwO1xyXG5cclxuXHQvLyBSZXBsYWNlIHBvcHVwXHJcblx0aGVsbG8udXRpbHMucG9wdXAgPSBmdW5jdGlvbih1cmwsIHJlZGlyZWN0VXJpLCBvcHRpb25zKSB7XHJcblxyXG5cdFx0Ly8gUnVuIHRoZSBzdGFuZGFyZFxyXG5cdFx0dmFyIHBvcHVwID0gdXRpbFBvcHVwLmNhbGwodGhpcywgdXJsLCByZWRpcmVjdFVyaSwgb3B0aW9ucyk7XHJcblxyXG5cdFx0Ly8gQ3JlYXRlIGEgZnVuY3Rpb24gZm9yIHJlb3BlbmluZyB0aGUgcG9wdXAsIGFuZCBhc3NpZ25pbmcgZXZlbnRzIHRvIHRoZSBuZXcgcG9wdXAgb2JqZWN0XHJcblx0XHQvLyBQaG9uZUdhcCBzdXBwb3J0XHJcblx0XHQvLyBBZGQgYW4gZXZlbnQgbGlzdGVuZXIgdG8gbGlzdGVuIHRvIHRoZSBjaGFuZ2UgaW4gdGhlIHBvcHVwIHdpbmRvd3MgVVJMXHJcblx0XHQvLyBUaGlzIG11c3QgYXBwZWFyIGJlZm9yZSBwb3B1cC5mb2N1cygpO1xyXG5cdFx0dHJ5IHtcclxuXHRcdFx0aWYgKHBvcHVwICYmIHBvcHVwLmFkZEV2ZW50TGlzdGVuZXIpIHtcclxuXHJcblx0XHRcdFx0Ly8gR2V0IHRoZSBvcmlnaW4gb2YgdGhlIHJlZGlyZWN0IFVSSVxyXG5cclxuXHRcdFx0XHR2YXIgYSA9IGhlbGxvLnV0aWxzLnVybChyZWRpcmVjdFVyaSk7XHJcblx0XHRcdFx0dmFyIHJlZGlyZWN0VXJpT3JpZ2luID0gYS5vcmlnaW4gfHwgKGEucHJvdG9jb2wgKyAnLy8nICsgYS5ob3N0bmFtZSk7XHJcblxyXG5cdFx0XHRcdC8vIExpc3RlbiB0byBjaGFuZ2VzIGluIHRoZSBJbkFwcEJyb3dzZXIgd2luZG93XHJcblxyXG5cdFx0XHRcdHBvcHVwLmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWRzdGFydCcsIGZ1bmN0aW9uKGUpIHtcclxuXHJcblx0XHRcdFx0XHR2YXIgdXJsID0gZS51cmw7XHJcblxyXG5cdFx0XHRcdFx0Ly8gSXMgdGhpcyB0aGUgcGF0aCwgYXMgZ2l2ZW4gYnkgdGhlIHJlZGlyZWN0VXJpP1xyXG5cdFx0XHRcdFx0Ly8gQ2hlY2sgdGhlIG5ldyBVUkwgYWdhaW5zIHRoZSByZWRpcmVjdFVyaU9yaWdpbi5cclxuXHRcdFx0XHRcdC8vIEFjY29yZGluZyB0byAjNjMgYSB1c2VyIGNvdWxkIGNsaWNrICdjYW5jZWwnIGluIHNvbWUgZGlhbG9nIGJveGVzIC4uLi5cclxuXHRcdFx0XHRcdC8vIFRoZSBwb3B1cCByZWRpcmVjdHMgdG8gYW5vdGhlciBwYWdlIHdpdGggdGhlIHNhbWUgb3JpZ2luLCB5ZXQgd2Ugc3RpbGwgd2lzaCBpdCB0byBjbG9zZS5cclxuXHJcblx0XHRcdFx0XHRpZiAodXJsLmluZGV4T2YocmVkaXJlY3RVcmlPcmlnaW4pICE9PSAwKSB7XHJcblx0XHRcdFx0XHRcdHJldHVybjtcclxuXHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHQvLyBTcGxpdCBhcHBhcnQgdGhlIFVSTFxyXG5cdFx0XHRcdFx0dmFyIGEgPSBoZWxsby51dGlscy51cmwodXJsKTtcclxuXHJcblx0XHRcdFx0XHQvLyBXZSBkb250IGhhdmUgd2luZG93IG9wZXJhdGlvbnMgb24gdGhlIHBvcHVwIHNvIGxldHMgY3JlYXRlIHNvbWVcclxuXHRcdFx0XHRcdC8vIFRoZSBsb2NhdGlvbiBjYW4gYmUgYXVnbWVudGVkIGluIHRvIGEgbG9jYXRpb24gb2JqZWN0IGxpa2Ugc28uLi5cclxuXHJcblx0XHRcdFx0XHR2YXIgX3BvcHVwID0ge1xyXG5cdFx0XHRcdFx0XHRsb2NhdGlvbjoge1xyXG5cdFx0XHRcdFx0XHRcdC8vIENoYW5nZSB0aGUgbG9jYXRpb24gb2YgdGhlIHBvcHVwXHJcblx0XHRcdFx0XHRcdFx0YXNzaWduOiBmdW5jdGlvbihsb2NhdGlvbikge1xyXG5cclxuXHRcdFx0XHRcdFx0XHRcdC8vIFVuZm91cnR1bmF0bHkgYW4gYXBwIGlzIG1heSBub3QgY2hhbmdlIHRoZSBsb2NhdGlvbiBvZiBhIEluQXBwQnJvd3NlciB3aW5kb3cuXHJcblx0XHRcdFx0XHRcdFx0XHQvLyBTbyB0byBzaGltIHRoaXMsIGp1c3Qgb3BlbiBhIG5ldyBvbmUuXHJcblx0XHRcdFx0XHRcdFx0XHRwb3B1cC5leGVjdXRlU2NyaXB0KHtjb2RlOiAnd2luZG93LmxvY2F0aW9uLmhyZWYgPSBcIicgKyBsb2NhdGlvbiArICc7XCInfSk7XHJcblx0XHRcdFx0XHRcdFx0fSxcclxuXHJcblx0XHRcdFx0XHRcdFx0c2VhcmNoOiBhLnNlYXJjaCxcclxuXHRcdFx0XHRcdFx0XHRoYXNoOiBhLmhhc2gsXHJcblx0XHRcdFx0XHRcdFx0aHJlZjogYS5ocmVmXHJcblx0XHRcdFx0XHRcdH0sXHJcblx0XHRcdFx0XHRcdGNsb3NlOiBmdW5jdGlvbigpIHtcclxuXHRcdFx0XHRcdFx0XHRpZiAocG9wdXAuY2xvc2UpIHtcclxuXHRcdFx0XHRcdFx0XHRcdHBvcHVwLmNsb3NlKCk7XHJcblx0XHRcdFx0XHRcdFx0XHR0cnkge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRwb3B1cC5jbG9zZWQgPSB0cnVlO1xyXG5cdFx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRcdFx0Y2F0Y2ggKF9lKSB7fVxyXG5cdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0fTtcclxuXHJcblx0XHRcdFx0XHQvLyBUaGVuIHRoaXMgVVJMIGNvbnRhaW5zIGluZm9ybWF0aW9uIHdoaWNoIEhlbGxvSlMgbXVzdCBwcm9jZXNzXHJcblx0XHRcdFx0XHQvLyBVUkwgc3RyaW5nXHJcblx0XHRcdFx0XHQvLyBXaW5kb3cgLSBhbnkgYWN0aW9uIHN1Y2ggYXMgd2luZG93IHJlbG9jYXRpb24gZ29lcyBoZXJlXHJcblx0XHRcdFx0XHQvLyBPcGVuZXIgLSB0aGUgcGFyZW50IHdpbmRvdyB3aGljaCBvcGVuZWQgdGhpcywgYWthIHRoaXMgc2NyaXB0XHJcblxyXG5cdFx0XHRcdFx0aGVsbG8udXRpbHMucmVzcG9uc2VIYW5kbGVyKF9wb3B1cCwgd2luZG93KTtcclxuXHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHRcdGNhdGNoIChlKSB7fVxyXG5cclxuXHRcdHJldHVybiBwb3B1cDtcclxuXHR9O1xyXG5cclxufSkoKTtcclxuXHJcbihmdW5jdGlvbihoZWxsbykge1xyXG5cclxuXHQvLyBPQXV0aDFcclxuXHR2YXIgT0F1dGgxU2V0dGluZ3MgPSB7XHJcblx0XHR2ZXJzaW9uOiAnMS4wJyxcclxuXHRcdGF1dGg6ICdodHRwczovL3d3dy5kcm9wYm94LmNvbS8xL29hdXRoL2F1dGhvcml6ZScsXHJcblx0XHRyZXF1ZXN0OiAnaHR0cHM6Ly9hcGkuZHJvcGJveC5jb20vMS9vYXV0aC9yZXF1ZXN0X3Rva2VuJyxcclxuXHRcdHRva2VuOiAnaHR0cHM6Ly9hcGkuZHJvcGJveC5jb20vMS9vYXV0aC9hY2Nlc3NfdG9rZW4nXHJcblx0fTtcclxuXHJcblx0Ly8gT0F1dGgyIFNldHRpbmdzXHJcblx0dmFyIE9BdXRoMlNldHRpbmdzID0ge1xyXG5cdFx0dmVyc2lvbjogMixcclxuXHRcdGF1dGg6ICdodHRwczovL3d3dy5kcm9wYm94LmNvbS8xL29hdXRoMi9hdXRob3JpemUnLFxyXG5cdFx0Z3JhbnQ6ICdodHRwczovL2FwaS5kcm9wYm94LmNvbS8xL29hdXRoMi90b2tlbidcclxuXHR9O1xyXG5cclxuXHQvLyBJbml0aWF0ZSB0aGUgRHJvcGJveCBtb2R1bGVcclxuXHRoZWxsby5pbml0KHtcclxuXHJcblx0XHRkcm9wYm94OiB7XHJcblxyXG5cdFx0XHRuYW1lOiAnRHJvcGJveCcsXHJcblxyXG5cdFx0XHRvYXV0aDogT0F1dGgyU2V0dGluZ3MsXHJcblxyXG5cdFx0XHRsb2dpbjogZnVuY3Rpb24ocCkge1xyXG5cdFx0XHRcdC8vIE9BdXRoMiBub24tc3RhbmRhcmQgYWRqdXN0bWVudHNcclxuXHRcdFx0XHRwLnFzLnNjb3BlID0gJyc7XHJcblxyXG5cdFx0XHRcdC8vIFNob3VsZCB0aGlzIGJlIHJ1biBhcyBPQXV0aDE/XHJcblx0XHRcdFx0Ly8gSWYgdGhlIHJlZGlyZWN0X3VyaSBpcyBpcyBIVFRQIChub24tc2VjdXJlKSB0aGVuIGl0cyByZXF1aXJlZCB0byByZXZlcnQgdG8gdGhlIE9BdXRoMSBlbmRwb2ludHNcclxuXHRcdFx0XHR2YXIgcmVkaXJlY3QgPSBkZWNvZGVVUklDb21wb25lbnQocC5xcy5yZWRpcmVjdF91cmkpO1xyXG5cdFx0XHRcdGlmIChyZWRpcmVjdC5pbmRleE9mKCdodHRwOicpID09PSAwICYmIHJlZGlyZWN0LmluZGV4T2YoJ2h0dHA6Ly9sb2NhbGhvc3QvJykgIT09IDApIHtcclxuXHJcblx0XHRcdFx0XHQvLyBPdmVycmlkZSB0aGUgZHJvcGJveCBPQXV0aCBzZXR0aW5ncy5cclxuXHRcdFx0XHRcdGhlbGxvLnNlcnZpY2VzLmRyb3Bib3gub2F1dGggPSBPQXV0aDFTZXR0aW5ncztcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0ZWxzZSB7XHJcblx0XHRcdFx0XHQvLyBPdmVycmlkZSB0aGUgZHJvcGJveCBPQXV0aCBzZXR0aW5ncy5cclxuXHRcdFx0XHRcdGhlbGxvLnNlcnZpY2VzLmRyb3Bib3gub2F1dGggPSBPQXV0aDJTZXR0aW5ncztcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdC8vIFRoZSBkcm9wYm94IGxvZ2luIHdpbmRvdyBpcyBhIGRpZmZlcmVudCBzaXplXHJcblx0XHRcdFx0cC5vcHRpb25zLnBvcHVwLndpZHRoID0gMTAwMDtcclxuXHRcdFx0XHRwLm9wdGlvbnMucG9wdXAuaGVpZ2h0ID0gMTAwMDtcclxuXHRcdFx0fSxcclxuXHJcblx0XHRcdC8qXHJcblx0XHRcdFx0RHJvcGJveCBkb2VzIG5vdCBhbGxvdyBpbnNlY3VyZSBIVFRQIFVSSSdzIGluIHRoZSByZWRpcmVjdF91cmkgZmllbGRcclxuXHRcdFx0XHQuLi5vdGhlcndpc2UgSSdkIGxvdmUgdG8gdXNlIE9BdXRoMlxyXG5cclxuXHRcdFx0XHRGb2xsb3cgcmVxdWVzdCBodHRwczovL2ZvcnVtcy5kcm9wYm94LmNvbS90b3BpYy5waHA/aWQ9MTA2NTA1XHJcblxyXG5cdFx0XHRcdHAucXMucmVzcG9uc2VfdHlwZSA9ICdjb2RlJztcclxuXHRcdFx0XHRvYXV0aDoge1xyXG5cdFx0XHRcdFx0dmVyc2lvbjogMixcclxuXHRcdFx0XHRcdGF1dGg6ICdodHRwczovL3d3dy5kcm9wYm94LmNvbS8xL29hdXRoMi9hdXRob3JpemUnLFxyXG5cdFx0XHRcdFx0Z3JhbnQ6ICdodHRwczovL2FwaS5kcm9wYm94LmNvbS8xL29hdXRoMi90b2tlbidcclxuXHRcdFx0XHR9XHJcblx0XHRcdCovXHJcblxyXG5cdFx0XHQvLyBBUEkgQmFzZSBVUkxcclxuXHRcdFx0YmFzZTogJ2h0dHBzOi8vYXBpLmRyb3Bib3guY29tLzEvJyxcclxuXHJcblx0XHRcdC8vIEJlc3Bva2Ugc2V0dGluZzogdGhpcyBpcyBzdGF0ZXMgd2hldGhlciB0byB1c2UgdGhlIGN1c3RvbSBlbnZpcm9ubWVudCBvZiBEcm9wYm94IG9yIHRvIHVzZSB0aGVpciBvd24gZW52aXJvbm1lbnRcclxuXHRcdFx0Ly8gQmVjYXVzZSBpdCdzIG5vdG9yaW91c2x5IGRpZmZpY3VsdCBmb3IgRHJvcGJveCB0b28gcHJvdmlkZSBhY2Nlc3MgZnJvbSBvdGhlciB3ZWJzZXJ2aWNlcywgdGhpcyBkZWZhdWx0cyB0byBTYW5kYm94XHJcblx0XHRcdHJvb3Q6ICdzYW5kYm94JyxcclxuXHJcblx0XHRcdC8vIE1hcCBHRVQgcmVxdWVzdHNcclxuXHRcdFx0Z2V0OiB7XHJcblx0XHRcdFx0bWU6ICdhY2NvdW50L2luZm8nLFxyXG5cclxuXHRcdFx0XHQvLyBIdHRwczovL3d3dy5kcm9wYm94LmNvbS9kZXZlbG9wZXJzL2NvcmUvZG9jcyNtZXRhZGF0YVxyXG5cdFx0XHRcdCdtZS9maWxlcyc6IHJlcSgnbWV0YWRhdGEvYXV0by9Ae3BhcmVudHx9JyksXHJcblx0XHRcdFx0J21lL2ZvbGRlcic6IHJlcSgnbWV0YWRhdGEvYXV0by9Ae2lkfScpLFxyXG5cdFx0XHRcdCdtZS9mb2xkZXJzJzogcmVxKCdtZXRhZGF0YS9hdXRvLycpLFxyXG5cclxuXHRcdFx0XHQnZGVmYXVsdCc6IGZ1bmN0aW9uKHAsIGNhbGxiYWNrKSB7XHJcblx0XHRcdFx0XHRpZiAocC5wYXRoLm1hdGNoKCdodHRwczovL2FwaS1jb250ZW50LmRyb3Bib3guY29tLzEvZmlsZXMvJykpIHtcclxuXHRcdFx0XHRcdFx0Ly8gVGhpcyBpcyBhIGZpbGUsIHJldHVybiBiaW5hcnkgZGF0YVxyXG5cdFx0XHRcdFx0XHRwLm1ldGhvZCA9ICdibG9iJztcclxuXHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHRjYWxsYmFjayhwLnBhdGgpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSxcclxuXHJcblx0XHRcdHBvc3Q6IHtcclxuXHRcdFx0XHQnbWUvZmlsZXMnOiBmdW5jdGlvbihwLCBjYWxsYmFjaykge1xyXG5cclxuXHRcdFx0XHRcdHZhciBwYXRoID0gcC5kYXRhLnBhcmVudDtcclxuXHRcdFx0XHRcdHZhciBmaWxlTmFtZSA9IHAuZGF0YS5uYW1lO1xyXG5cclxuXHRcdFx0XHRcdHAuZGF0YSA9IHtcclxuXHRcdFx0XHRcdFx0ZmlsZTogcC5kYXRhLmZpbGVcclxuXHRcdFx0XHRcdH07XHJcblxyXG5cdFx0XHRcdFx0Ly8gRG9lcyB0aGlzIGhhdmUgYSBkYXRhLXVyaSB0byB1cGxvYWQgYXMgYSBmaWxlP1xyXG5cdFx0XHRcdFx0aWYgKHR5cGVvZiAocC5kYXRhLmZpbGUpID09PSAnc3RyaW5nJykge1xyXG5cdFx0XHRcdFx0XHRwLmRhdGEuZmlsZSA9IGhlbGxvLnV0aWxzLnRvQmxvYihwLmRhdGEuZmlsZSk7XHJcblx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0Y2FsbGJhY2soJ2h0dHBzOi8vYXBpLWNvbnRlbnQuZHJvcGJveC5jb20vMS9maWxlc19wdXQvYXV0by8nICsgcGF0aCArICcvJyArIGZpbGVOYW1lKTtcclxuXHRcdFx0XHR9LFxyXG5cclxuXHRcdFx0XHQnbWUvZm9sZGVycyc6IGZ1bmN0aW9uKHAsIGNhbGxiYWNrKSB7XHJcblxyXG5cdFx0XHRcdFx0dmFyIG5hbWUgPSBwLmRhdGEubmFtZTtcclxuXHRcdFx0XHRcdHAuZGF0YSA9IHt9O1xyXG5cclxuXHRcdFx0XHRcdGNhbGxiYWNrKCdmaWxlb3BzL2NyZWF0ZV9mb2xkZXI/cm9vdD1Ae3Jvb3R8c2FuZGJveH0mJyArIGhlbGxvLnV0aWxzLnBhcmFtKHtcclxuXHRcdFx0XHRcdFx0cGF0aDogbmFtZVxyXG5cdFx0XHRcdFx0fSkpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSxcclxuXHJcblx0XHRcdC8vIE1hcCBERUxFVEUgcmVxdWVzdHNcclxuXHRcdFx0ZGVsOiB7XHJcblx0XHRcdFx0J21lL2ZpbGVzJzogJ2ZpbGVvcHMvZGVsZXRlP3Jvb3Q9QHtyb290fHNhbmRib3h9JnBhdGg9QHtpZH0nLFxyXG5cdFx0XHRcdCdtZS9mb2xkZXInOiAnZmlsZW9wcy9kZWxldGU/cm9vdD1Ae3Jvb3R8c2FuZGJveH0mcGF0aD1Ae2lkfSdcclxuXHRcdFx0fSxcclxuXHJcblx0XHRcdHdyYXA6IHtcclxuXHRcdFx0XHRtZTogZnVuY3Rpb24obykge1xyXG5cdFx0XHRcdFx0Zm9ybWF0RXJyb3Iobyk7XHJcblx0XHRcdFx0XHRpZiAoIW8udWlkKSB7XHJcblx0XHRcdFx0XHRcdHJldHVybiBvO1xyXG5cdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdG8ubmFtZSA9IG8uZGlzcGxheV9uYW1lO1xyXG5cdFx0XHRcdFx0dmFyIG0gPSBvLm5hbWUuc3BsaXQoJyAnKTtcclxuXHRcdFx0XHRcdG8uZmlyc3RfbmFtZSA9IG0uc2hpZnQoKTtcclxuXHRcdFx0XHRcdG8ubGFzdF9uYW1lID0gbS5qb2luKCcgJyk7XHJcblx0XHRcdFx0XHRvLmlkID0gby51aWQ7XHJcblx0XHRcdFx0XHRkZWxldGUgby51aWQ7XHJcblx0XHRcdFx0XHRkZWxldGUgby5kaXNwbGF5X25hbWU7XHJcblx0XHRcdFx0XHRyZXR1cm4gbztcclxuXHRcdFx0XHR9LFxyXG5cclxuXHRcdFx0XHQnZGVmYXVsdCc6IGZ1bmN0aW9uKG8sIGhlYWRlcnMsIHJlcSkge1xyXG5cdFx0XHRcdFx0Zm9ybWF0RXJyb3Iobyk7XHJcblx0XHRcdFx0XHRpZiAoby5pc19kaXIgJiYgby5jb250ZW50cykge1xyXG5cdFx0XHRcdFx0XHRvLmRhdGEgPSBvLmNvbnRlbnRzO1xyXG5cdFx0XHRcdFx0XHRkZWxldGUgby5jb250ZW50cztcclxuXHJcblx0XHRcdFx0XHRcdG8uZGF0YS5mb3JFYWNoKGZ1bmN0aW9uKGl0ZW0pIHtcclxuXHRcdFx0XHRcdFx0XHRpdGVtLnJvb3QgPSBvLnJvb3Q7XHJcblx0XHRcdFx0XHRcdFx0Zm9ybWF0RmlsZShpdGVtLCBoZWFkZXJzLCByZXEpO1xyXG5cdFx0XHRcdFx0XHR9KTtcclxuXHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHRmb3JtYXRGaWxlKG8sIGhlYWRlcnMsIHJlcSk7XHJcblxyXG5cdFx0XHRcdFx0aWYgKG8uaXNfZGVsZXRlZCkge1xyXG5cdFx0XHRcdFx0XHRvLnN1Y2Nlc3MgPSB0cnVlO1xyXG5cdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdHJldHVybiBvO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSxcclxuXHJcblx0XHRcdC8vIERvZXNuJ3QgcmV0dXJuIHRoZSBDT1JTIGhlYWRlcnNcclxuXHRcdFx0eGhyOiBmdW5jdGlvbihwKSB7XHJcblxyXG5cdFx0XHRcdC8vIFRoZSBwcm94eSBzdXBwb3J0cyBhbGxvdy1jcm9zcy1vcmlnaW4tcmVzb3VyY2VcclxuXHRcdFx0XHQvLyBBbGFzIHRoYXQncyB0aGUgb25seSB0aGluZyB3ZSdyZSB1c2luZy5cclxuXHRcdFx0XHRpZiAocC5kYXRhICYmIHAuZGF0YS5maWxlKSB7XHJcblx0XHRcdFx0XHR2YXIgZmlsZSA9IHAuZGF0YS5maWxlO1xyXG5cdFx0XHRcdFx0aWYgKGZpbGUpIHtcclxuXHRcdFx0XHRcdFx0aWYgKGZpbGUuZmlsZXMpIHtcclxuXHRcdFx0XHRcdFx0XHRwLmRhdGEgPSBmaWxlLmZpbGVzWzBdO1xyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdGVsc2Uge1xyXG5cdFx0XHRcdFx0XHRcdHAuZGF0YSA9IGZpbGU7XHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdGlmIChwLm1ldGhvZCA9PT0gJ2RlbGV0ZScpIHtcclxuXHRcdFx0XHRcdHAubWV0aG9kID0gJ3Bvc3QnO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0cmV0dXJuIHRydWU7XHJcblx0XHRcdH0sXHJcblxyXG5cdFx0XHRmb3JtOiBmdW5jdGlvbihwLCBxcykge1xyXG5cdFx0XHRcdGRlbGV0ZSBxcy5zdGF0ZTtcclxuXHRcdFx0XHRkZWxldGUgcXMucmVkaXJlY3RfdXJpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fSk7XHJcblxyXG5cdGZ1bmN0aW9uIGZvcm1hdEVycm9yKG8pIHtcclxuXHRcdGlmIChvICYmICdlcnJvcicgaW4gbykge1xyXG5cdFx0XHRvLmVycm9yID0ge1xyXG5cdFx0XHRcdGNvZGU6ICdzZXJ2ZXJfZXJyb3InLFxyXG5cdFx0XHRcdG1lc3NhZ2U6IG8uZXJyb3IubWVzc2FnZSB8fCBvLmVycm9yXHJcblx0XHRcdH07XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRmdW5jdGlvbiBmb3JtYXRGaWxlKG8sIGhlYWRlcnMsIHJlcSkge1xyXG5cclxuXHRcdGlmICh0eXBlb2YgbyAhPT0gJ29iamVjdCcgfHxcclxuXHRcdFx0KHR5cGVvZiBCbG9iICE9PSAndW5kZWZpbmVkJyAmJiBvIGluc3RhbmNlb2YgQmxvYikgfHxcclxuXHRcdFx0KHR5cGVvZiBBcnJheUJ1ZmZlciAhPT0gJ3VuZGVmaW5lZCcgJiYgbyBpbnN0YW5jZW9mIEFycmF5QnVmZmVyKSkge1xyXG5cdFx0XHQvLyBUaGlzIGlzIGEgZmlsZSwgbGV0IGl0IHRocm91Z2ggdW5mb3JtYXR0ZWRcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmICgnZXJyb3InIGluIG8pIHtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cclxuXHRcdHZhciBwYXRoID0gKG8ucm9vdCAhPT0gJ2FwcF9mb2xkZXInID8gby5yb290IDogJycpICsgby5wYXRoLnJlcGxhY2UoL1xcJi9nLCAnJTI2Jyk7XHJcblx0XHRwYXRoID0gcGF0aC5yZXBsYWNlKC9eXFwvLywgJycpO1xyXG5cdFx0aWYgKG8udGh1bWJfZXhpc3RzKSB7XHJcblx0XHRcdG8udGh1bWJuYWlsID0gcmVxLm9hdXRoX3Byb3h5ICsgJz9wYXRoPScgK1xyXG5cdFx0XHRlbmNvZGVVUklDb21wb25lbnQoJ2h0dHBzOi8vYXBpLWNvbnRlbnQuZHJvcGJveC5jb20vMS90aHVtYm5haWxzL2F1dG8vJyArIHBhdGggKyAnP2Zvcm1hdD1qcGVnJnNpemU9bScpICsgJyZhY2Nlc3NfdG9rZW49JyArIHJlcS5vcHRpb25zLmFjY2Vzc190b2tlbjtcclxuXHRcdH1cclxuXHJcblx0XHRvLnR5cGUgPSAoby5pc19kaXIgPyAnZm9sZGVyJyA6IG8ubWltZV90eXBlKTtcclxuXHRcdG8ubmFtZSA9IG8ucGF0aC5yZXBsYWNlKC8uKlxcLy9nLCAnJyk7XHJcblx0XHRpZiAoby5pc19kaXIpIHtcclxuXHRcdFx0by5maWxlcyA9IHBhdGgucmVwbGFjZSgvXlxcLy8sICcnKTtcclxuXHRcdH1cclxuXHRcdGVsc2Uge1xyXG5cdFx0XHRvLmRvd25sb2FkTGluayA9IGhlbGxvLnNldHRpbmdzLm9hdXRoX3Byb3h5ICsgJz9wYXRoPScgK1xyXG5cdFx0XHRlbmNvZGVVUklDb21wb25lbnQoJ2h0dHBzOi8vYXBpLWNvbnRlbnQuZHJvcGJveC5jb20vMS9maWxlcy9hdXRvLycgKyBwYXRoKSArICcmYWNjZXNzX3Rva2VuPScgKyByZXEub3B0aW9ucy5hY2Nlc3NfdG9rZW47XHJcblx0XHRcdG8uZmlsZSA9ICdodHRwczovL2FwaS1jb250ZW50LmRyb3Bib3guY29tLzEvZmlsZXMvYXV0by8nICsgcGF0aDtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAoIW8uaWQpIHtcclxuXHRcdFx0by5pZCA9IG8ucGF0aC5yZXBsYWNlKC9eXFwvLywgJycpO1xyXG5cdFx0fVxyXG5cclxuXHRcdC8vIE8ubWVkaWEgPSAnaHR0cHM6Ly9hcGktY29udGVudC5kcm9wYm94LmNvbS8xL2ZpbGVzLycgKyBwYXRoO1xyXG5cdH1cclxuXHJcblx0ZnVuY3Rpb24gcmVxKHN0cikge1xyXG5cdFx0cmV0dXJuIGZ1bmN0aW9uKHAsIGNiKSB7XHJcblx0XHRcdGRlbGV0ZSBwLnF1ZXJ5LmxpbWl0O1xyXG5cdFx0XHRjYihzdHIpO1xyXG5cdFx0fTtcclxuXHR9XHJcblxyXG59KShoZWxsbyk7XHJcblxyXG4oZnVuY3Rpb24oaGVsbG8pIHtcclxuXHJcblx0aGVsbG8uaW5pdCh7XHJcblxyXG5cdFx0ZmFjZWJvb2s6IHtcclxuXHJcblx0XHRcdG5hbWU6ICdGYWNlYm9vaycsXHJcblxyXG5cdFx0XHQvLyBTRUUgaHR0cHM6Ly9kZXZlbG9wZXJzLmZhY2Vib29rLmNvbS9kb2NzL2ZhY2Vib29rLWxvZ2luL21hbnVhbGx5LWJ1aWxkLWEtbG9naW4tZmxvdy92Mi4xXHJcblx0XHRcdG9hdXRoOiB7XHJcblx0XHRcdFx0dmVyc2lvbjogMixcclxuXHRcdFx0XHRhdXRoOiAnaHR0cHM6Ly93d3cuZmFjZWJvb2suY29tL2RpYWxvZy9vYXV0aC8nLFxyXG5cdFx0XHRcdGdyYW50OiAnaHR0cHM6Ly9ncmFwaC5mYWNlYm9vay5jb20vb2F1dGgvYWNjZXNzX3Rva2VuJ1xyXG5cdFx0XHR9LFxyXG5cclxuXHRcdFx0Ly8gQXV0aG9yaXphdGlvbiBzY29wZXNcclxuXHRcdFx0c2NvcGU6IHtcclxuXHRcdFx0XHRiYXNpYzogJ3B1YmxpY19wcm9maWxlJyxcclxuXHRcdFx0XHRlbWFpbDogJ2VtYWlsJyxcclxuXHRcdFx0XHRzaGFyZTogJ3VzZXJfcG9zdHMnLFxyXG5cdFx0XHRcdGJpcnRoZGF5OiAndXNlcl9iaXJ0aGRheScsXHJcblx0XHRcdFx0ZXZlbnRzOiAndXNlcl9ldmVudHMnLFxyXG5cdFx0XHRcdHBob3RvczogJ3VzZXJfcGhvdG9zJyxcclxuXHRcdFx0XHR2aWRlb3M6ICd1c2VyX3ZpZGVvcycsXHJcblx0XHRcdFx0ZnJpZW5kczogJ3VzZXJfZnJpZW5kcycsXHJcblx0XHRcdFx0ZmlsZXM6ICd1c2VyX3Bob3Rvcyx1c2VyX3ZpZGVvcycsXHJcblx0XHRcdFx0cHVibGlzaF9maWxlczogJ3VzZXJfcGhvdG9zLHVzZXJfdmlkZW9zLHB1Ymxpc2hfYWN0aW9ucycsXHJcblx0XHRcdFx0cHVibGlzaDogJ3B1Ymxpc2hfYWN0aW9ucycsXHJcblxyXG5cdFx0XHRcdC8vIERlcHJlY2F0ZWQgaW4gdjIuMFxyXG5cdFx0XHRcdC8vIENyZWF0ZV9ldmVudFx0OiAnY3JlYXRlX2V2ZW50JyxcclxuXHJcblx0XHRcdFx0b2ZmbGluZV9hY2Nlc3M6ICcnXHJcblx0XHRcdH0sXHJcblxyXG5cdFx0XHQvLyBSZWZyZXNoIHRoZSBhY2Nlc3NfdG9rZW5cclxuXHRcdFx0cmVmcmVzaDogZmFsc2UsXHJcblxyXG5cdFx0XHRsb2dpbjogZnVuY3Rpb24ocCkge1xyXG5cclxuXHRcdFx0XHQvLyBSZWF1dGhlbnRpY2F0ZVxyXG5cdFx0XHRcdC8vIGh0dHBzOi8vZGV2ZWxvcGVycy5mYWNlYm9vay5jb20vZG9jcy9mYWNlYm9vay1sb2dpbi9yZWF1dGhlbnRpY2F0aW9uXHJcblx0XHRcdFx0aWYgKHAub3B0aW9ucy5mb3JjZSkge1xyXG5cdFx0XHRcdFx0cC5xcy5hdXRoX3R5cGUgPSAncmVhdXRoZW50aWNhdGUnO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0Ly8gU2V0IHRoZSBkaXNwbGF5IHZhbHVlXHJcblx0XHRcdFx0cC5xcy5kaXNwbGF5ID0gcC5vcHRpb25zLmRpc3BsYXkgfHwgJ3BvcHVwJztcclxuXHRcdFx0fSxcclxuXHJcblx0XHRcdGxvZ291dDogZnVuY3Rpb24oY2FsbGJhY2ssIG9wdGlvbnMpIHtcclxuXHRcdFx0XHQvLyBBc3NpZ24gY2FsbGJhY2sgdG8gYSBnbG9iYWwgaGFuZGxlclxyXG5cdFx0XHRcdHZhciBjYWxsYmFja0lEID0gaGVsbG8udXRpbHMuZ2xvYmFsRXZlbnQoY2FsbGJhY2spO1xyXG5cdFx0XHRcdHZhciByZWRpcmVjdCA9IGVuY29kZVVSSUNvbXBvbmVudChoZWxsby5zZXR0aW5ncy5yZWRpcmVjdF91cmkgKyAnPycgKyBoZWxsby51dGlscy5wYXJhbSh7Y2FsbGJhY2s6Y2FsbGJhY2tJRCwgcmVzdWx0OiBKU09OLnN0cmluZ2lmeSh7Zm9yY2U6dHJ1ZX0pLCBzdGF0ZTogJ3t9J30pKTtcclxuXHRcdFx0XHR2YXIgdG9rZW4gPSAob3B0aW9ucy5hdXRoUmVzcG9uc2UgfHwge30pLmFjY2Vzc190b2tlbjtcclxuXHRcdFx0XHRoZWxsby51dGlscy5pZnJhbWUoJ2h0dHBzOi8vd3d3LmZhY2Vib29rLmNvbS9sb2dvdXQucGhwP25leHQ9JyArIHJlZGlyZWN0ICsgJyZhY2Nlc3NfdG9rZW49JyArIHRva2VuKTtcclxuXHJcblx0XHRcdFx0Ly8gUG9zc2libGUgcmVzcG9uc2VzOlxyXG5cdFx0XHRcdC8vIFN0cmluZyBVUkxcdC0gaGVsbG8ubG9nb3V0IHNob3VsZCBoYW5kbGUgdGhlIGxvZ291dFxyXG5cdFx0XHRcdC8vIFVuZGVmaW5lZFx0LSB0aGlzIGZ1bmN0aW9uIHdpbGwgaGFuZGxlIHRoZSBjYWxsYmFja1xyXG5cdFx0XHRcdC8vIFRydWUgLSB0aHJvdyBhIHN1Y2Nlc3MsIHRoaXMgY2FsbGJhY2sgaXNuJ3QgaGFuZGxpbmcgdGhlIGNhbGxiYWNrXHJcblx0XHRcdFx0Ly8gRmFsc2UgLSB0aHJvdyBhIGVycm9yXHJcblx0XHRcdFx0aWYgKCF0b2tlbikge1xyXG5cdFx0XHRcdFx0Ly8gSWYgdGhlcmUgaXNuJ3QgYSB0b2tlbiwgdGhlIGFib3ZlIHdvbnQgcmV0dXJuIGEgcmVzcG9uc2UsIHNvIGxldHMgdHJpZ2dlciBhIHJlc3BvbnNlXHJcblx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9LFxyXG5cclxuXHRcdFx0Ly8gQVBJIEJhc2UgVVJMXHJcblx0XHRcdGJhc2U6ICdodHRwczovL2dyYXBoLmZhY2Vib29rLmNvbS92Mi43LycsXHJcblxyXG5cdFx0XHQvLyBNYXAgR0VUIHJlcXVlc3RzXHJcblx0XHRcdGdldDoge1xyXG5cdFx0XHRcdG1lOiAnbWU/ZmllbGRzPWVtYWlsLGZpcnN0X25hbWUsbGFzdF9uYW1lLG5hbWUsdGltZXpvbmUsdmVyaWZpZWQnLFxyXG5cdFx0XHRcdCdtZS9mcmllbmRzJzogJ21lL2ZyaWVuZHMnLFxyXG5cdFx0XHRcdCdtZS9mb2xsb3dpbmcnOiAnbWUvZnJpZW5kcycsXHJcblx0XHRcdFx0J21lL2ZvbGxvd2Vycyc6ICdtZS9mcmllbmRzJyxcclxuXHRcdFx0XHQnbWUvc2hhcmUnOiAnbWUvZmVlZCcsXHJcblx0XHRcdFx0J21lL2xpa2UnOiAnbWUvbGlrZXMnLFxyXG5cdFx0XHRcdCdtZS9maWxlcyc6ICdtZS9hbGJ1bXMnLFxyXG5cdFx0XHRcdCdtZS9hbGJ1bXMnOiAnbWUvYWxidW1zP2ZpZWxkcz1jb3Zlcl9waG90byxuYW1lJyxcclxuXHRcdFx0XHQnbWUvYWxidW0nOiAnQHtpZH0vcGhvdG9zP2ZpZWxkcz1waWN0dXJlJyxcclxuXHRcdFx0XHQnbWUvcGhvdG9zJzogJ21lL3Bob3RvcycsXHJcblx0XHRcdFx0J21lL3Bob3RvJzogJ0B7aWR9JyxcclxuXHRcdFx0XHQnZnJpZW5kL2FsYnVtcyc6ICdAe2lkfS9hbGJ1bXMnLFxyXG5cdFx0XHRcdCdmcmllbmQvcGhvdG9zJzogJ0B7aWR9L3Bob3RvcydcclxuXHJcblx0XHRcdFx0Ly8gUGFnaW5hdGlvblxyXG5cdFx0XHRcdC8vIEh0dHBzOi8vZGV2ZWxvcGVycy5mYWNlYm9vay5jb20vZG9jcy9yZWZlcmVuY2UvYXBpL3BhZ2luYXRpb24vXHJcblx0XHRcdH0sXHJcblxyXG5cdFx0XHQvLyBNYXAgUE9TVCByZXF1ZXN0c1xyXG5cdFx0XHRwb3N0OiB7XHJcblx0XHRcdFx0J21lL3NoYXJlJzogJ21lL2ZlZWQnLFxyXG5cdFx0XHRcdCdtZS9waG90byc6ICdAe2lkfSdcclxuXHJcblx0XHRcdFx0Ly8gSHR0cHM6Ly9kZXZlbG9wZXJzLmZhY2Vib29rLmNvbS9kb2NzL2dyYXBoLWFwaS9yZWZlcmVuY2UvdjIuMi9vYmplY3QvbGlrZXMvXHJcblx0XHRcdH0sXHJcblxyXG5cdFx0XHR3cmFwOiB7XHJcblx0XHRcdFx0bWU6IGZvcm1hdFVzZXIsXHJcblx0XHRcdFx0J21lL2ZyaWVuZHMnOiBmb3JtYXRGcmllbmRzLFxyXG5cdFx0XHRcdCdtZS9mb2xsb3dpbmcnOiBmb3JtYXRGcmllbmRzLFxyXG5cdFx0XHRcdCdtZS9mb2xsb3dlcnMnOiBmb3JtYXRGcmllbmRzLFxyXG5cdFx0XHRcdCdtZS9hbGJ1bXMnOiBmb3JtYXQsXHJcblx0XHRcdFx0J21lL3Bob3Rvcyc6IGZvcm1hdCxcclxuXHRcdFx0XHQnbWUvZmlsZXMnOiBmb3JtYXQsXHJcblx0XHRcdFx0J2RlZmF1bHQnOiBmb3JtYXRcclxuXHRcdFx0fSxcclxuXHJcblx0XHRcdC8vIFNwZWNpYWwgcmVxdWlyZW1lbnRzIGZvciBoYW5kbGluZyBYSFJcclxuXHRcdFx0eGhyOiBmdW5jdGlvbihwLCBxcykge1xyXG5cdFx0XHRcdGlmIChwLm1ldGhvZCA9PT0gJ2dldCcgfHwgcC5tZXRob2QgPT09ICdwb3N0Jykge1xyXG5cdFx0XHRcdFx0cXMuc3VwcHJlc3NfcmVzcG9uc2VfY29kZXMgPSB0cnVlO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0Ly8gSXMgdGhpcyBhIHBvc3Qgd2l0aCBhIGRhdGEtdXJpP1xyXG5cdFx0XHRcdGlmIChwLm1ldGhvZCA9PT0gJ3Bvc3QnICYmIHAuZGF0YSAmJiB0eXBlb2YgKHAuZGF0YS5maWxlKSA9PT0gJ3N0cmluZycpIHtcclxuXHRcdFx0XHRcdC8vIENvbnZlcnQgdGhlIERhdGEtVVJJIHRvIGEgQmxvYlxyXG5cdFx0XHRcdFx0cC5kYXRhLmZpbGUgPSBoZWxsby51dGlscy50b0Jsb2IocC5kYXRhLmZpbGUpO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0cmV0dXJuIHRydWU7XHJcblx0XHRcdH0sXHJcblxyXG5cdFx0XHQvLyBTcGVjaWFsIHJlcXVpcmVtZW50cyBmb3IgaGFuZGxpbmcgSlNPTlAgZmFsbGJhY2tcclxuXHRcdFx0anNvbnA6IGZ1bmN0aW9uKHAsIHFzKSB7XHJcblx0XHRcdFx0dmFyIG0gPSBwLm1ldGhvZDtcclxuXHRcdFx0XHRpZiAobSAhPT0gJ2dldCcgJiYgIWhlbGxvLnV0aWxzLmhhc0JpbmFyeShwLmRhdGEpKSB7XHJcblx0XHRcdFx0XHRwLmRhdGEubWV0aG9kID0gbTtcclxuXHRcdFx0XHRcdHAubWV0aG9kID0gJ2dldCc7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdGVsc2UgaWYgKHAubWV0aG9kID09PSAnZGVsZXRlJykge1xyXG5cdFx0XHRcdFx0cXMubWV0aG9kID0gJ2RlbGV0ZSc7XHJcblx0XHRcdFx0XHRwLm1ldGhvZCA9ICdwb3N0JztcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0sXHJcblxyXG5cdFx0XHQvLyBTcGVjaWFsIHJlcXVpcmVtZW50cyBmb3IgaWZyYW1lIGZvcm0gaGFja1xyXG5cdFx0XHRmb3JtOiBmdW5jdGlvbihwKSB7XHJcblx0XHRcdFx0cmV0dXJuIHtcclxuXHRcdFx0XHRcdC8vIEZpcmUgdGhlIGNhbGxiYWNrIG9ubG9hZFxyXG5cdFx0XHRcdFx0Y2FsbGJhY2tvbmxvYWQ6IHRydWVcclxuXHRcdFx0XHR9O1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fSk7XHJcblxyXG5cdHZhciBiYXNlID0gJ2h0dHBzOi8vZ3JhcGguZmFjZWJvb2suY29tLyc7XHJcblxyXG5cdGZ1bmN0aW9uIGZvcm1hdFVzZXIobykge1xyXG5cdFx0aWYgKG8uaWQpIHtcclxuXHRcdFx0by50aHVtYm5haWwgPSBvLnBpY3R1cmUgPSAnaHR0cHM6Ly9ncmFwaC5mYWNlYm9vay5jb20vJyArIG8uaWQgKyAnL3BpY3R1cmUnO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBvO1xyXG5cdH1cclxuXHJcblx0ZnVuY3Rpb24gZm9ybWF0RnJpZW5kcyhvKSB7XHJcblx0XHRpZiAoJ2RhdGEnIGluIG8pIHtcclxuXHRcdFx0by5kYXRhLmZvckVhY2goZm9ybWF0VXNlcik7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIG87XHJcblx0fVxyXG5cclxuXHRmdW5jdGlvbiBmb3JtYXQobywgaGVhZGVycywgcmVxKSB7XHJcblx0XHRpZiAodHlwZW9mIG8gPT09ICdib29sZWFuJykge1xyXG5cdFx0XHRvID0ge3N1Y2Nlc3M6IG99O1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmIChvICYmICdkYXRhJyBpbiBvKSB7XHJcblx0XHRcdHZhciB0b2tlbiA9IHJlcS5xdWVyeS5hY2Nlc3NfdG9rZW47XHJcblxyXG5cdFx0XHRpZiAoIShvLmRhdGEgaW5zdGFuY2VvZiBBcnJheSkpIHtcclxuXHRcdFx0XHR2YXIgZGF0YSA9IG8uZGF0YTtcclxuXHRcdFx0XHRkZWxldGUgby5kYXRhO1xyXG5cdFx0XHRcdG8uZGF0YSA9IFtkYXRhXTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0by5kYXRhLmZvckVhY2goZnVuY3Rpb24oZCkge1xyXG5cclxuXHRcdFx0XHRpZiAoZC5waWN0dXJlKSB7XHJcblx0XHRcdFx0XHRkLnRodW1ibmFpbCA9IGQucGljdHVyZTtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdGQucGljdHVyZXMgPSAoZC5pbWFnZXMgfHwgW10pXHJcblx0XHRcdFx0XHQuc29ydChmdW5jdGlvbihhLCBiKSB7XHJcblx0XHRcdFx0XHRcdHJldHVybiBhLndpZHRoIC0gYi53aWR0aDtcclxuXHRcdFx0XHRcdH0pO1xyXG5cclxuXHRcdFx0XHRpZiAoZC5jb3Zlcl9waG90byAmJiBkLmNvdmVyX3Bob3RvLmlkKSB7XHJcblx0XHRcdFx0XHRkLnRodW1ibmFpbCA9IGJhc2UgKyBkLmNvdmVyX3Bob3RvLmlkICsgJy9waWN0dXJlP2FjY2Vzc190b2tlbj0nICsgdG9rZW47XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRpZiAoZC50eXBlID09PSAnYWxidW0nKSB7XHJcblx0XHRcdFx0XHRkLmZpbGVzID0gZC5waG90b3MgPSBiYXNlICsgZC5pZCArICcvcGhvdG9zJztcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdGlmIChkLmNhbl91cGxvYWQpIHtcclxuXHRcdFx0XHRcdGQudXBsb2FkX2xvY2F0aW9uID0gYmFzZSArIGQuaWQgKyAnL3Bob3Rvcyc7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9KTtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gbztcclxuXHR9XHJcblxyXG59KShoZWxsbyk7XHJcblxyXG4oZnVuY3Rpb24oaGVsbG8pIHtcclxuXHJcblx0aGVsbG8uaW5pdCh7XHJcblxyXG5cdFx0ZmxpY2tyOiB7XHJcblxyXG5cdFx0XHRuYW1lOiAnRmxpY2tyJyxcclxuXHJcblx0XHRcdC8vIEVuc3VyZSB0aGF0IHlvdSBkZWZpbmUgYW4gb2F1dGhfcHJveHlcclxuXHRcdFx0b2F1dGg6IHtcclxuXHRcdFx0XHR2ZXJzaW9uOiAnMS4wYScsXHJcblx0XHRcdFx0YXV0aDogJ2h0dHBzOi8vd3d3LmZsaWNrci5jb20vc2VydmljZXMvb2F1dGgvYXV0aG9yaXplP3Blcm1zPXJlYWQnLFxyXG5cdFx0XHRcdHJlcXVlc3Q6ICdodHRwczovL3d3dy5mbGlja3IuY29tL3NlcnZpY2VzL29hdXRoL3JlcXVlc3RfdG9rZW4nLFxyXG5cdFx0XHRcdHRva2VuOiAnaHR0cHM6Ly93d3cuZmxpY2tyLmNvbS9zZXJ2aWNlcy9vYXV0aC9hY2Nlc3NfdG9rZW4nXHJcblx0XHRcdH0sXHJcblxyXG5cdFx0XHQvLyBBUEkgYmFzZSBVUkxcclxuXHRcdFx0YmFzZTogJ2h0dHBzOi8vYXBpLmZsaWNrci5jb20vc2VydmljZXMvcmVzdCcsXHJcblxyXG5cdFx0XHQvLyBNYXAgR0VUIHJlc3F1ZXN0c1xyXG5cdFx0XHRnZXQ6IHtcclxuXHRcdFx0XHRtZTogc2lnbignZmxpY2tyLnBlb3BsZS5nZXRJbmZvJyksXHJcblx0XHRcdFx0J21lL2ZyaWVuZHMnOiBzaWduKCdmbGlja3IuY29udGFjdHMuZ2V0TGlzdCcsIHtwZXJfcGFnZTonQHtsaW1pdHw1MH0nfSksXHJcblx0XHRcdFx0J21lL2ZvbGxvd2luZyc6IHNpZ24oJ2ZsaWNrci5jb250YWN0cy5nZXRMaXN0Jywge3Blcl9wYWdlOidAe2xpbWl0fDUwfSd9KSxcclxuXHRcdFx0XHQnbWUvZm9sbG93ZXJzJzogc2lnbignZmxpY2tyLmNvbnRhY3RzLmdldExpc3QnLCB7cGVyX3BhZ2U6J0B7bGltaXR8NTB9J30pLFxyXG5cdFx0XHRcdCdtZS9hbGJ1bXMnOiBzaWduKCdmbGlja3IucGhvdG9zZXRzLmdldExpc3QnLCB7cGVyX3BhZ2U6J0B7bGltaXR8NTB9J30pLFxyXG5cdFx0XHRcdCdtZS9hbGJ1bSc6IHNpZ24oJ2ZsaWNrci5waG90b3NldHMuZ2V0UGhvdG9zJywge3Bob3Rvc2V0X2lkOiAnQHtpZH0nfSksXHJcblx0XHRcdFx0J21lL3Bob3Rvcyc6IHNpZ24oJ2ZsaWNrci5wZW9wbGUuZ2V0UGhvdG9zJywge3Blcl9wYWdlOidAe2xpbWl0fDUwfSd9KVxyXG5cdFx0XHR9LFxyXG5cclxuXHRcdFx0d3JhcDoge1xyXG5cdFx0XHRcdG1lOiBmdW5jdGlvbihvKSB7XHJcblx0XHRcdFx0XHRmb3JtYXRFcnJvcihvKTtcclxuXHRcdFx0XHRcdG8gPSBjaGVja1Jlc3BvbnNlKG8sICdwZXJzb24nKTtcclxuXHRcdFx0XHRcdGlmIChvLmlkKSB7XHJcblx0XHRcdFx0XHRcdGlmIChvLnJlYWxuYW1lKSB7XHJcblx0XHRcdFx0XHRcdFx0by5uYW1lID0gby5yZWFsbmFtZS5fY29udGVudDtcclxuXHRcdFx0XHRcdFx0XHR2YXIgbSA9IG8ubmFtZS5zcGxpdCgnICcpO1xyXG5cdFx0XHRcdFx0XHRcdG8uZmlyc3RfbmFtZSA9IG0uc2hpZnQoKTtcclxuXHRcdFx0XHRcdFx0XHRvLmxhc3RfbmFtZSA9IG0uam9pbignICcpO1xyXG5cdFx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0XHRvLnRodW1ibmFpbCA9IGdldEJ1ZGR5SWNvbihvLCAnbCcpO1xyXG5cdFx0XHRcdFx0XHRvLnBpY3R1cmUgPSBnZXRCdWRkeUljb24obywgJ2wnKTtcclxuXHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHRyZXR1cm4gbztcclxuXHRcdFx0XHR9LFxyXG5cclxuXHRcdFx0XHQnbWUvZnJpZW5kcyc6IGZvcm1hdEZyaWVuZHMsXHJcblx0XHRcdFx0J21lL2ZvbGxvd2Vycyc6IGZvcm1hdEZyaWVuZHMsXHJcblx0XHRcdFx0J21lL2ZvbGxvd2luZyc6IGZvcm1hdEZyaWVuZHMsXHJcblx0XHRcdFx0J21lL2FsYnVtcyc6IGZ1bmN0aW9uKG8pIHtcclxuXHRcdFx0XHRcdGZvcm1hdEVycm9yKG8pO1xyXG5cdFx0XHRcdFx0byA9IGNoZWNrUmVzcG9uc2UobywgJ3Bob3Rvc2V0cycpO1xyXG5cdFx0XHRcdFx0cGFnaW5nKG8pO1xyXG5cdFx0XHRcdFx0aWYgKG8ucGhvdG9zZXQpIHtcclxuXHRcdFx0XHRcdFx0by5kYXRhID0gby5waG90b3NldDtcclxuXHRcdFx0XHRcdFx0by5kYXRhLmZvckVhY2goZnVuY3Rpb24oaXRlbSkge1xyXG5cdFx0XHRcdFx0XHRcdGl0ZW0ubmFtZSA9IGl0ZW0udGl0bGUuX2NvbnRlbnQ7XHJcblx0XHRcdFx0XHRcdFx0aXRlbS5waG90b3MgPSAnaHR0cHM6Ly9hcGkuZmxpY2tyLmNvbS9zZXJ2aWNlcy9yZXN0JyArIGdldEFwaVVybCgnZmxpY2tyLnBob3Rvc2V0cy5nZXRQaG90b3MnLCB7cGhvdG9zZXRfaWQ6IGl0ZW0uaWR9LCB0cnVlKTtcclxuXHRcdFx0XHRcdFx0fSk7XHJcblxyXG5cdFx0XHRcdFx0XHRkZWxldGUgby5waG90b3NldDtcclxuXHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHRyZXR1cm4gbztcclxuXHRcdFx0XHR9LFxyXG5cclxuXHRcdFx0XHQnbWUvcGhvdG9zJzogZnVuY3Rpb24obykge1xyXG5cdFx0XHRcdFx0Zm9ybWF0RXJyb3Iobyk7XHJcblx0XHRcdFx0XHRyZXR1cm4gZm9ybWF0UGhvdG9zKG8pO1xyXG5cdFx0XHRcdH0sXHJcblxyXG5cdFx0XHRcdCdkZWZhdWx0JzogZnVuY3Rpb24obykge1xyXG5cdFx0XHRcdFx0Zm9ybWF0RXJyb3Iobyk7XHJcblx0XHRcdFx0XHRyZXR1cm4gZm9ybWF0UGhvdG9zKG8pO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSxcclxuXHJcblx0XHRcdHhocjogZmFsc2UsXHJcblxyXG5cdFx0XHRqc29ucDogZnVuY3Rpb24ocCwgcXMpIHtcclxuXHRcdFx0XHRpZiAocC5tZXRob2QgPT0gJ2dldCcpIHtcclxuXHRcdFx0XHRcdGRlbGV0ZSBxcy5jYWxsYmFjaztcclxuXHRcdFx0XHRcdHFzLmpzb25jYWxsYmFjayA9IHAuY2FsbGJhY2tJRDtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9KTtcclxuXHJcblx0ZnVuY3Rpb24gZ2V0QXBpVXJsKG1ldGhvZCwgZXh0cmFQYXJhbXMsIHNraXBOZXR3b3JrKSB7XHJcblx0XHR2YXIgdXJsID0gKChza2lwTmV0d29yaykgPyAnJyA6ICdmbGlja3I6JykgK1xyXG5cdFx0XHQnP21ldGhvZD0nICsgbWV0aG9kICtcclxuXHRcdFx0JyZhcGlfa2V5PScgKyBoZWxsby5zZXJ2aWNlcy5mbGlja3IuaWQgK1xyXG5cdFx0XHQnJmZvcm1hdD1qc29uJztcclxuXHRcdGZvciAodmFyIHBhcmFtIGluIGV4dHJhUGFyYW1zKSB7XHJcblx0XHRcdGlmIChleHRyYVBhcmFtcy5oYXNPd25Qcm9wZXJ0eShwYXJhbSkpIHtcclxuXHRcdFx0XHR1cmwgKz0gJyYnICsgcGFyYW0gKyAnPScgKyBleHRyYVBhcmFtc1twYXJhbV07XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gdXJsO1xyXG5cdH1cclxuXHJcblx0Ly8gVGhpcyBpcyBub3QgZXhhY3RseSBuZWF0IGJ1dCBhdm9pZCB0byBjYWxsXHJcblx0Ly8gVGhlIG1ldGhvZCAnZmxpY2tyLnRlc3QubG9naW4nIGZvciBlYWNoIGFwaSBjYWxsXHJcblxyXG5cdGZ1bmN0aW9uIHdpdGhVc2VyKGNiKSB7XHJcblx0XHR2YXIgYXV0aCA9IGhlbGxvLmdldEF1dGhSZXNwb25zZSgnZmxpY2tyJyk7XHJcblx0XHRjYihhdXRoICYmIGF1dGgudXNlcl9uc2lkID8gYXV0aC51c2VyX25zaWQgOiBudWxsKTtcclxuXHR9XHJcblxyXG5cdGZ1bmN0aW9uIHNpZ24odXJsLCBwYXJhbXMpIHtcclxuXHRcdGlmICghcGFyYW1zKSB7XHJcblx0XHRcdHBhcmFtcyA9IHt9O1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBmdW5jdGlvbihwLCBjYWxsYmFjaykge1xyXG5cdFx0XHR3aXRoVXNlcihmdW5jdGlvbih1c2VySWQpIHtcclxuXHRcdFx0XHRwYXJhbXMudXNlcl9pZCA9IHVzZXJJZDtcclxuXHRcdFx0XHRjYWxsYmFjayhnZXRBcGlVcmwodXJsLCBwYXJhbXMsIHRydWUpKTtcclxuXHRcdFx0fSk7XHJcblx0XHR9O1xyXG5cdH1cclxuXHJcblx0ZnVuY3Rpb24gZ2V0QnVkZHlJY29uKHByb2ZpbGUsIHNpemUpIHtcclxuXHRcdHZhciB1cmwgPSAnaHR0cHM6Ly93d3cuZmxpY2tyLmNvbS9pbWFnZXMvYnVkZHlpY29uLmdpZic7XHJcblx0XHRpZiAocHJvZmlsZS5uc2lkICYmIHByb2ZpbGUuaWNvbnNlcnZlciAmJiBwcm9maWxlLmljb25mYXJtKSB7XHJcblx0XHRcdHVybCA9ICdodHRwczovL2Zhcm0nICsgcHJvZmlsZS5pY29uZmFybSArICcuc3RhdGljZmxpY2tyLmNvbS8nICtcclxuXHRcdFx0XHRwcm9maWxlLmljb25zZXJ2ZXIgKyAnLycgK1xyXG5cdFx0XHRcdCdidWRkeWljb25zLycgKyBwcm9maWxlLm5zaWQgK1xyXG5cdFx0XHRcdCgoc2l6ZSkgPyAnXycgKyBzaXplIDogJycpICsgJy5qcGcnO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiB1cmw7XHJcblx0fVxyXG5cclxuXHQvLyBTZWU6IGh0dHBzOi8vd3d3LmZsaWNrci5jb20vc2VydmljZXMvYXBpL21pc2MudXJscy5odG1sXHJcblx0ZnVuY3Rpb24gY3JlYXRlUGhvdG9VcmwoaWQsIGZhcm0sIHNlcnZlciwgc2VjcmV0LCBzaXplKSB7XHJcblx0XHRzaXplID0gKHNpemUpID8gJ18nICsgc2l6ZSA6ICcnO1xyXG5cdFx0cmV0dXJuICdodHRwczovL2Zhcm0nICsgZmFybSArICcuc3RhdGljZmxpY2tyLmNvbS8nICsgc2VydmVyICsgJy8nICsgaWQgKyAnXycgKyBzZWNyZXQgKyBzaXplICsgJy5qcGcnO1xyXG5cdH1cclxuXHJcblx0ZnVuY3Rpb24gZm9ybWF0VXNlcihvKSB7XHJcblx0fVxyXG5cclxuXHRmdW5jdGlvbiBmb3JtYXRFcnJvcihvKSB7XHJcblx0XHRpZiAobyAmJiBvLnN0YXQgJiYgby5zdGF0LnRvTG93ZXJDYXNlKCkgIT0gJ29rJykge1xyXG5cdFx0XHRvLmVycm9yID0ge1xyXG5cdFx0XHRcdGNvZGU6ICdpbnZhbGlkX3JlcXVlc3QnLFxyXG5cdFx0XHRcdG1lc3NhZ2U6IG8ubWVzc2FnZVxyXG5cdFx0XHR9O1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0ZnVuY3Rpb24gZm9ybWF0UGhvdG9zKG8pIHtcclxuXHRcdGlmIChvLnBob3Rvc2V0IHx8IG8ucGhvdG9zKSB7XHJcblx0XHRcdHZhciBzZXQgPSAoJ3Bob3Rvc2V0JyBpbiBvKSA/ICdwaG90b3NldCcgOiAncGhvdG9zJztcclxuXHRcdFx0byA9IGNoZWNrUmVzcG9uc2Uobywgc2V0KTtcclxuXHRcdFx0cGFnaW5nKG8pO1xyXG5cdFx0XHRvLmRhdGEgPSBvLnBob3RvO1xyXG5cdFx0XHRkZWxldGUgby5waG90bztcclxuXHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBvLmRhdGEubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0XHR2YXIgcGhvdG8gPSBvLmRhdGFbaV07XHJcblx0XHRcdFx0cGhvdG8ubmFtZSA9IHBob3RvLnRpdGxlO1xyXG5cdFx0XHRcdHBob3RvLnBpY3R1cmUgPSBjcmVhdGVQaG90b1VybChwaG90by5pZCwgcGhvdG8uZmFybSwgcGhvdG8uc2VydmVyLCBwaG90by5zZWNyZXQsICcnKTtcclxuXHRcdFx0XHRwaG90by5waWN0dXJlcyA9IGNyZWF0ZVBpY3R1cmVzKHBob3RvLmlkLCBwaG90by5mYXJtLCBwaG90by5zZXJ2ZXIsIHBob3RvLnNlY3JldCk7XHJcblx0XHRcdFx0cGhvdG8uc291cmNlID0gY3JlYXRlUGhvdG9VcmwocGhvdG8uaWQsIHBob3RvLmZhcm0sIHBob3RvLnNlcnZlciwgcGhvdG8uc2VjcmV0LCAnYicpO1xyXG5cdFx0XHRcdHBob3RvLnRodW1ibmFpbCA9IGNyZWF0ZVBob3RvVXJsKHBob3RvLmlkLCBwaG90by5mYXJtLCBwaG90by5zZXJ2ZXIsIHBob3RvLnNlY3JldCwgJ20nKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBvO1xyXG5cdH1cclxuXHJcblx0Ly8gU2VlOiBodHRwczovL3d3dy5mbGlja3IuY29tL3NlcnZpY2VzL2FwaS9taXNjLnVybHMuaHRtbFxyXG5cdGZ1bmN0aW9uIGNyZWF0ZVBpY3R1cmVzKGlkLCBmYXJtLCBzZXJ2ZXIsIHNlY3JldCkge1xyXG5cclxuXHRcdHZhciBOT19MSU1JVCA9IDIwNDg7XHJcblx0XHR2YXIgc2l6ZXMgPSBbXHJcblx0XHRcdHtpZDogJ3QnLCBtYXg6IDEwMH0sXHJcblx0XHRcdHtpZDogJ20nLCBtYXg6IDI0MH0sXHJcblx0XHRcdHtpZDogJ24nLCBtYXg6IDMyMH0sXHJcblx0XHRcdHtpZDogJycsIG1heDogNTAwfSxcclxuXHRcdFx0e2lkOiAneicsIG1heDogNjQwfSxcclxuXHRcdFx0e2lkOiAnYycsIG1heDogODAwfSxcclxuXHRcdFx0e2lkOiAnYicsIG1heDogMTAyNH0sXHJcblx0XHRcdHtpZDogJ2gnLCBtYXg6IDE2MDB9LFxyXG5cdFx0XHR7aWQ6ICdrJywgbWF4OiAyMDQ4fSxcclxuXHRcdFx0e2lkOiAnbycsIG1heDogTk9fTElNSVR9XHJcblx0XHRdO1xyXG5cclxuXHRcdHJldHVybiBzaXplcy5tYXAoZnVuY3Rpb24oc2l6ZSkge1xyXG5cdFx0XHRyZXR1cm4ge1xyXG5cdFx0XHRcdHNvdXJjZTogY3JlYXRlUGhvdG9VcmwoaWQsIGZhcm0sIHNlcnZlciwgc2VjcmV0LCBzaXplLmlkKSxcclxuXHJcblx0XHRcdFx0Ly8gTm90ZTogdGhpcyBpcyBhIGd1ZXNzIHRoYXQncyBhbG1vc3QgY2VydGFpbiB0byBiZSB3cm9uZyAodW5sZXNzIHNxdWFyZSBzb3VyY2UpXHJcblx0XHRcdFx0d2lkdGg6IHNpemUubWF4LFxyXG5cdFx0XHRcdGhlaWdodDogc2l6ZS5tYXhcclxuXHRcdFx0fTtcclxuXHRcdH0pO1xyXG5cdH1cclxuXHJcblx0ZnVuY3Rpb24gY2hlY2tSZXNwb25zZShvLCBrZXkpIHtcclxuXHJcblx0XHRpZiAoa2V5IGluIG8pIHtcclxuXHRcdFx0byA9IG9ba2V5XTtcclxuXHRcdH1cclxuXHRcdGVsc2UgaWYgKCEoJ2Vycm9yJyBpbiBvKSkge1xyXG5cdFx0XHRvLmVycm9yID0ge1xyXG5cdFx0XHRcdGNvZGU6ICdpbnZhbGlkX3JlcXVlc3QnLFxyXG5cdFx0XHRcdG1lc3NhZ2U6IG8ubWVzc2FnZSB8fCAnRmFpbGVkIHRvIGdldCBkYXRhIGZyb20gRmxpY2tyJ1xyXG5cdFx0XHR9O1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBvO1xyXG5cdH1cclxuXHJcblx0ZnVuY3Rpb24gZm9ybWF0RnJpZW5kcyhvKSB7XHJcblx0XHRmb3JtYXRFcnJvcihvKTtcclxuXHRcdGlmIChvLmNvbnRhY3RzKSB7XHJcblx0XHRcdG8gPSBjaGVja1Jlc3BvbnNlKG8sICdjb250YWN0cycpO1xyXG5cdFx0XHRwYWdpbmcobyk7XHJcblx0XHRcdG8uZGF0YSA9IG8uY29udGFjdDtcclxuXHRcdFx0ZGVsZXRlIG8uY29udGFjdDtcclxuXHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBvLmRhdGEubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0XHR2YXIgaXRlbSA9IG8uZGF0YVtpXTtcclxuXHRcdFx0XHRpdGVtLmlkID0gaXRlbS5uc2lkO1xyXG5cdFx0XHRcdGl0ZW0ubmFtZSA9IGl0ZW0ucmVhbG5hbWUgfHwgaXRlbS51c2VybmFtZTtcclxuXHRcdFx0XHRpdGVtLnRodW1ibmFpbCA9IGdldEJ1ZGR5SWNvbihpdGVtLCAnbScpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIG87XHJcblx0fVxyXG5cclxuXHRmdW5jdGlvbiBwYWdpbmcocmVzKSB7XHJcblx0XHRpZiAocmVzLnBhZ2UgJiYgcmVzLnBhZ2VzICYmIHJlcy5wYWdlICE9PSByZXMucGFnZXMpIHtcclxuXHRcdFx0cmVzLnBhZ2luZyA9IHtcclxuXHRcdFx0XHRuZXh0OiAnP3BhZ2U9JyArICgrK3Jlcy5wYWdlKVxyXG5cdFx0XHR9O1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcbn0pKGhlbGxvKTtcclxuXHJcbihmdW5jdGlvbihoZWxsbykge1xyXG5cclxuXHRoZWxsby5pbml0KHtcclxuXHJcblx0XHRmb3Vyc3F1YXJlOiB7XHJcblxyXG5cdFx0XHRuYW1lOiAnRm91cnNxdWFyZScsXHJcblxyXG5cdFx0XHRvYXV0aDoge1xyXG5cdFx0XHRcdC8vIFNlZTogaHR0cHM6Ly9kZXZlbG9wZXIuZm91cnNxdWFyZS5jb20vb3ZlcnZpZXcvYXV0aFxyXG5cdFx0XHRcdHZlcnNpb246IDIsXHJcblx0XHRcdFx0YXV0aDogJ2h0dHBzOi8vZm91cnNxdWFyZS5jb20vb2F1dGgyL2F1dGhlbnRpY2F0ZScsXHJcblx0XHRcdFx0Z3JhbnQ6ICdodHRwczovL2ZvdXJzcXVhcmUuY29tL29hdXRoMi9hY2Nlc3NfdG9rZW4nXHJcblx0XHRcdH0sXHJcblxyXG5cdFx0XHQvLyBSZWZyZXNoIHRoZSBhY2Nlc3NfdG9rZW4gb25jZSBleHBpcmVkXHJcblx0XHRcdHJlZnJlc2g6IHRydWUsXHJcblxyXG5cdFx0XHRiYXNlOiAnaHR0cHM6Ly9hcGkuZm91cnNxdWFyZS5jb20vdjIvJyxcclxuXHJcblx0XHRcdGdldDoge1xyXG5cdFx0XHRcdG1lOiAndXNlcnMvc2VsZicsXHJcblx0XHRcdFx0J21lL2ZyaWVuZHMnOiAndXNlcnMvc2VsZi9mcmllbmRzJyxcclxuXHRcdFx0XHQnbWUvZm9sbG93ZXJzJzogJ3VzZXJzL3NlbGYvZnJpZW5kcycsXHJcblx0XHRcdFx0J21lL2ZvbGxvd2luZyc6ICd1c2Vycy9zZWxmL2ZyaWVuZHMnXHJcblx0XHRcdH0sXHJcblxyXG5cdFx0XHR3cmFwOiB7XHJcblx0XHRcdFx0bWU6IGZ1bmN0aW9uKG8pIHtcclxuXHRcdFx0XHRcdGZvcm1hdEVycm9yKG8pO1xyXG5cdFx0XHRcdFx0aWYgKG8gJiYgby5yZXNwb25zZSkge1xyXG5cdFx0XHRcdFx0XHRvID0gby5yZXNwb25zZS51c2VyO1xyXG5cdFx0XHRcdFx0XHRmb3JtYXRVc2VyKG8pO1xyXG5cdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdHJldHVybiBvO1xyXG5cdFx0XHRcdH0sXHJcblxyXG5cdFx0XHRcdCdkZWZhdWx0JzogZnVuY3Rpb24obykge1xyXG5cdFx0XHRcdFx0Zm9ybWF0RXJyb3Iobyk7XHJcblxyXG5cdFx0XHRcdFx0Ly8gRm9ybWF0IGZyaWVuZHNcclxuXHRcdFx0XHRcdGlmIChvICYmICdyZXNwb25zZScgaW4gbyAmJiAnZnJpZW5kcycgaW4gby5yZXNwb25zZSAmJiAnaXRlbXMnIGluIG8ucmVzcG9uc2UuZnJpZW5kcykge1xyXG5cdFx0XHRcdFx0XHRvLmRhdGEgPSBvLnJlc3BvbnNlLmZyaWVuZHMuaXRlbXM7XHJcblx0XHRcdFx0XHRcdG8uZGF0YS5mb3JFYWNoKGZvcm1hdFVzZXIpO1xyXG5cdFx0XHRcdFx0XHRkZWxldGUgby5yZXNwb25zZTtcclxuXHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHRyZXR1cm4gbztcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0sXHJcblxyXG5cdFx0XHR4aHI6IGZvcm1hdFJlcXVlc3QsXHJcblx0XHRcdGpzb25wOiBmb3JtYXRSZXF1ZXN0XHJcblx0XHR9XHJcblx0fSk7XHJcblxyXG5cdGZ1bmN0aW9uIGZvcm1hdEVycm9yKG8pIHtcclxuXHRcdGlmIChvLm1ldGEgJiYgKG8ubWV0YS5jb2RlID09PSA0MDAgfHwgby5tZXRhLmNvZGUgPT09IDQwMSkpIHtcclxuXHRcdFx0by5lcnJvciA9IHtcclxuXHRcdFx0XHRjb2RlOiAnYWNjZXNzX2RlbmllZCcsXHJcblx0XHRcdFx0bWVzc2FnZTogby5tZXRhLmVycm9yRGV0YWlsXHJcblx0XHRcdH07XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRmdW5jdGlvbiBmb3JtYXRVc2VyKG8pIHtcclxuXHRcdGlmIChvICYmIG8uaWQpIHtcclxuXHRcdFx0by50aHVtYm5haWwgPSBvLnBob3RvLnByZWZpeCArICcxMDB4MTAwJyArIG8ucGhvdG8uc3VmZml4O1xyXG5cdFx0XHRvLm5hbWUgPSBvLmZpcnN0TmFtZSArICcgJyArIG8ubGFzdE5hbWU7XHJcblx0XHRcdG8uZmlyc3RfbmFtZSA9IG8uZmlyc3ROYW1lO1xyXG5cdFx0XHRvLmxhc3RfbmFtZSA9IG8ubGFzdE5hbWU7XHJcblx0XHRcdGlmIChvLmNvbnRhY3QpIHtcclxuXHRcdFx0XHRpZiAoby5jb250YWN0LmVtYWlsKSB7XHJcblx0XHRcdFx0XHRvLmVtYWlsID0gby5jb250YWN0LmVtYWlsO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0ZnVuY3Rpb24gZm9ybWF0UmVxdWVzdChwLCBxcykge1xyXG5cdFx0dmFyIHRva2VuID0gcXMuYWNjZXNzX3Rva2VuO1xyXG5cdFx0ZGVsZXRlIHFzLmFjY2Vzc190b2tlbjtcclxuXHRcdHFzLm9hdXRoX3Rva2VuID0gdG9rZW47XHJcblx0XHRxcy52ID0gMjAxMjExMjU7XHJcblx0XHRyZXR1cm4gdHJ1ZTtcclxuXHR9XHJcblxyXG59KShoZWxsbyk7XHJcblxyXG4oZnVuY3Rpb24oaGVsbG8pIHtcclxuXHJcblx0aGVsbG8uaW5pdCh7XHJcblxyXG5cdFx0Z2l0aHViOiB7XHJcblxyXG5cdFx0XHRuYW1lOiAnR2l0SHViJyxcclxuXHJcblx0XHRcdG9hdXRoOiB7XHJcblx0XHRcdFx0dmVyc2lvbjogMixcclxuXHRcdFx0XHRhdXRoOiAnaHR0cHM6Ly9naXRodWIuY29tL2xvZ2luL29hdXRoL2F1dGhvcml6ZScsXHJcblx0XHRcdFx0Z3JhbnQ6ICdodHRwczovL2dpdGh1Yi5jb20vbG9naW4vb2F1dGgvYWNjZXNzX3Rva2VuJyxcclxuXHRcdFx0XHRyZXNwb25zZV90eXBlOiAnY29kZSdcclxuXHRcdFx0fSxcclxuXHJcblx0XHRcdHNjb3BlOiB7XHJcblx0XHRcdFx0ZW1haWw6ICd1c2VyOmVtYWlsJ1xyXG5cdFx0XHR9LFxyXG5cclxuXHRcdFx0YmFzZTogJ2h0dHBzOi8vYXBpLmdpdGh1Yi5jb20vJyxcclxuXHJcblx0XHRcdGdldDoge1xyXG5cdFx0XHRcdG1lOiAndXNlcicsXHJcblx0XHRcdFx0J21lL2ZyaWVuZHMnOiAndXNlci9mb2xsb3dpbmc/cGVyX3BhZ2U9QHtsaW1pdHwxMDB9JyxcclxuXHRcdFx0XHQnbWUvZm9sbG93aW5nJzogJ3VzZXIvZm9sbG93aW5nP3Blcl9wYWdlPUB7bGltaXR8MTAwfScsXHJcblx0XHRcdFx0J21lL2ZvbGxvd2Vycyc6ICd1c2VyL2ZvbGxvd2Vycz9wZXJfcGFnZT1Ae2xpbWl0fDEwMH0nLFxyXG5cdFx0XHRcdCdtZS9saWtlJzogJ3VzZXIvc3RhcnJlZD9wZXJfcGFnZT1Ae2xpbWl0fDEwMH0nXHJcblx0XHRcdH0sXHJcblxyXG5cdFx0XHR3cmFwOiB7XHJcblx0XHRcdFx0bWU6IGZ1bmN0aW9uKG8sIGhlYWRlcnMpIHtcclxuXHJcblx0XHRcdFx0XHRmb3JtYXRFcnJvcihvLCBoZWFkZXJzKTtcclxuXHRcdFx0XHRcdGZvcm1hdFVzZXIobyk7XHJcblxyXG5cdFx0XHRcdFx0cmV0dXJuIG87XHJcblx0XHRcdFx0fSxcclxuXHJcblx0XHRcdFx0J2RlZmF1bHQnOiBmdW5jdGlvbihvLCBoZWFkZXJzLCByZXEpIHtcclxuXHJcblx0XHRcdFx0XHRmb3JtYXRFcnJvcihvLCBoZWFkZXJzKTtcclxuXHJcblx0XHRcdFx0XHRpZiAoQXJyYXkuaXNBcnJheShvKSkge1xyXG5cdFx0XHRcdFx0XHRvID0ge2RhdGE6b307XHJcblx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0aWYgKG8uZGF0YSkge1xyXG5cdFx0XHRcdFx0XHRwYWdpbmcobywgaGVhZGVycywgcmVxKTtcclxuXHRcdFx0XHRcdFx0by5kYXRhLmZvckVhY2goZm9ybWF0VXNlcik7XHJcblx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0cmV0dXJuIG87XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9LFxyXG5cclxuXHRcdFx0eGhyOiBmdW5jdGlvbihwKSB7XHJcblxyXG5cdFx0XHRcdGlmIChwLm1ldGhvZCAhPT0gJ2dldCcgJiYgcC5kYXRhKSB7XHJcblxyXG5cdFx0XHRcdFx0Ly8gU2VyaWFsaXplIHBheWxvYWQgYXMgSlNPTlxyXG5cdFx0XHRcdFx0cC5oZWFkZXJzID0gcC5oZWFkZXJzIHx8IHt9O1xyXG5cdFx0XHRcdFx0cC5oZWFkZXJzWydDb250ZW50LVR5cGUnXSA9ICdhcHBsaWNhdGlvbi9qc29uJztcclxuXHRcdFx0XHRcdGlmICh0eXBlb2YgKHAuZGF0YSkgPT09ICdvYmplY3QnKSB7XHJcblx0XHRcdFx0XHRcdHAuZGF0YSA9IEpTT04uc3RyaW5naWZ5KHAuZGF0YSk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRyZXR1cm4gdHJ1ZTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH0pO1xyXG5cclxuXHRmdW5jdGlvbiBmb3JtYXRFcnJvcihvLCBoZWFkZXJzKSB7XHJcblx0XHR2YXIgY29kZSA9IGhlYWRlcnMgPyBoZWFkZXJzLnN0YXR1c0NvZGUgOiAobyAmJiAnbWV0YScgaW4gbyAmJiAnc3RhdHVzJyBpbiBvLm1ldGEgJiYgby5tZXRhLnN0YXR1cyk7XHJcblx0XHRpZiAoKGNvZGUgPT09IDQwMSB8fCBjb2RlID09PSA0MDMpKSB7XHJcblx0XHRcdG8uZXJyb3IgPSB7XHJcblx0XHRcdFx0Y29kZTogJ2FjY2Vzc19kZW5pZWQnLFxyXG5cdFx0XHRcdG1lc3NhZ2U6IG8ubWVzc2FnZSB8fCAoby5kYXRhID8gby5kYXRhLm1lc3NhZ2UgOiAnQ291bGQgbm90IGdldCByZXNwb25zZScpXHJcblx0XHRcdH07XHJcblx0XHRcdGRlbGV0ZSBvLm1lc3NhZ2U7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRmdW5jdGlvbiBmb3JtYXRVc2VyKG8pIHtcclxuXHRcdGlmIChvLmlkKSB7XHJcblx0XHRcdG8udGh1bWJuYWlsID0gby5waWN0dXJlID0gby5hdmF0YXJfdXJsO1xyXG5cdFx0XHRvLm5hbWUgPSBvLmxvZ2luO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0ZnVuY3Rpb24gcGFnaW5nKHJlcywgaGVhZGVycywgcmVxKSB7XHJcblx0XHRpZiAocmVzLmRhdGEgJiYgcmVzLmRhdGEubGVuZ3RoICYmIGhlYWRlcnMgJiYgaGVhZGVycy5MaW5rKSB7XHJcblx0XHRcdHZhciBuZXh0ID0gaGVhZGVycy5MaW5rLm1hdGNoKC88KC4qPyk+O1xccypyZWw9XFxcIm5leHRcXFwiLyk7XHJcblx0XHRcdGlmIChuZXh0KSB7XHJcblx0XHRcdFx0cmVzLnBhZ2luZyA9IHtcclxuXHRcdFx0XHRcdG5leHQ6IG5leHRbMV1cclxuXHRcdFx0XHR9O1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fVxyXG5cclxufSkoaGVsbG8pO1xyXG5cclxuKGZ1bmN0aW9uKGhlbGxvKSB7XHJcblxyXG5cdHZhciBjb250YWN0c1VybCA9ICdodHRwczovL3d3dy5nb29nbGUuY29tL204L2ZlZWRzL2NvbnRhY3RzL2RlZmF1bHQvZnVsbD92PTMuMCZhbHQ9anNvbiZtYXgtcmVzdWx0cz1Ae2xpbWl0fDEwMDB9JnN0YXJ0LWluZGV4PUB7c3RhcnR8MX0nO1xyXG5cclxuXHRoZWxsby5pbml0KHtcclxuXHJcblx0XHRnb29nbGU6IHtcclxuXHJcblx0XHRcdG5hbWU6ICdHb29nbGUgUGx1cycsXHJcblxyXG5cdFx0XHQvLyBTZWU6IGh0dHA6Ly9jb2RlLmdvb2dsZS5jb20vYXBpcy9hY2NvdW50cy9kb2NzL09BdXRoMlVzZXJBZ2VudC5odG1sXHJcblx0XHRcdG9hdXRoOiB7XHJcblx0XHRcdFx0dmVyc2lvbjogMixcclxuXHRcdFx0XHRhdXRoOiAnaHR0cHM6Ly9hY2NvdW50cy5nb29nbGUuY29tL28vb2F1dGgyL2F1dGgnLFxyXG5cdFx0XHRcdGdyYW50OiAnaHR0cHM6Ly9hY2NvdW50cy5nb29nbGUuY29tL28vb2F1dGgyL3Rva2VuJ1xyXG5cdFx0XHR9LFxyXG5cclxuXHRcdFx0Ly8gQXV0aG9yaXphdGlvbiBzY29wZXNcclxuXHRcdFx0c2NvcGU6IHtcclxuXHRcdFx0XHRiYXNpYzogJ2h0dHBzOi8vd3d3Lmdvb2dsZWFwaXMuY29tL2F1dGgvcGx1cy5tZSBwcm9maWxlJyxcclxuXHRcdFx0XHRlbWFpbDogJ2VtYWlsJyxcclxuXHRcdFx0XHRiaXJ0aGRheTogJycsXHJcblx0XHRcdFx0ZXZlbnRzOiAnJyxcclxuXHRcdFx0XHRwaG90b3M6ICdodHRwczovL3BpY2FzYXdlYi5nb29nbGUuY29tL2RhdGEvJyxcclxuXHRcdFx0XHR2aWRlb3M6ICdodHRwOi8vZ2RhdGEueW91dHViZS5jb20nLFxyXG5cdFx0XHRcdGZyaWVuZHM6ICdodHRwczovL3d3dy5nb29nbGUuY29tL204L2ZlZWRzLCBodHRwczovL3d3dy5nb29nbGVhcGlzLmNvbS9hdXRoL3BsdXMubG9naW4nLFxyXG5cdFx0XHRcdGZpbGVzOiAnaHR0cHM6Ly93d3cuZ29vZ2xlYXBpcy5jb20vYXV0aC9kcml2ZS5yZWFkb25seScsXHJcblx0XHRcdFx0cHVibGlzaDogJycsXHJcblx0XHRcdFx0cHVibGlzaF9maWxlczogJ2h0dHBzOi8vd3d3Lmdvb2dsZWFwaXMuY29tL2F1dGgvZHJpdmUnLFxyXG5cdFx0XHRcdHNoYXJlOiAnJyxcclxuXHRcdFx0XHRjcmVhdGVfZXZlbnQ6ICcnLFxyXG5cdFx0XHRcdG9mZmxpbmVfYWNjZXNzOiAnJ1xyXG5cdFx0XHR9LFxyXG5cclxuXHRcdFx0c2NvcGVfZGVsaW06ICcgJyxcclxuXHJcblx0XHRcdGxvZ2luOiBmdW5jdGlvbihwKSB7XHJcblxyXG5cdFx0XHRcdGlmIChwLnFzLnJlc3BvbnNlX3R5cGUgPT09ICdjb2RlJykge1xyXG5cclxuXHRcdFx0XHRcdC8vIExldCdzIHNldCB0aGlzIHRvIGFuIG9mZmxpbmUgYWNjZXNzIHRvIHJldHVybiBhIHJlZnJlc2hfdG9rZW5cclxuXHRcdFx0XHRcdHAucXMuYWNjZXNzX3R5cGUgPSAnb2ZmbGluZSc7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHQvLyBSZWF1dGhlbnRpY2F0ZVxyXG5cdFx0XHRcdC8vIGh0dHBzOi8vZGV2ZWxvcGVycy5nb29nbGUuY29tL2lkZW50aXR5L3Byb3RvY29scy9cclxuXHRcdFx0XHRpZiAocC5vcHRpb25zLmZvcmNlKSB7XHJcblx0XHRcdFx0XHRwLnFzLmFwcHJvdmFsX3Byb21wdCA9ICdmb3JjZSc7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9LFxyXG5cclxuXHRcdFx0Ly8gQVBJIGJhc2UgVVJJXHJcblx0XHRcdGJhc2U6ICdodHRwczovL3d3dy5nb29nbGVhcGlzLmNvbS8nLFxyXG5cclxuXHRcdFx0Ly8gTWFwIEdFVCByZXF1ZXN0c1xyXG5cdFx0XHRnZXQ6IHtcclxuXHRcdFx0XHRtZTogJ3BsdXMvdjEvcGVvcGxlL21lJyxcclxuXHJcblx0XHRcdFx0Ly8gRGVwcmVjYXRlZCBTZXB0IDEsIDIwMTRcclxuXHRcdFx0XHQvLydtZSc6ICdvYXV0aDIvdjEvdXNlcmluZm8/YWx0PWpzb24nLFxyXG5cclxuXHRcdFx0XHQvLyBTZWU6IGh0dHBzOi8vZGV2ZWxvcGVycy5nb29nbGUuY29tLysvYXBpL2xhdGVzdC9wZW9wbGUvbGlzdFxyXG5cdFx0XHRcdCdtZS9mcmllbmRzJzogJ3BsdXMvdjEvcGVvcGxlL21lL3Blb3BsZS92aXNpYmxlP21heFJlc3VsdHM9QHtsaW1pdHwxMDB9JyxcclxuXHRcdFx0XHQnbWUvZm9sbG93aW5nJzogY29udGFjdHNVcmwsXHJcblx0XHRcdFx0J21lL2ZvbGxvd2Vycyc6IGNvbnRhY3RzVXJsLFxyXG5cdFx0XHRcdCdtZS9jb250YWN0cyc6IGNvbnRhY3RzVXJsLFxyXG5cdFx0XHRcdCdtZS9zaGFyZSc6ICdwbHVzL3YxL3Blb3BsZS9tZS9hY3Rpdml0aWVzL3B1YmxpYz9tYXhSZXN1bHRzPUB7bGltaXR8MTAwfScsXHJcblx0XHRcdFx0J21lL2ZlZWQnOiAncGx1cy92MS9wZW9wbGUvbWUvYWN0aXZpdGllcy9wdWJsaWM/bWF4UmVzdWx0cz1Ae2xpbWl0fDEwMH0nLFxyXG5cdFx0XHRcdCdtZS9hbGJ1bXMnOiAnaHR0cHM6Ly9waWNhc2F3ZWIuZ29vZ2xlLmNvbS9kYXRhL2ZlZWQvYXBpL3VzZXIvZGVmYXVsdD9hbHQ9anNvbiZtYXgtcmVzdWx0cz1Ae2xpbWl0fDEwMH0mc3RhcnQtaW5kZXg9QHtzdGFydHwxfScsXHJcblx0XHRcdFx0J21lL2FsYnVtJzogZnVuY3Rpb24ocCwgY2FsbGJhY2spIHtcclxuXHRcdFx0XHRcdHZhciBrZXkgPSBwLnF1ZXJ5LmlkO1xyXG5cdFx0XHRcdFx0ZGVsZXRlIHAucXVlcnkuaWQ7XHJcblx0XHRcdFx0XHRjYWxsYmFjayhrZXkucmVwbGFjZSgnL2VudHJ5LycsICcvZmVlZC8nKSk7XHJcblx0XHRcdFx0fSxcclxuXHJcblx0XHRcdFx0J21lL3Bob3Rvcyc6ICdodHRwczovL3BpY2FzYXdlYi5nb29nbGUuY29tL2RhdGEvZmVlZC9hcGkvdXNlci9kZWZhdWx0P2FsdD1qc29uJmtpbmQ9cGhvdG8mbWF4LXJlc3VsdHM9QHtsaW1pdHwxMDB9JnN0YXJ0LWluZGV4PUB7c3RhcnR8MX0nLFxyXG5cclxuXHRcdFx0XHQvLyBTZWU6IGh0dHBzOi8vZGV2ZWxvcGVycy5nb29nbGUuY29tL2RyaXZlL3YyL3JlZmVyZW5jZS9maWxlcy9saXN0XHJcblx0XHRcdFx0J21lL2ZpbGUnOiAnZHJpdmUvdjIvZmlsZXMvQHtpZH0nLFxyXG5cdFx0XHRcdCdtZS9maWxlcyc6ICdkcml2ZS92Mi9maWxlcz9xPSUyMkB7cGFyZW50fHJvb3R9JTIyK2luK3BhcmVudHMrYW5kK3RyYXNoZWQ9ZmFsc2UmbWF4UmVzdWx0cz1Ae2xpbWl0fDEwMH0nLFxyXG5cclxuXHRcdFx0XHQvLyBTZWU6IGh0dHBzOi8vZGV2ZWxvcGVycy5nb29nbGUuY29tL2RyaXZlL3YyL3JlZmVyZW5jZS9maWxlcy9saXN0XHJcblx0XHRcdFx0J21lL2ZvbGRlcnMnOiAnZHJpdmUvdjIvZmlsZXM/cT0lMjJAe2lkfHJvb3R9JTIyK2luK3BhcmVudHMrYW5kK21pbWVUeXBlKz0rJTIyYXBwbGljYXRpb24vdm5kLmdvb2dsZS1hcHBzLmZvbGRlciUyMithbmQrdHJhc2hlZD1mYWxzZSZtYXhSZXN1bHRzPUB7bGltaXR8MTAwfScsXHJcblxyXG5cdFx0XHRcdC8vIFNlZTogaHR0cHM6Ly9kZXZlbG9wZXJzLmdvb2dsZS5jb20vZHJpdmUvdjIvcmVmZXJlbmNlL2ZpbGVzL2xpc3RcclxuXHRcdFx0XHQnbWUvZm9sZGVyJzogJ2RyaXZlL3YyL2ZpbGVzP3E9JTIyQHtpZHxyb290fSUyMitpbitwYXJlbnRzK2FuZCt0cmFzaGVkPWZhbHNlJm1heFJlc3VsdHM9QHtsaW1pdHwxMDB9J1xyXG5cdFx0XHR9LFxyXG5cclxuXHRcdFx0Ly8gTWFwIFBPU1QgcmVxdWVzdHNcclxuXHRcdFx0cG9zdDoge1xyXG5cclxuXHRcdFx0XHQvLyBHb29nbGUgRHJpdmVcclxuXHRcdFx0XHQnbWUvZmlsZXMnOiB1cGxvYWREcml2ZSxcclxuXHRcdFx0XHQnbWUvZm9sZGVycyc6IGZ1bmN0aW9uKHAsIGNhbGxiYWNrKSB7XHJcblx0XHRcdFx0XHRwLmRhdGEgPSB7XHJcblx0XHRcdFx0XHRcdHRpdGxlOiBwLmRhdGEubmFtZSxcclxuXHRcdFx0XHRcdFx0cGFyZW50czogW3tpZDogcC5kYXRhLnBhcmVudCB8fCAncm9vdCd9XSxcclxuXHRcdFx0XHRcdFx0bWltZVR5cGU6ICdhcHBsaWNhdGlvbi92bmQuZ29vZ2xlLWFwcHMuZm9sZGVyJ1xyXG5cdFx0XHRcdFx0fTtcclxuXHRcdFx0XHRcdGNhbGxiYWNrKCdkcml2ZS92Mi9maWxlcycpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSxcclxuXHJcblx0XHRcdC8vIE1hcCBQVVQgcmVxdWVzdHNcclxuXHRcdFx0cHV0OiB7XHJcblx0XHRcdFx0J21lL2ZpbGVzJzogdXBsb2FkRHJpdmVcclxuXHRcdFx0fSxcclxuXHJcblx0XHRcdC8vIE1hcCBERUxFVEUgcmVxdWVzdHNcclxuXHRcdFx0ZGVsOiB7XHJcblx0XHRcdFx0J21lL2ZpbGVzJzogJ2RyaXZlL3YyL2ZpbGVzL0B7aWR9JyxcclxuXHRcdFx0XHQnbWUvZm9sZGVyJzogJ2RyaXZlL3YyL2ZpbGVzL0B7aWR9J1xyXG5cdFx0XHR9LFxyXG5cclxuXHRcdFx0Ly8gTWFwIFBBVENIIHJlcXVlc3RzXHJcblx0XHRcdHBhdGNoOiB7XHJcblx0XHRcdFx0J21lL2ZpbGUnOiAnZHJpdmUvdjIvZmlsZXMvQHtpZH0nXHJcblx0XHRcdH0sXHJcblxyXG5cdFx0XHR3cmFwOiB7XHJcblx0XHRcdFx0bWU6IGZ1bmN0aW9uKG8pIHtcclxuXHRcdFx0XHRcdGlmIChvLmlkKSB7XHJcblx0XHRcdFx0XHRcdG8ubGFzdF9uYW1lID0gby5mYW1pbHlfbmFtZSB8fCAoby5uYW1lID8gby5uYW1lLmZhbWlseU5hbWUgOiBudWxsKTtcclxuXHRcdFx0XHRcdFx0by5maXJzdF9uYW1lID0gby5naXZlbl9uYW1lIHx8IChvLm5hbWUgPyBvLm5hbWUuZ2l2ZW5OYW1lIDogbnVsbCk7XHJcblxyXG5cdFx0XHRcdFx0XHRpZiAoby5lbWFpbHMgJiYgby5lbWFpbHMubGVuZ3RoKSB7XHJcblx0XHRcdFx0XHRcdFx0by5lbWFpbCA9IG8uZW1haWxzWzBdLnZhbHVlO1xyXG5cdFx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0XHRmb3JtYXRQZXJzb24obyk7XHJcblx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0cmV0dXJuIG87XHJcblx0XHRcdFx0fSxcclxuXHJcblx0XHRcdFx0J21lL2ZyaWVuZHMnOiBmdW5jdGlvbihvKSB7XHJcblx0XHRcdFx0XHRpZiAoby5pdGVtcykge1xyXG5cdFx0XHRcdFx0XHRwYWdpbmcobyk7XHJcblx0XHRcdFx0XHRcdG8uZGF0YSA9IG8uaXRlbXM7XHJcblx0XHRcdFx0XHRcdG8uZGF0YS5mb3JFYWNoKGZvcm1hdFBlcnNvbik7XHJcblx0XHRcdFx0XHRcdGRlbGV0ZSBvLml0ZW1zO1xyXG5cdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdHJldHVybiBvO1xyXG5cdFx0XHRcdH0sXHJcblxyXG5cdFx0XHRcdCdtZS9jb250YWN0cyc6IGZvcm1hdEZyaWVuZHMsXHJcblx0XHRcdFx0J21lL2ZvbGxvd2Vycyc6IGZvcm1hdEZyaWVuZHMsXHJcblx0XHRcdFx0J21lL2ZvbGxvd2luZyc6IGZvcm1hdEZyaWVuZHMsXHJcblx0XHRcdFx0J21lL3NoYXJlJzogZm9ybWF0RmVlZCxcclxuXHRcdFx0XHQnbWUvZmVlZCc6IGZvcm1hdEZlZWQsXHJcblx0XHRcdFx0J21lL2FsYnVtcyc6IGdFbnRyeSxcclxuXHRcdFx0XHQnbWUvcGhvdG9zJzogZm9ybWF0UGhvdG9zLFxyXG5cdFx0XHRcdCdkZWZhdWx0JzogZ0VudHJ5XHJcblx0XHRcdH0sXHJcblxyXG5cdFx0XHR4aHI6IGZ1bmN0aW9uKHApIHtcclxuXHJcblx0XHRcdFx0aWYgKHAubWV0aG9kID09PSAncG9zdCcgfHwgcC5tZXRob2QgPT09ICdwdXQnKSB7XHJcblx0XHRcdFx0XHR0b0pTT04ocCk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdGVsc2UgaWYgKHAubWV0aG9kID09PSAncGF0Y2gnKSB7XHJcblx0XHRcdFx0XHRoZWxsby51dGlscy5leHRlbmQocC5xdWVyeSwgcC5kYXRhKTtcclxuXHRcdFx0XHRcdHAuZGF0YSA9IG51bGw7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRyZXR1cm4gdHJ1ZTtcclxuXHRcdFx0fSxcclxuXHJcblx0XHRcdC8vIERvbid0IGV2ZW4gdHJ5IHN1Ym1pdHRpbmcgdmlhIGZvcm0uXHJcblx0XHRcdC8vIFRoaXMgbWVhbnMgbm8gUE9TVCBvcGVyYXRpb25zIGluIDw9SUU5XHJcblx0XHRcdGZvcm06IGZhbHNlXHJcblx0XHR9XHJcblx0fSk7XHJcblxyXG5cdGZ1bmN0aW9uIHRvSW50KHMpIHtcclxuXHRcdHJldHVybiBwYXJzZUludChzLCAxMCk7XHJcblx0fVxyXG5cclxuXHRmdW5jdGlvbiBmb3JtYXRGZWVkKG8pIHtcclxuXHRcdHBhZ2luZyhvKTtcclxuXHRcdG8uZGF0YSA9IG8uaXRlbXM7XHJcblx0XHRkZWxldGUgby5pdGVtcztcclxuXHRcdHJldHVybiBvO1xyXG5cdH1cclxuXHJcblx0Ly8gRm9ybWF0OiBlbnN1cmUgZWFjaCByZWNvcmQgY29udGFpbnMgYSBuYW1lLCBpZCBldGMuXHJcblx0ZnVuY3Rpb24gZm9ybWF0SXRlbShvKSB7XHJcblx0XHRpZiAoby5lcnJvcikge1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKCFvLm5hbWUpIHtcclxuXHRcdFx0by5uYW1lID0gby50aXRsZSB8fCBvLm1lc3NhZ2U7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKCFvLnBpY3R1cmUpIHtcclxuXHRcdFx0by5waWN0dXJlID0gby50aHVtYm5haWxMaW5rO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmICghby50aHVtYm5haWwpIHtcclxuXHRcdFx0by50aHVtYm5haWwgPSBvLnRodW1ibmFpbExpbms7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKG8ubWltZVR5cGUgPT09ICdhcHBsaWNhdGlvbi92bmQuZ29vZ2xlLWFwcHMuZm9sZGVyJykge1xyXG5cdFx0XHRvLnR5cGUgPSAnZm9sZGVyJztcclxuXHRcdFx0by5maWxlcyA9ICdodHRwczovL3d3dy5nb29nbGVhcGlzLmNvbS9kcml2ZS92Mi9maWxlcz9xPSUyMicgKyBvLmlkICsgJyUyMitpbitwYXJlbnRzJztcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gbztcclxuXHR9XHJcblxyXG5cdGZ1bmN0aW9uIGZvcm1hdEltYWdlKGltYWdlKSB7XHJcblx0XHRyZXR1cm4ge1xyXG5cdFx0XHRzb3VyY2U6IGltYWdlLnVybCxcclxuXHRcdFx0d2lkdGg6IGltYWdlLndpZHRoLFxyXG5cdFx0XHRoZWlnaHQ6IGltYWdlLmhlaWdodFxyXG5cdFx0fTtcclxuXHR9XHJcblxyXG5cdGZ1bmN0aW9uIGZvcm1hdFBob3RvcyhvKSB7XHJcblx0XHRvLmRhdGEgPSBvLmZlZWQuZW50cnkubWFwKGZvcm1hdEVudHJ5KTtcclxuXHRcdGRlbGV0ZSBvLmZlZWQ7XHJcblx0fVxyXG5cclxuXHQvLyBHb29nbGUgaGFzIGEgaG9ycmlibGUgSlNPTiBBUElcclxuXHRmdW5jdGlvbiBnRW50cnkobykge1xyXG5cdFx0cGFnaW5nKG8pO1xyXG5cclxuXHRcdGlmICgnZmVlZCcgaW4gbyAmJiAnZW50cnknIGluIG8uZmVlZCkge1xyXG5cdFx0XHRvLmRhdGEgPSBvLmZlZWQuZW50cnkubWFwKGZvcm1hdEVudHJ5KTtcclxuXHRcdFx0ZGVsZXRlIG8uZmVlZDtcclxuXHRcdH1cclxuXHJcblx0XHQvLyBPbGQgc3R5bGU6IFBpY2FzYSwgZXRjLlxyXG5cdFx0ZWxzZSBpZiAoJ2VudHJ5JyBpbiBvKSB7XHJcblx0XHRcdHJldHVybiBmb3JtYXRFbnRyeShvLmVudHJ5KTtcclxuXHRcdH1cclxuXHJcblx0XHQvLyBOZXcgc3R5bGU6IEdvb2dsZSBEcml2ZSAmIFBsdXNcclxuXHRcdGVsc2UgaWYgKCdpdGVtcycgaW4gbykge1xyXG5cdFx0XHRvLmRhdGEgPSBvLml0ZW1zLm1hcChmb3JtYXRJdGVtKTtcclxuXHRcdFx0ZGVsZXRlIG8uaXRlbXM7XHJcblx0XHR9XHJcblx0XHRlbHNlIHtcclxuXHRcdFx0Zm9ybWF0SXRlbShvKTtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gbztcclxuXHR9XHJcblxyXG5cdGZ1bmN0aW9uIGZvcm1hdFBlcnNvbihvKSB7XHJcblx0XHRvLm5hbWUgPSBvLmRpc3BsYXlOYW1lIHx8IG8ubmFtZTtcclxuXHRcdG8ucGljdHVyZSA9IG8ucGljdHVyZSB8fCAoby5pbWFnZSA/IG8uaW1hZ2UudXJsIDogbnVsbCk7XHJcblx0XHRvLnRodW1ibmFpbCA9IG8ucGljdHVyZTtcclxuXHR9XHJcblxyXG5cdGZ1bmN0aW9uIGZvcm1hdEZyaWVuZHMobywgaGVhZGVycywgcmVxKSB7XHJcblx0XHRwYWdpbmcobyk7XHJcblx0XHR2YXIgciA9IFtdO1xyXG5cdFx0aWYgKCdmZWVkJyBpbiBvICYmICdlbnRyeScgaW4gby5mZWVkKSB7XHJcblx0XHRcdHZhciB0b2tlbiA9IHJlcS5xdWVyeS5hY2Nlc3NfdG9rZW47XHJcblx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgby5mZWVkLmVudHJ5Lmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdFx0dmFyIGEgPSBvLmZlZWQuZW50cnlbaV07XHJcblxyXG5cdFx0XHRcdGEuaWRcdD0gYS5pZC4kdDtcclxuXHRcdFx0XHRhLm5hbWVcdD0gYS50aXRsZS4kdDtcclxuXHRcdFx0XHRkZWxldGUgYS50aXRsZTtcclxuXHRcdFx0XHRpZiAoYS5nZCRlbWFpbCkge1xyXG5cdFx0XHRcdFx0YS5lbWFpbFx0PSAoYS5nZCRlbWFpbCAmJiBhLmdkJGVtYWlsLmxlbmd0aCA+IDApID8gYS5nZCRlbWFpbFswXS5hZGRyZXNzIDogbnVsbDtcclxuXHRcdFx0XHRcdGEuZW1haWxzID0gYS5nZCRlbWFpbDtcclxuXHRcdFx0XHRcdGRlbGV0ZSBhLmdkJGVtYWlsO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0aWYgKGEudXBkYXRlZCkge1xyXG5cdFx0XHRcdFx0YS51cGRhdGVkID0gYS51cGRhdGVkLiR0O1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0aWYgKGEubGluaykge1xyXG5cclxuXHRcdFx0XHRcdHZhciBwaWMgPSAoYS5saW5rLmxlbmd0aCA+IDApID8gYS5saW5rWzBdLmhyZWYgOiBudWxsO1xyXG5cdFx0XHRcdFx0aWYgKHBpYyAmJiBhLmxpbmtbMF0uZ2QkZXRhZykge1xyXG5cdFx0XHRcdFx0XHRwaWMgKz0gKHBpYy5pbmRleE9mKCc/JykgPiAtMSA/ICcmJyA6ICc/JykgKyAnYWNjZXNzX3Rva2VuPScgKyB0b2tlbjtcclxuXHRcdFx0XHRcdFx0YS5waWN0dXJlID0gcGljO1xyXG5cdFx0XHRcdFx0XHRhLnRodW1ibmFpbCA9IHBpYztcclxuXHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHRkZWxldGUgYS5saW5rO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0aWYgKGEuY2F0ZWdvcnkpIHtcclxuXHRcdFx0XHRcdGRlbGV0ZSBhLmNhdGVnb3J5O1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0by5kYXRhID0gby5mZWVkLmVudHJ5O1xyXG5cdFx0XHRkZWxldGUgby5mZWVkO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBvO1xyXG5cdH1cclxuXHJcblx0ZnVuY3Rpb24gZm9ybWF0RW50cnkoYSkge1xyXG5cclxuXHRcdHZhciBncm91cCA9IGEubWVkaWEkZ3JvdXA7XHJcblx0XHR2YXIgcGhvdG8gPSBncm91cC5tZWRpYSRjb250ZW50Lmxlbmd0aCA/IGdyb3VwLm1lZGlhJGNvbnRlbnRbMF0gOiB7fTtcclxuXHRcdHZhciBtZWRpYUNvbnRlbnQgPSBncm91cC5tZWRpYSRjb250ZW50IHx8IFtdO1xyXG5cdFx0dmFyIG1lZGlhVGh1bWJuYWlsID0gZ3JvdXAubWVkaWEkdGh1bWJuYWlsIHx8IFtdO1xyXG5cclxuXHRcdHZhciBwaWN0dXJlcyA9IG1lZGlhQ29udGVudFxyXG5cdFx0XHQuY29uY2F0KG1lZGlhVGh1bWJuYWlsKVxyXG5cdFx0XHQubWFwKGZvcm1hdEltYWdlKVxyXG5cdFx0XHQuc29ydChmdW5jdGlvbihhLCBiKSB7XHJcblx0XHRcdFx0cmV0dXJuIGEud2lkdGggLSBiLndpZHRoO1xyXG5cdFx0XHR9KTtcclxuXHJcblx0XHR2YXIgaSA9IDA7XHJcblx0XHR2YXIgX2E7XHJcblx0XHR2YXIgcCA9IHtcclxuXHRcdFx0aWQ6IGEuaWQuJHQsXHJcblx0XHRcdG5hbWU6IGEudGl0bGUuJHQsXHJcblx0XHRcdGRlc2NyaXB0aW9uOiBhLnN1bW1hcnkuJHQsXHJcblx0XHRcdHVwZGF0ZWRfdGltZTogYS51cGRhdGVkLiR0LFxyXG5cdFx0XHRjcmVhdGVkX3RpbWU6IGEucHVibGlzaGVkLiR0LFxyXG5cdFx0XHRwaWN0dXJlOiBwaG90byA/IHBob3RvLnVybCA6IG51bGwsXHJcblx0XHRcdHBpY3R1cmVzOiBwaWN0dXJlcyxcclxuXHRcdFx0aW1hZ2VzOiBbXSxcclxuXHRcdFx0dGh1bWJuYWlsOiBwaG90byA/IHBob3RvLnVybCA6IG51bGwsXHJcblx0XHRcdHdpZHRoOiBwaG90by53aWR0aCxcclxuXHRcdFx0aGVpZ2h0OiBwaG90by5oZWlnaHRcclxuXHRcdH07XHJcblxyXG5cdFx0Ly8gR2V0IGZlZWQvY2hpbGRyZW5cclxuXHRcdGlmICgnbGluaycgaW4gYSkge1xyXG5cdFx0XHRmb3IgKGkgPSAwOyBpIDwgYS5saW5rLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdFx0dmFyIGQgPSBhLmxpbmtbaV07XHJcblx0XHRcdFx0aWYgKGQucmVsLm1hdGNoKC9cXCNmZWVkJC8pKSB7XHJcblx0XHRcdFx0XHRwLnVwbG9hZF9sb2NhdGlvbiA9IHAuZmlsZXMgPSBwLnBob3RvcyA9IGQuaHJlZjtcclxuXHRcdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdC8vIEdldCBpbWFnZXMgb2YgZGlmZmVyZW50IHNjYWxlc1xyXG5cdFx0aWYgKCdjYXRlZ29yeScgaW4gYSAmJiBhLmNhdGVnb3J5Lmxlbmd0aCkge1xyXG5cdFx0XHRfYSA9IGEuY2F0ZWdvcnk7XHJcblx0XHRcdGZvciAoaSA9IDA7IGkgPCBfYS5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHRcdGlmIChfYVtpXS5zY2hlbWUgJiYgX2FbaV0uc2NoZW1lLm1hdGNoKC9cXCNraW5kJC8pKSB7XHJcblx0XHRcdFx0XHRwLnR5cGUgPSBfYVtpXS50ZXJtLnJlcGxhY2UoL14uKj9cXCMvLCAnJyk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gR2V0IGltYWdlcyBvZiBkaWZmZXJlbnQgc2NhbGVzXHJcblx0XHRpZiAoJ21lZGlhJHRodW1ibmFpbCcgaW4gZ3JvdXAgJiYgZ3JvdXAubWVkaWEkdGh1bWJuYWlsLmxlbmd0aCkge1xyXG5cdFx0XHRfYSA9IGdyb3VwLm1lZGlhJHRodW1ibmFpbDtcclxuXHRcdFx0cC50aHVtYm5haWwgPSBfYVswXS51cmw7XHJcblx0XHRcdHAuaW1hZ2VzID0gX2EubWFwKGZvcm1hdEltYWdlKTtcclxuXHRcdH1cclxuXHJcblx0XHRfYSA9IGdyb3VwLm1lZGlhJGNvbnRlbnQ7XHJcblxyXG5cdFx0aWYgKF9hICYmIF9hLmxlbmd0aCkge1xyXG5cdFx0XHRwLmltYWdlcy5wdXNoKGZvcm1hdEltYWdlKF9hWzBdKSk7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIHA7XHJcblx0fVxyXG5cclxuXHRmdW5jdGlvbiBwYWdpbmcocmVzKSB7XHJcblxyXG5cdFx0Ly8gQ29udGFjdHMgVjJcclxuXHRcdGlmICgnZmVlZCcgaW4gcmVzICYmIHJlcy5mZWVkLm9wZW5TZWFyY2gkaXRlbXNQZXJQYWdlKSB7XHJcblx0XHRcdHZhciBsaW1pdCA9IHRvSW50KHJlcy5mZWVkLm9wZW5TZWFyY2gkaXRlbXNQZXJQYWdlLiR0KTtcclxuXHRcdFx0dmFyIHN0YXJ0ID0gdG9JbnQocmVzLmZlZWQub3BlblNlYXJjaCRzdGFydEluZGV4LiR0KTtcclxuXHRcdFx0dmFyIHRvdGFsID0gdG9JbnQocmVzLmZlZWQub3BlblNlYXJjaCR0b3RhbFJlc3VsdHMuJHQpO1xyXG5cclxuXHRcdFx0aWYgKChzdGFydCArIGxpbWl0KSA8IHRvdGFsKSB7XHJcblx0XHRcdFx0cmVzLnBhZ2luZyA9IHtcclxuXHRcdFx0XHRcdG5leHQ6ICc/c3RhcnQ9JyArIChzdGFydCArIGxpbWl0KVxyXG5cdFx0XHRcdH07XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHRcdGVsc2UgaWYgKCduZXh0UGFnZVRva2VuJyBpbiByZXMpIHtcclxuXHRcdFx0cmVzLnBhZ2luZyA9IHtcclxuXHRcdFx0XHRuZXh0OiAnP3BhZ2VUb2tlbj0nICsgcmVzLm5leHRQYWdlVG9rZW5cclxuXHRcdFx0fTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdC8vIENvbnN0cnVjdCBhIG11bHRpcGFydCBtZXNzYWdlXHJcblx0ZnVuY3Rpb24gTXVsdGlwYXJ0KCkge1xyXG5cclxuXHRcdC8vIEludGVybmFsIGJvZHlcclxuXHRcdHZhciBib2R5ID0gW107XHJcblx0XHR2YXIgYm91bmRhcnkgPSAoTWF0aC5yYW5kb20oKSAqIDFlMTApLnRvU3RyaW5nKDMyKTtcclxuXHRcdHZhciBjb3VudGVyID0gMDtcclxuXHRcdHZhciBsaW5lQnJlYWsgPSAnXFxyXFxuJztcclxuXHRcdHZhciBkZWxpbSA9IGxpbmVCcmVhayArICctLScgKyBib3VuZGFyeTtcclxuXHRcdHZhciByZWFkeSA9IGZ1bmN0aW9uKCkge307XHJcblxyXG5cdFx0dmFyIGRhdGFVcmkgPSAvXmRhdGFcXDooW147LF0rKFxcO2NoYXJzZXQ9W147LF0rKT8pKFxcO2Jhc2U2NCk/LC9pO1xyXG5cclxuXHRcdC8vIEFkZCBmaWxlXHJcblx0XHRmdW5jdGlvbiBhZGRGaWxlKGl0ZW0pIHtcclxuXHRcdFx0dmFyIGZyID0gbmV3IEZpbGVSZWFkZXIoKTtcclxuXHRcdFx0ZnIub25sb2FkID0gZnVuY3Rpb24oZSkge1xyXG5cdFx0XHRcdGFkZENvbnRlbnQoYnRvYShlLnRhcmdldC5yZXN1bHQpLCBpdGVtLnR5cGUgKyBsaW5lQnJlYWsgKyAnQ29udGVudC1UcmFuc2Zlci1FbmNvZGluZzogYmFzZTY0Jyk7XHJcblx0XHRcdH07XHJcblxyXG5cdFx0XHRmci5yZWFkQXNCaW5hcnlTdHJpbmcoaXRlbSk7XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gQWRkIGNvbnRlbnRcclxuXHRcdGZ1bmN0aW9uIGFkZENvbnRlbnQoY29udGVudCwgdHlwZSkge1xyXG5cdFx0XHRib2R5LnB1c2gobGluZUJyZWFrICsgJ0NvbnRlbnQtVHlwZTogJyArIHR5cGUgKyBsaW5lQnJlYWsgKyBsaW5lQnJlYWsgKyBjb250ZW50KTtcclxuXHRcdFx0Y291bnRlci0tO1xyXG5cdFx0XHRyZWFkeSgpO1xyXG5cdFx0fVxyXG5cclxuXHRcdC8vIEFkZCBuZXcgdGhpbmdzIHRvIHRoZSBvYmplY3RcclxuXHRcdHRoaXMuYXBwZW5kID0gZnVuY3Rpb24oY29udGVudCwgdHlwZSkge1xyXG5cclxuXHRcdFx0Ly8gRG9lcyB0aGUgY29udGVudCBoYXZlIGFuIGFycmF5XHJcblx0XHRcdGlmICh0eXBlb2YgKGNvbnRlbnQpID09PSAnc3RyaW5nJyB8fCAhKCdsZW5ndGgnIGluIE9iamVjdChjb250ZW50KSkpIHtcclxuXHRcdFx0XHQvLyBDb252ZXJ0aSB0byBtdWx0aXBsZXNcclxuXHRcdFx0XHRjb250ZW50ID0gW2NvbnRlbnRdO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGNvbnRlbnQubGVuZ3RoOyBpKyspIHtcclxuXHJcblx0XHRcdFx0Y291bnRlcisrO1xyXG5cclxuXHRcdFx0XHR2YXIgaXRlbSA9IGNvbnRlbnRbaV07XHJcblxyXG5cdFx0XHRcdC8vIElzIHRoaXMgYSBmaWxlP1xyXG5cdFx0XHRcdC8vIEZpbGVzIGNhbiBiZSBlaXRoZXIgQmxvYnMgb3IgRmlsZSB0eXBlc1xyXG5cdFx0XHRcdGlmIChcclxuXHRcdFx0XHRcdCh0eXBlb2YgKEZpbGUpICE9PSAndW5kZWZpbmVkJyAmJiBpdGVtIGluc3RhbmNlb2YgRmlsZSkgfHxcclxuXHRcdFx0XHRcdCh0eXBlb2YgKEJsb2IpICE9PSAndW5kZWZpbmVkJyAmJiBpdGVtIGluc3RhbmNlb2YgQmxvYilcclxuXHRcdFx0XHQpIHtcclxuXHRcdFx0XHRcdC8vIFJlYWQgdGhlIGZpbGUgaW5cclxuXHRcdFx0XHRcdGFkZEZpbGUoaXRlbSk7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHQvLyBEYXRhLVVSST9cclxuXHRcdFx0XHQvLyBEYXRhOls8bWltZSB0eXBlPl1bO2NoYXJzZXQ9PGNoYXJzZXQ+XVs7YmFzZTY0XSw8ZW5jb2RlZCBkYXRhPlxyXG5cdFx0XHRcdC8vIC9eZGF0YVxcOihbXjssXSsoXFw7Y2hhcnNldD1bXjssXSspPykoXFw7YmFzZTY0KT8sL2lcclxuXHRcdFx0XHRlbHNlIGlmICh0eXBlb2YgKGl0ZW0pID09PSAnc3RyaW5nJyAmJiBpdGVtLm1hdGNoKGRhdGFVcmkpKSB7XHJcblx0XHRcdFx0XHR2YXIgbSA9IGl0ZW0ubWF0Y2goZGF0YVVyaSk7XHJcblx0XHRcdFx0XHRhZGRDb250ZW50KGl0ZW0ucmVwbGFjZShkYXRhVXJpLCAnJyksIG1bMV0gKyBsaW5lQnJlYWsgKyAnQ29udGVudC1UcmFuc2Zlci1FbmNvZGluZzogYmFzZTY0Jyk7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHQvLyBSZWd1bGFyIHN0cmluZ1xyXG5cdFx0XHRcdGVsc2Uge1xyXG5cdFx0XHRcdFx0YWRkQ29udGVudChpdGVtLCB0eXBlKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH07XHJcblxyXG5cdFx0dGhpcy5vbnJlYWR5ID0gZnVuY3Rpb24oZm4pIHtcclxuXHRcdFx0cmVhZHkgPSBmdW5jdGlvbigpIHtcclxuXHRcdFx0XHRpZiAoY291bnRlciA9PT0gMCkge1xyXG5cdFx0XHRcdFx0Ly8gVHJpZ2dlciByZWFkeVxyXG5cdFx0XHRcdFx0Ym9keS51bnNoaWZ0KCcnKTtcclxuXHRcdFx0XHRcdGJvZHkucHVzaCgnLS0nKTtcclxuXHRcdFx0XHRcdGZuKGJvZHkuam9pbihkZWxpbSksIGJvdW5kYXJ5KTtcclxuXHRcdFx0XHRcdGJvZHkgPSBbXTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH07XHJcblxyXG5cdFx0XHRyZWFkeSgpO1xyXG5cdFx0fTtcclxuXHR9XHJcblxyXG5cdC8vIFVwbG9hZCB0byBEcml2ZVxyXG5cdC8vIElmIHRoaXMgaXMgUFVUIHRoZW4gb25seSBhdWdtZW50IHRoZSBmaWxlIHVwbG9hZGVkXHJcblx0Ly8gUFVUIGh0dHBzOi8vZGV2ZWxvcGVycy5nb29nbGUuY29tL2RyaXZlL3YyL3JlZmVyZW5jZS9maWxlcy91cGRhdGVcclxuXHQvLyBQT1NUIGh0dHBzOi8vZGV2ZWxvcGVycy5nb29nbGUuY29tL2RyaXZlL21hbmFnZS11cGxvYWRzXHJcblx0ZnVuY3Rpb24gdXBsb2FkRHJpdmUocCwgY2FsbGJhY2spIHtcclxuXHJcblx0XHR2YXIgZGF0YSA9IHt9O1xyXG5cclxuXHRcdC8vIFRlc3QgZm9yIERPTSBlbGVtZW50XHJcblx0XHRpZiAocC5kYXRhICYmXHJcblx0XHRcdCh0eXBlb2YgKEhUTUxJbnB1dEVsZW1lbnQpICE9PSAndW5kZWZpbmVkJyAmJiBwLmRhdGEgaW5zdGFuY2VvZiBIVE1MSW5wdXRFbGVtZW50KVxyXG5cdFx0KSB7XHJcblx0XHRcdHAuZGF0YSA9IHtmaWxlOiBwLmRhdGF9O1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmICghcC5kYXRhLm5hbWUgJiYgT2JqZWN0KE9iamVjdChwLmRhdGEuZmlsZSkuZmlsZXMpLmxlbmd0aCAmJiBwLm1ldGhvZCA9PT0gJ3Bvc3QnKSB7XHJcblx0XHRcdHAuZGF0YS5uYW1lID0gcC5kYXRhLmZpbGUuZmlsZXNbMF0ubmFtZTtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAocC5tZXRob2QgPT09ICdwb3N0Jykge1xyXG5cdFx0XHRwLmRhdGEgPSB7XHJcblx0XHRcdFx0dGl0bGU6IHAuZGF0YS5uYW1lLFxyXG5cdFx0XHRcdHBhcmVudHM6IFt7aWQ6IHAuZGF0YS5wYXJlbnQgfHwgJ3Jvb3QnfV0sXHJcblx0XHRcdFx0ZmlsZTogcC5kYXRhLmZpbGVcclxuXHRcdFx0fTtcclxuXHRcdH1cclxuXHRcdGVsc2Uge1xyXG5cclxuXHRcdFx0Ly8gTWFrZSBhIHJlZmVyZW5jZVxyXG5cdFx0XHRkYXRhID0gcC5kYXRhO1xyXG5cdFx0XHRwLmRhdGEgPSB7fTtcclxuXHJcblx0XHRcdC8vIEFkZCB0aGUgcGFydHMgdG8gY2hhbmdlIGFzIHJlcXVpcmVkXHJcblx0XHRcdGlmIChkYXRhLnBhcmVudCkge1xyXG5cdFx0XHRcdHAuZGF0YS5wYXJlbnRzID0gW3tpZDogcC5kYXRhLnBhcmVudCB8fCAncm9vdCd9XTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0aWYgKGRhdGEuZmlsZSkge1xyXG5cdFx0XHRcdHAuZGF0YS5maWxlID0gZGF0YS5maWxlO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZiAoZGF0YS5uYW1lKSB7XHJcblx0XHRcdFx0cC5kYXRhLnRpdGxlID0gZGF0YS5uYW1lO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gRXh0cmFjdCB0aGUgZmlsZSwgaWYgaXQgZXhpc3RzIGZyb20gdGhlIGRhdGEgb2JqZWN0XHJcblx0XHQvLyBJZiB0aGUgRmlsZSBpcyBhbiBJTlBVVCBlbGVtZW50IGxldHMganVzdCBjb25jZXJuIG91cnNlbHZlcyB3aXRoIHRoZSBOb2RlTGlzdFxyXG5cdFx0dmFyIGZpbGU7XHJcblx0XHRpZiAoJ2ZpbGUnIGluIHAuZGF0YSkge1xyXG5cdFx0XHRmaWxlID0gcC5kYXRhLmZpbGU7XHJcblx0XHRcdGRlbGV0ZSBwLmRhdGEuZmlsZTtcclxuXHJcblx0XHRcdGlmICh0eXBlb2YgKGZpbGUpID09PSAnb2JqZWN0JyAmJiAnZmlsZXMnIGluIGZpbGUpIHtcclxuXHRcdFx0XHQvLyBBc3NpZ24gdGhlIE5vZGVMaXN0XHJcblx0XHRcdFx0ZmlsZSA9IGZpbGUuZmlsZXM7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGlmICghZmlsZSB8fCAhZmlsZS5sZW5ndGgpIHtcclxuXHRcdFx0XHRjYWxsYmFjayh7XHJcblx0XHRcdFx0XHRlcnJvcjoge1xyXG5cdFx0XHRcdFx0XHRjb2RlOiAncmVxdWVzdF9pbnZhbGlkJyxcclxuXHRcdFx0XHRcdFx0bWVzc2FnZTogJ1RoZXJlIHdlcmUgbm8gZmlsZXMgYXR0YWNoZWQgd2l0aCB0aGlzIHJlcXVlc3QgdG8gdXBsb2FkJ1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHRcdHJldHVybjtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdC8vIFNldCB0eXBlIHAuZGF0YS5taW1lVHlwZSA9IE9iamVjdChmaWxlWzBdKS50eXBlIHx8ICdhcHBsaWNhdGlvbi9vY3RldC1zdHJlYW0nO1xyXG5cclxuXHRcdC8vIENvbnN0cnVjdCBhIG11bHRpcGFydCBtZXNzYWdlXHJcblx0XHR2YXIgcGFydHMgPSBuZXcgTXVsdGlwYXJ0KCk7XHJcblx0XHRwYXJ0cy5hcHBlbmQoSlNPTi5zdHJpbmdpZnkocC5kYXRhKSwgJ2FwcGxpY2F0aW9uL2pzb24nKTtcclxuXHJcblx0XHQvLyBSZWFkIHRoZSBmaWxlIGludG8gYSAgYmFzZTY0IHN0cmluZy4uLiB5ZXAgYSBoYXNzbGUsIGkga25vd1xyXG5cdFx0Ly8gRm9ybURhdGEgZG9lc24ndCBsZXQgdXMgYXNzaWduIG91ciBvd24gTXVsdGlwYXJ0IGhlYWRlcnMgYW5kIEhUVFAgQ29udGVudC1UeXBlXHJcblx0XHQvLyBBbGFzIEdvb2dsZUFwaSBuZWVkIHRoZXNlIGluIGEgcGFydGljdWxhciBmb3JtYXRcclxuXHRcdGlmIChmaWxlKSB7XHJcblx0XHRcdHBhcnRzLmFwcGVuZChmaWxlKTtcclxuXHRcdH1cclxuXHJcblx0XHRwYXJ0cy5vbnJlYWR5KGZ1bmN0aW9uKGJvZHksIGJvdW5kYXJ5KSB7XHJcblxyXG5cdFx0XHRwLmhlYWRlcnNbJ2NvbnRlbnQtdHlwZSddID0gJ211bHRpcGFydC9yZWxhdGVkOyBib3VuZGFyeT1cIicgKyBib3VuZGFyeSArICdcIic7XHJcblx0XHRcdHAuZGF0YSA9IGJvZHk7XHJcblxyXG5cdFx0XHRjYWxsYmFjaygndXBsb2FkL2RyaXZlL3YyL2ZpbGVzJyArIChkYXRhLmlkID8gJy8nICsgZGF0YS5pZCA6ICcnKSArICc/dXBsb2FkVHlwZT1tdWx0aXBhcnQnKTtcclxuXHRcdH0pO1xyXG5cclxuXHR9XHJcblxyXG5cdGZ1bmN0aW9uIHRvSlNPTihwKSB7XHJcblx0XHRpZiAodHlwZW9mIChwLmRhdGEpID09PSAnb2JqZWN0Jykge1xyXG5cdFx0XHQvLyBDb252ZXJ0IHRoZSBQT1NUIGludG8gYSBqYXZhc2NyaXB0IG9iamVjdFxyXG5cdFx0XHR0cnkge1xyXG5cdFx0XHRcdHAuZGF0YSA9IEpTT04uc3RyaW5naWZ5KHAuZGF0YSk7XHJcblx0XHRcdFx0cC5oZWFkZXJzWydjb250ZW50LXR5cGUnXSA9ICdhcHBsaWNhdGlvbi9qc29uJztcclxuXHRcdFx0fVxyXG5cdFx0XHRjYXRjaCAoZSkge31cclxuXHRcdH1cclxuXHR9XHJcblxyXG59KShoZWxsbyk7XHJcblxyXG4oZnVuY3Rpb24oaGVsbG8pIHtcclxuXHJcblx0aGVsbG8uaW5pdCh7XHJcblxyXG5cdFx0aW5zdGFncmFtOiB7XHJcblxyXG5cdFx0XHRuYW1lOiAnSW5zdGFncmFtJyxcclxuXHJcblx0XHRcdG9hdXRoOiB7XHJcblx0XHRcdFx0Ly8gU2VlOiBodHRwOi8vaW5zdGFncmFtLmNvbS9kZXZlbG9wZXIvYXV0aGVudGljYXRpb24vXHJcblx0XHRcdFx0dmVyc2lvbjogMixcclxuXHRcdFx0XHRhdXRoOiAnaHR0cHM6Ly9pbnN0YWdyYW0uY29tL29hdXRoL2F1dGhvcml6ZS8nLFxyXG5cdFx0XHRcdGdyYW50OiAnaHR0cHM6Ly9hcGkuaW5zdGFncmFtLmNvbS9vYXV0aC9hY2Nlc3NfdG9rZW4nXHJcblx0XHRcdH0sXHJcblxyXG5cdFx0XHQvLyBSZWZyZXNoIHRoZSBhY2Nlc3NfdG9rZW4gb25jZSBleHBpcmVkXHJcblx0XHRcdHJlZnJlc2g6IHRydWUsXHJcblxyXG5cdFx0XHRzY29wZToge1xyXG5cdFx0XHRcdGJhc2ljOiAnYmFzaWMnLFxyXG5cdFx0XHRcdHBob3RvczogJycsXHJcblx0XHRcdFx0ZnJpZW5kczogJ3JlbGF0aW9uc2hpcHMnLFxyXG5cdFx0XHRcdHB1Ymxpc2g6ICdsaWtlcyBjb21tZW50cycsXHJcblx0XHRcdFx0ZW1haWw6ICcnLFxyXG5cdFx0XHRcdHNoYXJlOiAnJyxcclxuXHRcdFx0XHRwdWJsaXNoX2ZpbGVzOiAnJyxcclxuXHRcdFx0XHRmaWxlczogJycsXHJcblx0XHRcdFx0dmlkZW9zOiAnJyxcclxuXHRcdFx0XHRvZmZsaW5lX2FjY2VzczogJydcclxuXHRcdFx0fSxcclxuXHJcblx0XHRcdHNjb3BlX2RlbGltOiAnICcsXHJcblxyXG5cdFx0XHRiYXNlOiAnaHR0cHM6Ly9hcGkuaW5zdGFncmFtLmNvbS92MS8nLFxyXG5cclxuXHRcdFx0Z2V0OiB7XHJcblx0XHRcdFx0bWU6ICd1c2Vycy9zZWxmJyxcclxuXHRcdFx0XHQnbWUvZmVlZCc6ICd1c2Vycy9zZWxmL2ZlZWQ/Y291bnQ9QHtsaW1pdHwxMDB9JyxcclxuXHRcdFx0XHQnbWUvcGhvdG9zJzogJ3VzZXJzL3NlbGYvbWVkaWEvcmVjZW50P21pbl9pZD0wJmNvdW50PUB7bGltaXR8MTAwfScsXHJcblx0XHRcdFx0J21lL2ZyaWVuZHMnOiAndXNlcnMvc2VsZi9mb2xsb3dzP2NvdW50PUB7bGltaXR8MTAwfScsXHJcblx0XHRcdFx0J21lL2ZvbGxvd2luZyc6ICd1c2Vycy9zZWxmL2ZvbGxvd3M/Y291bnQ9QHtsaW1pdHwxMDB9JyxcclxuXHRcdFx0XHQnbWUvZm9sbG93ZXJzJzogJ3VzZXJzL3NlbGYvZm9sbG93ZWQtYnk/Y291bnQ9QHtsaW1pdHwxMDB9JyxcclxuXHRcdFx0XHQnZnJpZW5kL3Bob3Rvcyc6ICd1c2Vycy9Ae2lkfS9tZWRpYS9yZWNlbnQ/bWluX2lkPTAmY291bnQ9QHtsaW1pdHwxMDB9J1xyXG5cdFx0XHR9LFxyXG5cclxuXHRcdFx0cG9zdDoge1xyXG5cdFx0XHRcdCdtZS9saWtlJzogZnVuY3Rpb24ocCwgY2FsbGJhY2spIHtcclxuXHRcdFx0XHRcdHZhciBpZCA9IHAuZGF0YS5pZDtcclxuXHRcdFx0XHRcdHAuZGF0YSA9IHt9O1xyXG5cdFx0XHRcdFx0Y2FsbGJhY2soJ21lZGlhLycgKyBpZCArICcvbGlrZXMnKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0sXHJcblxyXG5cdFx0XHRkZWw6IHtcclxuXHRcdFx0XHQnbWUvbGlrZSc6ICdtZWRpYS9Ae2lkfS9saWtlcydcclxuXHRcdFx0fSxcclxuXHJcblx0XHRcdHdyYXA6IHtcclxuXHRcdFx0XHRtZTogZnVuY3Rpb24obykge1xyXG5cclxuXHRcdFx0XHRcdGZvcm1hdEVycm9yKG8pO1xyXG5cclxuXHRcdFx0XHRcdGlmICgnZGF0YScgaW4gbykge1xyXG5cdFx0XHRcdFx0XHRvLmlkID0gby5kYXRhLmlkO1xyXG5cdFx0XHRcdFx0XHRvLnRodW1ibmFpbCA9IG8uZGF0YS5wcm9maWxlX3BpY3R1cmU7XHJcblx0XHRcdFx0XHRcdG8ubmFtZSA9IG8uZGF0YS5mdWxsX25hbWUgfHwgby5kYXRhLnVzZXJuYW1lO1xyXG5cdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdHJldHVybiBvO1xyXG5cdFx0XHRcdH0sXHJcblxyXG5cdFx0XHRcdCdtZS9mcmllbmRzJzogZm9ybWF0RnJpZW5kcyxcclxuXHRcdFx0XHQnbWUvZm9sbG93aW5nJzogZm9ybWF0RnJpZW5kcyxcclxuXHRcdFx0XHQnbWUvZm9sbG93ZXJzJzogZm9ybWF0RnJpZW5kcyxcclxuXHRcdFx0XHQnbWUvcGhvdG9zJzogZnVuY3Rpb24obykge1xyXG5cclxuXHRcdFx0XHRcdGZvcm1hdEVycm9yKG8pO1xyXG5cdFx0XHRcdFx0cGFnaW5nKG8pO1xyXG5cclxuXHRcdFx0XHRcdGlmICgnZGF0YScgaW4gbykge1xyXG5cdFx0XHRcdFx0XHRvLmRhdGEgPSBvLmRhdGEuZmlsdGVyKGZ1bmN0aW9uKGQpIHtcclxuXHRcdFx0XHRcdFx0XHRyZXR1cm4gZC50eXBlID09PSAnaW1hZ2UnO1xyXG5cdFx0XHRcdFx0XHR9KTtcclxuXHJcblx0XHRcdFx0XHRcdG8uZGF0YS5mb3JFYWNoKGZ1bmN0aW9uKGQpIHtcclxuXHRcdFx0XHRcdFx0XHRkLm5hbWUgPSBkLmNhcHRpb24gPyBkLmNhcHRpb24udGV4dCA6IG51bGw7XHJcblx0XHRcdFx0XHRcdFx0ZC50aHVtYm5haWwgPSBkLmltYWdlcy50aHVtYm5haWwudXJsO1xyXG5cdFx0XHRcdFx0XHRcdGQucGljdHVyZSA9IGQuaW1hZ2VzLnN0YW5kYXJkX3Jlc29sdXRpb24udXJsO1xyXG5cdFx0XHRcdFx0XHRcdGQucGljdHVyZXMgPSBPYmplY3Qua2V5cyhkLmltYWdlcylcclxuXHRcdFx0XHRcdFx0XHRcdC5tYXAoZnVuY3Rpb24oa2V5KSB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdHZhciBpbWFnZSA9IGQuaW1hZ2VzW2tleV07XHJcblx0XHRcdFx0XHRcdFx0XHRcdHJldHVybiBmb3JtYXRJbWFnZShpbWFnZSk7XHJcblx0XHRcdFx0XHRcdFx0XHR9KVxyXG5cdFx0XHRcdFx0XHRcdFx0LnNvcnQoZnVuY3Rpb24oYSwgYikge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gYS53aWR0aCAtIGIud2lkdGg7XHJcblx0XHRcdFx0XHRcdFx0XHR9KTtcclxuXHRcdFx0XHRcdFx0fSk7XHJcblx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0cmV0dXJuIG87XHJcblx0XHRcdFx0fSxcclxuXHJcblx0XHRcdFx0J2RlZmF1bHQnOiBmdW5jdGlvbihvKSB7XHJcblx0XHRcdFx0XHRvID0gZm9ybWF0RXJyb3Iobyk7XHJcblx0XHRcdFx0XHRwYWdpbmcobyk7XHJcblx0XHRcdFx0XHRyZXR1cm4gbztcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0sXHJcblxyXG5cdFx0XHQvLyBJbnN0YWdyYW0gZG9lcyBub3QgcmV0dXJuIGFueSBDT1JTIEhlYWRlcnNcclxuXHRcdFx0Ly8gU28gYmVzaWRlcyBKU09OUCB3ZSdyZSBzdHVjayB3aXRoIHByb3h5XHJcblx0XHRcdHhocjogZnVuY3Rpb24ocCwgcXMpIHtcclxuXHJcblx0XHRcdFx0dmFyIG1ldGhvZCA9IHAubWV0aG9kO1xyXG5cdFx0XHRcdHZhciBwcm94eSA9IG1ldGhvZCAhPT0gJ2dldCc7XHJcblxyXG5cdFx0XHRcdGlmIChwcm94eSkge1xyXG5cclxuXHRcdFx0XHRcdGlmICgobWV0aG9kID09PSAncG9zdCcgfHwgbWV0aG9kID09PSAncHV0JykgJiYgcC5xdWVyeS5hY2Nlc3NfdG9rZW4pIHtcclxuXHRcdFx0XHRcdFx0cC5kYXRhLmFjY2Vzc190b2tlbiA9IHAucXVlcnkuYWNjZXNzX3Rva2VuO1xyXG5cdFx0XHRcdFx0XHRkZWxldGUgcC5xdWVyeS5hY2Nlc3NfdG9rZW47XHJcblx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0Ly8gTm8gYWNjZXNzIGNvbnRyb2wgaGVhZGVyc1xyXG5cdFx0XHRcdFx0Ly8gVXNlIHRoZSBwcm94eSBpbnN0ZWFkXHJcblx0XHRcdFx0XHRwLnByb3h5ID0gcHJveHk7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRyZXR1cm4gcHJveHk7XHJcblx0XHRcdH0sXHJcblxyXG5cdFx0XHQvLyBObyBmb3JtXHJcblx0XHRcdGZvcm06IGZhbHNlXHJcblx0XHR9XHJcblx0fSk7XHJcblxyXG5cdGZ1bmN0aW9uIGZvcm1hdEltYWdlKGltYWdlKSB7XHJcblx0XHRyZXR1cm4ge1xyXG5cdFx0XHRzb3VyY2U6IGltYWdlLnVybCxcclxuXHRcdFx0d2lkdGg6IGltYWdlLndpZHRoLFxyXG5cdFx0XHRoZWlnaHQ6IGltYWdlLmhlaWdodFxyXG5cdFx0fTtcclxuXHR9XHJcblxyXG5cdGZ1bmN0aW9uIGZvcm1hdEVycm9yKG8pIHtcclxuXHRcdGlmICh0eXBlb2YgbyA9PT0gJ3N0cmluZycpIHtcclxuXHRcdFx0cmV0dXJuIHtcclxuXHRcdFx0XHRlcnJvcjoge1xyXG5cdFx0XHRcdFx0Y29kZTogJ2ludmFsaWRfcmVxdWVzdCcsXHJcblx0XHRcdFx0XHRtZXNzYWdlOiBvXHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9O1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmIChvICYmICdtZXRhJyBpbiBvICYmICdlcnJvcl90eXBlJyBpbiBvLm1ldGEpIHtcclxuXHRcdFx0by5lcnJvciA9IHtcclxuXHRcdFx0XHRjb2RlOiBvLm1ldGEuZXJyb3JfdHlwZSxcclxuXHRcdFx0XHRtZXNzYWdlOiBvLm1ldGEuZXJyb3JfbWVzc2FnZVxyXG5cdFx0XHR9O1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBvO1xyXG5cdH1cclxuXHJcblx0ZnVuY3Rpb24gZm9ybWF0RnJpZW5kcyhvKSB7XHJcblx0XHRwYWdpbmcobyk7XHJcblx0XHRpZiAobyAmJiAnZGF0YScgaW4gbykge1xyXG5cdFx0XHRvLmRhdGEuZm9yRWFjaChmb3JtYXRGcmllbmQpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBvO1xyXG5cdH1cclxuXHJcblx0ZnVuY3Rpb24gZm9ybWF0RnJpZW5kKG8pIHtcclxuXHRcdGlmIChvLmlkKSB7XHJcblx0XHRcdG8udGh1bWJuYWlsID0gby5wcm9maWxlX3BpY3R1cmU7XHJcblx0XHRcdG8ubmFtZSA9IG8uZnVsbF9uYW1lIHx8IG8udXNlcm5hbWU7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHQvLyBTZWU6IGh0dHA6Ly9pbnN0YWdyYW0uY29tL2RldmVsb3Blci9lbmRwb2ludHMvXHJcblx0ZnVuY3Rpb24gcGFnaW5nKHJlcykge1xyXG5cdFx0aWYgKCdwYWdpbmF0aW9uJyBpbiByZXMpIHtcclxuXHRcdFx0cmVzLnBhZ2luZyA9IHtcclxuXHRcdFx0XHRuZXh0OiByZXMucGFnaW5hdGlvbi5uZXh0X3VybFxyXG5cdFx0XHR9O1xyXG5cdFx0XHRkZWxldGUgcmVzLnBhZ2luYXRpb247XHJcblx0XHR9XHJcblx0fVxyXG5cclxufSkoaGVsbG8pO1xyXG5cclxuKGZ1bmN0aW9uKGhlbGxvKSB7XHJcblxyXG5cdGhlbGxvLmluaXQoe1xyXG5cclxuXHRcdGpvaW5tZToge1xyXG5cclxuXHRcdFx0bmFtZTogJ2pvaW4ubWUnLFxyXG5cclxuXHRcdFx0b2F1dGg6IHtcclxuXHRcdFx0XHR2ZXJzaW9uOiAyLFxyXG5cdFx0XHRcdGF1dGg6ICdodHRwczovL3NlY3VyZS5qb2luLm1lL2FwaS9wdWJsaWMvdjEvYXV0aC9vYXV0aDInLFxyXG5cdFx0XHRcdGdyYW50OiAnaHR0cHM6Ly9zZWN1cmUuam9pbi5tZS9hcGkvcHVibGljL3YxL2F1dGgvb2F1dGgyJ1xyXG5cdFx0XHR9LFxyXG5cclxuXHRcdFx0cmVmcmVzaDogZmFsc2UsXHJcblxyXG5cdFx0XHRzY29wZToge1xyXG5cdFx0XHRcdGJhc2ljOiAndXNlcl9pbmZvJyxcclxuXHRcdFx0XHR1c2VyOiAndXNlcl9pbmZvJyxcclxuXHRcdFx0XHRzY2hlZHVsZXI6ICdzY2hlZHVsZXInLFxyXG5cdFx0XHRcdHN0YXJ0OiAnc3RhcnRfbWVldGluZycsXHJcblx0XHRcdFx0ZW1haWw6ICcnLFxyXG5cdFx0XHRcdGZyaWVuZHM6ICcnLFxyXG5cdFx0XHRcdHNoYXJlOiAnJyxcclxuXHRcdFx0XHRwdWJsaXNoOiAnJyxcclxuXHRcdFx0XHRwaG90b3M6ICcnLFxyXG5cdFx0XHRcdHB1Ymxpc2hfZmlsZXM6ICcnLFxyXG5cdFx0XHRcdGZpbGVzOiAnJyxcclxuXHRcdFx0XHR2aWRlb3M6ICcnLFxyXG5cdFx0XHRcdG9mZmxpbmVfYWNjZXNzOiAnJ1xyXG5cdFx0XHR9LFxyXG5cclxuXHRcdFx0c2NvcGVfZGVsaW06ICcgJyxcclxuXHJcblx0XHRcdGxvZ2luOiBmdW5jdGlvbihwKSB7XHJcblx0XHRcdFx0cC5vcHRpb25zLnBvcHVwLndpZHRoID0gNDAwO1xyXG5cdFx0XHRcdHAub3B0aW9ucy5wb3B1cC5oZWlnaHQgPSA3MDA7XHJcblx0XHRcdH0sXHJcblxyXG5cdFx0XHRiYXNlOiAnaHR0cHM6Ly9hcGkuam9pbi5tZS92MS8nLFxyXG5cclxuXHRcdFx0Z2V0OiB7XHJcblx0XHRcdFx0bWU6ICd1c2VyJyxcclxuXHRcdFx0XHRtZWV0aW5nczogJ21lZXRpbmdzJyxcclxuXHRcdFx0XHQnbWVldGluZ3MvaW5mbyc6ICdtZWV0aW5ncy9Ae2lkfSdcclxuXHRcdFx0fSxcclxuXHJcblx0XHRcdHBvc3Q6IHtcclxuXHRcdFx0XHQnbWVldGluZ3Mvc3RhcnQvYWRob2MnOiBmdW5jdGlvbihwLCBjYWxsYmFjaykge1xyXG5cdFx0XHRcdFx0Y2FsbGJhY2soJ21lZXRpbmdzL3N0YXJ0Jyk7XHJcblx0XHRcdFx0fSxcclxuXHJcblx0XHRcdFx0J21lZXRpbmdzL3N0YXJ0L3NjaGVkdWxlZCc6IGZ1bmN0aW9uKHAsIGNhbGxiYWNrKSB7XHJcblx0XHRcdFx0XHR2YXIgbWVldGluZ0lkID0gcC5kYXRhLm1lZXRpbmdJZDtcclxuXHRcdFx0XHRcdHAuZGF0YSA9IHt9O1xyXG5cdFx0XHRcdFx0Y2FsbGJhY2soJ21lZXRpbmdzLycgKyBtZWV0aW5nSWQgKyAnL3N0YXJ0Jyk7XHJcblx0XHRcdFx0fSxcclxuXHJcblx0XHRcdFx0J21lZXRpbmdzL3NjaGVkdWxlJzogZnVuY3Rpb24ocCwgY2FsbGJhY2spIHtcclxuXHRcdFx0XHRcdGNhbGxiYWNrKCdtZWV0aW5ncycpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSxcclxuXHJcblx0XHRcdHBhdGNoOiB7XHJcblx0XHRcdFx0J21lZXRpbmdzL3VwZGF0ZSc6IGZ1bmN0aW9uKHAsIGNhbGxiYWNrKSB7XHJcblx0XHRcdFx0XHRjYWxsYmFjaygnbWVldGluZ3MvJyArIHAuZGF0YS5tZWV0aW5nSWQpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSxcclxuXHJcblx0XHRcdGRlbDoge1xyXG5cdFx0XHRcdCdtZWV0aW5ncy9kZWxldGUnOiAnbWVldGluZ3MvQHtpZH0nXHJcblx0XHRcdH0sXHJcblxyXG5cdFx0XHR3cmFwOiB7XHJcblx0XHRcdFx0bWU6IGZ1bmN0aW9uKG8sIGhlYWRlcnMpIHtcclxuXHRcdFx0XHRcdGZvcm1hdEVycm9yKG8sIGhlYWRlcnMpO1xyXG5cclxuXHRcdFx0XHRcdGlmICghby5lbWFpbCkge1xyXG5cdFx0XHRcdFx0XHRyZXR1cm4gbztcclxuXHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHRvLm5hbWUgPSBvLmZ1bGxOYW1lO1xyXG5cdFx0XHRcdFx0by5maXJzdF9uYW1lID0gby5uYW1lLnNwbGl0KCcgJylbMF07XHJcblx0XHRcdFx0XHRvLmxhc3RfbmFtZSA9IG8ubmFtZS5zcGxpdCgnICcpWzFdO1xyXG5cdFx0XHRcdFx0by5pZCA9IG8uZW1haWw7XHJcblxyXG5cdFx0XHRcdFx0cmV0dXJuIG87XHJcblx0XHRcdFx0fSxcclxuXHJcblx0XHRcdFx0J2RlZmF1bHQnOiBmdW5jdGlvbihvLCBoZWFkZXJzKSB7XHJcblx0XHRcdFx0XHRmb3JtYXRFcnJvcihvLCBoZWFkZXJzKTtcclxuXHJcblx0XHRcdFx0XHRyZXR1cm4gbztcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0sXHJcblxyXG5cdFx0XHR4aHI6IGZvcm1hdFJlcXVlc3RcclxuXHJcblx0XHR9XHJcblx0fSk7XHJcblxyXG5cdGZ1bmN0aW9uIGZvcm1hdEVycm9yKG8sIGhlYWRlcnMpIHtcclxuXHRcdHZhciBlcnJvckNvZGU7XHJcblx0XHR2YXIgbWVzc2FnZTtcclxuXHRcdHZhciBkZXRhaWxzO1xyXG5cclxuXHRcdGlmIChvICYmICgnTWVzc2FnZScgaW4gbykpIHtcclxuXHRcdFx0bWVzc2FnZSA9IG8uTWVzc2FnZTtcclxuXHRcdFx0ZGVsZXRlIG8uTWVzc2FnZTtcclxuXHJcblx0XHRcdGlmICgnRXJyb3JDb2RlJyBpbiBvKSB7XHJcblx0XHRcdFx0ZXJyb3JDb2RlID0gby5FcnJvckNvZGU7XHJcblx0XHRcdFx0ZGVsZXRlIG8uRXJyb3JDb2RlO1xyXG5cdFx0XHR9XHJcblx0XHRcdGVsc2Uge1xyXG5cdFx0XHRcdGVycm9yQ29kZSA9IGdldEVycm9yQ29kZShoZWFkZXJzKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0by5lcnJvciA9IHtcclxuXHRcdFx0XHRjb2RlOiBlcnJvckNvZGUsXHJcblx0XHRcdFx0bWVzc2FnZTogbWVzc2FnZSxcclxuXHRcdFx0XHRkZXRhaWxzOiBvXHJcblx0XHRcdH07XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIG87XHJcblx0fVxyXG5cclxuXHRmdW5jdGlvbiBmb3JtYXRSZXF1ZXN0KHAsIHFzKSB7XHJcblx0XHQvLyBNb3ZlIHRoZSBhY2Nlc3MgdG9rZW4gZnJvbSB0aGUgcmVxdWVzdCBib2R5IHRvIHRoZSByZXF1ZXN0IGhlYWRlclxyXG5cdFx0dmFyIHRva2VuID0gcXMuYWNjZXNzX3Rva2VuO1xyXG5cdFx0ZGVsZXRlIHFzLmFjY2Vzc190b2tlbjtcclxuXHRcdHAuaGVhZGVycy5BdXRob3JpemF0aW9uID0gJ0JlYXJlciAnICsgdG9rZW47XHJcblxyXG5cdFx0Ly8gRm9ybWF0IG5vbi1nZXQgcmVxdWVzdHMgdG8gaW5kaWNhdGUganNvbiBib2R5XHJcblx0XHRpZiAocC5tZXRob2QgIT09ICdnZXQnICYmIHAuZGF0YSkge1xyXG5cdFx0XHRwLmhlYWRlcnNbJ0NvbnRlbnQtVHlwZSddID0gJ2FwcGxpY2F0aW9uL2pzb24nO1xyXG5cdFx0XHRpZiAodHlwZW9mIChwLmRhdGEpID09PSAnb2JqZWN0Jykge1xyXG5cdFx0XHRcdHAuZGF0YSA9IEpTT04uc3RyaW5naWZ5KHAuZGF0YSk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHRpZiAocC5tZXRob2QgPT09ICdwdXQnKSB7XHJcblx0XHRcdHAubWV0aG9kID0gJ3BhdGNoJztcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gdHJ1ZTtcclxuXHR9XHJcblxyXG5cdGZ1bmN0aW9uIGdldEVycm9yQ29kZShoZWFkZXJzKSB7XHJcblx0XHRzd2l0Y2ggKGhlYWRlcnMuc3RhdHVzQ29kZSkge1xyXG5cdFx0XHRjYXNlIDQwMDpcclxuXHRcdFx0XHRyZXR1cm4gJ2ludmFsaWRfcmVxdWVzdCc7XHJcblx0XHRcdGNhc2UgNDAzOlxyXG5cdFx0XHRcdHJldHVybiAnc3RhbGVfdG9rZW4nO1xyXG5cdFx0XHRjYXNlIDQwMTpcclxuXHRcdFx0XHRyZXR1cm4gJ2ludmFsaWRfdG9rZW4nO1xyXG5cdFx0XHRjYXNlIDUwMDpcclxuXHRcdFx0XHRyZXR1cm4gJ3NlcnZlcl9lcnJvcic7XHJcblx0XHRcdGRlZmF1bHQ6XHJcblx0XHRcdFx0cmV0dXJuICdzZXJ2ZXJfZXJyb3InO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcbn0oaGVsbG8pKTtcclxuXHJcbihmdW5jdGlvbihoZWxsbykge1xyXG5cclxuXHRoZWxsby5pbml0KHtcclxuXHJcblx0XHRsaW5rZWRpbjoge1xyXG5cclxuXHRcdFx0b2F1dGg6IHtcclxuXHRcdFx0XHR2ZXJzaW9uOiAyLFxyXG5cdFx0XHRcdHJlc3BvbnNlX3R5cGU6ICdjb2RlJyxcclxuXHRcdFx0XHRhdXRoOiAnaHR0cHM6Ly93d3cubGlua2VkaW4uY29tL3Vhcy9vYXV0aDIvYXV0aG9yaXphdGlvbicsXHJcblx0XHRcdFx0Z3JhbnQ6ICdodHRwczovL3d3dy5saW5rZWRpbi5jb20vdWFzL29hdXRoMi9hY2Nlc3NUb2tlbidcclxuXHRcdFx0fSxcclxuXHJcblx0XHRcdC8vIFJlZnJlc2ggdGhlIGFjY2Vzc190b2tlbiBvbmNlIGV4cGlyZWRcclxuXHRcdFx0cmVmcmVzaDogdHJ1ZSxcclxuXHJcblx0XHRcdHNjb3BlOiB7XHJcblx0XHRcdFx0YmFzaWM6ICdyX2Jhc2ljcHJvZmlsZScsXHJcblx0XHRcdFx0ZW1haWw6ICdyX2VtYWlsYWRkcmVzcycsXHJcblx0XHRcdFx0ZmlsZXM6ICcnLFxyXG5cdFx0XHRcdGZyaWVuZHM6ICcnLFxyXG5cdFx0XHRcdHBob3RvczogJycsXHJcblx0XHRcdFx0cHVibGlzaDogJ3dfc2hhcmUnLFxyXG5cdFx0XHRcdHB1Ymxpc2hfZmlsZXM6ICd3X3NoYXJlJyxcclxuXHRcdFx0XHRzaGFyZTogJycsXHJcblx0XHRcdFx0dmlkZW9zOiAnJyxcclxuXHRcdFx0XHRvZmZsaW5lX2FjY2VzczogJydcclxuXHRcdFx0fSxcclxuXHRcdFx0c2NvcGVfZGVsaW06ICcgJyxcclxuXHJcblx0XHRcdGJhc2U6ICdodHRwczovL2FwaS5saW5rZWRpbi5jb20vdjEvJyxcclxuXHJcblx0XHRcdGdldDoge1xyXG5cdFx0XHRcdG1lOiAncGVvcGxlL346KHBpY3R1cmUtdXJsLGZpcnN0LW5hbWUsbGFzdC1uYW1lLGlkLGZvcm1hdHRlZC1uYW1lLGVtYWlsLWFkZHJlc3MpJyxcclxuXHJcblx0XHRcdFx0Ly8gU2VlOiBodHRwOi8vZGV2ZWxvcGVyLmxpbmtlZGluLmNvbS9kb2N1bWVudHMvZ2V0LW5ldHdvcmstdXBkYXRlcy1hbmQtc3RhdGlzdGljcy1hcGlcclxuXHRcdFx0XHQnbWUvc2hhcmUnOiAncGVvcGxlL34vbmV0d29yay91cGRhdGVzP2NvdW50PUB7bGltaXR8MjUwfSdcclxuXHRcdFx0fSxcclxuXHJcblx0XHRcdHBvc3Q6IHtcclxuXHJcblx0XHRcdFx0Ly8gU2VlOiBodHRwczovL2RldmVsb3Blci5saW5rZWRpbi5jb20vZG9jdW1lbnRzL2FwaS1yZXF1ZXN0cy1qc29uXHJcblx0XHRcdFx0J21lL3NoYXJlJzogZnVuY3Rpb24ocCwgY2FsbGJhY2spIHtcclxuXHRcdFx0XHRcdHZhciBkYXRhID0ge1xyXG5cdFx0XHRcdFx0XHR2aXNpYmlsaXR5OiB7XHJcblx0XHRcdFx0XHRcdFx0Y29kZTogJ2FueW9uZSdcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0fTtcclxuXHJcblx0XHRcdFx0XHRpZiAocC5kYXRhLmlkKSB7XHJcblxyXG5cdFx0XHRcdFx0XHRkYXRhLmF0dHJpYnV0aW9uID0ge1xyXG5cdFx0XHRcdFx0XHRcdHNoYXJlOiB7XHJcblx0XHRcdFx0XHRcdFx0XHRpZDogcC5kYXRhLmlkXHJcblx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHR9O1xyXG5cclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdGVsc2Uge1xyXG5cdFx0XHRcdFx0XHRkYXRhLmNvbW1lbnQgPSBwLmRhdGEubWVzc2FnZTtcclxuXHRcdFx0XHRcdFx0aWYgKHAuZGF0YS5waWN0dXJlICYmIHAuZGF0YS5saW5rKSB7XHJcblx0XHRcdFx0XHRcdFx0ZGF0YS5jb250ZW50ID0ge1xyXG5cdFx0XHRcdFx0XHRcdFx0J3N1Ym1pdHRlZC11cmwnOiBwLmRhdGEubGluayxcclxuXHRcdFx0XHRcdFx0XHRcdCdzdWJtaXR0ZWQtaW1hZ2UtdXJsJzogcC5kYXRhLnBpY3R1cmVcclxuXHRcdFx0XHRcdFx0XHR9O1xyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0cC5kYXRhID0gSlNPTi5zdHJpbmdpZnkoZGF0YSk7XHJcblxyXG5cdFx0XHRcdFx0Y2FsbGJhY2soJ3Blb3BsZS9+L3NoYXJlcz9mb3JtYXQ9anNvbicpO1xyXG5cdFx0XHRcdH0sXHJcblxyXG5cdFx0XHRcdCdtZS9saWtlJzogbGlrZVxyXG5cdFx0XHR9LFxyXG5cclxuXHRcdFx0ZGVsOntcclxuXHRcdFx0XHQnbWUvbGlrZSc6IGxpa2VcclxuXHRcdFx0fSxcclxuXHJcblx0XHRcdHdyYXA6IHtcclxuXHRcdFx0XHRtZTogZnVuY3Rpb24obykge1xyXG5cdFx0XHRcdFx0Zm9ybWF0RXJyb3Iobyk7XHJcblx0XHRcdFx0XHRmb3JtYXRVc2VyKG8pO1xyXG5cdFx0XHRcdFx0cmV0dXJuIG87XHJcblx0XHRcdFx0fSxcclxuXHJcblx0XHRcdFx0J21lL2ZyaWVuZHMnOiBmb3JtYXRGcmllbmRzLFxyXG5cdFx0XHRcdCdtZS9mb2xsb3dpbmcnOiBmb3JtYXRGcmllbmRzLFxyXG5cdFx0XHRcdCdtZS9mb2xsb3dlcnMnOiBmb3JtYXRGcmllbmRzLFxyXG5cdFx0XHRcdCdtZS9zaGFyZSc6IGZ1bmN0aW9uKG8pIHtcclxuXHRcdFx0XHRcdGZvcm1hdEVycm9yKG8pO1xyXG5cdFx0XHRcdFx0cGFnaW5nKG8pO1xyXG5cdFx0XHRcdFx0aWYgKG8udmFsdWVzKSB7XHJcblx0XHRcdFx0XHRcdG8uZGF0YSA9IG8udmFsdWVzLm1hcChmb3JtYXRVc2VyKTtcclxuXHRcdFx0XHRcdFx0by5kYXRhLmZvckVhY2goZnVuY3Rpb24oaXRlbSkge1xyXG5cdFx0XHRcdFx0XHRcdGl0ZW0ubWVzc2FnZSA9IGl0ZW0uaGVhZGxpbmU7XHJcblx0XHRcdFx0XHRcdH0pO1xyXG5cclxuXHRcdFx0XHRcdFx0ZGVsZXRlIG8udmFsdWVzO1xyXG5cdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdHJldHVybiBvO1xyXG5cdFx0XHRcdH0sXHJcblxyXG5cdFx0XHRcdCdkZWZhdWx0JzogZnVuY3Rpb24obywgaGVhZGVycykge1xyXG5cdFx0XHRcdFx0Zm9ybWF0RXJyb3Iobyk7XHJcblx0XHRcdFx0XHRlbXB0eShvLCBoZWFkZXJzKTtcclxuXHRcdFx0XHRcdHBhZ2luZyhvKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0sXHJcblxyXG5cdFx0XHRqc29ucDogZnVuY3Rpb24ocCwgcXMpIHtcclxuXHRcdFx0XHRmb3JtYXRRdWVyeShxcyk7XHJcblx0XHRcdFx0aWYgKHAubWV0aG9kID09PSAnZ2V0Jykge1xyXG5cdFx0XHRcdFx0cXMuZm9ybWF0ID0gJ2pzb25wJztcclxuXHRcdFx0XHRcdHFzWydlcnJvci1jYWxsYmFjayddID0gcC5jYWxsYmFja0lEO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSxcclxuXHJcblx0XHRcdHhocjogZnVuY3Rpb24ocCwgcXMpIHtcclxuXHRcdFx0XHRpZiAocC5tZXRob2QgIT09ICdnZXQnKSB7XHJcblx0XHRcdFx0XHRmb3JtYXRRdWVyeShxcyk7XHJcblx0XHRcdFx0XHRwLmhlYWRlcnNbJ0NvbnRlbnQtVHlwZSddID0gJ2FwcGxpY2F0aW9uL2pzb24nO1xyXG5cclxuXHRcdFx0XHRcdC8vIE5vdGU6IHgtbGktZm9ybWF0IGVuc3VyZXMgZXJyb3IgcmVzcG9uc2VzIGFyZSBub3QgcmV0dXJuZWQgaW4gWE1MXHJcblx0XHRcdFx0XHRwLmhlYWRlcnNbJ3gtbGktZm9ybWF0J10gPSAnanNvbic7XHJcblx0XHRcdFx0XHRwLnByb3h5ID0gdHJ1ZTtcclxuXHRcdFx0XHRcdHJldHVybiB0cnVlO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fSk7XHJcblxyXG5cdGZ1bmN0aW9uIGZvcm1hdEVycm9yKG8pIHtcclxuXHRcdGlmIChvICYmICdlcnJvckNvZGUnIGluIG8pIHtcclxuXHRcdFx0by5lcnJvciA9IHtcclxuXHRcdFx0XHRjb2RlOiBvLnN0YXR1cyxcclxuXHRcdFx0XHRtZXNzYWdlOiBvLm1lc3NhZ2VcclxuXHRcdFx0fTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGZ1bmN0aW9uIGZvcm1hdFVzZXIobykge1xyXG5cdFx0aWYgKG8uZXJyb3IpIHtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cclxuXHRcdG8uZmlyc3RfbmFtZSA9IG8uZmlyc3ROYW1lO1xyXG5cdFx0by5sYXN0X25hbWUgPSBvLmxhc3ROYW1lO1xyXG5cdFx0by5uYW1lID0gby5mb3JtYXR0ZWROYW1lIHx8IChvLmZpcnN0X25hbWUgKyAnICcgKyBvLmxhc3RfbmFtZSk7XHJcblx0XHRvLnRodW1ibmFpbCA9IG8ucGljdHVyZVVybDtcclxuXHRcdG8uZW1haWwgPSBvLmVtYWlsQWRkcmVzcztcclxuXHRcdHJldHVybiBvO1xyXG5cdH1cclxuXHJcblx0ZnVuY3Rpb24gZm9ybWF0RnJpZW5kcyhvKSB7XHJcblx0XHRmb3JtYXRFcnJvcihvKTtcclxuXHRcdHBhZ2luZyhvKTtcclxuXHRcdGlmIChvLnZhbHVlcykge1xyXG5cdFx0XHRvLmRhdGEgPSBvLnZhbHVlcy5tYXAoZm9ybWF0VXNlcik7XHJcblx0XHRcdGRlbGV0ZSBvLnZhbHVlcztcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gbztcclxuXHR9XHJcblxyXG5cdGZ1bmN0aW9uIHBhZ2luZyhyZXMpIHtcclxuXHRcdGlmICgnX2NvdW50JyBpbiByZXMgJiYgJ19zdGFydCcgaW4gcmVzICYmIChyZXMuX2NvdW50ICsgcmVzLl9zdGFydCkgPCByZXMuX3RvdGFsKSB7XHJcblx0XHRcdHJlcy5wYWdpbmcgPSB7XHJcblx0XHRcdFx0bmV4dDogJz9zdGFydD0nICsgKHJlcy5fc3RhcnQgKyByZXMuX2NvdW50KSArICcmY291bnQ9JyArIHJlcy5fY291bnRcclxuXHRcdFx0fTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGZ1bmN0aW9uIGVtcHR5KG8sIGhlYWRlcnMpIHtcclxuXHRcdGlmIChKU09OLnN0cmluZ2lmeShvKSA9PT0gJ3t9JyAmJiBoZWFkZXJzLnN0YXR1c0NvZGUgPT09IDIwMCkge1xyXG5cdFx0XHRvLnN1Y2Nlc3MgPSB0cnVlO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0ZnVuY3Rpb24gZm9ybWF0UXVlcnkocXMpIHtcclxuXHRcdC8vIExpbmtlZEluIHNpZ25zIHJlcXVlc3RzIHdpdGggdGhlIHBhcmFtZXRlciAnb2F1dGgyX2FjY2Vzc190b2tlbidcclxuXHRcdC8vIC4uLiB5ZWFoIGFub3RoZXIgb25lIHdobyB0aGlua3MgdGhleSBzaG91bGQgYmUgZGlmZmVyZW50IVxyXG5cdFx0aWYgKHFzLmFjY2Vzc190b2tlbikge1xyXG5cdFx0XHRxcy5vYXV0aDJfYWNjZXNzX3Rva2VuID0gcXMuYWNjZXNzX3Rva2VuO1xyXG5cdFx0XHRkZWxldGUgcXMuYWNjZXNzX3Rva2VuO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0ZnVuY3Rpb24gbGlrZShwLCBjYWxsYmFjaykge1xyXG5cdFx0cC5oZWFkZXJzWyd4LWxpLWZvcm1hdCddID0gJ2pzb24nO1xyXG5cdFx0dmFyIGlkID0gcC5kYXRhLmlkO1xyXG5cdFx0cC5kYXRhID0gKHAubWV0aG9kICE9PSAnZGVsZXRlJykudG9TdHJpbmcoKTtcclxuXHRcdHAubWV0aG9kID0gJ3B1dCc7XHJcblx0XHRjYWxsYmFjaygncGVvcGxlL34vbmV0d29yay91cGRhdGVzL2tleT0nICsgaWQgKyAnL2lzLWxpa2VkJyk7XHJcblx0fVxyXG5cclxufSkoaGVsbG8pO1xyXG5cclxuLy8gU2VlOiBodHRwczovL2RldmVsb3BlcnMuc291bmRjbG91ZC5jb20vZG9jcy9hcGkvcmVmZXJlbmNlXHJcbihmdW5jdGlvbihoZWxsbykge1xyXG5cclxuXHRoZWxsby5pbml0KHtcclxuXHJcblx0XHRzb3VuZGNsb3VkOiB7XHJcblx0XHRcdG5hbWU6ICdTb3VuZENsb3VkJyxcclxuXHJcblx0XHRcdG9hdXRoOiB7XHJcblx0XHRcdFx0dmVyc2lvbjogMixcclxuXHRcdFx0XHRhdXRoOiAnaHR0cHM6Ly9zb3VuZGNsb3VkLmNvbS9jb25uZWN0JyxcclxuXHRcdFx0XHRncmFudDogJ2h0dHBzOi8vc291bmRjbG91ZC5jb20vb2F1dGgyL3Rva2VuJ1xyXG5cdFx0XHR9LFxyXG5cclxuXHRcdFx0Ly8gUmVxdWVzdCBwYXRoIHRyYW5zbGF0ZWRcclxuXHRcdFx0YmFzZTogJ2h0dHBzOi8vYXBpLnNvdW5kY2xvdWQuY29tLycsXHJcblx0XHRcdGdldDoge1xyXG5cdFx0XHRcdG1lOiAnbWUuanNvbicsXHJcblxyXG5cdFx0XHRcdC8vIEh0dHA6Ly9kZXZlbG9wZXJzLnNvdW5kY2xvdWQuY29tL2RvY3MvYXBpL3JlZmVyZW5jZSNtZVxyXG5cdFx0XHRcdCdtZS9mcmllbmRzJzogJ21lL2ZvbGxvd2luZ3MuanNvbicsXHJcblx0XHRcdFx0J21lL2ZvbGxvd2Vycyc6ICdtZS9mb2xsb3dlcnMuanNvbicsXHJcblx0XHRcdFx0J21lL2ZvbGxvd2luZyc6ICdtZS9mb2xsb3dpbmdzLmpzb24nLFxyXG5cclxuXHRcdFx0XHQvLyBTZWU6IGh0dHA6Ly9kZXZlbG9wZXJzLnNvdW5kY2xvdWQuY29tL2RvY3MvYXBpL3JlZmVyZW5jZSNhY3Rpdml0aWVzXHJcblx0XHRcdFx0J2RlZmF1bHQnOiBmdW5jdGlvbihwLCBjYWxsYmFjaykge1xyXG5cclxuXHRcdFx0XHRcdC8vIEluY2x1ZGUgJy5qc29uIGF0IHRoZSBlbmQgb2YgZWFjaCByZXF1ZXN0J1xyXG5cdFx0XHRcdFx0Y2FsbGJhY2socC5wYXRoICsgJy5qc29uJyk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9LFxyXG5cclxuXHRcdFx0Ly8gUmVzcG9uc2UgaGFuZGxlcnNcclxuXHRcdFx0d3JhcDoge1xyXG5cdFx0XHRcdG1lOiBmdW5jdGlvbihvKSB7XHJcblx0XHRcdFx0XHRmb3JtYXRVc2VyKG8pO1xyXG5cdFx0XHRcdFx0cmV0dXJuIG87XHJcblx0XHRcdFx0fSxcclxuXHJcblx0XHRcdFx0J2RlZmF1bHQnOiBmdW5jdGlvbihvKSB7XHJcblx0XHRcdFx0XHRpZiAoQXJyYXkuaXNBcnJheShvKSkge1xyXG5cdFx0XHRcdFx0XHRvID0ge1xyXG5cdFx0XHRcdFx0XHRcdGRhdGE6IG8ubWFwKGZvcm1hdFVzZXIpXHJcblx0XHRcdFx0XHRcdH07XHJcblx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0cGFnaW5nKG8pO1xyXG5cdFx0XHRcdFx0cmV0dXJuIG87XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9LFxyXG5cclxuXHRcdFx0eGhyOiBmb3JtYXRSZXF1ZXN0LFxyXG5cdFx0XHRqc29ucDogZm9ybWF0UmVxdWVzdFxyXG5cdFx0fVxyXG5cdH0pO1xyXG5cclxuXHRmdW5jdGlvbiBmb3JtYXRSZXF1ZXN0KHAsIHFzKSB7XHJcblx0XHQvLyBBbHRlciB0aGUgcXVlcnlzdHJpbmdcclxuXHRcdHZhciB0b2tlbiA9IHFzLmFjY2Vzc190b2tlbjtcclxuXHRcdGRlbGV0ZSBxcy5hY2Nlc3NfdG9rZW47XHJcblx0XHRxcy5vYXV0aF90b2tlbiA9IHRva2VuO1xyXG5cdFx0cXNbJ19zdGF0dXNfY29kZV9tYXBbMzAyXSddID0gMjAwO1xyXG5cdFx0cmV0dXJuIHRydWU7XHJcblx0fVxyXG5cclxuXHRmdW5jdGlvbiBmb3JtYXRVc2VyKG8pIHtcclxuXHRcdGlmIChvLmlkKSB7XHJcblx0XHRcdG8ucGljdHVyZSA9IG8uYXZhdGFyX3VybDtcclxuXHRcdFx0by50aHVtYm5haWwgPSBvLmF2YXRhcl91cmw7XHJcblx0XHRcdG8ubmFtZSA9IG8udXNlcm5hbWUgfHwgby5mdWxsX25hbWU7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIG87XHJcblx0fVxyXG5cclxuXHQvLyBTZWU6IGh0dHA6Ly9kZXZlbG9wZXJzLnNvdW5kY2xvdWQuY29tL2RvY3MvYXBpL3JlZmVyZW5jZSNhY3Rpdml0aWVzXHJcblx0ZnVuY3Rpb24gcGFnaW5nKHJlcykge1xyXG5cdFx0aWYgKCduZXh0X2hyZWYnIGluIHJlcykge1xyXG5cdFx0XHRyZXMucGFnaW5nID0ge1xyXG5cdFx0XHRcdG5leHQ6IHJlcy5uZXh0X2hyZWZcclxuXHRcdFx0fTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG59KShoZWxsbyk7XHJcblxyXG4oZnVuY3Rpb24oaGVsbG8pIHtcclxuXHJcblx0dmFyIGJhc2UgPSAnaHR0cHM6Ly9hcGkudHdpdHRlci5jb20vJztcclxuXHJcblx0aGVsbG8uaW5pdCh7XHJcblxyXG5cdFx0dHdpdHRlcjoge1xyXG5cclxuXHRcdFx0Ly8gRW5zdXJlIHRoYXQgeW91IGRlZmluZSBhbiBvYXV0aF9wcm94eVxyXG5cdFx0XHRvYXV0aDoge1xyXG5cdFx0XHRcdHZlcnNpb246ICcxLjBhJyxcclxuXHRcdFx0XHRhdXRoOiBiYXNlICsgJ29hdXRoL2F1dGhlbnRpY2F0ZScsXHJcblx0XHRcdFx0cmVxdWVzdDogYmFzZSArICdvYXV0aC9yZXF1ZXN0X3Rva2VuJyxcclxuXHRcdFx0XHR0b2tlbjogYmFzZSArICdvYXV0aC9hY2Nlc3NfdG9rZW4nXHJcblx0XHRcdH0sXHJcblxyXG5cdFx0XHRsb2dpbjogZnVuY3Rpb24ocCkge1xyXG5cdFx0XHRcdC8vIFJlYXV0aGVudGljYXRlXHJcblx0XHRcdFx0Ly8gaHR0cHM6Ly9kZXYudHdpdHRlci5jb20vb2F1dGgvcmVmZXJlbmNlL2dldC9vYXV0aC9hdXRoZW50aWNhdGVcclxuXHRcdFx0XHR2YXIgcHJlZml4ID0gJz9mb3JjZV9sb2dpbj10cnVlJztcclxuXHRcdFx0XHR0aGlzLm9hdXRoLmF1dGggPSB0aGlzLm9hdXRoLmF1dGgucmVwbGFjZShwcmVmaXgsICcnKSArIChwLm9wdGlvbnMuZm9yY2UgPyBwcmVmaXggOiAnJyk7XHJcblx0XHRcdH0sXHJcblxyXG5cdFx0XHRiYXNlOiBiYXNlICsgJzEuMS8nLFxyXG5cclxuXHRcdFx0Z2V0OiB7XHJcblx0XHRcdFx0bWU6ICdhY2NvdW50L3ZlcmlmeV9jcmVkZW50aWFscy5qc29uJyxcclxuXHRcdFx0XHQnbWUvZnJpZW5kcyc6ICdmcmllbmRzL2xpc3QuanNvbj9jb3VudD1Ae2xpbWl0fDIwMH0nLFxyXG5cdFx0XHRcdCdtZS9mb2xsb3dpbmcnOiAnZnJpZW5kcy9saXN0Lmpzb24/Y291bnQ9QHtsaW1pdHwyMDB9JyxcclxuXHRcdFx0XHQnbWUvZm9sbG93ZXJzJzogJ2ZvbGxvd2Vycy9saXN0Lmpzb24/Y291bnQ9QHtsaW1pdHwyMDB9JyxcclxuXHJcblx0XHRcdFx0Ly8gSHR0cHM6Ly9kZXYudHdpdHRlci5jb20vZG9jcy9hcGkvMS4xL2dldC9zdGF0dXNlcy91c2VyX3RpbWVsaW5lXHJcblx0XHRcdFx0J21lL3NoYXJlJzogJ3N0YXR1c2VzL3VzZXJfdGltZWxpbmUuanNvbj9jb3VudD1Ae2xpbWl0fDIwMH0nLFxyXG5cclxuXHRcdFx0XHQvLyBIdHRwczovL2Rldi50d2l0dGVyLmNvbS9yZXN0L3JlZmVyZW5jZS9nZXQvZmF2b3JpdGVzL2xpc3RcclxuXHRcdFx0XHQnbWUvbGlrZSc6ICdmYXZvcml0ZXMvbGlzdC5qc29uP2NvdW50PUB7bGltaXR8MjAwfSdcclxuXHRcdFx0fSxcclxuXHJcblx0XHRcdHBvc3Q6IHtcclxuXHRcdFx0XHQnbWUvc2hhcmUnOiBmdW5jdGlvbihwLCBjYWxsYmFjaykge1xyXG5cclxuXHRcdFx0XHRcdHZhciBkYXRhID0gcC5kYXRhO1xyXG5cdFx0XHRcdFx0cC5kYXRhID0gbnVsbDtcclxuXHJcblx0XHRcdFx0XHR2YXIgc3RhdHVzID0gW107XHJcblxyXG5cdFx0XHRcdFx0Ly8gQ2hhbmdlIG1lc3NhZ2UgdG8gc3RhdHVzXHJcblx0XHRcdFx0XHRpZiAoZGF0YS5tZXNzYWdlKSB7XHJcblx0XHRcdFx0XHRcdHN0YXR1cy5wdXNoKGRhdGEubWVzc2FnZSk7XHJcblx0XHRcdFx0XHRcdGRlbGV0ZSBkYXRhLm1lc3NhZ2U7XHJcblx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0Ly8gSWYgbGluayBpcyBnaXZlblxyXG5cdFx0XHRcdFx0aWYgKGRhdGEubGluaykge1xyXG5cdFx0XHRcdFx0XHRzdGF0dXMucHVzaChkYXRhLmxpbmspO1xyXG5cdFx0XHRcdFx0XHRkZWxldGUgZGF0YS5saW5rO1xyXG5cdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdGlmIChkYXRhLnBpY3R1cmUpIHtcclxuXHRcdFx0XHRcdFx0c3RhdHVzLnB1c2goZGF0YS5waWN0dXJlKTtcclxuXHRcdFx0XHRcdFx0ZGVsZXRlIGRhdGEucGljdHVyZTtcclxuXHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHQvLyBDb21wb3VuZCBhbGwgdGhlIGNvbXBvbmVudHNcclxuXHRcdFx0XHRcdGlmIChzdGF0dXMubGVuZ3RoKSB7XHJcblx0XHRcdFx0XHRcdGRhdGEuc3RhdHVzID0gc3RhdHVzLmpvaW4oJyAnKTtcclxuXHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHQvLyBUd2VldCBtZWRpYVxyXG5cdFx0XHRcdFx0aWYgKGRhdGEuZmlsZSkge1xyXG5cdFx0XHRcdFx0XHRkYXRhWydtZWRpYVtdJ10gPSBkYXRhLmZpbGU7XHJcblx0XHRcdFx0XHRcdGRlbGV0ZSBkYXRhLmZpbGU7XHJcblx0XHRcdFx0XHRcdHAuZGF0YSA9IGRhdGE7XHJcblx0XHRcdFx0XHRcdGNhbGxiYWNrKCdzdGF0dXNlcy91cGRhdGVfd2l0aF9tZWRpYS5qc29uJyk7XHJcblx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0Ly8gUmV0d2VldD9cclxuXHRcdFx0XHRcdGVsc2UgaWYgKCdpZCcgaW4gZGF0YSkge1xyXG5cdFx0XHRcdFx0XHRjYWxsYmFjaygnc3RhdHVzZXMvcmV0d2VldC8nICsgZGF0YS5pZCArICcuanNvbicpO1xyXG5cdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdC8vIFR3ZWV0XHJcblx0XHRcdFx0XHRlbHNlIHtcclxuXHRcdFx0XHRcdFx0Ly8gQXNzaWduIHRoZSBwb3N0IGJvZHkgdG8gdGhlIHF1ZXJ5IHBhcmFtZXRlcnNcclxuXHRcdFx0XHRcdFx0aGVsbG8udXRpbHMuZXh0ZW5kKHAucXVlcnksIGRhdGEpO1xyXG5cdFx0XHRcdFx0XHRjYWxsYmFjaygnc3RhdHVzZXMvdXBkYXRlLmpzb24/aW5jbHVkZV9lbnRpdGllcz0xJyk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fSxcclxuXHJcblx0XHRcdFx0Ly8gU2VlOiBodHRwczovL2Rldi50d2l0dGVyLmNvbS9yZXN0L3JlZmVyZW5jZS9wb3N0L2Zhdm9yaXRlcy9jcmVhdGVcclxuXHRcdFx0XHQnbWUvbGlrZSc6IGZ1bmN0aW9uKHAsIGNhbGxiYWNrKSB7XHJcblx0XHRcdFx0XHR2YXIgaWQgPSBwLmRhdGEuaWQ7XHJcblx0XHRcdFx0XHRwLmRhdGEgPSBudWxsO1xyXG5cdFx0XHRcdFx0Y2FsbGJhY2soJ2Zhdm9yaXRlcy9jcmVhdGUuanNvbj9pZD0nICsgaWQpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSxcclxuXHJcblx0XHRcdGRlbDoge1xyXG5cclxuXHRcdFx0XHQvLyBTZWU6IGh0dHBzOi8vZGV2LnR3aXR0ZXIuY29tL3Jlc3QvcmVmZXJlbmNlL3Bvc3QvZmF2b3JpdGVzL2Rlc3Ryb3lcclxuXHRcdFx0XHQnbWUvbGlrZSc6IGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdFx0cC5tZXRob2QgPSAncG9zdCc7XHJcblx0XHRcdFx0XHR2YXIgaWQgPSBwLmRhdGEuaWQ7XHJcblx0XHRcdFx0XHRwLmRhdGEgPSBudWxsO1xyXG5cdFx0XHRcdFx0Y2FsbGJhY2soJ2Zhdm9yaXRlcy9kZXN0cm95Lmpzb24/aWQ9JyArIGlkKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0sXHJcblxyXG5cdFx0XHR3cmFwOiB7XHJcblx0XHRcdFx0bWU6IGZ1bmN0aW9uKHJlcykge1xyXG5cdFx0XHRcdFx0Zm9ybWF0RXJyb3IocmVzKTtcclxuXHRcdFx0XHRcdGZvcm1hdFVzZXIocmVzKTtcclxuXHRcdFx0XHRcdHJldHVybiByZXM7XHJcblx0XHRcdFx0fSxcclxuXHJcblx0XHRcdFx0J21lL2ZyaWVuZHMnOiBmb3JtYXRGcmllbmRzLFxyXG5cdFx0XHRcdCdtZS9mb2xsb3dlcnMnOiBmb3JtYXRGcmllbmRzLFxyXG5cdFx0XHRcdCdtZS9mb2xsb3dpbmcnOiBmb3JtYXRGcmllbmRzLFxyXG5cclxuXHRcdFx0XHQnbWUvc2hhcmUnOiBmdW5jdGlvbihyZXMpIHtcclxuXHRcdFx0XHRcdGZvcm1hdEVycm9yKHJlcyk7XHJcblx0XHRcdFx0XHRwYWdpbmcocmVzKTtcclxuXHRcdFx0XHRcdGlmICghcmVzLmVycm9yICYmICdsZW5ndGgnIGluIHJlcykge1xyXG5cdFx0XHRcdFx0XHRyZXR1cm4ge2RhdGE6IHJlc307XHJcblx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0cmV0dXJuIHJlcztcclxuXHRcdFx0XHR9LFxyXG5cclxuXHRcdFx0XHQnZGVmYXVsdCc6IGZ1bmN0aW9uKHJlcykge1xyXG5cdFx0XHRcdFx0cmVzID0gYXJyYXlUb0RhdGFSZXNwb25zZShyZXMpO1xyXG5cdFx0XHRcdFx0cGFnaW5nKHJlcyk7XHJcblx0XHRcdFx0XHRyZXR1cm4gcmVzO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSxcclxuXHRcdFx0eGhyOiBmdW5jdGlvbihwKSB7XHJcblxyXG5cdFx0XHRcdC8vIFJlbHkgb24gdGhlIHByb3h5IGZvciBub24tR0VUIHJlcXVlc3RzLlxyXG5cdFx0XHRcdHJldHVybiAocC5tZXRob2QgIT09ICdnZXQnKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH0pO1xyXG5cclxuXHRmdW5jdGlvbiBmb3JtYXRVc2VyKG8pIHtcclxuXHRcdGlmIChvLmlkKSB7XHJcblx0XHRcdGlmIChvLm5hbWUpIHtcclxuXHRcdFx0XHR2YXIgbSA9IG8ubmFtZS5zcGxpdCgnICcpO1xyXG5cdFx0XHRcdG8uZmlyc3RfbmFtZSA9IG0uc2hpZnQoKTtcclxuXHRcdFx0XHRvLmxhc3RfbmFtZSA9IG0uam9pbignICcpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQvLyBTZWU6IGh0dHBzOi8vZGV2LnR3aXR0ZXIuY29tL292ZXJ2aWV3L2dlbmVyYWwvdXNlci1wcm9maWxlLWltYWdlcy1hbmQtYmFubmVyc1xyXG5cdFx0XHRvLnRodW1ibmFpbCA9IG8ucHJvZmlsZV9pbWFnZV91cmxfaHR0cHMgfHwgby5wcm9maWxlX2ltYWdlX3VybDtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gbztcclxuXHR9XHJcblxyXG5cdGZ1bmN0aW9uIGZvcm1hdEZyaWVuZHMobykge1xyXG5cdFx0Zm9ybWF0RXJyb3Iobyk7XHJcblx0XHRwYWdpbmcobyk7XHJcblx0XHRpZiAoby51c2Vycykge1xyXG5cdFx0XHRvLmRhdGEgPSBvLnVzZXJzLm1hcChmb3JtYXRVc2VyKTtcclxuXHRcdFx0ZGVsZXRlIG8udXNlcnM7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIG87XHJcblx0fVxyXG5cclxuXHRmdW5jdGlvbiBmb3JtYXRFcnJvcihvKSB7XHJcblx0XHRpZiAoby5lcnJvcnMpIHtcclxuXHRcdFx0dmFyIGUgPSBvLmVycm9yc1swXTtcclxuXHRcdFx0by5lcnJvciA9IHtcclxuXHRcdFx0XHRjb2RlOiAncmVxdWVzdF9mYWlsZWQnLFxyXG5cdFx0XHRcdG1lc3NhZ2U6IGUubWVzc2FnZVxyXG5cdFx0XHR9O1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0Ly8gVGFrZSBhIGN1cnNvciBhbmQgYWRkIGl0IHRvIHRoZSBwYXRoXHJcblx0ZnVuY3Rpb24gcGFnaW5nKHJlcykge1xyXG5cdFx0Ly8gRG9lcyB0aGUgcmVzcG9uc2UgaW5jbHVkZSBhICduZXh0X2N1cnNvcl9zdHJpbmcnXHJcblx0XHRpZiAoJ25leHRfY3Vyc29yX3N0cicgaW4gcmVzKSB7XHJcblx0XHRcdC8vIFNlZTogaHR0cHM6Ly9kZXYudHdpdHRlci5jb20vZG9jcy9taXNjL2N1cnNvcmluZ1xyXG5cdFx0XHRyZXMucGFnaW5nID0ge1xyXG5cdFx0XHRcdG5leHQ6ICc/Y3Vyc29yPScgKyByZXMubmV4dF9jdXJzb3Jfc3RyXHJcblx0XHRcdH07XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRmdW5jdGlvbiBhcnJheVRvRGF0YVJlc3BvbnNlKHJlcykge1xyXG5cdFx0cmV0dXJuIEFycmF5LmlzQXJyYXkocmVzKSA/IHtkYXRhOiByZXN9IDogcmVzO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0Ly8gVGhlIGRvY3VtZW50YXRpb24gc2F5cyB0byBkZWZpbmUgdXNlciBpbiB0aGUgcmVxdWVzdFxyXG5cdC8vIEFsdGhvdWdoIGl0cyBub3QgYWN0dWFsbHkgcmVxdWlyZWQuXHJcblxyXG5cdHZhciB1c2VyX2lkO1xyXG5cclxuXHRmdW5jdGlvbiB3aXRoVXNlcklkKGNhbGxiYWNrKXtcclxuXHRcdGlmKHVzZXJfaWQpe1xyXG5cdFx0XHRjYWxsYmFjayh1c2VyX2lkKTtcclxuXHRcdH1cclxuXHRcdGVsc2V7XHJcblx0XHRcdGhlbGxvLmFwaSgndHdpdHRlcjovbWUnLCBmdW5jdGlvbihvKXtcclxuXHRcdFx0XHR1c2VyX2lkID0gby5pZDtcclxuXHRcdFx0XHRjYWxsYmFjayhvLmlkKTtcclxuXHRcdFx0fSk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRmdW5jdGlvbiBzaWduKHVybCl7XHJcblx0XHRyZXR1cm4gZnVuY3Rpb24ocCwgY2FsbGJhY2spe1xyXG5cdFx0XHR3aXRoVXNlcklkKGZ1bmN0aW9uKHVzZXJfaWQpe1xyXG5cdFx0XHRcdGNhbGxiYWNrKHVybCsnP3VzZXJfaWQ9Jyt1c2VyX2lkKTtcclxuXHRcdFx0fSk7XHJcblx0XHR9O1xyXG5cdH1cclxuXHQqL1xyXG5cclxufSkoaGVsbG8pO1xyXG5cclxuLy8gVmtvbnRha3RlICh2ay5jb20pXHJcbihmdW5jdGlvbihoZWxsbykge1xyXG5cclxuXHRoZWxsby5pbml0KHtcclxuXHJcblx0XHR2azoge1xyXG5cdFx0XHRuYW1lOiAnVmsnLFxyXG5cclxuXHRcdFx0Ly8gU2VlIGh0dHBzOi8vdmsuY29tL2Rldi9vYXV0aF9kaWFsb2dcclxuXHRcdFx0b2F1dGg6IHtcclxuXHRcdFx0XHR2ZXJzaW9uOiAyLFxyXG5cdFx0XHRcdGF1dGg6ICdodHRwczovL29hdXRoLnZrLmNvbS9hdXRob3JpemUnLFxyXG5cdFx0XHRcdGdyYW50OiAnaHR0cHM6Ly9vYXV0aC52ay5jb20vYWNjZXNzX3Rva2VuJ1xyXG5cdFx0XHR9LFxyXG5cclxuXHRcdFx0Ly8gQXV0aG9yaXphdGlvbiBzY29wZXNcclxuXHRcdFx0Ly8gU2VlIGh0dHBzOi8vdmsuY29tL2Rldi9wZXJtaXNzaW9uc1xyXG5cdFx0XHRzY29wZToge1xyXG5cdFx0XHRcdGVtYWlsOiAnZW1haWwnLFxyXG5cdFx0XHRcdGZyaWVuZHM6ICdmcmllbmRzJyxcclxuXHRcdFx0XHRwaG90b3M6ICdwaG90b3MnLFxyXG5cdFx0XHRcdHZpZGVvczogJ3ZpZGVvJyxcclxuXHRcdFx0XHRzaGFyZTogJ3NoYXJlJyxcclxuXHRcdFx0XHRvZmZsaW5lX2FjY2VzczogJ29mZmxpbmUnXHJcblx0XHRcdH0sXHJcblxyXG5cdFx0XHQvLyBSZWZyZXNoIHRoZSBhY2Nlc3NfdG9rZW5cclxuXHRcdFx0cmVmcmVzaDogdHJ1ZSxcclxuXHJcblx0XHRcdGxvZ2luOiBmdW5jdGlvbihwKSB7XHJcblx0XHRcdFx0cC5xcy5kaXNwbGF5ID0gd2luZG93Lm5hdmlnYXRvciAmJlxyXG5cdFx0XHRcdFx0d2luZG93Lm5hdmlnYXRvci51c2VyQWdlbnQgJiZcclxuXHRcdFx0XHRcdC9pcGFkfHBob25lfHBob25lfGFuZHJvaWQvLnRlc3Qod2luZG93Lm5hdmlnYXRvci51c2VyQWdlbnQudG9Mb3dlckNhc2UoKSkgPyAnbW9iaWxlJyA6ICdwb3B1cCc7XHJcblx0XHRcdH0sXHJcblxyXG5cdFx0XHQvLyBBUEkgQmFzZSBVUkxcclxuXHRcdFx0YmFzZTogJ2h0dHBzOi8vYXBpLnZrLmNvbS9tZXRob2QvJyxcclxuXHJcblx0XHRcdC8vIE1hcCBHRVQgcmVxdWVzdHNcclxuXHRcdFx0Z2V0OiB7XHJcblx0XHRcdFx0bWU6IGZ1bmN0aW9uKHAsIGNhbGxiYWNrKSB7XHJcblx0XHRcdFx0XHRwLnF1ZXJ5LmZpZWxkcyA9ICdpZCxmaXJzdF9uYW1lLGxhc3RfbmFtZSxwaG90b19tYXgnO1xyXG5cdFx0XHRcdFx0Y2FsbGJhY2soJ3VzZXJzLmdldCcpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSxcclxuXHJcblx0XHRcdHdyYXA6IHtcclxuXHRcdFx0XHRtZTogZnVuY3Rpb24ocmVzLCBoZWFkZXJzLCByZXEpIHtcclxuXHRcdFx0XHRcdGZvcm1hdEVycm9yKHJlcyk7XHJcblx0XHRcdFx0XHRyZXR1cm4gZm9ybWF0VXNlcihyZXMsIHJlcSk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9LFxyXG5cclxuXHRcdFx0Ly8gTm8gWEhSXHJcblx0XHRcdHhocjogZmFsc2UsXHJcblxyXG5cdFx0XHQvLyBBbGwgcmVxdWVzdHMgc2hvdWxkIGJlIEpTT05QIGFzIG9mIG1pc3NpbmcgQ09SUyBoZWFkZXJzIGluIGh0dHBzOi8vYXBpLnZrLmNvbS9tZXRob2QvKlxyXG5cdFx0XHRqc29ucDogdHJ1ZSxcclxuXHJcblx0XHRcdC8vIE5vIGZvcm1cclxuXHRcdFx0Zm9ybTogZmFsc2VcclxuXHRcdH1cclxuXHR9KTtcclxuXHJcblx0ZnVuY3Rpb24gZm9ybWF0VXNlcihvLCByZXEpIHtcclxuXHJcblx0XHRpZiAobyAhPT0gbnVsbCAmJiAncmVzcG9uc2UnIGluIG8gJiYgby5yZXNwb25zZSAhPT0gbnVsbCAmJiBvLnJlc3BvbnNlLmxlbmd0aCkge1xyXG5cdFx0XHRvID0gby5yZXNwb25zZVswXTtcclxuXHRcdFx0by5pZCA9IG8udWlkO1xyXG5cdFx0XHRvLnRodW1ibmFpbCA9IG8ucGljdHVyZSA9IG8ucGhvdG9fbWF4O1xyXG5cdFx0XHRvLm5hbWUgPSBvLmZpcnN0X25hbWUgKyAnICcgKyBvLmxhc3RfbmFtZTtcclxuXHJcblx0XHRcdGlmIChyZXEuYXV0aFJlc3BvbnNlICYmIHJlcS5hdXRoUmVzcG9uc2UuZW1haWwgIT09IG51bGwpXHJcblx0XHRcdFx0by5lbWFpbCA9IHJlcS5hdXRoUmVzcG9uc2UuZW1haWw7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIG87XHJcblx0fVxyXG5cclxuXHRmdW5jdGlvbiBmb3JtYXRFcnJvcihvKSB7XHJcblxyXG5cdFx0aWYgKG8uZXJyb3IpIHtcclxuXHRcdFx0dmFyIGUgPSBvLmVycm9yO1xyXG5cdFx0XHRvLmVycm9yID0ge1xyXG5cdFx0XHRcdGNvZGU6IGUuZXJyb3JfY29kZSxcclxuXHRcdFx0XHRtZXNzYWdlOiBlLmVycm9yX21zZ1xyXG5cdFx0XHR9O1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcbn0pKGhlbGxvKTtcclxuXHJcbihmdW5jdGlvbihoZWxsbykge1xyXG5cclxuXHRoZWxsby5pbml0KHtcclxuXHRcdHdpbmRvd3M6IHtcclxuXHRcdFx0bmFtZTogJ1dpbmRvd3MgbGl2ZScsXHJcblxyXG5cdFx0XHQvLyBSRUY6IGh0dHA6Ly9tc2RuLm1pY3Jvc29mdC5jb20vZW4tdXMvbGlicmFyeS9oaDI0MzY0MS5hc3B4XHJcblx0XHRcdG9hdXRoOiB7XHJcblx0XHRcdFx0dmVyc2lvbjogMixcclxuXHRcdFx0XHRhdXRoOiAnaHR0cHM6Ly9sb2dpbi5saXZlLmNvbS9vYXV0aDIwX2F1dGhvcml6ZS5zcmYnLFxyXG5cdFx0XHRcdGdyYW50OiAnaHR0cHM6Ly9sb2dpbi5saXZlLmNvbS9vYXV0aDIwX3Rva2VuLnNyZidcclxuXHRcdFx0fSxcclxuXHJcblx0XHRcdC8vIFJlZnJlc2ggdGhlIGFjY2Vzc190b2tlbiBvbmNlIGV4cGlyZWRcclxuXHRcdFx0cmVmcmVzaDogdHJ1ZSxcclxuXHJcblx0XHRcdGxvZ291dDogZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0cmV0dXJuICdodHRwOi8vbG9naW4ubGl2ZS5jb20vb2F1dGgyMF9sb2dvdXQuc3JmP3RzPScgKyAobmV3IERhdGUoKSkuZ2V0VGltZSgpO1xyXG5cdFx0XHR9LFxyXG5cclxuXHRcdFx0Ly8gQXV0aG9yaXphdGlvbiBzY29wZXNcclxuXHRcdFx0c2NvcGU6IHtcclxuXHRcdFx0XHRiYXNpYzogJ3dsLnNpZ25pbix3bC5iYXNpYycsXHJcblx0XHRcdFx0ZW1haWw6ICd3bC5lbWFpbHMnLFxyXG5cdFx0XHRcdGJpcnRoZGF5OiAnd2wuYmlydGhkYXknLFxyXG5cdFx0XHRcdGV2ZW50czogJ3dsLmNhbGVuZGFycycsXHJcblx0XHRcdFx0cGhvdG9zOiAnd2wucGhvdG9zJyxcclxuXHRcdFx0XHR2aWRlb3M6ICd3bC5waG90b3MnLFxyXG5cdFx0XHRcdGZyaWVuZHM6ICd3bC5jb250YWN0c19lbWFpbHMnLFxyXG5cdFx0XHRcdGZpbGVzOiAnd2wuc2t5ZHJpdmUnLFxyXG5cdFx0XHRcdHB1Ymxpc2g6ICd3bC5zaGFyZScsXHJcblx0XHRcdFx0cHVibGlzaF9maWxlczogJ3dsLnNreWRyaXZlX3VwZGF0ZScsXHJcblx0XHRcdFx0c2hhcmU6ICd3bC5zaGFyZScsXHJcblx0XHRcdFx0Y3JlYXRlX2V2ZW50OiAnd2wuY2FsZW5kYXJzX3VwZGF0ZSx3bC5ldmVudHNfY3JlYXRlJyxcclxuXHRcdFx0XHRvZmZsaW5lX2FjY2VzczogJ3dsLm9mZmxpbmVfYWNjZXNzJ1xyXG5cdFx0XHR9LFxyXG5cclxuXHRcdFx0Ly8gQVBJIGJhc2UgVVJMXHJcblx0XHRcdGJhc2U6ICdodHRwczovL2FwaXMubGl2ZS5uZXQvdjUuMC8nLFxyXG5cclxuXHRcdFx0Ly8gTWFwIEdFVCByZXF1ZXN0c1xyXG5cdFx0XHRnZXQ6IHtcclxuXHJcblx0XHRcdFx0Ly8gRnJpZW5kc1xyXG5cdFx0XHRcdG1lOiAnbWUnLFxyXG5cdFx0XHRcdCdtZS9mcmllbmRzJzogJ21lL2ZyaWVuZHMnLFxyXG5cdFx0XHRcdCdtZS9mb2xsb3dpbmcnOiAnbWUvY29udGFjdHMnLFxyXG5cdFx0XHRcdCdtZS9mb2xsb3dlcnMnOiAnbWUvZnJpZW5kcycsXHJcblx0XHRcdFx0J21lL2NvbnRhY3RzJzogJ21lL2NvbnRhY3RzJyxcclxuXHJcblx0XHRcdFx0J21lL2FsYnVtcyc6ICdtZS9hbGJ1bXMnLFxyXG5cclxuXHRcdFx0XHQvLyBJbmNsdWRlIHRoZSBkYXRhW2lkXSBpbiB0aGUgcGF0aFxyXG5cdFx0XHRcdCdtZS9hbGJ1bSc6ICdAe2lkfS9maWxlcycsXHJcblx0XHRcdFx0J21lL3Bob3RvJzogJ0B7aWR9JyxcclxuXHJcblx0XHRcdFx0Ly8gRmlsZXNcclxuXHRcdFx0XHQnbWUvZmlsZXMnOiAnQHtwYXJlbnR8bWUvc2t5ZHJpdmV9L2ZpbGVzJyxcclxuXHRcdFx0XHQnbWUvZm9sZGVycyc6ICdAe2lkfG1lL3NreWRyaXZlfS9maWxlcycsXHJcblx0XHRcdFx0J21lL2ZvbGRlcic6ICdAe2lkfG1lL3NreWRyaXZlfS9maWxlcydcclxuXHRcdFx0fSxcclxuXHJcblx0XHRcdC8vIE1hcCBQT1NUIHJlcXVlc3RzXHJcblx0XHRcdHBvc3Q6IHtcclxuXHRcdFx0XHQnbWUvYWxidW1zJzogJ21lL2FsYnVtcycsXHJcblx0XHRcdFx0J21lL2FsYnVtJzogJ0B7aWR9L2ZpbGVzLycsXHJcblxyXG5cdFx0XHRcdCdtZS9mb2xkZXJzJzogJ0B7aWR8bWUvc2t5ZHJpdmUvfScsXHJcblx0XHRcdFx0J21lL2ZpbGVzJzogJ0B7cGFyZW50fG1lL3NreWRyaXZlfS9maWxlcydcclxuXHRcdFx0fSxcclxuXHJcblx0XHRcdC8vIE1hcCBERUxFVEUgcmVxdWVzdHNcclxuXHRcdFx0ZGVsOiB7XHJcblx0XHRcdFx0Ly8gSW5jbHVkZSB0aGUgZGF0YVtpZF0gaW4gdGhlIHBhdGhcclxuXHRcdFx0XHQnbWUvYWxidW0nOiAnQHtpZH0nLFxyXG5cdFx0XHRcdCdtZS9waG90byc6ICdAe2lkfScsXHJcblx0XHRcdFx0J21lL2ZvbGRlcic6ICdAe2lkfScsXHJcblx0XHRcdFx0J21lL2ZpbGVzJzogJ0B7aWR9J1xyXG5cdFx0XHR9LFxyXG5cclxuXHRcdFx0d3JhcDoge1xyXG5cdFx0XHRcdG1lOiBmb3JtYXRVc2VyLFxyXG5cclxuXHRcdFx0XHQnbWUvZnJpZW5kcyc6IGZvcm1hdEZyaWVuZHMsXHJcblx0XHRcdFx0J21lL2NvbnRhY3RzJzogZm9ybWF0RnJpZW5kcyxcclxuXHRcdFx0XHQnbWUvZm9sbG93ZXJzJzogZm9ybWF0RnJpZW5kcyxcclxuXHRcdFx0XHQnbWUvZm9sbG93aW5nJzogZm9ybWF0RnJpZW5kcyxcclxuXHRcdFx0XHQnbWUvYWxidW1zJzogZm9ybWF0QWxidW1zLFxyXG5cdFx0XHRcdCdtZS9waG90b3MnOiBmb3JtYXREZWZhdWx0LFxyXG5cdFx0XHRcdCdkZWZhdWx0JzogZm9ybWF0RGVmYXVsdFxyXG5cdFx0XHR9LFxyXG5cclxuXHRcdFx0eGhyOiBmdW5jdGlvbihwKSB7XHJcblx0XHRcdFx0aWYgKHAubWV0aG9kICE9PSAnZ2V0JyAmJiBwLm1ldGhvZCAhPT0gJ2RlbGV0ZScgJiYgIWhlbGxvLnV0aWxzLmhhc0JpbmFyeShwLmRhdGEpKSB7XHJcblxyXG5cdFx0XHRcdFx0Ly8gRG9lcyB0aGlzIGhhdmUgYSBkYXRhLXVyaSB0byB1cGxvYWQgYXMgYSBmaWxlP1xyXG5cdFx0XHRcdFx0aWYgKHR5cGVvZiAocC5kYXRhLmZpbGUpID09PSAnc3RyaW5nJykge1xyXG5cdFx0XHRcdFx0XHRwLmRhdGEuZmlsZSA9IGhlbGxvLnV0aWxzLnRvQmxvYihwLmRhdGEuZmlsZSk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRlbHNlIHtcclxuXHRcdFx0XHRcdFx0cC5kYXRhID0gSlNPTi5zdHJpbmdpZnkocC5kYXRhKTtcclxuXHRcdFx0XHRcdFx0cC5oZWFkZXJzID0ge1xyXG5cdFx0XHRcdFx0XHRcdCdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbidcclxuXHRcdFx0XHRcdFx0fTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdHJldHVybiB0cnVlO1xyXG5cdFx0XHR9LFxyXG5cclxuXHRcdFx0anNvbnA6IGZ1bmN0aW9uKHApIHtcclxuXHRcdFx0XHRpZiAocC5tZXRob2QgIT09ICdnZXQnICYmICFoZWxsby51dGlscy5oYXNCaW5hcnkocC5kYXRhKSkge1xyXG5cdFx0XHRcdFx0cC5kYXRhLm1ldGhvZCA9IHAubWV0aG9kO1xyXG5cdFx0XHRcdFx0cC5tZXRob2QgPSAnZ2V0JztcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9KTtcclxuXHJcblx0ZnVuY3Rpb24gZm9ybWF0RGVmYXVsdChvKSB7XHJcblx0XHRpZiAoJ2RhdGEnIGluIG8pIHtcclxuXHRcdFx0by5kYXRhLmZvckVhY2goZnVuY3Rpb24oZCkge1xyXG5cdFx0XHRcdGlmIChkLnBpY3R1cmUpIHtcclxuXHRcdFx0XHRcdGQudGh1bWJuYWlsID0gZC5waWN0dXJlO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0aWYgKGQuaW1hZ2VzKSB7XHJcblx0XHRcdFx0XHRkLnBpY3R1cmVzID0gZC5pbWFnZXNcclxuXHRcdFx0XHRcdFx0Lm1hcChmb3JtYXRJbWFnZSlcclxuXHRcdFx0XHRcdFx0LnNvcnQoZnVuY3Rpb24oYSwgYikge1xyXG5cdFx0XHRcdFx0XHRcdHJldHVybiBhLndpZHRoIC0gYi53aWR0aDtcclxuXHRcdFx0XHRcdFx0fSk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9KTtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gbztcclxuXHR9XHJcblxyXG5cdGZ1bmN0aW9uIGZvcm1hdEltYWdlKGltYWdlKSB7XHJcblx0XHRyZXR1cm4ge1xyXG5cdFx0XHR3aWR0aDogaW1hZ2Uud2lkdGgsXHJcblx0XHRcdGhlaWdodDogaW1hZ2UuaGVpZ2h0LFxyXG5cdFx0XHRzb3VyY2U6IGltYWdlLnNvdXJjZVxyXG5cdFx0fTtcclxuXHR9XHJcblxyXG5cdGZ1bmN0aW9uIGZvcm1hdEFsYnVtcyhvKSB7XHJcblx0XHRpZiAoJ2RhdGEnIGluIG8pIHtcclxuXHRcdFx0by5kYXRhLmZvckVhY2goZnVuY3Rpb24oZCkge1xyXG5cdFx0XHRcdGQucGhvdG9zID0gZC5maWxlcyA9ICdodHRwczovL2FwaXMubGl2ZS5uZXQvdjUuMC8nICsgZC5pZCArICcvcGhvdG9zJztcclxuXHRcdFx0fSk7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIG87XHJcblx0fVxyXG5cclxuXHRmdW5jdGlvbiBmb3JtYXRVc2VyKG8sIGhlYWRlcnMsIHJlcSkge1xyXG5cdFx0aWYgKG8uaWQpIHtcclxuXHRcdFx0dmFyIHRva2VuID0gcmVxLnF1ZXJ5LmFjY2Vzc190b2tlbjtcclxuXHRcdFx0aWYgKG8uZW1haWxzKSB7XHJcblx0XHRcdFx0by5lbWFpbCA9IG8uZW1haWxzLnByZWZlcnJlZDtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0Ly8gSWYgdGhpcyBpcyBub3QgYW4gbm9uLW5ldHdvcmsgZnJpZW5kXHJcblx0XHRcdGlmIChvLmlzX2ZyaWVuZCAhPT0gZmFsc2UpIHtcclxuXHRcdFx0XHQvLyBVc2UgdGhlIGlkIG9mIHRoZSB1c2VyX2lkIGlmIGF2YWlsYWJsZVxyXG5cdFx0XHRcdHZhciBpZCA9IChvLnVzZXJfaWQgfHwgby5pZCk7XHJcblx0XHRcdFx0by50aHVtYm5haWwgPSBvLnBpY3R1cmUgPSAnaHR0cHM6Ly9hcGlzLmxpdmUubmV0L3Y1LjAvJyArIGlkICsgJy9waWN0dXJlP2FjY2Vzc190b2tlbj0nICsgdG9rZW47XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gbztcclxuXHR9XHJcblxyXG5cdGZ1bmN0aW9uIGZvcm1hdEZyaWVuZHMobywgaGVhZGVycywgcmVxKSB7XHJcblx0XHRpZiAoJ2RhdGEnIGluIG8pIHtcclxuXHRcdFx0by5kYXRhLmZvckVhY2goZnVuY3Rpb24oZCkge1xyXG5cdFx0XHRcdGZvcm1hdFVzZXIoZCwgaGVhZGVycywgcmVxKTtcclxuXHRcdFx0fSk7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIG87XHJcblx0fVxyXG5cclxufSkoaGVsbG8pO1xyXG5cclxuKGZ1bmN0aW9uKGhlbGxvKSB7XHJcblxyXG5cdGhlbGxvLmluaXQoe1xyXG5cclxuXHRcdHlhaG9vOiB7XHJcblxyXG5cdFx0XHQvLyBFbnN1cmUgdGhhdCB5b3UgZGVmaW5lIGFuIG9hdXRoX3Byb3h5XHJcblx0XHRcdG9hdXRoOiB7XHJcblx0XHRcdFx0dmVyc2lvbjogJzEuMGEnLFxyXG5cdFx0XHRcdGF1dGg6ICdodHRwczovL2FwaS5sb2dpbi55YWhvby5jb20vb2F1dGgvdjIvcmVxdWVzdF9hdXRoJyxcclxuXHRcdFx0XHRyZXF1ZXN0OiAnaHR0cHM6Ly9hcGkubG9naW4ueWFob28uY29tL29hdXRoL3YyL2dldF9yZXF1ZXN0X3Rva2VuJyxcclxuXHRcdFx0XHR0b2tlbjogJ2h0dHBzOi8vYXBpLmxvZ2luLnlhaG9vLmNvbS9vYXV0aC92Mi9nZXRfdG9rZW4nXHJcblx0XHRcdH0sXHJcblxyXG5cdFx0XHQvLyBMb2dpbiBoYW5kbGVyXHJcblx0XHRcdGxvZ2luOiBmdW5jdGlvbihwKSB7XHJcblx0XHRcdFx0Ly8gQ2hhbmdlIHRoZSBkZWZhdWx0IHBvcHVwIHdpbmRvdyB0byBiZSBhdCBsZWFzdCA1NjBcclxuXHRcdFx0XHQvLyBZYWhvbyBkb2VzIGR5bmFtaWNhbGx5IGNoYW5nZSBpdCBvbiB0aGUgZmx5IGZvciB0aGUgc2lnbmluIHNjcmVlbiAob25seSwgd2hhdCBpZiB5b3VyIGFscmVhZHkgc2lnbmVkIGluKVxyXG5cdFx0XHRcdHAub3B0aW9ucy5wb3B1cC53aWR0aCA9IDU2MDtcclxuXHJcblx0XHRcdFx0Ly8gWWFob28gdGhyb3dzIGFuIHBhcmFtZXRlciBlcnJvciBpZiBmb3Igd2hhdGV2ZXIgcmVhc29uIHRoZSBzdGF0ZS5zY29wZSBjb250YWlucyBhIGNvbW1hLCBzbyBsZXRzIHJlbW92ZSBzY29wZVxyXG5cdFx0XHRcdHRyeSB7ZGVsZXRlIHAucXMuc3RhdGUuc2NvcGU7fVxyXG5cdFx0XHRcdGNhdGNoIChlKSB7fVxyXG5cdFx0XHR9LFxyXG5cclxuXHRcdFx0YmFzZTogJ2h0dHBzOi8vc29jaWFsLnlhaG9vYXBpcy5jb20vdjEvJyxcclxuXHJcblx0XHRcdGdldDoge1xyXG5cdFx0XHRcdG1lOiB5cWwoJ3NlbGVjdCAqIGZyb20gc29jaWFsLnByb2ZpbGUoMCkgd2hlcmUgZ3VpZD1tZScpLFxyXG5cdFx0XHRcdCdtZS9mcmllbmRzJzogeXFsKCdzZWxlY3QgKiBmcm9tIHNvY2lhbC5jb250YWN0cygwKSB3aGVyZSBndWlkPW1lJyksXHJcblx0XHRcdFx0J21lL2ZvbGxvd2luZyc6IHlxbCgnc2VsZWN0ICogZnJvbSBzb2NpYWwuY29udGFjdHMoMCkgd2hlcmUgZ3VpZD1tZScpXHJcblx0XHRcdH0sXHJcblx0XHRcdHdyYXA6IHtcclxuXHRcdFx0XHRtZTogZm9ybWF0VXNlcixcclxuXHJcblx0XHRcdFx0Ly8gQ2FuJ3QgZ2V0IElEc1xyXG5cdFx0XHRcdC8vIEl0IG1pZ2h0IGJlIGJldHRlciB0byBsb29wIHRocm91Z2ggdGhlIHNvY2lhbC5yZWxhdGlvbnNoaXAgdGFibGUgd2l0aCBoYXMgdW5pcXVlIElEcyBvZiB1c2Vycy5cclxuXHRcdFx0XHQnbWUvZnJpZW5kcyc6IGZvcm1hdEZyaWVuZHMsXHJcblx0XHRcdFx0J21lL2ZvbGxvd2luZyc6IGZvcm1hdEZyaWVuZHMsXHJcblx0XHRcdFx0J2RlZmF1bHQnOiBwYWdpbmdcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH0pO1xyXG5cclxuXHQvKlxyXG5cdFx0Ly8gQXV0by1yZWZyZXNoIGZpeDogYnVnIGluIFlhaG9vIGNhbid0IGdldCB0aGlzIHRvIHdvcmsgd2l0aCBub2RlLW9hdXRoLXNoaW1cclxuXHRcdGxvZ2luIDogZnVuY3Rpb24obyl7XHJcblx0XHRcdC8vIElzIHRoZSB1c2VyIGFscmVhZHkgbG9nZ2VkIGluXHJcblx0XHRcdHZhciBhdXRoID0gaGVsbG8oJ3lhaG9vJykuZ2V0QXV0aFJlc3BvbnNlKCk7XHJcblxyXG5cdFx0XHQvLyBJcyB0aGlzIGEgcmVmcmVzaCB0b2tlbj9cclxuXHRcdFx0aWYoby5vcHRpb25zLmRpc3BsYXk9PT0nbm9uZScmJmF1dGgmJmF1dGguYWNjZXNzX3Rva2VuJiZhdXRoLnJlZnJlc2hfdG9rZW4pe1xyXG5cdFx0XHRcdC8vIEFkZCB0aGUgb2xkIHRva2VuIGFuZCB0aGUgcmVmcmVzaCB0b2tlbiwgaW5jbHVkaW5nIHBhdGggdG8gdGhlIHF1ZXJ5XHJcblx0XHRcdFx0Ly8gU2VlIGh0dHA6Ly9kZXZlbG9wZXIueWFob28uY29tL29hdXRoL2d1aWRlL29hdXRoLXJlZnJlc2hhY2Nlc3N0b2tlbi5odG1sXHJcblx0XHRcdFx0by5xcy5hY2Nlc3NfdG9rZW4gPSBhdXRoLmFjY2Vzc190b2tlbjtcclxuXHRcdFx0XHRvLnFzLnJlZnJlc2hfdG9rZW4gPSBhdXRoLnJlZnJlc2hfdG9rZW47XHJcblx0XHRcdFx0by5xcy50b2tlbl91cmwgPSAnaHR0cHM6Ly9hcGkubG9naW4ueWFob28uY29tL29hdXRoL3YyL2dldF90b2tlbic7XHJcblx0XHRcdH1cclxuXHRcdH0sXHJcblx0Ki9cclxuXHJcblx0ZnVuY3Rpb24gZm9ybWF0RXJyb3Iobykge1xyXG5cdFx0aWYgKG8gJiYgJ21ldGEnIGluIG8gJiYgJ2Vycm9yX3R5cGUnIGluIG8ubWV0YSkge1xyXG5cdFx0XHRvLmVycm9yID0ge1xyXG5cdFx0XHRcdGNvZGU6IG8ubWV0YS5lcnJvcl90eXBlLFxyXG5cdFx0XHRcdG1lc3NhZ2U6IG8ubWV0YS5lcnJvcl9tZXNzYWdlXHJcblx0XHRcdH07XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRmdW5jdGlvbiBmb3JtYXRVc2VyKG8pIHtcclxuXHJcblx0XHRmb3JtYXRFcnJvcihvKTtcclxuXHRcdGlmIChvLnF1ZXJ5ICYmIG8ucXVlcnkucmVzdWx0cyAmJiBvLnF1ZXJ5LnJlc3VsdHMucHJvZmlsZSkge1xyXG5cdFx0XHRvID0gby5xdWVyeS5yZXN1bHRzLnByb2ZpbGU7XHJcblx0XHRcdG8uaWQgPSBvLmd1aWQ7XHJcblx0XHRcdG8ubGFzdF9uYW1lID0gby5mYW1pbHlOYW1lO1xyXG5cdFx0XHRvLmZpcnN0X25hbWUgPSBvLmdpdmVuTmFtZSB8fCBvLm5pY2tuYW1lO1xyXG5cdFx0XHR2YXIgYSA9IFtdO1xyXG5cdFx0XHRpZiAoby5maXJzdF9uYW1lKSB7XHJcblx0XHRcdFx0YS5wdXNoKG8uZmlyc3RfbmFtZSk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGlmIChvLmxhc3RfbmFtZSkge1xyXG5cdFx0XHRcdGEucHVzaChvLmxhc3RfbmFtZSk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdG8ubmFtZSA9IGEuam9pbignICcpO1xyXG5cdFx0XHRvLmVtYWlsID0gKG8uZW1haWxzICYmIG8uZW1haWxzWzBdKSA/IG8uZW1haWxzWzBdLmhhbmRsZSA6IG51bGw7XHJcblx0XHRcdG8udGh1bWJuYWlsID0gby5pbWFnZSA/IG8uaW1hZ2UuaW1hZ2VVcmwgOiBudWxsO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBvO1xyXG5cdH1cclxuXHJcblx0ZnVuY3Rpb24gZm9ybWF0RnJpZW5kcyhvLCBoZWFkZXJzLCByZXF1ZXN0KSB7XHJcblx0XHRmb3JtYXRFcnJvcihvKTtcclxuXHRcdHBhZ2luZyhvLCBoZWFkZXJzLCByZXF1ZXN0KTtcclxuXHRcdHZhciBjb250YWN0O1xyXG5cdFx0dmFyIGZpZWxkO1xyXG5cdFx0aWYgKG8ucXVlcnkgJiYgby5xdWVyeS5yZXN1bHRzICYmIG8ucXVlcnkucmVzdWx0cy5jb250YWN0KSB7XHJcblx0XHRcdG8uZGF0YSA9IG8ucXVlcnkucmVzdWx0cy5jb250YWN0O1xyXG5cdFx0XHRkZWxldGUgby5xdWVyeTtcclxuXHJcblx0XHRcdGlmICghQXJyYXkuaXNBcnJheShvLmRhdGEpKSB7XHJcblx0XHRcdFx0by5kYXRhID0gW28uZGF0YV07XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdG8uZGF0YS5mb3JFYWNoKGZvcm1hdEZyaWVuZCk7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIG87XHJcblx0fVxyXG5cclxuXHRmdW5jdGlvbiBmb3JtYXRGcmllbmQoY29udGFjdCkge1xyXG5cdFx0Y29udGFjdC5pZCA9IG51bGw7XHJcblxyXG5cdFx0Ly8gIzM2MjogUmVwb3J0cyBvZiByZXNwb25zZXMgcmV0dXJuaW5nIGEgc2luZ2xlIGl0ZW0sIHJhdGhlciB0aGFuIGFuIEFycmF5IG9mIGl0ZW1zLlxyXG5cdFx0Ly8gRm9ybWF0IHRoZSBjb250YWN0LmZpZWxkcyB0byBiZSBhbiBhcnJheS5cclxuXHRcdGlmIChjb250YWN0LmZpZWxkcyAmJiAhKGNvbnRhY3QuZmllbGRzIGluc3RhbmNlb2YgQXJyYXkpKSB7XHJcblx0XHRcdGNvbnRhY3QuZmllbGRzID0gW2NvbnRhY3QuZmllbGRzXTtcclxuXHRcdH1cclxuXHJcblx0XHQoY29udGFjdC5maWVsZHMgfHwgW10pLmZvckVhY2goZnVuY3Rpb24oZmllbGQpIHtcclxuXHRcdFx0aWYgKGZpZWxkLnR5cGUgPT09ICdlbWFpbCcpIHtcclxuXHRcdFx0XHRjb250YWN0LmVtYWlsID0gZmllbGQudmFsdWU7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGlmIChmaWVsZC50eXBlID09PSAnbmFtZScpIHtcclxuXHRcdFx0XHRjb250YWN0LmZpcnN0X25hbWUgPSBmaWVsZC52YWx1ZS5naXZlbk5hbWU7XHJcblx0XHRcdFx0Y29udGFjdC5sYXN0X25hbWUgPSBmaWVsZC52YWx1ZS5mYW1pbHlOYW1lO1xyXG5cdFx0XHRcdGNvbnRhY3QubmFtZSA9IGZpZWxkLnZhbHVlLmdpdmVuTmFtZSArICcgJyArIGZpZWxkLnZhbHVlLmZhbWlseU5hbWU7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGlmIChmaWVsZC50eXBlID09PSAneWFob29pZCcpIHtcclxuXHRcdFx0XHRjb250YWN0LmlkID0gZmllbGQudmFsdWU7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cdH1cclxuXHJcblx0ZnVuY3Rpb24gcGFnaW5nKHJlcywgaGVhZGVycywgcmVxdWVzdCkge1xyXG5cclxuXHRcdC8vIFNlZTogaHR0cDovL2RldmVsb3Blci55YWhvby5jb20veXFsL2d1aWRlL3BhZ2luZy5odG1sI2xvY2FsX2xpbWl0c1xyXG5cdFx0aWYgKHJlcy5xdWVyeSAmJiByZXMucXVlcnkuY291bnQgJiYgcmVxdWVzdC5vcHRpb25zKSB7XHJcblx0XHRcdHJlcy5wYWdpbmcgPSB7XHJcblx0XHRcdFx0bmV4dDogJz9zdGFydD0nICsgKHJlcy5xdWVyeS5jb3VudCArICgrcmVxdWVzdC5vcHRpb25zLnN0YXJ0IHx8IDEpKVxyXG5cdFx0XHR9O1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiByZXM7XHJcblx0fVxyXG5cclxuXHRmdW5jdGlvbiB5cWwocSkge1xyXG5cdFx0cmV0dXJuICdodHRwczovL3F1ZXJ5LnlhaG9vYXBpcy5jb20vdjEveXFsP3E9JyArIChxICsgJyBsaW1pdCBAe2xpbWl0fDEwMH0gb2Zmc2V0IEB7c3RhcnR8MH0nKS5yZXBsYWNlKC9cXHMvZywgJyUyMCcpICsgJyZmb3JtYXQ9anNvbic7XHJcblx0fVxyXG5cclxufSkoaGVsbG8pO1xyXG5cclxuLy8gUmVnaXN0ZXIgYXMgYW5vbnltb3VzIEFNRCBtb2R1bGVcclxuaWYgKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCkge1xyXG5cdGRlZmluZShmdW5jdGlvbigpIHtcclxuXHRcdHJldHVybiBoZWxsbztcclxuXHR9KTtcclxufVxyXG5cclxuLy8gQ29tbW9uSlMgbW9kdWxlIGZvciBicm93c2VyaWZ5XHJcbmlmICh0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0JyAmJiBtb2R1bGUuZXhwb3J0cykge1xyXG5cdG1vZHVsZS5leHBvcnRzID0gaGVsbG87XHJcbn1cclxuIiwiLyohIGhlbGxvanMgdjEuMTQuMCB8IChjKSAyMDEyLTIwMTYgQW5kcmV3IERvZHNvbiB8IE1JVCBodHRwczovL2Fkb2Rzb24uY29tL2hlbGxvLmpzL0xJQ0VOU0UgKi9cclxuLy8gRVM1IE9iamVjdC5jcmVhdGVcclxuaWYgKCFPYmplY3QuY3JlYXRlKSB7XHJcblxyXG5cdC8vIFNoaW0sIE9iamVjdCBjcmVhdGVcclxuXHQvLyBBIHNoaW0gZm9yIE9iamVjdC5jcmVhdGUoKSwgaXQgYWRkcyBhIHByb3RvdHlwZSB0byBhIG5ldyBvYmplY3RcclxuXHRPYmplY3QuY3JlYXRlID0gKGZ1bmN0aW9uKCkge1xyXG5cclxuXHRcdGZ1bmN0aW9uIEYoKSB7fVxyXG5cclxuXHRcdHJldHVybiBmdW5jdGlvbihvKSB7XHJcblxyXG5cdFx0XHRpZiAoYXJndW1lbnRzLmxlbmd0aCAhPSAxKSB7XHJcblx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKCdPYmplY3QuY3JlYXRlIGltcGxlbWVudGF0aW9uIG9ubHkgYWNjZXB0cyBvbmUgcGFyYW1ldGVyLicpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRGLnByb3RvdHlwZSA9IG87XHJcblx0XHRcdHJldHVybiBuZXcgRigpO1xyXG5cdFx0fTtcclxuXHJcblx0fSkoKTtcclxuXHJcbn1cclxuXHJcbi8vIEVTNSBPYmplY3Qua2V5c1xyXG5pZiAoIU9iamVjdC5rZXlzKSB7XHJcblx0T2JqZWN0LmtleXMgPSBmdW5jdGlvbihvLCBrLCByKSB7XHJcblx0XHRyID0gW107XHJcblx0XHRmb3IgKGsgaW4gbykge1xyXG5cdFx0XHRpZiAoci5oYXNPd25Qcm9wZXJ0eS5jYWxsKG8sIGspKVxyXG5cdFx0XHRcdHIucHVzaChrKTtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gcjtcclxuXHR9O1xyXG59XHJcblxyXG4vLyBFUzUgW10uaW5kZXhPZlxyXG5pZiAoIUFycmF5LnByb3RvdHlwZS5pbmRleE9mKSB7XHJcblx0QXJyYXkucHJvdG90eXBlLmluZGV4T2YgPSBmdW5jdGlvbihzKSB7XHJcblxyXG5cdFx0Zm9yICh2YXIgaiA9IDA7IGogPCB0aGlzLmxlbmd0aDsgaisrKSB7XHJcblx0XHRcdGlmICh0aGlzW2pdID09PSBzKSB7XHJcblx0XHRcdFx0cmV0dXJuIGo7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gLTE7XHJcblx0fTtcclxufVxyXG5cclxuLy8gRVM1IFtdLmZvckVhY2hcclxuaWYgKCFBcnJheS5wcm90b3R5cGUuZm9yRWFjaCkge1xyXG5cdEFycmF5LnByb3RvdHlwZS5mb3JFYWNoID0gZnVuY3Rpb24oZnVuLyosIHRoaXNBcmcqLykge1xyXG5cclxuXHRcdGlmICh0aGlzID09PSB2b2lkIDAgfHwgdGhpcyA9PT0gbnVsbCkge1xyXG5cdFx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKCk7XHJcblx0XHR9XHJcblxyXG5cdFx0dmFyIHQgPSBPYmplY3QodGhpcyk7XHJcblx0XHR2YXIgbGVuID0gdC5sZW5ndGggPj4+IDA7XHJcblx0XHRpZiAodHlwZW9mIGZ1biAhPT0gJ2Z1bmN0aW9uJykge1xyXG5cdFx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKCk7XHJcblx0XHR9XHJcblxyXG5cdFx0dmFyIHRoaXNBcmcgPSBhcmd1bWVudHMubGVuZ3RoID49IDIgPyBhcmd1bWVudHNbMV0gOiB2b2lkIDA7XHJcblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XHJcblx0XHRcdGlmIChpIGluIHQpIHtcclxuXHRcdFx0XHRmdW4uY2FsbCh0aGlzQXJnLCB0W2ldLCBpLCB0KTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiB0aGlzO1xyXG5cdH07XHJcbn1cclxuXHJcbi8vIEVTNSBbXS5maWx0ZXJcclxuaWYgKCFBcnJheS5wcm90b3R5cGUuZmlsdGVyKSB7XHJcblx0QXJyYXkucHJvdG90eXBlLmZpbHRlciA9IGZ1bmN0aW9uKGZ1biwgdGhpc0FyZykge1xyXG5cclxuXHRcdHZhciBhID0gW107XHJcblx0XHR0aGlzLmZvckVhY2goZnVuY3Rpb24odmFsLCBpLCB0KSB7XHJcblx0XHRcdGlmIChmdW4uY2FsbCh0aGlzQXJnIHx8IHZvaWQgMCwgdmFsLCBpLCB0KSkge1xyXG5cdFx0XHRcdGEucHVzaCh2YWwpO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHJcblx0XHRyZXR1cm4gYTtcclxuXHR9O1xyXG59XHJcblxyXG4vLyBQcm9kdWN0aW9uIHN0ZXBzIG9mIEVDTUEtMjYyLCBFZGl0aW9uIDUsIDE1LjQuNC4xOVxyXG4vLyBSZWZlcmVuY2U6IGh0dHA6Ly9lczUuZ2l0aHViLmlvLyN4MTUuNC40LjE5XHJcbmlmICghQXJyYXkucHJvdG90eXBlLm1hcCkge1xyXG5cclxuXHRBcnJheS5wcm90b3R5cGUubWFwID0gZnVuY3Rpb24oZnVuLCB0aGlzQXJnKSB7XHJcblxyXG5cdFx0dmFyIGEgPSBbXTtcclxuXHRcdHRoaXMuZm9yRWFjaChmdW5jdGlvbih2YWwsIGksIHQpIHtcclxuXHRcdFx0YS5wdXNoKGZ1bi5jYWxsKHRoaXNBcmcgfHwgdm9pZCAwLCB2YWwsIGksIHQpKTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdHJldHVybiBhO1xyXG5cdH07XHJcbn1cclxuXHJcbi8vIEVTNSBpc0FycmF5XHJcbmlmICghQXJyYXkuaXNBcnJheSkge1xyXG5cclxuXHQvLyBGdW5jdGlvbiBBcnJheS5pc0FycmF5XHJcblx0QXJyYXkuaXNBcnJheSA9IGZ1bmN0aW9uKG8pIHtcclxuXHRcdHJldHVybiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwobykgPT09ICdbb2JqZWN0IEFycmF5XSc7XHJcblx0fTtcclxuXHJcbn1cclxuXHJcbi8vIFRlc3QgZm9yIGxvY2F0aW9uLmFzc2lnblxyXG5pZiAodHlwZW9mIHdpbmRvdyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIHdpbmRvdy5sb2NhdGlvbiA9PT0gJ29iamVjdCcgJiYgIXdpbmRvdy5sb2NhdGlvbi5hc3NpZ24pIHtcclxuXHJcblx0d2luZG93LmxvY2F0aW9uLmFzc2lnbiA9IGZ1bmN0aW9uKHVybCkge1xyXG5cdFx0d2luZG93LmxvY2F0aW9uID0gdXJsO1xyXG5cdH07XHJcblxyXG59XHJcblxyXG4vLyBUZXN0IGZvciBGdW5jdGlvbi5iaW5kXHJcbmlmICghRnVuY3Rpb24ucHJvdG90eXBlLmJpbmQpIHtcclxuXHJcblx0Ly8gTUROXHJcblx0Ly8gUG9seWZpbGwgSUU4LCBkb2VzIG5vdCBzdXBwb3J0IG5hdGl2ZSBGdW5jdGlvbi5iaW5kXHJcblx0RnVuY3Rpb24ucHJvdG90eXBlLmJpbmQgPSBmdW5jdGlvbihiKSB7XHJcblxyXG5cdFx0aWYgKHR5cGVvZiB0aGlzICE9PSAnZnVuY3Rpb24nKSB7XHJcblx0XHRcdHRocm93IG5ldyBUeXBlRXJyb3IoJ0Z1bmN0aW9uLnByb3RvdHlwZS5iaW5kIC0gd2hhdCBpcyB0cnlpbmcgdG8gYmUgYm91bmQgaXMgbm90IGNhbGxhYmxlJyk7XHJcblx0XHR9XHJcblxyXG5cdFx0ZnVuY3Rpb24gQygpIHt9XHJcblxyXG5cdFx0dmFyIGEgPSBbXS5zbGljZTtcclxuXHRcdHZhciBmID0gYS5jYWxsKGFyZ3VtZW50cywgMSk7XHJcblx0XHR2YXIgX3RoaXMgPSB0aGlzO1xyXG5cdFx0dmFyIEQgPSBmdW5jdGlvbigpIHtcclxuXHRcdFx0cmV0dXJuIF90aGlzLmFwcGx5KHRoaXMgaW5zdGFuY2VvZiBDID8gdGhpcyA6IGIgfHwgd2luZG93LCBmLmNvbmNhdChhLmNhbGwoYXJndW1lbnRzKSkpO1xyXG5cdFx0fTtcclxuXHJcblx0XHRDLnByb3RvdHlwZSA9IHRoaXMucHJvdG90eXBlO1xyXG5cdFx0RC5wcm90b3R5cGUgPSBuZXcgQygpO1xyXG5cclxuXHRcdHJldHVybiBEO1xyXG5cdH07XHJcblxyXG59XHJcblxyXG4vKipcclxuICogQGhlbGxvLmpzXHJcbiAqXHJcbiAqIEhlbGxvSlMgaXMgYSBjbGllbnQgc2lkZSBKYXZhc2NyaXB0IFNESyBmb3IgbWFraW5nIE9BdXRoMiBsb2dpbnMgYW5kIHN1YnNlcXVlbnQgUkVTVCBjYWxscy5cclxuICpcclxuICogQGF1dGhvciBBbmRyZXcgRG9kc29uXHJcbiAqIEB3ZWJzaXRlIGh0dHBzOi8vYWRvZHNvbi5jb20vaGVsbG8uanMvXHJcbiAqXHJcbiAqIEBjb3B5cmlnaHQgQW5kcmV3IERvZHNvbiwgMjAxMiAtIDIwMTVcclxuICogQGxpY2Vuc2UgTUlUOiBZb3UgYXJlIGZyZWUgdG8gdXNlIGFuZCBtb2RpZnkgdGhpcyBjb2RlIGZvciBhbnkgdXNlLCBvbiB0aGUgY29uZGl0aW9uIHRoYXQgdGhpcyBjb3B5cmlnaHQgbm90aWNlIHJlbWFpbnMuXHJcbiAqL1xyXG5cclxudmFyIGhlbGxvID0gZnVuY3Rpb24obmFtZSkge1xyXG5cdHJldHVybiBoZWxsby51c2UobmFtZSk7XHJcbn07XHJcblxyXG5oZWxsby51dGlscyA9IHtcclxuXHJcblx0Ly8gRXh0ZW5kIHRoZSBmaXJzdCBvYmplY3Qgd2l0aCB0aGUgcHJvcGVydGllcyBhbmQgbWV0aG9kcyBvZiB0aGUgc2Vjb25kXHJcblx0ZXh0ZW5kOiBmdW5jdGlvbihyIC8qLCBhWywgYlssIC4uLl1dICovKSB7XHJcblxyXG5cdFx0Ly8gR2V0IHRoZSBhcmd1bWVudHMgYXMgYW4gYXJyYXkgYnV0IG9tbWl0IHRoZSBpbml0aWFsIGl0ZW1cclxuXHRcdEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMSkuZm9yRWFjaChmdW5jdGlvbihhKSB7XHJcblx0XHRcdGlmIChBcnJheS5pc0FycmF5KHIpICYmIEFycmF5LmlzQXJyYXkoYSkpIHtcclxuXHRcdFx0XHRBcnJheS5wcm90b3R5cGUucHVzaC5hcHBseShyLCBhKTtcclxuXHRcdFx0fVxyXG5cdFx0XHRlbHNlIGlmIChyIGluc3RhbmNlb2YgT2JqZWN0ICYmIGEgaW5zdGFuY2VvZiBPYmplY3QgJiYgciAhPT0gYSkge1xyXG5cdFx0XHRcdGZvciAodmFyIHggaW4gYSkge1xyXG5cdFx0XHRcdFx0clt4XSA9IGhlbGxvLnV0aWxzLmV4dGVuZChyW3hdLCBhW3hdKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdFx0ZWxzZSB7XHJcblxyXG5cdFx0XHRcdGlmIChBcnJheS5pc0FycmF5KGEpKSB7XHJcblx0XHRcdFx0XHQvLyBDbG9uZSBpdFxyXG5cdFx0XHRcdFx0YSA9IGEuc2xpY2UoMCk7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRyID0gYTtcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblxyXG5cdFx0cmV0dXJuIHI7XHJcblx0fVxyXG59O1xyXG5cclxuLy8gQ29yZSBsaWJyYXJ5XHJcbmhlbGxvLnV0aWxzLmV4dGVuZChoZWxsbywge1xyXG5cclxuXHRzZXR0aW5nczoge1xyXG5cclxuXHRcdC8vIE9BdXRoMiBhdXRoZW50aWNhdGlvbiBkZWZhdWx0c1xyXG5cdFx0cmVkaXJlY3RfdXJpOiB3aW5kb3cubG9jYXRpb24uaHJlZi5zcGxpdCgnIycpWzBdLFxyXG5cdFx0cmVzcG9uc2VfdHlwZTogJ3Rva2VuJyxcclxuXHRcdGRpc3BsYXk6ICdwb3B1cCcsXHJcblx0XHRzdGF0ZTogJycsXHJcblxyXG5cdFx0Ly8gT0F1dGgxIHNoaW1cclxuXHRcdC8vIFRoZSBwYXRoIHRvIHRoZSBPQXV0aDEgc2VydmVyIGZvciBzaWduaW5nIHVzZXIgcmVxdWVzdHNcclxuXHRcdC8vIFdhbnQgdG8gcmVjcmVhdGUgeW91ciBvd24/IENoZWNrb3V0IGh0dHBzOi8vZ2l0aHViLmNvbS9NclN3aXRjaC9ub2RlLW9hdXRoLXNoaW1cclxuXHRcdG9hdXRoX3Byb3h5OiAnaHR0cHM6Ly9hdXRoLXNlcnZlci5oZXJva3VhcHAuY29tL3Byb3h5JyxcclxuXHJcblx0XHQvLyBBUEkgdGltZW91dCBpbiBtaWxsaXNlY29uZHNcclxuXHRcdHRpbWVvdXQ6IDIwMDAwLFxyXG5cclxuXHRcdC8vIFBvcHVwIE9wdGlvbnNcclxuXHRcdHBvcHVwOiB7XHJcblx0XHRcdHJlc2l6YWJsZTogMSxcclxuXHRcdFx0c2Nyb2xsYmFyczogMSxcclxuXHRcdFx0d2lkdGg6IDUwMCxcclxuXHRcdFx0aGVpZ2h0OiA1NTBcclxuXHRcdH0sXHJcblxyXG5cdFx0Ly8gRGVmYXVsdCBzY29wZVxyXG5cdFx0Ly8gTWFueSBzZXJ2aWNlcyByZXF1aXJlIGF0bGVhc3QgYSBwcm9maWxlIHNjb3BlLFxyXG5cdFx0Ly8gSGVsbG9KUyBhdXRvbWF0aWFsbHkgaW5jbHVkZXMgdGhlIHZhbHVlIG9mIHByb3ZpZGVyLnNjb3BlX21hcC5iYXNpY1xyXG5cdFx0Ly8gSWYgdGhhdCdzIG5vdCByZXF1aXJlZCBpdCBjYW4gYmUgcmVtb3ZlZCB2aWEgaGVsbG8uc2V0dGluZ3Muc2NvcGUubGVuZ3RoID0gMDtcclxuXHRcdHNjb3BlOiBbJ2Jhc2ljJ10sXHJcblxyXG5cdFx0Ly8gU2NvcGUgTWFwc1xyXG5cdFx0Ly8gVGhpcyBpcyB0aGUgZGVmYXVsdCBtb2R1bGUgc2NvcGUsIHRoZXNlIGFyZSB0aGUgZGVmYXVsdHMgd2hpY2ggZWFjaCBzZXJ2aWNlIGlzIG1hcHBlZCB0b28uXHJcblx0XHQvLyBCeSBpbmNsdWRpbmcgdGhlbSBoZXJlIGl0IHByZXZlbnRzIHRoZSBzY29wZSBmcm9tIGJlaW5nIGFwcGxpZWQgYWNjaWRlbnRhbGx5XHJcblx0XHRzY29wZV9tYXA6IHtcclxuXHRcdFx0YmFzaWM6ICcnXHJcblx0XHR9LFxyXG5cclxuXHRcdC8vIERlZmF1bHQgc2VydmljZSAvIG5ldHdvcmtcclxuXHRcdGRlZmF1bHRfc2VydmljZTogbnVsbCxcclxuXHJcblx0XHQvLyBGb3JjZSBhdXRoZW50aWNhdGlvblxyXG5cdFx0Ly8gV2hlbiBoZWxsby5sb2dpbiBpcyBmaXJlZC5cclxuXHRcdC8vIChudWxsKTogaWdub3JlIGN1cnJlbnQgc2Vzc2lvbiBleHBpcnkgYW5kIGNvbnRpbnVlIHdpdGggbG9naW5cclxuXHRcdC8vICh0cnVlKTogaWdub3JlIGN1cnJlbnQgc2Vzc2lvbiBleHBpcnkgYW5kIGNvbnRpbnVlIHdpdGggbG9naW4sIGFzayBmb3IgdXNlciB0byByZWF1dGhlbnRpY2F0ZVxyXG5cdFx0Ly8gKGZhbHNlKTogaWYgdGhlIGN1cnJlbnQgc2Vzc2lvbiBsb29rcyBnb29kIGZvciB0aGUgcmVxdWVzdCBzY29wZXMgcmV0dXJuIHRoZSBjdXJyZW50IHNlc3Npb24uXHJcblx0XHRmb3JjZTogbnVsbCxcclxuXHJcblx0XHQvLyBQYWdlIFVSTFxyXG5cdFx0Ly8gV2hlbiAnZGlzcGxheT1wYWdlJyB0aGlzIHByb3BlcnR5IGRlZmluZXMgd2hlcmUgdGhlIHVzZXJzIHBhZ2Ugc2hvdWxkIGVuZCB1cCBhZnRlciByZWRpcmVjdF91cmlcclxuXHRcdC8vIFRocyBjb3VsZCBiZSBwcm9ibGVtYXRpYyBpZiB0aGUgcmVkaXJlY3RfdXJpIGlzIGluZGVlZCB0aGUgZmluYWwgcGxhY2UsXHJcblx0XHQvLyBUeXBpY2FsbHkgdGhpcyBjaXJjdW12ZW50cyB0aGUgcHJvYmxlbSBvZiB0aGUgcmVkaXJlY3RfdXJsIGJlaW5nIGEgZHVtYiByZWxheSBwYWdlLlxyXG5cdFx0cGFnZV91cmk6IHdpbmRvdy5sb2NhdGlvbi5ocmVmXHJcblx0fSxcclxuXHJcblx0Ly8gU2VydmljZSBjb25maWd1cmF0aW9uIG9iamVjdHNcclxuXHRzZXJ2aWNlczoge30sXHJcblxyXG5cdC8vIFVzZVxyXG5cdC8vIERlZmluZSBhIG5ldyBpbnN0YW5jZSBvZiB0aGUgSGVsbG9KUyBsaWJyYXJ5IHdpdGggYSBkZWZhdWx0IHNlcnZpY2VcclxuXHR1c2U6IGZ1bmN0aW9uKHNlcnZpY2UpIHtcclxuXHJcblx0XHQvLyBDcmVhdGUgc2VsZiwgd2hpY2ggaW5oZXJpdHMgZnJvbSBpdHMgcGFyZW50XHJcblx0XHR2YXIgc2VsZiA9IE9iamVjdC5jcmVhdGUodGhpcyk7XHJcblxyXG5cdFx0Ly8gSW5oZXJpdCB0aGUgcHJvdG90eXBlIGZyb20gaXRzIHBhcmVudFxyXG5cdFx0c2VsZi5zZXR0aW5ncyA9IE9iamVjdC5jcmVhdGUodGhpcy5zZXR0aW5ncyk7XHJcblxyXG5cdFx0Ly8gRGVmaW5lIHRoZSBkZWZhdWx0IHNlcnZpY2VcclxuXHRcdGlmIChzZXJ2aWNlKSB7XHJcblx0XHRcdHNlbGYuc2V0dGluZ3MuZGVmYXVsdF9zZXJ2aWNlID0gc2VydmljZTtcclxuXHRcdH1cclxuXHJcblx0XHQvLyBDcmVhdGUgYW4gaW5zdGFuY2Ugb2YgRXZlbnRzXHJcblx0XHRzZWxmLnV0aWxzLkV2ZW50LmNhbGwoc2VsZik7XHJcblxyXG5cdFx0cmV0dXJuIHNlbGY7XHJcblx0fSxcclxuXHJcblx0Ly8gSW5pdGlhbGl6ZVxyXG5cdC8vIERlZmluZSB0aGUgY2xpZW50X2lkcyBmb3IgdGhlIGVuZHBvaW50IHNlcnZpY2VzXHJcblx0Ly8gQHBhcmFtIG9iamVjdCBvLCBjb250YWlucyBhIGtleSB2YWx1ZSBwYWlyLCBzZXJ2aWNlID0+IGNsaWVudElkXHJcblx0Ly8gQHBhcmFtIG9iamVjdCBvcHRzLCBjb250YWlucyBhIGtleSB2YWx1ZSBwYWlyIG9mIG9wdGlvbnMgdXNlZCBmb3IgZGVmaW5pbmcgdGhlIGF1dGhlbnRpY2F0aW9uIGRlZmF1bHRzXHJcblx0Ly8gQHBhcmFtIG51bWJlciB0aW1lb3V0LCB0aW1lb3V0IGluIHNlY29uZHNcclxuXHRpbml0OiBmdW5jdGlvbihzZXJ2aWNlcywgb3B0aW9ucykge1xyXG5cclxuXHRcdHZhciB1dGlscyA9IHRoaXMudXRpbHM7XHJcblxyXG5cdFx0aWYgKCFzZXJ2aWNlcykge1xyXG5cdFx0XHRyZXR1cm4gdGhpcy5zZXJ2aWNlcztcclxuXHRcdH1cclxuXHJcblx0XHQvLyBEZWZpbmUgcHJvdmlkZXIgY3JlZGVudGlhbHNcclxuXHRcdC8vIFJlZm9ybWF0IHRoZSBJRCBmaWVsZFxyXG5cdFx0Zm9yICh2YXIgeCBpbiBzZXJ2aWNlcykge2lmIChzZXJ2aWNlcy5oYXNPd25Qcm9wZXJ0eSh4KSkge1xyXG5cdFx0XHRpZiAodHlwZW9mIChzZXJ2aWNlc1t4XSkgIT09ICdvYmplY3QnKSB7XHJcblx0XHRcdFx0c2VydmljZXNbeF0gPSB7aWQ6IHNlcnZpY2VzW3hdfTtcclxuXHRcdFx0fVxyXG5cdFx0fX1cclxuXHJcblx0XHQvLyBNZXJnZSBzZXJ2aWNlcyBpZiB0aGVyZSBhbHJlYWR5IGV4aXN0cyBzb21lXHJcblx0XHR1dGlscy5leHRlbmQodGhpcy5zZXJ2aWNlcywgc2VydmljZXMpO1xyXG5cclxuXHRcdC8vIFVwZGF0ZSB0aGUgZGVmYXVsdCBzZXR0aW5ncyB3aXRoIHRoaXMgb25lLlxyXG5cdFx0aWYgKG9wdGlvbnMpIHtcclxuXHRcdFx0dXRpbHMuZXh0ZW5kKHRoaXMuc2V0dGluZ3MsIG9wdGlvbnMpO1xyXG5cclxuXHRcdFx0Ly8gRG8gdGhpcyBpbW1lZGlhdGx5IGluY2FzZSB0aGUgYnJvd3NlciBjaGFuZ2VzIHRoZSBjdXJyZW50IHBhdGguXHJcblx0XHRcdGlmICgncmVkaXJlY3RfdXJpJyBpbiBvcHRpb25zKSB7XHJcblx0XHRcdFx0dGhpcy5zZXR0aW5ncy5yZWRpcmVjdF91cmkgPSB1dGlscy51cmwob3B0aW9ucy5yZWRpcmVjdF91cmkpLmhyZWY7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gdGhpcztcclxuXHR9LFxyXG5cclxuXHQvLyBMb2dpblxyXG5cdC8vIFVzaW5nIHRoZSBlbmRwb2ludFxyXG5cdC8vIEBwYXJhbSBuZXR3b3JrIHN0cmluZ2lmeSAgICAgICBuYW1lIHRvIGNvbm5lY3QgdG9cclxuXHQvLyBAcGFyYW0gb3B0aW9ucyBvYmplY3QgICAgKG9wdGlvbmFsKSAge2Rpc3BsYXkgbW9kZSwgaXMgZWl0aGVyIG5vbmV8cG9wdXAoZGVmYXVsdCl8cGFnZSwgc2NvcGU6IGVtYWlsLGJpcnRoZGF5LHB1Ymxpc2gsIC4uIH1cclxuXHQvLyBAcGFyYW0gY2FsbGJhY2sgIGZ1bmN0aW9uICAob3B0aW9uYWwpICBmaXJlZCBvbiBzaWduaW5cclxuXHRsb2dpbjogZnVuY3Rpb24oKSB7XHJcblxyXG5cdFx0Ly8gQ3JlYXRlIGFuIG9iamVjdCB3aGljaCBpbmhlcml0cyBpdHMgcGFyZW50IGFzIHRoZSBwcm90b3R5cGUgYW5kIGNvbnN0cnVjdHMgYSBuZXcgZXZlbnQgY2hhaW4uXHJcblx0XHR2YXIgX3RoaXMgPSB0aGlzO1xyXG5cdFx0dmFyIHV0aWxzID0gX3RoaXMudXRpbHM7XHJcblx0XHR2YXIgZXJyb3IgPSB1dGlscy5lcnJvcjtcclxuXHRcdHZhciBwcm9taXNlID0gdXRpbHMuUHJvbWlzZSgpO1xyXG5cclxuXHRcdC8vIEdldCBwYXJhbWV0ZXJzXHJcblx0XHR2YXIgcCA9IHV0aWxzLmFyZ3Moe25ldHdvcms6ICdzJywgb3B0aW9uczogJ28nLCBjYWxsYmFjazogJ2YnfSwgYXJndW1lbnRzKTtcclxuXHJcblx0XHQvLyBMb2NhbCB2YXJzXHJcblx0XHR2YXIgdXJsO1xyXG5cclxuXHRcdC8vIEdldCBhbGwgdGhlIGN1c3RvbSBvcHRpb25zIGFuZCBzdG9yZSB0byBiZSBhcHBlbmRlZCB0byB0aGUgcXVlcnlzdHJpbmdcclxuXHRcdHZhciBxcyA9IHV0aWxzLmRpZmZLZXkocC5vcHRpb25zLCBfdGhpcy5zZXR0aW5ncyk7XHJcblxyXG5cdFx0Ly8gTWVyZ2Uvb3ZlcnJpZGUgb3B0aW9ucyB3aXRoIGFwcCBkZWZhdWx0c1xyXG5cdFx0dmFyIG9wdHMgPSBwLm9wdGlvbnMgPSB1dGlscy5tZXJnZShfdGhpcy5zZXR0aW5ncywgcC5vcHRpb25zIHx8IHt9KTtcclxuXHJcblx0XHQvLyBNZXJnZS9vdmVycmlkZSBvcHRpb25zIHdpdGggYXBwIGRlZmF1bHRzXHJcblx0XHRvcHRzLnBvcHVwID0gdXRpbHMubWVyZ2UoX3RoaXMuc2V0dGluZ3MucG9wdXAsIHAub3B0aW9ucy5wb3B1cCB8fCB7fSk7XHJcblxyXG5cdFx0Ly8gTmV0d29ya1xyXG5cdFx0cC5uZXR3b3JrID0gcC5uZXR3b3JrIHx8IF90aGlzLnNldHRpbmdzLmRlZmF1bHRfc2VydmljZTtcclxuXHJcblx0XHQvLyBCaW5kIGNhbGxiYWNrIHRvIGJvdGggcmVqZWN0IGFuZCBmdWxmaWxsIHN0YXRlc1xyXG5cdFx0cHJvbWlzZS5wcm94eS50aGVuKHAuY2FsbGJhY2ssIHAuY2FsbGJhY2spO1xyXG5cclxuXHRcdC8vIFRyaWdnZXIgYW4gZXZlbnQgb24gdGhlIGdsb2JhbCBsaXN0ZW5lclxyXG5cdFx0ZnVuY3Rpb24gZW1pdChzLCB2YWx1ZSkge1xyXG5cdFx0XHRoZWxsby5lbWl0KHMsIHZhbHVlKTtcclxuXHRcdH1cclxuXHJcblx0XHRwcm9taXNlLnByb3h5LnRoZW4oZW1pdC5iaW5kKHRoaXMsICdhdXRoLmxvZ2luIGF1dGgnKSwgZW1pdC5iaW5kKHRoaXMsICdhdXRoLmZhaWxlZCBhdXRoJykpO1xyXG5cclxuXHRcdC8vIElzIG91ciBzZXJ2aWNlIHZhbGlkP1xyXG5cdFx0aWYgKHR5cGVvZiAocC5uZXR3b3JrKSAhPT0gJ3N0cmluZycgfHwgIShwLm5ldHdvcmsgaW4gX3RoaXMuc2VydmljZXMpKSB7XHJcblx0XHRcdC8vIFRyaWdnZXIgdGhlIGRlZmF1bHQgbG9naW4uXHJcblx0XHRcdC8vIEFoaCB3ZSBkb250IGhhdmUgb25lLlxyXG5cdFx0XHRyZXR1cm4gcHJvbWlzZS5yZWplY3QoZXJyb3IoJ2ludmFsaWRfbmV0d29yaycsICdUaGUgcHJvdmlkZWQgbmV0d29yayB3YXMgbm90IHJlY29nbml6ZWQnKSk7XHJcblx0XHR9XHJcblxyXG5cdFx0dmFyIHByb3ZpZGVyID0gX3RoaXMuc2VydmljZXNbcC5uZXR3b3JrXTtcclxuXHJcblx0XHQvLyBDcmVhdGUgYSBnbG9iYWwgbGlzdGVuZXIgdG8gY2FwdHVyZSBldmVudHMgdHJpZ2dlcmVkIG91dCBvZiBzY29wZVxyXG5cdFx0dmFyIGNhbGxiYWNrSWQgPSB1dGlscy5nbG9iYWxFdmVudChmdW5jdGlvbihzdHIpIHtcclxuXHJcblx0XHRcdC8vIFRoZSByZXNwb25zZUhhbmRsZXIgcmV0dXJucyBhIHN0cmluZywgbGV0cyBzYXZlIHRoaXMgbG9jYWxseVxyXG5cdFx0XHR2YXIgb2JqO1xyXG5cclxuXHRcdFx0aWYgKHN0cikge1xyXG5cdFx0XHRcdG9iaiA9IEpTT04ucGFyc2Uoc3RyKTtcclxuXHRcdFx0fVxyXG5cdFx0XHRlbHNlIHtcclxuXHRcdFx0XHRvYmogPSBlcnJvcignY2FuY2VsbGVkJywgJ1RoZSBhdXRoZW50aWNhdGlvbiB3YXMgbm90IGNvbXBsZXRlZCcpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQvLyBIYW5kbGUgdGhlc2UgcmVzcG9uc2UgdXNpbmcgdGhlIGxvY2FsXHJcblx0XHRcdC8vIFRyaWdnZXIgb24gdGhlIHBhcmVudFxyXG5cdFx0XHRpZiAoIW9iai5lcnJvcikge1xyXG5cclxuXHRcdFx0XHQvLyBTYXZlIG9uIHRoZSBwYXJlbnQgd2luZG93IHRoZSBuZXcgY3JlZGVudGlhbHNcclxuXHRcdFx0XHQvLyBUaGlzIGZpeGVzIGFuIElFMTAgYnVnIGkgdGhpbmsuLi4gYXRsZWFzdCBpdCBkb2VzIGZvciBtZS5cclxuXHRcdFx0XHR1dGlscy5zdG9yZShvYmoubmV0d29yaywgb2JqKTtcclxuXHJcblx0XHRcdFx0Ly8gRnVsZmlsbCBhIHN1Y2Nlc3NmdWwgbG9naW5cclxuXHRcdFx0XHRwcm9taXNlLmZ1bGZpbGwoe1xyXG5cdFx0XHRcdFx0bmV0d29yazogb2JqLm5ldHdvcmssXHJcblx0XHRcdFx0XHRhdXRoUmVzcG9uc2U6IG9ialxyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHR9XHJcblx0XHRcdGVsc2Uge1xyXG5cdFx0XHRcdC8vIFJlamVjdCBhIHN1Y2Nlc3NmdWwgbG9naW5cclxuXHRcdFx0XHRwcm9taXNlLnJlamVjdChvYmopO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHJcblx0XHR2YXIgcmVkaXJlY3RVcmkgPSB1dGlscy51cmwob3B0cy5yZWRpcmVjdF91cmkpLmhyZWY7XHJcblxyXG5cdFx0Ly8gTWF5IGJlIGEgc3BhY2UtZGVsaW1pdGVkIGxpc3Qgb2YgbXVsdGlwbGUsIGNvbXBsZW1lbnRhcnkgdHlwZXNcclxuXHRcdHZhciByZXNwb25zZVR5cGUgPSBwcm92aWRlci5vYXV0aC5yZXNwb25zZV90eXBlIHx8IG9wdHMucmVzcG9uc2VfdHlwZTtcclxuXHJcblx0XHQvLyBGYWxsYmFjayB0byB0b2tlbiBpZiB0aGUgbW9kdWxlIGhhc24ndCBkZWZpbmVkIGEgZ3JhbnQgdXJsXHJcblx0XHRpZiAoL1xcYmNvZGVcXGIvLnRlc3QocmVzcG9uc2VUeXBlKSAmJiAhcHJvdmlkZXIub2F1dGguZ3JhbnQpIHtcclxuXHRcdFx0cmVzcG9uc2VUeXBlID0gcmVzcG9uc2VUeXBlLnJlcGxhY2UoL1xcYmNvZGVcXGIvLCAndG9rZW4nKTtcclxuXHRcdH1cclxuXHJcblx0XHQvLyBRdWVyeSBzdHJpbmcgcGFyYW1ldGVycywgd2UgbWF5IHBhc3Mgb3VyIG93biBhcmd1bWVudHMgdG8gZm9ybSB0aGUgcXVlcnlzdHJpbmdcclxuXHRcdHAucXMgPSB1dGlscy5tZXJnZShxcywge1xyXG5cdFx0XHRjbGllbnRfaWQ6IGVuY29kZVVSSUNvbXBvbmVudChwcm92aWRlci5pZCksXHJcblx0XHRcdHJlc3BvbnNlX3R5cGU6IGVuY29kZVVSSUNvbXBvbmVudChyZXNwb25zZVR5cGUpLFxyXG5cdFx0XHRyZWRpcmVjdF91cmk6IGVuY29kZVVSSUNvbXBvbmVudChyZWRpcmVjdFVyaSksXHJcblx0XHRcdHN0YXRlOiB7XHJcblx0XHRcdFx0Y2xpZW50X2lkOiBwcm92aWRlci5pZCxcclxuXHRcdFx0XHRuZXR3b3JrOiBwLm5ldHdvcmssXHJcblx0XHRcdFx0ZGlzcGxheTogb3B0cy5kaXNwbGF5LFxyXG5cdFx0XHRcdGNhbGxiYWNrOiBjYWxsYmFja0lkLFxyXG5cdFx0XHRcdHN0YXRlOiBvcHRzLnN0YXRlLFxyXG5cdFx0XHRcdHJlZGlyZWN0X3VyaTogcmVkaXJlY3RVcmlcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblxyXG5cdFx0Ly8gR2V0IGN1cnJlbnQgc2Vzc2lvbiBmb3IgbWVyZ2luZyBzY29wZXMsIGFuZCBmb3IgcXVpY2sgYXV0aCByZXNwb25zZVxyXG5cdFx0dmFyIHNlc3Npb24gPSB1dGlscy5zdG9yZShwLm5ldHdvcmspO1xyXG5cclxuXHRcdC8vIFNjb3BlcyAoYXV0aGVudGljYXRpb24gcGVybWlzaW9ucylcclxuXHRcdC8vIEVuc3VyZSB0aGlzIGlzIGEgc3RyaW5nIC0gSUUgaGFzIGEgcHJvYmxlbSBtb3ZpbmcgQXJyYXlzIGJldHdlZW4gd2luZG93c1xyXG5cdFx0Ly8gQXBwZW5kIHRoZSBzZXR1cCBzY29wZVxyXG5cdFx0dmFyIFNDT1BFX1NQTElUID0gL1ssXFxzXSsvO1xyXG5cclxuXHRcdC8vIEluY2x1ZGUgZGVmYXVsdCBzY29wZSBzZXR0aW5ncyAoY2xvbmVkKS5cclxuXHRcdHZhciBzY29wZSA9IF90aGlzLnNldHRpbmdzLnNjb3BlID8gW190aGlzLnNldHRpbmdzLnNjb3BlLnRvU3RyaW5nKCldIDogW107XHJcblxyXG5cdFx0Ly8gRXh0ZW5kIHRoZSBwcm92aWRlcnMgc2NvcGUgbGlzdCB3aXRoIHRoZSBkZWZhdWx0XHJcblx0XHR2YXIgc2NvcGVNYXAgPSB1dGlscy5tZXJnZShfdGhpcy5zZXR0aW5ncy5zY29wZV9tYXAsIHByb3ZpZGVyLnNjb3BlIHx8IHt9KTtcclxuXHJcblx0XHQvLyBBZGQgdXNlciBkZWZpbmVkIHNjb3Blcy4uLlxyXG5cdFx0aWYgKG9wdHMuc2NvcGUpIHtcclxuXHRcdFx0c2NvcGUucHVzaChvcHRzLnNjb3BlLnRvU3RyaW5nKCkpO1xyXG5cdFx0fVxyXG5cclxuXHRcdC8vIEFwcGVuZCBzY29wZXMgZnJvbSBhIHByZXZpb3VzIHNlc3Npb24uXHJcblx0XHQvLyBUaGlzIGhlbHBzIGtlZXAgYXBwIGNyZWRlbnRpYWxzIGNvbnN0YW50LFxyXG5cdFx0Ly8gQXZvaWRpbmcgaGF2aW5nIHRvIGtlZXAgdGFicyBvbiB3aGF0IHNjb3BlcyBhcmUgYXV0aG9yaXplZFxyXG5cdFx0aWYgKHNlc3Npb24gJiYgJ3Njb3BlJyBpbiBzZXNzaW9uICYmIHNlc3Npb24uc2NvcGUgaW5zdGFuY2VvZiBTdHJpbmcpIHtcclxuXHRcdFx0c2NvcGUucHVzaChzZXNzaW9uLnNjb3BlKTtcclxuXHRcdH1cclxuXHJcblx0XHQvLyBKb2luIGFuZCBTcGxpdCBhZ2FpblxyXG5cdFx0c2NvcGUgPSBzY29wZS5qb2luKCcsJykuc3BsaXQoU0NPUEVfU1BMSVQpO1xyXG5cclxuXHRcdC8vIEZvcm1hdCByZW1vdmUgZHVwbGljYXRlcyBhbmQgZW1wdHkgdmFsdWVzXHJcblx0XHRzY29wZSA9IHV0aWxzLnVuaXF1ZShzY29wZSkuZmlsdGVyKGZpbHRlckVtcHR5KTtcclxuXHJcblx0XHQvLyBTYXZlIHRoZSB0aGUgc2NvcGVzIHRvIHRoZSBzdGF0ZSB3aXRoIHRoZSBuYW1lcyB0aGF0IHRoZXkgd2VyZSByZXF1ZXN0ZWQgd2l0aC5cclxuXHRcdHAucXMuc3RhdGUuc2NvcGUgPSBzY29wZS5qb2luKCcsJyk7XHJcblxyXG5cdFx0Ly8gTWFwIHNjb3BlcyB0byB0aGUgcHJvdmlkZXJzIG5hbWluZyBjb252ZW50aW9uXHJcblx0XHRzY29wZSA9IHNjb3BlLm1hcChmdW5jdGlvbihpdGVtKSB7XHJcblx0XHRcdC8vIERvZXMgdGhpcyBoYXZlIGEgbWFwcGluZz9cclxuXHRcdFx0cmV0dXJuIChpdGVtIGluIHNjb3BlTWFwKSA/IHNjb3BlTWFwW2l0ZW1dIDogaXRlbTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdC8vIFN0cmluZ2lmeSBhbmQgQXJyYXlpZnkgc28gdGhhdCBkb3VibGUgbWFwcGVkIHNjb3BlcyBhcmUgZ2l2ZW4gdGhlIGNoYW5jZSB0byBiZSBmb3JtYXR0ZWRcclxuXHRcdHNjb3BlID0gc2NvcGUuam9pbignLCcpLnNwbGl0KFNDT1BFX1NQTElUKTtcclxuXHJcblx0XHQvLyBBZ2Fpbi4uLlxyXG5cdFx0Ly8gRm9ybWF0IHJlbW92ZSBkdXBsaWNhdGVzIGFuZCBlbXB0eSB2YWx1ZXNcclxuXHRcdHNjb3BlID0gdXRpbHMudW5pcXVlKHNjb3BlKS5maWx0ZXIoZmlsdGVyRW1wdHkpO1xyXG5cclxuXHRcdC8vIEpvaW4gd2l0aCB0aGUgZXhwZWN0ZWQgc2NvcGUgZGVsaW1pdGVyIGludG8gYSBzdHJpbmdcclxuXHRcdHAucXMuc2NvcGUgPSBzY29wZS5qb2luKHByb3ZpZGVyLnNjb3BlX2RlbGltIHx8ICcsJyk7XHJcblxyXG5cdFx0Ly8gSXMgdGhlIHVzZXIgYWxyZWFkeSBzaWduZWQgaW4gd2l0aCB0aGUgYXBwcm9wcmlhdGUgc2NvcGVzLCB2YWxpZCBhY2Nlc3NfdG9rZW4/XHJcblx0XHRpZiAob3B0cy5mb3JjZSA9PT0gZmFsc2UpIHtcclxuXHJcblx0XHRcdGlmIChzZXNzaW9uICYmICdhY2Nlc3NfdG9rZW4nIGluIHNlc3Npb24gJiYgc2Vzc2lvbi5hY2Nlc3NfdG9rZW4gJiYgJ2V4cGlyZXMnIGluIHNlc3Npb24gJiYgc2Vzc2lvbi5leHBpcmVzID4gKChuZXcgRGF0ZSgpKS5nZXRUaW1lKCkgLyAxZTMpKSB7XHJcblx0XHRcdFx0Ly8gV2hhdCBpcyBkaWZmZXJlbnQgYWJvdXQgdGhlIHNjb3BlcyBpbiB0aGUgc2Vzc2lvbiB2cyB0aGUgc2NvcGVzIGluIHRoZSBuZXcgbG9naW4/XHJcblx0XHRcdFx0dmFyIGRpZmYgPSB1dGlscy5kaWZmKChzZXNzaW9uLnNjb3BlIHx8ICcnKS5zcGxpdChTQ09QRV9TUExJVCksIChwLnFzLnN0YXRlLnNjb3BlIHx8ICcnKS5zcGxpdChTQ09QRV9TUExJVCkpO1xyXG5cdFx0XHRcdGlmIChkaWZmLmxlbmd0aCA9PT0gMCkge1xyXG5cclxuXHRcdFx0XHRcdC8vIE9LIHRyaWdnZXIgdGhlIGNhbGxiYWNrXHJcblx0XHRcdFx0XHRwcm9taXNlLmZ1bGZpbGwoe1xyXG5cdFx0XHRcdFx0XHR1bmNoYW5nZWQ6IHRydWUsXHJcblx0XHRcdFx0XHRcdG5ldHdvcms6IHAubmV0d29yayxcclxuXHRcdFx0XHRcdFx0YXV0aFJlc3BvbnNlOiBzZXNzaW9uXHJcblx0XHRcdFx0XHR9KTtcclxuXHJcblx0XHRcdFx0XHQvLyBOb3RoaW5nIGhhcyBjaGFuZ2VkXHJcblx0XHRcdFx0XHRyZXR1cm4gcHJvbWlzZTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHQvLyBQYWdlIFVSTFxyXG5cdFx0aWYgKG9wdHMuZGlzcGxheSA9PT0gJ3BhZ2UnICYmIG9wdHMucGFnZV91cmkpIHtcclxuXHRcdFx0Ly8gQWRkIGEgcGFnZSBsb2NhdGlvbiwgcGxhY2UgdG8gZW5kdXAgYWZ0ZXIgc2Vzc2lvbiBoYXMgYXV0aGVudGljYXRlZFxyXG5cdFx0XHRwLnFzLnN0YXRlLnBhZ2VfdXJpID0gdXRpbHMudXJsKG9wdHMucGFnZV91cmkpLmhyZWY7XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gQmVzcG9rZVxyXG5cdFx0Ly8gT3ZlcnJpZGUgbG9naW4gcXVlcnlzdHJpbmdzIGZyb20gYXV0aF9vcHRpb25zXHJcblx0XHRpZiAoJ2xvZ2luJyBpbiBwcm92aWRlciAmJiB0eXBlb2YgKHByb3ZpZGVyLmxvZ2luKSA9PT0gJ2Z1bmN0aW9uJykge1xyXG5cdFx0XHQvLyBGb3JtYXQgdGhlIHBhcmFtYXRlcnMgYWNjb3JkaW5nIHRvIHRoZSBwcm92aWRlcnMgZm9ybWF0dGluZyBmdW5jdGlvblxyXG5cdFx0XHRwcm92aWRlci5sb2dpbihwKTtcclxuXHRcdH1cclxuXHJcblx0XHQvLyBBZGQgT0F1dGggdG8gc3RhdGVcclxuXHRcdC8vIFdoZXJlIHRoZSBzZXJ2aWNlIGlzIGdvaW5nIHRvIHRha2UgYWR2YW50YWdlIG9mIHRoZSBvYXV0aF9wcm94eVxyXG5cdFx0aWYgKCEvXFxidG9rZW5cXGIvLnRlc3QocmVzcG9uc2VUeXBlKSB8fFxyXG5cdFx0cGFyc2VJbnQocHJvdmlkZXIub2F1dGgudmVyc2lvbiwgMTApIDwgMiB8fFxyXG5cdFx0KG9wdHMuZGlzcGxheSA9PT0gJ25vbmUnICYmIHByb3ZpZGVyLm9hdXRoLmdyYW50ICYmIHNlc3Npb24gJiYgc2Vzc2lvbi5yZWZyZXNoX3Rva2VuKSkge1xyXG5cclxuXHRcdFx0Ly8gQWRkIHRoZSBvYXV0aCBlbmRwb2ludHNcclxuXHRcdFx0cC5xcy5zdGF0ZS5vYXV0aCA9IHByb3ZpZGVyLm9hdXRoO1xyXG5cclxuXHRcdFx0Ly8gQWRkIHRoZSBwcm94eSB1cmxcclxuXHRcdFx0cC5xcy5zdGF0ZS5vYXV0aF9wcm94eSA9IG9wdHMub2F1dGhfcHJveHk7XHJcblxyXG5cdFx0fVxyXG5cclxuXHRcdC8vIENvbnZlcnQgc3RhdGUgdG8gYSBzdHJpbmdcclxuXHRcdHAucXMuc3RhdGUgPSBlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkocC5xcy5zdGF0ZSkpO1xyXG5cclxuXHRcdC8vIFVSTFxyXG5cdFx0aWYgKHBhcnNlSW50KHByb3ZpZGVyLm9hdXRoLnZlcnNpb24sIDEwKSA9PT0gMSkge1xyXG5cclxuXHRcdFx0Ly8gVHVybiB0aGUgcmVxdWVzdCB0byB0aGUgT0F1dGggUHJveHkgZm9yIDMtbGVnZ2VkIGF1dGhcclxuXHRcdFx0dXJsID0gdXRpbHMucXMob3B0cy5vYXV0aF9wcm94eSwgcC5xcywgZW5jb2RlRnVuY3Rpb24pO1xyXG5cdFx0fVxyXG5cclxuXHRcdC8vIFJlZnJlc2ggdG9rZW5cclxuXHRcdGVsc2UgaWYgKG9wdHMuZGlzcGxheSA9PT0gJ25vbmUnICYmIHByb3ZpZGVyLm9hdXRoLmdyYW50ICYmIHNlc3Npb24gJiYgc2Vzc2lvbi5yZWZyZXNoX3Rva2VuKSB7XHJcblxyXG5cdFx0XHQvLyBBZGQgdGhlIHJlZnJlc2hfdG9rZW4gdG8gdGhlIHJlcXVlc3RcclxuXHRcdFx0cC5xcy5yZWZyZXNoX3Rva2VuID0gc2Vzc2lvbi5yZWZyZXNoX3Rva2VuO1xyXG5cclxuXHRcdFx0Ly8gRGVmaW5lIHRoZSByZXF1ZXN0IHBhdGhcclxuXHRcdFx0dXJsID0gdXRpbHMucXMob3B0cy5vYXV0aF9wcm94eSwgcC5xcywgZW5jb2RlRnVuY3Rpb24pO1xyXG5cdFx0fVxyXG5cdFx0ZWxzZSB7XHJcblx0XHRcdHVybCA9IHV0aWxzLnFzKHByb3ZpZGVyLm9hdXRoLmF1dGgsIHAucXMsIGVuY29kZUZ1bmN0aW9uKTtcclxuXHRcdH1cclxuXHJcblx0XHQvLyBCcm9hZGNhc3QgdGhpcyBldmVudCBhcyBhbiBhdXRoOmluaXRcclxuXHRcdGVtaXQoJ2F1dGguaW5pdCcsIHApO1xyXG5cclxuXHRcdC8vIEV4ZWN1dGVcclxuXHRcdC8vIFRyaWdnZXIgaG93IHdlIHdhbnQgc2VsZiBkaXNwbGF5ZWRcclxuXHRcdGlmIChvcHRzLmRpc3BsYXkgPT09ICdub25lJykge1xyXG5cdFx0XHQvLyBTaWduLWluIGluIHRoZSBiYWNrZ3JvdW5kLCBpZnJhbWVcclxuXHRcdFx0dXRpbHMuaWZyYW1lKHVybCwgcmVkaXJlY3RVcmkpO1xyXG5cdFx0fVxyXG5cclxuXHRcdC8vIFRyaWdnZXJpbmcgcG9wdXA/XHJcblx0XHRlbHNlIGlmIChvcHRzLmRpc3BsYXkgPT09ICdwb3B1cCcpIHtcclxuXHJcblx0XHRcdHZhciBwb3B1cCA9IHV0aWxzLnBvcHVwKHVybCwgcmVkaXJlY3RVcmksIG9wdHMucG9wdXApO1xyXG5cclxuXHRcdFx0dmFyIHRpbWVyID0gc2V0SW50ZXJ2YWwoZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0aWYgKCFwb3B1cCB8fCBwb3B1cC5jbG9zZWQpIHtcclxuXHRcdFx0XHRcdGNsZWFySW50ZXJ2YWwodGltZXIpO1xyXG5cdFx0XHRcdFx0aWYgKCFwcm9taXNlLnN0YXRlKSB7XHJcblxyXG5cdFx0XHRcdFx0XHR2YXIgcmVzcG9uc2UgPSBlcnJvcignY2FuY2VsbGVkJywgJ0xvZ2luIGhhcyBiZWVuIGNhbmNlbGxlZCcpO1xyXG5cclxuXHRcdFx0XHRcdFx0aWYgKCFwb3B1cCkge1xyXG5cdFx0XHRcdFx0XHRcdHJlc3BvbnNlID0gZXJyb3IoJ2Jsb2NrZWQnLCAnUG9wdXAgd2FzIGJsb2NrZWQnKTtcclxuXHRcdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdFx0cmVzcG9uc2UubmV0d29yayA9IHAubmV0d29yaztcclxuXHJcblx0XHRcdFx0XHRcdHByb21pc2UucmVqZWN0KHJlc3BvbnNlKTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XHJcblx0XHRcdH0sIDEwMCk7XHJcblx0XHR9XHJcblxyXG5cdFx0ZWxzZSB7XHJcblx0XHRcdHdpbmRvdy5sb2NhdGlvbiA9IHVybDtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gcHJvbWlzZS5wcm94eTtcclxuXHJcblx0XHRmdW5jdGlvbiBlbmNvZGVGdW5jdGlvbihzKSB7cmV0dXJuIHM7fVxyXG5cclxuXHRcdGZ1bmN0aW9uIGZpbHRlckVtcHR5KHMpIHtyZXR1cm4gISFzO31cclxuXHR9LFxyXG5cclxuXHQvLyBSZW1vdmUgYW55IGRhdGEgYXNzb2NpYXRlZCB3aXRoIGEgZ2l2ZW4gc2VydmljZVxyXG5cdC8vIEBwYXJhbSBzdHJpbmcgbmFtZSBvZiB0aGUgc2VydmljZVxyXG5cdC8vIEBwYXJhbSBmdW5jdGlvbiBjYWxsYmFja1xyXG5cdGxvZ291dDogZnVuY3Rpb24oKSB7XHJcblxyXG5cdFx0dmFyIF90aGlzID0gdGhpcztcclxuXHRcdHZhciB1dGlscyA9IF90aGlzLnV0aWxzO1xyXG5cdFx0dmFyIGVycm9yID0gdXRpbHMuZXJyb3I7XHJcblxyXG5cdFx0Ly8gQ3JlYXRlIGEgbmV3IHByb21pc2VcclxuXHRcdHZhciBwcm9taXNlID0gdXRpbHMuUHJvbWlzZSgpO1xyXG5cclxuXHRcdHZhciBwID0gdXRpbHMuYXJncyh7bmFtZToncycsIG9wdGlvbnM6ICdvJywgY2FsbGJhY2s6ICdmJ30sIGFyZ3VtZW50cyk7XHJcblxyXG5cdFx0cC5vcHRpb25zID0gcC5vcHRpb25zIHx8IHt9O1xyXG5cclxuXHRcdC8vIEFkZCBjYWxsYmFjayB0byBldmVudHNcclxuXHRcdHByb21pc2UucHJveHkudGhlbihwLmNhbGxiYWNrLCBwLmNhbGxiYWNrKTtcclxuXHJcblx0XHQvLyBUcmlnZ2VyIGFuIGV2ZW50IG9uIHRoZSBnbG9iYWwgbGlzdGVuZXJcclxuXHRcdGZ1bmN0aW9uIGVtaXQocywgdmFsdWUpIHtcclxuXHRcdFx0aGVsbG8uZW1pdChzLCB2YWx1ZSk7XHJcblx0XHR9XHJcblxyXG5cdFx0cHJvbWlzZS5wcm94eS50aGVuKGVtaXQuYmluZCh0aGlzLCAnYXV0aC5sb2dvdXQgYXV0aCcpLCBlbWl0LmJpbmQodGhpcywgJ2Vycm9yJykpO1xyXG5cclxuXHRcdC8vIE5ldHdvcmtcclxuXHRcdHAubmFtZSA9IHAubmFtZSB8fCB0aGlzLnNldHRpbmdzLmRlZmF1bHRfc2VydmljZTtcclxuXHRcdHAuYXV0aFJlc3BvbnNlID0gdXRpbHMuc3RvcmUocC5uYW1lKTtcclxuXHJcblx0XHRpZiAocC5uYW1lICYmICEocC5uYW1lIGluIF90aGlzLnNlcnZpY2VzKSkge1xyXG5cclxuXHRcdFx0cHJvbWlzZS5yZWplY3QoZXJyb3IoJ2ludmFsaWRfbmV0d29yaycsICdUaGUgbmV0d29yayB3YXMgdW5yZWNvZ25pemVkJykpO1xyXG5cclxuXHRcdH1cclxuXHRcdGVsc2UgaWYgKHAubmFtZSAmJiBwLmF1dGhSZXNwb25zZSkge1xyXG5cclxuXHRcdFx0Ly8gRGVmaW5lIHRoZSBjYWxsYmFja1xyXG5cdFx0XHR2YXIgY2FsbGJhY2sgPSBmdW5jdGlvbihvcHRzKSB7XHJcblxyXG5cdFx0XHRcdC8vIFJlbW92ZSBmcm9tIHRoZSBzdG9yZVxyXG5cdFx0XHRcdHV0aWxzLnN0b3JlKHAubmFtZSwgbnVsbCk7XHJcblxyXG5cdFx0XHRcdC8vIEVtaXQgZXZlbnRzIGJ5IGRlZmF1bHRcclxuXHRcdFx0XHRwcm9taXNlLmZ1bGZpbGwoaGVsbG8udXRpbHMubWVyZ2Uoe25ldHdvcms6cC5uYW1lfSwgb3B0cyB8fCB7fSkpO1xyXG5cdFx0XHR9O1xyXG5cclxuXHRcdFx0Ly8gUnVuIGFuIGFzeW5jIG9wZXJhdGlvbiB0byByZW1vdmUgdGhlIHVzZXJzIHNlc3Npb25cclxuXHRcdFx0dmFyIF9vcHRzID0ge307XHJcblx0XHRcdGlmIChwLm9wdGlvbnMuZm9yY2UpIHtcclxuXHRcdFx0XHR2YXIgbG9nb3V0ID0gX3RoaXMuc2VydmljZXNbcC5uYW1lXS5sb2dvdXQ7XHJcblx0XHRcdFx0aWYgKGxvZ291dCkge1xyXG5cdFx0XHRcdFx0Ly8gQ29udmVydCBsb2dvdXQgdG8gVVJMIHN0cmluZyxcclxuXHRcdFx0XHRcdC8vIElmIG5vIHN0cmluZyBpcyByZXR1cm5lZCwgdGhlbiB0aGlzIGZ1bmN0aW9uIHdpbGwgaGFuZGxlIHRoZSBsb2dvdXQgYXN5bmMgc3R5bGVcclxuXHRcdFx0XHRcdGlmICh0eXBlb2YgKGxvZ291dCkgPT09ICdmdW5jdGlvbicpIHtcclxuXHRcdFx0XHRcdFx0bG9nb3V0ID0gbG9nb3V0KGNhbGxiYWNrLCBwKTtcclxuXHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHQvLyBJZiBsb2dvdXQgaXMgYSBzdHJpbmcgdGhlbiBhc3N1bWUgVVJMIGFuZCBvcGVuIGluIGlmcmFtZS5cclxuXHRcdFx0XHRcdGlmICh0eXBlb2YgKGxvZ291dCkgPT09ICdzdHJpbmcnKSB7XHJcblx0XHRcdFx0XHRcdHV0aWxzLmlmcmFtZShsb2dvdXQpO1xyXG5cdFx0XHRcdFx0XHRfb3B0cy5mb3JjZSA9IG51bGw7XHJcblx0XHRcdFx0XHRcdF9vcHRzLm1lc3NhZ2UgPSAnTG9nb3V0IHN1Y2Nlc3Mgb24gcHJvdmlkZXJzIHNpdGUgd2FzIGluZGV0ZXJtaW5hdGUnO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0ZWxzZSBpZiAobG9nb3V0ID09PSB1bmRlZmluZWQpIHtcclxuXHRcdFx0XHRcdFx0Ly8gVGhlIGNhbGxiYWNrIGZ1bmN0aW9uIHdpbGwgaGFuZGxlIHRoZSByZXNwb25zZS5cclxuXHRcdFx0XHRcdFx0cmV0dXJuIHByb21pc2UucHJveHk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQvLyBSZW1vdmUgbG9jYWwgY3JlZGVudGlhbHNcclxuXHRcdFx0Y2FsbGJhY2soX29wdHMpO1xyXG5cdFx0fVxyXG5cdFx0ZWxzZSB7XHJcblx0XHRcdHByb21pc2UucmVqZWN0KGVycm9yKCdpbnZhbGlkX3Nlc3Npb24nLCAnVGhlcmUgd2FzIG5vIHNlc3Npb24gdG8gcmVtb3ZlJykpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBwcm9taXNlLnByb3h5O1xyXG5cdH0sXHJcblxyXG5cdC8vIFJldHVybnMgYWxsIHRoZSBzZXNzaW9ucyB0aGF0IGFyZSBzdWJzY3JpYmVkIHRvb1xyXG5cdC8vIEBwYXJhbSBzdHJpbmcgb3B0aW9uYWwsIG5hbWUgb2YgdGhlIHNlcnZpY2UgdG8gZ2V0IGluZm9ybWF0aW9uIGFib3V0LlxyXG5cdGdldEF1dGhSZXNwb25zZTogZnVuY3Rpb24oc2VydmljZSkge1xyXG5cclxuXHRcdC8vIElmIHRoZSBzZXJ2aWNlIGRvZXNuJ3QgZXhpc3RcclxuXHRcdHNlcnZpY2UgPSBzZXJ2aWNlIHx8IHRoaXMuc2V0dGluZ3MuZGVmYXVsdF9zZXJ2aWNlO1xyXG5cclxuXHRcdGlmICghc2VydmljZSB8fCAhKHNlcnZpY2UgaW4gdGhpcy5zZXJ2aWNlcykpIHtcclxuXHRcdFx0cmV0dXJuIG51bGw7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIHRoaXMudXRpbHMuc3RvcmUoc2VydmljZSkgfHwgbnVsbDtcclxuXHR9LFxyXG5cclxuXHQvLyBFdmVudHM6IHBsYWNlaG9sZGVyIGZvciB0aGUgZXZlbnRzXHJcblx0ZXZlbnRzOiB7fVxyXG59KTtcclxuXHJcbi8vIENvcmUgdXRpbGl0aWVzXHJcbmhlbGxvLnV0aWxzLmV4dGVuZChoZWxsby51dGlscywge1xyXG5cclxuXHQvLyBFcnJvclxyXG5cdGVycm9yOiBmdW5jdGlvbihjb2RlLCBtZXNzYWdlKSB7XHJcblx0XHRyZXR1cm4ge1xyXG5cdFx0XHRlcnJvcjoge1xyXG5cdFx0XHRcdGNvZGU6IGNvZGUsXHJcblx0XHRcdFx0bWVzc2FnZTogbWVzc2FnZVxyXG5cdFx0XHR9XHJcblx0XHR9O1xyXG5cdH0sXHJcblxyXG5cdC8vIEFwcGVuZCB0aGUgcXVlcnlzdHJpbmcgdG8gYSB1cmxcclxuXHQvLyBAcGFyYW0gc3RyaW5nIHVybFxyXG5cdC8vIEBwYXJhbSBvYmplY3QgcGFyYW1ldGVyc1xyXG5cdHFzOiBmdW5jdGlvbih1cmwsIHBhcmFtcywgZm9ybWF0RnVuY3Rpb24pIHtcclxuXHJcblx0XHRpZiAocGFyYW1zKSB7XHJcblxyXG5cdFx0XHQvLyBTZXQgZGVmYXVsdCBmb3JtYXR0aW5nIGZ1bmN0aW9uXHJcblx0XHRcdGZvcm1hdEZ1bmN0aW9uID0gZm9ybWF0RnVuY3Rpb24gfHwgZW5jb2RlVVJJQ29tcG9uZW50O1xyXG5cclxuXHRcdFx0Ly8gT3ZlcnJpZGUgdGhlIGl0ZW1zIGluIHRoZSBVUkwgd2hpY2ggYWxyZWFkeSBleGlzdFxyXG5cdFx0XHRmb3IgKHZhciB4IGluIHBhcmFtcykge1xyXG5cdFx0XHRcdHZhciBzdHIgPSAnKFtcXFxcP1xcXFwmXSknICsgeCArICc9W15cXFxcJl0qJztcclxuXHRcdFx0XHR2YXIgcmVnID0gbmV3IFJlZ0V4cChzdHIpO1xyXG5cdFx0XHRcdGlmICh1cmwubWF0Y2gocmVnKSkge1xyXG5cdFx0XHRcdFx0dXJsID0gdXJsLnJlcGxhY2UocmVnLCAnJDEnICsgeCArICc9JyArIGZvcm1hdEZ1bmN0aW9uKHBhcmFtc1t4XSkpO1xyXG5cdFx0XHRcdFx0ZGVsZXRlIHBhcmFtc1t4XTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHRpZiAoIXRoaXMuaXNFbXB0eShwYXJhbXMpKSB7XHJcblx0XHRcdHJldHVybiB1cmwgKyAodXJsLmluZGV4T2YoJz8nKSA+IC0xID8gJyYnIDogJz8nKSArIHRoaXMucGFyYW0ocGFyYW1zLCBmb3JtYXRGdW5jdGlvbik7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIHVybDtcclxuXHR9LFxyXG5cclxuXHQvLyBQYXJhbVxyXG5cdC8vIEV4cGxvZGUvZW5jb2RlIHRoZSBwYXJhbWV0ZXJzIG9mIGFuIFVSTCBzdHJpbmcvb2JqZWN0XHJcblx0Ly8gQHBhcmFtIHN0cmluZyBzLCBzdHJpbmcgdG8gZGVjb2RlXHJcblx0cGFyYW06IGZ1bmN0aW9uKHMsIGZvcm1hdEZ1bmN0aW9uKSB7XHJcblx0XHR2YXIgYjtcclxuXHRcdHZhciBhID0ge307XHJcblx0XHR2YXIgbTtcclxuXHJcblx0XHRpZiAodHlwZW9mIChzKSA9PT0gJ3N0cmluZycpIHtcclxuXHJcblx0XHRcdGZvcm1hdEZ1bmN0aW9uID0gZm9ybWF0RnVuY3Rpb24gfHwgZGVjb2RlVVJJQ29tcG9uZW50O1xyXG5cclxuXHRcdFx0bSA9IHMucmVwbGFjZSgvXltcXCNcXD9dLywgJycpLm1hdGNoKC8oW149XFwvXFwmXSspPShbXlxcJl0rKS9nKTtcclxuXHRcdFx0aWYgKG0pIHtcclxuXHRcdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IG0ubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0XHRcdGIgPSBtW2ldLm1hdGNoKC8oW149XSspPSguKikvKTtcclxuXHRcdFx0XHRcdGFbYlsxXV0gPSBmb3JtYXRGdW5jdGlvbihiWzJdKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHJldHVybiBhO1xyXG5cdFx0fVxyXG5cdFx0ZWxzZSB7XHJcblxyXG5cdFx0XHRmb3JtYXRGdW5jdGlvbiA9IGZvcm1hdEZ1bmN0aW9uIHx8IGVuY29kZVVSSUNvbXBvbmVudDtcclxuXHJcblx0XHRcdHZhciBvID0gcztcclxuXHJcblx0XHRcdGEgPSBbXTtcclxuXHJcblx0XHRcdGZvciAodmFyIHggaW4gbykge2lmIChvLmhhc093blByb3BlcnR5KHgpKSB7XHJcblx0XHRcdFx0aWYgKG8uaGFzT3duUHJvcGVydHkoeCkpIHtcclxuXHRcdFx0XHRcdGEucHVzaChbeCwgb1t4XSA9PT0gJz8nID8gJz8nIDogZm9ybWF0RnVuY3Rpb24ob1t4XSldLmpvaW4oJz0nKSk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9fVxyXG5cclxuXHRcdFx0cmV0dXJuIGEuam9pbignJicpO1xyXG5cdFx0fVxyXG5cdH0sXHJcblxyXG5cdC8vIExvY2FsIHN0b3JhZ2UgZmFjYWRlXHJcblx0c3RvcmU6IChmdW5jdGlvbigpIHtcclxuXHJcblx0XHR2YXIgYSA9IFsnbG9jYWxTdG9yYWdlJywgJ3Nlc3Npb25TdG9yYWdlJ107XHJcblx0XHR2YXIgaSA9IC0xO1xyXG5cdFx0dmFyIHByZWZpeCA9ICd0ZXN0JztcclxuXHJcblx0XHQvLyBTZXQgTG9jYWxTdG9yYWdlXHJcblx0XHR2YXIgbG9jYWxTdG9yYWdlO1xyXG5cclxuXHRcdHdoaWxlIChhWysraV0pIHtcclxuXHRcdFx0dHJ5IHtcclxuXHRcdFx0XHQvLyBJbiBDaHJvbWUgd2l0aCBjb29raWVzIGJsb2NrZWQsIGNhbGxpbmcgbG9jYWxTdG9yYWdlIHRocm93cyBhbiBlcnJvclxyXG5cdFx0XHRcdGxvY2FsU3RvcmFnZSA9IHdpbmRvd1thW2ldXTtcclxuXHRcdFx0XHRsb2NhbFN0b3JhZ2Uuc2V0SXRlbShwcmVmaXggKyBpLCBpKTtcclxuXHRcdFx0XHRsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbShwcmVmaXggKyBpKTtcclxuXHRcdFx0XHRicmVhaztcclxuXHRcdFx0fVxyXG5cdFx0XHRjYXRjaCAoZSkge1xyXG5cdFx0XHRcdGxvY2FsU3RvcmFnZSA9IG51bGw7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHRpZiAoIWxvY2FsU3RvcmFnZSkge1xyXG5cclxuXHRcdFx0dmFyIGNhY2hlID0gbnVsbDtcclxuXHJcblx0XHRcdGxvY2FsU3RvcmFnZSA9IHtcclxuXHRcdFx0XHRnZXRJdGVtOiBmdW5jdGlvbihwcm9wKSB7XHJcblx0XHRcdFx0XHRwcm9wID0gcHJvcCArICc9JztcclxuXHRcdFx0XHRcdHZhciBtID0gZG9jdW1lbnQuY29va2llLnNwbGl0KCc7Jyk7XHJcblx0XHRcdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IG0ubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0XHRcdFx0dmFyIF9tID0gbVtpXS5yZXBsYWNlKC8oXlxccyt8XFxzKyQpLywgJycpO1xyXG5cdFx0XHRcdFx0XHRpZiAoX20gJiYgX20uaW5kZXhPZihwcm9wKSA9PT0gMCkge1xyXG5cdFx0XHRcdFx0XHRcdHJldHVybiBfbS5zdWJzdHIocHJvcC5sZW5ndGgpO1xyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0cmV0dXJuIGNhY2hlO1xyXG5cdFx0XHRcdH0sXHJcblxyXG5cdFx0XHRcdHNldEl0ZW06IGZ1bmN0aW9uKHByb3AsIHZhbHVlKSB7XHJcblx0XHRcdFx0XHRjYWNoZSA9IHZhbHVlO1xyXG5cdFx0XHRcdFx0ZG9jdW1lbnQuY29va2llID0gcHJvcCArICc9JyArIHZhbHVlO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fTtcclxuXHJcblx0XHRcdC8vIEZpbGwgdGhlIGNhY2hlIHVwXHJcblx0XHRcdGNhY2hlID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2hlbGxvJyk7XHJcblx0XHR9XHJcblxyXG5cdFx0ZnVuY3Rpb24gZ2V0KCkge1xyXG5cdFx0XHR2YXIganNvbiA9IHt9O1xyXG5cdFx0XHR0cnkge1xyXG5cdFx0XHRcdGpzb24gPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdoZWxsbycpKSB8fCB7fTtcclxuXHRcdFx0fVxyXG5cdFx0XHRjYXRjaCAoZSkge31cclxuXHJcblx0XHRcdHJldHVybiBqc29uO1xyXG5cdFx0fVxyXG5cclxuXHRcdGZ1bmN0aW9uIHNldChqc29uKSB7XHJcblx0XHRcdGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdoZWxsbycsIEpTT04uc3RyaW5naWZ5KGpzb24pKTtcclxuXHRcdH1cclxuXHJcblx0XHQvLyBDaGVjayBpZiB0aGUgYnJvd3NlciBzdXBwb3J0IGxvY2FsIHN0b3JhZ2VcclxuXHRcdHJldHVybiBmdW5jdGlvbihuYW1lLCB2YWx1ZSwgZGF5cykge1xyXG5cclxuXHRcdFx0Ly8gTG9jYWwgc3RvcmFnZVxyXG5cdFx0XHR2YXIganNvbiA9IGdldCgpO1xyXG5cclxuXHRcdFx0aWYgKG5hbWUgJiYgdmFsdWUgPT09IHVuZGVmaW5lZCkge1xyXG5cdFx0XHRcdHJldHVybiBqc29uW25hbWVdIHx8IG51bGw7XHJcblx0XHRcdH1cclxuXHRcdFx0ZWxzZSBpZiAobmFtZSAmJiB2YWx1ZSA9PT0gbnVsbCkge1xyXG5cdFx0XHRcdHRyeSB7XHJcblx0XHRcdFx0XHRkZWxldGUganNvbltuYW1lXTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0Y2F0Y2ggKGUpIHtcclxuXHRcdFx0XHRcdGpzb25bbmFtZV0gPSBudWxsO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0XHRlbHNlIGlmIChuYW1lKSB7XHJcblx0XHRcdFx0anNvbltuYW1lXSA9IHZhbHVlO1xyXG5cdFx0XHR9XHJcblx0XHRcdGVsc2Uge1xyXG5cdFx0XHRcdHJldHVybiBqc29uO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRzZXQoanNvbik7XHJcblxyXG5cdFx0XHRyZXR1cm4ganNvbiB8fCBudWxsO1xyXG5cdFx0fTtcclxuXHJcblx0fSkoKSxcclxuXHJcblx0Ly8gQ3JlYXRlIGFuZCBBcHBlbmQgbmV3IERPTSBlbGVtZW50c1xyXG5cdC8vIEBwYXJhbSBub2RlIHN0cmluZ1xyXG5cdC8vIEBwYXJhbSBhdHRyIG9iamVjdCBsaXRlcmFsXHJcblx0Ly8gQHBhcmFtIGRvbS9zdHJpbmdcclxuXHRhcHBlbmQ6IGZ1bmN0aW9uKG5vZGUsIGF0dHIsIHRhcmdldCkge1xyXG5cclxuXHRcdHZhciBuID0gdHlwZW9mIChub2RlKSA9PT0gJ3N0cmluZycgPyBkb2N1bWVudC5jcmVhdGVFbGVtZW50KG5vZGUpIDogbm9kZTtcclxuXHJcblx0XHRpZiAodHlwZW9mIChhdHRyKSA9PT0gJ29iamVjdCcpIHtcclxuXHRcdFx0aWYgKCd0YWdOYW1lJyBpbiBhdHRyKSB7XHJcblx0XHRcdFx0dGFyZ2V0ID0gYXR0cjtcclxuXHRcdFx0fVxyXG5cdFx0XHRlbHNlIHtcclxuXHRcdFx0XHRmb3IgKHZhciB4IGluIGF0dHIpIHtpZiAoYXR0ci5oYXNPd25Qcm9wZXJ0eSh4KSkge1xyXG5cdFx0XHRcdFx0aWYgKHR5cGVvZiAoYXR0clt4XSkgPT09ICdvYmplY3QnKSB7XHJcblx0XHRcdFx0XHRcdGZvciAodmFyIHkgaW4gYXR0clt4XSkge2lmIChhdHRyW3hdLmhhc093blByb3BlcnR5KHkpKSB7XHJcblx0XHRcdFx0XHRcdFx0blt4XVt5XSA9IGF0dHJbeF1beV07XHJcblx0XHRcdFx0XHRcdH19XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRlbHNlIGlmICh4ID09PSAnaHRtbCcpIHtcclxuXHRcdFx0XHRcdFx0bi5pbm5lckhUTUwgPSBhdHRyW3hdO1xyXG5cdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdC8vIElFIGRvZXNuJ3QgbGlrZSB1cyBzZXR0aW5nIG1ldGhvZHMgd2l0aCBzZXRBdHRyaWJ1dGVcclxuXHRcdFx0XHRcdGVsc2UgaWYgKCEvXm9uLy50ZXN0KHgpKSB7XHJcblx0XHRcdFx0XHRcdG4uc2V0QXR0cmlidXRlKHgsIGF0dHJbeF0pO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0ZWxzZSB7XHJcblx0XHRcdFx0XHRcdG5beF0gPSBhdHRyW3hdO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH19XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHRpZiAodGFyZ2V0ID09PSAnYm9keScpIHtcclxuXHRcdFx0KGZ1bmN0aW9uIHNlbGYoKSB7XHJcblx0XHRcdFx0aWYgKGRvY3VtZW50LmJvZHkpIHtcclxuXHRcdFx0XHRcdGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQobik7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdGVsc2Uge1xyXG5cdFx0XHRcdFx0c2V0VGltZW91dChzZWxmLCAxNik7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9KSgpO1xyXG5cdFx0fVxyXG5cdFx0ZWxzZSBpZiAodHlwZW9mICh0YXJnZXQpID09PSAnb2JqZWN0Jykge1xyXG5cdFx0XHR0YXJnZXQuYXBwZW5kQ2hpbGQobik7XHJcblx0XHR9XHJcblx0XHRlbHNlIGlmICh0eXBlb2YgKHRhcmdldCkgPT09ICdzdHJpbmcnKSB7XHJcblx0XHRcdGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKHRhcmdldClbMF0uYXBwZW5kQ2hpbGQobik7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIG47XHJcblx0fSxcclxuXHJcblx0Ly8gQW4gZWFzeSB3YXkgdG8gY3JlYXRlIGEgaGlkZGVuIGlmcmFtZVxyXG5cdC8vIEBwYXJhbSBzdHJpbmcgc3JjXHJcblx0aWZyYW1lOiBmdW5jdGlvbihzcmMpIHtcclxuXHRcdHRoaXMuYXBwZW5kKCdpZnJhbWUnLCB7c3JjOiBzcmMsIHN0eWxlOiB7cG9zaXRpb246J2Fic29sdXRlJywgbGVmdDogJy0xMDAwcHgnLCBib3R0b206IDAsIGhlaWdodDogJzFweCcsIHdpZHRoOiAnMXB4J319LCAnYm9keScpO1xyXG5cdH0sXHJcblxyXG5cdC8vIFJlY3Vyc2l2ZSBtZXJnZSB0d28gb2JqZWN0cyBpbnRvIG9uZSwgc2Vjb25kIHBhcmFtZXRlciBvdmVyaWRlcyB0aGUgZmlyc3RcclxuXHQvLyBAcGFyYW0gYSBhcnJheVxyXG5cdG1lcmdlOiBmdW5jdGlvbigvKiBBcmdzOiBhLCBiLCBjLCAuLiBuICovKSB7XHJcblx0XHR2YXIgYXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cyk7XHJcblx0XHRhcmdzLnVuc2hpZnQoe30pO1xyXG5cdFx0cmV0dXJuIHRoaXMuZXh0ZW5kLmFwcGx5KG51bGwsIGFyZ3MpO1xyXG5cdH0sXHJcblxyXG5cdC8vIE1ha2VzIGl0IGVhc2llciB0byBhc3NpZ24gcGFyYW1ldGVycywgd2hlcmUgc29tZSBhcmUgb3B0aW9uYWxcclxuXHQvLyBAcGFyYW0gbyBvYmplY3RcclxuXHQvLyBAcGFyYW0gYSBhcmd1bWVudHNcclxuXHRhcmdzOiBmdW5jdGlvbihvLCBhcmdzKSB7XHJcblxyXG5cdFx0dmFyIHAgPSB7fTtcclxuXHRcdHZhciBpID0gMDtcclxuXHRcdHZhciB0ID0gbnVsbDtcclxuXHRcdHZhciB4ID0gbnVsbDtcclxuXHJcblx0XHQvLyAneCcgaXMgdGhlIGZpcnN0IGtleSBpbiB0aGUgbGlzdCBvZiBvYmplY3QgcGFyYW1ldGVyc1xyXG5cdFx0Zm9yICh4IGluIG8pIHtpZiAoby5oYXNPd25Qcm9wZXJ0eSh4KSkge1xyXG5cdFx0XHRicmVhaztcclxuXHRcdH19XHJcblxyXG5cdFx0Ly8gUGFzc2luZyBpbiBoYXNoIG9iamVjdCBvZiBhcmd1bWVudHM/XHJcblx0XHQvLyBXaGVyZSB0aGUgZmlyc3QgYXJndW1lbnQgY2FuJ3QgYmUgYW4gb2JqZWN0XHJcblx0XHRpZiAoKGFyZ3MubGVuZ3RoID09PSAxKSAmJiAodHlwZW9mIChhcmdzWzBdKSA9PT0gJ29iamVjdCcpICYmIG9beF0gIT0gJ28hJykge1xyXG5cclxuXHRcdFx0Ly8gQ291bGQgdGhpcyBvYmplY3Qgc3RpbGwgYmVsb25nIHRvIGEgcHJvcGVydHk/XHJcblx0XHRcdC8vIENoZWNrIHRoZSBvYmplY3Qga2V5cyBpZiB0aGV5IG1hdGNoIGFueSBvZiB0aGUgcHJvcGVydHkga2V5c1xyXG5cdFx0XHRmb3IgKHggaW4gYXJnc1swXSkge2lmIChvLmhhc093blByb3BlcnR5KHgpKSB7XHJcblx0XHRcdFx0Ly8gRG9lcyB0aGlzIGtleSBleGlzdCBpbiB0aGUgcHJvcGVydHkgbGlzdD9cclxuXHRcdFx0XHRpZiAoeCBpbiBvKSB7XHJcblx0XHRcdFx0XHQvLyBZZXMgdGhpcyBrZXkgZG9lcyBleGlzdCBzbyBpdHMgbW9zdCBsaWtlbHkgdGhpcyBmdW5jdGlvbiBoYXMgYmVlbiBpbnZva2VkIHdpdGggYW4gb2JqZWN0IHBhcmFtZXRlclxyXG5cdFx0XHRcdFx0Ly8gUmV0dXJuIGZpcnN0IGFyZ3VtZW50IGFzIHRoZSBoYXNoIG9mIGFsbCBhcmd1bWVudHNcclxuXHRcdFx0XHRcdHJldHVybiBhcmdzWzBdO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fX1cclxuXHRcdH1cclxuXHJcblx0XHQvLyBFbHNlIGxvb3AgdGhyb3VnaCBhbmQgYWNjb3VudCBmb3IgdGhlIG1pc3Npbmcgb25lcy5cclxuXHRcdGZvciAoeCBpbiBvKSB7aWYgKG8uaGFzT3duUHJvcGVydHkoeCkpIHtcclxuXHJcblx0XHRcdHQgPSB0eXBlb2YgKGFyZ3NbaV0pO1xyXG5cclxuXHRcdFx0aWYgKCh0eXBlb2YgKG9beF0pID09PSAnZnVuY3Rpb24nICYmIG9beF0udGVzdChhcmdzW2ldKSkgfHwgKHR5cGVvZiAob1t4XSkgPT09ICdzdHJpbmcnICYmIChcclxuXHRcdFx0KG9beF0uaW5kZXhPZigncycpID4gLTEgJiYgdCA9PT0gJ3N0cmluZycpIHx8XHJcblx0XHRcdChvW3hdLmluZGV4T2YoJ28nKSA+IC0xICYmIHQgPT09ICdvYmplY3QnKSB8fFxyXG5cdFx0XHQob1t4XS5pbmRleE9mKCdpJykgPiAtMSAmJiB0ID09PSAnbnVtYmVyJykgfHxcclxuXHRcdFx0KG9beF0uaW5kZXhPZignYScpID4gLTEgJiYgdCA9PT0gJ29iamVjdCcpIHx8XHJcblx0XHRcdChvW3hdLmluZGV4T2YoJ2YnKSA+IC0xICYmIHQgPT09ICdmdW5jdGlvbicpXHJcblx0XHRcdCkpXHJcblx0XHRcdCkge1xyXG5cdFx0XHRcdHBbeF0gPSBhcmdzW2krK107XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGVsc2UgaWYgKHR5cGVvZiAob1t4XSkgPT09ICdzdHJpbmcnICYmIG9beF0uaW5kZXhPZignIScpID4gLTEpIHtcclxuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHRcdH1cclxuXHRcdH19XHJcblxyXG5cdFx0cmV0dXJuIHA7XHJcblx0fSxcclxuXHJcblx0Ly8gUmV0dXJucyBhIFVSTCBpbnN0YW5jZVxyXG5cdHVybDogZnVuY3Rpb24ocGF0aCkge1xyXG5cclxuXHRcdC8vIElmIHRoZSBwYXRoIGlzIGVtcHR5XHJcblx0XHRpZiAoIXBhdGgpIHtcclxuXHRcdFx0cmV0dXJuIHdpbmRvdy5sb2NhdGlvbjtcclxuXHRcdH1cclxuXHJcblx0XHQvLyBDaHJvbWUgYW5kIEZpcmVGb3ggc3VwcG9ydCBuZXcgVVJMKCkgdG8gZXh0cmFjdCBVUkwgb2JqZWN0c1xyXG5cdFx0ZWxzZSBpZiAod2luZG93LlVSTCAmJiBVUkwgaW5zdGFuY2VvZiBGdW5jdGlvbiAmJiBVUkwubGVuZ3RoICE9PSAwKSB7XHJcblx0XHRcdHJldHVybiBuZXcgVVJMKHBhdGgsIHdpbmRvdy5sb2NhdGlvbik7XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gVWdseSBzaGltLCBpdCB3b3JrcyFcclxuXHRcdGVsc2Uge1xyXG5cdFx0XHR2YXIgYSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcclxuXHRcdFx0YS5ocmVmID0gcGF0aDtcclxuXHRcdFx0cmV0dXJuIGEuY2xvbmVOb2RlKGZhbHNlKTtcclxuXHRcdH1cclxuXHR9LFxyXG5cclxuXHRkaWZmOiBmdW5jdGlvbihhLCBiKSB7XHJcblx0XHRyZXR1cm4gYi5maWx0ZXIoZnVuY3Rpb24oaXRlbSkge1xyXG5cdFx0XHRyZXR1cm4gYS5pbmRleE9mKGl0ZW0pID09PSAtMTtcclxuXHRcdH0pO1xyXG5cdH0sXHJcblxyXG5cdC8vIEdldCB0aGUgZGlmZmVyZW50IGhhc2ggb2YgcHJvcGVydGllcyB1bmlxdWUgdG8gYGFgLCBhbmQgbm90IGluIGBiYFxyXG5cdGRpZmZLZXk6IGZ1bmN0aW9uKGEsIGIpIHtcclxuXHRcdGlmIChhIHx8ICFiKSB7XHJcblx0XHRcdHZhciByID0ge307XHJcblx0XHRcdGZvciAodmFyIHggaW4gYSkge1xyXG5cdFx0XHRcdC8vIERvZXMgdGhlIHByb3BlcnR5IG5vdCBleGlzdD9cclxuXHRcdFx0XHRpZiAoISh4IGluIGIpKSB7XHJcblx0XHRcdFx0XHRyW3hdID0gYVt4XTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHJldHVybiByO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBhO1xyXG5cdH0sXHJcblxyXG5cdC8vIFVuaXF1ZVxyXG5cdC8vIFJlbW92ZSBkdXBsaWNhdGUgYW5kIG51bGwgdmFsdWVzIGZyb20gYW4gYXJyYXlcclxuXHQvLyBAcGFyYW0gYSBhcnJheVxyXG5cdHVuaXF1ZTogZnVuY3Rpb24oYSkge1xyXG5cdFx0aWYgKCFBcnJheS5pc0FycmF5KGEpKSB7IHJldHVybiBbXTsgfVxyXG5cclxuXHRcdHJldHVybiBhLmZpbHRlcihmdW5jdGlvbihpdGVtLCBpbmRleCkge1xyXG5cdFx0XHQvLyBJcyB0aGlzIHRoZSBmaXJzdCBsb2NhdGlvbiBvZiBpdGVtXHJcblx0XHRcdHJldHVybiBhLmluZGV4T2YoaXRlbSkgPT09IGluZGV4O1xyXG5cdFx0fSk7XHJcblx0fSxcclxuXHJcblx0aXNFbXB0eTogZnVuY3Rpb24ob2JqKSB7XHJcblxyXG5cdFx0Ly8gU2NhbGFyXHJcblx0XHRpZiAoIW9iailcclxuXHRcdFx0cmV0dXJuIHRydWU7XHJcblxyXG5cdFx0Ly8gQXJyYXlcclxuXHRcdGlmIChBcnJheS5pc0FycmF5KG9iaikpIHtcclxuXHRcdFx0cmV0dXJuICFvYmoubGVuZ3RoO1xyXG5cdFx0fVxyXG5cdFx0ZWxzZSBpZiAodHlwZW9mIChvYmopID09PSAnb2JqZWN0Jykge1xyXG5cdFx0XHQvLyBPYmplY3RcclxuXHRcdFx0Zm9yICh2YXIga2V5IGluIG9iaikge1xyXG5cdFx0XHRcdGlmIChvYmouaGFzT3duUHJvcGVydHkoa2V5KSkge1xyXG5cdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiB0cnVlO1xyXG5cdH0sXHJcblxyXG5cdC8vanNjczpkaXNhYmxlXHJcblxyXG5cdC8qIVxyXG5cdCAqKiAgVGhlbmFibGUgLS0gRW1iZWRkYWJsZSBNaW5pbXVtIFN0cmljdGx5LUNvbXBsaWFudCBQcm9taXNlcy9BKyAxLjEuMSBUaGVuYWJsZVxyXG5cdCAqKiAgQ29weXJpZ2h0IChjKSAyMDEzLTIwMTQgUmFsZiBTLiBFbmdlbHNjaGFsbCA8aHR0cDovL2VuZ2Vsc2NoYWxsLmNvbT5cclxuXHQgKiogIExpY2Vuc2VkIHVuZGVyIFRoZSBNSVQgTGljZW5zZSA8aHR0cDovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL01JVD5cclxuXHQgKiogIFNvdXJjZS1Db2RlIGRpc3RyaWJ1dGVkIG9uIDxodHRwOi8vZ2l0aHViLmNvbS9yc2UvdGhlbmFibGU+XHJcblx0ICovXHJcblx0UHJvbWlzZTogKGZ1bmN0aW9uKCl7XHJcblx0XHQvKiAgcHJvbWlzZSBzdGF0ZXMgW1Byb21pc2VzL0ErIDIuMV0gICovXHJcblx0XHR2YXIgU1RBVEVfUEVORElORyAgID0gMDsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8qICBbUHJvbWlzZXMvQSsgMi4xLjFdICAqL1xyXG5cdFx0dmFyIFNUQVRFX0ZVTEZJTExFRCA9IDE7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvKiAgW1Byb21pc2VzL0ErIDIuMS4yXSAgKi9cclxuXHRcdHZhciBTVEFURV9SRUpFQ1RFRCAgPSAyOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLyogIFtQcm9taXNlcy9BKyAyLjEuM10gICovXHJcblxyXG5cdFx0LyogIHByb21pc2Ugb2JqZWN0IGNvbnN0cnVjdG9yICAqL1xyXG5cdFx0dmFyIGFwaSA9IGZ1bmN0aW9uIChleGVjdXRvcikge1xyXG5cdFx0XHQvKiAgb3B0aW9uYWxseSBzdXBwb3J0IG5vbi1jb25zdHJ1Y3Rvci9wbGFpbi1mdW5jdGlvbiBjYWxsICAqL1xyXG5cdFx0XHRpZiAoISh0aGlzIGluc3RhbmNlb2YgYXBpKSlcclxuXHRcdFx0XHRyZXR1cm4gbmV3IGFwaShleGVjdXRvcik7XHJcblxyXG5cdFx0XHQvKiAgaW5pdGlhbGl6ZSBvYmplY3QgICovXHJcblx0XHRcdHRoaXMuaWQgICAgICAgICAgID0gXCJUaGVuYWJsZS8xLjAuNlwiO1xyXG5cdFx0XHR0aGlzLnN0YXRlICAgICAgICA9IFNUQVRFX1BFTkRJTkc7IC8qICBpbml0aWFsIHN0YXRlICAqL1xyXG5cdFx0XHR0aGlzLmZ1bGZpbGxWYWx1ZSA9IHVuZGVmaW5lZDsgICAgIC8qICBpbml0aWFsIHZhbHVlICAqLyAgICAgLyogIFtQcm9taXNlcy9BKyAxLjMsIDIuMS4yLjJdICAqL1xyXG5cdFx0XHR0aGlzLnJlamVjdFJlYXNvbiA9IHVuZGVmaW5lZDsgICAgIC8qICBpbml0aWFsIHJlYXNvbiAqLyAgICAgLyogIFtQcm9taXNlcy9BKyAxLjUsIDIuMS4zLjJdICAqL1xyXG5cdFx0XHR0aGlzLm9uRnVsZmlsbGVkICA9IFtdOyAgICAgICAgICAgIC8qICBpbml0aWFsIGhhbmRsZXJzICAqL1xyXG5cdFx0XHR0aGlzLm9uUmVqZWN0ZWQgICA9IFtdOyAgICAgICAgICAgIC8qICBpbml0aWFsIGhhbmRsZXJzICAqL1xyXG5cclxuXHRcdFx0LyogIHByb3ZpZGUgb3B0aW9uYWwgaW5mb3JtYXRpb24taGlkaW5nIHByb3h5ICAqL1xyXG5cdFx0XHR0aGlzLnByb3h5ID0ge1xyXG5cdFx0XHRcdHRoZW46IHRoaXMudGhlbi5iaW5kKHRoaXMpXHJcblx0XHRcdH07XHJcblxyXG5cdFx0XHQvKiAgc3VwcG9ydCBvcHRpb25hbCBleGVjdXRvciBmdW5jdGlvbiAgKi9cclxuXHRcdFx0aWYgKHR5cGVvZiBleGVjdXRvciA9PT0gXCJmdW5jdGlvblwiKVxyXG5cdFx0XHRcdGV4ZWN1dG9yLmNhbGwodGhpcywgdGhpcy5mdWxmaWxsLmJpbmQodGhpcyksIHRoaXMucmVqZWN0LmJpbmQodGhpcykpO1xyXG5cdFx0fTtcclxuXHJcblx0XHQvKiAgcHJvbWlzZSBBUEkgbWV0aG9kcyAgKi9cclxuXHRcdGFwaS5wcm90b3R5cGUgPSB7XHJcblx0XHRcdC8qICBwcm9taXNlIHJlc29sdmluZyBtZXRob2RzICAqL1xyXG5cdFx0XHRmdWxmaWxsOiBmdW5jdGlvbiAodmFsdWUpIHsgcmV0dXJuIGRlbGl2ZXIodGhpcywgU1RBVEVfRlVMRklMTEVELCBcImZ1bGZpbGxWYWx1ZVwiLCB2YWx1ZSk7IH0sXHJcblx0XHRcdHJlamVjdDogIGZ1bmN0aW9uICh2YWx1ZSkgeyByZXR1cm4gZGVsaXZlcih0aGlzLCBTVEFURV9SRUpFQ1RFRCwgIFwicmVqZWN0UmVhc29uXCIsIHZhbHVlKTsgfSxcclxuXHJcblx0XHRcdC8qICBcIlRoZSB0aGVuIE1ldGhvZFwiIFtQcm9taXNlcy9BKyAxLjEsIDEuMiwgMi4yXSAgKi9cclxuXHRcdFx0dGhlbjogZnVuY3Rpb24gKG9uRnVsZmlsbGVkLCBvblJlamVjdGVkKSB7XHJcblx0XHRcdFx0dmFyIGN1cnIgPSB0aGlzO1xyXG5cdFx0XHRcdHZhciBuZXh0ID0gbmV3IGFwaSgpOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8qICBbUHJvbWlzZXMvQSsgMi4yLjddICAqL1xyXG5cdFx0XHRcdGN1cnIub25GdWxmaWxsZWQucHVzaChcclxuXHRcdFx0XHRcdHJlc29sdmVyKG9uRnVsZmlsbGVkLCBuZXh0LCBcImZ1bGZpbGxcIikpOyAgICAgICAgICAgICAvKiAgW1Byb21pc2VzL0ErIDIuMi4yLzIuMi42XSAgKi9cclxuXHRcdFx0XHRjdXJyLm9uUmVqZWN0ZWQucHVzaChcclxuXHRcdFx0XHRcdHJlc29sdmVyKG9uUmVqZWN0ZWQsICBuZXh0LCBcInJlamVjdFwiICkpOyAgICAgICAgICAgICAvKiAgW1Byb21pc2VzL0ErIDIuMi4zLzIuMi42XSAgKi9cclxuXHRcdFx0XHRleGVjdXRlKGN1cnIpO1xyXG5cdFx0XHRcdHJldHVybiBuZXh0LnByb3h5OyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8qICBbUHJvbWlzZXMvQSsgMi4yLjcsIDMuM10gICovXHJcblx0XHRcdH1cclxuXHRcdH07XHJcblxyXG5cdFx0LyogIGRlbGl2ZXIgYW4gYWN0aW9uICAqL1xyXG5cdFx0dmFyIGRlbGl2ZXIgPSBmdW5jdGlvbiAoY3Vyciwgc3RhdGUsIG5hbWUsIHZhbHVlKSB7XHJcblx0XHRcdGlmIChjdXJyLnN0YXRlID09PSBTVEFURV9QRU5ESU5HKSB7XHJcblx0XHRcdFx0Y3Vyci5zdGF0ZSA9IHN0YXRlOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLyogIFtQcm9taXNlcy9BKyAyLjEuMi4xLCAyLjEuMy4xXSAgKi9cclxuXHRcdFx0XHRjdXJyW25hbWVdID0gdmFsdWU7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvKiAgW1Byb21pc2VzL0ErIDIuMS4yLjIsIDIuMS4zLjJdICAqL1xyXG5cdFx0XHRcdGV4ZWN1dGUoY3Vycik7XHJcblx0XHRcdH1cclxuXHRcdFx0cmV0dXJuIGN1cnI7XHJcblx0XHR9O1xyXG5cclxuXHRcdC8qICBleGVjdXRlIGFsbCBoYW5kbGVycyAgKi9cclxuXHRcdHZhciBleGVjdXRlID0gZnVuY3Rpb24gKGN1cnIpIHtcclxuXHRcdFx0aWYgKGN1cnIuc3RhdGUgPT09IFNUQVRFX0ZVTEZJTExFRClcclxuXHRcdFx0XHRleGVjdXRlX2hhbmRsZXJzKGN1cnIsIFwib25GdWxmaWxsZWRcIiwgY3Vyci5mdWxmaWxsVmFsdWUpO1xyXG5cdFx0XHRlbHNlIGlmIChjdXJyLnN0YXRlID09PSBTVEFURV9SRUpFQ1RFRClcclxuXHRcdFx0XHRleGVjdXRlX2hhbmRsZXJzKGN1cnIsIFwib25SZWplY3RlZFwiLCAgY3Vyci5yZWplY3RSZWFzb24pO1xyXG5cdFx0fTtcclxuXHJcblx0XHQvKiAgZXhlY3V0ZSBwYXJ0aWN1bGFyIHNldCBvZiBoYW5kbGVycyAgKi9cclxuXHRcdHZhciBleGVjdXRlX2hhbmRsZXJzID0gZnVuY3Rpb24gKGN1cnIsIG5hbWUsIHZhbHVlKSB7XHJcblx0XHRcdC8qIGdsb2JhbCBwcm9jZXNzOiB0cnVlICovXHJcblx0XHRcdC8qIGdsb2JhbCBzZXRJbW1lZGlhdGU6IHRydWUgKi9cclxuXHRcdFx0LyogZ2xvYmFsIHNldFRpbWVvdXQ6IHRydWUgKi9cclxuXHJcblx0XHRcdC8qICBzaG9ydC1jaXJjdWl0IHByb2Nlc3NpbmcgICovXHJcblx0XHRcdGlmIChjdXJyW25hbWVdLmxlbmd0aCA9PT0gMClcclxuXHRcdFx0XHRyZXR1cm47XHJcblxyXG5cdFx0XHQvKiAgaXRlcmF0ZSBvdmVyIGFsbCBoYW5kbGVycywgZXhhY3RseSBvbmNlICAqL1xyXG5cdFx0XHR2YXIgaGFuZGxlcnMgPSBjdXJyW25hbWVdO1xyXG5cdFx0XHRjdXJyW25hbWVdID0gW107ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLyogIFtQcm9taXNlcy9BKyAyLjIuMi4zLCAyLjIuMy4zXSAgKi9cclxuXHRcdFx0dmFyIGZ1bmMgPSBmdW5jdGlvbiAoKSB7XHJcblx0XHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBoYW5kbGVycy5sZW5ndGg7IGkrKylcclxuXHRcdFx0XHRcdGhhbmRsZXJzW2ldKHZhbHVlKTsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLyogIFtQcm9taXNlcy9BKyAyLjIuNV0gICovXHJcblx0XHRcdH07XHJcblxyXG5cdFx0XHQvKiAgZXhlY3V0ZSBwcm9jZWR1cmUgYXN5bmNocm9ub3VzbHkgICovICAgICAgICAgICAgICAgICAgICAgLyogIFtQcm9taXNlcy9BKyAyLjIuNCwgMy4xXSAgKi9cclxuXHRcdFx0aWYgKHR5cGVvZiBwcm9jZXNzID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBwcm9jZXNzLm5leHRUaWNrID09PSBcImZ1bmN0aW9uXCIpXHJcblx0XHRcdFx0cHJvY2Vzcy5uZXh0VGljayhmdW5jKTtcclxuXHRcdFx0ZWxzZSBpZiAodHlwZW9mIHNldEltbWVkaWF0ZSA9PT0gXCJmdW5jdGlvblwiKVxyXG5cdFx0XHRcdHNldEltbWVkaWF0ZShmdW5jKTtcclxuXHRcdFx0ZWxzZVxyXG5cdFx0XHRcdHNldFRpbWVvdXQoZnVuYywgMCk7XHJcblx0XHR9O1xyXG5cclxuXHRcdC8qICBnZW5lcmF0ZSBhIHJlc29sdmVyIGZ1bmN0aW9uICAqL1xyXG5cdFx0dmFyIHJlc29sdmVyID0gZnVuY3Rpb24gKGNiLCBuZXh0LCBtZXRob2QpIHtcclxuXHRcdFx0cmV0dXJuIGZ1bmN0aW9uICh2YWx1ZSkge1xyXG5cdFx0XHRcdGlmICh0eXBlb2YgY2IgIT09IFwiZnVuY3Rpb25cIikgICAgICAgICAgICAgICAgICAgICAgICAgICAgLyogIFtQcm9taXNlcy9BKyAyLjIuMSwgMi4yLjcuMywgMi4yLjcuNF0gICovXHJcblx0XHRcdFx0XHRuZXh0W21ldGhvZF0uY2FsbChuZXh0LCB2YWx1ZSk7ICAgICAgICAgICAgICAgICAgICAgIC8qICBbUHJvbWlzZXMvQSsgMi4yLjcuMywgMi4yLjcuNF0gICovXHJcblx0XHRcdFx0ZWxzZSB7XHJcblx0XHRcdFx0XHR2YXIgcmVzdWx0O1xyXG5cdFx0XHRcdFx0dHJ5IHsgcmVzdWx0ID0gY2IodmFsdWUpOyB9ICAgICAgICAgICAgICAgICAgICAgICAgICAvKiAgW1Byb21pc2VzL0ErIDIuMi4yLjEsIDIuMi4zLjEsIDIuMi41LCAzLjJdICAqL1xyXG5cdFx0XHRcdFx0Y2F0Y2ggKGUpIHtcclxuXHRcdFx0XHRcdFx0bmV4dC5yZWplY3QoZSk7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8qICBbUHJvbWlzZXMvQSsgMi4yLjcuMl0gICovXHJcblx0XHRcdFx0XHRcdHJldHVybjtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdHJlc29sdmUobmV4dCwgcmVzdWx0KTsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLyogIFtQcm9taXNlcy9BKyAyLjIuNy4xXSAgKi9cclxuXHRcdFx0XHR9XHJcblx0XHRcdH07XHJcblx0XHR9O1xyXG5cclxuXHRcdC8qICBcIlByb21pc2UgUmVzb2x1dGlvbiBQcm9jZWR1cmVcIiAgKi8gICAgICAgICAgICAgICAgICAgICAgICAgICAvKiAgW1Byb21pc2VzL0ErIDIuM10gICovXHJcblx0XHR2YXIgcmVzb2x2ZSA9IGZ1bmN0aW9uIChwcm9taXNlLCB4KSB7XHJcblx0XHRcdC8qICBzYW5pdHkgY2hlY2sgYXJndW1lbnRzICAqLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvKiAgW1Byb21pc2VzL0ErIDIuMy4xXSAgKi9cclxuXHRcdFx0aWYgKHByb21pc2UgPT09IHggfHwgcHJvbWlzZS5wcm94eSA9PT0geCkge1xyXG5cdFx0XHRcdHByb21pc2UucmVqZWN0KG5ldyBUeXBlRXJyb3IoXCJjYW5ub3QgcmVzb2x2ZSBwcm9taXNlIHdpdGggaXRzZWxmXCIpKTtcclxuXHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdC8qICBzdXJnaWNhbGx5IGNoZWNrIGZvciBhIFwidGhlblwiIG1ldGhvZFxyXG5cdFx0XHRcdChtYWlubHkgdG8ganVzdCBjYWxsIHRoZSBcImdldHRlclwiIG9mIFwidGhlblwiIG9ubHkgb25jZSkgICovXHJcblx0XHRcdHZhciB0aGVuO1xyXG5cdFx0XHRpZiAoKHR5cGVvZiB4ID09PSBcIm9iamVjdFwiICYmIHggIT09IG51bGwpIHx8IHR5cGVvZiB4ID09PSBcImZ1bmN0aW9uXCIpIHtcclxuXHRcdFx0XHR0cnkgeyB0aGVuID0geC50aGVuOyB9ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvKiAgW1Byb21pc2VzL0ErIDIuMy4zLjEsIDMuNV0gICovXHJcblx0XHRcdFx0Y2F0Y2ggKGUpIHtcclxuXHRcdFx0XHRcdHByb21pc2UucmVqZWN0KGUpOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLyogIFtQcm9taXNlcy9BKyAyLjMuMy4yXSAgKi9cclxuXHRcdFx0XHRcdHJldHVybjtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdC8qICBoYW5kbGUgb3duIFRoZW5hYmxlcyAgICBbUHJvbWlzZXMvQSsgMi4zLjJdXHJcblx0XHRcdFx0YW5kIHNpbWlsYXIgXCJ0aGVuYWJsZXNcIiBbUHJvbWlzZXMvQSsgMi4zLjNdICAqL1xyXG5cdFx0XHRpZiAodHlwZW9mIHRoZW4gPT09IFwiZnVuY3Rpb25cIikge1xyXG5cdFx0XHRcdHZhciByZXNvbHZlZCA9IGZhbHNlO1xyXG5cdFx0XHRcdHRyeSB7XHJcblx0XHRcdFx0XHQvKiAgY2FsbCByZXRyaWV2ZWQgXCJ0aGVuXCIgbWV0aG9kICovICAgICAgICAgICAgICAgICAgLyogIFtQcm9taXNlcy9BKyAyLjMuMy4zXSAgKi9cclxuXHRcdFx0XHRcdHRoZW4uY2FsbCh4LFxyXG5cdFx0XHRcdFx0XHQvKiAgcmVzb2x2ZVByb21pc2UgICovICAgICAgICAgICAgICAgICAgICAgICAgICAgLyogIFtQcm9taXNlcy9BKyAyLjMuMy4zLjFdICAqL1xyXG5cdFx0XHRcdFx0XHRmdW5jdGlvbiAoeSkge1xyXG5cdFx0XHRcdFx0XHRcdGlmIChyZXNvbHZlZCkgcmV0dXJuOyByZXNvbHZlZCA9IHRydWU7ICAgICAgIC8qICBbUHJvbWlzZXMvQSsgMi4zLjMuMy4zXSAgKi9cclxuXHRcdFx0XHRcdFx0XHRpZiAoeSA9PT0geCkgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvKiAgW1Byb21pc2VzL0ErIDMuNl0gICovXHJcblx0XHRcdFx0XHRcdFx0XHRwcm9taXNlLnJlamVjdChuZXcgVHlwZUVycm9yKFwiY2lyY3VsYXIgdGhlbmFibGUgY2hhaW5cIikpO1xyXG5cdFx0XHRcdFx0XHRcdGVsc2VcclxuXHRcdFx0XHRcdFx0XHRcdHJlc29sdmUocHJvbWlzZSwgeSk7XHJcblx0XHRcdFx0XHRcdH0sXHJcblxyXG5cdFx0XHRcdFx0XHQvKiAgcmVqZWN0UHJvbWlzZSAgKi8gICAgICAgICAgICAgICAgICAgICAgICAgICAgLyogIFtQcm9taXNlcy9BKyAyLjMuMy4zLjJdICAqL1xyXG5cdFx0XHRcdFx0XHRmdW5jdGlvbiAocikge1xyXG5cdFx0XHRcdFx0XHRcdGlmIChyZXNvbHZlZCkgcmV0dXJuOyByZXNvbHZlZCA9IHRydWU7ICAgICAgIC8qICBbUHJvbWlzZXMvQSsgMi4zLjMuMy4zXSAgKi9cclxuXHRcdFx0XHRcdFx0XHRwcm9taXNlLnJlamVjdChyKTtcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0KTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0Y2F0Y2ggKGUpIHtcclxuXHRcdFx0XHRcdGlmICghcmVzb2x2ZWQpICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLyogIFtQcm9taXNlcy9BKyAyLjMuMy4zLjNdICAqL1xyXG5cdFx0XHRcdFx0XHRwcm9taXNlLnJlamVjdChlKTsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLyogIFtQcm9taXNlcy9BKyAyLjMuMy4zLjRdICAqL1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdC8qICBoYW5kbGUgb3RoZXIgdmFsdWVzICAqL1xyXG5cdFx0XHRwcm9taXNlLmZ1bGZpbGwoeCk7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLyogIFtQcm9taXNlcy9BKyAyLjMuNCwgMi4zLjMuNF0gICovXHJcblx0XHR9O1xyXG5cclxuXHRcdC8qICBleHBvcnQgQVBJICAqL1xyXG5cdFx0cmV0dXJuIGFwaTtcclxuXHR9KSgpLFxyXG5cclxuXHQvL2pzY3M6ZW5hYmxlXHJcblxyXG5cdC8vIEV2ZW50XHJcblx0Ly8gQSBjb250cnVjdG9yIHN1cGVyY2xhc3MgZm9yIGFkZGluZyBldmVudCBtZW50aG9kcywgb24sIG9mZiwgZW1pdC5cclxuXHRFdmVudDogZnVuY3Rpb24oKSB7XHJcblxyXG5cdFx0dmFyIHNlcGFyYXRvciA9IC9bXFxzXFwsXSsvO1xyXG5cclxuXHRcdC8vIElmIHRoaXMgZG9lc24ndCBzdXBwb3J0IGdldFByb3RvdHlwZSB0aGVuIHdlIGNhbid0IGdldCBwcm90b3R5cGUuZXZlbnRzIG9mIHRoZSBwYXJlbnRcclxuXHRcdC8vIFNvIGxldHMgZ2V0IHRoZSBjdXJyZW50IGluc3RhbmNlIGV2ZW50cywgYW5kIGFkZCB0aG9zZSB0byBhIHBhcmVudCBwcm9wZXJ0eVxyXG5cdFx0dGhpcy5wYXJlbnQgPSB7XHJcblx0XHRcdGV2ZW50czogdGhpcy5ldmVudHMsXHJcblx0XHRcdGZpbmRFdmVudHM6IHRoaXMuZmluZEV2ZW50cyxcclxuXHRcdFx0cGFyZW50OiB0aGlzLnBhcmVudCxcclxuXHRcdFx0dXRpbHM6IHRoaXMudXRpbHNcclxuXHRcdH07XHJcblxyXG5cdFx0dGhpcy5ldmVudHMgPSB7fTtcclxuXHJcblx0XHQvLyBPbiwgc3Vic2NyaWJlIHRvIGV2ZW50c1xyXG5cdFx0Ly8gQHBhcmFtIGV2dCAgIHN0cmluZ1xyXG5cdFx0Ly8gQHBhcmFtIGNhbGxiYWNrICBmdW5jdGlvblxyXG5cdFx0dGhpcy5vbiA9IGZ1bmN0aW9uKGV2dCwgY2FsbGJhY2spIHtcclxuXHJcblx0XHRcdGlmIChjYWxsYmFjayAmJiB0eXBlb2YgKGNhbGxiYWNrKSA9PT0gJ2Z1bmN0aW9uJykge1xyXG5cdFx0XHRcdHZhciBhID0gZXZ0LnNwbGl0KHNlcGFyYXRvcik7XHJcblx0XHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBhLmxlbmd0aDsgaSsrKSB7XHJcblxyXG5cdFx0XHRcdFx0Ly8gSGFzIHRoaXMgZXZlbnQgYWxyZWFkeSBiZWVuIGZpcmVkIG9uIHRoaXMgaW5zdGFuY2U/XHJcblx0XHRcdFx0XHR0aGlzLmV2ZW50c1thW2ldXSA9IFtjYWxsYmFja10uY29uY2F0KHRoaXMuZXZlbnRzW2FbaV1dIHx8IFtdKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHJldHVybiB0aGlzO1xyXG5cdFx0fTtcclxuXHJcblx0XHQvLyBPZmYsIHVuc3Vic2NyaWJlIHRvIGV2ZW50c1xyXG5cdFx0Ly8gQHBhcmFtIGV2dCAgIHN0cmluZ1xyXG5cdFx0Ly8gQHBhcmFtIGNhbGxiYWNrICBmdW5jdGlvblxyXG5cdFx0dGhpcy5vZmYgPSBmdW5jdGlvbihldnQsIGNhbGxiYWNrKSB7XHJcblxyXG5cdFx0XHR0aGlzLmZpbmRFdmVudHMoZXZ0LCBmdW5jdGlvbihuYW1lLCBpbmRleCkge1xyXG5cdFx0XHRcdGlmICghY2FsbGJhY2sgfHwgdGhpcy5ldmVudHNbbmFtZV1baW5kZXhdID09PSBjYWxsYmFjaykge1xyXG5cdFx0XHRcdFx0dGhpcy5ldmVudHNbbmFtZV1baW5kZXhdID0gbnVsbDtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdFx0cmV0dXJuIHRoaXM7XHJcblx0XHR9O1xyXG5cclxuXHRcdC8vIEVtaXRcclxuXHRcdC8vIFRyaWdnZXJzIGFueSBzdWJzY3JpYmVkIGV2ZW50c1xyXG5cdFx0dGhpcy5lbWl0ID0gZnVuY3Rpb24oZXZ0IC8qLCBkYXRhLCAuLi4gKi8pIHtcclxuXHJcblx0XHRcdC8vIEdldCBhcmd1bWVudHMgYXMgYW4gQXJyYXksIGtub2NrIG9mZiB0aGUgZmlyc3Qgb25lXHJcblx0XHRcdHZhciBhcmdzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKTtcclxuXHRcdFx0YXJncy5wdXNoKGV2dCk7XHJcblxyXG5cdFx0XHQvLyBIYW5kbGVyXHJcblx0XHRcdHZhciBoYW5kbGVyID0gZnVuY3Rpb24obmFtZSwgaW5kZXgpIHtcclxuXHJcblx0XHRcdFx0Ly8gUmVwbGFjZSB0aGUgbGFzdCBwcm9wZXJ0eSB3aXRoIHRoZSBldmVudCBuYW1lXHJcblx0XHRcdFx0YXJnc1thcmdzLmxlbmd0aCAtIDFdID0gKG5hbWUgPT09ICcqJyA/IGV2dCA6IG5hbWUpO1xyXG5cclxuXHRcdFx0XHQvLyBUcmlnZ2VyXHJcblx0XHRcdFx0dGhpcy5ldmVudHNbbmFtZV1baW5kZXhdLmFwcGx5KHRoaXMsIGFyZ3MpO1xyXG5cdFx0XHR9O1xyXG5cclxuXHRcdFx0Ly8gRmluZCB0aGUgY2FsbGJhY2tzIHdoaWNoIG1hdGNoIHRoZSBjb25kaXRpb24gYW5kIGNhbGxcclxuXHRcdFx0dmFyIF90aGlzID0gdGhpcztcclxuXHRcdFx0d2hpbGUgKF90aGlzICYmIF90aGlzLmZpbmRFdmVudHMpIHtcclxuXHJcblx0XHRcdFx0Ly8gRmluZCBldmVudHMgd2hpY2ggbWF0Y2hcclxuXHRcdFx0XHRfdGhpcy5maW5kRXZlbnRzKGV2dCArICcsKicsIGhhbmRsZXIpO1xyXG5cdFx0XHRcdF90aGlzID0gX3RoaXMucGFyZW50O1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRyZXR1cm4gdGhpcztcclxuXHRcdH07XHJcblxyXG5cdFx0Ly9cclxuXHRcdC8vIEVhc3kgZnVuY3Rpb25zXHJcblx0XHR0aGlzLmVtaXRBZnRlciA9IGZ1bmN0aW9uKCkge1xyXG5cdFx0XHR2YXIgX3RoaXMgPSB0aGlzO1xyXG5cdFx0XHR2YXIgYXJncyA9IGFyZ3VtZW50cztcclxuXHRcdFx0c2V0VGltZW91dChmdW5jdGlvbigpIHtcclxuXHRcdFx0XHRfdGhpcy5lbWl0LmFwcGx5KF90aGlzLCBhcmdzKTtcclxuXHRcdFx0fSwgMCk7XHJcblxyXG5cdFx0XHRyZXR1cm4gdGhpcztcclxuXHRcdH07XHJcblxyXG5cdFx0dGhpcy5maW5kRXZlbnRzID0gZnVuY3Rpb24oZXZ0LCBjYWxsYmFjaykge1xyXG5cclxuXHRcdFx0dmFyIGEgPSBldnQuc3BsaXQoc2VwYXJhdG9yKTtcclxuXHJcblx0XHRcdGZvciAodmFyIG5hbWUgaW4gdGhpcy5ldmVudHMpIHtpZiAodGhpcy5ldmVudHMuaGFzT3duUHJvcGVydHkobmFtZSkpIHtcclxuXHJcblx0XHRcdFx0aWYgKGEuaW5kZXhPZihuYW1lKSA+IC0xKSB7XHJcblxyXG5cdFx0XHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmV2ZW50c1tuYW1lXS5sZW5ndGg7IGkrKykge1xyXG5cclxuXHRcdFx0XHRcdFx0Ly8gRG9lcyB0aGUgZXZlbnQgaGFuZGxlciBleGlzdD9cclxuXHRcdFx0XHRcdFx0aWYgKHRoaXMuZXZlbnRzW25hbWVdW2ldKSB7XHJcblx0XHRcdFx0XHRcdFx0Ly8gRW1pdCBvbiB0aGUgbG9jYWwgaW5zdGFuY2Ugb2YgdGhpc1xyXG5cdFx0XHRcdFx0XHRcdGNhbGxiYWNrLmNhbGwodGhpcywgbmFtZSwgaSk7XHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XHJcblx0XHRcdH19XHJcblx0XHR9O1xyXG5cclxuXHRcdHJldHVybiB0aGlzO1xyXG5cdH0sXHJcblxyXG5cdC8vIEdsb2JhbCBFdmVudHNcclxuXHQvLyBBdHRhY2ggdGhlIGNhbGxiYWNrIHRvIHRoZSB3aW5kb3cgb2JqZWN0XHJcblx0Ly8gUmV0dXJuIGl0cyB1bmlxdWUgcmVmZXJlbmNlXHJcblx0Z2xvYmFsRXZlbnQ6IGZ1bmN0aW9uKGNhbGxiYWNrLCBndWlkKSB7XHJcblx0XHQvLyBJZiB0aGUgZ3VpZCBoYXMgbm90IGJlZW4gc3VwcGxpZWQgdGhlbiBjcmVhdGUgYSBuZXcgb25lLlxyXG5cdFx0Z3VpZCA9IGd1aWQgfHwgJ19oZWxsb2pzXycgKyBwYXJzZUludChNYXRoLnJhbmRvbSgpICogMWUxMiwgMTApLnRvU3RyaW5nKDM2KTtcclxuXHJcblx0XHQvLyBEZWZpbmUgdGhlIGNhbGxiYWNrIGZ1bmN0aW9uXHJcblx0XHR3aW5kb3dbZ3VpZF0gPSBmdW5jdGlvbigpIHtcclxuXHRcdFx0Ly8gVHJpZ2dlciB0aGUgY2FsbGJhY2tcclxuXHRcdFx0dHJ5IHtcclxuXHRcdFx0XHRpZiAoY2FsbGJhY2suYXBwbHkodGhpcywgYXJndW1lbnRzKSkge1xyXG5cdFx0XHRcdFx0ZGVsZXRlIHdpbmRvd1tndWlkXTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdFx0Y2F0Y2ggKGUpIHtcclxuXHRcdFx0XHRjb25zb2xlLmVycm9yKGUpO1xyXG5cdFx0XHR9XHJcblx0XHR9O1xyXG5cclxuXHRcdHJldHVybiBndWlkO1xyXG5cdH0sXHJcblxyXG5cdC8vIFRyaWdnZXIgYSBjbGllbnRzaWRlIHBvcHVwXHJcblx0Ly8gVGhpcyBoYXMgYmVlbiBhdWdtZW50ZWQgdG8gc3VwcG9ydCBQaG9uZUdhcFxyXG5cdHBvcHVwOiBmdW5jdGlvbih1cmwsIHJlZGlyZWN0VXJpLCBvcHRpb25zKSB7XHJcblxyXG5cdFx0dmFyIGRvY3VtZW50RWxlbWVudCA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudDtcclxuXHJcblx0XHQvLyBNdWx0aSBTY3JlZW4gUG9wdXAgUG9zaXRpb25pbmcgKGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9hLzE2ODYxMDUwKVxyXG5cdFx0Ly8gQ3JlZGl0OiBodHRwOi8vd3d3Lnh0Zi5kay8yMDExLzA4L2NlbnRlci1uZXctcG9wdXAtd2luZG93LWV2ZW4tb24uaHRtbFxyXG5cdFx0Ly8gRml4ZXMgZHVhbC1zY3JlZW4gcG9zaXRpb24gICAgICAgICAgICAgICAgICAgICAgICAgTW9zdCBicm93c2VycyAgICAgIEZpcmVmb3hcclxuXHJcblx0XHRpZiAob3B0aW9ucy5oZWlnaHQpIHtcclxuXHRcdFx0dmFyIGR1YWxTY3JlZW5Ub3AgPSB3aW5kb3cuc2NyZWVuVG9wICE9PSB1bmRlZmluZWQgPyB3aW5kb3cuc2NyZWVuVG9wIDogc2NyZWVuLnRvcDtcclxuXHRcdFx0dmFyIGhlaWdodCA9IHNjcmVlbi5oZWlnaHQgfHwgd2luZG93LmlubmVySGVpZ2h0IHx8IGRvY3VtZW50RWxlbWVudC5jbGllbnRIZWlnaHQ7XHJcblx0XHRcdG9wdGlvbnMudG9wID0gcGFyc2VJbnQoKGhlaWdodCAtIG9wdGlvbnMuaGVpZ2h0KSAvIDIsIDEwKSArIGR1YWxTY3JlZW5Ub3A7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKG9wdGlvbnMud2lkdGgpIHtcclxuXHRcdFx0dmFyIGR1YWxTY3JlZW5MZWZ0ID0gd2luZG93LnNjcmVlbkxlZnQgIT09IHVuZGVmaW5lZCA/IHdpbmRvdy5zY3JlZW5MZWZ0IDogc2NyZWVuLmxlZnQ7XHJcblx0XHRcdHZhciB3aWR0aCA9IHNjcmVlbi53aWR0aCB8fCB3aW5kb3cuaW5uZXJXaWR0aCB8fCBkb2N1bWVudEVsZW1lbnQuY2xpZW50V2lkdGg7XHJcblx0XHRcdG9wdGlvbnMubGVmdCA9IHBhcnNlSW50KCh3aWR0aCAtIG9wdGlvbnMud2lkdGgpIC8gMiwgMTApICsgZHVhbFNjcmVlbkxlZnQ7XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gQ29udmVydCBvcHRpb25zIGludG8gYW4gYXJyYXlcclxuXHRcdHZhciBvcHRpb25zQXJyYXkgPSBbXTtcclxuXHRcdE9iamVjdC5rZXlzKG9wdGlvbnMpLmZvckVhY2goZnVuY3Rpb24obmFtZSkge1xyXG5cdFx0XHR2YXIgdmFsdWUgPSBvcHRpb25zW25hbWVdO1xyXG5cdFx0XHRvcHRpb25zQXJyYXkucHVzaChuYW1lICsgKHZhbHVlICE9PSBudWxsID8gJz0nICsgdmFsdWUgOiAnJykpO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0Ly8gQ2FsbCB0aGUgb3BlbigpIGZ1bmN0aW9uIHdpdGggdGhlIGluaXRpYWwgcGF0aFxyXG5cdFx0Ly9cclxuXHRcdC8vIE9BdXRoIHJlZGlyZWN0LCBmaXhlcyBVUkkgZnJhZ21lbnRzIGZyb20gYmVpbmcgbG9zdCBpbiBTYWZhcmlcclxuXHRcdC8vIChVUkkgRnJhZ21lbnRzIHdpdGhpbiAzMDIgTG9jYXRpb24gVVJJIGFyZSBsb3N0IG92ZXIgSFRUUFMpXHJcblx0XHQvLyBMb2FkaW5nIHRoZSByZWRpcmVjdC5odG1sIGJlZm9yZSB0cmlnZ2VyaW5nIHRoZSBPQXV0aCBGbG93IHNlZW1zIHRvIGZpeCBpdC5cclxuXHRcdC8vXHJcblx0XHQvLyBGaXJlZm94ICBkZWNvZGVzIFVSTCBmcmFnbWVudHMgd2hlbiBjYWxsaW5nIGxvY2F0aW9uLmhhc2guXHJcblx0XHQvLyAgLSBUaGlzIGlzIGJhZCBpZiB0aGUgdmFsdWUgY29udGFpbnMgYnJlYWsgcG9pbnRzIHdoaWNoIGFyZSBlc2NhcGVkXHJcblx0XHQvLyAgLSBIZW5jZSB0aGUgdXJsIG11c3QgYmUgZW5jb2RlZCB0d2ljZSBhcyBpdCBjb250YWlucyBicmVha3BvaW50cy5cclxuXHRcdGlmIChuYXZpZ2F0b3IudXNlckFnZW50LmluZGV4T2YoJ1NhZmFyaScpICE9PSAtMSAmJiBuYXZpZ2F0b3IudXNlckFnZW50LmluZGV4T2YoJ0Nocm9tZScpID09PSAtMSkge1xyXG5cdFx0XHR1cmwgPSByZWRpcmVjdFVyaSArICcjb2F1dGhfcmVkaXJlY3Q9JyArIGVuY29kZVVSSUNvbXBvbmVudChlbmNvZGVVUklDb21wb25lbnQodXJsKSk7XHJcblx0XHR9XHJcblxyXG5cdFx0dmFyIHBvcHVwID0gd2luZG93Lm9wZW4oXHJcblx0XHRcdHVybCxcclxuXHRcdFx0J19ibGFuaycsXHJcblx0XHRcdG9wdGlvbnNBcnJheS5qb2luKCcsJylcclxuXHRcdCk7XHJcblxyXG5cdFx0aWYgKHBvcHVwICYmIHBvcHVwLmZvY3VzKSB7XHJcblx0XHRcdHBvcHVwLmZvY3VzKCk7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIHBvcHVwO1xyXG5cdH0sXHJcblxyXG5cdC8vIE9BdXRoIGFuZCBBUEkgcmVzcG9uc2UgaGFuZGxlclxyXG5cdHJlc3BvbnNlSGFuZGxlcjogZnVuY3Rpb24od2luZG93LCBwYXJlbnQpIHtcclxuXHJcblx0XHR2YXIgX3RoaXMgPSB0aGlzO1xyXG5cdFx0dmFyIHA7XHJcblx0XHR2YXIgbG9jYXRpb24gPSB3aW5kb3cubG9jYXRpb247XHJcblxyXG5cdFx0Ly8gSXMgdGhpcyBhbiBhdXRoIHJlbGF5IG1lc3NhZ2Ugd2hpY2ggbmVlZHMgdG8gY2FsbCB0aGUgcHJveHk/XHJcblx0XHRwID0gX3RoaXMucGFyYW0obG9jYXRpb24uc2VhcmNoKTtcclxuXHJcblx0XHQvLyBPQXV0aDIgb3IgT0F1dGgxIHNlcnZlciByZXNwb25zZT9cclxuXHRcdGlmIChwICYmIHAuc3RhdGUgJiYgKHAuY29kZSB8fCBwLm9hdXRoX3Rva2VuKSkge1xyXG5cclxuXHRcdFx0dmFyIHN0YXRlID0gSlNPTi5wYXJzZShwLnN0YXRlKTtcclxuXHJcblx0XHRcdC8vIEFkZCB0aGlzIHBhdGggYXMgdGhlIHJlZGlyZWN0X3VyaVxyXG5cdFx0XHRwLnJlZGlyZWN0X3VyaSA9IHN0YXRlLnJlZGlyZWN0X3VyaSB8fCBsb2NhdGlvbi5ocmVmLnJlcGxhY2UoL1tcXD9cXCNdLiokLywgJycpO1xyXG5cclxuXHRcdFx0Ly8gUmVkaXJlY3QgdG8gdGhlIGhvc3RcclxuXHRcdFx0dmFyIHBhdGggPSBzdGF0ZS5vYXV0aF9wcm94eSArICc/JyArIF90aGlzLnBhcmFtKHApO1xyXG5cclxuXHRcdFx0bG9jYXRpb24uYXNzaWduKHBhdGgpO1xyXG5cclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cclxuXHRcdC8vIFNhdmUgc2Vzc2lvbiwgZnJvbSByZWRpcmVjdGVkIGF1dGhlbnRpY2F0aW9uXHJcblx0XHQvLyAjYWNjZXNzX3Rva2VuIGhhcyBjb21lIGluP1xyXG5cdFx0Ly9cclxuXHRcdC8vIEZBQ0VCT09LIGlzIHJldHVybmluZyBhdXRoIGVycm9ycyB3aXRoaW4gYXMgYSBxdWVyeV9zdHJpbmcuLi4gdGhhdHMgYSBzdGlja2xlciBmb3IgY29uc2lzdGVuY3kuXHJcblx0XHQvLyBTb3VuZENsb3VkIGlzIHRoZSBzdGF0ZSBpbiB0aGUgcXVlcnlzdHJpbmcgYW5kIHRoZSB0b2tlbiBpbiB0aGUgaGFzaHRhZywgc28gd2UnbGwgbWl4IHRoZSB0d28gdG9nZXRoZXJcclxuXHJcblx0XHRwID0gX3RoaXMubWVyZ2UoX3RoaXMucGFyYW0obG9jYXRpb24uc2VhcmNoIHx8ICcnKSwgX3RoaXMucGFyYW0obG9jYXRpb24uaGFzaCB8fCAnJykpO1xyXG5cclxuXHRcdC8vIElmIHAuc3RhdGVcclxuXHRcdGlmIChwICYmICdzdGF0ZScgaW4gcCkge1xyXG5cclxuXHRcdFx0Ly8gUmVtb3ZlIGFueSBhZGRpdGlvbiBpbmZvcm1hdGlvblxyXG5cdFx0XHQvLyBFLmcuIHAuc3RhdGUgPSAnZmFjZWJvb2sucGFnZSc7XHJcblx0XHRcdHRyeSB7XHJcblx0XHRcdFx0dmFyIGEgPSBKU09OLnBhcnNlKHAuc3RhdGUpO1xyXG5cdFx0XHRcdF90aGlzLmV4dGVuZChwLCBhKTtcclxuXHRcdFx0fVxyXG5cdFx0XHRjYXRjaCAoZSkge1xyXG5cdFx0XHRcdGNvbnNvbGUuZXJyb3IoJ0NvdWxkIG5vdCBkZWNvZGUgc3RhdGUgcGFyYW1ldGVyJyk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdC8vIEFjY2Vzc190b2tlbj9cclxuXHRcdFx0aWYgKCgnYWNjZXNzX3Rva2VuJyBpbiBwICYmIHAuYWNjZXNzX3Rva2VuKSAmJiBwLm5ldHdvcmspIHtcclxuXHJcblx0XHRcdFx0aWYgKCFwLmV4cGlyZXNfaW4gfHwgcGFyc2VJbnQocC5leHBpcmVzX2luLCAxMCkgPT09IDApIHtcclxuXHRcdFx0XHRcdC8vIElmIHAuZXhwaXJlc19pbiBpcyB1bnNldCwgc2V0IHRvIDBcclxuXHRcdFx0XHRcdHAuZXhwaXJlc19pbiA9IDA7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRwLmV4cGlyZXNfaW4gPSBwYXJzZUludChwLmV4cGlyZXNfaW4sIDEwKTtcclxuXHRcdFx0XHRwLmV4cGlyZXMgPSAoKG5ldyBEYXRlKCkpLmdldFRpbWUoKSAvIDFlMykgKyAocC5leHBpcmVzX2luIHx8ICg2MCAqIDYwICogMjQgKiAzNjUpKTtcclxuXHJcblx0XHRcdFx0Ly8gTGV0cyB1c2UgdGhlIFwic3RhdGVcIiB0byBhc3NpZ24gaXQgdG8gb25lIG9mIG91ciBuZXR3b3Jrc1xyXG5cdFx0XHRcdGF1dGhDYWxsYmFjayhwLCB3aW5kb3csIHBhcmVudCk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdC8vIEVycm9yPT9cclxuXHRcdFx0Ly8gJmVycm9yX2Rlc2NyaXB0aW9uPT9cclxuXHRcdFx0Ly8gJnN0YXRlPT9cclxuXHRcdFx0ZWxzZSBpZiAoKCdlcnJvcicgaW4gcCAmJiBwLmVycm9yKSAmJiBwLm5ldHdvcmspIHtcclxuXHJcblx0XHRcdFx0cC5lcnJvciA9IHtcclxuXHRcdFx0XHRcdGNvZGU6IHAuZXJyb3IsXHJcblx0XHRcdFx0XHRtZXNzYWdlOiBwLmVycm9yX21lc3NhZ2UgfHwgcC5lcnJvcl9kZXNjcmlwdGlvblxyXG5cdFx0XHRcdH07XHJcblxyXG5cdFx0XHRcdC8vIExldCB0aGUgc3RhdGUgaGFuZGxlciBoYW5kbGUgaXRcclxuXHRcdFx0XHRhdXRoQ2FsbGJhY2socCwgd2luZG93LCBwYXJlbnQpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQvLyBBUEkgY2FsbCwgb3IgYSBjYW5jZWxsZWQgbG9naW5cclxuXHRcdFx0Ly8gUmVzdWx0IGlzIHNlcmlhbGl6ZWQgSlNPTiBzdHJpbmdcclxuXHRcdFx0ZWxzZSBpZiAocC5jYWxsYmFjayAmJiBwLmNhbGxiYWNrIGluIHBhcmVudCkge1xyXG5cclxuXHRcdFx0XHQvLyBUcmlnZ2VyIGEgZnVuY3Rpb24gaW4gdGhlIHBhcmVudFxyXG5cdFx0XHRcdHZhciByZXMgPSAncmVzdWx0JyBpbiBwICYmIHAucmVzdWx0ID8gSlNPTi5wYXJzZShwLnJlc3VsdCkgOiBmYWxzZTtcclxuXHJcblx0XHRcdFx0Ly8gVHJpZ2dlciB0aGUgY2FsbGJhY2sgb24gdGhlIHBhcmVudFxyXG5cdFx0XHRcdGNhbGxiYWNrKHBhcmVudCwgcC5jYWxsYmFjaykocmVzKTtcclxuXHRcdFx0XHRjbG9zZVdpbmRvdygpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQvLyBJZiB0aGlzIHBhZ2UgaXMgc3RpbGwgb3BlblxyXG5cdFx0XHRpZiAocC5wYWdlX3VyaSkge1xyXG5cdFx0XHRcdGxvY2F0aW9uLmFzc2lnbihwLnBhZ2VfdXJpKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdC8vIE9BdXRoIHJlZGlyZWN0LCBmaXhlcyBVUkkgZnJhZ21lbnRzIGZyb20gYmVpbmcgbG9zdCBpbiBTYWZhcmlcclxuXHRcdC8vIChVUkkgRnJhZ21lbnRzIHdpdGhpbiAzMDIgTG9jYXRpb24gVVJJIGFyZSBsb3N0IG92ZXIgSFRUUFMpXHJcblx0XHQvLyBMb2FkaW5nIHRoZSByZWRpcmVjdC5odG1sIGJlZm9yZSB0cmlnZ2VyaW5nIHRoZSBPQXV0aCBGbG93IHNlZW1zIHRvIGZpeCBpdC5cclxuXHRcdGVsc2UgaWYgKCdvYXV0aF9yZWRpcmVjdCcgaW4gcCkge1xyXG5cclxuXHRcdFx0bG9jYXRpb24uYXNzaWduKGRlY29kZVVSSUNvbXBvbmVudChwLm9hdXRoX3JlZGlyZWN0KSk7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHJcblx0XHQvLyBUcmlnZ2VyIGEgY2FsbGJhY2sgdG8gYXV0aGVudGljYXRlXHJcblx0XHRmdW5jdGlvbiBhdXRoQ2FsbGJhY2sob2JqLCB3aW5kb3csIHBhcmVudCkge1xyXG5cclxuXHRcdFx0dmFyIGNiID0gb2JqLmNhbGxiYWNrO1xyXG5cdFx0XHR2YXIgbmV0d29yayA9IG9iai5uZXR3b3JrO1xyXG5cclxuXHRcdFx0Ly8gVHJpZ2dlciB0aGUgY2FsbGJhY2sgb24gdGhlIHBhcmVudFxyXG5cdFx0XHRfdGhpcy5zdG9yZShuZXR3b3JrLCBvYmopO1xyXG5cclxuXHRcdFx0Ly8gSWYgdGhpcyBpcyBhIHBhZ2UgcmVxdWVzdCBpdCBoYXMgbm8gcGFyZW50IG9yIG9wZW5lciB3aW5kb3cgdG8gaGFuZGxlIGNhbGxiYWNrc1xyXG5cdFx0XHRpZiAoKCdkaXNwbGF5JyBpbiBvYmopICYmIG9iai5kaXNwbGF5ID09PSAncGFnZScpIHtcclxuXHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdC8vIFJlbW92ZSBmcm9tIHNlc3Npb24gb2JqZWN0XHJcblx0XHRcdGlmIChwYXJlbnQgJiYgY2IgJiYgY2IgaW4gcGFyZW50KSB7XHJcblxyXG5cdFx0XHRcdHRyeSB7XHJcblx0XHRcdFx0XHRkZWxldGUgb2JqLmNhbGxiYWNrO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRjYXRjaCAoZSkge31cclxuXHJcblx0XHRcdFx0Ly8gVXBkYXRlIHN0b3JlXHJcblx0XHRcdFx0X3RoaXMuc3RvcmUobmV0d29yaywgb2JqKTtcclxuXHJcblx0XHRcdFx0Ly8gQ2FsbCB0aGUgZ2xvYmFsRXZlbnQgZnVuY3Rpb24gb24gdGhlIHBhcmVudFxyXG5cdFx0XHRcdC8vIEl0J3Mgc2FmZXIgdG8gcGFzcyBiYWNrIGEgc3RyaW5nIHRvIHRoZSBwYXJlbnQsXHJcblx0XHRcdFx0Ly8gUmF0aGVyIHRoYW4gYW4gb2JqZWN0L2FycmF5IChiZXR0ZXIgZm9yIElFOClcclxuXHRcdFx0XHR2YXIgc3RyID0gSlNPTi5zdHJpbmdpZnkob2JqKTtcclxuXHJcblx0XHRcdFx0dHJ5IHtcclxuXHRcdFx0XHRcdGNhbGxiYWNrKHBhcmVudCwgY2IpKHN0cik7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdGNhdGNoIChlKSB7XHJcblx0XHRcdFx0XHQvLyBFcnJvciB0aHJvd24gd2hpbHN0IGV4ZWN1dGluZyBwYXJlbnQgY2FsbGJhY2tcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGNsb3NlV2luZG93KCk7XHJcblx0XHR9XHJcblxyXG5cdFx0ZnVuY3Rpb24gY2FsbGJhY2socGFyZW50LCBjYWxsYmFja0lEKSB7XHJcblx0XHRcdGlmIChjYWxsYmFja0lELmluZGV4T2YoJ19oZWxsb2pzXycpICE9PSAwKSB7XHJcblx0XHRcdFx0cmV0dXJuIGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdFx0dGhyb3cgJ0NvdWxkIG5vdCBleGVjdXRlIGNhbGxiYWNrICcgKyBjYWxsYmFja0lEO1xyXG5cdFx0XHRcdH07XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHJldHVybiBwYXJlbnRbY2FsbGJhY2tJRF07XHJcblx0XHR9XHJcblxyXG5cdFx0ZnVuY3Rpb24gY2xvc2VXaW5kb3coKSB7XHJcblxyXG5cdFx0XHRpZiAod2luZG93LmZyYW1lRWxlbWVudCkge1xyXG5cdFx0XHRcdC8vIEluc2lkZSBhbiBpZnJhbWUsIHJlbW92ZSBmcm9tIHBhcmVudFxyXG5cdFx0XHRcdHBhcmVudC5kb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKHdpbmRvdy5mcmFtZUVsZW1lbnQpO1xyXG5cdFx0XHR9XHJcblx0XHRcdGVsc2Uge1xyXG5cdFx0XHRcdC8vIENsb3NlIHRoaXMgY3VycmVudCB3aW5kb3dcclxuXHRcdFx0XHR0cnkge1xyXG5cdFx0XHRcdFx0d2luZG93LmNsb3NlKCk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdGNhdGNoIChlKSB7fVxyXG5cclxuXHRcdFx0XHQvLyBJT1MgYnVnIHdvbnQgbGV0IHVzIGNsb3NlIGEgcG9wdXAgaWYgc3RpbGwgbG9hZGluZ1xyXG5cdFx0XHRcdGlmICh3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcikge1xyXG5cdFx0XHRcdFx0d2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCBmdW5jdGlvbigpIHtcclxuXHRcdFx0XHRcdFx0d2luZG93LmNsb3NlKCk7XHJcblx0XHRcdFx0XHR9KTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHJcblx0XHR9XHJcblx0fVxyXG59KTtcclxuXHJcbi8vIEV2ZW50c1xyXG4vLyBFeHRlbmQgdGhlIGhlbGxvIG9iamVjdCB3aXRoIGl0cyBvd24gZXZlbnQgaW5zdGFuY2VcclxuaGVsbG8udXRpbHMuRXZlbnQuY2FsbChoZWxsbyk7XHJcblxyXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG4vLyBNb25pdG9yaW5nIHNlc3Npb24gc3RhdGVcclxuLy8gQ2hlY2sgZm9yIHNlc3Npb24gY2hhbmdlc1xyXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG5cclxuKGZ1bmN0aW9uKGhlbGxvKSB7XHJcblxyXG5cdC8vIE1vbml0b3IgZm9yIGEgY2hhbmdlIGluIHN0YXRlIGFuZCBmaXJlXHJcblx0dmFyIG9sZFNlc3Npb25zID0ge307XHJcblxyXG5cdC8vIEhhc2ggb2YgZXhwaXJlZCB0b2tlbnNcclxuXHR2YXIgZXhwaXJlZCA9IHt9O1xyXG5cclxuXHQvLyBMaXN0ZW4gdG8gb3RoZXIgdHJpZ2dlcnMgdG8gQXV0aCBldmVudHMsIHVzZSB0aGVzZSB0byB1cGRhdGUgdGhpc1xyXG5cdGhlbGxvLm9uKCdhdXRoLmxvZ2luLCBhdXRoLmxvZ291dCcsIGZ1bmN0aW9uKGF1dGgpIHtcclxuXHRcdGlmIChhdXRoICYmIHR5cGVvZiAoYXV0aCkgPT09ICdvYmplY3QnICYmIGF1dGgubmV0d29yaykge1xyXG5cdFx0XHRvbGRTZXNzaW9uc1thdXRoLm5ldHdvcmtdID0gaGVsbG8udXRpbHMuc3RvcmUoYXV0aC5uZXR3b3JrKSB8fCB7fTtcclxuXHRcdH1cclxuXHR9KTtcclxuXHJcblx0KGZ1bmN0aW9uIHNlbGYoKSB7XHJcblxyXG5cdFx0dmFyIENVUlJFTlRfVElNRSA9ICgobmV3IERhdGUoKSkuZ2V0VGltZSgpIC8gMWUzKTtcclxuXHRcdHZhciBlbWl0ID0gZnVuY3Rpb24oZXZlbnROYW1lKSB7XHJcblx0XHRcdGhlbGxvLmVtaXQoJ2F1dGguJyArIGV2ZW50TmFtZSwge1xyXG5cdFx0XHRcdG5ldHdvcms6IG5hbWUsXHJcblx0XHRcdFx0YXV0aFJlc3BvbnNlOiBzZXNzaW9uXHJcblx0XHRcdH0pO1xyXG5cdFx0fTtcclxuXHJcblx0XHQvLyBMb29wIHRocm91Z2ggdGhlIHNlcnZpY2VzXHJcblx0XHRmb3IgKHZhciBuYW1lIGluIGhlbGxvLnNlcnZpY2VzKSB7aWYgKGhlbGxvLnNlcnZpY2VzLmhhc093blByb3BlcnR5KG5hbWUpKSB7XHJcblxyXG5cdFx0XHRpZiAoIWhlbGxvLnNlcnZpY2VzW25hbWVdLmlkKSB7XHJcblx0XHRcdFx0Ly8gV2UgaGF2ZW4ndCBhdHRhY2hlZCBhbiBJRCBzbyBkb250IGxpc3Rlbi5cclxuXHRcdFx0XHRjb250aW51ZTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0Ly8gR2V0IHNlc3Npb25cclxuXHRcdFx0dmFyIHNlc3Npb24gPSBoZWxsby51dGlscy5zdG9yZShuYW1lKSB8fCB7fTtcclxuXHRcdFx0dmFyIHByb3ZpZGVyID0gaGVsbG8uc2VydmljZXNbbmFtZV07XHJcblx0XHRcdHZhciBvbGRTZXNzID0gb2xkU2Vzc2lvbnNbbmFtZV0gfHwge307XHJcblxyXG5cdFx0XHQvLyBMaXN0ZW4gZm9yIGdsb2JhbEV2ZW50cyB0aGF0IGRpZCBub3QgZ2V0IHRyaWdnZXJlZCBmcm9tIHRoZSBjaGlsZFxyXG5cdFx0XHRpZiAoc2Vzc2lvbiAmJiAnY2FsbGJhY2snIGluIHNlc3Npb24pIHtcclxuXHJcblx0XHRcdFx0Ly8gVG8gZG8gcmVtb3ZlIGZyb20gc2Vzc2lvbiBvYmplY3QuLi5cclxuXHRcdFx0XHR2YXIgY2IgPSBzZXNzaW9uLmNhbGxiYWNrO1xyXG5cdFx0XHRcdHRyeSB7XHJcblx0XHRcdFx0XHRkZWxldGUgc2Vzc2lvbi5jYWxsYmFjaztcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0Y2F0Y2ggKGUpIHt9XHJcblxyXG5cdFx0XHRcdC8vIFVwZGF0ZSBzdG9yZVxyXG5cdFx0XHRcdC8vIFJlbW92aW5nIHRoZSBjYWxsYmFja1xyXG5cdFx0XHRcdGhlbGxvLnV0aWxzLnN0b3JlKG5hbWUsIHNlc3Npb24pO1xyXG5cclxuXHRcdFx0XHQvLyBFbWl0IGdsb2JhbCBldmVudHNcclxuXHRcdFx0XHR0cnkge1xyXG5cdFx0XHRcdFx0d2luZG93W2NiXShzZXNzaW9uKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0Y2F0Y2ggKGUpIHt9XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdC8vIFJlZnJlc2ggdG9rZW5cclxuXHRcdFx0aWYgKHNlc3Npb24gJiYgKCdleHBpcmVzJyBpbiBzZXNzaW9uKSAmJiBzZXNzaW9uLmV4cGlyZXMgPCBDVVJSRU5UX1RJTUUpIHtcclxuXHJcblx0XHRcdFx0Ly8gSWYgYXV0byByZWZyZXNoIGlzIHBvc3NpYmxlXHJcblx0XHRcdFx0Ly8gRWl0aGVyIHRoZSBicm93c2VyIHN1cHBvcnRzXHJcblx0XHRcdFx0dmFyIHJlZnJlc2ggPSBwcm92aWRlci5yZWZyZXNoIHx8IHNlc3Npb24ucmVmcmVzaF90b2tlbjtcclxuXHJcblx0XHRcdFx0Ly8gSGFzIHRoZSByZWZyZXNoIGJlZW4gcnVuIHJlY2VudGx5P1xyXG5cdFx0XHRcdGlmIChyZWZyZXNoICYmICghKG5hbWUgaW4gZXhwaXJlZCkgfHwgZXhwaXJlZFtuYW1lXSA8IENVUlJFTlRfVElNRSkpIHtcclxuXHRcdFx0XHRcdC8vIFRyeSB0byByZXNpZ25pblxyXG5cdFx0XHRcdFx0aGVsbG8uZW1pdCgnbm90aWNlJywgbmFtZSArICcgaGFzIGV4cGlyZWQgdHJ5aW5nIHRvIHJlc2lnbmluJyk7XHJcblx0XHRcdFx0XHRoZWxsby5sb2dpbihuYW1lLCB7ZGlzcGxheTogJ25vbmUnLCBmb3JjZTogZmFsc2V9KTtcclxuXHJcblx0XHRcdFx0XHQvLyBVcGRhdGUgZXhwaXJlZCwgZXZlcnkgMTAgbWludXRlc1xyXG5cdFx0XHRcdFx0ZXhwaXJlZFtuYW1lXSA9IENVUlJFTlRfVElNRSArIDYwMDtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdC8vIERvZXMgdGhpcyBwcm92aWRlciBub3Qgc3VwcG9ydCByZWZyZXNoXHJcblx0XHRcdFx0ZWxzZSBpZiAoIXJlZnJlc2ggJiYgIShuYW1lIGluIGV4cGlyZWQpKSB7XHJcblx0XHRcdFx0XHQvLyBMYWJlbCB0aGUgZXZlbnRcclxuXHRcdFx0XHRcdGVtaXQoJ2V4cGlyZWQnKTtcclxuXHRcdFx0XHRcdGV4cGlyZWRbbmFtZV0gPSB0cnVlO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0Ly8gSWYgc2Vzc2lvbiBoYXMgZXhwaXJlZCB0aGVuIHdlIGRvbnQgd2FudCB0byBzdG9yZSBpdHMgdmFsdWUgdW50aWwgaXQgY2FuIGJlIGVzdGFibGlzaGVkIHRoYXQgaXRzIGJlZW4gdXBkYXRlZFxyXG5cdFx0XHRcdGNvbnRpbnVlO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQvLyBIYXMgc2Vzc2lvbiBjaGFuZ2VkP1xyXG5cdFx0XHRlbHNlIGlmIChvbGRTZXNzLmFjY2Vzc190b2tlbiA9PT0gc2Vzc2lvbi5hY2Nlc3NfdG9rZW4gJiZcclxuXHRcdFx0b2xkU2Vzcy5leHBpcmVzID09PSBzZXNzaW9uLmV4cGlyZXMpIHtcclxuXHRcdFx0XHRjb250aW51ZTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0Ly8gQWNjZXNzX3Rva2VuIGhhcyBiZWVuIHJlbW92ZWRcclxuXHRcdFx0ZWxzZSBpZiAoIXNlc3Npb24uYWNjZXNzX3Rva2VuICYmIG9sZFNlc3MuYWNjZXNzX3Rva2VuKSB7XHJcblx0XHRcdFx0ZW1pdCgnbG9nb3V0Jyk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdC8vIEFjY2Vzc190b2tlbiBoYXMgYmVlbiBjcmVhdGVkXHJcblx0XHRcdGVsc2UgaWYgKHNlc3Npb24uYWNjZXNzX3Rva2VuICYmICFvbGRTZXNzLmFjY2Vzc190b2tlbikge1xyXG5cdFx0XHRcdGVtaXQoJ2xvZ2luJyk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdC8vIEFjY2Vzc190b2tlbiBoYXMgYmVlbiB1cGRhdGVkXHJcblx0XHRcdGVsc2UgaWYgKHNlc3Npb24uZXhwaXJlcyAhPT0gb2xkU2Vzcy5leHBpcmVzKSB7XHJcblx0XHRcdFx0ZW1pdCgndXBkYXRlJyk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdC8vIFVwZGF0ZWQgc3RvcmVkIHNlc3Npb25cclxuXHRcdFx0b2xkU2Vzc2lvbnNbbmFtZV0gPSBzZXNzaW9uO1xyXG5cclxuXHRcdFx0Ly8gUmVtb3ZlIHRoZSBleHBpcmVkIGZsYWdzXHJcblx0XHRcdGlmIChuYW1lIGluIGV4cGlyZWQpIHtcclxuXHRcdFx0XHRkZWxldGUgZXhwaXJlZFtuYW1lXTtcclxuXHRcdFx0fVxyXG5cdFx0fX1cclxuXHJcblx0XHQvLyBDaGVjayBlcnJvciBldmVudHNcclxuXHRcdHNldFRpbWVvdXQoc2VsZiwgMTAwMCk7XHJcblx0fSkoKTtcclxuXHJcbn0pKGhlbGxvKTtcclxuXHJcbi8vIEVPRiBDT1JFIGxpYlxyXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcblxyXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG4vLyBBUElcclxuLy8gQHBhcmFtIHBhdGggICAgc3RyaW5nXHJcbi8vIEBwYXJhbSBxdWVyeSAgIG9iamVjdCAob3B0aW9uYWwpXHJcbi8vIEBwYXJhbSBtZXRob2QgIHN0cmluZyAob3B0aW9uYWwpXHJcbi8vIEBwYXJhbSBkYXRhICAgIG9iamVjdCAob3B0aW9uYWwpXHJcbi8vIEBwYXJhbSB0aW1lb3V0IGludGVnZXIgKG9wdGlvbmFsKVxyXG4vLyBAcGFyYW0gY2FsbGJhY2sgIGZ1bmN0aW9uIChvcHRpb25hbClcclxuXHJcbmhlbGxvLmFwaSA9IGZ1bmN0aW9uKCkge1xyXG5cclxuXHQvLyBTaG9ydGhhbmRcclxuXHR2YXIgX3RoaXMgPSB0aGlzO1xyXG5cdHZhciB1dGlscyA9IF90aGlzLnV0aWxzO1xyXG5cdHZhciBlcnJvciA9IHV0aWxzLmVycm9yO1xyXG5cclxuXHQvLyBDb25zdHJ1Y3QgYSBuZXcgUHJvbWlzZSBvYmplY3RcclxuXHR2YXIgcHJvbWlzZSA9IHV0aWxzLlByb21pc2UoKTtcclxuXHJcblx0Ly8gQXJndW1lbnRzXHJcblx0dmFyIHAgPSB1dGlscy5hcmdzKHtwYXRoOiAncyEnLCBxdWVyeTogJ28nLCBtZXRob2Q6ICdzJywgZGF0YTogJ28nLCB0aW1lb3V0OiAnaScsIGNhbGxiYWNrOiAnZid9LCBhcmd1bWVudHMpO1xyXG5cclxuXHQvLyBNZXRob2RcclxuXHRwLm1ldGhvZCA9IChwLm1ldGhvZCB8fCAnZ2V0JykudG9Mb3dlckNhc2UoKTtcclxuXHJcblx0Ly8gSGVhZGVyc1xyXG5cdHAuaGVhZGVycyA9IHAuaGVhZGVycyB8fCB7fTtcclxuXHJcblx0Ly8gUXVlcnlcclxuXHRwLnF1ZXJ5ID0gcC5xdWVyeSB8fCB7fTtcclxuXHJcblx0Ly8gSWYgZ2V0LCBwdXQgYWxsIHBhcmFtZXRlcnMgaW50byBxdWVyeVxyXG5cdGlmIChwLm1ldGhvZCA9PT0gJ2dldCcgfHwgcC5tZXRob2QgPT09ICdkZWxldGUnKSB7XHJcblx0XHR1dGlscy5leHRlbmQocC5xdWVyeSwgcC5kYXRhKTtcclxuXHRcdHAuZGF0YSA9IHt9O1xyXG5cdH1cclxuXHJcblx0dmFyIGRhdGEgPSBwLmRhdGEgPSBwLmRhdGEgfHwge307XHJcblxyXG5cdC8vIENvbXBsZXRlZCBldmVudCBjYWxsYmFja1xyXG5cdHByb21pc2UudGhlbihwLmNhbGxiYWNrLCBwLmNhbGxiYWNrKTtcclxuXHJcblx0Ly8gUmVtb3ZlIHRoZSBuZXR3b3JrIGZyb20gcGF0aCwgZS5nLiBmYWNlYm9vazovbWUvZnJpZW5kc1xyXG5cdC8vIFJlc3VsdHMgaW4geyBuZXR3b3JrIDogZmFjZWJvb2ssIHBhdGggOiBtZS9mcmllbmRzIH1cclxuXHRpZiAoIXAucGF0aCkge1xyXG5cdFx0cmV0dXJuIHByb21pc2UucmVqZWN0KGVycm9yKCdpbnZhbGlkX3BhdGgnLCAnTWlzc2luZyB0aGUgcGF0aCBwYXJhbWV0ZXIgZnJvbSB0aGUgcmVxdWVzdCcpKTtcclxuXHR9XHJcblxyXG5cdHAucGF0aCA9IHAucGF0aC5yZXBsYWNlKC9eXFwvKy8sICcnKTtcclxuXHR2YXIgYSA9IChwLnBhdGguc3BsaXQoL1tcXC9cXDpdLywgMikgfHwgW10pWzBdLnRvTG93ZXJDYXNlKCk7XHJcblxyXG5cdGlmIChhIGluIF90aGlzLnNlcnZpY2VzKSB7XHJcblx0XHRwLm5ldHdvcmsgPSBhO1xyXG5cdFx0dmFyIHJlZyA9IG5ldyBSZWdFeHAoJ14nICsgYSArICc6P1xcLz8nKTtcclxuXHRcdHAucGF0aCA9IHAucGF0aC5yZXBsYWNlKHJlZywgJycpO1xyXG5cdH1cclxuXHJcblx0Ly8gTmV0d29yayAmIFByb3ZpZGVyXHJcblx0Ly8gRGVmaW5lIHRoZSBuZXR3b3JrIHRoYXQgdGhpcyByZXF1ZXN0IGlzIG1hZGUgZm9yXHJcblx0cC5uZXR3b3JrID0gX3RoaXMuc2V0dGluZ3MuZGVmYXVsdF9zZXJ2aWNlID0gcC5uZXR3b3JrIHx8IF90aGlzLnNldHRpbmdzLmRlZmF1bHRfc2VydmljZTtcclxuXHR2YXIgbyA9IF90aGlzLnNlcnZpY2VzW3AubmV0d29ya107XHJcblxyXG5cdC8vIElOVkFMSURcclxuXHQvLyBJcyB0aGVyZSBubyBzZXJ2aWNlIGJ5IHRoZSBnaXZlbiBuZXR3b3JrIG5hbWU/XHJcblx0aWYgKCFvKSB7XHJcblx0XHRyZXR1cm4gcHJvbWlzZS5yZWplY3QoZXJyb3IoJ2ludmFsaWRfbmV0d29yaycsICdDb3VsZCBub3QgbWF0Y2ggdGhlIHNlcnZpY2UgcmVxdWVzdGVkOiAnICsgcC5uZXR3b3JrKSk7XHJcblx0fVxyXG5cclxuXHQvLyBQQVRIXHJcblx0Ly8gQXMgbG9uZyBhcyB0aGUgcGF0aCBpc24ndCBmbGFnZ2VkIGFzIHVuYXZhaWFibGUsIGUuZy4gcGF0aCA9PSBmYWxzZVxyXG5cclxuXHRpZiAoISghKHAubWV0aG9kIGluIG8pIHx8ICEocC5wYXRoIGluIG9bcC5tZXRob2RdKSB8fCBvW3AubWV0aG9kXVtwLnBhdGhdICE9PSBmYWxzZSkpIHtcclxuXHRcdHJldHVybiBwcm9taXNlLnJlamVjdChlcnJvcignaW52YWxpZF9wYXRoJywgJ1RoZSBwcm92aWRlZCBwYXRoIGlzIG5vdCBhdmFpbGFibGUgb24gdGhlIHNlbGVjdGVkIG5ldHdvcmsnKSk7XHJcblx0fVxyXG5cclxuXHQvLyBQUk9YWVxyXG5cdC8vIE9BdXRoMSBjYWxscyBhbHdheXMgbmVlZCBhIHByb3h5XHJcblxyXG5cdGlmICghcC5vYXV0aF9wcm94eSkge1xyXG5cdFx0cC5vYXV0aF9wcm94eSA9IF90aGlzLnNldHRpbmdzLm9hdXRoX3Byb3h5O1xyXG5cdH1cclxuXHJcblx0aWYgKCEoJ3Byb3h5JyBpbiBwKSkge1xyXG5cdFx0cC5wcm94eSA9IHAub2F1dGhfcHJveHkgJiYgby5vYXV0aCAmJiBwYXJzZUludChvLm9hdXRoLnZlcnNpb24sIDEwKSA9PT0gMTtcclxuXHR9XHJcblxyXG5cdC8vIFRJTUVPVVRcclxuXHQvLyBBZG9wdCB0aW1lb3V0IGZyb20gZ2xvYmFsIHNldHRpbmdzIGJ5IGRlZmF1bHRcclxuXHJcblx0aWYgKCEoJ3RpbWVvdXQnIGluIHApKSB7XHJcblx0XHRwLnRpbWVvdXQgPSBfdGhpcy5zZXR0aW5ncy50aW1lb3V0O1xyXG5cdH1cclxuXHJcblx0Ly8gRm9ybWF0IHJlc3BvbnNlXHJcblx0Ly8gV2hldGhlciB0byBydW4gdGhlIHJhdyByZXNwb25zZSB0aHJvdWdoIHBvc3QgcHJvY2Vzc2luZy5cclxuXHRpZiAoISgnZm9ybWF0UmVzcG9uc2UnIGluIHApKSB7XHJcblx0XHRwLmZvcm1hdFJlc3BvbnNlID0gdHJ1ZTtcclxuXHR9XHJcblxyXG5cdC8vIEdldCB0aGUgY3VycmVudCBzZXNzaW9uXHJcblx0Ly8gQXBwZW5kIHRoZSBhY2Nlc3NfdG9rZW4gdG8gdGhlIHF1ZXJ5XHJcblx0cC5hdXRoUmVzcG9uc2UgPSBfdGhpcy5nZXRBdXRoUmVzcG9uc2UocC5uZXR3b3JrKTtcclxuXHRpZiAocC5hdXRoUmVzcG9uc2UgJiYgcC5hdXRoUmVzcG9uc2UuYWNjZXNzX3Rva2VuKSB7XHJcblx0XHRwLnF1ZXJ5LmFjY2Vzc190b2tlbiA9IHAuYXV0aFJlc3BvbnNlLmFjY2Vzc190b2tlbjtcclxuXHR9XHJcblxyXG5cdHZhciB1cmwgPSBwLnBhdGg7XHJcblx0dmFyIG07XHJcblxyXG5cdC8vIFN0b3JlIHRoZSBxdWVyeSBhcyBvcHRpb25zXHJcblx0Ly8gVGhpcyBpcyB1c2VkIHRvIHBvcHVsYXRlIHRoZSByZXF1ZXN0IG9iamVjdCBiZWZvcmUgdGhlIGRhdGEgaXMgYXVnbWVudGVkIGJ5IHRoZSBwcmV3cmFwIGhhbmRsZXJzLlxyXG5cdHAub3B0aW9ucyA9IHV0aWxzLmNsb25lKHAucXVlcnkpO1xyXG5cclxuXHQvLyBDbG9uZSB0aGUgZGF0YSBvYmplY3RcclxuXHQvLyBQcmV2ZW50IHRoaXMgc2NyaXB0IG92ZXJ3cml0aW5nIHRoZSBkYXRhIG9mIHRoZSBpbmNvbWluZyBvYmplY3QuXHJcblx0Ly8gRW5zdXJlIHRoYXQgZXZlcnl0aW1lIHdlIHJ1biBhbiBpdGVyYXRpb24gdGhlIGNhbGxiYWNrcyBoYXZlbid0IHJlbW92ZWQgc29tZSBkYXRhXHJcblx0cC5kYXRhID0gdXRpbHMuY2xvbmUoZGF0YSk7XHJcblxyXG5cdC8vIFVSTCBNYXBwaW5nXHJcblx0Ly8gSXMgdGhlcmUgYSBtYXAgZm9yIHRoZSBnaXZlbiBVUkw/XHJcblx0dmFyIGFjdGlvbnMgPSBvW3snZGVsZXRlJzogJ2RlbCd9W3AubWV0aG9kXSB8fCBwLm1ldGhvZF0gfHwge307XHJcblxyXG5cdC8vIEV4dHJhcG9sYXRlIHRoZSBRdWVyeVN0cmluZ1xyXG5cdC8vIFByb3ZpZGUgYSBjbGVhbiBwYXRoXHJcblx0Ly8gTW92ZSB0aGUgcXVlcnlzdHJpbmcgaW50byB0aGUgZGF0YVxyXG5cdGlmIChwLm1ldGhvZCA9PT0gJ2dldCcpIHtcclxuXHJcblx0XHR2YXIgcXVlcnkgPSB1cmwuc3BsaXQoL1tcXD8jXS8pWzFdO1xyXG5cdFx0aWYgKHF1ZXJ5KSB7XHJcblx0XHRcdHV0aWxzLmV4dGVuZChwLnF1ZXJ5LCB1dGlscy5wYXJhbShxdWVyeSkpO1xyXG5cclxuXHRcdFx0Ly8gUmVtb3ZlIHRoZSBxdWVyeSBwYXJ0IGZyb20gdGhlIFVSTFxyXG5cdFx0XHR1cmwgPSB1cmwucmVwbGFjZSgvXFw/Lio/KCN8JCkvLCAnJDEnKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdC8vIElzIHRoZSBoYXNoIGZyYWdtZW50IGRlZmluZWRcclxuXHRpZiAoKG0gPSB1cmwubWF0Y2goLyMoLispLywgJycpKSkge1xyXG5cdFx0dXJsID0gdXJsLnNwbGl0KCcjJylbMF07XHJcblx0XHRwLnBhdGggPSBtWzFdO1xyXG5cdH1cclxuXHRlbHNlIGlmICh1cmwgaW4gYWN0aW9ucykge1xyXG5cdFx0cC5wYXRoID0gdXJsO1xyXG5cdFx0dXJsID0gYWN0aW9uc1t1cmxdO1xyXG5cdH1cclxuXHRlbHNlIGlmICgnZGVmYXVsdCcgaW4gYWN0aW9ucykge1xyXG5cdFx0dXJsID0gYWN0aW9uc1snZGVmYXVsdCddO1xyXG5cdH1cclxuXHJcblx0Ly8gUmVkaXJlY3QgSGFuZGxlclxyXG5cdC8vIFRoaXMgZGVmaW5lcyBmb3IgdGhlIEZvcm0rSWZyYW1lK0hhc2ggaGFjayB3aGVyZSB0byByZXR1cm4gdGhlIHJlc3VsdHMgdG9vLlxyXG5cdHAucmVkaXJlY3RfdXJpID0gX3RoaXMuc2V0dGluZ3MucmVkaXJlY3RfdXJpO1xyXG5cclxuXHQvLyBEZWZpbmUgRm9ybWF0SGFuZGxlclxyXG5cdC8vIFRoZSByZXF1ZXN0IGNhbiBiZSBwcm9jZXNlZCBpbiBhIG11bHRpdHVkZSBvZiB3YXlzXHJcblx0Ly8gSGVyZSdzIHRoZSBvcHRpb25zIC0gZGVwZW5kaW5nIG9uIHRoZSBicm93c2VyIGFuZCBlbmRwb2ludFxyXG5cdHAueGhyID0gby54aHI7XHJcblx0cC5qc29ucCA9IG8uanNvbnA7XHJcblx0cC5mb3JtID0gby5mb3JtO1xyXG5cclxuXHQvLyBNYWtlIHJlcXVlc3RcclxuXHRpZiAodHlwZW9mICh1cmwpID09PSAnZnVuY3Rpb24nKSB7XHJcblx0XHQvLyBEb2VzIHNlbGYgaGF2ZSBpdHMgb3duIGNhbGxiYWNrP1xyXG5cdFx0dXJsKHAsIGdldFBhdGgpO1xyXG5cdH1cclxuXHRlbHNlIHtcclxuXHRcdC8vIEVsc2UgdGhlIFVSTCBpcyBhIHN0cmluZ1xyXG5cdFx0Z2V0UGF0aCh1cmwpO1xyXG5cdH1cclxuXHJcblx0cmV0dXJuIHByb21pc2UucHJveHk7XHJcblxyXG5cdC8vIElmIHVybCBuZWVkcyBhIGJhc2VcclxuXHQvLyBXcmFwIGV2ZXJ5dGhpbmcgaW5cclxuXHRmdW5jdGlvbiBnZXRQYXRoKHVybCkge1xyXG5cclxuXHRcdC8vIEZvcm1hdCB0aGUgc3RyaW5nIGlmIGl0IG5lZWRzIGl0XHJcblx0XHR1cmwgPSB1cmwucmVwbGFjZSgvXFxAXFx7KFthLXpcXF9cXC1dKykoXFx8Lio/KT9cXH0vZ2ksIGZ1bmN0aW9uKG0sIGtleSwgZGVmYXVsdHMpIHtcclxuXHRcdFx0dmFyIHZhbCA9IGRlZmF1bHRzID8gZGVmYXVsdHMucmVwbGFjZSgvXlxcfC8sICcnKSA6ICcnO1xyXG5cdFx0XHRpZiAoa2V5IGluIHAucXVlcnkpIHtcclxuXHRcdFx0XHR2YWwgPSBwLnF1ZXJ5W2tleV07XHJcblx0XHRcdFx0ZGVsZXRlIHAucXVlcnlba2V5XTtcclxuXHRcdFx0fVxyXG5cdFx0XHRlbHNlIGlmIChwLmRhdGEgJiYga2V5IGluIHAuZGF0YSkge1xyXG5cdFx0XHRcdHZhbCA9IHAuZGF0YVtrZXldO1xyXG5cdFx0XHRcdGRlbGV0ZSBwLmRhdGFba2V5XTtcclxuXHRcdFx0fVxyXG5cdFx0XHRlbHNlIGlmICghZGVmYXVsdHMpIHtcclxuXHRcdFx0XHRwcm9taXNlLnJlamVjdChlcnJvcignbWlzc2luZ19hdHRyaWJ1dGUnLCAnVGhlIGF0dHJpYnV0ZSAnICsga2V5ICsgJyBpcyBtaXNzaW5nIGZyb20gdGhlIHJlcXVlc3QnKSk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHJldHVybiB2YWw7XHJcblx0XHR9KTtcclxuXHJcblx0XHQvLyBBZGQgYmFzZVxyXG5cdFx0aWYgKCF1cmwubWF0Y2goL15odHRwcz86XFwvXFwvLykpIHtcclxuXHRcdFx0dXJsID0gby5iYXNlICsgdXJsO1xyXG5cdFx0fVxyXG5cclxuXHRcdC8vIERlZmluZSB0aGUgcmVxdWVzdCBVUkxcclxuXHRcdHAudXJsID0gdXJsO1xyXG5cclxuXHRcdC8vIE1ha2UgdGhlIEhUVFAgcmVxdWVzdCB3aXRoIHRoZSBjdXJhdGVkIHJlcXVlc3Qgb2JqZWN0XHJcblx0XHQvLyBDQUxMQkFDSyBIQU5ETEVSXHJcblx0XHQvLyBAIHJlc3BvbnNlIG9iamVjdFxyXG5cdFx0Ly8gQCBzdGF0dXNDb2RlIGludGVnZXIgaWYgYXZhaWxhYmxlXHJcblx0XHR1dGlscy5yZXF1ZXN0KHAsIGZ1bmN0aW9uKHIsIGhlYWRlcnMpIHtcclxuXHJcblx0XHRcdC8vIElzIHRoaXMgYSByYXcgcmVzcG9uc2U/XHJcblx0XHRcdGlmICghcC5mb3JtYXRSZXNwb25zZSkge1xyXG5cdFx0XHRcdC8vIEJhZCByZXF1ZXN0PyBlcnJvciBzdGF0dXNDb2RlIG9yIG90aGVyd2lzZSBjb250YWlucyBhbiBlcnJvciByZXNwb25zZSB2aXMgSlNPTlA/XHJcblx0XHRcdFx0aWYgKHR5cGVvZiBoZWFkZXJzID09PSAnb2JqZWN0JyA/IChoZWFkZXJzLnN0YXR1c0NvZGUgPj0gNDAwKSA6ICh0eXBlb2YgciA9PT0gJ29iamVjdCcgJiYgJ2Vycm9yJyBpbiByKSkge1xyXG5cdFx0XHRcdFx0cHJvbWlzZS5yZWplY3Qocik7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdGVsc2Uge1xyXG5cdFx0XHRcdFx0cHJvbWlzZS5mdWxmaWxsKHIpO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQvLyBTaG91bGQgdGhpcyBiZSBhbiBvYmplY3RcclxuXHRcdFx0aWYgKHIgPT09IHRydWUpIHtcclxuXHRcdFx0XHRyID0ge3N1Y2Nlc3M6dHJ1ZX07XHJcblx0XHRcdH1cclxuXHRcdFx0ZWxzZSBpZiAoIXIpIHtcclxuXHRcdFx0XHRyID0ge307XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdC8vIFRoZSBkZWxldGUgY2FsbGJhY2sgbmVlZHMgYSBiZXR0ZXIgcmVzcG9uc2VcclxuXHRcdFx0aWYgKHAubWV0aG9kID09PSAnZGVsZXRlJykge1xyXG5cdFx0XHRcdHIgPSAoIXIgfHwgdXRpbHMuaXNFbXB0eShyKSkgPyB7c3VjY2Vzczp0cnVlfSA6IHI7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdC8vIEZPUk1BVCBSRVNQT05TRT9cclxuXHRcdFx0Ly8gRG9lcyBzZWxmIHJlcXVlc3QgaGF2ZSBhIGNvcnJlc3BvbmRpbmcgZm9ybWF0dGVyXHJcblx0XHRcdGlmIChvLndyYXAgJiYgKChwLnBhdGggaW4gby53cmFwKSB8fCAoJ2RlZmF1bHQnIGluIG8ud3JhcCkpKSB7XHJcblx0XHRcdFx0dmFyIHdyYXAgPSAocC5wYXRoIGluIG8ud3JhcCA/IHAucGF0aCA6ICdkZWZhdWx0Jyk7XHJcblx0XHRcdFx0dmFyIHRpbWUgPSAobmV3IERhdGUoKSkuZ2V0VGltZSgpO1xyXG5cclxuXHRcdFx0XHQvLyBGT1JNQVQgUkVTUE9OU0VcclxuXHRcdFx0XHR2YXIgYiA9IG8ud3JhcFt3cmFwXShyLCBoZWFkZXJzLCBwKTtcclxuXHJcblx0XHRcdFx0Ly8gSGFzIHRoZSByZXNwb25zZSBiZWVuIHV0dGVybHkgb3ZlcndyaXR0ZW4/XHJcblx0XHRcdFx0Ly8gVHlwaWNhbGx5IHNlbGYgYXVnbWVudHMgdGhlIGV4aXN0aW5nIG9iamVjdC4uIGJ1dCBmb3IgdGhvc2UgcmFyZSBvY2Nhc3Npb25zXHJcblx0XHRcdFx0aWYgKGIpIHtcclxuXHRcdFx0XHRcdHIgPSBiO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0Ly8gSXMgdGhlcmUgYSBuZXh0X3BhZ2UgZGVmaW5lZCBpbiB0aGUgcmVzcG9uc2U/XHJcblx0XHRcdGlmIChyICYmICdwYWdpbmcnIGluIHIgJiYgci5wYWdpbmcubmV4dCkge1xyXG5cclxuXHRcdFx0XHQvLyBBZGQgdGhlIHJlbGF0aXZlIHBhdGggaWYgaXQgaXMgbWlzc2luZyBmcm9tIHRoZSBwYWdpbmcvbmV4dCBwYXRoXHJcblx0XHRcdFx0aWYgKHIucGFnaW5nLm5leHRbMF0gPT09ICc/Jykge1xyXG5cdFx0XHRcdFx0ci5wYWdpbmcubmV4dCA9IHAucGF0aCArIHIucGFnaW5nLm5leHQ7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHQvLyBUaGUgcmVsYXRpdmUgcGF0aCBoYXMgYmVlbiBkZWZpbmVkLCBsZXRzIG1hcmt1cCB0aGUgaGFuZGxlciBpbiB0aGUgSGFzaEZyYWdtZW50XHJcblx0XHRcdFx0ZWxzZSB7XHJcblx0XHRcdFx0XHRyLnBhZ2luZy5uZXh0ICs9ICcjJyArIHAucGF0aDtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdC8vIERpc3BhdGNoIHRvIGxpc3RlbmVyc1xyXG5cdFx0XHQvLyBFbWl0IGV2ZW50cyB3aGljaCBwZXJ0YWluIHRvIHRoZSBmb3JtYXR0ZWQgcmVzcG9uc2VcclxuXHRcdFx0aWYgKCFyIHx8ICdlcnJvcicgaW4gcikge1xyXG5cdFx0XHRcdHByb21pc2UucmVqZWN0KHIpO1xyXG5cdFx0XHR9XHJcblx0XHRcdGVsc2Uge1xyXG5cdFx0XHRcdHByb21pc2UuZnVsZmlsbChyKTtcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblx0fVxyXG59O1xyXG5cclxuLy8gQVBJIHV0aWxpdGllc1xyXG5oZWxsby51dGlscy5leHRlbmQoaGVsbG8udXRpbHMsIHtcclxuXHJcblx0Ly8gTWFrZSBhbiBIVFRQIHJlcXVlc3RcclxuXHRyZXF1ZXN0OiBmdW5jdGlvbihwLCBjYWxsYmFjaykge1xyXG5cclxuXHRcdHZhciBfdGhpcyA9IHRoaXM7XHJcblx0XHR2YXIgZXJyb3IgPSBfdGhpcy5lcnJvcjtcclxuXHJcblx0XHQvLyBUaGlzIGhhcyB0byBnbyB0aHJvdWdoIGEgUE9TVCByZXF1ZXN0XHJcblx0XHRpZiAoIV90aGlzLmlzRW1wdHkocC5kYXRhKSAmJiAhKCdGaWxlTGlzdCcgaW4gd2luZG93KSAmJiBfdGhpcy5oYXNCaW5hcnkocC5kYXRhKSkge1xyXG5cclxuXHRcdFx0Ly8gRGlzYWJsZSBYSFIgYW5kIEpTT05QXHJcblx0XHRcdHAueGhyID0gZmFsc2U7XHJcblx0XHRcdHAuanNvbnAgPSBmYWxzZTtcclxuXHRcdH1cclxuXHJcblx0XHQvLyBDaGVjayBpZiB0aGUgYnJvd3NlciBhbmQgc2VydmljZSBzdXBwb3J0IENPUlNcclxuXHRcdHZhciBjb3JzID0gdGhpcy5yZXF1ZXN0X2NvcnMoZnVuY3Rpb24oKSB7XHJcblx0XHRcdC8vIElmIGl0IGRvZXMgdGhlbiBydW4gdGhpcy4uLlxyXG5cdFx0XHRyZXR1cm4gKChwLnhociA9PT0gdW5kZWZpbmVkKSB8fCAocC54aHIgJiYgKHR5cGVvZiAocC54aHIpICE9PSAnZnVuY3Rpb24nIHx8IHAueGhyKHAsIHAucXVlcnkpKSkpO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0aWYgKGNvcnMpIHtcclxuXHJcblx0XHRcdGZvcm1hdFVybChwLCBmdW5jdGlvbih1cmwpIHtcclxuXHJcblx0XHRcdFx0dmFyIHggPSBfdGhpcy54aHIocC5tZXRob2QsIHVybCwgcC5oZWFkZXJzLCBwLmRhdGEsIGNhbGxiYWNrKTtcclxuXHRcdFx0XHR4Lm9ucHJvZ3Jlc3MgPSBwLm9ucHJvZ3Jlc3MgfHwgbnVsbDtcclxuXHJcblx0XHRcdFx0Ly8gV2luZG93cyBQaG9uZSBkb2VzIG5vdCBzdXBwb3J0IHhoci51cGxvYWQsIHNlZSAjNzRcclxuXHRcdFx0XHQvLyBGZWF0dXJlIGRldGVjdFxyXG5cdFx0XHRcdGlmICh4LnVwbG9hZCAmJiBwLm9udXBsb2FkcHJvZ3Jlc3MpIHtcclxuXHRcdFx0XHRcdHgudXBsb2FkLm9ucHJvZ3Jlc3MgPSBwLm9udXBsb2FkcHJvZ3Jlc3M7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0fSk7XHJcblxyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gQ2xvbmUgdGhlIHF1ZXJ5IG9iamVjdFxyXG5cdFx0Ly8gRWFjaCByZXF1ZXN0IG1vZGlmaWVzIHRoZSBxdWVyeSBvYmplY3QgYW5kIG5lZWRzIHRvIGJlIHRhcmVkIGFmdGVyIGVhY2ggb25lLlxyXG5cdFx0dmFyIF9xdWVyeSA9IHAucXVlcnk7XHJcblxyXG5cdFx0cC5xdWVyeSA9IF90aGlzLmNsb25lKHAucXVlcnkpO1xyXG5cclxuXHRcdC8vIEFzc2lnbiBhIG5ldyBjYWxsYmFja0lEXHJcblx0XHRwLmNhbGxiYWNrSUQgPSBfdGhpcy5nbG9iYWxFdmVudCgpO1xyXG5cclxuXHRcdC8vIEpTT05QXHJcblx0XHRpZiAocC5qc29ucCAhPT0gZmFsc2UpIHtcclxuXHJcblx0XHRcdC8vIENsb25lIHRoZSBxdWVyeSBvYmplY3RcclxuXHRcdFx0cC5xdWVyeS5jYWxsYmFjayA9IHAuY2FsbGJhY2tJRDtcclxuXHJcblx0XHRcdC8vIElmIHRoZSBKU09OUCBpcyBhIGZ1bmN0aW9uIHRoZW4gcnVuIGl0XHJcblx0XHRcdGlmICh0eXBlb2YgKHAuanNvbnApID09PSAnZnVuY3Rpb24nKSB7XHJcblx0XHRcdFx0cC5qc29ucChwLCBwLnF1ZXJ5KTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0Ly8gTGV0cyB1c2UgSlNPTlAgaWYgdGhlIG1ldGhvZCBpcyAnZ2V0J1xyXG5cdFx0XHRpZiAocC5tZXRob2QgPT09ICdnZXQnKSB7XHJcblxyXG5cdFx0XHRcdGZvcm1hdFVybChwLCBmdW5jdGlvbih1cmwpIHtcclxuXHRcdFx0XHRcdF90aGlzLmpzb25wKHVybCwgY2FsbGJhY2ssIHAuY2FsbGJhY2tJRCwgcC50aW1lb3V0KTtcclxuXHRcdFx0XHR9KTtcclxuXHJcblx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHR9XHJcblx0XHRcdGVsc2Uge1xyXG5cdFx0XHRcdC8vIEl0J3Mgbm90IGNvbXBhdGlibGUgcmVzZXQgcXVlcnlcclxuXHRcdFx0XHRwLnF1ZXJ5ID0gX3F1ZXJ5O1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0fVxyXG5cclxuXHRcdC8vIE90aGVyd2lzZSB3ZSdyZSBvbiB0byB0aGUgb2xkIHNjaG9vbCwgaWZyYW1lIGhhY2tzIGFuZCBKU09OUFxyXG5cdFx0aWYgKHAuZm9ybSAhPT0gZmFsc2UpIHtcclxuXHJcblx0XHRcdC8vIEFkZCBzb21lIGFkZGl0aW9uYWwgcXVlcnkgcGFyYW1ldGVycyB0byB0aGUgVVJMXHJcblx0XHRcdC8vIFdlJ3JlIHByZXR0eSBzdHVmZmVkIGlmIHRoZSBlbmRwb2ludCBkb2Vzbid0IGxpa2UgdGhlc2VcclxuXHRcdFx0cC5xdWVyeS5yZWRpcmVjdF91cmkgPSBwLnJlZGlyZWN0X3VyaTtcclxuXHRcdFx0cC5xdWVyeS5zdGF0ZSA9IEpTT04uc3RyaW5naWZ5KHtjYWxsYmFjazpwLmNhbGxiYWNrSUR9KTtcclxuXHJcblx0XHRcdHZhciBvcHRzO1xyXG5cclxuXHRcdFx0aWYgKHR5cGVvZiAocC5mb3JtKSA9PT0gJ2Z1bmN0aW9uJykge1xyXG5cclxuXHRcdFx0XHQvLyBGb3JtYXQgdGhlIHJlcXVlc3RcclxuXHRcdFx0XHRvcHRzID0gcC5mb3JtKHAsIHAucXVlcnkpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZiAocC5tZXRob2QgPT09ICdwb3N0JyAmJiBvcHRzICE9PSBmYWxzZSkge1xyXG5cclxuXHRcdFx0XHRmb3JtYXRVcmwocCwgZnVuY3Rpb24odXJsKSB7XHJcblx0XHRcdFx0XHRfdGhpcy5wb3N0KHVybCwgcC5kYXRhLCBvcHRzLCBjYWxsYmFjaywgcC5jYWxsYmFja0lELCBwLnRpbWVvdXQpO1xyXG5cdFx0XHRcdH0pO1xyXG5cclxuXHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHQvLyBOb25lIG9mIHRoZSBtZXRob2RzIHdlcmUgc3VjY2Vzc2Z1bCB0aHJvdyBhbiBlcnJvclxyXG5cdFx0Y2FsbGJhY2soZXJyb3IoJ2ludmFsaWRfcmVxdWVzdCcsICdUaGVyZSB3YXMgbm8gbWVjaGFuaXNtIGZvciBoYW5kbGluZyB0aGlzIHJlcXVlc3QnKSk7XHJcblxyXG5cdFx0cmV0dXJuO1xyXG5cclxuXHRcdC8vIEZvcm1hdCBVUkxcclxuXHRcdC8vIENvbnN0cnVjdHMgdGhlIHJlcXVlc3QgVVJMLCBvcHRpb25hbGx5IHdyYXBzIHRoZSBVUkwgdGhyb3VnaCBhIGNhbGwgdG8gYSBwcm94eSBzZXJ2ZXJcclxuXHRcdC8vIFJldHVybnMgdGhlIGZvcm1hdHRlZCBVUkxcclxuXHRcdGZ1bmN0aW9uIGZvcm1hdFVybChwLCBjYWxsYmFjaykge1xyXG5cclxuXHRcdFx0Ly8gQXJlIHdlIHNpZ25pbmcgdGhlIHJlcXVlc3Q/XHJcblx0XHRcdHZhciBzaWduO1xyXG5cclxuXHRcdFx0Ly8gT0F1dGgxXHJcblx0XHRcdC8vIFJlbW92ZSB0aGUgdG9rZW4gZnJvbSB0aGUgcXVlcnkgYmVmb3JlIHNpZ25pbmdcclxuXHRcdFx0aWYgKHAuYXV0aFJlc3BvbnNlICYmIHAuYXV0aFJlc3BvbnNlLm9hdXRoICYmIHBhcnNlSW50KHAuYXV0aFJlc3BvbnNlLm9hdXRoLnZlcnNpb24sIDEwKSA9PT0gMSkge1xyXG5cclxuXHRcdFx0XHQvLyBPQVVUSCBTSUdOSU5HIFBST1hZXHJcblx0XHRcdFx0c2lnbiA9IHAucXVlcnkuYWNjZXNzX3Rva2VuO1xyXG5cclxuXHRcdFx0XHQvLyBSZW1vdmUgdGhlIGFjY2Vzc190b2tlblxyXG5cdFx0XHRcdGRlbGV0ZSBwLnF1ZXJ5LmFjY2Vzc190b2tlbjtcclxuXHJcblx0XHRcdFx0Ly8gRW5mb3JlIHVzZSBvZiBQcm94eVxyXG5cdFx0XHRcdHAucHJveHkgPSB0cnVlO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQvLyBQT1NUIGJvZHkgdG8gcXVlcnlzdHJpbmdcclxuXHRcdFx0aWYgKHAuZGF0YSAmJiAocC5tZXRob2QgPT09ICdnZXQnIHx8IHAubWV0aG9kID09PSAnZGVsZXRlJykpIHtcclxuXHRcdFx0XHQvLyBBdHRhY2ggdGhlIHAuZGF0YSB0byB0aGUgcXVlcnlzdHJpbmcuXHJcblx0XHRcdFx0X3RoaXMuZXh0ZW5kKHAucXVlcnksIHAuZGF0YSk7XHJcblx0XHRcdFx0cC5kYXRhID0gbnVsbDtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0Ly8gQ29uc3RydWN0IHRoZSBwYXRoXHJcblx0XHRcdHZhciBwYXRoID0gX3RoaXMucXMocC51cmwsIHAucXVlcnkpO1xyXG5cclxuXHRcdFx0Ly8gUHJveHkgdGhlIHJlcXVlc3QgdGhyb3VnaCBhIHNlcnZlclxyXG5cdFx0XHQvLyBVc2VkIGZvciBzaWduaW5nIE9BdXRoMVxyXG5cdFx0XHQvLyBBbmQgY2lyY3VtdmVudGluZyBzZXJ2aWNlcyB3aXRob3V0IEFjY2Vzcy1Db250cm9sIEhlYWRlcnNcclxuXHRcdFx0aWYgKHAucHJveHkpIHtcclxuXHRcdFx0XHQvLyBVc2UgdGhlIHByb3h5IGFzIGEgcGF0aFxyXG5cdFx0XHRcdHBhdGggPSBfdGhpcy5xcyhwLm9hdXRoX3Byb3h5LCB7XHJcblx0XHRcdFx0XHRwYXRoOiBwYXRoLFxyXG5cdFx0XHRcdFx0YWNjZXNzX3Rva2VuOiBzaWduIHx8ICcnLFxyXG5cclxuXHRcdFx0XHRcdC8vIFRoaXMgd2lsbCBwcm9tcHQgdGhlIHJlcXVlc3QgdG8gYmUgc2lnbmVkIGFzIHRob3VnaCBpdCBpcyBPQXV0aDFcclxuXHRcdFx0XHRcdHRoZW46IHAucHJveHlfcmVzcG9uc2VfdHlwZSB8fCAocC5tZXRob2QudG9Mb3dlckNhc2UoKSA9PT0gJ2dldCcgPyAncmVkaXJlY3QnIDogJ3Byb3h5JyksXHJcblx0XHRcdFx0XHRtZXRob2Q6IHAubWV0aG9kLnRvTG93ZXJDYXNlKCksXHJcblx0XHRcdFx0XHRzdXBwcmVzc19yZXNwb25zZV9jb2RlczogdHJ1ZVxyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRjYWxsYmFjayhwYXRoKTtcclxuXHRcdH1cclxuXHR9LFxyXG5cclxuXHQvLyBUZXN0IHdoZXRoZXIgdGhlIGJyb3dzZXIgc3VwcG9ydHMgdGhlIENPUlMgcmVzcG9uc2VcclxuXHRyZXF1ZXN0X2NvcnM6IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XHJcblx0XHRyZXR1cm4gJ3dpdGhDcmVkZW50aWFscycgaW4gbmV3IFhNTEh0dHBSZXF1ZXN0KCkgJiYgY2FsbGJhY2soKTtcclxuXHR9LFxyXG5cclxuXHQvLyBSZXR1cm4gdGhlIHR5cGUgb2YgRE9NIG9iamVjdFxyXG5cdGRvbUluc3RhbmNlOiBmdW5jdGlvbih0eXBlLCBkYXRhKSB7XHJcblx0XHR2YXIgdGVzdCA9ICdIVE1MJyArICh0eXBlIHx8ICcnKS5yZXBsYWNlKFxyXG5cdFx0XHQvXlthLXpdLyxcclxuXHRcdFx0ZnVuY3Rpb24obSkge1xyXG5cdFx0XHRcdHJldHVybiBtLnRvVXBwZXJDYXNlKCk7XHJcblx0XHRcdH1cclxuXHJcblx0XHQpICsgJ0VsZW1lbnQnO1xyXG5cclxuXHRcdGlmICghZGF0YSkge1xyXG5cdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKHdpbmRvd1t0ZXN0XSkge1xyXG5cdFx0XHRyZXR1cm4gZGF0YSBpbnN0YW5jZW9mIHdpbmRvd1t0ZXN0XTtcclxuXHRcdH1cclxuXHRcdGVsc2UgaWYgKHdpbmRvdy5FbGVtZW50KSB7XHJcblx0XHRcdHJldHVybiBkYXRhIGluc3RhbmNlb2Ygd2luZG93LkVsZW1lbnQgJiYgKCF0eXBlIHx8IChkYXRhLnRhZ05hbWUgJiYgZGF0YS50YWdOYW1lLnRvTG93ZXJDYXNlKCkgPT09IHR5cGUpKTtcclxuXHRcdH1cclxuXHRcdGVsc2Uge1xyXG5cdFx0XHRyZXR1cm4gKCEoZGF0YSBpbnN0YW5jZW9mIE9iamVjdCB8fCBkYXRhIGluc3RhbmNlb2YgQXJyYXkgfHwgZGF0YSBpbnN0YW5jZW9mIFN0cmluZyB8fCBkYXRhIGluc3RhbmNlb2YgTnVtYmVyKSAmJiBkYXRhLnRhZ05hbWUgJiYgZGF0YS50YWdOYW1lLnRvTG93ZXJDYXNlKCkgPT09IHR5cGUpO1xyXG5cdFx0fVxyXG5cdH0sXHJcblxyXG5cdC8vIENyZWF0ZSBhIGNsb25lIG9mIGFuIG9iamVjdFxyXG5cdGNsb25lOiBmdW5jdGlvbihvYmopIHtcclxuXHRcdC8vIERvZXMgbm90IGNsb25lIERPTSBlbGVtZW50cywgbm9yIEJpbmFyeSBkYXRhLCBlLmcuIEJsb2JzLCBGaWxlbGlzdHNcclxuXHRcdGlmIChvYmogPT09IG51bGwgfHwgdHlwZW9mIChvYmopICE9PSAnb2JqZWN0JyB8fCBvYmogaW5zdGFuY2VvZiBEYXRlIHx8ICdub2RlTmFtZScgaW4gb2JqIHx8IHRoaXMuaXNCaW5hcnkob2JqKSB8fCAodHlwZW9mIEZvcm1EYXRhID09PSAnZnVuY3Rpb24nICYmIG9iaiBpbnN0YW5jZW9mIEZvcm1EYXRhKSkge1xyXG5cdFx0XHRyZXR1cm4gb2JqO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmIChBcnJheS5pc0FycmF5KG9iaikpIHtcclxuXHRcdFx0Ly8gQ2xvbmUgZWFjaCBpdGVtIGluIHRoZSBhcnJheVxyXG5cdFx0XHRyZXR1cm4gb2JqLm1hcCh0aGlzLmNsb25lLmJpbmQodGhpcykpO1xyXG5cdFx0fVxyXG5cclxuXHRcdC8vIEJ1dCBkb2VzIGNsb25lIGV2ZXJ5dGhpbmcgZWxzZS5cclxuXHRcdHZhciBjbG9uZSA9IHt9O1xyXG5cdFx0Zm9yICh2YXIgeCBpbiBvYmopIHtcclxuXHRcdFx0Y2xvbmVbeF0gPSB0aGlzLmNsb25lKG9ialt4XSk7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIGNsb25lO1xyXG5cdH0sXHJcblxyXG5cdC8vIFhIUjogdXNlcyBDT1JTIHRvIG1ha2UgcmVxdWVzdHNcclxuXHR4aHI6IGZ1bmN0aW9uKG1ldGhvZCwgdXJsLCBoZWFkZXJzLCBkYXRhLCBjYWxsYmFjaykge1xyXG5cclxuXHRcdHZhciByID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XHJcblx0XHR2YXIgZXJyb3IgPSB0aGlzLmVycm9yO1xyXG5cclxuXHRcdC8vIEJpbmFyeT9cclxuXHRcdHZhciBiaW5hcnkgPSBmYWxzZTtcclxuXHRcdGlmIChtZXRob2QgPT09ICdibG9iJykge1xyXG5cdFx0XHRiaW5hcnkgPSBtZXRob2Q7XHJcblx0XHRcdG1ldGhvZCA9ICdHRVQnO1xyXG5cdFx0fVxyXG5cclxuXHRcdG1ldGhvZCA9IG1ldGhvZC50b1VwcGVyQ2FzZSgpO1xyXG5cclxuXHRcdC8vIFhoci5yZXNwb25zZVR5cGUgJ2pzb24nIGlzIG5vdCBzdXBwb3J0ZWQgaW4gYW55IG9mIHRoZSB2ZW5kb3JzIHlldC5cclxuXHRcdHIub25sb2FkID0gZnVuY3Rpb24oZSkge1xyXG5cdFx0XHR2YXIganNvbiA9IHIucmVzcG9uc2U7XHJcblx0XHRcdHRyeSB7XHJcblx0XHRcdFx0anNvbiA9IEpTT04ucGFyc2Uoci5yZXNwb25zZVRleHQpO1xyXG5cdFx0XHR9XHJcblx0XHRcdGNhdGNoIChfZSkge1xyXG5cdFx0XHRcdGlmIChyLnN0YXR1cyA9PT0gNDAxKSB7XHJcblx0XHRcdFx0XHRqc29uID0gZXJyb3IoJ2FjY2Vzc19kZW5pZWQnLCByLnN0YXR1c1RleHQpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0dmFyIGhlYWRlcnMgPSBoZWFkZXJzVG9KU09OKHIuZ2V0QWxsUmVzcG9uc2VIZWFkZXJzKCkpO1xyXG5cdFx0XHRoZWFkZXJzLnN0YXR1c0NvZGUgPSByLnN0YXR1cztcclxuXHJcblx0XHRcdGNhbGxiYWNrKGpzb24gfHwgKG1ldGhvZCA9PT0gJ0dFVCcgPyBlcnJvcignZW1wdHlfcmVzcG9uc2UnLCAnQ291bGQgbm90IGdldCByZXNvdXJjZScpIDoge30pLCBoZWFkZXJzKTtcclxuXHRcdH07XHJcblxyXG5cdFx0ci5vbmVycm9yID0gZnVuY3Rpb24oZSkge1xyXG5cdFx0XHR2YXIganNvbiA9IHIucmVzcG9uc2VUZXh0O1xyXG5cdFx0XHR0cnkge1xyXG5cdFx0XHRcdGpzb24gPSBKU09OLnBhcnNlKHIucmVzcG9uc2VUZXh0KTtcclxuXHRcdFx0fVxyXG5cdFx0XHRjYXRjaCAoX2UpIHt9XHJcblxyXG5cdFx0XHRjYWxsYmFjayhqc29uIHx8IGVycm9yKCdhY2Nlc3NfZGVuaWVkJywgJ0NvdWxkIG5vdCBnZXQgcmVzb3VyY2UnKSk7XHJcblx0XHR9O1xyXG5cclxuXHRcdHZhciB4O1xyXG5cclxuXHRcdC8vIFNob3VsZCB3ZSBhZGQgdGhlIHF1ZXJ5IHRvIHRoZSBVUkw/XHJcblx0XHRpZiAobWV0aG9kID09PSAnR0VUJyB8fCBtZXRob2QgPT09ICdERUxFVEUnKSB7XHJcblx0XHRcdGRhdGEgPSBudWxsO1xyXG5cdFx0fVxyXG5cdFx0ZWxzZSBpZiAoZGF0YSAmJiB0eXBlb2YgKGRhdGEpICE9PSAnc3RyaW5nJyAmJiAhKGRhdGEgaW5zdGFuY2VvZiBGb3JtRGF0YSkgJiYgIShkYXRhIGluc3RhbmNlb2YgRmlsZSkgJiYgIShkYXRhIGluc3RhbmNlb2YgQmxvYikpIHtcclxuXHRcdFx0Ly8gTG9vcCB0aHJvdWdoIGFuZCBhZGQgZm9ybURhdGFcclxuXHRcdFx0dmFyIGYgPSBuZXcgRm9ybURhdGEoKTtcclxuXHRcdFx0Zm9yICh4IGluIGRhdGEpIGlmIChkYXRhLmhhc093blByb3BlcnR5KHgpKSB7XHJcblx0XHRcdFx0aWYgKGRhdGFbeF0gaW5zdGFuY2VvZiBIVE1MSW5wdXRFbGVtZW50KSB7XHJcblx0XHRcdFx0XHRpZiAoJ2ZpbGVzJyBpbiBkYXRhW3hdICYmIGRhdGFbeF0uZmlsZXMubGVuZ3RoID4gMCkge1xyXG5cdFx0XHRcdFx0XHRmLmFwcGVuZCh4LCBkYXRhW3hdLmZpbGVzWzBdKTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0ZWxzZSBpZiAoZGF0YVt4XSBpbnN0YW5jZW9mIEJsb2IpIHtcclxuXHRcdFx0XHRcdGYuYXBwZW5kKHgsIGRhdGFbeF0sIGRhdGEubmFtZSk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdGVsc2Uge1xyXG5cdFx0XHRcdFx0Zi5hcHBlbmQoeCwgZGF0YVt4XSk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRkYXRhID0gZjtcclxuXHRcdH1cclxuXHJcblx0XHQvLyBPcGVuIHRoZSBwYXRoLCBhc3luY1xyXG5cdFx0ci5vcGVuKG1ldGhvZCwgdXJsLCB0cnVlKTtcclxuXHJcblx0XHRpZiAoYmluYXJ5KSB7XHJcblx0XHRcdGlmICgncmVzcG9uc2VUeXBlJyBpbiByKSB7XHJcblx0XHRcdFx0ci5yZXNwb25zZVR5cGUgPSBiaW5hcnk7XHJcblx0XHRcdH1cclxuXHRcdFx0ZWxzZSB7XHJcblx0XHRcdFx0ci5vdmVycmlkZU1pbWVUeXBlKCd0ZXh0L3BsYWluOyBjaGFyc2V0PXgtdXNlci1kZWZpbmVkJyk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHQvLyBTZXQgYW55IGJlc3Bva2UgaGVhZGVyc1xyXG5cdFx0aWYgKGhlYWRlcnMpIHtcclxuXHRcdFx0Zm9yICh4IGluIGhlYWRlcnMpIHtcclxuXHRcdFx0XHRyLnNldFJlcXVlc3RIZWFkZXIoeCwgaGVhZGVyc1t4XSk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHRyLnNlbmQoZGF0YSk7XHJcblxyXG5cdFx0cmV0dXJuIHI7XHJcblxyXG5cdFx0Ly8gSGVhZGVycyBhcmUgcmV0dXJuZWQgYXMgYSBzdHJpbmdcclxuXHRcdGZ1bmN0aW9uIGhlYWRlcnNUb0pTT04ocykge1xyXG5cdFx0XHR2YXIgciA9IHt9O1xyXG5cdFx0XHR2YXIgcmVnID0gLyhbYS16XFwtXSspOlxccz8oLiopOz8vZ2k7XHJcblx0XHRcdHZhciBtO1xyXG5cdFx0XHR3aGlsZSAoKG0gPSByZWcuZXhlYyhzKSkpIHtcclxuXHRcdFx0XHRyW21bMV1dID0gbVsyXTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0cmV0dXJuIHI7XHJcblx0XHR9XHJcblx0fSxcclxuXHJcblx0Ly8gSlNPTlBcclxuXHQvLyBJbmplY3RzIGEgc2NyaXB0IHRhZyBpbnRvIHRoZSBET00gdG8gYmUgZXhlY3V0ZWQgYW5kIGFwcGVuZHMgYSBjYWxsYmFjayBmdW5jdGlvbiB0byB0aGUgd2luZG93IG9iamVjdFxyXG5cdC8vIEBwYXJhbSBzdHJpbmcvZnVuY3Rpb24gcGF0aEZ1bmMgZWl0aGVyIGEgc3RyaW5nIG9mIHRoZSBVUkwgb3IgYSBjYWxsYmFjayBmdW5jdGlvbiBwYXRoRnVuYyhxdWVyeXN0cmluZ2hhc2gsIGNvbnRpbnVlRnVuYyk7XHJcblx0Ly8gQHBhcmFtIGZ1bmN0aW9uIGNhbGxiYWNrIGEgZnVuY3Rpb24gdG8gY2FsbCBvbiBjb21wbGV0aW9uO1xyXG5cdGpzb25wOiBmdW5jdGlvbih1cmwsIGNhbGxiYWNrLCBjYWxsYmFja0lELCB0aW1lb3V0KSB7XHJcblxyXG5cdFx0dmFyIF90aGlzID0gdGhpcztcclxuXHRcdHZhciBlcnJvciA9IF90aGlzLmVycm9yO1xyXG5cclxuXHRcdC8vIENoYW5nZSB0aGUgbmFtZSBvZiB0aGUgY2FsbGJhY2tcclxuXHRcdHZhciBib29sID0gMDtcclxuXHRcdHZhciBoZWFkID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2hlYWQnKVswXTtcclxuXHRcdHZhciBvcGVyYUZpeDtcclxuXHRcdHZhciByZXN1bHQgPSBlcnJvcignc2VydmVyX2Vycm9yJywgJ3NlcnZlcl9lcnJvcicpO1xyXG5cdFx0dmFyIGNiID0gZnVuY3Rpb24oKSB7XHJcblx0XHRcdGlmICghKGJvb2wrKykpIHtcclxuXHRcdFx0XHR3aW5kb3cuc2V0VGltZW91dChmdW5jdGlvbigpIHtcclxuXHRcdFx0XHRcdGNhbGxiYWNrKHJlc3VsdCk7XHJcblx0XHRcdFx0XHRoZWFkLnJlbW92ZUNoaWxkKHNjcmlwdCk7XHJcblx0XHRcdFx0fSwgMCk7XHJcblx0XHRcdH1cclxuXHJcblx0XHR9O1xyXG5cclxuXHRcdC8vIEFkZCBjYWxsYmFjayB0byB0aGUgd2luZG93IG9iamVjdFxyXG5cdFx0Y2FsbGJhY2tJRCA9IF90aGlzLmdsb2JhbEV2ZW50KGZ1bmN0aW9uKGpzb24pIHtcclxuXHRcdFx0cmVzdWx0ID0ganNvbjtcclxuXHRcdFx0cmV0dXJuIHRydWU7XHJcblxyXG5cdFx0XHQvLyBNYXJrIGNhbGxiYWNrIGFzIGRvbmVcclxuXHRcdH0sIGNhbGxiYWNrSUQpO1xyXG5cclxuXHRcdC8vIFRoZSBVUkwgaXMgYSBmdW5jdGlvbiBmb3Igc29tZSBjYXNlcyBhbmQgYXMgc3VjaFxyXG5cdFx0Ly8gRGV0ZXJtaW5lIGl0cyB2YWx1ZSB3aXRoIGEgY2FsbGJhY2sgY29udGFpbmluZyB0aGUgbmV3IHBhcmFtZXRlcnMgb2YgdGhpcyBmdW5jdGlvbi5cclxuXHRcdHVybCA9IHVybC5yZXBsYWNlKG5ldyBSZWdFeHAoJz1cXFxcPygmfCQpJyksICc9JyArIGNhbGxiYWNrSUQgKyAnJDEnKTtcclxuXHJcblx0XHQvLyBCdWlsZCBzY3JpcHQgdGFnXHJcblx0XHR2YXIgc2NyaXB0ID0gX3RoaXMuYXBwZW5kKCdzY3JpcHQnLCB7XHJcblx0XHRcdGlkOiBjYWxsYmFja0lELFxyXG5cdFx0XHRuYW1lOiBjYWxsYmFja0lELFxyXG5cdFx0XHRzcmM6IHVybCxcclxuXHRcdFx0YXN5bmM6IHRydWUsXHJcblx0XHRcdG9ubG9hZDogY2IsXHJcblx0XHRcdG9uZXJyb3I6IGNiLFxyXG5cdFx0XHRvbnJlYWR5c3RhdGVjaGFuZ2U6IGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdGlmICgvbG9hZGVkfGNvbXBsZXRlL2kudGVzdCh0aGlzLnJlYWR5U3RhdGUpKSB7XHJcblx0XHRcdFx0XHRjYigpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblxyXG5cdFx0Ly8gT3BlcmEgZml4IGVycm9yXHJcblx0XHQvLyBQcm9ibGVtOiBJZiBhbiBlcnJvciBvY2N1cnMgd2l0aCBzY3JpcHQgbG9hZGluZyBPcGVyYSBmYWlscyB0byB0cmlnZ2VyIHRoZSBzY3JpcHQub25lcnJvciBoYW5kbGVyIHdlIHNwZWNpZmllZFxyXG5cdFx0Ly9cclxuXHRcdC8vIEZpeDpcclxuXHRcdC8vIEJ5IHNldHRpbmcgdGhlIHJlcXVlc3QgdG8gc3luY2hyb25vdXMgd2UgY2FuIHRyaWdnZXIgdGhlIGVycm9yIGhhbmRsZXIgd2hlbiBhbGwgZWxzZSBmYWlscy5cclxuXHRcdC8vIFRoaXMgYWN0aW9uIHdpbGwgYmUgaWdub3JlZCBpZiB3ZSd2ZSBhbHJlYWR5IGNhbGxlZCB0aGUgY2FsbGJhY2sgaGFuZGxlciBcImNiXCIgd2l0aCBhIHN1Y2Nlc3NmdWwgb25sb2FkIGV2ZW50XHJcblx0XHRpZiAod2luZG93Lm5hdmlnYXRvci51c2VyQWdlbnQudG9Mb3dlckNhc2UoKS5pbmRleE9mKCdvcGVyYScpID4gLTEpIHtcclxuXHRcdFx0b3BlcmFGaXggPSBfdGhpcy5hcHBlbmQoJ3NjcmlwdCcsIHtcclxuXHRcdFx0XHR0ZXh0OiAnZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXFwnJyArIGNhbGxiYWNrSUQgKyAnXFwnKS5vbmVycm9yKCk7J1xyXG5cdFx0XHR9KTtcclxuXHRcdFx0c2NyaXB0LmFzeW5jID0gZmFsc2U7XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gQWRkIHRpbWVvdXRcclxuXHRcdGlmICh0aW1lb3V0KSB7XHJcblx0XHRcdHdpbmRvdy5zZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdHJlc3VsdCA9IGVycm9yKCd0aW1lb3V0JywgJ3RpbWVvdXQnKTtcclxuXHRcdFx0XHRjYigpO1xyXG5cdFx0XHR9LCB0aW1lb3V0KTtcclxuXHRcdH1cclxuXHJcblx0XHQvLyBUT0RPOiBhZGQgZml4IGZvciBJRSxcclxuXHRcdC8vIEhvd2V2ZXI6IHVuYWJsZSByZWNyZWF0ZSB0aGUgYnVnIG9mIGZpcmluZyBvZmYgdGhlIG9ucmVhZHlzdGF0ZWNoYW5nZSBiZWZvcmUgdGhlIHNjcmlwdCBjb250ZW50IGhhcyBiZWVuIGV4ZWN1dGVkIGFuZCB0aGUgdmFsdWUgb2YgXCJyZXN1bHRcIiBoYXMgYmVlbiBkZWZpbmVkLlxyXG5cdFx0Ly8gSW5qZWN0IHNjcmlwdCB0YWcgaW50byB0aGUgaGVhZCBlbGVtZW50XHJcblx0XHRoZWFkLmFwcGVuZENoaWxkKHNjcmlwdCk7XHJcblxyXG5cdFx0Ly8gQXBwZW5kIE9wZXJhIEZpeCB0byBydW4gYWZ0ZXIgb3VyIHNjcmlwdFxyXG5cdFx0aWYgKG9wZXJhRml4KSB7XHJcblx0XHRcdGhlYWQuYXBwZW5kQ2hpbGQob3BlcmFGaXgpO1xyXG5cdFx0fVxyXG5cdH0sXHJcblxyXG5cdC8vIFBvc3RcclxuXHQvLyBTZW5kIGluZm9ybWF0aW9uIHRvIGEgcmVtb3RlIGxvY2F0aW9uIHVzaW5nIHRoZSBwb3N0IG1lY2hhbmlzbVxyXG5cdC8vIEBwYXJhbSBzdHJpbmcgdXJpIHBhdGhcclxuXHQvLyBAcGFyYW0gb2JqZWN0IGRhdGEsIGtleSB2YWx1ZSBkYXRhIHRvIHNlbmRcclxuXHQvLyBAcGFyYW0gZnVuY3Rpb24gY2FsbGJhY2ssIGZ1bmN0aW9uIHRvIGV4ZWN1dGUgaW4gcmVzcG9uc2VcclxuXHRwb3N0OiBmdW5jdGlvbih1cmwsIGRhdGEsIG9wdGlvbnMsIGNhbGxiYWNrLCBjYWxsYmFja0lELCB0aW1lb3V0KSB7XHJcblxyXG5cdFx0dmFyIF90aGlzID0gdGhpcztcclxuXHRcdHZhciBlcnJvciA9IF90aGlzLmVycm9yO1xyXG5cdFx0dmFyIGRvYyA9IGRvY3VtZW50O1xyXG5cclxuXHRcdC8vIFRoaXMgaGFjayBuZWVkcyBhIGZvcm1cclxuXHRcdHZhciBmb3JtID0gbnVsbDtcclxuXHRcdHZhciByZWVuYWJsZUFmdGVyU3VibWl0ID0gW107XHJcblx0XHR2YXIgbmV3Zm9ybTtcclxuXHRcdHZhciBpID0gMDtcclxuXHRcdHZhciB4ID0gbnVsbDtcclxuXHRcdHZhciBib29sID0gMDtcclxuXHRcdHZhciBjYiA9IGZ1bmN0aW9uKHIpIHtcclxuXHRcdFx0aWYgKCEoYm9vbCsrKSkge1xyXG5cdFx0XHRcdGNhbGxiYWNrKHIpO1xyXG5cdFx0XHR9XHJcblx0XHR9O1xyXG5cclxuXHRcdC8vIFdoYXQgaXMgdGhlIG5hbWUgb2YgdGhlIGNhbGxiYWNrIHRvIGNvbnRhaW5cclxuXHRcdC8vIFdlJ2xsIGFsc28gdXNlIHRoaXMgdG8gbmFtZSB0aGUgaWZyYW1lXHJcblx0XHRfdGhpcy5nbG9iYWxFdmVudChjYiwgY2FsbGJhY2tJRCk7XHJcblxyXG5cdFx0Ly8gQnVpbGQgdGhlIGlmcmFtZSB3aW5kb3dcclxuXHRcdHZhciB3aW47XHJcblx0XHR0cnkge1xyXG5cdFx0XHQvLyBJRTcgaGFjaywgb25seSBsZXRzIHVzIGRlZmluZSB0aGUgbmFtZSBoZXJlLCBub3QgbGF0ZXIuXHJcblx0XHRcdHdpbiA9IGRvYy5jcmVhdGVFbGVtZW50KCc8aWZyYW1lIG5hbWU9XCInICsgY2FsbGJhY2tJRCArICdcIj4nKTtcclxuXHRcdH1cclxuXHRcdGNhdGNoIChlKSB7XHJcblx0XHRcdHdpbiA9IGRvYy5jcmVhdGVFbGVtZW50KCdpZnJhbWUnKTtcclxuXHRcdH1cclxuXHJcblx0XHR3aW4ubmFtZSA9IGNhbGxiYWNrSUQ7XHJcblx0XHR3aW4uaWQgPSBjYWxsYmFja0lEO1xyXG5cdFx0d2luLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcblxyXG5cdFx0Ly8gT3ZlcnJpZGUgY2FsbGJhY2sgbWVjaGFuaXNtLiBUcmlnZ2dlciBhIHJlc3BvbnNlIG9ubG9hZC9vbmVycm9yXHJcblx0XHRpZiAob3B0aW9ucyAmJiBvcHRpb25zLmNhbGxiYWNrb25sb2FkKSB7XHJcblx0XHRcdC8vIE9ubG9hZCBpcyBiZWluZyBmaXJlZCB0d2ljZVxyXG5cdFx0XHR3aW4ub25sb2FkID0gZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0Y2Ioe1xyXG5cdFx0XHRcdFx0cmVzcG9uc2U6ICdwb3N0ZWQnLFxyXG5cdFx0XHRcdFx0bWVzc2FnZTogJ0NvbnRlbnQgd2FzIHBvc3RlZCdcclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0fTtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAodGltZW91dCkge1xyXG5cdFx0XHRzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdGNiKGVycm9yKCd0aW1lb3V0JywgJ1RoZSBwb3N0IG9wZXJhdGlvbiB0aW1lZCBvdXQnKSk7XHJcblx0XHRcdH0sIHRpbWVvdXQpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGRvYy5ib2R5LmFwcGVuZENoaWxkKHdpbik7XHJcblxyXG5cdFx0Ly8gSWYgd2UgYXJlIGp1c3QgcG9zdGluZyBhIHNpbmdsZSBpdGVtXHJcblx0XHRpZiAoX3RoaXMuZG9tSW5zdGFuY2UoJ2Zvcm0nLCBkYXRhKSkge1xyXG5cdFx0XHQvLyBHZXQgdGhlIHBhcmVudCBmb3JtXHJcblx0XHRcdGZvcm0gPSBkYXRhLmZvcm07XHJcblxyXG5cdFx0XHQvLyBMb29wIHRocm91Z2ggYW5kIGRpc2FibGUgYWxsIG9mIGl0cyBzaWJsaW5nc1xyXG5cdFx0XHRmb3IgKGkgPSAwOyBpIDwgZm9ybS5lbGVtZW50cy5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHRcdGlmIChmb3JtLmVsZW1lbnRzW2ldICE9PSBkYXRhKSB7XHJcblx0XHRcdFx0XHRmb3JtLmVsZW1lbnRzW2ldLnNldEF0dHJpYnV0ZSgnZGlzYWJsZWQnLCB0cnVlKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdC8vIE1vdmUgdGhlIGZvY3VzIHRvIHRoZSBmb3JtXHJcblx0XHRcdGRhdGEgPSBmb3JtO1xyXG5cdFx0fVxyXG5cclxuXHRcdC8vIFBvc3RpbmcgYSBmb3JtXHJcblx0XHRpZiAoX3RoaXMuZG9tSW5zdGFuY2UoJ2Zvcm0nLCBkYXRhKSkge1xyXG5cdFx0XHQvLyBUaGlzIGlzIGEgZm9ybSBlbGVtZW50XHJcblx0XHRcdGZvcm0gPSBkYXRhO1xyXG5cclxuXHRcdFx0Ly8gRG9lcyB0aGlzIGZvcm0gbmVlZCB0byBiZSBhIG11bHRpcGFydCBmb3JtP1xyXG5cdFx0XHRmb3IgKGkgPSAwOyBpIDwgZm9ybS5lbGVtZW50cy5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHRcdGlmICghZm9ybS5lbGVtZW50c1tpXS5kaXNhYmxlZCAmJiBmb3JtLmVsZW1lbnRzW2ldLnR5cGUgPT09ICdmaWxlJykge1xyXG5cdFx0XHRcdFx0Zm9ybS5lbmNvZGluZyA9IGZvcm0uZW5jdHlwZSA9ICdtdWx0aXBhcnQvZm9ybS1kYXRhJztcclxuXHRcdFx0XHRcdGZvcm0uZWxlbWVudHNbaV0uc2V0QXR0cmlidXRlKCduYW1lJywgJ2ZpbGUnKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHRcdGVsc2Uge1xyXG5cdFx0XHQvLyBJdHMgbm90IGEgZm9ybSBlbGVtZW50LFxyXG5cdFx0XHQvLyBUaGVyZWZvcmUgaXQgbXVzdCBiZSBhIEpTT04gb2JqZWN0IG9mIEtleT0+VmFsdWUgb3IgS2V5PT5FbGVtZW50XHJcblx0XHRcdC8vIElmIGFueW9uZSBvZiB0aG9zZSB2YWx1ZXMgYXJlIGEgaW5wdXQgdHlwZT1maWxlIHdlIHNoYWxsIHNoYWxsIGluc2VydCBpdHMgc2libGluZ3MgaW50byB0aGUgZm9ybSBmb3Igd2hpY2ggaXQgYmVsb25ncy5cclxuXHRcdFx0Zm9yICh4IGluIGRhdGEpIGlmIChkYXRhLmhhc093blByb3BlcnR5KHgpKSB7XHJcblx0XHRcdFx0Ly8gSXMgdGhpcyBhbiBpbnB1dCBFbGVtZW50P1xyXG5cdFx0XHRcdGlmIChfdGhpcy5kb21JbnN0YW5jZSgnaW5wdXQnLCBkYXRhW3hdKSAmJiBkYXRhW3hdLnR5cGUgPT09ICdmaWxlJykge1xyXG5cdFx0XHRcdFx0Zm9ybSA9IGRhdGFbeF0uZm9ybTtcclxuXHRcdFx0XHRcdGZvcm0uZW5jb2RpbmcgPSBmb3JtLmVuY3R5cGUgPSAnbXVsdGlwYXJ0L2Zvcm0tZGF0YSc7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQvLyBEbyBJZiB0aGVyZSBpcyBubyBkZWZpbmVkIGZvcm0gZWxlbWVudCwgbGV0cyBjcmVhdGUgb25lLlxyXG5cdFx0XHRpZiAoIWZvcm0pIHtcclxuXHRcdFx0XHQvLyBCdWlsZCBmb3JtXHJcblx0XHRcdFx0Zm9ybSA9IGRvYy5jcmVhdGVFbGVtZW50KCdmb3JtJyk7XHJcblx0XHRcdFx0ZG9jLmJvZHkuYXBwZW5kQ2hpbGQoZm9ybSk7XHJcblx0XHRcdFx0bmV3Zm9ybSA9IGZvcm07XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHZhciBpbnB1dDtcclxuXHJcblx0XHRcdC8vIEFkZCBlbGVtZW50cyB0byB0aGUgZm9ybSBpZiB0aGV5IGRvbnQgZXhpc3RcclxuXHRcdFx0Zm9yICh4IGluIGRhdGEpIGlmIChkYXRhLmhhc093blByb3BlcnR5KHgpKSB7XHJcblxyXG5cdFx0XHRcdC8vIElzIHRoaXMgYW4gZWxlbWVudD9cclxuXHRcdFx0XHR2YXIgZWwgPSAoX3RoaXMuZG9tSW5zdGFuY2UoJ2lucHV0JywgZGF0YVt4XSkgfHwgX3RoaXMuZG9tSW5zdGFuY2UoJ3RleHRBcmVhJywgZGF0YVt4XSkgfHwgX3RoaXMuZG9tSW5zdGFuY2UoJ3NlbGVjdCcsIGRhdGFbeF0pKTtcclxuXHJcblx0XHRcdFx0Ly8gSXMgdGhpcyBub3QgYW4gaW5wdXQgZWxlbWVudCwgb3Igb25lIHRoYXQgZXhpc3RzIG91dHNpZGUgdGhlIGZvcm0uXHJcblx0XHRcdFx0aWYgKCFlbCB8fCBkYXRhW3hdLmZvcm0gIT09IGZvcm0pIHtcclxuXHJcblx0XHRcdFx0XHQvLyBEb2VzIGFuIGVsZW1lbnQgaGF2ZSB0aGUgc2FtZSBuYW1lP1xyXG5cdFx0XHRcdFx0dmFyIGlucHV0cyA9IGZvcm0uZWxlbWVudHNbeF07XHJcblx0XHRcdFx0XHRpZiAoaW5wdXQpIHtcclxuXHRcdFx0XHRcdFx0Ly8gUmVtb3ZlIGl0LlxyXG5cdFx0XHRcdFx0XHRpZiAoIShpbnB1dHMgaW5zdGFuY2VvZiBOb2RlTGlzdCkpIHtcclxuXHRcdFx0XHRcdFx0XHRpbnB1dHMgPSBbaW5wdXRzXTtcclxuXHRcdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdFx0Zm9yIChpID0gMDsgaSA8IGlucHV0cy5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHRcdFx0XHRcdGlucHV0c1tpXS5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGlucHV0c1tpXSk7XHJcblx0XHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0Ly8gQ3JlYXRlIGFuIGlucHV0IGVsZW1lbnRcclxuXHRcdFx0XHRcdGlucHV0ID0gZG9jLmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XHJcblx0XHRcdFx0XHRpbnB1dC5zZXRBdHRyaWJ1dGUoJ3R5cGUnLCAnaGlkZGVuJyk7XHJcblx0XHRcdFx0XHRpbnB1dC5zZXRBdHRyaWJ1dGUoJ25hbWUnLCB4KTtcclxuXHJcblx0XHRcdFx0XHQvLyBEb2VzIGl0IGhhdmUgYSB2YWx1ZSBhdHRyaWJ1dGU/XHJcblx0XHRcdFx0XHRpZiAoZWwpIHtcclxuXHRcdFx0XHRcdFx0aW5wdXQudmFsdWUgPSBkYXRhW3hdLnZhbHVlO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0ZWxzZSBpZiAoX3RoaXMuZG9tSW5zdGFuY2UobnVsbCwgZGF0YVt4XSkpIHtcclxuXHRcdFx0XHRcdFx0aW5wdXQudmFsdWUgPSBkYXRhW3hdLmlubmVySFRNTCB8fCBkYXRhW3hdLmlubmVyVGV4dDtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdGVsc2Uge1xyXG5cdFx0XHRcdFx0XHRpbnB1dC52YWx1ZSA9IGRhdGFbeF07XHJcblx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0Zm9ybS5hcHBlbmRDaGlsZChpbnB1dCk7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHQvLyBJdCBpcyBhbiBlbGVtZW50LCB3aGljaCBleGlzdHMgd2l0aGluIHRoZSBmb3JtLCBidXQgdGhlIG5hbWUgaXMgd3JvbmdcclxuXHRcdFx0XHRlbHNlIGlmIChlbCAmJiBkYXRhW3hdLm5hbWUgIT09IHgpIHtcclxuXHRcdFx0XHRcdGRhdGFbeF0uc2V0QXR0cmlidXRlKCduYW1lJywgeCk7XHJcblx0XHRcdFx0XHRkYXRhW3hdLm5hbWUgPSB4O1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0Ly8gRGlzYWJsZSBlbGVtZW50cyBmcm9tIHdpdGhpbiB0aGUgZm9ybSBpZiB0aGV5IHdlcmVuJ3Qgc3BlY2lmaWVkXHJcblx0XHRcdGZvciAoaSA9IDA7IGkgPCBmb3JtLmVsZW1lbnRzLmxlbmd0aDsgaSsrKSB7XHJcblxyXG5cdFx0XHRcdGlucHV0ID0gZm9ybS5lbGVtZW50c1tpXTtcclxuXHJcblx0XHRcdFx0Ly8gRG9lcyB0aGUgc2FtZSBuYW1lIGFuZCB2YWx1ZSBleGlzdCBpbiB0aGUgcGFyZW50XHJcblx0XHRcdFx0aWYgKCEoaW5wdXQubmFtZSBpbiBkYXRhKSAmJiBpbnB1dC5nZXRBdHRyaWJ1dGUoJ2Rpc2FibGVkJykgIT09IHRydWUpIHtcclxuXHRcdFx0XHRcdC8vIERpc2FibGVcclxuXHRcdFx0XHRcdGlucHV0LnNldEF0dHJpYnV0ZSgnZGlzYWJsZWQnLCB0cnVlKTtcclxuXHJcblx0XHRcdFx0XHQvLyBBZGQgcmUtZW5hYmxlIHRvIGNhbGxiYWNrXHJcblx0XHRcdFx0XHRyZWVuYWJsZUFmdGVyU3VibWl0LnB1c2goaW5wdXQpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdC8vIFNldCB0aGUgdGFyZ2V0IG9mIHRoZSBmb3JtXHJcblx0XHRmb3JtLnNldEF0dHJpYnV0ZSgnbWV0aG9kJywgJ1BPU1QnKTtcclxuXHRcdGZvcm0uc2V0QXR0cmlidXRlKCd0YXJnZXQnLCBjYWxsYmFja0lEKTtcclxuXHRcdGZvcm0udGFyZ2V0ID0gY2FsbGJhY2tJRDtcclxuXHJcblx0XHQvLyBVcGRhdGUgdGhlIGZvcm0gVVJMXHJcblx0XHRmb3JtLnNldEF0dHJpYnV0ZSgnYWN0aW9uJywgdXJsKTtcclxuXHJcblx0XHQvLyBTdWJtaXQgdGhlIGZvcm1cclxuXHRcdC8vIFNvbWUgcmVhc29uIHRoaXMgbmVlZHMgdG8gYmUgb2Zmc2V0IGZyb20gdGhlIGN1cnJlbnQgd2luZG93IGV4ZWN1dGlvblxyXG5cdFx0c2V0VGltZW91dChmdW5jdGlvbigpIHtcclxuXHRcdFx0Zm9ybS5zdWJtaXQoKTtcclxuXHJcblx0XHRcdHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0dHJ5IHtcclxuXHRcdFx0XHRcdC8vIFJlbW92ZSB0aGUgaWZyYW1lIGZyb20gdGhlIHBhZ2UuXHJcblx0XHRcdFx0XHQvL3dpbi5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHdpbik7XHJcblx0XHRcdFx0XHQvLyBSZW1vdmUgdGhlIGZvcm1cclxuXHRcdFx0XHRcdGlmIChuZXdmb3JtKSB7XHJcblx0XHRcdFx0XHRcdG5ld2Zvcm0ucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChuZXdmb3JtKTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0Y2F0Y2ggKGUpIHtcclxuXHRcdFx0XHRcdHRyeSB7XHJcblx0XHRcdFx0XHRcdGNvbnNvbGUuZXJyb3IoJ0hlbGxvSlM6IGNvdWxkIG5vdCByZW1vdmUgaWZyYW1lJyk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRjYXRjaCAoZWUpIHt9XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHQvLyBSZWVuYWJsZSB0aGUgZGlzYWJsZWQgZm9ybVxyXG5cdFx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgcmVlbmFibGVBZnRlclN1Ym1pdC5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHRcdFx0aWYgKHJlZW5hYmxlQWZ0ZXJTdWJtaXRbaV0pIHtcclxuXHRcdFx0XHRcdFx0cmVlbmFibGVBZnRlclN1Ym1pdFtpXS5zZXRBdHRyaWJ1dGUoJ2Rpc2FibGVkJywgZmFsc2UpO1xyXG5cdFx0XHRcdFx0XHRyZWVuYWJsZUFmdGVyU3VibWl0W2ldLmRpc2FibGVkID0gZmFsc2U7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9LCAwKTtcclxuXHRcdH0sIDEwMCk7XHJcblx0fSxcclxuXHJcblx0Ly8gU29tZSBvZiB0aGUgcHJvdmlkZXJzIHJlcXVpcmUgdGhhdCBvbmx5IG11bHRpcGFydCBpcyB1c2VkIHdpdGggbm9uLWJpbmFyeSBmb3Jtcy5cclxuXHQvLyBUaGlzIGZ1bmN0aW9uIGNoZWNrcyB3aGV0aGVyIHRoZSBmb3JtIGNvbnRhaW5zIGJpbmFyeSBkYXRhXHJcblx0aGFzQmluYXJ5OiBmdW5jdGlvbihkYXRhKSB7XHJcblx0XHRmb3IgKHZhciB4IGluIGRhdGEpIGlmIChkYXRhLmhhc093blByb3BlcnR5KHgpKSB7XHJcblx0XHRcdGlmICh0aGlzLmlzQmluYXJ5KGRhdGFbeF0pKSB7XHJcblx0XHRcdFx0cmV0dXJuIHRydWU7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gZmFsc2U7XHJcblx0fSxcclxuXHJcblx0Ly8gRGV0ZXJtaW5lcyBpZiBhIHZhcmlhYmxlIEVpdGhlciBJcyBvciBsaWtlIGEgRm9ybUlucHV0IGhhcyB0aGUgdmFsdWUgb2YgYSBCbG9iXHJcblxyXG5cdGlzQmluYXJ5OiBmdW5jdGlvbihkYXRhKSB7XHJcblxyXG5cdFx0cmV0dXJuIGRhdGEgaW5zdGFuY2VvZiBPYmplY3QgJiYgKFxyXG5cdFx0KHRoaXMuZG9tSW5zdGFuY2UoJ2lucHV0JywgZGF0YSkgJiYgZGF0YS50eXBlID09PSAnZmlsZScpIHx8XHJcblx0XHQoJ0ZpbGVMaXN0JyBpbiB3aW5kb3cgJiYgZGF0YSBpbnN0YW5jZW9mIHdpbmRvdy5GaWxlTGlzdCkgfHxcclxuXHRcdCgnRmlsZScgaW4gd2luZG93ICYmIGRhdGEgaW5zdGFuY2VvZiB3aW5kb3cuRmlsZSkgfHxcclxuXHRcdCgnQmxvYicgaW4gd2luZG93ICYmIGRhdGEgaW5zdGFuY2VvZiB3aW5kb3cuQmxvYikpO1xyXG5cclxuXHR9LFxyXG5cclxuXHQvLyBDb252ZXJ0IERhdGEtVVJJIHRvIEJsb2Igc3RyaW5nXHJcblx0dG9CbG9iOiBmdW5jdGlvbihkYXRhVVJJKSB7XHJcblx0XHR2YXIgcmVnID0gL15kYXRhXFw6KFteOyxdKyhcXDtjaGFyc2V0PVteOyxdKyk/KShcXDtiYXNlNjQpPywvaTtcclxuXHRcdHZhciBtID0gZGF0YVVSSS5tYXRjaChyZWcpO1xyXG5cdFx0aWYgKCFtKSB7XHJcblx0XHRcdHJldHVybiBkYXRhVVJJO1xyXG5cdFx0fVxyXG5cclxuXHRcdHZhciBiaW5hcnkgPSBhdG9iKGRhdGFVUkkucmVwbGFjZShyZWcsICcnKSk7XHJcblx0XHR2YXIgYXJyYXkgPSBbXTtcclxuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgYmluYXJ5Lmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdGFycmF5LnB1c2goYmluYXJ5LmNoYXJDb2RlQXQoaSkpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBuZXcgQmxvYihbbmV3IFVpbnQ4QXJyYXkoYXJyYXkpXSwge3R5cGU6IG1bMV19KTtcclxuXHR9XHJcblxyXG59KTtcclxuXHJcbi8vIEVYVFJBOiBDb252ZXJ0IEZvcm1FbGVtZW50IHRvIEpTT04gZm9yIFBPU1RpbmdcclxuLy8gV3JhcHBlcnMgdG8gYWRkIGFkZGl0aW9uYWwgZnVuY3Rpb25hbGl0eSB0byBleGlzdGluZyBmdW5jdGlvbnNcclxuKGZ1bmN0aW9uKGhlbGxvKSB7XHJcblxyXG5cdC8vIENvcHkgb3JpZ2luYWwgZnVuY3Rpb25cclxuXHR2YXIgYXBpID0gaGVsbG8uYXBpO1xyXG5cdHZhciB1dGlscyA9IGhlbGxvLnV0aWxzO1xyXG5cclxuXHR1dGlscy5leHRlbmQodXRpbHMsIHtcclxuXHJcblx0XHQvLyBEYXRhVG9KU09OXHJcblx0XHQvLyBUaGlzIHRha2VzIGEgRm9ybUVsZW1lbnR8Tm9kZUxpc3R8SW5wdXRFbGVtZW50fE1peGVkT2JqZWN0cyBhbmQgY29udmVycyB0aGUgZGF0YSBvYmplY3QgdG8gSlNPTi5cclxuXHRcdGRhdGFUb0pTT046IGZ1bmN0aW9uKHApIHtcclxuXHJcblx0XHRcdHZhciBfdGhpcyA9IHRoaXM7XHJcblx0XHRcdHZhciB3ID0gd2luZG93O1xyXG5cdFx0XHR2YXIgZGF0YSA9IHAuZGF0YTtcclxuXHJcblx0XHRcdC8vIElzIGRhdGEgYSBmb3JtIG9iamVjdFxyXG5cdFx0XHRpZiAoX3RoaXMuZG9tSW5zdGFuY2UoJ2Zvcm0nLCBkYXRhKSkge1xyXG5cdFx0XHRcdGRhdGEgPSBfdGhpcy5ub2RlTGlzdFRvSlNPTihkYXRhLmVsZW1lbnRzKTtcclxuXHRcdFx0fVxyXG5cdFx0XHRlbHNlIGlmICgnTm9kZUxpc3QnIGluIHcgJiYgZGF0YSBpbnN0YW5jZW9mIE5vZGVMaXN0KSB7XHJcblx0XHRcdFx0ZGF0YSA9IF90aGlzLm5vZGVMaXN0VG9KU09OKGRhdGEpO1xyXG5cdFx0XHR9XHJcblx0XHRcdGVsc2UgaWYgKF90aGlzLmRvbUluc3RhbmNlKCdpbnB1dCcsIGRhdGEpKSB7XHJcblx0XHRcdFx0ZGF0YSA9IF90aGlzLm5vZGVMaXN0VG9KU09OKFtkYXRhXSk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdC8vIElzIGRhdGEgYSBibG9iLCBGaWxlLCBGaWxlTGlzdD9cclxuXHRcdFx0aWYgKCgnRmlsZScgaW4gdyAmJiBkYXRhIGluc3RhbmNlb2Ygdy5GaWxlKSB8fFxyXG5cdFx0XHRcdCgnQmxvYicgaW4gdyAmJiBkYXRhIGluc3RhbmNlb2Ygdy5CbG9iKSB8fFxyXG5cdFx0XHRcdCgnRmlsZUxpc3QnIGluIHcgJiYgZGF0YSBpbnN0YW5jZW9mIHcuRmlsZUxpc3QpKSB7XHJcblx0XHRcdFx0ZGF0YSA9IHtmaWxlOiBkYXRhfTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0Ly8gTG9vcCB0aHJvdWdoIGRhdGEgaWYgaXQncyBub3QgZm9ybSBkYXRhIGl0IG11c3Qgbm93IGJlIGEgSlNPTiBvYmplY3RcclxuXHRcdFx0aWYgKCEoJ0Zvcm1EYXRhJyBpbiB3ICYmIGRhdGEgaW5zdGFuY2VvZiB3LkZvcm1EYXRhKSkge1xyXG5cclxuXHRcdFx0XHRmb3IgKHZhciB4IGluIGRhdGEpIGlmIChkYXRhLmhhc093blByb3BlcnR5KHgpKSB7XHJcblxyXG5cdFx0XHRcdFx0aWYgKCdGaWxlTGlzdCcgaW4gdyAmJiBkYXRhW3hdIGluc3RhbmNlb2Ygdy5GaWxlTGlzdCkge1xyXG5cdFx0XHRcdFx0XHRpZiAoZGF0YVt4XS5sZW5ndGggPT09IDEpIHtcclxuXHRcdFx0XHRcdFx0XHRkYXRhW3hdID0gZGF0YVt4XVswXTtcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0ZWxzZSBpZiAoX3RoaXMuZG9tSW5zdGFuY2UoJ2lucHV0JywgZGF0YVt4XSkgJiYgZGF0YVt4XS50eXBlID09PSAnZmlsZScpIHtcclxuXHRcdFx0XHRcdFx0Y29udGludWU7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRlbHNlIGlmIChfdGhpcy5kb21JbnN0YW5jZSgnaW5wdXQnLCBkYXRhW3hdKSB8fFxyXG5cdFx0XHRcdFx0XHRfdGhpcy5kb21JbnN0YW5jZSgnc2VsZWN0JywgZGF0YVt4XSkgfHxcclxuXHRcdFx0XHRcdFx0X3RoaXMuZG9tSW5zdGFuY2UoJ3RleHRBcmVhJywgZGF0YVt4XSkpIHtcclxuXHRcdFx0XHRcdFx0ZGF0YVt4XSA9IGRhdGFbeF0udmFsdWU7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRlbHNlIGlmIChfdGhpcy5kb21JbnN0YW5jZShudWxsLCBkYXRhW3hdKSkge1xyXG5cdFx0XHRcdFx0XHRkYXRhW3hdID0gZGF0YVt4XS5pbm5lckhUTUwgfHwgZGF0YVt4XS5pbm5lclRleHQ7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRwLmRhdGEgPSBkYXRhO1xyXG5cdFx0XHRyZXR1cm4gZGF0YTtcclxuXHRcdH0sXHJcblxyXG5cdFx0Ly8gTm9kZUxpc3RUb0pTT05cclxuXHRcdC8vIEdpdmVuIGEgbGlzdCBvZiBlbGVtZW50cyBleHRyYXBvbGF0ZSB0aGVpciB2YWx1ZXMgYW5kIHJldHVybiBhcyBhIGpzb24gb2JqZWN0XHJcblx0XHRub2RlTGlzdFRvSlNPTjogZnVuY3Rpb24obm9kZWxpc3QpIHtcclxuXHJcblx0XHRcdHZhciBqc29uID0ge307XHJcblxyXG5cdFx0XHQvLyBDcmVhdGUgYSBkYXRhIHN0cmluZ1xyXG5cdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IG5vZGVsaXN0Lmxlbmd0aDsgaSsrKSB7XHJcblxyXG5cdFx0XHRcdHZhciBpbnB1dCA9IG5vZGVsaXN0W2ldO1xyXG5cclxuXHRcdFx0XHQvLyBJZiB0aGUgbmFtZSBvZiB0aGUgaW5wdXQgaXMgZW1wdHkgb3IgZGlhYmxlZCwgZG9udCBhZGQgaXQuXHJcblx0XHRcdFx0aWYgKGlucHV0LmRpc2FibGVkIHx8ICFpbnB1dC5uYW1lKSB7XHJcblx0XHRcdFx0XHRjb250aW51ZTtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdC8vIElzIHRoaXMgYSBmaWxlLCBkb2VzIHRoZSBicm93c2VyIG5vdCBzdXBwb3J0ICdmaWxlcycgYW5kICdGb3JtRGF0YSc/XHJcblx0XHRcdFx0aWYgKGlucHV0LnR5cGUgPT09ICdmaWxlJykge1xyXG5cdFx0XHRcdFx0anNvbltpbnB1dC5uYW1lXSA9IGlucHV0O1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRlbHNlIHtcclxuXHRcdFx0XHRcdGpzb25baW5wdXQubmFtZV0gPSBpbnB1dC52YWx1ZSB8fCBpbnB1dC5pbm5lckhUTUw7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRyZXR1cm4ganNvbjtcclxuXHRcdH1cclxuXHR9KTtcclxuXHJcblx0Ly8gUmVwbGFjZSBpdFxyXG5cdGhlbGxvLmFwaSA9IGZ1bmN0aW9uKCkge1xyXG5cclxuXHRcdC8vIEdldCBhcmd1bWVudHNcclxuXHRcdHZhciBwID0gdXRpbHMuYXJncyh7cGF0aDogJ3MhJywgbWV0aG9kOiAncycsIGRhdGE6J28nLCB0aW1lb3V0OiAnaScsIGNhbGxiYWNrOiAnZid9LCBhcmd1bWVudHMpO1xyXG5cclxuXHRcdC8vIENoYW5nZSBmb3IgaW50byBhIGRhdGEgb2JqZWN0XHJcblx0XHRpZiAocC5kYXRhKSB7XHJcblx0XHRcdHV0aWxzLmRhdGFUb0pTT04ocCk7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIGFwaS5jYWxsKHRoaXMsIHApO1xyXG5cdH07XHJcblxyXG59KShoZWxsbyk7XHJcblxyXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcbi8vXHJcbi8vIFNhdmUgYW55IGFjY2VzcyB0b2tlbiB0aGF0IGlzIGluIHRoZSBjdXJyZW50IHBhZ2UgVVJMXHJcbi8vIEhhbmRsZSBhbnkgcmVzcG9uc2Ugc29saWNpdGVkIHRocm91Z2ggaWZyYW1lIGhhc2ggdGFnIGZvbGxvd2luZyBhbiBBUEkgcmVxdWVzdFxyXG4vL1xyXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcblxyXG5oZWxsby51dGlscy5yZXNwb25zZUhhbmRsZXIod2luZG93LCB3aW5kb3cub3BlbmVyIHx8IHdpbmRvdy5wYXJlbnQpO1xyXG5cclxuLy8gU2NyaXB0IHRvIHN1cHBvcnQgQ2hyb21lQXBwc1xyXG4vLyBUaGlzIG92ZXJpZGVzIHRoZSBoZWxsby51dGlscy5wb3B1cCBtZXRob2QgdG8gc3VwcG9ydCBjaHJvbWUuaWRlbnRpdHkubGF1bmNoV2ViQXV0aEZsb3dcclxuLy8gU2VlIGh0dHBzOi8vZGV2ZWxvcGVyLmNocm9tZS5jb20vYXBwcy9hcHBfaWRlbnRpdHkjbm9uXHJcblxyXG4vLyBJcyB0aGlzIGEgY2hyb21lIGFwcD9cclxuXHJcbmlmICh0eXBlb2YgY2hyb21lID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgY2hyb21lLmlkZW50aXR5ID09PSAnb2JqZWN0JyAmJiBjaHJvbWUuaWRlbnRpdHkubGF1bmNoV2ViQXV0aEZsb3cpIHtcclxuXHJcblx0KGZ1bmN0aW9uKCkge1xyXG5cclxuXHRcdC8vIFN3YXAgdGhlIHBvcHVwIG1ldGhvZFxyXG5cdFx0aGVsbG8udXRpbHMucG9wdXAgPSBmdW5jdGlvbih1cmwpIHtcclxuXHJcblx0XHRcdHJldHVybiBfb3Blbih1cmwsIHRydWUpO1xyXG5cclxuXHRcdH07XHJcblxyXG5cdFx0Ly8gU3dhcCB0aGUgaGlkZGVuIGlmcmFtZSBtZXRob2RcclxuXHRcdGhlbGxvLnV0aWxzLmlmcmFtZSA9IGZ1bmN0aW9uKHVybCkge1xyXG5cclxuXHRcdFx0X29wZW4odXJsLCBmYWxzZSk7XHJcblxyXG5cdFx0fTtcclxuXHJcblx0XHQvLyBTd2FwIHRoZSByZXF1ZXN0X2NvcnMgbWV0aG9kXHJcblx0XHRoZWxsby51dGlscy5yZXF1ZXN0X2NvcnMgPSBmdW5jdGlvbihjYWxsYmFjaykge1xyXG5cclxuXHRcdFx0Y2FsbGJhY2soKTtcclxuXHJcblx0XHRcdC8vIEFsd2F5cyBydW4gYXMgQ09SU1xyXG5cclxuXHRcdFx0cmV0dXJuIHRydWU7XHJcblx0XHR9O1xyXG5cclxuXHRcdC8vIFN3YXAgdGhlIHN0b3JhZ2UgbWV0aG9kXHJcblx0XHR2YXIgX2NhY2hlID0ge307XHJcblx0XHRjaHJvbWUuc3RvcmFnZS5sb2NhbC5nZXQoJ2hlbGxvJywgZnVuY3Rpb24ocikge1xyXG5cdFx0XHQvLyBVcGRhdGUgdGhlIGNhY2hlXHJcblx0XHRcdF9jYWNoZSA9IHIuaGVsbG8gfHwge307XHJcblx0XHR9KTtcclxuXHJcblx0XHRoZWxsby51dGlscy5zdG9yZSA9IGZ1bmN0aW9uKG5hbWUsIHZhbHVlKSB7XHJcblxyXG5cdFx0XHQvLyBHZXQgYWxsXHJcblx0XHRcdGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAwKSB7XHJcblx0XHRcdFx0cmV0dXJuIF9jYWNoZTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0Ly8gR2V0XHJcblx0XHRcdGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAxKSB7XHJcblx0XHRcdFx0cmV0dXJuIF9jYWNoZVtuYW1lXSB8fCBudWxsO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQvLyBTZXRcclxuXHRcdFx0aWYgKHZhbHVlKSB7XHJcblx0XHRcdFx0X2NhY2hlW25hbWVdID0gdmFsdWU7XHJcblx0XHRcdFx0Y2hyb21lLnN0b3JhZ2UubG9jYWwuc2V0KHtoZWxsbzogX2NhY2hlfSk7XHJcblx0XHRcdFx0cmV0dXJuIHZhbHVlO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQvLyBEZWxldGVcclxuXHRcdFx0aWYgKHZhbHVlID09PSBudWxsKSB7XHJcblx0XHRcdFx0ZGVsZXRlIF9jYWNoZVtuYW1lXTtcclxuXHRcdFx0XHRjaHJvbWUuc3RvcmFnZS5sb2NhbC5zZXQoe2hlbGxvOiBfY2FjaGV9KTtcclxuXHRcdFx0XHRyZXR1cm4gbnVsbDtcclxuXHRcdFx0fVxyXG5cdFx0fTtcclxuXHJcblx0XHQvLyBPcGVuIGZ1bmN0aW9uXHJcblx0XHRmdW5jdGlvbiBfb3Blbih1cmwsIGludGVyYWN0aXZlKSB7XHJcblxyXG5cdFx0XHQvLyBMYXVuY2hcclxuXHRcdFx0dmFyIHJlZiA9IHtcclxuXHRcdFx0XHRjbG9zZWQ6IGZhbHNlXHJcblx0XHRcdH07XHJcblxyXG5cdFx0XHQvLyBMYXVuY2ggdGhlIHdlYkF1dGhGbG93XHJcblx0XHRcdGNocm9tZS5pZGVudGl0eS5sYXVuY2hXZWJBdXRoRmxvdyh7XHJcblx0XHRcdFx0dXJsOiB1cmwsXHJcblx0XHRcdFx0aW50ZXJhY3RpdmU6IGludGVyYWN0aXZlXHJcblx0XHRcdH0sIGZ1bmN0aW9uKHJlc3BvbnNlVXJsKSB7XHJcblxyXG5cdFx0XHRcdC8vIERpZCB0aGUgdXNlciBjYW5jZWwgdGhpcyBwcmVtYXR1cmVseVxyXG5cdFx0XHRcdGlmIChyZXNwb25zZVVybCA9PT0gdW5kZWZpbmVkKSB7XHJcblx0XHRcdFx0XHRyZWYuY2xvc2VkID0gdHJ1ZTtcclxuXHRcdFx0XHRcdHJldHVybjtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdC8vIFNwbGl0IGFwcGFydCB0aGUgVVJMXHJcblx0XHRcdFx0dmFyIGEgPSBoZWxsby51dGlscy51cmwocmVzcG9uc2VVcmwpO1xyXG5cclxuXHRcdFx0XHQvLyBUaGUgbG9jYXRpb24gY2FuIGJlIGF1Z21lbnRlZCBpbiB0byBhIGxvY2F0aW9uIG9iamVjdCBsaWtlIHNvLi4uXHJcblx0XHRcdFx0Ly8gV2UgZG9udCBoYXZlIHdpbmRvdyBvcGVyYXRpb25zIG9uIHRoZSBwb3B1cCBzbyBsZXRzIGNyZWF0ZSBzb21lXHJcblx0XHRcdFx0dmFyIF9wb3B1cCA9IHtcclxuXHRcdFx0XHRcdGxvY2F0aW9uOiB7XHJcblxyXG5cdFx0XHRcdFx0XHQvLyBDaGFuZ2UgdGhlIGxvY2F0aW9uIG9mIHRoZSBwb3B1cFxyXG5cdFx0XHRcdFx0XHRhc3NpZ246IGZ1bmN0aW9uKHVybCkge1xyXG5cclxuXHRcdFx0XHRcdFx0XHQvLyBJZiB0aGVyZSBpcyBhIHNlY29uZGFyeSByZWFzc2lnblxyXG5cdFx0XHRcdFx0XHRcdC8vIEluIHRoZSBjYXNlIG9mIE9BdXRoMVxyXG5cdFx0XHRcdFx0XHRcdC8vIFRyaWdnZXIgdGhpcyBpbiBub24taW50ZXJhY3RpdmUgbW9kZS5cclxuXHRcdFx0XHRcdFx0XHRfb3Blbih1cmwsIGZhbHNlKTtcclxuXHRcdFx0XHRcdFx0fSxcclxuXHJcblx0XHRcdFx0XHRcdHNlYXJjaDogYS5zZWFyY2gsXHJcblx0XHRcdFx0XHRcdGhhc2g6IGEuaGFzaCxcclxuXHRcdFx0XHRcdFx0aHJlZjogYS5ocmVmXHJcblx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0Y2xvc2U6IGZ1bmN0aW9uKCkge31cclxuXHRcdFx0XHR9O1xyXG5cclxuXHRcdFx0XHQvLyBUaGVuIHRoaXMgVVJMIGNvbnRhaW5zIGluZm9ybWF0aW9uIHdoaWNoIEhlbGxvSlMgbXVzdCBwcm9jZXNzXHJcblx0XHRcdFx0Ly8gVVJMIHN0cmluZ1xyXG5cdFx0XHRcdC8vIFdpbmRvdyAtIGFueSBhY3Rpb24gc3VjaCBhcyB3aW5kb3cgcmVsb2NhdGlvbiBnb2VzIGhlcmVcclxuXHRcdFx0XHQvLyBPcGVuZXIgLSB0aGUgcGFyZW50IHdpbmRvdyB3aGljaCBvcGVuZWQgdGhpcywgYWthIHRoaXMgc2NyaXB0XHJcblxyXG5cdFx0XHRcdGhlbGxvLnV0aWxzLnJlc3BvbnNlSGFuZGxlcihfcG9wdXAsIHdpbmRvdyk7XHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdFx0Ly8gUmV0dXJuIHRoZSByZWZlcmVuY2VcclxuXHRcdFx0cmV0dXJuIHJlZjtcclxuXHRcdH1cclxuXHJcblx0fSkoKTtcclxufVxyXG5cclxuLy8gUGhvbmVnYXAgb3ZlcnJpZGUgZm9yIGhlbGxvLnBob25lZ2FwLmpzXHJcbihmdW5jdGlvbigpIHtcclxuXHJcblx0Ly8gSXMgdGhpcyBhIHBob25lZ2FwIGltcGxlbWVudGF0aW9uP1xyXG5cdGlmICghKC9eZmlsZTpcXC97M31bXlxcL10vLnRlc3Qod2luZG93LmxvY2F0aW9uLmhyZWYpICYmIHdpbmRvdy5jb3Jkb3ZhKSkge1xyXG5cdFx0Ly8gQ29yZG92YSBpcyBub3QgaW5jbHVkZWQuXHJcblx0XHRyZXR1cm47XHJcblx0fVxyXG5cclxuXHQvLyBBdWdtZW50IHRoZSBoaWRkZW4gaWZyYW1lIG1ldGhvZFxyXG5cdGhlbGxvLnV0aWxzLmlmcmFtZSA9IGZ1bmN0aW9uKHVybCwgcmVkaXJlY3RVcmkpIHtcclxuXHRcdGhlbGxvLnV0aWxzLnBvcHVwKHVybCwgcmVkaXJlY3RVcmksIHtoaWRkZW46ICd5ZXMnfSk7XHJcblx0fTtcclxuXHJcblx0Ly8gQXVnbWVudCB0aGUgcG9wdXBcclxuXHR2YXIgdXRpbFBvcHVwID0gaGVsbG8udXRpbHMucG9wdXA7XHJcblxyXG5cdC8vIFJlcGxhY2UgcG9wdXBcclxuXHRoZWxsby51dGlscy5wb3B1cCA9IGZ1bmN0aW9uKHVybCwgcmVkaXJlY3RVcmksIG9wdGlvbnMpIHtcclxuXHJcblx0XHQvLyBSdW4gdGhlIHN0YW5kYXJkXHJcblx0XHR2YXIgcG9wdXAgPSB1dGlsUG9wdXAuY2FsbCh0aGlzLCB1cmwsIHJlZGlyZWN0VXJpLCBvcHRpb25zKTtcclxuXHJcblx0XHQvLyBDcmVhdGUgYSBmdW5jdGlvbiBmb3IgcmVvcGVuaW5nIHRoZSBwb3B1cCwgYW5kIGFzc2lnbmluZyBldmVudHMgdG8gdGhlIG5ldyBwb3B1cCBvYmplY3RcclxuXHRcdC8vIFBob25lR2FwIHN1cHBvcnRcclxuXHRcdC8vIEFkZCBhbiBldmVudCBsaXN0ZW5lciB0byBsaXN0ZW4gdG8gdGhlIGNoYW5nZSBpbiB0aGUgcG9wdXAgd2luZG93cyBVUkxcclxuXHRcdC8vIFRoaXMgbXVzdCBhcHBlYXIgYmVmb3JlIHBvcHVwLmZvY3VzKCk7XHJcblx0XHR0cnkge1xyXG5cdFx0XHRpZiAocG9wdXAgJiYgcG9wdXAuYWRkRXZlbnRMaXN0ZW5lcikge1xyXG5cclxuXHRcdFx0XHQvLyBHZXQgdGhlIG9yaWdpbiBvZiB0aGUgcmVkaXJlY3QgVVJJXHJcblxyXG5cdFx0XHRcdHZhciBhID0gaGVsbG8udXRpbHMudXJsKHJlZGlyZWN0VXJpKTtcclxuXHRcdFx0XHR2YXIgcmVkaXJlY3RVcmlPcmlnaW4gPSBhLm9yaWdpbiB8fCAoYS5wcm90b2NvbCArICcvLycgKyBhLmhvc3RuYW1lKTtcclxuXHJcblx0XHRcdFx0Ly8gTGlzdGVuIHRvIGNoYW5nZXMgaW4gdGhlIEluQXBwQnJvd3NlciB3aW5kb3dcclxuXHJcblx0XHRcdFx0cG9wdXAuYWRkRXZlbnRMaXN0ZW5lcignbG9hZHN0YXJ0JywgZnVuY3Rpb24oZSkge1xyXG5cclxuXHRcdFx0XHRcdHZhciB1cmwgPSBlLnVybDtcclxuXHJcblx0XHRcdFx0XHQvLyBJcyB0aGlzIHRoZSBwYXRoLCBhcyBnaXZlbiBieSB0aGUgcmVkaXJlY3RVcmk/XHJcblx0XHRcdFx0XHQvLyBDaGVjayB0aGUgbmV3IFVSTCBhZ2FpbnMgdGhlIHJlZGlyZWN0VXJpT3JpZ2luLlxyXG5cdFx0XHRcdFx0Ly8gQWNjb3JkaW5nIHRvICM2MyBhIHVzZXIgY291bGQgY2xpY2sgJ2NhbmNlbCcgaW4gc29tZSBkaWFsb2cgYm94ZXMgLi4uLlxyXG5cdFx0XHRcdFx0Ly8gVGhlIHBvcHVwIHJlZGlyZWN0cyB0byBhbm90aGVyIHBhZ2Ugd2l0aCB0aGUgc2FtZSBvcmlnaW4sIHlldCB3ZSBzdGlsbCB3aXNoIGl0IHRvIGNsb3NlLlxyXG5cclxuXHRcdFx0XHRcdGlmICh1cmwuaW5kZXhPZihyZWRpcmVjdFVyaU9yaWdpbikgIT09IDApIHtcclxuXHRcdFx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdC8vIFNwbGl0IGFwcGFydCB0aGUgVVJMXHJcblx0XHRcdFx0XHR2YXIgYSA9IGhlbGxvLnV0aWxzLnVybCh1cmwpO1xyXG5cclxuXHRcdFx0XHRcdC8vIFdlIGRvbnQgaGF2ZSB3aW5kb3cgb3BlcmF0aW9ucyBvbiB0aGUgcG9wdXAgc28gbGV0cyBjcmVhdGUgc29tZVxyXG5cdFx0XHRcdFx0Ly8gVGhlIGxvY2F0aW9uIGNhbiBiZSBhdWdtZW50ZWQgaW4gdG8gYSBsb2NhdGlvbiBvYmplY3QgbGlrZSBzby4uLlxyXG5cclxuXHRcdFx0XHRcdHZhciBfcG9wdXAgPSB7XHJcblx0XHRcdFx0XHRcdGxvY2F0aW9uOiB7XHJcblx0XHRcdFx0XHRcdFx0Ly8gQ2hhbmdlIHRoZSBsb2NhdGlvbiBvZiB0aGUgcG9wdXBcclxuXHRcdFx0XHRcdFx0XHRhc3NpZ246IGZ1bmN0aW9uKGxvY2F0aW9uKSB7XHJcblxyXG5cdFx0XHRcdFx0XHRcdFx0Ly8gVW5mb3VydHVuYXRseSBhbiBhcHAgaXMgbWF5IG5vdCBjaGFuZ2UgdGhlIGxvY2F0aW9uIG9mIGEgSW5BcHBCcm93c2VyIHdpbmRvdy5cclxuXHRcdFx0XHRcdFx0XHRcdC8vIFNvIHRvIHNoaW0gdGhpcywganVzdCBvcGVuIGEgbmV3IG9uZS5cclxuXHRcdFx0XHRcdFx0XHRcdHBvcHVwLmV4ZWN1dGVTY3JpcHQoe2NvZGU6ICd3aW5kb3cubG9jYXRpb24uaHJlZiA9IFwiJyArIGxvY2F0aW9uICsgJztcIid9KTtcclxuXHRcdFx0XHRcdFx0XHR9LFxyXG5cclxuXHRcdFx0XHRcdFx0XHRzZWFyY2g6IGEuc2VhcmNoLFxyXG5cdFx0XHRcdFx0XHRcdGhhc2g6IGEuaGFzaCxcclxuXHRcdFx0XHRcdFx0XHRocmVmOiBhLmhyZWZcclxuXHRcdFx0XHRcdFx0fSxcclxuXHRcdFx0XHRcdFx0Y2xvc2U6IGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdFx0XHRcdGlmIChwb3B1cC5jbG9zZSkge1xyXG5cdFx0XHRcdFx0XHRcdFx0cG9wdXAuY2xvc2UoKTtcclxuXHRcdFx0XHRcdFx0XHRcdHRyeSB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdHBvcHVwLmNsb3NlZCA9IHRydWU7XHJcblx0XHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdFx0XHRjYXRjaCAoX2UpIHt9XHJcblx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHR9O1xyXG5cclxuXHRcdFx0XHRcdC8vIFRoZW4gdGhpcyBVUkwgY29udGFpbnMgaW5mb3JtYXRpb24gd2hpY2ggSGVsbG9KUyBtdXN0IHByb2Nlc3NcclxuXHRcdFx0XHRcdC8vIFVSTCBzdHJpbmdcclxuXHRcdFx0XHRcdC8vIFdpbmRvdyAtIGFueSBhY3Rpb24gc3VjaCBhcyB3aW5kb3cgcmVsb2NhdGlvbiBnb2VzIGhlcmVcclxuXHRcdFx0XHRcdC8vIE9wZW5lciAtIHRoZSBwYXJlbnQgd2luZG93IHdoaWNoIG9wZW5lZCB0aGlzLCBha2EgdGhpcyBzY3JpcHRcclxuXHJcblx0XHRcdFx0XHRoZWxsby51dGlscy5yZXNwb25zZUhhbmRsZXIoX3BvcHVwLCB3aW5kb3cpO1xyXG5cclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdFx0Y2F0Y2ggKGUpIHt9XHJcblxyXG5cdFx0cmV0dXJuIHBvcHVwO1xyXG5cdH07XHJcblxyXG59KSgpO1xyXG5cclxuLy8gUmVnaXN0ZXIgYXMgYW5vbnltb3VzIEFNRCBtb2R1bGVcclxuaWYgKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCkge1xyXG5cdGRlZmluZShmdW5jdGlvbigpIHtcclxuXHRcdHJldHVybiBoZWxsbztcclxuXHR9KTtcclxufVxyXG5cclxuLy8gQ29tbW9uSlMgbW9kdWxlIGZvciBicm93c2VyaWZ5XHJcbmlmICh0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0JyAmJiBtb2R1bGUuZXhwb3J0cykge1xyXG5cdG1vZHVsZS5leHBvcnRzID0gaGVsbG87XHJcbn1cclxuIiwiLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbi8vICBDb3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi4gIEFsbCBSaWdodHMgUmVzZXJ2ZWQuICBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuICBTZWUgTGljZW5zZSBpbiB0aGUgcHJvamVjdCByb290IGZvciBsaWNlbnNlIGluZm9ybWF0aW9uLlxyXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHJcbid1c2Ugc3RyaWN0JztcclxuXHJcbmFuZ3VsYXIubW9kdWxlKCdBcGlFeHBsb3JlcicsIFsnbmdBbmltYXRlJywgJ25nTWF0ZXJpYWwnXSlcclxuICAgIC5jb25maWcoWyckbWRUaGVtaW5nUHJvdmlkZXInLCBmdW5jdGlvbiAoJG1kVGhlbWluZ1Byb3ZpZGVyKSB7XHJcblxyXG4gICAgJG1kVGhlbWluZ1Byb3ZpZGVyLmRlZmluZVBhbGV0dGUoJ08zNjVQcmltYXJ5UGFsZXR0ZScsIHtcclxuICAgICAgICAgICAgJzUwJzogJ2U5ZjBmYycsXHJcbiAgICAgICAgICAgICcxMDAnOiAnZDNlMmY4JyxcclxuICAgICAgICAgICAgJzIwMCc6ICdiZGQzZjUnLFxyXG4gICAgICAgICAgICAnMzAwJzogJzkxYjZlZScsIFxyXG4gICAgICAgICAgICAnNDAwJzogJzY1OTllNycsXHJcbiAgICAgICAgICAgICc1MDAnOiAnNDY4NWUyJywgLy9ibHVlXHJcbiAgICAgICAgICAgICc2MDAnOiAnMzg3YmUwJyxcclxuICAgICAgICAgICAgJzcwMCc6ICcyMjZkZGQnLFxyXG4gICAgICAgICAgICAnODAwJzogJzFmNjJjNycsIFxyXG4gICAgICAgICAgICAnOTAwJzogJzFjNTdiMCcsXHJcbiAgICAgICAgICAgICdBMTAwJzogJ0ZGNkEwMCcsIFxyXG4gICAgICAgICAgICAnQTIwMCc6ICdGRjZBMDAnLCBcclxuICAgICAgICAgICAgJ0E0MDAnOiAnRkY2QTAwJywgXHJcbiAgICAgICAgICAgICdBNzAwJzogJ0ZGNkEwMCcsIFxyXG4gICAgICAgICAgICAnY29udHJhc3REZWZhdWx0Q29sb3InOiAnbGlnaHQnLCAgIFxyXG4gICAgICAgICAgICAnY29udHJhc3REYXJrQ29sb3JzJzogWyc1MCcsICcxMDAnLCBcclxuICAgICAgICAgICAgICAgICcyMDAnLCAnMzAwJywgJzQwMCcsICdBMTAwJ10sXHJcbiAgICAgICAgICAgICdjb250cmFzdExpZ2h0Q29sb3JzJzogdW5kZWZpbmVkIFxyXG4gICAgfSk7XHJcbiAgICBcclxuICAgICRtZFRoZW1pbmdQcm92aWRlci5kZWZpbmVQYWxldHRlKCdPMzY1QWNjZW50UGFsZXR0ZScsIHtcclxuICAgICAgICAgICAgJzUwJzogJ2ZmYzQ5OScsXHJcbiAgICAgICAgICAgICcxMDAnOiAnZmZiNTgwJyxcclxuICAgICAgICAgICAgJzIwMCc6ICdmZmE2NjYnLFxyXG4gICAgICAgICAgICAnMzAwJzogJ2ZmOTc0ZCcsIFxyXG4gICAgICAgICAgICAnNDAwJzogJ2ZmODgzMycsXHJcbiAgICAgICAgICAgICc1MDAnOiAnRkY2QTAwJywgLy9vcmFuZ2VcclxuICAgICAgICAgICAgJzYwMCc6ICdlNjYwMDAnLFxyXG4gICAgICAgICAgICAnNzAwJzogJ2NjNTUwMCcsXHJcbiAgICAgICAgICAgICc4MDAnOiAnYjM0YTAwJywgXHJcbiAgICAgICAgICAgICc5MDAnOiAnOTk0MDAwJyxcclxuICAgICAgICAgICAgJ0ExMDAnOiAnRkY2QTAwJyxcclxuICAgICAgICAgICAgJ0EyMDAnOiAnRkY2QTAwJywgXHJcbiAgICAgICAgICAgICdBNDAwJzogJ0ZGNkEwMCcsIFxyXG4gICAgICAgICAgICAnQTcwMCc6ICdGRjZBMDAnLCBcclxuICAgIH0pO1xyXG5cclxuICAgICRtZFRoZW1pbmdQcm92aWRlci50aGVtZSgnZGVmYXVsdCcpLnByaW1hcnlQYWxldHRlKCdPMzY1UHJpbWFyeVBhbGV0dGUnKTtcclxuICAgICRtZFRoZW1pbmdQcm92aWRlci50aGVtZSgnZGVmYXVsdCcpLmFjY2VudFBhbGV0dGUoJ08zNjVBY2NlbnRQYWxldHRlJyk7XHJcbn1dKTsiLCIvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuLy8gIENvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiAgQWxsIFJpZ2h0cyBSZXNlcnZlZC4gIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gIFNlZSBMaWNlbnNlIGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXHJcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cclxuJ3VzZSBzdHJpY3QnO1xyXG5cclxudmFyIHJ1biA9IGZ1bmN0aW9uICgkc2NvcGUsIHVybCwgYXBpU2VydmljZSkge1xyXG4gICAgJHNjb3BlLiRlbWl0KCd1cmxDaGFuZ2UnLCB1cmwpO1xyXG59XHJcblxyXG52YXIgZm9ybWF0WG1sID0gZnVuY3Rpb24gKHhtbCkge1xyXG4gICAgdmFyIHJlZyA9IC8oPilcXHMqKDwpKFxcLyopL2c7IC8vIHVwZGF0ZWQgTWFyIDMwLCAyMDE1XHJcbiAgICB2YXIgd3NleHAgPSAvICooLiopICtcXG4vZztcclxuICAgIHZhciBjb250ZXhwID0gLyg8Lis+KSguK1xcbikvZztcclxuICAgIHhtbCA9IHhtbC5yZXBsYWNlKHJlZywgJyQxXFxuJDIkMycpLnJlcGxhY2Uod3NleHAsICckMVxcbicpLnJlcGxhY2UoY29udGV4cCwgJyQxXFxuJDInKTtcclxuICAgIHZhciBwYWQgPSAwO1xyXG4gICAgdmFyIGZvcm1hdHRlZCA9ICcnO1xyXG4gICAgdmFyIGxpbmVzID0geG1sLnNwbGl0KCdcXG4nKTtcclxuICAgIHZhciBpbmRlbnQgPSAwO1xyXG4gICAgdmFyIGxhc3RUeXBlID0gJ290aGVyJztcclxuICAgIC8vIDQgdHlwZXMgb2YgdGFncyAtIHNpbmdsZSwgY2xvc2luZywgb3BlbmluZywgb3RoZXIgKHRleHQsIGRvY3R5cGUsIGNvbW1lbnQpIC0gNCo0ID0gMTYgdHJhbnNpdGlvbnMgXHJcbiAgICB2YXIgdHJhbnNpdGlvbnMgPSB7XHJcbiAgICAgICAgJ3NpbmdsZS0+c2luZ2xlJzogMCxcclxuICAgICAgICAnc2luZ2xlLT5jbG9zaW5nJzogLTEsXHJcbiAgICAgICAgJ3NpbmdsZS0+b3BlbmluZyc6IDAsXHJcbiAgICAgICAgJ3NpbmdsZS0+b3RoZXInOiAwLFxyXG4gICAgICAgICdjbG9zaW5nLT5zaW5nbGUnOiAwLFxyXG4gICAgICAgICdjbG9zaW5nLT5jbG9zaW5nJzogLTEsXHJcbiAgICAgICAgJ2Nsb3NpbmctPm9wZW5pbmcnOiAwLFxyXG4gICAgICAgICdjbG9zaW5nLT5vdGhlcic6IDAsXHJcbiAgICAgICAgJ29wZW5pbmctPnNpbmdsZSc6IDEsXHJcbiAgICAgICAgJ29wZW5pbmctPmNsb3NpbmcnOiAwLFxyXG4gICAgICAgICdvcGVuaW5nLT5vcGVuaW5nJzogMSxcclxuICAgICAgICAnb3BlbmluZy0+b3RoZXInOiAxLFxyXG4gICAgICAgICdvdGhlci0+c2luZ2xlJzogMCxcclxuICAgICAgICAnb3RoZXItPmNsb3NpbmcnOiAtMSxcclxuICAgICAgICAnb3RoZXItPm9wZW5pbmcnOiAwLFxyXG4gICAgICAgICdvdGhlci0+b3RoZXInOiAwXHJcbiAgICB9O1xyXG5cclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGluZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICB2YXIgbG4gPSBsaW5lc1tpXTtcclxuICAgICAgICB2YXIgc2luZ2xlID0gQm9vbGVhbihsbi5tYXRjaCgvPC4rXFwvPi8pKTsgLy8gaXMgdGhpcyBsaW5lIGEgc2luZ2xlIHRhZz8gZXguIDxiciAvPlxyXG4gICAgICAgIHZhciBjbG9zaW5nID0gQm9vbGVhbihsbi5tYXRjaCgvPFxcLy4rPi8pKTsgLy8gaXMgdGhpcyBhIGNsb3NpbmcgdGFnPyBleC4gPC9hPlxyXG4gICAgICAgIHZhciBvcGVuaW5nID0gQm9vbGVhbihsbi5tYXRjaCgvPFteIV0uKj4vKSk7IC8vIGlzIHRoaXMgZXZlbiBhIHRhZyAodGhhdCdzIG5vdCA8IXNvbWV0aGluZz4pXHJcbiAgICAgICAgdmFyIHR5cGUgPSBzaW5nbGUgPyAnc2luZ2xlJyA6IGNsb3NpbmcgPyAnY2xvc2luZycgOiBvcGVuaW5nID8gJ29wZW5pbmcnIDogJ290aGVyJztcclxuICAgICAgICB2YXIgZnJvbVRvID0gbGFzdFR5cGUgKyAnLT4nICsgdHlwZTtcclxuICAgICAgICBsYXN0VHlwZSA9IHR5cGU7XHJcbiAgICAgICAgdmFyIHBhZGRpbmcgPSAnJztcclxuXHJcbiAgICAgICAgaW5kZW50ICs9IHRyYW5zaXRpb25zW2Zyb21Ub107XHJcbiAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBpbmRlbnQ7IGorKykge1xyXG4gICAgICAgICAgICBwYWRkaW5nICs9ICdcXHQnO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoZnJvbVRvID09ICdvcGVuaW5nLT5jbG9zaW5nJylcclxuICAgICAgICAgICAgZm9ybWF0dGVkID0gZm9ybWF0dGVkLnN1YnN0cigwLCBmb3JtYXR0ZWQubGVuZ3RoIC0gMSkgKyBsbiArICdcXG4nOyAvLyBzdWJzdHIgcmVtb3ZlcyBsaW5lIGJyZWFrIChcXG4pIGZyb20gcHJldiBsb29wXHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICBmb3JtYXR0ZWQgKz0gcGFkZGluZyArIGxuICsgJ1xcbic7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGZvcm1hdHRlZDtcclxufTtcclxuXHJcbnZhciBzaG93RHVyYXRpb24gPSBmdW5jdGlvbigkc2NvcGUsIHN0YXJ0VGltZSkge1xyXG4gICAgdmFyIGVuZFRpbWUgPSBuZXcgRGF0ZSgpO1xyXG4gICAgJHNjb3BlLmR1cmF0aW9uID0gKGVuZFRpbWUuZ2V0VGltZSgpIC0gc3RhcnRUaW1lLmdldFRpbWUoKSk7XHJcbiAgICAkc2NvcGUucmVxdWVzdEluUHJvZ3Jlc3MgPSBmYWxzZTtcclxufVxyXG5cclxuXHJcblxyXG52YXIgc2hvd0hlYWRlcnMgPSBmdW5jdGlvbigkc2NvcGUsIGhlYWRlcnMsIHN0YXR1cykge1xyXG4gICB2YXIgcmVzcG9uc2VPYmogPSB7fTtcclxuICAgIGlmIChoZWFkZXJzICE9IG51bGwpIHtcclxuICAgICAgICByZXNwb25zZU9iaiA9IGhlYWRlcnMoKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgcmVzcG9uc2VPYmpbXCJTdGF0dXMgQ29kZVwiXSA9IHN0YXR1cztcclxuICAgIHZhciByZXNwb25zZUhlYWRlcnMgPSBoZWFkZXJzVG9TdHJpbmcocmVzcG9uc2VPYmopO1xyXG4gICAgXHJcbiAgICAkc2NvcGUuanNvblZpZXdlci5nZXRTZXNzaW9uKCkuc2V0VmFsdWUoXCJcIik7XHJcbiAgICAkc2NvcGUuanNvblZpZXdlci5nZXRTZXNzaW9uKCkuaW5zZXJ0KDAsIHJlc3BvbnNlSGVhZGVycyk7XHJcbn1cclxuXHJcbnZhciBoZWFkZXJzVG9TdHJpbmcgPSBmdW5jdGlvbihoZWFkZXJzKXtcclxuICAgICAgdmFyIHJldHVyblN0ciA9IFwiXCI7XHJcbiAgICAgIGZvcih2YXIga2V5IGluIGhlYWRlcnMpIHtcclxuICAgICAgICAgIHJldHVyblN0ciArPSBrZXkgKyBcIjogXCIgKyBoZWFkZXJzW2tleV0gKyBcIlxcblwiO1xyXG4gICAgICB9IFxyXG4gICAgcmV0dXJuIHJldHVyblN0cjtcclxufVxyXG5cclxudmFyIHNob3dSZXN1bHRzID0gZnVuY3Rpb24gKCRzY29wZSwgcmVzdWx0cywgaGVhZGVycywgc3RhdHVzKSB7XHJcbiAgICAkc2NvcGUuanNvblZpZXdlci5zZXRWYWx1ZShcIlwiKTtcclxuICAgIHNob3dIZWFkZXJzKCRzY29wZSwgaGVhZGVycywgc3RhdHVzKTtcclxuICAgICRzY29wZS5qc29uVmlld2VyLmdldFNlc3Npb24oKS5pbnNlcnQoMCwgcmVzdWx0cyk7XHJcbn1cclxuXHJcbnZhciBoYW5kbGVJbWFnZVJlc3BvbnNlID0gZnVuY3Rpb24gKCRzY29wZSwgYXBpU2VydmljZSwgc3RhcnRUaW1lLCByZXN1bHRzLCBoZWFkZXJzLCBzdGF0dXMsIGhhbmRsZVVuc3VjY2Vzc2Z1bFF1ZXJ5UmVzcG9uc2UpIHtcclxuICAgIGFwaVNlcnZpY2UucGVyZm9ybVF1ZXJ5KCdHRVRfQklOQVJZJykoJHNjb3BlLnRleHQsIFwiXCIpLnN1Y2Nlc3MoZnVuY3Rpb24gKHJlc3VsdHMsIHN0YXR1cywgaGVhZGVycykge1xyXG4gICAgICAgIHZhciBhcnIgPSBuZXcgVWludDhBcnJheShyZXN1bHRzKTtcclxuICAgICAgICAvLyAgRG9uJ3QgdXNlIGZyb21DaGFyQ29kZS5hcHBseSBhcyBpdCBibG93cyB0aGUgc3RhY2sgd2l0aCBtb2RlcmF0ZSBzaXplIGltYWdlc1xyXG4gICAgICAgIHZhciByYXcgPSBcIlwiO1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJyLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHJhdyA9IHJhdyArIFN0cmluZy5mcm9tQ2hhckNvZGUoYXJyW2ldKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIGI2NCA9IGJ0b2EocmF3KTtcclxuICAgICAgICB2YXIgZGF0YVVSTCA9IFwiZGF0YTppbWFnZS9qcGVnO2Jhc2U2NCxcIiArIGI2NDtcclxuXHJcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJpbWdcIikuc3JjID0gZGF0YVVSTDtcclxuICAgICAgICAkc2NvcGUuc2hvd0pzb25WaWV3ZXIgPSBmYWxzZTtcclxuICAgICAgICAkc2NvcGUuc2hvd0ltYWdlID0gdHJ1ZTtcclxuICAgICAgICBzaG93SGVhZGVycygkc2NvcGUsIGhlYWRlcnMpO1xyXG4gICAgICAgIHNob3dEdXJhdGlvbigkc2NvcGUsIHN0YXJ0VGltZSk7XHJcbiAgICB9KS5lcnJvcihoYW5kbGVVbnN1Y2Nlc3NmdWxRdWVyeVJlc3BvbnNlKTtcclxufVxyXG5cclxudmFyIGhhbmRsZUh0bWxSZXNwb25zZSA9IGZ1bmN0aW9uICgkc2NvcGUsIHN0YXJ0VGltZSwgcmVzdWx0cywgaGVhZGVycywgc3RhdHVzKSB7XHJcbiAgICBzZXRKc29uVmlld2VyQ29udGVudFR5cGUoXCJodG1sXCIpO1xyXG4gICAgc2hvd0R1cmF0aW9uKCRzY29wZSwgc3RhcnRUaW1lKTtcclxuICAgIHNob3dSZXN1bHRzKCRzY29wZSwgcmVzdWx0cywgaGVhZGVycywgc3RhdHVzKTtcclxufVxyXG5cclxudmFyIGhhbmRsZUpzb25SZXNwb25zZSA9IGZ1bmN0aW9uICgkc2NvcGUsIHN0YXJ0VGltZSwgcmVzdWx0cywgaGVhZGVycywgc3RhdHVzKSB7XHJcbiAgICBzZXRKc29uVmlld2VyQ29udGVudFR5cGUoXCJqc29uXCIpO1xyXG4gICAgcmVzdWx0cyA9IEpTT04uc3RyaW5naWZ5KHJlc3VsdHMsIG51bGwsIDQpO1xyXG4gICAgc2hvd0R1cmF0aW9uKCRzY29wZSwgc3RhcnRUaW1lKTtcclxuICAgIHNob3dSZXN1bHRzKCRzY29wZSwgcmVzdWx0cywgaGVhZGVycywgc3RhdHVzKTtcclxufVxyXG5cclxudmFyIGhhbmRsZVhtbFJlc3BvbnNlID0gZnVuY3Rpb24gKCRzY29wZSwgc3RhcnRUaW1lLCByZXN1bHRzLCBoZWFkZXJzLCBzdGF0dXMpIHtcclxuICAgIHNldEpzb25WaWV3ZXJDb250ZW50VHlwZShcInhtbFwiKTtcclxuICAgIHJlc3VsdHMgPSBmb3JtYXRYbWwocmVzdWx0cyk7XHJcbiAgICBzaG93RHVyYXRpb24oJHNjb3BlLCBzdGFydFRpbWUpO1xyXG4gICAgc2hvd1Jlc3VsdHMoJHNjb3BlLCByZXN1bHRzLCBoZWFkZXJzLCBzdGF0dXMpO1xyXG59XHJcblxyXG52YXIgaXNJbWFnZVJlc3BvbnNlID0gZnVuY3Rpb24gKGhlYWRlcnMpIHtcclxuICAgIHZhciBjb250ZW50VHlwZSA9IGdldENvbnRlbnRUeXBlKGhlYWRlcnMpO1xyXG4gICAgcmV0dXJuIGNvbnRlbnRUeXBlID09PSBcImFwcGxpY2F0aW9uL29jdGV0LXN0cmVhbVwiIHx8IGNvbnRlbnRUeXBlLnN1YnN0cigwLCA2KSA9PT0gXCJpbWFnZS9cIjtcclxufVxyXG5cclxudmFyIGlzSHRtbFJlc3BvbnNlID0gZnVuY3Rpb24gKGhlYWRlcnMpIHtcclxuICAgIHZhciBjb250ZW50VHlwZSA9IGdldENvbnRlbnRUeXBlKGhlYWRlcnMpO1xyXG4gICAgcmV0dXJuIGNvbnRlbnRUeXBlID09PSBcInRleHQvaHRtbFwiIHx8IGNvbnRlbnRUeXBlID09PSBcImFwcGxpY2F0aW9uL3hodG1sK3htbFwiO1xyXG59XHJcblxyXG52YXIgaXNYbWxSZXNwb25zZSA9IGZ1bmN0aW9uIChyZXN1bHRzKSB7XHJcbiAgICAvLyBEb24ndCB1c2UgaGVhZGVycywgY29zIHhtbCBjb3VsZCBiZSBvZiBhIG1pbGxpb24gY29udGVudCB0eXBlcy5cclxuICAgIHJldHVybiBKU09OLnN0cmluZ2lmeShyZXN1bHRzLCBudWxsLCA0KS5pbmRleE9mKFwiPD94bWxcIikgIT0gLTE7XHJcbn1cclxuXHJcbnZhciBpc0pzb25SZXNwb25zZSA9IGZ1bmN0aW9uIChoZWFkZXJzKSB7XHJcbiAgICB2YXIgY29udGVudFR5cGUgPSBnZXRDb250ZW50VHlwZShoZWFkZXJzKTtcclxuICAgIHJldHVybiBjb250ZW50VHlwZSA9PT0gXCJhcHBsaWNhdGlvbi9qc29uXCI7XHJcbn1cclxuXHJcbnZhciBnZXRDb250ZW50VHlwZSA9IGZ1bmN0aW9uKGhlYWRlcnMpIHtcclxuICAgIHZhciBmdWxsID0gaGVhZGVycyhcImNvbnRlbnQtdHlwZVwiKTtcclxuICAgIHZhciBkZWxpbWl0ZXJQb3MgPSBmdWxsLmluZGV4T2YoXCI7XCIpO1xyXG4gICAgaWYgKGRlbGltaXRlclBvcyAhPSAtMSkge1xyXG4gICAgICAgIHJldHVybiBmdWxsLnN1YnN0cigwLCBkZWxpbWl0ZXJQb3MpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICByZXR1cm4gZnVsbDtcclxuICAgIH1cclxufVxyXG5cclxuXHJcblxyXG52YXIgZ2V0RW50aXR5U2V0cyA9IGZ1bmN0aW9uKFhNTCkge1xyXG4gICAgdmFyIGVudGl0eVNldEFycmF5ID0ge307XHJcbiAgICB2YXIgZW50aXR5U2V0cyA9ICQoKCQucGFyc2VIVE1MKFhNTCkpWzJdKS5maW5kKFwiRW50aXR5Q29udGFpbmVyXCIpWzBdLmNoaWxkcmVuO1xyXG4gICAgZm9yKHZhciBpPTA7IGk8ZW50aXR5U2V0cy5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgdmFyIEVudGl0eVNldCA9IHt9O1xyXG4gICAgICAgICAgIHZhciBuYW1lID0gZW50aXR5U2V0c1tpXS5hdHRyaWJ1dGVzWzBdLm5vZGVWYWx1ZTtcclxuICAgICAgICAgICBuYW1lID0gbmFtZS5zdWJzdHJpbmcoMiwgbmFtZS5sZW5ndGgtMik7XHJcbiAgICAgICAgICAgRW50aXR5U2V0Lm5hbWUgPSBuYW1lO1xyXG4gICAgICAgICAgIEVudGl0eVNldC5pc0VudGl0eVNldCA9IHRydWU7XHJcbiAgICAgICAgICAgRW50aXR5U2V0LlVSTFMgPSBbXTtcclxuICAgICAgICAgICB2YXIgdHlwZSA9IGVudGl0eVNldHNbaV0uYXR0cmlidXRlc1sxXS5ub2RlVmFsdWU7XHJcbiAgICAgICAgICAgdmFyIGluZGV4ID0gdHlwZS5pbmRleE9mKFwiZ3JhcGguXCIpXHJcbiAgICAgICAgICAgdHlwZSA9IHR5cGUuc3Vic3RyaW5nKGluZGV4KzYsIHR5cGUubGVuZ3RoLTIpO1xyXG4gICAgICAgICAgIEVudGl0eVNldC5lbnRpdHlUeXBlID0gdHlwZTtcclxuICAgICAgICAgICBlbnRpdHlTZXRBcnJheVtFbnRpdHlTZXQubmFtZV0gPSBFbnRpdHlTZXQ7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZW50aXR5U2V0QXJyYXk7XHJcbn1cclxuXHJcblxyXG5cclxudmFyIGZpbmROYW1lSW5kZXggPSBmdW5jdGlvbihhcnJheSkge1xyXG4gICAgZm9yKHZhciBpPTA7IGk8YXJyYXkubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBpZihhcnJheVtpXS5uYW1lID09PSBcIm5hbWVcIikge1xyXG4gICAgICAgICAgICByZXR1cm4gaTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbnZhciBmaW5kVHlwZUluZGV4ID0gZnVuY3Rpb24oYXJyYXkpe1xyXG4gICAgZm9yKHZhciBpPTA7IGk8YXJyYXkubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgIGlmKGFycmF5W2ldLm5hbWUgPT09IFwidHlwZVwiKXtcclxuICAgICAgICAgICAgcmV0dXJuIGk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG52YXIgZm9ybWF0UmVxdWVzdEhlYWRlcnMgPSBmdW5jdGlvbihoZWFkZXJzKXtcclxuICAgIHZhciBvYmogPSB7fTtcclxuICAgIHZhciBwYXJ0cyA9IGhlYWRlcnMucmVwbGFjZSgvXlxccyt8LFxccyokL2csICcnKS5zcGxpdCgnXFxuJyk7XHJcbiAgICBcclxuICAgIGZvcih2YXIgaSA9IDAsIGxlbiA9IHBhcnRzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XHJcbiAgICAgICAgdmFyIG1hdGNoID0gcGFydHNbaV0ubWF0Y2goL15cXHMqXCI/KFteXCI6XSopXCI/XFxzKjpcXHMqXCI/KFteXCJdKilcXHMqJC8pO1xyXG4gICAgICAgIGlmKG1hdGNoKSB7XHJcbiAgICAgICAgICAgIG9ialttYXRjaFsxXV0gPSBtYXRjaFsyXTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBcclxuICAgcmV0dXJuIG9iajsgXHJcbn1cclxuXHJcbnZhciBjcmVhdGVFbnRpdHlUeXBlT2JqZWN0ID0gZnVuY3Rpb24ocmV0dXJuQXJyYXksIERPTWFycmF5KSB7XHJcbiAgICBmb3IodmFyIGk9MDsgaTxET01hcnJheS5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgdmFyIEVudGl0eVR5cGUgPSB7fTtcclxuICAgICAgICAgICB2YXIgbmFtZSA9IERPTWFycmF5W2ldLmF0dHJpYnV0ZXNbXCJuYW1lXCJdLm5vZGVWYWx1ZTtcclxuICAgICAgICAgICBuYW1lID0gbmFtZS5zdWJzdHJpbmcoMiwgbmFtZS5sZW5ndGgtMik7XHJcbiAgICAgICAgICAgRW50aXR5VHlwZS5uYW1lID0gbmFtZTtcclxuICAgICAgICAgICBFbnRpdHlUeXBlLmlzRW50aXR5U2V0ID0gZmFsc2U7XHJcbiAgICAgICAgICAgRW50aXR5VHlwZS5VUkxTID0gW107XHJcbiAgICAgICAgICAgdmFyIGNoaWxkcmVuID0gRE9NYXJyYXlbaV0uY2hpbGRyZW47XHJcbiAgICAgICAgICAgZm9yKHZhciBqPTA7IGo8Y2hpbGRyZW4ubGVuZ3RoOyBqKyspe1xyXG4gICAgICAgICAgICAgICAgIGlmKGNoaWxkcmVuW2pdLmF0dHJpYnV0ZXMubGVuZ3RoID4gMCl7XHJcbiAgICAgICAgICAgICAgICAgICAgIHZhciBuYW1lSW5kZXggPSBmaW5kTmFtZUluZGV4KGNoaWxkcmVuW2pdLmF0dHJpYnV0ZXMpO1xyXG4gICAgICAgICAgICAgICAgICAgICB2YXIgdHlwZUluZGV4ID0gZmluZFR5cGVJbmRleChjaGlsZHJlbltqXS5hdHRyaWJ1dGVzKTtcclxuICAgICAgICAgICAgICAgICAgICAgdmFyIGNoaWxkTmFtZSA9IGNoaWxkcmVuW2pdLmF0dHJpYnV0ZXNbbmFtZUluZGV4XS5ub2RlVmFsdWU7XHJcbiAgICAgICAgICAgICAgICAgICAgIGNoaWxkTmFtZSA9IGNoaWxkTmFtZS5zdWJzdHJpbmcoMiwgY2hpbGROYW1lLmxlbmd0aC0yKTtcclxuICAgICAgICAgICAgICAgICAgICAgdmFyIGNvbGxlY3Rpb24gPSBjaGlsZHJlbltqXS5hdHRyaWJ1dGVzW3R5cGVJbmRleF0ubm9kZVZhbHVlO1xyXG4gICAgICAgICAgICAgICAgICAgICBjb2xsZWN0aW9uID0gY29sbGVjdGlvbi5zdWJzdHJpbmcoMiwgMTIpO1xyXG4gICAgICAgICAgICAgICAgICAgICB2YXIgdHlwZSA9IGNoaWxkcmVuW2pdLmF0dHJpYnV0ZXNbdHlwZUluZGV4XS5ub2RlVmFsdWU7XHJcbiAgICAgICAgICAgICAgICAgICAgIHZhciBpbmRleCA9IHR5cGUubGFzdEluZGV4T2YoXCIuXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgIHR5cGUgPSB0eXBlLnN1YnN0cmluZyhpbmRleCsxLCB0eXBlLmxlbmd0aC0yKTtcclxuICAgICAgICAgICAgICAgICAgICAgaWYodHlwZS5jaGFyQXQodHlwZS5sZW5ndGgtMSkgPT0gXCIpXCIpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgdHlwZSA9IHR5cGUuc3Vic3RyaW5nKDAsIHR5cGUubGVuZ3RoLTEpO1xyXG4gICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgIHZhciB1cmxPYmplY3QgPSB7fTtcclxuICAgICAgICAgICAgICAgICAgICAgdXJsT2JqZWN0LmlzQUNvbGxlY3Rpb24gPSAoY29sbGVjdGlvbiA9PT0gXCJDb2xsZWN0aW9uXCIpICYmIChpbmRleCA+MCk7XHJcbiAgICAgICAgICAgICAgICAgICAgIHVybE9iamVjdC5uYW1lID0gY2hpbGROYW1lO1xyXG4gICAgICAgICAgICAgICAgICAgICB1cmxPYmplY3QudHlwZSA9IHR5cGU7XHJcbiAgICAgICAgICAgICAgICAgICAgIEVudGl0eVR5cGUuVVJMUy5wdXNoKHVybE9iamVjdCk7XHJcbiAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICAgICAgcmV0dXJuQXJyYXlbRW50aXR5VHlwZS5uYW1lXSA9IEVudGl0eVR5cGU7XHJcbiAgICB9ICAgIFxyXG4gICAgcmV0dXJuIHJldHVybkFycmF5O1xyXG59XHJcblxyXG52YXIgc2hvd1JlcXVlc3RIZWFkZXJzID0gZnVuY3Rpb24oJHNjb3BlKSB7XHJcbiAgICBpZiAoISRzY29wZS5qc29uRWRpdG9ySGVhZGVycykgcmV0dXJuO1xyXG4gICAgJHNjb3BlLmpzb25FZGl0b3JIZWFkZXJzLmdldFNlc3Npb24oKS5zZXRWYWx1ZShcIlwiKTtcclxuICAgIHZhciByZXF1ZXN0SGVhZGVycyA9IFwiQ29udGVudC1UeXBlOiBhcHBsaWNhdGlvbi9qc29uXCJcclxuICAgICRzY29wZS5qc29uRWRpdG9ySGVhZGVycy5nZXRTZXNzaW9uKCkuaW5zZXJ0KDAsIHJlcXVlc3RIZWFkZXJzKTtcclxufVxyXG5cclxudmFyIGdldEVudGl0eVR5cGVzID0gZnVuY3Rpb24oWE1MKXtcclxuICAgIHZhciBlbnRpdHlUeXBlc0FycmF5ID0ge307XHJcbiAgICB2YXIgZW50aXR5VHlwZXMgPSAkKCgkLnBhcnNlSFRNTChYTUwpKVsyXSkuZmluZChcIkVudGl0eVR5cGVcIik7XHJcbiAgICBlbnRpdHlUeXBlc0FycmF5ID0gY3JlYXRlRW50aXR5VHlwZU9iamVjdChlbnRpdHlUeXBlc0FycmF5LCBlbnRpdHlUeXBlcyk7XHJcbiAgICBcclxuICAgIHZhciBjb21wbGV4VHlwZXMgPSAkKCgkLnBhcnNlSFRNTChYTUwpKVsyXSkuZmluZChcIkNvbXBsZXhUeXBlXCIpO1xyXG4gICAgZW50aXR5VHlwZXNBcnJheSA9IGNyZWF0ZUVudGl0eVR5cGVPYmplY3QoZW50aXR5VHlwZXNBcnJheSwgY29tcGxleFR5cGVzKTtcclxuICAgIFxyXG4gICAgcmV0dXJuIGVudGl0eVR5cGVzQXJyYXk7XHJcbn1cclxuXHJcbnZhciBteVRyaW0gPSBmdW5jdGlvbih3b3JkKXtcclxuICAgICAgdmFyIHJldHVybldvcmQgPSB3b3JkO1xyXG4gICAgICBpZihyZXR1cm5Xb3JkICE9IG51bGwpe1xyXG4gICAgICAgICAgd2hpbGUocmV0dXJuV29yZC5jaGFyQXQocmV0dXJuV29yZC5sZW5ndGgtMSkgPT0gXCIvXCIgKXtcclxuICAgICAgICAgICAgICByZXR1cm5Xb3JkID0gcmV0dXJuV29yZC5yZXBsYWNlKC9cXC8kLywgXCJcIik7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICByZXR1cm4gcmV0dXJuV29yZDsgXHJcbiAgICAgIH1cclxufSBcclxuXHJcbnZhciBnZXRFbnRpdHlOYW1lID0gZnVuY3Rpb24oVVJMKXtcclxuICAgICB2YXIgcmV0dXJuV29yZCA9IG15VHJpbShVUkwpO1xyXG4gICAgIGlmKHJldHVybldvcmQgIT0gbnVsbCl7XHJcbiAgICAgICAgIHJldHVybldvcmQgPSByZXR1cm5Xb3JkLnN1YnN0cmluZyhyZXR1cm5Xb3JkLmxhc3RJbmRleE9mKFwiL1wiKSsxLCByZXR1cm5Xb3JkLmxlbmd0aCk7XHJcbiAgICAgfVxyXG4gICAgIHJldHVybiByZXR1cm5Xb3JkO1xyXG59XHJcblxyXG5cclxudmFyIGdldFByZXZpb3VzQ2FsbCA9IGZ1bmN0aW9uKFVSTCwgZW50aXR5TmFtZSl7XHJcbiAgICB2YXIgaW5kZXggPSBVUkwuaW5kZXhPZihlbnRpdHlOYW1lKTtcclxuICAgIHJldHVybiBVUkwuc3Vic3RyKDAsIGluZGV4LTEpO1xyXG59XHJcblxyXG5cclxudmFyIHNldEVudGl0eSA9IGZ1bmN0aW9uKGVudGl0eUl0ZW0sIHNlcnZpY2UsIGxhc3RDYWxsU3VjY2Vzc2Z1bCkge1xyXG4gICAgXHJcbiAgIGlmIChnZXRFbnRpdHlOYW1lKHNlcnZpY2UudGV4dCkgPT0gc2VydmljZS5zZWxlY3RlZFZlcnNpb24pIHtcclxuICAgICAgICAgICAgIHZhciBlbnRpdHlPYmogPSB7fTtcclxuICAgICAgICAgICAgIGVudGl0eU9iai5uYW1lID0gc2VydmljZS5zZWxlY3RlZFZlcnNpb247XHJcbiAgICAgICAgICAgICBzZXJ2aWNlLmVudGl0eSA9IGVudGl0eU9iajsgXHJcbiAgICAgICAgICAgICByZXR1cm47XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgdmFyIGVudGl0eU5hbWUgPSBnZXRFbnRpdHlOYW1lKHNlcnZpY2UudGV4dCk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHZhciBwcmV2Q2FsbE5hbWUgPSBnZXRFbnRpdHlOYW1lKGdldFByZXZpb3VzQ2FsbChzZXJ2aWNlLnRleHQsIGVudGl0eU5hbWUpKTtcclxuICAgIHZhciB0d29QcmV2Q2FsbHNOYW1lID0gZ2V0RW50aXR5TmFtZShnZXRQcmV2aW91c0NhbGwoZ2V0UHJldmlvdXNDYWxsKHNlcnZpY2UudGV4dCwgZW50aXR5TmFtZSksIHByZXZDYWxsTmFtZSkpO1xyXG4gICAgaWYgKGVudGl0eU5hbWUgPT09IFwibWVcIiAmJiBsYXN0Q2FsbFN1Y2Nlc3NmdWwpIHtcclxuICAgICAgICBwcmV2Q2FsbE5hbWUgPSBcInVzZXJzXCI7XHJcbiAgICB9IGVsc2UgaWYgKHR3b1ByZXZDYWxsc05hbWUgPT09IFwibWVcIiAmJiBsYXN0Q2FsbFN1Y2Nlc3NmdWwpIHtcclxuICAgICAgICB0d29QcmV2Q2FsbHNOYW1lID0gXCJ1c2VyXCI7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHZhciBlbnRpdHlTZXQgPSBzZXJ2aWNlLmNhY2hlLmdldChzZXJ2aWNlLnNlbGVjdGVkVmVyc2lvbiArIFwiRW50aXR5U2V0RGF0YVwiKVtwcmV2Q2FsbE5hbWVdO1xyXG4gICAgdmFyIGVudGl0eVR5cGUgPSBzZXJ2aWNlLmNhY2hlLmdldChzZXJ2aWNlLnNlbGVjdGVkVmVyc2lvbiArIFwiRW50aXR5VHlwZURhdGFcIilbcHJldkNhbGxOYW1lXTsgXHJcbiAgICB2YXIgdHdvUHJldkVudGl0eVR5cGUgPSBzZXJ2aWNlLmNhY2hlLmdldChzZXJ2aWNlLnNlbGVjdGVkVmVyc2lvbiArIFwiRW50aXR5VHlwZURhdGFcIilbdHdvUHJldkNhbGxzTmFtZV07XHJcbiAgICB2YXIgdHdvUHJldkVudGl0eVNldCA9IHNlcnZpY2UuY2FjaGUuZ2V0KHNlcnZpY2Uuc2VsZWN0ZWRWZXJzaW9uICsgXCJFbnRpdHlTZXREYXRhXCIpW3R3b1ByZXZDYWxsc05hbWVdO1xyXG4gICAgdmFyIGNvbGxlY3Rpb24gPSBmYWxzZTtcclxuICAgIGlmICh0d29QcmV2RW50aXR5U2V0KSB7XHJcbiAgICAgICAgZm9yKHZhciBpPTA7IGk8dHdvUHJldkVudGl0eVNldC5VUkxTLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgaWYodHdvUHJldkVudGl0eVNldC5VUkxTW2ldLm5hbWUgPT0gcHJldkNhbGxOYW1lKXtcclxuICAgICAgICAgICAgICAgIGNvbGxlY3Rpb24gPSB0d29QcmV2RW50aXR5U2V0LlVSTFNbaV0uaXNBQ29sbGVjdGlvbjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0gZWxzZSBpZiAodHdvUHJldkVudGl0eVR5cGUpIHtcclxuICAgICAgICBmb3IodmFyIGk9MDsgaTx0d29QcmV2RW50aXR5VHlwZS5VUkxTLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgaWYodHdvUHJldkVudGl0eVR5cGUuVVJMU1tpXS5uYW1lID09IHByZXZDYWxsTmFtZSl7XHJcbiAgICAgICAgICAgICAgICBjb2xsZWN0aW9uID0gdHdvUHJldkVudGl0eVR5cGUuVVJMU1tpXS5pc0FDb2xsZWN0aW9uO1xyXG4gICAgICAgICAgICAgICAgdmFyIGNvbGxlY3Rpb25UeXBlID0gdHdvUHJldkVudGl0eVR5cGUuVVJMU1tpXS50eXBlO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHNlcnZpY2UuZW50aXR5TmFtZUlzQW5JZCA9XHJcbiAgICAgICAgKCgoZW50aXR5U2V0ICYmICFlbnRpdHlUeXBlKSB8fCAoZW50aXR5U2V0ICYmIHR3b1ByZXZDYWxsc05hbWUgPT09IHNlcnZpY2Uuc2VsZWN0ZWRWZXJzaW9uKSlcclxuICAgICAgICAmJiBsYXN0Q2FsbFN1Y2Nlc3NmdWwgJiYgKHByZXZDYWxsTmFtZSAhPSBcIm1lXCIpKVxyXG4gICAgICAgIHx8IChjb2xsZWN0aW9uICYmIGxhc3RDYWxsU3VjY2Vzc2Z1bCk7XHJcbiAgICBcclxuICAgIGlmIChzZXJ2aWNlLmVudGl0eU5hbWVJc0FuSWQpIHtcclxuICAgICAgICAvLyRsb2cubG9nKFwiZW50aXR5IG5hbWUgaXMgYW4gaWRcIik7XHJcbiAgICAgICAgdmFyIHR5cGVOYW1lO1xyXG4gICAgICAgIGlmIChjb2xsZWN0aW9uKSB7XHJcbiAgICAgICAgICAgIC8vJGxvZy5sb2coXCJpcyBhIGNvbGxlY3Rpb25cIik7XHJcbiAgICAgICAgICAgIHR5cGVOYW1lID0gY29sbGVjdGlvblR5cGU7XHJcbiAgICAgICAgICAgIC8vJGxvZy5sb2codHlwZU5hbWUpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoZW50aXR5U2V0KSB7XHJcbiAgICAgICAgICAgIHR5cGVOYW1lID0gZW50aXR5U2V0LmVudGl0eVR5cGU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzZXJ2aWNlLmVudGl0eSA9IHNlcnZpY2UuY2FjaGUuZ2V0KHNlcnZpY2Uuc2VsZWN0ZWRWZXJzaW9uICsgXCJFbnRpdHlUeXBlRGF0YVwiKVt0eXBlTmFtZV07XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgICBpZiAoIWVudGl0eVR5cGUgJiYgZW50aXR5U2V0KSB7XHJcbiAgICAgICAgICAgIGVudGl0eVR5cGUgPSBzZXRUb1NldE9yVHlwZShzZXJ2aWNlLCBlbnRpdHlTZXQuZW50aXR5VHlwZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoZW50aXR5VHlwZSkge1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgLy8gSUUgY2xhaW1zIGFycmF5LmZpbmQgY29kZSBiZWxvdyBoYXMgc3ludGF4IGVycm9yLCBwcm9iYWJseSBkdWUgdG8gbGFjayBvZiBzdXBwb3J0LlxyXG4gICAgICAgICAgICAvLyB2YXIgbWF0Y2hpbmdFbGVtZW50ID0gZW50aXR5VHlwZS5VUkxTLmZpbmQodSA9PiB1Lm5hbWUgPT09IGVudGl0eU5hbWUgJiYgIXUuaXNBQ29sbGVjdGlvbik7XHJcbiAgICAgICAgICAgIHZhciBtYXRjaGluZ0VsZW1lbnQgPSBudWxsO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGVudGl0eVR5cGUuVVJMUy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgaWYgKGVudGl0eVR5cGUuVVJMU1tpXS5uYW1lID09IGVudGl0eU5hbWUgJiYgIWVudGl0eVR5cGUuVVJMU1tpXS5pc0FDb2xsZWN0aW9uKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbWF0Y2hpbmdFbGVtZW50ID0gZW50aXR5VHlwZS5VUkxTW2ldO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAobWF0Y2hpbmdFbGVtZW50KSB7XHJcbiAgICAgICAgICAgICAgICBzZXJ2aWNlLmVudGl0eSA9IHNldFRvU2V0T3JUeXBlKHNlcnZpY2UsIG1hdGNoaW5nRWxlbWVudC50eXBlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHNlcnZpY2UuZW50aXR5ID0gbnVsbDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHNlcnZpY2UuZW50aXR5ID0gc2V0VG9TZXRPclR5cGUoc2VydmljZSwgZW50aXR5TmFtZSwgcHJldkNhbGxOYW1lKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbnZhciBzZXRUb1NldE9yVHlwZSA9IGZ1bmN0aW9uKHNlcnZpY2UsIGVudGl0eU5hbWUsIHByZXZDYWxsTmFtZSkge1xyXG4gICAgICB2YXIgaXNFbnRpdHlTZXQgPSBzZXJ2aWNlLmNhY2hlLmdldChzZXJ2aWNlLnNlbGVjdGVkVmVyc2lvbiArIFwiRW50aXR5U2V0RGF0YVwiKVtlbnRpdHlOYW1lXTtcclxuICAgICAgdmFyIGlzRW50aXR5VHlwZSA9IHNlcnZpY2UuY2FjaGUuZ2V0KHNlcnZpY2Uuc2VsZWN0ZWRWZXJzaW9uICsgXCJFbnRpdHlUeXBlRGF0YVwiKVtlbnRpdHlOYW1lXTtcclxuICAgICAgaWYoaXNFbnRpdHlTZXQgJiYgIWlzRW50aXR5VHlwZSl7XHJcbiAgICAgICAgICByZXR1cm4gaXNFbnRpdHlTZXQ7XHJcbiAgICAgIH1lbHNlIGlmKGlzRW50aXR5VHlwZSAmJiAhaXNFbnRpdHlTZXQpe1xyXG4gICAgICAgICAgcmV0dXJuIGlzRW50aXR5VHlwZTtcclxuICAgICAgfWVsc2UgaWYoaXNFbnRpdHlTZXQgJiYgaXNFbnRpdHlUeXBlKXtcclxuICAgICAgICAgICBpZihwcmV2Q2FsbE5hbWUgPT09IHNlcnZpY2Uuc2VsZWN0ZWRWZXJzaW9uKXtcclxuICAgICAgICAgICAgICAgcmV0dXJuIGlzRW50aXR5U2V0XHJcbiAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgIHJldHVybiBpc0VudGl0eVR5cGU7XHJcbiAgICAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICBcclxufVxyXG5cclxudmFyIHNob3dSZXF1ZXN0Qm9keUVkaXRvciA9IGZ1bmN0aW9uKCkge1xyXG4gICAgcy50YWJDb25maWcuZGlzYWJsZVJlcXVlc3RCb2R5RWRpdG9yID0gZmFsc2U7XHJcbiAgICBzLnRhYkNvbmZpZy5oaWRlQ29udGVudCA9IGZhbHNlO1xyXG4gICAgc2hvd1JlcXVlc3RIZWFkZXJzKHMpO1xyXG4gICAgJChmdW5jdGlvbigpIHtcclxuICAgICAgICBpbml0aWFsaXplSnNvbkVkaXRvcihzKTtcclxuICAgICAgICBzZXRTZWxlY3RlZFRhYigxKTtcclxuICAgIH0pXHJcbn1cclxuXHJcbnZhciBzZXRTZWxlY3RlZFRhYiA9IGZ1bmN0aW9uKG51bSkge1xyXG4gICAgaWYgKG51bSA+PSAyIHx8IG51bSA8IDApIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBzLnRhYkNvbmZpZy5zZWxlY3RlZCA9IG51bTtcclxuICAgIHMudGFiQ29uZmlnLnByZXZpb3VzU2VsZWN0ZWQgPSBzLnRhYkNvbmZpZy5zZWxlY3RlZDtcclxufVxyXG5cclxudmFyIGhhbmRsZVF1ZXJ5U3RyaW5nID0gZnVuY3Rpb24oc2VydmljZSwgYWN0aW9uVmFsdWUsIHZlcnNpb25WYWx1ZSwgcmVxdWVzdFZhbHVlKSB7XHJcbiAgICBpZihhY3Rpb25WYWx1ZSl7XHJcbiAgICAgICAgc2VydmljZS5zZWxlY3RlZE9wdGlvbiA9IGFjdGlvblZhbHVlLnRvVXBwZXJDYXNlKCk7XHJcbiAgICAgICAgaWYoc2VydmljZS5zZWxlY3RlZE9wdGlvbiA9PT0gJ1BPU1QnIHx8IHNlcnZpY2Uuc2VsZWN0ZWRPcHRpb24gPT09ICdQQVRDSCcpIHtcclxuICAgICAgICAgICAgaWYoaGVsbG8oJ21zZnQnKS5nZXRBdXRoUmVzcG9uc2UoKSAhPSBudWxsKVxyXG4gICAgICAgICAgICAgICAgc2hvd1JlcXVlc3RCb2R5RWRpdG9yKCk7XHJcbiAgICAgICAgfVxyXG4gICB9XHJcbiAgICAgICAgXHJcbiAgIGlmICh2ZXJzaW9uVmFsdWUpIHtcclxuICAgICAgICBzZXJ2aWNlLnNlbGVjdGVkVmVyc2lvbiA9IHZlcnNpb25WYWx1ZTtcclxuICAgfVxyXG4gICBpZiAocmVxdWVzdFZhbHVlKSB7XHJcbiAgICAgICAgc2VydmljZS50ZXh0ID0gXCJodHRwczovL2dyYXBoLm1pY3Jvc29mdC5jb20vXCIgKyBzZXJ2aWNlLnNlbGVjdGVkVmVyc2lvbiArIFwiL1wiICsgcmVxdWVzdFZhbHVlO1xyXG4gICB9XHJcbn1cclxuXHJcbnZhciBwYXJzZU1ldGFkYXRhID0gZnVuY3Rpb24oc2VydmljZSwgJHNjb3BlKXtcclxuICAgIHZhciBlbnRpdHlTZXREYXRhLCBlbnRpdHlUeXBlRGF0YTtcclxuICAgIGlmKCFzZXJ2aWNlLmNhY2hlLmdldChzZXJ2aWNlLnNlbGVjdGVkVmVyc2lvbiArIFwiTWV0YWRhdGFcIikpIHtcclxuICAgICAgICAgY29uc29sZS5sb2coXCJwYXJzaW5nIG1ldGFkYXRhXCIpO1xyXG4gICAgICAgICBzZXJ2aWNlLmdldE1ldGFkYXRhKCkudGhlbihmdW5jdGlvbihyZXN1bHRzKSB7XHJcbiAgICAgICAgICAgICAgICByZXN1bHRzID0gSlNPTi5zdHJpbmdpZnkocmVzdWx0cykudHJpbSgpO1xyXG4gICAgICAgICAgICAgICAgc2VydmljZS5jYWNoZS5wdXQoc2VydmljZS5zZWxlY3RlZFZlcnNpb24gKyBcIk1ldGFkYXRhXCIsIHJlc3VsdHMpO1xyXG4gICAgICAgICAgICAgICAgZW50aXR5U2V0RGF0YSA9IGdldEVudGl0eVNldHMocmVzdWx0cyk7XHJcbiAgICAgICAgICAgICAgICBzZXJ2aWNlLmNhY2hlLnB1dChzZXJ2aWNlLnNlbGVjdGVkVmVyc2lvbiArIFwiRW50aXR5U2V0RGF0YVwiLCBlbnRpdHlTZXREYXRhKTtcclxuICAgICAgICAgICAgICAgIGVudGl0eVR5cGVEYXRhID0gZ2V0RW50aXR5VHlwZXMocmVzdWx0cyk7XHJcbiAgICAgICAgICAgICAgICBzZXJ2aWNlLmNhY2hlLnB1dChzZXJ2aWNlLnNlbGVjdGVkVmVyc2lvbiArIFwiRW50aXR5VHlwZURhdGFcIiwgZW50aXR5VHlwZURhdGEpO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJtZXRhZGF0YSBzdWNjZXNzZnVsbHkgcGFyc2VkXCIpO1xyXG4gICAgICAgICAgICAgICAgaWYoc2VydmljZS5lbnRpdHkgPT0gXCJcIil7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VydmljZS5lbnRpdHkgPSBlbnRpdHlUeXBlRGF0YVtcInVzZXJcIl07XHJcbiAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICBzZXJ2aWNlLmVudGl0eSA9IGVudGl0eVR5cGVEYXRhW2dldEVudGl0eU5hbWUoc2VydmljZS50ZXh0KV07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICRzY29wZS4kcm9vdC4kYnJvYWRjYXN0KFwidXBkYXRlVXJsT3B0aW9uc1wiKTtcclxuICAgICAgICAgfSwgZnVuY3Rpb24oZXJyLCBzdGF0dXMpe1xyXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKFwibWV0YWRhdGEgY291bGQgbm90IGJlIHBhcnNlZFwiKTtcclxuICAgICAgICAgfSk7XHJcbiAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICRzY29wZS4kcm9vdC4kYnJvYWRjYXN0KFwidXBkYXRlVXJsT3B0aW9uc1wiKTtcclxuICAgICB9XHJcbn0iLCIvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuLy8gIENvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiAgQWxsIFJpZ2h0cyBSZXNlcnZlZC4gIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gIFNlZSBMaWNlbnNlIGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXHJcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cclxuJ3VzZSBzdHJpY3QnO1xyXG5cclxuYW5ndWxhci5tb2R1bGUoJ0FwaUV4cGxvcmVyJylcclxuLmNvbmZpZyhmdW5jdGlvbigkbG9jYXRpb25Qcm92aWRlcikge1xyXG4gICAgJGxvY2F0aW9uUHJvdmlkZXIuaHRtbDVNb2RlKHtcclxuICAgICAgICBlbmFibGVkOiB0cnVlLFxyXG4gICAgICAgIHJlcXVpcmVCYXNlOiBmYWxzZVxyXG4gICAgfSk7XHJcbiAgICBcclxufSlcclxuLmZhY3RvcnkoJ0FwaUV4cGxvcmVyU3ZjJywgW2Z1bmN0aW9uICgpIHtcclxuICAgIHZhciBhcGlFeHBsb3JlclNlcnZpY2UgPSB7fTtcclxuICAgIHJldHVybiBhcGlFeHBsb3JlclNlcnZpY2U7XHJcbn1dKTsiLCIvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuLy8gIENvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiAgQWxsIFJpZ2h0cyBSZXNlcnZlZC4gIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gIFNlZSBMaWNlbnNlIGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXHJcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cclxuJ3VzZSBzdHJpY3QnO1xyXG5cclxuYW5ndWxhci5tb2R1bGUoJ0FwaUV4cGxvcmVyJylcclxuICAgIC5mYWN0b3J5KCdBcGlFeHBsb3JlclN2YycsIFsnJGh0dHAnLCAnJGNhY2hlRmFjdG9yeScsIGZ1bmN0aW9uICgkaHR0cCwgJGNhY2hlRmFjdG9yeSkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHRleHQ6ICdodHRwczovL2dyYXBoLm1pY3Jvc29mdC5jb20vdjEuMC9tZS8nLFxyXG5cclxuICAgICAgICAgICAgc2VsZWN0ZWRWZXJzaW9uOiBcInYxLjBcIixcclxuXHJcbiAgICAgICAgICAgIHNlbGVjdGVkT3B0aW9uOiBcIkdFVFwiLFxyXG5cclxuICAgICAgICAgICAgc2hvd0pzb25FZGl0b3I6IGZhbHNlLFxyXG5cclxuICAgICAgICAgICAgc2hvd0pzb25WaWV3ZXI6IHRydWUsXHJcblxyXG4gICAgICAgICAgICBjYWNoZTogJGNhY2hlRmFjdG9yeSgnbXlDYWNoZScpLFxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgZW50aXR5OiBcIlwiLFxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgZW50aXR5TmFtZUlzQW5JZDogZmFsc2UsXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBwZXJmb3JtQW5vbnltb3VzUXVlcnk6IGZ1bmN0aW9uIChxdWVyeVR5cGUpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbiAocXVlcnksIHBvc3RTdHJpbmcsIHJlcXVlc3RIZWFkZXJzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBoZWFkZXJzT2JqID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJBdXRob3JpemF0aW9uXCI6IFwiQmVhcmVyIHt0b2tlbjpodHRwczovL2dyYXBoLm1pY3Jvc29mdC5jb20vfVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJBY2NlcHRcIjogXCJhcHBsaWNhdGlvbi9qc29uXCJcclxuICAgICAgICAgICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAocmVxdWVzdEhlYWRlcnMgJiYgcmVxdWVzdEhlYWRlcnNbXCJBdXRob3JpemF0aW9uXCJdKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaGVhZGVyc09ialtcIkF1dGhvcml6YXRpb25cIl0gPSByZXF1ZXN0SGVhZGVyc1tcIkF1dGhvcml6YXRpb25cIl07XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAocmVxdWVzdEhlYWRlcnMgJiYgcmVxdWVzdEhlYWRlcnNbXCJBY2NlcHRcIl0pe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBoZWFkZXJzT2JqW1wiQWNjZXB0XCJdID0gcmVxdWVzdEhlYWRlcnNbXCJBY2NlcHRcIl07XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICB2YXIgcmVxdWVzdCA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdXJsOiAnaHR0cHM6Ly9wcm94eS5hcGlzYW5kYm94Lm1zZG4ubWljcm9zb2Z0LmNvbS9zdmM/dXJsPScgKyBlbmNvZGVVUklDb21wb25lbnQocXVlcnkpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBtZXRob2Q6ICdHRVQnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBoZWFkZXJzOiBoZWFkZXJzT2JqXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAocXVlcnlUeXBlID09IFwiR0VUX0JJTkFSWVwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlcXVlc3RbXCJyZXNwb25zZVR5cGVcIl0gPSBcImFycmF5YnVmZmVyXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAocXVlcnlUeXBlID09IFwiR0VUX0JJTkFSWVwiIHx8IHF1ZXJ5VHlwZSA9PSBcIkdFVFwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAkaHR0cChyZXF1ZXN0KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgcGVyZm9ybVF1ZXJ5OiBmdW5jdGlvbiAocXVlcnlUeXBlKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24gKHF1ZXJ5LCBwb3N0U3RyaW5nLCByZXF1ZXN0SGVhZGVycykge1xyXG4gICAgICAgICAgICAgICAgICAgIHN3aXRjaChxdWVyeVR5cGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBcIkdFVFwiOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICRodHRwLmdldChxdWVyeSwge2hlYWRlcnMgOiByZXF1ZXN0SGVhZGVyc30pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFwiR0VUX0JJTkFSWVwiOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICRodHRwLmdldChxdWVyeSwge3Jlc3BvbnNlVHlwZTpcImFycmF5YnVmZmVyXCJ9LCB7aGVhZGVycyA6IHJlcXVlc3RIZWFkZXJzfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCJQT1NUXCI6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gJGh0dHAucG9zdChxdWVyeSwgcG9zdFN0cmluZywge2hlYWRlcnMgOiByZXF1ZXN0SGVhZGVyc30pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFwiUEFUQ0hcIjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAkaHR0cC5wYXRjaChxdWVyeSwgcG9zdFN0cmluZywge2hlYWRlcnMgOiByZXF1ZXN0SGVhZGVyc30pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFwiREVMRVRFXCI6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gJGh0dHAuZGVsZXRlKHF1ZXJ5LCB7aGVhZGVycyA6IHJlcXVlc3RIZWFkZXJzfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGdldE1ldGFkYXRhOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnBlcmZvcm1Bbm9ueW1vdXNRdWVyeShcIkdFVFwiKShcImh0dHBzOi8vZ3JhcGgubWljcm9zb2Z0LmNvbS9cIiArIHRoaXMuc2VsZWN0ZWRWZXJzaW9uICsgXCIvJG1ldGFkYXRhXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfV0pOyIsIi8vIFRoaXMgaXMgYSBnZW5lcmF0ZWQgZmlsZSBmcm9tIGJ1bmRsZUxvY0ZpbGVzLmpzIFxuXG52YXIgbG9jX3N0cmluZ3MgPSB7fTtcblxubG9jX3N0cmluZ3NbJ2RlLURFJ10gPSB7XCJUbyB0cnkgdGhlIGV4cGxvcmVyLCBwbGVhc2UgXCI6XCJVbSBkZW4gVGVzdGVyIGF1c3p1cHJvYmllcmVuLCBcIixcInNpZ24gaW5cIjpcIkFubWVsZGVuXCIsXCIgd2l0aCB5b3VyIHdvcmsgb3Igc2Nob29sIGFjY291bnQgZnJvbSBNaWNyb3NvZnQuXCI6XCIgbWl0IElocmVtIEdlc2Now6RmdHMtIG9kZXIgU2NodWxrb250byB2b24gTWljcm9zb2Z0IGFuLlwiLFwiU3VibWl0XCI6XCJTZW5kZW5cIixcIlVzaW5nIGRlbW8gdGVuYW50XCI6XCJWZXJ3ZW5kZW4gZGVzIERlbW9tYW5kYW50ZW5cIixcInNpZ24gb3V0XCI6XCJBYm1lbGRlblwiLFwiSGlzdG9yeVwiOlwiVmVybGF1ZlwiLFwiTWV0aG9kXCI6XCJNZXRob2RlXCIsXCJRdWVyeVwiOlwiQWJmcmFnZVwiLFwiU3RhdHVzIENvZGVcIjpcIlN0YXR1c2NvZGVcIixcIkR1cmF0aW9uXCI6XCJEYXVlclwiLFwiR29cIjpcIk9LXCIsXCJZRVNcIjpcIkpBXCIsXCJOT1wiOlwiTkVJTlwiLFwicmVxdWVzdCBoZWFkZXJcIjpcIkFuZm9yZGVydW5nc2hlYWRlclwiLFwicmVxdWVzdCBib2R5XCI6XCJBbmZvcmRlcnVuZ3N0ZXh0a8O2cnBlclwiLFwicmVzcG9uc2VcIjpcIkFudHdvcnRcIn1cblxubG9jX3N0cmluZ3NbJ2VuLXVzJ10gPSB7XCJUbyB0cnkgdGhlIGV4cGxvcmVyLCBwbGVhc2UgXCI6XCJUbyB0cnkgdGhlIGV4cGxvcmVyLCBwbGVhc2UgXCIsXCJzaWduIGluXCI6XCJzaWduIGluXCIsXCIgd2l0aCB5b3VyIHdvcmsgb3Igc2Nob29sIGFjY291bnQgZnJvbSBNaWNyb3NvZnQuXCI6XCIgd2l0aCB5b3VyIHdvcmsgb3Igc2Nob29sIGFjY291bnQgZnJvbSBNaWNyb3NvZnQuXCIsXCJTdWJtaXRcIjpcIlN1Ym1pdFwiLFwiVXNpbmcgZGVtbyB0ZW5hbnRcIjpcIlVzaW5nIGRlbW8gdGVuYW50XCIsXCJzaWduIG91dFwiOlwic2lnbiBvdXRcIixcIkhpc3RvcnlcIjpcIkhpc3RvcnlcIixcIk1ldGhvZFwiOlwiTWV0aG9kXCIsXCJRdWVyeVwiOlwiUXVlcnlcIixcIlN0YXR1cyBDb2RlXCI6XCJTdGF0dXMgQ29kZVwiLFwiRHVyYXRpb25cIjpcIkR1cmF0aW9uXCIsXCJHb1wiOlwiR29cIixcIllFU1wiOlwiWUVTXCIsXCJOT1wiOlwiTk9cIixcInJlcXVlc3QgaGVhZGVyXCI6XCJyZXF1ZXN0IGhlYWRlclwiLFwicmVxdWVzdCBib2R5XCI6XCJyZXF1ZXN0IGJvZHlcIixcInJlc3BvbnNlXCI6XCJyZXNwb25zZVwiLFwibG9naW5fdG9fc2VuZF9yZXF1ZXN0c1wiOlwiTG9naW4gdG8gY2hhbmdlIHRoZSByZXF1ZXN0IHR5cGVcIn1cblxubG9jX3N0cmluZ3NbJ3B0LUJSJ10gPSB7XCJUbyB0cnkgdGhlIGV4cGxvcmVyLCBwbGVhc2UgXCI6XCJQYXJhIGV4cGVyaW1lbnRhciBvIEV4cGxvcmFkb3IsIFwiLFwic2lnbiBpblwiOlwiZW50cmFyXCIsXCIgd2l0aCB5b3VyIHdvcmsgb3Igc2Nob29sIGFjY291bnQgZnJvbSBNaWNyb3NvZnQuXCI6XCIgY29tIGEgc3VhIGNvbnRhIGNvcnBvcmF0aXZhIG91IGRlIGVzdHVkYW50ZSBkYSBNaWNyb3NvZnQuXCIsXCJTdWJtaXRcIjpcIkVudmlhclwiLFwiVXNpbmcgZGVtbyB0ZW5hbnRcIjpcIlVzYW5kbyBvIExvY2F0w6FyaW8gZGUgRGVtb25zdHJhw6fDo29cIixcInNpZ24gb3V0XCI6XCJzYWlyXCIsXCJIaXN0b3J5XCI6XCJIaXN0w7NyaWNvXCIsXCJNZXRob2RcIjpcIk3DqXRvZG9cIixcIlF1ZXJ5XCI6XCJDb25zdWx0YVwiLFwiU3RhdHVzIENvZGVcIjpcIkPDs2RpZ28gZGUgU3RhdHVzXCIsXCJEdXJhdGlvblwiOlwiRHVyYcOnw6NvXCIsXCJHb1wiOlwiSXJcIixcIllFU1wiOlwiU0lNXCIsXCJOT1wiOlwiTsODT1wiLFwicmVxdWVzdCBoZWFkZXJcIjpcImNhYmXDp2FsaG8gZGEgc29saWNpdGHDp8Ojb1wiLFwicmVxdWVzdCBib2R5XCI6XCJjb3JwbyBkYSBzb2xpY2l0YcOnw6NvXCIsXCJyZXNwb25zZVwiOlwicmVzcG9zdGFcIn1cblxubG9jX3N0cmluZ3NbJ2VzLUVTJ10gPSB7XCJUbyB0cnkgdGhlIGV4cGxvcmVyLCBwbGVhc2UgXCI6XCJQYXJhIHV0aWxpemFyIGVsIHByb2JhZG9yLCBcIixcInNpZ24gaW5cIjpcImluaWNpYXIgc2VzacOzblwiLFwiIHdpdGggeW91ciB3b3JrIG9yIHNjaG9vbCBhY2NvdW50IGZyb20gTWljcm9zb2Z0LlwiOlwiIGNvbiBzdSBjdWVudGEgcHJvZmVzaW9uYWwgbyBlZHVjYXRpdmEgZGUgTWljcm9zb2Z0LlwiLFwiU3VibWl0XCI6XCJFbnZpYXJcIixcIlVzaW5nIGRlbW8gdGVuYW50XCI6XCJVc28gZGUgaW5xdWlsaW5vcyBkZSBkZW1vc3RyYWNpw7NuXCIsXCJzaWduIG91dFwiOlwiY2VycmFyIHNlc2nDs25cIixcIkhpc3RvcnlcIjpcIkhpc3RvcmlhbFwiLFwiTWV0aG9kXCI6XCJNw6l0b2RvXCIsXCJRdWVyeVwiOlwiQ29uc3VsdGFcIixcIlN0YXR1cyBDb2RlXCI6XCJDw7NkaWdvIGRlIGVzdGFkb1wiLFwiRHVyYXRpb25cIjpcIkR1cmFjacOzblwiLFwiR29cIjpcIklyXCIsXCJZRVNcIjpcIlPDjVwiLFwiTk9cIjpcIk5PXCIsXCJyZXF1ZXN0IGhlYWRlclwiOlwiZW5jYWJlemFkbyBkZSBzb2xpY2l0dWRcIixcInJlcXVlc3QgYm9keVwiOlwiY3VlcnBvIGRlIHNvbGljaXR1ZFwiLFwicmVzcG9uc2VcIjpcInJlc3B1ZXN0YVwifVxuXG5sb2Nfc3RyaW5nc1snamEtSlAnXSA9IHtcIlRvIHRyeSB0aGUgZXhwbG9yZXIsIHBsZWFzZSBcIjpcIuOCqOOCr+OCueODl+ODreODvOODqeODvOOCkuOBiuippuOBl+OBhOOBn+OBoOOBj+OBq+OBr+OAgU1pY3Jvc29mdCDjga7ogbfloLTjgb7jgZ/jga/lrabmoKHjgqLjgqvjgqbjg7Pjg4jjgacgXCIsXCJzaWduIGluXCI6XCLjgrXjgqTjg7PjgqTjg7NcIixcIiB3aXRoIHlvdXIgd29yayBvciBzY2hvb2wgYWNjb3VudCBmcm9tIE1pY3Jvc29mdC5cIjpcIiDjgZfjgb7jgZnjgIJcIixcIlN1Ym1pdFwiOlwi6YCB5L+hXCIsXCJVc2luZyBkZW1vIHRlbmFudFwiOlwi44OH44OiIOODhuODiuODs+ODiOOCkuS9v+eUqOOBl+OBpuOBhOOBvuOBmVwiLFwic2lnbiBvdXRcIjpcIuOCteOCpOODs+OCouOCpuODiFwiLFwiSGlzdG9yeVwiOlwi5bGl5q20XCIsXCJNZXRob2RcIjpcIuODoeOCveODg+ODiVwiLFwiUXVlcnlcIjpcIuOCr+OCqOODqlwiLFwiU3RhdHVzIENvZGVcIjpcIueKtuaFi+OCs+ODvOODiVwiLFwiRHVyYXRpb25cIjpcIuacn+mWk1wiLFwiR29cIjpcIuaknOe0olwiLFwiWUVTXCI6XCLjga/jgYRcIixcIk5PXCI6XCLjgYTjgYTjgYhcIixcInJlcXVlc3QgaGVhZGVyXCI6XCLopoHmsYLjg5jjg4Pjg4Djg7xcIixcInJlcXVlc3QgYm9keVwiOlwi6KaB5rGC5pys5paHXCIsXCJyZXNwb25zZVwiOlwi5b+c562UXCJ9XG5cbmxvY19zdHJpbmdzWydydS1SVSddID0ge1wiVG8gdHJ5IHRoZSBleHBsb3JlciwgcGxlYXNlIFwiOlwi0KfRgtC+0LHRiyDQvtC/0YDQvtCx0L7QstCw0YLRjCDQv9C10YHQvtGH0L3QuNGG0YMsIFwiLFwic2lnbiBpblwiOlwi0LLQvtC50YLQuFwiLFwiIHdpdGggeW91ciB3b3JrIG9yIHNjaG9vbCBhY2NvdW50IGZyb20gTWljcm9zb2Z0LlwiOlwiINGBINC/0L7QvNC+0YnRjNGOINGA0LDQsdC+0YfQtdC5INC40LvQuCDRg9GH0LXQsdC90L7QuSDRg9GH0LXRgtC90L7QuSDQt9Cw0L/QuNGB0Lgg0L7RgiDQutC+0YDQv9C+0YDQsNGG0LjQuCDQnNCw0LnQutGA0L7RgdC+0YTRgi5cIixcIlN1Ym1pdFwiOlwi0J7RgtC/0YDQsNCy0LjRgtGMXCIsXCJVc2luZyBkZW1vIHRlbmFudFwiOlwi0KEg0L/QvtC80L7RidGM0Y4g0LTQtdC80L7QvdGB0YLRgNCw0YbQuNC+0L3QvdC+0LPQviDQutC70LjQtdC90YLQsFwiLFwic2lnbiBvdXRcIjpcItCy0YvQudGC0LhcIixcIkhpc3RvcnlcIjpcItCW0YPRgNC90LDQu1wiLFwiTWV0aG9kXCI6XCLQnNC10YLQvtC0XCIsXCJRdWVyeVwiOlwi0JfQsNC/0YDQvtGBXCIsXCJTdGF0dXMgQ29kZVwiOlwi0JrQvtC0INGB0L7RgdGC0L7Rj9C90LjRj1wiLFwiRHVyYXRpb25cIjpcItCU0LvQuNGC0LXQu9GM0L3QvtGB0YLRjFwiLFwiR29cIjpcItCf0LXRgNC10LnRgtC4XCIsXCJZRVNcIjpcItCU0JBcIixcIk5PXCI6XCLQndCV0KJcIixcInJlcXVlc3QgaGVhZGVyXCI6XCLQt9Cw0LPQvtC70L7QstC+0Log0LfQsNC/0YDQvtGB0LBcIixcInJlcXVlc3QgYm9keVwiOlwi0YLQtdC60YHRgiDQt9Cw0L/RgNC+0YHQsFwiLFwicmVzcG9uc2VcIjpcItC+0YLQstC10YJcIn1cblxubG9jX3N0cmluZ3NbJ3poLUNOJ10gPSB7XCJUbyB0cnkgdGhlIGV4cGxvcmVyLCBwbGVhc2UgXCI6XCLoi6XopoHlsJ3or5XmtY/op4jlmajvvIzor7cg5L2/55So5L2g55qEIE1pY3Jvc29mdCDlt6XkvZzmiJblrabmoKHluJDmiLdcIixcInNpZ24gaW5cIjpcIueZu+W9lVwiLFwiIHdpdGggeW91ciB3b3JrIG9yIHNjaG9vbCBhY2NvdW50IGZyb20gTWljcm9zb2Z0LlwiOlwi44CCXCIsXCJTdWJtaXRcIjpcIuaPkOS6pFwiLFwiVXNpbmcgZGVtbyB0ZW5hbnRcIjpcIuS9v+eUqOa8lOekuuenn+aIt1wiLFwic2lnbiBvdXRcIjpcIuazqOmUgFwiLFwiSGlzdG9yeVwiOlwi5Y6G5Y+y6K6w5b2VXCIsXCJNZXRob2RcIjpcIuaWueazlVwiLFwiUXVlcnlcIjpcIuafpeivolwiLFwiU3RhdHVzIENvZGVcIjpcIueKtuaAgeS7o+eggVwiLFwiRHVyYXRpb25cIjpcIuaMgee7reaXtumXtFwiLFwiR29cIjpcIui9rOWIsFwiLFwiWUVTXCI6XCLmmK9cIixcIk5PXCI6XCLlkKZcIixcInJlcXVlc3QgaGVhZGVyXCI6XCLor7fmsYLmoIfpophcIixcInJlcXVlc3QgYm9keVwiOlwi6K+35rGC5q2j5paHXCIsXCJyZXNwb25zZVwiOlwi5ZON5bqUXCJ9XG5cbmxvY19zdHJpbmdzWydmci1GUiddID0ge1wiVG8gdHJ5IHRoZSBleHBsb3JlciwgcGxlYXNlIFwiOlwiUG91ciBlc3NheWVyIGzigJlhZmZpY2hldXIsIHZldWlsbGV6IFwiLFwic2lnbiBpblwiOlwic2UgY29ubmVjdGVyXCIsXCIgd2l0aCB5b3VyIHdvcmsgb3Igc2Nob29sIGFjY291bnQgZnJvbSBNaWNyb3NvZnQuXCI6XCIgYXZlYyB2b3RyZSBjb21wdGUgc2NvbGFpcmUgb3UgcHJvZmVzc2lvbm5lbCBkZSBNaWNyb3NvZnQuXCIsXCJTdWJtaXRcIjpcIkVudm95ZXJcIixcIlVzaW5nIGRlbW8gdGVuYW50XCI6XCLDgCBs4oCZYWlkZSBkdSBjbGllbnQgZGUgZMOpbW9uc3RyYXRpb25cIixcInNpZ24gb3V0XCI6XCJzZSBkw6ljb25uZWN0ZXJcIixcIkhpc3RvcnlcIjpcIkhpc3RvcmlxdWVcIixcIk1ldGhvZFwiOlwiTcOpdGhvZGVcIixcIlF1ZXJ5XCI6XCJSZXF1w6p0ZVwiLFwiU3RhdHVzIENvZGVcIjpcIkNvZGUgZCfDqXRhdFwiLFwiRHVyYXRpb25cIjpcIkR1csOpZVwiLFwiR29cIjpcIlJlY2hlcmNoZXJcIixcIllFU1wiOlwiT1VJXCIsXCJOT1wiOlwiTk9OXCIsXCJyZXF1ZXN0IGhlYWRlclwiOlwiZW4tdMOqdGUgZGUgbGEgZGVtYW5kZVwiLFwicmVxdWVzdCBib2R5XCI6XCJjb3JwcyBkZSBsYSBkZW1hbmRlXCIsXCJyZXNwb25zZVwiOlwicsOpcG9uc2VcIn0iLCIvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuLy8gIENvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiAgQWxsIFJpZ2h0cyBSZXNlcnZlZC4gIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gIFNlZSBMaWNlbnNlIGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXHJcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cclxudmFyIHM7XHJcbmFuZ3VsYXIubW9kdWxlKCdBcGlFeHBsb3JlcicpXHJcbiAgICAuY29udHJvbGxlcignQXBpRXhwbG9yZXJDdHJsJywgWyckc2NvcGUnLCAnJGh0dHAnLCAnJGxvY2F0aW9uJywgJ0FwaUV4cGxvcmVyU3ZjJywgJyR0aW1lb3V0JywgJyR0ZW1wbGF0ZUNhY2hlJywgJyRtZERpYWxvZycsICckc2NlJywgZnVuY3Rpb24gKCRzY29wZSwgJGh0dHAsICRsb2NhdGlvbiwgYXBpU2VydmljZSwgJHRpbWVvdXQsICR0ZW1wbGF0ZUNhY2hlLCAkbWREaWFsb2csICRzY2UgKSB7XHJcblxyXG4gICAgICAgIHMgPSAkc2NvcGU7XHJcbiAgICAgICAgJHNjb3BlLnVzZXJJbmZvID0ge307XHJcblxyXG4gICAgICAgICRzY29wZS5nZXRBc3NldFBhdGggPSBmdW5jdGlvbihyZWxQYXRoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBzLnBhdGhUb0J1aWxkRGlyICsgXCIvXCIrIHJlbFBhdGg7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAkc2NvcGUuZmluaXNoQWRtaW5Db25zZXJ0RmxvdyA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAvLyBzaWxlbnRseSBnZXQgYSBuZXcgYWNjZXNzIHRva2VuIHdpdGggdGhlIGFkbWluIHNjb3Blc1xyXG4gICAgICAgICAgICBoZWxsbygnbXNmdF90b2tlbl9yZWZyZXNoJykubG9naW4oe1xyXG4gICAgICAgICAgICAgICAgZGlzcGxheTogJ3BvcHVwJyxcclxuICAgICAgICAgICAgICAgIHJlc3BvbnNlX3R5cGU6IFwidG9rZW5cIixcclxuICAgICAgICAgICAgICAgIHJlZGlyZWN0X3VyaTogJHNjb3BlLnJlZGlyZWN0VXJsLFxyXG4gICAgICAgICAgICAgICAgc2NvcGU6ICRzY29wZS5zY29wZXMgKyBcIiBcIiArICRzY29wZS5hZG1pblNjb3BlcyxcclxuICAgICAgICAgICAgICAgIHJlc3BvbnNlX21vZGU6ICdmcmFnbWVudCcsXHJcbiAgICAgICAgICAgICAgICBwcm9tcHQ6ICdub25lJyxcclxuICAgICAgICAgICAgICAgIGRvbWFpbl9oaW50OiAnb3JnYW5pemF0aW9ucycsXHJcbiAgICAgICAgICAgICAgICBsb2dpbl9oaW50OiAkc2NvcGUudXNlckluZm8ucHJlZmVycmVkX3VzZXJuYW1lXHJcbiAgICAgICAgICAgIH0sIGZ1bmN0aW9uKHJlcykge1xyXG4gICAgICAgICAgICAgICAgaWYgKHJlcy5hdXRoUmVzcG9uc2UpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgYWNjZXNzVG9rZW4gPSByZXMuYXV0aFJlc3BvbnNlLmFjY2Vzc190b2tlbjtcclxuICAgICAgICAgICAgICAgICAgICAkaHR0cC5kZWZhdWx0cy5oZWFkZXJzLmNvbW1vblsnQXV0aG9yaXphdGlvbiddID0gJ0JlYXJlciAnICsgYWNjZXNzVG9rZW47XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sIGZ1bmN0aW9uKHJlcykge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihyZXMpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGhlbGxvLm9uKCdhdXRoLmxvZ2luJywgZnVuY3Rpb24gKGF1dGgpIHtcclxuICAgICAgICAgICAgdmFyIGFjY2Vzc1Rva2VuO1xyXG5cclxuICAgICAgICAgICAgaWYgKGF1dGgubmV0d29yayA9PSBcIm1zZnRfdG9rZW5fcmVmcmVzaFwiKSB7XHJcbiAgICAgICAgICAgICAgICBhY2Nlc3NUb2tlbiA9IGhlbGxvKCdtc2Z0X3Rva2VuX3JlZnJlc2gnKS5nZXRBdXRoUmVzcG9uc2UoKS5hY2Nlc3NfdG9rZW47XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoYXV0aC5uZXR3b3JrID09IFwibXNmdFwiKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgYXV0aFJlc3BvbnNlID0gaGVsbG8oJ21zZnQnKS5nZXRBdXRoUmVzcG9uc2UoKVxyXG5cclxuICAgICAgICAgICAgICAgIGFjY2Vzc1Rva2VuID0gYXV0aFJlc3BvbnNlLmFjY2Vzc190b2tlbjtcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgand0O1xyXG4gICAgICAgICAgICAgICAgaWYgKCdpZF90b2tlbicgaW4gYXV0aFJlc3BvbnNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgand0ID0gYXV0aFJlc3BvbnNlWydpZF90b2tlbiddO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHZhciBkZWNvZGVkSnd0ID0gand0X2RlY29kZShqd3QpO1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAkc2NvcGUudXNlckluZm8gPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcHJlZmVycmVkX3VzZXJuYW1lOiBkZWNvZGVkSnd0LnByZWZlcnJlZF91c2VybmFtZVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICRzY29wZS4kYXBwbHkoKTtcclxuXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChhY2Nlc3NUb2tlbikge1xyXG4gICAgICAgICAgICAgICAgJGh0dHAuZGVmYXVsdHMuaGVhZGVycy5jb21tb25bJ0F1dGhvcml6YXRpb24nXSA9ICdCZWFyZXIgJyArIGFjY2Vzc1Rva2VuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgJHNjb3BlLnNob3dKc29uRWRpdG9yID0gYXBpU2VydmljZS5zaG93SnNvbkVkaXRvcjtcclxuICAgICAgICAkc2NvcGUuc2hvd0pzb25WaWV3ZXIgPSBhcGlTZXJ2aWNlLnNob3dKc29uVmlld2VyO1xyXG4gICAgICAgICRzY29wZS50YWJDb25maWcgPSB7XHJcbiAgICAgICAgICAgIGRpc2FibGVSZXF1ZXN0Qm9keUVkaXRvcjogdHJ1ZSxcclxuICAgICAgICAgICAgaGlkZUNvbnRlbnQ6IHRydWUsXHJcbiAgICAgICAgICAgIHNlbGVjdGVkOiAwXHJcbiAgICAgICAgfVxyXG4gICAgICAgICRzY29wZS5zaG93SW1hZ2UgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgLy8gJHNjb3BlLiR3YXRjaChcInRhYkNvbmZpZy5zZWxlY3RlZFwiLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAvLyB9KVxyXG5cclxuICAgICAgICAvLyAkc2NvcGUub25UYWJTZWxlY3RlZCA9IGZ1bmN0aW9uKGluZGV4KSB7XHJcbiAgICAgICAgLy8gICAgIHRhYkNvbmZpZy5wcmV2aW91c1NlbGVjdGVkID0gJHNjb3BlLnRhYkNvbmZpZy5zZWxlY3RlZDtcclxuICAgICAgICAvLyB9XHJcblxyXG4gICAgICAgICRzY29wZS50YWJDb25maWcucHJldmlvdXNTZWxlY3RlZCA9ICRzY29wZS50YWJDb25maWcuc2VsZWN0ZWQ7XHJcbiAgICAgICAgJHNjb3BlLnByb2Nlc3NUYWJDbGljayA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICB2YXIgc3dpdGNoaW5nVGFicyA9ICRzY29wZS50YWJDb25maWcucHJldmlvdXNTZWxlY3RlZCAhPSAkc2NvcGUudGFiQ29uZmlnLnNlbGVjdGVkO1xyXG4gICAgICAgICAgICBpZiAoIXN3aXRjaGluZ1RhYnMpXHJcbiAgICAgICAgICAgICAgICAkc2NvcGUudGFiQ29uZmlnLmhpZGVDb250ZW50ID0gISRzY29wZS50YWJDb25maWcuaGlkZUNvbnRlbnQ7XHJcbiAgICAgICAgICAgICRzY29wZS50YWJDb25maWcucHJldmlvdXNTZWxlY3RlZCA9ICRzY29wZS50YWJDb25maWcuc2VsZWN0ZWQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBGb3IgZGVlcCBsaW5raW5nIGludG8gdGhlIEdyYXBoIEV4cGxvcmVyXHJcbiAgICAgICAgdmFyIHJlcXVlc3RWYWwgPSAkbG9jYXRpb24uc2VhcmNoKCkucmVxdWVzdDtcclxuICAgICAgICB2YXIgYWN0aW9uVmFsID0gJGxvY2F0aW9uLnNlYXJjaCgpLm1ldGhvZDtcclxuICAgICAgICB2YXIgYm9keVZhbCA9ICRsb2NhdGlvbi5zZWFyY2goKS5ib2R5O1xyXG4gICAgICAgIHZhciB2ZXJzaW9uVmFsID0gJGxvY2F0aW9uLnNlYXJjaCgpLnZlcnNpb247XHJcbiAgICAgICAgdmFyIGhlYWRlcnNWYWwgPSAkbG9jYXRpb24uc2VhcmNoKCkuaGVhZGVycztcclxuICAgICAgICBcclxuXHJcbiAgICAgICAgaGFuZGxlUXVlcnlTdHJpbmcoYXBpU2VydmljZSwgYWN0aW9uVmFsLCB2ZXJzaW9uVmFsLCByZXF1ZXN0VmFsKTtcclxuICAgICAgICBcclxuICAgICAgICAkdGltZW91dChmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgaW5pdGlhbGl6ZUpzb25FZGl0b3JIZWFkZXJzKCRzY29wZSwgaGVhZGVyc1ZhbCk7XHJcbiAgICAgICAgICAgIGluaXRpYWxpemVKc29uVmlld2VyKCRzY29wZSwgYXBpU2VydmljZSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHBhcnNlTWV0YWRhdGEoYXBpU2VydmljZSwgJHNjb3BlKTtcclxuXHJcbiAgICAgICAgJHNjb3BlLmlzQXV0aGVudGljYXRlZCA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICB2YXIgc2Vzc2lvbiA9IGhlbGxvKCdtc2Z0JykuZ2V0QXV0aFJlc3BvbnNlKCk7XHJcblxyXG4gICAgICAgICAgICBpZiAoc2Vzc2lvbiA9PT0gbnVsbCkgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB2YXIgY3VycmVudFRpbWUgPSAobmV3IERhdGUoKSkuZ2V0VGltZSgpIC8gMTAwMDtcclxuICAgICAgICAgICAgcmV0dXJuIHNlc3Npb24gJiYgc2Vzc2lvbi5hY2Nlc3NfdG9rZW4gJiYgc2Vzc2lvbi5leHBpcmVzID4gY3VycmVudFRpbWU7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgJHNjb3BlLmdldEVkaXRvciA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gYXBpU2VydmljZS5zaG93SnNvbkVkaXRvcjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICRzY29wZS4kd2F0Y2goXCJnZXRFZGl0b3IoKVwiLCBmdW5jdGlvbihldmVudCwgYXJncykge1xyXG4gICAgICAgICAgICAkc2NvcGUuc2hvd0pzb25FZGl0b3IgPSAkc2NvcGUuZ2V0RWRpdG9yKCk7XHJcbiAgICAgICAgICAgIGluaXRpYWxpemVKc29uRWRpdG9yKCRzY29wZSwgYm9keVZhbCk7XHJcbiAgICAgICAgICAgIC8vIGlmICgkc2NvcGUuc2hvd0pzb25FZGl0b3IpIHtcclxuICAgICAgICAgICAgLy8gfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvLyBodHRwczovL2RvY3MubWljcm9zb2Z0LmNvbS9lbi11cy9henVyZS9hY3RpdmUtZGlyZWN0b3J5L2FjdGl2ZS1kaXJlY3RvcnktdjItcHJvdG9jb2xzLWltcGxpY2l0XHJcbiAgICAgICAgJHNjb3BlLmxvZ2luID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBoZWxsbygnbXNmdCcpLmxvZ2luKHtcclxuICAgICAgICAgICAgICAgIGRpc3BsYXk6ICdwYWdlJyxcclxuICAgICAgICAgICAgICAgIHJlc3BvbnNlX3R5cGU6IFwiaWRfdG9rZW4gdG9rZW5cIixcclxuICAgICAgICAgICAgICAgIG5vbmNlOiAnZ3JhcGhfZXhwbG9yZXInLFxyXG4gICAgICAgICAgICAgICAgcHJvbXB0OiAnbG9naW4nXHJcbiAgICAgICAgICAgIH0sIGZ1bmN0aW9uKHJlcykge1xyXG5cclxuICAgICAgICAgICAgfSwgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKCdlcnJvciBzaWduaW5nIGluJyk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgICRzY29wZS5sb2dvdXQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGhlbGxvKCdtc2Z0JykubG9nb3V0KG51bGwsIHtmb3JjZTp0cnVlfSk7XHJcbiAgICAgICAgICAgIGRlbGV0ZSAkc2NvcGUudXNlckluZm87XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgJHNjb3BlLmlzQWN0aXZlID0gZnVuY3Rpb24gKHZpZXdMb2NhdGlvbikge1xyXG4gICAgICAgICAgICByZXR1cm4gdmlld0xvY2F0aW9uID09PSAkbG9jYXRpb24ucGF0aCgpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHZhciByYXdTZWFyY2hUZXh0ID0gXCJcIjtcclxuICAgICAgICAkc2NvcGUuc2V0UmF3U2VhcmNoVGV4dCA9IGZ1bmN0aW9uKHRleHQpIHtcclxuICAgICAgICAgICAgcmF3U2VhcmNoVGV4dCA9IHRleHQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAkc2NvcGUuZ2V0UmF3U2VhcmNoVGV4dCA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gcmF3U2VhcmNoVGV4dDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICRzY29wZS5nZXRDdXJyZW50RW50aXR5TmFtZSA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBpZiAoIXJhd1NlYXJjaFRleHQpIHJldHVybiBudWxsO1xyXG4gICAgICAgICAgICByZXR1cm4gcmF3U2VhcmNoVGV4dC5zcGxpdChcIi9cIikuZmlsdGVyKChmdW5jdGlvbihhKSB7IHJldHVybiBhLmxlbmd0aCA+IDB9KSkucG9wKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAkc2NvcGUuY2FuSW5zZXJ0VGVtcGxhdGUgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGFwaVNlcnZpY2Uuc2VsZWN0ZWRPcHRpb24gPT0gXCJQT1NUXCIgJiYgY2hlY2tDYW5JbnNlcnRUZW1wbGF0ZShyYXdTZWFyY2hUZXh0KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICRzY29wZS5pbnNlcnRQb3N0VGVtcGxhdGUgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgdmFyIGVudGl0eSA9ICRzY29wZS5nZXRDdXJyZW50RW50aXR5TmFtZSgpO1xyXG4gICAgICAgICAgICB2YXIgc3RyVG9JbnNlcnQgPSBKU09OLnN0cmluZ2lmeShwb3N0VGVtcGxhdGVzW2VudGl0eV0sIG51bGwsIDIpLnRyaW0oKTtcclxuXHJcbiAgICAgICAgICAgIHZhciBkb21haW4gPSAkc2NvcGUudXNlckluZm8ucHJlZmVycmVkX3VzZXJuYW1lLnNwbGl0KFwiQFwiKVsxXTtcclxuXHJcbiAgICAgICAgICAgIHN0clRvSW5zZXJ0ID0gc3RyVG9JbnNlcnQucmVwbGFjZSgvQVVUSEVOVElDQVRFRF9ET01BSU4vZywgZG9tYWluKTtcclxuXHJcbiAgICAgICAgICAgIGluaXRpYWxpemVKc29uRWRpdG9yKCRzY29wZSwgc3RyVG9JbnNlcnQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gY2hlY2tDYW5JbnNlcnRUZW1wbGF0ZShVUkwpIHtcclxuICAgICAgICAgICAgLy8gZ2V0ICdtZXNzYWdlcycgZnJvbSAnaHR0cHM6Ly9ncmFwaC5taWNyb3NvZnQuY29tL3YxLjAvbWUvbWVzc2FnZXMnXHJcbiAgICAgICAgICAgIHZhciBlbnRpdHkgPSAkc2NvcGUuZ2V0Q3VycmVudEVudGl0eU5hbWUoKVxyXG4gICAgICAgICAgICB2YXIgY2FuSW5zZXJ0VGVtcGxhdGUgPSBlbnRpdHkgaW4gcG9zdFRlbXBsYXRlcztcclxuICAgICAgICAgICAgcmV0dXJuIGNhbkluc2VydFRlbXBsYXRlO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgICRzY29wZS5zaG93U2hhcmVEaWFsb2cgPSBmdW5jdGlvbihldikge1xyXG4gICAgICAgICAgICAkbWREaWFsb2cuc2hvdyh7XHJcbiAgICAgICAgICAgICAgICBjb250cm9sbGVyOiBTaGFyZURpYWxvZ0NvbnRyb2xsZXIsXHJcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogcGF0aFRvQnVpbGREaXIgKyAnL2Fzc2V0cy92aWV3cy9zaGFyZURpYWxvZy50bXBsLmh0bWwnLFxyXG4gICAgICAgICAgICAgICAgcGFyZW50OiBhbmd1bGFyLmVsZW1lbnQoZG9jdW1lbnQuYm9keSksXHJcbiAgICAgICAgICAgICAgICB0YXJnZXRFdmVudDogZXYsXHJcbiAgICAgICAgICAgICAgICBjbGlja091dHNpZGVUb0Nsb3NlOnRydWUsXHJcbiAgICAgICAgICAgICAgICBzY29wZTogJHNjb3BlLiRuZXcoKSxcclxuICAgICAgICAgICAgICAgIGxvY2Fsczoge1xyXG4gICAgICAgICAgICAgICAgICAgIGFwaVNlcnZpY2U6IGFwaVNlcnZpY2UsXHJcbiAgICAgICAgICAgICAgICAgICAgJHNjZTogJHNjZSxcclxuICAgICAgICAgICAgICAgICAgICBoZWFkZXJzOiBmb3JtYXRSZXF1ZXN0SGVhZGVycygkc2NvcGUuanNvbkVkaXRvckhlYWRlcnMuZ2V0U2Vzc2lvbigpLmdldFZhbHVlKCkpLFxyXG4gICAgICAgICAgICAgICAgICAgIGJvZHk6ICRzY29wZS5qc29uRWRpdG9yLmdldFNlc3Npb24oKS5nZXRWYWx1ZSgpXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAudGhlbihmdW5jdGlvbihhbnN3ZXIpIHtcclxuICAgICAgICAgICAgICAgICRzY29wZS5zdGF0dXMgPSAnWW91IHNhaWQgdGhlIGluZm9ybWF0aW9uIHdhcyBcIicgKyBhbnN3ZXIgKyAnXCIuJztcclxuICAgICAgICAgICAgfSwgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAkc2NvcGUuc3RhdHVzID0gJ1lvdSBjYW5jZWxsZWQgdGhlIGRpYWxvZy4nO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9O1xyXG5cclxufV0pO1xyXG5cclxuYW5ndWxhci5tb2R1bGUoJ0FwaUV4cGxvcmVyJylcclxuICAgIC5jb250cm9sbGVyKCdEcm9wZG93bkN0cmwnLCBbJyRzY29wZScsICdBcGlFeHBsb3JlclN2YycsIGZ1bmN0aW9uICgkc2NvcGUsIGFwaVNlcnZpY2UpIHtcclxuXHJcbiAgICAgICAgJHNjb3BlLnNlbGVjdGVkT3B0aW9uID0gYXBpU2VydmljZS5zZWxlY3RlZE9wdGlvbjtcclxuXHJcbiAgICAgICAgJHNjb3BlLm9uSXRlbUNsaWNrID0gZnVuY3Rpb24oY2hvaWNlKSB7XHJcbiAgICAgICAgICAgICRzY29wZS5zZWxlY3RlZE9wdGlvbiA9IGNob2ljZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICRzY29wZS5pdGVtcyA9IFtcclxuICAgICAgICAgICAgJ0dFVCcsXHJcbiAgICAgICAgICAgICdQT1NUJyxcclxuICAgICAgICAgICAgJ1BBVENIJyxcclxuICAgICAgICAgICAgJ0RFTEVURSdcclxuICAgICAgICBdO1xyXG5cclxuICAgICAgICAkc2NvcGUuZ2V0U2VydmljZU9wdGlvbiA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gYXBpU2VydmljZS5zZWxlY3RlZE9wdGlvbjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICRzY29wZS5nZXRPcHRpb24gPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgcmV0dXJuICRzY29wZS5zZWxlY3RlZE9wdGlvbjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICRzY29wZS4kd2F0Y2goXCJnZXRPcHRpb24oKVwiLCBmdW5jdGlvbihuZXdWYWwsIG9sZFZhbCkge1xyXG4gICAgICAgICAgICBpZiAob2xkVmFsICE9PSBuZXdWYWwpIHtcclxuICAgICAgICAgICAgICAgIGFwaVNlcnZpY2Uuc2VsZWN0ZWRPcHRpb24gPSAkc2NvcGUuc2VsZWN0ZWRPcHRpb247XHJcbiAgICAgICAgICAgICAgICBhcGlTZXJ2aWNlLnRleHQgPSBhcGlTZXJ2aWNlLnRleHQucmVwbGFjZSgvaHR0cHM6XFwvXFwvZ3JhcGgubWljcm9zb2Z0LmNvbSgkfFxcLyhbXFx3XXxcXC4pKigkfFxcLykpLywgKFwiaHR0cHM6Ly9ncmFwaC5taWNyb3NvZnQuY29tL1wiICsgYXBpU2VydmljZS5zZWxlY3RlZFZlcnNpb24gKyBcIi9cIikpO1xyXG4gICAgICAgICAgICAgICAgaWYgKCRzY29wZS5zZWxlY3RlZE9wdGlvbiA9PSAnUE9TVCcgfHwgJHNjb3BlLnNlbGVjdGVkT3B0aW9uID09ICdQQVRDSCcpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gaW52ZXN0aWdhdGUgd2h5ICRzY29wZSBkb2Vzbid0IHdvcmsgaGVyZVxyXG4gICAgICAgICAgICAgICAgICAgIHNob3dSZXF1ZXN0Qm9keUVkaXRvcigpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICgkc2NvcGUuc2VsZWN0ZWRPcHRpb24gPT0gJ0dFVCcgfHwgJHNjb3BlLnNlbGVjdGVkT3B0aW9uID09ICdERUxFVEUnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcy50YWJDb25maWcuZGlzYWJsZVJlcXVlc3RCb2R5RWRpdG9yID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICBzZXRTZWxlY3RlZFRhYigwKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIH1dKTtcclxuXHJcbmFuZ3VsYXIubW9kdWxlKCdBcGlFeHBsb3JlcicpXHJcbiAgICAuY29udHJvbGxlcignVmVyc2lvbkN0cmwnLCBbJyRzY29wZScsICdBcGlFeHBsb3JlclN2YycsIGZ1bmN0aW9uICgkc2NvcGUsIGFwaVNlcnZpY2UpIHtcclxuICAgICAgICAkc2NvcGUuc2VsZWN0ZWRWZXJzaW9uID0gYXBpU2VydmljZS5zZWxlY3RlZFZlcnNpb247XHJcblxyXG4gICAgICAgICRzY29wZS5pdGVtcyA9IFtcclxuICAgICAgICAgICAgJ2JldGEnLFxyXG4gICAgICAgICAgICAndjEuMCdcclxuICAgICAgICBdO1xyXG5cclxuICAgICAgICAkc2NvcGUuZ2V0VmVyc2lvbiA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gJHNjb3BlLnNlbGVjdGVkVmVyc2lvbjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICRzY29wZS5nZXRTZXJ2aWNlVmVyc2lvbiA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gYXBpU2VydmljZS5zZWxlY3RlZFZlcnNpb247XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAkc2NvcGUub25JdGVtQ2xpY2sgPSBmdW5jdGlvbihjaG9pY2UpIHtcclxuICAgICAgICAgICAgJHNjb3BlLnNlbGVjdGVkVmVyc2lvbiA9IGNob2ljZTtcclxuICAgICAgICAgICAgYXBpU2VydmljZS5zZWxlY3RlZFZlcnNpb24gPSBjaG9pY2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgICRzY29wZS4kd2F0Y2goXCJnZXRWZXJzaW9uKClcIiwgZnVuY3Rpb24obmV3VmFsLCBvbGRWYWwpIHtcclxuICAgICAgICAgICAgaWYgKG9sZFZhbCAhPT0gbmV3VmFsKSB7XHJcbiAgICAgICAgICAgICAgICBhcGlTZXJ2aWNlLnNlbGVjdGVkVmVyc2lvbiA9ICRzY29wZS5zZWxlY3RlZFZlcnNpb247XHJcbiAgICAgICAgICAgICAgICBpZiAoJHNjb3BlLiRwYXJlbnQuc2VhcmNoVGV4dCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGFwaVNlcnZpY2UudGV4dCA9ICRzY29wZS4kcGFyZW50LnNlYXJjaFRleHQucmVwbGFjZSgvaHR0cHM6XFwvXFwvZ3JhcGgubWljcm9zb2Z0LmNvbSgkfFxcLyhbXFx3XXxcXC4pKigkfFxcLykpLywgKFwiaHR0cHM6Ly9ncmFwaC5taWNyb3NvZnQuY29tL1wiICsgYXBpU2VydmljZS5zZWxlY3RlZFZlcnNpb24gKyBcIi9cIikpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBhcGlTZXJ2aWNlLnRleHQgPSBhcGlTZXJ2aWNlLnRleHQucmVwbGFjZSgvaHR0cHM6XFwvXFwvZ3JhcGgubWljcm9zb2Z0LmNvbSgkfFxcLyhbXFx3XXxcXC4pKigkfFxcLykpLywgKFwiaHR0cHM6Ly9ncmFwaC5taWNyb3NvZnQuY29tL1wiICsgYXBpU2VydmljZS5zZWxlY3RlZFZlcnNpb24gKyBcIi9cIikpOyAgICBcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHBhcnNlTWV0YWRhdGEoYXBpU2VydmljZSwgJHNjb3BlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG59XSk7XHJcblxyXG5hbmd1bGFyLm1vZHVsZSgnQXBpRXhwbG9yZXInKS5jb250cm9sbGVyKCdkYXRhbGlzdEN0cmwnLCBbJyRzY29wZScsICdBcGlFeHBsb3JlclN2YycsIGZ1bmN0aW9uICgkc2NvcGUsIGFwaVNlcnZpY2UpIHtcclxuICAgICRzY29wZS51cmxBcnJheSA9IFtdO1xyXG5cclxuICAgICRzY29wZS5nZXRFbnRpdHkgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICByZXR1cm4gYXBpU2VydmljZS5lbnRpdHk7XHJcbiAgICB9XHJcblxyXG4gICAgJHNjb3BlLmdldFRleHQgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICByZXR1cm4gYXBpU2VydmljZS50ZXh0O1xyXG4gICAgfVxyXG5cclxuICAgICRzY29wZS5nZXRSZXF1ZXN0SGlzdG9yeSA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHJldHVybiByZXF1ZXN0SGlzdG9yeTtcclxuICAgIH1cclxuXHJcbiAgICAkc2NvcGUuJHdhdGNoKFwiZ2V0VGV4dCgpXCIsIGZ1bmN0aW9uKGV2ZW50LCBhcmdzKSB7XHJcbiAgICAgICAgICAgICRzY29wZS50ZXh0ID0gYXBpU2VydmljZS50ZXh0O1xyXG4gICAgICAgICAgICB0aGlzLnNlYXJjaFRleHQgPSAkc2NvcGUudGV4dDtcclxuICAgIH0pO1xyXG5cclxuICAgICRzY29wZS4kcGFyZW50LnNldFJhd1NlYXJjaFRleHQoYXBpU2VydmljZS50ZXh0KTtcclxuXHJcbiAgICAkc2NvcGUuc2VhcmNoVGV4dENoYW5nZSA9IGZ1bmN0aW9uKHNlYXJjaFRleHQpIHtcclxuICAgICAgICB0aGlzLnNlYXJjaFRleHQgPSBzZWFyY2hUZXh0OyAgICAgICAgXHJcbiAgICAgICAgJHNjb3BlLiRwYXJlbnQuc2V0UmF3U2VhcmNoVGV4dChzZWFyY2hUZXh0KTtcclxuICAgICAgICBpZiAoc2VhcmNoVGV4dC5jaGFyQXQoc2VhcmNoVGV4dC5sZW5ndGgtMSkgPT09IFwiL1wiICYmIGFwaVNlcnZpY2UuZW50aXR5ICYmIGdldEVudGl0eU5hbWUoc2VhcmNoVGV4dCkgIT09IGFwaVNlcnZpY2UuZW50aXR5Lm5hbWUpIHtcclxuICAgICAgICAgICAgYXBpU2VydmljZS50ZXh0ID0gc2VhcmNoVGV4dDtcclxuICAgICAgICAgICAgc2V0RW50aXR5KGdldEVudGl0eU5hbWUoc2VhcmNoVGV4dCksIGFwaVNlcnZpY2UsIHRydWUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiB1cGRhdGVVcmxPcHRpb25zKCkge1xyXG4gICAgICAgIHZhciB1cmxPcHRpb25zID0ge307XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJ1cGRhdGluZyB1cmwgb3B0aW9ucyBmb3JcIiwgYXBpU2VydmljZS5lbnRpdHkpO1xyXG4gICAgICAgIGlmIChhcGlTZXJ2aWNlLmVudGl0eSAmJiBhcGlTZXJ2aWNlLmVudGl0eS5uYW1lID09PSBhcGlTZXJ2aWNlLnNlbGVjdGVkVmVyc2lvbikge1xyXG4gICAgICAgICAgICAgICAgdXJsT3B0aW9ucyA9IGFwaVNlcnZpY2UuY2FjaGUuZ2V0KGFwaVNlcnZpY2Uuc2VsZWN0ZWRWZXJzaW9uICsgXCJFbnRpdHlTZXREYXRhXCIpO1xyXG4gICAgICAgICAgICAgICAgYXBpU2VydmljZS5lbnRpdHkubmFtZSA9IGFwaVNlcnZpY2Uuc2VsZWN0ZWRWZXJzaW9uO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoYXBpU2VydmljZS5lbnRpdHkgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICB1cmxPcHRpb25zID0gYXBpU2VydmljZS5lbnRpdHkuVVJMUztcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL2ZvciBlYWNoIG5ldyBVUkwgdG8gYWRkXHJcbiAgICAgICAgZm9yKHZhciB4IGluIHVybE9wdGlvbnMpIHtcclxuICAgICAgICAgICAgdmFyIHNlcGFyYXRvciA9ICcnO1xyXG4gICAgICAgICAgICBpZiAoYXBpU2VydmljZS50ZXh0LmNoYXJBdCgoYXBpU2VydmljZS50ZXh0KS5sZW5ndGgtMSkgIT0gJy8nKSB7XHJcbiAgICAgICAgICAgICAgICBzZXBhcmF0b3IgPSAnLydcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdXJsT3B0aW9uc1t4XS5hdXRvY29tcGxldGVWYWwgPSBhcGlTZXJ2aWNlLnRleHQgKyBzZXBhcmF0b3IgKyB1cmxPcHRpb25zW3hdLm5hbWU7XHJcblxyXG4gICAgICAgICAgICBpZiAoJHNjb3BlLnVybEFycmF5LmluZGV4T2YodXJsT3B0aW9uc1t4XSkgPT0gLTEpXHJcbiAgICAgICAgICAgICAgICAkc2NvcGUudXJsQXJyYXkucHVzaCh1cmxPcHRpb25zW3hdKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIC8vIG1vc3RseSB1c2VkIGZvciB0aGUgaW5pdGlhbCBwYWdlIGxvYWQsIHdoZW4gdGhlIGVudGl0eSBpcyBzZXQgKG1lL3VzZXIpLCAgbG9hZCB0aGUgcG9zc2libGUgVVJMIG9wdGlvbnNcclxuICAgICRzY29wZS4kd2F0Y2goXCJnZXRFbnRpdHkoKVwiLCBmdW5jdGlvbihuZXdWYWx1ZSwgb2xkVmFsdWUpIHtcclxuICAgICAgICBpZiAob2xkVmFsdWUgIT09IG5ld1ZhbHVlKVxyXG4gICAgICAgICAgICB1cGRhdGVVcmxPcHRpb25zKClcclxuICAgIH0sIHRydWUpO1xyXG5cclxuICAgICRzY29wZS5nZXRNYXRjaGVzID0gZnVuY3Rpb24ocXVlcnkpIHtcclxuICAgICAgICByZXR1cm4gJHNjb3BlLnVybEFycmF5LmZpbHRlcihmdW5jdGlvbihvcHRpb24pIHtcclxuICAgICAgICAgICAgdmFyIHF1ZXJ5SW5PcHRpb24gPSAob3B0aW9uLmF1dG9jb21wbGV0ZVZhbC5pbmRleE9mKHF1ZXJ5KT4tMSk7XHJcbiAgICAgICAgICAgIHZhciBxdWVyeUlzRW1wdHkgPSAoZ2V0RW50aXR5TmFtZShxdWVyeSkubGVuZ3RoID09IDApO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHF1ZXJ5SXNFbXB0eSB8fCBxdWVyeUluT3B0aW9uO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgICRzY29wZS5wcm9jZXNzQXV0b2NvbXBsZXRlQ2xpY2sgPSBmdW5jdGlvbihpdGVtKSB7XHJcbiAgICAgICAgJHNjb3BlLiRwYXJlbnQuc2VsZWN0ZWRJdGVtQ2hhbmdlKGl0ZW0pXHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYgKGl0ZW0gJiYgaXRlbS5hdXRvY29tcGxldGVWYWwpXHJcbiAgICAgICAgICAgICRzY29wZS4kcGFyZW50LnNldFJhd1NlYXJjaFRleHQoaXRlbS5hdXRvY29tcGxldGVWYWwpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh3aW5kb3cucnVuVGVzdHMpXHJcbiAgICAgICAgIHJ1bkF1dG9Db21wbGV0ZVRlc3RzKGFwaVNlcnZpY2UpO1xyXG5cclxufV0pO1xyXG5cclxuXHJcbmFuZ3VsYXIubW9kdWxlKCdBcGlFeHBsb3JlcicpLmNvbnRyb2xsZXIoJ0Zvcm1DdHJsJywgWyckc2NvcGUnLCAnQXBpRXhwbG9yZXJTdmMnLCBmdW5jdGlvbiAoJHNjb3BlLCBhcGlTZXJ2aWNlKSB7XHJcbiAgICAkc2NvcGUudGV4dCA9IGFwaVNlcnZpY2UudGV4dDtcclxuICAgICRzY29wZS5yZXF1ZXN0SW5Qcm9ncmVzcyA9IGZhbHNlO1xyXG4gICAgJHNjb3BlLmVudGl0eUl0ZW0gPSBudWxsO1xyXG4gICAgJHNjb3BlLmluc3VmZmljaWVudFByaXZpbGVnZXMgPSBmYWxzZTtcclxuXHJcbiAgICAvLyAkc2NvcGUuZ2V0QXNzZXRQYXRoID0gZnVuY3Rpb24ocmVsUGF0aCkge1xyXG4gICAgLy8gICAgIHJldHVybiAkc2NvcGUuJHBhcmVudC5wYXRoVG9CdWlsZERpciArIHJlbFBhdGhcclxuICAgIC8vIH1cclxuXHJcbiAgICBpZiAoaGVsbG8oJ21zZnQnKS5nZXRBdXRoUmVzcG9uc2UoKSAhPSBudWxsICYmIFxyXG4gICAgICAgIChhcGlTZXJ2aWNlLnNlbGVjdGVkT3B0aW9uID09PSAnUE9TVCcgfHwgYXBpU2VydmljZS5zZWxlY3RlZE9wdGlvbiA9PT0gJ1BBVENIJykpIHtcclxuICAgICAgICAgICAgc2hvd1JlcXVlc3RCb2R5RWRpdG9yKCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIHNldFNlbGVjdGVkVGFiKDApO1xyXG4gICAgfVxyXG5cclxuICAgICRzY29wZS5zdWJtaXNzaW9uSW5Qcm9ncmVzcyA9IGZhbHNlO1xyXG4gICAgICAgICAgICBcclxuICAgICRzY29wZS5nZXRUZXh0ID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgcmV0dXJuIGFwaVNlcnZpY2UudGV4dDtcclxuICAgIH1cclxuICAgIFxyXG4gICAgJHNjb3BlLiR3YXRjaChcImdldFRleHQoKVwiLCBmdW5jdGlvbihldmVudCwgYXJncykge1xyXG4gICAgICAgICRzY29wZS50ZXh0ID0gYXBpU2VydmljZS50ZXh0O1xyXG4gICAgfSk7XHJcbiBcclxuICAgIC8vIGN1c3RvbSBsaW5rIHJlLXJvdXRpbmcgbG9naWMgdG8gcmVzb2x2ZSBsaW5rc1xyXG4gICAgJHNjb3BlLiRwYXJlbnQuJG9uKFwidXJsQ2hhbmdlXCIsIGZ1bmN0aW9uIChldmVudCwgYXJncykge1xyXG4gICAgICAgIG1zR3JhcGhMaW5rUmVzb2x1dGlvbigkc2NvcGUsICRzY29wZS4kcGFyZW50Lmpzb25WaWV3ZXIuZ2V0U2Vzc2lvbigpLmdldFZhbHVlKCksIGFyZ3MsIGFwaVNlcnZpY2UpO1xyXG4gICAgfSk7XHJcbiAgICBcclxuICAgIC8vIGZ1bmN0aW9uIGNhbGxlZCB3aGVuIGxpbmsgaW4gdGhlIGJhY2sgYnV0dG9uIGhpc3RvcnkgaXMgY2xpY2tlZFxyXG4gICAgJHNjb3BlLmhpc3RvcnlPbkNsaWNrID0gZnVuY3Rpb24oaGlzdG9yeUl0ZW0pIHtcclxuICAgICAgICAkc2NvcGUudGV4dCA9IGhpc3RvcnlJdGVtLnVybFRleHQ7XHJcbiAgICAgICAgYXBpU2VydmljZS5zZWxlY3RlZFZlcnNpb24gPSBoaXN0b3J5SXRlbS5zZWxlY3RlZFZlcnNpb247XHJcbiAgICAgICAgYXBpU2VydmljZS5zZWxlY3RlZE9wdGlvbiA9IGhpc3RvcnlJdGVtLmh0bWxPcHRpb247XHJcblxyXG4gICAgICAgIGlmIChoaXN0b3J5SXRlbS5odG1sT3B0aW9uID09ICdQT1NUJyB8fCBoaXN0b3J5SXRlbS5odG1sT3B0aW9uID09ICdQQVRDSCcpIHtcclxuICAgICAgICAgICAgYXBpU2VydmljZS5zaG93SnNvbkVkaXRvciA9IHRydWU7XHJcbiAgICAgICAgICAgIGlmICgkc2NvcGUuanNvbkVkaXRvcikge1xyXG4gICAgICAgICAgICAgICAgJHNjb3BlLmpzb25FZGl0b3IuZ2V0U2Vzc2lvbigpLnNldFZhbHVlKGhpc3RvcnlJdGVtLmpzb25JbnB1dCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKFwianNvbiBlZGl0b3Igd2F0Y2ggZXZlbnQgbm90IGZpcmluZ1wiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIC8vY2xlYXIganNvbkVkaXRvclxyXG4gICAgICAgICAgICBpZiAoJHNjb3BlLmpzb25FZGl0b3IpIHtcclxuICAgICAgICAgICAgICAgICRzY29wZS5qc29uRWRpdG9yLmdldFNlc3Npb24oKS5zZXRWYWx1ZShcIlwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBhcGlTZXJ2aWNlLnNob3dKc29uRWRpdG9yID0gZmFsc2U7XHJcblxyXG4gICAgICAgIH1cclxuICAgICAgICAkc2NvcGUuc3VibWl0KCRzY29wZS50ZXh0KTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgJHNjb3BlLmNsb3NlQWRtaW5Db25zZW50QmFyID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgJHNjb3BlLmluc3VmZmljaWVudFByaXZpbGVnZXMgPSBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICAkc2NvcGUuZ2V0QWRtaW5Db25zZW50ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGhlbGxvKCdtc2Z0X2FkbWluX2NvbnNlbnQnKS5sb2dpbih7XHJcbiAgICAgICAgICAgIGRpc3BsYXk6ICdwb3B1cCdcclxuICAgICAgICB9KS50aGVuKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAkc2NvcGUuZmluaXNoQWRtaW5Db25zZXJ0RmxvdygpO1xyXG4gICAgICAgIH0sIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAkc2NvcGUuZmluaXNoQWRtaW5Db25zZXJ0RmxvdygpO1xyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcbiAgICBcclxuICAgICRzY29wZS5zZWxlY3RlZEl0ZW1DaGFuZ2UgPSBmdW5jdGlvbihpdGVtKSB7XHJcbiAgICAgICAgJHNjb3BlLmVudGl0eUl0ZW0gPSBpdGVtO1xyXG4gICAgfVxyXG4gICAgXHJcblxyXG4gICAgJHNjb3BlLnN1Ym1pdCA9IGZ1bmN0aW9uIChxdWVyeSkge1xyXG4gICAgICAgIGlmICghcXVlcnkpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgYXBpU2VydmljZS50ZXh0ID0gcXVlcnk7XHJcbiAgICAgICAgJHNjb3BlLnJlcXVlc3RJblByb2dyZXNzID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgLy9jcmVhdGUgYW4gb2JqZWN0IHRvIHN0b3JlIHRoZSBhcGkgY2FsbFxyXG4gICAgICAgIHZhciBoaXN0b3J5T2JqID0ge307XHJcblxyXG4gICAgICAgIGhpc3RvcnlPYmoudXJsVGV4dCA9IHF1ZXJ5O1xyXG4gICAgICAgIGhpc3RvcnlPYmouc2VsZWN0ZWRWZXJzaW9uID0gYXBpU2VydmljZS5zZWxlY3RlZFZlcnNpb247XHJcbiAgICAgICAgaGlzdG9yeU9iai5odG1sT3B0aW9uID0gYXBpU2VydmljZS5zZWxlY3RlZE9wdGlvbjtcclxuICAgICAgICBoaXN0b3J5T2JqLmpzb25JbnB1dCA9IFwiXCI7XHJcblxyXG5cclxuICAgICAgICBpZiAoaGlzdG9yeU9iai5odG1sT3B0aW9uID09ICdQT1NUJyB8fCBoaXN0b3J5T2JqLmh0bWxPcHRpb24gPT0gJ1BBVENIJykge1xyXG4gICAgICAgICAgICBoaXN0b3J5T2JqLmpzb25JbnB1dCA9ICRzY29wZS5qc29uRWRpdG9yLmdldFNlc3Npb24oKS5nZXRWYWx1ZSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgJHNjb3BlLnNob3dKc29uVmlld2VyID0gdHJ1ZTtcclxuICAgICAgICAkc2NvcGUuc2hvd0ltYWdlID0gZmFsc2U7XHJcblxyXG5cclxuICAgICAgICB2YXIgcG9zdEJvZHkgPSBcIlwiO1xyXG4gICAgICAgIGlmICgkc2NvcGUuanNvbkVkaXRvciAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgcG9zdEJvZHkgPSAkc2NvcGUuanNvbkVkaXRvci5nZXRTZXNzaW9uKCkuZ2V0VmFsdWUoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHZhciByZXF1ZXN0SGVhZGVycyA9IFwiXCI7XHJcbiAgICAgICAgaWYgKCRzY29wZS5qc29uRWRpdG9ySGVhZGVycyAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgcmVxdWVzdEhlYWRlcnMgPSAkc2NvcGUuanNvbkVkaXRvckhlYWRlcnMuZ2V0U2Vzc2lvbigpLmdldFZhbHVlKCk7XHJcbiAgICAgICAgICAgIHJlcXVlc3RIZWFkZXJzID0gZm9ybWF0UmVxdWVzdEhlYWRlcnMocmVxdWVzdEhlYWRlcnMpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdmFyIHN0YXJ0VGltZSA9IG5ldyBEYXRlKCk7XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGhhbmRsZVN1Y2Nlc3NmdWxRdWVyeVJlc3BvbnNlKHJlc3VsdCkge1xyXG4gICAgICAgICAgICB2YXIgc3RhdHVzID0gcmVzdWx0LnN0YXR1cztcclxuICAgICAgICAgICAgdmFyIGhlYWRlcnMgPSByZXN1bHQuaGVhZGVycztcclxuXHJcbiAgICAgICAgICAgIGlmIChpc0ltYWdlUmVzcG9uc2UoaGVhZGVycykpIHtcclxuICAgICAgICAgICAgICAgIGhhbmRsZUltYWdlUmVzcG9uc2UoJHNjb3BlLCBhcGlTZXJ2aWNlLCBzdGFydFRpbWUsIHJlc3VsdCwgaGVhZGVycywgc3RhdHVzLCBoYW5kbGVVbnN1Y2Nlc3NmdWxRdWVyeVJlc3BvbnNlKTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChpc0h0bWxSZXNwb25zZShoZWFkZXJzKSkge1xyXG4gICAgICAgICAgICAgICAgaGFuZGxlSHRtbFJlc3BvbnNlKCRzY29wZSwgc3RhcnRUaW1lLCByZXN1bHQsIGhlYWRlcnMsIHN0YXR1cyk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoaXNYbWxSZXNwb25zZShyZXN1bHQpKSB7XHJcbiAgICAgICAgICAgICAgICBoYW5kbGVYbWxSZXNwb25zZSgkc2NvcGUsIHN0YXJ0VGltZSwgcmVzdWx0LCBoZWFkZXJzLCBzdGF0dXMpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgaGFuZGxlSnNvblJlc3BvbnNlKCRzY29wZSwgc3RhcnRUaW1lLCByZXN1bHQuZGF0YSwgaGVhZGVycywgc3RhdHVzKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgc2F2ZUhpc3RvcnlPYmplY3QoaGlzdG9yeU9iaiwgc3RhdHVzLCBuZXcgRGF0ZSgpIC0gc3RhcnRUaW1lKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChhcGlTZXJ2aWNlLmNhY2hlLmdldChhcGlTZXJ2aWNlLnNlbGVjdGVkVmVyc2lvbiArIFwiTWV0YWRhdGFcIikgJiYgYXBpU2VydmljZS5zZWxlY3RlZE9wdGlvbiA9PSBcIkdFVFwiKSB7XHJcbiAgICAgICAgICAgICAgICBzZXRFbnRpdHkoJHNjb3BlLmVudGl0eUl0ZW0sIGFwaVNlcnZpY2UsIHRydWUsIGFwaVNlcnZpY2UudGV4dCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICRzY29wZS5pbnN1ZmZpY2llbnRQcml2aWxlZ2VzID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiBoYW5kbGVVbnN1Y2Nlc3NmdWxRdWVyeVJlc3BvbnNlKHJlc3VsdCkge1xyXG4gICAgICAgICAgICB2YXIgc3RhdHVzID0gcmVzdWx0LnN0YXR1cztcclxuICAgICAgICAgICAgdmFyIGhlYWRlcnMgPSByZXN1bHQuaGVhZGVycztcclxuICAgICAgICAgICAgaGFuZGxlSnNvblJlc3BvbnNlKCRzY29wZSwgc3RhcnRUaW1lLCByZXN1bHQuZGF0YSwgaGVhZGVycywgc3RhdHVzKTtcclxuICAgICAgICAgICAgc2F2ZUhpc3RvcnlPYmplY3QoaGlzdG9yeU9iaiwgc3RhdHVzLCBuZXcgRGF0ZSgpIC0gc3RhcnRUaW1lKTtcclxuICAgICAgICAgICAgaWYgKGFwaVNlcnZpY2UuY2FjaGUuZ2V0KGFwaVNlcnZpY2Uuc2VsZWN0ZWRWZXJzaW9uICsgXCJNZXRhZGF0YVwiKSAmJiBhcGlTZXJ2aWNlLnNlbGVjdGVkT3B0aW9uID09IFwiR0VUXCIpIHtcclxuICAgICAgICAgICAgICAgIHNldEVudGl0eSgkc2NvcGUuZW50aXR5SXRlbSwgYXBpU2VydmljZSwgZmFsc2UsIGFwaVNlcnZpY2UudGV4dCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChzdGF0dXMgPT09IDQwMSB8fCBzdGF0dXMgPT09IDQwMykge1xyXG4gICAgICAgICAgICAgICAgJHNjb3BlLmluc3VmZmljaWVudFByaXZpbGVnZXMgPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgaWYgKCRzY29wZS5pc0F1dGhlbnRpY2F0ZWQoKSkge1xyXG4gICAgICAgICAgICBhcGlTZXJ2aWNlLnBlcmZvcm1RdWVyeShhcGlTZXJ2aWNlLnNlbGVjdGVkT3B0aW9uKShhcGlTZXJ2aWNlLnRleHQsIHBvc3RCb2R5LCByZXF1ZXN0SGVhZGVycylcclxuICAgICAgICAgICAgICAgIC50aGVuKGhhbmRsZVN1Y2Nlc3NmdWxRdWVyeVJlc3BvbnNlLCBoYW5kbGVVbnN1Y2Nlc3NmdWxRdWVyeVJlc3BvbnNlKTtcclxuXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgYXBpU2VydmljZS5wZXJmb3JtQW5vbnltb3VzUXVlcnkoYXBpU2VydmljZS5zZWxlY3RlZE9wdGlvbikoYXBpU2VydmljZS50ZXh0LCBwb3N0Qm9keSwgcmVxdWVzdEhlYWRlcnMpXHJcbiAgICAgICAgICAgICAgICAudGhlbihoYW5kbGVTdWNjZXNzZnVsUXVlcnlSZXNwb25zZSwgaGFuZGxlVW5zdWNjZXNzZnVsUXVlcnlSZXNwb25zZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxufV0pOyIsIi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4vLyAgQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uICBBbGwgUmlnaHRzIFJlc2VydmVkLiAgTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiAgU2VlIExpY2Vuc2UgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cclxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcblxyXG4vLyBnZXQgdGhlIHBhdGggdG8gdGhpcyBzY3JpcHRcclxudmFyIHNjcmlwdHMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcInNjcmlwdFwiKVxyXG52YXIgc3JjID0gc2NyaXB0c1tzY3JpcHRzLmxlbmd0aC0xXS5zcmM7XHJcbnZhciBwYXRoVG9CdWlsZERpciA9IHNyYy5zcGxpdCgnLycpLnNsaWNlKDAsIC0yKS5qb2luKCcvJyk7XHJcblxyXG5hbmd1bGFyLm1vZHVsZSgnQXBpRXhwbG9yZXInKVxyXG4gICAgLmRpcmVjdGl2ZSgnYXBpRXhwbG9yZXInLCBmdW5jdGlvbigpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBzY29wZToge1xyXG4gICAgICAgICAgICAgICAgc3RyaW5nczogJz0nLFxyXG4gICAgICAgICAgICAgICAgbGFuZ3VhZ2U6ICc9JyxcclxuICAgICAgICAgICAgICAgIHNjb3BlczogJz0nLFxyXG4gICAgICAgICAgICAgICAgYWRtaW5TY29wZXM6ICc9JyxcclxuICAgICAgICAgICAgICAgIGNsaWVudElkOiAnPScsXHJcbiAgICAgICAgICAgICAgICByZWRpcmVjdFVybDogJz0nXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiBwYXRoVG9CdWlsZERpcisnL2Fzc2V0cy92aWV3cy9leHBsb3Jlci5odG1sJyxcclxuICAgICAgICAgICAgY29udHJvbGxlcjogZnVuY3Rpb24gKCRzY29wZSkge1xyXG4gICAgICAgICAgICAgICAgJHNjb3BlLnBhdGhUb0J1aWxkRGlyID0gcGF0aFRvQnVpbGREaXI7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gZGVmYXVsdCBzdHJpbmdzXHJcbiAgICAgICAgICAgICAgICAkc2NvcGUuc3RyID0gbG9jX3N0cmluZ3NbJ2VuX3VzJ107XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gaWYgdGhlIHVzZXIgc3BlY2lmaWVkIGEgbGFuZ3VhZ2UsIHVzZSB0aGF0IGluc3RlYWRcclxuICAgICAgICAgICAgICAgIGlmICgkc2NvcGUubGFuZ3VhZ2UpIHtcclxuICAgICAgICAgICAgICAgICAgICAkc2NvcGUuc3RyID0gbG9jX3N0cmluZ3NbJHNjb3BlLmxhbmd1YWdlXTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAvLyBtZXJnZSAkc2NvcGUuc3RyaW5ncyBpbnRvICRzY29wZS5zdHJcclxuICAgICAgICAgICAgICAgIGFuZ3VsYXIuZXh0ZW5kKCRzY29wZS5zdHIsICRzY29wZS5zdHJpbmdzKTtcclxuXHJcblxyXG4gICAgICAgICAgICAgICAgaGVsbG8uaW5pdCgge1xyXG4gICAgICAgICAgICAgICAgICAgIG1zZnQ6ICRzY29wZS5jbGllbnRJZFxyXG4gICAgICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgICAgIHNjb3BlOiAkc2NvcGUuc2NvcGVzLFxyXG4gICAgICAgICAgICAgICAgICAgIHJlZGlyZWN0X3VyaTogd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lIC8vcmVxdWlyZWQgdG8gcmVtb3ZlIGV4dHJhIHVybCBwYXJhbXMgdGhhdCBtYWtlIFVSTHMgbm90IG1hdGNoXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICBoZWxsby5pbml0KCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbXNmdF9hZG1pbl9jb25zZW50OiAkc2NvcGUuY2xpZW50SWQsXHJcbiAgICAgICAgICAgICAgICAgICAgbXNmdF90b2tlbl9yZWZyZXNoOiAkc2NvcGUuY2xpZW50SWQsXHJcbiAgICAgICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVkaXJlY3RfdXJpOiB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWVcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgIH0pOyIsIi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4vLyAgQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uICBBbGwgUmlnaHRzIFJlc2VydmVkLiAgTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiAgU2VlIExpY2Vuc2UgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cclxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcblxyXG5mdW5jdGlvbiBpbml0aWFsaXplSnNvbkVkaXRvcigkc2NvcGUsIGJvZHlWYWwpIHtcclxuICAgIHZhciBqc29uVmlld2VyRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwianNvbkVkaXRvclwiKTtcclxuICAgIGpzb25FZGl0b3IgPSBhY2UuZWRpdChqc29uVmlld2VyRWxlbWVudCk7XHJcbiAgICBqc29uRWRpdG9yLmdldFNlc3Npb24oKS5zZXRNb2RlKFwiYWNlL21vZGUvamF2YXNjcmlwdFwiKTtcclxuICAgIGpzb25FZGl0b3IuJGJsb2NrU2Nyb2xsaW5nID0gSW5maW5pdHk7XHJcbiAgICBcclxuICAgIGpzb25FZGl0b3Iuc2V0U2hvd1ByaW50TWFyZ2luKGZhbHNlKTtcclxuICAgIGlmIChib2R5VmFsKSB7XHJcbiAgICAgICAganNvbkVkaXRvci5nZXRTZXNzaW9uKCkuaW5zZXJ0KHtyb3c6MCwgY29sdW1uOjB9LCBib2R5VmFsKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAganNvbkVkaXRvci5nZXRTZXNzaW9uKCkuaW5zZXJ0KDAsIFwiIFwiKTtcclxuICAgIH1cclxuXHJcbiAgICBqc29uRWRpdG9yLnJlbmRlcmVyLnNldE9wdGlvbignc2hvd0xpbmVOdW1iZXJzJywgZmFsc2UpO1xyXG4gICAgLy9hY2Nlc3NpYmlsaXR5IC0ga2V5Ym9hcmQgZGVwZW5kYW50IHVzZXJzIG11c3QgYmUgYWJsZSB0byBcInRhYiBvdXRcIiBvZiBzZXNzaW9uXHJcbiAgICBqc29uRWRpdG9yLmNvbW1hbmRzLmJpbmRLZXkoXCJUYWJcIiwgbnVsbCk7XHJcbiAgICAkc2NvcGUuanNvbkVkaXRvciA9IGpzb25FZGl0b3I7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGluaXRpYWxpemVKc29uRWRpdG9ySGVhZGVycygkc2NvcGUsIGhlYWRlcnNWYWwpIHtcclxuICAgIHZhciBqc29uVmlld2VyRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwianNvbkVkaXRvckhlYWRlcnNcIik7XHJcbiAgICBpZiAoIWpzb25WaWV3ZXJFbGVtZW50KSB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcignY2Fubm90IGZpbmQgI2pzb25FZGl0b3JIZWFkZXJzJylcclxuICAgIH1cclxuICAgIGpzb25FZGl0b3JIZWFkZXJzID0gYWNlLmVkaXQoanNvblZpZXdlckVsZW1lbnQpO1xyXG4gICAganNvbkVkaXRvckhlYWRlcnMuc2V0U2hvd1ByaW50TWFyZ2luKGZhbHNlKTtcclxuXHJcbiAgICBqc29uRWRpdG9ySGVhZGVycy4kYmxvY2tTY3JvbGxpbmcgPSBJbmZpbml0eTtcclxuICAgIC8vYWNjZXNzaWJpbGl0eSAtIGtleWJvYXJkIGRlcGVuZGFudCB1c2VycyBtdXN0IGJlIGFibGUgdG8gXCJ0YWIgb3V0XCIgb2Ygc2Vzc2lvblxyXG4gICAgaWYoaGVhZGVyc1ZhbCkge1xyXG4gICAgICAgIGpzb25FZGl0b3JIZWFkZXJzLmdldFNlc3Npb24oKS5pbnNlcnQoMCwgaGVhZGVyc1ZhbCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIGpzb25FZGl0b3JIZWFkZXJzLmdldFNlc3Npb24oKS5pbnNlcnQoMCwgXCIgXCIpO1xyXG4gICAgfVxyXG4gICAganNvbkVkaXRvckhlYWRlcnMucmVuZGVyZXIuc2V0T3B0aW9uKCdzaG93TGluZU51bWJlcnMnLCBmYWxzZSk7XHJcbiAgICBqc29uRWRpdG9ySGVhZGVycy5tb3ZlQ3Vyc29yVG8oMSwwKTtcclxuICAgIGpzb25FZGl0b3JIZWFkZXJzLmNvbW1hbmRzLmJpbmRLZXkoXCJUYWJcIiwgbnVsbCk7XHJcbiAgICAkc2NvcGUuanNvbkVkaXRvckhlYWRlcnMgPSBqc29uRWRpdG9ySGVhZGVycztcclxufSIsIi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4vLyAgQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uICBBbGwgUmlnaHRzIFJlc2VydmVkLiAgTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiAgU2VlIExpY2Vuc2UgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cclxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcblxyXG5mdW5jdGlvbiBpbml0aWFsaXplSnNvblZpZXdlcigkc2NvcGUsIGFwaVNlcnZpY2UpIHtcclxuICAgICQoZnVuY3Rpb24oKSB7XHJcbiAgICBcclxuICAgICAgICB2YXIganNvblZpZXdlckVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImpzb25WaWV3ZXJcIik7XHJcbiAgICAgICAganNvblZpZXdlciA9IGFjZS5lZGl0KGpzb25WaWV3ZXJFbGVtZW50KTtcclxuICAgICAgICBqc29uVmlld2VyLmdldFNlc3Npb24oKS5zZXRNb2RlKFwiYWNlL21vZGUvamF2YXNjcmlwdFwiKTtcclxuICAgICAgICBcclxuICAgICAgICBqc29uVmlld2VyLiRibG9ja1Njcm9sbGluZyA9IEluZmluaXR5O1xyXG4gICAgICAgIGpzb25WaWV3ZXIucmVuZGVyZXIuc2V0T3B0aW9uKCdzaG93TGluZU51bWJlcnMnLCBmYWxzZSk7XHJcbiAgICAgICAgXHJcbiAgICAgICAganNvblZpZXdlci5zZXRPcHRpb25zKHtcclxuICAgICAgICAgICAgcmVhZE9ubHk6IHRydWUsXHJcbiAgICAgICAgICAgIGhpZ2hsaWdodEFjdGl2ZUxpbmU6IGZhbHNlLFxyXG4gICAgICAgICAgICBoaWdobGlnaHRHdXR0ZXJMaW5lOiBmYWxzZSxcclxuICAgICAgICB9KTtcclxuICAgICAgICBqc29uVmlld2VyLnNldFNob3dQcmludE1hcmdpbihmYWxzZSk7XHJcbiAgICAgICAganNvblZpZXdlci5nZXRTZXNzaW9uKCkuc2V0VXNlV29ya2VyKGZhbHNlKTtcclxuICAgICAgICBqc29uVmlld2VyLnJlbmRlcmVyLiRjdXJzb3JMYXllci5lbGVtZW50LnN0eWxlLm9wYWNpdHkgPSAwO1xyXG5cclxuXHJcbiAgICAgICAgZGVmaW5lKFwiaG92ZXJsaW5rXCIsIFtcInJlcXVpcmVcIiwgXCJleHBvcnRzXCJdLCBmdW5jdGlvbiAocmVxdWlyZSwgZXhwb3J0cywgbW9kdWxlKSB7XHJcbiAgICAgICAgICAgIFwidXNlIHN0cmljdFwiO1xyXG4gICAgICAgICAgICB2YXIgb29wID0gcmVxdWlyZShcImFjZS9saWIvb29wXCIpO1xyXG4gICAgICAgICAgICB2YXIgZXZlbnQgPSByZXF1aXJlKFwiYWNlL2xpYi9ldmVudFwiKTtcclxuICAgICAgICAgICAgdmFyIFJhbmdlID0gcmVxdWlyZShcImFjZS9yYW5nZVwiKS5SYW5nZTtcclxuICAgICAgICAgICAgdmFyIEV2ZW50RW1pdHRlciA9IHJlcXVpcmUoXCJhY2UvbGliL2V2ZW50X2VtaXR0ZXJcIikuRXZlbnRFbWl0dGVyO1xyXG5cclxuICAgICAgICAgICAgdmFyIEhvdmVyTGluayA9IGZ1bmN0aW9uIChqc29uVmlld2VyKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoanNvblZpZXdlci5ob3ZlckxpbmspXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAganNvblZpZXdlci5ob3ZlckxpbmsgPSB0aGlzO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5qc29uVmlld2VyID0ganNvblZpZXdlcjtcclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZSA9IHRoaXMudXBkYXRlLmJpbmQodGhpcyk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm9uTW91c2VNb3ZlID0gdGhpcy5vbk1vdXNlTW92ZS5iaW5kKHRoaXMpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5vbk1vdXNlT3V0ID0gdGhpcy5vbk1vdXNlT3V0LmJpbmQodGhpcyk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm9uQ2xpY2sgPSB0aGlzLm9uQ2xpY2suYmluZCh0aGlzKTtcclxuICAgICAgICAgICAgICAgIGV2ZW50LmFkZExpc3RlbmVyKGpzb25WaWV3ZXIucmVuZGVyZXIuc2Nyb2xsZXIsIFwibW91c2Vtb3ZlXCIsIHRoaXMub25Nb3VzZU1vdmUpO1xyXG4gICAgICAgICAgICAgICAgZXZlbnQuYWRkTGlzdGVuZXIoanNvblZpZXdlci5yZW5kZXJlci5jb250ZW50LCBcIm1vdXNlb3V0XCIsIHRoaXMub25Nb3VzZU91dCk7XHJcbiAgICAgICAgICAgICAgICBldmVudC5hZGRMaXN0ZW5lcihqc29uVmlld2VyLnJlbmRlcmVyLmNvbnRlbnQsIFwiY2xpY2tcIiwgdGhpcy5vbkNsaWNrKTtcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBvb3AuaW1wbGVtZW50KHRoaXMsIEV2ZW50RW1pdHRlcik7XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy50b2tlbiA9IHt9O1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yYW5nZSA9IG5ldyBSYW5nZSgpO1xyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuJHRpbWVyID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICB2YXIganNvblZpZXdlciA9IHRoaXMuanNvblZpZXdlcjtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgcmVuZGVyZXIgPSBqc29uVmlld2VyLnJlbmRlcmVyO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB2YXIgY2FudmFzUG9zID0gcmVuZGVyZXIuc2Nyb2xsZXIuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIG9mZnNldCA9ICh0aGlzLnggKyByZW5kZXJlci5zY3JvbGxMZWZ0IC0gY2FudmFzUG9zLmxlZnQgLSByZW5kZXJlci4kcGFkZGluZykgLyByZW5kZXJlci5jaGFyYWN0ZXJXaWR0aDtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgcm93ID0gTWF0aC5mbG9vcigodGhpcy55ICsgcmVuZGVyZXIuc2Nyb2xsVG9wIC0gY2FudmFzUG9zLnRvcCkgLyByZW5kZXJlci5saW5lSGVpZ2h0KTtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgY29sID0gTWF0aC5yb3VuZChvZmZzZXQpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB2YXIgc2NyZWVuUG9zID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByb3c6IHJvdyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29sdW1uOiBjb2wsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNpZGU6IG9mZnNldCAtIGNvbCA+IDAgPyAxIDogLTFcclxuICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBzZXNzaW9uID0ganNvblZpZXdlci5zZXNzaW9uO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBkb2NQb3MgPSBzZXNzaW9uLnNjcmVlblRvRG9jdW1lbnRQb3NpdGlvbihzY3JlZW5Qb3Mucm93LCBzY3JlZW5Qb3MuY29sdW1uKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHNlbGVjdGlvblJhbmdlID0ganNvblZpZXdlci5zZWxlY3Rpb24uZ2V0UmFuZ2UoKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIXNlbGVjdGlvblJhbmdlLmlzRW1wdHkoKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoc2VsZWN0aW9uUmFuZ2Uuc3RhcnQucm93IDw9IHJvdyAmJiBzZWxlY3Rpb25SYW5nZS5lbmQucm93ID49IHJvdylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmNsZWFyKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICB2YXIgbGluZSA9IGpzb25WaWV3ZXIuc2Vzc2lvbi5nZXRMaW5lKGRvY1Bvcy5yb3cpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChkb2NQb3MuY29sdW1uID09IGxpbmUubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBjbGlwcGVkUG9zID0ganNvblZpZXdlci5zZXNzaW9uLmRvY3VtZW50VG9TY3JlZW5Qb3NpdGlvbihkb2NQb3Mucm93LCBkb2NQb3MuY29sdW1uKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNsaXBwZWRQb3MuY29sdW1uICE9IHNjcmVlblBvcy5jb2x1bW4pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmNsZWFyKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHZhciB0b2tlbiA9IHRoaXMuZmluZExpbmsoZG9jUG9zLnJvdywgZG9jUG9zLmNvbHVtbik7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5saW5rID0gdG9rZW47XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCF0b2tlbikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5jbGVhcigpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmlzT3BlbiA9IHRydWVcclxuICAgICAgICAgICAgICAgICAgICBqc29uVmlld2VyLnJlbmRlcmVyLnNldEN1cnNvclN0eWxlKFwicG9pbnRlclwiKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgc2Vzc2lvbi5yZW1vdmVNYXJrZXIodGhpcy5tYXJrZXIpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJhbmdlID0gbmV3IFJhbmdlKHRva2VuLnJvdywgdG9rZW4uc3RhcnQsIHRva2VuLnJvdywgdG9rZW4uc3RhcnQgKyB0b2tlbi52YWx1ZS5sZW5ndGgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubWFya2VyID0gc2Vzc2lvbi5hZGRNYXJrZXIodGhpcy5yYW5nZSwgXCJhY2VfbGlua19tYXJrZXJcIiwgXCJ0ZXh0XCIsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLmNsZWFyID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmlzT3Blbikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmpzb25WaWV3ZXIuc2Vzc2lvbi5yZW1vdmVNYXJrZXIodGhpcy5tYXJrZXIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmpzb25WaWV3ZXIucmVuZGVyZXIuc2V0Q3Vyc29yU3R5bGUoXCJcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaXNPcGVuID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLmdldE1hdGNoQXJvdW5kID0gZnVuY3Rpb24gKHJlZ0V4cCwgc3RyaW5nLCBjb2wpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgbWF0Y2g7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVnRXhwLmxhc3RJbmRleCA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgc3RyaW5nLnJlcGxhY2UocmVnRXhwLCBmdW5jdGlvbiAoc3RyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBvZmZzZXQgPSBhcmd1bWVudHNbYXJndW1lbnRzLmxlbmd0aCAtIDJdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgbGVuZ3RoID0gc3RyLmxlbmd0aDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG9mZnNldCA8PSBjb2wgJiYgb2Zmc2V0ICsgbGVuZ3RoID49IGNvbClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hdGNoID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXJ0OiBvZmZzZXQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IHN0clxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG1hdGNoO1xyXG4gICAgICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLm9uQ2xpY2sgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGpzb25WaWV3ZXIgPSB0aGlzLmpzb25WaWV3ZXI7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHJlbmRlcmVyID0ganNvblZpZXdlci5yZW5kZXJlcjtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGNhbnZhc1BvcyA9IHJlbmRlcmVyLnNjcm9sbGVyLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBvZmZzZXQgPSAodGhpcy54ICsgcmVuZGVyZXIuc2Nyb2xsTGVmdCAtIGNhbnZhc1Bvcy5sZWZ0IC0gcmVuZGVyZXIuJHBhZGRpbmcpIC8gcmVuZGVyZXIuY2hhcmFjdGVyV2lkdGg7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHJvdyA9IE1hdGguZmxvb3IoKHRoaXMueSArIHJlbmRlcmVyLnNjcm9sbFRvcCAtIGNhbnZhc1Bvcy50b3ApIC8gcmVuZGVyZXIubGluZUhlaWdodCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGNvbCA9IE1hdGgucm91bmQob2Zmc2V0KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMubGluaykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocm93ICE9IHRoaXMubGluay5yb3cgfHwgIShjb2wgPiB0aGlzLmxpbmsuc3RhcnQgJiYgY29sIDwgdGhpcy5saW5rLnN0YXJ0ICsgdGhpcy5saW5rLnZhbHVlLmxlbmd0aCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5saW5rLmpzb25WaWV3ZXIgPSB0aGlzLmpzb25WaWV3ZXI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3NpZ25hbChcIm9wZW5cIiwgdGhpcy5saW5rKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jbGVhcigpXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLmZpbmRMaW5rID0gZnVuY3Rpb24gKHJvdywgY29sdW1uKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGpzb25WaWV3ZXIgPSB0aGlzLmpzb25WaWV3ZXI7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHNlc3Npb24gPSBqc29uVmlld2VyLnNlc3Npb247XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGxpbmUgPSBzZXNzaW9uLmdldExpbmUocm93KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIG1hdGNoID0gdGhpcy5nZXRNYXRjaEFyb3VuZCgvaHR0cHM/OlxcL1xcL1teXFxzXCJdKy9nLCBsaW5lLCBjb2x1bW4pO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghbWF0Y2gpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG1hdGNoID0gdGhpcy5nZXRNYXRjaEFyb3VuZCgvXCJpZFwiOiBcIlteXFxzXCInXSsvZywgbGluZSwgY29sdW1uKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFtYXRjaCkgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtYXRjaCA9IHRoaXMuZ2V0TWF0Y2hBcm91bmQoL1wiW15cXHNcIiddKy9nLCBsaW5lLCBjb2x1bW4pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIW1hdGNoKSByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBtYXRjaC5yb3cgPSByb3c7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG1hdGNoO1xyXG4gICAgICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLm9uTW91c2VNb3ZlID0gZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5qc29uVmlld2VyLiRtb3VzZUhhbmRsZXIuaXNNb3VzZVByZXNzZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLmpzb25WaWV3ZXIuc2VsZWN0aW9uLmlzRW1wdHkoKSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY2xlYXIoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnggPSBlLmNsaWVudFg7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy55ID0gZS5jbGllbnRZO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlKCk7XHJcbiAgICAgICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMub25Nb3VzZU91dCA9IGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jbGVhcigpO1xyXG4gICAgICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLmRlc3Ryb3kgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vbk1vdXNlT3V0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQucmVtb3ZlTGlzdGVuZXIodGhpcy5qc29uVmlld2VyLnJlbmRlcmVyLnNjcm9sbGVyLCBcIm1vdXNlbW92ZVwiLCB0aGlzLm9uTW91c2VNb3ZlKTtcclxuICAgICAgICAgICAgICAgICAgICBldmVudC5yZW1vdmVMaXN0ZW5lcih0aGlzLmpzb25WaWV3ZXIucmVuZGVyZXIuY29udGVudCwgXCJtb3VzZW91dFwiLCB0aGlzLm9uTW91c2VPdXQpO1xyXG4gICAgICAgICAgICAgICAgICAgIGRlbGV0ZSB0aGlzLmpzb25WaWV3ZXIuaG92ZXJMaW5rO1xyXG4gICAgICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIH0pLmNhbGwoSG92ZXJMaW5rLnByb3RvdHlwZSk7XHJcblxyXG4gICAgICAgICAgICBleHBvcnRzLkhvdmVyTGluayA9IEhvdmVyTGluaztcclxuXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIEhvdmVyTGluayA9IHJlcXVpcmUoXCJob3ZlcmxpbmtcIikuSG92ZXJMaW5rXHJcbiAgICAgICAganNvblZpZXdlci5ob3ZlckxpbmsgPSBuZXcgSG92ZXJMaW5rKGpzb25WaWV3ZXIpO1xyXG4gICAgICAgIGpzb25WaWV3ZXIuaG92ZXJMaW5rLm9uKFwib3BlblwiLCBmdW5jdGlvbiAoeCkge1xyXG4gICAgICAgICAgICBydW4oJHNjb3BlLCB4LnZhbHVlLCBhcGlTZXJ2aWNlKTtcclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICAkc2NvcGUuanNvblZpZXdlciA9IGpzb25WaWV3ZXI7XHJcbiAgICB9KTtcclxufVxyXG5cclxuZnVuY3Rpb24gc2V0SnNvblZpZXdlckNvbnRlbnRUeXBlKG1vZGUpIHtcclxuICAgIGpzb25WaWV3ZXIuZ2V0U2Vzc2lvbigpLnNldE1vZGUoXCJhY2UvbW9kZS9cIiArIG1vZGUpO1xyXG59IiwiLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbi8vICBDb3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi4gIEFsbCBSaWdodHMgUmVzZXJ2ZWQuICBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuICBTZWUgTGljZW5zZSBpbiB0aGUgcHJvamVjdCByb290IGZvciBsaWNlbnNlIGluZm9ybWF0aW9uLlxyXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHJcbnZhciBtc0dyYXBoTGlua1Jlc29sdXRpb24gPSBmdW5jdGlvbiAoJHNjb3BlLCBib2R5LCBhcmdzLCBzZXJ2aWNlKSB7XHJcbiAgICBpZiAoYXJncy5pbmRleE9mKFwiaHR0cHM6Ly9cIikgPT0gLTEpIHtcclxuICAgICAgICBpZiAoc2VydmljZS50ZXh0LmluZGV4T2YoYXJncy5zdWJzdHIoMSkpICE9IC0xKSB7XHJcblxyXG4gICAgICAgIH0gZWxzZSBpZiAoc2VydmljZS50ZXh0LmluZGV4T2YoXCIvbWVcIikgIT0gLTEgJiYgc2VydmljZS50ZXh0LmluZGV4T2YoXCIvbWUvXCIpID09IC0xICYmIHNlcnZpY2UudGV4dC5pbmRleE9mKFwiL21lbWJlck9mXCIpID09IC0xKSB7XHJcbiAgICAgICAgICAgIHNlcnZpY2UudGV4dCA9IHNlcnZpY2UudGV4dC5yZXBsYWNlKFwiL21lXCIsIFwiXCIpICsgXCIvdXNlcnMvXCIgKyBhcmdzLnN1YnN0cigxKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgLy8gaWYgdHlwZSBleGlzdHNcclxuICAgICAgICAgICAgdmFyIGluZGV4ID0gYm9keS5pbmRleE9mKGFyZ3Muc3Vic3RyKDEpKTtcclxuICAgICAgICAgICAgdmFyIHR5cGVJbmRleCA9IGJvZHkubGFzdEluZGV4T2YoJ0BvZGF0YS50eXBlJywgaW5kZXgpO1xyXG4gICAgICAgICAgICBpZiAodHlwZUluZGV4ICE9IC0xKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgdHlwZUluZGV4RW5kID0gYm9keS5pbmRleE9mKFwiXFxuXCIsIHR5cGVJbmRleCk7XHJcbiAgICAgICAgICAgICAgICB2YXIgdHlwZSA9IGJvZHkuc3Vic3RyKHR5cGVJbmRleCwgdHlwZUluZGV4RW5kIC0gdHlwZUluZGV4KTtcclxuICAgICAgICAgICAgICAgIHR5cGUgPSB0eXBlLnJlcGxhY2UoXCJAb2RhdGEudHlwZVxcXCI6IFxcXCIjbWljcm9zb2Z0LmdyYXBoLlwiLCBcIlwiKTtcclxuICAgICAgICAgICAgICAgIHR5cGUgPSB0eXBlLnJlcGxhY2UoXCJcXFwiXCIsIFwiXCIpLnJlcGxhY2UoXCIsXCIsIFwiXCIpO1xyXG4gICAgICAgICAgICAgICAgc2VydmljZS50ZXh0ID0gXCJodHRwczovL2dyYXBoLm1pY3Jvc29mdC5jb20vdjEuMC9cIiArIHR5cGUgKyBcInMvXCIgKyBhcmdzLnN1YnN0cigxKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGlmIChzZXJ2aWNlLnRleHQuaW5kZXhPZihcIj9cIikgIT0gLTEpIHtcclxuICAgICAgICAgICAgICAgICAgICBzZXJ2aWNlLnRleHQgPSBzZXJ2aWNlLnRleHQuc3Vic3RyKDAsIHNlcnZpY2UudGV4dC5pbmRleE9mKFwiP1wiKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBzZXJ2aWNlLnRleHQgPSBzZXJ2aWNlLnRleHQgKyBcIi9cIiArIGFyZ3Muc3Vic3RyKDEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBzZXJ2aWNlLnRleHQgPSBhcmdzLnJlcGxhY2UoXCJcXFwiXCIsIFwiXCIpO1xyXG4gICAgfVxyXG4gICAgLy8kc2NvcGUuc2VsZWN0ZWRPcHRpb25zID0gJ0dFVCc7XHJcbiAgICBpZihzZXJ2aWNlLnRleHQgJiYgc2VydmljZS50ZXh0LmNoYXJBdChzZXJ2aWNlLnRleHQubGVuZ3RoLTEpICE9ICcvJyl7XHJcbiAgICAgICAgICAgICAgICBzZXJ2aWNlLnRleHQgKz0gJy8nO1xyXG4gICAgfVxyXG4gICAgJHNjb3BlLnN1Ym1pdChzZXJ2aWNlLnRleHQpO1xyXG59IiwiLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbi8vICBDb3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi4gIEFsbCBSaWdodHMgUmVzZXJ2ZWQuICBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuICBTZWUgTGljZW5zZSBpbiB0aGUgcHJvamVjdCByb290IGZvciBsaWNlbnNlIGluZm9ybWF0aW9uLlxyXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHJcbmhlbGxvLmluaXQoe1xyXG5cdG1zZnQ6IHtcclxuXHRcdG9hdXRoOiB7XHJcblx0XHRcdHZlcnNpb246IDIsXHJcblx0XHRcdGF1dGg6ICdodHRwczovL2xvZ2luLm1pY3Jvc29mdG9ubGluZS5jb20vY29tbW9uL29hdXRoMi92Mi4wL2F1dGhvcml6ZScsXHJcblx0XHRcdGdyYW50OiAnaHR0cHM6Ly9sb2dpbi5taWNyb3NvZnRvbmxpbmUuY29tL2NvbW1vbi9vYXV0aDIvdjIuMC90b2tlbidcclxuXHRcdH0sXHJcblx0XHRzY29wZV9kZWxpbTogJyAnLFxyXG5cclxuXHRcdC8vIERvbid0IGV2ZW4gdHJ5IHN1Ym1pdHRpbmcgdmlhIGZvcm0uXHJcblx0XHQvLyBUaGlzIG1lYW5zIG5vIFBPU1Qgb3BlcmF0aW9ucyBpbiA8PUlFOVxyXG5cdFx0Zm9ybTogZmFsc2VcclxuXHR9LCBtc2Z0X2FkbWluX2NvbnNlbnQ6IHtcclxuXHRcdG9hdXRoOiB7XHJcblx0XHRcdHZlcnNpb246IDIsXHJcblx0XHRcdGF1dGg6ICdodHRwczovL2xvZ2luLm1pY3Jvc29mdG9ubGluZS5jb20vY29tbW9uL2FkbWluY29uc2VudCcsXHJcblx0XHRcdGdyYW50OiAnaHR0cHM6Ly9sb2dpbi5taWNyb3NvZnRvbmxpbmUuY29tL2NvbW1vbi9vYXV0aDIvdjIuMC90b2tlbidcclxuXHRcdH0sXHJcblx0XHRzY29wZV9kZWxpbTogJyAnLFxyXG5cclxuXHRcdC8vIERvbid0IGV2ZW4gdHJ5IHN1Ym1pdHRpbmcgdmlhIGZvcm0uXHJcblx0XHQvLyBUaGlzIG1lYW5zIG5vIFBPU1Qgb3BlcmF0aW9ucyBpbiA8PUlFOVxyXG5cdFx0Zm9ybTogZmFsc2VcclxuXHR9LCBtc2Z0X3Rva2VuX3JlZnJlc2g6IHtcclxuXHRcdG9hdXRoOiB7XHJcblx0XHRcdHZlcnNpb246IDIsXHJcblx0XHRcdGF1dGg6ICdodHRwczovL2xvZ2luLm1pY3Jvc29mdG9ubGluZS5jb20vY29tbW9uL29hdXRoMi92Mi4wL2F1dGhvcml6ZScsXHJcblx0XHRcdGdyYW50OiAnaHR0cHM6Ly9sb2dpbi5taWNyb3NvZnRvbmxpbmUuY29tL2NvbW1vbi9vYXV0aDIvdjIuMC90b2tlbidcclxuXHRcdH0sXHJcblx0XHRzY29wZV9kZWxpbTogJyAnLFxyXG5cclxuXHRcdC8vIERvbid0IGV2ZW4gdHJ5IHN1Ym1pdHRpbmcgdmlhIGZvcm0uXHJcblx0XHQvLyBUaGlzIG1lYW5zIG5vIFBPU1Qgb3BlcmF0aW9ucyBpbiA8PUlFOVxyXG5cdFx0Zm9ybTogZmFsc2VcclxuXHR9XHJcbn0pOyIsInZhciBwb3N0VGVtcGxhdGVzID0ge1xyXG4gICAgbWVzc2FnZXM6IHtcclxuICAgICAgICBcInN1YmplY3RcIjogXCJNZWV0IGZvciBsdW5jaD9cIixcclxuICAgICAgICBcImJvZHlcIjoge1xyXG4gICAgICAgICAgICBcImNvbnRlbnRUeXBlXCI6IFwiVGV4dFwiLFxyXG4gICAgICAgICAgICBcImNvbnRlbnRcIjogXCJUaGUgbmV3IGNhZmV0ZXJpYSBpcyBvcGVuLlwiXHJcbiAgICAgICAgfSxcclxuICAgICAgICBcInRvUmVjaXBpZW50c1wiOiBbXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIFwiZW1haWxBZGRyZXNzXCI6IHtcclxuICAgICAgICAgICAgICAgIFwiYWRkcmVzc1wiOiBcImdhcnRoZkBjb250b3NvLmNvbVwiXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICBdXHJcbiAgICB9LFxyXG4gICAgZXZlbnRzOiB7XHJcbiAgICAgICAgXCJzdWJqZWN0XCI6IFwiTXkgZXZlbnRcIixcclxuICAgICAgICBcInN0YXJ0XCI6IHtcclxuICAgICAgICAgICAgXCJkYXRlVGltZVwiOiBcIjIwMTctMDUtMDdUMTY6MTU6MDAuMDAwMDAwMFwiLFxyXG4gICAgICAgICAgICBcInRpbWVab25lXCI6IFwiVVRDXCJcclxuICAgICAgICB9LFxyXG4gICAgICAgIFwiZW5kXCI6IHtcclxuICAgICAgICAgICAgXCJkYXRlVGltZVwiOiBcIjIwMTctMDYtMDdUMTY6MTU6MDAuMDAwMDAwMFwiLFxyXG4gICAgICAgICAgICBcInRpbWVab25lXCI6IFwiVVRDXCJcclxuICAgICAgICB9LFxyXG4gICAgfSxcclxuXHJcbiAgICBzZW5kTWFpbDoge1xyXG4gICAgICAgIFwibWVzc2FnZVwiOiB7XHJcbiAgICAgICAgICAgIFwic3ViamVjdFwiOiBcIk1lZXQgZm9yIGx1bmNoP1wiLFxyXG4gICAgICAgICAgICBcImJvZHlcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJjb250ZW50VHlwZVwiOiBcIlRleHRcIixcclxuICAgICAgICAgICAgICAgIFwiY29udGVudFwiOiBcIlRoZSBuZXcgY2FmZXRlcmlhIGlzIG9wZW4uXCJcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJ0b1JlY2lwaWVudHNcIjogW1xyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIFwiZW1haWxBZGRyZXNzXCI6IHtcclxuICAgICAgICAgICAgICAgICAgICBcImFkZHJlc3NcIjogXCJnYXJ0aGZAY29udG9zby5jb21cIlxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXCJzYXZlVG9TZW50SXRlbXNcIjogXCJmYWxzZVwiXHJcbiAgICB9LFxyXG4gICAgZmluZE1lZXRpbmdUaW1lczoge1xyXG4gICAgICAgIFwiYXR0ZW5kZWVzXCI6IFt7XHJcbiAgICAgICAgICAgIFwiZW1haWxBZGRyZXNzXCI6IHtcclxuICAgICAgICAgICAgICAgIFwiYWRkcmVzc1wiOiBcIkFsZXhEQG1pY3Jvc29mdC5jb21cIixcclxuICAgICAgICAgICAgICAgIFwibmFtZVwiOiBcIkFsZXggRGFycm93XCJcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJ0eXBlXCI6IFwiUmVxdWlyZWRcIlxyXG4gICAgICAgIH0sIHtcclxuICAgICAgICAgICAgXCJlbWFpbEFkZHJlc3NcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJhZGRyZXNzXCI6IFwiR2FydGhGQGltZ2Vlay5vbm1pY3Jvc29mdC5jb21cIixcclxuICAgICAgICAgICAgICAgIFwibmFtZVwiOiBcIkdhcnRoIEZvcnRcIlxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcInR5cGVcIjogXCJSZXF1aXJlZFwiXHJcbiAgICAgICAgfV0sXHJcbiAgICAgICAgXCJ0aW1lQ29uc3RyYWludFwiOiB7XHJcbiAgICAgICAgICAgIFwidGltZXNsb3RzXCI6IFt7XHJcbiAgICAgICAgICAgICAgICBcInN0YXJ0XCI6IHtcclxuICAgICAgICAgICAgICAgICAgICBcImRhdGVcIjogXCIyMDE2LTA0LTE4XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJ0aW1lXCI6IFwiOTowMDowMFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwidGltZVpvbmVcIjogXCJQYWNpZmljIFN0YW5kYXJkIFRpbWVcIlxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIFwiZW5kXCI6IHtcclxuICAgICAgICAgICAgICAgICAgICBcImRhdGVcIjogXCIyMDE2LTA0LTE4XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJ0aW1lXCI6IFwiMTg6MDA6MDBcIixcclxuICAgICAgICAgICAgICAgICAgICBcInRpbWVab25lXCI6IFwiUGFjaWZpYyBTdGFuZGFyZCBUaW1lXCJcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfV1cclxuICAgICAgICB9LFxyXG4gICAgICAgIFwibG9jYXRpb25Db25zdHJhaW50XCI6IFt7XHJcbiAgICAgICAgICAgIFwiaXNSZXF1aXJlZFwiOiBcImZhbHNlXCIsXHJcbiAgICAgICAgICAgIFwic3VnZ2VzdExvY2F0aW9uXCI6IFwidHJ1ZVwiLFxyXG4gICAgICAgICAgICBcImxvY2F0aW9uc1wiOiBbe1xyXG4gICAgICAgICAgICAgICAgXCJkaXNwbGF5TmFtZVwiOiBcIkNvbmYgUm9vbSAzMi8xMzY4XCIsXHJcbiAgICAgICAgICAgICAgICBcImxvY2F0aW9uRW1haWxBZGRyZXNzXCI6IFwiY29uZjMycm9vbTEzNjhAaW1nZWVrLm9ubWljcm9zb2Z0LmNvbVwiXHJcbiAgICAgICAgICAgIH1dXHJcbiAgICAgICAgfV0sXHJcbiAgICAgICAgXCJtZWV0aW5nRHVyYXRpb25cIjogXCJQVDFIXCJcclxuICAgIH0sXHJcbiAgICB1c2Vyczoge1xyXG4gICAgICAgIFwiYWNjb3VudEVuYWJsZWRcIjogdHJ1ZSxcclxuICAgICAgICBcImNpdHlcIjogXCJTZWF0dGxlXCIsXHJcbiAgICAgICAgXCJjb3VudHJ5XCI6IFwiVW5pdGVkIFN0YXRlc1wiLFxyXG4gICAgICAgIFwiZGVwYXJ0bWVudFwiOiBcIlNhbGVzICYgTWFya2V0aW5nXCIsXHJcbiAgICAgICAgXCJkaXNwbGF5TmFtZVwiOiBcIk1lbGlzc2EgRGFycm93XCIsXHJcbiAgICAgICAgXCJnaXZlbk5hbWVcIjogXCJNZWxpc3NhXCIsXHJcbiAgICAgICAgXCJqb2JUaXRsZVwiOiBcIk1hcmtldGluZyBEaXJlY3RvclwiLFxyXG4gICAgICAgIFwibWFpbE5pY2tuYW1lXCI6IFwiTWVsaXNzYURcIixcclxuICAgICAgICBcInBhc3N3b3JkUG9saWNpZXNcIjogXCJEaXNhYmxlUGFzc3dvcmRFeHBpcmF0aW9uXCIsXHJcbiAgICAgICAgXCJwYXNzd29yZFByb2ZpbGVcIjoge1xyXG4gICAgICAgICAgICBcInBhc3N3b3JkXCI6IFwiVGVzdDEyMzRcIixcclxuICAgICAgICAgICAgXCJmb3JjZUNoYW5nZVBhc3N3b3JkTmV4dFNpZ25JblwiOiBmYWxzZVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXCJvZmZpY2VMb2NhdGlvblwiOiBcIjEzMS8xMTA1XCIsXHJcbiAgICAgICAgXCJwb3N0YWxDb2RlXCI6IFwiOTgwNTJcIixcclxuICAgICAgICBcInByZWZlcnJlZExhbmd1YWdlXCI6IFwiZW4tVVNcIixcclxuICAgICAgICBcInN0YXRlXCI6IFwiV0FcIixcclxuICAgICAgICBcInN0cmVldEFkZHJlc3NcIjogXCI5MjU2IFRvd25lIENlbnRlciBEci4sIFN1aXRlIDQwMFwiLFxyXG4gICAgICAgIFwic3VybmFtZVwiOiBcIkRhcnJvd1wiLFxyXG4gICAgICAgIFwibW9iaWxlUGhvbmVcIjogXCIrMSAyMDYgNTU1IDAxMTBcIixcclxuICAgICAgICBcInVzYWdlTG9jYXRpb25cIjogXCJVU1wiLFxyXG4gICAgICAgIFwidXNlclByaW5jaXBhbE5hbWVcIjogXCJNZWxpc3NhREBBVVRIRU5USUNBVEVEX0RPTUFJTlwiLFxyXG4gICAgfSxcclxuICAgIGdyb3Vwczoge1xyXG4gICAgICAgIFwiQG9kYXRhLnR5cGVcIjogXCIjTWljcm9zb2Z0LkdyYXBoLkdyb3VwXCIsXHJcbiAgICAgICAgXCJkZXNjcmlwdGlvblwiOiBcIlRoaXMgZ3JvdXAgaXMgdGhlIGJlc3QgZXZlclwiLFxyXG4gICAgICAgIFwiZGlzcGxheU5hbWVcIjogXCJVbmlmaWVkIGdyb3VwIDNlZjE1XCIsXHJcbiAgICAgICAgXCJncm91cFR5cGVzXCI6IFtcclxuICAgICAgICAgICAgXCJVbmlmaWVkXCJcclxuICAgICAgICBdLFxyXG4gICAgICAgIFwibWFpbEVuYWJsZWRcIjogdHJ1ZSxcclxuICAgICAgICBcIm1haWxOaWNrbmFtZVwiOiBcIkdyb3VwOTExZTVcIixcclxuICAgICAgICBcInNlY3VyaXR5RW5hYmxlZFwiOiB0cnVlXHJcbiAgICB9XHJcbn1cclxuXHJcbnZhciB0ZW1wbGF0ZU5hbWVzID0ge1xyXG4gICAgbWVzc2FnZXM6ICdtZXNzYWdlJyxcclxuICAgIGV2ZW50czogJ2V2ZW50JyxcclxuICAgIHNlbmRNYWlsOiAnZW1haWwnXHJcbn0iLCJ2YXIgcmVxdWVzdEhpc3RvcnkgPSBbXTtcclxudmFyIExvY2FsU3RvcmFnZUtleUdyYXBoUmVxdWVzdEhpc3RvcnkgPSBcIkdSQVBIX1JFUVVFU1RfSElTVE9SWVwiO1xyXG5cclxuZnVuY3Rpb24gc2F2ZUhpc3RvcnlUb0xvY2FsU3RvcmFnZSgpIHtcclxuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKExvY2FsU3RvcmFnZUtleUdyYXBoUmVxdWVzdEhpc3RvcnksIEpTT04uc3RyaW5naWZ5KHJlcXVlc3RIaXN0b3J5KSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGxvYWRIaXN0b3J5RnJvbUxvY2FsU3RvcmFnZSgpIHtcclxuICAgIHZhciBwb3NzaWJsZUhpc3RvcnkgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShMb2NhbFN0b3JhZ2VLZXlHcmFwaFJlcXVlc3RIaXN0b3J5KTtcclxuICAgIGlmIChwb3NzaWJsZUhpc3RvcnkgIT0gbnVsbCkge1xyXG4gICAgICAgIHJlcXVlc3RIaXN0b3J5ID0gSlNPTi5wYXJzZShwb3NzaWJsZUhpc3RvcnkpO1xyXG4gICAgICAgIHJlcXVlc3RIaXN0b3J5ID0gcmVxdWVzdEhpc3RvcnkuZmlsdGVyKGZ1bmN0aW9uKHZhbHVlLCBpbmRleCwgc2VsZikgeyBcclxuICAgICAgICAgICAgcmV0dXJuIHNlbGYuaW5kZXhPZih2YWx1ZSkgPT09IGluZGV4OyAgIFxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59XHJcblxyXG5cclxuZnVuY3Rpb24gc2F2ZUhpc3RvcnlPYmplY3QoaGlzdG9yeU9iamVjdCwgc3RhdHVzQ29kZSwgZHVyYXRpb24pIHtcclxuICAgIGhpc3RvcnlPYmplY3Quc3VjY2Vzc2Z1bCA9IHN0YXR1c0NvZGUgPj0gMjAwICYmIHN0YXR1c0NvZGUgPCAzMDA7XHJcbiAgICBoaXN0b3J5T2JqZWN0LnN0YXR1c0NvZGUgPSBzdGF0dXNDb2RlO1xyXG4gICAgaGlzdG9yeU9iamVjdC5kdXJhdGlvbiA9IGR1cmF0aW9uO1xyXG4gICAgcmVxdWVzdEhpc3Rvcnkuc3BsaWNlKDAsIDAsIGhpc3RvcnlPYmplY3QpOyAvL2FkZCBoaXN0b3J5IG9iamVjdCB0byB0aGUgYXJyYXlcclxuXHJcbiAgICBzYXZlSGlzdG9yeVRvTG9jYWxTdG9yYWdlKCk7XHJcbn1cclxuXHJcblxyXG4vLyBpbml0IHNjcmlwdHNcclxuXHJcblxyXG5sb2FkSGlzdG9yeUZyb21Mb2NhbFN0b3JhZ2UoKTtcclxuXHJcbiIsImZ1bmN0aW9uIGNyZWF0ZVNoYXJlTGluayhmdWxsUmVxdWVzdFVybCwgYWN0aW9uLCB2ZXJzaW9uKSB7ICAgIFxyXG4gICAgcmV0dXJuIHdpbmRvdy5sb2NhdGlvbi5vcmlnaW4gKyB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUgKyBcIj9yZXF1ZXN0PVwiICsgZXh0cmFjdEdyYXBoRW5kcG9pbnQoZnVsbFJlcXVlc3RVcmwpICsgXCImbWV0aG9kPVwiICsgYWN0aW9uICsgXCImdmVyc2lvbj1cIiArIHZlcnNpb247XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGV4dHJhY3RHcmFwaEVuZHBvaW50KGZ1bGxSZXF1ZXN0VXJsKSB7XHJcbiAgICByZXF1ZXN0VXJsID0gZnVsbFJlcXVlc3RVcmwuc3BsaXQoJy5jb20nKVxyXG4gICAgcmVxdWVzdFVybC5zaGlmdCgpO1xyXG4gICAgXHJcbiAgICB2YXIgcmVxdWVzdFVybENvbXBvbmVudHMgPSByZXF1ZXN0VXJsWzBdLnNwbGl0KCcvJyk7XHJcbiAgICByZXF1ZXN0VXJsQ29tcG9uZW50cy5zaGlmdCgpOyAvL3JlbW92ZSBlbXB0eSBpdGVtXHJcbiAgICByZXF1ZXN0VXJsQ29tcG9uZW50cy5zaGlmdCgpOyAvL3JlbW92ZSB2ZXJzaW9uXHJcbiAgICByZXR1cm4gKHJlcXVlc3RVcmxDb21wb25lbnRzLmpvaW4oJy8nKSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGlzUG9zdE9yUGF0Y2gob3B0aW9uKSB7XHJcbiAgICByZXR1cm4gIG9wdGlvbiA9PSBcIlBPU1RcIiB8fCBvcHRpb24gPT0gXCJQQVRDSFwiO1xyXG59XHJcblxyXG5mdW5jdGlvbiBTaGFyZURpYWxvZ0NvbnRyb2xsZXIoJHNjb3BlLCAkbWREaWFsb2csIGFwaVNlcnZpY2UsICRzY2UsIGhlYWRlcnMsIGJvZHkpIHtcclxuICAgIHZhciBfYXBpU2VydmljZSA9IGFwaVNlcnZpY2U7XHJcbiAgICAkc2NvcGUuaGlkZSA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICRtZERpYWxvZy5oaWRlKCk7XHJcbiAgICB9O1xyXG5cclxuICAgICRzY29wZS5jYW5jZWwgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAkbWREaWFsb2cuY2FuY2VsKCk7XHJcbiAgICB9O1xyXG4gICAgXHJcbiAgICAkc2NvcGUuZ2V0U2hhcmVMaW5rID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgdmFyIHJlcXVlc3RVcmwgPSAkc2NvcGUuZ2V0UmF3U2VhcmNoVGV4dCgpO1xyXG4gICAgICAgIHJldHVybiBjcmVhdGVTaGFyZUxpbmsocmVxdWVzdFVybCwgX2FwaVNlcnZpY2Uuc2VsZWN0ZWRPcHRpb24sIF9hcGlTZXJ2aWNlLnNlbGVjdGVkVmVyc2lvbik7XHJcbiAgICB9XHJcblxyXG4gICAgJHNjb3BlLmdlbmVyYXRlU3VwZXJBZ2VudENvZGUgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICB2YXIgcmVxdWVzdFVybCA9ICRzY29wZS5nZXRSYXdTZWFyY2hUZXh0KCk7XHJcblxyXG4gICAgICAgIHZhciBmdWxsR3JhcGhVcmwgPSBcImh0dHBzOi8vZ3JhcGgubWljcm9zb2Z0LmNvbS9cIiArIF9hcGlTZXJ2aWNlLnNlbGVjdGVkVmVyc2lvbiArIFwiL1wiICsgZXh0cmFjdEdyYXBoRW5kcG9pbnQocmVxdWVzdFVybCk7XHJcblxyXG4gICAgICAgIHZhciB0YWIgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgcmV0dXJuIFwiPHNwYW4gc3R5bGU9J3BhZGRpbmctbGVmdDoxNXB4Jz48L3NwYW4+XCI7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB2YXIgbGluZSA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gXCI8YnI+XCJcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHZhciBzdHIgPSBcInJlcXVlc3RcIjtcclxuICAgICAgICBzdHIgKz0gbGluZSgpICsgdGFiKCkgKyBcIi5cIiArIF9hcGlTZXJ2aWNlLnNlbGVjdGVkT3B0aW9uLnRvTG9jYWxlTG93ZXJDYXNlKCkgKyBcIihcXFwiXCIgKyBmdWxsR3JhcGhVcmwgKyBcIlxcXCIpXCJcclxuXHJcbiAgICAgICAgaWYgKE9iamVjdC5rZXlzKGhlYWRlcnMpLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgc3RyICs9IGxpbmUoKSArIHRhYigpICsgXCIuc2V0KFwiICsgSlNPTi5zdHJpbmdpZnkoaGVhZGVycykgKyBcIilcIjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChpc1Bvc3RPclBhdGNoKCBfYXBpU2VydmljZS5zZWxlY3RlZE9wdGlvbikpIHtcclxuICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgIHZhciBib2R5T2JqID0gSlNPTi5wYXJzZShib2R5KTtcclxuICAgICAgICAgICAgICAgIGlmIChib2R5T2JqKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3RyICs9IGxpbmUoKSArIHRhYigpICsgXCIuc2VuZChcIiArIEpTT04uc3RyaW5naWZ5KGJvZHlPYmopICsgXCIpXCI7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gY2F0Y2goZSkge1xyXG5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuIFxyXG4gICAgICAgIHN0ciArPSBsaW5lKCkgKyB0YWIoKSArIFwiLmVuZChmdW5jdGlvbihlcnIsIHJlcykge1wiXHJcbiAgICAgICAgc3RyICs9IGxpbmUoKSArIHRhYigpICsgdGFiKCkgKyBcImNvbnNvbGUubG9nKHJlcyk7XCJcclxuICAgICAgICBzdHIgKz0gbGluZSgpICsgdGFiKCkgKyBcIn0pO1wiXHJcbiAgICAgICAgcmV0dXJuICRzY2UudHJ1c3RBc0h0bWwoc3RyKTtcclxuICAgIH1cclxufSJdfQ==
