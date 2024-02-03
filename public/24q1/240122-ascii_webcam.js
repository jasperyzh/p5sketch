const note = {
  title: "ASCII Video",
  slug: "ascii-video",
  date_created: "220409",
  desc: "<li>1. each pixel in image is a value of RGB's 0-255</li><li>2. take those value to average it to find it brightness</li><li>3. write a algorithm to walkthrough for every single pixels </li><li>4. replace each pixel with text</li><li>5. text go from darkest/dense to bright/light</li><li>6. grab video as input, replace it with text</li>",
  sources: [
    "[ASCII Video (Coding Challenge 166)](https://www.youtube.com/watch?v=55iwMYv8tGI)",
    "[more on pixelArray](https://www.youtube.com/watch?v=nMUMZ5YRxHI)",
    "[more on ASCII](https://play.ertdfgcvb.xyz/#/src/demos/hotlink)",
  ],
};

const density = "Ñ@#W$9876543210?!abc;:+=-,._         ";

// let img;
let video;
let asciiDiv;

// preload = () => {
//   img = loadImage(Logo, 50, 50);
// };

function setup() {
  // const canvas = createCanvas(640, 480);
  // canvas.parent(this.$options.name);

  noCanvas();

  video = createCapture(VIDEO);
  video.size(48, 48);
  asciiDiv = createDiv();
  asciiDiv.class("test");
  console.log(asciiDiv);

  asciiDiv.elt.style.backgroundColor = "#fff";
  asciiDiv.elt.style.fontFamily = `"Courier", monospace`;
  asciiDiv.elt.style.fontSize = "1.2rem";
  asciiDiv.elt.style.lineHeight = "0.6";
  asciiDiv.elt.style.whiteSpace = "pre";

  // background(0);
  // noLoop();
}

function draw() {
  // image(img, 20, 40);

  // let w = width / img.width;
  // let h = height / img.height;

  // img.loadPixels();
  video.loadPixels();
  let asciiImage = "";

  for (let j = 0; j < video.height; j++) {
    // let row = "";
    for (let i = 0; i < video.width; i++) {
      const pixelIndex = (i + j * video.width) * 4;
      const r = video.pixels[pixelIndex + 0];
      const g = video.pixels[pixelIndex + 1];
      const b = video.pixels[pixelIndex + 2];
      const avg = (r + g + b) / 3;
      const len = density.length;
      const charIndex = floor(map(avg, 0, 255, 0, len));

      const c = density.charAt(charIndex);
      if (c == " ") asciiImage += "&nbsp;";
      else asciiImage += c;

      // square(i * w, j * h, w);
      // textSize(w);
      // textAlign(CENTER, CENTER);
      // text(density.charAt(charIndex), i * w + w * 0.5, j * h + h * 0.5);
    }
    // let div_row = createElement('pre', [row]);
    // let div_row = createDiv(row);
    // div_row.class("test");
    // console.log(row)
    asciiImage += "<br />";
  }
  asciiDiv.html(asciiImage);
  // img.resize(640, 480);

  // drawMosaic(1, color(240, 240, 240));
}
