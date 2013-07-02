;(function(exports) {
  exports.get = function(url, callback) {
    var req = new XMLHttpRequest();
    req.onload = callback;
    req.open("GET", url, true);
    req.send();
  };

  exports.getTime = function(callback) {
    exports.get('/time.json', function(data) {
      var responseJSON = JSON.parse(data.target.responseText);
      callback(responseJSON.time);
    });
  };

  exports.displayTime = function(time) {
    var ctx = document.getElementById("canvas").getContext('2d');
    var center = canvasRenderer.center(ctx);
    if (time === "day") {
      canvasRenderer.fillBackground(ctx, "#00f");
      canvasRenderer.fillCircle(ctx, center.x, center.y, 30, "#ff0");
    } else if (time === "night") {
      canvasRenderer.fillBackground(ctx, "#000");
      canvasRenderer.fillCircle(ctx, center.x, center.y, 30, "#aaa");
    }
  };
})(this);
