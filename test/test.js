var expect = require("expect.js");

var Classy = require("../classy.js");

describe("Classy", function() {

	var undefined;

	it("should allow classes to be created", function() {
		var foo = new Classy;
		var bar = new Classy;
		foo.x = 12;
		bar.x = 8;
		expect(foo).not.equal(bar);
		expect(foo.x).eql(12);
		expect(bar.x).eql(8);
	});

	it("allows subclasses to be created, one level deep", function() {
		var Foo = Classy.extend({
			x: 12,
			thing: function() {
				return "I am foo!";
			}
		});
		var Bar = Classy.extend({
			x: 8,
			thing: function() {
				return "I am bar.";
			}
		});
		expect(Foo.x).eql(undefined);
		expect(Bar.x).eql(undefined);
		var foo = new Foo;
		var bar = new Bar;
		expect(foo.x).eql(12);
		expect(foo.thing()).eql("I am foo!");
		expect(bar.x).eql(8);
		expect(bar.thing()).eql("I am bar.");
	});

});
