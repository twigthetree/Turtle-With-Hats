//Move the catcher with the left and right arrow keys to catch the falling objects. 

/* VARIABLES */
let catcher, fallingObject;
let score = 0;
let hatRandom = 0;
let font;
let textBox;
let gameStarted = false; 
let showCover = true;
let coverFading = false;
let alpha = 255;
let fadeAmount = 2;

function scoring(){
  if (score < 0){
    angryTurtle.resize(115, 0);
    catcher.image = angryTurtle;
  }

  if (score <= -3){
    superAngryTurtle.resize(110, 0);
    catcher.image = superAngryTurtle;
  }

  if (score == -5){
    background('red');
    text("You lose!", 100, 100);
    catcher.pos = {x: 200, y: 200};
    fallingObject.y = -100;
    fallingObject.vel.y = 0;
  }

  if (score >= 0){
    turtle.resize(110, 0);
    catcher.image = turtle;
    catcher.pos.y = 330;

    if (score >= 2){
      turtleHat1.resize(101, 0);
      catcher.image = turtleHat1;
      catcher.pos.y = 330;
    }

    if (score >= 4){
      turtleHat2.resize(110, 0);
      catcher.image = turtleHat2;
      catcher.pos.y = 325;
    }

    if (score >= 6){
      turtleHat3.resize(110, 0);
      catcher.image = turtleHat3;
      catcher.pos.y = 320;
    }

    if (score >= 8){
      turtleHat4.resize(110, 0);
      catcher.image = turtleHat4;
      catcher.pos.y = 313;
    }

    if (score == 10){
      turtleHat5.resize(110, 0);
      catcher.image = turtleHat5;
      fallingObject.y = -100;
      fallingObject.vel.y = 0;
      background('green');
      text("You win!", 100, 100);
      catcher.pos = {x: 200, y: 200};
    }
  }
}

function turtleMovement(){
  // move the catcher
  if (kb.pressing("left")){
    if (showCover && !coverFading) {
      coverFading = true; // Start cover fade on key press
    }
    if (!gameStarted && !showCover) {
      gameStarted = true;
      fallingObject.vel.y = random(5,8); // object starts falling
    }
    if (textBox && !showCover) textBox.visible = false; // hide text box
    if (!showCover) catcher.vel.x = -6;
  }

  else if (kb.pressing("right")){
    if (showCover && !coverFading) {
      coverFading = true; // Start cover fade on key press
    }
    if (!gameStarted && !showCover) {
      gameStarted = true;
      fallingObject.vel.y = random(5,8); // object starts falling
    }
    if (textBox && !showCover) textBox.visible = false; // hide text box
    if (!showCover) catcher.vel.x = 6;
  }

  else {
    if (!showCover) catcher.vel.x = 0;
  }

  // boarders for the catcher
  if (catcher.x <= 50)
  {
    catcher.x = 50;
  }

  if (catcher.x >= 350)
  {
    catcher.x = 350
  }
}

function randomHatGenerator(){
  if (random() >= 0.3)
  {
    fallingObject.image = topHat;
  }

  else if (random() >= 0.66)
  {
    fallingObject.image = cowboyHat;
  }

  else
  {
    fallingObject.image = fedoraHat;
  }
}

// text box for instructions
function textb(){
  if (!textBox) {
    textBox = new Sprite(200, 200, 350, 200);
    textBox.collider = "none"; 
    tb.resize(323, 200);
    textBox.image = tb;
    textBox.text = "Help the turtle collect his hats\n using the A/D keys or the left/right\n arrow keys! Don't drop too many hats,\n or he will get very angry...";
    textBox.textSize = 20;
    textBox.visible = true;
  }
}

/* PRELOAD LOADS FILES */
function preload(){
  // turtle sprites
  turtle = loadImage("assets/turtle_body.png");
  turtleHat1 = loadImage("assets/turtle-hat-1.png");
  turtleHat2 = loadImage("assets/turtle-hat-2.png");
  turtleHat3 = loadImage("assets/turtle-hat-3.png");
  turtleHat4 = loadImage("assets/turtle-hat-4.png");
  turtleHat5 = loadImage("assets/turtle-hat-5.png");
  angryTurtle = loadImage("assets/angry-turtle.png");
  superAngryTurtle = loadImage("assets/super-angry-turtle.png");


  // hat sprites
  topHat = loadImage("assets/top-hat.png");
  cowboyHat = loadImage("assets/cowboy-hat.png");
  fedoraHat = loadImage("assets/fedora-hat.png");

  // backgrounds
  background1 = loadImage("backgrounds/background1.png");
  back1 = loadImage("backgrounds/back1.png");
  cover = loadImage("backgrounds/cover image.png");
  

  // font
  font = loadFont("assets/Vividly-Regular.ttf");

  // text box
  tb = loadImage("assets/textbox.png");
}

/* SETUP RUNS ONCE */
function setup() {
  createCanvas(400,400);
  background(back1);
  textFont(font);

  //create catcher 
  catcher = new Sprite(200,350,100,30);
  catcher.color = color(95,158,160);
  catcher.collider = "kinematic";
  catcher.image = turtle;
  catcher.visible = false; // hide turtle on cover page

  //create falling object
  fallingObject = new Sprite(100,0,10);
  fallingObject.color = color(0,128,128);
  fallingObject.pos.y = -20; // hides it from player view
  fallingObject.vel.y = 0; // stops the object from falling at the start
  fallingObject.image = fedoraHat;
  fallingObject.rotationSpeed = 1;
  fallingObject.direction = "down";
}

/* DRAW LOOP REPEATS */
function draw() 
{
  if (showCover) {
    // show cover image
    background(0);
    
    // check for any key press or mouse click to start fading
    if ((keyIsPressed || mouseIsPressed) && !coverFading) {
      coverFading = true;
    }
    
    // Apply the tint with the current alpha value
    tint(255, alpha);
    
    // Draw the cover image centered
    image(cover, 0, 0, 400, 400);
    
    // only fade if user has interacted
    if (coverFading) {
      alpha -= fadeAmount;
      
      // when cover fades out completely, switch to game
      if (alpha <= 0) {
        showCover = false;
        alpha = 0;
        catcher.visible = true; // show turtle when game starts
      }
    }
    
    // reset tint for other elements
    noTint();
    
    // show text box to start
    fill(255);
    textAlign(CENTER);
    textSize(16);
    if (!coverFading) {
      text("Click or press any key to start", 200, 370);
    }
    
  } else {
    // game is running
    background(back1);
    
    // reset tint to normal
    noTint();
    
    textb();
    fill(0);
    textAlign(LEFT);
    textSize(20);
    text("Hat meter: " + score, 30, 40);

    turtleMovement();

    // if fallingObject reaches the bottom, move to random position at the top
    if (fallingObject.y >= 400)
    {
      randomHatGenerator();
      fallingObject.y = 0;
      fallingObject.x = random(401);
      fallingObject.vel.y = random(6,8);
      score -= 1;
    }

    // if fallingObject collides with 
    if (fallingObject.collides(catcher))
    {
      fallingObject.y = 0;
      fallingObject.x = random(401);
      fallingObject.direction = "down";
      fallingObject.vel.y = random(8,9);
      fallingObject.rotationSpeed = 1;
      score += 1;
      randomHatGenerator();
    }

    scoring();
  }
}