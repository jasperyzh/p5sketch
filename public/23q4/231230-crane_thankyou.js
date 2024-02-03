let grid_crane_thankyou;
let imgCrane;
let imgThank;

function preload_crane_thankyou() {
  imgCrane = loadImage("images/231230-bg-crane.jpg"); // Make sure to provide the correct path to your image
  imgThank = loadImage("images/231230-thankyou.jpg"); // Make sure to provide the correct path to your image
}
function setup_crane_thankyou() {

  // grid_crane_thankyou = new SquareGrid(0, 0, width / GR / GR / GR);

  let scaleFactor = 1.05; // Adjust as needed, should be >1
  imgCrane.resize(width * scaleFactor, height * scaleFactor);
  imgThank.resize(width * scaleFactor, height * scaleFactor);
}

function draw_crane_thankyou() {
  // Determine the wave properties
  const waveHeight = 5; // Maximum height of the wave
  const frequency = 0.08; // Frequency of the wave
  const maxDisplacement = waveHeight / 2; // Maximum displacement to the left

  // Calculate the initial offset to center the image
  let offsetX = (imgCrane.width - width) / 2;

  // Draw each horizontal slice of the image with an offset based on the sine function
  for (let y = 0; y < height; y++) {
    // Calculate the sine offset for the current slice
    let sineValue =
      sin(frameCount * frequency + y * 0.1) * waveHeight - maxDisplacement;

    // Copy a single-pixel-tall slice of the image
    let imgSlice = imgCrane.get(offsetX + sineValue, y, width, 1); // Adjust source Y to match destination

    // Draw the image slice at the offset position
    image(imgSlice, 0, y); // Draw at 0 to start from the left edge of the canvas
  }

  let startX = grid_crane_thankyou.getCellRect(4)[0]; // Starting X position
  let startY = grid_crane_thankyou.getCellRect(4)[1]; // Starting Y position
  let areaWidth = grid_crane_thankyou.getCellRect(4)[2]; // Width of the tiled area
  let areaHeight = grid_crane_thankyou.getCellRect(4)[3]; // Height of the tiled area

  noStroke();
  fill(255);
  rect(startX, startY, areaWidth, areaHeight);

  image(imgThank, startX, startY, areaWidth, areaHeight);
}
