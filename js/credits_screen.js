Pongmoi.CreditsScreen = function(){}; 
Pongmoi.CreditsScreen.prototype = 
{
    create : function()
    {
        credits_text = 
            'Game developed by Moisés J. Bonilla Caraballo\n' +
            '\n' +
            'Programmed using Javascript and Phaser, the free HTML5 Game Framework\n' +
            '\n' +
            '# Third party work #\n' +
            '\n' +
            'All the music and audios have been downloaded from www.freesound.org\n' +
            '\n' +
            '- Song "An 8 bit story" -\n' +
            'uploaded by Aarón C.d.C. (A.K.A James Magnus)\n' +
            '\n' +
            '- Sound "Hit_03.wav" - \n' +
            'uploaded by "LittleRobotSoundFactory"\n' +
            '\n' +
            '- Sound "teleport.wav" -\n' +
            'uploaded by "n_audioman"\n';
            
        this.credits_label = this.add.text(0, 0, credits_text, { fontSize: '20px', fill: '#FFFFFF', align: 'center' } );
        this.credits_label.x = (game.width - this.credits_label.width) / 2.0;

        this.return_button = create_button(this, '[ENTER] - Return to main menu', this.credits_label.bottom + 10, this.return_to_main_menu);

        this.input.keyboard.onDownCallback = this.on_keydown_callback;
        this.input.keyboard.callbackContext = this;
    },


    on_keydown_callback : function(event)
    {
        if(event.keyCode == Phaser.Keyboard.ENTER){
            this.return_to_main_menu();
        }
    },


    return_to_main_menu : function()
    {
        game.state.start('MainMenu');
    }
}
