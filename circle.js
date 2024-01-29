function Circle(x, y, r) {
  var options = {
    restitution: 0.5,
  };
  this.body = Bodies.circle(x, y, r, options);
  this.r = r;
  Composite.add(world, this.body);

  this.show = function () {
    var pos = this.body.position;
    var angle = this.body.angle;

    stroke(255);
    fill(255);

    push();
    translate(pos.x, pos.y);
    rotate(radians(angle));
    circle(0, 0, this.r * 2);
    pop();
  };
}