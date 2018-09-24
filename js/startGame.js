

import PIXI from 'expose-loader?PIXI!phaser-ce/build/custom/pixi.js';
import p2 from 'expose-loader?p2!phaser-ce/build/custom/p2.js';
import Phaser from 'expose-loader?Phaser!phaser-ce/build/custom/phaser-split.js';

import Boot from './Stages/boot'
import Preload from './Stages/preload'
import Main from './Stages/main'
import GameOver from './Stages/gameOver'


let game = new Phaser.Game(500, 500,Phaser.AUTO, '', { preload: preload, create: create, update: update, render: render});

game.state.add('Boot', Boot);
game.state.add('Preload', Preload);
game.state.add('Main', Main);
game.state.add('GameOver', GameOver);

game.state.start('Boot');

function preload () {}

function create () {}

function update () {}

function render () {}
