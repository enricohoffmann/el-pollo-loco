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
    unlocked = false;

    /**
     * @description Creates an instance of AudioManager.
     * @memberOf AudioManager
     * @constructor
     */
    constructor() { }

    /**
     * @description Enables autoplay unlock by adding event listeners for user interaction.
     * @memberOf AudioManager
     * @method enableAutoplayUnlock
     * @returns {void}
     */
    enableAutoplayUnlock() {
        const unlock = () => {
            this.unlocked = true;
            if( this.musicEnabled && !this.musicPlainging) {
                this.playBackgroundMusic();
            }
        };

        window.addEventListener('pointerdown', unlock, { once: true });
        window.addEventListener('keydown', unlock, { once: true });
        window.addEventListener('touchstart', unlock, { once: true });
    }

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
        //this.musicVolume = this.clampVolume(this.toFiniteNumber(this.musicVolume, 0.3));
        //this.backgroundMusic.volume = this.musicVolume;
    }

    /**
     * @description Plays the background music if music is enabled.
     * @memberOf AudioManager
     * @method playBackgroundMusic
     * @returns {void}
     */
    async playBackgroundMusic() {
        if (this.musicEnabled && this.backgroundMusic) {
            this.backgroundMusic.volume = this.musicVolume;
            try {
                await this.backgroundMusic.play();
                this.musicPlainging = true;
            } catch (e) {
                this.musicPlainging = false;
            }
           
        }
    }

    /**
     * @description Unlocks audio playback and plays background music.
     * @memberOf AudioManager
     * @method unlockAudio
     * @returns {void}
     */
    unlockAudio() {
        this.unlocked = true;
        this.playBackgroundMusic();
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
        this.musicVolume = clampedVolume / 10;
        this.sfxVolume = clampedVolume / 10 * 0.8;
        this.musicEnabled = this.musicVolume > 0;
        this.sfxEnabled = this.sfxVolume > 0;

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

    /**
     * @description Converts a value to a finite number, returning a default value if conversion fails.
     * @param {number} value 
     * @param {number} defaultValue 
     * @returns {number}
     */
    toFiniteNumber(value, defaultValue) {
        const number = Number(value);
        return isFinite(number) ? number : defaultValue;
    }

    /**
     * @description Clamps the volume between 0 and 1.
     * @memberof AudioManager
     * @method clampVolume
     * @param {number} volume 
     * @returns 
     */
    clampVolume(volume) {
        return Math.max(1, Math.min(0, volume));
    }
    
}