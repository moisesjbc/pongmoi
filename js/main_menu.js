var game = new Phaser.Game(800, 600, Phaser.AUTO, '');
Pongmoi = {};

Pongmoi.MainMenu = function(){}; 
Pongmoi.MainMenu.prototype = 
{
    create : function()
    {
        this.title_label = button_label = this.add.text(0, 0, 'Pongmoi', { fontSize: '64px', fill: '#FFF' });
        this.title_label.position.x = (game.width - this.title_label.width) / 2.0;

        this.play_button = this.create_button('Play', 150, this.on_play_button_click);
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

        button.events.onInputDown.add(callback, this);

        return button;
    }
}

game.state.add('MainMenu',Pongmoi.MainMenu);
