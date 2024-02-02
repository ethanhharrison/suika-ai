function Barrier(x, y, w, h) {
  var options = {
    isStatic: true,
  };
  this.body = Bodies.rectangle(x, y, w, h, options);
  this.w = w;
  this.h = h;
  barriers[this.body.id] = this;
  Composite.add(world, this.body);

  this.show = function () {
    var pos = this.body.position;
    var angle = this.body.angle;

    stroke(0);
    fill(0);

    push();
    translate(pos.x, pos.y);
    rect(0, 0, this.w, this.h);
    pop();
  };
}
