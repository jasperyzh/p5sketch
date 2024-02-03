/*
 * p5js_boilerplate
 * @version 1.2.240101
 */
const SKETCH_NAME = "circle";

function keyPressed() {
  keyPressed_saveGif(240);
}

// default_helpers
var default_loop, default_grid;

function setup() {
  setup_canvas(60, 800, SKETCH_NAME);
  default_loop = new NoiseLoopGenerator(0.05, 20.0, 240, width, 99);
  default_grid = new Grid(0, 0, width * Math.pow(GR, -4));
}
function draw() {
  background(215, 0, 0);

  fill(0, 0, 255);
  circle(100, 100, 30);

  draw_debug(false);
}
