// [Processing-tutorial: Image-Rasterizer](https://www.youtube.com/watch?v=XO8u0Y75FRk)
let grid_rasterize_elephant;
let img_elephant;

function setup_rasterize_elephant() {
  grid_rasterize_elephant = new SquareGrid(0, 0, width / GR);
  img_elephant = loadImage("images/elephant.jpg", function () {
    let w = grid_rasterize_elephant.getCellRect(4)[2] * 1.05;
    let h = grid_rasterize_elephant.getCellRect(4)[3] * 1.05;
    img_elephant.resize(w, h);
  });
}

function draw_rasterize_elephant() {
  // elephant
  fill(0);
  noStroke();

  let startX = grid_rasterize_elephant.getCellRect(4)[0]; // Starting X position
  let startY = grid_rasterize_elephant.getCellRect(4)[1]; // Starting Y position
  let areaWidth = grid_rasterize_elephant.getCellRect(4)[2]; // Width of the tiled area
  let areaHeight = grid_rasterize_elephant.getCellRect(4)[3]; // Height of the tiled area

  let tilesGap = 1; // Gap in pixels between tiles
  let tilesX = mouseX / 12;
  let tilesY = tilesX; // Assuming square tiles, adjust if needed

  // Subtract the total gaps' width from the areaWidth to calculate the tileSizeX
  let tileSizeX = (areaWidth - tilesGap * (tilesX - 1)) / tilesX;
  let tileSizeY = (areaHeight - tilesGap * (tilesY - 1)) / tilesY;

  for (let x = 0; x < tilesX; x++) {
    for (let y = 0; y < tilesY; y++) {
      let imgX = Math.floor(x * (tileSizeX + tilesGap));
      let imgY = Math.floor(y * (tileSizeY + tilesGap));
      let c = img_elephant.get(imgX, imgY);
      let r_size = map(brightness(c), 0, 255, tileSizeX * 1.2, 0);
      ellipse(
        startX + x * (tileSizeX + tilesGap),
        startY + y * (tileSizeY + tilesGap),
        r_size,
        r_size
      );
    }
  }
}
