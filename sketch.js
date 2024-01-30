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

function setup() {
  createCanvas(500, 750);

  var options = {
    gravity: {scale: 0.0005 },
    positionIterations: 6,
    velocityIterations: 4,
  }
  engine = Engine.create(options);
  composite = Composite.create();

  world = engine.world;
  Runner.run(engine);

  Events.on(engine, "collisionStart", function (event) {
    var pairs = event.pairs;
    for (var i = 0; i < pairs.length; i++) {
      bodyA = pairs[i].bodyA;
      bodyB = pairs[i].bodyB;
      if (bodyA.circleRadius == bodyB.circleRadius) {
        Composite.remove(world, [bodyA, bodyB]);
        delete bodies[bodyA.id];
        delete bodies[bodyB.id];
        console.log(bodies);
      }
    }
  })  

  ground = new Barrier(width / 2, height, width, 10);
  leftWall = new Barrier(0, height / 2, 10, height);
  rightWall = new Barrier(width, height / 2, 10, height);
  currFruit = new Fruit(startingFruits.random());
}

function mousePressed() {
  currFruit.drop();
  bodies[currFruit.body.id] = currFruit;
  currFruit = new Fruit(startingFruits.random());
}

function draw() {
  background(51);
  currFruit.show();
  for (const [key, value] of Object.entries(bodies)) {
    value.show();
  }
}
