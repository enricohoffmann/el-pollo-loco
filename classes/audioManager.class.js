class AudioManager {

    backgroundMusic = null;
    musicEnabled = true;
    sfxEnabled = true;
    musicVolume = 0.3;
    sfxVolume = 0.5;



    constructor() {
        
    }

    loadBackgroundMusic(src) {
        this.backgroundMusic = new Audio(src);
        this.backgroundMusic.loop = true;
        this.backgroundMusic.volume = this.musicVolume;
    }

    playBackgroundMusic() {
        if (this.musicEnabled && this.backgroundMusic) {
            this.backgroundMusic.play();
        }
    }

    pauseBackgroundMusic() {
        if (this.backgroundMusic) {
            this.backgroundMusic.pause();
        }
    }

    stopBackgroundMusic() {
        if (this.backgroundMusic) {
            this.backgroundMusic.pause();
            this.backgroundMusic.currentTime = 0;
        }
    }

    playSoundEffect(src) {
        if (this.sfxEnabled) {
            const sfx = new Audio(src);
            sfx.volume = this.sfxVolume;
            sfx.play();
        }
    }

    toggleMusic(enable){
        this.musicEnabled = enable;
        if (!this.musicEnabled) {
            this.pauseBackgroundMusic();
        } else {
            this.playBackgroundMusic();
        }
    }

    toggleSFX(enable){
        this.sfxEnabled = enable;
    }
}