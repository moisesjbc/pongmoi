var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });

var physics_elements;
var paddle_1;
var paddle_2;
var ball;
var top_border;
var bottom_border;
var paddle_speed = 300;
var paddle_max_speed = 300;

var player_1_up;
var player_1_down;
var player_2_up;
var player_2_down;


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

    paddle_1 = create_paddle(5, 50, '#0000FF');
    paddle_2 = create_paddle(770, 50, '#FF0000');
    ball = create_ball(400, 300, 150, 150);
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
    game.physics.arcade.collide(physics_elements, physics_elements);

    // Process player 1 input.
    if (player_1_up.isDown){
        paddle_1.body.velocity.y = -paddle_speed;
    }else if (player_1_down.isDown){
        paddle_1.body.velocity.y = paddle_speed;
    }
    
    // Process player 2 input.
    if (player_2_up.isDown){
        paddle_2.body.velocity.y = -paddle_speed;
    }else if (player_2_down.isDown){
        paddle_2.body.velocity.y = paddle_speed;
    }

    // Prevent paddles to be moved in X.
    paddle_1.body.velocity.x = paddle_2.body.velocity.x = 0;

    if( ball.position.x < 0 || ball.position.x > 800 ){
        ball.position.set(400,300);
    }
}


function collisionHandler (obj1, obj2)
{
    game.stage.backgroundColor = '#992d2d';
}


function create_paddle(x, y, color)
{
    var paddle = game.add.bitmapData(25, 100);
    paddle.ctx.rect(0, 0, 25, 100);
    paddle.ctx.fillStyle = color;
    paddle.ctx.fill();

    var paddle_sprite = physics_elements.create(x, y, paddle);
    game.physics.arcade.enable(paddle_sprite);
    paddle_sprite.body.enable = true;
    paddle_sprite.body.setSize(25,100);

    return paddle_sprite;
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


function create_ball(x, y, velocity_x, velocity_y)
{
    var ball = game.add.bitmapData(25, 25);
    ball.ctx.rect(0, 0, 25, 25);
    ball.ctx.fillStyle = '#FFFFFF';
    ball.ctx.fill();

    var ball_sprite = physics_elements.create(x, y, ball);
    game.physics.arcade.enable(ball_sprite);
    ball_sprite.body.enable = true;
    ball_sprite.body.setSize(25,25);
    ball_sprite.body.velocity.x = velocity_x;
    ball_sprite.body.velocity.y = velocity_y;
    ball_sprite.body.maxVelocity.set(paddle_max_speed);
    ball_sprite.body.bounce.set(100);
    
    return ball_sprite;
}
