// module aliases
var Engine = Matter.Engine,
  // Render = Matter.Render,
  Runner = Matter.Runner,
  Bodies = Matter.Bodies,
  Composite = Matter.Composite;

var engine;
var world;
var circles = [];
var ground;
var leftWall;
var rightWall;

function setup() {
  createCanvas(500, 750);
  engine = Engine.create();
  world = engine.world;
  Runner.run(engine);

  var options = { isStatic: true };
  ground = new Barrier(width / 2, height, width, 20);
  leftWall = new Barrier(0, height / 2, 20, height);
  rightWall = new Barrier(width, height / 2, 20, height);
}

function mousePressed() {
  circles.push(new Circle(mouseX, 0, 40));
}

function draw() {
  background(51);
  for (i = 0; i < circles.length; i++) {
    circles[i].show();
  }
  ground.show();
  leftWall.show();
  rightWall.show();
}
