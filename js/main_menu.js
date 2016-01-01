Pongmoi = {};

Pongmoi.MainMenu = function(){}; 
Pongmoi.MainMenu.prototype = 
{
    preload : function()
    {
        game.load.audio('music', 'assets/music/An_8_Bit_Story.ogg');
    },


    create : function()
    {
        // Play music   
        if(typeof this.music == 'undefined'){
            this.music = game.add.audio('music');
        }
        if(!this.music.isPlaying){
            this.music.play('', 0, 1, true);
        }

        this.title_label = button_label = this.add.text(0, 0, 'Pongmoi', { fontSize: '64px', fill: '#FFF' });
        this.title_label.position.x = (game.width - this.title_label.width) / 2.0;
        
        this.version_label = this.add.text(0, 0, 'v1.1.0', { fontSize: '16px', fill: '#FFF' });
        this.version_label.x = game.width - this.version_label.width - 10;
        this.version_label.y = game.height - this.version_label.height - 10; 

        button_y = this.create_instructions_labels( this.title_label.position.y + this.title_label.height + 10 );

        this.play_button = create_button(this, '[ENTER] - Play', button_y, this.on_play_button_click);
        this.toggle_sound_button = create_button(this, '[M] - Toggle sound ON/OFF', this.play_button.bottom + 10, toggle_sound);
        this.credits_button = create_button(this, '[C] - Credits', this.toggle_sound_button.bottom + 10, this.on_credits_button_click);
        
        this.input.keyboard.onDownCallback = this.on_keydown_callback;
        this.input.keyboard.callbackContext = this;
    },


    on_keydown_callback : function(event)
    {
        if(event.keyCode == Phaser.Keyboard.ENTER){
            this.on_play_button_click();
        }else if(event.keyCode == Phaser.Keyboard.M){
            toggle_sound();
        }else if(event.keyCode == Phaser.Keyboard.C){
            this.on_credits_button_click();
        }
    },


    on_play_button_click : function()
    {
        game.state.start('GameLoop');
    },


    on_credits_button_click : function()
    {
        game.state.start('CreditsScreen');
    },


    create_instructions_labels : function(y)
    {
        var instructions = 
            "This is a typical Pong FOR TWO PLAYERS but with an extra addon: swapping!      \n" +
            "    - After hitting the ball " + HITS_TO_GET_SWAP + " times you get a swap.                           \n" +
            "    - Activate swap and you'll instantly swap your position with your oponent  \n" +
            "                                                                               \n" +
            "    - First player to score " + WIN_SCORE + " points wins!                                     \n" +
            "                                                                               \n" +
            "Controls:                                                                      \n";

        this.instructions = this.add.text(0, 30, instructions, { fontSize: '16px', fill: '#FFF' });
        this.instructions.position.x = (game.width - this.instructions.width) / 2.0;
        this.instructions.position.y = y;

        var player_1_controls_str =
            'Player 1:\n' +
            '   up - w\n' +
            '   down - s\n' +
            '   swap - spacebar\n';
        var player_2_controls_str =
            'Player 2:\n' +
            '   up - up arrow\n' +
            '   down - down arrow\n' +
            '   swap - numpad 0\n';

        var controls_str_y = this.instructions.position.y + this.instructions.height;
        this.player_1_controls = this.add.text(0, 0, player_1_controls_str, { fontSize: '16px', fill: '#5555FF' });
        this.player_2_controls = this.add.text(0, 0, player_2_controls_str, { fontSize: '16px', fill: '#FF5555' });

        var controls_margin = 75;
        this.player_1_controls.position.x = this.instructions.position.x + controls_margin;
        this.player_1_controls.position.y = controls_str_y;

        this.player_2_controls.position.x = this.instructions.position.x + this.instructions.width - this.player_2_controls.width - controls_margin;
        this.player_2_controls.position.y = controls_str_y;

        return this.player_1_controls.position.y + this.player_1_controls.height + 10;
    },


    shutdown : function()
    {
        this.input.keyboard.onDownCallback = undefined;
    }
}
