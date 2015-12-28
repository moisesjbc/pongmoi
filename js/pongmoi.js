var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });

var players_group;
var borders_group;
var player_1;
var player_2;
var ball;
var paddle_speed = 500;
var paddle_max_speed = 300;

var player_1_up;
var player_1_down;
var player_1_swap;
var player_2_up;
var player_2_down;
var player_2_swap;
var player_1_score_text;
var player_2_score_text;


function preload() 
{
}


function create() 
{
    // Enable physics
    game.physics.startSystem(Phaser.Physics.ARCADE);

    ball = new Ball(400, 300, 150, 150);
    players_group = create_players();
    borders_group = create_horizontal_borders();

    player_1_score_text = game.add.text(16, 0, 'Player 1: 0', { fontSize: '16px', fill: '#FFFFFF' });
    player_2_score_text = game.add.text(700, 0, 'Player 2: 0', { fontSize: '16px', fill: '#FFFFFF' });

    // Set inputs
    player_1_up = game.input.keyboard.addKey(Phaser.Keyboard.W);
    player_1_down = game.input.keyboard.addKey(Phaser.Keyboard.S);
    player_1_swap = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    player_2_up = game.input.keyboard.addKey(Phaser.Keyboard.UP);
    player_2_down = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
    player_2_swap = game.input.keyboard.addKey(Phaser.Keyboard.NUMPAD_0);
}


function update() 
{
    game.physics.arcade.collide(ball.ball, borders_group);
    game.physics.arcade.collide(ball.ball, players_group);
    game.physics.arcade.collide(players_group, borders_group);

    player_1.process_input(game, player_1_up, player_1_down, player_1_swap, player_2);
    player_2.process_input(game, player_2_up, player_2_down, player_2_swap, player_1);

    player_1.update();
    player_2.update();
    ball.update(player_1, player_2);

    player_1_score_text.text = 'Player 1: ' + player_1.score;
    player_2_score_text.text = 'Player 2: ' + player_2.score;
}


function create_horizontal_border(group, y)
{
    var border = game.add.bitmapData(800, 20);
    border.ctx.rect(0, 0, 800, 20);
    border.ctx.fillStyle = '#AAAAAA';
    border.ctx.fill();

    var border_sprite = group.create(0, y, border);
    game.physics.arcade.enable(border_sprite);
    border_sprite.body.enable = true;
    border_sprite.body.setSize(800,20);
    border_sprite.body.immovable = true;
}


function create_horizontal_borders()
{
    var borders_group = game.add.group();
    borders_group.enableBody = true;
    borders_group.physicsBodyType = Phaser.Physics.ARCADE;

    create_horizontal_border(borders_group, 0);
    create_horizontal_border(borders_group, 580);

    return borders_group;
}


function create_players()
{
    var players_group = game.add.group();
    players_group.enableBody = true;
    players_group.physicsBodyType = Phaser.Physics.ARCADE;

    player_1 = new Player(players_group, 5, 50, '#0000FF');
    player_2 = new Player(players_group, 770, 50, '#FF0000');   

    return players_group;
}
