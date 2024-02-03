/* 
function setup_canvas(_fps, _desc)
function resize_canvas(_width = windowWidth, _height = windowHeight)
function keyPressed_saveGif(
function draw_label(x, y, _text)
function draw_debug(draw_counter = true, the_loop)
function draw_debug_counter()
function add_debug(name, value)
function draw_debug_noiseloop(the_loop, _draw = true)
*/

const GR = 1.618; // GOLDEN_RATIO

// setup canvas & debug
var _CANVAS;
var DEBUG = true;

function setup_canvas(_fps, _size = 512, _desc = "A Sketch") {
  createCanvas(_size, _size);
  _CANVAS = createCanvas(_size, _size);
  _CANVAS.parent("canvas");
  frameRate(_fps);
  describe(_desc);
}

function keyPressed_saveGif(fps) {
  if (key === "G") {
    saveGif(`${getDateYYMMDD()}-${SKETCH_NAME}`, fps, {
      delay: 0,
      units: "frames", //frames || seconds
    });
  }
}

// slideshow
let currentFunctionIndex = 0;
let lastSwitchTime = 0;
let switchInterval = 4000; // switch every 4 seconds

let setup_slideshow_2312 = function () {
  setup_ellipse_innershadow();
  setup_wavingtext();
};
let draw_slideshow_2312 = function () {
  // 2312-sketches
  let drawFunctions = [
    draw_mousetrail,
    draw_ellipse_innershadow,
    draw_trigonometry,
    draw_wavingtext,
    draw_dashline,
  ];

  // Switch to the next drawing function every 4 seconds
  if (millis() - lastSwitchTime > switchInterval) {
    currentFunctionIndex = (currentFunctionIndex + 1) % drawFunctions.length;
    lastSwitchTime = millis();
  }
  // Call the current drawing function
  drawFunctions[currentFunctionIndex]();
};

// common function
function resize_canvas(_width = windowWidth, _height = windowHeight) {
  resizeCanvas(_width, _height);
}

// Utilities
function draw_label(x, y, _text) {
  fill(0);
  noStroke();
  textSize(12);
  text(_text, x, y);
}

/*
debugs
*/

var debugLog = [];
var debugFontSize = 12;
document
  .getElementById("canvas")
  .insertAdjacentHTML("afterend", '<pre id="debugOutput"></pre>');
var debugElement = document.getElementById("debugOutput");

function draw_debug(draw_counter = true, the_loop) {
  if (!DEBUG) return;

  if (draw_counter) draw_debug_counter();
  if (the_loop) draw_debug_noiseloop(the_loop);

  // Add default debug variables
  add_debug("------", "");
  add_debug("frameCount", frameCount);
  add_debug("millis\t", millis());
  add_debug("deltaTime", deltaTime);
  add_debug("focused\t", focused);
  add_debug("getTargetFrameRate()", getTargetFrameRate());
  add_debug("display_size", `${displayWidth}x${displayHeight}`);
  add_debug("window_size", `${windowWidth}x${windowHeight}`);
  add_debug("canvas_size", `${width}x${height}`);
  add_debug("pixelDensity()", pixelDensity());
  add_debug("displayDensity()", displayDensity());
  add_debug("getURL()", getURL());
  add_debug("getURLPath()", getURLPath());
  add_debug("getURLParams()", JSON.stringify(getURLParams(), null, 2));
  add_debug("------", "");

  // Update the content of the <pre> element
  debugElement.innerHTML = debugLog.join("<br>");
  debugElement.style.fontSize = `${debugFontSize}px`;
  debugElement.style.color = "white"; // Set text color (optional)

  // Clear the log after rendering
  debugLog = [];
}

var debug_counter = 0;

function draw_debug_counter() {
  debug_counter += deltaTime / 1000;
  push();
  textStyle(BOLD);
  textFont("Arial");
  textSize(108);
  textAlign(CENTER, CENTER);
  fill(108);
  blendMode(HARD_LIGHT);
  text(Math.round(debug_counter), width / 2, height / 2);
  pop();
}

function add_debug(name, value) {
  debugLog.push(`${name}${value != "" ? "\t:" : ""} ${value}`);
}

/* 
noise
*/

class NoiseLoopGenerator {
  constructor(scale, radius, nSteps, noiseAreaSize = width, noise_seed = null) {
    if (noise_seed != null) noiseSeed(noiseSeed);

    this.scale = scale;
    this.radius = radius;
    this.nSteps = nSteps; // the frames: 4secs * 60fps = total 240frames
    this.noiseAreaSize = noiseAreaSize;
    this.noise_image = this.generateNoiseImage();
    this.loopingNoiseArray = [];
  }

  getLoopingNoise(_frameCount = frameCount) {
    let t = map(_frameCount % this.nSteps, 0, this.nSteps, 0, TWO_PI);
    let px = this.radius * cos(t);
    let py = this.radius * sin(t);
    return noise(this.scale * px, this.scale * py);
  }

  generateNoiseImage() {
    let img = createImage(this.noiseAreaSize, this.noiseAreaSize);
    img.loadPixels();

    noiseDetail(4, 0.5);
    for (let x = 0; x < this.noiseAreaSize; x++) {
      for (let y = 0; y < this.noiseAreaSize; y++) {
        let g = 255.0 * noise(this.scale * x, this.scale * y);
        img.set(x, y, color(g, g, g));
      }
    }

    img.updatePixels();
    return img;
  }

  draw(_frameCount = frameCount) {
    // image(noiseLoop.noise_image, 0, 0);

    var currStep = _frameCount % this.nSteps;
    var t = map(currStep, 0, this.nSteps, 0, TWO_PI);
    var px = width / 2.0 + this.radius * cos(t);
    var py = width / 2.0 + this.radius * sin(t);

    var noiseAtLoc = height - 100.0 * this.getLoopingNoise(currStep);
    this.loopingNoiseArray[currStep] = noiseAtLoc;

    noFill();
    stroke(255, 0, 0);
    beginShape();
    for (var i = 0; i < this.nSteps; i++) {
      var nx = map(i, 0, this.nSteps - 1, 0, width);
      var ny = this.loopingNoiseArray[i];
      vertex(nx, ny);
    }
    endShape();

    fill(255, 0, 0);
    // ellipse(px, py, 7, 7);
    push();
    noStroke();
    translate(width - 35, height - 35);
    rotate(HALF_PI * 3);
    arc(0, 0, 30, 30, 0, t);
    pop();

    // Correctly map the current step to the width of the canvas
    var ex = map(currStep, 0, this.nSteps, 0, width);
    ellipse(ex, noiseAtLoc, 7, 7);
  }
}

function draw_debug_noiseloop(the_loop, _draw = true) {
  strokeWeight(1);
  let getNoise = the_loop.getLoopingNoise();

  if (_draw) the_loop.draw();

  const speed = 0.02;
  let x = width / 2 + cos(frameCount * speed) * 300 * getNoise;
  let y = height / 2 + sin(frameCount * speed) * 300 * getNoise;
  fill(100, 100, 240);

  // ellipse(x, y, 50, 50);
  ellipse(x, y, 30, 30);
  draw_label(x + 10, y, "sin");

  ellipse(y, x, 30, 30);
  draw_label(y + 10, x, "cos");
}
