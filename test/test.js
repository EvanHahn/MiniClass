var expect = require("expect.js");

var MiniClass = require("../miniclass.js");

describe("MiniClass", function() {

	var undefined;

	it("should allow MiniClass instances to be created", function() {
		var foo = new MiniClass;
		var bar = new MiniClass;
		foo.x = 12;
		bar.x = 8;
		expect(foo).not.equal(bar);
		expect(foo.x).eql(12);
		expect(bar.x).eql(8);
	});

	it("allows subclasses to be created, one level deep", function() {
		var Foo = MiniClass.extend({
			x: 12,
			thing: function() {
				return "I am foo!";
			}
		});
		var Bar = MiniClass.extend({
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

	it("allows subclasses to be created, multiple levels deep", function() {
		var Employee = MiniClass.extend({
			type: "employee",
			introduce: function() {
				return "Hello! I am a(n) " + this.type;
			}
		});
		var Manager = Employee.extend({
			type: "manager",
		});
		var President = Manager.extend({
			type: "president",
		});
		var e = new Employee;
		var m = new Manager;
		var p = new President;
		expect(e.introduce()).eql("Hello! I am a(n) employee");
		expect(m.introduce()).eql("Hello! I am a(n) manager");
		expect(p.introduce()).eql("Hello! I am a(n) president");
	});

	it("supports constructor functions with no arguments", function() {
		var counter = 0;
		var Foo = MiniClass.extend({
			initialize: function() {
				counter ++;
			}
		});
		new Foo;
		new Foo;
		new Foo;
		expect(counter).eql(3);
	});

	it("supports constructor functions with arguments", function() {
		var counter = 0;
		var Foo = MiniClass.extend({
			initialize: function(amount) {
				counter += amount;
			}
		});
		new Foo(1);
		new Foo(50);
		new Foo(-2);
		expect(counter).eql(49);
	});

	it("can defer to parent methods", function() {
		var MagicalPerson = MiniClass.extend({
			initialize: function(first) {
				this.firstName = first;
			},
			introduce: function() {
				return "Hello. I am a magical " + this.type + " and my name is " + this.firstName + "!";
			}
		});
		var Wizard = MagicalPerson.extend({
			type: "wizard"
		});
		var merlin = new Wizard("Merlin");
		expect(merlin.introduce()).eql("Hello. I am a magical wizard and my name is Merlin!");
	});

});
