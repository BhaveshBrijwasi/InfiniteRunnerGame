var PLAY = 1;
var END = 0;
var gameState = PLAY;

var boy, boy_running, boy_collided;
var ground, invisibleGround, groundImage;
var forest,forestImage

var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4;

var score=0;

var gameOver, restart;
var backgroundImg;
var gameOverSound;
var jumpSound;

 var B;
 
function preload(){ 
boy_running = loadAnimation("boy1.png","boy2.png","boy3.png","boy4.png"); 
boy_collided = loadAnimation("boy_collided.png"); 

gameOverSound = loadSound("gameOver.mp3"); jumpSound = loadSound("jump.mp3"); 
backgroundImg=loadImage("zombieBackground.jpg") 
obstacle1 = loadImage("zombie1.png"); 
obstacle2 = loadImage("zombie2.png"); 
obstacle3 = loadImage("zombie3.png"); 
obstacle4 = loadImage("zombie4.png"); 
gameOverImg = loadImage("gameOver.png"); 
restartImg = loadImage("restart.png"); } 

function setup() { 
createCanvas(600, 300); 
BG = createSprite(width/2 + 30,height/2); BG.addImage(backgroundImg); 
BG.scale = 2; 
boy = createSprite(100,250,20,50); boy.addAnimation("running", boy_running); 
boy.addAnimation("collided", boy_collided);
 boy.scale = 0.7; 
gameOver = createSprite(280,100); gameOver.addImage(gameOverImg); 
restart = createSprite(280,140);
 restart.addImage(restartImg); 
gameOver.scale = 0.5; 
restart.scale = 0.1; 
gameOver.visible = false; 
restart.visible = false; 
invisibleGround = createSprite(200,250,400,10); invisibleGround.visible = false; 
obstaclesGroup = new Group(); 
score = 0; 
} 

function draw() { 
//boy.debug = true; 
background(0); 
stroke("black") ;
textSize (20);
 text("Score: "+ score, 400,50); BG.velocityX = -4 
//creating infinite background 
if(BG.x < width/2 - 30) { BG.x = 60/100*width; } 
if (gameState===PLAY){ score = score + Math.round(getFrameRate()/60); 
if(BG.x<0){ BG.x=width/2 } 
if(keyDown("space") && boy.y >= 159) 
{ boy.velocityY = -13; jumpSound.play(); } 
boy.velocityY = boy.velocityY + 0.8

  
    
    boy.collide(invisibleGround);
    
    spawnObstacles();
  
    if(obstaclesGroup.isTouching(boy)){
        gameState = END;
      gameOverSound.play();
    }
  }
  else if (gameState === END) {
    gameOver.visible = true;
    restart.visible = true;
    
    //set velcity of each game object to 0
    
    boy.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
    
    
    //change the boy animation
    boy.changeAnimation("collided",boy_collided);
    
    //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-5);
    
    
    if(mousePressedOver(restart)) {
      reset();
    }
  }
  
  
  drawSprites();
}



function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(600,220,10,40);
    //obstacle.debug = true;
    obstacle.velocityX = -(6 + 3*score/100);
    
    //generate random obstacles
    var rand = Math.round(random(1,4));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      //default: break;
      case 3: obstacle.addImage(obstacle3);
              break;
    //  default: break;
      case 4: obstacle.addImage(obstacle4);
              break;
      default: break;
    }
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.3;
    obstacle.lifetime = -100;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}

function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  
  obstaclesGroup.destroyEach();
  
  
  boy.changeAnimation("running",boy_running);
  
 
  
  score = 0;
  
}

boy.velocityY