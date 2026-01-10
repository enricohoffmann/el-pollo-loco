/**
 * @class AudioManager
 * @description Manages background music and sound effects for the application.
 */

class AudioManager {

    backgroundMusic = null;
    musicEnabled = true;
    sfxEnabled = true;
    musicVolume = 0.3;
    sfxVolume = 0.5;

    /**
     * @description Creates an instance of AudioManager.
     * @memberOf AudioManager
     * @constructor
     */
    constructor() { }

    /**
     * @description Loads background music from the specified source.
     * @memberOf AudioManager
     * @method loadBackgroundMusic
     * @param {string} src - The source URL of the background music.
     * @returns {void}
     */
    loadBackgroundMusic(src) {
        this.backgroundMusic = new Audio(src);
        this.backgroundMusic.loop = true;
        this.backgroundMusic.volume = this.musicVolume;
    }

    /**
     * @description Plays the background music if music is enabled.
     * @memberOf AudioManager
     * @method playBackgroundMusic
     * @returns {void}
     */
    playBackgroundMusic() {
        if (this.musicEnabled && this.backgroundMusic) {
            this.backgroundMusic.play();
        }
    }

    /**
     * @description Pauses the background music.
     * @memberOf AudioManager
     * @method pauseBackgroundMusic
     * @returns {void}
     */
    pauseBackgroundMusic() {
        if (this.backgroundMusic) {
            this.backgroundMusic.pause();
        }
    }

    /**
     * @description Stops the background music and resets its playback position.
     * @memberOf AudioManager
     * @method stopBackgroundMusic
     * @returns {void}
     */
    stopBackgroundMusic() {
        if (this.backgroundMusic) {
            this.backgroundMusic.pause();
            this.backgroundMusic.currentTime = 0;
        }
    }

    /**
     * @description Plays a sound effect if sound effects are enabled.
     * @memberOf AudioManager
     * @method playSoundEffect
     * @param {string} src - The source URL of the sound effect. 
     * @returns {void}
     */
    playSoundEffect(src) {
        if (this.sfxEnabled) {
            const sfx = new Audio(src);
            sfx.volume = this.sfxVolume;
            sfx.play();
        }
    }

    /**
     * @description Toggles the background music on or off.
     * @memberof AudioManager
     * @method toggleMusic
     * @param {boolean} enable - True or False
     */
    toggleMusic(enable){
        this.musicEnabled = enable;
        if (!this.musicEnabled) {
            this.pauseBackgroundMusic();
        } else {
            this.playBackgroundMusic();
        }
    }

    /**
     * @description Toggles the sound effects on or off.
     * @memberof AudioManager
     * @method toggleSFX
     * @param {boolean} enable - True or False
     */
    toggleSFX(enable){
        this.sfxEnabled = enable;
    }
}