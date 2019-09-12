export class GameScore {
  constructor(canvas) {
    this.canvas = canvas;
    this.context = this.canvas.getContext('2d');
    this.start = new Date();
    this.score = 0;
  }
  draw() {
    let draw = new Date();
    this.score = parseFloat((draw - this.start) / 1000).toFixed(0);
    this.context.font='45px Verdana';
    this.context.textAlign='end';
    this.context.fillText(this.score, this.canvas.width - 60, 80, 70);
  }
}
