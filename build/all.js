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
                results = JSON.stringify(results, null, 4).trim();
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
            
         /*   id: null,*/
            
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
                            return $http.patch(query, postString,{headers : requestHeaders});
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
// ------------------------------------------------------------------------------
//  Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.  See License in the project root for license information.
// ------------------------------------------------------------------------------

var loc_strings = {};

loc_strings['en_us'] = {"To try the explorer, please ":"To try the explorer, please ","sign in":"sign in"," with your work or school account from Microsoft.":" with your work or school account from Microsoft.","Submit":"Submit","Using demo tenant":"Using demo tenant","sign out":"sign out","History":"History","Method":"Method","Query":"Query","Status Code":"Status Code","Duration":"Duration","Go":"Go","YES":"YES","NO":"NO","request header":"request header","request body":"request body","response":"response"}


loc_strings['de_de'] = {"To try the explorer, please ":"Um den Tester auszuprobieren, ","sign in":"Anmelden"," with your work or school account from Microsoft.":" mit Ihrem Geschäfts- oder Schulkonto von Microsoft an.","Submit":"Senden","Using demo tenant":"Verwenden des Demomandanten","sign out":"Abmelden","History":"Verlauf","Method":"Methode","Query":"Abfrage","Status Code":"Statuscode","Duration":"Dauer","Go":"OK","YES":"JA","NO":"NEIN","request header":"Anforderungsheader","request body":"Anforderungstextkörper","response":"Antwort"}


loc_strings['ja_jp'] = {"To try the explorer, please ":"エクスプローラーをお試しいただくには、Microsoft の職場または学校アカウントで ","sign in":"サインイン"," with your work or school account from Microsoft.":" します。","Submit":"送信","Using demo tenant":"デモ テナントを使用しています","sign out":"サインアウト","History":"履歴","Method":"メソッド","Query":"クエリ","Status Code":"状態コード","Duration":"期間","Go":"検索","YES":"はい","NO":"いいえ","request header":"要求ヘッダー","request body":"要求本文","response":"応答"}


loc_strings['zh_cn'] = {"To try the explorer, please ":"若要尝试浏览器，请 使用你的 Microsoft 工作或学校帐户","sign in":"登录"," with your work or school account from Microsoft.":"。","Submit":"提交","Using demo tenant":"使用演示租户","sign out":"注销","History":"历史记录","Method":"方法","Query":"查询","Status Code":"状态代码","Duration":"持续时间","Go":"转到","YES":"是","NO":"否","request header":"请求标题","request body":"请求正文","response":"响应"}



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
    $scope.$watch("getEntity()", updateUrlOptions, true);

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
    $scope.history = [];
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

        var handleSuccessfulQueryResponse = function(result) {
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

            saveHistoryObject(historyObj, status);

            if (apiService.cache.get(apiService.selectedVersion + "Metadata") && apiService.selectedOption == "GET") {
                setEntity($scope.entityItem, apiService, true, apiService.text);
            }

            $scope.insufficientPrivileges = false;
        }

        var handleUnsuccessfulQueryResponse = function(result) {
            handleJsonResponse($scope, startTime, result.data.error, result.headers, result.status);
            saveHistoryObject(historyObj, result.status);
            if (apiService.cache.get(apiService.selectedVersion + "Metadata") && apiService.selectedOption == "GET") {
                setEntity($scope.entityItem, apiService, false, apiService.text);
            }

            if (result.status === 401 || result.status === 403) {
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

    
    function saveHistoryObject(historyObject, statusCode) {
        historyObject.successful = statusCode >= 200 && statusCode < 300;
        historyObject.statusCode = statusCode;
        historyObject.duration = $scope.duration;
        $scope.history.splice(0, 0, historyObject); //add history object to the array
    }
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImp3dC1kZWNvZGUubWluLmpzIiwiaGVsbG8uYWxsLmpzIiwiaGVsbG8uanMiLCJhcGktZXhwbG9yZXItaW5pdC5qcyIsImFwaS1leHBsb3Jlci1oZWxwZXJzLmpzIiwiYXBpLWV4cGxvcmVyLWFwcC5qcyIsImFwaS1leHBsb3Jlci1zdmMuanMiLCJsb2Nfc3RyaW5ncy5qcyIsImFwaS1leHBsb3Jlci1jdHJsLmpzIiwiYXBpLWV4cGxvcmVyLWRpcmVjdGl2ZS5qcyIsImFwaS1leHBsb3Jlci1qc2VkaXRvci5qcyIsImFwaS1leHBsb3Jlci1qc3ZpZXdlci5qcyIsImFwaS1leHBsb3Jlci1tc2dyYXBoLmpzIiwiYXV0aC5qcyIsInBvc3RUZW1wbGF0ZXMuanMiLCJzaGFyZS1kaWFsb2cuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2xzTEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDaitGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDakRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUMvY0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDakJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2hGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2xCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNsaEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDbkRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDMUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN2TUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNwQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN2Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUMzSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiYWxsLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIWZ1bmN0aW9uIGEoYixjLGQpe2Z1bmN0aW9uIGUoZyxoKXtpZighY1tnXSl7aWYoIWJbZ10pe3ZhciBpPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWgmJmkpcmV0dXJuIGkoZywhMCk7aWYoZilyZXR1cm4gZihnLCEwKTt2YXIgaj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2crXCInXCIpO3Rocm93IGouY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixqfXZhciBrPWNbZ109e2V4cG9ydHM6e319O2JbZ11bMF0uY2FsbChrLmV4cG9ydHMsZnVuY3Rpb24oYSl7dmFyIGM9YltnXVsxXVthXTtyZXR1cm4gZShjP2M6YSl9LGssay5leHBvcnRzLGEsYixjLGQpfXJldHVybiBjW2ddLmV4cG9ydHN9Zm9yKHZhciBmPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsZz0wO2c8ZC5sZW5ndGg7ZysrKWUoZFtnXSk7cmV0dXJuIGV9KHsxOltmdW5jdGlvbihhLGIsYyl7ZnVuY3Rpb24gZChhKXt0aGlzLm1lc3NhZ2U9YX1mdW5jdGlvbiBlKGEpe3ZhciBiPVN0cmluZyhhKS5yZXBsYWNlKC89KyQvLFwiXCIpO2lmKGIubGVuZ3RoJTQ9PTEpdGhyb3cgbmV3IGQoXCInYXRvYicgZmFpbGVkOiBUaGUgc3RyaW5nIHRvIGJlIGRlY29kZWQgaXMgbm90IGNvcnJlY3RseSBlbmNvZGVkLlwiKTtmb3IodmFyIGMsZSxnPTAsaD0wLGk9XCJcIjtlPWIuY2hhckF0KGgrKyk7fmUmJihjPWclND82NCpjK2U6ZSxnKyslNCk/aSs9U3RyaW5nLmZyb21DaGFyQ29kZSgyNTUmYz4+KC0yKmcmNikpOjApZT1mLmluZGV4T2YoZSk7cmV0dXJuIGl9dmFyIGY9XCJBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWmFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6MDEyMzQ1Njc4OSsvPVwiO2QucHJvdG90eXBlPW5ldyBFcnJvcixkLnByb3RvdHlwZS5uYW1lPVwiSW52YWxpZENoYXJhY3RlckVycm9yXCIsYi5leHBvcnRzPVwidW5kZWZpbmVkXCIhPXR5cGVvZiB3aW5kb3cmJndpbmRvdy5hdG9iJiZ3aW5kb3cuYXRvYi5iaW5kKHdpbmRvdyl8fGV9LHt9XSwyOltmdW5jdGlvbihhLGIsYyl7ZnVuY3Rpb24gZChhKXtyZXR1cm4gZGVjb2RlVVJJQ29tcG9uZW50KGUoYSkucmVwbGFjZSgvKC4pL2csZnVuY3Rpb24oYSxiKXt2YXIgYz1iLmNoYXJDb2RlQXQoMCkudG9TdHJpbmcoMTYpLnRvVXBwZXJDYXNlKCk7cmV0dXJuIGMubGVuZ3RoPDImJihjPVwiMFwiK2MpLFwiJVwiK2N9KSl9dmFyIGU9YShcIi4vYXRvYlwiKTtiLmV4cG9ydHM9ZnVuY3Rpb24oYSl7dmFyIGI9YS5yZXBsYWNlKC8tL2csXCIrXCIpLnJlcGxhY2UoL18vZyxcIi9cIik7c3dpdGNoKGIubGVuZ3RoJTQpe2Nhc2UgMDpicmVhaztjYXNlIDI6Yis9XCI9PVwiO2JyZWFrO2Nhc2UgMzpiKz1cIj1cIjticmVhaztkZWZhdWx0OnRocm93XCJJbGxlZ2FsIGJhc2U2NHVybCBzdHJpbmchXCJ9dHJ5e3JldHVybiBkKGIpfWNhdGNoKGMpe3JldHVybiBlKGIpfX19LHtcIi4vYXRvYlwiOjF9XSwzOltmdW5jdGlvbihhLGIsYyl7XCJ1c2Ugc3RyaWN0XCI7dmFyIGQ9YShcIi4vYmFzZTY0X3VybF9kZWNvZGVcIik7Yi5leHBvcnRzPWZ1bmN0aW9uKGEsYil7aWYoXCJzdHJpbmdcIiE9dHlwZW9mIGEpdGhyb3cgbmV3IEVycm9yKFwiSW52YWxpZCB0b2tlbiBzcGVjaWZpZWRcIik7Yj1ifHx7fTt2YXIgYz1iLmhlYWRlcj09PSEwPzA6MTtyZXR1cm4gSlNPTi5wYXJzZShkKGEuc3BsaXQoXCIuXCIpW2NdKSl9fSx7XCIuL2Jhc2U2NF91cmxfZGVjb2RlXCI6Mn1dLDQ6W2Z1bmN0aW9uKGEsYixjKXsoZnVuY3Rpb24oYil7dmFyIGM9YShcIi4vbGliL2luZGV4XCIpO1wiZnVuY3Rpb25cIj09dHlwZW9mIGIud2luZG93LmRlZmluZSYmYi53aW5kb3cuZGVmaW5lLmFtZD9iLndpbmRvdy5kZWZpbmUoXCJqd3RfZGVjb2RlXCIsZnVuY3Rpb24oKXtyZXR1cm4gY30pOmIud2luZG93JiYoYi53aW5kb3cuand0X2RlY29kZT1jKX0pLmNhbGwodGhpcyxcInVuZGVmaW5lZFwiIT10eXBlb2YgZ2xvYmFsP2dsb2JhbDpcInVuZGVmaW5lZFwiIT10eXBlb2Ygc2VsZj9zZWxmOlwidW5kZWZpbmVkXCIhPXR5cGVvZiB3aW5kb3c/d2luZG93Ont9KX0se1wiLi9saWIvaW5kZXhcIjozfV19LHt9LFs0XSk7IiwiLyohIGhlbGxvanMgdjEuMTQuMCB8IChjKSAyMDEyLTIwMTYgQW5kcmV3IERvZHNvbiB8IE1JVCBodHRwczovL2Fkb2Rzb24uY29tL2hlbGxvLmpzL0xJQ0VOU0UgKi9cclxuLy8gRVM1IE9iamVjdC5jcmVhdGVcclxuaWYgKCFPYmplY3QuY3JlYXRlKSB7XHJcblxyXG5cdC8vIFNoaW0sIE9iamVjdCBjcmVhdGVcclxuXHQvLyBBIHNoaW0gZm9yIE9iamVjdC5jcmVhdGUoKSwgaXQgYWRkcyBhIHByb3RvdHlwZSB0byBhIG5ldyBvYmplY3RcclxuXHRPYmplY3QuY3JlYXRlID0gKGZ1bmN0aW9uKCkge1xyXG5cclxuXHRcdGZ1bmN0aW9uIEYoKSB7fVxyXG5cclxuXHRcdHJldHVybiBmdW5jdGlvbihvKSB7XHJcblxyXG5cdFx0XHRpZiAoYXJndW1lbnRzLmxlbmd0aCAhPSAxKSB7XHJcblx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKCdPYmplY3QuY3JlYXRlIGltcGxlbWVudGF0aW9uIG9ubHkgYWNjZXB0cyBvbmUgcGFyYW1ldGVyLicpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRGLnByb3RvdHlwZSA9IG87XHJcblx0XHRcdHJldHVybiBuZXcgRigpO1xyXG5cdFx0fTtcclxuXHJcblx0fSkoKTtcclxuXHJcbn1cclxuXHJcbi8vIEVTNSBPYmplY3Qua2V5c1xyXG5pZiAoIU9iamVjdC5rZXlzKSB7XHJcblx0T2JqZWN0LmtleXMgPSBmdW5jdGlvbihvLCBrLCByKSB7XHJcblx0XHRyID0gW107XHJcblx0XHRmb3IgKGsgaW4gbykge1xyXG5cdFx0XHRpZiAoci5oYXNPd25Qcm9wZXJ0eS5jYWxsKG8sIGspKVxyXG5cdFx0XHRcdHIucHVzaChrKTtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gcjtcclxuXHR9O1xyXG59XHJcblxyXG4vLyBFUzUgW10uaW5kZXhPZlxyXG5pZiAoIUFycmF5LnByb3RvdHlwZS5pbmRleE9mKSB7XHJcblx0QXJyYXkucHJvdG90eXBlLmluZGV4T2YgPSBmdW5jdGlvbihzKSB7XHJcblxyXG5cdFx0Zm9yICh2YXIgaiA9IDA7IGogPCB0aGlzLmxlbmd0aDsgaisrKSB7XHJcblx0XHRcdGlmICh0aGlzW2pdID09PSBzKSB7XHJcblx0XHRcdFx0cmV0dXJuIGo7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gLTE7XHJcblx0fTtcclxufVxyXG5cclxuLy8gRVM1IFtdLmZvckVhY2hcclxuaWYgKCFBcnJheS5wcm90b3R5cGUuZm9yRWFjaCkge1xyXG5cdEFycmF5LnByb3RvdHlwZS5mb3JFYWNoID0gZnVuY3Rpb24oZnVuLyosIHRoaXNBcmcqLykge1xyXG5cclxuXHRcdGlmICh0aGlzID09PSB2b2lkIDAgfHwgdGhpcyA9PT0gbnVsbCkge1xyXG5cdFx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKCk7XHJcblx0XHR9XHJcblxyXG5cdFx0dmFyIHQgPSBPYmplY3QodGhpcyk7XHJcblx0XHR2YXIgbGVuID0gdC5sZW5ndGggPj4+IDA7XHJcblx0XHRpZiAodHlwZW9mIGZ1biAhPT0gJ2Z1bmN0aW9uJykge1xyXG5cdFx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKCk7XHJcblx0XHR9XHJcblxyXG5cdFx0dmFyIHRoaXNBcmcgPSBhcmd1bWVudHMubGVuZ3RoID49IDIgPyBhcmd1bWVudHNbMV0gOiB2b2lkIDA7XHJcblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XHJcblx0XHRcdGlmIChpIGluIHQpIHtcclxuXHRcdFx0XHRmdW4uY2FsbCh0aGlzQXJnLCB0W2ldLCBpLCB0KTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiB0aGlzO1xyXG5cdH07XHJcbn1cclxuXHJcbi8vIEVTNSBbXS5maWx0ZXJcclxuaWYgKCFBcnJheS5wcm90b3R5cGUuZmlsdGVyKSB7XHJcblx0QXJyYXkucHJvdG90eXBlLmZpbHRlciA9IGZ1bmN0aW9uKGZ1biwgdGhpc0FyZykge1xyXG5cclxuXHRcdHZhciBhID0gW107XHJcblx0XHR0aGlzLmZvckVhY2goZnVuY3Rpb24odmFsLCBpLCB0KSB7XHJcblx0XHRcdGlmIChmdW4uY2FsbCh0aGlzQXJnIHx8IHZvaWQgMCwgdmFsLCBpLCB0KSkge1xyXG5cdFx0XHRcdGEucHVzaCh2YWwpO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHJcblx0XHRyZXR1cm4gYTtcclxuXHR9O1xyXG59XHJcblxyXG4vLyBQcm9kdWN0aW9uIHN0ZXBzIG9mIEVDTUEtMjYyLCBFZGl0aW9uIDUsIDE1LjQuNC4xOVxyXG4vLyBSZWZlcmVuY2U6IGh0dHA6Ly9lczUuZ2l0aHViLmlvLyN4MTUuNC40LjE5XHJcbmlmICghQXJyYXkucHJvdG90eXBlLm1hcCkge1xyXG5cclxuXHRBcnJheS5wcm90b3R5cGUubWFwID0gZnVuY3Rpb24oZnVuLCB0aGlzQXJnKSB7XHJcblxyXG5cdFx0dmFyIGEgPSBbXTtcclxuXHRcdHRoaXMuZm9yRWFjaChmdW5jdGlvbih2YWwsIGksIHQpIHtcclxuXHRcdFx0YS5wdXNoKGZ1bi5jYWxsKHRoaXNBcmcgfHwgdm9pZCAwLCB2YWwsIGksIHQpKTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdHJldHVybiBhO1xyXG5cdH07XHJcbn1cclxuXHJcbi8vIEVTNSBpc0FycmF5XHJcbmlmICghQXJyYXkuaXNBcnJheSkge1xyXG5cclxuXHQvLyBGdW5jdGlvbiBBcnJheS5pc0FycmF5XHJcblx0QXJyYXkuaXNBcnJheSA9IGZ1bmN0aW9uKG8pIHtcclxuXHRcdHJldHVybiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwobykgPT09ICdbb2JqZWN0IEFycmF5XSc7XHJcblx0fTtcclxuXHJcbn1cclxuXHJcbi8vIFRlc3QgZm9yIGxvY2F0aW9uLmFzc2lnblxyXG5pZiAodHlwZW9mIHdpbmRvdyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIHdpbmRvdy5sb2NhdGlvbiA9PT0gJ29iamVjdCcgJiYgIXdpbmRvdy5sb2NhdGlvbi5hc3NpZ24pIHtcclxuXHJcblx0d2luZG93LmxvY2F0aW9uLmFzc2lnbiA9IGZ1bmN0aW9uKHVybCkge1xyXG5cdFx0d2luZG93LmxvY2F0aW9uID0gdXJsO1xyXG5cdH07XHJcblxyXG59XHJcblxyXG4vLyBUZXN0IGZvciBGdW5jdGlvbi5iaW5kXHJcbmlmICghRnVuY3Rpb24ucHJvdG90eXBlLmJpbmQpIHtcclxuXHJcblx0Ly8gTUROXHJcblx0Ly8gUG9seWZpbGwgSUU4LCBkb2VzIG5vdCBzdXBwb3J0IG5hdGl2ZSBGdW5jdGlvbi5iaW5kXHJcblx0RnVuY3Rpb24ucHJvdG90eXBlLmJpbmQgPSBmdW5jdGlvbihiKSB7XHJcblxyXG5cdFx0aWYgKHR5cGVvZiB0aGlzICE9PSAnZnVuY3Rpb24nKSB7XHJcblx0XHRcdHRocm93IG5ldyBUeXBlRXJyb3IoJ0Z1bmN0aW9uLnByb3RvdHlwZS5iaW5kIC0gd2hhdCBpcyB0cnlpbmcgdG8gYmUgYm91bmQgaXMgbm90IGNhbGxhYmxlJyk7XHJcblx0XHR9XHJcblxyXG5cdFx0ZnVuY3Rpb24gQygpIHt9XHJcblxyXG5cdFx0dmFyIGEgPSBbXS5zbGljZTtcclxuXHRcdHZhciBmID0gYS5jYWxsKGFyZ3VtZW50cywgMSk7XHJcblx0XHR2YXIgX3RoaXMgPSB0aGlzO1xyXG5cdFx0dmFyIEQgPSBmdW5jdGlvbigpIHtcclxuXHRcdFx0cmV0dXJuIF90aGlzLmFwcGx5KHRoaXMgaW5zdGFuY2VvZiBDID8gdGhpcyA6IGIgfHwgd2luZG93LCBmLmNvbmNhdChhLmNhbGwoYXJndW1lbnRzKSkpO1xyXG5cdFx0fTtcclxuXHJcblx0XHRDLnByb3RvdHlwZSA9IHRoaXMucHJvdG90eXBlO1xyXG5cdFx0RC5wcm90b3R5cGUgPSBuZXcgQygpO1xyXG5cclxuXHRcdHJldHVybiBEO1xyXG5cdH07XHJcblxyXG59XHJcblxyXG4vKipcclxuICogQGhlbGxvLmpzXHJcbiAqXHJcbiAqIEhlbGxvSlMgaXMgYSBjbGllbnQgc2lkZSBKYXZhc2NyaXB0IFNESyBmb3IgbWFraW5nIE9BdXRoMiBsb2dpbnMgYW5kIHN1YnNlcXVlbnQgUkVTVCBjYWxscy5cclxuICpcclxuICogQGF1dGhvciBBbmRyZXcgRG9kc29uXHJcbiAqIEB3ZWJzaXRlIGh0dHBzOi8vYWRvZHNvbi5jb20vaGVsbG8uanMvXHJcbiAqXHJcbiAqIEBjb3B5cmlnaHQgQW5kcmV3IERvZHNvbiwgMjAxMiAtIDIwMTVcclxuICogQGxpY2Vuc2UgTUlUOiBZb3UgYXJlIGZyZWUgdG8gdXNlIGFuZCBtb2RpZnkgdGhpcyBjb2RlIGZvciBhbnkgdXNlLCBvbiB0aGUgY29uZGl0aW9uIHRoYXQgdGhpcyBjb3B5cmlnaHQgbm90aWNlIHJlbWFpbnMuXHJcbiAqL1xyXG5cclxudmFyIGhlbGxvID0gZnVuY3Rpb24obmFtZSkge1xyXG5cdHJldHVybiBoZWxsby51c2UobmFtZSk7XHJcbn07XHJcblxyXG5oZWxsby51dGlscyA9IHtcclxuXHJcblx0Ly8gRXh0ZW5kIHRoZSBmaXJzdCBvYmplY3Qgd2l0aCB0aGUgcHJvcGVydGllcyBhbmQgbWV0aG9kcyBvZiB0aGUgc2Vjb25kXHJcblx0ZXh0ZW5kOiBmdW5jdGlvbihyIC8qLCBhWywgYlssIC4uLl1dICovKSB7XHJcblxyXG5cdFx0Ly8gR2V0IHRoZSBhcmd1bWVudHMgYXMgYW4gYXJyYXkgYnV0IG9tbWl0IHRoZSBpbml0aWFsIGl0ZW1cclxuXHRcdEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMSkuZm9yRWFjaChmdW5jdGlvbihhKSB7XHJcblx0XHRcdGlmIChBcnJheS5pc0FycmF5KHIpICYmIEFycmF5LmlzQXJyYXkoYSkpIHtcclxuXHRcdFx0XHRBcnJheS5wcm90b3R5cGUucHVzaC5hcHBseShyLCBhKTtcclxuXHRcdFx0fVxyXG5cdFx0XHRlbHNlIGlmIChyIGluc3RhbmNlb2YgT2JqZWN0ICYmIGEgaW5zdGFuY2VvZiBPYmplY3QgJiYgciAhPT0gYSkge1xyXG5cdFx0XHRcdGZvciAodmFyIHggaW4gYSkge1xyXG5cdFx0XHRcdFx0clt4XSA9IGhlbGxvLnV0aWxzLmV4dGVuZChyW3hdLCBhW3hdKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdFx0ZWxzZSB7XHJcblxyXG5cdFx0XHRcdGlmIChBcnJheS5pc0FycmF5KGEpKSB7XHJcblx0XHRcdFx0XHQvLyBDbG9uZSBpdFxyXG5cdFx0XHRcdFx0YSA9IGEuc2xpY2UoMCk7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRyID0gYTtcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblxyXG5cdFx0cmV0dXJuIHI7XHJcblx0fVxyXG59O1xyXG5cclxuLy8gQ29yZSBsaWJyYXJ5XHJcbmhlbGxvLnV0aWxzLmV4dGVuZChoZWxsbywge1xyXG5cclxuXHRzZXR0aW5nczoge1xyXG5cclxuXHRcdC8vIE9BdXRoMiBhdXRoZW50aWNhdGlvbiBkZWZhdWx0c1xyXG5cdFx0cmVkaXJlY3RfdXJpOiB3aW5kb3cubG9jYXRpb24uaHJlZi5zcGxpdCgnIycpWzBdLFxyXG5cdFx0cmVzcG9uc2VfdHlwZTogJ3Rva2VuJyxcclxuXHRcdGRpc3BsYXk6ICdwb3B1cCcsXHJcblx0XHRzdGF0ZTogJycsXHJcblxyXG5cdFx0Ly8gT0F1dGgxIHNoaW1cclxuXHRcdC8vIFRoZSBwYXRoIHRvIHRoZSBPQXV0aDEgc2VydmVyIGZvciBzaWduaW5nIHVzZXIgcmVxdWVzdHNcclxuXHRcdC8vIFdhbnQgdG8gcmVjcmVhdGUgeW91ciBvd24/IENoZWNrb3V0IGh0dHBzOi8vZ2l0aHViLmNvbS9NclN3aXRjaC9ub2RlLW9hdXRoLXNoaW1cclxuXHRcdG9hdXRoX3Byb3h5OiAnaHR0cHM6Ly9hdXRoLXNlcnZlci5oZXJva3VhcHAuY29tL3Byb3h5JyxcclxuXHJcblx0XHQvLyBBUEkgdGltZW91dCBpbiBtaWxsaXNlY29uZHNcclxuXHRcdHRpbWVvdXQ6IDIwMDAwLFxyXG5cclxuXHRcdC8vIFBvcHVwIE9wdGlvbnNcclxuXHRcdHBvcHVwOiB7XHJcblx0XHRcdHJlc2l6YWJsZTogMSxcclxuXHRcdFx0c2Nyb2xsYmFyczogMSxcclxuXHRcdFx0d2lkdGg6IDUwMCxcclxuXHRcdFx0aGVpZ2h0OiA1NTBcclxuXHRcdH0sXHJcblxyXG5cdFx0Ly8gRGVmYXVsdCBzY29wZVxyXG5cdFx0Ly8gTWFueSBzZXJ2aWNlcyByZXF1aXJlIGF0bGVhc3QgYSBwcm9maWxlIHNjb3BlLFxyXG5cdFx0Ly8gSGVsbG9KUyBhdXRvbWF0aWFsbHkgaW5jbHVkZXMgdGhlIHZhbHVlIG9mIHByb3ZpZGVyLnNjb3BlX21hcC5iYXNpY1xyXG5cdFx0Ly8gSWYgdGhhdCdzIG5vdCByZXF1aXJlZCBpdCBjYW4gYmUgcmVtb3ZlZCB2aWEgaGVsbG8uc2V0dGluZ3Muc2NvcGUubGVuZ3RoID0gMDtcclxuXHRcdHNjb3BlOiBbJ2Jhc2ljJ10sXHJcblxyXG5cdFx0Ly8gU2NvcGUgTWFwc1xyXG5cdFx0Ly8gVGhpcyBpcyB0aGUgZGVmYXVsdCBtb2R1bGUgc2NvcGUsIHRoZXNlIGFyZSB0aGUgZGVmYXVsdHMgd2hpY2ggZWFjaCBzZXJ2aWNlIGlzIG1hcHBlZCB0b28uXHJcblx0XHQvLyBCeSBpbmNsdWRpbmcgdGhlbSBoZXJlIGl0IHByZXZlbnRzIHRoZSBzY29wZSBmcm9tIGJlaW5nIGFwcGxpZWQgYWNjaWRlbnRhbGx5XHJcblx0XHRzY29wZV9tYXA6IHtcclxuXHRcdFx0YmFzaWM6ICcnXHJcblx0XHR9LFxyXG5cclxuXHRcdC8vIERlZmF1bHQgc2VydmljZSAvIG5ldHdvcmtcclxuXHRcdGRlZmF1bHRfc2VydmljZTogbnVsbCxcclxuXHJcblx0XHQvLyBGb3JjZSBhdXRoZW50aWNhdGlvblxyXG5cdFx0Ly8gV2hlbiBoZWxsby5sb2dpbiBpcyBmaXJlZC5cclxuXHRcdC8vIChudWxsKTogaWdub3JlIGN1cnJlbnQgc2Vzc2lvbiBleHBpcnkgYW5kIGNvbnRpbnVlIHdpdGggbG9naW5cclxuXHRcdC8vICh0cnVlKTogaWdub3JlIGN1cnJlbnQgc2Vzc2lvbiBleHBpcnkgYW5kIGNvbnRpbnVlIHdpdGggbG9naW4sIGFzayBmb3IgdXNlciB0byByZWF1dGhlbnRpY2F0ZVxyXG5cdFx0Ly8gKGZhbHNlKTogaWYgdGhlIGN1cnJlbnQgc2Vzc2lvbiBsb29rcyBnb29kIGZvciB0aGUgcmVxdWVzdCBzY29wZXMgcmV0dXJuIHRoZSBjdXJyZW50IHNlc3Npb24uXHJcblx0XHRmb3JjZTogbnVsbCxcclxuXHJcblx0XHQvLyBQYWdlIFVSTFxyXG5cdFx0Ly8gV2hlbiAnZGlzcGxheT1wYWdlJyB0aGlzIHByb3BlcnR5IGRlZmluZXMgd2hlcmUgdGhlIHVzZXJzIHBhZ2Ugc2hvdWxkIGVuZCB1cCBhZnRlciByZWRpcmVjdF91cmlcclxuXHRcdC8vIFRocyBjb3VsZCBiZSBwcm9ibGVtYXRpYyBpZiB0aGUgcmVkaXJlY3RfdXJpIGlzIGluZGVlZCB0aGUgZmluYWwgcGxhY2UsXHJcblx0XHQvLyBUeXBpY2FsbHkgdGhpcyBjaXJjdW12ZW50cyB0aGUgcHJvYmxlbSBvZiB0aGUgcmVkaXJlY3RfdXJsIGJlaW5nIGEgZHVtYiByZWxheSBwYWdlLlxyXG5cdFx0cGFnZV91cmk6IHdpbmRvdy5sb2NhdGlvbi5ocmVmXHJcblx0fSxcclxuXHJcblx0Ly8gU2VydmljZSBjb25maWd1cmF0aW9uIG9iamVjdHNcclxuXHRzZXJ2aWNlczoge30sXHJcblxyXG5cdC8vIFVzZVxyXG5cdC8vIERlZmluZSBhIG5ldyBpbnN0YW5jZSBvZiB0aGUgSGVsbG9KUyBsaWJyYXJ5IHdpdGggYSBkZWZhdWx0IHNlcnZpY2VcclxuXHR1c2U6IGZ1bmN0aW9uKHNlcnZpY2UpIHtcclxuXHJcblx0XHQvLyBDcmVhdGUgc2VsZiwgd2hpY2ggaW5oZXJpdHMgZnJvbSBpdHMgcGFyZW50XHJcblx0XHR2YXIgc2VsZiA9IE9iamVjdC5jcmVhdGUodGhpcyk7XHJcblxyXG5cdFx0Ly8gSW5oZXJpdCB0aGUgcHJvdG90eXBlIGZyb20gaXRzIHBhcmVudFxyXG5cdFx0c2VsZi5zZXR0aW5ncyA9IE9iamVjdC5jcmVhdGUodGhpcy5zZXR0aW5ncyk7XHJcblxyXG5cdFx0Ly8gRGVmaW5lIHRoZSBkZWZhdWx0IHNlcnZpY2VcclxuXHRcdGlmIChzZXJ2aWNlKSB7XHJcblx0XHRcdHNlbGYuc2V0dGluZ3MuZGVmYXVsdF9zZXJ2aWNlID0gc2VydmljZTtcclxuXHRcdH1cclxuXHJcblx0XHQvLyBDcmVhdGUgYW4gaW5zdGFuY2Ugb2YgRXZlbnRzXHJcblx0XHRzZWxmLnV0aWxzLkV2ZW50LmNhbGwoc2VsZik7XHJcblxyXG5cdFx0cmV0dXJuIHNlbGY7XHJcblx0fSxcclxuXHJcblx0Ly8gSW5pdGlhbGl6ZVxyXG5cdC8vIERlZmluZSB0aGUgY2xpZW50X2lkcyBmb3IgdGhlIGVuZHBvaW50IHNlcnZpY2VzXHJcblx0Ly8gQHBhcmFtIG9iamVjdCBvLCBjb250YWlucyBhIGtleSB2YWx1ZSBwYWlyLCBzZXJ2aWNlID0+IGNsaWVudElkXHJcblx0Ly8gQHBhcmFtIG9iamVjdCBvcHRzLCBjb250YWlucyBhIGtleSB2YWx1ZSBwYWlyIG9mIG9wdGlvbnMgdXNlZCBmb3IgZGVmaW5pbmcgdGhlIGF1dGhlbnRpY2F0aW9uIGRlZmF1bHRzXHJcblx0Ly8gQHBhcmFtIG51bWJlciB0aW1lb3V0LCB0aW1lb3V0IGluIHNlY29uZHNcclxuXHRpbml0OiBmdW5jdGlvbihzZXJ2aWNlcywgb3B0aW9ucykge1xyXG5cclxuXHRcdHZhciB1dGlscyA9IHRoaXMudXRpbHM7XHJcblxyXG5cdFx0aWYgKCFzZXJ2aWNlcykge1xyXG5cdFx0XHRyZXR1cm4gdGhpcy5zZXJ2aWNlcztcclxuXHRcdH1cclxuXHJcblx0XHQvLyBEZWZpbmUgcHJvdmlkZXIgY3JlZGVudGlhbHNcclxuXHRcdC8vIFJlZm9ybWF0IHRoZSBJRCBmaWVsZFxyXG5cdFx0Zm9yICh2YXIgeCBpbiBzZXJ2aWNlcykge2lmIChzZXJ2aWNlcy5oYXNPd25Qcm9wZXJ0eSh4KSkge1xyXG5cdFx0XHRpZiAodHlwZW9mIChzZXJ2aWNlc1t4XSkgIT09ICdvYmplY3QnKSB7XHJcblx0XHRcdFx0c2VydmljZXNbeF0gPSB7aWQ6IHNlcnZpY2VzW3hdfTtcclxuXHRcdFx0fVxyXG5cdFx0fX1cclxuXHJcblx0XHQvLyBNZXJnZSBzZXJ2aWNlcyBpZiB0aGVyZSBhbHJlYWR5IGV4aXN0cyBzb21lXHJcblx0XHR1dGlscy5leHRlbmQodGhpcy5zZXJ2aWNlcywgc2VydmljZXMpO1xyXG5cclxuXHRcdC8vIFVwZGF0ZSB0aGUgZGVmYXVsdCBzZXR0aW5ncyB3aXRoIHRoaXMgb25lLlxyXG5cdFx0aWYgKG9wdGlvbnMpIHtcclxuXHRcdFx0dXRpbHMuZXh0ZW5kKHRoaXMuc2V0dGluZ3MsIG9wdGlvbnMpO1xyXG5cclxuXHRcdFx0Ly8gRG8gdGhpcyBpbW1lZGlhdGx5IGluY2FzZSB0aGUgYnJvd3NlciBjaGFuZ2VzIHRoZSBjdXJyZW50IHBhdGguXHJcblx0XHRcdGlmICgncmVkaXJlY3RfdXJpJyBpbiBvcHRpb25zKSB7XHJcblx0XHRcdFx0dGhpcy5zZXR0aW5ncy5yZWRpcmVjdF91cmkgPSB1dGlscy51cmwob3B0aW9ucy5yZWRpcmVjdF91cmkpLmhyZWY7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gdGhpcztcclxuXHR9LFxyXG5cclxuXHQvLyBMb2dpblxyXG5cdC8vIFVzaW5nIHRoZSBlbmRwb2ludFxyXG5cdC8vIEBwYXJhbSBuZXR3b3JrIHN0cmluZ2lmeSAgICAgICBuYW1lIHRvIGNvbm5lY3QgdG9cclxuXHQvLyBAcGFyYW0gb3B0aW9ucyBvYmplY3QgICAgKG9wdGlvbmFsKSAge2Rpc3BsYXkgbW9kZSwgaXMgZWl0aGVyIG5vbmV8cG9wdXAoZGVmYXVsdCl8cGFnZSwgc2NvcGU6IGVtYWlsLGJpcnRoZGF5LHB1Ymxpc2gsIC4uIH1cclxuXHQvLyBAcGFyYW0gY2FsbGJhY2sgIGZ1bmN0aW9uICAob3B0aW9uYWwpICBmaXJlZCBvbiBzaWduaW5cclxuXHRsb2dpbjogZnVuY3Rpb24oKSB7XHJcblxyXG5cdFx0Ly8gQ3JlYXRlIGFuIG9iamVjdCB3aGljaCBpbmhlcml0cyBpdHMgcGFyZW50IGFzIHRoZSBwcm90b3R5cGUgYW5kIGNvbnN0cnVjdHMgYSBuZXcgZXZlbnQgY2hhaW4uXHJcblx0XHR2YXIgX3RoaXMgPSB0aGlzO1xyXG5cdFx0dmFyIHV0aWxzID0gX3RoaXMudXRpbHM7XHJcblx0XHR2YXIgZXJyb3IgPSB1dGlscy5lcnJvcjtcclxuXHRcdHZhciBwcm9taXNlID0gdXRpbHMuUHJvbWlzZSgpO1xyXG5cclxuXHRcdC8vIEdldCBwYXJhbWV0ZXJzXHJcblx0XHR2YXIgcCA9IHV0aWxzLmFyZ3Moe25ldHdvcms6ICdzJywgb3B0aW9uczogJ28nLCBjYWxsYmFjazogJ2YnfSwgYXJndW1lbnRzKTtcclxuXHJcblx0XHQvLyBMb2NhbCB2YXJzXHJcblx0XHR2YXIgdXJsO1xyXG5cclxuXHRcdC8vIEdldCBhbGwgdGhlIGN1c3RvbSBvcHRpb25zIGFuZCBzdG9yZSB0byBiZSBhcHBlbmRlZCB0byB0aGUgcXVlcnlzdHJpbmdcclxuXHRcdHZhciBxcyA9IHV0aWxzLmRpZmZLZXkocC5vcHRpb25zLCBfdGhpcy5zZXR0aW5ncyk7XHJcblxyXG5cdFx0Ly8gTWVyZ2Uvb3ZlcnJpZGUgb3B0aW9ucyB3aXRoIGFwcCBkZWZhdWx0c1xyXG5cdFx0dmFyIG9wdHMgPSBwLm9wdGlvbnMgPSB1dGlscy5tZXJnZShfdGhpcy5zZXR0aW5ncywgcC5vcHRpb25zIHx8IHt9KTtcclxuXHJcblx0XHQvLyBNZXJnZS9vdmVycmlkZSBvcHRpb25zIHdpdGggYXBwIGRlZmF1bHRzXHJcblx0XHRvcHRzLnBvcHVwID0gdXRpbHMubWVyZ2UoX3RoaXMuc2V0dGluZ3MucG9wdXAsIHAub3B0aW9ucy5wb3B1cCB8fCB7fSk7XHJcblxyXG5cdFx0Ly8gTmV0d29ya1xyXG5cdFx0cC5uZXR3b3JrID0gcC5uZXR3b3JrIHx8IF90aGlzLnNldHRpbmdzLmRlZmF1bHRfc2VydmljZTtcclxuXHJcblx0XHQvLyBCaW5kIGNhbGxiYWNrIHRvIGJvdGggcmVqZWN0IGFuZCBmdWxmaWxsIHN0YXRlc1xyXG5cdFx0cHJvbWlzZS5wcm94eS50aGVuKHAuY2FsbGJhY2ssIHAuY2FsbGJhY2spO1xyXG5cclxuXHRcdC8vIFRyaWdnZXIgYW4gZXZlbnQgb24gdGhlIGdsb2JhbCBsaXN0ZW5lclxyXG5cdFx0ZnVuY3Rpb24gZW1pdChzLCB2YWx1ZSkge1xyXG5cdFx0XHRoZWxsby5lbWl0KHMsIHZhbHVlKTtcclxuXHRcdH1cclxuXHJcblx0XHRwcm9taXNlLnByb3h5LnRoZW4oZW1pdC5iaW5kKHRoaXMsICdhdXRoLmxvZ2luIGF1dGgnKSwgZW1pdC5iaW5kKHRoaXMsICdhdXRoLmZhaWxlZCBhdXRoJykpO1xyXG5cclxuXHRcdC8vIElzIG91ciBzZXJ2aWNlIHZhbGlkP1xyXG5cdFx0aWYgKHR5cGVvZiAocC5uZXR3b3JrKSAhPT0gJ3N0cmluZycgfHwgIShwLm5ldHdvcmsgaW4gX3RoaXMuc2VydmljZXMpKSB7XHJcblx0XHRcdC8vIFRyaWdnZXIgdGhlIGRlZmF1bHQgbG9naW4uXHJcblx0XHRcdC8vIEFoaCB3ZSBkb250IGhhdmUgb25lLlxyXG5cdFx0XHRyZXR1cm4gcHJvbWlzZS5yZWplY3QoZXJyb3IoJ2ludmFsaWRfbmV0d29yaycsICdUaGUgcHJvdmlkZWQgbmV0d29yayB3YXMgbm90IHJlY29nbml6ZWQnKSk7XHJcblx0XHR9XHJcblxyXG5cdFx0dmFyIHByb3ZpZGVyID0gX3RoaXMuc2VydmljZXNbcC5uZXR3b3JrXTtcclxuXHJcblx0XHQvLyBDcmVhdGUgYSBnbG9iYWwgbGlzdGVuZXIgdG8gY2FwdHVyZSBldmVudHMgdHJpZ2dlcmVkIG91dCBvZiBzY29wZVxyXG5cdFx0dmFyIGNhbGxiYWNrSWQgPSB1dGlscy5nbG9iYWxFdmVudChmdW5jdGlvbihzdHIpIHtcclxuXHJcblx0XHRcdC8vIFRoZSByZXNwb25zZUhhbmRsZXIgcmV0dXJucyBhIHN0cmluZywgbGV0cyBzYXZlIHRoaXMgbG9jYWxseVxyXG5cdFx0XHR2YXIgb2JqO1xyXG5cclxuXHRcdFx0aWYgKHN0cikge1xyXG5cdFx0XHRcdG9iaiA9IEpTT04ucGFyc2Uoc3RyKTtcclxuXHRcdFx0fVxyXG5cdFx0XHRlbHNlIHtcclxuXHRcdFx0XHRvYmogPSBlcnJvcignY2FuY2VsbGVkJywgJ1RoZSBhdXRoZW50aWNhdGlvbiB3YXMgbm90IGNvbXBsZXRlZCcpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQvLyBIYW5kbGUgdGhlc2UgcmVzcG9uc2UgdXNpbmcgdGhlIGxvY2FsXHJcblx0XHRcdC8vIFRyaWdnZXIgb24gdGhlIHBhcmVudFxyXG5cdFx0XHRpZiAoIW9iai5lcnJvcikge1xyXG5cclxuXHRcdFx0XHQvLyBTYXZlIG9uIHRoZSBwYXJlbnQgd2luZG93IHRoZSBuZXcgY3JlZGVudGlhbHNcclxuXHRcdFx0XHQvLyBUaGlzIGZpeGVzIGFuIElFMTAgYnVnIGkgdGhpbmsuLi4gYXRsZWFzdCBpdCBkb2VzIGZvciBtZS5cclxuXHRcdFx0XHR1dGlscy5zdG9yZShvYmoubmV0d29yaywgb2JqKTtcclxuXHJcblx0XHRcdFx0Ly8gRnVsZmlsbCBhIHN1Y2Nlc3NmdWwgbG9naW5cclxuXHRcdFx0XHRwcm9taXNlLmZ1bGZpbGwoe1xyXG5cdFx0XHRcdFx0bmV0d29yazogb2JqLm5ldHdvcmssXHJcblx0XHRcdFx0XHRhdXRoUmVzcG9uc2U6IG9ialxyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHR9XHJcblx0XHRcdGVsc2Uge1xyXG5cdFx0XHRcdC8vIFJlamVjdCBhIHN1Y2Nlc3NmdWwgbG9naW5cclxuXHRcdFx0XHRwcm9taXNlLnJlamVjdChvYmopO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHJcblx0XHR2YXIgcmVkaXJlY3RVcmkgPSB1dGlscy51cmwob3B0cy5yZWRpcmVjdF91cmkpLmhyZWY7XHJcblxyXG5cdFx0Ly8gTWF5IGJlIGEgc3BhY2UtZGVsaW1pdGVkIGxpc3Qgb2YgbXVsdGlwbGUsIGNvbXBsZW1lbnRhcnkgdHlwZXNcclxuXHRcdHZhciByZXNwb25zZVR5cGUgPSBwcm92aWRlci5vYXV0aC5yZXNwb25zZV90eXBlIHx8IG9wdHMucmVzcG9uc2VfdHlwZTtcclxuXHJcblx0XHQvLyBGYWxsYmFjayB0byB0b2tlbiBpZiB0aGUgbW9kdWxlIGhhc24ndCBkZWZpbmVkIGEgZ3JhbnQgdXJsXHJcblx0XHRpZiAoL1xcYmNvZGVcXGIvLnRlc3QocmVzcG9uc2VUeXBlKSAmJiAhcHJvdmlkZXIub2F1dGguZ3JhbnQpIHtcclxuXHRcdFx0cmVzcG9uc2VUeXBlID0gcmVzcG9uc2VUeXBlLnJlcGxhY2UoL1xcYmNvZGVcXGIvLCAndG9rZW4nKTtcclxuXHRcdH1cclxuXHJcblx0XHQvLyBRdWVyeSBzdHJpbmcgcGFyYW1ldGVycywgd2UgbWF5IHBhc3Mgb3VyIG93biBhcmd1bWVudHMgdG8gZm9ybSB0aGUgcXVlcnlzdHJpbmdcclxuXHRcdHAucXMgPSB1dGlscy5tZXJnZShxcywge1xyXG5cdFx0XHRjbGllbnRfaWQ6IGVuY29kZVVSSUNvbXBvbmVudChwcm92aWRlci5pZCksXHJcblx0XHRcdHJlc3BvbnNlX3R5cGU6IGVuY29kZVVSSUNvbXBvbmVudChyZXNwb25zZVR5cGUpLFxyXG5cdFx0XHRyZWRpcmVjdF91cmk6IGVuY29kZVVSSUNvbXBvbmVudChyZWRpcmVjdFVyaSksXHJcblx0XHRcdHN0YXRlOiB7XHJcblx0XHRcdFx0Y2xpZW50X2lkOiBwcm92aWRlci5pZCxcclxuXHRcdFx0XHRuZXR3b3JrOiBwLm5ldHdvcmssXHJcblx0XHRcdFx0ZGlzcGxheTogb3B0cy5kaXNwbGF5LFxyXG5cdFx0XHRcdGNhbGxiYWNrOiBjYWxsYmFja0lkLFxyXG5cdFx0XHRcdHN0YXRlOiBvcHRzLnN0YXRlLFxyXG5cdFx0XHRcdHJlZGlyZWN0X3VyaTogcmVkaXJlY3RVcmlcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblxyXG5cdFx0Ly8gR2V0IGN1cnJlbnQgc2Vzc2lvbiBmb3IgbWVyZ2luZyBzY29wZXMsIGFuZCBmb3IgcXVpY2sgYXV0aCByZXNwb25zZVxyXG5cdFx0dmFyIHNlc3Npb24gPSB1dGlscy5zdG9yZShwLm5ldHdvcmspO1xyXG5cclxuXHRcdC8vIFNjb3BlcyAoYXV0aGVudGljYXRpb24gcGVybWlzaW9ucylcclxuXHRcdC8vIEVuc3VyZSB0aGlzIGlzIGEgc3RyaW5nIC0gSUUgaGFzIGEgcHJvYmxlbSBtb3ZpbmcgQXJyYXlzIGJldHdlZW4gd2luZG93c1xyXG5cdFx0Ly8gQXBwZW5kIHRoZSBzZXR1cCBzY29wZVxyXG5cdFx0dmFyIFNDT1BFX1NQTElUID0gL1ssXFxzXSsvO1xyXG5cclxuXHRcdC8vIEluY2x1ZGUgZGVmYXVsdCBzY29wZSBzZXR0aW5ncyAoY2xvbmVkKS5cclxuXHRcdHZhciBzY29wZSA9IF90aGlzLnNldHRpbmdzLnNjb3BlID8gW190aGlzLnNldHRpbmdzLnNjb3BlLnRvU3RyaW5nKCldIDogW107XHJcblxyXG5cdFx0Ly8gRXh0ZW5kIHRoZSBwcm92aWRlcnMgc2NvcGUgbGlzdCB3aXRoIHRoZSBkZWZhdWx0XHJcblx0XHR2YXIgc2NvcGVNYXAgPSB1dGlscy5tZXJnZShfdGhpcy5zZXR0aW5ncy5zY29wZV9tYXAsIHByb3ZpZGVyLnNjb3BlIHx8IHt9KTtcclxuXHJcblx0XHQvLyBBZGQgdXNlciBkZWZpbmVkIHNjb3Blcy4uLlxyXG5cdFx0aWYgKG9wdHMuc2NvcGUpIHtcclxuXHRcdFx0c2NvcGUucHVzaChvcHRzLnNjb3BlLnRvU3RyaW5nKCkpO1xyXG5cdFx0fVxyXG5cclxuXHRcdC8vIEFwcGVuZCBzY29wZXMgZnJvbSBhIHByZXZpb3VzIHNlc3Npb24uXHJcblx0XHQvLyBUaGlzIGhlbHBzIGtlZXAgYXBwIGNyZWRlbnRpYWxzIGNvbnN0YW50LFxyXG5cdFx0Ly8gQXZvaWRpbmcgaGF2aW5nIHRvIGtlZXAgdGFicyBvbiB3aGF0IHNjb3BlcyBhcmUgYXV0aG9yaXplZFxyXG5cdFx0aWYgKHNlc3Npb24gJiYgJ3Njb3BlJyBpbiBzZXNzaW9uICYmIHNlc3Npb24uc2NvcGUgaW5zdGFuY2VvZiBTdHJpbmcpIHtcclxuXHRcdFx0c2NvcGUucHVzaChzZXNzaW9uLnNjb3BlKTtcclxuXHRcdH1cclxuXHJcblx0XHQvLyBKb2luIGFuZCBTcGxpdCBhZ2FpblxyXG5cdFx0c2NvcGUgPSBzY29wZS5qb2luKCcsJykuc3BsaXQoU0NPUEVfU1BMSVQpO1xyXG5cclxuXHRcdC8vIEZvcm1hdCByZW1vdmUgZHVwbGljYXRlcyBhbmQgZW1wdHkgdmFsdWVzXHJcblx0XHRzY29wZSA9IHV0aWxzLnVuaXF1ZShzY29wZSkuZmlsdGVyKGZpbHRlckVtcHR5KTtcclxuXHJcblx0XHQvLyBTYXZlIHRoZSB0aGUgc2NvcGVzIHRvIHRoZSBzdGF0ZSB3aXRoIHRoZSBuYW1lcyB0aGF0IHRoZXkgd2VyZSByZXF1ZXN0ZWQgd2l0aC5cclxuXHRcdHAucXMuc3RhdGUuc2NvcGUgPSBzY29wZS5qb2luKCcsJyk7XHJcblxyXG5cdFx0Ly8gTWFwIHNjb3BlcyB0byB0aGUgcHJvdmlkZXJzIG5hbWluZyBjb252ZW50aW9uXHJcblx0XHRzY29wZSA9IHNjb3BlLm1hcChmdW5jdGlvbihpdGVtKSB7XHJcblx0XHRcdC8vIERvZXMgdGhpcyBoYXZlIGEgbWFwcGluZz9cclxuXHRcdFx0cmV0dXJuIChpdGVtIGluIHNjb3BlTWFwKSA/IHNjb3BlTWFwW2l0ZW1dIDogaXRlbTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdC8vIFN0cmluZ2lmeSBhbmQgQXJyYXlpZnkgc28gdGhhdCBkb3VibGUgbWFwcGVkIHNjb3BlcyBhcmUgZ2l2ZW4gdGhlIGNoYW5jZSB0byBiZSBmb3JtYXR0ZWRcclxuXHRcdHNjb3BlID0gc2NvcGUuam9pbignLCcpLnNwbGl0KFNDT1BFX1NQTElUKTtcclxuXHJcblx0XHQvLyBBZ2Fpbi4uLlxyXG5cdFx0Ly8gRm9ybWF0IHJlbW92ZSBkdXBsaWNhdGVzIGFuZCBlbXB0eSB2YWx1ZXNcclxuXHRcdHNjb3BlID0gdXRpbHMudW5pcXVlKHNjb3BlKS5maWx0ZXIoZmlsdGVyRW1wdHkpO1xyXG5cclxuXHRcdC8vIEpvaW4gd2l0aCB0aGUgZXhwZWN0ZWQgc2NvcGUgZGVsaW1pdGVyIGludG8gYSBzdHJpbmdcclxuXHRcdHAucXMuc2NvcGUgPSBzY29wZS5qb2luKHByb3ZpZGVyLnNjb3BlX2RlbGltIHx8ICcsJyk7XHJcblxyXG5cdFx0Ly8gSXMgdGhlIHVzZXIgYWxyZWFkeSBzaWduZWQgaW4gd2l0aCB0aGUgYXBwcm9wcmlhdGUgc2NvcGVzLCB2YWxpZCBhY2Nlc3NfdG9rZW4/XHJcblx0XHRpZiAob3B0cy5mb3JjZSA9PT0gZmFsc2UpIHtcclxuXHJcblx0XHRcdGlmIChzZXNzaW9uICYmICdhY2Nlc3NfdG9rZW4nIGluIHNlc3Npb24gJiYgc2Vzc2lvbi5hY2Nlc3NfdG9rZW4gJiYgJ2V4cGlyZXMnIGluIHNlc3Npb24gJiYgc2Vzc2lvbi5leHBpcmVzID4gKChuZXcgRGF0ZSgpKS5nZXRUaW1lKCkgLyAxZTMpKSB7XHJcblx0XHRcdFx0Ly8gV2hhdCBpcyBkaWZmZXJlbnQgYWJvdXQgdGhlIHNjb3BlcyBpbiB0aGUgc2Vzc2lvbiB2cyB0aGUgc2NvcGVzIGluIHRoZSBuZXcgbG9naW4/XHJcblx0XHRcdFx0dmFyIGRpZmYgPSB1dGlscy5kaWZmKChzZXNzaW9uLnNjb3BlIHx8ICcnKS5zcGxpdChTQ09QRV9TUExJVCksIChwLnFzLnN0YXRlLnNjb3BlIHx8ICcnKS5zcGxpdChTQ09QRV9TUExJVCkpO1xyXG5cdFx0XHRcdGlmIChkaWZmLmxlbmd0aCA9PT0gMCkge1xyXG5cclxuXHRcdFx0XHRcdC8vIE9LIHRyaWdnZXIgdGhlIGNhbGxiYWNrXHJcblx0XHRcdFx0XHRwcm9taXNlLmZ1bGZpbGwoe1xyXG5cdFx0XHRcdFx0XHR1bmNoYW5nZWQ6IHRydWUsXHJcblx0XHRcdFx0XHRcdG5ldHdvcms6IHAubmV0d29yayxcclxuXHRcdFx0XHRcdFx0YXV0aFJlc3BvbnNlOiBzZXNzaW9uXHJcblx0XHRcdFx0XHR9KTtcclxuXHJcblx0XHRcdFx0XHQvLyBOb3RoaW5nIGhhcyBjaGFuZ2VkXHJcblx0XHRcdFx0XHRyZXR1cm4gcHJvbWlzZTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHQvLyBQYWdlIFVSTFxyXG5cdFx0aWYgKG9wdHMuZGlzcGxheSA9PT0gJ3BhZ2UnICYmIG9wdHMucGFnZV91cmkpIHtcclxuXHRcdFx0Ly8gQWRkIGEgcGFnZSBsb2NhdGlvbiwgcGxhY2UgdG8gZW5kdXAgYWZ0ZXIgc2Vzc2lvbiBoYXMgYXV0aGVudGljYXRlZFxyXG5cdFx0XHRwLnFzLnN0YXRlLnBhZ2VfdXJpID0gdXRpbHMudXJsKG9wdHMucGFnZV91cmkpLmhyZWY7XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gQmVzcG9rZVxyXG5cdFx0Ly8gT3ZlcnJpZGUgbG9naW4gcXVlcnlzdHJpbmdzIGZyb20gYXV0aF9vcHRpb25zXHJcblx0XHRpZiAoJ2xvZ2luJyBpbiBwcm92aWRlciAmJiB0eXBlb2YgKHByb3ZpZGVyLmxvZ2luKSA9PT0gJ2Z1bmN0aW9uJykge1xyXG5cdFx0XHQvLyBGb3JtYXQgdGhlIHBhcmFtYXRlcnMgYWNjb3JkaW5nIHRvIHRoZSBwcm92aWRlcnMgZm9ybWF0dGluZyBmdW5jdGlvblxyXG5cdFx0XHRwcm92aWRlci5sb2dpbihwKTtcclxuXHRcdH1cclxuXHJcblx0XHQvLyBBZGQgT0F1dGggdG8gc3RhdGVcclxuXHRcdC8vIFdoZXJlIHRoZSBzZXJ2aWNlIGlzIGdvaW5nIHRvIHRha2UgYWR2YW50YWdlIG9mIHRoZSBvYXV0aF9wcm94eVxyXG5cdFx0aWYgKCEvXFxidG9rZW5cXGIvLnRlc3QocmVzcG9uc2VUeXBlKSB8fFxyXG5cdFx0cGFyc2VJbnQocHJvdmlkZXIub2F1dGgudmVyc2lvbiwgMTApIDwgMiB8fFxyXG5cdFx0KG9wdHMuZGlzcGxheSA9PT0gJ25vbmUnICYmIHByb3ZpZGVyLm9hdXRoLmdyYW50ICYmIHNlc3Npb24gJiYgc2Vzc2lvbi5yZWZyZXNoX3Rva2VuKSkge1xyXG5cclxuXHRcdFx0Ly8gQWRkIHRoZSBvYXV0aCBlbmRwb2ludHNcclxuXHRcdFx0cC5xcy5zdGF0ZS5vYXV0aCA9IHByb3ZpZGVyLm9hdXRoO1xyXG5cclxuXHRcdFx0Ly8gQWRkIHRoZSBwcm94eSB1cmxcclxuXHRcdFx0cC5xcy5zdGF0ZS5vYXV0aF9wcm94eSA9IG9wdHMub2F1dGhfcHJveHk7XHJcblxyXG5cdFx0fVxyXG5cclxuXHRcdC8vIENvbnZlcnQgc3RhdGUgdG8gYSBzdHJpbmdcclxuXHRcdHAucXMuc3RhdGUgPSBlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkocC5xcy5zdGF0ZSkpO1xyXG5cclxuXHRcdC8vIFVSTFxyXG5cdFx0aWYgKHBhcnNlSW50KHByb3ZpZGVyLm9hdXRoLnZlcnNpb24sIDEwKSA9PT0gMSkge1xyXG5cclxuXHRcdFx0Ly8gVHVybiB0aGUgcmVxdWVzdCB0byB0aGUgT0F1dGggUHJveHkgZm9yIDMtbGVnZ2VkIGF1dGhcclxuXHRcdFx0dXJsID0gdXRpbHMucXMob3B0cy5vYXV0aF9wcm94eSwgcC5xcywgZW5jb2RlRnVuY3Rpb24pO1xyXG5cdFx0fVxyXG5cclxuXHRcdC8vIFJlZnJlc2ggdG9rZW5cclxuXHRcdGVsc2UgaWYgKG9wdHMuZGlzcGxheSA9PT0gJ25vbmUnICYmIHByb3ZpZGVyLm9hdXRoLmdyYW50ICYmIHNlc3Npb24gJiYgc2Vzc2lvbi5yZWZyZXNoX3Rva2VuKSB7XHJcblxyXG5cdFx0XHQvLyBBZGQgdGhlIHJlZnJlc2hfdG9rZW4gdG8gdGhlIHJlcXVlc3RcclxuXHRcdFx0cC5xcy5yZWZyZXNoX3Rva2VuID0gc2Vzc2lvbi5yZWZyZXNoX3Rva2VuO1xyXG5cclxuXHRcdFx0Ly8gRGVmaW5lIHRoZSByZXF1ZXN0IHBhdGhcclxuXHRcdFx0dXJsID0gdXRpbHMucXMob3B0cy5vYXV0aF9wcm94eSwgcC5xcywgZW5jb2RlRnVuY3Rpb24pO1xyXG5cdFx0fVxyXG5cdFx0ZWxzZSB7XHJcblx0XHRcdHVybCA9IHV0aWxzLnFzKHByb3ZpZGVyLm9hdXRoLmF1dGgsIHAucXMsIGVuY29kZUZ1bmN0aW9uKTtcclxuXHRcdH1cclxuXHJcblx0XHQvLyBCcm9hZGNhc3QgdGhpcyBldmVudCBhcyBhbiBhdXRoOmluaXRcclxuXHRcdGVtaXQoJ2F1dGguaW5pdCcsIHApO1xyXG5cclxuXHRcdC8vIEV4ZWN1dGVcclxuXHRcdC8vIFRyaWdnZXIgaG93IHdlIHdhbnQgc2VsZiBkaXNwbGF5ZWRcclxuXHRcdGlmIChvcHRzLmRpc3BsYXkgPT09ICdub25lJykge1xyXG5cdFx0XHQvLyBTaWduLWluIGluIHRoZSBiYWNrZ3JvdW5kLCBpZnJhbWVcclxuXHRcdFx0dXRpbHMuaWZyYW1lKHVybCwgcmVkaXJlY3RVcmkpO1xyXG5cdFx0fVxyXG5cclxuXHRcdC8vIFRyaWdnZXJpbmcgcG9wdXA/XHJcblx0XHRlbHNlIGlmIChvcHRzLmRpc3BsYXkgPT09ICdwb3B1cCcpIHtcclxuXHJcblx0XHRcdHZhciBwb3B1cCA9IHV0aWxzLnBvcHVwKHVybCwgcmVkaXJlY3RVcmksIG9wdHMucG9wdXApO1xyXG5cclxuXHRcdFx0dmFyIHRpbWVyID0gc2V0SW50ZXJ2YWwoZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0aWYgKCFwb3B1cCB8fCBwb3B1cC5jbG9zZWQpIHtcclxuXHRcdFx0XHRcdGNsZWFySW50ZXJ2YWwodGltZXIpO1xyXG5cdFx0XHRcdFx0aWYgKCFwcm9taXNlLnN0YXRlKSB7XHJcblxyXG5cdFx0XHRcdFx0XHR2YXIgcmVzcG9uc2UgPSBlcnJvcignY2FuY2VsbGVkJywgJ0xvZ2luIGhhcyBiZWVuIGNhbmNlbGxlZCcpO1xyXG5cclxuXHRcdFx0XHRcdFx0aWYgKCFwb3B1cCkge1xyXG5cdFx0XHRcdFx0XHRcdHJlc3BvbnNlID0gZXJyb3IoJ2Jsb2NrZWQnLCAnUG9wdXAgd2FzIGJsb2NrZWQnKTtcclxuXHRcdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdFx0cmVzcG9uc2UubmV0d29yayA9IHAubmV0d29yaztcclxuXHJcblx0XHRcdFx0XHRcdHByb21pc2UucmVqZWN0KHJlc3BvbnNlKTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XHJcblx0XHRcdH0sIDEwMCk7XHJcblx0XHR9XHJcblxyXG5cdFx0ZWxzZSB7XHJcblx0XHRcdHdpbmRvdy5sb2NhdGlvbiA9IHVybDtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gcHJvbWlzZS5wcm94eTtcclxuXHJcblx0XHRmdW5jdGlvbiBlbmNvZGVGdW5jdGlvbihzKSB7cmV0dXJuIHM7fVxyXG5cclxuXHRcdGZ1bmN0aW9uIGZpbHRlckVtcHR5KHMpIHtyZXR1cm4gISFzO31cclxuXHR9LFxyXG5cclxuXHQvLyBSZW1vdmUgYW55IGRhdGEgYXNzb2NpYXRlZCB3aXRoIGEgZ2l2ZW4gc2VydmljZVxyXG5cdC8vIEBwYXJhbSBzdHJpbmcgbmFtZSBvZiB0aGUgc2VydmljZVxyXG5cdC8vIEBwYXJhbSBmdW5jdGlvbiBjYWxsYmFja1xyXG5cdGxvZ291dDogZnVuY3Rpb24oKSB7XHJcblxyXG5cdFx0dmFyIF90aGlzID0gdGhpcztcclxuXHRcdHZhciB1dGlscyA9IF90aGlzLnV0aWxzO1xyXG5cdFx0dmFyIGVycm9yID0gdXRpbHMuZXJyb3I7XHJcblxyXG5cdFx0Ly8gQ3JlYXRlIGEgbmV3IHByb21pc2VcclxuXHRcdHZhciBwcm9taXNlID0gdXRpbHMuUHJvbWlzZSgpO1xyXG5cclxuXHRcdHZhciBwID0gdXRpbHMuYXJncyh7bmFtZToncycsIG9wdGlvbnM6ICdvJywgY2FsbGJhY2s6ICdmJ30sIGFyZ3VtZW50cyk7XHJcblxyXG5cdFx0cC5vcHRpb25zID0gcC5vcHRpb25zIHx8IHt9O1xyXG5cclxuXHRcdC8vIEFkZCBjYWxsYmFjayB0byBldmVudHNcclxuXHRcdHByb21pc2UucHJveHkudGhlbihwLmNhbGxiYWNrLCBwLmNhbGxiYWNrKTtcclxuXHJcblx0XHQvLyBUcmlnZ2VyIGFuIGV2ZW50IG9uIHRoZSBnbG9iYWwgbGlzdGVuZXJcclxuXHRcdGZ1bmN0aW9uIGVtaXQocywgdmFsdWUpIHtcclxuXHRcdFx0aGVsbG8uZW1pdChzLCB2YWx1ZSk7XHJcblx0XHR9XHJcblxyXG5cdFx0cHJvbWlzZS5wcm94eS50aGVuKGVtaXQuYmluZCh0aGlzLCAnYXV0aC5sb2dvdXQgYXV0aCcpLCBlbWl0LmJpbmQodGhpcywgJ2Vycm9yJykpO1xyXG5cclxuXHRcdC8vIE5ldHdvcmtcclxuXHRcdHAubmFtZSA9IHAubmFtZSB8fCB0aGlzLnNldHRpbmdzLmRlZmF1bHRfc2VydmljZTtcclxuXHRcdHAuYXV0aFJlc3BvbnNlID0gdXRpbHMuc3RvcmUocC5uYW1lKTtcclxuXHJcblx0XHRpZiAocC5uYW1lICYmICEocC5uYW1lIGluIF90aGlzLnNlcnZpY2VzKSkge1xyXG5cclxuXHRcdFx0cHJvbWlzZS5yZWplY3QoZXJyb3IoJ2ludmFsaWRfbmV0d29yaycsICdUaGUgbmV0d29yayB3YXMgdW5yZWNvZ25pemVkJykpO1xyXG5cclxuXHRcdH1cclxuXHRcdGVsc2UgaWYgKHAubmFtZSAmJiBwLmF1dGhSZXNwb25zZSkge1xyXG5cclxuXHRcdFx0Ly8gRGVmaW5lIHRoZSBjYWxsYmFja1xyXG5cdFx0XHR2YXIgY2FsbGJhY2sgPSBmdW5jdGlvbihvcHRzKSB7XHJcblxyXG5cdFx0XHRcdC8vIFJlbW92ZSBmcm9tIHRoZSBzdG9yZVxyXG5cdFx0XHRcdHV0aWxzLnN0b3JlKHAubmFtZSwgbnVsbCk7XHJcblxyXG5cdFx0XHRcdC8vIEVtaXQgZXZlbnRzIGJ5IGRlZmF1bHRcclxuXHRcdFx0XHRwcm9taXNlLmZ1bGZpbGwoaGVsbG8udXRpbHMubWVyZ2Uoe25ldHdvcms6cC5uYW1lfSwgb3B0cyB8fCB7fSkpO1xyXG5cdFx0XHR9O1xyXG5cclxuXHRcdFx0Ly8gUnVuIGFuIGFzeW5jIG9wZXJhdGlvbiB0byByZW1vdmUgdGhlIHVzZXJzIHNlc3Npb25cclxuXHRcdFx0dmFyIF9vcHRzID0ge307XHJcblx0XHRcdGlmIChwLm9wdGlvbnMuZm9yY2UpIHtcclxuXHRcdFx0XHR2YXIgbG9nb3V0ID0gX3RoaXMuc2VydmljZXNbcC5uYW1lXS5sb2dvdXQ7XHJcblx0XHRcdFx0aWYgKGxvZ291dCkge1xyXG5cdFx0XHRcdFx0Ly8gQ29udmVydCBsb2dvdXQgdG8gVVJMIHN0cmluZyxcclxuXHRcdFx0XHRcdC8vIElmIG5vIHN0cmluZyBpcyByZXR1cm5lZCwgdGhlbiB0aGlzIGZ1bmN0aW9uIHdpbGwgaGFuZGxlIHRoZSBsb2dvdXQgYXN5bmMgc3R5bGVcclxuXHRcdFx0XHRcdGlmICh0eXBlb2YgKGxvZ291dCkgPT09ICdmdW5jdGlvbicpIHtcclxuXHRcdFx0XHRcdFx0bG9nb3V0ID0gbG9nb3V0KGNhbGxiYWNrLCBwKTtcclxuXHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHQvLyBJZiBsb2dvdXQgaXMgYSBzdHJpbmcgdGhlbiBhc3N1bWUgVVJMIGFuZCBvcGVuIGluIGlmcmFtZS5cclxuXHRcdFx0XHRcdGlmICh0eXBlb2YgKGxvZ291dCkgPT09ICdzdHJpbmcnKSB7XHJcblx0XHRcdFx0XHRcdHV0aWxzLmlmcmFtZShsb2dvdXQpO1xyXG5cdFx0XHRcdFx0XHRfb3B0cy5mb3JjZSA9IG51bGw7XHJcblx0XHRcdFx0XHRcdF9vcHRzLm1lc3NhZ2UgPSAnTG9nb3V0IHN1Y2Nlc3Mgb24gcHJvdmlkZXJzIHNpdGUgd2FzIGluZGV0ZXJtaW5hdGUnO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0ZWxzZSBpZiAobG9nb3V0ID09PSB1bmRlZmluZWQpIHtcclxuXHRcdFx0XHRcdFx0Ly8gVGhlIGNhbGxiYWNrIGZ1bmN0aW9uIHdpbGwgaGFuZGxlIHRoZSByZXNwb25zZS5cclxuXHRcdFx0XHRcdFx0cmV0dXJuIHByb21pc2UucHJveHk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQvLyBSZW1vdmUgbG9jYWwgY3JlZGVudGlhbHNcclxuXHRcdFx0Y2FsbGJhY2soX29wdHMpO1xyXG5cdFx0fVxyXG5cdFx0ZWxzZSB7XHJcblx0XHRcdHByb21pc2UucmVqZWN0KGVycm9yKCdpbnZhbGlkX3Nlc3Npb24nLCAnVGhlcmUgd2FzIG5vIHNlc3Npb24gdG8gcmVtb3ZlJykpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBwcm9taXNlLnByb3h5O1xyXG5cdH0sXHJcblxyXG5cdC8vIFJldHVybnMgYWxsIHRoZSBzZXNzaW9ucyB0aGF0IGFyZSBzdWJzY3JpYmVkIHRvb1xyXG5cdC8vIEBwYXJhbSBzdHJpbmcgb3B0aW9uYWwsIG5hbWUgb2YgdGhlIHNlcnZpY2UgdG8gZ2V0IGluZm9ybWF0aW9uIGFib3V0LlxyXG5cdGdldEF1dGhSZXNwb25zZTogZnVuY3Rpb24oc2VydmljZSkge1xyXG5cclxuXHRcdC8vIElmIHRoZSBzZXJ2aWNlIGRvZXNuJ3QgZXhpc3RcclxuXHRcdHNlcnZpY2UgPSBzZXJ2aWNlIHx8IHRoaXMuc2V0dGluZ3MuZGVmYXVsdF9zZXJ2aWNlO1xyXG5cclxuXHRcdGlmICghc2VydmljZSB8fCAhKHNlcnZpY2UgaW4gdGhpcy5zZXJ2aWNlcykpIHtcclxuXHRcdFx0cmV0dXJuIG51bGw7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIHRoaXMudXRpbHMuc3RvcmUoc2VydmljZSkgfHwgbnVsbDtcclxuXHR9LFxyXG5cclxuXHQvLyBFdmVudHM6IHBsYWNlaG9sZGVyIGZvciB0aGUgZXZlbnRzXHJcblx0ZXZlbnRzOiB7fVxyXG59KTtcclxuXHJcbi8vIENvcmUgdXRpbGl0aWVzXHJcbmhlbGxvLnV0aWxzLmV4dGVuZChoZWxsby51dGlscywge1xyXG5cclxuXHQvLyBFcnJvclxyXG5cdGVycm9yOiBmdW5jdGlvbihjb2RlLCBtZXNzYWdlKSB7XHJcblx0XHRyZXR1cm4ge1xyXG5cdFx0XHRlcnJvcjoge1xyXG5cdFx0XHRcdGNvZGU6IGNvZGUsXHJcblx0XHRcdFx0bWVzc2FnZTogbWVzc2FnZVxyXG5cdFx0XHR9XHJcblx0XHR9O1xyXG5cdH0sXHJcblxyXG5cdC8vIEFwcGVuZCB0aGUgcXVlcnlzdHJpbmcgdG8gYSB1cmxcclxuXHQvLyBAcGFyYW0gc3RyaW5nIHVybFxyXG5cdC8vIEBwYXJhbSBvYmplY3QgcGFyYW1ldGVyc1xyXG5cdHFzOiBmdW5jdGlvbih1cmwsIHBhcmFtcywgZm9ybWF0RnVuY3Rpb24pIHtcclxuXHJcblx0XHRpZiAocGFyYW1zKSB7XHJcblxyXG5cdFx0XHQvLyBTZXQgZGVmYXVsdCBmb3JtYXR0aW5nIGZ1bmN0aW9uXHJcblx0XHRcdGZvcm1hdEZ1bmN0aW9uID0gZm9ybWF0RnVuY3Rpb24gfHwgZW5jb2RlVVJJQ29tcG9uZW50O1xyXG5cclxuXHRcdFx0Ly8gT3ZlcnJpZGUgdGhlIGl0ZW1zIGluIHRoZSBVUkwgd2hpY2ggYWxyZWFkeSBleGlzdFxyXG5cdFx0XHRmb3IgKHZhciB4IGluIHBhcmFtcykge1xyXG5cdFx0XHRcdHZhciBzdHIgPSAnKFtcXFxcP1xcXFwmXSknICsgeCArICc9W15cXFxcJl0qJztcclxuXHRcdFx0XHR2YXIgcmVnID0gbmV3IFJlZ0V4cChzdHIpO1xyXG5cdFx0XHRcdGlmICh1cmwubWF0Y2gocmVnKSkge1xyXG5cdFx0XHRcdFx0dXJsID0gdXJsLnJlcGxhY2UocmVnLCAnJDEnICsgeCArICc9JyArIGZvcm1hdEZ1bmN0aW9uKHBhcmFtc1t4XSkpO1xyXG5cdFx0XHRcdFx0ZGVsZXRlIHBhcmFtc1t4XTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHRpZiAoIXRoaXMuaXNFbXB0eShwYXJhbXMpKSB7XHJcblx0XHRcdHJldHVybiB1cmwgKyAodXJsLmluZGV4T2YoJz8nKSA+IC0xID8gJyYnIDogJz8nKSArIHRoaXMucGFyYW0ocGFyYW1zLCBmb3JtYXRGdW5jdGlvbik7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIHVybDtcclxuXHR9LFxyXG5cclxuXHQvLyBQYXJhbVxyXG5cdC8vIEV4cGxvZGUvZW5jb2RlIHRoZSBwYXJhbWV0ZXJzIG9mIGFuIFVSTCBzdHJpbmcvb2JqZWN0XHJcblx0Ly8gQHBhcmFtIHN0cmluZyBzLCBzdHJpbmcgdG8gZGVjb2RlXHJcblx0cGFyYW06IGZ1bmN0aW9uKHMsIGZvcm1hdEZ1bmN0aW9uKSB7XHJcblx0XHR2YXIgYjtcclxuXHRcdHZhciBhID0ge307XHJcblx0XHR2YXIgbTtcclxuXHJcblx0XHRpZiAodHlwZW9mIChzKSA9PT0gJ3N0cmluZycpIHtcclxuXHJcblx0XHRcdGZvcm1hdEZ1bmN0aW9uID0gZm9ybWF0RnVuY3Rpb24gfHwgZGVjb2RlVVJJQ29tcG9uZW50O1xyXG5cclxuXHRcdFx0bSA9IHMucmVwbGFjZSgvXltcXCNcXD9dLywgJycpLm1hdGNoKC8oW149XFwvXFwmXSspPShbXlxcJl0rKS9nKTtcclxuXHRcdFx0aWYgKG0pIHtcclxuXHRcdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IG0ubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0XHRcdGIgPSBtW2ldLm1hdGNoKC8oW149XSspPSguKikvKTtcclxuXHRcdFx0XHRcdGFbYlsxXV0gPSBmb3JtYXRGdW5jdGlvbihiWzJdKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHJldHVybiBhO1xyXG5cdFx0fVxyXG5cdFx0ZWxzZSB7XHJcblxyXG5cdFx0XHRmb3JtYXRGdW5jdGlvbiA9IGZvcm1hdEZ1bmN0aW9uIHx8IGVuY29kZVVSSUNvbXBvbmVudDtcclxuXHJcblx0XHRcdHZhciBvID0gcztcclxuXHJcblx0XHRcdGEgPSBbXTtcclxuXHJcblx0XHRcdGZvciAodmFyIHggaW4gbykge2lmIChvLmhhc093blByb3BlcnR5KHgpKSB7XHJcblx0XHRcdFx0aWYgKG8uaGFzT3duUHJvcGVydHkoeCkpIHtcclxuXHRcdFx0XHRcdGEucHVzaChbeCwgb1t4XSA9PT0gJz8nID8gJz8nIDogZm9ybWF0RnVuY3Rpb24ob1t4XSldLmpvaW4oJz0nKSk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9fVxyXG5cclxuXHRcdFx0cmV0dXJuIGEuam9pbignJicpO1xyXG5cdFx0fVxyXG5cdH0sXHJcblxyXG5cdC8vIExvY2FsIHN0b3JhZ2UgZmFjYWRlXHJcblx0c3RvcmU6IChmdW5jdGlvbigpIHtcclxuXHJcblx0XHR2YXIgYSA9IFsnbG9jYWxTdG9yYWdlJywgJ3Nlc3Npb25TdG9yYWdlJ107XHJcblx0XHR2YXIgaSA9IC0xO1xyXG5cdFx0dmFyIHByZWZpeCA9ICd0ZXN0JztcclxuXHJcblx0XHQvLyBTZXQgTG9jYWxTdG9yYWdlXHJcblx0XHR2YXIgbG9jYWxTdG9yYWdlO1xyXG5cclxuXHRcdHdoaWxlIChhWysraV0pIHtcclxuXHRcdFx0dHJ5IHtcclxuXHRcdFx0XHQvLyBJbiBDaHJvbWUgd2l0aCBjb29raWVzIGJsb2NrZWQsIGNhbGxpbmcgbG9jYWxTdG9yYWdlIHRocm93cyBhbiBlcnJvclxyXG5cdFx0XHRcdGxvY2FsU3RvcmFnZSA9IHdpbmRvd1thW2ldXTtcclxuXHRcdFx0XHRsb2NhbFN0b3JhZ2Uuc2V0SXRlbShwcmVmaXggKyBpLCBpKTtcclxuXHRcdFx0XHRsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbShwcmVmaXggKyBpKTtcclxuXHRcdFx0XHRicmVhaztcclxuXHRcdFx0fVxyXG5cdFx0XHRjYXRjaCAoZSkge1xyXG5cdFx0XHRcdGxvY2FsU3RvcmFnZSA9IG51bGw7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHRpZiAoIWxvY2FsU3RvcmFnZSkge1xyXG5cclxuXHRcdFx0dmFyIGNhY2hlID0gbnVsbDtcclxuXHJcblx0XHRcdGxvY2FsU3RvcmFnZSA9IHtcclxuXHRcdFx0XHRnZXRJdGVtOiBmdW5jdGlvbihwcm9wKSB7XHJcblx0XHRcdFx0XHRwcm9wID0gcHJvcCArICc9JztcclxuXHRcdFx0XHRcdHZhciBtID0gZG9jdW1lbnQuY29va2llLnNwbGl0KCc7Jyk7XHJcblx0XHRcdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IG0ubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0XHRcdFx0dmFyIF9tID0gbVtpXS5yZXBsYWNlKC8oXlxccyt8XFxzKyQpLywgJycpO1xyXG5cdFx0XHRcdFx0XHRpZiAoX20gJiYgX20uaW5kZXhPZihwcm9wKSA9PT0gMCkge1xyXG5cdFx0XHRcdFx0XHRcdHJldHVybiBfbS5zdWJzdHIocHJvcC5sZW5ndGgpO1xyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0cmV0dXJuIGNhY2hlO1xyXG5cdFx0XHRcdH0sXHJcblxyXG5cdFx0XHRcdHNldEl0ZW06IGZ1bmN0aW9uKHByb3AsIHZhbHVlKSB7XHJcblx0XHRcdFx0XHRjYWNoZSA9IHZhbHVlO1xyXG5cdFx0XHRcdFx0ZG9jdW1lbnQuY29va2llID0gcHJvcCArICc9JyArIHZhbHVlO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fTtcclxuXHJcblx0XHRcdC8vIEZpbGwgdGhlIGNhY2hlIHVwXHJcblx0XHRcdGNhY2hlID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2hlbGxvJyk7XHJcblx0XHR9XHJcblxyXG5cdFx0ZnVuY3Rpb24gZ2V0KCkge1xyXG5cdFx0XHR2YXIganNvbiA9IHt9O1xyXG5cdFx0XHR0cnkge1xyXG5cdFx0XHRcdGpzb24gPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdoZWxsbycpKSB8fCB7fTtcclxuXHRcdFx0fVxyXG5cdFx0XHRjYXRjaCAoZSkge31cclxuXHJcblx0XHRcdHJldHVybiBqc29uO1xyXG5cdFx0fVxyXG5cclxuXHRcdGZ1bmN0aW9uIHNldChqc29uKSB7XHJcblx0XHRcdGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdoZWxsbycsIEpTT04uc3RyaW5naWZ5KGpzb24pKTtcclxuXHRcdH1cclxuXHJcblx0XHQvLyBDaGVjayBpZiB0aGUgYnJvd3NlciBzdXBwb3J0IGxvY2FsIHN0b3JhZ2VcclxuXHRcdHJldHVybiBmdW5jdGlvbihuYW1lLCB2YWx1ZSwgZGF5cykge1xyXG5cclxuXHRcdFx0Ly8gTG9jYWwgc3RvcmFnZVxyXG5cdFx0XHR2YXIganNvbiA9IGdldCgpO1xyXG5cclxuXHRcdFx0aWYgKG5hbWUgJiYgdmFsdWUgPT09IHVuZGVmaW5lZCkge1xyXG5cdFx0XHRcdHJldHVybiBqc29uW25hbWVdIHx8IG51bGw7XHJcblx0XHRcdH1cclxuXHRcdFx0ZWxzZSBpZiAobmFtZSAmJiB2YWx1ZSA9PT0gbnVsbCkge1xyXG5cdFx0XHRcdHRyeSB7XHJcblx0XHRcdFx0XHRkZWxldGUganNvbltuYW1lXTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0Y2F0Y2ggKGUpIHtcclxuXHRcdFx0XHRcdGpzb25bbmFtZV0gPSBudWxsO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0XHRlbHNlIGlmIChuYW1lKSB7XHJcblx0XHRcdFx0anNvbltuYW1lXSA9IHZhbHVlO1xyXG5cdFx0XHR9XHJcblx0XHRcdGVsc2Uge1xyXG5cdFx0XHRcdHJldHVybiBqc29uO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRzZXQoanNvbik7XHJcblxyXG5cdFx0XHRyZXR1cm4ganNvbiB8fCBudWxsO1xyXG5cdFx0fTtcclxuXHJcblx0fSkoKSxcclxuXHJcblx0Ly8gQ3JlYXRlIGFuZCBBcHBlbmQgbmV3IERPTSBlbGVtZW50c1xyXG5cdC8vIEBwYXJhbSBub2RlIHN0cmluZ1xyXG5cdC8vIEBwYXJhbSBhdHRyIG9iamVjdCBsaXRlcmFsXHJcblx0Ly8gQHBhcmFtIGRvbS9zdHJpbmdcclxuXHRhcHBlbmQ6IGZ1bmN0aW9uKG5vZGUsIGF0dHIsIHRhcmdldCkge1xyXG5cclxuXHRcdHZhciBuID0gdHlwZW9mIChub2RlKSA9PT0gJ3N0cmluZycgPyBkb2N1bWVudC5jcmVhdGVFbGVtZW50KG5vZGUpIDogbm9kZTtcclxuXHJcblx0XHRpZiAodHlwZW9mIChhdHRyKSA9PT0gJ29iamVjdCcpIHtcclxuXHRcdFx0aWYgKCd0YWdOYW1lJyBpbiBhdHRyKSB7XHJcblx0XHRcdFx0dGFyZ2V0ID0gYXR0cjtcclxuXHRcdFx0fVxyXG5cdFx0XHRlbHNlIHtcclxuXHRcdFx0XHRmb3IgKHZhciB4IGluIGF0dHIpIHtpZiAoYXR0ci5oYXNPd25Qcm9wZXJ0eSh4KSkge1xyXG5cdFx0XHRcdFx0aWYgKHR5cGVvZiAoYXR0clt4XSkgPT09ICdvYmplY3QnKSB7XHJcblx0XHRcdFx0XHRcdGZvciAodmFyIHkgaW4gYXR0clt4XSkge2lmIChhdHRyW3hdLmhhc093blByb3BlcnR5KHkpKSB7XHJcblx0XHRcdFx0XHRcdFx0blt4XVt5XSA9IGF0dHJbeF1beV07XHJcblx0XHRcdFx0XHRcdH19XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRlbHNlIGlmICh4ID09PSAnaHRtbCcpIHtcclxuXHRcdFx0XHRcdFx0bi5pbm5lckhUTUwgPSBhdHRyW3hdO1xyXG5cdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdC8vIElFIGRvZXNuJ3QgbGlrZSB1cyBzZXR0aW5nIG1ldGhvZHMgd2l0aCBzZXRBdHRyaWJ1dGVcclxuXHRcdFx0XHRcdGVsc2UgaWYgKCEvXm9uLy50ZXN0KHgpKSB7XHJcblx0XHRcdFx0XHRcdG4uc2V0QXR0cmlidXRlKHgsIGF0dHJbeF0pO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0ZWxzZSB7XHJcblx0XHRcdFx0XHRcdG5beF0gPSBhdHRyW3hdO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH19XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHRpZiAodGFyZ2V0ID09PSAnYm9keScpIHtcclxuXHRcdFx0KGZ1bmN0aW9uIHNlbGYoKSB7XHJcblx0XHRcdFx0aWYgKGRvY3VtZW50LmJvZHkpIHtcclxuXHRcdFx0XHRcdGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQobik7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdGVsc2Uge1xyXG5cdFx0XHRcdFx0c2V0VGltZW91dChzZWxmLCAxNik7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9KSgpO1xyXG5cdFx0fVxyXG5cdFx0ZWxzZSBpZiAodHlwZW9mICh0YXJnZXQpID09PSAnb2JqZWN0Jykge1xyXG5cdFx0XHR0YXJnZXQuYXBwZW5kQ2hpbGQobik7XHJcblx0XHR9XHJcblx0XHRlbHNlIGlmICh0eXBlb2YgKHRhcmdldCkgPT09ICdzdHJpbmcnKSB7XHJcblx0XHRcdGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKHRhcmdldClbMF0uYXBwZW5kQ2hpbGQobik7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIG47XHJcblx0fSxcclxuXHJcblx0Ly8gQW4gZWFzeSB3YXkgdG8gY3JlYXRlIGEgaGlkZGVuIGlmcmFtZVxyXG5cdC8vIEBwYXJhbSBzdHJpbmcgc3JjXHJcblx0aWZyYW1lOiBmdW5jdGlvbihzcmMpIHtcclxuXHRcdHRoaXMuYXBwZW5kKCdpZnJhbWUnLCB7c3JjOiBzcmMsIHN0eWxlOiB7cG9zaXRpb246J2Fic29sdXRlJywgbGVmdDogJy0xMDAwcHgnLCBib3R0b206IDAsIGhlaWdodDogJzFweCcsIHdpZHRoOiAnMXB4J319LCAnYm9keScpO1xyXG5cdH0sXHJcblxyXG5cdC8vIFJlY3Vyc2l2ZSBtZXJnZSB0d28gb2JqZWN0cyBpbnRvIG9uZSwgc2Vjb25kIHBhcmFtZXRlciBvdmVyaWRlcyB0aGUgZmlyc3RcclxuXHQvLyBAcGFyYW0gYSBhcnJheVxyXG5cdG1lcmdlOiBmdW5jdGlvbigvKiBBcmdzOiBhLCBiLCBjLCAuLiBuICovKSB7XHJcblx0XHR2YXIgYXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cyk7XHJcblx0XHRhcmdzLnVuc2hpZnQoe30pO1xyXG5cdFx0cmV0dXJuIHRoaXMuZXh0ZW5kLmFwcGx5KG51bGwsIGFyZ3MpO1xyXG5cdH0sXHJcblxyXG5cdC8vIE1ha2VzIGl0IGVhc2llciB0byBhc3NpZ24gcGFyYW1ldGVycywgd2hlcmUgc29tZSBhcmUgb3B0aW9uYWxcclxuXHQvLyBAcGFyYW0gbyBvYmplY3RcclxuXHQvLyBAcGFyYW0gYSBhcmd1bWVudHNcclxuXHRhcmdzOiBmdW5jdGlvbihvLCBhcmdzKSB7XHJcblxyXG5cdFx0dmFyIHAgPSB7fTtcclxuXHRcdHZhciBpID0gMDtcclxuXHRcdHZhciB0ID0gbnVsbDtcclxuXHRcdHZhciB4ID0gbnVsbDtcclxuXHJcblx0XHQvLyAneCcgaXMgdGhlIGZpcnN0IGtleSBpbiB0aGUgbGlzdCBvZiBvYmplY3QgcGFyYW1ldGVyc1xyXG5cdFx0Zm9yICh4IGluIG8pIHtpZiAoby5oYXNPd25Qcm9wZXJ0eSh4KSkge1xyXG5cdFx0XHRicmVhaztcclxuXHRcdH19XHJcblxyXG5cdFx0Ly8gUGFzc2luZyBpbiBoYXNoIG9iamVjdCBvZiBhcmd1bWVudHM/XHJcblx0XHQvLyBXaGVyZSB0aGUgZmlyc3QgYXJndW1lbnQgY2FuJ3QgYmUgYW4gb2JqZWN0XHJcblx0XHRpZiAoKGFyZ3MubGVuZ3RoID09PSAxKSAmJiAodHlwZW9mIChhcmdzWzBdKSA9PT0gJ29iamVjdCcpICYmIG9beF0gIT0gJ28hJykge1xyXG5cclxuXHRcdFx0Ly8gQ291bGQgdGhpcyBvYmplY3Qgc3RpbGwgYmVsb25nIHRvIGEgcHJvcGVydHk/XHJcblx0XHRcdC8vIENoZWNrIHRoZSBvYmplY3Qga2V5cyBpZiB0aGV5IG1hdGNoIGFueSBvZiB0aGUgcHJvcGVydHkga2V5c1xyXG5cdFx0XHRmb3IgKHggaW4gYXJnc1swXSkge2lmIChvLmhhc093blByb3BlcnR5KHgpKSB7XHJcblx0XHRcdFx0Ly8gRG9lcyB0aGlzIGtleSBleGlzdCBpbiB0aGUgcHJvcGVydHkgbGlzdD9cclxuXHRcdFx0XHRpZiAoeCBpbiBvKSB7XHJcblx0XHRcdFx0XHQvLyBZZXMgdGhpcyBrZXkgZG9lcyBleGlzdCBzbyBpdHMgbW9zdCBsaWtlbHkgdGhpcyBmdW5jdGlvbiBoYXMgYmVlbiBpbnZva2VkIHdpdGggYW4gb2JqZWN0IHBhcmFtZXRlclxyXG5cdFx0XHRcdFx0Ly8gUmV0dXJuIGZpcnN0IGFyZ3VtZW50IGFzIHRoZSBoYXNoIG9mIGFsbCBhcmd1bWVudHNcclxuXHRcdFx0XHRcdHJldHVybiBhcmdzWzBdO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fX1cclxuXHRcdH1cclxuXHJcblx0XHQvLyBFbHNlIGxvb3AgdGhyb3VnaCBhbmQgYWNjb3VudCBmb3IgdGhlIG1pc3Npbmcgb25lcy5cclxuXHRcdGZvciAoeCBpbiBvKSB7aWYgKG8uaGFzT3duUHJvcGVydHkoeCkpIHtcclxuXHJcblx0XHRcdHQgPSB0eXBlb2YgKGFyZ3NbaV0pO1xyXG5cclxuXHRcdFx0aWYgKCh0eXBlb2YgKG9beF0pID09PSAnZnVuY3Rpb24nICYmIG9beF0udGVzdChhcmdzW2ldKSkgfHwgKHR5cGVvZiAob1t4XSkgPT09ICdzdHJpbmcnICYmIChcclxuXHRcdFx0KG9beF0uaW5kZXhPZigncycpID4gLTEgJiYgdCA9PT0gJ3N0cmluZycpIHx8XHJcblx0XHRcdChvW3hdLmluZGV4T2YoJ28nKSA+IC0xICYmIHQgPT09ICdvYmplY3QnKSB8fFxyXG5cdFx0XHQob1t4XS5pbmRleE9mKCdpJykgPiAtMSAmJiB0ID09PSAnbnVtYmVyJykgfHxcclxuXHRcdFx0KG9beF0uaW5kZXhPZignYScpID4gLTEgJiYgdCA9PT0gJ29iamVjdCcpIHx8XHJcblx0XHRcdChvW3hdLmluZGV4T2YoJ2YnKSA+IC0xICYmIHQgPT09ICdmdW5jdGlvbicpXHJcblx0XHRcdCkpXHJcblx0XHRcdCkge1xyXG5cdFx0XHRcdHBbeF0gPSBhcmdzW2krK107XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGVsc2UgaWYgKHR5cGVvZiAob1t4XSkgPT09ICdzdHJpbmcnICYmIG9beF0uaW5kZXhPZignIScpID4gLTEpIHtcclxuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHRcdH1cclxuXHRcdH19XHJcblxyXG5cdFx0cmV0dXJuIHA7XHJcblx0fSxcclxuXHJcblx0Ly8gUmV0dXJucyBhIFVSTCBpbnN0YW5jZVxyXG5cdHVybDogZnVuY3Rpb24ocGF0aCkge1xyXG5cclxuXHRcdC8vIElmIHRoZSBwYXRoIGlzIGVtcHR5XHJcblx0XHRpZiAoIXBhdGgpIHtcclxuXHRcdFx0cmV0dXJuIHdpbmRvdy5sb2NhdGlvbjtcclxuXHRcdH1cclxuXHJcblx0XHQvLyBDaHJvbWUgYW5kIEZpcmVGb3ggc3VwcG9ydCBuZXcgVVJMKCkgdG8gZXh0cmFjdCBVUkwgb2JqZWN0c1xyXG5cdFx0ZWxzZSBpZiAod2luZG93LlVSTCAmJiBVUkwgaW5zdGFuY2VvZiBGdW5jdGlvbiAmJiBVUkwubGVuZ3RoICE9PSAwKSB7XHJcblx0XHRcdHJldHVybiBuZXcgVVJMKHBhdGgsIHdpbmRvdy5sb2NhdGlvbik7XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gVWdseSBzaGltLCBpdCB3b3JrcyFcclxuXHRcdGVsc2Uge1xyXG5cdFx0XHR2YXIgYSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcclxuXHRcdFx0YS5ocmVmID0gcGF0aDtcclxuXHRcdFx0cmV0dXJuIGEuY2xvbmVOb2RlKGZhbHNlKTtcclxuXHRcdH1cclxuXHR9LFxyXG5cclxuXHRkaWZmOiBmdW5jdGlvbihhLCBiKSB7XHJcblx0XHRyZXR1cm4gYi5maWx0ZXIoZnVuY3Rpb24oaXRlbSkge1xyXG5cdFx0XHRyZXR1cm4gYS5pbmRleE9mKGl0ZW0pID09PSAtMTtcclxuXHRcdH0pO1xyXG5cdH0sXHJcblxyXG5cdC8vIEdldCB0aGUgZGlmZmVyZW50IGhhc2ggb2YgcHJvcGVydGllcyB1bmlxdWUgdG8gYGFgLCBhbmQgbm90IGluIGBiYFxyXG5cdGRpZmZLZXk6IGZ1bmN0aW9uKGEsIGIpIHtcclxuXHRcdGlmIChhIHx8ICFiKSB7XHJcblx0XHRcdHZhciByID0ge307XHJcblx0XHRcdGZvciAodmFyIHggaW4gYSkge1xyXG5cdFx0XHRcdC8vIERvZXMgdGhlIHByb3BlcnR5IG5vdCBleGlzdD9cclxuXHRcdFx0XHRpZiAoISh4IGluIGIpKSB7XHJcblx0XHRcdFx0XHRyW3hdID0gYVt4XTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHJldHVybiByO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBhO1xyXG5cdH0sXHJcblxyXG5cdC8vIFVuaXF1ZVxyXG5cdC8vIFJlbW92ZSBkdXBsaWNhdGUgYW5kIG51bGwgdmFsdWVzIGZyb20gYW4gYXJyYXlcclxuXHQvLyBAcGFyYW0gYSBhcnJheVxyXG5cdHVuaXF1ZTogZnVuY3Rpb24oYSkge1xyXG5cdFx0aWYgKCFBcnJheS5pc0FycmF5KGEpKSB7IHJldHVybiBbXTsgfVxyXG5cclxuXHRcdHJldHVybiBhLmZpbHRlcihmdW5jdGlvbihpdGVtLCBpbmRleCkge1xyXG5cdFx0XHQvLyBJcyB0aGlzIHRoZSBmaXJzdCBsb2NhdGlvbiBvZiBpdGVtXHJcblx0XHRcdHJldHVybiBhLmluZGV4T2YoaXRlbSkgPT09IGluZGV4O1xyXG5cdFx0fSk7XHJcblx0fSxcclxuXHJcblx0aXNFbXB0eTogZnVuY3Rpb24ob2JqKSB7XHJcblxyXG5cdFx0Ly8gU2NhbGFyXHJcblx0XHRpZiAoIW9iailcclxuXHRcdFx0cmV0dXJuIHRydWU7XHJcblxyXG5cdFx0Ly8gQXJyYXlcclxuXHRcdGlmIChBcnJheS5pc0FycmF5KG9iaikpIHtcclxuXHRcdFx0cmV0dXJuICFvYmoubGVuZ3RoO1xyXG5cdFx0fVxyXG5cdFx0ZWxzZSBpZiAodHlwZW9mIChvYmopID09PSAnb2JqZWN0Jykge1xyXG5cdFx0XHQvLyBPYmplY3RcclxuXHRcdFx0Zm9yICh2YXIga2V5IGluIG9iaikge1xyXG5cdFx0XHRcdGlmIChvYmouaGFzT3duUHJvcGVydHkoa2V5KSkge1xyXG5cdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiB0cnVlO1xyXG5cdH0sXHJcblxyXG5cdC8vanNjczpkaXNhYmxlXHJcblxyXG5cdC8qIVxyXG5cdCAqKiAgVGhlbmFibGUgLS0gRW1iZWRkYWJsZSBNaW5pbXVtIFN0cmljdGx5LUNvbXBsaWFudCBQcm9taXNlcy9BKyAxLjEuMSBUaGVuYWJsZVxyXG5cdCAqKiAgQ29weXJpZ2h0IChjKSAyMDEzLTIwMTQgUmFsZiBTLiBFbmdlbHNjaGFsbCA8aHR0cDovL2VuZ2Vsc2NoYWxsLmNvbT5cclxuXHQgKiogIExpY2Vuc2VkIHVuZGVyIFRoZSBNSVQgTGljZW5zZSA8aHR0cDovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL01JVD5cclxuXHQgKiogIFNvdXJjZS1Db2RlIGRpc3RyaWJ1dGVkIG9uIDxodHRwOi8vZ2l0aHViLmNvbS9yc2UvdGhlbmFibGU+XHJcblx0ICovXHJcblx0UHJvbWlzZTogKGZ1bmN0aW9uKCl7XHJcblx0XHQvKiAgcHJvbWlzZSBzdGF0ZXMgW1Byb21pc2VzL0ErIDIuMV0gICovXHJcblx0XHR2YXIgU1RBVEVfUEVORElORyAgID0gMDsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8qICBbUHJvbWlzZXMvQSsgMi4xLjFdICAqL1xyXG5cdFx0dmFyIFNUQVRFX0ZVTEZJTExFRCA9IDE7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvKiAgW1Byb21pc2VzL0ErIDIuMS4yXSAgKi9cclxuXHRcdHZhciBTVEFURV9SRUpFQ1RFRCAgPSAyOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLyogIFtQcm9taXNlcy9BKyAyLjEuM10gICovXHJcblxyXG5cdFx0LyogIHByb21pc2Ugb2JqZWN0IGNvbnN0cnVjdG9yICAqL1xyXG5cdFx0dmFyIGFwaSA9IGZ1bmN0aW9uIChleGVjdXRvcikge1xyXG5cdFx0XHQvKiAgb3B0aW9uYWxseSBzdXBwb3J0IG5vbi1jb25zdHJ1Y3Rvci9wbGFpbi1mdW5jdGlvbiBjYWxsICAqL1xyXG5cdFx0XHRpZiAoISh0aGlzIGluc3RhbmNlb2YgYXBpKSlcclxuXHRcdFx0XHRyZXR1cm4gbmV3IGFwaShleGVjdXRvcik7XHJcblxyXG5cdFx0XHQvKiAgaW5pdGlhbGl6ZSBvYmplY3QgICovXHJcblx0XHRcdHRoaXMuaWQgICAgICAgICAgID0gXCJUaGVuYWJsZS8xLjAuNlwiO1xyXG5cdFx0XHR0aGlzLnN0YXRlICAgICAgICA9IFNUQVRFX1BFTkRJTkc7IC8qICBpbml0aWFsIHN0YXRlICAqL1xyXG5cdFx0XHR0aGlzLmZ1bGZpbGxWYWx1ZSA9IHVuZGVmaW5lZDsgICAgIC8qICBpbml0aWFsIHZhbHVlICAqLyAgICAgLyogIFtQcm9taXNlcy9BKyAxLjMsIDIuMS4yLjJdICAqL1xyXG5cdFx0XHR0aGlzLnJlamVjdFJlYXNvbiA9IHVuZGVmaW5lZDsgICAgIC8qICBpbml0aWFsIHJlYXNvbiAqLyAgICAgLyogIFtQcm9taXNlcy9BKyAxLjUsIDIuMS4zLjJdICAqL1xyXG5cdFx0XHR0aGlzLm9uRnVsZmlsbGVkICA9IFtdOyAgICAgICAgICAgIC8qICBpbml0aWFsIGhhbmRsZXJzICAqL1xyXG5cdFx0XHR0aGlzLm9uUmVqZWN0ZWQgICA9IFtdOyAgICAgICAgICAgIC8qICBpbml0aWFsIGhhbmRsZXJzICAqL1xyXG5cclxuXHRcdFx0LyogIHByb3ZpZGUgb3B0aW9uYWwgaW5mb3JtYXRpb24taGlkaW5nIHByb3h5ICAqL1xyXG5cdFx0XHR0aGlzLnByb3h5ID0ge1xyXG5cdFx0XHRcdHRoZW46IHRoaXMudGhlbi5iaW5kKHRoaXMpXHJcblx0XHRcdH07XHJcblxyXG5cdFx0XHQvKiAgc3VwcG9ydCBvcHRpb25hbCBleGVjdXRvciBmdW5jdGlvbiAgKi9cclxuXHRcdFx0aWYgKHR5cGVvZiBleGVjdXRvciA9PT0gXCJmdW5jdGlvblwiKVxyXG5cdFx0XHRcdGV4ZWN1dG9yLmNhbGwodGhpcywgdGhpcy5mdWxmaWxsLmJpbmQodGhpcyksIHRoaXMucmVqZWN0LmJpbmQodGhpcykpO1xyXG5cdFx0fTtcclxuXHJcblx0XHQvKiAgcHJvbWlzZSBBUEkgbWV0aG9kcyAgKi9cclxuXHRcdGFwaS5wcm90b3R5cGUgPSB7XHJcblx0XHRcdC8qICBwcm9taXNlIHJlc29sdmluZyBtZXRob2RzICAqL1xyXG5cdFx0XHRmdWxmaWxsOiBmdW5jdGlvbiAodmFsdWUpIHsgcmV0dXJuIGRlbGl2ZXIodGhpcywgU1RBVEVfRlVMRklMTEVELCBcImZ1bGZpbGxWYWx1ZVwiLCB2YWx1ZSk7IH0sXHJcblx0XHRcdHJlamVjdDogIGZ1bmN0aW9uICh2YWx1ZSkgeyByZXR1cm4gZGVsaXZlcih0aGlzLCBTVEFURV9SRUpFQ1RFRCwgIFwicmVqZWN0UmVhc29uXCIsIHZhbHVlKTsgfSxcclxuXHJcblx0XHRcdC8qICBcIlRoZSB0aGVuIE1ldGhvZFwiIFtQcm9taXNlcy9BKyAxLjEsIDEuMiwgMi4yXSAgKi9cclxuXHRcdFx0dGhlbjogZnVuY3Rpb24gKG9uRnVsZmlsbGVkLCBvblJlamVjdGVkKSB7XHJcblx0XHRcdFx0dmFyIGN1cnIgPSB0aGlzO1xyXG5cdFx0XHRcdHZhciBuZXh0ID0gbmV3IGFwaSgpOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8qICBbUHJvbWlzZXMvQSsgMi4yLjddICAqL1xyXG5cdFx0XHRcdGN1cnIub25GdWxmaWxsZWQucHVzaChcclxuXHRcdFx0XHRcdHJlc29sdmVyKG9uRnVsZmlsbGVkLCBuZXh0LCBcImZ1bGZpbGxcIikpOyAgICAgICAgICAgICAvKiAgW1Byb21pc2VzL0ErIDIuMi4yLzIuMi42XSAgKi9cclxuXHRcdFx0XHRjdXJyLm9uUmVqZWN0ZWQucHVzaChcclxuXHRcdFx0XHRcdHJlc29sdmVyKG9uUmVqZWN0ZWQsICBuZXh0LCBcInJlamVjdFwiICkpOyAgICAgICAgICAgICAvKiAgW1Byb21pc2VzL0ErIDIuMi4zLzIuMi42XSAgKi9cclxuXHRcdFx0XHRleGVjdXRlKGN1cnIpO1xyXG5cdFx0XHRcdHJldHVybiBuZXh0LnByb3h5OyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8qICBbUHJvbWlzZXMvQSsgMi4yLjcsIDMuM10gICovXHJcblx0XHRcdH1cclxuXHRcdH07XHJcblxyXG5cdFx0LyogIGRlbGl2ZXIgYW4gYWN0aW9uICAqL1xyXG5cdFx0dmFyIGRlbGl2ZXIgPSBmdW5jdGlvbiAoY3Vyciwgc3RhdGUsIG5hbWUsIHZhbHVlKSB7XHJcblx0XHRcdGlmIChjdXJyLnN0YXRlID09PSBTVEFURV9QRU5ESU5HKSB7XHJcblx0XHRcdFx0Y3Vyci5zdGF0ZSA9IHN0YXRlOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLyogIFtQcm9taXNlcy9BKyAyLjEuMi4xLCAyLjEuMy4xXSAgKi9cclxuXHRcdFx0XHRjdXJyW25hbWVdID0gdmFsdWU7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvKiAgW1Byb21pc2VzL0ErIDIuMS4yLjIsIDIuMS4zLjJdICAqL1xyXG5cdFx0XHRcdGV4ZWN1dGUoY3Vycik7XHJcblx0XHRcdH1cclxuXHRcdFx0cmV0dXJuIGN1cnI7XHJcblx0XHR9O1xyXG5cclxuXHRcdC8qICBleGVjdXRlIGFsbCBoYW5kbGVycyAgKi9cclxuXHRcdHZhciBleGVjdXRlID0gZnVuY3Rpb24gKGN1cnIpIHtcclxuXHRcdFx0aWYgKGN1cnIuc3RhdGUgPT09IFNUQVRFX0ZVTEZJTExFRClcclxuXHRcdFx0XHRleGVjdXRlX2hhbmRsZXJzKGN1cnIsIFwib25GdWxmaWxsZWRcIiwgY3Vyci5mdWxmaWxsVmFsdWUpO1xyXG5cdFx0XHRlbHNlIGlmIChjdXJyLnN0YXRlID09PSBTVEFURV9SRUpFQ1RFRClcclxuXHRcdFx0XHRleGVjdXRlX2hhbmRsZXJzKGN1cnIsIFwib25SZWplY3RlZFwiLCAgY3Vyci5yZWplY3RSZWFzb24pO1xyXG5cdFx0fTtcclxuXHJcblx0XHQvKiAgZXhlY3V0ZSBwYXJ0aWN1bGFyIHNldCBvZiBoYW5kbGVycyAgKi9cclxuXHRcdHZhciBleGVjdXRlX2hhbmRsZXJzID0gZnVuY3Rpb24gKGN1cnIsIG5hbWUsIHZhbHVlKSB7XHJcblx0XHRcdC8qIGdsb2JhbCBwcm9jZXNzOiB0cnVlICovXHJcblx0XHRcdC8qIGdsb2JhbCBzZXRJbW1lZGlhdGU6IHRydWUgKi9cclxuXHRcdFx0LyogZ2xvYmFsIHNldFRpbWVvdXQ6IHRydWUgKi9cclxuXHJcblx0XHRcdC8qICBzaG9ydC1jaXJjdWl0IHByb2Nlc3NpbmcgICovXHJcblx0XHRcdGlmIChjdXJyW25hbWVdLmxlbmd0aCA9PT0gMClcclxuXHRcdFx0XHRyZXR1cm47XHJcblxyXG5cdFx0XHQvKiAgaXRlcmF0ZSBvdmVyIGFsbCBoYW5kbGVycywgZXhhY3RseSBvbmNlICAqL1xyXG5cdFx0XHR2YXIgaGFuZGxlcnMgPSBjdXJyW25hbWVdO1xyXG5cdFx0XHRjdXJyW25hbWVdID0gW107ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLyogIFtQcm9taXNlcy9BKyAyLjIuMi4zLCAyLjIuMy4zXSAgKi9cclxuXHRcdFx0dmFyIGZ1bmMgPSBmdW5jdGlvbiAoKSB7XHJcblx0XHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBoYW5kbGVycy5sZW5ndGg7IGkrKylcclxuXHRcdFx0XHRcdGhhbmRsZXJzW2ldKHZhbHVlKTsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLyogIFtQcm9taXNlcy9BKyAyLjIuNV0gICovXHJcblx0XHRcdH07XHJcblxyXG5cdFx0XHQvKiAgZXhlY3V0ZSBwcm9jZWR1cmUgYXN5bmNocm9ub3VzbHkgICovICAgICAgICAgICAgICAgICAgICAgLyogIFtQcm9taXNlcy9BKyAyLjIuNCwgMy4xXSAgKi9cclxuXHRcdFx0aWYgKHR5cGVvZiBwcm9jZXNzID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBwcm9jZXNzLm5leHRUaWNrID09PSBcImZ1bmN0aW9uXCIpXHJcblx0XHRcdFx0cHJvY2Vzcy5uZXh0VGljayhmdW5jKTtcclxuXHRcdFx0ZWxzZSBpZiAodHlwZW9mIHNldEltbWVkaWF0ZSA9PT0gXCJmdW5jdGlvblwiKVxyXG5cdFx0XHRcdHNldEltbWVkaWF0ZShmdW5jKTtcclxuXHRcdFx0ZWxzZVxyXG5cdFx0XHRcdHNldFRpbWVvdXQoZnVuYywgMCk7XHJcblx0XHR9O1xyXG5cclxuXHRcdC8qICBnZW5lcmF0ZSBhIHJlc29sdmVyIGZ1bmN0aW9uICAqL1xyXG5cdFx0dmFyIHJlc29sdmVyID0gZnVuY3Rpb24gKGNiLCBuZXh0LCBtZXRob2QpIHtcclxuXHRcdFx0cmV0dXJuIGZ1bmN0aW9uICh2YWx1ZSkge1xyXG5cdFx0XHRcdGlmICh0eXBlb2YgY2IgIT09IFwiZnVuY3Rpb25cIikgICAgICAgICAgICAgICAgICAgICAgICAgICAgLyogIFtQcm9taXNlcy9BKyAyLjIuMSwgMi4yLjcuMywgMi4yLjcuNF0gICovXHJcblx0XHRcdFx0XHRuZXh0W21ldGhvZF0uY2FsbChuZXh0LCB2YWx1ZSk7ICAgICAgICAgICAgICAgICAgICAgIC8qICBbUHJvbWlzZXMvQSsgMi4yLjcuMywgMi4yLjcuNF0gICovXHJcblx0XHRcdFx0ZWxzZSB7XHJcblx0XHRcdFx0XHR2YXIgcmVzdWx0O1xyXG5cdFx0XHRcdFx0dHJ5IHsgcmVzdWx0ID0gY2IodmFsdWUpOyB9ICAgICAgICAgICAgICAgICAgICAgICAgICAvKiAgW1Byb21pc2VzL0ErIDIuMi4yLjEsIDIuMi4zLjEsIDIuMi41LCAzLjJdICAqL1xyXG5cdFx0XHRcdFx0Y2F0Y2ggKGUpIHtcclxuXHRcdFx0XHRcdFx0bmV4dC5yZWplY3QoZSk7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8qICBbUHJvbWlzZXMvQSsgMi4yLjcuMl0gICovXHJcblx0XHRcdFx0XHRcdHJldHVybjtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdHJlc29sdmUobmV4dCwgcmVzdWx0KTsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLyogIFtQcm9taXNlcy9BKyAyLjIuNy4xXSAgKi9cclxuXHRcdFx0XHR9XHJcblx0XHRcdH07XHJcblx0XHR9O1xyXG5cclxuXHRcdC8qICBcIlByb21pc2UgUmVzb2x1dGlvbiBQcm9jZWR1cmVcIiAgKi8gICAgICAgICAgICAgICAgICAgICAgICAgICAvKiAgW1Byb21pc2VzL0ErIDIuM10gICovXHJcblx0XHR2YXIgcmVzb2x2ZSA9IGZ1bmN0aW9uIChwcm9taXNlLCB4KSB7XHJcblx0XHRcdC8qICBzYW5pdHkgY2hlY2sgYXJndW1lbnRzICAqLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvKiAgW1Byb21pc2VzL0ErIDIuMy4xXSAgKi9cclxuXHRcdFx0aWYgKHByb21pc2UgPT09IHggfHwgcHJvbWlzZS5wcm94eSA9PT0geCkge1xyXG5cdFx0XHRcdHByb21pc2UucmVqZWN0KG5ldyBUeXBlRXJyb3IoXCJjYW5ub3QgcmVzb2x2ZSBwcm9taXNlIHdpdGggaXRzZWxmXCIpKTtcclxuXHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdC8qICBzdXJnaWNhbGx5IGNoZWNrIGZvciBhIFwidGhlblwiIG1ldGhvZFxyXG5cdFx0XHRcdChtYWlubHkgdG8ganVzdCBjYWxsIHRoZSBcImdldHRlclwiIG9mIFwidGhlblwiIG9ubHkgb25jZSkgICovXHJcblx0XHRcdHZhciB0aGVuO1xyXG5cdFx0XHRpZiAoKHR5cGVvZiB4ID09PSBcIm9iamVjdFwiICYmIHggIT09IG51bGwpIHx8IHR5cGVvZiB4ID09PSBcImZ1bmN0aW9uXCIpIHtcclxuXHRcdFx0XHR0cnkgeyB0aGVuID0geC50aGVuOyB9ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvKiAgW1Byb21pc2VzL0ErIDIuMy4zLjEsIDMuNV0gICovXHJcblx0XHRcdFx0Y2F0Y2ggKGUpIHtcclxuXHRcdFx0XHRcdHByb21pc2UucmVqZWN0KGUpOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLyogIFtQcm9taXNlcy9BKyAyLjMuMy4yXSAgKi9cclxuXHRcdFx0XHRcdHJldHVybjtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdC8qICBoYW5kbGUgb3duIFRoZW5hYmxlcyAgICBbUHJvbWlzZXMvQSsgMi4zLjJdXHJcblx0XHRcdFx0YW5kIHNpbWlsYXIgXCJ0aGVuYWJsZXNcIiBbUHJvbWlzZXMvQSsgMi4zLjNdICAqL1xyXG5cdFx0XHRpZiAodHlwZW9mIHRoZW4gPT09IFwiZnVuY3Rpb25cIikge1xyXG5cdFx0XHRcdHZhciByZXNvbHZlZCA9IGZhbHNlO1xyXG5cdFx0XHRcdHRyeSB7XHJcblx0XHRcdFx0XHQvKiAgY2FsbCByZXRyaWV2ZWQgXCJ0aGVuXCIgbWV0aG9kICovICAgICAgICAgICAgICAgICAgLyogIFtQcm9taXNlcy9BKyAyLjMuMy4zXSAgKi9cclxuXHRcdFx0XHRcdHRoZW4uY2FsbCh4LFxyXG5cdFx0XHRcdFx0XHQvKiAgcmVzb2x2ZVByb21pc2UgICovICAgICAgICAgICAgICAgICAgICAgICAgICAgLyogIFtQcm9taXNlcy9BKyAyLjMuMy4zLjFdICAqL1xyXG5cdFx0XHRcdFx0XHRmdW5jdGlvbiAoeSkge1xyXG5cdFx0XHRcdFx0XHRcdGlmIChyZXNvbHZlZCkgcmV0dXJuOyByZXNvbHZlZCA9IHRydWU7ICAgICAgIC8qICBbUHJvbWlzZXMvQSsgMi4zLjMuMy4zXSAgKi9cclxuXHRcdFx0XHRcdFx0XHRpZiAoeSA9PT0geCkgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvKiAgW1Byb21pc2VzL0ErIDMuNl0gICovXHJcblx0XHRcdFx0XHRcdFx0XHRwcm9taXNlLnJlamVjdChuZXcgVHlwZUVycm9yKFwiY2lyY3VsYXIgdGhlbmFibGUgY2hhaW5cIikpO1xyXG5cdFx0XHRcdFx0XHRcdGVsc2VcclxuXHRcdFx0XHRcdFx0XHRcdHJlc29sdmUocHJvbWlzZSwgeSk7XHJcblx0XHRcdFx0XHRcdH0sXHJcblxyXG5cdFx0XHRcdFx0XHQvKiAgcmVqZWN0UHJvbWlzZSAgKi8gICAgICAgICAgICAgICAgICAgICAgICAgICAgLyogIFtQcm9taXNlcy9BKyAyLjMuMy4zLjJdICAqL1xyXG5cdFx0XHRcdFx0XHRmdW5jdGlvbiAocikge1xyXG5cdFx0XHRcdFx0XHRcdGlmIChyZXNvbHZlZCkgcmV0dXJuOyByZXNvbHZlZCA9IHRydWU7ICAgICAgIC8qICBbUHJvbWlzZXMvQSsgMi4zLjMuMy4zXSAgKi9cclxuXHRcdFx0XHRcdFx0XHRwcm9taXNlLnJlamVjdChyKTtcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0KTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0Y2F0Y2ggKGUpIHtcclxuXHRcdFx0XHRcdGlmICghcmVzb2x2ZWQpICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLyogIFtQcm9taXNlcy9BKyAyLjMuMy4zLjNdICAqL1xyXG5cdFx0XHRcdFx0XHRwcm9taXNlLnJlamVjdChlKTsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLyogIFtQcm9taXNlcy9BKyAyLjMuMy4zLjRdICAqL1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdC8qICBoYW5kbGUgb3RoZXIgdmFsdWVzICAqL1xyXG5cdFx0XHRwcm9taXNlLmZ1bGZpbGwoeCk7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLyogIFtQcm9taXNlcy9BKyAyLjMuNCwgMi4zLjMuNF0gICovXHJcblx0XHR9O1xyXG5cclxuXHRcdC8qICBleHBvcnQgQVBJICAqL1xyXG5cdFx0cmV0dXJuIGFwaTtcclxuXHR9KSgpLFxyXG5cclxuXHQvL2pzY3M6ZW5hYmxlXHJcblxyXG5cdC8vIEV2ZW50XHJcblx0Ly8gQSBjb250cnVjdG9yIHN1cGVyY2xhc3MgZm9yIGFkZGluZyBldmVudCBtZW50aG9kcywgb24sIG9mZiwgZW1pdC5cclxuXHRFdmVudDogZnVuY3Rpb24oKSB7XHJcblxyXG5cdFx0dmFyIHNlcGFyYXRvciA9IC9bXFxzXFwsXSsvO1xyXG5cclxuXHRcdC8vIElmIHRoaXMgZG9lc24ndCBzdXBwb3J0IGdldFByb3RvdHlwZSB0aGVuIHdlIGNhbid0IGdldCBwcm90b3R5cGUuZXZlbnRzIG9mIHRoZSBwYXJlbnRcclxuXHRcdC8vIFNvIGxldHMgZ2V0IHRoZSBjdXJyZW50IGluc3RhbmNlIGV2ZW50cywgYW5kIGFkZCB0aG9zZSB0byBhIHBhcmVudCBwcm9wZXJ0eVxyXG5cdFx0dGhpcy5wYXJlbnQgPSB7XHJcblx0XHRcdGV2ZW50czogdGhpcy5ldmVudHMsXHJcblx0XHRcdGZpbmRFdmVudHM6IHRoaXMuZmluZEV2ZW50cyxcclxuXHRcdFx0cGFyZW50OiB0aGlzLnBhcmVudCxcclxuXHRcdFx0dXRpbHM6IHRoaXMudXRpbHNcclxuXHRcdH07XHJcblxyXG5cdFx0dGhpcy5ldmVudHMgPSB7fTtcclxuXHJcblx0XHQvLyBPbiwgc3Vic2NyaWJlIHRvIGV2ZW50c1xyXG5cdFx0Ly8gQHBhcmFtIGV2dCAgIHN0cmluZ1xyXG5cdFx0Ly8gQHBhcmFtIGNhbGxiYWNrICBmdW5jdGlvblxyXG5cdFx0dGhpcy5vbiA9IGZ1bmN0aW9uKGV2dCwgY2FsbGJhY2spIHtcclxuXHJcblx0XHRcdGlmIChjYWxsYmFjayAmJiB0eXBlb2YgKGNhbGxiYWNrKSA9PT0gJ2Z1bmN0aW9uJykge1xyXG5cdFx0XHRcdHZhciBhID0gZXZ0LnNwbGl0KHNlcGFyYXRvcik7XHJcblx0XHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBhLmxlbmd0aDsgaSsrKSB7XHJcblxyXG5cdFx0XHRcdFx0Ly8gSGFzIHRoaXMgZXZlbnQgYWxyZWFkeSBiZWVuIGZpcmVkIG9uIHRoaXMgaW5zdGFuY2U/XHJcblx0XHRcdFx0XHR0aGlzLmV2ZW50c1thW2ldXSA9IFtjYWxsYmFja10uY29uY2F0KHRoaXMuZXZlbnRzW2FbaV1dIHx8IFtdKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHJldHVybiB0aGlzO1xyXG5cdFx0fTtcclxuXHJcblx0XHQvLyBPZmYsIHVuc3Vic2NyaWJlIHRvIGV2ZW50c1xyXG5cdFx0Ly8gQHBhcmFtIGV2dCAgIHN0cmluZ1xyXG5cdFx0Ly8gQHBhcmFtIGNhbGxiYWNrICBmdW5jdGlvblxyXG5cdFx0dGhpcy5vZmYgPSBmdW5jdGlvbihldnQsIGNhbGxiYWNrKSB7XHJcblxyXG5cdFx0XHR0aGlzLmZpbmRFdmVudHMoZXZ0LCBmdW5jdGlvbihuYW1lLCBpbmRleCkge1xyXG5cdFx0XHRcdGlmICghY2FsbGJhY2sgfHwgdGhpcy5ldmVudHNbbmFtZV1baW5kZXhdID09PSBjYWxsYmFjaykge1xyXG5cdFx0XHRcdFx0dGhpcy5ldmVudHNbbmFtZV1baW5kZXhdID0gbnVsbDtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdFx0cmV0dXJuIHRoaXM7XHJcblx0XHR9O1xyXG5cclxuXHRcdC8vIEVtaXRcclxuXHRcdC8vIFRyaWdnZXJzIGFueSBzdWJzY3JpYmVkIGV2ZW50c1xyXG5cdFx0dGhpcy5lbWl0ID0gZnVuY3Rpb24oZXZ0IC8qLCBkYXRhLCAuLi4gKi8pIHtcclxuXHJcblx0XHRcdC8vIEdldCBhcmd1bWVudHMgYXMgYW4gQXJyYXksIGtub2NrIG9mZiB0aGUgZmlyc3Qgb25lXHJcblx0XHRcdHZhciBhcmdzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKTtcclxuXHRcdFx0YXJncy5wdXNoKGV2dCk7XHJcblxyXG5cdFx0XHQvLyBIYW5kbGVyXHJcblx0XHRcdHZhciBoYW5kbGVyID0gZnVuY3Rpb24obmFtZSwgaW5kZXgpIHtcclxuXHJcblx0XHRcdFx0Ly8gUmVwbGFjZSB0aGUgbGFzdCBwcm9wZXJ0eSB3aXRoIHRoZSBldmVudCBuYW1lXHJcblx0XHRcdFx0YXJnc1thcmdzLmxlbmd0aCAtIDFdID0gKG5hbWUgPT09ICcqJyA/IGV2dCA6IG5hbWUpO1xyXG5cclxuXHRcdFx0XHQvLyBUcmlnZ2VyXHJcblx0XHRcdFx0dGhpcy5ldmVudHNbbmFtZV1baW5kZXhdLmFwcGx5KHRoaXMsIGFyZ3MpO1xyXG5cdFx0XHR9O1xyXG5cclxuXHRcdFx0Ly8gRmluZCB0aGUgY2FsbGJhY2tzIHdoaWNoIG1hdGNoIHRoZSBjb25kaXRpb24gYW5kIGNhbGxcclxuXHRcdFx0dmFyIF90aGlzID0gdGhpcztcclxuXHRcdFx0d2hpbGUgKF90aGlzICYmIF90aGlzLmZpbmRFdmVudHMpIHtcclxuXHJcblx0XHRcdFx0Ly8gRmluZCBldmVudHMgd2hpY2ggbWF0Y2hcclxuXHRcdFx0XHRfdGhpcy5maW5kRXZlbnRzKGV2dCArICcsKicsIGhhbmRsZXIpO1xyXG5cdFx0XHRcdF90aGlzID0gX3RoaXMucGFyZW50O1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRyZXR1cm4gdGhpcztcclxuXHRcdH07XHJcblxyXG5cdFx0Ly9cclxuXHRcdC8vIEVhc3kgZnVuY3Rpb25zXHJcblx0XHR0aGlzLmVtaXRBZnRlciA9IGZ1bmN0aW9uKCkge1xyXG5cdFx0XHR2YXIgX3RoaXMgPSB0aGlzO1xyXG5cdFx0XHR2YXIgYXJncyA9IGFyZ3VtZW50cztcclxuXHRcdFx0c2V0VGltZW91dChmdW5jdGlvbigpIHtcclxuXHRcdFx0XHRfdGhpcy5lbWl0LmFwcGx5KF90aGlzLCBhcmdzKTtcclxuXHRcdFx0fSwgMCk7XHJcblxyXG5cdFx0XHRyZXR1cm4gdGhpcztcclxuXHRcdH07XHJcblxyXG5cdFx0dGhpcy5maW5kRXZlbnRzID0gZnVuY3Rpb24oZXZ0LCBjYWxsYmFjaykge1xyXG5cclxuXHRcdFx0dmFyIGEgPSBldnQuc3BsaXQoc2VwYXJhdG9yKTtcclxuXHJcblx0XHRcdGZvciAodmFyIG5hbWUgaW4gdGhpcy5ldmVudHMpIHtpZiAodGhpcy5ldmVudHMuaGFzT3duUHJvcGVydHkobmFtZSkpIHtcclxuXHJcblx0XHRcdFx0aWYgKGEuaW5kZXhPZihuYW1lKSA+IC0xKSB7XHJcblxyXG5cdFx0XHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmV2ZW50c1tuYW1lXS5sZW5ndGg7IGkrKykge1xyXG5cclxuXHRcdFx0XHRcdFx0Ly8gRG9lcyB0aGUgZXZlbnQgaGFuZGxlciBleGlzdD9cclxuXHRcdFx0XHRcdFx0aWYgKHRoaXMuZXZlbnRzW25hbWVdW2ldKSB7XHJcblx0XHRcdFx0XHRcdFx0Ly8gRW1pdCBvbiB0aGUgbG9jYWwgaW5zdGFuY2Ugb2YgdGhpc1xyXG5cdFx0XHRcdFx0XHRcdGNhbGxiYWNrLmNhbGwodGhpcywgbmFtZSwgaSk7XHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XHJcblx0XHRcdH19XHJcblx0XHR9O1xyXG5cclxuXHRcdHJldHVybiB0aGlzO1xyXG5cdH0sXHJcblxyXG5cdC8vIEdsb2JhbCBFdmVudHNcclxuXHQvLyBBdHRhY2ggdGhlIGNhbGxiYWNrIHRvIHRoZSB3aW5kb3cgb2JqZWN0XHJcblx0Ly8gUmV0dXJuIGl0cyB1bmlxdWUgcmVmZXJlbmNlXHJcblx0Z2xvYmFsRXZlbnQ6IGZ1bmN0aW9uKGNhbGxiYWNrLCBndWlkKSB7XHJcblx0XHQvLyBJZiB0aGUgZ3VpZCBoYXMgbm90IGJlZW4gc3VwcGxpZWQgdGhlbiBjcmVhdGUgYSBuZXcgb25lLlxyXG5cdFx0Z3VpZCA9IGd1aWQgfHwgJ19oZWxsb2pzXycgKyBwYXJzZUludChNYXRoLnJhbmRvbSgpICogMWUxMiwgMTApLnRvU3RyaW5nKDM2KTtcclxuXHJcblx0XHQvLyBEZWZpbmUgdGhlIGNhbGxiYWNrIGZ1bmN0aW9uXHJcblx0XHR3aW5kb3dbZ3VpZF0gPSBmdW5jdGlvbigpIHtcclxuXHRcdFx0Ly8gVHJpZ2dlciB0aGUgY2FsbGJhY2tcclxuXHRcdFx0dHJ5IHtcclxuXHRcdFx0XHRpZiAoY2FsbGJhY2suYXBwbHkodGhpcywgYXJndW1lbnRzKSkge1xyXG5cdFx0XHRcdFx0ZGVsZXRlIHdpbmRvd1tndWlkXTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdFx0Y2F0Y2ggKGUpIHtcclxuXHRcdFx0XHRjb25zb2xlLmVycm9yKGUpO1xyXG5cdFx0XHR9XHJcblx0XHR9O1xyXG5cclxuXHRcdHJldHVybiBndWlkO1xyXG5cdH0sXHJcblxyXG5cdC8vIFRyaWdnZXIgYSBjbGllbnRzaWRlIHBvcHVwXHJcblx0Ly8gVGhpcyBoYXMgYmVlbiBhdWdtZW50ZWQgdG8gc3VwcG9ydCBQaG9uZUdhcFxyXG5cdHBvcHVwOiBmdW5jdGlvbih1cmwsIHJlZGlyZWN0VXJpLCBvcHRpb25zKSB7XHJcblxyXG5cdFx0dmFyIGRvY3VtZW50RWxlbWVudCA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudDtcclxuXHJcblx0XHQvLyBNdWx0aSBTY3JlZW4gUG9wdXAgUG9zaXRpb25pbmcgKGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9hLzE2ODYxMDUwKVxyXG5cdFx0Ly8gQ3JlZGl0OiBodHRwOi8vd3d3Lnh0Zi5kay8yMDExLzA4L2NlbnRlci1uZXctcG9wdXAtd2luZG93LWV2ZW4tb24uaHRtbFxyXG5cdFx0Ly8gRml4ZXMgZHVhbC1zY3JlZW4gcG9zaXRpb24gICAgICAgICAgICAgICAgICAgICAgICAgTW9zdCBicm93c2VycyAgICAgIEZpcmVmb3hcclxuXHJcblx0XHRpZiAob3B0aW9ucy5oZWlnaHQpIHtcclxuXHRcdFx0dmFyIGR1YWxTY3JlZW5Ub3AgPSB3aW5kb3cuc2NyZWVuVG9wICE9PSB1bmRlZmluZWQgPyB3aW5kb3cuc2NyZWVuVG9wIDogc2NyZWVuLnRvcDtcclxuXHRcdFx0dmFyIGhlaWdodCA9IHNjcmVlbi5oZWlnaHQgfHwgd2luZG93LmlubmVySGVpZ2h0IHx8IGRvY3VtZW50RWxlbWVudC5jbGllbnRIZWlnaHQ7XHJcblx0XHRcdG9wdGlvbnMudG9wID0gcGFyc2VJbnQoKGhlaWdodCAtIG9wdGlvbnMuaGVpZ2h0KSAvIDIsIDEwKSArIGR1YWxTY3JlZW5Ub3A7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKG9wdGlvbnMud2lkdGgpIHtcclxuXHRcdFx0dmFyIGR1YWxTY3JlZW5MZWZ0ID0gd2luZG93LnNjcmVlbkxlZnQgIT09IHVuZGVmaW5lZCA/IHdpbmRvdy5zY3JlZW5MZWZ0IDogc2NyZWVuLmxlZnQ7XHJcblx0XHRcdHZhciB3aWR0aCA9IHNjcmVlbi53aWR0aCB8fCB3aW5kb3cuaW5uZXJXaWR0aCB8fCBkb2N1bWVudEVsZW1lbnQuY2xpZW50V2lkdGg7XHJcblx0XHRcdG9wdGlvbnMubGVmdCA9IHBhcnNlSW50KCh3aWR0aCAtIG9wdGlvbnMud2lkdGgpIC8gMiwgMTApICsgZHVhbFNjcmVlbkxlZnQ7XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gQ29udmVydCBvcHRpb25zIGludG8gYW4gYXJyYXlcclxuXHRcdHZhciBvcHRpb25zQXJyYXkgPSBbXTtcclxuXHRcdE9iamVjdC5rZXlzKG9wdGlvbnMpLmZvckVhY2goZnVuY3Rpb24obmFtZSkge1xyXG5cdFx0XHR2YXIgdmFsdWUgPSBvcHRpb25zW25hbWVdO1xyXG5cdFx0XHRvcHRpb25zQXJyYXkucHVzaChuYW1lICsgKHZhbHVlICE9PSBudWxsID8gJz0nICsgdmFsdWUgOiAnJykpO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0Ly8gQ2FsbCB0aGUgb3BlbigpIGZ1bmN0aW9uIHdpdGggdGhlIGluaXRpYWwgcGF0aFxyXG5cdFx0Ly9cclxuXHRcdC8vIE9BdXRoIHJlZGlyZWN0LCBmaXhlcyBVUkkgZnJhZ21lbnRzIGZyb20gYmVpbmcgbG9zdCBpbiBTYWZhcmlcclxuXHRcdC8vIChVUkkgRnJhZ21lbnRzIHdpdGhpbiAzMDIgTG9jYXRpb24gVVJJIGFyZSBsb3N0IG92ZXIgSFRUUFMpXHJcblx0XHQvLyBMb2FkaW5nIHRoZSByZWRpcmVjdC5odG1sIGJlZm9yZSB0cmlnZ2VyaW5nIHRoZSBPQXV0aCBGbG93IHNlZW1zIHRvIGZpeCBpdC5cclxuXHRcdC8vXHJcblx0XHQvLyBGaXJlZm94ICBkZWNvZGVzIFVSTCBmcmFnbWVudHMgd2hlbiBjYWxsaW5nIGxvY2F0aW9uLmhhc2guXHJcblx0XHQvLyAgLSBUaGlzIGlzIGJhZCBpZiB0aGUgdmFsdWUgY29udGFpbnMgYnJlYWsgcG9pbnRzIHdoaWNoIGFyZSBlc2NhcGVkXHJcblx0XHQvLyAgLSBIZW5jZSB0aGUgdXJsIG11c3QgYmUgZW5jb2RlZCB0d2ljZSBhcyBpdCBjb250YWlucyBicmVha3BvaW50cy5cclxuXHRcdGlmIChuYXZpZ2F0b3IudXNlckFnZW50LmluZGV4T2YoJ1NhZmFyaScpICE9PSAtMSAmJiBuYXZpZ2F0b3IudXNlckFnZW50LmluZGV4T2YoJ0Nocm9tZScpID09PSAtMSkge1xyXG5cdFx0XHR1cmwgPSByZWRpcmVjdFVyaSArICcjb2F1dGhfcmVkaXJlY3Q9JyArIGVuY29kZVVSSUNvbXBvbmVudChlbmNvZGVVUklDb21wb25lbnQodXJsKSk7XHJcblx0XHR9XHJcblxyXG5cdFx0dmFyIHBvcHVwID0gd2luZG93Lm9wZW4oXHJcblx0XHRcdHVybCxcclxuXHRcdFx0J19ibGFuaycsXHJcblx0XHRcdG9wdGlvbnNBcnJheS5qb2luKCcsJylcclxuXHRcdCk7XHJcblxyXG5cdFx0aWYgKHBvcHVwICYmIHBvcHVwLmZvY3VzKSB7XHJcblx0XHRcdHBvcHVwLmZvY3VzKCk7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIHBvcHVwO1xyXG5cdH0sXHJcblxyXG5cdC8vIE9BdXRoIGFuZCBBUEkgcmVzcG9uc2UgaGFuZGxlclxyXG5cdHJlc3BvbnNlSGFuZGxlcjogZnVuY3Rpb24od2luZG93LCBwYXJlbnQpIHtcclxuXHJcblx0XHR2YXIgX3RoaXMgPSB0aGlzO1xyXG5cdFx0dmFyIHA7XHJcblx0XHR2YXIgbG9jYXRpb24gPSB3aW5kb3cubG9jYXRpb247XHJcblxyXG5cdFx0Ly8gSXMgdGhpcyBhbiBhdXRoIHJlbGF5IG1lc3NhZ2Ugd2hpY2ggbmVlZHMgdG8gY2FsbCB0aGUgcHJveHk/XHJcblx0XHRwID0gX3RoaXMucGFyYW0obG9jYXRpb24uc2VhcmNoKTtcclxuXHJcblx0XHQvLyBPQXV0aDIgb3IgT0F1dGgxIHNlcnZlciByZXNwb25zZT9cclxuXHRcdGlmIChwICYmIHAuc3RhdGUgJiYgKHAuY29kZSB8fCBwLm9hdXRoX3Rva2VuKSkge1xyXG5cclxuXHRcdFx0dmFyIHN0YXRlID0gSlNPTi5wYXJzZShwLnN0YXRlKTtcclxuXHJcblx0XHRcdC8vIEFkZCB0aGlzIHBhdGggYXMgdGhlIHJlZGlyZWN0X3VyaVxyXG5cdFx0XHRwLnJlZGlyZWN0X3VyaSA9IHN0YXRlLnJlZGlyZWN0X3VyaSB8fCBsb2NhdGlvbi5ocmVmLnJlcGxhY2UoL1tcXD9cXCNdLiokLywgJycpO1xyXG5cclxuXHRcdFx0Ly8gUmVkaXJlY3QgdG8gdGhlIGhvc3RcclxuXHRcdFx0dmFyIHBhdGggPSBzdGF0ZS5vYXV0aF9wcm94eSArICc/JyArIF90aGlzLnBhcmFtKHApO1xyXG5cclxuXHRcdFx0bG9jYXRpb24uYXNzaWduKHBhdGgpO1xyXG5cclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cclxuXHRcdC8vIFNhdmUgc2Vzc2lvbiwgZnJvbSByZWRpcmVjdGVkIGF1dGhlbnRpY2F0aW9uXHJcblx0XHQvLyAjYWNjZXNzX3Rva2VuIGhhcyBjb21lIGluP1xyXG5cdFx0Ly9cclxuXHRcdC8vIEZBQ0VCT09LIGlzIHJldHVybmluZyBhdXRoIGVycm9ycyB3aXRoaW4gYXMgYSBxdWVyeV9zdHJpbmcuLi4gdGhhdHMgYSBzdGlja2xlciBmb3IgY29uc2lzdGVuY3kuXHJcblx0XHQvLyBTb3VuZENsb3VkIGlzIHRoZSBzdGF0ZSBpbiB0aGUgcXVlcnlzdHJpbmcgYW5kIHRoZSB0b2tlbiBpbiB0aGUgaGFzaHRhZywgc28gd2UnbGwgbWl4IHRoZSB0d28gdG9nZXRoZXJcclxuXHJcblx0XHRwID0gX3RoaXMubWVyZ2UoX3RoaXMucGFyYW0obG9jYXRpb24uc2VhcmNoIHx8ICcnKSwgX3RoaXMucGFyYW0obG9jYXRpb24uaGFzaCB8fCAnJykpO1xyXG5cclxuXHRcdC8vIElmIHAuc3RhdGVcclxuXHRcdGlmIChwICYmICdzdGF0ZScgaW4gcCkge1xyXG5cclxuXHRcdFx0Ly8gUmVtb3ZlIGFueSBhZGRpdGlvbiBpbmZvcm1hdGlvblxyXG5cdFx0XHQvLyBFLmcuIHAuc3RhdGUgPSAnZmFjZWJvb2sucGFnZSc7XHJcblx0XHRcdHRyeSB7XHJcblx0XHRcdFx0dmFyIGEgPSBKU09OLnBhcnNlKHAuc3RhdGUpO1xyXG5cdFx0XHRcdF90aGlzLmV4dGVuZChwLCBhKTtcclxuXHRcdFx0fVxyXG5cdFx0XHRjYXRjaCAoZSkge1xyXG5cdFx0XHRcdGNvbnNvbGUuZXJyb3IoJ0NvdWxkIG5vdCBkZWNvZGUgc3RhdGUgcGFyYW1ldGVyJyk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdC8vIEFjY2Vzc190b2tlbj9cclxuXHRcdFx0aWYgKCgnYWNjZXNzX3Rva2VuJyBpbiBwICYmIHAuYWNjZXNzX3Rva2VuKSAmJiBwLm5ldHdvcmspIHtcclxuXHJcblx0XHRcdFx0aWYgKCFwLmV4cGlyZXNfaW4gfHwgcGFyc2VJbnQocC5leHBpcmVzX2luLCAxMCkgPT09IDApIHtcclxuXHRcdFx0XHRcdC8vIElmIHAuZXhwaXJlc19pbiBpcyB1bnNldCwgc2V0IHRvIDBcclxuXHRcdFx0XHRcdHAuZXhwaXJlc19pbiA9IDA7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRwLmV4cGlyZXNfaW4gPSBwYXJzZUludChwLmV4cGlyZXNfaW4sIDEwKTtcclxuXHRcdFx0XHRwLmV4cGlyZXMgPSAoKG5ldyBEYXRlKCkpLmdldFRpbWUoKSAvIDFlMykgKyAocC5leHBpcmVzX2luIHx8ICg2MCAqIDYwICogMjQgKiAzNjUpKTtcclxuXHJcblx0XHRcdFx0Ly8gTGV0cyB1c2UgdGhlIFwic3RhdGVcIiB0byBhc3NpZ24gaXQgdG8gb25lIG9mIG91ciBuZXR3b3Jrc1xyXG5cdFx0XHRcdGF1dGhDYWxsYmFjayhwLCB3aW5kb3csIHBhcmVudCk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdC8vIEVycm9yPT9cclxuXHRcdFx0Ly8gJmVycm9yX2Rlc2NyaXB0aW9uPT9cclxuXHRcdFx0Ly8gJnN0YXRlPT9cclxuXHRcdFx0ZWxzZSBpZiAoKCdlcnJvcicgaW4gcCAmJiBwLmVycm9yKSAmJiBwLm5ldHdvcmspIHtcclxuXHJcblx0XHRcdFx0cC5lcnJvciA9IHtcclxuXHRcdFx0XHRcdGNvZGU6IHAuZXJyb3IsXHJcblx0XHRcdFx0XHRtZXNzYWdlOiBwLmVycm9yX21lc3NhZ2UgfHwgcC5lcnJvcl9kZXNjcmlwdGlvblxyXG5cdFx0XHRcdH07XHJcblxyXG5cdFx0XHRcdC8vIExldCB0aGUgc3RhdGUgaGFuZGxlciBoYW5kbGUgaXRcclxuXHRcdFx0XHRhdXRoQ2FsbGJhY2socCwgd2luZG93LCBwYXJlbnQpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQvLyBBUEkgY2FsbCwgb3IgYSBjYW5jZWxsZWQgbG9naW5cclxuXHRcdFx0Ly8gUmVzdWx0IGlzIHNlcmlhbGl6ZWQgSlNPTiBzdHJpbmdcclxuXHRcdFx0ZWxzZSBpZiAocC5jYWxsYmFjayAmJiBwLmNhbGxiYWNrIGluIHBhcmVudCkge1xyXG5cclxuXHRcdFx0XHQvLyBUcmlnZ2VyIGEgZnVuY3Rpb24gaW4gdGhlIHBhcmVudFxyXG5cdFx0XHRcdHZhciByZXMgPSAncmVzdWx0JyBpbiBwICYmIHAucmVzdWx0ID8gSlNPTi5wYXJzZShwLnJlc3VsdCkgOiBmYWxzZTtcclxuXHJcblx0XHRcdFx0Ly8gVHJpZ2dlciB0aGUgY2FsbGJhY2sgb24gdGhlIHBhcmVudFxyXG5cdFx0XHRcdGNhbGxiYWNrKHBhcmVudCwgcC5jYWxsYmFjaykocmVzKTtcclxuXHRcdFx0XHRjbG9zZVdpbmRvdygpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQvLyBJZiB0aGlzIHBhZ2UgaXMgc3RpbGwgb3BlblxyXG5cdFx0XHRpZiAocC5wYWdlX3VyaSkge1xyXG5cdFx0XHRcdGxvY2F0aW9uLmFzc2lnbihwLnBhZ2VfdXJpKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdC8vIE9BdXRoIHJlZGlyZWN0LCBmaXhlcyBVUkkgZnJhZ21lbnRzIGZyb20gYmVpbmcgbG9zdCBpbiBTYWZhcmlcclxuXHRcdC8vIChVUkkgRnJhZ21lbnRzIHdpdGhpbiAzMDIgTG9jYXRpb24gVVJJIGFyZSBsb3N0IG92ZXIgSFRUUFMpXHJcblx0XHQvLyBMb2FkaW5nIHRoZSByZWRpcmVjdC5odG1sIGJlZm9yZSB0cmlnZ2VyaW5nIHRoZSBPQXV0aCBGbG93IHNlZW1zIHRvIGZpeCBpdC5cclxuXHRcdGVsc2UgaWYgKCdvYXV0aF9yZWRpcmVjdCcgaW4gcCkge1xyXG5cclxuXHRcdFx0bG9jYXRpb24uYXNzaWduKGRlY29kZVVSSUNvbXBvbmVudChwLm9hdXRoX3JlZGlyZWN0KSk7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHJcblx0XHQvLyBUcmlnZ2VyIGEgY2FsbGJhY2sgdG8gYXV0aGVudGljYXRlXHJcblx0XHRmdW5jdGlvbiBhdXRoQ2FsbGJhY2sob2JqLCB3aW5kb3csIHBhcmVudCkge1xyXG5cclxuXHRcdFx0dmFyIGNiID0gb2JqLmNhbGxiYWNrO1xyXG5cdFx0XHR2YXIgbmV0d29yayA9IG9iai5uZXR3b3JrO1xyXG5cclxuXHRcdFx0Ly8gVHJpZ2dlciB0aGUgY2FsbGJhY2sgb24gdGhlIHBhcmVudFxyXG5cdFx0XHRfdGhpcy5zdG9yZShuZXR3b3JrLCBvYmopO1xyXG5cclxuXHRcdFx0Ly8gSWYgdGhpcyBpcyBhIHBhZ2UgcmVxdWVzdCBpdCBoYXMgbm8gcGFyZW50IG9yIG9wZW5lciB3aW5kb3cgdG8gaGFuZGxlIGNhbGxiYWNrc1xyXG5cdFx0XHRpZiAoKCdkaXNwbGF5JyBpbiBvYmopICYmIG9iai5kaXNwbGF5ID09PSAncGFnZScpIHtcclxuXHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdC8vIFJlbW92ZSBmcm9tIHNlc3Npb24gb2JqZWN0XHJcblx0XHRcdGlmIChwYXJlbnQgJiYgY2IgJiYgY2IgaW4gcGFyZW50KSB7XHJcblxyXG5cdFx0XHRcdHRyeSB7XHJcblx0XHRcdFx0XHRkZWxldGUgb2JqLmNhbGxiYWNrO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRjYXRjaCAoZSkge31cclxuXHJcblx0XHRcdFx0Ly8gVXBkYXRlIHN0b3JlXHJcblx0XHRcdFx0X3RoaXMuc3RvcmUobmV0d29yaywgb2JqKTtcclxuXHJcblx0XHRcdFx0Ly8gQ2FsbCB0aGUgZ2xvYmFsRXZlbnQgZnVuY3Rpb24gb24gdGhlIHBhcmVudFxyXG5cdFx0XHRcdC8vIEl0J3Mgc2FmZXIgdG8gcGFzcyBiYWNrIGEgc3RyaW5nIHRvIHRoZSBwYXJlbnQsXHJcblx0XHRcdFx0Ly8gUmF0aGVyIHRoYW4gYW4gb2JqZWN0L2FycmF5IChiZXR0ZXIgZm9yIElFOClcclxuXHRcdFx0XHR2YXIgc3RyID0gSlNPTi5zdHJpbmdpZnkob2JqKTtcclxuXHJcblx0XHRcdFx0dHJ5IHtcclxuXHRcdFx0XHRcdGNhbGxiYWNrKHBhcmVudCwgY2IpKHN0cik7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdGNhdGNoIChlKSB7XHJcblx0XHRcdFx0XHQvLyBFcnJvciB0aHJvd24gd2hpbHN0IGV4ZWN1dGluZyBwYXJlbnQgY2FsbGJhY2tcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGNsb3NlV2luZG93KCk7XHJcblx0XHR9XHJcblxyXG5cdFx0ZnVuY3Rpb24gY2FsbGJhY2socGFyZW50LCBjYWxsYmFja0lEKSB7XHJcblx0XHRcdGlmIChjYWxsYmFja0lELmluZGV4T2YoJ19oZWxsb2pzXycpICE9PSAwKSB7XHJcblx0XHRcdFx0cmV0dXJuIGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdFx0dGhyb3cgJ0NvdWxkIG5vdCBleGVjdXRlIGNhbGxiYWNrICcgKyBjYWxsYmFja0lEO1xyXG5cdFx0XHRcdH07XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHJldHVybiBwYXJlbnRbY2FsbGJhY2tJRF07XHJcblx0XHR9XHJcblxyXG5cdFx0ZnVuY3Rpb24gY2xvc2VXaW5kb3coKSB7XHJcblxyXG5cdFx0XHRpZiAod2luZG93LmZyYW1lRWxlbWVudCkge1xyXG5cdFx0XHRcdC8vIEluc2lkZSBhbiBpZnJhbWUsIHJlbW92ZSBmcm9tIHBhcmVudFxyXG5cdFx0XHRcdHBhcmVudC5kb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKHdpbmRvdy5mcmFtZUVsZW1lbnQpO1xyXG5cdFx0XHR9XHJcblx0XHRcdGVsc2Uge1xyXG5cdFx0XHRcdC8vIENsb3NlIHRoaXMgY3VycmVudCB3aW5kb3dcclxuXHRcdFx0XHR0cnkge1xyXG5cdFx0XHRcdFx0d2luZG93LmNsb3NlKCk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdGNhdGNoIChlKSB7fVxyXG5cclxuXHRcdFx0XHQvLyBJT1MgYnVnIHdvbnQgbGV0IHVzIGNsb3NlIGEgcG9wdXAgaWYgc3RpbGwgbG9hZGluZ1xyXG5cdFx0XHRcdGlmICh3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcikge1xyXG5cdFx0XHRcdFx0d2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCBmdW5jdGlvbigpIHtcclxuXHRcdFx0XHRcdFx0d2luZG93LmNsb3NlKCk7XHJcblx0XHRcdFx0XHR9KTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHJcblx0XHR9XHJcblx0fVxyXG59KTtcclxuXHJcbi8vIEV2ZW50c1xyXG4vLyBFeHRlbmQgdGhlIGhlbGxvIG9iamVjdCB3aXRoIGl0cyBvd24gZXZlbnQgaW5zdGFuY2VcclxuaGVsbG8udXRpbHMuRXZlbnQuY2FsbChoZWxsbyk7XHJcblxyXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG4vLyBNb25pdG9yaW5nIHNlc3Npb24gc3RhdGVcclxuLy8gQ2hlY2sgZm9yIHNlc3Npb24gY2hhbmdlc1xyXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG5cclxuKGZ1bmN0aW9uKGhlbGxvKSB7XHJcblxyXG5cdC8vIE1vbml0b3IgZm9yIGEgY2hhbmdlIGluIHN0YXRlIGFuZCBmaXJlXHJcblx0dmFyIG9sZFNlc3Npb25zID0ge307XHJcblxyXG5cdC8vIEhhc2ggb2YgZXhwaXJlZCB0b2tlbnNcclxuXHR2YXIgZXhwaXJlZCA9IHt9O1xyXG5cclxuXHQvLyBMaXN0ZW4gdG8gb3RoZXIgdHJpZ2dlcnMgdG8gQXV0aCBldmVudHMsIHVzZSB0aGVzZSB0byB1cGRhdGUgdGhpc1xyXG5cdGhlbGxvLm9uKCdhdXRoLmxvZ2luLCBhdXRoLmxvZ291dCcsIGZ1bmN0aW9uKGF1dGgpIHtcclxuXHRcdGlmIChhdXRoICYmIHR5cGVvZiAoYXV0aCkgPT09ICdvYmplY3QnICYmIGF1dGgubmV0d29yaykge1xyXG5cdFx0XHRvbGRTZXNzaW9uc1thdXRoLm5ldHdvcmtdID0gaGVsbG8udXRpbHMuc3RvcmUoYXV0aC5uZXR3b3JrKSB8fCB7fTtcclxuXHRcdH1cclxuXHR9KTtcclxuXHJcblx0KGZ1bmN0aW9uIHNlbGYoKSB7XHJcblxyXG5cdFx0dmFyIENVUlJFTlRfVElNRSA9ICgobmV3IERhdGUoKSkuZ2V0VGltZSgpIC8gMWUzKTtcclxuXHRcdHZhciBlbWl0ID0gZnVuY3Rpb24oZXZlbnROYW1lKSB7XHJcblx0XHRcdGhlbGxvLmVtaXQoJ2F1dGguJyArIGV2ZW50TmFtZSwge1xyXG5cdFx0XHRcdG5ldHdvcms6IG5hbWUsXHJcblx0XHRcdFx0YXV0aFJlc3BvbnNlOiBzZXNzaW9uXHJcblx0XHRcdH0pO1xyXG5cdFx0fTtcclxuXHJcblx0XHQvLyBMb29wIHRocm91Z2ggdGhlIHNlcnZpY2VzXHJcblx0XHRmb3IgKHZhciBuYW1lIGluIGhlbGxvLnNlcnZpY2VzKSB7aWYgKGhlbGxvLnNlcnZpY2VzLmhhc093blByb3BlcnR5KG5hbWUpKSB7XHJcblxyXG5cdFx0XHRpZiAoIWhlbGxvLnNlcnZpY2VzW25hbWVdLmlkKSB7XHJcblx0XHRcdFx0Ly8gV2UgaGF2ZW4ndCBhdHRhY2hlZCBhbiBJRCBzbyBkb250IGxpc3Rlbi5cclxuXHRcdFx0XHRjb250aW51ZTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0Ly8gR2V0IHNlc3Npb25cclxuXHRcdFx0dmFyIHNlc3Npb24gPSBoZWxsby51dGlscy5zdG9yZShuYW1lKSB8fCB7fTtcclxuXHRcdFx0dmFyIHByb3ZpZGVyID0gaGVsbG8uc2VydmljZXNbbmFtZV07XHJcblx0XHRcdHZhciBvbGRTZXNzID0gb2xkU2Vzc2lvbnNbbmFtZV0gfHwge307XHJcblxyXG5cdFx0XHQvLyBMaXN0ZW4gZm9yIGdsb2JhbEV2ZW50cyB0aGF0IGRpZCBub3QgZ2V0IHRyaWdnZXJlZCBmcm9tIHRoZSBjaGlsZFxyXG5cdFx0XHRpZiAoc2Vzc2lvbiAmJiAnY2FsbGJhY2snIGluIHNlc3Npb24pIHtcclxuXHJcblx0XHRcdFx0Ly8gVG8gZG8gcmVtb3ZlIGZyb20gc2Vzc2lvbiBvYmplY3QuLi5cclxuXHRcdFx0XHR2YXIgY2IgPSBzZXNzaW9uLmNhbGxiYWNrO1xyXG5cdFx0XHRcdHRyeSB7XHJcblx0XHRcdFx0XHRkZWxldGUgc2Vzc2lvbi5jYWxsYmFjaztcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0Y2F0Y2ggKGUpIHt9XHJcblxyXG5cdFx0XHRcdC8vIFVwZGF0ZSBzdG9yZVxyXG5cdFx0XHRcdC8vIFJlbW92aW5nIHRoZSBjYWxsYmFja1xyXG5cdFx0XHRcdGhlbGxvLnV0aWxzLnN0b3JlKG5hbWUsIHNlc3Npb24pO1xyXG5cclxuXHRcdFx0XHQvLyBFbWl0IGdsb2JhbCBldmVudHNcclxuXHRcdFx0XHR0cnkge1xyXG5cdFx0XHRcdFx0d2luZG93W2NiXShzZXNzaW9uKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0Y2F0Y2ggKGUpIHt9XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdC8vIFJlZnJlc2ggdG9rZW5cclxuXHRcdFx0aWYgKHNlc3Npb24gJiYgKCdleHBpcmVzJyBpbiBzZXNzaW9uKSAmJiBzZXNzaW9uLmV4cGlyZXMgPCBDVVJSRU5UX1RJTUUpIHtcclxuXHJcblx0XHRcdFx0Ly8gSWYgYXV0byByZWZyZXNoIGlzIHBvc3NpYmxlXHJcblx0XHRcdFx0Ly8gRWl0aGVyIHRoZSBicm93c2VyIHN1cHBvcnRzXHJcblx0XHRcdFx0dmFyIHJlZnJlc2ggPSBwcm92aWRlci5yZWZyZXNoIHx8IHNlc3Npb24ucmVmcmVzaF90b2tlbjtcclxuXHJcblx0XHRcdFx0Ly8gSGFzIHRoZSByZWZyZXNoIGJlZW4gcnVuIHJlY2VudGx5P1xyXG5cdFx0XHRcdGlmIChyZWZyZXNoICYmICghKG5hbWUgaW4gZXhwaXJlZCkgfHwgZXhwaXJlZFtuYW1lXSA8IENVUlJFTlRfVElNRSkpIHtcclxuXHRcdFx0XHRcdC8vIFRyeSB0byByZXNpZ25pblxyXG5cdFx0XHRcdFx0aGVsbG8uZW1pdCgnbm90aWNlJywgbmFtZSArICcgaGFzIGV4cGlyZWQgdHJ5aW5nIHRvIHJlc2lnbmluJyk7XHJcblx0XHRcdFx0XHRoZWxsby5sb2dpbihuYW1lLCB7ZGlzcGxheTogJ25vbmUnLCBmb3JjZTogZmFsc2V9KTtcclxuXHJcblx0XHRcdFx0XHQvLyBVcGRhdGUgZXhwaXJlZCwgZXZlcnkgMTAgbWludXRlc1xyXG5cdFx0XHRcdFx0ZXhwaXJlZFtuYW1lXSA9IENVUlJFTlRfVElNRSArIDYwMDtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdC8vIERvZXMgdGhpcyBwcm92aWRlciBub3Qgc3VwcG9ydCByZWZyZXNoXHJcblx0XHRcdFx0ZWxzZSBpZiAoIXJlZnJlc2ggJiYgIShuYW1lIGluIGV4cGlyZWQpKSB7XHJcblx0XHRcdFx0XHQvLyBMYWJlbCB0aGUgZXZlbnRcclxuXHRcdFx0XHRcdGVtaXQoJ2V4cGlyZWQnKTtcclxuXHRcdFx0XHRcdGV4cGlyZWRbbmFtZV0gPSB0cnVlO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0Ly8gSWYgc2Vzc2lvbiBoYXMgZXhwaXJlZCB0aGVuIHdlIGRvbnQgd2FudCB0byBzdG9yZSBpdHMgdmFsdWUgdW50aWwgaXQgY2FuIGJlIGVzdGFibGlzaGVkIHRoYXQgaXRzIGJlZW4gdXBkYXRlZFxyXG5cdFx0XHRcdGNvbnRpbnVlO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQvLyBIYXMgc2Vzc2lvbiBjaGFuZ2VkP1xyXG5cdFx0XHRlbHNlIGlmIChvbGRTZXNzLmFjY2Vzc190b2tlbiA9PT0gc2Vzc2lvbi5hY2Nlc3NfdG9rZW4gJiZcclxuXHRcdFx0b2xkU2Vzcy5leHBpcmVzID09PSBzZXNzaW9uLmV4cGlyZXMpIHtcclxuXHRcdFx0XHRjb250aW51ZTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0Ly8gQWNjZXNzX3Rva2VuIGhhcyBiZWVuIHJlbW92ZWRcclxuXHRcdFx0ZWxzZSBpZiAoIXNlc3Npb24uYWNjZXNzX3Rva2VuICYmIG9sZFNlc3MuYWNjZXNzX3Rva2VuKSB7XHJcblx0XHRcdFx0ZW1pdCgnbG9nb3V0Jyk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdC8vIEFjY2Vzc190b2tlbiBoYXMgYmVlbiBjcmVhdGVkXHJcblx0XHRcdGVsc2UgaWYgKHNlc3Npb24uYWNjZXNzX3Rva2VuICYmICFvbGRTZXNzLmFjY2Vzc190b2tlbikge1xyXG5cdFx0XHRcdGVtaXQoJ2xvZ2luJyk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdC8vIEFjY2Vzc190b2tlbiBoYXMgYmVlbiB1cGRhdGVkXHJcblx0XHRcdGVsc2UgaWYgKHNlc3Npb24uZXhwaXJlcyAhPT0gb2xkU2Vzcy5leHBpcmVzKSB7XHJcblx0XHRcdFx0ZW1pdCgndXBkYXRlJyk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdC8vIFVwZGF0ZWQgc3RvcmVkIHNlc3Npb25cclxuXHRcdFx0b2xkU2Vzc2lvbnNbbmFtZV0gPSBzZXNzaW9uO1xyXG5cclxuXHRcdFx0Ly8gUmVtb3ZlIHRoZSBleHBpcmVkIGZsYWdzXHJcblx0XHRcdGlmIChuYW1lIGluIGV4cGlyZWQpIHtcclxuXHRcdFx0XHRkZWxldGUgZXhwaXJlZFtuYW1lXTtcclxuXHRcdFx0fVxyXG5cdFx0fX1cclxuXHJcblx0XHQvLyBDaGVjayBlcnJvciBldmVudHNcclxuXHRcdHNldFRpbWVvdXQoc2VsZiwgMTAwMCk7XHJcblx0fSkoKTtcclxuXHJcbn0pKGhlbGxvKTtcclxuXHJcbi8vIEVPRiBDT1JFIGxpYlxyXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcblxyXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG4vLyBBUElcclxuLy8gQHBhcmFtIHBhdGggICAgc3RyaW5nXHJcbi8vIEBwYXJhbSBxdWVyeSAgIG9iamVjdCAob3B0aW9uYWwpXHJcbi8vIEBwYXJhbSBtZXRob2QgIHN0cmluZyAob3B0aW9uYWwpXHJcbi8vIEBwYXJhbSBkYXRhICAgIG9iamVjdCAob3B0aW9uYWwpXHJcbi8vIEBwYXJhbSB0aW1lb3V0IGludGVnZXIgKG9wdGlvbmFsKVxyXG4vLyBAcGFyYW0gY2FsbGJhY2sgIGZ1bmN0aW9uIChvcHRpb25hbClcclxuXHJcbmhlbGxvLmFwaSA9IGZ1bmN0aW9uKCkge1xyXG5cclxuXHQvLyBTaG9ydGhhbmRcclxuXHR2YXIgX3RoaXMgPSB0aGlzO1xyXG5cdHZhciB1dGlscyA9IF90aGlzLnV0aWxzO1xyXG5cdHZhciBlcnJvciA9IHV0aWxzLmVycm9yO1xyXG5cclxuXHQvLyBDb25zdHJ1Y3QgYSBuZXcgUHJvbWlzZSBvYmplY3RcclxuXHR2YXIgcHJvbWlzZSA9IHV0aWxzLlByb21pc2UoKTtcclxuXHJcblx0Ly8gQXJndW1lbnRzXHJcblx0dmFyIHAgPSB1dGlscy5hcmdzKHtwYXRoOiAncyEnLCBxdWVyeTogJ28nLCBtZXRob2Q6ICdzJywgZGF0YTogJ28nLCB0aW1lb3V0OiAnaScsIGNhbGxiYWNrOiAnZid9LCBhcmd1bWVudHMpO1xyXG5cclxuXHQvLyBNZXRob2RcclxuXHRwLm1ldGhvZCA9IChwLm1ldGhvZCB8fCAnZ2V0JykudG9Mb3dlckNhc2UoKTtcclxuXHJcblx0Ly8gSGVhZGVyc1xyXG5cdHAuaGVhZGVycyA9IHAuaGVhZGVycyB8fCB7fTtcclxuXHJcblx0Ly8gUXVlcnlcclxuXHRwLnF1ZXJ5ID0gcC5xdWVyeSB8fCB7fTtcclxuXHJcblx0Ly8gSWYgZ2V0LCBwdXQgYWxsIHBhcmFtZXRlcnMgaW50byBxdWVyeVxyXG5cdGlmIChwLm1ldGhvZCA9PT0gJ2dldCcgfHwgcC5tZXRob2QgPT09ICdkZWxldGUnKSB7XHJcblx0XHR1dGlscy5leHRlbmQocC5xdWVyeSwgcC5kYXRhKTtcclxuXHRcdHAuZGF0YSA9IHt9O1xyXG5cdH1cclxuXHJcblx0dmFyIGRhdGEgPSBwLmRhdGEgPSBwLmRhdGEgfHwge307XHJcblxyXG5cdC8vIENvbXBsZXRlZCBldmVudCBjYWxsYmFja1xyXG5cdHByb21pc2UudGhlbihwLmNhbGxiYWNrLCBwLmNhbGxiYWNrKTtcclxuXHJcblx0Ly8gUmVtb3ZlIHRoZSBuZXR3b3JrIGZyb20gcGF0aCwgZS5nLiBmYWNlYm9vazovbWUvZnJpZW5kc1xyXG5cdC8vIFJlc3VsdHMgaW4geyBuZXR3b3JrIDogZmFjZWJvb2ssIHBhdGggOiBtZS9mcmllbmRzIH1cclxuXHRpZiAoIXAucGF0aCkge1xyXG5cdFx0cmV0dXJuIHByb21pc2UucmVqZWN0KGVycm9yKCdpbnZhbGlkX3BhdGgnLCAnTWlzc2luZyB0aGUgcGF0aCBwYXJhbWV0ZXIgZnJvbSB0aGUgcmVxdWVzdCcpKTtcclxuXHR9XHJcblxyXG5cdHAucGF0aCA9IHAucGF0aC5yZXBsYWNlKC9eXFwvKy8sICcnKTtcclxuXHR2YXIgYSA9IChwLnBhdGguc3BsaXQoL1tcXC9cXDpdLywgMikgfHwgW10pWzBdLnRvTG93ZXJDYXNlKCk7XHJcblxyXG5cdGlmIChhIGluIF90aGlzLnNlcnZpY2VzKSB7XHJcblx0XHRwLm5ldHdvcmsgPSBhO1xyXG5cdFx0dmFyIHJlZyA9IG5ldyBSZWdFeHAoJ14nICsgYSArICc6P1xcLz8nKTtcclxuXHRcdHAucGF0aCA9IHAucGF0aC5yZXBsYWNlKHJlZywgJycpO1xyXG5cdH1cclxuXHJcblx0Ly8gTmV0d29yayAmIFByb3ZpZGVyXHJcblx0Ly8gRGVmaW5lIHRoZSBuZXR3b3JrIHRoYXQgdGhpcyByZXF1ZXN0IGlzIG1hZGUgZm9yXHJcblx0cC5uZXR3b3JrID0gX3RoaXMuc2V0dGluZ3MuZGVmYXVsdF9zZXJ2aWNlID0gcC5uZXR3b3JrIHx8IF90aGlzLnNldHRpbmdzLmRlZmF1bHRfc2VydmljZTtcclxuXHR2YXIgbyA9IF90aGlzLnNlcnZpY2VzW3AubmV0d29ya107XHJcblxyXG5cdC8vIElOVkFMSURcclxuXHQvLyBJcyB0aGVyZSBubyBzZXJ2aWNlIGJ5IHRoZSBnaXZlbiBuZXR3b3JrIG5hbWU/XHJcblx0aWYgKCFvKSB7XHJcblx0XHRyZXR1cm4gcHJvbWlzZS5yZWplY3QoZXJyb3IoJ2ludmFsaWRfbmV0d29yaycsICdDb3VsZCBub3QgbWF0Y2ggdGhlIHNlcnZpY2UgcmVxdWVzdGVkOiAnICsgcC5uZXR3b3JrKSk7XHJcblx0fVxyXG5cclxuXHQvLyBQQVRIXHJcblx0Ly8gQXMgbG9uZyBhcyB0aGUgcGF0aCBpc24ndCBmbGFnZ2VkIGFzIHVuYXZhaWFibGUsIGUuZy4gcGF0aCA9PSBmYWxzZVxyXG5cclxuXHRpZiAoISghKHAubWV0aG9kIGluIG8pIHx8ICEocC5wYXRoIGluIG9bcC5tZXRob2RdKSB8fCBvW3AubWV0aG9kXVtwLnBhdGhdICE9PSBmYWxzZSkpIHtcclxuXHRcdHJldHVybiBwcm9taXNlLnJlamVjdChlcnJvcignaW52YWxpZF9wYXRoJywgJ1RoZSBwcm92aWRlZCBwYXRoIGlzIG5vdCBhdmFpbGFibGUgb24gdGhlIHNlbGVjdGVkIG5ldHdvcmsnKSk7XHJcblx0fVxyXG5cclxuXHQvLyBQUk9YWVxyXG5cdC8vIE9BdXRoMSBjYWxscyBhbHdheXMgbmVlZCBhIHByb3h5XHJcblxyXG5cdGlmICghcC5vYXV0aF9wcm94eSkge1xyXG5cdFx0cC5vYXV0aF9wcm94eSA9IF90aGlzLnNldHRpbmdzLm9hdXRoX3Byb3h5O1xyXG5cdH1cclxuXHJcblx0aWYgKCEoJ3Byb3h5JyBpbiBwKSkge1xyXG5cdFx0cC5wcm94eSA9IHAub2F1dGhfcHJveHkgJiYgby5vYXV0aCAmJiBwYXJzZUludChvLm9hdXRoLnZlcnNpb24sIDEwKSA9PT0gMTtcclxuXHR9XHJcblxyXG5cdC8vIFRJTUVPVVRcclxuXHQvLyBBZG9wdCB0aW1lb3V0IGZyb20gZ2xvYmFsIHNldHRpbmdzIGJ5IGRlZmF1bHRcclxuXHJcblx0aWYgKCEoJ3RpbWVvdXQnIGluIHApKSB7XHJcblx0XHRwLnRpbWVvdXQgPSBfdGhpcy5zZXR0aW5ncy50aW1lb3V0O1xyXG5cdH1cclxuXHJcblx0Ly8gRm9ybWF0IHJlc3BvbnNlXHJcblx0Ly8gV2hldGhlciB0byBydW4gdGhlIHJhdyByZXNwb25zZSB0aHJvdWdoIHBvc3QgcHJvY2Vzc2luZy5cclxuXHRpZiAoISgnZm9ybWF0UmVzcG9uc2UnIGluIHApKSB7XHJcblx0XHRwLmZvcm1hdFJlc3BvbnNlID0gdHJ1ZTtcclxuXHR9XHJcblxyXG5cdC8vIEdldCB0aGUgY3VycmVudCBzZXNzaW9uXHJcblx0Ly8gQXBwZW5kIHRoZSBhY2Nlc3NfdG9rZW4gdG8gdGhlIHF1ZXJ5XHJcblx0cC5hdXRoUmVzcG9uc2UgPSBfdGhpcy5nZXRBdXRoUmVzcG9uc2UocC5uZXR3b3JrKTtcclxuXHRpZiAocC5hdXRoUmVzcG9uc2UgJiYgcC5hdXRoUmVzcG9uc2UuYWNjZXNzX3Rva2VuKSB7XHJcblx0XHRwLnF1ZXJ5LmFjY2Vzc190b2tlbiA9IHAuYXV0aFJlc3BvbnNlLmFjY2Vzc190b2tlbjtcclxuXHR9XHJcblxyXG5cdHZhciB1cmwgPSBwLnBhdGg7XHJcblx0dmFyIG07XHJcblxyXG5cdC8vIFN0b3JlIHRoZSBxdWVyeSBhcyBvcHRpb25zXHJcblx0Ly8gVGhpcyBpcyB1c2VkIHRvIHBvcHVsYXRlIHRoZSByZXF1ZXN0IG9iamVjdCBiZWZvcmUgdGhlIGRhdGEgaXMgYXVnbWVudGVkIGJ5IHRoZSBwcmV3cmFwIGhhbmRsZXJzLlxyXG5cdHAub3B0aW9ucyA9IHV0aWxzLmNsb25lKHAucXVlcnkpO1xyXG5cclxuXHQvLyBDbG9uZSB0aGUgZGF0YSBvYmplY3RcclxuXHQvLyBQcmV2ZW50IHRoaXMgc2NyaXB0IG92ZXJ3cml0aW5nIHRoZSBkYXRhIG9mIHRoZSBpbmNvbWluZyBvYmplY3QuXHJcblx0Ly8gRW5zdXJlIHRoYXQgZXZlcnl0aW1lIHdlIHJ1biBhbiBpdGVyYXRpb24gdGhlIGNhbGxiYWNrcyBoYXZlbid0IHJlbW92ZWQgc29tZSBkYXRhXHJcblx0cC5kYXRhID0gdXRpbHMuY2xvbmUoZGF0YSk7XHJcblxyXG5cdC8vIFVSTCBNYXBwaW5nXHJcblx0Ly8gSXMgdGhlcmUgYSBtYXAgZm9yIHRoZSBnaXZlbiBVUkw/XHJcblx0dmFyIGFjdGlvbnMgPSBvW3snZGVsZXRlJzogJ2RlbCd9W3AubWV0aG9kXSB8fCBwLm1ldGhvZF0gfHwge307XHJcblxyXG5cdC8vIEV4dHJhcG9sYXRlIHRoZSBRdWVyeVN0cmluZ1xyXG5cdC8vIFByb3ZpZGUgYSBjbGVhbiBwYXRoXHJcblx0Ly8gTW92ZSB0aGUgcXVlcnlzdHJpbmcgaW50byB0aGUgZGF0YVxyXG5cdGlmIChwLm1ldGhvZCA9PT0gJ2dldCcpIHtcclxuXHJcblx0XHR2YXIgcXVlcnkgPSB1cmwuc3BsaXQoL1tcXD8jXS8pWzFdO1xyXG5cdFx0aWYgKHF1ZXJ5KSB7XHJcblx0XHRcdHV0aWxzLmV4dGVuZChwLnF1ZXJ5LCB1dGlscy5wYXJhbShxdWVyeSkpO1xyXG5cclxuXHRcdFx0Ly8gUmVtb3ZlIHRoZSBxdWVyeSBwYXJ0IGZyb20gdGhlIFVSTFxyXG5cdFx0XHR1cmwgPSB1cmwucmVwbGFjZSgvXFw/Lio/KCN8JCkvLCAnJDEnKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdC8vIElzIHRoZSBoYXNoIGZyYWdtZW50IGRlZmluZWRcclxuXHRpZiAoKG0gPSB1cmwubWF0Y2goLyMoLispLywgJycpKSkge1xyXG5cdFx0dXJsID0gdXJsLnNwbGl0KCcjJylbMF07XHJcblx0XHRwLnBhdGggPSBtWzFdO1xyXG5cdH1cclxuXHRlbHNlIGlmICh1cmwgaW4gYWN0aW9ucykge1xyXG5cdFx0cC5wYXRoID0gdXJsO1xyXG5cdFx0dXJsID0gYWN0aW9uc1t1cmxdO1xyXG5cdH1cclxuXHRlbHNlIGlmICgnZGVmYXVsdCcgaW4gYWN0aW9ucykge1xyXG5cdFx0dXJsID0gYWN0aW9uc1snZGVmYXVsdCddO1xyXG5cdH1cclxuXHJcblx0Ly8gUmVkaXJlY3QgSGFuZGxlclxyXG5cdC8vIFRoaXMgZGVmaW5lcyBmb3IgdGhlIEZvcm0rSWZyYW1lK0hhc2ggaGFjayB3aGVyZSB0byByZXR1cm4gdGhlIHJlc3VsdHMgdG9vLlxyXG5cdHAucmVkaXJlY3RfdXJpID0gX3RoaXMuc2V0dGluZ3MucmVkaXJlY3RfdXJpO1xyXG5cclxuXHQvLyBEZWZpbmUgRm9ybWF0SGFuZGxlclxyXG5cdC8vIFRoZSByZXF1ZXN0IGNhbiBiZSBwcm9jZXNlZCBpbiBhIG11bHRpdHVkZSBvZiB3YXlzXHJcblx0Ly8gSGVyZSdzIHRoZSBvcHRpb25zIC0gZGVwZW5kaW5nIG9uIHRoZSBicm93c2VyIGFuZCBlbmRwb2ludFxyXG5cdHAueGhyID0gby54aHI7XHJcblx0cC5qc29ucCA9IG8uanNvbnA7XHJcblx0cC5mb3JtID0gby5mb3JtO1xyXG5cclxuXHQvLyBNYWtlIHJlcXVlc3RcclxuXHRpZiAodHlwZW9mICh1cmwpID09PSAnZnVuY3Rpb24nKSB7XHJcblx0XHQvLyBEb2VzIHNlbGYgaGF2ZSBpdHMgb3duIGNhbGxiYWNrP1xyXG5cdFx0dXJsKHAsIGdldFBhdGgpO1xyXG5cdH1cclxuXHRlbHNlIHtcclxuXHRcdC8vIEVsc2UgdGhlIFVSTCBpcyBhIHN0cmluZ1xyXG5cdFx0Z2V0UGF0aCh1cmwpO1xyXG5cdH1cclxuXHJcblx0cmV0dXJuIHByb21pc2UucHJveHk7XHJcblxyXG5cdC8vIElmIHVybCBuZWVkcyBhIGJhc2VcclxuXHQvLyBXcmFwIGV2ZXJ5dGhpbmcgaW5cclxuXHRmdW5jdGlvbiBnZXRQYXRoKHVybCkge1xyXG5cclxuXHRcdC8vIEZvcm1hdCB0aGUgc3RyaW5nIGlmIGl0IG5lZWRzIGl0XHJcblx0XHR1cmwgPSB1cmwucmVwbGFjZSgvXFxAXFx7KFthLXpcXF9cXC1dKykoXFx8Lio/KT9cXH0vZ2ksIGZ1bmN0aW9uKG0sIGtleSwgZGVmYXVsdHMpIHtcclxuXHRcdFx0dmFyIHZhbCA9IGRlZmF1bHRzID8gZGVmYXVsdHMucmVwbGFjZSgvXlxcfC8sICcnKSA6ICcnO1xyXG5cdFx0XHRpZiAoa2V5IGluIHAucXVlcnkpIHtcclxuXHRcdFx0XHR2YWwgPSBwLnF1ZXJ5W2tleV07XHJcblx0XHRcdFx0ZGVsZXRlIHAucXVlcnlba2V5XTtcclxuXHRcdFx0fVxyXG5cdFx0XHRlbHNlIGlmIChwLmRhdGEgJiYga2V5IGluIHAuZGF0YSkge1xyXG5cdFx0XHRcdHZhbCA9IHAuZGF0YVtrZXldO1xyXG5cdFx0XHRcdGRlbGV0ZSBwLmRhdGFba2V5XTtcclxuXHRcdFx0fVxyXG5cdFx0XHRlbHNlIGlmICghZGVmYXVsdHMpIHtcclxuXHRcdFx0XHRwcm9taXNlLnJlamVjdChlcnJvcignbWlzc2luZ19hdHRyaWJ1dGUnLCAnVGhlIGF0dHJpYnV0ZSAnICsga2V5ICsgJyBpcyBtaXNzaW5nIGZyb20gdGhlIHJlcXVlc3QnKSk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHJldHVybiB2YWw7XHJcblx0XHR9KTtcclxuXHJcblx0XHQvLyBBZGQgYmFzZVxyXG5cdFx0aWYgKCF1cmwubWF0Y2goL15odHRwcz86XFwvXFwvLykpIHtcclxuXHRcdFx0dXJsID0gby5iYXNlICsgdXJsO1xyXG5cdFx0fVxyXG5cclxuXHRcdC8vIERlZmluZSB0aGUgcmVxdWVzdCBVUkxcclxuXHRcdHAudXJsID0gdXJsO1xyXG5cclxuXHRcdC8vIE1ha2UgdGhlIEhUVFAgcmVxdWVzdCB3aXRoIHRoZSBjdXJhdGVkIHJlcXVlc3Qgb2JqZWN0XHJcblx0XHQvLyBDQUxMQkFDSyBIQU5ETEVSXHJcblx0XHQvLyBAIHJlc3BvbnNlIG9iamVjdFxyXG5cdFx0Ly8gQCBzdGF0dXNDb2RlIGludGVnZXIgaWYgYXZhaWxhYmxlXHJcblx0XHR1dGlscy5yZXF1ZXN0KHAsIGZ1bmN0aW9uKHIsIGhlYWRlcnMpIHtcclxuXHJcblx0XHRcdC8vIElzIHRoaXMgYSByYXcgcmVzcG9uc2U/XHJcblx0XHRcdGlmICghcC5mb3JtYXRSZXNwb25zZSkge1xyXG5cdFx0XHRcdC8vIEJhZCByZXF1ZXN0PyBlcnJvciBzdGF0dXNDb2RlIG9yIG90aGVyd2lzZSBjb250YWlucyBhbiBlcnJvciByZXNwb25zZSB2aXMgSlNPTlA/XHJcblx0XHRcdFx0aWYgKHR5cGVvZiBoZWFkZXJzID09PSAnb2JqZWN0JyA/IChoZWFkZXJzLnN0YXR1c0NvZGUgPj0gNDAwKSA6ICh0eXBlb2YgciA9PT0gJ29iamVjdCcgJiYgJ2Vycm9yJyBpbiByKSkge1xyXG5cdFx0XHRcdFx0cHJvbWlzZS5yZWplY3Qocik7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdGVsc2Uge1xyXG5cdFx0XHRcdFx0cHJvbWlzZS5mdWxmaWxsKHIpO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQvLyBTaG91bGQgdGhpcyBiZSBhbiBvYmplY3RcclxuXHRcdFx0aWYgKHIgPT09IHRydWUpIHtcclxuXHRcdFx0XHRyID0ge3N1Y2Nlc3M6dHJ1ZX07XHJcblx0XHRcdH1cclxuXHRcdFx0ZWxzZSBpZiAoIXIpIHtcclxuXHRcdFx0XHRyID0ge307XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdC8vIFRoZSBkZWxldGUgY2FsbGJhY2sgbmVlZHMgYSBiZXR0ZXIgcmVzcG9uc2VcclxuXHRcdFx0aWYgKHAubWV0aG9kID09PSAnZGVsZXRlJykge1xyXG5cdFx0XHRcdHIgPSAoIXIgfHwgdXRpbHMuaXNFbXB0eShyKSkgPyB7c3VjY2Vzczp0cnVlfSA6IHI7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdC8vIEZPUk1BVCBSRVNQT05TRT9cclxuXHRcdFx0Ly8gRG9lcyBzZWxmIHJlcXVlc3QgaGF2ZSBhIGNvcnJlc3BvbmRpbmcgZm9ybWF0dGVyXHJcblx0XHRcdGlmIChvLndyYXAgJiYgKChwLnBhdGggaW4gby53cmFwKSB8fCAoJ2RlZmF1bHQnIGluIG8ud3JhcCkpKSB7XHJcblx0XHRcdFx0dmFyIHdyYXAgPSAocC5wYXRoIGluIG8ud3JhcCA/IHAucGF0aCA6ICdkZWZhdWx0Jyk7XHJcblx0XHRcdFx0dmFyIHRpbWUgPSAobmV3IERhdGUoKSkuZ2V0VGltZSgpO1xyXG5cclxuXHRcdFx0XHQvLyBGT1JNQVQgUkVTUE9OU0VcclxuXHRcdFx0XHR2YXIgYiA9IG8ud3JhcFt3cmFwXShyLCBoZWFkZXJzLCBwKTtcclxuXHJcblx0XHRcdFx0Ly8gSGFzIHRoZSByZXNwb25zZSBiZWVuIHV0dGVybHkgb3ZlcndyaXR0ZW4/XHJcblx0XHRcdFx0Ly8gVHlwaWNhbGx5IHNlbGYgYXVnbWVudHMgdGhlIGV4aXN0aW5nIG9iamVjdC4uIGJ1dCBmb3IgdGhvc2UgcmFyZSBvY2Nhc3Npb25zXHJcblx0XHRcdFx0aWYgKGIpIHtcclxuXHRcdFx0XHRcdHIgPSBiO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0Ly8gSXMgdGhlcmUgYSBuZXh0X3BhZ2UgZGVmaW5lZCBpbiB0aGUgcmVzcG9uc2U/XHJcblx0XHRcdGlmIChyICYmICdwYWdpbmcnIGluIHIgJiYgci5wYWdpbmcubmV4dCkge1xyXG5cclxuXHRcdFx0XHQvLyBBZGQgdGhlIHJlbGF0aXZlIHBhdGggaWYgaXQgaXMgbWlzc2luZyBmcm9tIHRoZSBwYWdpbmcvbmV4dCBwYXRoXHJcblx0XHRcdFx0aWYgKHIucGFnaW5nLm5leHRbMF0gPT09ICc/Jykge1xyXG5cdFx0XHRcdFx0ci5wYWdpbmcubmV4dCA9IHAucGF0aCArIHIucGFnaW5nLm5leHQ7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHQvLyBUaGUgcmVsYXRpdmUgcGF0aCBoYXMgYmVlbiBkZWZpbmVkLCBsZXRzIG1hcmt1cCB0aGUgaGFuZGxlciBpbiB0aGUgSGFzaEZyYWdtZW50XHJcblx0XHRcdFx0ZWxzZSB7XHJcblx0XHRcdFx0XHRyLnBhZ2luZy5uZXh0ICs9ICcjJyArIHAucGF0aDtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdC8vIERpc3BhdGNoIHRvIGxpc3RlbmVyc1xyXG5cdFx0XHQvLyBFbWl0IGV2ZW50cyB3aGljaCBwZXJ0YWluIHRvIHRoZSBmb3JtYXR0ZWQgcmVzcG9uc2VcclxuXHRcdFx0aWYgKCFyIHx8ICdlcnJvcicgaW4gcikge1xyXG5cdFx0XHRcdHByb21pc2UucmVqZWN0KHIpO1xyXG5cdFx0XHR9XHJcblx0XHRcdGVsc2Uge1xyXG5cdFx0XHRcdHByb21pc2UuZnVsZmlsbChyKTtcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblx0fVxyXG59O1xyXG5cclxuLy8gQVBJIHV0aWxpdGllc1xyXG5oZWxsby51dGlscy5leHRlbmQoaGVsbG8udXRpbHMsIHtcclxuXHJcblx0Ly8gTWFrZSBhbiBIVFRQIHJlcXVlc3RcclxuXHRyZXF1ZXN0OiBmdW5jdGlvbihwLCBjYWxsYmFjaykge1xyXG5cclxuXHRcdHZhciBfdGhpcyA9IHRoaXM7XHJcblx0XHR2YXIgZXJyb3IgPSBfdGhpcy5lcnJvcjtcclxuXHJcblx0XHQvLyBUaGlzIGhhcyB0byBnbyB0aHJvdWdoIGEgUE9TVCByZXF1ZXN0XHJcblx0XHRpZiAoIV90aGlzLmlzRW1wdHkocC5kYXRhKSAmJiAhKCdGaWxlTGlzdCcgaW4gd2luZG93KSAmJiBfdGhpcy5oYXNCaW5hcnkocC5kYXRhKSkge1xyXG5cclxuXHRcdFx0Ly8gRGlzYWJsZSBYSFIgYW5kIEpTT05QXHJcblx0XHRcdHAueGhyID0gZmFsc2U7XHJcblx0XHRcdHAuanNvbnAgPSBmYWxzZTtcclxuXHRcdH1cclxuXHJcblx0XHQvLyBDaGVjayBpZiB0aGUgYnJvd3NlciBhbmQgc2VydmljZSBzdXBwb3J0IENPUlNcclxuXHRcdHZhciBjb3JzID0gdGhpcy5yZXF1ZXN0X2NvcnMoZnVuY3Rpb24oKSB7XHJcblx0XHRcdC8vIElmIGl0IGRvZXMgdGhlbiBydW4gdGhpcy4uLlxyXG5cdFx0XHRyZXR1cm4gKChwLnhociA9PT0gdW5kZWZpbmVkKSB8fCAocC54aHIgJiYgKHR5cGVvZiAocC54aHIpICE9PSAnZnVuY3Rpb24nIHx8IHAueGhyKHAsIHAucXVlcnkpKSkpO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0aWYgKGNvcnMpIHtcclxuXHJcblx0XHRcdGZvcm1hdFVybChwLCBmdW5jdGlvbih1cmwpIHtcclxuXHJcblx0XHRcdFx0dmFyIHggPSBfdGhpcy54aHIocC5tZXRob2QsIHVybCwgcC5oZWFkZXJzLCBwLmRhdGEsIGNhbGxiYWNrKTtcclxuXHRcdFx0XHR4Lm9ucHJvZ3Jlc3MgPSBwLm9ucHJvZ3Jlc3MgfHwgbnVsbDtcclxuXHJcblx0XHRcdFx0Ly8gV2luZG93cyBQaG9uZSBkb2VzIG5vdCBzdXBwb3J0IHhoci51cGxvYWQsIHNlZSAjNzRcclxuXHRcdFx0XHQvLyBGZWF0dXJlIGRldGVjdFxyXG5cdFx0XHRcdGlmICh4LnVwbG9hZCAmJiBwLm9udXBsb2FkcHJvZ3Jlc3MpIHtcclxuXHRcdFx0XHRcdHgudXBsb2FkLm9ucHJvZ3Jlc3MgPSBwLm9udXBsb2FkcHJvZ3Jlc3M7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0fSk7XHJcblxyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gQ2xvbmUgdGhlIHF1ZXJ5IG9iamVjdFxyXG5cdFx0Ly8gRWFjaCByZXF1ZXN0IG1vZGlmaWVzIHRoZSBxdWVyeSBvYmplY3QgYW5kIG5lZWRzIHRvIGJlIHRhcmVkIGFmdGVyIGVhY2ggb25lLlxyXG5cdFx0dmFyIF9xdWVyeSA9IHAucXVlcnk7XHJcblxyXG5cdFx0cC5xdWVyeSA9IF90aGlzLmNsb25lKHAucXVlcnkpO1xyXG5cclxuXHRcdC8vIEFzc2lnbiBhIG5ldyBjYWxsYmFja0lEXHJcblx0XHRwLmNhbGxiYWNrSUQgPSBfdGhpcy5nbG9iYWxFdmVudCgpO1xyXG5cclxuXHRcdC8vIEpTT05QXHJcblx0XHRpZiAocC5qc29ucCAhPT0gZmFsc2UpIHtcclxuXHJcblx0XHRcdC8vIENsb25lIHRoZSBxdWVyeSBvYmplY3RcclxuXHRcdFx0cC5xdWVyeS5jYWxsYmFjayA9IHAuY2FsbGJhY2tJRDtcclxuXHJcblx0XHRcdC8vIElmIHRoZSBKU09OUCBpcyBhIGZ1bmN0aW9uIHRoZW4gcnVuIGl0XHJcblx0XHRcdGlmICh0eXBlb2YgKHAuanNvbnApID09PSAnZnVuY3Rpb24nKSB7XHJcblx0XHRcdFx0cC5qc29ucChwLCBwLnF1ZXJ5KTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0Ly8gTGV0cyB1c2UgSlNPTlAgaWYgdGhlIG1ldGhvZCBpcyAnZ2V0J1xyXG5cdFx0XHRpZiAocC5tZXRob2QgPT09ICdnZXQnKSB7XHJcblxyXG5cdFx0XHRcdGZvcm1hdFVybChwLCBmdW5jdGlvbih1cmwpIHtcclxuXHRcdFx0XHRcdF90aGlzLmpzb25wKHVybCwgY2FsbGJhY2ssIHAuY2FsbGJhY2tJRCwgcC50aW1lb3V0KTtcclxuXHRcdFx0XHR9KTtcclxuXHJcblx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHR9XHJcblx0XHRcdGVsc2Uge1xyXG5cdFx0XHRcdC8vIEl0J3Mgbm90IGNvbXBhdGlibGUgcmVzZXQgcXVlcnlcclxuXHRcdFx0XHRwLnF1ZXJ5ID0gX3F1ZXJ5O1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0fVxyXG5cclxuXHRcdC8vIE90aGVyd2lzZSB3ZSdyZSBvbiB0byB0aGUgb2xkIHNjaG9vbCwgaWZyYW1lIGhhY2tzIGFuZCBKU09OUFxyXG5cdFx0aWYgKHAuZm9ybSAhPT0gZmFsc2UpIHtcclxuXHJcblx0XHRcdC8vIEFkZCBzb21lIGFkZGl0aW9uYWwgcXVlcnkgcGFyYW1ldGVycyB0byB0aGUgVVJMXHJcblx0XHRcdC8vIFdlJ3JlIHByZXR0eSBzdHVmZmVkIGlmIHRoZSBlbmRwb2ludCBkb2Vzbid0IGxpa2UgdGhlc2VcclxuXHRcdFx0cC5xdWVyeS5yZWRpcmVjdF91cmkgPSBwLnJlZGlyZWN0X3VyaTtcclxuXHRcdFx0cC5xdWVyeS5zdGF0ZSA9IEpTT04uc3RyaW5naWZ5KHtjYWxsYmFjazpwLmNhbGxiYWNrSUR9KTtcclxuXHJcblx0XHRcdHZhciBvcHRzO1xyXG5cclxuXHRcdFx0aWYgKHR5cGVvZiAocC5mb3JtKSA9PT0gJ2Z1bmN0aW9uJykge1xyXG5cclxuXHRcdFx0XHQvLyBGb3JtYXQgdGhlIHJlcXVlc3RcclxuXHRcdFx0XHRvcHRzID0gcC5mb3JtKHAsIHAucXVlcnkpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZiAocC5tZXRob2QgPT09ICdwb3N0JyAmJiBvcHRzICE9PSBmYWxzZSkge1xyXG5cclxuXHRcdFx0XHRmb3JtYXRVcmwocCwgZnVuY3Rpb24odXJsKSB7XHJcblx0XHRcdFx0XHRfdGhpcy5wb3N0KHVybCwgcC5kYXRhLCBvcHRzLCBjYWxsYmFjaywgcC5jYWxsYmFja0lELCBwLnRpbWVvdXQpO1xyXG5cdFx0XHRcdH0pO1xyXG5cclxuXHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHQvLyBOb25lIG9mIHRoZSBtZXRob2RzIHdlcmUgc3VjY2Vzc2Z1bCB0aHJvdyBhbiBlcnJvclxyXG5cdFx0Y2FsbGJhY2soZXJyb3IoJ2ludmFsaWRfcmVxdWVzdCcsICdUaGVyZSB3YXMgbm8gbWVjaGFuaXNtIGZvciBoYW5kbGluZyB0aGlzIHJlcXVlc3QnKSk7XHJcblxyXG5cdFx0cmV0dXJuO1xyXG5cclxuXHRcdC8vIEZvcm1hdCBVUkxcclxuXHRcdC8vIENvbnN0cnVjdHMgdGhlIHJlcXVlc3QgVVJMLCBvcHRpb25hbGx5IHdyYXBzIHRoZSBVUkwgdGhyb3VnaCBhIGNhbGwgdG8gYSBwcm94eSBzZXJ2ZXJcclxuXHRcdC8vIFJldHVybnMgdGhlIGZvcm1hdHRlZCBVUkxcclxuXHRcdGZ1bmN0aW9uIGZvcm1hdFVybChwLCBjYWxsYmFjaykge1xyXG5cclxuXHRcdFx0Ly8gQXJlIHdlIHNpZ25pbmcgdGhlIHJlcXVlc3Q/XHJcblx0XHRcdHZhciBzaWduO1xyXG5cclxuXHRcdFx0Ly8gT0F1dGgxXHJcblx0XHRcdC8vIFJlbW92ZSB0aGUgdG9rZW4gZnJvbSB0aGUgcXVlcnkgYmVmb3JlIHNpZ25pbmdcclxuXHRcdFx0aWYgKHAuYXV0aFJlc3BvbnNlICYmIHAuYXV0aFJlc3BvbnNlLm9hdXRoICYmIHBhcnNlSW50KHAuYXV0aFJlc3BvbnNlLm9hdXRoLnZlcnNpb24sIDEwKSA9PT0gMSkge1xyXG5cclxuXHRcdFx0XHQvLyBPQVVUSCBTSUdOSU5HIFBST1hZXHJcblx0XHRcdFx0c2lnbiA9IHAucXVlcnkuYWNjZXNzX3Rva2VuO1xyXG5cclxuXHRcdFx0XHQvLyBSZW1vdmUgdGhlIGFjY2Vzc190b2tlblxyXG5cdFx0XHRcdGRlbGV0ZSBwLnF1ZXJ5LmFjY2Vzc190b2tlbjtcclxuXHJcblx0XHRcdFx0Ly8gRW5mb3JlIHVzZSBvZiBQcm94eVxyXG5cdFx0XHRcdHAucHJveHkgPSB0cnVlO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQvLyBQT1NUIGJvZHkgdG8gcXVlcnlzdHJpbmdcclxuXHRcdFx0aWYgKHAuZGF0YSAmJiAocC5tZXRob2QgPT09ICdnZXQnIHx8IHAubWV0aG9kID09PSAnZGVsZXRlJykpIHtcclxuXHRcdFx0XHQvLyBBdHRhY2ggdGhlIHAuZGF0YSB0byB0aGUgcXVlcnlzdHJpbmcuXHJcblx0XHRcdFx0X3RoaXMuZXh0ZW5kKHAucXVlcnksIHAuZGF0YSk7XHJcblx0XHRcdFx0cC5kYXRhID0gbnVsbDtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0Ly8gQ29uc3RydWN0IHRoZSBwYXRoXHJcblx0XHRcdHZhciBwYXRoID0gX3RoaXMucXMocC51cmwsIHAucXVlcnkpO1xyXG5cclxuXHRcdFx0Ly8gUHJveHkgdGhlIHJlcXVlc3QgdGhyb3VnaCBhIHNlcnZlclxyXG5cdFx0XHQvLyBVc2VkIGZvciBzaWduaW5nIE9BdXRoMVxyXG5cdFx0XHQvLyBBbmQgY2lyY3VtdmVudGluZyBzZXJ2aWNlcyB3aXRob3V0IEFjY2Vzcy1Db250cm9sIEhlYWRlcnNcclxuXHRcdFx0aWYgKHAucHJveHkpIHtcclxuXHRcdFx0XHQvLyBVc2UgdGhlIHByb3h5IGFzIGEgcGF0aFxyXG5cdFx0XHRcdHBhdGggPSBfdGhpcy5xcyhwLm9hdXRoX3Byb3h5LCB7XHJcblx0XHRcdFx0XHRwYXRoOiBwYXRoLFxyXG5cdFx0XHRcdFx0YWNjZXNzX3Rva2VuOiBzaWduIHx8ICcnLFxyXG5cclxuXHRcdFx0XHRcdC8vIFRoaXMgd2lsbCBwcm9tcHQgdGhlIHJlcXVlc3QgdG8gYmUgc2lnbmVkIGFzIHRob3VnaCBpdCBpcyBPQXV0aDFcclxuXHRcdFx0XHRcdHRoZW46IHAucHJveHlfcmVzcG9uc2VfdHlwZSB8fCAocC5tZXRob2QudG9Mb3dlckNhc2UoKSA9PT0gJ2dldCcgPyAncmVkaXJlY3QnIDogJ3Byb3h5JyksXHJcblx0XHRcdFx0XHRtZXRob2Q6IHAubWV0aG9kLnRvTG93ZXJDYXNlKCksXHJcblx0XHRcdFx0XHRzdXBwcmVzc19yZXNwb25zZV9jb2RlczogdHJ1ZVxyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRjYWxsYmFjayhwYXRoKTtcclxuXHRcdH1cclxuXHR9LFxyXG5cclxuXHQvLyBUZXN0IHdoZXRoZXIgdGhlIGJyb3dzZXIgc3VwcG9ydHMgdGhlIENPUlMgcmVzcG9uc2VcclxuXHRyZXF1ZXN0X2NvcnM6IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XHJcblx0XHRyZXR1cm4gJ3dpdGhDcmVkZW50aWFscycgaW4gbmV3IFhNTEh0dHBSZXF1ZXN0KCkgJiYgY2FsbGJhY2soKTtcclxuXHR9LFxyXG5cclxuXHQvLyBSZXR1cm4gdGhlIHR5cGUgb2YgRE9NIG9iamVjdFxyXG5cdGRvbUluc3RhbmNlOiBmdW5jdGlvbih0eXBlLCBkYXRhKSB7XHJcblx0XHR2YXIgdGVzdCA9ICdIVE1MJyArICh0eXBlIHx8ICcnKS5yZXBsYWNlKFxyXG5cdFx0XHQvXlthLXpdLyxcclxuXHRcdFx0ZnVuY3Rpb24obSkge1xyXG5cdFx0XHRcdHJldHVybiBtLnRvVXBwZXJDYXNlKCk7XHJcblx0XHRcdH1cclxuXHJcblx0XHQpICsgJ0VsZW1lbnQnO1xyXG5cclxuXHRcdGlmICghZGF0YSkge1xyXG5cdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKHdpbmRvd1t0ZXN0XSkge1xyXG5cdFx0XHRyZXR1cm4gZGF0YSBpbnN0YW5jZW9mIHdpbmRvd1t0ZXN0XTtcclxuXHRcdH1cclxuXHRcdGVsc2UgaWYgKHdpbmRvdy5FbGVtZW50KSB7XHJcblx0XHRcdHJldHVybiBkYXRhIGluc3RhbmNlb2Ygd2luZG93LkVsZW1lbnQgJiYgKCF0eXBlIHx8IChkYXRhLnRhZ05hbWUgJiYgZGF0YS50YWdOYW1lLnRvTG93ZXJDYXNlKCkgPT09IHR5cGUpKTtcclxuXHRcdH1cclxuXHRcdGVsc2Uge1xyXG5cdFx0XHRyZXR1cm4gKCEoZGF0YSBpbnN0YW5jZW9mIE9iamVjdCB8fCBkYXRhIGluc3RhbmNlb2YgQXJyYXkgfHwgZGF0YSBpbnN0YW5jZW9mIFN0cmluZyB8fCBkYXRhIGluc3RhbmNlb2YgTnVtYmVyKSAmJiBkYXRhLnRhZ05hbWUgJiYgZGF0YS50YWdOYW1lLnRvTG93ZXJDYXNlKCkgPT09IHR5cGUpO1xyXG5cdFx0fVxyXG5cdH0sXHJcblxyXG5cdC8vIENyZWF0ZSBhIGNsb25lIG9mIGFuIG9iamVjdFxyXG5cdGNsb25lOiBmdW5jdGlvbihvYmopIHtcclxuXHRcdC8vIERvZXMgbm90IGNsb25lIERPTSBlbGVtZW50cywgbm9yIEJpbmFyeSBkYXRhLCBlLmcuIEJsb2JzLCBGaWxlbGlzdHNcclxuXHRcdGlmIChvYmogPT09IG51bGwgfHwgdHlwZW9mIChvYmopICE9PSAnb2JqZWN0JyB8fCBvYmogaW5zdGFuY2VvZiBEYXRlIHx8ICdub2RlTmFtZScgaW4gb2JqIHx8IHRoaXMuaXNCaW5hcnkob2JqKSB8fCAodHlwZW9mIEZvcm1EYXRhID09PSAnZnVuY3Rpb24nICYmIG9iaiBpbnN0YW5jZW9mIEZvcm1EYXRhKSkge1xyXG5cdFx0XHRyZXR1cm4gb2JqO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmIChBcnJheS5pc0FycmF5KG9iaikpIHtcclxuXHRcdFx0Ly8gQ2xvbmUgZWFjaCBpdGVtIGluIHRoZSBhcnJheVxyXG5cdFx0XHRyZXR1cm4gb2JqLm1hcCh0aGlzLmNsb25lLmJpbmQodGhpcykpO1xyXG5cdFx0fVxyXG5cclxuXHRcdC8vIEJ1dCBkb2VzIGNsb25lIGV2ZXJ5dGhpbmcgZWxzZS5cclxuXHRcdHZhciBjbG9uZSA9IHt9O1xyXG5cdFx0Zm9yICh2YXIgeCBpbiBvYmopIHtcclxuXHRcdFx0Y2xvbmVbeF0gPSB0aGlzLmNsb25lKG9ialt4XSk7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIGNsb25lO1xyXG5cdH0sXHJcblxyXG5cdC8vIFhIUjogdXNlcyBDT1JTIHRvIG1ha2UgcmVxdWVzdHNcclxuXHR4aHI6IGZ1bmN0aW9uKG1ldGhvZCwgdXJsLCBoZWFkZXJzLCBkYXRhLCBjYWxsYmFjaykge1xyXG5cclxuXHRcdHZhciByID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XHJcblx0XHR2YXIgZXJyb3IgPSB0aGlzLmVycm9yO1xyXG5cclxuXHRcdC8vIEJpbmFyeT9cclxuXHRcdHZhciBiaW5hcnkgPSBmYWxzZTtcclxuXHRcdGlmIChtZXRob2QgPT09ICdibG9iJykge1xyXG5cdFx0XHRiaW5hcnkgPSBtZXRob2Q7XHJcblx0XHRcdG1ldGhvZCA9ICdHRVQnO1xyXG5cdFx0fVxyXG5cclxuXHRcdG1ldGhvZCA9IG1ldGhvZC50b1VwcGVyQ2FzZSgpO1xyXG5cclxuXHRcdC8vIFhoci5yZXNwb25zZVR5cGUgJ2pzb24nIGlzIG5vdCBzdXBwb3J0ZWQgaW4gYW55IG9mIHRoZSB2ZW5kb3JzIHlldC5cclxuXHRcdHIub25sb2FkID0gZnVuY3Rpb24oZSkge1xyXG5cdFx0XHR2YXIganNvbiA9IHIucmVzcG9uc2U7XHJcblx0XHRcdHRyeSB7XHJcblx0XHRcdFx0anNvbiA9IEpTT04ucGFyc2Uoci5yZXNwb25zZVRleHQpO1xyXG5cdFx0XHR9XHJcblx0XHRcdGNhdGNoIChfZSkge1xyXG5cdFx0XHRcdGlmIChyLnN0YXR1cyA9PT0gNDAxKSB7XHJcblx0XHRcdFx0XHRqc29uID0gZXJyb3IoJ2FjY2Vzc19kZW5pZWQnLCByLnN0YXR1c1RleHQpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0dmFyIGhlYWRlcnMgPSBoZWFkZXJzVG9KU09OKHIuZ2V0QWxsUmVzcG9uc2VIZWFkZXJzKCkpO1xyXG5cdFx0XHRoZWFkZXJzLnN0YXR1c0NvZGUgPSByLnN0YXR1cztcclxuXHJcblx0XHRcdGNhbGxiYWNrKGpzb24gfHwgKG1ldGhvZCA9PT0gJ0dFVCcgPyBlcnJvcignZW1wdHlfcmVzcG9uc2UnLCAnQ291bGQgbm90IGdldCByZXNvdXJjZScpIDoge30pLCBoZWFkZXJzKTtcclxuXHRcdH07XHJcblxyXG5cdFx0ci5vbmVycm9yID0gZnVuY3Rpb24oZSkge1xyXG5cdFx0XHR2YXIganNvbiA9IHIucmVzcG9uc2VUZXh0O1xyXG5cdFx0XHR0cnkge1xyXG5cdFx0XHRcdGpzb24gPSBKU09OLnBhcnNlKHIucmVzcG9uc2VUZXh0KTtcclxuXHRcdFx0fVxyXG5cdFx0XHRjYXRjaCAoX2UpIHt9XHJcblxyXG5cdFx0XHRjYWxsYmFjayhqc29uIHx8IGVycm9yKCdhY2Nlc3NfZGVuaWVkJywgJ0NvdWxkIG5vdCBnZXQgcmVzb3VyY2UnKSk7XHJcblx0XHR9O1xyXG5cclxuXHRcdHZhciB4O1xyXG5cclxuXHRcdC8vIFNob3VsZCB3ZSBhZGQgdGhlIHF1ZXJ5IHRvIHRoZSBVUkw/XHJcblx0XHRpZiAobWV0aG9kID09PSAnR0VUJyB8fCBtZXRob2QgPT09ICdERUxFVEUnKSB7XHJcblx0XHRcdGRhdGEgPSBudWxsO1xyXG5cdFx0fVxyXG5cdFx0ZWxzZSBpZiAoZGF0YSAmJiB0eXBlb2YgKGRhdGEpICE9PSAnc3RyaW5nJyAmJiAhKGRhdGEgaW5zdGFuY2VvZiBGb3JtRGF0YSkgJiYgIShkYXRhIGluc3RhbmNlb2YgRmlsZSkgJiYgIShkYXRhIGluc3RhbmNlb2YgQmxvYikpIHtcclxuXHRcdFx0Ly8gTG9vcCB0aHJvdWdoIGFuZCBhZGQgZm9ybURhdGFcclxuXHRcdFx0dmFyIGYgPSBuZXcgRm9ybURhdGEoKTtcclxuXHRcdFx0Zm9yICh4IGluIGRhdGEpIGlmIChkYXRhLmhhc093blByb3BlcnR5KHgpKSB7XHJcblx0XHRcdFx0aWYgKGRhdGFbeF0gaW5zdGFuY2VvZiBIVE1MSW5wdXRFbGVtZW50KSB7XHJcblx0XHRcdFx0XHRpZiAoJ2ZpbGVzJyBpbiBkYXRhW3hdICYmIGRhdGFbeF0uZmlsZXMubGVuZ3RoID4gMCkge1xyXG5cdFx0XHRcdFx0XHRmLmFwcGVuZCh4LCBkYXRhW3hdLmZpbGVzWzBdKTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0ZWxzZSBpZiAoZGF0YVt4XSBpbnN0YW5jZW9mIEJsb2IpIHtcclxuXHRcdFx0XHRcdGYuYXBwZW5kKHgsIGRhdGFbeF0sIGRhdGEubmFtZSk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdGVsc2Uge1xyXG5cdFx0XHRcdFx0Zi5hcHBlbmQoeCwgZGF0YVt4XSk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRkYXRhID0gZjtcclxuXHRcdH1cclxuXHJcblx0XHQvLyBPcGVuIHRoZSBwYXRoLCBhc3luY1xyXG5cdFx0ci5vcGVuKG1ldGhvZCwgdXJsLCB0cnVlKTtcclxuXHJcblx0XHRpZiAoYmluYXJ5KSB7XHJcblx0XHRcdGlmICgncmVzcG9uc2VUeXBlJyBpbiByKSB7XHJcblx0XHRcdFx0ci5yZXNwb25zZVR5cGUgPSBiaW5hcnk7XHJcblx0XHRcdH1cclxuXHRcdFx0ZWxzZSB7XHJcblx0XHRcdFx0ci5vdmVycmlkZU1pbWVUeXBlKCd0ZXh0L3BsYWluOyBjaGFyc2V0PXgtdXNlci1kZWZpbmVkJyk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHQvLyBTZXQgYW55IGJlc3Bva2UgaGVhZGVyc1xyXG5cdFx0aWYgKGhlYWRlcnMpIHtcclxuXHRcdFx0Zm9yICh4IGluIGhlYWRlcnMpIHtcclxuXHRcdFx0XHRyLnNldFJlcXVlc3RIZWFkZXIoeCwgaGVhZGVyc1t4XSk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHRyLnNlbmQoZGF0YSk7XHJcblxyXG5cdFx0cmV0dXJuIHI7XHJcblxyXG5cdFx0Ly8gSGVhZGVycyBhcmUgcmV0dXJuZWQgYXMgYSBzdHJpbmdcclxuXHRcdGZ1bmN0aW9uIGhlYWRlcnNUb0pTT04ocykge1xyXG5cdFx0XHR2YXIgciA9IHt9O1xyXG5cdFx0XHR2YXIgcmVnID0gLyhbYS16XFwtXSspOlxccz8oLiopOz8vZ2k7XHJcblx0XHRcdHZhciBtO1xyXG5cdFx0XHR3aGlsZSAoKG0gPSByZWcuZXhlYyhzKSkpIHtcclxuXHRcdFx0XHRyW21bMV1dID0gbVsyXTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0cmV0dXJuIHI7XHJcblx0XHR9XHJcblx0fSxcclxuXHJcblx0Ly8gSlNPTlBcclxuXHQvLyBJbmplY3RzIGEgc2NyaXB0IHRhZyBpbnRvIHRoZSBET00gdG8gYmUgZXhlY3V0ZWQgYW5kIGFwcGVuZHMgYSBjYWxsYmFjayBmdW5jdGlvbiB0byB0aGUgd2luZG93IG9iamVjdFxyXG5cdC8vIEBwYXJhbSBzdHJpbmcvZnVuY3Rpb24gcGF0aEZ1bmMgZWl0aGVyIGEgc3RyaW5nIG9mIHRoZSBVUkwgb3IgYSBjYWxsYmFjayBmdW5jdGlvbiBwYXRoRnVuYyhxdWVyeXN0cmluZ2hhc2gsIGNvbnRpbnVlRnVuYyk7XHJcblx0Ly8gQHBhcmFtIGZ1bmN0aW9uIGNhbGxiYWNrIGEgZnVuY3Rpb24gdG8gY2FsbCBvbiBjb21wbGV0aW9uO1xyXG5cdGpzb25wOiBmdW5jdGlvbih1cmwsIGNhbGxiYWNrLCBjYWxsYmFja0lELCB0aW1lb3V0KSB7XHJcblxyXG5cdFx0dmFyIF90aGlzID0gdGhpcztcclxuXHRcdHZhciBlcnJvciA9IF90aGlzLmVycm9yO1xyXG5cclxuXHRcdC8vIENoYW5nZSB0aGUgbmFtZSBvZiB0aGUgY2FsbGJhY2tcclxuXHRcdHZhciBib29sID0gMDtcclxuXHRcdHZhciBoZWFkID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2hlYWQnKVswXTtcclxuXHRcdHZhciBvcGVyYUZpeDtcclxuXHRcdHZhciByZXN1bHQgPSBlcnJvcignc2VydmVyX2Vycm9yJywgJ3NlcnZlcl9lcnJvcicpO1xyXG5cdFx0dmFyIGNiID0gZnVuY3Rpb24oKSB7XHJcblx0XHRcdGlmICghKGJvb2wrKykpIHtcclxuXHRcdFx0XHR3aW5kb3cuc2V0VGltZW91dChmdW5jdGlvbigpIHtcclxuXHRcdFx0XHRcdGNhbGxiYWNrKHJlc3VsdCk7XHJcblx0XHRcdFx0XHRoZWFkLnJlbW92ZUNoaWxkKHNjcmlwdCk7XHJcblx0XHRcdFx0fSwgMCk7XHJcblx0XHRcdH1cclxuXHJcblx0XHR9O1xyXG5cclxuXHRcdC8vIEFkZCBjYWxsYmFjayB0byB0aGUgd2luZG93IG9iamVjdFxyXG5cdFx0Y2FsbGJhY2tJRCA9IF90aGlzLmdsb2JhbEV2ZW50KGZ1bmN0aW9uKGpzb24pIHtcclxuXHRcdFx0cmVzdWx0ID0ganNvbjtcclxuXHRcdFx0cmV0dXJuIHRydWU7XHJcblxyXG5cdFx0XHQvLyBNYXJrIGNhbGxiYWNrIGFzIGRvbmVcclxuXHRcdH0sIGNhbGxiYWNrSUQpO1xyXG5cclxuXHRcdC8vIFRoZSBVUkwgaXMgYSBmdW5jdGlvbiBmb3Igc29tZSBjYXNlcyBhbmQgYXMgc3VjaFxyXG5cdFx0Ly8gRGV0ZXJtaW5lIGl0cyB2YWx1ZSB3aXRoIGEgY2FsbGJhY2sgY29udGFpbmluZyB0aGUgbmV3IHBhcmFtZXRlcnMgb2YgdGhpcyBmdW5jdGlvbi5cclxuXHRcdHVybCA9IHVybC5yZXBsYWNlKG5ldyBSZWdFeHAoJz1cXFxcPygmfCQpJyksICc9JyArIGNhbGxiYWNrSUQgKyAnJDEnKTtcclxuXHJcblx0XHQvLyBCdWlsZCBzY3JpcHQgdGFnXHJcblx0XHR2YXIgc2NyaXB0ID0gX3RoaXMuYXBwZW5kKCdzY3JpcHQnLCB7XHJcblx0XHRcdGlkOiBjYWxsYmFja0lELFxyXG5cdFx0XHRuYW1lOiBjYWxsYmFja0lELFxyXG5cdFx0XHRzcmM6IHVybCxcclxuXHRcdFx0YXN5bmM6IHRydWUsXHJcblx0XHRcdG9ubG9hZDogY2IsXHJcblx0XHRcdG9uZXJyb3I6IGNiLFxyXG5cdFx0XHRvbnJlYWR5c3RhdGVjaGFuZ2U6IGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdGlmICgvbG9hZGVkfGNvbXBsZXRlL2kudGVzdCh0aGlzLnJlYWR5U3RhdGUpKSB7XHJcblx0XHRcdFx0XHRjYigpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblxyXG5cdFx0Ly8gT3BlcmEgZml4IGVycm9yXHJcblx0XHQvLyBQcm9ibGVtOiBJZiBhbiBlcnJvciBvY2N1cnMgd2l0aCBzY3JpcHQgbG9hZGluZyBPcGVyYSBmYWlscyB0byB0cmlnZ2VyIHRoZSBzY3JpcHQub25lcnJvciBoYW5kbGVyIHdlIHNwZWNpZmllZFxyXG5cdFx0Ly9cclxuXHRcdC8vIEZpeDpcclxuXHRcdC8vIEJ5IHNldHRpbmcgdGhlIHJlcXVlc3QgdG8gc3luY2hyb25vdXMgd2UgY2FuIHRyaWdnZXIgdGhlIGVycm9yIGhhbmRsZXIgd2hlbiBhbGwgZWxzZSBmYWlscy5cclxuXHRcdC8vIFRoaXMgYWN0aW9uIHdpbGwgYmUgaWdub3JlZCBpZiB3ZSd2ZSBhbHJlYWR5IGNhbGxlZCB0aGUgY2FsbGJhY2sgaGFuZGxlciBcImNiXCIgd2l0aCBhIHN1Y2Nlc3NmdWwgb25sb2FkIGV2ZW50XHJcblx0XHRpZiAod2luZG93Lm5hdmlnYXRvci51c2VyQWdlbnQudG9Mb3dlckNhc2UoKS5pbmRleE9mKCdvcGVyYScpID4gLTEpIHtcclxuXHRcdFx0b3BlcmFGaXggPSBfdGhpcy5hcHBlbmQoJ3NjcmlwdCcsIHtcclxuXHRcdFx0XHR0ZXh0OiAnZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXFwnJyArIGNhbGxiYWNrSUQgKyAnXFwnKS5vbmVycm9yKCk7J1xyXG5cdFx0XHR9KTtcclxuXHRcdFx0c2NyaXB0LmFzeW5jID0gZmFsc2U7XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gQWRkIHRpbWVvdXRcclxuXHRcdGlmICh0aW1lb3V0KSB7XHJcblx0XHRcdHdpbmRvdy5zZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdHJlc3VsdCA9IGVycm9yKCd0aW1lb3V0JywgJ3RpbWVvdXQnKTtcclxuXHRcdFx0XHRjYigpO1xyXG5cdFx0XHR9LCB0aW1lb3V0KTtcclxuXHRcdH1cclxuXHJcblx0XHQvLyBUT0RPOiBhZGQgZml4IGZvciBJRSxcclxuXHRcdC8vIEhvd2V2ZXI6IHVuYWJsZSByZWNyZWF0ZSB0aGUgYnVnIG9mIGZpcmluZyBvZmYgdGhlIG9ucmVhZHlzdGF0ZWNoYW5nZSBiZWZvcmUgdGhlIHNjcmlwdCBjb250ZW50IGhhcyBiZWVuIGV4ZWN1dGVkIGFuZCB0aGUgdmFsdWUgb2YgXCJyZXN1bHRcIiBoYXMgYmVlbiBkZWZpbmVkLlxyXG5cdFx0Ly8gSW5qZWN0IHNjcmlwdCB0YWcgaW50byB0aGUgaGVhZCBlbGVtZW50XHJcblx0XHRoZWFkLmFwcGVuZENoaWxkKHNjcmlwdCk7XHJcblxyXG5cdFx0Ly8gQXBwZW5kIE9wZXJhIEZpeCB0byBydW4gYWZ0ZXIgb3VyIHNjcmlwdFxyXG5cdFx0aWYgKG9wZXJhRml4KSB7XHJcblx0XHRcdGhlYWQuYXBwZW5kQ2hpbGQob3BlcmFGaXgpO1xyXG5cdFx0fVxyXG5cdH0sXHJcblxyXG5cdC8vIFBvc3RcclxuXHQvLyBTZW5kIGluZm9ybWF0aW9uIHRvIGEgcmVtb3RlIGxvY2F0aW9uIHVzaW5nIHRoZSBwb3N0IG1lY2hhbmlzbVxyXG5cdC8vIEBwYXJhbSBzdHJpbmcgdXJpIHBhdGhcclxuXHQvLyBAcGFyYW0gb2JqZWN0IGRhdGEsIGtleSB2YWx1ZSBkYXRhIHRvIHNlbmRcclxuXHQvLyBAcGFyYW0gZnVuY3Rpb24gY2FsbGJhY2ssIGZ1bmN0aW9uIHRvIGV4ZWN1dGUgaW4gcmVzcG9uc2VcclxuXHRwb3N0OiBmdW5jdGlvbih1cmwsIGRhdGEsIG9wdGlvbnMsIGNhbGxiYWNrLCBjYWxsYmFja0lELCB0aW1lb3V0KSB7XHJcblxyXG5cdFx0dmFyIF90aGlzID0gdGhpcztcclxuXHRcdHZhciBlcnJvciA9IF90aGlzLmVycm9yO1xyXG5cdFx0dmFyIGRvYyA9IGRvY3VtZW50O1xyXG5cclxuXHRcdC8vIFRoaXMgaGFjayBuZWVkcyBhIGZvcm1cclxuXHRcdHZhciBmb3JtID0gbnVsbDtcclxuXHRcdHZhciByZWVuYWJsZUFmdGVyU3VibWl0ID0gW107XHJcblx0XHR2YXIgbmV3Zm9ybTtcclxuXHRcdHZhciBpID0gMDtcclxuXHRcdHZhciB4ID0gbnVsbDtcclxuXHRcdHZhciBib29sID0gMDtcclxuXHRcdHZhciBjYiA9IGZ1bmN0aW9uKHIpIHtcclxuXHRcdFx0aWYgKCEoYm9vbCsrKSkge1xyXG5cdFx0XHRcdGNhbGxiYWNrKHIpO1xyXG5cdFx0XHR9XHJcblx0XHR9O1xyXG5cclxuXHRcdC8vIFdoYXQgaXMgdGhlIG5hbWUgb2YgdGhlIGNhbGxiYWNrIHRvIGNvbnRhaW5cclxuXHRcdC8vIFdlJ2xsIGFsc28gdXNlIHRoaXMgdG8gbmFtZSB0aGUgaWZyYW1lXHJcblx0XHRfdGhpcy5nbG9iYWxFdmVudChjYiwgY2FsbGJhY2tJRCk7XHJcblxyXG5cdFx0Ly8gQnVpbGQgdGhlIGlmcmFtZSB3aW5kb3dcclxuXHRcdHZhciB3aW47XHJcblx0XHR0cnkge1xyXG5cdFx0XHQvLyBJRTcgaGFjaywgb25seSBsZXRzIHVzIGRlZmluZSB0aGUgbmFtZSBoZXJlLCBub3QgbGF0ZXIuXHJcblx0XHRcdHdpbiA9IGRvYy5jcmVhdGVFbGVtZW50KCc8aWZyYW1lIG5hbWU9XCInICsgY2FsbGJhY2tJRCArICdcIj4nKTtcclxuXHRcdH1cclxuXHRcdGNhdGNoIChlKSB7XHJcblx0XHRcdHdpbiA9IGRvYy5jcmVhdGVFbGVtZW50KCdpZnJhbWUnKTtcclxuXHRcdH1cclxuXHJcblx0XHR3aW4ubmFtZSA9IGNhbGxiYWNrSUQ7XHJcblx0XHR3aW4uaWQgPSBjYWxsYmFja0lEO1xyXG5cdFx0d2luLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcblxyXG5cdFx0Ly8gT3ZlcnJpZGUgY2FsbGJhY2sgbWVjaGFuaXNtLiBUcmlnZ2dlciBhIHJlc3BvbnNlIG9ubG9hZC9vbmVycm9yXHJcblx0XHRpZiAob3B0aW9ucyAmJiBvcHRpb25zLmNhbGxiYWNrb25sb2FkKSB7XHJcblx0XHRcdC8vIE9ubG9hZCBpcyBiZWluZyBmaXJlZCB0d2ljZVxyXG5cdFx0XHR3aW4ub25sb2FkID0gZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0Y2Ioe1xyXG5cdFx0XHRcdFx0cmVzcG9uc2U6ICdwb3N0ZWQnLFxyXG5cdFx0XHRcdFx0bWVzc2FnZTogJ0NvbnRlbnQgd2FzIHBvc3RlZCdcclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0fTtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAodGltZW91dCkge1xyXG5cdFx0XHRzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdGNiKGVycm9yKCd0aW1lb3V0JywgJ1RoZSBwb3N0IG9wZXJhdGlvbiB0aW1lZCBvdXQnKSk7XHJcblx0XHRcdH0sIHRpbWVvdXQpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGRvYy5ib2R5LmFwcGVuZENoaWxkKHdpbik7XHJcblxyXG5cdFx0Ly8gSWYgd2UgYXJlIGp1c3QgcG9zdGluZyBhIHNpbmdsZSBpdGVtXHJcblx0XHRpZiAoX3RoaXMuZG9tSW5zdGFuY2UoJ2Zvcm0nLCBkYXRhKSkge1xyXG5cdFx0XHQvLyBHZXQgdGhlIHBhcmVudCBmb3JtXHJcblx0XHRcdGZvcm0gPSBkYXRhLmZvcm07XHJcblxyXG5cdFx0XHQvLyBMb29wIHRocm91Z2ggYW5kIGRpc2FibGUgYWxsIG9mIGl0cyBzaWJsaW5nc1xyXG5cdFx0XHRmb3IgKGkgPSAwOyBpIDwgZm9ybS5lbGVtZW50cy5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHRcdGlmIChmb3JtLmVsZW1lbnRzW2ldICE9PSBkYXRhKSB7XHJcblx0XHRcdFx0XHRmb3JtLmVsZW1lbnRzW2ldLnNldEF0dHJpYnV0ZSgnZGlzYWJsZWQnLCB0cnVlKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdC8vIE1vdmUgdGhlIGZvY3VzIHRvIHRoZSBmb3JtXHJcblx0XHRcdGRhdGEgPSBmb3JtO1xyXG5cdFx0fVxyXG5cclxuXHRcdC8vIFBvc3RpbmcgYSBmb3JtXHJcblx0XHRpZiAoX3RoaXMuZG9tSW5zdGFuY2UoJ2Zvcm0nLCBkYXRhKSkge1xyXG5cdFx0XHQvLyBUaGlzIGlzIGEgZm9ybSBlbGVtZW50XHJcblx0XHRcdGZvcm0gPSBkYXRhO1xyXG5cclxuXHRcdFx0Ly8gRG9lcyB0aGlzIGZvcm0gbmVlZCB0byBiZSBhIG11bHRpcGFydCBmb3JtP1xyXG5cdFx0XHRmb3IgKGkgPSAwOyBpIDwgZm9ybS5lbGVtZW50cy5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHRcdGlmICghZm9ybS5lbGVtZW50c1tpXS5kaXNhYmxlZCAmJiBmb3JtLmVsZW1lbnRzW2ldLnR5cGUgPT09ICdmaWxlJykge1xyXG5cdFx0XHRcdFx0Zm9ybS5lbmNvZGluZyA9IGZvcm0uZW5jdHlwZSA9ICdtdWx0aXBhcnQvZm9ybS1kYXRhJztcclxuXHRcdFx0XHRcdGZvcm0uZWxlbWVudHNbaV0uc2V0QXR0cmlidXRlKCduYW1lJywgJ2ZpbGUnKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHRcdGVsc2Uge1xyXG5cdFx0XHQvLyBJdHMgbm90IGEgZm9ybSBlbGVtZW50LFxyXG5cdFx0XHQvLyBUaGVyZWZvcmUgaXQgbXVzdCBiZSBhIEpTT04gb2JqZWN0IG9mIEtleT0+VmFsdWUgb3IgS2V5PT5FbGVtZW50XHJcblx0XHRcdC8vIElmIGFueW9uZSBvZiB0aG9zZSB2YWx1ZXMgYXJlIGEgaW5wdXQgdHlwZT1maWxlIHdlIHNoYWxsIHNoYWxsIGluc2VydCBpdHMgc2libGluZ3MgaW50byB0aGUgZm9ybSBmb3Igd2hpY2ggaXQgYmVsb25ncy5cclxuXHRcdFx0Zm9yICh4IGluIGRhdGEpIGlmIChkYXRhLmhhc093blByb3BlcnR5KHgpKSB7XHJcblx0XHRcdFx0Ly8gSXMgdGhpcyBhbiBpbnB1dCBFbGVtZW50P1xyXG5cdFx0XHRcdGlmIChfdGhpcy5kb21JbnN0YW5jZSgnaW5wdXQnLCBkYXRhW3hdKSAmJiBkYXRhW3hdLnR5cGUgPT09ICdmaWxlJykge1xyXG5cdFx0XHRcdFx0Zm9ybSA9IGRhdGFbeF0uZm9ybTtcclxuXHRcdFx0XHRcdGZvcm0uZW5jb2RpbmcgPSBmb3JtLmVuY3R5cGUgPSAnbXVsdGlwYXJ0L2Zvcm0tZGF0YSc7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQvLyBEbyBJZiB0aGVyZSBpcyBubyBkZWZpbmVkIGZvcm0gZWxlbWVudCwgbGV0cyBjcmVhdGUgb25lLlxyXG5cdFx0XHRpZiAoIWZvcm0pIHtcclxuXHRcdFx0XHQvLyBCdWlsZCBmb3JtXHJcblx0XHRcdFx0Zm9ybSA9IGRvYy5jcmVhdGVFbGVtZW50KCdmb3JtJyk7XHJcblx0XHRcdFx0ZG9jLmJvZHkuYXBwZW5kQ2hpbGQoZm9ybSk7XHJcblx0XHRcdFx0bmV3Zm9ybSA9IGZvcm07XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHZhciBpbnB1dDtcclxuXHJcblx0XHRcdC8vIEFkZCBlbGVtZW50cyB0byB0aGUgZm9ybSBpZiB0aGV5IGRvbnQgZXhpc3RcclxuXHRcdFx0Zm9yICh4IGluIGRhdGEpIGlmIChkYXRhLmhhc093blByb3BlcnR5KHgpKSB7XHJcblxyXG5cdFx0XHRcdC8vIElzIHRoaXMgYW4gZWxlbWVudD9cclxuXHRcdFx0XHR2YXIgZWwgPSAoX3RoaXMuZG9tSW5zdGFuY2UoJ2lucHV0JywgZGF0YVt4XSkgfHwgX3RoaXMuZG9tSW5zdGFuY2UoJ3RleHRBcmVhJywgZGF0YVt4XSkgfHwgX3RoaXMuZG9tSW5zdGFuY2UoJ3NlbGVjdCcsIGRhdGFbeF0pKTtcclxuXHJcblx0XHRcdFx0Ly8gSXMgdGhpcyBub3QgYW4gaW5wdXQgZWxlbWVudCwgb3Igb25lIHRoYXQgZXhpc3RzIG91dHNpZGUgdGhlIGZvcm0uXHJcblx0XHRcdFx0aWYgKCFlbCB8fCBkYXRhW3hdLmZvcm0gIT09IGZvcm0pIHtcclxuXHJcblx0XHRcdFx0XHQvLyBEb2VzIGFuIGVsZW1lbnQgaGF2ZSB0aGUgc2FtZSBuYW1lP1xyXG5cdFx0XHRcdFx0dmFyIGlucHV0cyA9IGZvcm0uZWxlbWVudHNbeF07XHJcblx0XHRcdFx0XHRpZiAoaW5wdXQpIHtcclxuXHRcdFx0XHRcdFx0Ly8gUmVtb3ZlIGl0LlxyXG5cdFx0XHRcdFx0XHRpZiAoIShpbnB1dHMgaW5zdGFuY2VvZiBOb2RlTGlzdCkpIHtcclxuXHRcdFx0XHRcdFx0XHRpbnB1dHMgPSBbaW5wdXRzXTtcclxuXHRcdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdFx0Zm9yIChpID0gMDsgaSA8IGlucHV0cy5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHRcdFx0XHRcdGlucHV0c1tpXS5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGlucHV0c1tpXSk7XHJcblx0XHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0Ly8gQ3JlYXRlIGFuIGlucHV0IGVsZW1lbnRcclxuXHRcdFx0XHRcdGlucHV0ID0gZG9jLmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XHJcblx0XHRcdFx0XHRpbnB1dC5zZXRBdHRyaWJ1dGUoJ3R5cGUnLCAnaGlkZGVuJyk7XHJcblx0XHRcdFx0XHRpbnB1dC5zZXRBdHRyaWJ1dGUoJ25hbWUnLCB4KTtcclxuXHJcblx0XHRcdFx0XHQvLyBEb2VzIGl0IGhhdmUgYSB2YWx1ZSBhdHRyaWJ1dGU/XHJcblx0XHRcdFx0XHRpZiAoZWwpIHtcclxuXHRcdFx0XHRcdFx0aW5wdXQudmFsdWUgPSBkYXRhW3hdLnZhbHVlO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0ZWxzZSBpZiAoX3RoaXMuZG9tSW5zdGFuY2UobnVsbCwgZGF0YVt4XSkpIHtcclxuXHRcdFx0XHRcdFx0aW5wdXQudmFsdWUgPSBkYXRhW3hdLmlubmVySFRNTCB8fCBkYXRhW3hdLmlubmVyVGV4dDtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdGVsc2Uge1xyXG5cdFx0XHRcdFx0XHRpbnB1dC52YWx1ZSA9IGRhdGFbeF07XHJcblx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0Zm9ybS5hcHBlbmRDaGlsZChpbnB1dCk7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHQvLyBJdCBpcyBhbiBlbGVtZW50LCB3aGljaCBleGlzdHMgd2l0aGluIHRoZSBmb3JtLCBidXQgdGhlIG5hbWUgaXMgd3JvbmdcclxuXHRcdFx0XHRlbHNlIGlmIChlbCAmJiBkYXRhW3hdLm5hbWUgIT09IHgpIHtcclxuXHRcdFx0XHRcdGRhdGFbeF0uc2V0QXR0cmlidXRlKCduYW1lJywgeCk7XHJcblx0XHRcdFx0XHRkYXRhW3hdLm5hbWUgPSB4O1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0Ly8gRGlzYWJsZSBlbGVtZW50cyBmcm9tIHdpdGhpbiB0aGUgZm9ybSBpZiB0aGV5IHdlcmVuJ3Qgc3BlY2lmaWVkXHJcblx0XHRcdGZvciAoaSA9IDA7IGkgPCBmb3JtLmVsZW1lbnRzLmxlbmd0aDsgaSsrKSB7XHJcblxyXG5cdFx0XHRcdGlucHV0ID0gZm9ybS5lbGVtZW50c1tpXTtcclxuXHJcblx0XHRcdFx0Ly8gRG9lcyB0aGUgc2FtZSBuYW1lIGFuZCB2YWx1ZSBleGlzdCBpbiB0aGUgcGFyZW50XHJcblx0XHRcdFx0aWYgKCEoaW5wdXQubmFtZSBpbiBkYXRhKSAmJiBpbnB1dC5nZXRBdHRyaWJ1dGUoJ2Rpc2FibGVkJykgIT09IHRydWUpIHtcclxuXHRcdFx0XHRcdC8vIERpc2FibGVcclxuXHRcdFx0XHRcdGlucHV0LnNldEF0dHJpYnV0ZSgnZGlzYWJsZWQnLCB0cnVlKTtcclxuXHJcblx0XHRcdFx0XHQvLyBBZGQgcmUtZW5hYmxlIHRvIGNhbGxiYWNrXHJcblx0XHRcdFx0XHRyZWVuYWJsZUFmdGVyU3VibWl0LnB1c2goaW5wdXQpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdC8vIFNldCB0aGUgdGFyZ2V0IG9mIHRoZSBmb3JtXHJcblx0XHRmb3JtLnNldEF0dHJpYnV0ZSgnbWV0aG9kJywgJ1BPU1QnKTtcclxuXHRcdGZvcm0uc2V0QXR0cmlidXRlKCd0YXJnZXQnLCBjYWxsYmFja0lEKTtcclxuXHRcdGZvcm0udGFyZ2V0ID0gY2FsbGJhY2tJRDtcclxuXHJcblx0XHQvLyBVcGRhdGUgdGhlIGZvcm0gVVJMXHJcblx0XHRmb3JtLnNldEF0dHJpYnV0ZSgnYWN0aW9uJywgdXJsKTtcclxuXHJcblx0XHQvLyBTdWJtaXQgdGhlIGZvcm1cclxuXHRcdC8vIFNvbWUgcmVhc29uIHRoaXMgbmVlZHMgdG8gYmUgb2Zmc2V0IGZyb20gdGhlIGN1cnJlbnQgd2luZG93IGV4ZWN1dGlvblxyXG5cdFx0c2V0VGltZW91dChmdW5jdGlvbigpIHtcclxuXHRcdFx0Zm9ybS5zdWJtaXQoKTtcclxuXHJcblx0XHRcdHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0dHJ5IHtcclxuXHRcdFx0XHRcdC8vIFJlbW92ZSB0aGUgaWZyYW1lIGZyb20gdGhlIHBhZ2UuXHJcblx0XHRcdFx0XHQvL3dpbi5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHdpbik7XHJcblx0XHRcdFx0XHQvLyBSZW1vdmUgdGhlIGZvcm1cclxuXHRcdFx0XHRcdGlmIChuZXdmb3JtKSB7XHJcblx0XHRcdFx0XHRcdG5ld2Zvcm0ucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChuZXdmb3JtKTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0Y2F0Y2ggKGUpIHtcclxuXHRcdFx0XHRcdHRyeSB7XHJcblx0XHRcdFx0XHRcdGNvbnNvbGUuZXJyb3IoJ0hlbGxvSlM6IGNvdWxkIG5vdCByZW1vdmUgaWZyYW1lJyk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRjYXRjaCAoZWUpIHt9XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHQvLyBSZWVuYWJsZSB0aGUgZGlzYWJsZWQgZm9ybVxyXG5cdFx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgcmVlbmFibGVBZnRlclN1Ym1pdC5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHRcdFx0aWYgKHJlZW5hYmxlQWZ0ZXJTdWJtaXRbaV0pIHtcclxuXHRcdFx0XHRcdFx0cmVlbmFibGVBZnRlclN1Ym1pdFtpXS5zZXRBdHRyaWJ1dGUoJ2Rpc2FibGVkJywgZmFsc2UpO1xyXG5cdFx0XHRcdFx0XHRyZWVuYWJsZUFmdGVyU3VibWl0W2ldLmRpc2FibGVkID0gZmFsc2U7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9LCAwKTtcclxuXHRcdH0sIDEwMCk7XHJcblx0fSxcclxuXHJcblx0Ly8gU29tZSBvZiB0aGUgcHJvdmlkZXJzIHJlcXVpcmUgdGhhdCBvbmx5IG11bHRpcGFydCBpcyB1c2VkIHdpdGggbm9uLWJpbmFyeSBmb3Jtcy5cclxuXHQvLyBUaGlzIGZ1bmN0aW9uIGNoZWNrcyB3aGV0aGVyIHRoZSBmb3JtIGNvbnRhaW5zIGJpbmFyeSBkYXRhXHJcblx0aGFzQmluYXJ5OiBmdW5jdGlvbihkYXRhKSB7XHJcblx0XHRmb3IgKHZhciB4IGluIGRhdGEpIGlmIChkYXRhLmhhc093blByb3BlcnR5KHgpKSB7XHJcblx0XHRcdGlmICh0aGlzLmlzQmluYXJ5KGRhdGFbeF0pKSB7XHJcblx0XHRcdFx0cmV0dXJuIHRydWU7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gZmFsc2U7XHJcblx0fSxcclxuXHJcblx0Ly8gRGV0ZXJtaW5lcyBpZiBhIHZhcmlhYmxlIEVpdGhlciBJcyBvciBsaWtlIGEgRm9ybUlucHV0IGhhcyB0aGUgdmFsdWUgb2YgYSBCbG9iXHJcblxyXG5cdGlzQmluYXJ5OiBmdW5jdGlvbihkYXRhKSB7XHJcblxyXG5cdFx0cmV0dXJuIGRhdGEgaW5zdGFuY2VvZiBPYmplY3QgJiYgKFxyXG5cdFx0KHRoaXMuZG9tSW5zdGFuY2UoJ2lucHV0JywgZGF0YSkgJiYgZGF0YS50eXBlID09PSAnZmlsZScpIHx8XHJcblx0XHQoJ0ZpbGVMaXN0JyBpbiB3aW5kb3cgJiYgZGF0YSBpbnN0YW5jZW9mIHdpbmRvdy5GaWxlTGlzdCkgfHxcclxuXHRcdCgnRmlsZScgaW4gd2luZG93ICYmIGRhdGEgaW5zdGFuY2VvZiB3aW5kb3cuRmlsZSkgfHxcclxuXHRcdCgnQmxvYicgaW4gd2luZG93ICYmIGRhdGEgaW5zdGFuY2VvZiB3aW5kb3cuQmxvYikpO1xyXG5cclxuXHR9LFxyXG5cclxuXHQvLyBDb252ZXJ0IERhdGEtVVJJIHRvIEJsb2Igc3RyaW5nXHJcblx0dG9CbG9iOiBmdW5jdGlvbihkYXRhVVJJKSB7XHJcblx0XHR2YXIgcmVnID0gL15kYXRhXFw6KFteOyxdKyhcXDtjaGFyc2V0PVteOyxdKyk/KShcXDtiYXNlNjQpPywvaTtcclxuXHRcdHZhciBtID0gZGF0YVVSSS5tYXRjaChyZWcpO1xyXG5cdFx0aWYgKCFtKSB7XHJcblx0XHRcdHJldHVybiBkYXRhVVJJO1xyXG5cdFx0fVxyXG5cclxuXHRcdHZhciBiaW5hcnkgPSBhdG9iKGRhdGFVUkkucmVwbGFjZShyZWcsICcnKSk7XHJcblx0XHR2YXIgYXJyYXkgPSBbXTtcclxuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgYmluYXJ5Lmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdGFycmF5LnB1c2goYmluYXJ5LmNoYXJDb2RlQXQoaSkpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBuZXcgQmxvYihbbmV3IFVpbnQ4QXJyYXkoYXJyYXkpXSwge3R5cGU6IG1bMV19KTtcclxuXHR9XHJcblxyXG59KTtcclxuXHJcbi8vIEVYVFJBOiBDb252ZXJ0IEZvcm1FbGVtZW50IHRvIEpTT04gZm9yIFBPU1RpbmdcclxuLy8gV3JhcHBlcnMgdG8gYWRkIGFkZGl0aW9uYWwgZnVuY3Rpb25hbGl0eSB0byBleGlzdGluZyBmdW5jdGlvbnNcclxuKGZ1bmN0aW9uKGhlbGxvKSB7XHJcblxyXG5cdC8vIENvcHkgb3JpZ2luYWwgZnVuY3Rpb25cclxuXHR2YXIgYXBpID0gaGVsbG8uYXBpO1xyXG5cdHZhciB1dGlscyA9IGhlbGxvLnV0aWxzO1xyXG5cclxuXHR1dGlscy5leHRlbmQodXRpbHMsIHtcclxuXHJcblx0XHQvLyBEYXRhVG9KU09OXHJcblx0XHQvLyBUaGlzIHRha2VzIGEgRm9ybUVsZW1lbnR8Tm9kZUxpc3R8SW5wdXRFbGVtZW50fE1peGVkT2JqZWN0cyBhbmQgY29udmVycyB0aGUgZGF0YSBvYmplY3QgdG8gSlNPTi5cclxuXHRcdGRhdGFUb0pTT046IGZ1bmN0aW9uKHApIHtcclxuXHJcblx0XHRcdHZhciBfdGhpcyA9IHRoaXM7XHJcblx0XHRcdHZhciB3ID0gd2luZG93O1xyXG5cdFx0XHR2YXIgZGF0YSA9IHAuZGF0YTtcclxuXHJcblx0XHRcdC8vIElzIGRhdGEgYSBmb3JtIG9iamVjdFxyXG5cdFx0XHRpZiAoX3RoaXMuZG9tSW5zdGFuY2UoJ2Zvcm0nLCBkYXRhKSkge1xyXG5cdFx0XHRcdGRhdGEgPSBfdGhpcy5ub2RlTGlzdFRvSlNPTihkYXRhLmVsZW1lbnRzKTtcclxuXHRcdFx0fVxyXG5cdFx0XHRlbHNlIGlmICgnTm9kZUxpc3QnIGluIHcgJiYgZGF0YSBpbnN0YW5jZW9mIE5vZGVMaXN0KSB7XHJcblx0XHRcdFx0ZGF0YSA9IF90aGlzLm5vZGVMaXN0VG9KU09OKGRhdGEpO1xyXG5cdFx0XHR9XHJcblx0XHRcdGVsc2UgaWYgKF90aGlzLmRvbUluc3RhbmNlKCdpbnB1dCcsIGRhdGEpKSB7XHJcblx0XHRcdFx0ZGF0YSA9IF90aGlzLm5vZGVMaXN0VG9KU09OKFtkYXRhXSk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdC8vIElzIGRhdGEgYSBibG9iLCBGaWxlLCBGaWxlTGlzdD9cclxuXHRcdFx0aWYgKCgnRmlsZScgaW4gdyAmJiBkYXRhIGluc3RhbmNlb2Ygdy5GaWxlKSB8fFxyXG5cdFx0XHRcdCgnQmxvYicgaW4gdyAmJiBkYXRhIGluc3RhbmNlb2Ygdy5CbG9iKSB8fFxyXG5cdFx0XHRcdCgnRmlsZUxpc3QnIGluIHcgJiYgZGF0YSBpbnN0YW5jZW9mIHcuRmlsZUxpc3QpKSB7XHJcblx0XHRcdFx0ZGF0YSA9IHtmaWxlOiBkYXRhfTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0Ly8gTG9vcCB0aHJvdWdoIGRhdGEgaWYgaXQncyBub3QgZm9ybSBkYXRhIGl0IG11c3Qgbm93IGJlIGEgSlNPTiBvYmplY3RcclxuXHRcdFx0aWYgKCEoJ0Zvcm1EYXRhJyBpbiB3ICYmIGRhdGEgaW5zdGFuY2VvZiB3LkZvcm1EYXRhKSkge1xyXG5cclxuXHRcdFx0XHRmb3IgKHZhciB4IGluIGRhdGEpIGlmIChkYXRhLmhhc093blByb3BlcnR5KHgpKSB7XHJcblxyXG5cdFx0XHRcdFx0aWYgKCdGaWxlTGlzdCcgaW4gdyAmJiBkYXRhW3hdIGluc3RhbmNlb2Ygdy5GaWxlTGlzdCkge1xyXG5cdFx0XHRcdFx0XHRpZiAoZGF0YVt4XS5sZW5ndGggPT09IDEpIHtcclxuXHRcdFx0XHRcdFx0XHRkYXRhW3hdID0gZGF0YVt4XVswXTtcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0ZWxzZSBpZiAoX3RoaXMuZG9tSW5zdGFuY2UoJ2lucHV0JywgZGF0YVt4XSkgJiYgZGF0YVt4XS50eXBlID09PSAnZmlsZScpIHtcclxuXHRcdFx0XHRcdFx0Y29udGludWU7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRlbHNlIGlmIChfdGhpcy5kb21JbnN0YW5jZSgnaW5wdXQnLCBkYXRhW3hdKSB8fFxyXG5cdFx0XHRcdFx0XHRfdGhpcy5kb21JbnN0YW5jZSgnc2VsZWN0JywgZGF0YVt4XSkgfHxcclxuXHRcdFx0XHRcdFx0X3RoaXMuZG9tSW5zdGFuY2UoJ3RleHRBcmVhJywgZGF0YVt4XSkpIHtcclxuXHRcdFx0XHRcdFx0ZGF0YVt4XSA9IGRhdGFbeF0udmFsdWU7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRlbHNlIGlmIChfdGhpcy5kb21JbnN0YW5jZShudWxsLCBkYXRhW3hdKSkge1xyXG5cdFx0XHRcdFx0XHRkYXRhW3hdID0gZGF0YVt4XS5pbm5lckhUTUwgfHwgZGF0YVt4XS5pbm5lclRleHQ7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRwLmRhdGEgPSBkYXRhO1xyXG5cdFx0XHRyZXR1cm4gZGF0YTtcclxuXHRcdH0sXHJcblxyXG5cdFx0Ly8gTm9kZUxpc3RUb0pTT05cclxuXHRcdC8vIEdpdmVuIGEgbGlzdCBvZiBlbGVtZW50cyBleHRyYXBvbGF0ZSB0aGVpciB2YWx1ZXMgYW5kIHJldHVybiBhcyBhIGpzb24gb2JqZWN0XHJcblx0XHRub2RlTGlzdFRvSlNPTjogZnVuY3Rpb24obm9kZWxpc3QpIHtcclxuXHJcblx0XHRcdHZhciBqc29uID0ge307XHJcblxyXG5cdFx0XHQvLyBDcmVhdGUgYSBkYXRhIHN0cmluZ1xyXG5cdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IG5vZGVsaXN0Lmxlbmd0aDsgaSsrKSB7XHJcblxyXG5cdFx0XHRcdHZhciBpbnB1dCA9IG5vZGVsaXN0W2ldO1xyXG5cclxuXHRcdFx0XHQvLyBJZiB0aGUgbmFtZSBvZiB0aGUgaW5wdXQgaXMgZW1wdHkgb3IgZGlhYmxlZCwgZG9udCBhZGQgaXQuXHJcblx0XHRcdFx0aWYgKGlucHV0LmRpc2FibGVkIHx8ICFpbnB1dC5uYW1lKSB7XHJcblx0XHRcdFx0XHRjb250aW51ZTtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdC8vIElzIHRoaXMgYSBmaWxlLCBkb2VzIHRoZSBicm93c2VyIG5vdCBzdXBwb3J0ICdmaWxlcycgYW5kICdGb3JtRGF0YSc/XHJcblx0XHRcdFx0aWYgKGlucHV0LnR5cGUgPT09ICdmaWxlJykge1xyXG5cdFx0XHRcdFx0anNvbltpbnB1dC5uYW1lXSA9IGlucHV0O1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRlbHNlIHtcclxuXHRcdFx0XHRcdGpzb25baW5wdXQubmFtZV0gPSBpbnB1dC52YWx1ZSB8fCBpbnB1dC5pbm5lckhUTUw7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRyZXR1cm4ganNvbjtcclxuXHRcdH1cclxuXHR9KTtcclxuXHJcblx0Ly8gUmVwbGFjZSBpdFxyXG5cdGhlbGxvLmFwaSA9IGZ1bmN0aW9uKCkge1xyXG5cclxuXHRcdC8vIEdldCBhcmd1bWVudHNcclxuXHRcdHZhciBwID0gdXRpbHMuYXJncyh7cGF0aDogJ3MhJywgbWV0aG9kOiAncycsIGRhdGE6J28nLCB0aW1lb3V0OiAnaScsIGNhbGxiYWNrOiAnZid9LCBhcmd1bWVudHMpO1xyXG5cclxuXHRcdC8vIENoYW5nZSBmb3IgaW50byBhIGRhdGEgb2JqZWN0XHJcblx0XHRpZiAocC5kYXRhKSB7XHJcblx0XHRcdHV0aWxzLmRhdGFUb0pTT04ocCk7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIGFwaS5jYWxsKHRoaXMsIHApO1xyXG5cdH07XHJcblxyXG59KShoZWxsbyk7XHJcblxyXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcbi8vXHJcbi8vIFNhdmUgYW55IGFjY2VzcyB0b2tlbiB0aGF0IGlzIGluIHRoZSBjdXJyZW50IHBhZ2UgVVJMXHJcbi8vIEhhbmRsZSBhbnkgcmVzcG9uc2Ugc29saWNpdGVkIHRocm91Z2ggaWZyYW1lIGhhc2ggdGFnIGZvbGxvd2luZyBhbiBBUEkgcmVxdWVzdFxyXG4vL1xyXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcblxyXG5oZWxsby51dGlscy5yZXNwb25zZUhhbmRsZXIod2luZG93LCB3aW5kb3cub3BlbmVyIHx8IHdpbmRvdy5wYXJlbnQpO1xyXG5cclxuLy8gU2NyaXB0IHRvIHN1cHBvcnQgQ2hyb21lQXBwc1xyXG4vLyBUaGlzIG92ZXJpZGVzIHRoZSBoZWxsby51dGlscy5wb3B1cCBtZXRob2QgdG8gc3VwcG9ydCBjaHJvbWUuaWRlbnRpdHkubGF1bmNoV2ViQXV0aEZsb3dcclxuLy8gU2VlIGh0dHBzOi8vZGV2ZWxvcGVyLmNocm9tZS5jb20vYXBwcy9hcHBfaWRlbnRpdHkjbm9uXHJcblxyXG4vLyBJcyB0aGlzIGEgY2hyb21lIGFwcD9cclxuXHJcbmlmICh0eXBlb2YgY2hyb21lID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgY2hyb21lLmlkZW50aXR5ID09PSAnb2JqZWN0JyAmJiBjaHJvbWUuaWRlbnRpdHkubGF1bmNoV2ViQXV0aEZsb3cpIHtcclxuXHJcblx0KGZ1bmN0aW9uKCkge1xyXG5cclxuXHRcdC8vIFN3YXAgdGhlIHBvcHVwIG1ldGhvZFxyXG5cdFx0aGVsbG8udXRpbHMucG9wdXAgPSBmdW5jdGlvbih1cmwpIHtcclxuXHJcblx0XHRcdHJldHVybiBfb3Blbih1cmwsIHRydWUpO1xyXG5cclxuXHRcdH07XHJcblxyXG5cdFx0Ly8gU3dhcCB0aGUgaGlkZGVuIGlmcmFtZSBtZXRob2RcclxuXHRcdGhlbGxvLnV0aWxzLmlmcmFtZSA9IGZ1bmN0aW9uKHVybCkge1xyXG5cclxuXHRcdFx0X29wZW4odXJsLCBmYWxzZSk7XHJcblxyXG5cdFx0fTtcclxuXHJcblx0XHQvLyBTd2FwIHRoZSByZXF1ZXN0X2NvcnMgbWV0aG9kXHJcblx0XHRoZWxsby51dGlscy5yZXF1ZXN0X2NvcnMgPSBmdW5jdGlvbihjYWxsYmFjaykge1xyXG5cclxuXHRcdFx0Y2FsbGJhY2soKTtcclxuXHJcblx0XHRcdC8vIEFsd2F5cyBydW4gYXMgQ09SU1xyXG5cclxuXHRcdFx0cmV0dXJuIHRydWU7XHJcblx0XHR9O1xyXG5cclxuXHRcdC8vIFN3YXAgdGhlIHN0b3JhZ2UgbWV0aG9kXHJcblx0XHR2YXIgX2NhY2hlID0ge307XHJcblx0XHRjaHJvbWUuc3RvcmFnZS5sb2NhbC5nZXQoJ2hlbGxvJywgZnVuY3Rpb24ocikge1xyXG5cdFx0XHQvLyBVcGRhdGUgdGhlIGNhY2hlXHJcblx0XHRcdF9jYWNoZSA9IHIuaGVsbG8gfHwge307XHJcblx0XHR9KTtcclxuXHJcblx0XHRoZWxsby51dGlscy5zdG9yZSA9IGZ1bmN0aW9uKG5hbWUsIHZhbHVlKSB7XHJcblxyXG5cdFx0XHQvLyBHZXQgYWxsXHJcblx0XHRcdGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAwKSB7XHJcblx0XHRcdFx0cmV0dXJuIF9jYWNoZTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0Ly8gR2V0XHJcblx0XHRcdGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAxKSB7XHJcblx0XHRcdFx0cmV0dXJuIF9jYWNoZVtuYW1lXSB8fCBudWxsO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQvLyBTZXRcclxuXHRcdFx0aWYgKHZhbHVlKSB7XHJcblx0XHRcdFx0X2NhY2hlW25hbWVdID0gdmFsdWU7XHJcblx0XHRcdFx0Y2hyb21lLnN0b3JhZ2UubG9jYWwuc2V0KHtoZWxsbzogX2NhY2hlfSk7XHJcblx0XHRcdFx0cmV0dXJuIHZhbHVlO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQvLyBEZWxldGVcclxuXHRcdFx0aWYgKHZhbHVlID09PSBudWxsKSB7XHJcblx0XHRcdFx0ZGVsZXRlIF9jYWNoZVtuYW1lXTtcclxuXHRcdFx0XHRjaHJvbWUuc3RvcmFnZS5sb2NhbC5zZXQoe2hlbGxvOiBfY2FjaGV9KTtcclxuXHRcdFx0XHRyZXR1cm4gbnVsbDtcclxuXHRcdFx0fVxyXG5cdFx0fTtcclxuXHJcblx0XHQvLyBPcGVuIGZ1bmN0aW9uXHJcblx0XHRmdW5jdGlvbiBfb3Blbih1cmwsIGludGVyYWN0aXZlKSB7XHJcblxyXG5cdFx0XHQvLyBMYXVuY2hcclxuXHRcdFx0dmFyIHJlZiA9IHtcclxuXHRcdFx0XHRjbG9zZWQ6IGZhbHNlXHJcblx0XHRcdH07XHJcblxyXG5cdFx0XHQvLyBMYXVuY2ggdGhlIHdlYkF1dGhGbG93XHJcblx0XHRcdGNocm9tZS5pZGVudGl0eS5sYXVuY2hXZWJBdXRoRmxvdyh7XHJcblx0XHRcdFx0dXJsOiB1cmwsXHJcblx0XHRcdFx0aW50ZXJhY3RpdmU6IGludGVyYWN0aXZlXHJcblx0XHRcdH0sIGZ1bmN0aW9uKHJlc3BvbnNlVXJsKSB7XHJcblxyXG5cdFx0XHRcdC8vIERpZCB0aGUgdXNlciBjYW5jZWwgdGhpcyBwcmVtYXR1cmVseVxyXG5cdFx0XHRcdGlmIChyZXNwb25zZVVybCA9PT0gdW5kZWZpbmVkKSB7XHJcblx0XHRcdFx0XHRyZWYuY2xvc2VkID0gdHJ1ZTtcclxuXHRcdFx0XHRcdHJldHVybjtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdC8vIFNwbGl0IGFwcGFydCB0aGUgVVJMXHJcblx0XHRcdFx0dmFyIGEgPSBoZWxsby51dGlscy51cmwocmVzcG9uc2VVcmwpO1xyXG5cclxuXHRcdFx0XHQvLyBUaGUgbG9jYXRpb24gY2FuIGJlIGF1Z21lbnRlZCBpbiB0byBhIGxvY2F0aW9uIG9iamVjdCBsaWtlIHNvLi4uXHJcblx0XHRcdFx0Ly8gV2UgZG9udCBoYXZlIHdpbmRvdyBvcGVyYXRpb25zIG9uIHRoZSBwb3B1cCBzbyBsZXRzIGNyZWF0ZSBzb21lXHJcblx0XHRcdFx0dmFyIF9wb3B1cCA9IHtcclxuXHRcdFx0XHRcdGxvY2F0aW9uOiB7XHJcblxyXG5cdFx0XHRcdFx0XHQvLyBDaGFuZ2UgdGhlIGxvY2F0aW9uIG9mIHRoZSBwb3B1cFxyXG5cdFx0XHRcdFx0XHRhc3NpZ246IGZ1bmN0aW9uKHVybCkge1xyXG5cclxuXHRcdFx0XHRcdFx0XHQvLyBJZiB0aGVyZSBpcyBhIHNlY29uZGFyeSByZWFzc2lnblxyXG5cdFx0XHRcdFx0XHRcdC8vIEluIHRoZSBjYXNlIG9mIE9BdXRoMVxyXG5cdFx0XHRcdFx0XHRcdC8vIFRyaWdnZXIgdGhpcyBpbiBub24taW50ZXJhY3RpdmUgbW9kZS5cclxuXHRcdFx0XHRcdFx0XHRfb3Blbih1cmwsIGZhbHNlKTtcclxuXHRcdFx0XHRcdFx0fSxcclxuXHJcblx0XHRcdFx0XHRcdHNlYXJjaDogYS5zZWFyY2gsXHJcblx0XHRcdFx0XHRcdGhhc2g6IGEuaGFzaCxcclxuXHRcdFx0XHRcdFx0aHJlZjogYS5ocmVmXHJcblx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0Y2xvc2U6IGZ1bmN0aW9uKCkge31cclxuXHRcdFx0XHR9O1xyXG5cclxuXHRcdFx0XHQvLyBUaGVuIHRoaXMgVVJMIGNvbnRhaW5zIGluZm9ybWF0aW9uIHdoaWNoIEhlbGxvSlMgbXVzdCBwcm9jZXNzXHJcblx0XHRcdFx0Ly8gVVJMIHN0cmluZ1xyXG5cdFx0XHRcdC8vIFdpbmRvdyAtIGFueSBhY3Rpb24gc3VjaCBhcyB3aW5kb3cgcmVsb2NhdGlvbiBnb2VzIGhlcmVcclxuXHRcdFx0XHQvLyBPcGVuZXIgLSB0aGUgcGFyZW50IHdpbmRvdyB3aGljaCBvcGVuZWQgdGhpcywgYWthIHRoaXMgc2NyaXB0XHJcblxyXG5cdFx0XHRcdGhlbGxvLnV0aWxzLnJlc3BvbnNlSGFuZGxlcihfcG9wdXAsIHdpbmRvdyk7XHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdFx0Ly8gUmV0dXJuIHRoZSByZWZlcmVuY2VcclxuXHRcdFx0cmV0dXJuIHJlZjtcclxuXHRcdH1cclxuXHJcblx0fSkoKTtcclxufVxyXG5cclxuLy8gUGhvbmVnYXAgb3ZlcnJpZGUgZm9yIGhlbGxvLnBob25lZ2FwLmpzXHJcbihmdW5jdGlvbigpIHtcclxuXHJcblx0Ly8gSXMgdGhpcyBhIHBob25lZ2FwIGltcGxlbWVudGF0aW9uP1xyXG5cdGlmICghKC9eZmlsZTpcXC97M31bXlxcL10vLnRlc3Qod2luZG93LmxvY2F0aW9uLmhyZWYpICYmIHdpbmRvdy5jb3Jkb3ZhKSkge1xyXG5cdFx0Ly8gQ29yZG92YSBpcyBub3QgaW5jbHVkZWQuXHJcblx0XHRyZXR1cm47XHJcblx0fVxyXG5cclxuXHQvLyBBdWdtZW50IHRoZSBoaWRkZW4gaWZyYW1lIG1ldGhvZFxyXG5cdGhlbGxvLnV0aWxzLmlmcmFtZSA9IGZ1bmN0aW9uKHVybCwgcmVkaXJlY3RVcmkpIHtcclxuXHRcdGhlbGxvLnV0aWxzLnBvcHVwKHVybCwgcmVkaXJlY3RVcmksIHtoaWRkZW46ICd5ZXMnfSk7XHJcblx0fTtcclxuXHJcblx0Ly8gQXVnbWVudCB0aGUgcG9wdXBcclxuXHR2YXIgdXRpbFBvcHVwID0gaGVsbG8udXRpbHMucG9wdXA7XHJcblxyXG5cdC8vIFJlcGxhY2UgcG9wdXBcclxuXHRoZWxsby51dGlscy5wb3B1cCA9IGZ1bmN0aW9uKHVybCwgcmVkaXJlY3RVcmksIG9wdGlvbnMpIHtcclxuXHJcblx0XHQvLyBSdW4gdGhlIHN0YW5kYXJkXHJcblx0XHR2YXIgcG9wdXAgPSB1dGlsUG9wdXAuY2FsbCh0aGlzLCB1cmwsIHJlZGlyZWN0VXJpLCBvcHRpb25zKTtcclxuXHJcblx0XHQvLyBDcmVhdGUgYSBmdW5jdGlvbiBmb3IgcmVvcGVuaW5nIHRoZSBwb3B1cCwgYW5kIGFzc2lnbmluZyBldmVudHMgdG8gdGhlIG5ldyBwb3B1cCBvYmplY3RcclxuXHRcdC8vIFBob25lR2FwIHN1cHBvcnRcclxuXHRcdC8vIEFkZCBhbiBldmVudCBsaXN0ZW5lciB0byBsaXN0ZW4gdG8gdGhlIGNoYW5nZSBpbiB0aGUgcG9wdXAgd2luZG93cyBVUkxcclxuXHRcdC8vIFRoaXMgbXVzdCBhcHBlYXIgYmVmb3JlIHBvcHVwLmZvY3VzKCk7XHJcblx0XHR0cnkge1xyXG5cdFx0XHRpZiAocG9wdXAgJiYgcG9wdXAuYWRkRXZlbnRMaXN0ZW5lcikge1xyXG5cclxuXHRcdFx0XHQvLyBHZXQgdGhlIG9yaWdpbiBvZiB0aGUgcmVkaXJlY3QgVVJJXHJcblxyXG5cdFx0XHRcdHZhciBhID0gaGVsbG8udXRpbHMudXJsKHJlZGlyZWN0VXJpKTtcclxuXHRcdFx0XHR2YXIgcmVkaXJlY3RVcmlPcmlnaW4gPSBhLm9yaWdpbiB8fCAoYS5wcm90b2NvbCArICcvLycgKyBhLmhvc3RuYW1lKTtcclxuXHJcblx0XHRcdFx0Ly8gTGlzdGVuIHRvIGNoYW5nZXMgaW4gdGhlIEluQXBwQnJvd3NlciB3aW5kb3dcclxuXHJcblx0XHRcdFx0cG9wdXAuYWRkRXZlbnRMaXN0ZW5lcignbG9hZHN0YXJ0JywgZnVuY3Rpb24oZSkge1xyXG5cclxuXHRcdFx0XHRcdHZhciB1cmwgPSBlLnVybDtcclxuXHJcblx0XHRcdFx0XHQvLyBJcyB0aGlzIHRoZSBwYXRoLCBhcyBnaXZlbiBieSB0aGUgcmVkaXJlY3RVcmk/XHJcblx0XHRcdFx0XHQvLyBDaGVjayB0aGUgbmV3IFVSTCBhZ2FpbnMgdGhlIHJlZGlyZWN0VXJpT3JpZ2luLlxyXG5cdFx0XHRcdFx0Ly8gQWNjb3JkaW5nIHRvICM2MyBhIHVzZXIgY291bGQgY2xpY2sgJ2NhbmNlbCcgaW4gc29tZSBkaWFsb2cgYm94ZXMgLi4uLlxyXG5cdFx0XHRcdFx0Ly8gVGhlIHBvcHVwIHJlZGlyZWN0cyB0byBhbm90aGVyIHBhZ2Ugd2l0aCB0aGUgc2FtZSBvcmlnaW4sIHlldCB3ZSBzdGlsbCB3aXNoIGl0IHRvIGNsb3NlLlxyXG5cclxuXHRcdFx0XHRcdGlmICh1cmwuaW5kZXhPZihyZWRpcmVjdFVyaU9yaWdpbikgIT09IDApIHtcclxuXHRcdFx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdC8vIFNwbGl0IGFwcGFydCB0aGUgVVJMXHJcblx0XHRcdFx0XHR2YXIgYSA9IGhlbGxvLnV0aWxzLnVybCh1cmwpO1xyXG5cclxuXHRcdFx0XHRcdC8vIFdlIGRvbnQgaGF2ZSB3aW5kb3cgb3BlcmF0aW9ucyBvbiB0aGUgcG9wdXAgc28gbGV0cyBjcmVhdGUgc29tZVxyXG5cdFx0XHRcdFx0Ly8gVGhlIGxvY2F0aW9uIGNhbiBiZSBhdWdtZW50ZWQgaW4gdG8gYSBsb2NhdGlvbiBvYmplY3QgbGlrZSBzby4uLlxyXG5cclxuXHRcdFx0XHRcdHZhciBfcG9wdXAgPSB7XHJcblx0XHRcdFx0XHRcdGxvY2F0aW9uOiB7XHJcblx0XHRcdFx0XHRcdFx0Ly8gQ2hhbmdlIHRoZSBsb2NhdGlvbiBvZiB0aGUgcG9wdXBcclxuXHRcdFx0XHRcdFx0XHRhc3NpZ246IGZ1bmN0aW9uKGxvY2F0aW9uKSB7XHJcblxyXG5cdFx0XHRcdFx0XHRcdFx0Ly8gVW5mb3VydHVuYXRseSBhbiBhcHAgaXMgbWF5IG5vdCBjaGFuZ2UgdGhlIGxvY2F0aW9uIG9mIGEgSW5BcHBCcm93c2VyIHdpbmRvdy5cclxuXHRcdFx0XHRcdFx0XHRcdC8vIFNvIHRvIHNoaW0gdGhpcywganVzdCBvcGVuIGEgbmV3IG9uZS5cclxuXHRcdFx0XHRcdFx0XHRcdHBvcHVwLmV4ZWN1dGVTY3JpcHQoe2NvZGU6ICd3aW5kb3cubG9jYXRpb24uaHJlZiA9IFwiJyArIGxvY2F0aW9uICsgJztcIid9KTtcclxuXHRcdFx0XHRcdFx0XHR9LFxyXG5cclxuXHRcdFx0XHRcdFx0XHRzZWFyY2g6IGEuc2VhcmNoLFxyXG5cdFx0XHRcdFx0XHRcdGhhc2g6IGEuaGFzaCxcclxuXHRcdFx0XHRcdFx0XHRocmVmOiBhLmhyZWZcclxuXHRcdFx0XHRcdFx0fSxcclxuXHRcdFx0XHRcdFx0Y2xvc2U6IGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdFx0XHRcdGlmIChwb3B1cC5jbG9zZSkge1xyXG5cdFx0XHRcdFx0XHRcdFx0cG9wdXAuY2xvc2UoKTtcclxuXHRcdFx0XHRcdFx0XHRcdHRyeSB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdHBvcHVwLmNsb3NlZCA9IHRydWU7XHJcblx0XHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdFx0XHRjYXRjaCAoX2UpIHt9XHJcblx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHR9O1xyXG5cclxuXHRcdFx0XHRcdC8vIFRoZW4gdGhpcyBVUkwgY29udGFpbnMgaW5mb3JtYXRpb24gd2hpY2ggSGVsbG9KUyBtdXN0IHByb2Nlc3NcclxuXHRcdFx0XHRcdC8vIFVSTCBzdHJpbmdcclxuXHRcdFx0XHRcdC8vIFdpbmRvdyAtIGFueSBhY3Rpb24gc3VjaCBhcyB3aW5kb3cgcmVsb2NhdGlvbiBnb2VzIGhlcmVcclxuXHRcdFx0XHRcdC8vIE9wZW5lciAtIHRoZSBwYXJlbnQgd2luZG93IHdoaWNoIG9wZW5lZCB0aGlzLCBha2EgdGhpcyBzY3JpcHRcclxuXHJcblx0XHRcdFx0XHRoZWxsby51dGlscy5yZXNwb25zZUhhbmRsZXIoX3BvcHVwLCB3aW5kb3cpO1xyXG5cclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdFx0Y2F0Y2ggKGUpIHt9XHJcblxyXG5cdFx0cmV0dXJuIHBvcHVwO1xyXG5cdH07XHJcblxyXG59KSgpO1xyXG5cclxuKGZ1bmN0aW9uKGhlbGxvKSB7XHJcblxyXG5cdC8vIE9BdXRoMVxyXG5cdHZhciBPQXV0aDFTZXR0aW5ncyA9IHtcclxuXHRcdHZlcnNpb246ICcxLjAnLFxyXG5cdFx0YXV0aDogJ2h0dHBzOi8vd3d3LmRyb3Bib3guY29tLzEvb2F1dGgvYXV0aG9yaXplJyxcclxuXHRcdHJlcXVlc3Q6ICdodHRwczovL2FwaS5kcm9wYm94LmNvbS8xL29hdXRoL3JlcXVlc3RfdG9rZW4nLFxyXG5cdFx0dG9rZW46ICdodHRwczovL2FwaS5kcm9wYm94LmNvbS8xL29hdXRoL2FjY2Vzc190b2tlbidcclxuXHR9O1xyXG5cclxuXHQvLyBPQXV0aDIgU2V0dGluZ3NcclxuXHR2YXIgT0F1dGgyU2V0dGluZ3MgPSB7XHJcblx0XHR2ZXJzaW9uOiAyLFxyXG5cdFx0YXV0aDogJ2h0dHBzOi8vd3d3LmRyb3Bib3guY29tLzEvb2F1dGgyL2F1dGhvcml6ZScsXHJcblx0XHRncmFudDogJ2h0dHBzOi8vYXBpLmRyb3Bib3guY29tLzEvb2F1dGgyL3Rva2VuJ1xyXG5cdH07XHJcblxyXG5cdC8vIEluaXRpYXRlIHRoZSBEcm9wYm94IG1vZHVsZVxyXG5cdGhlbGxvLmluaXQoe1xyXG5cclxuXHRcdGRyb3Bib3g6IHtcclxuXHJcblx0XHRcdG5hbWU6ICdEcm9wYm94JyxcclxuXHJcblx0XHRcdG9hdXRoOiBPQXV0aDJTZXR0aW5ncyxcclxuXHJcblx0XHRcdGxvZ2luOiBmdW5jdGlvbihwKSB7XHJcblx0XHRcdFx0Ly8gT0F1dGgyIG5vbi1zdGFuZGFyZCBhZGp1c3RtZW50c1xyXG5cdFx0XHRcdHAucXMuc2NvcGUgPSAnJztcclxuXHJcblx0XHRcdFx0Ly8gU2hvdWxkIHRoaXMgYmUgcnVuIGFzIE9BdXRoMT9cclxuXHRcdFx0XHQvLyBJZiB0aGUgcmVkaXJlY3RfdXJpIGlzIGlzIEhUVFAgKG5vbi1zZWN1cmUpIHRoZW4gaXRzIHJlcXVpcmVkIHRvIHJldmVydCB0byB0aGUgT0F1dGgxIGVuZHBvaW50c1xyXG5cdFx0XHRcdHZhciByZWRpcmVjdCA9IGRlY29kZVVSSUNvbXBvbmVudChwLnFzLnJlZGlyZWN0X3VyaSk7XHJcblx0XHRcdFx0aWYgKHJlZGlyZWN0LmluZGV4T2YoJ2h0dHA6JykgPT09IDAgJiYgcmVkaXJlY3QuaW5kZXhPZignaHR0cDovL2xvY2FsaG9zdC8nKSAhPT0gMCkge1xyXG5cclxuXHRcdFx0XHRcdC8vIE92ZXJyaWRlIHRoZSBkcm9wYm94IE9BdXRoIHNldHRpbmdzLlxyXG5cdFx0XHRcdFx0aGVsbG8uc2VydmljZXMuZHJvcGJveC5vYXV0aCA9IE9BdXRoMVNldHRpbmdzO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRlbHNlIHtcclxuXHRcdFx0XHRcdC8vIE92ZXJyaWRlIHRoZSBkcm9wYm94IE9BdXRoIHNldHRpbmdzLlxyXG5cdFx0XHRcdFx0aGVsbG8uc2VydmljZXMuZHJvcGJveC5vYXV0aCA9IE9BdXRoMlNldHRpbmdzO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0Ly8gVGhlIGRyb3Bib3ggbG9naW4gd2luZG93IGlzIGEgZGlmZmVyZW50IHNpemVcclxuXHRcdFx0XHRwLm9wdGlvbnMucG9wdXAud2lkdGggPSAxMDAwO1xyXG5cdFx0XHRcdHAub3B0aW9ucy5wb3B1cC5oZWlnaHQgPSAxMDAwO1xyXG5cdFx0XHR9LFxyXG5cclxuXHRcdFx0LypcclxuXHRcdFx0XHREcm9wYm94IGRvZXMgbm90IGFsbG93IGluc2VjdXJlIEhUVFAgVVJJJ3MgaW4gdGhlIHJlZGlyZWN0X3VyaSBmaWVsZFxyXG5cdFx0XHRcdC4uLm90aGVyd2lzZSBJJ2QgbG92ZSB0byB1c2UgT0F1dGgyXHJcblxyXG5cdFx0XHRcdEZvbGxvdyByZXF1ZXN0IGh0dHBzOi8vZm9ydW1zLmRyb3Bib3guY29tL3RvcGljLnBocD9pZD0xMDY1MDVcclxuXHJcblx0XHRcdFx0cC5xcy5yZXNwb25zZV90eXBlID0gJ2NvZGUnO1xyXG5cdFx0XHRcdG9hdXRoOiB7XHJcblx0XHRcdFx0XHR2ZXJzaW9uOiAyLFxyXG5cdFx0XHRcdFx0YXV0aDogJ2h0dHBzOi8vd3d3LmRyb3Bib3guY29tLzEvb2F1dGgyL2F1dGhvcml6ZScsXHJcblx0XHRcdFx0XHRncmFudDogJ2h0dHBzOi8vYXBpLmRyb3Bib3guY29tLzEvb2F1dGgyL3Rva2VuJ1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0Ki9cclxuXHJcblx0XHRcdC8vIEFQSSBCYXNlIFVSTFxyXG5cdFx0XHRiYXNlOiAnaHR0cHM6Ly9hcGkuZHJvcGJveC5jb20vMS8nLFxyXG5cclxuXHRcdFx0Ly8gQmVzcG9rZSBzZXR0aW5nOiB0aGlzIGlzIHN0YXRlcyB3aGV0aGVyIHRvIHVzZSB0aGUgY3VzdG9tIGVudmlyb25tZW50IG9mIERyb3Bib3ggb3IgdG8gdXNlIHRoZWlyIG93biBlbnZpcm9ubWVudFxyXG5cdFx0XHQvLyBCZWNhdXNlIGl0J3Mgbm90b3Jpb3VzbHkgZGlmZmljdWx0IGZvciBEcm9wYm94IHRvbyBwcm92aWRlIGFjY2VzcyBmcm9tIG90aGVyIHdlYnNlcnZpY2VzLCB0aGlzIGRlZmF1bHRzIHRvIFNhbmRib3hcclxuXHRcdFx0cm9vdDogJ3NhbmRib3gnLFxyXG5cclxuXHRcdFx0Ly8gTWFwIEdFVCByZXF1ZXN0c1xyXG5cdFx0XHRnZXQ6IHtcclxuXHRcdFx0XHRtZTogJ2FjY291bnQvaW5mbycsXHJcblxyXG5cdFx0XHRcdC8vIEh0dHBzOi8vd3d3LmRyb3Bib3guY29tL2RldmVsb3BlcnMvY29yZS9kb2NzI21ldGFkYXRhXHJcblx0XHRcdFx0J21lL2ZpbGVzJzogcmVxKCdtZXRhZGF0YS9hdXRvL0B7cGFyZW50fH0nKSxcclxuXHRcdFx0XHQnbWUvZm9sZGVyJzogcmVxKCdtZXRhZGF0YS9hdXRvL0B7aWR9JyksXHJcblx0XHRcdFx0J21lL2ZvbGRlcnMnOiByZXEoJ21ldGFkYXRhL2F1dG8vJyksXHJcblxyXG5cdFx0XHRcdCdkZWZhdWx0JzogZnVuY3Rpb24ocCwgY2FsbGJhY2spIHtcclxuXHRcdFx0XHRcdGlmIChwLnBhdGgubWF0Y2goJ2h0dHBzOi8vYXBpLWNvbnRlbnQuZHJvcGJveC5jb20vMS9maWxlcy8nKSkge1xyXG5cdFx0XHRcdFx0XHQvLyBUaGlzIGlzIGEgZmlsZSwgcmV0dXJuIGJpbmFyeSBkYXRhXHJcblx0XHRcdFx0XHRcdHAubWV0aG9kID0gJ2Jsb2InO1xyXG5cdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdGNhbGxiYWNrKHAucGF0aCk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9LFxyXG5cclxuXHRcdFx0cG9zdDoge1xyXG5cdFx0XHRcdCdtZS9maWxlcyc6IGZ1bmN0aW9uKHAsIGNhbGxiYWNrKSB7XHJcblxyXG5cdFx0XHRcdFx0dmFyIHBhdGggPSBwLmRhdGEucGFyZW50O1xyXG5cdFx0XHRcdFx0dmFyIGZpbGVOYW1lID0gcC5kYXRhLm5hbWU7XHJcblxyXG5cdFx0XHRcdFx0cC5kYXRhID0ge1xyXG5cdFx0XHRcdFx0XHRmaWxlOiBwLmRhdGEuZmlsZVxyXG5cdFx0XHRcdFx0fTtcclxuXHJcblx0XHRcdFx0XHQvLyBEb2VzIHRoaXMgaGF2ZSBhIGRhdGEtdXJpIHRvIHVwbG9hZCBhcyBhIGZpbGU/XHJcblx0XHRcdFx0XHRpZiAodHlwZW9mIChwLmRhdGEuZmlsZSkgPT09ICdzdHJpbmcnKSB7XHJcblx0XHRcdFx0XHRcdHAuZGF0YS5maWxlID0gaGVsbG8udXRpbHMudG9CbG9iKHAuZGF0YS5maWxlKTtcclxuXHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHRjYWxsYmFjaygnaHR0cHM6Ly9hcGktY29udGVudC5kcm9wYm94LmNvbS8xL2ZpbGVzX3B1dC9hdXRvLycgKyBwYXRoICsgJy8nICsgZmlsZU5hbWUpO1xyXG5cdFx0XHRcdH0sXHJcblxyXG5cdFx0XHRcdCdtZS9mb2xkZXJzJzogZnVuY3Rpb24ocCwgY2FsbGJhY2spIHtcclxuXHJcblx0XHRcdFx0XHR2YXIgbmFtZSA9IHAuZGF0YS5uYW1lO1xyXG5cdFx0XHRcdFx0cC5kYXRhID0ge307XHJcblxyXG5cdFx0XHRcdFx0Y2FsbGJhY2soJ2ZpbGVvcHMvY3JlYXRlX2ZvbGRlcj9yb290PUB7cm9vdHxzYW5kYm94fSYnICsgaGVsbG8udXRpbHMucGFyYW0oe1xyXG5cdFx0XHRcdFx0XHRwYXRoOiBuYW1lXHJcblx0XHRcdFx0XHR9KSk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9LFxyXG5cclxuXHRcdFx0Ly8gTWFwIERFTEVURSByZXF1ZXN0c1xyXG5cdFx0XHRkZWw6IHtcclxuXHRcdFx0XHQnbWUvZmlsZXMnOiAnZmlsZW9wcy9kZWxldGU/cm9vdD1Ae3Jvb3R8c2FuZGJveH0mcGF0aD1Ae2lkfScsXHJcblx0XHRcdFx0J21lL2ZvbGRlcic6ICdmaWxlb3BzL2RlbGV0ZT9yb290PUB7cm9vdHxzYW5kYm94fSZwYXRoPUB7aWR9J1xyXG5cdFx0XHR9LFxyXG5cclxuXHRcdFx0d3JhcDoge1xyXG5cdFx0XHRcdG1lOiBmdW5jdGlvbihvKSB7XHJcblx0XHRcdFx0XHRmb3JtYXRFcnJvcihvKTtcclxuXHRcdFx0XHRcdGlmICghby51aWQpIHtcclxuXHRcdFx0XHRcdFx0cmV0dXJuIG87XHJcblx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0by5uYW1lID0gby5kaXNwbGF5X25hbWU7XHJcblx0XHRcdFx0XHR2YXIgbSA9IG8ubmFtZS5zcGxpdCgnICcpO1xyXG5cdFx0XHRcdFx0by5maXJzdF9uYW1lID0gbS5zaGlmdCgpO1xyXG5cdFx0XHRcdFx0by5sYXN0X25hbWUgPSBtLmpvaW4oJyAnKTtcclxuXHRcdFx0XHRcdG8uaWQgPSBvLnVpZDtcclxuXHRcdFx0XHRcdGRlbGV0ZSBvLnVpZDtcclxuXHRcdFx0XHRcdGRlbGV0ZSBvLmRpc3BsYXlfbmFtZTtcclxuXHRcdFx0XHRcdHJldHVybiBvO1xyXG5cdFx0XHRcdH0sXHJcblxyXG5cdFx0XHRcdCdkZWZhdWx0JzogZnVuY3Rpb24obywgaGVhZGVycywgcmVxKSB7XHJcblx0XHRcdFx0XHRmb3JtYXRFcnJvcihvKTtcclxuXHRcdFx0XHRcdGlmIChvLmlzX2RpciAmJiBvLmNvbnRlbnRzKSB7XHJcblx0XHRcdFx0XHRcdG8uZGF0YSA9IG8uY29udGVudHM7XHJcblx0XHRcdFx0XHRcdGRlbGV0ZSBvLmNvbnRlbnRzO1xyXG5cclxuXHRcdFx0XHRcdFx0by5kYXRhLmZvckVhY2goZnVuY3Rpb24oaXRlbSkge1xyXG5cdFx0XHRcdFx0XHRcdGl0ZW0ucm9vdCA9IG8ucm9vdDtcclxuXHRcdFx0XHRcdFx0XHRmb3JtYXRGaWxlKGl0ZW0sIGhlYWRlcnMsIHJlcSk7XHJcblx0XHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdGZvcm1hdEZpbGUobywgaGVhZGVycywgcmVxKTtcclxuXHJcblx0XHRcdFx0XHRpZiAoby5pc19kZWxldGVkKSB7XHJcblx0XHRcdFx0XHRcdG8uc3VjY2VzcyA9IHRydWU7XHJcblx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0cmV0dXJuIG87XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9LFxyXG5cclxuXHRcdFx0Ly8gRG9lc24ndCByZXR1cm4gdGhlIENPUlMgaGVhZGVyc1xyXG5cdFx0XHR4aHI6IGZ1bmN0aW9uKHApIHtcclxuXHJcblx0XHRcdFx0Ly8gVGhlIHByb3h5IHN1cHBvcnRzIGFsbG93LWNyb3NzLW9yaWdpbi1yZXNvdXJjZVxyXG5cdFx0XHRcdC8vIEFsYXMgdGhhdCdzIHRoZSBvbmx5IHRoaW5nIHdlJ3JlIHVzaW5nLlxyXG5cdFx0XHRcdGlmIChwLmRhdGEgJiYgcC5kYXRhLmZpbGUpIHtcclxuXHRcdFx0XHRcdHZhciBmaWxlID0gcC5kYXRhLmZpbGU7XHJcblx0XHRcdFx0XHRpZiAoZmlsZSkge1xyXG5cdFx0XHRcdFx0XHRpZiAoZmlsZS5maWxlcykge1xyXG5cdFx0XHRcdFx0XHRcdHAuZGF0YSA9IGZpbGUuZmlsZXNbMF07XHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0ZWxzZSB7XHJcblx0XHRcdFx0XHRcdFx0cC5kYXRhID0gZmlsZTtcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0aWYgKHAubWV0aG9kID09PSAnZGVsZXRlJykge1xyXG5cdFx0XHRcdFx0cC5tZXRob2QgPSAncG9zdCc7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRyZXR1cm4gdHJ1ZTtcclxuXHRcdFx0fSxcclxuXHJcblx0XHRcdGZvcm06IGZ1bmN0aW9uKHAsIHFzKSB7XHJcblx0XHRcdFx0ZGVsZXRlIHFzLnN0YXRlO1xyXG5cdFx0XHRcdGRlbGV0ZSBxcy5yZWRpcmVjdF91cmk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9KTtcclxuXHJcblx0ZnVuY3Rpb24gZm9ybWF0RXJyb3Iobykge1xyXG5cdFx0aWYgKG8gJiYgJ2Vycm9yJyBpbiBvKSB7XHJcblx0XHRcdG8uZXJyb3IgPSB7XHJcblx0XHRcdFx0Y29kZTogJ3NlcnZlcl9lcnJvcicsXHJcblx0XHRcdFx0bWVzc2FnZTogby5lcnJvci5tZXNzYWdlIHx8IG8uZXJyb3JcclxuXHRcdFx0fTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGZ1bmN0aW9uIGZvcm1hdEZpbGUobywgaGVhZGVycywgcmVxKSB7XHJcblxyXG5cdFx0aWYgKHR5cGVvZiBvICE9PSAnb2JqZWN0JyB8fFxyXG5cdFx0XHQodHlwZW9mIEJsb2IgIT09ICd1bmRlZmluZWQnICYmIG8gaW5zdGFuY2VvZiBCbG9iKSB8fFxyXG5cdFx0XHQodHlwZW9mIEFycmF5QnVmZmVyICE9PSAndW5kZWZpbmVkJyAmJiBvIGluc3RhbmNlb2YgQXJyYXlCdWZmZXIpKSB7XHJcblx0XHRcdC8vIFRoaXMgaXMgYSBmaWxlLCBsZXQgaXQgdGhyb3VnaCB1bmZvcm1hdHRlZFxyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKCdlcnJvcicgaW4gbykge1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblxyXG5cdFx0dmFyIHBhdGggPSAoby5yb290ICE9PSAnYXBwX2ZvbGRlcicgPyBvLnJvb3QgOiAnJykgKyBvLnBhdGgucmVwbGFjZSgvXFwmL2csICclMjYnKTtcclxuXHRcdHBhdGggPSBwYXRoLnJlcGxhY2UoL15cXC8vLCAnJyk7XHJcblx0XHRpZiAoby50aHVtYl9leGlzdHMpIHtcclxuXHRcdFx0by50aHVtYm5haWwgPSByZXEub2F1dGhfcHJveHkgKyAnP3BhdGg9JyArXHJcblx0XHRcdGVuY29kZVVSSUNvbXBvbmVudCgnaHR0cHM6Ly9hcGktY29udGVudC5kcm9wYm94LmNvbS8xL3RodW1ibmFpbHMvYXV0by8nICsgcGF0aCArICc/Zm9ybWF0PWpwZWcmc2l6ZT1tJykgKyAnJmFjY2Vzc190b2tlbj0nICsgcmVxLm9wdGlvbnMuYWNjZXNzX3Rva2VuO1xyXG5cdFx0fVxyXG5cclxuXHRcdG8udHlwZSA9IChvLmlzX2RpciA/ICdmb2xkZXInIDogby5taW1lX3R5cGUpO1xyXG5cdFx0by5uYW1lID0gby5wYXRoLnJlcGxhY2UoLy4qXFwvL2csICcnKTtcclxuXHRcdGlmIChvLmlzX2Rpcikge1xyXG5cdFx0XHRvLmZpbGVzID0gcGF0aC5yZXBsYWNlKC9eXFwvLywgJycpO1xyXG5cdFx0fVxyXG5cdFx0ZWxzZSB7XHJcblx0XHRcdG8uZG93bmxvYWRMaW5rID0gaGVsbG8uc2V0dGluZ3Mub2F1dGhfcHJveHkgKyAnP3BhdGg9JyArXHJcblx0XHRcdGVuY29kZVVSSUNvbXBvbmVudCgnaHR0cHM6Ly9hcGktY29udGVudC5kcm9wYm94LmNvbS8xL2ZpbGVzL2F1dG8vJyArIHBhdGgpICsgJyZhY2Nlc3NfdG9rZW49JyArIHJlcS5vcHRpb25zLmFjY2Vzc190b2tlbjtcclxuXHRcdFx0by5maWxlID0gJ2h0dHBzOi8vYXBpLWNvbnRlbnQuZHJvcGJveC5jb20vMS9maWxlcy9hdXRvLycgKyBwYXRoO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmICghby5pZCkge1xyXG5cdFx0XHRvLmlkID0gby5wYXRoLnJlcGxhY2UoL15cXC8vLCAnJyk7XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gTy5tZWRpYSA9ICdodHRwczovL2FwaS1jb250ZW50LmRyb3Bib3guY29tLzEvZmlsZXMvJyArIHBhdGg7XHJcblx0fVxyXG5cclxuXHRmdW5jdGlvbiByZXEoc3RyKSB7XHJcblx0XHRyZXR1cm4gZnVuY3Rpb24ocCwgY2IpIHtcclxuXHRcdFx0ZGVsZXRlIHAucXVlcnkubGltaXQ7XHJcblx0XHRcdGNiKHN0cik7XHJcblx0XHR9O1xyXG5cdH1cclxuXHJcbn0pKGhlbGxvKTtcclxuXHJcbihmdW5jdGlvbihoZWxsbykge1xyXG5cclxuXHRoZWxsby5pbml0KHtcclxuXHJcblx0XHRmYWNlYm9vazoge1xyXG5cclxuXHRcdFx0bmFtZTogJ0ZhY2Vib29rJyxcclxuXHJcblx0XHRcdC8vIFNFRSBodHRwczovL2RldmVsb3BlcnMuZmFjZWJvb2suY29tL2RvY3MvZmFjZWJvb2stbG9naW4vbWFudWFsbHktYnVpbGQtYS1sb2dpbi1mbG93L3YyLjFcclxuXHRcdFx0b2F1dGg6IHtcclxuXHRcdFx0XHR2ZXJzaW9uOiAyLFxyXG5cdFx0XHRcdGF1dGg6ICdodHRwczovL3d3dy5mYWNlYm9vay5jb20vZGlhbG9nL29hdXRoLycsXHJcblx0XHRcdFx0Z3JhbnQ6ICdodHRwczovL2dyYXBoLmZhY2Vib29rLmNvbS9vYXV0aC9hY2Nlc3NfdG9rZW4nXHJcblx0XHRcdH0sXHJcblxyXG5cdFx0XHQvLyBBdXRob3JpemF0aW9uIHNjb3Blc1xyXG5cdFx0XHRzY29wZToge1xyXG5cdFx0XHRcdGJhc2ljOiAncHVibGljX3Byb2ZpbGUnLFxyXG5cdFx0XHRcdGVtYWlsOiAnZW1haWwnLFxyXG5cdFx0XHRcdHNoYXJlOiAndXNlcl9wb3N0cycsXHJcblx0XHRcdFx0YmlydGhkYXk6ICd1c2VyX2JpcnRoZGF5JyxcclxuXHRcdFx0XHRldmVudHM6ICd1c2VyX2V2ZW50cycsXHJcblx0XHRcdFx0cGhvdG9zOiAndXNlcl9waG90b3MnLFxyXG5cdFx0XHRcdHZpZGVvczogJ3VzZXJfdmlkZW9zJyxcclxuXHRcdFx0XHRmcmllbmRzOiAndXNlcl9mcmllbmRzJyxcclxuXHRcdFx0XHRmaWxlczogJ3VzZXJfcGhvdG9zLHVzZXJfdmlkZW9zJyxcclxuXHRcdFx0XHRwdWJsaXNoX2ZpbGVzOiAndXNlcl9waG90b3MsdXNlcl92aWRlb3MscHVibGlzaF9hY3Rpb25zJyxcclxuXHRcdFx0XHRwdWJsaXNoOiAncHVibGlzaF9hY3Rpb25zJyxcclxuXHJcblx0XHRcdFx0Ly8gRGVwcmVjYXRlZCBpbiB2Mi4wXHJcblx0XHRcdFx0Ly8gQ3JlYXRlX2V2ZW50XHQ6ICdjcmVhdGVfZXZlbnQnLFxyXG5cclxuXHRcdFx0XHRvZmZsaW5lX2FjY2VzczogJydcclxuXHRcdFx0fSxcclxuXHJcblx0XHRcdC8vIFJlZnJlc2ggdGhlIGFjY2Vzc190b2tlblxyXG5cdFx0XHRyZWZyZXNoOiBmYWxzZSxcclxuXHJcblx0XHRcdGxvZ2luOiBmdW5jdGlvbihwKSB7XHJcblxyXG5cdFx0XHRcdC8vIFJlYXV0aGVudGljYXRlXHJcblx0XHRcdFx0Ly8gaHR0cHM6Ly9kZXZlbG9wZXJzLmZhY2Vib29rLmNvbS9kb2NzL2ZhY2Vib29rLWxvZ2luL3JlYXV0aGVudGljYXRpb25cclxuXHRcdFx0XHRpZiAocC5vcHRpb25zLmZvcmNlKSB7XHJcblx0XHRcdFx0XHRwLnFzLmF1dGhfdHlwZSA9ICdyZWF1dGhlbnRpY2F0ZSc7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHQvLyBTZXQgdGhlIGRpc3BsYXkgdmFsdWVcclxuXHRcdFx0XHRwLnFzLmRpc3BsYXkgPSBwLm9wdGlvbnMuZGlzcGxheSB8fCAncG9wdXAnO1xyXG5cdFx0XHR9LFxyXG5cclxuXHRcdFx0bG9nb3V0OiBmdW5jdGlvbihjYWxsYmFjaywgb3B0aW9ucykge1xyXG5cdFx0XHRcdC8vIEFzc2lnbiBjYWxsYmFjayB0byBhIGdsb2JhbCBoYW5kbGVyXHJcblx0XHRcdFx0dmFyIGNhbGxiYWNrSUQgPSBoZWxsby51dGlscy5nbG9iYWxFdmVudChjYWxsYmFjayk7XHJcblx0XHRcdFx0dmFyIHJlZGlyZWN0ID0gZW5jb2RlVVJJQ29tcG9uZW50KGhlbGxvLnNldHRpbmdzLnJlZGlyZWN0X3VyaSArICc/JyArIGhlbGxvLnV0aWxzLnBhcmFtKHtjYWxsYmFjazpjYWxsYmFja0lELCByZXN1bHQ6IEpTT04uc3RyaW5naWZ5KHtmb3JjZTp0cnVlfSksIHN0YXRlOiAne30nfSkpO1xyXG5cdFx0XHRcdHZhciB0b2tlbiA9IChvcHRpb25zLmF1dGhSZXNwb25zZSB8fCB7fSkuYWNjZXNzX3Rva2VuO1xyXG5cdFx0XHRcdGhlbGxvLnV0aWxzLmlmcmFtZSgnaHR0cHM6Ly93d3cuZmFjZWJvb2suY29tL2xvZ291dC5waHA/bmV4dD0nICsgcmVkaXJlY3QgKyAnJmFjY2Vzc190b2tlbj0nICsgdG9rZW4pO1xyXG5cclxuXHRcdFx0XHQvLyBQb3NzaWJsZSByZXNwb25zZXM6XHJcblx0XHRcdFx0Ly8gU3RyaW5nIFVSTFx0LSBoZWxsby5sb2dvdXQgc2hvdWxkIGhhbmRsZSB0aGUgbG9nb3V0XHJcblx0XHRcdFx0Ly8gVW5kZWZpbmVkXHQtIHRoaXMgZnVuY3Rpb24gd2lsbCBoYW5kbGUgdGhlIGNhbGxiYWNrXHJcblx0XHRcdFx0Ly8gVHJ1ZSAtIHRocm93IGEgc3VjY2VzcywgdGhpcyBjYWxsYmFjayBpc24ndCBoYW5kbGluZyB0aGUgY2FsbGJhY2tcclxuXHRcdFx0XHQvLyBGYWxzZSAtIHRocm93IGEgZXJyb3JcclxuXHRcdFx0XHRpZiAoIXRva2VuKSB7XHJcblx0XHRcdFx0XHQvLyBJZiB0aGVyZSBpc24ndCBhIHRva2VuLCB0aGUgYWJvdmUgd29udCByZXR1cm4gYSByZXNwb25zZSwgc28gbGV0cyB0cmlnZ2VyIGEgcmVzcG9uc2VcclxuXHRcdFx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0sXHJcblxyXG5cdFx0XHQvLyBBUEkgQmFzZSBVUkxcclxuXHRcdFx0YmFzZTogJ2h0dHBzOi8vZ3JhcGguZmFjZWJvb2suY29tL3YyLjcvJyxcclxuXHJcblx0XHRcdC8vIE1hcCBHRVQgcmVxdWVzdHNcclxuXHRcdFx0Z2V0OiB7XHJcblx0XHRcdFx0bWU6ICdtZT9maWVsZHM9ZW1haWwsZmlyc3RfbmFtZSxsYXN0X25hbWUsbmFtZSx0aW1lem9uZSx2ZXJpZmllZCcsXHJcblx0XHRcdFx0J21lL2ZyaWVuZHMnOiAnbWUvZnJpZW5kcycsXHJcblx0XHRcdFx0J21lL2ZvbGxvd2luZyc6ICdtZS9mcmllbmRzJyxcclxuXHRcdFx0XHQnbWUvZm9sbG93ZXJzJzogJ21lL2ZyaWVuZHMnLFxyXG5cdFx0XHRcdCdtZS9zaGFyZSc6ICdtZS9mZWVkJyxcclxuXHRcdFx0XHQnbWUvbGlrZSc6ICdtZS9saWtlcycsXHJcblx0XHRcdFx0J21lL2ZpbGVzJzogJ21lL2FsYnVtcycsXHJcblx0XHRcdFx0J21lL2FsYnVtcyc6ICdtZS9hbGJ1bXM/ZmllbGRzPWNvdmVyX3Bob3RvLG5hbWUnLFxyXG5cdFx0XHRcdCdtZS9hbGJ1bSc6ICdAe2lkfS9waG90b3M/ZmllbGRzPXBpY3R1cmUnLFxyXG5cdFx0XHRcdCdtZS9waG90b3MnOiAnbWUvcGhvdG9zJyxcclxuXHRcdFx0XHQnbWUvcGhvdG8nOiAnQHtpZH0nLFxyXG5cdFx0XHRcdCdmcmllbmQvYWxidW1zJzogJ0B7aWR9L2FsYnVtcycsXHJcblx0XHRcdFx0J2ZyaWVuZC9waG90b3MnOiAnQHtpZH0vcGhvdG9zJ1xyXG5cclxuXHRcdFx0XHQvLyBQYWdpbmF0aW9uXHJcblx0XHRcdFx0Ly8gSHR0cHM6Ly9kZXZlbG9wZXJzLmZhY2Vib29rLmNvbS9kb2NzL3JlZmVyZW5jZS9hcGkvcGFnaW5hdGlvbi9cclxuXHRcdFx0fSxcclxuXHJcblx0XHRcdC8vIE1hcCBQT1NUIHJlcXVlc3RzXHJcblx0XHRcdHBvc3Q6IHtcclxuXHRcdFx0XHQnbWUvc2hhcmUnOiAnbWUvZmVlZCcsXHJcblx0XHRcdFx0J21lL3Bob3RvJzogJ0B7aWR9J1xyXG5cclxuXHRcdFx0XHQvLyBIdHRwczovL2RldmVsb3BlcnMuZmFjZWJvb2suY29tL2RvY3MvZ3JhcGgtYXBpL3JlZmVyZW5jZS92Mi4yL29iamVjdC9saWtlcy9cclxuXHRcdFx0fSxcclxuXHJcblx0XHRcdHdyYXA6IHtcclxuXHRcdFx0XHRtZTogZm9ybWF0VXNlcixcclxuXHRcdFx0XHQnbWUvZnJpZW5kcyc6IGZvcm1hdEZyaWVuZHMsXHJcblx0XHRcdFx0J21lL2ZvbGxvd2luZyc6IGZvcm1hdEZyaWVuZHMsXHJcblx0XHRcdFx0J21lL2ZvbGxvd2Vycyc6IGZvcm1hdEZyaWVuZHMsXHJcblx0XHRcdFx0J21lL2FsYnVtcyc6IGZvcm1hdCxcclxuXHRcdFx0XHQnbWUvcGhvdG9zJzogZm9ybWF0LFxyXG5cdFx0XHRcdCdtZS9maWxlcyc6IGZvcm1hdCxcclxuXHRcdFx0XHQnZGVmYXVsdCc6IGZvcm1hdFxyXG5cdFx0XHR9LFxyXG5cclxuXHRcdFx0Ly8gU3BlY2lhbCByZXF1aXJlbWVudHMgZm9yIGhhbmRsaW5nIFhIUlxyXG5cdFx0XHR4aHI6IGZ1bmN0aW9uKHAsIHFzKSB7XHJcblx0XHRcdFx0aWYgKHAubWV0aG9kID09PSAnZ2V0JyB8fCBwLm1ldGhvZCA9PT0gJ3Bvc3QnKSB7XHJcblx0XHRcdFx0XHRxcy5zdXBwcmVzc19yZXNwb25zZV9jb2RlcyA9IHRydWU7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHQvLyBJcyB0aGlzIGEgcG9zdCB3aXRoIGEgZGF0YS11cmk/XHJcblx0XHRcdFx0aWYgKHAubWV0aG9kID09PSAncG9zdCcgJiYgcC5kYXRhICYmIHR5cGVvZiAocC5kYXRhLmZpbGUpID09PSAnc3RyaW5nJykge1xyXG5cdFx0XHRcdFx0Ly8gQ29udmVydCB0aGUgRGF0YS1VUkkgdG8gYSBCbG9iXHJcblx0XHRcdFx0XHRwLmRhdGEuZmlsZSA9IGhlbGxvLnV0aWxzLnRvQmxvYihwLmRhdGEuZmlsZSk7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRyZXR1cm4gdHJ1ZTtcclxuXHRcdFx0fSxcclxuXHJcblx0XHRcdC8vIFNwZWNpYWwgcmVxdWlyZW1lbnRzIGZvciBoYW5kbGluZyBKU09OUCBmYWxsYmFja1xyXG5cdFx0XHRqc29ucDogZnVuY3Rpb24ocCwgcXMpIHtcclxuXHRcdFx0XHR2YXIgbSA9IHAubWV0aG9kO1xyXG5cdFx0XHRcdGlmIChtICE9PSAnZ2V0JyAmJiAhaGVsbG8udXRpbHMuaGFzQmluYXJ5KHAuZGF0YSkpIHtcclxuXHRcdFx0XHRcdHAuZGF0YS5tZXRob2QgPSBtO1xyXG5cdFx0XHRcdFx0cC5tZXRob2QgPSAnZ2V0JztcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0ZWxzZSBpZiAocC5tZXRob2QgPT09ICdkZWxldGUnKSB7XHJcblx0XHRcdFx0XHRxcy5tZXRob2QgPSAnZGVsZXRlJztcclxuXHRcdFx0XHRcdHAubWV0aG9kID0gJ3Bvc3QnO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSxcclxuXHJcblx0XHRcdC8vIFNwZWNpYWwgcmVxdWlyZW1lbnRzIGZvciBpZnJhbWUgZm9ybSBoYWNrXHJcblx0XHRcdGZvcm06IGZ1bmN0aW9uKHApIHtcclxuXHRcdFx0XHRyZXR1cm4ge1xyXG5cdFx0XHRcdFx0Ly8gRmlyZSB0aGUgY2FsbGJhY2sgb25sb2FkXHJcblx0XHRcdFx0XHRjYWxsYmFja29ubG9hZDogdHJ1ZVxyXG5cdFx0XHRcdH07XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9KTtcclxuXHJcblx0dmFyIGJhc2UgPSAnaHR0cHM6Ly9ncmFwaC5mYWNlYm9vay5jb20vJztcclxuXHJcblx0ZnVuY3Rpb24gZm9ybWF0VXNlcihvKSB7XHJcblx0XHRpZiAoby5pZCkge1xyXG5cdFx0XHRvLnRodW1ibmFpbCA9IG8ucGljdHVyZSA9ICdodHRwczovL2dyYXBoLmZhY2Vib29rLmNvbS8nICsgby5pZCArICcvcGljdHVyZSc7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIG87XHJcblx0fVxyXG5cclxuXHRmdW5jdGlvbiBmb3JtYXRGcmllbmRzKG8pIHtcclxuXHRcdGlmICgnZGF0YScgaW4gbykge1xyXG5cdFx0XHRvLmRhdGEuZm9yRWFjaChmb3JtYXRVc2VyKTtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gbztcclxuXHR9XHJcblxyXG5cdGZ1bmN0aW9uIGZvcm1hdChvLCBoZWFkZXJzLCByZXEpIHtcclxuXHRcdGlmICh0eXBlb2YgbyA9PT0gJ2Jvb2xlYW4nKSB7XHJcblx0XHRcdG8gPSB7c3VjY2Vzczogb307XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKG8gJiYgJ2RhdGEnIGluIG8pIHtcclxuXHRcdFx0dmFyIHRva2VuID0gcmVxLnF1ZXJ5LmFjY2Vzc190b2tlbjtcclxuXHJcblx0XHRcdGlmICghKG8uZGF0YSBpbnN0YW5jZW9mIEFycmF5KSkge1xyXG5cdFx0XHRcdHZhciBkYXRhID0gby5kYXRhO1xyXG5cdFx0XHRcdGRlbGV0ZSBvLmRhdGE7XHJcblx0XHRcdFx0by5kYXRhID0gW2RhdGFdO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRvLmRhdGEuZm9yRWFjaChmdW5jdGlvbihkKSB7XHJcblxyXG5cdFx0XHRcdGlmIChkLnBpY3R1cmUpIHtcclxuXHRcdFx0XHRcdGQudGh1bWJuYWlsID0gZC5waWN0dXJlO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0ZC5waWN0dXJlcyA9IChkLmltYWdlcyB8fCBbXSlcclxuXHRcdFx0XHRcdC5zb3J0KGZ1bmN0aW9uKGEsIGIpIHtcclxuXHRcdFx0XHRcdFx0cmV0dXJuIGEud2lkdGggLSBiLndpZHRoO1xyXG5cdFx0XHRcdFx0fSk7XHJcblxyXG5cdFx0XHRcdGlmIChkLmNvdmVyX3Bob3RvICYmIGQuY292ZXJfcGhvdG8uaWQpIHtcclxuXHRcdFx0XHRcdGQudGh1bWJuYWlsID0gYmFzZSArIGQuY292ZXJfcGhvdG8uaWQgKyAnL3BpY3R1cmU/YWNjZXNzX3Rva2VuPScgKyB0b2tlbjtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdGlmIChkLnR5cGUgPT09ICdhbGJ1bScpIHtcclxuXHRcdFx0XHRcdGQuZmlsZXMgPSBkLnBob3RvcyA9IGJhc2UgKyBkLmlkICsgJy9waG90b3MnO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0aWYgKGQuY2FuX3VwbG9hZCkge1xyXG5cdFx0XHRcdFx0ZC51cGxvYWRfbG9jYXRpb24gPSBiYXNlICsgZC5pZCArICcvcGhvdG9zJztcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0pO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBvO1xyXG5cdH1cclxuXHJcbn0pKGhlbGxvKTtcclxuXHJcbihmdW5jdGlvbihoZWxsbykge1xyXG5cclxuXHRoZWxsby5pbml0KHtcclxuXHJcblx0XHRmbGlja3I6IHtcclxuXHJcblx0XHRcdG5hbWU6ICdGbGlja3InLFxyXG5cclxuXHRcdFx0Ly8gRW5zdXJlIHRoYXQgeW91IGRlZmluZSBhbiBvYXV0aF9wcm94eVxyXG5cdFx0XHRvYXV0aDoge1xyXG5cdFx0XHRcdHZlcnNpb246ICcxLjBhJyxcclxuXHRcdFx0XHRhdXRoOiAnaHR0cHM6Ly93d3cuZmxpY2tyLmNvbS9zZXJ2aWNlcy9vYXV0aC9hdXRob3JpemU/cGVybXM9cmVhZCcsXHJcblx0XHRcdFx0cmVxdWVzdDogJ2h0dHBzOi8vd3d3LmZsaWNrci5jb20vc2VydmljZXMvb2F1dGgvcmVxdWVzdF90b2tlbicsXHJcblx0XHRcdFx0dG9rZW46ICdodHRwczovL3d3dy5mbGlja3IuY29tL3NlcnZpY2VzL29hdXRoL2FjY2Vzc190b2tlbidcclxuXHRcdFx0fSxcclxuXHJcblx0XHRcdC8vIEFQSSBiYXNlIFVSTFxyXG5cdFx0XHRiYXNlOiAnaHR0cHM6Ly9hcGkuZmxpY2tyLmNvbS9zZXJ2aWNlcy9yZXN0JyxcclxuXHJcblx0XHRcdC8vIE1hcCBHRVQgcmVzcXVlc3RzXHJcblx0XHRcdGdldDoge1xyXG5cdFx0XHRcdG1lOiBzaWduKCdmbGlja3IucGVvcGxlLmdldEluZm8nKSxcclxuXHRcdFx0XHQnbWUvZnJpZW5kcyc6IHNpZ24oJ2ZsaWNrci5jb250YWN0cy5nZXRMaXN0Jywge3Blcl9wYWdlOidAe2xpbWl0fDUwfSd9KSxcclxuXHRcdFx0XHQnbWUvZm9sbG93aW5nJzogc2lnbignZmxpY2tyLmNvbnRhY3RzLmdldExpc3QnLCB7cGVyX3BhZ2U6J0B7bGltaXR8NTB9J30pLFxyXG5cdFx0XHRcdCdtZS9mb2xsb3dlcnMnOiBzaWduKCdmbGlja3IuY29udGFjdHMuZ2V0TGlzdCcsIHtwZXJfcGFnZTonQHtsaW1pdHw1MH0nfSksXHJcblx0XHRcdFx0J21lL2FsYnVtcyc6IHNpZ24oJ2ZsaWNrci5waG90b3NldHMuZ2V0TGlzdCcsIHtwZXJfcGFnZTonQHtsaW1pdHw1MH0nfSksXHJcblx0XHRcdFx0J21lL2FsYnVtJzogc2lnbignZmxpY2tyLnBob3Rvc2V0cy5nZXRQaG90b3MnLCB7cGhvdG9zZXRfaWQ6ICdAe2lkfSd9KSxcclxuXHRcdFx0XHQnbWUvcGhvdG9zJzogc2lnbignZmxpY2tyLnBlb3BsZS5nZXRQaG90b3MnLCB7cGVyX3BhZ2U6J0B7bGltaXR8NTB9J30pXHJcblx0XHRcdH0sXHJcblxyXG5cdFx0XHR3cmFwOiB7XHJcblx0XHRcdFx0bWU6IGZ1bmN0aW9uKG8pIHtcclxuXHRcdFx0XHRcdGZvcm1hdEVycm9yKG8pO1xyXG5cdFx0XHRcdFx0byA9IGNoZWNrUmVzcG9uc2UobywgJ3BlcnNvbicpO1xyXG5cdFx0XHRcdFx0aWYgKG8uaWQpIHtcclxuXHRcdFx0XHRcdFx0aWYgKG8ucmVhbG5hbWUpIHtcclxuXHRcdFx0XHRcdFx0XHRvLm5hbWUgPSBvLnJlYWxuYW1lLl9jb250ZW50O1xyXG5cdFx0XHRcdFx0XHRcdHZhciBtID0gby5uYW1lLnNwbGl0KCcgJyk7XHJcblx0XHRcdFx0XHRcdFx0by5maXJzdF9uYW1lID0gbS5zaGlmdCgpO1xyXG5cdFx0XHRcdFx0XHRcdG8ubGFzdF9uYW1lID0gbS5qb2luKCcgJyk7XHJcblx0XHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHRcdG8udGh1bWJuYWlsID0gZ2V0QnVkZHlJY29uKG8sICdsJyk7XHJcblx0XHRcdFx0XHRcdG8ucGljdHVyZSA9IGdldEJ1ZGR5SWNvbihvLCAnbCcpO1xyXG5cdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdHJldHVybiBvO1xyXG5cdFx0XHRcdH0sXHJcblxyXG5cdFx0XHRcdCdtZS9mcmllbmRzJzogZm9ybWF0RnJpZW5kcyxcclxuXHRcdFx0XHQnbWUvZm9sbG93ZXJzJzogZm9ybWF0RnJpZW5kcyxcclxuXHRcdFx0XHQnbWUvZm9sbG93aW5nJzogZm9ybWF0RnJpZW5kcyxcclxuXHRcdFx0XHQnbWUvYWxidW1zJzogZnVuY3Rpb24obykge1xyXG5cdFx0XHRcdFx0Zm9ybWF0RXJyb3Iobyk7XHJcblx0XHRcdFx0XHRvID0gY2hlY2tSZXNwb25zZShvLCAncGhvdG9zZXRzJyk7XHJcblx0XHRcdFx0XHRwYWdpbmcobyk7XHJcblx0XHRcdFx0XHRpZiAoby5waG90b3NldCkge1xyXG5cdFx0XHRcdFx0XHRvLmRhdGEgPSBvLnBob3Rvc2V0O1xyXG5cdFx0XHRcdFx0XHRvLmRhdGEuZm9yRWFjaChmdW5jdGlvbihpdGVtKSB7XHJcblx0XHRcdFx0XHRcdFx0aXRlbS5uYW1lID0gaXRlbS50aXRsZS5fY29udGVudDtcclxuXHRcdFx0XHRcdFx0XHRpdGVtLnBob3RvcyA9ICdodHRwczovL2FwaS5mbGlja3IuY29tL3NlcnZpY2VzL3Jlc3QnICsgZ2V0QXBpVXJsKCdmbGlja3IucGhvdG9zZXRzLmdldFBob3RvcycsIHtwaG90b3NldF9pZDogaXRlbS5pZH0sIHRydWUpO1xyXG5cdFx0XHRcdFx0XHR9KTtcclxuXHJcblx0XHRcdFx0XHRcdGRlbGV0ZSBvLnBob3Rvc2V0O1xyXG5cdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdHJldHVybiBvO1xyXG5cdFx0XHRcdH0sXHJcblxyXG5cdFx0XHRcdCdtZS9waG90b3MnOiBmdW5jdGlvbihvKSB7XHJcblx0XHRcdFx0XHRmb3JtYXRFcnJvcihvKTtcclxuXHRcdFx0XHRcdHJldHVybiBmb3JtYXRQaG90b3Mobyk7XHJcblx0XHRcdFx0fSxcclxuXHJcblx0XHRcdFx0J2RlZmF1bHQnOiBmdW5jdGlvbihvKSB7XHJcblx0XHRcdFx0XHRmb3JtYXRFcnJvcihvKTtcclxuXHRcdFx0XHRcdHJldHVybiBmb3JtYXRQaG90b3Mobyk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9LFxyXG5cclxuXHRcdFx0eGhyOiBmYWxzZSxcclxuXHJcblx0XHRcdGpzb25wOiBmdW5jdGlvbihwLCBxcykge1xyXG5cdFx0XHRcdGlmIChwLm1ldGhvZCA9PSAnZ2V0Jykge1xyXG5cdFx0XHRcdFx0ZGVsZXRlIHFzLmNhbGxiYWNrO1xyXG5cdFx0XHRcdFx0cXMuanNvbmNhbGxiYWNrID0gcC5jYWxsYmFja0lEO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH0pO1xyXG5cclxuXHRmdW5jdGlvbiBnZXRBcGlVcmwobWV0aG9kLCBleHRyYVBhcmFtcywgc2tpcE5ldHdvcmspIHtcclxuXHRcdHZhciB1cmwgPSAoKHNraXBOZXR3b3JrKSA/ICcnIDogJ2ZsaWNrcjonKSArXHJcblx0XHRcdCc/bWV0aG9kPScgKyBtZXRob2QgK1xyXG5cdFx0XHQnJmFwaV9rZXk9JyArIGhlbGxvLnNlcnZpY2VzLmZsaWNrci5pZCArXHJcblx0XHRcdCcmZm9ybWF0PWpzb24nO1xyXG5cdFx0Zm9yICh2YXIgcGFyYW0gaW4gZXh0cmFQYXJhbXMpIHtcclxuXHRcdFx0aWYgKGV4dHJhUGFyYW1zLmhhc093blByb3BlcnR5KHBhcmFtKSkge1xyXG5cdFx0XHRcdHVybCArPSAnJicgKyBwYXJhbSArICc9JyArIGV4dHJhUGFyYW1zW3BhcmFtXTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiB1cmw7XHJcblx0fVxyXG5cclxuXHQvLyBUaGlzIGlzIG5vdCBleGFjdGx5IG5lYXQgYnV0IGF2b2lkIHRvIGNhbGxcclxuXHQvLyBUaGUgbWV0aG9kICdmbGlja3IudGVzdC5sb2dpbicgZm9yIGVhY2ggYXBpIGNhbGxcclxuXHJcblx0ZnVuY3Rpb24gd2l0aFVzZXIoY2IpIHtcclxuXHRcdHZhciBhdXRoID0gaGVsbG8uZ2V0QXV0aFJlc3BvbnNlKCdmbGlja3InKTtcclxuXHRcdGNiKGF1dGggJiYgYXV0aC51c2VyX25zaWQgPyBhdXRoLnVzZXJfbnNpZCA6IG51bGwpO1xyXG5cdH1cclxuXHJcblx0ZnVuY3Rpb24gc2lnbih1cmwsIHBhcmFtcykge1xyXG5cdFx0aWYgKCFwYXJhbXMpIHtcclxuXHRcdFx0cGFyYW1zID0ge307XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIGZ1bmN0aW9uKHAsIGNhbGxiYWNrKSB7XHJcblx0XHRcdHdpdGhVc2VyKGZ1bmN0aW9uKHVzZXJJZCkge1xyXG5cdFx0XHRcdHBhcmFtcy51c2VyX2lkID0gdXNlcklkO1xyXG5cdFx0XHRcdGNhbGxiYWNrKGdldEFwaVVybCh1cmwsIHBhcmFtcywgdHJ1ZSkpO1xyXG5cdFx0XHR9KTtcclxuXHRcdH07XHJcblx0fVxyXG5cclxuXHRmdW5jdGlvbiBnZXRCdWRkeUljb24ocHJvZmlsZSwgc2l6ZSkge1xyXG5cdFx0dmFyIHVybCA9ICdodHRwczovL3d3dy5mbGlja3IuY29tL2ltYWdlcy9idWRkeWljb24uZ2lmJztcclxuXHRcdGlmIChwcm9maWxlLm5zaWQgJiYgcHJvZmlsZS5pY29uc2VydmVyICYmIHByb2ZpbGUuaWNvbmZhcm0pIHtcclxuXHRcdFx0dXJsID0gJ2h0dHBzOi8vZmFybScgKyBwcm9maWxlLmljb25mYXJtICsgJy5zdGF0aWNmbGlja3IuY29tLycgK1xyXG5cdFx0XHRcdHByb2ZpbGUuaWNvbnNlcnZlciArICcvJyArXHJcblx0XHRcdFx0J2J1ZGR5aWNvbnMvJyArIHByb2ZpbGUubnNpZCArXHJcblx0XHRcdFx0KChzaXplKSA/ICdfJyArIHNpemUgOiAnJykgKyAnLmpwZyc7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIHVybDtcclxuXHR9XHJcblxyXG5cdC8vIFNlZTogaHR0cHM6Ly93d3cuZmxpY2tyLmNvbS9zZXJ2aWNlcy9hcGkvbWlzYy51cmxzLmh0bWxcclxuXHRmdW5jdGlvbiBjcmVhdGVQaG90b1VybChpZCwgZmFybSwgc2VydmVyLCBzZWNyZXQsIHNpemUpIHtcclxuXHRcdHNpemUgPSAoc2l6ZSkgPyAnXycgKyBzaXplIDogJyc7XHJcblx0XHRyZXR1cm4gJ2h0dHBzOi8vZmFybScgKyBmYXJtICsgJy5zdGF0aWNmbGlja3IuY29tLycgKyBzZXJ2ZXIgKyAnLycgKyBpZCArICdfJyArIHNlY3JldCArIHNpemUgKyAnLmpwZyc7XHJcblx0fVxyXG5cclxuXHRmdW5jdGlvbiBmb3JtYXRVc2VyKG8pIHtcclxuXHR9XHJcblxyXG5cdGZ1bmN0aW9uIGZvcm1hdEVycm9yKG8pIHtcclxuXHRcdGlmIChvICYmIG8uc3RhdCAmJiBvLnN0YXQudG9Mb3dlckNhc2UoKSAhPSAnb2snKSB7XHJcblx0XHRcdG8uZXJyb3IgPSB7XHJcblx0XHRcdFx0Y29kZTogJ2ludmFsaWRfcmVxdWVzdCcsXHJcblx0XHRcdFx0bWVzc2FnZTogby5tZXNzYWdlXHJcblx0XHRcdH07XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRmdW5jdGlvbiBmb3JtYXRQaG90b3Mobykge1xyXG5cdFx0aWYgKG8ucGhvdG9zZXQgfHwgby5waG90b3MpIHtcclxuXHRcdFx0dmFyIHNldCA9ICgncGhvdG9zZXQnIGluIG8pID8gJ3Bob3Rvc2V0JyA6ICdwaG90b3MnO1xyXG5cdFx0XHRvID0gY2hlY2tSZXNwb25zZShvLCBzZXQpO1xyXG5cdFx0XHRwYWdpbmcobyk7XHJcblx0XHRcdG8uZGF0YSA9IG8ucGhvdG87XHJcblx0XHRcdGRlbGV0ZSBvLnBob3RvO1xyXG5cdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IG8uZGF0YS5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHRcdHZhciBwaG90byA9IG8uZGF0YVtpXTtcclxuXHRcdFx0XHRwaG90by5uYW1lID0gcGhvdG8udGl0bGU7XHJcblx0XHRcdFx0cGhvdG8ucGljdHVyZSA9IGNyZWF0ZVBob3RvVXJsKHBob3RvLmlkLCBwaG90by5mYXJtLCBwaG90by5zZXJ2ZXIsIHBob3RvLnNlY3JldCwgJycpO1xyXG5cdFx0XHRcdHBob3RvLnBpY3R1cmVzID0gY3JlYXRlUGljdHVyZXMocGhvdG8uaWQsIHBob3RvLmZhcm0sIHBob3RvLnNlcnZlciwgcGhvdG8uc2VjcmV0KTtcclxuXHRcdFx0XHRwaG90by5zb3VyY2UgPSBjcmVhdGVQaG90b1VybChwaG90by5pZCwgcGhvdG8uZmFybSwgcGhvdG8uc2VydmVyLCBwaG90by5zZWNyZXQsICdiJyk7XHJcblx0XHRcdFx0cGhvdG8udGh1bWJuYWlsID0gY3JlYXRlUGhvdG9VcmwocGhvdG8uaWQsIHBob3RvLmZhcm0sIHBob3RvLnNlcnZlciwgcGhvdG8uc2VjcmV0LCAnbScpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIG87XHJcblx0fVxyXG5cclxuXHQvLyBTZWU6IGh0dHBzOi8vd3d3LmZsaWNrci5jb20vc2VydmljZXMvYXBpL21pc2MudXJscy5odG1sXHJcblx0ZnVuY3Rpb24gY3JlYXRlUGljdHVyZXMoaWQsIGZhcm0sIHNlcnZlciwgc2VjcmV0KSB7XHJcblxyXG5cdFx0dmFyIE5PX0xJTUlUID0gMjA0ODtcclxuXHRcdHZhciBzaXplcyA9IFtcclxuXHRcdFx0e2lkOiAndCcsIG1heDogMTAwfSxcclxuXHRcdFx0e2lkOiAnbScsIG1heDogMjQwfSxcclxuXHRcdFx0e2lkOiAnbicsIG1heDogMzIwfSxcclxuXHRcdFx0e2lkOiAnJywgbWF4OiA1MDB9LFxyXG5cdFx0XHR7aWQ6ICd6JywgbWF4OiA2NDB9LFxyXG5cdFx0XHR7aWQ6ICdjJywgbWF4OiA4MDB9LFxyXG5cdFx0XHR7aWQ6ICdiJywgbWF4OiAxMDI0fSxcclxuXHRcdFx0e2lkOiAnaCcsIG1heDogMTYwMH0sXHJcblx0XHRcdHtpZDogJ2snLCBtYXg6IDIwNDh9LFxyXG5cdFx0XHR7aWQ6ICdvJywgbWF4OiBOT19MSU1JVH1cclxuXHRcdF07XHJcblxyXG5cdFx0cmV0dXJuIHNpemVzLm1hcChmdW5jdGlvbihzaXplKSB7XHJcblx0XHRcdHJldHVybiB7XHJcblx0XHRcdFx0c291cmNlOiBjcmVhdGVQaG90b1VybChpZCwgZmFybSwgc2VydmVyLCBzZWNyZXQsIHNpemUuaWQpLFxyXG5cclxuXHRcdFx0XHQvLyBOb3RlOiB0aGlzIGlzIGEgZ3Vlc3MgdGhhdCdzIGFsbW9zdCBjZXJ0YWluIHRvIGJlIHdyb25nICh1bmxlc3Mgc3F1YXJlIHNvdXJjZSlcclxuXHRcdFx0XHR3aWR0aDogc2l6ZS5tYXgsXHJcblx0XHRcdFx0aGVpZ2h0OiBzaXplLm1heFxyXG5cdFx0XHR9O1xyXG5cdFx0fSk7XHJcblx0fVxyXG5cclxuXHRmdW5jdGlvbiBjaGVja1Jlc3BvbnNlKG8sIGtleSkge1xyXG5cclxuXHRcdGlmIChrZXkgaW4gbykge1xyXG5cdFx0XHRvID0gb1trZXldO1xyXG5cdFx0fVxyXG5cdFx0ZWxzZSBpZiAoISgnZXJyb3InIGluIG8pKSB7XHJcblx0XHRcdG8uZXJyb3IgPSB7XHJcblx0XHRcdFx0Y29kZTogJ2ludmFsaWRfcmVxdWVzdCcsXHJcblx0XHRcdFx0bWVzc2FnZTogby5tZXNzYWdlIHx8ICdGYWlsZWQgdG8gZ2V0IGRhdGEgZnJvbSBGbGlja3InXHJcblx0XHRcdH07XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIG87XHJcblx0fVxyXG5cclxuXHRmdW5jdGlvbiBmb3JtYXRGcmllbmRzKG8pIHtcclxuXHRcdGZvcm1hdEVycm9yKG8pO1xyXG5cdFx0aWYgKG8uY29udGFjdHMpIHtcclxuXHRcdFx0byA9IGNoZWNrUmVzcG9uc2UobywgJ2NvbnRhY3RzJyk7XHJcblx0XHRcdHBhZ2luZyhvKTtcclxuXHRcdFx0by5kYXRhID0gby5jb250YWN0O1xyXG5cdFx0XHRkZWxldGUgby5jb250YWN0O1xyXG5cdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IG8uZGF0YS5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHRcdHZhciBpdGVtID0gby5kYXRhW2ldO1xyXG5cdFx0XHRcdGl0ZW0uaWQgPSBpdGVtLm5zaWQ7XHJcblx0XHRcdFx0aXRlbS5uYW1lID0gaXRlbS5yZWFsbmFtZSB8fCBpdGVtLnVzZXJuYW1lO1xyXG5cdFx0XHRcdGl0ZW0udGh1bWJuYWlsID0gZ2V0QnVkZHlJY29uKGl0ZW0sICdtJyk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gbztcclxuXHR9XHJcblxyXG5cdGZ1bmN0aW9uIHBhZ2luZyhyZXMpIHtcclxuXHRcdGlmIChyZXMucGFnZSAmJiByZXMucGFnZXMgJiYgcmVzLnBhZ2UgIT09IHJlcy5wYWdlcykge1xyXG5cdFx0XHRyZXMucGFnaW5nID0ge1xyXG5cdFx0XHRcdG5leHQ6ICc/cGFnZT0nICsgKCsrcmVzLnBhZ2UpXHJcblx0XHRcdH07XHJcblx0XHR9XHJcblx0fVxyXG5cclxufSkoaGVsbG8pO1xyXG5cclxuKGZ1bmN0aW9uKGhlbGxvKSB7XHJcblxyXG5cdGhlbGxvLmluaXQoe1xyXG5cclxuXHRcdGZvdXJzcXVhcmU6IHtcclxuXHJcblx0XHRcdG5hbWU6ICdGb3Vyc3F1YXJlJyxcclxuXHJcblx0XHRcdG9hdXRoOiB7XHJcblx0XHRcdFx0Ly8gU2VlOiBodHRwczovL2RldmVsb3Blci5mb3Vyc3F1YXJlLmNvbS9vdmVydmlldy9hdXRoXHJcblx0XHRcdFx0dmVyc2lvbjogMixcclxuXHRcdFx0XHRhdXRoOiAnaHR0cHM6Ly9mb3Vyc3F1YXJlLmNvbS9vYXV0aDIvYXV0aGVudGljYXRlJyxcclxuXHRcdFx0XHRncmFudDogJ2h0dHBzOi8vZm91cnNxdWFyZS5jb20vb2F1dGgyL2FjY2Vzc190b2tlbidcclxuXHRcdFx0fSxcclxuXHJcblx0XHRcdC8vIFJlZnJlc2ggdGhlIGFjY2Vzc190b2tlbiBvbmNlIGV4cGlyZWRcclxuXHRcdFx0cmVmcmVzaDogdHJ1ZSxcclxuXHJcblx0XHRcdGJhc2U6ICdodHRwczovL2FwaS5mb3Vyc3F1YXJlLmNvbS92Mi8nLFxyXG5cclxuXHRcdFx0Z2V0OiB7XHJcblx0XHRcdFx0bWU6ICd1c2Vycy9zZWxmJyxcclxuXHRcdFx0XHQnbWUvZnJpZW5kcyc6ICd1c2Vycy9zZWxmL2ZyaWVuZHMnLFxyXG5cdFx0XHRcdCdtZS9mb2xsb3dlcnMnOiAndXNlcnMvc2VsZi9mcmllbmRzJyxcclxuXHRcdFx0XHQnbWUvZm9sbG93aW5nJzogJ3VzZXJzL3NlbGYvZnJpZW5kcydcclxuXHRcdFx0fSxcclxuXHJcblx0XHRcdHdyYXA6IHtcclxuXHRcdFx0XHRtZTogZnVuY3Rpb24obykge1xyXG5cdFx0XHRcdFx0Zm9ybWF0RXJyb3Iobyk7XHJcblx0XHRcdFx0XHRpZiAobyAmJiBvLnJlc3BvbnNlKSB7XHJcblx0XHRcdFx0XHRcdG8gPSBvLnJlc3BvbnNlLnVzZXI7XHJcblx0XHRcdFx0XHRcdGZvcm1hdFVzZXIobyk7XHJcblx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0cmV0dXJuIG87XHJcblx0XHRcdFx0fSxcclxuXHJcblx0XHRcdFx0J2RlZmF1bHQnOiBmdW5jdGlvbihvKSB7XHJcblx0XHRcdFx0XHRmb3JtYXRFcnJvcihvKTtcclxuXHJcblx0XHRcdFx0XHQvLyBGb3JtYXQgZnJpZW5kc1xyXG5cdFx0XHRcdFx0aWYgKG8gJiYgJ3Jlc3BvbnNlJyBpbiBvICYmICdmcmllbmRzJyBpbiBvLnJlc3BvbnNlICYmICdpdGVtcycgaW4gby5yZXNwb25zZS5mcmllbmRzKSB7XHJcblx0XHRcdFx0XHRcdG8uZGF0YSA9IG8ucmVzcG9uc2UuZnJpZW5kcy5pdGVtcztcclxuXHRcdFx0XHRcdFx0by5kYXRhLmZvckVhY2goZm9ybWF0VXNlcik7XHJcblx0XHRcdFx0XHRcdGRlbGV0ZSBvLnJlc3BvbnNlO1xyXG5cdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdHJldHVybiBvO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSxcclxuXHJcblx0XHRcdHhocjogZm9ybWF0UmVxdWVzdCxcclxuXHRcdFx0anNvbnA6IGZvcm1hdFJlcXVlc3RcclxuXHRcdH1cclxuXHR9KTtcclxuXHJcblx0ZnVuY3Rpb24gZm9ybWF0RXJyb3Iobykge1xyXG5cdFx0aWYgKG8ubWV0YSAmJiAoby5tZXRhLmNvZGUgPT09IDQwMCB8fCBvLm1ldGEuY29kZSA9PT0gNDAxKSkge1xyXG5cdFx0XHRvLmVycm9yID0ge1xyXG5cdFx0XHRcdGNvZGU6ICdhY2Nlc3NfZGVuaWVkJyxcclxuXHRcdFx0XHRtZXNzYWdlOiBvLm1ldGEuZXJyb3JEZXRhaWxcclxuXHRcdFx0fTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGZ1bmN0aW9uIGZvcm1hdFVzZXIobykge1xyXG5cdFx0aWYgKG8gJiYgby5pZCkge1xyXG5cdFx0XHRvLnRodW1ibmFpbCA9IG8ucGhvdG8ucHJlZml4ICsgJzEwMHgxMDAnICsgby5waG90by5zdWZmaXg7XHJcblx0XHRcdG8ubmFtZSA9IG8uZmlyc3ROYW1lICsgJyAnICsgby5sYXN0TmFtZTtcclxuXHRcdFx0by5maXJzdF9uYW1lID0gby5maXJzdE5hbWU7XHJcblx0XHRcdG8ubGFzdF9uYW1lID0gby5sYXN0TmFtZTtcclxuXHRcdFx0aWYgKG8uY29udGFjdCkge1xyXG5cdFx0XHRcdGlmIChvLmNvbnRhY3QuZW1haWwpIHtcclxuXHRcdFx0XHRcdG8uZW1haWwgPSBvLmNvbnRhY3QuZW1haWw7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRmdW5jdGlvbiBmb3JtYXRSZXF1ZXN0KHAsIHFzKSB7XHJcblx0XHR2YXIgdG9rZW4gPSBxcy5hY2Nlc3NfdG9rZW47XHJcblx0XHRkZWxldGUgcXMuYWNjZXNzX3Rva2VuO1xyXG5cdFx0cXMub2F1dGhfdG9rZW4gPSB0b2tlbjtcclxuXHRcdHFzLnYgPSAyMDEyMTEyNTtcclxuXHRcdHJldHVybiB0cnVlO1xyXG5cdH1cclxuXHJcbn0pKGhlbGxvKTtcclxuXHJcbihmdW5jdGlvbihoZWxsbykge1xyXG5cclxuXHRoZWxsby5pbml0KHtcclxuXHJcblx0XHRnaXRodWI6IHtcclxuXHJcblx0XHRcdG5hbWU6ICdHaXRIdWInLFxyXG5cclxuXHRcdFx0b2F1dGg6IHtcclxuXHRcdFx0XHR2ZXJzaW9uOiAyLFxyXG5cdFx0XHRcdGF1dGg6ICdodHRwczovL2dpdGh1Yi5jb20vbG9naW4vb2F1dGgvYXV0aG9yaXplJyxcclxuXHRcdFx0XHRncmFudDogJ2h0dHBzOi8vZ2l0aHViLmNvbS9sb2dpbi9vYXV0aC9hY2Nlc3NfdG9rZW4nLFxyXG5cdFx0XHRcdHJlc3BvbnNlX3R5cGU6ICdjb2RlJ1xyXG5cdFx0XHR9LFxyXG5cclxuXHRcdFx0c2NvcGU6IHtcclxuXHRcdFx0XHRlbWFpbDogJ3VzZXI6ZW1haWwnXHJcblx0XHRcdH0sXHJcblxyXG5cdFx0XHRiYXNlOiAnaHR0cHM6Ly9hcGkuZ2l0aHViLmNvbS8nLFxyXG5cclxuXHRcdFx0Z2V0OiB7XHJcblx0XHRcdFx0bWU6ICd1c2VyJyxcclxuXHRcdFx0XHQnbWUvZnJpZW5kcyc6ICd1c2VyL2ZvbGxvd2luZz9wZXJfcGFnZT1Ae2xpbWl0fDEwMH0nLFxyXG5cdFx0XHRcdCdtZS9mb2xsb3dpbmcnOiAndXNlci9mb2xsb3dpbmc/cGVyX3BhZ2U9QHtsaW1pdHwxMDB9JyxcclxuXHRcdFx0XHQnbWUvZm9sbG93ZXJzJzogJ3VzZXIvZm9sbG93ZXJzP3Blcl9wYWdlPUB7bGltaXR8MTAwfScsXHJcblx0XHRcdFx0J21lL2xpa2UnOiAndXNlci9zdGFycmVkP3Blcl9wYWdlPUB7bGltaXR8MTAwfSdcclxuXHRcdFx0fSxcclxuXHJcblx0XHRcdHdyYXA6IHtcclxuXHRcdFx0XHRtZTogZnVuY3Rpb24obywgaGVhZGVycykge1xyXG5cclxuXHRcdFx0XHRcdGZvcm1hdEVycm9yKG8sIGhlYWRlcnMpO1xyXG5cdFx0XHRcdFx0Zm9ybWF0VXNlcihvKTtcclxuXHJcblx0XHRcdFx0XHRyZXR1cm4gbztcclxuXHRcdFx0XHR9LFxyXG5cclxuXHRcdFx0XHQnZGVmYXVsdCc6IGZ1bmN0aW9uKG8sIGhlYWRlcnMsIHJlcSkge1xyXG5cclxuXHRcdFx0XHRcdGZvcm1hdEVycm9yKG8sIGhlYWRlcnMpO1xyXG5cclxuXHRcdFx0XHRcdGlmIChBcnJheS5pc0FycmF5KG8pKSB7XHJcblx0XHRcdFx0XHRcdG8gPSB7ZGF0YTpvfTtcclxuXHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHRpZiAoby5kYXRhKSB7XHJcblx0XHRcdFx0XHRcdHBhZ2luZyhvLCBoZWFkZXJzLCByZXEpO1xyXG5cdFx0XHRcdFx0XHRvLmRhdGEuZm9yRWFjaChmb3JtYXRVc2VyKTtcclxuXHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHRyZXR1cm4gbztcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0sXHJcblxyXG5cdFx0XHR4aHI6IGZ1bmN0aW9uKHApIHtcclxuXHJcblx0XHRcdFx0aWYgKHAubWV0aG9kICE9PSAnZ2V0JyAmJiBwLmRhdGEpIHtcclxuXHJcblx0XHRcdFx0XHQvLyBTZXJpYWxpemUgcGF5bG9hZCBhcyBKU09OXHJcblx0XHRcdFx0XHRwLmhlYWRlcnMgPSBwLmhlYWRlcnMgfHwge307XHJcblx0XHRcdFx0XHRwLmhlYWRlcnNbJ0NvbnRlbnQtVHlwZSddID0gJ2FwcGxpY2F0aW9uL2pzb24nO1xyXG5cdFx0XHRcdFx0aWYgKHR5cGVvZiAocC5kYXRhKSA9PT0gJ29iamVjdCcpIHtcclxuXHRcdFx0XHRcdFx0cC5kYXRhID0gSlNPTi5zdHJpbmdpZnkocC5kYXRhKTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdHJldHVybiB0cnVlO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fSk7XHJcblxyXG5cdGZ1bmN0aW9uIGZvcm1hdEVycm9yKG8sIGhlYWRlcnMpIHtcclxuXHRcdHZhciBjb2RlID0gaGVhZGVycyA/IGhlYWRlcnMuc3RhdHVzQ29kZSA6IChvICYmICdtZXRhJyBpbiBvICYmICdzdGF0dXMnIGluIG8ubWV0YSAmJiBvLm1ldGEuc3RhdHVzKTtcclxuXHRcdGlmICgoY29kZSA9PT0gNDAxIHx8IGNvZGUgPT09IDQwMykpIHtcclxuXHRcdFx0by5lcnJvciA9IHtcclxuXHRcdFx0XHRjb2RlOiAnYWNjZXNzX2RlbmllZCcsXHJcblx0XHRcdFx0bWVzc2FnZTogby5tZXNzYWdlIHx8IChvLmRhdGEgPyBvLmRhdGEubWVzc2FnZSA6ICdDb3VsZCBub3QgZ2V0IHJlc3BvbnNlJylcclxuXHRcdFx0fTtcclxuXHRcdFx0ZGVsZXRlIG8ubWVzc2FnZTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGZ1bmN0aW9uIGZvcm1hdFVzZXIobykge1xyXG5cdFx0aWYgKG8uaWQpIHtcclxuXHRcdFx0by50aHVtYm5haWwgPSBvLnBpY3R1cmUgPSBvLmF2YXRhcl91cmw7XHJcblx0XHRcdG8ubmFtZSA9IG8ubG9naW47XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRmdW5jdGlvbiBwYWdpbmcocmVzLCBoZWFkZXJzLCByZXEpIHtcclxuXHRcdGlmIChyZXMuZGF0YSAmJiByZXMuZGF0YS5sZW5ndGggJiYgaGVhZGVycyAmJiBoZWFkZXJzLkxpbmspIHtcclxuXHRcdFx0dmFyIG5leHQgPSBoZWFkZXJzLkxpbmsubWF0Y2goLzwoLio/KT47XFxzKnJlbD1cXFwibmV4dFxcXCIvKTtcclxuXHRcdFx0aWYgKG5leHQpIHtcclxuXHRcdFx0XHRyZXMucGFnaW5nID0ge1xyXG5cdFx0XHRcdFx0bmV4dDogbmV4dFsxXVxyXG5cdFx0XHRcdH07XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9XHJcblxyXG59KShoZWxsbyk7XHJcblxyXG4oZnVuY3Rpb24oaGVsbG8pIHtcclxuXHJcblx0dmFyIGNvbnRhY3RzVXJsID0gJ2h0dHBzOi8vd3d3Lmdvb2dsZS5jb20vbTgvZmVlZHMvY29udGFjdHMvZGVmYXVsdC9mdWxsP3Y9My4wJmFsdD1qc29uJm1heC1yZXN1bHRzPUB7bGltaXR8MTAwMH0mc3RhcnQtaW5kZXg9QHtzdGFydHwxfSc7XHJcblxyXG5cdGhlbGxvLmluaXQoe1xyXG5cclxuXHRcdGdvb2dsZToge1xyXG5cclxuXHRcdFx0bmFtZTogJ0dvb2dsZSBQbHVzJyxcclxuXHJcblx0XHRcdC8vIFNlZTogaHR0cDovL2NvZGUuZ29vZ2xlLmNvbS9hcGlzL2FjY291bnRzL2RvY3MvT0F1dGgyVXNlckFnZW50Lmh0bWxcclxuXHRcdFx0b2F1dGg6IHtcclxuXHRcdFx0XHR2ZXJzaW9uOiAyLFxyXG5cdFx0XHRcdGF1dGg6ICdodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20vby9vYXV0aDIvYXV0aCcsXHJcblx0XHRcdFx0Z3JhbnQ6ICdodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20vby9vYXV0aDIvdG9rZW4nXHJcblx0XHRcdH0sXHJcblxyXG5cdFx0XHQvLyBBdXRob3JpemF0aW9uIHNjb3Blc1xyXG5cdFx0XHRzY29wZToge1xyXG5cdFx0XHRcdGJhc2ljOiAnaHR0cHM6Ly93d3cuZ29vZ2xlYXBpcy5jb20vYXV0aC9wbHVzLm1lIHByb2ZpbGUnLFxyXG5cdFx0XHRcdGVtYWlsOiAnZW1haWwnLFxyXG5cdFx0XHRcdGJpcnRoZGF5OiAnJyxcclxuXHRcdFx0XHRldmVudHM6ICcnLFxyXG5cdFx0XHRcdHBob3RvczogJ2h0dHBzOi8vcGljYXNhd2ViLmdvb2dsZS5jb20vZGF0YS8nLFxyXG5cdFx0XHRcdHZpZGVvczogJ2h0dHA6Ly9nZGF0YS55b3V0dWJlLmNvbScsXHJcblx0XHRcdFx0ZnJpZW5kczogJ2h0dHBzOi8vd3d3Lmdvb2dsZS5jb20vbTgvZmVlZHMsIGh0dHBzOi8vd3d3Lmdvb2dsZWFwaXMuY29tL2F1dGgvcGx1cy5sb2dpbicsXHJcblx0XHRcdFx0ZmlsZXM6ICdodHRwczovL3d3dy5nb29nbGVhcGlzLmNvbS9hdXRoL2RyaXZlLnJlYWRvbmx5JyxcclxuXHRcdFx0XHRwdWJsaXNoOiAnJyxcclxuXHRcdFx0XHRwdWJsaXNoX2ZpbGVzOiAnaHR0cHM6Ly93d3cuZ29vZ2xlYXBpcy5jb20vYXV0aC9kcml2ZScsXHJcblx0XHRcdFx0c2hhcmU6ICcnLFxyXG5cdFx0XHRcdGNyZWF0ZV9ldmVudDogJycsXHJcblx0XHRcdFx0b2ZmbGluZV9hY2Nlc3M6ICcnXHJcblx0XHRcdH0sXHJcblxyXG5cdFx0XHRzY29wZV9kZWxpbTogJyAnLFxyXG5cclxuXHRcdFx0bG9naW46IGZ1bmN0aW9uKHApIHtcclxuXHJcblx0XHRcdFx0aWYgKHAucXMucmVzcG9uc2VfdHlwZSA9PT0gJ2NvZGUnKSB7XHJcblxyXG5cdFx0XHRcdFx0Ly8gTGV0J3Mgc2V0IHRoaXMgdG8gYW4gb2ZmbGluZSBhY2Nlc3MgdG8gcmV0dXJuIGEgcmVmcmVzaF90b2tlblxyXG5cdFx0XHRcdFx0cC5xcy5hY2Nlc3NfdHlwZSA9ICdvZmZsaW5lJztcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdC8vIFJlYXV0aGVudGljYXRlXHJcblx0XHRcdFx0Ly8gaHR0cHM6Ly9kZXZlbG9wZXJzLmdvb2dsZS5jb20vaWRlbnRpdHkvcHJvdG9jb2xzL1xyXG5cdFx0XHRcdGlmIChwLm9wdGlvbnMuZm9yY2UpIHtcclxuXHRcdFx0XHRcdHAucXMuYXBwcm92YWxfcHJvbXB0ID0gJ2ZvcmNlJztcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0sXHJcblxyXG5cdFx0XHQvLyBBUEkgYmFzZSBVUklcclxuXHRcdFx0YmFzZTogJ2h0dHBzOi8vd3d3Lmdvb2dsZWFwaXMuY29tLycsXHJcblxyXG5cdFx0XHQvLyBNYXAgR0VUIHJlcXVlc3RzXHJcblx0XHRcdGdldDoge1xyXG5cdFx0XHRcdG1lOiAncGx1cy92MS9wZW9wbGUvbWUnLFxyXG5cclxuXHRcdFx0XHQvLyBEZXByZWNhdGVkIFNlcHQgMSwgMjAxNFxyXG5cdFx0XHRcdC8vJ21lJzogJ29hdXRoMi92MS91c2VyaW5mbz9hbHQ9anNvbicsXHJcblxyXG5cdFx0XHRcdC8vIFNlZTogaHR0cHM6Ly9kZXZlbG9wZXJzLmdvb2dsZS5jb20vKy9hcGkvbGF0ZXN0L3Blb3BsZS9saXN0XHJcblx0XHRcdFx0J21lL2ZyaWVuZHMnOiAncGx1cy92MS9wZW9wbGUvbWUvcGVvcGxlL3Zpc2libGU/bWF4UmVzdWx0cz1Ae2xpbWl0fDEwMH0nLFxyXG5cdFx0XHRcdCdtZS9mb2xsb3dpbmcnOiBjb250YWN0c1VybCxcclxuXHRcdFx0XHQnbWUvZm9sbG93ZXJzJzogY29udGFjdHNVcmwsXHJcblx0XHRcdFx0J21lL2NvbnRhY3RzJzogY29udGFjdHNVcmwsXHJcblx0XHRcdFx0J21lL3NoYXJlJzogJ3BsdXMvdjEvcGVvcGxlL21lL2FjdGl2aXRpZXMvcHVibGljP21heFJlc3VsdHM9QHtsaW1pdHwxMDB9JyxcclxuXHRcdFx0XHQnbWUvZmVlZCc6ICdwbHVzL3YxL3Blb3BsZS9tZS9hY3Rpdml0aWVzL3B1YmxpYz9tYXhSZXN1bHRzPUB7bGltaXR8MTAwfScsXHJcblx0XHRcdFx0J21lL2FsYnVtcyc6ICdodHRwczovL3BpY2FzYXdlYi5nb29nbGUuY29tL2RhdGEvZmVlZC9hcGkvdXNlci9kZWZhdWx0P2FsdD1qc29uJm1heC1yZXN1bHRzPUB7bGltaXR8MTAwfSZzdGFydC1pbmRleD1Ae3N0YXJ0fDF9JyxcclxuXHRcdFx0XHQnbWUvYWxidW0nOiBmdW5jdGlvbihwLCBjYWxsYmFjaykge1xyXG5cdFx0XHRcdFx0dmFyIGtleSA9IHAucXVlcnkuaWQ7XHJcblx0XHRcdFx0XHRkZWxldGUgcC5xdWVyeS5pZDtcclxuXHRcdFx0XHRcdGNhbGxiYWNrKGtleS5yZXBsYWNlKCcvZW50cnkvJywgJy9mZWVkLycpKTtcclxuXHRcdFx0XHR9LFxyXG5cclxuXHRcdFx0XHQnbWUvcGhvdG9zJzogJ2h0dHBzOi8vcGljYXNhd2ViLmdvb2dsZS5jb20vZGF0YS9mZWVkL2FwaS91c2VyL2RlZmF1bHQ/YWx0PWpzb24ma2luZD1waG90byZtYXgtcmVzdWx0cz1Ae2xpbWl0fDEwMH0mc3RhcnQtaW5kZXg9QHtzdGFydHwxfScsXHJcblxyXG5cdFx0XHRcdC8vIFNlZTogaHR0cHM6Ly9kZXZlbG9wZXJzLmdvb2dsZS5jb20vZHJpdmUvdjIvcmVmZXJlbmNlL2ZpbGVzL2xpc3RcclxuXHRcdFx0XHQnbWUvZmlsZSc6ICdkcml2ZS92Mi9maWxlcy9Ae2lkfScsXHJcblx0XHRcdFx0J21lL2ZpbGVzJzogJ2RyaXZlL3YyL2ZpbGVzP3E9JTIyQHtwYXJlbnR8cm9vdH0lMjIraW4rcGFyZW50cythbmQrdHJhc2hlZD1mYWxzZSZtYXhSZXN1bHRzPUB7bGltaXR8MTAwfScsXHJcblxyXG5cdFx0XHRcdC8vIFNlZTogaHR0cHM6Ly9kZXZlbG9wZXJzLmdvb2dsZS5jb20vZHJpdmUvdjIvcmVmZXJlbmNlL2ZpbGVzL2xpc3RcclxuXHRcdFx0XHQnbWUvZm9sZGVycyc6ICdkcml2ZS92Mi9maWxlcz9xPSUyMkB7aWR8cm9vdH0lMjIraW4rcGFyZW50cythbmQrbWltZVR5cGUrPSslMjJhcHBsaWNhdGlvbi92bmQuZ29vZ2xlLWFwcHMuZm9sZGVyJTIyK2FuZCt0cmFzaGVkPWZhbHNlJm1heFJlc3VsdHM9QHtsaW1pdHwxMDB9JyxcclxuXHJcblx0XHRcdFx0Ly8gU2VlOiBodHRwczovL2RldmVsb3BlcnMuZ29vZ2xlLmNvbS9kcml2ZS92Mi9yZWZlcmVuY2UvZmlsZXMvbGlzdFxyXG5cdFx0XHRcdCdtZS9mb2xkZXInOiAnZHJpdmUvdjIvZmlsZXM/cT0lMjJAe2lkfHJvb3R9JTIyK2luK3BhcmVudHMrYW5kK3RyYXNoZWQ9ZmFsc2UmbWF4UmVzdWx0cz1Ae2xpbWl0fDEwMH0nXHJcblx0XHRcdH0sXHJcblxyXG5cdFx0XHQvLyBNYXAgUE9TVCByZXF1ZXN0c1xyXG5cdFx0XHRwb3N0OiB7XHJcblxyXG5cdFx0XHRcdC8vIEdvb2dsZSBEcml2ZVxyXG5cdFx0XHRcdCdtZS9maWxlcyc6IHVwbG9hZERyaXZlLFxyXG5cdFx0XHRcdCdtZS9mb2xkZXJzJzogZnVuY3Rpb24ocCwgY2FsbGJhY2spIHtcclxuXHRcdFx0XHRcdHAuZGF0YSA9IHtcclxuXHRcdFx0XHRcdFx0dGl0bGU6IHAuZGF0YS5uYW1lLFxyXG5cdFx0XHRcdFx0XHRwYXJlbnRzOiBbe2lkOiBwLmRhdGEucGFyZW50IHx8ICdyb290J31dLFxyXG5cdFx0XHRcdFx0XHRtaW1lVHlwZTogJ2FwcGxpY2F0aW9uL3ZuZC5nb29nbGUtYXBwcy5mb2xkZXInXHJcblx0XHRcdFx0XHR9O1xyXG5cdFx0XHRcdFx0Y2FsbGJhY2soJ2RyaXZlL3YyL2ZpbGVzJyk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9LFxyXG5cclxuXHRcdFx0Ly8gTWFwIFBVVCByZXF1ZXN0c1xyXG5cdFx0XHRwdXQ6IHtcclxuXHRcdFx0XHQnbWUvZmlsZXMnOiB1cGxvYWREcml2ZVxyXG5cdFx0XHR9LFxyXG5cclxuXHRcdFx0Ly8gTWFwIERFTEVURSByZXF1ZXN0c1xyXG5cdFx0XHRkZWw6IHtcclxuXHRcdFx0XHQnbWUvZmlsZXMnOiAnZHJpdmUvdjIvZmlsZXMvQHtpZH0nLFxyXG5cdFx0XHRcdCdtZS9mb2xkZXInOiAnZHJpdmUvdjIvZmlsZXMvQHtpZH0nXHJcblx0XHRcdH0sXHJcblxyXG5cdFx0XHQvLyBNYXAgUEFUQ0ggcmVxdWVzdHNcclxuXHRcdFx0cGF0Y2g6IHtcclxuXHRcdFx0XHQnbWUvZmlsZSc6ICdkcml2ZS92Mi9maWxlcy9Ae2lkfSdcclxuXHRcdFx0fSxcclxuXHJcblx0XHRcdHdyYXA6IHtcclxuXHRcdFx0XHRtZTogZnVuY3Rpb24obykge1xyXG5cdFx0XHRcdFx0aWYgKG8uaWQpIHtcclxuXHRcdFx0XHRcdFx0by5sYXN0X25hbWUgPSBvLmZhbWlseV9uYW1lIHx8IChvLm5hbWUgPyBvLm5hbWUuZmFtaWx5TmFtZSA6IG51bGwpO1xyXG5cdFx0XHRcdFx0XHRvLmZpcnN0X25hbWUgPSBvLmdpdmVuX25hbWUgfHwgKG8ubmFtZSA/IG8ubmFtZS5naXZlbk5hbWUgOiBudWxsKTtcclxuXHJcblx0XHRcdFx0XHRcdGlmIChvLmVtYWlscyAmJiBvLmVtYWlscy5sZW5ndGgpIHtcclxuXHRcdFx0XHRcdFx0XHRvLmVtYWlsID0gby5lbWFpbHNbMF0udmFsdWU7XHJcblx0XHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHRcdGZvcm1hdFBlcnNvbihvKTtcclxuXHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHRyZXR1cm4gbztcclxuXHRcdFx0XHR9LFxyXG5cclxuXHRcdFx0XHQnbWUvZnJpZW5kcyc6IGZ1bmN0aW9uKG8pIHtcclxuXHRcdFx0XHRcdGlmIChvLml0ZW1zKSB7XHJcblx0XHRcdFx0XHRcdHBhZ2luZyhvKTtcclxuXHRcdFx0XHRcdFx0by5kYXRhID0gby5pdGVtcztcclxuXHRcdFx0XHRcdFx0by5kYXRhLmZvckVhY2goZm9ybWF0UGVyc29uKTtcclxuXHRcdFx0XHRcdFx0ZGVsZXRlIG8uaXRlbXM7XHJcblx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0cmV0dXJuIG87XHJcblx0XHRcdFx0fSxcclxuXHJcblx0XHRcdFx0J21lL2NvbnRhY3RzJzogZm9ybWF0RnJpZW5kcyxcclxuXHRcdFx0XHQnbWUvZm9sbG93ZXJzJzogZm9ybWF0RnJpZW5kcyxcclxuXHRcdFx0XHQnbWUvZm9sbG93aW5nJzogZm9ybWF0RnJpZW5kcyxcclxuXHRcdFx0XHQnbWUvc2hhcmUnOiBmb3JtYXRGZWVkLFxyXG5cdFx0XHRcdCdtZS9mZWVkJzogZm9ybWF0RmVlZCxcclxuXHRcdFx0XHQnbWUvYWxidW1zJzogZ0VudHJ5LFxyXG5cdFx0XHRcdCdtZS9waG90b3MnOiBmb3JtYXRQaG90b3MsXHJcblx0XHRcdFx0J2RlZmF1bHQnOiBnRW50cnlcclxuXHRcdFx0fSxcclxuXHJcblx0XHRcdHhocjogZnVuY3Rpb24ocCkge1xyXG5cclxuXHRcdFx0XHRpZiAocC5tZXRob2QgPT09ICdwb3N0JyB8fCBwLm1ldGhvZCA9PT0gJ3B1dCcpIHtcclxuXHRcdFx0XHRcdHRvSlNPTihwKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0ZWxzZSBpZiAocC5tZXRob2QgPT09ICdwYXRjaCcpIHtcclxuXHRcdFx0XHRcdGhlbGxvLnV0aWxzLmV4dGVuZChwLnF1ZXJ5LCBwLmRhdGEpO1xyXG5cdFx0XHRcdFx0cC5kYXRhID0gbnVsbDtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdHJldHVybiB0cnVlO1xyXG5cdFx0XHR9LFxyXG5cclxuXHRcdFx0Ly8gRG9uJ3QgZXZlbiB0cnkgc3VibWl0dGluZyB2aWEgZm9ybS5cclxuXHRcdFx0Ly8gVGhpcyBtZWFucyBubyBQT1NUIG9wZXJhdGlvbnMgaW4gPD1JRTlcclxuXHRcdFx0Zm9ybTogZmFsc2VcclxuXHRcdH1cclxuXHR9KTtcclxuXHJcblx0ZnVuY3Rpb24gdG9JbnQocykge1xyXG5cdFx0cmV0dXJuIHBhcnNlSW50KHMsIDEwKTtcclxuXHR9XHJcblxyXG5cdGZ1bmN0aW9uIGZvcm1hdEZlZWQobykge1xyXG5cdFx0cGFnaW5nKG8pO1xyXG5cdFx0by5kYXRhID0gby5pdGVtcztcclxuXHRcdGRlbGV0ZSBvLml0ZW1zO1xyXG5cdFx0cmV0dXJuIG87XHJcblx0fVxyXG5cclxuXHQvLyBGb3JtYXQ6IGVuc3VyZSBlYWNoIHJlY29yZCBjb250YWlucyBhIG5hbWUsIGlkIGV0Yy5cclxuXHRmdW5jdGlvbiBmb3JtYXRJdGVtKG8pIHtcclxuXHRcdGlmIChvLmVycm9yKSB7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAoIW8ubmFtZSkge1xyXG5cdFx0XHRvLm5hbWUgPSBvLnRpdGxlIHx8IG8ubWVzc2FnZTtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAoIW8ucGljdHVyZSkge1xyXG5cdFx0XHRvLnBpY3R1cmUgPSBvLnRodW1ibmFpbExpbms7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKCFvLnRodW1ibmFpbCkge1xyXG5cdFx0XHRvLnRodW1ibmFpbCA9IG8udGh1bWJuYWlsTGluaztcclxuXHRcdH1cclxuXHJcblx0XHRpZiAoby5taW1lVHlwZSA9PT0gJ2FwcGxpY2F0aW9uL3ZuZC5nb29nbGUtYXBwcy5mb2xkZXInKSB7XHJcblx0XHRcdG8udHlwZSA9ICdmb2xkZXInO1xyXG5cdFx0XHRvLmZpbGVzID0gJ2h0dHBzOi8vd3d3Lmdvb2dsZWFwaXMuY29tL2RyaXZlL3YyL2ZpbGVzP3E9JTIyJyArIG8uaWQgKyAnJTIyK2luK3BhcmVudHMnO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBvO1xyXG5cdH1cclxuXHJcblx0ZnVuY3Rpb24gZm9ybWF0SW1hZ2UoaW1hZ2UpIHtcclxuXHRcdHJldHVybiB7XHJcblx0XHRcdHNvdXJjZTogaW1hZ2UudXJsLFxyXG5cdFx0XHR3aWR0aDogaW1hZ2Uud2lkdGgsXHJcblx0XHRcdGhlaWdodDogaW1hZ2UuaGVpZ2h0XHJcblx0XHR9O1xyXG5cdH1cclxuXHJcblx0ZnVuY3Rpb24gZm9ybWF0UGhvdG9zKG8pIHtcclxuXHRcdG8uZGF0YSA9IG8uZmVlZC5lbnRyeS5tYXAoZm9ybWF0RW50cnkpO1xyXG5cdFx0ZGVsZXRlIG8uZmVlZDtcclxuXHR9XHJcblxyXG5cdC8vIEdvb2dsZSBoYXMgYSBob3JyaWJsZSBKU09OIEFQSVxyXG5cdGZ1bmN0aW9uIGdFbnRyeShvKSB7XHJcblx0XHRwYWdpbmcobyk7XHJcblxyXG5cdFx0aWYgKCdmZWVkJyBpbiBvICYmICdlbnRyeScgaW4gby5mZWVkKSB7XHJcblx0XHRcdG8uZGF0YSA9IG8uZmVlZC5lbnRyeS5tYXAoZm9ybWF0RW50cnkpO1xyXG5cdFx0XHRkZWxldGUgby5mZWVkO1xyXG5cdFx0fVxyXG5cclxuXHRcdC8vIE9sZCBzdHlsZTogUGljYXNhLCBldGMuXHJcblx0XHRlbHNlIGlmICgnZW50cnknIGluIG8pIHtcclxuXHRcdFx0cmV0dXJuIGZvcm1hdEVudHJ5KG8uZW50cnkpO1xyXG5cdFx0fVxyXG5cclxuXHRcdC8vIE5ldyBzdHlsZTogR29vZ2xlIERyaXZlICYgUGx1c1xyXG5cdFx0ZWxzZSBpZiAoJ2l0ZW1zJyBpbiBvKSB7XHJcblx0XHRcdG8uZGF0YSA9IG8uaXRlbXMubWFwKGZvcm1hdEl0ZW0pO1xyXG5cdFx0XHRkZWxldGUgby5pdGVtcztcclxuXHRcdH1cclxuXHRcdGVsc2Uge1xyXG5cdFx0XHRmb3JtYXRJdGVtKG8pO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBvO1xyXG5cdH1cclxuXHJcblx0ZnVuY3Rpb24gZm9ybWF0UGVyc29uKG8pIHtcclxuXHRcdG8ubmFtZSA9IG8uZGlzcGxheU5hbWUgfHwgby5uYW1lO1xyXG5cdFx0by5waWN0dXJlID0gby5waWN0dXJlIHx8IChvLmltYWdlID8gby5pbWFnZS51cmwgOiBudWxsKTtcclxuXHRcdG8udGh1bWJuYWlsID0gby5waWN0dXJlO1xyXG5cdH1cclxuXHJcblx0ZnVuY3Rpb24gZm9ybWF0RnJpZW5kcyhvLCBoZWFkZXJzLCByZXEpIHtcclxuXHRcdHBhZ2luZyhvKTtcclxuXHRcdHZhciByID0gW107XHJcblx0XHRpZiAoJ2ZlZWQnIGluIG8gJiYgJ2VudHJ5JyBpbiBvLmZlZWQpIHtcclxuXHRcdFx0dmFyIHRva2VuID0gcmVxLnF1ZXJ5LmFjY2Vzc190b2tlbjtcclxuXHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBvLmZlZWQuZW50cnkubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0XHR2YXIgYSA9IG8uZmVlZC5lbnRyeVtpXTtcclxuXHJcblx0XHRcdFx0YS5pZFx0PSBhLmlkLiR0O1xyXG5cdFx0XHRcdGEubmFtZVx0PSBhLnRpdGxlLiR0O1xyXG5cdFx0XHRcdGRlbGV0ZSBhLnRpdGxlO1xyXG5cdFx0XHRcdGlmIChhLmdkJGVtYWlsKSB7XHJcblx0XHRcdFx0XHRhLmVtYWlsXHQ9IChhLmdkJGVtYWlsICYmIGEuZ2QkZW1haWwubGVuZ3RoID4gMCkgPyBhLmdkJGVtYWlsWzBdLmFkZHJlc3MgOiBudWxsO1xyXG5cdFx0XHRcdFx0YS5lbWFpbHMgPSBhLmdkJGVtYWlsO1xyXG5cdFx0XHRcdFx0ZGVsZXRlIGEuZ2QkZW1haWw7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRpZiAoYS51cGRhdGVkKSB7XHJcblx0XHRcdFx0XHRhLnVwZGF0ZWQgPSBhLnVwZGF0ZWQuJHQ7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRpZiAoYS5saW5rKSB7XHJcblxyXG5cdFx0XHRcdFx0dmFyIHBpYyA9IChhLmxpbmsubGVuZ3RoID4gMCkgPyBhLmxpbmtbMF0uaHJlZiA6IG51bGw7XHJcblx0XHRcdFx0XHRpZiAocGljICYmIGEubGlua1swXS5nZCRldGFnKSB7XHJcblx0XHRcdFx0XHRcdHBpYyArPSAocGljLmluZGV4T2YoJz8nKSA+IC0xID8gJyYnIDogJz8nKSArICdhY2Nlc3NfdG9rZW49JyArIHRva2VuO1xyXG5cdFx0XHRcdFx0XHRhLnBpY3R1cmUgPSBwaWM7XHJcblx0XHRcdFx0XHRcdGEudGh1bWJuYWlsID0gcGljO1xyXG5cdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdGRlbGV0ZSBhLmxpbms7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRpZiAoYS5jYXRlZ29yeSkge1xyXG5cdFx0XHRcdFx0ZGVsZXRlIGEuY2F0ZWdvcnk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRvLmRhdGEgPSBvLmZlZWQuZW50cnk7XHJcblx0XHRcdGRlbGV0ZSBvLmZlZWQ7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIG87XHJcblx0fVxyXG5cclxuXHRmdW5jdGlvbiBmb3JtYXRFbnRyeShhKSB7XHJcblxyXG5cdFx0dmFyIGdyb3VwID0gYS5tZWRpYSRncm91cDtcclxuXHRcdHZhciBwaG90byA9IGdyb3VwLm1lZGlhJGNvbnRlbnQubGVuZ3RoID8gZ3JvdXAubWVkaWEkY29udGVudFswXSA6IHt9O1xyXG5cdFx0dmFyIG1lZGlhQ29udGVudCA9IGdyb3VwLm1lZGlhJGNvbnRlbnQgfHwgW107XHJcblx0XHR2YXIgbWVkaWFUaHVtYm5haWwgPSBncm91cC5tZWRpYSR0aHVtYm5haWwgfHwgW107XHJcblxyXG5cdFx0dmFyIHBpY3R1cmVzID0gbWVkaWFDb250ZW50XHJcblx0XHRcdC5jb25jYXQobWVkaWFUaHVtYm5haWwpXHJcblx0XHRcdC5tYXAoZm9ybWF0SW1hZ2UpXHJcblx0XHRcdC5zb3J0KGZ1bmN0aW9uKGEsIGIpIHtcclxuXHRcdFx0XHRyZXR1cm4gYS53aWR0aCAtIGIud2lkdGg7XHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdHZhciBpID0gMDtcclxuXHRcdHZhciBfYTtcclxuXHRcdHZhciBwID0ge1xyXG5cdFx0XHRpZDogYS5pZC4kdCxcclxuXHRcdFx0bmFtZTogYS50aXRsZS4kdCxcclxuXHRcdFx0ZGVzY3JpcHRpb246IGEuc3VtbWFyeS4kdCxcclxuXHRcdFx0dXBkYXRlZF90aW1lOiBhLnVwZGF0ZWQuJHQsXHJcblx0XHRcdGNyZWF0ZWRfdGltZTogYS5wdWJsaXNoZWQuJHQsXHJcblx0XHRcdHBpY3R1cmU6IHBob3RvID8gcGhvdG8udXJsIDogbnVsbCxcclxuXHRcdFx0cGljdHVyZXM6IHBpY3R1cmVzLFxyXG5cdFx0XHRpbWFnZXM6IFtdLFxyXG5cdFx0XHR0aHVtYm5haWw6IHBob3RvID8gcGhvdG8udXJsIDogbnVsbCxcclxuXHRcdFx0d2lkdGg6IHBob3RvLndpZHRoLFxyXG5cdFx0XHRoZWlnaHQ6IHBob3RvLmhlaWdodFxyXG5cdFx0fTtcclxuXHJcblx0XHQvLyBHZXQgZmVlZC9jaGlsZHJlblxyXG5cdFx0aWYgKCdsaW5rJyBpbiBhKSB7XHJcblx0XHRcdGZvciAoaSA9IDA7IGkgPCBhLmxpbmsubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0XHR2YXIgZCA9IGEubGlua1tpXTtcclxuXHRcdFx0XHRpZiAoZC5yZWwubWF0Y2goL1xcI2ZlZWQkLykpIHtcclxuXHRcdFx0XHRcdHAudXBsb2FkX2xvY2F0aW9uID0gcC5maWxlcyA9IHAucGhvdG9zID0gZC5ocmVmO1xyXG5cdFx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gR2V0IGltYWdlcyBvZiBkaWZmZXJlbnQgc2NhbGVzXHJcblx0XHRpZiAoJ2NhdGVnb3J5JyBpbiBhICYmIGEuY2F0ZWdvcnkubGVuZ3RoKSB7XHJcblx0XHRcdF9hID0gYS5jYXRlZ29yeTtcclxuXHRcdFx0Zm9yIChpID0gMDsgaSA8IF9hLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdFx0aWYgKF9hW2ldLnNjaGVtZSAmJiBfYVtpXS5zY2hlbWUubWF0Y2goL1xcI2tpbmQkLykpIHtcclxuXHRcdFx0XHRcdHAudHlwZSA9IF9hW2ldLnRlcm0ucmVwbGFjZSgvXi4qP1xcIy8sICcnKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHQvLyBHZXQgaW1hZ2VzIG9mIGRpZmZlcmVudCBzY2FsZXNcclxuXHRcdGlmICgnbWVkaWEkdGh1bWJuYWlsJyBpbiBncm91cCAmJiBncm91cC5tZWRpYSR0aHVtYm5haWwubGVuZ3RoKSB7XHJcblx0XHRcdF9hID0gZ3JvdXAubWVkaWEkdGh1bWJuYWlsO1xyXG5cdFx0XHRwLnRodW1ibmFpbCA9IF9hWzBdLnVybDtcclxuXHRcdFx0cC5pbWFnZXMgPSBfYS5tYXAoZm9ybWF0SW1hZ2UpO1xyXG5cdFx0fVxyXG5cclxuXHRcdF9hID0gZ3JvdXAubWVkaWEkY29udGVudDtcclxuXHJcblx0XHRpZiAoX2EgJiYgX2EubGVuZ3RoKSB7XHJcblx0XHRcdHAuaW1hZ2VzLnB1c2goZm9ybWF0SW1hZ2UoX2FbMF0pKTtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gcDtcclxuXHR9XHJcblxyXG5cdGZ1bmN0aW9uIHBhZ2luZyhyZXMpIHtcclxuXHJcblx0XHQvLyBDb250YWN0cyBWMlxyXG5cdFx0aWYgKCdmZWVkJyBpbiByZXMgJiYgcmVzLmZlZWQub3BlblNlYXJjaCRpdGVtc1BlclBhZ2UpIHtcclxuXHRcdFx0dmFyIGxpbWl0ID0gdG9JbnQocmVzLmZlZWQub3BlblNlYXJjaCRpdGVtc1BlclBhZ2UuJHQpO1xyXG5cdFx0XHR2YXIgc3RhcnQgPSB0b0ludChyZXMuZmVlZC5vcGVuU2VhcmNoJHN0YXJ0SW5kZXguJHQpO1xyXG5cdFx0XHR2YXIgdG90YWwgPSB0b0ludChyZXMuZmVlZC5vcGVuU2VhcmNoJHRvdGFsUmVzdWx0cy4kdCk7XHJcblxyXG5cdFx0XHRpZiAoKHN0YXJ0ICsgbGltaXQpIDwgdG90YWwpIHtcclxuXHRcdFx0XHRyZXMucGFnaW5nID0ge1xyXG5cdFx0XHRcdFx0bmV4dDogJz9zdGFydD0nICsgKHN0YXJ0ICsgbGltaXQpXHJcblx0XHRcdFx0fTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdFx0ZWxzZSBpZiAoJ25leHRQYWdlVG9rZW4nIGluIHJlcykge1xyXG5cdFx0XHRyZXMucGFnaW5nID0ge1xyXG5cdFx0XHRcdG5leHQ6ICc/cGFnZVRva2VuPScgKyByZXMubmV4dFBhZ2VUb2tlblxyXG5cdFx0XHR9O1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0Ly8gQ29uc3RydWN0IGEgbXVsdGlwYXJ0IG1lc3NhZ2VcclxuXHRmdW5jdGlvbiBNdWx0aXBhcnQoKSB7XHJcblxyXG5cdFx0Ly8gSW50ZXJuYWwgYm9keVxyXG5cdFx0dmFyIGJvZHkgPSBbXTtcclxuXHRcdHZhciBib3VuZGFyeSA9IChNYXRoLnJhbmRvbSgpICogMWUxMCkudG9TdHJpbmcoMzIpO1xyXG5cdFx0dmFyIGNvdW50ZXIgPSAwO1xyXG5cdFx0dmFyIGxpbmVCcmVhayA9ICdcXHJcXG4nO1xyXG5cdFx0dmFyIGRlbGltID0gbGluZUJyZWFrICsgJy0tJyArIGJvdW5kYXJ5O1xyXG5cdFx0dmFyIHJlYWR5ID0gZnVuY3Rpb24oKSB7fTtcclxuXHJcblx0XHR2YXIgZGF0YVVyaSA9IC9eZGF0YVxcOihbXjssXSsoXFw7Y2hhcnNldD1bXjssXSspPykoXFw7YmFzZTY0KT8sL2k7XHJcblxyXG5cdFx0Ly8gQWRkIGZpbGVcclxuXHRcdGZ1bmN0aW9uIGFkZEZpbGUoaXRlbSkge1xyXG5cdFx0XHR2YXIgZnIgPSBuZXcgRmlsZVJlYWRlcigpO1xyXG5cdFx0XHRmci5vbmxvYWQgPSBmdW5jdGlvbihlKSB7XHJcblx0XHRcdFx0YWRkQ29udGVudChidG9hKGUudGFyZ2V0LnJlc3VsdCksIGl0ZW0udHlwZSArIGxpbmVCcmVhayArICdDb250ZW50LVRyYW5zZmVyLUVuY29kaW5nOiBiYXNlNjQnKTtcclxuXHRcdFx0fTtcclxuXHJcblx0XHRcdGZyLnJlYWRBc0JpbmFyeVN0cmluZyhpdGVtKTtcclxuXHRcdH1cclxuXHJcblx0XHQvLyBBZGQgY29udGVudFxyXG5cdFx0ZnVuY3Rpb24gYWRkQ29udGVudChjb250ZW50LCB0eXBlKSB7XHJcblx0XHRcdGJvZHkucHVzaChsaW5lQnJlYWsgKyAnQ29udGVudC1UeXBlOiAnICsgdHlwZSArIGxpbmVCcmVhayArIGxpbmVCcmVhayArIGNvbnRlbnQpO1xyXG5cdFx0XHRjb3VudGVyLS07XHJcblx0XHRcdHJlYWR5KCk7XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gQWRkIG5ldyB0aGluZ3MgdG8gdGhlIG9iamVjdFxyXG5cdFx0dGhpcy5hcHBlbmQgPSBmdW5jdGlvbihjb250ZW50LCB0eXBlKSB7XHJcblxyXG5cdFx0XHQvLyBEb2VzIHRoZSBjb250ZW50IGhhdmUgYW4gYXJyYXlcclxuXHRcdFx0aWYgKHR5cGVvZiAoY29udGVudCkgPT09ICdzdHJpbmcnIHx8ICEoJ2xlbmd0aCcgaW4gT2JqZWN0KGNvbnRlbnQpKSkge1xyXG5cdFx0XHRcdC8vIENvbnZlcnRpIHRvIG11bHRpcGxlc1xyXG5cdFx0XHRcdGNvbnRlbnQgPSBbY29udGVudF07XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgY29udGVudC5sZW5ndGg7IGkrKykge1xyXG5cclxuXHRcdFx0XHRjb3VudGVyKys7XHJcblxyXG5cdFx0XHRcdHZhciBpdGVtID0gY29udGVudFtpXTtcclxuXHJcblx0XHRcdFx0Ly8gSXMgdGhpcyBhIGZpbGU/XHJcblx0XHRcdFx0Ly8gRmlsZXMgY2FuIGJlIGVpdGhlciBCbG9icyBvciBGaWxlIHR5cGVzXHJcblx0XHRcdFx0aWYgKFxyXG5cdFx0XHRcdFx0KHR5cGVvZiAoRmlsZSkgIT09ICd1bmRlZmluZWQnICYmIGl0ZW0gaW5zdGFuY2VvZiBGaWxlKSB8fFxyXG5cdFx0XHRcdFx0KHR5cGVvZiAoQmxvYikgIT09ICd1bmRlZmluZWQnICYmIGl0ZW0gaW5zdGFuY2VvZiBCbG9iKVxyXG5cdFx0XHRcdCkge1xyXG5cdFx0XHRcdFx0Ly8gUmVhZCB0aGUgZmlsZSBpblxyXG5cdFx0XHRcdFx0YWRkRmlsZShpdGVtKTtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdC8vIERhdGEtVVJJP1xyXG5cdFx0XHRcdC8vIERhdGE6WzxtaW1lIHR5cGU+XVs7Y2hhcnNldD08Y2hhcnNldD5dWztiYXNlNjRdLDxlbmNvZGVkIGRhdGE+XHJcblx0XHRcdFx0Ly8gL15kYXRhXFw6KFteOyxdKyhcXDtjaGFyc2V0PVteOyxdKyk/KShcXDtiYXNlNjQpPywvaVxyXG5cdFx0XHRcdGVsc2UgaWYgKHR5cGVvZiAoaXRlbSkgPT09ICdzdHJpbmcnICYmIGl0ZW0ubWF0Y2goZGF0YVVyaSkpIHtcclxuXHRcdFx0XHRcdHZhciBtID0gaXRlbS5tYXRjaChkYXRhVXJpKTtcclxuXHRcdFx0XHRcdGFkZENvbnRlbnQoaXRlbS5yZXBsYWNlKGRhdGFVcmksICcnKSwgbVsxXSArIGxpbmVCcmVhayArICdDb250ZW50LVRyYW5zZmVyLUVuY29kaW5nOiBiYXNlNjQnKTtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdC8vIFJlZ3VsYXIgc3RyaW5nXHJcblx0XHRcdFx0ZWxzZSB7XHJcblx0XHRcdFx0XHRhZGRDb250ZW50KGl0ZW0sIHR5cGUpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fTtcclxuXHJcblx0XHR0aGlzLm9ucmVhZHkgPSBmdW5jdGlvbihmbikge1xyXG5cdFx0XHRyZWFkeSA9IGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdGlmIChjb3VudGVyID09PSAwKSB7XHJcblx0XHRcdFx0XHQvLyBUcmlnZ2VyIHJlYWR5XHJcblx0XHRcdFx0XHRib2R5LnVuc2hpZnQoJycpO1xyXG5cdFx0XHRcdFx0Ym9keS5wdXNoKCctLScpO1xyXG5cdFx0XHRcdFx0Zm4oYm9keS5qb2luKGRlbGltKSwgYm91bmRhcnkpO1xyXG5cdFx0XHRcdFx0Ym9keSA9IFtdO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fTtcclxuXHJcblx0XHRcdHJlYWR5KCk7XHJcblx0XHR9O1xyXG5cdH1cclxuXHJcblx0Ly8gVXBsb2FkIHRvIERyaXZlXHJcblx0Ly8gSWYgdGhpcyBpcyBQVVQgdGhlbiBvbmx5IGF1Z21lbnQgdGhlIGZpbGUgdXBsb2FkZWRcclxuXHQvLyBQVVQgaHR0cHM6Ly9kZXZlbG9wZXJzLmdvb2dsZS5jb20vZHJpdmUvdjIvcmVmZXJlbmNlL2ZpbGVzL3VwZGF0ZVxyXG5cdC8vIFBPU1QgaHR0cHM6Ly9kZXZlbG9wZXJzLmdvb2dsZS5jb20vZHJpdmUvbWFuYWdlLXVwbG9hZHNcclxuXHRmdW5jdGlvbiB1cGxvYWREcml2ZShwLCBjYWxsYmFjaykge1xyXG5cclxuXHRcdHZhciBkYXRhID0ge307XHJcblxyXG5cdFx0Ly8gVGVzdCBmb3IgRE9NIGVsZW1lbnRcclxuXHRcdGlmIChwLmRhdGEgJiZcclxuXHRcdFx0KHR5cGVvZiAoSFRNTElucHV0RWxlbWVudCkgIT09ICd1bmRlZmluZWQnICYmIHAuZGF0YSBpbnN0YW5jZW9mIEhUTUxJbnB1dEVsZW1lbnQpXHJcblx0XHQpIHtcclxuXHRcdFx0cC5kYXRhID0ge2ZpbGU6IHAuZGF0YX07XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKCFwLmRhdGEubmFtZSAmJiBPYmplY3QoT2JqZWN0KHAuZGF0YS5maWxlKS5maWxlcykubGVuZ3RoICYmIHAubWV0aG9kID09PSAncG9zdCcpIHtcclxuXHRcdFx0cC5kYXRhLm5hbWUgPSBwLmRhdGEuZmlsZS5maWxlc1swXS5uYW1lO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmIChwLm1ldGhvZCA9PT0gJ3Bvc3QnKSB7XHJcblx0XHRcdHAuZGF0YSA9IHtcclxuXHRcdFx0XHR0aXRsZTogcC5kYXRhLm5hbWUsXHJcblx0XHRcdFx0cGFyZW50czogW3tpZDogcC5kYXRhLnBhcmVudCB8fCAncm9vdCd9XSxcclxuXHRcdFx0XHRmaWxlOiBwLmRhdGEuZmlsZVxyXG5cdFx0XHR9O1xyXG5cdFx0fVxyXG5cdFx0ZWxzZSB7XHJcblxyXG5cdFx0XHQvLyBNYWtlIGEgcmVmZXJlbmNlXHJcblx0XHRcdGRhdGEgPSBwLmRhdGE7XHJcblx0XHRcdHAuZGF0YSA9IHt9O1xyXG5cclxuXHRcdFx0Ly8gQWRkIHRoZSBwYXJ0cyB0byBjaGFuZ2UgYXMgcmVxdWlyZWRcclxuXHRcdFx0aWYgKGRhdGEucGFyZW50KSB7XHJcblx0XHRcdFx0cC5kYXRhLnBhcmVudHMgPSBbe2lkOiBwLmRhdGEucGFyZW50IHx8ICdyb290J31dO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZiAoZGF0YS5maWxlKSB7XHJcblx0XHRcdFx0cC5kYXRhLmZpbGUgPSBkYXRhLmZpbGU7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGlmIChkYXRhLm5hbWUpIHtcclxuXHRcdFx0XHRwLmRhdGEudGl0bGUgPSBkYXRhLm5hbWU7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHQvLyBFeHRyYWN0IHRoZSBmaWxlLCBpZiBpdCBleGlzdHMgZnJvbSB0aGUgZGF0YSBvYmplY3RcclxuXHRcdC8vIElmIHRoZSBGaWxlIGlzIGFuIElOUFVUIGVsZW1lbnQgbGV0cyBqdXN0IGNvbmNlcm4gb3Vyc2VsdmVzIHdpdGggdGhlIE5vZGVMaXN0XHJcblx0XHR2YXIgZmlsZTtcclxuXHRcdGlmICgnZmlsZScgaW4gcC5kYXRhKSB7XHJcblx0XHRcdGZpbGUgPSBwLmRhdGEuZmlsZTtcclxuXHRcdFx0ZGVsZXRlIHAuZGF0YS5maWxlO1xyXG5cclxuXHRcdFx0aWYgKHR5cGVvZiAoZmlsZSkgPT09ICdvYmplY3QnICYmICdmaWxlcycgaW4gZmlsZSkge1xyXG5cdFx0XHRcdC8vIEFzc2lnbiB0aGUgTm9kZUxpc3RcclxuXHRcdFx0XHRmaWxlID0gZmlsZS5maWxlcztcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0aWYgKCFmaWxlIHx8ICFmaWxlLmxlbmd0aCkge1xyXG5cdFx0XHRcdGNhbGxiYWNrKHtcclxuXHRcdFx0XHRcdGVycm9yOiB7XHJcblx0XHRcdFx0XHRcdGNvZGU6ICdyZXF1ZXN0X2ludmFsaWQnLFxyXG5cdFx0XHRcdFx0XHRtZXNzYWdlOiAnVGhlcmUgd2VyZSBubyBmaWxlcyBhdHRhY2hlZCB3aXRoIHRoaXMgcmVxdWVzdCB0byB1cGxvYWQnXHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gU2V0IHR5cGUgcC5kYXRhLm1pbWVUeXBlID0gT2JqZWN0KGZpbGVbMF0pLnR5cGUgfHwgJ2FwcGxpY2F0aW9uL29jdGV0LXN0cmVhbSc7XHJcblxyXG5cdFx0Ly8gQ29uc3RydWN0IGEgbXVsdGlwYXJ0IG1lc3NhZ2VcclxuXHRcdHZhciBwYXJ0cyA9IG5ldyBNdWx0aXBhcnQoKTtcclxuXHRcdHBhcnRzLmFwcGVuZChKU09OLnN0cmluZ2lmeShwLmRhdGEpLCAnYXBwbGljYXRpb24vanNvbicpO1xyXG5cclxuXHRcdC8vIFJlYWQgdGhlIGZpbGUgaW50byBhICBiYXNlNjQgc3RyaW5nLi4uIHllcCBhIGhhc3NsZSwgaSBrbm93XHJcblx0XHQvLyBGb3JtRGF0YSBkb2Vzbid0IGxldCB1cyBhc3NpZ24gb3VyIG93biBNdWx0aXBhcnQgaGVhZGVycyBhbmQgSFRUUCBDb250ZW50LVR5cGVcclxuXHRcdC8vIEFsYXMgR29vZ2xlQXBpIG5lZWQgdGhlc2UgaW4gYSBwYXJ0aWN1bGFyIGZvcm1hdFxyXG5cdFx0aWYgKGZpbGUpIHtcclxuXHRcdFx0cGFydHMuYXBwZW5kKGZpbGUpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHBhcnRzLm9ucmVhZHkoZnVuY3Rpb24oYm9keSwgYm91bmRhcnkpIHtcclxuXHJcblx0XHRcdHAuaGVhZGVyc1snY29udGVudC10eXBlJ10gPSAnbXVsdGlwYXJ0L3JlbGF0ZWQ7IGJvdW5kYXJ5PVwiJyArIGJvdW5kYXJ5ICsgJ1wiJztcclxuXHRcdFx0cC5kYXRhID0gYm9keTtcclxuXHJcblx0XHRcdGNhbGxiYWNrKCd1cGxvYWQvZHJpdmUvdjIvZmlsZXMnICsgKGRhdGEuaWQgPyAnLycgKyBkYXRhLmlkIDogJycpICsgJz91cGxvYWRUeXBlPW11bHRpcGFydCcpO1xyXG5cdFx0fSk7XHJcblxyXG5cdH1cclxuXHJcblx0ZnVuY3Rpb24gdG9KU09OKHApIHtcclxuXHRcdGlmICh0eXBlb2YgKHAuZGF0YSkgPT09ICdvYmplY3QnKSB7XHJcblx0XHRcdC8vIENvbnZlcnQgdGhlIFBPU1QgaW50byBhIGphdmFzY3JpcHQgb2JqZWN0XHJcblx0XHRcdHRyeSB7XHJcblx0XHRcdFx0cC5kYXRhID0gSlNPTi5zdHJpbmdpZnkocC5kYXRhKTtcclxuXHRcdFx0XHRwLmhlYWRlcnNbJ2NvbnRlbnQtdHlwZSddID0gJ2FwcGxpY2F0aW9uL2pzb24nO1xyXG5cdFx0XHR9XHJcblx0XHRcdGNhdGNoIChlKSB7fVxyXG5cdFx0fVxyXG5cdH1cclxuXHJcbn0pKGhlbGxvKTtcclxuXHJcbihmdW5jdGlvbihoZWxsbykge1xyXG5cclxuXHRoZWxsby5pbml0KHtcclxuXHJcblx0XHRpbnN0YWdyYW06IHtcclxuXHJcblx0XHRcdG5hbWU6ICdJbnN0YWdyYW0nLFxyXG5cclxuXHRcdFx0b2F1dGg6IHtcclxuXHRcdFx0XHQvLyBTZWU6IGh0dHA6Ly9pbnN0YWdyYW0uY29tL2RldmVsb3Blci9hdXRoZW50aWNhdGlvbi9cclxuXHRcdFx0XHR2ZXJzaW9uOiAyLFxyXG5cdFx0XHRcdGF1dGg6ICdodHRwczovL2luc3RhZ3JhbS5jb20vb2F1dGgvYXV0aG9yaXplLycsXHJcblx0XHRcdFx0Z3JhbnQ6ICdodHRwczovL2FwaS5pbnN0YWdyYW0uY29tL29hdXRoL2FjY2Vzc190b2tlbidcclxuXHRcdFx0fSxcclxuXHJcblx0XHRcdC8vIFJlZnJlc2ggdGhlIGFjY2Vzc190b2tlbiBvbmNlIGV4cGlyZWRcclxuXHRcdFx0cmVmcmVzaDogdHJ1ZSxcclxuXHJcblx0XHRcdHNjb3BlOiB7XHJcblx0XHRcdFx0YmFzaWM6ICdiYXNpYycsXHJcblx0XHRcdFx0cGhvdG9zOiAnJyxcclxuXHRcdFx0XHRmcmllbmRzOiAncmVsYXRpb25zaGlwcycsXHJcblx0XHRcdFx0cHVibGlzaDogJ2xpa2VzIGNvbW1lbnRzJyxcclxuXHRcdFx0XHRlbWFpbDogJycsXHJcblx0XHRcdFx0c2hhcmU6ICcnLFxyXG5cdFx0XHRcdHB1Ymxpc2hfZmlsZXM6ICcnLFxyXG5cdFx0XHRcdGZpbGVzOiAnJyxcclxuXHRcdFx0XHR2aWRlb3M6ICcnLFxyXG5cdFx0XHRcdG9mZmxpbmVfYWNjZXNzOiAnJ1xyXG5cdFx0XHR9LFxyXG5cclxuXHRcdFx0c2NvcGVfZGVsaW06ICcgJyxcclxuXHJcblx0XHRcdGJhc2U6ICdodHRwczovL2FwaS5pbnN0YWdyYW0uY29tL3YxLycsXHJcblxyXG5cdFx0XHRnZXQ6IHtcclxuXHRcdFx0XHRtZTogJ3VzZXJzL3NlbGYnLFxyXG5cdFx0XHRcdCdtZS9mZWVkJzogJ3VzZXJzL3NlbGYvZmVlZD9jb3VudD1Ae2xpbWl0fDEwMH0nLFxyXG5cdFx0XHRcdCdtZS9waG90b3MnOiAndXNlcnMvc2VsZi9tZWRpYS9yZWNlbnQ/bWluX2lkPTAmY291bnQ9QHtsaW1pdHwxMDB9JyxcclxuXHRcdFx0XHQnbWUvZnJpZW5kcyc6ICd1c2Vycy9zZWxmL2ZvbGxvd3M/Y291bnQ9QHtsaW1pdHwxMDB9JyxcclxuXHRcdFx0XHQnbWUvZm9sbG93aW5nJzogJ3VzZXJzL3NlbGYvZm9sbG93cz9jb3VudD1Ae2xpbWl0fDEwMH0nLFxyXG5cdFx0XHRcdCdtZS9mb2xsb3dlcnMnOiAndXNlcnMvc2VsZi9mb2xsb3dlZC1ieT9jb3VudD1Ae2xpbWl0fDEwMH0nLFxyXG5cdFx0XHRcdCdmcmllbmQvcGhvdG9zJzogJ3VzZXJzL0B7aWR9L21lZGlhL3JlY2VudD9taW5faWQ9MCZjb3VudD1Ae2xpbWl0fDEwMH0nXHJcblx0XHRcdH0sXHJcblxyXG5cdFx0XHRwb3N0OiB7XHJcblx0XHRcdFx0J21lL2xpa2UnOiBmdW5jdGlvbihwLCBjYWxsYmFjaykge1xyXG5cdFx0XHRcdFx0dmFyIGlkID0gcC5kYXRhLmlkO1xyXG5cdFx0XHRcdFx0cC5kYXRhID0ge307XHJcblx0XHRcdFx0XHRjYWxsYmFjaygnbWVkaWEvJyArIGlkICsgJy9saWtlcycpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSxcclxuXHJcblx0XHRcdGRlbDoge1xyXG5cdFx0XHRcdCdtZS9saWtlJzogJ21lZGlhL0B7aWR9L2xpa2VzJ1xyXG5cdFx0XHR9LFxyXG5cclxuXHRcdFx0d3JhcDoge1xyXG5cdFx0XHRcdG1lOiBmdW5jdGlvbihvKSB7XHJcblxyXG5cdFx0XHRcdFx0Zm9ybWF0RXJyb3Iobyk7XHJcblxyXG5cdFx0XHRcdFx0aWYgKCdkYXRhJyBpbiBvKSB7XHJcblx0XHRcdFx0XHRcdG8uaWQgPSBvLmRhdGEuaWQ7XHJcblx0XHRcdFx0XHRcdG8udGh1bWJuYWlsID0gby5kYXRhLnByb2ZpbGVfcGljdHVyZTtcclxuXHRcdFx0XHRcdFx0by5uYW1lID0gby5kYXRhLmZ1bGxfbmFtZSB8fCBvLmRhdGEudXNlcm5hbWU7XHJcblx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0cmV0dXJuIG87XHJcblx0XHRcdFx0fSxcclxuXHJcblx0XHRcdFx0J21lL2ZyaWVuZHMnOiBmb3JtYXRGcmllbmRzLFxyXG5cdFx0XHRcdCdtZS9mb2xsb3dpbmcnOiBmb3JtYXRGcmllbmRzLFxyXG5cdFx0XHRcdCdtZS9mb2xsb3dlcnMnOiBmb3JtYXRGcmllbmRzLFxyXG5cdFx0XHRcdCdtZS9waG90b3MnOiBmdW5jdGlvbihvKSB7XHJcblxyXG5cdFx0XHRcdFx0Zm9ybWF0RXJyb3Iobyk7XHJcblx0XHRcdFx0XHRwYWdpbmcobyk7XHJcblxyXG5cdFx0XHRcdFx0aWYgKCdkYXRhJyBpbiBvKSB7XHJcblx0XHRcdFx0XHRcdG8uZGF0YSA9IG8uZGF0YS5maWx0ZXIoZnVuY3Rpb24oZCkge1xyXG5cdFx0XHRcdFx0XHRcdHJldHVybiBkLnR5cGUgPT09ICdpbWFnZSc7XHJcblx0XHRcdFx0XHRcdH0pO1xyXG5cclxuXHRcdFx0XHRcdFx0by5kYXRhLmZvckVhY2goZnVuY3Rpb24oZCkge1xyXG5cdFx0XHRcdFx0XHRcdGQubmFtZSA9IGQuY2FwdGlvbiA/IGQuY2FwdGlvbi50ZXh0IDogbnVsbDtcclxuXHRcdFx0XHRcdFx0XHRkLnRodW1ibmFpbCA9IGQuaW1hZ2VzLnRodW1ibmFpbC51cmw7XHJcblx0XHRcdFx0XHRcdFx0ZC5waWN0dXJlID0gZC5pbWFnZXMuc3RhbmRhcmRfcmVzb2x1dGlvbi51cmw7XHJcblx0XHRcdFx0XHRcdFx0ZC5waWN0dXJlcyA9IE9iamVjdC5rZXlzKGQuaW1hZ2VzKVxyXG5cdFx0XHRcdFx0XHRcdFx0Lm1hcChmdW5jdGlvbihrZXkpIHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0dmFyIGltYWdlID0gZC5pbWFnZXNba2V5XTtcclxuXHRcdFx0XHRcdFx0XHRcdFx0cmV0dXJuIGZvcm1hdEltYWdlKGltYWdlKTtcclxuXHRcdFx0XHRcdFx0XHRcdH0pXHJcblx0XHRcdFx0XHRcdFx0XHQuc29ydChmdW5jdGlvbihhLCBiKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdHJldHVybiBhLndpZHRoIC0gYi53aWR0aDtcclxuXHRcdFx0XHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdFx0XHR9KTtcclxuXHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHRyZXR1cm4gbztcclxuXHRcdFx0XHR9LFxyXG5cclxuXHRcdFx0XHQnZGVmYXVsdCc6IGZ1bmN0aW9uKG8pIHtcclxuXHRcdFx0XHRcdG8gPSBmb3JtYXRFcnJvcihvKTtcclxuXHRcdFx0XHRcdHBhZ2luZyhvKTtcclxuXHRcdFx0XHRcdHJldHVybiBvO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSxcclxuXHJcblx0XHRcdC8vIEluc3RhZ3JhbSBkb2VzIG5vdCByZXR1cm4gYW55IENPUlMgSGVhZGVyc1xyXG5cdFx0XHQvLyBTbyBiZXNpZGVzIEpTT05QIHdlJ3JlIHN0dWNrIHdpdGggcHJveHlcclxuXHRcdFx0eGhyOiBmdW5jdGlvbihwLCBxcykge1xyXG5cclxuXHRcdFx0XHR2YXIgbWV0aG9kID0gcC5tZXRob2Q7XHJcblx0XHRcdFx0dmFyIHByb3h5ID0gbWV0aG9kICE9PSAnZ2V0JztcclxuXHJcblx0XHRcdFx0aWYgKHByb3h5KSB7XHJcblxyXG5cdFx0XHRcdFx0aWYgKChtZXRob2QgPT09ICdwb3N0JyB8fCBtZXRob2QgPT09ICdwdXQnKSAmJiBwLnF1ZXJ5LmFjY2Vzc190b2tlbikge1xyXG5cdFx0XHRcdFx0XHRwLmRhdGEuYWNjZXNzX3Rva2VuID0gcC5xdWVyeS5hY2Nlc3NfdG9rZW47XHJcblx0XHRcdFx0XHRcdGRlbGV0ZSBwLnF1ZXJ5LmFjY2Vzc190b2tlbjtcclxuXHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHQvLyBObyBhY2Nlc3MgY29udHJvbCBoZWFkZXJzXHJcblx0XHRcdFx0XHQvLyBVc2UgdGhlIHByb3h5IGluc3RlYWRcclxuXHRcdFx0XHRcdHAucHJveHkgPSBwcm94eTtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdHJldHVybiBwcm94eTtcclxuXHRcdFx0fSxcclxuXHJcblx0XHRcdC8vIE5vIGZvcm1cclxuXHRcdFx0Zm9ybTogZmFsc2VcclxuXHRcdH1cclxuXHR9KTtcclxuXHJcblx0ZnVuY3Rpb24gZm9ybWF0SW1hZ2UoaW1hZ2UpIHtcclxuXHRcdHJldHVybiB7XHJcblx0XHRcdHNvdXJjZTogaW1hZ2UudXJsLFxyXG5cdFx0XHR3aWR0aDogaW1hZ2Uud2lkdGgsXHJcblx0XHRcdGhlaWdodDogaW1hZ2UuaGVpZ2h0XHJcblx0XHR9O1xyXG5cdH1cclxuXHJcblx0ZnVuY3Rpb24gZm9ybWF0RXJyb3Iobykge1xyXG5cdFx0aWYgKHR5cGVvZiBvID09PSAnc3RyaW5nJykge1xyXG5cdFx0XHRyZXR1cm4ge1xyXG5cdFx0XHRcdGVycm9yOiB7XHJcblx0XHRcdFx0XHRjb2RlOiAnaW52YWxpZF9yZXF1ZXN0JyxcclxuXHRcdFx0XHRcdG1lc3NhZ2U6IG9cclxuXHRcdFx0XHR9XHJcblx0XHRcdH07XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKG8gJiYgJ21ldGEnIGluIG8gJiYgJ2Vycm9yX3R5cGUnIGluIG8ubWV0YSkge1xyXG5cdFx0XHRvLmVycm9yID0ge1xyXG5cdFx0XHRcdGNvZGU6IG8ubWV0YS5lcnJvcl90eXBlLFxyXG5cdFx0XHRcdG1lc3NhZ2U6IG8ubWV0YS5lcnJvcl9tZXNzYWdlXHJcblx0XHRcdH07XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIG87XHJcblx0fVxyXG5cclxuXHRmdW5jdGlvbiBmb3JtYXRGcmllbmRzKG8pIHtcclxuXHRcdHBhZ2luZyhvKTtcclxuXHRcdGlmIChvICYmICdkYXRhJyBpbiBvKSB7XHJcblx0XHRcdG8uZGF0YS5mb3JFYWNoKGZvcm1hdEZyaWVuZCk7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIG87XHJcblx0fVxyXG5cclxuXHRmdW5jdGlvbiBmb3JtYXRGcmllbmQobykge1xyXG5cdFx0aWYgKG8uaWQpIHtcclxuXHRcdFx0by50aHVtYm5haWwgPSBvLnByb2ZpbGVfcGljdHVyZTtcclxuXHRcdFx0by5uYW1lID0gby5mdWxsX25hbWUgfHwgby51c2VybmFtZTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdC8vIFNlZTogaHR0cDovL2luc3RhZ3JhbS5jb20vZGV2ZWxvcGVyL2VuZHBvaW50cy9cclxuXHRmdW5jdGlvbiBwYWdpbmcocmVzKSB7XHJcblx0XHRpZiAoJ3BhZ2luYXRpb24nIGluIHJlcykge1xyXG5cdFx0XHRyZXMucGFnaW5nID0ge1xyXG5cdFx0XHRcdG5leHQ6IHJlcy5wYWdpbmF0aW9uLm5leHRfdXJsXHJcblx0XHRcdH07XHJcblx0XHRcdGRlbGV0ZSByZXMucGFnaW5hdGlvbjtcclxuXHRcdH1cclxuXHR9XHJcblxyXG59KShoZWxsbyk7XHJcblxyXG4oZnVuY3Rpb24oaGVsbG8pIHtcclxuXHJcblx0aGVsbG8uaW5pdCh7XHJcblxyXG5cdFx0am9pbm1lOiB7XHJcblxyXG5cdFx0XHRuYW1lOiAnam9pbi5tZScsXHJcblxyXG5cdFx0XHRvYXV0aDoge1xyXG5cdFx0XHRcdHZlcnNpb246IDIsXHJcblx0XHRcdFx0YXV0aDogJ2h0dHBzOi8vc2VjdXJlLmpvaW4ubWUvYXBpL3B1YmxpYy92MS9hdXRoL29hdXRoMicsXHJcblx0XHRcdFx0Z3JhbnQ6ICdodHRwczovL3NlY3VyZS5qb2luLm1lL2FwaS9wdWJsaWMvdjEvYXV0aC9vYXV0aDInXHJcblx0XHRcdH0sXHJcblxyXG5cdFx0XHRyZWZyZXNoOiBmYWxzZSxcclxuXHJcblx0XHRcdHNjb3BlOiB7XHJcblx0XHRcdFx0YmFzaWM6ICd1c2VyX2luZm8nLFxyXG5cdFx0XHRcdHVzZXI6ICd1c2VyX2luZm8nLFxyXG5cdFx0XHRcdHNjaGVkdWxlcjogJ3NjaGVkdWxlcicsXHJcblx0XHRcdFx0c3RhcnQ6ICdzdGFydF9tZWV0aW5nJyxcclxuXHRcdFx0XHRlbWFpbDogJycsXHJcblx0XHRcdFx0ZnJpZW5kczogJycsXHJcblx0XHRcdFx0c2hhcmU6ICcnLFxyXG5cdFx0XHRcdHB1Ymxpc2g6ICcnLFxyXG5cdFx0XHRcdHBob3RvczogJycsXHJcblx0XHRcdFx0cHVibGlzaF9maWxlczogJycsXHJcblx0XHRcdFx0ZmlsZXM6ICcnLFxyXG5cdFx0XHRcdHZpZGVvczogJycsXHJcblx0XHRcdFx0b2ZmbGluZV9hY2Nlc3M6ICcnXHJcblx0XHRcdH0sXHJcblxyXG5cdFx0XHRzY29wZV9kZWxpbTogJyAnLFxyXG5cclxuXHRcdFx0bG9naW46IGZ1bmN0aW9uKHApIHtcclxuXHRcdFx0XHRwLm9wdGlvbnMucG9wdXAud2lkdGggPSA0MDA7XHJcblx0XHRcdFx0cC5vcHRpb25zLnBvcHVwLmhlaWdodCA9IDcwMDtcclxuXHRcdFx0fSxcclxuXHJcblx0XHRcdGJhc2U6ICdodHRwczovL2FwaS5qb2luLm1lL3YxLycsXHJcblxyXG5cdFx0XHRnZXQ6IHtcclxuXHRcdFx0XHRtZTogJ3VzZXInLFxyXG5cdFx0XHRcdG1lZXRpbmdzOiAnbWVldGluZ3MnLFxyXG5cdFx0XHRcdCdtZWV0aW5ncy9pbmZvJzogJ21lZXRpbmdzL0B7aWR9J1xyXG5cdFx0XHR9LFxyXG5cclxuXHRcdFx0cG9zdDoge1xyXG5cdFx0XHRcdCdtZWV0aW5ncy9zdGFydC9hZGhvYyc6IGZ1bmN0aW9uKHAsIGNhbGxiYWNrKSB7XHJcblx0XHRcdFx0XHRjYWxsYmFjaygnbWVldGluZ3Mvc3RhcnQnKTtcclxuXHRcdFx0XHR9LFxyXG5cclxuXHRcdFx0XHQnbWVldGluZ3Mvc3RhcnQvc2NoZWR1bGVkJzogZnVuY3Rpb24ocCwgY2FsbGJhY2spIHtcclxuXHRcdFx0XHRcdHZhciBtZWV0aW5nSWQgPSBwLmRhdGEubWVldGluZ0lkO1xyXG5cdFx0XHRcdFx0cC5kYXRhID0ge307XHJcblx0XHRcdFx0XHRjYWxsYmFjaygnbWVldGluZ3MvJyArIG1lZXRpbmdJZCArICcvc3RhcnQnKTtcclxuXHRcdFx0XHR9LFxyXG5cclxuXHRcdFx0XHQnbWVldGluZ3Mvc2NoZWR1bGUnOiBmdW5jdGlvbihwLCBjYWxsYmFjaykge1xyXG5cdFx0XHRcdFx0Y2FsbGJhY2soJ21lZXRpbmdzJyk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9LFxyXG5cclxuXHRcdFx0cGF0Y2g6IHtcclxuXHRcdFx0XHQnbWVldGluZ3MvdXBkYXRlJzogZnVuY3Rpb24ocCwgY2FsbGJhY2spIHtcclxuXHRcdFx0XHRcdGNhbGxiYWNrKCdtZWV0aW5ncy8nICsgcC5kYXRhLm1lZXRpbmdJZCk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9LFxyXG5cclxuXHRcdFx0ZGVsOiB7XHJcblx0XHRcdFx0J21lZXRpbmdzL2RlbGV0ZSc6ICdtZWV0aW5ncy9Ae2lkfSdcclxuXHRcdFx0fSxcclxuXHJcblx0XHRcdHdyYXA6IHtcclxuXHRcdFx0XHRtZTogZnVuY3Rpb24obywgaGVhZGVycykge1xyXG5cdFx0XHRcdFx0Zm9ybWF0RXJyb3IobywgaGVhZGVycyk7XHJcblxyXG5cdFx0XHRcdFx0aWYgKCFvLmVtYWlsKSB7XHJcblx0XHRcdFx0XHRcdHJldHVybiBvO1xyXG5cdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdG8ubmFtZSA9IG8uZnVsbE5hbWU7XHJcblx0XHRcdFx0XHRvLmZpcnN0X25hbWUgPSBvLm5hbWUuc3BsaXQoJyAnKVswXTtcclxuXHRcdFx0XHRcdG8ubGFzdF9uYW1lID0gby5uYW1lLnNwbGl0KCcgJylbMV07XHJcblx0XHRcdFx0XHRvLmlkID0gby5lbWFpbDtcclxuXHJcblx0XHRcdFx0XHRyZXR1cm4gbztcclxuXHRcdFx0XHR9LFxyXG5cclxuXHRcdFx0XHQnZGVmYXVsdCc6IGZ1bmN0aW9uKG8sIGhlYWRlcnMpIHtcclxuXHRcdFx0XHRcdGZvcm1hdEVycm9yKG8sIGhlYWRlcnMpO1xyXG5cclxuXHRcdFx0XHRcdHJldHVybiBvO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSxcclxuXHJcblx0XHRcdHhocjogZm9ybWF0UmVxdWVzdFxyXG5cclxuXHRcdH1cclxuXHR9KTtcclxuXHJcblx0ZnVuY3Rpb24gZm9ybWF0RXJyb3IobywgaGVhZGVycykge1xyXG5cdFx0dmFyIGVycm9yQ29kZTtcclxuXHRcdHZhciBtZXNzYWdlO1xyXG5cdFx0dmFyIGRldGFpbHM7XHJcblxyXG5cdFx0aWYgKG8gJiYgKCdNZXNzYWdlJyBpbiBvKSkge1xyXG5cdFx0XHRtZXNzYWdlID0gby5NZXNzYWdlO1xyXG5cdFx0XHRkZWxldGUgby5NZXNzYWdlO1xyXG5cclxuXHRcdFx0aWYgKCdFcnJvckNvZGUnIGluIG8pIHtcclxuXHRcdFx0XHRlcnJvckNvZGUgPSBvLkVycm9yQ29kZTtcclxuXHRcdFx0XHRkZWxldGUgby5FcnJvckNvZGU7XHJcblx0XHRcdH1cclxuXHRcdFx0ZWxzZSB7XHJcblx0XHRcdFx0ZXJyb3JDb2RlID0gZ2V0RXJyb3JDb2RlKGhlYWRlcnMpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRvLmVycm9yID0ge1xyXG5cdFx0XHRcdGNvZGU6IGVycm9yQ29kZSxcclxuXHRcdFx0XHRtZXNzYWdlOiBtZXNzYWdlLFxyXG5cdFx0XHRcdGRldGFpbHM6IG9cclxuXHRcdFx0fTtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gbztcclxuXHR9XHJcblxyXG5cdGZ1bmN0aW9uIGZvcm1hdFJlcXVlc3QocCwgcXMpIHtcclxuXHRcdC8vIE1vdmUgdGhlIGFjY2VzcyB0b2tlbiBmcm9tIHRoZSByZXF1ZXN0IGJvZHkgdG8gdGhlIHJlcXVlc3QgaGVhZGVyXHJcblx0XHR2YXIgdG9rZW4gPSBxcy5hY2Nlc3NfdG9rZW47XHJcblx0XHRkZWxldGUgcXMuYWNjZXNzX3Rva2VuO1xyXG5cdFx0cC5oZWFkZXJzLkF1dGhvcml6YXRpb24gPSAnQmVhcmVyICcgKyB0b2tlbjtcclxuXHJcblx0XHQvLyBGb3JtYXQgbm9uLWdldCByZXF1ZXN0cyB0byBpbmRpY2F0ZSBqc29uIGJvZHlcclxuXHRcdGlmIChwLm1ldGhvZCAhPT0gJ2dldCcgJiYgcC5kYXRhKSB7XHJcblx0XHRcdHAuaGVhZGVyc1snQ29udGVudC1UeXBlJ10gPSAnYXBwbGljYXRpb24vanNvbic7XHJcblx0XHRcdGlmICh0eXBlb2YgKHAuZGF0YSkgPT09ICdvYmplY3QnKSB7XHJcblx0XHRcdFx0cC5kYXRhID0gSlNPTi5zdHJpbmdpZnkocC5kYXRhKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdGlmIChwLm1ldGhvZCA9PT0gJ3B1dCcpIHtcclxuXHRcdFx0cC5tZXRob2QgPSAncGF0Y2gnO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiB0cnVlO1xyXG5cdH1cclxuXHJcblx0ZnVuY3Rpb24gZ2V0RXJyb3JDb2RlKGhlYWRlcnMpIHtcclxuXHRcdHN3aXRjaCAoaGVhZGVycy5zdGF0dXNDb2RlKSB7XHJcblx0XHRcdGNhc2UgNDAwOlxyXG5cdFx0XHRcdHJldHVybiAnaW52YWxpZF9yZXF1ZXN0JztcclxuXHRcdFx0Y2FzZSA0MDM6XHJcblx0XHRcdFx0cmV0dXJuICdzdGFsZV90b2tlbic7XHJcblx0XHRcdGNhc2UgNDAxOlxyXG5cdFx0XHRcdHJldHVybiAnaW52YWxpZF90b2tlbic7XHJcblx0XHRcdGNhc2UgNTAwOlxyXG5cdFx0XHRcdHJldHVybiAnc2VydmVyX2Vycm9yJztcclxuXHRcdFx0ZGVmYXVsdDpcclxuXHRcdFx0XHRyZXR1cm4gJ3NlcnZlcl9lcnJvcic7XHJcblx0XHR9XHJcblx0fVxyXG5cclxufShoZWxsbykpO1xyXG5cclxuKGZ1bmN0aW9uKGhlbGxvKSB7XHJcblxyXG5cdGhlbGxvLmluaXQoe1xyXG5cclxuXHRcdGxpbmtlZGluOiB7XHJcblxyXG5cdFx0XHRvYXV0aDoge1xyXG5cdFx0XHRcdHZlcnNpb246IDIsXHJcblx0XHRcdFx0cmVzcG9uc2VfdHlwZTogJ2NvZGUnLFxyXG5cdFx0XHRcdGF1dGg6ICdodHRwczovL3d3dy5saW5rZWRpbi5jb20vdWFzL29hdXRoMi9hdXRob3JpemF0aW9uJyxcclxuXHRcdFx0XHRncmFudDogJ2h0dHBzOi8vd3d3LmxpbmtlZGluLmNvbS91YXMvb2F1dGgyL2FjY2Vzc1Rva2VuJ1xyXG5cdFx0XHR9LFxyXG5cclxuXHRcdFx0Ly8gUmVmcmVzaCB0aGUgYWNjZXNzX3Rva2VuIG9uY2UgZXhwaXJlZFxyXG5cdFx0XHRyZWZyZXNoOiB0cnVlLFxyXG5cclxuXHRcdFx0c2NvcGU6IHtcclxuXHRcdFx0XHRiYXNpYzogJ3JfYmFzaWNwcm9maWxlJyxcclxuXHRcdFx0XHRlbWFpbDogJ3JfZW1haWxhZGRyZXNzJyxcclxuXHRcdFx0XHRmaWxlczogJycsXHJcblx0XHRcdFx0ZnJpZW5kczogJycsXHJcblx0XHRcdFx0cGhvdG9zOiAnJyxcclxuXHRcdFx0XHRwdWJsaXNoOiAnd19zaGFyZScsXHJcblx0XHRcdFx0cHVibGlzaF9maWxlczogJ3dfc2hhcmUnLFxyXG5cdFx0XHRcdHNoYXJlOiAnJyxcclxuXHRcdFx0XHR2aWRlb3M6ICcnLFxyXG5cdFx0XHRcdG9mZmxpbmVfYWNjZXNzOiAnJ1xyXG5cdFx0XHR9LFxyXG5cdFx0XHRzY29wZV9kZWxpbTogJyAnLFxyXG5cclxuXHRcdFx0YmFzZTogJ2h0dHBzOi8vYXBpLmxpbmtlZGluLmNvbS92MS8nLFxyXG5cclxuXHRcdFx0Z2V0OiB7XHJcblx0XHRcdFx0bWU6ICdwZW9wbGUvfjoocGljdHVyZS11cmwsZmlyc3QtbmFtZSxsYXN0LW5hbWUsaWQsZm9ybWF0dGVkLW5hbWUsZW1haWwtYWRkcmVzcyknLFxyXG5cclxuXHRcdFx0XHQvLyBTZWU6IGh0dHA6Ly9kZXZlbG9wZXIubGlua2VkaW4uY29tL2RvY3VtZW50cy9nZXQtbmV0d29yay11cGRhdGVzLWFuZC1zdGF0aXN0aWNzLWFwaVxyXG5cdFx0XHRcdCdtZS9zaGFyZSc6ICdwZW9wbGUvfi9uZXR3b3JrL3VwZGF0ZXM/Y291bnQ9QHtsaW1pdHwyNTB9J1xyXG5cdFx0XHR9LFxyXG5cclxuXHRcdFx0cG9zdDoge1xyXG5cclxuXHRcdFx0XHQvLyBTZWU6IGh0dHBzOi8vZGV2ZWxvcGVyLmxpbmtlZGluLmNvbS9kb2N1bWVudHMvYXBpLXJlcXVlc3RzLWpzb25cclxuXHRcdFx0XHQnbWUvc2hhcmUnOiBmdW5jdGlvbihwLCBjYWxsYmFjaykge1xyXG5cdFx0XHRcdFx0dmFyIGRhdGEgPSB7XHJcblx0XHRcdFx0XHRcdHZpc2liaWxpdHk6IHtcclxuXHRcdFx0XHRcdFx0XHRjb2RlOiAnYW55b25lJ1xyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHR9O1xyXG5cclxuXHRcdFx0XHRcdGlmIChwLmRhdGEuaWQpIHtcclxuXHJcblx0XHRcdFx0XHRcdGRhdGEuYXR0cmlidXRpb24gPSB7XHJcblx0XHRcdFx0XHRcdFx0c2hhcmU6IHtcclxuXHRcdFx0XHRcdFx0XHRcdGlkOiBwLmRhdGEuaWRcclxuXHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdH07XHJcblxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0ZWxzZSB7XHJcblx0XHRcdFx0XHRcdGRhdGEuY29tbWVudCA9IHAuZGF0YS5tZXNzYWdlO1xyXG5cdFx0XHRcdFx0XHRpZiAocC5kYXRhLnBpY3R1cmUgJiYgcC5kYXRhLmxpbmspIHtcclxuXHRcdFx0XHRcdFx0XHRkYXRhLmNvbnRlbnQgPSB7XHJcblx0XHRcdFx0XHRcdFx0XHQnc3VibWl0dGVkLXVybCc6IHAuZGF0YS5saW5rLFxyXG5cdFx0XHRcdFx0XHRcdFx0J3N1Ym1pdHRlZC1pbWFnZS11cmwnOiBwLmRhdGEucGljdHVyZVxyXG5cdFx0XHRcdFx0XHRcdH07XHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHRwLmRhdGEgPSBKU09OLnN0cmluZ2lmeShkYXRhKTtcclxuXHJcblx0XHRcdFx0XHRjYWxsYmFjaygncGVvcGxlL34vc2hhcmVzP2Zvcm1hdD1qc29uJyk7XHJcblx0XHRcdFx0fSxcclxuXHJcblx0XHRcdFx0J21lL2xpa2UnOiBsaWtlXHJcblx0XHRcdH0sXHJcblxyXG5cdFx0XHRkZWw6e1xyXG5cdFx0XHRcdCdtZS9saWtlJzogbGlrZVxyXG5cdFx0XHR9LFxyXG5cclxuXHRcdFx0d3JhcDoge1xyXG5cdFx0XHRcdG1lOiBmdW5jdGlvbihvKSB7XHJcblx0XHRcdFx0XHRmb3JtYXRFcnJvcihvKTtcclxuXHRcdFx0XHRcdGZvcm1hdFVzZXIobyk7XHJcblx0XHRcdFx0XHRyZXR1cm4gbztcclxuXHRcdFx0XHR9LFxyXG5cclxuXHRcdFx0XHQnbWUvZnJpZW5kcyc6IGZvcm1hdEZyaWVuZHMsXHJcblx0XHRcdFx0J21lL2ZvbGxvd2luZyc6IGZvcm1hdEZyaWVuZHMsXHJcblx0XHRcdFx0J21lL2ZvbGxvd2Vycyc6IGZvcm1hdEZyaWVuZHMsXHJcblx0XHRcdFx0J21lL3NoYXJlJzogZnVuY3Rpb24obykge1xyXG5cdFx0XHRcdFx0Zm9ybWF0RXJyb3Iobyk7XHJcblx0XHRcdFx0XHRwYWdpbmcobyk7XHJcblx0XHRcdFx0XHRpZiAoby52YWx1ZXMpIHtcclxuXHRcdFx0XHRcdFx0by5kYXRhID0gby52YWx1ZXMubWFwKGZvcm1hdFVzZXIpO1xyXG5cdFx0XHRcdFx0XHRvLmRhdGEuZm9yRWFjaChmdW5jdGlvbihpdGVtKSB7XHJcblx0XHRcdFx0XHRcdFx0aXRlbS5tZXNzYWdlID0gaXRlbS5oZWFkbGluZTtcclxuXHRcdFx0XHRcdFx0fSk7XHJcblxyXG5cdFx0XHRcdFx0XHRkZWxldGUgby52YWx1ZXM7XHJcblx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0cmV0dXJuIG87XHJcblx0XHRcdFx0fSxcclxuXHJcblx0XHRcdFx0J2RlZmF1bHQnOiBmdW5jdGlvbihvLCBoZWFkZXJzKSB7XHJcblx0XHRcdFx0XHRmb3JtYXRFcnJvcihvKTtcclxuXHRcdFx0XHRcdGVtcHR5KG8sIGhlYWRlcnMpO1xyXG5cdFx0XHRcdFx0cGFnaW5nKG8pO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSxcclxuXHJcblx0XHRcdGpzb25wOiBmdW5jdGlvbihwLCBxcykge1xyXG5cdFx0XHRcdGZvcm1hdFF1ZXJ5KHFzKTtcclxuXHRcdFx0XHRpZiAocC5tZXRob2QgPT09ICdnZXQnKSB7XHJcblx0XHRcdFx0XHRxcy5mb3JtYXQgPSAnanNvbnAnO1xyXG5cdFx0XHRcdFx0cXNbJ2Vycm9yLWNhbGxiYWNrJ10gPSBwLmNhbGxiYWNrSUQ7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9LFxyXG5cclxuXHRcdFx0eGhyOiBmdW5jdGlvbihwLCBxcykge1xyXG5cdFx0XHRcdGlmIChwLm1ldGhvZCAhPT0gJ2dldCcpIHtcclxuXHRcdFx0XHRcdGZvcm1hdFF1ZXJ5KHFzKTtcclxuXHRcdFx0XHRcdHAuaGVhZGVyc1snQ29udGVudC1UeXBlJ10gPSAnYXBwbGljYXRpb24vanNvbic7XHJcblxyXG5cdFx0XHRcdFx0Ly8gTm90ZTogeC1saS1mb3JtYXQgZW5zdXJlcyBlcnJvciByZXNwb25zZXMgYXJlIG5vdCByZXR1cm5lZCBpbiBYTUxcclxuXHRcdFx0XHRcdHAuaGVhZGVyc1sneC1saS1mb3JtYXQnXSA9ICdqc29uJztcclxuXHRcdFx0XHRcdHAucHJveHkgPSB0cnVlO1xyXG5cdFx0XHRcdFx0cmV0dXJuIHRydWU7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9KTtcclxuXHJcblx0ZnVuY3Rpb24gZm9ybWF0RXJyb3Iobykge1xyXG5cdFx0aWYgKG8gJiYgJ2Vycm9yQ29kZScgaW4gbykge1xyXG5cdFx0XHRvLmVycm9yID0ge1xyXG5cdFx0XHRcdGNvZGU6IG8uc3RhdHVzLFxyXG5cdFx0XHRcdG1lc3NhZ2U6IG8ubWVzc2FnZVxyXG5cdFx0XHR9O1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0ZnVuY3Rpb24gZm9ybWF0VXNlcihvKSB7XHJcblx0XHRpZiAoby5lcnJvcikge1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblxyXG5cdFx0by5maXJzdF9uYW1lID0gby5maXJzdE5hbWU7XHJcblx0XHRvLmxhc3RfbmFtZSA9IG8ubGFzdE5hbWU7XHJcblx0XHRvLm5hbWUgPSBvLmZvcm1hdHRlZE5hbWUgfHwgKG8uZmlyc3RfbmFtZSArICcgJyArIG8ubGFzdF9uYW1lKTtcclxuXHRcdG8udGh1bWJuYWlsID0gby5waWN0dXJlVXJsO1xyXG5cdFx0by5lbWFpbCA9IG8uZW1haWxBZGRyZXNzO1xyXG5cdFx0cmV0dXJuIG87XHJcblx0fVxyXG5cclxuXHRmdW5jdGlvbiBmb3JtYXRGcmllbmRzKG8pIHtcclxuXHRcdGZvcm1hdEVycm9yKG8pO1xyXG5cdFx0cGFnaW5nKG8pO1xyXG5cdFx0aWYgKG8udmFsdWVzKSB7XHJcblx0XHRcdG8uZGF0YSA9IG8udmFsdWVzLm1hcChmb3JtYXRVc2VyKTtcclxuXHRcdFx0ZGVsZXRlIG8udmFsdWVzO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBvO1xyXG5cdH1cclxuXHJcblx0ZnVuY3Rpb24gcGFnaW5nKHJlcykge1xyXG5cdFx0aWYgKCdfY291bnQnIGluIHJlcyAmJiAnX3N0YXJ0JyBpbiByZXMgJiYgKHJlcy5fY291bnQgKyByZXMuX3N0YXJ0KSA8IHJlcy5fdG90YWwpIHtcclxuXHRcdFx0cmVzLnBhZ2luZyA9IHtcclxuXHRcdFx0XHRuZXh0OiAnP3N0YXJ0PScgKyAocmVzLl9zdGFydCArIHJlcy5fY291bnQpICsgJyZjb3VudD0nICsgcmVzLl9jb3VudFxyXG5cdFx0XHR9O1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0ZnVuY3Rpb24gZW1wdHkobywgaGVhZGVycykge1xyXG5cdFx0aWYgKEpTT04uc3RyaW5naWZ5KG8pID09PSAne30nICYmIGhlYWRlcnMuc3RhdHVzQ29kZSA9PT0gMjAwKSB7XHJcblx0XHRcdG8uc3VjY2VzcyA9IHRydWU7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRmdW5jdGlvbiBmb3JtYXRRdWVyeShxcykge1xyXG5cdFx0Ly8gTGlua2VkSW4gc2lnbnMgcmVxdWVzdHMgd2l0aCB0aGUgcGFyYW1ldGVyICdvYXV0aDJfYWNjZXNzX3Rva2VuJ1xyXG5cdFx0Ly8gLi4uIHllYWggYW5vdGhlciBvbmUgd2hvIHRoaW5rcyB0aGV5IHNob3VsZCBiZSBkaWZmZXJlbnQhXHJcblx0XHRpZiAocXMuYWNjZXNzX3Rva2VuKSB7XHJcblx0XHRcdHFzLm9hdXRoMl9hY2Nlc3NfdG9rZW4gPSBxcy5hY2Nlc3NfdG9rZW47XHJcblx0XHRcdGRlbGV0ZSBxcy5hY2Nlc3NfdG9rZW47XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRmdW5jdGlvbiBsaWtlKHAsIGNhbGxiYWNrKSB7XHJcblx0XHRwLmhlYWRlcnNbJ3gtbGktZm9ybWF0J10gPSAnanNvbic7XHJcblx0XHR2YXIgaWQgPSBwLmRhdGEuaWQ7XHJcblx0XHRwLmRhdGEgPSAocC5tZXRob2QgIT09ICdkZWxldGUnKS50b1N0cmluZygpO1xyXG5cdFx0cC5tZXRob2QgPSAncHV0JztcclxuXHRcdGNhbGxiYWNrKCdwZW9wbGUvfi9uZXR3b3JrL3VwZGF0ZXMva2V5PScgKyBpZCArICcvaXMtbGlrZWQnKTtcclxuXHR9XHJcblxyXG59KShoZWxsbyk7XHJcblxyXG4vLyBTZWU6IGh0dHBzOi8vZGV2ZWxvcGVycy5zb3VuZGNsb3VkLmNvbS9kb2NzL2FwaS9yZWZlcmVuY2VcclxuKGZ1bmN0aW9uKGhlbGxvKSB7XHJcblxyXG5cdGhlbGxvLmluaXQoe1xyXG5cclxuXHRcdHNvdW5kY2xvdWQ6IHtcclxuXHRcdFx0bmFtZTogJ1NvdW5kQ2xvdWQnLFxyXG5cclxuXHRcdFx0b2F1dGg6IHtcclxuXHRcdFx0XHR2ZXJzaW9uOiAyLFxyXG5cdFx0XHRcdGF1dGg6ICdodHRwczovL3NvdW5kY2xvdWQuY29tL2Nvbm5lY3QnLFxyXG5cdFx0XHRcdGdyYW50OiAnaHR0cHM6Ly9zb3VuZGNsb3VkLmNvbS9vYXV0aDIvdG9rZW4nXHJcblx0XHRcdH0sXHJcblxyXG5cdFx0XHQvLyBSZXF1ZXN0IHBhdGggdHJhbnNsYXRlZFxyXG5cdFx0XHRiYXNlOiAnaHR0cHM6Ly9hcGkuc291bmRjbG91ZC5jb20vJyxcclxuXHRcdFx0Z2V0OiB7XHJcblx0XHRcdFx0bWU6ICdtZS5qc29uJyxcclxuXHJcblx0XHRcdFx0Ly8gSHR0cDovL2RldmVsb3BlcnMuc291bmRjbG91ZC5jb20vZG9jcy9hcGkvcmVmZXJlbmNlI21lXHJcblx0XHRcdFx0J21lL2ZyaWVuZHMnOiAnbWUvZm9sbG93aW5ncy5qc29uJyxcclxuXHRcdFx0XHQnbWUvZm9sbG93ZXJzJzogJ21lL2ZvbGxvd2Vycy5qc29uJyxcclxuXHRcdFx0XHQnbWUvZm9sbG93aW5nJzogJ21lL2ZvbGxvd2luZ3MuanNvbicsXHJcblxyXG5cdFx0XHRcdC8vIFNlZTogaHR0cDovL2RldmVsb3BlcnMuc291bmRjbG91ZC5jb20vZG9jcy9hcGkvcmVmZXJlbmNlI2FjdGl2aXRpZXNcclxuXHRcdFx0XHQnZGVmYXVsdCc6IGZ1bmN0aW9uKHAsIGNhbGxiYWNrKSB7XHJcblxyXG5cdFx0XHRcdFx0Ly8gSW5jbHVkZSAnLmpzb24gYXQgdGhlIGVuZCBvZiBlYWNoIHJlcXVlc3QnXHJcblx0XHRcdFx0XHRjYWxsYmFjayhwLnBhdGggKyAnLmpzb24nKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0sXHJcblxyXG5cdFx0XHQvLyBSZXNwb25zZSBoYW5kbGVyc1xyXG5cdFx0XHR3cmFwOiB7XHJcblx0XHRcdFx0bWU6IGZ1bmN0aW9uKG8pIHtcclxuXHRcdFx0XHRcdGZvcm1hdFVzZXIobyk7XHJcblx0XHRcdFx0XHRyZXR1cm4gbztcclxuXHRcdFx0XHR9LFxyXG5cclxuXHRcdFx0XHQnZGVmYXVsdCc6IGZ1bmN0aW9uKG8pIHtcclxuXHRcdFx0XHRcdGlmIChBcnJheS5pc0FycmF5KG8pKSB7XHJcblx0XHRcdFx0XHRcdG8gPSB7XHJcblx0XHRcdFx0XHRcdFx0ZGF0YTogby5tYXAoZm9ybWF0VXNlcilcclxuXHRcdFx0XHRcdFx0fTtcclxuXHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHRwYWdpbmcobyk7XHJcblx0XHRcdFx0XHRyZXR1cm4gbztcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0sXHJcblxyXG5cdFx0XHR4aHI6IGZvcm1hdFJlcXVlc3QsXHJcblx0XHRcdGpzb25wOiBmb3JtYXRSZXF1ZXN0XHJcblx0XHR9XHJcblx0fSk7XHJcblxyXG5cdGZ1bmN0aW9uIGZvcm1hdFJlcXVlc3QocCwgcXMpIHtcclxuXHRcdC8vIEFsdGVyIHRoZSBxdWVyeXN0cmluZ1xyXG5cdFx0dmFyIHRva2VuID0gcXMuYWNjZXNzX3Rva2VuO1xyXG5cdFx0ZGVsZXRlIHFzLmFjY2Vzc190b2tlbjtcclxuXHRcdHFzLm9hdXRoX3Rva2VuID0gdG9rZW47XHJcblx0XHRxc1snX3N0YXR1c19jb2RlX21hcFszMDJdJ10gPSAyMDA7XHJcblx0XHRyZXR1cm4gdHJ1ZTtcclxuXHR9XHJcblxyXG5cdGZ1bmN0aW9uIGZvcm1hdFVzZXIobykge1xyXG5cdFx0aWYgKG8uaWQpIHtcclxuXHRcdFx0by5waWN0dXJlID0gby5hdmF0YXJfdXJsO1xyXG5cdFx0XHRvLnRodW1ibmFpbCA9IG8uYXZhdGFyX3VybDtcclxuXHRcdFx0by5uYW1lID0gby51c2VybmFtZSB8fCBvLmZ1bGxfbmFtZTtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gbztcclxuXHR9XHJcblxyXG5cdC8vIFNlZTogaHR0cDovL2RldmVsb3BlcnMuc291bmRjbG91ZC5jb20vZG9jcy9hcGkvcmVmZXJlbmNlI2FjdGl2aXRpZXNcclxuXHRmdW5jdGlvbiBwYWdpbmcocmVzKSB7XHJcblx0XHRpZiAoJ25leHRfaHJlZicgaW4gcmVzKSB7XHJcblx0XHRcdHJlcy5wYWdpbmcgPSB7XHJcblx0XHRcdFx0bmV4dDogcmVzLm5leHRfaHJlZlxyXG5cdFx0XHR9O1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcbn0pKGhlbGxvKTtcclxuXHJcbihmdW5jdGlvbihoZWxsbykge1xyXG5cclxuXHR2YXIgYmFzZSA9ICdodHRwczovL2FwaS50d2l0dGVyLmNvbS8nO1xyXG5cclxuXHRoZWxsby5pbml0KHtcclxuXHJcblx0XHR0d2l0dGVyOiB7XHJcblxyXG5cdFx0XHQvLyBFbnN1cmUgdGhhdCB5b3UgZGVmaW5lIGFuIG9hdXRoX3Byb3h5XHJcblx0XHRcdG9hdXRoOiB7XHJcblx0XHRcdFx0dmVyc2lvbjogJzEuMGEnLFxyXG5cdFx0XHRcdGF1dGg6IGJhc2UgKyAnb2F1dGgvYXV0aGVudGljYXRlJyxcclxuXHRcdFx0XHRyZXF1ZXN0OiBiYXNlICsgJ29hdXRoL3JlcXVlc3RfdG9rZW4nLFxyXG5cdFx0XHRcdHRva2VuOiBiYXNlICsgJ29hdXRoL2FjY2Vzc190b2tlbidcclxuXHRcdFx0fSxcclxuXHJcblx0XHRcdGxvZ2luOiBmdW5jdGlvbihwKSB7XHJcblx0XHRcdFx0Ly8gUmVhdXRoZW50aWNhdGVcclxuXHRcdFx0XHQvLyBodHRwczovL2Rldi50d2l0dGVyLmNvbS9vYXV0aC9yZWZlcmVuY2UvZ2V0L29hdXRoL2F1dGhlbnRpY2F0ZVxyXG5cdFx0XHRcdHZhciBwcmVmaXggPSAnP2ZvcmNlX2xvZ2luPXRydWUnO1xyXG5cdFx0XHRcdHRoaXMub2F1dGguYXV0aCA9IHRoaXMub2F1dGguYXV0aC5yZXBsYWNlKHByZWZpeCwgJycpICsgKHAub3B0aW9ucy5mb3JjZSA/IHByZWZpeCA6ICcnKTtcclxuXHRcdFx0fSxcclxuXHJcblx0XHRcdGJhc2U6IGJhc2UgKyAnMS4xLycsXHJcblxyXG5cdFx0XHRnZXQ6IHtcclxuXHRcdFx0XHRtZTogJ2FjY291bnQvdmVyaWZ5X2NyZWRlbnRpYWxzLmpzb24nLFxyXG5cdFx0XHRcdCdtZS9mcmllbmRzJzogJ2ZyaWVuZHMvbGlzdC5qc29uP2NvdW50PUB7bGltaXR8MjAwfScsXHJcblx0XHRcdFx0J21lL2ZvbGxvd2luZyc6ICdmcmllbmRzL2xpc3QuanNvbj9jb3VudD1Ae2xpbWl0fDIwMH0nLFxyXG5cdFx0XHRcdCdtZS9mb2xsb3dlcnMnOiAnZm9sbG93ZXJzL2xpc3QuanNvbj9jb3VudD1Ae2xpbWl0fDIwMH0nLFxyXG5cclxuXHRcdFx0XHQvLyBIdHRwczovL2Rldi50d2l0dGVyLmNvbS9kb2NzL2FwaS8xLjEvZ2V0L3N0YXR1c2VzL3VzZXJfdGltZWxpbmVcclxuXHRcdFx0XHQnbWUvc2hhcmUnOiAnc3RhdHVzZXMvdXNlcl90aW1lbGluZS5qc29uP2NvdW50PUB7bGltaXR8MjAwfScsXHJcblxyXG5cdFx0XHRcdC8vIEh0dHBzOi8vZGV2LnR3aXR0ZXIuY29tL3Jlc3QvcmVmZXJlbmNlL2dldC9mYXZvcml0ZXMvbGlzdFxyXG5cdFx0XHRcdCdtZS9saWtlJzogJ2Zhdm9yaXRlcy9saXN0Lmpzb24/Y291bnQ9QHtsaW1pdHwyMDB9J1xyXG5cdFx0XHR9LFxyXG5cclxuXHRcdFx0cG9zdDoge1xyXG5cdFx0XHRcdCdtZS9zaGFyZSc6IGZ1bmN0aW9uKHAsIGNhbGxiYWNrKSB7XHJcblxyXG5cdFx0XHRcdFx0dmFyIGRhdGEgPSBwLmRhdGE7XHJcblx0XHRcdFx0XHRwLmRhdGEgPSBudWxsO1xyXG5cclxuXHRcdFx0XHRcdHZhciBzdGF0dXMgPSBbXTtcclxuXHJcblx0XHRcdFx0XHQvLyBDaGFuZ2UgbWVzc2FnZSB0byBzdGF0dXNcclxuXHRcdFx0XHRcdGlmIChkYXRhLm1lc3NhZ2UpIHtcclxuXHRcdFx0XHRcdFx0c3RhdHVzLnB1c2goZGF0YS5tZXNzYWdlKTtcclxuXHRcdFx0XHRcdFx0ZGVsZXRlIGRhdGEubWVzc2FnZTtcclxuXHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHQvLyBJZiBsaW5rIGlzIGdpdmVuXHJcblx0XHRcdFx0XHRpZiAoZGF0YS5saW5rKSB7XHJcblx0XHRcdFx0XHRcdHN0YXR1cy5wdXNoKGRhdGEubGluayk7XHJcblx0XHRcdFx0XHRcdGRlbGV0ZSBkYXRhLmxpbms7XHJcblx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0aWYgKGRhdGEucGljdHVyZSkge1xyXG5cdFx0XHRcdFx0XHRzdGF0dXMucHVzaChkYXRhLnBpY3R1cmUpO1xyXG5cdFx0XHRcdFx0XHRkZWxldGUgZGF0YS5waWN0dXJlO1xyXG5cdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdC8vIENvbXBvdW5kIGFsbCB0aGUgY29tcG9uZW50c1xyXG5cdFx0XHRcdFx0aWYgKHN0YXR1cy5sZW5ndGgpIHtcclxuXHRcdFx0XHRcdFx0ZGF0YS5zdGF0dXMgPSBzdGF0dXMuam9pbignICcpO1xyXG5cdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdC8vIFR3ZWV0IG1lZGlhXHJcblx0XHRcdFx0XHRpZiAoZGF0YS5maWxlKSB7XHJcblx0XHRcdFx0XHRcdGRhdGFbJ21lZGlhW10nXSA9IGRhdGEuZmlsZTtcclxuXHRcdFx0XHRcdFx0ZGVsZXRlIGRhdGEuZmlsZTtcclxuXHRcdFx0XHRcdFx0cC5kYXRhID0gZGF0YTtcclxuXHRcdFx0XHRcdFx0Y2FsbGJhY2soJ3N0YXR1c2VzL3VwZGF0ZV93aXRoX21lZGlhLmpzb24nKTtcclxuXHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHQvLyBSZXR3ZWV0P1xyXG5cdFx0XHRcdFx0ZWxzZSBpZiAoJ2lkJyBpbiBkYXRhKSB7XHJcblx0XHRcdFx0XHRcdGNhbGxiYWNrKCdzdGF0dXNlcy9yZXR3ZWV0LycgKyBkYXRhLmlkICsgJy5qc29uJyk7XHJcblx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0Ly8gVHdlZXRcclxuXHRcdFx0XHRcdGVsc2Uge1xyXG5cdFx0XHRcdFx0XHQvLyBBc3NpZ24gdGhlIHBvc3QgYm9keSB0byB0aGUgcXVlcnkgcGFyYW1ldGVyc1xyXG5cdFx0XHRcdFx0XHRoZWxsby51dGlscy5leHRlbmQocC5xdWVyeSwgZGF0YSk7XHJcblx0XHRcdFx0XHRcdGNhbGxiYWNrKCdzdGF0dXNlcy91cGRhdGUuanNvbj9pbmNsdWRlX2VudGl0aWVzPTEnKTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9LFxyXG5cclxuXHRcdFx0XHQvLyBTZWU6IGh0dHBzOi8vZGV2LnR3aXR0ZXIuY29tL3Jlc3QvcmVmZXJlbmNlL3Bvc3QvZmF2b3JpdGVzL2NyZWF0ZVxyXG5cdFx0XHRcdCdtZS9saWtlJzogZnVuY3Rpb24ocCwgY2FsbGJhY2spIHtcclxuXHRcdFx0XHRcdHZhciBpZCA9IHAuZGF0YS5pZDtcclxuXHRcdFx0XHRcdHAuZGF0YSA9IG51bGw7XHJcblx0XHRcdFx0XHRjYWxsYmFjaygnZmF2b3JpdGVzL2NyZWF0ZS5qc29uP2lkPScgKyBpZCk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9LFxyXG5cclxuXHRcdFx0ZGVsOiB7XHJcblxyXG5cdFx0XHRcdC8vIFNlZTogaHR0cHM6Ly9kZXYudHdpdHRlci5jb20vcmVzdC9yZWZlcmVuY2UvcG9zdC9mYXZvcml0ZXMvZGVzdHJveVxyXG5cdFx0XHRcdCdtZS9saWtlJzogZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0XHRwLm1ldGhvZCA9ICdwb3N0JztcclxuXHRcdFx0XHRcdHZhciBpZCA9IHAuZGF0YS5pZDtcclxuXHRcdFx0XHRcdHAuZGF0YSA9IG51bGw7XHJcblx0XHRcdFx0XHRjYWxsYmFjaygnZmF2b3JpdGVzL2Rlc3Ryb3kuanNvbj9pZD0nICsgaWQpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSxcclxuXHJcblx0XHRcdHdyYXA6IHtcclxuXHRcdFx0XHRtZTogZnVuY3Rpb24ocmVzKSB7XHJcblx0XHRcdFx0XHRmb3JtYXRFcnJvcihyZXMpO1xyXG5cdFx0XHRcdFx0Zm9ybWF0VXNlcihyZXMpO1xyXG5cdFx0XHRcdFx0cmV0dXJuIHJlcztcclxuXHRcdFx0XHR9LFxyXG5cclxuXHRcdFx0XHQnbWUvZnJpZW5kcyc6IGZvcm1hdEZyaWVuZHMsXHJcblx0XHRcdFx0J21lL2ZvbGxvd2Vycyc6IGZvcm1hdEZyaWVuZHMsXHJcblx0XHRcdFx0J21lL2ZvbGxvd2luZyc6IGZvcm1hdEZyaWVuZHMsXHJcblxyXG5cdFx0XHRcdCdtZS9zaGFyZSc6IGZ1bmN0aW9uKHJlcykge1xyXG5cdFx0XHRcdFx0Zm9ybWF0RXJyb3IocmVzKTtcclxuXHRcdFx0XHRcdHBhZ2luZyhyZXMpO1xyXG5cdFx0XHRcdFx0aWYgKCFyZXMuZXJyb3IgJiYgJ2xlbmd0aCcgaW4gcmVzKSB7XHJcblx0XHRcdFx0XHRcdHJldHVybiB7ZGF0YTogcmVzfTtcclxuXHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHRyZXR1cm4gcmVzO1xyXG5cdFx0XHRcdH0sXHJcblxyXG5cdFx0XHRcdCdkZWZhdWx0JzogZnVuY3Rpb24ocmVzKSB7XHJcblx0XHRcdFx0XHRyZXMgPSBhcnJheVRvRGF0YVJlc3BvbnNlKHJlcyk7XHJcblx0XHRcdFx0XHRwYWdpbmcocmVzKTtcclxuXHRcdFx0XHRcdHJldHVybiByZXM7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9LFxyXG5cdFx0XHR4aHI6IGZ1bmN0aW9uKHApIHtcclxuXHJcblx0XHRcdFx0Ly8gUmVseSBvbiB0aGUgcHJveHkgZm9yIG5vbi1HRVQgcmVxdWVzdHMuXHJcblx0XHRcdFx0cmV0dXJuIChwLm1ldGhvZCAhPT0gJ2dldCcpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fSk7XHJcblxyXG5cdGZ1bmN0aW9uIGZvcm1hdFVzZXIobykge1xyXG5cdFx0aWYgKG8uaWQpIHtcclxuXHRcdFx0aWYgKG8ubmFtZSkge1xyXG5cdFx0XHRcdHZhciBtID0gby5uYW1lLnNwbGl0KCcgJyk7XHJcblx0XHRcdFx0by5maXJzdF9uYW1lID0gbS5zaGlmdCgpO1xyXG5cdFx0XHRcdG8ubGFzdF9uYW1lID0gbS5qb2luKCcgJyk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdC8vIFNlZTogaHR0cHM6Ly9kZXYudHdpdHRlci5jb20vb3ZlcnZpZXcvZ2VuZXJhbC91c2VyLXByb2ZpbGUtaW1hZ2VzLWFuZC1iYW5uZXJzXHJcblx0XHRcdG8udGh1bWJuYWlsID0gby5wcm9maWxlX2ltYWdlX3VybF9odHRwcyB8fCBvLnByb2ZpbGVfaW1hZ2VfdXJsO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBvO1xyXG5cdH1cclxuXHJcblx0ZnVuY3Rpb24gZm9ybWF0RnJpZW5kcyhvKSB7XHJcblx0XHRmb3JtYXRFcnJvcihvKTtcclxuXHRcdHBhZ2luZyhvKTtcclxuXHRcdGlmIChvLnVzZXJzKSB7XHJcblx0XHRcdG8uZGF0YSA9IG8udXNlcnMubWFwKGZvcm1hdFVzZXIpO1xyXG5cdFx0XHRkZWxldGUgby51c2VycztcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gbztcclxuXHR9XHJcblxyXG5cdGZ1bmN0aW9uIGZvcm1hdEVycm9yKG8pIHtcclxuXHRcdGlmIChvLmVycm9ycykge1xyXG5cdFx0XHR2YXIgZSA9IG8uZXJyb3JzWzBdO1xyXG5cdFx0XHRvLmVycm9yID0ge1xyXG5cdFx0XHRcdGNvZGU6ICdyZXF1ZXN0X2ZhaWxlZCcsXHJcblx0XHRcdFx0bWVzc2FnZTogZS5tZXNzYWdlXHJcblx0XHRcdH07XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHQvLyBUYWtlIGEgY3Vyc29yIGFuZCBhZGQgaXQgdG8gdGhlIHBhdGhcclxuXHRmdW5jdGlvbiBwYWdpbmcocmVzKSB7XHJcblx0XHQvLyBEb2VzIHRoZSByZXNwb25zZSBpbmNsdWRlIGEgJ25leHRfY3Vyc29yX3N0cmluZydcclxuXHRcdGlmICgnbmV4dF9jdXJzb3Jfc3RyJyBpbiByZXMpIHtcclxuXHRcdFx0Ly8gU2VlOiBodHRwczovL2Rldi50d2l0dGVyLmNvbS9kb2NzL21pc2MvY3Vyc29yaW5nXHJcblx0XHRcdHJlcy5wYWdpbmcgPSB7XHJcblx0XHRcdFx0bmV4dDogJz9jdXJzb3I9JyArIHJlcy5uZXh0X2N1cnNvcl9zdHJcclxuXHRcdFx0fTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGZ1bmN0aW9uIGFycmF5VG9EYXRhUmVzcG9uc2UocmVzKSB7XHJcblx0XHRyZXR1cm4gQXJyYXkuaXNBcnJheShyZXMpID8ge2RhdGE6IHJlc30gOiByZXM7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQvLyBUaGUgZG9jdW1lbnRhdGlvbiBzYXlzIHRvIGRlZmluZSB1c2VyIGluIHRoZSByZXF1ZXN0XHJcblx0Ly8gQWx0aG91Z2ggaXRzIG5vdCBhY3R1YWxseSByZXF1aXJlZC5cclxuXHJcblx0dmFyIHVzZXJfaWQ7XHJcblxyXG5cdGZ1bmN0aW9uIHdpdGhVc2VySWQoY2FsbGJhY2spe1xyXG5cdFx0aWYodXNlcl9pZCl7XHJcblx0XHRcdGNhbGxiYWNrKHVzZXJfaWQpO1xyXG5cdFx0fVxyXG5cdFx0ZWxzZXtcclxuXHRcdFx0aGVsbG8uYXBpKCd0d2l0dGVyOi9tZScsIGZ1bmN0aW9uKG8pe1xyXG5cdFx0XHRcdHVzZXJfaWQgPSBvLmlkO1xyXG5cdFx0XHRcdGNhbGxiYWNrKG8uaWQpO1xyXG5cdFx0XHR9KTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGZ1bmN0aW9uIHNpZ24odXJsKXtcclxuXHRcdHJldHVybiBmdW5jdGlvbihwLCBjYWxsYmFjayl7XHJcblx0XHRcdHdpdGhVc2VySWQoZnVuY3Rpb24odXNlcl9pZCl7XHJcblx0XHRcdFx0Y2FsbGJhY2sodXJsKyc/dXNlcl9pZD0nK3VzZXJfaWQpO1xyXG5cdFx0XHR9KTtcclxuXHRcdH07XHJcblx0fVxyXG5cdCovXHJcblxyXG59KShoZWxsbyk7XHJcblxyXG4vLyBWa29udGFrdGUgKHZrLmNvbSlcclxuKGZ1bmN0aW9uKGhlbGxvKSB7XHJcblxyXG5cdGhlbGxvLmluaXQoe1xyXG5cclxuXHRcdHZrOiB7XHJcblx0XHRcdG5hbWU6ICdWaycsXHJcblxyXG5cdFx0XHQvLyBTZWUgaHR0cHM6Ly92ay5jb20vZGV2L29hdXRoX2RpYWxvZ1xyXG5cdFx0XHRvYXV0aDoge1xyXG5cdFx0XHRcdHZlcnNpb246IDIsXHJcblx0XHRcdFx0YXV0aDogJ2h0dHBzOi8vb2F1dGgudmsuY29tL2F1dGhvcml6ZScsXHJcblx0XHRcdFx0Z3JhbnQ6ICdodHRwczovL29hdXRoLnZrLmNvbS9hY2Nlc3NfdG9rZW4nXHJcblx0XHRcdH0sXHJcblxyXG5cdFx0XHQvLyBBdXRob3JpemF0aW9uIHNjb3Blc1xyXG5cdFx0XHQvLyBTZWUgaHR0cHM6Ly92ay5jb20vZGV2L3Blcm1pc3Npb25zXHJcblx0XHRcdHNjb3BlOiB7XHJcblx0XHRcdFx0ZW1haWw6ICdlbWFpbCcsXHJcblx0XHRcdFx0ZnJpZW5kczogJ2ZyaWVuZHMnLFxyXG5cdFx0XHRcdHBob3RvczogJ3Bob3RvcycsXHJcblx0XHRcdFx0dmlkZW9zOiAndmlkZW8nLFxyXG5cdFx0XHRcdHNoYXJlOiAnc2hhcmUnLFxyXG5cdFx0XHRcdG9mZmxpbmVfYWNjZXNzOiAnb2ZmbGluZSdcclxuXHRcdFx0fSxcclxuXHJcblx0XHRcdC8vIFJlZnJlc2ggdGhlIGFjY2Vzc190b2tlblxyXG5cdFx0XHRyZWZyZXNoOiB0cnVlLFxyXG5cclxuXHRcdFx0bG9naW46IGZ1bmN0aW9uKHApIHtcclxuXHRcdFx0XHRwLnFzLmRpc3BsYXkgPSB3aW5kb3cubmF2aWdhdG9yICYmXHJcblx0XHRcdFx0XHR3aW5kb3cubmF2aWdhdG9yLnVzZXJBZ2VudCAmJlxyXG5cdFx0XHRcdFx0L2lwYWR8cGhvbmV8cGhvbmV8YW5kcm9pZC8udGVzdCh3aW5kb3cubmF2aWdhdG9yLnVzZXJBZ2VudC50b0xvd2VyQ2FzZSgpKSA/ICdtb2JpbGUnIDogJ3BvcHVwJztcclxuXHRcdFx0fSxcclxuXHJcblx0XHRcdC8vIEFQSSBCYXNlIFVSTFxyXG5cdFx0XHRiYXNlOiAnaHR0cHM6Ly9hcGkudmsuY29tL21ldGhvZC8nLFxyXG5cclxuXHRcdFx0Ly8gTWFwIEdFVCByZXF1ZXN0c1xyXG5cdFx0XHRnZXQ6IHtcclxuXHRcdFx0XHRtZTogZnVuY3Rpb24ocCwgY2FsbGJhY2spIHtcclxuXHRcdFx0XHRcdHAucXVlcnkuZmllbGRzID0gJ2lkLGZpcnN0X25hbWUsbGFzdF9uYW1lLHBob3RvX21heCc7XHJcblx0XHRcdFx0XHRjYWxsYmFjaygndXNlcnMuZ2V0Jyk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9LFxyXG5cclxuXHRcdFx0d3JhcDoge1xyXG5cdFx0XHRcdG1lOiBmdW5jdGlvbihyZXMsIGhlYWRlcnMsIHJlcSkge1xyXG5cdFx0XHRcdFx0Zm9ybWF0RXJyb3IocmVzKTtcclxuXHRcdFx0XHRcdHJldHVybiBmb3JtYXRVc2VyKHJlcywgcmVxKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0sXHJcblxyXG5cdFx0XHQvLyBObyBYSFJcclxuXHRcdFx0eGhyOiBmYWxzZSxcclxuXHJcblx0XHRcdC8vIEFsbCByZXF1ZXN0cyBzaG91bGQgYmUgSlNPTlAgYXMgb2YgbWlzc2luZyBDT1JTIGhlYWRlcnMgaW4gaHR0cHM6Ly9hcGkudmsuY29tL21ldGhvZC8qXHJcblx0XHRcdGpzb25wOiB0cnVlLFxyXG5cclxuXHRcdFx0Ly8gTm8gZm9ybVxyXG5cdFx0XHRmb3JtOiBmYWxzZVxyXG5cdFx0fVxyXG5cdH0pO1xyXG5cclxuXHRmdW5jdGlvbiBmb3JtYXRVc2VyKG8sIHJlcSkge1xyXG5cclxuXHRcdGlmIChvICE9PSBudWxsICYmICdyZXNwb25zZScgaW4gbyAmJiBvLnJlc3BvbnNlICE9PSBudWxsICYmIG8ucmVzcG9uc2UubGVuZ3RoKSB7XHJcblx0XHRcdG8gPSBvLnJlc3BvbnNlWzBdO1xyXG5cdFx0XHRvLmlkID0gby51aWQ7XHJcblx0XHRcdG8udGh1bWJuYWlsID0gby5waWN0dXJlID0gby5waG90b19tYXg7XHJcblx0XHRcdG8ubmFtZSA9IG8uZmlyc3RfbmFtZSArICcgJyArIG8ubGFzdF9uYW1lO1xyXG5cclxuXHRcdFx0aWYgKHJlcS5hdXRoUmVzcG9uc2UgJiYgcmVxLmF1dGhSZXNwb25zZS5lbWFpbCAhPT0gbnVsbClcclxuXHRcdFx0XHRvLmVtYWlsID0gcmVxLmF1dGhSZXNwb25zZS5lbWFpbDtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gbztcclxuXHR9XHJcblxyXG5cdGZ1bmN0aW9uIGZvcm1hdEVycm9yKG8pIHtcclxuXHJcblx0XHRpZiAoby5lcnJvcikge1xyXG5cdFx0XHR2YXIgZSA9IG8uZXJyb3I7XHJcblx0XHRcdG8uZXJyb3IgPSB7XHJcblx0XHRcdFx0Y29kZTogZS5lcnJvcl9jb2RlLFxyXG5cdFx0XHRcdG1lc3NhZ2U6IGUuZXJyb3JfbXNnXHJcblx0XHRcdH07XHJcblx0XHR9XHJcblx0fVxyXG5cclxufSkoaGVsbG8pO1xyXG5cclxuKGZ1bmN0aW9uKGhlbGxvKSB7XHJcblxyXG5cdGhlbGxvLmluaXQoe1xyXG5cdFx0d2luZG93czoge1xyXG5cdFx0XHRuYW1lOiAnV2luZG93cyBsaXZlJyxcclxuXHJcblx0XHRcdC8vIFJFRjogaHR0cDovL21zZG4ubWljcm9zb2Z0LmNvbS9lbi11cy9saWJyYXJ5L2hoMjQzNjQxLmFzcHhcclxuXHRcdFx0b2F1dGg6IHtcclxuXHRcdFx0XHR2ZXJzaW9uOiAyLFxyXG5cdFx0XHRcdGF1dGg6ICdodHRwczovL2xvZ2luLmxpdmUuY29tL29hdXRoMjBfYXV0aG9yaXplLnNyZicsXHJcblx0XHRcdFx0Z3JhbnQ6ICdodHRwczovL2xvZ2luLmxpdmUuY29tL29hdXRoMjBfdG9rZW4uc3JmJ1xyXG5cdFx0XHR9LFxyXG5cclxuXHRcdFx0Ly8gUmVmcmVzaCB0aGUgYWNjZXNzX3Rva2VuIG9uY2UgZXhwaXJlZFxyXG5cdFx0XHRyZWZyZXNoOiB0cnVlLFxyXG5cclxuXHRcdFx0bG9nb3V0OiBmdW5jdGlvbigpIHtcclxuXHRcdFx0XHRyZXR1cm4gJ2h0dHA6Ly9sb2dpbi5saXZlLmNvbS9vYXV0aDIwX2xvZ291dC5zcmY/dHM9JyArIChuZXcgRGF0ZSgpKS5nZXRUaW1lKCk7XHJcblx0XHRcdH0sXHJcblxyXG5cdFx0XHQvLyBBdXRob3JpemF0aW9uIHNjb3Blc1xyXG5cdFx0XHRzY29wZToge1xyXG5cdFx0XHRcdGJhc2ljOiAnd2wuc2lnbmluLHdsLmJhc2ljJyxcclxuXHRcdFx0XHRlbWFpbDogJ3dsLmVtYWlscycsXHJcblx0XHRcdFx0YmlydGhkYXk6ICd3bC5iaXJ0aGRheScsXHJcblx0XHRcdFx0ZXZlbnRzOiAnd2wuY2FsZW5kYXJzJyxcclxuXHRcdFx0XHRwaG90b3M6ICd3bC5waG90b3MnLFxyXG5cdFx0XHRcdHZpZGVvczogJ3dsLnBob3RvcycsXHJcblx0XHRcdFx0ZnJpZW5kczogJ3dsLmNvbnRhY3RzX2VtYWlscycsXHJcblx0XHRcdFx0ZmlsZXM6ICd3bC5za3lkcml2ZScsXHJcblx0XHRcdFx0cHVibGlzaDogJ3dsLnNoYXJlJyxcclxuXHRcdFx0XHRwdWJsaXNoX2ZpbGVzOiAnd2wuc2t5ZHJpdmVfdXBkYXRlJyxcclxuXHRcdFx0XHRzaGFyZTogJ3dsLnNoYXJlJyxcclxuXHRcdFx0XHRjcmVhdGVfZXZlbnQ6ICd3bC5jYWxlbmRhcnNfdXBkYXRlLHdsLmV2ZW50c19jcmVhdGUnLFxyXG5cdFx0XHRcdG9mZmxpbmVfYWNjZXNzOiAnd2wub2ZmbGluZV9hY2Nlc3MnXHJcblx0XHRcdH0sXHJcblxyXG5cdFx0XHQvLyBBUEkgYmFzZSBVUkxcclxuXHRcdFx0YmFzZTogJ2h0dHBzOi8vYXBpcy5saXZlLm5ldC92NS4wLycsXHJcblxyXG5cdFx0XHQvLyBNYXAgR0VUIHJlcXVlc3RzXHJcblx0XHRcdGdldDoge1xyXG5cclxuXHRcdFx0XHQvLyBGcmllbmRzXHJcblx0XHRcdFx0bWU6ICdtZScsXHJcblx0XHRcdFx0J21lL2ZyaWVuZHMnOiAnbWUvZnJpZW5kcycsXHJcblx0XHRcdFx0J21lL2ZvbGxvd2luZyc6ICdtZS9jb250YWN0cycsXHJcblx0XHRcdFx0J21lL2ZvbGxvd2Vycyc6ICdtZS9mcmllbmRzJyxcclxuXHRcdFx0XHQnbWUvY29udGFjdHMnOiAnbWUvY29udGFjdHMnLFxyXG5cclxuXHRcdFx0XHQnbWUvYWxidW1zJzogJ21lL2FsYnVtcycsXHJcblxyXG5cdFx0XHRcdC8vIEluY2x1ZGUgdGhlIGRhdGFbaWRdIGluIHRoZSBwYXRoXHJcblx0XHRcdFx0J21lL2FsYnVtJzogJ0B7aWR9L2ZpbGVzJyxcclxuXHRcdFx0XHQnbWUvcGhvdG8nOiAnQHtpZH0nLFxyXG5cclxuXHRcdFx0XHQvLyBGaWxlc1xyXG5cdFx0XHRcdCdtZS9maWxlcyc6ICdAe3BhcmVudHxtZS9za3lkcml2ZX0vZmlsZXMnLFxyXG5cdFx0XHRcdCdtZS9mb2xkZXJzJzogJ0B7aWR8bWUvc2t5ZHJpdmV9L2ZpbGVzJyxcclxuXHRcdFx0XHQnbWUvZm9sZGVyJzogJ0B7aWR8bWUvc2t5ZHJpdmV9L2ZpbGVzJ1xyXG5cdFx0XHR9LFxyXG5cclxuXHRcdFx0Ly8gTWFwIFBPU1QgcmVxdWVzdHNcclxuXHRcdFx0cG9zdDoge1xyXG5cdFx0XHRcdCdtZS9hbGJ1bXMnOiAnbWUvYWxidW1zJyxcclxuXHRcdFx0XHQnbWUvYWxidW0nOiAnQHtpZH0vZmlsZXMvJyxcclxuXHJcblx0XHRcdFx0J21lL2ZvbGRlcnMnOiAnQHtpZHxtZS9za3lkcml2ZS99JyxcclxuXHRcdFx0XHQnbWUvZmlsZXMnOiAnQHtwYXJlbnR8bWUvc2t5ZHJpdmV9L2ZpbGVzJ1xyXG5cdFx0XHR9LFxyXG5cclxuXHRcdFx0Ly8gTWFwIERFTEVURSByZXF1ZXN0c1xyXG5cdFx0XHRkZWw6IHtcclxuXHRcdFx0XHQvLyBJbmNsdWRlIHRoZSBkYXRhW2lkXSBpbiB0aGUgcGF0aFxyXG5cdFx0XHRcdCdtZS9hbGJ1bSc6ICdAe2lkfScsXHJcblx0XHRcdFx0J21lL3Bob3RvJzogJ0B7aWR9JyxcclxuXHRcdFx0XHQnbWUvZm9sZGVyJzogJ0B7aWR9JyxcclxuXHRcdFx0XHQnbWUvZmlsZXMnOiAnQHtpZH0nXHJcblx0XHRcdH0sXHJcblxyXG5cdFx0XHR3cmFwOiB7XHJcblx0XHRcdFx0bWU6IGZvcm1hdFVzZXIsXHJcblxyXG5cdFx0XHRcdCdtZS9mcmllbmRzJzogZm9ybWF0RnJpZW5kcyxcclxuXHRcdFx0XHQnbWUvY29udGFjdHMnOiBmb3JtYXRGcmllbmRzLFxyXG5cdFx0XHRcdCdtZS9mb2xsb3dlcnMnOiBmb3JtYXRGcmllbmRzLFxyXG5cdFx0XHRcdCdtZS9mb2xsb3dpbmcnOiBmb3JtYXRGcmllbmRzLFxyXG5cdFx0XHRcdCdtZS9hbGJ1bXMnOiBmb3JtYXRBbGJ1bXMsXHJcblx0XHRcdFx0J21lL3Bob3Rvcyc6IGZvcm1hdERlZmF1bHQsXHJcblx0XHRcdFx0J2RlZmF1bHQnOiBmb3JtYXREZWZhdWx0XHJcblx0XHRcdH0sXHJcblxyXG5cdFx0XHR4aHI6IGZ1bmN0aW9uKHApIHtcclxuXHRcdFx0XHRpZiAocC5tZXRob2QgIT09ICdnZXQnICYmIHAubWV0aG9kICE9PSAnZGVsZXRlJyAmJiAhaGVsbG8udXRpbHMuaGFzQmluYXJ5KHAuZGF0YSkpIHtcclxuXHJcblx0XHRcdFx0XHQvLyBEb2VzIHRoaXMgaGF2ZSBhIGRhdGEtdXJpIHRvIHVwbG9hZCBhcyBhIGZpbGU/XHJcblx0XHRcdFx0XHRpZiAodHlwZW9mIChwLmRhdGEuZmlsZSkgPT09ICdzdHJpbmcnKSB7XHJcblx0XHRcdFx0XHRcdHAuZGF0YS5maWxlID0gaGVsbG8udXRpbHMudG9CbG9iKHAuZGF0YS5maWxlKTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdGVsc2Uge1xyXG5cdFx0XHRcdFx0XHRwLmRhdGEgPSBKU09OLnN0cmluZ2lmeShwLmRhdGEpO1xyXG5cdFx0XHRcdFx0XHRwLmhlYWRlcnMgPSB7XHJcblx0XHRcdFx0XHRcdFx0J0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ1xyXG5cdFx0XHRcdFx0XHR9O1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0cmV0dXJuIHRydWU7XHJcblx0XHRcdH0sXHJcblxyXG5cdFx0XHRqc29ucDogZnVuY3Rpb24ocCkge1xyXG5cdFx0XHRcdGlmIChwLm1ldGhvZCAhPT0gJ2dldCcgJiYgIWhlbGxvLnV0aWxzLmhhc0JpbmFyeShwLmRhdGEpKSB7XHJcblx0XHRcdFx0XHRwLmRhdGEubWV0aG9kID0gcC5tZXRob2Q7XHJcblx0XHRcdFx0XHRwLm1ldGhvZCA9ICdnZXQnO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH0pO1xyXG5cclxuXHRmdW5jdGlvbiBmb3JtYXREZWZhdWx0KG8pIHtcclxuXHRcdGlmICgnZGF0YScgaW4gbykge1xyXG5cdFx0XHRvLmRhdGEuZm9yRWFjaChmdW5jdGlvbihkKSB7XHJcblx0XHRcdFx0aWYgKGQucGljdHVyZSkge1xyXG5cdFx0XHRcdFx0ZC50aHVtYm5haWwgPSBkLnBpY3R1cmU7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRpZiAoZC5pbWFnZXMpIHtcclxuXHRcdFx0XHRcdGQucGljdHVyZXMgPSBkLmltYWdlc1xyXG5cdFx0XHRcdFx0XHQubWFwKGZvcm1hdEltYWdlKVxyXG5cdFx0XHRcdFx0XHQuc29ydChmdW5jdGlvbihhLCBiKSB7XHJcblx0XHRcdFx0XHRcdFx0cmV0dXJuIGEud2lkdGggLSBiLndpZHRoO1xyXG5cdFx0XHRcdFx0XHR9KTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0pO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBvO1xyXG5cdH1cclxuXHJcblx0ZnVuY3Rpb24gZm9ybWF0SW1hZ2UoaW1hZ2UpIHtcclxuXHRcdHJldHVybiB7XHJcblx0XHRcdHdpZHRoOiBpbWFnZS53aWR0aCxcclxuXHRcdFx0aGVpZ2h0OiBpbWFnZS5oZWlnaHQsXHJcblx0XHRcdHNvdXJjZTogaW1hZ2Uuc291cmNlXHJcblx0XHR9O1xyXG5cdH1cclxuXHJcblx0ZnVuY3Rpb24gZm9ybWF0QWxidW1zKG8pIHtcclxuXHRcdGlmICgnZGF0YScgaW4gbykge1xyXG5cdFx0XHRvLmRhdGEuZm9yRWFjaChmdW5jdGlvbihkKSB7XHJcblx0XHRcdFx0ZC5waG90b3MgPSBkLmZpbGVzID0gJ2h0dHBzOi8vYXBpcy5saXZlLm5ldC92NS4wLycgKyBkLmlkICsgJy9waG90b3MnO1xyXG5cdFx0XHR9KTtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gbztcclxuXHR9XHJcblxyXG5cdGZ1bmN0aW9uIGZvcm1hdFVzZXIobywgaGVhZGVycywgcmVxKSB7XHJcblx0XHRpZiAoby5pZCkge1xyXG5cdFx0XHR2YXIgdG9rZW4gPSByZXEucXVlcnkuYWNjZXNzX3Rva2VuO1xyXG5cdFx0XHRpZiAoby5lbWFpbHMpIHtcclxuXHRcdFx0XHRvLmVtYWlsID0gby5lbWFpbHMucHJlZmVycmVkO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQvLyBJZiB0aGlzIGlzIG5vdCBhbiBub24tbmV0d29yayBmcmllbmRcclxuXHRcdFx0aWYgKG8uaXNfZnJpZW5kICE9PSBmYWxzZSkge1xyXG5cdFx0XHRcdC8vIFVzZSB0aGUgaWQgb2YgdGhlIHVzZXJfaWQgaWYgYXZhaWxhYmxlXHJcblx0XHRcdFx0dmFyIGlkID0gKG8udXNlcl9pZCB8fCBvLmlkKTtcclxuXHRcdFx0XHRvLnRodW1ibmFpbCA9IG8ucGljdHVyZSA9ICdodHRwczovL2FwaXMubGl2ZS5uZXQvdjUuMC8nICsgaWQgKyAnL3BpY3R1cmU/YWNjZXNzX3Rva2VuPScgKyB0b2tlbjtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBvO1xyXG5cdH1cclxuXHJcblx0ZnVuY3Rpb24gZm9ybWF0RnJpZW5kcyhvLCBoZWFkZXJzLCByZXEpIHtcclxuXHRcdGlmICgnZGF0YScgaW4gbykge1xyXG5cdFx0XHRvLmRhdGEuZm9yRWFjaChmdW5jdGlvbihkKSB7XHJcblx0XHRcdFx0Zm9ybWF0VXNlcihkLCBoZWFkZXJzLCByZXEpO1xyXG5cdFx0XHR9KTtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gbztcclxuXHR9XHJcblxyXG59KShoZWxsbyk7XHJcblxyXG4oZnVuY3Rpb24oaGVsbG8pIHtcclxuXHJcblx0aGVsbG8uaW5pdCh7XHJcblxyXG5cdFx0eWFob286IHtcclxuXHJcblx0XHRcdC8vIEVuc3VyZSB0aGF0IHlvdSBkZWZpbmUgYW4gb2F1dGhfcHJveHlcclxuXHRcdFx0b2F1dGg6IHtcclxuXHRcdFx0XHR2ZXJzaW9uOiAnMS4wYScsXHJcblx0XHRcdFx0YXV0aDogJ2h0dHBzOi8vYXBpLmxvZ2luLnlhaG9vLmNvbS9vYXV0aC92Mi9yZXF1ZXN0X2F1dGgnLFxyXG5cdFx0XHRcdHJlcXVlc3Q6ICdodHRwczovL2FwaS5sb2dpbi55YWhvby5jb20vb2F1dGgvdjIvZ2V0X3JlcXVlc3RfdG9rZW4nLFxyXG5cdFx0XHRcdHRva2VuOiAnaHR0cHM6Ly9hcGkubG9naW4ueWFob28uY29tL29hdXRoL3YyL2dldF90b2tlbidcclxuXHRcdFx0fSxcclxuXHJcblx0XHRcdC8vIExvZ2luIGhhbmRsZXJcclxuXHRcdFx0bG9naW46IGZ1bmN0aW9uKHApIHtcclxuXHRcdFx0XHQvLyBDaGFuZ2UgdGhlIGRlZmF1bHQgcG9wdXAgd2luZG93IHRvIGJlIGF0IGxlYXN0IDU2MFxyXG5cdFx0XHRcdC8vIFlhaG9vIGRvZXMgZHluYW1pY2FsbHkgY2hhbmdlIGl0IG9uIHRoZSBmbHkgZm9yIHRoZSBzaWduaW4gc2NyZWVuIChvbmx5LCB3aGF0IGlmIHlvdXIgYWxyZWFkeSBzaWduZWQgaW4pXHJcblx0XHRcdFx0cC5vcHRpb25zLnBvcHVwLndpZHRoID0gNTYwO1xyXG5cclxuXHRcdFx0XHQvLyBZYWhvbyB0aHJvd3MgYW4gcGFyYW1ldGVyIGVycm9yIGlmIGZvciB3aGF0ZXZlciByZWFzb24gdGhlIHN0YXRlLnNjb3BlIGNvbnRhaW5zIGEgY29tbWEsIHNvIGxldHMgcmVtb3ZlIHNjb3BlXHJcblx0XHRcdFx0dHJ5IHtkZWxldGUgcC5xcy5zdGF0ZS5zY29wZTt9XHJcblx0XHRcdFx0Y2F0Y2ggKGUpIHt9XHJcblx0XHRcdH0sXHJcblxyXG5cdFx0XHRiYXNlOiAnaHR0cHM6Ly9zb2NpYWwueWFob29hcGlzLmNvbS92MS8nLFxyXG5cclxuXHRcdFx0Z2V0OiB7XHJcblx0XHRcdFx0bWU6IHlxbCgnc2VsZWN0ICogZnJvbSBzb2NpYWwucHJvZmlsZSgwKSB3aGVyZSBndWlkPW1lJyksXHJcblx0XHRcdFx0J21lL2ZyaWVuZHMnOiB5cWwoJ3NlbGVjdCAqIGZyb20gc29jaWFsLmNvbnRhY3RzKDApIHdoZXJlIGd1aWQ9bWUnKSxcclxuXHRcdFx0XHQnbWUvZm9sbG93aW5nJzogeXFsKCdzZWxlY3QgKiBmcm9tIHNvY2lhbC5jb250YWN0cygwKSB3aGVyZSBndWlkPW1lJylcclxuXHRcdFx0fSxcclxuXHRcdFx0d3JhcDoge1xyXG5cdFx0XHRcdG1lOiBmb3JtYXRVc2VyLFxyXG5cclxuXHRcdFx0XHQvLyBDYW4ndCBnZXQgSURzXHJcblx0XHRcdFx0Ly8gSXQgbWlnaHQgYmUgYmV0dGVyIHRvIGxvb3AgdGhyb3VnaCB0aGUgc29jaWFsLnJlbGF0aW9uc2hpcCB0YWJsZSB3aXRoIGhhcyB1bmlxdWUgSURzIG9mIHVzZXJzLlxyXG5cdFx0XHRcdCdtZS9mcmllbmRzJzogZm9ybWF0RnJpZW5kcyxcclxuXHRcdFx0XHQnbWUvZm9sbG93aW5nJzogZm9ybWF0RnJpZW5kcyxcclxuXHRcdFx0XHQnZGVmYXVsdCc6IHBhZ2luZ1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fSk7XHJcblxyXG5cdC8qXHJcblx0XHQvLyBBdXRvLXJlZnJlc2ggZml4OiBidWcgaW4gWWFob28gY2FuJ3QgZ2V0IHRoaXMgdG8gd29yayB3aXRoIG5vZGUtb2F1dGgtc2hpbVxyXG5cdFx0bG9naW4gOiBmdW5jdGlvbihvKXtcclxuXHRcdFx0Ly8gSXMgdGhlIHVzZXIgYWxyZWFkeSBsb2dnZWQgaW5cclxuXHRcdFx0dmFyIGF1dGggPSBoZWxsbygneWFob28nKS5nZXRBdXRoUmVzcG9uc2UoKTtcclxuXHJcblx0XHRcdC8vIElzIHRoaXMgYSByZWZyZXNoIHRva2VuP1xyXG5cdFx0XHRpZihvLm9wdGlvbnMuZGlzcGxheT09PSdub25lJyYmYXV0aCYmYXV0aC5hY2Nlc3NfdG9rZW4mJmF1dGgucmVmcmVzaF90b2tlbil7XHJcblx0XHRcdFx0Ly8gQWRkIHRoZSBvbGQgdG9rZW4gYW5kIHRoZSByZWZyZXNoIHRva2VuLCBpbmNsdWRpbmcgcGF0aCB0byB0aGUgcXVlcnlcclxuXHRcdFx0XHQvLyBTZWUgaHR0cDovL2RldmVsb3Blci55YWhvby5jb20vb2F1dGgvZ3VpZGUvb2F1dGgtcmVmcmVzaGFjY2Vzc3Rva2VuLmh0bWxcclxuXHRcdFx0XHRvLnFzLmFjY2Vzc190b2tlbiA9IGF1dGguYWNjZXNzX3Rva2VuO1xyXG5cdFx0XHRcdG8ucXMucmVmcmVzaF90b2tlbiA9IGF1dGgucmVmcmVzaF90b2tlbjtcclxuXHRcdFx0XHRvLnFzLnRva2VuX3VybCA9ICdodHRwczovL2FwaS5sb2dpbi55YWhvby5jb20vb2F1dGgvdjIvZ2V0X3Rva2VuJztcclxuXHRcdFx0fVxyXG5cdFx0fSxcclxuXHQqL1xyXG5cclxuXHRmdW5jdGlvbiBmb3JtYXRFcnJvcihvKSB7XHJcblx0XHRpZiAobyAmJiAnbWV0YScgaW4gbyAmJiAnZXJyb3JfdHlwZScgaW4gby5tZXRhKSB7XHJcblx0XHRcdG8uZXJyb3IgPSB7XHJcblx0XHRcdFx0Y29kZTogby5tZXRhLmVycm9yX3R5cGUsXHJcblx0XHRcdFx0bWVzc2FnZTogby5tZXRhLmVycm9yX21lc3NhZ2VcclxuXHRcdFx0fTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGZ1bmN0aW9uIGZvcm1hdFVzZXIobykge1xyXG5cclxuXHRcdGZvcm1hdEVycm9yKG8pO1xyXG5cdFx0aWYgKG8ucXVlcnkgJiYgby5xdWVyeS5yZXN1bHRzICYmIG8ucXVlcnkucmVzdWx0cy5wcm9maWxlKSB7XHJcblx0XHRcdG8gPSBvLnF1ZXJ5LnJlc3VsdHMucHJvZmlsZTtcclxuXHRcdFx0by5pZCA9IG8uZ3VpZDtcclxuXHRcdFx0by5sYXN0X25hbWUgPSBvLmZhbWlseU5hbWU7XHJcblx0XHRcdG8uZmlyc3RfbmFtZSA9IG8uZ2l2ZW5OYW1lIHx8IG8ubmlja25hbWU7XHJcblx0XHRcdHZhciBhID0gW107XHJcblx0XHRcdGlmIChvLmZpcnN0X25hbWUpIHtcclxuXHRcdFx0XHRhLnB1c2goby5maXJzdF9uYW1lKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0aWYgKG8ubGFzdF9uYW1lKSB7XHJcblx0XHRcdFx0YS5wdXNoKG8ubGFzdF9uYW1lKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0by5uYW1lID0gYS5qb2luKCcgJyk7XHJcblx0XHRcdG8uZW1haWwgPSAoby5lbWFpbHMgJiYgby5lbWFpbHNbMF0pID8gby5lbWFpbHNbMF0uaGFuZGxlIDogbnVsbDtcclxuXHRcdFx0by50aHVtYm5haWwgPSBvLmltYWdlID8gby5pbWFnZS5pbWFnZVVybCA6IG51bGw7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIG87XHJcblx0fVxyXG5cclxuXHRmdW5jdGlvbiBmb3JtYXRGcmllbmRzKG8sIGhlYWRlcnMsIHJlcXVlc3QpIHtcclxuXHRcdGZvcm1hdEVycm9yKG8pO1xyXG5cdFx0cGFnaW5nKG8sIGhlYWRlcnMsIHJlcXVlc3QpO1xyXG5cdFx0dmFyIGNvbnRhY3Q7XHJcblx0XHR2YXIgZmllbGQ7XHJcblx0XHRpZiAoby5xdWVyeSAmJiBvLnF1ZXJ5LnJlc3VsdHMgJiYgby5xdWVyeS5yZXN1bHRzLmNvbnRhY3QpIHtcclxuXHRcdFx0by5kYXRhID0gby5xdWVyeS5yZXN1bHRzLmNvbnRhY3Q7XHJcblx0XHRcdGRlbGV0ZSBvLnF1ZXJ5O1xyXG5cclxuXHRcdFx0aWYgKCFBcnJheS5pc0FycmF5KG8uZGF0YSkpIHtcclxuXHRcdFx0XHRvLmRhdGEgPSBbby5kYXRhXTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0by5kYXRhLmZvckVhY2goZm9ybWF0RnJpZW5kKTtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gbztcclxuXHR9XHJcblxyXG5cdGZ1bmN0aW9uIGZvcm1hdEZyaWVuZChjb250YWN0KSB7XHJcblx0XHRjb250YWN0LmlkID0gbnVsbDtcclxuXHJcblx0XHQvLyAjMzYyOiBSZXBvcnRzIG9mIHJlc3BvbnNlcyByZXR1cm5pbmcgYSBzaW5nbGUgaXRlbSwgcmF0aGVyIHRoYW4gYW4gQXJyYXkgb2YgaXRlbXMuXHJcblx0XHQvLyBGb3JtYXQgdGhlIGNvbnRhY3QuZmllbGRzIHRvIGJlIGFuIGFycmF5LlxyXG5cdFx0aWYgKGNvbnRhY3QuZmllbGRzICYmICEoY29udGFjdC5maWVsZHMgaW5zdGFuY2VvZiBBcnJheSkpIHtcclxuXHRcdFx0Y29udGFjdC5maWVsZHMgPSBbY29udGFjdC5maWVsZHNdO1xyXG5cdFx0fVxyXG5cclxuXHRcdChjb250YWN0LmZpZWxkcyB8fCBbXSkuZm9yRWFjaChmdW5jdGlvbihmaWVsZCkge1xyXG5cdFx0XHRpZiAoZmllbGQudHlwZSA9PT0gJ2VtYWlsJykge1xyXG5cdFx0XHRcdGNvbnRhY3QuZW1haWwgPSBmaWVsZC52YWx1ZTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0aWYgKGZpZWxkLnR5cGUgPT09ICduYW1lJykge1xyXG5cdFx0XHRcdGNvbnRhY3QuZmlyc3RfbmFtZSA9IGZpZWxkLnZhbHVlLmdpdmVuTmFtZTtcclxuXHRcdFx0XHRjb250YWN0Lmxhc3RfbmFtZSA9IGZpZWxkLnZhbHVlLmZhbWlseU5hbWU7XHJcblx0XHRcdFx0Y29udGFjdC5uYW1lID0gZmllbGQudmFsdWUuZ2l2ZW5OYW1lICsgJyAnICsgZmllbGQudmFsdWUuZmFtaWx5TmFtZTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0aWYgKGZpZWxkLnR5cGUgPT09ICd5YWhvb2lkJykge1xyXG5cdFx0XHRcdGNvbnRhY3QuaWQgPSBmaWVsZC52YWx1ZTtcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblx0fVxyXG5cclxuXHRmdW5jdGlvbiBwYWdpbmcocmVzLCBoZWFkZXJzLCByZXF1ZXN0KSB7XHJcblxyXG5cdFx0Ly8gU2VlOiBodHRwOi8vZGV2ZWxvcGVyLnlhaG9vLmNvbS95cWwvZ3VpZGUvcGFnaW5nLmh0bWwjbG9jYWxfbGltaXRzXHJcblx0XHRpZiAocmVzLnF1ZXJ5ICYmIHJlcy5xdWVyeS5jb3VudCAmJiByZXF1ZXN0Lm9wdGlvbnMpIHtcclxuXHRcdFx0cmVzLnBhZ2luZyA9IHtcclxuXHRcdFx0XHRuZXh0OiAnP3N0YXJ0PScgKyAocmVzLnF1ZXJ5LmNvdW50ICsgKCtyZXF1ZXN0Lm9wdGlvbnMuc3RhcnQgfHwgMSkpXHJcblx0XHRcdH07XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIHJlcztcclxuXHR9XHJcblxyXG5cdGZ1bmN0aW9uIHlxbChxKSB7XHJcblx0XHRyZXR1cm4gJ2h0dHBzOi8vcXVlcnkueWFob29hcGlzLmNvbS92MS95cWw/cT0nICsgKHEgKyAnIGxpbWl0IEB7bGltaXR8MTAwfSBvZmZzZXQgQHtzdGFydHwwfScpLnJlcGxhY2UoL1xccy9nLCAnJTIwJykgKyAnJmZvcm1hdD1qc29uJztcclxuXHR9XHJcblxyXG59KShoZWxsbyk7XHJcblxyXG4vLyBSZWdpc3RlciBhcyBhbm9ueW1vdXMgQU1EIG1vZHVsZVxyXG5pZiAodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKSB7XHJcblx0ZGVmaW5lKGZ1bmN0aW9uKCkge1xyXG5cdFx0cmV0dXJuIGhlbGxvO1xyXG5cdH0pO1xyXG59XHJcblxyXG4vLyBDb21tb25KUyBtb2R1bGUgZm9yIGJyb3dzZXJpZnlcclxuaWYgKHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnICYmIG1vZHVsZS5leHBvcnRzKSB7XHJcblx0bW9kdWxlLmV4cG9ydHMgPSBoZWxsbztcclxufVxyXG4iLCIvKiEgaGVsbG9qcyB2MS4xNC4wIHwgKGMpIDIwMTItMjAxNiBBbmRyZXcgRG9kc29uIHwgTUlUIGh0dHBzOi8vYWRvZHNvbi5jb20vaGVsbG8uanMvTElDRU5TRSAqL1xyXG4vLyBFUzUgT2JqZWN0LmNyZWF0ZVxyXG5pZiAoIU9iamVjdC5jcmVhdGUpIHtcclxuXHJcblx0Ly8gU2hpbSwgT2JqZWN0IGNyZWF0ZVxyXG5cdC8vIEEgc2hpbSBmb3IgT2JqZWN0LmNyZWF0ZSgpLCBpdCBhZGRzIGEgcHJvdG90eXBlIHRvIGEgbmV3IG9iamVjdFxyXG5cdE9iamVjdC5jcmVhdGUgPSAoZnVuY3Rpb24oKSB7XHJcblxyXG5cdFx0ZnVuY3Rpb24gRigpIHt9XHJcblxyXG5cdFx0cmV0dXJuIGZ1bmN0aW9uKG8pIHtcclxuXHJcblx0XHRcdGlmIChhcmd1bWVudHMubGVuZ3RoICE9IDEpIHtcclxuXHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoJ09iamVjdC5jcmVhdGUgaW1wbGVtZW50YXRpb24gb25seSBhY2NlcHRzIG9uZSBwYXJhbWV0ZXIuJyk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdEYucHJvdG90eXBlID0gbztcclxuXHRcdFx0cmV0dXJuIG5ldyBGKCk7XHJcblx0XHR9O1xyXG5cclxuXHR9KSgpO1xyXG5cclxufVxyXG5cclxuLy8gRVM1IE9iamVjdC5rZXlzXHJcbmlmICghT2JqZWN0LmtleXMpIHtcclxuXHRPYmplY3Qua2V5cyA9IGZ1bmN0aW9uKG8sIGssIHIpIHtcclxuXHRcdHIgPSBbXTtcclxuXHRcdGZvciAoayBpbiBvKSB7XHJcblx0XHRcdGlmIChyLmhhc093blByb3BlcnR5LmNhbGwobywgaykpXHJcblx0XHRcdFx0ci5wdXNoKGspO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiByO1xyXG5cdH07XHJcbn1cclxuXHJcbi8vIEVTNSBbXS5pbmRleE9mXHJcbmlmICghQXJyYXkucHJvdG90eXBlLmluZGV4T2YpIHtcclxuXHRBcnJheS5wcm90b3R5cGUuaW5kZXhPZiA9IGZ1bmN0aW9uKHMpIHtcclxuXHJcblx0XHRmb3IgKHZhciBqID0gMDsgaiA8IHRoaXMubGVuZ3RoOyBqKyspIHtcclxuXHRcdFx0aWYgKHRoaXNbal0gPT09IHMpIHtcclxuXHRcdFx0XHRyZXR1cm4gajtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiAtMTtcclxuXHR9O1xyXG59XHJcblxyXG4vLyBFUzUgW10uZm9yRWFjaFxyXG5pZiAoIUFycmF5LnByb3RvdHlwZS5mb3JFYWNoKSB7XHJcblx0QXJyYXkucHJvdG90eXBlLmZvckVhY2ggPSBmdW5jdGlvbihmdW4vKiwgdGhpc0FyZyovKSB7XHJcblxyXG5cdFx0aWYgKHRoaXMgPT09IHZvaWQgMCB8fCB0aGlzID09PSBudWxsKSB7XHJcblx0XHRcdHRocm93IG5ldyBUeXBlRXJyb3IoKTtcclxuXHRcdH1cclxuXHJcblx0XHR2YXIgdCA9IE9iamVjdCh0aGlzKTtcclxuXHRcdHZhciBsZW4gPSB0Lmxlbmd0aCA+Pj4gMDtcclxuXHRcdGlmICh0eXBlb2YgZnVuICE9PSAnZnVuY3Rpb24nKSB7XHJcblx0XHRcdHRocm93IG5ldyBUeXBlRXJyb3IoKTtcclxuXHRcdH1cclxuXHJcblx0XHR2YXIgdGhpc0FyZyA9IGFyZ3VtZW50cy5sZW5ndGggPj0gMiA/IGFyZ3VtZW50c1sxXSA6IHZvaWQgMDtcclxuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcclxuXHRcdFx0aWYgKGkgaW4gdCkge1xyXG5cdFx0XHRcdGZ1bi5jYWxsKHRoaXNBcmcsIHRbaV0sIGksIHQpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIHRoaXM7XHJcblx0fTtcclxufVxyXG5cclxuLy8gRVM1IFtdLmZpbHRlclxyXG5pZiAoIUFycmF5LnByb3RvdHlwZS5maWx0ZXIpIHtcclxuXHRBcnJheS5wcm90b3R5cGUuZmlsdGVyID0gZnVuY3Rpb24oZnVuLCB0aGlzQXJnKSB7XHJcblxyXG5cdFx0dmFyIGEgPSBbXTtcclxuXHRcdHRoaXMuZm9yRWFjaChmdW5jdGlvbih2YWwsIGksIHQpIHtcclxuXHRcdFx0aWYgKGZ1bi5jYWxsKHRoaXNBcmcgfHwgdm9pZCAwLCB2YWwsIGksIHQpKSB7XHJcblx0XHRcdFx0YS5wdXNoKHZhbCk7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cclxuXHRcdHJldHVybiBhO1xyXG5cdH07XHJcbn1cclxuXHJcbi8vIFByb2R1Y3Rpb24gc3RlcHMgb2YgRUNNQS0yNjIsIEVkaXRpb24gNSwgMTUuNC40LjE5XHJcbi8vIFJlZmVyZW5jZTogaHR0cDovL2VzNS5naXRodWIuaW8vI3gxNS40LjQuMTlcclxuaWYgKCFBcnJheS5wcm90b3R5cGUubWFwKSB7XHJcblxyXG5cdEFycmF5LnByb3RvdHlwZS5tYXAgPSBmdW5jdGlvbihmdW4sIHRoaXNBcmcpIHtcclxuXHJcblx0XHR2YXIgYSA9IFtdO1xyXG5cdFx0dGhpcy5mb3JFYWNoKGZ1bmN0aW9uKHZhbCwgaSwgdCkge1xyXG5cdFx0XHRhLnB1c2goZnVuLmNhbGwodGhpc0FyZyB8fCB2b2lkIDAsIHZhbCwgaSwgdCkpO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0cmV0dXJuIGE7XHJcblx0fTtcclxufVxyXG5cclxuLy8gRVM1IGlzQXJyYXlcclxuaWYgKCFBcnJheS5pc0FycmF5KSB7XHJcblxyXG5cdC8vIEZ1bmN0aW9uIEFycmF5LmlzQXJyYXlcclxuXHRBcnJheS5pc0FycmF5ID0gZnVuY3Rpb24obykge1xyXG5cdFx0cmV0dXJuIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvKSA9PT0gJ1tvYmplY3QgQXJyYXldJztcclxuXHR9O1xyXG5cclxufVxyXG5cclxuLy8gVGVzdCBmb3IgbG9jYXRpb24uYXNzaWduXHJcbmlmICh0eXBlb2Ygd2luZG93ID09PSAnb2JqZWN0JyAmJiB0eXBlb2Ygd2luZG93LmxvY2F0aW9uID09PSAnb2JqZWN0JyAmJiAhd2luZG93LmxvY2F0aW9uLmFzc2lnbikge1xyXG5cclxuXHR3aW5kb3cubG9jYXRpb24uYXNzaWduID0gZnVuY3Rpb24odXJsKSB7XHJcblx0XHR3aW5kb3cubG9jYXRpb24gPSB1cmw7XHJcblx0fTtcclxuXHJcbn1cclxuXHJcbi8vIFRlc3QgZm9yIEZ1bmN0aW9uLmJpbmRcclxuaWYgKCFGdW5jdGlvbi5wcm90b3R5cGUuYmluZCkge1xyXG5cclxuXHQvLyBNRE5cclxuXHQvLyBQb2x5ZmlsbCBJRTgsIGRvZXMgbm90IHN1cHBvcnQgbmF0aXZlIEZ1bmN0aW9uLmJpbmRcclxuXHRGdW5jdGlvbi5wcm90b3R5cGUuYmluZCA9IGZ1bmN0aW9uKGIpIHtcclxuXHJcblx0XHRpZiAodHlwZW9mIHRoaXMgIT09ICdmdW5jdGlvbicpIHtcclxuXHRcdFx0dGhyb3cgbmV3IFR5cGVFcnJvcignRnVuY3Rpb24ucHJvdG90eXBlLmJpbmQgLSB3aGF0IGlzIHRyeWluZyB0byBiZSBib3VuZCBpcyBub3QgY2FsbGFibGUnKTtcclxuXHRcdH1cclxuXHJcblx0XHRmdW5jdGlvbiBDKCkge31cclxuXHJcblx0XHR2YXIgYSA9IFtdLnNsaWNlO1xyXG5cdFx0dmFyIGYgPSBhLmNhbGwoYXJndW1lbnRzLCAxKTtcclxuXHRcdHZhciBfdGhpcyA9IHRoaXM7XHJcblx0XHR2YXIgRCA9IGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRyZXR1cm4gX3RoaXMuYXBwbHkodGhpcyBpbnN0YW5jZW9mIEMgPyB0aGlzIDogYiB8fCB3aW5kb3csIGYuY29uY2F0KGEuY2FsbChhcmd1bWVudHMpKSk7XHJcblx0XHR9O1xyXG5cclxuXHRcdEMucHJvdG90eXBlID0gdGhpcy5wcm90b3R5cGU7XHJcblx0XHRELnByb3RvdHlwZSA9IG5ldyBDKCk7XHJcblxyXG5cdFx0cmV0dXJuIEQ7XHJcblx0fTtcclxuXHJcbn1cclxuXHJcbi8qKlxyXG4gKiBAaGVsbG8uanNcclxuICpcclxuICogSGVsbG9KUyBpcyBhIGNsaWVudCBzaWRlIEphdmFzY3JpcHQgU0RLIGZvciBtYWtpbmcgT0F1dGgyIGxvZ2lucyBhbmQgc3Vic2VxdWVudCBSRVNUIGNhbGxzLlxyXG4gKlxyXG4gKiBAYXV0aG9yIEFuZHJldyBEb2Rzb25cclxuICogQHdlYnNpdGUgaHR0cHM6Ly9hZG9kc29uLmNvbS9oZWxsby5qcy9cclxuICpcclxuICogQGNvcHlyaWdodCBBbmRyZXcgRG9kc29uLCAyMDEyIC0gMjAxNVxyXG4gKiBAbGljZW5zZSBNSVQ6IFlvdSBhcmUgZnJlZSB0byB1c2UgYW5kIG1vZGlmeSB0aGlzIGNvZGUgZm9yIGFueSB1c2UsIG9uIHRoZSBjb25kaXRpb24gdGhhdCB0aGlzIGNvcHlyaWdodCBub3RpY2UgcmVtYWlucy5cclxuICovXHJcblxyXG52YXIgaGVsbG8gPSBmdW5jdGlvbihuYW1lKSB7XHJcblx0cmV0dXJuIGhlbGxvLnVzZShuYW1lKTtcclxufTtcclxuXHJcbmhlbGxvLnV0aWxzID0ge1xyXG5cclxuXHQvLyBFeHRlbmQgdGhlIGZpcnN0IG9iamVjdCB3aXRoIHRoZSBwcm9wZXJ0aWVzIGFuZCBtZXRob2RzIG9mIHRoZSBzZWNvbmRcclxuXHRleHRlbmQ6IGZ1bmN0aW9uKHIgLyosIGFbLCBiWywgLi4uXV0gKi8pIHtcclxuXHJcblx0XHQvLyBHZXQgdGhlIGFyZ3VtZW50cyBhcyBhbiBhcnJheSBidXQgb21taXQgdGhlIGluaXRpYWwgaXRlbVxyXG5cdFx0QXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKS5mb3JFYWNoKGZ1bmN0aW9uKGEpIHtcclxuXHRcdFx0aWYgKEFycmF5LmlzQXJyYXkocikgJiYgQXJyYXkuaXNBcnJheShhKSkge1xyXG5cdFx0XHRcdEFycmF5LnByb3RvdHlwZS5wdXNoLmFwcGx5KHIsIGEpO1xyXG5cdFx0XHR9XHJcblx0XHRcdGVsc2UgaWYgKHIgaW5zdGFuY2VvZiBPYmplY3QgJiYgYSBpbnN0YW5jZW9mIE9iamVjdCAmJiByICE9PSBhKSB7XHJcblx0XHRcdFx0Zm9yICh2YXIgeCBpbiBhKSB7XHJcblx0XHRcdFx0XHRyW3hdID0gaGVsbG8udXRpbHMuZXh0ZW5kKHJbeF0sIGFbeF0pO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0XHRlbHNlIHtcclxuXHJcblx0XHRcdFx0aWYgKEFycmF5LmlzQXJyYXkoYSkpIHtcclxuXHRcdFx0XHRcdC8vIENsb25lIGl0XHJcblx0XHRcdFx0XHRhID0gYS5zbGljZSgwKTtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdHIgPSBhO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHJcblx0XHRyZXR1cm4gcjtcclxuXHR9XHJcbn07XHJcblxyXG4vLyBDb3JlIGxpYnJhcnlcclxuaGVsbG8udXRpbHMuZXh0ZW5kKGhlbGxvLCB7XHJcblxyXG5cdHNldHRpbmdzOiB7XHJcblxyXG5cdFx0Ly8gT0F1dGgyIGF1dGhlbnRpY2F0aW9uIGRlZmF1bHRzXHJcblx0XHRyZWRpcmVjdF91cmk6IHdpbmRvdy5sb2NhdGlvbi5ocmVmLnNwbGl0KCcjJylbMF0sXHJcblx0XHRyZXNwb25zZV90eXBlOiAndG9rZW4nLFxyXG5cdFx0ZGlzcGxheTogJ3BvcHVwJyxcclxuXHRcdHN0YXRlOiAnJyxcclxuXHJcblx0XHQvLyBPQXV0aDEgc2hpbVxyXG5cdFx0Ly8gVGhlIHBhdGggdG8gdGhlIE9BdXRoMSBzZXJ2ZXIgZm9yIHNpZ25pbmcgdXNlciByZXF1ZXN0c1xyXG5cdFx0Ly8gV2FudCB0byByZWNyZWF0ZSB5b3VyIG93bj8gQ2hlY2tvdXQgaHR0cHM6Ly9naXRodWIuY29tL01yU3dpdGNoL25vZGUtb2F1dGgtc2hpbVxyXG5cdFx0b2F1dGhfcHJveHk6ICdodHRwczovL2F1dGgtc2VydmVyLmhlcm9rdWFwcC5jb20vcHJveHknLFxyXG5cclxuXHRcdC8vIEFQSSB0aW1lb3V0IGluIG1pbGxpc2Vjb25kc1xyXG5cdFx0dGltZW91dDogMjAwMDAsXHJcblxyXG5cdFx0Ly8gUG9wdXAgT3B0aW9uc1xyXG5cdFx0cG9wdXA6IHtcclxuXHRcdFx0cmVzaXphYmxlOiAxLFxyXG5cdFx0XHRzY3JvbGxiYXJzOiAxLFxyXG5cdFx0XHR3aWR0aDogNTAwLFxyXG5cdFx0XHRoZWlnaHQ6IDU1MFxyXG5cdFx0fSxcclxuXHJcblx0XHQvLyBEZWZhdWx0IHNjb3BlXHJcblx0XHQvLyBNYW55IHNlcnZpY2VzIHJlcXVpcmUgYXRsZWFzdCBhIHByb2ZpbGUgc2NvcGUsXHJcblx0XHQvLyBIZWxsb0pTIGF1dG9tYXRpYWxseSBpbmNsdWRlcyB0aGUgdmFsdWUgb2YgcHJvdmlkZXIuc2NvcGVfbWFwLmJhc2ljXHJcblx0XHQvLyBJZiB0aGF0J3Mgbm90IHJlcXVpcmVkIGl0IGNhbiBiZSByZW1vdmVkIHZpYSBoZWxsby5zZXR0aW5ncy5zY29wZS5sZW5ndGggPSAwO1xyXG5cdFx0c2NvcGU6IFsnYmFzaWMnXSxcclxuXHJcblx0XHQvLyBTY29wZSBNYXBzXHJcblx0XHQvLyBUaGlzIGlzIHRoZSBkZWZhdWx0IG1vZHVsZSBzY29wZSwgdGhlc2UgYXJlIHRoZSBkZWZhdWx0cyB3aGljaCBlYWNoIHNlcnZpY2UgaXMgbWFwcGVkIHRvby5cclxuXHRcdC8vIEJ5IGluY2x1ZGluZyB0aGVtIGhlcmUgaXQgcHJldmVudHMgdGhlIHNjb3BlIGZyb20gYmVpbmcgYXBwbGllZCBhY2NpZGVudGFsbHlcclxuXHRcdHNjb3BlX21hcDoge1xyXG5cdFx0XHRiYXNpYzogJydcclxuXHRcdH0sXHJcblxyXG5cdFx0Ly8gRGVmYXVsdCBzZXJ2aWNlIC8gbmV0d29ya1xyXG5cdFx0ZGVmYXVsdF9zZXJ2aWNlOiBudWxsLFxyXG5cclxuXHRcdC8vIEZvcmNlIGF1dGhlbnRpY2F0aW9uXHJcblx0XHQvLyBXaGVuIGhlbGxvLmxvZ2luIGlzIGZpcmVkLlxyXG5cdFx0Ly8gKG51bGwpOiBpZ25vcmUgY3VycmVudCBzZXNzaW9uIGV4cGlyeSBhbmQgY29udGludWUgd2l0aCBsb2dpblxyXG5cdFx0Ly8gKHRydWUpOiBpZ25vcmUgY3VycmVudCBzZXNzaW9uIGV4cGlyeSBhbmQgY29udGludWUgd2l0aCBsb2dpbiwgYXNrIGZvciB1c2VyIHRvIHJlYXV0aGVudGljYXRlXHJcblx0XHQvLyAoZmFsc2UpOiBpZiB0aGUgY3VycmVudCBzZXNzaW9uIGxvb2tzIGdvb2QgZm9yIHRoZSByZXF1ZXN0IHNjb3BlcyByZXR1cm4gdGhlIGN1cnJlbnQgc2Vzc2lvbi5cclxuXHRcdGZvcmNlOiBudWxsLFxyXG5cclxuXHRcdC8vIFBhZ2UgVVJMXHJcblx0XHQvLyBXaGVuICdkaXNwbGF5PXBhZ2UnIHRoaXMgcHJvcGVydHkgZGVmaW5lcyB3aGVyZSB0aGUgdXNlcnMgcGFnZSBzaG91bGQgZW5kIHVwIGFmdGVyIHJlZGlyZWN0X3VyaVxyXG5cdFx0Ly8gVGhzIGNvdWxkIGJlIHByb2JsZW1hdGljIGlmIHRoZSByZWRpcmVjdF91cmkgaXMgaW5kZWVkIHRoZSBmaW5hbCBwbGFjZSxcclxuXHRcdC8vIFR5cGljYWxseSB0aGlzIGNpcmN1bXZlbnRzIHRoZSBwcm9ibGVtIG9mIHRoZSByZWRpcmVjdF91cmwgYmVpbmcgYSBkdW1iIHJlbGF5IHBhZ2UuXHJcblx0XHRwYWdlX3VyaTogd2luZG93LmxvY2F0aW9uLmhyZWZcclxuXHR9LFxyXG5cclxuXHQvLyBTZXJ2aWNlIGNvbmZpZ3VyYXRpb24gb2JqZWN0c1xyXG5cdHNlcnZpY2VzOiB7fSxcclxuXHJcblx0Ly8gVXNlXHJcblx0Ly8gRGVmaW5lIGEgbmV3IGluc3RhbmNlIG9mIHRoZSBIZWxsb0pTIGxpYnJhcnkgd2l0aCBhIGRlZmF1bHQgc2VydmljZVxyXG5cdHVzZTogZnVuY3Rpb24oc2VydmljZSkge1xyXG5cclxuXHRcdC8vIENyZWF0ZSBzZWxmLCB3aGljaCBpbmhlcml0cyBmcm9tIGl0cyBwYXJlbnRcclxuXHRcdHZhciBzZWxmID0gT2JqZWN0LmNyZWF0ZSh0aGlzKTtcclxuXHJcblx0XHQvLyBJbmhlcml0IHRoZSBwcm90b3R5cGUgZnJvbSBpdHMgcGFyZW50XHJcblx0XHRzZWxmLnNldHRpbmdzID0gT2JqZWN0LmNyZWF0ZSh0aGlzLnNldHRpbmdzKTtcclxuXHJcblx0XHQvLyBEZWZpbmUgdGhlIGRlZmF1bHQgc2VydmljZVxyXG5cdFx0aWYgKHNlcnZpY2UpIHtcclxuXHRcdFx0c2VsZi5zZXR0aW5ncy5kZWZhdWx0X3NlcnZpY2UgPSBzZXJ2aWNlO1xyXG5cdFx0fVxyXG5cclxuXHRcdC8vIENyZWF0ZSBhbiBpbnN0YW5jZSBvZiBFdmVudHNcclxuXHRcdHNlbGYudXRpbHMuRXZlbnQuY2FsbChzZWxmKTtcclxuXHJcblx0XHRyZXR1cm4gc2VsZjtcclxuXHR9LFxyXG5cclxuXHQvLyBJbml0aWFsaXplXHJcblx0Ly8gRGVmaW5lIHRoZSBjbGllbnRfaWRzIGZvciB0aGUgZW5kcG9pbnQgc2VydmljZXNcclxuXHQvLyBAcGFyYW0gb2JqZWN0IG8sIGNvbnRhaW5zIGEga2V5IHZhbHVlIHBhaXIsIHNlcnZpY2UgPT4gY2xpZW50SWRcclxuXHQvLyBAcGFyYW0gb2JqZWN0IG9wdHMsIGNvbnRhaW5zIGEga2V5IHZhbHVlIHBhaXIgb2Ygb3B0aW9ucyB1c2VkIGZvciBkZWZpbmluZyB0aGUgYXV0aGVudGljYXRpb24gZGVmYXVsdHNcclxuXHQvLyBAcGFyYW0gbnVtYmVyIHRpbWVvdXQsIHRpbWVvdXQgaW4gc2Vjb25kc1xyXG5cdGluaXQ6IGZ1bmN0aW9uKHNlcnZpY2VzLCBvcHRpb25zKSB7XHJcblxyXG5cdFx0dmFyIHV0aWxzID0gdGhpcy51dGlscztcclxuXHJcblx0XHRpZiAoIXNlcnZpY2VzKSB7XHJcblx0XHRcdHJldHVybiB0aGlzLnNlcnZpY2VzO1xyXG5cdFx0fVxyXG5cclxuXHRcdC8vIERlZmluZSBwcm92aWRlciBjcmVkZW50aWFsc1xyXG5cdFx0Ly8gUmVmb3JtYXQgdGhlIElEIGZpZWxkXHJcblx0XHRmb3IgKHZhciB4IGluIHNlcnZpY2VzKSB7aWYgKHNlcnZpY2VzLmhhc093blByb3BlcnR5KHgpKSB7XHJcblx0XHRcdGlmICh0eXBlb2YgKHNlcnZpY2VzW3hdKSAhPT0gJ29iamVjdCcpIHtcclxuXHRcdFx0XHRzZXJ2aWNlc1t4XSA9IHtpZDogc2VydmljZXNbeF19O1xyXG5cdFx0XHR9XHJcblx0XHR9fVxyXG5cclxuXHRcdC8vIE1lcmdlIHNlcnZpY2VzIGlmIHRoZXJlIGFscmVhZHkgZXhpc3RzIHNvbWVcclxuXHRcdHV0aWxzLmV4dGVuZCh0aGlzLnNlcnZpY2VzLCBzZXJ2aWNlcyk7XHJcblxyXG5cdFx0Ly8gVXBkYXRlIHRoZSBkZWZhdWx0IHNldHRpbmdzIHdpdGggdGhpcyBvbmUuXHJcblx0XHRpZiAob3B0aW9ucykge1xyXG5cdFx0XHR1dGlscy5leHRlbmQodGhpcy5zZXR0aW5ncywgb3B0aW9ucyk7XHJcblxyXG5cdFx0XHQvLyBEbyB0aGlzIGltbWVkaWF0bHkgaW5jYXNlIHRoZSBicm93c2VyIGNoYW5nZXMgdGhlIGN1cnJlbnQgcGF0aC5cclxuXHRcdFx0aWYgKCdyZWRpcmVjdF91cmknIGluIG9wdGlvbnMpIHtcclxuXHRcdFx0XHR0aGlzLnNldHRpbmdzLnJlZGlyZWN0X3VyaSA9IHV0aWxzLnVybChvcHRpb25zLnJlZGlyZWN0X3VyaSkuaHJlZjtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiB0aGlzO1xyXG5cdH0sXHJcblxyXG5cdC8vIExvZ2luXHJcblx0Ly8gVXNpbmcgdGhlIGVuZHBvaW50XHJcblx0Ly8gQHBhcmFtIG5ldHdvcmsgc3RyaW5naWZ5ICAgICAgIG5hbWUgdG8gY29ubmVjdCB0b1xyXG5cdC8vIEBwYXJhbSBvcHRpb25zIG9iamVjdCAgICAob3B0aW9uYWwpICB7ZGlzcGxheSBtb2RlLCBpcyBlaXRoZXIgbm9uZXxwb3B1cChkZWZhdWx0KXxwYWdlLCBzY29wZTogZW1haWwsYmlydGhkYXkscHVibGlzaCwgLi4gfVxyXG5cdC8vIEBwYXJhbSBjYWxsYmFjayAgZnVuY3Rpb24gIChvcHRpb25hbCkgIGZpcmVkIG9uIHNpZ25pblxyXG5cdGxvZ2luOiBmdW5jdGlvbigpIHtcclxuXHJcblx0XHQvLyBDcmVhdGUgYW4gb2JqZWN0IHdoaWNoIGluaGVyaXRzIGl0cyBwYXJlbnQgYXMgdGhlIHByb3RvdHlwZSBhbmQgY29uc3RydWN0cyBhIG5ldyBldmVudCBjaGFpbi5cclxuXHRcdHZhciBfdGhpcyA9IHRoaXM7XHJcblx0XHR2YXIgdXRpbHMgPSBfdGhpcy51dGlscztcclxuXHRcdHZhciBlcnJvciA9IHV0aWxzLmVycm9yO1xyXG5cdFx0dmFyIHByb21pc2UgPSB1dGlscy5Qcm9taXNlKCk7XHJcblxyXG5cdFx0Ly8gR2V0IHBhcmFtZXRlcnNcclxuXHRcdHZhciBwID0gdXRpbHMuYXJncyh7bmV0d29yazogJ3MnLCBvcHRpb25zOiAnbycsIGNhbGxiYWNrOiAnZid9LCBhcmd1bWVudHMpO1xyXG5cclxuXHRcdC8vIExvY2FsIHZhcnNcclxuXHRcdHZhciB1cmw7XHJcblxyXG5cdFx0Ly8gR2V0IGFsbCB0aGUgY3VzdG9tIG9wdGlvbnMgYW5kIHN0b3JlIHRvIGJlIGFwcGVuZGVkIHRvIHRoZSBxdWVyeXN0cmluZ1xyXG5cdFx0dmFyIHFzID0gdXRpbHMuZGlmZktleShwLm9wdGlvbnMsIF90aGlzLnNldHRpbmdzKTtcclxuXHJcblx0XHQvLyBNZXJnZS9vdmVycmlkZSBvcHRpb25zIHdpdGggYXBwIGRlZmF1bHRzXHJcblx0XHR2YXIgb3B0cyA9IHAub3B0aW9ucyA9IHV0aWxzLm1lcmdlKF90aGlzLnNldHRpbmdzLCBwLm9wdGlvbnMgfHwge30pO1xyXG5cclxuXHRcdC8vIE1lcmdlL292ZXJyaWRlIG9wdGlvbnMgd2l0aCBhcHAgZGVmYXVsdHNcclxuXHRcdG9wdHMucG9wdXAgPSB1dGlscy5tZXJnZShfdGhpcy5zZXR0aW5ncy5wb3B1cCwgcC5vcHRpb25zLnBvcHVwIHx8IHt9KTtcclxuXHJcblx0XHQvLyBOZXR3b3JrXHJcblx0XHRwLm5ldHdvcmsgPSBwLm5ldHdvcmsgfHwgX3RoaXMuc2V0dGluZ3MuZGVmYXVsdF9zZXJ2aWNlO1xyXG5cclxuXHRcdC8vIEJpbmQgY2FsbGJhY2sgdG8gYm90aCByZWplY3QgYW5kIGZ1bGZpbGwgc3RhdGVzXHJcblx0XHRwcm9taXNlLnByb3h5LnRoZW4ocC5jYWxsYmFjaywgcC5jYWxsYmFjayk7XHJcblxyXG5cdFx0Ly8gVHJpZ2dlciBhbiBldmVudCBvbiB0aGUgZ2xvYmFsIGxpc3RlbmVyXHJcblx0XHRmdW5jdGlvbiBlbWl0KHMsIHZhbHVlKSB7XHJcblx0XHRcdGhlbGxvLmVtaXQocywgdmFsdWUpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHByb21pc2UucHJveHkudGhlbihlbWl0LmJpbmQodGhpcywgJ2F1dGgubG9naW4gYXV0aCcpLCBlbWl0LmJpbmQodGhpcywgJ2F1dGguZmFpbGVkIGF1dGgnKSk7XHJcblxyXG5cdFx0Ly8gSXMgb3VyIHNlcnZpY2UgdmFsaWQ/XHJcblx0XHRpZiAodHlwZW9mIChwLm5ldHdvcmspICE9PSAnc3RyaW5nJyB8fCAhKHAubmV0d29yayBpbiBfdGhpcy5zZXJ2aWNlcykpIHtcclxuXHRcdFx0Ly8gVHJpZ2dlciB0aGUgZGVmYXVsdCBsb2dpbi5cclxuXHRcdFx0Ly8gQWhoIHdlIGRvbnQgaGF2ZSBvbmUuXHJcblx0XHRcdHJldHVybiBwcm9taXNlLnJlamVjdChlcnJvcignaW52YWxpZF9uZXR3b3JrJywgJ1RoZSBwcm92aWRlZCBuZXR3b3JrIHdhcyBub3QgcmVjb2duaXplZCcpKTtcclxuXHRcdH1cclxuXHJcblx0XHR2YXIgcHJvdmlkZXIgPSBfdGhpcy5zZXJ2aWNlc1twLm5ldHdvcmtdO1xyXG5cclxuXHRcdC8vIENyZWF0ZSBhIGdsb2JhbCBsaXN0ZW5lciB0byBjYXB0dXJlIGV2ZW50cyB0cmlnZ2VyZWQgb3V0IG9mIHNjb3BlXHJcblx0XHR2YXIgY2FsbGJhY2tJZCA9IHV0aWxzLmdsb2JhbEV2ZW50KGZ1bmN0aW9uKHN0cikge1xyXG5cclxuXHRcdFx0Ly8gVGhlIHJlc3BvbnNlSGFuZGxlciByZXR1cm5zIGEgc3RyaW5nLCBsZXRzIHNhdmUgdGhpcyBsb2NhbGx5XHJcblx0XHRcdHZhciBvYmo7XHJcblxyXG5cdFx0XHRpZiAoc3RyKSB7XHJcblx0XHRcdFx0b2JqID0gSlNPTi5wYXJzZShzdHIpO1xyXG5cdFx0XHR9XHJcblx0XHRcdGVsc2Uge1xyXG5cdFx0XHRcdG9iaiA9IGVycm9yKCdjYW5jZWxsZWQnLCAnVGhlIGF1dGhlbnRpY2F0aW9uIHdhcyBub3QgY29tcGxldGVkJyk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdC8vIEhhbmRsZSB0aGVzZSByZXNwb25zZSB1c2luZyB0aGUgbG9jYWxcclxuXHRcdFx0Ly8gVHJpZ2dlciBvbiB0aGUgcGFyZW50XHJcblx0XHRcdGlmICghb2JqLmVycm9yKSB7XHJcblxyXG5cdFx0XHRcdC8vIFNhdmUgb24gdGhlIHBhcmVudCB3aW5kb3cgdGhlIG5ldyBjcmVkZW50aWFsc1xyXG5cdFx0XHRcdC8vIFRoaXMgZml4ZXMgYW4gSUUxMCBidWcgaSB0aGluay4uLiBhdGxlYXN0IGl0IGRvZXMgZm9yIG1lLlxyXG5cdFx0XHRcdHV0aWxzLnN0b3JlKG9iai5uZXR3b3JrLCBvYmopO1xyXG5cclxuXHRcdFx0XHQvLyBGdWxmaWxsIGEgc3VjY2Vzc2Z1bCBsb2dpblxyXG5cdFx0XHRcdHByb21pc2UuZnVsZmlsbCh7XHJcblx0XHRcdFx0XHRuZXR3b3JrOiBvYmoubmV0d29yayxcclxuXHRcdFx0XHRcdGF1dGhSZXNwb25zZTogb2JqXHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdH1cclxuXHRcdFx0ZWxzZSB7XHJcblx0XHRcdFx0Ly8gUmVqZWN0IGEgc3VjY2Vzc2Z1bCBsb2dpblxyXG5cdFx0XHRcdHByb21pc2UucmVqZWN0KG9iaik7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cclxuXHRcdHZhciByZWRpcmVjdFVyaSA9IHV0aWxzLnVybChvcHRzLnJlZGlyZWN0X3VyaSkuaHJlZjtcclxuXHJcblx0XHQvLyBNYXkgYmUgYSBzcGFjZS1kZWxpbWl0ZWQgbGlzdCBvZiBtdWx0aXBsZSwgY29tcGxlbWVudGFyeSB0eXBlc1xyXG5cdFx0dmFyIHJlc3BvbnNlVHlwZSA9IHByb3ZpZGVyLm9hdXRoLnJlc3BvbnNlX3R5cGUgfHwgb3B0cy5yZXNwb25zZV90eXBlO1xyXG5cclxuXHRcdC8vIEZhbGxiYWNrIHRvIHRva2VuIGlmIHRoZSBtb2R1bGUgaGFzbid0IGRlZmluZWQgYSBncmFudCB1cmxcclxuXHRcdGlmICgvXFxiY29kZVxcYi8udGVzdChyZXNwb25zZVR5cGUpICYmICFwcm92aWRlci5vYXV0aC5ncmFudCkge1xyXG5cdFx0XHRyZXNwb25zZVR5cGUgPSByZXNwb25zZVR5cGUucmVwbGFjZSgvXFxiY29kZVxcYi8sICd0b2tlbicpO1xyXG5cdFx0fVxyXG5cclxuXHRcdC8vIFF1ZXJ5IHN0cmluZyBwYXJhbWV0ZXJzLCB3ZSBtYXkgcGFzcyBvdXIgb3duIGFyZ3VtZW50cyB0byBmb3JtIHRoZSBxdWVyeXN0cmluZ1xyXG5cdFx0cC5xcyA9IHV0aWxzLm1lcmdlKHFzLCB7XHJcblx0XHRcdGNsaWVudF9pZDogZW5jb2RlVVJJQ29tcG9uZW50KHByb3ZpZGVyLmlkKSxcclxuXHRcdFx0cmVzcG9uc2VfdHlwZTogZW5jb2RlVVJJQ29tcG9uZW50KHJlc3BvbnNlVHlwZSksXHJcblx0XHRcdHJlZGlyZWN0X3VyaTogZW5jb2RlVVJJQ29tcG9uZW50KHJlZGlyZWN0VXJpKSxcclxuXHRcdFx0c3RhdGU6IHtcclxuXHRcdFx0XHRjbGllbnRfaWQ6IHByb3ZpZGVyLmlkLFxyXG5cdFx0XHRcdG5ldHdvcms6IHAubmV0d29yayxcclxuXHRcdFx0XHRkaXNwbGF5OiBvcHRzLmRpc3BsYXksXHJcblx0XHRcdFx0Y2FsbGJhY2s6IGNhbGxiYWNrSWQsXHJcblx0XHRcdFx0c3RhdGU6IG9wdHMuc3RhdGUsXHJcblx0XHRcdFx0cmVkaXJlY3RfdXJpOiByZWRpcmVjdFVyaVxyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHJcblx0XHQvLyBHZXQgY3VycmVudCBzZXNzaW9uIGZvciBtZXJnaW5nIHNjb3BlcywgYW5kIGZvciBxdWljayBhdXRoIHJlc3BvbnNlXHJcblx0XHR2YXIgc2Vzc2lvbiA9IHV0aWxzLnN0b3JlKHAubmV0d29yayk7XHJcblxyXG5cdFx0Ly8gU2NvcGVzIChhdXRoZW50aWNhdGlvbiBwZXJtaXNpb25zKVxyXG5cdFx0Ly8gRW5zdXJlIHRoaXMgaXMgYSBzdHJpbmcgLSBJRSBoYXMgYSBwcm9ibGVtIG1vdmluZyBBcnJheXMgYmV0d2VlbiB3aW5kb3dzXHJcblx0XHQvLyBBcHBlbmQgdGhlIHNldHVwIHNjb3BlXHJcblx0XHR2YXIgU0NPUEVfU1BMSVQgPSAvWyxcXHNdKy87XHJcblxyXG5cdFx0Ly8gSW5jbHVkZSBkZWZhdWx0IHNjb3BlIHNldHRpbmdzIChjbG9uZWQpLlxyXG5cdFx0dmFyIHNjb3BlID0gX3RoaXMuc2V0dGluZ3Muc2NvcGUgPyBbX3RoaXMuc2V0dGluZ3Muc2NvcGUudG9TdHJpbmcoKV0gOiBbXTtcclxuXHJcblx0XHQvLyBFeHRlbmQgdGhlIHByb3ZpZGVycyBzY29wZSBsaXN0IHdpdGggdGhlIGRlZmF1bHRcclxuXHRcdHZhciBzY29wZU1hcCA9IHV0aWxzLm1lcmdlKF90aGlzLnNldHRpbmdzLnNjb3BlX21hcCwgcHJvdmlkZXIuc2NvcGUgfHwge30pO1xyXG5cclxuXHRcdC8vIEFkZCB1c2VyIGRlZmluZWQgc2NvcGVzLi4uXHJcblx0XHRpZiAob3B0cy5zY29wZSkge1xyXG5cdFx0XHRzY29wZS5wdXNoKG9wdHMuc2NvcGUudG9TdHJpbmcoKSk7XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gQXBwZW5kIHNjb3BlcyBmcm9tIGEgcHJldmlvdXMgc2Vzc2lvbi5cclxuXHRcdC8vIFRoaXMgaGVscHMga2VlcCBhcHAgY3JlZGVudGlhbHMgY29uc3RhbnQsXHJcblx0XHQvLyBBdm9pZGluZyBoYXZpbmcgdG8ga2VlcCB0YWJzIG9uIHdoYXQgc2NvcGVzIGFyZSBhdXRob3JpemVkXHJcblx0XHRpZiAoc2Vzc2lvbiAmJiAnc2NvcGUnIGluIHNlc3Npb24gJiYgc2Vzc2lvbi5zY29wZSBpbnN0YW5jZW9mIFN0cmluZykge1xyXG5cdFx0XHRzY29wZS5wdXNoKHNlc3Npb24uc2NvcGUpO1xyXG5cdFx0fVxyXG5cclxuXHRcdC8vIEpvaW4gYW5kIFNwbGl0IGFnYWluXHJcblx0XHRzY29wZSA9IHNjb3BlLmpvaW4oJywnKS5zcGxpdChTQ09QRV9TUExJVCk7XHJcblxyXG5cdFx0Ly8gRm9ybWF0IHJlbW92ZSBkdXBsaWNhdGVzIGFuZCBlbXB0eSB2YWx1ZXNcclxuXHRcdHNjb3BlID0gdXRpbHMudW5pcXVlKHNjb3BlKS5maWx0ZXIoZmlsdGVyRW1wdHkpO1xyXG5cclxuXHRcdC8vIFNhdmUgdGhlIHRoZSBzY29wZXMgdG8gdGhlIHN0YXRlIHdpdGggdGhlIG5hbWVzIHRoYXQgdGhleSB3ZXJlIHJlcXVlc3RlZCB3aXRoLlxyXG5cdFx0cC5xcy5zdGF0ZS5zY29wZSA9IHNjb3BlLmpvaW4oJywnKTtcclxuXHJcblx0XHQvLyBNYXAgc2NvcGVzIHRvIHRoZSBwcm92aWRlcnMgbmFtaW5nIGNvbnZlbnRpb25cclxuXHRcdHNjb3BlID0gc2NvcGUubWFwKGZ1bmN0aW9uKGl0ZW0pIHtcclxuXHRcdFx0Ly8gRG9lcyB0aGlzIGhhdmUgYSBtYXBwaW5nP1xyXG5cdFx0XHRyZXR1cm4gKGl0ZW0gaW4gc2NvcGVNYXApID8gc2NvcGVNYXBbaXRlbV0gOiBpdGVtO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0Ly8gU3RyaW5naWZ5IGFuZCBBcnJheWlmeSBzbyB0aGF0IGRvdWJsZSBtYXBwZWQgc2NvcGVzIGFyZSBnaXZlbiB0aGUgY2hhbmNlIHRvIGJlIGZvcm1hdHRlZFxyXG5cdFx0c2NvcGUgPSBzY29wZS5qb2luKCcsJykuc3BsaXQoU0NPUEVfU1BMSVQpO1xyXG5cclxuXHRcdC8vIEFnYWluLi4uXHJcblx0XHQvLyBGb3JtYXQgcmVtb3ZlIGR1cGxpY2F0ZXMgYW5kIGVtcHR5IHZhbHVlc1xyXG5cdFx0c2NvcGUgPSB1dGlscy51bmlxdWUoc2NvcGUpLmZpbHRlcihmaWx0ZXJFbXB0eSk7XHJcblxyXG5cdFx0Ly8gSm9pbiB3aXRoIHRoZSBleHBlY3RlZCBzY29wZSBkZWxpbWl0ZXIgaW50byBhIHN0cmluZ1xyXG5cdFx0cC5xcy5zY29wZSA9IHNjb3BlLmpvaW4ocHJvdmlkZXIuc2NvcGVfZGVsaW0gfHwgJywnKTtcclxuXHJcblx0XHQvLyBJcyB0aGUgdXNlciBhbHJlYWR5IHNpZ25lZCBpbiB3aXRoIHRoZSBhcHByb3ByaWF0ZSBzY29wZXMsIHZhbGlkIGFjY2Vzc190b2tlbj9cclxuXHRcdGlmIChvcHRzLmZvcmNlID09PSBmYWxzZSkge1xyXG5cclxuXHRcdFx0aWYgKHNlc3Npb24gJiYgJ2FjY2Vzc190b2tlbicgaW4gc2Vzc2lvbiAmJiBzZXNzaW9uLmFjY2Vzc190b2tlbiAmJiAnZXhwaXJlcycgaW4gc2Vzc2lvbiAmJiBzZXNzaW9uLmV4cGlyZXMgPiAoKG5ldyBEYXRlKCkpLmdldFRpbWUoKSAvIDFlMykpIHtcclxuXHRcdFx0XHQvLyBXaGF0IGlzIGRpZmZlcmVudCBhYm91dCB0aGUgc2NvcGVzIGluIHRoZSBzZXNzaW9uIHZzIHRoZSBzY29wZXMgaW4gdGhlIG5ldyBsb2dpbj9cclxuXHRcdFx0XHR2YXIgZGlmZiA9IHV0aWxzLmRpZmYoKHNlc3Npb24uc2NvcGUgfHwgJycpLnNwbGl0KFNDT1BFX1NQTElUKSwgKHAucXMuc3RhdGUuc2NvcGUgfHwgJycpLnNwbGl0KFNDT1BFX1NQTElUKSk7XHJcblx0XHRcdFx0aWYgKGRpZmYubGVuZ3RoID09PSAwKSB7XHJcblxyXG5cdFx0XHRcdFx0Ly8gT0sgdHJpZ2dlciB0aGUgY2FsbGJhY2tcclxuXHRcdFx0XHRcdHByb21pc2UuZnVsZmlsbCh7XHJcblx0XHRcdFx0XHRcdHVuY2hhbmdlZDogdHJ1ZSxcclxuXHRcdFx0XHRcdFx0bmV0d29yazogcC5uZXR3b3JrLFxyXG5cdFx0XHRcdFx0XHRhdXRoUmVzcG9uc2U6IHNlc3Npb25cclxuXHRcdFx0XHRcdH0pO1xyXG5cclxuXHRcdFx0XHRcdC8vIE5vdGhpbmcgaGFzIGNoYW5nZWRcclxuXHRcdFx0XHRcdHJldHVybiBwcm9taXNlO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdC8vIFBhZ2UgVVJMXHJcblx0XHRpZiAob3B0cy5kaXNwbGF5ID09PSAncGFnZScgJiYgb3B0cy5wYWdlX3VyaSkge1xyXG5cdFx0XHQvLyBBZGQgYSBwYWdlIGxvY2F0aW9uLCBwbGFjZSB0byBlbmR1cCBhZnRlciBzZXNzaW9uIGhhcyBhdXRoZW50aWNhdGVkXHJcblx0XHRcdHAucXMuc3RhdGUucGFnZV91cmkgPSB1dGlscy51cmwob3B0cy5wYWdlX3VyaSkuaHJlZjtcclxuXHRcdH1cclxuXHJcblx0XHQvLyBCZXNwb2tlXHJcblx0XHQvLyBPdmVycmlkZSBsb2dpbiBxdWVyeXN0cmluZ3MgZnJvbSBhdXRoX29wdGlvbnNcclxuXHRcdGlmICgnbG9naW4nIGluIHByb3ZpZGVyICYmIHR5cGVvZiAocHJvdmlkZXIubG9naW4pID09PSAnZnVuY3Rpb24nKSB7XHJcblx0XHRcdC8vIEZvcm1hdCB0aGUgcGFyYW1hdGVycyBhY2NvcmRpbmcgdG8gdGhlIHByb3ZpZGVycyBmb3JtYXR0aW5nIGZ1bmN0aW9uXHJcblx0XHRcdHByb3ZpZGVyLmxvZ2luKHApO1xyXG5cdFx0fVxyXG5cclxuXHRcdC8vIEFkZCBPQXV0aCB0byBzdGF0ZVxyXG5cdFx0Ly8gV2hlcmUgdGhlIHNlcnZpY2UgaXMgZ29pbmcgdG8gdGFrZSBhZHZhbnRhZ2Ugb2YgdGhlIG9hdXRoX3Byb3h5XHJcblx0XHRpZiAoIS9cXGJ0b2tlblxcYi8udGVzdChyZXNwb25zZVR5cGUpIHx8XHJcblx0XHRwYXJzZUludChwcm92aWRlci5vYXV0aC52ZXJzaW9uLCAxMCkgPCAyIHx8XHJcblx0XHQob3B0cy5kaXNwbGF5ID09PSAnbm9uZScgJiYgcHJvdmlkZXIub2F1dGguZ3JhbnQgJiYgc2Vzc2lvbiAmJiBzZXNzaW9uLnJlZnJlc2hfdG9rZW4pKSB7XHJcblxyXG5cdFx0XHQvLyBBZGQgdGhlIG9hdXRoIGVuZHBvaW50c1xyXG5cdFx0XHRwLnFzLnN0YXRlLm9hdXRoID0gcHJvdmlkZXIub2F1dGg7XHJcblxyXG5cdFx0XHQvLyBBZGQgdGhlIHByb3h5IHVybFxyXG5cdFx0XHRwLnFzLnN0YXRlLm9hdXRoX3Byb3h5ID0gb3B0cy5vYXV0aF9wcm94eTtcclxuXHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gQ29udmVydCBzdGF0ZSB0byBhIHN0cmluZ1xyXG5cdFx0cC5xcy5zdGF0ZSA9IGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShwLnFzLnN0YXRlKSk7XHJcblxyXG5cdFx0Ly8gVVJMXHJcblx0XHRpZiAocGFyc2VJbnQocHJvdmlkZXIub2F1dGgudmVyc2lvbiwgMTApID09PSAxKSB7XHJcblxyXG5cdFx0XHQvLyBUdXJuIHRoZSByZXF1ZXN0IHRvIHRoZSBPQXV0aCBQcm94eSBmb3IgMy1sZWdnZWQgYXV0aFxyXG5cdFx0XHR1cmwgPSB1dGlscy5xcyhvcHRzLm9hdXRoX3Byb3h5LCBwLnFzLCBlbmNvZGVGdW5jdGlvbik7XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gUmVmcmVzaCB0b2tlblxyXG5cdFx0ZWxzZSBpZiAob3B0cy5kaXNwbGF5ID09PSAnbm9uZScgJiYgcHJvdmlkZXIub2F1dGguZ3JhbnQgJiYgc2Vzc2lvbiAmJiBzZXNzaW9uLnJlZnJlc2hfdG9rZW4pIHtcclxuXHJcblx0XHRcdC8vIEFkZCB0aGUgcmVmcmVzaF90b2tlbiB0byB0aGUgcmVxdWVzdFxyXG5cdFx0XHRwLnFzLnJlZnJlc2hfdG9rZW4gPSBzZXNzaW9uLnJlZnJlc2hfdG9rZW47XHJcblxyXG5cdFx0XHQvLyBEZWZpbmUgdGhlIHJlcXVlc3QgcGF0aFxyXG5cdFx0XHR1cmwgPSB1dGlscy5xcyhvcHRzLm9hdXRoX3Byb3h5LCBwLnFzLCBlbmNvZGVGdW5jdGlvbik7XHJcblx0XHR9XHJcblx0XHRlbHNlIHtcclxuXHRcdFx0dXJsID0gdXRpbHMucXMocHJvdmlkZXIub2F1dGguYXV0aCwgcC5xcywgZW5jb2RlRnVuY3Rpb24pO1xyXG5cdFx0fVxyXG5cclxuXHRcdC8vIEJyb2FkY2FzdCB0aGlzIGV2ZW50IGFzIGFuIGF1dGg6aW5pdFxyXG5cdFx0ZW1pdCgnYXV0aC5pbml0JywgcCk7XHJcblxyXG5cdFx0Ly8gRXhlY3V0ZVxyXG5cdFx0Ly8gVHJpZ2dlciBob3cgd2Ugd2FudCBzZWxmIGRpc3BsYXllZFxyXG5cdFx0aWYgKG9wdHMuZGlzcGxheSA9PT0gJ25vbmUnKSB7XHJcblx0XHRcdC8vIFNpZ24taW4gaW4gdGhlIGJhY2tncm91bmQsIGlmcmFtZVxyXG5cdFx0XHR1dGlscy5pZnJhbWUodXJsLCByZWRpcmVjdFVyaSk7XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gVHJpZ2dlcmluZyBwb3B1cD9cclxuXHRcdGVsc2UgaWYgKG9wdHMuZGlzcGxheSA9PT0gJ3BvcHVwJykge1xyXG5cclxuXHRcdFx0dmFyIHBvcHVwID0gdXRpbHMucG9wdXAodXJsLCByZWRpcmVjdFVyaSwgb3B0cy5wb3B1cCk7XHJcblxyXG5cdFx0XHR2YXIgdGltZXIgPSBzZXRJbnRlcnZhbChmdW5jdGlvbigpIHtcclxuXHRcdFx0XHRpZiAoIXBvcHVwIHx8IHBvcHVwLmNsb3NlZCkge1xyXG5cdFx0XHRcdFx0Y2xlYXJJbnRlcnZhbCh0aW1lcik7XHJcblx0XHRcdFx0XHRpZiAoIXByb21pc2Uuc3RhdGUpIHtcclxuXHJcblx0XHRcdFx0XHRcdHZhciByZXNwb25zZSA9IGVycm9yKCdjYW5jZWxsZWQnLCAnTG9naW4gaGFzIGJlZW4gY2FuY2VsbGVkJyk7XHJcblxyXG5cdFx0XHRcdFx0XHRpZiAoIXBvcHVwKSB7XHJcblx0XHRcdFx0XHRcdFx0cmVzcG9uc2UgPSBlcnJvcignYmxvY2tlZCcsICdQb3B1cCB3YXMgYmxvY2tlZCcpO1xyXG5cdFx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0XHRyZXNwb25zZS5uZXR3b3JrID0gcC5uZXR3b3JrO1xyXG5cclxuXHRcdFx0XHRcdFx0cHJvbWlzZS5yZWplY3QocmVzcG9uc2UpO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSwgMTAwKTtcclxuXHRcdH1cclxuXHJcblx0XHRlbHNlIHtcclxuXHRcdFx0d2luZG93LmxvY2F0aW9uID0gdXJsO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBwcm9taXNlLnByb3h5O1xyXG5cclxuXHRcdGZ1bmN0aW9uIGVuY29kZUZ1bmN0aW9uKHMpIHtyZXR1cm4gczt9XHJcblxyXG5cdFx0ZnVuY3Rpb24gZmlsdGVyRW1wdHkocykge3JldHVybiAhIXM7fVxyXG5cdH0sXHJcblxyXG5cdC8vIFJlbW92ZSBhbnkgZGF0YSBhc3NvY2lhdGVkIHdpdGggYSBnaXZlbiBzZXJ2aWNlXHJcblx0Ly8gQHBhcmFtIHN0cmluZyBuYW1lIG9mIHRoZSBzZXJ2aWNlXHJcblx0Ly8gQHBhcmFtIGZ1bmN0aW9uIGNhbGxiYWNrXHJcblx0bG9nb3V0OiBmdW5jdGlvbigpIHtcclxuXHJcblx0XHR2YXIgX3RoaXMgPSB0aGlzO1xyXG5cdFx0dmFyIHV0aWxzID0gX3RoaXMudXRpbHM7XHJcblx0XHR2YXIgZXJyb3IgPSB1dGlscy5lcnJvcjtcclxuXHJcblx0XHQvLyBDcmVhdGUgYSBuZXcgcHJvbWlzZVxyXG5cdFx0dmFyIHByb21pc2UgPSB1dGlscy5Qcm9taXNlKCk7XHJcblxyXG5cdFx0dmFyIHAgPSB1dGlscy5hcmdzKHtuYW1lOidzJywgb3B0aW9uczogJ28nLCBjYWxsYmFjazogJ2YnfSwgYXJndW1lbnRzKTtcclxuXHJcblx0XHRwLm9wdGlvbnMgPSBwLm9wdGlvbnMgfHwge307XHJcblxyXG5cdFx0Ly8gQWRkIGNhbGxiYWNrIHRvIGV2ZW50c1xyXG5cdFx0cHJvbWlzZS5wcm94eS50aGVuKHAuY2FsbGJhY2ssIHAuY2FsbGJhY2spO1xyXG5cclxuXHRcdC8vIFRyaWdnZXIgYW4gZXZlbnQgb24gdGhlIGdsb2JhbCBsaXN0ZW5lclxyXG5cdFx0ZnVuY3Rpb24gZW1pdChzLCB2YWx1ZSkge1xyXG5cdFx0XHRoZWxsby5lbWl0KHMsIHZhbHVlKTtcclxuXHRcdH1cclxuXHJcblx0XHRwcm9taXNlLnByb3h5LnRoZW4oZW1pdC5iaW5kKHRoaXMsICdhdXRoLmxvZ291dCBhdXRoJyksIGVtaXQuYmluZCh0aGlzLCAnZXJyb3InKSk7XHJcblxyXG5cdFx0Ly8gTmV0d29ya1xyXG5cdFx0cC5uYW1lID0gcC5uYW1lIHx8IHRoaXMuc2V0dGluZ3MuZGVmYXVsdF9zZXJ2aWNlO1xyXG5cdFx0cC5hdXRoUmVzcG9uc2UgPSB1dGlscy5zdG9yZShwLm5hbWUpO1xyXG5cclxuXHRcdGlmIChwLm5hbWUgJiYgIShwLm5hbWUgaW4gX3RoaXMuc2VydmljZXMpKSB7XHJcblxyXG5cdFx0XHRwcm9taXNlLnJlamVjdChlcnJvcignaW52YWxpZF9uZXR3b3JrJywgJ1RoZSBuZXR3b3JrIHdhcyB1bnJlY29nbml6ZWQnKSk7XHJcblxyXG5cdFx0fVxyXG5cdFx0ZWxzZSBpZiAocC5uYW1lICYmIHAuYXV0aFJlc3BvbnNlKSB7XHJcblxyXG5cdFx0XHQvLyBEZWZpbmUgdGhlIGNhbGxiYWNrXHJcblx0XHRcdHZhciBjYWxsYmFjayA9IGZ1bmN0aW9uKG9wdHMpIHtcclxuXHJcblx0XHRcdFx0Ly8gUmVtb3ZlIGZyb20gdGhlIHN0b3JlXHJcblx0XHRcdFx0dXRpbHMuc3RvcmUocC5uYW1lLCBudWxsKTtcclxuXHJcblx0XHRcdFx0Ly8gRW1pdCBldmVudHMgYnkgZGVmYXVsdFxyXG5cdFx0XHRcdHByb21pc2UuZnVsZmlsbChoZWxsby51dGlscy5tZXJnZSh7bmV0d29yazpwLm5hbWV9LCBvcHRzIHx8IHt9KSk7XHJcblx0XHRcdH07XHJcblxyXG5cdFx0XHQvLyBSdW4gYW4gYXN5bmMgb3BlcmF0aW9uIHRvIHJlbW92ZSB0aGUgdXNlcnMgc2Vzc2lvblxyXG5cdFx0XHR2YXIgX29wdHMgPSB7fTtcclxuXHRcdFx0aWYgKHAub3B0aW9ucy5mb3JjZSkge1xyXG5cdFx0XHRcdHZhciBsb2dvdXQgPSBfdGhpcy5zZXJ2aWNlc1twLm5hbWVdLmxvZ291dDtcclxuXHRcdFx0XHRpZiAobG9nb3V0KSB7XHJcblx0XHRcdFx0XHQvLyBDb252ZXJ0IGxvZ291dCB0byBVUkwgc3RyaW5nLFxyXG5cdFx0XHRcdFx0Ly8gSWYgbm8gc3RyaW5nIGlzIHJldHVybmVkLCB0aGVuIHRoaXMgZnVuY3Rpb24gd2lsbCBoYW5kbGUgdGhlIGxvZ291dCBhc3luYyBzdHlsZVxyXG5cdFx0XHRcdFx0aWYgKHR5cGVvZiAobG9nb3V0KSA9PT0gJ2Z1bmN0aW9uJykge1xyXG5cdFx0XHRcdFx0XHRsb2dvdXQgPSBsb2dvdXQoY2FsbGJhY2ssIHApO1xyXG5cdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdC8vIElmIGxvZ291dCBpcyBhIHN0cmluZyB0aGVuIGFzc3VtZSBVUkwgYW5kIG9wZW4gaW4gaWZyYW1lLlxyXG5cdFx0XHRcdFx0aWYgKHR5cGVvZiAobG9nb3V0KSA9PT0gJ3N0cmluZycpIHtcclxuXHRcdFx0XHRcdFx0dXRpbHMuaWZyYW1lKGxvZ291dCk7XHJcblx0XHRcdFx0XHRcdF9vcHRzLmZvcmNlID0gbnVsbDtcclxuXHRcdFx0XHRcdFx0X29wdHMubWVzc2FnZSA9ICdMb2dvdXQgc3VjY2VzcyBvbiBwcm92aWRlcnMgc2l0ZSB3YXMgaW5kZXRlcm1pbmF0ZSc7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRlbHNlIGlmIChsb2dvdXQgPT09IHVuZGVmaW5lZCkge1xyXG5cdFx0XHRcdFx0XHQvLyBUaGUgY2FsbGJhY2sgZnVuY3Rpb24gd2lsbCBoYW5kbGUgdGhlIHJlc3BvbnNlLlxyXG5cdFx0XHRcdFx0XHRyZXR1cm4gcHJvbWlzZS5wcm94eTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdC8vIFJlbW92ZSBsb2NhbCBjcmVkZW50aWFsc1xyXG5cdFx0XHRjYWxsYmFjayhfb3B0cyk7XHJcblx0XHR9XHJcblx0XHRlbHNlIHtcclxuXHRcdFx0cHJvbWlzZS5yZWplY3QoZXJyb3IoJ2ludmFsaWRfc2Vzc2lvbicsICdUaGVyZSB3YXMgbm8gc2Vzc2lvbiB0byByZW1vdmUnKSk7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIHByb21pc2UucHJveHk7XHJcblx0fSxcclxuXHJcblx0Ly8gUmV0dXJucyBhbGwgdGhlIHNlc3Npb25zIHRoYXQgYXJlIHN1YnNjcmliZWQgdG9vXHJcblx0Ly8gQHBhcmFtIHN0cmluZyBvcHRpb25hbCwgbmFtZSBvZiB0aGUgc2VydmljZSB0byBnZXQgaW5mb3JtYXRpb24gYWJvdXQuXHJcblx0Z2V0QXV0aFJlc3BvbnNlOiBmdW5jdGlvbihzZXJ2aWNlKSB7XHJcblxyXG5cdFx0Ly8gSWYgdGhlIHNlcnZpY2UgZG9lc24ndCBleGlzdFxyXG5cdFx0c2VydmljZSA9IHNlcnZpY2UgfHwgdGhpcy5zZXR0aW5ncy5kZWZhdWx0X3NlcnZpY2U7XHJcblxyXG5cdFx0aWYgKCFzZXJ2aWNlIHx8ICEoc2VydmljZSBpbiB0aGlzLnNlcnZpY2VzKSkge1xyXG5cdFx0XHRyZXR1cm4gbnVsbDtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gdGhpcy51dGlscy5zdG9yZShzZXJ2aWNlKSB8fCBudWxsO1xyXG5cdH0sXHJcblxyXG5cdC8vIEV2ZW50czogcGxhY2Vob2xkZXIgZm9yIHRoZSBldmVudHNcclxuXHRldmVudHM6IHt9XHJcbn0pO1xyXG5cclxuLy8gQ29yZSB1dGlsaXRpZXNcclxuaGVsbG8udXRpbHMuZXh0ZW5kKGhlbGxvLnV0aWxzLCB7XHJcblxyXG5cdC8vIEVycm9yXHJcblx0ZXJyb3I6IGZ1bmN0aW9uKGNvZGUsIG1lc3NhZ2UpIHtcclxuXHRcdHJldHVybiB7XHJcblx0XHRcdGVycm9yOiB7XHJcblx0XHRcdFx0Y29kZTogY29kZSxcclxuXHRcdFx0XHRtZXNzYWdlOiBtZXNzYWdlXHJcblx0XHRcdH1cclxuXHRcdH07XHJcblx0fSxcclxuXHJcblx0Ly8gQXBwZW5kIHRoZSBxdWVyeXN0cmluZyB0byBhIHVybFxyXG5cdC8vIEBwYXJhbSBzdHJpbmcgdXJsXHJcblx0Ly8gQHBhcmFtIG9iamVjdCBwYXJhbWV0ZXJzXHJcblx0cXM6IGZ1bmN0aW9uKHVybCwgcGFyYW1zLCBmb3JtYXRGdW5jdGlvbikge1xyXG5cclxuXHRcdGlmIChwYXJhbXMpIHtcclxuXHJcblx0XHRcdC8vIFNldCBkZWZhdWx0IGZvcm1hdHRpbmcgZnVuY3Rpb25cclxuXHRcdFx0Zm9ybWF0RnVuY3Rpb24gPSBmb3JtYXRGdW5jdGlvbiB8fCBlbmNvZGVVUklDb21wb25lbnQ7XHJcblxyXG5cdFx0XHQvLyBPdmVycmlkZSB0aGUgaXRlbXMgaW4gdGhlIFVSTCB3aGljaCBhbHJlYWR5IGV4aXN0XHJcblx0XHRcdGZvciAodmFyIHggaW4gcGFyYW1zKSB7XHJcblx0XHRcdFx0dmFyIHN0ciA9ICcoW1xcXFw/XFxcXCZdKScgKyB4ICsgJz1bXlxcXFwmXSonO1xyXG5cdFx0XHRcdHZhciByZWcgPSBuZXcgUmVnRXhwKHN0cik7XHJcblx0XHRcdFx0aWYgKHVybC5tYXRjaChyZWcpKSB7XHJcblx0XHRcdFx0XHR1cmwgPSB1cmwucmVwbGFjZShyZWcsICckMScgKyB4ICsgJz0nICsgZm9ybWF0RnVuY3Rpb24ocGFyYW1zW3hdKSk7XHJcblx0XHRcdFx0XHRkZWxldGUgcGFyYW1zW3hdO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdGlmICghdGhpcy5pc0VtcHR5KHBhcmFtcykpIHtcclxuXHRcdFx0cmV0dXJuIHVybCArICh1cmwuaW5kZXhPZignPycpID4gLTEgPyAnJicgOiAnPycpICsgdGhpcy5wYXJhbShwYXJhbXMsIGZvcm1hdEZ1bmN0aW9uKTtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gdXJsO1xyXG5cdH0sXHJcblxyXG5cdC8vIFBhcmFtXHJcblx0Ly8gRXhwbG9kZS9lbmNvZGUgdGhlIHBhcmFtZXRlcnMgb2YgYW4gVVJMIHN0cmluZy9vYmplY3RcclxuXHQvLyBAcGFyYW0gc3RyaW5nIHMsIHN0cmluZyB0byBkZWNvZGVcclxuXHRwYXJhbTogZnVuY3Rpb24ocywgZm9ybWF0RnVuY3Rpb24pIHtcclxuXHRcdHZhciBiO1xyXG5cdFx0dmFyIGEgPSB7fTtcclxuXHRcdHZhciBtO1xyXG5cclxuXHRcdGlmICh0eXBlb2YgKHMpID09PSAnc3RyaW5nJykge1xyXG5cclxuXHRcdFx0Zm9ybWF0RnVuY3Rpb24gPSBmb3JtYXRGdW5jdGlvbiB8fCBkZWNvZGVVUklDb21wb25lbnQ7XHJcblxyXG5cdFx0XHRtID0gcy5yZXBsYWNlKC9eW1xcI1xcP10vLCAnJykubWF0Y2goLyhbXj1cXC9cXCZdKyk9KFteXFwmXSspL2cpO1xyXG5cdFx0XHRpZiAobSkge1xyXG5cdFx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgbS5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHRcdFx0YiA9IG1baV0ubWF0Y2goLyhbXj1dKyk9KC4qKS8pO1xyXG5cdFx0XHRcdFx0YVtiWzFdXSA9IGZvcm1hdEZ1bmN0aW9uKGJbMl0pO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0cmV0dXJuIGE7XHJcblx0XHR9XHJcblx0XHRlbHNlIHtcclxuXHJcblx0XHRcdGZvcm1hdEZ1bmN0aW9uID0gZm9ybWF0RnVuY3Rpb24gfHwgZW5jb2RlVVJJQ29tcG9uZW50O1xyXG5cclxuXHRcdFx0dmFyIG8gPSBzO1xyXG5cclxuXHRcdFx0YSA9IFtdO1xyXG5cclxuXHRcdFx0Zm9yICh2YXIgeCBpbiBvKSB7aWYgKG8uaGFzT3duUHJvcGVydHkoeCkpIHtcclxuXHRcdFx0XHRpZiAoby5oYXNPd25Qcm9wZXJ0eSh4KSkge1xyXG5cdFx0XHRcdFx0YS5wdXNoKFt4LCBvW3hdID09PSAnPycgPyAnPycgOiBmb3JtYXRGdW5jdGlvbihvW3hdKV0uam9pbignPScpKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH19XHJcblxyXG5cdFx0XHRyZXR1cm4gYS5qb2luKCcmJyk7XHJcblx0XHR9XHJcblx0fSxcclxuXHJcblx0Ly8gTG9jYWwgc3RvcmFnZSBmYWNhZGVcclxuXHRzdG9yZTogKGZ1bmN0aW9uKCkge1xyXG5cclxuXHRcdHZhciBhID0gWydsb2NhbFN0b3JhZ2UnLCAnc2Vzc2lvblN0b3JhZ2UnXTtcclxuXHRcdHZhciBpID0gLTE7XHJcblx0XHR2YXIgcHJlZml4ID0gJ3Rlc3QnO1xyXG5cclxuXHRcdC8vIFNldCBMb2NhbFN0b3JhZ2VcclxuXHRcdHZhciBsb2NhbFN0b3JhZ2U7XHJcblxyXG5cdFx0d2hpbGUgKGFbKytpXSkge1xyXG5cdFx0XHR0cnkge1xyXG5cdFx0XHRcdC8vIEluIENocm9tZSB3aXRoIGNvb2tpZXMgYmxvY2tlZCwgY2FsbGluZyBsb2NhbFN0b3JhZ2UgdGhyb3dzIGFuIGVycm9yXHJcblx0XHRcdFx0bG9jYWxTdG9yYWdlID0gd2luZG93W2FbaV1dO1xyXG5cdFx0XHRcdGxvY2FsU3RvcmFnZS5zZXRJdGVtKHByZWZpeCArIGksIGkpO1xyXG5cdFx0XHRcdGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKHByZWZpeCArIGkpO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHR9XHJcblx0XHRcdGNhdGNoIChlKSB7XHJcblx0XHRcdFx0bG9jYWxTdG9yYWdlID0gbnVsbDtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdGlmICghbG9jYWxTdG9yYWdlKSB7XHJcblxyXG5cdFx0XHR2YXIgY2FjaGUgPSBudWxsO1xyXG5cclxuXHRcdFx0bG9jYWxTdG9yYWdlID0ge1xyXG5cdFx0XHRcdGdldEl0ZW06IGZ1bmN0aW9uKHByb3ApIHtcclxuXHRcdFx0XHRcdHByb3AgPSBwcm9wICsgJz0nO1xyXG5cdFx0XHRcdFx0dmFyIG0gPSBkb2N1bWVudC5jb29raWUuc3BsaXQoJzsnKTtcclxuXHRcdFx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgbS5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHRcdFx0XHR2YXIgX20gPSBtW2ldLnJlcGxhY2UoLyheXFxzK3xcXHMrJCkvLCAnJyk7XHJcblx0XHRcdFx0XHRcdGlmIChfbSAmJiBfbS5pbmRleE9mKHByb3ApID09PSAwKSB7XHJcblx0XHRcdFx0XHRcdFx0cmV0dXJuIF9tLnN1YnN0cihwcm9wLmxlbmd0aCk7XHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHRyZXR1cm4gY2FjaGU7XHJcblx0XHRcdFx0fSxcclxuXHJcblx0XHRcdFx0c2V0SXRlbTogZnVuY3Rpb24ocHJvcCwgdmFsdWUpIHtcclxuXHRcdFx0XHRcdGNhY2hlID0gdmFsdWU7XHJcblx0XHRcdFx0XHRkb2N1bWVudC5jb29raWUgPSBwcm9wICsgJz0nICsgdmFsdWU7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9O1xyXG5cclxuXHRcdFx0Ly8gRmlsbCB0aGUgY2FjaGUgdXBcclxuXHRcdFx0Y2FjaGUgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnaGVsbG8nKTtcclxuXHRcdH1cclxuXHJcblx0XHRmdW5jdGlvbiBnZXQoKSB7XHJcblx0XHRcdHZhciBqc29uID0ge307XHJcblx0XHRcdHRyeSB7XHJcblx0XHRcdFx0anNvbiA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2hlbGxvJykpIHx8IHt9O1xyXG5cdFx0XHR9XHJcblx0XHRcdGNhdGNoIChlKSB7fVxyXG5cclxuXHRcdFx0cmV0dXJuIGpzb247XHJcblx0XHR9XHJcblxyXG5cdFx0ZnVuY3Rpb24gc2V0KGpzb24pIHtcclxuXHRcdFx0bG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2hlbGxvJywgSlNPTi5zdHJpbmdpZnkoanNvbikpO1xyXG5cdFx0fVxyXG5cclxuXHRcdC8vIENoZWNrIGlmIHRoZSBicm93c2VyIHN1cHBvcnQgbG9jYWwgc3RvcmFnZVxyXG5cdFx0cmV0dXJuIGZ1bmN0aW9uKG5hbWUsIHZhbHVlLCBkYXlzKSB7XHJcblxyXG5cdFx0XHQvLyBMb2NhbCBzdG9yYWdlXHJcblx0XHRcdHZhciBqc29uID0gZ2V0KCk7XHJcblxyXG5cdFx0XHRpZiAobmFtZSAmJiB2YWx1ZSA9PT0gdW5kZWZpbmVkKSB7XHJcblx0XHRcdFx0cmV0dXJuIGpzb25bbmFtZV0gfHwgbnVsbDtcclxuXHRcdFx0fVxyXG5cdFx0XHRlbHNlIGlmIChuYW1lICYmIHZhbHVlID09PSBudWxsKSB7XHJcblx0XHRcdFx0dHJ5IHtcclxuXHRcdFx0XHRcdGRlbGV0ZSBqc29uW25hbWVdO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRjYXRjaCAoZSkge1xyXG5cdFx0XHRcdFx0anNvbltuYW1lXSA9IG51bGw7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHRcdGVsc2UgaWYgKG5hbWUpIHtcclxuXHRcdFx0XHRqc29uW25hbWVdID0gdmFsdWU7XHJcblx0XHRcdH1cclxuXHRcdFx0ZWxzZSB7XHJcblx0XHRcdFx0cmV0dXJuIGpzb247XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHNldChqc29uKTtcclxuXHJcblx0XHRcdHJldHVybiBqc29uIHx8IG51bGw7XHJcblx0XHR9O1xyXG5cclxuXHR9KSgpLFxyXG5cclxuXHQvLyBDcmVhdGUgYW5kIEFwcGVuZCBuZXcgRE9NIGVsZW1lbnRzXHJcblx0Ly8gQHBhcmFtIG5vZGUgc3RyaW5nXHJcblx0Ly8gQHBhcmFtIGF0dHIgb2JqZWN0IGxpdGVyYWxcclxuXHQvLyBAcGFyYW0gZG9tL3N0cmluZ1xyXG5cdGFwcGVuZDogZnVuY3Rpb24obm9kZSwgYXR0ciwgdGFyZ2V0KSB7XHJcblxyXG5cdFx0dmFyIG4gPSB0eXBlb2YgKG5vZGUpID09PSAnc3RyaW5nJyA/IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQobm9kZSkgOiBub2RlO1xyXG5cclxuXHRcdGlmICh0eXBlb2YgKGF0dHIpID09PSAnb2JqZWN0Jykge1xyXG5cdFx0XHRpZiAoJ3RhZ05hbWUnIGluIGF0dHIpIHtcclxuXHRcdFx0XHR0YXJnZXQgPSBhdHRyO1xyXG5cdFx0XHR9XHJcblx0XHRcdGVsc2Uge1xyXG5cdFx0XHRcdGZvciAodmFyIHggaW4gYXR0cikge2lmIChhdHRyLmhhc093blByb3BlcnR5KHgpKSB7XHJcblx0XHRcdFx0XHRpZiAodHlwZW9mIChhdHRyW3hdKSA9PT0gJ29iamVjdCcpIHtcclxuXHRcdFx0XHRcdFx0Zm9yICh2YXIgeSBpbiBhdHRyW3hdKSB7aWYgKGF0dHJbeF0uaGFzT3duUHJvcGVydHkoeSkpIHtcclxuXHRcdFx0XHRcdFx0XHRuW3hdW3ldID0gYXR0clt4XVt5XTtcclxuXHRcdFx0XHRcdFx0fX1cclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdGVsc2UgaWYgKHggPT09ICdodG1sJykge1xyXG5cdFx0XHRcdFx0XHRuLmlubmVySFRNTCA9IGF0dHJbeF07XHJcblx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0Ly8gSUUgZG9lc24ndCBsaWtlIHVzIHNldHRpbmcgbWV0aG9kcyB3aXRoIHNldEF0dHJpYnV0ZVxyXG5cdFx0XHRcdFx0ZWxzZSBpZiAoIS9eb24vLnRlc3QoeCkpIHtcclxuXHRcdFx0XHRcdFx0bi5zZXRBdHRyaWJ1dGUoeCwgYXR0clt4XSk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRlbHNlIHtcclxuXHRcdFx0XHRcdFx0blt4XSA9IGF0dHJbeF07XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fX1cclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdGlmICh0YXJnZXQgPT09ICdib2R5Jykge1xyXG5cdFx0XHQoZnVuY3Rpb24gc2VsZigpIHtcclxuXHRcdFx0XHRpZiAoZG9jdW1lbnQuYm9keSkge1xyXG5cdFx0XHRcdFx0ZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChuKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0ZWxzZSB7XHJcblx0XHRcdFx0XHRzZXRUaW1lb3V0KHNlbGYsIDE2KTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0pKCk7XHJcblx0XHR9XHJcblx0XHRlbHNlIGlmICh0eXBlb2YgKHRhcmdldCkgPT09ICdvYmplY3QnKSB7XHJcblx0XHRcdHRhcmdldC5hcHBlbmRDaGlsZChuKTtcclxuXHRcdH1cclxuXHRcdGVsc2UgaWYgKHR5cGVvZiAodGFyZ2V0KSA9PT0gJ3N0cmluZycpIHtcclxuXHRcdFx0ZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUodGFyZ2V0KVswXS5hcHBlbmRDaGlsZChuKTtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gbjtcclxuXHR9LFxyXG5cclxuXHQvLyBBbiBlYXN5IHdheSB0byBjcmVhdGUgYSBoaWRkZW4gaWZyYW1lXHJcblx0Ly8gQHBhcmFtIHN0cmluZyBzcmNcclxuXHRpZnJhbWU6IGZ1bmN0aW9uKHNyYykge1xyXG5cdFx0dGhpcy5hcHBlbmQoJ2lmcmFtZScsIHtzcmM6IHNyYywgc3R5bGU6IHtwb3NpdGlvbjonYWJzb2x1dGUnLCBsZWZ0OiAnLTEwMDBweCcsIGJvdHRvbTogMCwgaGVpZ2h0OiAnMXB4Jywgd2lkdGg6ICcxcHgnfX0sICdib2R5Jyk7XHJcblx0fSxcclxuXHJcblx0Ly8gUmVjdXJzaXZlIG1lcmdlIHR3byBvYmplY3RzIGludG8gb25lLCBzZWNvbmQgcGFyYW1ldGVyIG92ZXJpZGVzIHRoZSBmaXJzdFxyXG5cdC8vIEBwYXJhbSBhIGFycmF5XHJcblx0bWVyZ2U6IGZ1bmN0aW9uKC8qIEFyZ3M6IGEsIGIsIGMsIC4uIG4gKi8pIHtcclxuXHRcdHZhciBhcmdzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzKTtcclxuXHRcdGFyZ3MudW5zaGlmdCh7fSk7XHJcblx0XHRyZXR1cm4gdGhpcy5leHRlbmQuYXBwbHkobnVsbCwgYXJncyk7XHJcblx0fSxcclxuXHJcblx0Ly8gTWFrZXMgaXQgZWFzaWVyIHRvIGFzc2lnbiBwYXJhbWV0ZXJzLCB3aGVyZSBzb21lIGFyZSBvcHRpb25hbFxyXG5cdC8vIEBwYXJhbSBvIG9iamVjdFxyXG5cdC8vIEBwYXJhbSBhIGFyZ3VtZW50c1xyXG5cdGFyZ3M6IGZ1bmN0aW9uKG8sIGFyZ3MpIHtcclxuXHJcblx0XHR2YXIgcCA9IHt9O1xyXG5cdFx0dmFyIGkgPSAwO1xyXG5cdFx0dmFyIHQgPSBudWxsO1xyXG5cdFx0dmFyIHggPSBudWxsO1xyXG5cclxuXHRcdC8vICd4JyBpcyB0aGUgZmlyc3Qga2V5IGluIHRoZSBsaXN0IG9mIG9iamVjdCBwYXJhbWV0ZXJzXHJcblx0XHRmb3IgKHggaW4gbykge2lmIChvLmhhc093blByb3BlcnR5KHgpKSB7XHJcblx0XHRcdGJyZWFrO1xyXG5cdFx0fX1cclxuXHJcblx0XHQvLyBQYXNzaW5nIGluIGhhc2ggb2JqZWN0IG9mIGFyZ3VtZW50cz9cclxuXHRcdC8vIFdoZXJlIHRoZSBmaXJzdCBhcmd1bWVudCBjYW4ndCBiZSBhbiBvYmplY3RcclxuXHRcdGlmICgoYXJncy5sZW5ndGggPT09IDEpICYmICh0eXBlb2YgKGFyZ3NbMF0pID09PSAnb2JqZWN0JykgJiYgb1t4XSAhPSAnbyEnKSB7XHJcblxyXG5cdFx0XHQvLyBDb3VsZCB0aGlzIG9iamVjdCBzdGlsbCBiZWxvbmcgdG8gYSBwcm9wZXJ0eT9cclxuXHRcdFx0Ly8gQ2hlY2sgdGhlIG9iamVjdCBrZXlzIGlmIHRoZXkgbWF0Y2ggYW55IG9mIHRoZSBwcm9wZXJ0eSBrZXlzXHJcblx0XHRcdGZvciAoeCBpbiBhcmdzWzBdKSB7aWYgKG8uaGFzT3duUHJvcGVydHkoeCkpIHtcclxuXHRcdFx0XHQvLyBEb2VzIHRoaXMga2V5IGV4aXN0IGluIHRoZSBwcm9wZXJ0eSBsaXN0P1xyXG5cdFx0XHRcdGlmICh4IGluIG8pIHtcclxuXHRcdFx0XHRcdC8vIFllcyB0aGlzIGtleSBkb2VzIGV4aXN0IHNvIGl0cyBtb3N0IGxpa2VseSB0aGlzIGZ1bmN0aW9uIGhhcyBiZWVuIGludm9rZWQgd2l0aCBhbiBvYmplY3QgcGFyYW1ldGVyXHJcblx0XHRcdFx0XHQvLyBSZXR1cm4gZmlyc3QgYXJndW1lbnQgYXMgdGhlIGhhc2ggb2YgYWxsIGFyZ3VtZW50c1xyXG5cdFx0XHRcdFx0cmV0dXJuIGFyZ3NbMF07XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9fVxyXG5cdFx0fVxyXG5cclxuXHRcdC8vIEVsc2UgbG9vcCB0aHJvdWdoIGFuZCBhY2NvdW50IGZvciB0aGUgbWlzc2luZyBvbmVzLlxyXG5cdFx0Zm9yICh4IGluIG8pIHtpZiAoby5oYXNPd25Qcm9wZXJ0eSh4KSkge1xyXG5cclxuXHRcdFx0dCA9IHR5cGVvZiAoYXJnc1tpXSk7XHJcblxyXG5cdFx0XHRpZiAoKHR5cGVvZiAob1t4XSkgPT09ICdmdW5jdGlvbicgJiYgb1t4XS50ZXN0KGFyZ3NbaV0pKSB8fCAodHlwZW9mIChvW3hdKSA9PT0gJ3N0cmluZycgJiYgKFxyXG5cdFx0XHQob1t4XS5pbmRleE9mKCdzJykgPiAtMSAmJiB0ID09PSAnc3RyaW5nJykgfHxcclxuXHRcdFx0KG9beF0uaW5kZXhPZignbycpID4gLTEgJiYgdCA9PT0gJ29iamVjdCcpIHx8XHJcblx0XHRcdChvW3hdLmluZGV4T2YoJ2knKSA+IC0xICYmIHQgPT09ICdudW1iZXInKSB8fFxyXG5cdFx0XHQob1t4XS5pbmRleE9mKCdhJykgPiAtMSAmJiB0ID09PSAnb2JqZWN0JykgfHxcclxuXHRcdFx0KG9beF0uaW5kZXhPZignZicpID4gLTEgJiYgdCA9PT0gJ2Z1bmN0aW9uJylcclxuXHRcdFx0KSlcclxuXHRcdFx0KSB7XHJcblx0XHRcdFx0cFt4XSA9IGFyZ3NbaSsrXTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0ZWxzZSBpZiAodHlwZW9mIChvW3hdKSA9PT0gJ3N0cmluZycgJiYgb1t4XS5pbmRleE9mKCchJykgPiAtMSkge1xyXG5cdFx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdFx0fVxyXG5cdFx0fX1cclxuXHJcblx0XHRyZXR1cm4gcDtcclxuXHR9LFxyXG5cclxuXHQvLyBSZXR1cm5zIGEgVVJMIGluc3RhbmNlXHJcblx0dXJsOiBmdW5jdGlvbihwYXRoKSB7XHJcblxyXG5cdFx0Ly8gSWYgdGhlIHBhdGggaXMgZW1wdHlcclxuXHRcdGlmICghcGF0aCkge1xyXG5cdFx0XHRyZXR1cm4gd2luZG93LmxvY2F0aW9uO1xyXG5cdFx0fVxyXG5cclxuXHRcdC8vIENocm9tZSBhbmQgRmlyZUZveCBzdXBwb3J0IG5ldyBVUkwoKSB0byBleHRyYWN0IFVSTCBvYmplY3RzXHJcblx0XHRlbHNlIGlmICh3aW5kb3cuVVJMICYmIFVSTCBpbnN0YW5jZW9mIEZ1bmN0aW9uICYmIFVSTC5sZW5ndGggIT09IDApIHtcclxuXHRcdFx0cmV0dXJuIG5ldyBVUkwocGF0aCwgd2luZG93LmxvY2F0aW9uKTtcclxuXHRcdH1cclxuXHJcblx0XHQvLyBVZ2x5IHNoaW0sIGl0IHdvcmtzIVxyXG5cdFx0ZWxzZSB7XHJcblx0XHRcdHZhciBhID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xyXG5cdFx0XHRhLmhyZWYgPSBwYXRoO1xyXG5cdFx0XHRyZXR1cm4gYS5jbG9uZU5vZGUoZmFsc2UpO1xyXG5cdFx0fVxyXG5cdH0sXHJcblxyXG5cdGRpZmY6IGZ1bmN0aW9uKGEsIGIpIHtcclxuXHRcdHJldHVybiBiLmZpbHRlcihmdW5jdGlvbihpdGVtKSB7XHJcblx0XHRcdHJldHVybiBhLmluZGV4T2YoaXRlbSkgPT09IC0xO1xyXG5cdFx0fSk7XHJcblx0fSxcclxuXHJcblx0Ly8gR2V0IHRoZSBkaWZmZXJlbnQgaGFzaCBvZiBwcm9wZXJ0aWVzIHVuaXF1ZSB0byBgYWAsIGFuZCBub3QgaW4gYGJgXHJcblx0ZGlmZktleTogZnVuY3Rpb24oYSwgYikge1xyXG5cdFx0aWYgKGEgfHwgIWIpIHtcclxuXHRcdFx0dmFyIHIgPSB7fTtcclxuXHRcdFx0Zm9yICh2YXIgeCBpbiBhKSB7XHJcblx0XHRcdFx0Ly8gRG9lcyB0aGUgcHJvcGVydHkgbm90IGV4aXN0P1xyXG5cdFx0XHRcdGlmICghKHggaW4gYikpIHtcclxuXHRcdFx0XHRcdHJbeF0gPSBhW3hdO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0cmV0dXJuIHI7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIGE7XHJcblx0fSxcclxuXHJcblx0Ly8gVW5pcXVlXHJcblx0Ly8gUmVtb3ZlIGR1cGxpY2F0ZSBhbmQgbnVsbCB2YWx1ZXMgZnJvbSBhbiBhcnJheVxyXG5cdC8vIEBwYXJhbSBhIGFycmF5XHJcblx0dW5pcXVlOiBmdW5jdGlvbihhKSB7XHJcblx0XHRpZiAoIUFycmF5LmlzQXJyYXkoYSkpIHsgcmV0dXJuIFtdOyB9XHJcblxyXG5cdFx0cmV0dXJuIGEuZmlsdGVyKGZ1bmN0aW9uKGl0ZW0sIGluZGV4KSB7XHJcblx0XHRcdC8vIElzIHRoaXMgdGhlIGZpcnN0IGxvY2F0aW9uIG9mIGl0ZW1cclxuXHRcdFx0cmV0dXJuIGEuaW5kZXhPZihpdGVtKSA9PT0gaW5kZXg7XHJcblx0XHR9KTtcclxuXHR9LFxyXG5cclxuXHRpc0VtcHR5OiBmdW5jdGlvbihvYmopIHtcclxuXHJcblx0XHQvLyBTY2FsYXJcclxuXHRcdGlmICghb2JqKVxyXG5cdFx0XHRyZXR1cm4gdHJ1ZTtcclxuXHJcblx0XHQvLyBBcnJheVxyXG5cdFx0aWYgKEFycmF5LmlzQXJyYXkob2JqKSkge1xyXG5cdFx0XHRyZXR1cm4gIW9iai5sZW5ndGg7XHJcblx0XHR9XHJcblx0XHRlbHNlIGlmICh0eXBlb2YgKG9iaikgPT09ICdvYmplY3QnKSB7XHJcblx0XHRcdC8vIE9iamVjdFxyXG5cdFx0XHRmb3IgKHZhciBrZXkgaW4gb2JqKSB7XHJcblx0XHRcdFx0aWYgKG9iai5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XHJcblx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIHRydWU7XHJcblx0fSxcclxuXHJcblx0Ly9qc2NzOmRpc2FibGVcclxuXHJcblx0LyohXHJcblx0ICoqICBUaGVuYWJsZSAtLSBFbWJlZGRhYmxlIE1pbmltdW0gU3RyaWN0bHktQ29tcGxpYW50IFByb21pc2VzL0ErIDEuMS4xIFRoZW5hYmxlXHJcblx0ICoqICBDb3B5cmlnaHQgKGMpIDIwMTMtMjAxNCBSYWxmIFMuIEVuZ2Vsc2NoYWxsIDxodHRwOi8vZW5nZWxzY2hhbGwuY29tPlxyXG5cdCAqKiAgTGljZW5zZWQgdW5kZXIgVGhlIE1JVCBMaWNlbnNlIDxodHRwOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvTUlUPlxyXG5cdCAqKiAgU291cmNlLUNvZGUgZGlzdHJpYnV0ZWQgb24gPGh0dHA6Ly9naXRodWIuY29tL3JzZS90aGVuYWJsZT5cclxuXHQgKi9cclxuXHRQcm9taXNlOiAoZnVuY3Rpb24oKXtcclxuXHRcdC8qICBwcm9taXNlIHN0YXRlcyBbUHJvbWlzZXMvQSsgMi4xXSAgKi9cclxuXHRcdHZhciBTVEFURV9QRU5ESU5HICAgPSAwOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLyogIFtQcm9taXNlcy9BKyAyLjEuMV0gICovXHJcblx0XHR2YXIgU1RBVEVfRlVMRklMTEVEID0gMTsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8qICBbUHJvbWlzZXMvQSsgMi4xLjJdICAqL1xyXG5cdFx0dmFyIFNUQVRFX1JFSkVDVEVEICA9IDI7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvKiAgW1Byb21pc2VzL0ErIDIuMS4zXSAgKi9cclxuXHJcblx0XHQvKiAgcHJvbWlzZSBvYmplY3QgY29uc3RydWN0b3IgICovXHJcblx0XHR2YXIgYXBpID0gZnVuY3Rpb24gKGV4ZWN1dG9yKSB7XHJcblx0XHRcdC8qICBvcHRpb25hbGx5IHN1cHBvcnQgbm9uLWNvbnN0cnVjdG9yL3BsYWluLWZ1bmN0aW9uIGNhbGwgICovXHJcblx0XHRcdGlmICghKHRoaXMgaW5zdGFuY2VvZiBhcGkpKVxyXG5cdFx0XHRcdHJldHVybiBuZXcgYXBpKGV4ZWN1dG9yKTtcclxuXHJcblx0XHRcdC8qICBpbml0aWFsaXplIG9iamVjdCAgKi9cclxuXHRcdFx0dGhpcy5pZCAgICAgICAgICAgPSBcIlRoZW5hYmxlLzEuMC42XCI7XHJcblx0XHRcdHRoaXMuc3RhdGUgICAgICAgID0gU1RBVEVfUEVORElORzsgLyogIGluaXRpYWwgc3RhdGUgICovXHJcblx0XHRcdHRoaXMuZnVsZmlsbFZhbHVlID0gdW5kZWZpbmVkOyAgICAgLyogIGluaXRpYWwgdmFsdWUgICovICAgICAvKiAgW1Byb21pc2VzL0ErIDEuMywgMi4xLjIuMl0gICovXHJcblx0XHRcdHRoaXMucmVqZWN0UmVhc29uID0gdW5kZWZpbmVkOyAgICAgLyogIGluaXRpYWwgcmVhc29uICovICAgICAvKiAgW1Byb21pc2VzL0ErIDEuNSwgMi4xLjMuMl0gICovXHJcblx0XHRcdHRoaXMub25GdWxmaWxsZWQgID0gW107ICAgICAgICAgICAgLyogIGluaXRpYWwgaGFuZGxlcnMgICovXHJcblx0XHRcdHRoaXMub25SZWplY3RlZCAgID0gW107ICAgICAgICAgICAgLyogIGluaXRpYWwgaGFuZGxlcnMgICovXHJcblxyXG5cdFx0XHQvKiAgcHJvdmlkZSBvcHRpb25hbCBpbmZvcm1hdGlvbi1oaWRpbmcgcHJveHkgICovXHJcblx0XHRcdHRoaXMucHJveHkgPSB7XHJcblx0XHRcdFx0dGhlbjogdGhpcy50aGVuLmJpbmQodGhpcylcclxuXHRcdFx0fTtcclxuXHJcblx0XHRcdC8qICBzdXBwb3J0IG9wdGlvbmFsIGV4ZWN1dG9yIGZ1bmN0aW9uICAqL1xyXG5cdFx0XHRpZiAodHlwZW9mIGV4ZWN1dG9yID09PSBcImZ1bmN0aW9uXCIpXHJcblx0XHRcdFx0ZXhlY3V0b3IuY2FsbCh0aGlzLCB0aGlzLmZ1bGZpbGwuYmluZCh0aGlzKSwgdGhpcy5yZWplY3QuYmluZCh0aGlzKSk7XHJcblx0XHR9O1xyXG5cclxuXHRcdC8qICBwcm9taXNlIEFQSSBtZXRob2RzICAqL1xyXG5cdFx0YXBpLnByb3RvdHlwZSA9IHtcclxuXHRcdFx0LyogIHByb21pc2UgcmVzb2x2aW5nIG1ldGhvZHMgICovXHJcblx0XHRcdGZ1bGZpbGw6IGZ1bmN0aW9uICh2YWx1ZSkgeyByZXR1cm4gZGVsaXZlcih0aGlzLCBTVEFURV9GVUxGSUxMRUQsIFwiZnVsZmlsbFZhbHVlXCIsIHZhbHVlKTsgfSxcclxuXHRcdFx0cmVqZWN0OiAgZnVuY3Rpb24gKHZhbHVlKSB7IHJldHVybiBkZWxpdmVyKHRoaXMsIFNUQVRFX1JFSkVDVEVELCAgXCJyZWplY3RSZWFzb25cIiwgdmFsdWUpOyB9LFxyXG5cclxuXHRcdFx0LyogIFwiVGhlIHRoZW4gTWV0aG9kXCIgW1Byb21pc2VzL0ErIDEuMSwgMS4yLCAyLjJdICAqL1xyXG5cdFx0XHR0aGVuOiBmdW5jdGlvbiAob25GdWxmaWxsZWQsIG9uUmVqZWN0ZWQpIHtcclxuXHRcdFx0XHR2YXIgY3VyciA9IHRoaXM7XHJcblx0XHRcdFx0dmFyIG5leHQgPSBuZXcgYXBpKCk7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLyogIFtQcm9taXNlcy9BKyAyLjIuN10gICovXHJcblx0XHRcdFx0Y3Vyci5vbkZ1bGZpbGxlZC5wdXNoKFxyXG5cdFx0XHRcdFx0cmVzb2x2ZXIob25GdWxmaWxsZWQsIG5leHQsIFwiZnVsZmlsbFwiKSk7ICAgICAgICAgICAgIC8qICBbUHJvbWlzZXMvQSsgMi4yLjIvMi4yLjZdICAqL1xyXG5cdFx0XHRcdGN1cnIub25SZWplY3RlZC5wdXNoKFxyXG5cdFx0XHRcdFx0cmVzb2x2ZXIob25SZWplY3RlZCwgIG5leHQsIFwicmVqZWN0XCIgKSk7ICAgICAgICAgICAgIC8qICBbUHJvbWlzZXMvQSsgMi4yLjMvMi4yLjZdICAqL1xyXG5cdFx0XHRcdGV4ZWN1dGUoY3Vycik7XHJcblx0XHRcdFx0cmV0dXJuIG5leHQucHJveHk7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLyogIFtQcm9taXNlcy9BKyAyLjIuNywgMy4zXSAgKi9cclxuXHRcdFx0fVxyXG5cdFx0fTtcclxuXHJcblx0XHQvKiAgZGVsaXZlciBhbiBhY3Rpb24gICovXHJcblx0XHR2YXIgZGVsaXZlciA9IGZ1bmN0aW9uIChjdXJyLCBzdGF0ZSwgbmFtZSwgdmFsdWUpIHtcclxuXHRcdFx0aWYgKGN1cnIuc3RhdGUgPT09IFNUQVRFX1BFTkRJTkcpIHtcclxuXHRcdFx0XHRjdXJyLnN0YXRlID0gc3RhdGU7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvKiAgW1Byb21pc2VzL0ErIDIuMS4yLjEsIDIuMS4zLjFdICAqL1xyXG5cdFx0XHRcdGN1cnJbbmFtZV0gPSB2YWx1ZTsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8qICBbUHJvbWlzZXMvQSsgMi4xLjIuMiwgMi4xLjMuMl0gICovXHJcblx0XHRcdFx0ZXhlY3V0ZShjdXJyKTtcclxuXHRcdFx0fVxyXG5cdFx0XHRyZXR1cm4gY3VycjtcclxuXHRcdH07XHJcblxyXG5cdFx0LyogIGV4ZWN1dGUgYWxsIGhhbmRsZXJzICAqL1xyXG5cdFx0dmFyIGV4ZWN1dGUgPSBmdW5jdGlvbiAoY3Vycikge1xyXG5cdFx0XHRpZiAoY3Vyci5zdGF0ZSA9PT0gU1RBVEVfRlVMRklMTEVEKVxyXG5cdFx0XHRcdGV4ZWN1dGVfaGFuZGxlcnMoY3VyciwgXCJvbkZ1bGZpbGxlZFwiLCBjdXJyLmZ1bGZpbGxWYWx1ZSk7XHJcblx0XHRcdGVsc2UgaWYgKGN1cnIuc3RhdGUgPT09IFNUQVRFX1JFSkVDVEVEKVxyXG5cdFx0XHRcdGV4ZWN1dGVfaGFuZGxlcnMoY3VyciwgXCJvblJlamVjdGVkXCIsICBjdXJyLnJlamVjdFJlYXNvbik7XHJcblx0XHR9O1xyXG5cclxuXHRcdC8qICBleGVjdXRlIHBhcnRpY3VsYXIgc2V0IG9mIGhhbmRsZXJzICAqL1xyXG5cdFx0dmFyIGV4ZWN1dGVfaGFuZGxlcnMgPSBmdW5jdGlvbiAoY3VyciwgbmFtZSwgdmFsdWUpIHtcclxuXHRcdFx0LyogZ2xvYmFsIHByb2Nlc3M6IHRydWUgKi9cclxuXHRcdFx0LyogZ2xvYmFsIHNldEltbWVkaWF0ZTogdHJ1ZSAqL1xyXG5cdFx0XHQvKiBnbG9iYWwgc2V0VGltZW91dDogdHJ1ZSAqL1xyXG5cclxuXHRcdFx0LyogIHNob3J0LWNpcmN1aXQgcHJvY2Vzc2luZyAgKi9cclxuXHRcdFx0aWYgKGN1cnJbbmFtZV0ubGVuZ3RoID09PSAwKVxyXG5cdFx0XHRcdHJldHVybjtcclxuXHJcblx0XHRcdC8qICBpdGVyYXRlIG92ZXIgYWxsIGhhbmRsZXJzLCBleGFjdGx5IG9uY2UgICovXHJcblx0XHRcdHZhciBoYW5kbGVycyA9IGN1cnJbbmFtZV07XHJcblx0XHRcdGN1cnJbbmFtZV0gPSBbXTsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvKiAgW1Byb21pc2VzL0ErIDIuMi4yLjMsIDIuMi4zLjNdICAqL1xyXG5cdFx0XHR2YXIgZnVuYyA9IGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGhhbmRsZXJzLmxlbmd0aDsgaSsrKVxyXG5cdFx0XHRcdFx0aGFuZGxlcnNbaV0odmFsdWUpOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvKiAgW1Byb21pc2VzL0ErIDIuMi41XSAgKi9cclxuXHRcdFx0fTtcclxuXHJcblx0XHRcdC8qICBleGVjdXRlIHByb2NlZHVyZSBhc3luY2hyb25vdXNseSAgKi8gICAgICAgICAgICAgICAgICAgICAvKiAgW1Byb21pc2VzL0ErIDIuMi40LCAzLjFdICAqL1xyXG5cdFx0XHRpZiAodHlwZW9mIHByb2Nlc3MgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIHByb2Nlc3MubmV4dFRpY2sgPT09IFwiZnVuY3Rpb25cIilcclxuXHRcdFx0XHRwcm9jZXNzLm5leHRUaWNrKGZ1bmMpO1xyXG5cdFx0XHRlbHNlIGlmICh0eXBlb2Ygc2V0SW1tZWRpYXRlID09PSBcImZ1bmN0aW9uXCIpXHJcblx0XHRcdFx0c2V0SW1tZWRpYXRlKGZ1bmMpO1xyXG5cdFx0XHRlbHNlXHJcblx0XHRcdFx0c2V0VGltZW91dChmdW5jLCAwKTtcclxuXHRcdH07XHJcblxyXG5cdFx0LyogIGdlbmVyYXRlIGEgcmVzb2x2ZXIgZnVuY3Rpb24gICovXHJcblx0XHR2YXIgcmVzb2x2ZXIgPSBmdW5jdGlvbiAoY2IsIG5leHQsIG1ldGhvZCkge1xyXG5cdFx0XHRyZXR1cm4gZnVuY3Rpb24gKHZhbHVlKSB7XHJcblx0XHRcdFx0aWYgKHR5cGVvZiBjYiAhPT0gXCJmdW5jdGlvblwiKSAgICAgICAgICAgICAgICAgICAgICAgICAgICAvKiAgW1Byb21pc2VzL0ErIDIuMi4xLCAyLjIuNy4zLCAyLjIuNy40XSAgKi9cclxuXHRcdFx0XHRcdG5leHRbbWV0aG9kXS5jYWxsKG5leHQsIHZhbHVlKTsgICAgICAgICAgICAgICAgICAgICAgLyogIFtQcm9taXNlcy9BKyAyLjIuNy4zLCAyLjIuNy40XSAgKi9cclxuXHRcdFx0XHRlbHNlIHtcclxuXHRcdFx0XHRcdHZhciByZXN1bHQ7XHJcblx0XHRcdFx0XHR0cnkgeyByZXN1bHQgPSBjYih2YWx1ZSk7IH0gICAgICAgICAgICAgICAgICAgICAgICAgIC8qICBbUHJvbWlzZXMvQSsgMi4yLjIuMSwgMi4yLjMuMSwgMi4yLjUsIDMuMl0gICovXHJcblx0XHRcdFx0XHRjYXRjaCAoZSkge1xyXG5cdFx0XHRcdFx0XHRuZXh0LnJlamVjdChlKTsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLyogIFtQcm9taXNlcy9BKyAyLjIuNy4yXSAgKi9cclxuXHRcdFx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0cmVzb2x2ZShuZXh0LCByZXN1bHQpOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvKiAgW1Byb21pc2VzL0ErIDIuMi43LjFdICAqL1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fTtcclxuXHRcdH07XHJcblxyXG5cdFx0LyogIFwiUHJvbWlzZSBSZXNvbHV0aW9uIFByb2NlZHVyZVwiICAqLyAgICAgICAgICAgICAgICAgICAgICAgICAgIC8qICBbUHJvbWlzZXMvQSsgMi4zXSAgKi9cclxuXHRcdHZhciByZXNvbHZlID0gZnVuY3Rpb24gKHByb21pc2UsIHgpIHtcclxuXHRcdFx0LyogIHNhbml0eSBjaGVjayBhcmd1bWVudHMgICovICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8qICBbUHJvbWlzZXMvQSsgMi4zLjFdICAqL1xyXG5cdFx0XHRpZiAocHJvbWlzZSA9PT0geCB8fCBwcm9taXNlLnByb3h5ID09PSB4KSB7XHJcblx0XHRcdFx0cHJvbWlzZS5yZWplY3QobmV3IFR5cGVFcnJvcihcImNhbm5vdCByZXNvbHZlIHByb21pc2Ugd2l0aCBpdHNlbGZcIikpO1xyXG5cdFx0XHRcdHJldHVybjtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0LyogIHN1cmdpY2FsbHkgY2hlY2sgZm9yIGEgXCJ0aGVuXCIgbWV0aG9kXHJcblx0XHRcdFx0KG1haW5seSB0byBqdXN0IGNhbGwgdGhlIFwiZ2V0dGVyXCIgb2YgXCJ0aGVuXCIgb25seSBvbmNlKSAgKi9cclxuXHRcdFx0dmFyIHRoZW47XHJcblx0XHRcdGlmICgodHlwZW9mIHggPT09IFwib2JqZWN0XCIgJiYgeCAhPT0gbnVsbCkgfHwgdHlwZW9mIHggPT09IFwiZnVuY3Rpb25cIikge1xyXG5cdFx0XHRcdHRyeSB7IHRoZW4gPSB4LnRoZW47IH0gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8qICBbUHJvbWlzZXMvQSsgMi4zLjMuMSwgMy41XSAgKi9cclxuXHRcdFx0XHRjYXRjaCAoZSkge1xyXG5cdFx0XHRcdFx0cHJvbWlzZS5yZWplY3QoZSk7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvKiAgW1Byb21pc2VzL0ErIDIuMy4zLjJdICAqL1xyXG5cdFx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0LyogIGhhbmRsZSBvd24gVGhlbmFibGVzICAgIFtQcm9taXNlcy9BKyAyLjMuMl1cclxuXHRcdFx0XHRhbmQgc2ltaWxhciBcInRoZW5hYmxlc1wiIFtQcm9taXNlcy9BKyAyLjMuM10gICovXHJcblx0XHRcdGlmICh0eXBlb2YgdGhlbiA9PT0gXCJmdW5jdGlvblwiKSB7XHJcblx0XHRcdFx0dmFyIHJlc29sdmVkID0gZmFsc2U7XHJcblx0XHRcdFx0dHJ5IHtcclxuXHRcdFx0XHRcdC8qICBjYWxsIHJldHJpZXZlZCBcInRoZW5cIiBtZXRob2QgKi8gICAgICAgICAgICAgICAgICAvKiAgW1Byb21pc2VzL0ErIDIuMy4zLjNdICAqL1xyXG5cdFx0XHRcdFx0dGhlbi5jYWxsKHgsXHJcblx0XHRcdFx0XHRcdC8qICByZXNvbHZlUHJvbWlzZSAgKi8gICAgICAgICAgICAgICAgICAgICAgICAgICAvKiAgW1Byb21pc2VzL0ErIDIuMy4zLjMuMV0gICovXHJcblx0XHRcdFx0XHRcdGZ1bmN0aW9uICh5KSB7XHJcblx0XHRcdFx0XHRcdFx0aWYgKHJlc29sdmVkKSByZXR1cm47IHJlc29sdmVkID0gdHJ1ZTsgICAgICAgLyogIFtQcm9taXNlcy9BKyAyLjMuMy4zLjNdICAqL1xyXG5cdFx0XHRcdFx0XHRcdGlmICh5ID09PSB4KSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8qICBbUHJvbWlzZXMvQSsgMy42XSAgKi9cclxuXHRcdFx0XHRcdFx0XHRcdHByb21pc2UucmVqZWN0KG5ldyBUeXBlRXJyb3IoXCJjaXJjdWxhciB0aGVuYWJsZSBjaGFpblwiKSk7XHJcblx0XHRcdFx0XHRcdFx0ZWxzZVxyXG5cdFx0XHRcdFx0XHRcdFx0cmVzb2x2ZShwcm9taXNlLCB5KTtcclxuXHRcdFx0XHRcdFx0fSxcclxuXHJcblx0XHRcdFx0XHRcdC8qICByZWplY3RQcm9taXNlICAqLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAvKiAgW1Byb21pc2VzL0ErIDIuMy4zLjMuMl0gICovXHJcblx0XHRcdFx0XHRcdGZ1bmN0aW9uIChyKSB7XHJcblx0XHRcdFx0XHRcdFx0aWYgKHJlc29sdmVkKSByZXR1cm47IHJlc29sdmVkID0gdHJ1ZTsgICAgICAgLyogIFtQcm9taXNlcy9BKyAyLjMuMy4zLjNdICAqL1xyXG5cdFx0XHRcdFx0XHRcdHByb21pc2UucmVqZWN0KHIpO1xyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHQpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRjYXRjaCAoZSkge1xyXG5cdFx0XHRcdFx0aWYgKCFyZXNvbHZlZCkgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvKiAgW1Byb21pc2VzL0ErIDIuMy4zLjMuM10gICovXHJcblx0XHRcdFx0XHRcdHByb21pc2UucmVqZWN0KGUpOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvKiAgW1Byb21pc2VzL0ErIDIuMy4zLjMuNF0gICovXHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdHJldHVybjtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0LyogIGhhbmRsZSBvdGhlciB2YWx1ZXMgICovXHJcblx0XHRcdHByb21pc2UuZnVsZmlsbCh4KTsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvKiAgW1Byb21pc2VzL0ErIDIuMy40LCAyLjMuMy40XSAgKi9cclxuXHRcdH07XHJcblxyXG5cdFx0LyogIGV4cG9ydCBBUEkgICovXHJcblx0XHRyZXR1cm4gYXBpO1xyXG5cdH0pKCksXHJcblxyXG5cdC8vanNjczplbmFibGVcclxuXHJcblx0Ly8gRXZlbnRcclxuXHQvLyBBIGNvbnRydWN0b3Igc3VwZXJjbGFzcyBmb3IgYWRkaW5nIGV2ZW50IG1lbnRob2RzLCBvbiwgb2ZmLCBlbWl0LlxyXG5cdEV2ZW50OiBmdW5jdGlvbigpIHtcclxuXHJcblx0XHR2YXIgc2VwYXJhdG9yID0gL1tcXHNcXCxdKy87XHJcblxyXG5cdFx0Ly8gSWYgdGhpcyBkb2Vzbid0IHN1cHBvcnQgZ2V0UHJvdG90eXBlIHRoZW4gd2UgY2FuJ3QgZ2V0IHByb3RvdHlwZS5ldmVudHMgb2YgdGhlIHBhcmVudFxyXG5cdFx0Ly8gU28gbGV0cyBnZXQgdGhlIGN1cnJlbnQgaW5zdGFuY2UgZXZlbnRzLCBhbmQgYWRkIHRob3NlIHRvIGEgcGFyZW50IHByb3BlcnR5XHJcblx0XHR0aGlzLnBhcmVudCA9IHtcclxuXHRcdFx0ZXZlbnRzOiB0aGlzLmV2ZW50cyxcclxuXHRcdFx0ZmluZEV2ZW50czogdGhpcy5maW5kRXZlbnRzLFxyXG5cdFx0XHRwYXJlbnQ6IHRoaXMucGFyZW50LFxyXG5cdFx0XHR1dGlsczogdGhpcy51dGlsc1xyXG5cdFx0fTtcclxuXHJcblx0XHR0aGlzLmV2ZW50cyA9IHt9O1xyXG5cclxuXHRcdC8vIE9uLCBzdWJzY3JpYmUgdG8gZXZlbnRzXHJcblx0XHQvLyBAcGFyYW0gZXZ0ICAgc3RyaW5nXHJcblx0XHQvLyBAcGFyYW0gY2FsbGJhY2sgIGZ1bmN0aW9uXHJcblx0XHR0aGlzLm9uID0gZnVuY3Rpb24oZXZ0LCBjYWxsYmFjaykge1xyXG5cclxuXHRcdFx0aWYgKGNhbGxiYWNrICYmIHR5cGVvZiAoY2FsbGJhY2spID09PSAnZnVuY3Rpb24nKSB7XHJcblx0XHRcdFx0dmFyIGEgPSBldnQuc3BsaXQoc2VwYXJhdG9yKTtcclxuXHRcdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGEubGVuZ3RoOyBpKyspIHtcclxuXHJcblx0XHRcdFx0XHQvLyBIYXMgdGhpcyBldmVudCBhbHJlYWR5IGJlZW4gZmlyZWQgb24gdGhpcyBpbnN0YW5jZT9cclxuXHRcdFx0XHRcdHRoaXMuZXZlbnRzW2FbaV1dID0gW2NhbGxiYWNrXS5jb25jYXQodGhpcy5ldmVudHNbYVtpXV0gfHwgW10pO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0cmV0dXJuIHRoaXM7XHJcblx0XHR9O1xyXG5cclxuXHRcdC8vIE9mZiwgdW5zdWJzY3JpYmUgdG8gZXZlbnRzXHJcblx0XHQvLyBAcGFyYW0gZXZ0ICAgc3RyaW5nXHJcblx0XHQvLyBAcGFyYW0gY2FsbGJhY2sgIGZ1bmN0aW9uXHJcblx0XHR0aGlzLm9mZiA9IGZ1bmN0aW9uKGV2dCwgY2FsbGJhY2spIHtcclxuXHJcblx0XHRcdHRoaXMuZmluZEV2ZW50cyhldnQsIGZ1bmN0aW9uKG5hbWUsIGluZGV4KSB7XHJcblx0XHRcdFx0aWYgKCFjYWxsYmFjayB8fCB0aGlzLmV2ZW50c1tuYW1lXVtpbmRleF0gPT09IGNhbGxiYWNrKSB7XHJcblx0XHRcdFx0XHR0aGlzLmV2ZW50c1tuYW1lXVtpbmRleF0gPSBudWxsO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSk7XHJcblxyXG5cdFx0XHRyZXR1cm4gdGhpcztcclxuXHRcdH07XHJcblxyXG5cdFx0Ly8gRW1pdFxyXG5cdFx0Ly8gVHJpZ2dlcnMgYW55IHN1YnNjcmliZWQgZXZlbnRzXHJcblx0XHR0aGlzLmVtaXQgPSBmdW5jdGlvbihldnQgLyosIGRhdGEsIC4uLiAqLykge1xyXG5cclxuXHRcdFx0Ly8gR2V0IGFyZ3VtZW50cyBhcyBhbiBBcnJheSwga25vY2sgb2ZmIHRoZSBmaXJzdCBvbmVcclxuXHRcdFx0dmFyIGFyZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpO1xyXG5cdFx0XHRhcmdzLnB1c2goZXZ0KTtcclxuXHJcblx0XHRcdC8vIEhhbmRsZXJcclxuXHRcdFx0dmFyIGhhbmRsZXIgPSBmdW5jdGlvbihuYW1lLCBpbmRleCkge1xyXG5cclxuXHRcdFx0XHQvLyBSZXBsYWNlIHRoZSBsYXN0IHByb3BlcnR5IHdpdGggdGhlIGV2ZW50IG5hbWVcclxuXHRcdFx0XHRhcmdzW2FyZ3MubGVuZ3RoIC0gMV0gPSAobmFtZSA9PT0gJyonID8gZXZ0IDogbmFtZSk7XHJcblxyXG5cdFx0XHRcdC8vIFRyaWdnZXJcclxuXHRcdFx0XHR0aGlzLmV2ZW50c1tuYW1lXVtpbmRleF0uYXBwbHkodGhpcywgYXJncyk7XHJcblx0XHRcdH07XHJcblxyXG5cdFx0XHQvLyBGaW5kIHRoZSBjYWxsYmFja3Mgd2hpY2ggbWF0Y2ggdGhlIGNvbmRpdGlvbiBhbmQgY2FsbFxyXG5cdFx0XHR2YXIgX3RoaXMgPSB0aGlzO1xyXG5cdFx0XHR3aGlsZSAoX3RoaXMgJiYgX3RoaXMuZmluZEV2ZW50cykge1xyXG5cclxuXHRcdFx0XHQvLyBGaW5kIGV2ZW50cyB3aGljaCBtYXRjaFxyXG5cdFx0XHRcdF90aGlzLmZpbmRFdmVudHMoZXZ0ICsgJywqJywgaGFuZGxlcik7XHJcblx0XHRcdFx0X3RoaXMgPSBfdGhpcy5wYXJlbnQ7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHJldHVybiB0aGlzO1xyXG5cdFx0fTtcclxuXHJcblx0XHQvL1xyXG5cdFx0Ly8gRWFzeSBmdW5jdGlvbnNcclxuXHRcdHRoaXMuZW1pdEFmdGVyID0gZnVuY3Rpb24oKSB7XHJcblx0XHRcdHZhciBfdGhpcyA9IHRoaXM7XHJcblx0XHRcdHZhciBhcmdzID0gYXJndW1lbnRzO1xyXG5cdFx0XHRzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdF90aGlzLmVtaXQuYXBwbHkoX3RoaXMsIGFyZ3MpO1xyXG5cdFx0XHR9LCAwKTtcclxuXHJcblx0XHRcdHJldHVybiB0aGlzO1xyXG5cdFx0fTtcclxuXHJcblx0XHR0aGlzLmZpbmRFdmVudHMgPSBmdW5jdGlvbihldnQsIGNhbGxiYWNrKSB7XHJcblxyXG5cdFx0XHR2YXIgYSA9IGV2dC5zcGxpdChzZXBhcmF0b3IpO1xyXG5cclxuXHRcdFx0Zm9yICh2YXIgbmFtZSBpbiB0aGlzLmV2ZW50cykge2lmICh0aGlzLmV2ZW50cy5oYXNPd25Qcm9wZXJ0eShuYW1lKSkge1xyXG5cclxuXHRcdFx0XHRpZiAoYS5pbmRleE9mKG5hbWUpID4gLTEpIHtcclxuXHJcblx0XHRcdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuZXZlbnRzW25hbWVdLmxlbmd0aDsgaSsrKSB7XHJcblxyXG5cdFx0XHRcdFx0XHQvLyBEb2VzIHRoZSBldmVudCBoYW5kbGVyIGV4aXN0P1xyXG5cdFx0XHRcdFx0XHRpZiAodGhpcy5ldmVudHNbbmFtZV1baV0pIHtcclxuXHRcdFx0XHRcdFx0XHQvLyBFbWl0IG9uIHRoZSBsb2NhbCBpbnN0YW5jZSBvZiB0aGlzXHJcblx0XHRcdFx0XHRcdFx0Y2FsbGJhY2suY2FsbCh0aGlzLCBuYW1lLCBpKTtcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fX1cclxuXHRcdH07XHJcblxyXG5cdFx0cmV0dXJuIHRoaXM7XHJcblx0fSxcclxuXHJcblx0Ly8gR2xvYmFsIEV2ZW50c1xyXG5cdC8vIEF0dGFjaCB0aGUgY2FsbGJhY2sgdG8gdGhlIHdpbmRvdyBvYmplY3RcclxuXHQvLyBSZXR1cm4gaXRzIHVuaXF1ZSByZWZlcmVuY2VcclxuXHRnbG9iYWxFdmVudDogZnVuY3Rpb24oY2FsbGJhY2ssIGd1aWQpIHtcclxuXHRcdC8vIElmIHRoZSBndWlkIGhhcyBub3QgYmVlbiBzdXBwbGllZCB0aGVuIGNyZWF0ZSBhIG5ldyBvbmUuXHJcblx0XHRndWlkID0gZ3VpZCB8fCAnX2hlbGxvanNfJyArIHBhcnNlSW50KE1hdGgucmFuZG9tKCkgKiAxZTEyLCAxMCkudG9TdHJpbmcoMzYpO1xyXG5cclxuXHRcdC8vIERlZmluZSB0aGUgY2FsbGJhY2sgZnVuY3Rpb25cclxuXHRcdHdpbmRvd1tndWlkXSA9IGZ1bmN0aW9uKCkge1xyXG5cdFx0XHQvLyBUcmlnZ2VyIHRoZSBjYWxsYmFja1xyXG5cdFx0XHR0cnkge1xyXG5cdFx0XHRcdGlmIChjYWxsYmFjay5hcHBseSh0aGlzLCBhcmd1bWVudHMpKSB7XHJcblx0XHRcdFx0XHRkZWxldGUgd2luZG93W2d1aWRdO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0XHRjYXRjaCAoZSkge1xyXG5cdFx0XHRcdGNvbnNvbGUuZXJyb3IoZSk7XHJcblx0XHRcdH1cclxuXHRcdH07XHJcblxyXG5cdFx0cmV0dXJuIGd1aWQ7XHJcblx0fSxcclxuXHJcblx0Ly8gVHJpZ2dlciBhIGNsaWVudHNpZGUgcG9wdXBcclxuXHQvLyBUaGlzIGhhcyBiZWVuIGF1Z21lbnRlZCB0byBzdXBwb3J0IFBob25lR2FwXHJcblx0cG9wdXA6IGZ1bmN0aW9uKHVybCwgcmVkaXJlY3RVcmksIG9wdGlvbnMpIHtcclxuXHJcblx0XHR2YXIgZG9jdW1lbnRFbGVtZW50ID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50O1xyXG5cclxuXHRcdC8vIE11bHRpIFNjcmVlbiBQb3B1cCBQb3NpdGlvbmluZyAoaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL2EvMTY4NjEwNTApXHJcblx0XHQvLyBDcmVkaXQ6IGh0dHA6Ly93d3cueHRmLmRrLzIwMTEvMDgvY2VudGVyLW5ldy1wb3B1cC13aW5kb3ctZXZlbi1vbi5odG1sXHJcblx0XHQvLyBGaXhlcyBkdWFsLXNjcmVlbiBwb3NpdGlvbiAgICAgICAgICAgICAgICAgICAgICAgICBNb3N0IGJyb3dzZXJzICAgICAgRmlyZWZveFxyXG5cclxuXHRcdGlmIChvcHRpb25zLmhlaWdodCkge1xyXG5cdFx0XHR2YXIgZHVhbFNjcmVlblRvcCA9IHdpbmRvdy5zY3JlZW5Ub3AgIT09IHVuZGVmaW5lZCA/IHdpbmRvdy5zY3JlZW5Ub3AgOiBzY3JlZW4udG9wO1xyXG5cdFx0XHR2YXIgaGVpZ2h0ID0gc2NyZWVuLmhlaWdodCB8fCB3aW5kb3cuaW5uZXJIZWlnaHQgfHwgZG9jdW1lbnRFbGVtZW50LmNsaWVudEhlaWdodDtcclxuXHRcdFx0b3B0aW9ucy50b3AgPSBwYXJzZUludCgoaGVpZ2h0IC0gb3B0aW9ucy5oZWlnaHQpIC8gMiwgMTApICsgZHVhbFNjcmVlblRvcDtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAob3B0aW9ucy53aWR0aCkge1xyXG5cdFx0XHR2YXIgZHVhbFNjcmVlbkxlZnQgPSB3aW5kb3cuc2NyZWVuTGVmdCAhPT0gdW5kZWZpbmVkID8gd2luZG93LnNjcmVlbkxlZnQgOiBzY3JlZW4ubGVmdDtcclxuXHRcdFx0dmFyIHdpZHRoID0gc2NyZWVuLndpZHRoIHx8IHdpbmRvdy5pbm5lcldpZHRoIHx8IGRvY3VtZW50RWxlbWVudC5jbGllbnRXaWR0aDtcclxuXHRcdFx0b3B0aW9ucy5sZWZ0ID0gcGFyc2VJbnQoKHdpZHRoIC0gb3B0aW9ucy53aWR0aCkgLyAyLCAxMCkgKyBkdWFsU2NyZWVuTGVmdDtcclxuXHRcdH1cclxuXHJcblx0XHQvLyBDb252ZXJ0IG9wdGlvbnMgaW50byBhbiBhcnJheVxyXG5cdFx0dmFyIG9wdGlvbnNBcnJheSA9IFtdO1xyXG5cdFx0T2JqZWN0LmtleXMob3B0aW9ucykuZm9yRWFjaChmdW5jdGlvbihuYW1lKSB7XHJcblx0XHRcdHZhciB2YWx1ZSA9IG9wdGlvbnNbbmFtZV07XHJcblx0XHRcdG9wdGlvbnNBcnJheS5wdXNoKG5hbWUgKyAodmFsdWUgIT09IG51bGwgPyAnPScgKyB2YWx1ZSA6ICcnKSk7XHJcblx0XHR9KTtcclxuXHJcblx0XHQvLyBDYWxsIHRoZSBvcGVuKCkgZnVuY3Rpb24gd2l0aCB0aGUgaW5pdGlhbCBwYXRoXHJcblx0XHQvL1xyXG5cdFx0Ly8gT0F1dGggcmVkaXJlY3QsIGZpeGVzIFVSSSBmcmFnbWVudHMgZnJvbSBiZWluZyBsb3N0IGluIFNhZmFyaVxyXG5cdFx0Ly8gKFVSSSBGcmFnbWVudHMgd2l0aGluIDMwMiBMb2NhdGlvbiBVUkkgYXJlIGxvc3Qgb3ZlciBIVFRQUylcclxuXHRcdC8vIExvYWRpbmcgdGhlIHJlZGlyZWN0Lmh0bWwgYmVmb3JlIHRyaWdnZXJpbmcgdGhlIE9BdXRoIEZsb3cgc2VlbXMgdG8gZml4IGl0LlxyXG5cdFx0Ly9cclxuXHRcdC8vIEZpcmVmb3ggIGRlY29kZXMgVVJMIGZyYWdtZW50cyB3aGVuIGNhbGxpbmcgbG9jYXRpb24uaGFzaC5cclxuXHRcdC8vICAtIFRoaXMgaXMgYmFkIGlmIHRoZSB2YWx1ZSBjb250YWlucyBicmVhayBwb2ludHMgd2hpY2ggYXJlIGVzY2FwZWRcclxuXHRcdC8vICAtIEhlbmNlIHRoZSB1cmwgbXVzdCBiZSBlbmNvZGVkIHR3aWNlIGFzIGl0IGNvbnRhaW5zIGJyZWFrcG9pbnRzLlxyXG5cdFx0aWYgKG5hdmlnYXRvci51c2VyQWdlbnQuaW5kZXhPZignU2FmYXJpJykgIT09IC0xICYmIG5hdmlnYXRvci51c2VyQWdlbnQuaW5kZXhPZignQ2hyb21lJykgPT09IC0xKSB7XHJcblx0XHRcdHVybCA9IHJlZGlyZWN0VXJpICsgJyNvYXV0aF9yZWRpcmVjdD0nICsgZW5jb2RlVVJJQ29tcG9uZW50KGVuY29kZVVSSUNvbXBvbmVudCh1cmwpKTtcclxuXHRcdH1cclxuXHJcblx0XHR2YXIgcG9wdXAgPSB3aW5kb3cub3BlbihcclxuXHRcdFx0dXJsLFxyXG5cdFx0XHQnX2JsYW5rJyxcclxuXHRcdFx0b3B0aW9uc0FycmF5LmpvaW4oJywnKVxyXG5cdFx0KTtcclxuXHJcblx0XHRpZiAocG9wdXAgJiYgcG9wdXAuZm9jdXMpIHtcclxuXHRcdFx0cG9wdXAuZm9jdXMoKTtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gcG9wdXA7XHJcblx0fSxcclxuXHJcblx0Ly8gT0F1dGggYW5kIEFQSSByZXNwb25zZSBoYW5kbGVyXHJcblx0cmVzcG9uc2VIYW5kbGVyOiBmdW5jdGlvbih3aW5kb3csIHBhcmVudCkge1xyXG5cclxuXHRcdHZhciBfdGhpcyA9IHRoaXM7XHJcblx0XHR2YXIgcDtcclxuXHRcdHZhciBsb2NhdGlvbiA9IHdpbmRvdy5sb2NhdGlvbjtcclxuXHJcblx0XHQvLyBJcyB0aGlzIGFuIGF1dGggcmVsYXkgbWVzc2FnZSB3aGljaCBuZWVkcyB0byBjYWxsIHRoZSBwcm94eT9cclxuXHRcdHAgPSBfdGhpcy5wYXJhbShsb2NhdGlvbi5zZWFyY2gpO1xyXG5cclxuXHRcdC8vIE9BdXRoMiBvciBPQXV0aDEgc2VydmVyIHJlc3BvbnNlP1xyXG5cdFx0aWYgKHAgJiYgcC5zdGF0ZSAmJiAocC5jb2RlIHx8IHAub2F1dGhfdG9rZW4pKSB7XHJcblxyXG5cdFx0XHR2YXIgc3RhdGUgPSBKU09OLnBhcnNlKHAuc3RhdGUpO1xyXG5cclxuXHRcdFx0Ly8gQWRkIHRoaXMgcGF0aCBhcyB0aGUgcmVkaXJlY3RfdXJpXHJcblx0XHRcdHAucmVkaXJlY3RfdXJpID0gc3RhdGUucmVkaXJlY3RfdXJpIHx8IGxvY2F0aW9uLmhyZWYucmVwbGFjZSgvW1xcP1xcI10uKiQvLCAnJyk7XHJcblxyXG5cdFx0XHQvLyBSZWRpcmVjdCB0byB0aGUgaG9zdFxyXG5cdFx0XHR2YXIgcGF0aCA9IHN0YXRlLm9hdXRoX3Byb3h5ICsgJz8nICsgX3RoaXMucGFyYW0ocCk7XHJcblxyXG5cdFx0XHRsb2NhdGlvbi5hc3NpZ24ocGF0aCk7XHJcblxyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gU2F2ZSBzZXNzaW9uLCBmcm9tIHJlZGlyZWN0ZWQgYXV0aGVudGljYXRpb25cclxuXHRcdC8vICNhY2Nlc3NfdG9rZW4gaGFzIGNvbWUgaW4/XHJcblx0XHQvL1xyXG5cdFx0Ly8gRkFDRUJPT0sgaXMgcmV0dXJuaW5nIGF1dGggZXJyb3JzIHdpdGhpbiBhcyBhIHF1ZXJ5X3N0cmluZy4uLiB0aGF0cyBhIHN0aWNrbGVyIGZvciBjb25zaXN0ZW5jeS5cclxuXHRcdC8vIFNvdW5kQ2xvdWQgaXMgdGhlIHN0YXRlIGluIHRoZSBxdWVyeXN0cmluZyBhbmQgdGhlIHRva2VuIGluIHRoZSBoYXNodGFnLCBzbyB3ZSdsbCBtaXggdGhlIHR3byB0b2dldGhlclxyXG5cclxuXHRcdHAgPSBfdGhpcy5tZXJnZShfdGhpcy5wYXJhbShsb2NhdGlvbi5zZWFyY2ggfHwgJycpLCBfdGhpcy5wYXJhbShsb2NhdGlvbi5oYXNoIHx8ICcnKSk7XHJcblxyXG5cdFx0Ly8gSWYgcC5zdGF0ZVxyXG5cdFx0aWYgKHAgJiYgJ3N0YXRlJyBpbiBwKSB7XHJcblxyXG5cdFx0XHQvLyBSZW1vdmUgYW55IGFkZGl0aW9uIGluZm9ybWF0aW9uXHJcblx0XHRcdC8vIEUuZy4gcC5zdGF0ZSA9ICdmYWNlYm9vay5wYWdlJztcclxuXHRcdFx0dHJ5IHtcclxuXHRcdFx0XHR2YXIgYSA9IEpTT04ucGFyc2UocC5zdGF0ZSk7XHJcblx0XHRcdFx0X3RoaXMuZXh0ZW5kKHAsIGEpO1xyXG5cdFx0XHR9XHJcblx0XHRcdGNhdGNoIChlKSB7XHJcblx0XHRcdFx0Y29uc29sZS5lcnJvcignQ291bGQgbm90IGRlY29kZSBzdGF0ZSBwYXJhbWV0ZXInKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0Ly8gQWNjZXNzX3Rva2VuP1xyXG5cdFx0XHRpZiAoKCdhY2Nlc3NfdG9rZW4nIGluIHAgJiYgcC5hY2Nlc3NfdG9rZW4pICYmIHAubmV0d29yaykge1xyXG5cclxuXHRcdFx0XHRpZiAoIXAuZXhwaXJlc19pbiB8fCBwYXJzZUludChwLmV4cGlyZXNfaW4sIDEwKSA9PT0gMCkge1xyXG5cdFx0XHRcdFx0Ly8gSWYgcC5leHBpcmVzX2luIGlzIHVuc2V0LCBzZXQgdG8gMFxyXG5cdFx0XHRcdFx0cC5leHBpcmVzX2luID0gMDtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdHAuZXhwaXJlc19pbiA9IHBhcnNlSW50KHAuZXhwaXJlc19pbiwgMTApO1xyXG5cdFx0XHRcdHAuZXhwaXJlcyA9ICgobmV3IERhdGUoKSkuZ2V0VGltZSgpIC8gMWUzKSArIChwLmV4cGlyZXNfaW4gfHwgKDYwICogNjAgKiAyNCAqIDM2NSkpO1xyXG5cclxuXHRcdFx0XHQvLyBMZXRzIHVzZSB0aGUgXCJzdGF0ZVwiIHRvIGFzc2lnbiBpdCB0byBvbmUgb2Ygb3VyIG5ldHdvcmtzXHJcblx0XHRcdFx0YXV0aENhbGxiYWNrKHAsIHdpbmRvdywgcGFyZW50KTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0Ly8gRXJyb3I9P1xyXG5cdFx0XHQvLyAmZXJyb3JfZGVzY3JpcHRpb249P1xyXG5cdFx0XHQvLyAmc3RhdGU9P1xyXG5cdFx0XHRlbHNlIGlmICgoJ2Vycm9yJyBpbiBwICYmIHAuZXJyb3IpICYmIHAubmV0d29yaykge1xyXG5cclxuXHRcdFx0XHRwLmVycm9yID0ge1xyXG5cdFx0XHRcdFx0Y29kZTogcC5lcnJvcixcclxuXHRcdFx0XHRcdG1lc3NhZ2U6IHAuZXJyb3JfbWVzc2FnZSB8fCBwLmVycm9yX2Rlc2NyaXB0aW9uXHJcblx0XHRcdFx0fTtcclxuXHJcblx0XHRcdFx0Ly8gTGV0IHRoZSBzdGF0ZSBoYW5kbGVyIGhhbmRsZSBpdFxyXG5cdFx0XHRcdGF1dGhDYWxsYmFjayhwLCB3aW5kb3csIHBhcmVudCk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdC8vIEFQSSBjYWxsLCBvciBhIGNhbmNlbGxlZCBsb2dpblxyXG5cdFx0XHQvLyBSZXN1bHQgaXMgc2VyaWFsaXplZCBKU09OIHN0cmluZ1xyXG5cdFx0XHRlbHNlIGlmIChwLmNhbGxiYWNrICYmIHAuY2FsbGJhY2sgaW4gcGFyZW50KSB7XHJcblxyXG5cdFx0XHRcdC8vIFRyaWdnZXIgYSBmdW5jdGlvbiBpbiB0aGUgcGFyZW50XHJcblx0XHRcdFx0dmFyIHJlcyA9ICdyZXN1bHQnIGluIHAgJiYgcC5yZXN1bHQgPyBKU09OLnBhcnNlKHAucmVzdWx0KSA6IGZhbHNlO1xyXG5cclxuXHRcdFx0XHQvLyBUcmlnZ2VyIHRoZSBjYWxsYmFjayBvbiB0aGUgcGFyZW50XHJcblx0XHRcdFx0Y2FsbGJhY2socGFyZW50LCBwLmNhbGxiYWNrKShyZXMpO1xyXG5cdFx0XHRcdGNsb3NlV2luZG93KCk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdC8vIElmIHRoaXMgcGFnZSBpcyBzdGlsbCBvcGVuXHJcblx0XHRcdGlmIChwLnBhZ2VfdXJpKSB7XHJcblx0XHRcdFx0bG9jYXRpb24uYXNzaWduKHAucGFnZV91cmkpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gT0F1dGggcmVkaXJlY3QsIGZpeGVzIFVSSSBmcmFnbWVudHMgZnJvbSBiZWluZyBsb3N0IGluIFNhZmFyaVxyXG5cdFx0Ly8gKFVSSSBGcmFnbWVudHMgd2l0aGluIDMwMiBMb2NhdGlvbiBVUkkgYXJlIGxvc3Qgb3ZlciBIVFRQUylcclxuXHRcdC8vIExvYWRpbmcgdGhlIHJlZGlyZWN0Lmh0bWwgYmVmb3JlIHRyaWdnZXJpbmcgdGhlIE9BdXRoIEZsb3cgc2VlbXMgdG8gZml4IGl0LlxyXG5cdFx0ZWxzZSBpZiAoJ29hdXRoX3JlZGlyZWN0JyBpbiBwKSB7XHJcblxyXG5cdFx0XHRsb2NhdGlvbi5hc3NpZ24oZGVjb2RlVVJJQ29tcG9uZW50KHAub2F1dGhfcmVkaXJlY3QpKTtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cclxuXHRcdC8vIFRyaWdnZXIgYSBjYWxsYmFjayB0byBhdXRoZW50aWNhdGVcclxuXHRcdGZ1bmN0aW9uIGF1dGhDYWxsYmFjayhvYmosIHdpbmRvdywgcGFyZW50KSB7XHJcblxyXG5cdFx0XHR2YXIgY2IgPSBvYmouY2FsbGJhY2s7XHJcblx0XHRcdHZhciBuZXR3b3JrID0gb2JqLm5ldHdvcms7XHJcblxyXG5cdFx0XHQvLyBUcmlnZ2VyIHRoZSBjYWxsYmFjayBvbiB0aGUgcGFyZW50XHJcblx0XHRcdF90aGlzLnN0b3JlKG5ldHdvcmssIG9iaik7XHJcblxyXG5cdFx0XHQvLyBJZiB0aGlzIGlzIGEgcGFnZSByZXF1ZXN0IGl0IGhhcyBubyBwYXJlbnQgb3Igb3BlbmVyIHdpbmRvdyB0byBoYW5kbGUgY2FsbGJhY2tzXHJcblx0XHRcdGlmICgoJ2Rpc3BsYXknIGluIG9iaikgJiYgb2JqLmRpc3BsYXkgPT09ICdwYWdlJykge1xyXG5cdFx0XHRcdHJldHVybjtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0Ly8gUmVtb3ZlIGZyb20gc2Vzc2lvbiBvYmplY3RcclxuXHRcdFx0aWYgKHBhcmVudCAmJiBjYiAmJiBjYiBpbiBwYXJlbnQpIHtcclxuXHJcblx0XHRcdFx0dHJ5IHtcclxuXHRcdFx0XHRcdGRlbGV0ZSBvYmouY2FsbGJhY2s7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdGNhdGNoIChlKSB7fVxyXG5cclxuXHRcdFx0XHQvLyBVcGRhdGUgc3RvcmVcclxuXHRcdFx0XHRfdGhpcy5zdG9yZShuZXR3b3JrLCBvYmopO1xyXG5cclxuXHRcdFx0XHQvLyBDYWxsIHRoZSBnbG9iYWxFdmVudCBmdW5jdGlvbiBvbiB0aGUgcGFyZW50XHJcblx0XHRcdFx0Ly8gSXQncyBzYWZlciB0byBwYXNzIGJhY2sgYSBzdHJpbmcgdG8gdGhlIHBhcmVudCxcclxuXHRcdFx0XHQvLyBSYXRoZXIgdGhhbiBhbiBvYmplY3QvYXJyYXkgKGJldHRlciBmb3IgSUU4KVxyXG5cdFx0XHRcdHZhciBzdHIgPSBKU09OLnN0cmluZ2lmeShvYmopO1xyXG5cclxuXHRcdFx0XHR0cnkge1xyXG5cdFx0XHRcdFx0Y2FsbGJhY2socGFyZW50LCBjYikoc3RyKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0Y2F0Y2ggKGUpIHtcclxuXHRcdFx0XHRcdC8vIEVycm9yIHRocm93biB3aGlsc3QgZXhlY3V0aW5nIHBhcmVudCBjYWxsYmFja1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0Y2xvc2VXaW5kb3coKTtcclxuXHRcdH1cclxuXHJcblx0XHRmdW5jdGlvbiBjYWxsYmFjayhwYXJlbnQsIGNhbGxiYWNrSUQpIHtcclxuXHRcdFx0aWYgKGNhbGxiYWNrSUQuaW5kZXhPZignX2hlbGxvanNfJykgIT09IDApIHtcclxuXHRcdFx0XHRyZXR1cm4gZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0XHR0aHJvdyAnQ291bGQgbm90IGV4ZWN1dGUgY2FsbGJhY2sgJyArIGNhbGxiYWNrSUQ7XHJcblx0XHRcdFx0fTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0cmV0dXJuIHBhcmVudFtjYWxsYmFja0lEXTtcclxuXHRcdH1cclxuXHJcblx0XHRmdW5jdGlvbiBjbG9zZVdpbmRvdygpIHtcclxuXHJcblx0XHRcdGlmICh3aW5kb3cuZnJhbWVFbGVtZW50KSB7XHJcblx0XHRcdFx0Ly8gSW5zaWRlIGFuIGlmcmFtZSwgcmVtb3ZlIGZyb20gcGFyZW50XHJcblx0XHRcdFx0cGFyZW50LmRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQod2luZG93LmZyYW1lRWxlbWVudCk7XHJcblx0XHRcdH1cclxuXHRcdFx0ZWxzZSB7XHJcblx0XHRcdFx0Ly8gQ2xvc2UgdGhpcyBjdXJyZW50IHdpbmRvd1xyXG5cdFx0XHRcdHRyeSB7XHJcblx0XHRcdFx0XHR3aW5kb3cuY2xvc2UoKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0Y2F0Y2ggKGUpIHt9XHJcblxyXG5cdFx0XHRcdC8vIElPUyBidWcgd29udCBsZXQgdXMgY2xvc2UgYSBwb3B1cCBpZiBzdGlsbCBsb2FkaW5nXHJcblx0XHRcdFx0aWYgKHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKSB7XHJcblx0XHRcdFx0XHR3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsIGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdFx0XHR3aW5kb3cuY2xvc2UoKTtcclxuXHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cclxuXHRcdH1cclxuXHR9XHJcbn0pO1xyXG5cclxuLy8gRXZlbnRzXHJcbi8vIEV4dGVuZCB0aGUgaGVsbG8gb2JqZWN0IHdpdGggaXRzIG93biBldmVudCBpbnN0YW5jZVxyXG5oZWxsby51dGlscy5FdmVudC5jYWxsKGhlbGxvKTtcclxuXHJcbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcbi8vIE1vbml0b3Jpbmcgc2Vzc2lvbiBzdGF0ZVxyXG4vLyBDaGVjayBmb3Igc2Vzc2lvbiBjaGFuZ2VzXHJcbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcblxyXG4oZnVuY3Rpb24oaGVsbG8pIHtcclxuXHJcblx0Ly8gTW9uaXRvciBmb3IgYSBjaGFuZ2UgaW4gc3RhdGUgYW5kIGZpcmVcclxuXHR2YXIgb2xkU2Vzc2lvbnMgPSB7fTtcclxuXHJcblx0Ly8gSGFzaCBvZiBleHBpcmVkIHRva2Vuc1xyXG5cdHZhciBleHBpcmVkID0ge307XHJcblxyXG5cdC8vIExpc3RlbiB0byBvdGhlciB0cmlnZ2VycyB0byBBdXRoIGV2ZW50cywgdXNlIHRoZXNlIHRvIHVwZGF0ZSB0aGlzXHJcblx0aGVsbG8ub24oJ2F1dGgubG9naW4sIGF1dGgubG9nb3V0JywgZnVuY3Rpb24oYXV0aCkge1xyXG5cdFx0aWYgKGF1dGggJiYgdHlwZW9mIChhdXRoKSA9PT0gJ29iamVjdCcgJiYgYXV0aC5uZXR3b3JrKSB7XHJcblx0XHRcdG9sZFNlc3Npb25zW2F1dGgubmV0d29ya10gPSBoZWxsby51dGlscy5zdG9yZShhdXRoLm5ldHdvcmspIHx8IHt9O1xyXG5cdFx0fVxyXG5cdH0pO1xyXG5cclxuXHQoZnVuY3Rpb24gc2VsZigpIHtcclxuXHJcblx0XHR2YXIgQ1VSUkVOVF9USU1FID0gKChuZXcgRGF0ZSgpKS5nZXRUaW1lKCkgLyAxZTMpO1xyXG5cdFx0dmFyIGVtaXQgPSBmdW5jdGlvbihldmVudE5hbWUpIHtcclxuXHRcdFx0aGVsbG8uZW1pdCgnYXV0aC4nICsgZXZlbnROYW1lLCB7XHJcblx0XHRcdFx0bmV0d29yazogbmFtZSxcclxuXHRcdFx0XHRhdXRoUmVzcG9uc2U6IHNlc3Npb25cclxuXHRcdFx0fSk7XHJcblx0XHR9O1xyXG5cclxuXHRcdC8vIExvb3AgdGhyb3VnaCB0aGUgc2VydmljZXNcclxuXHRcdGZvciAodmFyIG5hbWUgaW4gaGVsbG8uc2VydmljZXMpIHtpZiAoaGVsbG8uc2VydmljZXMuaGFzT3duUHJvcGVydHkobmFtZSkpIHtcclxuXHJcblx0XHRcdGlmICghaGVsbG8uc2VydmljZXNbbmFtZV0uaWQpIHtcclxuXHRcdFx0XHQvLyBXZSBoYXZlbid0IGF0dGFjaGVkIGFuIElEIHNvIGRvbnQgbGlzdGVuLlxyXG5cdFx0XHRcdGNvbnRpbnVlO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQvLyBHZXQgc2Vzc2lvblxyXG5cdFx0XHR2YXIgc2Vzc2lvbiA9IGhlbGxvLnV0aWxzLnN0b3JlKG5hbWUpIHx8IHt9O1xyXG5cdFx0XHR2YXIgcHJvdmlkZXIgPSBoZWxsby5zZXJ2aWNlc1tuYW1lXTtcclxuXHRcdFx0dmFyIG9sZFNlc3MgPSBvbGRTZXNzaW9uc1tuYW1lXSB8fCB7fTtcclxuXHJcblx0XHRcdC8vIExpc3RlbiBmb3IgZ2xvYmFsRXZlbnRzIHRoYXQgZGlkIG5vdCBnZXQgdHJpZ2dlcmVkIGZyb20gdGhlIGNoaWxkXHJcblx0XHRcdGlmIChzZXNzaW9uICYmICdjYWxsYmFjaycgaW4gc2Vzc2lvbikge1xyXG5cclxuXHRcdFx0XHQvLyBUbyBkbyByZW1vdmUgZnJvbSBzZXNzaW9uIG9iamVjdC4uLlxyXG5cdFx0XHRcdHZhciBjYiA9IHNlc3Npb24uY2FsbGJhY2s7XHJcblx0XHRcdFx0dHJ5IHtcclxuXHRcdFx0XHRcdGRlbGV0ZSBzZXNzaW9uLmNhbGxiYWNrO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRjYXRjaCAoZSkge31cclxuXHJcblx0XHRcdFx0Ly8gVXBkYXRlIHN0b3JlXHJcblx0XHRcdFx0Ly8gUmVtb3ZpbmcgdGhlIGNhbGxiYWNrXHJcblx0XHRcdFx0aGVsbG8udXRpbHMuc3RvcmUobmFtZSwgc2Vzc2lvbik7XHJcblxyXG5cdFx0XHRcdC8vIEVtaXQgZ2xvYmFsIGV2ZW50c1xyXG5cdFx0XHRcdHRyeSB7XHJcblx0XHRcdFx0XHR3aW5kb3dbY2JdKHNlc3Npb24pO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRjYXRjaCAoZSkge31cclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0Ly8gUmVmcmVzaCB0b2tlblxyXG5cdFx0XHRpZiAoc2Vzc2lvbiAmJiAoJ2V4cGlyZXMnIGluIHNlc3Npb24pICYmIHNlc3Npb24uZXhwaXJlcyA8IENVUlJFTlRfVElNRSkge1xyXG5cclxuXHRcdFx0XHQvLyBJZiBhdXRvIHJlZnJlc2ggaXMgcG9zc2libGVcclxuXHRcdFx0XHQvLyBFaXRoZXIgdGhlIGJyb3dzZXIgc3VwcG9ydHNcclxuXHRcdFx0XHR2YXIgcmVmcmVzaCA9IHByb3ZpZGVyLnJlZnJlc2ggfHwgc2Vzc2lvbi5yZWZyZXNoX3Rva2VuO1xyXG5cclxuXHRcdFx0XHQvLyBIYXMgdGhlIHJlZnJlc2ggYmVlbiBydW4gcmVjZW50bHk/XHJcblx0XHRcdFx0aWYgKHJlZnJlc2ggJiYgKCEobmFtZSBpbiBleHBpcmVkKSB8fCBleHBpcmVkW25hbWVdIDwgQ1VSUkVOVF9USU1FKSkge1xyXG5cdFx0XHRcdFx0Ly8gVHJ5IHRvIHJlc2lnbmluXHJcblx0XHRcdFx0XHRoZWxsby5lbWl0KCdub3RpY2UnLCBuYW1lICsgJyBoYXMgZXhwaXJlZCB0cnlpbmcgdG8gcmVzaWduaW4nKTtcclxuXHRcdFx0XHRcdGhlbGxvLmxvZ2luKG5hbWUsIHtkaXNwbGF5OiAnbm9uZScsIGZvcmNlOiBmYWxzZX0pO1xyXG5cclxuXHRcdFx0XHRcdC8vIFVwZGF0ZSBleHBpcmVkLCBldmVyeSAxMCBtaW51dGVzXHJcblx0XHRcdFx0XHRleHBpcmVkW25hbWVdID0gQ1VSUkVOVF9USU1FICsgNjAwO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0Ly8gRG9lcyB0aGlzIHByb3ZpZGVyIG5vdCBzdXBwb3J0IHJlZnJlc2hcclxuXHRcdFx0XHRlbHNlIGlmICghcmVmcmVzaCAmJiAhKG5hbWUgaW4gZXhwaXJlZCkpIHtcclxuXHRcdFx0XHRcdC8vIExhYmVsIHRoZSBldmVudFxyXG5cdFx0XHRcdFx0ZW1pdCgnZXhwaXJlZCcpO1xyXG5cdFx0XHRcdFx0ZXhwaXJlZFtuYW1lXSA9IHRydWU7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHQvLyBJZiBzZXNzaW9uIGhhcyBleHBpcmVkIHRoZW4gd2UgZG9udCB3YW50IHRvIHN0b3JlIGl0cyB2YWx1ZSB1bnRpbCBpdCBjYW4gYmUgZXN0YWJsaXNoZWQgdGhhdCBpdHMgYmVlbiB1cGRhdGVkXHJcblx0XHRcdFx0Y29udGludWU7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdC8vIEhhcyBzZXNzaW9uIGNoYW5nZWQ/XHJcblx0XHRcdGVsc2UgaWYgKG9sZFNlc3MuYWNjZXNzX3Rva2VuID09PSBzZXNzaW9uLmFjY2Vzc190b2tlbiAmJlxyXG5cdFx0XHRvbGRTZXNzLmV4cGlyZXMgPT09IHNlc3Npb24uZXhwaXJlcykge1xyXG5cdFx0XHRcdGNvbnRpbnVlO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQvLyBBY2Nlc3NfdG9rZW4gaGFzIGJlZW4gcmVtb3ZlZFxyXG5cdFx0XHRlbHNlIGlmICghc2Vzc2lvbi5hY2Nlc3NfdG9rZW4gJiYgb2xkU2Vzcy5hY2Nlc3NfdG9rZW4pIHtcclxuXHRcdFx0XHRlbWl0KCdsb2dvdXQnKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0Ly8gQWNjZXNzX3Rva2VuIGhhcyBiZWVuIGNyZWF0ZWRcclxuXHRcdFx0ZWxzZSBpZiAoc2Vzc2lvbi5hY2Nlc3NfdG9rZW4gJiYgIW9sZFNlc3MuYWNjZXNzX3Rva2VuKSB7XHJcblx0XHRcdFx0ZW1pdCgnbG9naW4nKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0Ly8gQWNjZXNzX3Rva2VuIGhhcyBiZWVuIHVwZGF0ZWRcclxuXHRcdFx0ZWxzZSBpZiAoc2Vzc2lvbi5leHBpcmVzICE9PSBvbGRTZXNzLmV4cGlyZXMpIHtcclxuXHRcdFx0XHRlbWl0KCd1cGRhdGUnKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0Ly8gVXBkYXRlZCBzdG9yZWQgc2Vzc2lvblxyXG5cdFx0XHRvbGRTZXNzaW9uc1tuYW1lXSA9IHNlc3Npb247XHJcblxyXG5cdFx0XHQvLyBSZW1vdmUgdGhlIGV4cGlyZWQgZmxhZ3NcclxuXHRcdFx0aWYgKG5hbWUgaW4gZXhwaXJlZCkge1xyXG5cdFx0XHRcdGRlbGV0ZSBleHBpcmVkW25hbWVdO1xyXG5cdFx0XHR9XHJcblx0XHR9fVxyXG5cclxuXHRcdC8vIENoZWNrIGVycm9yIGV2ZW50c1xyXG5cdFx0c2V0VGltZW91dChzZWxmLCAxMDAwKTtcclxuXHR9KSgpO1xyXG5cclxufSkoaGVsbG8pO1xyXG5cclxuLy8gRU9GIENPUkUgbGliXHJcbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuXHJcbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcbi8vIEFQSVxyXG4vLyBAcGFyYW0gcGF0aCAgICBzdHJpbmdcclxuLy8gQHBhcmFtIHF1ZXJ5ICAgb2JqZWN0IChvcHRpb25hbClcclxuLy8gQHBhcmFtIG1ldGhvZCAgc3RyaW5nIChvcHRpb25hbClcclxuLy8gQHBhcmFtIGRhdGEgICAgb2JqZWN0IChvcHRpb25hbClcclxuLy8gQHBhcmFtIHRpbWVvdXQgaW50ZWdlciAob3B0aW9uYWwpXHJcbi8vIEBwYXJhbSBjYWxsYmFjayAgZnVuY3Rpb24gKG9wdGlvbmFsKVxyXG5cclxuaGVsbG8uYXBpID0gZnVuY3Rpb24oKSB7XHJcblxyXG5cdC8vIFNob3J0aGFuZFxyXG5cdHZhciBfdGhpcyA9IHRoaXM7XHJcblx0dmFyIHV0aWxzID0gX3RoaXMudXRpbHM7XHJcblx0dmFyIGVycm9yID0gdXRpbHMuZXJyb3I7XHJcblxyXG5cdC8vIENvbnN0cnVjdCBhIG5ldyBQcm9taXNlIG9iamVjdFxyXG5cdHZhciBwcm9taXNlID0gdXRpbHMuUHJvbWlzZSgpO1xyXG5cclxuXHQvLyBBcmd1bWVudHNcclxuXHR2YXIgcCA9IHV0aWxzLmFyZ3Moe3BhdGg6ICdzIScsIHF1ZXJ5OiAnbycsIG1ldGhvZDogJ3MnLCBkYXRhOiAnbycsIHRpbWVvdXQ6ICdpJywgY2FsbGJhY2s6ICdmJ30sIGFyZ3VtZW50cyk7XHJcblxyXG5cdC8vIE1ldGhvZFxyXG5cdHAubWV0aG9kID0gKHAubWV0aG9kIHx8ICdnZXQnKS50b0xvd2VyQ2FzZSgpO1xyXG5cclxuXHQvLyBIZWFkZXJzXHJcblx0cC5oZWFkZXJzID0gcC5oZWFkZXJzIHx8IHt9O1xyXG5cclxuXHQvLyBRdWVyeVxyXG5cdHAucXVlcnkgPSBwLnF1ZXJ5IHx8IHt9O1xyXG5cclxuXHQvLyBJZiBnZXQsIHB1dCBhbGwgcGFyYW1ldGVycyBpbnRvIHF1ZXJ5XHJcblx0aWYgKHAubWV0aG9kID09PSAnZ2V0JyB8fCBwLm1ldGhvZCA9PT0gJ2RlbGV0ZScpIHtcclxuXHRcdHV0aWxzLmV4dGVuZChwLnF1ZXJ5LCBwLmRhdGEpO1xyXG5cdFx0cC5kYXRhID0ge307XHJcblx0fVxyXG5cclxuXHR2YXIgZGF0YSA9IHAuZGF0YSA9IHAuZGF0YSB8fCB7fTtcclxuXHJcblx0Ly8gQ29tcGxldGVkIGV2ZW50IGNhbGxiYWNrXHJcblx0cHJvbWlzZS50aGVuKHAuY2FsbGJhY2ssIHAuY2FsbGJhY2spO1xyXG5cclxuXHQvLyBSZW1vdmUgdGhlIG5ldHdvcmsgZnJvbSBwYXRoLCBlLmcuIGZhY2Vib29rOi9tZS9mcmllbmRzXHJcblx0Ly8gUmVzdWx0cyBpbiB7IG5ldHdvcmsgOiBmYWNlYm9vaywgcGF0aCA6IG1lL2ZyaWVuZHMgfVxyXG5cdGlmICghcC5wYXRoKSB7XHJcblx0XHRyZXR1cm4gcHJvbWlzZS5yZWplY3QoZXJyb3IoJ2ludmFsaWRfcGF0aCcsICdNaXNzaW5nIHRoZSBwYXRoIHBhcmFtZXRlciBmcm9tIHRoZSByZXF1ZXN0JykpO1xyXG5cdH1cclxuXHJcblx0cC5wYXRoID0gcC5wYXRoLnJlcGxhY2UoL15cXC8rLywgJycpO1xyXG5cdHZhciBhID0gKHAucGF0aC5zcGxpdCgvW1xcL1xcOl0vLCAyKSB8fCBbXSlbMF0udG9Mb3dlckNhc2UoKTtcclxuXHJcblx0aWYgKGEgaW4gX3RoaXMuc2VydmljZXMpIHtcclxuXHRcdHAubmV0d29yayA9IGE7XHJcblx0XHR2YXIgcmVnID0gbmV3IFJlZ0V4cCgnXicgKyBhICsgJzo/XFwvPycpO1xyXG5cdFx0cC5wYXRoID0gcC5wYXRoLnJlcGxhY2UocmVnLCAnJyk7XHJcblx0fVxyXG5cclxuXHQvLyBOZXR3b3JrICYgUHJvdmlkZXJcclxuXHQvLyBEZWZpbmUgdGhlIG5ldHdvcmsgdGhhdCB0aGlzIHJlcXVlc3QgaXMgbWFkZSBmb3JcclxuXHRwLm5ldHdvcmsgPSBfdGhpcy5zZXR0aW5ncy5kZWZhdWx0X3NlcnZpY2UgPSBwLm5ldHdvcmsgfHwgX3RoaXMuc2V0dGluZ3MuZGVmYXVsdF9zZXJ2aWNlO1xyXG5cdHZhciBvID0gX3RoaXMuc2VydmljZXNbcC5uZXR3b3JrXTtcclxuXHJcblx0Ly8gSU5WQUxJRFxyXG5cdC8vIElzIHRoZXJlIG5vIHNlcnZpY2UgYnkgdGhlIGdpdmVuIG5ldHdvcmsgbmFtZT9cclxuXHRpZiAoIW8pIHtcclxuXHRcdHJldHVybiBwcm9taXNlLnJlamVjdChlcnJvcignaW52YWxpZF9uZXR3b3JrJywgJ0NvdWxkIG5vdCBtYXRjaCB0aGUgc2VydmljZSByZXF1ZXN0ZWQ6ICcgKyBwLm5ldHdvcmspKTtcclxuXHR9XHJcblxyXG5cdC8vIFBBVEhcclxuXHQvLyBBcyBsb25nIGFzIHRoZSBwYXRoIGlzbid0IGZsYWdnZWQgYXMgdW5hdmFpYWJsZSwgZS5nLiBwYXRoID09IGZhbHNlXHJcblxyXG5cdGlmICghKCEocC5tZXRob2QgaW4gbykgfHwgIShwLnBhdGggaW4gb1twLm1ldGhvZF0pIHx8IG9bcC5tZXRob2RdW3AucGF0aF0gIT09IGZhbHNlKSkge1xyXG5cdFx0cmV0dXJuIHByb21pc2UucmVqZWN0KGVycm9yKCdpbnZhbGlkX3BhdGgnLCAnVGhlIHByb3ZpZGVkIHBhdGggaXMgbm90IGF2YWlsYWJsZSBvbiB0aGUgc2VsZWN0ZWQgbmV0d29yaycpKTtcclxuXHR9XHJcblxyXG5cdC8vIFBST1hZXHJcblx0Ly8gT0F1dGgxIGNhbGxzIGFsd2F5cyBuZWVkIGEgcHJveHlcclxuXHJcblx0aWYgKCFwLm9hdXRoX3Byb3h5KSB7XHJcblx0XHRwLm9hdXRoX3Byb3h5ID0gX3RoaXMuc2V0dGluZ3Mub2F1dGhfcHJveHk7XHJcblx0fVxyXG5cclxuXHRpZiAoISgncHJveHknIGluIHApKSB7XHJcblx0XHRwLnByb3h5ID0gcC5vYXV0aF9wcm94eSAmJiBvLm9hdXRoICYmIHBhcnNlSW50KG8ub2F1dGgudmVyc2lvbiwgMTApID09PSAxO1xyXG5cdH1cclxuXHJcblx0Ly8gVElNRU9VVFxyXG5cdC8vIEFkb3B0IHRpbWVvdXQgZnJvbSBnbG9iYWwgc2V0dGluZ3MgYnkgZGVmYXVsdFxyXG5cclxuXHRpZiAoISgndGltZW91dCcgaW4gcCkpIHtcclxuXHRcdHAudGltZW91dCA9IF90aGlzLnNldHRpbmdzLnRpbWVvdXQ7XHJcblx0fVxyXG5cclxuXHQvLyBGb3JtYXQgcmVzcG9uc2VcclxuXHQvLyBXaGV0aGVyIHRvIHJ1biB0aGUgcmF3IHJlc3BvbnNlIHRocm91Z2ggcG9zdCBwcm9jZXNzaW5nLlxyXG5cdGlmICghKCdmb3JtYXRSZXNwb25zZScgaW4gcCkpIHtcclxuXHRcdHAuZm9ybWF0UmVzcG9uc2UgPSB0cnVlO1xyXG5cdH1cclxuXHJcblx0Ly8gR2V0IHRoZSBjdXJyZW50IHNlc3Npb25cclxuXHQvLyBBcHBlbmQgdGhlIGFjY2Vzc190b2tlbiB0byB0aGUgcXVlcnlcclxuXHRwLmF1dGhSZXNwb25zZSA9IF90aGlzLmdldEF1dGhSZXNwb25zZShwLm5ldHdvcmspO1xyXG5cdGlmIChwLmF1dGhSZXNwb25zZSAmJiBwLmF1dGhSZXNwb25zZS5hY2Nlc3NfdG9rZW4pIHtcclxuXHRcdHAucXVlcnkuYWNjZXNzX3Rva2VuID0gcC5hdXRoUmVzcG9uc2UuYWNjZXNzX3Rva2VuO1xyXG5cdH1cclxuXHJcblx0dmFyIHVybCA9IHAucGF0aDtcclxuXHR2YXIgbTtcclxuXHJcblx0Ly8gU3RvcmUgdGhlIHF1ZXJ5IGFzIG9wdGlvbnNcclxuXHQvLyBUaGlzIGlzIHVzZWQgdG8gcG9wdWxhdGUgdGhlIHJlcXVlc3Qgb2JqZWN0IGJlZm9yZSB0aGUgZGF0YSBpcyBhdWdtZW50ZWQgYnkgdGhlIHByZXdyYXAgaGFuZGxlcnMuXHJcblx0cC5vcHRpb25zID0gdXRpbHMuY2xvbmUocC5xdWVyeSk7XHJcblxyXG5cdC8vIENsb25lIHRoZSBkYXRhIG9iamVjdFxyXG5cdC8vIFByZXZlbnQgdGhpcyBzY3JpcHQgb3ZlcndyaXRpbmcgdGhlIGRhdGEgb2YgdGhlIGluY29taW5nIG9iamVjdC5cclxuXHQvLyBFbnN1cmUgdGhhdCBldmVyeXRpbWUgd2UgcnVuIGFuIGl0ZXJhdGlvbiB0aGUgY2FsbGJhY2tzIGhhdmVuJ3QgcmVtb3ZlZCBzb21lIGRhdGFcclxuXHRwLmRhdGEgPSB1dGlscy5jbG9uZShkYXRhKTtcclxuXHJcblx0Ly8gVVJMIE1hcHBpbmdcclxuXHQvLyBJcyB0aGVyZSBhIG1hcCBmb3IgdGhlIGdpdmVuIFVSTD9cclxuXHR2YXIgYWN0aW9ucyA9IG9beydkZWxldGUnOiAnZGVsJ31bcC5tZXRob2RdIHx8IHAubWV0aG9kXSB8fCB7fTtcclxuXHJcblx0Ly8gRXh0cmFwb2xhdGUgdGhlIFF1ZXJ5U3RyaW5nXHJcblx0Ly8gUHJvdmlkZSBhIGNsZWFuIHBhdGhcclxuXHQvLyBNb3ZlIHRoZSBxdWVyeXN0cmluZyBpbnRvIHRoZSBkYXRhXHJcblx0aWYgKHAubWV0aG9kID09PSAnZ2V0Jykge1xyXG5cclxuXHRcdHZhciBxdWVyeSA9IHVybC5zcGxpdCgvW1xcPyNdLylbMV07XHJcblx0XHRpZiAocXVlcnkpIHtcclxuXHRcdFx0dXRpbHMuZXh0ZW5kKHAucXVlcnksIHV0aWxzLnBhcmFtKHF1ZXJ5KSk7XHJcblxyXG5cdFx0XHQvLyBSZW1vdmUgdGhlIHF1ZXJ5IHBhcnQgZnJvbSB0aGUgVVJMXHJcblx0XHRcdHVybCA9IHVybC5yZXBsYWNlKC9cXD8uKj8oI3wkKS8sICckMScpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0Ly8gSXMgdGhlIGhhc2ggZnJhZ21lbnQgZGVmaW5lZFxyXG5cdGlmICgobSA9IHVybC5tYXRjaCgvIyguKykvLCAnJykpKSB7XHJcblx0XHR1cmwgPSB1cmwuc3BsaXQoJyMnKVswXTtcclxuXHRcdHAucGF0aCA9IG1bMV07XHJcblx0fVxyXG5cdGVsc2UgaWYgKHVybCBpbiBhY3Rpb25zKSB7XHJcblx0XHRwLnBhdGggPSB1cmw7XHJcblx0XHR1cmwgPSBhY3Rpb25zW3VybF07XHJcblx0fVxyXG5cdGVsc2UgaWYgKCdkZWZhdWx0JyBpbiBhY3Rpb25zKSB7XHJcblx0XHR1cmwgPSBhY3Rpb25zWydkZWZhdWx0J107XHJcblx0fVxyXG5cclxuXHQvLyBSZWRpcmVjdCBIYW5kbGVyXHJcblx0Ly8gVGhpcyBkZWZpbmVzIGZvciB0aGUgRm9ybStJZnJhbWUrSGFzaCBoYWNrIHdoZXJlIHRvIHJldHVybiB0aGUgcmVzdWx0cyB0b28uXHJcblx0cC5yZWRpcmVjdF91cmkgPSBfdGhpcy5zZXR0aW5ncy5yZWRpcmVjdF91cmk7XHJcblxyXG5cdC8vIERlZmluZSBGb3JtYXRIYW5kbGVyXHJcblx0Ly8gVGhlIHJlcXVlc3QgY2FuIGJlIHByb2Nlc2VkIGluIGEgbXVsdGl0dWRlIG9mIHdheXNcclxuXHQvLyBIZXJlJ3MgdGhlIG9wdGlvbnMgLSBkZXBlbmRpbmcgb24gdGhlIGJyb3dzZXIgYW5kIGVuZHBvaW50XHJcblx0cC54aHIgPSBvLnhocjtcclxuXHRwLmpzb25wID0gby5qc29ucDtcclxuXHRwLmZvcm0gPSBvLmZvcm07XHJcblxyXG5cdC8vIE1ha2UgcmVxdWVzdFxyXG5cdGlmICh0eXBlb2YgKHVybCkgPT09ICdmdW5jdGlvbicpIHtcclxuXHRcdC8vIERvZXMgc2VsZiBoYXZlIGl0cyBvd24gY2FsbGJhY2s/XHJcblx0XHR1cmwocCwgZ2V0UGF0aCk7XHJcblx0fVxyXG5cdGVsc2Uge1xyXG5cdFx0Ly8gRWxzZSB0aGUgVVJMIGlzIGEgc3RyaW5nXHJcblx0XHRnZXRQYXRoKHVybCk7XHJcblx0fVxyXG5cclxuXHRyZXR1cm4gcHJvbWlzZS5wcm94eTtcclxuXHJcblx0Ly8gSWYgdXJsIG5lZWRzIGEgYmFzZVxyXG5cdC8vIFdyYXAgZXZlcnl0aGluZyBpblxyXG5cdGZ1bmN0aW9uIGdldFBhdGgodXJsKSB7XHJcblxyXG5cdFx0Ly8gRm9ybWF0IHRoZSBzdHJpbmcgaWYgaXQgbmVlZHMgaXRcclxuXHRcdHVybCA9IHVybC5yZXBsYWNlKC9cXEBcXHsoW2EtelxcX1xcLV0rKShcXHwuKj8pP1xcfS9naSwgZnVuY3Rpb24obSwga2V5LCBkZWZhdWx0cykge1xyXG5cdFx0XHR2YXIgdmFsID0gZGVmYXVsdHMgPyBkZWZhdWx0cy5yZXBsYWNlKC9eXFx8LywgJycpIDogJyc7XHJcblx0XHRcdGlmIChrZXkgaW4gcC5xdWVyeSkge1xyXG5cdFx0XHRcdHZhbCA9IHAucXVlcnlba2V5XTtcclxuXHRcdFx0XHRkZWxldGUgcC5xdWVyeVtrZXldO1xyXG5cdFx0XHR9XHJcblx0XHRcdGVsc2UgaWYgKHAuZGF0YSAmJiBrZXkgaW4gcC5kYXRhKSB7XHJcblx0XHRcdFx0dmFsID0gcC5kYXRhW2tleV07XHJcblx0XHRcdFx0ZGVsZXRlIHAuZGF0YVtrZXldO1xyXG5cdFx0XHR9XHJcblx0XHRcdGVsc2UgaWYgKCFkZWZhdWx0cykge1xyXG5cdFx0XHRcdHByb21pc2UucmVqZWN0KGVycm9yKCdtaXNzaW5nX2F0dHJpYnV0ZScsICdUaGUgYXR0cmlidXRlICcgKyBrZXkgKyAnIGlzIG1pc3NpbmcgZnJvbSB0aGUgcmVxdWVzdCcpKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0cmV0dXJuIHZhbDtcclxuXHRcdH0pO1xyXG5cclxuXHRcdC8vIEFkZCBiYXNlXHJcblx0XHRpZiAoIXVybC5tYXRjaCgvXmh0dHBzPzpcXC9cXC8vKSkge1xyXG5cdFx0XHR1cmwgPSBvLmJhc2UgKyB1cmw7XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gRGVmaW5lIHRoZSByZXF1ZXN0IFVSTFxyXG5cdFx0cC51cmwgPSB1cmw7XHJcblxyXG5cdFx0Ly8gTWFrZSB0aGUgSFRUUCByZXF1ZXN0IHdpdGggdGhlIGN1cmF0ZWQgcmVxdWVzdCBvYmplY3RcclxuXHRcdC8vIENBTExCQUNLIEhBTkRMRVJcclxuXHRcdC8vIEAgcmVzcG9uc2Ugb2JqZWN0XHJcblx0XHQvLyBAIHN0YXR1c0NvZGUgaW50ZWdlciBpZiBhdmFpbGFibGVcclxuXHRcdHV0aWxzLnJlcXVlc3QocCwgZnVuY3Rpb24ociwgaGVhZGVycykge1xyXG5cclxuXHRcdFx0Ly8gSXMgdGhpcyBhIHJhdyByZXNwb25zZT9cclxuXHRcdFx0aWYgKCFwLmZvcm1hdFJlc3BvbnNlKSB7XHJcblx0XHRcdFx0Ly8gQmFkIHJlcXVlc3Q/IGVycm9yIHN0YXR1c0NvZGUgb3Igb3RoZXJ3aXNlIGNvbnRhaW5zIGFuIGVycm9yIHJlc3BvbnNlIHZpcyBKU09OUD9cclxuXHRcdFx0XHRpZiAodHlwZW9mIGhlYWRlcnMgPT09ICdvYmplY3QnID8gKGhlYWRlcnMuc3RhdHVzQ29kZSA+PSA0MDApIDogKHR5cGVvZiByID09PSAnb2JqZWN0JyAmJiAnZXJyb3InIGluIHIpKSB7XHJcblx0XHRcdFx0XHRwcm9taXNlLnJlamVjdChyKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0ZWxzZSB7XHJcblx0XHRcdFx0XHRwcm9taXNlLmZ1bGZpbGwocik7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdC8vIFNob3VsZCB0aGlzIGJlIGFuIG9iamVjdFxyXG5cdFx0XHRpZiAociA9PT0gdHJ1ZSkge1xyXG5cdFx0XHRcdHIgPSB7c3VjY2Vzczp0cnVlfTtcclxuXHRcdFx0fVxyXG5cdFx0XHRlbHNlIGlmICghcikge1xyXG5cdFx0XHRcdHIgPSB7fTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0Ly8gVGhlIGRlbGV0ZSBjYWxsYmFjayBuZWVkcyBhIGJldHRlciByZXNwb25zZVxyXG5cdFx0XHRpZiAocC5tZXRob2QgPT09ICdkZWxldGUnKSB7XHJcblx0XHRcdFx0ciA9ICghciB8fCB1dGlscy5pc0VtcHR5KHIpKSA/IHtzdWNjZXNzOnRydWV9IDogcjtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0Ly8gRk9STUFUIFJFU1BPTlNFP1xyXG5cdFx0XHQvLyBEb2VzIHNlbGYgcmVxdWVzdCBoYXZlIGEgY29ycmVzcG9uZGluZyBmb3JtYXR0ZXJcclxuXHRcdFx0aWYgKG8ud3JhcCAmJiAoKHAucGF0aCBpbiBvLndyYXApIHx8ICgnZGVmYXVsdCcgaW4gby53cmFwKSkpIHtcclxuXHRcdFx0XHR2YXIgd3JhcCA9IChwLnBhdGggaW4gby53cmFwID8gcC5wYXRoIDogJ2RlZmF1bHQnKTtcclxuXHRcdFx0XHR2YXIgdGltZSA9IChuZXcgRGF0ZSgpKS5nZXRUaW1lKCk7XHJcblxyXG5cdFx0XHRcdC8vIEZPUk1BVCBSRVNQT05TRVxyXG5cdFx0XHRcdHZhciBiID0gby53cmFwW3dyYXBdKHIsIGhlYWRlcnMsIHApO1xyXG5cclxuXHRcdFx0XHQvLyBIYXMgdGhlIHJlc3BvbnNlIGJlZW4gdXR0ZXJseSBvdmVyd3JpdHRlbj9cclxuXHRcdFx0XHQvLyBUeXBpY2FsbHkgc2VsZiBhdWdtZW50cyB0aGUgZXhpc3Rpbmcgb2JqZWN0Li4gYnV0IGZvciB0aG9zZSByYXJlIG9jY2Fzc2lvbnNcclxuXHRcdFx0XHRpZiAoYikge1xyXG5cdFx0XHRcdFx0ciA9IGI7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQvLyBJcyB0aGVyZSBhIG5leHRfcGFnZSBkZWZpbmVkIGluIHRoZSByZXNwb25zZT9cclxuXHRcdFx0aWYgKHIgJiYgJ3BhZ2luZycgaW4gciAmJiByLnBhZ2luZy5uZXh0KSB7XHJcblxyXG5cdFx0XHRcdC8vIEFkZCB0aGUgcmVsYXRpdmUgcGF0aCBpZiBpdCBpcyBtaXNzaW5nIGZyb20gdGhlIHBhZ2luZy9uZXh0IHBhdGhcclxuXHRcdFx0XHRpZiAoci5wYWdpbmcubmV4dFswXSA9PT0gJz8nKSB7XHJcblx0XHRcdFx0XHRyLnBhZ2luZy5uZXh0ID0gcC5wYXRoICsgci5wYWdpbmcubmV4dDtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdC8vIFRoZSByZWxhdGl2ZSBwYXRoIGhhcyBiZWVuIGRlZmluZWQsIGxldHMgbWFya3VwIHRoZSBoYW5kbGVyIGluIHRoZSBIYXNoRnJhZ21lbnRcclxuXHRcdFx0XHRlbHNlIHtcclxuXHRcdFx0XHRcdHIucGFnaW5nLm5leHQgKz0gJyMnICsgcC5wYXRoO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0Ly8gRGlzcGF0Y2ggdG8gbGlzdGVuZXJzXHJcblx0XHRcdC8vIEVtaXQgZXZlbnRzIHdoaWNoIHBlcnRhaW4gdG8gdGhlIGZvcm1hdHRlZCByZXNwb25zZVxyXG5cdFx0XHRpZiAoIXIgfHwgJ2Vycm9yJyBpbiByKSB7XHJcblx0XHRcdFx0cHJvbWlzZS5yZWplY3Qocik7XHJcblx0XHRcdH1cclxuXHRcdFx0ZWxzZSB7XHJcblx0XHRcdFx0cHJvbWlzZS5mdWxmaWxsKHIpO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHR9XHJcbn07XHJcblxyXG4vLyBBUEkgdXRpbGl0aWVzXHJcbmhlbGxvLnV0aWxzLmV4dGVuZChoZWxsby51dGlscywge1xyXG5cclxuXHQvLyBNYWtlIGFuIEhUVFAgcmVxdWVzdFxyXG5cdHJlcXVlc3Q6IGZ1bmN0aW9uKHAsIGNhbGxiYWNrKSB7XHJcblxyXG5cdFx0dmFyIF90aGlzID0gdGhpcztcclxuXHRcdHZhciBlcnJvciA9IF90aGlzLmVycm9yO1xyXG5cclxuXHRcdC8vIFRoaXMgaGFzIHRvIGdvIHRocm91Z2ggYSBQT1NUIHJlcXVlc3RcclxuXHRcdGlmICghX3RoaXMuaXNFbXB0eShwLmRhdGEpICYmICEoJ0ZpbGVMaXN0JyBpbiB3aW5kb3cpICYmIF90aGlzLmhhc0JpbmFyeShwLmRhdGEpKSB7XHJcblxyXG5cdFx0XHQvLyBEaXNhYmxlIFhIUiBhbmQgSlNPTlBcclxuXHRcdFx0cC54aHIgPSBmYWxzZTtcclxuXHRcdFx0cC5qc29ucCA9IGZhbHNlO1xyXG5cdFx0fVxyXG5cclxuXHRcdC8vIENoZWNrIGlmIHRoZSBicm93c2VyIGFuZCBzZXJ2aWNlIHN1cHBvcnQgQ09SU1xyXG5cdFx0dmFyIGNvcnMgPSB0aGlzLnJlcXVlc3RfY29ycyhmdW5jdGlvbigpIHtcclxuXHRcdFx0Ly8gSWYgaXQgZG9lcyB0aGVuIHJ1biB0aGlzLi4uXHJcblx0XHRcdHJldHVybiAoKHAueGhyID09PSB1bmRlZmluZWQpIHx8IChwLnhociAmJiAodHlwZW9mIChwLnhocikgIT09ICdmdW5jdGlvbicgfHwgcC54aHIocCwgcC5xdWVyeSkpKSk7XHJcblx0XHR9KTtcclxuXHJcblx0XHRpZiAoY29ycykge1xyXG5cclxuXHRcdFx0Zm9ybWF0VXJsKHAsIGZ1bmN0aW9uKHVybCkge1xyXG5cclxuXHRcdFx0XHR2YXIgeCA9IF90aGlzLnhocihwLm1ldGhvZCwgdXJsLCBwLmhlYWRlcnMsIHAuZGF0YSwgY2FsbGJhY2spO1xyXG5cdFx0XHRcdHgub25wcm9ncmVzcyA9IHAub25wcm9ncmVzcyB8fCBudWxsO1xyXG5cclxuXHRcdFx0XHQvLyBXaW5kb3dzIFBob25lIGRvZXMgbm90IHN1cHBvcnQgeGhyLnVwbG9hZCwgc2VlICM3NFxyXG5cdFx0XHRcdC8vIEZlYXR1cmUgZGV0ZWN0XHJcblx0XHRcdFx0aWYgKHgudXBsb2FkICYmIHAub251cGxvYWRwcm9ncmVzcykge1xyXG5cdFx0XHRcdFx0eC51cGxvYWQub25wcm9ncmVzcyA9IHAub251cGxvYWRwcm9ncmVzcztcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHJcblx0XHQvLyBDbG9uZSB0aGUgcXVlcnkgb2JqZWN0XHJcblx0XHQvLyBFYWNoIHJlcXVlc3QgbW9kaWZpZXMgdGhlIHF1ZXJ5IG9iamVjdCBhbmQgbmVlZHMgdG8gYmUgdGFyZWQgYWZ0ZXIgZWFjaCBvbmUuXHJcblx0XHR2YXIgX3F1ZXJ5ID0gcC5xdWVyeTtcclxuXHJcblx0XHRwLnF1ZXJ5ID0gX3RoaXMuY2xvbmUocC5xdWVyeSk7XHJcblxyXG5cdFx0Ly8gQXNzaWduIGEgbmV3IGNhbGxiYWNrSURcclxuXHRcdHAuY2FsbGJhY2tJRCA9IF90aGlzLmdsb2JhbEV2ZW50KCk7XHJcblxyXG5cdFx0Ly8gSlNPTlBcclxuXHRcdGlmIChwLmpzb25wICE9PSBmYWxzZSkge1xyXG5cclxuXHRcdFx0Ly8gQ2xvbmUgdGhlIHF1ZXJ5IG9iamVjdFxyXG5cdFx0XHRwLnF1ZXJ5LmNhbGxiYWNrID0gcC5jYWxsYmFja0lEO1xyXG5cclxuXHRcdFx0Ly8gSWYgdGhlIEpTT05QIGlzIGEgZnVuY3Rpb24gdGhlbiBydW4gaXRcclxuXHRcdFx0aWYgKHR5cGVvZiAocC5qc29ucCkgPT09ICdmdW5jdGlvbicpIHtcclxuXHRcdFx0XHRwLmpzb25wKHAsIHAucXVlcnkpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQvLyBMZXRzIHVzZSBKU09OUCBpZiB0aGUgbWV0aG9kIGlzICdnZXQnXHJcblx0XHRcdGlmIChwLm1ldGhvZCA9PT0gJ2dldCcpIHtcclxuXHJcblx0XHRcdFx0Zm9ybWF0VXJsKHAsIGZ1bmN0aW9uKHVybCkge1xyXG5cdFx0XHRcdFx0X3RoaXMuanNvbnAodXJsLCBjYWxsYmFjaywgcC5jYWxsYmFja0lELCBwLnRpbWVvdXQpO1xyXG5cdFx0XHRcdH0pO1xyXG5cclxuXHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdH1cclxuXHRcdFx0ZWxzZSB7XHJcblx0XHRcdFx0Ly8gSXQncyBub3QgY29tcGF0aWJsZSByZXNldCBxdWVyeVxyXG5cdFx0XHRcdHAucXVlcnkgPSBfcXVlcnk7XHJcblx0XHRcdH1cclxuXHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gT3RoZXJ3aXNlIHdlJ3JlIG9uIHRvIHRoZSBvbGQgc2Nob29sLCBpZnJhbWUgaGFja3MgYW5kIEpTT05QXHJcblx0XHRpZiAocC5mb3JtICE9PSBmYWxzZSkge1xyXG5cclxuXHRcdFx0Ly8gQWRkIHNvbWUgYWRkaXRpb25hbCBxdWVyeSBwYXJhbWV0ZXJzIHRvIHRoZSBVUkxcclxuXHRcdFx0Ly8gV2UncmUgcHJldHR5IHN0dWZmZWQgaWYgdGhlIGVuZHBvaW50IGRvZXNuJ3QgbGlrZSB0aGVzZVxyXG5cdFx0XHRwLnF1ZXJ5LnJlZGlyZWN0X3VyaSA9IHAucmVkaXJlY3RfdXJpO1xyXG5cdFx0XHRwLnF1ZXJ5LnN0YXRlID0gSlNPTi5zdHJpbmdpZnkoe2NhbGxiYWNrOnAuY2FsbGJhY2tJRH0pO1xyXG5cclxuXHRcdFx0dmFyIG9wdHM7XHJcblxyXG5cdFx0XHRpZiAodHlwZW9mIChwLmZvcm0pID09PSAnZnVuY3Rpb24nKSB7XHJcblxyXG5cdFx0XHRcdC8vIEZvcm1hdCB0aGUgcmVxdWVzdFxyXG5cdFx0XHRcdG9wdHMgPSBwLmZvcm0ocCwgcC5xdWVyeSk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGlmIChwLm1ldGhvZCA9PT0gJ3Bvc3QnICYmIG9wdHMgIT09IGZhbHNlKSB7XHJcblxyXG5cdFx0XHRcdGZvcm1hdFVybChwLCBmdW5jdGlvbih1cmwpIHtcclxuXHRcdFx0XHRcdF90aGlzLnBvc3QodXJsLCBwLmRhdGEsIG9wdHMsIGNhbGxiYWNrLCBwLmNhbGxiYWNrSUQsIHAudGltZW91dCk7XHJcblx0XHRcdFx0fSk7XHJcblxyXG5cdFx0XHRcdHJldHVybjtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdC8vIE5vbmUgb2YgdGhlIG1ldGhvZHMgd2VyZSBzdWNjZXNzZnVsIHRocm93IGFuIGVycm9yXHJcblx0XHRjYWxsYmFjayhlcnJvcignaW52YWxpZF9yZXF1ZXN0JywgJ1RoZXJlIHdhcyBubyBtZWNoYW5pc20gZm9yIGhhbmRsaW5nIHRoaXMgcmVxdWVzdCcpKTtcclxuXHJcblx0XHRyZXR1cm47XHJcblxyXG5cdFx0Ly8gRm9ybWF0IFVSTFxyXG5cdFx0Ly8gQ29uc3RydWN0cyB0aGUgcmVxdWVzdCBVUkwsIG9wdGlvbmFsbHkgd3JhcHMgdGhlIFVSTCB0aHJvdWdoIGEgY2FsbCB0byBhIHByb3h5IHNlcnZlclxyXG5cdFx0Ly8gUmV0dXJucyB0aGUgZm9ybWF0dGVkIFVSTFxyXG5cdFx0ZnVuY3Rpb24gZm9ybWF0VXJsKHAsIGNhbGxiYWNrKSB7XHJcblxyXG5cdFx0XHQvLyBBcmUgd2Ugc2lnbmluZyB0aGUgcmVxdWVzdD9cclxuXHRcdFx0dmFyIHNpZ247XHJcblxyXG5cdFx0XHQvLyBPQXV0aDFcclxuXHRcdFx0Ly8gUmVtb3ZlIHRoZSB0b2tlbiBmcm9tIHRoZSBxdWVyeSBiZWZvcmUgc2lnbmluZ1xyXG5cdFx0XHRpZiAocC5hdXRoUmVzcG9uc2UgJiYgcC5hdXRoUmVzcG9uc2Uub2F1dGggJiYgcGFyc2VJbnQocC5hdXRoUmVzcG9uc2Uub2F1dGgudmVyc2lvbiwgMTApID09PSAxKSB7XHJcblxyXG5cdFx0XHRcdC8vIE9BVVRIIFNJR05JTkcgUFJPWFlcclxuXHRcdFx0XHRzaWduID0gcC5xdWVyeS5hY2Nlc3NfdG9rZW47XHJcblxyXG5cdFx0XHRcdC8vIFJlbW92ZSB0aGUgYWNjZXNzX3Rva2VuXHJcblx0XHRcdFx0ZGVsZXRlIHAucXVlcnkuYWNjZXNzX3Rva2VuO1xyXG5cclxuXHRcdFx0XHQvLyBFbmZvcmUgdXNlIG9mIFByb3h5XHJcblx0XHRcdFx0cC5wcm94eSA9IHRydWU7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdC8vIFBPU1QgYm9keSB0byBxdWVyeXN0cmluZ1xyXG5cdFx0XHRpZiAocC5kYXRhICYmIChwLm1ldGhvZCA9PT0gJ2dldCcgfHwgcC5tZXRob2QgPT09ICdkZWxldGUnKSkge1xyXG5cdFx0XHRcdC8vIEF0dGFjaCB0aGUgcC5kYXRhIHRvIHRoZSBxdWVyeXN0cmluZy5cclxuXHRcdFx0XHRfdGhpcy5leHRlbmQocC5xdWVyeSwgcC5kYXRhKTtcclxuXHRcdFx0XHRwLmRhdGEgPSBudWxsO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQvLyBDb25zdHJ1Y3QgdGhlIHBhdGhcclxuXHRcdFx0dmFyIHBhdGggPSBfdGhpcy5xcyhwLnVybCwgcC5xdWVyeSk7XHJcblxyXG5cdFx0XHQvLyBQcm94eSB0aGUgcmVxdWVzdCB0aHJvdWdoIGEgc2VydmVyXHJcblx0XHRcdC8vIFVzZWQgZm9yIHNpZ25pbmcgT0F1dGgxXHJcblx0XHRcdC8vIEFuZCBjaXJjdW12ZW50aW5nIHNlcnZpY2VzIHdpdGhvdXQgQWNjZXNzLUNvbnRyb2wgSGVhZGVyc1xyXG5cdFx0XHRpZiAocC5wcm94eSkge1xyXG5cdFx0XHRcdC8vIFVzZSB0aGUgcHJveHkgYXMgYSBwYXRoXHJcblx0XHRcdFx0cGF0aCA9IF90aGlzLnFzKHAub2F1dGhfcHJveHksIHtcclxuXHRcdFx0XHRcdHBhdGg6IHBhdGgsXHJcblx0XHRcdFx0XHRhY2Nlc3NfdG9rZW46IHNpZ24gfHwgJycsXHJcblxyXG5cdFx0XHRcdFx0Ly8gVGhpcyB3aWxsIHByb21wdCB0aGUgcmVxdWVzdCB0byBiZSBzaWduZWQgYXMgdGhvdWdoIGl0IGlzIE9BdXRoMVxyXG5cdFx0XHRcdFx0dGhlbjogcC5wcm94eV9yZXNwb25zZV90eXBlIHx8IChwLm1ldGhvZC50b0xvd2VyQ2FzZSgpID09PSAnZ2V0JyA/ICdyZWRpcmVjdCcgOiAncHJveHknKSxcclxuXHRcdFx0XHRcdG1ldGhvZDogcC5tZXRob2QudG9Mb3dlckNhc2UoKSxcclxuXHRcdFx0XHRcdHN1cHByZXNzX3Jlc3BvbnNlX2NvZGVzOiB0cnVlXHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGNhbGxiYWNrKHBhdGgpO1xyXG5cdFx0fVxyXG5cdH0sXHJcblxyXG5cdC8vIFRlc3Qgd2hldGhlciB0aGUgYnJvd3NlciBzdXBwb3J0cyB0aGUgQ09SUyByZXNwb25zZVxyXG5cdHJlcXVlc3RfY29yczogZnVuY3Rpb24oY2FsbGJhY2spIHtcclxuXHRcdHJldHVybiAnd2l0aENyZWRlbnRpYWxzJyBpbiBuZXcgWE1MSHR0cFJlcXVlc3QoKSAmJiBjYWxsYmFjaygpO1xyXG5cdH0sXHJcblxyXG5cdC8vIFJldHVybiB0aGUgdHlwZSBvZiBET00gb2JqZWN0XHJcblx0ZG9tSW5zdGFuY2U6IGZ1bmN0aW9uKHR5cGUsIGRhdGEpIHtcclxuXHRcdHZhciB0ZXN0ID0gJ0hUTUwnICsgKHR5cGUgfHwgJycpLnJlcGxhY2UoXHJcblx0XHRcdC9eW2Etel0vLFxyXG5cdFx0XHRmdW5jdGlvbihtKSB7XHJcblx0XHRcdFx0cmV0dXJuIG0udG9VcHBlckNhc2UoKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdCkgKyAnRWxlbWVudCc7XHJcblxyXG5cdFx0aWYgKCFkYXRhKSB7XHJcblx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAod2luZG93W3Rlc3RdKSB7XHJcblx0XHRcdHJldHVybiBkYXRhIGluc3RhbmNlb2Ygd2luZG93W3Rlc3RdO1xyXG5cdFx0fVxyXG5cdFx0ZWxzZSBpZiAod2luZG93LkVsZW1lbnQpIHtcclxuXHRcdFx0cmV0dXJuIGRhdGEgaW5zdGFuY2VvZiB3aW5kb3cuRWxlbWVudCAmJiAoIXR5cGUgfHwgKGRhdGEudGFnTmFtZSAmJiBkYXRhLnRhZ05hbWUudG9Mb3dlckNhc2UoKSA9PT0gdHlwZSkpO1xyXG5cdFx0fVxyXG5cdFx0ZWxzZSB7XHJcblx0XHRcdHJldHVybiAoIShkYXRhIGluc3RhbmNlb2YgT2JqZWN0IHx8IGRhdGEgaW5zdGFuY2VvZiBBcnJheSB8fCBkYXRhIGluc3RhbmNlb2YgU3RyaW5nIHx8IGRhdGEgaW5zdGFuY2VvZiBOdW1iZXIpICYmIGRhdGEudGFnTmFtZSAmJiBkYXRhLnRhZ05hbWUudG9Mb3dlckNhc2UoKSA9PT0gdHlwZSk7XHJcblx0XHR9XHJcblx0fSxcclxuXHJcblx0Ly8gQ3JlYXRlIGEgY2xvbmUgb2YgYW4gb2JqZWN0XHJcblx0Y2xvbmU6IGZ1bmN0aW9uKG9iaikge1xyXG5cdFx0Ly8gRG9lcyBub3QgY2xvbmUgRE9NIGVsZW1lbnRzLCBub3IgQmluYXJ5IGRhdGEsIGUuZy4gQmxvYnMsIEZpbGVsaXN0c1xyXG5cdFx0aWYgKG9iaiA9PT0gbnVsbCB8fCB0eXBlb2YgKG9iaikgIT09ICdvYmplY3QnIHx8IG9iaiBpbnN0YW5jZW9mIERhdGUgfHwgJ25vZGVOYW1lJyBpbiBvYmogfHwgdGhpcy5pc0JpbmFyeShvYmopIHx8ICh0eXBlb2YgRm9ybURhdGEgPT09ICdmdW5jdGlvbicgJiYgb2JqIGluc3RhbmNlb2YgRm9ybURhdGEpKSB7XHJcblx0XHRcdHJldHVybiBvYmo7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKEFycmF5LmlzQXJyYXkob2JqKSkge1xyXG5cdFx0XHQvLyBDbG9uZSBlYWNoIGl0ZW0gaW4gdGhlIGFycmF5XHJcblx0XHRcdHJldHVybiBvYmoubWFwKHRoaXMuY2xvbmUuYmluZCh0aGlzKSk7XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gQnV0IGRvZXMgY2xvbmUgZXZlcnl0aGluZyBlbHNlLlxyXG5cdFx0dmFyIGNsb25lID0ge307XHJcblx0XHRmb3IgKHZhciB4IGluIG9iaikge1xyXG5cdFx0XHRjbG9uZVt4XSA9IHRoaXMuY2xvbmUob2JqW3hdKTtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gY2xvbmU7XHJcblx0fSxcclxuXHJcblx0Ly8gWEhSOiB1c2VzIENPUlMgdG8gbWFrZSByZXF1ZXN0c1xyXG5cdHhocjogZnVuY3Rpb24obWV0aG9kLCB1cmwsIGhlYWRlcnMsIGRhdGEsIGNhbGxiYWNrKSB7XHJcblxyXG5cdFx0dmFyIHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcclxuXHRcdHZhciBlcnJvciA9IHRoaXMuZXJyb3I7XHJcblxyXG5cdFx0Ly8gQmluYXJ5P1xyXG5cdFx0dmFyIGJpbmFyeSA9IGZhbHNlO1xyXG5cdFx0aWYgKG1ldGhvZCA9PT0gJ2Jsb2InKSB7XHJcblx0XHRcdGJpbmFyeSA9IG1ldGhvZDtcclxuXHRcdFx0bWV0aG9kID0gJ0dFVCc7XHJcblx0XHR9XHJcblxyXG5cdFx0bWV0aG9kID0gbWV0aG9kLnRvVXBwZXJDYXNlKCk7XHJcblxyXG5cdFx0Ly8gWGhyLnJlc3BvbnNlVHlwZSAnanNvbicgaXMgbm90IHN1cHBvcnRlZCBpbiBhbnkgb2YgdGhlIHZlbmRvcnMgeWV0LlxyXG5cdFx0ci5vbmxvYWQgPSBmdW5jdGlvbihlKSB7XHJcblx0XHRcdHZhciBqc29uID0gci5yZXNwb25zZTtcclxuXHRcdFx0dHJ5IHtcclxuXHRcdFx0XHRqc29uID0gSlNPTi5wYXJzZShyLnJlc3BvbnNlVGV4dCk7XHJcblx0XHRcdH1cclxuXHRcdFx0Y2F0Y2ggKF9lKSB7XHJcblx0XHRcdFx0aWYgKHIuc3RhdHVzID09PSA0MDEpIHtcclxuXHRcdFx0XHRcdGpzb24gPSBlcnJvcignYWNjZXNzX2RlbmllZCcsIHIuc3RhdHVzVGV4dCk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHR2YXIgaGVhZGVycyA9IGhlYWRlcnNUb0pTT04oci5nZXRBbGxSZXNwb25zZUhlYWRlcnMoKSk7XHJcblx0XHRcdGhlYWRlcnMuc3RhdHVzQ29kZSA9IHIuc3RhdHVzO1xyXG5cclxuXHRcdFx0Y2FsbGJhY2soanNvbiB8fCAobWV0aG9kID09PSAnR0VUJyA/IGVycm9yKCdlbXB0eV9yZXNwb25zZScsICdDb3VsZCBub3QgZ2V0IHJlc291cmNlJykgOiB7fSksIGhlYWRlcnMpO1xyXG5cdFx0fTtcclxuXHJcblx0XHRyLm9uZXJyb3IgPSBmdW5jdGlvbihlKSB7XHJcblx0XHRcdHZhciBqc29uID0gci5yZXNwb25zZVRleHQ7XHJcblx0XHRcdHRyeSB7XHJcblx0XHRcdFx0anNvbiA9IEpTT04ucGFyc2Uoci5yZXNwb25zZVRleHQpO1xyXG5cdFx0XHR9XHJcblx0XHRcdGNhdGNoIChfZSkge31cclxuXHJcblx0XHRcdGNhbGxiYWNrKGpzb24gfHwgZXJyb3IoJ2FjY2Vzc19kZW5pZWQnLCAnQ291bGQgbm90IGdldCByZXNvdXJjZScpKTtcclxuXHRcdH07XHJcblxyXG5cdFx0dmFyIHg7XHJcblxyXG5cdFx0Ly8gU2hvdWxkIHdlIGFkZCB0aGUgcXVlcnkgdG8gdGhlIFVSTD9cclxuXHRcdGlmIChtZXRob2QgPT09ICdHRVQnIHx8IG1ldGhvZCA9PT0gJ0RFTEVURScpIHtcclxuXHRcdFx0ZGF0YSA9IG51bGw7XHJcblx0XHR9XHJcblx0XHRlbHNlIGlmIChkYXRhICYmIHR5cGVvZiAoZGF0YSkgIT09ICdzdHJpbmcnICYmICEoZGF0YSBpbnN0YW5jZW9mIEZvcm1EYXRhKSAmJiAhKGRhdGEgaW5zdGFuY2VvZiBGaWxlKSAmJiAhKGRhdGEgaW5zdGFuY2VvZiBCbG9iKSkge1xyXG5cdFx0XHQvLyBMb29wIHRocm91Z2ggYW5kIGFkZCBmb3JtRGF0YVxyXG5cdFx0XHR2YXIgZiA9IG5ldyBGb3JtRGF0YSgpO1xyXG5cdFx0XHRmb3IgKHggaW4gZGF0YSkgaWYgKGRhdGEuaGFzT3duUHJvcGVydHkoeCkpIHtcclxuXHRcdFx0XHRpZiAoZGF0YVt4XSBpbnN0YW5jZW9mIEhUTUxJbnB1dEVsZW1lbnQpIHtcclxuXHRcdFx0XHRcdGlmICgnZmlsZXMnIGluIGRhdGFbeF0gJiYgZGF0YVt4XS5maWxlcy5sZW5ndGggPiAwKSB7XHJcblx0XHRcdFx0XHRcdGYuYXBwZW5kKHgsIGRhdGFbeF0uZmlsZXNbMF0pO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRlbHNlIGlmIChkYXRhW3hdIGluc3RhbmNlb2YgQmxvYikge1xyXG5cdFx0XHRcdFx0Zi5hcHBlbmQoeCwgZGF0YVt4XSwgZGF0YS5uYW1lKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0ZWxzZSB7XHJcblx0XHRcdFx0XHRmLmFwcGVuZCh4LCBkYXRhW3hdKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGRhdGEgPSBmO1xyXG5cdFx0fVxyXG5cclxuXHRcdC8vIE9wZW4gdGhlIHBhdGgsIGFzeW5jXHJcblx0XHRyLm9wZW4obWV0aG9kLCB1cmwsIHRydWUpO1xyXG5cclxuXHRcdGlmIChiaW5hcnkpIHtcclxuXHRcdFx0aWYgKCdyZXNwb25zZVR5cGUnIGluIHIpIHtcclxuXHRcdFx0XHRyLnJlc3BvbnNlVHlwZSA9IGJpbmFyeTtcclxuXHRcdFx0fVxyXG5cdFx0XHRlbHNlIHtcclxuXHRcdFx0XHRyLm92ZXJyaWRlTWltZVR5cGUoJ3RleHQvcGxhaW47IGNoYXJzZXQ9eC11c2VyLWRlZmluZWQnKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdC8vIFNldCBhbnkgYmVzcG9rZSBoZWFkZXJzXHJcblx0XHRpZiAoaGVhZGVycykge1xyXG5cdFx0XHRmb3IgKHggaW4gaGVhZGVycykge1xyXG5cdFx0XHRcdHIuc2V0UmVxdWVzdEhlYWRlcih4LCBoZWFkZXJzW3hdKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdHIuc2VuZChkYXRhKTtcclxuXHJcblx0XHRyZXR1cm4gcjtcclxuXHJcblx0XHQvLyBIZWFkZXJzIGFyZSByZXR1cm5lZCBhcyBhIHN0cmluZ1xyXG5cdFx0ZnVuY3Rpb24gaGVhZGVyc1RvSlNPTihzKSB7XHJcblx0XHRcdHZhciByID0ge307XHJcblx0XHRcdHZhciByZWcgPSAvKFthLXpcXC1dKyk6XFxzPyguKik7Py9naTtcclxuXHRcdFx0dmFyIG07XHJcblx0XHRcdHdoaWxlICgobSA9IHJlZy5leGVjKHMpKSkge1xyXG5cdFx0XHRcdHJbbVsxXV0gPSBtWzJdO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRyZXR1cm4gcjtcclxuXHRcdH1cclxuXHR9LFxyXG5cclxuXHQvLyBKU09OUFxyXG5cdC8vIEluamVjdHMgYSBzY3JpcHQgdGFnIGludG8gdGhlIERPTSB0byBiZSBleGVjdXRlZCBhbmQgYXBwZW5kcyBhIGNhbGxiYWNrIGZ1bmN0aW9uIHRvIHRoZSB3aW5kb3cgb2JqZWN0XHJcblx0Ly8gQHBhcmFtIHN0cmluZy9mdW5jdGlvbiBwYXRoRnVuYyBlaXRoZXIgYSBzdHJpbmcgb2YgdGhlIFVSTCBvciBhIGNhbGxiYWNrIGZ1bmN0aW9uIHBhdGhGdW5jKHF1ZXJ5c3RyaW5naGFzaCwgY29udGludWVGdW5jKTtcclxuXHQvLyBAcGFyYW0gZnVuY3Rpb24gY2FsbGJhY2sgYSBmdW5jdGlvbiB0byBjYWxsIG9uIGNvbXBsZXRpb247XHJcblx0anNvbnA6IGZ1bmN0aW9uKHVybCwgY2FsbGJhY2ssIGNhbGxiYWNrSUQsIHRpbWVvdXQpIHtcclxuXHJcblx0XHR2YXIgX3RoaXMgPSB0aGlzO1xyXG5cdFx0dmFyIGVycm9yID0gX3RoaXMuZXJyb3I7XHJcblxyXG5cdFx0Ly8gQ2hhbmdlIHRoZSBuYW1lIG9mIHRoZSBjYWxsYmFja1xyXG5cdFx0dmFyIGJvb2wgPSAwO1xyXG5cdFx0dmFyIGhlYWQgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaGVhZCcpWzBdO1xyXG5cdFx0dmFyIG9wZXJhRml4O1xyXG5cdFx0dmFyIHJlc3VsdCA9IGVycm9yKCdzZXJ2ZXJfZXJyb3InLCAnc2VydmVyX2Vycm9yJyk7XHJcblx0XHR2YXIgY2IgPSBmdW5jdGlvbigpIHtcclxuXHRcdFx0aWYgKCEoYm9vbCsrKSkge1xyXG5cdFx0XHRcdHdpbmRvdy5zZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdFx0Y2FsbGJhY2socmVzdWx0KTtcclxuXHRcdFx0XHRcdGhlYWQucmVtb3ZlQ2hpbGQoc2NyaXB0KTtcclxuXHRcdFx0XHR9LCAwKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdH07XHJcblxyXG5cdFx0Ly8gQWRkIGNhbGxiYWNrIHRvIHRoZSB3aW5kb3cgb2JqZWN0XHJcblx0XHRjYWxsYmFja0lEID0gX3RoaXMuZ2xvYmFsRXZlbnQoZnVuY3Rpb24oanNvbikge1xyXG5cdFx0XHRyZXN1bHQgPSBqc29uO1xyXG5cdFx0XHRyZXR1cm4gdHJ1ZTtcclxuXHJcblx0XHRcdC8vIE1hcmsgY2FsbGJhY2sgYXMgZG9uZVxyXG5cdFx0fSwgY2FsbGJhY2tJRCk7XHJcblxyXG5cdFx0Ly8gVGhlIFVSTCBpcyBhIGZ1bmN0aW9uIGZvciBzb21lIGNhc2VzIGFuZCBhcyBzdWNoXHJcblx0XHQvLyBEZXRlcm1pbmUgaXRzIHZhbHVlIHdpdGggYSBjYWxsYmFjayBjb250YWluaW5nIHRoZSBuZXcgcGFyYW1ldGVycyBvZiB0aGlzIGZ1bmN0aW9uLlxyXG5cdFx0dXJsID0gdXJsLnJlcGxhY2UobmV3IFJlZ0V4cCgnPVxcXFw/KCZ8JCknKSwgJz0nICsgY2FsbGJhY2tJRCArICckMScpO1xyXG5cclxuXHRcdC8vIEJ1aWxkIHNjcmlwdCB0YWdcclxuXHRcdHZhciBzY3JpcHQgPSBfdGhpcy5hcHBlbmQoJ3NjcmlwdCcsIHtcclxuXHRcdFx0aWQ6IGNhbGxiYWNrSUQsXHJcblx0XHRcdG5hbWU6IGNhbGxiYWNrSUQsXHJcblx0XHRcdHNyYzogdXJsLFxyXG5cdFx0XHRhc3luYzogdHJ1ZSxcclxuXHRcdFx0b25sb2FkOiBjYixcclxuXHRcdFx0b25lcnJvcjogY2IsXHJcblx0XHRcdG9ucmVhZHlzdGF0ZWNoYW5nZTogZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0aWYgKC9sb2FkZWR8Y29tcGxldGUvaS50ZXN0KHRoaXMucmVhZHlTdGF0ZSkpIHtcclxuXHRcdFx0XHRcdGNiKCk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHJcblx0XHQvLyBPcGVyYSBmaXggZXJyb3JcclxuXHRcdC8vIFByb2JsZW06IElmIGFuIGVycm9yIG9jY3VycyB3aXRoIHNjcmlwdCBsb2FkaW5nIE9wZXJhIGZhaWxzIHRvIHRyaWdnZXIgdGhlIHNjcmlwdC5vbmVycm9yIGhhbmRsZXIgd2Ugc3BlY2lmaWVkXHJcblx0XHQvL1xyXG5cdFx0Ly8gRml4OlxyXG5cdFx0Ly8gQnkgc2V0dGluZyB0aGUgcmVxdWVzdCB0byBzeW5jaHJvbm91cyB3ZSBjYW4gdHJpZ2dlciB0aGUgZXJyb3IgaGFuZGxlciB3aGVuIGFsbCBlbHNlIGZhaWxzLlxyXG5cdFx0Ly8gVGhpcyBhY3Rpb24gd2lsbCBiZSBpZ25vcmVkIGlmIHdlJ3ZlIGFscmVhZHkgY2FsbGVkIHRoZSBjYWxsYmFjayBoYW5kbGVyIFwiY2JcIiB3aXRoIGEgc3VjY2Vzc2Z1bCBvbmxvYWQgZXZlbnRcclxuXHRcdGlmICh3aW5kb3cubmF2aWdhdG9yLnVzZXJBZ2VudC50b0xvd2VyQ2FzZSgpLmluZGV4T2YoJ29wZXJhJykgPiAtMSkge1xyXG5cdFx0XHRvcGVyYUZpeCA9IF90aGlzLmFwcGVuZCgnc2NyaXB0Jywge1xyXG5cdFx0XHRcdHRleHQ6ICdkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcXCcnICsgY2FsbGJhY2tJRCArICdcXCcpLm9uZXJyb3IoKTsnXHJcblx0XHRcdH0pO1xyXG5cdFx0XHRzY3JpcHQuYXN5bmMgPSBmYWxzZTtcclxuXHRcdH1cclxuXHJcblx0XHQvLyBBZGQgdGltZW91dFxyXG5cdFx0aWYgKHRpbWVvdXQpIHtcclxuXHRcdFx0d2luZG93LnNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0cmVzdWx0ID0gZXJyb3IoJ3RpbWVvdXQnLCAndGltZW91dCcpO1xyXG5cdFx0XHRcdGNiKCk7XHJcblx0XHRcdH0sIHRpbWVvdXQpO1xyXG5cdFx0fVxyXG5cclxuXHRcdC8vIFRPRE86IGFkZCBmaXggZm9yIElFLFxyXG5cdFx0Ly8gSG93ZXZlcjogdW5hYmxlIHJlY3JlYXRlIHRoZSBidWcgb2YgZmlyaW5nIG9mZiB0aGUgb25yZWFkeXN0YXRlY2hhbmdlIGJlZm9yZSB0aGUgc2NyaXB0IGNvbnRlbnQgaGFzIGJlZW4gZXhlY3V0ZWQgYW5kIHRoZSB2YWx1ZSBvZiBcInJlc3VsdFwiIGhhcyBiZWVuIGRlZmluZWQuXHJcblx0XHQvLyBJbmplY3Qgc2NyaXB0IHRhZyBpbnRvIHRoZSBoZWFkIGVsZW1lbnRcclxuXHRcdGhlYWQuYXBwZW5kQ2hpbGQoc2NyaXB0KTtcclxuXHJcblx0XHQvLyBBcHBlbmQgT3BlcmEgRml4IHRvIHJ1biBhZnRlciBvdXIgc2NyaXB0XHJcblx0XHRpZiAob3BlcmFGaXgpIHtcclxuXHRcdFx0aGVhZC5hcHBlbmRDaGlsZChvcGVyYUZpeCk7XHJcblx0XHR9XHJcblx0fSxcclxuXHJcblx0Ly8gUG9zdFxyXG5cdC8vIFNlbmQgaW5mb3JtYXRpb24gdG8gYSByZW1vdGUgbG9jYXRpb24gdXNpbmcgdGhlIHBvc3QgbWVjaGFuaXNtXHJcblx0Ly8gQHBhcmFtIHN0cmluZyB1cmkgcGF0aFxyXG5cdC8vIEBwYXJhbSBvYmplY3QgZGF0YSwga2V5IHZhbHVlIGRhdGEgdG8gc2VuZFxyXG5cdC8vIEBwYXJhbSBmdW5jdGlvbiBjYWxsYmFjaywgZnVuY3Rpb24gdG8gZXhlY3V0ZSBpbiByZXNwb25zZVxyXG5cdHBvc3Q6IGZ1bmN0aW9uKHVybCwgZGF0YSwgb3B0aW9ucywgY2FsbGJhY2ssIGNhbGxiYWNrSUQsIHRpbWVvdXQpIHtcclxuXHJcblx0XHR2YXIgX3RoaXMgPSB0aGlzO1xyXG5cdFx0dmFyIGVycm9yID0gX3RoaXMuZXJyb3I7XHJcblx0XHR2YXIgZG9jID0gZG9jdW1lbnQ7XHJcblxyXG5cdFx0Ly8gVGhpcyBoYWNrIG5lZWRzIGEgZm9ybVxyXG5cdFx0dmFyIGZvcm0gPSBudWxsO1xyXG5cdFx0dmFyIHJlZW5hYmxlQWZ0ZXJTdWJtaXQgPSBbXTtcclxuXHRcdHZhciBuZXdmb3JtO1xyXG5cdFx0dmFyIGkgPSAwO1xyXG5cdFx0dmFyIHggPSBudWxsO1xyXG5cdFx0dmFyIGJvb2wgPSAwO1xyXG5cdFx0dmFyIGNiID0gZnVuY3Rpb24ocikge1xyXG5cdFx0XHRpZiAoIShib29sKyspKSB7XHJcblx0XHRcdFx0Y2FsbGJhY2socik7XHJcblx0XHRcdH1cclxuXHRcdH07XHJcblxyXG5cdFx0Ly8gV2hhdCBpcyB0aGUgbmFtZSBvZiB0aGUgY2FsbGJhY2sgdG8gY29udGFpblxyXG5cdFx0Ly8gV2UnbGwgYWxzbyB1c2UgdGhpcyB0byBuYW1lIHRoZSBpZnJhbWVcclxuXHRcdF90aGlzLmdsb2JhbEV2ZW50KGNiLCBjYWxsYmFja0lEKTtcclxuXHJcblx0XHQvLyBCdWlsZCB0aGUgaWZyYW1lIHdpbmRvd1xyXG5cdFx0dmFyIHdpbjtcclxuXHRcdHRyeSB7XHJcblx0XHRcdC8vIElFNyBoYWNrLCBvbmx5IGxldHMgdXMgZGVmaW5lIHRoZSBuYW1lIGhlcmUsIG5vdCBsYXRlci5cclxuXHRcdFx0d2luID0gZG9jLmNyZWF0ZUVsZW1lbnQoJzxpZnJhbWUgbmFtZT1cIicgKyBjYWxsYmFja0lEICsgJ1wiPicpO1xyXG5cdFx0fVxyXG5cdFx0Y2F0Y2ggKGUpIHtcclxuXHRcdFx0d2luID0gZG9jLmNyZWF0ZUVsZW1lbnQoJ2lmcmFtZScpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHdpbi5uYW1lID0gY2FsbGJhY2tJRDtcclxuXHRcdHdpbi5pZCA9IGNhbGxiYWNrSUQ7XHJcblx0XHR3aW4uc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuXHJcblx0XHQvLyBPdmVycmlkZSBjYWxsYmFjayBtZWNoYW5pc20uIFRyaWdnZ2VyIGEgcmVzcG9uc2Ugb25sb2FkL29uZXJyb3JcclxuXHRcdGlmIChvcHRpb25zICYmIG9wdGlvbnMuY2FsbGJhY2tvbmxvYWQpIHtcclxuXHRcdFx0Ly8gT25sb2FkIGlzIGJlaW5nIGZpcmVkIHR3aWNlXHJcblx0XHRcdHdpbi5vbmxvYWQgPSBmdW5jdGlvbigpIHtcclxuXHRcdFx0XHRjYih7XHJcblx0XHRcdFx0XHRyZXNwb25zZTogJ3Bvc3RlZCcsXHJcblx0XHRcdFx0XHRtZXNzYWdlOiAnQ29udGVudCB3YXMgcG9zdGVkJ1xyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHR9O1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmICh0aW1lb3V0KSB7XHJcblx0XHRcdHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0Y2IoZXJyb3IoJ3RpbWVvdXQnLCAnVGhlIHBvc3Qgb3BlcmF0aW9uIHRpbWVkIG91dCcpKTtcclxuXHRcdFx0fSwgdGltZW91dCk7XHJcblx0XHR9XHJcblxyXG5cdFx0ZG9jLmJvZHkuYXBwZW5kQ2hpbGQod2luKTtcclxuXHJcblx0XHQvLyBJZiB3ZSBhcmUganVzdCBwb3N0aW5nIGEgc2luZ2xlIGl0ZW1cclxuXHRcdGlmIChfdGhpcy5kb21JbnN0YW5jZSgnZm9ybScsIGRhdGEpKSB7XHJcblx0XHRcdC8vIEdldCB0aGUgcGFyZW50IGZvcm1cclxuXHRcdFx0Zm9ybSA9IGRhdGEuZm9ybTtcclxuXHJcblx0XHRcdC8vIExvb3AgdGhyb3VnaCBhbmQgZGlzYWJsZSBhbGwgb2YgaXRzIHNpYmxpbmdzXHJcblx0XHRcdGZvciAoaSA9IDA7IGkgPCBmb3JtLmVsZW1lbnRzLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdFx0aWYgKGZvcm0uZWxlbWVudHNbaV0gIT09IGRhdGEpIHtcclxuXHRcdFx0XHRcdGZvcm0uZWxlbWVudHNbaV0uc2V0QXR0cmlidXRlKCdkaXNhYmxlZCcsIHRydWUpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0Ly8gTW92ZSB0aGUgZm9jdXMgdG8gdGhlIGZvcm1cclxuXHRcdFx0ZGF0YSA9IGZvcm07XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gUG9zdGluZyBhIGZvcm1cclxuXHRcdGlmIChfdGhpcy5kb21JbnN0YW5jZSgnZm9ybScsIGRhdGEpKSB7XHJcblx0XHRcdC8vIFRoaXMgaXMgYSBmb3JtIGVsZW1lbnRcclxuXHRcdFx0Zm9ybSA9IGRhdGE7XHJcblxyXG5cdFx0XHQvLyBEb2VzIHRoaXMgZm9ybSBuZWVkIHRvIGJlIGEgbXVsdGlwYXJ0IGZvcm0/XHJcblx0XHRcdGZvciAoaSA9IDA7IGkgPCBmb3JtLmVsZW1lbnRzLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdFx0aWYgKCFmb3JtLmVsZW1lbnRzW2ldLmRpc2FibGVkICYmIGZvcm0uZWxlbWVudHNbaV0udHlwZSA9PT0gJ2ZpbGUnKSB7XHJcblx0XHRcdFx0XHRmb3JtLmVuY29kaW5nID0gZm9ybS5lbmN0eXBlID0gJ211bHRpcGFydC9mb3JtLWRhdGEnO1xyXG5cdFx0XHRcdFx0Zm9ybS5lbGVtZW50c1tpXS5zZXRBdHRyaWJ1dGUoJ25hbWUnLCAnZmlsZScpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdFx0ZWxzZSB7XHJcblx0XHRcdC8vIEl0cyBub3QgYSBmb3JtIGVsZW1lbnQsXHJcblx0XHRcdC8vIFRoZXJlZm9yZSBpdCBtdXN0IGJlIGEgSlNPTiBvYmplY3Qgb2YgS2V5PT5WYWx1ZSBvciBLZXk9PkVsZW1lbnRcclxuXHRcdFx0Ly8gSWYgYW55b25lIG9mIHRob3NlIHZhbHVlcyBhcmUgYSBpbnB1dCB0eXBlPWZpbGUgd2Ugc2hhbGwgc2hhbGwgaW5zZXJ0IGl0cyBzaWJsaW5ncyBpbnRvIHRoZSBmb3JtIGZvciB3aGljaCBpdCBiZWxvbmdzLlxyXG5cdFx0XHRmb3IgKHggaW4gZGF0YSkgaWYgKGRhdGEuaGFzT3duUHJvcGVydHkoeCkpIHtcclxuXHRcdFx0XHQvLyBJcyB0aGlzIGFuIGlucHV0IEVsZW1lbnQ/XHJcblx0XHRcdFx0aWYgKF90aGlzLmRvbUluc3RhbmNlKCdpbnB1dCcsIGRhdGFbeF0pICYmIGRhdGFbeF0udHlwZSA9PT0gJ2ZpbGUnKSB7XHJcblx0XHRcdFx0XHRmb3JtID0gZGF0YVt4XS5mb3JtO1xyXG5cdFx0XHRcdFx0Zm9ybS5lbmNvZGluZyA9IGZvcm0uZW5jdHlwZSA9ICdtdWx0aXBhcnQvZm9ybS1kYXRhJztcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdC8vIERvIElmIHRoZXJlIGlzIG5vIGRlZmluZWQgZm9ybSBlbGVtZW50LCBsZXRzIGNyZWF0ZSBvbmUuXHJcblx0XHRcdGlmICghZm9ybSkge1xyXG5cdFx0XHRcdC8vIEJ1aWxkIGZvcm1cclxuXHRcdFx0XHRmb3JtID0gZG9jLmNyZWF0ZUVsZW1lbnQoJ2Zvcm0nKTtcclxuXHRcdFx0XHRkb2MuYm9keS5hcHBlbmRDaGlsZChmb3JtKTtcclxuXHRcdFx0XHRuZXdmb3JtID0gZm9ybTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0dmFyIGlucHV0O1xyXG5cclxuXHRcdFx0Ly8gQWRkIGVsZW1lbnRzIHRvIHRoZSBmb3JtIGlmIHRoZXkgZG9udCBleGlzdFxyXG5cdFx0XHRmb3IgKHggaW4gZGF0YSkgaWYgKGRhdGEuaGFzT3duUHJvcGVydHkoeCkpIHtcclxuXHJcblx0XHRcdFx0Ly8gSXMgdGhpcyBhbiBlbGVtZW50P1xyXG5cdFx0XHRcdHZhciBlbCA9IChfdGhpcy5kb21JbnN0YW5jZSgnaW5wdXQnLCBkYXRhW3hdKSB8fCBfdGhpcy5kb21JbnN0YW5jZSgndGV4dEFyZWEnLCBkYXRhW3hdKSB8fCBfdGhpcy5kb21JbnN0YW5jZSgnc2VsZWN0JywgZGF0YVt4XSkpO1xyXG5cclxuXHRcdFx0XHQvLyBJcyB0aGlzIG5vdCBhbiBpbnB1dCBlbGVtZW50LCBvciBvbmUgdGhhdCBleGlzdHMgb3V0c2lkZSB0aGUgZm9ybS5cclxuXHRcdFx0XHRpZiAoIWVsIHx8IGRhdGFbeF0uZm9ybSAhPT0gZm9ybSkge1xyXG5cclxuXHRcdFx0XHRcdC8vIERvZXMgYW4gZWxlbWVudCBoYXZlIHRoZSBzYW1lIG5hbWU/XHJcblx0XHRcdFx0XHR2YXIgaW5wdXRzID0gZm9ybS5lbGVtZW50c1t4XTtcclxuXHRcdFx0XHRcdGlmIChpbnB1dCkge1xyXG5cdFx0XHRcdFx0XHQvLyBSZW1vdmUgaXQuXHJcblx0XHRcdFx0XHRcdGlmICghKGlucHV0cyBpbnN0YW5jZW9mIE5vZGVMaXN0KSkge1xyXG5cdFx0XHRcdFx0XHRcdGlucHV0cyA9IFtpbnB1dHNdO1xyXG5cdFx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0XHRmb3IgKGkgPSAwOyBpIDwgaW5wdXRzLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdFx0XHRcdFx0aW5wdXRzW2ldLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoaW5wdXRzW2ldKTtcclxuXHRcdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHQvLyBDcmVhdGUgYW4gaW5wdXQgZWxlbWVudFxyXG5cdFx0XHRcdFx0aW5wdXQgPSBkb2MuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcclxuXHRcdFx0XHRcdGlucHV0LnNldEF0dHJpYnV0ZSgndHlwZScsICdoaWRkZW4nKTtcclxuXHRcdFx0XHRcdGlucHV0LnNldEF0dHJpYnV0ZSgnbmFtZScsIHgpO1xyXG5cclxuXHRcdFx0XHRcdC8vIERvZXMgaXQgaGF2ZSBhIHZhbHVlIGF0dHJpYnV0ZT9cclxuXHRcdFx0XHRcdGlmIChlbCkge1xyXG5cdFx0XHRcdFx0XHRpbnB1dC52YWx1ZSA9IGRhdGFbeF0udmFsdWU7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRlbHNlIGlmIChfdGhpcy5kb21JbnN0YW5jZShudWxsLCBkYXRhW3hdKSkge1xyXG5cdFx0XHRcdFx0XHRpbnB1dC52YWx1ZSA9IGRhdGFbeF0uaW5uZXJIVE1MIHx8IGRhdGFbeF0uaW5uZXJUZXh0O1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0ZWxzZSB7XHJcblx0XHRcdFx0XHRcdGlucHV0LnZhbHVlID0gZGF0YVt4XTtcclxuXHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHRmb3JtLmFwcGVuZENoaWxkKGlucHV0KTtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdC8vIEl0IGlzIGFuIGVsZW1lbnQsIHdoaWNoIGV4aXN0cyB3aXRoaW4gdGhlIGZvcm0sIGJ1dCB0aGUgbmFtZSBpcyB3cm9uZ1xyXG5cdFx0XHRcdGVsc2UgaWYgKGVsICYmIGRhdGFbeF0ubmFtZSAhPT0geCkge1xyXG5cdFx0XHRcdFx0ZGF0YVt4XS5zZXRBdHRyaWJ1dGUoJ25hbWUnLCB4KTtcclxuXHRcdFx0XHRcdGRhdGFbeF0ubmFtZSA9IHg7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQvLyBEaXNhYmxlIGVsZW1lbnRzIGZyb20gd2l0aGluIHRoZSBmb3JtIGlmIHRoZXkgd2VyZW4ndCBzcGVjaWZpZWRcclxuXHRcdFx0Zm9yIChpID0gMDsgaSA8IGZvcm0uZWxlbWVudHMubGVuZ3RoOyBpKyspIHtcclxuXHJcblx0XHRcdFx0aW5wdXQgPSBmb3JtLmVsZW1lbnRzW2ldO1xyXG5cclxuXHRcdFx0XHQvLyBEb2VzIHRoZSBzYW1lIG5hbWUgYW5kIHZhbHVlIGV4aXN0IGluIHRoZSBwYXJlbnRcclxuXHRcdFx0XHRpZiAoIShpbnB1dC5uYW1lIGluIGRhdGEpICYmIGlucHV0LmdldEF0dHJpYnV0ZSgnZGlzYWJsZWQnKSAhPT0gdHJ1ZSkge1xyXG5cdFx0XHRcdFx0Ly8gRGlzYWJsZVxyXG5cdFx0XHRcdFx0aW5wdXQuc2V0QXR0cmlidXRlKCdkaXNhYmxlZCcsIHRydWUpO1xyXG5cclxuXHRcdFx0XHRcdC8vIEFkZCByZS1lbmFibGUgdG8gY2FsbGJhY2tcclxuXHRcdFx0XHRcdHJlZW5hYmxlQWZ0ZXJTdWJtaXQucHVzaChpbnB1dCk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gU2V0IHRoZSB0YXJnZXQgb2YgdGhlIGZvcm1cclxuXHRcdGZvcm0uc2V0QXR0cmlidXRlKCdtZXRob2QnLCAnUE9TVCcpO1xyXG5cdFx0Zm9ybS5zZXRBdHRyaWJ1dGUoJ3RhcmdldCcsIGNhbGxiYWNrSUQpO1xyXG5cdFx0Zm9ybS50YXJnZXQgPSBjYWxsYmFja0lEO1xyXG5cclxuXHRcdC8vIFVwZGF0ZSB0aGUgZm9ybSBVUkxcclxuXHRcdGZvcm0uc2V0QXR0cmlidXRlKCdhY3Rpb24nLCB1cmwpO1xyXG5cclxuXHRcdC8vIFN1Ym1pdCB0aGUgZm9ybVxyXG5cdFx0Ly8gU29tZSByZWFzb24gdGhpcyBuZWVkcyB0byBiZSBvZmZzZXQgZnJvbSB0aGUgY3VycmVudCB3aW5kb3cgZXhlY3V0aW9uXHJcblx0XHRzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRmb3JtLnN1Ym1pdCgpO1xyXG5cclxuXHRcdFx0c2V0VGltZW91dChmdW5jdGlvbigpIHtcclxuXHRcdFx0XHR0cnkge1xyXG5cdFx0XHRcdFx0Ly8gUmVtb3ZlIHRoZSBpZnJhbWUgZnJvbSB0aGUgcGFnZS5cclxuXHRcdFx0XHRcdC8vd2luLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQod2luKTtcclxuXHRcdFx0XHRcdC8vIFJlbW92ZSB0aGUgZm9ybVxyXG5cdFx0XHRcdFx0aWYgKG5ld2Zvcm0pIHtcclxuXHRcdFx0XHRcdFx0bmV3Zm9ybS5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKG5ld2Zvcm0pO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRjYXRjaCAoZSkge1xyXG5cdFx0XHRcdFx0dHJ5IHtcclxuXHRcdFx0XHRcdFx0Y29uc29sZS5lcnJvcignSGVsbG9KUzogY291bGQgbm90IHJlbW92ZSBpZnJhbWUnKTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdGNhdGNoIChlZSkge31cclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdC8vIFJlZW5hYmxlIHRoZSBkaXNhYmxlZCBmb3JtXHJcblx0XHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCByZWVuYWJsZUFmdGVyU3VibWl0Lmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdFx0XHRpZiAocmVlbmFibGVBZnRlclN1Ym1pdFtpXSkge1xyXG5cdFx0XHRcdFx0XHRyZWVuYWJsZUFmdGVyU3VibWl0W2ldLnNldEF0dHJpYnV0ZSgnZGlzYWJsZWQnLCBmYWxzZSk7XHJcblx0XHRcdFx0XHRcdHJlZW5hYmxlQWZ0ZXJTdWJtaXRbaV0uZGlzYWJsZWQgPSBmYWxzZTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XHJcblx0XHRcdH0sIDApO1xyXG5cdFx0fSwgMTAwKTtcclxuXHR9LFxyXG5cclxuXHQvLyBTb21lIG9mIHRoZSBwcm92aWRlcnMgcmVxdWlyZSB0aGF0IG9ubHkgbXVsdGlwYXJ0IGlzIHVzZWQgd2l0aCBub24tYmluYXJ5IGZvcm1zLlxyXG5cdC8vIFRoaXMgZnVuY3Rpb24gY2hlY2tzIHdoZXRoZXIgdGhlIGZvcm0gY29udGFpbnMgYmluYXJ5IGRhdGFcclxuXHRoYXNCaW5hcnk6IGZ1bmN0aW9uKGRhdGEpIHtcclxuXHRcdGZvciAodmFyIHggaW4gZGF0YSkgaWYgKGRhdGEuaGFzT3duUHJvcGVydHkoeCkpIHtcclxuXHRcdFx0aWYgKHRoaXMuaXNCaW5hcnkoZGF0YVt4XSkpIHtcclxuXHRcdFx0XHRyZXR1cm4gdHJ1ZTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBmYWxzZTtcclxuXHR9LFxyXG5cclxuXHQvLyBEZXRlcm1pbmVzIGlmIGEgdmFyaWFibGUgRWl0aGVyIElzIG9yIGxpa2UgYSBGb3JtSW5wdXQgaGFzIHRoZSB2YWx1ZSBvZiBhIEJsb2JcclxuXHJcblx0aXNCaW5hcnk6IGZ1bmN0aW9uKGRhdGEpIHtcclxuXHJcblx0XHRyZXR1cm4gZGF0YSBpbnN0YW5jZW9mIE9iamVjdCAmJiAoXHJcblx0XHQodGhpcy5kb21JbnN0YW5jZSgnaW5wdXQnLCBkYXRhKSAmJiBkYXRhLnR5cGUgPT09ICdmaWxlJykgfHxcclxuXHRcdCgnRmlsZUxpc3QnIGluIHdpbmRvdyAmJiBkYXRhIGluc3RhbmNlb2Ygd2luZG93LkZpbGVMaXN0KSB8fFxyXG5cdFx0KCdGaWxlJyBpbiB3aW5kb3cgJiYgZGF0YSBpbnN0YW5jZW9mIHdpbmRvdy5GaWxlKSB8fFxyXG5cdFx0KCdCbG9iJyBpbiB3aW5kb3cgJiYgZGF0YSBpbnN0YW5jZW9mIHdpbmRvdy5CbG9iKSk7XHJcblxyXG5cdH0sXHJcblxyXG5cdC8vIENvbnZlcnQgRGF0YS1VUkkgdG8gQmxvYiBzdHJpbmdcclxuXHR0b0Jsb2I6IGZ1bmN0aW9uKGRhdGFVUkkpIHtcclxuXHRcdHZhciByZWcgPSAvXmRhdGFcXDooW147LF0rKFxcO2NoYXJzZXQ9W147LF0rKT8pKFxcO2Jhc2U2NCk/LC9pO1xyXG5cdFx0dmFyIG0gPSBkYXRhVVJJLm1hdGNoKHJlZyk7XHJcblx0XHRpZiAoIW0pIHtcclxuXHRcdFx0cmV0dXJuIGRhdGFVUkk7XHJcblx0XHR9XHJcblxyXG5cdFx0dmFyIGJpbmFyeSA9IGF0b2IoZGF0YVVSSS5yZXBsYWNlKHJlZywgJycpKTtcclxuXHRcdHZhciBhcnJheSA9IFtdO1xyXG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBiaW5hcnkubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0YXJyYXkucHVzaChiaW5hcnkuY2hhckNvZGVBdChpKSk7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIG5ldyBCbG9iKFtuZXcgVWludDhBcnJheShhcnJheSldLCB7dHlwZTogbVsxXX0pO1xyXG5cdH1cclxuXHJcbn0pO1xyXG5cclxuLy8gRVhUUkE6IENvbnZlcnQgRm9ybUVsZW1lbnQgdG8gSlNPTiBmb3IgUE9TVGluZ1xyXG4vLyBXcmFwcGVycyB0byBhZGQgYWRkaXRpb25hbCBmdW5jdGlvbmFsaXR5IHRvIGV4aXN0aW5nIGZ1bmN0aW9uc1xyXG4oZnVuY3Rpb24oaGVsbG8pIHtcclxuXHJcblx0Ly8gQ29weSBvcmlnaW5hbCBmdW5jdGlvblxyXG5cdHZhciBhcGkgPSBoZWxsby5hcGk7XHJcblx0dmFyIHV0aWxzID0gaGVsbG8udXRpbHM7XHJcblxyXG5cdHV0aWxzLmV4dGVuZCh1dGlscywge1xyXG5cclxuXHRcdC8vIERhdGFUb0pTT05cclxuXHRcdC8vIFRoaXMgdGFrZXMgYSBGb3JtRWxlbWVudHxOb2RlTGlzdHxJbnB1dEVsZW1lbnR8TWl4ZWRPYmplY3RzIGFuZCBjb252ZXJzIHRoZSBkYXRhIG9iamVjdCB0byBKU09OLlxyXG5cdFx0ZGF0YVRvSlNPTjogZnVuY3Rpb24ocCkge1xyXG5cclxuXHRcdFx0dmFyIF90aGlzID0gdGhpcztcclxuXHRcdFx0dmFyIHcgPSB3aW5kb3c7XHJcblx0XHRcdHZhciBkYXRhID0gcC5kYXRhO1xyXG5cclxuXHRcdFx0Ly8gSXMgZGF0YSBhIGZvcm0gb2JqZWN0XHJcblx0XHRcdGlmIChfdGhpcy5kb21JbnN0YW5jZSgnZm9ybScsIGRhdGEpKSB7XHJcblx0XHRcdFx0ZGF0YSA9IF90aGlzLm5vZGVMaXN0VG9KU09OKGRhdGEuZWxlbWVudHMpO1xyXG5cdFx0XHR9XHJcblx0XHRcdGVsc2UgaWYgKCdOb2RlTGlzdCcgaW4gdyAmJiBkYXRhIGluc3RhbmNlb2YgTm9kZUxpc3QpIHtcclxuXHRcdFx0XHRkYXRhID0gX3RoaXMubm9kZUxpc3RUb0pTT04oZGF0YSk7XHJcblx0XHRcdH1cclxuXHRcdFx0ZWxzZSBpZiAoX3RoaXMuZG9tSW5zdGFuY2UoJ2lucHV0JywgZGF0YSkpIHtcclxuXHRcdFx0XHRkYXRhID0gX3RoaXMubm9kZUxpc3RUb0pTT04oW2RhdGFdKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0Ly8gSXMgZGF0YSBhIGJsb2IsIEZpbGUsIEZpbGVMaXN0P1xyXG5cdFx0XHRpZiAoKCdGaWxlJyBpbiB3ICYmIGRhdGEgaW5zdGFuY2VvZiB3LkZpbGUpIHx8XHJcblx0XHRcdFx0KCdCbG9iJyBpbiB3ICYmIGRhdGEgaW5zdGFuY2VvZiB3LkJsb2IpIHx8XHJcblx0XHRcdFx0KCdGaWxlTGlzdCcgaW4gdyAmJiBkYXRhIGluc3RhbmNlb2Ygdy5GaWxlTGlzdCkpIHtcclxuXHRcdFx0XHRkYXRhID0ge2ZpbGU6IGRhdGF9O1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQvLyBMb29wIHRocm91Z2ggZGF0YSBpZiBpdCdzIG5vdCBmb3JtIGRhdGEgaXQgbXVzdCBub3cgYmUgYSBKU09OIG9iamVjdFxyXG5cdFx0XHRpZiAoISgnRm9ybURhdGEnIGluIHcgJiYgZGF0YSBpbnN0YW5jZW9mIHcuRm9ybURhdGEpKSB7XHJcblxyXG5cdFx0XHRcdGZvciAodmFyIHggaW4gZGF0YSkgaWYgKGRhdGEuaGFzT3duUHJvcGVydHkoeCkpIHtcclxuXHJcblx0XHRcdFx0XHRpZiAoJ0ZpbGVMaXN0JyBpbiB3ICYmIGRhdGFbeF0gaW5zdGFuY2VvZiB3LkZpbGVMaXN0KSB7XHJcblx0XHRcdFx0XHRcdGlmIChkYXRhW3hdLmxlbmd0aCA9PT0gMSkge1xyXG5cdFx0XHRcdFx0XHRcdGRhdGFbeF0gPSBkYXRhW3hdWzBdO1xyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRlbHNlIGlmIChfdGhpcy5kb21JbnN0YW5jZSgnaW5wdXQnLCBkYXRhW3hdKSAmJiBkYXRhW3hdLnR5cGUgPT09ICdmaWxlJykge1xyXG5cdFx0XHRcdFx0XHRjb250aW51ZTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdGVsc2UgaWYgKF90aGlzLmRvbUluc3RhbmNlKCdpbnB1dCcsIGRhdGFbeF0pIHx8XHJcblx0XHRcdFx0XHRcdF90aGlzLmRvbUluc3RhbmNlKCdzZWxlY3QnLCBkYXRhW3hdKSB8fFxyXG5cdFx0XHRcdFx0XHRfdGhpcy5kb21JbnN0YW5jZSgndGV4dEFyZWEnLCBkYXRhW3hdKSkge1xyXG5cdFx0XHRcdFx0XHRkYXRhW3hdID0gZGF0YVt4XS52YWx1ZTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdGVsc2UgaWYgKF90aGlzLmRvbUluc3RhbmNlKG51bGwsIGRhdGFbeF0pKSB7XHJcblx0XHRcdFx0XHRcdGRhdGFbeF0gPSBkYXRhW3hdLmlubmVySFRNTCB8fCBkYXRhW3hdLmlubmVyVGV4dDtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHAuZGF0YSA9IGRhdGE7XHJcblx0XHRcdHJldHVybiBkYXRhO1xyXG5cdFx0fSxcclxuXHJcblx0XHQvLyBOb2RlTGlzdFRvSlNPTlxyXG5cdFx0Ly8gR2l2ZW4gYSBsaXN0IG9mIGVsZW1lbnRzIGV4dHJhcG9sYXRlIHRoZWlyIHZhbHVlcyBhbmQgcmV0dXJuIGFzIGEganNvbiBvYmplY3RcclxuXHRcdG5vZGVMaXN0VG9KU09OOiBmdW5jdGlvbihub2RlbGlzdCkge1xyXG5cclxuXHRcdFx0dmFyIGpzb24gPSB7fTtcclxuXHJcblx0XHRcdC8vIENyZWF0ZSBhIGRhdGEgc3RyaW5nXHJcblx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgbm9kZWxpc3QubGVuZ3RoOyBpKyspIHtcclxuXHJcblx0XHRcdFx0dmFyIGlucHV0ID0gbm9kZWxpc3RbaV07XHJcblxyXG5cdFx0XHRcdC8vIElmIHRoZSBuYW1lIG9mIHRoZSBpbnB1dCBpcyBlbXB0eSBvciBkaWFibGVkLCBkb250IGFkZCBpdC5cclxuXHRcdFx0XHRpZiAoaW5wdXQuZGlzYWJsZWQgfHwgIWlucHV0Lm5hbWUpIHtcclxuXHRcdFx0XHRcdGNvbnRpbnVlO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0Ly8gSXMgdGhpcyBhIGZpbGUsIGRvZXMgdGhlIGJyb3dzZXIgbm90IHN1cHBvcnQgJ2ZpbGVzJyBhbmQgJ0Zvcm1EYXRhJz9cclxuXHRcdFx0XHRpZiAoaW5wdXQudHlwZSA9PT0gJ2ZpbGUnKSB7XHJcblx0XHRcdFx0XHRqc29uW2lucHV0Lm5hbWVdID0gaW5wdXQ7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdGVsc2Uge1xyXG5cdFx0XHRcdFx0anNvbltpbnB1dC5uYW1lXSA9IGlucHV0LnZhbHVlIHx8IGlucHV0LmlubmVySFRNTDtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHJldHVybiBqc29uO1xyXG5cdFx0fVxyXG5cdH0pO1xyXG5cclxuXHQvLyBSZXBsYWNlIGl0XHJcblx0aGVsbG8uYXBpID0gZnVuY3Rpb24oKSB7XHJcblxyXG5cdFx0Ly8gR2V0IGFyZ3VtZW50c1xyXG5cdFx0dmFyIHAgPSB1dGlscy5hcmdzKHtwYXRoOiAncyEnLCBtZXRob2Q6ICdzJywgZGF0YTonbycsIHRpbWVvdXQ6ICdpJywgY2FsbGJhY2s6ICdmJ30sIGFyZ3VtZW50cyk7XHJcblxyXG5cdFx0Ly8gQ2hhbmdlIGZvciBpbnRvIGEgZGF0YSBvYmplY3RcclxuXHRcdGlmIChwLmRhdGEpIHtcclxuXHRcdFx0dXRpbHMuZGF0YVRvSlNPTihwKTtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gYXBpLmNhbGwodGhpcywgcCk7XHJcblx0fTtcclxuXHJcbn0pKGhlbGxvKTtcclxuXHJcbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuLy9cclxuLy8gU2F2ZSBhbnkgYWNjZXNzIHRva2VuIHRoYXQgaXMgaW4gdGhlIGN1cnJlbnQgcGFnZSBVUkxcclxuLy8gSGFuZGxlIGFueSByZXNwb25zZSBzb2xpY2l0ZWQgdGhyb3VnaCBpZnJhbWUgaGFzaCB0YWcgZm9sbG93aW5nIGFuIEFQSSByZXF1ZXN0XHJcbi8vXHJcbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuXHJcbmhlbGxvLnV0aWxzLnJlc3BvbnNlSGFuZGxlcih3aW5kb3csIHdpbmRvdy5vcGVuZXIgfHwgd2luZG93LnBhcmVudCk7XHJcblxyXG4vLyBTY3JpcHQgdG8gc3VwcG9ydCBDaHJvbWVBcHBzXHJcbi8vIFRoaXMgb3ZlcmlkZXMgdGhlIGhlbGxvLnV0aWxzLnBvcHVwIG1ldGhvZCB0byBzdXBwb3J0IGNocm9tZS5pZGVudGl0eS5sYXVuY2hXZWJBdXRoRmxvd1xyXG4vLyBTZWUgaHR0cHM6Ly9kZXZlbG9wZXIuY2hyb21lLmNvbS9hcHBzL2FwcF9pZGVudGl0eSNub25cclxuXHJcbi8vIElzIHRoaXMgYSBjaHJvbWUgYXBwP1xyXG5cclxuaWYgKHR5cGVvZiBjaHJvbWUgPT09ICdvYmplY3QnICYmIHR5cGVvZiBjaHJvbWUuaWRlbnRpdHkgPT09ICdvYmplY3QnICYmIGNocm9tZS5pZGVudGl0eS5sYXVuY2hXZWJBdXRoRmxvdykge1xyXG5cclxuXHQoZnVuY3Rpb24oKSB7XHJcblxyXG5cdFx0Ly8gU3dhcCB0aGUgcG9wdXAgbWV0aG9kXHJcblx0XHRoZWxsby51dGlscy5wb3B1cCA9IGZ1bmN0aW9uKHVybCkge1xyXG5cclxuXHRcdFx0cmV0dXJuIF9vcGVuKHVybCwgdHJ1ZSk7XHJcblxyXG5cdFx0fTtcclxuXHJcblx0XHQvLyBTd2FwIHRoZSBoaWRkZW4gaWZyYW1lIG1ldGhvZFxyXG5cdFx0aGVsbG8udXRpbHMuaWZyYW1lID0gZnVuY3Rpb24odXJsKSB7XHJcblxyXG5cdFx0XHRfb3Blbih1cmwsIGZhbHNlKTtcclxuXHJcblx0XHR9O1xyXG5cclxuXHRcdC8vIFN3YXAgdGhlIHJlcXVlc3RfY29ycyBtZXRob2RcclxuXHRcdGhlbGxvLnV0aWxzLnJlcXVlc3RfY29ycyA9IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XHJcblxyXG5cdFx0XHRjYWxsYmFjaygpO1xyXG5cclxuXHRcdFx0Ly8gQWx3YXlzIHJ1biBhcyBDT1JTXHJcblxyXG5cdFx0XHRyZXR1cm4gdHJ1ZTtcclxuXHRcdH07XHJcblxyXG5cdFx0Ly8gU3dhcCB0aGUgc3RvcmFnZSBtZXRob2RcclxuXHRcdHZhciBfY2FjaGUgPSB7fTtcclxuXHRcdGNocm9tZS5zdG9yYWdlLmxvY2FsLmdldCgnaGVsbG8nLCBmdW5jdGlvbihyKSB7XHJcblx0XHRcdC8vIFVwZGF0ZSB0aGUgY2FjaGVcclxuXHRcdFx0X2NhY2hlID0gci5oZWxsbyB8fCB7fTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdGhlbGxvLnV0aWxzLnN0b3JlID0gZnVuY3Rpb24obmFtZSwgdmFsdWUpIHtcclxuXHJcblx0XHRcdC8vIEdldCBhbGxcclxuXHRcdFx0aWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDApIHtcclxuXHRcdFx0XHRyZXR1cm4gX2NhY2hlO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQvLyBHZXRcclxuXHRcdFx0aWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDEpIHtcclxuXHRcdFx0XHRyZXR1cm4gX2NhY2hlW25hbWVdIHx8IG51bGw7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdC8vIFNldFxyXG5cdFx0XHRpZiAodmFsdWUpIHtcclxuXHRcdFx0XHRfY2FjaGVbbmFtZV0gPSB2YWx1ZTtcclxuXHRcdFx0XHRjaHJvbWUuc3RvcmFnZS5sb2NhbC5zZXQoe2hlbGxvOiBfY2FjaGV9KTtcclxuXHRcdFx0XHRyZXR1cm4gdmFsdWU7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdC8vIERlbGV0ZVxyXG5cdFx0XHRpZiAodmFsdWUgPT09IG51bGwpIHtcclxuXHRcdFx0XHRkZWxldGUgX2NhY2hlW25hbWVdO1xyXG5cdFx0XHRcdGNocm9tZS5zdG9yYWdlLmxvY2FsLnNldCh7aGVsbG86IF9jYWNoZX0pO1xyXG5cdFx0XHRcdHJldHVybiBudWxsO1xyXG5cdFx0XHR9XHJcblx0XHR9O1xyXG5cclxuXHRcdC8vIE9wZW4gZnVuY3Rpb25cclxuXHRcdGZ1bmN0aW9uIF9vcGVuKHVybCwgaW50ZXJhY3RpdmUpIHtcclxuXHJcblx0XHRcdC8vIExhdW5jaFxyXG5cdFx0XHR2YXIgcmVmID0ge1xyXG5cdFx0XHRcdGNsb3NlZDogZmFsc2VcclxuXHRcdFx0fTtcclxuXHJcblx0XHRcdC8vIExhdW5jaCB0aGUgd2ViQXV0aEZsb3dcclxuXHRcdFx0Y2hyb21lLmlkZW50aXR5LmxhdW5jaFdlYkF1dGhGbG93KHtcclxuXHRcdFx0XHR1cmw6IHVybCxcclxuXHRcdFx0XHRpbnRlcmFjdGl2ZTogaW50ZXJhY3RpdmVcclxuXHRcdFx0fSwgZnVuY3Rpb24ocmVzcG9uc2VVcmwpIHtcclxuXHJcblx0XHRcdFx0Ly8gRGlkIHRoZSB1c2VyIGNhbmNlbCB0aGlzIHByZW1hdHVyZWx5XHJcblx0XHRcdFx0aWYgKHJlc3BvbnNlVXJsID09PSB1bmRlZmluZWQpIHtcclxuXHRcdFx0XHRcdHJlZi5jbG9zZWQgPSB0cnVlO1xyXG5cdFx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0Ly8gU3BsaXQgYXBwYXJ0IHRoZSBVUkxcclxuXHRcdFx0XHR2YXIgYSA9IGhlbGxvLnV0aWxzLnVybChyZXNwb25zZVVybCk7XHJcblxyXG5cdFx0XHRcdC8vIFRoZSBsb2NhdGlvbiBjYW4gYmUgYXVnbWVudGVkIGluIHRvIGEgbG9jYXRpb24gb2JqZWN0IGxpa2Ugc28uLi5cclxuXHRcdFx0XHQvLyBXZSBkb250IGhhdmUgd2luZG93IG9wZXJhdGlvbnMgb24gdGhlIHBvcHVwIHNvIGxldHMgY3JlYXRlIHNvbWVcclxuXHRcdFx0XHR2YXIgX3BvcHVwID0ge1xyXG5cdFx0XHRcdFx0bG9jYXRpb246IHtcclxuXHJcblx0XHRcdFx0XHRcdC8vIENoYW5nZSB0aGUgbG9jYXRpb24gb2YgdGhlIHBvcHVwXHJcblx0XHRcdFx0XHRcdGFzc2lnbjogZnVuY3Rpb24odXJsKSB7XHJcblxyXG5cdFx0XHRcdFx0XHRcdC8vIElmIHRoZXJlIGlzIGEgc2Vjb25kYXJ5IHJlYXNzaWduXHJcblx0XHRcdFx0XHRcdFx0Ly8gSW4gdGhlIGNhc2Ugb2YgT0F1dGgxXHJcblx0XHRcdFx0XHRcdFx0Ly8gVHJpZ2dlciB0aGlzIGluIG5vbi1pbnRlcmFjdGl2ZSBtb2RlLlxyXG5cdFx0XHRcdFx0XHRcdF9vcGVuKHVybCwgZmFsc2UpO1xyXG5cdFx0XHRcdFx0XHR9LFxyXG5cclxuXHRcdFx0XHRcdFx0c2VhcmNoOiBhLnNlYXJjaCxcclxuXHRcdFx0XHRcdFx0aGFzaDogYS5oYXNoLFxyXG5cdFx0XHRcdFx0XHRocmVmOiBhLmhyZWZcclxuXHRcdFx0XHRcdH0sXHJcblx0XHRcdFx0XHRjbG9zZTogZnVuY3Rpb24oKSB7fVxyXG5cdFx0XHRcdH07XHJcblxyXG5cdFx0XHRcdC8vIFRoZW4gdGhpcyBVUkwgY29udGFpbnMgaW5mb3JtYXRpb24gd2hpY2ggSGVsbG9KUyBtdXN0IHByb2Nlc3NcclxuXHRcdFx0XHQvLyBVUkwgc3RyaW5nXHJcblx0XHRcdFx0Ly8gV2luZG93IC0gYW55IGFjdGlvbiBzdWNoIGFzIHdpbmRvdyByZWxvY2F0aW9uIGdvZXMgaGVyZVxyXG5cdFx0XHRcdC8vIE9wZW5lciAtIHRoZSBwYXJlbnQgd2luZG93IHdoaWNoIG9wZW5lZCB0aGlzLCBha2EgdGhpcyBzY3JpcHRcclxuXHJcblx0XHRcdFx0aGVsbG8udXRpbHMucmVzcG9uc2VIYW5kbGVyKF9wb3B1cCwgd2luZG93KTtcclxuXHRcdFx0fSk7XHJcblxyXG5cdFx0XHQvLyBSZXR1cm4gdGhlIHJlZmVyZW5jZVxyXG5cdFx0XHRyZXR1cm4gcmVmO1xyXG5cdFx0fVxyXG5cclxuXHR9KSgpO1xyXG59XHJcblxyXG4vLyBQaG9uZWdhcCBvdmVycmlkZSBmb3IgaGVsbG8ucGhvbmVnYXAuanNcclxuKGZ1bmN0aW9uKCkge1xyXG5cclxuXHQvLyBJcyB0aGlzIGEgcGhvbmVnYXAgaW1wbGVtZW50YXRpb24/XHJcblx0aWYgKCEoL15maWxlOlxcL3szfVteXFwvXS8udGVzdCh3aW5kb3cubG9jYXRpb24uaHJlZikgJiYgd2luZG93LmNvcmRvdmEpKSB7XHJcblx0XHQvLyBDb3Jkb3ZhIGlzIG5vdCBpbmNsdWRlZC5cclxuXHRcdHJldHVybjtcclxuXHR9XHJcblxyXG5cdC8vIEF1Z21lbnQgdGhlIGhpZGRlbiBpZnJhbWUgbWV0aG9kXHJcblx0aGVsbG8udXRpbHMuaWZyYW1lID0gZnVuY3Rpb24odXJsLCByZWRpcmVjdFVyaSkge1xyXG5cdFx0aGVsbG8udXRpbHMucG9wdXAodXJsLCByZWRpcmVjdFVyaSwge2hpZGRlbjogJ3llcyd9KTtcclxuXHR9O1xyXG5cclxuXHQvLyBBdWdtZW50IHRoZSBwb3B1cFxyXG5cdHZhciB1dGlsUG9wdXAgPSBoZWxsby51dGlscy5wb3B1cDtcclxuXHJcblx0Ly8gUmVwbGFjZSBwb3B1cFxyXG5cdGhlbGxvLnV0aWxzLnBvcHVwID0gZnVuY3Rpb24odXJsLCByZWRpcmVjdFVyaSwgb3B0aW9ucykge1xyXG5cclxuXHRcdC8vIFJ1biB0aGUgc3RhbmRhcmRcclxuXHRcdHZhciBwb3B1cCA9IHV0aWxQb3B1cC5jYWxsKHRoaXMsIHVybCwgcmVkaXJlY3RVcmksIG9wdGlvbnMpO1xyXG5cclxuXHRcdC8vIENyZWF0ZSBhIGZ1bmN0aW9uIGZvciByZW9wZW5pbmcgdGhlIHBvcHVwLCBhbmQgYXNzaWduaW5nIGV2ZW50cyB0byB0aGUgbmV3IHBvcHVwIG9iamVjdFxyXG5cdFx0Ly8gUGhvbmVHYXAgc3VwcG9ydFxyXG5cdFx0Ly8gQWRkIGFuIGV2ZW50IGxpc3RlbmVyIHRvIGxpc3RlbiB0byB0aGUgY2hhbmdlIGluIHRoZSBwb3B1cCB3aW5kb3dzIFVSTFxyXG5cdFx0Ly8gVGhpcyBtdXN0IGFwcGVhciBiZWZvcmUgcG9wdXAuZm9jdXMoKTtcclxuXHRcdHRyeSB7XHJcblx0XHRcdGlmIChwb3B1cCAmJiBwb3B1cC5hZGRFdmVudExpc3RlbmVyKSB7XHJcblxyXG5cdFx0XHRcdC8vIEdldCB0aGUgb3JpZ2luIG9mIHRoZSByZWRpcmVjdCBVUklcclxuXHJcblx0XHRcdFx0dmFyIGEgPSBoZWxsby51dGlscy51cmwocmVkaXJlY3RVcmkpO1xyXG5cdFx0XHRcdHZhciByZWRpcmVjdFVyaU9yaWdpbiA9IGEub3JpZ2luIHx8IChhLnByb3RvY29sICsgJy8vJyArIGEuaG9zdG5hbWUpO1xyXG5cclxuXHRcdFx0XHQvLyBMaXN0ZW4gdG8gY2hhbmdlcyBpbiB0aGUgSW5BcHBCcm93c2VyIHdpbmRvd1xyXG5cclxuXHRcdFx0XHRwb3B1cC5hZGRFdmVudExpc3RlbmVyKCdsb2Fkc3RhcnQnLCBmdW5jdGlvbihlKSB7XHJcblxyXG5cdFx0XHRcdFx0dmFyIHVybCA9IGUudXJsO1xyXG5cclxuXHRcdFx0XHRcdC8vIElzIHRoaXMgdGhlIHBhdGgsIGFzIGdpdmVuIGJ5IHRoZSByZWRpcmVjdFVyaT9cclxuXHRcdFx0XHRcdC8vIENoZWNrIHRoZSBuZXcgVVJMIGFnYWlucyB0aGUgcmVkaXJlY3RVcmlPcmlnaW4uXHJcblx0XHRcdFx0XHQvLyBBY2NvcmRpbmcgdG8gIzYzIGEgdXNlciBjb3VsZCBjbGljayAnY2FuY2VsJyBpbiBzb21lIGRpYWxvZyBib3hlcyAuLi4uXHJcblx0XHRcdFx0XHQvLyBUaGUgcG9wdXAgcmVkaXJlY3RzIHRvIGFub3RoZXIgcGFnZSB3aXRoIHRoZSBzYW1lIG9yaWdpbiwgeWV0IHdlIHN0aWxsIHdpc2ggaXQgdG8gY2xvc2UuXHJcblxyXG5cdFx0XHRcdFx0aWYgKHVybC5pbmRleE9mKHJlZGlyZWN0VXJpT3JpZ2luKSAhPT0gMCkge1xyXG5cdFx0XHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0Ly8gU3BsaXQgYXBwYXJ0IHRoZSBVUkxcclxuXHRcdFx0XHRcdHZhciBhID0gaGVsbG8udXRpbHMudXJsKHVybCk7XHJcblxyXG5cdFx0XHRcdFx0Ly8gV2UgZG9udCBoYXZlIHdpbmRvdyBvcGVyYXRpb25zIG9uIHRoZSBwb3B1cCBzbyBsZXRzIGNyZWF0ZSBzb21lXHJcblx0XHRcdFx0XHQvLyBUaGUgbG9jYXRpb24gY2FuIGJlIGF1Z21lbnRlZCBpbiB0byBhIGxvY2F0aW9uIG9iamVjdCBsaWtlIHNvLi4uXHJcblxyXG5cdFx0XHRcdFx0dmFyIF9wb3B1cCA9IHtcclxuXHRcdFx0XHRcdFx0bG9jYXRpb246IHtcclxuXHRcdFx0XHRcdFx0XHQvLyBDaGFuZ2UgdGhlIGxvY2F0aW9uIG9mIHRoZSBwb3B1cFxyXG5cdFx0XHRcdFx0XHRcdGFzc2lnbjogZnVuY3Rpb24obG9jYXRpb24pIHtcclxuXHJcblx0XHRcdFx0XHRcdFx0XHQvLyBVbmZvdXJ0dW5hdGx5IGFuIGFwcCBpcyBtYXkgbm90IGNoYW5nZSB0aGUgbG9jYXRpb24gb2YgYSBJbkFwcEJyb3dzZXIgd2luZG93LlxyXG5cdFx0XHRcdFx0XHRcdFx0Ly8gU28gdG8gc2hpbSB0aGlzLCBqdXN0IG9wZW4gYSBuZXcgb25lLlxyXG5cdFx0XHRcdFx0XHRcdFx0cG9wdXAuZXhlY3V0ZVNjcmlwdCh7Y29kZTogJ3dpbmRvdy5sb2NhdGlvbi5ocmVmID0gXCInICsgbG9jYXRpb24gKyAnO1wiJ30pO1xyXG5cdFx0XHRcdFx0XHRcdH0sXHJcblxyXG5cdFx0XHRcdFx0XHRcdHNlYXJjaDogYS5zZWFyY2gsXHJcblx0XHRcdFx0XHRcdFx0aGFzaDogYS5oYXNoLFxyXG5cdFx0XHRcdFx0XHRcdGhyZWY6IGEuaHJlZlxyXG5cdFx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0XHRjbG9zZTogZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0XHRcdFx0aWYgKHBvcHVwLmNsb3NlKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRwb3B1cC5jbG9zZSgpO1xyXG5cdFx0XHRcdFx0XHRcdFx0dHJ5IHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0cG9wdXAuY2xvc2VkID0gdHJ1ZTtcclxuXHRcdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0XHRcdGNhdGNoIChfZSkge31cclxuXHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdH07XHJcblxyXG5cdFx0XHRcdFx0Ly8gVGhlbiB0aGlzIFVSTCBjb250YWlucyBpbmZvcm1hdGlvbiB3aGljaCBIZWxsb0pTIG11c3QgcHJvY2Vzc1xyXG5cdFx0XHRcdFx0Ly8gVVJMIHN0cmluZ1xyXG5cdFx0XHRcdFx0Ly8gV2luZG93IC0gYW55IGFjdGlvbiBzdWNoIGFzIHdpbmRvdyByZWxvY2F0aW9uIGdvZXMgaGVyZVxyXG5cdFx0XHRcdFx0Ly8gT3BlbmVyIC0gdGhlIHBhcmVudCB3aW5kb3cgd2hpY2ggb3BlbmVkIHRoaXMsIGFrYSB0aGlzIHNjcmlwdFxyXG5cclxuXHRcdFx0XHRcdGhlbGxvLnV0aWxzLnJlc3BvbnNlSGFuZGxlcihfcG9wdXAsIHdpbmRvdyk7XHJcblxyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHRjYXRjaCAoZSkge31cclxuXHJcblx0XHRyZXR1cm4gcG9wdXA7XHJcblx0fTtcclxuXHJcbn0pKCk7XHJcblxyXG4vLyBSZWdpc3RlciBhcyBhbm9ueW1vdXMgQU1EIG1vZHVsZVxyXG5pZiAodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKSB7XHJcblx0ZGVmaW5lKGZ1bmN0aW9uKCkge1xyXG5cdFx0cmV0dXJuIGhlbGxvO1xyXG5cdH0pO1xyXG59XHJcblxyXG4vLyBDb21tb25KUyBtb2R1bGUgZm9yIGJyb3dzZXJpZnlcclxuaWYgKHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnICYmIG1vZHVsZS5leHBvcnRzKSB7XHJcblx0bW9kdWxlLmV4cG9ydHMgPSBoZWxsbztcclxufVxyXG4iLCIvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuLy8gIENvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiAgQWxsIFJpZ2h0cyBSZXNlcnZlZC4gIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gIFNlZSBMaWNlbnNlIGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXHJcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cclxuJ3VzZSBzdHJpY3QnO1xyXG5cclxuYW5ndWxhci5tb2R1bGUoJ0FwaUV4cGxvcmVyJywgWyduZ0FuaW1hdGUnLCAnbmdNYXRlcmlhbCddKVxyXG4gICAgLmNvbmZpZyhbJyRtZFRoZW1pbmdQcm92aWRlcicsIGZ1bmN0aW9uICgkbWRUaGVtaW5nUHJvdmlkZXIpIHtcclxuXHJcbiAgICAkbWRUaGVtaW5nUHJvdmlkZXIuZGVmaW5lUGFsZXR0ZSgnTzM2NVByaW1hcnlQYWxldHRlJywge1xyXG4gICAgICAgICAgICAnNTAnOiAnZTlmMGZjJyxcclxuICAgICAgICAgICAgJzEwMCc6ICdkM2UyZjgnLFxyXG4gICAgICAgICAgICAnMjAwJzogJ2JkZDNmNScsXHJcbiAgICAgICAgICAgICczMDAnOiAnOTFiNmVlJywgXHJcbiAgICAgICAgICAgICc0MDAnOiAnNjU5OWU3JyxcclxuICAgICAgICAgICAgJzUwMCc6ICc0Njg1ZTInLCAvL2JsdWVcclxuICAgICAgICAgICAgJzYwMCc6ICczODdiZTAnLFxyXG4gICAgICAgICAgICAnNzAwJzogJzIyNmRkZCcsXHJcbiAgICAgICAgICAgICc4MDAnOiAnMWY2MmM3JywgXHJcbiAgICAgICAgICAgICc5MDAnOiAnMWM1N2IwJyxcclxuICAgICAgICAgICAgJ0ExMDAnOiAnRkY2QTAwJywgXHJcbiAgICAgICAgICAgICdBMjAwJzogJ0ZGNkEwMCcsIFxyXG4gICAgICAgICAgICAnQTQwMCc6ICdGRjZBMDAnLCBcclxuICAgICAgICAgICAgJ0E3MDAnOiAnRkY2QTAwJywgXHJcbiAgICAgICAgICAgICdjb250cmFzdERlZmF1bHRDb2xvcic6ICdsaWdodCcsICAgXHJcbiAgICAgICAgICAgICdjb250cmFzdERhcmtDb2xvcnMnOiBbJzUwJywgJzEwMCcsIFxyXG4gICAgICAgICAgICAgICAgJzIwMCcsICczMDAnLCAnNDAwJywgJ0ExMDAnXSxcclxuICAgICAgICAgICAgJ2NvbnRyYXN0TGlnaHRDb2xvcnMnOiB1bmRlZmluZWQgXHJcbiAgICB9KTtcclxuICAgIFxyXG4gICAgJG1kVGhlbWluZ1Byb3ZpZGVyLmRlZmluZVBhbGV0dGUoJ08zNjVBY2NlbnRQYWxldHRlJywge1xyXG4gICAgICAgICAgICAnNTAnOiAnZmZjNDk5JyxcclxuICAgICAgICAgICAgJzEwMCc6ICdmZmI1ODAnLFxyXG4gICAgICAgICAgICAnMjAwJzogJ2ZmYTY2NicsXHJcbiAgICAgICAgICAgICczMDAnOiAnZmY5NzRkJywgXHJcbiAgICAgICAgICAgICc0MDAnOiAnZmY4ODMzJyxcclxuICAgICAgICAgICAgJzUwMCc6ICdGRjZBMDAnLCAvL29yYW5nZVxyXG4gICAgICAgICAgICAnNjAwJzogJ2U2NjAwMCcsXHJcbiAgICAgICAgICAgICc3MDAnOiAnY2M1NTAwJyxcclxuICAgICAgICAgICAgJzgwMCc6ICdiMzRhMDAnLCBcclxuICAgICAgICAgICAgJzkwMCc6ICc5OTQwMDAnLFxyXG4gICAgICAgICAgICAnQTEwMCc6ICdGRjZBMDAnLFxyXG4gICAgICAgICAgICAnQTIwMCc6ICdGRjZBMDAnLCBcclxuICAgICAgICAgICAgJ0E0MDAnOiAnRkY2QTAwJywgXHJcbiAgICAgICAgICAgICdBNzAwJzogJ0ZGNkEwMCcsIFxyXG4gICAgfSk7XHJcblxyXG4gICAgJG1kVGhlbWluZ1Byb3ZpZGVyLnRoZW1lKCdkZWZhdWx0JykucHJpbWFyeVBhbGV0dGUoJ08zNjVQcmltYXJ5UGFsZXR0ZScpO1xyXG4gICAgJG1kVGhlbWluZ1Byb3ZpZGVyLnRoZW1lKCdkZWZhdWx0JykuYWNjZW50UGFsZXR0ZSgnTzM2NUFjY2VudFBhbGV0dGUnKTtcclxufV0pOyIsIi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4vLyAgQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uICBBbGwgUmlnaHRzIFJlc2VydmVkLiAgTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiAgU2VlIExpY2Vuc2UgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cclxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcblxyXG4ndXNlIHN0cmljdCc7XHJcblxyXG52YXIgcnVuID0gZnVuY3Rpb24gKCRzY29wZSwgdXJsLCBhcGlTZXJ2aWNlKSB7XHJcbiAgICAkc2NvcGUuJGVtaXQoJ3VybENoYW5nZScsIHVybCk7XHJcbn1cclxuXHJcbnZhciBmb3JtYXRYbWwgPSBmdW5jdGlvbiAoeG1sKSB7XHJcbiAgICB2YXIgcmVnID0gLyg+KVxccyooPCkoXFwvKikvZzsgLy8gdXBkYXRlZCBNYXIgMzAsIDIwMTVcclxuICAgIHZhciB3c2V4cCA9IC8gKiguKikgK1xcbi9nO1xyXG4gICAgdmFyIGNvbnRleHAgPSAvKDwuKz4pKC4rXFxuKS9nO1xyXG4gICAgeG1sID0geG1sLnJlcGxhY2UocmVnLCAnJDFcXG4kMiQzJykucmVwbGFjZSh3c2V4cCwgJyQxXFxuJykucmVwbGFjZShjb250ZXhwLCAnJDFcXG4kMicpO1xyXG4gICAgdmFyIHBhZCA9IDA7XHJcbiAgICB2YXIgZm9ybWF0dGVkID0gJyc7XHJcbiAgICB2YXIgbGluZXMgPSB4bWwuc3BsaXQoJ1xcbicpO1xyXG4gICAgdmFyIGluZGVudCA9IDA7XHJcbiAgICB2YXIgbGFzdFR5cGUgPSAnb3RoZXInO1xyXG4gICAgLy8gNCB0eXBlcyBvZiB0YWdzIC0gc2luZ2xlLCBjbG9zaW5nLCBvcGVuaW5nLCBvdGhlciAodGV4dCwgZG9jdHlwZSwgY29tbWVudCkgLSA0KjQgPSAxNiB0cmFuc2l0aW9ucyBcclxuICAgIHZhciB0cmFuc2l0aW9ucyA9IHtcclxuICAgICAgICAnc2luZ2xlLT5zaW5nbGUnOiAwLFxyXG4gICAgICAgICdzaW5nbGUtPmNsb3NpbmcnOiAtMSxcclxuICAgICAgICAnc2luZ2xlLT5vcGVuaW5nJzogMCxcclxuICAgICAgICAnc2luZ2xlLT5vdGhlcic6IDAsXHJcbiAgICAgICAgJ2Nsb3NpbmctPnNpbmdsZSc6IDAsXHJcbiAgICAgICAgJ2Nsb3NpbmctPmNsb3NpbmcnOiAtMSxcclxuICAgICAgICAnY2xvc2luZy0+b3BlbmluZyc6IDAsXHJcbiAgICAgICAgJ2Nsb3NpbmctPm90aGVyJzogMCxcclxuICAgICAgICAnb3BlbmluZy0+c2luZ2xlJzogMSxcclxuICAgICAgICAnb3BlbmluZy0+Y2xvc2luZyc6IDAsXHJcbiAgICAgICAgJ29wZW5pbmctPm9wZW5pbmcnOiAxLFxyXG4gICAgICAgICdvcGVuaW5nLT5vdGhlcic6IDEsXHJcbiAgICAgICAgJ290aGVyLT5zaW5nbGUnOiAwLFxyXG4gICAgICAgICdvdGhlci0+Y2xvc2luZyc6IC0xLFxyXG4gICAgICAgICdvdGhlci0+b3BlbmluZyc6IDAsXHJcbiAgICAgICAgJ290aGVyLT5vdGhlcic6IDBcclxuICAgIH07XHJcblxyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaW5lcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIHZhciBsbiA9IGxpbmVzW2ldO1xyXG4gICAgICAgIHZhciBzaW5nbGUgPSBCb29sZWFuKGxuLm1hdGNoKC88LitcXC8+LykpOyAvLyBpcyB0aGlzIGxpbmUgYSBzaW5nbGUgdGFnPyBleC4gPGJyIC8+XHJcbiAgICAgICAgdmFyIGNsb3NpbmcgPSBCb29sZWFuKGxuLm1hdGNoKC88XFwvLis+LykpOyAvLyBpcyB0aGlzIGEgY2xvc2luZyB0YWc/IGV4LiA8L2E+XHJcbiAgICAgICAgdmFyIG9wZW5pbmcgPSBCb29sZWFuKGxuLm1hdGNoKC88W14hXS4qPi8pKTsgLy8gaXMgdGhpcyBldmVuIGEgdGFnICh0aGF0J3Mgbm90IDwhc29tZXRoaW5nPilcclxuICAgICAgICB2YXIgdHlwZSA9IHNpbmdsZSA/ICdzaW5nbGUnIDogY2xvc2luZyA/ICdjbG9zaW5nJyA6IG9wZW5pbmcgPyAnb3BlbmluZycgOiAnb3RoZXInO1xyXG4gICAgICAgIHZhciBmcm9tVG8gPSBsYXN0VHlwZSArICctPicgKyB0eXBlO1xyXG4gICAgICAgIGxhc3RUeXBlID0gdHlwZTtcclxuICAgICAgICB2YXIgcGFkZGluZyA9ICcnO1xyXG5cclxuICAgICAgICBpbmRlbnQgKz0gdHJhbnNpdGlvbnNbZnJvbVRvXTtcclxuICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IGluZGVudDsgaisrKSB7XHJcbiAgICAgICAgICAgIHBhZGRpbmcgKz0gJ1xcdCc7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChmcm9tVG8gPT0gJ29wZW5pbmctPmNsb3NpbmcnKVxyXG4gICAgICAgICAgICBmb3JtYXR0ZWQgPSBmb3JtYXR0ZWQuc3Vic3RyKDAsIGZvcm1hdHRlZC5sZW5ndGggLSAxKSArIGxuICsgJ1xcbic7IC8vIHN1YnN0ciByZW1vdmVzIGxpbmUgYnJlYWsgKFxcbikgZnJvbSBwcmV2IGxvb3BcclxuICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIGZvcm1hdHRlZCArPSBwYWRkaW5nICsgbG4gKyAnXFxuJztcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gZm9ybWF0dGVkO1xyXG59O1xyXG5cclxudmFyIHNob3dEdXJhdGlvbiA9IGZ1bmN0aW9uKCRzY29wZSwgc3RhcnRUaW1lKSB7XHJcbiAgICB2YXIgZW5kVGltZSA9IG5ldyBEYXRlKCk7XHJcbiAgICAkc2NvcGUuZHVyYXRpb24gPSAoZW5kVGltZS5nZXRUaW1lKCkgLSBzdGFydFRpbWUuZ2V0VGltZSgpKTtcclxuICAgICRzY29wZS5yZXF1ZXN0SW5Qcm9ncmVzcyA9IGZhbHNlO1xyXG59XHJcblxyXG5cclxuXHJcbnZhciBzaG93SGVhZGVycyA9IGZ1bmN0aW9uKCRzY29wZSwgaGVhZGVycywgc3RhdHVzKSB7XHJcbiAgIHZhciByZXNwb25zZU9iaiA9IHt9O1xyXG4gICAgaWYgKGhlYWRlcnMgIT0gbnVsbCkge1xyXG4gICAgICAgIHJlc3BvbnNlT2JqID0gaGVhZGVycygpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICByZXNwb25zZU9ialtcIlN0YXR1cyBDb2RlXCJdID0gc3RhdHVzO1xyXG4gICAgdmFyIHJlc3BvbnNlSGVhZGVycyA9IGhlYWRlcnNUb1N0cmluZyhyZXNwb25zZU9iaik7XHJcbiAgICBcclxuICAgICRzY29wZS5qc29uVmlld2VyLmdldFNlc3Npb24oKS5zZXRWYWx1ZShcIlwiKTtcclxuICAgICRzY29wZS5qc29uVmlld2VyLmdldFNlc3Npb24oKS5pbnNlcnQoMCwgcmVzcG9uc2VIZWFkZXJzKTtcclxufVxyXG5cclxudmFyIGhlYWRlcnNUb1N0cmluZyA9IGZ1bmN0aW9uKGhlYWRlcnMpe1xyXG4gICAgICB2YXIgcmV0dXJuU3RyID0gXCJcIjtcclxuICAgICAgZm9yKHZhciBrZXkgaW4gaGVhZGVycykge1xyXG4gICAgICAgICAgcmV0dXJuU3RyICs9IGtleSArIFwiOiBcIiArIGhlYWRlcnNba2V5XSArIFwiXFxuXCI7XHJcbiAgICAgIH0gXHJcbiAgICByZXR1cm4gcmV0dXJuU3RyO1xyXG59XHJcblxyXG52YXIgc2hvd1Jlc3VsdHMgPSBmdW5jdGlvbiAoJHNjb3BlLCByZXN1bHRzLCBoZWFkZXJzLCBzdGF0dXMpIHtcclxuICAgICRzY29wZS5qc29uVmlld2VyLnNldFZhbHVlKFwiXCIpO1xyXG4gICAgc2hvd0hlYWRlcnMoJHNjb3BlLCBoZWFkZXJzLCBzdGF0dXMpO1xyXG4gICAgJHNjb3BlLmpzb25WaWV3ZXIuZ2V0U2Vzc2lvbigpLmluc2VydCgwLCByZXN1bHRzKTtcclxufVxyXG5cclxudmFyIGhhbmRsZUltYWdlUmVzcG9uc2UgPSBmdW5jdGlvbiAoJHNjb3BlLCBhcGlTZXJ2aWNlLCBzdGFydFRpbWUsIHJlc3VsdHMsIGhlYWRlcnMsIHN0YXR1cywgaGFuZGxlVW5zdWNjZXNzZnVsUXVlcnlSZXNwb25zZSkge1xyXG4gICAgYXBpU2VydmljZS5wZXJmb3JtUXVlcnkoJ0dFVF9CSU5BUlknKSgkc2NvcGUudGV4dCwgXCJcIikuc3VjY2VzcyhmdW5jdGlvbiAocmVzdWx0cywgc3RhdHVzLCBoZWFkZXJzKSB7XHJcbiAgICAgICAgdmFyIGFyciA9IG5ldyBVaW50OEFycmF5KHJlc3VsdHMpO1xyXG4gICAgICAgIC8vICBEb24ndCB1c2UgZnJvbUNoYXJDb2RlLmFwcGx5IGFzIGl0IGJsb3dzIHRoZSBzdGFjayB3aXRoIG1vZGVyYXRlIHNpemUgaW1hZ2VzXHJcbiAgICAgICAgdmFyIHJhdyA9IFwiXCI7XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcnIubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgcmF3ID0gcmF3ICsgU3RyaW5nLmZyb21DaGFyQ29kZShhcnJbaV0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgYjY0ID0gYnRvYShyYXcpO1xyXG4gICAgICAgIHZhciBkYXRhVVJMID0gXCJkYXRhOmltYWdlL2pwZWc7YmFzZTY0LFwiICsgYjY0O1xyXG5cclxuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImltZ1wiKS5zcmMgPSBkYXRhVVJMO1xyXG4gICAgICAgICRzY29wZS5zaG93SnNvblZpZXdlciA9IGZhbHNlO1xyXG4gICAgICAgICRzY29wZS5zaG93SW1hZ2UgPSB0cnVlO1xyXG4gICAgICAgIHNob3dIZWFkZXJzKCRzY29wZSwgaGVhZGVycyk7XHJcbiAgICAgICAgc2hvd0R1cmF0aW9uKCRzY29wZSwgc3RhcnRUaW1lKTtcclxuICAgIH0pLmVycm9yKGhhbmRsZVVuc3VjY2Vzc2Z1bFF1ZXJ5UmVzcG9uc2UpO1xyXG59XHJcblxyXG52YXIgaGFuZGxlSHRtbFJlc3BvbnNlID0gZnVuY3Rpb24gKCRzY29wZSwgc3RhcnRUaW1lLCByZXN1bHRzLCBoZWFkZXJzLCBzdGF0dXMpIHtcclxuICAgIHNldEpzb25WaWV3ZXJDb250ZW50VHlwZShcImh0bWxcIik7XHJcbiAgICBzaG93RHVyYXRpb24oJHNjb3BlLCBzdGFydFRpbWUpO1xyXG4gICAgc2hvd1Jlc3VsdHMoJHNjb3BlLCByZXN1bHRzLCBoZWFkZXJzLCBzdGF0dXMpO1xyXG59XHJcblxyXG52YXIgaGFuZGxlSnNvblJlc3BvbnNlID0gZnVuY3Rpb24gKCRzY29wZSwgc3RhcnRUaW1lLCByZXN1bHRzLCBoZWFkZXJzLCBzdGF0dXMpIHtcclxuICAgIHNldEpzb25WaWV3ZXJDb250ZW50VHlwZShcImpzb25cIik7XHJcbiAgICByZXN1bHRzID0gSlNPTi5zdHJpbmdpZnkocmVzdWx0cywgbnVsbCwgNCk7XHJcbiAgICBzaG93RHVyYXRpb24oJHNjb3BlLCBzdGFydFRpbWUpO1xyXG4gICAgc2hvd1Jlc3VsdHMoJHNjb3BlLCByZXN1bHRzLCBoZWFkZXJzLCBzdGF0dXMpO1xyXG59XHJcblxyXG52YXIgaGFuZGxlWG1sUmVzcG9uc2UgPSBmdW5jdGlvbiAoJHNjb3BlLCBzdGFydFRpbWUsIHJlc3VsdHMsIGhlYWRlcnMsIHN0YXR1cykge1xyXG4gICAgc2V0SnNvblZpZXdlckNvbnRlbnRUeXBlKFwieG1sXCIpO1xyXG4gICAgcmVzdWx0cyA9IGZvcm1hdFhtbChyZXN1bHRzKTtcclxuICAgIHNob3dEdXJhdGlvbigkc2NvcGUsIHN0YXJ0VGltZSk7XHJcbiAgICBzaG93UmVzdWx0cygkc2NvcGUsIHJlc3VsdHMsIGhlYWRlcnMsIHN0YXR1cyk7XHJcbn1cclxuXHJcbnZhciBpc0ltYWdlUmVzcG9uc2UgPSBmdW5jdGlvbiAoaGVhZGVycykge1xyXG4gICAgdmFyIGNvbnRlbnRUeXBlID0gZ2V0Q29udGVudFR5cGUoaGVhZGVycyk7XHJcbiAgICByZXR1cm4gY29udGVudFR5cGUgPT09IFwiYXBwbGljYXRpb24vb2N0ZXQtc3RyZWFtXCIgfHwgY29udGVudFR5cGUuc3Vic3RyKDAsIDYpID09PSBcImltYWdlL1wiO1xyXG59XHJcblxyXG52YXIgaXNIdG1sUmVzcG9uc2UgPSBmdW5jdGlvbiAoaGVhZGVycykge1xyXG4gICAgdmFyIGNvbnRlbnRUeXBlID0gZ2V0Q29udGVudFR5cGUoaGVhZGVycyk7XHJcbiAgICByZXR1cm4gY29udGVudFR5cGUgPT09IFwidGV4dC9odG1sXCIgfHwgY29udGVudFR5cGUgPT09IFwiYXBwbGljYXRpb24veGh0bWwreG1sXCI7XHJcbn1cclxuXHJcbnZhciBpc1htbFJlc3BvbnNlID0gZnVuY3Rpb24gKHJlc3VsdHMpIHtcclxuICAgIC8vIERvbid0IHVzZSBoZWFkZXJzLCBjb3MgeG1sIGNvdWxkIGJlIG9mIGEgbWlsbGlvbiBjb250ZW50IHR5cGVzLlxyXG4gICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KHJlc3VsdHMsIG51bGwsIDQpLmluZGV4T2YoXCI8P3htbFwiKSAhPSAtMTtcclxufVxyXG5cclxudmFyIGlzSnNvblJlc3BvbnNlID0gZnVuY3Rpb24gKGhlYWRlcnMpIHtcclxuICAgIHZhciBjb250ZW50VHlwZSA9IGdldENvbnRlbnRUeXBlKGhlYWRlcnMpO1xyXG4gICAgcmV0dXJuIGNvbnRlbnRUeXBlID09PSBcImFwcGxpY2F0aW9uL2pzb25cIjtcclxufVxyXG5cclxudmFyIGdldENvbnRlbnRUeXBlID0gZnVuY3Rpb24oaGVhZGVycykge1xyXG4gICAgdmFyIGZ1bGwgPSBoZWFkZXJzKFwiY29udGVudC10eXBlXCIpO1xyXG4gICAgdmFyIGRlbGltaXRlclBvcyA9IGZ1bGwuaW5kZXhPZihcIjtcIik7XHJcbiAgICBpZiAoZGVsaW1pdGVyUG9zICE9IC0xKSB7XHJcbiAgICAgICAgcmV0dXJuIGZ1bGwuc3Vic3RyKDAsIGRlbGltaXRlclBvcyk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIHJldHVybiBmdWxsO1xyXG4gICAgfVxyXG59XHJcblxyXG5cclxuXHJcbnZhciBnZXRFbnRpdHlTZXRzID0gZnVuY3Rpb24oWE1MKSB7XHJcbiAgICB2YXIgZW50aXR5U2V0QXJyYXkgPSB7fTtcclxuICAgIHZhciBlbnRpdHlTZXRzID0gJCgoJC5wYXJzZUhUTUwoWE1MKSlbMl0pLmZpbmQoXCJFbnRpdHlDb250YWluZXJcIilbMF0uY2hpbGRyZW47XHJcbiAgICBmb3IodmFyIGk9MDsgaTxlbnRpdHlTZXRzLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICB2YXIgRW50aXR5U2V0ID0ge307XHJcbiAgICAgICAgICAgdmFyIG5hbWUgPSBlbnRpdHlTZXRzW2ldLmF0dHJpYnV0ZXNbMF0ubm9kZVZhbHVlO1xyXG4gICAgICAgICAgIG5hbWUgPSBuYW1lLnN1YnN0cmluZygyLCBuYW1lLmxlbmd0aC0yKTtcclxuICAgICAgICAgICBFbnRpdHlTZXQubmFtZSA9IG5hbWU7XHJcbiAgICAgICAgICAgRW50aXR5U2V0LmlzRW50aXR5U2V0ID0gdHJ1ZTtcclxuICAgICAgICAgICBFbnRpdHlTZXQuVVJMUyA9IFtdO1xyXG4gICAgICAgICAgIHZhciB0eXBlID0gZW50aXR5U2V0c1tpXS5hdHRyaWJ1dGVzWzFdLm5vZGVWYWx1ZTtcclxuICAgICAgICAgICB2YXIgaW5kZXggPSB0eXBlLmluZGV4T2YoXCJncmFwaC5cIilcclxuICAgICAgICAgICB0eXBlID0gdHlwZS5zdWJzdHJpbmcoaW5kZXgrNiwgdHlwZS5sZW5ndGgtMik7XHJcbiAgICAgICAgICAgRW50aXR5U2V0LmVudGl0eVR5cGUgPSB0eXBlO1xyXG4gICAgICAgICAgIGVudGl0eVNldEFycmF5W0VudGl0eVNldC5uYW1lXSA9IEVudGl0eVNldDtcclxuICAgIH1cclxuICAgIHJldHVybiBlbnRpdHlTZXRBcnJheTtcclxufVxyXG5cclxuXHJcblxyXG52YXIgZmluZE5hbWVJbmRleCA9IGZ1bmN0aW9uKGFycmF5KSB7XHJcbiAgICBmb3IodmFyIGk9MDsgaTxhcnJheS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGlmKGFycmF5W2ldLm5hbWUgPT09IFwibmFtZVwiKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxudmFyIGZpbmRUeXBlSW5kZXggPSBmdW5jdGlvbihhcnJheSl7XHJcbiAgICBmb3IodmFyIGk9MDsgaTxhcnJheS5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgaWYoYXJyYXlbaV0ubmFtZSA9PT0gXCJ0eXBlXCIpe1xyXG4gICAgICAgICAgICByZXR1cm4gaTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbnZhciBmb3JtYXRSZXF1ZXN0SGVhZGVycyA9IGZ1bmN0aW9uKGhlYWRlcnMpe1xyXG4gICAgdmFyIG9iaiA9IHt9O1xyXG4gICAgdmFyIHBhcnRzID0gaGVhZGVycy5yZXBsYWNlKC9eXFxzK3wsXFxzKiQvZywgJycpLnNwbGl0KCdcXG4nKTtcclxuICAgIFxyXG4gICAgZm9yKHZhciBpID0gMCwgbGVuID0gcGFydHMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcclxuICAgICAgICB2YXIgbWF0Y2ggPSBwYXJ0c1tpXS5tYXRjaCgvXlxccypcIj8oW15cIjpdKilcIj9cXHMqOlxccypcIj8oW15cIl0qKVxccyokLyk7XHJcbiAgICAgICAgaWYobWF0Y2gpIHtcclxuICAgICAgICAgICAgb2JqW21hdGNoWzFdXSA9IG1hdGNoWzJdO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIFxyXG4gICByZXR1cm4gb2JqOyBcclxufVxyXG5cclxudmFyIGNyZWF0ZUVudGl0eVR5cGVPYmplY3QgPSBmdW5jdGlvbihyZXR1cm5BcnJheSwgRE9NYXJyYXkpIHtcclxuICAgIGZvcih2YXIgaT0wOyBpPERPTWFycmF5Lmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICB2YXIgRW50aXR5VHlwZSA9IHt9O1xyXG4gICAgICAgICAgIHZhciBuYW1lID0gRE9NYXJyYXlbaV0uYXR0cmlidXRlc1tcIm5hbWVcIl0ubm9kZVZhbHVlO1xyXG4gICAgICAgICAgIG5hbWUgPSBuYW1lLnN1YnN0cmluZygyLCBuYW1lLmxlbmd0aC0yKTtcclxuICAgICAgICAgICBFbnRpdHlUeXBlLm5hbWUgPSBuYW1lO1xyXG4gICAgICAgICAgIEVudGl0eVR5cGUuaXNFbnRpdHlTZXQgPSBmYWxzZTtcclxuICAgICAgICAgICBFbnRpdHlUeXBlLlVSTFMgPSBbXTtcclxuICAgICAgICAgICB2YXIgY2hpbGRyZW4gPSBET01hcnJheVtpXS5jaGlsZHJlbjtcclxuICAgICAgICAgICBmb3IodmFyIGo9MDsgajxjaGlsZHJlbi5sZW5ndGg7IGorKyl7XHJcbiAgICAgICAgICAgICAgICAgaWYoY2hpbGRyZW5bal0uYXR0cmlidXRlcy5sZW5ndGggPiAwKXtcclxuICAgICAgICAgICAgICAgICAgICAgdmFyIG5hbWVJbmRleCA9IGZpbmROYW1lSW5kZXgoY2hpbGRyZW5bal0uYXR0cmlidXRlcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgIHZhciB0eXBlSW5kZXggPSBmaW5kVHlwZUluZGV4KGNoaWxkcmVuW2pdLmF0dHJpYnV0ZXMpO1xyXG4gICAgICAgICAgICAgICAgICAgICB2YXIgY2hpbGROYW1lID0gY2hpbGRyZW5bal0uYXR0cmlidXRlc1tuYW1lSW5kZXhdLm5vZGVWYWx1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgY2hpbGROYW1lID0gY2hpbGROYW1lLnN1YnN0cmluZygyLCBjaGlsZE5hbWUubGVuZ3RoLTIpO1xyXG4gICAgICAgICAgICAgICAgICAgICB2YXIgY29sbGVjdGlvbiA9IGNoaWxkcmVuW2pdLmF0dHJpYnV0ZXNbdHlwZUluZGV4XS5ub2RlVmFsdWU7XHJcbiAgICAgICAgICAgICAgICAgICAgIGNvbGxlY3Rpb24gPSBjb2xsZWN0aW9uLnN1YnN0cmluZygyLCAxMik7XHJcbiAgICAgICAgICAgICAgICAgICAgIHZhciB0eXBlID0gY2hpbGRyZW5bal0uYXR0cmlidXRlc1t0eXBlSW5kZXhdLm5vZGVWYWx1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgdmFyIGluZGV4ID0gdHlwZS5sYXN0SW5kZXhPZihcIi5cIilcclxuICAgICAgICAgICAgICAgICAgICAgdHlwZSA9IHR5cGUuc3Vic3RyaW5nKGluZGV4KzEsIHR5cGUubGVuZ3RoLTIpO1xyXG4gICAgICAgICAgICAgICAgICAgICBpZih0eXBlLmNoYXJBdCh0eXBlLmxlbmd0aC0xKSA9PSBcIilcIil7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlID0gdHlwZS5zdWJzdHJpbmcoMCwgdHlwZS5sZW5ndGgtMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgdmFyIHVybE9iamVjdCA9IHt9O1xyXG4gICAgICAgICAgICAgICAgICAgICB1cmxPYmplY3QuaXNBQ29sbGVjdGlvbiA9IChjb2xsZWN0aW9uID09PSBcIkNvbGxlY3Rpb25cIikgJiYgKGluZGV4ID4wKTtcclxuICAgICAgICAgICAgICAgICAgICAgdXJsT2JqZWN0Lm5hbWUgPSBjaGlsZE5hbWU7XHJcbiAgICAgICAgICAgICAgICAgICAgIHVybE9iamVjdC50eXBlID0gdHlwZTtcclxuICAgICAgICAgICAgICAgICAgICAgRW50aXR5VHlwZS5VUkxTLnB1c2godXJsT2JqZWN0KTtcclxuICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgICAgICByZXR1cm5BcnJheVtFbnRpdHlUeXBlLm5hbWVdID0gRW50aXR5VHlwZTtcclxuICAgIH0gICAgXHJcbiAgICByZXR1cm4gcmV0dXJuQXJyYXk7XHJcbn1cclxuXHJcbnZhciBzaG93UmVxdWVzdEhlYWRlcnMgPSBmdW5jdGlvbigkc2NvcGUpIHtcclxuICAgIGlmICghJHNjb3BlLmpzb25FZGl0b3JIZWFkZXJzKSByZXR1cm47XHJcbiAgICAkc2NvcGUuanNvbkVkaXRvckhlYWRlcnMuZ2V0U2Vzc2lvbigpLnNldFZhbHVlKFwiXCIpO1xyXG4gICAgdmFyIHJlcXVlc3RIZWFkZXJzID0gXCJDb250ZW50LVR5cGU6IGFwcGxpY2F0aW9uL2pzb25cIlxyXG4gICAgJHNjb3BlLmpzb25FZGl0b3JIZWFkZXJzLmdldFNlc3Npb24oKS5pbnNlcnQoMCwgcmVxdWVzdEhlYWRlcnMpO1xyXG59XHJcblxyXG52YXIgZ2V0RW50aXR5VHlwZXMgPSBmdW5jdGlvbihYTUwpe1xyXG4gICAgdmFyIGVudGl0eVR5cGVzQXJyYXkgPSB7fTtcclxuICAgIHZhciBlbnRpdHlUeXBlcyA9ICQoKCQucGFyc2VIVE1MKFhNTCkpWzJdKS5maW5kKFwiRW50aXR5VHlwZVwiKTtcclxuICAgIGVudGl0eVR5cGVzQXJyYXkgPSBjcmVhdGVFbnRpdHlUeXBlT2JqZWN0KGVudGl0eVR5cGVzQXJyYXksIGVudGl0eVR5cGVzKTtcclxuICAgIFxyXG4gICAgdmFyIGNvbXBsZXhUeXBlcyA9ICQoKCQucGFyc2VIVE1MKFhNTCkpWzJdKS5maW5kKFwiQ29tcGxleFR5cGVcIik7XHJcbiAgICBlbnRpdHlUeXBlc0FycmF5ID0gY3JlYXRlRW50aXR5VHlwZU9iamVjdChlbnRpdHlUeXBlc0FycmF5LCBjb21wbGV4VHlwZXMpO1xyXG4gICAgXHJcbiAgICByZXR1cm4gZW50aXR5VHlwZXNBcnJheTtcclxufVxyXG5cclxudmFyIG15VHJpbSA9IGZ1bmN0aW9uKHdvcmQpe1xyXG4gICAgICB2YXIgcmV0dXJuV29yZCA9IHdvcmQ7XHJcbiAgICAgIGlmKHJldHVybldvcmQgIT0gbnVsbCl7XHJcbiAgICAgICAgICB3aGlsZShyZXR1cm5Xb3JkLmNoYXJBdChyZXR1cm5Xb3JkLmxlbmd0aC0xKSA9PSBcIi9cIiApe1xyXG4gICAgICAgICAgICAgIHJldHVybldvcmQgPSByZXR1cm5Xb3JkLnJlcGxhY2UoL1xcLyQvLCBcIlwiKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIHJldHVybiByZXR1cm5Xb3JkOyBcclxuICAgICAgfVxyXG59IFxyXG5cclxudmFyIGdldEVudGl0eU5hbWUgPSBmdW5jdGlvbihVUkwpe1xyXG4gICAgIHZhciByZXR1cm5Xb3JkID0gbXlUcmltKFVSTCk7XHJcbiAgICAgaWYocmV0dXJuV29yZCAhPSBudWxsKXtcclxuICAgICAgICAgcmV0dXJuV29yZCA9IHJldHVybldvcmQuc3Vic3RyaW5nKHJldHVybldvcmQubGFzdEluZGV4T2YoXCIvXCIpKzEsIHJldHVybldvcmQubGVuZ3RoKTtcclxuICAgICB9XHJcbiAgICAgcmV0dXJuIHJldHVybldvcmQ7XHJcbn1cclxuXHJcblxyXG52YXIgZ2V0UHJldmlvdXNDYWxsID0gZnVuY3Rpb24oVVJMLCBlbnRpdHlOYW1lKXtcclxuICAgIHZhciBpbmRleCA9IFVSTC5pbmRleE9mKGVudGl0eU5hbWUpO1xyXG4gICAgcmV0dXJuIFVSTC5zdWJzdHIoMCwgaW5kZXgtMSk7XHJcbn1cclxuXHJcblxyXG52YXIgc2V0RW50aXR5ID0gZnVuY3Rpb24oZW50aXR5SXRlbSwgc2VydmljZSwgbGFzdENhbGxTdWNjZXNzZnVsKSB7XHJcbiAgICBcclxuICAgaWYgKGdldEVudGl0eU5hbWUoc2VydmljZS50ZXh0KSA9PSBzZXJ2aWNlLnNlbGVjdGVkVmVyc2lvbikge1xyXG4gICAgICAgICAgICAgdmFyIGVudGl0eU9iaiA9IHt9O1xyXG4gICAgICAgICAgICAgZW50aXR5T2JqLm5hbWUgPSBzZXJ2aWNlLnNlbGVjdGVkVmVyc2lvbjtcclxuICAgICAgICAgICAgIHNlcnZpY2UuZW50aXR5ID0gZW50aXR5T2JqOyBcclxuICAgICAgICAgICAgIHJldHVybjtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICB2YXIgZW50aXR5TmFtZSA9IGdldEVudGl0eU5hbWUoc2VydmljZS50ZXh0KTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgdmFyIHByZXZDYWxsTmFtZSA9IGdldEVudGl0eU5hbWUoZ2V0UHJldmlvdXNDYWxsKHNlcnZpY2UudGV4dCwgZW50aXR5TmFtZSkpO1xyXG4gICAgdmFyIHR3b1ByZXZDYWxsc05hbWUgPSBnZXRFbnRpdHlOYW1lKGdldFByZXZpb3VzQ2FsbChnZXRQcmV2aW91c0NhbGwoc2VydmljZS50ZXh0LCBlbnRpdHlOYW1lKSwgcHJldkNhbGxOYW1lKSk7XHJcbiAgICBpZiAoZW50aXR5TmFtZSA9PT0gXCJtZVwiICYmIGxhc3RDYWxsU3VjY2Vzc2Z1bCkge1xyXG4gICAgICAgIHByZXZDYWxsTmFtZSA9IFwidXNlcnNcIjtcclxuICAgIH0gZWxzZSBpZiAodHdvUHJldkNhbGxzTmFtZSA9PT0gXCJtZVwiICYmIGxhc3RDYWxsU3VjY2Vzc2Z1bCkge1xyXG4gICAgICAgIHR3b1ByZXZDYWxsc05hbWUgPSBcInVzZXJcIjtcclxuICAgIH1cclxuICAgIFxyXG4gICAgdmFyIGVudGl0eVNldCA9IHNlcnZpY2UuY2FjaGUuZ2V0KHNlcnZpY2Uuc2VsZWN0ZWRWZXJzaW9uICsgXCJFbnRpdHlTZXREYXRhXCIpW3ByZXZDYWxsTmFtZV07XHJcbiAgICB2YXIgZW50aXR5VHlwZSA9IHNlcnZpY2UuY2FjaGUuZ2V0KHNlcnZpY2Uuc2VsZWN0ZWRWZXJzaW9uICsgXCJFbnRpdHlUeXBlRGF0YVwiKVtwcmV2Q2FsbE5hbWVdOyBcclxuICAgIHZhciB0d29QcmV2RW50aXR5VHlwZSA9IHNlcnZpY2UuY2FjaGUuZ2V0KHNlcnZpY2Uuc2VsZWN0ZWRWZXJzaW9uICsgXCJFbnRpdHlUeXBlRGF0YVwiKVt0d29QcmV2Q2FsbHNOYW1lXTtcclxuICAgIHZhciB0d29QcmV2RW50aXR5U2V0ID0gc2VydmljZS5jYWNoZS5nZXQoc2VydmljZS5zZWxlY3RlZFZlcnNpb24gKyBcIkVudGl0eVNldERhdGFcIilbdHdvUHJldkNhbGxzTmFtZV07XHJcbiAgICB2YXIgY29sbGVjdGlvbiA9IGZhbHNlO1xyXG4gICAgaWYgKHR3b1ByZXZFbnRpdHlTZXQpIHtcclxuICAgICAgICBmb3IodmFyIGk9MDsgaTx0d29QcmV2RW50aXR5U2V0LlVSTFMubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICBpZih0d29QcmV2RW50aXR5U2V0LlVSTFNbaV0ubmFtZSA9PSBwcmV2Q2FsbE5hbWUpe1xyXG4gICAgICAgICAgICAgICAgY29sbGVjdGlvbiA9IHR3b1ByZXZFbnRpdHlTZXQuVVJMU1tpXS5pc0FDb2xsZWN0aW9uO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSBlbHNlIGlmICh0d29QcmV2RW50aXR5VHlwZSkge1xyXG4gICAgICAgIGZvcih2YXIgaT0wOyBpPHR3b1ByZXZFbnRpdHlUeXBlLlVSTFMubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICBpZih0d29QcmV2RW50aXR5VHlwZS5VUkxTW2ldLm5hbWUgPT0gcHJldkNhbGxOYW1lKXtcclxuICAgICAgICAgICAgICAgIGNvbGxlY3Rpb24gPSB0d29QcmV2RW50aXR5VHlwZS5VUkxTW2ldLmlzQUNvbGxlY3Rpb247XHJcbiAgICAgICAgICAgICAgICB2YXIgY29sbGVjdGlvblR5cGUgPSB0d29QcmV2RW50aXR5VHlwZS5VUkxTW2ldLnR5cGU7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIFxyXG4gICAgc2VydmljZS5lbnRpdHlOYW1lSXNBbklkID1cclxuICAgICAgICAoKChlbnRpdHlTZXQgJiYgIWVudGl0eVR5cGUpIHx8IChlbnRpdHlTZXQgJiYgdHdvUHJldkNhbGxzTmFtZSA9PT0gc2VydmljZS5zZWxlY3RlZFZlcnNpb24pKVxyXG4gICAgICAgICYmIGxhc3RDYWxsU3VjY2Vzc2Z1bCAmJiAocHJldkNhbGxOYW1lICE9IFwibWVcIikpXHJcbiAgICAgICAgfHwgKGNvbGxlY3Rpb24gJiYgbGFzdENhbGxTdWNjZXNzZnVsKTtcclxuICAgIFxyXG4gICAgaWYgKHNlcnZpY2UuZW50aXR5TmFtZUlzQW5JZCkge1xyXG4gICAgICAgIC8vJGxvZy5sb2coXCJlbnRpdHkgbmFtZSBpcyBhbiBpZFwiKTtcclxuICAgICAgICB2YXIgdHlwZU5hbWU7XHJcbiAgICAgICAgaWYgKGNvbGxlY3Rpb24pIHtcclxuICAgICAgICAgICAgLy8kbG9nLmxvZyhcImlzIGEgY29sbGVjdGlvblwiKTtcclxuICAgICAgICAgICAgdHlwZU5hbWUgPSBjb2xsZWN0aW9uVHlwZTtcclxuICAgICAgICAgICAgLy8kbG9nLmxvZyh0eXBlTmFtZSk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChlbnRpdHlTZXQpIHtcclxuICAgICAgICAgICAgdHlwZU5hbWUgPSBlbnRpdHlTZXQuZW50aXR5VHlwZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNlcnZpY2UuZW50aXR5ID0gc2VydmljZS5jYWNoZS5nZXQoc2VydmljZS5zZWxlY3RlZFZlcnNpb24gKyBcIkVudGl0eVR5cGVEYXRhXCIpW3R5cGVOYW1lXTtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgIGlmICghZW50aXR5VHlwZSAmJiBlbnRpdHlTZXQpIHtcclxuICAgICAgICAgICAgZW50aXR5VHlwZSA9IHNldFRvU2V0T3JUeXBlKHNlcnZpY2UsIGVudGl0eVNldC5lbnRpdHlUeXBlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChlbnRpdHlUeXBlKSB7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAvLyBJRSBjbGFpbXMgYXJyYXkuZmluZCBjb2RlIGJlbG93IGhhcyBzeW50YXggZXJyb3IsIHByb2JhYmx5IGR1ZSB0byBsYWNrIG9mIHN1cHBvcnQuXHJcbiAgICAgICAgICAgIC8vIHZhciBtYXRjaGluZ0VsZW1lbnQgPSBlbnRpdHlUeXBlLlVSTFMuZmluZCh1ID0+IHUubmFtZSA9PT0gZW50aXR5TmFtZSAmJiAhdS5pc0FDb2xsZWN0aW9uKTtcclxuICAgICAgICAgICAgdmFyIG1hdGNoaW5nRWxlbWVudCA9IG51bGw7XHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZW50aXR5VHlwZS5VUkxTLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZW50aXR5VHlwZS5VUkxTW2ldLm5hbWUgPT0gZW50aXR5TmFtZSAmJiAhZW50aXR5VHlwZS5VUkxTW2ldLmlzQUNvbGxlY3Rpb24pIHtcclxuICAgICAgICAgICAgICAgICAgICBtYXRjaGluZ0VsZW1lbnQgPSBlbnRpdHlUeXBlLlVSTFNbaV07XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChtYXRjaGluZ0VsZW1lbnQpIHtcclxuICAgICAgICAgICAgICAgIHNlcnZpY2UuZW50aXR5ID0gc2V0VG9TZXRPclR5cGUoc2VydmljZSwgbWF0Y2hpbmdFbGVtZW50LnR5cGUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgc2VydmljZS5lbnRpdHkgPSBudWxsO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgc2VydmljZS5lbnRpdHkgPSBzZXRUb1NldE9yVHlwZShzZXJ2aWNlLCBlbnRpdHlOYW1lLCBwcmV2Q2FsbE5hbWUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxudmFyIHNldFRvU2V0T3JUeXBlID0gZnVuY3Rpb24oc2VydmljZSwgZW50aXR5TmFtZSwgcHJldkNhbGxOYW1lKSB7XHJcbiAgICAgIHZhciBpc0VudGl0eVNldCA9IHNlcnZpY2UuY2FjaGUuZ2V0KHNlcnZpY2Uuc2VsZWN0ZWRWZXJzaW9uICsgXCJFbnRpdHlTZXREYXRhXCIpW2VudGl0eU5hbWVdO1xyXG4gICAgICB2YXIgaXNFbnRpdHlUeXBlID0gc2VydmljZS5jYWNoZS5nZXQoc2VydmljZS5zZWxlY3RlZFZlcnNpb24gKyBcIkVudGl0eVR5cGVEYXRhXCIpW2VudGl0eU5hbWVdO1xyXG4gICAgICBpZihpc0VudGl0eVNldCAmJiAhaXNFbnRpdHlUeXBlKXtcclxuICAgICAgICAgIHJldHVybiBpc0VudGl0eVNldDtcclxuICAgICAgfWVsc2UgaWYoaXNFbnRpdHlUeXBlICYmICFpc0VudGl0eVNldCl7XHJcbiAgICAgICAgICByZXR1cm4gaXNFbnRpdHlUeXBlO1xyXG4gICAgICB9ZWxzZSBpZihpc0VudGl0eVNldCAmJiBpc0VudGl0eVR5cGUpe1xyXG4gICAgICAgICAgIGlmKHByZXZDYWxsTmFtZSA9PT0gc2VydmljZS5zZWxlY3RlZFZlcnNpb24pe1xyXG4gICAgICAgICAgICAgICByZXR1cm4gaXNFbnRpdHlTZXRcclxuICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgcmV0dXJuIGlzRW50aXR5VHlwZTtcclxuICAgICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIFxyXG59XHJcblxyXG52YXIgc2hvd1JlcXVlc3RCb2R5RWRpdG9yID0gZnVuY3Rpb24oKSB7XHJcbiAgICBzLnRhYkNvbmZpZy5kaXNhYmxlUmVxdWVzdEJvZHlFZGl0b3IgPSBmYWxzZTtcclxuICAgIHMudGFiQ29uZmlnLmhpZGVDb250ZW50ID0gZmFsc2U7XHJcbiAgICBzaG93UmVxdWVzdEhlYWRlcnMocyk7XHJcbiAgICAkKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGluaXRpYWxpemVKc29uRWRpdG9yKHMpO1xyXG4gICAgICAgIHNldFNlbGVjdGVkVGFiKDEpO1xyXG4gICAgfSlcclxufVxyXG5cclxudmFyIHNldFNlbGVjdGVkVGFiID0gZnVuY3Rpb24obnVtKSB7XHJcbiAgICBpZiAobnVtID49IDIgfHwgbnVtIDwgMCkge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIHMudGFiQ29uZmlnLnNlbGVjdGVkID0gbnVtO1xyXG4gICAgcy50YWJDb25maWcucHJldmlvdXNTZWxlY3RlZCA9IHMudGFiQ29uZmlnLnNlbGVjdGVkO1xyXG59XHJcblxyXG52YXIgaGFuZGxlUXVlcnlTdHJpbmcgPSBmdW5jdGlvbihzZXJ2aWNlLCBhY3Rpb25WYWx1ZSwgdmVyc2lvblZhbHVlLCByZXF1ZXN0VmFsdWUpIHtcclxuICAgIGlmKGFjdGlvblZhbHVlKXtcclxuICAgICAgICBzZXJ2aWNlLnNlbGVjdGVkT3B0aW9uID0gYWN0aW9uVmFsdWUudG9VcHBlckNhc2UoKTtcclxuICAgICAgICBpZihzZXJ2aWNlLnNlbGVjdGVkT3B0aW9uID09PSAnUE9TVCcgfHwgc2VydmljZS5zZWxlY3RlZE9wdGlvbiA9PT0gJ1BBVENIJykge1xyXG4gICAgICAgICAgICBpZihoZWxsbygnbXNmdCcpLmdldEF1dGhSZXNwb25zZSgpICE9IG51bGwpXHJcbiAgICAgICAgICAgICAgICBzaG93UmVxdWVzdEJvZHlFZGl0b3IoKTtcclxuICAgICAgICB9XHJcbiAgIH1cclxuICAgICAgICBcclxuICAgaWYgKHZlcnNpb25WYWx1ZSkge1xyXG4gICAgICAgIHNlcnZpY2Uuc2VsZWN0ZWRWZXJzaW9uID0gdmVyc2lvblZhbHVlO1xyXG4gICB9XHJcbiAgIGlmIChyZXF1ZXN0VmFsdWUpIHtcclxuICAgICAgICBzZXJ2aWNlLnRleHQgPSBcImh0dHBzOi8vZ3JhcGgubWljcm9zb2Z0LmNvbS9cIiArIHNlcnZpY2Uuc2VsZWN0ZWRWZXJzaW9uICsgXCIvXCIgKyByZXF1ZXN0VmFsdWU7XHJcbiAgIH1cclxufVxyXG5cclxudmFyIHBhcnNlTWV0YWRhdGEgPSBmdW5jdGlvbihzZXJ2aWNlLCAkc2NvcGUpe1xyXG4gICAgdmFyIGVudGl0eVNldERhdGEsIGVudGl0eVR5cGVEYXRhO1xyXG4gICAgaWYoIXNlcnZpY2UuY2FjaGUuZ2V0KHNlcnZpY2Uuc2VsZWN0ZWRWZXJzaW9uICsgXCJNZXRhZGF0YVwiKSkge1xyXG4gICAgICAgICBjb25zb2xlLmxvZyhcInBhcnNpbmcgbWV0YWRhdGFcIik7XHJcbiAgICAgICAgIHNlcnZpY2UuZ2V0TWV0YWRhdGEoKS50aGVuKGZ1bmN0aW9uKHJlc3VsdHMpIHtcclxuICAgICAgICAgICAgICAgIHJlc3VsdHMgPSBKU09OLnN0cmluZ2lmeShyZXN1bHRzLCBudWxsLCA0KS50cmltKCk7XHJcbiAgICAgICAgICAgICAgICBzZXJ2aWNlLmNhY2hlLnB1dChzZXJ2aWNlLnNlbGVjdGVkVmVyc2lvbiArIFwiTWV0YWRhdGFcIiwgcmVzdWx0cyk7XHJcbiAgICAgICAgICAgICAgICBlbnRpdHlTZXREYXRhID0gZ2V0RW50aXR5U2V0cyhyZXN1bHRzKTtcclxuICAgICAgICAgICAgICAgIHNlcnZpY2UuY2FjaGUucHV0KHNlcnZpY2Uuc2VsZWN0ZWRWZXJzaW9uICsgXCJFbnRpdHlTZXREYXRhXCIsIGVudGl0eVNldERhdGEpO1xyXG4gICAgICAgICAgICAgICAgZW50aXR5VHlwZURhdGEgPSBnZXRFbnRpdHlUeXBlcyhyZXN1bHRzKTtcclxuICAgICAgICAgICAgICAgIHNlcnZpY2UuY2FjaGUucHV0KHNlcnZpY2Uuc2VsZWN0ZWRWZXJzaW9uICsgXCJFbnRpdHlUeXBlRGF0YVwiLCBlbnRpdHlUeXBlRGF0YSk7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIm1ldGFkYXRhIHN1Y2Nlc3NmdWxseSBwYXJzZWRcIik7XHJcbiAgICAgICAgICAgICAgICBpZihzZXJ2aWNlLmVudGl0eSA9PSBcIlwiKXtcclxuICAgICAgICAgICAgICAgICAgICBzZXJ2aWNlLmVudGl0eSA9IGVudGl0eVR5cGVEYXRhW1widXNlclwiXTtcclxuICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIHNlcnZpY2UuZW50aXR5ID0gZW50aXR5VHlwZURhdGFbZ2V0RW50aXR5TmFtZShzZXJ2aWNlLnRleHQpXTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgJHNjb3BlLiRyb290LiRicm9hZGNhc3QoXCJ1cGRhdGVVcmxPcHRpb25zXCIpO1xyXG4gICAgICAgICB9LCBmdW5jdGlvbihlcnIsIHN0YXR1cyl7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJtZXRhZGF0YSBjb3VsZCBub3QgYmUgcGFyc2VkXCIpO1xyXG4gICAgICAgICB9KTtcclxuICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgJHNjb3BlLiRyb290LiRicm9hZGNhc3QoXCJ1cGRhdGVVcmxPcHRpb25zXCIpO1xyXG4gICAgIH1cclxufSIsIi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4vLyAgQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uICBBbGwgUmlnaHRzIFJlc2VydmVkLiAgTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiAgU2VlIExpY2Vuc2UgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cclxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcblxyXG4ndXNlIHN0cmljdCc7XHJcblxyXG5hbmd1bGFyLm1vZHVsZSgnQXBpRXhwbG9yZXInKVxyXG4uY29uZmlnKGZ1bmN0aW9uKCRsb2NhdGlvblByb3ZpZGVyKSB7XHJcbiAgICAkbG9jYXRpb25Qcm92aWRlci5odG1sNU1vZGUoe1xyXG4gICAgICAgIGVuYWJsZWQ6IHRydWUsXHJcbiAgICAgICAgcmVxdWlyZUJhc2U6IGZhbHNlXHJcbiAgICB9KTtcclxuICAgIFxyXG59KVxyXG4uZmFjdG9yeSgnQXBpRXhwbG9yZXJTdmMnLCBbZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIGFwaUV4cGxvcmVyU2VydmljZSA9IHt9O1xyXG4gICAgcmV0dXJuIGFwaUV4cGxvcmVyU2VydmljZTtcclxufV0pOyIsIi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4vLyAgQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uICBBbGwgUmlnaHRzIFJlc2VydmVkLiAgTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiAgU2VlIExpY2Vuc2UgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cclxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcblxyXG4ndXNlIHN0cmljdCc7XHJcblxyXG5hbmd1bGFyLm1vZHVsZSgnQXBpRXhwbG9yZXInKVxyXG4gICAgLmZhY3RvcnkoJ0FwaUV4cGxvcmVyU3ZjJywgWyckaHR0cCcsICckY2FjaGVGYWN0b3J5JywgZnVuY3Rpb24gKCRodHRwLCAkY2FjaGVGYWN0b3J5KSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHRleHQ6ICdodHRwczovL2dyYXBoLm1pY3Jvc29mdC5jb20vdjEuMC9tZS8nLFxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgc2VsZWN0ZWRWZXJzaW9uOiBcInYxLjBcIixcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHNlbGVjdGVkT3B0aW9uOiBcIkdFVFwiLFxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgc2hvd0pzb25FZGl0b3I6IGZhbHNlLFxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgc2hvd0pzb25WaWV3ZXI6IHRydWUsXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBjYWNoZTogJGNhY2hlRmFjdG9yeSgnbXlDYWNoZScpLFxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgLyogICBpZDogbnVsbCwqL1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgZW50aXR5OiBcIlwiLFxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgZW50aXR5TmFtZUlzQW5JZDogZmFsc2UsXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBwZXJmb3JtQW5vbnltb3VzUXVlcnk6IGZ1bmN0aW9uIChxdWVyeVR5cGUpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbiAocXVlcnksIHBvc3RTdHJpbmcsIHJlcXVlc3RIZWFkZXJzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBoZWFkZXJzT2JqID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJBdXRob3JpemF0aW9uXCI6IFwiQmVhcmVyIHt0b2tlbjpodHRwczovL2dyYXBoLm1pY3Jvc29mdC5jb20vfVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJBY2NlcHRcIjogXCJhcHBsaWNhdGlvbi9qc29uXCJcclxuICAgICAgICAgICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAocmVxdWVzdEhlYWRlcnMgJiYgcmVxdWVzdEhlYWRlcnNbXCJBdXRob3JpemF0aW9uXCJdKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaGVhZGVyc09ialtcIkF1dGhvcml6YXRpb25cIl0gPSByZXF1ZXN0SGVhZGVyc1tcIkF1dGhvcml6YXRpb25cIl07XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAocmVxdWVzdEhlYWRlcnMgJiYgcmVxdWVzdEhlYWRlcnNbXCJBY2NlcHRcIl0pe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBoZWFkZXJzT2JqW1wiQWNjZXB0XCJdID0gcmVxdWVzdEhlYWRlcnNbXCJBY2NlcHRcIl07XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICB2YXIgcmVxdWVzdCA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdXJsOiAnaHR0cHM6Ly9wcm94eS5hcGlzYW5kYm94Lm1zZG4ubWljcm9zb2Z0LmNvbS9zdmM/dXJsPScgKyBlbmNvZGVVUklDb21wb25lbnQocXVlcnkpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBtZXRob2Q6ICdHRVQnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBoZWFkZXJzOiBoZWFkZXJzT2JqXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAocXVlcnlUeXBlID09IFwiR0VUX0JJTkFSWVwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlcXVlc3RbXCJyZXNwb25zZVR5cGVcIl0gPSBcImFycmF5YnVmZmVyXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAocXVlcnlUeXBlID09IFwiR0VUX0JJTkFSWVwiIHx8IHF1ZXJ5VHlwZSA9PSBcIkdFVFwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAkaHR0cChyZXF1ZXN0KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgcGVyZm9ybVF1ZXJ5OiBmdW5jdGlvbiAocXVlcnlUeXBlKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24gKHF1ZXJ5LCBwb3N0U3RyaW5nLCByZXF1ZXN0SGVhZGVycykge1xyXG4gICAgICAgICAgICAgICAgICAgIHN3aXRjaChxdWVyeVR5cGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBcIkdFVFwiOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICRodHRwLmdldChxdWVyeSwge2hlYWRlcnMgOiByZXF1ZXN0SGVhZGVyc30pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFwiR0VUX0JJTkFSWVwiOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICRodHRwLmdldChxdWVyeSwge3Jlc3BvbnNlVHlwZTpcImFycmF5YnVmZmVyXCJ9LCB7aGVhZGVycyA6IHJlcXVlc3RIZWFkZXJzfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCJQT1NUXCI6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gJGh0dHAucG9zdChxdWVyeSwgcG9zdFN0cmluZywge2hlYWRlcnMgOiByZXF1ZXN0SGVhZGVyc30pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFwiUEFUQ0hcIjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAkaHR0cC5wYXRjaChxdWVyeSwgcG9zdFN0cmluZyx7aGVhZGVycyA6IHJlcXVlc3RIZWFkZXJzfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCJERUxFVEVcIjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAkaHR0cC5kZWxldGUocXVlcnksIHtoZWFkZXJzIDogcmVxdWVzdEhlYWRlcnN9KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgZ2V0TWV0YWRhdGE6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMucGVyZm9ybUFub255bW91c1F1ZXJ5KFwiR0VUXCIpKFwiaHR0cHM6Ly9ncmFwaC5taWNyb3NvZnQuY29tL1wiICsgdGhpcy5zZWxlY3RlZFZlcnNpb24gKyBcIi8kbWV0YWRhdGFcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XSk7IiwiLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbi8vICBDb3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi4gIEFsbCBSaWdodHMgUmVzZXJ2ZWQuICBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuICBTZWUgTGljZW5zZSBpbiB0aGUgcHJvamVjdCByb290IGZvciBsaWNlbnNlIGluZm9ybWF0aW9uLlxyXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHJcbnZhciBsb2Nfc3RyaW5ncyA9IHt9O1xyXG5cclxubG9jX3N0cmluZ3NbJ2VuX3VzJ10gPSB7XCJUbyB0cnkgdGhlIGV4cGxvcmVyLCBwbGVhc2UgXCI6XCJUbyB0cnkgdGhlIGV4cGxvcmVyLCBwbGVhc2UgXCIsXCJzaWduIGluXCI6XCJzaWduIGluXCIsXCIgd2l0aCB5b3VyIHdvcmsgb3Igc2Nob29sIGFjY291bnQgZnJvbSBNaWNyb3NvZnQuXCI6XCIgd2l0aCB5b3VyIHdvcmsgb3Igc2Nob29sIGFjY291bnQgZnJvbSBNaWNyb3NvZnQuXCIsXCJTdWJtaXRcIjpcIlN1Ym1pdFwiLFwiVXNpbmcgZGVtbyB0ZW5hbnRcIjpcIlVzaW5nIGRlbW8gdGVuYW50XCIsXCJzaWduIG91dFwiOlwic2lnbiBvdXRcIixcIkhpc3RvcnlcIjpcIkhpc3RvcnlcIixcIk1ldGhvZFwiOlwiTWV0aG9kXCIsXCJRdWVyeVwiOlwiUXVlcnlcIixcIlN0YXR1cyBDb2RlXCI6XCJTdGF0dXMgQ29kZVwiLFwiRHVyYXRpb25cIjpcIkR1cmF0aW9uXCIsXCJHb1wiOlwiR29cIixcIllFU1wiOlwiWUVTXCIsXCJOT1wiOlwiTk9cIixcInJlcXVlc3QgaGVhZGVyXCI6XCJyZXF1ZXN0IGhlYWRlclwiLFwicmVxdWVzdCBib2R5XCI6XCJyZXF1ZXN0IGJvZHlcIixcInJlc3BvbnNlXCI6XCJyZXNwb25zZVwifVxyXG5cclxuXHJcbmxvY19zdHJpbmdzWydkZV9kZSddID0ge1wiVG8gdHJ5IHRoZSBleHBsb3JlciwgcGxlYXNlIFwiOlwiVW0gZGVuIFRlc3RlciBhdXN6dXByb2JpZXJlbiwgXCIsXCJzaWduIGluXCI6XCJBbm1lbGRlblwiLFwiIHdpdGggeW91ciB3b3JrIG9yIHNjaG9vbCBhY2NvdW50IGZyb20gTWljcm9zb2Z0LlwiOlwiIG1pdCBJaHJlbSBHZXNjaMOkZnRzLSBvZGVyIFNjaHVsa29udG8gdm9uIE1pY3Jvc29mdCBhbi5cIixcIlN1Ym1pdFwiOlwiU2VuZGVuXCIsXCJVc2luZyBkZW1vIHRlbmFudFwiOlwiVmVyd2VuZGVuIGRlcyBEZW1vbWFuZGFudGVuXCIsXCJzaWduIG91dFwiOlwiQWJtZWxkZW5cIixcIkhpc3RvcnlcIjpcIlZlcmxhdWZcIixcIk1ldGhvZFwiOlwiTWV0aG9kZVwiLFwiUXVlcnlcIjpcIkFiZnJhZ2VcIixcIlN0YXR1cyBDb2RlXCI6XCJTdGF0dXNjb2RlXCIsXCJEdXJhdGlvblwiOlwiRGF1ZXJcIixcIkdvXCI6XCJPS1wiLFwiWUVTXCI6XCJKQVwiLFwiTk9cIjpcIk5FSU5cIixcInJlcXVlc3QgaGVhZGVyXCI6XCJBbmZvcmRlcnVuZ3NoZWFkZXJcIixcInJlcXVlc3QgYm9keVwiOlwiQW5mb3JkZXJ1bmdzdGV4dGvDtnJwZXJcIixcInJlc3BvbnNlXCI6XCJBbnR3b3J0XCJ9XHJcblxyXG5cclxubG9jX3N0cmluZ3NbJ2phX2pwJ10gPSB7XCJUbyB0cnkgdGhlIGV4cGxvcmVyLCBwbGVhc2UgXCI6XCLjgqjjgq/jgrnjg5fjg63jg7zjg6njg7zjgpLjgYroqabjgZfjgYTjgZ/jgaDjgY/jgavjga/jgIFNaWNyb3NvZnQg44Gu6IG35aC044G+44Gf44Gv5a2m5qCh44Ki44Kr44Km44Oz44OI44GnIFwiLFwic2lnbiBpblwiOlwi44K144Kk44Oz44Kk44OzXCIsXCIgd2l0aCB5b3VyIHdvcmsgb3Igc2Nob29sIGFjY291bnQgZnJvbSBNaWNyb3NvZnQuXCI6XCIg44GX44G+44GZ44CCXCIsXCJTdWJtaXRcIjpcIumAgeS/oVwiLFwiVXNpbmcgZGVtbyB0ZW5hbnRcIjpcIuODh+ODoiDjg4bjg4rjg7Pjg4jjgpLkvb/nlKjjgZfjgabjgYTjgb7jgZlcIixcInNpZ24gb3V0XCI6XCLjgrXjgqTjg7PjgqLjgqbjg4hcIixcIkhpc3RvcnlcIjpcIuWxpeattFwiLFwiTWV0aG9kXCI6XCLjg6Hjgr3jg4Pjg4lcIixcIlF1ZXJ5XCI6XCLjgq/jgqjjg6pcIixcIlN0YXR1cyBDb2RlXCI6XCLnirbmhYvjgrPjg7zjg4lcIixcIkR1cmF0aW9uXCI6XCLmnJ/plpNcIixcIkdvXCI6XCLmpJzntKJcIixcIllFU1wiOlwi44Gv44GEXCIsXCJOT1wiOlwi44GE44GE44GIXCIsXCJyZXF1ZXN0IGhlYWRlclwiOlwi6KaB5rGC44OY44OD44OA44O8XCIsXCJyZXF1ZXN0IGJvZHlcIjpcIuimgeaxguacrOaWh1wiLFwicmVzcG9uc2VcIjpcIuW/nOetlFwifVxyXG5cclxuXHJcbmxvY19zdHJpbmdzWyd6aF9jbiddID0ge1wiVG8gdHJ5IHRoZSBleHBsb3JlciwgcGxlYXNlIFwiOlwi6Iul6KaB5bCd6K+V5rWP6KeI5Zmo77yM6K+3IOS9v+eUqOS9oOeahCBNaWNyb3NvZnQg5bel5L2c5oiW5a2m5qCh5biQ5oi3XCIsXCJzaWduIGluXCI6XCLnmbvlvZVcIixcIiB3aXRoIHlvdXIgd29yayBvciBzY2hvb2wgYWNjb3VudCBmcm9tIE1pY3Jvc29mdC5cIjpcIuOAglwiLFwiU3VibWl0XCI6XCLmj5DkuqRcIixcIlVzaW5nIGRlbW8gdGVuYW50XCI6XCLkvb/nlKjmvJTnpLrnp5/miLdcIixcInNpZ24gb3V0XCI6XCLms6jplIBcIixcIkhpc3RvcnlcIjpcIuWOhuWPsuiusOW9lVwiLFwiTWV0aG9kXCI6XCLmlrnms5VcIixcIlF1ZXJ5XCI6XCLmn6Xor6JcIixcIlN0YXR1cyBDb2RlXCI6XCLnirbmgIHku6PnoIFcIixcIkR1cmF0aW9uXCI6XCLmjIHnu63ml7bpl7RcIixcIkdvXCI6XCLovazliLBcIixcIllFU1wiOlwi5pivXCIsXCJOT1wiOlwi5ZCmXCIsXCJyZXF1ZXN0IGhlYWRlclwiOlwi6K+35rGC5qCH6aKYXCIsXCJyZXF1ZXN0IGJvZHlcIjpcIuivt+axguato+aWh1wiLFwicmVzcG9uc2VcIjpcIuWTjeW6lFwifVxyXG5cclxuXHJcbiIsIi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4vLyAgQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uICBBbGwgUmlnaHRzIFJlc2VydmVkLiAgTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiAgU2VlIExpY2Vuc2UgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cclxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcblxyXG52YXIgcztcclxuYW5ndWxhci5tb2R1bGUoJ0FwaUV4cGxvcmVyJylcclxuICAgIC5jb250cm9sbGVyKCdBcGlFeHBsb3JlckN0cmwnLCBbJyRzY29wZScsICckaHR0cCcsICckbG9jYXRpb24nLCAnQXBpRXhwbG9yZXJTdmMnLCAnJHRpbWVvdXQnLCAnJHRlbXBsYXRlQ2FjaGUnLCAnJG1kRGlhbG9nJywgJyRzY2UnLCBmdW5jdGlvbiAoJHNjb3BlLCAkaHR0cCwgJGxvY2F0aW9uLCBhcGlTZXJ2aWNlLCAkdGltZW91dCwgJHRlbXBsYXRlQ2FjaGUsICRtZERpYWxvZywgJHNjZSApIHtcclxuXHJcbiAgICAgICAgcyA9ICRzY29wZTtcclxuICAgICAgICAkc2NvcGUudXNlckluZm8gPSB7fTtcclxuXHJcbiAgICAgICAgJHNjb3BlLmdldEFzc2V0UGF0aCA9IGZ1bmN0aW9uKHJlbFBhdGgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHMucGF0aFRvQnVpbGREaXIgKyBcIi9cIisgcmVsUGF0aDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICRzY29wZS5maW5pc2hBZG1pbkNvbnNlcnRGbG93ID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIC8vIHNpbGVudGx5IGdldCBhIG5ldyBhY2Nlc3MgdG9rZW4gd2l0aCB0aGUgYWRtaW4gc2NvcGVzXHJcbiAgICAgICAgICAgIGhlbGxvKCdtc2Z0X3Rva2VuX3JlZnJlc2gnKS5sb2dpbih7XHJcbiAgICAgICAgICAgICAgICBkaXNwbGF5OiAncG9wdXAnLFxyXG4gICAgICAgICAgICAgICAgcmVzcG9uc2VfdHlwZTogXCJ0b2tlblwiLFxyXG4gICAgICAgICAgICAgICAgcmVkaXJlY3RfdXJpOiAkc2NvcGUucmVkaXJlY3RVcmwsXHJcbiAgICAgICAgICAgICAgICBzY29wZTogJHNjb3BlLnNjb3BlcyArIFwiIFwiICsgJHNjb3BlLmFkbWluU2NvcGVzLFxyXG4gICAgICAgICAgICAgICAgcmVzcG9uc2VfbW9kZTogJ2ZyYWdtZW50JyxcclxuICAgICAgICAgICAgICAgIHByb21wdDogJ25vbmUnLFxyXG4gICAgICAgICAgICAgICAgZG9tYWluX2hpbnQ6ICdvcmdhbml6YXRpb25zJyxcclxuICAgICAgICAgICAgICAgIGxvZ2luX2hpbnQ6ICRzY29wZS51c2VySW5mby5wcmVmZXJyZWRfdXNlcm5hbWVcclxuICAgICAgICAgICAgfSwgZnVuY3Rpb24ocmVzKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAocmVzLmF1dGhSZXNwb25zZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBhY2Nlc3NUb2tlbiA9IHJlcy5hdXRoUmVzcG9uc2UuYWNjZXNzX3Rva2VuO1xyXG4gICAgICAgICAgICAgICAgICAgICRodHRwLmRlZmF1bHRzLmhlYWRlcnMuY29tbW9uWydBdXRob3JpemF0aW9uJ10gPSAnQmVhcmVyICcgKyBhY2Nlc3NUb2tlbjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSwgZnVuY3Rpb24ocmVzKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKHJlcyk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaGVsbG8ub24oJ2F1dGgubG9naW4nLCBmdW5jdGlvbiAoYXV0aCkge1xyXG4gICAgICAgICAgICB2YXIgYWNjZXNzVG9rZW47XHJcblxyXG4gICAgICAgICAgICBpZiAoYXV0aC5uZXR3b3JrID09IFwibXNmdF90b2tlbl9yZWZyZXNoXCIpIHtcclxuICAgICAgICAgICAgICAgIGFjY2Vzc1Rva2VuID0gaGVsbG8oJ21zZnRfdG9rZW5fcmVmcmVzaCcpLmdldEF1dGhSZXNwb25zZSgpLmFjY2Vzc190b2tlbjtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChhdXRoLm5ldHdvcmsgPT0gXCJtc2Z0XCIpIHtcclxuICAgICAgICAgICAgICAgIHZhciBhdXRoUmVzcG9uc2UgPSBoZWxsbygnbXNmdCcpLmdldEF1dGhSZXNwb25zZSgpXHJcblxyXG4gICAgICAgICAgICAgICAgYWNjZXNzVG9rZW4gPSBhdXRoUmVzcG9uc2UuYWNjZXNzX3Rva2VuO1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciBqd3Q7XHJcbiAgICAgICAgICAgICAgICBpZiAoJ2lkX3Rva2VuJyBpbiBhdXRoUmVzcG9uc2UpIHtcclxuICAgICAgICAgICAgICAgICAgICBqd3QgPSBhdXRoUmVzcG9uc2VbJ2lkX3Rva2VuJ107XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIGRlY29kZWRKd3QgPSBqd3RfZGVjb2RlKGp3dCk7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICRzY29wZS51c2VySW5mbyA9IHtcclxuICAgICAgICAgICAgICAgICAgICBwcmVmZXJyZWRfdXNlcm5hbWU6IGRlY29kZWRKd3QucHJlZmVycmVkX3VzZXJuYW1lXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgJHNjb3BlLiRhcHBseSgpO1xyXG5cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKGFjY2Vzc1Rva2VuKSB7XHJcbiAgICAgICAgICAgICAgICAkaHR0cC5kZWZhdWx0cy5oZWFkZXJzLmNvbW1vblsnQXV0aG9yaXphdGlvbiddID0gJ0JlYXJlciAnICsgYWNjZXNzVG9rZW47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICBcclxuICAgICAgICAkc2NvcGUuc2hvd0pzb25FZGl0b3IgPSBhcGlTZXJ2aWNlLnNob3dKc29uRWRpdG9yO1xyXG4gICAgICAgICRzY29wZS5zaG93SnNvblZpZXdlciA9IGFwaVNlcnZpY2Uuc2hvd0pzb25WaWV3ZXI7XHJcbiAgICAgICAgJHNjb3BlLnRhYkNvbmZpZyA9IHtcclxuICAgICAgICAgICAgZGlzYWJsZVJlcXVlc3RCb2R5RWRpdG9yOiB0cnVlLFxyXG4gICAgICAgICAgICBoaWRlQ29udGVudDogdHJ1ZSxcclxuICAgICAgICAgICAgc2VsZWN0ZWQ6IDBcclxuICAgICAgICB9XHJcbiAgICAgICAgJHNjb3BlLnNob3dJbWFnZSA9IGZhbHNlO1xyXG5cclxuICAgICAgICAvLyAkc2NvcGUuJHdhdGNoKFwidGFiQ29uZmlnLnNlbGVjdGVkXCIsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIC8vIH0pXHJcblxyXG4gICAgICAgIC8vICRzY29wZS5vblRhYlNlbGVjdGVkID0gZnVuY3Rpb24oaW5kZXgpIHtcclxuICAgICAgICAvLyAgICAgdGFiQ29uZmlnLnByZXZpb3VzU2VsZWN0ZWQgPSAkc2NvcGUudGFiQ29uZmlnLnNlbGVjdGVkO1xyXG4gICAgICAgIC8vIH1cclxuXHJcbiAgICAgICAgJHNjb3BlLnRhYkNvbmZpZy5wcmV2aW91c1NlbGVjdGVkID0gJHNjb3BlLnRhYkNvbmZpZy5zZWxlY3RlZDtcclxuICAgICAgICAkc2NvcGUucHJvY2Vzc1RhYkNsaWNrID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHZhciBzd2l0Y2hpbmdUYWJzID0gJHNjb3BlLnRhYkNvbmZpZy5wcmV2aW91c1NlbGVjdGVkICE9ICRzY29wZS50YWJDb25maWcuc2VsZWN0ZWQ7XHJcbiAgICAgICAgICAgIGlmICghc3dpdGNoaW5nVGFicylcclxuICAgICAgICAgICAgICAgICRzY29wZS50YWJDb25maWcuaGlkZUNvbnRlbnQgPSAhJHNjb3BlLnRhYkNvbmZpZy5oaWRlQ29udGVudDtcclxuICAgICAgICAgICAgJHNjb3BlLnRhYkNvbmZpZy5wcmV2aW91c1NlbGVjdGVkID0gJHNjb3BlLnRhYkNvbmZpZy5zZWxlY3RlZDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIEZvciBkZWVwIGxpbmtpbmcgaW50byB0aGUgR3JhcGggRXhwbG9yZXJcclxuICAgICAgICB2YXIgcmVxdWVzdFZhbCA9ICRsb2NhdGlvbi5zZWFyY2goKS5yZXF1ZXN0O1xyXG4gICAgICAgIHZhciBhY3Rpb25WYWwgPSAkbG9jYXRpb24uc2VhcmNoKCkubWV0aG9kO1xyXG4gICAgICAgIHZhciBib2R5VmFsID0gJGxvY2F0aW9uLnNlYXJjaCgpLmJvZHk7XHJcbiAgICAgICAgdmFyIHZlcnNpb25WYWwgPSAkbG9jYXRpb24uc2VhcmNoKCkudmVyc2lvbjtcclxuICAgICAgICB2YXIgaGVhZGVyc1ZhbCA9ICRsb2NhdGlvbi5zZWFyY2goKS5oZWFkZXJzO1xyXG4gICAgICAgIFxyXG5cclxuICAgICAgICBoYW5kbGVRdWVyeVN0cmluZyhhcGlTZXJ2aWNlLCBhY3Rpb25WYWwsIHZlcnNpb25WYWwsIHJlcXVlc3RWYWwpO1xyXG4gICAgICAgIFxyXG4gICAgICAgICR0aW1lb3V0KGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBpbml0aWFsaXplSnNvbkVkaXRvckhlYWRlcnMoJHNjb3BlLCBoZWFkZXJzVmFsKTtcclxuICAgICAgICAgICAgaW5pdGlhbGl6ZUpzb25WaWV3ZXIoJHNjb3BlLCBhcGlTZXJ2aWNlKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcGFyc2VNZXRhZGF0YShhcGlTZXJ2aWNlLCAkc2NvcGUpO1xyXG5cclxuICAgICAgICAkc2NvcGUuaXNBdXRoZW50aWNhdGVkID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHZhciBzZXNzaW9uID0gaGVsbG8oJ21zZnQnKS5nZXRBdXRoUmVzcG9uc2UoKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChzZXNzaW9uID09PSBudWxsKSByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIHZhciBjdXJyZW50VGltZSA9IChuZXcgRGF0ZSgpKS5nZXRUaW1lKCkgLyAxMDAwO1xyXG4gICAgICAgICAgICByZXR1cm4gc2Vzc2lvbiAmJiBzZXNzaW9uLmFjY2Vzc190b2tlbiAmJiBzZXNzaW9uLmV4cGlyZXMgPiBjdXJyZW50VGltZTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAkc2NvcGUuZ2V0RWRpdG9yID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBhcGlTZXJ2aWNlLnNob3dKc29uRWRpdG9yO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgJHNjb3BlLiR3YXRjaChcImdldEVkaXRvcigpXCIsIGZ1bmN0aW9uKGV2ZW50LCBhcmdzKSB7XHJcbiAgICAgICAgICAgICRzY29wZS5zaG93SnNvbkVkaXRvciA9ICRzY29wZS5nZXRFZGl0b3IoKTtcclxuICAgICAgICAgICAgaW5pdGlhbGl6ZUpzb25FZGl0b3IoJHNjb3BlLCBib2R5VmFsKTtcclxuICAgICAgICAgICAgLy8gaWYgKCRzY29wZS5zaG93SnNvbkVkaXRvcikge1xyXG4gICAgICAgICAgICAvLyB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vIGh0dHBzOi8vZG9jcy5taWNyb3NvZnQuY29tL2VuLXVzL2F6dXJlL2FjdGl2ZS1kaXJlY3RvcnkvYWN0aXZlLWRpcmVjdG9yeS12Mi1wcm90b2NvbHMtaW1wbGljaXRcclxuICAgICAgICAkc2NvcGUubG9naW4gPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGhlbGxvKCdtc2Z0JykubG9naW4oe1xyXG4gICAgICAgICAgICAgICAgZGlzcGxheTogJ3BhZ2UnLFxyXG4gICAgICAgICAgICAgICAgcmVzcG9uc2VfdHlwZTogXCJpZF90b2tlbiB0b2tlblwiLFxyXG4gICAgICAgICAgICAgICAgbm9uY2U6ICdncmFwaF9leHBsb3JlcicsXHJcbiAgICAgICAgICAgICAgICBwcm9tcHQ6ICdsb2dpbidcclxuICAgICAgICAgICAgfSwgZnVuY3Rpb24ocmVzKSB7XHJcblxyXG4gICAgICAgICAgICB9LCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ2Vycm9yIHNpZ25pbmcgaW4nKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgJHNjb3BlLmxvZ291dCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaGVsbG8oJ21zZnQnKS5sb2dvdXQobnVsbCwge2ZvcmNlOnRydWV9KTtcclxuICAgICAgICAgICAgZGVsZXRlICRzY29wZS51c2VySW5mbztcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAkc2NvcGUuaXNBY3RpdmUgPSBmdW5jdGlvbiAodmlld0xvY2F0aW9uKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB2aWV3TG9jYXRpb24gPT09ICRsb2NhdGlvbi5wYXRoKCk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgdmFyIHJhd1NlYXJjaFRleHQgPSBcIlwiO1xyXG4gICAgICAgICRzY29wZS5zZXRSYXdTZWFyY2hUZXh0ID0gZnVuY3Rpb24odGV4dCkge1xyXG4gICAgICAgICAgICByYXdTZWFyY2hUZXh0ID0gdGV4dDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICRzY29wZS5nZXRSYXdTZWFyY2hUZXh0ID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHJldHVybiByYXdTZWFyY2hUZXh0O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgJHNjb3BlLmdldEN1cnJlbnRFbnRpdHlOYW1lID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGlmICghcmF3U2VhcmNoVGV4dCkgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgICAgIHJldHVybiByYXdTZWFyY2hUZXh0LnNwbGl0KFwiL1wiKS5maWx0ZXIoKGZ1bmN0aW9uKGEpIHsgcmV0dXJuIGEubGVuZ3RoID4gMH0pKS5wb3AoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICRzY29wZS5jYW5JbnNlcnRUZW1wbGF0ZSA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gYXBpU2VydmljZS5zZWxlY3RlZE9wdGlvbiA9PSBcIlBPU1RcIiAmJiBjaGVja0Nhbkluc2VydFRlbXBsYXRlKHJhd1NlYXJjaFRleHQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgJHNjb3BlLmluc2VydFBvc3RUZW1wbGF0ZSA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICB2YXIgZW50aXR5ID0gJHNjb3BlLmdldEN1cnJlbnRFbnRpdHlOYW1lKCk7XHJcbiAgICAgICAgICAgIHZhciBzdHJUb0luc2VydCA9IEpTT04uc3RyaW5naWZ5KHBvc3RUZW1wbGF0ZXNbZW50aXR5XSwgbnVsbCwgMikudHJpbSgpO1xyXG5cclxuICAgICAgICAgICAgdmFyIGRvbWFpbiA9ICRzY29wZS51c2VySW5mby5wcmVmZXJyZWRfdXNlcm5hbWUuc3BsaXQoXCJAXCIpWzFdO1xyXG5cclxuICAgICAgICAgICAgc3RyVG9JbnNlcnQgPSBzdHJUb0luc2VydC5yZXBsYWNlKC9BVVRIRU5USUNBVEVEX0RPTUFJTi9nLCBkb21haW4pO1xyXG5cclxuICAgICAgICAgICAgaW5pdGlhbGl6ZUpzb25FZGl0b3IoJHNjb3BlLCBzdHJUb0luc2VydCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiBjaGVja0Nhbkluc2VydFRlbXBsYXRlKFVSTCkge1xyXG4gICAgICAgICAgICAvLyBnZXQgJ21lc3NhZ2VzJyBmcm9tICdodHRwczovL2dyYXBoLm1pY3Jvc29mdC5jb20vdjEuMC9tZS9tZXNzYWdlcydcclxuICAgICAgICAgICAgdmFyIGVudGl0eSA9ICRzY29wZS5nZXRDdXJyZW50RW50aXR5TmFtZSgpXHJcbiAgICAgICAgICAgIHZhciBjYW5JbnNlcnRUZW1wbGF0ZSA9IGVudGl0eSBpbiBwb3N0VGVtcGxhdGVzO1xyXG4gICAgICAgICAgICByZXR1cm4gY2FuSW5zZXJ0VGVtcGxhdGU7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgJHNjb3BlLnNob3dTaGFyZURpYWxvZyA9IGZ1bmN0aW9uKGV2KSB7XHJcbiAgICAgICAgICAgICRtZERpYWxvZy5zaG93KHtcclxuICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6IFNoYXJlRGlhbG9nQ29udHJvbGxlcixcclxuICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiBwYXRoVG9CdWlsZERpciArICcvYXNzZXRzL3ZpZXdzL3NoYXJlRGlhbG9nLnRtcGwuaHRtbCcsXHJcbiAgICAgICAgICAgICAgICBwYXJlbnQ6IGFuZ3VsYXIuZWxlbWVudChkb2N1bWVudC5ib2R5KSxcclxuICAgICAgICAgICAgICAgIHRhcmdldEV2ZW50OiBldixcclxuICAgICAgICAgICAgICAgIGNsaWNrT3V0c2lkZVRvQ2xvc2U6dHJ1ZSxcclxuICAgICAgICAgICAgICAgIHNjb3BlOiAkc2NvcGUuJG5ldygpLFxyXG4gICAgICAgICAgICAgICAgbG9jYWxzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgYXBpU2VydmljZTogYXBpU2VydmljZSxcclxuICAgICAgICAgICAgICAgICAgICAkc2NlOiAkc2NlLFxyXG4gICAgICAgICAgICAgICAgICAgIGhlYWRlcnM6IGZvcm1hdFJlcXVlc3RIZWFkZXJzKCRzY29wZS5qc29uRWRpdG9ySGVhZGVycy5nZXRTZXNzaW9uKCkuZ2V0VmFsdWUoKSksXHJcbiAgICAgICAgICAgICAgICAgICAgYm9keTogJHNjb3BlLmpzb25FZGl0b3IuZ2V0U2Vzc2lvbigpLmdldFZhbHVlKClcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKGFuc3dlcikge1xyXG4gICAgICAgICAgICAgICAgJHNjb3BlLnN0YXR1cyA9ICdZb3Ugc2FpZCB0aGUgaW5mb3JtYXRpb24gd2FzIFwiJyArIGFuc3dlciArICdcIi4nO1xyXG4gICAgICAgICAgICB9LCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICRzY29wZS5zdGF0dXMgPSAnWW91IGNhbmNlbGxlZCB0aGUgZGlhbG9nLic7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH07XHJcblxyXG59XSk7XHJcblxyXG5hbmd1bGFyLm1vZHVsZSgnQXBpRXhwbG9yZXInKVxyXG4gICAgLmNvbnRyb2xsZXIoJ0Ryb3Bkb3duQ3RybCcsIFsnJHNjb3BlJywgJ0FwaUV4cGxvcmVyU3ZjJywgZnVuY3Rpb24gKCRzY29wZSwgYXBpU2VydmljZSkge1xyXG5cclxuICAgICAgICAkc2NvcGUuc2VsZWN0ZWRPcHRpb24gPSBhcGlTZXJ2aWNlLnNlbGVjdGVkT3B0aW9uO1xyXG5cclxuICAgICAgICAkc2NvcGUub25JdGVtQ2xpY2sgPSBmdW5jdGlvbihjaG9pY2UpIHtcclxuICAgICAgICAgICAgJHNjb3BlLnNlbGVjdGVkT3B0aW9uID0gY2hvaWNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgJHNjb3BlLml0ZW1zID0gW1xyXG4gICAgICAgICAgICAnR0VUJyxcclxuICAgICAgICAgICAgJ1BPU1QnLFxyXG4gICAgICAgICAgICAnUEFUQ0gnLFxyXG4gICAgICAgICAgICAnREVMRVRFJ1xyXG4gICAgICAgIF07XHJcblxyXG4gICAgICAgICRzY29wZS5nZXRTZXJ2aWNlT3B0aW9uID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBhcGlTZXJ2aWNlLnNlbGVjdGVkT3B0aW9uO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgJHNjb3BlLmdldE9wdGlvbiA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gJHNjb3BlLnNlbGVjdGVkT3B0aW9uO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgJHNjb3BlLiR3YXRjaChcImdldE9wdGlvbigpXCIsIGZ1bmN0aW9uKG5ld1ZhbCwgb2xkVmFsKSB7XHJcbiAgICAgICAgICAgIGlmIChvbGRWYWwgIT09IG5ld1ZhbCkge1xyXG4gICAgICAgICAgICAgICAgYXBpU2VydmljZS5zZWxlY3RlZE9wdGlvbiA9ICRzY29wZS5zZWxlY3RlZE9wdGlvbjtcclxuICAgICAgICAgICAgICAgIGFwaVNlcnZpY2UudGV4dCA9IGFwaVNlcnZpY2UudGV4dC5yZXBsYWNlKC9odHRwczpcXC9cXC9ncmFwaC5taWNyb3NvZnQuY29tKCR8XFwvKFtcXHddfFxcLikqKCR8XFwvKSkvLCAoXCJodHRwczovL2dyYXBoLm1pY3Jvc29mdC5jb20vXCIgKyBhcGlTZXJ2aWNlLnNlbGVjdGVkVmVyc2lvbiArIFwiL1wiKSk7XHJcbiAgICAgICAgICAgICAgICBpZiAoJHNjb3BlLnNlbGVjdGVkT3B0aW9uID09ICdQT1NUJyB8fCAkc2NvcGUuc2VsZWN0ZWRPcHRpb24gPT0gJ1BBVENIJykge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyBpbnZlc3RpZ2F0ZSB3aHkgJHNjb3BlIGRvZXNuJ3Qgd29yayBoZXJlXHJcbiAgICAgICAgICAgICAgICAgICAgc2hvd1JlcXVlc3RCb2R5RWRpdG9yKCk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKCRzY29wZS5zZWxlY3RlZE9wdGlvbiA9PSAnR0VUJyB8fCAkc2NvcGUuc2VsZWN0ZWRPcHRpb24gPT0gJ0RFTEVURScpIHtcclxuICAgICAgICAgICAgICAgICAgICBzLnRhYkNvbmZpZy5kaXNhYmxlUmVxdWVzdEJvZHlFZGl0b3IgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIHNldFNlbGVjdGVkVGFiKDApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgfV0pO1xyXG5cclxuYW5ndWxhci5tb2R1bGUoJ0FwaUV4cGxvcmVyJylcclxuICAgIC5jb250cm9sbGVyKCdWZXJzaW9uQ3RybCcsIFsnJHNjb3BlJywgJ0FwaUV4cGxvcmVyU3ZjJywgZnVuY3Rpb24gKCRzY29wZSwgYXBpU2VydmljZSkge1xyXG4gICAgICAgICRzY29wZS5zZWxlY3RlZFZlcnNpb24gPSBhcGlTZXJ2aWNlLnNlbGVjdGVkVmVyc2lvbjtcclxuXHJcbiAgICAgICAgJHNjb3BlLml0ZW1zID0gW1xyXG4gICAgICAgICAgICAnYmV0YScsXHJcbiAgICAgICAgICAgICd2MS4wJ1xyXG4gICAgICAgIF07XHJcblxyXG4gICAgICAgICRzY29wZS5nZXRWZXJzaW9uID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAkc2NvcGUuc2VsZWN0ZWRWZXJzaW9uO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgJHNjb3BlLmdldFNlcnZpY2VWZXJzaW9uID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBhcGlTZXJ2aWNlLnNlbGVjdGVkVmVyc2lvbjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICRzY29wZS5vbkl0ZW1DbGljayA9IGZ1bmN0aW9uKGNob2ljZSkge1xyXG4gICAgICAgICAgICAkc2NvcGUuc2VsZWN0ZWRWZXJzaW9uID0gY2hvaWNlO1xyXG4gICAgICAgICAgICBhcGlTZXJ2aWNlLnNlbGVjdGVkVmVyc2lvbiA9IGNob2ljZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgJHNjb3BlLiR3YXRjaChcImdldFZlcnNpb24oKVwiLCBmdW5jdGlvbihuZXdWYWwsIG9sZFZhbCkge1xyXG4gICAgICAgICAgICBpZiAob2xkVmFsICE9PSBuZXdWYWwpIHtcclxuICAgICAgICAgICAgICAgIGFwaVNlcnZpY2Uuc2VsZWN0ZWRWZXJzaW9uID0gJHNjb3BlLnNlbGVjdGVkVmVyc2lvbjtcclxuICAgICAgICAgICAgICAgIGlmICgkc2NvcGUuJHBhcmVudC5zZWFyY2hUZXh0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYXBpU2VydmljZS50ZXh0ID0gJHNjb3BlLiRwYXJlbnQuc2VhcmNoVGV4dC5yZXBsYWNlKC9odHRwczpcXC9cXC9ncmFwaC5taWNyb3NvZnQuY29tKCR8XFwvKFtcXHddfFxcLikqKCR8XFwvKSkvLCAoXCJodHRwczovL2dyYXBoLm1pY3Jvc29mdC5jb20vXCIgKyBhcGlTZXJ2aWNlLnNlbGVjdGVkVmVyc2lvbiArIFwiL1wiKSk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGFwaVNlcnZpY2UudGV4dCA9IGFwaVNlcnZpY2UudGV4dC5yZXBsYWNlKC9odHRwczpcXC9cXC9ncmFwaC5taWNyb3NvZnQuY29tKCR8XFwvKFtcXHddfFxcLikqKCR8XFwvKSkvLCAoXCJodHRwczovL2dyYXBoLm1pY3Jvc29mdC5jb20vXCIgKyBhcGlTZXJ2aWNlLnNlbGVjdGVkVmVyc2lvbiArIFwiL1wiKSk7ICAgIFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcGFyc2VNZXRhZGF0YShhcGlTZXJ2aWNlLCAkc2NvcGUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbn1dKTtcclxuXHJcbmFuZ3VsYXIubW9kdWxlKCdBcGlFeHBsb3JlcicpLmNvbnRyb2xsZXIoJ2RhdGFsaXN0Q3RybCcsIFsnJHNjb3BlJywgJ0FwaUV4cGxvcmVyU3ZjJywgZnVuY3Rpb24gKCRzY29wZSwgYXBpU2VydmljZSkge1xyXG4gICAgJHNjb3BlLnVybEFycmF5ID0gW107XHJcblxyXG4gICAgJHNjb3BlLmdldEVudGl0eSA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHJldHVybiBhcGlTZXJ2aWNlLmVudGl0eTtcclxuICAgIH1cclxuXHJcbiAgICAkc2NvcGUuZ2V0VGV4dCA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHJldHVybiBhcGlTZXJ2aWNlLnRleHQ7XHJcbiAgICB9XHJcblxyXG4gICAgJHNjb3BlLiR3YXRjaChcImdldFRleHQoKVwiLCBmdW5jdGlvbihldmVudCwgYXJncykge1xyXG4gICAgICAgICAgICAkc2NvcGUudGV4dCA9IGFwaVNlcnZpY2UudGV4dDtcclxuICAgICAgICAgICAgdGhpcy5zZWFyY2hUZXh0ID0gJHNjb3BlLnRleHQ7XHJcbiAgICB9KTtcclxuXHJcbiAgICAkc2NvcGUuJHBhcmVudC5zZXRSYXdTZWFyY2hUZXh0KGFwaVNlcnZpY2UudGV4dCk7XHJcblxyXG4gICAgJHNjb3BlLnNlYXJjaFRleHRDaGFuZ2UgPSBmdW5jdGlvbihzZWFyY2hUZXh0KSB7XHJcbiAgICAgICAgdGhpcy5zZWFyY2hUZXh0ID0gc2VhcmNoVGV4dDsgICAgICAgIFxyXG4gICAgICAgICRzY29wZS4kcGFyZW50LnNldFJhd1NlYXJjaFRleHQoc2VhcmNoVGV4dCk7XHJcbiAgICAgICAgaWYgKHNlYXJjaFRleHQuY2hhckF0KHNlYXJjaFRleHQubGVuZ3RoLTEpID09PSBcIi9cIiAmJiBhcGlTZXJ2aWNlLmVudGl0eSAmJiBnZXRFbnRpdHlOYW1lKHNlYXJjaFRleHQpICE9PSBhcGlTZXJ2aWNlLmVudGl0eS5uYW1lKSB7XHJcbiAgICAgICAgICAgIGFwaVNlcnZpY2UudGV4dCA9IHNlYXJjaFRleHQ7XHJcbiAgICAgICAgICAgIHNldEVudGl0eShnZXRFbnRpdHlOYW1lKHNlYXJjaFRleHQpLCBhcGlTZXJ2aWNlLCB0cnVlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gdXBkYXRlVXJsT3B0aW9ucygpIHtcclxuICAgICAgICB2YXIgdXJsT3B0aW9ucyA9IHt9O1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwidXBkYXRpbmcgdXJsIG9wdGlvbnMgZm9yXCIsIGFwaVNlcnZpY2UuZW50aXR5KTtcclxuICAgICAgICBpZiAoYXBpU2VydmljZS5lbnRpdHkgJiYgYXBpU2VydmljZS5lbnRpdHkubmFtZSA9PT0gYXBpU2VydmljZS5zZWxlY3RlZFZlcnNpb24pIHtcclxuICAgICAgICAgICAgICAgIHVybE9wdGlvbnMgPSBhcGlTZXJ2aWNlLmNhY2hlLmdldChhcGlTZXJ2aWNlLnNlbGVjdGVkVmVyc2lvbiArIFwiRW50aXR5U2V0RGF0YVwiKTtcclxuICAgICAgICAgICAgICAgIGFwaVNlcnZpY2UuZW50aXR5Lm5hbWUgPSBhcGlTZXJ2aWNlLnNlbGVjdGVkVmVyc2lvbjtcclxuICAgICAgICB9IGVsc2UgaWYgKGFwaVNlcnZpY2UuZW50aXR5ICE9IG51bGwpIHtcclxuICAgICAgICAgICAgdXJsT3B0aW9ucyA9IGFwaVNlcnZpY2UuZW50aXR5LlVSTFM7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy9mb3IgZWFjaCBuZXcgVVJMIHRvIGFkZFxyXG4gICAgICAgIGZvcih2YXIgeCBpbiB1cmxPcHRpb25zKSB7XHJcbiAgICAgICAgICAgIHZhciBzZXBhcmF0b3IgPSAnJztcclxuICAgICAgICAgICAgaWYgKGFwaVNlcnZpY2UudGV4dC5jaGFyQXQoKGFwaVNlcnZpY2UudGV4dCkubGVuZ3RoLTEpICE9ICcvJykge1xyXG4gICAgICAgICAgICAgICAgc2VwYXJhdG9yID0gJy8nXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHVybE9wdGlvbnNbeF0uYXV0b2NvbXBsZXRlVmFsID0gYXBpU2VydmljZS50ZXh0ICsgc2VwYXJhdG9yICsgdXJsT3B0aW9uc1t4XS5uYW1lO1xyXG5cclxuICAgICAgICAgICAgaWYgKCRzY29wZS51cmxBcnJheS5pbmRleE9mKHVybE9wdGlvbnNbeF0pID09IC0xKVxyXG4gICAgICAgICAgICAgICAgJHNjb3BlLnVybEFycmF5LnB1c2godXJsT3B0aW9uc1t4XSk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICAvLyBtb3N0bHkgdXNlZCBmb3IgdGhlIGluaXRpYWwgcGFnZSBsb2FkLCB3aGVuIHRoZSBlbnRpdHkgaXMgc2V0IChtZS91c2VyKSwgIGxvYWQgdGhlIHBvc3NpYmxlIFVSTCBvcHRpb25zXHJcbiAgICAkc2NvcGUuJHdhdGNoKFwiZ2V0RW50aXR5KClcIiwgdXBkYXRlVXJsT3B0aW9ucywgdHJ1ZSk7XHJcblxyXG4gICAgJHNjb3BlLmdldE1hdGNoZXMgPSBmdW5jdGlvbihxdWVyeSkge1xyXG4gICAgICAgIHJldHVybiAkc2NvcGUudXJsQXJyYXkuZmlsdGVyKGZ1bmN0aW9uKG9wdGlvbikge1xyXG4gICAgICAgICAgICB2YXIgcXVlcnlJbk9wdGlvbiA9IChvcHRpb24uYXV0b2NvbXBsZXRlVmFsLmluZGV4T2YocXVlcnkpPi0xKTtcclxuICAgICAgICAgICAgdmFyIHF1ZXJ5SXNFbXB0eSA9IChnZXRFbnRpdHlOYW1lKHF1ZXJ5KS5sZW5ndGggPT0gMCk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gcXVlcnlJc0VtcHR5IHx8IHF1ZXJ5SW5PcHRpb247XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgJHNjb3BlLnByb2Nlc3NBdXRvY29tcGxldGVDbGljayA9IGZ1bmN0aW9uKGl0ZW0pIHtcclxuICAgICAgICAkc2NvcGUuJHBhcmVudC5zZWxlY3RlZEl0ZW1DaGFuZ2UoaXRlbSlcclxuICAgICAgICBcclxuICAgICAgICBpZiAoaXRlbSAmJiBpdGVtLmF1dG9jb21wbGV0ZVZhbClcclxuICAgICAgICAgICAgJHNjb3BlLiRwYXJlbnQuc2V0UmF3U2VhcmNoVGV4dChpdGVtLmF1dG9jb21wbGV0ZVZhbCk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHdpbmRvdy5ydW5UZXN0cylcclxuICAgICAgICAgcnVuQXV0b0NvbXBsZXRlVGVzdHMoYXBpU2VydmljZSk7XHJcblxyXG59XSk7XHJcblxyXG5cclxuYW5ndWxhci5tb2R1bGUoJ0FwaUV4cGxvcmVyJykuY29udHJvbGxlcignRm9ybUN0cmwnLCBbJyRzY29wZScsICdBcGlFeHBsb3JlclN2YycsIGZ1bmN0aW9uICgkc2NvcGUsIGFwaVNlcnZpY2UpIHtcclxuICAgICRzY29wZS5oaXN0b3J5ID0gW107XHJcbiAgICAkc2NvcGUudGV4dCA9IGFwaVNlcnZpY2UudGV4dDtcclxuICAgICRzY29wZS5yZXF1ZXN0SW5Qcm9ncmVzcyA9IGZhbHNlO1xyXG4gICAgJHNjb3BlLmVudGl0eUl0ZW0gPSBudWxsO1xyXG4gICAgJHNjb3BlLmluc3VmZmljaWVudFByaXZpbGVnZXMgPSBmYWxzZTtcclxuXHJcbiAgICAvLyAkc2NvcGUuZ2V0QXNzZXRQYXRoID0gZnVuY3Rpb24ocmVsUGF0aCkge1xyXG4gICAgLy8gICAgIHJldHVybiAkc2NvcGUuJHBhcmVudC5wYXRoVG9CdWlsZERpciArIHJlbFBhdGhcclxuICAgIC8vIH1cclxuXHJcbiAgICBpZiAoaGVsbG8oJ21zZnQnKS5nZXRBdXRoUmVzcG9uc2UoKSAhPSBudWxsICYmIFxyXG4gICAgICAgIChhcGlTZXJ2aWNlLnNlbGVjdGVkT3B0aW9uID09PSAnUE9TVCcgfHwgYXBpU2VydmljZS5zZWxlY3RlZE9wdGlvbiA9PT0gJ1BBVENIJykpIHtcclxuICAgICAgICAgICAgc2hvd1JlcXVlc3RCb2R5RWRpdG9yKCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIHNldFNlbGVjdGVkVGFiKDApO1xyXG4gICAgfVxyXG5cclxuICAgICRzY29wZS5zdWJtaXNzaW9uSW5Qcm9ncmVzcyA9IGZhbHNlO1xyXG4gICAgICAgICAgICBcclxuICAgICRzY29wZS5nZXRUZXh0ID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgcmV0dXJuIGFwaVNlcnZpY2UudGV4dDtcclxuICAgIH1cclxuICAgIFxyXG4gICAgJHNjb3BlLiR3YXRjaChcImdldFRleHQoKVwiLCBmdW5jdGlvbihldmVudCwgYXJncykge1xyXG4gICAgICAgICRzY29wZS50ZXh0ID0gYXBpU2VydmljZS50ZXh0O1xyXG4gICAgfSk7XHJcbiBcclxuICAgIC8vIGN1c3RvbSBsaW5rIHJlLXJvdXRpbmcgbG9naWMgdG8gcmVzb2x2ZSBsaW5rc1xyXG4gICAgJHNjb3BlLiRwYXJlbnQuJG9uKFwidXJsQ2hhbmdlXCIsIGZ1bmN0aW9uIChldmVudCwgYXJncykge1xyXG4gICAgICAgIG1zR3JhcGhMaW5rUmVzb2x1dGlvbigkc2NvcGUsICRzY29wZS4kcGFyZW50Lmpzb25WaWV3ZXIuZ2V0U2Vzc2lvbigpLmdldFZhbHVlKCksIGFyZ3MsIGFwaVNlcnZpY2UpO1xyXG4gICAgfSk7XHJcbiAgICBcclxuICAgIC8vIGZ1bmN0aW9uIGNhbGxlZCB3aGVuIGxpbmsgaW4gdGhlIGJhY2sgYnV0dG9uIGhpc3RvcnkgaXMgY2xpY2tlZFxyXG4gICAgJHNjb3BlLmhpc3RvcnlPbkNsaWNrID0gZnVuY3Rpb24oaGlzdG9yeUl0ZW0pIHsgICAgICAgIFxyXG4gICAgICAgICRzY29wZS50ZXh0ID0gaGlzdG9yeUl0ZW0udXJsVGV4dDtcclxuICAgICAgICBhcGlTZXJ2aWNlLnNlbGVjdGVkVmVyc2lvbiA9IGhpc3RvcnlJdGVtLnNlbGVjdGVkVmVyc2lvbjtcclxuICAgICAgICBhcGlTZXJ2aWNlLnNlbGVjdGVkT3B0aW9uID0gaGlzdG9yeUl0ZW0uaHRtbE9wdGlvbjtcclxuXHJcbiAgICAgICAgaWYgKGhpc3RvcnlJdGVtLmh0bWxPcHRpb24gPT0gJ1BPU1QnIHx8IGhpc3RvcnlJdGVtLmh0bWxPcHRpb24gPT0gJ1BBVENIJykge1xyXG4gICAgICAgICAgICBhcGlTZXJ2aWNlLnNob3dKc29uRWRpdG9yID0gdHJ1ZTtcclxuICAgICAgICAgICAgaWYgKCRzY29wZS5qc29uRWRpdG9yKSB7XHJcbiAgICAgICAgICAgICAgICAkc2NvcGUuanNvbkVkaXRvci5nZXRTZXNzaW9uKCkuc2V0VmFsdWUoaGlzdG9yeUl0ZW0uanNvbklucHV0KTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJqc29uIGVkaXRvciB3YXRjaCBldmVudCBub3QgZmlyaW5nXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgLy9jbGVhciBqc29uRWRpdG9yXHJcbiAgICAgICAgICAgIGlmICgkc2NvcGUuanNvbkVkaXRvcikge1xyXG4gICAgICAgICAgICAgICAgJHNjb3BlLmpzb25FZGl0b3IuZ2V0U2Vzc2lvbigpLnNldFZhbHVlKFwiXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGFwaVNlcnZpY2Uuc2hvd0pzb25FZGl0b3IgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgfVxyXG4gICAgICAgICRzY29wZS5zdWJtaXQoJHNjb3BlLnRleHQpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAkc2NvcGUuY2xvc2VBZG1pbkNvbnNlbnRCYXIgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAkc2NvcGUuaW5zdWZmaWNpZW50UHJpdmlsZWdlcyA9IGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgICRzY29wZS5nZXRBZG1pbkNvbnNlbnQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgaGVsbG8oJ21zZnRfYWRtaW5fY29uc2VudCcpLmxvZ2luKHtcclxuICAgICAgICAgICAgZGlzcGxheTogJ3BvcHVwJ1xyXG4gICAgICAgIH0pLnRoZW4oZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICRzY29wZS5maW5pc2hBZG1pbkNvbnNlcnRGbG93KCk7XHJcbiAgICAgICAgfSwgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICRzY29wZS5maW5pc2hBZG1pbkNvbnNlcnRGbG93KCk7XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuICAgIFxyXG4gICAgJHNjb3BlLnNlbGVjdGVkSXRlbUNoYW5nZSA9IGZ1bmN0aW9uKGl0ZW0pIHtcclxuICAgICAgICAkc2NvcGUuZW50aXR5SXRlbSA9IGl0ZW07XHJcbiAgICB9XHJcbiAgICBcclxuXHJcbiAgICAkc2NvcGUuc3VibWl0ID0gZnVuY3Rpb24gKHF1ZXJ5KSB7XHJcbiAgICAgICAgaWYgKCFxdWVyeSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBhcGlTZXJ2aWNlLnRleHQgPSBxdWVyeTtcclxuICAgICAgICAkc2NvcGUucmVxdWVzdEluUHJvZ3Jlc3MgPSB0cnVlO1xyXG5cclxuICAgICAgICAvL2NyZWF0ZSBhbiBvYmplY3QgdG8gc3RvcmUgdGhlIGFwaSBjYWxsXHJcbiAgICAgICAgdmFyIGhpc3RvcnlPYmogPSB7fTtcclxuXHJcbiAgICAgICAgaGlzdG9yeU9iai51cmxUZXh0ID0gcXVlcnk7XHJcbiAgICAgICAgaGlzdG9yeU9iai5zZWxlY3RlZFZlcnNpb24gPSBhcGlTZXJ2aWNlLnNlbGVjdGVkVmVyc2lvbjtcclxuICAgICAgICBoaXN0b3J5T2JqLmh0bWxPcHRpb24gPSBhcGlTZXJ2aWNlLnNlbGVjdGVkT3B0aW9uO1xyXG4gICAgICAgIGhpc3RvcnlPYmouanNvbklucHV0ID0gXCJcIjtcclxuXHJcblxyXG4gICAgICAgIGlmIChoaXN0b3J5T2JqLmh0bWxPcHRpb24gPT0gJ1BPU1QnIHx8IGhpc3RvcnlPYmouaHRtbE9wdGlvbiA9PSAnUEFUQ0gnKSB7XHJcbiAgICAgICAgICAgIGhpc3RvcnlPYmouanNvbklucHV0ID0gJHNjb3BlLmpzb25FZGl0b3IuZ2V0U2Vzc2lvbigpLmdldFZhbHVlKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAkc2NvcGUuc2hvd0pzb25WaWV3ZXIgPSB0cnVlO1xyXG4gICAgICAgICRzY29wZS5zaG93SW1hZ2UgPSBmYWxzZTtcclxuXHJcblxyXG4gICAgICAgIHZhciBwb3N0Qm9keSA9IFwiXCI7XHJcbiAgICAgICAgaWYgKCRzY29wZS5qc29uRWRpdG9yICE9IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICBwb3N0Qm9keSA9ICRzY29wZS5qc29uRWRpdG9yLmdldFNlc3Npb24oKS5nZXRWYWx1ZSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdmFyIHJlcXVlc3RIZWFkZXJzID0gXCJcIjtcclxuICAgICAgICBpZiAoJHNjb3BlLmpzb25FZGl0b3JIZWFkZXJzICE9IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICByZXF1ZXN0SGVhZGVycyA9ICRzY29wZS5qc29uRWRpdG9ySGVhZGVycy5nZXRTZXNzaW9uKCkuZ2V0VmFsdWUoKTtcclxuICAgICAgICAgICAgcmVxdWVzdEhlYWRlcnMgPSBmb3JtYXRSZXF1ZXN0SGVhZGVycyhyZXF1ZXN0SGVhZGVycyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB2YXIgc3RhcnRUaW1lID0gbmV3IERhdGUoKTtcclxuXHJcbiAgICAgICAgdmFyIGhhbmRsZVN1Y2Nlc3NmdWxRdWVyeVJlc3BvbnNlID0gZnVuY3Rpb24ocmVzdWx0KSB7XHJcbiAgICAgICAgICAgIHZhciBzdGF0dXMgPSByZXN1bHQuc3RhdHVzO1xyXG4gICAgICAgICAgICB2YXIgaGVhZGVycyA9IHJlc3VsdC5oZWFkZXJzO1xyXG5cclxuICAgICAgICAgICAgaWYgKGlzSW1hZ2VSZXNwb25zZShoZWFkZXJzKSkge1xyXG4gICAgICAgICAgICAgICAgaGFuZGxlSW1hZ2VSZXNwb25zZSgkc2NvcGUsIGFwaVNlcnZpY2UsIHN0YXJ0VGltZSwgcmVzdWx0LCBoZWFkZXJzLCBzdGF0dXMsIGhhbmRsZVVuc3VjY2Vzc2Z1bFF1ZXJ5UmVzcG9uc2UpO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGlzSHRtbFJlc3BvbnNlKGhlYWRlcnMpKSB7XHJcbiAgICAgICAgICAgICAgICBoYW5kbGVIdG1sUmVzcG9uc2UoJHNjb3BlLCBzdGFydFRpbWUsIHJlc3VsdCwgaGVhZGVycywgc3RhdHVzKTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChpc1htbFJlc3BvbnNlKHJlc3VsdCkpIHtcclxuICAgICAgICAgICAgICAgIGhhbmRsZVhtbFJlc3BvbnNlKCRzY29wZSwgc3RhcnRUaW1lLCByZXN1bHQsIGhlYWRlcnMsIHN0YXR1cyk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBoYW5kbGVKc29uUmVzcG9uc2UoJHNjb3BlLCBzdGFydFRpbWUsIHJlc3VsdC5kYXRhLCBoZWFkZXJzLCBzdGF0dXMpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBzYXZlSGlzdG9yeU9iamVjdChoaXN0b3J5T2JqLCBzdGF0dXMpO1xyXG5cclxuICAgICAgICAgICAgaWYgKGFwaVNlcnZpY2UuY2FjaGUuZ2V0KGFwaVNlcnZpY2Uuc2VsZWN0ZWRWZXJzaW9uICsgXCJNZXRhZGF0YVwiKSAmJiBhcGlTZXJ2aWNlLnNlbGVjdGVkT3B0aW9uID09IFwiR0VUXCIpIHtcclxuICAgICAgICAgICAgICAgIHNldEVudGl0eSgkc2NvcGUuZW50aXR5SXRlbSwgYXBpU2VydmljZSwgdHJ1ZSwgYXBpU2VydmljZS50ZXh0KTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgJHNjb3BlLmluc3VmZmljaWVudFByaXZpbGVnZXMgPSBmYWxzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHZhciBoYW5kbGVVbnN1Y2Nlc3NmdWxRdWVyeVJlc3BvbnNlID0gZnVuY3Rpb24ocmVzdWx0KSB7XHJcbiAgICAgICAgICAgIGhhbmRsZUpzb25SZXNwb25zZSgkc2NvcGUsIHN0YXJ0VGltZSwgcmVzdWx0LmRhdGEuZXJyb3IsIHJlc3VsdC5oZWFkZXJzLCByZXN1bHQuc3RhdHVzKTtcclxuICAgICAgICAgICAgc2F2ZUhpc3RvcnlPYmplY3QoaGlzdG9yeU9iaiwgcmVzdWx0LnN0YXR1cyk7XHJcbiAgICAgICAgICAgIGlmIChhcGlTZXJ2aWNlLmNhY2hlLmdldChhcGlTZXJ2aWNlLnNlbGVjdGVkVmVyc2lvbiArIFwiTWV0YWRhdGFcIikgJiYgYXBpU2VydmljZS5zZWxlY3RlZE9wdGlvbiA9PSBcIkdFVFwiKSB7XHJcbiAgICAgICAgICAgICAgICBzZXRFbnRpdHkoJHNjb3BlLmVudGl0eUl0ZW0sIGFwaVNlcnZpY2UsIGZhbHNlLCBhcGlTZXJ2aWNlLnRleHQpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAocmVzdWx0LnN0YXR1cyA9PT0gNDAxIHx8IHJlc3VsdC5zdGF0dXMgPT09IDQwMykge1xyXG4gICAgICAgICAgICAgICAgJHNjb3BlLmluc3VmZmljaWVudFByaXZpbGVnZXMgPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgaWYgKCRzY29wZS5pc0F1dGhlbnRpY2F0ZWQoKSkge1xyXG4gICAgICAgICAgICBhcGlTZXJ2aWNlLnBlcmZvcm1RdWVyeShhcGlTZXJ2aWNlLnNlbGVjdGVkT3B0aW9uKShhcGlTZXJ2aWNlLnRleHQsIHBvc3RCb2R5LCByZXF1ZXN0SGVhZGVycylcclxuICAgICAgICAgICAgICAgIC50aGVuKGhhbmRsZVN1Y2Nlc3NmdWxRdWVyeVJlc3BvbnNlLCBoYW5kbGVVbnN1Y2Nlc3NmdWxRdWVyeVJlc3BvbnNlKTtcclxuXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgYXBpU2VydmljZS5wZXJmb3JtQW5vbnltb3VzUXVlcnkoYXBpU2VydmljZS5zZWxlY3RlZE9wdGlvbikoYXBpU2VydmljZS50ZXh0LCBwb3N0Qm9keSwgcmVxdWVzdEhlYWRlcnMpXHJcbiAgICAgICAgICAgICAgICAudGhlbihoYW5kbGVTdWNjZXNzZnVsUXVlcnlSZXNwb25zZSwgaGFuZGxlVW5zdWNjZXNzZnVsUXVlcnlSZXNwb25zZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICBcclxuICAgIGZ1bmN0aW9uIHNhdmVIaXN0b3J5T2JqZWN0KGhpc3RvcnlPYmplY3QsIHN0YXR1c0NvZGUpIHtcclxuICAgICAgICBoaXN0b3J5T2JqZWN0LnN1Y2Nlc3NmdWwgPSBzdGF0dXNDb2RlID49IDIwMCAmJiBzdGF0dXNDb2RlIDwgMzAwO1xyXG4gICAgICAgIGhpc3RvcnlPYmplY3Quc3RhdHVzQ29kZSA9IHN0YXR1c0NvZGU7XHJcbiAgICAgICAgaGlzdG9yeU9iamVjdC5kdXJhdGlvbiA9ICRzY29wZS5kdXJhdGlvbjtcclxuICAgICAgICAkc2NvcGUuaGlzdG9yeS5zcGxpY2UoMCwgMCwgaGlzdG9yeU9iamVjdCk7IC8vYWRkIGhpc3Rvcnkgb2JqZWN0IHRvIHRoZSBhcnJheVxyXG4gICAgfVxyXG59XSk7IiwiLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbi8vICBDb3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi4gIEFsbCBSaWdodHMgUmVzZXJ2ZWQuICBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuICBTZWUgTGljZW5zZSBpbiB0aGUgcHJvamVjdCByb290IGZvciBsaWNlbnNlIGluZm9ybWF0aW9uLlxyXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHJcbi8vIGdldCB0aGUgcGF0aCB0byB0aGlzIHNjcmlwdFxyXG52YXIgc2NyaXB0cyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwic2NyaXB0XCIpXHJcbnZhciBzcmMgPSBzY3JpcHRzW3NjcmlwdHMubGVuZ3RoLTFdLnNyYztcclxudmFyIHBhdGhUb0J1aWxkRGlyID0gc3JjLnNwbGl0KCcvJykuc2xpY2UoMCwgLTIpLmpvaW4oJy8nKTtcclxuXHJcbmFuZ3VsYXIubW9kdWxlKCdBcGlFeHBsb3JlcicpXHJcbiAgICAuZGlyZWN0aXZlKCdhcGlFeHBsb3JlcicsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHNjb3BlOiB7XHJcbiAgICAgICAgICAgICAgICBzdHJpbmdzOiAnPScsXHJcbiAgICAgICAgICAgICAgICBsYW5ndWFnZTogJz0nLFxyXG4gICAgICAgICAgICAgICAgc2NvcGVzOiAnPScsXHJcbiAgICAgICAgICAgICAgICBhZG1pblNjb3BlczogJz0nLFxyXG4gICAgICAgICAgICAgICAgY2xpZW50SWQ6ICc9JyxcclxuICAgICAgICAgICAgICAgIHJlZGlyZWN0VXJsOiAnPSdcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgdGVtcGxhdGVVcmw6IHBhdGhUb0J1aWxkRGlyKycvYXNzZXRzL3ZpZXdzL2V4cGxvcmVyLmh0bWwnLFxyXG4gICAgICAgICAgICBjb250cm9sbGVyOiBmdW5jdGlvbiAoJHNjb3BlKSB7XHJcbiAgICAgICAgICAgICAgICAkc2NvcGUucGF0aFRvQnVpbGREaXIgPSBwYXRoVG9CdWlsZERpcjtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBkZWZhdWx0IHN0cmluZ3NcclxuICAgICAgICAgICAgICAgICRzY29wZS5zdHIgPSBsb2Nfc3RyaW5nc1snZW5fdXMnXTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBpZiB0aGUgdXNlciBzcGVjaWZpZWQgYSBsYW5ndWFnZSwgdXNlIHRoYXQgaW5zdGVhZFxyXG4gICAgICAgICAgICAgICAgaWYgKCRzY29wZS5sYW5ndWFnZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICRzY29wZS5zdHIgPSBsb2Nfc3RyaW5nc1skc2NvcGUubGFuZ3VhZ2VdO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIC8vIG1lcmdlICRzY29wZS5zdHJpbmdzIGludG8gJHNjb3BlLnN0clxyXG4gICAgICAgICAgICAgICAgYW5ndWxhci5leHRlbmQoJHNjb3BlLnN0ciwgJHNjb3BlLnN0cmluZ3MpO1xyXG5cclxuXHJcbiAgICAgICAgICAgICAgICBoZWxsby5pbml0KCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbXNmdDogJHNjb3BlLmNsaWVudElkXHJcbiAgICAgICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2NvcGU6ICRzY29wZS5zY29wZXMsXHJcbiAgICAgICAgICAgICAgICAgICAgcmVkaXJlY3RfdXJpOiB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUgLy9yZXF1aXJlZCB0byByZW1vdmUgZXh0cmEgdXJsIHBhcmFtcyB0aGF0IG1ha2UgVVJMcyBub3QgbWF0Y2hcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIGhlbGxvLmluaXQoIHtcclxuICAgICAgICAgICAgICAgICAgICBtc2Z0X2FkbWluX2NvbnNlbnQ6ICRzY29wZS5jbGllbnRJZCxcclxuICAgICAgICAgICAgICAgICAgICBtc2Z0X3Rva2VuX3JlZnJlc2g6ICRzY29wZS5jbGllbnRJZCxcclxuICAgICAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgICAgICByZWRpcmVjdF91cmk6IHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgfSk7IiwiLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbi8vICBDb3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi4gIEFsbCBSaWdodHMgUmVzZXJ2ZWQuICBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuICBTZWUgTGljZW5zZSBpbiB0aGUgcHJvamVjdCByb290IGZvciBsaWNlbnNlIGluZm9ybWF0aW9uLlxyXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHJcbmZ1bmN0aW9uIGluaXRpYWxpemVKc29uRWRpdG9yKCRzY29wZSwgYm9keVZhbCkge1xyXG4gICAgdmFyIGpzb25WaWV3ZXJFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJqc29uRWRpdG9yXCIpO1xyXG4gICAganNvbkVkaXRvciA9IGFjZS5lZGl0KGpzb25WaWV3ZXJFbGVtZW50KTtcclxuICAgIGpzb25FZGl0b3IuZ2V0U2Vzc2lvbigpLnNldE1vZGUoXCJhY2UvbW9kZS9qYXZhc2NyaXB0XCIpO1xyXG4gICAganNvbkVkaXRvci4kYmxvY2tTY3JvbGxpbmcgPSBJbmZpbml0eTtcclxuICAgIFxyXG4gICAganNvbkVkaXRvci5zZXRTaG93UHJpbnRNYXJnaW4oZmFsc2UpO1xyXG4gICAgaWYgKGJvZHlWYWwpIHtcclxuICAgICAgICBqc29uRWRpdG9yLmdldFNlc3Npb24oKS5pbnNlcnQoe3JvdzowLCBjb2x1bW46MH0sIGJvZHlWYWwpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBqc29uRWRpdG9yLmdldFNlc3Npb24oKS5pbnNlcnQoMCwgXCIgXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIGpzb25FZGl0b3IucmVuZGVyZXIuc2V0T3B0aW9uKCdzaG93TGluZU51bWJlcnMnLCBmYWxzZSk7XHJcbiAgICAvL2FjY2Vzc2liaWxpdHkgLSBrZXlib2FyZCBkZXBlbmRhbnQgdXNlcnMgbXVzdCBiZSBhYmxlIHRvIFwidGFiIG91dFwiIG9mIHNlc3Npb25cclxuICAgIGpzb25FZGl0b3IuY29tbWFuZHMuYmluZEtleShcIlRhYlwiLCBudWxsKTtcclxuICAgICRzY29wZS5qc29uRWRpdG9yID0ganNvbkVkaXRvcjtcclxufVxyXG5cclxuZnVuY3Rpb24gaW5pdGlhbGl6ZUpzb25FZGl0b3JIZWFkZXJzKCRzY29wZSwgaGVhZGVyc1ZhbCkge1xyXG4gICAgdmFyIGpzb25WaWV3ZXJFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJqc29uRWRpdG9ySGVhZGVyc1wiKTtcclxuICAgIGlmICghanNvblZpZXdlckVsZW1lbnQpIHtcclxuICAgICAgICBjb25zb2xlLmVycm9yKCdjYW5ub3QgZmluZCAjanNvbkVkaXRvckhlYWRlcnMnKVxyXG4gICAgfVxyXG4gICAganNvbkVkaXRvckhlYWRlcnMgPSBhY2UuZWRpdChqc29uVmlld2VyRWxlbWVudCk7XHJcbiAgICBqc29uRWRpdG9ySGVhZGVycy5zZXRTaG93UHJpbnRNYXJnaW4oZmFsc2UpO1xyXG5cclxuICAgIGpzb25FZGl0b3JIZWFkZXJzLiRibG9ja1Njcm9sbGluZyA9IEluZmluaXR5O1xyXG4gICAgLy9hY2Nlc3NpYmlsaXR5IC0ga2V5Ym9hcmQgZGVwZW5kYW50IHVzZXJzIG11c3QgYmUgYWJsZSB0byBcInRhYiBvdXRcIiBvZiBzZXNzaW9uXHJcbiAgICBpZihoZWFkZXJzVmFsKSB7XHJcbiAgICAgICAganNvbkVkaXRvckhlYWRlcnMuZ2V0U2Vzc2lvbigpLmluc2VydCgwLCBoZWFkZXJzVmFsKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAganNvbkVkaXRvckhlYWRlcnMuZ2V0U2Vzc2lvbigpLmluc2VydCgwLCBcIiBcIik7XHJcbiAgICB9XHJcbiAgICBqc29uRWRpdG9ySGVhZGVycy5yZW5kZXJlci5zZXRPcHRpb24oJ3Nob3dMaW5lTnVtYmVycycsIGZhbHNlKTtcclxuICAgIGpzb25FZGl0b3JIZWFkZXJzLm1vdmVDdXJzb3JUbygxLDApO1xyXG4gICAganNvbkVkaXRvckhlYWRlcnMuY29tbWFuZHMuYmluZEtleShcIlRhYlwiLCBudWxsKTtcclxuICAgICRzY29wZS5qc29uRWRpdG9ySGVhZGVycyA9IGpzb25FZGl0b3JIZWFkZXJzO1xyXG59IiwiLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbi8vICBDb3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi4gIEFsbCBSaWdodHMgUmVzZXJ2ZWQuICBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuICBTZWUgTGljZW5zZSBpbiB0aGUgcHJvamVjdCByb290IGZvciBsaWNlbnNlIGluZm9ybWF0aW9uLlxyXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHJcbmZ1bmN0aW9uIGluaXRpYWxpemVKc29uVmlld2VyKCRzY29wZSwgYXBpU2VydmljZSkge1xyXG4gICAgJChmdW5jdGlvbigpIHtcclxuICAgIFxyXG4gICAgICAgIHZhciBqc29uVmlld2VyRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwianNvblZpZXdlclwiKTtcclxuICAgICAgICBqc29uVmlld2VyID0gYWNlLmVkaXQoanNvblZpZXdlckVsZW1lbnQpO1xyXG4gICAgICAgIGpzb25WaWV3ZXIuZ2V0U2Vzc2lvbigpLnNldE1vZGUoXCJhY2UvbW9kZS9qYXZhc2NyaXB0XCIpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGpzb25WaWV3ZXIuJGJsb2NrU2Nyb2xsaW5nID0gSW5maW5pdHk7XHJcbiAgICAgICAganNvblZpZXdlci5yZW5kZXJlci5zZXRPcHRpb24oJ3Nob3dMaW5lTnVtYmVycycsIGZhbHNlKTtcclxuICAgICAgICBcclxuICAgICAgICBqc29uVmlld2VyLnNldE9wdGlvbnMoe1xyXG4gICAgICAgICAgICByZWFkT25seTogdHJ1ZSxcclxuICAgICAgICAgICAgaGlnaGxpZ2h0QWN0aXZlTGluZTogZmFsc2UsXHJcbiAgICAgICAgICAgIGhpZ2hsaWdodEd1dHRlckxpbmU6IGZhbHNlLFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGpzb25WaWV3ZXIuc2V0U2hvd1ByaW50TWFyZ2luKGZhbHNlKTtcclxuICAgICAgICBqc29uVmlld2VyLmdldFNlc3Npb24oKS5zZXRVc2VXb3JrZXIoZmFsc2UpO1xyXG4gICAgICAgIGpzb25WaWV3ZXIucmVuZGVyZXIuJGN1cnNvckxheWVyLmVsZW1lbnQuc3R5bGUub3BhY2l0eSA9IDA7XHJcblxyXG5cclxuICAgICAgICBkZWZpbmUoXCJob3ZlcmxpbmtcIiwgW1wicmVxdWlyZVwiLCBcImV4cG9ydHNcIl0sIGZ1bmN0aW9uIChyZXF1aXJlLCBleHBvcnRzLCBtb2R1bGUpIHtcclxuICAgICAgICAgICAgXCJ1c2Ugc3RyaWN0XCI7XHJcbiAgICAgICAgICAgIHZhciBvb3AgPSByZXF1aXJlKFwiYWNlL2xpYi9vb3BcIik7XHJcbiAgICAgICAgICAgIHZhciBldmVudCA9IHJlcXVpcmUoXCJhY2UvbGliL2V2ZW50XCIpO1xyXG4gICAgICAgICAgICB2YXIgUmFuZ2UgPSByZXF1aXJlKFwiYWNlL3JhbmdlXCIpLlJhbmdlO1xyXG4gICAgICAgICAgICB2YXIgRXZlbnRFbWl0dGVyID0gcmVxdWlyZShcImFjZS9saWIvZXZlbnRfZW1pdHRlclwiKS5FdmVudEVtaXR0ZXI7XHJcblxyXG4gICAgICAgICAgICB2YXIgSG92ZXJMaW5rID0gZnVuY3Rpb24gKGpzb25WaWV3ZXIpIHtcclxuICAgICAgICAgICAgICAgIGlmIChqc29uVmlld2VyLmhvdmVyTGluaylcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICBqc29uVmlld2VyLmhvdmVyTGluayA9IHRoaXM7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmpzb25WaWV3ZXIgPSBqc29uVmlld2VyO1xyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlID0gdGhpcy51cGRhdGUuYmluZCh0aGlzKTtcclxuICAgICAgICAgICAgICAgIHRoaXMub25Nb3VzZU1vdmUgPSB0aGlzLm9uTW91c2VNb3ZlLmJpbmQodGhpcyk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm9uTW91c2VPdXQgPSB0aGlzLm9uTW91c2VPdXQuYmluZCh0aGlzKTtcclxuICAgICAgICAgICAgICAgIHRoaXMub25DbGljayA9IHRoaXMub25DbGljay5iaW5kKHRoaXMpO1xyXG4gICAgICAgICAgICAgICAgZXZlbnQuYWRkTGlzdGVuZXIoanNvblZpZXdlci5yZW5kZXJlci5zY3JvbGxlciwgXCJtb3VzZW1vdmVcIiwgdGhpcy5vbk1vdXNlTW92ZSk7XHJcbiAgICAgICAgICAgICAgICBldmVudC5hZGRMaXN0ZW5lcihqc29uVmlld2VyLnJlbmRlcmVyLmNvbnRlbnQsIFwibW91c2VvdXRcIiwgdGhpcy5vbk1vdXNlT3V0KTtcclxuICAgICAgICAgICAgICAgIGV2ZW50LmFkZExpc3RlbmVyKGpzb25WaWV3ZXIucmVuZGVyZXIuY29udGVudCwgXCJjbGlja1wiLCB0aGlzLm9uQ2xpY2spO1xyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIG9vcC5pbXBsZW1lbnQodGhpcywgRXZlbnRFbWl0dGVyKTtcclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLnRva2VuID0ge307XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJhbmdlID0gbmV3IFJhbmdlKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGUgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy4kdGltZXIgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBqc29uVmlld2VyID0gdGhpcy5qc29uVmlld2VyO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciByZW5kZXJlciA9IGpzb25WaWV3ZXIucmVuZGVyZXI7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHZhciBjYW52YXNQb3MgPSByZW5kZXJlci5zY3JvbGxlci5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgb2Zmc2V0ID0gKHRoaXMueCArIHJlbmRlcmVyLnNjcm9sbExlZnQgLSBjYW52YXNQb3MubGVmdCAtIHJlbmRlcmVyLiRwYWRkaW5nKSAvIHJlbmRlcmVyLmNoYXJhY3RlcldpZHRoO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciByb3cgPSBNYXRoLmZsb29yKCh0aGlzLnkgKyByZW5kZXJlci5zY3JvbGxUb3AgLSBjYW52YXNQb3MudG9wKSAvIHJlbmRlcmVyLmxpbmVIZWlnaHQpO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBjb2wgPSBNYXRoLnJvdW5kKG9mZnNldCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHZhciBzY3JlZW5Qb3MgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJvdzogcm93LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb2x1bW46IGNvbCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2lkZTogb2Zmc2V0IC0gY29sID4gMCA/IDEgOiAtMVxyXG4gICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHNlc3Npb24gPSBqc29uVmlld2VyLnNlc3Npb247XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGRvY1BvcyA9IHNlc3Npb24uc2NyZWVuVG9Eb2N1bWVudFBvc2l0aW9uKHNjcmVlblBvcy5yb3csIHNjcmVlblBvcy5jb2x1bW4pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB2YXIgc2VsZWN0aW9uUmFuZ2UgPSBqc29uVmlld2VyLnNlbGVjdGlvbi5nZXRSYW5nZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghc2VsZWN0aW9uUmFuZ2UuaXNFbXB0eSgpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzZWxlY3Rpb25SYW5nZS5zdGFydC5yb3cgPD0gcm93ICYmIHNlbGVjdGlvblJhbmdlLmVuZC5yb3cgPj0gcm93KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuY2xlYXIoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHZhciBsaW5lID0ganNvblZpZXdlci5zZXNzaW9uLmdldExpbmUoZG9jUG9zLnJvdyk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRvY1Bvcy5jb2x1bW4gPT0gbGluZS5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGNsaXBwZWRQb3MgPSBqc29uVmlld2VyLnNlc3Npb24uZG9jdW1lbnRUb1NjcmVlblBvc2l0aW9uKGRvY1Bvcy5yb3csIGRvY1Bvcy5jb2x1bW4pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY2xpcHBlZFBvcy5jb2x1bW4gIT0gc2NyZWVuUG9zLmNvbHVtbikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuY2xlYXIoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHRva2VuID0gdGhpcy5maW5kTGluayhkb2NQb3Mucm93LCBkb2NQb3MuY29sdW1uKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmxpbmsgPSB0b2tlbjtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIXRva2VuKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmNsZWFyKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaXNPcGVuID0gdHJ1ZVxyXG4gICAgICAgICAgICAgICAgICAgIGpzb25WaWV3ZXIucmVuZGVyZXIuc2V0Q3Vyc29yU3R5bGUoXCJwb2ludGVyXCIpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBzZXNzaW9uLnJlbW92ZU1hcmtlcih0aGlzLm1hcmtlcik7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmFuZ2UgPSBuZXcgUmFuZ2UodG9rZW4ucm93LCB0b2tlbi5zdGFydCwgdG9rZW4ucm93LCB0b2tlbi5zdGFydCArIHRva2VuLnZhbHVlLmxlbmd0aCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tYXJrZXIgPSBzZXNzaW9uLmFkZE1hcmtlcih0aGlzLnJhbmdlLCBcImFjZV9saW5rX21hcmtlclwiLCBcInRleHRcIiwgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMuY2xlYXIgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuaXNPcGVuKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuanNvblZpZXdlci5zZXNzaW9uLnJlbW92ZU1hcmtlcih0aGlzLm1hcmtlcik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuanNvblZpZXdlci5yZW5kZXJlci5zZXRDdXJzb3JTdHlsZShcIlwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5pc09wZW4gPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMuZ2V0TWF0Y2hBcm91bmQgPSBmdW5jdGlvbiAocmVnRXhwLCBzdHJpbmcsIGNvbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBtYXRjaDtcclxuICAgICAgICAgICAgICAgICAgICByZWdFeHAubGFzdEluZGV4ID0gMDtcclxuICAgICAgICAgICAgICAgICAgICBzdHJpbmcucmVwbGFjZShyZWdFeHAsIGZ1bmN0aW9uIChzdHIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG9mZnNldCA9IGFyZ3VtZW50c1thcmd1bWVudHMubGVuZ3RoIC0gMl07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBsZW5ndGggPSBzdHIubGVuZ3RoO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAob2Zmc2V0IDw9IGNvbCAmJiBvZmZzZXQgKyBsZW5ndGggPj0gY29sKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWF0Y2ggPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhcnQ6IG9mZnNldCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogc3RyXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbWF0Y2g7XHJcbiAgICAgICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMub25DbGljayA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIganNvblZpZXdlciA9IHRoaXMuanNvblZpZXdlcjtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgcmVuZGVyZXIgPSBqc29uVmlld2VyLnJlbmRlcmVyO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB2YXIgY2FudmFzUG9zID0gcmVuZGVyZXIuc2Nyb2xsZXIuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIG9mZnNldCA9ICh0aGlzLnggKyByZW5kZXJlci5zY3JvbGxMZWZ0IC0gY2FudmFzUG9zLmxlZnQgLSByZW5kZXJlci4kcGFkZGluZykgLyByZW5kZXJlci5jaGFyYWN0ZXJXaWR0aDtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgcm93ID0gTWF0aC5mbG9vcigodGhpcy55ICsgcmVuZGVyZXIuc2Nyb2xsVG9wIC0gY2FudmFzUG9zLnRvcCkgLyByZW5kZXJlci5saW5lSGVpZ2h0KTtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgY29sID0gTWF0aC5yb3VuZChvZmZzZXQpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5saW5rKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyb3cgIT0gdGhpcy5saW5rLnJvdyB8fCAhKGNvbCA+IHRoaXMubGluay5zdGFydCAmJiBjb2wgPCB0aGlzLmxpbmsuc3RhcnQgKyB0aGlzLmxpbmsudmFsdWUubGVuZ3RoKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxpbmsuanNvblZpZXdlciA9IHRoaXMuanNvblZpZXdlcjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fc2lnbmFsKFwib3BlblwiLCB0aGlzLmxpbmspO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNsZWFyKClcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMuZmluZExpbmsgPSBmdW5jdGlvbiAocm93LCBjb2x1bW4pIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIganNvblZpZXdlciA9IHRoaXMuanNvblZpZXdlcjtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgc2Vzc2lvbiA9IGpzb25WaWV3ZXIuc2Vzc2lvbjtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgbGluZSA9IHNlc3Npb24uZ2V0TGluZShyb3cpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB2YXIgbWF0Y2ggPSB0aGlzLmdldE1hdGNoQXJvdW5kKC9odHRwcz86XFwvXFwvW15cXHNcIl0rL2csIGxpbmUsIGNvbHVtbik7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFtYXRjaCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgbWF0Y2ggPSB0aGlzLmdldE1hdGNoQXJvdW5kKC9cImlkXCI6IFwiW15cXHNcIiddKy9nLCBsaW5lLCBjb2x1bW4pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIW1hdGNoKSByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1hdGNoID0gdGhpcy5nZXRNYXRjaEFyb3VuZCgvXCJbXlxcc1wiJ10rL2csIGxpbmUsIGNvbHVtbik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghbWF0Y2gpIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIG1hdGNoLnJvdyA9IHJvdztcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbWF0Y2g7XHJcbiAgICAgICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMub25Nb3VzZU1vdmUgPSBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmpzb25WaWV3ZXIuJG1vdXNlSGFuZGxlci5pc01vdXNlUHJlc3NlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMuanNvblZpZXdlci5zZWxlY3Rpb24uaXNFbXB0eSgpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jbGVhcigpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMueCA9IGUuY2xpZW50WDtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnkgPSBlLmNsaWVudFk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy51cGRhdGUoKTtcclxuICAgICAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5vbk1vdXNlT3V0ID0gZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNsZWFyKCk7XHJcbiAgICAgICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMuZGVzdHJveSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm9uTW91c2VPdXQoKTtcclxuICAgICAgICAgICAgICAgICAgICBldmVudC5yZW1vdmVMaXN0ZW5lcih0aGlzLmpzb25WaWV3ZXIucmVuZGVyZXIuc2Nyb2xsZXIsIFwibW91c2Vtb3ZlXCIsIHRoaXMub25Nb3VzZU1vdmUpO1xyXG4gICAgICAgICAgICAgICAgICAgIGV2ZW50LnJlbW92ZUxpc3RlbmVyKHRoaXMuanNvblZpZXdlci5yZW5kZXJlci5jb250ZW50LCBcIm1vdXNlb3V0XCIsIHRoaXMub25Nb3VzZU91dCk7XHJcbiAgICAgICAgICAgICAgICAgICAgZGVsZXRlIHRoaXMuanNvblZpZXdlci5ob3Zlckxpbms7XHJcbiAgICAgICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgfSkuY2FsbChIb3ZlckxpbmsucHJvdG90eXBlKTtcclxuXHJcbiAgICAgICAgICAgIGV4cG9ydHMuSG92ZXJMaW5rID0gSG92ZXJMaW5rO1xyXG5cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgSG92ZXJMaW5rID0gcmVxdWlyZShcImhvdmVybGlua1wiKS5Ib3ZlckxpbmtcclxuICAgICAgICBqc29uVmlld2VyLmhvdmVyTGluayA9IG5ldyBIb3ZlckxpbmsoanNvblZpZXdlcik7XHJcbiAgICAgICAganNvblZpZXdlci5ob3Zlckxpbmsub24oXCJvcGVuXCIsIGZ1bmN0aW9uICh4KSB7XHJcbiAgICAgICAgICAgIHJ1bigkc2NvcGUsIHgudmFsdWUsIGFwaVNlcnZpY2UpO1xyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgICRzY29wZS5qc29uVmlld2VyID0ganNvblZpZXdlcjtcclxuICAgIH0pO1xyXG59XHJcblxyXG5mdW5jdGlvbiBzZXRKc29uVmlld2VyQ29udGVudFR5cGUobW9kZSkge1xyXG4gICAganNvblZpZXdlci5nZXRTZXNzaW9uKCkuc2V0TW9kZShcImFjZS9tb2RlL1wiICsgbW9kZSk7XHJcbn0iLCIvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuLy8gIENvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiAgQWxsIFJpZ2h0cyBSZXNlcnZlZC4gIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gIFNlZSBMaWNlbnNlIGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXHJcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cclxudmFyIG1zR3JhcGhMaW5rUmVzb2x1dGlvbiA9IGZ1bmN0aW9uICgkc2NvcGUsIGJvZHksIGFyZ3MsIHNlcnZpY2UpIHtcclxuICAgIGlmIChhcmdzLmluZGV4T2YoXCJodHRwczovL1wiKSA9PSAtMSkge1xyXG4gICAgICAgIGlmIChzZXJ2aWNlLnRleHQuaW5kZXhPZihhcmdzLnN1YnN0cigxKSkgIT0gLTEpIHtcclxuXHJcbiAgICAgICAgfSBlbHNlIGlmIChzZXJ2aWNlLnRleHQuaW5kZXhPZihcIi9tZVwiKSAhPSAtMSAmJiBzZXJ2aWNlLnRleHQuaW5kZXhPZihcIi9tZS9cIikgPT0gLTEgJiYgc2VydmljZS50ZXh0LmluZGV4T2YoXCIvbWVtYmVyT2ZcIikgPT0gLTEpIHtcclxuICAgICAgICAgICAgc2VydmljZS50ZXh0ID0gc2VydmljZS50ZXh0LnJlcGxhY2UoXCIvbWVcIiwgXCJcIikgKyBcIi91c2Vycy9cIiArIGFyZ3Muc3Vic3RyKDEpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICAgICAvLyBpZiB0eXBlIGV4aXN0c1xyXG4gICAgICAgICAgICB2YXIgaW5kZXggPSBib2R5LmluZGV4T2YoYXJncy5zdWJzdHIoMSkpO1xyXG4gICAgICAgICAgICB2YXIgdHlwZUluZGV4ID0gYm9keS5sYXN0SW5kZXhPZignQG9kYXRhLnR5cGUnLCBpbmRleCk7XHJcbiAgICAgICAgICAgIGlmICh0eXBlSW5kZXggIT0gLTEpIHtcclxuICAgICAgICAgICAgICAgIHZhciB0eXBlSW5kZXhFbmQgPSBib2R5LmluZGV4T2YoXCJcXG5cIiwgdHlwZUluZGV4KTtcclxuICAgICAgICAgICAgICAgIHZhciB0eXBlID0gYm9keS5zdWJzdHIodHlwZUluZGV4LCB0eXBlSW5kZXhFbmQgLSB0eXBlSW5kZXgpO1xyXG4gICAgICAgICAgICAgICAgdHlwZSA9IHR5cGUucmVwbGFjZShcIkBvZGF0YS50eXBlXFxcIjogXFxcIiNtaWNyb3NvZnQuZ3JhcGguXCIsIFwiXCIpO1xyXG4gICAgICAgICAgICAgICAgdHlwZSA9IHR5cGUucmVwbGFjZShcIlxcXCJcIiwgXCJcIikucmVwbGFjZShcIixcIiwgXCJcIik7XHJcbiAgICAgICAgICAgICAgICBzZXJ2aWNlLnRleHQgPSBcImh0dHBzOi8vZ3JhcGgubWljcm9zb2Z0LmNvbS92MS4wL1wiICsgdHlwZSArIFwicy9cIiArIGFyZ3Muc3Vic3RyKDEpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgaWYgKHNlcnZpY2UudGV4dC5pbmRleE9mKFwiP1wiKSAhPSAtMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHNlcnZpY2UudGV4dCA9IHNlcnZpY2UudGV4dC5zdWJzdHIoMCwgc2VydmljZS50ZXh0LmluZGV4T2YoXCI/XCIpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHNlcnZpY2UudGV4dCA9IHNlcnZpY2UudGV4dCArIFwiL1wiICsgYXJncy5zdWJzdHIoMSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIHNlcnZpY2UudGV4dCA9IGFyZ3MucmVwbGFjZShcIlxcXCJcIiwgXCJcIik7XHJcbiAgICB9XHJcbiAgICAvLyRzY29wZS5zZWxlY3RlZE9wdGlvbnMgPSAnR0VUJztcclxuICAgIGlmKHNlcnZpY2UudGV4dCAmJiBzZXJ2aWNlLnRleHQuY2hhckF0KHNlcnZpY2UudGV4dC5sZW5ndGgtMSkgIT0gJy8nKXtcclxuICAgICAgICAgICAgICAgIHNlcnZpY2UudGV4dCArPSAnLyc7XHJcbiAgICB9XHJcbiAgICAkc2NvcGUuc3VibWl0KHNlcnZpY2UudGV4dCk7XHJcbn0iLCIvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuLy8gIENvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiAgQWxsIFJpZ2h0cyBSZXNlcnZlZC4gIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gIFNlZSBMaWNlbnNlIGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXHJcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cclxuaGVsbG8uaW5pdCh7XHJcblx0bXNmdDoge1xyXG5cdFx0b2F1dGg6IHtcclxuXHRcdFx0dmVyc2lvbjogMixcclxuXHRcdFx0YXV0aDogJ2h0dHBzOi8vbG9naW4ubWljcm9zb2Z0b25saW5lLmNvbS9jb21tb24vb2F1dGgyL3YyLjAvYXV0aG9yaXplJyxcclxuXHRcdFx0Z3JhbnQ6ICdodHRwczovL2xvZ2luLm1pY3Jvc29mdG9ubGluZS5jb20vY29tbW9uL29hdXRoMi92Mi4wL3Rva2VuJ1xyXG5cdFx0fSxcclxuXHRcdHNjb3BlX2RlbGltOiAnICcsXHJcblxyXG5cdFx0Ly8gRG9uJ3QgZXZlbiB0cnkgc3VibWl0dGluZyB2aWEgZm9ybS5cclxuXHRcdC8vIFRoaXMgbWVhbnMgbm8gUE9TVCBvcGVyYXRpb25zIGluIDw9SUU5XHJcblx0XHRmb3JtOiBmYWxzZVxyXG5cdH0sIG1zZnRfYWRtaW5fY29uc2VudDoge1xyXG5cdFx0b2F1dGg6IHtcclxuXHRcdFx0dmVyc2lvbjogMixcclxuXHRcdFx0YXV0aDogJ2h0dHBzOi8vbG9naW4ubWljcm9zb2Z0b25saW5lLmNvbS9jb21tb24vYWRtaW5jb25zZW50JyxcclxuXHRcdFx0Z3JhbnQ6ICdodHRwczovL2xvZ2luLm1pY3Jvc29mdG9ubGluZS5jb20vY29tbW9uL29hdXRoMi92Mi4wL3Rva2VuJ1xyXG5cdFx0fSxcclxuXHRcdHNjb3BlX2RlbGltOiAnICcsXHJcblxyXG5cdFx0Ly8gRG9uJ3QgZXZlbiB0cnkgc3VibWl0dGluZyB2aWEgZm9ybS5cclxuXHRcdC8vIFRoaXMgbWVhbnMgbm8gUE9TVCBvcGVyYXRpb25zIGluIDw9SUU5XHJcblx0XHRmb3JtOiBmYWxzZVxyXG5cdH0sIG1zZnRfdG9rZW5fcmVmcmVzaDoge1xyXG5cdFx0b2F1dGg6IHtcclxuXHRcdFx0dmVyc2lvbjogMixcclxuXHRcdFx0YXV0aDogJ2h0dHBzOi8vbG9naW4ubWljcm9zb2Z0b25saW5lLmNvbS9jb21tb24vb2F1dGgyL3YyLjAvYXV0aG9yaXplJyxcclxuXHRcdFx0Z3JhbnQ6ICdodHRwczovL2xvZ2luLm1pY3Jvc29mdG9ubGluZS5jb20vY29tbW9uL29hdXRoMi92Mi4wL3Rva2VuJ1xyXG5cdFx0fSxcclxuXHRcdHNjb3BlX2RlbGltOiAnICcsXHJcblxyXG5cdFx0Ly8gRG9uJ3QgZXZlbiB0cnkgc3VibWl0dGluZyB2aWEgZm9ybS5cclxuXHRcdC8vIFRoaXMgbWVhbnMgbm8gUE9TVCBvcGVyYXRpb25zIGluIDw9SUU5XHJcblx0XHRmb3JtOiBmYWxzZVxyXG5cdH1cclxufSk7IiwidmFyIHBvc3RUZW1wbGF0ZXMgPSB7XHJcbiAgICBtZXNzYWdlczoge1xyXG4gICAgICAgIFwic3ViamVjdFwiOiBcIk1lZXQgZm9yIGx1bmNoP1wiLFxyXG4gICAgICAgIFwiYm9keVwiOiB7XHJcbiAgICAgICAgICAgIFwiY29udGVudFR5cGVcIjogXCJUZXh0XCIsXHJcbiAgICAgICAgICAgIFwiY29udGVudFwiOiBcIlRoZSBuZXcgY2FmZXRlcmlhIGlzIG9wZW4uXCJcclxuICAgICAgICB9LFxyXG4gICAgICAgIFwidG9SZWNpcGllbnRzXCI6IFtcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgXCJlbWFpbEFkZHJlc3NcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJhZGRyZXNzXCI6IFwiZ2FydGhmQGNvbnRvc28uY29tXCJcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIF1cclxuICAgIH0sXHJcbiAgICBldmVudHM6IHtcclxuICAgICAgICBcInN1YmplY3RcIjogXCJNeSBldmVudFwiLFxyXG4gICAgICAgIFwic3RhcnRcIjoge1xyXG4gICAgICAgICAgICBcImRhdGVUaW1lXCI6IFwiMjAxNy0wNS0wN1QxNjoxNTowMC4wMDAwMDAwXCIsXHJcbiAgICAgICAgICAgIFwidGltZVpvbmVcIjogXCJVVENcIlxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXCJlbmRcIjoge1xyXG4gICAgICAgICAgICBcImRhdGVUaW1lXCI6IFwiMjAxNy0wNi0wN1QxNjoxNTowMC4wMDAwMDAwXCIsXHJcbiAgICAgICAgICAgIFwidGltZVpvbmVcIjogXCJVVENcIlxyXG4gICAgICAgIH0sXHJcbiAgICB9LFxyXG5cclxuICAgIHNlbmRNYWlsOiB7XHJcbiAgICAgICAgXCJtZXNzYWdlXCI6IHtcclxuICAgICAgICAgICAgXCJzdWJqZWN0XCI6IFwiTWVldCBmb3IgbHVuY2g/XCIsXHJcbiAgICAgICAgICAgIFwiYm9keVwiOiB7XHJcbiAgICAgICAgICAgICAgICBcImNvbnRlbnRUeXBlXCI6IFwiVGV4dFwiLFxyXG4gICAgICAgICAgICAgICAgXCJjb250ZW50XCI6IFwiVGhlIG5ldyBjYWZldGVyaWEgaXMgb3Blbi5cIlxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcInRvUmVjaXBpZW50c1wiOiBbXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgXCJlbWFpbEFkZHJlc3NcIjoge1xyXG4gICAgICAgICAgICAgICAgICAgIFwiYWRkcmVzc1wiOiBcImdhcnRoZkBjb250b3NvLmNvbVwiXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBdXHJcbiAgICAgICAgfSxcclxuICAgICAgICBcInNhdmVUb1NlbnRJdGVtc1wiOiBcImZhbHNlXCJcclxuICAgIH0sXHJcbiAgICBmaW5kTWVldGluZ1RpbWVzOiB7XHJcbiAgICAgICAgXCJhdHRlbmRlZXNcIjogW3tcclxuICAgICAgICAgICAgXCJlbWFpbEFkZHJlc3NcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJhZGRyZXNzXCI6IFwiQWxleERAbWljcm9zb2Z0LmNvbVwiLFxyXG4gICAgICAgICAgICAgICAgXCJuYW1lXCI6IFwiQWxleCBEYXJyb3dcIlxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcInR5cGVcIjogXCJSZXF1aXJlZFwiXHJcbiAgICAgICAgfSwge1xyXG4gICAgICAgICAgICBcImVtYWlsQWRkcmVzc1wiOiB7XHJcbiAgICAgICAgICAgICAgICBcImFkZHJlc3NcIjogXCJHYXJ0aEZAaW1nZWVrLm9ubWljcm9zb2Z0LmNvbVwiLFxyXG4gICAgICAgICAgICAgICAgXCJuYW1lXCI6IFwiR2FydGggRm9ydFwiXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwidHlwZVwiOiBcIlJlcXVpcmVkXCJcclxuICAgICAgICB9XSxcclxuICAgICAgICBcInRpbWVDb25zdHJhaW50XCI6IHtcclxuICAgICAgICAgICAgXCJ0aW1lc2xvdHNcIjogW3tcclxuICAgICAgICAgICAgICAgIFwic3RhcnRcIjoge1xyXG4gICAgICAgICAgICAgICAgICAgIFwiZGF0ZVwiOiBcIjIwMTYtMDQtMThcIixcclxuICAgICAgICAgICAgICAgICAgICBcInRpbWVcIjogXCI5OjAwOjAwXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJ0aW1lWm9uZVwiOiBcIlBhY2lmaWMgU3RhbmRhcmQgVGltZVwiXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgXCJlbmRcIjoge1xyXG4gICAgICAgICAgICAgICAgICAgIFwiZGF0ZVwiOiBcIjIwMTYtMDQtMThcIixcclxuICAgICAgICAgICAgICAgICAgICBcInRpbWVcIjogXCIxODowMDowMFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwidGltZVpvbmVcIjogXCJQYWNpZmljIFN0YW5kYXJkIFRpbWVcIlxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXCJsb2NhdGlvbkNvbnN0cmFpbnRcIjogW3tcclxuICAgICAgICAgICAgXCJpc1JlcXVpcmVkXCI6IFwiZmFsc2VcIixcclxuICAgICAgICAgICAgXCJzdWdnZXN0TG9jYXRpb25cIjogXCJ0cnVlXCIsXHJcbiAgICAgICAgICAgIFwibG9jYXRpb25zXCI6IFt7XHJcbiAgICAgICAgICAgICAgICBcImRpc3BsYXlOYW1lXCI6IFwiQ29uZiBSb29tIDMyLzEzNjhcIixcclxuICAgICAgICAgICAgICAgIFwibG9jYXRpb25FbWFpbEFkZHJlc3NcIjogXCJjb25mMzJyb29tMTM2OEBpbWdlZWsub25taWNyb3NvZnQuY29tXCJcclxuICAgICAgICAgICAgfV1cclxuICAgICAgICB9XSxcclxuICAgICAgICBcIm1lZXRpbmdEdXJhdGlvblwiOiBcIlBUMUhcIlxyXG4gICAgfSxcclxuICAgIHVzZXJzOiB7XHJcbiAgICAgICAgXCJhY2NvdW50RW5hYmxlZFwiOiB0cnVlLFxyXG4gICAgICAgIFwiY2l0eVwiOiBcIlNlYXR0bGVcIixcclxuICAgICAgICBcImNvdW50cnlcIjogXCJVbml0ZWQgU3RhdGVzXCIsXHJcbiAgICAgICAgXCJkZXBhcnRtZW50XCI6IFwiU2FsZXMgJiBNYXJrZXRpbmdcIixcclxuICAgICAgICBcImRpc3BsYXlOYW1lXCI6IFwiTWVsaXNzYSBEYXJyb3dcIixcclxuICAgICAgICBcImdpdmVuTmFtZVwiOiBcIk1lbGlzc2FcIixcclxuICAgICAgICBcImpvYlRpdGxlXCI6IFwiTWFya2V0aW5nIERpcmVjdG9yXCIsXHJcbiAgICAgICAgXCJtYWlsTmlja25hbWVcIjogXCJNZWxpc3NhRFwiLFxyXG4gICAgICAgIFwicGFzc3dvcmRQb2xpY2llc1wiOiBcIkRpc2FibGVQYXNzd29yZEV4cGlyYXRpb25cIixcclxuICAgICAgICBcInBhc3N3b3JkUHJvZmlsZVwiOiB7XHJcbiAgICAgICAgICAgIFwicGFzc3dvcmRcIjogXCJUZXN0MTIzNFwiLFxyXG4gICAgICAgICAgICBcImZvcmNlQ2hhbmdlUGFzc3dvcmROZXh0U2lnbkluXCI6IGZhbHNlXHJcbiAgICAgICAgfSxcclxuICAgICAgICBcIm9mZmljZUxvY2F0aW9uXCI6IFwiMTMxLzExMDVcIixcclxuICAgICAgICBcInBvc3RhbENvZGVcIjogXCI5ODA1MlwiLFxyXG4gICAgICAgIFwicHJlZmVycmVkTGFuZ3VhZ2VcIjogXCJlbi1VU1wiLFxyXG4gICAgICAgIFwic3RhdGVcIjogXCJXQVwiLFxyXG4gICAgICAgIFwic3RyZWV0QWRkcmVzc1wiOiBcIjkyNTYgVG93bmUgQ2VudGVyIERyLiwgU3VpdGUgNDAwXCIsXHJcbiAgICAgICAgXCJzdXJuYW1lXCI6IFwiRGFycm93XCIsXHJcbiAgICAgICAgXCJtb2JpbGVQaG9uZVwiOiBcIisxIDIwNiA1NTUgMDExMFwiLFxyXG4gICAgICAgIFwidXNhZ2VMb2NhdGlvblwiOiBcIlVTXCIsXHJcbiAgICAgICAgXCJ1c2VyUHJpbmNpcGFsTmFtZVwiOiBcIk1lbGlzc2FEQEFVVEhFTlRJQ0FURURfRE9NQUlOXCIsXHJcbiAgICB9LFxyXG4gICAgZ3JvdXBzOiB7XHJcbiAgICAgICAgXCJAb2RhdGEudHlwZVwiOiBcIiNNaWNyb3NvZnQuR3JhcGguR3JvdXBcIixcclxuICAgICAgICBcImRlc2NyaXB0aW9uXCI6IFwiVGhpcyBncm91cCBpcyB0aGUgYmVzdCBldmVyXCIsXHJcbiAgICAgICAgXCJkaXNwbGF5TmFtZVwiOiBcIlVuaWZpZWQgZ3JvdXAgM2VmMTVcIixcclxuICAgICAgICBcImdyb3VwVHlwZXNcIjogW1xyXG4gICAgICAgICAgICBcIlVuaWZpZWRcIlxyXG4gICAgICAgIF0sXHJcbiAgICAgICAgXCJtYWlsRW5hYmxlZFwiOiB0cnVlLFxyXG4gICAgICAgIFwibWFpbE5pY2tuYW1lXCI6IFwiR3JvdXA5MTFlNVwiLFxyXG4gICAgICAgIFwic2VjdXJpdHlFbmFibGVkXCI6IHRydWVcclxuICAgIH1cclxufVxyXG5cclxudmFyIHRlbXBsYXRlTmFtZXMgPSB7XHJcbiAgICBtZXNzYWdlczogJ21lc3NhZ2UnLFxyXG4gICAgZXZlbnRzOiAnZXZlbnQnLFxyXG4gICAgc2VuZE1haWw6ICdlbWFpbCdcclxufSIsImZ1bmN0aW9uIGNyZWF0ZVNoYXJlTGluayhmdWxsUmVxdWVzdFVybCwgYWN0aW9uLCB2ZXJzaW9uKSB7ICAgIFxyXG4gICAgcmV0dXJuIHdpbmRvdy5sb2NhdGlvbi5vcmlnaW4gKyB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUgKyBcIj9yZXF1ZXN0PVwiICsgZXh0cmFjdEdyYXBoRW5kcG9pbnQoZnVsbFJlcXVlc3RVcmwpICsgXCImbWV0aG9kPVwiICsgYWN0aW9uICsgXCImdmVyc2lvbj1cIiArIHZlcnNpb247XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGV4dHJhY3RHcmFwaEVuZHBvaW50KGZ1bGxSZXF1ZXN0VXJsKSB7XHJcbiAgICByZXF1ZXN0VXJsID0gZnVsbFJlcXVlc3RVcmwuc3BsaXQoJy5jb20nKVxyXG4gICAgcmVxdWVzdFVybC5zaGlmdCgpO1xyXG4gICAgXHJcbiAgICB2YXIgcmVxdWVzdFVybENvbXBvbmVudHMgPSByZXF1ZXN0VXJsWzBdLnNwbGl0KCcvJyk7XHJcbiAgICByZXF1ZXN0VXJsQ29tcG9uZW50cy5zaGlmdCgpOyAvL3JlbW92ZSBlbXB0eSBpdGVtXHJcbiAgICByZXF1ZXN0VXJsQ29tcG9uZW50cy5zaGlmdCgpOyAvL3JlbW92ZSB2ZXJzaW9uXHJcbiAgICByZXR1cm4gKHJlcXVlc3RVcmxDb21wb25lbnRzLmpvaW4oJy8nKSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGlzUG9zdE9yUGF0Y2gob3B0aW9uKSB7XHJcbiAgICByZXR1cm4gIG9wdGlvbiA9PSBcIlBPU1RcIiB8fCBvcHRpb24gPT0gXCJQQVRDSFwiO1xyXG59XHJcblxyXG5mdW5jdGlvbiBTaGFyZURpYWxvZ0NvbnRyb2xsZXIoJHNjb3BlLCAkbWREaWFsb2csIGFwaVNlcnZpY2UsICRzY2UsIGhlYWRlcnMsIGJvZHkpIHtcclxuICAgIHZhciBfYXBpU2VydmljZSA9IGFwaVNlcnZpY2U7XHJcbiAgICAkc2NvcGUuaGlkZSA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICRtZERpYWxvZy5oaWRlKCk7XHJcbiAgICB9O1xyXG5cclxuICAgICRzY29wZS5jYW5jZWwgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAkbWREaWFsb2cuY2FuY2VsKCk7XHJcbiAgICB9O1xyXG4gICAgXHJcbiAgICAkc2NvcGUuZ2V0U2hhcmVMaW5rID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgdmFyIHJlcXVlc3RVcmwgPSAkc2NvcGUuZ2V0UmF3U2VhcmNoVGV4dCgpO1xyXG4gICAgICAgIHJldHVybiBjcmVhdGVTaGFyZUxpbmsocmVxdWVzdFVybCwgX2FwaVNlcnZpY2Uuc2VsZWN0ZWRPcHRpb24sIF9hcGlTZXJ2aWNlLnNlbGVjdGVkVmVyc2lvbik7XHJcbiAgICB9XHJcblxyXG4gICAgJHNjb3BlLmdlbmVyYXRlU3VwZXJBZ2VudENvZGUgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICB2YXIgcmVxdWVzdFVybCA9ICRzY29wZS5nZXRSYXdTZWFyY2hUZXh0KCk7XHJcblxyXG4gICAgICAgIHZhciBmdWxsR3JhcGhVcmwgPSBcImh0dHBzOi8vZ3JhcGgubWljcm9zb2Z0LmNvbS9cIiArIF9hcGlTZXJ2aWNlLnNlbGVjdGVkVmVyc2lvbiArIFwiL1wiICsgZXh0cmFjdEdyYXBoRW5kcG9pbnQocmVxdWVzdFVybCk7XHJcblxyXG4gICAgICAgIHZhciB0YWIgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgcmV0dXJuIFwiPHNwYW4gc3R5bGU9J3BhZGRpbmctbGVmdDoxNXB4Jz48L3NwYW4+XCI7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB2YXIgbGluZSA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gXCI8YnI+XCJcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHZhciBzdHIgPSBcInJlcXVlc3RcIjtcclxuICAgICAgICBzdHIgKz0gbGluZSgpICsgdGFiKCkgKyBcIi5cIiArIF9hcGlTZXJ2aWNlLnNlbGVjdGVkT3B0aW9uLnRvTG9jYWxlTG93ZXJDYXNlKCkgKyBcIihcXFwiXCIgKyBmdWxsR3JhcGhVcmwgKyBcIlxcXCIpXCJcclxuXHJcbiAgICAgICAgaWYgKE9iamVjdC5rZXlzKGhlYWRlcnMpLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgc3RyICs9IGxpbmUoKSArIHRhYigpICsgXCIuc2V0KFwiICsgSlNPTi5zdHJpbmdpZnkoaGVhZGVycykgKyBcIilcIjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChpc1Bvc3RPclBhdGNoKCBfYXBpU2VydmljZS5zZWxlY3RlZE9wdGlvbikpIHtcclxuICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgIHZhciBib2R5T2JqID0gSlNPTi5wYXJzZShib2R5KTtcclxuICAgICAgICAgICAgICAgIGlmIChib2R5T2JqKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3RyICs9IGxpbmUoKSArIHRhYigpICsgXCIuc2VuZChcIiArIEpTT04uc3RyaW5naWZ5KGJvZHlPYmopICsgXCIpXCI7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gY2F0Y2goZSkge1xyXG5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuIFxyXG4gICAgICAgIHN0ciArPSBsaW5lKCkgKyB0YWIoKSArIFwiLmVuZChmdW5jdGlvbihlcnIsIHJlcykge1wiXHJcbiAgICAgICAgc3RyICs9IGxpbmUoKSArIHRhYigpICsgdGFiKCkgKyBcImNvbnNvbGUubG9nKHJlcyk7XCJcclxuICAgICAgICBzdHIgKz0gbGluZSgpICsgdGFiKCkgKyBcIn0pO1wiXHJcbiAgICAgICAgcmV0dXJuICRzY2UudHJ1c3RBc0h0bWwoc3RyKTtcclxuICAgIH1cclxufSJdfQ==
