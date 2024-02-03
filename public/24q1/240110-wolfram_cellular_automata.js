const SKETCH_NAME = "wolfram_cellular_automata";


let cellsArray = [];
let generationSize; // will be set based on canvas width
let cellSize; // size of each cell
let currentRuleset; // current ruleset
let maxGenerations; // max number of generations that fit on canvas
let colorChangeInterval = 240;

function setup_wolfram_cellular_automata() {
  cellSize = 16; // Adjust this to change cell size
  generationSize = Math.floor(width / cellSize);
  maxGenerations = Math.floor(height / cellSize);

  colorMode(HSB, 360, 100, 100, 100);
  currentRuleset = generateRandomRuleset();
  let initialColor = generateRandomColor();

  // Initialize the first generation with state and color
  let initialGeneration = Array(generationSize).fill({
    state: 0,
    color: initialColor,
  });
  initialGeneration[Math.floor(generationSize / 2)] = {
    state: 1,
    color: initialColor,
  };
  cellsArray.push(initialGeneration);
}

function draw_wolfram_cellular_automata() {
  background(100);

  const FRAME_SWITCH_RULE = 60; // Switch ruleset every 240 frames
  const FRAME_SPEED = 1; // 1 fastest, bigger number slower
  colorChangeInterval = 120;

  if (frameCount % FRAME_SWITCH_RULE === 0) {
    currentRuleset = generateRandomRuleset();
  }

  if (frameCount % 30 === 0) {
    mess_with_cells();
  }

  // Display cells
  for (let j = 0; j < cellsArray.length; j++) {
    for (let i = 0; i < generationSize; i++) {
      let cell = cellsArray[j][i];
      // fill(cell.state === 1 ? cell.color : 255);
      if (cell.state === 1) {
        fill(cell.color);
      } else {
        // Set same hue and saturation with different brightness and half opacity
        let adjustedColor = color(hue(cell.color), 80, 60, 80); // 50% brightness, 50% opacity
        fill(adjustedColor);
      }
      noStroke();
      rect(i * cellSize, j * cellSize, cellSize, cellSize);
    }
  }

  // Generate new generation every 4 frames
  if (frameCount % FRAME_SPEED === 0) {
    // Generate new generation and change color every 120 frames
    if (
      frameCount % colorChangeInterval === 0 ||
      cellsArray.length <= maxGenerations
    ) {
      let newColor =
        frameCount % colorChangeInterval === 0
          ? generateRandomColor()
          : cellsArray[0][0].color;
      let newGeneration = generate(cellsArray[0], newColor);
      cellsArray.unshift(newGeneration);
    }

    // Remove the oldest generation if we exceed maxGenerations
    if (cellsArray.length > maxGenerations) {
      cellsArray.pop();
    }
  }
}
function mess_with_cells() {
  // Check if the cellsArray is not empty
  if (cellsArray.length > 0) {
    // Get the latest row
    let latestRow = cellsArray[0];

    // Mess with the latest row
    for (let i = 0; i < latestRow.length; i++) {
      // Randomly change the state of each cell in the latest row
      latestRow[i].state = random([0, 1]);
    }

    // Replace the latest row in cellsArray
    cellsArray[0] = latestRow;
  }
}

function generate(currentCells, genColor) {
  let nextGen = [];
  for (let i = 0; i < currentCells.length; i++) {
    let left = i === 0 ? 0 : currentCells[i - 1].state;
    let me = currentCells[i].state;
    let right = i === currentCells.length - 1 ? 0 : currentCells[i + 1].state;

    nextGen[i] = { state: rules(left, me, right), color: genColor };
  }
  return nextGen;
}

function rules(a, b, c) {
  let s = "" + a + b + c;
  let index = parseInt(s, 2);
  return currentRuleset[index];
}

function generateRandomRuleset() {
  let ruleset = [];
  for (let i = 0; i < 8; i++) {
    ruleset[i] = Math.floor(Math.random() * 2);
  }

  let ruleNumber = parseInt(ruleset.join(""), 2);
  console.log(
    "Rule Number: " + ruleNumber + " (Binary: " + ruleset.join("") + ")"
  );

  return ruleset;
}

function generateRandomColor() {
  // return color(random(255), random(255), random(255));
  return color(random(360), 80, 100, 50);
}
// setup_webcam();
// draw_webcam();

let history;
let historyIndex = 0;
let offset = 0;
let sourceType = "WEBCAM"; // Initial source type set to "WEBCAM"
let source; // Will be used to store the webcam feed
const SlideHeight = 8; // slice height

