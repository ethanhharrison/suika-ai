const fruitTypes = {
  cherry:     { rgb: [255, 0, 0], r: 10 },
  strawberry: { rgb: [255, 105, 180], r: 20 },
  grape:      { rgb: [138, 43, 226], r: 30 },
  dekopon:    { rgb: [255, 215, 0], r: 40 },
  orange:     { rgb: [255, 140, 0], r: 50 },
  apple:      { rgb: [255, 0, 0], r: 15 },
  pear:       { rgb: [255, 0, 0], r: 15 },
  peach:      { rgb: [255, 0, 0], r: 15 },
  pineapple:  { rgb: [255, 0, 0], r: 15 },
  honeydew:   { rgb: [255, 0, 0], r: 15 },
  watermelon: { rgb: [255, 0, 0], r: 15 },
};

function Fruit(type) {
  var options = {
    restitution: 0.5,
  };
  this.y = 60;
  this.r = fruitTypes[type].r;
  this.rgb = fruitTypes[type].rgb;
  this.dropped = false;

  this.drop = function () {
    this.dropped = true;
    this.body = Bodies.circle(mouseX, this.y, this.r, options);
    Composite.add(world, this.body);
  }
  
  this.show = function () {
    push();

    if (!this.dropped) {
      translate(mouseX, this.y);
    }
    else {
      var pos = this.body.position;
      var angle = this.body.angle;
      translate(pos.x, pos.y);
      rotate(radians(angle));
    }

    stroke(255);
    fill(this.rgb);
    
    circle(0, 0, this.r * 2);
    pop();
  };
}
