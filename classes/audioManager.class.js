/**
 * @class AudioManager
 * @description Manages background music and sound effects for the application.
 */

musicPlainging = false;

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
            this.backgroundMusic.volume = this.musicVolume;
            this.backgroundMusic.play();
            this.musicPlainging = true;
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
            this.musicPlainging = false;
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
            this.musicPlainging = false;
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

    /**
     * @description Sets the volume for music and sound effects.
     * @memberof AudioManager
     * @method setVolume
     * @param {number} volume 
     */
    setVolume(volume){
        const clampedVolume = Math.max(0, Math.min(10, volume));
        this.musicVolume = clampedVolume / 10 * 0.3;
        this.sfxVolume = clampedVolume / 10 * 0.5;
        if (this.backgroundMusic) {
            this.backgroundMusic.volume = this.musicVolume;
        }
    }

    /**
     * @description Indicates whether the background music is currently playing.
     * @memberof AudioManager
     * @method isMusicPlaying
     * @returns {boolean} True if music is playing, otherwise false.
     */
    get isMusicPlaying() {
        return this.musicPlainging;
    }
    
}