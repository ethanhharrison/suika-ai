// module aliases
var Engine = Matter.Engine,
  Runner = Matter.Runner,
  Bodies = Matter.Bodies,
  Composite = Matter.Composite,
  Collision = Matter.Collision,
  Events = Matter.Events;
// matter.js variables
var composite;
var engine;
var world;
// matter bodies
var barriers;
var fruits;
var currFruit;
var ground;
var lWall;
var rWall;
// game variables
var gameOver;
var totalPoints;
// game startup settings
var boxWidth;
var boxHeight;
var boxThickness;

const startingFruits = Array("cherry", "strawberry", "grape", "dekopon", "orange")
Array.prototype.random = function () {
  var index = Math.floor((Math.random()*this.length));
  return this[index];
}

function setup() {
  createCanvas(600, 700);
  textAlign(CENTER);    
  rectMode(CENTER);

  boxWidth = width * 0.6;
  boxHeight = height * 0.5;
  boxThickness = 30;

  var engineOptions = {
    gravity: {scale: 0.0005 },
    positionIterations: 50,
    velocityIterations: 50,
    timing: {timeScale: 1}
  }
  engine = Engine.create(engineOptions);
  world = engine.world;
  Runner.run(engine); 

  checkCollisions();

  barriers = {};
  fruits = {};

  ground = new Barrier(width / 2, height - boxThickness / 2, boxWidth, boxThickness);
  lWall = new Barrier((width - boxWidth) / 2, height - boxHeight / 2, boxThickness, boxHeight);
  rWall = new Barrier((width + boxWidth) / 2, height - boxHeight / 2, boxThickness, boxHeight);
  currFruit = new Fruit(0, height - 5 * boxHeight / 4, startingFruits.random());

  gameOver = false;
  totalPoints = 0;
}

function checkCollisions() {
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
        totalPoints += combinedFruit.points;
  
        delete fruits[bodyA.id];
        delete fruits[bodyB.id];
        Composite.remove(world, [bodyA, bodyB]);
      }
    }
  });
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
  totalPoints = 0;
}

function dropFruit() {
  currFruit.drop();
  fruits[currFruit.body.id] = currFruit;
  currFruit = new Fruit(0, height - 5 * boxHeight / 4, startingFruits.random());
  return currFruit;
}

function isLost() {
  for (const [key, value] of Object.entries(fruits)) {
    if (value.y <= height - boxHeight && value.body.velocity.y <= 0.1) {
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

  fill(255);
  textSize(30);
  text("Total Points: " + totalPoints, 125, 75);

  currFruit.show();
  for (const [key, value] of Object.entries(fruits)) {
    value.show();
  }
  for (const [key, value] of Object.entries(barriers)) {
    value.show();
  }
  if (isLost()) {
    fill(255);

    textSize(125);
    text("You Lost!", width / 2, height / 2);

    textSize(40);
    text("Total Points: " + totalPoints, width / 2, height / 2 + 75);
    text("Press 'R' to reset the game", width / 2, height / 2 + 150);

    for (const [key, value] of Object.entries(fruits)) {
      value.body.isStatic = true;
    }
    gameOver = true;
  }
}
