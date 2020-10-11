var PLAY=1;
var END=0;
var gameState=1;


var sword,fruit1,fruit2,fruit3,fruit4,monster,gameOver;

var swordImage,fruit1Image,fruit2Image,fruit3Image,fruit4Image,monsterImage,gameOverImage;
var cutsound,gameOversound;

score=0;

function preload(){
  
 swordImage=loadImage("sword.png");
  
  fruit1Image=loadImage("fruit1.png");
  fruit2Image=loadImage("fruit2.png");
  fruit3Image=loadImage("fruit3.png");
  fruit4Image=loadImage("fruit4.png");
  
  monsterImage=loadImage("alien1.png");
  
  gameOverImage=loadImage("gameover.png");
  
  cutsound=loadSound("knifeSwooshSound.mp3");
  gameOversound=loadSound("gameover.mp3");
}

function setup(){
  createCanvas(600, 600);
  sword=createSprite(40,200,20,20);
  sword.addImage(swordImage);
  sword.scale=0.7;
  sword.x=World.mouseX;
  sword.y=World.mouseY;
  
  fruitGroup=new Group();
  
  enemyGroup=new Group();
}

function draw(){
  background("white");
  text("Score: "+ score, 500,50);
  
  
  
  if(gameState === PLAY)
  { 
    
    fruits();
    enemy();
    
    fruitGroup.velocityX=-(4+3*score/4);
    
    sword.y=World.mouseY
    sword.x=World.mouseX
    
    if(fruitGroup.isTouching(sword))
   {
    fruitGroup.destroyEach();
     cutsound.play();
    score=score+2;
   }
    
     
  
  
  else if(enemyGroup.isTouching(sword))
  {
    
     gameState=END;
    gameOversound.play();
      sword.addImage(gameOverImage);
      sword.x=200;
      sword.y=200;
      fruitGroup.destroyEach();
    enemyGroup.destroyEach();
    fruitGroup.setvelocityX=0;
    enemyGroup.setvelocityX=0;
  
  }
  }
  drawSprites();
}

function fruits()
{
  if(frameCount%80===0)
  { 
    position=Math.round(random(1,2));
    fruit=createSprite(400,200,20,20);
    fruit.scale=0.2;
    
    if(position==1)
      {
        fruit.x=400;
        fruit.velocityX=-(7+(score/4));
      }
    else
    {
      if(position==2)
        {
          fruit.x=0;
          
          fruit.velocityX=(7+(score/4));
        }
    }
    //fruit.debug=true;
    r=Math.round(random(1,4));
    if(r == 1)
    {
      fruit.addImage(fruit1Image);
    }
    else if(r == 2)
    {
      fruit.addImage(fruit2Image);
    }
    else if (r == 3)
    {
      fruit.addImage(fruit3Image);
    }
    else if(r == 4)
    {
      fruit.addImage(fruit4Image);
    }
    fruit.y=Math.round(random(50,340));
  
    fruit.setLifetime=100;
    
    fruitGroup.add(fruit);
  }
}

function enemy()
{
  if(frameCount%200===0)
  {
    monster=createSprite(400,200,20,20);
    monster.addImage("move",monsterImage);
    monster.y=Math.round(random(100,300));
    monster.velocityX=-(8+(score/10));
    monster.setLifetime=50;
    
    enemyGroup.add(monster);
  }
}