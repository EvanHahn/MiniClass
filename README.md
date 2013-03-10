Classy.js
=========

A tiny class library. I wrote this mostly to make sure I understood JavaScript's prototype stuff.

Usage
-----

Pretty straightforward, I hope:

    var MagicalPerson = Classy.extend({
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
    merlin.introduce();  // => "Hello! I am a magical wizard and my name is Merlin!"
