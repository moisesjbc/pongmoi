var WIN_SCORE = 5;

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
        this.last_ball_player_collision_timestamp = 0;

        this.sounds =
        {
            ball_hit    : game.add.audio('ball_hit'),
            swap        : game.add.audio('player_swap')
        };
        
        // Enable physics
        this.physics.startSystem(Phaser.Physics.ARCADE);

        this.ball = new Ball(this, 400, 300, 150, 150);
        this.groups =
        {
            players : this.create_players(),
            borders : this.create_horizontal_borders()
        };

        this.gui =
        {
            player_1_score_text     : this.add.text(16, 0, 'Player 1: 0', { fontSize: '16px', fill: '#FFFFFF' }),
            player_2_score_text     : this.add.text(700, 0, 'Player 2: 0', { fontSize: '16px', fill: '#FFFFFF' }),
            player_1_n_swaps_text   : this.add.text(16, 580, 'P1 swaps: 0', { fontSize: '16px', fill: '#FFFFFF' }),
            player_2_n_swaps_text   : this.add.text(700, 580, 'P2 swaps: 0', { fontSize: '16px', fill: '#FFFFFF' })
        };

        // Set inputs
        this.player_1_controls =
        {
            up      : this.input.keyboard.addKey(Phaser.Keyboard.W),
            down    : this.input.keyboard.addKey(Phaser.Keyboard.S),
            swap    : this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR)
        };
        this.player_2_controls =
        {
            up      : this.input.keyboard.addKey(Phaser.Keyboard.UP),
            down    : this.input.keyboard.addKey(Phaser.Keyboard.DOWN),
            swap    : this.input.keyboard.addKey(Phaser.Keyboard.NUMPAD_0)
        };
        this.pause_key = this.input.keyboard.addKey(Phaser.Keyboard.ESC);
    },

    
    update : function() 
    {
        this.physics.arcade.collide(this.ball.ball, this.groups.borders, this.play_ball_hit_sound, null, this);
        this.physics.arcade.collide(this.ball.ball, this.player_1.paddle, this.process_ball_hit_player_1, null, this);
        this.physics.arcade.collide(this.ball.ball, this.player_2.paddle, this.process_ball_hit_player_2, null, this);
        this.physics.arcade.collide(this.groups.players, this.groups.borders);

        this.player_1.process_input(game, this.player_1_controls, this.player_2);
        this.player_2.process_input(game, this.player_2_controls, this.player_1);

        if(this.pause_key.isDown){
            game.paused = true;

            var pause_text = 
                'Game paused\n' +
                '\n' +
                '[ESC] - Resume game\n' +
                '[M] - Toggle sound ON/OFF\n' +
                '[ENTER] - Return to main menu\n';

            pause_label = this.add.text(0,0, pause_text, { fontSize: '20px', fill: '#DDDDDD' });
            pause_label.x = (game.width - pause_label.width) / 2.0;
            pause_label.y = (game.height - pause_label.height) / 2.0;

            game.input.keyboard.onDownCallback = this.unpause;
            game.input.keyboard.callbackContext = this;
        }

        this.player_1.update();
        this.player_2.update();
        this.ball.update(this.player_1, this.player_2);

        this.gui.player_1_score_text.text = 'P1 score: ' + this.player_1.score;
        this.gui.player_2_score_text.text = 'P2 score: ' + this.player_2.score;
        this.gui.player_1_n_swaps_text.text = 'P1 swaps: ' + this.player_1.n_swaps;
        this.gui.player_2_n_swaps_text.text = 'P2 swaps: ' + this.player_2.n_swaps;

        if(this.player_1.score >= WIN_SCORE || this.player_2.score >= WIN_SCORE){
            game.paused = true;
            var victory_text = 'Player 1 wins!';
            var victory_text_color = '#0000FF';
            if(this.player_1.score < WIN_SCORE){
                victory_text = 'Player 2 wins!';
                victory_text_color = '#FF0000';
            }
            victory_text += '\n\nPress [ENTER] to restart';
            this.gui.victory_label = this.add.text(0, 0, victory_text, { fontSize: '40px', fill: victory_text_color, align: 'center' });
            this.gui.victory_label.x = (game.width - this.gui.victory_label.width) / 2.0;
            this.gui.victory_label.y = (game.height - this.gui.victory_label.height) / 2.0 + 125;
            game.input.keyboard.onDownCallback = this.unpause_victory;
            game.input.keyboard.callbackContext = this;
        }
    },


    unpause_victory : function(event){
        // Only act if paused
        if(game.paused && event.keyCode == Phaser.Keyboard.ENTER){
            game.paused = false;

            this.gui.victory_label.destroy();

            this.player_1.restart();
            this.player_2.restart();
            this.ball.restart();
        }
    },

    
    unpause : function(event){
        // Only act if paused
        if(game.paused){
            if(event.keyCode == Phaser.Keyboard.ESC || event.keyCode == Phaser.Keyboard.ENTER){
                game.paused = false;
                pause_label.destroy();
                if(event.keyCode == Phaser.Keyboard.ENTER){
                    game.state.start('MainMenu');
                }
            }else if(event.keyCode == Phaser.Keyboard.M){
                toggle_sound();
            }
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

        this.player_1 = new Player(this, players_group, 5, 50, '#0000FF', this.sounds.swap);
        this.player_2 = new Player(this, players_group, 770, 50, '#FF0000', this.sounds.swap);

        return players_group;
    },


    process_ball_hit_player : function(player)
    {
        // A ball-player hit may trigger multiple collisions, so we discard those
        // too close in time.
        if( this.time.totalElapsedSeconds() - this.last_ball_player_collision_timestamp > 0.5 ){
            this.play_ball_hit_sound();

            this.last_ball_player_collision_timestamp = this.time.totalElapsedSeconds();
            player.decrease_hits_to_get_swap_counter();
        }
    },


    process_ball_hit_player_1 : function()
    {
        this.process_ball_hit_player(this.player_1);
    },


    process_ball_hit_player_2 : function()
    {
        this.process_ball_hit_player(this.player_2);
    },

   
    play_ball_hit_sound : function()
    {
        this.sounds.ball_hit.play('', 0, 0.4);
    },


    shutdown : function()
    {
        this.input.keyboard.onDownCallback = undefined;
    }
}
