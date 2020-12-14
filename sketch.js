const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
const Constraint = Matter.Constraint;

var tree,treeImg, stone,ground;
var mango1,mango2,mango3,mango4,mango5,mango6;
var boy,boyImg;

function preload()
{
  boyImg = loadImage("boy.png");
 treeImg = loadImage("tree.png");
}


function setup() {
	createCanvas(1350, 600);


	engine = Engine.create();
	world = engine.world;

	//Create the Bodies Here.
	boy = createSprite(200,550);
	boy.addImage(boyImg);
  boy.scale = 0.1;

  mango1 = new Mangoes(900,250,20);
	mango2 = new Mangoes(800,200,20);
	mango3 = new Mangoes(800,280,20);
	mango4 = new Mangoes(1000,250,20);
  mango5 = new Mangoes(670,300,20);
  mango6 = new Mangoes(720,200,20);
  
	stone = new Stone(150,550,20);
  
  tree = createSprite(800,330);
	tree.addImage(treeImg);
	tree.scale = 0.4;
  
	ground = new Ground(600,600,2000,20);
	
	shot = new Shot(stone.body,{x:150,y:500});
	Engine.run(engine);
  
}


function draw() {
  rectMode(CENTER);
  
  

  background("gray");
  drawSprites();
  ground.display();
  mango1.display();
  mango2.display();
  mango3.display();
  mango4.display();
  mango5.display();
  mango6.display();
  stone.display();
  shot.display();
  detectCollision(stone,mango1);
  detectCollision(stone,mango2);
  detectCollision(stone,mango3);
  detectCollision(stone,mango4);
  detectCollision(stone,mango5);
  detectCollision(stone,mango6);
  
 
}


function mouseDragged(){
    Matter.Body.setPosition(stone.body,{x:mouseX,y:mouseY});
}

function mouseReleased(){
    shot.fly();
}
function detectCollision(lstone,lmango){
	mangoBodyPosition=lmango.body.position
	stoneBodyPosition=lstone.body.position
	var distance=dist(stoneBodyPosition.x,stoneBodyPosition.y,mangoBodyPosition.x,mangoBodyPosition.y)
	if(distance<=lmango.r+lstone.r){
		Matter.Body.setStatic(lmango.body,false);
	}
}

function keyPressed(){

	if(keyCode === 32){
		Matter.Body.setPosition(stone.body,{x:150,y:550})
		shot.attach(stone.body);
	}
}