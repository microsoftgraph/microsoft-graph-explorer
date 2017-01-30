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
function showDuration($scope, startTime) {
    var endTime = new Date();
    $scope.duration = (endTime.getTime() - startTime.getTime());
    $scope.requestInProgress = false;
}
function insertHeadersIntoResponseViewer($scope, headers, status) {
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
function getRequestBodyEditor() {
    var requestBodyEditorElement = document.getElementById("jsonEditor");
    return ace.edit(requestBodyEditorElement);
}
function getJsonViewer() {
    var jsonViewerElement = document.getElementById("jsonViewer");
    return ace.edit(jsonViewerElement);
}
function showResults($scope, results, headers, status, responseContentType) {
    getJsonViewer().setValue("");
    insertHeadersIntoResponseViewer($scope, headers, status);
    getJsonViewer().getSession().insert(0, results);
    if (responseContentType)
        getJsonViewer().getSession().setMode("ace/mode/" + responseContentType);
}
function handleImageResponse($scope, apiService, startTime, headers, status, handleUnsuccessfulQueryResponse) {
    apiService.performQuery('GET_BINARY')($scope.text).then(function (result) {
        var blob = new Blob([result.data], { type: "image/jpeg" });
        var imageUrl = window.URL.createObjectURL(blob);
        var imageResultViewer = document.getElementById("img");
        imageResultViewer.src = imageUrl;
        $scope.showImage = true;
        insertHeadersIntoResponseViewer($scope, result.headers, result.status);
        showDuration($scope, startTime);
    }, handleUnsuccessfulQueryResponse);
}
function handleHtmlResponse($scope, startTime, results, headers, status) {
    showDuration($scope, startTime);
    showResults($scope, results, headers, status, "html");
}
function handleJsonResponse($scope, startTime, results, headers, status) {
    results = JSON.stringify(results, null, 4);
    showDuration($scope, startTime);
    showResults($scope, results, headers, status, "json");
}
function handleXmlResponse($scope, startTime, results, headers, status) {
    results = formatXml(results);
    showDuration($scope, startTime);
    showResults($scope, results, headers, status, "xml");
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
    if (!$scope.jsonEditorHeaders)
        return;
    $scope.jsonEditorHeaders.getSession().setValue("");
    var requestHeaders = "Content-Type: application/json";
    $scope.jsonEditorHeaders.getSession().insert(0, requestHeaders);
}
function getEntityTypes(metadata) {
    var entities = {};
    var entityTypes = $(($.parseHTML(metadata))[1]).find("EntityType");
    jQuery.extend(entities, createEntityTypeObject(entityTypes));
    var complexTypes = $(($.parseHTML(metadata))[1]).find("ComplexType");
    jQuery.extend(entities, createEntityTypeObject(complexTypes));
    return entities;
}
function myTrim(word) {
    var returnWord = word;
    if (returnWord != null) {
        while (returnWord.charAt(returnWord.length - 1) == "/") {
            returnWord = returnWord.replace(/\/$/, "");
        }
        return returnWord;
    }
}
function getEntityName(URL) {
    var returnWord = myTrim(URL);
    if (returnWord != null) {
        returnWord = returnWord.substring(returnWord.lastIndexOf("/") + 1, returnWord.length);
    }
    return returnWord;
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
                var node = entityContainerData[segment];
                graph.push(node);
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
function getUrlsFromServiceURL(service, lastCallSuccessful) {
    var graphFromServiceUrl = constructGraphLinksFromServicePath(service);
    if (graphFromServiceUrl.length > 0) {
        var lastNode = graphFromServiceUrl.pop();
        if (lastNode.isACollection)
            return [];
        var entity = getEntityFromTypeName(service, lastNode.type);
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
        initializeJsonEditor(s);
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
function parseMetadata(service, $scope) {
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
            if (service.entity == "") {
                service.entity = entityTypeData["user"];
            }
            else {
                service.entity = entityTypeData[getEntityName(service.text)];
            }
            $scope.$root.$broadcast("updateUrlOptions");
        }, function (err, status) {
            console.error("metadata could not be parsed");
        });
    }
    else {
        $scope.$root.$broadcast("updateUrlOptions");
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

            showJsonEditor: false,

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
// This is a generated file from bundleLocFiles.js 

var loc_strings = {};

loc_strings['en-US'] = {"To try the explorer, please ":"To try the explorer, please ","sign in":"sign in"," with your work or school account from Microsoft.":" with your work or school account from Microsoft.","Submit":"Submit","Using demo tenant":"Using demo tenant","sign out":"sign out","History":"History","Method":"Method","Query":"Query","Status Code":"Status Code","Duration":"Duration","Go":"Go","YES":"YES","NO":"NO","request header":"request header","request body":"request body","response":"response","login_to_send_requests":"Login to change the request type"}

loc_strings['fr-FR'] = {"To try the explorer, please ":"Pour essayer l’afficheur, veuillez ","sign in":"se connecter"," with your work or school account from Microsoft.":" avec votre compte scolaire ou professionnel de Microsoft.","Submit":"Envoyer","Using demo tenant":"À l’aide du client de démonstration","sign out":"se déconnecter","History":"Historique","Method":"Méthode","Query":"Requête","Status Code":"Code d'état","Duration":"Durée","Go":"Rechercher","YES":"OUI","NO":"NON","request header":"en-tête de la demande","request body":"corps de la demande","response":"réponse"}

loc_strings['es-ES'] = {"To try the explorer, please ":"Para utilizar el probador, ","sign in":"iniciar sesión"," with your work or school account from Microsoft.":" con su cuenta profesional o educativa de Microsoft.","Submit":"Enviar","Using demo tenant":"Uso de inquilinos de demostración","sign out":"cerrar sesión","History":"Historial","Method":"Método","Query":"Consulta","Status Code":"Código de estado","Duration":"Duración","Go":"Ir","YES":"SÍ","NO":"NO","request header":"encabezado de solicitud","request body":"cuerpo de solicitud","response":"respuesta"}

loc_strings['ja-JP'] = {"To try the explorer, please ":"エクスプローラーをお試しいただくには、Microsoft の職場または学校アカウントで ","sign in":"サインイン"," with your work or school account from Microsoft.":" します。","Submit":"送信","Using demo tenant":"デモ テナントを使用しています","sign out":"サインアウト","History":"履歴","Method":"メソッド","Query":"クエリ","Status Code":"状態コード","Duration":"期間","Go":"検索","YES":"はい","NO":"いいえ","request header":"要求ヘッダー","request body":"要求本文","response":"応答"}

loc_strings['de-DE'] = {"To try the explorer, please ":"Um den Tester auszuprobieren, ","sign in":"Anmelden"," with your work or school account from Microsoft.":" mit Ihrem Geschäfts- oder Schulkonto von Microsoft an.","Submit":"Senden","Using demo tenant":"Verwenden des Demomandanten","sign out":"Abmelden","History":"Verlauf","Method":"Methode","Query":"Abfrage","Status Code":"Statuscode","Duration":"Dauer","Go":"OK","YES":"JA","NO":"NEIN","request header":"Anforderungsheader","request body":"Anforderungstextkörper","response":"Antwort"}

loc_strings['zh-CN'] = {"To try the explorer, please ":"若要尝试浏览器，请 使用你的 Microsoft 工作或学校帐户","sign in":"登录"," with your work or school account from Microsoft.":"。","Submit":"提交","Using demo tenant":"使用演示租户","sign out":"注销","History":"历史记录","Method":"方法","Query":"查询","Status Code":"状态代码","Duration":"持续时间","Go":"转到","YES":"是","NO":"否","request header":"请求标题","request body":"请求正文","response":"响应"}

loc_strings['pt-BR'] = {"To try the explorer, please ":"Para experimentar o Explorador, ","sign in":"entrar"," with your work or school account from Microsoft.":" com a sua conta corporativa ou de estudante da Microsoft.","Submit":"Enviar","Using demo tenant":"Usando o Locatário de Demonstração","sign out":"sair","History":"Histórico","Method":"Método","Query":"Consulta","Status Code":"Código de Status","Duration":"Duração","Go":"Ir","YES":"SIM","NO":"NÃO","request header":"cabeçalho da solicitação","request body":"corpo da solicitação","response":"resposta"}

loc_strings['ru-RU'] = {"To try the explorer, please ":"Чтобы опробовать песочницу, ","sign in":"войти"," with your work or school account from Microsoft.":" с помощью рабочей или учебной учетной записи от корпорации Майкрософт.","Submit":"Отправить","Using demo tenant":"С помощью демонстрационного клиента","sign out":"выйти","History":"Журнал","Method":"Метод","Query":"Запрос","Status Code":"Код состояния","Duration":"Длительность","Go":"Перейти","YES":"ДА","NO":"НЕТ","request header":"заголовок запроса","request body":"текст запроса","response":"ответ"}
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
        
        $scope.tabConfig = {
            disableRequestBodyEditor: true,
            hideContent: true,
            selected: 0
        }
        $scope.showImage = false;

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

        $scope.$watch("getEditor()", function(event, args) {
            initializeJsonEditor($scope, bodyVal);
        });

        // https://docs.microsoft.com/en-us/azure/active-directory/active-directory-v2-protocols-implicit
        $scope.login = function () {
            hello('msft').login({
                display: 'page',
                response_type: "id_token token",
                nonce: 'graph_explorer',
                prompt: 'login',
                msafed: 0
            }, function(res) {

            }, function() {
                console.error('error signing in');
            });
        };

        $scope.logout = function () {
            // change to GET and show request header tab
            apiService.selectedOption = "GET";
            $scope.tabConfig.disableRequestBodyEditor = true;
            setSelectedTab(0);

            hello('msft').logout(null, {force:true});
            delete $scope.userInfo;
        };

        $scope.isActive = function (viewLocation) {
            return viewLocation === $location.path();
        };

        $scope.searchText = "";
        $scope.setSearchText = function(text) {
            $scope.searchText = text;
        }

        $scope.getSearchText = function() {
            return $scope.searchText;
        }


        $scope.getCurrentEntityName = function() {
            if (!$scope.searchText) return null;
            
            var txt = $scope.searchText;
            var pathArr = txt.split("/").filter((function(a) { return a.length > 0}));

            return pathArr.pop();
        }

        $scope.canInsertTemplate = function() {
            return apiService.selectedOption == "POST" && checkCanInsertTemplate($scope.searchText);
        }

        $scope.insertPostTemplate = function() {
            var entity = $scope.getCurrentEntityName();
            var strToInsert = JSON.stringify(postTemplates[entity], null, 2).trim();

            var fullUserEmail = $scope.userInfo.preferred_username;
            var domain = fullUserEmail.split("@")[1];

            strToInsert = strToInsert.replace(/AUTHENTICATED_DOMAIN/g, domain);
            strToInsert = strToInsert.replace(/FULL_USER_EMAIL/g, fullUserEmail);
            

            initializeJsonEditor($scope, strToInsert);
        }

        function checkCanInsertTemplate(URL) {s
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
                    body: getJsonViewer().getSession().getValue()
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
        $scope.items = [
            'beta',
            'v1.0'
        ];

        $scope.getServiceVersion = function() {
            return apiService.selectedVersion;
        }

        $scope.onItemClick = function(choice) {
            apiService.selectedVersion = choice;
        }   
}]);

angular.module('ApiExplorer').controller('datalistCtrl', ['$scope', 'ApiExplorerSvc', function ($scope, apiService) {

    $scope.searchTextChange = function(searchText) {
        $scope.$parent.setSearchText(searchText);

        apiService.text = searchText;
    }

    $scope.getRequestHistory = function() {
        return requestHistory;
    }

    $scope.getServiceVersion = function() {
        return apiService.selectedVersion;
    }

    $scope.$on('updateUrlFromServiceText', function(event, data) {
        $scope.text = apiService.text;
    });
    
    $scope.$watch("getServiceVersion()", function(newVal, oldVal) {
        if (oldVal !== newVal) {
            if ($scope.$parent.searchText) {
                $scope.searchTextChange($scope.$parent.searchText.replace(/https:\/\/graph.microsoft.com($|\/([\w]|\.)*($|\/))/, ("https://graph.microsoft.com/" + apiService.selectedVersion + "/")));
                $scope.text = apiService.text;
            }
            parseMetadata(apiService, $scope);
        }
    });

    $scope.searchTextChange(apiService.text);

    $scope.getMatches = function(query) {
        var urls = getUrlsFromServiceURL(apiService)
        return urls.filter(function(option) {
            var queryInOption = (option.indexOf(query)>-1);
            var queryIsEmpty = (getEntityName(query).length == 0);

            return queryIsEmpty || queryInOption;
        });
    }

    if (window.runTests)
         runAutoCompleteTests(apiService);

}]);


angular.module('ApiExplorer').controller('FormCtrl', ['$scope', 'ApiExplorerSvc', function ($scope, apiService) {
    $scope.requestInProgress = false;
    $scope.insufficientPrivileges = false;

    if (hello('msft').getAuthResponse() != null && 
        (apiService.selectedOption === 'POST' || apiService.selectedOption === 'PATCH')) {
            showRequestBodyEditor();
    } else {
        setSelectedTab(0);
    }

    $scope.getText = function() {
        return apiService.text;
    }
 
    // custom link re-routing logic to resolve links
    $scope.$parent.$on("urlChange", function (event, args) {
        msGraphLinkResolution($scope, getJsonViewer().getSession().getValue(), args, apiService);
    });

    // function called when link in the back button history is clicked
    $scope.historyOnClick = function(historyItem) {
        $scope.text = historyItem.urlText;
        apiService.selectedVersion = historyItem.selectedVersion;
        apiService.selectedOption = historyItem.htmlOption;

        if (historyItem.htmlOption == 'POST' || historyItem.htmlOption == 'PATCH') {
            if (getJsonViewer()) {
                getJsonViewer().getSession().setValue(historyItem.jsonInput);
            } else {
                console.error("json editor watch event not firing");
            }
        } else {
            //clear jsonEditor
            if (getJsonViewer()) {
                getJsonViewer().getSession().setValue("");
            }

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
            historyObj.jsonInput = getRequestBodyEditor().getSession().getValue();
        }

        $scope.showImage = false;

        var postBody = "";
        if (getRequestBodyEditor() != undefined) {
            postBody = getRequestBodyEditor().getSession().getValue();
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
            var resultBody = result.data;

            if (isImageResponse(headers)) {
                handleImageResponse($scope, apiService, startTime, headers, status, handleUnsuccessfulQueryResponse);
            } else if (isHtmlResponse(headers)) {
                handleHtmlResponse($scope, startTime, resultBody, headers, status);
            } else if (isXmlResponse(result)) {
                handleXmlResponse($scope, startTime, resultBody, headers, status);
            } else {
                handleJsonResponse($scope, startTime, resultBody, headers, status);
            }

            saveHistoryObject(historyObj, status, new Date() - startTime);


            $scope.insufficientPrivileges = false;
        }

        function handleUnsuccessfulQueryResponse(result) {
            var status = result.status;
            var headers = result.headers;
            handleJsonResponse($scope, startTime, result.data, headers, status);
            saveHistoryObject(historyObj, status, new Date() - startTime);

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
    var jsonEditor = getRequestBodyEditor();
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
        return;
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
    $(document).ready(function () {
    
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
    });
}

function setJsonViewerContentType(mode) {
    $(document).ready(function () {
        jsonViewer.getSession().setMode("ace/mode/" + mode);
    });
}
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
    $scope.submit(service.text);
}
//# sourceMappingURL=api-explorer-msgraph.js.map
// ------------------------------------------------------------------------------
//  Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.  See License in the project root for license information.
// ------------------------------------------------------------------------------

hello.init({
	msft: {
		oauth: {
			version: 2,
			auth: 'https://login.microsoftonline.com/organizations/oauth2/v2.0/authorize',
			grant: 'https://login.microsoftonline.com/organizations/oauth2/v2.0/token'
		},
		scope_delim: ' ',

		// Don't even try submitting via form.
		// This means no POST operations in <=IE9
		form: false
	}, msft_admin_consent: {
		oauth: {
			version: 2,
			auth: 'https://login.microsoftonline.com/organizations/adminconsent',
			grant: 'https://login.microsoftonline.com/organizations/oauth2/v2.0/token'
		},
		scope_delim: ' ',

		// Don't even try submitting via form.
		// This means no POST operations in <=IE9
		form: false
	}, msft_token_refresh: {
		oauth: {
			version: 2,
			auth: 'https://login.microsoftonline.com/organizations/oauth2/v2.0/authorize',
			grant: 'https://login.microsoftonline.com/organizations/oauth2/v2.0/token'
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

    if (possibleHistory == null) {
        return;
    }

    requestHistory = JSON.parse(possibleHistory);
}


function saveHistoryObject(historyObject, statusCode, duration) {
    historyObject.successful = statusCode >= 200 && statusCode < 300;
    historyObject.statusCode = statusCode;
    historyObject.duration = duration;
    historyObject.requestId = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 10);

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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImp3dC1kZWNvZGUubWluLmpzIiwiaGVsbG8uYWxsLmpzIiwiaGVsbG8uanMiLCJhcGktZXhwbG9yZXItaW5pdC5qcyIsImFwaS1leHBsb3Jlci1oZWxwZXJzLmpzIiwiYXBpLWV4cGxvcmVyLWFwcC5qcyIsImFwaS1leHBsb3Jlci1zdmMuanMiLCJsb2Nfc3RyaW5ncy5qcyIsImFwaS1leHBsb3Jlci1jdHJsLmpzIiwiYXBpLWV4cGxvcmVyLWRpcmVjdGl2ZS5qcyIsImFwaS1leHBsb3Jlci1qc2VkaXRvci5qcyIsImFwaS1leHBsb3Jlci1qc3ZpZXdlci5qcyIsImFwaS1leHBsb3Jlci1tc2dyYXBoLmpzIiwiYXV0aC5qcyIsInBvc3RUZW1wbGF0ZXMuanMiLCJoaXN0b3J5LmpzIiwic2hhcmUtZGlhbG9nLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNsc0xBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2orRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2pEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN6WEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNsQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDdkVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDbEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNoY0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNuREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUMxQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3ZNQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN6Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN2Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3JJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2pDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJhbGwuanMiLCJzb3VyY2VzQ29udGVudCI6WyIhZnVuY3Rpb24gYShiLGMsZCl7ZnVuY3Rpb24gZShnLGgpe2lmKCFjW2ddKXtpZighYltnXSl7dmFyIGk9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighaCYmaSlyZXR1cm4gaShnLCEwKTtpZihmKXJldHVybiBmKGcsITApO3ZhciBqPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrZytcIidcIik7dGhyb3cgai5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGp9dmFyIGs9Y1tnXT17ZXhwb3J0czp7fX07YltnXVswXS5jYWxsKGsuZXhwb3J0cyxmdW5jdGlvbihhKXt2YXIgYz1iW2ddWzFdW2FdO3JldHVybiBlKGM/YzphKX0sayxrLmV4cG9ydHMsYSxiLGMsZCl9cmV0dXJuIGNbZ10uZXhwb3J0c31mb3IodmFyIGY9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxnPTA7ZzxkLmxlbmd0aDtnKyspZShkW2ddKTtyZXR1cm4gZX0oezE6W2Z1bmN0aW9uKGEsYixjKXtmdW5jdGlvbiBkKGEpe3RoaXMubWVzc2FnZT1hfWZ1bmN0aW9uIGUoYSl7dmFyIGI9U3RyaW5nKGEpLnJlcGxhY2UoLz0rJC8sXCJcIik7aWYoYi5sZW5ndGglND09MSl0aHJvdyBuZXcgZChcIidhdG9iJyBmYWlsZWQ6IFRoZSBzdHJpbmcgdG8gYmUgZGVjb2RlZCBpcyBub3QgY29ycmVjdGx5IGVuY29kZWQuXCIpO2Zvcih2YXIgYyxlLGc9MCxoPTAsaT1cIlwiO2U9Yi5jaGFyQXQoaCsrKTt+ZSYmKGM9ZyU0PzY0KmMrZTplLGcrKyU0KT9pKz1TdHJpbmcuZnJvbUNoYXJDb2RlKDI1NSZjPj4oLTIqZyY2KSk6MCllPWYuaW5kZXhPZihlKTtyZXR1cm4gaX12YXIgZj1cIkFCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaYWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXowMTIzNDU2Nzg5Ky89XCI7ZC5wcm90b3R5cGU9bmV3IEVycm9yLGQucHJvdG90eXBlLm5hbWU9XCJJbnZhbGlkQ2hhcmFjdGVyRXJyb3JcIixiLmV4cG9ydHM9XCJ1bmRlZmluZWRcIiE9dHlwZW9mIHdpbmRvdyYmd2luZG93LmF0b2ImJndpbmRvdy5hdG9iLmJpbmQod2luZG93KXx8ZX0se31dLDI6W2Z1bmN0aW9uKGEsYixjKXtmdW5jdGlvbiBkKGEpe3JldHVybiBkZWNvZGVVUklDb21wb25lbnQoZShhKS5yZXBsYWNlKC8oLikvZyxmdW5jdGlvbihhLGIpe3ZhciBjPWIuY2hhckNvZGVBdCgwKS50b1N0cmluZygxNikudG9VcHBlckNhc2UoKTtyZXR1cm4gYy5sZW5ndGg8MiYmKGM9XCIwXCIrYyksXCIlXCIrY30pKX12YXIgZT1hKFwiLi9hdG9iXCIpO2IuZXhwb3J0cz1mdW5jdGlvbihhKXt2YXIgYj1hLnJlcGxhY2UoLy0vZyxcIitcIikucmVwbGFjZSgvXy9nLFwiL1wiKTtzd2l0Y2goYi5sZW5ndGglNCl7Y2FzZSAwOmJyZWFrO2Nhc2UgMjpiKz1cIj09XCI7YnJlYWs7Y2FzZSAzOmIrPVwiPVwiO2JyZWFrO2RlZmF1bHQ6dGhyb3dcIklsbGVnYWwgYmFzZTY0dXJsIHN0cmluZyFcIn10cnl7cmV0dXJuIGQoYil9Y2F0Y2goYyl7cmV0dXJuIGUoYil9fX0se1wiLi9hdG9iXCI6MX1dLDM6W2Z1bmN0aW9uKGEsYixjKXtcInVzZSBzdHJpY3RcIjt2YXIgZD1hKFwiLi9iYXNlNjRfdXJsX2RlY29kZVwiKTtiLmV4cG9ydHM9ZnVuY3Rpb24oYSxiKXtpZihcInN0cmluZ1wiIT10eXBlb2YgYSl0aHJvdyBuZXcgRXJyb3IoXCJJbnZhbGlkIHRva2VuIHNwZWNpZmllZFwiKTtiPWJ8fHt9O3ZhciBjPWIuaGVhZGVyPT09ITA/MDoxO3JldHVybiBKU09OLnBhcnNlKGQoYS5zcGxpdChcIi5cIilbY10pKX19LHtcIi4vYmFzZTY0X3VybF9kZWNvZGVcIjoyfV0sNDpbZnVuY3Rpb24oYSxiLGMpeyhmdW5jdGlvbihiKXt2YXIgYz1hKFwiLi9saWIvaW5kZXhcIik7XCJmdW5jdGlvblwiPT10eXBlb2YgYi53aW5kb3cuZGVmaW5lJiZiLndpbmRvdy5kZWZpbmUuYW1kP2Iud2luZG93LmRlZmluZShcImp3dF9kZWNvZGVcIixmdW5jdGlvbigpe3JldHVybiBjfSk6Yi53aW5kb3cmJihiLndpbmRvdy5qd3RfZGVjb2RlPWMpfSkuY2FsbCh0aGlzLFwidW5kZWZpbmVkXCIhPXR5cGVvZiBnbG9iYWw/Z2xvYmFsOlwidW5kZWZpbmVkXCIhPXR5cGVvZiBzZWxmP3NlbGY6XCJ1bmRlZmluZWRcIiE9dHlwZW9mIHdpbmRvdz93aW5kb3c6e30pfSx7XCIuL2xpYi9pbmRleFwiOjN9XX0se30sWzRdKTsiLCIvKiEgaGVsbG9qcyB2MS4xNC4wIHwgKGMpIDIwMTItMjAxNiBBbmRyZXcgRG9kc29uIHwgTUlUIGh0dHBzOi8vYWRvZHNvbi5jb20vaGVsbG8uanMvTElDRU5TRSAqL1xyXG4vLyBFUzUgT2JqZWN0LmNyZWF0ZVxyXG5pZiAoIU9iamVjdC5jcmVhdGUpIHtcclxuXHJcblx0Ly8gU2hpbSwgT2JqZWN0IGNyZWF0ZVxyXG5cdC8vIEEgc2hpbSBmb3IgT2JqZWN0LmNyZWF0ZSgpLCBpdCBhZGRzIGEgcHJvdG90eXBlIHRvIGEgbmV3IG9iamVjdFxyXG5cdE9iamVjdC5jcmVhdGUgPSAoZnVuY3Rpb24oKSB7XHJcblxyXG5cdFx0ZnVuY3Rpb24gRigpIHt9XHJcblxyXG5cdFx0cmV0dXJuIGZ1bmN0aW9uKG8pIHtcclxuXHJcblx0XHRcdGlmIChhcmd1bWVudHMubGVuZ3RoICE9IDEpIHtcclxuXHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoJ09iamVjdC5jcmVhdGUgaW1wbGVtZW50YXRpb24gb25seSBhY2NlcHRzIG9uZSBwYXJhbWV0ZXIuJyk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdEYucHJvdG90eXBlID0gbztcclxuXHRcdFx0cmV0dXJuIG5ldyBGKCk7XHJcblx0XHR9O1xyXG5cclxuXHR9KSgpO1xyXG5cclxufVxyXG5cclxuLy8gRVM1IE9iamVjdC5rZXlzXHJcbmlmICghT2JqZWN0LmtleXMpIHtcclxuXHRPYmplY3Qua2V5cyA9IGZ1bmN0aW9uKG8sIGssIHIpIHtcclxuXHRcdHIgPSBbXTtcclxuXHRcdGZvciAoayBpbiBvKSB7XHJcblx0XHRcdGlmIChyLmhhc093blByb3BlcnR5LmNhbGwobywgaykpXHJcblx0XHRcdFx0ci5wdXNoKGspO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiByO1xyXG5cdH07XHJcbn1cclxuXHJcbi8vIEVTNSBbXS5pbmRleE9mXHJcbmlmICghQXJyYXkucHJvdG90eXBlLmluZGV4T2YpIHtcclxuXHRBcnJheS5wcm90b3R5cGUuaW5kZXhPZiA9IGZ1bmN0aW9uKHMpIHtcclxuXHJcblx0XHRmb3IgKHZhciBqID0gMDsgaiA8IHRoaXMubGVuZ3RoOyBqKyspIHtcclxuXHRcdFx0aWYgKHRoaXNbal0gPT09IHMpIHtcclxuXHRcdFx0XHRyZXR1cm4gajtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiAtMTtcclxuXHR9O1xyXG59XHJcblxyXG4vLyBFUzUgW10uZm9yRWFjaFxyXG5pZiAoIUFycmF5LnByb3RvdHlwZS5mb3JFYWNoKSB7XHJcblx0QXJyYXkucHJvdG90eXBlLmZvckVhY2ggPSBmdW5jdGlvbihmdW4vKiwgdGhpc0FyZyovKSB7XHJcblxyXG5cdFx0aWYgKHRoaXMgPT09IHZvaWQgMCB8fCB0aGlzID09PSBudWxsKSB7XHJcblx0XHRcdHRocm93IG5ldyBUeXBlRXJyb3IoKTtcclxuXHRcdH1cclxuXHJcblx0XHR2YXIgdCA9IE9iamVjdCh0aGlzKTtcclxuXHRcdHZhciBsZW4gPSB0Lmxlbmd0aCA+Pj4gMDtcclxuXHRcdGlmICh0eXBlb2YgZnVuICE9PSAnZnVuY3Rpb24nKSB7XHJcblx0XHRcdHRocm93IG5ldyBUeXBlRXJyb3IoKTtcclxuXHRcdH1cclxuXHJcblx0XHR2YXIgdGhpc0FyZyA9IGFyZ3VtZW50cy5sZW5ndGggPj0gMiA/IGFyZ3VtZW50c1sxXSA6IHZvaWQgMDtcclxuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcclxuXHRcdFx0aWYgKGkgaW4gdCkge1xyXG5cdFx0XHRcdGZ1bi5jYWxsKHRoaXNBcmcsIHRbaV0sIGksIHQpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIHRoaXM7XHJcblx0fTtcclxufVxyXG5cclxuLy8gRVM1IFtdLmZpbHRlclxyXG5pZiAoIUFycmF5LnByb3RvdHlwZS5maWx0ZXIpIHtcclxuXHRBcnJheS5wcm90b3R5cGUuZmlsdGVyID0gZnVuY3Rpb24oZnVuLCB0aGlzQXJnKSB7XHJcblxyXG5cdFx0dmFyIGEgPSBbXTtcclxuXHRcdHRoaXMuZm9yRWFjaChmdW5jdGlvbih2YWwsIGksIHQpIHtcclxuXHRcdFx0aWYgKGZ1bi5jYWxsKHRoaXNBcmcgfHwgdm9pZCAwLCB2YWwsIGksIHQpKSB7XHJcblx0XHRcdFx0YS5wdXNoKHZhbCk7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cclxuXHRcdHJldHVybiBhO1xyXG5cdH07XHJcbn1cclxuXHJcbi8vIFByb2R1Y3Rpb24gc3RlcHMgb2YgRUNNQS0yNjIsIEVkaXRpb24gNSwgMTUuNC40LjE5XHJcbi8vIFJlZmVyZW5jZTogaHR0cDovL2VzNS5naXRodWIuaW8vI3gxNS40LjQuMTlcclxuaWYgKCFBcnJheS5wcm90b3R5cGUubWFwKSB7XHJcblxyXG5cdEFycmF5LnByb3RvdHlwZS5tYXAgPSBmdW5jdGlvbihmdW4sIHRoaXNBcmcpIHtcclxuXHJcblx0XHR2YXIgYSA9IFtdO1xyXG5cdFx0dGhpcy5mb3JFYWNoKGZ1bmN0aW9uKHZhbCwgaSwgdCkge1xyXG5cdFx0XHRhLnB1c2goZnVuLmNhbGwodGhpc0FyZyB8fCB2b2lkIDAsIHZhbCwgaSwgdCkpO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0cmV0dXJuIGE7XHJcblx0fTtcclxufVxyXG5cclxuLy8gRVM1IGlzQXJyYXlcclxuaWYgKCFBcnJheS5pc0FycmF5KSB7XHJcblxyXG5cdC8vIEZ1bmN0aW9uIEFycmF5LmlzQXJyYXlcclxuXHRBcnJheS5pc0FycmF5ID0gZnVuY3Rpb24obykge1xyXG5cdFx0cmV0dXJuIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvKSA9PT0gJ1tvYmplY3QgQXJyYXldJztcclxuXHR9O1xyXG5cclxufVxyXG5cclxuLy8gVGVzdCBmb3IgbG9jYXRpb24uYXNzaWduXHJcbmlmICh0eXBlb2Ygd2luZG93ID09PSAnb2JqZWN0JyAmJiB0eXBlb2Ygd2luZG93LmxvY2F0aW9uID09PSAnb2JqZWN0JyAmJiAhd2luZG93LmxvY2F0aW9uLmFzc2lnbikge1xyXG5cclxuXHR3aW5kb3cubG9jYXRpb24uYXNzaWduID0gZnVuY3Rpb24odXJsKSB7XHJcblx0XHR3aW5kb3cubG9jYXRpb24gPSB1cmw7XHJcblx0fTtcclxuXHJcbn1cclxuXHJcbi8vIFRlc3QgZm9yIEZ1bmN0aW9uLmJpbmRcclxuaWYgKCFGdW5jdGlvbi5wcm90b3R5cGUuYmluZCkge1xyXG5cclxuXHQvLyBNRE5cclxuXHQvLyBQb2x5ZmlsbCBJRTgsIGRvZXMgbm90IHN1cHBvcnQgbmF0aXZlIEZ1bmN0aW9uLmJpbmRcclxuXHRGdW5jdGlvbi5wcm90b3R5cGUuYmluZCA9IGZ1bmN0aW9uKGIpIHtcclxuXHJcblx0XHRpZiAodHlwZW9mIHRoaXMgIT09ICdmdW5jdGlvbicpIHtcclxuXHRcdFx0dGhyb3cgbmV3IFR5cGVFcnJvcignRnVuY3Rpb24ucHJvdG90eXBlLmJpbmQgLSB3aGF0IGlzIHRyeWluZyB0byBiZSBib3VuZCBpcyBub3QgY2FsbGFibGUnKTtcclxuXHRcdH1cclxuXHJcblx0XHRmdW5jdGlvbiBDKCkge31cclxuXHJcblx0XHR2YXIgYSA9IFtdLnNsaWNlO1xyXG5cdFx0dmFyIGYgPSBhLmNhbGwoYXJndW1lbnRzLCAxKTtcclxuXHRcdHZhciBfdGhpcyA9IHRoaXM7XHJcblx0XHR2YXIgRCA9IGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRyZXR1cm4gX3RoaXMuYXBwbHkodGhpcyBpbnN0YW5jZW9mIEMgPyB0aGlzIDogYiB8fCB3aW5kb3csIGYuY29uY2F0KGEuY2FsbChhcmd1bWVudHMpKSk7XHJcblx0XHR9O1xyXG5cclxuXHRcdEMucHJvdG90eXBlID0gdGhpcy5wcm90b3R5cGU7XHJcblx0XHRELnByb3RvdHlwZSA9IG5ldyBDKCk7XHJcblxyXG5cdFx0cmV0dXJuIEQ7XHJcblx0fTtcclxuXHJcbn1cclxuXHJcbi8qKlxyXG4gKiBAaGVsbG8uanNcclxuICpcclxuICogSGVsbG9KUyBpcyBhIGNsaWVudCBzaWRlIEphdmFzY3JpcHQgU0RLIGZvciBtYWtpbmcgT0F1dGgyIGxvZ2lucyBhbmQgc3Vic2VxdWVudCBSRVNUIGNhbGxzLlxyXG4gKlxyXG4gKiBAYXV0aG9yIEFuZHJldyBEb2Rzb25cclxuICogQHdlYnNpdGUgaHR0cHM6Ly9hZG9kc29uLmNvbS9oZWxsby5qcy9cclxuICpcclxuICogQGNvcHlyaWdodCBBbmRyZXcgRG9kc29uLCAyMDEyIC0gMjAxNVxyXG4gKiBAbGljZW5zZSBNSVQ6IFlvdSBhcmUgZnJlZSB0byB1c2UgYW5kIG1vZGlmeSB0aGlzIGNvZGUgZm9yIGFueSB1c2UsIG9uIHRoZSBjb25kaXRpb24gdGhhdCB0aGlzIGNvcHlyaWdodCBub3RpY2UgcmVtYWlucy5cclxuICovXHJcblxyXG52YXIgaGVsbG8gPSBmdW5jdGlvbihuYW1lKSB7XHJcblx0cmV0dXJuIGhlbGxvLnVzZShuYW1lKTtcclxufTtcclxuXHJcbmhlbGxvLnV0aWxzID0ge1xyXG5cclxuXHQvLyBFeHRlbmQgdGhlIGZpcnN0IG9iamVjdCB3aXRoIHRoZSBwcm9wZXJ0aWVzIGFuZCBtZXRob2RzIG9mIHRoZSBzZWNvbmRcclxuXHRleHRlbmQ6IGZ1bmN0aW9uKHIgLyosIGFbLCBiWywgLi4uXV0gKi8pIHtcclxuXHJcblx0XHQvLyBHZXQgdGhlIGFyZ3VtZW50cyBhcyBhbiBhcnJheSBidXQgb21taXQgdGhlIGluaXRpYWwgaXRlbVxyXG5cdFx0QXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKS5mb3JFYWNoKGZ1bmN0aW9uKGEpIHtcclxuXHRcdFx0aWYgKEFycmF5LmlzQXJyYXkocikgJiYgQXJyYXkuaXNBcnJheShhKSkge1xyXG5cdFx0XHRcdEFycmF5LnByb3RvdHlwZS5wdXNoLmFwcGx5KHIsIGEpO1xyXG5cdFx0XHR9XHJcblx0XHRcdGVsc2UgaWYgKHIgaW5zdGFuY2VvZiBPYmplY3QgJiYgYSBpbnN0YW5jZW9mIE9iamVjdCAmJiByICE9PSBhKSB7XHJcblx0XHRcdFx0Zm9yICh2YXIgeCBpbiBhKSB7XHJcblx0XHRcdFx0XHRyW3hdID0gaGVsbG8udXRpbHMuZXh0ZW5kKHJbeF0sIGFbeF0pO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0XHRlbHNlIHtcclxuXHJcblx0XHRcdFx0aWYgKEFycmF5LmlzQXJyYXkoYSkpIHtcclxuXHRcdFx0XHRcdC8vIENsb25lIGl0XHJcblx0XHRcdFx0XHRhID0gYS5zbGljZSgwKTtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdHIgPSBhO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHJcblx0XHRyZXR1cm4gcjtcclxuXHR9XHJcbn07XHJcblxyXG4vLyBDb3JlIGxpYnJhcnlcclxuaGVsbG8udXRpbHMuZXh0ZW5kKGhlbGxvLCB7XHJcblxyXG5cdHNldHRpbmdzOiB7XHJcblxyXG5cdFx0Ly8gT0F1dGgyIGF1dGhlbnRpY2F0aW9uIGRlZmF1bHRzXHJcblx0XHRyZWRpcmVjdF91cmk6IHdpbmRvdy5sb2NhdGlvbi5ocmVmLnNwbGl0KCcjJylbMF0sXHJcblx0XHRyZXNwb25zZV90eXBlOiAndG9rZW4nLFxyXG5cdFx0ZGlzcGxheTogJ3BvcHVwJyxcclxuXHRcdHN0YXRlOiAnJyxcclxuXHJcblx0XHQvLyBPQXV0aDEgc2hpbVxyXG5cdFx0Ly8gVGhlIHBhdGggdG8gdGhlIE9BdXRoMSBzZXJ2ZXIgZm9yIHNpZ25pbmcgdXNlciByZXF1ZXN0c1xyXG5cdFx0Ly8gV2FudCB0byByZWNyZWF0ZSB5b3VyIG93bj8gQ2hlY2tvdXQgaHR0cHM6Ly9naXRodWIuY29tL01yU3dpdGNoL25vZGUtb2F1dGgtc2hpbVxyXG5cdFx0b2F1dGhfcHJveHk6ICdodHRwczovL2F1dGgtc2VydmVyLmhlcm9rdWFwcC5jb20vcHJveHknLFxyXG5cclxuXHRcdC8vIEFQSSB0aW1lb3V0IGluIG1pbGxpc2Vjb25kc1xyXG5cdFx0dGltZW91dDogMjAwMDAsXHJcblxyXG5cdFx0Ly8gUG9wdXAgT3B0aW9uc1xyXG5cdFx0cG9wdXA6IHtcclxuXHRcdFx0cmVzaXphYmxlOiAxLFxyXG5cdFx0XHRzY3JvbGxiYXJzOiAxLFxyXG5cdFx0XHR3aWR0aDogNTAwLFxyXG5cdFx0XHRoZWlnaHQ6IDU1MFxyXG5cdFx0fSxcclxuXHJcblx0XHQvLyBEZWZhdWx0IHNjb3BlXHJcblx0XHQvLyBNYW55IHNlcnZpY2VzIHJlcXVpcmUgYXRsZWFzdCBhIHByb2ZpbGUgc2NvcGUsXHJcblx0XHQvLyBIZWxsb0pTIGF1dG9tYXRpYWxseSBpbmNsdWRlcyB0aGUgdmFsdWUgb2YgcHJvdmlkZXIuc2NvcGVfbWFwLmJhc2ljXHJcblx0XHQvLyBJZiB0aGF0J3Mgbm90IHJlcXVpcmVkIGl0IGNhbiBiZSByZW1vdmVkIHZpYSBoZWxsby5zZXR0aW5ncy5zY29wZS5sZW5ndGggPSAwO1xyXG5cdFx0c2NvcGU6IFsnYmFzaWMnXSxcclxuXHJcblx0XHQvLyBTY29wZSBNYXBzXHJcblx0XHQvLyBUaGlzIGlzIHRoZSBkZWZhdWx0IG1vZHVsZSBzY29wZSwgdGhlc2UgYXJlIHRoZSBkZWZhdWx0cyB3aGljaCBlYWNoIHNlcnZpY2UgaXMgbWFwcGVkIHRvby5cclxuXHRcdC8vIEJ5IGluY2x1ZGluZyB0aGVtIGhlcmUgaXQgcHJldmVudHMgdGhlIHNjb3BlIGZyb20gYmVpbmcgYXBwbGllZCBhY2NpZGVudGFsbHlcclxuXHRcdHNjb3BlX21hcDoge1xyXG5cdFx0XHRiYXNpYzogJydcclxuXHRcdH0sXHJcblxyXG5cdFx0Ly8gRGVmYXVsdCBzZXJ2aWNlIC8gbmV0d29ya1xyXG5cdFx0ZGVmYXVsdF9zZXJ2aWNlOiBudWxsLFxyXG5cclxuXHRcdC8vIEZvcmNlIGF1dGhlbnRpY2F0aW9uXHJcblx0XHQvLyBXaGVuIGhlbGxvLmxvZ2luIGlzIGZpcmVkLlxyXG5cdFx0Ly8gKG51bGwpOiBpZ25vcmUgY3VycmVudCBzZXNzaW9uIGV4cGlyeSBhbmQgY29udGludWUgd2l0aCBsb2dpblxyXG5cdFx0Ly8gKHRydWUpOiBpZ25vcmUgY3VycmVudCBzZXNzaW9uIGV4cGlyeSBhbmQgY29udGludWUgd2l0aCBsb2dpbiwgYXNrIGZvciB1c2VyIHRvIHJlYXV0aGVudGljYXRlXHJcblx0XHQvLyAoZmFsc2UpOiBpZiB0aGUgY3VycmVudCBzZXNzaW9uIGxvb2tzIGdvb2QgZm9yIHRoZSByZXF1ZXN0IHNjb3BlcyByZXR1cm4gdGhlIGN1cnJlbnQgc2Vzc2lvbi5cclxuXHRcdGZvcmNlOiBudWxsLFxyXG5cclxuXHRcdC8vIFBhZ2UgVVJMXHJcblx0XHQvLyBXaGVuICdkaXNwbGF5PXBhZ2UnIHRoaXMgcHJvcGVydHkgZGVmaW5lcyB3aGVyZSB0aGUgdXNlcnMgcGFnZSBzaG91bGQgZW5kIHVwIGFmdGVyIHJlZGlyZWN0X3VyaVxyXG5cdFx0Ly8gVGhzIGNvdWxkIGJlIHByb2JsZW1hdGljIGlmIHRoZSByZWRpcmVjdF91cmkgaXMgaW5kZWVkIHRoZSBmaW5hbCBwbGFjZSxcclxuXHRcdC8vIFR5cGljYWxseSB0aGlzIGNpcmN1bXZlbnRzIHRoZSBwcm9ibGVtIG9mIHRoZSByZWRpcmVjdF91cmwgYmVpbmcgYSBkdW1iIHJlbGF5IHBhZ2UuXHJcblx0XHRwYWdlX3VyaTogd2luZG93LmxvY2F0aW9uLmhyZWZcclxuXHR9LFxyXG5cclxuXHQvLyBTZXJ2aWNlIGNvbmZpZ3VyYXRpb24gb2JqZWN0c1xyXG5cdHNlcnZpY2VzOiB7fSxcclxuXHJcblx0Ly8gVXNlXHJcblx0Ly8gRGVmaW5lIGEgbmV3IGluc3RhbmNlIG9mIHRoZSBIZWxsb0pTIGxpYnJhcnkgd2l0aCBhIGRlZmF1bHQgc2VydmljZVxyXG5cdHVzZTogZnVuY3Rpb24oc2VydmljZSkge1xyXG5cclxuXHRcdC8vIENyZWF0ZSBzZWxmLCB3aGljaCBpbmhlcml0cyBmcm9tIGl0cyBwYXJlbnRcclxuXHRcdHZhciBzZWxmID0gT2JqZWN0LmNyZWF0ZSh0aGlzKTtcclxuXHJcblx0XHQvLyBJbmhlcml0IHRoZSBwcm90b3R5cGUgZnJvbSBpdHMgcGFyZW50XHJcblx0XHRzZWxmLnNldHRpbmdzID0gT2JqZWN0LmNyZWF0ZSh0aGlzLnNldHRpbmdzKTtcclxuXHJcblx0XHQvLyBEZWZpbmUgdGhlIGRlZmF1bHQgc2VydmljZVxyXG5cdFx0aWYgKHNlcnZpY2UpIHtcclxuXHRcdFx0c2VsZi5zZXR0aW5ncy5kZWZhdWx0X3NlcnZpY2UgPSBzZXJ2aWNlO1xyXG5cdFx0fVxyXG5cclxuXHRcdC8vIENyZWF0ZSBhbiBpbnN0YW5jZSBvZiBFdmVudHNcclxuXHRcdHNlbGYudXRpbHMuRXZlbnQuY2FsbChzZWxmKTtcclxuXHJcblx0XHRyZXR1cm4gc2VsZjtcclxuXHR9LFxyXG5cclxuXHQvLyBJbml0aWFsaXplXHJcblx0Ly8gRGVmaW5lIHRoZSBjbGllbnRfaWRzIGZvciB0aGUgZW5kcG9pbnQgc2VydmljZXNcclxuXHQvLyBAcGFyYW0gb2JqZWN0IG8sIGNvbnRhaW5zIGEga2V5IHZhbHVlIHBhaXIsIHNlcnZpY2UgPT4gY2xpZW50SWRcclxuXHQvLyBAcGFyYW0gb2JqZWN0IG9wdHMsIGNvbnRhaW5zIGEga2V5IHZhbHVlIHBhaXIgb2Ygb3B0aW9ucyB1c2VkIGZvciBkZWZpbmluZyB0aGUgYXV0aGVudGljYXRpb24gZGVmYXVsdHNcclxuXHQvLyBAcGFyYW0gbnVtYmVyIHRpbWVvdXQsIHRpbWVvdXQgaW4gc2Vjb25kc1xyXG5cdGluaXQ6IGZ1bmN0aW9uKHNlcnZpY2VzLCBvcHRpb25zKSB7XHJcblxyXG5cdFx0dmFyIHV0aWxzID0gdGhpcy51dGlscztcclxuXHJcblx0XHRpZiAoIXNlcnZpY2VzKSB7XHJcblx0XHRcdHJldHVybiB0aGlzLnNlcnZpY2VzO1xyXG5cdFx0fVxyXG5cclxuXHRcdC8vIERlZmluZSBwcm92aWRlciBjcmVkZW50aWFsc1xyXG5cdFx0Ly8gUmVmb3JtYXQgdGhlIElEIGZpZWxkXHJcblx0XHRmb3IgKHZhciB4IGluIHNlcnZpY2VzKSB7aWYgKHNlcnZpY2VzLmhhc093blByb3BlcnR5KHgpKSB7XHJcblx0XHRcdGlmICh0eXBlb2YgKHNlcnZpY2VzW3hdKSAhPT0gJ29iamVjdCcpIHtcclxuXHRcdFx0XHRzZXJ2aWNlc1t4XSA9IHtpZDogc2VydmljZXNbeF19O1xyXG5cdFx0XHR9XHJcblx0XHR9fVxyXG5cclxuXHRcdC8vIE1lcmdlIHNlcnZpY2VzIGlmIHRoZXJlIGFscmVhZHkgZXhpc3RzIHNvbWVcclxuXHRcdHV0aWxzLmV4dGVuZCh0aGlzLnNlcnZpY2VzLCBzZXJ2aWNlcyk7XHJcblxyXG5cdFx0Ly8gVXBkYXRlIHRoZSBkZWZhdWx0IHNldHRpbmdzIHdpdGggdGhpcyBvbmUuXHJcblx0XHRpZiAob3B0aW9ucykge1xyXG5cdFx0XHR1dGlscy5leHRlbmQodGhpcy5zZXR0aW5ncywgb3B0aW9ucyk7XHJcblxyXG5cdFx0XHQvLyBEbyB0aGlzIGltbWVkaWF0bHkgaW5jYXNlIHRoZSBicm93c2VyIGNoYW5nZXMgdGhlIGN1cnJlbnQgcGF0aC5cclxuXHRcdFx0aWYgKCdyZWRpcmVjdF91cmknIGluIG9wdGlvbnMpIHtcclxuXHRcdFx0XHR0aGlzLnNldHRpbmdzLnJlZGlyZWN0X3VyaSA9IHV0aWxzLnVybChvcHRpb25zLnJlZGlyZWN0X3VyaSkuaHJlZjtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiB0aGlzO1xyXG5cdH0sXHJcblxyXG5cdC8vIExvZ2luXHJcblx0Ly8gVXNpbmcgdGhlIGVuZHBvaW50XHJcblx0Ly8gQHBhcmFtIG5ldHdvcmsgc3RyaW5naWZ5ICAgICAgIG5hbWUgdG8gY29ubmVjdCB0b1xyXG5cdC8vIEBwYXJhbSBvcHRpb25zIG9iamVjdCAgICAob3B0aW9uYWwpICB7ZGlzcGxheSBtb2RlLCBpcyBlaXRoZXIgbm9uZXxwb3B1cChkZWZhdWx0KXxwYWdlLCBzY29wZTogZW1haWwsYmlydGhkYXkscHVibGlzaCwgLi4gfVxyXG5cdC8vIEBwYXJhbSBjYWxsYmFjayAgZnVuY3Rpb24gIChvcHRpb25hbCkgIGZpcmVkIG9uIHNpZ25pblxyXG5cdGxvZ2luOiBmdW5jdGlvbigpIHtcclxuXHJcblx0XHQvLyBDcmVhdGUgYW4gb2JqZWN0IHdoaWNoIGluaGVyaXRzIGl0cyBwYXJlbnQgYXMgdGhlIHByb3RvdHlwZSBhbmQgY29uc3RydWN0cyBhIG5ldyBldmVudCBjaGFpbi5cclxuXHRcdHZhciBfdGhpcyA9IHRoaXM7XHJcblx0XHR2YXIgdXRpbHMgPSBfdGhpcy51dGlscztcclxuXHRcdHZhciBlcnJvciA9IHV0aWxzLmVycm9yO1xyXG5cdFx0dmFyIHByb21pc2UgPSB1dGlscy5Qcm9taXNlKCk7XHJcblxyXG5cdFx0Ly8gR2V0IHBhcmFtZXRlcnNcclxuXHRcdHZhciBwID0gdXRpbHMuYXJncyh7bmV0d29yazogJ3MnLCBvcHRpb25zOiAnbycsIGNhbGxiYWNrOiAnZid9LCBhcmd1bWVudHMpO1xyXG5cclxuXHRcdC8vIExvY2FsIHZhcnNcclxuXHRcdHZhciB1cmw7XHJcblxyXG5cdFx0Ly8gR2V0IGFsbCB0aGUgY3VzdG9tIG9wdGlvbnMgYW5kIHN0b3JlIHRvIGJlIGFwcGVuZGVkIHRvIHRoZSBxdWVyeXN0cmluZ1xyXG5cdFx0dmFyIHFzID0gdXRpbHMuZGlmZktleShwLm9wdGlvbnMsIF90aGlzLnNldHRpbmdzKTtcclxuXHJcblx0XHQvLyBNZXJnZS9vdmVycmlkZSBvcHRpb25zIHdpdGggYXBwIGRlZmF1bHRzXHJcblx0XHR2YXIgb3B0cyA9IHAub3B0aW9ucyA9IHV0aWxzLm1lcmdlKF90aGlzLnNldHRpbmdzLCBwLm9wdGlvbnMgfHwge30pO1xyXG5cclxuXHRcdC8vIE1lcmdlL292ZXJyaWRlIG9wdGlvbnMgd2l0aCBhcHAgZGVmYXVsdHNcclxuXHRcdG9wdHMucG9wdXAgPSB1dGlscy5tZXJnZShfdGhpcy5zZXR0aW5ncy5wb3B1cCwgcC5vcHRpb25zLnBvcHVwIHx8IHt9KTtcclxuXHJcblx0XHQvLyBOZXR3b3JrXHJcblx0XHRwLm5ldHdvcmsgPSBwLm5ldHdvcmsgfHwgX3RoaXMuc2V0dGluZ3MuZGVmYXVsdF9zZXJ2aWNlO1xyXG5cclxuXHRcdC8vIEJpbmQgY2FsbGJhY2sgdG8gYm90aCByZWplY3QgYW5kIGZ1bGZpbGwgc3RhdGVzXHJcblx0XHRwcm9taXNlLnByb3h5LnRoZW4ocC5jYWxsYmFjaywgcC5jYWxsYmFjayk7XHJcblxyXG5cdFx0Ly8gVHJpZ2dlciBhbiBldmVudCBvbiB0aGUgZ2xvYmFsIGxpc3RlbmVyXHJcblx0XHRmdW5jdGlvbiBlbWl0KHMsIHZhbHVlKSB7XHJcblx0XHRcdGhlbGxvLmVtaXQocywgdmFsdWUpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHByb21pc2UucHJveHkudGhlbihlbWl0LmJpbmQodGhpcywgJ2F1dGgubG9naW4gYXV0aCcpLCBlbWl0LmJpbmQodGhpcywgJ2F1dGguZmFpbGVkIGF1dGgnKSk7XHJcblxyXG5cdFx0Ly8gSXMgb3VyIHNlcnZpY2UgdmFsaWQ/XHJcblx0XHRpZiAodHlwZW9mIChwLm5ldHdvcmspICE9PSAnc3RyaW5nJyB8fCAhKHAubmV0d29yayBpbiBfdGhpcy5zZXJ2aWNlcykpIHtcclxuXHRcdFx0Ly8gVHJpZ2dlciB0aGUgZGVmYXVsdCBsb2dpbi5cclxuXHRcdFx0Ly8gQWhoIHdlIGRvbnQgaGF2ZSBvbmUuXHJcblx0XHRcdHJldHVybiBwcm9taXNlLnJlamVjdChlcnJvcignaW52YWxpZF9uZXR3b3JrJywgJ1RoZSBwcm92aWRlZCBuZXR3b3JrIHdhcyBub3QgcmVjb2duaXplZCcpKTtcclxuXHRcdH1cclxuXHJcblx0XHR2YXIgcHJvdmlkZXIgPSBfdGhpcy5zZXJ2aWNlc1twLm5ldHdvcmtdO1xyXG5cclxuXHRcdC8vIENyZWF0ZSBhIGdsb2JhbCBsaXN0ZW5lciB0byBjYXB0dXJlIGV2ZW50cyB0cmlnZ2VyZWQgb3V0IG9mIHNjb3BlXHJcblx0XHR2YXIgY2FsbGJhY2tJZCA9IHV0aWxzLmdsb2JhbEV2ZW50KGZ1bmN0aW9uKHN0cikge1xyXG5cclxuXHRcdFx0Ly8gVGhlIHJlc3BvbnNlSGFuZGxlciByZXR1cm5zIGEgc3RyaW5nLCBsZXRzIHNhdmUgdGhpcyBsb2NhbGx5XHJcblx0XHRcdHZhciBvYmo7XHJcblxyXG5cdFx0XHRpZiAoc3RyKSB7XHJcblx0XHRcdFx0b2JqID0gSlNPTi5wYXJzZShzdHIpO1xyXG5cdFx0XHR9XHJcblx0XHRcdGVsc2Uge1xyXG5cdFx0XHRcdG9iaiA9IGVycm9yKCdjYW5jZWxsZWQnLCAnVGhlIGF1dGhlbnRpY2F0aW9uIHdhcyBub3QgY29tcGxldGVkJyk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdC8vIEhhbmRsZSB0aGVzZSByZXNwb25zZSB1c2luZyB0aGUgbG9jYWxcclxuXHRcdFx0Ly8gVHJpZ2dlciBvbiB0aGUgcGFyZW50XHJcblx0XHRcdGlmICghb2JqLmVycm9yKSB7XHJcblxyXG5cdFx0XHRcdC8vIFNhdmUgb24gdGhlIHBhcmVudCB3aW5kb3cgdGhlIG5ldyBjcmVkZW50aWFsc1xyXG5cdFx0XHRcdC8vIFRoaXMgZml4ZXMgYW4gSUUxMCBidWcgaSB0aGluay4uLiBhdGxlYXN0IGl0IGRvZXMgZm9yIG1lLlxyXG5cdFx0XHRcdHV0aWxzLnN0b3JlKG9iai5uZXR3b3JrLCBvYmopO1xyXG5cclxuXHRcdFx0XHQvLyBGdWxmaWxsIGEgc3VjY2Vzc2Z1bCBsb2dpblxyXG5cdFx0XHRcdHByb21pc2UuZnVsZmlsbCh7XHJcblx0XHRcdFx0XHRuZXR3b3JrOiBvYmoubmV0d29yayxcclxuXHRcdFx0XHRcdGF1dGhSZXNwb25zZTogb2JqXHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdH1cclxuXHRcdFx0ZWxzZSB7XHJcblx0XHRcdFx0Ly8gUmVqZWN0IGEgc3VjY2Vzc2Z1bCBsb2dpblxyXG5cdFx0XHRcdHByb21pc2UucmVqZWN0KG9iaik7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cclxuXHRcdHZhciByZWRpcmVjdFVyaSA9IHV0aWxzLnVybChvcHRzLnJlZGlyZWN0X3VyaSkuaHJlZjtcclxuXHJcblx0XHQvLyBNYXkgYmUgYSBzcGFjZS1kZWxpbWl0ZWQgbGlzdCBvZiBtdWx0aXBsZSwgY29tcGxlbWVudGFyeSB0eXBlc1xyXG5cdFx0dmFyIHJlc3BvbnNlVHlwZSA9IHByb3ZpZGVyLm9hdXRoLnJlc3BvbnNlX3R5cGUgfHwgb3B0cy5yZXNwb25zZV90eXBlO1xyXG5cclxuXHRcdC8vIEZhbGxiYWNrIHRvIHRva2VuIGlmIHRoZSBtb2R1bGUgaGFzbid0IGRlZmluZWQgYSBncmFudCB1cmxcclxuXHRcdGlmICgvXFxiY29kZVxcYi8udGVzdChyZXNwb25zZVR5cGUpICYmICFwcm92aWRlci5vYXV0aC5ncmFudCkge1xyXG5cdFx0XHRyZXNwb25zZVR5cGUgPSByZXNwb25zZVR5cGUucmVwbGFjZSgvXFxiY29kZVxcYi8sICd0b2tlbicpO1xyXG5cdFx0fVxyXG5cclxuXHRcdC8vIFF1ZXJ5IHN0cmluZyBwYXJhbWV0ZXJzLCB3ZSBtYXkgcGFzcyBvdXIgb3duIGFyZ3VtZW50cyB0byBmb3JtIHRoZSBxdWVyeXN0cmluZ1xyXG5cdFx0cC5xcyA9IHV0aWxzLm1lcmdlKHFzLCB7XHJcblx0XHRcdGNsaWVudF9pZDogZW5jb2RlVVJJQ29tcG9uZW50KHByb3ZpZGVyLmlkKSxcclxuXHRcdFx0cmVzcG9uc2VfdHlwZTogZW5jb2RlVVJJQ29tcG9uZW50KHJlc3BvbnNlVHlwZSksXHJcblx0XHRcdHJlZGlyZWN0X3VyaTogZW5jb2RlVVJJQ29tcG9uZW50KHJlZGlyZWN0VXJpKSxcclxuXHRcdFx0c3RhdGU6IHtcclxuXHRcdFx0XHRjbGllbnRfaWQ6IHByb3ZpZGVyLmlkLFxyXG5cdFx0XHRcdG5ldHdvcms6IHAubmV0d29yayxcclxuXHRcdFx0XHRkaXNwbGF5OiBvcHRzLmRpc3BsYXksXHJcblx0XHRcdFx0Y2FsbGJhY2s6IGNhbGxiYWNrSWQsXHJcblx0XHRcdFx0c3RhdGU6IG9wdHMuc3RhdGUsXHJcblx0XHRcdFx0cmVkaXJlY3RfdXJpOiByZWRpcmVjdFVyaVxyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHJcblx0XHQvLyBHZXQgY3VycmVudCBzZXNzaW9uIGZvciBtZXJnaW5nIHNjb3BlcywgYW5kIGZvciBxdWljayBhdXRoIHJlc3BvbnNlXHJcblx0XHR2YXIgc2Vzc2lvbiA9IHV0aWxzLnN0b3JlKHAubmV0d29yayk7XHJcblxyXG5cdFx0Ly8gU2NvcGVzIChhdXRoZW50aWNhdGlvbiBwZXJtaXNpb25zKVxyXG5cdFx0Ly8gRW5zdXJlIHRoaXMgaXMgYSBzdHJpbmcgLSBJRSBoYXMgYSBwcm9ibGVtIG1vdmluZyBBcnJheXMgYmV0d2VlbiB3aW5kb3dzXHJcblx0XHQvLyBBcHBlbmQgdGhlIHNldHVwIHNjb3BlXHJcblx0XHR2YXIgU0NPUEVfU1BMSVQgPSAvWyxcXHNdKy87XHJcblxyXG5cdFx0Ly8gSW5jbHVkZSBkZWZhdWx0IHNjb3BlIHNldHRpbmdzIChjbG9uZWQpLlxyXG5cdFx0dmFyIHNjb3BlID0gX3RoaXMuc2V0dGluZ3Muc2NvcGUgPyBbX3RoaXMuc2V0dGluZ3Muc2NvcGUudG9TdHJpbmcoKV0gOiBbXTtcclxuXHJcblx0XHQvLyBFeHRlbmQgdGhlIHByb3ZpZGVycyBzY29wZSBsaXN0IHdpdGggdGhlIGRlZmF1bHRcclxuXHRcdHZhciBzY29wZU1hcCA9IHV0aWxzLm1lcmdlKF90aGlzLnNldHRpbmdzLnNjb3BlX21hcCwgcHJvdmlkZXIuc2NvcGUgfHwge30pO1xyXG5cclxuXHRcdC8vIEFkZCB1c2VyIGRlZmluZWQgc2NvcGVzLi4uXHJcblx0XHRpZiAob3B0cy5zY29wZSkge1xyXG5cdFx0XHRzY29wZS5wdXNoKG9wdHMuc2NvcGUudG9TdHJpbmcoKSk7XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gQXBwZW5kIHNjb3BlcyBmcm9tIGEgcHJldmlvdXMgc2Vzc2lvbi5cclxuXHRcdC8vIFRoaXMgaGVscHMga2VlcCBhcHAgY3JlZGVudGlhbHMgY29uc3RhbnQsXHJcblx0XHQvLyBBdm9pZGluZyBoYXZpbmcgdG8ga2VlcCB0YWJzIG9uIHdoYXQgc2NvcGVzIGFyZSBhdXRob3JpemVkXHJcblx0XHRpZiAoc2Vzc2lvbiAmJiAnc2NvcGUnIGluIHNlc3Npb24gJiYgc2Vzc2lvbi5zY29wZSBpbnN0YW5jZW9mIFN0cmluZykge1xyXG5cdFx0XHRzY29wZS5wdXNoKHNlc3Npb24uc2NvcGUpO1xyXG5cdFx0fVxyXG5cclxuXHRcdC8vIEpvaW4gYW5kIFNwbGl0IGFnYWluXHJcblx0XHRzY29wZSA9IHNjb3BlLmpvaW4oJywnKS5zcGxpdChTQ09QRV9TUExJVCk7XHJcblxyXG5cdFx0Ly8gRm9ybWF0IHJlbW92ZSBkdXBsaWNhdGVzIGFuZCBlbXB0eSB2YWx1ZXNcclxuXHRcdHNjb3BlID0gdXRpbHMudW5pcXVlKHNjb3BlKS5maWx0ZXIoZmlsdGVyRW1wdHkpO1xyXG5cclxuXHRcdC8vIFNhdmUgdGhlIHRoZSBzY29wZXMgdG8gdGhlIHN0YXRlIHdpdGggdGhlIG5hbWVzIHRoYXQgdGhleSB3ZXJlIHJlcXVlc3RlZCB3aXRoLlxyXG5cdFx0cC5xcy5zdGF0ZS5zY29wZSA9IHNjb3BlLmpvaW4oJywnKTtcclxuXHJcblx0XHQvLyBNYXAgc2NvcGVzIHRvIHRoZSBwcm92aWRlcnMgbmFtaW5nIGNvbnZlbnRpb25cclxuXHRcdHNjb3BlID0gc2NvcGUubWFwKGZ1bmN0aW9uKGl0ZW0pIHtcclxuXHRcdFx0Ly8gRG9lcyB0aGlzIGhhdmUgYSBtYXBwaW5nP1xyXG5cdFx0XHRyZXR1cm4gKGl0ZW0gaW4gc2NvcGVNYXApID8gc2NvcGVNYXBbaXRlbV0gOiBpdGVtO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0Ly8gU3RyaW5naWZ5IGFuZCBBcnJheWlmeSBzbyB0aGF0IGRvdWJsZSBtYXBwZWQgc2NvcGVzIGFyZSBnaXZlbiB0aGUgY2hhbmNlIHRvIGJlIGZvcm1hdHRlZFxyXG5cdFx0c2NvcGUgPSBzY29wZS5qb2luKCcsJykuc3BsaXQoU0NPUEVfU1BMSVQpO1xyXG5cclxuXHRcdC8vIEFnYWluLi4uXHJcblx0XHQvLyBGb3JtYXQgcmVtb3ZlIGR1cGxpY2F0ZXMgYW5kIGVtcHR5IHZhbHVlc1xyXG5cdFx0c2NvcGUgPSB1dGlscy51bmlxdWUoc2NvcGUpLmZpbHRlcihmaWx0ZXJFbXB0eSk7XHJcblxyXG5cdFx0Ly8gSm9pbiB3aXRoIHRoZSBleHBlY3RlZCBzY29wZSBkZWxpbWl0ZXIgaW50byBhIHN0cmluZ1xyXG5cdFx0cC5xcy5zY29wZSA9IHNjb3BlLmpvaW4ocHJvdmlkZXIuc2NvcGVfZGVsaW0gfHwgJywnKTtcclxuXHJcblx0XHQvLyBJcyB0aGUgdXNlciBhbHJlYWR5IHNpZ25lZCBpbiB3aXRoIHRoZSBhcHByb3ByaWF0ZSBzY29wZXMsIHZhbGlkIGFjY2Vzc190b2tlbj9cclxuXHRcdGlmIChvcHRzLmZvcmNlID09PSBmYWxzZSkge1xyXG5cclxuXHRcdFx0aWYgKHNlc3Npb24gJiYgJ2FjY2Vzc190b2tlbicgaW4gc2Vzc2lvbiAmJiBzZXNzaW9uLmFjY2Vzc190b2tlbiAmJiAnZXhwaXJlcycgaW4gc2Vzc2lvbiAmJiBzZXNzaW9uLmV4cGlyZXMgPiAoKG5ldyBEYXRlKCkpLmdldFRpbWUoKSAvIDFlMykpIHtcclxuXHRcdFx0XHQvLyBXaGF0IGlzIGRpZmZlcmVudCBhYm91dCB0aGUgc2NvcGVzIGluIHRoZSBzZXNzaW9uIHZzIHRoZSBzY29wZXMgaW4gdGhlIG5ldyBsb2dpbj9cclxuXHRcdFx0XHR2YXIgZGlmZiA9IHV0aWxzLmRpZmYoKHNlc3Npb24uc2NvcGUgfHwgJycpLnNwbGl0KFNDT1BFX1NQTElUKSwgKHAucXMuc3RhdGUuc2NvcGUgfHwgJycpLnNwbGl0KFNDT1BFX1NQTElUKSk7XHJcblx0XHRcdFx0aWYgKGRpZmYubGVuZ3RoID09PSAwKSB7XHJcblxyXG5cdFx0XHRcdFx0Ly8gT0sgdHJpZ2dlciB0aGUgY2FsbGJhY2tcclxuXHRcdFx0XHRcdHByb21pc2UuZnVsZmlsbCh7XHJcblx0XHRcdFx0XHRcdHVuY2hhbmdlZDogdHJ1ZSxcclxuXHRcdFx0XHRcdFx0bmV0d29yazogcC5uZXR3b3JrLFxyXG5cdFx0XHRcdFx0XHRhdXRoUmVzcG9uc2U6IHNlc3Npb25cclxuXHRcdFx0XHRcdH0pO1xyXG5cclxuXHRcdFx0XHRcdC8vIE5vdGhpbmcgaGFzIGNoYW5nZWRcclxuXHRcdFx0XHRcdHJldHVybiBwcm9taXNlO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdC8vIFBhZ2UgVVJMXHJcblx0XHRpZiAob3B0cy5kaXNwbGF5ID09PSAncGFnZScgJiYgb3B0cy5wYWdlX3VyaSkge1xyXG5cdFx0XHQvLyBBZGQgYSBwYWdlIGxvY2F0aW9uLCBwbGFjZSB0byBlbmR1cCBhZnRlciBzZXNzaW9uIGhhcyBhdXRoZW50aWNhdGVkXHJcblx0XHRcdHAucXMuc3RhdGUucGFnZV91cmkgPSB1dGlscy51cmwob3B0cy5wYWdlX3VyaSkuaHJlZjtcclxuXHRcdH1cclxuXHJcblx0XHQvLyBCZXNwb2tlXHJcblx0XHQvLyBPdmVycmlkZSBsb2dpbiBxdWVyeXN0cmluZ3MgZnJvbSBhdXRoX29wdGlvbnNcclxuXHRcdGlmICgnbG9naW4nIGluIHByb3ZpZGVyICYmIHR5cGVvZiAocHJvdmlkZXIubG9naW4pID09PSAnZnVuY3Rpb24nKSB7XHJcblx0XHRcdC8vIEZvcm1hdCB0aGUgcGFyYW1hdGVycyBhY2NvcmRpbmcgdG8gdGhlIHByb3ZpZGVycyBmb3JtYXR0aW5nIGZ1bmN0aW9uXHJcblx0XHRcdHByb3ZpZGVyLmxvZ2luKHApO1xyXG5cdFx0fVxyXG5cclxuXHRcdC8vIEFkZCBPQXV0aCB0byBzdGF0ZVxyXG5cdFx0Ly8gV2hlcmUgdGhlIHNlcnZpY2UgaXMgZ29pbmcgdG8gdGFrZSBhZHZhbnRhZ2Ugb2YgdGhlIG9hdXRoX3Byb3h5XHJcblx0XHRpZiAoIS9cXGJ0b2tlblxcYi8udGVzdChyZXNwb25zZVR5cGUpIHx8XHJcblx0XHRwYXJzZUludChwcm92aWRlci5vYXV0aC52ZXJzaW9uLCAxMCkgPCAyIHx8XHJcblx0XHQob3B0cy5kaXNwbGF5ID09PSAnbm9uZScgJiYgcHJvdmlkZXIub2F1dGguZ3JhbnQgJiYgc2Vzc2lvbiAmJiBzZXNzaW9uLnJlZnJlc2hfdG9rZW4pKSB7XHJcblxyXG5cdFx0XHQvLyBBZGQgdGhlIG9hdXRoIGVuZHBvaW50c1xyXG5cdFx0XHRwLnFzLnN0YXRlLm9hdXRoID0gcHJvdmlkZXIub2F1dGg7XHJcblxyXG5cdFx0XHQvLyBBZGQgdGhlIHByb3h5IHVybFxyXG5cdFx0XHRwLnFzLnN0YXRlLm9hdXRoX3Byb3h5ID0gb3B0cy5vYXV0aF9wcm94eTtcclxuXHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gQ29udmVydCBzdGF0ZSB0byBhIHN0cmluZ1xyXG5cdFx0cC5xcy5zdGF0ZSA9IGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShwLnFzLnN0YXRlKSk7XHJcblxyXG5cdFx0Ly8gVVJMXHJcblx0XHRpZiAocGFyc2VJbnQocHJvdmlkZXIub2F1dGgudmVyc2lvbiwgMTApID09PSAxKSB7XHJcblxyXG5cdFx0XHQvLyBUdXJuIHRoZSByZXF1ZXN0IHRvIHRoZSBPQXV0aCBQcm94eSBmb3IgMy1sZWdnZWQgYXV0aFxyXG5cdFx0XHR1cmwgPSB1dGlscy5xcyhvcHRzLm9hdXRoX3Byb3h5LCBwLnFzLCBlbmNvZGVGdW5jdGlvbik7XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gUmVmcmVzaCB0b2tlblxyXG5cdFx0ZWxzZSBpZiAob3B0cy5kaXNwbGF5ID09PSAnbm9uZScgJiYgcHJvdmlkZXIub2F1dGguZ3JhbnQgJiYgc2Vzc2lvbiAmJiBzZXNzaW9uLnJlZnJlc2hfdG9rZW4pIHtcclxuXHJcblx0XHRcdC8vIEFkZCB0aGUgcmVmcmVzaF90b2tlbiB0byB0aGUgcmVxdWVzdFxyXG5cdFx0XHRwLnFzLnJlZnJlc2hfdG9rZW4gPSBzZXNzaW9uLnJlZnJlc2hfdG9rZW47XHJcblxyXG5cdFx0XHQvLyBEZWZpbmUgdGhlIHJlcXVlc3QgcGF0aFxyXG5cdFx0XHR1cmwgPSB1dGlscy5xcyhvcHRzLm9hdXRoX3Byb3h5LCBwLnFzLCBlbmNvZGVGdW5jdGlvbik7XHJcblx0XHR9XHJcblx0XHRlbHNlIHtcclxuXHRcdFx0dXJsID0gdXRpbHMucXMocHJvdmlkZXIub2F1dGguYXV0aCwgcC5xcywgZW5jb2RlRnVuY3Rpb24pO1xyXG5cdFx0fVxyXG5cclxuXHRcdC8vIEJyb2FkY2FzdCB0aGlzIGV2ZW50IGFzIGFuIGF1dGg6aW5pdFxyXG5cdFx0ZW1pdCgnYXV0aC5pbml0JywgcCk7XHJcblxyXG5cdFx0Ly8gRXhlY3V0ZVxyXG5cdFx0Ly8gVHJpZ2dlciBob3cgd2Ugd2FudCBzZWxmIGRpc3BsYXllZFxyXG5cdFx0aWYgKG9wdHMuZGlzcGxheSA9PT0gJ25vbmUnKSB7XHJcblx0XHRcdC8vIFNpZ24taW4gaW4gdGhlIGJhY2tncm91bmQsIGlmcmFtZVxyXG5cdFx0XHR1dGlscy5pZnJhbWUodXJsLCByZWRpcmVjdFVyaSk7XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gVHJpZ2dlcmluZyBwb3B1cD9cclxuXHRcdGVsc2UgaWYgKG9wdHMuZGlzcGxheSA9PT0gJ3BvcHVwJykge1xyXG5cclxuXHRcdFx0dmFyIHBvcHVwID0gdXRpbHMucG9wdXAodXJsLCByZWRpcmVjdFVyaSwgb3B0cy5wb3B1cCk7XHJcblxyXG5cdFx0XHR2YXIgdGltZXIgPSBzZXRJbnRlcnZhbChmdW5jdGlvbigpIHtcclxuXHRcdFx0XHRpZiAoIXBvcHVwIHx8IHBvcHVwLmNsb3NlZCkge1xyXG5cdFx0XHRcdFx0Y2xlYXJJbnRlcnZhbCh0aW1lcik7XHJcblx0XHRcdFx0XHRpZiAoIXByb21pc2Uuc3RhdGUpIHtcclxuXHJcblx0XHRcdFx0XHRcdHZhciByZXNwb25zZSA9IGVycm9yKCdjYW5jZWxsZWQnLCAnTG9naW4gaGFzIGJlZW4gY2FuY2VsbGVkJyk7XHJcblxyXG5cdFx0XHRcdFx0XHRpZiAoIXBvcHVwKSB7XHJcblx0XHRcdFx0XHRcdFx0cmVzcG9uc2UgPSBlcnJvcignYmxvY2tlZCcsICdQb3B1cCB3YXMgYmxvY2tlZCcpO1xyXG5cdFx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0XHRyZXNwb25zZS5uZXR3b3JrID0gcC5uZXR3b3JrO1xyXG5cclxuXHRcdFx0XHRcdFx0cHJvbWlzZS5yZWplY3QocmVzcG9uc2UpO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSwgMTAwKTtcclxuXHRcdH1cclxuXHJcblx0XHRlbHNlIHtcclxuXHRcdFx0d2luZG93LmxvY2F0aW9uID0gdXJsO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBwcm9taXNlLnByb3h5O1xyXG5cclxuXHRcdGZ1bmN0aW9uIGVuY29kZUZ1bmN0aW9uKHMpIHtyZXR1cm4gczt9XHJcblxyXG5cdFx0ZnVuY3Rpb24gZmlsdGVyRW1wdHkocykge3JldHVybiAhIXM7fVxyXG5cdH0sXHJcblxyXG5cdC8vIFJlbW92ZSBhbnkgZGF0YSBhc3NvY2lhdGVkIHdpdGggYSBnaXZlbiBzZXJ2aWNlXHJcblx0Ly8gQHBhcmFtIHN0cmluZyBuYW1lIG9mIHRoZSBzZXJ2aWNlXHJcblx0Ly8gQHBhcmFtIGZ1bmN0aW9uIGNhbGxiYWNrXHJcblx0bG9nb3V0OiBmdW5jdGlvbigpIHtcclxuXHJcblx0XHR2YXIgX3RoaXMgPSB0aGlzO1xyXG5cdFx0dmFyIHV0aWxzID0gX3RoaXMudXRpbHM7XHJcblx0XHR2YXIgZXJyb3IgPSB1dGlscy5lcnJvcjtcclxuXHJcblx0XHQvLyBDcmVhdGUgYSBuZXcgcHJvbWlzZVxyXG5cdFx0dmFyIHByb21pc2UgPSB1dGlscy5Qcm9taXNlKCk7XHJcblxyXG5cdFx0dmFyIHAgPSB1dGlscy5hcmdzKHtuYW1lOidzJywgb3B0aW9uczogJ28nLCBjYWxsYmFjazogJ2YnfSwgYXJndW1lbnRzKTtcclxuXHJcblx0XHRwLm9wdGlvbnMgPSBwLm9wdGlvbnMgfHwge307XHJcblxyXG5cdFx0Ly8gQWRkIGNhbGxiYWNrIHRvIGV2ZW50c1xyXG5cdFx0cHJvbWlzZS5wcm94eS50aGVuKHAuY2FsbGJhY2ssIHAuY2FsbGJhY2spO1xyXG5cclxuXHRcdC8vIFRyaWdnZXIgYW4gZXZlbnQgb24gdGhlIGdsb2JhbCBsaXN0ZW5lclxyXG5cdFx0ZnVuY3Rpb24gZW1pdChzLCB2YWx1ZSkge1xyXG5cdFx0XHRoZWxsby5lbWl0KHMsIHZhbHVlKTtcclxuXHRcdH1cclxuXHJcblx0XHRwcm9taXNlLnByb3h5LnRoZW4oZW1pdC5iaW5kKHRoaXMsICdhdXRoLmxvZ291dCBhdXRoJyksIGVtaXQuYmluZCh0aGlzLCAnZXJyb3InKSk7XHJcblxyXG5cdFx0Ly8gTmV0d29ya1xyXG5cdFx0cC5uYW1lID0gcC5uYW1lIHx8IHRoaXMuc2V0dGluZ3MuZGVmYXVsdF9zZXJ2aWNlO1xyXG5cdFx0cC5hdXRoUmVzcG9uc2UgPSB1dGlscy5zdG9yZShwLm5hbWUpO1xyXG5cclxuXHRcdGlmIChwLm5hbWUgJiYgIShwLm5hbWUgaW4gX3RoaXMuc2VydmljZXMpKSB7XHJcblxyXG5cdFx0XHRwcm9taXNlLnJlamVjdChlcnJvcignaW52YWxpZF9uZXR3b3JrJywgJ1RoZSBuZXR3b3JrIHdhcyB1bnJlY29nbml6ZWQnKSk7XHJcblxyXG5cdFx0fVxyXG5cdFx0ZWxzZSBpZiAocC5uYW1lICYmIHAuYXV0aFJlc3BvbnNlKSB7XHJcblxyXG5cdFx0XHQvLyBEZWZpbmUgdGhlIGNhbGxiYWNrXHJcblx0XHRcdHZhciBjYWxsYmFjayA9IGZ1bmN0aW9uKG9wdHMpIHtcclxuXHJcblx0XHRcdFx0Ly8gUmVtb3ZlIGZyb20gdGhlIHN0b3JlXHJcblx0XHRcdFx0dXRpbHMuc3RvcmUocC5uYW1lLCBudWxsKTtcclxuXHJcblx0XHRcdFx0Ly8gRW1pdCBldmVudHMgYnkgZGVmYXVsdFxyXG5cdFx0XHRcdHByb21pc2UuZnVsZmlsbChoZWxsby51dGlscy5tZXJnZSh7bmV0d29yazpwLm5hbWV9LCBvcHRzIHx8IHt9KSk7XHJcblx0XHRcdH07XHJcblxyXG5cdFx0XHQvLyBSdW4gYW4gYXN5bmMgb3BlcmF0aW9uIHRvIHJlbW92ZSB0aGUgdXNlcnMgc2Vzc2lvblxyXG5cdFx0XHR2YXIgX29wdHMgPSB7fTtcclxuXHRcdFx0aWYgKHAub3B0aW9ucy5mb3JjZSkge1xyXG5cdFx0XHRcdHZhciBsb2dvdXQgPSBfdGhpcy5zZXJ2aWNlc1twLm5hbWVdLmxvZ291dDtcclxuXHRcdFx0XHRpZiAobG9nb3V0KSB7XHJcblx0XHRcdFx0XHQvLyBDb252ZXJ0IGxvZ291dCB0byBVUkwgc3RyaW5nLFxyXG5cdFx0XHRcdFx0Ly8gSWYgbm8gc3RyaW5nIGlzIHJldHVybmVkLCB0aGVuIHRoaXMgZnVuY3Rpb24gd2lsbCBoYW5kbGUgdGhlIGxvZ291dCBhc3luYyBzdHlsZVxyXG5cdFx0XHRcdFx0aWYgKHR5cGVvZiAobG9nb3V0KSA9PT0gJ2Z1bmN0aW9uJykge1xyXG5cdFx0XHRcdFx0XHRsb2dvdXQgPSBsb2dvdXQoY2FsbGJhY2ssIHApO1xyXG5cdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdC8vIElmIGxvZ291dCBpcyBhIHN0cmluZyB0aGVuIGFzc3VtZSBVUkwgYW5kIG9wZW4gaW4gaWZyYW1lLlxyXG5cdFx0XHRcdFx0aWYgKHR5cGVvZiAobG9nb3V0KSA9PT0gJ3N0cmluZycpIHtcclxuXHRcdFx0XHRcdFx0dXRpbHMuaWZyYW1lKGxvZ291dCk7XHJcblx0XHRcdFx0XHRcdF9vcHRzLmZvcmNlID0gbnVsbDtcclxuXHRcdFx0XHRcdFx0X29wdHMubWVzc2FnZSA9ICdMb2dvdXQgc3VjY2VzcyBvbiBwcm92aWRlcnMgc2l0ZSB3YXMgaW5kZXRlcm1pbmF0ZSc7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRlbHNlIGlmIChsb2dvdXQgPT09IHVuZGVmaW5lZCkge1xyXG5cdFx0XHRcdFx0XHQvLyBUaGUgY2FsbGJhY2sgZnVuY3Rpb24gd2lsbCBoYW5kbGUgdGhlIHJlc3BvbnNlLlxyXG5cdFx0XHRcdFx0XHRyZXR1cm4gcHJvbWlzZS5wcm94eTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdC8vIFJlbW92ZSBsb2NhbCBjcmVkZW50aWFsc1xyXG5cdFx0XHRjYWxsYmFjayhfb3B0cyk7XHJcblx0XHR9XHJcblx0XHRlbHNlIHtcclxuXHRcdFx0cHJvbWlzZS5yZWplY3QoZXJyb3IoJ2ludmFsaWRfc2Vzc2lvbicsICdUaGVyZSB3YXMgbm8gc2Vzc2lvbiB0byByZW1vdmUnKSk7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIHByb21pc2UucHJveHk7XHJcblx0fSxcclxuXHJcblx0Ly8gUmV0dXJucyBhbGwgdGhlIHNlc3Npb25zIHRoYXQgYXJlIHN1YnNjcmliZWQgdG9vXHJcblx0Ly8gQHBhcmFtIHN0cmluZyBvcHRpb25hbCwgbmFtZSBvZiB0aGUgc2VydmljZSB0byBnZXQgaW5mb3JtYXRpb24gYWJvdXQuXHJcblx0Z2V0QXV0aFJlc3BvbnNlOiBmdW5jdGlvbihzZXJ2aWNlKSB7XHJcblxyXG5cdFx0Ly8gSWYgdGhlIHNlcnZpY2UgZG9lc24ndCBleGlzdFxyXG5cdFx0c2VydmljZSA9IHNlcnZpY2UgfHwgdGhpcy5zZXR0aW5ncy5kZWZhdWx0X3NlcnZpY2U7XHJcblxyXG5cdFx0aWYgKCFzZXJ2aWNlIHx8ICEoc2VydmljZSBpbiB0aGlzLnNlcnZpY2VzKSkge1xyXG5cdFx0XHRyZXR1cm4gbnVsbDtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gdGhpcy51dGlscy5zdG9yZShzZXJ2aWNlKSB8fCBudWxsO1xyXG5cdH0sXHJcblxyXG5cdC8vIEV2ZW50czogcGxhY2Vob2xkZXIgZm9yIHRoZSBldmVudHNcclxuXHRldmVudHM6IHt9XHJcbn0pO1xyXG5cclxuLy8gQ29yZSB1dGlsaXRpZXNcclxuaGVsbG8udXRpbHMuZXh0ZW5kKGhlbGxvLnV0aWxzLCB7XHJcblxyXG5cdC8vIEVycm9yXHJcblx0ZXJyb3I6IGZ1bmN0aW9uKGNvZGUsIG1lc3NhZ2UpIHtcclxuXHRcdHJldHVybiB7XHJcblx0XHRcdGVycm9yOiB7XHJcblx0XHRcdFx0Y29kZTogY29kZSxcclxuXHRcdFx0XHRtZXNzYWdlOiBtZXNzYWdlXHJcblx0XHRcdH1cclxuXHRcdH07XHJcblx0fSxcclxuXHJcblx0Ly8gQXBwZW5kIHRoZSBxdWVyeXN0cmluZyB0byBhIHVybFxyXG5cdC8vIEBwYXJhbSBzdHJpbmcgdXJsXHJcblx0Ly8gQHBhcmFtIG9iamVjdCBwYXJhbWV0ZXJzXHJcblx0cXM6IGZ1bmN0aW9uKHVybCwgcGFyYW1zLCBmb3JtYXRGdW5jdGlvbikge1xyXG5cclxuXHRcdGlmIChwYXJhbXMpIHtcclxuXHJcblx0XHRcdC8vIFNldCBkZWZhdWx0IGZvcm1hdHRpbmcgZnVuY3Rpb25cclxuXHRcdFx0Zm9ybWF0RnVuY3Rpb24gPSBmb3JtYXRGdW5jdGlvbiB8fCBlbmNvZGVVUklDb21wb25lbnQ7XHJcblxyXG5cdFx0XHQvLyBPdmVycmlkZSB0aGUgaXRlbXMgaW4gdGhlIFVSTCB3aGljaCBhbHJlYWR5IGV4aXN0XHJcblx0XHRcdGZvciAodmFyIHggaW4gcGFyYW1zKSB7XHJcblx0XHRcdFx0dmFyIHN0ciA9ICcoW1xcXFw/XFxcXCZdKScgKyB4ICsgJz1bXlxcXFwmXSonO1xyXG5cdFx0XHRcdHZhciByZWcgPSBuZXcgUmVnRXhwKHN0cik7XHJcblx0XHRcdFx0aWYgKHVybC5tYXRjaChyZWcpKSB7XHJcblx0XHRcdFx0XHR1cmwgPSB1cmwucmVwbGFjZShyZWcsICckMScgKyB4ICsgJz0nICsgZm9ybWF0RnVuY3Rpb24ocGFyYW1zW3hdKSk7XHJcblx0XHRcdFx0XHRkZWxldGUgcGFyYW1zW3hdO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdGlmICghdGhpcy5pc0VtcHR5KHBhcmFtcykpIHtcclxuXHRcdFx0cmV0dXJuIHVybCArICh1cmwuaW5kZXhPZignPycpID4gLTEgPyAnJicgOiAnPycpICsgdGhpcy5wYXJhbShwYXJhbXMsIGZvcm1hdEZ1bmN0aW9uKTtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gdXJsO1xyXG5cdH0sXHJcblxyXG5cdC8vIFBhcmFtXHJcblx0Ly8gRXhwbG9kZS9lbmNvZGUgdGhlIHBhcmFtZXRlcnMgb2YgYW4gVVJMIHN0cmluZy9vYmplY3RcclxuXHQvLyBAcGFyYW0gc3RyaW5nIHMsIHN0cmluZyB0byBkZWNvZGVcclxuXHRwYXJhbTogZnVuY3Rpb24ocywgZm9ybWF0RnVuY3Rpb24pIHtcclxuXHRcdHZhciBiO1xyXG5cdFx0dmFyIGEgPSB7fTtcclxuXHRcdHZhciBtO1xyXG5cclxuXHRcdGlmICh0eXBlb2YgKHMpID09PSAnc3RyaW5nJykge1xyXG5cclxuXHRcdFx0Zm9ybWF0RnVuY3Rpb24gPSBmb3JtYXRGdW5jdGlvbiB8fCBkZWNvZGVVUklDb21wb25lbnQ7XHJcblxyXG5cdFx0XHRtID0gcy5yZXBsYWNlKC9eW1xcI1xcP10vLCAnJykubWF0Y2goLyhbXj1cXC9cXCZdKyk9KFteXFwmXSspL2cpO1xyXG5cdFx0XHRpZiAobSkge1xyXG5cdFx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgbS5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHRcdFx0YiA9IG1baV0ubWF0Y2goLyhbXj1dKyk9KC4qKS8pO1xyXG5cdFx0XHRcdFx0YVtiWzFdXSA9IGZvcm1hdEZ1bmN0aW9uKGJbMl0pO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0cmV0dXJuIGE7XHJcblx0XHR9XHJcblx0XHRlbHNlIHtcclxuXHJcblx0XHRcdGZvcm1hdEZ1bmN0aW9uID0gZm9ybWF0RnVuY3Rpb24gfHwgZW5jb2RlVVJJQ29tcG9uZW50O1xyXG5cclxuXHRcdFx0dmFyIG8gPSBzO1xyXG5cclxuXHRcdFx0YSA9IFtdO1xyXG5cclxuXHRcdFx0Zm9yICh2YXIgeCBpbiBvKSB7aWYgKG8uaGFzT3duUHJvcGVydHkoeCkpIHtcclxuXHRcdFx0XHRpZiAoby5oYXNPd25Qcm9wZXJ0eSh4KSkge1xyXG5cdFx0XHRcdFx0YS5wdXNoKFt4LCBvW3hdID09PSAnPycgPyAnPycgOiBmb3JtYXRGdW5jdGlvbihvW3hdKV0uam9pbignPScpKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH19XHJcblxyXG5cdFx0XHRyZXR1cm4gYS5qb2luKCcmJyk7XHJcblx0XHR9XHJcblx0fSxcclxuXHJcblx0Ly8gTG9jYWwgc3RvcmFnZSBmYWNhZGVcclxuXHRzdG9yZTogKGZ1bmN0aW9uKCkge1xyXG5cclxuXHRcdHZhciBhID0gWydsb2NhbFN0b3JhZ2UnLCAnc2Vzc2lvblN0b3JhZ2UnXTtcclxuXHRcdHZhciBpID0gLTE7XHJcblx0XHR2YXIgcHJlZml4ID0gJ3Rlc3QnO1xyXG5cclxuXHRcdC8vIFNldCBMb2NhbFN0b3JhZ2VcclxuXHRcdHZhciBsb2NhbFN0b3JhZ2U7XHJcblxyXG5cdFx0d2hpbGUgKGFbKytpXSkge1xyXG5cdFx0XHR0cnkge1xyXG5cdFx0XHRcdC8vIEluIENocm9tZSB3aXRoIGNvb2tpZXMgYmxvY2tlZCwgY2FsbGluZyBsb2NhbFN0b3JhZ2UgdGhyb3dzIGFuIGVycm9yXHJcblx0XHRcdFx0bG9jYWxTdG9yYWdlID0gd2luZG93W2FbaV1dO1xyXG5cdFx0XHRcdGxvY2FsU3RvcmFnZS5zZXRJdGVtKHByZWZpeCArIGksIGkpO1xyXG5cdFx0XHRcdGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKHByZWZpeCArIGkpO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHR9XHJcblx0XHRcdGNhdGNoIChlKSB7XHJcblx0XHRcdFx0bG9jYWxTdG9yYWdlID0gbnVsbDtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdGlmICghbG9jYWxTdG9yYWdlKSB7XHJcblxyXG5cdFx0XHR2YXIgY2FjaGUgPSBudWxsO1xyXG5cclxuXHRcdFx0bG9jYWxTdG9yYWdlID0ge1xyXG5cdFx0XHRcdGdldEl0ZW06IGZ1bmN0aW9uKHByb3ApIHtcclxuXHRcdFx0XHRcdHByb3AgPSBwcm9wICsgJz0nO1xyXG5cdFx0XHRcdFx0dmFyIG0gPSBkb2N1bWVudC5jb29raWUuc3BsaXQoJzsnKTtcclxuXHRcdFx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgbS5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHRcdFx0XHR2YXIgX20gPSBtW2ldLnJlcGxhY2UoLyheXFxzK3xcXHMrJCkvLCAnJyk7XHJcblx0XHRcdFx0XHRcdGlmIChfbSAmJiBfbS5pbmRleE9mKHByb3ApID09PSAwKSB7XHJcblx0XHRcdFx0XHRcdFx0cmV0dXJuIF9tLnN1YnN0cihwcm9wLmxlbmd0aCk7XHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHRyZXR1cm4gY2FjaGU7XHJcblx0XHRcdFx0fSxcclxuXHJcblx0XHRcdFx0c2V0SXRlbTogZnVuY3Rpb24ocHJvcCwgdmFsdWUpIHtcclxuXHRcdFx0XHRcdGNhY2hlID0gdmFsdWU7XHJcblx0XHRcdFx0XHRkb2N1bWVudC5jb29raWUgPSBwcm9wICsgJz0nICsgdmFsdWU7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9O1xyXG5cclxuXHRcdFx0Ly8gRmlsbCB0aGUgY2FjaGUgdXBcclxuXHRcdFx0Y2FjaGUgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnaGVsbG8nKTtcclxuXHRcdH1cclxuXHJcblx0XHRmdW5jdGlvbiBnZXQoKSB7XHJcblx0XHRcdHZhciBqc29uID0ge307XHJcblx0XHRcdHRyeSB7XHJcblx0XHRcdFx0anNvbiA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2hlbGxvJykpIHx8IHt9O1xyXG5cdFx0XHR9XHJcblx0XHRcdGNhdGNoIChlKSB7fVxyXG5cclxuXHRcdFx0cmV0dXJuIGpzb247XHJcblx0XHR9XHJcblxyXG5cdFx0ZnVuY3Rpb24gc2V0KGpzb24pIHtcclxuXHRcdFx0bG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2hlbGxvJywgSlNPTi5zdHJpbmdpZnkoanNvbikpO1xyXG5cdFx0fVxyXG5cclxuXHRcdC8vIENoZWNrIGlmIHRoZSBicm93c2VyIHN1cHBvcnQgbG9jYWwgc3RvcmFnZVxyXG5cdFx0cmV0dXJuIGZ1bmN0aW9uKG5hbWUsIHZhbHVlLCBkYXlzKSB7XHJcblxyXG5cdFx0XHQvLyBMb2NhbCBzdG9yYWdlXHJcblx0XHRcdHZhciBqc29uID0gZ2V0KCk7XHJcblxyXG5cdFx0XHRpZiAobmFtZSAmJiB2YWx1ZSA9PT0gdW5kZWZpbmVkKSB7XHJcblx0XHRcdFx0cmV0dXJuIGpzb25bbmFtZV0gfHwgbnVsbDtcclxuXHRcdFx0fVxyXG5cdFx0XHRlbHNlIGlmIChuYW1lICYmIHZhbHVlID09PSBudWxsKSB7XHJcblx0XHRcdFx0dHJ5IHtcclxuXHRcdFx0XHRcdGRlbGV0ZSBqc29uW25hbWVdO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRjYXRjaCAoZSkge1xyXG5cdFx0XHRcdFx0anNvbltuYW1lXSA9IG51bGw7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHRcdGVsc2UgaWYgKG5hbWUpIHtcclxuXHRcdFx0XHRqc29uW25hbWVdID0gdmFsdWU7XHJcblx0XHRcdH1cclxuXHRcdFx0ZWxzZSB7XHJcblx0XHRcdFx0cmV0dXJuIGpzb247XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHNldChqc29uKTtcclxuXHJcblx0XHRcdHJldHVybiBqc29uIHx8IG51bGw7XHJcblx0XHR9O1xyXG5cclxuXHR9KSgpLFxyXG5cclxuXHQvLyBDcmVhdGUgYW5kIEFwcGVuZCBuZXcgRE9NIGVsZW1lbnRzXHJcblx0Ly8gQHBhcmFtIG5vZGUgc3RyaW5nXHJcblx0Ly8gQHBhcmFtIGF0dHIgb2JqZWN0IGxpdGVyYWxcclxuXHQvLyBAcGFyYW0gZG9tL3N0cmluZ1xyXG5cdGFwcGVuZDogZnVuY3Rpb24obm9kZSwgYXR0ciwgdGFyZ2V0KSB7XHJcblxyXG5cdFx0dmFyIG4gPSB0eXBlb2YgKG5vZGUpID09PSAnc3RyaW5nJyA/IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQobm9kZSkgOiBub2RlO1xyXG5cclxuXHRcdGlmICh0eXBlb2YgKGF0dHIpID09PSAnb2JqZWN0Jykge1xyXG5cdFx0XHRpZiAoJ3RhZ05hbWUnIGluIGF0dHIpIHtcclxuXHRcdFx0XHR0YXJnZXQgPSBhdHRyO1xyXG5cdFx0XHR9XHJcblx0XHRcdGVsc2Uge1xyXG5cdFx0XHRcdGZvciAodmFyIHggaW4gYXR0cikge2lmIChhdHRyLmhhc093blByb3BlcnR5KHgpKSB7XHJcblx0XHRcdFx0XHRpZiAodHlwZW9mIChhdHRyW3hdKSA9PT0gJ29iamVjdCcpIHtcclxuXHRcdFx0XHRcdFx0Zm9yICh2YXIgeSBpbiBhdHRyW3hdKSB7aWYgKGF0dHJbeF0uaGFzT3duUHJvcGVydHkoeSkpIHtcclxuXHRcdFx0XHRcdFx0XHRuW3hdW3ldID0gYXR0clt4XVt5XTtcclxuXHRcdFx0XHRcdFx0fX1cclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdGVsc2UgaWYgKHggPT09ICdodG1sJykge1xyXG5cdFx0XHRcdFx0XHRuLmlubmVySFRNTCA9IGF0dHJbeF07XHJcblx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0Ly8gSUUgZG9lc24ndCBsaWtlIHVzIHNldHRpbmcgbWV0aG9kcyB3aXRoIHNldEF0dHJpYnV0ZVxyXG5cdFx0XHRcdFx0ZWxzZSBpZiAoIS9eb24vLnRlc3QoeCkpIHtcclxuXHRcdFx0XHRcdFx0bi5zZXRBdHRyaWJ1dGUoeCwgYXR0clt4XSk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRlbHNlIHtcclxuXHRcdFx0XHRcdFx0blt4XSA9IGF0dHJbeF07XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fX1cclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdGlmICh0YXJnZXQgPT09ICdib2R5Jykge1xyXG5cdFx0XHQoZnVuY3Rpb24gc2VsZigpIHtcclxuXHRcdFx0XHRpZiAoZG9jdW1lbnQuYm9keSkge1xyXG5cdFx0XHRcdFx0ZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChuKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0ZWxzZSB7XHJcblx0XHRcdFx0XHRzZXRUaW1lb3V0KHNlbGYsIDE2KTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0pKCk7XHJcblx0XHR9XHJcblx0XHRlbHNlIGlmICh0eXBlb2YgKHRhcmdldCkgPT09ICdvYmplY3QnKSB7XHJcblx0XHRcdHRhcmdldC5hcHBlbmRDaGlsZChuKTtcclxuXHRcdH1cclxuXHRcdGVsc2UgaWYgKHR5cGVvZiAodGFyZ2V0KSA9PT0gJ3N0cmluZycpIHtcclxuXHRcdFx0ZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUodGFyZ2V0KVswXS5hcHBlbmRDaGlsZChuKTtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gbjtcclxuXHR9LFxyXG5cclxuXHQvLyBBbiBlYXN5IHdheSB0byBjcmVhdGUgYSBoaWRkZW4gaWZyYW1lXHJcblx0Ly8gQHBhcmFtIHN0cmluZyBzcmNcclxuXHRpZnJhbWU6IGZ1bmN0aW9uKHNyYykge1xyXG5cdFx0dGhpcy5hcHBlbmQoJ2lmcmFtZScsIHtzcmM6IHNyYywgc3R5bGU6IHtwb3NpdGlvbjonYWJzb2x1dGUnLCBsZWZ0OiAnLTEwMDBweCcsIGJvdHRvbTogMCwgaGVpZ2h0OiAnMXB4Jywgd2lkdGg6ICcxcHgnfX0sICdib2R5Jyk7XHJcblx0fSxcclxuXHJcblx0Ly8gUmVjdXJzaXZlIG1lcmdlIHR3byBvYmplY3RzIGludG8gb25lLCBzZWNvbmQgcGFyYW1ldGVyIG92ZXJpZGVzIHRoZSBmaXJzdFxyXG5cdC8vIEBwYXJhbSBhIGFycmF5XHJcblx0bWVyZ2U6IGZ1bmN0aW9uKC8qIEFyZ3M6IGEsIGIsIGMsIC4uIG4gKi8pIHtcclxuXHRcdHZhciBhcmdzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzKTtcclxuXHRcdGFyZ3MudW5zaGlmdCh7fSk7XHJcblx0XHRyZXR1cm4gdGhpcy5leHRlbmQuYXBwbHkobnVsbCwgYXJncyk7XHJcblx0fSxcclxuXHJcblx0Ly8gTWFrZXMgaXQgZWFzaWVyIHRvIGFzc2lnbiBwYXJhbWV0ZXJzLCB3aGVyZSBzb21lIGFyZSBvcHRpb25hbFxyXG5cdC8vIEBwYXJhbSBvIG9iamVjdFxyXG5cdC8vIEBwYXJhbSBhIGFyZ3VtZW50c1xyXG5cdGFyZ3M6IGZ1bmN0aW9uKG8sIGFyZ3MpIHtcclxuXHJcblx0XHR2YXIgcCA9IHt9O1xyXG5cdFx0dmFyIGkgPSAwO1xyXG5cdFx0dmFyIHQgPSBudWxsO1xyXG5cdFx0dmFyIHggPSBudWxsO1xyXG5cclxuXHRcdC8vICd4JyBpcyB0aGUgZmlyc3Qga2V5IGluIHRoZSBsaXN0IG9mIG9iamVjdCBwYXJhbWV0ZXJzXHJcblx0XHRmb3IgKHggaW4gbykge2lmIChvLmhhc093blByb3BlcnR5KHgpKSB7XHJcblx0XHRcdGJyZWFrO1xyXG5cdFx0fX1cclxuXHJcblx0XHQvLyBQYXNzaW5nIGluIGhhc2ggb2JqZWN0IG9mIGFyZ3VtZW50cz9cclxuXHRcdC8vIFdoZXJlIHRoZSBmaXJzdCBhcmd1bWVudCBjYW4ndCBiZSBhbiBvYmplY3RcclxuXHRcdGlmICgoYXJncy5sZW5ndGggPT09IDEpICYmICh0eXBlb2YgKGFyZ3NbMF0pID09PSAnb2JqZWN0JykgJiYgb1t4XSAhPSAnbyEnKSB7XHJcblxyXG5cdFx0XHQvLyBDb3VsZCB0aGlzIG9iamVjdCBzdGlsbCBiZWxvbmcgdG8gYSBwcm9wZXJ0eT9cclxuXHRcdFx0Ly8gQ2hlY2sgdGhlIG9iamVjdCBrZXlzIGlmIHRoZXkgbWF0Y2ggYW55IG9mIHRoZSBwcm9wZXJ0eSBrZXlzXHJcblx0XHRcdGZvciAoeCBpbiBhcmdzWzBdKSB7aWYgKG8uaGFzT3duUHJvcGVydHkoeCkpIHtcclxuXHRcdFx0XHQvLyBEb2VzIHRoaXMga2V5IGV4aXN0IGluIHRoZSBwcm9wZXJ0eSBsaXN0P1xyXG5cdFx0XHRcdGlmICh4IGluIG8pIHtcclxuXHRcdFx0XHRcdC8vIFllcyB0aGlzIGtleSBkb2VzIGV4aXN0IHNvIGl0cyBtb3N0IGxpa2VseSB0aGlzIGZ1bmN0aW9uIGhhcyBiZWVuIGludm9rZWQgd2l0aCBhbiBvYmplY3QgcGFyYW1ldGVyXHJcblx0XHRcdFx0XHQvLyBSZXR1cm4gZmlyc3QgYXJndW1lbnQgYXMgdGhlIGhhc2ggb2YgYWxsIGFyZ3VtZW50c1xyXG5cdFx0XHRcdFx0cmV0dXJuIGFyZ3NbMF07XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9fVxyXG5cdFx0fVxyXG5cclxuXHRcdC8vIEVsc2UgbG9vcCB0aHJvdWdoIGFuZCBhY2NvdW50IGZvciB0aGUgbWlzc2luZyBvbmVzLlxyXG5cdFx0Zm9yICh4IGluIG8pIHtpZiAoby5oYXNPd25Qcm9wZXJ0eSh4KSkge1xyXG5cclxuXHRcdFx0dCA9IHR5cGVvZiAoYXJnc1tpXSk7XHJcblxyXG5cdFx0XHRpZiAoKHR5cGVvZiAob1t4XSkgPT09ICdmdW5jdGlvbicgJiYgb1t4XS50ZXN0KGFyZ3NbaV0pKSB8fCAodHlwZW9mIChvW3hdKSA9PT0gJ3N0cmluZycgJiYgKFxyXG5cdFx0XHQob1t4XS5pbmRleE9mKCdzJykgPiAtMSAmJiB0ID09PSAnc3RyaW5nJykgfHxcclxuXHRcdFx0KG9beF0uaW5kZXhPZignbycpID4gLTEgJiYgdCA9PT0gJ29iamVjdCcpIHx8XHJcblx0XHRcdChvW3hdLmluZGV4T2YoJ2knKSA+IC0xICYmIHQgPT09ICdudW1iZXInKSB8fFxyXG5cdFx0XHQob1t4XS5pbmRleE9mKCdhJykgPiAtMSAmJiB0ID09PSAnb2JqZWN0JykgfHxcclxuXHRcdFx0KG9beF0uaW5kZXhPZignZicpID4gLTEgJiYgdCA9PT0gJ2Z1bmN0aW9uJylcclxuXHRcdFx0KSlcclxuXHRcdFx0KSB7XHJcblx0XHRcdFx0cFt4XSA9IGFyZ3NbaSsrXTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0ZWxzZSBpZiAodHlwZW9mIChvW3hdKSA9PT0gJ3N0cmluZycgJiYgb1t4XS5pbmRleE9mKCchJykgPiAtMSkge1xyXG5cdFx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdFx0fVxyXG5cdFx0fX1cclxuXHJcblx0XHRyZXR1cm4gcDtcclxuXHR9LFxyXG5cclxuXHQvLyBSZXR1cm5zIGEgVVJMIGluc3RhbmNlXHJcblx0dXJsOiBmdW5jdGlvbihwYXRoKSB7XHJcblxyXG5cdFx0Ly8gSWYgdGhlIHBhdGggaXMgZW1wdHlcclxuXHRcdGlmICghcGF0aCkge1xyXG5cdFx0XHRyZXR1cm4gd2luZG93LmxvY2F0aW9uO1xyXG5cdFx0fVxyXG5cclxuXHRcdC8vIENocm9tZSBhbmQgRmlyZUZveCBzdXBwb3J0IG5ldyBVUkwoKSB0byBleHRyYWN0IFVSTCBvYmplY3RzXHJcblx0XHRlbHNlIGlmICh3aW5kb3cuVVJMICYmIFVSTCBpbnN0YW5jZW9mIEZ1bmN0aW9uICYmIFVSTC5sZW5ndGggIT09IDApIHtcclxuXHRcdFx0cmV0dXJuIG5ldyBVUkwocGF0aCwgd2luZG93LmxvY2F0aW9uKTtcclxuXHRcdH1cclxuXHJcblx0XHQvLyBVZ2x5IHNoaW0sIGl0IHdvcmtzIVxyXG5cdFx0ZWxzZSB7XHJcblx0XHRcdHZhciBhID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xyXG5cdFx0XHRhLmhyZWYgPSBwYXRoO1xyXG5cdFx0XHRyZXR1cm4gYS5jbG9uZU5vZGUoZmFsc2UpO1xyXG5cdFx0fVxyXG5cdH0sXHJcblxyXG5cdGRpZmY6IGZ1bmN0aW9uKGEsIGIpIHtcclxuXHRcdHJldHVybiBiLmZpbHRlcihmdW5jdGlvbihpdGVtKSB7XHJcblx0XHRcdHJldHVybiBhLmluZGV4T2YoaXRlbSkgPT09IC0xO1xyXG5cdFx0fSk7XHJcblx0fSxcclxuXHJcblx0Ly8gR2V0IHRoZSBkaWZmZXJlbnQgaGFzaCBvZiBwcm9wZXJ0aWVzIHVuaXF1ZSB0byBgYWAsIGFuZCBub3QgaW4gYGJgXHJcblx0ZGlmZktleTogZnVuY3Rpb24oYSwgYikge1xyXG5cdFx0aWYgKGEgfHwgIWIpIHtcclxuXHRcdFx0dmFyIHIgPSB7fTtcclxuXHRcdFx0Zm9yICh2YXIgeCBpbiBhKSB7XHJcblx0XHRcdFx0Ly8gRG9lcyB0aGUgcHJvcGVydHkgbm90IGV4aXN0P1xyXG5cdFx0XHRcdGlmICghKHggaW4gYikpIHtcclxuXHRcdFx0XHRcdHJbeF0gPSBhW3hdO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0cmV0dXJuIHI7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIGE7XHJcblx0fSxcclxuXHJcblx0Ly8gVW5pcXVlXHJcblx0Ly8gUmVtb3ZlIGR1cGxpY2F0ZSBhbmQgbnVsbCB2YWx1ZXMgZnJvbSBhbiBhcnJheVxyXG5cdC8vIEBwYXJhbSBhIGFycmF5XHJcblx0dW5pcXVlOiBmdW5jdGlvbihhKSB7XHJcblx0XHRpZiAoIUFycmF5LmlzQXJyYXkoYSkpIHsgcmV0dXJuIFtdOyB9XHJcblxyXG5cdFx0cmV0dXJuIGEuZmlsdGVyKGZ1bmN0aW9uKGl0ZW0sIGluZGV4KSB7XHJcblx0XHRcdC8vIElzIHRoaXMgdGhlIGZpcnN0IGxvY2F0aW9uIG9mIGl0ZW1cclxuXHRcdFx0cmV0dXJuIGEuaW5kZXhPZihpdGVtKSA9PT0gaW5kZXg7XHJcblx0XHR9KTtcclxuXHR9LFxyXG5cclxuXHRpc0VtcHR5OiBmdW5jdGlvbihvYmopIHtcclxuXHJcblx0XHQvLyBTY2FsYXJcclxuXHRcdGlmICghb2JqKVxyXG5cdFx0XHRyZXR1cm4gdHJ1ZTtcclxuXHJcblx0XHQvLyBBcnJheVxyXG5cdFx0aWYgKEFycmF5LmlzQXJyYXkob2JqKSkge1xyXG5cdFx0XHRyZXR1cm4gIW9iai5sZW5ndGg7XHJcblx0XHR9XHJcblx0XHRlbHNlIGlmICh0eXBlb2YgKG9iaikgPT09ICdvYmplY3QnKSB7XHJcblx0XHRcdC8vIE9iamVjdFxyXG5cdFx0XHRmb3IgKHZhciBrZXkgaW4gb2JqKSB7XHJcblx0XHRcdFx0aWYgKG9iai5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XHJcblx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIHRydWU7XHJcblx0fSxcclxuXHJcblx0Ly9qc2NzOmRpc2FibGVcclxuXHJcblx0LyohXHJcblx0ICoqICBUaGVuYWJsZSAtLSBFbWJlZGRhYmxlIE1pbmltdW0gU3RyaWN0bHktQ29tcGxpYW50IFByb21pc2VzL0ErIDEuMS4xIFRoZW5hYmxlXHJcblx0ICoqICBDb3B5cmlnaHQgKGMpIDIwMTMtMjAxNCBSYWxmIFMuIEVuZ2Vsc2NoYWxsIDxodHRwOi8vZW5nZWxzY2hhbGwuY29tPlxyXG5cdCAqKiAgTGljZW5zZWQgdW5kZXIgVGhlIE1JVCBMaWNlbnNlIDxodHRwOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvTUlUPlxyXG5cdCAqKiAgU291cmNlLUNvZGUgZGlzdHJpYnV0ZWQgb24gPGh0dHA6Ly9naXRodWIuY29tL3JzZS90aGVuYWJsZT5cclxuXHQgKi9cclxuXHRQcm9taXNlOiAoZnVuY3Rpb24oKXtcclxuXHRcdC8qICBwcm9taXNlIHN0YXRlcyBbUHJvbWlzZXMvQSsgMi4xXSAgKi9cclxuXHRcdHZhciBTVEFURV9QRU5ESU5HICAgPSAwOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLyogIFtQcm9taXNlcy9BKyAyLjEuMV0gICovXHJcblx0XHR2YXIgU1RBVEVfRlVMRklMTEVEID0gMTsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8qICBbUHJvbWlzZXMvQSsgMi4xLjJdICAqL1xyXG5cdFx0dmFyIFNUQVRFX1JFSkVDVEVEICA9IDI7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvKiAgW1Byb21pc2VzL0ErIDIuMS4zXSAgKi9cclxuXHJcblx0XHQvKiAgcHJvbWlzZSBvYmplY3QgY29uc3RydWN0b3IgICovXHJcblx0XHR2YXIgYXBpID0gZnVuY3Rpb24gKGV4ZWN1dG9yKSB7XHJcblx0XHRcdC8qICBvcHRpb25hbGx5IHN1cHBvcnQgbm9uLWNvbnN0cnVjdG9yL3BsYWluLWZ1bmN0aW9uIGNhbGwgICovXHJcblx0XHRcdGlmICghKHRoaXMgaW5zdGFuY2VvZiBhcGkpKVxyXG5cdFx0XHRcdHJldHVybiBuZXcgYXBpKGV4ZWN1dG9yKTtcclxuXHJcblx0XHRcdC8qICBpbml0aWFsaXplIG9iamVjdCAgKi9cclxuXHRcdFx0dGhpcy5pZCAgICAgICAgICAgPSBcIlRoZW5hYmxlLzEuMC42XCI7XHJcblx0XHRcdHRoaXMuc3RhdGUgICAgICAgID0gU1RBVEVfUEVORElORzsgLyogIGluaXRpYWwgc3RhdGUgICovXHJcblx0XHRcdHRoaXMuZnVsZmlsbFZhbHVlID0gdW5kZWZpbmVkOyAgICAgLyogIGluaXRpYWwgdmFsdWUgICovICAgICAvKiAgW1Byb21pc2VzL0ErIDEuMywgMi4xLjIuMl0gICovXHJcblx0XHRcdHRoaXMucmVqZWN0UmVhc29uID0gdW5kZWZpbmVkOyAgICAgLyogIGluaXRpYWwgcmVhc29uICovICAgICAvKiAgW1Byb21pc2VzL0ErIDEuNSwgMi4xLjMuMl0gICovXHJcblx0XHRcdHRoaXMub25GdWxmaWxsZWQgID0gW107ICAgICAgICAgICAgLyogIGluaXRpYWwgaGFuZGxlcnMgICovXHJcblx0XHRcdHRoaXMub25SZWplY3RlZCAgID0gW107ICAgICAgICAgICAgLyogIGluaXRpYWwgaGFuZGxlcnMgICovXHJcblxyXG5cdFx0XHQvKiAgcHJvdmlkZSBvcHRpb25hbCBpbmZvcm1hdGlvbi1oaWRpbmcgcHJveHkgICovXHJcblx0XHRcdHRoaXMucHJveHkgPSB7XHJcblx0XHRcdFx0dGhlbjogdGhpcy50aGVuLmJpbmQodGhpcylcclxuXHRcdFx0fTtcclxuXHJcblx0XHRcdC8qICBzdXBwb3J0IG9wdGlvbmFsIGV4ZWN1dG9yIGZ1bmN0aW9uICAqL1xyXG5cdFx0XHRpZiAodHlwZW9mIGV4ZWN1dG9yID09PSBcImZ1bmN0aW9uXCIpXHJcblx0XHRcdFx0ZXhlY3V0b3IuY2FsbCh0aGlzLCB0aGlzLmZ1bGZpbGwuYmluZCh0aGlzKSwgdGhpcy5yZWplY3QuYmluZCh0aGlzKSk7XHJcblx0XHR9O1xyXG5cclxuXHRcdC8qICBwcm9taXNlIEFQSSBtZXRob2RzICAqL1xyXG5cdFx0YXBpLnByb3RvdHlwZSA9IHtcclxuXHRcdFx0LyogIHByb21pc2UgcmVzb2x2aW5nIG1ldGhvZHMgICovXHJcblx0XHRcdGZ1bGZpbGw6IGZ1bmN0aW9uICh2YWx1ZSkgeyByZXR1cm4gZGVsaXZlcih0aGlzLCBTVEFURV9GVUxGSUxMRUQsIFwiZnVsZmlsbFZhbHVlXCIsIHZhbHVlKTsgfSxcclxuXHRcdFx0cmVqZWN0OiAgZnVuY3Rpb24gKHZhbHVlKSB7IHJldHVybiBkZWxpdmVyKHRoaXMsIFNUQVRFX1JFSkVDVEVELCAgXCJyZWplY3RSZWFzb25cIiwgdmFsdWUpOyB9LFxyXG5cclxuXHRcdFx0LyogIFwiVGhlIHRoZW4gTWV0aG9kXCIgW1Byb21pc2VzL0ErIDEuMSwgMS4yLCAyLjJdICAqL1xyXG5cdFx0XHR0aGVuOiBmdW5jdGlvbiAob25GdWxmaWxsZWQsIG9uUmVqZWN0ZWQpIHtcclxuXHRcdFx0XHR2YXIgY3VyciA9IHRoaXM7XHJcblx0XHRcdFx0dmFyIG5leHQgPSBuZXcgYXBpKCk7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLyogIFtQcm9taXNlcy9BKyAyLjIuN10gICovXHJcblx0XHRcdFx0Y3Vyci5vbkZ1bGZpbGxlZC5wdXNoKFxyXG5cdFx0XHRcdFx0cmVzb2x2ZXIob25GdWxmaWxsZWQsIG5leHQsIFwiZnVsZmlsbFwiKSk7ICAgICAgICAgICAgIC8qICBbUHJvbWlzZXMvQSsgMi4yLjIvMi4yLjZdICAqL1xyXG5cdFx0XHRcdGN1cnIub25SZWplY3RlZC5wdXNoKFxyXG5cdFx0XHRcdFx0cmVzb2x2ZXIob25SZWplY3RlZCwgIG5leHQsIFwicmVqZWN0XCIgKSk7ICAgICAgICAgICAgIC8qICBbUHJvbWlzZXMvQSsgMi4yLjMvMi4yLjZdICAqL1xyXG5cdFx0XHRcdGV4ZWN1dGUoY3Vycik7XHJcblx0XHRcdFx0cmV0dXJuIG5leHQucHJveHk7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLyogIFtQcm9taXNlcy9BKyAyLjIuNywgMy4zXSAgKi9cclxuXHRcdFx0fVxyXG5cdFx0fTtcclxuXHJcblx0XHQvKiAgZGVsaXZlciBhbiBhY3Rpb24gICovXHJcblx0XHR2YXIgZGVsaXZlciA9IGZ1bmN0aW9uIChjdXJyLCBzdGF0ZSwgbmFtZSwgdmFsdWUpIHtcclxuXHRcdFx0aWYgKGN1cnIuc3RhdGUgPT09IFNUQVRFX1BFTkRJTkcpIHtcclxuXHRcdFx0XHRjdXJyLnN0YXRlID0gc3RhdGU7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvKiAgW1Byb21pc2VzL0ErIDIuMS4yLjEsIDIuMS4zLjFdICAqL1xyXG5cdFx0XHRcdGN1cnJbbmFtZV0gPSB2YWx1ZTsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8qICBbUHJvbWlzZXMvQSsgMi4xLjIuMiwgMi4xLjMuMl0gICovXHJcblx0XHRcdFx0ZXhlY3V0ZShjdXJyKTtcclxuXHRcdFx0fVxyXG5cdFx0XHRyZXR1cm4gY3VycjtcclxuXHRcdH07XHJcblxyXG5cdFx0LyogIGV4ZWN1dGUgYWxsIGhhbmRsZXJzICAqL1xyXG5cdFx0dmFyIGV4ZWN1dGUgPSBmdW5jdGlvbiAoY3Vycikge1xyXG5cdFx0XHRpZiAoY3Vyci5zdGF0ZSA9PT0gU1RBVEVfRlVMRklMTEVEKVxyXG5cdFx0XHRcdGV4ZWN1dGVfaGFuZGxlcnMoY3VyciwgXCJvbkZ1bGZpbGxlZFwiLCBjdXJyLmZ1bGZpbGxWYWx1ZSk7XHJcblx0XHRcdGVsc2UgaWYgKGN1cnIuc3RhdGUgPT09IFNUQVRFX1JFSkVDVEVEKVxyXG5cdFx0XHRcdGV4ZWN1dGVfaGFuZGxlcnMoY3VyciwgXCJvblJlamVjdGVkXCIsICBjdXJyLnJlamVjdFJlYXNvbik7XHJcblx0XHR9O1xyXG5cclxuXHRcdC8qICBleGVjdXRlIHBhcnRpY3VsYXIgc2V0IG9mIGhhbmRsZXJzICAqL1xyXG5cdFx0dmFyIGV4ZWN1dGVfaGFuZGxlcnMgPSBmdW5jdGlvbiAoY3VyciwgbmFtZSwgdmFsdWUpIHtcclxuXHRcdFx0LyogZ2xvYmFsIHByb2Nlc3M6IHRydWUgKi9cclxuXHRcdFx0LyogZ2xvYmFsIHNldEltbWVkaWF0ZTogdHJ1ZSAqL1xyXG5cdFx0XHQvKiBnbG9iYWwgc2V0VGltZW91dDogdHJ1ZSAqL1xyXG5cclxuXHRcdFx0LyogIHNob3J0LWNpcmN1aXQgcHJvY2Vzc2luZyAgKi9cclxuXHRcdFx0aWYgKGN1cnJbbmFtZV0ubGVuZ3RoID09PSAwKVxyXG5cdFx0XHRcdHJldHVybjtcclxuXHJcblx0XHRcdC8qICBpdGVyYXRlIG92ZXIgYWxsIGhhbmRsZXJzLCBleGFjdGx5IG9uY2UgICovXHJcblx0XHRcdHZhciBoYW5kbGVycyA9IGN1cnJbbmFtZV07XHJcblx0XHRcdGN1cnJbbmFtZV0gPSBbXTsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvKiAgW1Byb21pc2VzL0ErIDIuMi4yLjMsIDIuMi4zLjNdICAqL1xyXG5cdFx0XHR2YXIgZnVuYyA9IGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGhhbmRsZXJzLmxlbmd0aDsgaSsrKVxyXG5cdFx0XHRcdFx0aGFuZGxlcnNbaV0odmFsdWUpOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvKiAgW1Byb21pc2VzL0ErIDIuMi41XSAgKi9cclxuXHRcdFx0fTtcclxuXHJcblx0XHRcdC8qICBleGVjdXRlIHByb2NlZHVyZSBhc3luY2hyb25vdXNseSAgKi8gICAgICAgICAgICAgICAgICAgICAvKiAgW1Byb21pc2VzL0ErIDIuMi40LCAzLjFdICAqL1xyXG5cdFx0XHRpZiAodHlwZW9mIHByb2Nlc3MgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIHByb2Nlc3MubmV4dFRpY2sgPT09IFwiZnVuY3Rpb25cIilcclxuXHRcdFx0XHRwcm9jZXNzLm5leHRUaWNrKGZ1bmMpO1xyXG5cdFx0XHRlbHNlIGlmICh0eXBlb2Ygc2V0SW1tZWRpYXRlID09PSBcImZ1bmN0aW9uXCIpXHJcblx0XHRcdFx0c2V0SW1tZWRpYXRlKGZ1bmMpO1xyXG5cdFx0XHRlbHNlXHJcblx0XHRcdFx0c2V0VGltZW91dChmdW5jLCAwKTtcclxuXHRcdH07XHJcblxyXG5cdFx0LyogIGdlbmVyYXRlIGEgcmVzb2x2ZXIgZnVuY3Rpb24gICovXHJcblx0XHR2YXIgcmVzb2x2ZXIgPSBmdW5jdGlvbiAoY2IsIG5leHQsIG1ldGhvZCkge1xyXG5cdFx0XHRyZXR1cm4gZnVuY3Rpb24gKHZhbHVlKSB7XHJcblx0XHRcdFx0aWYgKHR5cGVvZiBjYiAhPT0gXCJmdW5jdGlvblwiKSAgICAgICAgICAgICAgICAgICAgICAgICAgICAvKiAgW1Byb21pc2VzL0ErIDIuMi4xLCAyLjIuNy4zLCAyLjIuNy40XSAgKi9cclxuXHRcdFx0XHRcdG5leHRbbWV0aG9kXS5jYWxsKG5leHQsIHZhbHVlKTsgICAgICAgICAgICAgICAgICAgICAgLyogIFtQcm9taXNlcy9BKyAyLjIuNy4zLCAyLjIuNy40XSAgKi9cclxuXHRcdFx0XHRlbHNlIHtcclxuXHRcdFx0XHRcdHZhciByZXN1bHQ7XHJcblx0XHRcdFx0XHR0cnkgeyByZXN1bHQgPSBjYih2YWx1ZSk7IH0gICAgICAgICAgICAgICAgICAgICAgICAgIC8qICBbUHJvbWlzZXMvQSsgMi4yLjIuMSwgMi4yLjMuMSwgMi4yLjUsIDMuMl0gICovXHJcblx0XHRcdFx0XHRjYXRjaCAoZSkge1xyXG5cdFx0XHRcdFx0XHRuZXh0LnJlamVjdChlKTsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLyogIFtQcm9taXNlcy9BKyAyLjIuNy4yXSAgKi9cclxuXHRcdFx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0cmVzb2x2ZShuZXh0LCByZXN1bHQpOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvKiAgW1Byb21pc2VzL0ErIDIuMi43LjFdICAqL1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fTtcclxuXHRcdH07XHJcblxyXG5cdFx0LyogIFwiUHJvbWlzZSBSZXNvbHV0aW9uIFByb2NlZHVyZVwiICAqLyAgICAgICAgICAgICAgICAgICAgICAgICAgIC8qICBbUHJvbWlzZXMvQSsgMi4zXSAgKi9cclxuXHRcdHZhciByZXNvbHZlID0gZnVuY3Rpb24gKHByb21pc2UsIHgpIHtcclxuXHRcdFx0LyogIHNhbml0eSBjaGVjayBhcmd1bWVudHMgICovICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8qICBbUHJvbWlzZXMvQSsgMi4zLjFdICAqL1xyXG5cdFx0XHRpZiAocHJvbWlzZSA9PT0geCB8fCBwcm9taXNlLnByb3h5ID09PSB4KSB7XHJcblx0XHRcdFx0cHJvbWlzZS5yZWplY3QobmV3IFR5cGVFcnJvcihcImNhbm5vdCByZXNvbHZlIHByb21pc2Ugd2l0aCBpdHNlbGZcIikpO1xyXG5cdFx0XHRcdHJldHVybjtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0LyogIHN1cmdpY2FsbHkgY2hlY2sgZm9yIGEgXCJ0aGVuXCIgbWV0aG9kXHJcblx0XHRcdFx0KG1haW5seSB0byBqdXN0IGNhbGwgdGhlIFwiZ2V0dGVyXCIgb2YgXCJ0aGVuXCIgb25seSBvbmNlKSAgKi9cclxuXHRcdFx0dmFyIHRoZW47XHJcblx0XHRcdGlmICgodHlwZW9mIHggPT09IFwib2JqZWN0XCIgJiYgeCAhPT0gbnVsbCkgfHwgdHlwZW9mIHggPT09IFwiZnVuY3Rpb25cIikge1xyXG5cdFx0XHRcdHRyeSB7IHRoZW4gPSB4LnRoZW47IH0gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8qICBbUHJvbWlzZXMvQSsgMi4zLjMuMSwgMy41XSAgKi9cclxuXHRcdFx0XHRjYXRjaCAoZSkge1xyXG5cdFx0XHRcdFx0cHJvbWlzZS5yZWplY3QoZSk7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvKiAgW1Byb21pc2VzL0ErIDIuMy4zLjJdICAqL1xyXG5cdFx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0LyogIGhhbmRsZSBvd24gVGhlbmFibGVzICAgIFtQcm9taXNlcy9BKyAyLjMuMl1cclxuXHRcdFx0XHRhbmQgc2ltaWxhciBcInRoZW5hYmxlc1wiIFtQcm9taXNlcy9BKyAyLjMuM10gICovXHJcblx0XHRcdGlmICh0eXBlb2YgdGhlbiA9PT0gXCJmdW5jdGlvblwiKSB7XHJcblx0XHRcdFx0dmFyIHJlc29sdmVkID0gZmFsc2U7XHJcblx0XHRcdFx0dHJ5IHtcclxuXHRcdFx0XHRcdC8qICBjYWxsIHJldHJpZXZlZCBcInRoZW5cIiBtZXRob2QgKi8gICAgICAgICAgICAgICAgICAvKiAgW1Byb21pc2VzL0ErIDIuMy4zLjNdICAqL1xyXG5cdFx0XHRcdFx0dGhlbi5jYWxsKHgsXHJcblx0XHRcdFx0XHRcdC8qICByZXNvbHZlUHJvbWlzZSAgKi8gICAgICAgICAgICAgICAgICAgICAgICAgICAvKiAgW1Byb21pc2VzL0ErIDIuMy4zLjMuMV0gICovXHJcblx0XHRcdFx0XHRcdGZ1bmN0aW9uICh5KSB7XHJcblx0XHRcdFx0XHRcdFx0aWYgKHJlc29sdmVkKSByZXR1cm47IHJlc29sdmVkID0gdHJ1ZTsgICAgICAgLyogIFtQcm9taXNlcy9BKyAyLjMuMy4zLjNdICAqL1xyXG5cdFx0XHRcdFx0XHRcdGlmICh5ID09PSB4KSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8qICBbUHJvbWlzZXMvQSsgMy42XSAgKi9cclxuXHRcdFx0XHRcdFx0XHRcdHByb21pc2UucmVqZWN0KG5ldyBUeXBlRXJyb3IoXCJjaXJjdWxhciB0aGVuYWJsZSBjaGFpblwiKSk7XHJcblx0XHRcdFx0XHRcdFx0ZWxzZVxyXG5cdFx0XHRcdFx0XHRcdFx0cmVzb2x2ZShwcm9taXNlLCB5KTtcclxuXHRcdFx0XHRcdFx0fSxcclxuXHJcblx0XHRcdFx0XHRcdC8qICByZWplY3RQcm9taXNlICAqLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAvKiAgW1Byb21pc2VzL0ErIDIuMy4zLjMuMl0gICovXHJcblx0XHRcdFx0XHRcdGZ1bmN0aW9uIChyKSB7XHJcblx0XHRcdFx0XHRcdFx0aWYgKHJlc29sdmVkKSByZXR1cm47IHJlc29sdmVkID0gdHJ1ZTsgICAgICAgLyogIFtQcm9taXNlcy9BKyAyLjMuMy4zLjNdICAqL1xyXG5cdFx0XHRcdFx0XHRcdHByb21pc2UucmVqZWN0KHIpO1xyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHQpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRjYXRjaCAoZSkge1xyXG5cdFx0XHRcdFx0aWYgKCFyZXNvbHZlZCkgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvKiAgW1Byb21pc2VzL0ErIDIuMy4zLjMuM10gICovXHJcblx0XHRcdFx0XHRcdHByb21pc2UucmVqZWN0KGUpOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvKiAgW1Byb21pc2VzL0ErIDIuMy4zLjMuNF0gICovXHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdHJldHVybjtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0LyogIGhhbmRsZSBvdGhlciB2YWx1ZXMgICovXHJcblx0XHRcdHByb21pc2UuZnVsZmlsbCh4KTsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvKiAgW1Byb21pc2VzL0ErIDIuMy40LCAyLjMuMy40XSAgKi9cclxuXHRcdH07XHJcblxyXG5cdFx0LyogIGV4cG9ydCBBUEkgICovXHJcblx0XHRyZXR1cm4gYXBpO1xyXG5cdH0pKCksXHJcblxyXG5cdC8vanNjczplbmFibGVcclxuXHJcblx0Ly8gRXZlbnRcclxuXHQvLyBBIGNvbnRydWN0b3Igc3VwZXJjbGFzcyBmb3IgYWRkaW5nIGV2ZW50IG1lbnRob2RzLCBvbiwgb2ZmLCBlbWl0LlxyXG5cdEV2ZW50OiBmdW5jdGlvbigpIHtcclxuXHJcblx0XHR2YXIgc2VwYXJhdG9yID0gL1tcXHNcXCxdKy87XHJcblxyXG5cdFx0Ly8gSWYgdGhpcyBkb2Vzbid0IHN1cHBvcnQgZ2V0UHJvdG90eXBlIHRoZW4gd2UgY2FuJ3QgZ2V0IHByb3RvdHlwZS5ldmVudHMgb2YgdGhlIHBhcmVudFxyXG5cdFx0Ly8gU28gbGV0cyBnZXQgdGhlIGN1cnJlbnQgaW5zdGFuY2UgZXZlbnRzLCBhbmQgYWRkIHRob3NlIHRvIGEgcGFyZW50IHByb3BlcnR5XHJcblx0XHR0aGlzLnBhcmVudCA9IHtcclxuXHRcdFx0ZXZlbnRzOiB0aGlzLmV2ZW50cyxcclxuXHRcdFx0ZmluZEV2ZW50czogdGhpcy5maW5kRXZlbnRzLFxyXG5cdFx0XHRwYXJlbnQ6IHRoaXMucGFyZW50LFxyXG5cdFx0XHR1dGlsczogdGhpcy51dGlsc1xyXG5cdFx0fTtcclxuXHJcblx0XHR0aGlzLmV2ZW50cyA9IHt9O1xyXG5cclxuXHRcdC8vIE9uLCBzdWJzY3JpYmUgdG8gZXZlbnRzXHJcblx0XHQvLyBAcGFyYW0gZXZ0ICAgc3RyaW5nXHJcblx0XHQvLyBAcGFyYW0gY2FsbGJhY2sgIGZ1bmN0aW9uXHJcblx0XHR0aGlzLm9uID0gZnVuY3Rpb24oZXZ0LCBjYWxsYmFjaykge1xyXG5cclxuXHRcdFx0aWYgKGNhbGxiYWNrICYmIHR5cGVvZiAoY2FsbGJhY2spID09PSAnZnVuY3Rpb24nKSB7XHJcblx0XHRcdFx0dmFyIGEgPSBldnQuc3BsaXQoc2VwYXJhdG9yKTtcclxuXHRcdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGEubGVuZ3RoOyBpKyspIHtcclxuXHJcblx0XHRcdFx0XHQvLyBIYXMgdGhpcyBldmVudCBhbHJlYWR5IGJlZW4gZmlyZWQgb24gdGhpcyBpbnN0YW5jZT9cclxuXHRcdFx0XHRcdHRoaXMuZXZlbnRzW2FbaV1dID0gW2NhbGxiYWNrXS5jb25jYXQodGhpcy5ldmVudHNbYVtpXV0gfHwgW10pO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0cmV0dXJuIHRoaXM7XHJcblx0XHR9O1xyXG5cclxuXHRcdC8vIE9mZiwgdW5zdWJzY3JpYmUgdG8gZXZlbnRzXHJcblx0XHQvLyBAcGFyYW0gZXZ0ICAgc3RyaW5nXHJcblx0XHQvLyBAcGFyYW0gY2FsbGJhY2sgIGZ1bmN0aW9uXHJcblx0XHR0aGlzLm9mZiA9IGZ1bmN0aW9uKGV2dCwgY2FsbGJhY2spIHtcclxuXHJcblx0XHRcdHRoaXMuZmluZEV2ZW50cyhldnQsIGZ1bmN0aW9uKG5hbWUsIGluZGV4KSB7XHJcblx0XHRcdFx0aWYgKCFjYWxsYmFjayB8fCB0aGlzLmV2ZW50c1tuYW1lXVtpbmRleF0gPT09IGNhbGxiYWNrKSB7XHJcblx0XHRcdFx0XHR0aGlzLmV2ZW50c1tuYW1lXVtpbmRleF0gPSBudWxsO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSk7XHJcblxyXG5cdFx0XHRyZXR1cm4gdGhpcztcclxuXHRcdH07XHJcblxyXG5cdFx0Ly8gRW1pdFxyXG5cdFx0Ly8gVHJpZ2dlcnMgYW55IHN1YnNjcmliZWQgZXZlbnRzXHJcblx0XHR0aGlzLmVtaXQgPSBmdW5jdGlvbihldnQgLyosIGRhdGEsIC4uLiAqLykge1xyXG5cclxuXHRcdFx0Ly8gR2V0IGFyZ3VtZW50cyBhcyBhbiBBcnJheSwga25vY2sgb2ZmIHRoZSBmaXJzdCBvbmVcclxuXHRcdFx0dmFyIGFyZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpO1xyXG5cdFx0XHRhcmdzLnB1c2goZXZ0KTtcclxuXHJcblx0XHRcdC8vIEhhbmRsZXJcclxuXHRcdFx0dmFyIGhhbmRsZXIgPSBmdW5jdGlvbihuYW1lLCBpbmRleCkge1xyXG5cclxuXHRcdFx0XHQvLyBSZXBsYWNlIHRoZSBsYXN0IHByb3BlcnR5IHdpdGggdGhlIGV2ZW50IG5hbWVcclxuXHRcdFx0XHRhcmdzW2FyZ3MubGVuZ3RoIC0gMV0gPSAobmFtZSA9PT0gJyonID8gZXZ0IDogbmFtZSk7XHJcblxyXG5cdFx0XHRcdC8vIFRyaWdnZXJcclxuXHRcdFx0XHR0aGlzLmV2ZW50c1tuYW1lXVtpbmRleF0uYXBwbHkodGhpcywgYXJncyk7XHJcblx0XHRcdH07XHJcblxyXG5cdFx0XHQvLyBGaW5kIHRoZSBjYWxsYmFja3Mgd2hpY2ggbWF0Y2ggdGhlIGNvbmRpdGlvbiBhbmQgY2FsbFxyXG5cdFx0XHR2YXIgX3RoaXMgPSB0aGlzO1xyXG5cdFx0XHR3aGlsZSAoX3RoaXMgJiYgX3RoaXMuZmluZEV2ZW50cykge1xyXG5cclxuXHRcdFx0XHQvLyBGaW5kIGV2ZW50cyB3aGljaCBtYXRjaFxyXG5cdFx0XHRcdF90aGlzLmZpbmRFdmVudHMoZXZ0ICsgJywqJywgaGFuZGxlcik7XHJcblx0XHRcdFx0X3RoaXMgPSBfdGhpcy5wYXJlbnQ7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHJldHVybiB0aGlzO1xyXG5cdFx0fTtcclxuXHJcblx0XHQvL1xyXG5cdFx0Ly8gRWFzeSBmdW5jdGlvbnNcclxuXHRcdHRoaXMuZW1pdEFmdGVyID0gZnVuY3Rpb24oKSB7XHJcblx0XHRcdHZhciBfdGhpcyA9IHRoaXM7XHJcblx0XHRcdHZhciBhcmdzID0gYXJndW1lbnRzO1xyXG5cdFx0XHRzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdF90aGlzLmVtaXQuYXBwbHkoX3RoaXMsIGFyZ3MpO1xyXG5cdFx0XHR9LCAwKTtcclxuXHJcblx0XHRcdHJldHVybiB0aGlzO1xyXG5cdFx0fTtcclxuXHJcblx0XHR0aGlzLmZpbmRFdmVudHMgPSBmdW5jdGlvbihldnQsIGNhbGxiYWNrKSB7XHJcblxyXG5cdFx0XHR2YXIgYSA9IGV2dC5zcGxpdChzZXBhcmF0b3IpO1xyXG5cclxuXHRcdFx0Zm9yICh2YXIgbmFtZSBpbiB0aGlzLmV2ZW50cykge2lmICh0aGlzLmV2ZW50cy5oYXNPd25Qcm9wZXJ0eShuYW1lKSkge1xyXG5cclxuXHRcdFx0XHRpZiAoYS5pbmRleE9mKG5hbWUpID4gLTEpIHtcclxuXHJcblx0XHRcdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuZXZlbnRzW25hbWVdLmxlbmd0aDsgaSsrKSB7XHJcblxyXG5cdFx0XHRcdFx0XHQvLyBEb2VzIHRoZSBldmVudCBoYW5kbGVyIGV4aXN0P1xyXG5cdFx0XHRcdFx0XHRpZiAodGhpcy5ldmVudHNbbmFtZV1baV0pIHtcclxuXHRcdFx0XHRcdFx0XHQvLyBFbWl0IG9uIHRoZSBsb2NhbCBpbnN0YW5jZSBvZiB0aGlzXHJcblx0XHRcdFx0XHRcdFx0Y2FsbGJhY2suY2FsbCh0aGlzLCBuYW1lLCBpKTtcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fX1cclxuXHRcdH07XHJcblxyXG5cdFx0cmV0dXJuIHRoaXM7XHJcblx0fSxcclxuXHJcblx0Ly8gR2xvYmFsIEV2ZW50c1xyXG5cdC8vIEF0dGFjaCB0aGUgY2FsbGJhY2sgdG8gdGhlIHdpbmRvdyBvYmplY3RcclxuXHQvLyBSZXR1cm4gaXRzIHVuaXF1ZSByZWZlcmVuY2VcclxuXHRnbG9iYWxFdmVudDogZnVuY3Rpb24oY2FsbGJhY2ssIGd1aWQpIHtcclxuXHRcdC8vIElmIHRoZSBndWlkIGhhcyBub3QgYmVlbiBzdXBwbGllZCB0aGVuIGNyZWF0ZSBhIG5ldyBvbmUuXHJcblx0XHRndWlkID0gZ3VpZCB8fCAnX2hlbGxvanNfJyArIHBhcnNlSW50KE1hdGgucmFuZG9tKCkgKiAxZTEyLCAxMCkudG9TdHJpbmcoMzYpO1xyXG5cclxuXHRcdC8vIERlZmluZSB0aGUgY2FsbGJhY2sgZnVuY3Rpb25cclxuXHRcdHdpbmRvd1tndWlkXSA9IGZ1bmN0aW9uKCkge1xyXG5cdFx0XHQvLyBUcmlnZ2VyIHRoZSBjYWxsYmFja1xyXG5cdFx0XHR0cnkge1xyXG5cdFx0XHRcdGlmIChjYWxsYmFjay5hcHBseSh0aGlzLCBhcmd1bWVudHMpKSB7XHJcblx0XHRcdFx0XHRkZWxldGUgd2luZG93W2d1aWRdO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0XHRjYXRjaCAoZSkge1xyXG5cdFx0XHRcdGNvbnNvbGUuZXJyb3IoZSk7XHJcblx0XHRcdH1cclxuXHRcdH07XHJcblxyXG5cdFx0cmV0dXJuIGd1aWQ7XHJcblx0fSxcclxuXHJcblx0Ly8gVHJpZ2dlciBhIGNsaWVudHNpZGUgcG9wdXBcclxuXHQvLyBUaGlzIGhhcyBiZWVuIGF1Z21lbnRlZCB0byBzdXBwb3J0IFBob25lR2FwXHJcblx0cG9wdXA6IGZ1bmN0aW9uKHVybCwgcmVkaXJlY3RVcmksIG9wdGlvbnMpIHtcclxuXHJcblx0XHR2YXIgZG9jdW1lbnRFbGVtZW50ID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50O1xyXG5cclxuXHRcdC8vIE11bHRpIFNjcmVlbiBQb3B1cCBQb3NpdGlvbmluZyAoaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL2EvMTY4NjEwNTApXHJcblx0XHQvLyBDcmVkaXQ6IGh0dHA6Ly93d3cueHRmLmRrLzIwMTEvMDgvY2VudGVyLW5ldy1wb3B1cC13aW5kb3ctZXZlbi1vbi5odG1sXHJcblx0XHQvLyBGaXhlcyBkdWFsLXNjcmVlbiBwb3NpdGlvbiAgICAgICAgICAgICAgICAgICAgICAgICBNb3N0IGJyb3dzZXJzICAgICAgRmlyZWZveFxyXG5cclxuXHRcdGlmIChvcHRpb25zLmhlaWdodCkge1xyXG5cdFx0XHR2YXIgZHVhbFNjcmVlblRvcCA9IHdpbmRvdy5zY3JlZW5Ub3AgIT09IHVuZGVmaW5lZCA/IHdpbmRvdy5zY3JlZW5Ub3AgOiBzY3JlZW4udG9wO1xyXG5cdFx0XHR2YXIgaGVpZ2h0ID0gc2NyZWVuLmhlaWdodCB8fCB3aW5kb3cuaW5uZXJIZWlnaHQgfHwgZG9jdW1lbnRFbGVtZW50LmNsaWVudEhlaWdodDtcclxuXHRcdFx0b3B0aW9ucy50b3AgPSBwYXJzZUludCgoaGVpZ2h0IC0gb3B0aW9ucy5oZWlnaHQpIC8gMiwgMTApICsgZHVhbFNjcmVlblRvcDtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAob3B0aW9ucy53aWR0aCkge1xyXG5cdFx0XHR2YXIgZHVhbFNjcmVlbkxlZnQgPSB3aW5kb3cuc2NyZWVuTGVmdCAhPT0gdW5kZWZpbmVkID8gd2luZG93LnNjcmVlbkxlZnQgOiBzY3JlZW4ubGVmdDtcclxuXHRcdFx0dmFyIHdpZHRoID0gc2NyZWVuLndpZHRoIHx8IHdpbmRvdy5pbm5lcldpZHRoIHx8IGRvY3VtZW50RWxlbWVudC5jbGllbnRXaWR0aDtcclxuXHRcdFx0b3B0aW9ucy5sZWZ0ID0gcGFyc2VJbnQoKHdpZHRoIC0gb3B0aW9ucy53aWR0aCkgLyAyLCAxMCkgKyBkdWFsU2NyZWVuTGVmdDtcclxuXHRcdH1cclxuXHJcblx0XHQvLyBDb252ZXJ0IG9wdGlvbnMgaW50byBhbiBhcnJheVxyXG5cdFx0dmFyIG9wdGlvbnNBcnJheSA9IFtdO1xyXG5cdFx0T2JqZWN0LmtleXMob3B0aW9ucykuZm9yRWFjaChmdW5jdGlvbihuYW1lKSB7XHJcblx0XHRcdHZhciB2YWx1ZSA9IG9wdGlvbnNbbmFtZV07XHJcblx0XHRcdG9wdGlvbnNBcnJheS5wdXNoKG5hbWUgKyAodmFsdWUgIT09IG51bGwgPyAnPScgKyB2YWx1ZSA6ICcnKSk7XHJcblx0XHR9KTtcclxuXHJcblx0XHQvLyBDYWxsIHRoZSBvcGVuKCkgZnVuY3Rpb24gd2l0aCB0aGUgaW5pdGlhbCBwYXRoXHJcblx0XHQvL1xyXG5cdFx0Ly8gT0F1dGggcmVkaXJlY3QsIGZpeGVzIFVSSSBmcmFnbWVudHMgZnJvbSBiZWluZyBsb3N0IGluIFNhZmFyaVxyXG5cdFx0Ly8gKFVSSSBGcmFnbWVudHMgd2l0aGluIDMwMiBMb2NhdGlvbiBVUkkgYXJlIGxvc3Qgb3ZlciBIVFRQUylcclxuXHRcdC8vIExvYWRpbmcgdGhlIHJlZGlyZWN0Lmh0bWwgYmVmb3JlIHRyaWdnZXJpbmcgdGhlIE9BdXRoIEZsb3cgc2VlbXMgdG8gZml4IGl0LlxyXG5cdFx0Ly9cclxuXHRcdC8vIEZpcmVmb3ggIGRlY29kZXMgVVJMIGZyYWdtZW50cyB3aGVuIGNhbGxpbmcgbG9jYXRpb24uaGFzaC5cclxuXHRcdC8vICAtIFRoaXMgaXMgYmFkIGlmIHRoZSB2YWx1ZSBjb250YWlucyBicmVhayBwb2ludHMgd2hpY2ggYXJlIGVzY2FwZWRcclxuXHRcdC8vICAtIEhlbmNlIHRoZSB1cmwgbXVzdCBiZSBlbmNvZGVkIHR3aWNlIGFzIGl0IGNvbnRhaW5zIGJyZWFrcG9pbnRzLlxyXG5cdFx0aWYgKG5hdmlnYXRvci51c2VyQWdlbnQuaW5kZXhPZignU2FmYXJpJykgIT09IC0xICYmIG5hdmlnYXRvci51c2VyQWdlbnQuaW5kZXhPZignQ2hyb21lJykgPT09IC0xKSB7XHJcblx0XHRcdHVybCA9IHJlZGlyZWN0VXJpICsgJyNvYXV0aF9yZWRpcmVjdD0nICsgZW5jb2RlVVJJQ29tcG9uZW50KGVuY29kZVVSSUNvbXBvbmVudCh1cmwpKTtcclxuXHRcdH1cclxuXHJcblx0XHR2YXIgcG9wdXAgPSB3aW5kb3cub3BlbihcclxuXHRcdFx0dXJsLFxyXG5cdFx0XHQnX2JsYW5rJyxcclxuXHRcdFx0b3B0aW9uc0FycmF5LmpvaW4oJywnKVxyXG5cdFx0KTtcclxuXHJcblx0XHRpZiAocG9wdXAgJiYgcG9wdXAuZm9jdXMpIHtcclxuXHRcdFx0cG9wdXAuZm9jdXMoKTtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gcG9wdXA7XHJcblx0fSxcclxuXHJcblx0Ly8gT0F1dGggYW5kIEFQSSByZXNwb25zZSBoYW5kbGVyXHJcblx0cmVzcG9uc2VIYW5kbGVyOiBmdW5jdGlvbih3aW5kb3csIHBhcmVudCkge1xyXG5cclxuXHRcdHZhciBfdGhpcyA9IHRoaXM7XHJcblx0XHR2YXIgcDtcclxuXHRcdHZhciBsb2NhdGlvbiA9IHdpbmRvdy5sb2NhdGlvbjtcclxuXHJcblx0XHQvLyBJcyB0aGlzIGFuIGF1dGggcmVsYXkgbWVzc2FnZSB3aGljaCBuZWVkcyB0byBjYWxsIHRoZSBwcm94eT9cclxuXHRcdHAgPSBfdGhpcy5wYXJhbShsb2NhdGlvbi5zZWFyY2gpO1xyXG5cclxuXHRcdC8vIE9BdXRoMiBvciBPQXV0aDEgc2VydmVyIHJlc3BvbnNlP1xyXG5cdFx0aWYgKHAgJiYgcC5zdGF0ZSAmJiAocC5jb2RlIHx8IHAub2F1dGhfdG9rZW4pKSB7XHJcblxyXG5cdFx0XHR2YXIgc3RhdGUgPSBKU09OLnBhcnNlKHAuc3RhdGUpO1xyXG5cclxuXHRcdFx0Ly8gQWRkIHRoaXMgcGF0aCBhcyB0aGUgcmVkaXJlY3RfdXJpXHJcblx0XHRcdHAucmVkaXJlY3RfdXJpID0gc3RhdGUucmVkaXJlY3RfdXJpIHx8IGxvY2F0aW9uLmhyZWYucmVwbGFjZSgvW1xcP1xcI10uKiQvLCAnJyk7XHJcblxyXG5cdFx0XHQvLyBSZWRpcmVjdCB0byB0aGUgaG9zdFxyXG5cdFx0XHR2YXIgcGF0aCA9IHN0YXRlLm9hdXRoX3Byb3h5ICsgJz8nICsgX3RoaXMucGFyYW0ocCk7XHJcblxyXG5cdFx0XHRsb2NhdGlvbi5hc3NpZ24ocGF0aCk7XHJcblxyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gU2F2ZSBzZXNzaW9uLCBmcm9tIHJlZGlyZWN0ZWQgYXV0aGVudGljYXRpb25cclxuXHRcdC8vICNhY2Nlc3NfdG9rZW4gaGFzIGNvbWUgaW4/XHJcblx0XHQvL1xyXG5cdFx0Ly8gRkFDRUJPT0sgaXMgcmV0dXJuaW5nIGF1dGggZXJyb3JzIHdpdGhpbiBhcyBhIHF1ZXJ5X3N0cmluZy4uLiB0aGF0cyBhIHN0aWNrbGVyIGZvciBjb25zaXN0ZW5jeS5cclxuXHRcdC8vIFNvdW5kQ2xvdWQgaXMgdGhlIHN0YXRlIGluIHRoZSBxdWVyeXN0cmluZyBhbmQgdGhlIHRva2VuIGluIHRoZSBoYXNodGFnLCBzbyB3ZSdsbCBtaXggdGhlIHR3byB0b2dldGhlclxyXG5cclxuXHRcdHAgPSBfdGhpcy5tZXJnZShfdGhpcy5wYXJhbShsb2NhdGlvbi5zZWFyY2ggfHwgJycpLCBfdGhpcy5wYXJhbShsb2NhdGlvbi5oYXNoIHx8ICcnKSk7XHJcblxyXG5cdFx0Ly8gSWYgcC5zdGF0ZVxyXG5cdFx0aWYgKHAgJiYgJ3N0YXRlJyBpbiBwKSB7XHJcblxyXG5cdFx0XHQvLyBSZW1vdmUgYW55IGFkZGl0aW9uIGluZm9ybWF0aW9uXHJcblx0XHRcdC8vIEUuZy4gcC5zdGF0ZSA9ICdmYWNlYm9vay5wYWdlJztcclxuXHRcdFx0dHJ5IHtcclxuXHRcdFx0XHR2YXIgYSA9IEpTT04ucGFyc2UocC5zdGF0ZSk7XHJcblx0XHRcdFx0X3RoaXMuZXh0ZW5kKHAsIGEpO1xyXG5cdFx0XHR9XHJcblx0XHRcdGNhdGNoIChlKSB7XHJcblx0XHRcdFx0Y29uc29sZS5lcnJvcignQ291bGQgbm90IGRlY29kZSBzdGF0ZSBwYXJhbWV0ZXInKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0Ly8gQWNjZXNzX3Rva2VuP1xyXG5cdFx0XHRpZiAoKCdhY2Nlc3NfdG9rZW4nIGluIHAgJiYgcC5hY2Nlc3NfdG9rZW4pICYmIHAubmV0d29yaykge1xyXG5cclxuXHRcdFx0XHRpZiAoIXAuZXhwaXJlc19pbiB8fCBwYXJzZUludChwLmV4cGlyZXNfaW4sIDEwKSA9PT0gMCkge1xyXG5cdFx0XHRcdFx0Ly8gSWYgcC5leHBpcmVzX2luIGlzIHVuc2V0LCBzZXQgdG8gMFxyXG5cdFx0XHRcdFx0cC5leHBpcmVzX2luID0gMDtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdHAuZXhwaXJlc19pbiA9IHBhcnNlSW50KHAuZXhwaXJlc19pbiwgMTApO1xyXG5cdFx0XHRcdHAuZXhwaXJlcyA9ICgobmV3IERhdGUoKSkuZ2V0VGltZSgpIC8gMWUzKSArIChwLmV4cGlyZXNfaW4gfHwgKDYwICogNjAgKiAyNCAqIDM2NSkpO1xyXG5cclxuXHRcdFx0XHQvLyBMZXRzIHVzZSB0aGUgXCJzdGF0ZVwiIHRvIGFzc2lnbiBpdCB0byBvbmUgb2Ygb3VyIG5ldHdvcmtzXHJcblx0XHRcdFx0YXV0aENhbGxiYWNrKHAsIHdpbmRvdywgcGFyZW50KTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0Ly8gRXJyb3I9P1xyXG5cdFx0XHQvLyAmZXJyb3JfZGVzY3JpcHRpb249P1xyXG5cdFx0XHQvLyAmc3RhdGU9P1xyXG5cdFx0XHRlbHNlIGlmICgoJ2Vycm9yJyBpbiBwICYmIHAuZXJyb3IpICYmIHAubmV0d29yaykge1xyXG5cclxuXHRcdFx0XHRwLmVycm9yID0ge1xyXG5cdFx0XHRcdFx0Y29kZTogcC5lcnJvcixcclxuXHRcdFx0XHRcdG1lc3NhZ2U6IHAuZXJyb3JfbWVzc2FnZSB8fCBwLmVycm9yX2Rlc2NyaXB0aW9uXHJcblx0XHRcdFx0fTtcclxuXHJcblx0XHRcdFx0Ly8gTGV0IHRoZSBzdGF0ZSBoYW5kbGVyIGhhbmRsZSBpdFxyXG5cdFx0XHRcdGF1dGhDYWxsYmFjayhwLCB3aW5kb3csIHBhcmVudCk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdC8vIEFQSSBjYWxsLCBvciBhIGNhbmNlbGxlZCBsb2dpblxyXG5cdFx0XHQvLyBSZXN1bHQgaXMgc2VyaWFsaXplZCBKU09OIHN0cmluZ1xyXG5cdFx0XHRlbHNlIGlmIChwLmNhbGxiYWNrICYmIHAuY2FsbGJhY2sgaW4gcGFyZW50KSB7XHJcblxyXG5cdFx0XHRcdC8vIFRyaWdnZXIgYSBmdW5jdGlvbiBpbiB0aGUgcGFyZW50XHJcblx0XHRcdFx0dmFyIHJlcyA9ICdyZXN1bHQnIGluIHAgJiYgcC5yZXN1bHQgPyBKU09OLnBhcnNlKHAucmVzdWx0KSA6IGZhbHNlO1xyXG5cclxuXHRcdFx0XHQvLyBUcmlnZ2VyIHRoZSBjYWxsYmFjayBvbiB0aGUgcGFyZW50XHJcblx0XHRcdFx0Y2FsbGJhY2socGFyZW50LCBwLmNhbGxiYWNrKShyZXMpO1xyXG5cdFx0XHRcdGNsb3NlV2luZG93KCk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdC8vIElmIHRoaXMgcGFnZSBpcyBzdGlsbCBvcGVuXHJcblx0XHRcdGlmIChwLnBhZ2VfdXJpKSB7XHJcblx0XHRcdFx0bG9jYXRpb24uYXNzaWduKHAucGFnZV91cmkpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gT0F1dGggcmVkaXJlY3QsIGZpeGVzIFVSSSBmcmFnbWVudHMgZnJvbSBiZWluZyBsb3N0IGluIFNhZmFyaVxyXG5cdFx0Ly8gKFVSSSBGcmFnbWVudHMgd2l0aGluIDMwMiBMb2NhdGlvbiBVUkkgYXJlIGxvc3Qgb3ZlciBIVFRQUylcclxuXHRcdC8vIExvYWRpbmcgdGhlIHJlZGlyZWN0Lmh0bWwgYmVmb3JlIHRyaWdnZXJpbmcgdGhlIE9BdXRoIEZsb3cgc2VlbXMgdG8gZml4IGl0LlxyXG5cdFx0ZWxzZSBpZiAoJ29hdXRoX3JlZGlyZWN0JyBpbiBwKSB7XHJcblxyXG5cdFx0XHRsb2NhdGlvbi5hc3NpZ24oZGVjb2RlVVJJQ29tcG9uZW50KHAub2F1dGhfcmVkaXJlY3QpKTtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cclxuXHRcdC8vIFRyaWdnZXIgYSBjYWxsYmFjayB0byBhdXRoZW50aWNhdGVcclxuXHRcdGZ1bmN0aW9uIGF1dGhDYWxsYmFjayhvYmosIHdpbmRvdywgcGFyZW50KSB7XHJcblxyXG5cdFx0XHR2YXIgY2IgPSBvYmouY2FsbGJhY2s7XHJcblx0XHRcdHZhciBuZXR3b3JrID0gb2JqLm5ldHdvcms7XHJcblxyXG5cdFx0XHQvLyBUcmlnZ2VyIHRoZSBjYWxsYmFjayBvbiB0aGUgcGFyZW50XHJcblx0XHRcdF90aGlzLnN0b3JlKG5ldHdvcmssIG9iaik7XHJcblxyXG5cdFx0XHQvLyBJZiB0aGlzIGlzIGEgcGFnZSByZXF1ZXN0IGl0IGhhcyBubyBwYXJlbnQgb3Igb3BlbmVyIHdpbmRvdyB0byBoYW5kbGUgY2FsbGJhY2tzXHJcblx0XHRcdGlmICgoJ2Rpc3BsYXknIGluIG9iaikgJiYgb2JqLmRpc3BsYXkgPT09ICdwYWdlJykge1xyXG5cdFx0XHRcdHJldHVybjtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0Ly8gUmVtb3ZlIGZyb20gc2Vzc2lvbiBvYmplY3RcclxuXHRcdFx0aWYgKHBhcmVudCAmJiBjYiAmJiBjYiBpbiBwYXJlbnQpIHtcclxuXHJcblx0XHRcdFx0dHJ5IHtcclxuXHRcdFx0XHRcdGRlbGV0ZSBvYmouY2FsbGJhY2s7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdGNhdGNoIChlKSB7fVxyXG5cclxuXHRcdFx0XHQvLyBVcGRhdGUgc3RvcmVcclxuXHRcdFx0XHRfdGhpcy5zdG9yZShuZXR3b3JrLCBvYmopO1xyXG5cclxuXHRcdFx0XHQvLyBDYWxsIHRoZSBnbG9iYWxFdmVudCBmdW5jdGlvbiBvbiB0aGUgcGFyZW50XHJcblx0XHRcdFx0Ly8gSXQncyBzYWZlciB0byBwYXNzIGJhY2sgYSBzdHJpbmcgdG8gdGhlIHBhcmVudCxcclxuXHRcdFx0XHQvLyBSYXRoZXIgdGhhbiBhbiBvYmplY3QvYXJyYXkgKGJldHRlciBmb3IgSUU4KVxyXG5cdFx0XHRcdHZhciBzdHIgPSBKU09OLnN0cmluZ2lmeShvYmopO1xyXG5cclxuXHRcdFx0XHR0cnkge1xyXG5cdFx0XHRcdFx0Y2FsbGJhY2socGFyZW50LCBjYikoc3RyKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0Y2F0Y2ggKGUpIHtcclxuXHRcdFx0XHRcdC8vIEVycm9yIHRocm93biB3aGlsc3QgZXhlY3V0aW5nIHBhcmVudCBjYWxsYmFja1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0Y2xvc2VXaW5kb3coKTtcclxuXHRcdH1cclxuXHJcblx0XHRmdW5jdGlvbiBjYWxsYmFjayhwYXJlbnQsIGNhbGxiYWNrSUQpIHtcclxuXHRcdFx0aWYgKGNhbGxiYWNrSUQuaW5kZXhPZignX2hlbGxvanNfJykgIT09IDApIHtcclxuXHRcdFx0XHRyZXR1cm4gZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0XHR0aHJvdyAnQ291bGQgbm90IGV4ZWN1dGUgY2FsbGJhY2sgJyArIGNhbGxiYWNrSUQ7XHJcblx0XHRcdFx0fTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0cmV0dXJuIHBhcmVudFtjYWxsYmFja0lEXTtcclxuXHRcdH1cclxuXHJcblx0XHRmdW5jdGlvbiBjbG9zZVdpbmRvdygpIHtcclxuXHJcblx0XHRcdGlmICh3aW5kb3cuZnJhbWVFbGVtZW50KSB7XHJcblx0XHRcdFx0Ly8gSW5zaWRlIGFuIGlmcmFtZSwgcmVtb3ZlIGZyb20gcGFyZW50XHJcblx0XHRcdFx0cGFyZW50LmRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQod2luZG93LmZyYW1lRWxlbWVudCk7XHJcblx0XHRcdH1cclxuXHRcdFx0ZWxzZSB7XHJcblx0XHRcdFx0Ly8gQ2xvc2UgdGhpcyBjdXJyZW50IHdpbmRvd1xyXG5cdFx0XHRcdHRyeSB7XHJcblx0XHRcdFx0XHR3aW5kb3cuY2xvc2UoKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0Y2F0Y2ggKGUpIHt9XHJcblxyXG5cdFx0XHRcdC8vIElPUyBidWcgd29udCBsZXQgdXMgY2xvc2UgYSBwb3B1cCBpZiBzdGlsbCBsb2FkaW5nXHJcblx0XHRcdFx0aWYgKHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKSB7XHJcblx0XHRcdFx0XHR3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsIGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdFx0XHR3aW5kb3cuY2xvc2UoKTtcclxuXHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cclxuXHRcdH1cclxuXHR9XHJcbn0pO1xyXG5cclxuLy8gRXZlbnRzXHJcbi8vIEV4dGVuZCB0aGUgaGVsbG8gb2JqZWN0IHdpdGggaXRzIG93biBldmVudCBpbnN0YW5jZVxyXG5oZWxsby51dGlscy5FdmVudC5jYWxsKGhlbGxvKTtcclxuXHJcbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcbi8vIE1vbml0b3Jpbmcgc2Vzc2lvbiBzdGF0ZVxyXG4vLyBDaGVjayBmb3Igc2Vzc2lvbiBjaGFuZ2VzXHJcbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcblxyXG4oZnVuY3Rpb24oaGVsbG8pIHtcclxuXHJcblx0Ly8gTW9uaXRvciBmb3IgYSBjaGFuZ2UgaW4gc3RhdGUgYW5kIGZpcmVcclxuXHR2YXIgb2xkU2Vzc2lvbnMgPSB7fTtcclxuXHJcblx0Ly8gSGFzaCBvZiBleHBpcmVkIHRva2Vuc1xyXG5cdHZhciBleHBpcmVkID0ge307XHJcblxyXG5cdC8vIExpc3RlbiB0byBvdGhlciB0cmlnZ2VycyB0byBBdXRoIGV2ZW50cywgdXNlIHRoZXNlIHRvIHVwZGF0ZSB0aGlzXHJcblx0aGVsbG8ub24oJ2F1dGgubG9naW4sIGF1dGgubG9nb3V0JywgZnVuY3Rpb24oYXV0aCkge1xyXG5cdFx0aWYgKGF1dGggJiYgdHlwZW9mIChhdXRoKSA9PT0gJ29iamVjdCcgJiYgYXV0aC5uZXR3b3JrKSB7XHJcblx0XHRcdG9sZFNlc3Npb25zW2F1dGgubmV0d29ya10gPSBoZWxsby51dGlscy5zdG9yZShhdXRoLm5ldHdvcmspIHx8IHt9O1xyXG5cdFx0fVxyXG5cdH0pO1xyXG5cclxuXHQoZnVuY3Rpb24gc2VsZigpIHtcclxuXHJcblx0XHR2YXIgQ1VSUkVOVF9USU1FID0gKChuZXcgRGF0ZSgpKS5nZXRUaW1lKCkgLyAxZTMpO1xyXG5cdFx0dmFyIGVtaXQgPSBmdW5jdGlvbihldmVudE5hbWUpIHtcclxuXHRcdFx0aGVsbG8uZW1pdCgnYXV0aC4nICsgZXZlbnROYW1lLCB7XHJcblx0XHRcdFx0bmV0d29yazogbmFtZSxcclxuXHRcdFx0XHRhdXRoUmVzcG9uc2U6IHNlc3Npb25cclxuXHRcdFx0fSk7XHJcblx0XHR9O1xyXG5cclxuXHRcdC8vIExvb3AgdGhyb3VnaCB0aGUgc2VydmljZXNcclxuXHRcdGZvciAodmFyIG5hbWUgaW4gaGVsbG8uc2VydmljZXMpIHtpZiAoaGVsbG8uc2VydmljZXMuaGFzT3duUHJvcGVydHkobmFtZSkpIHtcclxuXHJcblx0XHRcdGlmICghaGVsbG8uc2VydmljZXNbbmFtZV0uaWQpIHtcclxuXHRcdFx0XHQvLyBXZSBoYXZlbid0IGF0dGFjaGVkIGFuIElEIHNvIGRvbnQgbGlzdGVuLlxyXG5cdFx0XHRcdGNvbnRpbnVlO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQvLyBHZXQgc2Vzc2lvblxyXG5cdFx0XHR2YXIgc2Vzc2lvbiA9IGhlbGxvLnV0aWxzLnN0b3JlKG5hbWUpIHx8IHt9O1xyXG5cdFx0XHR2YXIgcHJvdmlkZXIgPSBoZWxsby5zZXJ2aWNlc1tuYW1lXTtcclxuXHRcdFx0dmFyIG9sZFNlc3MgPSBvbGRTZXNzaW9uc1tuYW1lXSB8fCB7fTtcclxuXHJcblx0XHRcdC8vIExpc3RlbiBmb3IgZ2xvYmFsRXZlbnRzIHRoYXQgZGlkIG5vdCBnZXQgdHJpZ2dlcmVkIGZyb20gdGhlIGNoaWxkXHJcblx0XHRcdGlmIChzZXNzaW9uICYmICdjYWxsYmFjaycgaW4gc2Vzc2lvbikge1xyXG5cclxuXHRcdFx0XHQvLyBUbyBkbyByZW1vdmUgZnJvbSBzZXNzaW9uIG9iamVjdC4uLlxyXG5cdFx0XHRcdHZhciBjYiA9IHNlc3Npb24uY2FsbGJhY2s7XHJcblx0XHRcdFx0dHJ5IHtcclxuXHRcdFx0XHRcdGRlbGV0ZSBzZXNzaW9uLmNhbGxiYWNrO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRjYXRjaCAoZSkge31cclxuXHJcblx0XHRcdFx0Ly8gVXBkYXRlIHN0b3JlXHJcblx0XHRcdFx0Ly8gUmVtb3ZpbmcgdGhlIGNhbGxiYWNrXHJcblx0XHRcdFx0aGVsbG8udXRpbHMuc3RvcmUobmFtZSwgc2Vzc2lvbik7XHJcblxyXG5cdFx0XHRcdC8vIEVtaXQgZ2xvYmFsIGV2ZW50c1xyXG5cdFx0XHRcdHRyeSB7XHJcblx0XHRcdFx0XHR3aW5kb3dbY2JdKHNlc3Npb24pO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRjYXRjaCAoZSkge31cclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0Ly8gUmVmcmVzaCB0b2tlblxyXG5cdFx0XHRpZiAoc2Vzc2lvbiAmJiAoJ2V4cGlyZXMnIGluIHNlc3Npb24pICYmIHNlc3Npb24uZXhwaXJlcyA8IENVUlJFTlRfVElNRSkge1xyXG5cclxuXHRcdFx0XHQvLyBJZiBhdXRvIHJlZnJlc2ggaXMgcG9zc2libGVcclxuXHRcdFx0XHQvLyBFaXRoZXIgdGhlIGJyb3dzZXIgc3VwcG9ydHNcclxuXHRcdFx0XHR2YXIgcmVmcmVzaCA9IHByb3ZpZGVyLnJlZnJlc2ggfHwgc2Vzc2lvbi5yZWZyZXNoX3Rva2VuO1xyXG5cclxuXHRcdFx0XHQvLyBIYXMgdGhlIHJlZnJlc2ggYmVlbiBydW4gcmVjZW50bHk/XHJcblx0XHRcdFx0aWYgKHJlZnJlc2ggJiYgKCEobmFtZSBpbiBleHBpcmVkKSB8fCBleHBpcmVkW25hbWVdIDwgQ1VSUkVOVF9USU1FKSkge1xyXG5cdFx0XHRcdFx0Ly8gVHJ5IHRvIHJlc2lnbmluXHJcblx0XHRcdFx0XHRoZWxsby5lbWl0KCdub3RpY2UnLCBuYW1lICsgJyBoYXMgZXhwaXJlZCB0cnlpbmcgdG8gcmVzaWduaW4nKTtcclxuXHRcdFx0XHRcdGhlbGxvLmxvZ2luKG5hbWUsIHtkaXNwbGF5OiAnbm9uZScsIGZvcmNlOiBmYWxzZX0pO1xyXG5cclxuXHRcdFx0XHRcdC8vIFVwZGF0ZSBleHBpcmVkLCBldmVyeSAxMCBtaW51dGVzXHJcblx0XHRcdFx0XHRleHBpcmVkW25hbWVdID0gQ1VSUkVOVF9USU1FICsgNjAwO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0Ly8gRG9lcyB0aGlzIHByb3ZpZGVyIG5vdCBzdXBwb3J0IHJlZnJlc2hcclxuXHRcdFx0XHRlbHNlIGlmICghcmVmcmVzaCAmJiAhKG5hbWUgaW4gZXhwaXJlZCkpIHtcclxuXHRcdFx0XHRcdC8vIExhYmVsIHRoZSBldmVudFxyXG5cdFx0XHRcdFx0ZW1pdCgnZXhwaXJlZCcpO1xyXG5cdFx0XHRcdFx0ZXhwaXJlZFtuYW1lXSA9IHRydWU7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHQvLyBJZiBzZXNzaW9uIGhhcyBleHBpcmVkIHRoZW4gd2UgZG9udCB3YW50IHRvIHN0b3JlIGl0cyB2YWx1ZSB1bnRpbCBpdCBjYW4gYmUgZXN0YWJsaXNoZWQgdGhhdCBpdHMgYmVlbiB1cGRhdGVkXHJcblx0XHRcdFx0Y29udGludWU7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdC8vIEhhcyBzZXNzaW9uIGNoYW5nZWQ/XHJcblx0XHRcdGVsc2UgaWYgKG9sZFNlc3MuYWNjZXNzX3Rva2VuID09PSBzZXNzaW9uLmFjY2Vzc190b2tlbiAmJlxyXG5cdFx0XHRvbGRTZXNzLmV4cGlyZXMgPT09IHNlc3Npb24uZXhwaXJlcykge1xyXG5cdFx0XHRcdGNvbnRpbnVlO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQvLyBBY2Nlc3NfdG9rZW4gaGFzIGJlZW4gcmVtb3ZlZFxyXG5cdFx0XHRlbHNlIGlmICghc2Vzc2lvbi5hY2Nlc3NfdG9rZW4gJiYgb2xkU2Vzcy5hY2Nlc3NfdG9rZW4pIHtcclxuXHRcdFx0XHRlbWl0KCdsb2dvdXQnKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0Ly8gQWNjZXNzX3Rva2VuIGhhcyBiZWVuIGNyZWF0ZWRcclxuXHRcdFx0ZWxzZSBpZiAoc2Vzc2lvbi5hY2Nlc3NfdG9rZW4gJiYgIW9sZFNlc3MuYWNjZXNzX3Rva2VuKSB7XHJcblx0XHRcdFx0ZW1pdCgnbG9naW4nKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0Ly8gQWNjZXNzX3Rva2VuIGhhcyBiZWVuIHVwZGF0ZWRcclxuXHRcdFx0ZWxzZSBpZiAoc2Vzc2lvbi5leHBpcmVzICE9PSBvbGRTZXNzLmV4cGlyZXMpIHtcclxuXHRcdFx0XHRlbWl0KCd1cGRhdGUnKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0Ly8gVXBkYXRlZCBzdG9yZWQgc2Vzc2lvblxyXG5cdFx0XHRvbGRTZXNzaW9uc1tuYW1lXSA9IHNlc3Npb247XHJcblxyXG5cdFx0XHQvLyBSZW1vdmUgdGhlIGV4cGlyZWQgZmxhZ3NcclxuXHRcdFx0aWYgKG5hbWUgaW4gZXhwaXJlZCkge1xyXG5cdFx0XHRcdGRlbGV0ZSBleHBpcmVkW25hbWVdO1xyXG5cdFx0XHR9XHJcblx0XHR9fVxyXG5cclxuXHRcdC8vIENoZWNrIGVycm9yIGV2ZW50c1xyXG5cdFx0c2V0VGltZW91dChzZWxmLCAxMDAwKTtcclxuXHR9KSgpO1xyXG5cclxufSkoaGVsbG8pO1xyXG5cclxuLy8gRU9GIENPUkUgbGliXHJcbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuXHJcbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcbi8vIEFQSVxyXG4vLyBAcGFyYW0gcGF0aCAgICBzdHJpbmdcclxuLy8gQHBhcmFtIHF1ZXJ5ICAgb2JqZWN0IChvcHRpb25hbClcclxuLy8gQHBhcmFtIG1ldGhvZCAgc3RyaW5nIChvcHRpb25hbClcclxuLy8gQHBhcmFtIGRhdGEgICAgb2JqZWN0IChvcHRpb25hbClcclxuLy8gQHBhcmFtIHRpbWVvdXQgaW50ZWdlciAob3B0aW9uYWwpXHJcbi8vIEBwYXJhbSBjYWxsYmFjayAgZnVuY3Rpb24gKG9wdGlvbmFsKVxyXG5cclxuaGVsbG8uYXBpID0gZnVuY3Rpb24oKSB7XHJcblxyXG5cdC8vIFNob3J0aGFuZFxyXG5cdHZhciBfdGhpcyA9IHRoaXM7XHJcblx0dmFyIHV0aWxzID0gX3RoaXMudXRpbHM7XHJcblx0dmFyIGVycm9yID0gdXRpbHMuZXJyb3I7XHJcblxyXG5cdC8vIENvbnN0cnVjdCBhIG5ldyBQcm9taXNlIG9iamVjdFxyXG5cdHZhciBwcm9taXNlID0gdXRpbHMuUHJvbWlzZSgpO1xyXG5cclxuXHQvLyBBcmd1bWVudHNcclxuXHR2YXIgcCA9IHV0aWxzLmFyZ3Moe3BhdGg6ICdzIScsIHF1ZXJ5OiAnbycsIG1ldGhvZDogJ3MnLCBkYXRhOiAnbycsIHRpbWVvdXQ6ICdpJywgY2FsbGJhY2s6ICdmJ30sIGFyZ3VtZW50cyk7XHJcblxyXG5cdC8vIE1ldGhvZFxyXG5cdHAubWV0aG9kID0gKHAubWV0aG9kIHx8ICdnZXQnKS50b0xvd2VyQ2FzZSgpO1xyXG5cclxuXHQvLyBIZWFkZXJzXHJcblx0cC5oZWFkZXJzID0gcC5oZWFkZXJzIHx8IHt9O1xyXG5cclxuXHQvLyBRdWVyeVxyXG5cdHAucXVlcnkgPSBwLnF1ZXJ5IHx8IHt9O1xyXG5cclxuXHQvLyBJZiBnZXQsIHB1dCBhbGwgcGFyYW1ldGVycyBpbnRvIHF1ZXJ5XHJcblx0aWYgKHAubWV0aG9kID09PSAnZ2V0JyB8fCBwLm1ldGhvZCA9PT0gJ2RlbGV0ZScpIHtcclxuXHRcdHV0aWxzLmV4dGVuZChwLnF1ZXJ5LCBwLmRhdGEpO1xyXG5cdFx0cC5kYXRhID0ge307XHJcblx0fVxyXG5cclxuXHR2YXIgZGF0YSA9IHAuZGF0YSA9IHAuZGF0YSB8fCB7fTtcclxuXHJcblx0Ly8gQ29tcGxldGVkIGV2ZW50IGNhbGxiYWNrXHJcblx0cHJvbWlzZS50aGVuKHAuY2FsbGJhY2ssIHAuY2FsbGJhY2spO1xyXG5cclxuXHQvLyBSZW1vdmUgdGhlIG5ldHdvcmsgZnJvbSBwYXRoLCBlLmcuIGZhY2Vib29rOi9tZS9mcmllbmRzXHJcblx0Ly8gUmVzdWx0cyBpbiB7IG5ldHdvcmsgOiBmYWNlYm9vaywgcGF0aCA6IG1lL2ZyaWVuZHMgfVxyXG5cdGlmICghcC5wYXRoKSB7XHJcblx0XHRyZXR1cm4gcHJvbWlzZS5yZWplY3QoZXJyb3IoJ2ludmFsaWRfcGF0aCcsICdNaXNzaW5nIHRoZSBwYXRoIHBhcmFtZXRlciBmcm9tIHRoZSByZXF1ZXN0JykpO1xyXG5cdH1cclxuXHJcblx0cC5wYXRoID0gcC5wYXRoLnJlcGxhY2UoL15cXC8rLywgJycpO1xyXG5cdHZhciBhID0gKHAucGF0aC5zcGxpdCgvW1xcL1xcOl0vLCAyKSB8fCBbXSlbMF0udG9Mb3dlckNhc2UoKTtcclxuXHJcblx0aWYgKGEgaW4gX3RoaXMuc2VydmljZXMpIHtcclxuXHRcdHAubmV0d29yayA9IGE7XHJcblx0XHR2YXIgcmVnID0gbmV3IFJlZ0V4cCgnXicgKyBhICsgJzo/XFwvPycpO1xyXG5cdFx0cC5wYXRoID0gcC5wYXRoLnJlcGxhY2UocmVnLCAnJyk7XHJcblx0fVxyXG5cclxuXHQvLyBOZXR3b3JrICYgUHJvdmlkZXJcclxuXHQvLyBEZWZpbmUgdGhlIG5ldHdvcmsgdGhhdCB0aGlzIHJlcXVlc3QgaXMgbWFkZSBmb3JcclxuXHRwLm5ldHdvcmsgPSBfdGhpcy5zZXR0aW5ncy5kZWZhdWx0X3NlcnZpY2UgPSBwLm5ldHdvcmsgfHwgX3RoaXMuc2V0dGluZ3MuZGVmYXVsdF9zZXJ2aWNlO1xyXG5cdHZhciBvID0gX3RoaXMuc2VydmljZXNbcC5uZXR3b3JrXTtcclxuXHJcblx0Ly8gSU5WQUxJRFxyXG5cdC8vIElzIHRoZXJlIG5vIHNlcnZpY2UgYnkgdGhlIGdpdmVuIG5ldHdvcmsgbmFtZT9cclxuXHRpZiAoIW8pIHtcclxuXHRcdHJldHVybiBwcm9taXNlLnJlamVjdChlcnJvcignaW52YWxpZF9uZXR3b3JrJywgJ0NvdWxkIG5vdCBtYXRjaCB0aGUgc2VydmljZSByZXF1ZXN0ZWQ6ICcgKyBwLm5ldHdvcmspKTtcclxuXHR9XHJcblxyXG5cdC8vIFBBVEhcclxuXHQvLyBBcyBsb25nIGFzIHRoZSBwYXRoIGlzbid0IGZsYWdnZWQgYXMgdW5hdmFpYWJsZSwgZS5nLiBwYXRoID09IGZhbHNlXHJcblxyXG5cdGlmICghKCEocC5tZXRob2QgaW4gbykgfHwgIShwLnBhdGggaW4gb1twLm1ldGhvZF0pIHx8IG9bcC5tZXRob2RdW3AucGF0aF0gIT09IGZhbHNlKSkge1xyXG5cdFx0cmV0dXJuIHByb21pc2UucmVqZWN0KGVycm9yKCdpbnZhbGlkX3BhdGgnLCAnVGhlIHByb3ZpZGVkIHBhdGggaXMgbm90IGF2YWlsYWJsZSBvbiB0aGUgc2VsZWN0ZWQgbmV0d29yaycpKTtcclxuXHR9XHJcblxyXG5cdC8vIFBST1hZXHJcblx0Ly8gT0F1dGgxIGNhbGxzIGFsd2F5cyBuZWVkIGEgcHJveHlcclxuXHJcblx0aWYgKCFwLm9hdXRoX3Byb3h5KSB7XHJcblx0XHRwLm9hdXRoX3Byb3h5ID0gX3RoaXMuc2V0dGluZ3Mub2F1dGhfcHJveHk7XHJcblx0fVxyXG5cclxuXHRpZiAoISgncHJveHknIGluIHApKSB7XHJcblx0XHRwLnByb3h5ID0gcC5vYXV0aF9wcm94eSAmJiBvLm9hdXRoICYmIHBhcnNlSW50KG8ub2F1dGgudmVyc2lvbiwgMTApID09PSAxO1xyXG5cdH1cclxuXHJcblx0Ly8gVElNRU9VVFxyXG5cdC8vIEFkb3B0IHRpbWVvdXQgZnJvbSBnbG9iYWwgc2V0dGluZ3MgYnkgZGVmYXVsdFxyXG5cclxuXHRpZiAoISgndGltZW91dCcgaW4gcCkpIHtcclxuXHRcdHAudGltZW91dCA9IF90aGlzLnNldHRpbmdzLnRpbWVvdXQ7XHJcblx0fVxyXG5cclxuXHQvLyBGb3JtYXQgcmVzcG9uc2VcclxuXHQvLyBXaGV0aGVyIHRvIHJ1biB0aGUgcmF3IHJlc3BvbnNlIHRocm91Z2ggcG9zdCBwcm9jZXNzaW5nLlxyXG5cdGlmICghKCdmb3JtYXRSZXNwb25zZScgaW4gcCkpIHtcclxuXHRcdHAuZm9ybWF0UmVzcG9uc2UgPSB0cnVlO1xyXG5cdH1cclxuXHJcblx0Ly8gR2V0IHRoZSBjdXJyZW50IHNlc3Npb25cclxuXHQvLyBBcHBlbmQgdGhlIGFjY2Vzc190b2tlbiB0byB0aGUgcXVlcnlcclxuXHRwLmF1dGhSZXNwb25zZSA9IF90aGlzLmdldEF1dGhSZXNwb25zZShwLm5ldHdvcmspO1xyXG5cdGlmIChwLmF1dGhSZXNwb25zZSAmJiBwLmF1dGhSZXNwb25zZS5hY2Nlc3NfdG9rZW4pIHtcclxuXHRcdHAucXVlcnkuYWNjZXNzX3Rva2VuID0gcC5hdXRoUmVzcG9uc2UuYWNjZXNzX3Rva2VuO1xyXG5cdH1cclxuXHJcblx0dmFyIHVybCA9IHAucGF0aDtcclxuXHR2YXIgbTtcclxuXHJcblx0Ly8gU3RvcmUgdGhlIHF1ZXJ5IGFzIG9wdGlvbnNcclxuXHQvLyBUaGlzIGlzIHVzZWQgdG8gcG9wdWxhdGUgdGhlIHJlcXVlc3Qgb2JqZWN0IGJlZm9yZSB0aGUgZGF0YSBpcyBhdWdtZW50ZWQgYnkgdGhlIHByZXdyYXAgaGFuZGxlcnMuXHJcblx0cC5vcHRpb25zID0gdXRpbHMuY2xvbmUocC5xdWVyeSk7XHJcblxyXG5cdC8vIENsb25lIHRoZSBkYXRhIG9iamVjdFxyXG5cdC8vIFByZXZlbnQgdGhpcyBzY3JpcHQgb3ZlcndyaXRpbmcgdGhlIGRhdGEgb2YgdGhlIGluY29taW5nIG9iamVjdC5cclxuXHQvLyBFbnN1cmUgdGhhdCBldmVyeXRpbWUgd2UgcnVuIGFuIGl0ZXJhdGlvbiB0aGUgY2FsbGJhY2tzIGhhdmVuJ3QgcmVtb3ZlZCBzb21lIGRhdGFcclxuXHRwLmRhdGEgPSB1dGlscy5jbG9uZShkYXRhKTtcclxuXHJcblx0Ly8gVVJMIE1hcHBpbmdcclxuXHQvLyBJcyB0aGVyZSBhIG1hcCBmb3IgdGhlIGdpdmVuIFVSTD9cclxuXHR2YXIgYWN0aW9ucyA9IG9beydkZWxldGUnOiAnZGVsJ31bcC5tZXRob2RdIHx8IHAubWV0aG9kXSB8fCB7fTtcclxuXHJcblx0Ly8gRXh0cmFwb2xhdGUgdGhlIFF1ZXJ5U3RyaW5nXHJcblx0Ly8gUHJvdmlkZSBhIGNsZWFuIHBhdGhcclxuXHQvLyBNb3ZlIHRoZSBxdWVyeXN0cmluZyBpbnRvIHRoZSBkYXRhXHJcblx0aWYgKHAubWV0aG9kID09PSAnZ2V0Jykge1xyXG5cclxuXHRcdHZhciBxdWVyeSA9IHVybC5zcGxpdCgvW1xcPyNdLylbMV07XHJcblx0XHRpZiAocXVlcnkpIHtcclxuXHRcdFx0dXRpbHMuZXh0ZW5kKHAucXVlcnksIHV0aWxzLnBhcmFtKHF1ZXJ5KSk7XHJcblxyXG5cdFx0XHQvLyBSZW1vdmUgdGhlIHF1ZXJ5IHBhcnQgZnJvbSB0aGUgVVJMXHJcblx0XHRcdHVybCA9IHVybC5yZXBsYWNlKC9cXD8uKj8oI3wkKS8sICckMScpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0Ly8gSXMgdGhlIGhhc2ggZnJhZ21lbnQgZGVmaW5lZFxyXG5cdGlmICgobSA9IHVybC5tYXRjaCgvIyguKykvLCAnJykpKSB7XHJcblx0XHR1cmwgPSB1cmwuc3BsaXQoJyMnKVswXTtcclxuXHRcdHAucGF0aCA9IG1bMV07XHJcblx0fVxyXG5cdGVsc2UgaWYgKHVybCBpbiBhY3Rpb25zKSB7XHJcblx0XHRwLnBhdGggPSB1cmw7XHJcblx0XHR1cmwgPSBhY3Rpb25zW3VybF07XHJcblx0fVxyXG5cdGVsc2UgaWYgKCdkZWZhdWx0JyBpbiBhY3Rpb25zKSB7XHJcblx0XHR1cmwgPSBhY3Rpb25zWydkZWZhdWx0J107XHJcblx0fVxyXG5cclxuXHQvLyBSZWRpcmVjdCBIYW5kbGVyXHJcblx0Ly8gVGhpcyBkZWZpbmVzIGZvciB0aGUgRm9ybStJZnJhbWUrSGFzaCBoYWNrIHdoZXJlIHRvIHJldHVybiB0aGUgcmVzdWx0cyB0b28uXHJcblx0cC5yZWRpcmVjdF91cmkgPSBfdGhpcy5zZXR0aW5ncy5yZWRpcmVjdF91cmk7XHJcblxyXG5cdC8vIERlZmluZSBGb3JtYXRIYW5kbGVyXHJcblx0Ly8gVGhlIHJlcXVlc3QgY2FuIGJlIHByb2Nlc2VkIGluIGEgbXVsdGl0dWRlIG9mIHdheXNcclxuXHQvLyBIZXJlJ3MgdGhlIG9wdGlvbnMgLSBkZXBlbmRpbmcgb24gdGhlIGJyb3dzZXIgYW5kIGVuZHBvaW50XHJcblx0cC54aHIgPSBvLnhocjtcclxuXHRwLmpzb25wID0gby5qc29ucDtcclxuXHRwLmZvcm0gPSBvLmZvcm07XHJcblxyXG5cdC8vIE1ha2UgcmVxdWVzdFxyXG5cdGlmICh0eXBlb2YgKHVybCkgPT09ICdmdW5jdGlvbicpIHtcclxuXHRcdC8vIERvZXMgc2VsZiBoYXZlIGl0cyBvd24gY2FsbGJhY2s/XHJcblx0XHR1cmwocCwgZ2V0UGF0aCk7XHJcblx0fVxyXG5cdGVsc2Uge1xyXG5cdFx0Ly8gRWxzZSB0aGUgVVJMIGlzIGEgc3RyaW5nXHJcblx0XHRnZXRQYXRoKHVybCk7XHJcblx0fVxyXG5cclxuXHRyZXR1cm4gcHJvbWlzZS5wcm94eTtcclxuXHJcblx0Ly8gSWYgdXJsIG5lZWRzIGEgYmFzZVxyXG5cdC8vIFdyYXAgZXZlcnl0aGluZyBpblxyXG5cdGZ1bmN0aW9uIGdldFBhdGgodXJsKSB7XHJcblxyXG5cdFx0Ly8gRm9ybWF0IHRoZSBzdHJpbmcgaWYgaXQgbmVlZHMgaXRcclxuXHRcdHVybCA9IHVybC5yZXBsYWNlKC9cXEBcXHsoW2EtelxcX1xcLV0rKShcXHwuKj8pP1xcfS9naSwgZnVuY3Rpb24obSwga2V5LCBkZWZhdWx0cykge1xyXG5cdFx0XHR2YXIgdmFsID0gZGVmYXVsdHMgPyBkZWZhdWx0cy5yZXBsYWNlKC9eXFx8LywgJycpIDogJyc7XHJcblx0XHRcdGlmIChrZXkgaW4gcC5xdWVyeSkge1xyXG5cdFx0XHRcdHZhbCA9IHAucXVlcnlba2V5XTtcclxuXHRcdFx0XHRkZWxldGUgcC5xdWVyeVtrZXldO1xyXG5cdFx0XHR9XHJcblx0XHRcdGVsc2UgaWYgKHAuZGF0YSAmJiBrZXkgaW4gcC5kYXRhKSB7XHJcblx0XHRcdFx0dmFsID0gcC5kYXRhW2tleV07XHJcblx0XHRcdFx0ZGVsZXRlIHAuZGF0YVtrZXldO1xyXG5cdFx0XHR9XHJcblx0XHRcdGVsc2UgaWYgKCFkZWZhdWx0cykge1xyXG5cdFx0XHRcdHByb21pc2UucmVqZWN0KGVycm9yKCdtaXNzaW5nX2F0dHJpYnV0ZScsICdUaGUgYXR0cmlidXRlICcgKyBrZXkgKyAnIGlzIG1pc3NpbmcgZnJvbSB0aGUgcmVxdWVzdCcpKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0cmV0dXJuIHZhbDtcclxuXHRcdH0pO1xyXG5cclxuXHRcdC8vIEFkZCBiYXNlXHJcblx0XHRpZiAoIXVybC5tYXRjaCgvXmh0dHBzPzpcXC9cXC8vKSkge1xyXG5cdFx0XHR1cmwgPSBvLmJhc2UgKyB1cmw7XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gRGVmaW5lIHRoZSByZXF1ZXN0IFVSTFxyXG5cdFx0cC51cmwgPSB1cmw7XHJcblxyXG5cdFx0Ly8gTWFrZSB0aGUgSFRUUCByZXF1ZXN0IHdpdGggdGhlIGN1cmF0ZWQgcmVxdWVzdCBvYmplY3RcclxuXHRcdC8vIENBTExCQUNLIEhBTkRMRVJcclxuXHRcdC8vIEAgcmVzcG9uc2Ugb2JqZWN0XHJcblx0XHQvLyBAIHN0YXR1c0NvZGUgaW50ZWdlciBpZiBhdmFpbGFibGVcclxuXHRcdHV0aWxzLnJlcXVlc3QocCwgZnVuY3Rpb24ociwgaGVhZGVycykge1xyXG5cclxuXHRcdFx0Ly8gSXMgdGhpcyBhIHJhdyByZXNwb25zZT9cclxuXHRcdFx0aWYgKCFwLmZvcm1hdFJlc3BvbnNlKSB7XHJcblx0XHRcdFx0Ly8gQmFkIHJlcXVlc3Q/IGVycm9yIHN0YXR1c0NvZGUgb3Igb3RoZXJ3aXNlIGNvbnRhaW5zIGFuIGVycm9yIHJlc3BvbnNlIHZpcyBKU09OUD9cclxuXHRcdFx0XHRpZiAodHlwZW9mIGhlYWRlcnMgPT09ICdvYmplY3QnID8gKGhlYWRlcnMuc3RhdHVzQ29kZSA+PSA0MDApIDogKHR5cGVvZiByID09PSAnb2JqZWN0JyAmJiAnZXJyb3InIGluIHIpKSB7XHJcblx0XHRcdFx0XHRwcm9taXNlLnJlamVjdChyKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0ZWxzZSB7XHJcblx0XHRcdFx0XHRwcm9taXNlLmZ1bGZpbGwocik7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdC8vIFNob3VsZCB0aGlzIGJlIGFuIG9iamVjdFxyXG5cdFx0XHRpZiAociA9PT0gdHJ1ZSkge1xyXG5cdFx0XHRcdHIgPSB7c3VjY2Vzczp0cnVlfTtcclxuXHRcdFx0fVxyXG5cdFx0XHRlbHNlIGlmICghcikge1xyXG5cdFx0XHRcdHIgPSB7fTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0Ly8gVGhlIGRlbGV0ZSBjYWxsYmFjayBuZWVkcyBhIGJldHRlciByZXNwb25zZVxyXG5cdFx0XHRpZiAocC5tZXRob2QgPT09ICdkZWxldGUnKSB7XHJcblx0XHRcdFx0ciA9ICghciB8fCB1dGlscy5pc0VtcHR5KHIpKSA/IHtzdWNjZXNzOnRydWV9IDogcjtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0Ly8gRk9STUFUIFJFU1BPTlNFP1xyXG5cdFx0XHQvLyBEb2VzIHNlbGYgcmVxdWVzdCBoYXZlIGEgY29ycmVzcG9uZGluZyBmb3JtYXR0ZXJcclxuXHRcdFx0aWYgKG8ud3JhcCAmJiAoKHAucGF0aCBpbiBvLndyYXApIHx8ICgnZGVmYXVsdCcgaW4gby53cmFwKSkpIHtcclxuXHRcdFx0XHR2YXIgd3JhcCA9IChwLnBhdGggaW4gby53cmFwID8gcC5wYXRoIDogJ2RlZmF1bHQnKTtcclxuXHRcdFx0XHR2YXIgdGltZSA9IChuZXcgRGF0ZSgpKS5nZXRUaW1lKCk7XHJcblxyXG5cdFx0XHRcdC8vIEZPUk1BVCBSRVNQT05TRVxyXG5cdFx0XHRcdHZhciBiID0gby53cmFwW3dyYXBdKHIsIGhlYWRlcnMsIHApO1xyXG5cclxuXHRcdFx0XHQvLyBIYXMgdGhlIHJlc3BvbnNlIGJlZW4gdXR0ZXJseSBvdmVyd3JpdHRlbj9cclxuXHRcdFx0XHQvLyBUeXBpY2FsbHkgc2VsZiBhdWdtZW50cyB0aGUgZXhpc3Rpbmcgb2JqZWN0Li4gYnV0IGZvciB0aG9zZSByYXJlIG9jY2Fzc2lvbnNcclxuXHRcdFx0XHRpZiAoYikge1xyXG5cdFx0XHRcdFx0ciA9IGI7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQvLyBJcyB0aGVyZSBhIG5leHRfcGFnZSBkZWZpbmVkIGluIHRoZSByZXNwb25zZT9cclxuXHRcdFx0aWYgKHIgJiYgJ3BhZ2luZycgaW4gciAmJiByLnBhZ2luZy5uZXh0KSB7XHJcblxyXG5cdFx0XHRcdC8vIEFkZCB0aGUgcmVsYXRpdmUgcGF0aCBpZiBpdCBpcyBtaXNzaW5nIGZyb20gdGhlIHBhZ2luZy9uZXh0IHBhdGhcclxuXHRcdFx0XHRpZiAoci5wYWdpbmcubmV4dFswXSA9PT0gJz8nKSB7XHJcblx0XHRcdFx0XHRyLnBhZ2luZy5uZXh0ID0gcC5wYXRoICsgci5wYWdpbmcubmV4dDtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdC8vIFRoZSByZWxhdGl2ZSBwYXRoIGhhcyBiZWVuIGRlZmluZWQsIGxldHMgbWFya3VwIHRoZSBoYW5kbGVyIGluIHRoZSBIYXNoRnJhZ21lbnRcclxuXHRcdFx0XHRlbHNlIHtcclxuXHRcdFx0XHRcdHIucGFnaW5nLm5leHQgKz0gJyMnICsgcC5wYXRoO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0Ly8gRGlzcGF0Y2ggdG8gbGlzdGVuZXJzXHJcblx0XHRcdC8vIEVtaXQgZXZlbnRzIHdoaWNoIHBlcnRhaW4gdG8gdGhlIGZvcm1hdHRlZCByZXNwb25zZVxyXG5cdFx0XHRpZiAoIXIgfHwgJ2Vycm9yJyBpbiByKSB7XHJcblx0XHRcdFx0cHJvbWlzZS5yZWplY3Qocik7XHJcblx0XHRcdH1cclxuXHRcdFx0ZWxzZSB7XHJcblx0XHRcdFx0cHJvbWlzZS5mdWxmaWxsKHIpO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHR9XHJcbn07XHJcblxyXG4vLyBBUEkgdXRpbGl0aWVzXHJcbmhlbGxvLnV0aWxzLmV4dGVuZChoZWxsby51dGlscywge1xyXG5cclxuXHQvLyBNYWtlIGFuIEhUVFAgcmVxdWVzdFxyXG5cdHJlcXVlc3Q6IGZ1bmN0aW9uKHAsIGNhbGxiYWNrKSB7XHJcblxyXG5cdFx0dmFyIF90aGlzID0gdGhpcztcclxuXHRcdHZhciBlcnJvciA9IF90aGlzLmVycm9yO1xyXG5cclxuXHRcdC8vIFRoaXMgaGFzIHRvIGdvIHRocm91Z2ggYSBQT1NUIHJlcXVlc3RcclxuXHRcdGlmICghX3RoaXMuaXNFbXB0eShwLmRhdGEpICYmICEoJ0ZpbGVMaXN0JyBpbiB3aW5kb3cpICYmIF90aGlzLmhhc0JpbmFyeShwLmRhdGEpKSB7XHJcblxyXG5cdFx0XHQvLyBEaXNhYmxlIFhIUiBhbmQgSlNPTlBcclxuXHRcdFx0cC54aHIgPSBmYWxzZTtcclxuXHRcdFx0cC5qc29ucCA9IGZhbHNlO1xyXG5cdFx0fVxyXG5cclxuXHRcdC8vIENoZWNrIGlmIHRoZSBicm93c2VyIGFuZCBzZXJ2aWNlIHN1cHBvcnQgQ09SU1xyXG5cdFx0dmFyIGNvcnMgPSB0aGlzLnJlcXVlc3RfY29ycyhmdW5jdGlvbigpIHtcclxuXHRcdFx0Ly8gSWYgaXQgZG9lcyB0aGVuIHJ1biB0aGlzLi4uXHJcblx0XHRcdHJldHVybiAoKHAueGhyID09PSB1bmRlZmluZWQpIHx8IChwLnhociAmJiAodHlwZW9mIChwLnhocikgIT09ICdmdW5jdGlvbicgfHwgcC54aHIocCwgcC5xdWVyeSkpKSk7XHJcblx0XHR9KTtcclxuXHJcblx0XHRpZiAoY29ycykge1xyXG5cclxuXHRcdFx0Zm9ybWF0VXJsKHAsIGZ1bmN0aW9uKHVybCkge1xyXG5cclxuXHRcdFx0XHR2YXIgeCA9IF90aGlzLnhocihwLm1ldGhvZCwgdXJsLCBwLmhlYWRlcnMsIHAuZGF0YSwgY2FsbGJhY2spO1xyXG5cdFx0XHRcdHgub25wcm9ncmVzcyA9IHAub25wcm9ncmVzcyB8fCBudWxsO1xyXG5cclxuXHRcdFx0XHQvLyBXaW5kb3dzIFBob25lIGRvZXMgbm90IHN1cHBvcnQgeGhyLnVwbG9hZCwgc2VlICM3NFxyXG5cdFx0XHRcdC8vIEZlYXR1cmUgZGV0ZWN0XHJcblx0XHRcdFx0aWYgKHgudXBsb2FkICYmIHAub251cGxvYWRwcm9ncmVzcykge1xyXG5cdFx0XHRcdFx0eC51cGxvYWQub25wcm9ncmVzcyA9IHAub251cGxvYWRwcm9ncmVzcztcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHJcblx0XHQvLyBDbG9uZSB0aGUgcXVlcnkgb2JqZWN0XHJcblx0XHQvLyBFYWNoIHJlcXVlc3QgbW9kaWZpZXMgdGhlIHF1ZXJ5IG9iamVjdCBhbmQgbmVlZHMgdG8gYmUgdGFyZWQgYWZ0ZXIgZWFjaCBvbmUuXHJcblx0XHR2YXIgX3F1ZXJ5ID0gcC5xdWVyeTtcclxuXHJcblx0XHRwLnF1ZXJ5ID0gX3RoaXMuY2xvbmUocC5xdWVyeSk7XHJcblxyXG5cdFx0Ly8gQXNzaWduIGEgbmV3IGNhbGxiYWNrSURcclxuXHRcdHAuY2FsbGJhY2tJRCA9IF90aGlzLmdsb2JhbEV2ZW50KCk7XHJcblxyXG5cdFx0Ly8gSlNPTlBcclxuXHRcdGlmIChwLmpzb25wICE9PSBmYWxzZSkge1xyXG5cclxuXHRcdFx0Ly8gQ2xvbmUgdGhlIHF1ZXJ5IG9iamVjdFxyXG5cdFx0XHRwLnF1ZXJ5LmNhbGxiYWNrID0gcC5jYWxsYmFja0lEO1xyXG5cclxuXHRcdFx0Ly8gSWYgdGhlIEpTT05QIGlzIGEgZnVuY3Rpb24gdGhlbiBydW4gaXRcclxuXHRcdFx0aWYgKHR5cGVvZiAocC5qc29ucCkgPT09ICdmdW5jdGlvbicpIHtcclxuXHRcdFx0XHRwLmpzb25wKHAsIHAucXVlcnkpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQvLyBMZXRzIHVzZSBKU09OUCBpZiB0aGUgbWV0aG9kIGlzICdnZXQnXHJcblx0XHRcdGlmIChwLm1ldGhvZCA9PT0gJ2dldCcpIHtcclxuXHJcblx0XHRcdFx0Zm9ybWF0VXJsKHAsIGZ1bmN0aW9uKHVybCkge1xyXG5cdFx0XHRcdFx0X3RoaXMuanNvbnAodXJsLCBjYWxsYmFjaywgcC5jYWxsYmFja0lELCBwLnRpbWVvdXQpO1xyXG5cdFx0XHRcdH0pO1xyXG5cclxuXHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdH1cclxuXHRcdFx0ZWxzZSB7XHJcblx0XHRcdFx0Ly8gSXQncyBub3QgY29tcGF0aWJsZSByZXNldCBxdWVyeVxyXG5cdFx0XHRcdHAucXVlcnkgPSBfcXVlcnk7XHJcblx0XHRcdH1cclxuXHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gT3RoZXJ3aXNlIHdlJ3JlIG9uIHRvIHRoZSBvbGQgc2Nob29sLCBpZnJhbWUgaGFja3MgYW5kIEpTT05QXHJcblx0XHRpZiAocC5mb3JtICE9PSBmYWxzZSkge1xyXG5cclxuXHRcdFx0Ly8gQWRkIHNvbWUgYWRkaXRpb25hbCBxdWVyeSBwYXJhbWV0ZXJzIHRvIHRoZSBVUkxcclxuXHRcdFx0Ly8gV2UncmUgcHJldHR5IHN0dWZmZWQgaWYgdGhlIGVuZHBvaW50IGRvZXNuJ3QgbGlrZSB0aGVzZVxyXG5cdFx0XHRwLnF1ZXJ5LnJlZGlyZWN0X3VyaSA9IHAucmVkaXJlY3RfdXJpO1xyXG5cdFx0XHRwLnF1ZXJ5LnN0YXRlID0gSlNPTi5zdHJpbmdpZnkoe2NhbGxiYWNrOnAuY2FsbGJhY2tJRH0pO1xyXG5cclxuXHRcdFx0dmFyIG9wdHM7XHJcblxyXG5cdFx0XHRpZiAodHlwZW9mIChwLmZvcm0pID09PSAnZnVuY3Rpb24nKSB7XHJcblxyXG5cdFx0XHRcdC8vIEZvcm1hdCB0aGUgcmVxdWVzdFxyXG5cdFx0XHRcdG9wdHMgPSBwLmZvcm0ocCwgcC5xdWVyeSk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGlmIChwLm1ldGhvZCA9PT0gJ3Bvc3QnICYmIG9wdHMgIT09IGZhbHNlKSB7XHJcblxyXG5cdFx0XHRcdGZvcm1hdFVybChwLCBmdW5jdGlvbih1cmwpIHtcclxuXHRcdFx0XHRcdF90aGlzLnBvc3QodXJsLCBwLmRhdGEsIG9wdHMsIGNhbGxiYWNrLCBwLmNhbGxiYWNrSUQsIHAudGltZW91dCk7XHJcblx0XHRcdFx0fSk7XHJcblxyXG5cdFx0XHRcdHJldHVybjtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdC8vIE5vbmUgb2YgdGhlIG1ldGhvZHMgd2VyZSBzdWNjZXNzZnVsIHRocm93IGFuIGVycm9yXHJcblx0XHRjYWxsYmFjayhlcnJvcignaW52YWxpZF9yZXF1ZXN0JywgJ1RoZXJlIHdhcyBubyBtZWNoYW5pc20gZm9yIGhhbmRsaW5nIHRoaXMgcmVxdWVzdCcpKTtcclxuXHJcblx0XHRyZXR1cm47XHJcblxyXG5cdFx0Ly8gRm9ybWF0IFVSTFxyXG5cdFx0Ly8gQ29uc3RydWN0cyB0aGUgcmVxdWVzdCBVUkwsIG9wdGlvbmFsbHkgd3JhcHMgdGhlIFVSTCB0aHJvdWdoIGEgY2FsbCB0byBhIHByb3h5IHNlcnZlclxyXG5cdFx0Ly8gUmV0dXJucyB0aGUgZm9ybWF0dGVkIFVSTFxyXG5cdFx0ZnVuY3Rpb24gZm9ybWF0VXJsKHAsIGNhbGxiYWNrKSB7XHJcblxyXG5cdFx0XHQvLyBBcmUgd2Ugc2lnbmluZyB0aGUgcmVxdWVzdD9cclxuXHRcdFx0dmFyIHNpZ247XHJcblxyXG5cdFx0XHQvLyBPQXV0aDFcclxuXHRcdFx0Ly8gUmVtb3ZlIHRoZSB0b2tlbiBmcm9tIHRoZSBxdWVyeSBiZWZvcmUgc2lnbmluZ1xyXG5cdFx0XHRpZiAocC5hdXRoUmVzcG9uc2UgJiYgcC5hdXRoUmVzcG9uc2Uub2F1dGggJiYgcGFyc2VJbnQocC5hdXRoUmVzcG9uc2Uub2F1dGgudmVyc2lvbiwgMTApID09PSAxKSB7XHJcblxyXG5cdFx0XHRcdC8vIE9BVVRIIFNJR05JTkcgUFJPWFlcclxuXHRcdFx0XHRzaWduID0gcC5xdWVyeS5hY2Nlc3NfdG9rZW47XHJcblxyXG5cdFx0XHRcdC8vIFJlbW92ZSB0aGUgYWNjZXNzX3Rva2VuXHJcblx0XHRcdFx0ZGVsZXRlIHAucXVlcnkuYWNjZXNzX3Rva2VuO1xyXG5cclxuXHRcdFx0XHQvLyBFbmZvcmUgdXNlIG9mIFByb3h5XHJcblx0XHRcdFx0cC5wcm94eSA9IHRydWU7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdC8vIFBPU1QgYm9keSB0byBxdWVyeXN0cmluZ1xyXG5cdFx0XHRpZiAocC5kYXRhICYmIChwLm1ldGhvZCA9PT0gJ2dldCcgfHwgcC5tZXRob2QgPT09ICdkZWxldGUnKSkge1xyXG5cdFx0XHRcdC8vIEF0dGFjaCB0aGUgcC5kYXRhIHRvIHRoZSBxdWVyeXN0cmluZy5cclxuXHRcdFx0XHRfdGhpcy5leHRlbmQocC5xdWVyeSwgcC5kYXRhKTtcclxuXHRcdFx0XHRwLmRhdGEgPSBudWxsO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQvLyBDb25zdHJ1Y3QgdGhlIHBhdGhcclxuXHRcdFx0dmFyIHBhdGggPSBfdGhpcy5xcyhwLnVybCwgcC5xdWVyeSk7XHJcblxyXG5cdFx0XHQvLyBQcm94eSB0aGUgcmVxdWVzdCB0aHJvdWdoIGEgc2VydmVyXHJcblx0XHRcdC8vIFVzZWQgZm9yIHNpZ25pbmcgT0F1dGgxXHJcblx0XHRcdC8vIEFuZCBjaXJjdW12ZW50aW5nIHNlcnZpY2VzIHdpdGhvdXQgQWNjZXNzLUNvbnRyb2wgSGVhZGVyc1xyXG5cdFx0XHRpZiAocC5wcm94eSkge1xyXG5cdFx0XHRcdC8vIFVzZSB0aGUgcHJveHkgYXMgYSBwYXRoXHJcblx0XHRcdFx0cGF0aCA9IF90aGlzLnFzKHAub2F1dGhfcHJveHksIHtcclxuXHRcdFx0XHRcdHBhdGg6IHBhdGgsXHJcblx0XHRcdFx0XHRhY2Nlc3NfdG9rZW46IHNpZ24gfHwgJycsXHJcblxyXG5cdFx0XHRcdFx0Ly8gVGhpcyB3aWxsIHByb21wdCB0aGUgcmVxdWVzdCB0byBiZSBzaWduZWQgYXMgdGhvdWdoIGl0IGlzIE9BdXRoMVxyXG5cdFx0XHRcdFx0dGhlbjogcC5wcm94eV9yZXNwb25zZV90eXBlIHx8IChwLm1ldGhvZC50b0xvd2VyQ2FzZSgpID09PSAnZ2V0JyA/ICdyZWRpcmVjdCcgOiAncHJveHknKSxcclxuXHRcdFx0XHRcdG1ldGhvZDogcC5tZXRob2QudG9Mb3dlckNhc2UoKSxcclxuXHRcdFx0XHRcdHN1cHByZXNzX3Jlc3BvbnNlX2NvZGVzOiB0cnVlXHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGNhbGxiYWNrKHBhdGgpO1xyXG5cdFx0fVxyXG5cdH0sXHJcblxyXG5cdC8vIFRlc3Qgd2hldGhlciB0aGUgYnJvd3NlciBzdXBwb3J0cyB0aGUgQ09SUyByZXNwb25zZVxyXG5cdHJlcXVlc3RfY29yczogZnVuY3Rpb24oY2FsbGJhY2spIHtcclxuXHRcdHJldHVybiAnd2l0aENyZWRlbnRpYWxzJyBpbiBuZXcgWE1MSHR0cFJlcXVlc3QoKSAmJiBjYWxsYmFjaygpO1xyXG5cdH0sXHJcblxyXG5cdC8vIFJldHVybiB0aGUgdHlwZSBvZiBET00gb2JqZWN0XHJcblx0ZG9tSW5zdGFuY2U6IGZ1bmN0aW9uKHR5cGUsIGRhdGEpIHtcclxuXHRcdHZhciB0ZXN0ID0gJ0hUTUwnICsgKHR5cGUgfHwgJycpLnJlcGxhY2UoXHJcblx0XHRcdC9eW2Etel0vLFxyXG5cdFx0XHRmdW5jdGlvbihtKSB7XHJcblx0XHRcdFx0cmV0dXJuIG0udG9VcHBlckNhc2UoKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdCkgKyAnRWxlbWVudCc7XHJcblxyXG5cdFx0aWYgKCFkYXRhKSB7XHJcblx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAod2luZG93W3Rlc3RdKSB7XHJcblx0XHRcdHJldHVybiBkYXRhIGluc3RhbmNlb2Ygd2luZG93W3Rlc3RdO1xyXG5cdFx0fVxyXG5cdFx0ZWxzZSBpZiAod2luZG93LkVsZW1lbnQpIHtcclxuXHRcdFx0cmV0dXJuIGRhdGEgaW5zdGFuY2VvZiB3aW5kb3cuRWxlbWVudCAmJiAoIXR5cGUgfHwgKGRhdGEudGFnTmFtZSAmJiBkYXRhLnRhZ05hbWUudG9Mb3dlckNhc2UoKSA9PT0gdHlwZSkpO1xyXG5cdFx0fVxyXG5cdFx0ZWxzZSB7XHJcblx0XHRcdHJldHVybiAoIShkYXRhIGluc3RhbmNlb2YgT2JqZWN0IHx8IGRhdGEgaW5zdGFuY2VvZiBBcnJheSB8fCBkYXRhIGluc3RhbmNlb2YgU3RyaW5nIHx8IGRhdGEgaW5zdGFuY2VvZiBOdW1iZXIpICYmIGRhdGEudGFnTmFtZSAmJiBkYXRhLnRhZ05hbWUudG9Mb3dlckNhc2UoKSA9PT0gdHlwZSk7XHJcblx0XHR9XHJcblx0fSxcclxuXHJcblx0Ly8gQ3JlYXRlIGEgY2xvbmUgb2YgYW4gb2JqZWN0XHJcblx0Y2xvbmU6IGZ1bmN0aW9uKG9iaikge1xyXG5cdFx0Ly8gRG9lcyBub3QgY2xvbmUgRE9NIGVsZW1lbnRzLCBub3IgQmluYXJ5IGRhdGEsIGUuZy4gQmxvYnMsIEZpbGVsaXN0c1xyXG5cdFx0aWYgKG9iaiA9PT0gbnVsbCB8fCB0eXBlb2YgKG9iaikgIT09ICdvYmplY3QnIHx8IG9iaiBpbnN0YW5jZW9mIERhdGUgfHwgJ25vZGVOYW1lJyBpbiBvYmogfHwgdGhpcy5pc0JpbmFyeShvYmopIHx8ICh0eXBlb2YgRm9ybURhdGEgPT09ICdmdW5jdGlvbicgJiYgb2JqIGluc3RhbmNlb2YgRm9ybURhdGEpKSB7XHJcblx0XHRcdHJldHVybiBvYmo7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKEFycmF5LmlzQXJyYXkob2JqKSkge1xyXG5cdFx0XHQvLyBDbG9uZSBlYWNoIGl0ZW0gaW4gdGhlIGFycmF5XHJcblx0XHRcdHJldHVybiBvYmoubWFwKHRoaXMuY2xvbmUuYmluZCh0aGlzKSk7XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gQnV0IGRvZXMgY2xvbmUgZXZlcnl0aGluZyBlbHNlLlxyXG5cdFx0dmFyIGNsb25lID0ge307XHJcblx0XHRmb3IgKHZhciB4IGluIG9iaikge1xyXG5cdFx0XHRjbG9uZVt4XSA9IHRoaXMuY2xvbmUob2JqW3hdKTtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gY2xvbmU7XHJcblx0fSxcclxuXHJcblx0Ly8gWEhSOiB1c2VzIENPUlMgdG8gbWFrZSByZXF1ZXN0c1xyXG5cdHhocjogZnVuY3Rpb24obWV0aG9kLCB1cmwsIGhlYWRlcnMsIGRhdGEsIGNhbGxiYWNrKSB7XHJcblxyXG5cdFx0dmFyIHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcclxuXHRcdHZhciBlcnJvciA9IHRoaXMuZXJyb3I7XHJcblxyXG5cdFx0Ly8gQmluYXJ5P1xyXG5cdFx0dmFyIGJpbmFyeSA9IGZhbHNlO1xyXG5cdFx0aWYgKG1ldGhvZCA9PT0gJ2Jsb2InKSB7XHJcblx0XHRcdGJpbmFyeSA9IG1ldGhvZDtcclxuXHRcdFx0bWV0aG9kID0gJ0dFVCc7XHJcblx0XHR9XHJcblxyXG5cdFx0bWV0aG9kID0gbWV0aG9kLnRvVXBwZXJDYXNlKCk7XHJcblxyXG5cdFx0Ly8gWGhyLnJlc3BvbnNlVHlwZSAnanNvbicgaXMgbm90IHN1cHBvcnRlZCBpbiBhbnkgb2YgdGhlIHZlbmRvcnMgeWV0LlxyXG5cdFx0ci5vbmxvYWQgPSBmdW5jdGlvbihlKSB7XHJcblx0XHRcdHZhciBqc29uID0gci5yZXNwb25zZTtcclxuXHRcdFx0dHJ5IHtcclxuXHRcdFx0XHRqc29uID0gSlNPTi5wYXJzZShyLnJlc3BvbnNlVGV4dCk7XHJcblx0XHRcdH1cclxuXHRcdFx0Y2F0Y2ggKF9lKSB7XHJcblx0XHRcdFx0aWYgKHIuc3RhdHVzID09PSA0MDEpIHtcclxuXHRcdFx0XHRcdGpzb24gPSBlcnJvcignYWNjZXNzX2RlbmllZCcsIHIuc3RhdHVzVGV4dCk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHR2YXIgaGVhZGVycyA9IGhlYWRlcnNUb0pTT04oci5nZXRBbGxSZXNwb25zZUhlYWRlcnMoKSk7XHJcblx0XHRcdGhlYWRlcnMuc3RhdHVzQ29kZSA9IHIuc3RhdHVzO1xyXG5cclxuXHRcdFx0Y2FsbGJhY2soanNvbiB8fCAobWV0aG9kID09PSAnR0VUJyA/IGVycm9yKCdlbXB0eV9yZXNwb25zZScsICdDb3VsZCBub3QgZ2V0IHJlc291cmNlJykgOiB7fSksIGhlYWRlcnMpO1xyXG5cdFx0fTtcclxuXHJcblx0XHRyLm9uZXJyb3IgPSBmdW5jdGlvbihlKSB7XHJcblx0XHRcdHZhciBqc29uID0gci5yZXNwb25zZVRleHQ7XHJcblx0XHRcdHRyeSB7XHJcblx0XHRcdFx0anNvbiA9IEpTT04ucGFyc2Uoci5yZXNwb25zZVRleHQpO1xyXG5cdFx0XHR9XHJcblx0XHRcdGNhdGNoIChfZSkge31cclxuXHJcblx0XHRcdGNhbGxiYWNrKGpzb24gfHwgZXJyb3IoJ2FjY2Vzc19kZW5pZWQnLCAnQ291bGQgbm90IGdldCByZXNvdXJjZScpKTtcclxuXHRcdH07XHJcblxyXG5cdFx0dmFyIHg7XHJcblxyXG5cdFx0Ly8gU2hvdWxkIHdlIGFkZCB0aGUgcXVlcnkgdG8gdGhlIFVSTD9cclxuXHRcdGlmIChtZXRob2QgPT09ICdHRVQnIHx8IG1ldGhvZCA9PT0gJ0RFTEVURScpIHtcclxuXHRcdFx0ZGF0YSA9IG51bGw7XHJcblx0XHR9XHJcblx0XHRlbHNlIGlmIChkYXRhICYmIHR5cGVvZiAoZGF0YSkgIT09ICdzdHJpbmcnICYmICEoZGF0YSBpbnN0YW5jZW9mIEZvcm1EYXRhKSAmJiAhKGRhdGEgaW5zdGFuY2VvZiBGaWxlKSAmJiAhKGRhdGEgaW5zdGFuY2VvZiBCbG9iKSkge1xyXG5cdFx0XHQvLyBMb29wIHRocm91Z2ggYW5kIGFkZCBmb3JtRGF0YVxyXG5cdFx0XHR2YXIgZiA9IG5ldyBGb3JtRGF0YSgpO1xyXG5cdFx0XHRmb3IgKHggaW4gZGF0YSkgaWYgKGRhdGEuaGFzT3duUHJvcGVydHkoeCkpIHtcclxuXHRcdFx0XHRpZiAoZGF0YVt4XSBpbnN0YW5jZW9mIEhUTUxJbnB1dEVsZW1lbnQpIHtcclxuXHRcdFx0XHRcdGlmICgnZmlsZXMnIGluIGRhdGFbeF0gJiYgZGF0YVt4XS5maWxlcy5sZW5ndGggPiAwKSB7XHJcblx0XHRcdFx0XHRcdGYuYXBwZW5kKHgsIGRhdGFbeF0uZmlsZXNbMF0pO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRlbHNlIGlmIChkYXRhW3hdIGluc3RhbmNlb2YgQmxvYikge1xyXG5cdFx0XHRcdFx0Zi5hcHBlbmQoeCwgZGF0YVt4XSwgZGF0YS5uYW1lKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0ZWxzZSB7XHJcblx0XHRcdFx0XHRmLmFwcGVuZCh4LCBkYXRhW3hdKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGRhdGEgPSBmO1xyXG5cdFx0fVxyXG5cclxuXHRcdC8vIE9wZW4gdGhlIHBhdGgsIGFzeW5jXHJcblx0XHRyLm9wZW4obWV0aG9kLCB1cmwsIHRydWUpO1xyXG5cclxuXHRcdGlmIChiaW5hcnkpIHtcclxuXHRcdFx0aWYgKCdyZXNwb25zZVR5cGUnIGluIHIpIHtcclxuXHRcdFx0XHRyLnJlc3BvbnNlVHlwZSA9IGJpbmFyeTtcclxuXHRcdFx0fVxyXG5cdFx0XHRlbHNlIHtcclxuXHRcdFx0XHRyLm92ZXJyaWRlTWltZVR5cGUoJ3RleHQvcGxhaW47IGNoYXJzZXQ9eC11c2VyLWRlZmluZWQnKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdC8vIFNldCBhbnkgYmVzcG9rZSBoZWFkZXJzXHJcblx0XHRpZiAoaGVhZGVycykge1xyXG5cdFx0XHRmb3IgKHggaW4gaGVhZGVycykge1xyXG5cdFx0XHRcdHIuc2V0UmVxdWVzdEhlYWRlcih4LCBoZWFkZXJzW3hdKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdHIuc2VuZChkYXRhKTtcclxuXHJcblx0XHRyZXR1cm4gcjtcclxuXHJcblx0XHQvLyBIZWFkZXJzIGFyZSByZXR1cm5lZCBhcyBhIHN0cmluZ1xyXG5cdFx0ZnVuY3Rpb24gaGVhZGVyc1RvSlNPTihzKSB7XHJcblx0XHRcdHZhciByID0ge307XHJcblx0XHRcdHZhciByZWcgPSAvKFthLXpcXC1dKyk6XFxzPyguKik7Py9naTtcclxuXHRcdFx0dmFyIG07XHJcblx0XHRcdHdoaWxlICgobSA9IHJlZy5leGVjKHMpKSkge1xyXG5cdFx0XHRcdHJbbVsxXV0gPSBtWzJdO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRyZXR1cm4gcjtcclxuXHRcdH1cclxuXHR9LFxyXG5cclxuXHQvLyBKU09OUFxyXG5cdC8vIEluamVjdHMgYSBzY3JpcHQgdGFnIGludG8gdGhlIERPTSB0byBiZSBleGVjdXRlZCBhbmQgYXBwZW5kcyBhIGNhbGxiYWNrIGZ1bmN0aW9uIHRvIHRoZSB3aW5kb3cgb2JqZWN0XHJcblx0Ly8gQHBhcmFtIHN0cmluZy9mdW5jdGlvbiBwYXRoRnVuYyBlaXRoZXIgYSBzdHJpbmcgb2YgdGhlIFVSTCBvciBhIGNhbGxiYWNrIGZ1bmN0aW9uIHBhdGhGdW5jKHF1ZXJ5c3RyaW5naGFzaCwgY29udGludWVGdW5jKTtcclxuXHQvLyBAcGFyYW0gZnVuY3Rpb24gY2FsbGJhY2sgYSBmdW5jdGlvbiB0byBjYWxsIG9uIGNvbXBsZXRpb247XHJcblx0anNvbnA6IGZ1bmN0aW9uKHVybCwgY2FsbGJhY2ssIGNhbGxiYWNrSUQsIHRpbWVvdXQpIHtcclxuXHJcblx0XHR2YXIgX3RoaXMgPSB0aGlzO1xyXG5cdFx0dmFyIGVycm9yID0gX3RoaXMuZXJyb3I7XHJcblxyXG5cdFx0Ly8gQ2hhbmdlIHRoZSBuYW1lIG9mIHRoZSBjYWxsYmFja1xyXG5cdFx0dmFyIGJvb2wgPSAwO1xyXG5cdFx0dmFyIGhlYWQgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaGVhZCcpWzBdO1xyXG5cdFx0dmFyIG9wZXJhRml4O1xyXG5cdFx0dmFyIHJlc3VsdCA9IGVycm9yKCdzZXJ2ZXJfZXJyb3InLCAnc2VydmVyX2Vycm9yJyk7XHJcblx0XHR2YXIgY2IgPSBmdW5jdGlvbigpIHtcclxuXHRcdFx0aWYgKCEoYm9vbCsrKSkge1xyXG5cdFx0XHRcdHdpbmRvdy5zZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdFx0Y2FsbGJhY2socmVzdWx0KTtcclxuXHRcdFx0XHRcdGhlYWQucmVtb3ZlQ2hpbGQoc2NyaXB0KTtcclxuXHRcdFx0XHR9LCAwKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdH07XHJcblxyXG5cdFx0Ly8gQWRkIGNhbGxiYWNrIHRvIHRoZSB3aW5kb3cgb2JqZWN0XHJcblx0XHRjYWxsYmFja0lEID0gX3RoaXMuZ2xvYmFsRXZlbnQoZnVuY3Rpb24oanNvbikge1xyXG5cdFx0XHRyZXN1bHQgPSBqc29uO1xyXG5cdFx0XHRyZXR1cm4gdHJ1ZTtcclxuXHJcblx0XHRcdC8vIE1hcmsgY2FsbGJhY2sgYXMgZG9uZVxyXG5cdFx0fSwgY2FsbGJhY2tJRCk7XHJcblxyXG5cdFx0Ly8gVGhlIFVSTCBpcyBhIGZ1bmN0aW9uIGZvciBzb21lIGNhc2VzIGFuZCBhcyBzdWNoXHJcblx0XHQvLyBEZXRlcm1pbmUgaXRzIHZhbHVlIHdpdGggYSBjYWxsYmFjayBjb250YWluaW5nIHRoZSBuZXcgcGFyYW1ldGVycyBvZiB0aGlzIGZ1bmN0aW9uLlxyXG5cdFx0dXJsID0gdXJsLnJlcGxhY2UobmV3IFJlZ0V4cCgnPVxcXFw/KCZ8JCknKSwgJz0nICsgY2FsbGJhY2tJRCArICckMScpO1xyXG5cclxuXHRcdC8vIEJ1aWxkIHNjcmlwdCB0YWdcclxuXHRcdHZhciBzY3JpcHQgPSBfdGhpcy5hcHBlbmQoJ3NjcmlwdCcsIHtcclxuXHRcdFx0aWQ6IGNhbGxiYWNrSUQsXHJcblx0XHRcdG5hbWU6IGNhbGxiYWNrSUQsXHJcblx0XHRcdHNyYzogdXJsLFxyXG5cdFx0XHRhc3luYzogdHJ1ZSxcclxuXHRcdFx0b25sb2FkOiBjYixcclxuXHRcdFx0b25lcnJvcjogY2IsXHJcblx0XHRcdG9ucmVhZHlzdGF0ZWNoYW5nZTogZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0aWYgKC9sb2FkZWR8Y29tcGxldGUvaS50ZXN0KHRoaXMucmVhZHlTdGF0ZSkpIHtcclxuXHRcdFx0XHRcdGNiKCk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHJcblx0XHQvLyBPcGVyYSBmaXggZXJyb3JcclxuXHRcdC8vIFByb2JsZW06IElmIGFuIGVycm9yIG9jY3VycyB3aXRoIHNjcmlwdCBsb2FkaW5nIE9wZXJhIGZhaWxzIHRvIHRyaWdnZXIgdGhlIHNjcmlwdC5vbmVycm9yIGhhbmRsZXIgd2Ugc3BlY2lmaWVkXHJcblx0XHQvL1xyXG5cdFx0Ly8gRml4OlxyXG5cdFx0Ly8gQnkgc2V0dGluZyB0aGUgcmVxdWVzdCB0byBzeW5jaHJvbm91cyB3ZSBjYW4gdHJpZ2dlciB0aGUgZXJyb3IgaGFuZGxlciB3aGVuIGFsbCBlbHNlIGZhaWxzLlxyXG5cdFx0Ly8gVGhpcyBhY3Rpb24gd2lsbCBiZSBpZ25vcmVkIGlmIHdlJ3ZlIGFscmVhZHkgY2FsbGVkIHRoZSBjYWxsYmFjayBoYW5kbGVyIFwiY2JcIiB3aXRoIGEgc3VjY2Vzc2Z1bCBvbmxvYWQgZXZlbnRcclxuXHRcdGlmICh3aW5kb3cubmF2aWdhdG9yLnVzZXJBZ2VudC50b0xvd2VyQ2FzZSgpLmluZGV4T2YoJ29wZXJhJykgPiAtMSkge1xyXG5cdFx0XHRvcGVyYUZpeCA9IF90aGlzLmFwcGVuZCgnc2NyaXB0Jywge1xyXG5cdFx0XHRcdHRleHQ6ICdkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcXCcnICsgY2FsbGJhY2tJRCArICdcXCcpLm9uZXJyb3IoKTsnXHJcblx0XHRcdH0pO1xyXG5cdFx0XHRzY3JpcHQuYXN5bmMgPSBmYWxzZTtcclxuXHRcdH1cclxuXHJcblx0XHQvLyBBZGQgdGltZW91dFxyXG5cdFx0aWYgKHRpbWVvdXQpIHtcclxuXHRcdFx0d2luZG93LnNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0cmVzdWx0ID0gZXJyb3IoJ3RpbWVvdXQnLCAndGltZW91dCcpO1xyXG5cdFx0XHRcdGNiKCk7XHJcblx0XHRcdH0sIHRpbWVvdXQpO1xyXG5cdFx0fVxyXG5cclxuXHRcdC8vIFRPRE86IGFkZCBmaXggZm9yIElFLFxyXG5cdFx0Ly8gSG93ZXZlcjogdW5hYmxlIHJlY3JlYXRlIHRoZSBidWcgb2YgZmlyaW5nIG9mZiB0aGUgb25yZWFkeXN0YXRlY2hhbmdlIGJlZm9yZSB0aGUgc2NyaXB0IGNvbnRlbnQgaGFzIGJlZW4gZXhlY3V0ZWQgYW5kIHRoZSB2YWx1ZSBvZiBcInJlc3VsdFwiIGhhcyBiZWVuIGRlZmluZWQuXHJcblx0XHQvLyBJbmplY3Qgc2NyaXB0IHRhZyBpbnRvIHRoZSBoZWFkIGVsZW1lbnRcclxuXHRcdGhlYWQuYXBwZW5kQ2hpbGQoc2NyaXB0KTtcclxuXHJcblx0XHQvLyBBcHBlbmQgT3BlcmEgRml4IHRvIHJ1biBhZnRlciBvdXIgc2NyaXB0XHJcblx0XHRpZiAob3BlcmFGaXgpIHtcclxuXHRcdFx0aGVhZC5hcHBlbmRDaGlsZChvcGVyYUZpeCk7XHJcblx0XHR9XHJcblx0fSxcclxuXHJcblx0Ly8gUG9zdFxyXG5cdC8vIFNlbmQgaW5mb3JtYXRpb24gdG8gYSByZW1vdGUgbG9jYXRpb24gdXNpbmcgdGhlIHBvc3QgbWVjaGFuaXNtXHJcblx0Ly8gQHBhcmFtIHN0cmluZyB1cmkgcGF0aFxyXG5cdC8vIEBwYXJhbSBvYmplY3QgZGF0YSwga2V5IHZhbHVlIGRhdGEgdG8gc2VuZFxyXG5cdC8vIEBwYXJhbSBmdW5jdGlvbiBjYWxsYmFjaywgZnVuY3Rpb24gdG8gZXhlY3V0ZSBpbiByZXNwb25zZVxyXG5cdHBvc3Q6IGZ1bmN0aW9uKHVybCwgZGF0YSwgb3B0aW9ucywgY2FsbGJhY2ssIGNhbGxiYWNrSUQsIHRpbWVvdXQpIHtcclxuXHJcblx0XHR2YXIgX3RoaXMgPSB0aGlzO1xyXG5cdFx0dmFyIGVycm9yID0gX3RoaXMuZXJyb3I7XHJcblx0XHR2YXIgZG9jID0gZG9jdW1lbnQ7XHJcblxyXG5cdFx0Ly8gVGhpcyBoYWNrIG5lZWRzIGEgZm9ybVxyXG5cdFx0dmFyIGZvcm0gPSBudWxsO1xyXG5cdFx0dmFyIHJlZW5hYmxlQWZ0ZXJTdWJtaXQgPSBbXTtcclxuXHRcdHZhciBuZXdmb3JtO1xyXG5cdFx0dmFyIGkgPSAwO1xyXG5cdFx0dmFyIHggPSBudWxsO1xyXG5cdFx0dmFyIGJvb2wgPSAwO1xyXG5cdFx0dmFyIGNiID0gZnVuY3Rpb24ocikge1xyXG5cdFx0XHRpZiAoIShib29sKyspKSB7XHJcblx0XHRcdFx0Y2FsbGJhY2socik7XHJcblx0XHRcdH1cclxuXHRcdH07XHJcblxyXG5cdFx0Ly8gV2hhdCBpcyB0aGUgbmFtZSBvZiB0aGUgY2FsbGJhY2sgdG8gY29udGFpblxyXG5cdFx0Ly8gV2UnbGwgYWxzbyB1c2UgdGhpcyB0byBuYW1lIHRoZSBpZnJhbWVcclxuXHRcdF90aGlzLmdsb2JhbEV2ZW50KGNiLCBjYWxsYmFja0lEKTtcclxuXHJcblx0XHQvLyBCdWlsZCB0aGUgaWZyYW1lIHdpbmRvd1xyXG5cdFx0dmFyIHdpbjtcclxuXHRcdHRyeSB7XHJcblx0XHRcdC8vIElFNyBoYWNrLCBvbmx5IGxldHMgdXMgZGVmaW5lIHRoZSBuYW1lIGhlcmUsIG5vdCBsYXRlci5cclxuXHRcdFx0d2luID0gZG9jLmNyZWF0ZUVsZW1lbnQoJzxpZnJhbWUgbmFtZT1cIicgKyBjYWxsYmFja0lEICsgJ1wiPicpO1xyXG5cdFx0fVxyXG5cdFx0Y2F0Y2ggKGUpIHtcclxuXHRcdFx0d2luID0gZG9jLmNyZWF0ZUVsZW1lbnQoJ2lmcmFtZScpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHdpbi5uYW1lID0gY2FsbGJhY2tJRDtcclxuXHRcdHdpbi5pZCA9IGNhbGxiYWNrSUQ7XHJcblx0XHR3aW4uc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuXHJcblx0XHQvLyBPdmVycmlkZSBjYWxsYmFjayBtZWNoYW5pc20uIFRyaWdnZ2VyIGEgcmVzcG9uc2Ugb25sb2FkL29uZXJyb3JcclxuXHRcdGlmIChvcHRpb25zICYmIG9wdGlvbnMuY2FsbGJhY2tvbmxvYWQpIHtcclxuXHRcdFx0Ly8gT25sb2FkIGlzIGJlaW5nIGZpcmVkIHR3aWNlXHJcblx0XHRcdHdpbi5vbmxvYWQgPSBmdW5jdGlvbigpIHtcclxuXHRcdFx0XHRjYih7XHJcblx0XHRcdFx0XHRyZXNwb25zZTogJ3Bvc3RlZCcsXHJcblx0XHRcdFx0XHRtZXNzYWdlOiAnQ29udGVudCB3YXMgcG9zdGVkJ1xyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHR9O1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmICh0aW1lb3V0KSB7XHJcblx0XHRcdHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0Y2IoZXJyb3IoJ3RpbWVvdXQnLCAnVGhlIHBvc3Qgb3BlcmF0aW9uIHRpbWVkIG91dCcpKTtcclxuXHRcdFx0fSwgdGltZW91dCk7XHJcblx0XHR9XHJcblxyXG5cdFx0ZG9jLmJvZHkuYXBwZW5kQ2hpbGQod2luKTtcclxuXHJcblx0XHQvLyBJZiB3ZSBhcmUganVzdCBwb3N0aW5nIGEgc2luZ2xlIGl0ZW1cclxuXHRcdGlmIChfdGhpcy5kb21JbnN0YW5jZSgnZm9ybScsIGRhdGEpKSB7XHJcblx0XHRcdC8vIEdldCB0aGUgcGFyZW50IGZvcm1cclxuXHRcdFx0Zm9ybSA9IGRhdGEuZm9ybTtcclxuXHJcblx0XHRcdC8vIExvb3AgdGhyb3VnaCBhbmQgZGlzYWJsZSBhbGwgb2YgaXRzIHNpYmxpbmdzXHJcblx0XHRcdGZvciAoaSA9IDA7IGkgPCBmb3JtLmVsZW1lbnRzLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdFx0aWYgKGZvcm0uZWxlbWVudHNbaV0gIT09IGRhdGEpIHtcclxuXHRcdFx0XHRcdGZvcm0uZWxlbWVudHNbaV0uc2V0QXR0cmlidXRlKCdkaXNhYmxlZCcsIHRydWUpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0Ly8gTW92ZSB0aGUgZm9jdXMgdG8gdGhlIGZvcm1cclxuXHRcdFx0ZGF0YSA9IGZvcm07XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gUG9zdGluZyBhIGZvcm1cclxuXHRcdGlmIChfdGhpcy5kb21JbnN0YW5jZSgnZm9ybScsIGRhdGEpKSB7XHJcblx0XHRcdC8vIFRoaXMgaXMgYSBmb3JtIGVsZW1lbnRcclxuXHRcdFx0Zm9ybSA9IGRhdGE7XHJcblxyXG5cdFx0XHQvLyBEb2VzIHRoaXMgZm9ybSBuZWVkIHRvIGJlIGEgbXVsdGlwYXJ0IGZvcm0/XHJcblx0XHRcdGZvciAoaSA9IDA7IGkgPCBmb3JtLmVsZW1lbnRzLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdFx0aWYgKCFmb3JtLmVsZW1lbnRzW2ldLmRpc2FibGVkICYmIGZvcm0uZWxlbWVudHNbaV0udHlwZSA9PT0gJ2ZpbGUnKSB7XHJcblx0XHRcdFx0XHRmb3JtLmVuY29kaW5nID0gZm9ybS5lbmN0eXBlID0gJ211bHRpcGFydC9mb3JtLWRhdGEnO1xyXG5cdFx0XHRcdFx0Zm9ybS5lbGVtZW50c1tpXS5zZXRBdHRyaWJ1dGUoJ25hbWUnLCAnZmlsZScpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdFx0ZWxzZSB7XHJcblx0XHRcdC8vIEl0cyBub3QgYSBmb3JtIGVsZW1lbnQsXHJcblx0XHRcdC8vIFRoZXJlZm9yZSBpdCBtdXN0IGJlIGEgSlNPTiBvYmplY3Qgb2YgS2V5PT5WYWx1ZSBvciBLZXk9PkVsZW1lbnRcclxuXHRcdFx0Ly8gSWYgYW55b25lIG9mIHRob3NlIHZhbHVlcyBhcmUgYSBpbnB1dCB0eXBlPWZpbGUgd2Ugc2hhbGwgc2hhbGwgaW5zZXJ0IGl0cyBzaWJsaW5ncyBpbnRvIHRoZSBmb3JtIGZvciB3aGljaCBpdCBiZWxvbmdzLlxyXG5cdFx0XHRmb3IgKHggaW4gZGF0YSkgaWYgKGRhdGEuaGFzT3duUHJvcGVydHkoeCkpIHtcclxuXHRcdFx0XHQvLyBJcyB0aGlzIGFuIGlucHV0IEVsZW1lbnQ/XHJcblx0XHRcdFx0aWYgKF90aGlzLmRvbUluc3RhbmNlKCdpbnB1dCcsIGRhdGFbeF0pICYmIGRhdGFbeF0udHlwZSA9PT0gJ2ZpbGUnKSB7XHJcblx0XHRcdFx0XHRmb3JtID0gZGF0YVt4XS5mb3JtO1xyXG5cdFx0XHRcdFx0Zm9ybS5lbmNvZGluZyA9IGZvcm0uZW5jdHlwZSA9ICdtdWx0aXBhcnQvZm9ybS1kYXRhJztcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdC8vIERvIElmIHRoZXJlIGlzIG5vIGRlZmluZWQgZm9ybSBlbGVtZW50LCBsZXRzIGNyZWF0ZSBvbmUuXHJcblx0XHRcdGlmICghZm9ybSkge1xyXG5cdFx0XHRcdC8vIEJ1aWxkIGZvcm1cclxuXHRcdFx0XHRmb3JtID0gZG9jLmNyZWF0ZUVsZW1lbnQoJ2Zvcm0nKTtcclxuXHRcdFx0XHRkb2MuYm9keS5hcHBlbmRDaGlsZChmb3JtKTtcclxuXHRcdFx0XHRuZXdmb3JtID0gZm9ybTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0dmFyIGlucHV0O1xyXG5cclxuXHRcdFx0Ly8gQWRkIGVsZW1lbnRzIHRvIHRoZSBmb3JtIGlmIHRoZXkgZG9udCBleGlzdFxyXG5cdFx0XHRmb3IgKHggaW4gZGF0YSkgaWYgKGRhdGEuaGFzT3duUHJvcGVydHkoeCkpIHtcclxuXHJcblx0XHRcdFx0Ly8gSXMgdGhpcyBhbiBlbGVtZW50P1xyXG5cdFx0XHRcdHZhciBlbCA9IChfdGhpcy5kb21JbnN0YW5jZSgnaW5wdXQnLCBkYXRhW3hdKSB8fCBfdGhpcy5kb21JbnN0YW5jZSgndGV4dEFyZWEnLCBkYXRhW3hdKSB8fCBfdGhpcy5kb21JbnN0YW5jZSgnc2VsZWN0JywgZGF0YVt4XSkpO1xyXG5cclxuXHRcdFx0XHQvLyBJcyB0aGlzIG5vdCBhbiBpbnB1dCBlbGVtZW50LCBvciBvbmUgdGhhdCBleGlzdHMgb3V0c2lkZSB0aGUgZm9ybS5cclxuXHRcdFx0XHRpZiAoIWVsIHx8IGRhdGFbeF0uZm9ybSAhPT0gZm9ybSkge1xyXG5cclxuXHRcdFx0XHRcdC8vIERvZXMgYW4gZWxlbWVudCBoYXZlIHRoZSBzYW1lIG5hbWU/XHJcblx0XHRcdFx0XHR2YXIgaW5wdXRzID0gZm9ybS5lbGVtZW50c1t4XTtcclxuXHRcdFx0XHRcdGlmIChpbnB1dCkge1xyXG5cdFx0XHRcdFx0XHQvLyBSZW1vdmUgaXQuXHJcblx0XHRcdFx0XHRcdGlmICghKGlucHV0cyBpbnN0YW5jZW9mIE5vZGVMaXN0KSkge1xyXG5cdFx0XHRcdFx0XHRcdGlucHV0cyA9IFtpbnB1dHNdO1xyXG5cdFx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0XHRmb3IgKGkgPSAwOyBpIDwgaW5wdXRzLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdFx0XHRcdFx0aW5wdXRzW2ldLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoaW5wdXRzW2ldKTtcclxuXHRcdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHQvLyBDcmVhdGUgYW4gaW5wdXQgZWxlbWVudFxyXG5cdFx0XHRcdFx0aW5wdXQgPSBkb2MuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcclxuXHRcdFx0XHRcdGlucHV0LnNldEF0dHJpYnV0ZSgndHlwZScsICdoaWRkZW4nKTtcclxuXHRcdFx0XHRcdGlucHV0LnNldEF0dHJpYnV0ZSgnbmFtZScsIHgpO1xyXG5cclxuXHRcdFx0XHRcdC8vIERvZXMgaXQgaGF2ZSBhIHZhbHVlIGF0dHJpYnV0ZT9cclxuXHRcdFx0XHRcdGlmIChlbCkge1xyXG5cdFx0XHRcdFx0XHRpbnB1dC52YWx1ZSA9IGRhdGFbeF0udmFsdWU7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRlbHNlIGlmIChfdGhpcy5kb21JbnN0YW5jZShudWxsLCBkYXRhW3hdKSkge1xyXG5cdFx0XHRcdFx0XHRpbnB1dC52YWx1ZSA9IGRhdGFbeF0uaW5uZXJIVE1MIHx8IGRhdGFbeF0uaW5uZXJUZXh0O1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0ZWxzZSB7XHJcblx0XHRcdFx0XHRcdGlucHV0LnZhbHVlID0gZGF0YVt4XTtcclxuXHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHRmb3JtLmFwcGVuZENoaWxkKGlucHV0KTtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdC8vIEl0IGlzIGFuIGVsZW1lbnQsIHdoaWNoIGV4aXN0cyB3aXRoaW4gdGhlIGZvcm0sIGJ1dCB0aGUgbmFtZSBpcyB3cm9uZ1xyXG5cdFx0XHRcdGVsc2UgaWYgKGVsICYmIGRhdGFbeF0ubmFtZSAhPT0geCkge1xyXG5cdFx0XHRcdFx0ZGF0YVt4XS5zZXRBdHRyaWJ1dGUoJ25hbWUnLCB4KTtcclxuXHRcdFx0XHRcdGRhdGFbeF0ubmFtZSA9IHg7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQvLyBEaXNhYmxlIGVsZW1lbnRzIGZyb20gd2l0aGluIHRoZSBmb3JtIGlmIHRoZXkgd2VyZW4ndCBzcGVjaWZpZWRcclxuXHRcdFx0Zm9yIChpID0gMDsgaSA8IGZvcm0uZWxlbWVudHMubGVuZ3RoOyBpKyspIHtcclxuXHJcblx0XHRcdFx0aW5wdXQgPSBmb3JtLmVsZW1lbnRzW2ldO1xyXG5cclxuXHRcdFx0XHQvLyBEb2VzIHRoZSBzYW1lIG5hbWUgYW5kIHZhbHVlIGV4aXN0IGluIHRoZSBwYXJlbnRcclxuXHRcdFx0XHRpZiAoIShpbnB1dC5uYW1lIGluIGRhdGEpICYmIGlucHV0LmdldEF0dHJpYnV0ZSgnZGlzYWJsZWQnKSAhPT0gdHJ1ZSkge1xyXG5cdFx0XHRcdFx0Ly8gRGlzYWJsZVxyXG5cdFx0XHRcdFx0aW5wdXQuc2V0QXR0cmlidXRlKCdkaXNhYmxlZCcsIHRydWUpO1xyXG5cclxuXHRcdFx0XHRcdC8vIEFkZCByZS1lbmFibGUgdG8gY2FsbGJhY2tcclxuXHRcdFx0XHRcdHJlZW5hYmxlQWZ0ZXJTdWJtaXQucHVzaChpbnB1dCk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gU2V0IHRoZSB0YXJnZXQgb2YgdGhlIGZvcm1cclxuXHRcdGZvcm0uc2V0QXR0cmlidXRlKCdtZXRob2QnLCAnUE9TVCcpO1xyXG5cdFx0Zm9ybS5zZXRBdHRyaWJ1dGUoJ3RhcmdldCcsIGNhbGxiYWNrSUQpO1xyXG5cdFx0Zm9ybS50YXJnZXQgPSBjYWxsYmFja0lEO1xyXG5cclxuXHRcdC8vIFVwZGF0ZSB0aGUgZm9ybSBVUkxcclxuXHRcdGZvcm0uc2V0QXR0cmlidXRlKCdhY3Rpb24nLCB1cmwpO1xyXG5cclxuXHRcdC8vIFN1Ym1pdCB0aGUgZm9ybVxyXG5cdFx0Ly8gU29tZSByZWFzb24gdGhpcyBuZWVkcyB0byBiZSBvZmZzZXQgZnJvbSB0aGUgY3VycmVudCB3aW5kb3cgZXhlY3V0aW9uXHJcblx0XHRzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRmb3JtLnN1Ym1pdCgpO1xyXG5cclxuXHRcdFx0c2V0VGltZW91dChmdW5jdGlvbigpIHtcclxuXHRcdFx0XHR0cnkge1xyXG5cdFx0XHRcdFx0Ly8gUmVtb3ZlIHRoZSBpZnJhbWUgZnJvbSB0aGUgcGFnZS5cclxuXHRcdFx0XHRcdC8vd2luLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQod2luKTtcclxuXHRcdFx0XHRcdC8vIFJlbW92ZSB0aGUgZm9ybVxyXG5cdFx0XHRcdFx0aWYgKG5ld2Zvcm0pIHtcclxuXHRcdFx0XHRcdFx0bmV3Zm9ybS5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKG5ld2Zvcm0pO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRjYXRjaCAoZSkge1xyXG5cdFx0XHRcdFx0dHJ5IHtcclxuXHRcdFx0XHRcdFx0Y29uc29sZS5lcnJvcignSGVsbG9KUzogY291bGQgbm90IHJlbW92ZSBpZnJhbWUnKTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdGNhdGNoIChlZSkge31cclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdC8vIFJlZW5hYmxlIHRoZSBkaXNhYmxlZCBmb3JtXHJcblx0XHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCByZWVuYWJsZUFmdGVyU3VibWl0Lmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdFx0XHRpZiAocmVlbmFibGVBZnRlclN1Ym1pdFtpXSkge1xyXG5cdFx0XHRcdFx0XHRyZWVuYWJsZUFmdGVyU3VibWl0W2ldLnNldEF0dHJpYnV0ZSgnZGlzYWJsZWQnLCBmYWxzZSk7XHJcblx0XHRcdFx0XHRcdHJlZW5hYmxlQWZ0ZXJTdWJtaXRbaV0uZGlzYWJsZWQgPSBmYWxzZTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XHJcblx0XHRcdH0sIDApO1xyXG5cdFx0fSwgMTAwKTtcclxuXHR9LFxyXG5cclxuXHQvLyBTb21lIG9mIHRoZSBwcm92aWRlcnMgcmVxdWlyZSB0aGF0IG9ubHkgbXVsdGlwYXJ0IGlzIHVzZWQgd2l0aCBub24tYmluYXJ5IGZvcm1zLlxyXG5cdC8vIFRoaXMgZnVuY3Rpb24gY2hlY2tzIHdoZXRoZXIgdGhlIGZvcm0gY29udGFpbnMgYmluYXJ5IGRhdGFcclxuXHRoYXNCaW5hcnk6IGZ1bmN0aW9uKGRhdGEpIHtcclxuXHRcdGZvciAodmFyIHggaW4gZGF0YSkgaWYgKGRhdGEuaGFzT3duUHJvcGVydHkoeCkpIHtcclxuXHRcdFx0aWYgKHRoaXMuaXNCaW5hcnkoZGF0YVt4XSkpIHtcclxuXHRcdFx0XHRyZXR1cm4gdHJ1ZTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBmYWxzZTtcclxuXHR9LFxyXG5cclxuXHQvLyBEZXRlcm1pbmVzIGlmIGEgdmFyaWFibGUgRWl0aGVyIElzIG9yIGxpa2UgYSBGb3JtSW5wdXQgaGFzIHRoZSB2YWx1ZSBvZiBhIEJsb2JcclxuXHJcblx0aXNCaW5hcnk6IGZ1bmN0aW9uKGRhdGEpIHtcclxuXHJcblx0XHRyZXR1cm4gZGF0YSBpbnN0YW5jZW9mIE9iamVjdCAmJiAoXHJcblx0XHQodGhpcy5kb21JbnN0YW5jZSgnaW5wdXQnLCBkYXRhKSAmJiBkYXRhLnR5cGUgPT09ICdmaWxlJykgfHxcclxuXHRcdCgnRmlsZUxpc3QnIGluIHdpbmRvdyAmJiBkYXRhIGluc3RhbmNlb2Ygd2luZG93LkZpbGVMaXN0KSB8fFxyXG5cdFx0KCdGaWxlJyBpbiB3aW5kb3cgJiYgZGF0YSBpbnN0YW5jZW9mIHdpbmRvdy5GaWxlKSB8fFxyXG5cdFx0KCdCbG9iJyBpbiB3aW5kb3cgJiYgZGF0YSBpbnN0YW5jZW9mIHdpbmRvdy5CbG9iKSk7XHJcblxyXG5cdH0sXHJcblxyXG5cdC8vIENvbnZlcnQgRGF0YS1VUkkgdG8gQmxvYiBzdHJpbmdcclxuXHR0b0Jsb2I6IGZ1bmN0aW9uKGRhdGFVUkkpIHtcclxuXHRcdHZhciByZWcgPSAvXmRhdGFcXDooW147LF0rKFxcO2NoYXJzZXQ9W147LF0rKT8pKFxcO2Jhc2U2NCk/LC9pO1xyXG5cdFx0dmFyIG0gPSBkYXRhVVJJLm1hdGNoKHJlZyk7XHJcblx0XHRpZiAoIW0pIHtcclxuXHRcdFx0cmV0dXJuIGRhdGFVUkk7XHJcblx0XHR9XHJcblxyXG5cdFx0dmFyIGJpbmFyeSA9IGF0b2IoZGF0YVVSSS5yZXBsYWNlKHJlZywgJycpKTtcclxuXHRcdHZhciBhcnJheSA9IFtdO1xyXG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBiaW5hcnkubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0YXJyYXkucHVzaChiaW5hcnkuY2hhckNvZGVBdChpKSk7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIG5ldyBCbG9iKFtuZXcgVWludDhBcnJheShhcnJheSldLCB7dHlwZTogbVsxXX0pO1xyXG5cdH1cclxuXHJcbn0pO1xyXG5cclxuLy8gRVhUUkE6IENvbnZlcnQgRm9ybUVsZW1lbnQgdG8gSlNPTiBmb3IgUE9TVGluZ1xyXG4vLyBXcmFwcGVycyB0byBhZGQgYWRkaXRpb25hbCBmdW5jdGlvbmFsaXR5IHRvIGV4aXN0aW5nIGZ1bmN0aW9uc1xyXG4oZnVuY3Rpb24oaGVsbG8pIHtcclxuXHJcblx0Ly8gQ29weSBvcmlnaW5hbCBmdW5jdGlvblxyXG5cdHZhciBhcGkgPSBoZWxsby5hcGk7XHJcblx0dmFyIHV0aWxzID0gaGVsbG8udXRpbHM7XHJcblxyXG5cdHV0aWxzLmV4dGVuZCh1dGlscywge1xyXG5cclxuXHRcdC8vIERhdGFUb0pTT05cclxuXHRcdC8vIFRoaXMgdGFrZXMgYSBGb3JtRWxlbWVudHxOb2RlTGlzdHxJbnB1dEVsZW1lbnR8TWl4ZWRPYmplY3RzIGFuZCBjb252ZXJzIHRoZSBkYXRhIG9iamVjdCB0byBKU09OLlxyXG5cdFx0ZGF0YVRvSlNPTjogZnVuY3Rpb24ocCkge1xyXG5cclxuXHRcdFx0dmFyIF90aGlzID0gdGhpcztcclxuXHRcdFx0dmFyIHcgPSB3aW5kb3c7XHJcblx0XHRcdHZhciBkYXRhID0gcC5kYXRhO1xyXG5cclxuXHRcdFx0Ly8gSXMgZGF0YSBhIGZvcm0gb2JqZWN0XHJcblx0XHRcdGlmIChfdGhpcy5kb21JbnN0YW5jZSgnZm9ybScsIGRhdGEpKSB7XHJcblx0XHRcdFx0ZGF0YSA9IF90aGlzLm5vZGVMaXN0VG9KU09OKGRhdGEuZWxlbWVudHMpO1xyXG5cdFx0XHR9XHJcblx0XHRcdGVsc2UgaWYgKCdOb2RlTGlzdCcgaW4gdyAmJiBkYXRhIGluc3RhbmNlb2YgTm9kZUxpc3QpIHtcclxuXHRcdFx0XHRkYXRhID0gX3RoaXMubm9kZUxpc3RUb0pTT04oZGF0YSk7XHJcblx0XHRcdH1cclxuXHRcdFx0ZWxzZSBpZiAoX3RoaXMuZG9tSW5zdGFuY2UoJ2lucHV0JywgZGF0YSkpIHtcclxuXHRcdFx0XHRkYXRhID0gX3RoaXMubm9kZUxpc3RUb0pTT04oW2RhdGFdKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0Ly8gSXMgZGF0YSBhIGJsb2IsIEZpbGUsIEZpbGVMaXN0P1xyXG5cdFx0XHRpZiAoKCdGaWxlJyBpbiB3ICYmIGRhdGEgaW5zdGFuY2VvZiB3LkZpbGUpIHx8XHJcblx0XHRcdFx0KCdCbG9iJyBpbiB3ICYmIGRhdGEgaW5zdGFuY2VvZiB3LkJsb2IpIHx8XHJcblx0XHRcdFx0KCdGaWxlTGlzdCcgaW4gdyAmJiBkYXRhIGluc3RhbmNlb2Ygdy5GaWxlTGlzdCkpIHtcclxuXHRcdFx0XHRkYXRhID0ge2ZpbGU6IGRhdGF9O1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQvLyBMb29wIHRocm91Z2ggZGF0YSBpZiBpdCdzIG5vdCBmb3JtIGRhdGEgaXQgbXVzdCBub3cgYmUgYSBKU09OIG9iamVjdFxyXG5cdFx0XHRpZiAoISgnRm9ybURhdGEnIGluIHcgJiYgZGF0YSBpbnN0YW5jZW9mIHcuRm9ybURhdGEpKSB7XHJcblxyXG5cdFx0XHRcdGZvciAodmFyIHggaW4gZGF0YSkgaWYgKGRhdGEuaGFzT3duUHJvcGVydHkoeCkpIHtcclxuXHJcblx0XHRcdFx0XHRpZiAoJ0ZpbGVMaXN0JyBpbiB3ICYmIGRhdGFbeF0gaW5zdGFuY2VvZiB3LkZpbGVMaXN0KSB7XHJcblx0XHRcdFx0XHRcdGlmIChkYXRhW3hdLmxlbmd0aCA9PT0gMSkge1xyXG5cdFx0XHRcdFx0XHRcdGRhdGFbeF0gPSBkYXRhW3hdWzBdO1xyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRlbHNlIGlmIChfdGhpcy5kb21JbnN0YW5jZSgnaW5wdXQnLCBkYXRhW3hdKSAmJiBkYXRhW3hdLnR5cGUgPT09ICdmaWxlJykge1xyXG5cdFx0XHRcdFx0XHRjb250aW51ZTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdGVsc2UgaWYgKF90aGlzLmRvbUluc3RhbmNlKCdpbnB1dCcsIGRhdGFbeF0pIHx8XHJcblx0XHRcdFx0XHRcdF90aGlzLmRvbUluc3RhbmNlKCdzZWxlY3QnLCBkYXRhW3hdKSB8fFxyXG5cdFx0XHRcdFx0XHRfdGhpcy5kb21JbnN0YW5jZSgndGV4dEFyZWEnLCBkYXRhW3hdKSkge1xyXG5cdFx0XHRcdFx0XHRkYXRhW3hdID0gZGF0YVt4XS52YWx1ZTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdGVsc2UgaWYgKF90aGlzLmRvbUluc3RhbmNlKG51bGwsIGRhdGFbeF0pKSB7XHJcblx0XHRcdFx0XHRcdGRhdGFbeF0gPSBkYXRhW3hdLmlubmVySFRNTCB8fCBkYXRhW3hdLmlubmVyVGV4dDtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHAuZGF0YSA9IGRhdGE7XHJcblx0XHRcdHJldHVybiBkYXRhO1xyXG5cdFx0fSxcclxuXHJcblx0XHQvLyBOb2RlTGlzdFRvSlNPTlxyXG5cdFx0Ly8gR2l2ZW4gYSBsaXN0IG9mIGVsZW1lbnRzIGV4dHJhcG9sYXRlIHRoZWlyIHZhbHVlcyBhbmQgcmV0dXJuIGFzIGEganNvbiBvYmplY3RcclxuXHRcdG5vZGVMaXN0VG9KU09OOiBmdW5jdGlvbihub2RlbGlzdCkge1xyXG5cclxuXHRcdFx0dmFyIGpzb24gPSB7fTtcclxuXHJcblx0XHRcdC8vIENyZWF0ZSBhIGRhdGEgc3RyaW5nXHJcblx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgbm9kZWxpc3QubGVuZ3RoOyBpKyspIHtcclxuXHJcblx0XHRcdFx0dmFyIGlucHV0ID0gbm9kZWxpc3RbaV07XHJcblxyXG5cdFx0XHRcdC8vIElmIHRoZSBuYW1lIG9mIHRoZSBpbnB1dCBpcyBlbXB0eSBvciBkaWFibGVkLCBkb250IGFkZCBpdC5cclxuXHRcdFx0XHRpZiAoaW5wdXQuZGlzYWJsZWQgfHwgIWlucHV0Lm5hbWUpIHtcclxuXHRcdFx0XHRcdGNvbnRpbnVlO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0Ly8gSXMgdGhpcyBhIGZpbGUsIGRvZXMgdGhlIGJyb3dzZXIgbm90IHN1cHBvcnQgJ2ZpbGVzJyBhbmQgJ0Zvcm1EYXRhJz9cclxuXHRcdFx0XHRpZiAoaW5wdXQudHlwZSA9PT0gJ2ZpbGUnKSB7XHJcblx0XHRcdFx0XHRqc29uW2lucHV0Lm5hbWVdID0gaW5wdXQ7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdGVsc2Uge1xyXG5cdFx0XHRcdFx0anNvbltpbnB1dC5uYW1lXSA9IGlucHV0LnZhbHVlIHx8IGlucHV0LmlubmVySFRNTDtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHJldHVybiBqc29uO1xyXG5cdFx0fVxyXG5cdH0pO1xyXG5cclxuXHQvLyBSZXBsYWNlIGl0XHJcblx0aGVsbG8uYXBpID0gZnVuY3Rpb24oKSB7XHJcblxyXG5cdFx0Ly8gR2V0IGFyZ3VtZW50c1xyXG5cdFx0dmFyIHAgPSB1dGlscy5hcmdzKHtwYXRoOiAncyEnLCBtZXRob2Q6ICdzJywgZGF0YTonbycsIHRpbWVvdXQ6ICdpJywgY2FsbGJhY2s6ICdmJ30sIGFyZ3VtZW50cyk7XHJcblxyXG5cdFx0Ly8gQ2hhbmdlIGZvciBpbnRvIGEgZGF0YSBvYmplY3RcclxuXHRcdGlmIChwLmRhdGEpIHtcclxuXHRcdFx0dXRpbHMuZGF0YVRvSlNPTihwKTtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gYXBpLmNhbGwodGhpcywgcCk7XHJcblx0fTtcclxuXHJcbn0pKGhlbGxvKTtcclxuXHJcbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuLy9cclxuLy8gU2F2ZSBhbnkgYWNjZXNzIHRva2VuIHRoYXQgaXMgaW4gdGhlIGN1cnJlbnQgcGFnZSBVUkxcclxuLy8gSGFuZGxlIGFueSByZXNwb25zZSBzb2xpY2l0ZWQgdGhyb3VnaCBpZnJhbWUgaGFzaCB0YWcgZm9sbG93aW5nIGFuIEFQSSByZXF1ZXN0XHJcbi8vXHJcbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuXHJcbmhlbGxvLnV0aWxzLnJlc3BvbnNlSGFuZGxlcih3aW5kb3csIHdpbmRvdy5vcGVuZXIgfHwgd2luZG93LnBhcmVudCk7XHJcblxyXG4vLyBTY3JpcHQgdG8gc3VwcG9ydCBDaHJvbWVBcHBzXHJcbi8vIFRoaXMgb3ZlcmlkZXMgdGhlIGhlbGxvLnV0aWxzLnBvcHVwIG1ldGhvZCB0byBzdXBwb3J0IGNocm9tZS5pZGVudGl0eS5sYXVuY2hXZWJBdXRoRmxvd1xyXG4vLyBTZWUgaHR0cHM6Ly9kZXZlbG9wZXIuY2hyb21lLmNvbS9hcHBzL2FwcF9pZGVudGl0eSNub25cclxuXHJcbi8vIElzIHRoaXMgYSBjaHJvbWUgYXBwP1xyXG5cclxuaWYgKHR5cGVvZiBjaHJvbWUgPT09ICdvYmplY3QnICYmIHR5cGVvZiBjaHJvbWUuaWRlbnRpdHkgPT09ICdvYmplY3QnICYmIGNocm9tZS5pZGVudGl0eS5sYXVuY2hXZWJBdXRoRmxvdykge1xyXG5cclxuXHQoZnVuY3Rpb24oKSB7XHJcblxyXG5cdFx0Ly8gU3dhcCB0aGUgcG9wdXAgbWV0aG9kXHJcblx0XHRoZWxsby51dGlscy5wb3B1cCA9IGZ1bmN0aW9uKHVybCkge1xyXG5cclxuXHRcdFx0cmV0dXJuIF9vcGVuKHVybCwgdHJ1ZSk7XHJcblxyXG5cdFx0fTtcclxuXHJcblx0XHQvLyBTd2FwIHRoZSBoaWRkZW4gaWZyYW1lIG1ldGhvZFxyXG5cdFx0aGVsbG8udXRpbHMuaWZyYW1lID0gZnVuY3Rpb24odXJsKSB7XHJcblxyXG5cdFx0XHRfb3Blbih1cmwsIGZhbHNlKTtcclxuXHJcblx0XHR9O1xyXG5cclxuXHRcdC8vIFN3YXAgdGhlIHJlcXVlc3RfY29ycyBtZXRob2RcclxuXHRcdGhlbGxvLnV0aWxzLnJlcXVlc3RfY29ycyA9IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XHJcblxyXG5cdFx0XHRjYWxsYmFjaygpO1xyXG5cclxuXHRcdFx0Ly8gQWx3YXlzIHJ1biBhcyBDT1JTXHJcblxyXG5cdFx0XHRyZXR1cm4gdHJ1ZTtcclxuXHRcdH07XHJcblxyXG5cdFx0Ly8gU3dhcCB0aGUgc3RvcmFnZSBtZXRob2RcclxuXHRcdHZhciBfY2FjaGUgPSB7fTtcclxuXHRcdGNocm9tZS5zdG9yYWdlLmxvY2FsLmdldCgnaGVsbG8nLCBmdW5jdGlvbihyKSB7XHJcblx0XHRcdC8vIFVwZGF0ZSB0aGUgY2FjaGVcclxuXHRcdFx0X2NhY2hlID0gci5oZWxsbyB8fCB7fTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdGhlbGxvLnV0aWxzLnN0b3JlID0gZnVuY3Rpb24obmFtZSwgdmFsdWUpIHtcclxuXHJcblx0XHRcdC8vIEdldCBhbGxcclxuXHRcdFx0aWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDApIHtcclxuXHRcdFx0XHRyZXR1cm4gX2NhY2hlO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQvLyBHZXRcclxuXHRcdFx0aWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDEpIHtcclxuXHRcdFx0XHRyZXR1cm4gX2NhY2hlW25hbWVdIHx8IG51bGw7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdC8vIFNldFxyXG5cdFx0XHRpZiAodmFsdWUpIHtcclxuXHRcdFx0XHRfY2FjaGVbbmFtZV0gPSB2YWx1ZTtcclxuXHRcdFx0XHRjaHJvbWUuc3RvcmFnZS5sb2NhbC5zZXQoe2hlbGxvOiBfY2FjaGV9KTtcclxuXHRcdFx0XHRyZXR1cm4gdmFsdWU7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdC8vIERlbGV0ZVxyXG5cdFx0XHRpZiAodmFsdWUgPT09IG51bGwpIHtcclxuXHRcdFx0XHRkZWxldGUgX2NhY2hlW25hbWVdO1xyXG5cdFx0XHRcdGNocm9tZS5zdG9yYWdlLmxvY2FsLnNldCh7aGVsbG86IF9jYWNoZX0pO1xyXG5cdFx0XHRcdHJldHVybiBudWxsO1xyXG5cdFx0XHR9XHJcblx0XHR9O1xyXG5cclxuXHRcdC8vIE9wZW4gZnVuY3Rpb25cclxuXHRcdGZ1bmN0aW9uIF9vcGVuKHVybCwgaW50ZXJhY3RpdmUpIHtcclxuXHJcblx0XHRcdC8vIExhdW5jaFxyXG5cdFx0XHR2YXIgcmVmID0ge1xyXG5cdFx0XHRcdGNsb3NlZDogZmFsc2VcclxuXHRcdFx0fTtcclxuXHJcblx0XHRcdC8vIExhdW5jaCB0aGUgd2ViQXV0aEZsb3dcclxuXHRcdFx0Y2hyb21lLmlkZW50aXR5LmxhdW5jaFdlYkF1dGhGbG93KHtcclxuXHRcdFx0XHR1cmw6IHVybCxcclxuXHRcdFx0XHRpbnRlcmFjdGl2ZTogaW50ZXJhY3RpdmVcclxuXHRcdFx0fSwgZnVuY3Rpb24ocmVzcG9uc2VVcmwpIHtcclxuXHJcblx0XHRcdFx0Ly8gRGlkIHRoZSB1c2VyIGNhbmNlbCB0aGlzIHByZW1hdHVyZWx5XHJcblx0XHRcdFx0aWYgKHJlc3BvbnNlVXJsID09PSB1bmRlZmluZWQpIHtcclxuXHRcdFx0XHRcdHJlZi5jbG9zZWQgPSB0cnVlO1xyXG5cdFx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0Ly8gU3BsaXQgYXBwYXJ0IHRoZSBVUkxcclxuXHRcdFx0XHR2YXIgYSA9IGhlbGxvLnV0aWxzLnVybChyZXNwb25zZVVybCk7XHJcblxyXG5cdFx0XHRcdC8vIFRoZSBsb2NhdGlvbiBjYW4gYmUgYXVnbWVudGVkIGluIHRvIGEgbG9jYXRpb24gb2JqZWN0IGxpa2Ugc28uLi5cclxuXHRcdFx0XHQvLyBXZSBkb250IGhhdmUgd2luZG93IG9wZXJhdGlvbnMgb24gdGhlIHBvcHVwIHNvIGxldHMgY3JlYXRlIHNvbWVcclxuXHRcdFx0XHR2YXIgX3BvcHVwID0ge1xyXG5cdFx0XHRcdFx0bG9jYXRpb246IHtcclxuXHJcblx0XHRcdFx0XHRcdC8vIENoYW5nZSB0aGUgbG9jYXRpb24gb2YgdGhlIHBvcHVwXHJcblx0XHRcdFx0XHRcdGFzc2lnbjogZnVuY3Rpb24odXJsKSB7XHJcblxyXG5cdFx0XHRcdFx0XHRcdC8vIElmIHRoZXJlIGlzIGEgc2Vjb25kYXJ5IHJlYXNzaWduXHJcblx0XHRcdFx0XHRcdFx0Ly8gSW4gdGhlIGNhc2Ugb2YgT0F1dGgxXHJcblx0XHRcdFx0XHRcdFx0Ly8gVHJpZ2dlciB0aGlzIGluIG5vbi1pbnRlcmFjdGl2ZSBtb2RlLlxyXG5cdFx0XHRcdFx0XHRcdF9vcGVuKHVybCwgZmFsc2UpO1xyXG5cdFx0XHRcdFx0XHR9LFxyXG5cclxuXHRcdFx0XHRcdFx0c2VhcmNoOiBhLnNlYXJjaCxcclxuXHRcdFx0XHRcdFx0aGFzaDogYS5oYXNoLFxyXG5cdFx0XHRcdFx0XHRocmVmOiBhLmhyZWZcclxuXHRcdFx0XHRcdH0sXHJcblx0XHRcdFx0XHRjbG9zZTogZnVuY3Rpb24oKSB7fVxyXG5cdFx0XHRcdH07XHJcblxyXG5cdFx0XHRcdC8vIFRoZW4gdGhpcyBVUkwgY29udGFpbnMgaW5mb3JtYXRpb24gd2hpY2ggSGVsbG9KUyBtdXN0IHByb2Nlc3NcclxuXHRcdFx0XHQvLyBVUkwgc3RyaW5nXHJcblx0XHRcdFx0Ly8gV2luZG93IC0gYW55IGFjdGlvbiBzdWNoIGFzIHdpbmRvdyByZWxvY2F0aW9uIGdvZXMgaGVyZVxyXG5cdFx0XHRcdC8vIE9wZW5lciAtIHRoZSBwYXJlbnQgd2luZG93IHdoaWNoIG9wZW5lZCB0aGlzLCBha2EgdGhpcyBzY3JpcHRcclxuXHJcblx0XHRcdFx0aGVsbG8udXRpbHMucmVzcG9uc2VIYW5kbGVyKF9wb3B1cCwgd2luZG93KTtcclxuXHRcdFx0fSk7XHJcblxyXG5cdFx0XHQvLyBSZXR1cm4gdGhlIHJlZmVyZW5jZVxyXG5cdFx0XHRyZXR1cm4gcmVmO1xyXG5cdFx0fVxyXG5cclxuXHR9KSgpO1xyXG59XHJcblxyXG4vLyBQaG9uZWdhcCBvdmVycmlkZSBmb3IgaGVsbG8ucGhvbmVnYXAuanNcclxuKGZ1bmN0aW9uKCkge1xyXG5cclxuXHQvLyBJcyB0aGlzIGEgcGhvbmVnYXAgaW1wbGVtZW50YXRpb24/XHJcblx0aWYgKCEoL15maWxlOlxcL3szfVteXFwvXS8udGVzdCh3aW5kb3cubG9jYXRpb24uaHJlZikgJiYgd2luZG93LmNvcmRvdmEpKSB7XHJcblx0XHQvLyBDb3Jkb3ZhIGlzIG5vdCBpbmNsdWRlZC5cclxuXHRcdHJldHVybjtcclxuXHR9XHJcblxyXG5cdC8vIEF1Z21lbnQgdGhlIGhpZGRlbiBpZnJhbWUgbWV0aG9kXHJcblx0aGVsbG8udXRpbHMuaWZyYW1lID0gZnVuY3Rpb24odXJsLCByZWRpcmVjdFVyaSkge1xyXG5cdFx0aGVsbG8udXRpbHMucG9wdXAodXJsLCByZWRpcmVjdFVyaSwge2hpZGRlbjogJ3llcyd9KTtcclxuXHR9O1xyXG5cclxuXHQvLyBBdWdtZW50IHRoZSBwb3B1cFxyXG5cdHZhciB1dGlsUG9wdXAgPSBoZWxsby51dGlscy5wb3B1cDtcclxuXHJcblx0Ly8gUmVwbGFjZSBwb3B1cFxyXG5cdGhlbGxvLnV0aWxzLnBvcHVwID0gZnVuY3Rpb24odXJsLCByZWRpcmVjdFVyaSwgb3B0aW9ucykge1xyXG5cclxuXHRcdC8vIFJ1biB0aGUgc3RhbmRhcmRcclxuXHRcdHZhciBwb3B1cCA9IHV0aWxQb3B1cC5jYWxsKHRoaXMsIHVybCwgcmVkaXJlY3RVcmksIG9wdGlvbnMpO1xyXG5cclxuXHRcdC8vIENyZWF0ZSBhIGZ1bmN0aW9uIGZvciByZW9wZW5pbmcgdGhlIHBvcHVwLCBhbmQgYXNzaWduaW5nIGV2ZW50cyB0byB0aGUgbmV3IHBvcHVwIG9iamVjdFxyXG5cdFx0Ly8gUGhvbmVHYXAgc3VwcG9ydFxyXG5cdFx0Ly8gQWRkIGFuIGV2ZW50IGxpc3RlbmVyIHRvIGxpc3RlbiB0byB0aGUgY2hhbmdlIGluIHRoZSBwb3B1cCB3aW5kb3dzIFVSTFxyXG5cdFx0Ly8gVGhpcyBtdXN0IGFwcGVhciBiZWZvcmUgcG9wdXAuZm9jdXMoKTtcclxuXHRcdHRyeSB7XHJcblx0XHRcdGlmIChwb3B1cCAmJiBwb3B1cC5hZGRFdmVudExpc3RlbmVyKSB7XHJcblxyXG5cdFx0XHRcdC8vIEdldCB0aGUgb3JpZ2luIG9mIHRoZSByZWRpcmVjdCBVUklcclxuXHJcblx0XHRcdFx0dmFyIGEgPSBoZWxsby51dGlscy51cmwocmVkaXJlY3RVcmkpO1xyXG5cdFx0XHRcdHZhciByZWRpcmVjdFVyaU9yaWdpbiA9IGEub3JpZ2luIHx8IChhLnByb3RvY29sICsgJy8vJyArIGEuaG9zdG5hbWUpO1xyXG5cclxuXHRcdFx0XHQvLyBMaXN0ZW4gdG8gY2hhbmdlcyBpbiB0aGUgSW5BcHBCcm93c2VyIHdpbmRvd1xyXG5cclxuXHRcdFx0XHRwb3B1cC5hZGRFdmVudExpc3RlbmVyKCdsb2Fkc3RhcnQnLCBmdW5jdGlvbihlKSB7XHJcblxyXG5cdFx0XHRcdFx0dmFyIHVybCA9IGUudXJsO1xyXG5cclxuXHRcdFx0XHRcdC8vIElzIHRoaXMgdGhlIHBhdGgsIGFzIGdpdmVuIGJ5IHRoZSByZWRpcmVjdFVyaT9cclxuXHRcdFx0XHRcdC8vIENoZWNrIHRoZSBuZXcgVVJMIGFnYWlucyB0aGUgcmVkaXJlY3RVcmlPcmlnaW4uXHJcblx0XHRcdFx0XHQvLyBBY2NvcmRpbmcgdG8gIzYzIGEgdXNlciBjb3VsZCBjbGljayAnY2FuY2VsJyBpbiBzb21lIGRpYWxvZyBib3hlcyAuLi4uXHJcblx0XHRcdFx0XHQvLyBUaGUgcG9wdXAgcmVkaXJlY3RzIHRvIGFub3RoZXIgcGFnZSB3aXRoIHRoZSBzYW1lIG9yaWdpbiwgeWV0IHdlIHN0aWxsIHdpc2ggaXQgdG8gY2xvc2UuXHJcblxyXG5cdFx0XHRcdFx0aWYgKHVybC5pbmRleE9mKHJlZGlyZWN0VXJpT3JpZ2luKSAhPT0gMCkge1xyXG5cdFx0XHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0Ly8gU3BsaXQgYXBwYXJ0IHRoZSBVUkxcclxuXHRcdFx0XHRcdHZhciBhID0gaGVsbG8udXRpbHMudXJsKHVybCk7XHJcblxyXG5cdFx0XHRcdFx0Ly8gV2UgZG9udCBoYXZlIHdpbmRvdyBvcGVyYXRpb25zIG9uIHRoZSBwb3B1cCBzbyBsZXRzIGNyZWF0ZSBzb21lXHJcblx0XHRcdFx0XHQvLyBUaGUgbG9jYXRpb24gY2FuIGJlIGF1Z21lbnRlZCBpbiB0byBhIGxvY2F0aW9uIG9iamVjdCBsaWtlIHNvLi4uXHJcblxyXG5cdFx0XHRcdFx0dmFyIF9wb3B1cCA9IHtcclxuXHRcdFx0XHRcdFx0bG9jYXRpb246IHtcclxuXHRcdFx0XHRcdFx0XHQvLyBDaGFuZ2UgdGhlIGxvY2F0aW9uIG9mIHRoZSBwb3B1cFxyXG5cdFx0XHRcdFx0XHRcdGFzc2lnbjogZnVuY3Rpb24obG9jYXRpb24pIHtcclxuXHJcblx0XHRcdFx0XHRcdFx0XHQvLyBVbmZvdXJ0dW5hdGx5IGFuIGFwcCBpcyBtYXkgbm90IGNoYW5nZSB0aGUgbG9jYXRpb24gb2YgYSBJbkFwcEJyb3dzZXIgd2luZG93LlxyXG5cdFx0XHRcdFx0XHRcdFx0Ly8gU28gdG8gc2hpbSB0aGlzLCBqdXN0IG9wZW4gYSBuZXcgb25lLlxyXG5cdFx0XHRcdFx0XHRcdFx0cG9wdXAuZXhlY3V0ZVNjcmlwdCh7Y29kZTogJ3dpbmRvdy5sb2NhdGlvbi5ocmVmID0gXCInICsgbG9jYXRpb24gKyAnO1wiJ30pO1xyXG5cdFx0XHRcdFx0XHRcdH0sXHJcblxyXG5cdFx0XHRcdFx0XHRcdHNlYXJjaDogYS5zZWFyY2gsXHJcblx0XHRcdFx0XHRcdFx0aGFzaDogYS5oYXNoLFxyXG5cdFx0XHRcdFx0XHRcdGhyZWY6IGEuaHJlZlxyXG5cdFx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0XHRjbG9zZTogZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0XHRcdFx0aWYgKHBvcHVwLmNsb3NlKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRwb3B1cC5jbG9zZSgpO1xyXG5cdFx0XHRcdFx0XHRcdFx0dHJ5IHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0cG9wdXAuY2xvc2VkID0gdHJ1ZTtcclxuXHRcdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0XHRcdGNhdGNoIChfZSkge31cclxuXHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdH07XHJcblxyXG5cdFx0XHRcdFx0Ly8gVGhlbiB0aGlzIFVSTCBjb250YWlucyBpbmZvcm1hdGlvbiB3aGljaCBIZWxsb0pTIG11c3QgcHJvY2Vzc1xyXG5cdFx0XHRcdFx0Ly8gVVJMIHN0cmluZ1xyXG5cdFx0XHRcdFx0Ly8gV2luZG93IC0gYW55IGFjdGlvbiBzdWNoIGFzIHdpbmRvdyByZWxvY2F0aW9uIGdvZXMgaGVyZVxyXG5cdFx0XHRcdFx0Ly8gT3BlbmVyIC0gdGhlIHBhcmVudCB3aW5kb3cgd2hpY2ggb3BlbmVkIHRoaXMsIGFrYSB0aGlzIHNjcmlwdFxyXG5cclxuXHRcdFx0XHRcdGhlbGxvLnV0aWxzLnJlc3BvbnNlSGFuZGxlcihfcG9wdXAsIHdpbmRvdyk7XHJcblxyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHRjYXRjaCAoZSkge31cclxuXHJcblx0XHRyZXR1cm4gcG9wdXA7XHJcblx0fTtcclxuXHJcbn0pKCk7XHJcblxyXG4oZnVuY3Rpb24oaGVsbG8pIHtcclxuXHJcblx0Ly8gT0F1dGgxXHJcblx0dmFyIE9BdXRoMVNldHRpbmdzID0ge1xyXG5cdFx0dmVyc2lvbjogJzEuMCcsXHJcblx0XHRhdXRoOiAnaHR0cHM6Ly93d3cuZHJvcGJveC5jb20vMS9vYXV0aC9hdXRob3JpemUnLFxyXG5cdFx0cmVxdWVzdDogJ2h0dHBzOi8vYXBpLmRyb3Bib3guY29tLzEvb2F1dGgvcmVxdWVzdF90b2tlbicsXHJcblx0XHR0b2tlbjogJ2h0dHBzOi8vYXBpLmRyb3Bib3guY29tLzEvb2F1dGgvYWNjZXNzX3Rva2VuJ1xyXG5cdH07XHJcblxyXG5cdC8vIE9BdXRoMiBTZXR0aW5nc1xyXG5cdHZhciBPQXV0aDJTZXR0aW5ncyA9IHtcclxuXHRcdHZlcnNpb246IDIsXHJcblx0XHRhdXRoOiAnaHR0cHM6Ly93d3cuZHJvcGJveC5jb20vMS9vYXV0aDIvYXV0aG9yaXplJyxcclxuXHRcdGdyYW50OiAnaHR0cHM6Ly9hcGkuZHJvcGJveC5jb20vMS9vYXV0aDIvdG9rZW4nXHJcblx0fTtcclxuXHJcblx0Ly8gSW5pdGlhdGUgdGhlIERyb3Bib3ggbW9kdWxlXHJcblx0aGVsbG8uaW5pdCh7XHJcblxyXG5cdFx0ZHJvcGJveDoge1xyXG5cclxuXHRcdFx0bmFtZTogJ0Ryb3Bib3gnLFxyXG5cclxuXHRcdFx0b2F1dGg6IE9BdXRoMlNldHRpbmdzLFxyXG5cclxuXHRcdFx0bG9naW46IGZ1bmN0aW9uKHApIHtcclxuXHRcdFx0XHQvLyBPQXV0aDIgbm9uLXN0YW5kYXJkIGFkanVzdG1lbnRzXHJcblx0XHRcdFx0cC5xcy5zY29wZSA9ICcnO1xyXG5cclxuXHRcdFx0XHQvLyBTaG91bGQgdGhpcyBiZSBydW4gYXMgT0F1dGgxP1xyXG5cdFx0XHRcdC8vIElmIHRoZSByZWRpcmVjdF91cmkgaXMgaXMgSFRUUCAobm9uLXNlY3VyZSkgdGhlbiBpdHMgcmVxdWlyZWQgdG8gcmV2ZXJ0IHRvIHRoZSBPQXV0aDEgZW5kcG9pbnRzXHJcblx0XHRcdFx0dmFyIHJlZGlyZWN0ID0gZGVjb2RlVVJJQ29tcG9uZW50KHAucXMucmVkaXJlY3RfdXJpKTtcclxuXHRcdFx0XHRpZiAocmVkaXJlY3QuaW5kZXhPZignaHR0cDonKSA9PT0gMCAmJiByZWRpcmVjdC5pbmRleE9mKCdodHRwOi8vbG9jYWxob3N0LycpICE9PSAwKSB7XHJcblxyXG5cdFx0XHRcdFx0Ly8gT3ZlcnJpZGUgdGhlIGRyb3Bib3ggT0F1dGggc2V0dGluZ3MuXHJcblx0XHRcdFx0XHRoZWxsby5zZXJ2aWNlcy5kcm9wYm94Lm9hdXRoID0gT0F1dGgxU2V0dGluZ3M7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdGVsc2Uge1xyXG5cdFx0XHRcdFx0Ly8gT3ZlcnJpZGUgdGhlIGRyb3Bib3ggT0F1dGggc2V0dGluZ3MuXHJcblx0XHRcdFx0XHRoZWxsby5zZXJ2aWNlcy5kcm9wYm94Lm9hdXRoID0gT0F1dGgyU2V0dGluZ3M7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHQvLyBUaGUgZHJvcGJveCBsb2dpbiB3aW5kb3cgaXMgYSBkaWZmZXJlbnQgc2l6ZVxyXG5cdFx0XHRcdHAub3B0aW9ucy5wb3B1cC53aWR0aCA9IDEwMDA7XHJcblx0XHRcdFx0cC5vcHRpb25zLnBvcHVwLmhlaWdodCA9IDEwMDA7XHJcblx0XHRcdH0sXHJcblxyXG5cdFx0XHQvKlxyXG5cdFx0XHRcdERyb3Bib3ggZG9lcyBub3QgYWxsb3cgaW5zZWN1cmUgSFRUUCBVUkkncyBpbiB0aGUgcmVkaXJlY3RfdXJpIGZpZWxkXHJcblx0XHRcdFx0Li4ub3RoZXJ3aXNlIEknZCBsb3ZlIHRvIHVzZSBPQXV0aDJcclxuXHJcblx0XHRcdFx0Rm9sbG93IHJlcXVlc3QgaHR0cHM6Ly9mb3J1bXMuZHJvcGJveC5jb20vdG9waWMucGhwP2lkPTEwNjUwNVxyXG5cclxuXHRcdFx0XHRwLnFzLnJlc3BvbnNlX3R5cGUgPSAnY29kZSc7XHJcblx0XHRcdFx0b2F1dGg6IHtcclxuXHRcdFx0XHRcdHZlcnNpb246IDIsXHJcblx0XHRcdFx0XHRhdXRoOiAnaHR0cHM6Ly93d3cuZHJvcGJveC5jb20vMS9vYXV0aDIvYXV0aG9yaXplJyxcclxuXHRcdFx0XHRcdGdyYW50OiAnaHR0cHM6Ly9hcGkuZHJvcGJveC5jb20vMS9vYXV0aDIvdG9rZW4nXHJcblx0XHRcdFx0fVxyXG5cdFx0XHQqL1xyXG5cclxuXHRcdFx0Ly8gQVBJIEJhc2UgVVJMXHJcblx0XHRcdGJhc2U6ICdodHRwczovL2FwaS5kcm9wYm94LmNvbS8xLycsXHJcblxyXG5cdFx0XHQvLyBCZXNwb2tlIHNldHRpbmc6IHRoaXMgaXMgc3RhdGVzIHdoZXRoZXIgdG8gdXNlIHRoZSBjdXN0b20gZW52aXJvbm1lbnQgb2YgRHJvcGJveCBvciB0byB1c2UgdGhlaXIgb3duIGVudmlyb25tZW50XHJcblx0XHRcdC8vIEJlY2F1c2UgaXQncyBub3RvcmlvdXNseSBkaWZmaWN1bHQgZm9yIERyb3Bib3ggdG9vIHByb3ZpZGUgYWNjZXNzIGZyb20gb3RoZXIgd2Vic2VydmljZXMsIHRoaXMgZGVmYXVsdHMgdG8gU2FuZGJveFxyXG5cdFx0XHRyb290OiAnc2FuZGJveCcsXHJcblxyXG5cdFx0XHQvLyBNYXAgR0VUIHJlcXVlc3RzXHJcblx0XHRcdGdldDoge1xyXG5cdFx0XHRcdG1lOiAnYWNjb3VudC9pbmZvJyxcclxuXHJcblx0XHRcdFx0Ly8gSHR0cHM6Ly93d3cuZHJvcGJveC5jb20vZGV2ZWxvcGVycy9jb3JlL2RvY3MjbWV0YWRhdGFcclxuXHRcdFx0XHQnbWUvZmlsZXMnOiByZXEoJ21ldGFkYXRhL2F1dG8vQHtwYXJlbnR8fScpLFxyXG5cdFx0XHRcdCdtZS9mb2xkZXInOiByZXEoJ21ldGFkYXRhL2F1dG8vQHtpZH0nKSxcclxuXHRcdFx0XHQnbWUvZm9sZGVycyc6IHJlcSgnbWV0YWRhdGEvYXV0by8nKSxcclxuXHJcblx0XHRcdFx0J2RlZmF1bHQnOiBmdW5jdGlvbihwLCBjYWxsYmFjaykge1xyXG5cdFx0XHRcdFx0aWYgKHAucGF0aC5tYXRjaCgnaHR0cHM6Ly9hcGktY29udGVudC5kcm9wYm94LmNvbS8xL2ZpbGVzLycpKSB7XHJcblx0XHRcdFx0XHRcdC8vIFRoaXMgaXMgYSBmaWxlLCByZXR1cm4gYmluYXJ5IGRhdGFcclxuXHRcdFx0XHRcdFx0cC5tZXRob2QgPSAnYmxvYic7XHJcblx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0Y2FsbGJhY2socC5wYXRoKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0sXHJcblxyXG5cdFx0XHRwb3N0OiB7XHJcblx0XHRcdFx0J21lL2ZpbGVzJzogZnVuY3Rpb24ocCwgY2FsbGJhY2spIHtcclxuXHJcblx0XHRcdFx0XHR2YXIgcGF0aCA9IHAuZGF0YS5wYXJlbnQ7XHJcblx0XHRcdFx0XHR2YXIgZmlsZU5hbWUgPSBwLmRhdGEubmFtZTtcclxuXHJcblx0XHRcdFx0XHRwLmRhdGEgPSB7XHJcblx0XHRcdFx0XHRcdGZpbGU6IHAuZGF0YS5maWxlXHJcblx0XHRcdFx0XHR9O1xyXG5cclxuXHRcdFx0XHRcdC8vIERvZXMgdGhpcyBoYXZlIGEgZGF0YS11cmkgdG8gdXBsb2FkIGFzIGEgZmlsZT9cclxuXHRcdFx0XHRcdGlmICh0eXBlb2YgKHAuZGF0YS5maWxlKSA9PT0gJ3N0cmluZycpIHtcclxuXHRcdFx0XHRcdFx0cC5kYXRhLmZpbGUgPSBoZWxsby51dGlscy50b0Jsb2IocC5kYXRhLmZpbGUpO1xyXG5cdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdGNhbGxiYWNrKCdodHRwczovL2FwaS1jb250ZW50LmRyb3Bib3guY29tLzEvZmlsZXNfcHV0L2F1dG8vJyArIHBhdGggKyAnLycgKyBmaWxlTmFtZSk7XHJcblx0XHRcdFx0fSxcclxuXHJcblx0XHRcdFx0J21lL2ZvbGRlcnMnOiBmdW5jdGlvbihwLCBjYWxsYmFjaykge1xyXG5cclxuXHRcdFx0XHRcdHZhciBuYW1lID0gcC5kYXRhLm5hbWU7XHJcblx0XHRcdFx0XHRwLmRhdGEgPSB7fTtcclxuXHJcblx0XHRcdFx0XHRjYWxsYmFjaygnZmlsZW9wcy9jcmVhdGVfZm9sZGVyP3Jvb3Q9QHtyb290fHNhbmRib3h9JicgKyBoZWxsby51dGlscy5wYXJhbSh7XHJcblx0XHRcdFx0XHRcdHBhdGg6IG5hbWVcclxuXHRcdFx0XHRcdH0pKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0sXHJcblxyXG5cdFx0XHQvLyBNYXAgREVMRVRFIHJlcXVlc3RzXHJcblx0XHRcdGRlbDoge1xyXG5cdFx0XHRcdCdtZS9maWxlcyc6ICdmaWxlb3BzL2RlbGV0ZT9yb290PUB7cm9vdHxzYW5kYm94fSZwYXRoPUB7aWR9JyxcclxuXHRcdFx0XHQnbWUvZm9sZGVyJzogJ2ZpbGVvcHMvZGVsZXRlP3Jvb3Q9QHtyb290fHNhbmRib3h9JnBhdGg9QHtpZH0nXHJcblx0XHRcdH0sXHJcblxyXG5cdFx0XHR3cmFwOiB7XHJcblx0XHRcdFx0bWU6IGZ1bmN0aW9uKG8pIHtcclxuXHRcdFx0XHRcdGZvcm1hdEVycm9yKG8pO1xyXG5cdFx0XHRcdFx0aWYgKCFvLnVpZCkge1xyXG5cdFx0XHRcdFx0XHRyZXR1cm4gbztcclxuXHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHRvLm5hbWUgPSBvLmRpc3BsYXlfbmFtZTtcclxuXHRcdFx0XHRcdHZhciBtID0gby5uYW1lLnNwbGl0KCcgJyk7XHJcblx0XHRcdFx0XHRvLmZpcnN0X25hbWUgPSBtLnNoaWZ0KCk7XHJcblx0XHRcdFx0XHRvLmxhc3RfbmFtZSA9IG0uam9pbignICcpO1xyXG5cdFx0XHRcdFx0by5pZCA9IG8udWlkO1xyXG5cdFx0XHRcdFx0ZGVsZXRlIG8udWlkO1xyXG5cdFx0XHRcdFx0ZGVsZXRlIG8uZGlzcGxheV9uYW1lO1xyXG5cdFx0XHRcdFx0cmV0dXJuIG87XHJcblx0XHRcdFx0fSxcclxuXHJcblx0XHRcdFx0J2RlZmF1bHQnOiBmdW5jdGlvbihvLCBoZWFkZXJzLCByZXEpIHtcclxuXHRcdFx0XHRcdGZvcm1hdEVycm9yKG8pO1xyXG5cdFx0XHRcdFx0aWYgKG8uaXNfZGlyICYmIG8uY29udGVudHMpIHtcclxuXHRcdFx0XHRcdFx0by5kYXRhID0gby5jb250ZW50cztcclxuXHRcdFx0XHRcdFx0ZGVsZXRlIG8uY29udGVudHM7XHJcblxyXG5cdFx0XHRcdFx0XHRvLmRhdGEuZm9yRWFjaChmdW5jdGlvbihpdGVtKSB7XHJcblx0XHRcdFx0XHRcdFx0aXRlbS5yb290ID0gby5yb290O1xyXG5cdFx0XHRcdFx0XHRcdGZvcm1hdEZpbGUoaXRlbSwgaGVhZGVycywgcmVxKTtcclxuXHRcdFx0XHRcdFx0fSk7XHJcblx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0Zm9ybWF0RmlsZShvLCBoZWFkZXJzLCByZXEpO1xyXG5cclxuXHRcdFx0XHRcdGlmIChvLmlzX2RlbGV0ZWQpIHtcclxuXHRcdFx0XHRcdFx0by5zdWNjZXNzID0gdHJ1ZTtcclxuXHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHRyZXR1cm4gbztcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0sXHJcblxyXG5cdFx0XHQvLyBEb2Vzbid0IHJldHVybiB0aGUgQ09SUyBoZWFkZXJzXHJcblx0XHRcdHhocjogZnVuY3Rpb24ocCkge1xyXG5cclxuXHRcdFx0XHQvLyBUaGUgcHJveHkgc3VwcG9ydHMgYWxsb3ctY3Jvc3Mtb3JpZ2luLXJlc291cmNlXHJcblx0XHRcdFx0Ly8gQWxhcyB0aGF0J3MgdGhlIG9ubHkgdGhpbmcgd2UncmUgdXNpbmcuXHJcblx0XHRcdFx0aWYgKHAuZGF0YSAmJiBwLmRhdGEuZmlsZSkge1xyXG5cdFx0XHRcdFx0dmFyIGZpbGUgPSBwLmRhdGEuZmlsZTtcclxuXHRcdFx0XHRcdGlmIChmaWxlKSB7XHJcblx0XHRcdFx0XHRcdGlmIChmaWxlLmZpbGVzKSB7XHJcblx0XHRcdFx0XHRcdFx0cC5kYXRhID0gZmlsZS5maWxlc1swXTtcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRlbHNlIHtcclxuXHRcdFx0XHRcdFx0XHRwLmRhdGEgPSBmaWxlO1xyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRpZiAocC5tZXRob2QgPT09ICdkZWxldGUnKSB7XHJcblx0XHRcdFx0XHRwLm1ldGhvZCA9ICdwb3N0JztcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdHJldHVybiB0cnVlO1xyXG5cdFx0XHR9LFxyXG5cclxuXHRcdFx0Zm9ybTogZnVuY3Rpb24ocCwgcXMpIHtcclxuXHRcdFx0XHRkZWxldGUgcXMuc3RhdGU7XHJcblx0XHRcdFx0ZGVsZXRlIHFzLnJlZGlyZWN0X3VyaTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH0pO1xyXG5cclxuXHRmdW5jdGlvbiBmb3JtYXRFcnJvcihvKSB7XHJcblx0XHRpZiAobyAmJiAnZXJyb3InIGluIG8pIHtcclxuXHRcdFx0by5lcnJvciA9IHtcclxuXHRcdFx0XHRjb2RlOiAnc2VydmVyX2Vycm9yJyxcclxuXHRcdFx0XHRtZXNzYWdlOiBvLmVycm9yLm1lc3NhZ2UgfHwgby5lcnJvclxyXG5cdFx0XHR9O1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0ZnVuY3Rpb24gZm9ybWF0RmlsZShvLCBoZWFkZXJzLCByZXEpIHtcclxuXHJcblx0XHRpZiAodHlwZW9mIG8gIT09ICdvYmplY3QnIHx8XHJcblx0XHRcdCh0eXBlb2YgQmxvYiAhPT0gJ3VuZGVmaW5lZCcgJiYgbyBpbnN0YW5jZW9mIEJsb2IpIHx8XHJcblx0XHRcdCh0eXBlb2YgQXJyYXlCdWZmZXIgIT09ICd1bmRlZmluZWQnICYmIG8gaW5zdGFuY2VvZiBBcnJheUJ1ZmZlcikpIHtcclxuXHRcdFx0Ly8gVGhpcyBpcyBhIGZpbGUsIGxldCBpdCB0aHJvdWdoIHVuZm9ybWF0dGVkXHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAoJ2Vycm9yJyBpbiBvKSB7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHJcblx0XHR2YXIgcGF0aCA9IChvLnJvb3QgIT09ICdhcHBfZm9sZGVyJyA/IG8ucm9vdCA6ICcnKSArIG8ucGF0aC5yZXBsYWNlKC9cXCYvZywgJyUyNicpO1xyXG5cdFx0cGF0aCA9IHBhdGgucmVwbGFjZSgvXlxcLy8sICcnKTtcclxuXHRcdGlmIChvLnRodW1iX2V4aXN0cykge1xyXG5cdFx0XHRvLnRodW1ibmFpbCA9IHJlcS5vYXV0aF9wcm94eSArICc/cGF0aD0nICtcclxuXHRcdFx0ZW5jb2RlVVJJQ29tcG9uZW50KCdodHRwczovL2FwaS1jb250ZW50LmRyb3Bib3guY29tLzEvdGh1bWJuYWlscy9hdXRvLycgKyBwYXRoICsgJz9mb3JtYXQ9anBlZyZzaXplPW0nKSArICcmYWNjZXNzX3Rva2VuPScgKyByZXEub3B0aW9ucy5hY2Nlc3NfdG9rZW47XHJcblx0XHR9XHJcblxyXG5cdFx0by50eXBlID0gKG8uaXNfZGlyID8gJ2ZvbGRlcicgOiBvLm1pbWVfdHlwZSk7XHJcblx0XHRvLm5hbWUgPSBvLnBhdGgucmVwbGFjZSgvLipcXC8vZywgJycpO1xyXG5cdFx0aWYgKG8uaXNfZGlyKSB7XHJcblx0XHRcdG8uZmlsZXMgPSBwYXRoLnJlcGxhY2UoL15cXC8vLCAnJyk7XHJcblx0XHR9XHJcblx0XHRlbHNlIHtcclxuXHRcdFx0by5kb3dubG9hZExpbmsgPSBoZWxsby5zZXR0aW5ncy5vYXV0aF9wcm94eSArICc/cGF0aD0nICtcclxuXHRcdFx0ZW5jb2RlVVJJQ29tcG9uZW50KCdodHRwczovL2FwaS1jb250ZW50LmRyb3Bib3guY29tLzEvZmlsZXMvYXV0by8nICsgcGF0aCkgKyAnJmFjY2Vzc190b2tlbj0nICsgcmVxLm9wdGlvbnMuYWNjZXNzX3Rva2VuO1xyXG5cdFx0XHRvLmZpbGUgPSAnaHR0cHM6Ly9hcGktY29udGVudC5kcm9wYm94LmNvbS8xL2ZpbGVzL2F1dG8vJyArIHBhdGg7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKCFvLmlkKSB7XHJcblx0XHRcdG8uaWQgPSBvLnBhdGgucmVwbGFjZSgvXlxcLy8sICcnKTtcclxuXHRcdH1cclxuXHJcblx0XHQvLyBPLm1lZGlhID0gJ2h0dHBzOi8vYXBpLWNvbnRlbnQuZHJvcGJveC5jb20vMS9maWxlcy8nICsgcGF0aDtcclxuXHR9XHJcblxyXG5cdGZ1bmN0aW9uIHJlcShzdHIpIHtcclxuXHRcdHJldHVybiBmdW5jdGlvbihwLCBjYikge1xyXG5cdFx0XHRkZWxldGUgcC5xdWVyeS5saW1pdDtcclxuXHRcdFx0Y2Ioc3RyKTtcclxuXHRcdH07XHJcblx0fVxyXG5cclxufSkoaGVsbG8pO1xyXG5cclxuKGZ1bmN0aW9uKGhlbGxvKSB7XHJcblxyXG5cdGhlbGxvLmluaXQoe1xyXG5cclxuXHRcdGZhY2Vib29rOiB7XHJcblxyXG5cdFx0XHRuYW1lOiAnRmFjZWJvb2snLFxyXG5cclxuXHRcdFx0Ly8gU0VFIGh0dHBzOi8vZGV2ZWxvcGVycy5mYWNlYm9vay5jb20vZG9jcy9mYWNlYm9vay1sb2dpbi9tYW51YWxseS1idWlsZC1hLWxvZ2luLWZsb3cvdjIuMVxyXG5cdFx0XHRvYXV0aDoge1xyXG5cdFx0XHRcdHZlcnNpb246IDIsXHJcblx0XHRcdFx0YXV0aDogJ2h0dHBzOi8vd3d3LmZhY2Vib29rLmNvbS9kaWFsb2cvb2F1dGgvJyxcclxuXHRcdFx0XHRncmFudDogJ2h0dHBzOi8vZ3JhcGguZmFjZWJvb2suY29tL29hdXRoL2FjY2Vzc190b2tlbidcclxuXHRcdFx0fSxcclxuXHJcblx0XHRcdC8vIEF1dGhvcml6YXRpb24gc2NvcGVzXHJcblx0XHRcdHNjb3BlOiB7XHJcblx0XHRcdFx0YmFzaWM6ICdwdWJsaWNfcHJvZmlsZScsXHJcblx0XHRcdFx0ZW1haWw6ICdlbWFpbCcsXHJcblx0XHRcdFx0c2hhcmU6ICd1c2VyX3Bvc3RzJyxcclxuXHRcdFx0XHRiaXJ0aGRheTogJ3VzZXJfYmlydGhkYXknLFxyXG5cdFx0XHRcdGV2ZW50czogJ3VzZXJfZXZlbnRzJyxcclxuXHRcdFx0XHRwaG90b3M6ICd1c2VyX3Bob3RvcycsXHJcblx0XHRcdFx0dmlkZW9zOiAndXNlcl92aWRlb3MnLFxyXG5cdFx0XHRcdGZyaWVuZHM6ICd1c2VyX2ZyaWVuZHMnLFxyXG5cdFx0XHRcdGZpbGVzOiAndXNlcl9waG90b3MsdXNlcl92aWRlb3MnLFxyXG5cdFx0XHRcdHB1Ymxpc2hfZmlsZXM6ICd1c2VyX3Bob3Rvcyx1c2VyX3ZpZGVvcyxwdWJsaXNoX2FjdGlvbnMnLFxyXG5cdFx0XHRcdHB1Ymxpc2g6ICdwdWJsaXNoX2FjdGlvbnMnLFxyXG5cclxuXHRcdFx0XHQvLyBEZXByZWNhdGVkIGluIHYyLjBcclxuXHRcdFx0XHQvLyBDcmVhdGVfZXZlbnRcdDogJ2NyZWF0ZV9ldmVudCcsXHJcblxyXG5cdFx0XHRcdG9mZmxpbmVfYWNjZXNzOiAnJ1xyXG5cdFx0XHR9LFxyXG5cclxuXHRcdFx0Ly8gUmVmcmVzaCB0aGUgYWNjZXNzX3Rva2VuXHJcblx0XHRcdHJlZnJlc2g6IGZhbHNlLFxyXG5cclxuXHRcdFx0bG9naW46IGZ1bmN0aW9uKHApIHtcclxuXHJcblx0XHRcdFx0Ly8gUmVhdXRoZW50aWNhdGVcclxuXHRcdFx0XHQvLyBodHRwczovL2RldmVsb3BlcnMuZmFjZWJvb2suY29tL2RvY3MvZmFjZWJvb2stbG9naW4vcmVhdXRoZW50aWNhdGlvblxyXG5cdFx0XHRcdGlmIChwLm9wdGlvbnMuZm9yY2UpIHtcclxuXHRcdFx0XHRcdHAucXMuYXV0aF90eXBlID0gJ3JlYXV0aGVudGljYXRlJztcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdC8vIFNldCB0aGUgZGlzcGxheSB2YWx1ZVxyXG5cdFx0XHRcdHAucXMuZGlzcGxheSA9IHAub3B0aW9ucy5kaXNwbGF5IHx8ICdwb3B1cCc7XHJcblx0XHRcdH0sXHJcblxyXG5cdFx0XHRsb2dvdXQ6IGZ1bmN0aW9uKGNhbGxiYWNrLCBvcHRpb25zKSB7XHJcblx0XHRcdFx0Ly8gQXNzaWduIGNhbGxiYWNrIHRvIGEgZ2xvYmFsIGhhbmRsZXJcclxuXHRcdFx0XHR2YXIgY2FsbGJhY2tJRCA9IGhlbGxvLnV0aWxzLmdsb2JhbEV2ZW50KGNhbGxiYWNrKTtcclxuXHRcdFx0XHR2YXIgcmVkaXJlY3QgPSBlbmNvZGVVUklDb21wb25lbnQoaGVsbG8uc2V0dGluZ3MucmVkaXJlY3RfdXJpICsgJz8nICsgaGVsbG8udXRpbHMucGFyYW0oe2NhbGxiYWNrOmNhbGxiYWNrSUQsIHJlc3VsdDogSlNPTi5zdHJpbmdpZnkoe2ZvcmNlOnRydWV9KSwgc3RhdGU6ICd7fSd9KSk7XHJcblx0XHRcdFx0dmFyIHRva2VuID0gKG9wdGlvbnMuYXV0aFJlc3BvbnNlIHx8IHt9KS5hY2Nlc3NfdG9rZW47XHJcblx0XHRcdFx0aGVsbG8udXRpbHMuaWZyYW1lKCdodHRwczovL3d3dy5mYWNlYm9vay5jb20vbG9nb3V0LnBocD9uZXh0PScgKyByZWRpcmVjdCArICcmYWNjZXNzX3Rva2VuPScgKyB0b2tlbik7XHJcblxyXG5cdFx0XHRcdC8vIFBvc3NpYmxlIHJlc3BvbnNlczpcclxuXHRcdFx0XHQvLyBTdHJpbmcgVVJMXHQtIGhlbGxvLmxvZ291dCBzaG91bGQgaGFuZGxlIHRoZSBsb2dvdXRcclxuXHRcdFx0XHQvLyBVbmRlZmluZWRcdC0gdGhpcyBmdW5jdGlvbiB3aWxsIGhhbmRsZSB0aGUgY2FsbGJhY2tcclxuXHRcdFx0XHQvLyBUcnVlIC0gdGhyb3cgYSBzdWNjZXNzLCB0aGlzIGNhbGxiYWNrIGlzbid0IGhhbmRsaW5nIHRoZSBjYWxsYmFja1xyXG5cdFx0XHRcdC8vIEZhbHNlIC0gdGhyb3cgYSBlcnJvclxyXG5cdFx0XHRcdGlmICghdG9rZW4pIHtcclxuXHRcdFx0XHRcdC8vIElmIHRoZXJlIGlzbid0IGEgdG9rZW4sIHRoZSBhYm92ZSB3b250IHJldHVybiBhIHJlc3BvbnNlLCBzbyBsZXRzIHRyaWdnZXIgYSByZXNwb25zZVxyXG5cdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSxcclxuXHJcblx0XHRcdC8vIEFQSSBCYXNlIFVSTFxyXG5cdFx0XHRiYXNlOiAnaHR0cHM6Ly9ncmFwaC5mYWNlYm9vay5jb20vdjIuNy8nLFxyXG5cclxuXHRcdFx0Ly8gTWFwIEdFVCByZXF1ZXN0c1xyXG5cdFx0XHRnZXQ6IHtcclxuXHRcdFx0XHRtZTogJ21lP2ZpZWxkcz1lbWFpbCxmaXJzdF9uYW1lLGxhc3RfbmFtZSxuYW1lLHRpbWV6b25lLHZlcmlmaWVkJyxcclxuXHRcdFx0XHQnbWUvZnJpZW5kcyc6ICdtZS9mcmllbmRzJyxcclxuXHRcdFx0XHQnbWUvZm9sbG93aW5nJzogJ21lL2ZyaWVuZHMnLFxyXG5cdFx0XHRcdCdtZS9mb2xsb3dlcnMnOiAnbWUvZnJpZW5kcycsXHJcblx0XHRcdFx0J21lL3NoYXJlJzogJ21lL2ZlZWQnLFxyXG5cdFx0XHRcdCdtZS9saWtlJzogJ21lL2xpa2VzJyxcclxuXHRcdFx0XHQnbWUvZmlsZXMnOiAnbWUvYWxidW1zJyxcclxuXHRcdFx0XHQnbWUvYWxidW1zJzogJ21lL2FsYnVtcz9maWVsZHM9Y292ZXJfcGhvdG8sbmFtZScsXHJcblx0XHRcdFx0J21lL2FsYnVtJzogJ0B7aWR9L3Bob3Rvcz9maWVsZHM9cGljdHVyZScsXHJcblx0XHRcdFx0J21lL3Bob3Rvcyc6ICdtZS9waG90b3MnLFxyXG5cdFx0XHRcdCdtZS9waG90byc6ICdAe2lkfScsXHJcblx0XHRcdFx0J2ZyaWVuZC9hbGJ1bXMnOiAnQHtpZH0vYWxidW1zJyxcclxuXHRcdFx0XHQnZnJpZW5kL3Bob3Rvcyc6ICdAe2lkfS9waG90b3MnXHJcblxyXG5cdFx0XHRcdC8vIFBhZ2luYXRpb25cclxuXHRcdFx0XHQvLyBIdHRwczovL2RldmVsb3BlcnMuZmFjZWJvb2suY29tL2RvY3MvcmVmZXJlbmNlL2FwaS9wYWdpbmF0aW9uL1xyXG5cdFx0XHR9LFxyXG5cclxuXHRcdFx0Ly8gTWFwIFBPU1QgcmVxdWVzdHNcclxuXHRcdFx0cG9zdDoge1xyXG5cdFx0XHRcdCdtZS9zaGFyZSc6ICdtZS9mZWVkJyxcclxuXHRcdFx0XHQnbWUvcGhvdG8nOiAnQHtpZH0nXHJcblxyXG5cdFx0XHRcdC8vIEh0dHBzOi8vZGV2ZWxvcGVycy5mYWNlYm9vay5jb20vZG9jcy9ncmFwaC1hcGkvcmVmZXJlbmNlL3YyLjIvb2JqZWN0L2xpa2VzL1xyXG5cdFx0XHR9LFxyXG5cclxuXHRcdFx0d3JhcDoge1xyXG5cdFx0XHRcdG1lOiBmb3JtYXRVc2VyLFxyXG5cdFx0XHRcdCdtZS9mcmllbmRzJzogZm9ybWF0RnJpZW5kcyxcclxuXHRcdFx0XHQnbWUvZm9sbG93aW5nJzogZm9ybWF0RnJpZW5kcyxcclxuXHRcdFx0XHQnbWUvZm9sbG93ZXJzJzogZm9ybWF0RnJpZW5kcyxcclxuXHRcdFx0XHQnbWUvYWxidW1zJzogZm9ybWF0LFxyXG5cdFx0XHRcdCdtZS9waG90b3MnOiBmb3JtYXQsXHJcblx0XHRcdFx0J21lL2ZpbGVzJzogZm9ybWF0LFxyXG5cdFx0XHRcdCdkZWZhdWx0JzogZm9ybWF0XHJcblx0XHRcdH0sXHJcblxyXG5cdFx0XHQvLyBTcGVjaWFsIHJlcXVpcmVtZW50cyBmb3IgaGFuZGxpbmcgWEhSXHJcblx0XHRcdHhocjogZnVuY3Rpb24ocCwgcXMpIHtcclxuXHRcdFx0XHRpZiAocC5tZXRob2QgPT09ICdnZXQnIHx8IHAubWV0aG9kID09PSAncG9zdCcpIHtcclxuXHRcdFx0XHRcdHFzLnN1cHByZXNzX3Jlc3BvbnNlX2NvZGVzID0gdHJ1ZTtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdC8vIElzIHRoaXMgYSBwb3N0IHdpdGggYSBkYXRhLXVyaT9cclxuXHRcdFx0XHRpZiAocC5tZXRob2QgPT09ICdwb3N0JyAmJiBwLmRhdGEgJiYgdHlwZW9mIChwLmRhdGEuZmlsZSkgPT09ICdzdHJpbmcnKSB7XHJcblx0XHRcdFx0XHQvLyBDb252ZXJ0IHRoZSBEYXRhLVVSSSB0byBhIEJsb2JcclxuXHRcdFx0XHRcdHAuZGF0YS5maWxlID0gaGVsbG8udXRpbHMudG9CbG9iKHAuZGF0YS5maWxlKTtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdHJldHVybiB0cnVlO1xyXG5cdFx0XHR9LFxyXG5cclxuXHRcdFx0Ly8gU3BlY2lhbCByZXF1aXJlbWVudHMgZm9yIGhhbmRsaW5nIEpTT05QIGZhbGxiYWNrXHJcblx0XHRcdGpzb25wOiBmdW5jdGlvbihwLCBxcykge1xyXG5cdFx0XHRcdHZhciBtID0gcC5tZXRob2Q7XHJcblx0XHRcdFx0aWYgKG0gIT09ICdnZXQnICYmICFoZWxsby51dGlscy5oYXNCaW5hcnkocC5kYXRhKSkge1xyXG5cdFx0XHRcdFx0cC5kYXRhLm1ldGhvZCA9IG07XHJcblx0XHRcdFx0XHRwLm1ldGhvZCA9ICdnZXQnO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRlbHNlIGlmIChwLm1ldGhvZCA9PT0gJ2RlbGV0ZScpIHtcclxuXHRcdFx0XHRcdHFzLm1ldGhvZCA9ICdkZWxldGUnO1xyXG5cdFx0XHRcdFx0cC5tZXRob2QgPSAncG9zdCc7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9LFxyXG5cclxuXHRcdFx0Ly8gU3BlY2lhbCByZXF1aXJlbWVudHMgZm9yIGlmcmFtZSBmb3JtIGhhY2tcclxuXHRcdFx0Zm9ybTogZnVuY3Rpb24ocCkge1xyXG5cdFx0XHRcdHJldHVybiB7XHJcblx0XHRcdFx0XHQvLyBGaXJlIHRoZSBjYWxsYmFjayBvbmxvYWRcclxuXHRcdFx0XHRcdGNhbGxiYWNrb25sb2FkOiB0cnVlXHJcblx0XHRcdFx0fTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH0pO1xyXG5cclxuXHR2YXIgYmFzZSA9ICdodHRwczovL2dyYXBoLmZhY2Vib29rLmNvbS8nO1xyXG5cclxuXHRmdW5jdGlvbiBmb3JtYXRVc2VyKG8pIHtcclxuXHRcdGlmIChvLmlkKSB7XHJcblx0XHRcdG8udGh1bWJuYWlsID0gby5waWN0dXJlID0gJ2h0dHBzOi8vZ3JhcGguZmFjZWJvb2suY29tLycgKyBvLmlkICsgJy9waWN0dXJlJztcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gbztcclxuXHR9XHJcblxyXG5cdGZ1bmN0aW9uIGZvcm1hdEZyaWVuZHMobykge1xyXG5cdFx0aWYgKCdkYXRhJyBpbiBvKSB7XHJcblx0XHRcdG8uZGF0YS5mb3JFYWNoKGZvcm1hdFVzZXIpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBvO1xyXG5cdH1cclxuXHJcblx0ZnVuY3Rpb24gZm9ybWF0KG8sIGhlYWRlcnMsIHJlcSkge1xyXG5cdFx0aWYgKHR5cGVvZiBvID09PSAnYm9vbGVhbicpIHtcclxuXHRcdFx0byA9IHtzdWNjZXNzOiBvfTtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAobyAmJiAnZGF0YScgaW4gbykge1xyXG5cdFx0XHR2YXIgdG9rZW4gPSByZXEucXVlcnkuYWNjZXNzX3Rva2VuO1xyXG5cclxuXHRcdFx0aWYgKCEoby5kYXRhIGluc3RhbmNlb2YgQXJyYXkpKSB7XHJcblx0XHRcdFx0dmFyIGRhdGEgPSBvLmRhdGE7XHJcblx0XHRcdFx0ZGVsZXRlIG8uZGF0YTtcclxuXHRcdFx0XHRvLmRhdGEgPSBbZGF0YV07XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdG8uZGF0YS5mb3JFYWNoKGZ1bmN0aW9uKGQpIHtcclxuXHJcblx0XHRcdFx0aWYgKGQucGljdHVyZSkge1xyXG5cdFx0XHRcdFx0ZC50aHVtYm5haWwgPSBkLnBpY3R1cmU7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRkLnBpY3R1cmVzID0gKGQuaW1hZ2VzIHx8IFtdKVxyXG5cdFx0XHRcdFx0LnNvcnQoZnVuY3Rpb24oYSwgYikge1xyXG5cdFx0XHRcdFx0XHRyZXR1cm4gYS53aWR0aCAtIGIud2lkdGg7XHJcblx0XHRcdFx0XHR9KTtcclxuXHJcblx0XHRcdFx0aWYgKGQuY292ZXJfcGhvdG8gJiYgZC5jb3Zlcl9waG90by5pZCkge1xyXG5cdFx0XHRcdFx0ZC50aHVtYm5haWwgPSBiYXNlICsgZC5jb3Zlcl9waG90by5pZCArICcvcGljdHVyZT9hY2Nlc3NfdG9rZW49JyArIHRva2VuO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0aWYgKGQudHlwZSA9PT0gJ2FsYnVtJykge1xyXG5cdFx0XHRcdFx0ZC5maWxlcyA9IGQucGhvdG9zID0gYmFzZSArIGQuaWQgKyAnL3Bob3Rvcyc7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRpZiAoZC5jYW5fdXBsb2FkKSB7XHJcblx0XHRcdFx0XHRkLnVwbG9hZF9sb2NhdGlvbiA9IGJhc2UgKyBkLmlkICsgJy9waG90b3MnO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSk7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIG87XHJcblx0fVxyXG5cclxufSkoaGVsbG8pO1xyXG5cclxuKGZ1bmN0aW9uKGhlbGxvKSB7XHJcblxyXG5cdGhlbGxvLmluaXQoe1xyXG5cclxuXHRcdGZsaWNrcjoge1xyXG5cclxuXHRcdFx0bmFtZTogJ0ZsaWNrcicsXHJcblxyXG5cdFx0XHQvLyBFbnN1cmUgdGhhdCB5b3UgZGVmaW5lIGFuIG9hdXRoX3Byb3h5XHJcblx0XHRcdG9hdXRoOiB7XHJcblx0XHRcdFx0dmVyc2lvbjogJzEuMGEnLFxyXG5cdFx0XHRcdGF1dGg6ICdodHRwczovL3d3dy5mbGlja3IuY29tL3NlcnZpY2VzL29hdXRoL2F1dGhvcml6ZT9wZXJtcz1yZWFkJyxcclxuXHRcdFx0XHRyZXF1ZXN0OiAnaHR0cHM6Ly93d3cuZmxpY2tyLmNvbS9zZXJ2aWNlcy9vYXV0aC9yZXF1ZXN0X3Rva2VuJyxcclxuXHRcdFx0XHR0b2tlbjogJ2h0dHBzOi8vd3d3LmZsaWNrci5jb20vc2VydmljZXMvb2F1dGgvYWNjZXNzX3Rva2VuJ1xyXG5cdFx0XHR9LFxyXG5cclxuXHRcdFx0Ly8gQVBJIGJhc2UgVVJMXHJcblx0XHRcdGJhc2U6ICdodHRwczovL2FwaS5mbGlja3IuY29tL3NlcnZpY2VzL3Jlc3QnLFxyXG5cclxuXHRcdFx0Ly8gTWFwIEdFVCByZXNxdWVzdHNcclxuXHRcdFx0Z2V0OiB7XHJcblx0XHRcdFx0bWU6IHNpZ24oJ2ZsaWNrci5wZW9wbGUuZ2V0SW5mbycpLFxyXG5cdFx0XHRcdCdtZS9mcmllbmRzJzogc2lnbignZmxpY2tyLmNvbnRhY3RzLmdldExpc3QnLCB7cGVyX3BhZ2U6J0B7bGltaXR8NTB9J30pLFxyXG5cdFx0XHRcdCdtZS9mb2xsb3dpbmcnOiBzaWduKCdmbGlja3IuY29udGFjdHMuZ2V0TGlzdCcsIHtwZXJfcGFnZTonQHtsaW1pdHw1MH0nfSksXHJcblx0XHRcdFx0J21lL2ZvbGxvd2Vycyc6IHNpZ24oJ2ZsaWNrci5jb250YWN0cy5nZXRMaXN0Jywge3Blcl9wYWdlOidAe2xpbWl0fDUwfSd9KSxcclxuXHRcdFx0XHQnbWUvYWxidW1zJzogc2lnbignZmxpY2tyLnBob3Rvc2V0cy5nZXRMaXN0Jywge3Blcl9wYWdlOidAe2xpbWl0fDUwfSd9KSxcclxuXHRcdFx0XHQnbWUvYWxidW0nOiBzaWduKCdmbGlja3IucGhvdG9zZXRzLmdldFBob3RvcycsIHtwaG90b3NldF9pZDogJ0B7aWR9J30pLFxyXG5cdFx0XHRcdCdtZS9waG90b3MnOiBzaWduKCdmbGlja3IucGVvcGxlLmdldFBob3RvcycsIHtwZXJfcGFnZTonQHtsaW1pdHw1MH0nfSlcclxuXHRcdFx0fSxcclxuXHJcblx0XHRcdHdyYXA6IHtcclxuXHRcdFx0XHRtZTogZnVuY3Rpb24obykge1xyXG5cdFx0XHRcdFx0Zm9ybWF0RXJyb3Iobyk7XHJcblx0XHRcdFx0XHRvID0gY2hlY2tSZXNwb25zZShvLCAncGVyc29uJyk7XHJcblx0XHRcdFx0XHRpZiAoby5pZCkge1xyXG5cdFx0XHRcdFx0XHRpZiAoby5yZWFsbmFtZSkge1xyXG5cdFx0XHRcdFx0XHRcdG8ubmFtZSA9IG8ucmVhbG5hbWUuX2NvbnRlbnQ7XHJcblx0XHRcdFx0XHRcdFx0dmFyIG0gPSBvLm5hbWUuc3BsaXQoJyAnKTtcclxuXHRcdFx0XHRcdFx0XHRvLmZpcnN0X25hbWUgPSBtLnNoaWZ0KCk7XHJcblx0XHRcdFx0XHRcdFx0by5sYXN0X25hbWUgPSBtLmpvaW4oJyAnKTtcclxuXHRcdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdFx0by50aHVtYm5haWwgPSBnZXRCdWRkeUljb24obywgJ2wnKTtcclxuXHRcdFx0XHRcdFx0by5waWN0dXJlID0gZ2V0QnVkZHlJY29uKG8sICdsJyk7XHJcblx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0cmV0dXJuIG87XHJcblx0XHRcdFx0fSxcclxuXHJcblx0XHRcdFx0J21lL2ZyaWVuZHMnOiBmb3JtYXRGcmllbmRzLFxyXG5cdFx0XHRcdCdtZS9mb2xsb3dlcnMnOiBmb3JtYXRGcmllbmRzLFxyXG5cdFx0XHRcdCdtZS9mb2xsb3dpbmcnOiBmb3JtYXRGcmllbmRzLFxyXG5cdFx0XHRcdCdtZS9hbGJ1bXMnOiBmdW5jdGlvbihvKSB7XHJcblx0XHRcdFx0XHRmb3JtYXRFcnJvcihvKTtcclxuXHRcdFx0XHRcdG8gPSBjaGVja1Jlc3BvbnNlKG8sICdwaG90b3NldHMnKTtcclxuXHRcdFx0XHRcdHBhZ2luZyhvKTtcclxuXHRcdFx0XHRcdGlmIChvLnBob3Rvc2V0KSB7XHJcblx0XHRcdFx0XHRcdG8uZGF0YSA9IG8ucGhvdG9zZXQ7XHJcblx0XHRcdFx0XHRcdG8uZGF0YS5mb3JFYWNoKGZ1bmN0aW9uKGl0ZW0pIHtcclxuXHRcdFx0XHRcdFx0XHRpdGVtLm5hbWUgPSBpdGVtLnRpdGxlLl9jb250ZW50O1xyXG5cdFx0XHRcdFx0XHRcdGl0ZW0ucGhvdG9zID0gJ2h0dHBzOi8vYXBpLmZsaWNrci5jb20vc2VydmljZXMvcmVzdCcgKyBnZXRBcGlVcmwoJ2ZsaWNrci5waG90b3NldHMuZ2V0UGhvdG9zJywge3Bob3Rvc2V0X2lkOiBpdGVtLmlkfSwgdHJ1ZSk7XHJcblx0XHRcdFx0XHRcdH0pO1xyXG5cclxuXHRcdFx0XHRcdFx0ZGVsZXRlIG8ucGhvdG9zZXQ7XHJcblx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0cmV0dXJuIG87XHJcblx0XHRcdFx0fSxcclxuXHJcblx0XHRcdFx0J21lL3Bob3Rvcyc6IGZ1bmN0aW9uKG8pIHtcclxuXHRcdFx0XHRcdGZvcm1hdEVycm9yKG8pO1xyXG5cdFx0XHRcdFx0cmV0dXJuIGZvcm1hdFBob3RvcyhvKTtcclxuXHRcdFx0XHR9LFxyXG5cclxuXHRcdFx0XHQnZGVmYXVsdCc6IGZ1bmN0aW9uKG8pIHtcclxuXHRcdFx0XHRcdGZvcm1hdEVycm9yKG8pO1xyXG5cdFx0XHRcdFx0cmV0dXJuIGZvcm1hdFBob3RvcyhvKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0sXHJcblxyXG5cdFx0XHR4aHI6IGZhbHNlLFxyXG5cclxuXHRcdFx0anNvbnA6IGZ1bmN0aW9uKHAsIHFzKSB7XHJcblx0XHRcdFx0aWYgKHAubWV0aG9kID09ICdnZXQnKSB7XHJcblx0XHRcdFx0XHRkZWxldGUgcXMuY2FsbGJhY2s7XHJcblx0XHRcdFx0XHRxcy5qc29uY2FsbGJhY2sgPSBwLmNhbGxiYWNrSUQ7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fSk7XHJcblxyXG5cdGZ1bmN0aW9uIGdldEFwaVVybChtZXRob2QsIGV4dHJhUGFyYW1zLCBza2lwTmV0d29yaykge1xyXG5cdFx0dmFyIHVybCA9ICgoc2tpcE5ldHdvcmspID8gJycgOiAnZmxpY2tyOicpICtcclxuXHRcdFx0Jz9tZXRob2Q9JyArIG1ldGhvZCArXHJcblx0XHRcdCcmYXBpX2tleT0nICsgaGVsbG8uc2VydmljZXMuZmxpY2tyLmlkICtcclxuXHRcdFx0JyZmb3JtYXQ9anNvbic7XHJcblx0XHRmb3IgKHZhciBwYXJhbSBpbiBleHRyYVBhcmFtcykge1xyXG5cdFx0XHRpZiAoZXh0cmFQYXJhbXMuaGFzT3duUHJvcGVydHkocGFyYW0pKSB7XHJcblx0XHRcdFx0dXJsICs9ICcmJyArIHBhcmFtICsgJz0nICsgZXh0cmFQYXJhbXNbcGFyYW1dO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIHVybDtcclxuXHR9XHJcblxyXG5cdC8vIFRoaXMgaXMgbm90IGV4YWN0bHkgbmVhdCBidXQgYXZvaWQgdG8gY2FsbFxyXG5cdC8vIFRoZSBtZXRob2QgJ2ZsaWNrci50ZXN0LmxvZ2luJyBmb3IgZWFjaCBhcGkgY2FsbFxyXG5cclxuXHRmdW5jdGlvbiB3aXRoVXNlcihjYikge1xyXG5cdFx0dmFyIGF1dGggPSBoZWxsby5nZXRBdXRoUmVzcG9uc2UoJ2ZsaWNrcicpO1xyXG5cdFx0Y2IoYXV0aCAmJiBhdXRoLnVzZXJfbnNpZCA/IGF1dGgudXNlcl9uc2lkIDogbnVsbCk7XHJcblx0fVxyXG5cclxuXHRmdW5jdGlvbiBzaWduKHVybCwgcGFyYW1zKSB7XHJcblx0XHRpZiAoIXBhcmFtcykge1xyXG5cdFx0XHRwYXJhbXMgPSB7fTtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gZnVuY3Rpb24ocCwgY2FsbGJhY2spIHtcclxuXHRcdFx0d2l0aFVzZXIoZnVuY3Rpb24odXNlcklkKSB7XHJcblx0XHRcdFx0cGFyYW1zLnVzZXJfaWQgPSB1c2VySWQ7XHJcblx0XHRcdFx0Y2FsbGJhY2soZ2V0QXBpVXJsKHVybCwgcGFyYW1zLCB0cnVlKSk7XHJcblx0XHRcdH0pO1xyXG5cdFx0fTtcclxuXHR9XHJcblxyXG5cdGZ1bmN0aW9uIGdldEJ1ZGR5SWNvbihwcm9maWxlLCBzaXplKSB7XHJcblx0XHR2YXIgdXJsID0gJ2h0dHBzOi8vd3d3LmZsaWNrci5jb20vaW1hZ2VzL2J1ZGR5aWNvbi5naWYnO1xyXG5cdFx0aWYgKHByb2ZpbGUubnNpZCAmJiBwcm9maWxlLmljb25zZXJ2ZXIgJiYgcHJvZmlsZS5pY29uZmFybSkge1xyXG5cdFx0XHR1cmwgPSAnaHR0cHM6Ly9mYXJtJyArIHByb2ZpbGUuaWNvbmZhcm0gKyAnLnN0YXRpY2ZsaWNrci5jb20vJyArXHJcblx0XHRcdFx0cHJvZmlsZS5pY29uc2VydmVyICsgJy8nICtcclxuXHRcdFx0XHQnYnVkZHlpY29ucy8nICsgcHJvZmlsZS5uc2lkICtcclxuXHRcdFx0XHQoKHNpemUpID8gJ18nICsgc2l6ZSA6ICcnKSArICcuanBnJztcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gdXJsO1xyXG5cdH1cclxuXHJcblx0Ly8gU2VlOiBodHRwczovL3d3dy5mbGlja3IuY29tL3NlcnZpY2VzL2FwaS9taXNjLnVybHMuaHRtbFxyXG5cdGZ1bmN0aW9uIGNyZWF0ZVBob3RvVXJsKGlkLCBmYXJtLCBzZXJ2ZXIsIHNlY3JldCwgc2l6ZSkge1xyXG5cdFx0c2l6ZSA9IChzaXplKSA/ICdfJyArIHNpemUgOiAnJztcclxuXHRcdHJldHVybiAnaHR0cHM6Ly9mYXJtJyArIGZhcm0gKyAnLnN0YXRpY2ZsaWNrci5jb20vJyArIHNlcnZlciArICcvJyArIGlkICsgJ18nICsgc2VjcmV0ICsgc2l6ZSArICcuanBnJztcclxuXHR9XHJcblxyXG5cdGZ1bmN0aW9uIGZvcm1hdFVzZXIobykge1xyXG5cdH1cclxuXHJcblx0ZnVuY3Rpb24gZm9ybWF0RXJyb3Iobykge1xyXG5cdFx0aWYgKG8gJiYgby5zdGF0ICYmIG8uc3RhdC50b0xvd2VyQ2FzZSgpICE9ICdvaycpIHtcclxuXHRcdFx0by5lcnJvciA9IHtcclxuXHRcdFx0XHRjb2RlOiAnaW52YWxpZF9yZXF1ZXN0JyxcclxuXHRcdFx0XHRtZXNzYWdlOiBvLm1lc3NhZ2VcclxuXHRcdFx0fTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGZ1bmN0aW9uIGZvcm1hdFBob3RvcyhvKSB7XHJcblx0XHRpZiAoby5waG90b3NldCB8fCBvLnBob3Rvcykge1xyXG5cdFx0XHR2YXIgc2V0ID0gKCdwaG90b3NldCcgaW4gbykgPyAncGhvdG9zZXQnIDogJ3Bob3Rvcyc7XHJcblx0XHRcdG8gPSBjaGVja1Jlc3BvbnNlKG8sIHNldCk7XHJcblx0XHRcdHBhZ2luZyhvKTtcclxuXHRcdFx0by5kYXRhID0gby5waG90bztcclxuXHRcdFx0ZGVsZXRlIG8ucGhvdG87XHJcblx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgby5kYXRhLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdFx0dmFyIHBob3RvID0gby5kYXRhW2ldO1xyXG5cdFx0XHRcdHBob3RvLm5hbWUgPSBwaG90by50aXRsZTtcclxuXHRcdFx0XHRwaG90by5waWN0dXJlID0gY3JlYXRlUGhvdG9VcmwocGhvdG8uaWQsIHBob3RvLmZhcm0sIHBob3RvLnNlcnZlciwgcGhvdG8uc2VjcmV0LCAnJyk7XHJcblx0XHRcdFx0cGhvdG8ucGljdHVyZXMgPSBjcmVhdGVQaWN0dXJlcyhwaG90by5pZCwgcGhvdG8uZmFybSwgcGhvdG8uc2VydmVyLCBwaG90by5zZWNyZXQpO1xyXG5cdFx0XHRcdHBob3RvLnNvdXJjZSA9IGNyZWF0ZVBob3RvVXJsKHBob3RvLmlkLCBwaG90by5mYXJtLCBwaG90by5zZXJ2ZXIsIHBob3RvLnNlY3JldCwgJ2InKTtcclxuXHRcdFx0XHRwaG90by50aHVtYm5haWwgPSBjcmVhdGVQaG90b1VybChwaG90by5pZCwgcGhvdG8uZmFybSwgcGhvdG8uc2VydmVyLCBwaG90by5zZWNyZXQsICdtJyk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gbztcclxuXHR9XHJcblxyXG5cdC8vIFNlZTogaHR0cHM6Ly93d3cuZmxpY2tyLmNvbS9zZXJ2aWNlcy9hcGkvbWlzYy51cmxzLmh0bWxcclxuXHRmdW5jdGlvbiBjcmVhdGVQaWN0dXJlcyhpZCwgZmFybSwgc2VydmVyLCBzZWNyZXQpIHtcclxuXHJcblx0XHR2YXIgTk9fTElNSVQgPSAyMDQ4O1xyXG5cdFx0dmFyIHNpemVzID0gW1xyXG5cdFx0XHR7aWQ6ICd0JywgbWF4OiAxMDB9LFxyXG5cdFx0XHR7aWQ6ICdtJywgbWF4OiAyNDB9LFxyXG5cdFx0XHR7aWQ6ICduJywgbWF4OiAzMjB9LFxyXG5cdFx0XHR7aWQ6ICcnLCBtYXg6IDUwMH0sXHJcblx0XHRcdHtpZDogJ3onLCBtYXg6IDY0MH0sXHJcblx0XHRcdHtpZDogJ2MnLCBtYXg6IDgwMH0sXHJcblx0XHRcdHtpZDogJ2InLCBtYXg6IDEwMjR9LFxyXG5cdFx0XHR7aWQ6ICdoJywgbWF4OiAxNjAwfSxcclxuXHRcdFx0e2lkOiAnaycsIG1heDogMjA0OH0sXHJcblx0XHRcdHtpZDogJ28nLCBtYXg6IE5PX0xJTUlUfVxyXG5cdFx0XTtcclxuXHJcblx0XHRyZXR1cm4gc2l6ZXMubWFwKGZ1bmN0aW9uKHNpemUpIHtcclxuXHRcdFx0cmV0dXJuIHtcclxuXHRcdFx0XHRzb3VyY2U6IGNyZWF0ZVBob3RvVXJsKGlkLCBmYXJtLCBzZXJ2ZXIsIHNlY3JldCwgc2l6ZS5pZCksXHJcblxyXG5cdFx0XHRcdC8vIE5vdGU6IHRoaXMgaXMgYSBndWVzcyB0aGF0J3MgYWxtb3N0IGNlcnRhaW4gdG8gYmUgd3JvbmcgKHVubGVzcyBzcXVhcmUgc291cmNlKVxyXG5cdFx0XHRcdHdpZHRoOiBzaXplLm1heCxcclxuXHRcdFx0XHRoZWlnaHQ6IHNpemUubWF4XHJcblx0XHRcdH07XHJcblx0XHR9KTtcclxuXHR9XHJcblxyXG5cdGZ1bmN0aW9uIGNoZWNrUmVzcG9uc2Uobywga2V5KSB7XHJcblxyXG5cdFx0aWYgKGtleSBpbiBvKSB7XHJcblx0XHRcdG8gPSBvW2tleV07XHJcblx0XHR9XHJcblx0XHRlbHNlIGlmICghKCdlcnJvcicgaW4gbykpIHtcclxuXHRcdFx0by5lcnJvciA9IHtcclxuXHRcdFx0XHRjb2RlOiAnaW52YWxpZF9yZXF1ZXN0JyxcclxuXHRcdFx0XHRtZXNzYWdlOiBvLm1lc3NhZ2UgfHwgJ0ZhaWxlZCB0byBnZXQgZGF0YSBmcm9tIEZsaWNrcidcclxuXHRcdFx0fTtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gbztcclxuXHR9XHJcblxyXG5cdGZ1bmN0aW9uIGZvcm1hdEZyaWVuZHMobykge1xyXG5cdFx0Zm9ybWF0RXJyb3Iobyk7XHJcblx0XHRpZiAoby5jb250YWN0cykge1xyXG5cdFx0XHRvID0gY2hlY2tSZXNwb25zZShvLCAnY29udGFjdHMnKTtcclxuXHRcdFx0cGFnaW5nKG8pO1xyXG5cdFx0XHRvLmRhdGEgPSBvLmNvbnRhY3Q7XHJcblx0XHRcdGRlbGV0ZSBvLmNvbnRhY3Q7XHJcblx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgby5kYXRhLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdFx0dmFyIGl0ZW0gPSBvLmRhdGFbaV07XHJcblx0XHRcdFx0aXRlbS5pZCA9IGl0ZW0ubnNpZDtcclxuXHRcdFx0XHRpdGVtLm5hbWUgPSBpdGVtLnJlYWxuYW1lIHx8IGl0ZW0udXNlcm5hbWU7XHJcblx0XHRcdFx0aXRlbS50aHVtYm5haWwgPSBnZXRCdWRkeUljb24oaXRlbSwgJ20nKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBvO1xyXG5cdH1cclxuXHJcblx0ZnVuY3Rpb24gcGFnaW5nKHJlcykge1xyXG5cdFx0aWYgKHJlcy5wYWdlICYmIHJlcy5wYWdlcyAmJiByZXMucGFnZSAhPT0gcmVzLnBhZ2VzKSB7XHJcblx0XHRcdHJlcy5wYWdpbmcgPSB7XHJcblx0XHRcdFx0bmV4dDogJz9wYWdlPScgKyAoKytyZXMucGFnZSlcclxuXHRcdFx0fTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG59KShoZWxsbyk7XHJcblxyXG4oZnVuY3Rpb24oaGVsbG8pIHtcclxuXHJcblx0aGVsbG8uaW5pdCh7XHJcblxyXG5cdFx0Zm91cnNxdWFyZToge1xyXG5cclxuXHRcdFx0bmFtZTogJ0ZvdXJzcXVhcmUnLFxyXG5cclxuXHRcdFx0b2F1dGg6IHtcclxuXHRcdFx0XHQvLyBTZWU6IGh0dHBzOi8vZGV2ZWxvcGVyLmZvdXJzcXVhcmUuY29tL292ZXJ2aWV3L2F1dGhcclxuXHRcdFx0XHR2ZXJzaW9uOiAyLFxyXG5cdFx0XHRcdGF1dGg6ICdodHRwczovL2ZvdXJzcXVhcmUuY29tL29hdXRoMi9hdXRoZW50aWNhdGUnLFxyXG5cdFx0XHRcdGdyYW50OiAnaHR0cHM6Ly9mb3Vyc3F1YXJlLmNvbS9vYXV0aDIvYWNjZXNzX3Rva2VuJ1xyXG5cdFx0XHR9LFxyXG5cclxuXHRcdFx0Ly8gUmVmcmVzaCB0aGUgYWNjZXNzX3Rva2VuIG9uY2UgZXhwaXJlZFxyXG5cdFx0XHRyZWZyZXNoOiB0cnVlLFxyXG5cclxuXHRcdFx0YmFzZTogJ2h0dHBzOi8vYXBpLmZvdXJzcXVhcmUuY29tL3YyLycsXHJcblxyXG5cdFx0XHRnZXQ6IHtcclxuXHRcdFx0XHRtZTogJ3VzZXJzL3NlbGYnLFxyXG5cdFx0XHRcdCdtZS9mcmllbmRzJzogJ3VzZXJzL3NlbGYvZnJpZW5kcycsXHJcblx0XHRcdFx0J21lL2ZvbGxvd2Vycyc6ICd1c2Vycy9zZWxmL2ZyaWVuZHMnLFxyXG5cdFx0XHRcdCdtZS9mb2xsb3dpbmcnOiAndXNlcnMvc2VsZi9mcmllbmRzJ1xyXG5cdFx0XHR9LFxyXG5cclxuXHRcdFx0d3JhcDoge1xyXG5cdFx0XHRcdG1lOiBmdW5jdGlvbihvKSB7XHJcblx0XHRcdFx0XHRmb3JtYXRFcnJvcihvKTtcclxuXHRcdFx0XHRcdGlmIChvICYmIG8ucmVzcG9uc2UpIHtcclxuXHRcdFx0XHRcdFx0byA9IG8ucmVzcG9uc2UudXNlcjtcclxuXHRcdFx0XHRcdFx0Zm9ybWF0VXNlcihvKTtcclxuXHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHRyZXR1cm4gbztcclxuXHRcdFx0XHR9LFxyXG5cclxuXHRcdFx0XHQnZGVmYXVsdCc6IGZ1bmN0aW9uKG8pIHtcclxuXHRcdFx0XHRcdGZvcm1hdEVycm9yKG8pO1xyXG5cclxuXHRcdFx0XHRcdC8vIEZvcm1hdCBmcmllbmRzXHJcblx0XHRcdFx0XHRpZiAobyAmJiAncmVzcG9uc2UnIGluIG8gJiYgJ2ZyaWVuZHMnIGluIG8ucmVzcG9uc2UgJiYgJ2l0ZW1zJyBpbiBvLnJlc3BvbnNlLmZyaWVuZHMpIHtcclxuXHRcdFx0XHRcdFx0by5kYXRhID0gby5yZXNwb25zZS5mcmllbmRzLml0ZW1zO1xyXG5cdFx0XHRcdFx0XHRvLmRhdGEuZm9yRWFjaChmb3JtYXRVc2VyKTtcclxuXHRcdFx0XHRcdFx0ZGVsZXRlIG8ucmVzcG9uc2U7XHJcblx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0cmV0dXJuIG87XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9LFxyXG5cclxuXHRcdFx0eGhyOiBmb3JtYXRSZXF1ZXN0LFxyXG5cdFx0XHRqc29ucDogZm9ybWF0UmVxdWVzdFxyXG5cdFx0fVxyXG5cdH0pO1xyXG5cclxuXHRmdW5jdGlvbiBmb3JtYXRFcnJvcihvKSB7XHJcblx0XHRpZiAoby5tZXRhICYmIChvLm1ldGEuY29kZSA9PT0gNDAwIHx8IG8ubWV0YS5jb2RlID09PSA0MDEpKSB7XHJcblx0XHRcdG8uZXJyb3IgPSB7XHJcblx0XHRcdFx0Y29kZTogJ2FjY2Vzc19kZW5pZWQnLFxyXG5cdFx0XHRcdG1lc3NhZ2U6IG8ubWV0YS5lcnJvckRldGFpbFxyXG5cdFx0XHR9O1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0ZnVuY3Rpb24gZm9ybWF0VXNlcihvKSB7XHJcblx0XHRpZiAobyAmJiBvLmlkKSB7XHJcblx0XHRcdG8udGh1bWJuYWlsID0gby5waG90by5wcmVmaXggKyAnMTAweDEwMCcgKyBvLnBob3RvLnN1ZmZpeDtcclxuXHRcdFx0by5uYW1lID0gby5maXJzdE5hbWUgKyAnICcgKyBvLmxhc3ROYW1lO1xyXG5cdFx0XHRvLmZpcnN0X25hbWUgPSBvLmZpcnN0TmFtZTtcclxuXHRcdFx0by5sYXN0X25hbWUgPSBvLmxhc3ROYW1lO1xyXG5cdFx0XHRpZiAoby5jb250YWN0KSB7XHJcblx0XHRcdFx0aWYgKG8uY29udGFjdC5lbWFpbCkge1xyXG5cdFx0XHRcdFx0by5lbWFpbCA9IG8uY29udGFjdC5lbWFpbDtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGZ1bmN0aW9uIGZvcm1hdFJlcXVlc3QocCwgcXMpIHtcclxuXHRcdHZhciB0b2tlbiA9IHFzLmFjY2Vzc190b2tlbjtcclxuXHRcdGRlbGV0ZSBxcy5hY2Nlc3NfdG9rZW47XHJcblx0XHRxcy5vYXV0aF90b2tlbiA9IHRva2VuO1xyXG5cdFx0cXMudiA9IDIwMTIxMTI1O1xyXG5cdFx0cmV0dXJuIHRydWU7XHJcblx0fVxyXG5cclxufSkoaGVsbG8pO1xyXG5cclxuKGZ1bmN0aW9uKGhlbGxvKSB7XHJcblxyXG5cdGhlbGxvLmluaXQoe1xyXG5cclxuXHRcdGdpdGh1Yjoge1xyXG5cclxuXHRcdFx0bmFtZTogJ0dpdEh1YicsXHJcblxyXG5cdFx0XHRvYXV0aDoge1xyXG5cdFx0XHRcdHZlcnNpb246IDIsXHJcblx0XHRcdFx0YXV0aDogJ2h0dHBzOi8vZ2l0aHViLmNvbS9sb2dpbi9vYXV0aC9hdXRob3JpemUnLFxyXG5cdFx0XHRcdGdyYW50OiAnaHR0cHM6Ly9naXRodWIuY29tL2xvZ2luL29hdXRoL2FjY2Vzc190b2tlbicsXHJcblx0XHRcdFx0cmVzcG9uc2VfdHlwZTogJ2NvZGUnXHJcblx0XHRcdH0sXHJcblxyXG5cdFx0XHRzY29wZToge1xyXG5cdFx0XHRcdGVtYWlsOiAndXNlcjplbWFpbCdcclxuXHRcdFx0fSxcclxuXHJcblx0XHRcdGJhc2U6ICdodHRwczovL2FwaS5naXRodWIuY29tLycsXHJcblxyXG5cdFx0XHRnZXQ6IHtcclxuXHRcdFx0XHRtZTogJ3VzZXInLFxyXG5cdFx0XHRcdCdtZS9mcmllbmRzJzogJ3VzZXIvZm9sbG93aW5nP3Blcl9wYWdlPUB7bGltaXR8MTAwfScsXHJcblx0XHRcdFx0J21lL2ZvbGxvd2luZyc6ICd1c2VyL2ZvbGxvd2luZz9wZXJfcGFnZT1Ae2xpbWl0fDEwMH0nLFxyXG5cdFx0XHRcdCdtZS9mb2xsb3dlcnMnOiAndXNlci9mb2xsb3dlcnM/cGVyX3BhZ2U9QHtsaW1pdHwxMDB9JyxcclxuXHRcdFx0XHQnbWUvbGlrZSc6ICd1c2VyL3N0YXJyZWQ/cGVyX3BhZ2U9QHtsaW1pdHwxMDB9J1xyXG5cdFx0XHR9LFxyXG5cclxuXHRcdFx0d3JhcDoge1xyXG5cdFx0XHRcdG1lOiBmdW5jdGlvbihvLCBoZWFkZXJzKSB7XHJcblxyXG5cdFx0XHRcdFx0Zm9ybWF0RXJyb3IobywgaGVhZGVycyk7XHJcblx0XHRcdFx0XHRmb3JtYXRVc2VyKG8pO1xyXG5cclxuXHRcdFx0XHRcdHJldHVybiBvO1xyXG5cdFx0XHRcdH0sXHJcblxyXG5cdFx0XHRcdCdkZWZhdWx0JzogZnVuY3Rpb24obywgaGVhZGVycywgcmVxKSB7XHJcblxyXG5cdFx0XHRcdFx0Zm9ybWF0RXJyb3IobywgaGVhZGVycyk7XHJcblxyXG5cdFx0XHRcdFx0aWYgKEFycmF5LmlzQXJyYXkobykpIHtcclxuXHRcdFx0XHRcdFx0byA9IHtkYXRhOm99O1xyXG5cdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdGlmIChvLmRhdGEpIHtcclxuXHRcdFx0XHRcdFx0cGFnaW5nKG8sIGhlYWRlcnMsIHJlcSk7XHJcblx0XHRcdFx0XHRcdG8uZGF0YS5mb3JFYWNoKGZvcm1hdFVzZXIpO1xyXG5cdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdHJldHVybiBvO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSxcclxuXHJcblx0XHRcdHhocjogZnVuY3Rpb24ocCkge1xyXG5cclxuXHRcdFx0XHRpZiAocC5tZXRob2QgIT09ICdnZXQnICYmIHAuZGF0YSkge1xyXG5cclxuXHRcdFx0XHRcdC8vIFNlcmlhbGl6ZSBwYXlsb2FkIGFzIEpTT05cclxuXHRcdFx0XHRcdHAuaGVhZGVycyA9IHAuaGVhZGVycyB8fCB7fTtcclxuXHRcdFx0XHRcdHAuaGVhZGVyc1snQ29udGVudC1UeXBlJ10gPSAnYXBwbGljYXRpb24vanNvbic7XHJcblx0XHRcdFx0XHRpZiAodHlwZW9mIChwLmRhdGEpID09PSAnb2JqZWN0Jykge1xyXG5cdFx0XHRcdFx0XHRwLmRhdGEgPSBKU09OLnN0cmluZ2lmeShwLmRhdGEpO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0cmV0dXJuIHRydWU7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9KTtcclxuXHJcblx0ZnVuY3Rpb24gZm9ybWF0RXJyb3IobywgaGVhZGVycykge1xyXG5cdFx0dmFyIGNvZGUgPSBoZWFkZXJzID8gaGVhZGVycy5zdGF0dXNDb2RlIDogKG8gJiYgJ21ldGEnIGluIG8gJiYgJ3N0YXR1cycgaW4gby5tZXRhICYmIG8ubWV0YS5zdGF0dXMpO1xyXG5cdFx0aWYgKChjb2RlID09PSA0MDEgfHwgY29kZSA9PT0gNDAzKSkge1xyXG5cdFx0XHRvLmVycm9yID0ge1xyXG5cdFx0XHRcdGNvZGU6ICdhY2Nlc3NfZGVuaWVkJyxcclxuXHRcdFx0XHRtZXNzYWdlOiBvLm1lc3NhZ2UgfHwgKG8uZGF0YSA/IG8uZGF0YS5tZXNzYWdlIDogJ0NvdWxkIG5vdCBnZXQgcmVzcG9uc2UnKVxyXG5cdFx0XHR9O1xyXG5cdFx0XHRkZWxldGUgby5tZXNzYWdlO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0ZnVuY3Rpb24gZm9ybWF0VXNlcihvKSB7XHJcblx0XHRpZiAoby5pZCkge1xyXG5cdFx0XHRvLnRodW1ibmFpbCA9IG8ucGljdHVyZSA9IG8uYXZhdGFyX3VybDtcclxuXHRcdFx0by5uYW1lID0gby5sb2dpbjtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGZ1bmN0aW9uIHBhZ2luZyhyZXMsIGhlYWRlcnMsIHJlcSkge1xyXG5cdFx0aWYgKHJlcy5kYXRhICYmIHJlcy5kYXRhLmxlbmd0aCAmJiBoZWFkZXJzICYmIGhlYWRlcnMuTGluaykge1xyXG5cdFx0XHR2YXIgbmV4dCA9IGhlYWRlcnMuTGluay5tYXRjaCgvPCguKj8pPjtcXHMqcmVsPVxcXCJuZXh0XFxcIi8pO1xyXG5cdFx0XHRpZiAobmV4dCkge1xyXG5cdFx0XHRcdHJlcy5wYWdpbmcgPSB7XHJcblx0XHRcdFx0XHRuZXh0OiBuZXh0WzFdXHJcblx0XHRcdFx0fTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH1cclxuXHJcbn0pKGhlbGxvKTtcclxuXHJcbihmdW5jdGlvbihoZWxsbykge1xyXG5cclxuXHR2YXIgY29udGFjdHNVcmwgPSAnaHR0cHM6Ly93d3cuZ29vZ2xlLmNvbS9tOC9mZWVkcy9jb250YWN0cy9kZWZhdWx0L2Z1bGw/dj0zLjAmYWx0PWpzb24mbWF4LXJlc3VsdHM9QHtsaW1pdHwxMDAwfSZzdGFydC1pbmRleD1Ae3N0YXJ0fDF9JztcclxuXHJcblx0aGVsbG8uaW5pdCh7XHJcblxyXG5cdFx0Z29vZ2xlOiB7XHJcblxyXG5cdFx0XHRuYW1lOiAnR29vZ2xlIFBsdXMnLFxyXG5cclxuXHRcdFx0Ly8gU2VlOiBodHRwOi8vY29kZS5nb29nbGUuY29tL2FwaXMvYWNjb3VudHMvZG9jcy9PQXV0aDJVc2VyQWdlbnQuaHRtbFxyXG5cdFx0XHRvYXV0aDoge1xyXG5cdFx0XHRcdHZlcnNpb246IDIsXHJcblx0XHRcdFx0YXV0aDogJ2h0dHBzOi8vYWNjb3VudHMuZ29vZ2xlLmNvbS9vL29hdXRoMi9hdXRoJyxcclxuXHRcdFx0XHRncmFudDogJ2h0dHBzOi8vYWNjb3VudHMuZ29vZ2xlLmNvbS9vL29hdXRoMi90b2tlbidcclxuXHRcdFx0fSxcclxuXHJcblx0XHRcdC8vIEF1dGhvcml6YXRpb24gc2NvcGVzXHJcblx0XHRcdHNjb3BlOiB7XHJcblx0XHRcdFx0YmFzaWM6ICdodHRwczovL3d3dy5nb29nbGVhcGlzLmNvbS9hdXRoL3BsdXMubWUgcHJvZmlsZScsXHJcblx0XHRcdFx0ZW1haWw6ICdlbWFpbCcsXHJcblx0XHRcdFx0YmlydGhkYXk6ICcnLFxyXG5cdFx0XHRcdGV2ZW50czogJycsXHJcblx0XHRcdFx0cGhvdG9zOiAnaHR0cHM6Ly9waWNhc2F3ZWIuZ29vZ2xlLmNvbS9kYXRhLycsXHJcblx0XHRcdFx0dmlkZW9zOiAnaHR0cDovL2dkYXRhLnlvdXR1YmUuY29tJyxcclxuXHRcdFx0XHRmcmllbmRzOiAnaHR0cHM6Ly93d3cuZ29vZ2xlLmNvbS9tOC9mZWVkcywgaHR0cHM6Ly93d3cuZ29vZ2xlYXBpcy5jb20vYXV0aC9wbHVzLmxvZ2luJyxcclxuXHRcdFx0XHRmaWxlczogJ2h0dHBzOi8vd3d3Lmdvb2dsZWFwaXMuY29tL2F1dGgvZHJpdmUucmVhZG9ubHknLFxyXG5cdFx0XHRcdHB1Ymxpc2g6ICcnLFxyXG5cdFx0XHRcdHB1Ymxpc2hfZmlsZXM6ICdodHRwczovL3d3dy5nb29nbGVhcGlzLmNvbS9hdXRoL2RyaXZlJyxcclxuXHRcdFx0XHRzaGFyZTogJycsXHJcblx0XHRcdFx0Y3JlYXRlX2V2ZW50OiAnJyxcclxuXHRcdFx0XHRvZmZsaW5lX2FjY2VzczogJydcclxuXHRcdFx0fSxcclxuXHJcblx0XHRcdHNjb3BlX2RlbGltOiAnICcsXHJcblxyXG5cdFx0XHRsb2dpbjogZnVuY3Rpb24ocCkge1xyXG5cclxuXHRcdFx0XHRpZiAocC5xcy5yZXNwb25zZV90eXBlID09PSAnY29kZScpIHtcclxuXHJcblx0XHRcdFx0XHQvLyBMZXQncyBzZXQgdGhpcyB0byBhbiBvZmZsaW5lIGFjY2VzcyB0byByZXR1cm4gYSByZWZyZXNoX3Rva2VuXHJcblx0XHRcdFx0XHRwLnFzLmFjY2Vzc190eXBlID0gJ29mZmxpbmUnO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0Ly8gUmVhdXRoZW50aWNhdGVcclxuXHRcdFx0XHQvLyBodHRwczovL2RldmVsb3BlcnMuZ29vZ2xlLmNvbS9pZGVudGl0eS9wcm90b2NvbHMvXHJcblx0XHRcdFx0aWYgKHAub3B0aW9ucy5mb3JjZSkge1xyXG5cdFx0XHRcdFx0cC5xcy5hcHByb3ZhbF9wcm9tcHQgPSAnZm9yY2UnO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSxcclxuXHJcblx0XHRcdC8vIEFQSSBiYXNlIFVSSVxyXG5cdFx0XHRiYXNlOiAnaHR0cHM6Ly93d3cuZ29vZ2xlYXBpcy5jb20vJyxcclxuXHJcblx0XHRcdC8vIE1hcCBHRVQgcmVxdWVzdHNcclxuXHRcdFx0Z2V0OiB7XHJcblx0XHRcdFx0bWU6ICdwbHVzL3YxL3Blb3BsZS9tZScsXHJcblxyXG5cdFx0XHRcdC8vIERlcHJlY2F0ZWQgU2VwdCAxLCAyMDE0XHJcblx0XHRcdFx0Ly8nbWUnOiAnb2F1dGgyL3YxL3VzZXJpbmZvP2FsdD1qc29uJyxcclxuXHJcblx0XHRcdFx0Ly8gU2VlOiBodHRwczovL2RldmVsb3BlcnMuZ29vZ2xlLmNvbS8rL2FwaS9sYXRlc3QvcGVvcGxlL2xpc3RcclxuXHRcdFx0XHQnbWUvZnJpZW5kcyc6ICdwbHVzL3YxL3Blb3BsZS9tZS9wZW9wbGUvdmlzaWJsZT9tYXhSZXN1bHRzPUB7bGltaXR8MTAwfScsXHJcblx0XHRcdFx0J21lL2ZvbGxvd2luZyc6IGNvbnRhY3RzVXJsLFxyXG5cdFx0XHRcdCdtZS9mb2xsb3dlcnMnOiBjb250YWN0c1VybCxcclxuXHRcdFx0XHQnbWUvY29udGFjdHMnOiBjb250YWN0c1VybCxcclxuXHRcdFx0XHQnbWUvc2hhcmUnOiAncGx1cy92MS9wZW9wbGUvbWUvYWN0aXZpdGllcy9wdWJsaWM/bWF4UmVzdWx0cz1Ae2xpbWl0fDEwMH0nLFxyXG5cdFx0XHRcdCdtZS9mZWVkJzogJ3BsdXMvdjEvcGVvcGxlL21lL2FjdGl2aXRpZXMvcHVibGljP21heFJlc3VsdHM9QHtsaW1pdHwxMDB9JyxcclxuXHRcdFx0XHQnbWUvYWxidW1zJzogJ2h0dHBzOi8vcGljYXNhd2ViLmdvb2dsZS5jb20vZGF0YS9mZWVkL2FwaS91c2VyL2RlZmF1bHQ/YWx0PWpzb24mbWF4LXJlc3VsdHM9QHtsaW1pdHwxMDB9JnN0YXJ0LWluZGV4PUB7c3RhcnR8MX0nLFxyXG5cdFx0XHRcdCdtZS9hbGJ1bSc6IGZ1bmN0aW9uKHAsIGNhbGxiYWNrKSB7XHJcblx0XHRcdFx0XHR2YXIga2V5ID0gcC5xdWVyeS5pZDtcclxuXHRcdFx0XHRcdGRlbGV0ZSBwLnF1ZXJ5LmlkO1xyXG5cdFx0XHRcdFx0Y2FsbGJhY2soa2V5LnJlcGxhY2UoJy9lbnRyeS8nLCAnL2ZlZWQvJykpO1xyXG5cdFx0XHRcdH0sXHJcblxyXG5cdFx0XHRcdCdtZS9waG90b3MnOiAnaHR0cHM6Ly9waWNhc2F3ZWIuZ29vZ2xlLmNvbS9kYXRhL2ZlZWQvYXBpL3VzZXIvZGVmYXVsdD9hbHQ9anNvbiZraW5kPXBob3RvJm1heC1yZXN1bHRzPUB7bGltaXR8MTAwfSZzdGFydC1pbmRleD1Ae3N0YXJ0fDF9JyxcclxuXHJcblx0XHRcdFx0Ly8gU2VlOiBodHRwczovL2RldmVsb3BlcnMuZ29vZ2xlLmNvbS9kcml2ZS92Mi9yZWZlcmVuY2UvZmlsZXMvbGlzdFxyXG5cdFx0XHRcdCdtZS9maWxlJzogJ2RyaXZlL3YyL2ZpbGVzL0B7aWR9JyxcclxuXHRcdFx0XHQnbWUvZmlsZXMnOiAnZHJpdmUvdjIvZmlsZXM/cT0lMjJAe3BhcmVudHxyb290fSUyMitpbitwYXJlbnRzK2FuZCt0cmFzaGVkPWZhbHNlJm1heFJlc3VsdHM9QHtsaW1pdHwxMDB9JyxcclxuXHJcblx0XHRcdFx0Ly8gU2VlOiBodHRwczovL2RldmVsb3BlcnMuZ29vZ2xlLmNvbS9kcml2ZS92Mi9yZWZlcmVuY2UvZmlsZXMvbGlzdFxyXG5cdFx0XHRcdCdtZS9mb2xkZXJzJzogJ2RyaXZlL3YyL2ZpbGVzP3E9JTIyQHtpZHxyb290fSUyMitpbitwYXJlbnRzK2FuZCttaW1lVHlwZSs9KyUyMmFwcGxpY2F0aW9uL3ZuZC5nb29nbGUtYXBwcy5mb2xkZXIlMjIrYW5kK3RyYXNoZWQ9ZmFsc2UmbWF4UmVzdWx0cz1Ae2xpbWl0fDEwMH0nLFxyXG5cclxuXHRcdFx0XHQvLyBTZWU6IGh0dHBzOi8vZGV2ZWxvcGVycy5nb29nbGUuY29tL2RyaXZlL3YyL3JlZmVyZW5jZS9maWxlcy9saXN0XHJcblx0XHRcdFx0J21lL2ZvbGRlcic6ICdkcml2ZS92Mi9maWxlcz9xPSUyMkB7aWR8cm9vdH0lMjIraW4rcGFyZW50cythbmQrdHJhc2hlZD1mYWxzZSZtYXhSZXN1bHRzPUB7bGltaXR8MTAwfSdcclxuXHRcdFx0fSxcclxuXHJcblx0XHRcdC8vIE1hcCBQT1NUIHJlcXVlc3RzXHJcblx0XHRcdHBvc3Q6IHtcclxuXHJcblx0XHRcdFx0Ly8gR29vZ2xlIERyaXZlXHJcblx0XHRcdFx0J21lL2ZpbGVzJzogdXBsb2FkRHJpdmUsXHJcblx0XHRcdFx0J21lL2ZvbGRlcnMnOiBmdW5jdGlvbihwLCBjYWxsYmFjaykge1xyXG5cdFx0XHRcdFx0cC5kYXRhID0ge1xyXG5cdFx0XHRcdFx0XHR0aXRsZTogcC5kYXRhLm5hbWUsXHJcblx0XHRcdFx0XHRcdHBhcmVudHM6IFt7aWQ6IHAuZGF0YS5wYXJlbnQgfHwgJ3Jvb3QnfV0sXHJcblx0XHRcdFx0XHRcdG1pbWVUeXBlOiAnYXBwbGljYXRpb24vdm5kLmdvb2dsZS1hcHBzLmZvbGRlcidcclxuXHRcdFx0XHRcdH07XHJcblx0XHRcdFx0XHRjYWxsYmFjaygnZHJpdmUvdjIvZmlsZXMnKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0sXHJcblxyXG5cdFx0XHQvLyBNYXAgUFVUIHJlcXVlc3RzXHJcblx0XHRcdHB1dDoge1xyXG5cdFx0XHRcdCdtZS9maWxlcyc6IHVwbG9hZERyaXZlXHJcblx0XHRcdH0sXHJcblxyXG5cdFx0XHQvLyBNYXAgREVMRVRFIHJlcXVlc3RzXHJcblx0XHRcdGRlbDoge1xyXG5cdFx0XHRcdCdtZS9maWxlcyc6ICdkcml2ZS92Mi9maWxlcy9Ae2lkfScsXHJcblx0XHRcdFx0J21lL2ZvbGRlcic6ICdkcml2ZS92Mi9maWxlcy9Ae2lkfSdcclxuXHRcdFx0fSxcclxuXHJcblx0XHRcdC8vIE1hcCBQQVRDSCByZXF1ZXN0c1xyXG5cdFx0XHRwYXRjaDoge1xyXG5cdFx0XHRcdCdtZS9maWxlJzogJ2RyaXZlL3YyL2ZpbGVzL0B7aWR9J1xyXG5cdFx0XHR9LFxyXG5cclxuXHRcdFx0d3JhcDoge1xyXG5cdFx0XHRcdG1lOiBmdW5jdGlvbihvKSB7XHJcblx0XHRcdFx0XHRpZiAoby5pZCkge1xyXG5cdFx0XHRcdFx0XHRvLmxhc3RfbmFtZSA9IG8uZmFtaWx5X25hbWUgfHwgKG8ubmFtZSA/IG8ubmFtZS5mYW1pbHlOYW1lIDogbnVsbCk7XHJcblx0XHRcdFx0XHRcdG8uZmlyc3RfbmFtZSA9IG8uZ2l2ZW5fbmFtZSB8fCAoby5uYW1lID8gby5uYW1lLmdpdmVuTmFtZSA6IG51bGwpO1xyXG5cclxuXHRcdFx0XHRcdFx0aWYgKG8uZW1haWxzICYmIG8uZW1haWxzLmxlbmd0aCkge1xyXG5cdFx0XHRcdFx0XHRcdG8uZW1haWwgPSBvLmVtYWlsc1swXS52YWx1ZTtcclxuXHRcdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdFx0Zm9ybWF0UGVyc29uKG8pO1xyXG5cdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdHJldHVybiBvO1xyXG5cdFx0XHRcdH0sXHJcblxyXG5cdFx0XHRcdCdtZS9mcmllbmRzJzogZnVuY3Rpb24obykge1xyXG5cdFx0XHRcdFx0aWYgKG8uaXRlbXMpIHtcclxuXHRcdFx0XHRcdFx0cGFnaW5nKG8pO1xyXG5cdFx0XHRcdFx0XHRvLmRhdGEgPSBvLml0ZW1zO1xyXG5cdFx0XHRcdFx0XHRvLmRhdGEuZm9yRWFjaChmb3JtYXRQZXJzb24pO1xyXG5cdFx0XHRcdFx0XHRkZWxldGUgby5pdGVtcztcclxuXHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHRyZXR1cm4gbztcclxuXHRcdFx0XHR9LFxyXG5cclxuXHRcdFx0XHQnbWUvY29udGFjdHMnOiBmb3JtYXRGcmllbmRzLFxyXG5cdFx0XHRcdCdtZS9mb2xsb3dlcnMnOiBmb3JtYXRGcmllbmRzLFxyXG5cdFx0XHRcdCdtZS9mb2xsb3dpbmcnOiBmb3JtYXRGcmllbmRzLFxyXG5cdFx0XHRcdCdtZS9zaGFyZSc6IGZvcm1hdEZlZWQsXHJcblx0XHRcdFx0J21lL2ZlZWQnOiBmb3JtYXRGZWVkLFxyXG5cdFx0XHRcdCdtZS9hbGJ1bXMnOiBnRW50cnksXHJcblx0XHRcdFx0J21lL3Bob3Rvcyc6IGZvcm1hdFBob3RvcyxcclxuXHRcdFx0XHQnZGVmYXVsdCc6IGdFbnRyeVxyXG5cdFx0XHR9LFxyXG5cclxuXHRcdFx0eGhyOiBmdW5jdGlvbihwKSB7XHJcblxyXG5cdFx0XHRcdGlmIChwLm1ldGhvZCA9PT0gJ3Bvc3QnIHx8IHAubWV0aG9kID09PSAncHV0Jykge1xyXG5cdFx0XHRcdFx0dG9KU09OKHApO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRlbHNlIGlmIChwLm1ldGhvZCA9PT0gJ3BhdGNoJykge1xyXG5cdFx0XHRcdFx0aGVsbG8udXRpbHMuZXh0ZW5kKHAucXVlcnksIHAuZGF0YSk7XHJcblx0XHRcdFx0XHRwLmRhdGEgPSBudWxsO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0cmV0dXJuIHRydWU7XHJcblx0XHRcdH0sXHJcblxyXG5cdFx0XHQvLyBEb24ndCBldmVuIHRyeSBzdWJtaXR0aW5nIHZpYSBmb3JtLlxyXG5cdFx0XHQvLyBUaGlzIG1lYW5zIG5vIFBPU1Qgb3BlcmF0aW9ucyBpbiA8PUlFOVxyXG5cdFx0XHRmb3JtOiBmYWxzZVxyXG5cdFx0fVxyXG5cdH0pO1xyXG5cclxuXHRmdW5jdGlvbiB0b0ludChzKSB7XHJcblx0XHRyZXR1cm4gcGFyc2VJbnQocywgMTApO1xyXG5cdH1cclxuXHJcblx0ZnVuY3Rpb24gZm9ybWF0RmVlZChvKSB7XHJcblx0XHRwYWdpbmcobyk7XHJcblx0XHRvLmRhdGEgPSBvLml0ZW1zO1xyXG5cdFx0ZGVsZXRlIG8uaXRlbXM7XHJcblx0XHRyZXR1cm4gbztcclxuXHR9XHJcblxyXG5cdC8vIEZvcm1hdDogZW5zdXJlIGVhY2ggcmVjb3JkIGNvbnRhaW5zIGEgbmFtZSwgaWQgZXRjLlxyXG5cdGZ1bmN0aW9uIGZvcm1hdEl0ZW0obykge1xyXG5cdFx0aWYgKG8uZXJyb3IpIHtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmICghby5uYW1lKSB7XHJcblx0XHRcdG8ubmFtZSA9IG8udGl0bGUgfHwgby5tZXNzYWdlO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmICghby5waWN0dXJlKSB7XHJcblx0XHRcdG8ucGljdHVyZSA9IG8udGh1bWJuYWlsTGluaztcclxuXHRcdH1cclxuXHJcblx0XHRpZiAoIW8udGh1bWJuYWlsKSB7XHJcblx0XHRcdG8udGh1bWJuYWlsID0gby50aHVtYm5haWxMaW5rO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmIChvLm1pbWVUeXBlID09PSAnYXBwbGljYXRpb24vdm5kLmdvb2dsZS1hcHBzLmZvbGRlcicpIHtcclxuXHRcdFx0by50eXBlID0gJ2ZvbGRlcic7XHJcblx0XHRcdG8uZmlsZXMgPSAnaHR0cHM6Ly93d3cuZ29vZ2xlYXBpcy5jb20vZHJpdmUvdjIvZmlsZXM/cT0lMjInICsgby5pZCArICclMjIraW4rcGFyZW50cyc7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIG87XHJcblx0fVxyXG5cclxuXHRmdW5jdGlvbiBmb3JtYXRJbWFnZShpbWFnZSkge1xyXG5cdFx0cmV0dXJuIHtcclxuXHRcdFx0c291cmNlOiBpbWFnZS51cmwsXHJcblx0XHRcdHdpZHRoOiBpbWFnZS53aWR0aCxcclxuXHRcdFx0aGVpZ2h0OiBpbWFnZS5oZWlnaHRcclxuXHRcdH07XHJcblx0fVxyXG5cclxuXHRmdW5jdGlvbiBmb3JtYXRQaG90b3Mobykge1xyXG5cdFx0by5kYXRhID0gby5mZWVkLmVudHJ5Lm1hcChmb3JtYXRFbnRyeSk7XHJcblx0XHRkZWxldGUgby5mZWVkO1xyXG5cdH1cclxuXHJcblx0Ly8gR29vZ2xlIGhhcyBhIGhvcnJpYmxlIEpTT04gQVBJXHJcblx0ZnVuY3Rpb24gZ0VudHJ5KG8pIHtcclxuXHRcdHBhZ2luZyhvKTtcclxuXHJcblx0XHRpZiAoJ2ZlZWQnIGluIG8gJiYgJ2VudHJ5JyBpbiBvLmZlZWQpIHtcclxuXHRcdFx0by5kYXRhID0gby5mZWVkLmVudHJ5Lm1hcChmb3JtYXRFbnRyeSk7XHJcblx0XHRcdGRlbGV0ZSBvLmZlZWQ7XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gT2xkIHN0eWxlOiBQaWNhc2EsIGV0Yy5cclxuXHRcdGVsc2UgaWYgKCdlbnRyeScgaW4gbykge1xyXG5cdFx0XHRyZXR1cm4gZm9ybWF0RW50cnkoby5lbnRyeSk7XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gTmV3IHN0eWxlOiBHb29nbGUgRHJpdmUgJiBQbHVzXHJcblx0XHRlbHNlIGlmICgnaXRlbXMnIGluIG8pIHtcclxuXHRcdFx0by5kYXRhID0gby5pdGVtcy5tYXAoZm9ybWF0SXRlbSk7XHJcblx0XHRcdGRlbGV0ZSBvLml0ZW1zO1xyXG5cdFx0fVxyXG5cdFx0ZWxzZSB7XHJcblx0XHRcdGZvcm1hdEl0ZW0obyk7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIG87XHJcblx0fVxyXG5cclxuXHRmdW5jdGlvbiBmb3JtYXRQZXJzb24obykge1xyXG5cdFx0by5uYW1lID0gby5kaXNwbGF5TmFtZSB8fCBvLm5hbWU7XHJcblx0XHRvLnBpY3R1cmUgPSBvLnBpY3R1cmUgfHwgKG8uaW1hZ2UgPyBvLmltYWdlLnVybCA6IG51bGwpO1xyXG5cdFx0by50aHVtYm5haWwgPSBvLnBpY3R1cmU7XHJcblx0fVxyXG5cclxuXHRmdW5jdGlvbiBmb3JtYXRGcmllbmRzKG8sIGhlYWRlcnMsIHJlcSkge1xyXG5cdFx0cGFnaW5nKG8pO1xyXG5cdFx0dmFyIHIgPSBbXTtcclxuXHRcdGlmICgnZmVlZCcgaW4gbyAmJiAnZW50cnknIGluIG8uZmVlZCkge1xyXG5cdFx0XHR2YXIgdG9rZW4gPSByZXEucXVlcnkuYWNjZXNzX3Rva2VuO1xyXG5cdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IG8uZmVlZC5lbnRyeS5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHRcdHZhciBhID0gby5mZWVkLmVudHJ5W2ldO1xyXG5cclxuXHRcdFx0XHRhLmlkXHQ9IGEuaWQuJHQ7XHJcblx0XHRcdFx0YS5uYW1lXHQ9IGEudGl0bGUuJHQ7XHJcblx0XHRcdFx0ZGVsZXRlIGEudGl0bGU7XHJcblx0XHRcdFx0aWYgKGEuZ2QkZW1haWwpIHtcclxuXHRcdFx0XHRcdGEuZW1haWxcdD0gKGEuZ2QkZW1haWwgJiYgYS5nZCRlbWFpbC5sZW5ndGggPiAwKSA/IGEuZ2QkZW1haWxbMF0uYWRkcmVzcyA6IG51bGw7XHJcblx0XHRcdFx0XHRhLmVtYWlscyA9IGEuZ2QkZW1haWw7XHJcblx0XHRcdFx0XHRkZWxldGUgYS5nZCRlbWFpbDtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdGlmIChhLnVwZGF0ZWQpIHtcclxuXHRcdFx0XHRcdGEudXBkYXRlZCA9IGEudXBkYXRlZC4kdDtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdGlmIChhLmxpbmspIHtcclxuXHJcblx0XHRcdFx0XHR2YXIgcGljID0gKGEubGluay5sZW5ndGggPiAwKSA/IGEubGlua1swXS5ocmVmIDogbnVsbDtcclxuXHRcdFx0XHRcdGlmIChwaWMgJiYgYS5saW5rWzBdLmdkJGV0YWcpIHtcclxuXHRcdFx0XHRcdFx0cGljICs9IChwaWMuaW5kZXhPZignPycpID4gLTEgPyAnJicgOiAnPycpICsgJ2FjY2Vzc190b2tlbj0nICsgdG9rZW47XHJcblx0XHRcdFx0XHRcdGEucGljdHVyZSA9IHBpYztcclxuXHRcdFx0XHRcdFx0YS50aHVtYm5haWwgPSBwaWM7XHJcblx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0ZGVsZXRlIGEubGluaztcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdGlmIChhLmNhdGVnb3J5KSB7XHJcblx0XHRcdFx0XHRkZWxldGUgYS5jYXRlZ29yeTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdG8uZGF0YSA9IG8uZmVlZC5lbnRyeTtcclxuXHRcdFx0ZGVsZXRlIG8uZmVlZDtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gbztcclxuXHR9XHJcblxyXG5cdGZ1bmN0aW9uIGZvcm1hdEVudHJ5KGEpIHtcclxuXHJcblx0XHR2YXIgZ3JvdXAgPSBhLm1lZGlhJGdyb3VwO1xyXG5cdFx0dmFyIHBob3RvID0gZ3JvdXAubWVkaWEkY29udGVudC5sZW5ndGggPyBncm91cC5tZWRpYSRjb250ZW50WzBdIDoge307XHJcblx0XHR2YXIgbWVkaWFDb250ZW50ID0gZ3JvdXAubWVkaWEkY29udGVudCB8fCBbXTtcclxuXHRcdHZhciBtZWRpYVRodW1ibmFpbCA9IGdyb3VwLm1lZGlhJHRodW1ibmFpbCB8fCBbXTtcclxuXHJcblx0XHR2YXIgcGljdHVyZXMgPSBtZWRpYUNvbnRlbnRcclxuXHRcdFx0LmNvbmNhdChtZWRpYVRodW1ibmFpbClcclxuXHRcdFx0Lm1hcChmb3JtYXRJbWFnZSlcclxuXHRcdFx0LnNvcnQoZnVuY3Rpb24oYSwgYikge1xyXG5cdFx0XHRcdHJldHVybiBhLndpZHRoIC0gYi53aWR0aDtcclxuXHRcdFx0fSk7XHJcblxyXG5cdFx0dmFyIGkgPSAwO1xyXG5cdFx0dmFyIF9hO1xyXG5cdFx0dmFyIHAgPSB7XHJcblx0XHRcdGlkOiBhLmlkLiR0LFxyXG5cdFx0XHRuYW1lOiBhLnRpdGxlLiR0LFxyXG5cdFx0XHRkZXNjcmlwdGlvbjogYS5zdW1tYXJ5LiR0LFxyXG5cdFx0XHR1cGRhdGVkX3RpbWU6IGEudXBkYXRlZC4kdCxcclxuXHRcdFx0Y3JlYXRlZF90aW1lOiBhLnB1Ymxpc2hlZC4kdCxcclxuXHRcdFx0cGljdHVyZTogcGhvdG8gPyBwaG90by51cmwgOiBudWxsLFxyXG5cdFx0XHRwaWN0dXJlczogcGljdHVyZXMsXHJcblx0XHRcdGltYWdlczogW10sXHJcblx0XHRcdHRodW1ibmFpbDogcGhvdG8gPyBwaG90by51cmwgOiBudWxsLFxyXG5cdFx0XHR3aWR0aDogcGhvdG8ud2lkdGgsXHJcblx0XHRcdGhlaWdodDogcGhvdG8uaGVpZ2h0XHJcblx0XHR9O1xyXG5cclxuXHRcdC8vIEdldCBmZWVkL2NoaWxkcmVuXHJcblx0XHRpZiAoJ2xpbmsnIGluIGEpIHtcclxuXHRcdFx0Zm9yIChpID0gMDsgaSA8IGEubGluay5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHRcdHZhciBkID0gYS5saW5rW2ldO1xyXG5cdFx0XHRcdGlmIChkLnJlbC5tYXRjaCgvXFwjZmVlZCQvKSkge1xyXG5cdFx0XHRcdFx0cC51cGxvYWRfbG9jYXRpb24gPSBwLmZpbGVzID0gcC5waG90b3MgPSBkLmhyZWY7XHJcblx0XHRcdFx0XHRicmVhaztcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHQvLyBHZXQgaW1hZ2VzIG9mIGRpZmZlcmVudCBzY2FsZXNcclxuXHRcdGlmICgnY2F0ZWdvcnknIGluIGEgJiYgYS5jYXRlZ29yeS5sZW5ndGgpIHtcclxuXHRcdFx0X2EgPSBhLmNhdGVnb3J5O1xyXG5cdFx0XHRmb3IgKGkgPSAwOyBpIDwgX2EubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0XHRpZiAoX2FbaV0uc2NoZW1lICYmIF9hW2ldLnNjaGVtZS5tYXRjaCgvXFwja2luZCQvKSkge1xyXG5cdFx0XHRcdFx0cC50eXBlID0gX2FbaV0udGVybS5yZXBsYWNlKC9eLio/XFwjLywgJycpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdC8vIEdldCBpbWFnZXMgb2YgZGlmZmVyZW50IHNjYWxlc1xyXG5cdFx0aWYgKCdtZWRpYSR0aHVtYm5haWwnIGluIGdyb3VwICYmIGdyb3VwLm1lZGlhJHRodW1ibmFpbC5sZW5ndGgpIHtcclxuXHRcdFx0X2EgPSBncm91cC5tZWRpYSR0aHVtYm5haWw7XHJcblx0XHRcdHAudGh1bWJuYWlsID0gX2FbMF0udXJsO1xyXG5cdFx0XHRwLmltYWdlcyA9IF9hLm1hcChmb3JtYXRJbWFnZSk7XHJcblx0XHR9XHJcblxyXG5cdFx0X2EgPSBncm91cC5tZWRpYSRjb250ZW50O1xyXG5cclxuXHRcdGlmIChfYSAmJiBfYS5sZW5ndGgpIHtcclxuXHRcdFx0cC5pbWFnZXMucHVzaChmb3JtYXRJbWFnZShfYVswXSkpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBwO1xyXG5cdH1cclxuXHJcblx0ZnVuY3Rpb24gcGFnaW5nKHJlcykge1xyXG5cclxuXHRcdC8vIENvbnRhY3RzIFYyXHJcblx0XHRpZiAoJ2ZlZWQnIGluIHJlcyAmJiByZXMuZmVlZC5vcGVuU2VhcmNoJGl0ZW1zUGVyUGFnZSkge1xyXG5cdFx0XHR2YXIgbGltaXQgPSB0b0ludChyZXMuZmVlZC5vcGVuU2VhcmNoJGl0ZW1zUGVyUGFnZS4kdCk7XHJcblx0XHRcdHZhciBzdGFydCA9IHRvSW50KHJlcy5mZWVkLm9wZW5TZWFyY2gkc3RhcnRJbmRleC4kdCk7XHJcblx0XHRcdHZhciB0b3RhbCA9IHRvSW50KHJlcy5mZWVkLm9wZW5TZWFyY2gkdG90YWxSZXN1bHRzLiR0KTtcclxuXHJcblx0XHRcdGlmICgoc3RhcnQgKyBsaW1pdCkgPCB0b3RhbCkge1xyXG5cdFx0XHRcdHJlcy5wYWdpbmcgPSB7XHJcblx0XHRcdFx0XHRuZXh0OiAnP3N0YXJ0PScgKyAoc3RhcnQgKyBsaW1pdClcclxuXHRcdFx0XHR9O1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHRlbHNlIGlmICgnbmV4dFBhZ2VUb2tlbicgaW4gcmVzKSB7XHJcblx0XHRcdHJlcy5wYWdpbmcgPSB7XHJcblx0XHRcdFx0bmV4dDogJz9wYWdlVG9rZW49JyArIHJlcy5uZXh0UGFnZVRva2VuXHJcblx0XHRcdH07XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHQvLyBDb25zdHJ1Y3QgYSBtdWx0aXBhcnQgbWVzc2FnZVxyXG5cdGZ1bmN0aW9uIE11bHRpcGFydCgpIHtcclxuXHJcblx0XHQvLyBJbnRlcm5hbCBib2R5XHJcblx0XHR2YXIgYm9keSA9IFtdO1xyXG5cdFx0dmFyIGJvdW5kYXJ5ID0gKE1hdGgucmFuZG9tKCkgKiAxZTEwKS50b1N0cmluZygzMik7XHJcblx0XHR2YXIgY291bnRlciA9IDA7XHJcblx0XHR2YXIgbGluZUJyZWFrID0gJ1xcclxcbic7XHJcblx0XHR2YXIgZGVsaW0gPSBsaW5lQnJlYWsgKyAnLS0nICsgYm91bmRhcnk7XHJcblx0XHR2YXIgcmVhZHkgPSBmdW5jdGlvbigpIHt9O1xyXG5cclxuXHRcdHZhciBkYXRhVXJpID0gL15kYXRhXFw6KFteOyxdKyhcXDtjaGFyc2V0PVteOyxdKyk/KShcXDtiYXNlNjQpPywvaTtcclxuXHJcblx0XHQvLyBBZGQgZmlsZVxyXG5cdFx0ZnVuY3Rpb24gYWRkRmlsZShpdGVtKSB7XHJcblx0XHRcdHZhciBmciA9IG5ldyBGaWxlUmVhZGVyKCk7XHJcblx0XHRcdGZyLm9ubG9hZCA9IGZ1bmN0aW9uKGUpIHtcclxuXHRcdFx0XHRhZGRDb250ZW50KGJ0b2EoZS50YXJnZXQucmVzdWx0KSwgaXRlbS50eXBlICsgbGluZUJyZWFrICsgJ0NvbnRlbnQtVHJhbnNmZXItRW5jb2Rpbmc6IGJhc2U2NCcpO1xyXG5cdFx0XHR9O1xyXG5cclxuXHRcdFx0ZnIucmVhZEFzQmluYXJ5U3RyaW5nKGl0ZW0pO1xyXG5cdFx0fVxyXG5cclxuXHRcdC8vIEFkZCBjb250ZW50XHJcblx0XHRmdW5jdGlvbiBhZGRDb250ZW50KGNvbnRlbnQsIHR5cGUpIHtcclxuXHRcdFx0Ym9keS5wdXNoKGxpbmVCcmVhayArICdDb250ZW50LVR5cGU6ICcgKyB0eXBlICsgbGluZUJyZWFrICsgbGluZUJyZWFrICsgY29udGVudCk7XHJcblx0XHRcdGNvdW50ZXItLTtcclxuXHRcdFx0cmVhZHkoKTtcclxuXHRcdH1cclxuXHJcblx0XHQvLyBBZGQgbmV3IHRoaW5ncyB0byB0aGUgb2JqZWN0XHJcblx0XHR0aGlzLmFwcGVuZCA9IGZ1bmN0aW9uKGNvbnRlbnQsIHR5cGUpIHtcclxuXHJcblx0XHRcdC8vIERvZXMgdGhlIGNvbnRlbnQgaGF2ZSBhbiBhcnJheVxyXG5cdFx0XHRpZiAodHlwZW9mIChjb250ZW50KSA9PT0gJ3N0cmluZycgfHwgISgnbGVuZ3RoJyBpbiBPYmplY3QoY29udGVudCkpKSB7XHJcblx0XHRcdFx0Ly8gQ29udmVydGkgdG8gbXVsdGlwbGVzXHJcblx0XHRcdFx0Y29udGVudCA9IFtjb250ZW50XTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBjb250ZW50Lmxlbmd0aDsgaSsrKSB7XHJcblxyXG5cdFx0XHRcdGNvdW50ZXIrKztcclxuXHJcblx0XHRcdFx0dmFyIGl0ZW0gPSBjb250ZW50W2ldO1xyXG5cclxuXHRcdFx0XHQvLyBJcyB0aGlzIGEgZmlsZT9cclxuXHRcdFx0XHQvLyBGaWxlcyBjYW4gYmUgZWl0aGVyIEJsb2JzIG9yIEZpbGUgdHlwZXNcclxuXHRcdFx0XHRpZiAoXHJcblx0XHRcdFx0XHQodHlwZW9mIChGaWxlKSAhPT0gJ3VuZGVmaW5lZCcgJiYgaXRlbSBpbnN0YW5jZW9mIEZpbGUpIHx8XHJcblx0XHRcdFx0XHQodHlwZW9mIChCbG9iKSAhPT0gJ3VuZGVmaW5lZCcgJiYgaXRlbSBpbnN0YW5jZW9mIEJsb2IpXHJcblx0XHRcdFx0KSB7XHJcblx0XHRcdFx0XHQvLyBSZWFkIHRoZSBmaWxlIGluXHJcblx0XHRcdFx0XHRhZGRGaWxlKGl0ZW0pO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0Ly8gRGF0YS1VUkk/XHJcblx0XHRcdFx0Ly8gRGF0YTpbPG1pbWUgdHlwZT5dWztjaGFyc2V0PTxjaGFyc2V0Pl1bO2Jhc2U2NF0sPGVuY29kZWQgZGF0YT5cclxuXHRcdFx0XHQvLyAvXmRhdGFcXDooW147LF0rKFxcO2NoYXJzZXQ9W147LF0rKT8pKFxcO2Jhc2U2NCk/LC9pXHJcblx0XHRcdFx0ZWxzZSBpZiAodHlwZW9mIChpdGVtKSA9PT0gJ3N0cmluZycgJiYgaXRlbS5tYXRjaChkYXRhVXJpKSkge1xyXG5cdFx0XHRcdFx0dmFyIG0gPSBpdGVtLm1hdGNoKGRhdGFVcmkpO1xyXG5cdFx0XHRcdFx0YWRkQ29udGVudChpdGVtLnJlcGxhY2UoZGF0YVVyaSwgJycpLCBtWzFdICsgbGluZUJyZWFrICsgJ0NvbnRlbnQtVHJhbnNmZXItRW5jb2Rpbmc6IGJhc2U2NCcpO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0Ly8gUmVndWxhciBzdHJpbmdcclxuXHRcdFx0XHRlbHNlIHtcclxuXHRcdFx0XHRcdGFkZENvbnRlbnQoaXRlbSwgdHlwZSk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9O1xyXG5cclxuXHRcdHRoaXMub25yZWFkeSA9IGZ1bmN0aW9uKGZuKSB7XHJcblx0XHRcdHJlYWR5ID0gZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0aWYgKGNvdW50ZXIgPT09IDApIHtcclxuXHRcdFx0XHRcdC8vIFRyaWdnZXIgcmVhZHlcclxuXHRcdFx0XHRcdGJvZHkudW5zaGlmdCgnJyk7XHJcblx0XHRcdFx0XHRib2R5LnB1c2goJy0tJyk7XHJcblx0XHRcdFx0XHRmbihib2R5LmpvaW4oZGVsaW0pLCBib3VuZGFyeSk7XHJcblx0XHRcdFx0XHRib2R5ID0gW107XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9O1xyXG5cclxuXHRcdFx0cmVhZHkoKTtcclxuXHRcdH07XHJcblx0fVxyXG5cclxuXHQvLyBVcGxvYWQgdG8gRHJpdmVcclxuXHQvLyBJZiB0aGlzIGlzIFBVVCB0aGVuIG9ubHkgYXVnbWVudCB0aGUgZmlsZSB1cGxvYWRlZFxyXG5cdC8vIFBVVCBodHRwczovL2RldmVsb3BlcnMuZ29vZ2xlLmNvbS9kcml2ZS92Mi9yZWZlcmVuY2UvZmlsZXMvdXBkYXRlXHJcblx0Ly8gUE9TVCBodHRwczovL2RldmVsb3BlcnMuZ29vZ2xlLmNvbS9kcml2ZS9tYW5hZ2UtdXBsb2Fkc1xyXG5cdGZ1bmN0aW9uIHVwbG9hZERyaXZlKHAsIGNhbGxiYWNrKSB7XHJcblxyXG5cdFx0dmFyIGRhdGEgPSB7fTtcclxuXHJcblx0XHQvLyBUZXN0IGZvciBET00gZWxlbWVudFxyXG5cdFx0aWYgKHAuZGF0YSAmJlxyXG5cdFx0XHQodHlwZW9mIChIVE1MSW5wdXRFbGVtZW50KSAhPT0gJ3VuZGVmaW5lZCcgJiYgcC5kYXRhIGluc3RhbmNlb2YgSFRNTElucHV0RWxlbWVudClcclxuXHRcdCkge1xyXG5cdFx0XHRwLmRhdGEgPSB7ZmlsZTogcC5kYXRhfTtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAoIXAuZGF0YS5uYW1lICYmIE9iamVjdChPYmplY3QocC5kYXRhLmZpbGUpLmZpbGVzKS5sZW5ndGggJiYgcC5tZXRob2QgPT09ICdwb3N0Jykge1xyXG5cdFx0XHRwLmRhdGEubmFtZSA9IHAuZGF0YS5maWxlLmZpbGVzWzBdLm5hbWU7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKHAubWV0aG9kID09PSAncG9zdCcpIHtcclxuXHRcdFx0cC5kYXRhID0ge1xyXG5cdFx0XHRcdHRpdGxlOiBwLmRhdGEubmFtZSxcclxuXHRcdFx0XHRwYXJlbnRzOiBbe2lkOiBwLmRhdGEucGFyZW50IHx8ICdyb290J31dLFxyXG5cdFx0XHRcdGZpbGU6IHAuZGF0YS5maWxlXHJcblx0XHRcdH07XHJcblx0XHR9XHJcblx0XHRlbHNlIHtcclxuXHJcblx0XHRcdC8vIE1ha2UgYSByZWZlcmVuY2VcclxuXHRcdFx0ZGF0YSA9IHAuZGF0YTtcclxuXHRcdFx0cC5kYXRhID0ge307XHJcblxyXG5cdFx0XHQvLyBBZGQgdGhlIHBhcnRzIHRvIGNoYW5nZSBhcyByZXF1aXJlZFxyXG5cdFx0XHRpZiAoZGF0YS5wYXJlbnQpIHtcclxuXHRcdFx0XHRwLmRhdGEucGFyZW50cyA9IFt7aWQ6IHAuZGF0YS5wYXJlbnQgfHwgJ3Jvb3QnfV07XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGlmIChkYXRhLmZpbGUpIHtcclxuXHRcdFx0XHRwLmRhdGEuZmlsZSA9IGRhdGEuZmlsZTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0aWYgKGRhdGEubmFtZSkge1xyXG5cdFx0XHRcdHAuZGF0YS50aXRsZSA9IGRhdGEubmFtZTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdC8vIEV4dHJhY3QgdGhlIGZpbGUsIGlmIGl0IGV4aXN0cyBmcm9tIHRoZSBkYXRhIG9iamVjdFxyXG5cdFx0Ly8gSWYgdGhlIEZpbGUgaXMgYW4gSU5QVVQgZWxlbWVudCBsZXRzIGp1c3QgY29uY2VybiBvdXJzZWx2ZXMgd2l0aCB0aGUgTm9kZUxpc3RcclxuXHRcdHZhciBmaWxlO1xyXG5cdFx0aWYgKCdmaWxlJyBpbiBwLmRhdGEpIHtcclxuXHRcdFx0ZmlsZSA9IHAuZGF0YS5maWxlO1xyXG5cdFx0XHRkZWxldGUgcC5kYXRhLmZpbGU7XHJcblxyXG5cdFx0XHRpZiAodHlwZW9mIChmaWxlKSA9PT0gJ29iamVjdCcgJiYgJ2ZpbGVzJyBpbiBmaWxlKSB7XHJcblx0XHRcdFx0Ly8gQXNzaWduIHRoZSBOb2RlTGlzdFxyXG5cdFx0XHRcdGZpbGUgPSBmaWxlLmZpbGVzO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZiAoIWZpbGUgfHwgIWZpbGUubGVuZ3RoKSB7XHJcblx0XHRcdFx0Y2FsbGJhY2soe1xyXG5cdFx0XHRcdFx0ZXJyb3I6IHtcclxuXHRcdFx0XHRcdFx0Y29kZTogJ3JlcXVlc3RfaW52YWxpZCcsXHJcblx0XHRcdFx0XHRcdG1lc3NhZ2U6ICdUaGVyZSB3ZXJlIG5vIGZpbGVzIGF0dGFjaGVkIHdpdGggdGhpcyByZXF1ZXN0IHRvIHVwbG9hZCdcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHQvLyBTZXQgdHlwZSBwLmRhdGEubWltZVR5cGUgPSBPYmplY3QoZmlsZVswXSkudHlwZSB8fCAnYXBwbGljYXRpb24vb2N0ZXQtc3RyZWFtJztcclxuXHJcblx0XHQvLyBDb25zdHJ1Y3QgYSBtdWx0aXBhcnQgbWVzc2FnZVxyXG5cdFx0dmFyIHBhcnRzID0gbmV3IE11bHRpcGFydCgpO1xyXG5cdFx0cGFydHMuYXBwZW5kKEpTT04uc3RyaW5naWZ5KHAuZGF0YSksICdhcHBsaWNhdGlvbi9qc29uJyk7XHJcblxyXG5cdFx0Ly8gUmVhZCB0aGUgZmlsZSBpbnRvIGEgIGJhc2U2NCBzdHJpbmcuLi4geWVwIGEgaGFzc2xlLCBpIGtub3dcclxuXHRcdC8vIEZvcm1EYXRhIGRvZXNuJ3QgbGV0IHVzIGFzc2lnbiBvdXIgb3duIE11bHRpcGFydCBoZWFkZXJzIGFuZCBIVFRQIENvbnRlbnQtVHlwZVxyXG5cdFx0Ly8gQWxhcyBHb29nbGVBcGkgbmVlZCB0aGVzZSBpbiBhIHBhcnRpY3VsYXIgZm9ybWF0XHJcblx0XHRpZiAoZmlsZSkge1xyXG5cdFx0XHRwYXJ0cy5hcHBlbmQoZmlsZSk7XHJcblx0XHR9XHJcblxyXG5cdFx0cGFydHMub25yZWFkeShmdW5jdGlvbihib2R5LCBib3VuZGFyeSkge1xyXG5cclxuXHRcdFx0cC5oZWFkZXJzWydjb250ZW50LXR5cGUnXSA9ICdtdWx0aXBhcnQvcmVsYXRlZDsgYm91bmRhcnk9XCInICsgYm91bmRhcnkgKyAnXCInO1xyXG5cdFx0XHRwLmRhdGEgPSBib2R5O1xyXG5cclxuXHRcdFx0Y2FsbGJhY2soJ3VwbG9hZC9kcml2ZS92Mi9maWxlcycgKyAoZGF0YS5pZCA/ICcvJyArIGRhdGEuaWQgOiAnJykgKyAnP3VwbG9hZFR5cGU9bXVsdGlwYXJ0Jyk7XHJcblx0XHR9KTtcclxuXHJcblx0fVxyXG5cclxuXHRmdW5jdGlvbiB0b0pTT04ocCkge1xyXG5cdFx0aWYgKHR5cGVvZiAocC5kYXRhKSA9PT0gJ29iamVjdCcpIHtcclxuXHRcdFx0Ly8gQ29udmVydCB0aGUgUE9TVCBpbnRvIGEgamF2YXNjcmlwdCBvYmplY3RcclxuXHRcdFx0dHJ5IHtcclxuXHRcdFx0XHRwLmRhdGEgPSBKU09OLnN0cmluZ2lmeShwLmRhdGEpO1xyXG5cdFx0XHRcdHAuaGVhZGVyc1snY29udGVudC10eXBlJ10gPSAnYXBwbGljYXRpb24vanNvbic7XHJcblx0XHRcdH1cclxuXHRcdFx0Y2F0Y2ggKGUpIHt9XHJcblx0XHR9XHJcblx0fVxyXG5cclxufSkoaGVsbG8pO1xyXG5cclxuKGZ1bmN0aW9uKGhlbGxvKSB7XHJcblxyXG5cdGhlbGxvLmluaXQoe1xyXG5cclxuXHRcdGluc3RhZ3JhbToge1xyXG5cclxuXHRcdFx0bmFtZTogJ0luc3RhZ3JhbScsXHJcblxyXG5cdFx0XHRvYXV0aDoge1xyXG5cdFx0XHRcdC8vIFNlZTogaHR0cDovL2luc3RhZ3JhbS5jb20vZGV2ZWxvcGVyL2F1dGhlbnRpY2F0aW9uL1xyXG5cdFx0XHRcdHZlcnNpb246IDIsXHJcblx0XHRcdFx0YXV0aDogJ2h0dHBzOi8vaW5zdGFncmFtLmNvbS9vYXV0aC9hdXRob3JpemUvJyxcclxuXHRcdFx0XHRncmFudDogJ2h0dHBzOi8vYXBpLmluc3RhZ3JhbS5jb20vb2F1dGgvYWNjZXNzX3Rva2VuJ1xyXG5cdFx0XHR9LFxyXG5cclxuXHRcdFx0Ly8gUmVmcmVzaCB0aGUgYWNjZXNzX3Rva2VuIG9uY2UgZXhwaXJlZFxyXG5cdFx0XHRyZWZyZXNoOiB0cnVlLFxyXG5cclxuXHRcdFx0c2NvcGU6IHtcclxuXHRcdFx0XHRiYXNpYzogJ2Jhc2ljJyxcclxuXHRcdFx0XHRwaG90b3M6ICcnLFxyXG5cdFx0XHRcdGZyaWVuZHM6ICdyZWxhdGlvbnNoaXBzJyxcclxuXHRcdFx0XHRwdWJsaXNoOiAnbGlrZXMgY29tbWVudHMnLFxyXG5cdFx0XHRcdGVtYWlsOiAnJyxcclxuXHRcdFx0XHRzaGFyZTogJycsXHJcblx0XHRcdFx0cHVibGlzaF9maWxlczogJycsXHJcblx0XHRcdFx0ZmlsZXM6ICcnLFxyXG5cdFx0XHRcdHZpZGVvczogJycsXHJcblx0XHRcdFx0b2ZmbGluZV9hY2Nlc3M6ICcnXHJcblx0XHRcdH0sXHJcblxyXG5cdFx0XHRzY29wZV9kZWxpbTogJyAnLFxyXG5cclxuXHRcdFx0YmFzZTogJ2h0dHBzOi8vYXBpLmluc3RhZ3JhbS5jb20vdjEvJyxcclxuXHJcblx0XHRcdGdldDoge1xyXG5cdFx0XHRcdG1lOiAndXNlcnMvc2VsZicsXHJcblx0XHRcdFx0J21lL2ZlZWQnOiAndXNlcnMvc2VsZi9mZWVkP2NvdW50PUB7bGltaXR8MTAwfScsXHJcblx0XHRcdFx0J21lL3Bob3Rvcyc6ICd1c2Vycy9zZWxmL21lZGlhL3JlY2VudD9taW5faWQ9MCZjb3VudD1Ae2xpbWl0fDEwMH0nLFxyXG5cdFx0XHRcdCdtZS9mcmllbmRzJzogJ3VzZXJzL3NlbGYvZm9sbG93cz9jb3VudD1Ae2xpbWl0fDEwMH0nLFxyXG5cdFx0XHRcdCdtZS9mb2xsb3dpbmcnOiAndXNlcnMvc2VsZi9mb2xsb3dzP2NvdW50PUB7bGltaXR8MTAwfScsXHJcblx0XHRcdFx0J21lL2ZvbGxvd2Vycyc6ICd1c2Vycy9zZWxmL2ZvbGxvd2VkLWJ5P2NvdW50PUB7bGltaXR8MTAwfScsXHJcblx0XHRcdFx0J2ZyaWVuZC9waG90b3MnOiAndXNlcnMvQHtpZH0vbWVkaWEvcmVjZW50P21pbl9pZD0wJmNvdW50PUB7bGltaXR8MTAwfSdcclxuXHRcdFx0fSxcclxuXHJcblx0XHRcdHBvc3Q6IHtcclxuXHRcdFx0XHQnbWUvbGlrZSc6IGZ1bmN0aW9uKHAsIGNhbGxiYWNrKSB7XHJcblx0XHRcdFx0XHR2YXIgaWQgPSBwLmRhdGEuaWQ7XHJcblx0XHRcdFx0XHRwLmRhdGEgPSB7fTtcclxuXHRcdFx0XHRcdGNhbGxiYWNrKCdtZWRpYS8nICsgaWQgKyAnL2xpa2VzJyk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9LFxyXG5cclxuXHRcdFx0ZGVsOiB7XHJcblx0XHRcdFx0J21lL2xpa2UnOiAnbWVkaWEvQHtpZH0vbGlrZXMnXHJcblx0XHRcdH0sXHJcblxyXG5cdFx0XHR3cmFwOiB7XHJcblx0XHRcdFx0bWU6IGZ1bmN0aW9uKG8pIHtcclxuXHJcblx0XHRcdFx0XHRmb3JtYXRFcnJvcihvKTtcclxuXHJcblx0XHRcdFx0XHRpZiAoJ2RhdGEnIGluIG8pIHtcclxuXHRcdFx0XHRcdFx0by5pZCA9IG8uZGF0YS5pZDtcclxuXHRcdFx0XHRcdFx0by50aHVtYm5haWwgPSBvLmRhdGEucHJvZmlsZV9waWN0dXJlO1xyXG5cdFx0XHRcdFx0XHRvLm5hbWUgPSBvLmRhdGEuZnVsbF9uYW1lIHx8IG8uZGF0YS51c2VybmFtZTtcclxuXHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHRyZXR1cm4gbztcclxuXHRcdFx0XHR9LFxyXG5cclxuXHRcdFx0XHQnbWUvZnJpZW5kcyc6IGZvcm1hdEZyaWVuZHMsXHJcblx0XHRcdFx0J21lL2ZvbGxvd2luZyc6IGZvcm1hdEZyaWVuZHMsXHJcblx0XHRcdFx0J21lL2ZvbGxvd2Vycyc6IGZvcm1hdEZyaWVuZHMsXHJcblx0XHRcdFx0J21lL3Bob3Rvcyc6IGZ1bmN0aW9uKG8pIHtcclxuXHJcblx0XHRcdFx0XHRmb3JtYXRFcnJvcihvKTtcclxuXHRcdFx0XHRcdHBhZ2luZyhvKTtcclxuXHJcblx0XHRcdFx0XHRpZiAoJ2RhdGEnIGluIG8pIHtcclxuXHRcdFx0XHRcdFx0by5kYXRhID0gby5kYXRhLmZpbHRlcihmdW5jdGlvbihkKSB7XHJcblx0XHRcdFx0XHRcdFx0cmV0dXJuIGQudHlwZSA9PT0gJ2ltYWdlJztcclxuXHRcdFx0XHRcdFx0fSk7XHJcblxyXG5cdFx0XHRcdFx0XHRvLmRhdGEuZm9yRWFjaChmdW5jdGlvbihkKSB7XHJcblx0XHRcdFx0XHRcdFx0ZC5uYW1lID0gZC5jYXB0aW9uID8gZC5jYXB0aW9uLnRleHQgOiBudWxsO1xyXG5cdFx0XHRcdFx0XHRcdGQudGh1bWJuYWlsID0gZC5pbWFnZXMudGh1bWJuYWlsLnVybDtcclxuXHRcdFx0XHRcdFx0XHRkLnBpY3R1cmUgPSBkLmltYWdlcy5zdGFuZGFyZF9yZXNvbHV0aW9uLnVybDtcclxuXHRcdFx0XHRcdFx0XHRkLnBpY3R1cmVzID0gT2JqZWN0LmtleXMoZC5pbWFnZXMpXHJcblx0XHRcdFx0XHRcdFx0XHQubWFwKGZ1bmN0aW9uKGtleSkge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHR2YXIgaW1hZ2UgPSBkLmltYWdlc1trZXldO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gZm9ybWF0SW1hZ2UoaW1hZ2UpO1xyXG5cdFx0XHRcdFx0XHRcdFx0fSlcclxuXHRcdFx0XHRcdFx0XHRcdC5zb3J0KGZ1bmN0aW9uKGEsIGIpIHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0cmV0dXJuIGEud2lkdGggLSBiLndpZHRoO1xyXG5cdFx0XHRcdFx0XHRcdFx0fSk7XHJcblx0XHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdHJldHVybiBvO1xyXG5cdFx0XHRcdH0sXHJcblxyXG5cdFx0XHRcdCdkZWZhdWx0JzogZnVuY3Rpb24obykge1xyXG5cdFx0XHRcdFx0byA9IGZvcm1hdEVycm9yKG8pO1xyXG5cdFx0XHRcdFx0cGFnaW5nKG8pO1xyXG5cdFx0XHRcdFx0cmV0dXJuIG87XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9LFxyXG5cclxuXHRcdFx0Ly8gSW5zdGFncmFtIGRvZXMgbm90IHJldHVybiBhbnkgQ09SUyBIZWFkZXJzXHJcblx0XHRcdC8vIFNvIGJlc2lkZXMgSlNPTlAgd2UncmUgc3R1Y2sgd2l0aCBwcm94eVxyXG5cdFx0XHR4aHI6IGZ1bmN0aW9uKHAsIHFzKSB7XHJcblxyXG5cdFx0XHRcdHZhciBtZXRob2QgPSBwLm1ldGhvZDtcclxuXHRcdFx0XHR2YXIgcHJveHkgPSBtZXRob2QgIT09ICdnZXQnO1xyXG5cclxuXHRcdFx0XHRpZiAocHJveHkpIHtcclxuXHJcblx0XHRcdFx0XHRpZiAoKG1ldGhvZCA9PT0gJ3Bvc3QnIHx8IG1ldGhvZCA9PT0gJ3B1dCcpICYmIHAucXVlcnkuYWNjZXNzX3Rva2VuKSB7XHJcblx0XHRcdFx0XHRcdHAuZGF0YS5hY2Nlc3NfdG9rZW4gPSBwLnF1ZXJ5LmFjY2Vzc190b2tlbjtcclxuXHRcdFx0XHRcdFx0ZGVsZXRlIHAucXVlcnkuYWNjZXNzX3Rva2VuO1xyXG5cdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdC8vIE5vIGFjY2VzcyBjb250cm9sIGhlYWRlcnNcclxuXHRcdFx0XHRcdC8vIFVzZSB0aGUgcHJveHkgaW5zdGVhZFxyXG5cdFx0XHRcdFx0cC5wcm94eSA9IHByb3h5O1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0cmV0dXJuIHByb3h5O1xyXG5cdFx0XHR9LFxyXG5cclxuXHRcdFx0Ly8gTm8gZm9ybVxyXG5cdFx0XHRmb3JtOiBmYWxzZVxyXG5cdFx0fVxyXG5cdH0pO1xyXG5cclxuXHRmdW5jdGlvbiBmb3JtYXRJbWFnZShpbWFnZSkge1xyXG5cdFx0cmV0dXJuIHtcclxuXHRcdFx0c291cmNlOiBpbWFnZS51cmwsXHJcblx0XHRcdHdpZHRoOiBpbWFnZS53aWR0aCxcclxuXHRcdFx0aGVpZ2h0OiBpbWFnZS5oZWlnaHRcclxuXHRcdH07XHJcblx0fVxyXG5cclxuXHRmdW5jdGlvbiBmb3JtYXRFcnJvcihvKSB7XHJcblx0XHRpZiAodHlwZW9mIG8gPT09ICdzdHJpbmcnKSB7XHJcblx0XHRcdHJldHVybiB7XHJcblx0XHRcdFx0ZXJyb3I6IHtcclxuXHRcdFx0XHRcdGNvZGU6ICdpbnZhbGlkX3JlcXVlc3QnLFxyXG5cdFx0XHRcdFx0bWVzc2FnZTogb1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fTtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAobyAmJiAnbWV0YScgaW4gbyAmJiAnZXJyb3JfdHlwZScgaW4gby5tZXRhKSB7XHJcblx0XHRcdG8uZXJyb3IgPSB7XHJcblx0XHRcdFx0Y29kZTogby5tZXRhLmVycm9yX3R5cGUsXHJcblx0XHRcdFx0bWVzc2FnZTogby5tZXRhLmVycm9yX21lc3NhZ2VcclxuXHRcdFx0fTtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gbztcclxuXHR9XHJcblxyXG5cdGZ1bmN0aW9uIGZvcm1hdEZyaWVuZHMobykge1xyXG5cdFx0cGFnaW5nKG8pO1xyXG5cdFx0aWYgKG8gJiYgJ2RhdGEnIGluIG8pIHtcclxuXHRcdFx0by5kYXRhLmZvckVhY2goZm9ybWF0RnJpZW5kKTtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gbztcclxuXHR9XHJcblxyXG5cdGZ1bmN0aW9uIGZvcm1hdEZyaWVuZChvKSB7XHJcblx0XHRpZiAoby5pZCkge1xyXG5cdFx0XHRvLnRodW1ibmFpbCA9IG8ucHJvZmlsZV9waWN0dXJlO1xyXG5cdFx0XHRvLm5hbWUgPSBvLmZ1bGxfbmFtZSB8fCBvLnVzZXJuYW1lO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0Ly8gU2VlOiBodHRwOi8vaW5zdGFncmFtLmNvbS9kZXZlbG9wZXIvZW5kcG9pbnRzL1xyXG5cdGZ1bmN0aW9uIHBhZ2luZyhyZXMpIHtcclxuXHRcdGlmICgncGFnaW5hdGlvbicgaW4gcmVzKSB7XHJcblx0XHRcdHJlcy5wYWdpbmcgPSB7XHJcblx0XHRcdFx0bmV4dDogcmVzLnBhZ2luYXRpb24ubmV4dF91cmxcclxuXHRcdFx0fTtcclxuXHRcdFx0ZGVsZXRlIHJlcy5wYWdpbmF0aW9uO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcbn0pKGhlbGxvKTtcclxuXHJcbihmdW5jdGlvbihoZWxsbykge1xyXG5cclxuXHRoZWxsby5pbml0KHtcclxuXHJcblx0XHRqb2lubWU6IHtcclxuXHJcblx0XHRcdG5hbWU6ICdqb2luLm1lJyxcclxuXHJcblx0XHRcdG9hdXRoOiB7XHJcblx0XHRcdFx0dmVyc2lvbjogMixcclxuXHRcdFx0XHRhdXRoOiAnaHR0cHM6Ly9zZWN1cmUuam9pbi5tZS9hcGkvcHVibGljL3YxL2F1dGgvb2F1dGgyJyxcclxuXHRcdFx0XHRncmFudDogJ2h0dHBzOi8vc2VjdXJlLmpvaW4ubWUvYXBpL3B1YmxpYy92MS9hdXRoL29hdXRoMidcclxuXHRcdFx0fSxcclxuXHJcblx0XHRcdHJlZnJlc2g6IGZhbHNlLFxyXG5cclxuXHRcdFx0c2NvcGU6IHtcclxuXHRcdFx0XHRiYXNpYzogJ3VzZXJfaW5mbycsXHJcblx0XHRcdFx0dXNlcjogJ3VzZXJfaW5mbycsXHJcblx0XHRcdFx0c2NoZWR1bGVyOiAnc2NoZWR1bGVyJyxcclxuXHRcdFx0XHRzdGFydDogJ3N0YXJ0X21lZXRpbmcnLFxyXG5cdFx0XHRcdGVtYWlsOiAnJyxcclxuXHRcdFx0XHRmcmllbmRzOiAnJyxcclxuXHRcdFx0XHRzaGFyZTogJycsXHJcblx0XHRcdFx0cHVibGlzaDogJycsXHJcblx0XHRcdFx0cGhvdG9zOiAnJyxcclxuXHRcdFx0XHRwdWJsaXNoX2ZpbGVzOiAnJyxcclxuXHRcdFx0XHRmaWxlczogJycsXHJcblx0XHRcdFx0dmlkZW9zOiAnJyxcclxuXHRcdFx0XHRvZmZsaW5lX2FjY2VzczogJydcclxuXHRcdFx0fSxcclxuXHJcblx0XHRcdHNjb3BlX2RlbGltOiAnICcsXHJcblxyXG5cdFx0XHRsb2dpbjogZnVuY3Rpb24ocCkge1xyXG5cdFx0XHRcdHAub3B0aW9ucy5wb3B1cC53aWR0aCA9IDQwMDtcclxuXHRcdFx0XHRwLm9wdGlvbnMucG9wdXAuaGVpZ2h0ID0gNzAwO1xyXG5cdFx0XHR9LFxyXG5cclxuXHRcdFx0YmFzZTogJ2h0dHBzOi8vYXBpLmpvaW4ubWUvdjEvJyxcclxuXHJcblx0XHRcdGdldDoge1xyXG5cdFx0XHRcdG1lOiAndXNlcicsXHJcblx0XHRcdFx0bWVldGluZ3M6ICdtZWV0aW5ncycsXHJcblx0XHRcdFx0J21lZXRpbmdzL2luZm8nOiAnbWVldGluZ3MvQHtpZH0nXHJcblx0XHRcdH0sXHJcblxyXG5cdFx0XHRwb3N0OiB7XHJcblx0XHRcdFx0J21lZXRpbmdzL3N0YXJ0L2FkaG9jJzogZnVuY3Rpb24ocCwgY2FsbGJhY2spIHtcclxuXHRcdFx0XHRcdGNhbGxiYWNrKCdtZWV0aW5ncy9zdGFydCcpO1xyXG5cdFx0XHRcdH0sXHJcblxyXG5cdFx0XHRcdCdtZWV0aW5ncy9zdGFydC9zY2hlZHVsZWQnOiBmdW5jdGlvbihwLCBjYWxsYmFjaykge1xyXG5cdFx0XHRcdFx0dmFyIG1lZXRpbmdJZCA9IHAuZGF0YS5tZWV0aW5nSWQ7XHJcblx0XHRcdFx0XHRwLmRhdGEgPSB7fTtcclxuXHRcdFx0XHRcdGNhbGxiYWNrKCdtZWV0aW5ncy8nICsgbWVldGluZ0lkICsgJy9zdGFydCcpO1xyXG5cdFx0XHRcdH0sXHJcblxyXG5cdFx0XHRcdCdtZWV0aW5ncy9zY2hlZHVsZSc6IGZ1bmN0aW9uKHAsIGNhbGxiYWNrKSB7XHJcblx0XHRcdFx0XHRjYWxsYmFjaygnbWVldGluZ3MnKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0sXHJcblxyXG5cdFx0XHRwYXRjaDoge1xyXG5cdFx0XHRcdCdtZWV0aW5ncy91cGRhdGUnOiBmdW5jdGlvbihwLCBjYWxsYmFjaykge1xyXG5cdFx0XHRcdFx0Y2FsbGJhY2soJ21lZXRpbmdzLycgKyBwLmRhdGEubWVldGluZ0lkKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0sXHJcblxyXG5cdFx0XHRkZWw6IHtcclxuXHRcdFx0XHQnbWVldGluZ3MvZGVsZXRlJzogJ21lZXRpbmdzL0B7aWR9J1xyXG5cdFx0XHR9LFxyXG5cclxuXHRcdFx0d3JhcDoge1xyXG5cdFx0XHRcdG1lOiBmdW5jdGlvbihvLCBoZWFkZXJzKSB7XHJcblx0XHRcdFx0XHRmb3JtYXRFcnJvcihvLCBoZWFkZXJzKTtcclxuXHJcblx0XHRcdFx0XHRpZiAoIW8uZW1haWwpIHtcclxuXHRcdFx0XHRcdFx0cmV0dXJuIG87XHJcblx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0by5uYW1lID0gby5mdWxsTmFtZTtcclxuXHRcdFx0XHRcdG8uZmlyc3RfbmFtZSA9IG8ubmFtZS5zcGxpdCgnICcpWzBdO1xyXG5cdFx0XHRcdFx0by5sYXN0X25hbWUgPSBvLm5hbWUuc3BsaXQoJyAnKVsxXTtcclxuXHRcdFx0XHRcdG8uaWQgPSBvLmVtYWlsO1xyXG5cclxuXHRcdFx0XHRcdHJldHVybiBvO1xyXG5cdFx0XHRcdH0sXHJcblxyXG5cdFx0XHRcdCdkZWZhdWx0JzogZnVuY3Rpb24obywgaGVhZGVycykge1xyXG5cdFx0XHRcdFx0Zm9ybWF0RXJyb3IobywgaGVhZGVycyk7XHJcblxyXG5cdFx0XHRcdFx0cmV0dXJuIG87XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9LFxyXG5cclxuXHRcdFx0eGhyOiBmb3JtYXRSZXF1ZXN0XHJcblxyXG5cdFx0fVxyXG5cdH0pO1xyXG5cclxuXHRmdW5jdGlvbiBmb3JtYXRFcnJvcihvLCBoZWFkZXJzKSB7XHJcblx0XHR2YXIgZXJyb3JDb2RlO1xyXG5cdFx0dmFyIG1lc3NhZ2U7XHJcblx0XHR2YXIgZGV0YWlscztcclxuXHJcblx0XHRpZiAobyAmJiAoJ01lc3NhZ2UnIGluIG8pKSB7XHJcblx0XHRcdG1lc3NhZ2UgPSBvLk1lc3NhZ2U7XHJcblx0XHRcdGRlbGV0ZSBvLk1lc3NhZ2U7XHJcblxyXG5cdFx0XHRpZiAoJ0Vycm9yQ29kZScgaW4gbykge1xyXG5cdFx0XHRcdGVycm9yQ29kZSA9IG8uRXJyb3JDb2RlO1xyXG5cdFx0XHRcdGRlbGV0ZSBvLkVycm9yQ29kZTtcclxuXHRcdFx0fVxyXG5cdFx0XHRlbHNlIHtcclxuXHRcdFx0XHRlcnJvckNvZGUgPSBnZXRFcnJvckNvZGUoaGVhZGVycyk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdG8uZXJyb3IgPSB7XHJcblx0XHRcdFx0Y29kZTogZXJyb3JDb2RlLFxyXG5cdFx0XHRcdG1lc3NhZ2U6IG1lc3NhZ2UsXHJcblx0XHRcdFx0ZGV0YWlsczogb1xyXG5cdFx0XHR9O1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBvO1xyXG5cdH1cclxuXHJcblx0ZnVuY3Rpb24gZm9ybWF0UmVxdWVzdChwLCBxcykge1xyXG5cdFx0Ly8gTW92ZSB0aGUgYWNjZXNzIHRva2VuIGZyb20gdGhlIHJlcXVlc3QgYm9keSB0byB0aGUgcmVxdWVzdCBoZWFkZXJcclxuXHRcdHZhciB0b2tlbiA9IHFzLmFjY2Vzc190b2tlbjtcclxuXHRcdGRlbGV0ZSBxcy5hY2Nlc3NfdG9rZW47XHJcblx0XHRwLmhlYWRlcnMuQXV0aG9yaXphdGlvbiA9ICdCZWFyZXIgJyArIHRva2VuO1xyXG5cclxuXHRcdC8vIEZvcm1hdCBub24tZ2V0IHJlcXVlc3RzIHRvIGluZGljYXRlIGpzb24gYm9keVxyXG5cdFx0aWYgKHAubWV0aG9kICE9PSAnZ2V0JyAmJiBwLmRhdGEpIHtcclxuXHRcdFx0cC5oZWFkZXJzWydDb250ZW50LVR5cGUnXSA9ICdhcHBsaWNhdGlvbi9qc29uJztcclxuXHRcdFx0aWYgKHR5cGVvZiAocC5kYXRhKSA9PT0gJ29iamVjdCcpIHtcclxuXHRcdFx0XHRwLmRhdGEgPSBKU09OLnN0cmluZ2lmeShwLmRhdGEpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKHAubWV0aG9kID09PSAncHV0Jykge1xyXG5cdFx0XHRwLm1ldGhvZCA9ICdwYXRjaCc7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIHRydWU7XHJcblx0fVxyXG5cclxuXHRmdW5jdGlvbiBnZXRFcnJvckNvZGUoaGVhZGVycykge1xyXG5cdFx0c3dpdGNoIChoZWFkZXJzLnN0YXR1c0NvZGUpIHtcclxuXHRcdFx0Y2FzZSA0MDA6XHJcblx0XHRcdFx0cmV0dXJuICdpbnZhbGlkX3JlcXVlc3QnO1xyXG5cdFx0XHRjYXNlIDQwMzpcclxuXHRcdFx0XHRyZXR1cm4gJ3N0YWxlX3Rva2VuJztcclxuXHRcdFx0Y2FzZSA0MDE6XHJcblx0XHRcdFx0cmV0dXJuICdpbnZhbGlkX3Rva2VuJztcclxuXHRcdFx0Y2FzZSA1MDA6XHJcblx0XHRcdFx0cmV0dXJuICdzZXJ2ZXJfZXJyb3InO1xyXG5cdFx0XHRkZWZhdWx0OlxyXG5cdFx0XHRcdHJldHVybiAnc2VydmVyX2Vycm9yJztcclxuXHRcdH1cclxuXHR9XHJcblxyXG59KGhlbGxvKSk7XHJcblxyXG4oZnVuY3Rpb24oaGVsbG8pIHtcclxuXHJcblx0aGVsbG8uaW5pdCh7XHJcblxyXG5cdFx0bGlua2VkaW46IHtcclxuXHJcblx0XHRcdG9hdXRoOiB7XHJcblx0XHRcdFx0dmVyc2lvbjogMixcclxuXHRcdFx0XHRyZXNwb25zZV90eXBlOiAnY29kZScsXHJcblx0XHRcdFx0YXV0aDogJ2h0dHBzOi8vd3d3LmxpbmtlZGluLmNvbS91YXMvb2F1dGgyL2F1dGhvcml6YXRpb24nLFxyXG5cdFx0XHRcdGdyYW50OiAnaHR0cHM6Ly93d3cubGlua2VkaW4uY29tL3Vhcy9vYXV0aDIvYWNjZXNzVG9rZW4nXHJcblx0XHRcdH0sXHJcblxyXG5cdFx0XHQvLyBSZWZyZXNoIHRoZSBhY2Nlc3NfdG9rZW4gb25jZSBleHBpcmVkXHJcblx0XHRcdHJlZnJlc2g6IHRydWUsXHJcblxyXG5cdFx0XHRzY29wZToge1xyXG5cdFx0XHRcdGJhc2ljOiAncl9iYXNpY3Byb2ZpbGUnLFxyXG5cdFx0XHRcdGVtYWlsOiAncl9lbWFpbGFkZHJlc3MnLFxyXG5cdFx0XHRcdGZpbGVzOiAnJyxcclxuXHRcdFx0XHRmcmllbmRzOiAnJyxcclxuXHRcdFx0XHRwaG90b3M6ICcnLFxyXG5cdFx0XHRcdHB1Ymxpc2g6ICd3X3NoYXJlJyxcclxuXHRcdFx0XHRwdWJsaXNoX2ZpbGVzOiAnd19zaGFyZScsXHJcblx0XHRcdFx0c2hhcmU6ICcnLFxyXG5cdFx0XHRcdHZpZGVvczogJycsXHJcblx0XHRcdFx0b2ZmbGluZV9hY2Nlc3M6ICcnXHJcblx0XHRcdH0sXHJcblx0XHRcdHNjb3BlX2RlbGltOiAnICcsXHJcblxyXG5cdFx0XHRiYXNlOiAnaHR0cHM6Ly9hcGkubGlua2VkaW4uY29tL3YxLycsXHJcblxyXG5cdFx0XHRnZXQ6IHtcclxuXHRcdFx0XHRtZTogJ3Blb3BsZS9+OihwaWN0dXJlLXVybCxmaXJzdC1uYW1lLGxhc3QtbmFtZSxpZCxmb3JtYXR0ZWQtbmFtZSxlbWFpbC1hZGRyZXNzKScsXHJcblxyXG5cdFx0XHRcdC8vIFNlZTogaHR0cDovL2RldmVsb3Blci5saW5rZWRpbi5jb20vZG9jdW1lbnRzL2dldC1uZXR3b3JrLXVwZGF0ZXMtYW5kLXN0YXRpc3RpY3MtYXBpXHJcblx0XHRcdFx0J21lL3NoYXJlJzogJ3Blb3BsZS9+L25ldHdvcmsvdXBkYXRlcz9jb3VudD1Ae2xpbWl0fDI1MH0nXHJcblx0XHRcdH0sXHJcblxyXG5cdFx0XHRwb3N0OiB7XHJcblxyXG5cdFx0XHRcdC8vIFNlZTogaHR0cHM6Ly9kZXZlbG9wZXIubGlua2VkaW4uY29tL2RvY3VtZW50cy9hcGktcmVxdWVzdHMtanNvblxyXG5cdFx0XHRcdCdtZS9zaGFyZSc6IGZ1bmN0aW9uKHAsIGNhbGxiYWNrKSB7XHJcblx0XHRcdFx0XHR2YXIgZGF0YSA9IHtcclxuXHRcdFx0XHRcdFx0dmlzaWJpbGl0eToge1xyXG5cdFx0XHRcdFx0XHRcdGNvZGU6ICdhbnlvbmUnXHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdH07XHJcblxyXG5cdFx0XHRcdFx0aWYgKHAuZGF0YS5pZCkge1xyXG5cclxuXHRcdFx0XHRcdFx0ZGF0YS5hdHRyaWJ1dGlvbiA9IHtcclxuXHRcdFx0XHRcdFx0XHRzaGFyZToge1xyXG5cdFx0XHRcdFx0XHRcdFx0aWQ6IHAuZGF0YS5pZFxyXG5cdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0fTtcclxuXHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRlbHNlIHtcclxuXHRcdFx0XHRcdFx0ZGF0YS5jb21tZW50ID0gcC5kYXRhLm1lc3NhZ2U7XHJcblx0XHRcdFx0XHRcdGlmIChwLmRhdGEucGljdHVyZSAmJiBwLmRhdGEubGluaykge1xyXG5cdFx0XHRcdFx0XHRcdGRhdGEuY29udGVudCA9IHtcclxuXHRcdFx0XHRcdFx0XHRcdCdzdWJtaXR0ZWQtdXJsJzogcC5kYXRhLmxpbmssXHJcblx0XHRcdFx0XHRcdFx0XHQnc3VibWl0dGVkLWltYWdlLXVybCc6IHAuZGF0YS5waWN0dXJlXHJcblx0XHRcdFx0XHRcdFx0fTtcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdHAuZGF0YSA9IEpTT04uc3RyaW5naWZ5KGRhdGEpO1xyXG5cclxuXHRcdFx0XHRcdGNhbGxiYWNrKCdwZW9wbGUvfi9zaGFyZXM/Zm9ybWF0PWpzb24nKTtcclxuXHRcdFx0XHR9LFxyXG5cclxuXHRcdFx0XHQnbWUvbGlrZSc6IGxpa2VcclxuXHRcdFx0fSxcclxuXHJcblx0XHRcdGRlbDp7XHJcblx0XHRcdFx0J21lL2xpa2UnOiBsaWtlXHJcblx0XHRcdH0sXHJcblxyXG5cdFx0XHR3cmFwOiB7XHJcblx0XHRcdFx0bWU6IGZ1bmN0aW9uKG8pIHtcclxuXHRcdFx0XHRcdGZvcm1hdEVycm9yKG8pO1xyXG5cdFx0XHRcdFx0Zm9ybWF0VXNlcihvKTtcclxuXHRcdFx0XHRcdHJldHVybiBvO1xyXG5cdFx0XHRcdH0sXHJcblxyXG5cdFx0XHRcdCdtZS9mcmllbmRzJzogZm9ybWF0RnJpZW5kcyxcclxuXHRcdFx0XHQnbWUvZm9sbG93aW5nJzogZm9ybWF0RnJpZW5kcyxcclxuXHRcdFx0XHQnbWUvZm9sbG93ZXJzJzogZm9ybWF0RnJpZW5kcyxcclxuXHRcdFx0XHQnbWUvc2hhcmUnOiBmdW5jdGlvbihvKSB7XHJcblx0XHRcdFx0XHRmb3JtYXRFcnJvcihvKTtcclxuXHRcdFx0XHRcdHBhZ2luZyhvKTtcclxuXHRcdFx0XHRcdGlmIChvLnZhbHVlcykge1xyXG5cdFx0XHRcdFx0XHRvLmRhdGEgPSBvLnZhbHVlcy5tYXAoZm9ybWF0VXNlcik7XHJcblx0XHRcdFx0XHRcdG8uZGF0YS5mb3JFYWNoKGZ1bmN0aW9uKGl0ZW0pIHtcclxuXHRcdFx0XHRcdFx0XHRpdGVtLm1lc3NhZ2UgPSBpdGVtLmhlYWRsaW5lO1xyXG5cdFx0XHRcdFx0XHR9KTtcclxuXHJcblx0XHRcdFx0XHRcdGRlbGV0ZSBvLnZhbHVlcztcclxuXHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHRyZXR1cm4gbztcclxuXHRcdFx0XHR9LFxyXG5cclxuXHRcdFx0XHQnZGVmYXVsdCc6IGZ1bmN0aW9uKG8sIGhlYWRlcnMpIHtcclxuXHRcdFx0XHRcdGZvcm1hdEVycm9yKG8pO1xyXG5cdFx0XHRcdFx0ZW1wdHkobywgaGVhZGVycyk7XHJcblx0XHRcdFx0XHRwYWdpbmcobyk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9LFxyXG5cclxuXHRcdFx0anNvbnA6IGZ1bmN0aW9uKHAsIHFzKSB7XHJcblx0XHRcdFx0Zm9ybWF0UXVlcnkocXMpO1xyXG5cdFx0XHRcdGlmIChwLm1ldGhvZCA9PT0gJ2dldCcpIHtcclxuXHRcdFx0XHRcdHFzLmZvcm1hdCA9ICdqc29ucCc7XHJcblx0XHRcdFx0XHRxc1snZXJyb3ItY2FsbGJhY2snXSA9IHAuY2FsbGJhY2tJRDtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0sXHJcblxyXG5cdFx0XHR4aHI6IGZ1bmN0aW9uKHAsIHFzKSB7XHJcblx0XHRcdFx0aWYgKHAubWV0aG9kICE9PSAnZ2V0Jykge1xyXG5cdFx0XHRcdFx0Zm9ybWF0UXVlcnkocXMpO1xyXG5cdFx0XHRcdFx0cC5oZWFkZXJzWydDb250ZW50LVR5cGUnXSA9ICdhcHBsaWNhdGlvbi9qc29uJztcclxuXHJcblx0XHRcdFx0XHQvLyBOb3RlOiB4LWxpLWZvcm1hdCBlbnN1cmVzIGVycm9yIHJlc3BvbnNlcyBhcmUgbm90IHJldHVybmVkIGluIFhNTFxyXG5cdFx0XHRcdFx0cC5oZWFkZXJzWyd4LWxpLWZvcm1hdCddID0gJ2pzb24nO1xyXG5cdFx0XHRcdFx0cC5wcm94eSA9IHRydWU7XHJcblx0XHRcdFx0XHRyZXR1cm4gdHJ1ZTtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH0pO1xyXG5cclxuXHRmdW5jdGlvbiBmb3JtYXRFcnJvcihvKSB7XHJcblx0XHRpZiAobyAmJiAnZXJyb3JDb2RlJyBpbiBvKSB7XHJcblx0XHRcdG8uZXJyb3IgPSB7XHJcblx0XHRcdFx0Y29kZTogby5zdGF0dXMsXHJcblx0XHRcdFx0bWVzc2FnZTogby5tZXNzYWdlXHJcblx0XHRcdH07XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRmdW5jdGlvbiBmb3JtYXRVc2VyKG8pIHtcclxuXHRcdGlmIChvLmVycm9yKSB7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHJcblx0XHRvLmZpcnN0X25hbWUgPSBvLmZpcnN0TmFtZTtcclxuXHRcdG8ubGFzdF9uYW1lID0gby5sYXN0TmFtZTtcclxuXHRcdG8ubmFtZSA9IG8uZm9ybWF0dGVkTmFtZSB8fCAoby5maXJzdF9uYW1lICsgJyAnICsgby5sYXN0X25hbWUpO1xyXG5cdFx0by50aHVtYm5haWwgPSBvLnBpY3R1cmVVcmw7XHJcblx0XHRvLmVtYWlsID0gby5lbWFpbEFkZHJlc3M7XHJcblx0XHRyZXR1cm4gbztcclxuXHR9XHJcblxyXG5cdGZ1bmN0aW9uIGZvcm1hdEZyaWVuZHMobykge1xyXG5cdFx0Zm9ybWF0RXJyb3Iobyk7XHJcblx0XHRwYWdpbmcobyk7XHJcblx0XHRpZiAoby52YWx1ZXMpIHtcclxuXHRcdFx0by5kYXRhID0gby52YWx1ZXMubWFwKGZvcm1hdFVzZXIpO1xyXG5cdFx0XHRkZWxldGUgby52YWx1ZXM7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIG87XHJcblx0fVxyXG5cclxuXHRmdW5jdGlvbiBwYWdpbmcocmVzKSB7XHJcblx0XHRpZiAoJ19jb3VudCcgaW4gcmVzICYmICdfc3RhcnQnIGluIHJlcyAmJiAocmVzLl9jb3VudCArIHJlcy5fc3RhcnQpIDwgcmVzLl90b3RhbCkge1xyXG5cdFx0XHRyZXMucGFnaW5nID0ge1xyXG5cdFx0XHRcdG5leHQ6ICc/c3RhcnQ9JyArIChyZXMuX3N0YXJ0ICsgcmVzLl9jb3VudCkgKyAnJmNvdW50PScgKyByZXMuX2NvdW50XHJcblx0XHRcdH07XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRmdW5jdGlvbiBlbXB0eShvLCBoZWFkZXJzKSB7XHJcblx0XHRpZiAoSlNPTi5zdHJpbmdpZnkobykgPT09ICd7fScgJiYgaGVhZGVycy5zdGF0dXNDb2RlID09PSAyMDApIHtcclxuXHRcdFx0by5zdWNjZXNzID0gdHJ1ZTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGZ1bmN0aW9uIGZvcm1hdFF1ZXJ5KHFzKSB7XHJcblx0XHQvLyBMaW5rZWRJbiBzaWducyByZXF1ZXN0cyB3aXRoIHRoZSBwYXJhbWV0ZXIgJ29hdXRoMl9hY2Nlc3NfdG9rZW4nXHJcblx0XHQvLyAuLi4geWVhaCBhbm90aGVyIG9uZSB3aG8gdGhpbmtzIHRoZXkgc2hvdWxkIGJlIGRpZmZlcmVudCFcclxuXHRcdGlmIChxcy5hY2Nlc3NfdG9rZW4pIHtcclxuXHRcdFx0cXMub2F1dGgyX2FjY2Vzc190b2tlbiA9IHFzLmFjY2Vzc190b2tlbjtcclxuXHRcdFx0ZGVsZXRlIHFzLmFjY2Vzc190b2tlbjtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGZ1bmN0aW9uIGxpa2UocCwgY2FsbGJhY2spIHtcclxuXHRcdHAuaGVhZGVyc1sneC1saS1mb3JtYXQnXSA9ICdqc29uJztcclxuXHRcdHZhciBpZCA9IHAuZGF0YS5pZDtcclxuXHRcdHAuZGF0YSA9IChwLm1ldGhvZCAhPT0gJ2RlbGV0ZScpLnRvU3RyaW5nKCk7XHJcblx0XHRwLm1ldGhvZCA9ICdwdXQnO1xyXG5cdFx0Y2FsbGJhY2soJ3Blb3BsZS9+L25ldHdvcmsvdXBkYXRlcy9rZXk9JyArIGlkICsgJy9pcy1saWtlZCcpO1xyXG5cdH1cclxuXHJcbn0pKGhlbGxvKTtcclxuXHJcbi8vIFNlZTogaHR0cHM6Ly9kZXZlbG9wZXJzLnNvdW5kY2xvdWQuY29tL2RvY3MvYXBpL3JlZmVyZW5jZVxyXG4oZnVuY3Rpb24oaGVsbG8pIHtcclxuXHJcblx0aGVsbG8uaW5pdCh7XHJcblxyXG5cdFx0c291bmRjbG91ZDoge1xyXG5cdFx0XHRuYW1lOiAnU291bmRDbG91ZCcsXHJcblxyXG5cdFx0XHRvYXV0aDoge1xyXG5cdFx0XHRcdHZlcnNpb246IDIsXHJcblx0XHRcdFx0YXV0aDogJ2h0dHBzOi8vc291bmRjbG91ZC5jb20vY29ubmVjdCcsXHJcblx0XHRcdFx0Z3JhbnQ6ICdodHRwczovL3NvdW5kY2xvdWQuY29tL29hdXRoMi90b2tlbidcclxuXHRcdFx0fSxcclxuXHJcblx0XHRcdC8vIFJlcXVlc3QgcGF0aCB0cmFuc2xhdGVkXHJcblx0XHRcdGJhc2U6ICdodHRwczovL2FwaS5zb3VuZGNsb3VkLmNvbS8nLFxyXG5cdFx0XHRnZXQ6IHtcclxuXHRcdFx0XHRtZTogJ21lLmpzb24nLFxyXG5cclxuXHRcdFx0XHQvLyBIdHRwOi8vZGV2ZWxvcGVycy5zb3VuZGNsb3VkLmNvbS9kb2NzL2FwaS9yZWZlcmVuY2UjbWVcclxuXHRcdFx0XHQnbWUvZnJpZW5kcyc6ICdtZS9mb2xsb3dpbmdzLmpzb24nLFxyXG5cdFx0XHRcdCdtZS9mb2xsb3dlcnMnOiAnbWUvZm9sbG93ZXJzLmpzb24nLFxyXG5cdFx0XHRcdCdtZS9mb2xsb3dpbmcnOiAnbWUvZm9sbG93aW5ncy5qc29uJyxcclxuXHJcblx0XHRcdFx0Ly8gU2VlOiBodHRwOi8vZGV2ZWxvcGVycy5zb3VuZGNsb3VkLmNvbS9kb2NzL2FwaS9yZWZlcmVuY2UjYWN0aXZpdGllc1xyXG5cdFx0XHRcdCdkZWZhdWx0JzogZnVuY3Rpb24ocCwgY2FsbGJhY2spIHtcclxuXHJcblx0XHRcdFx0XHQvLyBJbmNsdWRlICcuanNvbiBhdCB0aGUgZW5kIG9mIGVhY2ggcmVxdWVzdCdcclxuXHRcdFx0XHRcdGNhbGxiYWNrKHAucGF0aCArICcuanNvbicpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSxcclxuXHJcblx0XHRcdC8vIFJlc3BvbnNlIGhhbmRsZXJzXHJcblx0XHRcdHdyYXA6IHtcclxuXHRcdFx0XHRtZTogZnVuY3Rpb24obykge1xyXG5cdFx0XHRcdFx0Zm9ybWF0VXNlcihvKTtcclxuXHRcdFx0XHRcdHJldHVybiBvO1xyXG5cdFx0XHRcdH0sXHJcblxyXG5cdFx0XHRcdCdkZWZhdWx0JzogZnVuY3Rpb24obykge1xyXG5cdFx0XHRcdFx0aWYgKEFycmF5LmlzQXJyYXkobykpIHtcclxuXHRcdFx0XHRcdFx0byA9IHtcclxuXHRcdFx0XHRcdFx0XHRkYXRhOiBvLm1hcChmb3JtYXRVc2VyKVxyXG5cdFx0XHRcdFx0XHR9O1xyXG5cdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdHBhZ2luZyhvKTtcclxuXHRcdFx0XHRcdHJldHVybiBvO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSxcclxuXHJcblx0XHRcdHhocjogZm9ybWF0UmVxdWVzdCxcclxuXHRcdFx0anNvbnA6IGZvcm1hdFJlcXVlc3RcclxuXHRcdH1cclxuXHR9KTtcclxuXHJcblx0ZnVuY3Rpb24gZm9ybWF0UmVxdWVzdChwLCBxcykge1xyXG5cdFx0Ly8gQWx0ZXIgdGhlIHF1ZXJ5c3RyaW5nXHJcblx0XHR2YXIgdG9rZW4gPSBxcy5hY2Nlc3NfdG9rZW47XHJcblx0XHRkZWxldGUgcXMuYWNjZXNzX3Rva2VuO1xyXG5cdFx0cXMub2F1dGhfdG9rZW4gPSB0b2tlbjtcclxuXHRcdHFzWydfc3RhdHVzX2NvZGVfbWFwWzMwMl0nXSA9IDIwMDtcclxuXHRcdHJldHVybiB0cnVlO1xyXG5cdH1cclxuXHJcblx0ZnVuY3Rpb24gZm9ybWF0VXNlcihvKSB7XHJcblx0XHRpZiAoby5pZCkge1xyXG5cdFx0XHRvLnBpY3R1cmUgPSBvLmF2YXRhcl91cmw7XHJcblx0XHRcdG8udGh1bWJuYWlsID0gby5hdmF0YXJfdXJsO1xyXG5cdFx0XHRvLm5hbWUgPSBvLnVzZXJuYW1lIHx8IG8uZnVsbF9uYW1lO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBvO1xyXG5cdH1cclxuXHJcblx0Ly8gU2VlOiBodHRwOi8vZGV2ZWxvcGVycy5zb3VuZGNsb3VkLmNvbS9kb2NzL2FwaS9yZWZlcmVuY2UjYWN0aXZpdGllc1xyXG5cdGZ1bmN0aW9uIHBhZ2luZyhyZXMpIHtcclxuXHRcdGlmICgnbmV4dF9ocmVmJyBpbiByZXMpIHtcclxuXHRcdFx0cmVzLnBhZ2luZyA9IHtcclxuXHRcdFx0XHRuZXh0OiByZXMubmV4dF9ocmVmXHJcblx0XHRcdH07XHJcblx0XHR9XHJcblx0fVxyXG5cclxufSkoaGVsbG8pO1xyXG5cclxuKGZ1bmN0aW9uKGhlbGxvKSB7XHJcblxyXG5cdHZhciBiYXNlID0gJ2h0dHBzOi8vYXBpLnR3aXR0ZXIuY29tLyc7XHJcblxyXG5cdGhlbGxvLmluaXQoe1xyXG5cclxuXHRcdHR3aXR0ZXI6IHtcclxuXHJcblx0XHRcdC8vIEVuc3VyZSB0aGF0IHlvdSBkZWZpbmUgYW4gb2F1dGhfcHJveHlcclxuXHRcdFx0b2F1dGg6IHtcclxuXHRcdFx0XHR2ZXJzaW9uOiAnMS4wYScsXHJcblx0XHRcdFx0YXV0aDogYmFzZSArICdvYXV0aC9hdXRoZW50aWNhdGUnLFxyXG5cdFx0XHRcdHJlcXVlc3Q6IGJhc2UgKyAnb2F1dGgvcmVxdWVzdF90b2tlbicsXHJcblx0XHRcdFx0dG9rZW46IGJhc2UgKyAnb2F1dGgvYWNjZXNzX3Rva2VuJ1xyXG5cdFx0XHR9LFxyXG5cclxuXHRcdFx0bG9naW46IGZ1bmN0aW9uKHApIHtcclxuXHRcdFx0XHQvLyBSZWF1dGhlbnRpY2F0ZVxyXG5cdFx0XHRcdC8vIGh0dHBzOi8vZGV2LnR3aXR0ZXIuY29tL29hdXRoL3JlZmVyZW5jZS9nZXQvb2F1dGgvYXV0aGVudGljYXRlXHJcblx0XHRcdFx0dmFyIHByZWZpeCA9ICc/Zm9yY2VfbG9naW49dHJ1ZSc7XHJcblx0XHRcdFx0dGhpcy5vYXV0aC5hdXRoID0gdGhpcy5vYXV0aC5hdXRoLnJlcGxhY2UocHJlZml4LCAnJykgKyAocC5vcHRpb25zLmZvcmNlID8gcHJlZml4IDogJycpO1xyXG5cdFx0XHR9LFxyXG5cclxuXHRcdFx0YmFzZTogYmFzZSArICcxLjEvJyxcclxuXHJcblx0XHRcdGdldDoge1xyXG5cdFx0XHRcdG1lOiAnYWNjb3VudC92ZXJpZnlfY3JlZGVudGlhbHMuanNvbicsXHJcblx0XHRcdFx0J21lL2ZyaWVuZHMnOiAnZnJpZW5kcy9saXN0Lmpzb24/Y291bnQ9QHtsaW1pdHwyMDB9JyxcclxuXHRcdFx0XHQnbWUvZm9sbG93aW5nJzogJ2ZyaWVuZHMvbGlzdC5qc29uP2NvdW50PUB7bGltaXR8MjAwfScsXHJcblx0XHRcdFx0J21lL2ZvbGxvd2Vycyc6ICdmb2xsb3dlcnMvbGlzdC5qc29uP2NvdW50PUB7bGltaXR8MjAwfScsXHJcblxyXG5cdFx0XHRcdC8vIEh0dHBzOi8vZGV2LnR3aXR0ZXIuY29tL2RvY3MvYXBpLzEuMS9nZXQvc3RhdHVzZXMvdXNlcl90aW1lbGluZVxyXG5cdFx0XHRcdCdtZS9zaGFyZSc6ICdzdGF0dXNlcy91c2VyX3RpbWVsaW5lLmpzb24/Y291bnQ9QHtsaW1pdHwyMDB9JyxcclxuXHJcblx0XHRcdFx0Ly8gSHR0cHM6Ly9kZXYudHdpdHRlci5jb20vcmVzdC9yZWZlcmVuY2UvZ2V0L2Zhdm9yaXRlcy9saXN0XHJcblx0XHRcdFx0J21lL2xpa2UnOiAnZmF2b3JpdGVzL2xpc3QuanNvbj9jb3VudD1Ae2xpbWl0fDIwMH0nXHJcblx0XHRcdH0sXHJcblxyXG5cdFx0XHRwb3N0OiB7XHJcblx0XHRcdFx0J21lL3NoYXJlJzogZnVuY3Rpb24ocCwgY2FsbGJhY2spIHtcclxuXHJcblx0XHRcdFx0XHR2YXIgZGF0YSA9IHAuZGF0YTtcclxuXHRcdFx0XHRcdHAuZGF0YSA9IG51bGw7XHJcblxyXG5cdFx0XHRcdFx0dmFyIHN0YXR1cyA9IFtdO1xyXG5cclxuXHRcdFx0XHRcdC8vIENoYW5nZSBtZXNzYWdlIHRvIHN0YXR1c1xyXG5cdFx0XHRcdFx0aWYgKGRhdGEubWVzc2FnZSkge1xyXG5cdFx0XHRcdFx0XHRzdGF0dXMucHVzaChkYXRhLm1lc3NhZ2UpO1xyXG5cdFx0XHRcdFx0XHRkZWxldGUgZGF0YS5tZXNzYWdlO1xyXG5cdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdC8vIElmIGxpbmsgaXMgZ2l2ZW5cclxuXHRcdFx0XHRcdGlmIChkYXRhLmxpbmspIHtcclxuXHRcdFx0XHRcdFx0c3RhdHVzLnB1c2goZGF0YS5saW5rKTtcclxuXHRcdFx0XHRcdFx0ZGVsZXRlIGRhdGEubGluaztcclxuXHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHRpZiAoZGF0YS5waWN0dXJlKSB7XHJcblx0XHRcdFx0XHRcdHN0YXR1cy5wdXNoKGRhdGEucGljdHVyZSk7XHJcblx0XHRcdFx0XHRcdGRlbGV0ZSBkYXRhLnBpY3R1cmU7XHJcblx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0Ly8gQ29tcG91bmQgYWxsIHRoZSBjb21wb25lbnRzXHJcblx0XHRcdFx0XHRpZiAoc3RhdHVzLmxlbmd0aCkge1xyXG5cdFx0XHRcdFx0XHRkYXRhLnN0YXR1cyA9IHN0YXR1cy5qb2luKCcgJyk7XHJcblx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0Ly8gVHdlZXQgbWVkaWFcclxuXHRcdFx0XHRcdGlmIChkYXRhLmZpbGUpIHtcclxuXHRcdFx0XHRcdFx0ZGF0YVsnbWVkaWFbXSddID0gZGF0YS5maWxlO1xyXG5cdFx0XHRcdFx0XHRkZWxldGUgZGF0YS5maWxlO1xyXG5cdFx0XHRcdFx0XHRwLmRhdGEgPSBkYXRhO1xyXG5cdFx0XHRcdFx0XHRjYWxsYmFjaygnc3RhdHVzZXMvdXBkYXRlX3dpdGhfbWVkaWEuanNvbicpO1xyXG5cdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdC8vIFJldHdlZXQ/XHJcblx0XHRcdFx0XHRlbHNlIGlmICgnaWQnIGluIGRhdGEpIHtcclxuXHRcdFx0XHRcdFx0Y2FsbGJhY2soJ3N0YXR1c2VzL3JldHdlZXQvJyArIGRhdGEuaWQgKyAnLmpzb24nKTtcclxuXHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHQvLyBUd2VldFxyXG5cdFx0XHRcdFx0ZWxzZSB7XHJcblx0XHRcdFx0XHRcdC8vIEFzc2lnbiB0aGUgcG9zdCBib2R5IHRvIHRoZSBxdWVyeSBwYXJhbWV0ZXJzXHJcblx0XHRcdFx0XHRcdGhlbGxvLnV0aWxzLmV4dGVuZChwLnF1ZXJ5LCBkYXRhKTtcclxuXHRcdFx0XHRcdFx0Y2FsbGJhY2soJ3N0YXR1c2VzL3VwZGF0ZS5qc29uP2luY2x1ZGVfZW50aXRpZXM9MScpO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH0sXHJcblxyXG5cdFx0XHRcdC8vIFNlZTogaHR0cHM6Ly9kZXYudHdpdHRlci5jb20vcmVzdC9yZWZlcmVuY2UvcG9zdC9mYXZvcml0ZXMvY3JlYXRlXHJcblx0XHRcdFx0J21lL2xpa2UnOiBmdW5jdGlvbihwLCBjYWxsYmFjaykge1xyXG5cdFx0XHRcdFx0dmFyIGlkID0gcC5kYXRhLmlkO1xyXG5cdFx0XHRcdFx0cC5kYXRhID0gbnVsbDtcclxuXHRcdFx0XHRcdGNhbGxiYWNrKCdmYXZvcml0ZXMvY3JlYXRlLmpzb24/aWQ9JyArIGlkKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0sXHJcblxyXG5cdFx0XHRkZWw6IHtcclxuXHJcblx0XHRcdFx0Ly8gU2VlOiBodHRwczovL2Rldi50d2l0dGVyLmNvbS9yZXN0L3JlZmVyZW5jZS9wb3N0L2Zhdm9yaXRlcy9kZXN0cm95XHJcblx0XHRcdFx0J21lL2xpa2UnOiBmdW5jdGlvbigpIHtcclxuXHRcdFx0XHRcdHAubWV0aG9kID0gJ3Bvc3QnO1xyXG5cdFx0XHRcdFx0dmFyIGlkID0gcC5kYXRhLmlkO1xyXG5cdFx0XHRcdFx0cC5kYXRhID0gbnVsbDtcclxuXHRcdFx0XHRcdGNhbGxiYWNrKCdmYXZvcml0ZXMvZGVzdHJveS5qc29uP2lkPScgKyBpZCk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9LFxyXG5cclxuXHRcdFx0d3JhcDoge1xyXG5cdFx0XHRcdG1lOiBmdW5jdGlvbihyZXMpIHtcclxuXHRcdFx0XHRcdGZvcm1hdEVycm9yKHJlcyk7XHJcblx0XHRcdFx0XHRmb3JtYXRVc2VyKHJlcyk7XHJcblx0XHRcdFx0XHRyZXR1cm4gcmVzO1xyXG5cdFx0XHRcdH0sXHJcblxyXG5cdFx0XHRcdCdtZS9mcmllbmRzJzogZm9ybWF0RnJpZW5kcyxcclxuXHRcdFx0XHQnbWUvZm9sbG93ZXJzJzogZm9ybWF0RnJpZW5kcyxcclxuXHRcdFx0XHQnbWUvZm9sbG93aW5nJzogZm9ybWF0RnJpZW5kcyxcclxuXHJcblx0XHRcdFx0J21lL3NoYXJlJzogZnVuY3Rpb24ocmVzKSB7XHJcblx0XHRcdFx0XHRmb3JtYXRFcnJvcihyZXMpO1xyXG5cdFx0XHRcdFx0cGFnaW5nKHJlcyk7XHJcblx0XHRcdFx0XHRpZiAoIXJlcy5lcnJvciAmJiAnbGVuZ3RoJyBpbiByZXMpIHtcclxuXHRcdFx0XHRcdFx0cmV0dXJuIHtkYXRhOiByZXN9O1xyXG5cdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdHJldHVybiByZXM7XHJcblx0XHRcdFx0fSxcclxuXHJcblx0XHRcdFx0J2RlZmF1bHQnOiBmdW5jdGlvbihyZXMpIHtcclxuXHRcdFx0XHRcdHJlcyA9IGFycmF5VG9EYXRhUmVzcG9uc2UocmVzKTtcclxuXHRcdFx0XHRcdHBhZ2luZyhyZXMpO1xyXG5cdFx0XHRcdFx0cmV0dXJuIHJlcztcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0sXHJcblx0XHRcdHhocjogZnVuY3Rpb24ocCkge1xyXG5cclxuXHRcdFx0XHQvLyBSZWx5IG9uIHRoZSBwcm94eSBmb3Igbm9uLUdFVCByZXF1ZXN0cy5cclxuXHRcdFx0XHRyZXR1cm4gKHAubWV0aG9kICE9PSAnZ2V0Jyk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9KTtcclxuXHJcblx0ZnVuY3Rpb24gZm9ybWF0VXNlcihvKSB7XHJcblx0XHRpZiAoby5pZCkge1xyXG5cdFx0XHRpZiAoby5uYW1lKSB7XHJcblx0XHRcdFx0dmFyIG0gPSBvLm5hbWUuc3BsaXQoJyAnKTtcclxuXHRcdFx0XHRvLmZpcnN0X25hbWUgPSBtLnNoaWZ0KCk7XHJcblx0XHRcdFx0by5sYXN0X25hbWUgPSBtLmpvaW4oJyAnKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0Ly8gU2VlOiBodHRwczovL2Rldi50d2l0dGVyLmNvbS9vdmVydmlldy9nZW5lcmFsL3VzZXItcHJvZmlsZS1pbWFnZXMtYW5kLWJhbm5lcnNcclxuXHRcdFx0by50aHVtYm5haWwgPSBvLnByb2ZpbGVfaW1hZ2VfdXJsX2h0dHBzIHx8IG8ucHJvZmlsZV9pbWFnZV91cmw7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIG87XHJcblx0fVxyXG5cclxuXHRmdW5jdGlvbiBmb3JtYXRGcmllbmRzKG8pIHtcclxuXHRcdGZvcm1hdEVycm9yKG8pO1xyXG5cdFx0cGFnaW5nKG8pO1xyXG5cdFx0aWYgKG8udXNlcnMpIHtcclxuXHRcdFx0by5kYXRhID0gby51c2Vycy5tYXAoZm9ybWF0VXNlcik7XHJcblx0XHRcdGRlbGV0ZSBvLnVzZXJzO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBvO1xyXG5cdH1cclxuXHJcblx0ZnVuY3Rpb24gZm9ybWF0RXJyb3Iobykge1xyXG5cdFx0aWYgKG8uZXJyb3JzKSB7XHJcblx0XHRcdHZhciBlID0gby5lcnJvcnNbMF07XHJcblx0XHRcdG8uZXJyb3IgPSB7XHJcblx0XHRcdFx0Y29kZTogJ3JlcXVlc3RfZmFpbGVkJyxcclxuXHRcdFx0XHRtZXNzYWdlOiBlLm1lc3NhZ2VcclxuXHRcdFx0fTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdC8vIFRha2UgYSBjdXJzb3IgYW5kIGFkZCBpdCB0byB0aGUgcGF0aFxyXG5cdGZ1bmN0aW9uIHBhZ2luZyhyZXMpIHtcclxuXHRcdC8vIERvZXMgdGhlIHJlc3BvbnNlIGluY2x1ZGUgYSAnbmV4dF9jdXJzb3Jfc3RyaW5nJ1xyXG5cdFx0aWYgKCduZXh0X2N1cnNvcl9zdHInIGluIHJlcykge1xyXG5cdFx0XHQvLyBTZWU6IGh0dHBzOi8vZGV2LnR3aXR0ZXIuY29tL2RvY3MvbWlzYy9jdXJzb3JpbmdcclxuXHRcdFx0cmVzLnBhZ2luZyA9IHtcclxuXHRcdFx0XHRuZXh0OiAnP2N1cnNvcj0nICsgcmVzLm5leHRfY3Vyc29yX3N0clxyXG5cdFx0XHR9O1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0ZnVuY3Rpb24gYXJyYXlUb0RhdGFSZXNwb25zZShyZXMpIHtcclxuXHRcdHJldHVybiBBcnJheS5pc0FycmF5KHJlcykgPyB7ZGF0YTogcmVzfSA6IHJlcztcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdC8vIFRoZSBkb2N1bWVudGF0aW9uIHNheXMgdG8gZGVmaW5lIHVzZXIgaW4gdGhlIHJlcXVlc3RcclxuXHQvLyBBbHRob3VnaCBpdHMgbm90IGFjdHVhbGx5IHJlcXVpcmVkLlxyXG5cclxuXHR2YXIgdXNlcl9pZDtcclxuXHJcblx0ZnVuY3Rpb24gd2l0aFVzZXJJZChjYWxsYmFjayl7XHJcblx0XHRpZih1c2VyX2lkKXtcclxuXHRcdFx0Y2FsbGJhY2sodXNlcl9pZCk7XHJcblx0XHR9XHJcblx0XHRlbHNle1xyXG5cdFx0XHRoZWxsby5hcGkoJ3R3aXR0ZXI6L21lJywgZnVuY3Rpb24obyl7XHJcblx0XHRcdFx0dXNlcl9pZCA9IG8uaWQ7XHJcblx0XHRcdFx0Y2FsbGJhY2soby5pZCk7XHJcblx0XHRcdH0pO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0ZnVuY3Rpb24gc2lnbih1cmwpe1xyXG5cdFx0cmV0dXJuIGZ1bmN0aW9uKHAsIGNhbGxiYWNrKXtcclxuXHRcdFx0d2l0aFVzZXJJZChmdW5jdGlvbih1c2VyX2lkKXtcclxuXHRcdFx0XHRjYWxsYmFjayh1cmwrJz91c2VyX2lkPScrdXNlcl9pZCk7XHJcblx0XHRcdH0pO1xyXG5cdFx0fTtcclxuXHR9XHJcblx0Ki9cclxuXHJcbn0pKGhlbGxvKTtcclxuXHJcbi8vIFZrb250YWt0ZSAodmsuY29tKVxyXG4oZnVuY3Rpb24oaGVsbG8pIHtcclxuXHJcblx0aGVsbG8uaW5pdCh7XHJcblxyXG5cdFx0dms6IHtcclxuXHRcdFx0bmFtZTogJ1ZrJyxcclxuXHJcblx0XHRcdC8vIFNlZSBodHRwczovL3ZrLmNvbS9kZXYvb2F1dGhfZGlhbG9nXHJcblx0XHRcdG9hdXRoOiB7XHJcblx0XHRcdFx0dmVyc2lvbjogMixcclxuXHRcdFx0XHRhdXRoOiAnaHR0cHM6Ly9vYXV0aC52ay5jb20vYXV0aG9yaXplJyxcclxuXHRcdFx0XHRncmFudDogJ2h0dHBzOi8vb2F1dGgudmsuY29tL2FjY2Vzc190b2tlbidcclxuXHRcdFx0fSxcclxuXHJcblx0XHRcdC8vIEF1dGhvcml6YXRpb24gc2NvcGVzXHJcblx0XHRcdC8vIFNlZSBodHRwczovL3ZrLmNvbS9kZXYvcGVybWlzc2lvbnNcclxuXHRcdFx0c2NvcGU6IHtcclxuXHRcdFx0XHRlbWFpbDogJ2VtYWlsJyxcclxuXHRcdFx0XHRmcmllbmRzOiAnZnJpZW5kcycsXHJcblx0XHRcdFx0cGhvdG9zOiAncGhvdG9zJyxcclxuXHRcdFx0XHR2aWRlb3M6ICd2aWRlbycsXHJcblx0XHRcdFx0c2hhcmU6ICdzaGFyZScsXHJcblx0XHRcdFx0b2ZmbGluZV9hY2Nlc3M6ICdvZmZsaW5lJ1xyXG5cdFx0XHR9LFxyXG5cclxuXHRcdFx0Ly8gUmVmcmVzaCB0aGUgYWNjZXNzX3Rva2VuXHJcblx0XHRcdHJlZnJlc2g6IHRydWUsXHJcblxyXG5cdFx0XHRsb2dpbjogZnVuY3Rpb24ocCkge1xyXG5cdFx0XHRcdHAucXMuZGlzcGxheSA9IHdpbmRvdy5uYXZpZ2F0b3IgJiZcclxuXHRcdFx0XHRcdHdpbmRvdy5uYXZpZ2F0b3IudXNlckFnZW50ICYmXHJcblx0XHRcdFx0XHQvaXBhZHxwaG9uZXxwaG9uZXxhbmRyb2lkLy50ZXN0KHdpbmRvdy5uYXZpZ2F0b3IudXNlckFnZW50LnRvTG93ZXJDYXNlKCkpID8gJ21vYmlsZScgOiAncG9wdXAnO1xyXG5cdFx0XHR9LFxyXG5cclxuXHRcdFx0Ly8gQVBJIEJhc2UgVVJMXHJcblx0XHRcdGJhc2U6ICdodHRwczovL2FwaS52ay5jb20vbWV0aG9kLycsXHJcblxyXG5cdFx0XHQvLyBNYXAgR0VUIHJlcXVlc3RzXHJcblx0XHRcdGdldDoge1xyXG5cdFx0XHRcdG1lOiBmdW5jdGlvbihwLCBjYWxsYmFjaykge1xyXG5cdFx0XHRcdFx0cC5xdWVyeS5maWVsZHMgPSAnaWQsZmlyc3RfbmFtZSxsYXN0X25hbWUscGhvdG9fbWF4JztcclxuXHRcdFx0XHRcdGNhbGxiYWNrKCd1c2Vycy5nZXQnKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0sXHJcblxyXG5cdFx0XHR3cmFwOiB7XHJcblx0XHRcdFx0bWU6IGZ1bmN0aW9uKHJlcywgaGVhZGVycywgcmVxKSB7XHJcblx0XHRcdFx0XHRmb3JtYXRFcnJvcihyZXMpO1xyXG5cdFx0XHRcdFx0cmV0dXJuIGZvcm1hdFVzZXIocmVzLCByZXEpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSxcclxuXHJcblx0XHRcdC8vIE5vIFhIUlxyXG5cdFx0XHR4aHI6IGZhbHNlLFxyXG5cclxuXHRcdFx0Ly8gQWxsIHJlcXVlc3RzIHNob3VsZCBiZSBKU09OUCBhcyBvZiBtaXNzaW5nIENPUlMgaGVhZGVycyBpbiBodHRwczovL2FwaS52ay5jb20vbWV0aG9kLypcclxuXHRcdFx0anNvbnA6IHRydWUsXHJcblxyXG5cdFx0XHQvLyBObyBmb3JtXHJcblx0XHRcdGZvcm06IGZhbHNlXHJcblx0XHR9XHJcblx0fSk7XHJcblxyXG5cdGZ1bmN0aW9uIGZvcm1hdFVzZXIobywgcmVxKSB7XHJcblxyXG5cdFx0aWYgKG8gIT09IG51bGwgJiYgJ3Jlc3BvbnNlJyBpbiBvICYmIG8ucmVzcG9uc2UgIT09IG51bGwgJiYgby5yZXNwb25zZS5sZW5ndGgpIHtcclxuXHRcdFx0byA9IG8ucmVzcG9uc2VbMF07XHJcblx0XHRcdG8uaWQgPSBvLnVpZDtcclxuXHRcdFx0by50aHVtYm5haWwgPSBvLnBpY3R1cmUgPSBvLnBob3RvX21heDtcclxuXHRcdFx0by5uYW1lID0gby5maXJzdF9uYW1lICsgJyAnICsgby5sYXN0X25hbWU7XHJcblxyXG5cdFx0XHRpZiAocmVxLmF1dGhSZXNwb25zZSAmJiByZXEuYXV0aFJlc3BvbnNlLmVtYWlsICE9PSBudWxsKVxyXG5cdFx0XHRcdG8uZW1haWwgPSByZXEuYXV0aFJlc3BvbnNlLmVtYWlsO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBvO1xyXG5cdH1cclxuXHJcblx0ZnVuY3Rpb24gZm9ybWF0RXJyb3Iobykge1xyXG5cclxuXHRcdGlmIChvLmVycm9yKSB7XHJcblx0XHRcdHZhciBlID0gby5lcnJvcjtcclxuXHRcdFx0by5lcnJvciA9IHtcclxuXHRcdFx0XHRjb2RlOiBlLmVycm9yX2NvZGUsXHJcblx0XHRcdFx0bWVzc2FnZTogZS5lcnJvcl9tc2dcclxuXHRcdFx0fTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG59KShoZWxsbyk7XHJcblxyXG4oZnVuY3Rpb24oaGVsbG8pIHtcclxuXHJcblx0aGVsbG8uaW5pdCh7XHJcblx0XHR3aW5kb3dzOiB7XHJcblx0XHRcdG5hbWU6ICdXaW5kb3dzIGxpdmUnLFxyXG5cclxuXHRcdFx0Ly8gUkVGOiBodHRwOi8vbXNkbi5taWNyb3NvZnQuY29tL2VuLXVzL2xpYnJhcnkvaGgyNDM2NDEuYXNweFxyXG5cdFx0XHRvYXV0aDoge1xyXG5cdFx0XHRcdHZlcnNpb246IDIsXHJcblx0XHRcdFx0YXV0aDogJ2h0dHBzOi8vbG9naW4ubGl2ZS5jb20vb2F1dGgyMF9hdXRob3JpemUuc3JmJyxcclxuXHRcdFx0XHRncmFudDogJ2h0dHBzOi8vbG9naW4ubGl2ZS5jb20vb2F1dGgyMF90b2tlbi5zcmYnXHJcblx0XHRcdH0sXHJcblxyXG5cdFx0XHQvLyBSZWZyZXNoIHRoZSBhY2Nlc3NfdG9rZW4gb25jZSBleHBpcmVkXHJcblx0XHRcdHJlZnJlc2g6IHRydWUsXHJcblxyXG5cdFx0XHRsb2dvdXQ6IGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdHJldHVybiAnaHR0cDovL2xvZ2luLmxpdmUuY29tL29hdXRoMjBfbG9nb3V0LnNyZj90cz0nICsgKG5ldyBEYXRlKCkpLmdldFRpbWUoKTtcclxuXHRcdFx0fSxcclxuXHJcblx0XHRcdC8vIEF1dGhvcml6YXRpb24gc2NvcGVzXHJcblx0XHRcdHNjb3BlOiB7XHJcblx0XHRcdFx0YmFzaWM6ICd3bC5zaWduaW4sd2wuYmFzaWMnLFxyXG5cdFx0XHRcdGVtYWlsOiAnd2wuZW1haWxzJyxcclxuXHRcdFx0XHRiaXJ0aGRheTogJ3dsLmJpcnRoZGF5JyxcclxuXHRcdFx0XHRldmVudHM6ICd3bC5jYWxlbmRhcnMnLFxyXG5cdFx0XHRcdHBob3RvczogJ3dsLnBob3RvcycsXHJcblx0XHRcdFx0dmlkZW9zOiAnd2wucGhvdG9zJyxcclxuXHRcdFx0XHRmcmllbmRzOiAnd2wuY29udGFjdHNfZW1haWxzJyxcclxuXHRcdFx0XHRmaWxlczogJ3dsLnNreWRyaXZlJyxcclxuXHRcdFx0XHRwdWJsaXNoOiAnd2wuc2hhcmUnLFxyXG5cdFx0XHRcdHB1Ymxpc2hfZmlsZXM6ICd3bC5za3lkcml2ZV91cGRhdGUnLFxyXG5cdFx0XHRcdHNoYXJlOiAnd2wuc2hhcmUnLFxyXG5cdFx0XHRcdGNyZWF0ZV9ldmVudDogJ3dsLmNhbGVuZGFyc191cGRhdGUsd2wuZXZlbnRzX2NyZWF0ZScsXHJcblx0XHRcdFx0b2ZmbGluZV9hY2Nlc3M6ICd3bC5vZmZsaW5lX2FjY2VzcydcclxuXHRcdFx0fSxcclxuXHJcblx0XHRcdC8vIEFQSSBiYXNlIFVSTFxyXG5cdFx0XHRiYXNlOiAnaHR0cHM6Ly9hcGlzLmxpdmUubmV0L3Y1LjAvJyxcclxuXHJcblx0XHRcdC8vIE1hcCBHRVQgcmVxdWVzdHNcclxuXHRcdFx0Z2V0OiB7XHJcblxyXG5cdFx0XHRcdC8vIEZyaWVuZHNcclxuXHRcdFx0XHRtZTogJ21lJyxcclxuXHRcdFx0XHQnbWUvZnJpZW5kcyc6ICdtZS9mcmllbmRzJyxcclxuXHRcdFx0XHQnbWUvZm9sbG93aW5nJzogJ21lL2NvbnRhY3RzJyxcclxuXHRcdFx0XHQnbWUvZm9sbG93ZXJzJzogJ21lL2ZyaWVuZHMnLFxyXG5cdFx0XHRcdCdtZS9jb250YWN0cyc6ICdtZS9jb250YWN0cycsXHJcblxyXG5cdFx0XHRcdCdtZS9hbGJ1bXMnOiAnbWUvYWxidW1zJyxcclxuXHJcblx0XHRcdFx0Ly8gSW5jbHVkZSB0aGUgZGF0YVtpZF0gaW4gdGhlIHBhdGhcclxuXHRcdFx0XHQnbWUvYWxidW0nOiAnQHtpZH0vZmlsZXMnLFxyXG5cdFx0XHRcdCdtZS9waG90byc6ICdAe2lkfScsXHJcblxyXG5cdFx0XHRcdC8vIEZpbGVzXHJcblx0XHRcdFx0J21lL2ZpbGVzJzogJ0B7cGFyZW50fG1lL3NreWRyaXZlfS9maWxlcycsXHJcblx0XHRcdFx0J21lL2ZvbGRlcnMnOiAnQHtpZHxtZS9za3lkcml2ZX0vZmlsZXMnLFxyXG5cdFx0XHRcdCdtZS9mb2xkZXInOiAnQHtpZHxtZS9za3lkcml2ZX0vZmlsZXMnXHJcblx0XHRcdH0sXHJcblxyXG5cdFx0XHQvLyBNYXAgUE9TVCByZXF1ZXN0c1xyXG5cdFx0XHRwb3N0OiB7XHJcblx0XHRcdFx0J21lL2FsYnVtcyc6ICdtZS9hbGJ1bXMnLFxyXG5cdFx0XHRcdCdtZS9hbGJ1bSc6ICdAe2lkfS9maWxlcy8nLFxyXG5cclxuXHRcdFx0XHQnbWUvZm9sZGVycyc6ICdAe2lkfG1lL3NreWRyaXZlL30nLFxyXG5cdFx0XHRcdCdtZS9maWxlcyc6ICdAe3BhcmVudHxtZS9za3lkcml2ZX0vZmlsZXMnXHJcblx0XHRcdH0sXHJcblxyXG5cdFx0XHQvLyBNYXAgREVMRVRFIHJlcXVlc3RzXHJcblx0XHRcdGRlbDoge1xyXG5cdFx0XHRcdC8vIEluY2x1ZGUgdGhlIGRhdGFbaWRdIGluIHRoZSBwYXRoXHJcblx0XHRcdFx0J21lL2FsYnVtJzogJ0B7aWR9JyxcclxuXHRcdFx0XHQnbWUvcGhvdG8nOiAnQHtpZH0nLFxyXG5cdFx0XHRcdCdtZS9mb2xkZXInOiAnQHtpZH0nLFxyXG5cdFx0XHRcdCdtZS9maWxlcyc6ICdAe2lkfSdcclxuXHRcdFx0fSxcclxuXHJcblx0XHRcdHdyYXA6IHtcclxuXHRcdFx0XHRtZTogZm9ybWF0VXNlcixcclxuXHJcblx0XHRcdFx0J21lL2ZyaWVuZHMnOiBmb3JtYXRGcmllbmRzLFxyXG5cdFx0XHRcdCdtZS9jb250YWN0cyc6IGZvcm1hdEZyaWVuZHMsXHJcblx0XHRcdFx0J21lL2ZvbGxvd2Vycyc6IGZvcm1hdEZyaWVuZHMsXHJcblx0XHRcdFx0J21lL2ZvbGxvd2luZyc6IGZvcm1hdEZyaWVuZHMsXHJcblx0XHRcdFx0J21lL2FsYnVtcyc6IGZvcm1hdEFsYnVtcyxcclxuXHRcdFx0XHQnbWUvcGhvdG9zJzogZm9ybWF0RGVmYXVsdCxcclxuXHRcdFx0XHQnZGVmYXVsdCc6IGZvcm1hdERlZmF1bHRcclxuXHRcdFx0fSxcclxuXHJcblx0XHRcdHhocjogZnVuY3Rpb24ocCkge1xyXG5cdFx0XHRcdGlmIChwLm1ldGhvZCAhPT0gJ2dldCcgJiYgcC5tZXRob2QgIT09ICdkZWxldGUnICYmICFoZWxsby51dGlscy5oYXNCaW5hcnkocC5kYXRhKSkge1xyXG5cclxuXHRcdFx0XHRcdC8vIERvZXMgdGhpcyBoYXZlIGEgZGF0YS11cmkgdG8gdXBsb2FkIGFzIGEgZmlsZT9cclxuXHRcdFx0XHRcdGlmICh0eXBlb2YgKHAuZGF0YS5maWxlKSA9PT0gJ3N0cmluZycpIHtcclxuXHRcdFx0XHRcdFx0cC5kYXRhLmZpbGUgPSBoZWxsby51dGlscy50b0Jsb2IocC5kYXRhLmZpbGUpO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0ZWxzZSB7XHJcblx0XHRcdFx0XHRcdHAuZGF0YSA9IEpTT04uc3RyaW5naWZ5KHAuZGF0YSk7XHJcblx0XHRcdFx0XHRcdHAuaGVhZGVycyA9IHtcclxuXHRcdFx0XHRcdFx0XHQnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nXHJcblx0XHRcdFx0XHRcdH07XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRyZXR1cm4gdHJ1ZTtcclxuXHRcdFx0fSxcclxuXHJcblx0XHRcdGpzb25wOiBmdW5jdGlvbihwKSB7XHJcblx0XHRcdFx0aWYgKHAubWV0aG9kICE9PSAnZ2V0JyAmJiAhaGVsbG8udXRpbHMuaGFzQmluYXJ5KHAuZGF0YSkpIHtcclxuXHRcdFx0XHRcdHAuZGF0YS5tZXRob2QgPSBwLm1ldGhvZDtcclxuXHRcdFx0XHRcdHAubWV0aG9kID0gJ2dldCc7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fSk7XHJcblxyXG5cdGZ1bmN0aW9uIGZvcm1hdERlZmF1bHQobykge1xyXG5cdFx0aWYgKCdkYXRhJyBpbiBvKSB7XHJcblx0XHRcdG8uZGF0YS5mb3JFYWNoKGZ1bmN0aW9uKGQpIHtcclxuXHRcdFx0XHRpZiAoZC5waWN0dXJlKSB7XHJcblx0XHRcdFx0XHRkLnRodW1ibmFpbCA9IGQucGljdHVyZTtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdGlmIChkLmltYWdlcykge1xyXG5cdFx0XHRcdFx0ZC5waWN0dXJlcyA9IGQuaW1hZ2VzXHJcblx0XHRcdFx0XHRcdC5tYXAoZm9ybWF0SW1hZ2UpXHJcblx0XHRcdFx0XHRcdC5zb3J0KGZ1bmN0aW9uKGEsIGIpIHtcclxuXHRcdFx0XHRcdFx0XHRyZXR1cm4gYS53aWR0aCAtIGIud2lkdGg7XHJcblx0XHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSk7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIG87XHJcblx0fVxyXG5cclxuXHRmdW5jdGlvbiBmb3JtYXRJbWFnZShpbWFnZSkge1xyXG5cdFx0cmV0dXJuIHtcclxuXHRcdFx0d2lkdGg6IGltYWdlLndpZHRoLFxyXG5cdFx0XHRoZWlnaHQ6IGltYWdlLmhlaWdodCxcclxuXHRcdFx0c291cmNlOiBpbWFnZS5zb3VyY2VcclxuXHRcdH07XHJcblx0fVxyXG5cclxuXHRmdW5jdGlvbiBmb3JtYXRBbGJ1bXMobykge1xyXG5cdFx0aWYgKCdkYXRhJyBpbiBvKSB7XHJcblx0XHRcdG8uZGF0YS5mb3JFYWNoKGZ1bmN0aW9uKGQpIHtcclxuXHRcdFx0XHRkLnBob3RvcyA9IGQuZmlsZXMgPSAnaHR0cHM6Ly9hcGlzLmxpdmUubmV0L3Y1LjAvJyArIGQuaWQgKyAnL3Bob3Rvcyc7XHJcblx0XHRcdH0pO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBvO1xyXG5cdH1cclxuXHJcblx0ZnVuY3Rpb24gZm9ybWF0VXNlcihvLCBoZWFkZXJzLCByZXEpIHtcclxuXHRcdGlmIChvLmlkKSB7XHJcblx0XHRcdHZhciB0b2tlbiA9IHJlcS5xdWVyeS5hY2Nlc3NfdG9rZW47XHJcblx0XHRcdGlmIChvLmVtYWlscykge1xyXG5cdFx0XHRcdG8uZW1haWwgPSBvLmVtYWlscy5wcmVmZXJyZWQ7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdC8vIElmIHRoaXMgaXMgbm90IGFuIG5vbi1uZXR3b3JrIGZyaWVuZFxyXG5cdFx0XHRpZiAoby5pc19mcmllbmQgIT09IGZhbHNlKSB7XHJcblx0XHRcdFx0Ly8gVXNlIHRoZSBpZCBvZiB0aGUgdXNlcl9pZCBpZiBhdmFpbGFibGVcclxuXHRcdFx0XHR2YXIgaWQgPSAoby51c2VyX2lkIHx8IG8uaWQpO1xyXG5cdFx0XHRcdG8udGh1bWJuYWlsID0gby5waWN0dXJlID0gJ2h0dHBzOi8vYXBpcy5saXZlLm5ldC92NS4wLycgKyBpZCArICcvcGljdHVyZT9hY2Nlc3NfdG9rZW49JyArIHRva2VuO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIG87XHJcblx0fVxyXG5cclxuXHRmdW5jdGlvbiBmb3JtYXRGcmllbmRzKG8sIGhlYWRlcnMsIHJlcSkge1xyXG5cdFx0aWYgKCdkYXRhJyBpbiBvKSB7XHJcblx0XHRcdG8uZGF0YS5mb3JFYWNoKGZ1bmN0aW9uKGQpIHtcclxuXHRcdFx0XHRmb3JtYXRVc2VyKGQsIGhlYWRlcnMsIHJlcSk7XHJcblx0XHRcdH0pO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBvO1xyXG5cdH1cclxuXHJcbn0pKGhlbGxvKTtcclxuXHJcbihmdW5jdGlvbihoZWxsbykge1xyXG5cclxuXHRoZWxsby5pbml0KHtcclxuXHJcblx0XHR5YWhvbzoge1xyXG5cclxuXHRcdFx0Ly8gRW5zdXJlIHRoYXQgeW91IGRlZmluZSBhbiBvYXV0aF9wcm94eVxyXG5cdFx0XHRvYXV0aDoge1xyXG5cdFx0XHRcdHZlcnNpb246ICcxLjBhJyxcclxuXHRcdFx0XHRhdXRoOiAnaHR0cHM6Ly9hcGkubG9naW4ueWFob28uY29tL29hdXRoL3YyL3JlcXVlc3RfYXV0aCcsXHJcblx0XHRcdFx0cmVxdWVzdDogJ2h0dHBzOi8vYXBpLmxvZ2luLnlhaG9vLmNvbS9vYXV0aC92Mi9nZXRfcmVxdWVzdF90b2tlbicsXHJcblx0XHRcdFx0dG9rZW46ICdodHRwczovL2FwaS5sb2dpbi55YWhvby5jb20vb2F1dGgvdjIvZ2V0X3Rva2VuJ1xyXG5cdFx0XHR9LFxyXG5cclxuXHRcdFx0Ly8gTG9naW4gaGFuZGxlclxyXG5cdFx0XHRsb2dpbjogZnVuY3Rpb24ocCkge1xyXG5cdFx0XHRcdC8vIENoYW5nZSB0aGUgZGVmYXVsdCBwb3B1cCB3aW5kb3cgdG8gYmUgYXQgbGVhc3QgNTYwXHJcblx0XHRcdFx0Ly8gWWFob28gZG9lcyBkeW5hbWljYWxseSBjaGFuZ2UgaXQgb24gdGhlIGZseSBmb3IgdGhlIHNpZ25pbiBzY3JlZW4gKG9ubHksIHdoYXQgaWYgeW91ciBhbHJlYWR5IHNpZ25lZCBpbilcclxuXHRcdFx0XHRwLm9wdGlvbnMucG9wdXAud2lkdGggPSA1NjA7XHJcblxyXG5cdFx0XHRcdC8vIFlhaG9vIHRocm93cyBhbiBwYXJhbWV0ZXIgZXJyb3IgaWYgZm9yIHdoYXRldmVyIHJlYXNvbiB0aGUgc3RhdGUuc2NvcGUgY29udGFpbnMgYSBjb21tYSwgc28gbGV0cyByZW1vdmUgc2NvcGVcclxuXHRcdFx0XHR0cnkge2RlbGV0ZSBwLnFzLnN0YXRlLnNjb3BlO31cclxuXHRcdFx0XHRjYXRjaCAoZSkge31cclxuXHRcdFx0fSxcclxuXHJcblx0XHRcdGJhc2U6ICdodHRwczovL3NvY2lhbC55YWhvb2FwaXMuY29tL3YxLycsXHJcblxyXG5cdFx0XHRnZXQ6IHtcclxuXHRcdFx0XHRtZTogeXFsKCdzZWxlY3QgKiBmcm9tIHNvY2lhbC5wcm9maWxlKDApIHdoZXJlIGd1aWQ9bWUnKSxcclxuXHRcdFx0XHQnbWUvZnJpZW5kcyc6IHlxbCgnc2VsZWN0ICogZnJvbSBzb2NpYWwuY29udGFjdHMoMCkgd2hlcmUgZ3VpZD1tZScpLFxyXG5cdFx0XHRcdCdtZS9mb2xsb3dpbmcnOiB5cWwoJ3NlbGVjdCAqIGZyb20gc29jaWFsLmNvbnRhY3RzKDApIHdoZXJlIGd1aWQ9bWUnKVxyXG5cdFx0XHR9LFxyXG5cdFx0XHR3cmFwOiB7XHJcblx0XHRcdFx0bWU6IGZvcm1hdFVzZXIsXHJcblxyXG5cdFx0XHRcdC8vIENhbid0IGdldCBJRHNcclxuXHRcdFx0XHQvLyBJdCBtaWdodCBiZSBiZXR0ZXIgdG8gbG9vcCB0aHJvdWdoIHRoZSBzb2NpYWwucmVsYXRpb25zaGlwIHRhYmxlIHdpdGggaGFzIHVuaXF1ZSBJRHMgb2YgdXNlcnMuXHJcblx0XHRcdFx0J21lL2ZyaWVuZHMnOiBmb3JtYXRGcmllbmRzLFxyXG5cdFx0XHRcdCdtZS9mb2xsb3dpbmcnOiBmb3JtYXRGcmllbmRzLFxyXG5cdFx0XHRcdCdkZWZhdWx0JzogcGFnaW5nXHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9KTtcclxuXHJcblx0LypcclxuXHRcdC8vIEF1dG8tcmVmcmVzaCBmaXg6IGJ1ZyBpbiBZYWhvbyBjYW4ndCBnZXQgdGhpcyB0byB3b3JrIHdpdGggbm9kZS1vYXV0aC1zaGltXHJcblx0XHRsb2dpbiA6IGZ1bmN0aW9uKG8pe1xyXG5cdFx0XHQvLyBJcyB0aGUgdXNlciBhbHJlYWR5IGxvZ2dlZCBpblxyXG5cdFx0XHR2YXIgYXV0aCA9IGhlbGxvKCd5YWhvbycpLmdldEF1dGhSZXNwb25zZSgpO1xyXG5cclxuXHRcdFx0Ly8gSXMgdGhpcyBhIHJlZnJlc2ggdG9rZW4/XHJcblx0XHRcdGlmKG8ub3B0aW9ucy5kaXNwbGF5PT09J25vbmUnJiZhdXRoJiZhdXRoLmFjY2Vzc190b2tlbiYmYXV0aC5yZWZyZXNoX3Rva2VuKXtcclxuXHRcdFx0XHQvLyBBZGQgdGhlIG9sZCB0b2tlbiBhbmQgdGhlIHJlZnJlc2ggdG9rZW4sIGluY2x1ZGluZyBwYXRoIHRvIHRoZSBxdWVyeVxyXG5cdFx0XHRcdC8vIFNlZSBodHRwOi8vZGV2ZWxvcGVyLnlhaG9vLmNvbS9vYXV0aC9ndWlkZS9vYXV0aC1yZWZyZXNoYWNjZXNzdG9rZW4uaHRtbFxyXG5cdFx0XHRcdG8ucXMuYWNjZXNzX3Rva2VuID0gYXV0aC5hY2Nlc3NfdG9rZW47XHJcblx0XHRcdFx0by5xcy5yZWZyZXNoX3Rva2VuID0gYXV0aC5yZWZyZXNoX3Rva2VuO1xyXG5cdFx0XHRcdG8ucXMudG9rZW5fdXJsID0gJ2h0dHBzOi8vYXBpLmxvZ2luLnlhaG9vLmNvbS9vYXV0aC92Mi9nZXRfdG9rZW4nO1xyXG5cdFx0XHR9XHJcblx0XHR9LFxyXG5cdCovXHJcblxyXG5cdGZ1bmN0aW9uIGZvcm1hdEVycm9yKG8pIHtcclxuXHRcdGlmIChvICYmICdtZXRhJyBpbiBvICYmICdlcnJvcl90eXBlJyBpbiBvLm1ldGEpIHtcclxuXHRcdFx0by5lcnJvciA9IHtcclxuXHRcdFx0XHRjb2RlOiBvLm1ldGEuZXJyb3JfdHlwZSxcclxuXHRcdFx0XHRtZXNzYWdlOiBvLm1ldGEuZXJyb3JfbWVzc2FnZVxyXG5cdFx0XHR9O1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0ZnVuY3Rpb24gZm9ybWF0VXNlcihvKSB7XHJcblxyXG5cdFx0Zm9ybWF0RXJyb3Iobyk7XHJcblx0XHRpZiAoby5xdWVyeSAmJiBvLnF1ZXJ5LnJlc3VsdHMgJiYgby5xdWVyeS5yZXN1bHRzLnByb2ZpbGUpIHtcclxuXHRcdFx0byA9IG8ucXVlcnkucmVzdWx0cy5wcm9maWxlO1xyXG5cdFx0XHRvLmlkID0gby5ndWlkO1xyXG5cdFx0XHRvLmxhc3RfbmFtZSA9IG8uZmFtaWx5TmFtZTtcclxuXHRcdFx0by5maXJzdF9uYW1lID0gby5naXZlbk5hbWUgfHwgby5uaWNrbmFtZTtcclxuXHRcdFx0dmFyIGEgPSBbXTtcclxuXHRcdFx0aWYgKG8uZmlyc3RfbmFtZSkge1xyXG5cdFx0XHRcdGEucHVzaChvLmZpcnN0X25hbWUpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZiAoby5sYXN0X25hbWUpIHtcclxuXHRcdFx0XHRhLnB1c2goby5sYXN0X25hbWUpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRvLm5hbWUgPSBhLmpvaW4oJyAnKTtcclxuXHRcdFx0by5lbWFpbCA9IChvLmVtYWlscyAmJiBvLmVtYWlsc1swXSkgPyBvLmVtYWlsc1swXS5oYW5kbGUgOiBudWxsO1xyXG5cdFx0XHRvLnRodW1ibmFpbCA9IG8uaW1hZ2UgPyBvLmltYWdlLmltYWdlVXJsIDogbnVsbDtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gbztcclxuXHR9XHJcblxyXG5cdGZ1bmN0aW9uIGZvcm1hdEZyaWVuZHMobywgaGVhZGVycywgcmVxdWVzdCkge1xyXG5cdFx0Zm9ybWF0RXJyb3Iobyk7XHJcblx0XHRwYWdpbmcobywgaGVhZGVycywgcmVxdWVzdCk7XHJcblx0XHR2YXIgY29udGFjdDtcclxuXHRcdHZhciBmaWVsZDtcclxuXHRcdGlmIChvLnF1ZXJ5ICYmIG8ucXVlcnkucmVzdWx0cyAmJiBvLnF1ZXJ5LnJlc3VsdHMuY29udGFjdCkge1xyXG5cdFx0XHRvLmRhdGEgPSBvLnF1ZXJ5LnJlc3VsdHMuY29udGFjdDtcclxuXHRcdFx0ZGVsZXRlIG8ucXVlcnk7XHJcblxyXG5cdFx0XHRpZiAoIUFycmF5LmlzQXJyYXkoby5kYXRhKSkge1xyXG5cdFx0XHRcdG8uZGF0YSA9IFtvLmRhdGFdO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRvLmRhdGEuZm9yRWFjaChmb3JtYXRGcmllbmQpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBvO1xyXG5cdH1cclxuXHJcblx0ZnVuY3Rpb24gZm9ybWF0RnJpZW5kKGNvbnRhY3QpIHtcclxuXHRcdGNvbnRhY3QuaWQgPSBudWxsO1xyXG5cclxuXHRcdC8vICMzNjI6IFJlcG9ydHMgb2YgcmVzcG9uc2VzIHJldHVybmluZyBhIHNpbmdsZSBpdGVtLCByYXRoZXIgdGhhbiBhbiBBcnJheSBvZiBpdGVtcy5cclxuXHRcdC8vIEZvcm1hdCB0aGUgY29udGFjdC5maWVsZHMgdG8gYmUgYW4gYXJyYXkuXHJcblx0XHRpZiAoY29udGFjdC5maWVsZHMgJiYgIShjb250YWN0LmZpZWxkcyBpbnN0YW5jZW9mIEFycmF5KSkge1xyXG5cdFx0XHRjb250YWN0LmZpZWxkcyA9IFtjb250YWN0LmZpZWxkc107XHJcblx0XHR9XHJcblxyXG5cdFx0KGNvbnRhY3QuZmllbGRzIHx8IFtdKS5mb3JFYWNoKGZ1bmN0aW9uKGZpZWxkKSB7XHJcblx0XHRcdGlmIChmaWVsZC50eXBlID09PSAnZW1haWwnKSB7XHJcblx0XHRcdFx0Y29udGFjdC5lbWFpbCA9IGZpZWxkLnZhbHVlO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZiAoZmllbGQudHlwZSA9PT0gJ25hbWUnKSB7XHJcblx0XHRcdFx0Y29udGFjdC5maXJzdF9uYW1lID0gZmllbGQudmFsdWUuZ2l2ZW5OYW1lO1xyXG5cdFx0XHRcdGNvbnRhY3QubGFzdF9uYW1lID0gZmllbGQudmFsdWUuZmFtaWx5TmFtZTtcclxuXHRcdFx0XHRjb250YWN0Lm5hbWUgPSBmaWVsZC52YWx1ZS5naXZlbk5hbWUgKyAnICcgKyBmaWVsZC52YWx1ZS5mYW1pbHlOYW1lO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZiAoZmllbGQudHlwZSA9PT0gJ3lhaG9vaWQnKSB7XHJcblx0XHRcdFx0Y29udGFjdC5pZCA9IGZpZWxkLnZhbHVlO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHR9XHJcblxyXG5cdGZ1bmN0aW9uIHBhZ2luZyhyZXMsIGhlYWRlcnMsIHJlcXVlc3QpIHtcclxuXHJcblx0XHQvLyBTZWU6IGh0dHA6Ly9kZXZlbG9wZXIueWFob28uY29tL3lxbC9ndWlkZS9wYWdpbmcuaHRtbCNsb2NhbF9saW1pdHNcclxuXHRcdGlmIChyZXMucXVlcnkgJiYgcmVzLnF1ZXJ5LmNvdW50ICYmIHJlcXVlc3Qub3B0aW9ucykge1xyXG5cdFx0XHRyZXMucGFnaW5nID0ge1xyXG5cdFx0XHRcdG5leHQ6ICc/c3RhcnQ9JyArIChyZXMucXVlcnkuY291bnQgKyAoK3JlcXVlc3Qub3B0aW9ucy5zdGFydCB8fCAxKSlcclxuXHRcdFx0fTtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gcmVzO1xyXG5cdH1cclxuXHJcblx0ZnVuY3Rpb24geXFsKHEpIHtcclxuXHRcdHJldHVybiAnaHR0cHM6Ly9xdWVyeS55YWhvb2FwaXMuY29tL3YxL3lxbD9xPScgKyAocSArICcgbGltaXQgQHtsaW1pdHwxMDB9IG9mZnNldCBAe3N0YXJ0fDB9JykucmVwbGFjZSgvXFxzL2csICclMjAnKSArICcmZm9ybWF0PWpzb24nO1xyXG5cdH1cclxuXHJcbn0pKGhlbGxvKTtcclxuXHJcbi8vIFJlZ2lzdGVyIGFzIGFub255bW91cyBBTUQgbW9kdWxlXHJcbmlmICh0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpIHtcclxuXHRkZWZpbmUoZnVuY3Rpb24oKSB7XHJcblx0XHRyZXR1cm4gaGVsbG87XHJcblx0fSk7XHJcbn1cclxuXHJcbi8vIENvbW1vbkpTIG1vZHVsZSBmb3IgYnJvd3NlcmlmeVxyXG5pZiAodHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcgJiYgbW9kdWxlLmV4cG9ydHMpIHtcclxuXHRtb2R1bGUuZXhwb3J0cyA9IGhlbGxvO1xyXG59XHJcbiIsIi8qISBoZWxsb2pzIHYxLjE0LjAgfCAoYykgMjAxMi0yMDE2IEFuZHJldyBEb2Rzb24gfCBNSVQgaHR0cHM6Ly9hZG9kc29uLmNvbS9oZWxsby5qcy9MSUNFTlNFICovXHJcbi8vIEVTNSBPYmplY3QuY3JlYXRlXHJcbmlmICghT2JqZWN0LmNyZWF0ZSkge1xyXG5cclxuXHQvLyBTaGltLCBPYmplY3QgY3JlYXRlXHJcblx0Ly8gQSBzaGltIGZvciBPYmplY3QuY3JlYXRlKCksIGl0IGFkZHMgYSBwcm90b3R5cGUgdG8gYSBuZXcgb2JqZWN0XHJcblx0T2JqZWN0LmNyZWF0ZSA9IChmdW5jdGlvbigpIHtcclxuXHJcblx0XHRmdW5jdGlvbiBGKCkge31cclxuXHJcblx0XHRyZXR1cm4gZnVuY3Rpb24obykge1xyXG5cclxuXHRcdFx0aWYgKGFyZ3VtZW50cy5sZW5ndGggIT0gMSkge1xyXG5cdFx0XHRcdHRocm93IG5ldyBFcnJvcignT2JqZWN0LmNyZWF0ZSBpbXBsZW1lbnRhdGlvbiBvbmx5IGFjY2VwdHMgb25lIHBhcmFtZXRlci4nKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0Ri5wcm90b3R5cGUgPSBvO1xyXG5cdFx0XHRyZXR1cm4gbmV3IEYoKTtcclxuXHRcdH07XHJcblxyXG5cdH0pKCk7XHJcblxyXG59XHJcblxyXG4vLyBFUzUgT2JqZWN0LmtleXNcclxuaWYgKCFPYmplY3Qua2V5cykge1xyXG5cdE9iamVjdC5rZXlzID0gZnVuY3Rpb24obywgaywgcikge1xyXG5cdFx0ciA9IFtdO1xyXG5cdFx0Zm9yIChrIGluIG8pIHtcclxuXHRcdFx0aWYgKHIuaGFzT3duUHJvcGVydHkuY2FsbChvLCBrKSlcclxuXHRcdFx0XHRyLnB1c2goayk7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIHI7XHJcblx0fTtcclxufVxyXG5cclxuLy8gRVM1IFtdLmluZGV4T2ZcclxuaWYgKCFBcnJheS5wcm90b3R5cGUuaW5kZXhPZikge1xyXG5cdEFycmF5LnByb3RvdHlwZS5pbmRleE9mID0gZnVuY3Rpb24ocykge1xyXG5cclxuXHRcdGZvciAodmFyIGogPSAwOyBqIDwgdGhpcy5sZW5ndGg7IGorKykge1xyXG5cdFx0XHRpZiAodGhpc1tqXSA9PT0gcykge1xyXG5cdFx0XHRcdHJldHVybiBqO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIC0xO1xyXG5cdH07XHJcbn1cclxuXHJcbi8vIEVTNSBbXS5mb3JFYWNoXHJcbmlmICghQXJyYXkucHJvdG90eXBlLmZvckVhY2gpIHtcclxuXHRBcnJheS5wcm90b3R5cGUuZm9yRWFjaCA9IGZ1bmN0aW9uKGZ1bi8qLCB0aGlzQXJnKi8pIHtcclxuXHJcblx0XHRpZiAodGhpcyA9PT0gdm9pZCAwIHx8IHRoaXMgPT09IG51bGwpIHtcclxuXHRcdFx0dGhyb3cgbmV3IFR5cGVFcnJvcigpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHZhciB0ID0gT2JqZWN0KHRoaXMpO1xyXG5cdFx0dmFyIGxlbiA9IHQubGVuZ3RoID4+PiAwO1xyXG5cdFx0aWYgKHR5cGVvZiBmdW4gIT09ICdmdW5jdGlvbicpIHtcclxuXHRcdFx0dGhyb3cgbmV3IFR5cGVFcnJvcigpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHZhciB0aGlzQXJnID0gYXJndW1lbnRzLmxlbmd0aCA+PSAyID8gYXJndW1lbnRzWzFdIDogdm9pZCAwO1xyXG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBsZW47IGkrKykge1xyXG5cdFx0XHRpZiAoaSBpbiB0KSB7XHJcblx0XHRcdFx0ZnVuLmNhbGwodGhpc0FyZywgdFtpXSwgaSwgdCk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gdGhpcztcclxuXHR9O1xyXG59XHJcblxyXG4vLyBFUzUgW10uZmlsdGVyXHJcbmlmICghQXJyYXkucHJvdG90eXBlLmZpbHRlcikge1xyXG5cdEFycmF5LnByb3RvdHlwZS5maWx0ZXIgPSBmdW5jdGlvbihmdW4sIHRoaXNBcmcpIHtcclxuXHJcblx0XHR2YXIgYSA9IFtdO1xyXG5cdFx0dGhpcy5mb3JFYWNoKGZ1bmN0aW9uKHZhbCwgaSwgdCkge1xyXG5cdFx0XHRpZiAoZnVuLmNhbGwodGhpc0FyZyB8fCB2b2lkIDAsIHZhbCwgaSwgdCkpIHtcclxuXHRcdFx0XHRhLnB1c2godmFsKTtcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblxyXG5cdFx0cmV0dXJuIGE7XHJcblx0fTtcclxufVxyXG5cclxuLy8gUHJvZHVjdGlvbiBzdGVwcyBvZiBFQ01BLTI2MiwgRWRpdGlvbiA1LCAxNS40LjQuMTlcclxuLy8gUmVmZXJlbmNlOiBodHRwOi8vZXM1LmdpdGh1Yi5pby8jeDE1LjQuNC4xOVxyXG5pZiAoIUFycmF5LnByb3RvdHlwZS5tYXApIHtcclxuXHJcblx0QXJyYXkucHJvdG90eXBlLm1hcCA9IGZ1bmN0aW9uKGZ1biwgdGhpc0FyZykge1xyXG5cclxuXHRcdHZhciBhID0gW107XHJcblx0XHR0aGlzLmZvckVhY2goZnVuY3Rpb24odmFsLCBpLCB0KSB7XHJcblx0XHRcdGEucHVzaChmdW4uY2FsbCh0aGlzQXJnIHx8IHZvaWQgMCwgdmFsLCBpLCB0KSk7XHJcblx0XHR9KTtcclxuXHJcblx0XHRyZXR1cm4gYTtcclxuXHR9O1xyXG59XHJcblxyXG4vLyBFUzUgaXNBcnJheVxyXG5pZiAoIUFycmF5LmlzQXJyYXkpIHtcclxuXHJcblx0Ly8gRnVuY3Rpb24gQXJyYXkuaXNBcnJheVxyXG5cdEFycmF5LmlzQXJyYXkgPSBmdW5jdGlvbihvKSB7XHJcblx0XHRyZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG8pID09PSAnW29iamVjdCBBcnJheV0nO1xyXG5cdH07XHJcblxyXG59XHJcblxyXG4vLyBUZXN0IGZvciBsb2NhdGlvbi5hc3NpZ25cclxuaWYgKHR5cGVvZiB3aW5kb3cgPT09ICdvYmplY3QnICYmIHR5cGVvZiB3aW5kb3cubG9jYXRpb24gPT09ICdvYmplY3QnICYmICF3aW5kb3cubG9jYXRpb24uYXNzaWduKSB7XHJcblxyXG5cdHdpbmRvdy5sb2NhdGlvbi5hc3NpZ24gPSBmdW5jdGlvbih1cmwpIHtcclxuXHRcdHdpbmRvdy5sb2NhdGlvbiA9IHVybDtcclxuXHR9O1xyXG5cclxufVxyXG5cclxuLy8gVGVzdCBmb3IgRnVuY3Rpb24uYmluZFxyXG5pZiAoIUZ1bmN0aW9uLnByb3RvdHlwZS5iaW5kKSB7XHJcblxyXG5cdC8vIE1ETlxyXG5cdC8vIFBvbHlmaWxsIElFOCwgZG9lcyBub3Qgc3VwcG9ydCBuYXRpdmUgRnVuY3Rpb24uYmluZFxyXG5cdEZ1bmN0aW9uLnByb3RvdHlwZS5iaW5kID0gZnVuY3Rpb24oYikge1xyXG5cclxuXHRcdGlmICh0eXBlb2YgdGhpcyAhPT0gJ2Z1bmN0aW9uJykge1xyXG5cdFx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKCdGdW5jdGlvbi5wcm90b3R5cGUuYmluZCAtIHdoYXQgaXMgdHJ5aW5nIHRvIGJlIGJvdW5kIGlzIG5vdCBjYWxsYWJsZScpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGZ1bmN0aW9uIEMoKSB7fVxyXG5cclxuXHRcdHZhciBhID0gW10uc2xpY2U7XHJcblx0XHR2YXIgZiA9IGEuY2FsbChhcmd1bWVudHMsIDEpO1xyXG5cdFx0dmFyIF90aGlzID0gdGhpcztcclxuXHRcdHZhciBEID0gZnVuY3Rpb24oKSB7XHJcblx0XHRcdHJldHVybiBfdGhpcy5hcHBseSh0aGlzIGluc3RhbmNlb2YgQyA/IHRoaXMgOiBiIHx8IHdpbmRvdywgZi5jb25jYXQoYS5jYWxsKGFyZ3VtZW50cykpKTtcclxuXHRcdH07XHJcblxyXG5cdFx0Qy5wcm90b3R5cGUgPSB0aGlzLnByb3RvdHlwZTtcclxuXHRcdEQucHJvdG90eXBlID0gbmV3IEMoKTtcclxuXHJcblx0XHRyZXR1cm4gRDtcclxuXHR9O1xyXG5cclxufVxyXG5cclxuLyoqXHJcbiAqIEBoZWxsby5qc1xyXG4gKlxyXG4gKiBIZWxsb0pTIGlzIGEgY2xpZW50IHNpZGUgSmF2YXNjcmlwdCBTREsgZm9yIG1ha2luZyBPQXV0aDIgbG9naW5zIGFuZCBzdWJzZXF1ZW50IFJFU1QgY2FsbHMuXHJcbiAqXHJcbiAqIEBhdXRob3IgQW5kcmV3IERvZHNvblxyXG4gKiBAd2Vic2l0ZSBodHRwczovL2Fkb2Rzb24uY29tL2hlbGxvLmpzL1xyXG4gKlxyXG4gKiBAY29weXJpZ2h0IEFuZHJldyBEb2Rzb24sIDIwMTIgLSAyMDE1XHJcbiAqIEBsaWNlbnNlIE1JVDogWW91IGFyZSBmcmVlIHRvIHVzZSBhbmQgbW9kaWZ5IHRoaXMgY29kZSBmb3IgYW55IHVzZSwgb24gdGhlIGNvbmRpdGlvbiB0aGF0IHRoaXMgY29weXJpZ2h0IG5vdGljZSByZW1haW5zLlxyXG4gKi9cclxuXHJcbnZhciBoZWxsbyA9IGZ1bmN0aW9uKG5hbWUpIHtcclxuXHRyZXR1cm4gaGVsbG8udXNlKG5hbWUpO1xyXG59O1xyXG5cclxuaGVsbG8udXRpbHMgPSB7XHJcblxyXG5cdC8vIEV4dGVuZCB0aGUgZmlyc3Qgb2JqZWN0IHdpdGggdGhlIHByb3BlcnRpZXMgYW5kIG1ldGhvZHMgb2YgdGhlIHNlY29uZFxyXG5cdGV4dGVuZDogZnVuY3Rpb24ociAvKiwgYVssIGJbLCAuLi5dXSAqLykge1xyXG5cclxuXHRcdC8vIEdldCB0aGUgYXJndW1lbnRzIGFzIGFuIGFycmF5IGJ1dCBvbW1pdCB0aGUgaW5pdGlhbCBpdGVtXHJcblx0XHRBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpLmZvckVhY2goZnVuY3Rpb24oYSkge1xyXG5cdFx0XHRpZiAoQXJyYXkuaXNBcnJheShyKSAmJiBBcnJheS5pc0FycmF5KGEpKSB7XHJcblx0XHRcdFx0QXJyYXkucHJvdG90eXBlLnB1c2guYXBwbHkociwgYSk7XHJcblx0XHRcdH1cclxuXHRcdFx0ZWxzZSBpZiAociBpbnN0YW5jZW9mIE9iamVjdCAmJiBhIGluc3RhbmNlb2YgT2JqZWN0ICYmIHIgIT09IGEpIHtcclxuXHRcdFx0XHRmb3IgKHZhciB4IGluIGEpIHtcclxuXHRcdFx0XHRcdHJbeF0gPSBoZWxsby51dGlscy5leHRlbmQoclt4XSwgYVt4XSk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHRcdGVsc2Uge1xyXG5cclxuXHRcdFx0XHRpZiAoQXJyYXkuaXNBcnJheShhKSkge1xyXG5cdFx0XHRcdFx0Ly8gQ2xvbmUgaXRcclxuXHRcdFx0XHRcdGEgPSBhLnNsaWNlKDApO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0ciA9IGE7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cclxuXHRcdHJldHVybiByO1xyXG5cdH1cclxufTtcclxuXHJcbi8vIENvcmUgbGlicmFyeVxyXG5oZWxsby51dGlscy5leHRlbmQoaGVsbG8sIHtcclxuXHJcblx0c2V0dGluZ3M6IHtcclxuXHJcblx0XHQvLyBPQXV0aDIgYXV0aGVudGljYXRpb24gZGVmYXVsdHNcclxuXHRcdHJlZGlyZWN0X3VyaTogd2luZG93LmxvY2F0aW9uLmhyZWYuc3BsaXQoJyMnKVswXSxcclxuXHRcdHJlc3BvbnNlX3R5cGU6ICd0b2tlbicsXHJcblx0XHRkaXNwbGF5OiAncG9wdXAnLFxyXG5cdFx0c3RhdGU6ICcnLFxyXG5cclxuXHRcdC8vIE9BdXRoMSBzaGltXHJcblx0XHQvLyBUaGUgcGF0aCB0byB0aGUgT0F1dGgxIHNlcnZlciBmb3Igc2lnbmluZyB1c2VyIHJlcXVlc3RzXHJcblx0XHQvLyBXYW50IHRvIHJlY3JlYXRlIHlvdXIgb3duPyBDaGVja291dCBodHRwczovL2dpdGh1Yi5jb20vTXJTd2l0Y2gvbm9kZS1vYXV0aC1zaGltXHJcblx0XHRvYXV0aF9wcm94eTogJ2h0dHBzOi8vYXV0aC1zZXJ2ZXIuaGVyb2t1YXBwLmNvbS9wcm94eScsXHJcblxyXG5cdFx0Ly8gQVBJIHRpbWVvdXQgaW4gbWlsbGlzZWNvbmRzXHJcblx0XHR0aW1lb3V0OiAyMDAwMCxcclxuXHJcblx0XHQvLyBQb3B1cCBPcHRpb25zXHJcblx0XHRwb3B1cDoge1xyXG5cdFx0XHRyZXNpemFibGU6IDEsXHJcblx0XHRcdHNjcm9sbGJhcnM6IDEsXHJcblx0XHRcdHdpZHRoOiA1MDAsXHJcblx0XHRcdGhlaWdodDogNTUwXHJcblx0XHR9LFxyXG5cclxuXHRcdC8vIERlZmF1bHQgc2NvcGVcclxuXHRcdC8vIE1hbnkgc2VydmljZXMgcmVxdWlyZSBhdGxlYXN0IGEgcHJvZmlsZSBzY29wZSxcclxuXHRcdC8vIEhlbGxvSlMgYXV0b21hdGlhbGx5IGluY2x1ZGVzIHRoZSB2YWx1ZSBvZiBwcm92aWRlci5zY29wZV9tYXAuYmFzaWNcclxuXHRcdC8vIElmIHRoYXQncyBub3QgcmVxdWlyZWQgaXQgY2FuIGJlIHJlbW92ZWQgdmlhIGhlbGxvLnNldHRpbmdzLnNjb3BlLmxlbmd0aCA9IDA7XHJcblx0XHRzY29wZTogWydiYXNpYyddLFxyXG5cclxuXHRcdC8vIFNjb3BlIE1hcHNcclxuXHRcdC8vIFRoaXMgaXMgdGhlIGRlZmF1bHQgbW9kdWxlIHNjb3BlLCB0aGVzZSBhcmUgdGhlIGRlZmF1bHRzIHdoaWNoIGVhY2ggc2VydmljZSBpcyBtYXBwZWQgdG9vLlxyXG5cdFx0Ly8gQnkgaW5jbHVkaW5nIHRoZW0gaGVyZSBpdCBwcmV2ZW50cyB0aGUgc2NvcGUgZnJvbSBiZWluZyBhcHBsaWVkIGFjY2lkZW50YWxseVxyXG5cdFx0c2NvcGVfbWFwOiB7XHJcblx0XHRcdGJhc2ljOiAnJ1xyXG5cdFx0fSxcclxuXHJcblx0XHQvLyBEZWZhdWx0IHNlcnZpY2UgLyBuZXR3b3JrXHJcblx0XHRkZWZhdWx0X3NlcnZpY2U6IG51bGwsXHJcblxyXG5cdFx0Ly8gRm9yY2UgYXV0aGVudGljYXRpb25cclxuXHRcdC8vIFdoZW4gaGVsbG8ubG9naW4gaXMgZmlyZWQuXHJcblx0XHQvLyAobnVsbCk6IGlnbm9yZSBjdXJyZW50IHNlc3Npb24gZXhwaXJ5IGFuZCBjb250aW51ZSB3aXRoIGxvZ2luXHJcblx0XHQvLyAodHJ1ZSk6IGlnbm9yZSBjdXJyZW50IHNlc3Npb24gZXhwaXJ5IGFuZCBjb250aW51ZSB3aXRoIGxvZ2luLCBhc2sgZm9yIHVzZXIgdG8gcmVhdXRoZW50aWNhdGVcclxuXHRcdC8vIChmYWxzZSk6IGlmIHRoZSBjdXJyZW50IHNlc3Npb24gbG9va3MgZ29vZCBmb3IgdGhlIHJlcXVlc3Qgc2NvcGVzIHJldHVybiB0aGUgY3VycmVudCBzZXNzaW9uLlxyXG5cdFx0Zm9yY2U6IG51bGwsXHJcblxyXG5cdFx0Ly8gUGFnZSBVUkxcclxuXHRcdC8vIFdoZW4gJ2Rpc3BsYXk9cGFnZScgdGhpcyBwcm9wZXJ0eSBkZWZpbmVzIHdoZXJlIHRoZSB1c2VycyBwYWdlIHNob3VsZCBlbmQgdXAgYWZ0ZXIgcmVkaXJlY3RfdXJpXHJcblx0XHQvLyBUaHMgY291bGQgYmUgcHJvYmxlbWF0aWMgaWYgdGhlIHJlZGlyZWN0X3VyaSBpcyBpbmRlZWQgdGhlIGZpbmFsIHBsYWNlLFxyXG5cdFx0Ly8gVHlwaWNhbGx5IHRoaXMgY2lyY3VtdmVudHMgdGhlIHByb2JsZW0gb2YgdGhlIHJlZGlyZWN0X3VybCBiZWluZyBhIGR1bWIgcmVsYXkgcGFnZS5cclxuXHRcdHBhZ2VfdXJpOiB3aW5kb3cubG9jYXRpb24uaHJlZlxyXG5cdH0sXHJcblxyXG5cdC8vIFNlcnZpY2UgY29uZmlndXJhdGlvbiBvYmplY3RzXHJcblx0c2VydmljZXM6IHt9LFxyXG5cclxuXHQvLyBVc2VcclxuXHQvLyBEZWZpbmUgYSBuZXcgaW5zdGFuY2Ugb2YgdGhlIEhlbGxvSlMgbGlicmFyeSB3aXRoIGEgZGVmYXVsdCBzZXJ2aWNlXHJcblx0dXNlOiBmdW5jdGlvbihzZXJ2aWNlKSB7XHJcblxyXG5cdFx0Ly8gQ3JlYXRlIHNlbGYsIHdoaWNoIGluaGVyaXRzIGZyb20gaXRzIHBhcmVudFxyXG5cdFx0dmFyIHNlbGYgPSBPYmplY3QuY3JlYXRlKHRoaXMpO1xyXG5cclxuXHRcdC8vIEluaGVyaXQgdGhlIHByb3RvdHlwZSBmcm9tIGl0cyBwYXJlbnRcclxuXHRcdHNlbGYuc2V0dGluZ3MgPSBPYmplY3QuY3JlYXRlKHRoaXMuc2V0dGluZ3MpO1xyXG5cclxuXHRcdC8vIERlZmluZSB0aGUgZGVmYXVsdCBzZXJ2aWNlXHJcblx0XHRpZiAoc2VydmljZSkge1xyXG5cdFx0XHRzZWxmLnNldHRpbmdzLmRlZmF1bHRfc2VydmljZSA9IHNlcnZpY2U7XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gQ3JlYXRlIGFuIGluc3RhbmNlIG9mIEV2ZW50c1xyXG5cdFx0c2VsZi51dGlscy5FdmVudC5jYWxsKHNlbGYpO1xyXG5cclxuXHRcdHJldHVybiBzZWxmO1xyXG5cdH0sXHJcblxyXG5cdC8vIEluaXRpYWxpemVcclxuXHQvLyBEZWZpbmUgdGhlIGNsaWVudF9pZHMgZm9yIHRoZSBlbmRwb2ludCBzZXJ2aWNlc1xyXG5cdC8vIEBwYXJhbSBvYmplY3QgbywgY29udGFpbnMgYSBrZXkgdmFsdWUgcGFpciwgc2VydmljZSA9PiBjbGllbnRJZFxyXG5cdC8vIEBwYXJhbSBvYmplY3Qgb3B0cywgY29udGFpbnMgYSBrZXkgdmFsdWUgcGFpciBvZiBvcHRpb25zIHVzZWQgZm9yIGRlZmluaW5nIHRoZSBhdXRoZW50aWNhdGlvbiBkZWZhdWx0c1xyXG5cdC8vIEBwYXJhbSBudW1iZXIgdGltZW91dCwgdGltZW91dCBpbiBzZWNvbmRzXHJcblx0aW5pdDogZnVuY3Rpb24oc2VydmljZXMsIG9wdGlvbnMpIHtcclxuXHJcblx0XHR2YXIgdXRpbHMgPSB0aGlzLnV0aWxzO1xyXG5cclxuXHRcdGlmICghc2VydmljZXMpIHtcclxuXHRcdFx0cmV0dXJuIHRoaXMuc2VydmljZXM7XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gRGVmaW5lIHByb3ZpZGVyIGNyZWRlbnRpYWxzXHJcblx0XHQvLyBSZWZvcm1hdCB0aGUgSUQgZmllbGRcclxuXHRcdGZvciAodmFyIHggaW4gc2VydmljZXMpIHtpZiAoc2VydmljZXMuaGFzT3duUHJvcGVydHkoeCkpIHtcclxuXHRcdFx0aWYgKHR5cGVvZiAoc2VydmljZXNbeF0pICE9PSAnb2JqZWN0Jykge1xyXG5cdFx0XHRcdHNlcnZpY2VzW3hdID0ge2lkOiBzZXJ2aWNlc1t4XX07XHJcblx0XHRcdH1cclxuXHRcdH19XHJcblxyXG5cdFx0Ly8gTWVyZ2Ugc2VydmljZXMgaWYgdGhlcmUgYWxyZWFkeSBleGlzdHMgc29tZVxyXG5cdFx0dXRpbHMuZXh0ZW5kKHRoaXMuc2VydmljZXMsIHNlcnZpY2VzKTtcclxuXHJcblx0XHQvLyBVcGRhdGUgdGhlIGRlZmF1bHQgc2V0dGluZ3Mgd2l0aCB0aGlzIG9uZS5cclxuXHRcdGlmIChvcHRpb25zKSB7XHJcblx0XHRcdHV0aWxzLmV4dGVuZCh0aGlzLnNldHRpbmdzLCBvcHRpb25zKTtcclxuXHJcblx0XHRcdC8vIERvIHRoaXMgaW1tZWRpYXRseSBpbmNhc2UgdGhlIGJyb3dzZXIgY2hhbmdlcyB0aGUgY3VycmVudCBwYXRoLlxyXG5cdFx0XHRpZiAoJ3JlZGlyZWN0X3VyaScgaW4gb3B0aW9ucykge1xyXG5cdFx0XHRcdHRoaXMuc2V0dGluZ3MucmVkaXJlY3RfdXJpID0gdXRpbHMudXJsKG9wdGlvbnMucmVkaXJlY3RfdXJpKS5ocmVmO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIHRoaXM7XHJcblx0fSxcclxuXHJcblx0Ly8gTG9naW5cclxuXHQvLyBVc2luZyB0aGUgZW5kcG9pbnRcclxuXHQvLyBAcGFyYW0gbmV0d29yayBzdHJpbmdpZnkgICAgICAgbmFtZSB0byBjb25uZWN0IHRvXHJcblx0Ly8gQHBhcmFtIG9wdGlvbnMgb2JqZWN0ICAgIChvcHRpb25hbCkgIHtkaXNwbGF5IG1vZGUsIGlzIGVpdGhlciBub25lfHBvcHVwKGRlZmF1bHQpfHBhZ2UsIHNjb3BlOiBlbWFpbCxiaXJ0aGRheSxwdWJsaXNoLCAuLiB9XHJcblx0Ly8gQHBhcmFtIGNhbGxiYWNrICBmdW5jdGlvbiAgKG9wdGlvbmFsKSAgZmlyZWQgb24gc2lnbmluXHJcblx0bG9naW46IGZ1bmN0aW9uKCkge1xyXG5cclxuXHRcdC8vIENyZWF0ZSBhbiBvYmplY3Qgd2hpY2ggaW5oZXJpdHMgaXRzIHBhcmVudCBhcyB0aGUgcHJvdG90eXBlIGFuZCBjb25zdHJ1Y3RzIGEgbmV3IGV2ZW50IGNoYWluLlxyXG5cdFx0dmFyIF90aGlzID0gdGhpcztcclxuXHRcdHZhciB1dGlscyA9IF90aGlzLnV0aWxzO1xyXG5cdFx0dmFyIGVycm9yID0gdXRpbHMuZXJyb3I7XHJcblx0XHR2YXIgcHJvbWlzZSA9IHV0aWxzLlByb21pc2UoKTtcclxuXHJcblx0XHQvLyBHZXQgcGFyYW1ldGVyc1xyXG5cdFx0dmFyIHAgPSB1dGlscy5hcmdzKHtuZXR3b3JrOiAncycsIG9wdGlvbnM6ICdvJywgY2FsbGJhY2s6ICdmJ30sIGFyZ3VtZW50cyk7XHJcblxyXG5cdFx0Ly8gTG9jYWwgdmFyc1xyXG5cdFx0dmFyIHVybDtcclxuXHJcblx0XHQvLyBHZXQgYWxsIHRoZSBjdXN0b20gb3B0aW9ucyBhbmQgc3RvcmUgdG8gYmUgYXBwZW5kZWQgdG8gdGhlIHF1ZXJ5c3RyaW5nXHJcblx0XHR2YXIgcXMgPSB1dGlscy5kaWZmS2V5KHAub3B0aW9ucywgX3RoaXMuc2V0dGluZ3MpO1xyXG5cclxuXHRcdC8vIE1lcmdlL292ZXJyaWRlIG9wdGlvbnMgd2l0aCBhcHAgZGVmYXVsdHNcclxuXHRcdHZhciBvcHRzID0gcC5vcHRpb25zID0gdXRpbHMubWVyZ2UoX3RoaXMuc2V0dGluZ3MsIHAub3B0aW9ucyB8fCB7fSk7XHJcblxyXG5cdFx0Ly8gTWVyZ2Uvb3ZlcnJpZGUgb3B0aW9ucyB3aXRoIGFwcCBkZWZhdWx0c1xyXG5cdFx0b3B0cy5wb3B1cCA9IHV0aWxzLm1lcmdlKF90aGlzLnNldHRpbmdzLnBvcHVwLCBwLm9wdGlvbnMucG9wdXAgfHwge30pO1xyXG5cclxuXHRcdC8vIE5ldHdvcmtcclxuXHRcdHAubmV0d29yayA9IHAubmV0d29yayB8fCBfdGhpcy5zZXR0aW5ncy5kZWZhdWx0X3NlcnZpY2U7XHJcblxyXG5cdFx0Ly8gQmluZCBjYWxsYmFjayB0byBib3RoIHJlamVjdCBhbmQgZnVsZmlsbCBzdGF0ZXNcclxuXHRcdHByb21pc2UucHJveHkudGhlbihwLmNhbGxiYWNrLCBwLmNhbGxiYWNrKTtcclxuXHJcblx0XHQvLyBUcmlnZ2VyIGFuIGV2ZW50IG9uIHRoZSBnbG9iYWwgbGlzdGVuZXJcclxuXHRcdGZ1bmN0aW9uIGVtaXQocywgdmFsdWUpIHtcclxuXHRcdFx0aGVsbG8uZW1pdChzLCB2YWx1ZSk7XHJcblx0XHR9XHJcblxyXG5cdFx0cHJvbWlzZS5wcm94eS50aGVuKGVtaXQuYmluZCh0aGlzLCAnYXV0aC5sb2dpbiBhdXRoJyksIGVtaXQuYmluZCh0aGlzLCAnYXV0aC5mYWlsZWQgYXV0aCcpKTtcclxuXHJcblx0XHQvLyBJcyBvdXIgc2VydmljZSB2YWxpZD9cclxuXHRcdGlmICh0eXBlb2YgKHAubmV0d29yaykgIT09ICdzdHJpbmcnIHx8ICEocC5uZXR3b3JrIGluIF90aGlzLnNlcnZpY2VzKSkge1xyXG5cdFx0XHQvLyBUcmlnZ2VyIHRoZSBkZWZhdWx0IGxvZ2luLlxyXG5cdFx0XHQvLyBBaGggd2UgZG9udCBoYXZlIG9uZS5cclxuXHRcdFx0cmV0dXJuIHByb21pc2UucmVqZWN0KGVycm9yKCdpbnZhbGlkX25ldHdvcmsnLCAnVGhlIHByb3ZpZGVkIG5ldHdvcmsgd2FzIG5vdCByZWNvZ25pemVkJykpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHZhciBwcm92aWRlciA9IF90aGlzLnNlcnZpY2VzW3AubmV0d29ya107XHJcblxyXG5cdFx0Ly8gQ3JlYXRlIGEgZ2xvYmFsIGxpc3RlbmVyIHRvIGNhcHR1cmUgZXZlbnRzIHRyaWdnZXJlZCBvdXQgb2Ygc2NvcGVcclxuXHRcdHZhciBjYWxsYmFja0lkID0gdXRpbHMuZ2xvYmFsRXZlbnQoZnVuY3Rpb24oc3RyKSB7XHJcblxyXG5cdFx0XHQvLyBUaGUgcmVzcG9uc2VIYW5kbGVyIHJldHVybnMgYSBzdHJpbmcsIGxldHMgc2F2ZSB0aGlzIGxvY2FsbHlcclxuXHRcdFx0dmFyIG9iajtcclxuXHJcblx0XHRcdGlmIChzdHIpIHtcclxuXHRcdFx0XHRvYmogPSBKU09OLnBhcnNlKHN0cik7XHJcblx0XHRcdH1cclxuXHRcdFx0ZWxzZSB7XHJcblx0XHRcdFx0b2JqID0gZXJyb3IoJ2NhbmNlbGxlZCcsICdUaGUgYXV0aGVudGljYXRpb24gd2FzIG5vdCBjb21wbGV0ZWQnKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0Ly8gSGFuZGxlIHRoZXNlIHJlc3BvbnNlIHVzaW5nIHRoZSBsb2NhbFxyXG5cdFx0XHQvLyBUcmlnZ2VyIG9uIHRoZSBwYXJlbnRcclxuXHRcdFx0aWYgKCFvYmouZXJyb3IpIHtcclxuXHJcblx0XHRcdFx0Ly8gU2F2ZSBvbiB0aGUgcGFyZW50IHdpbmRvdyB0aGUgbmV3IGNyZWRlbnRpYWxzXHJcblx0XHRcdFx0Ly8gVGhpcyBmaXhlcyBhbiBJRTEwIGJ1ZyBpIHRoaW5rLi4uIGF0bGVhc3QgaXQgZG9lcyBmb3IgbWUuXHJcblx0XHRcdFx0dXRpbHMuc3RvcmUob2JqLm5ldHdvcmssIG9iaik7XHJcblxyXG5cdFx0XHRcdC8vIEZ1bGZpbGwgYSBzdWNjZXNzZnVsIGxvZ2luXHJcblx0XHRcdFx0cHJvbWlzZS5mdWxmaWxsKHtcclxuXHRcdFx0XHRcdG5ldHdvcms6IG9iai5uZXR3b3JrLFxyXG5cdFx0XHRcdFx0YXV0aFJlc3BvbnNlOiBvYmpcclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0fVxyXG5cdFx0XHRlbHNlIHtcclxuXHRcdFx0XHQvLyBSZWplY3QgYSBzdWNjZXNzZnVsIGxvZ2luXHJcblx0XHRcdFx0cHJvbWlzZS5yZWplY3Qob2JqKTtcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblxyXG5cdFx0dmFyIHJlZGlyZWN0VXJpID0gdXRpbHMudXJsKG9wdHMucmVkaXJlY3RfdXJpKS5ocmVmO1xyXG5cclxuXHRcdC8vIE1heSBiZSBhIHNwYWNlLWRlbGltaXRlZCBsaXN0IG9mIG11bHRpcGxlLCBjb21wbGVtZW50YXJ5IHR5cGVzXHJcblx0XHR2YXIgcmVzcG9uc2VUeXBlID0gcHJvdmlkZXIub2F1dGgucmVzcG9uc2VfdHlwZSB8fCBvcHRzLnJlc3BvbnNlX3R5cGU7XHJcblxyXG5cdFx0Ly8gRmFsbGJhY2sgdG8gdG9rZW4gaWYgdGhlIG1vZHVsZSBoYXNuJ3QgZGVmaW5lZCBhIGdyYW50IHVybFxyXG5cdFx0aWYgKC9cXGJjb2RlXFxiLy50ZXN0KHJlc3BvbnNlVHlwZSkgJiYgIXByb3ZpZGVyLm9hdXRoLmdyYW50KSB7XHJcblx0XHRcdHJlc3BvbnNlVHlwZSA9IHJlc3BvbnNlVHlwZS5yZXBsYWNlKC9cXGJjb2RlXFxiLywgJ3Rva2VuJyk7XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gUXVlcnkgc3RyaW5nIHBhcmFtZXRlcnMsIHdlIG1heSBwYXNzIG91ciBvd24gYXJndW1lbnRzIHRvIGZvcm0gdGhlIHF1ZXJ5c3RyaW5nXHJcblx0XHRwLnFzID0gdXRpbHMubWVyZ2UocXMsIHtcclxuXHRcdFx0Y2xpZW50X2lkOiBlbmNvZGVVUklDb21wb25lbnQocHJvdmlkZXIuaWQpLFxyXG5cdFx0XHRyZXNwb25zZV90eXBlOiBlbmNvZGVVUklDb21wb25lbnQocmVzcG9uc2VUeXBlKSxcclxuXHRcdFx0cmVkaXJlY3RfdXJpOiBlbmNvZGVVUklDb21wb25lbnQocmVkaXJlY3RVcmkpLFxyXG5cdFx0XHRzdGF0ZToge1xyXG5cdFx0XHRcdGNsaWVudF9pZDogcHJvdmlkZXIuaWQsXHJcblx0XHRcdFx0bmV0d29yazogcC5uZXR3b3JrLFxyXG5cdFx0XHRcdGRpc3BsYXk6IG9wdHMuZGlzcGxheSxcclxuXHRcdFx0XHRjYWxsYmFjazogY2FsbGJhY2tJZCxcclxuXHRcdFx0XHRzdGF0ZTogb3B0cy5zdGF0ZSxcclxuXHRcdFx0XHRyZWRpcmVjdF91cmk6IHJlZGlyZWN0VXJpXHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cclxuXHRcdC8vIEdldCBjdXJyZW50IHNlc3Npb24gZm9yIG1lcmdpbmcgc2NvcGVzLCBhbmQgZm9yIHF1aWNrIGF1dGggcmVzcG9uc2VcclxuXHRcdHZhciBzZXNzaW9uID0gdXRpbHMuc3RvcmUocC5uZXR3b3JrKTtcclxuXHJcblx0XHQvLyBTY29wZXMgKGF1dGhlbnRpY2F0aW9uIHBlcm1pc2lvbnMpXHJcblx0XHQvLyBFbnN1cmUgdGhpcyBpcyBhIHN0cmluZyAtIElFIGhhcyBhIHByb2JsZW0gbW92aW5nIEFycmF5cyBiZXR3ZWVuIHdpbmRvd3NcclxuXHRcdC8vIEFwcGVuZCB0aGUgc2V0dXAgc2NvcGVcclxuXHRcdHZhciBTQ09QRV9TUExJVCA9IC9bLFxcc10rLztcclxuXHJcblx0XHQvLyBJbmNsdWRlIGRlZmF1bHQgc2NvcGUgc2V0dGluZ3MgKGNsb25lZCkuXHJcblx0XHR2YXIgc2NvcGUgPSBfdGhpcy5zZXR0aW5ncy5zY29wZSA/IFtfdGhpcy5zZXR0aW5ncy5zY29wZS50b1N0cmluZygpXSA6IFtdO1xyXG5cclxuXHRcdC8vIEV4dGVuZCB0aGUgcHJvdmlkZXJzIHNjb3BlIGxpc3Qgd2l0aCB0aGUgZGVmYXVsdFxyXG5cdFx0dmFyIHNjb3BlTWFwID0gdXRpbHMubWVyZ2UoX3RoaXMuc2V0dGluZ3Muc2NvcGVfbWFwLCBwcm92aWRlci5zY29wZSB8fCB7fSk7XHJcblxyXG5cdFx0Ly8gQWRkIHVzZXIgZGVmaW5lZCBzY29wZXMuLi5cclxuXHRcdGlmIChvcHRzLnNjb3BlKSB7XHJcblx0XHRcdHNjb3BlLnB1c2gob3B0cy5zY29wZS50b1N0cmluZygpKTtcclxuXHRcdH1cclxuXHJcblx0XHQvLyBBcHBlbmQgc2NvcGVzIGZyb20gYSBwcmV2aW91cyBzZXNzaW9uLlxyXG5cdFx0Ly8gVGhpcyBoZWxwcyBrZWVwIGFwcCBjcmVkZW50aWFscyBjb25zdGFudCxcclxuXHRcdC8vIEF2b2lkaW5nIGhhdmluZyB0byBrZWVwIHRhYnMgb24gd2hhdCBzY29wZXMgYXJlIGF1dGhvcml6ZWRcclxuXHRcdGlmIChzZXNzaW9uICYmICdzY29wZScgaW4gc2Vzc2lvbiAmJiBzZXNzaW9uLnNjb3BlIGluc3RhbmNlb2YgU3RyaW5nKSB7XHJcblx0XHRcdHNjb3BlLnB1c2goc2Vzc2lvbi5zY29wZSk7XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gSm9pbiBhbmQgU3BsaXQgYWdhaW5cclxuXHRcdHNjb3BlID0gc2NvcGUuam9pbignLCcpLnNwbGl0KFNDT1BFX1NQTElUKTtcclxuXHJcblx0XHQvLyBGb3JtYXQgcmVtb3ZlIGR1cGxpY2F0ZXMgYW5kIGVtcHR5IHZhbHVlc1xyXG5cdFx0c2NvcGUgPSB1dGlscy51bmlxdWUoc2NvcGUpLmZpbHRlcihmaWx0ZXJFbXB0eSk7XHJcblxyXG5cdFx0Ly8gU2F2ZSB0aGUgdGhlIHNjb3BlcyB0byB0aGUgc3RhdGUgd2l0aCB0aGUgbmFtZXMgdGhhdCB0aGV5IHdlcmUgcmVxdWVzdGVkIHdpdGguXHJcblx0XHRwLnFzLnN0YXRlLnNjb3BlID0gc2NvcGUuam9pbignLCcpO1xyXG5cclxuXHRcdC8vIE1hcCBzY29wZXMgdG8gdGhlIHByb3ZpZGVycyBuYW1pbmcgY29udmVudGlvblxyXG5cdFx0c2NvcGUgPSBzY29wZS5tYXAoZnVuY3Rpb24oaXRlbSkge1xyXG5cdFx0XHQvLyBEb2VzIHRoaXMgaGF2ZSBhIG1hcHBpbmc/XHJcblx0XHRcdHJldHVybiAoaXRlbSBpbiBzY29wZU1hcCkgPyBzY29wZU1hcFtpdGVtXSA6IGl0ZW07XHJcblx0XHR9KTtcclxuXHJcblx0XHQvLyBTdHJpbmdpZnkgYW5kIEFycmF5aWZ5IHNvIHRoYXQgZG91YmxlIG1hcHBlZCBzY29wZXMgYXJlIGdpdmVuIHRoZSBjaGFuY2UgdG8gYmUgZm9ybWF0dGVkXHJcblx0XHRzY29wZSA9IHNjb3BlLmpvaW4oJywnKS5zcGxpdChTQ09QRV9TUExJVCk7XHJcblxyXG5cdFx0Ly8gQWdhaW4uLi5cclxuXHRcdC8vIEZvcm1hdCByZW1vdmUgZHVwbGljYXRlcyBhbmQgZW1wdHkgdmFsdWVzXHJcblx0XHRzY29wZSA9IHV0aWxzLnVuaXF1ZShzY29wZSkuZmlsdGVyKGZpbHRlckVtcHR5KTtcclxuXHJcblx0XHQvLyBKb2luIHdpdGggdGhlIGV4cGVjdGVkIHNjb3BlIGRlbGltaXRlciBpbnRvIGEgc3RyaW5nXHJcblx0XHRwLnFzLnNjb3BlID0gc2NvcGUuam9pbihwcm92aWRlci5zY29wZV9kZWxpbSB8fCAnLCcpO1xyXG5cclxuXHRcdC8vIElzIHRoZSB1c2VyIGFscmVhZHkgc2lnbmVkIGluIHdpdGggdGhlIGFwcHJvcHJpYXRlIHNjb3BlcywgdmFsaWQgYWNjZXNzX3Rva2VuP1xyXG5cdFx0aWYgKG9wdHMuZm9yY2UgPT09IGZhbHNlKSB7XHJcblxyXG5cdFx0XHRpZiAoc2Vzc2lvbiAmJiAnYWNjZXNzX3Rva2VuJyBpbiBzZXNzaW9uICYmIHNlc3Npb24uYWNjZXNzX3Rva2VuICYmICdleHBpcmVzJyBpbiBzZXNzaW9uICYmIHNlc3Npb24uZXhwaXJlcyA+ICgobmV3IERhdGUoKSkuZ2V0VGltZSgpIC8gMWUzKSkge1xyXG5cdFx0XHRcdC8vIFdoYXQgaXMgZGlmZmVyZW50IGFib3V0IHRoZSBzY29wZXMgaW4gdGhlIHNlc3Npb24gdnMgdGhlIHNjb3BlcyBpbiB0aGUgbmV3IGxvZ2luP1xyXG5cdFx0XHRcdHZhciBkaWZmID0gdXRpbHMuZGlmZigoc2Vzc2lvbi5zY29wZSB8fCAnJykuc3BsaXQoU0NPUEVfU1BMSVQpLCAocC5xcy5zdGF0ZS5zY29wZSB8fCAnJykuc3BsaXQoU0NPUEVfU1BMSVQpKTtcclxuXHRcdFx0XHRpZiAoZGlmZi5sZW5ndGggPT09IDApIHtcclxuXHJcblx0XHRcdFx0XHQvLyBPSyB0cmlnZ2VyIHRoZSBjYWxsYmFja1xyXG5cdFx0XHRcdFx0cHJvbWlzZS5mdWxmaWxsKHtcclxuXHRcdFx0XHRcdFx0dW5jaGFuZ2VkOiB0cnVlLFxyXG5cdFx0XHRcdFx0XHRuZXR3b3JrOiBwLm5ldHdvcmssXHJcblx0XHRcdFx0XHRcdGF1dGhSZXNwb25zZTogc2Vzc2lvblxyXG5cdFx0XHRcdFx0fSk7XHJcblxyXG5cdFx0XHRcdFx0Ly8gTm90aGluZyBoYXMgY2hhbmdlZFxyXG5cdFx0XHRcdFx0cmV0dXJuIHByb21pc2U7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gUGFnZSBVUkxcclxuXHRcdGlmIChvcHRzLmRpc3BsYXkgPT09ICdwYWdlJyAmJiBvcHRzLnBhZ2VfdXJpKSB7XHJcblx0XHRcdC8vIEFkZCBhIHBhZ2UgbG9jYXRpb24sIHBsYWNlIHRvIGVuZHVwIGFmdGVyIHNlc3Npb24gaGFzIGF1dGhlbnRpY2F0ZWRcclxuXHRcdFx0cC5xcy5zdGF0ZS5wYWdlX3VyaSA9IHV0aWxzLnVybChvcHRzLnBhZ2VfdXJpKS5ocmVmO1xyXG5cdFx0fVxyXG5cclxuXHRcdC8vIEJlc3Bva2VcclxuXHRcdC8vIE92ZXJyaWRlIGxvZ2luIHF1ZXJ5c3RyaW5ncyBmcm9tIGF1dGhfb3B0aW9uc1xyXG5cdFx0aWYgKCdsb2dpbicgaW4gcHJvdmlkZXIgJiYgdHlwZW9mIChwcm92aWRlci5sb2dpbikgPT09ICdmdW5jdGlvbicpIHtcclxuXHRcdFx0Ly8gRm9ybWF0IHRoZSBwYXJhbWF0ZXJzIGFjY29yZGluZyB0byB0aGUgcHJvdmlkZXJzIGZvcm1hdHRpbmcgZnVuY3Rpb25cclxuXHRcdFx0cHJvdmlkZXIubG9naW4ocCk7XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gQWRkIE9BdXRoIHRvIHN0YXRlXHJcblx0XHQvLyBXaGVyZSB0aGUgc2VydmljZSBpcyBnb2luZyB0byB0YWtlIGFkdmFudGFnZSBvZiB0aGUgb2F1dGhfcHJveHlcclxuXHRcdGlmICghL1xcYnRva2VuXFxiLy50ZXN0KHJlc3BvbnNlVHlwZSkgfHxcclxuXHRcdHBhcnNlSW50KHByb3ZpZGVyLm9hdXRoLnZlcnNpb24sIDEwKSA8IDIgfHxcclxuXHRcdChvcHRzLmRpc3BsYXkgPT09ICdub25lJyAmJiBwcm92aWRlci5vYXV0aC5ncmFudCAmJiBzZXNzaW9uICYmIHNlc3Npb24ucmVmcmVzaF90b2tlbikpIHtcclxuXHJcblx0XHRcdC8vIEFkZCB0aGUgb2F1dGggZW5kcG9pbnRzXHJcblx0XHRcdHAucXMuc3RhdGUub2F1dGggPSBwcm92aWRlci5vYXV0aDtcclxuXHJcblx0XHRcdC8vIEFkZCB0aGUgcHJveHkgdXJsXHJcblx0XHRcdHAucXMuc3RhdGUub2F1dGhfcHJveHkgPSBvcHRzLm9hdXRoX3Byb3h5O1xyXG5cclxuXHRcdH1cclxuXHJcblx0XHQvLyBDb252ZXJ0IHN0YXRlIHRvIGEgc3RyaW5nXHJcblx0XHRwLnFzLnN0YXRlID0gZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHAucXMuc3RhdGUpKTtcclxuXHJcblx0XHQvLyBVUkxcclxuXHRcdGlmIChwYXJzZUludChwcm92aWRlci5vYXV0aC52ZXJzaW9uLCAxMCkgPT09IDEpIHtcclxuXHJcblx0XHRcdC8vIFR1cm4gdGhlIHJlcXVlc3QgdG8gdGhlIE9BdXRoIFByb3h5IGZvciAzLWxlZ2dlZCBhdXRoXHJcblx0XHRcdHVybCA9IHV0aWxzLnFzKG9wdHMub2F1dGhfcHJveHksIHAucXMsIGVuY29kZUZ1bmN0aW9uKTtcclxuXHRcdH1cclxuXHJcblx0XHQvLyBSZWZyZXNoIHRva2VuXHJcblx0XHRlbHNlIGlmIChvcHRzLmRpc3BsYXkgPT09ICdub25lJyAmJiBwcm92aWRlci5vYXV0aC5ncmFudCAmJiBzZXNzaW9uICYmIHNlc3Npb24ucmVmcmVzaF90b2tlbikge1xyXG5cclxuXHRcdFx0Ly8gQWRkIHRoZSByZWZyZXNoX3Rva2VuIHRvIHRoZSByZXF1ZXN0XHJcblx0XHRcdHAucXMucmVmcmVzaF90b2tlbiA9IHNlc3Npb24ucmVmcmVzaF90b2tlbjtcclxuXHJcblx0XHRcdC8vIERlZmluZSB0aGUgcmVxdWVzdCBwYXRoXHJcblx0XHRcdHVybCA9IHV0aWxzLnFzKG9wdHMub2F1dGhfcHJveHksIHAucXMsIGVuY29kZUZ1bmN0aW9uKTtcclxuXHRcdH1cclxuXHRcdGVsc2Uge1xyXG5cdFx0XHR1cmwgPSB1dGlscy5xcyhwcm92aWRlci5vYXV0aC5hdXRoLCBwLnFzLCBlbmNvZGVGdW5jdGlvbik7XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gQnJvYWRjYXN0IHRoaXMgZXZlbnQgYXMgYW4gYXV0aDppbml0XHJcblx0XHRlbWl0KCdhdXRoLmluaXQnLCBwKTtcclxuXHJcblx0XHQvLyBFeGVjdXRlXHJcblx0XHQvLyBUcmlnZ2VyIGhvdyB3ZSB3YW50IHNlbGYgZGlzcGxheWVkXHJcblx0XHRpZiAob3B0cy5kaXNwbGF5ID09PSAnbm9uZScpIHtcclxuXHRcdFx0Ly8gU2lnbi1pbiBpbiB0aGUgYmFja2dyb3VuZCwgaWZyYW1lXHJcblx0XHRcdHV0aWxzLmlmcmFtZSh1cmwsIHJlZGlyZWN0VXJpKTtcclxuXHRcdH1cclxuXHJcblx0XHQvLyBUcmlnZ2VyaW5nIHBvcHVwP1xyXG5cdFx0ZWxzZSBpZiAob3B0cy5kaXNwbGF5ID09PSAncG9wdXAnKSB7XHJcblxyXG5cdFx0XHR2YXIgcG9wdXAgPSB1dGlscy5wb3B1cCh1cmwsIHJlZGlyZWN0VXJpLCBvcHRzLnBvcHVwKTtcclxuXHJcblx0XHRcdHZhciB0aW1lciA9IHNldEludGVydmFsKGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdGlmICghcG9wdXAgfHwgcG9wdXAuY2xvc2VkKSB7XHJcblx0XHRcdFx0XHRjbGVhckludGVydmFsKHRpbWVyKTtcclxuXHRcdFx0XHRcdGlmICghcHJvbWlzZS5zdGF0ZSkge1xyXG5cclxuXHRcdFx0XHRcdFx0dmFyIHJlc3BvbnNlID0gZXJyb3IoJ2NhbmNlbGxlZCcsICdMb2dpbiBoYXMgYmVlbiBjYW5jZWxsZWQnKTtcclxuXHJcblx0XHRcdFx0XHRcdGlmICghcG9wdXApIHtcclxuXHRcdFx0XHRcdFx0XHRyZXNwb25zZSA9IGVycm9yKCdibG9ja2VkJywgJ1BvcHVwIHdhcyBibG9ja2VkJyk7XHJcblx0XHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHRcdHJlc3BvbnNlLm5ldHdvcmsgPSBwLm5ldHdvcms7XHJcblxyXG5cdFx0XHRcdFx0XHRwcm9taXNlLnJlamVjdChyZXNwb25zZSk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9LCAxMDApO1xyXG5cdFx0fVxyXG5cclxuXHRcdGVsc2Uge1xyXG5cdFx0XHR3aW5kb3cubG9jYXRpb24gPSB1cmw7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIHByb21pc2UucHJveHk7XHJcblxyXG5cdFx0ZnVuY3Rpb24gZW5jb2RlRnVuY3Rpb24ocykge3JldHVybiBzO31cclxuXHJcblx0XHRmdW5jdGlvbiBmaWx0ZXJFbXB0eShzKSB7cmV0dXJuICEhczt9XHJcblx0fSxcclxuXHJcblx0Ly8gUmVtb3ZlIGFueSBkYXRhIGFzc29jaWF0ZWQgd2l0aCBhIGdpdmVuIHNlcnZpY2VcclxuXHQvLyBAcGFyYW0gc3RyaW5nIG5hbWUgb2YgdGhlIHNlcnZpY2VcclxuXHQvLyBAcGFyYW0gZnVuY3Rpb24gY2FsbGJhY2tcclxuXHRsb2dvdXQ6IGZ1bmN0aW9uKCkge1xyXG5cclxuXHRcdHZhciBfdGhpcyA9IHRoaXM7XHJcblx0XHR2YXIgdXRpbHMgPSBfdGhpcy51dGlscztcclxuXHRcdHZhciBlcnJvciA9IHV0aWxzLmVycm9yO1xyXG5cclxuXHRcdC8vIENyZWF0ZSBhIG5ldyBwcm9taXNlXHJcblx0XHR2YXIgcHJvbWlzZSA9IHV0aWxzLlByb21pc2UoKTtcclxuXHJcblx0XHR2YXIgcCA9IHV0aWxzLmFyZ3Moe25hbWU6J3MnLCBvcHRpb25zOiAnbycsIGNhbGxiYWNrOiAnZid9LCBhcmd1bWVudHMpO1xyXG5cclxuXHRcdHAub3B0aW9ucyA9IHAub3B0aW9ucyB8fCB7fTtcclxuXHJcblx0XHQvLyBBZGQgY2FsbGJhY2sgdG8gZXZlbnRzXHJcblx0XHRwcm9taXNlLnByb3h5LnRoZW4ocC5jYWxsYmFjaywgcC5jYWxsYmFjayk7XHJcblxyXG5cdFx0Ly8gVHJpZ2dlciBhbiBldmVudCBvbiB0aGUgZ2xvYmFsIGxpc3RlbmVyXHJcblx0XHRmdW5jdGlvbiBlbWl0KHMsIHZhbHVlKSB7XHJcblx0XHRcdGhlbGxvLmVtaXQocywgdmFsdWUpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHByb21pc2UucHJveHkudGhlbihlbWl0LmJpbmQodGhpcywgJ2F1dGgubG9nb3V0IGF1dGgnKSwgZW1pdC5iaW5kKHRoaXMsICdlcnJvcicpKTtcclxuXHJcblx0XHQvLyBOZXR3b3JrXHJcblx0XHRwLm5hbWUgPSBwLm5hbWUgfHwgdGhpcy5zZXR0aW5ncy5kZWZhdWx0X3NlcnZpY2U7XHJcblx0XHRwLmF1dGhSZXNwb25zZSA9IHV0aWxzLnN0b3JlKHAubmFtZSk7XHJcblxyXG5cdFx0aWYgKHAubmFtZSAmJiAhKHAubmFtZSBpbiBfdGhpcy5zZXJ2aWNlcykpIHtcclxuXHJcblx0XHRcdHByb21pc2UucmVqZWN0KGVycm9yKCdpbnZhbGlkX25ldHdvcmsnLCAnVGhlIG5ldHdvcmsgd2FzIHVucmVjb2duaXplZCcpKTtcclxuXHJcblx0XHR9XHJcblx0XHRlbHNlIGlmIChwLm5hbWUgJiYgcC5hdXRoUmVzcG9uc2UpIHtcclxuXHJcblx0XHRcdC8vIERlZmluZSB0aGUgY2FsbGJhY2tcclxuXHRcdFx0dmFyIGNhbGxiYWNrID0gZnVuY3Rpb24ob3B0cykge1xyXG5cclxuXHRcdFx0XHQvLyBSZW1vdmUgZnJvbSB0aGUgc3RvcmVcclxuXHRcdFx0XHR1dGlscy5zdG9yZShwLm5hbWUsIG51bGwpO1xyXG5cclxuXHRcdFx0XHQvLyBFbWl0IGV2ZW50cyBieSBkZWZhdWx0XHJcblx0XHRcdFx0cHJvbWlzZS5mdWxmaWxsKGhlbGxvLnV0aWxzLm1lcmdlKHtuZXR3b3JrOnAubmFtZX0sIG9wdHMgfHwge30pKTtcclxuXHRcdFx0fTtcclxuXHJcblx0XHRcdC8vIFJ1biBhbiBhc3luYyBvcGVyYXRpb24gdG8gcmVtb3ZlIHRoZSB1c2VycyBzZXNzaW9uXHJcblx0XHRcdHZhciBfb3B0cyA9IHt9O1xyXG5cdFx0XHRpZiAocC5vcHRpb25zLmZvcmNlKSB7XHJcblx0XHRcdFx0dmFyIGxvZ291dCA9IF90aGlzLnNlcnZpY2VzW3AubmFtZV0ubG9nb3V0O1xyXG5cdFx0XHRcdGlmIChsb2dvdXQpIHtcclxuXHRcdFx0XHRcdC8vIENvbnZlcnQgbG9nb3V0IHRvIFVSTCBzdHJpbmcsXHJcblx0XHRcdFx0XHQvLyBJZiBubyBzdHJpbmcgaXMgcmV0dXJuZWQsIHRoZW4gdGhpcyBmdW5jdGlvbiB3aWxsIGhhbmRsZSB0aGUgbG9nb3V0IGFzeW5jIHN0eWxlXHJcblx0XHRcdFx0XHRpZiAodHlwZW9mIChsb2dvdXQpID09PSAnZnVuY3Rpb24nKSB7XHJcblx0XHRcdFx0XHRcdGxvZ291dCA9IGxvZ291dChjYWxsYmFjaywgcCk7XHJcblx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0Ly8gSWYgbG9nb3V0IGlzIGEgc3RyaW5nIHRoZW4gYXNzdW1lIFVSTCBhbmQgb3BlbiBpbiBpZnJhbWUuXHJcblx0XHRcdFx0XHRpZiAodHlwZW9mIChsb2dvdXQpID09PSAnc3RyaW5nJykge1xyXG5cdFx0XHRcdFx0XHR1dGlscy5pZnJhbWUobG9nb3V0KTtcclxuXHRcdFx0XHRcdFx0X29wdHMuZm9yY2UgPSBudWxsO1xyXG5cdFx0XHRcdFx0XHRfb3B0cy5tZXNzYWdlID0gJ0xvZ291dCBzdWNjZXNzIG9uIHByb3ZpZGVycyBzaXRlIHdhcyBpbmRldGVybWluYXRlJztcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdGVsc2UgaWYgKGxvZ291dCA9PT0gdW5kZWZpbmVkKSB7XHJcblx0XHRcdFx0XHRcdC8vIFRoZSBjYWxsYmFjayBmdW5jdGlvbiB3aWxsIGhhbmRsZSB0aGUgcmVzcG9uc2UuXHJcblx0XHRcdFx0XHRcdHJldHVybiBwcm9taXNlLnByb3h5O1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0Ly8gUmVtb3ZlIGxvY2FsIGNyZWRlbnRpYWxzXHJcblx0XHRcdGNhbGxiYWNrKF9vcHRzKTtcclxuXHRcdH1cclxuXHRcdGVsc2Uge1xyXG5cdFx0XHRwcm9taXNlLnJlamVjdChlcnJvcignaW52YWxpZF9zZXNzaW9uJywgJ1RoZXJlIHdhcyBubyBzZXNzaW9uIHRvIHJlbW92ZScpKTtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gcHJvbWlzZS5wcm94eTtcclxuXHR9LFxyXG5cclxuXHQvLyBSZXR1cm5zIGFsbCB0aGUgc2Vzc2lvbnMgdGhhdCBhcmUgc3Vic2NyaWJlZCB0b29cclxuXHQvLyBAcGFyYW0gc3RyaW5nIG9wdGlvbmFsLCBuYW1lIG9mIHRoZSBzZXJ2aWNlIHRvIGdldCBpbmZvcm1hdGlvbiBhYm91dC5cclxuXHRnZXRBdXRoUmVzcG9uc2U6IGZ1bmN0aW9uKHNlcnZpY2UpIHtcclxuXHJcblx0XHQvLyBJZiB0aGUgc2VydmljZSBkb2Vzbid0IGV4aXN0XHJcblx0XHRzZXJ2aWNlID0gc2VydmljZSB8fCB0aGlzLnNldHRpbmdzLmRlZmF1bHRfc2VydmljZTtcclxuXHJcblx0XHRpZiAoIXNlcnZpY2UgfHwgIShzZXJ2aWNlIGluIHRoaXMuc2VydmljZXMpKSB7XHJcblx0XHRcdHJldHVybiBudWxsO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiB0aGlzLnV0aWxzLnN0b3JlKHNlcnZpY2UpIHx8IG51bGw7XHJcblx0fSxcclxuXHJcblx0Ly8gRXZlbnRzOiBwbGFjZWhvbGRlciBmb3IgdGhlIGV2ZW50c1xyXG5cdGV2ZW50czoge31cclxufSk7XHJcblxyXG4vLyBDb3JlIHV0aWxpdGllc1xyXG5oZWxsby51dGlscy5leHRlbmQoaGVsbG8udXRpbHMsIHtcclxuXHJcblx0Ly8gRXJyb3JcclxuXHRlcnJvcjogZnVuY3Rpb24oY29kZSwgbWVzc2FnZSkge1xyXG5cdFx0cmV0dXJuIHtcclxuXHRcdFx0ZXJyb3I6IHtcclxuXHRcdFx0XHRjb2RlOiBjb2RlLFxyXG5cdFx0XHRcdG1lc3NhZ2U6IG1lc3NhZ2VcclxuXHRcdFx0fVxyXG5cdFx0fTtcclxuXHR9LFxyXG5cclxuXHQvLyBBcHBlbmQgdGhlIHF1ZXJ5c3RyaW5nIHRvIGEgdXJsXHJcblx0Ly8gQHBhcmFtIHN0cmluZyB1cmxcclxuXHQvLyBAcGFyYW0gb2JqZWN0IHBhcmFtZXRlcnNcclxuXHRxczogZnVuY3Rpb24odXJsLCBwYXJhbXMsIGZvcm1hdEZ1bmN0aW9uKSB7XHJcblxyXG5cdFx0aWYgKHBhcmFtcykge1xyXG5cclxuXHRcdFx0Ly8gU2V0IGRlZmF1bHQgZm9ybWF0dGluZyBmdW5jdGlvblxyXG5cdFx0XHRmb3JtYXRGdW5jdGlvbiA9IGZvcm1hdEZ1bmN0aW9uIHx8IGVuY29kZVVSSUNvbXBvbmVudDtcclxuXHJcblx0XHRcdC8vIE92ZXJyaWRlIHRoZSBpdGVtcyBpbiB0aGUgVVJMIHdoaWNoIGFscmVhZHkgZXhpc3RcclxuXHRcdFx0Zm9yICh2YXIgeCBpbiBwYXJhbXMpIHtcclxuXHRcdFx0XHR2YXIgc3RyID0gJyhbXFxcXD9cXFxcJl0pJyArIHggKyAnPVteXFxcXCZdKic7XHJcblx0XHRcdFx0dmFyIHJlZyA9IG5ldyBSZWdFeHAoc3RyKTtcclxuXHRcdFx0XHRpZiAodXJsLm1hdGNoKHJlZykpIHtcclxuXHRcdFx0XHRcdHVybCA9IHVybC5yZXBsYWNlKHJlZywgJyQxJyArIHggKyAnPScgKyBmb3JtYXRGdW5jdGlvbihwYXJhbXNbeF0pKTtcclxuXHRcdFx0XHRcdGRlbGV0ZSBwYXJhbXNbeF07XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKCF0aGlzLmlzRW1wdHkocGFyYW1zKSkge1xyXG5cdFx0XHRyZXR1cm4gdXJsICsgKHVybC5pbmRleE9mKCc/JykgPiAtMSA/ICcmJyA6ICc/JykgKyB0aGlzLnBhcmFtKHBhcmFtcywgZm9ybWF0RnVuY3Rpb24pO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiB1cmw7XHJcblx0fSxcclxuXHJcblx0Ly8gUGFyYW1cclxuXHQvLyBFeHBsb2RlL2VuY29kZSB0aGUgcGFyYW1ldGVycyBvZiBhbiBVUkwgc3RyaW5nL29iamVjdFxyXG5cdC8vIEBwYXJhbSBzdHJpbmcgcywgc3RyaW5nIHRvIGRlY29kZVxyXG5cdHBhcmFtOiBmdW5jdGlvbihzLCBmb3JtYXRGdW5jdGlvbikge1xyXG5cdFx0dmFyIGI7XHJcblx0XHR2YXIgYSA9IHt9O1xyXG5cdFx0dmFyIG07XHJcblxyXG5cdFx0aWYgKHR5cGVvZiAocykgPT09ICdzdHJpbmcnKSB7XHJcblxyXG5cdFx0XHRmb3JtYXRGdW5jdGlvbiA9IGZvcm1hdEZ1bmN0aW9uIHx8IGRlY29kZVVSSUNvbXBvbmVudDtcclxuXHJcblx0XHRcdG0gPSBzLnJlcGxhY2UoL15bXFwjXFw/XS8sICcnKS5tYXRjaCgvKFtePVxcL1xcJl0rKT0oW15cXCZdKykvZyk7XHJcblx0XHRcdGlmIChtKSB7XHJcblx0XHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBtLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdFx0XHRiID0gbVtpXS5tYXRjaCgvKFtePV0rKT0oLiopLyk7XHJcblx0XHRcdFx0XHRhW2JbMV1dID0gZm9ybWF0RnVuY3Rpb24oYlsyXSk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRyZXR1cm4gYTtcclxuXHRcdH1cclxuXHRcdGVsc2Uge1xyXG5cclxuXHRcdFx0Zm9ybWF0RnVuY3Rpb24gPSBmb3JtYXRGdW5jdGlvbiB8fCBlbmNvZGVVUklDb21wb25lbnQ7XHJcblxyXG5cdFx0XHR2YXIgbyA9IHM7XHJcblxyXG5cdFx0XHRhID0gW107XHJcblxyXG5cdFx0XHRmb3IgKHZhciB4IGluIG8pIHtpZiAoby5oYXNPd25Qcm9wZXJ0eSh4KSkge1xyXG5cdFx0XHRcdGlmIChvLmhhc093blByb3BlcnR5KHgpKSB7XHJcblx0XHRcdFx0XHRhLnB1c2goW3gsIG9beF0gPT09ICc/JyA/ICc/JyA6IGZvcm1hdEZ1bmN0aW9uKG9beF0pXS5qb2luKCc9JykpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fX1cclxuXHJcblx0XHRcdHJldHVybiBhLmpvaW4oJyYnKTtcclxuXHRcdH1cclxuXHR9LFxyXG5cclxuXHQvLyBMb2NhbCBzdG9yYWdlIGZhY2FkZVxyXG5cdHN0b3JlOiAoZnVuY3Rpb24oKSB7XHJcblxyXG5cdFx0dmFyIGEgPSBbJ2xvY2FsU3RvcmFnZScsICdzZXNzaW9uU3RvcmFnZSddO1xyXG5cdFx0dmFyIGkgPSAtMTtcclxuXHRcdHZhciBwcmVmaXggPSAndGVzdCc7XHJcblxyXG5cdFx0Ly8gU2V0IExvY2FsU3RvcmFnZVxyXG5cdFx0dmFyIGxvY2FsU3RvcmFnZTtcclxuXHJcblx0XHR3aGlsZSAoYVsrK2ldKSB7XHJcblx0XHRcdHRyeSB7XHJcblx0XHRcdFx0Ly8gSW4gQ2hyb21lIHdpdGggY29va2llcyBibG9ja2VkLCBjYWxsaW5nIGxvY2FsU3RvcmFnZSB0aHJvd3MgYW4gZXJyb3JcclxuXHRcdFx0XHRsb2NhbFN0b3JhZ2UgPSB3aW5kb3dbYVtpXV07XHJcblx0XHRcdFx0bG9jYWxTdG9yYWdlLnNldEl0ZW0ocHJlZml4ICsgaSwgaSk7XHJcblx0XHRcdFx0bG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0ocHJlZml4ICsgaSk7XHJcblx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdH1cclxuXHRcdFx0Y2F0Y2ggKGUpIHtcclxuXHRcdFx0XHRsb2NhbFN0b3JhZ2UgPSBudWxsO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKCFsb2NhbFN0b3JhZ2UpIHtcclxuXHJcblx0XHRcdHZhciBjYWNoZSA9IG51bGw7XHJcblxyXG5cdFx0XHRsb2NhbFN0b3JhZ2UgPSB7XHJcblx0XHRcdFx0Z2V0SXRlbTogZnVuY3Rpb24ocHJvcCkge1xyXG5cdFx0XHRcdFx0cHJvcCA9IHByb3AgKyAnPSc7XHJcblx0XHRcdFx0XHR2YXIgbSA9IGRvY3VtZW50LmNvb2tpZS5zcGxpdCgnOycpO1xyXG5cdFx0XHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBtLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdFx0XHRcdHZhciBfbSA9IG1baV0ucmVwbGFjZSgvKF5cXHMrfFxccyskKS8sICcnKTtcclxuXHRcdFx0XHRcdFx0aWYgKF9tICYmIF9tLmluZGV4T2YocHJvcCkgPT09IDApIHtcclxuXHRcdFx0XHRcdFx0XHRyZXR1cm4gX20uc3Vic3RyKHByb3AubGVuZ3RoKTtcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdHJldHVybiBjYWNoZTtcclxuXHRcdFx0XHR9LFxyXG5cclxuXHRcdFx0XHRzZXRJdGVtOiBmdW5jdGlvbihwcm9wLCB2YWx1ZSkge1xyXG5cdFx0XHRcdFx0Y2FjaGUgPSB2YWx1ZTtcclxuXHRcdFx0XHRcdGRvY3VtZW50LmNvb2tpZSA9IHByb3AgKyAnPScgKyB2YWx1ZTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH07XHJcblxyXG5cdFx0XHQvLyBGaWxsIHRoZSBjYWNoZSB1cFxyXG5cdFx0XHRjYWNoZSA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdoZWxsbycpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGZ1bmN0aW9uIGdldCgpIHtcclxuXHRcdFx0dmFyIGpzb24gPSB7fTtcclxuXHRcdFx0dHJ5IHtcclxuXHRcdFx0XHRqc29uID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnaGVsbG8nKSkgfHwge307XHJcblx0XHRcdH1cclxuXHRcdFx0Y2F0Y2ggKGUpIHt9XHJcblxyXG5cdFx0XHRyZXR1cm4ganNvbjtcclxuXHRcdH1cclxuXHJcblx0XHRmdW5jdGlvbiBzZXQoanNvbikge1xyXG5cdFx0XHRsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnaGVsbG8nLCBKU09OLnN0cmluZ2lmeShqc29uKSk7XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gQ2hlY2sgaWYgdGhlIGJyb3dzZXIgc3VwcG9ydCBsb2NhbCBzdG9yYWdlXHJcblx0XHRyZXR1cm4gZnVuY3Rpb24obmFtZSwgdmFsdWUsIGRheXMpIHtcclxuXHJcblx0XHRcdC8vIExvY2FsIHN0b3JhZ2VcclxuXHRcdFx0dmFyIGpzb24gPSBnZXQoKTtcclxuXHJcblx0XHRcdGlmIChuYW1lICYmIHZhbHVlID09PSB1bmRlZmluZWQpIHtcclxuXHRcdFx0XHRyZXR1cm4ganNvbltuYW1lXSB8fCBudWxsO1xyXG5cdFx0XHR9XHJcblx0XHRcdGVsc2UgaWYgKG5hbWUgJiYgdmFsdWUgPT09IG51bGwpIHtcclxuXHRcdFx0XHR0cnkge1xyXG5cdFx0XHRcdFx0ZGVsZXRlIGpzb25bbmFtZV07XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdGNhdGNoIChlKSB7XHJcblx0XHRcdFx0XHRqc29uW25hbWVdID0gbnVsbDtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdFx0ZWxzZSBpZiAobmFtZSkge1xyXG5cdFx0XHRcdGpzb25bbmFtZV0gPSB2YWx1ZTtcclxuXHRcdFx0fVxyXG5cdFx0XHRlbHNlIHtcclxuXHRcdFx0XHRyZXR1cm4ganNvbjtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0c2V0KGpzb24pO1xyXG5cclxuXHRcdFx0cmV0dXJuIGpzb24gfHwgbnVsbDtcclxuXHRcdH07XHJcblxyXG5cdH0pKCksXHJcblxyXG5cdC8vIENyZWF0ZSBhbmQgQXBwZW5kIG5ldyBET00gZWxlbWVudHNcclxuXHQvLyBAcGFyYW0gbm9kZSBzdHJpbmdcclxuXHQvLyBAcGFyYW0gYXR0ciBvYmplY3QgbGl0ZXJhbFxyXG5cdC8vIEBwYXJhbSBkb20vc3RyaW5nXHJcblx0YXBwZW5kOiBmdW5jdGlvbihub2RlLCBhdHRyLCB0YXJnZXQpIHtcclxuXHJcblx0XHR2YXIgbiA9IHR5cGVvZiAobm9kZSkgPT09ICdzdHJpbmcnID8gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChub2RlKSA6IG5vZGU7XHJcblxyXG5cdFx0aWYgKHR5cGVvZiAoYXR0cikgPT09ICdvYmplY3QnKSB7XHJcblx0XHRcdGlmICgndGFnTmFtZScgaW4gYXR0cikge1xyXG5cdFx0XHRcdHRhcmdldCA9IGF0dHI7XHJcblx0XHRcdH1cclxuXHRcdFx0ZWxzZSB7XHJcblx0XHRcdFx0Zm9yICh2YXIgeCBpbiBhdHRyKSB7aWYgKGF0dHIuaGFzT3duUHJvcGVydHkoeCkpIHtcclxuXHRcdFx0XHRcdGlmICh0eXBlb2YgKGF0dHJbeF0pID09PSAnb2JqZWN0Jykge1xyXG5cdFx0XHRcdFx0XHRmb3IgKHZhciB5IGluIGF0dHJbeF0pIHtpZiAoYXR0clt4XS5oYXNPd25Qcm9wZXJ0eSh5KSkge1xyXG5cdFx0XHRcdFx0XHRcdG5beF1beV0gPSBhdHRyW3hdW3ldO1xyXG5cdFx0XHRcdFx0XHR9fVxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0ZWxzZSBpZiAoeCA9PT0gJ2h0bWwnKSB7XHJcblx0XHRcdFx0XHRcdG4uaW5uZXJIVE1MID0gYXR0clt4XTtcclxuXHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHQvLyBJRSBkb2Vzbid0IGxpa2UgdXMgc2V0dGluZyBtZXRob2RzIHdpdGggc2V0QXR0cmlidXRlXHJcblx0XHRcdFx0XHRlbHNlIGlmICghL15vbi8udGVzdCh4KSkge1xyXG5cdFx0XHRcdFx0XHRuLnNldEF0dHJpYnV0ZSh4LCBhdHRyW3hdKTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdGVsc2Uge1xyXG5cdFx0XHRcdFx0XHRuW3hdID0gYXR0clt4XTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9fVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKHRhcmdldCA9PT0gJ2JvZHknKSB7XHJcblx0XHRcdChmdW5jdGlvbiBzZWxmKCkge1xyXG5cdFx0XHRcdGlmIChkb2N1bWVudC5ib2R5KSB7XHJcblx0XHRcdFx0XHRkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKG4pO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRlbHNlIHtcclxuXHRcdFx0XHRcdHNldFRpbWVvdXQoc2VsZiwgMTYpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSkoKTtcclxuXHRcdH1cclxuXHRcdGVsc2UgaWYgKHR5cGVvZiAodGFyZ2V0KSA9PT0gJ29iamVjdCcpIHtcclxuXHRcdFx0dGFyZ2V0LmFwcGVuZENoaWxkKG4pO1xyXG5cdFx0fVxyXG5cdFx0ZWxzZSBpZiAodHlwZW9mICh0YXJnZXQpID09PSAnc3RyaW5nJykge1xyXG5cdFx0XHRkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSh0YXJnZXQpWzBdLmFwcGVuZENoaWxkKG4pO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBuO1xyXG5cdH0sXHJcblxyXG5cdC8vIEFuIGVhc3kgd2F5IHRvIGNyZWF0ZSBhIGhpZGRlbiBpZnJhbWVcclxuXHQvLyBAcGFyYW0gc3RyaW5nIHNyY1xyXG5cdGlmcmFtZTogZnVuY3Rpb24oc3JjKSB7XHJcblx0XHR0aGlzLmFwcGVuZCgnaWZyYW1lJywge3NyYzogc3JjLCBzdHlsZToge3Bvc2l0aW9uOidhYnNvbHV0ZScsIGxlZnQ6ICctMTAwMHB4JywgYm90dG9tOiAwLCBoZWlnaHQ6ICcxcHgnLCB3aWR0aDogJzFweCd9fSwgJ2JvZHknKTtcclxuXHR9LFxyXG5cclxuXHQvLyBSZWN1cnNpdmUgbWVyZ2UgdHdvIG9iamVjdHMgaW50byBvbmUsIHNlY29uZCBwYXJhbWV0ZXIgb3ZlcmlkZXMgdGhlIGZpcnN0XHJcblx0Ly8gQHBhcmFtIGEgYXJyYXlcclxuXHRtZXJnZTogZnVuY3Rpb24oLyogQXJnczogYSwgYiwgYywgLi4gbiAqLykge1xyXG5cdFx0dmFyIGFyZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMpO1xyXG5cdFx0YXJncy51bnNoaWZ0KHt9KTtcclxuXHRcdHJldHVybiB0aGlzLmV4dGVuZC5hcHBseShudWxsLCBhcmdzKTtcclxuXHR9LFxyXG5cclxuXHQvLyBNYWtlcyBpdCBlYXNpZXIgdG8gYXNzaWduIHBhcmFtZXRlcnMsIHdoZXJlIHNvbWUgYXJlIG9wdGlvbmFsXHJcblx0Ly8gQHBhcmFtIG8gb2JqZWN0XHJcblx0Ly8gQHBhcmFtIGEgYXJndW1lbnRzXHJcblx0YXJnczogZnVuY3Rpb24obywgYXJncykge1xyXG5cclxuXHRcdHZhciBwID0ge307XHJcblx0XHR2YXIgaSA9IDA7XHJcblx0XHR2YXIgdCA9IG51bGw7XHJcblx0XHR2YXIgeCA9IG51bGw7XHJcblxyXG5cdFx0Ly8gJ3gnIGlzIHRoZSBmaXJzdCBrZXkgaW4gdGhlIGxpc3Qgb2Ygb2JqZWN0IHBhcmFtZXRlcnNcclxuXHRcdGZvciAoeCBpbiBvKSB7aWYgKG8uaGFzT3duUHJvcGVydHkoeCkpIHtcclxuXHRcdFx0YnJlYWs7XHJcblx0XHR9fVxyXG5cclxuXHRcdC8vIFBhc3NpbmcgaW4gaGFzaCBvYmplY3Qgb2YgYXJndW1lbnRzP1xyXG5cdFx0Ly8gV2hlcmUgdGhlIGZpcnN0IGFyZ3VtZW50IGNhbid0IGJlIGFuIG9iamVjdFxyXG5cdFx0aWYgKChhcmdzLmxlbmd0aCA9PT0gMSkgJiYgKHR5cGVvZiAoYXJnc1swXSkgPT09ICdvYmplY3QnKSAmJiBvW3hdICE9ICdvIScpIHtcclxuXHJcblx0XHRcdC8vIENvdWxkIHRoaXMgb2JqZWN0IHN0aWxsIGJlbG9uZyB0byBhIHByb3BlcnR5P1xyXG5cdFx0XHQvLyBDaGVjayB0aGUgb2JqZWN0IGtleXMgaWYgdGhleSBtYXRjaCBhbnkgb2YgdGhlIHByb3BlcnR5IGtleXNcclxuXHRcdFx0Zm9yICh4IGluIGFyZ3NbMF0pIHtpZiAoby5oYXNPd25Qcm9wZXJ0eSh4KSkge1xyXG5cdFx0XHRcdC8vIERvZXMgdGhpcyBrZXkgZXhpc3QgaW4gdGhlIHByb3BlcnR5IGxpc3Q/XHJcblx0XHRcdFx0aWYgKHggaW4gbykge1xyXG5cdFx0XHRcdFx0Ly8gWWVzIHRoaXMga2V5IGRvZXMgZXhpc3Qgc28gaXRzIG1vc3QgbGlrZWx5IHRoaXMgZnVuY3Rpb24gaGFzIGJlZW4gaW52b2tlZCB3aXRoIGFuIG9iamVjdCBwYXJhbWV0ZXJcclxuXHRcdFx0XHRcdC8vIFJldHVybiBmaXJzdCBhcmd1bWVudCBhcyB0aGUgaGFzaCBvZiBhbGwgYXJndW1lbnRzXHJcblx0XHRcdFx0XHRyZXR1cm4gYXJnc1swXTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH19XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gRWxzZSBsb29wIHRocm91Z2ggYW5kIGFjY291bnQgZm9yIHRoZSBtaXNzaW5nIG9uZXMuXHJcblx0XHRmb3IgKHggaW4gbykge2lmIChvLmhhc093blByb3BlcnR5KHgpKSB7XHJcblxyXG5cdFx0XHR0ID0gdHlwZW9mIChhcmdzW2ldKTtcclxuXHJcblx0XHRcdGlmICgodHlwZW9mIChvW3hdKSA9PT0gJ2Z1bmN0aW9uJyAmJiBvW3hdLnRlc3QoYXJnc1tpXSkpIHx8ICh0eXBlb2YgKG9beF0pID09PSAnc3RyaW5nJyAmJiAoXHJcblx0XHRcdChvW3hdLmluZGV4T2YoJ3MnKSA+IC0xICYmIHQgPT09ICdzdHJpbmcnKSB8fFxyXG5cdFx0XHQob1t4XS5pbmRleE9mKCdvJykgPiAtMSAmJiB0ID09PSAnb2JqZWN0JykgfHxcclxuXHRcdFx0KG9beF0uaW5kZXhPZignaScpID4gLTEgJiYgdCA9PT0gJ251bWJlcicpIHx8XHJcblx0XHRcdChvW3hdLmluZGV4T2YoJ2EnKSA+IC0xICYmIHQgPT09ICdvYmplY3QnKSB8fFxyXG5cdFx0XHQob1t4XS5pbmRleE9mKCdmJykgPiAtMSAmJiB0ID09PSAnZnVuY3Rpb24nKVxyXG5cdFx0XHQpKVxyXG5cdFx0XHQpIHtcclxuXHRcdFx0XHRwW3hdID0gYXJnc1tpKytdO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRlbHNlIGlmICh0eXBlb2YgKG9beF0pID09PSAnc3RyaW5nJyAmJiBvW3hdLmluZGV4T2YoJyEnKSA+IC0xKSB7XHJcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0XHR9XHJcblx0XHR9fVxyXG5cclxuXHRcdHJldHVybiBwO1xyXG5cdH0sXHJcblxyXG5cdC8vIFJldHVybnMgYSBVUkwgaW5zdGFuY2VcclxuXHR1cmw6IGZ1bmN0aW9uKHBhdGgpIHtcclxuXHJcblx0XHQvLyBJZiB0aGUgcGF0aCBpcyBlbXB0eVxyXG5cdFx0aWYgKCFwYXRoKSB7XHJcblx0XHRcdHJldHVybiB3aW5kb3cubG9jYXRpb247XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gQ2hyb21lIGFuZCBGaXJlRm94IHN1cHBvcnQgbmV3IFVSTCgpIHRvIGV4dHJhY3QgVVJMIG9iamVjdHNcclxuXHRcdGVsc2UgaWYgKHdpbmRvdy5VUkwgJiYgVVJMIGluc3RhbmNlb2YgRnVuY3Rpb24gJiYgVVJMLmxlbmd0aCAhPT0gMCkge1xyXG5cdFx0XHRyZXR1cm4gbmV3IFVSTChwYXRoLCB3aW5kb3cubG9jYXRpb24pO1xyXG5cdFx0fVxyXG5cclxuXHRcdC8vIFVnbHkgc2hpbSwgaXQgd29ya3MhXHJcblx0XHRlbHNlIHtcclxuXHRcdFx0dmFyIGEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XHJcblx0XHRcdGEuaHJlZiA9IHBhdGg7XHJcblx0XHRcdHJldHVybiBhLmNsb25lTm9kZShmYWxzZSk7XHJcblx0XHR9XHJcblx0fSxcclxuXHJcblx0ZGlmZjogZnVuY3Rpb24oYSwgYikge1xyXG5cdFx0cmV0dXJuIGIuZmlsdGVyKGZ1bmN0aW9uKGl0ZW0pIHtcclxuXHRcdFx0cmV0dXJuIGEuaW5kZXhPZihpdGVtKSA9PT0gLTE7XHJcblx0XHR9KTtcclxuXHR9LFxyXG5cclxuXHQvLyBHZXQgdGhlIGRpZmZlcmVudCBoYXNoIG9mIHByb3BlcnRpZXMgdW5pcXVlIHRvIGBhYCwgYW5kIG5vdCBpbiBgYmBcclxuXHRkaWZmS2V5OiBmdW5jdGlvbihhLCBiKSB7XHJcblx0XHRpZiAoYSB8fCAhYikge1xyXG5cdFx0XHR2YXIgciA9IHt9O1xyXG5cdFx0XHRmb3IgKHZhciB4IGluIGEpIHtcclxuXHRcdFx0XHQvLyBEb2VzIHRoZSBwcm9wZXJ0eSBub3QgZXhpc3Q/XHJcblx0XHRcdFx0aWYgKCEoeCBpbiBiKSkge1xyXG5cdFx0XHRcdFx0clt4XSA9IGFbeF07XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRyZXR1cm4gcjtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gYTtcclxuXHR9LFxyXG5cclxuXHQvLyBVbmlxdWVcclxuXHQvLyBSZW1vdmUgZHVwbGljYXRlIGFuZCBudWxsIHZhbHVlcyBmcm9tIGFuIGFycmF5XHJcblx0Ly8gQHBhcmFtIGEgYXJyYXlcclxuXHR1bmlxdWU6IGZ1bmN0aW9uKGEpIHtcclxuXHRcdGlmICghQXJyYXkuaXNBcnJheShhKSkgeyByZXR1cm4gW107IH1cclxuXHJcblx0XHRyZXR1cm4gYS5maWx0ZXIoZnVuY3Rpb24oaXRlbSwgaW5kZXgpIHtcclxuXHRcdFx0Ly8gSXMgdGhpcyB0aGUgZmlyc3QgbG9jYXRpb24gb2YgaXRlbVxyXG5cdFx0XHRyZXR1cm4gYS5pbmRleE9mKGl0ZW0pID09PSBpbmRleDtcclxuXHRcdH0pO1xyXG5cdH0sXHJcblxyXG5cdGlzRW1wdHk6IGZ1bmN0aW9uKG9iaikge1xyXG5cclxuXHRcdC8vIFNjYWxhclxyXG5cdFx0aWYgKCFvYmopXHJcblx0XHRcdHJldHVybiB0cnVlO1xyXG5cclxuXHRcdC8vIEFycmF5XHJcblx0XHRpZiAoQXJyYXkuaXNBcnJheShvYmopKSB7XHJcblx0XHRcdHJldHVybiAhb2JqLmxlbmd0aDtcclxuXHRcdH1cclxuXHRcdGVsc2UgaWYgKHR5cGVvZiAob2JqKSA9PT0gJ29iamVjdCcpIHtcclxuXHRcdFx0Ly8gT2JqZWN0XHJcblx0XHRcdGZvciAodmFyIGtleSBpbiBvYmopIHtcclxuXHRcdFx0XHRpZiAob2JqLmhhc093blByb3BlcnR5KGtleSkpIHtcclxuXHRcdFx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gdHJ1ZTtcclxuXHR9LFxyXG5cclxuXHQvL2pzY3M6ZGlzYWJsZVxyXG5cclxuXHQvKiFcclxuXHQgKiogIFRoZW5hYmxlIC0tIEVtYmVkZGFibGUgTWluaW11bSBTdHJpY3RseS1Db21wbGlhbnQgUHJvbWlzZXMvQSsgMS4xLjEgVGhlbmFibGVcclxuXHQgKiogIENvcHlyaWdodCAoYykgMjAxMy0yMDE0IFJhbGYgUy4gRW5nZWxzY2hhbGwgPGh0dHA6Ly9lbmdlbHNjaGFsbC5jb20+XHJcblx0ICoqICBMaWNlbnNlZCB1bmRlciBUaGUgTUlUIExpY2Vuc2UgPGh0dHA6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9NSVQ+XHJcblx0ICoqICBTb3VyY2UtQ29kZSBkaXN0cmlidXRlZCBvbiA8aHR0cDovL2dpdGh1Yi5jb20vcnNlL3RoZW5hYmxlPlxyXG5cdCAqL1xyXG5cdFByb21pc2U6IChmdW5jdGlvbigpe1xyXG5cdFx0LyogIHByb21pc2Ugc3RhdGVzIFtQcm9taXNlcy9BKyAyLjFdICAqL1xyXG5cdFx0dmFyIFNUQVRFX1BFTkRJTkcgICA9IDA7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvKiAgW1Byb21pc2VzL0ErIDIuMS4xXSAgKi9cclxuXHRcdHZhciBTVEFURV9GVUxGSUxMRUQgPSAxOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLyogIFtQcm9taXNlcy9BKyAyLjEuMl0gICovXHJcblx0XHR2YXIgU1RBVEVfUkVKRUNURUQgID0gMjsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8qICBbUHJvbWlzZXMvQSsgMi4xLjNdICAqL1xyXG5cclxuXHRcdC8qICBwcm9taXNlIG9iamVjdCBjb25zdHJ1Y3RvciAgKi9cclxuXHRcdHZhciBhcGkgPSBmdW5jdGlvbiAoZXhlY3V0b3IpIHtcclxuXHRcdFx0LyogIG9wdGlvbmFsbHkgc3VwcG9ydCBub24tY29uc3RydWN0b3IvcGxhaW4tZnVuY3Rpb24gY2FsbCAgKi9cclxuXHRcdFx0aWYgKCEodGhpcyBpbnN0YW5jZW9mIGFwaSkpXHJcblx0XHRcdFx0cmV0dXJuIG5ldyBhcGkoZXhlY3V0b3IpO1xyXG5cclxuXHRcdFx0LyogIGluaXRpYWxpemUgb2JqZWN0ICAqL1xyXG5cdFx0XHR0aGlzLmlkICAgICAgICAgICA9IFwiVGhlbmFibGUvMS4wLjZcIjtcclxuXHRcdFx0dGhpcy5zdGF0ZSAgICAgICAgPSBTVEFURV9QRU5ESU5HOyAvKiAgaW5pdGlhbCBzdGF0ZSAgKi9cclxuXHRcdFx0dGhpcy5mdWxmaWxsVmFsdWUgPSB1bmRlZmluZWQ7ICAgICAvKiAgaW5pdGlhbCB2YWx1ZSAgKi8gICAgIC8qICBbUHJvbWlzZXMvQSsgMS4zLCAyLjEuMi4yXSAgKi9cclxuXHRcdFx0dGhpcy5yZWplY3RSZWFzb24gPSB1bmRlZmluZWQ7ICAgICAvKiAgaW5pdGlhbCByZWFzb24gKi8gICAgIC8qICBbUHJvbWlzZXMvQSsgMS41LCAyLjEuMy4yXSAgKi9cclxuXHRcdFx0dGhpcy5vbkZ1bGZpbGxlZCAgPSBbXTsgICAgICAgICAgICAvKiAgaW5pdGlhbCBoYW5kbGVycyAgKi9cclxuXHRcdFx0dGhpcy5vblJlamVjdGVkICAgPSBbXTsgICAgICAgICAgICAvKiAgaW5pdGlhbCBoYW5kbGVycyAgKi9cclxuXHJcblx0XHRcdC8qICBwcm92aWRlIG9wdGlvbmFsIGluZm9ybWF0aW9uLWhpZGluZyBwcm94eSAgKi9cclxuXHRcdFx0dGhpcy5wcm94eSA9IHtcclxuXHRcdFx0XHR0aGVuOiB0aGlzLnRoZW4uYmluZCh0aGlzKVxyXG5cdFx0XHR9O1xyXG5cclxuXHRcdFx0LyogIHN1cHBvcnQgb3B0aW9uYWwgZXhlY3V0b3IgZnVuY3Rpb24gICovXHJcblx0XHRcdGlmICh0eXBlb2YgZXhlY3V0b3IgPT09IFwiZnVuY3Rpb25cIilcclxuXHRcdFx0XHRleGVjdXRvci5jYWxsKHRoaXMsIHRoaXMuZnVsZmlsbC5iaW5kKHRoaXMpLCB0aGlzLnJlamVjdC5iaW5kKHRoaXMpKTtcclxuXHRcdH07XHJcblxyXG5cdFx0LyogIHByb21pc2UgQVBJIG1ldGhvZHMgICovXHJcblx0XHRhcGkucHJvdG90eXBlID0ge1xyXG5cdFx0XHQvKiAgcHJvbWlzZSByZXNvbHZpbmcgbWV0aG9kcyAgKi9cclxuXHRcdFx0ZnVsZmlsbDogZnVuY3Rpb24gKHZhbHVlKSB7IHJldHVybiBkZWxpdmVyKHRoaXMsIFNUQVRFX0ZVTEZJTExFRCwgXCJmdWxmaWxsVmFsdWVcIiwgdmFsdWUpOyB9LFxyXG5cdFx0XHRyZWplY3Q6ICBmdW5jdGlvbiAodmFsdWUpIHsgcmV0dXJuIGRlbGl2ZXIodGhpcywgU1RBVEVfUkVKRUNURUQsICBcInJlamVjdFJlYXNvblwiLCB2YWx1ZSk7IH0sXHJcblxyXG5cdFx0XHQvKiAgXCJUaGUgdGhlbiBNZXRob2RcIiBbUHJvbWlzZXMvQSsgMS4xLCAxLjIsIDIuMl0gICovXHJcblx0XHRcdHRoZW46IGZ1bmN0aW9uIChvbkZ1bGZpbGxlZCwgb25SZWplY3RlZCkge1xyXG5cdFx0XHRcdHZhciBjdXJyID0gdGhpcztcclxuXHRcdFx0XHR2YXIgbmV4dCA9IG5ldyBhcGkoKTsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvKiAgW1Byb21pc2VzL0ErIDIuMi43XSAgKi9cclxuXHRcdFx0XHRjdXJyLm9uRnVsZmlsbGVkLnB1c2goXHJcblx0XHRcdFx0XHRyZXNvbHZlcihvbkZ1bGZpbGxlZCwgbmV4dCwgXCJmdWxmaWxsXCIpKTsgICAgICAgICAgICAgLyogIFtQcm9taXNlcy9BKyAyLjIuMi8yLjIuNl0gICovXHJcblx0XHRcdFx0Y3Vyci5vblJlamVjdGVkLnB1c2goXHJcblx0XHRcdFx0XHRyZXNvbHZlcihvblJlamVjdGVkLCAgbmV4dCwgXCJyZWplY3RcIiApKTsgICAgICAgICAgICAgLyogIFtQcm9taXNlcy9BKyAyLjIuMy8yLjIuNl0gICovXHJcblx0XHRcdFx0ZXhlY3V0ZShjdXJyKTtcclxuXHRcdFx0XHRyZXR1cm4gbmV4dC5wcm94eTsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvKiAgW1Byb21pc2VzL0ErIDIuMi43LCAzLjNdICAqL1xyXG5cdFx0XHR9XHJcblx0XHR9O1xyXG5cclxuXHRcdC8qICBkZWxpdmVyIGFuIGFjdGlvbiAgKi9cclxuXHRcdHZhciBkZWxpdmVyID0gZnVuY3Rpb24gKGN1cnIsIHN0YXRlLCBuYW1lLCB2YWx1ZSkge1xyXG5cdFx0XHRpZiAoY3Vyci5zdGF0ZSA9PT0gU1RBVEVfUEVORElORykge1xyXG5cdFx0XHRcdGN1cnIuc3RhdGUgPSBzdGF0ZTsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8qICBbUHJvbWlzZXMvQSsgMi4xLjIuMSwgMi4xLjMuMV0gICovXHJcblx0XHRcdFx0Y3VycltuYW1lXSA9IHZhbHVlOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLyogIFtQcm9taXNlcy9BKyAyLjEuMi4yLCAyLjEuMy4yXSAgKi9cclxuXHRcdFx0XHRleGVjdXRlKGN1cnIpO1xyXG5cdFx0XHR9XHJcblx0XHRcdHJldHVybiBjdXJyO1xyXG5cdFx0fTtcclxuXHJcblx0XHQvKiAgZXhlY3V0ZSBhbGwgaGFuZGxlcnMgICovXHJcblx0XHR2YXIgZXhlY3V0ZSA9IGZ1bmN0aW9uIChjdXJyKSB7XHJcblx0XHRcdGlmIChjdXJyLnN0YXRlID09PSBTVEFURV9GVUxGSUxMRUQpXHJcblx0XHRcdFx0ZXhlY3V0ZV9oYW5kbGVycyhjdXJyLCBcIm9uRnVsZmlsbGVkXCIsIGN1cnIuZnVsZmlsbFZhbHVlKTtcclxuXHRcdFx0ZWxzZSBpZiAoY3Vyci5zdGF0ZSA9PT0gU1RBVEVfUkVKRUNURUQpXHJcblx0XHRcdFx0ZXhlY3V0ZV9oYW5kbGVycyhjdXJyLCBcIm9uUmVqZWN0ZWRcIiwgIGN1cnIucmVqZWN0UmVhc29uKTtcclxuXHRcdH07XHJcblxyXG5cdFx0LyogIGV4ZWN1dGUgcGFydGljdWxhciBzZXQgb2YgaGFuZGxlcnMgICovXHJcblx0XHR2YXIgZXhlY3V0ZV9oYW5kbGVycyA9IGZ1bmN0aW9uIChjdXJyLCBuYW1lLCB2YWx1ZSkge1xyXG5cdFx0XHQvKiBnbG9iYWwgcHJvY2VzczogdHJ1ZSAqL1xyXG5cdFx0XHQvKiBnbG9iYWwgc2V0SW1tZWRpYXRlOiB0cnVlICovXHJcblx0XHRcdC8qIGdsb2JhbCBzZXRUaW1lb3V0OiB0cnVlICovXHJcblxyXG5cdFx0XHQvKiAgc2hvcnQtY2lyY3VpdCBwcm9jZXNzaW5nICAqL1xyXG5cdFx0XHRpZiAoY3VycltuYW1lXS5sZW5ndGggPT09IDApXHJcblx0XHRcdFx0cmV0dXJuO1xyXG5cclxuXHRcdFx0LyogIGl0ZXJhdGUgb3ZlciBhbGwgaGFuZGxlcnMsIGV4YWN0bHkgb25jZSAgKi9cclxuXHRcdFx0dmFyIGhhbmRsZXJzID0gY3VycltuYW1lXTtcclxuXHRcdFx0Y3VycltuYW1lXSA9IFtdOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8qICBbUHJvbWlzZXMvQSsgMi4yLjIuMywgMi4yLjMuM10gICovXHJcblx0XHRcdHZhciBmdW5jID0gZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgaGFuZGxlcnMubGVuZ3RoOyBpKyspXHJcblx0XHRcdFx0XHRoYW5kbGVyc1tpXSh2YWx1ZSk7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8qICBbUHJvbWlzZXMvQSsgMi4yLjVdICAqL1xyXG5cdFx0XHR9O1xyXG5cclxuXHRcdFx0LyogIGV4ZWN1dGUgcHJvY2VkdXJlIGFzeW5jaHJvbm91c2x5ICAqLyAgICAgICAgICAgICAgICAgICAgIC8qICBbUHJvbWlzZXMvQSsgMi4yLjQsIDMuMV0gICovXHJcblx0XHRcdGlmICh0eXBlb2YgcHJvY2VzcyA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgcHJvY2Vzcy5uZXh0VGljayA9PT0gXCJmdW5jdGlvblwiKVxyXG5cdFx0XHRcdHByb2Nlc3MubmV4dFRpY2soZnVuYyk7XHJcblx0XHRcdGVsc2UgaWYgKHR5cGVvZiBzZXRJbW1lZGlhdGUgPT09IFwiZnVuY3Rpb25cIilcclxuXHRcdFx0XHRzZXRJbW1lZGlhdGUoZnVuYyk7XHJcblx0XHRcdGVsc2VcclxuXHRcdFx0XHRzZXRUaW1lb3V0KGZ1bmMsIDApO1xyXG5cdFx0fTtcclxuXHJcblx0XHQvKiAgZ2VuZXJhdGUgYSByZXNvbHZlciBmdW5jdGlvbiAgKi9cclxuXHRcdHZhciByZXNvbHZlciA9IGZ1bmN0aW9uIChjYiwgbmV4dCwgbWV0aG9kKSB7XHJcblx0XHRcdHJldHVybiBmdW5jdGlvbiAodmFsdWUpIHtcclxuXHRcdFx0XHRpZiAodHlwZW9mIGNiICE9PSBcImZ1bmN0aW9uXCIpICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8qICBbUHJvbWlzZXMvQSsgMi4yLjEsIDIuMi43LjMsIDIuMi43LjRdICAqL1xyXG5cdFx0XHRcdFx0bmV4dFttZXRob2RdLmNhbGwobmV4dCwgdmFsdWUpOyAgICAgICAgICAgICAgICAgICAgICAvKiAgW1Byb21pc2VzL0ErIDIuMi43LjMsIDIuMi43LjRdICAqL1xyXG5cdFx0XHRcdGVsc2Uge1xyXG5cdFx0XHRcdFx0dmFyIHJlc3VsdDtcclxuXHRcdFx0XHRcdHRyeSB7IHJlc3VsdCA9IGNiKHZhbHVlKTsgfSAgICAgICAgICAgICAgICAgICAgICAgICAgLyogIFtQcm9taXNlcy9BKyAyLjIuMi4xLCAyLjIuMy4xLCAyLjIuNSwgMy4yXSAgKi9cclxuXHRcdFx0XHRcdGNhdGNoIChlKSB7XHJcblx0XHRcdFx0XHRcdG5leHQucmVqZWN0KGUpOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvKiAgW1Byb21pc2VzL0ErIDIuMi43LjJdICAqL1xyXG5cdFx0XHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRyZXNvbHZlKG5leHQsIHJlc3VsdCk7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8qICBbUHJvbWlzZXMvQSsgMi4yLjcuMV0gICovXHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9O1xyXG5cdFx0fTtcclxuXHJcblx0XHQvKiAgXCJQcm9taXNlIFJlc29sdXRpb24gUHJvY2VkdXJlXCIgICovICAgICAgICAgICAgICAgICAgICAgICAgICAgLyogIFtQcm9taXNlcy9BKyAyLjNdICAqL1xyXG5cdFx0dmFyIHJlc29sdmUgPSBmdW5jdGlvbiAocHJvbWlzZSwgeCkge1xyXG5cdFx0XHQvKiAgc2FuaXR5IGNoZWNrIGFyZ3VtZW50cyAgKi8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLyogIFtQcm9taXNlcy9BKyAyLjMuMV0gICovXHJcblx0XHRcdGlmIChwcm9taXNlID09PSB4IHx8IHByb21pc2UucHJveHkgPT09IHgpIHtcclxuXHRcdFx0XHRwcm9taXNlLnJlamVjdChuZXcgVHlwZUVycm9yKFwiY2Fubm90IHJlc29sdmUgcHJvbWlzZSB3aXRoIGl0c2VsZlwiKSk7XHJcblx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQvKiAgc3VyZ2ljYWxseSBjaGVjayBmb3IgYSBcInRoZW5cIiBtZXRob2RcclxuXHRcdFx0XHQobWFpbmx5IHRvIGp1c3QgY2FsbCB0aGUgXCJnZXR0ZXJcIiBvZiBcInRoZW5cIiBvbmx5IG9uY2UpICAqL1xyXG5cdFx0XHR2YXIgdGhlbjtcclxuXHRcdFx0aWYgKCh0eXBlb2YgeCA9PT0gXCJvYmplY3RcIiAmJiB4ICE9PSBudWxsKSB8fCB0eXBlb2YgeCA9PT0gXCJmdW5jdGlvblwiKSB7XHJcblx0XHRcdFx0dHJ5IHsgdGhlbiA9IHgudGhlbjsgfSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLyogIFtQcm9taXNlcy9BKyAyLjMuMy4xLCAzLjVdICAqL1xyXG5cdFx0XHRcdGNhdGNoIChlKSB7XHJcblx0XHRcdFx0XHRwcm9taXNlLnJlamVjdChlKTsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8qICBbUHJvbWlzZXMvQSsgMi4zLjMuMl0gICovXHJcblx0XHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQvKiAgaGFuZGxlIG93biBUaGVuYWJsZXMgICAgW1Byb21pc2VzL0ErIDIuMy4yXVxyXG5cdFx0XHRcdGFuZCBzaW1pbGFyIFwidGhlbmFibGVzXCIgW1Byb21pc2VzL0ErIDIuMy4zXSAgKi9cclxuXHRcdFx0aWYgKHR5cGVvZiB0aGVuID09PSBcImZ1bmN0aW9uXCIpIHtcclxuXHRcdFx0XHR2YXIgcmVzb2x2ZWQgPSBmYWxzZTtcclxuXHRcdFx0XHR0cnkge1xyXG5cdFx0XHRcdFx0LyogIGNhbGwgcmV0cmlldmVkIFwidGhlblwiIG1ldGhvZCAqLyAgICAgICAgICAgICAgICAgIC8qICBbUHJvbWlzZXMvQSsgMi4zLjMuM10gICovXHJcblx0XHRcdFx0XHR0aGVuLmNhbGwoeCxcclxuXHRcdFx0XHRcdFx0LyogIHJlc29sdmVQcm9taXNlICAqLyAgICAgICAgICAgICAgICAgICAgICAgICAgIC8qICBbUHJvbWlzZXMvQSsgMi4zLjMuMy4xXSAgKi9cclxuXHRcdFx0XHRcdFx0ZnVuY3Rpb24gKHkpIHtcclxuXHRcdFx0XHRcdFx0XHRpZiAocmVzb2x2ZWQpIHJldHVybjsgcmVzb2x2ZWQgPSB0cnVlOyAgICAgICAvKiAgW1Byb21pc2VzL0ErIDIuMy4zLjMuM10gICovXHJcblx0XHRcdFx0XHRcdFx0aWYgKHkgPT09IHgpICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLyogIFtQcm9taXNlcy9BKyAzLjZdICAqL1xyXG5cdFx0XHRcdFx0XHRcdFx0cHJvbWlzZS5yZWplY3QobmV3IFR5cGVFcnJvcihcImNpcmN1bGFyIHRoZW5hYmxlIGNoYWluXCIpKTtcclxuXHRcdFx0XHRcdFx0XHRlbHNlXHJcblx0XHRcdFx0XHRcdFx0XHRyZXNvbHZlKHByb21pc2UsIHkpO1xyXG5cdFx0XHRcdFx0XHR9LFxyXG5cclxuXHRcdFx0XHRcdFx0LyogIHJlamVjdFByb21pc2UgICovICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8qICBbUHJvbWlzZXMvQSsgMi4zLjMuMy4yXSAgKi9cclxuXHRcdFx0XHRcdFx0ZnVuY3Rpb24gKHIpIHtcclxuXHRcdFx0XHRcdFx0XHRpZiAocmVzb2x2ZWQpIHJldHVybjsgcmVzb2x2ZWQgPSB0cnVlOyAgICAgICAvKiAgW1Byb21pc2VzL0ErIDIuMy4zLjMuM10gICovXHJcblx0XHRcdFx0XHRcdFx0cHJvbWlzZS5yZWplY3Qocik7XHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdCk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdGNhdGNoIChlKSB7XHJcblx0XHRcdFx0XHRpZiAoIXJlc29sdmVkKSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8qICBbUHJvbWlzZXMvQSsgMi4zLjMuMy4zXSAgKi9cclxuXHRcdFx0XHRcdFx0cHJvbWlzZS5yZWplY3QoZSk7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8qICBbUHJvbWlzZXMvQSsgMi4zLjMuMy40XSAgKi9cclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQvKiAgaGFuZGxlIG90aGVyIHZhbHVlcyAgKi9cclxuXHRcdFx0cHJvbWlzZS5mdWxmaWxsKHgpOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8qICBbUHJvbWlzZXMvQSsgMi4zLjQsIDIuMy4zLjRdICAqL1xyXG5cdFx0fTtcclxuXHJcblx0XHQvKiAgZXhwb3J0IEFQSSAgKi9cclxuXHRcdHJldHVybiBhcGk7XHJcblx0fSkoKSxcclxuXHJcblx0Ly9qc2NzOmVuYWJsZVxyXG5cclxuXHQvLyBFdmVudFxyXG5cdC8vIEEgY29udHJ1Y3RvciBzdXBlcmNsYXNzIGZvciBhZGRpbmcgZXZlbnQgbWVudGhvZHMsIG9uLCBvZmYsIGVtaXQuXHJcblx0RXZlbnQ6IGZ1bmN0aW9uKCkge1xyXG5cclxuXHRcdHZhciBzZXBhcmF0b3IgPSAvW1xcc1xcLF0rLztcclxuXHJcblx0XHQvLyBJZiB0aGlzIGRvZXNuJ3Qgc3VwcG9ydCBnZXRQcm90b3R5cGUgdGhlbiB3ZSBjYW4ndCBnZXQgcHJvdG90eXBlLmV2ZW50cyBvZiB0aGUgcGFyZW50XHJcblx0XHQvLyBTbyBsZXRzIGdldCB0aGUgY3VycmVudCBpbnN0YW5jZSBldmVudHMsIGFuZCBhZGQgdGhvc2UgdG8gYSBwYXJlbnQgcHJvcGVydHlcclxuXHRcdHRoaXMucGFyZW50ID0ge1xyXG5cdFx0XHRldmVudHM6IHRoaXMuZXZlbnRzLFxyXG5cdFx0XHRmaW5kRXZlbnRzOiB0aGlzLmZpbmRFdmVudHMsXHJcblx0XHRcdHBhcmVudDogdGhpcy5wYXJlbnQsXHJcblx0XHRcdHV0aWxzOiB0aGlzLnV0aWxzXHJcblx0XHR9O1xyXG5cclxuXHRcdHRoaXMuZXZlbnRzID0ge307XHJcblxyXG5cdFx0Ly8gT24sIHN1YnNjcmliZSB0byBldmVudHNcclxuXHRcdC8vIEBwYXJhbSBldnQgICBzdHJpbmdcclxuXHRcdC8vIEBwYXJhbSBjYWxsYmFjayAgZnVuY3Rpb25cclxuXHRcdHRoaXMub24gPSBmdW5jdGlvbihldnQsIGNhbGxiYWNrKSB7XHJcblxyXG5cdFx0XHRpZiAoY2FsbGJhY2sgJiYgdHlwZW9mIChjYWxsYmFjaykgPT09ICdmdW5jdGlvbicpIHtcclxuXHRcdFx0XHR2YXIgYSA9IGV2dC5zcGxpdChzZXBhcmF0b3IpO1xyXG5cdFx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgYS5sZW5ndGg7IGkrKykge1xyXG5cclxuXHRcdFx0XHRcdC8vIEhhcyB0aGlzIGV2ZW50IGFscmVhZHkgYmVlbiBmaXJlZCBvbiB0aGlzIGluc3RhbmNlP1xyXG5cdFx0XHRcdFx0dGhpcy5ldmVudHNbYVtpXV0gPSBbY2FsbGJhY2tdLmNvbmNhdCh0aGlzLmV2ZW50c1thW2ldXSB8fCBbXSk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRyZXR1cm4gdGhpcztcclxuXHRcdH07XHJcblxyXG5cdFx0Ly8gT2ZmLCB1bnN1YnNjcmliZSB0byBldmVudHNcclxuXHRcdC8vIEBwYXJhbSBldnQgICBzdHJpbmdcclxuXHRcdC8vIEBwYXJhbSBjYWxsYmFjayAgZnVuY3Rpb25cclxuXHRcdHRoaXMub2ZmID0gZnVuY3Rpb24oZXZ0LCBjYWxsYmFjaykge1xyXG5cclxuXHRcdFx0dGhpcy5maW5kRXZlbnRzKGV2dCwgZnVuY3Rpb24obmFtZSwgaW5kZXgpIHtcclxuXHRcdFx0XHRpZiAoIWNhbGxiYWNrIHx8IHRoaXMuZXZlbnRzW25hbWVdW2luZGV4XSA9PT0gY2FsbGJhY2spIHtcclxuXHRcdFx0XHRcdHRoaXMuZXZlbnRzW25hbWVdW2luZGV4XSA9IG51bGw7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRcdHJldHVybiB0aGlzO1xyXG5cdFx0fTtcclxuXHJcblx0XHQvLyBFbWl0XHJcblx0XHQvLyBUcmlnZ2VycyBhbnkgc3Vic2NyaWJlZCBldmVudHNcclxuXHRcdHRoaXMuZW1pdCA9IGZ1bmN0aW9uKGV2dCAvKiwgZGF0YSwgLi4uICovKSB7XHJcblxyXG5cdFx0XHQvLyBHZXQgYXJndW1lbnRzIGFzIGFuIEFycmF5LCBrbm9jayBvZmYgdGhlIGZpcnN0IG9uZVxyXG5cdFx0XHR2YXIgYXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMSk7XHJcblx0XHRcdGFyZ3MucHVzaChldnQpO1xyXG5cclxuXHRcdFx0Ly8gSGFuZGxlclxyXG5cdFx0XHR2YXIgaGFuZGxlciA9IGZ1bmN0aW9uKG5hbWUsIGluZGV4KSB7XHJcblxyXG5cdFx0XHRcdC8vIFJlcGxhY2UgdGhlIGxhc3QgcHJvcGVydHkgd2l0aCB0aGUgZXZlbnQgbmFtZVxyXG5cdFx0XHRcdGFyZ3NbYXJncy5sZW5ndGggLSAxXSA9IChuYW1lID09PSAnKicgPyBldnQgOiBuYW1lKTtcclxuXHJcblx0XHRcdFx0Ly8gVHJpZ2dlclxyXG5cdFx0XHRcdHRoaXMuZXZlbnRzW25hbWVdW2luZGV4XS5hcHBseSh0aGlzLCBhcmdzKTtcclxuXHRcdFx0fTtcclxuXHJcblx0XHRcdC8vIEZpbmQgdGhlIGNhbGxiYWNrcyB3aGljaCBtYXRjaCB0aGUgY29uZGl0aW9uIGFuZCBjYWxsXHJcblx0XHRcdHZhciBfdGhpcyA9IHRoaXM7XHJcblx0XHRcdHdoaWxlIChfdGhpcyAmJiBfdGhpcy5maW5kRXZlbnRzKSB7XHJcblxyXG5cdFx0XHRcdC8vIEZpbmQgZXZlbnRzIHdoaWNoIG1hdGNoXHJcblx0XHRcdFx0X3RoaXMuZmluZEV2ZW50cyhldnQgKyAnLConLCBoYW5kbGVyKTtcclxuXHRcdFx0XHRfdGhpcyA9IF90aGlzLnBhcmVudDtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0cmV0dXJuIHRoaXM7XHJcblx0XHR9O1xyXG5cclxuXHRcdC8vXHJcblx0XHQvLyBFYXN5IGZ1bmN0aW9uc1xyXG5cdFx0dGhpcy5lbWl0QWZ0ZXIgPSBmdW5jdGlvbigpIHtcclxuXHRcdFx0dmFyIF90aGlzID0gdGhpcztcclxuXHRcdFx0dmFyIGFyZ3MgPSBhcmd1bWVudHM7XHJcblx0XHRcdHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0X3RoaXMuZW1pdC5hcHBseShfdGhpcywgYXJncyk7XHJcblx0XHRcdH0sIDApO1xyXG5cclxuXHRcdFx0cmV0dXJuIHRoaXM7XHJcblx0XHR9O1xyXG5cclxuXHRcdHRoaXMuZmluZEV2ZW50cyA9IGZ1bmN0aW9uKGV2dCwgY2FsbGJhY2spIHtcclxuXHJcblx0XHRcdHZhciBhID0gZXZ0LnNwbGl0KHNlcGFyYXRvcik7XHJcblxyXG5cdFx0XHRmb3IgKHZhciBuYW1lIGluIHRoaXMuZXZlbnRzKSB7aWYgKHRoaXMuZXZlbnRzLmhhc093blByb3BlcnR5KG5hbWUpKSB7XHJcblxyXG5cdFx0XHRcdGlmIChhLmluZGV4T2YobmFtZSkgPiAtMSkge1xyXG5cclxuXHRcdFx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5ldmVudHNbbmFtZV0ubGVuZ3RoOyBpKyspIHtcclxuXHJcblx0XHRcdFx0XHRcdC8vIERvZXMgdGhlIGV2ZW50IGhhbmRsZXIgZXhpc3Q/XHJcblx0XHRcdFx0XHRcdGlmICh0aGlzLmV2ZW50c1tuYW1lXVtpXSkge1xyXG5cdFx0XHRcdFx0XHRcdC8vIEVtaXQgb24gdGhlIGxvY2FsIGluc3RhbmNlIG9mIHRoaXNcclxuXHRcdFx0XHRcdFx0XHRjYWxsYmFjay5jYWxsKHRoaXMsIG5hbWUsIGkpO1xyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9fVxyXG5cdFx0fTtcclxuXHJcblx0XHRyZXR1cm4gdGhpcztcclxuXHR9LFxyXG5cclxuXHQvLyBHbG9iYWwgRXZlbnRzXHJcblx0Ly8gQXR0YWNoIHRoZSBjYWxsYmFjayB0byB0aGUgd2luZG93IG9iamVjdFxyXG5cdC8vIFJldHVybiBpdHMgdW5pcXVlIHJlZmVyZW5jZVxyXG5cdGdsb2JhbEV2ZW50OiBmdW5jdGlvbihjYWxsYmFjaywgZ3VpZCkge1xyXG5cdFx0Ly8gSWYgdGhlIGd1aWQgaGFzIG5vdCBiZWVuIHN1cHBsaWVkIHRoZW4gY3JlYXRlIGEgbmV3IG9uZS5cclxuXHRcdGd1aWQgPSBndWlkIHx8ICdfaGVsbG9qc18nICsgcGFyc2VJbnQoTWF0aC5yYW5kb20oKSAqIDFlMTIsIDEwKS50b1N0cmluZygzNik7XHJcblxyXG5cdFx0Ly8gRGVmaW5lIHRoZSBjYWxsYmFjayBmdW5jdGlvblxyXG5cdFx0d2luZG93W2d1aWRdID0gZnVuY3Rpb24oKSB7XHJcblx0XHRcdC8vIFRyaWdnZXIgdGhlIGNhbGxiYWNrXHJcblx0XHRcdHRyeSB7XHJcblx0XHRcdFx0aWYgKGNhbGxiYWNrLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykpIHtcclxuXHRcdFx0XHRcdGRlbGV0ZSB3aW5kb3dbZ3VpZF07XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHRcdGNhdGNoIChlKSB7XHJcblx0XHRcdFx0Y29uc29sZS5lcnJvcihlKTtcclxuXHRcdFx0fVxyXG5cdFx0fTtcclxuXHJcblx0XHRyZXR1cm4gZ3VpZDtcclxuXHR9LFxyXG5cclxuXHQvLyBUcmlnZ2VyIGEgY2xpZW50c2lkZSBwb3B1cFxyXG5cdC8vIFRoaXMgaGFzIGJlZW4gYXVnbWVudGVkIHRvIHN1cHBvcnQgUGhvbmVHYXBcclxuXHRwb3B1cDogZnVuY3Rpb24odXJsLCByZWRpcmVjdFVyaSwgb3B0aW9ucykge1xyXG5cclxuXHRcdHZhciBkb2N1bWVudEVsZW1lbnQgPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQ7XHJcblxyXG5cdFx0Ly8gTXVsdGkgU2NyZWVuIFBvcHVwIFBvc2l0aW9uaW5nIChodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vYS8xNjg2MTA1MClcclxuXHRcdC8vIENyZWRpdDogaHR0cDovL3d3dy54dGYuZGsvMjAxMS8wOC9jZW50ZXItbmV3LXBvcHVwLXdpbmRvdy1ldmVuLW9uLmh0bWxcclxuXHRcdC8vIEZpeGVzIGR1YWwtc2NyZWVuIHBvc2l0aW9uICAgICAgICAgICAgICAgICAgICAgICAgIE1vc3QgYnJvd3NlcnMgICAgICBGaXJlZm94XHJcblxyXG5cdFx0aWYgKG9wdGlvbnMuaGVpZ2h0KSB7XHJcblx0XHRcdHZhciBkdWFsU2NyZWVuVG9wID0gd2luZG93LnNjcmVlblRvcCAhPT0gdW5kZWZpbmVkID8gd2luZG93LnNjcmVlblRvcCA6IHNjcmVlbi50b3A7XHJcblx0XHRcdHZhciBoZWlnaHQgPSBzY3JlZW4uaGVpZ2h0IHx8IHdpbmRvdy5pbm5lckhlaWdodCB8fCBkb2N1bWVudEVsZW1lbnQuY2xpZW50SGVpZ2h0O1xyXG5cdFx0XHRvcHRpb25zLnRvcCA9IHBhcnNlSW50KChoZWlnaHQgLSBvcHRpb25zLmhlaWdodCkgLyAyLCAxMCkgKyBkdWFsU2NyZWVuVG9wO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmIChvcHRpb25zLndpZHRoKSB7XHJcblx0XHRcdHZhciBkdWFsU2NyZWVuTGVmdCA9IHdpbmRvdy5zY3JlZW5MZWZ0ICE9PSB1bmRlZmluZWQgPyB3aW5kb3cuc2NyZWVuTGVmdCA6IHNjcmVlbi5sZWZ0O1xyXG5cdFx0XHR2YXIgd2lkdGggPSBzY3JlZW4ud2lkdGggfHwgd2luZG93LmlubmVyV2lkdGggfHwgZG9jdW1lbnRFbGVtZW50LmNsaWVudFdpZHRoO1xyXG5cdFx0XHRvcHRpb25zLmxlZnQgPSBwYXJzZUludCgod2lkdGggLSBvcHRpb25zLndpZHRoKSAvIDIsIDEwKSArIGR1YWxTY3JlZW5MZWZ0O1xyXG5cdFx0fVxyXG5cclxuXHRcdC8vIENvbnZlcnQgb3B0aW9ucyBpbnRvIGFuIGFycmF5XHJcblx0XHR2YXIgb3B0aW9uc0FycmF5ID0gW107XHJcblx0XHRPYmplY3Qua2V5cyhvcHRpb25zKS5mb3JFYWNoKGZ1bmN0aW9uKG5hbWUpIHtcclxuXHRcdFx0dmFyIHZhbHVlID0gb3B0aW9uc1tuYW1lXTtcclxuXHRcdFx0b3B0aW9uc0FycmF5LnB1c2gobmFtZSArICh2YWx1ZSAhPT0gbnVsbCA/ICc9JyArIHZhbHVlIDogJycpKTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdC8vIENhbGwgdGhlIG9wZW4oKSBmdW5jdGlvbiB3aXRoIHRoZSBpbml0aWFsIHBhdGhcclxuXHRcdC8vXHJcblx0XHQvLyBPQXV0aCByZWRpcmVjdCwgZml4ZXMgVVJJIGZyYWdtZW50cyBmcm9tIGJlaW5nIGxvc3QgaW4gU2FmYXJpXHJcblx0XHQvLyAoVVJJIEZyYWdtZW50cyB3aXRoaW4gMzAyIExvY2F0aW9uIFVSSSBhcmUgbG9zdCBvdmVyIEhUVFBTKVxyXG5cdFx0Ly8gTG9hZGluZyB0aGUgcmVkaXJlY3QuaHRtbCBiZWZvcmUgdHJpZ2dlcmluZyB0aGUgT0F1dGggRmxvdyBzZWVtcyB0byBmaXggaXQuXHJcblx0XHQvL1xyXG5cdFx0Ly8gRmlyZWZveCAgZGVjb2RlcyBVUkwgZnJhZ21lbnRzIHdoZW4gY2FsbGluZyBsb2NhdGlvbi5oYXNoLlxyXG5cdFx0Ly8gIC0gVGhpcyBpcyBiYWQgaWYgdGhlIHZhbHVlIGNvbnRhaW5zIGJyZWFrIHBvaW50cyB3aGljaCBhcmUgZXNjYXBlZFxyXG5cdFx0Ly8gIC0gSGVuY2UgdGhlIHVybCBtdXN0IGJlIGVuY29kZWQgdHdpY2UgYXMgaXQgY29udGFpbnMgYnJlYWtwb2ludHMuXHJcblx0XHRpZiAobmF2aWdhdG9yLnVzZXJBZ2VudC5pbmRleE9mKCdTYWZhcmknKSAhPT0gLTEgJiYgbmF2aWdhdG9yLnVzZXJBZ2VudC5pbmRleE9mKCdDaHJvbWUnKSA9PT0gLTEpIHtcclxuXHRcdFx0dXJsID0gcmVkaXJlY3RVcmkgKyAnI29hdXRoX3JlZGlyZWN0PScgKyBlbmNvZGVVUklDb21wb25lbnQoZW5jb2RlVVJJQ29tcG9uZW50KHVybCkpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHZhciBwb3B1cCA9IHdpbmRvdy5vcGVuKFxyXG5cdFx0XHR1cmwsXHJcblx0XHRcdCdfYmxhbmsnLFxyXG5cdFx0XHRvcHRpb25zQXJyYXkuam9pbignLCcpXHJcblx0XHQpO1xyXG5cclxuXHRcdGlmIChwb3B1cCAmJiBwb3B1cC5mb2N1cykge1xyXG5cdFx0XHRwb3B1cC5mb2N1cygpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBwb3B1cDtcclxuXHR9LFxyXG5cclxuXHQvLyBPQXV0aCBhbmQgQVBJIHJlc3BvbnNlIGhhbmRsZXJcclxuXHRyZXNwb25zZUhhbmRsZXI6IGZ1bmN0aW9uKHdpbmRvdywgcGFyZW50KSB7XHJcblxyXG5cdFx0dmFyIF90aGlzID0gdGhpcztcclxuXHRcdHZhciBwO1xyXG5cdFx0dmFyIGxvY2F0aW9uID0gd2luZG93LmxvY2F0aW9uO1xyXG5cclxuXHRcdC8vIElzIHRoaXMgYW4gYXV0aCByZWxheSBtZXNzYWdlIHdoaWNoIG5lZWRzIHRvIGNhbGwgdGhlIHByb3h5P1xyXG5cdFx0cCA9IF90aGlzLnBhcmFtKGxvY2F0aW9uLnNlYXJjaCk7XHJcblxyXG5cdFx0Ly8gT0F1dGgyIG9yIE9BdXRoMSBzZXJ2ZXIgcmVzcG9uc2U/XHJcblx0XHRpZiAocCAmJiBwLnN0YXRlICYmIChwLmNvZGUgfHwgcC5vYXV0aF90b2tlbikpIHtcclxuXHJcblx0XHRcdHZhciBzdGF0ZSA9IEpTT04ucGFyc2UocC5zdGF0ZSk7XHJcblxyXG5cdFx0XHQvLyBBZGQgdGhpcyBwYXRoIGFzIHRoZSByZWRpcmVjdF91cmlcclxuXHRcdFx0cC5yZWRpcmVjdF91cmkgPSBzdGF0ZS5yZWRpcmVjdF91cmkgfHwgbG9jYXRpb24uaHJlZi5yZXBsYWNlKC9bXFw/XFwjXS4qJC8sICcnKTtcclxuXHJcblx0XHRcdC8vIFJlZGlyZWN0IHRvIHRoZSBob3N0XHJcblx0XHRcdHZhciBwYXRoID0gc3RhdGUub2F1dGhfcHJveHkgKyAnPycgKyBfdGhpcy5wYXJhbShwKTtcclxuXHJcblx0XHRcdGxvY2F0aW9uLmFzc2lnbihwYXRoKTtcclxuXHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHJcblx0XHQvLyBTYXZlIHNlc3Npb24sIGZyb20gcmVkaXJlY3RlZCBhdXRoZW50aWNhdGlvblxyXG5cdFx0Ly8gI2FjY2Vzc190b2tlbiBoYXMgY29tZSBpbj9cclxuXHRcdC8vXHJcblx0XHQvLyBGQUNFQk9PSyBpcyByZXR1cm5pbmcgYXV0aCBlcnJvcnMgd2l0aGluIGFzIGEgcXVlcnlfc3RyaW5nLi4uIHRoYXRzIGEgc3RpY2tsZXIgZm9yIGNvbnNpc3RlbmN5LlxyXG5cdFx0Ly8gU291bmRDbG91ZCBpcyB0aGUgc3RhdGUgaW4gdGhlIHF1ZXJ5c3RyaW5nIGFuZCB0aGUgdG9rZW4gaW4gdGhlIGhhc2h0YWcsIHNvIHdlJ2xsIG1peCB0aGUgdHdvIHRvZ2V0aGVyXHJcblxyXG5cdFx0cCA9IF90aGlzLm1lcmdlKF90aGlzLnBhcmFtKGxvY2F0aW9uLnNlYXJjaCB8fCAnJyksIF90aGlzLnBhcmFtKGxvY2F0aW9uLmhhc2ggfHwgJycpKTtcclxuXHJcblx0XHQvLyBJZiBwLnN0YXRlXHJcblx0XHRpZiAocCAmJiAnc3RhdGUnIGluIHApIHtcclxuXHJcblx0XHRcdC8vIFJlbW92ZSBhbnkgYWRkaXRpb24gaW5mb3JtYXRpb25cclxuXHRcdFx0Ly8gRS5nLiBwLnN0YXRlID0gJ2ZhY2Vib29rLnBhZ2UnO1xyXG5cdFx0XHR0cnkge1xyXG5cdFx0XHRcdHZhciBhID0gSlNPTi5wYXJzZShwLnN0YXRlKTtcclxuXHRcdFx0XHRfdGhpcy5leHRlbmQocCwgYSk7XHJcblx0XHRcdH1cclxuXHRcdFx0Y2F0Y2ggKGUpIHtcclxuXHRcdFx0XHRjb25zb2xlLmVycm9yKCdDb3VsZCBub3QgZGVjb2RlIHN0YXRlIHBhcmFtZXRlcicpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQvLyBBY2Nlc3NfdG9rZW4/XHJcblx0XHRcdGlmICgoJ2FjY2Vzc190b2tlbicgaW4gcCAmJiBwLmFjY2Vzc190b2tlbikgJiYgcC5uZXR3b3JrKSB7XHJcblxyXG5cdFx0XHRcdGlmICghcC5leHBpcmVzX2luIHx8IHBhcnNlSW50KHAuZXhwaXJlc19pbiwgMTApID09PSAwKSB7XHJcblx0XHRcdFx0XHQvLyBJZiBwLmV4cGlyZXNfaW4gaXMgdW5zZXQsIHNldCB0byAwXHJcblx0XHRcdFx0XHRwLmV4cGlyZXNfaW4gPSAwO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0cC5leHBpcmVzX2luID0gcGFyc2VJbnQocC5leHBpcmVzX2luLCAxMCk7XHJcblx0XHRcdFx0cC5leHBpcmVzID0gKChuZXcgRGF0ZSgpKS5nZXRUaW1lKCkgLyAxZTMpICsgKHAuZXhwaXJlc19pbiB8fCAoNjAgKiA2MCAqIDI0ICogMzY1KSk7XHJcblxyXG5cdFx0XHRcdC8vIExldHMgdXNlIHRoZSBcInN0YXRlXCIgdG8gYXNzaWduIGl0IHRvIG9uZSBvZiBvdXIgbmV0d29ya3NcclxuXHRcdFx0XHRhdXRoQ2FsbGJhY2socCwgd2luZG93LCBwYXJlbnQpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQvLyBFcnJvcj0/XHJcblx0XHRcdC8vICZlcnJvcl9kZXNjcmlwdGlvbj0/XHJcblx0XHRcdC8vICZzdGF0ZT0/XHJcblx0XHRcdGVsc2UgaWYgKCgnZXJyb3InIGluIHAgJiYgcC5lcnJvcikgJiYgcC5uZXR3b3JrKSB7XHJcblxyXG5cdFx0XHRcdHAuZXJyb3IgPSB7XHJcblx0XHRcdFx0XHRjb2RlOiBwLmVycm9yLFxyXG5cdFx0XHRcdFx0bWVzc2FnZTogcC5lcnJvcl9tZXNzYWdlIHx8IHAuZXJyb3JfZGVzY3JpcHRpb25cclxuXHRcdFx0XHR9O1xyXG5cclxuXHRcdFx0XHQvLyBMZXQgdGhlIHN0YXRlIGhhbmRsZXIgaGFuZGxlIGl0XHJcblx0XHRcdFx0YXV0aENhbGxiYWNrKHAsIHdpbmRvdywgcGFyZW50KTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0Ly8gQVBJIGNhbGwsIG9yIGEgY2FuY2VsbGVkIGxvZ2luXHJcblx0XHRcdC8vIFJlc3VsdCBpcyBzZXJpYWxpemVkIEpTT04gc3RyaW5nXHJcblx0XHRcdGVsc2UgaWYgKHAuY2FsbGJhY2sgJiYgcC5jYWxsYmFjayBpbiBwYXJlbnQpIHtcclxuXHJcblx0XHRcdFx0Ly8gVHJpZ2dlciBhIGZ1bmN0aW9uIGluIHRoZSBwYXJlbnRcclxuXHRcdFx0XHR2YXIgcmVzID0gJ3Jlc3VsdCcgaW4gcCAmJiBwLnJlc3VsdCA/IEpTT04ucGFyc2UocC5yZXN1bHQpIDogZmFsc2U7XHJcblxyXG5cdFx0XHRcdC8vIFRyaWdnZXIgdGhlIGNhbGxiYWNrIG9uIHRoZSBwYXJlbnRcclxuXHRcdFx0XHRjYWxsYmFjayhwYXJlbnQsIHAuY2FsbGJhY2spKHJlcyk7XHJcblx0XHRcdFx0Y2xvc2VXaW5kb3coKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0Ly8gSWYgdGhpcyBwYWdlIGlzIHN0aWxsIG9wZW5cclxuXHRcdFx0aWYgKHAucGFnZV91cmkpIHtcclxuXHRcdFx0XHRsb2NhdGlvbi5hc3NpZ24ocC5wYWdlX3VyaSk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHQvLyBPQXV0aCByZWRpcmVjdCwgZml4ZXMgVVJJIGZyYWdtZW50cyBmcm9tIGJlaW5nIGxvc3QgaW4gU2FmYXJpXHJcblx0XHQvLyAoVVJJIEZyYWdtZW50cyB3aXRoaW4gMzAyIExvY2F0aW9uIFVSSSBhcmUgbG9zdCBvdmVyIEhUVFBTKVxyXG5cdFx0Ly8gTG9hZGluZyB0aGUgcmVkaXJlY3QuaHRtbCBiZWZvcmUgdHJpZ2dlcmluZyB0aGUgT0F1dGggRmxvdyBzZWVtcyB0byBmaXggaXQuXHJcblx0XHRlbHNlIGlmICgnb2F1dGhfcmVkaXJlY3QnIGluIHApIHtcclxuXHJcblx0XHRcdGxvY2F0aW9uLmFzc2lnbihkZWNvZGVVUklDb21wb25lbnQocC5vYXV0aF9yZWRpcmVjdCkpO1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gVHJpZ2dlciBhIGNhbGxiYWNrIHRvIGF1dGhlbnRpY2F0ZVxyXG5cdFx0ZnVuY3Rpb24gYXV0aENhbGxiYWNrKG9iaiwgd2luZG93LCBwYXJlbnQpIHtcclxuXHJcblx0XHRcdHZhciBjYiA9IG9iai5jYWxsYmFjaztcclxuXHRcdFx0dmFyIG5ldHdvcmsgPSBvYmoubmV0d29yaztcclxuXHJcblx0XHRcdC8vIFRyaWdnZXIgdGhlIGNhbGxiYWNrIG9uIHRoZSBwYXJlbnRcclxuXHRcdFx0X3RoaXMuc3RvcmUobmV0d29yaywgb2JqKTtcclxuXHJcblx0XHRcdC8vIElmIHRoaXMgaXMgYSBwYWdlIHJlcXVlc3QgaXQgaGFzIG5vIHBhcmVudCBvciBvcGVuZXIgd2luZG93IHRvIGhhbmRsZSBjYWxsYmFja3NcclxuXHRcdFx0aWYgKCgnZGlzcGxheScgaW4gb2JqKSAmJiBvYmouZGlzcGxheSA9PT0gJ3BhZ2UnKSB7XHJcblx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQvLyBSZW1vdmUgZnJvbSBzZXNzaW9uIG9iamVjdFxyXG5cdFx0XHRpZiAocGFyZW50ICYmIGNiICYmIGNiIGluIHBhcmVudCkge1xyXG5cclxuXHRcdFx0XHR0cnkge1xyXG5cdFx0XHRcdFx0ZGVsZXRlIG9iai5jYWxsYmFjaztcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0Y2F0Y2ggKGUpIHt9XHJcblxyXG5cdFx0XHRcdC8vIFVwZGF0ZSBzdG9yZVxyXG5cdFx0XHRcdF90aGlzLnN0b3JlKG5ldHdvcmssIG9iaik7XHJcblxyXG5cdFx0XHRcdC8vIENhbGwgdGhlIGdsb2JhbEV2ZW50IGZ1bmN0aW9uIG9uIHRoZSBwYXJlbnRcclxuXHRcdFx0XHQvLyBJdCdzIHNhZmVyIHRvIHBhc3MgYmFjayBhIHN0cmluZyB0byB0aGUgcGFyZW50LFxyXG5cdFx0XHRcdC8vIFJhdGhlciB0aGFuIGFuIG9iamVjdC9hcnJheSAoYmV0dGVyIGZvciBJRTgpXHJcblx0XHRcdFx0dmFyIHN0ciA9IEpTT04uc3RyaW5naWZ5KG9iaik7XHJcblxyXG5cdFx0XHRcdHRyeSB7XHJcblx0XHRcdFx0XHRjYWxsYmFjayhwYXJlbnQsIGNiKShzdHIpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRjYXRjaCAoZSkge1xyXG5cdFx0XHRcdFx0Ly8gRXJyb3IgdGhyb3duIHdoaWxzdCBleGVjdXRpbmcgcGFyZW50IGNhbGxiYWNrXHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRjbG9zZVdpbmRvdygpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGZ1bmN0aW9uIGNhbGxiYWNrKHBhcmVudCwgY2FsbGJhY2tJRCkge1xyXG5cdFx0XHRpZiAoY2FsbGJhY2tJRC5pbmRleE9mKCdfaGVsbG9qc18nKSAhPT0gMCkge1xyXG5cdFx0XHRcdHJldHVybiBmdW5jdGlvbigpIHtcclxuXHRcdFx0XHRcdHRocm93ICdDb3VsZCBub3QgZXhlY3V0ZSBjYWxsYmFjayAnICsgY2FsbGJhY2tJRDtcclxuXHRcdFx0XHR9O1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRyZXR1cm4gcGFyZW50W2NhbGxiYWNrSURdO1xyXG5cdFx0fVxyXG5cclxuXHRcdGZ1bmN0aW9uIGNsb3NlV2luZG93KCkge1xyXG5cclxuXHRcdFx0aWYgKHdpbmRvdy5mcmFtZUVsZW1lbnQpIHtcclxuXHRcdFx0XHQvLyBJbnNpZGUgYW4gaWZyYW1lLCByZW1vdmUgZnJvbSBwYXJlbnRcclxuXHRcdFx0XHRwYXJlbnQuZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZCh3aW5kb3cuZnJhbWVFbGVtZW50KTtcclxuXHRcdFx0fVxyXG5cdFx0XHRlbHNlIHtcclxuXHRcdFx0XHQvLyBDbG9zZSB0aGlzIGN1cnJlbnQgd2luZG93XHJcblx0XHRcdFx0dHJ5IHtcclxuXHRcdFx0XHRcdHdpbmRvdy5jbG9zZSgpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRjYXRjaCAoZSkge31cclxuXHJcblx0XHRcdFx0Ly8gSU9TIGJ1ZyB3b250IGxldCB1cyBjbG9zZSBhIHBvcHVwIGlmIHN0aWxsIGxvYWRpbmdcclxuXHRcdFx0XHRpZiAod2luZG93LmFkZEV2ZW50TGlzdGVuZXIpIHtcclxuXHRcdFx0XHRcdHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0XHRcdHdpbmRvdy5jbG9zZSgpO1xyXG5cdFx0XHRcdFx0fSk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblxyXG5cdFx0fVxyXG5cdH1cclxufSk7XHJcblxyXG4vLyBFdmVudHNcclxuLy8gRXh0ZW5kIHRoZSBoZWxsbyBvYmplY3Qgd2l0aCBpdHMgb3duIGV2ZW50IGluc3RhbmNlXHJcbmhlbGxvLnV0aWxzLkV2ZW50LmNhbGwoaGVsbG8pO1xyXG5cclxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuLy8gTW9uaXRvcmluZyBzZXNzaW9uIHN0YXRlXHJcbi8vIENoZWNrIGZvciBzZXNzaW9uIGNoYW5nZXNcclxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuXHJcbihmdW5jdGlvbihoZWxsbykge1xyXG5cclxuXHQvLyBNb25pdG9yIGZvciBhIGNoYW5nZSBpbiBzdGF0ZSBhbmQgZmlyZVxyXG5cdHZhciBvbGRTZXNzaW9ucyA9IHt9O1xyXG5cclxuXHQvLyBIYXNoIG9mIGV4cGlyZWQgdG9rZW5zXHJcblx0dmFyIGV4cGlyZWQgPSB7fTtcclxuXHJcblx0Ly8gTGlzdGVuIHRvIG90aGVyIHRyaWdnZXJzIHRvIEF1dGggZXZlbnRzLCB1c2UgdGhlc2UgdG8gdXBkYXRlIHRoaXNcclxuXHRoZWxsby5vbignYXV0aC5sb2dpbiwgYXV0aC5sb2dvdXQnLCBmdW5jdGlvbihhdXRoKSB7XHJcblx0XHRpZiAoYXV0aCAmJiB0eXBlb2YgKGF1dGgpID09PSAnb2JqZWN0JyAmJiBhdXRoLm5ldHdvcmspIHtcclxuXHRcdFx0b2xkU2Vzc2lvbnNbYXV0aC5uZXR3b3JrXSA9IGhlbGxvLnV0aWxzLnN0b3JlKGF1dGgubmV0d29yaykgfHwge307XHJcblx0XHR9XHJcblx0fSk7XHJcblxyXG5cdChmdW5jdGlvbiBzZWxmKCkge1xyXG5cclxuXHRcdHZhciBDVVJSRU5UX1RJTUUgPSAoKG5ldyBEYXRlKCkpLmdldFRpbWUoKSAvIDFlMyk7XHJcblx0XHR2YXIgZW1pdCA9IGZ1bmN0aW9uKGV2ZW50TmFtZSkge1xyXG5cdFx0XHRoZWxsby5lbWl0KCdhdXRoLicgKyBldmVudE5hbWUsIHtcclxuXHRcdFx0XHRuZXR3b3JrOiBuYW1lLFxyXG5cdFx0XHRcdGF1dGhSZXNwb25zZTogc2Vzc2lvblxyXG5cdFx0XHR9KTtcclxuXHRcdH07XHJcblxyXG5cdFx0Ly8gTG9vcCB0aHJvdWdoIHRoZSBzZXJ2aWNlc1xyXG5cdFx0Zm9yICh2YXIgbmFtZSBpbiBoZWxsby5zZXJ2aWNlcykge2lmIChoZWxsby5zZXJ2aWNlcy5oYXNPd25Qcm9wZXJ0eShuYW1lKSkge1xyXG5cclxuXHRcdFx0aWYgKCFoZWxsby5zZXJ2aWNlc1tuYW1lXS5pZCkge1xyXG5cdFx0XHRcdC8vIFdlIGhhdmVuJ3QgYXR0YWNoZWQgYW4gSUQgc28gZG9udCBsaXN0ZW4uXHJcblx0XHRcdFx0Y29udGludWU7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdC8vIEdldCBzZXNzaW9uXHJcblx0XHRcdHZhciBzZXNzaW9uID0gaGVsbG8udXRpbHMuc3RvcmUobmFtZSkgfHwge307XHJcblx0XHRcdHZhciBwcm92aWRlciA9IGhlbGxvLnNlcnZpY2VzW25hbWVdO1xyXG5cdFx0XHR2YXIgb2xkU2VzcyA9IG9sZFNlc3Npb25zW25hbWVdIHx8IHt9O1xyXG5cclxuXHRcdFx0Ly8gTGlzdGVuIGZvciBnbG9iYWxFdmVudHMgdGhhdCBkaWQgbm90IGdldCB0cmlnZ2VyZWQgZnJvbSB0aGUgY2hpbGRcclxuXHRcdFx0aWYgKHNlc3Npb24gJiYgJ2NhbGxiYWNrJyBpbiBzZXNzaW9uKSB7XHJcblxyXG5cdFx0XHRcdC8vIFRvIGRvIHJlbW92ZSBmcm9tIHNlc3Npb24gb2JqZWN0Li4uXHJcblx0XHRcdFx0dmFyIGNiID0gc2Vzc2lvbi5jYWxsYmFjaztcclxuXHRcdFx0XHR0cnkge1xyXG5cdFx0XHRcdFx0ZGVsZXRlIHNlc3Npb24uY2FsbGJhY2s7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdGNhdGNoIChlKSB7fVxyXG5cclxuXHRcdFx0XHQvLyBVcGRhdGUgc3RvcmVcclxuXHRcdFx0XHQvLyBSZW1vdmluZyB0aGUgY2FsbGJhY2tcclxuXHRcdFx0XHRoZWxsby51dGlscy5zdG9yZShuYW1lLCBzZXNzaW9uKTtcclxuXHJcblx0XHRcdFx0Ly8gRW1pdCBnbG9iYWwgZXZlbnRzXHJcblx0XHRcdFx0dHJ5IHtcclxuXHRcdFx0XHRcdHdpbmRvd1tjYl0oc2Vzc2lvbik7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdGNhdGNoIChlKSB7fVxyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQvLyBSZWZyZXNoIHRva2VuXHJcblx0XHRcdGlmIChzZXNzaW9uICYmICgnZXhwaXJlcycgaW4gc2Vzc2lvbikgJiYgc2Vzc2lvbi5leHBpcmVzIDwgQ1VSUkVOVF9USU1FKSB7XHJcblxyXG5cdFx0XHRcdC8vIElmIGF1dG8gcmVmcmVzaCBpcyBwb3NzaWJsZVxyXG5cdFx0XHRcdC8vIEVpdGhlciB0aGUgYnJvd3NlciBzdXBwb3J0c1xyXG5cdFx0XHRcdHZhciByZWZyZXNoID0gcHJvdmlkZXIucmVmcmVzaCB8fCBzZXNzaW9uLnJlZnJlc2hfdG9rZW47XHJcblxyXG5cdFx0XHRcdC8vIEhhcyB0aGUgcmVmcmVzaCBiZWVuIHJ1biByZWNlbnRseT9cclxuXHRcdFx0XHRpZiAocmVmcmVzaCAmJiAoIShuYW1lIGluIGV4cGlyZWQpIHx8IGV4cGlyZWRbbmFtZV0gPCBDVVJSRU5UX1RJTUUpKSB7XHJcblx0XHRcdFx0XHQvLyBUcnkgdG8gcmVzaWduaW5cclxuXHRcdFx0XHRcdGhlbGxvLmVtaXQoJ25vdGljZScsIG5hbWUgKyAnIGhhcyBleHBpcmVkIHRyeWluZyB0byByZXNpZ25pbicpO1xyXG5cdFx0XHRcdFx0aGVsbG8ubG9naW4obmFtZSwge2Rpc3BsYXk6ICdub25lJywgZm9yY2U6IGZhbHNlfSk7XHJcblxyXG5cdFx0XHRcdFx0Ly8gVXBkYXRlIGV4cGlyZWQsIGV2ZXJ5IDEwIG1pbnV0ZXNcclxuXHRcdFx0XHRcdGV4cGlyZWRbbmFtZV0gPSBDVVJSRU5UX1RJTUUgKyA2MDA7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHQvLyBEb2VzIHRoaXMgcHJvdmlkZXIgbm90IHN1cHBvcnQgcmVmcmVzaFxyXG5cdFx0XHRcdGVsc2UgaWYgKCFyZWZyZXNoICYmICEobmFtZSBpbiBleHBpcmVkKSkge1xyXG5cdFx0XHRcdFx0Ly8gTGFiZWwgdGhlIGV2ZW50XHJcblx0XHRcdFx0XHRlbWl0KCdleHBpcmVkJyk7XHJcblx0XHRcdFx0XHRleHBpcmVkW25hbWVdID0gdHJ1ZTtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdC8vIElmIHNlc3Npb24gaGFzIGV4cGlyZWQgdGhlbiB3ZSBkb250IHdhbnQgdG8gc3RvcmUgaXRzIHZhbHVlIHVudGlsIGl0IGNhbiBiZSBlc3RhYmxpc2hlZCB0aGF0IGl0cyBiZWVuIHVwZGF0ZWRcclxuXHRcdFx0XHRjb250aW51ZTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0Ly8gSGFzIHNlc3Npb24gY2hhbmdlZD9cclxuXHRcdFx0ZWxzZSBpZiAob2xkU2Vzcy5hY2Nlc3NfdG9rZW4gPT09IHNlc3Npb24uYWNjZXNzX3Rva2VuICYmXHJcblx0XHRcdG9sZFNlc3MuZXhwaXJlcyA9PT0gc2Vzc2lvbi5leHBpcmVzKSB7XHJcblx0XHRcdFx0Y29udGludWU7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdC8vIEFjY2Vzc190b2tlbiBoYXMgYmVlbiByZW1vdmVkXHJcblx0XHRcdGVsc2UgaWYgKCFzZXNzaW9uLmFjY2Vzc190b2tlbiAmJiBvbGRTZXNzLmFjY2Vzc190b2tlbikge1xyXG5cdFx0XHRcdGVtaXQoJ2xvZ291dCcpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQvLyBBY2Nlc3NfdG9rZW4gaGFzIGJlZW4gY3JlYXRlZFxyXG5cdFx0XHRlbHNlIGlmIChzZXNzaW9uLmFjY2Vzc190b2tlbiAmJiAhb2xkU2Vzcy5hY2Nlc3NfdG9rZW4pIHtcclxuXHRcdFx0XHRlbWl0KCdsb2dpbicpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQvLyBBY2Nlc3NfdG9rZW4gaGFzIGJlZW4gdXBkYXRlZFxyXG5cdFx0XHRlbHNlIGlmIChzZXNzaW9uLmV4cGlyZXMgIT09IG9sZFNlc3MuZXhwaXJlcykge1xyXG5cdFx0XHRcdGVtaXQoJ3VwZGF0ZScpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQvLyBVcGRhdGVkIHN0b3JlZCBzZXNzaW9uXHJcblx0XHRcdG9sZFNlc3Npb25zW25hbWVdID0gc2Vzc2lvbjtcclxuXHJcblx0XHRcdC8vIFJlbW92ZSB0aGUgZXhwaXJlZCBmbGFnc1xyXG5cdFx0XHRpZiAobmFtZSBpbiBleHBpcmVkKSB7XHJcblx0XHRcdFx0ZGVsZXRlIGV4cGlyZWRbbmFtZV07XHJcblx0XHRcdH1cclxuXHRcdH19XHJcblxyXG5cdFx0Ly8gQ2hlY2sgZXJyb3IgZXZlbnRzXHJcblx0XHRzZXRUaW1lb3V0KHNlbGYsIDEwMDApO1xyXG5cdH0pKCk7XHJcblxyXG59KShoZWxsbyk7XHJcblxyXG4vLyBFT0YgQ09SRSBsaWJcclxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG5cclxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuLy8gQVBJXHJcbi8vIEBwYXJhbSBwYXRoICAgIHN0cmluZ1xyXG4vLyBAcGFyYW0gcXVlcnkgICBvYmplY3QgKG9wdGlvbmFsKVxyXG4vLyBAcGFyYW0gbWV0aG9kICBzdHJpbmcgKG9wdGlvbmFsKVxyXG4vLyBAcGFyYW0gZGF0YSAgICBvYmplY3QgKG9wdGlvbmFsKVxyXG4vLyBAcGFyYW0gdGltZW91dCBpbnRlZ2VyIChvcHRpb25hbClcclxuLy8gQHBhcmFtIGNhbGxiYWNrICBmdW5jdGlvbiAob3B0aW9uYWwpXHJcblxyXG5oZWxsby5hcGkgPSBmdW5jdGlvbigpIHtcclxuXHJcblx0Ly8gU2hvcnRoYW5kXHJcblx0dmFyIF90aGlzID0gdGhpcztcclxuXHR2YXIgdXRpbHMgPSBfdGhpcy51dGlscztcclxuXHR2YXIgZXJyb3IgPSB1dGlscy5lcnJvcjtcclxuXHJcblx0Ly8gQ29uc3RydWN0IGEgbmV3IFByb21pc2Ugb2JqZWN0XHJcblx0dmFyIHByb21pc2UgPSB1dGlscy5Qcm9taXNlKCk7XHJcblxyXG5cdC8vIEFyZ3VtZW50c1xyXG5cdHZhciBwID0gdXRpbHMuYXJncyh7cGF0aDogJ3MhJywgcXVlcnk6ICdvJywgbWV0aG9kOiAncycsIGRhdGE6ICdvJywgdGltZW91dDogJ2knLCBjYWxsYmFjazogJ2YnfSwgYXJndW1lbnRzKTtcclxuXHJcblx0Ly8gTWV0aG9kXHJcblx0cC5tZXRob2QgPSAocC5tZXRob2QgfHwgJ2dldCcpLnRvTG93ZXJDYXNlKCk7XHJcblxyXG5cdC8vIEhlYWRlcnNcclxuXHRwLmhlYWRlcnMgPSBwLmhlYWRlcnMgfHwge307XHJcblxyXG5cdC8vIFF1ZXJ5XHJcblx0cC5xdWVyeSA9IHAucXVlcnkgfHwge307XHJcblxyXG5cdC8vIElmIGdldCwgcHV0IGFsbCBwYXJhbWV0ZXJzIGludG8gcXVlcnlcclxuXHRpZiAocC5tZXRob2QgPT09ICdnZXQnIHx8IHAubWV0aG9kID09PSAnZGVsZXRlJykge1xyXG5cdFx0dXRpbHMuZXh0ZW5kKHAucXVlcnksIHAuZGF0YSk7XHJcblx0XHRwLmRhdGEgPSB7fTtcclxuXHR9XHJcblxyXG5cdHZhciBkYXRhID0gcC5kYXRhID0gcC5kYXRhIHx8IHt9O1xyXG5cclxuXHQvLyBDb21wbGV0ZWQgZXZlbnQgY2FsbGJhY2tcclxuXHRwcm9taXNlLnRoZW4ocC5jYWxsYmFjaywgcC5jYWxsYmFjayk7XHJcblxyXG5cdC8vIFJlbW92ZSB0aGUgbmV0d29yayBmcm9tIHBhdGgsIGUuZy4gZmFjZWJvb2s6L21lL2ZyaWVuZHNcclxuXHQvLyBSZXN1bHRzIGluIHsgbmV0d29yayA6IGZhY2Vib29rLCBwYXRoIDogbWUvZnJpZW5kcyB9XHJcblx0aWYgKCFwLnBhdGgpIHtcclxuXHRcdHJldHVybiBwcm9taXNlLnJlamVjdChlcnJvcignaW52YWxpZF9wYXRoJywgJ01pc3NpbmcgdGhlIHBhdGggcGFyYW1ldGVyIGZyb20gdGhlIHJlcXVlc3QnKSk7XHJcblx0fVxyXG5cclxuXHRwLnBhdGggPSBwLnBhdGgucmVwbGFjZSgvXlxcLysvLCAnJyk7XHJcblx0dmFyIGEgPSAocC5wYXRoLnNwbGl0KC9bXFwvXFw6XS8sIDIpIHx8IFtdKVswXS50b0xvd2VyQ2FzZSgpO1xyXG5cclxuXHRpZiAoYSBpbiBfdGhpcy5zZXJ2aWNlcykge1xyXG5cdFx0cC5uZXR3b3JrID0gYTtcclxuXHRcdHZhciByZWcgPSBuZXcgUmVnRXhwKCdeJyArIGEgKyAnOj9cXC8/Jyk7XHJcblx0XHRwLnBhdGggPSBwLnBhdGgucmVwbGFjZShyZWcsICcnKTtcclxuXHR9XHJcblxyXG5cdC8vIE5ldHdvcmsgJiBQcm92aWRlclxyXG5cdC8vIERlZmluZSB0aGUgbmV0d29yayB0aGF0IHRoaXMgcmVxdWVzdCBpcyBtYWRlIGZvclxyXG5cdHAubmV0d29yayA9IF90aGlzLnNldHRpbmdzLmRlZmF1bHRfc2VydmljZSA9IHAubmV0d29yayB8fCBfdGhpcy5zZXR0aW5ncy5kZWZhdWx0X3NlcnZpY2U7XHJcblx0dmFyIG8gPSBfdGhpcy5zZXJ2aWNlc1twLm5ldHdvcmtdO1xyXG5cclxuXHQvLyBJTlZBTElEXHJcblx0Ly8gSXMgdGhlcmUgbm8gc2VydmljZSBieSB0aGUgZ2l2ZW4gbmV0d29yayBuYW1lP1xyXG5cdGlmICghbykge1xyXG5cdFx0cmV0dXJuIHByb21pc2UucmVqZWN0KGVycm9yKCdpbnZhbGlkX25ldHdvcmsnLCAnQ291bGQgbm90IG1hdGNoIHRoZSBzZXJ2aWNlIHJlcXVlc3RlZDogJyArIHAubmV0d29yaykpO1xyXG5cdH1cclxuXHJcblx0Ly8gUEFUSFxyXG5cdC8vIEFzIGxvbmcgYXMgdGhlIHBhdGggaXNuJ3QgZmxhZ2dlZCBhcyB1bmF2YWlhYmxlLCBlLmcuIHBhdGggPT0gZmFsc2VcclxuXHJcblx0aWYgKCEoIShwLm1ldGhvZCBpbiBvKSB8fCAhKHAucGF0aCBpbiBvW3AubWV0aG9kXSkgfHwgb1twLm1ldGhvZF1bcC5wYXRoXSAhPT0gZmFsc2UpKSB7XHJcblx0XHRyZXR1cm4gcHJvbWlzZS5yZWplY3QoZXJyb3IoJ2ludmFsaWRfcGF0aCcsICdUaGUgcHJvdmlkZWQgcGF0aCBpcyBub3QgYXZhaWxhYmxlIG9uIHRoZSBzZWxlY3RlZCBuZXR3b3JrJykpO1xyXG5cdH1cclxuXHJcblx0Ly8gUFJPWFlcclxuXHQvLyBPQXV0aDEgY2FsbHMgYWx3YXlzIG5lZWQgYSBwcm94eVxyXG5cclxuXHRpZiAoIXAub2F1dGhfcHJveHkpIHtcclxuXHRcdHAub2F1dGhfcHJveHkgPSBfdGhpcy5zZXR0aW5ncy5vYXV0aF9wcm94eTtcclxuXHR9XHJcblxyXG5cdGlmICghKCdwcm94eScgaW4gcCkpIHtcclxuXHRcdHAucHJveHkgPSBwLm9hdXRoX3Byb3h5ICYmIG8ub2F1dGggJiYgcGFyc2VJbnQoby5vYXV0aC52ZXJzaW9uLCAxMCkgPT09IDE7XHJcblx0fVxyXG5cclxuXHQvLyBUSU1FT1VUXHJcblx0Ly8gQWRvcHQgdGltZW91dCBmcm9tIGdsb2JhbCBzZXR0aW5ncyBieSBkZWZhdWx0XHJcblxyXG5cdGlmICghKCd0aW1lb3V0JyBpbiBwKSkge1xyXG5cdFx0cC50aW1lb3V0ID0gX3RoaXMuc2V0dGluZ3MudGltZW91dDtcclxuXHR9XHJcblxyXG5cdC8vIEZvcm1hdCByZXNwb25zZVxyXG5cdC8vIFdoZXRoZXIgdG8gcnVuIHRoZSByYXcgcmVzcG9uc2UgdGhyb3VnaCBwb3N0IHByb2Nlc3NpbmcuXHJcblx0aWYgKCEoJ2Zvcm1hdFJlc3BvbnNlJyBpbiBwKSkge1xyXG5cdFx0cC5mb3JtYXRSZXNwb25zZSA9IHRydWU7XHJcblx0fVxyXG5cclxuXHQvLyBHZXQgdGhlIGN1cnJlbnQgc2Vzc2lvblxyXG5cdC8vIEFwcGVuZCB0aGUgYWNjZXNzX3Rva2VuIHRvIHRoZSBxdWVyeVxyXG5cdHAuYXV0aFJlc3BvbnNlID0gX3RoaXMuZ2V0QXV0aFJlc3BvbnNlKHAubmV0d29yayk7XHJcblx0aWYgKHAuYXV0aFJlc3BvbnNlICYmIHAuYXV0aFJlc3BvbnNlLmFjY2Vzc190b2tlbikge1xyXG5cdFx0cC5xdWVyeS5hY2Nlc3NfdG9rZW4gPSBwLmF1dGhSZXNwb25zZS5hY2Nlc3NfdG9rZW47XHJcblx0fVxyXG5cclxuXHR2YXIgdXJsID0gcC5wYXRoO1xyXG5cdHZhciBtO1xyXG5cclxuXHQvLyBTdG9yZSB0aGUgcXVlcnkgYXMgb3B0aW9uc1xyXG5cdC8vIFRoaXMgaXMgdXNlZCB0byBwb3B1bGF0ZSB0aGUgcmVxdWVzdCBvYmplY3QgYmVmb3JlIHRoZSBkYXRhIGlzIGF1Z21lbnRlZCBieSB0aGUgcHJld3JhcCBoYW5kbGVycy5cclxuXHRwLm9wdGlvbnMgPSB1dGlscy5jbG9uZShwLnF1ZXJ5KTtcclxuXHJcblx0Ly8gQ2xvbmUgdGhlIGRhdGEgb2JqZWN0XHJcblx0Ly8gUHJldmVudCB0aGlzIHNjcmlwdCBvdmVyd3JpdGluZyB0aGUgZGF0YSBvZiB0aGUgaW5jb21pbmcgb2JqZWN0LlxyXG5cdC8vIEVuc3VyZSB0aGF0IGV2ZXJ5dGltZSB3ZSBydW4gYW4gaXRlcmF0aW9uIHRoZSBjYWxsYmFja3MgaGF2ZW4ndCByZW1vdmVkIHNvbWUgZGF0YVxyXG5cdHAuZGF0YSA9IHV0aWxzLmNsb25lKGRhdGEpO1xyXG5cclxuXHQvLyBVUkwgTWFwcGluZ1xyXG5cdC8vIElzIHRoZXJlIGEgbWFwIGZvciB0aGUgZ2l2ZW4gVVJMP1xyXG5cdHZhciBhY3Rpb25zID0gb1t7J2RlbGV0ZSc6ICdkZWwnfVtwLm1ldGhvZF0gfHwgcC5tZXRob2RdIHx8IHt9O1xyXG5cclxuXHQvLyBFeHRyYXBvbGF0ZSB0aGUgUXVlcnlTdHJpbmdcclxuXHQvLyBQcm92aWRlIGEgY2xlYW4gcGF0aFxyXG5cdC8vIE1vdmUgdGhlIHF1ZXJ5c3RyaW5nIGludG8gdGhlIGRhdGFcclxuXHRpZiAocC5tZXRob2QgPT09ICdnZXQnKSB7XHJcblxyXG5cdFx0dmFyIHF1ZXJ5ID0gdXJsLnNwbGl0KC9bXFw/I10vKVsxXTtcclxuXHRcdGlmIChxdWVyeSkge1xyXG5cdFx0XHR1dGlscy5leHRlbmQocC5xdWVyeSwgdXRpbHMucGFyYW0ocXVlcnkpKTtcclxuXHJcblx0XHRcdC8vIFJlbW92ZSB0aGUgcXVlcnkgcGFydCBmcm9tIHRoZSBVUkxcclxuXHRcdFx0dXJsID0gdXJsLnJlcGxhY2UoL1xcPy4qPygjfCQpLywgJyQxJyk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHQvLyBJcyB0aGUgaGFzaCBmcmFnbWVudCBkZWZpbmVkXHJcblx0aWYgKChtID0gdXJsLm1hdGNoKC8jKC4rKS8sICcnKSkpIHtcclxuXHRcdHVybCA9IHVybC5zcGxpdCgnIycpWzBdO1xyXG5cdFx0cC5wYXRoID0gbVsxXTtcclxuXHR9XHJcblx0ZWxzZSBpZiAodXJsIGluIGFjdGlvbnMpIHtcclxuXHRcdHAucGF0aCA9IHVybDtcclxuXHRcdHVybCA9IGFjdGlvbnNbdXJsXTtcclxuXHR9XHJcblx0ZWxzZSBpZiAoJ2RlZmF1bHQnIGluIGFjdGlvbnMpIHtcclxuXHRcdHVybCA9IGFjdGlvbnNbJ2RlZmF1bHQnXTtcclxuXHR9XHJcblxyXG5cdC8vIFJlZGlyZWN0IEhhbmRsZXJcclxuXHQvLyBUaGlzIGRlZmluZXMgZm9yIHRoZSBGb3JtK0lmcmFtZStIYXNoIGhhY2sgd2hlcmUgdG8gcmV0dXJuIHRoZSByZXN1bHRzIHRvby5cclxuXHRwLnJlZGlyZWN0X3VyaSA9IF90aGlzLnNldHRpbmdzLnJlZGlyZWN0X3VyaTtcclxuXHJcblx0Ly8gRGVmaW5lIEZvcm1hdEhhbmRsZXJcclxuXHQvLyBUaGUgcmVxdWVzdCBjYW4gYmUgcHJvY2VzZWQgaW4gYSBtdWx0aXR1ZGUgb2Ygd2F5c1xyXG5cdC8vIEhlcmUncyB0aGUgb3B0aW9ucyAtIGRlcGVuZGluZyBvbiB0aGUgYnJvd3NlciBhbmQgZW5kcG9pbnRcclxuXHRwLnhociA9IG8ueGhyO1xyXG5cdHAuanNvbnAgPSBvLmpzb25wO1xyXG5cdHAuZm9ybSA9IG8uZm9ybTtcclxuXHJcblx0Ly8gTWFrZSByZXF1ZXN0XHJcblx0aWYgKHR5cGVvZiAodXJsKSA9PT0gJ2Z1bmN0aW9uJykge1xyXG5cdFx0Ly8gRG9lcyBzZWxmIGhhdmUgaXRzIG93biBjYWxsYmFjaz9cclxuXHRcdHVybChwLCBnZXRQYXRoKTtcclxuXHR9XHJcblx0ZWxzZSB7XHJcblx0XHQvLyBFbHNlIHRoZSBVUkwgaXMgYSBzdHJpbmdcclxuXHRcdGdldFBhdGgodXJsKTtcclxuXHR9XHJcblxyXG5cdHJldHVybiBwcm9taXNlLnByb3h5O1xyXG5cclxuXHQvLyBJZiB1cmwgbmVlZHMgYSBiYXNlXHJcblx0Ly8gV3JhcCBldmVyeXRoaW5nIGluXHJcblx0ZnVuY3Rpb24gZ2V0UGF0aCh1cmwpIHtcclxuXHJcblx0XHQvLyBGb3JtYXQgdGhlIHN0cmluZyBpZiBpdCBuZWVkcyBpdFxyXG5cdFx0dXJsID0gdXJsLnJlcGxhY2UoL1xcQFxceyhbYS16XFxfXFwtXSspKFxcfC4qPyk/XFx9L2dpLCBmdW5jdGlvbihtLCBrZXksIGRlZmF1bHRzKSB7XHJcblx0XHRcdHZhciB2YWwgPSBkZWZhdWx0cyA/IGRlZmF1bHRzLnJlcGxhY2UoL15cXHwvLCAnJykgOiAnJztcclxuXHRcdFx0aWYgKGtleSBpbiBwLnF1ZXJ5KSB7XHJcblx0XHRcdFx0dmFsID0gcC5xdWVyeVtrZXldO1xyXG5cdFx0XHRcdGRlbGV0ZSBwLnF1ZXJ5W2tleV07XHJcblx0XHRcdH1cclxuXHRcdFx0ZWxzZSBpZiAocC5kYXRhICYmIGtleSBpbiBwLmRhdGEpIHtcclxuXHRcdFx0XHR2YWwgPSBwLmRhdGFba2V5XTtcclxuXHRcdFx0XHRkZWxldGUgcC5kYXRhW2tleV07XHJcblx0XHRcdH1cclxuXHRcdFx0ZWxzZSBpZiAoIWRlZmF1bHRzKSB7XHJcblx0XHRcdFx0cHJvbWlzZS5yZWplY3QoZXJyb3IoJ21pc3NpbmdfYXR0cmlidXRlJywgJ1RoZSBhdHRyaWJ1dGUgJyArIGtleSArICcgaXMgbWlzc2luZyBmcm9tIHRoZSByZXF1ZXN0JykpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRyZXR1cm4gdmFsO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0Ly8gQWRkIGJhc2VcclxuXHRcdGlmICghdXJsLm1hdGNoKC9eaHR0cHM/OlxcL1xcLy8pKSB7XHJcblx0XHRcdHVybCA9IG8uYmFzZSArIHVybDtcclxuXHRcdH1cclxuXHJcblx0XHQvLyBEZWZpbmUgdGhlIHJlcXVlc3QgVVJMXHJcblx0XHRwLnVybCA9IHVybDtcclxuXHJcblx0XHQvLyBNYWtlIHRoZSBIVFRQIHJlcXVlc3Qgd2l0aCB0aGUgY3VyYXRlZCByZXF1ZXN0IG9iamVjdFxyXG5cdFx0Ly8gQ0FMTEJBQ0sgSEFORExFUlxyXG5cdFx0Ly8gQCByZXNwb25zZSBvYmplY3RcclxuXHRcdC8vIEAgc3RhdHVzQ29kZSBpbnRlZ2VyIGlmIGF2YWlsYWJsZVxyXG5cdFx0dXRpbHMucmVxdWVzdChwLCBmdW5jdGlvbihyLCBoZWFkZXJzKSB7XHJcblxyXG5cdFx0XHQvLyBJcyB0aGlzIGEgcmF3IHJlc3BvbnNlP1xyXG5cdFx0XHRpZiAoIXAuZm9ybWF0UmVzcG9uc2UpIHtcclxuXHRcdFx0XHQvLyBCYWQgcmVxdWVzdD8gZXJyb3Igc3RhdHVzQ29kZSBvciBvdGhlcndpc2UgY29udGFpbnMgYW4gZXJyb3IgcmVzcG9uc2UgdmlzIEpTT05QP1xyXG5cdFx0XHRcdGlmICh0eXBlb2YgaGVhZGVycyA9PT0gJ29iamVjdCcgPyAoaGVhZGVycy5zdGF0dXNDb2RlID49IDQwMCkgOiAodHlwZW9mIHIgPT09ICdvYmplY3QnICYmICdlcnJvcicgaW4gcikpIHtcclxuXHRcdFx0XHRcdHByb21pc2UucmVqZWN0KHIpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRlbHNlIHtcclxuXHRcdFx0XHRcdHByb21pc2UuZnVsZmlsbChyKTtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdHJldHVybjtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0Ly8gU2hvdWxkIHRoaXMgYmUgYW4gb2JqZWN0XHJcblx0XHRcdGlmIChyID09PSB0cnVlKSB7XHJcblx0XHRcdFx0ciA9IHtzdWNjZXNzOnRydWV9O1xyXG5cdFx0XHR9XHJcblx0XHRcdGVsc2UgaWYgKCFyKSB7XHJcblx0XHRcdFx0ciA9IHt9O1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQvLyBUaGUgZGVsZXRlIGNhbGxiYWNrIG5lZWRzIGEgYmV0dGVyIHJlc3BvbnNlXHJcblx0XHRcdGlmIChwLm1ldGhvZCA9PT0gJ2RlbGV0ZScpIHtcclxuXHRcdFx0XHRyID0gKCFyIHx8IHV0aWxzLmlzRW1wdHkocikpID8ge3N1Y2Nlc3M6dHJ1ZX0gOiByO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQvLyBGT1JNQVQgUkVTUE9OU0U/XHJcblx0XHRcdC8vIERvZXMgc2VsZiByZXF1ZXN0IGhhdmUgYSBjb3JyZXNwb25kaW5nIGZvcm1hdHRlclxyXG5cdFx0XHRpZiAoby53cmFwICYmICgocC5wYXRoIGluIG8ud3JhcCkgfHwgKCdkZWZhdWx0JyBpbiBvLndyYXApKSkge1xyXG5cdFx0XHRcdHZhciB3cmFwID0gKHAucGF0aCBpbiBvLndyYXAgPyBwLnBhdGggOiAnZGVmYXVsdCcpO1xyXG5cdFx0XHRcdHZhciB0aW1lID0gKG5ldyBEYXRlKCkpLmdldFRpbWUoKTtcclxuXHJcblx0XHRcdFx0Ly8gRk9STUFUIFJFU1BPTlNFXHJcblx0XHRcdFx0dmFyIGIgPSBvLndyYXBbd3JhcF0ociwgaGVhZGVycywgcCk7XHJcblxyXG5cdFx0XHRcdC8vIEhhcyB0aGUgcmVzcG9uc2UgYmVlbiB1dHRlcmx5IG92ZXJ3cml0dGVuP1xyXG5cdFx0XHRcdC8vIFR5cGljYWxseSBzZWxmIGF1Z21lbnRzIHRoZSBleGlzdGluZyBvYmplY3QuLiBidXQgZm9yIHRob3NlIHJhcmUgb2NjYXNzaW9uc1xyXG5cdFx0XHRcdGlmIChiKSB7XHJcblx0XHRcdFx0XHRyID0gYjtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdC8vIElzIHRoZXJlIGEgbmV4dF9wYWdlIGRlZmluZWQgaW4gdGhlIHJlc3BvbnNlP1xyXG5cdFx0XHRpZiAociAmJiAncGFnaW5nJyBpbiByICYmIHIucGFnaW5nLm5leHQpIHtcclxuXHJcblx0XHRcdFx0Ly8gQWRkIHRoZSByZWxhdGl2ZSBwYXRoIGlmIGl0IGlzIG1pc3NpbmcgZnJvbSB0aGUgcGFnaW5nL25leHQgcGF0aFxyXG5cdFx0XHRcdGlmIChyLnBhZ2luZy5uZXh0WzBdID09PSAnPycpIHtcclxuXHRcdFx0XHRcdHIucGFnaW5nLm5leHQgPSBwLnBhdGggKyByLnBhZ2luZy5uZXh0O1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0Ly8gVGhlIHJlbGF0aXZlIHBhdGggaGFzIGJlZW4gZGVmaW5lZCwgbGV0cyBtYXJrdXAgdGhlIGhhbmRsZXIgaW4gdGhlIEhhc2hGcmFnbWVudFxyXG5cdFx0XHRcdGVsc2Uge1xyXG5cdFx0XHRcdFx0ci5wYWdpbmcubmV4dCArPSAnIycgKyBwLnBhdGg7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQvLyBEaXNwYXRjaCB0byBsaXN0ZW5lcnNcclxuXHRcdFx0Ly8gRW1pdCBldmVudHMgd2hpY2ggcGVydGFpbiB0byB0aGUgZm9ybWF0dGVkIHJlc3BvbnNlXHJcblx0XHRcdGlmICghciB8fCAnZXJyb3InIGluIHIpIHtcclxuXHRcdFx0XHRwcm9taXNlLnJlamVjdChyKTtcclxuXHRcdFx0fVxyXG5cdFx0XHRlbHNlIHtcclxuXHRcdFx0XHRwcm9taXNlLmZ1bGZpbGwocik7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cdH1cclxufTtcclxuXHJcbi8vIEFQSSB1dGlsaXRpZXNcclxuaGVsbG8udXRpbHMuZXh0ZW5kKGhlbGxvLnV0aWxzLCB7XHJcblxyXG5cdC8vIE1ha2UgYW4gSFRUUCByZXF1ZXN0XHJcblx0cmVxdWVzdDogZnVuY3Rpb24ocCwgY2FsbGJhY2spIHtcclxuXHJcblx0XHR2YXIgX3RoaXMgPSB0aGlzO1xyXG5cdFx0dmFyIGVycm9yID0gX3RoaXMuZXJyb3I7XHJcblxyXG5cdFx0Ly8gVGhpcyBoYXMgdG8gZ28gdGhyb3VnaCBhIFBPU1QgcmVxdWVzdFxyXG5cdFx0aWYgKCFfdGhpcy5pc0VtcHR5KHAuZGF0YSkgJiYgISgnRmlsZUxpc3QnIGluIHdpbmRvdykgJiYgX3RoaXMuaGFzQmluYXJ5KHAuZGF0YSkpIHtcclxuXHJcblx0XHRcdC8vIERpc2FibGUgWEhSIGFuZCBKU09OUFxyXG5cdFx0XHRwLnhociA9IGZhbHNlO1xyXG5cdFx0XHRwLmpzb25wID0gZmFsc2U7XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gQ2hlY2sgaWYgdGhlIGJyb3dzZXIgYW5kIHNlcnZpY2Ugc3VwcG9ydCBDT1JTXHJcblx0XHR2YXIgY29ycyA9IHRoaXMucmVxdWVzdF9jb3JzKGZ1bmN0aW9uKCkge1xyXG5cdFx0XHQvLyBJZiBpdCBkb2VzIHRoZW4gcnVuIHRoaXMuLi5cclxuXHRcdFx0cmV0dXJuICgocC54aHIgPT09IHVuZGVmaW5lZCkgfHwgKHAueGhyICYmICh0eXBlb2YgKHAueGhyKSAhPT0gJ2Z1bmN0aW9uJyB8fCBwLnhocihwLCBwLnF1ZXJ5KSkpKTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdGlmIChjb3JzKSB7XHJcblxyXG5cdFx0XHRmb3JtYXRVcmwocCwgZnVuY3Rpb24odXJsKSB7XHJcblxyXG5cdFx0XHRcdHZhciB4ID0gX3RoaXMueGhyKHAubWV0aG9kLCB1cmwsIHAuaGVhZGVycywgcC5kYXRhLCBjYWxsYmFjayk7XHJcblx0XHRcdFx0eC5vbnByb2dyZXNzID0gcC5vbnByb2dyZXNzIHx8IG51bGw7XHJcblxyXG5cdFx0XHRcdC8vIFdpbmRvd3MgUGhvbmUgZG9lcyBub3Qgc3VwcG9ydCB4aHIudXBsb2FkLCBzZWUgIzc0XHJcblx0XHRcdFx0Ly8gRmVhdHVyZSBkZXRlY3RcclxuXHRcdFx0XHRpZiAoeC51cGxvYWQgJiYgcC5vbnVwbG9hZHByb2dyZXNzKSB7XHJcblx0XHRcdFx0XHR4LnVwbG9hZC5vbnByb2dyZXNzID0gcC5vbnVwbG9hZHByb2dyZXNzO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cclxuXHRcdC8vIENsb25lIHRoZSBxdWVyeSBvYmplY3RcclxuXHRcdC8vIEVhY2ggcmVxdWVzdCBtb2RpZmllcyB0aGUgcXVlcnkgb2JqZWN0IGFuZCBuZWVkcyB0byBiZSB0YXJlZCBhZnRlciBlYWNoIG9uZS5cclxuXHRcdHZhciBfcXVlcnkgPSBwLnF1ZXJ5O1xyXG5cclxuXHRcdHAucXVlcnkgPSBfdGhpcy5jbG9uZShwLnF1ZXJ5KTtcclxuXHJcblx0XHQvLyBBc3NpZ24gYSBuZXcgY2FsbGJhY2tJRFxyXG5cdFx0cC5jYWxsYmFja0lEID0gX3RoaXMuZ2xvYmFsRXZlbnQoKTtcclxuXHJcblx0XHQvLyBKU09OUFxyXG5cdFx0aWYgKHAuanNvbnAgIT09IGZhbHNlKSB7XHJcblxyXG5cdFx0XHQvLyBDbG9uZSB0aGUgcXVlcnkgb2JqZWN0XHJcblx0XHRcdHAucXVlcnkuY2FsbGJhY2sgPSBwLmNhbGxiYWNrSUQ7XHJcblxyXG5cdFx0XHQvLyBJZiB0aGUgSlNPTlAgaXMgYSBmdW5jdGlvbiB0aGVuIHJ1biBpdFxyXG5cdFx0XHRpZiAodHlwZW9mIChwLmpzb25wKSA9PT0gJ2Z1bmN0aW9uJykge1xyXG5cdFx0XHRcdHAuanNvbnAocCwgcC5xdWVyeSk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdC8vIExldHMgdXNlIEpTT05QIGlmIHRoZSBtZXRob2QgaXMgJ2dldCdcclxuXHRcdFx0aWYgKHAubWV0aG9kID09PSAnZ2V0Jykge1xyXG5cclxuXHRcdFx0XHRmb3JtYXRVcmwocCwgZnVuY3Rpb24odXJsKSB7XHJcblx0XHRcdFx0XHRfdGhpcy5qc29ucCh1cmwsIGNhbGxiYWNrLCBwLmNhbGxiYWNrSUQsIHAudGltZW91dCk7XHJcblx0XHRcdFx0fSk7XHJcblxyXG5cdFx0XHRcdHJldHVybjtcclxuXHRcdFx0fVxyXG5cdFx0XHRlbHNlIHtcclxuXHRcdFx0XHQvLyBJdCdzIG5vdCBjb21wYXRpYmxlIHJlc2V0IHF1ZXJ5XHJcblx0XHRcdFx0cC5xdWVyeSA9IF9xdWVyeTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdH1cclxuXHJcblx0XHQvLyBPdGhlcndpc2Ugd2UncmUgb24gdG8gdGhlIG9sZCBzY2hvb2wsIGlmcmFtZSBoYWNrcyBhbmQgSlNPTlBcclxuXHRcdGlmIChwLmZvcm0gIT09IGZhbHNlKSB7XHJcblxyXG5cdFx0XHQvLyBBZGQgc29tZSBhZGRpdGlvbmFsIHF1ZXJ5IHBhcmFtZXRlcnMgdG8gdGhlIFVSTFxyXG5cdFx0XHQvLyBXZSdyZSBwcmV0dHkgc3R1ZmZlZCBpZiB0aGUgZW5kcG9pbnQgZG9lc24ndCBsaWtlIHRoZXNlXHJcblx0XHRcdHAucXVlcnkucmVkaXJlY3RfdXJpID0gcC5yZWRpcmVjdF91cmk7XHJcblx0XHRcdHAucXVlcnkuc3RhdGUgPSBKU09OLnN0cmluZ2lmeSh7Y2FsbGJhY2s6cC5jYWxsYmFja0lEfSk7XHJcblxyXG5cdFx0XHR2YXIgb3B0cztcclxuXHJcblx0XHRcdGlmICh0eXBlb2YgKHAuZm9ybSkgPT09ICdmdW5jdGlvbicpIHtcclxuXHJcblx0XHRcdFx0Ly8gRm9ybWF0IHRoZSByZXF1ZXN0XHJcblx0XHRcdFx0b3B0cyA9IHAuZm9ybShwLCBwLnF1ZXJ5KTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0aWYgKHAubWV0aG9kID09PSAncG9zdCcgJiYgb3B0cyAhPT0gZmFsc2UpIHtcclxuXHJcblx0XHRcdFx0Zm9ybWF0VXJsKHAsIGZ1bmN0aW9uKHVybCkge1xyXG5cdFx0XHRcdFx0X3RoaXMucG9zdCh1cmwsIHAuZGF0YSwgb3B0cywgY2FsbGJhY2ssIHAuY2FsbGJhY2tJRCwgcC50aW1lb3V0KTtcclxuXHRcdFx0XHR9KTtcclxuXHJcblx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gTm9uZSBvZiB0aGUgbWV0aG9kcyB3ZXJlIHN1Y2Nlc3NmdWwgdGhyb3cgYW4gZXJyb3JcclxuXHRcdGNhbGxiYWNrKGVycm9yKCdpbnZhbGlkX3JlcXVlc3QnLCAnVGhlcmUgd2FzIG5vIG1lY2hhbmlzbSBmb3IgaGFuZGxpbmcgdGhpcyByZXF1ZXN0JykpO1xyXG5cclxuXHRcdHJldHVybjtcclxuXHJcblx0XHQvLyBGb3JtYXQgVVJMXHJcblx0XHQvLyBDb25zdHJ1Y3RzIHRoZSByZXF1ZXN0IFVSTCwgb3B0aW9uYWxseSB3cmFwcyB0aGUgVVJMIHRocm91Z2ggYSBjYWxsIHRvIGEgcHJveHkgc2VydmVyXHJcblx0XHQvLyBSZXR1cm5zIHRoZSBmb3JtYXR0ZWQgVVJMXHJcblx0XHRmdW5jdGlvbiBmb3JtYXRVcmwocCwgY2FsbGJhY2spIHtcclxuXHJcblx0XHRcdC8vIEFyZSB3ZSBzaWduaW5nIHRoZSByZXF1ZXN0P1xyXG5cdFx0XHR2YXIgc2lnbjtcclxuXHJcblx0XHRcdC8vIE9BdXRoMVxyXG5cdFx0XHQvLyBSZW1vdmUgdGhlIHRva2VuIGZyb20gdGhlIHF1ZXJ5IGJlZm9yZSBzaWduaW5nXHJcblx0XHRcdGlmIChwLmF1dGhSZXNwb25zZSAmJiBwLmF1dGhSZXNwb25zZS5vYXV0aCAmJiBwYXJzZUludChwLmF1dGhSZXNwb25zZS5vYXV0aC52ZXJzaW9uLCAxMCkgPT09IDEpIHtcclxuXHJcblx0XHRcdFx0Ly8gT0FVVEggU0lHTklORyBQUk9YWVxyXG5cdFx0XHRcdHNpZ24gPSBwLnF1ZXJ5LmFjY2Vzc190b2tlbjtcclxuXHJcblx0XHRcdFx0Ly8gUmVtb3ZlIHRoZSBhY2Nlc3NfdG9rZW5cclxuXHRcdFx0XHRkZWxldGUgcC5xdWVyeS5hY2Nlc3NfdG9rZW47XHJcblxyXG5cdFx0XHRcdC8vIEVuZm9yZSB1c2Ugb2YgUHJveHlcclxuXHRcdFx0XHRwLnByb3h5ID0gdHJ1ZTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0Ly8gUE9TVCBib2R5IHRvIHF1ZXJ5c3RyaW5nXHJcblx0XHRcdGlmIChwLmRhdGEgJiYgKHAubWV0aG9kID09PSAnZ2V0JyB8fCBwLm1ldGhvZCA9PT0gJ2RlbGV0ZScpKSB7XHJcblx0XHRcdFx0Ly8gQXR0YWNoIHRoZSBwLmRhdGEgdG8gdGhlIHF1ZXJ5c3RyaW5nLlxyXG5cdFx0XHRcdF90aGlzLmV4dGVuZChwLnF1ZXJ5LCBwLmRhdGEpO1xyXG5cdFx0XHRcdHAuZGF0YSA9IG51bGw7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdC8vIENvbnN0cnVjdCB0aGUgcGF0aFxyXG5cdFx0XHR2YXIgcGF0aCA9IF90aGlzLnFzKHAudXJsLCBwLnF1ZXJ5KTtcclxuXHJcblx0XHRcdC8vIFByb3h5IHRoZSByZXF1ZXN0IHRocm91Z2ggYSBzZXJ2ZXJcclxuXHRcdFx0Ly8gVXNlZCBmb3Igc2lnbmluZyBPQXV0aDFcclxuXHRcdFx0Ly8gQW5kIGNpcmN1bXZlbnRpbmcgc2VydmljZXMgd2l0aG91dCBBY2Nlc3MtQ29udHJvbCBIZWFkZXJzXHJcblx0XHRcdGlmIChwLnByb3h5KSB7XHJcblx0XHRcdFx0Ly8gVXNlIHRoZSBwcm94eSBhcyBhIHBhdGhcclxuXHRcdFx0XHRwYXRoID0gX3RoaXMucXMocC5vYXV0aF9wcm94eSwge1xyXG5cdFx0XHRcdFx0cGF0aDogcGF0aCxcclxuXHRcdFx0XHRcdGFjY2Vzc190b2tlbjogc2lnbiB8fCAnJyxcclxuXHJcblx0XHRcdFx0XHQvLyBUaGlzIHdpbGwgcHJvbXB0IHRoZSByZXF1ZXN0IHRvIGJlIHNpZ25lZCBhcyB0aG91Z2ggaXQgaXMgT0F1dGgxXHJcblx0XHRcdFx0XHR0aGVuOiBwLnByb3h5X3Jlc3BvbnNlX3R5cGUgfHwgKHAubWV0aG9kLnRvTG93ZXJDYXNlKCkgPT09ICdnZXQnID8gJ3JlZGlyZWN0JyA6ICdwcm94eScpLFxyXG5cdFx0XHRcdFx0bWV0aG9kOiBwLm1ldGhvZC50b0xvd2VyQ2FzZSgpLFxyXG5cdFx0XHRcdFx0c3VwcHJlc3NfcmVzcG9uc2VfY29kZXM6IHRydWVcclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0Y2FsbGJhY2socGF0aCk7XHJcblx0XHR9XHJcblx0fSxcclxuXHJcblx0Ly8gVGVzdCB3aGV0aGVyIHRoZSBicm93c2VyIHN1cHBvcnRzIHRoZSBDT1JTIHJlc3BvbnNlXHJcblx0cmVxdWVzdF9jb3JzOiBmdW5jdGlvbihjYWxsYmFjaykge1xyXG5cdFx0cmV0dXJuICd3aXRoQ3JlZGVudGlhbHMnIGluIG5ldyBYTUxIdHRwUmVxdWVzdCgpICYmIGNhbGxiYWNrKCk7XHJcblx0fSxcclxuXHJcblx0Ly8gUmV0dXJuIHRoZSB0eXBlIG9mIERPTSBvYmplY3RcclxuXHRkb21JbnN0YW5jZTogZnVuY3Rpb24odHlwZSwgZGF0YSkge1xyXG5cdFx0dmFyIHRlc3QgPSAnSFRNTCcgKyAodHlwZSB8fCAnJykucmVwbGFjZShcclxuXHRcdFx0L15bYS16XS8sXHJcblx0XHRcdGZ1bmN0aW9uKG0pIHtcclxuXHRcdFx0XHRyZXR1cm4gbS50b1VwcGVyQ2FzZSgpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0KSArICdFbGVtZW50JztcclxuXHJcblx0XHRpZiAoIWRhdGEpIHtcclxuXHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmICh3aW5kb3dbdGVzdF0pIHtcclxuXHRcdFx0cmV0dXJuIGRhdGEgaW5zdGFuY2VvZiB3aW5kb3dbdGVzdF07XHJcblx0XHR9XHJcblx0XHRlbHNlIGlmICh3aW5kb3cuRWxlbWVudCkge1xyXG5cdFx0XHRyZXR1cm4gZGF0YSBpbnN0YW5jZW9mIHdpbmRvdy5FbGVtZW50ICYmICghdHlwZSB8fCAoZGF0YS50YWdOYW1lICYmIGRhdGEudGFnTmFtZS50b0xvd2VyQ2FzZSgpID09PSB0eXBlKSk7XHJcblx0XHR9XHJcblx0XHRlbHNlIHtcclxuXHRcdFx0cmV0dXJuICghKGRhdGEgaW5zdGFuY2VvZiBPYmplY3QgfHwgZGF0YSBpbnN0YW5jZW9mIEFycmF5IHx8IGRhdGEgaW5zdGFuY2VvZiBTdHJpbmcgfHwgZGF0YSBpbnN0YW5jZW9mIE51bWJlcikgJiYgZGF0YS50YWdOYW1lICYmIGRhdGEudGFnTmFtZS50b0xvd2VyQ2FzZSgpID09PSB0eXBlKTtcclxuXHRcdH1cclxuXHR9LFxyXG5cclxuXHQvLyBDcmVhdGUgYSBjbG9uZSBvZiBhbiBvYmplY3RcclxuXHRjbG9uZTogZnVuY3Rpb24ob2JqKSB7XHJcblx0XHQvLyBEb2VzIG5vdCBjbG9uZSBET00gZWxlbWVudHMsIG5vciBCaW5hcnkgZGF0YSwgZS5nLiBCbG9icywgRmlsZWxpc3RzXHJcblx0XHRpZiAob2JqID09PSBudWxsIHx8IHR5cGVvZiAob2JqKSAhPT0gJ29iamVjdCcgfHwgb2JqIGluc3RhbmNlb2YgRGF0ZSB8fCAnbm9kZU5hbWUnIGluIG9iaiB8fCB0aGlzLmlzQmluYXJ5KG9iaikgfHwgKHR5cGVvZiBGb3JtRGF0YSA9PT0gJ2Z1bmN0aW9uJyAmJiBvYmogaW5zdGFuY2VvZiBGb3JtRGF0YSkpIHtcclxuXHRcdFx0cmV0dXJuIG9iajtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAoQXJyYXkuaXNBcnJheShvYmopKSB7XHJcblx0XHRcdC8vIENsb25lIGVhY2ggaXRlbSBpbiB0aGUgYXJyYXlcclxuXHRcdFx0cmV0dXJuIG9iai5tYXAodGhpcy5jbG9uZS5iaW5kKHRoaXMpKTtcclxuXHRcdH1cclxuXHJcblx0XHQvLyBCdXQgZG9lcyBjbG9uZSBldmVyeXRoaW5nIGVsc2UuXHJcblx0XHR2YXIgY2xvbmUgPSB7fTtcclxuXHRcdGZvciAodmFyIHggaW4gb2JqKSB7XHJcblx0XHRcdGNsb25lW3hdID0gdGhpcy5jbG9uZShvYmpbeF0pO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBjbG9uZTtcclxuXHR9LFxyXG5cclxuXHQvLyBYSFI6IHVzZXMgQ09SUyB0byBtYWtlIHJlcXVlc3RzXHJcblx0eGhyOiBmdW5jdGlvbihtZXRob2QsIHVybCwgaGVhZGVycywgZGF0YSwgY2FsbGJhY2spIHtcclxuXHJcblx0XHR2YXIgciA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xyXG5cdFx0dmFyIGVycm9yID0gdGhpcy5lcnJvcjtcclxuXHJcblx0XHQvLyBCaW5hcnk/XHJcblx0XHR2YXIgYmluYXJ5ID0gZmFsc2U7XHJcblx0XHRpZiAobWV0aG9kID09PSAnYmxvYicpIHtcclxuXHRcdFx0YmluYXJ5ID0gbWV0aG9kO1xyXG5cdFx0XHRtZXRob2QgPSAnR0VUJztcclxuXHRcdH1cclxuXHJcblx0XHRtZXRob2QgPSBtZXRob2QudG9VcHBlckNhc2UoKTtcclxuXHJcblx0XHQvLyBYaHIucmVzcG9uc2VUeXBlICdqc29uJyBpcyBub3Qgc3VwcG9ydGVkIGluIGFueSBvZiB0aGUgdmVuZG9ycyB5ZXQuXHJcblx0XHRyLm9ubG9hZCA9IGZ1bmN0aW9uKGUpIHtcclxuXHRcdFx0dmFyIGpzb24gPSByLnJlc3BvbnNlO1xyXG5cdFx0XHR0cnkge1xyXG5cdFx0XHRcdGpzb24gPSBKU09OLnBhcnNlKHIucmVzcG9uc2VUZXh0KTtcclxuXHRcdFx0fVxyXG5cdFx0XHRjYXRjaCAoX2UpIHtcclxuXHRcdFx0XHRpZiAoci5zdGF0dXMgPT09IDQwMSkge1xyXG5cdFx0XHRcdFx0anNvbiA9IGVycm9yKCdhY2Nlc3NfZGVuaWVkJywgci5zdGF0dXNUZXh0KTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHZhciBoZWFkZXJzID0gaGVhZGVyc1RvSlNPTihyLmdldEFsbFJlc3BvbnNlSGVhZGVycygpKTtcclxuXHRcdFx0aGVhZGVycy5zdGF0dXNDb2RlID0gci5zdGF0dXM7XHJcblxyXG5cdFx0XHRjYWxsYmFjayhqc29uIHx8IChtZXRob2QgPT09ICdHRVQnID8gZXJyb3IoJ2VtcHR5X3Jlc3BvbnNlJywgJ0NvdWxkIG5vdCBnZXQgcmVzb3VyY2UnKSA6IHt9KSwgaGVhZGVycyk7XHJcblx0XHR9O1xyXG5cclxuXHRcdHIub25lcnJvciA9IGZ1bmN0aW9uKGUpIHtcclxuXHRcdFx0dmFyIGpzb24gPSByLnJlc3BvbnNlVGV4dDtcclxuXHRcdFx0dHJ5IHtcclxuXHRcdFx0XHRqc29uID0gSlNPTi5wYXJzZShyLnJlc3BvbnNlVGV4dCk7XHJcblx0XHRcdH1cclxuXHRcdFx0Y2F0Y2ggKF9lKSB7fVxyXG5cclxuXHRcdFx0Y2FsbGJhY2soanNvbiB8fCBlcnJvcignYWNjZXNzX2RlbmllZCcsICdDb3VsZCBub3QgZ2V0IHJlc291cmNlJykpO1xyXG5cdFx0fTtcclxuXHJcblx0XHR2YXIgeDtcclxuXHJcblx0XHQvLyBTaG91bGQgd2UgYWRkIHRoZSBxdWVyeSB0byB0aGUgVVJMP1xyXG5cdFx0aWYgKG1ldGhvZCA9PT0gJ0dFVCcgfHwgbWV0aG9kID09PSAnREVMRVRFJykge1xyXG5cdFx0XHRkYXRhID0gbnVsbDtcclxuXHRcdH1cclxuXHRcdGVsc2UgaWYgKGRhdGEgJiYgdHlwZW9mIChkYXRhKSAhPT0gJ3N0cmluZycgJiYgIShkYXRhIGluc3RhbmNlb2YgRm9ybURhdGEpICYmICEoZGF0YSBpbnN0YW5jZW9mIEZpbGUpICYmICEoZGF0YSBpbnN0YW5jZW9mIEJsb2IpKSB7XHJcblx0XHRcdC8vIExvb3AgdGhyb3VnaCBhbmQgYWRkIGZvcm1EYXRhXHJcblx0XHRcdHZhciBmID0gbmV3IEZvcm1EYXRhKCk7XHJcblx0XHRcdGZvciAoeCBpbiBkYXRhKSBpZiAoZGF0YS5oYXNPd25Qcm9wZXJ0eSh4KSkge1xyXG5cdFx0XHRcdGlmIChkYXRhW3hdIGluc3RhbmNlb2YgSFRNTElucHV0RWxlbWVudCkge1xyXG5cdFx0XHRcdFx0aWYgKCdmaWxlcycgaW4gZGF0YVt4XSAmJiBkYXRhW3hdLmZpbGVzLmxlbmd0aCA+IDApIHtcclxuXHRcdFx0XHRcdFx0Zi5hcHBlbmQoeCwgZGF0YVt4XS5maWxlc1swXSk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdGVsc2UgaWYgKGRhdGFbeF0gaW5zdGFuY2VvZiBCbG9iKSB7XHJcblx0XHRcdFx0XHRmLmFwcGVuZCh4LCBkYXRhW3hdLCBkYXRhLm5hbWUpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRlbHNlIHtcclxuXHRcdFx0XHRcdGYuYXBwZW5kKHgsIGRhdGFbeF0pO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0ZGF0YSA9IGY7XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gT3BlbiB0aGUgcGF0aCwgYXN5bmNcclxuXHRcdHIub3BlbihtZXRob2QsIHVybCwgdHJ1ZSk7XHJcblxyXG5cdFx0aWYgKGJpbmFyeSkge1xyXG5cdFx0XHRpZiAoJ3Jlc3BvbnNlVHlwZScgaW4gcikge1xyXG5cdFx0XHRcdHIucmVzcG9uc2VUeXBlID0gYmluYXJ5O1xyXG5cdFx0XHR9XHJcblx0XHRcdGVsc2Uge1xyXG5cdFx0XHRcdHIub3ZlcnJpZGVNaW1lVHlwZSgndGV4dC9wbGFpbjsgY2hhcnNldD14LXVzZXItZGVmaW5lZCcpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gU2V0IGFueSBiZXNwb2tlIGhlYWRlcnNcclxuXHRcdGlmIChoZWFkZXJzKSB7XHJcblx0XHRcdGZvciAoeCBpbiBoZWFkZXJzKSB7XHJcblx0XHRcdFx0ci5zZXRSZXF1ZXN0SGVhZGVyKHgsIGhlYWRlcnNbeF0pO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0ci5zZW5kKGRhdGEpO1xyXG5cclxuXHRcdHJldHVybiByO1xyXG5cclxuXHRcdC8vIEhlYWRlcnMgYXJlIHJldHVybmVkIGFzIGEgc3RyaW5nXHJcblx0XHRmdW5jdGlvbiBoZWFkZXJzVG9KU09OKHMpIHtcclxuXHRcdFx0dmFyIHIgPSB7fTtcclxuXHRcdFx0dmFyIHJlZyA9IC8oW2EtelxcLV0rKTpcXHM/KC4qKTs/L2dpO1xyXG5cdFx0XHR2YXIgbTtcclxuXHRcdFx0d2hpbGUgKChtID0gcmVnLmV4ZWMocykpKSB7XHJcblx0XHRcdFx0clttWzFdXSA9IG1bMl07XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHJldHVybiByO1xyXG5cdFx0fVxyXG5cdH0sXHJcblxyXG5cdC8vIEpTT05QXHJcblx0Ly8gSW5qZWN0cyBhIHNjcmlwdCB0YWcgaW50byB0aGUgRE9NIHRvIGJlIGV4ZWN1dGVkIGFuZCBhcHBlbmRzIGEgY2FsbGJhY2sgZnVuY3Rpb24gdG8gdGhlIHdpbmRvdyBvYmplY3RcclxuXHQvLyBAcGFyYW0gc3RyaW5nL2Z1bmN0aW9uIHBhdGhGdW5jIGVpdGhlciBhIHN0cmluZyBvZiB0aGUgVVJMIG9yIGEgY2FsbGJhY2sgZnVuY3Rpb24gcGF0aEZ1bmMocXVlcnlzdHJpbmdoYXNoLCBjb250aW51ZUZ1bmMpO1xyXG5cdC8vIEBwYXJhbSBmdW5jdGlvbiBjYWxsYmFjayBhIGZ1bmN0aW9uIHRvIGNhbGwgb24gY29tcGxldGlvbjtcclxuXHRqc29ucDogZnVuY3Rpb24odXJsLCBjYWxsYmFjaywgY2FsbGJhY2tJRCwgdGltZW91dCkge1xyXG5cclxuXHRcdHZhciBfdGhpcyA9IHRoaXM7XHJcblx0XHR2YXIgZXJyb3IgPSBfdGhpcy5lcnJvcjtcclxuXHJcblx0XHQvLyBDaGFuZ2UgdGhlIG5hbWUgb2YgdGhlIGNhbGxiYWNrXHJcblx0XHR2YXIgYm9vbCA9IDA7XHJcblx0XHR2YXIgaGVhZCA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdoZWFkJylbMF07XHJcblx0XHR2YXIgb3BlcmFGaXg7XHJcblx0XHR2YXIgcmVzdWx0ID0gZXJyb3IoJ3NlcnZlcl9lcnJvcicsICdzZXJ2ZXJfZXJyb3InKTtcclxuXHRcdHZhciBjYiA9IGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRpZiAoIShib29sKyspKSB7XHJcblx0XHRcdFx0d2luZG93LnNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0XHRjYWxsYmFjayhyZXN1bHQpO1xyXG5cdFx0XHRcdFx0aGVhZC5yZW1vdmVDaGlsZChzY3JpcHQpO1xyXG5cdFx0XHRcdH0sIDApO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0fTtcclxuXHJcblx0XHQvLyBBZGQgY2FsbGJhY2sgdG8gdGhlIHdpbmRvdyBvYmplY3RcclxuXHRcdGNhbGxiYWNrSUQgPSBfdGhpcy5nbG9iYWxFdmVudChmdW5jdGlvbihqc29uKSB7XHJcblx0XHRcdHJlc3VsdCA9IGpzb247XHJcblx0XHRcdHJldHVybiB0cnVlO1xyXG5cclxuXHRcdFx0Ly8gTWFyayBjYWxsYmFjayBhcyBkb25lXHJcblx0XHR9LCBjYWxsYmFja0lEKTtcclxuXHJcblx0XHQvLyBUaGUgVVJMIGlzIGEgZnVuY3Rpb24gZm9yIHNvbWUgY2FzZXMgYW5kIGFzIHN1Y2hcclxuXHRcdC8vIERldGVybWluZSBpdHMgdmFsdWUgd2l0aCBhIGNhbGxiYWNrIGNvbnRhaW5pbmcgdGhlIG5ldyBwYXJhbWV0ZXJzIG9mIHRoaXMgZnVuY3Rpb24uXHJcblx0XHR1cmwgPSB1cmwucmVwbGFjZShuZXcgUmVnRXhwKCc9XFxcXD8oJnwkKScpLCAnPScgKyBjYWxsYmFja0lEICsgJyQxJyk7XHJcblxyXG5cdFx0Ly8gQnVpbGQgc2NyaXB0IHRhZ1xyXG5cdFx0dmFyIHNjcmlwdCA9IF90aGlzLmFwcGVuZCgnc2NyaXB0Jywge1xyXG5cdFx0XHRpZDogY2FsbGJhY2tJRCxcclxuXHRcdFx0bmFtZTogY2FsbGJhY2tJRCxcclxuXHRcdFx0c3JjOiB1cmwsXHJcblx0XHRcdGFzeW5jOiB0cnVlLFxyXG5cdFx0XHRvbmxvYWQ6IGNiLFxyXG5cdFx0XHRvbmVycm9yOiBjYixcclxuXHRcdFx0b25yZWFkeXN0YXRlY2hhbmdlOiBmdW5jdGlvbigpIHtcclxuXHRcdFx0XHRpZiAoL2xvYWRlZHxjb21wbGV0ZS9pLnRlc3QodGhpcy5yZWFkeVN0YXRlKSkge1xyXG5cdFx0XHRcdFx0Y2IoKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cclxuXHRcdC8vIE9wZXJhIGZpeCBlcnJvclxyXG5cdFx0Ly8gUHJvYmxlbTogSWYgYW4gZXJyb3Igb2NjdXJzIHdpdGggc2NyaXB0IGxvYWRpbmcgT3BlcmEgZmFpbHMgdG8gdHJpZ2dlciB0aGUgc2NyaXB0Lm9uZXJyb3IgaGFuZGxlciB3ZSBzcGVjaWZpZWRcclxuXHRcdC8vXHJcblx0XHQvLyBGaXg6XHJcblx0XHQvLyBCeSBzZXR0aW5nIHRoZSByZXF1ZXN0IHRvIHN5bmNocm9ub3VzIHdlIGNhbiB0cmlnZ2VyIHRoZSBlcnJvciBoYW5kbGVyIHdoZW4gYWxsIGVsc2UgZmFpbHMuXHJcblx0XHQvLyBUaGlzIGFjdGlvbiB3aWxsIGJlIGlnbm9yZWQgaWYgd2UndmUgYWxyZWFkeSBjYWxsZWQgdGhlIGNhbGxiYWNrIGhhbmRsZXIgXCJjYlwiIHdpdGggYSBzdWNjZXNzZnVsIG9ubG9hZCBldmVudFxyXG5cdFx0aWYgKHdpbmRvdy5uYXZpZ2F0b3IudXNlckFnZW50LnRvTG93ZXJDYXNlKCkuaW5kZXhPZignb3BlcmEnKSA+IC0xKSB7XHJcblx0XHRcdG9wZXJhRml4ID0gX3RoaXMuYXBwZW5kKCdzY3JpcHQnLCB7XHJcblx0XHRcdFx0dGV4dDogJ2RvY3VtZW50LmdldEVsZW1lbnRCeUlkKFxcJycgKyBjYWxsYmFja0lEICsgJ1xcJykub25lcnJvcigpOydcclxuXHRcdFx0fSk7XHJcblx0XHRcdHNjcmlwdC5hc3luYyA9IGZhbHNlO1xyXG5cdFx0fVxyXG5cclxuXHRcdC8vIEFkZCB0aW1lb3V0XHJcblx0XHRpZiAodGltZW91dCkge1xyXG5cdFx0XHR3aW5kb3cuc2V0VGltZW91dChmdW5jdGlvbigpIHtcclxuXHRcdFx0XHRyZXN1bHQgPSBlcnJvcigndGltZW91dCcsICd0aW1lb3V0Jyk7XHJcblx0XHRcdFx0Y2IoKTtcclxuXHRcdFx0fSwgdGltZW91dCk7XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gVE9ETzogYWRkIGZpeCBmb3IgSUUsXHJcblx0XHQvLyBIb3dldmVyOiB1bmFibGUgcmVjcmVhdGUgdGhlIGJ1ZyBvZiBmaXJpbmcgb2ZmIHRoZSBvbnJlYWR5c3RhdGVjaGFuZ2UgYmVmb3JlIHRoZSBzY3JpcHQgY29udGVudCBoYXMgYmVlbiBleGVjdXRlZCBhbmQgdGhlIHZhbHVlIG9mIFwicmVzdWx0XCIgaGFzIGJlZW4gZGVmaW5lZC5cclxuXHRcdC8vIEluamVjdCBzY3JpcHQgdGFnIGludG8gdGhlIGhlYWQgZWxlbWVudFxyXG5cdFx0aGVhZC5hcHBlbmRDaGlsZChzY3JpcHQpO1xyXG5cclxuXHRcdC8vIEFwcGVuZCBPcGVyYSBGaXggdG8gcnVuIGFmdGVyIG91ciBzY3JpcHRcclxuXHRcdGlmIChvcGVyYUZpeCkge1xyXG5cdFx0XHRoZWFkLmFwcGVuZENoaWxkKG9wZXJhRml4KTtcclxuXHRcdH1cclxuXHR9LFxyXG5cclxuXHQvLyBQb3N0XHJcblx0Ly8gU2VuZCBpbmZvcm1hdGlvbiB0byBhIHJlbW90ZSBsb2NhdGlvbiB1c2luZyB0aGUgcG9zdCBtZWNoYW5pc21cclxuXHQvLyBAcGFyYW0gc3RyaW5nIHVyaSBwYXRoXHJcblx0Ly8gQHBhcmFtIG9iamVjdCBkYXRhLCBrZXkgdmFsdWUgZGF0YSB0byBzZW5kXHJcblx0Ly8gQHBhcmFtIGZ1bmN0aW9uIGNhbGxiYWNrLCBmdW5jdGlvbiB0byBleGVjdXRlIGluIHJlc3BvbnNlXHJcblx0cG9zdDogZnVuY3Rpb24odXJsLCBkYXRhLCBvcHRpb25zLCBjYWxsYmFjaywgY2FsbGJhY2tJRCwgdGltZW91dCkge1xyXG5cclxuXHRcdHZhciBfdGhpcyA9IHRoaXM7XHJcblx0XHR2YXIgZXJyb3IgPSBfdGhpcy5lcnJvcjtcclxuXHRcdHZhciBkb2MgPSBkb2N1bWVudDtcclxuXHJcblx0XHQvLyBUaGlzIGhhY2sgbmVlZHMgYSBmb3JtXHJcblx0XHR2YXIgZm9ybSA9IG51bGw7XHJcblx0XHR2YXIgcmVlbmFibGVBZnRlclN1Ym1pdCA9IFtdO1xyXG5cdFx0dmFyIG5ld2Zvcm07XHJcblx0XHR2YXIgaSA9IDA7XHJcblx0XHR2YXIgeCA9IG51bGw7XHJcblx0XHR2YXIgYm9vbCA9IDA7XHJcblx0XHR2YXIgY2IgPSBmdW5jdGlvbihyKSB7XHJcblx0XHRcdGlmICghKGJvb2wrKykpIHtcclxuXHRcdFx0XHRjYWxsYmFjayhyKTtcclxuXHRcdFx0fVxyXG5cdFx0fTtcclxuXHJcblx0XHQvLyBXaGF0IGlzIHRoZSBuYW1lIG9mIHRoZSBjYWxsYmFjayB0byBjb250YWluXHJcblx0XHQvLyBXZSdsbCBhbHNvIHVzZSB0aGlzIHRvIG5hbWUgdGhlIGlmcmFtZVxyXG5cdFx0X3RoaXMuZ2xvYmFsRXZlbnQoY2IsIGNhbGxiYWNrSUQpO1xyXG5cclxuXHRcdC8vIEJ1aWxkIHRoZSBpZnJhbWUgd2luZG93XHJcblx0XHR2YXIgd2luO1xyXG5cdFx0dHJ5IHtcclxuXHRcdFx0Ly8gSUU3IGhhY2ssIG9ubHkgbGV0cyB1cyBkZWZpbmUgdGhlIG5hbWUgaGVyZSwgbm90IGxhdGVyLlxyXG5cdFx0XHR3aW4gPSBkb2MuY3JlYXRlRWxlbWVudCgnPGlmcmFtZSBuYW1lPVwiJyArIGNhbGxiYWNrSUQgKyAnXCI+Jyk7XHJcblx0XHR9XHJcblx0XHRjYXRjaCAoZSkge1xyXG5cdFx0XHR3aW4gPSBkb2MuY3JlYXRlRWxlbWVudCgnaWZyYW1lJyk7XHJcblx0XHR9XHJcblxyXG5cdFx0d2luLm5hbWUgPSBjYWxsYmFja0lEO1xyXG5cdFx0d2luLmlkID0gY2FsbGJhY2tJRDtcclxuXHRcdHdpbi5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG5cclxuXHRcdC8vIE92ZXJyaWRlIGNhbGxiYWNrIG1lY2hhbmlzbS4gVHJpZ2dnZXIgYSByZXNwb25zZSBvbmxvYWQvb25lcnJvclxyXG5cdFx0aWYgKG9wdGlvbnMgJiYgb3B0aW9ucy5jYWxsYmFja29ubG9hZCkge1xyXG5cdFx0XHQvLyBPbmxvYWQgaXMgYmVpbmcgZmlyZWQgdHdpY2VcclxuXHRcdFx0d2luLm9ubG9hZCA9IGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdGNiKHtcclxuXHRcdFx0XHRcdHJlc3BvbnNlOiAncG9zdGVkJyxcclxuXHRcdFx0XHRcdG1lc3NhZ2U6ICdDb250ZW50IHdhcyBwb3N0ZWQnXHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdH07XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKHRpbWVvdXQpIHtcclxuXHRcdFx0c2V0VGltZW91dChmdW5jdGlvbigpIHtcclxuXHRcdFx0XHRjYihlcnJvcigndGltZW91dCcsICdUaGUgcG9zdCBvcGVyYXRpb24gdGltZWQgb3V0JykpO1xyXG5cdFx0XHR9LCB0aW1lb3V0KTtcclxuXHRcdH1cclxuXHJcblx0XHRkb2MuYm9keS5hcHBlbmRDaGlsZCh3aW4pO1xyXG5cclxuXHRcdC8vIElmIHdlIGFyZSBqdXN0IHBvc3RpbmcgYSBzaW5nbGUgaXRlbVxyXG5cdFx0aWYgKF90aGlzLmRvbUluc3RhbmNlKCdmb3JtJywgZGF0YSkpIHtcclxuXHRcdFx0Ly8gR2V0IHRoZSBwYXJlbnQgZm9ybVxyXG5cdFx0XHRmb3JtID0gZGF0YS5mb3JtO1xyXG5cclxuXHRcdFx0Ly8gTG9vcCB0aHJvdWdoIGFuZCBkaXNhYmxlIGFsbCBvZiBpdHMgc2libGluZ3NcclxuXHRcdFx0Zm9yIChpID0gMDsgaSA8IGZvcm0uZWxlbWVudHMubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0XHRpZiAoZm9ybS5lbGVtZW50c1tpXSAhPT0gZGF0YSkge1xyXG5cdFx0XHRcdFx0Zm9ybS5lbGVtZW50c1tpXS5zZXRBdHRyaWJ1dGUoJ2Rpc2FibGVkJywgdHJ1ZSk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQvLyBNb3ZlIHRoZSBmb2N1cyB0byB0aGUgZm9ybVxyXG5cdFx0XHRkYXRhID0gZm9ybTtcclxuXHRcdH1cclxuXHJcblx0XHQvLyBQb3N0aW5nIGEgZm9ybVxyXG5cdFx0aWYgKF90aGlzLmRvbUluc3RhbmNlKCdmb3JtJywgZGF0YSkpIHtcclxuXHRcdFx0Ly8gVGhpcyBpcyBhIGZvcm0gZWxlbWVudFxyXG5cdFx0XHRmb3JtID0gZGF0YTtcclxuXHJcblx0XHRcdC8vIERvZXMgdGhpcyBmb3JtIG5lZWQgdG8gYmUgYSBtdWx0aXBhcnQgZm9ybT9cclxuXHRcdFx0Zm9yIChpID0gMDsgaSA8IGZvcm0uZWxlbWVudHMubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0XHRpZiAoIWZvcm0uZWxlbWVudHNbaV0uZGlzYWJsZWQgJiYgZm9ybS5lbGVtZW50c1tpXS50eXBlID09PSAnZmlsZScpIHtcclxuXHRcdFx0XHRcdGZvcm0uZW5jb2RpbmcgPSBmb3JtLmVuY3R5cGUgPSAnbXVsdGlwYXJ0L2Zvcm0tZGF0YSc7XHJcblx0XHRcdFx0XHRmb3JtLmVsZW1lbnRzW2ldLnNldEF0dHJpYnV0ZSgnbmFtZScsICdmaWxlJyk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHRlbHNlIHtcclxuXHRcdFx0Ly8gSXRzIG5vdCBhIGZvcm0gZWxlbWVudCxcclxuXHRcdFx0Ly8gVGhlcmVmb3JlIGl0IG11c3QgYmUgYSBKU09OIG9iamVjdCBvZiBLZXk9PlZhbHVlIG9yIEtleT0+RWxlbWVudFxyXG5cdFx0XHQvLyBJZiBhbnlvbmUgb2YgdGhvc2UgdmFsdWVzIGFyZSBhIGlucHV0IHR5cGU9ZmlsZSB3ZSBzaGFsbCBzaGFsbCBpbnNlcnQgaXRzIHNpYmxpbmdzIGludG8gdGhlIGZvcm0gZm9yIHdoaWNoIGl0IGJlbG9uZ3MuXHJcblx0XHRcdGZvciAoeCBpbiBkYXRhKSBpZiAoZGF0YS5oYXNPd25Qcm9wZXJ0eSh4KSkge1xyXG5cdFx0XHRcdC8vIElzIHRoaXMgYW4gaW5wdXQgRWxlbWVudD9cclxuXHRcdFx0XHRpZiAoX3RoaXMuZG9tSW5zdGFuY2UoJ2lucHV0JywgZGF0YVt4XSkgJiYgZGF0YVt4XS50eXBlID09PSAnZmlsZScpIHtcclxuXHRcdFx0XHRcdGZvcm0gPSBkYXRhW3hdLmZvcm07XHJcblx0XHRcdFx0XHRmb3JtLmVuY29kaW5nID0gZm9ybS5lbmN0eXBlID0gJ211bHRpcGFydC9mb3JtLWRhdGEnO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0Ly8gRG8gSWYgdGhlcmUgaXMgbm8gZGVmaW5lZCBmb3JtIGVsZW1lbnQsIGxldHMgY3JlYXRlIG9uZS5cclxuXHRcdFx0aWYgKCFmb3JtKSB7XHJcblx0XHRcdFx0Ly8gQnVpbGQgZm9ybVxyXG5cdFx0XHRcdGZvcm0gPSBkb2MuY3JlYXRlRWxlbWVudCgnZm9ybScpO1xyXG5cdFx0XHRcdGRvYy5ib2R5LmFwcGVuZENoaWxkKGZvcm0pO1xyXG5cdFx0XHRcdG5ld2Zvcm0gPSBmb3JtO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHR2YXIgaW5wdXQ7XHJcblxyXG5cdFx0XHQvLyBBZGQgZWxlbWVudHMgdG8gdGhlIGZvcm0gaWYgdGhleSBkb250IGV4aXN0XHJcblx0XHRcdGZvciAoeCBpbiBkYXRhKSBpZiAoZGF0YS5oYXNPd25Qcm9wZXJ0eSh4KSkge1xyXG5cclxuXHRcdFx0XHQvLyBJcyB0aGlzIGFuIGVsZW1lbnQ/XHJcblx0XHRcdFx0dmFyIGVsID0gKF90aGlzLmRvbUluc3RhbmNlKCdpbnB1dCcsIGRhdGFbeF0pIHx8IF90aGlzLmRvbUluc3RhbmNlKCd0ZXh0QXJlYScsIGRhdGFbeF0pIHx8IF90aGlzLmRvbUluc3RhbmNlKCdzZWxlY3QnLCBkYXRhW3hdKSk7XHJcblxyXG5cdFx0XHRcdC8vIElzIHRoaXMgbm90IGFuIGlucHV0IGVsZW1lbnQsIG9yIG9uZSB0aGF0IGV4aXN0cyBvdXRzaWRlIHRoZSBmb3JtLlxyXG5cdFx0XHRcdGlmICghZWwgfHwgZGF0YVt4XS5mb3JtICE9PSBmb3JtKSB7XHJcblxyXG5cdFx0XHRcdFx0Ly8gRG9lcyBhbiBlbGVtZW50IGhhdmUgdGhlIHNhbWUgbmFtZT9cclxuXHRcdFx0XHRcdHZhciBpbnB1dHMgPSBmb3JtLmVsZW1lbnRzW3hdO1xyXG5cdFx0XHRcdFx0aWYgKGlucHV0KSB7XHJcblx0XHRcdFx0XHRcdC8vIFJlbW92ZSBpdC5cclxuXHRcdFx0XHRcdFx0aWYgKCEoaW5wdXRzIGluc3RhbmNlb2YgTm9kZUxpc3QpKSB7XHJcblx0XHRcdFx0XHRcdFx0aW5wdXRzID0gW2lucHV0c107XHJcblx0XHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHRcdGZvciAoaSA9IDA7IGkgPCBpbnB1dHMubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0XHRcdFx0XHRpbnB1dHNbaV0ucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChpbnB1dHNbaV0pO1xyXG5cdFx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdC8vIENyZWF0ZSBhbiBpbnB1dCBlbGVtZW50XHJcblx0XHRcdFx0XHRpbnB1dCA9IGRvYy5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xyXG5cdFx0XHRcdFx0aW5wdXQuc2V0QXR0cmlidXRlKCd0eXBlJywgJ2hpZGRlbicpO1xyXG5cdFx0XHRcdFx0aW5wdXQuc2V0QXR0cmlidXRlKCduYW1lJywgeCk7XHJcblxyXG5cdFx0XHRcdFx0Ly8gRG9lcyBpdCBoYXZlIGEgdmFsdWUgYXR0cmlidXRlP1xyXG5cdFx0XHRcdFx0aWYgKGVsKSB7XHJcblx0XHRcdFx0XHRcdGlucHV0LnZhbHVlID0gZGF0YVt4XS52YWx1ZTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdGVsc2UgaWYgKF90aGlzLmRvbUluc3RhbmNlKG51bGwsIGRhdGFbeF0pKSB7XHJcblx0XHRcdFx0XHRcdGlucHV0LnZhbHVlID0gZGF0YVt4XS5pbm5lckhUTUwgfHwgZGF0YVt4XS5pbm5lclRleHQ7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRlbHNlIHtcclxuXHRcdFx0XHRcdFx0aW5wdXQudmFsdWUgPSBkYXRhW3hdO1xyXG5cdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdGZvcm0uYXBwZW5kQ2hpbGQoaW5wdXQpO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0Ly8gSXQgaXMgYW4gZWxlbWVudCwgd2hpY2ggZXhpc3RzIHdpdGhpbiB0aGUgZm9ybSwgYnV0IHRoZSBuYW1lIGlzIHdyb25nXHJcblx0XHRcdFx0ZWxzZSBpZiAoZWwgJiYgZGF0YVt4XS5uYW1lICE9PSB4KSB7XHJcblx0XHRcdFx0XHRkYXRhW3hdLnNldEF0dHJpYnV0ZSgnbmFtZScsIHgpO1xyXG5cdFx0XHRcdFx0ZGF0YVt4XS5uYW1lID0geDtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdC8vIERpc2FibGUgZWxlbWVudHMgZnJvbSB3aXRoaW4gdGhlIGZvcm0gaWYgdGhleSB3ZXJlbid0IHNwZWNpZmllZFxyXG5cdFx0XHRmb3IgKGkgPSAwOyBpIDwgZm9ybS5lbGVtZW50cy5sZW5ndGg7IGkrKykge1xyXG5cclxuXHRcdFx0XHRpbnB1dCA9IGZvcm0uZWxlbWVudHNbaV07XHJcblxyXG5cdFx0XHRcdC8vIERvZXMgdGhlIHNhbWUgbmFtZSBhbmQgdmFsdWUgZXhpc3QgaW4gdGhlIHBhcmVudFxyXG5cdFx0XHRcdGlmICghKGlucHV0Lm5hbWUgaW4gZGF0YSkgJiYgaW5wdXQuZ2V0QXR0cmlidXRlKCdkaXNhYmxlZCcpICE9PSB0cnVlKSB7XHJcblx0XHRcdFx0XHQvLyBEaXNhYmxlXHJcblx0XHRcdFx0XHRpbnB1dC5zZXRBdHRyaWJ1dGUoJ2Rpc2FibGVkJywgdHJ1ZSk7XHJcblxyXG5cdFx0XHRcdFx0Ly8gQWRkIHJlLWVuYWJsZSB0byBjYWxsYmFja1xyXG5cdFx0XHRcdFx0cmVlbmFibGVBZnRlclN1Ym1pdC5wdXNoKGlucHV0KTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHQvLyBTZXQgdGhlIHRhcmdldCBvZiB0aGUgZm9ybVxyXG5cdFx0Zm9ybS5zZXRBdHRyaWJ1dGUoJ21ldGhvZCcsICdQT1NUJyk7XHJcblx0XHRmb3JtLnNldEF0dHJpYnV0ZSgndGFyZ2V0JywgY2FsbGJhY2tJRCk7XHJcblx0XHRmb3JtLnRhcmdldCA9IGNhbGxiYWNrSUQ7XHJcblxyXG5cdFx0Ly8gVXBkYXRlIHRoZSBmb3JtIFVSTFxyXG5cdFx0Zm9ybS5zZXRBdHRyaWJ1dGUoJ2FjdGlvbicsIHVybCk7XHJcblxyXG5cdFx0Ly8gU3VibWl0IHRoZSBmb3JtXHJcblx0XHQvLyBTb21lIHJlYXNvbiB0aGlzIG5lZWRzIHRvIGJlIG9mZnNldCBmcm9tIHRoZSBjdXJyZW50IHdpbmRvdyBleGVjdXRpb25cclxuXHRcdHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcblx0XHRcdGZvcm0uc3VibWl0KCk7XHJcblxyXG5cdFx0XHRzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdHRyeSB7XHJcblx0XHRcdFx0XHQvLyBSZW1vdmUgdGhlIGlmcmFtZSBmcm9tIHRoZSBwYWdlLlxyXG5cdFx0XHRcdFx0Ly93aW4ucGFyZW50Tm9kZS5yZW1vdmVDaGlsZCh3aW4pO1xyXG5cdFx0XHRcdFx0Ly8gUmVtb3ZlIHRoZSBmb3JtXHJcblx0XHRcdFx0XHRpZiAobmV3Zm9ybSkge1xyXG5cdFx0XHRcdFx0XHRuZXdmb3JtLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQobmV3Zm9ybSk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdGNhdGNoIChlKSB7XHJcblx0XHRcdFx0XHR0cnkge1xyXG5cdFx0XHRcdFx0XHRjb25zb2xlLmVycm9yKCdIZWxsb0pTOiBjb3VsZCBub3QgcmVtb3ZlIGlmcmFtZScpO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0Y2F0Y2ggKGVlKSB7fVxyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0Ly8gUmVlbmFibGUgdGhlIGRpc2FibGVkIGZvcm1cclxuXHRcdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IHJlZW5hYmxlQWZ0ZXJTdWJtaXQubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0XHRcdGlmIChyZWVuYWJsZUFmdGVyU3VibWl0W2ldKSB7XHJcblx0XHRcdFx0XHRcdHJlZW5hYmxlQWZ0ZXJTdWJtaXRbaV0uc2V0QXR0cmlidXRlKCdkaXNhYmxlZCcsIGZhbHNlKTtcclxuXHRcdFx0XHRcdFx0cmVlbmFibGVBZnRlclN1Ym1pdFtpXS5kaXNhYmxlZCA9IGZhbHNlO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSwgMCk7XHJcblx0XHR9LCAxMDApO1xyXG5cdH0sXHJcblxyXG5cdC8vIFNvbWUgb2YgdGhlIHByb3ZpZGVycyByZXF1aXJlIHRoYXQgb25seSBtdWx0aXBhcnQgaXMgdXNlZCB3aXRoIG5vbi1iaW5hcnkgZm9ybXMuXHJcblx0Ly8gVGhpcyBmdW5jdGlvbiBjaGVja3Mgd2hldGhlciB0aGUgZm9ybSBjb250YWlucyBiaW5hcnkgZGF0YVxyXG5cdGhhc0JpbmFyeTogZnVuY3Rpb24oZGF0YSkge1xyXG5cdFx0Zm9yICh2YXIgeCBpbiBkYXRhKSBpZiAoZGF0YS5oYXNPd25Qcm9wZXJ0eSh4KSkge1xyXG5cdFx0XHRpZiAodGhpcy5pc0JpbmFyeShkYXRhW3hdKSkge1xyXG5cdFx0XHRcdHJldHVybiB0cnVlO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIGZhbHNlO1xyXG5cdH0sXHJcblxyXG5cdC8vIERldGVybWluZXMgaWYgYSB2YXJpYWJsZSBFaXRoZXIgSXMgb3IgbGlrZSBhIEZvcm1JbnB1dCBoYXMgdGhlIHZhbHVlIG9mIGEgQmxvYlxyXG5cclxuXHRpc0JpbmFyeTogZnVuY3Rpb24oZGF0YSkge1xyXG5cclxuXHRcdHJldHVybiBkYXRhIGluc3RhbmNlb2YgT2JqZWN0ICYmIChcclxuXHRcdCh0aGlzLmRvbUluc3RhbmNlKCdpbnB1dCcsIGRhdGEpICYmIGRhdGEudHlwZSA9PT0gJ2ZpbGUnKSB8fFxyXG5cdFx0KCdGaWxlTGlzdCcgaW4gd2luZG93ICYmIGRhdGEgaW5zdGFuY2VvZiB3aW5kb3cuRmlsZUxpc3QpIHx8XHJcblx0XHQoJ0ZpbGUnIGluIHdpbmRvdyAmJiBkYXRhIGluc3RhbmNlb2Ygd2luZG93LkZpbGUpIHx8XHJcblx0XHQoJ0Jsb2InIGluIHdpbmRvdyAmJiBkYXRhIGluc3RhbmNlb2Ygd2luZG93LkJsb2IpKTtcclxuXHJcblx0fSxcclxuXHJcblx0Ly8gQ29udmVydCBEYXRhLVVSSSB0byBCbG9iIHN0cmluZ1xyXG5cdHRvQmxvYjogZnVuY3Rpb24oZGF0YVVSSSkge1xyXG5cdFx0dmFyIHJlZyA9IC9eZGF0YVxcOihbXjssXSsoXFw7Y2hhcnNldD1bXjssXSspPykoXFw7YmFzZTY0KT8sL2k7XHJcblx0XHR2YXIgbSA9IGRhdGFVUkkubWF0Y2gocmVnKTtcclxuXHRcdGlmICghbSkge1xyXG5cdFx0XHRyZXR1cm4gZGF0YVVSSTtcclxuXHRcdH1cclxuXHJcblx0XHR2YXIgYmluYXJ5ID0gYXRvYihkYXRhVVJJLnJlcGxhY2UocmVnLCAnJykpO1xyXG5cdFx0dmFyIGFycmF5ID0gW107XHJcblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGJpbmFyeS5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHRhcnJheS5wdXNoKGJpbmFyeS5jaGFyQ29kZUF0KGkpKTtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gbmV3IEJsb2IoW25ldyBVaW50OEFycmF5KGFycmF5KV0sIHt0eXBlOiBtWzFdfSk7XHJcblx0fVxyXG5cclxufSk7XHJcblxyXG4vLyBFWFRSQTogQ29udmVydCBGb3JtRWxlbWVudCB0byBKU09OIGZvciBQT1NUaW5nXHJcbi8vIFdyYXBwZXJzIHRvIGFkZCBhZGRpdGlvbmFsIGZ1bmN0aW9uYWxpdHkgdG8gZXhpc3RpbmcgZnVuY3Rpb25zXHJcbihmdW5jdGlvbihoZWxsbykge1xyXG5cclxuXHQvLyBDb3B5IG9yaWdpbmFsIGZ1bmN0aW9uXHJcblx0dmFyIGFwaSA9IGhlbGxvLmFwaTtcclxuXHR2YXIgdXRpbHMgPSBoZWxsby51dGlscztcclxuXHJcblx0dXRpbHMuZXh0ZW5kKHV0aWxzLCB7XHJcblxyXG5cdFx0Ly8gRGF0YVRvSlNPTlxyXG5cdFx0Ly8gVGhpcyB0YWtlcyBhIEZvcm1FbGVtZW50fE5vZGVMaXN0fElucHV0RWxlbWVudHxNaXhlZE9iamVjdHMgYW5kIGNvbnZlcnMgdGhlIGRhdGEgb2JqZWN0IHRvIEpTT04uXHJcblx0XHRkYXRhVG9KU09OOiBmdW5jdGlvbihwKSB7XHJcblxyXG5cdFx0XHR2YXIgX3RoaXMgPSB0aGlzO1xyXG5cdFx0XHR2YXIgdyA9IHdpbmRvdztcclxuXHRcdFx0dmFyIGRhdGEgPSBwLmRhdGE7XHJcblxyXG5cdFx0XHQvLyBJcyBkYXRhIGEgZm9ybSBvYmplY3RcclxuXHRcdFx0aWYgKF90aGlzLmRvbUluc3RhbmNlKCdmb3JtJywgZGF0YSkpIHtcclxuXHRcdFx0XHRkYXRhID0gX3RoaXMubm9kZUxpc3RUb0pTT04oZGF0YS5lbGVtZW50cyk7XHJcblx0XHRcdH1cclxuXHRcdFx0ZWxzZSBpZiAoJ05vZGVMaXN0JyBpbiB3ICYmIGRhdGEgaW5zdGFuY2VvZiBOb2RlTGlzdCkge1xyXG5cdFx0XHRcdGRhdGEgPSBfdGhpcy5ub2RlTGlzdFRvSlNPTihkYXRhKTtcclxuXHRcdFx0fVxyXG5cdFx0XHRlbHNlIGlmIChfdGhpcy5kb21JbnN0YW5jZSgnaW5wdXQnLCBkYXRhKSkge1xyXG5cdFx0XHRcdGRhdGEgPSBfdGhpcy5ub2RlTGlzdFRvSlNPTihbZGF0YV0pO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQvLyBJcyBkYXRhIGEgYmxvYiwgRmlsZSwgRmlsZUxpc3Q/XHJcblx0XHRcdGlmICgoJ0ZpbGUnIGluIHcgJiYgZGF0YSBpbnN0YW5jZW9mIHcuRmlsZSkgfHxcclxuXHRcdFx0XHQoJ0Jsb2InIGluIHcgJiYgZGF0YSBpbnN0YW5jZW9mIHcuQmxvYikgfHxcclxuXHRcdFx0XHQoJ0ZpbGVMaXN0JyBpbiB3ICYmIGRhdGEgaW5zdGFuY2VvZiB3LkZpbGVMaXN0KSkge1xyXG5cdFx0XHRcdGRhdGEgPSB7ZmlsZTogZGF0YX07XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdC8vIExvb3AgdGhyb3VnaCBkYXRhIGlmIGl0J3Mgbm90IGZvcm0gZGF0YSBpdCBtdXN0IG5vdyBiZSBhIEpTT04gb2JqZWN0XHJcblx0XHRcdGlmICghKCdGb3JtRGF0YScgaW4gdyAmJiBkYXRhIGluc3RhbmNlb2Ygdy5Gb3JtRGF0YSkpIHtcclxuXHJcblx0XHRcdFx0Zm9yICh2YXIgeCBpbiBkYXRhKSBpZiAoZGF0YS5oYXNPd25Qcm9wZXJ0eSh4KSkge1xyXG5cclxuXHRcdFx0XHRcdGlmICgnRmlsZUxpc3QnIGluIHcgJiYgZGF0YVt4XSBpbnN0YW5jZW9mIHcuRmlsZUxpc3QpIHtcclxuXHRcdFx0XHRcdFx0aWYgKGRhdGFbeF0ubGVuZ3RoID09PSAxKSB7XHJcblx0XHRcdFx0XHRcdFx0ZGF0YVt4XSA9IGRhdGFbeF1bMF07XHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdGVsc2UgaWYgKF90aGlzLmRvbUluc3RhbmNlKCdpbnB1dCcsIGRhdGFbeF0pICYmIGRhdGFbeF0udHlwZSA9PT0gJ2ZpbGUnKSB7XHJcblx0XHRcdFx0XHRcdGNvbnRpbnVlO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0ZWxzZSBpZiAoX3RoaXMuZG9tSW5zdGFuY2UoJ2lucHV0JywgZGF0YVt4XSkgfHxcclxuXHRcdFx0XHRcdFx0X3RoaXMuZG9tSW5zdGFuY2UoJ3NlbGVjdCcsIGRhdGFbeF0pIHx8XHJcblx0XHRcdFx0XHRcdF90aGlzLmRvbUluc3RhbmNlKCd0ZXh0QXJlYScsIGRhdGFbeF0pKSB7XHJcblx0XHRcdFx0XHRcdGRhdGFbeF0gPSBkYXRhW3hdLnZhbHVlO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0ZWxzZSBpZiAoX3RoaXMuZG9tSW5zdGFuY2UobnVsbCwgZGF0YVt4XSkpIHtcclxuXHRcdFx0XHRcdFx0ZGF0YVt4XSA9IGRhdGFbeF0uaW5uZXJIVE1MIHx8IGRhdGFbeF0uaW5uZXJUZXh0O1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0cC5kYXRhID0gZGF0YTtcclxuXHRcdFx0cmV0dXJuIGRhdGE7XHJcblx0XHR9LFxyXG5cclxuXHRcdC8vIE5vZGVMaXN0VG9KU09OXHJcblx0XHQvLyBHaXZlbiBhIGxpc3Qgb2YgZWxlbWVudHMgZXh0cmFwb2xhdGUgdGhlaXIgdmFsdWVzIGFuZCByZXR1cm4gYXMgYSBqc29uIG9iamVjdFxyXG5cdFx0bm9kZUxpc3RUb0pTT046IGZ1bmN0aW9uKG5vZGVsaXN0KSB7XHJcblxyXG5cdFx0XHR2YXIganNvbiA9IHt9O1xyXG5cclxuXHRcdFx0Ly8gQ3JlYXRlIGEgZGF0YSBzdHJpbmdcclxuXHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBub2RlbGlzdC5sZW5ndGg7IGkrKykge1xyXG5cclxuXHRcdFx0XHR2YXIgaW5wdXQgPSBub2RlbGlzdFtpXTtcclxuXHJcblx0XHRcdFx0Ly8gSWYgdGhlIG5hbWUgb2YgdGhlIGlucHV0IGlzIGVtcHR5IG9yIGRpYWJsZWQsIGRvbnQgYWRkIGl0LlxyXG5cdFx0XHRcdGlmIChpbnB1dC5kaXNhYmxlZCB8fCAhaW5wdXQubmFtZSkge1xyXG5cdFx0XHRcdFx0Y29udGludWU7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHQvLyBJcyB0aGlzIGEgZmlsZSwgZG9lcyB0aGUgYnJvd3NlciBub3Qgc3VwcG9ydCAnZmlsZXMnIGFuZCAnRm9ybURhdGEnP1xyXG5cdFx0XHRcdGlmIChpbnB1dC50eXBlID09PSAnZmlsZScpIHtcclxuXHRcdFx0XHRcdGpzb25baW5wdXQubmFtZV0gPSBpbnB1dDtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0ZWxzZSB7XHJcblx0XHRcdFx0XHRqc29uW2lucHV0Lm5hbWVdID0gaW5wdXQudmFsdWUgfHwgaW5wdXQuaW5uZXJIVE1MO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0cmV0dXJuIGpzb247XHJcblx0XHR9XHJcblx0fSk7XHJcblxyXG5cdC8vIFJlcGxhY2UgaXRcclxuXHRoZWxsby5hcGkgPSBmdW5jdGlvbigpIHtcclxuXHJcblx0XHQvLyBHZXQgYXJndW1lbnRzXHJcblx0XHR2YXIgcCA9IHV0aWxzLmFyZ3Moe3BhdGg6ICdzIScsIG1ldGhvZDogJ3MnLCBkYXRhOidvJywgdGltZW91dDogJ2knLCBjYWxsYmFjazogJ2YnfSwgYXJndW1lbnRzKTtcclxuXHJcblx0XHQvLyBDaGFuZ2UgZm9yIGludG8gYSBkYXRhIG9iamVjdFxyXG5cdFx0aWYgKHAuZGF0YSkge1xyXG5cdFx0XHR1dGlscy5kYXRhVG9KU09OKHApO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBhcGkuY2FsbCh0aGlzLCBwKTtcclxuXHR9O1xyXG5cclxufSkoaGVsbG8pO1xyXG5cclxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG4vL1xyXG4vLyBTYXZlIGFueSBhY2Nlc3MgdG9rZW4gdGhhdCBpcyBpbiB0aGUgY3VycmVudCBwYWdlIFVSTFxyXG4vLyBIYW5kbGUgYW55IHJlc3BvbnNlIHNvbGljaXRlZCB0aHJvdWdoIGlmcmFtZSBoYXNoIHRhZyBmb2xsb3dpbmcgYW4gQVBJIHJlcXVlc3RcclxuLy9cclxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG5cclxuaGVsbG8udXRpbHMucmVzcG9uc2VIYW5kbGVyKHdpbmRvdywgd2luZG93Lm9wZW5lciB8fCB3aW5kb3cucGFyZW50KTtcclxuXHJcbi8vIFNjcmlwdCB0byBzdXBwb3J0IENocm9tZUFwcHNcclxuLy8gVGhpcyBvdmVyaWRlcyB0aGUgaGVsbG8udXRpbHMucG9wdXAgbWV0aG9kIHRvIHN1cHBvcnQgY2hyb21lLmlkZW50aXR5LmxhdW5jaFdlYkF1dGhGbG93XHJcbi8vIFNlZSBodHRwczovL2RldmVsb3Blci5jaHJvbWUuY29tL2FwcHMvYXBwX2lkZW50aXR5I25vblxyXG5cclxuLy8gSXMgdGhpcyBhIGNocm9tZSBhcHA/XHJcblxyXG5pZiAodHlwZW9mIGNocm9tZSA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIGNocm9tZS5pZGVudGl0eSA9PT0gJ29iamVjdCcgJiYgY2hyb21lLmlkZW50aXR5LmxhdW5jaFdlYkF1dGhGbG93KSB7XHJcblxyXG5cdChmdW5jdGlvbigpIHtcclxuXHJcblx0XHQvLyBTd2FwIHRoZSBwb3B1cCBtZXRob2RcclxuXHRcdGhlbGxvLnV0aWxzLnBvcHVwID0gZnVuY3Rpb24odXJsKSB7XHJcblxyXG5cdFx0XHRyZXR1cm4gX29wZW4odXJsLCB0cnVlKTtcclxuXHJcblx0XHR9O1xyXG5cclxuXHRcdC8vIFN3YXAgdGhlIGhpZGRlbiBpZnJhbWUgbWV0aG9kXHJcblx0XHRoZWxsby51dGlscy5pZnJhbWUgPSBmdW5jdGlvbih1cmwpIHtcclxuXHJcblx0XHRcdF9vcGVuKHVybCwgZmFsc2UpO1xyXG5cclxuXHRcdH07XHJcblxyXG5cdFx0Ly8gU3dhcCB0aGUgcmVxdWVzdF9jb3JzIG1ldGhvZFxyXG5cdFx0aGVsbG8udXRpbHMucmVxdWVzdF9jb3JzID0gZnVuY3Rpb24oY2FsbGJhY2spIHtcclxuXHJcblx0XHRcdGNhbGxiYWNrKCk7XHJcblxyXG5cdFx0XHQvLyBBbHdheXMgcnVuIGFzIENPUlNcclxuXHJcblx0XHRcdHJldHVybiB0cnVlO1xyXG5cdFx0fTtcclxuXHJcblx0XHQvLyBTd2FwIHRoZSBzdG9yYWdlIG1ldGhvZFxyXG5cdFx0dmFyIF9jYWNoZSA9IHt9O1xyXG5cdFx0Y2hyb21lLnN0b3JhZ2UubG9jYWwuZ2V0KCdoZWxsbycsIGZ1bmN0aW9uKHIpIHtcclxuXHRcdFx0Ly8gVXBkYXRlIHRoZSBjYWNoZVxyXG5cdFx0XHRfY2FjaGUgPSByLmhlbGxvIHx8IHt9O1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0aGVsbG8udXRpbHMuc3RvcmUgPSBmdW5jdGlvbihuYW1lLCB2YWx1ZSkge1xyXG5cclxuXHRcdFx0Ly8gR2V0IGFsbFxyXG5cdFx0XHRpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMCkge1xyXG5cdFx0XHRcdHJldHVybiBfY2FjaGU7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdC8vIEdldFxyXG5cdFx0XHRpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMSkge1xyXG5cdFx0XHRcdHJldHVybiBfY2FjaGVbbmFtZV0gfHwgbnVsbDtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0Ly8gU2V0XHJcblx0XHRcdGlmICh2YWx1ZSkge1xyXG5cdFx0XHRcdF9jYWNoZVtuYW1lXSA9IHZhbHVlO1xyXG5cdFx0XHRcdGNocm9tZS5zdG9yYWdlLmxvY2FsLnNldCh7aGVsbG86IF9jYWNoZX0pO1xyXG5cdFx0XHRcdHJldHVybiB2YWx1ZTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0Ly8gRGVsZXRlXHJcblx0XHRcdGlmICh2YWx1ZSA9PT0gbnVsbCkge1xyXG5cdFx0XHRcdGRlbGV0ZSBfY2FjaGVbbmFtZV07XHJcblx0XHRcdFx0Y2hyb21lLnN0b3JhZ2UubG9jYWwuc2V0KHtoZWxsbzogX2NhY2hlfSk7XHJcblx0XHRcdFx0cmV0dXJuIG51bGw7XHJcblx0XHRcdH1cclxuXHRcdH07XHJcblxyXG5cdFx0Ly8gT3BlbiBmdW5jdGlvblxyXG5cdFx0ZnVuY3Rpb24gX29wZW4odXJsLCBpbnRlcmFjdGl2ZSkge1xyXG5cclxuXHRcdFx0Ly8gTGF1bmNoXHJcblx0XHRcdHZhciByZWYgPSB7XHJcblx0XHRcdFx0Y2xvc2VkOiBmYWxzZVxyXG5cdFx0XHR9O1xyXG5cclxuXHRcdFx0Ly8gTGF1bmNoIHRoZSB3ZWJBdXRoRmxvd1xyXG5cdFx0XHRjaHJvbWUuaWRlbnRpdHkubGF1bmNoV2ViQXV0aEZsb3coe1xyXG5cdFx0XHRcdHVybDogdXJsLFxyXG5cdFx0XHRcdGludGVyYWN0aXZlOiBpbnRlcmFjdGl2ZVxyXG5cdFx0XHR9LCBmdW5jdGlvbihyZXNwb25zZVVybCkge1xyXG5cclxuXHRcdFx0XHQvLyBEaWQgdGhlIHVzZXIgY2FuY2VsIHRoaXMgcHJlbWF0dXJlbHlcclxuXHRcdFx0XHRpZiAocmVzcG9uc2VVcmwgPT09IHVuZGVmaW5lZCkge1xyXG5cdFx0XHRcdFx0cmVmLmNsb3NlZCA9IHRydWU7XHJcblx0XHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHQvLyBTcGxpdCBhcHBhcnQgdGhlIFVSTFxyXG5cdFx0XHRcdHZhciBhID0gaGVsbG8udXRpbHMudXJsKHJlc3BvbnNlVXJsKTtcclxuXHJcblx0XHRcdFx0Ly8gVGhlIGxvY2F0aW9uIGNhbiBiZSBhdWdtZW50ZWQgaW4gdG8gYSBsb2NhdGlvbiBvYmplY3QgbGlrZSBzby4uLlxyXG5cdFx0XHRcdC8vIFdlIGRvbnQgaGF2ZSB3aW5kb3cgb3BlcmF0aW9ucyBvbiB0aGUgcG9wdXAgc28gbGV0cyBjcmVhdGUgc29tZVxyXG5cdFx0XHRcdHZhciBfcG9wdXAgPSB7XHJcblx0XHRcdFx0XHRsb2NhdGlvbjoge1xyXG5cclxuXHRcdFx0XHRcdFx0Ly8gQ2hhbmdlIHRoZSBsb2NhdGlvbiBvZiB0aGUgcG9wdXBcclxuXHRcdFx0XHRcdFx0YXNzaWduOiBmdW5jdGlvbih1cmwpIHtcclxuXHJcblx0XHRcdFx0XHRcdFx0Ly8gSWYgdGhlcmUgaXMgYSBzZWNvbmRhcnkgcmVhc3NpZ25cclxuXHRcdFx0XHRcdFx0XHQvLyBJbiB0aGUgY2FzZSBvZiBPQXV0aDFcclxuXHRcdFx0XHRcdFx0XHQvLyBUcmlnZ2VyIHRoaXMgaW4gbm9uLWludGVyYWN0aXZlIG1vZGUuXHJcblx0XHRcdFx0XHRcdFx0X29wZW4odXJsLCBmYWxzZSk7XHJcblx0XHRcdFx0XHRcdH0sXHJcblxyXG5cdFx0XHRcdFx0XHRzZWFyY2g6IGEuc2VhcmNoLFxyXG5cdFx0XHRcdFx0XHRoYXNoOiBhLmhhc2gsXHJcblx0XHRcdFx0XHRcdGhyZWY6IGEuaHJlZlxyXG5cdFx0XHRcdFx0fSxcclxuXHRcdFx0XHRcdGNsb3NlOiBmdW5jdGlvbigpIHt9XHJcblx0XHRcdFx0fTtcclxuXHJcblx0XHRcdFx0Ly8gVGhlbiB0aGlzIFVSTCBjb250YWlucyBpbmZvcm1hdGlvbiB3aGljaCBIZWxsb0pTIG11c3QgcHJvY2Vzc1xyXG5cdFx0XHRcdC8vIFVSTCBzdHJpbmdcclxuXHRcdFx0XHQvLyBXaW5kb3cgLSBhbnkgYWN0aW9uIHN1Y2ggYXMgd2luZG93IHJlbG9jYXRpb24gZ29lcyBoZXJlXHJcblx0XHRcdFx0Ly8gT3BlbmVyIC0gdGhlIHBhcmVudCB3aW5kb3cgd2hpY2ggb3BlbmVkIHRoaXMsIGFrYSB0aGlzIHNjcmlwdFxyXG5cclxuXHRcdFx0XHRoZWxsby51dGlscy5yZXNwb25zZUhhbmRsZXIoX3BvcHVwLCB3aW5kb3cpO1xyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRcdC8vIFJldHVybiB0aGUgcmVmZXJlbmNlXHJcblx0XHRcdHJldHVybiByZWY7XHJcblx0XHR9XHJcblxyXG5cdH0pKCk7XHJcbn1cclxuXHJcbi8vIFBob25lZ2FwIG92ZXJyaWRlIGZvciBoZWxsby5waG9uZWdhcC5qc1xyXG4oZnVuY3Rpb24oKSB7XHJcblxyXG5cdC8vIElzIHRoaXMgYSBwaG9uZWdhcCBpbXBsZW1lbnRhdGlvbj9cclxuXHRpZiAoISgvXmZpbGU6XFwvezN9W15cXC9dLy50ZXN0KHdpbmRvdy5sb2NhdGlvbi5ocmVmKSAmJiB3aW5kb3cuY29yZG92YSkpIHtcclxuXHRcdC8vIENvcmRvdmEgaXMgbm90IGluY2x1ZGVkLlxyXG5cdFx0cmV0dXJuO1xyXG5cdH1cclxuXHJcblx0Ly8gQXVnbWVudCB0aGUgaGlkZGVuIGlmcmFtZSBtZXRob2RcclxuXHRoZWxsby51dGlscy5pZnJhbWUgPSBmdW5jdGlvbih1cmwsIHJlZGlyZWN0VXJpKSB7XHJcblx0XHRoZWxsby51dGlscy5wb3B1cCh1cmwsIHJlZGlyZWN0VXJpLCB7aGlkZGVuOiAneWVzJ30pO1xyXG5cdH07XHJcblxyXG5cdC8vIEF1Z21lbnQgdGhlIHBvcHVwXHJcblx0dmFyIHV0aWxQb3B1cCA9IGhlbGxvLnV0aWxzLnBvcHVwO1xyXG5cclxuXHQvLyBSZXBsYWNlIHBvcHVwXHJcblx0aGVsbG8udXRpbHMucG9wdXAgPSBmdW5jdGlvbih1cmwsIHJlZGlyZWN0VXJpLCBvcHRpb25zKSB7XHJcblxyXG5cdFx0Ly8gUnVuIHRoZSBzdGFuZGFyZFxyXG5cdFx0dmFyIHBvcHVwID0gdXRpbFBvcHVwLmNhbGwodGhpcywgdXJsLCByZWRpcmVjdFVyaSwgb3B0aW9ucyk7XHJcblxyXG5cdFx0Ly8gQ3JlYXRlIGEgZnVuY3Rpb24gZm9yIHJlb3BlbmluZyB0aGUgcG9wdXAsIGFuZCBhc3NpZ25pbmcgZXZlbnRzIHRvIHRoZSBuZXcgcG9wdXAgb2JqZWN0XHJcblx0XHQvLyBQaG9uZUdhcCBzdXBwb3J0XHJcblx0XHQvLyBBZGQgYW4gZXZlbnQgbGlzdGVuZXIgdG8gbGlzdGVuIHRvIHRoZSBjaGFuZ2UgaW4gdGhlIHBvcHVwIHdpbmRvd3MgVVJMXHJcblx0XHQvLyBUaGlzIG11c3QgYXBwZWFyIGJlZm9yZSBwb3B1cC5mb2N1cygpO1xyXG5cdFx0dHJ5IHtcclxuXHRcdFx0aWYgKHBvcHVwICYmIHBvcHVwLmFkZEV2ZW50TGlzdGVuZXIpIHtcclxuXHJcblx0XHRcdFx0Ly8gR2V0IHRoZSBvcmlnaW4gb2YgdGhlIHJlZGlyZWN0IFVSSVxyXG5cclxuXHRcdFx0XHR2YXIgYSA9IGhlbGxvLnV0aWxzLnVybChyZWRpcmVjdFVyaSk7XHJcblx0XHRcdFx0dmFyIHJlZGlyZWN0VXJpT3JpZ2luID0gYS5vcmlnaW4gfHwgKGEucHJvdG9jb2wgKyAnLy8nICsgYS5ob3N0bmFtZSk7XHJcblxyXG5cdFx0XHRcdC8vIExpc3RlbiB0byBjaGFuZ2VzIGluIHRoZSBJbkFwcEJyb3dzZXIgd2luZG93XHJcblxyXG5cdFx0XHRcdHBvcHVwLmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWRzdGFydCcsIGZ1bmN0aW9uKGUpIHtcclxuXHJcblx0XHRcdFx0XHR2YXIgdXJsID0gZS51cmw7XHJcblxyXG5cdFx0XHRcdFx0Ly8gSXMgdGhpcyB0aGUgcGF0aCwgYXMgZ2l2ZW4gYnkgdGhlIHJlZGlyZWN0VXJpP1xyXG5cdFx0XHRcdFx0Ly8gQ2hlY2sgdGhlIG5ldyBVUkwgYWdhaW5zIHRoZSByZWRpcmVjdFVyaU9yaWdpbi5cclxuXHRcdFx0XHRcdC8vIEFjY29yZGluZyB0byAjNjMgYSB1c2VyIGNvdWxkIGNsaWNrICdjYW5jZWwnIGluIHNvbWUgZGlhbG9nIGJveGVzIC4uLi5cclxuXHRcdFx0XHRcdC8vIFRoZSBwb3B1cCByZWRpcmVjdHMgdG8gYW5vdGhlciBwYWdlIHdpdGggdGhlIHNhbWUgb3JpZ2luLCB5ZXQgd2Ugc3RpbGwgd2lzaCBpdCB0byBjbG9zZS5cclxuXHJcblx0XHRcdFx0XHRpZiAodXJsLmluZGV4T2YocmVkaXJlY3RVcmlPcmlnaW4pICE9PSAwKSB7XHJcblx0XHRcdFx0XHRcdHJldHVybjtcclxuXHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHQvLyBTcGxpdCBhcHBhcnQgdGhlIFVSTFxyXG5cdFx0XHRcdFx0dmFyIGEgPSBoZWxsby51dGlscy51cmwodXJsKTtcclxuXHJcblx0XHRcdFx0XHQvLyBXZSBkb250IGhhdmUgd2luZG93IG9wZXJhdGlvbnMgb24gdGhlIHBvcHVwIHNvIGxldHMgY3JlYXRlIHNvbWVcclxuXHRcdFx0XHRcdC8vIFRoZSBsb2NhdGlvbiBjYW4gYmUgYXVnbWVudGVkIGluIHRvIGEgbG9jYXRpb24gb2JqZWN0IGxpa2Ugc28uLi5cclxuXHJcblx0XHRcdFx0XHR2YXIgX3BvcHVwID0ge1xyXG5cdFx0XHRcdFx0XHRsb2NhdGlvbjoge1xyXG5cdFx0XHRcdFx0XHRcdC8vIENoYW5nZSB0aGUgbG9jYXRpb24gb2YgdGhlIHBvcHVwXHJcblx0XHRcdFx0XHRcdFx0YXNzaWduOiBmdW5jdGlvbihsb2NhdGlvbikge1xyXG5cclxuXHRcdFx0XHRcdFx0XHRcdC8vIFVuZm91cnR1bmF0bHkgYW4gYXBwIGlzIG1heSBub3QgY2hhbmdlIHRoZSBsb2NhdGlvbiBvZiBhIEluQXBwQnJvd3NlciB3aW5kb3cuXHJcblx0XHRcdFx0XHRcdFx0XHQvLyBTbyB0byBzaGltIHRoaXMsIGp1c3Qgb3BlbiBhIG5ldyBvbmUuXHJcblx0XHRcdFx0XHRcdFx0XHRwb3B1cC5leGVjdXRlU2NyaXB0KHtjb2RlOiAnd2luZG93LmxvY2F0aW9uLmhyZWYgPSBcIicgKyBsb2NhdGlvbiArICc7XCInfSk7XHJcblx0XHRcdFx0XHRcdFx0fSxcclxuXHJcblx0XHRcdFx0XHRcdFx0c2VhcmNoOiBhLnNlYXJjaCxcclxuXHRcdFx0XHRcdFx0XHRoYXNoOiBhLmhhc2gsXHJcblx0XHRcdFx0XHRcdFx0aHJlZjogYS5ocmVmXHJcblx0XHRcdFx0XHRcdH0sXHJcblx0XHRcdFx0XHRcdGNsb3NlOiBmdW5jdGlvbigpIHtcclxuXHRcdFx0XHRcdFx0XHRpZiAocG9wdXAuY2xvc2UpIHtcclxuXHRcdFx0XHRcdFx0XHRcdHBvcHVwLmNsb3NlKCk7XHJcblx0XHRcdFx0XHRcdFx0XHR0cnkge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRwb3B1cC5jbG9zZWQgPSB0cnVlO1xyXG5cdFx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRcdFx0Y2F0Y2ggKF9lKSB7fVxyXG5cdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0fTtcclxuXHJcblx0XHRcdFx0XHQvLyBUaGVuIHRoaXMgVVJMIGNvbnRhaW5zIGluZm9ybWF0aW9uIHdoaWNoIEhlbGxvSlMgbXVzdCBwcm9jZXNzXHJcblx0XHRcdFx0XHQvLyBVUkwgc3RyaW5nXHJcblx0XHRcdFx0XHQvLyBXaW5kb3cgLSBhbnkgYWN0aW9uIHN1Y2ggYXMgd2luZG93IHJlbG9jYXRpb24gZ29lcyBoZXJlXHJcblx0XHRcdFx0XHQvLyBPcGVuZXIgLSB0aGUgcGFyZW50IHdpbmRvdyB3aGljaCBvcGVuZWQgdGhpcywgYWthIHRoaXMgc2NyaXB0XHJcblxyXG5cdFx0XHRcdFx0aGVsbG8udXRpbHMucmVzcG9uc2VIYW5kbGVyKF9wb3B1cCwgd2luZG93KTtcclxuXHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHRcdGNhdGNoIChlKSB7fVxyXG5cclxuXHRcdHJldHVybiBwb3B1cDtcclxuXHR9O1xyXG5cclxufSkoKTtcclxuXHJcbi8vIFJlZ2lzdGVyIGFzIGFub255bW91cyBBTUQgbW9kdWxlXHJcbmlmICh0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpIHtcclxuXHRkZWZpbmUoZnVuY3Rpb24oKSB7XHJcblx0XHRyZXR1cm4gaGVsbG87XHJcblx0fSk7XHJcbn1cclxuXHJcbi8vIENvbW1vbkpTIG1vZHVsZSBmb3IgYnJvd3NlcmlmeVxyXG5pZiAodHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcgJiYgbW9kdWxlLmV4cG9ydHMpIHtcclxuXHRtb2R1bGUuZXhwb3J0cyA9IGhlbGxvO1xyXG59XHJcbiIsIi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4vLyAgQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uICBBbGwgUmlnaHRzIFJlc2VydmVkLiAgTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiAgU2VlIExpY2Vuc2UgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cclxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcblxyXG4ndXNlIHN0cmljdCc7XHJcblxyXG5hbmd1bGFyLm1vZHVsZSgnQXBpRXhwbG9yZXInLCBbJ25nQW5pbWF0ZScsICduZ01hdGVyaWFsJ10pXHJcbiAgICAuY29uZmlnKFsnJG1kVGhlbWluZ1Byb3ZpZGVyJywgZnVuY3Rpb24gKCRtZFRoZW1pbmdQcm92aWRlcikge1xyXG5cclxuICAgICRtZFRoZW1pbmdQcm92aWRlci5kZWZpbmVQYWxldHRlKCdPMzY1UHJpbWFyeVBhbGV0dGUnLCB7XHJcbiAgICAgICAgICAgICc1MCc6ICdlOWYwZmMnLFxyXG4gICAgICAgICAgICAnMTAwJzogJ2QzZTJmOCcsXHJcbiAgICAgICAgICAgICcyMDAnOiAnYmRkM2Y1JyxcclxuICAgICAgICAgICAgJzMwMCc6ICc5MWI2ZWUnLCBcclxuICAgICAgICAgICAgJzQwMCc6ICc2NTk5ZTcnLFxyXG4gICAgICAgICAgICAnNTAwJzogJzQ2ODVlMicsIC8vYmx1ZVxyXG4gICAgICAgICAgICAnNjAwJzogJzM4N2JlMCcsXHJcbiAgICAgICAgICAgICc3MDAnOiAnMjI2ZGRkJyxcclxuICAgICAgICAgICAgJzgwMCc6ICcxZjYyYzcnLCBcclxuICAgICAgICAgICAgJzkwMCc6ICcxYzU3YjAnLFxyXG4gICAgICAgICAgICAnQTEwMCc6ICdGRjZBMDAnLCBcclxuICAgICAgICAgICAgJ0EyMDAnOiAnRkY2QTAwJywgXHJcbiAgICAgICAgICAgICdBNDAwJzogJ0ZGNkEwMCcsIFxyXG4gICAgICAgICAgICAnQTcwMCc6ICdGRjZBMDAnLCBcclxuICAgICAgICAgICAgJ2NvbnRyYXN0RGVmYXVsdENvbG9yJzogJ2xpZ2h0JywgICBcclxuICAgICAgICAgICAgJ2NvbnRyYXN0RGFya0NvbG9ycyc6IFsnNTAnLCAnMTAwJywgXHJcbiAgICAgICAgICAgICAgICAnMjAwJywgJzMwMCcsICc0MDAnLCAnQTEwMCddLFxyXG4gICAgICAgICAgICAnY29udHJhc3RMaWdodENvbG9ycyc6IHVuZGVmaW5lZCBcclxuICAgIH0pO1xyXG4gICAgXHJcbiAgICAkbWRUaGVtaW5nUHJvdmlkZXIuZGVmaW5lUGFsZXR0ZSgnTzM2NUFjY2VudFBhbGV0dGUnLCB7XHJcbiAgICAgICAgICAgICc1MCc6ICdmZmM0OTknLFxyXG4gICAgICAgICAgICAnMTAwJzogJ2ZmYjU4MCcsXHJcbiAgICAgICAgICAgICcyMDAnOiAnZmZhNjY2JyxcclxuICAgICAgICAgICAgJzMwMCc6ICdmZjk3NGQnLCBcclxuICAgICAgICAgICAgJzQwMCc6ICdmZjg4MzMnLFxyXG4gICAgICAgICAgICAnNTAwJzogJ0ZGNkEwMCcsIC8vb3JhbmdlXHJcbiAgICAgICAgICAgICc2MDAnOiAnZTY2MDAwJyxcclxuICAgICAgICAgICAgJzcwMCc6ICdjYzU1MDAnLFxyXG4gICAgICAgICAgICAnODAwJzogJ2IzNGEwMCcsIFxyXG4gICAgICAgICAgICAnOTAwJzogJzk5NDAwMCcsXHJcbiAgICAgICAgICAgICdBMTAwJzogJ0ZGNkEwMCcsXHJcbiAgICAgICAgICAgICdBMjAwJzogJ0ZGNkEwMCcsIFxyXG4gICAgICAgICAgICAnQTQwMCc6ICdGRjZBMDAnLCBcclxuICAgICAgICAgICAgJ0E3MDAnOiAnRkY2QTAwJywgXHJcbiAgICB9KTtcclxuXHJcbiAgICAkbWRUaGVtaW5nUHJvdmlkZXIudGhlbWUoJ2RlZmF1bHQnKS5wcmltYXJ5UGFsZXR0ZSgnTzM2NVByaW1hcnlQYWxldHRlJyk7XHJcbiAgICAkbWRUaGVtaW5nUHJvdmlkZXIudGhlbWUoJ2RlZmF1bHQnKS5hY2NlbnRQYWxldHRlKCdPMzY1QWNjZW50UGFsZXR0ZScpO1xyXG59XSk7IiwiJ3VzZSBzdHJpY3QnO1xyXG5mdW5jdGlvbiBydW4oJHNjb3BlLCB1cmwsIGFwaVNlcnZpY2UpIHtcclxuICAgICRzY29wZS4kZW1pdCgndXJsQ2hhbmdlJywgdXJsKTtcclxufVxyXG5mdW5jdGlvbiBmb3JtYXRYbWwoeG1sKSB7XHJcbiAgICB2YXIgcmVnID0gLyg+KVxccyooPCkoXFwvKikvZztcclxuICAgIHZhciB3c2V4cCA9IC8gKiguKikgK1xcbi9nO1xyXG4gICAgdmFyIGNvbnRleHAgPSAvKDwuKz4pKC4rXFxuKS9nO1xyXG4gICAgeG1sID0geG1sLnJlcGxhY2UocmVnLCAnJDFcXG4kMiQzJykucmVwbGFjZSh3c2V4cCwgJyQxXFxuJykucmVwbGFjZShjb250ZXhwLCAnJDFcXG4kMicpO1xyXG4gICAgdmFyIHBhZCA9IDA7XHJcbiAgICB2YXIgZm9ybWF0dGVkID0gJyc7XHJcbiAgICB2YXIgbGluZXMgPSB4bWwuc3BsaXQoJ1xcbicpO1xyXG4gICAgdmFyIGluZGVudCA9IDA7XHJcbiAgICB2YXIgbGFzdFR5cGUgPSAnb3RoZXInO1xyXG4gICAgdmFyIHRyYW5zaXRpb25zID0ge1xyXG4gICAgICAgICdzaW5nbGUtPnNpbmdsZSc6IDAsXHJcbiAgICAgICAgJ3NpbmdsZS0+Y2xvc2luZyc6IC0xLFxyXG4gICAgICAgICdzaW5nbGUtPm9wZW5pbmcnOiAwLFxyXG4gICAgICAgICdzaW5nbGUtPm90aGVyJzogMCxcclxuICAgICAgICAnY2xvc2luZy0+c2luZ2xlJzogMCxcclxuICAgICAgICAnY2xvc2luZy0+Y2xvc2luZyc6IC0xLFxyXG4gICAgICAgICdjbG9zaW5nLT5vcGVuaW5nJzogMCxcclxuICAgICAgICAnY2xvc2luZy0+b3RoZXInOiAwLFxyXG4gICAgICAgICdvcGVuaW5nLT5zaW5nbGUnOiAxLFxyXG4gICAgICAgICdvcGVuaW5nLT5jbG9zaW5nJzogMCxcclxuICAgICAgICAnb3BlbmluZy0+b3BlbmluZyc6IDEsXHJcbiAgICAgICAgJ29wZW5pbmctPm90aGVyJzogMSxcclxuICAgICAgICAnb3RoZXItPnNpbmdsZSc6IDAsXHJcbiAgICAgICAgJ290aGVyLT5jbG9zaW5nJzogLTEsXHJcbiAgICAgICAgJ290aGVyLT5vcGVuaW5nJzogMCxcclxuICAgICAgICAnb3RoZXItPm90aGVyJzogMFxyXG4gICAgfTtcclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGluZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICB2YXIgbG4gPSBsaW5lc1tpXTtcclxuICAgICAgICB2YXIgc2luZ2xlID0gQm9vbGVhbihsbi5tYXRjaCgvPC4rXFwvPi8pKTtcclxuICAgICAgICB2YXIgY2xvc2luZyA9IEJvb2xlYW4obG4ubWF0Y2goLzxcXC8uKz4vKSk7XHJcbiAgICAgICAgdmFyIG9wZW5pbmcgPSBCb29sZWFuKGxuLm1hdGNoKC88W14hXS4qPi8pKTtcclxuICAgICAgICB2YXIgdHlwZSA9IHNpbmdsZSA/ICdzaW5nbGUnIDogY2xvc2luZyA/ICdjbG9zaW5nJyA6IG9wZW5pbmcgPyAnb3BlbmluZycgOiAnb3RoZXInO1xyXG4gICAgICAgIHZhciBmcm9tVG8gPSBsYXN0VHlwZSArICctPicgKyB0eXBlO1xyXG4gICAgICAgIGxhc3RUeXBlID0gdHlwZTtcclxuICAgICAgICB2YXIgcGFkZGluZyA9ICcnO1xyXG4gICAgICAgIGluZGVudCArPSB0cmFuc2l0aW9uc1tmcm9tVG9dO1xyXG4gICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgaW5kZW50OyBqKyspIHtcclxuICAgICAgICAgICAgcGFkZGluZyArPSAnXFx0JztcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGZyb21UbyA9PSAnb3BlbmluZy0+Y2xvc2luZycpXHJcbiAgICAgICAgICAgIGZvcm1hdHRlZCA9IGZvcm1hdHRlZC5zdWJzdHIoMCwgZm9ybWF0dGVkLmxlbmd0aCAtIDEpICsgbG4gKyAnXFxuJztcclxuICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIGZvcm1hdHRlZCArPSBwYWRkaW5nICsgbG4gKyAnXFxuJztcclxuICAgIH1cclxuICAgIHJldHVybiBmb3JtYXR0ZWQ7XHJcbn1cclxuO1xyXG5mdW5jdGlvbiBzaG93RHVyYXRpb24oJHNjb3BlLCBzdGFydFRpbWUpIHtcclxuICAgIHZhciBlbmRUaW1lID0gbmV3IERhdGUoKTtcclxuICAgICRzY29wZS5kdXJhdGlvbiA9IChlbmRUaW1lLmdldFRpbWUoKSAtIHN0YXJ0VGltZS5nZXRUaW1lKCkpO1xyXG4gICAgJHNjb3BlLnJlcXVlc3RJblByb2dyZXNzID0gZmFsc2U7XHJcbn1cclxuZnVuY3Rpb24gaW5zZXJ0SGVhZGVyc0ludG9SZXNwb25zZVZpZXdlcigkc2NvcGUsIGhlYWRlcnMsIHN0YXR1cykge1xyXG4gICAgdmFyIHJlc3BvbnNlT2JqID0ge307XHJcbiAgICBpZiAoaGVhZGVycyAhPSBudWxsKSB7XHJcbiAgICAgICAgcmVzcG9uc2VPYmogPSBoZWFkZXJzKCk7XHJcbiAgICB9XHJcbiAgICByZXNwb25zZU9ialtcIlN0YXR1cyBDb2RlXCJdID0gc3RhdHVzO1xyXG4gICAgdmFyIGhlYWRlcnNBcnIgPSBbXTtcclxuICAgIGZvciAodmFyIGhlYWRlck5hbWUgaW4gcmVzcG9uc2VPYmopIHtcclxuICAgICAgICBoZWFkZXJzQXJyLnB1c2goaGVhZGVyTmFtZSArIFwiOiBcIiArIHJlc3BvbnNlT2JqW2hlYWRlck5hbWVdKTtcclxuICAgIH1cclxuICAgIGdldEpzb25WaWV3ZXIoKS5nZXRTZXNzaW9uKCkuc2V0VmFsdWUoXCJcIik7XHJcbiAgICBnZXRKc29uVmlld2VyKCkuZ2V0U2Vzc2lvbigpLmluc2VydCgwLCBoZWFkZXJzQXJyLmpvaW4oXCJcXG5cIikpO1xyXG59XHJcbmZ1bmN0aW9uIGdldFJlcXVlc3RCb2R5RWRpdG9yKCkge1xyXG4gICAgdmFyIHJlcXVlc3RCb2R5RWRpdG9yRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwianNvbkVkaXRvclwiKTtcclxuICAgIHJldHVybiBhY2UuZWRpdChyZXF1ZXN0Qm9keUVkaXRvckVsZW1lbnQpO1xyXG59XHJcbmZ1bmN0aW9uIGdldEpzb25WaWV3ZXIoKSB7XHJcbiAgICB2YXIganNvblZpZXdlckVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImpzb25WaWV3ZXJcIik7XHJcbiAgICByZXR1cm4gYWNlLmVkaXQoanNvblZpZXdlckVsZW1lbnQpO1xyXG59XHJcbmZ1bmN0aW9uIHNob3dSZXN1bHRzKCRzY29wZSwgcmVzdWx0cywgaGVhZGVycywgc3RhdHVzLCByZXNwb25zZUNvbnRlbnRUeXBlKSB7XHJcbiAgICBnZXRKc29uVmlld2VyKCkuc2V0VmFsdWUoXCJcIik7XHJcbiAgICBpbnNlcnRIZWFkZXJzSW50b1Jlc3BvbnNlVmlld2VyKCRzY29wZSwgaGVhZGVycywgc3RhdHVzKTtcclxuICAgIGdldEpzb25WaWV3ZXIoKS5nZXRTZXNzaW9uKCkuaW5zZXJ0KDAsIHJlc3VsdHMpO1xyXG4gICAgaWYgKHJlc3BvbnNlQ29udGVudFR5cGUpXHJcbiAgICAgICAgZ2V0SnNvblZpZXdlcigpLmdldFNlc3Npb24oKS5zZXRNb2RlKFwiYWNlL21vZGUvXCIgKyByZXNwb25zZUNvbnRlbnRUeXBlKTtcclxufVxyXG5mdW5jdGlvbiBoYW5kbGVJbWFnZVJlc3BvbnNlKCRzY29wZSwgYXBpU2VydmljZSwgc3RhcnRUaW1lLCBoZWFkZXJzLCBzdGF0dXMsIGhhbmRsZVVuc3VjY2Vzc2Z1bFF1ZXJ5UmVzcG9uc2UpIHtcclxuICAgIGFwaVNlcnZpY2UucGVyZm9ybVF1ZXJ5KCdHRVRfQklOQVJZJykoJHNjb3BlLnRleHQpLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCkge1xyXG4gICAgICAgIHZhciBibG9iID0gbmV3IEJsb2IoW3Jlc3VsdC5kYXRhXSwgeyB0eXBlOiBcImltYWdlL2pwZWdcIiB9KTtcclxuICAgICAgICB2YXIgaW1hZ2VVcmwgPSB3aW5kb3cuVVJMLmNyZWF0ZU9iamVjdFVSTChibG9iKTtcclxuICAgICAgICB2YXIgaW1hZ2VSZXN1bHRWaWV3ZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImltZ1wiKTtcclxuICAgICAgICBpbWFnZVJlc3VsdFZpZXdlci5zcmMgPSBpbWFnZVVybDtcclxuICAgICAgICAkc2NvcGUuc2hvd0ltYWdlID0gdHJ1ZTtcclxuICAgICAgICBpbnNlcnRIZWFkZXJzSW50b1Jlc3BvbnNlVmlld2VyKCRzY29wZSwgcmVzdWx0LmhlYWRlcnMsIHJlc3VsdC5zdGF0dXMpO1xyXG4gICAgICAgIHNob3dEdXJhdGlvbigkc2NvcGUsIHN0YXJ0VGltZSk7XHJcbiAgICB9LCBoYW5kbGVVbnN1Y2Nlc3NmdWxRdWVyeVJlc3BvbnNlKTtcclxufVxyXG5mdW5jdGlvbiBoYW5kbGVIdG1sUmVzcG9uc2UoJHNjb3BlLCBzdGFydFRpbWUsIHJlc3VsdHMsIGhlYWRlcnMsIHN0YXR1cykge1xyXG4gICAgc2hvd0R1cmF0aW9uKCRzY29wZSwgc3RhcnRUaW1lKTtcclxuICAgIHNob3dSZXN1bHRzKCRzY29wZSwgcmVzdWx0cywgaGVhZGVycywgc3RhdHVzLCBcImh0bWxcIik7XHJcbn1cclxuZnVuY3Rpb24gaGFuZGxlSnNvblJlc3BvbnNlKCRzY29wZSwgc3RhcnRUaW1lLCByZXN1bHRzLCBoZWFkZXJzLCBzdGF0dXMpIHtcclxuICAgIHJlc3VsdHMgPSBKU09OLnN0cmluZ2lmeShyZXN1bHRzLCBudWxsLCA0KTtcclxuICAgIHNob3dEdXJhdGlvbigkc2NvcGUsIHN0YXJ0VGltZSk7XHJcbiAgICBzaG93UmVzdWx0cygkc2NvcGUsIHJlc3VsdHMsIGhlYWRlcnMsIHN0YXR1cywgXCJqc29uXCIpO1xyXG59XHJcbmZ1bmN0aW9uIGhhbmRsZVhtbFJlc3BvbnNlKCRzY29wZSwgc3RhcnRUaW1lLCByZXN1bHRzLCBoZWFkZXJzLCBzdGF0dXMpIHtcclxuICAgIHJlc3VsdHMgPSBmb3JtYXRYbWwocmVzdWx0cyk7XHJcbiAgICBzaG93RHVyYXRpb24oJHNjb3BlLCBzdGFydFRpbWUpO1xyXG4gICAgc2hvd1Jlc3VsdHMoJHNjb3BlLCByZXN1bHRzLCBoZWFkZXJzLCBzdGF0dXMsIFwieG1sXCIpO1xyXG59XHJcbmZ1bmN0aW9uIGlzSW1hZ2VSZXNwb25zZShoZWFkZXJzKSB7XHJcbiAgICB2YXIgY29udGVudFR5cGUgPSBnZXRDb250ZW50VHlwZShoZWFkZXJzKTtcclxuICAgIHJldHVybiBjb250ZW50VHlwZSA9PT0gXCJhcHBsaWNhdGlvbi9vY3RldC1zdHJlYW1cIiB8fCBjb250ZW50VHlwZS5zdWJzdHIoMCwgNikgPT09IFwiaW1hZ2UvXCI7XHJcbn1cclxuZnVuY3Rpb24gaXNIdG1sUmVzcG9uc2UoaGVhZGVycykge1xyXG4gICAgdmFyIGNvbnRlbnRUeXBlID0gZ2V0Q29udGVudFR5cGUoaGVhZGVycyk7XHJcbiAgICByZXR1cm4gY29udGVudFR5cGUgPT09IFwidGV4dC9odG1sXCIgfHwgY29udGVudFR5cGUgPT09IFwiYXBwbGljYXRpb24veGh0bWwreG1sXCI7XHJcbn1cclxuZnVuY3Rpb24gaXNYbWxSZXNwb25zZShyZXN1bHRzKSB7XHJcbiAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkocmVzdWx0cywgbnVsbCwgNCkuaW5kZXhPZihcIjw/eG1sXCIpICE9IC0xO1xyXG59XHJcbmZ1bmN0aW9uIGlzSnNvblJlc3BvbnNlKGhlYWRlcnMpIHtcclxuICAgIHZhciBjb250ZW50VHlwZSA9IGdldENvbnRlbnRUeXBlKGhlYWRlcnMpO1xyXG4gICAgcmV0dXJuIGNvbnRlbnRUeXBlID09PSBcImFwcGxpY2F0aW9uL2pzb25cIjtcclxufVxyXG5mdW5jdGlvbiBnZXRDb250ZW50VHlwZShoZWFkZXJzKSB7XHJcbiAgICB2YXIgZnVsbCA9IGhlYWRlcnMoXCJjb250ZW50LXR5cGVcIik7XHJcbiAgICB2YXIgZGVsaW1pdGVyUG9zID0gZnVsbC5pbmRleE9mKFwiO1wiKTtcclxuICAgIGlmIChkZWxpbWl0ZXJQb3MgIT0gLTEpIHtcclxuICAgICAgICByZXR1cm4gZnVsbC5zdWJzdHIoMCwgZGVsaW1pdGVyUG9zKTtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgIHJldHVybiBmdWxsO1xyXG4gICAgfVxyXG59XHJcbmZ1bmN0aW9uIGdldEVudGl0eVNldHMobWV0YWRhdGEpIHtcclxuICAgIHZhciBlbnRpdHlTZXRzT2JqID0ge307XHJcbiAgICB2YXIgZW50aXR5U2V0c0FuZFNpbmdsZXRvbnMgPSAkKCgkLnBhcnNlSFRNTChtZXRhZGF0YSkpWzFdKS5maW5kKFwiRW50aXR5Q29udGFpbmVyXCIpWzBdLmNoaWxkcmVuO1xyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBlbnRpdHlTZXRzQW5kU2luZ2xldG9ucy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIHZhciBzZXQgPSBlbnRpdHlTZXRzQW5kU2luZ2xldG9uc1tpXTtcclxuICAgICAgICB2YXIgZW50aXR5U2V0T3JTaW5nbGV0b24gPSBudWxsO1xyXG4gICAgICAgIGlmIChzZXQudGFnTmFtZSA9PSBcIkVOVElUWVNFVFwiKSB7XHJcbiAgICAgICAgICAgIGVudGl0eVNldE9yU2luZ2xldG9uID0ge1xyXG4gICAgICAgICAgICAgICAgbmFtZTogc2V0LmdldEF0dHJpYnV0ZShcIm5hbWVcIiksXHJcbiAgICAgICAgICAgICAgICBpc0VudGl0eVNldDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIHR5cGU6IHNldC5nZXRBdHRyaWJ1dGUoXCJlbnRpdHl0eXBlXCIpLFxyXG4gICAgICAgICAgICAgICAgaXNBQ29sbGVjdGlvbjogdHJ1ZVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChzZXQudGFnTmFtZSA9PSBcIlNJTkdMRVRPTlwiKSB7XHJcbiAgICAgICAgICAgIGVudGl0eVNldE9yU2luZ2xldG9uID0ge1xyXG4gICAgICAgICAgICAgICAgbmFtZTogc2V0LmdldEF0dHJpYnV0ZShcIm5hbWVcIiksXHJcbiAgICAgICAgICAgICAgICBpc0VudGl0eVNldDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICB0eXBlOiBzZXQuZ2V0QXR0cmlidXRlKFwidHlwZVwiKSxcclxuICAgICAgICAgICAgICAgIGlzQUNvbGxlY3Rpb246IGZhbHNlXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiRm91bmQgdW5leHBlY3RlZCB0eXBlIGluIG1ldGFkYXRhIHVuZGVyIEVudGl0eUNvbnRhaW5lclwiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZW50aXR5U2V0c09ialtlbnRpdHlTZXRPclNpbmdsZXRvbi5uYW1lXSA9IGVudGl0eVNldE9yU2luZ2xldG9uO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGVudGl0eVNldHNPYmo7XHJcbn1cclxuZnVuY3Rpb24gZm9ybWF0UmVxdWVzdEhlYWRlcnMoaGVhZGVycykge1xyXG4gICAgdmFyIG9iaiA9IHt9O1xyXG4gICAgdmFyIHBhcnRzID0gaGVhZGVycy5yZXBsYWNlKC9eXFxzK3wsXFxzKiQvZywgJycpLnNwbGl0KCdcXG4nKTtcclxuICAgIGZvciAodmFyIGkgPSAwLCBsZW4gPSBwYXJ0cy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xyXG4gICAgICAgIHZhciBtYXRjaCA9IHBhcnRzW2ldLm1hdGNoKC9eXFxzKlwiPyhbXlwiOl0qKVwiP1xccyo6XFxzKlwiPyhbXlwiXSopXFxzKiQvKTtcclxuICAgICAgICBpZiAobWF0Y2gpIHtcclxuICAgICAgICAgICAgb2JqW21hdGNoWzFdXSA9IG1hdGNoWzJdO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBvYmo7XHJcbn1cclxuZnVuY3Rpb24gY3JlYXRlRW50aXR5VHlwZU9iamVjdChET01hcnJheSkge1xyXG4gICAgdmFyIGVudGl0eVR5cGVzID0ge307XHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IERPTWFycmF5Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgdmFyIEVudGl0eVR5cGUgPSB7XHJcbiAgICAgICAgICAgIG5hbWU6IERPTWFycmF5W2ldLmdldEF0dHJpYnV0ZShcIm5hbWVcIiksXHJcbiAgICAgICAgICAgIGxpbmtzOiB7fVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgdmFyIGNoaWxkcmVuID0gRE9NYXJyYXlbaV0uY2hpbGRyZW47XHJcbiAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBjaGlsZHJlbi5sZW5ndGg7IGorKykge1xyXG4gICAgICAgICAgICBpZiAoY2hpbGRyZW5bal0uYXR0cmlidXRlcy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgY2hpbGROYW1lID0gY2hpbGRyZW5bal0uZ2V0QXR0cmlidXRlKFwibmFtZVwiKTtcclxuICAgICAgICAgICAgICAgIHZhciB0eXBlID0gY2hpbGRyZW5bal0uZ2V0QXR0cmlidXRlKFwidHlwZVwiKTtcclxuICAgICAgICAgICAgICAgIHZhciB1cmxPYmplY3QgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaXNBQ29sbGVjdGlvbjogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogY2hpbGROYW1lLFxyXG4gICAgICAgICAgICAgICAgICAgIGlzRW50aXR5U2V0OiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICB0eXBlOiB0eXBlXHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgaWYgKHR5cGUuaW5kZXhPZihcIkNvbGxlY3Rpb24oXCIpID09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICB1cmxPYmplY3QuaXNBQ29sbGVjdGlvbiA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgdXJsT2JqZWN0LnR5cGUgPSB0eXBlLnNwbGl0KFwiKFwiKVsxXS5zcGxpdChcIilcIilbMF07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBFbnRpdHlUeXBlLmxpbmtzW2NoaWxkTmFtZV0gPSB1cmxPYmplY3Q7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZW50aXR5VHlwZXNbRW50aXR5VHlwZS5uYW1lXSA9IEVudGl0eVR5cGU7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZW50aXR5VHlwZXM7XHJcbn1cclxuZnVuY3Rpb24gc2hvd1JlcXVlc3RIZWFkZXJzKCRzY29wZSkge1xyXG4gICAgaWYgKCEkc2NvcGUuanNvbkVkaXRvckhlYWRlcnMpXHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgJHNjb3BlLmpzb25FZGl0b3JIZWFkZXJzLmdldFNlc3Npb24oKS5zZXRWYWx1ZShcIlwiKTtcclxuICAgIHZhciByZXF1ZXN0SGVhZGVycyA9IFwiQ29udGVudC1UeXBlOiBhcHBsaWNhdGlvbi9qc29uXCI7XHJcbiAgICAkc2NvcGUuanNvbkVkaXRvckhlYWRlcnMuZ2V0U2Vzc2lvbigpLmluc2VydCgwLCByZXF1ZXN0SGVhZGVycyk7XHJcbn1cclxuZnVuY3Rpb24gZ2V0RW50aXR5VHlwZXMobWV0YWRhdGEpIHtcclxuICAgIHZhciBlbnRpdGllcyA9IHt9O1xyXG4gICAgdmFyIGVudGl0eVR5cGVzID0gJCgoJC5wYXJzZUhUTUwobWV0YWRhdGEpKVsxXSkuZmluZChcIkVudGl0eVR5cGVcIik7XHJcbiAgICBqUXVlcnkuZXh0ZW5kKGVudGl0aWVzLCBjcmVhdGVFbnRpdHlUeXBlT2JqZWN0KGVudGl0eVR5cGVzKSk7XHJcbiAgICB2YXIgY29tcGxleFR5cGVzID0gJCgoJC5wYXJzZUhUTUwobWV0YWRhdGEpKVsxXSkuZmluZChcIkNvbXBsZXhUeXBlXCIpO1xyXG4gICAgalF1ZXJ5LmV4dGVuZChlbnRpdGllcywgY3JlYXRlRW50aXR5VHlwZU9iamVjdChjb21wbGV4VHlwZXMpKTtcclxuICAgIHJldHVybiBlbnRpdGllcztcclxufVxyXG5mdW5jdGlvbiBteVRyaW0od29yZCkge1xyXG4gICAgdmFyIHJldHVybldvcmQgPSB3b3JkO1xyXG4gICAgaWYgKHJldHVybldvcmQgIT0gbnVsbCkge1xyXG4gICAgICAgIHdoaWxlIChyZXR1cm5Xb3JkLmNoYXJBdChyZXR1cm5Xb3JkLmxlbmd0aCAtIDEpID09IFwiL1wiKSB7XHJcbiAgICAgICAgICAgIHJldHVybldvcmQgPSByZXR1cm5Xb3JkLnJlcGxhY2UoL1xcLyQvLCBcIlwiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHJldHVybldvcmQ7XHJcbiAgICB9XHJcbn1cclxuZnVuY3Rpb24gZ2V0RW50aXR5TmFtZShVUkwpIHtcclxuICAgIHZhciByZXR1cm5Xb3JkID0gbXlUcmltKFVSTCk7XHJcbiAgICBpZiAocmV0dXJuV29yZCAhPSBudWxsKSB7XHJcbiAgICAgICAgcmV0dXJuV29yZCA9IHJldHVybldvcmQuc3Vic3RyaW5nKHJldHVybldvcmQubGFzdEluZGV4T2YoXCIvXCIpICsgMSwgcmV0dXJuV29yZC5sZW5ndGgpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHJldHVybldvcmQ7XHJcbn1cclxuZnVuY3Rpb24gZ2V0RW50aXR5RnJvbVR5cGVOYW1lKHNlcnZpY2UsIHR5cGVQb3NzaWJseVdpdGhQcmVmaXgpIHtcclxuICAgIHZhciBlbnRpdHlUeXBlRGF0YSA9IHNlcnZpY2UuY2FjaGUuZ2V0KHNlcnZpY2Uuc2VsZWN0ZWRWZXJzaW9uICsgXCJFbnRpdHlUeXBlRGF0YVwiKTtcclxuICAgIHZhciB0eXBlID0gdHlwZVBvc3NpYmx5V2l0aFByZWZpeC5zcGxpdChcIm1pY3Jvc29mdC5ncmFwaC5cIikucG9wKCk7XHJcbiAgICByZXR1cm4gZW50aXR5VHlwZURhdGFbdHlwZV07XHJcbn1cclxuZnVuY3Rpb24gY29uc3RydWN0R3JhcGhMaW5rc0Zyb21TZXJ2aWNlUGF0aChzZXJ2aWNlKSB7XHJcbiAgICB2YXIgdXJsUGF0aEFyciA9IHNlcnZpY2UudGV4dC5zcGxpdChcImh0dHBzOi8vZ3JhcGgubWljcm9zb2Z0LmNvbS9cIik7XHJcbiAgICBpZiAodXJsUGF0aEFyci5sZW5ndGggPD0gMSlcclxuICAgICAgICByZXR1cm4gW107XHJcbiAgICB2YXIgc2VnbWVudHMgPSB1cmxQYXRoQXJyWzFdLnNwbGl0KFwiL1wiKTtcclxuICAgIHZhciB2ZXJzaW9uID0gc2VnbWVudHMuc2hpZnQoKTtcclxuICAgIHZhciBncmFwaCA9IFtdO1xyXG4gICAgdmFyIGVudGl0eUNvbnRhaW5lckRhdGEgPSBzZXJ2aWNlLmNhY2hlLmdldChzZXJ2aWNlLnNlbGVjdGVkVmVyc2lvbiArIFwiRW50aXR5U2V0RGF0YVwiKTtcclxuICAgIGlmIChlbnRpdHlDb250YWluZXJEYXRhID09PSB1bmRlZmluZWQpXHJcbiAgICAgICAgcmV0dXJuIFtdO1xyXG4gICAgd2hpbGUgKHNlZ21lbnRzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICB2YXIgc2VnbWVudCA9IHNlZ21lbnRzLnNoaWZ0KCk7XHJcbiAgICAgICAgaWYgKGdyYXBoLmxlbmd0aCA9PSAwKSB7XHJcbiAgICAgICAgICAgIGlmIChzZWdtZW50IGluIGVudGl0eUNvbnRhaW5lckRhdGEpIHtcclxuICAgICAgICAgICAgICAgIHZhciBub2RlID0gZW50aXR5Q29udGFpbmVyRGF0YVtzZWdtZW50XTtcclxuICAgICAgICAgICAgICAgIGdyYXBoLnB1c2gobm9kZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHZhciBsYXN0R3JhcGhJdGVtID0gZ3JhcGhbZ3JhcGgubGVuZ3RoIC0gMV07XHJcbiAgICAgICAgICAgIHZhciBsYXN0R3JhcGhJdGVtRW50aXR5ID0gZ2V0RW50aXR5RnJvbVR5cGVOYW1lKHNlcnZpY2UsIGxhc3RHcmFwaEl0ZW0udHlwZSk7XHJcbiAgICAgICAgICAgIGlmIChsYXN0R3JhcGhJdGVtRW50aXR5ID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChsYXN0R3JhcGhJdGVtRW50aXR5LmxpbmtzICE9PSB1bmRlZmluZWQgJiYgc2VnbWVudCBpbiBsYXN0R3JhcGhJdGVtRW50aXR5LmxpbmtzKSB7XHJcbiAgICAgICAgICAgICAgICBncmFwaC5wdXNoKGxhc3RHcmFwaEl0ZW1FbnRpdHkubGlua3Nbc2VnbWVudF0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKGxhc3RHcmFwaEl0ZW0uaXNBQ29sbGVjdGlvbiAmJiBzZWdtZW50ICE9IFwiXCIpIHtcclxuICAgICAgICAgICAgICAgIGdyYXBoLnB1c2goe1xyXG4gICAgICAgICAgICAgICAgICAgIGlzQUNvbGxlY3Rpb246IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIGlzRW50aXR5U2V0OiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBzZWdtZW50LFxyXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6IGxhc3RHcmFwaEl0ZW0udHlwZVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZ3JhcGg7XHJcbn1cclxuZnVuY3Rpb24gY29tYmluZVVybE9wdGlvbnNXaXRoQ3VycmVudFVybChzZXJ2aWNlLCB1cmxPcHRpb25zKSB7XHJcbiAgICB2YXIgZ3JhcGhGcm9tU2VydmljZVVybCA9IGNvbnN0cnVjdEdyYXBoTGlua3NGcm9tU2VydmljZVBhdGgoc2VydmljZSk7XHJcbiAgICB2YXIgYmFzZVVybCA9IFtdO1xyXG4gICAgd2hpbGUgKGdyYXBoRnJvbVNlcnZpY2VVcmwubGVuZ3RoID4gMCkge1xyXG4gICAgICAgIHZhciBsYXN0U2VnbWVudCA9IGdyYXBoRnJvbVNlcnZpY2VVcmwuc2hpZnQoKTtcclxuICAgICAgICBiYXNlVXJsLnB1c2gobGFzdFNlZ21lbnQubmFtZSk7XHJcbiAgICB9XHJcbiAgICB2YXIgYmFzZVVybEZpbmFsID0gXCJodHRwczovL2dyYXBoLm1pY3Jvc29mdC5jb20vXCIgKyBzZXJ2aWNlLnNlbGVjdGVkVmVyc2lvbjtcclxuICAgIGlmIChiYXNlVXJsLmxlbmd0aCA+IDApIHtcclxuICAgICAgICBiYXNlVXJsRmluYWwgKz0gXCIvXCIgKyBiYXNlVXJsLmpvaW4oJy8nKTtcclxuICAgIH1cclxuICAgIHZhciBhdXRvY29tcGxldGVVcmxzID0gW107XHJcbiAgICBmb3IgKHZhciB1cmxBdXRvQ29tcGxldGVTdWZmaXggaW4gdXJsT3B0aW9ucykge1xyXG4gICAgICAgIGF1dG9jb21wbGV0ZVVybHMucHVzaChiYXNlVXJsRmluYWwgKyAnLycgKyB1cmxPcHRpb25zW3VybEF1dG9Db21wbGV0ZVN1ZmZpeF0pO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGF1dG9jb21wbGV0ZVVybHM7XHJcbn1cclxuZnVuY3Rpb24gZ2V0VXJsc0Zyb21TZXJ2aWNlVVJMKHNlcnZpY2UsIGxhc3RDYWxsU3VjY2Vzc2Z1bCkge1xyXG4gICAgdmFyIGdyYXBoRnJvbVNlcnZpY2VVcmwgPSBjb25zdHJ1Y3RHcmFwaExpbmtzRnJvbVNlcnZpY2VQYXRoKHNlcnZpY2UpO1xyXG4gICAgaWYgKGdyYXBoRnJvbVNlcnZpY2VVcmwubGVuZ3RoID4gMCkge1xyXG4gICAgICAgIHZhciBsYXN0Tm9kZSA9IGdyYXBoRnJvbVNlcnZpY2VVcmwucG9wKCk7XHJcbiAgICAgICAgaWYgKGxhc3ROb2RlLmlzQUNvbGxlY3Rpb24pXHJcbiAgICAgICAgICAgIHJldHVybiBbXTtcclxuICAgICAgICB2YXIgZW50aXR5ID0gZ2V0RW50aXR5RnJvbVR5cGVOYW1lKHNlcnZpY2UsIGxhc3ROb2RlLnR5cGUpO1xyXG4gICAgICAgIHJldHVybiBjb21iaW5lVXJsT3B0aW9uc1dpdGhDdXJyZW50VXJsKHNlcnZpY2UsIE9iamVjdC5rZXlzKGVudGl0eS5saW5rcykpO1xyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgICAgdmFyIGVudGl0eUNvbnRhaW5lckRhdGEgPSBzZXJ2aWNlLmNhY2hlLmdldChzZXJ2aWNlLnNlbGVjdGVkVmVyc2lvbiArIFwiRW50aXR5U2V0RGF0YVwiKTtcclxuICAgICAgICBpZiAoZW50aXR5Q29udGFpbmVyRGF0YSA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBbXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGNvbWJpbmVVcmxPcHRpb25zV2l0aEN1cnJlbnRVcmwoc2VydmljZSwgT2JqZWN0LmtleXMoZW50aXR5Q29udGFpbmVyRGF0YSkpO1xyXG4gICAgfVxyXG59XHJcbmZ1bmN0aW9uIHNob3dSZXF1ZXN0Qm9keUVkaXRvcigpIHtcclxuICAgIHMudGFiQ29uZmlnLmRpc2FibGVSZXF1ZXN0Qm9keUVkaXRvciA9IGZhbHNlO1xyXG4gICAgcy50YWJDb25maWcuaGlkZUNvbnRlbnQgPSBmYWxzZTtcclxuICAgIHNob3dSZXF1ZXN0SGVhZGVycyhzKTtcclxuICAgICQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGluaXRpYWxpemVKc29uRWRpdG9yKHMpO1xyXG4gICAgICAgIHNldFNlbGVjdGVkVGFiKDEpO1xyXG4gICAgfSk7XHJcbn1cclxuZnVuY3Rpb24gc2V0U2VsZWN0ZWRUYWIobnVtKSB7XHJcbiAgICBpZiAobnVtID49IDIgfHwgbnVtIDwgMCkge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIHMudGFiQ29uZmlnLnNlbGVjdGVkID0gbnVtO1xyXG4gICAgcy50YWJDb25maWcucHJldmlvdXNTZWxlY3RlZCA9IHMudGFiQ29uZmlnLnNlbGVjdGVkO1xyXG59XHJcbmZ1bmN0aW9uIGhhbmRsZVF1ZXJ5U3RyaW5nKHNlcnZpY2UsIGFjdGlvblZhbHVlLCB2ZXJzaW9uVmFsdWUsIHJlcXVlc3RWYWx1ZSkge1xyXG4gICAgaWYgKGFjdGlvblZhbHVlKSB7XHJcbiAgICAgICAgc2VydmljZS5zZWxlY3RlZE9wdGlvbiA9IGFjdGlvblZhbHVlLnRvVXBwZXJDYXNlKCk7XHJcbiAgICAgICAgaWYgKHNlcnZpY2Uuc2VsZWN0ZWRPcHRpb24gPT09ICdQT1NUJyB8fCBzZXJ2aWNlLnNlbGVjdGVkT3B0aW9uID09PSAnUEFUQ0gnKSB7XHJcbiAgICAgICAgICAgIGlmIChoZWxsbygnbXNmdCcpLmdldEF1dGhSZXNwb25zZSgpICE9IG51bGwpXHJcbiAgICAgICAgICAgICAgICBzaG93UmVxdWVzdEJvZHlFZGl0b3IoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBpZiAodmVyc2lvblZhbHVlKSB7XHJcbiAgICAgICAgc2VydmljZS5zZWxlY3RlZFZlcnNpb24gPSB2ZXJzaW9uVmFsdWU7XHJcbiAgICB9XHJcbiAgICBpZiAocmVxdWVzdFZhbHVlKSB7XHJcbiAgICAgICAgc2VydmljZS50ZXh0ID0gXCJodHRwczovL2dyYXBoLm1pY3Jvc29mdC5jb20vXCIgKyBzZXJ2aWNlLnNlbGVjdGVkVmVyc2lvbiArIFwiL1wiICsgcmVxdWVzdFZhbHVlO1xyXG4gICAgfVxyXG59XHJcbmZ1bmN0aW9uIGdldFVybHNGcm9tRW50aXR5VHlwZShzZXJ2aWNlLCBlbnRpdHkpIHtcclxuICAgIHZhciBlbnRpdHlUeXBlcyA9IHNlcnZpY2UuY2FjaGUuZ2V0KHNlcnZpY2Uuc2VsZWN0ZWRWZXJzaW9uICsgXCJFbnRpdHlUeXBlRGF0YVwiKTtcclxuICAgIHZhciB0eXBlID0gZW50aXR5VHlwZXNbZW50aXR5Lm5hbWVdO1xyXG4gICAgcmV0dXJuIGNvbWJpbmVVcmxPcHRpb25zV2l0aEN1cnJlbnRVcmwoc2VydmljZSwgT2JqZWN0LmtleXModHlwZS5saW5rcykpO1xyXG59XHJcbmZ1bmN0aW9uIHBhcnNlTWV0YWRhdGEoc2VydmljZSwgJHNjb3BlKSB7XHJcbiAgICB2YXIgZW50aXR5U2V0RGF0YSwgZW50aXR5VHlwZURhdGE7XHJcbiAgICBpZiAoIXNlcnZpY2UuY2FjaGUuZ2V0KHNlcnZpY2Uuc2VsZWN0ZWRWZXJzaW9uICsgXCJNZXRhZGF0YVwiKSkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwicGFyc2luZyBtZXRhZGF0YVwiKTtcclxuICAgICAgICBzZXJ2aWNlLmdldE1ldGFkYXRhKCkudGhlbihmdW5jdGlvbiAocmVzdWx0cykge1xyXG4gICAgICAgICAgICB2YXIgbWV0YWRhdGEgPSByZXN1bHRzLmRhdGE7XHJcbiAgICAgICAgICAgIHNlcnZpY2UuY2FjaGUucHV0KHNlcnZpY2Uuc2VsZWN0ZWRWZXJzaW9uICsgXCJNZXRhZGF0YVwiLCByZXN1bHRzKTtcclxuICAgICAgICAgICAgZW50aXR5U2V0RGF0YSA9IGdldEVudGl0eVNldHMobWV0YWRhdGEpO1xyXG4gICAgICAgICAgICBzZXJ2aWNlLmNhY2hlLnB1dChzZXJ2aWNlLnNlbGVjdGVkVmVyc2lvbiArIFwiRW50aXR5U2V0RGF0YVwiLCBlbnRpdHlTZXREYXRhKTtcclxuICAgICAgICAgICAgZW50aXR5VHlwZURhdGEgPSBnZXRFbnRpdHlUeXBlcyhtZXRhZGF0YSk7XHJcbiAgICAgICAgICAgIHNlcnZpY2UuY2FjaGUucHV0KHNlcnZpY2Uuc2VsZWN0ZWRWZXJzaW9uICsgXCJFbnRpdHlUeXBlRGF0YVwiLCBlbnRpdHlUeXBlRGF0YSk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwibWV0YWRhdGEgc3VjY2Vzc2Z1bGx5IHBhcnNlZFwiKTtcclxuICAgICAgICAgICAgaWYgKHNlcnZpY2UuZW50aXR5ID09IFwiXCIpIHtcclxuICAgICAgICAgICAgICAgIHNlcnZpY2UuZW50aXR5ID0gZW50aXR5VHlwZURhdGFbXCJ1c2VyXCJdO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgc2VydmljZS5lbnRpdHkgPSBlbnRpdHlUeXBlRGF0YVtnZXRFbnRpdHlOYW1lKHNlcnZpY2UudGV4dCldO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICRzY29wZS4kcm9vdC4kYnJvYWRjYXN0KFwidXBkYXRlVXJsT3B0aW9uc1wiKTtcclxuICAgICAgICB9LCBmdW5jdGlvbiAoZXJyLCBzdGF0dXMpIHtcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIm1ldGFkYXRhIGNvdWxkIG5vdCBiZSBwYXJzZWRcIik7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgICAkc2NvcGUuJHJvb3QuJGJyb2FkY2FzdChcInVwZGF0ZVVybE9wdGlvbnNcIik7XHJcbiAgICB9XHJcbn1cclxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YXBpLWV4cGxvcmVyLWhlbHBlcnMuanMubWFwIiwiLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbi8vICBDb3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi4gIEFsbCBSaWdodHMgUmVzZXJ2ZWQuICBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuICBTZWUgTGljZW5zZSBpbiB0aGUgcHJvamVjdCByb290IGZvciBsaWNlbnNlIGluZm9ybWF0aW9uLlxyXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHJcbid1c2Ugc3RyaWN0JztcclxuXHJcbmFuZ3VsYXIubW9kdWxlKCdBcGlFeHBsb3JlcicpXHJcbi5jb25maWcoZnVuY3Rpb24oJGxvY2F0aW9uUHJvdmlkZXIpIHtcclxuICAgICRsb2NhdGlvblByb3ZpZGVyLmh0bWw1TW9kZSh7XHJcbiAgICAgICAgZW5hYmxlZDogdHJ1ZSxcclxuICAgICAgICByZXF1aXJlQmFzZTogZmFsc2UsXHJcbiAgICAgICAgcmV3cml0ZUxpbmtzOiBmYWxzZVxyXG4gICAgfSk7XHJcbiAgICBcclxufSlcclxuLmZhY3RvcnkoJ0FwaUV4cGxvcmVyU3ZjJywgW2Z1bmN0aW9uICgpIHtcclxuICAgIHZhciBhcGlFeHBsb3JlclNlcnZpY2UgPSB7fTtcclxuICAgIHJldHVybiBhcGlFeHBsb3JlclNlcnZpY2U7XHJcbn1dKTsiLCIvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuLy8gIENvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiAgQWxsIFJpZ2h0cyBSZXNlcnZlZC4gIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gIFNlZSBMaWNlbnNlIGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXHJcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cclxuJ3VzZSBzdHJpY3QnO1xyXG5cclxuYW5ndWxhci5tb2R1bGUoJ0FwaUV4cGxvcmVyJylcclxuICAgIC5mYWN0b3J5KCdBcGlFeHBsb3JlclN2YycsIFsnJGh0dHAnLCAnJGNhY2hlRmFjdG9yeScsIGZ1bmN0aW9uICgkaHR0cCwgJGNhY2hlRmFjdG9yeSkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHRleHQ6ICdodHRwczovL2dyYXBoLm1pY3Jvc29mdC5jb20vdjEuMC9tZS8nLFxyXG5cclxuICAgICAgICAgICAgc2VsZWN0ZWRWZXJzaW9uOiBcInYxLjBcIixcclxuXHJcbiAgICAgICAgICAgIHNlbGVjdGVkT3B0aW9uOiBcIkdFVFwiLFxyXG5cclxuICAgICAgICAgICAgc2hvd0pzb25FZGl0b3I6IGZhbHNlLFxyXG5cclxuICAgICAgICAgICAgY2FjaGU6ICRjYWNoZUZhY3RvcnkoJ215Q2FjaGUnKSxcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHBlcmZvcm1Bbm9ueW1vdXNRdWVyeTogZnVuY3Rpb24gKHF1ZXJ5VHlwZSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChxdWVyeSwgcG9zdFN0cmluZywgcmVxdWVzdEhlYWRlcnMpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgaGVhZGVyc09iaiA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJBdXRob3JpemF0aW9uXCI6IFwiQmVhcmVyIHt0b2tlbjpodHRwczovL2dyYXBoLm1pY3Jvc29mdC5jb20vfVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcIkFjY2VwdFwiOiBcImFwcGxpY2F0aW9uL2pzb25cIlxyXG4gICAgICAgICAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXF1ZXN0SGVhZGVycyAmJiByZXF1ZXN0SGVhZGVyc1tcIkF1dGhvcml6YXRpb25cIl0pe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBoZWFkZXJzT2JqW1wiQXV0aG9yaXphdGlvblwiXSA9IHJlcXVlc3RIZWFkZXJzW1wiQXV0aG9yaXphdGlvblwiXTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXF1ZXN0SGVhZGVycyAmJiByZXF1ZXN0SGVhZGVyc1tcIkFjY2VwdFwiXSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGhlYWRlcnNPYmpbXCJBY2NlcHRcIl0gPSByZXF1ZXN0SGVhZGVyc1tcIkFjY2VwdFwiXTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHZhciByZXF1ZXN0ID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB1cmw6ICdodHRwczovL3Byb3h5LmFwaXNhbmRib3gubXNkbi5taWNyb3NvZnQuY29tL3N2Yz91cmw9JyArIGVuY29kZVVSSUNvbXBvbmVudChxdWVyeSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1ldGhvZDogJ0dFVCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGhlYWRlcnM6IGhlYWRlcnNPYmpcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChxdWVyeVR5cGUgPT0gXCJHRVRfQklOQVJZXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVxdWVzdFtcInJlc3BvbnNlVHlwZVwiXSA9IFwiYXJyYXlidWZmZXJcIjtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChxdWVyeVR5cGUgPT0gXCJHRVRfQklOQVJZXCIgfHwgcXVlcnlUeXBlID09IFwiR0VUXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICRodHRwKHJlcXVlc3QpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICBwZXJmb3JtUXVlcnk6IGZ1bmN0aW9uIChxdWVyeVR5cGUpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbiAocXVlcnksIHBvc3RTdHJpbmcsIHJlcXVlc3RIZWFkZXJzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3dpdGNoKHF1ZXJ5VHlwZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFwiR0VUXCI6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gJGh0dHAuZ2V0KHF1ZXJ5LCB7aGVhZGVycyA6IHJlcXVlc3RIZWFkZXJzfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCJHRVRfQklOQVJZXCI6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gJGh0dHAuZ2V0KHF1ZXJ5LCB7cmVzcG9uc2VUeXBlOlwiYXJyYXlidWZmZXJcIn0sIHtoZWFkZXJzIDogcmVxdWVzdEhlYWRlcnN9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBcIlBPU1RcIjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAkaHR0cC5wb3N0KHF1ZXJ5LCBwb3N0U3RyaW5nLCB7aGVhZGVycyA6IHJlcXVlc3RIZWFkZXJzfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCJQQVRDSFwiOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICRodHRwLnBhdGNoKHF1ZXJ5LCBwb3N0U3RyaW5nLCB7aGVhZGVycyA6IHJlcXVlc3RIZWFkZXJzfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCJERUxFVEVcIjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAkaHR0cC5kZWxldGUocXVlcnksIHtoZWFkZXJzIDogcmVxdWVzdEhlYWRlcnN9KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgZ2V0TWV0YWRhdGE6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMucGVyZm9ybUFub255bW91c1F1ZXJ5KFwiR0VUXCIpKFwiaHR0cHM6Ly9ncmFwaC5taWNyb3NvZnQuY29tL1wiICsgdGhpcy5zZWxlY3RlZFZlcnNpb24gKyBcIi8kbWV0YWRhdGFcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XSk7IiwiLy8gVGhpcyBpcyBhIGdlbmVyYXRlZCBmaWxlIGZyb20gYnVuZGxlTG9jRmlsZXMuanMgXG5cbnZhciBsb2Nfc3RyaW5ncyA9IHt9O1xuXG5sb2Nfc3RyaW5nc1snZW4tVVMnXSA9IHtcIlRvIHRyeSB0aGUgZXhwbG9yZXIsIHBsZWFzZSBcIjpcIlRvIHRyeSB0aGUgZXhwbG9yZXIsIHBsZWFzZSBcIixcInNpZ24gaW5cIjpcInNpZ24gaW5cIixcIiB3aXRoIHlvdXIgd29yayBvciBzY2hvb2wgYWNjb3VudCBmcm9tIE1pY3Jvc29mdC5cIjpcIiB3aXRoIHlvdXIgd29yayBvciBzY2hvb2wgYWNjb3VudCBmcm9tIE1pY3Jvc29mdC5cIixcIlN1Ym1pdFwiOlwiU3VibWl0XCIsXCJVc2luZyBkZW1vIHRlbmFudFwiOlwiVXNpbmcgZGVtbyB0ZW5hbnRcIixcInNpZ24gb3V0XCI6XCJzaWduIG91dFwiLFwiSGlzdG9yeVwiOlwiSGlzdG9yeVwiLFwiTWV0aG9kXCI6XCJNZXRob2RcIixcIlF1ZXJ5XCI6XCJRdWVyeVwiLFwiU3RhdHVzIENvZGVcIjpcIlN0YXR1cyBDb2RlXCIsXCJEdXJhdGlvblwiOlwiRHVyYXRpb25cIixcIkdvXCI6XCJHb1wiLFwiWUVTXCI6XCJZRVNcIixcIk5PXCI6XCJOT1wiLFwicmVxdWVzdCBoZWFkZXJcIjpcInJlcXVlc3QgaGVhZGVyXCIsXCJyZXF1ZXN0IGJvZHlcIjpcInJlcXVlc3QgYm9keVwiLFwicmVzcG9uc2VcIjpcInJlc3BvbnNlXCIsXCJsb2dpbl90b19zZW5kX3JlcXVlc3RzXCI6XCJMb2dpbiB0byBjaGFuZ2UgdGhlIHJlcXVlc3QgdHlwZVwifVxuXG5sb2Nfc3RyaW5nc1snZnItRlInXSA9IHtcIlRvIHRyeSB0aGUgZXhwbG9yZXIsIHBsZWFzZSBcIjpcIlBvdXIgZXNzYXllciBs4oCZYWZmaWNoZXVyLCB2ZXVpbGxleiBcIixcInNpZ24gaW5cIjpcInNlIGNvbm5lY3RlclwiLFwiIHdpdGggeW91ciB3b3JrIG9yIHNjaG9vbCBhY2NvdW50IGZyb20gTWljcm9zb2Z0LlwiOlwiIGF2ZWMgdm90cmUgY29tcHRlIHNjb2xhaXJlIG91IHByb2Zlc3Npb25uZWwgZGUgTWljcm9zb2Z0LlwiLFwiU3VibWl0XCI6XCJFbnZveWVyXCIsXCJVc2luZyBkZW1vIHRlbmFudFwiOlwiw4AgbOKAmWFpZGUgZHUgY2xpZW50IGRlIGTDqW1vbnN0cmF0aW9uXCIsXCJzaWduIG91dFwiOlwic2UgZMOpY29ubmVjdGVyXCIsXCJIaXN0b3J5XCI6XCJIaXN0b3JpcXVlXCIsXCJNZXRob2RcIjpcIk3DqXRob2RlXCIsXCJRdWVyeVwiOlwiUmVxdcOqdGVcIixcIlN0YXR1cyBDb2RlXCI6XCJDb2RlIGQnw6l0YXRcIixcIkR1cmF0aW9uXCI6XCJEdXLDqWVcIixcIkdvXCI6XCJSZWNoZXJjaGVyXCIsXCJZRVNcIjpcIk9VSVwiLFwiTk9cIjpcIk5PTlwiLFwicmVxdWVzdCBoZWFkZXJcIjpcImVuLXTDqnRlIGRlIGxhIGRlbWFuZGVcIixcInJlcXVlc3QgYm9keVwiOlwiY29ycHMgZGUgbGEgZGVtYW5kZVwiLFwicmVzcG9uc2VcIjpcInLDqXBvbnNlXCJ9XG5cbmxvY19zdHJpbmdzWydlcy1FUyddID0ge1wiVG8gdHJ5IHRoZSBleHBsb3JlciwgcGxlYXNlIFwiOlwiUGFyYSB1dGlsaXphciBlbCBwcm9iYWRvciwgXCIsXCJzaWduIGluXCI6XCJpbmljaWFyIHNlc2nDs25cIixcIiB3aXRoIHlvdXIgd29yayBvciBzY2hvb2wgYWNjb3VudCBmcm9tIE1pY3Jvc29mdC5cIjpcIiBjb24gc3UgY3VlbnRhIHByb2Zlc2lvbmFsIG8gZWR1Y2F0aXZhIGRlIE1pY3Jvc29mdC5cIixcIlN1Ym1pdFwiOlwiRW52aWFyXCIsXCJVc2luZyBkZW1vIHRlbmFudFwiOlwiVXNvIGRlIGlucXVpbGlub3MgZGUgZGVtb3N0cmFjacOzblwiLFwic2lnbiBvdXRcIjpcImNlcnJhciBzZXNpw7NuXCIsXCJIaXN0b3J5XCI6XCJIaXN0b3JpYWxcIixcIk1ldGhvZFwiOlwiTcOpdG9kb1wiLFwiUXVlcnlcIjpcIkNvbnN1bHRhXCIsXCJTdGF0dXMgQ29kZVwiOlwiQ8OzZGlnbyBkZSBlc3RhZG9cIixcIkR1cmF0aW9uXCI6XCJEdXJhY2nDs25cIixcIkdvXCI6XCJJclwiLFwiWUVTXCI6XCJTw41cIixcIk5PXCI6XCJOT1wiLFwicmVxdWVzdCBoZWFkZXJcIjpcImVuY2FiZXphZG8gZGUgc29saWNpdHVkXCIsXCJyZXF1ZXN0IGJvZHlcIjpcImN1ZXJwbyBkZSBzb2xpY2l0dWRcIixcInJlc3BvbnNlXCI6XCJyZXNwdWVzdGFcIn1cblxubG9jX3N0cmluZ3NbJ2phLUpQJ10gPSB7XCJUbyB0cnkgdGhlIGV4cGxvcmVyLCBwbGVhc2UgXCI6XCLjgqjjgq/jgrnjg5fjg63jg7zjg6njg7zjgpLjgYroqabjgZfjgYTjgZ/jgaDjgY/jgavjga/jgIFNaWNyb3NvZnQg44Gu6IG35aC044G+44Gf44Gv5a2m5qCh44Ki44Kr44Km44Oz44OI44GnIFwiLFwic2lnbiBpblwiOlwi44K144Kk44Oz44Kk44OzXCIsXCIgd2l0aCB5b3VyIHdvcmsgb3Igc2Nob29sIGFjY291bnQgZnJvbSBNaWNyb3NvZnQuXCI6XCIg44GX44G+44GZ44CCXCIsXCJTdWJtaXRcIjpcIumAgeS/oVwiLFwiVXNpbmcgZGVtbyB0ZW5hbnRcIjpcIuODh+ODoiDjg4bjg4rjg7Pjg4jjgpLkvb/nlKjjgZfjgabjgYTjgb7jgZlcIixcInNpZ24gb3V0XCI6XCLjgrXjgqTjg7PjgqLjgqbjg4hcIixcIkhpc3RvcnlcIjpcIuWxpeattFwiLFwiTWV0aG9kXCI6XCLjg6Hjgr3jg4Pjg4lcIixcIlF1ZXJ5XCI6XCLjgq/jgqjjg6pcIixcIlN0YXR1cyBDb2RlXCI6XCLnirbmhYvjgrPjg7zjg4lcIixcIkR1cmF0aW9uXCI6XCLmnJ/plpNcIixcIkdvXCI6XCLmpJzntKJcIixcIllFU1wiOlwi44Gv44GEXCIsXCJOT1wiOlwi44GE44GE44GIXCIsXCJyZXF1ZXN0IGhlYWRlclwiOlwi6KaB5rGC44OY44OD44OA44O8XCIsXCJyZXF1ZXN0IGJvZHlcIjpcIuimgeaxguacrOaWh1wiLFwicmVzcG9uc2VcIjpcIuW/nOetlFwifVxuXG5sb2Nfc3RyaW5nc1snZGUtREUnXSA9IHtcIlRvIHRyeSB0aGUgZXhwbG9yZXIsIHBsZWFzZSBcIjpcIlVtIGRlbiBUZXN0ZXIgYXVzenVwcm9iaWVyZW4sIFwiLFwic2lnbiBpblwiOlwiQW5tZWxkZW5cIixcIiB3aXRoIHlvdXIgd29yayBvciBzY2hvb2wgYWNjb3VudCBmcm9tIE1pY3Jvc29mdC5cIjpcIiBtaXQgSWhyZW0gR2VzY2jDpGZ0cy0gb2RlciBTY2h1bGtvbnRvIHZvbiBNaWNyb3NvZnQgYW4uXCIsXCJTdWJtaXRcIjpcIlNlbmRlblwiLFwiVXNpbmcgZGVtbyB0ZW5hbnRcIjpcIlZlcndlbmRlbiBkZXMgRGVtb21hbmRhbnRlblwiLFwic2lnbiBvdXRcIjpcIkFibWVsZGVuXCIsXCJIaXN0b3J5XCI6XCJWZXJsYXVmXCIsXCJNZXRob2RcIjpcIk1ldGhvZGVcIixcIlF1ZXJ5XCI6XCJBYmZyYWdlXCIsXCJTdGF0dXMgQ29kZVwiOlwiU3RhdHVzY29kZVwiLFwiRHVyYXRpb25cIjpcIkRhdWVyXCIsXCJHb1wiOlwiT0tcIixcIllFU1wiOlwiSkFcIixcIk5PXCI6XCJORUlOXCIsXCJyZXF1ZXN0IGhlYWRlclwiOlwiQW5mb3JkZXJ1bmdzaGVhZGVyXCIsXCJyZXF1ZXN0IGJvZHlcIjpcIkFuZm9yZGVydW5nc3RleHRrw7ZycGVyXCIsXCJyZXNwb25zZVwiOlwiQW50d29ydFwifVxuXG5sb2Nfc3RyaW5nc1snemgtQ04nXSA9IHtcIlRvIHRyeSB0aGUgZXhwbG9yZXIsIHBsZWFzZSBcIjpcIuiLpeimgeWwneivlea1j+iniOWZqO+8jOivtyDkvb/nlKjkvaDnmoQgTWljcm9zb2Z0IOW3peS9nOaIluWtpuagoeW4kOaIt1wiLFwic2lnbiBpblwiOlwi55m75b2VXCIsXCIgd2l0aCB5b3VyIHdvcmsgb3Igc2Nob29sIGFjY291bnQgZnJvbSBNaWNyb3NvZnQuXCI6XCLjgIJcIixcIlN1Ym1pdFwiOlwi5o+Q5LqkXCIsXCJVc2luZyBkZW1vIHRlbmFudFwiOlwi5L2/55So5ryU56S656ef5oi3XCIsXCJzaWduIG91dFwiOlwi5rOo6ZSAXCIsXCJIaXN0b3J5XCI6XCLljoblj7LorrDlvZVcIixcIk1ldGhvZFwiOlwi5pa55rOVXCIsXCJRdWVyeVwiOlwi5p+l6K+iXCIsXCJTdGF0dXMgQ29kZVwiOlwi54q25oCB5Luj56CBXCIsXCJEdXJhdGlvblwiOlwi5oyB57ut5pe26Ze0XCIsXCJHb1wiOlwi6L2s5YiwXCIsXCJZRVNcIjpcIuaYr1wiLFwiTk9cIjpcIuWQplwiLFwicmVxdWVzdCBoZWFkZXJcIjpcIuivt+axguagh+mimFwiLFwicmVxdWVzdCBib2R5XCI6XCLor7fmsYLmraPmlodcIixcInJlc3BvbnNlXCI6XCLlk43lupRcIn1cblxubG9jX3N0cmluZ3NbJ3B0LUJSJ10gPSB7XCJUbyB0cnkgdGhlIGV4cGxvcmVyLCBwbGVhc2UgXCI6XCJQYXJhIGV4cGVyaW1lbnRhciBvIEV4cGxvcmFkb3IsIFwiLFwic2lnbiBpblwiOlwiZW50cmFyXCIsXCIgd2l0aCB5b3VyIHdvcmsgb3Igc2Nob29sIGFjY291bnQgZnJvbSBNaWNyb3NvZnQuXCI6XCIgY29tIGEgc3VhIGNvbnRhIGNvcnBvcmF0aXZhIG91IGRlIGVzdHVkYW50ZSBkYSBNaWNyb3NvZnQuXCIsXCJTdWJtaXRcIjpcIkVudmlhclwiLFwiVXNpbmcgZGVtbyB0ZW5hbnRcIjpcIlVzYW5kbyBvIExvY2F0w6FyaW8gZGUgRGVtb25zdHJhw6fDo29cIixcInNpZ24gb3V0XCI6XCJzYWlyXCIsXCJIaXN0b3J5XCI6XCJIaXN0w7NyaWNvXCIsXCJNZXRob2RcIjpcIk3DqXRvZG9cIixcIlF1ZXJ5XCI6XCJDb25zdWx0YVwiLFwiU3RhdHVzIENvZGVcIjpcIkPDs2RpZ28gZGUgU3RhdHVzXCIsXCJEdXJhdGlvblwiOlwiRHVyYcOnw6NvXCIsXCJHb1wiOlwiSXJcIixcIllFU1wiOlwiU0lNXCIsXCJOT1wiOlwiTsODT1wiLFwicmVxdWVzdCBoZWFkZXJcIjpcImNhYmXDp2FsaG8gZGEgc29saWNpdGHDp8Ojb1wiLFwicmVxdWVzdCBib2R5XCI6XCJjb3JwbyBkYSBzb2xpY2l0YcOnw6NvXCIsXCJyZXNwb25zZVwiOlwicmVzcG9zdGFcIn1cblxubG9jX3N0cmluZ3NbJ3J1LVJVJ10gPSB7XCJUbyB0cnkgdGhlIGV4cGxvcmVyLCBwbGVhc2UgXCI6XCLQp9GC0L7QsdGLINC+0L/RgNC+0LHQvtCy0LDRgtGMINC/0LXRgdC+0YfQvdC40YbRgywgXCIsXCJzaWduIGluXCI6XCLQstC+0LnRgtC4XCIsXCIgd2l0aCB5b3VyIHdvcmsgb3Igc2Nob29sIGFjY291bnQgZnJvbSBNaWNyb3NvZnQuXCI6XCIg0YEg0L/QvtC80L7RidGM0Y4g0YDQsNCx0L7Rh9C10Lkg0LjQu9C4INGD0YfQtdCx0L3QvtC5INGD0YfQtdGC0L3QvtC5INC30LDQv9C40YHQuCDQvtGCINC60L7RgNC/0L7RgNCw0YbQuNC4INCc0LDQudC60YDQvtGB0L7RhNGCLlwiLFwiU3VibWl0XCI6XCLQntGC0L/RgNCw0LLQuNGC0YxcIixcIlVzaW5nIGRlbW8gdGVuYW50XCI6XCLQoSDQv9C+0LzQvtGJ0YzRjiDQtNC10LzQvtC90YHRgtGA0LDRhtC40L7QvdC90L7Qs9C+INC60LvQuNC10L3RgtCwXCIsXCJzaWduIG91dFwiOlwi0LLRi9C50YLQuFwiLFwiSGlzdG9yeVwiOlwi0JbRg9GA0L3QsNC7XCIsXCJNZXRob2RcIjpcItCc0LXRgtC+0LRcIixcIlF1ZXJ5XCI6XCLQl9Cw0L/RgNC+0YFcIixcIlN0YXR1cyBDb2RlXCI6XCLQmtC+0LQg0YHQvtGB0YLQvtGP0L3QuNGPXCIsXCJEdXJhdGlvblwiOlwi0JTQu9C40YLQtdC70YzQvdC+0YHRgtGMXCIsXCJHb1wiOlwi0J/QtdGA0LXQudGC0LhcIixcIllFU1wiOlwi0JTQkFwiLFwiTk9cIjpcItCd0JXQolwiLFwicmVxdWVzdCBoZWFkZXJcIjpcItC30LDQs9C+0LvQvtCy0L7QuiDQt9Cw0L/RgNC+0YHQsFwiLFwicmVxdWVzdCBib2R5XCI6XCLRgtC10LrRgdGCINC30LDQv9GA0L7RgdCwXCIsXCJyZXNwb25zZVwiOlwi0L7RgtCy0LXRglwifSIsIi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4vLyAgQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uICBBbGwgUmlnaHRzIFJlc2VydmVkLiAgTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiAgU2VlIExpY2Vuc2UgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cclxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcblxyXG52YXIgcztcclxuYW5ndWxhci5tb2R1bGUoJ0FwaUV4cGxvcmVyJylcclxuICAgIC5jb250cm9sbGVyKCdBcGlFeHBsb3JlckN0cmwnLCBbJyRzY29wZScsICckaHR0cCcsICckbG9jYXRpb24nLCAnQXBpRXhwbG9yZXJTdmMnLCAnJHRpbWVvdXQnLCAnJHRlbXBsYXRlQ2FjaGUnLCAnJG1kRGlhbG9nJywgJyRzY2UnLCBmdW5jdGlvbiAoJHNjb3BlLCAkaHR0cCwgJGxvY2F0aW9uLCBhcGlTZXJ2aWNlLCAkdGltZW91dCwgJHRlbXBsYXRlQ2FjaGUsICRtZERpYWxvZywgJHNjZSApIHtcclxuXHJcbiAgICAgICAgcyA9ICRzY29wZTtcclxuICAgICAgICAkc2NvcGUudXNlckluZm8gPSB7fTtcclxuXHJcbiAgICAgICAgJHNjb3BlLmdldEFzc2V0UGF0aCA9IGZ1bmN0aW9uKHJlbFBhdGgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHMucGF0aFRvQnVpbGREaXIgKyBcIi9cIisgcmVsUGF0aDtcclxuICAgICAgICB9XHJcbiAgXHJcbiAgICAgICAgJHNjb3BlLmZpbmlzaEFkbWluQ29uc2VydEZsb3cgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgLy8gc2lsZW50bHkgZ2V0IGEgbmV3IGFjY2VzcyB0b2tlbiB3aXRoIHRoZSBhZG1pbiBzY29wZXNcclxuICAgICAgICAgICAgaGVsbG8oJ21zZnRfdG9rZW5fcmVmcmVzaCcpLmxvZ2luKHtcclxuICAgICAgICAgICAgICAgIGRpc3BsYXk6ICdwb3B1cCcsXHJcbiAgICAgICAgICAgICAgICByZXNwb25zZV90eXBlOiBcInRva2VuXCIsXHJcbiAgICAgICAgICAgICAgICByZWRpcmVjdF91cmk6ICRzY29wZS5yZWRpcmVjdFVybCxcclxuICAgICAgICAgICAgICAgIHNjb3BlOiAkc2NvcGUuc2NvcGVzICsgXCIgXCIgKyAkc2NvcGUuYWRtaW5TY29wZXMsXHJcbiAgICAgICAgICAgICAgICByZXNwb25zZV9tb2RlOiAnZnJhZ21lbnQnLFxyXG4gICAgICAgICAgICAgICAgcHJvbXB0OiAnbm9uZScsXHJcbiAgICAgICAgICAgICAgICBkb21haW5faGludDogJ29yZ2FuaXphdGlvbnMnLFxyXG4gICAgICAgICAgICAgICAgbG9naW5faGludDogJHNjb3BlLnVzZXJJbmZvLnByZWZlcnJlZF91c2VybmFtZVxyXG4gICAgICAgICAgICB9LCBmdW5jdGlvbihyZXMpIHtcclxuICAgICAgICAgICAgICAgIGlmIChyZXMuYXV0aFJlc3BvbnNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGFjY2Vzc1Rva2VuID0gcmVzLmF1dGhSZXNwb25zZS5hY2Nlc3NfdG9rZW47XHJcbiAgICAgICAgICAgICAgICAgICAgJGh0dHAuZGVmYXVsdHMuaGVhZGVycy5jb21tb25bJ0F1dGhvcml6YXRpb24nXSA9ICdCZWFyZXIgJyArIGFjY2Vzc1Rva2VuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LCBmdW5jdGlvbihyZXMpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IocmVzKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBoZWxsby5vbignYXV0aC5sb2dpbicsIGZ1bmN0aW9uIChhdXRoKSB7XHJcbiAgICAgICAgICAgIHZhciBhY2Nlc3NUb2tlbjtcclxuXHJcbiAgICAgICAgICAgIGlmIChhdXRoLm5ldHdvcmsgPT0gXCJtc2Z0X3Rva2VuX3JlZnJlc2hcIikge1xyXG4gICAgICAgICAgICAgICAgYWNjZXNzVG9rZW4gPSBoZWxsbygnbXNmdF90b2tlbl9yZWZyZXNoJykuZ2V0QXV0aFJlc3BvbnNlKCkuYWNjZXNzX3Rva2VuO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGF1dGgubmV0d29yayA9PSBcIm1zZnRcIikge1xyXG4gICAgICAgICAgICAgICAgdmFyIGF1dGhSZXNwb25zZSA9IGhlbGxvKCdtc2Z0JykuZ2V0QXV0aFJlc3BvbnNlKClcclxuXHJcbiAgICAgICAgICAgICAgICBhY2Nlc3NUb2tlbiA9IGF1dGhSZXNwb25zZS5hY2Nlc3NfdG9rZW47XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIGp3dDtcclxuICAgICAgICAgICAgICAgIGlmICgnaWRfdG9rZW4nIGluIGF1dGhSZXNwb25zZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGp3dCA9IGF1dGhSZXNwb25zZVsnaWRfdG9rZW4nXTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgZGVjb2RlZEp3dCA9IGp3dF9kZWNvZGUoand0KTtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgJHNjb3BlLnVzZXJJbmZvID0ge1xyXG4gICAgICAgICAgICAgICAgICAgIHByZWZlcnJlZF91c2VybmFtZTogZGVjb2RlZEp3dC5wcmVmZXJyZWRfdXNlcm5hbWVcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAkc2NvcGUuJGFwcGx5KCk7XHJcblxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoYWNjZXNzVG9rZW4pIHtcclxuICAgICAgICAgICAgICAgICRodHRwLmRlZmF1bHRzLmhlYWRlcnMuY29tbW9uWydBdXRob3JpemF0aW9uJ10gPSAnQmVhcmVyICcgKyBhY2Nlc3NUb2tlbjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIFxyXG4gICAgICAgICRzY29wZS50YWJDb25maWcgPSB7XHJcbiAgICAgICAgICAgIGRpc2FibGVSZXF1ZXN0Qm9keUVkaXRvcjogdHJ1ZSxcclxuICAgICAgICAgICAgaGlkZUNvbnRlbnQ6IHRydWUsXHJcbiAgICAgICAgICAgIHNlbGVjdGVkOiAwXHJcbiAgICAgICAgfVxyXG4gICAgICAgICRzY29wZS5zaG93SW1hZ2UgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgJHNjb3BlLnRhYkNvbmZpZy5wcmV2aW91c1NlbGVjdGVkID0gJHNjb3BlLnRhYkNvbmZpZy5zZWxlY3RlZDtcclxuICAgICAgICAkc2NvcGUucHJvY2Vzc1RhYkNsaWNrID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHZhciBzd2l0Y2hpbmdUYWJzID0gJHNjb3BlLnRhYkNvbmZpZy5wcmV2aW91c1NlbGVjdGVkICE9ICRzY29wZS50YWJDb25maWcuc2VsZWN0ZWQ7XHJcbiAgICAgICAgICAgIGlmICghc3dpdGNoaW5nVGFicylcclxuICAgICAgICAgICAgICAgICRzY29wZS50YWJDb25maWcuaGlkZUNvbnRlbnQgPSAhJHNjb3BlLnRhYkNvbmZpZy5oaWRlQ29udGVudDtcclxuICAgICAgICAgICAgJHNjb3BlLnRhYkNvbmZpZy5wcmV2aW91c1NlbGVjdGVkID0gJHNjb3BlLnRhYkNvbmZpZy5zZWxlY3RlZDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIEZvciBkZWVwIGxpbmtpbmcgaW50byB0aGUgR3JhcGggRXhwbG9yZXJcclxuICAgICAgICB2YXIgcmVxdWVzdFZhbCA9ICRsb2NhdGlvbi5zZWFyY2goKS5yZXF1ZXN0O1xyXG4gICAgICAgIHZhciBhY3Rpb25WYWwgPSAkbG9jYXRpb24uc2VhcmNoKCkubWV0aG9kO1xyXG4gICAgICAgIHZhciBib2R5VmFsID0gJGxvY2F0aW9uLnNlYXJjaCgpLmJvZHk7XHJcbiAgICAgICAgdmFyIHZlcnNpb25WYWwgPSAkbG9jYXRpb24uc2VhcmNoKCkudmVyc2lvbjtcclxuICAgICAgICB2YXIgaGVhZGVyc1ZhbCA9ICRsb2NhdGlvbi5zZWFyY2goKS5oZWFkZXJzO1xyXG4gICAgICAgIFxyXG5cclxuICAgICAgICBoYW5kbGVRdWVyeVN0cmluZyhhcGlTZXJ2aWNlLCBhY3Rpb25WYWwsIHZlcnNpb25WYWwsIHJlcXVlc3RWYWwpO1xyXG4gICAgICAgIFxyXG4gICAgICAgICR0aW1lb3V0KGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBpbml0aWFsaXplSnNvbkVkaXRvckhlYWRlcnMoJHNjb3BlLCBoZWFkZXJzVmFsKTtcclxuICAgICAgICAgICAgaW5pdGlhbGl6ZUpzb25WaWV3ZXIoJHNjb3BlLCBhcGlTZXJ2aWNlKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcGFyc2VNZXRhZGF0YShhcGlTZXJ2aWNlLCAkc2NvcGUpO1xyXG5cclxuICAgICAgICAkc2NvcGUuaXNBdXRoZW50aWNhdGVkID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHZhciBzZXNzaW9uID0gaGVsbG8oJ21zZnQnKS5nZXRBdXRoUmVzcG9uc2UoKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChzZXNzaW9uID09PSBudWxsKSByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIHZhciBjdXJyZW50VGltZSA9IChuZXcgRGF0ZSgpKS5nZXRUaW1lKCkgLyAxMDAwO1xyXG4gICAgICAgICAgICByZXR1cm4gc2Vzc2lvbiAmJiBzZXNzaW9uLmFjY2Vzc190b2tlbiAmJiBzZXNzaW9uLmV4cGlyZXMgPiBjdXJyZW50VGltZTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAkc2NvcGUuJHdhdGNoKFwiZ2V0RWRpdG9yKClcIiwgZnVuY3Rpb24oZXZlbnQsIGFyZ3MpIHtcclxuICAgICAgICAgICAgaW5pdGlhbGl6ZUpzb25FZGl0b3IoJHNjb3BlLCBib2R5VmFsKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy8gaHR0cHM6Ly9kb2NzLm1pY3Jvc29mdC5jb20vZW4tdXMvYXp1cmUvYWN0aXZlLWRpcmVjdG9yeS9hY3RpdmUtZGlyZWN0b3J5LXYyLXByb3RvY29scy1pbXBsaWNpdFxyXG4gICAgICAgICRzY29wZS5sb2dpbiA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaGVsbG8oJ21zZnQnKS5sb2dpbih7XHJcbiAgICAgICAgICAgICAgICBkaXNwbGF5OiAncGFnZScsXHJcbiAgICAgICAgICAgICAgICByZXNwb25zZV90eXBlOiBcImlkX3Rva2VuIHRva2VuXCIsXHJcbiAgICAgICAgICAgICAgICBub25jZTogJ2dyYXBoX2V4cGxvcmVyJyxcclxuICAgICAgICAgICAgICAgIHByb21wdDogJ2xvZ2luJyxcclxuICAgICAgICAgICAgICAgIG1zYWZlZDogMFxyXG4gICAgICAgICAgICB9LCBmdW5jdGlvbihyZXMpIHtcclxuXHJcbiAgICAgICAgICAgIH0sIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcignZXJyb3Igc2lnbmluZyBpbicpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAkc2NvcGUubG9nb3V0ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAvLyBjaGFuZ2UgdG8gR0VUIGFuZCBzaG93IHJlcXVlc3QgaGVhZGVyIHRhYlxyXG4gICAgICAgICAgICBhcGlTZXJ2aWNlLnNlbGVjdGVkT3B0aW9uID0gXCJHRVRcIjtcclxuICAgICAgICAgICAgJHNjb3BlLnRhYkNvbmZpZy5kaXNhYmxlUmVxdWVzdEJvZHlFZGl0b3IgPSB0cnVlO1xyXG4gICAgICAgICAgICBzZXRTZWxlY3RlZFRhYigwKTtcclxuXHJcbiAgICAgICAgICAgIGhlbGxvKCdtc2Z0JykubG9nb3V0KG51bGwsIHtmb3JjZTp0cnVlfSk7XHJcbiAgICAgICAgICAgIGRlbGV0ZSAkc2NvcGUudXNlckluZm87XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgJHNjb3BlLmlzQWN0aXZlID0gZnVuY3Rpb24gKHZpZXdMb2NhdGlvbikge1xyXG4gICAgICAgICAgICByZXR1cm4gdmlld0xvY2F0aW9uID09PSAkbG9jYXRpb24ucGF0aCgpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgICRzY29wZS5zZWFyY2hUZXh0ID0gXCJcIjtcclxuICAgICAgICAkc2NvcGUuc2V0U2VhcmNoVGV4dCA9IGZ1bmN0aW9uKHRleHQpIHtcclxuICAgICAgICAgICAgJHNjb3BlLnNlYXJjaFRleHQgPSB0ZXh0O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgJHNjb3BlLmdldFNlYXJjaFRleHQgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgcmV0dXJuICRzY29wZS5zZWFyY2hUZXh0O1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgICRzY29wZS5nZXRDdXJyZW50RW50aXR5TmFtZSA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBpZiAoISRzY29wZS5zZWFyY2hUZXh0KSByZXR1cm4gbnVsbDtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHZhciB0eHQgPSAkc2NvcGUuc2VhcmNoVGV4dDtcclxuICAgICAgICAgICAgdmFyIHBhdGhBcnIgPSB0eHQuc3BsaXQoXCIvXCIpLmZpbHRlcigoZnVuY3Rpb24oYSkgeyByZXR1cm4gYS5sZW5ndGggPiAwfSkpO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHBhdGhBcnIucG9wKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAkc2NvcGUuY2FuSW5zZXJ0VGVtcGxhdGUgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGFwaVNlcnZpY2Uuc2VsZWN0ZWRPcHRpb24gPT0gXCJQT1NUXCIgJiYgY2hlY2tDYW5JbnNlcnRUZW1wbGF0ZSgkc2NvcGUuc2VhcmNoVGV4dCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAkc2NvcGUuaW5zZXJ0UG9zdFRlbXBsYXRlID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHZhciBlbnRpdHkgPSAkc2NvcGUuZ2V0Q3VycmVudEVudGl0eU5hbWUoKTtcclxuICAgICAgICAgICAgdmFyIHN0clRvSW5zZXJ0ID0gSlNPTi5zdHJpbmdpZnkocG9zdFRlbXBsYXRlc1tlbnRpdHldLCBudWxsLCAyKS50cmltKCk7XHJcblxyXG4gICAgICAgICAgICB2YXIgZnVsbFVzZXJFbWFpbCA9ICRzY29wZS51c2VySW5mby5wcmVmZXJyZWRfdXNlcm5hbWU7XHJcbiAgICAgICAgICAgIHZhciBkb21haW4gPSBmdWxsVXNlckVtYWlsLnNwbGl0KFwiQFwiKVsxXTtcclxuXHJcbiAgICAgICAgICAgIHN0clRvSW5zZXJ0ID0gc3RyVG9JbnNlcnQucmVwbGFjZSgvQVVUSEVOVElDQVRFRF9ET01BSU4vZywgZG9tYWluKTtcclxuICAgICAgICAgICAgc3RyVG9JbnNlcnQgPSBzdHJUb0luc2VydC5yZXBsYWNlKC9GVUxMX1VTRVJfRU1BSUwvZywgZnVsbFVzZXJFbWFpbCk7XHJcbiAgICAgICAgICAgIFxyXG5cclxuICAgICAgICAgICAgaW5pdGlhbGl6ZUpzb25FZGl0b3IoJHNjb3BlLCBzdHJUb0luc2VydCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiBjaGVja0Nhbkluc2VydFRlbXBsYXRlKFVSTCkge3NcclxuICAgICAgICAgICAgLy8gZ2V0ICdtZXNzYWdlcycgZnJvbSAnaHR0cHM6Ly9ncmFwaC5taWNyb3NvZnQuY29tL3YxLjAvbWUvbWVzc2FnZXMnXHJcbiAgICAgICAgICAgIHZhciBlbnRpdHkgPSAkc2NvcGUuZ2V0Q3VycmVudEVudGl0eU5hbWUoKVxyXG4gICAgICAgICAgICB2YXIgY2FuSW5zZXJ0VGVtcGxhdGUgPSBlbnRpdHkgaW4gcG9zdFRlbXBsYXRlcztcclxuICAgICAgICAgICAgcmV0dXJuIGNhbkluc2VydFRlbXBsYXRlO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgICRzY29wZS5zaG93U2hhcmVEaWFsb2cgPSBmdW5jdGlvbihldikge1xyXG4gICAgICAgICAgICAkbWREaWFsb2cuc2hvdyh7XHJcbiAgICAgICAgICAgICAgICBjb250cm9sbGVyOiBTaGFyZURpYWxvZ0NvbnRyb2xsZXIsXHJcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogcGF0aFRvQnVpbGREaXIgKyAnL2Fzc2V0cy92aWV3cy9zaGFyZURpYWxvZy50bXBsLmh0bWwnLFxyXG4gICAgICAgICAgICAgICAgcGFyZW50OiBhbmd1bGFyLmVsZW1lbnQoZG9jdW1lbnQuYm9keSksXHJcbiAgICAgICAgICAgICAgICB0YXJnZXRFdmVudDogZXYsXHJcbiAgICAgICAgICAgICAgICBjbGlja091dHNpZGVUb0Nsb3NlOnRydWUsXHJcbiAgICAgICAgICAgICAgICBzY29wZTogJHNjb3BlLiRuZXcoKSxcclxuICAgICAgICAgICAgICAgIGxvY2Fsczoge1xyXG4gICAgICAgICAgICAgICAgICAgIGFwaVNlcnZpY2U6IGFwaVNlcnZpY2UsXHJcbiAgICAgICAgICAgICAgICAgICAgJHNjZTogJHNjZSxcclxuICAgICAgICAgICAgICAgICAgICBoZWFkZXJzOiBmb3JtYXRSZXF1ZXN0SGVhZGVycygkc2NvcGUuanNvbkVkaXRvckhlYWRlcnMuZ2V0U2Vzc2lvbigpLmdldFZhbHVlKCkpLFxyXG4gICAgICAgICAgICAgICAgICAgIGJvZHk6IGdldEpzb25WaWV3ZXIoKS5nZXRTZXNzaW9uKCkuZ2V0VmFsdWUoKVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24oYW5zd2VyKSB7XHJcbiAgICAgICAgICAgICAgICAkc2NvcGUuc3RhdHVzID0gJ1lvdSBzYWlkIHRoZSBpbmZvcm1hdGlvbiB3YXMgXCInICsgYW5zd2VyICsgJ1wiLic7XHJcbiAgICAgICAgICAgIH0sIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgJHNjb3BlLnN0YXR1cyA9ICdZb3UgY2FuY2VsbGVkIHRoZSBkaWFsb2cuJztcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfTtcclxuXHJcbn1dKTtcclxuXHJcbmFuZ3VsYXIubW9kdWxlKCdBcGlFeHBsb3JlcicpXHJcbiAgICAuY29udHJvbGxlcignRHJvcGRvd25DdHJsJywgWyckc2NvcGUnLCAnQXBpRXhwbG9yZXJTdmMnLCBmdW5jdGlvbiAoJHNjb3BlLCBhcGlTZXJ2aWNlKSB7XHJcblxyXG4gICAgICAgICRzY29wZS5zZWxlY3RlZE9wdGlvbiA9IGFwaVNlcnZpY2Uuc2VsZWN0ZWRPcHRpb247XHJcblxyXG4gICAgICAgICRzY29wZS5vbkl0ZW1DbGljayA9IGZ1bmN0aW9uKGNob2ljZSkge1xyXG4gICAgICAgICAgICAkc2NvcGUuc2VsZWN0ZWRPcHRpb24gPSBjaG9pY2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAkc2NvcGUuaXRlbXMgPSBbXHJcbiAgICAgICAgICAgICdHRVQnLFxyXG4gICAgICAgICAgICAnUE9TVCcsXHJcbiAgICAgICAgICAgICdQQVRDSCcsXHJcbiAgICAgICAgICAgICdERUxFVEUnXHJcbiAgICAgICAgXTtcclxuXHJcbiAgICAgICAgJHNjb3BlLmdldFNlcnZpY2VPcHRpb24gPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGFwaVNlcnZpY2Uuc2VsZWN0ZWRPcHRpb247XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAkc2NvcGUuZ2V0T3B0aW9uID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAkc2NvcGUuc2VsZWN0ZWRPcHRpb247XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAkc2NvcGUuJHdhdGNoKFwiZ2V0T3B0aW9uKClcIiwgZnVuY3Rpb24obmV3VmFsLCBvbGRWYWwpIHtcclxuICAgICAgICAgICAgaWYgKG9sZFZhbCAhPT0gbmV3VmFsKSB7XHJcbiAgICAgICAgICAgICAgICBhcGlTZXJ2aWNlLnNlbGVjdGVkT3B0aW9uID0gJHNjb3BlLnNlbGVjdGVkT3B0aW9uO1xyXG4gICAgICAgICAgICAgICAgYXBpU2VydmljZS50ZXh0ID0gYXBpU2VydmljZS50ZXh0LnJlcGxhY2UoL2h0dHBzOlxcL1xcL2dyYXBoLm1pY3Jvc29mdC5jb20oJHxcXC8oW1xcd118XFwuKSooJHxcXC8pKS8sIChcImh0dHBzOi8vZ3JhcGgubWljcm9zb2Z0LmNvbS9cIiArIGFwaVNlcnZpY2Uuc2VsZWN0ZWRWZXJzaW9uICsgXCIvXCIpKTtcclxuICAgICAgICAgICAgICAgIGlmICgkc2NvcGUuc2VsZWN0ZWRPcHRpb24gPT0gJ1BPU1QnIHx8ICRzY29wZS5zZWxlY3RlZE9wdGlvbiA9PSAnUEFUQ0gnKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vIGludmVzdGlnYXRlIHdoeSAkc2NvcGUgZG9lc24ndCB3b3JrIGhlcmVcclxuICAgICAgICAgICAgICAgICAgICBzaG93UmVxdWVzdEJvZHlFZGl0b3IoKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoJHNjb3BlLnNlbGVjdGVkT3B0aW9uID09ICdHRVQnIHx8ICRzY29wZS5zZWxlY3RlZE9wdGlvbiA9PSAnREVMRVRFJykge1xyXG4gICAgICAgICAgICAgICAgICAgIHMudGFiQ29uZmlnLmRpc2FibGVSZXF1ZXN0Qm9keUVkaXRvciA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgc2V0U2VsZWN0ZWRUYWIoMCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICB9XSk7XHJcblxyXG5hbmd1bGFyLm1vZHVsZSgnQXBpRXhwbG9yZXInKVxyXG4gICAgLmNvbnRyb2xsZXIoJ1ZlcnNpb25DdHJsJywgWyckc2NvcGUnLCAnQXBpRXhwbG9yZXJTdmMnLCBmdW5jdGlvbiAoJHNjb3BlLCBhcGlTZXJ2aWNlKSB7XHJcbiAgICAgICAgJHNjb3BlLml0ZW1zID0gW1xyXG4gICAgICAgICAgICAnYmV0YScsXHJcbiAgICAgICAgICAgICd2MS4wJ1xyXG4gICAgICAgIF07XHJcblxyXG4gICAgICAgICRzY29wZS5nZXRTZXJ2aWNlVmVyc2lvbiA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gYXBpU2VydmljZS5zZWxlY3RlZFZlcnNpb247XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAkc2NvcGUub25JdGVtQ2xpY2sgPSBmdW5jdGlvbihjaG9pY2UpIHtcclxuICAgICAgICAgICAgYXBpU2VydmljZS5zZWxlY3RlZFZlcnNpb24gPSBjaG9pY2U7XHJcbiAgICAgICAgfSAgIFxyXG59XSk7XHJcblxyXG5hbmd1bGFyLm1vZHVsZSgnQXBpRXhwbG9yZXInKS5jb250cm9sbGVyKCdkYXRhbGlzdEN0cmwnLCBbJyRzY29wZScsICdBcGlFeHBsb3JlclN2YycsIGZ1bmN0aW9uICgkc2NvcGUsIGFwaVNlcnZpY2UpIHtcclxuXHJcbiAgICAkc2NvcGUuc2VhcmNoVGV4dENoYW5nZSA9IGZ1bmN0aW9uKHNlYXJjaFRleHQpIHtcclxuICAgICAgICAkc2NvcGUuJHBhcmVudC5zZXRTZWFyY2hUZXh0KHNlYXJjaFRleHQpO1xyXG5cclxuICAgICAgICBhcGlTZXJ2aWNlLnRleHQgPSBzZWFyY2hUZXh0O1xyXG4gICAgfVxyXG5cclxuICAgICRzY29wZS5nZXRSZXF1ZXN0SGlzdG9yeSA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHJldHVybiByZXF1ZXN0SGlzdG9yeTtcclxuICAgIH1cclxuXHJcbiAgICAkc2NvcGUuZ2V0U2VydmljZVZlcnNpb24gPSBmdW5jdGlvbigpIHtcclxuICAgICAgICByZXR1cm4gYXBpU2VydmljZS5zZWxlY3RlZFZlcnNpb247XHJcbiAgICB9XHJcblxyXG4gICAgJHNjb3BlLiRvbigndXBkYXRlVXJsRnJvbVNlcnZpY2VUZXh0JywgZnVuY3Rpb24oZXZlbnQsIGRhdGEpIHtcclxuICAgICAgICAkc2NvcGUudGV4dCA9IGFwaVNlcnZpY2UudGV4dDtcclxuICAgIH0pO1xyXG4gICAgXHJcbiAgICAkc2NvcGUuJHdhdGNoKFwiZ2V0U2VydmljZVZlcnNpb24oKVwiLCBmdW5jdGlvbihuZXdWYWwsIG9sZFZhbCkge1xyXG4gICAgICAgIGlmIChvbGRWYWwgIT09IG5ld1ZhbCkge1xyXG4gICAgICAgICAgICBpZiAoJHNjb3BlLiRwYXJlbnQuc2VhcmNoVGV4dCkge1xyXG4gICAgICAgICAgICAgICAgJHNjb3BlLnNlYXJjaFRleHRDaGFuZ2UoJHNjb3BlLiRwYXJlbnQuc2VhcmNoVGV4dC5yZXBsYWNlKC9odHRwczpcXC9cXC9ncmFwaC5taWNyb3NvZnQuY29tKCR8XFwvKFtcXHddfFxcLikqKCR8XFwvKSkvLCAoXCJodHRwczovL2dyYXBoLm1pY3Jvc29mdC5jb20vXCIgKyBhcGlTZXJ2aWNlLnNlbGVjdGVkVmVyc2lvbiArIFwiL1wiKSkpO1xyXG4gICAgICAgICAgICAgICAgJHNjb3BlLnRleHQgPSBhcGlTZXJ2aWNlLnRleHQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcGFyc2VNZXRhZGF0YShhcGlTZXJ2aWNlLCAkc2NvcGUpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgICRzY29wZS5zZWFyY2hUZXh0Q2hhbmdlKGFwaVNlcnZpY2UudGV4dCk7XHJcblxyXG4gICAgJHNjb3BlLmdldE1hdGNoZXMgPSBmdW5jdGlvbihxdWVyeSkge1xyXG4gICAgICAgIHZhciB1cmxzID0gZ2V0VXJsc0Zyb21TZXJ2aWNlVVJMKGFwaVNlcnZpY2UpXHJcbiAgICAgICAgcmV0dXJuIHVybHMuZmlsdGVyKGZ1bmN0aW9uKG9wdGlvbikge1xyXG4gICAgICAgICAgICB2YXIgcXVlcnlJbk9wdGlvbiA9IChvcHRpb24uaW5kZXhPZihxdWVyeSk+LTEpO1xyXG4gICAgICAgICAgICB2YXIgcXVlcnlJc0VtcHR5ID0gKGdldEVudGl0eU5hbWUocXVlcnkpLmxlbmd0aCA9PSAwKTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBxdWVyeUlzRW1wdHkgfHwgcXVlcnlJbk9wdGlvbjtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAod2luZG93LnJ1blRlc3RzKVxyXG4gICAgICAgICBydW5BdXRvQ29tcGxldGVUZXN0cyhhcGlTZXJ2aWNlKTtcclxuXHJcbn1dKTtcclxuXHJcblxyXG5hbmd1bGFyLm1vZHVsZSgnQXBpRXhwbG9yZXInKS5jb250cm9sbGVyKCdGb3JtQ3RybCcsIFsnJHNjb3BlJywgJ0FwaUV4cGxvcmVyU3ZjJywgZnVuY3Rpb24gKCRzY29wZSwgYXBpU2VydmljZSkge1xyXG4gICAgJHNjb3BlLnJlcXVlc3RJblByb2dyZXNzID0gZmFsc2U7XHJcbiAgICAkc2NvcGUuaW5zdWZmaWNpZW50UHJpdmlsZWdlcyA9IGZhbHNlO1xyXG5cclxuICAgIGlmIChoZWxsbygnbXNmdCcpLmdldEF1dGhSZXNwb25zZSgpICE9IG51bGwgJiYgXHJcbiAgICAgICAgKGFwaVNlcnZpY2Uuc2VsZWN0ZWRPcHRpb24gPT09ICdQT1NUJyB8fCBhcGlTZXJ2aWNlLnNlbGVjdGVkT3B0aW9uID09PSAnUEFUQ0gnKSkge1xyXG4gICAgICAgICAgICBzaG93UmVxdWVzdEJvZHlFZGl0b3IoKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgc2V0U2VsZWN0ZWRUYWIoMCk7XHJcbiAgICB9XHJcblxyXG4gICAgJHNjb3BlLmdldFRleHQgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICByZXR1cm4gYXBpU2VydmljZS50ZXh0O1xyXG4gICAgfVxyXG4gXHJcbiAgICAvLyBjdXN0b20gbGluayByZS1yb3V0aW5nIGxvZ2ljIHRvIHJlc29sdmUgbGlua3NcclxuICAgICRzY29wZS4kcGFyZW50LiRvbihcInVybENoYW5nZVwiLCBmdW5jdGlvbiAoZXZlbnQsIGFyZ3MpIHtcclxuICAgICAgICBtc0dyYXBoTGlua1Jlc29sdXRpb24oJHNjb3BlLCBnZXRKc29uVmlld2VyKCkuZ2V0U2Vzc2lvbigpLmdldFZhbHVlKCksIGFyZ3MsIGFwaVNlcnZpY2UpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gZnVuY3Rpb24gY2FsbGVkIHdoZW4gbGluayBpbiB0aGUgYmFjayBidXR0b24gaGlzdG9yeSBpcyBjbGlja2VkXHJcbiAgICAkc2NvcGUuaGlzdG9yeU9uQ2xpY2sgPSBmdW5jdGlvbihoaXN0b3J5SXRlbSkge1xyXG4gICAgICAgICRzY29wZS50ZXh0ID0gaGlzdG9yeUl0ZW0udXJsVGV4dDtcclxuICAgICAgICBhcGlTZXJ2aWNlLnNlbGVjdGVkVmVyc2lvbiA9IGhpc3RvcnlJdGVtLnNlbGVjdGVkVmVyc2lvbjtcclxuICAgICAgICBhcGlTZXJ2aWNlLnNlbGVjdGVkT3B0aW9uID0gaGlzdG9yeUl0ZW0uaHRtbE9wdGlvbjtcclxuXHJcbiAgICAgICAgaWYgKGhpc3RvcnlJdGVtLmh0bWxPcHRpb24gPT0gJ1BPU1QnIHx8IGhpc3RvcnlJdGVtLmh0bWxPcHRpb24gPT0gJ1BBVENIJykge1xyXG4gICAgICAgICAgICBpZiAoZ2V0SnNvblZpZXdlcigpKSB7XHJcbiAgICAgICAgICAgICAgICBnZXRKc29uVmlld2VyKCkuZ2V0U2Vzc2lvbigpLnNldFZhbHVlKGhpc3RvcnlJdGVtLmpzb25JbnB1dCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKFwianNvbiBlZGl0b3Igd2F0Y2ggZXZlbnQgbm90IGZpcmluZ1wiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIC8vY2xlYXIganNvbkVkaXRvclxyXG4gICAgICAgICAgICBpZiAoZ2V0SnNvblZpZXdlcigpKSB7XHJcbiAgICAgICAgICAgICAgICBnZXRKc29uVmlld2VyKCkuZ2V0U2Vzc2lvbigpLnNldFZhbHVlKFwiXCIpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH1cclxuICAgICAgICAkc2NvcGUuc3VibWl0KCRzY29wZS50ZXh0KTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgJHNjb3BlLmNsb3NlQWRtaW5Db25zZW50QmFyID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgJHNjb3BlLmluc3VmZmljaWVudFByaXZpbGVnZXMgPSBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICAkc2NvcGUuZ2V0QWRtaW5Db25zZW50ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGhlbGxvKCdtc2Z0X2FkbWluX2NvbnNlbnQnKS5sb2dpbih7XHJcbiAgICAgICAgICAgIGRpc3BsYXk6ICdwb3B1cCdcclxuICAgICAgICB9KS50aGVuKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAkc2NvcGUuZmluaXNoQWRtaW5Db25zZXJ0RmxvdygpO1xyXG4gICAgICAgIH0sIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAkc2NvcGUuZmluaXNoQWRtaW5Db25zZXJ0RmxvdygpO1xyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcbiAgICAgICAgXHJcblxyXG4gICAgJHNjb3BlLnN1Ym1pdCA9IGZ1bmN0aW9uIChxdWVyeSkge1xyXG4gICAgICAgIGlmICghcXVlcnkpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgYXBpU2VydmljZS50ZXh0ID0gcXVlcnk7XHJcbiAgICAgICAgJHNjb3BlLnJlcXVlc3RJblByb2dyZXNzID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgLy9jcmVhdGUgYW4gb2JqZWN0IHRvIHN0b3JlIHRoZSBhcGkgY2FsbFxyXG4gICAgICAgIHZhciBoaXN0b3J5T2JqID0ge307XHJcblxyXG4gICAgICAgIGhpc3RvcnlPYmoudXJsVGV4dCA9IHF1ZXJ5O1xyXG4gICAgICAgIGhpc3RvcnlPYmouc2VsZWN0ZWRWZXJzaW9uID0gYXBpU2VydmljZS5zZWxlY3RlZFZlcnNpb247XHJcbiAgICAgICAgaGlzdG9yeU9iai5odG1sT3B0aW9uID0gYXBpU2VydmljZS5zZWxlY3RlZE9wdGlvbjtcclxuICAgICAgICBoaXN0b3J5T2JqLmpzb25JbnB1dCA9IFwiXCI7XHJcblxyXG5cclxuICAgICAgICBpZiAoaGlzdG9yeU9iai5odG1sT3B0aW9uID09ICdQT1NUJyB8fCBoaXN0b3J5T2JqLmh0bWxPcHRpb24gPT0gJ1BBVENIJykge1xyXG4gICAgICAgICAgICBoaXN0b3J5T2JqLmpzb25JbnB1dCA9IGdldFJlcXVlc3RCb2R5RWRpdG9yKCkuZ2V0U2Vzc2lvbigpLmdldFZhbHVlKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAkc2NvcGUuc2hvd0ltYWdlID0gZmFsc2U7XHJcblxyXG4gICAgICAgIHZhciBwb3N0Qm9keSA9IFwiXCI7XHJcbiAgICAgICAgaWYgKGdldFJlcXVlc3RCb2R5RWRpdG9yKCkgIT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIHBvc3RCb2R5ID0gZ2V0UmVxdWVzdEJvZHlFZGl0b3IoKS5nZXRTZXNzaW9uKCkuZ2V0VmFsdWUoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHZhciByZXF1ZXN0SGVhZGVycyA9IFwiXCI7XHJcbiAgICAgICAgaWYgKCRzY29wZS5qc29uRWRpdG9ySGVhZGVycyAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgcmVxdWVzdEhlYWRlcnMgPSAkc2NvcGUuanNvbkVkaXRvckhlYWRlcnMuZ2V0U2Vzc2lvbigpLmdldFZhbHVlKCk7XHJcbiAgICAgICAgICAgIHJlcXVlc3RIZWFkZXJzID0gZm9ybWF0UmVxdWVzdEhlYWRlcnMocmVxdWVzdEhlYWRlcnMpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdmFyIHN0YXJ0VGltZSA9IG5ldyBEYXRlKCk7XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGhhbmRsZVN1Y2Nlc3NmdWxRdWVyeVJlc3BvbnNlKHJlc3VsdCkge1xyXG4gICAgICAgICAgICB2YXIgc3RhdHVzID0gcmVzdWx0LnN0YXR1cztcclxuICAgICAgICAgICAgdmFyIGhlYWRlcnMgPSByZXN1bHQuaGVhZGVycztcclxuICAgICAgICAgICAgdmFyIHJlc3VsdEJvZHkgPSByZXN1bHQuZGF0YTtcclxuXHJcbiAgICAgICAgICAgIGlmIChpc0ltYWdlUmVzcG9uc2UoaGVhZGVycykpIHtcclxuICAgICAgICAgICAgICAgIGhhbmRsZUltYWdlUmVzcG9uc2UoJHNjb3BlLCBhcGlTZXJ2aWNlLCBzdGFydFRpbWUsIGhlYWRlcnMsIHN0YXR1cywgaGFuZGxlVW5zdWNjZXNzZnVsUXVlcnlSZXNwb25zZSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoaXNIdG1sUmVzcG9uc2UoaGVhZGVycykpIHtcclxuICAgICAgICAgICAgICAgIGhhbmRsZUh0bWxSZXNwb25zZSgkc2NvcGUsIHN0YXJ0VGltZSwgcmVzdWx0Qm9keSwgaGVhZGVycywgc3RhdHVzKTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChpc1htbFJlc3BvbnNlKHJlc3VsdCkpIHtcclxuICAgICAgICAgICAgICAgIGhhbmRsZVhtbFJlc3BvbnNlKCRzY29wZSwgc3RhcnRUaW1lLCByZXN1bHRCb2R5LCBoZWFkZXJzLCBzdGF0dXMpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgaGFuZGxlSnNvblJlc3BvbnNlKCRzY29wZSwgc3RhcnRUaW1lLCByZXN1bHRCb2R5LCBoZWFkZXJzLCBzdGF0dXMpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBzYXZlSGlzdG9yeU9iamVjdChoaXN0b3J5T2JqLCBzdGF0dXMsIG5ldyBEYXRlKCkgLSBzdGFydFRpbWUpO1xyXG5cclxuXHJcbiAgICAgICAgICAgICRzY29wZS5pbnN1ZmZpY2llbnRQcml2aWxlZ2VzID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiBoYW5kbGVVbnN1Y2Nlc3NmdWxRdWVyeVJlc3BvbnNlKHJlc3VsdCkge1xyXG4gICAgICAgICAgICB2YXIgc3RhdHVzID0gcmVzdWx0LnN0YXR1cztcclxuICAgICAgICAgICAgdmFyIGhlYWRlcnMgPSByZXN1bHQuaGVhZGVycztcclxuICAgICAgICAgICAgaGFuZGxlSnNvblJlc3BvbnNlKCRzY29wZSwgc3RhcnRUaW1lLCByZXN1bHQuZGF0YSwgaGVhZGVycywgc3RhdHVzKTtcclxuICAgICAgICAgICAgc2F2ZUhpc3RvcnlPYmplY3QoaGlzdG9yeU9iaiwgc3RhdHVzLCBuZXcgRGF0ZSgpIC0gc3RhcnRUaW1lKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChzdGF0dXMgPT09IDQwMSB8fCBzdGF0dXMgPT09IDQwMykge1xyXG4gICAgICAgICAgICAgICAgJHNjb3BlLmluc3VmZmljaWVudFByaXZpbGVnZXMgPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgaWYgKCRzY29wZS5pc0F1dGhlbnRpY2F0ZWQoKSkge1xyXG4gICAgICAgICAgICBhcGlTZXJ2aWNlLnBlcmZvcm1RdWVyeShhcGlTZXJ2aWNlLnNlbGVjdGVkT3B0aW9uKShhcGlTZXJ2aWNlLnRleHQsIHBvc3RCb2R5LCByZXF1ZXN0SGVhZGVycylcclxuICAgICAgICAgICAgICAgIC50aGVuKGhhbmRsZVN1Y2Nlc3NmdWxRdWVyeVJlc3BvbnNlLCBoYW5kbGVVbnN1Y2Nlc3NmdWxRdWVyeVJlc3BvbnNlKTtcclxuXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgYXBpU2VydmljZS5wZXJmb3JtQW5vbnltb3VzUXVlcnkoYXBpU2VydmljZS5zZWxlY3RlZE9wdGlvbikoYXBpU2VydmljZS50ZXh0LCBwb3N0Qm9keSwgcmVxdWVzdEhlYWRlcnMpXHJcbiAgICAgICAgICAgICAgICAudGhlbihoYW5kbGVTdWNjZXNzZnVsUXVlcnlSZXNwb25zZSwgaGFuZGxlVW5zdWNjZXNzZnVsUXVlcnlSZXNwb25zZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxufV0pOyIsIi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4vLyAgQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uICBBbGwgUmlnaHRzIFJlc2VydmVkLiAgTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiAgU2VlIExpY2Vuc2UgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cclxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcblxyXG4vLyBnZXQgdGhlIHBhdGggdG8gdGhpcyBzY3JpcHRcclxudmFyIHNjcmlwdHMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcInNjcmlwdFwiKVxyXG52YXIgc3JjID0gc2NyaXB0c1tzY3JpcHRzLmxlbmd0aC0xXS5zcmM7XHJcbnZhciBwYXRoVG9CdWlsZERpciA9IHNyYy5zcGxpdCgnLycpLnNsaWNlKDAsIC0yKS5qb2luKCcvJyk7XHJcblxyXG5hbmd1bGFyLm1vZHVsZSgnQXBpRXhwbG9yZXInKVxyXG4gICAgLmRpcmVjdGl2ZSgnYXBpRXhwbG9yZXInLCBmdW5jdGlvbigpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBzY29wZToge1xyXG4gICAgICAgICAgICAgICAgc3RyaW5nczogJz0nLFxyXG4gICAgICAgICAgICAgICAgbGFuZ3VhZ2U6ICc9JyxcclxuICAgICAgICAgICAgICAgIHNjb3BlczogJz0nLFxyXG4gICAgICAgICAgICAgICAgYWRtaW5TY29wZXM6ICc9JyxcclxuICAgICAgICAgICAgICAgIGNsaWVudElkOiAnPScsXHJcbiAgICAgICAgICAgICAgICByZWRpcmVjdFVybDogJz0nXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiBwYXRoVG9CdWlsZERpcisnL2Fzc2V0cy92aWV3cy9leHBsb3Jlci5odG1sJyxcclxuICAgICAgICAgICAgY29udHJvbGxlcjogZnVuY3Rpb24gKCRzY29wZSkge1xyXG4gICAgICAgICAgICAgICAgJHNjb3BlLnBhdGhUb0J1aWxkRGlyID0gcGF0aFRvQnVpbGREaXI7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gZGVmYXVsdCBzdHJpbmdzXHJcbiAgICAgICAgICAgICAgICAkc2NvcGUuc3RyID0gbG9jX3N0cmluZ3NbJ2VuX3VzJ107XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gaWYgdGhlIHVzZXIgc3BlY2lmaWVkIGEgbGFuZ3VhZ2UsIHVzZSB0aGF0IGluc3RlYWRcclxuICAgICAgICAgICAgICAgIGlmICgkc2NvcGUubGFuZ3VhZ2UpIHtcclxuICAgICAgICAgICAgICAgICAgICAkc2NvcGUuc3RyID0gbG9jX3N0cmluZ3NbJHNjb3BlLmxhbmd1YWdlXTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAvLyBtZXJnZSAkc2NvcGUuc3RyaW5ncyBpbnRvICRzY29wZS5zdHJcclxuICAgICAgICAgICAgICAgIGFuZ3VsYXIuZXh0ZW5kKCRzY29wZS5zdHIsICRzY29wZS5zdHJpbmdzKTtcclxuXHJcblxyXG4gICAgICAgICAgICAgICAgaGVsbG8uaW5pdCgge1xyXG4gICAgICAgICAgICAgICAgICAgIG1zZnQ6ICRzY29wZS5jbGllbnRJZFxyXG4gICAgICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgICAgIHNjb3BlOiAkc2NvcGUuc2NvcGVzLFxyXG4gICAgICAgICAgICAgICAgICAgIHJlZGlyZWN0X3VyaTogd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lIC8vcmVxdWlyZWQgdG8gcmVtb3ZlIGV4dHJhIHVybCBwYXJhbXMgdGhhdCBtYWtlIFVSTHMgbm90IG1hdGNoXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICBoZWxsby5pbml0KCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbXNmdF9hZG1pbl9jb25zZW50OiAkc2NvcGUuY2xpZW50SWQsXHJcbiAgICAgICAgICAgICAgICAgICAgbXNmdF90b2tlbl9yZWZyZXNoOiAkc2NvcGUuY2xpZW50SWQsXHJcbiAgICAgICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVkaXJlY3RfdXJpOiB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWVcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgIH0pOyIsIi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4vLyAgQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uICBBbGwgUmlnaHRzIFJlc2VydmVkLiAgTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiAgU2VlIExpY2Vuc2UgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cclxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcblxyXG5mdW5jdGlvbiBpbml0aWFsaXplSnNvbkVkaXRvcigkc2NvcGUsIGJvZHlWYWwpIHtcclxuICAgIHZhciBqc29uRWRpdG9yID0gZ2V0UmVxdWVzdEJvZHlFZGl0b3IoKTtcclxuICAgIGpzb25FZGl0b3IuZ2V0U2Vzc2lvbigpLnNldE1vZGUoXCJhY2UvbW9kZS9qYXZhc2NyaXB0XCIpO1xyXG4gICAganNvbkVkaXRvci4kYmxvY2tTY3JvbGxpbmcgPSBJbmZpbml0eTtcclxuICAgIFxyXG4gICAganNvbkVkaXRvci5zZXRTaG93UHJpbnRNYXJnaW4oZmFsc2UpO1xyXG4gICAgaWYgKGJvZHlWYWwpIHtcclxuICAgICAgICBqc29uRWRpdG9yLmdldFNlc3Npb24oKS5pbnNlcnQoe3JvdzowLCBjb2x1bW46MH0sIGJvZHlWYWwpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBqc29uRWRpdG9yLmdldFNlc3Npb24oKS5pbnNlcnQoMCwgXCIgXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIGpzb25FZGl0b3IucmVuZGVyZXIuc2V0T3B0aW9uKCdzaG93TGluZU51bWJlcnMnLCBmYWxzZSk7XHJcbiAgICAvL2FjY2Vzc2liaWxpdHkgLSBrZXlib2FyZCBkZXBlbmRhbnQgdXNlcnMgbXVzdCBiZSBhYmxlIHRvIFwidGFiIG91dFwiIG9mIHNlc3Npb25cclxuICAgIGpzb25FZGl0b3IuY29tbWFuZHMuYmluZEtleShcIlRhYlwiLCBudWxsKTtcclxuICAgICRzY29wZS5qc29uRWRpdG9yID0ganNvbkVkaXRvcjtcclxufVxyXG5cclxuZnVuY3Rpb24gaW5pdGlhbGl6ZUpzb25FZGl0b3JIZWFkZXJzKCRzY29wZSwgaGVhZGVyc1ZhbCkge1xyXG4gICAgdmFyIGpzb25WaWV3ZXJFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJqc29uRWRpdG9ySGVhZGVyc1wiKTtcclxuICAgIGlmICghanNvblZpZXdlckVsZW1lbnQpIHtcclxuICAgICAgICBjb25zb2xlLmVycm9yKCdjYW5ub3QgZmluZCAjanNvbkVkaXRvckhlYWRlcnMnKVxyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIGpzb25FZGl0b3JIZWFkZXJzID0gYWNlLmVkaXQoanNvblZpZXdlckVsZW1lbnQpO1xyXG4gICAganNvbkVkaXRvckhlYWRlcnMuc2V0U2hvd1ByaW50TWFyZ2luKGZhbHNlKTtcclxuXHJcbiAgICBqc29uRWRpdG9ySGVhZGVycy4kYmxvY2tTY3JvbGxpbmcgPSBJbmZpbml0eTtcclxuICAgIC8vYWNjZXNzaWJpbGl0eSAtIGtleWJvYXJkIGRlcGVuZGFudCB1c2VycyBtdXN0IGJlIGFibGUgdG8gXCJ0YWIgb3V0XCIgb2Ygc2Vzc2lvblxyXG4gICAgaWYoaGVhZGVyc1ZhbCkge1xyXG4gICAgICAgIGpzb25FZGl0b3JIZWFkZXJzLmdldFNlc3Npb24oKS5pbnNlcnQoMCwgaGVhZGVyc1ZhbCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIGpzb25FZGl0b3JIZWFkZXJzLmdldFNlc3Npb24oKS5pbnNlcnQoMCwgXCIgXCIpO1xyXG4gICAgfVxyXG4gICAganNvbkVkaXRvckhlYWRlcnMucmVuZGVyZXIuc2V0T3B0aW9uKCdzaG93TGluZU51bWJlcnMnLCBmYWxzZSk7XHJcbiAgICBqc29uRWRpdG9ySGVhZGVycy5tb3ZlQ3Vyc29yVG8oMSwwKTtcclxuICAgIGpzb25FZGl0b3JIZWFkZXJzLmNvbW1hbmRzLmJpbmRLZXkoXCJUYWJcIiwgbnVsbCk7XHJcbiAgICAkc2NvcGUuanNvbkVkaXRvckhlYWRlcnMgPSBqc29uRWRpdG9ySGVhZGVycztcclxufSIsIi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4vLyAgQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uICBBbGwgUmlnaHRzIFJlc2VydmVkLiAgTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiAgU2VlIExpY2Vuc2UgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cclxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcblxyXG5mdW5jdGlvbiBpbml0aWFsaXplSnNvblZpZXdlcigkc2NvcGUsIGFwaVNlcnZpY2UpIHtcclxuICAgICQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uICgpIHtcclxuICAgIFxyXG4gICAgICAgIHZhciBqc29uVmlld2VyRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwianNvblZpZXdlclwiKTtcclxuICAgICAgICBqc29uVmlld2VyID0gYWNlLmVkaXQoanNvblZpZXdlckVsZW1lbnQpO1xyXG4gICAgICAgIGpzb25WaWV3ZXIuZ2V0U2Vzc2lvbigpLnNldE1vZGUoXCJhY2UvbW9kZS9qYXZhc2NyaXB0XCIpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGpzb25WaWV3ZXIuJGJsb2NrU2Nyb2xsaW5nID0gSW5maW5pdHk7XHJcbiAgICAgICAganNvblZpZXdlci5yZW5kZXJlci5zZXRPcHRpb24oJ3Nob3dMaW5lTnVtYmVycycsIGZhbHNlKTtcclxuICAgICAgICBcclxuICAgICAgICBqc29uVmlld2VyLnNldE9wdGlvbnMoe1xyXG4gICAgICAgICAgICByZWFkT25seTogdHJ1ZSxcclxuICAgICAgICAgICAgaGlnaGxpZ2h0QWN0aXZlTGluZTogZmFsc2UsXHJcbiAgICAgICAgICAgIGhpZ2hsaWdodEd1dHRlckxpbmU6IGZhbHNlLFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGpzb25WaWV3ZXIuc2V0U2hvd1ByaW50TWFyZ2luKGZhbHNlKTtcclxuICAgICAgICBqc29uVmlld2VyLmdldFNlc3Npb24oKS5zZXRVc2VXb3JrZXIoZmFsc2UpO1xyXG4gICAgICAgIGpzb25WaWV3ZXIucmVuZGVyZXIuJGN1cnNvckxheWVyLmVsZW1lbnQuc3R5bGUub3BhY2l0eSA9IDA7XHJcblxyXG5cclxuICAgICAgICBkZWZpbmUoXCJob3ZlcmxpbmtcIiwgW1wicmVxdWlyZVwiLCBcImV4cG9ydHNcIl0sIGZ1bmN0aW9uIChyZXF1aXJlLCBleHBvcnRzLCBtb2R1bGUpIHtcclxuICAgICAgICAgICAgXCJ1c2Ugc3RyaWN0XCI7XHJcbiAgICAgICAgICAgIHZhciBvb3AgPSByZXF1aXJlKFwiYWNlL2xpYi9vb3BcIik7XHJcbiAgICAgICAgICAgIHZhciBldmVudCA9IHJlcXVpcmUoXCJhY2UvbGliL2V2ZW50XCIpO1xyXG4gICAgICAgICAgICB2YXIgUmFuZ2UgPSByZXF1aXJlKFwiYWNlL3JhbmdlXCIpLlJhbmdlO1xyXG4gICAgICAgICAgICB2YXIgRXZlbnRFbWl0dGVyID0gcmVxdWlyZShcImFjZS9saWIvZXZlbnRfZW1pdHRlclwiKS5FdmVudEVtaXR0ZXI7XHJcblxyXG4gICAgICAgICAgICB2YXIgSG92ZXJMaW5rID0gZnVuY3Rpb24gKGpzb25WaWV3ZXIpIHtcclxuICAgICAgICAgICAgICAgIGlmIChqc29uVmlld2VyLmhvdmVyTGluaylcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICBqc29uVmlld2VyLmhvdmVyTGluayA9IHRoaXM7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmpzb25WaWV3ZXIgPSBqc29uVmlld2VyO1xyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlID0gdGhpcy51cGRhdGUuYmluZCh0aGlzKTtcclxuICAgICAgICAgICAgICAgIHRoaXMub25Nb3VzZU1vdmUgPSB0aGlzLm9uTW91c2VNb3ZlLmJpbmQodGhpcyk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm9uTW91c2VPdXQgPSB0aGlzLm9uTW91c2VPdXQuYmluZCh0aGlzKTtcclxuICAgICAgICAgICAgICAgIHRoaXMub25DbGljayA9IHRoaXMub25DbGljay5iaW5kKHRoaXMpO1xyXG4gICAgICAgICAgICAgICAgZXZlbnQuYWRkTGlzdGVuZXIoanNvblZpZXdlci5yZW5kZXJlci5zY3JvbGxlciwgXCJtb3VzZW1vdmVcIiwgdGhpcy5vbk1vdXNlTW92ZSk7XHJcbiAgICAgICAgICAgICAgICBldmVudC5hZGRMaXN0ZW5lcihqc29uVmlld2VyLnJlbmRlcmVyLmNvbnRlbnQsIFwibW91c2VvdXRcIiwgdGhpcy5vbk1vdXNlT3V0KTtcclxuICAgICAgICAgICAgICAgIGV2ZW50LmFkZExpc3RlbmVyKGpzb25WaWV3ZXIucmVuZGVyZXIuY29udGVudCwgXCJjbGlja1wiLCB0aGlzLm9uQ2xpY2spO1xyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIG9vcC5pbXBsZW1lbnQodGhpcywgRXZlbnRFbWl0dGVyKTtcclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLnRva2VuID0ge307XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJhbmdlID0gbmV3IFJhbmdlKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGUgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy4kdGltZXIgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBqc29uVmlld2VyID0gdGhpcy5qc29uVmlld2VyO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciByZW5kZXJlciA9IGpzb25WaWV3ZXIucmVuZGVyZXI7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHZhciBjYW52YXNQb3MgPSByZW5kZXJlci5zY3JvbGxlci5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgb2Zmc2V0ID0gKHRoaXMueCArIHJlbmRlcmVyLnNjcm9sbExlZnQgLSBjYW52YXNQb3MubGVmdCAtIHJlbmRlcmVyLiRwYWRkaW5nKSAvIHJlbmRlcmVyLmNoYXJhY3RlcldpZHRoO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciByb3cgPSBNYXRoLmZsb29yKCh0aGlzLnkgKyByZW5kZXJlci5zY3JvbGxUb3AgLSBjYW52YXNQb3MudG9wKSAvIHJlbmRlcmVyLmxpbmVIZWlnaHQpO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBjb2wgPSBNYXRoLnJvdW5kKG9mZnNldCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHZhciBzY3JlZW5Qb3MgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJvdzogcm93LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb2x1bW46IGNvbCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2lkZTogb2Zmc2V0IC0gY29sID4gMCA/IDEgOiAtMVxyXG4gICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHNlc3Npb24gPSBqc29uVmlld2VyLnNlc3Npb247XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGRvY1BvcyA9IHNlc3Npb24uc2NyZWVuVG9Eb2N1bWVudFBvc2l0aW9uKHNjcmVlblBvcy5yb3csIHNjcmVlblBvcy5jb2x1bW4pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB2YXIgc2VsZWN0aW9uUmFuZ2UgPSBqc29uVmlld2VyLnNlbGVjdGlvbi5nZXRSYW5nZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghc2VsZWN0aW9uUmFuZ2UuaXNFbXB0eSgpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzZWxlY3Rpb25SYW5nZS5zdGFydC5yb3cgPD0gcm93ICYmIHNlbGVjdGlvblJhbmdlLmVuZC5yb3cgPj0gcm93KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuY2xlYXIoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHZhciBsaW5lID0ganNvblZpZXdlci5zZXNzaW9uLmdldExpbmUoZG9jUG9zLnJvdyk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRvY1Bvcy5jb2x1bW4gPT0gbGluZS5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGNsaXBwZWRQb3MgPSBqc29uVmlld2VyLnNlc3Npb24uZG9jdW1lbnRUb1NjcmVlblBvc2l0aW9uKGRvY1Bvcy5yb3csIGRvY1Bvcy5jb2x1bW4pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY2xpcHBlZFBvcy5jb2x1bW4gIT0gc2NyZWVuUG9zLmNvbHVtbikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuY2xlYXIoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHRva2VuID0gdGhpcy5maW5kTGluayhkb2NQb3Mucm93LCBkb2NQb3MuY29sdW1uKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmxpbmsgPSB0b2tlbjtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIXRva2VuKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmNsZWFyKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaXNPcGVuID0gdHJ1ZVxyXG4gICAgICAgICAgICAgICAgICAgIGpzb25WaWV3ZXIucmVuZGVyZXIuc2V0Q3Vyc29yU3R5bGUoXCJwb2ludGVyXCIpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBzZXNzaW9uLnJlbW92ZU1hcmtlcih0aGlzLm1hcmtlcik7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmFuZ2UgPSBuZXcgUmFuZ2UodG9rZW4ucm93LCB0b2tlbi5zdGFydCwgdG9rZW4ucm93LCB0b2tlbi5zdGFydCArIHRva2VuLnZhbHVlLmxlbmd0aCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tYXJrZXIgPSBzZXNzaW9uLmFkZE1hcmtlcih0aGlzLnJhbmdlLCBcImFjZV9saW5rX21hcmtlclwiLCBcInRleHRcIiwgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMuY2xlYXIgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuaXNPcGVuKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuanNvblZpZXdlci5zZXNzaW9uLnJlbW92ZU1hcmtlcih0aGlzLm1hcmtlcik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuanNvblZpZXdlci5yZW5kZXJlci5zZXRDdXJzb3JTdHlsZShcIlwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5pc09wZW4gPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMuZ2V0TWF0Y2hBcm91bmQgPSBmdW5jdGlvbiAocmVnRXhwLCBzdHJpbmcsIGNvbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBtYXRjaDtcclxuICAgICAgICAgICAgICAgICAgICByZWdFeHAubGFzdEluZGV4ID0gMDtcclxuICAgICAgICAgICAgICAgICAgICBzdHJpbmcucmVwbGFjZShyZWdFeHAsIGZ1bmN0aW9uIChzdHIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG9mZnNldCA9IGFyZ3VtZW50c1thcmd1bWVudHMubGVuZ3RoIC0gMl07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBsZW5ndGggPSBzdHIubGVuZ3RoO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAob2Zmc2V0IDw9IGNvbCAmJiBvZmZzZXQgKyBsZW5ndGggPj0gY29sKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWF0Y2ggPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhcnQ6IG9mZnNldCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogc3RyXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbWF0Y2g7XHJcbiAgICAgICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMub25DbGljayA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIganNvblZpZXdlciA9IHRoaXMuanNvblZpZXdlcjtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgcmVuZGVyZXIgPSBqc29uVmlld2VyLnJlbmRlcmVyO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB2YXIgY2FudmFzUG9zID0gcmVuZGVyZXIuc2Nyb2xsZXIuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIG9mZnNldCA9ICh0aGlzLnggKyByZW5kZXJlci5zY3JvbGxMZWZ0IC0gY2FudmFzUG9zLmxlZnQgLSByZW5kZXJlci4kcGFkZGluZykgLyByZW5kZXJlci5jaGFyYWN0ZXJXaWR0aDtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgcm93ID0gTWF0aC5mbG9vcigodGhpcy55ICsgcmVuZGVyZXIuc2Nyb2xsVG9wIC0gY2FudmFzUG9zLnRvcCkgLyByZW5kZXJlci5saW5lSGVpZ2h0KTtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgY29sID0gTWF0aC5yb3VuZChvZmZzZXQpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5saW5rKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyb3cgIT0gdGhpcy5saW5rLnJvdyB8fCAhKGNvbCA+IHRoaXMubGluay5zdGFydCAmJiBjb2wgPCB0aGlzLmxpbmsuc3RhcnQgKyB0aGlzLmxpbmsudmFsdWUubGVuZ3RoKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxpbmsuanNvblZpZXdlciA9IHRoaXMuanNvblZpZXdlcjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fc2lnbmFsKFwib3BlblwiLCB0aGlzLmxpbmspO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNsZWFyKClcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMuZmluZExpbmsgPSBmdW5jdGlvbiAocm93LCBjb2x1bW4pIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIganNvblZpZXdlciA9IHRoaXMuanNvblZpZXdlcjtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgc2Vzc2lvbiA9IGpzb25WaWV3ZXIuc2Vzc2lvbjtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgbGluZSA9IHNlc3Npb24uZ2V0TGluZShyb3cpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB2YXIgbWF0Y2ggPSB0aGlzLmdldE1hdGNoQXJvdW5kKC9odHRwcz86XFwvXFwvW15cXHNcIl0rL2csIGxpbmUsIGNvbHVtbik7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFtYXRjaCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgbWF0Y2ggPSB0aGlzLmdldE1hdGNoQXJvdW5kKC9cImlkXCI6IFwiW15cXHNcIiddKy9nLCBsaW5lLCBjb2x1bW4pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIW1hdGNoKSByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1hdGNoID0gdGhpcy5nZXRNYXRjaEFyb3VuZCgvXCJbXlxcc1wiJ10rL2csIGxpbmUsIGNvbHVtbik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghbWF0Y2gpIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIG1hdGNoLnJvdyA9IHJvdztcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbWF0Y2g7XHJcbiAgICAgICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMub25Nb3VzZU1vdmUgPSBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmpzb25WaWV3ZXIuJG1vdXNlSGFuZGxlci5pc01vdXNlUHJlc3NlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMuanNvblZpZXdlci5zZWxlY3Rpb24uaXNFbXB0eSgpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jbGVhcigpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMueCA9IGUuY2xpZW50WDtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnkgPSBlLmNsaWVudFk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy51cGRhdGUoKTtcclxuICAgICAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5vbk1vdXNlT3V0ID0gZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNsZWFyKCk7XHJcbiAgICAgICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMuZGVzdHJveSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm9uTW91c2VPdXQoKTtcclxuICAgICAgICAgICAgICAgICAgICBldmVudC5yZW1vdmVMaXN0ZW5lcih0aGlzLmpzb25WaWV3ZXIucmVuZGVyZXIuc2Nyb2xsZXIsIFwibW91c2Vtb3ZlXCIsIHRoaXMub25Nb3VzZU1vdmUpO1xyXG4gICAgICAgICAgICAgICAgICAgIGV2ZW50LnJlbW92ZUxpc3RlbmVyKHRoaXMuanNvblZpZXdlci5yZW5kZXJlci5jb250ZW50LCBcIm1vdXNlb3V0XCIsIHRoaXMub25Nb3VzZU91dCk7XHJcbiAgICAgICAgICAgICAgICAgICAgZGVsZXRlIHRoaXMuanNvblZpZXdlci5ob3Zlckxpbms7XHJcbiAgICAgICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgfSkuY2FsbChIb3ZlckxpbmsucHJvdG90eXBlKTtcclxuXHJcbiAgICAgICAgICAgIGV4cG9ydHMuSG92ZXJMaW5rID0gSG92ZXJMaW5rO1xyXG5cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgSG92ZXJMaW5rID0gcmVxdWlyZShcImhvdmVybGlua1wiKS5Ib3ZlckxpbmtcclxuICAgICAgICBqc29uVmlld2VyLmhvdmVyTGluayA9IG5ldyBIb3ZlckxpbmsoanNvblZpZXdlcik7XHJcbiAgICAgICAganNvblZpZXdlci5ob3Zlckxpbmsub24oXCJvcGVuXCIsIGZ1bmN0aW9uICh4KSB7XHJcbiAgICAgICAgICAgIHJ1bigkc2NvcGUsIHgudmFsdWUsIGFwaVNlcnZpY2UpO1xyXG4gICAgICAgIH0pXHJcbiAgICB9KTtcclxufVxyXG5cclxuZnVuY3Rpb24gc2V0SnNvblZpZXdlckNvbnRlbnRUeXBlKG1vZGUpIHtcclxuICAgICQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBqc29uVmlld2VyLmdldFNlc3Npb24oKS5zZXRNb2RlKFwiYWNlL21vZGUvXCIgKyBtb2RlKTtcclxuICAgIH0pO1xyXG59IiwiZnVuY3Rpb24gZW5kc1dpdGhTbGFzaChzZXJ2aWNlVGV4dCkge1xyXG4gICAgcmV0dXJuIHNlcnZpY2VUZXh0LmNoYXJBdChzZXJ2aWNlVGV4dC5sZW5ndGggLSAxKSA9PSAnLyc7XHJcbn1cclxuZnVuY3Rpb24gbXNHcmFwaExpbmtSZXNvbHV0aW9uKCRzY29wZSwgYm9keSwgYXJncywgc2VydmljZSkge1xyXG4gICAgaWYgKGFyZ3MuaW5kZXhPZihcImh0dHBzOi8vXCIpID09IC0xKSB7XHJcbiAgICAgICAgaWYgKHNlcnZpY2UudGV4dC5pbmRleE9mKGFyZ3Muc3Vic3RyKDEpKSAhPSAtMSkge1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChzZXJ2aWNlLnRleHQuaW5kZXhPZihcIi9tZVwiKSAhPSAtMSAmJiBzZXJ2aWNlLnRleHQuaW5kZXhPZihcIi9tZS9cIikgPT0gLTEgJiYgc2VydmljZS50ZXh0LmluZGV4T2YoXCIvbWVtYmVyT2ZcIikgPT0gLTEpIHtcclxuICAgICAgICAgICAgc2VydmljZS50ZXh0ID0gc2VydmljZS50ZXh0LnJlcGxhY2UoXCIvbWVcIiwgXCJcIikgKyBcIi91c2Vycy9cIiArIGFyZ3Muc3Vic3RyKDEpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgdmFyIGluZGV4ID0gYm9keS5pbmRleE9mKGFyZ3Muc3Vic3RyKDEpKTtcclxuICAgICAgICAgICAgdmFyIHR5cGVJbmRleCA9IGJvZHkubGFzdEluZGV4T2YoJ0BvZGF0YS50eXBlJywgaW5kZXgpO1xyXG4gICAgICAgICAgICBpZiAodHlwZUluZGV4ICE9IC0xKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgdHlwZUluZGV4RW5kID0gYm9keS5pbmRleE9mKFwiXFxuXCIsIHR5cGVJbmRleCk7XHJcbiAgICAgICAgICAgICAgICB2YXIgdHlwZSA9IGJvZHkuc3Vic3RyKHR5cGVJbmRleCwgdHlwZUluZGV4RW5kIC0gdHlwZUluZGV4KTtcclxuICAgICAgICAgICAgICAgIHR5cGUgPSB0eXBlLnJlcGxhY2UoXCJAb2RhdGEudHlwZVxcXCI6IFxcXCIjbWljcm9zb2Z0LmdyYXBoLlwiLCBcIlwiKTtcclxuICAgICAgICAgICAgICAgIHR5cGUgPSB0eXBlLnJlcGxhY2UoXCJcXFwiXCIsIFwiXCIpLnJlcGxhY2UoXCIsXCIsIFwiXCIpO1xyXG4gICAgICAgICAgICAgICAgc2VydmljZS50ZXh0ID0gXCJodHRwczovL2dyYXBoLm1pY3Jvc29mdC5jb20vdjEuMC9cIiArIHR5cGUgKyBcInMvXCIgKyBhcmdzLnN1YnN0cigxKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGlmIChzZXJ2aWNlLnRleHQuaW5kZXhPZihcIj9cIikgIT0gLTEpIHtcclxuICAgICAgICAgICAgICAgICAgICBzZXJ2aWNlLnRleHQgPSBzZXJ2aWNlLnRleHQuc3Vic3RyKDAsIHNlcnZpY2UudGV4dC5pbmRleE9mKFwiP1wiKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB2YXIgbGlua1VybCA9IFtzZXJ2aWNlLnRleHQsIGFyZ3Muc3Vic3RyKDEpXTtcclxuICAgICAgICAgICAgICAgIGlmIChlbmRzV2l0aFNsYXNoKHNlcnZpY2UudGV4dCkpXHJcbiAgICAgICAgICAgICAgICAgICAgc2VydmljZS50ZXh0ID0gbGlua1VybC5qb2luKFwiXCIpO1xyXG4gICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgIHNlcnZpY2UudGV4dCA9IGxpbmtVcmwuam9pbihcIi9cIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgICBzZXJ2aWNlLnRleHQgPSBhcmdzLnJlcGxhY2UoXCJcXFwiXCIsIFwiXCIpO1xyXG4gICAgfVxyXG4gICAgaWYgKHNlcnZpY2UudGV4dCAmJiBlbmRzV2l0aFNsYXNoKHNlcnZpY2UudGV4dCkpIHtcclxuICAgICAgICBzZXJ2aWNlLnRleHQgKz0gJy8nO1xyXG4gICAgfVxyXG4gICAgJHNjb3BlLiRicm9hZGNhc3QoJ3VwZGF0ZVVybEZyb21TZXJ2aWNlVGV4dCcpO1xyXG4gICAgJHNjb3BlLnN1Ym1pdChzZXJ2aWNlLnRleHQpO1xyXG59XHJcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWFwaS1leHBsb3Jlci1tc2dyYXBoLmpzLm1hcCIsIi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4vLyAgQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uICBBbGwgUmlnaHRzIFJlc2VydmVkLiAgTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiAgU2VlIExpY2Vuc2UgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cclxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcblxyXG5oZWxsby5pbml0KHtcclxuXHRtc2Z0OiB7XHJcblx0XHRvYXV0aDoge1xyXG5cdFx0XHR2ZXJzaW9uOiAyLFxyXG5cdFx0XHRhdXRoOiAnaHR0cHM6Ly9sb2dpbi5taWNyb3NvZnRvbmxpbmUuY29tL29yZ2FuaXphdGlvbnMvb2F1dGgyL3YyLjAvYXV0aG9yaXplJyxcclxuXHRcdFx0Z3JhbnQ6ICdodHRwczovL2xvZ2luLm1pY3Jvc29mdG9ubGluZS5jb20vb3JnYW5pemF0aW9ucy9vYXV0aDIvdjIuMC90b2tlbidcclxuXHRcdH0sXHJcblx0XHRzY29wZV9kZWxpbTogJyAnLFxyXG5cclxuXHRcdC8vIERvbid0IGV2ZW4gdHJ5IHN1Ym1pdHRpbmcgdmlhIGZvcm0uXHJcblx0XHQvLyBUaGlzIG1lYW5zIG5vIFBPU1Qgb3BlcmF0aW9ucyBpbiA8PUlFOVxyXG5cdFx0Zm9ybTogZmFsc2VcclxuXHR9LCBtc2Z0X2FkbWluX2NvbnNlbnQ6IHtcclxuXHRcdG9hdXRoOiB7XHJcblx0XHRcdHZlcnNpb246IDIsXHJcblx0XHRcdGF1dGg6ICdodHRwczovL2xvZ2luLm1pY3Jvc29mdG9ubGluZS5jb20vb3JnYW5pemF0aW9ucy9hZG1pbmNvbnNlbnQnLFxyXG5cdFx0XHRncmFudDogJ2h0dHBzOi8vbG9naW4ubWljcm9zb2Z0b25saW5lLmNvbS9vcmdhbml6YXRpb25zL29hdXRoMi92Mi4wL3Rva2VuJ1xyXG5cdFx0fSxcclxuXHRcdHNjb3BlX2RlbGltOiAnICcsXHJcblxyXG5cdFx0Ly8gRG9uJ3QgZXZlbiB0cnkgc3VibWl0dGluZyB2aWEgZm9ybS5cclxuXHRcdC8vIFRoaXMgbWVhbnMgbm8gUE9TVCBvcGVyYXRpb25zIGluIDw9SUU5XHJcblx0XHRmb3JtOiBmYWxzZVxyXG5cdH0sIG1zZnRfdG9rZW5fcmVmcmVzaDoge1xyXG5cdFx0b2F1dGg6IHtcclxuXHRcdFx0dmVyc2lvbjogMixcclxuXHRcdFx0YXV0aDogJ2h0dHBzOi8vbG9naW4ubWljcm9zb2Z0b25saW5lLmNvbS9vcmdhbml6YXRpb25zL29hdXRoMi92Mi4wL2F1dGhvcml6ZScsXHJcblx0XHRcdGdyYW50OiAnaHR0cHM6Ly9sb2dpbi5taWNyb3NvZnRvbmxpbmUuY29tL29yZ2FuaXphdGlvbnMvb2F1dGgyL3YyLjAvdG9rZW4nXHJcblx0XHR9LFxyXG5cdFx0c2NvcGVfZGVsaW06ICcgJyxcclxuXHJcblx0XHQvLyBEb24ndCBldmVuIHRyeSBzdWJtaXR0aW5nIHZpYSBmb3JtLlxyXG5cdFx0Ly8gVGhpcyBtZWFucyBubyBQT1NUIG9wZXJhdGlvbnMgaW4gPD1JRTlcclxuXHRcdGZvcm06IGZhbHNlXHJcblx0fVxyXG59KTsiLCJ2YXIgcG9zdFRlbXBsYXRlcyA9IHtcclxuICAgIG1lc3NhZ2VzOiB7XHJcbiAgICAgICAgXCJzdWJqZWN0XCI6IFwiTWVldCBmb3IgbHVuY2g/XCIsXHJcbiAgICAgICAgXCJib2R5XCI6IHtcclxuICAgICAgICAgICAgXCJjb250ZW50VHlwZVwiOiBcIlRleHRcIixcclxuICAgICAgICAgICAgXCJjb250ZW50XCI6IFwiVGhlIG5ldyBjYWZldGVyaWEgaXMgb3Blbi5cIlxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXCJ0b1JlY2lwaWVudHNcIjogW1xyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBcImVtYWlsQWRkcmVzc1wiOiB7XHJcbiAgICAgICAgICAgICAgICBcImFkZHJlc3NcIjogXCJnYXJ0aGZAY29udG9zby5jb21cIlxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgXVxyXG4gICAgfSxcclxuICAgIGV2ZW50czoge1xyXG4gICAgICAgIFwic3ViamVjdFwiOiBcIk15IGV2ZW50XCIsXHJcbiAgICAgICAgXCJzdGFydFwiOiB7XHJcbiAgICAgICAgICAgIFwiZGF0ZVRpbWVcIjogXCIyMDE3LTA1LTA3VDE2OjE1OjAwLjAwMDAwMDBcIixcclxuICAgICAgICAgICAgXCJ0aW1lWm9uZVwiOiBcIlVUQ1wiXHJcbiAgICAgICAgfSxcclxuICAgICAgICBcImVuZFwiOiB7XHJcbiAgICAgICAgICAgIFwiZGF0ZVRpbWVcIjogXCIyMDE3LTA2LTA3VDE2OjE1OjAwLjAwMDAwMDBcIixcclxuICAgICAgICAgICAgXCJ0aW1lWm9uZVwiOiBcIlVUQ1wiXHJcbiAgICAgICAgfSxcclxuICAgIH0sXHJcbiAgICBzZW5kTWFpbDoge1xyXG4gICAgICAgIFwibWVzc2FnZVwiOiB7XHJcbiAgICAgICAgICAgIFwic3ViamVjdFwiOiBcIk1lZXQgZm9yIGx1bmNoP1wiLFxyXG4gICAgICAgICAgICBcImJvZHlcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJjb250ZW50VHlwZVwiOiBcIlRleHRcIixcclxuICAgICAgICAgICAgICAgIFwiY29udGVudFwiOiBcIlRoZSBuZXcgY2FmZXRlcmlhIGlzIG9wZW4uXCJcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJ0b1JlY2lwaWVudHNcIjogW1xyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIFwiZW1haWxBZGRyZXNzXCI6IHtcclxuICAgICAgICAgICAgICAgICAgICBcImFkZHJlc3NcIjogXCJnYXJ0aGZAY29udG9zby5jb21cIlxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXCJzYXZlVG9TZW50SXRlbXNcIjogXCJmYWxzZVwiXHJcbiAgICB9LFxyXG4gICAgZmluZE1lZXRpbmdUaW1lczoge1xyXG4gICAgICAgIFwiYXR0ZW5kZWVzXCI6IFtcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICBcImVtYWlsQWRkcmVzc1wiOiB7XHJcbiAgICAgICAgICAgICAgICBcImFkZHJlc3NcIjogXCJGVUxMX1VTRVJfRU1BSUxcIixcclxuICAgICAgICAgICAgICAgIFwibmFtZVwiOiBcIkFsZXggRGFycm93XCJcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJ0eXBlXCI6IFwiUmVxdWlyZWRcIlxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgXSxcclxuICAgICAgICBcInRpbWVDb25zdHJhaW50XCI6IHtcclxuICAgICAgICAgICAgXCJ0aW1lc2xvdHNcIjogW1xyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgIFwic3RhcnRcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJkYXRlVGltZVwiOiBcIjIwMTYtMTAtMjBUMDc6MDA6MDBcIiwgIFxyXG4gICAgICAgICAgICAgICAgXCJ0aW1lWm9uZVwiOiBcIlBhY2lmaWMgU3RhbmRhcmQgVGltZVwiIFxyXG4gICAgICAgICAgICAgICAgfSwgIFxyXG4gICAgICAgICAgICAgICAgXCJlbmRcIjogeyBcclxuICAgICAgICAgICAgICAgIFwiZGF0ZVRpbWVcIjogXCIyMDE2LTEwLTIwVDE3OjAwOjAwXCIsICBcclxuICAgICAgICAgICAgICAgIFwidGltZVpvbmVcIjogXCJQYWNpZmljIFN0YW5kYXJkIFRpbWVcIiBcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBdXHJcbiAgICAgICAgfSxcclxuICAgICAgICBcImxvY2F0aW9uQ29uc3RyYWludFwiOiB7XHJcbiAgICAgICAgXCJpc1JlcXVpcmVkXCI6IFwiZmFsc2VcIixcclxuICAgICAgICBcInN1Z2dlc3RMb2NhdGlvblwiOiBcInRydWVcIixcclxuICAgICAgICBcImxvY2F0aW9uc1wiOiBbXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgXCJkaXNwbGF5TmFtZVwiOiBcIkNvbmYgUm9vbSAzMi8xMzY4XCIsXHJcbiAgICAgICAgICAgIFwibG9jYXRpb25FbWFpbEFkZHJlc3NcIjogXCJjb25mMzJyb29tMTM2OEBpbWdlZWsub25taWNyb3NvZnQuY29tXCJcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIF1cclxuICAgICAgICB9LFxyXG4gICAgICAgIFwibWVldGluZ0R1cmF0aW9uXCI6IFwiUFQxSFwiXHJcbiAgICAgICAgfSxcclxuICAgIHVzZXJzOiB7XHJcbiAgICAgICAgXCJhY2NvdW50RW5hYmxlZFwiOiB0cnVlLFxyXG4gICAgICAgIFwiY2l0eVwiOiBcIlNlYXR0bGVcIixcclxuICAgICAgICBcImNvdW50cnlcIjogXCJVbml0ZWQgU3RhdGVzXCIsXHJcbiAgICAgICAgXCJkZXBhcnRtZW50XCI6IFwiU2FsZXMgJiBNYXJrZXRpbmdcIixcclxuICAgICAgICBcImRpc3BsYXlOYW1lXCI6IFwiTWVsaXNzYSBEYXJyb3dcIixcclxuICAgICAgICBcImdpdmVuTmFtZVwiOiBcIk1lbGlzc2FcIixcclxuICAgICAgICBcImpvYlRpdGxlXCI6IFwiTWFya2V0aW5nIERpcmVjdG9yXCIsXHJcbiAgICAgICAgXCJtYWlsTmlja25hbWVcIjogXCJNZWxpc3NhRFwiLFxyXG4gICAgICAgIFwicGFzc3dvcmRQb2xpY2llc1wiOiBcIkRpc2FibGVQYXNzd29yZEV4cGlyYXRpb25cIixcclxuICAgICAgICBcInBhc3N3b3JkUHJvZmlsZVwiOiB7XHJcbiAgICAgICAgICAgIFwicGFzc3dvcmRcIjogXCJUZXN0MTIzNFwiLFxyXG4gICAgICAgICAgICBcImZvcmNlQ2hhbmdlUGFzc3dvcmROZXh0U2lnbkluXCI6IGZhbHNlXHJcbiAgICAgICAgfSxcclxuICAgICAgICBcIm9mZmljZUxvY2F0aW9uXCI6IFwiMTMxLzExMDVcIixcclxuICAgICAgICBcInBvc3RhbENvZGVcIjogXCI5ODA1MlwiLFxyXG4gICAgICAgIFwicHJlZmVycmVkTGFuZ3VhZ2VcIjogXCJlbi1VU1wiLFxyXG4gICAgICAgIFwic3RhdGVcIjogXCJXQVwiLFxyXG4gICAgICAgIFwic3RyZWV0QWRkcmVzc1wiOiBcIjkyNTYgVG93bmUgQ2VudGVyIERyLiwgU3VpdGUgNDAwXCIsXHJcbiAgICAgICAgXCJzdXJuYW1lXCI6IFwiRGFycm93XCIsXHJcbiAgICAgICAgXCJtb2JpbGVQaG9uZVwiOiBcIisxIDIwNiA1NTUgMDExMFwiLFxyXG4gICAgICAgIFwidXNhZ2VMb2NhdGlvblwiOiBcIlVTXCIsXHJcbiAgICAgICAgXCJ1c2VyUHJpbmNpcGFsTmFtZVwiOiBcIk1lbGlzc2FEQEFVVEhFTlRJQ0FURURfRE9NQUlOXCIsXHJcbiAgICB9LFxyXG4gICAgZ3JvdXBzOiB7XHJcbiAgICAgICAgXCJAb2RhdGEudHlwZVwiOiBcIiNNaWNyb3NvZnQuR3JhcGguR3JvdXBcIixcclxuICAgICAgICBcImRlc2NyaXB0aW9uXCI6IFwiVGhpcyBncm91cCBpcyB0aGUgYmVzdCBldmVyXCIsXHJcbiAgICAgICAgXCJkaXNwbGF5TmFtZVwiOiBcIlVuaWZpZWQgZ3JvdXAgM2VmMTVcIixcclxuICAgICAgICBcImdyb3VwVHlwZXNcIjogW1xyXG4gICAgICAgICAgICBcIlVuaWZpZWRcIlxyXG4gICAgICAgIF0sXHJcbiAgICAgICAgXCJtYWlsRW5hYmxlZFwiOiB0cnVlLFxyXG4gICAgICAgIFwibWFpbE5pY2tuYW1lXCI6IFwiR3JvdXA5MTFlNVwiLFxyXG4gICAgICAgIFwic2VjdXJpdHlFbmFibGVkXCI6IHRydWVcclxuICAgIH0sXHJcbiAgICBjb250YWN0czoge1xyXG4gICAgICAgIFwiZ2l2ZW5OYW1lXCI6IFwiUGF2ZWxcIixcclxuICAgICAgICBcInN1cm5hbWVcIjogXCJCYW5za3lcIixcclxuICAgICAgICBcImVtYWlsQWRkcmVzc2VzXCI6IFtcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICBcImFkZHJlc3NcIjogXCJwYXZlbGJAZmFicmlrYW0ub25taWNyb3NvZnQuY29tXCIsXHJcbiAgICAgICAgICAgIFwibmFtZVwiOiBcIlBhdmVsIEJhbnNreVwiXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICBdLFxyXG4gICAgICAgIFwiYnVzaW5lc3NQaG9uZXNcIjogW1xyXG4gICAgICAgICAgICBcIisxIDczMiA1NTUgMDEwMlwiXHJcbiAgICAgICAgXVxyXG4gICAgfVxyXG59XHJcblxyXG52YXIgdGVtcGxhdGVOYW1lcyA9IHtcclxuICAgIG1lc3NhZ2VzOiAnbWVzc2FnZScsXHJcbiAgICBldmVudHM6ICdldmVudCcsXHJcbiAgICBzZW5kTWFpbDogJ2VtYWlsJ1xyXG59IiwidmFyIHJlcXVlc3RIaXN0b3J5ID0gW107XHJcbnZhciBMb2NhbFN0b3JhZ2VLZXlHcmFwaFJlcXVlc3RIaXN0b3J5ID0gXCJHUkFQSF9SRVFVRVNUX0hJU1RPUllcIjtcclxuXHJcbmZ1bmN0aW9uIHNhdmVIaXN0b3J5VG9Mb2NhbFN0b3JhZ2UoKSB7XHJcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShMb2NhbFN0b3JhZ2VLZXlHcmFwaFJlcXVlc3RIaXN0b3J5LCBKU09OLnN0cmluZ2lmeShyZXF1ZXN0SGlzdG9yeSkpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBsb2FkSGlzdG9yeUZyb21Mb2NhbFN0b3JhZ2UoKSB7XHJcbiAgICB2YXIgcG9zc2libGVIaXN0b3J5ID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oTG9jYWxTdG9yYWdlS2V5R3JhcGhSZXF1ZXN0SGlzdG9yeSk7XHJcblxyXG4gICAgaWYgKHBvc3NpYmxlSGlzdG9yeSA9PSBudWxsKSB7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIHJlcXVlc3RIaXN0b3J5ID0gSlNPTi5wYXJzZShwb3NzaWJsZUhpc3RvcnkpO1xyXG59XHJcblxyXG5cclxuZnVuY3Rpb24gc2F2ZUhpc3RvcnlPYmplY3QoaGlzdG9yeU9iamVjdCwgc3RhdHVzQ29kZSwgZHVyYXRpb24pIHtcclxuICAgIGhpc3RvcnlPYmplY3Quc3VjY2Vzc2Z1bCA9IHN0YXR1c0NvZGUgPj0gMjAwICYmIHN0YXR1c0NvZGUgPCAzMDA7XHJcbiAgICBoaXN0b3J5T2JqZWN0LnN0YXR1c0NvZGUgPSBzdGF0dXNDb2RlO1xyXG4gICAgaGlzdG9yeU9iamVjdC5kdXJhdGlvbiA9IGR1cmF0aW9uO1xyXG4gICAgaGlzdG9yeU9iamVjdC5yZXF1ZXN0SWQgPSBNYXRoLnJhbmRvbSgpLnRvU3RyaW5nKDM2KS5yZXBsYWNlKC9bXmEtel0rL2csICcnKS5zdWJzdHIoMCwgMTApO1xyXG5cclxuICAgIHJlcXVlc3RIaXN0b3J5LnNwbGljZSgwLCAwLCBoaXN0b3J5T2JqZWN0KTsgLy9hZGQgaGlzdG9yeSBvYmplY3QgdG8gdGhlIGFycmF5XHJcblxyXG4gICAgc2F2ZUhpc3RvcnlUb0xvY2FsU3RvcmFnZSgpO1xyXG59XHJcblxyXG5cclxuLy8gaW5pdCBzY3JpcHRzXHJcblxyXG5cclxubG9hZEhpc3RvcnlGcm9tTG9jYWxTdG9yYWdlKCk7IiwiZnVuY3Rpb24gY3JlYXRlU2hhcmVMaW5rKGZ1bGxSZXF1ZXN0VXJsLCBhY3Rpb24sIHZlcnNpb24pIHsgICAgXHJcbiAgICByZXR1cm4gd2luZG93LmxvY2F0aW9uLm9yaWdpbiArIHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZSArIFwiP3JlcXVlc3Q9XCIgKyBleHRyYWN0R3JhcGhFbmRwb2ludChmdWxsUmVxdWVzdFVybCkgKyBcIiZtZXRob2Q9XCIgKyBhY3Rpb24gKyBcIiZ2ZXJzaW9uPVwiICsgdmVyc2lvbjtcclxufVxyXG5cclxuZnVuY3Rpb24gZXh0cmFjdEdyYXBoRW5kcG9pbnQoZnVsbFJlcXVlc3RVcmwpIHtcclxuICAgIHJlcXVlc3RVcmwgPSBmdWxsUmVxdWVzdFVybC5zcGxpdCgnLmNvbScpXHJcbiAgICByZXF1ZXN0VXJsLnNoaWZ0KCk7XHJcbiAgICBcclxuICAgIHZhciByZXF1ZXN0VXJsQ29tcG9uZW50cyA9IHJlcXVlc3RVcmxbMF0uc3BsaXQoJy8nKTtcclxuICAgIHJlcXVlc3RVcmxDb21wb25lbnRzLnNoaWZ0KCk7IC8vcmVtb3ZlIGVtcHR5IGl0ZW1cclxuICAgIHJlcXVlc3RVcmxDb21wb25lbnRzLnNoaWZ0KCk7IC8vcmVtb3ZlIHZlcnNpb25cclxuICAgIHJldHVybiAocmVxdWVzdFVybENvbXBvbmVudHMuam9pbignLycpKTtcclxufVxyXG5cclxuZnVuY3Rpb24gaXNQb3N0T3JQYXRjaChvcHRpb24pIHtcclxuICAgIHJldHVybiAgb3B0aW9uID09IFwiUE9TVFwiIHx8IG9wdGlvbiA9PSBcIlBBVENIXCI7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIFNoYXJlRGlhbG9nQ29udHJvbGxlcigkc2NvcGUsICRtZERpYWxvZywgYXBpU2VydmljZSwgJHNjZSwgaGVhZGVycywgYm9keSkge1xyXG4gICAgdmFyIF9hcGlTZXJ2aWNlID0gYXBpU2VydmljZTtcclxuICAgICRzY29wZS5oaWRlID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgJG1kRGlhbG9nLmhpZGUoKTtcclxuICAgIH07XHJcblxyXG4gICAgJHNjb3BlLmNhbmNlbCA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICRtZERpYWxvZy5jYW5jZWwoKTtcclxuICAgIH07XHJcbiAgICBcclxuICAgICRzY29wZS5nZXRTaGFyZUxpbmsgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICB2YXIgcmVxdWVzdFVybCA9ICRzY29wZS5nZXRSYXdTZWFyY2hUZXh0KCk7XHJcbiAgICAgICAgcmV0dXJuIGNyZWF0ZVNoYXJlTGluayhyZXF1ZXN0VXJsLCBfYXBpU2VydmljZS5zZWxlY3RlZE9wdGlvbiwgX2FwaVNlcnZpY2Uuc2VsZWN0ZWRWZXJzaW9uKTtcclxuICAgIH1cclxuXHJcbiAgICAkc2NvcGUuZ2VuZXJhdGVTdXBlckFnZW50Q29kZSA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHZhciByZXF1ZXN0VXJsID0gJHNjb3BlLmdldFJhd1NlYXJjaFRleHQoKTtcclxuXHJcbiAgICAgICAgdmFyIGZ1bGxHcmFwaFVybCA9IFwiaHR0cHM6Ly9ncmFwaC5taWNyb3NvZnQuY29tL1wiICsgX2FwaVNlcnZpY2Uuc2VsZWN0ZWRWZXJzaW9uICsgXCIvXCIgKyBleHRyYWN0R3JhcGhFbmRwb2ludChyZXF1ZXN0VXJsKTtcclxuXHJcbiAgICAgICAgdmFyIHRhYiA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gXCI8c3BhbiBzdHlsZT0ncGFkZGluZy1sZWZ0OjE1cHgnPjwvc3Bhbj5cIjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHZhciBsaW5lID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBcIjxicj5cIlxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdmFyIHN0ciA9IFwicmVxdWVzdFwiO1xyXG4gICAgICAgIHN0ciArPSBsaW5lKCkgKyB0YWIoKSArIFwiLlwiICsgX2FwaVNlcnZpY2Uuc2VsZWN0ZWRPcHRpb24udG9Mb2NhbGVMb3dlckNhc2UoKSArIFwiKFxcXCJcIiArIGZ1bGxHcmFwaFVybCArIFwiXFxcIilcIlxyXG5cclxuICAgICAgICBpZiAoT2JqZWN0LmtleXMoaGVhZGVycykubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICBzdHIgKz0gbGluZSgpICsgdGFiKCkgKyBcIi5zZXQoXCIgKyBKU09OLnN0cmluZ2lmeShoZWFkZXJzKSArIFwiKVwiO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGlzUG9zdE9yUGF0Y2goIF9hcGlTZXJ2aWNlLnNlbGVjdGVkT3B0aW9uKSkge1xyXG4gICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgdmFyIGJvZHlPYmogPSBKU09OLnBhcnNlKGJvZHkpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGJvZHlPYmopIHtcclxuICAgICAgICAgICAgICAgICAgICBzdHIgKz0gbGluZSgpICsgdGFiKCkgKyBcIi5zZW5kKFwiICsgSlNPTi5zdHJpbmdpZnkoYm9keU9iaikgKyBcIilcIjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBjYXRjaChlKSB7XHJcblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gXHJcbiAgICAgICAgc3RyICs9IGxpbmUoKSArIHRhYigpICsgXCIuZW5kKGZ1bmN0aW9uKGVyciwgcmVzKSB7XCJcclxuICAgICAgICBzdHIgKz0gbGluZSgpICsgdGFiKCkgKyB0YWIoKSArIFwiY29uc29sZS5sb2cocmVzKTtcIlxyXG4gICAgICAgIHN0ciArPSBsaW5lKCkgKyB0YWIoKSArIFwifSk7XCJcclxuICAgICAgICByZXR1cm4gJHNjZS50cnVzdEFzSHRtbChzdHIpO1xyXG4gICAgfVxyXG59Il19
