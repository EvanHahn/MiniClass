(function() {

	// the main constructor function is just a noop
	var MiniClass = function() {};

	// one method: extend
	MiniClass.extend = function(hash) {

		// default hash is {}
		hash || (hash = {});

		// for clarity, alias parent
		var parent = this;

		// build the constructor
		var ctor = hash.initialize;

		// create the constructor, which calls the parent constructor
		var klass = function() {
			if (ctor)
				ctor.apply(this, arguments);
			else
				parent.apply(this, arguments);
		};

		// and now we will build this variable which we'll use
		var property;

		// inherit all the class members from the parent
		for (property in parent) {
			if (property != 'prototype')
				klass[property] = parent[property];
		}

		// inherit all the instance members
		for (property in parent.prototype)
			klass.prototype[property] = parent.prototype[property];

		// get all the properties from the new hash
		for (property in hash)
			klass.prototype[property] = hash[property];

		// return the constructor with attached protoype stuff
		return klass;

	};

	// mmm export that puppy
	if (module.exports)
		module.exports = MiniClass;
	else
		this.MiniClass = MiniClass;

})();