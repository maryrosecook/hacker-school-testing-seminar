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
  },

  mock: function() {
    var expectedArgs = Array.prototype.slice.call(arguments);
    var self = this;
    return function() {
      var actualArgs = Array.prototype.slice.call(arguments);
      if (expectedArgs.length !== actualArgs.length) {
        throw new Error("Wrong number of args to mocked function");
      }

      for (var i = 0; i < expectedArgs.length; i++) {
        if (expectedArgs[i] !== self.SKIP) {
          self.isEqual(expectedArgs[i], actualArgs[i]);
        }
      }
    };
  },

  SKIP: 'o89eu9o8ehu9o8ehu98hoeu98hoeu98hoeu98hoe98uho.98hu9,.'
};
