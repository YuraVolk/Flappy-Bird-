export class Monster {
  constructor(canvas, src) {
    this.canvas = canvas;
    this.context = this.canvas.getContext('2d');
    this.src = src;
    this.img = null;
    this.x = 115;
    this.y = 115;
    this.width = 75;
    this.height = 75;
    this.vy = 0;
    this.gravity = 0.20;
    this.frame = 0;
  }
  create() {
    this.img = new Image();
    this.img.src = this.src;
  }
  draw() {
    if (this.img !== null) {
      this.vy += this.gravity;
      this.y += this.vy;

      if (this.y + this.height > this.canvas.height) {
        this.y = this.canvas.height - this.height;
        this.vy = 0;
      } else if (this.y < 0) {
        this.y = 0;
        this.vy = 0;
      }

      this.context.drawImage(this.img, Math.floor(this.frame / 5) * 115, 0, 115, 100, this.x, this.y, this.width, this.height);
      this.frame++;
      this.frame %= 20;
    }
  }
}
