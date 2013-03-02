var expect = require("expect.js");

var Classy = require("../classy.js");

describe("simple instantiation", function() {
	it("should allow classes to be created", function() {
		var foo = new Classy;
		var bar = new Classy;
		foo.x = 12;
		bar.x = 8;
		expect(foo.x).toEqual(12);
		expect(bar.x).toEqual(8);
	});
});
