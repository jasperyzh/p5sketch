// ColorSample.js
function setupColorSample() {
  document.addEventListener("DOMContentLoaded", function () {
    document.querySelector("aside#colorHelper").insertAdjacentHTML(
      "beforeend",
      `
        <div class="container--color" style="position: relative">
          <div
            id="copyMessage"
            style="
              display: none;
              position: absolute;
              top: 1rem;
              right: calc(100% + 1rem);
            "
          >
            Text copied to clipboard
          </div>
          <div class="color_sample">
            <svg width="100%" height="48" fill="#131313">
              <rect width="100%" height="100%"></rect>
            </svg>
          </div>
          <div class="color_sample">
            <svg width="100%" height="48" fill="#808185">
              <rect width="100%" height="100%"></rect>
            </svg>
          </div>
          <div class="color_sample">
            <svg width="100%" height="48" fill="#3F3E35">
              <rect width="100%" height="100%"></rect>
            </svg>
          </div>
          <div class="color_sample">
            <svg width="100%" height="48" fill="#E3EDEF">
              <rect width="100%" height="100%"></rect>
            </svg>
          </div>
          <div class="color_sample">
            <svg width="100%" height="48" fill="#D89E5A">
              <rect width="100%" height="100%"></rect>
            </svg>
          </div>
          <div class="color_sample">
            <svg width="100%" height="48" fill="#AEAD9B">
              <rect width="100%" height="100%"></rect>
            </svg>
          </div>
          <div class="color_sample">
            <svg width="100%" height="48" fill="#F7BF03">
              <rect width="100%" height="100%"></rect>
            </svg>
          </div>
          <div class="color_sample">
            <svg width="100%" height="48" fill="#DB382D">
              <rect width="100%" height="100%"></rect>
            </svg>
          </div>
          <div class="color_sample">
            <svg width="100%" height="48" fill="#3C81A7">
              <rect width="100%" height="100%"></rect>
            </svg>
          </div>
          <div class="color_sample">
            <svg width="100%" height="48" fill="#0BD8B6">
              <rect width="100%" height="100%"></rect>
            </svg>
          </div>
          <div class="color_sample">
            <svg width="100%" height="48" fill="#f4f3eb">
              <rect width="100%" height="100%"></rect>
            </svg>
          </div>
        </div>
    `
    );

    const colorSamples = document.querySelectorAll(".color_sample");

    colorSamples.forEach((sample) => {
      const svgElement = sample.querySelector("svg");
      const fillColor = svgElement.getAttribute("fill").replace("#", "");
      const rgbColor = hexToRgb(fillColor);

      // Setup click event on SVG to copy hex color
      svgElement.addEventListener("click", () =>
        copyToClipboard(`#${fillColor}`)
      );

      // Create and append button for RGB color
      sample.appendChild(
        createButton(
          `${rgbColor.r}, ${rgbColor.g}, ${rgbColor.b}`,
          `${rgbColor.r}, ${rgbColor.g}, ${rgbColor.b}`
        )
      );
    });

    setupCopyToClipboard();
  });

  function createButton(text, colorCode) {
    const button = document.createElement("button");
    button.className = "copy_color";
    button.dataset.colorcode = colorCode;
    button.textContent = text;
    return button;
  }

  function setupCopyToClipboard() {
    document.querySelectorAll(".copy_color").forEach((btn) => {
      btn.addEventListener("click", function () {
        copyToClipboard(this.dataset.colorcode);
      });
    });
  }

  function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(
      () => {
        showMessage(`Copied: ${text}`);
        console.log(`Copied: ${text}`);
      },
      (err) => {
        console.error("Could not copy text: ", err);
      }
    );
  }

  function showMessage(message) {
    console.log("test", message);
    const messageDiv = document.getElementById("copyMessage");
    messageDiv.textContent = message;
    messageDiv.style.display = "inline-block";

    // Hide the message after 2 seconds
    setTimeout(() => {
      messageDiv.style.display = "none";
    }, 4000);
  }
}

function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

setupColorSample();

document.addEventListener("DOMContentLoaded", () => {
  const toggleColorBtn = document.getElementById("toggleColorBtn");
  const colorHelper = document.getElementById("colorHelper");

  colorHelper.style.display = "none";

  toggleColorBtn.addEventListener("click", () => {
    // Toggle the display CSS property between 'block' and 'none'
    if (
      colorHelper.style.display === "none" ||
      colorHelper.style.display === ""
    ) {
      colorHelper.style.display = "block";
    } else {
      colorHelper.style.display = "none";
    }
  });
});
