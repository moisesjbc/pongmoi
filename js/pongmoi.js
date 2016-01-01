var game = new Phaser.Game(800, 600, Phaser.AUTO, '');

game.state.add('MainMenu', Pongmoi.MainMenu);
game.state.add('GameLoop', Pongmoi.GameLoop);
game.state.add('CreditsScreen', Pongmoi.CreditsScreen);

game.state.start('MainMenu');
