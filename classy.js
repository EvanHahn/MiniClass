/* Classy.js
   by Evan Hahn */

var Classy = function() {};

Classy.extend = function(hash) {

	// Generate the result
	var result = (function closure(par, ctor, privates) {

		// Constructor
		if (!ctor)
			ctor = function() {};
		var object = function() {
			par.call(this, arguments);
			ctor.call(this, arguments);
		};

		// Inherit all the properties
		for (var property in par.prototype)
			object.prototype[property] = par.prototype[property];
		for (var property in hash)
			object.prototype[property] = hash[property];
		object.extend = Classy.extend;

		// Give the closure all of the private properties
		for (var property in privates)
			closure[property] = privates[property];

		// Return the constructor
		return object;

	})(this, hash.init, hash.privates);

	// Return the result!
	return result;

};
