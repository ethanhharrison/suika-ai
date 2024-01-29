const fruitTypes = {
  cherry:     { rgb: [255, 0, 0], r: 30 },
  strawberry: { rgb: [255, 0, 0], r: 15 },
  grape:      { rgb: [255, 0, 0], r: 15 },
  dekopon:    { rgb: [255, 0, 0], r: 15 },
  orange:     { rgb: [255, 0, 0], r: 15 },
  apple:      { rgb: [255, 0, 0], r: 15 },
  pear:       { rgb: [255, 0, 0], r: 15 },
  peach:      { rgb: [255, 0, 0], r: 15 },
  pineapple:  { rgb: [255, 0, 0], r: 15 },
  honeydew:   { rgb: [255, 0, 0], r: 15 },
  watermelon: { rgb: [255, 0, 0], r: 15 },
};

function Fruit(x, y, type) {
  var options = {
    restitution: 0.5,
  };
  this.r = fruitTypes[type].r;
  this.rgb = fruitTypes[type].rgb;
  this.body = Bodies.circle(x, y, this.r, options);

  this.follow = function () {
    var pos = this.body.position;
    pos.x = mouseX;
  }

  this.drop = function () {
    Composite.add(world, this.body);
  }
  
  this.show = function () {
    var pos = this.body.position;
    var angle = this.body.angle;

    stroke(255);
    fill(this.rgb);

    push();
    translate(pos.x, pos.y);
    rotate(radians(angle));
    circle(0, 0, this.r * 2);
    pop();
  };
}
