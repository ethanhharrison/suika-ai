// module aliases
var Engine = Matter.Engine,
  // Render = Matter.Render,
  Runner = Matter.Runner,
  Bodies = Matter.Bodies,
  Composite = Matter.Composite;

var engine;
var world;
var circle1;

function setup() {
  createCanvas(400, 400);
  engine = Engine.create();
  world = engine.world;
  circle1 = new Circle(200, 100, 80);

  Composite.add(world, [circle1]);
  Runner.run(engine);

  console.log(circle);
}

function draw() {
  background(51);
  circle1.show();
}
