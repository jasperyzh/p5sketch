// import modules for file system and path operations
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

// Convert the import.meta.url to a file path for __dirname equivalent in ES modules
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const baseDir = path.join(__dirname, "public", "");

// Function to list items within a directory
async function listDirectoryContents(dirPath) {
  try {
    const items = await fs.readdir(dirPath);
    return items; // Returns a list of items (files/subdirectories) in the directory
  } catch (error) {
    console.error(`Error listing contents of directory: ${dirPath}`, error);
    return []; // Return an empty array in case of an error
  }
}

// Function to generate the navigation list and write it to a JSON file
async function generateNavigationList() {
  try {
    const quarters = await fs.readdir(baseDir);
    const dirs = quarters.filter((dir) => /^\d{2}q[1-4]$/.test(dir)).sort();
    const navigationList = [];

    for (const dir of dirs) {
      const dirPath = path.join(baseDir, dir);
      const items = await listDirectoryContents(dirPath);
      const itemList = items.map((item) => {
        // Remove the .js extension and prepend with 'sketches-' to the quarter
        const itemName = item.replace(".js", "");
        const newPath = `/sketches-${dir}/${itemName}`;

        return {
          name: itemName,
          path: newPath,
        };
      });

      navigationList.push({
        quarter: dir,
        sketches: itemList,
      });
    }

    // Assuming navigationList is already sorted, and each quarter's sketches are sorted:
    const lastQuarter = navigationList[navigationList.length - 1];
    const latestSketch =
      lastQuarter.sketches[lastQuarter.sketches.length - 1].path;

    // Output the path for use in the next step
    console.log(latestSketch); // Make sure this is the last line of your script or the last console.log

    // Continue to write the JSON as before

    // Specify the output file path
    const outputPath = path.join(__dirname, "public", "sketchList.json");
    await fs.writeFile(outputPath, JSON.stringify(navigationList, null, 2));
    console.log(
      "Navigation list generated successfully:",
      JSON.stringify(navigationList, null, 2)
    );
  } catch (error) {
    console.error("Error generating navigation list:", error);
  }
}

generateNavigationList();
