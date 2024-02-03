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
    friction: 1
  };
  this.x = x
  this.y = y;
  this.type = type;
  this.r = fruitTypes[type].r;
  this.rgb = fruitTypes[type].rgb;
  this.idx = fruitTypes[type].idx;
  this.points = fruitTypes[type].points;
  this.dropped = false;

  this.combined = function () {
    this.body = Bodies.circle(this.x, this.y, this.r, options);
    this.dropped = true;
    Composite.add(world, this.body);
  }

  this.drop = function () {
    var xPos = clamp((width - boxWidth + boxThickness) / 2 + this.r, (width + boxWidth - boxThickness) / 2 - this.r, mouseX);
    this.body = Bodies.circle(xPos, this.y, this.r, options);
    this.dropped = true;
    Composite.add(world, this.body);
  }
  
  this.show = function () {
    push();

    if (!this.dropped) {
      var xPos = clamp((width - boxWidth + boxThickness) / 2 + this.r, (width + boxWidth - boxThickness) / 2 - this.r, mouseX);
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
