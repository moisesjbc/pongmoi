var HITS_TO_GET_SWAP = 3;

function Player(group, x, y, color)
{
    this.score = 0;

    // Swap cooldown and timestamp.
    this.swapCooldown = 3.0;
    this.lastSwapTimestamp = -3.0;
    this.hits_to_get_swap = HITS_TO_GET_SWAP;
    this.n_swaps = 0;

    // Create the bitmap representing the player's paddle.
    var paddle_bitmap = game.add.bitmapData(25, 100);
    paddle_bitmap.ctx.rect(0, 0, 25, 100);
    paddle_bitmap.ctx.fillStyle = color;
    paddle_bitmap.ctx.fill();

    // Bitmap can't have physics on its own, so we create a sprite as 
    // container.
    this.paddle = group.create(x, y, paddle_bitmap);

    // Enable physics for sprite.
    game.physics.arcade.enable(this.paddle);
    this.paddle.body.enable = true;
    this.paddle.body.setSize(25,100);
}


Player.prototype.process_input = function(game, up_button, down_button, swap_button, other_player)
{
    if (up_button.isDown){
        this.paddle.body.velocity.y = -paddle_speed;
    }else if (down_button.isDown){
        this.paddle.body.velocity.y = paddle_speed;
    }else{
        this.paddle.body.velocity.y = 0;
    }

    if(swap_button.isDown && 
       this.n_swaps > 0 &&
        (game.time.totalElapsedSeconds() - this.lastSwapTimestamp > this.swapCooldown))
    {
        this.lastSwapTimestamp = game.time.totalElapsedSeconds();
        this.n_swaps--;
        this.swap(other_player);
    }
}


Player.prototype.update = function()
{
    // Prevent paddles to be moved in X.
    this.paddle.body.velocity.x = 0;
}


Player.prototype.swap = function(other_player)
{
    paddle_pos = this.paddle.position;

    this.paddle.position = other_player.paddle.position;

    other_player.paddle.position = paddle_pos;
}


Player.prototype.decrease_hits_to_get_swap_counter = function()
{
    this.hits_to_get_swap--;
    if(this.hits_to_get_swap == 0){
        this.hits_to_get_swap = HITS_TO_GET_SWAP;
        this.n_swaps++;
    }
}
