// 220927
// DVD Logo sketch
// reference: [Coding Challenge #131: Bouncing DVD Logo](https://www.youtube.com/watch?v=0j86zuqqTlQ)

// 240203-DVD Logo sketch with improvements

let x, y;
let xspeed, yspeed;
let logo;
let imgWidth = 120;
let imgHeight = 56;
let r, g, b;

function preload() {
  logo = loadImage("/images/elephant.jpg"); // Ensure this path is correct
}

function setup() {
  createCanvas(800, 800);
  x = random(imgWidth, width - imgWidth);
  y = random(imgHeight, height - imgHeight);
  xspeed = 130;
  yspeed = 130;
  pickColor();
  frameRate(60);
  lastFrameTime = millis();
}

function pickColor() {
  r = random(160, 256);
  g = random(160, 256);
  b = random(160, 256);
}

function draw() {
  let deltaTime = (millis() - lastFrameTime) / 1000;
  lastFrameTime = millis();
  background(60);
  tint(r, g, b);
  image(logo, x, y, imgWidth, imgHeight);

  x += xspeed * deltaTime;
  y += yspeed * deltaTime;

  checkEdges();
}

function checkEdges() {
  if (x + imgWidth >= width || x <= 0) {
    xspeed *= -1;
    pickColor();
    x = constrain(x, 0, width - imgWidth);
  }
  if (y + imgHeight >= height || y <= 0) {
    yspeed *= -1;
    pickColor();
    y = constrain(y, 0, height - imgHeight);
  }
}

// function windowResized() {
//   resizeCanvas(windowWidth, windowHeight);
//   // Adjust position if out of bounds after resize
//   x = constrain(x, 0, width - imgWidth);
//   y = constrain(y, 0, height - imgHeight);
// }
