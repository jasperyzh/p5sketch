// Function to dynamically load a JavaScript file
function loadScript(src, callback) {
  var script = document.createElement("script");
  script.type = "text/javascript";
  script.src = src;
  script.onload = callback;
  document.head.appendChild(script);
}

// Determine the folder based on the URL or a naming convention
function getSketchFolder(quarter) {
  switch (quarter) {
    case "sketches-22q3":
      return "22q3";
    case "sketches-24q1":
      return "24q1";
    case "sketches-24q2":
      return "24q2";
    case "sketches-24q3":
      return "24q3";
    case "sketches-24q4":
      return "24q4";
    default:
      return "sketches"; // Default folder if no specific quarter is found
  }
}

const paths = window.location.pathname.split("/");
// Assuming URL pattern is /sketch/quarter/sketchName
// Adjust the indices if your actual URL structure is different
const quarter = paths[1];
const sketchName = paths[2];

console.log(`quarter: ${quarter}`, `sketchName: ${sketchName}`);

if (!sketchName) {
  // Load a default sketch if we're at the homepage or no specific sketch is defined
  loadScript(`/default_sketch.js`, function () {
    console.log(`default_sketch.js loaded successfully.`);
  });
} else {
  // Construct the path from the determined folder and sketch name
  const folder = getSketchFolder(quarter);
  loadScript(`/${folder}/${sketchName}.js`, function () {
    console.log(`${sketchName}.js from ${folder} loaded successfully.`);
  });
}
