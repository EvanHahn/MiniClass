(function(global) {

	// `Classy` is just the base class for everything, and its constructor is
	// empty.
	var Classy = function() {};

	// `extend()` is the exciting method that's inherited by everything.
	Classy.extend = function(hash) {

		// Generate the resulting object.
		return (function closure(par, ctor) {

			// If no constructor is defined, define an empty one.
			if (!ctor)
				ctor = function() {};

			// Create the constructor, which calls the parent constructor and the
			// child one.
			var Class = function() {
				par.apply(this, arguments);
				ctor.apply(this, arguments);
			};

			// Inherit all the properties from the parent.
			for (var property in par.prototype)
				Class.prototype[property] = par.prototype[property];

			// Get all the properties from the new hash.
			var existingFunctions = methods = {};
			for (var property in hash) {

				// If we already have a property in there that's a function, the child
				// needs a `sup()` method in there.
				var existingFunctions = methods = {};
				existingFunctions[property] = par.prototype[property];
				methods[property] = hash[property];
				if (typeof existingFunctions[property] === 'function') {
					Class.prototype[property] = function() {
						this.sup = function() {
							existingFunctions[property].apply(this, arguments);
						};
						return methods[property].apply(this, arguments);
					};
				}

				// We didn't have that existing parent function, so we're good.
				else {
					Class.prototype[property] = function() {
						this.sup = void 0;
						return methods[property].apply(this, arguments);
					};
				}

			}

			// Make sure to get `extend()` into the class.
			Class.extend = Classy.extend;

			// Return the constructor (with attached prototype stuff).
			return Class;

		})(this, hash.init);

	};

	// Export everything.
	if (module != null) {
		module.exports = Classy;
	} else {
		// this.Classy = Classy;
	}

})(this);
