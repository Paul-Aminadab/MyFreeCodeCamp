"use strict";

var Car = function Car(wheels, seats, engines) {
  //Change this constructor
  this.wheels = wheels;
  this.seats = seats;
  this.engines = engines;
};

//Try it out here
var myCar = new Car(3, 1, 2);

// Only change code above this line

(function () {
  return JSON.stringify(myCar);
})();

//# sourceMappingURL=4-compiled.js.map