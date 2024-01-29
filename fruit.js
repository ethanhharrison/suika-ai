const fruitTypes = {
  cherry:     { idx: 0, rgb: [255, 0, 0], r: 10 },
  strawberry: { idx: 1, rgb: [255, 105, 180], r: 20 },
  grape:      { idx: 2, rgb: [138, 43, 226], r: 30 },
  dekopon:    { idx: 3, rgb: [255, 215, 0], r: 40 },
  orange:     { idx: 4, rgb: [255, 140, 0], r: 50 },
  apple:      { idx: 5, rgb: [255, 0, 0], r: 60 },
  pear:       { idx: 6, rgb: [255, 0, 0], r: 70 },
  peach:      { idx: 7, rgb: [255, 0, 0], r: 80 },
  pineapple:  { idx: 8, rgb: [255, 0, 0], r: 90 },
  honeydew:   { idx: 9, rgb: [255, 0, 0], r: 100 },
  watermelon: { idx: 10, rgb: [255, 0, 0], r: 110 },
};

const fruitHeirarchy = Array("cherry", "strawberry", "grape", 
                             "dekopon", "orange", "apple", 
                             "pear", "peach", "pineapple", 
                             "honeydew", "watermelon");

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
    Composite.remove(world, other.body);
    Composite.remove(world, this.body);
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
