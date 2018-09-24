export default class GameOver extends Phaser.State {
    // this === game
    super() {
        this.newGameBtn = null;
    }
    create() {
        this.stage.backgroundColor = '#4e7bff';
        this.newGameBtn = this.add.button(this.world.width / 2, this.world.height / 2, 'new game', this.restart, this, this, this, this);
        this.newGameBtn.anchor.set(.5);
        this.newGameBtn.scale.setTo(.4,.4);

        let scoresText = this.add.text(this.world.width / 2, 150, `Your scores: ${Phaser.total || 0}`);
        scoresText.anchor.set(.5);
    }
    restart() {
        this.state.start('Main');
    }
    shutdown() {
        this.newGameBtn.destroy();
    }
};

