export class GameBackground {
  constructor(src, canvas) {
    this.canvas = canvas;
    this.context = canvas.getContext('2d');
    this.src = src;
    this.x = 0;
    this.y = 0;
    this.w = this.canvas.width;
    this.h = this.canvas.height;
    this.img = null;
  }
  create() {
    this.img = new Image();
    this.img.src = this.src;
  }
  draw() {
    if (this.img !== null) {
      this.context.drawImage(this.img, this.x, this.y, this.w, this.h);
    }
  }
};
