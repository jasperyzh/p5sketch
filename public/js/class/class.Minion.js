let Minions = [];
let minions_cols = 512 / 20;
let minions_rows = 512 / 30;

class Minion {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  distance_to_mouse(x = null, y = null) {
    if (x == null) {
      return dist(this.x, this.y, mouseX, mouseY);
    } else {
      return dist(this.x, this.y, x, y);
    }
  }

  setup() {
    for (let i = 0; i < minions_cols; i++) {
      Minions[i] = [];
      for (let j = 0; j < minions_rows; j++) {
        // Minions[i][j] = "test"
        Minions[i][j] = new Minion(
          // 30 * i * GOLDEN_RATIO,
          minions_cols * i,
          minions_rows * j,
          30,
          40
        );
      }
    }
  }

  render(x, y) {
    let getDist = round((this.distance_to_mouse(x, y) / 4) * GOLDEN_RATIO);
    push();
    // strokeWeight(getDist / 2);
    stroke(getDist * GOLDEN_RATIO, getDist * GOLDEN_RATIO);
    // fill(getDist * GOLDEN_RATIO, getDist * GOLDEN_RATIO);
    fill(
      color(
        getDist * GOLDEN_RATIO,
        getDist * GOLDEN_RATIO,
        getDist * GOLDEN_RATIO
      ),
      getDist * GOLDEN_RATIO
    );
    translate(0, getDist * 2 * GOLDEN_RATIO);
    rect(this.x, this.y, this.width, this.height);
    pop();

    for (let i = 0; i < minions_cols; i++) {
      for (let j = 0; j < minions_rows; j++) {
        Minions[i][j].render(x + width / 2, y + height / 3);
      }
    }
  }
}
