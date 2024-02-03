class Controller {
  constructor() {
    this.overlayLeft = false;
    this.overlayRight = false;
    this.enableButtonAB = true;
    this.enableButtonG = true;
  }

  draw() {
    if (this.enableButtonAB) {
      push();
      this.drawCanvasButtonAB();
      pop();
    }
  }

  keyPressed() {
    if (this.enableButtonAB) {
      if (key === "A" || key === "a") {
        this.overlayLeft = !this.overlayLeft;
      }
      if (key === "B" || key === "b") {
        this.overlayRight = !this.overlayRight;
      }
    }
    if (this.enableButtonG && key === "G") {
      this.recordGif();
    }

    // Additional keys can be handled here
    // For example, handling arrow keys:
    // if (key === "ArrowLeft") { ... }
    // if (key === "ArrowRight") { ... }
  }

  keyReleased() {
    if (this.enableButtonAB) {
      if (key === "A" || key === "a") {
        this.overlayLeft = false;
      }
      if (key === "B" || key === "b") {
        this.overlayRight = false;
      }
    }
    // Handle release of additional keys here
  }

  drawCanvasButtonAB() {
    if (this.overlayLeft) {
      noStroke();
      fill(255, 0, 0, 100);
      rect(0, 0, width / 2, height);
    }
    if (this.overlayRight) {
      noStroke();
      fill(0, 0, 255, 100);
      rect(width / 2, 0, width / 2, height);
    }
  }

  recordGif() {
    // Logic to record GIF
  }
}

/* 
function draw_controller() {
    if (ENABLE_BUTTONAB) {
      push();
      draw_canvas_buttonab();
      pop();
    }
  }
  var ENABLE_BUTTONAB = true;
  var ENABLE_BUTTONG = true;
  let overlayLeft = false; // To toggle left overlay
  let overlayRight = false; // To toggle right overlay
  function draw_canvas_buttonab() {
    // Draw left overlay if 'A' key is held
    if (overlayLeft) {
      noStroke();
      fill(255, 0, 0, 100); // Semi-transparent red
      rect(0, 0, width / 2, height); // Left half
    }
  
    // Draw right overlay if 'B' key is held
    if (overlayRight) {
      noStroke();
      fill(0, 0, 255, 100); // Semi-transparent blue
      rect(width / 2, 0, width / 2, height); // Right half
    }
  }
  function keyPressed_canvas() {
    if (ENABLE_BUTTONAB) {
      if (key === "A" || key === "a") {
        overlayLeft = !overlayLeft; // Toggle left overlay
      }
      if (key === "B" || key === "b") {
        overlayRight = !overlayRight; // Toggle right overlay
      }
    }
  
    if (ENABLE_BUTTONG && key === "G") record_gif();
  }
  function keyReleased_canvas() {
    if (ENABLE_BUTTONAB) {
      if (key === "A" || key === "a") {
        overlayLeft = false; // Deactivate left overlay
      }
      if (key === "B" || key === "b") {
        overlayRight = false; // Deactivate right overlay
      }
    }
  } */

/* let myController;

function setup() {
createCanvas(800, 600);
myController = new Controller();
}

function draw() {
background(220);
myController.draw();
}

function keyPressed() {
myController.keyPressed();
}

function keyReleased() {
myController.keyReleased();
}

extend...
function setup() {
  createCanvas(800, 600);
  myController = new Controller();

  // Add a new method dynamically
  myController.takeScreenshot = function() {
    saveCanvas('screenshot', 'png');
  };
}

// Modify keyPressed to call the new method
function keyPressed() {
  myController.keyPressed();
  if (key === "G" || key === "g") {
    myController.takeScreenshot();
  }
}

// ... rest of your code ...

*/