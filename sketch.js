// module aliases
var Engine = Matter.Engine,
  // Render = Matter.Render,
  Runner = Matter.Runner,
  Bodies = Matter.Bodies,
  Composite = Matter.Composite;

const startingFruits = Array("cherry", "strawberry", "grape", "dekopon", "orange")
Array.prototype.random = function () {
  return this[Math.floor((Math.random()*this.length))];
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
  engine = Engine.create();
  world = engine.world;
  Runner.run(engine);

  ground = new Barrier(width / 2, height, width, 40);
  leftWall = new Barrier(0, height / 2, 40, height);
  rightWall = new Barrier(width, height / 2, 40, height);

  currFruit = new Fruit(startingFruits.random());
}

function mousePressed() {
  currFruit.drop();
  fruits.push(currFruit);
  currFruit = new Fruit(startingFruits.random());
}

function clamp (min, max, val) {
  if (val < min) {
    return min;
  }
  if (val > max) {
    return max;
  }
  return val;
}

function draw() {
  background(51);

  for (i = 0; i < fruits.length; i++) {
    fruits[i].show();
  }
  
  currFruit.show();

  ground.show();
  leftWall.show();
  rightWall.show();
}
