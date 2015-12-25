var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });

var physics_elements;
var player_1;
var player_2;
var ball;
var top_border;
var bottom_border;
var paddle_speed = 300;
var paddle_max_speed = 300;

var player_1_up;
var player_1_down;
var player_2_up;
var player_2_down;
var player_1_score_text;
var player_2_score_text;


function preload() 
{
}


function create() 
{
    // Enable physics
    game.physics.startSystem(Phaser.Physics.ARCADE);

    physics_elements = game.add.group();
    physics_elements.enableBody = true;
    physics_elements.physicsBodyType = Phaser.Physics.ARCADE;

    player_1 = new Player(5, 50, '#0000FF');
    player_2 = new Player(770, 50, '#FF0000');
    ball = new Ball(400, 300, 150, 150);
    top_border = create_horizontal_border(0);
    bottom_border = create_horizontal_border(580);

    player_1_score_text = game.add.text(16, 0, 'Player 1: 0', { fontSize: '16px', fill: '#FFFFFF' });
    player_2_score_text = game.add.text(700, 0, 'Player 2: 0', { fontSize: '16px', fill: '#FFFFFF' });

    // Set inputs
    player_1_up = game.input.keyboard.addKey(Phaser.Keyboard.W);
    player_1_down = game.input.keyboard.addKey(Phaser.Keyboard.S);
    player_2_up = game.input.keyboard.addKey(Phaser.Keyboard.UP);
    player_2_down = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
}


function update() 
{
    game.physics.arcade.collide(physics_elements, physics_elements);

    player_1.process_input(player_1_up, player_1_down);
    player_2.process_input(player_2_up, player_2_down);

    player_1.update();
    player_2.update();
    ball.update(player_1, player_2);

    player_1_score_text.text = 'Player 1: ' + player_1.score;
    player_2_score_text.text = 'Player 2: ' + + player_2.score;
}


function create_horizontal_border(y)
{
    var border = game.add.bitmapData(800, 20);
    border.ctx.rect(0, 0, 800, 20);
    border.ctx.fillStyle = '#AAAAAA';
    border.ctx.fill();

    var border_sprite = physics_elements.create(0, y, border);
    game.physics.arcade.enable(border_sprite);
    border_sprite.body.enable = true;
    border_sprite.body.setSize(800,20);
    border_sprite.body.immovable = true;

    return border_sprite;
}
