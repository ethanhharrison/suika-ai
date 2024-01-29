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

function clamp (min, max, val) {
  return Math.max(min, Math.min(val, max));
}

function Fruit(type) {
  var options = {
    restitution: 0.3,
    friction: 0.2
  };
  this.y = 60;
  this.type = type;
  this.r = fruitTypes[type].r;
  this.rgb = fruitTypes[type].rgb;
  this.dropped = false;

  this.combine = function (other) {
    Composite.remove(world, this.body);
    Composite.remove(world, other.body);
  }

  this.drop = function () {
    var xPos = clamp(this.r + 5, width - this.r - 5, mouseX);
    this.body = Bodies.circle(xPos, this.y, this.r, options);
    this.dropped = true;
    Composite.add(world, this.body);
  }
  
  this.show = function () {
    push();

    if (!this.dropped) {
      var xPos = clamp(this.r + 5, width - this.r - 5, mouseX);
      translate(xPos, this.y);
    }
    else {
      var pos = this.body.position;
      var angle = this.body.angle;
      translate(pos.x, pos.y);
      rotate(radians(angle));
    }

    stroke(this.rgb);
    fill(this.rgb);
    
    circle(0, 0, this.r * 2);
    pop();
  };
}
