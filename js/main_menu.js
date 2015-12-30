var game = new Phaser.Game(800, 600, Phaser.AUTO, '');
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
        var music = game.add.audio('music');
        music.play('', 0, 1, true);

        this.title_label = button_label = this.add.text(0, 0, 'Pongmoi', { fontSize: '64px', fill: '#FFF' });
        this.title_label.position.x = (game.width - this.title_label.width) / 2.0;

        button_y = this.create_instructions_labels( this.title_label.position.y + this.title_label.height + 10 );

        this.play_button = this.create_button('Play', button_y, this.on_play_button_click);
    },


    on_play_button_click : function()
    {
        game.state.start('GameLoop');
    },


    create_button : function(button_text, y, callback)
    {
        // Create a bitmap representing the button.
        var button_bitmap = this.add.bitmapData(300, 25);
        button_bitmap.ctx.rect(0, 0, 300, 25);
        button_bitmap.ctx.fillStyle = '#FFFFFF';
        button_bitmap.ctx.fill();

        // Create the button sprite.
        button = this.add.sprite((game.width - 300) / 2.0, y, button_bitmap);

        // Create the button label.
        button_label = this.add.text( 0, 0, button_text, { fontSize: '16px', fill: '#0' });
        button.addChild(button_label);

        // Center label inside the button
        button_label.position.x = (button.width - button_label.width) / 2.0;
        button_label.position.y = (button.height - button_label.height) / 2.0;

        // Enables all kind of input actions on this sprite (click, etc)
        button.inputEnabled = true;

        button.events.onInputOver.add(function(){button_label.fontSize = '18px';}, this);
        button.events.onInputOut.add(function(){button_label.fontSize = '16px';}, this);
        button.events.onInputDown.add(callback, this);

        return button;
    },


    create_instructions_labels : function(y)
    {
        var instructions = 
            "This is like the original Pong but with an extra addon: swapping!              \n" +
            "    - After hitting the ball 3 times you get a swap.                           \n" +
            "    - Activate swap and you'll instantly swap your position with your oponent  \n" +
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
    }
}

game.state.add('MainMenu',Pongmoi.MainMenu);
