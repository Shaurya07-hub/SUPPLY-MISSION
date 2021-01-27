var helicopterIMG, helicopterSprite, packageSprite,packageIMG;
var packageBody,ground;
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

function preload()
{
	helicopterIMG=loadImage("helicopter.png")
	packageIMG=loadImage("package.png")
}

function setup() {
	createCanvas(800, 560);
	rectMode(CENTER);
	

	packageSprite=createSprite(width/5, 40, 10,10);
	packageSprite.addImage(packageIMG);
	packageSprite.scale=0.2;

	helicopterSprite=createSprite(width/5, 50, 10,10);
	helicopterSprite.addImage(helicopterIMG)
	helicopterSprite.scale=0.7;

	groundSprite=createSprite(width/2, height-5, width,10);
	groundSprite.shapeColor=color(255),


	engine = Engine.create();
	world = engine.world;

	packageBody = Bodies.circle(width/5, 50 , 5 , {density:0.5, isStatic:true});
	World.add(world, packageBody);
	

	//Create a Ground
	ground = Bodies.rectangle(width/2, 650, width, 10 , {isStatic:true} );
 	World.add(world, ground);

 	boxPosition=width/2-100;
 	boxY=500;


 	boxleftSprite=createSprite(boxPosition, boxY, 20,100);
 	boxleftSprite.shapeColor=color(255,0,0);

 	boxLeftBody = Bodies.rectangle(boxPosition+20, boxY, 20,100 , {isStatic:true} );
 	World.add(world, boxLeftBody);

 	boxBase=createSprite(boxPosition+100, boxY+40, 200,20);
 	boxBase.shapeColor=color(255,0,0);

 	boxBottomBody = Bodies.rectangle(boxPosition+100, boxY+45-20, 200,20 , {isStatic:true} );
 	World.add(world, boxBottomBody);

 	boxrightSprite=createSprite(boxPosition+200 , boxY, 20,100);
 	boxrightSprite.shapeColor=color(255,0,0);

 	boxRightBody = Bodies.rectangle(boxPosition+200-20 , boxY, 20,100 , {isStatic:true} );
 	World.add(world, boxRightBody);

	boxBase.setCollider("rectangle",0,0,180,20);
	//boxBase.debug=true;

	boxleftSprite.setCollider("rectangle",0,0,10,100);
	//boxleftSprite.debug=true;

	boxrightSprite.setCollider("rectangle",0,0,10,100);
	//boxrightSprite.debug=true;
	
	Engine.run(engine);
  
}


function draw() {
  rectMode(CENTER);
  background(0);
 
  packageSprite.x= packageBody.position.x ;
  packageSprite.y= packageBody.position.y ;

  packageBody.x=helicopterSprite.x;
  packageSprite.x=helicopterSprite.x;

  if(packageSprite.isTouching(boxBase)){
	Matter.Body.setStatic(packageBody,true);
  }

  if(packageSprite.isTouching(groundSprite)){
	Matter.Body.setStatic(packageBody,true);
  }

   packageSprite.collide(boxleftSprite);
   packageSprite.collide(boxrightSprite);

  drawSprites();
}

function keyPressed(){
if(keyCode === RIGHT_ARROW){
	helicopterSprite.x = helicopterSprite.x+14;	
	}
  
  if(keyCode === LEFT_ARROW){
    helicopterSprite.x = helicopterSprite.x - 14;
  }

  if(keyCode === DOWN_ARROW){
  Matter.Body.setStatic(packageBody,false);

  }
}