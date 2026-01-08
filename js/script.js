let mobileMenuVisible = false;

function init() {
    clearGameState();
}

function siteLoaded() {
    window.addEventListener('resize', updatePortraitBlock);
}

function navigateTo(page) {
    window.location.href = `../${page}.html`;
}

function navigateBack() {
    window.history.back();
}

function mobileMenuClick(event, onlyClose = false) {
    const menu = document.getElementById('mobileMenu');
    event.stopPropagation();

    if(onlyClose && !mobileMenuVisible){
        return;
    }

    mobileMenuVisible ? mobileMenuClose(menu) : mobileMenuOpen(menu);

    mobileMenuVisible = !mobileMenuVisible;

}

function mobileMenuClose(menu) {
    menu.classList.remove('visible');
}

function mobileMenuOpen(menu) {
    menu.classList.add('visible');
}