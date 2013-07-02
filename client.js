;(function(exports) {
  exports.loadTime = function() {
    var req = new XMLHttpRequest();
    req.onload = function(event) {
      var ctx = document.getElementById("canvas").getContext('2d');
      var responseJSON = JSON.parse(event.target.responseText);
      var time = responseJSON.time;

      var center = canvasRenderer.center(ctx);
      if (time === "day") {
        canvasRenderer.fillBackground(ctx, "#00f");
        canvasRenderer.fillCircle(ctx, center.x, center.y, 30, "#ff0");
      } else if (time === "night") {
        canvasRenderer.fillBackground(ctx, "#000");
        canvasRenderer.fillCircle(ctx, center.x, center.y, 30, "#aaa");
      }
    };

    req.open("GET", "/time.json", true);
    req.send();
  };
})(this);
