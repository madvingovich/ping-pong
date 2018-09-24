

export default class Preload extends Phaser.State {
    // this === game
    preload() {
        this.load.image('ball', 'assets/wizball.png');
        this.load.image('board', 'assets/board.png');
        this.load.image('thorns', 'assets/thorns.png');
        this.load.image('wall', 'assets/platform.png');
        this.load.image('line', 'assets/line.png');
        this.load.image('heart', 'assets/heart.png');
        this.load.image('bomb', 'assets/bomb.png');
        this.load.image('dals', 'assets/dals.png');
        this.load.image('new game', 'assets/new.png');

        this.load.spritesheet('lamboard', 'assets/lamboard.png', 611, 160);
        this.load.spritesheet('321', 'assets/321.png', 100, 100);
    }
    create() {
        this.state.start('Main');
    }
};



