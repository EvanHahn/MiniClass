;(function() {

	// First, define some useful things.
	var noop = function() {};

	// `Classy` is just the base class for everything, and its constructor is
	// empty.
	var Classy = function() {};

	// `extend()` is the exciting method that's inherited by everything.
	Classy.extend = function(hash) {

		// Default hash is {}.
		hash || (hash = {});

		// For clarity, alias "parent".
		var parent = this;

		// Build the constructor.
		// If we don't have one, steal the parent's, or a noop if we're extending
		// `Classy`.
		var ctor = hash.initialize;

		// Create the constructor, which calls the parent constructor and the
		// child one.
		var Class = function() {
			this.super = parent;
			if (ctor)
				ctor.apply(this, arguments);
			else
				parent.apply(this, arguments);
		};

		// Inherit all the class methods/properties from the parent.
		for (var property in parent) {
			if (property !== "prototype")
				Class[property] = parent[property];
		}

		// Inherit all the instance methods/properties.
		for (var property in parent.prototype)
			Class.prototype[property] = parent.prototype[property];

		// Get all the properties from the new hash.
		for (var property in hash) {

			// If it's not a method, don't even worry about it.
			if (typeof hash[property] !== "function") {
				Class.prototype[property] = hash[property];
			}

			// It's a function -- a little more difficult.
			else {

				// If we already have a property in there that's a function, the child
				// needs a `super()` method in there.
				if (typeof parent.prototype[property] === "function") {
					Class.prototype[property] = function() {
						var self = this;
						this.super = function() {
							parent.prototype[property].apply(self, arguments);
						};
						return hash[property].apply(this, arguments);
					};
				}

				// We didn't have that existing parent function, so we're good.
				else {
					Class.prototype[property] = function() {
						this.super = noop;
						return hash[property].apply(this, arguments);
					};
				}

			}

		}

		// Return the constructor (with attached prototype stuff).
		return Class;

	};

	// Export everything.
	if (typeof module !== "undefined") {
		module.exports = Classy;
	} else {
		this.Classy = Classy;
	}

})(this);