function setup_webcam() {
  noStroke();
  let desiredWidth = width;
  let desiredHeight = height;

  if (sourceType === "WEBCAM") {
    source = createCapture(VIDEO); // Initialize the webcam
    source.hide(); // Hide the HTML element to use it as a p5.js image
  }

  history = Array.from({ length: floor(desiredHeight / SlideHeight) });
  for (let i = 0; i < history.length; i++) {
    history[i] = createImage(desiredWidth, desiredHeight);
  }
}

function draw_webcam() {
  background(0); // Clear the background in each draw call
  if (sourceType === "WEBCAM" && source) {
    // Display the webcam feed
    // image(source, 0, 0, width, height);

    // Calculate the dimensions for the square crop
    let videoSize = min(source.width, source.height);
    let cropX = (source.width - videoSize) / 2;
    let cropY = (source.height - videoSize) / 2;

    // webcam cropped
    image(source, 0, 0, width, height, cropX, cropY, videoSize, videoSize);

    // webcam half size
    image(
      source,
      0,
      0,
      source.width / 2,
      source.height / 2,
      0,
      0,
      source.width,
      source.height
    );

    for (let i = 0; i < history.length; i++) {
      const y = i * SlideHeight;
      const move_y = i * SlideHeight;
      const currentIndex = (i + offset) % history.length;
      // scale(1, 1.1);
      copy(
        history[currentIndex],
        0,
        y,
        width,
        SlideHeight,
        0,
        move_y,
        width,
        SlideHeight
      );
    }

    offset++;

    history[historyIndex].copy(
      source,
      cropX,
      cropY,
      videoSize,
      videoSize,
      0,
      0,
      width,
      height
    );

    history[historyIndex].copy(
      source,
      cropX,
      cropY,
      videoSize,
      videoSize,
      Math.round(default_grid.getCellRect(4)[0]),
      Math.round(default_grid.getCellRect(4)[1]),
      Math.round(default_grid.getCellRect(4)[2]),
      Math.round(default_grid.getCellRect(4)[3])
    );

    historyIndex = (historyIndex + 1) % history.length;
  }
}

// setup_noise_generator();
// draw_noise_generator();

let noisey, grid2;
function setup_noise_generator() {
  noisey = new NoiseGenerator();
  grid2 = new SquareGrid(0, 0, width / GR);
}
function draw_noise_generator() {
  fill(80);
  quad(
    default_grid.getCellPoint(4)[0],
    grid2.getCellPoint(4)[1],
    grid2.getCellPoint(3)[0],
    default_grid.getCellPoint(3)[1],
    grid2.getCellPoint(13)[0],
    default_grid.getCellPoint(13)[1],
    grid2.getCellPoint(13)[0],
    default_grid.getCellPoint(12)[1]
  );

  noisey.generateQuadNoise(
    grid2.getCellPoint(1)[0],
    grid2.getCellPoint(1)[1],
    grid2.getCellPoint(8)[0],
    grid2.getCellPoint(8)[1],
    grid2.getCellPoint(14)[0],
    grid2.getCellPoint(14)[1],
    grid2.getCellPoint(7)[0],
    grid2.getCellPoint(7)[1]
    // red,
    // green,
    // blue,
    // alpha
  );

  noisey.generateColorNoise(
    grid2.getCellRect(4)[0],
    grid2.getCellRect(4)[1],
    grid2.getCellRect(4)[2],
    grid2.getCellRect(4)[3]
  );
  return;

  copy(
    grid2.getCellRect(4)[0],
    grid2.getCellRect(4)[1],
    grid2.getCellRect(4)[2],
    grid2.getCellRect(4)[3],
    grid2.getCellRect(5)[0],
    grid2.getCellRect(5)[1],
    grid2.getCellRect(5)[2],
    grid2.getCellRect(5)[3]
  );
  copy(
    grid2.getCellRect(4)[0],
    grid2.getCellRect(4)[1],
    grid2.getCellRect(4)[2],
    grid2.getCellRect(4)[3],
    grid2.getCellRect(3)[0],
    grid2.getCellRect(3)[1],
    grid2.getCellRect(3)[2],
    grid2.getCellRect(3)[3]
  );

  // noisey.generateRectangularNoise(
  //   default_grid.getCellRect(4)[0],
  //   default_grid.getCellRect(4)[1],
  //   default_grid.getCellRect(4)[2],
  //   default_grid.getCellRect(4)[3]
  // );

  // default_grid.debug();
  // grid2.debug();
}

