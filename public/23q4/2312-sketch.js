/* 
function draw_mousetrail()
function setup_ellipse_innershadow()
function draw_ellipse_innershadow()
function draw_trigonometry()
function setup_wavingtext()
function draw_wavingtext()
function draw_dashline()
function drawDashedRect(x, y, w, h, pattern)
function drawDashedLine(x1, y1, x2, y2, pattern)

function setup_designsys() {
function draw_designsys() {
function drawCircle(x, y, w, h) {
function drawRect(x, y, w, h) {
function drawTriangle(x, y, w, h) {
function drawModule(x, y, w, h) {
*/


// mousetrail
let trail = [];
let maxTrail = 50; // Maximum number of trail elements
let colorsPattern = ["#FF5733", "#F86242", "#D83F1E"]; // Array of color hex values
let lastMouseX, lastMouseY;
function draw_mousetrail() {
    // mousetrail
    push();
    textSize(72);
    noStroke();
    colorMode(HSB, 255); // Use HSB color mode for easier saturation manipulation

    // Check if the mouse has moved
    if (mouseX !== lastMouseX || mouseY !== lastMouseY) {
        // Update and draw trail
        let initialColor = color(random(colorsPattern));
        let lowSaturationColor = color(hue(initialColor), 50, brightness(initialColor), 255); // Start with low saturation
        trail.push({
            x: mouseX,
            y: mouseY,
            alpha: 255,
            color: lowSaturationColor
        });

        lastMouseX = mouseX;
        lastMouseY = mouseY;
    }

    if (trail.length > maxTrail) {
        trail.shift();
    }

    for (let i = 0; i < trail.length; i++) {
        let trailElement = trail[i];
        let col;

        // Keep the last element white and fully visible
        if (i === trail.length - 1) {
            col = color(0, 0, 255, 255); // White in HSB
        } else {
            // Invert saturation: increase as alpha decreases
            let invertedSat = map(trailElement.alpha, 0, 255, 255, 50);
            col = color(hue(trailElement.color), invertedSat, 255, trailElement.alpha);
            trailElement.alpha -= 255 / maxTrail; // Gradually fade out alpha
        }

        fill(col);
        text('p5.js', trailElement.x, trailElement.y);
    }
    pop();
}

// ellipse inner shadow
let ellipses = []; // Declare the ellipses array
function setup_ellipse_innershadow() {
    // Create ellipses in a grid
    let cols = 8;
    let rows = 8;
    let spacing = width / cols;
    for (let x = 0; x < cols; x++) {
        for (let y = 0; y < rows; y++) {
            let ellipseX = x * spacing + spacing / 2;
            let ellipseY = y * spacing + spacing / 2;
            ellipses.push(new EllipseInnerShadow(ellipseX, ellipseY, 50, 8));
        }
    }
}
function draw_ellipse_innershadow() {
    noStroke();
    for (let ellipse of ellipses) {
        ellipse.draw();
    }
}
class EllipseInnerShadow {
    constructor(x, y, baseSize, shadowMax) {
        this.ellipsePos = createVector(x, y);
        this.baseEllipseSize = baseSize;
        this.shadowMax = shadowMax;
        this.ellipseColor = color(0, 0, 0);
        this.shadowColor = color(100, 200, 255, 50);
    }
    draw() {
        let lightDir = createVector(mouseX, mouseY)
            .sub(this.ellipsePos)
            .normalize();
        fill(this.ellipseColor);
        ellipse(
            this.ellipsePos.x,
            this.ellipsePos.y,
            this.baseEllipseSize,
            this.baseEllipseSize
        );

        for (let i = 0; i < this.shadowMax; i++) {
            fill(this.shadowColor);
            let lerpFactor = 0.15;
            let offsetAmount = lerp(0, 1, lerpFactor) * i;
            let offset = p5.Vector.mult(lightDir, offsetAmount);
            let ellipseSize = lerp(
                this.baseEllipseSize,
                this.baseEllipseSize * pow(0.91, i),
                lerpFactor
            );
            this.shadowColor.setAlpha(50 - i * 0.2 * (50 / this.shadowMax));
            ellipse(
                this.ellipsePos.x + offset.x,
                this.ellipsePos.y + offset.y,
                ellipseSize,
                ellipseSize
            );
        }
    }
}

