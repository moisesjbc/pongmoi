function create_button(game_state, button_text, y, callback)
{
    // Create a bitmap representing the button.
    var button_bitmap = game_state.add.bitmapData(300, 25);
    button_bitmap.ctx.rect(0, 0, 300, 25);
    button_bitmap.ctx.fillStyle = '#FFFFFF';
    button_bitmap.ctx.fill();

    var normal_style = { fontSize: '16px', fill: '#000000' };
    var hover_style = { fontSize: '16px', fill: '#999999' };
    

    // Create the button sprite.
    var button = game_state.add.sprite((game.width - 300) / 2.0, y, button_bitmap);

    // Create the button label.
    var button_label = game_state.add.text( 0, 0, button_text, normal_style);
    button.addChild(button_label);

    // Center label inside the button
    button_label.position.x = (button.width - button_label.width) / 2.0;
    button_label.position.y = (button.height - button_label.height) / 2.0;

    // Enables all kind of input actions on this sprite (click, etc)
    button.inputEnabled = true;

    button.events.onInputOver.add(function(){button_label.setStyle(hover_style);}, this);
    button.events.onInputOut.add(function(){button_label.setStyle(normal_style);}, this);
    button.events.onInputDown.add(callback, this);

    return button;
}


function toggle_sound()
{
    game.sound.mute = !game.sound.mute;
}
