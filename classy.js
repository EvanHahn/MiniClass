;(function(global) {

	// `Classy` is just the base class for everything, and its constructor is
	// empty.
	var Classy = function() {};

	// `extend()` is the exciting method that's inherited by everything.
	Classy.extend = function(hash) {

		// Generate the resulting object.
		return (function(parent, ctor) {

			// If no constructor is defined, define an empty one.
			if (!ctor)
				ctor = function() {};

			// Create the constructor, which calls the parent constructor and the
			// child one.
			var Class = function() {
				ctor.apply(this, arguments);
			};

			// Inherit all the properties from the parent.
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
							this.super = function() {};
							return hash[property].apply(this, arguments);
						};
					}

				}

			}

			// Return the constructor (with attached prototype stuff).
			return Class;

		})(this, hash.init);

	};

	// Export everything.
	if (typeof module !== "undefined") {
		module.exports = Classy;
	} else {
		this.Classy = Classy;
	}

})(this);
