

function Player(x, y, color)
{
    this.score = 0;

    // Create the bitmap representing the player's paddle.
    var paddle_bitmap = game.add.bitmapData(25, 100);
    paddle_bitmap.ctx.rect(0, 0, 25, 100);
    paddle_bitmap.ctx.fillStyle = color;
    paddle_bitmap.ctx.fill();

    // Bitmap can't have physics on its own, so we create a sprite as 
    // container.
    this.paddle = physics_elements.create(x, y, paddle_bitmap);

    // Enable physics for sprite.
    game.physics.arcade.enable(this.paddle);
    this.paddle.body.enable = true;
    this.paddle.body.setSize(25,100);
}


Player.prototype.process_input = function(up_button, down_button)
{
    if (up_button.isDown){
        this.paddle.body.velocity.y = -paddle_speed;
    }else if (down_button.isDown){
        this.paddle.body.velocity.y = paddle_speed;
    }else{
        this.paddle.body.velocity.y = 0;
    }
}


Player.prototype.update = function()
{
    // Prevent paddles to be moved in X.
    this.paddle.body.velocity.x = 0;
}
