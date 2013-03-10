var expect = require("expect.js");

var Classy = require("../classy.js");

describe("Classy", function() {

	it("should allow classes to be created", function() {
		var foo = new Classy;
		var bar = new Classy;
		foo.x = 12;
		bar.x = 8;
		expect(foo.x).equal(12);
		expect(bar.x).equal(8);
	});

});