// trigonometry
function draw_trigonometry() {
    strokeWeight(2);
    let x = width / 2 + cos(frameCount * 0.03) * 200;
    let y = height / 2 + sin(frameCount * 0.03) * 200;
    fill(100, 100, 240);

    // ellipse(x, y, 50, 50);
    ellipse(width / 2, y, 10, 10);
    draw_label(width / 2 + 10, y, "sin");

    ellipse(x, height / 2, 10, 10);
    draw_label(x + 10, height / 2, "cos");

    // Center of the circle
    let centerX = width / 2;
    let centerY = height / 2;

    // Circle coordinates
    // let x = centerX + cos(frameCount * 0.01) * 100;
    // let y = centerY + sin(frameCount * 0.01) * 100;

    // Draw the triangle
    stroke(0);
    fill(255, 255, 255, 0); // Transparent fill
    triangle(centerX, centerY, x, centerY, x, y);

    // Labeling the sides
    draw_label(centerX + (x - centerX) / 2, centerY + 20, "Adjacent");
    draw_label(x + 20, y - (y - centerY) / 2, "Opposite");
    draw_label((centerX + x) / 2 - 20, (centerY + y) / 2 - 20, "Hypotenuse");

    // Draw the circle
    fill(100, 100, 240);
    ellipse(x, y, 50, 50);

    // Drawing lines with tangent distortion
    for (let x = 0; x < width; x += 13) {
        let angle = (frameCount + x) * 0.01;
        let tanValue = tan(angle) * map(50, 0, width, 0, 100); // Scaling the tan value for visible effect

        // Preventing extreme values
        tanValue = constrain(tanValue, -height / 3, height / 3);

        stroke(0);
        line(x, centerY - tanValue, x, centerY + tanValue);
        if (x % 3 == 0) {
            draw_label(x, centerY + tanValue - 5, "tan");
        }
    }
}

// waving text
var amplitudeSlider, speedSlider;
function setup_wavingtext() {
    // Sliders for user interaction
    amplitudeSlider = createSlider(0, 50, 25);
    amplitudeSlider.position(10, height + 10);
    speedSlider = createSlider(0.01, 0.1, 0.05, 0.01);
    speedSlider.position(10, height + 40);
}
function draw_wavingtext() {
    fill(100, 100, 240);
    // fill(255);
    var amplitude = amplitudeSlider.value();
    var speed = speedSlider.value();
    var num = 13;
    var xOffset = width / num;
    var yOffset = height / num;

    // Text to cycle through
    var cycleText = "FACK";
    var textLength = cycleText.length;

    // Slowing down the cycling rate
    var frameFactor = 30; // Increase this number to slow down the cycling

    // Creating a grid of letters
    for (let x = 1; x < num; x++) {
        for (let y = 1; y < num; y++) {
            var wave = sin(frameCount * speed + x * 0.15) * amplitude;
            // var wave = 0;

            // Calculate index for the letter in the string
            var index = (x + y + Math.floor(frameCount / frameFactor)) % textLength;
            var letter = cycleText.charAt(index);

            text(letter, xOffset * x, yOffset * y + wave);
        }
    }
}


