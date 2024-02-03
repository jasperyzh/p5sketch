// https://editor.p5js.org/codingtrain/sketches/9DnjxCNB-

class MouseTrail {
  constructor(x = 0, y = 0, length = 100) {
    this.x = x;
    this.y = y;
    this.length = length;
    this.history = [];
  }

  update(x = null, y = null, options = { render: true }) {
    this.x = x;
    this.y = y;

    let v = createVector(this.x, this.y);

    this.history.push(v);

    if (this.history.length > this.length) {
      this.history.splice(0, 1);
    }

    if (options.render) {
      this.render();
    }
  }
  render() {
    // render
    beginShape();
    for (let i = 0; i < this.history.length; i++) {
      let pos = this.history[i];
      vertex(pos.x, pos.y);
      endShape();
    }
  }
}
