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

var testSync = function(test, testComplete) {
  test();
  testComplete();
};

var testAsync = function(test, testComplete) {
  var timeout = setTimeout(function() {
    throw new Error("Failed: done() never called in async test.");
  }, 500);

  test(function() {
    clearTimeout(timeout);
    testComplete();
  });
};

var runTests = function(tests) {
  if (tests.length === 0) {
    console.log();
    process.exit();
    return;
  }

  var testComplete = function() {
    process.stdout.write(".");
    runTests(tests.slice(1));
  };

  tests[0].length === 1 ?
    testAsync(tests[0], testComplete) :
    testSync(tests[0], testComplete);
};

exports.tester = {
  test: function(tests) {
    runTests(gatherTests(arguments));
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
