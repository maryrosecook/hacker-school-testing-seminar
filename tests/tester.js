var isString = function(n) {
  return typeof n === 'string';
};

var isNumber = function(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

var gatherTests = function(testArray) {
  return Array.prototype.slice.call(testArray).reduce(function(a, x, i) {
    return i % 2 === 0 ? a : a.concat(x);
  }, []);
};

exports.tester = {
  test: function(tests) {
    gatherTests(arguments).forEach(function(test) {
      test();
      process.stdout.write(".");
    });

    console.log();
  },

  isEqual: function(a, b) {
    if (((isString(a) && isString(b)) ||
         (isNumber(a) && isNumber(b))) &&
        a === b) {
      // test passed
    } else {
      throw new Error(a + " and " + b + " are not equal");
    }
  }
};
