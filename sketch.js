let balloonImgs = [];
let balloons = [];
numberOfBalloons = 50;
let s = 5;
let popped = false;
let buttonCreated = false;
let button;

function preload() {
  for (let i = 1; i < 6; i++) {
    balloonImgs[i-1] = loadImage('resources/balloon' + i + '.png');
  }
  popRequest = loadImage('resources/pop_balloon.jpg')
  title = loadImage('resources/title.png')
  undertext = loadImage('resources/under_text.JPG')
  bg = loadImage('resources/watercolor.jpg')
  song = loadSound('resources/sixteen.mp3')
}

function setup() {
  w = windowWidth;
  h = windowHeight;
  createCanvas(w, h);

  for (let i = 0; i < numberOfBalloons; i++) {
    let x = random(w);
    let y = random(h);
    let width = random(30, 50);
    let speed = random(0.7, 1.5);
    let col = floor(random(0, 5));
    balloons.push(new Balloon(x, y, width, speed, balloonImgs[col], h));
  }
}	

function makeBeginButton() {
  button = createButton('Begin');
  button.id('startButton')
  document.getElementById('startButton').addEventListener('click', (event) => {
    event.preventDefault();
    window.location.href = '/intro.html';
  });
  button.position(7/8*w, 7/8*h);
}


function draw() {
  background(255);
  if (w != windowWidth) { // window was resized
    text("Refresh the page!", windowWidth/2 - 30, windowHeight/2);
    textSize(90);
    if (buttonCreated) {
      button.hide();
    }
    noLoop();

  } else { // Main

    if (!popped) { // pop a balloon
      imageMode(CENTER);
      image(popRequest, w/2, h/2);
      for (let i = 0; i < balloons.length; i++) {
        balloons[i].move();
        balloons[i].show();
      }
      
    } else { // our baby's sweet 16th
      image(bg, w/2-50, h/2+10, 5*w/8, 6*h/8);
      image(title, w/2, h/2, 89*s, 57*s);
      image(undertext, w/2, 7/8*h);
      undertext.resize(200,0);
      for (let i = 0; i < balloons.length; i++) {
        balloons[i].move();
        balloons[i].show();
      }
      if (balloons.length == 0 && !buttonCreated) {
        makeBeginButton();
        buttonCreated = true;
      }
    }
  }
}

function mousePressed() {
  for (let i = 0; i < balloons.length; i++) {
    if (balloons[i].clicked(mouseX, mouseY)) {
      balloons.splice(i, 1);
      if (!popped) {
        popped = true;
        song.loop();
      }
    }
  }
}