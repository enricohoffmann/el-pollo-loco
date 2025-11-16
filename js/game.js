const keyboard = new Keyboard();

function init() {
    
}


window.addEventListener("keydown", (e) => { keyboard.setKey(e.key, true);});
window.addEventListener("keyup", (e) => { keyboard.setKey(e.key, false);});
