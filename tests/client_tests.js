var tester = require('./tester').tester;
var client = require('../client');

tester.test(
  'should draw sun and blue sky in canvas when it is daytime', function() {
    global.XMLHttpRequest = function() {
      this.open = function() {};

      this.send = function() {
        this.onload({
          target: { responseText: '{ "time": "day" }' }
        });
      };
    };

    global.document = {
      getElementById: function() { return { getContext: function() {}}}
    };

    var mocksRunCount = 0;
    global.canvasRenderer = {
      center: function() { return { x: 150, y: 75 } },

      fillBackground: function(_, color) {
        tester.isEqual(color, "#00f");
        mocksRunCount++;
      },

      fillCircle: function(_, x, y, radius, color) {
        tester.isEqual(x, 150);
        tester.isEqual(y, 75);
        tester.isEqual(radius, 30);
        tester.isEqual(color, "#ff0");
        mocksRunCount++;
      }
    };

    client.loadTime();
    tester.isEqual(mocksRunCount, 2);
  }
);
