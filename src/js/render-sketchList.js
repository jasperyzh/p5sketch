fetch("/sketchList.json")
  .then((response) => response.json())
  .then((data) => {
    const listElement = document.getElementById("sketchList");

    // Assume the latest sketch is the last sketch in the last quarter's list
    // (based on how data is structured and sorted)
    const lastQuarterData = data[data.length - 1];
    const latestSketch =
      lastQuarterData.sketches[lastQuarterData.sketches.length - 1];

    // Create a "Latest Sketch" button
    const latestSketchButton = document.getElementById("latestSketchBtn");
    // latestSketchButton.textContent = "Latest Sketch";
    latestSketchButton.addEventListener("click", () => {
      window.location.href = latestSketch.path; // Navigate to the latest sketch on click
    });

    // Sort quarters in descending order
    data.sort((a, b) => b.quarter.localeCompare(a.quarter));

    // Iterate over each quarter
    data.forEach((quarterData) => {
      // Create a list item for the quarter
      const quarterListItem = document.createElement("li");
      quarterListItem.textContent = quarterData.quarter;
      quarterListItem.classList.add("quarter");

      // Create a sublist for the sketches in this quarter
      const sketchesList = document.createElement("ul");
      quarterData.sketches.forEach((sketch) => {
        const sketchListItem = document.createElement("li");
        sketchListItem.classList.add("sketch");

        const sketchLink = document.createElement("a");
        sketchLink.href = sketch.path;
        sketchLink.textContent = sketch.name;
        sketchListItem.appendChild(sketchLink);
        sketchesList.appendChild(sketchListItem);
      });

      // Append the sublist to the quarter list item
      quarterListItem.appendChild(sketchesList);
      // Append the quarter list item to the main list
      listElement.appendChild(quarterListItem);
    });
  })
  .catch((error) => console.error("Failed to load sketch list", error));

document.addEventListener("DOMContentLoaded", () => {
  const toggleListBtn = document.getElementById("toggleListBtn");
  const sketchList = document.getElementById("sketchList");

  toggleListBtn.addEventListener("click", () => {
    // Toggle the display CSS property between 'block' and 'none'
    if (
      sketchList.style.display === "none" ||
      sketchList.style.display === ""
    ) {
      sketchList.style.display = "block";
    } else {
      sketchList.style.display = "none";
    }
  });
});
