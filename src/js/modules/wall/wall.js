export class Wall {
  constructor(canvas, src, topSrc) {
    this.canvas = canvas;
    this.context = canvas.getContext('2d');
    this.x = this.canvas.width;
    this.y = 0;
    this.width = 100;
    this.height = 0;
    this.gap = 0;
    this.color = '#333333';
    this.img = null;
    this.src = src;
    this.top = top;
    this.topSrc = topSrc;
  }
  draw() {
    this.img = new Image();
    this.img.src = this.src;
    this.top = new Image();
    this.top.src = this.topSrc;
    if (this.img != null) {
      this.context.drawImage(this.img, this.x, this.y, this.width, this.height);
      this.context.drawImage(this.img, this.x, this.height + this.gap, this.width, this.canvas.height);
    }
    if (this.top != null) {
      this.context.drawImage(this.top, this.x - 10, this.height - 60, 120, 60);
      this.context.drawImage(this.top, this.x - 10, this.height + this.gap, 120, 60);
    }
  }
}
