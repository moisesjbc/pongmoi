var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });

function preload() 
{
}

function create() 
{
    var paddle_1 = create_paddle(5, 50, 0x0000FF);
    var paddle_2 = create_paddle(770, 50, 0xFF0000);
    var top_border = create_horizontal_border(0);
    var bottom_border = create_horizontal_border(580);
}


function update() 
{
}


function create_paddle(x, y, color)
{
    paddle = game.add.graphics(x,y);
    paddle.beginFill(color, 1);
    paddle.lineStyle(2, 0xFFFFFF, 1);
    paddle.drawRect(0, 0, 25, 100);
    paddle.endFill();

    return paddle;
}


function create_horizontal_border(y)
{
    border = game.add.graphics(0,y);
    border.beginFill(0xAAAAAA, 1);
    border.lineStyle(2, 0xFFFFFF, 1);
    border.drawRect(0, 0, 800, 20);
    border.endFill();

    return paddle;
}
