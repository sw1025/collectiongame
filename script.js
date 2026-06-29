let collector,object,milk;
let score = 0;
let catImg,fishImg,milkImg,yumSound,milkSound,chocImg,madSound;

function setup() {
  createCanvas(550, 400);
  catImg.resize(90, 0);
  fishImg.resize(60, 0);
  milkImg.resize(60,0);
  chocImg.resize(60,0);
  // Sprite(x,y,w,h,collider)
  collector = new Sprite(catImg,200,370,'k');
  object = new Sprite(fishImg,100,0);
  object.vel.y = 2;

  milk = new Sprite(milkImg,150,0);
  milk.vel.y = 4;

  choc = new Sprite(chocImg,200,0);
  choc.vel.y = 2;

  restart = new Sprite(-200,-200);
}

function preload(){
  catImg = loadImage("assets/CAT.png");
  fishImg = loadImage("assets/FISH.png");
  milkImg = loadImage("assets/MILK.png");
  chocImg = loadImage("assets/CHOC.png");
  bg = loadImage("assets/CLOUD.jpg");
  soundFormats("wav");
  soundFormats("mp3");
  yumSound = loadSound("assets/YUM.wav");
  milkSound = loadSound("assets/MILKYUM.wav");
  madSound = loadSound("assets/MAD.mp3");
}

function draw() {
  background(bg);
  restart.w = 80;
  restart.h = 50;
  //k = kinematic (cannot be moved by other sprites)
  restart.collider = "k";
  restart.text = "Restart";
  restart.color = 'pink';
  text("Use the arrow keys to \ncatch the falling objects.",200,40);
  if (object.y >= height){
    object.y = 0;
    object.x = random(width);
    object.vel.y = random(1,3);
    score = score - 1;
  }
  if (milk.y >= height){
    milk.y = 0;
    milk.x = random(width);
    milk.vel.y = random(1,3);
    score = score - 1;
  }

  if (choc.y >= height){
    choc.y = 0;
    choc.x = random(width);
    choc.vel.y = random(1,3);
  }

  if (kb.pressing('right')){
    collector.vel.x = 2;
  }
  else if (kb.pressing('left')){
    collector.vel.x = -2;
  }
  else{
    collector.vel.x = 0;
  }

  if (collector.x < 30){
    collector.x = 30;
  }
  else if (collector.x>520){
    collector.x = 520;
  }

  if (object.collides(collector)){
    object.y = 0;
    object.x = random(width);
    object.vel.y = random(1,3);
    object.direction = "down";
    score =score+1;
    playSound();
  }

  if (milk.collides(collector)){
    milk.y = 0;
    milk.x = random(width);
    milk.vel.y = random(1,3);
    milk.direction = "down";
    score =score+1;
    playMilkSound();
  }

  if (choc.collides(collector)){
    choc.y = 0;
    choc.x = random(width);
    choc.vel.y = random(1,3);
    choc.direction = "down";
    score =score-1;
    playMad();
  }

  if (milk.collides(object) || choc.collides(object) || milk.collides(choc)){
    object.direction = "down";
    milk.direction = "down";
  }

  text("Score: "+score,20,40);

  displayScreen();
}

function displayScreen(){
  if (score<-1){
    background('lightgray');
    collector.pos = {x:-100,y:-100};
    object.pos = {x:-200,y:-200};
    milk.pos = {x:200,y: -20};
    choc.pos = {x:200,y: -400};
    text("YOU LOST!",235,80);
    textSize(75);
    text("😿",235,180);
    textSize(12);
    text('Click "Restart" to play again.', 200,230);
    restart.pos = {x:width / 2,y:height / 2 + 120}
    if (restart.mouse.presses()){
      startGame();
    }
  }
  else if (score > 9){
    background('lightgray');
    collector.pos = {x:-100,y:-100};
    object.pos = {x:-200,y:-200};
    milk.pos = {x:200,y: -20};
    choc.pos = {x:200,y: -400};
    text("YOU WIN!",240,80);
    textSize(75);
    text("😸",235,180);
    textSize(12);
    text('Click "Restart" to play again.', 200,230);
    restart.pos = {x:width / 2,y:height / 2 + 120};
    if (restart.mouse.presses()){
      startGame();
    }
  }
}

function startGame(){
  restart.pos = {x:-200,y:-200};
  background('pink');
  score = 0;
  collector.pos = {x:200,y:370};
  object.pos = {x:100,y:0};
  milk.pos = {x:150,y:0};
}

function playSound(){
  yumSound.play();
  yumSound.setLoop(false);
  yumSound.setVolume(0.3);
}

function playMilkSound(){
  milkSound.play();
  milkSound.setLoop(false);
  milkSound.setVolume(0.3);
}

function playMad(){
  madSound.play();
  madSound.setLoop(false);
  madSound.setVolume(0.3);
}