"use strict";

var ourArray = [1, 2, 3];

var ourData = ourArray[0]; // equals 1

var myArray = [1, 2, 3];

// Only change code below this line.

var myData = myArray[0];
// Only change code above this line.

if (typeof myArray !== "undefined" && typeof myData !== "undefined") {
  (function (y, z) {
    return 'myArray = ' + JSON.stringify(y) + ', myData = ' + JSON.stringify(z);
  })(myArray, myData);
}

//# sourceMappingURL=access-array-data-with-indices-compiled.js.map