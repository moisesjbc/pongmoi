var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });

var paddle_1;
var paddle_2;
var top_border;
var bottom_border;
var paddle_speed = 7;

var player_1_up;
var player_1_down;
var player_2_up;
var player_2_down;


function preload() 
{
}


function create() 
{
    paddle_1 = create_paddle(5, 50, 0x0000FF);
    paddle_2 = create_paddle(770, 50, 0xFF0000);
    top_border = create_horizontal_border(0);
    bottom_border = create_horizontal_border(580);

    // Set inputs
    player_1_up = game.input.keyboard.addKey(Phaser.Keyboard.W);
    player_1_down = game.input.keyboard.addKey(Phaser.Keyboard.S);
    player_2_up = game.input.keyboard.addKey(Phaser.Keyboard.UP);
    player_2_down = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
}


function update() 
{
    // Process player 1 input.
    if (player_1_up.isDown){
        paddle_1.y -= paddle_speed;
    }else if (player_1_down.isDown){
        paddle_1.y += paddle_speed;
    }

    // Process player 2 input.
    if (player_2_up.isDown){
        paddle_2.y -= paddle_speed;
    }else if (player_2_down.isDown){
        paddle_2.y += paddle_speed;
    }
}


function create_paddle(x, y, color)
{
    var paddle = game.add.graphics(x,y);
    paddle.beginFill(color, 1);
    paddle.lineStyle(2, 0xFFFFFF, 1);
    paddle.drawRect(0, 0, 25, 100);
    paddle.endFill();

    return paddle;
}


function create_horizontal_border(y)
{
    var border = game.add.graphics(0,y);
    border.beginFill(0xAAAAAA, 1);
    border.lineStyle(2, 0xFFFFFF, 1);
    border.drawRect(0, 0, 800, 20);
    border.endFill();

    return border;
}