// 240101 - noise generator!
class NoiseGenerator {
  constructor(gap = 3) {
    // Constructor can be empty if no initial properties are needed
    this.gap = gap;
  }

  // Method to generate noise within a rectangle
  generateRectangularNoise(x, y, w, h) {
    loadPixels();
    for (let px = Math.floor(x); px < x + w; px += this.gap) {
      for (let py = Math.floor(y); py < y + h; py += this.gap) {
        // Ensure the pixel coordinates are within the canvas boundaries
        if (px >= 0 && px < width && py >= 0 && py < height) {
          let index = (px + py * width) * 4;
          let grainValue = random(255);
          pixels[index] = grainValue;
          pixels[index + 1] = grainValue;
          pixels[index + 2] = grainValue;
          pixels[index + 3] = 255;
        }
      }
    }
    updatePixels();
  }

  generateColorNoise(x, y, w, h, red, green, blue, alpha = 255) {
    loadPixels();
    for (let px = Math.floor(x); px < x + w; px += this.gap) {
      for (let py = Math.floor(y); py < y + h; py += this.gap) {
        if (px >= 0 && px < width && py >= 0 && py < height) {
          let index = (px + py * width) * 4;
          pixels[index] = red ? red : random(255); // Red component
          pixels[index + 1] = green ? green : random(255); // Green component
          pixels[index + 2] = blue ? blue : random(255); // Blue component
          pixels[index + 3] = alpha; // Alpha component
        }
      }
    }
    updatePixels();
  }

  // Method to generate noise within a semi-circle
  generateSemiCircleNoise(x, y, radius) {
    let centerX = x + radius;
    let centerY = y + radius;

    loadPixels();
    for (let px = x; px < x + 2 * radius; px += this.gap) {
      for (let py = y; py < y + radius; py += this.gap) {
        if (this.isPointInSemiCircle(px, py, centerX, centerY, radius)) {
          let index = (px + py * width) * 4;
          let grainValue = random(255);
          pixels[index] = grainValue;
          pixels[index + 1] = grainValue;
          pixels[index + 2] = grainValue;
          pixels[index + 3] = 255;
        }
      }
    }
    updatePixels();
  }

  // Method to generate noise within a quadrilateral
  generateQuadNoise(
    x1,
    y1,
    x2,
    y2,
    x3,
    y3,
    x4,
    y4,
    red,
    green,
    blue,
    alpha = 255
  ) {
    loadPixels();
    // Determine the bounding box of the quad
    let minX = Math.min(x1, x2, x3, x4);
    let maxX = Math.max(x1, x2, x3, x4);
    let minY = Math.min(y1, y2, y3, y4);
    let maxY = Math.max(y1, y2, y3, y4);

    for (let px = Math.floor(minX); px <= maxX; px += this.gap) {
      for (let py = Math.floor(minY); py <= maxY; py += this.gap) {
        if (px >= 0 && px < width && py >= 0 && py < height) {
          if (this.isPointInQuad(px, py, x1, y1, x2, y2, x3, y3, x4, y4)) {
            let index = (px + py * width) * 4;
            pixels[index] = red ? red : random(255);
            pixels[index + 1] = green ? green : random(255);
            pixels[index + 2] = blue ? blue : random(255);
            pixels[index + 3] = alpha;
          }
        }
      }
    }
    updatePixels();
  }

  // Helper method to check if a point is within the semi-circle
  isPointInSemiCircle(x, y, cx, cy, radius) {
    return (
      (x - cx) * (x - cx) + (y - cy) * (y - cy) <= radius * radius && y <= cy
    );
  }

  // Helper method to check if a point is inside a quadrilateral
  isPointInQuad(x, y, x1, y1, x2, y2, x3, y3, x4, y4) {
    // Check if point is inside the quad using a ray-casting algorithm or similar
    // This is a simplified version and may need refinement for complex quads
    function sign(p1x, p1y, p2x, p2y, p3x, p3y) {
      return (p1x - p3x) * (p2y - p3y) - (p2x - p3x) * (p1y - p3y);
    }

    let d1 = sign(x, y, x1, y1, x2, y2);
    let d2 = sign(x, y, x2, y2, x3, y3);
    let d3 = sign(x, y, x3, y3, x4, y4);
    let d4 = sign(x, y, x4, y4, x1, y1);

    let hasNeg = d1 < 0 || d2 < 0 || d3 < 0 || d4 < 0;
    let hasPos = d1 > 0 || d2 > 0 || d3 > 0 || d4 > 0;

    return !(hasNeg && hasPos);
  }
}
