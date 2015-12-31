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
var ball_hit_sound;
var swap_sound;

var win_score = 5;

var victory_label;

var last_ball_player_collision_timestamp = 0;

Pongmoi.GameLoop = function(){}; 
Pongmoi.GameLoop.prototype = 
{
    preload : function()
    {
        game.load.audio('ball_hit', 'assets/sounds/273583__n-audioman__hit3.wav');
        game.load.audio('player_swap', 'assets/sounds/273608__n-audioman__teleport.wav');
    },


    create : function()
    {
        ball_hit_sound = game.add.audio('ball_hit');
        swap_sound = game.add.audio('player_swap');

        // Enable physics
        this.physics.startSystem(Phaser.Physics.ARCADE);

        ball = new Ball(this, 400, 300, 150, 150);
        players_group = this.create_players();
        borders_group = this.create_horizontal_borders();

        player_1_score_text = this.add.text(16, 0, 'Player 1: 0', { fontSize: '16px', fill: '#FFFFFF' });
        player_2_score_text = this.add.text(700, 0, 'Player 2: 0', { fontSize: '16px', fill: '#FFFFFF' });
        player_1_n_swaps_text = this.add.text(16, 580, 'P1 swaps: 0', { fontSize: '16px', fill: '#FFFFFF' });
        player_2_n_swaps_text = this.add.text(700, 580, 'P2 swaps: 0', { fontSize: '16px', fill: '#FFFFFF' });

        // Set inputs
        player_1_up = this.input.keyboard.addKey(Phaser.Keyboard.W);
        player_1_down = this.input.keyboard.addKey(Phaser.Keyboard.S);
        player_1_swap = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        player_2_up = this.input.keyboard.addKey(Phaser.Keyboard.UP);
        player_2_down = this.input.keyboard.addKey(Phaser.Keyboard.DOWN);
        player_2_swap = this.input.keyboard.addKey(Phaser.Keyboard.NUMPAD_0);
    },

    
    update : function() 
    {
        this.physics.arcade.collide(ball.ball, borders_group, this.play_ball_hit_sound);
        this.physics.arcade.collide(ball.ball, player_1.paddle, this.process_ball_hit_player_1, null, this);
        this.physics.arcade.collide(ball.ball, player_2.paddle, this.process_ball_hit_player_2, null, this);
        this.physics.arcade.collide(players_group, borders_group);

        player_1.process_input(game, player_1_up, player_1_down, player_1_swap, player_2);
        player_2.process_input(game, player_2_up, player_2_down, player_2_swap, player_1);

        player_1.update();
        player_2.update();
        ball.update(player_1, player_2);

        player_1_score_text.text = 'P1 score: ' + player_1.score;
        player_2_score_text.text = 'P2 score: ' + player_2.score;
        player_1_n_swaps_text.text = 'P1 swaps: ' + player_1.n_swaps;
        player_2_n_swaps_text.text = 'P2 swaps: ' + player_2.n_swaps;

        if(player_1.score >= win_score || player_2.score >= win_score){
            game.paused = true;
            var victory_text = 'Player 1 wins!';
            var victory_text_color = '#0000FF';
            if(player_1.score < win_score){
                victory_text = 'Player 2 wins!';
                victory_text_color = '#FF0000';
            }
            victory_text += '\n\nPress [ENTER] to restart';
            victory_label = this.add.text(0, 0, victory_text, { fontSize: '40px', fill: victory_text_color, align: 'center' });
            victory_label.x = (game.width - victory_label.width) / 2.0;
            victory_label.y = (game.height - victory_label.height) / 2.0 + 125;
            game.input.keyboard.onDownCallback = this.unpause;
        }
    },


    unpause : function(event){
        // Only act if paused
        if(game.paused && event.keyCode == Phaser.Keyboard.ENTER){
            victory_label.destroy();
            game.paused = false;
            player_1.restart();
            player_2.restart();
            ball.restart();
        }
    },


    create_horizontal_border : function(group, y)
    {
        var border = this.add.bitmapData(800, 20);
        border.ctx.rect(0, 0, 800, 20);
        border.ctx.fillStyle = '#AAAAAA';
        border.ctx.fill();

        var border_sprite = group.create(0, y, border);
        this.physics.arcade.enable(border_sprite);
        border_sprite.body.enable = true;
        border_sprite.body.setSize(800,20);
        border_sprite.body.immovable = true;
    },


    create_horizontal_borders : function()
    {
        var borders_group = this.add.group();
        borders_group.enableBody = true;
        borders_group.physicsBodyType = Phaser.Physics.ARCADE;

        this.create_horizontal_border(borders_group, 0);
        this.create_horizontal_border(borders_group, 580);

        return borders_group;
    },


    create_players : function()
    {
        var players_group = this.add.group();
        players_group.enableBody = true;
        players_group.physicsBodyType = Phaser.Physics.ARCADE;

        player_1 = new Player(this, players_group, 5, 50, '#0000FF', swap_sound);
        player_2 = new Player(this, players_group, 770, 50, '#FF0000', swap_sound);

        return players_group;
    },


    process_ball_hit_player : function(player)
    {
        // A ball-player hit may trigger multiple collisions, so we discard those
        // too close in time.
        if( this.time.totalElapsedSeconds() - last_ball_player_collision_timestamp > 0.5 ){
            this.play_ball_hit_sound();

            last_ball_player_collision_timestamp = this.time.totalElapsedSeconds();
            player.decrease_hits_to_get_swap_counter();
        }
    },


    process_ball_hit_player_1 : function()
    {
        this.process_ball_hit_player(player_1);
    },


    process_ball_hit_player_2 : function()
    {
        this.process_ball_hit_player(player_2);
    },

   
    play_ball_hit_sound : function()
    {
        ball_hit_sound.play('', 0, 0.4);
    }
}


game.state.add('GameLoop',Pongmoi.GameLoop);
game.state.start('MainMenu');
