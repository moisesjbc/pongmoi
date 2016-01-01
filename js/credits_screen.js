Pongmoi.CreditsScreen = function(){}; 
Pongmoi.CreditsScreen.prototype = 
{
    create : function()
    {
        credits_text = 
            'Game developed by Moisés J. Bonilla Caraballo\n' +
            '\n' +
            'Programmed using Javascript and Phaser, the free HTML5 Game Framework\n';
        this.credits_label = this.add.text(0, 0, credits_text, { fontSize: '20px', fill: '#FFFFFF' } );

        this.return_button = create_button(this, 'Return to main menu', this.credits_label.bottom + 10, this.return_to_main_menu);
    },


    return_to_main_menu : function()
    {
        game.state.start('MainMenu');
    }
}
