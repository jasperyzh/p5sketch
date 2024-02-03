let goldenLargeGrid, goldenSmallGrid, squareGrid;

function setup_square_grid() {
  goldenLargeGrid = new SquareGrid(0, 0, width / GR / GR / GR);
  goldenSmallGrid = new SquareGrid(0, 0, width / GR / GR);
  squareGrid = new SquareGrid(0, 0, width / 3);
}
function draw_square_grid() {
  background(13);
  goldenSmallGrid.drawGridExercise();
  goldenLargeGrid.debug();
  goldenSmallGrid.debug();
  squareGrid.debug();
}

let grid_large;
let haikuDisplay;

function setup_grid_haiku() {
  CANVAS.resize(800, 800);
  grid_large = new SquareGrid(0, 0, width / GR / GR / GR);


  background(0);
  // noLoop(); // Static display, no need to loop
  stroke(0, 255, 255); // Cyan color, similar to the image
  noFill();
  strokeWeight(2); // Thin stroke, adjust as needed

  textFont("Arial");
  textStyle(BOLD);
  textLeading(52 * GR);
  
  let haiku =
    "Gusts stroke thru grey,\nWhisper of a storm to come,\nEating bite-sized elephant";
  haikuDisplay = new TextDisplay(haiku, 52, width, height);
  
}
function draw_grid_haiku() {
  background(13);
  noFill();
  strokeWeight(5);
  let getColor = [120, 120, 120];
  // let getColor = colorPalette[round(random(0, 3))];
  getColor[3] = 80;
  // stroke(getColor)
  noStroke();
  fill(getColor);
  for (let k = 0; k <= 8; k++) {
    triangle(
      grid_large.getCellPoint(round(random(1, 2)))[0],
      grid_large.getCellPoint(round(random(1, 2)))[1],
      grid_large.getCellPoint(round(random(8, 11)))[0],
      grid_large.getCellPoint(round(random(8, 11)))[1],
      grid_large.getCellPoint(round(random(8, 11)))[0],
      grid_large.getCellPoint(round(random(8, 11)))[1]
    );
  }
  for (let k = 0; k <= 8; k++) {
    triangle(
      grid_large.getCellPoint(round(random(4, 7)))[0],
      grid_large.getCellPoint(round(random(4, 7)))[1],
      grid_large.getCellPoint(round(random(8, 11)))[0],
      grid_large.getCellPoint(round(random(8, 11)))[1],
      grid_large.getCellPoint(round(random(12, 15)))[0],
      grid_large.getCellPoint(round(random(12, 15)))[1]
    );
  }
  haikuDisplay.display();
}

/**
//   Gusts stroke thru grey,
// Whisper of a storm to come,
// Eating bite-sized elephant
 */

class TextDisplay {
  constructor(text, size, canvasWidth, canvasHeight) {
    this.text = text;
    this.size = size;
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
  }

  display() {
    textSize(this.size);
    fill(255); // White color
    textAlign(CENTER, CENTER);
    text(this.text, this.canvasWidth / 2, this.canvasHeight / 2);
  }
}
