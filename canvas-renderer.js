;(function(exports) {
  exports.canvasRenderer = {
    center: function(ctx) {
      return { x: ctx.canvas.width / 2, y:ctx.canvas.height / 2 };
    },

    fillBackground: function(ctx, color) {
      ctx.fillStyle = color;
      ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    },

    fillCircle: function(ctx, x, y, radius, color) {
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.closePath();
      ctx.fill();
    }
  };
})(this);
