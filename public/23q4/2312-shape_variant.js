function setup_shape_variant(){
  // ?not in use
  // let points = [
  //   createVector(200, 100),
  //   createVector(100, 500),
  //   createVector(500, 500),
  // ];
  // subdivideTriangle(points, 4); // Change the second parameter to control the depth of subdivisions
}

function draw_shape_variant() {
  // Define the number of rows and columns
  let cols = 6;
  let rows = 6;

  // Define the spacing and the size of the shapes
  let spacingX = width / (cols + 1);
  let spacingY = height / (rows + 1);
  let baseSize = min(spacingX, spacingY) * 0.65; // Adjust size as needed

  // Nested loops to create a grid with varied shapes
  for (let row = 0; row < rows; row++) {
    let yOffset = (row + 1) * spacingY;
    for (let col = 0; col < cols; col++) {
      let xOffset = (col + 1) * spacingX;
      let complexity = (col % 4) + 1; // Adjust for more complexity
      let size = baseSize - row * 5; // Adjust to scale shapes within each row

      // Draw the shape at the calculated position
      push();
      translate(xOffset, yOffset);
      // drawComplexShape(complexity, size);
      // stroke(255, 0, 0);
      drawSubdividedShape(complexity, size);

      pop();
    }
  }
}

function drawSubdividedShape(complexity, size) {
  // Draw a shape and subdivide its edges
  let sides = complexity + 2; // Sides based on complexity
  let angle = TWO_PI / sides;
  let points = [];

  // Calculate the vertices of the shape
  for (let i = 0; i < sides; i++) {
    points.push(createVector(cos(angle * i) * size, sin(angle * i) * size));
  }

  // Draw the shape
  beginShape();
  for (let i = 0; i < points.length; i++) {
    vertex(points[i].x, points[i].y);
  }
  endShape(CLOSE);

  // Subdivide each side and draw internal lines
  for (let i = 0; i < points.length; i++) {
    let nextPoint = points[(i + 1) % points.length];
    let midPoint = p5.Vector.lerp(points[i], nextPoint, 0.5);

    // Draw the subdivision point
    ellipse(midPoint.x, midPoint.y, 2, 2); // Small ellipse at the midpoint

    // Draw lines from the midpoint to all other points
    for (let j = 0; j < points.length; j++) {
      if (j !== i && j !== (i + 1) % points.length) {
        line(midPoint.x, midPoint.y, points[j].x, points[j].y);
      }
    }
  }
}

function drawComplexShape(complexity, size) {
  // Adjust the complexity based on the column
  switch (complexity) {
    case 1:
      drawPolygon(3, size); // Triangles
      break;
    case 2:
      drawStar(size, size / 2, 4); // Simple stars
      break;
    case 3:
      drawPolygon(6, size); // Hexagons
      break;
    case 4:
      drawComplexStar(size, size / 2.5, 10); // More complex stars
      break;
  }
}

function drawPolygon(sides, radius) {
  beginShape();
  for (let i = 0; i < sides; i++) {
    let angle = (TWO_PI / sides) * i;
    let x = cos(angle) * radius;
    let y = sin(angle) * radius;
    vertex(x, y);
  }
  endShape(CLOSE);
}

function drawStar(outerRadius, innerRadius, points) {
  let angle = TWO_PI / points;
  let halfAngle = angle / 2.0;
  beginShape();
  for (let a = 0; a < TWO_PI; a += angle) {
    let sx = cos(a) * outerRadius;
    let sy = sin(a) * outerRadius;
    vertex(sx, sy);
    sx = cos(a + halfAngle) * innerRadius;
    sy = sin(a + halfAngle) * innerRadius;
    vertex(sx, sy);
  }
  endShape(CLOSE);
}

function drawComplexStar(outerRadius, innerRadius, points) {
  // Create a star with a variable number of points and two radii
  let angle = TWO_PI / points;
  let halfAngle = angle / 2.0;

  beginShape();
  for (let a = 0; a < TWO_PI; a += angle) {
    let sx = cos(a) * outerRadius;
    let sy = sin(a) * outerRadius;
    vertex(sx, sy);
    sx = cos(a + halfAngle) * innerRadius;
    sy = sin(a + halfAngle) * innerRadius;
    vertex(sx, sy);
  }
  endShape(CLOSE);
}

function subdivideTriangle(points, depth) {
  if (depth == 0) {
    // Base case: draw the triangle
    triangle(
      points[0].x,
      points[0].y,
      points[1].x,
      points[1].y,
      points[2].x,
      points[2].y
    );
  } else {
    // Calculate midpoints of each side
    let mid1 = p5.Vector.lerp(points[0], points[1], 0.55);
    let mid2 = p5.Vector.lerp(points[1], points[2], 0.48);
    let mid3 = p5.Vector.lerp(points[2], points[0], 0.522);

    // Subdivide the four new triangles
    subdivideTriangle([points[0], mid1, mid3], depth - 1);
    subdivideTriangle([mid1, points[1], mid2], depth - 1);
    subdivideTriangle([mid2, points[2], mid3], depth - 1);
    subdivideTriangle([mid1, mid2, mid3], depth - 1);
  }
}
