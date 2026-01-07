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

