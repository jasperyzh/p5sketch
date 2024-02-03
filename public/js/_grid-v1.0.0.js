class Grid {
  constructor(gridX = 0, gridY = 0, cellWidth, cellHeight) {
    this.gridX = gridX;
    this.gridY = gridY;
    this.cellWidth = cellWidth;
    this.cellHeight = cellHeight;
  }

  /*
  |0|1|2|
  |3|4|5|
  |6|7|8|
  */
  getCellRect(cell) {
    let centerLength = this.cellWidth;
    let short = (width - centerLength) / 2;

    switch (cell) {
      case 0:
        return [0, 0, short, short];
      case 1:
        return [short, 0, centerLength, short];
      case 2:
        return [short + centerLength, 0, short, short];
      case 3:
        return [0, short, short, centerLength];
      case 4:
        return [short, short, centerLength, centerLength];
      case 5:
        return [short + centerLength, short, short, centerLength];
      case 6:
        return [0, short + centerLength, short, short];
      case 7:
        return [short, short + centerLength, centerLength, short];
      case 8:
        return [short + centerLength, short + centerLength, short, short];
    }
  }

  /*
   0| 1| 2| 3|
   4| 5| 6| 7|
   8| 9|10|11|
  12|13|14|15|
  */
  getCellPoint(point) {
    let centerLength = this.cellWidth;
    let short = (width - centerLength) / 2;

    switch (point) {
      case 0:
        return [0, 0];
      case 1:
        return [short, 0];
      case 2:
        return [short + centerLength, 0];
      case 3:
        return [short + centerLength + short, 0];
      case 4:
        return [0, short];
      case 5:
        return [short, short];
      case 6:
        return [short + centerLength, short];
      case 7:
        return [short + centerLength + short, short];
      case 8:
        return [0, short + centerLength];
      case 9:
        return [short, short + centerLength];
      case 10:
        return [short + centerLength, short + centerLength];
      case 11:
        return [short + centerLength + short, short + centerLength];
      case 12:
        return [0, short + centerLength + short];
      case 13:
        return [short, short + centerLength + short];
      case 14:
        return [short + centerLength, short + centerLength + short];
      case 15:
        return [short + centerLength + short, short + centerLength + short];
    }
  }
  /*
  the point of point[5,6,9,10]

  |0|1|2|
  |3|4|5|
  |6|7|8|
  */
  getCenterPoint(point) {
    let p5 = this.getCellPoint(5);
    let p6 = this.getCellPoint(6);
    let p9 = this.getCellPoint(9);
    let p10 = this.getCellPoint(10);

    switch (point) {
      case 0:
        return [p5[0], p5[1]];
      case 1:
        return [width / 2, p5[1]];
      case 2:
        return [p6[0], p6[1]];
      case 3:
        return [p5[0], height / 2];
      case 4:
        return [width / 2, height / 2];
      case 5:
        return [p6[0], height / 2];
      case 6:
        return [p9[0], p9[1]];
      case 7:
        return [width / 2, p9[1]];
      case 8:
        return [p10[0], p10[1]];
    }
  }

  debug() {
    noFill();
    stroke(255, 0, 255);
    rect(
      this.getCellRect(0)[0],
      this.getCellRect(0)[1],
      this.getCellRect(0)[2],
      this.getCellRect(0)[3]
    );
    rect(
      this.getCellRect(2)[0],
      this.getCellRect(2)[1],
      this.getCellRect(2)[2],
      this.getCellRect(2)[3]
    );
    rect(
      this.getCellRect(4)[0],
      this.getCellRect(4)[1],
      this.getCellRect(4)[2],
      this.getCellRect(4)[3]
    );
    rect(
      this.getCellRect(6)[0],
      this.getCellRect(6)[1],
      this.getCellRect(6)[2],
      this.getCellRect(6)[3]
    );
    rect(
      this.getCellRect(8)[0],
      this.getCellRect(8)[1],
      this.getCellRect(8)[2],
      this.getCellRect(8)[3]
    );

    noStroke();
    fill(255, 0, 255);
    for (let j = 0; j <= 15; j++) {
      ellipse(this.getCellPoint(j)[0], this.getCellPoint(j)[1], 25);
    }
    fill(255, 255, 255);
    for (let j = 0; j <= 8; j++) {
      ellipse(this.getCenterPoint(j)[0], this.getCenterPoint(j)[1], 10);
    }
  }

  // 231228- grid drawing exercises to understand deeply, worth exploring
  drawGridExercise() {
    let cell2;
    let cell3;
    let bestSpotGrLarge = [];
    let bestSpotGrSmall = [];
    let bestSpotEven = [];

    cell2 = width * 0.618 * 0.618 * 0.618;
    cell3 = width * 0.618 * 0.618;

    // prettier-ignore
    let cell = width * 0.618 * 0.618 * 0.618; // cell2
    bestSpotGrLarge = [
      [cell, cell], // 0
      [width / 2, cell], // 1
      [width - cell, cell], // 2
      [cell, height / 2], // 3
      [width / 2, height / 2], // 4
      [width - cell, height / 2], // 5
      [cell, height - cell], // 6
      [width / 2, height - cell], // 7
      [width - cell, height - cell], // 8
    ];
    // prettier-ignore
    cell = width * 0.618 * 0.618; // cell3
    bestSpotGrSmall = [
      [cell, cell], // 0
      [width / 2, cell], // 1
      [width - cell, cell], // 2
      [cell, height / 2], // 3
      [width / 2, height / 2], // 4
      [width - cell, height / 2], // 5
      [cell, height - cell], // 6
      [width / 2, height - cell], // 7
      [width - cell, height - cell], // 8
    ];
    // prettier-ignore
    cell = width / 3;
    bestSpotEven = [
      [cell, cell], // 0
      [width / 2, cell], // 1
      [width - cell, cell], // 2
      [cell, height / 2], // 3
      [width / 2, height / 2], // 4
      [width - cell, height / 2], // 5
      [cell, height - cell], // 6
      [width / 2, height - cell], // 7
      [width - cell, height - cell], // 8
    ];

    push();
    noStroke();
    fill(255, 0, 0);
    bestSpotGrLarge.forEach((point) => {
      ellipse(point[0], point[1], 20, 20);
    });
    pop();

    push();
    stroke(255, 0, 0);
    noFill();
    let cellsizeGrLarge = width * 0.618 * 0.618 * 0.618;
    let diameterGrLarge = width - cellsizeGrLarge * 2;
    let diagonalLength = diameterGrLarge * Math.sqrt(2);
    ellipse(width / 2, height / 2, diameterGrLarge, diameterGrLarge);

    ellipse(width / 2, height / 2, diagonalLength, diagonalLength);
    // e = cell√2
    pop();

    push();
    fill(0, 255, 0);
    bestSpotGrSmall.forEach((point) => {
      ellipse(point[0], point[1], 20, 20);
    });
    pop();

    push();
    stroke(0, 255, 0);
    noFill();
    let cellsizeGrSmall = width * 0.618 * 0.618;
    let diameterGrSmall = width - cellsizeGrSmall * 2;
    ellipse(width / 2, height / 2, diameterGrSmall, diameterGrSmall);
    pop();

    push();
    fill(0, 0, 255);
    bestSpotEven.forEach((point) => {
      ellipse(point[0], point[1], 20, 20);
    });
    noFill();
    stroke(0, 0, 255);
    let cellsizeEven = width / 3;
    let diameterEven = width - cellsizeEven * 2;
    let diagonalLengthEven = diameterEven * Math.sqrt(2);
    ellipse(width / 2, height / 2, diagonalLengthEven, diagonalLengthEven);
    pop();

    stroke(0, 0, 255);
    noFill();
    let cellsize = width / 3;
    let diameter = width - cellsize * 2;
    ellipse(width / 2, height / 2, diameter, diameter);

    // draw goldenratio squares
    push();
    stroke(255, 0, 255, 100);
    let n1 = width / 1.618;
    let n2 = width / 1.618 / 1.618;
    let n3 = width / 1.618 / 1.618 / 1.618;
    let n4 = width / 1.618 / 1.618 / 1.618 / 1.618;
    square(0, 0, n1);
    square(0, 0, n2);
    square(0, 0, n3);
    square(0, 0, n4);

    square(width - n1, 0, n1);
    square(width - n2, 0, n2);
    square(width - n3, 0, n3);
    square(width - n4, 0, n4);

    square(0, height - n1, n1);
    square(0, height - n2, n2);
    square(0, height - n3, n3);
    square(0, height - n4, n4);

    square(width - n1, height - n1, n1);
    square(width - n2, height - n2, n2);
    square(width - n3, height - n3, n3);
    square(width - n4, height - n4, n4);
    pop();

    push();
    fill(255, 30);
    let short = n3;
    let long = n2;

    // row1
    rect(0, 0, long, long);
    rect(long, 0, short, long);
    rect(long + short, 0, long, long);
    // row2
    rect(0, long, long, short);
    rect(long, long, short, short);
    rect(long + short, long, long, short);
    // row3
    rect(0, long + short, long, long);
    rect(long, long + short, short, long);
    rect(long + short, long + short, long, long);

    fill(255, 30);
    let c = width / 3;
    let k = width / 3;
    // let long = width/3;

    // row1
    rect(0, 0, k, k);
    rect(k, 0, c, k);
    rect(k + c, 0, k, k);
    // row2
    rect(0, k, k, c);
    rect(k, k, c, c);
    rect(k + c, k, k, c);
    // row3
    rect(0, k + c, k, k);
    rect(k, k + c, c, k);
    rect(k + c, k + c, k, k);

    fill(255, 30);
    stroke(0, 255, 0);
    let cellLong = width - n3 - n3;

    // row1
    rect(0, 0, n3, n3);
    rect(n3, 0, cellLong, n3);
    rect(n3 + cellLong, 0, n3, n3);
    // row2
    rect(0, n3, n3, cellLong);
    rect(n3, n3, cellLong, cellLong);
    rect(n3 + cellLong, n3, cellLong);
    // row3
    rect(0, cellLong + n3, n3, n3);
    rect(n3, cellLong + n3, cellLong, n3);
    rect(n3 + cellLong, cellLong + n3, n3, n3);
    pop();

    // goldenratio square center
    push();
    rectMode(CENTER);
    strokeWeight(4);
    stroke(255, 25, 200);
    translate(width / 2, height / 2);
    square(0, 0, n1);
    square(0, 0, n2);
    square(0, 0, n3);
    square(0, 0, n4);
    pop();
  }

  // Additional methods can be added here, like getCellCoordinate, manipulateCell, etc.

  // 1. getCellCoordinate(x, y)
  // Purpose: Returns the row and column of the cell that contains the point (x, y).
  // Implementation: Calculate the cell's row and column based on x, y coordinates and cell dimensions.

  // 2. manipulateCell(col, row, callback)
  // Purpose: Applies a given callback function to the specified cell.
  // Implementation: Pass the cell's coordinates or other properties to the callback function for custom operations.

  // 3. highlightCell(col, row, color)
  // Purpose: Highlights or changes the color of a specified cell.
  // Implementation: Draw an overlay or change the fill color for the cell at the specified column and row.

  // 4. randomizeCells(callback)
  // Purpose: Randomly applies a callback function to various cells in the grid.
  // Implementation: Use random selection to apply the callback to different cells.

  // 5. forEachCell(callback)
  // Purpose: Iterates over each cell in the grid, applying a callback function.
  // Implementation: Loop through all cells and apply the callback function, useful for uniform operations across the grid.

  // 6. getCellNeighbors(col, row)
  // Purpose: Returns an array of neighboring cells around a specified cell.
  // Implementation: Identify and return cells adjacent to the specified cell, useful for algorithms like Conway's Game of Life.

  // 7. resizeGrid(newCols, newRows)
  // Purpose: Dynamically adjusts the number of columns and rows in the grid.
  // Implementation: Update the cols and rows properties and redraw the grid.

  // 8. mapCells(callback)
  // Purpose: Transforms each cell based on a callback function that returns new cell properties.
  // Implementation: Apply a transformation to each cell, such as changing size or color based on a certain criterion.

  // 9. foldGrid(callback)
  // Purpose: Apply a folding or reduction operation across the grid.
  // Implementation: Similar to Array.prototype.reduce, this could accumulate values or properties across the grid.

  // getCellCoordinate(x, y) {
  //   let col = Math.floor(x / this.cellWidth);
  //   let row = Math.floor(y / this.cellHeight);
  //   return { col, row };
  // }

  // manipulateCell(col, row, callback) {
  //   let x = col * this.cellWidth;
  //   let y = row * this.cellHeight;
  //   callback(x, y, this.cellWidth, this.cellHeight);
  // }

  // highlightCell(col, row, color) {
  //   let x = col * this.cellWidth;
  //   let y = row * this.cellHeight;
  //   fill(color);
  //   rect(x, y, this.cellWidth, this.cellHeight);
  // }

  // randomizeCells(callback) {
  //   for (let i = 0; i < this.cols; i++) {
  //     for (let j = 0; j < this.rows; j++) {
  //       if (random(1) < 0.5) {
  //         this.manipulateCell(i, j, callback);
  //       }
  //     }
  //   }
  // }

  // forEachCell(callback) {
  //   for (let i = 0; i < this.cols; i++) {
  //     for (let j = 0; j < this.rows; j++) {
  //       this.manipulateCell(i, j, callback);
  //     }
  //   }
  // }

  // getCellNeighbors(col, row) {
  //   let neighbors = [];
  //   for (let i = -1; i <= 1; i++) {
  //     for (let j = -1; j <= 1; j++) {
  //       if (i === 0 && j === 0) continue; // Skip the cell itself
  //       let nCol = col + i;
  //       let nRow = row + j;
  //       if (nCol >= 0 && nCol < this.cols && nRow >= 0 && nRow < this.rows) {
  //         neighbors.push({ col: nCol, row: nRow });
  //       }
  //     }
  //   }
  //   return neighbors;
  // }

  // resizeGrid(newCols, newRows) {
  //   this.cols = newCols;
  //   this.rows = newRows;
  // }

  // mapCells(callback) {
  //   for (let i = 0; i < this.cols; i++) {
  //     for (let j = 0; j < this.rows; j++) {
  //       let x = i * this.cellWidth;
  //       let y = j * this.cellHeight;
  //       callback(i, j, x, y, this.cellWidth, this.cellHeight);
  //     }
  //   }
  // }

  // foldGrid(callback, initialValue) {
  //   let accumulator = initialValue;
  //   for (let i = 0; i < this.cols; i++) {
  //     for (let j = 0; j < this.rows; j++) {
  //       accumulator = callback(accumulator, i, j);
  //     }
  //   }
  //   return accumulator;
  // }
}
