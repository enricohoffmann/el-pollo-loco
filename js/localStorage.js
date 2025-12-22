function safeGameRunningState(running){
    localStorage.setItem('gameRunning', JSON.stringify(running));
}

function loadGameRunningState(){
    const running = localStorage.getItem('gameRunning');
    const state = JSON.parse(running);
    console.log(state);
    return state;
}