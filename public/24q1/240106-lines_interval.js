// the loop timing could use some framework, had troule figuring out the short interval length to the full loop length 


let grid = [];
const gridSize = 18;
let cellWidth, cellHeight;
let interval = 333.333; // 4 seconds ( 4000/12 (steps?))
let lastSwitchTime = 0;
let step = 0;
let ease = 0.2; // Easing factor for smooth transition
let stroke_color;
const TOTAL_LINES_PER_CELL = 3;

let colorPalette;
let paletteIndex = 0; // Palette index to cycle through colors

let framesPerInterval;
function keyPressed() {
  if (key === "G") {
    saveGif("240106-lines_with_interval", 240, {
       units: "frames"
    });
  }
}

function setup() {
  createCanvas(800, 800);
  framesPerInterval = 15; // Calculate frames per interval
  frameRate(60);
  
  
  // colorMode(HSB, 360, 100, 100); // Set color mode to HSB
  stroke_color = color(0, 0, 0); // Initial stroke color in HSB
  strokeWeight(5);

  // Define the color palette
  colorPalette = [
    color(247, 191, 3),
    color(62, 135, 174),
    color(219, 56, 45),
    color(11, 216, 182),
  ];

  cellWidth = width / 1.618 / 1.618 / 1.618 / 1.618 / 1.618 / 1.618;
  cellHeight = height / 1.618 / 1.618 / 1.618 / 1.618 / 1.618 / 1.618;
  // Initialize the grid and lines
  for (let y = 0; y < gridSize; y++) {
    for (let x = 0; x < gridSize; x++) {
      let cellCenterX = x * cellWidth + cellWidth / 2;
      let cellCenterY = y * cellHeight + cellHeight / 2;
      let lines = [];
      for (let i = 0; i < TOTAL_LINES_PER_CELL; i++) {
        // Each line starts with both points at the center of the cell
        lines.push({
          pointA: createVector(cellCenterX, cellCenterY),
          pointB: createVector(cellCenterX, cellCenterY),
          targetA: createVector(cellCenterX, cellCenterY),
          targetB: createVector(cellCenterX, cellCenterY),
        });
      }
      grid.push({ x: cellCenterX, y: cellCenterY, lines: lines });
    }
  }
}

function draw() {
  background(13);

  
  // Check if it's time to switch steps based on frame count
  if (round(frameCount % framesPerInterval) === 0) {
    step = (step + 1) % 8; // Cycle through steps
    print(step);
    setTargets(step);
  }
  
  // Update points towards their targets
  for (let cell of grid) {
    for (let line of cell.lines) {
      line.pointA.x = lerp(line.pointA.x, line.targetA.x, ease);
      line.pointA.y = lerp(line.pointA.y, line.targetA.y, ease);
      line.pointB.x = lerp(line.pointB.x, line.targetB.x, ease);
      line.pointB.y = lerp(line.pointB.y, line.targetB.y, ease);
    }
  }

  // // Check if it's time to switch steps
  // let theCurrentTime = millis();
  // if (theCurrentTime - lastSwitchTime > interval) {
  //   step = (step + 1) % 8; // Cycle through steps 0 to 3
  //   setTargets(step);
  //   lastSwitchTime = theCurrentTime;
  // }
  

  // Draw the lines
  for (let cell of grid) {
    for (let the_line of cell.lines) {
      // stroke(0);
      let d = dist(
        the_line.pointA.x,
        the_line.pointA.y,
        the_line.pointB.x,
        the_line.pointB.y
      );
      if (d > 3) {
        // Change '1' to adjust the visibility threshold
        // stroke(random(255), random(255), random(255), 255); // Fully opaque if the line is long enough
        stroke(stroke_color);
      } else {
        noStroke(); // No stroke if the line is too short
      }

      line(
        the_line.pointA.x,
        the_line.pointA.y,
        the_line.pointB.x,
        the_line.pointB.y
      );
    }
  }
}

function setTargets(step) {

  if (step == 1 || step == 5) {
    // Update the color only when the cycle restarts
    stroke_color = colorPalette[paletteIndex];
    paletteIndex = (paletteIndex + 1) % colorPalette.length;
  }
  for (let cell of grid) {
    // Define eight points around the cell
    let targets = [
      createVector(cell.x - cellWidth / 2, cell.y - cellHeight / 2), // Top Left
      createVector(cell.x + cellWidth / 2, cell.y - cellHeight / 2), // Top Right
      createVector(cell.x - cellWidth / 2, cell.y + cellHeight / 2), // Bottom Left
      createVector(cell.x + cellWidth / 2, cell.y + cellHeight / 2), // Bottom Right
      createVector(cell.x, cell.y - cellHeight / 2), // Top Center
      createVector(cell.x, cell.y + cellHeight / 2), // Bottom Center
      createVector(cell.x - cellWidth / 2, cell.y), // Left Center
      createVector(cell.x + cellWidth / 2, cell.y), // Right Center
    ];

    for (let line of cell.lines) {
      switch (step) {
        case 0:
          // Reset to initial state where A and B are at the same coordinate
          line.targetA = createVector(cell.x, cell.y);
          line.targetB = createVector(cell.x, cell.y);
          break;
        case 1:
          // print(paletteIndex);
          // Cycle through the color palette in sequence
          // stroke_color = colorPalette[paletteIndex];
          // paletteIndex = (paletteIndex + 1) % colorPalette.length; // Move to the next color

          // stroke_color = color(random(360), 80, 100);
          // stroke_color = color(random(255), random(255), random(255));
          // Rest - do nothing
          break;
        case 2:
          // B goes to a new random coordinate
          // let angle = random(TWO_PI);
          // let length = random(cellWidth / 4, cellWidth / 2);
          // line.targetB = createVector(cell.x + cos(angle) * length, cell.y + sin(angle) * length);

          // B goes to a new random coordinate from predefined targets
          let targetIndex = floor(random(targets.length));
          line.targetB = targets[targetIndex];
          break;
        case 3:
          // Rest - do nothing
          break;
        case 4:
          // A goes to where B is
          line.targetA = createVector(line.targetB.x, line.targetB.y);
          break;
        case 5:
          // Rest - do nothing
          break;
        case 6:
          // A goes to where B is
          line.targetB = createVector(cell.x, cell.y);
          break;
        case 7:
          // Rest - do nothing
          break;
      }
    }
  }
  
  
}
