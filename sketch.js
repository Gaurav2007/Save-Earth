var bg,bgImg,bgImg2,bg2;

var sadImg;

var treeStumpImg,treeStump,tree,treeImg;

var boy,boyImg;

var obstacle,obstacleImg;

var stumpGroup;

var gameState=0;

var score=21;

function preload(){
bgImg= loadImage("images/4.jpg") 
bgImg2= loadImage("images/new ground.png")

treeStumpImg = loadImage("images/tree-stump-clip-art-png-favpng-n7j2G4ZKCgu6tVR2rJhfhJ37b-removebg-preview.png")
treeImg = loadImage("images/6440190_preview-removebg-preview.png")

boyImg = loadImage("images/boy2.png")

obstacleImg = loadImage("images/bulldozer-removebg-preview.png")

sadImg = loadImage("images/bg.jpg")
}

function setup() {
  createCanvas(windowWidth,windowHeight);

  bg2 = createSprite(windowWidth-100,windowHeight/2-150,1000,800)
  bg2.addImage(bgImg2)
  bg2.scale=14;

  boy = createSprite(500,1700,50,50)
  boy.addImage(boyImg)
  boy.scale=2;

  stumpGroup = createGroup();

  obstacle = createSprite(windowWidth+1500,500,50,50);
  obstacle.addImage(obstacleImg);
  obstacle.scale = 1.4;
  //obstacle.x = treeStumpGroup.x;
  obstacle.y = random(2000,2200);
  //obstacle.x = random(2000,2200);
  obstacle.debug = true;
  obstacle.setCollider("rectangle",0,0,300,200)

  
}

function draw() {
  
  background(bgImg);

  if(gameState===0)
  {
    fill("red");
    textSize(100);
    textAlign(CENTER);
    text("Press 'SPACE' to play the game",windowWidth/2,windowHeight/2)
    if(keyDown("SPACE"))
    {
      gameState=1;
    }
  }

  if(gameState===1){

    fill("blue");
    textSize(70);
    text("Oxygen % = "+score,windowWidth-500,150)
  
  bg2.velocityX = -15;
  obstacle.velocityX = -20;
  
  if(bg2.x<0){
   bg2.x = bg2.width/2;
  }

  boy.x = mouseX;
  boy.y = mouseY;

  for(var i = 0;i<stumpGroup.length;i++)
  {
    if(mousePressedOver(stumpGroup.get(i)))
    {
      stumpGroup.get(i).addImage(treeImg);
      stumpGroup.get(i).scale = 4;
      score+=1;
    }
  }

  for(var i = 0;i<stumpGroup.length;i++)
  {
    if(obstacle.isTouching(stumpGroup.get(i)))
    {
      stumpGroup.get(i).addImage(treeStumpImg);
      stumpGroup.get(i).scale = 0.8;
      score = score-1;
    }
  }

  for(var i = 0;i<stumpGroup.length;i++)
  {
    if(stumpGroup.get(i).x<-200)
    {
      stumpGroup.get(i).destroy();
    }
  }

  if(obstacle.x<-100)
  {
    obstacle.x = windowWidth+1500;
  }
  if(frameCount%200===0){
    obstacle.velocityX+=2;
  }

  spawnStumb();
  
  drawSprites();

  
  if(score<21 && gameState===1)
  {
    gameState=2;
  }
}


  if(gameState===2)
  {
    background(sadImg);

    fill('red');
    textSize(100);
    textAlign(CENTER);
    text("oxygen % reduced than earlier so you failed to plant trees!",windowWidth/2,windowHeight/2);

    fill('red');
    textSize(100);
    textAlign(CENTER);
    text("Refresh your browser to play the game again (press ctrl+r)",windowWidth/2,windowHeight/2+500)
  }


}

function spawnStumb()
{
  if(frameCount%80===0){
  treeStump=createSprite(600,2600,50,50)
  treeStump.addImage(treeStumpImg);
  treeStump.scale = 0.8;
  treeStump.velocityX = -15;
  treeStump.x = windowWidth+100;
  treeStump.y = random(1600,2300);
  treeStump.depth = boy.depth;
  treeStump.depth = obstacle.depth
  boy.depth+=1;
  stumpGroup.add(treeStump);
  treeStump.debug = true;
  treeStump.setCollider("rectangle",0,0,150,100);
  }
}