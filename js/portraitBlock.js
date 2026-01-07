/**
 * @description Blocks portrait mode on touch devices with small screens
 */


/**
 * @description Checks if the device is a touch device.
 * @function isTouchDevice
 * @memberof portraitBlock
 * @returns {boolean} True if the device is a touch device, false otherwise.
 */
function isTouchDevice() {
    return matchMedia('(hover: none) and (pointer: coarse)').matches;
}


function isPortrait() {
    return matchMedia('(orientation: portrait)').matches;
}

/**
 * @description Checks if the window width is within the specified maximum width.
 * @function withinMaxWidth
 * @memberof landscapeBlock
 * @param {number} px The maximum width in pixels.
 * @returns {boolean} True if the window width is within the maximum width, false otherwise.
 */
function withinMaxWidth(px) {
    return window.innerWidth <= px;
}

/**
 * @description Updates the portrait block state based on device orientation and size.
 * @function updatePortraitBlock
 * @memberof portraitBlock
 * @returns {void}
 */
function updatePortraitBlock() {
    const active = isTouchDevice() && isPortrait() && withinMaxWidth(1100);

    if (active) {
        document.documentElement.classList.add('portrait-blocked');
        document.querySelector('.portrait-warning')?.removeAttribute('hidden');
    } else {
        document.documentElement.classList.remove('portrait-blocked');
        document.querySelector('.portrait-warning')?.setAttribute('hidden', '');
    }
}

/** 
 * @description Handles visibility change events to update the portrait block state.
 * @memberof portraitBlock
 */ 
document.addEventListener('visibilitychange', updatePortraitBlock);

/**
 * @description Initial call to set the portrait block state on script load.
 * @memberof portraitBlock
 */
updatePortraitBlock();