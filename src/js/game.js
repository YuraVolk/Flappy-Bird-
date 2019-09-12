import './utils/utils';
import {FlappyBird} from './character';

window.onload = function() {
    const canvas = document.getElementById('game');
    const flappyBird = new FlappyBird(canvas);
    flappyBird.init();
    flappyBird.start();
};
