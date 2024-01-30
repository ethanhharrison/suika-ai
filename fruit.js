const fruitTypes = {
  cherry:     { idx: 0, rgb: [255, 0, 0], r: 15 },
  strawberry: { idx: 1, rgb: [255, 105, 180], r: 25 },
  grape:      { idx: 2, rgb: [138, 43, 226], r: 35 },
  dekopon:    { idx: 3, rgb: [255, 215, 0], r: 45 },
  orange:     { idx: 4, rgb: [255, 140, 0], r: 55 },
  apple:      { idx: 5, rgb: [255, 0, 0], r: 65 },
  pear:       { idx: 6, rgb: [255, 87, 51], r: 75 },
  peach:      { idx: 7, rgb: [255, 229, 180], r: 85 },
  pineapple:  { idx: 8, rgb: [255, 255, 101], r: 95 },
  honeydew:   { idx: 9, rgb: [240, 255, 240], r: 105 },
  watermelon: { idx: 10, rgb: [0, 121, 68], r: 115 },
};

const fruitHeirarchy = Array("cherry", "strawberry", "grape", 
                             "dekopon", "orange", "apple", 
                             "pear", "peach", "pineapple", 
                             "honeydew", "watermelon");

function clamp (min, max, val) {
  return Math.max(min, Math.min(val, max));
}

function Fruit(x, y, type) {
  var options = {
    restitution: 0.3,
    friction: 0.01
  };
  this.x = x
  this.y = y;
  this.type = type;
  this.r = fruitTypes[type].r;
  this.rgb = fruitTypes[type].rgb;
  this.idx = fruitTypes[type].idx;
  this.dropped = false;

  this.combined = function () {
    this.body = Bodies.circle(this.x, this.y, this.r, options);
    this.dropped = true;
    Composite.add(world, this.body);
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

      this.x = pos.x;
      this.y = pos.y;

      translate(this.x, this.y);
      rotate(radians(angle));
    }

    stroke(this.rgb);
    fill(this.rgb);
    
    circle(0, 0, this.r * 2);
    pop();
  };
}
