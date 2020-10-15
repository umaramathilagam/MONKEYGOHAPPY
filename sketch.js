var PLAY = 1;
var END = 0;
var gameState = PLAY;

var monkey, monkey_running, ground, monkey_collided;
var banana, bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score, survivalTime;

function preload() {

  monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png");
  monkey_collided = loadImage("sprite_0.png");

  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");

}



function setup() {
  createCanvas(600, 350);

  monkey = createSprite(80, 300, 20, 20);
  monkey.addAnimation("running monkey", monkey_running);
  monkey.addAnimation("stop monkey", monkey_collided)
  monkey.scale = 0.1;

  ground = createSprite(400, 333, 1200, 10);
  ground.shapeColor = ("black");
  ground.x = ground.width / 2;
  ground.velocityX = -4;

  obstacleGroup = createGroup();
  foodGroup = createGroup();

  monkey.setCollider("circle", 0, 0, 300);
  //monkey.debug=true;
  score = 0;
  survivalTime = 0;
}


function draw() {
  background("lightGreen");
  stroke("white");
  fill("black");
  textSize(20);
  text("Score: " + score, 50, 50);

  stroke("white");
  fill("black");
  textSize(20);
  text("survivalTime: " + survivalTime, 350, 50);
  survivalTime = Math.ceil(frameCount / frameRate())


  if (gameState === PLAY) {
    food();
    obstacle();

    if (keyDown("space") && monkey.y >= 230) {
      monkey.velocityY = -12;
    }
    monkey.velocityY = monkey.velocityY + 0.8
    if (ground.x < 0) {
      ground.x = ground.width / 2;
    }
    if (foodGroup.isTouching(monkey)) {
      score = score + 1;
    }
    ground.velocityX = -4;

    monkey.collide(ground);
    if (obstacleGroup.isTouching(monkey)) {
      gameState = END;

    }
  } else {
    if (gameState === END) {

      ground.velocityX = 0;
      monkey.velocityY = 0;

      foodGroup.setVelocityXEach(0);
      obstacleGroup.setVelocityXEach(0);
      foodGroup.setLifetimeEach(-1);
      obstacleGroup.setLifetimeEach(-1);
      foodGroup.destroyEach();

      score = 0;
      survivalTime = 0;

      monkey.changeAnimation("stop monkey", monkey_collided);

      stroke("white");
      fill("black");
      textSize(20);
      text("Game Over", 250, 175);

    }
  }
  drawSprites();
}

function food() {
  if (frameCount % 70 === 0) {
    var foods = createSprite(600, 120, 40, 10);
    foods.y = Math.round(random(100, 160));
    foods.addImage(bananaImage);
    foods.scale = 0.1;
    foods.velocityX = -6;

    foods.lifetime = 200;

    foods.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;

    foodGroup.add(foods);
  }
}

function obstacle() {
  if (frameCount % 200 === 0) {
    var obstacle = createSprite(500, 310, 10, 40);
    obstacle.addImage(obstacleImage);
    obstacle.velocityX = -5;
    obstacle.scale = 0.1;

    obstacle.lifetime = 200;
    obstacleGroup.add(obstacle);
  }
}