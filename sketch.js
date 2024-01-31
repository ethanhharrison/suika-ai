// module aliases
var Engine = Matter.Engine,
  Runner = Matter.Runner,
  Bodies = Matter.Bodies,
  Composite = Matter.Composite,
  Collision = Matter.Collision,
  Events = Matter.Events;

const startingFruits = Array("cherry", "strawberry", "grape", "dekopon", "orange")
Array.prototype.random = function () {
  var index = Math.floor((Math.random()*this.length));
  return this[index];
}

var composite;
var engine;
var world;

var bodies = {};
var currFruit;
var ground;
var leftWall;
var rightWall;

var boxWidth;
var boxHeight;
var boxThickness;

function setup() {
  createCanvas(700, 700);

  boxWidth = width * 5/8;
  boxHeight = height * 6/8;
  boxThickness = 15;

  var options = {
    gravity: {scale: 0.0005 },
    positionIterations: 6,
    velocityIterations: 4,
  }
  engine = Engine.create(options);
  world = engine.world;
  Runner.run(engine);

  Events.on(engine, "collisionStart", function (event) {
    var pairs = event.pairs;
    for (var i = 0; i < pairs.length; i++) {
      bodyA = pairs[i].bodyA;
      bodyB = pairs[i].bodyB;
      if (bodyA.circleRadius == bodyB.circleRadius) {
        var fruitA = bodies[bodyA.id];
        var fruitB = bodies[bodyB.id];

        var x = (fruitA.x + fruitB.x) / 2;
        var y = (fruitA.y + fruitB.y) / 2;
        var type = fruitHeirarchy[fruitA.idx + 1];

        var combinedFruit = new Fruit(x, y, type);
        combinedFruit.combined();
        bodies[combinedFruit.body.id] = combinedFruit;

        delete bodies[bodyA.id];
        delete bodies[bodyB.id];
        Composite.remove(world, [bodyA, bodyB]);
      }
    }
  })  

  ground = new Barrier(width / 2, height - boxThickness / 2, boxWidth, boxThickness);
  lWall = new Barrier((width - boxWidth) / 2, height - boxHeight / 2, boxThickness, boxHeight);
  rWall = new Barrier((width + boxWidth) / 2, height - boxHeight / 2, boxThickness, boxHeight);
  currFruit = new Fruit(0, 60, startingFruits.random());
}

function mousePressed() {
  dropFruit();
}

function dropFruit() {
  currFruit.drop();
  bodies[currFruit.body.id] = currFruit;
  currFruit = new Fruit(0, 60, startingFruits.random());
  return currFruit;
}

function isLost() {
  for (const [key, value] of Object.entries(bodies)) {
    if (value.y <= height - boxHeight && value.body.velocity.y <= 0.1) {
      console.log(value.body);
      return true;
    }
  } 
  return false;
}

function draw() {
  background(51);

  stroke(255);
  drawingContext.setLineDash([15, 10]);
  line((width - boxWidth) / 2, height - boxHeight, (width + boxWidth) / 2, height - boxHeight);
  drawingContext.setLineDash([0, 0]);

  currFruit.show();
  for (const [key, value] of Object.entries(bodies)) {
    value.show();
  }

  if (isLost()) {
    console.log("Lost the game!")
  }
}
