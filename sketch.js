// module aliases
var Engine = Matter.Engine,
  Runner = Matter.Runner,
  Bodies = Matter.Bodies,
  Composite = Matter.Composite,
  Collision = Matter.Collision;

const startingFruits = Array("cherry", "strawberry", "grape", "dekopon", "orange")
Array.prototype.random = function () {
  var index = Math.floor((Math.random()*this.length));
  return this[index];
}

var engine;
var world;
var fruits = [];
var currFruit;
var ground;
var leftWall;
var rightWall;

function setup() {
  createCanvas(500, 750);

  var options = {
    gravity: {scale: 0.00075, x: 0, y: 1},
    positionIterations: 15,
    velocityIterations: 10,
  }
  engine = Engine.create(options);

  world = engine.world;
  Runner.run(engine);

  ground = new Barrier(width / 2, height, width, 10);
  leftWall = new Barrier(0, height / 2, 10, height);
  rightWall = new Barrier(width, height / 2, 10, height);

  currFruit = new Fruit(startingFruits.random());
}

function mousePressed() {
  currFruit.drop();
  fruits.push(currFruit);
  currFruit = new Fruit(startingFruits.random());
}

function checkCollisions() {
  for (i = 0; i < fruits.length; i++) {
    for (j = 0; j < fruits.length; j++) {
      if (i == j || j > i || !fruits[i] || !fruits[j]) {
        continue;
      }
      var coll = Collision.collides(fruits[i].body, fruits[j].body);
      if (!coll || fruits[i].type != fruits[j].type) {
        continue;
      }
      fruits[i].combine(fruits[j]);
      fruits.splice(i, 1);
      fruits.splice(j, 1)
    }
  }
}

function draw() {
  background(51);

  checkCollisions();

  for (i = 0; i < fruits.length; i++) {
    fruits[i].show();
  }
  currFruit.show();
  ground.show();
  leftWall.show();
  rightWall.show();
}
