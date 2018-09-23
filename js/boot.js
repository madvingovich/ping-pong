
export default class Boot extends Phaser.State{
    // this === game
    preload() {
        this.state.start('Preload');
    }
};

// export default Boot;