// draw dashlines
let randoColor = getRandomColor();
let randoColor2 = getRandomColor();
function draw_dashline() {
    background(255);
    strokeCap(SQUARE);
    strokeWeight(62.0);

    push();
    let y = 115;
    stroke(`rgba(${randoColor},0.8)`);
    drawDashedLine(0, y, width, y, []); // Solid line (empty pattern)
    y += 80;
    drawDashedLine(0, y, width, y, [14, 30]); // Dotted line
    y += 80;
    drawDashedLine(0, y, width, y, [10, 10 * 12]); // Short dashed line
    y += 80;
    drawDashedLine(0, y, width, y, [20, 20]); // Long dashed line
    pop();

    push();
    stroke(`rgba(${randoColor2},0.5)`);
    for (let j = 0; j < 30; j++) {
        strokeWeight(62.0 * j * 0.01);
        let pattern = [50, 15 * j * 0.95, 13, 35 * j * 1.03]; // Define the pattern array
        drawDashedRect(
            width / 6,
            height / 6,
            (width / 6) * 4,
            (height / 6) * 4,
            pattern
        ); // Pass the pattern to the function
    }
    pop();
}
function drawDashedRect(x, y, w, h, pattern) {
    // Drawing each side of the rectangle with dashed pattern
    drawDashedLine(x, y, x + w, y, pattern); // Top side
    drawDashedLine(x + w, y, x + w, y + h, pattern); // Right side
    drawDashedLine(x + w, y + h, x, y + h, pattern); // Bottom side
    drawDashedLine(x, y + h, x, y, pattern); // Left side
}
function drawDashedLine(x1, y1, x2, y2, pattern) {
    let px = x1;
    let py = y1;
    let dx = x2 - x1;
    let dy = y2 - y1;
    let distance = dist(x1, y1, x2, y2);
    let patternIndex = 0;
    let draw = true;

    while (dist(x1, y1, px, py) < distance) {
        // Calculate the length of the dash or gap
        let dashLength = pattern[patternIndex % pattern.length];
        let dashRemaining = distance - dist(x1, y1, px, py);
        dashLength = min(dashLength, dashRemaining);

        let nx = px + (dx / distance) * dashLength;
        let ny = py + (dy / distance) * dashLength;

        if (draw) {
            line(px, py, nx, ny);
        }

        px = nx;
        py = ny;
        draw = !draw;
        patternIndex++;
    }
}

// designsys
let shapes = [drawCircle, drawRect, drawTriangle];
let palette = ["#e63946", "#f1faee", "#a8dadc", "#457b9d", "#1d3557"];
function setup_designsys() {
    noLoop();
    rectMode(CENTER);
}

function draw_designsys() {
    background("#f1faee");
    let cols = 6;
    let rows = 6;
    let gridW = width / cols;
    let gridH = height / rows;

    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            let x = i * gridW + gridW / 2;
            let y = j * gridH + gridH / 2;
            let shape = random(shapes);
            if (random(1) < 0.88) {
                drawModule(x, y, gridW, gridH);
            }
            if (random(1) < 0.88) {
                shape(x, y, gridW, gridH);
            }
            if (random(1) < 0.33) {
                drawHalftoneCircle(x, y, gridW * 0.53);
            }
        }
    }
}
function drawCircle(x, y, w, h) {
    let d = min(w, h) * 0.5 * random(0.5, 1);
    fill(random(palette));
    noStroke();
    ellipse(x, y, d, d);
}
function drawRect(x, y, w, h) {
    fill(random(palette));
    noStroke();
    push();
    translate(x, y);
    rotate(random(TWO_PI));
    rect(0, 0, w * random(0.3, 0.7), h * random(0.3, 0.7));
    pop();
}
function drawTriangle(x, y, w, h) {
    fill(random(palette));
    noStroke();
    triangle(
        x + random(-w / 4, w / 4),
        y - h / 4,
        x + w / 4,
        y + h / 4,
        x - w / 4,
        y + h / 4
    );
}
function drawModule(x, y, w, h) {
    // Background rectangle
    fill(random(palette));
    noStroke();
    rect(x, y, w * 0.8, h * 0.8);

    // Overlapping circles with halftone effect
    drawHalftoneCircle(x, y, w * 0.3);

    // Smaller shapes and lines
    strokeWeight(4);
    stroke(0);
    line(x - w * 0.2, y - h * 0.2, x + w * 0.2, y + h * 0.2);
    noStroke();
    fill(0);
    ellipse(x + w * 0.25, y - h * 0.25, w * 0.1);
}

function drawHalftoneCircle(x, y, d) {
    let radius = d / 2;
    let dotSize = radius / 8;

    for (let r = 0; r < radius; r += dotSize) {
        let circumference = TWO_PI * r;
        let dots = circumference / dotSize;
        for (let i = 0; i < dots; i++) {
            let angle = (TWO_PI / dots) * i;
            let sx = x + cos(angle) * r;
            let sy = y + sin(angle) * r;
            fill(0);
            ellipse(sx, sy, dotSize * noise(r, angle), dotSize * noise(r, angle));
        }
    }
}