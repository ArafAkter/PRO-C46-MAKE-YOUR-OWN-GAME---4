var player

var score = 0

var score1 = 0
var obstaclesGroup
var gameState = "play"

function preload(){
  check = loadSound("jump.wav")
  die = loadSound("collided.wav")
}


function setup(){
  createCanvas(600,400)
  over = createSprite(200,-1400,400,400)
  over.shapeColor = "limegreen"
player = createSprite(300,300,30,30)

bump1 = createSprite(590,-150,20,20)
bump2 = createSprite(10,-250,20,20)


obstaclesGroup = new Group()

barrier1 = createSprite(300,400,600,20)
barrier2 = createSprite(610,-400,40,1600)
barrier3 = createSprite(-10,-400,40,1600)



player.shapeColor = "cyan"

}

function draw(){
  background("brown")
player.collide(barrier1)
player.collide(barrier2)
player.collide(barrier3)

bump1.shapeColor="black"
bump2.shapeColor="black"
barrier2.shapeColor="black"
barrier3.shapeColor="black"


end = createSprite(1600,300,600,400)
end.shapeColor = "darkorange"
if(gameState === "play"){
  score = score + Math.round(getFrameRate()/60);

  spawnObstacles()

  if(keyDown("up")){
 //   player.y -= 5
  }
  if(keyDown("down")){
   // player.y += 5
  }
  if(keyDown("left")){
    player.x -= 7
  }
  if(keyDown("right")){
    player.x += 7
  }
  //end.velocityY = -3.95
  if(player.isTouching(obstaclesGroup)){
    gameState = "end"
    die.play()
  }



}
 if(player.isTouching(end) ){
gameState = "end"
  }

bump1.velocityY = (3 + score/100)
bump2.velocityY = (3 + score/100)

if(score>0 && score%100 === 0){
  check.play() 
}

over.visible = false

  if(gameState === "end"){
    obstaclesGroup.velocityY = 0
    bump1.velocityY = 0
    bump2.velocityY = 0
  }

  if(bump1.y > 400){
    bump1.y = -150
  }

  if(bump2.y > 400){
    bump2.y = -150
  }
 
  //obstaclesGroup.bounceOff(barrier1)
  obstaclesGroup.bounceOff(barrier2)
  obstaclesGroup.bounceOff(barrier3)

  barrier1.visible = false
  //barrier2.visible = false
  //barrier3.visible = false

  //camera.position.y = player.y - 100

  drawSprites()
  //text(player.x + "    " + player.y,player.x - 75,player.y - 75)

  if(gameState === "over"){
    textSize(40)
    textAlign(CENTER)
    fill("darkblue")
    stroke(0)
    text("YOU WIN!!!",player.x,player.y)
   
  }
  if(gameState === "end"){
    textAlign(CENTER)
    textSize(30)
    fill("darkblue")
    text("GAME OVER!",player.x, player.y)
  }
  fill(0)
  textSize(20)
  text(score,500,50)

}
function spawnObstacles(){
  if(frameCount % 100 === 0){
    obstacle = createSprite(550,-100,70,70)
    obstacle.x = random(50,550)
    obstacle.velocityX = -10

    obstacle.velocityY = (3 + score/100)
  
    obstacle.shapeColor = "orange"
    
    obstacle.lifetime = 250
  
    obstaclesGroup.add(obstacle)
  }
  }