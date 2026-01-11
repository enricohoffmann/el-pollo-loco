/**
 * @file js/script.js
 * @description Contains general functions for site navigation and mobile menu handling.
 * @namespace Script
 */

let mobileMenuVisible = false;

/**
 * @description Initializes the game state by clearing any existing data.
 * @memberOf Script
 * @function init
 * @returns {void}
 */
function init() {
    clearGameState();
}

/**
 * @description Handles actions to be performed when the site is fully loaded.
 * @memberOf Script
 * @function siteLoaded
 * @returns {void}
 */
function siteLoaded() {
    window.addEventListener('resize', updatePortraitBlock);
}

/**
 * @description Navigates to a specified page within the site.
 * @memberOf Script
 * @function navigateTo
 * @param {string} page 
 * @returns {void}
 */
function navigateTo(page) {
    window.location.href = `../${page}.html`;
}

/**
 * @description Navigates back to the previous page in the browser history.
 * @memberOf Script
 * @function navigateBack
 * @returns {void}
 */
function navigateBack() {
    window.history.back();
}

/**
 * @description Toggles the mobile menu visibility based on user interaction.
 * @memberOf Script
 * @function mobileMenuClick
 * @param {Event} event 
 * @param {boolean} onlyClose 
 * @returns {void}
 */
function mobileMenuClick(event, onlyClose = false) {
    const menu = document.getElementById('mobileMenu');
    event.stopPropagation();

    if (onlyClose && !mobileMenuVisible) {
        return;
    }

    mobileMenuVisible ? mobileMenuClose(menu) : mobileMenuOpen(menu);

    mobileMenuVisible = !mobileMenuVisible;

}

/**
 * @description Closes the mobile menu.
 * @memberOf Script
 * @function mobileMenuClose
 * @param {HTMLElement} menu 
 * @returns {void}
 */
function mobileMenuClose(menu) {
    menu.classList.remove('visible');
}

/**
 * @description Opens the mobile menu.
 * @memberOf Script
 * @function mobileMenuOpen
 * @param {HTMLElement} menu 
 * @returns {void}
 */
function mobileMenuOpen(menu) {
    menu.classList.add('visible');
}






