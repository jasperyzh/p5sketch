/*
 * p5js_boilerplate
 * @version 1.2.240101
 */
const SKETCH_NAME = "default_sketch";

function keyPressed() {
  keyPressed_saveGif(240);
}

// default_helpers
var default_loop, default_grid;

let newsquaregrid;

function setup() {
  setup_canvas(60, 800, SKETCH_NAME);
  default_loop = new NoiseLoopGenerator(0.05, 20.0, 240, width, 99);
  default_grid = new Grid(0, 0, width * Math.pow(GR, -4));

  newsquaregrid = new NewSquareGrid(0, 0, width /4);

  // setup_cellularautomata();
}
function draw() {
  background(215);

  // newsquaregrid.draw();

  // Set the font for text
  textFont('Rubik');
  // Draw some text
  textSize(62);
  fill(0);
  text("Hello Google Fonts!", 50, 100);


  // default_loop.draw();
  draw_debug(false);
}

// create a new class for creating a 3x3 square grid
// with a given size
// label each cell with a number
// 0 1 2 3 4 5 6 7 8
// function to get the cell number from the mouse position
class NewSquareGrid {
  constructor(x, y, size) {
    this.x = x;
    this.y = y;
    this.size = size;
  }

  draw() {
    for (let i = 0; i < 9; i++) {
      let x = this.x + (i % 3) * this.size;
      let y = this.y + Math.floor(i / 3) * this.size;
      fill(255);
      stroke(0);
      rect(x, y, this.size, this.size);
      draw_label(x + this.size / 2, y + this.size / 2, i);
    }
  }

  getCellNumber(x, y) {
    let i =
      Math.floor((x - this.x) / this.size) +
      3 * Math.floor((y - this.y) / this.size);
    return i;
  }
}

let offsetX,
  offsetY = 0;
function draw_rpg_grid() {
  // Calculate the new offset
  offsetX = map(mouseX, 0, width, -width / 2, width / 2);
  offsetY = map(mouseY, 0, height, -height / 2, height / 2);

  // Apply the translation
  translate(offsetX, offsetY);

  // fill(255,0,255)
  stroke(30);
  noFill();
  // Draw your sketch here
  // For example, draw a grid of squares
  for (let i = -width; i < width * 2; i += 20) {
    for (let j = -height; j < height * 2; j += 20) {
      rect(i, j, 20, 20);
    }
  }
}



