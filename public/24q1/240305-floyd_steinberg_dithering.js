/*
 * p5js_boilerplate
 * @version 1.2.240101
 */
const SKETCH_NAME = "floyd_steinberg_dithering";

function keyPressed() {
  keyPressed_saveGif(240);

  if (key === 's') {
    // saveFrames('240306-'+SKETCH_NAME, 'png', 1, 5);
    saveCanvas();
  }
}

// default_helpers
var default_loop, default_grid;

let originalImg; // This will hold the unmodified image
// New variables for customization
// let threshold = 100; // Default threshold for black/white decision
// let errorFactor = 2; // Default error diffusion factor

let threshold = 230; // Default threshold for black/white decision
let errorFactor = 5.3; // Default error diffusion factor

function preload() {
    originalImg = loadImage("/images/240306-1120-800x800.jpg"); // Make sure to use the correct path

}

function setup() {
  setup_canvas(60, 800, SKETCH_NAME);
  default_loop = new NoiseLoopGenerator(0.05, 20.0, 240, width, 99);
  default_grid = new Grid(0, 0, width * Math.pow(GR, -1));

  background(19,19,19);
  originalImg.resize(width, 0); // Setting height to 0 auto-calculates it to maintain aspect ratio
 
  loadImageAndApplyDithering();
}

function draw() {
  // draw function left intentionally blank

  draw_debug(false);
}

function ditherImage(img) {
  for (let y = 0; y < img.height; y++) {
    for (let x = 0; x < img.width; x++) {
      let idx = (x + y * img.width) * 4;
      let oldR = img.pixels[idx];
      let oldG = img.pixels[idx + 1];
      let oldB = img.pixels[idx + 2];

      let newColor = oldR + oldG + oldB > threshold ? 255 : 0; // Use the threshold variable
      let err = ((oldR + oldG + oldB) / 3 - newColor) / errorFactor; // Use the errorFactor variable

      img.pixels[idx] = img.pixels[idx + 1] = img.pixels[idx + 2] = newColor;

      // Error distribution with dynamic weights
      distributeError(img, x, y, err);
    }
  }
}

function distributeError(img, x, y, err) {
  // Error diffusion weights as proportions of errorFactor
  let rightWeight = 7 / errorFactor;
  let bottomLeftWeight = 3 / errorFactor;
  let bottomWeight = 5 / errorFactor;
  let bottomRightWeight = 1 / errorFactor;

  updatePixel(img, x + 1, y, err * rightWeight); // Right
  if (x > 0) updatePixel(img, x - 1, y + 1, err * bottomLeftWeight); // Bottom left
  updatePixel(img, x, y + 1, err * bottomWeight); // Bottom
  if (x < img.width - 1)
    updatePixel(img, x + 1, y + 1, err * bottomRightWeight); // Bottom right
}

function updatePixel(img, x, y, err) {
  if (x >= 0 && x < img.width && y >= 0 && y < img.height) {
    let idx = (x + y * img.width) * 4;
    // Adding the error to each color channel and ensuring values are within bounds
    img.pixels[idx] = constrain(img.pixels[idx] + err, 0, 255);
    img.pixels[idx + 1] = constrain(img.pixels[idx + 1] + err, 0, 255);
    img.pixels[idx + 2] = constrain(img.pixels[idx + 2] + err, 0, 255);
  }
}

function loadImageAndApplyDithering() {
    img = originalImg.get(); // Create a copy of the original image to work with
    img.loadPixels();
    ditherImage(img);
    img.updatePixels();
    image(img, default_grid.getCellRect(4)[0], default_grid.getCellRect(4)[1], default_grid.getCellRect(4)[2], default_grid.getCellRect(4)[3]);
  }
function mouseClicked() {
    // threshold = floor(random(255, 260)); // Randomize the threshold
    threshold += 10;
    // errorFactor += 0.4;
    // errorFactor = floor(random(3, 6)); // Randomize the error diffusion factor (keeping it within a reasonable range)
    print("threshold: " + threshold + ", errorFactor: " + errorFactor);
    loadImageAndApplyDithering(); // Refresh and reapply dithering when the mouse is clicked
  }