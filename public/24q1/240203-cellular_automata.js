/*
 * p5js_boilerplate
 * @version 1.2.240101
 */
const SKETCH_NAME = "wolfram_cellular_automata";

function keyPressed() {
  keyPressed_saveGif(240);
}

// default_helpers
var default_loop, default_grid;

function setup() {
  setup_canvas(60, 800, SKETCH_NAME);
  default_loop = new NoiseLoopGenerator(0.05, 20.0, 240, width, 99);
  default_grid = new SquareGrid(0, 0, width * Math.pow(GR, -4));


  setup_cellularautomata();
}
function draw() {
//   background(215);

  draw_debug(false);
}

function setup_cellularautomata() {
  let ca = new CellularAutomata(800, 800, 10, 5);
  ca.randomize();
  ca.setRule(30);
  for (let i = 0; i < 200; i++) {
    ca.generate();
    ca.display();
  }
}

// create a CellularAutomata class  to create a simple cellular automata
// add size, rule, and cells
class CellularAutomata {
  constructor(w, h, r, size) {
    this.w = w;
    this.h = h;
    this.rule = r;
    this.size = size; // Add size property
    this.cells = new Array(this.w);
    this.generation = 0;
    for (let i = 0; i < this.w; i++) {
      this.cells[i] = 0;
    }
    this.cells[this.w / 2] = 1;
  }

  // create a function to generate the next generation
  generate() {
    let nextgen = new Array(this.w);
    for (let i = 0; i < this.w; i++) {
      nextgen[i] = 0;
    }
    for (let i = 1; i < this.w - 1; i++) {
      let left = this.cells[i - 1];
      let me = this.cells[i];
      let right = this.cells[i + 1];
      nextgen[i] = this.rules(left, me, right);
    }
    this.cells = nextgen;
    this.generation++;
  }

  // create a function to display the cells
  // Update the display function to use the size property
  display() {
    for (let i = 0; i < this.w; i++) {
      if (this.cells[i] == 1) {
        fill(0);
      } else {
        fill(255);
      }
      noStroke();
      rect(i * this.size, this.generation * this.size, this.size, this.size);
    }
  }

  // create a function to set the rule
  setRule(r) {
    if (r < 0 || r > 255) {
      return;
    }
    this.rule = r;
  }

  // create a function to randomize the cells
  randomize() {
    for (let i = 0; i < this.w; i++) {
      this.cells[i] = int(random(2));
    }
  }

  // create a function to get the next generation based on the rules
  rules(a, b, c) {
    if (a == 1 && b == 1 && c == 1) return (this.rule >> 7) & 1;
    if (a == 1 && b == 1 && c == 0) return (this.rule >> 6) & 1;
    if (a == 1 && b == 0 && c == 1) return (this.rule >> 5) & 1;
    if (a == 1 && b == 0 && c == 0) return (this.rule >> 4) & 1;
    if (a == 0 && b == 1 && c == 1) return (this.rule >> 3) & 1;
    if (a == 0 && b == 1 && c == 0) return (this.rule >> 2) & 1;
    if (a == 0 && b == 0 && c == 1) return (this.rule >> 1) & 1;
    if (a == 0 && b == 0 && c == 0) return this.rule & 1;
    return 0;
  }
}
