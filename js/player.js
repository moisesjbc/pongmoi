var HITS_TO_GET_SWAP = 3;
var PADDLE_SPEED = 500;

function Player(game_state, group, x, y, color, swap_sound)
{
    this.game_state = game_state;
    this.swap_sound = swap_sound;
   
    this.initial_position = { x: x, y: y };

    // Create the bitmap representing the player's paddle.
    var paddle_bitmap = this.game_state.add.bitmapData(25, 100);
    paddle_bitmap.ctx.rect(0, 0, 25, 100);
    paddle_bitmap.ctx.fillStyle = color;
    paddle_bitmap.ctx.fill();

    // Bitmap can't have physics on its own, so we create a sprite as 
    // container.
    this.paddle = group.create(x, y, paddle_bitmap);

    // Enable physics for sprite.
    this.game_state.physics.arcade.enable(this.paddle);
    this.paddle.body.enable = true;
    this.paddle.body.setSize(25,100);

    this.restart();
}


Player.prototype.process_input = function(game, controls, other_player)
{
    if (controls.up.isDown){
        this.paddle.body.velocity.y = -PADDLE_SPEED;
    }else if (controls.down.isDown){
        this.paddle.body.velocity.y = PADDLE_SPEED;
    }else{
        this.paddle.body.velocity.y = 0;
    }

    if(controls.swap.isDown && 
       this.n_swaps > 0 &&
        (this.game_state.time.totalElapsedSeconds() - this.lastSwapTimestamp > this.swapCooldown))
    {
        this.swap_sound.play('',0,0.4);
        this.lastSwapTimestamp = this.game_state.time.totalElapsedSeconds();
        this.n_swaps--;
        this.swap(other_player);
    }
}


Player.prototype.update = function()
{
    // Prevent paddles to be moved in X.
    this.paddle.body.velocity.x = 0;
    this.paddle.x = this.x;
}


Player.prototype.swap = function(other_player)
{
    var aux_x = this.paddle.x;
    var aux_y = this.paddle.y;

    this.x = this.paddle.x = other_player.paddle.x;
    this.paddle.y = other_player.paddle.y;

    other_player.x = other_player.paddle.x = aux_x;
    other_player.paddle.y = aux_y;
}


Player.prototype.decrease_hits_to_get_swap_counter = function()
{
    this.hits_to_get_swap--;
    if(this.hits_to_get_swap == 0){
        this.hits_to_get_swap = HITS_TO_GET_SWAP;
        this.n_swaps++;
    }
}


Player.prototype.restart = function()
{
    this.paddle.x = this.initial_position.x;
    this.paddle.y = this.initial_position.y;

    this.x = this.initial_position.x;

    this.score = 0;

    // Swap cooldown and timestamp.
    this.swapCooldown = 0.5;
    this.lastSwapTimestamp = -3.0;
    this.hits_to_get_swap = HITS_TO_GET_SWAP;
    this.n_swaps = 0;
}
