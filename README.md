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
    merlin.introduce();  // => "Hello. I am a magical wizard and my name is Merlin!"

Running the tests
-----------------

    npm install
    mocha

MIT License
-----------

Copyright (c) 2013 Evan Hahn

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.