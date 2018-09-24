
export default class Main extends Phaser.State {
    // this === game
    constructor() {
        super();
        this.board = null;
        this.counter = null;
        this.walls = null;
        this.cursors = null;
        this.ball = null;
        this.thorns = null;
        this.hearts = null;
        this.logo = null;
        this.scores = 0;
        this.record = 0;
        this.recordText = '';
        this.scoresText = '';
    }

    create() {

        this.cursors = this.input.keyboard.createCursorKeys(); // create arrows left-right-up-down
        this.physics.startSystem(Phaser.Physics.ARCADE); // enable physic

        this.startGame();

        this.makeBackground();

        this.createWalls();

        this.createBoard();

        this.createThorns();

        this.createBall();

        this.createHearts();

        this.scoresText = this.add.text(15, 15, `Scores: ${this.scores}`, {font: '15px Arial', fill: '#fff'});
        this.recordText = this.add.text(100, 15, `Record: ${this.record}`, {font: '15px Arial', fill: '#fff'});

    }

    update() {
        this.physics.arcade.collide(this.ball, this.walls);
        let hitBoard = this.physics.arcade.collide(this.ball, this.board, this.addSpeed, this.addScores, this); // true if ball touch board
        this.physics.arcade.overlap(this.ball, this.thorns, this.removeHeart, null, this);

        if(this.cursors.left.isDown) {         //arrows click test
            this.board.body.velocity.x = -400;
            this.board.frame = 0;
            if(hitBoard) {
                this.ball.body.velocity.x = this.ball.body.velocity.x > 0 ? this.ball.body.velocity.x + 30 : this.ball.body.velocity.x - 30;
            };
        } else
        if(this.cursors.right.isDown) {
            this.board.body.velocity.x = 400;
            this.board.frame = 1;
            if(hitBoard) {
                this.ball.body.velocity.x = this.ball.body.velocity.x > 0 ? this.ball.body.velocity.x - 30 : this.ball.body.velocity.x + 30;
            };
        } else {
            this.board.body.velocity.x = 0;
        }
    }

    startGame() {
        this.counter = this.add.sprite(this.world.width / 2, 100, '321', 0); // 3 2 1
        this.counter.anchor.set(.5);
        this.counter.animations.add('count', [0,1,2], 1);
        this.counter.animations.play('count');
        setTimeout(() => {
            this.counter.kill();
            // give the ball speed
            this.ball.body.velocity.x = 100 + Math.random() * 250;
            this.ball.body.velocity.y = 250 + Math.random() * 100;
        }, 3000);
    }

    makeBackground() {
        this.stage.backgroundColor = '#000';
        this.logo = this.add.sprite(this.world.width / 2, this.world.height / 2, 'dals');
        this.logo.scale.setTo(.15,.15);
        this.logo.anchor.set(.5);
    }

    createWalls() {
        this.walls = this.add.group();
        this.walls.enableBody = true; // enable physic body

        this.walls.create(0, -15, 'line');
        let wall2 = this.walls.create(0, 0, 'line');
        wall2.scale.setTo(.01,20);
        let wall3 = this.walls.create(this.world.width - 10, 0, 'line');
        wall3.scale.setTo(.01,20);

        this.walls.setAll('body.immovable', true, true);   // другие объекы не влияют
    }

    createBoard() {
        this.board = this.add.sprite(this.world.centerX, this.world.height - 50, 'lamboard', 0);
        this.board.anchor.set(.5);
        this.physics.arcade.enable(this.board);
        this.board.body.collideWorldBounds = true;
        this.board.body.immovable = true;
        this.board.scale.setTo(.15,.12);
    }

    createThorns() {
        this.thorns = this.add.sprite(0, this.world.height -40, 'thorns');
        this.physics.arcade.enable(this.thorns);
        this.thorns.scale.setTo(.2,.1);
    }

    createBall() {
        this.ball = this.add.sprite(30, 30, 'ball');
        this.physics.arcade.enable(this.ball);
        this.ball.scale.setTo(.25,.25);
        this.ball.body.collideWorldBounds = true;
        this.ball.body.maxVelocity.set(600);
        this.ball.body.setCircle(50); // скругляет углы
        this.ball.body.bounce.y = 1;
        this.ball.body.bounce.x = 1;
    }

    createHearts() { // Жизни
        this.hearts = this.add.group();
        for (let i = 0; i < 3; i++) {
            let heart = this.hearts.create(this.world.width - 110 + i * 30, 10, 'heart');
            heart.scale.setTo(.05,.05)
        }
    }

    addSpeed(ball) {
        ball.body.velocity.x > 0 ? ball.body.velocity.x += 15 : ball.body.velocity.x -= 15;
        ball.body.velocity.y > 0 ? ball.body.velocity.y += 25 : ball.body.velocity.y -= 25;

        return true; // чтобы collide мог вызвать следущую ф-цию
    }

    addScores() {
        this.scores += 10;
        Phaser.total = this.scores; // to show it in gameOver state
        this.scoresText.text = `Scores: ${this.scores}`;
        this.recordText.text = this.scores > this.record ? `Record: ${this.scores}` : `Record: ${this.record}`;
    }

    removeHeart(ball) {
        if(this.hearts.total === 1) {
            this.state.start('GameOver');
        }
        ball.body.velocity.y = -ball.body.velocity.y;
        this.stage.backgroundColor = '#ff0000';      //red blink
        setTimeout(() => {
            this.stage.backgroundColor = '#000';
        },10);
        this.hearts.removeChildAt(0);
    }

    shutdown() { // clear cache on state change
        this.board.destroy();
        this.counter.destroy();
        this.walls.destroy();
        this.ball.destroy();
        this.thorns.destroy();
        this.hearts.destroy();
        this.logo.destroy();
        this.counter.destroy();
        this.record = this.scores > this.record ? this.scores : this.record;
        this.scores = 0;
    }
};
