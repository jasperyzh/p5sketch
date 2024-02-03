let osc; // Oscillator for the beep sound
let envelope; // Envelope for controlling the sound's ADSR
let beepDuration = 0.1; // Duration of each beep in seconds
let beepInterval = 600; // Interval between beeps in milliseconds for 100 BPM
let nextBeepTime = 0; // When the next beep should occur
let beepCounter = 0; // Counter for the number of beeps

// In your setup function or globally
let isAudioStarted = false;

function playBeep() {
  if (!isAudioStarted) return;
  beepCounter++;
  let frequency = 440; // Standard A note

  // Check if it's the 8th note for octave jump and ADSR change
  if (beepCounter % 8 === 0) {
    frequency *= 2; // Double the frequency for one octave higher

    // Set a different ADSR envelope for the 8th note
    envelope.setADSR(0.01, 0.1, 0.6, 0.4); // Longer sustain and release for the 8th note
  } else {
    // Reset to the standard envelope for other notes
    envelope.setADSR(0.01, 0.1, 0.3, 0.1);
  }

  osc.freq(frequency); // Set the frequency
  envelope.play(osc, 0, beepDuration); // Play the envelope
}

function setup_beep_beep_tock() {
  // noLoop();

  document
    .getElementById("canvas")
    .insertAdjacentHTML(
      "afterend",
      `<button id="startButton">Start Audio</button>`
    );

  // Bind the button click to start the audio and sketch
  document.getElementById("startButton").addEventListener("click", function () {
    if (!isAudioStarted) {
      userStartAudio();
      osc.start();
      isAudioStarted = true;
    }
  });

  pixelDensity(1); // Ensures compatibility with different screen densities
  noStroke();
  // rectMode(CENTER);

  osc = new p5.Oscillator("sine"); // Create a sine wave oscillator
  envelope = new p5.Envelope();

  // Standard ADSR envelope
  envelope.setADSR(0.01, 0.1, 0.3, 0.1); // Attack, Decay, Sustain, Release
  envelope.setRange(0.5, 0); // Amplitude from 0.5 to 0

  osc.start();
  osc.amp(0); // Set the amplitude to 0 to start
}

function draw_beep_beep_tock() {
  background(0);
  // Define the semi-ellipse properties
  let centerX = width / 2;
  let centerY = height / 2;
  let ellipseWidth = width * 0.8;
  let ellipseHeight = height * 0.8;

  // Draw a semi-ellipse
  fill(0); // Fill with black color
  // arc(centerX, centerY, ellipseWidth, ellipseHeight, PI, TWO_PI, CHORD);
  rect(
    centerX - ellipseHeight / 2,
    centerY - ellipseHeight / 2,
    ellipseWidth,
    ellipseHeight / 2
  );

  // Load pixels to manipulate the texture
  loadPixels();

  // Iterate over the pixels to create grainy noise within the semi-ellipse bounds
  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      // Check if the point is within the semi-ellipse
      if (
        isPointInSemiEllipse(
          x,
          y,
          centerX,
          centerY,
          ellipseWidth / 2,
          ellipseHeight / 2
        )
      ) {
        // Index of the pixel in the pixel array
        let index = (x + y * width) * 4;
        let grainValue = random(80); // Generate a random grayscale value

        // Set the pixel to the random grayscale value
        pixels[index] = grainValue; // Red channel
        pixels[index + 1] = grainValue; // Green channel
        pixels[index + 2] = grainValue; // Blue channel
        pixels[index + 3] = 255; // Alpha channel
      }
    }
  }

  // Update the canvas with the new pixel values
  updatePixels();

  // Create a grid of GrainySemiEllipse objects
  let numCols = 1; // Define the number of columns
  let numRows = 1; // Define the number of rows
  let cellWidth = width / numCols;
  let cellHeight = height / numRows;

  let getMillis = millis();
  // Check if it's time for the next beep
  if (getMillis >= nextBeepTime) {
    playBeep();
    nextBeepTime = getMillis + beepInterval; // Schedule the next beep

    // noise!
    background(255); // White background
    for (let i = 0; i < numCols; i++) {
      for (let j = 0; j < numRows; j++) {
        // Create an instance of the GrainySemiEllipse class
        let semiEllipse = new GrainySemiEllipse(
          i * cellWidth,
          j * cellHeight,
          cellWidth,
          cellHeight
        );
        semiEllipse.display(); // Display the grainy semi-ellipse
      }
    }
  }
}
// Helper function to check if a point is within the semi-ellipse
function isPointInSemiEllipse(x, y, cx, cy, w, h) {
  // Normalize the coordinates
  let nx = (x - cx) / w;
  let ny = (y - cy) / h;
  // Semi-ellipse equation: x^2/a^2 + y^2/b^2 = 1 (top half only)
  return nx * nx + ny * ny <= 1 && y <= cy;
}

// Define a class for the semi-ellipse with grainy noise
class GrainySemiEllipse {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }

  display() {
    // Calculate the center based on position and size
    let centerX = this.x + this.w / 2;
    let centerY = this.y + this.h / 2;

    // Draw a semi-ellipse
    fill(0); // Fill with black color
    // arc(centerX, centerY, this.w, this.h, PI, TWO_PI, CHORD);
    rectMode(CENTER);
    rect(centerX, centerY, this.w, this.h);

    // Load pixels to manipulate the texture
    loadPixels();
    // Iterate over the pixels to create grainy noise within the semi-ellipse bounds
    for (let x = this.x; x < this.x + this.w; x++) {
      for (let y = this.y; y < this.y + this.h / 2; y++) {
        if (
          this.isPointInSemiEllipse(
            x,
            y,
            centerX,
            centerY,
            this.w / 2,
            this.h / 2
          )
        ) {
          let index = (x + y * width) * 4;
          let grainValue = random(255); // Generate a random grayscale value
          // Set the pixel to the random grayscale value
          pixels[index] = grainValue;
          pixels[index + 1] = grainValue;
          pixels[index + 2] = grainValue;
          pixels[index + 3] = 108;
        }
      }
    }

    // Update the canvas with the new pixel values
    updatePixels();
  }

  // Helper method to check if a point is within the semi-ellipse
  isPointInSemiEllipse(x, y, cx, cy, w, h) {
    let nx = (x - cx) / w;
    let ny = (y - cy) / h;
    return nx * nx + ny * ny <= 1 && y <= cy;
  }
}
