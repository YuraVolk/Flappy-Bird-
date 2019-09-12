import {GameBackground} from './modules/background';
import {GameScore} from './modules/score';
import {WallFactory} from './modules/wall/wall-factory';
import {Monster} from './modules/monster';

const INITIAL = 1;
const GAME_PLAYING = 2;
const GAME_OVER = 3;

const KEY_CODE = {
    R: 82
};

export class FlappyBird {
    constructor(canvas) {
        this.canvas = canvas;
        this.context = this.canvas.getContext('2d');
        this.currentState = INITIAL;
        this.velocity = 6;
    }
    start() {
        window.requestAnimationFrame(() => {
            this.runGameLoop();
        });
    }
    init() {
        this.bindEvents();
    }
    bindEvents() {
        this.canvas.addEventListener('click', () => {
            switch (this.currentState) {
                case INITIAL:
                    this.currentState = GAME_PLAYING;
                    this.createObjects();
                    break;
                case GAME_PLAYING:
                    this.monster.vy = -1 * this.velocity;
                    break;
            }
        });

        window.addEventListener('keydown', (event) => {
            if (event.keyCode === KEY_CODE.R) {
                this.currentState = GAME_PLAYING;
                this.reset();
                this.createObjects();
            }
        });
    }
    runGameLoop() {
        switch (this.currentState) {
            case INITIAL:
                this.drawInitialScreen();
                break;
            case GAME_PLAYING:
                this.drawGamePlayingScreen();
                break;
            case GAME_OVER:
                this.drawGameOverScreen();
                break;
            default:
                alert('Ooops! Something went wrong! Try reloading the page.');
        }
        window.requestAnimationFrame(() => {
            this.runGameLoop();
        });
    }
    drawInitialScreen() {
        this.context.fillStyle = '#222222';
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.context.fillStyle = "#e6e6e6";
        this.context.font = '36px Arial';
        this.context.textAlign='center';
        this.context.fillText('Click to start!', this.canvas.width / 2, this.canvas.height / 2);
    }
    animateBackground() {
      this.background.draw();
      this.background2.draw();
      if (Math.abs(this.background.x) > this.canvas.width) {
        this.background.x = this.canvas.width - this.velocity;
      }
      if (Math.abs(this.background2.x) > this.canvas.width) {
        this.background2.x = this.canvas.width - this.velocity;
      }
      this.background.x -= this.velocity;
      this.background2.x -= this.velocity;
    }
    drawGamePlayingScreen() {
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.animateBackground();

      this.drawWalls();

      this.gameScore.draw();

      this.monster.draw();

      this.checkCollisions();
    }
    drawGameOverScreen() {
        this.context.fillStyle = '#222222';
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.context.fillStyle = "#e6e6e6";
        this.context.font = '36px Arial';
        this.context.textAlign='center';
        this.context.fillText('Game Over', this.canvas.width / 2, this.canvas.height / 2);
        this.context.font = '22px Arial';
        this.context.fillText('Press R to restart.', this.canvas.width / 2, this.canvas.height / 2 + 30);
        this.context.fillText(`You scored ${this.gameScore.score} points. Good job!`, this.canvas.width / 2, this.canvas.height / 2 + 60);
    }
    createObjects() {
      this.background = new GameBackground('img/back.png', this.canvas);
      this.background.create();
      this.background2 = new GameBackground('img/back.png', this.canvas);
      this.background2.create();
      this.background2.x = this.canvas.width;

      this.gameScore = new GameScore(this.canvas);

      this.wallFactory = new WallFactory(this.canvas);
      this.wallFactory.generateWalls();

      this.monster = new Monster(this.canvas, 'img/monster.png');
      this.monster.create();
    }
    drawWalls() {
      this.removeExtraWalls();
      const walls = this.wallFactory.walls;
      walls.forEach((wall) => {
        wall.draw();
        wall.x -= this.velocity;
      });
    }
    removeExtraWalls() {
      const walls = this.wallFactory.walls;
      walls.forEach((wall) => {
        if (wall.x + wall.width < 0) {
          walls.shift();
        }
      });
    }
    checkCollisions() {
      const walls = this.wallFactory.walls;
      walls.forEach((wall) => {
        if(this.isCollided(wall)) {
          this.currentState = GAME_OVER;
        }
      });
    }
    reset() {
      this.gameScore.start = new Date();
      this.gameScore.score = 0;
      this.wallFactory.walls = [];
      this.monster.x = 115;
      this.monster.y = 115;
    }
    isCollided(wall) {
      let isCollided = true;

      const monsterTop = this.monster.y;
      const monsterBottom = this.monster.y + this.monster.height;
      const monsterRight = this.monster.x + this.monster.width;
      const monsterLeft = this.monster.x;

      const wallTop = wall.y + wall.gap + wall.height;
      const wallBottom = wall.y + wall.height;
      const wallRight = wall.x + wall.width;
      const wallLeft = wall.x;

      if((monsterBottom < wallTop && monsterTop > wallBottom) || (monsterLeft > wallRight) || (monsterRight < wallLeft)) {
        isCollided = false;
      }

      return isCollided;
    }
};
