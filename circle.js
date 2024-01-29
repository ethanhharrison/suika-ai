function Circle(x, y, r) {
  this.body = Bodies.circle(x, y, r);
  this.r = r;
  Composite.add(world, this.body);

  this.show = function () {
    var pos = this.body.position;
    var angle = this.body.angle;

    push();
    translate(pos.x, pos.y);
    circle(0, 0, this.r);
    pop();
  };
}
