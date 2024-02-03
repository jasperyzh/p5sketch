// basic template for instagram - did it for "whats for lunch" sketch
class TextTemplate {
  constructor(top = "top", bottom = "bottom") {
    this.top = top;
    this.bottom = bottom;
  }
  render() {
    push();
    textAlign(CENTER, CENTER);
    fill(255); // White color
    textSize(32);
    textFont("ARIAL");
    textStyle(BOLD);
    text(this.top, width / 2, height / 2 - 120);
    textSize(58);
    text(this.bottom, width / 2, height / 2);
    pop();
  }
}

class TextDisplay {
  constructor(text, size, canvasWidth, canvasHeight) {
    this.text = text;
    this.size = size;
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
  }

  display() {
    textSize(this.size);
    fill(255); // White color
    textAlign(CENTER, CENTER);
    text(this.text, this.canvasWidth / 2, this.canvasHeight / 2);
  }
}
