/*
function getRandomColor() {
function getNextColor() {
function getColorByIndex(index) 
*/

// Define your color palette
const colorPalette = [
  [239, 244, 195],
  [47, 181, 212],
  [18, 68, 191],
  [205, 21, 58],
  [247, 169, 18],
  [15, 64, 124],
  [106, 21, 55],
  [225, 166, 111],
  [80, 166, 127],
  [4, 4, 43],
  [196, 136, 187],
  [16, 89, 91],
  [8, 19, 86],
  [54, 15, 34],
  [194, 67, 186],
  [77, 148, 91],
  [6, 6, 62],
  [14, 5, 7],
  [14, 42, 53],
  [32, 7, 36],
];

let currentIndex = 0;

// Function to get a random color
function getRandomColor() {
  let randomIndex = Math.floor(Math.random() * colorPalette.length);
  return colorPalette[randomIndex];
}

// Function to get the next color in sequence
function getNextColor() {
  let color = colorPalette[currentIndex];
  currentIndex = (currentIndex + 1) % colorPalette.length;
  return color;
}

// Function to get a specific color by index
function getColorByIndex(index) {
  if (index >= 0 && index < colorPalette.length) {
    return colorPalette[index];
  } else {
    console.error("Index out of range");
    return null;
  }
}
