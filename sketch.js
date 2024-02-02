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

var barriers = {};
var fruits = {};
var currFruit;
var ground;
var leftWall;
var rightWall;
var gameOver;

var boxWidth;
var boxHeight;
var boxThickness;

function setup() {
  createCanvas(700, 700);
  textAlign(CENTER);    
  rectMode(CENTER);

  boxWidth = width * 5/8;
  boxHeight = height * 6/8;
  boxThickness = 30;

  var options = {
    gravity: {scale: 0.0005 },
    positionIterations: 50,
    velocityIterations: 50,
    timing: {timeScale: 1.5}
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
        var fruitA = fruits[bodyA.id];
        var fruitB = fruits[bodyB.id];

        var x = (fruitA.x + fruitB.x) / 2;
        var y = (fruitA.y + fruitB.y) / 2;
        var type = fruitHeirarchy[fruitA.idx + 1];

        var combinedFruit = new Fruit(x, y, type);
        combinedFruit.combined();
        fruits[combinedFruit.body.id] = combinedFruit;

        delete fruits[bodyA.id];
        delete fruits[bodyB.id];
        Composite.remove(world, [bodyA, bodyB]);
      }
    }
  })  

  ground = new Barrier(width / 2, height - boxThickness / 2, boxWidth, boxThickness);
  lWall = new Barrier((width - boxWidth) / 2, height - boxHeight / 2, boxThickness, boxHeight);
  rWall = new Barrier((width + boxWidth) / 2, height - boxHeight / 2, boxThickness, boxHeight);
  currFruit = new Fruit(0, 60, startingFruits.random());

  gameOver = false;
}

function mousePressed() {
  if (!gameOver) {
    dropFruit();
  }
}

function keyTyped() {
  if (key == "r") {
    reset();
  }
}

function reset() {
  for (const [key, value] of Object.entries(fruits)) {
    Composite.remove(world, value.body);
  }
  fruits = {};
  gameOver = false;
}

function dropFruit() {
  currFruit.drop();
  fruits[currFruit.body.id] = currFruit;
  currFruit = new Fruit(0, 60, startingFruits.random());
  return currFruit;
}

function isLost() {
  for (const [key, value] of Object.entries(fruits)) {
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
  for (const [key, value] of Object.entries(fruits)) {
    value.show();
  }
  for (const [key, value] of Object.entries(barriers)) {
    value.show();
  }
  if (isLost()) {
    fill(255);
    textSize(150);
    text("You Lost!", width / 2, height / 2);
    textSize(50);
    text("Press 'R' to reset the game", width / 2, height / 2 + 75);
    for (const [key, value] of Object.entries(fruits)) {
      value.body.isStatic = true;
    }
    gameOver = true;
  }
}
