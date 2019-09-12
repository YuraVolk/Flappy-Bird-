import {Wall} from './wall';

export class WallFactory {
  constructor(canvas) {
    this.canvas = canvas;
    this.context = canvas.getContext('2d');
    this.frequency = 1300;
    this.walls = [];
  }
  generateWalls() {
    setInterval(() => {
      const gap = getRandomInt(200, 300);
      const height = getRandomInt(0, 300);

      const wall = new Wall(this.canvas, 'img/pipe-tile.png', 'img/pipe-top.png');
      wall.gap = gap;
      wall.height = height;

      this.walls.push(wall);
    }, this.frequency);
  }
}
