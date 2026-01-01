let languageListOpen = false;
let difficultyListOpen = false;
let audioListOpen = false;
let themeListOpen = false;
let currentLanguage = '';
let currentDifficulty = {};
let currentAudioSetting = '';
let currentTheme = '';


const difficultySettings = {
    Easy: {
        countOfEnemies: 3,
        countOfMinCoins: 5,
        countOfMinBottles: 5,
    },
    Medium: {
        countOfEnemies: 5,
        countOfMinCoins: 10,
        countOfMinBottles: 7,
    },
    Hard: {
        countOfEnemies: 7,
        countOfMinCoins: 15,
        countOfMinBottles: 10,
    },
    Custom: {
        countOfEnemies: 0,  
        countOfMinCoins: 0,
        countOfMinBottles: 0,
    }
};



//Beim Start der Seite prüfen, ob schon eine Sprache ausgewählt wurde, sonst Englisch als Standard setzen
//Beim Start prüfen, ob schon eine Schwierigkeit ausgewählt wurde, sonst Easy als Standard setzen
//Themes und Audio ebenfalls prüfen, sonst Audio: On und Theme: blue als Standard setzen


function showOrHideLanguageList(showOrHide = 'show', buttonID = '') {
    if (showOrHide === 'show') {
        hideNotSelectedLists('lang');
        setShowOrHideButtonIcon(showOrHide, buttonID);
        showLanguageListForSelection();
    } else {
        hideLanguageListForSelection();
        setShowOrHideButtonIcon(showOrHide, buttonID);
    }
}

function showOrHideDifficultyList(showOrHide = 'show', buttonID = '') {
    if (showOrHide === 'show') {
        hideNotSelectedLists('difficulty');
        setShowOrHideButtonIcon(showOrHide, buttonID);
        showDifficultyListForSelection();
    } else {
        hideDifficultyListForSelection();
        setShowOrHideButtonIcon(showOrHide, buttonID);
    }
}

function showOrHideAudioList(showOrHide = 'show', buttonID = '') {
    if (showOrHide === 'show') {
        hideNotSelectedLists('audio');
        setShowOrHideButtonIcon(showOrHide, buttonID);
        showAudioListForSelection();
    } else {
        hideAudioListForSelection();
        setShowOrHideButtonIcon(showOrHide, buttonID);
    }
}

function showOrHideThemeList(showOrHide = 'show', buttonID = '') {
    if (showOrHide === 'show') {
        hideNotSelectedLists('theme');
        setShowOrHideButtonIcon(showOrHide, buttonID);
        showThemeListForSelection();
    } else {
        hideThemeListForSelection();
        setShowOrHideButtonIcon(showOrHide, buttonID);
    }
}

function showLanguageListForSelection() {
    languageListOpen = true;
    const languageListContainer = document.querySelector('#langListContainer');
    const height = getHeightOfSelectButtons('langButtonList') + 29;
    if (languageListContainer) {
        languageListContainer.style.maxHeight = `${height}px`;
    }
    const languageButtonsList = document.querySelector('#langButtonList');
    if (languageButtonsList) {
        languageButtonsList.style.maxHeight = `${height}px`;
    }
    setBorderActiveState('langSelectContainer', true);
}

function showDifficultyListForSelection() {
    difficultyListOpen = true;
    const difficultyListContainer = document.querySelector('#difficultyListContainer');
    const height = getHeightOfSelectButtons('difficultyButtonList') + 29;
    if (difficultyListContainer) {
        difficultyListContainer.style.maxHeight = `${height}px`;
    }
    const difficultyButtonsList = document.querySelector('#difficultyButtonList');
    if (difficultyButtonsList) {
        difficultyButtonsList.style.maxHeight = `${height}px`;
    }
    setBorderActiveState('difficultySelectContainer', true);
}

function showAudioListForSelection() {
    audioListOpen = true;
    const audioListContainer = document.querySelector('#audioListContainer');
    const height = getHeightOfSelectButtons('audioButtonList') + 29;
    if (audioListContainer) {
        audioListContainer.style.maxHeight = `${height}px`;
    }
    const audioButtonsList = document.querySelector('#audioButtonList');
    if (audioButtonsList) {
        audioButtonsList.style.maxHeight = `${height}px`;
    }
    setBorderActiveState('audioSelectContainer', true);
}

function showThemeListForSelection() {
    themeListOpen = true;
    const themeListContainer = document.querySelector('#themeListContainer');
    const height = getHeightOfSelectButtons('themeButtonList') + 29;
    if (themeListContainer) {
        themeListContainer.style.maxHeight = `${height}px`;
    }
    const themeButtonsList = document.querySelector('#themeButtonList');
    if (themeButtonsList) {
        themeButtonsList.style.maxHeight = `${height}px`;
    }
    setBorderActiveState('themeSelectContainer', true);
}

function getHeightOfSelectButtons(listId) {
    let totalHeight = 0;
    const listContainer = document.getElementById(listId);
    const styleContainer = window.getComputedStyle(listContainer);
    const paddingTop = parseFloat(styleContainer.paddingTop);
    const paddingBottom = parseFloat(styleContainer.paddingBottom);
    const listGap = parseFloat(styleContainer.gap);
    totalHeight += paddingTop + paddingBottom;
    const buttons = document.querySelectorAll(`#${listId} .btn`);

    buttons.forEach(button => {
        const style = window.getComputedStyle(button);
        const marginTop = parseFloat(style.marginTop);
        const marginBottom = parseFloat(style.marginBottom);
        totalHeight += button.offsetHeight + marginTop + marginBottom + listGap;
    });
    return totalHeight;
}

function hideLanguageListForSelection() {
    languageListOpen = false;
    const languageListContainer = document.querySelector('#langListContainer');
    if (languageListContainer) {
        languageListContainer.style.maxHeight = '0px';
    }
    const languageButtonsList = document.querySelector('#langButtonList');
    if (languageButtonsList) {
        languageButtonsList.style.maxHeight = '0px';
    }
    setBorderActiveState('langSelectContainer', false);
}

function hideDifficultyListForSelection() {
    difficultyListOpen = false;
    const difficultyListContainer = document.querySelector('#difficultyListContainer');
    if (difficultyListContainer) {
        difficultyListContainer.style.maxHeight = '0px';
    }
    const difficultyButtonsList = document.querySelector('#difficultyButtonList');
    if (difficultyButtonsList) {
        difficultyButtonsList.style.maxHeight = '0px';
    }
    setBorderActiveState('difficultySelectContainer', false);
}

function hideAudioListForSelection() {
    audioListOpen = false;
    const audioListContainer = document.querySelector('#audioListContainer');
    if (audioListContainer) {
        audioListContainer.style.maxHeight = '0px';
    }
    const audioButtonsList = document.querySelector('#audioButtonList');
    if (audioButtonsList) {
        audioButtonsList.style.maxHeight = '0px';
    }
    setBorderActiveState('audioSelectContainer', false);
}

function hideThemeListForSelection() {
    themeListOpen = false;
    const themeListContainer = document.querySelector('#themeListContainer');
    if (themeListContainer) {
        themeListContainer.style.maxHeight = '0px';
    }
    const themeButtonsList = document.querySelector('#themeButtonList');
    if (themeButtonsList) {
        themeButtonsList.style.maxHeight = '0px';
    }
    setBorderActiveState('themeSelectContainer', false);
}


function hideNotSelectedLists(exceptList = '') {
    const currentListState = getCurrentlyOpenList();
    for (const [key, value] of Object.entries(currentListState)) {
        if (key !== exceptList && value === true) {
            switch (key) {
                case 'lang':
                    hideLanguageListForSelection();
                    setShowOrHideButtonIcon('hide', 'langShowOrHideBtn');
                    break;
                case 'difficulty':
                    hideDifficultyListForSelection();
                    setShowOrHideButtonIcon('hide', 'difficultyShowHideBtn');
                    break;
                case 'audio':
                    hideAudioListForSelection();
                    setShowOrHideButtonIcon('hide', 'audioShowOrHideBtn');
                    break;
                case 'theme':
                    hideThemeListForSelection();
                    setShowOrHideButtonIcon('hide', 'themeShowHideBtn');
                    break;
                default:
                    break;
            }
        }
    }
}

function getCurrentlyOpenList() {
    return {
        "lang": languageListOpen,
        "difficulty": difficultyListOpen,
        "audio": audioListOpen,
        "theme": themeListOpen
    };
}

function setShowOrHideButtonIcon(showOrHide = 'show', buttonID = '') {
    const button = document.getElementById(buttonID);
    if (button) {
       if (showOrHide === 'hide') {
            button.classList.remove('btn-hide');
            button.classList.add('btn-show');
        } else {
            button.classList.remove('btn-show');
            button.classList.add('btn-hide');
        }
    }

}

function setBorderActiveState(selectContainerID = '', isActive = false) {
    const selectContainer = document.getElementById(selectContainerID);
    if (selectContainer) {
        if (isActive) {
            selectContainer.classList.add('select-container-active');
        } else {
            selectContainer.classList.remove('select-container-active');
        }
    }
}

function updateSelectedOption(inputID = '', selectedValue = '') {
    const inputElement = document.getElementById(inputID);
    if (inputElement) {
        inputElement.value = selectedValue;
    }
}

function selectLanguage(languageName = '', button = null) {
    if (button.getAttribute('data-selected') === 'true') {
        return;
    }
    currentLanguage = languageName;
    updateSelectedOption('languageInput', languageName);
    hideLanguageListForSelection();
    if (button) {
        updateActiveButtons(button);
    }
}

function selectDifficulty(difficultyName = '', button = null) {
    if (button.getAttribute('data-selected') === 'true') {
        return;
    }
    currentDifficulty = difficultyName;
    updateSelectedOption('difficultyInput', difficultyName);
    hideDifficultyListForSelection();
    updateGameDifficultySettings(difficultyName);
    if (button) {
        updateActiveButtons(button);
    }
}

function selectAudioSetting(audioSettingName = '', button = null) {
    if (button.getAttribute('data-selected') === 'true') {
        return;
    }
    currentAudioSetting = audioSettingName;
    updateSelectedOption('audioInput', audioSettingName);
    hideAudioListForSelection();
    if (button) {
        updateActiveButtons(button);
    }
}

function selectTheme(themeName = '', button = null) {
    if (button.getAttribute('data-selected') === 'true') {
        return;
    }
    currentTheme = themeName;
    updateSelectedOption('themeInput', themeName);
    hideThemeListForSelection();
    if (button) {
        updateActiveButtons(button);
    }
}

function updateActiveButtons(selectedButton) {
    const buttons = selectedButton.parentElement.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.classList.remove('btn-yellow-active');
        button.setAttribute('data-selected', 'false');
    });
    selectedButton.classList.add('btn-yellow-active');
    selectedButton.setAttribute('data-selected', 'true');
}

function updateGameDifficultySettings(difficultyName = '') {
    currentDifficulty = difficultySettings[difficultyName];
    updateGameSettingFields();
}

function updateGameSettingFields() {
    document.getElementById('enemyCountInput').value = currentDifficulty.countOfEnemies;
    document.getElementById('coinCountInput').value = currentDifficulty.countOfMinCoins;
    document.getElementById('bottleCountInput').value = currentDifficulty.countOfMinBottles;

    if(currentDifficulty === difficultySettings.custom) {
        document.getElementById('enemyCountInput').removeAttribute('readonly');
        document.getElementById('coinCountInput').removeAttribute('readonly');
        document.getElementById('bottleCountInput').removeAttribute('readonly');
    } else {
        document.getElementById('enemyCountInput').setAttribute('readonly', true);
        document.getElementById('coinCountInput').setAttribute('readonly', true);
        document.getElementById('bottleCountInput').setAttribute('readonly', true);
    }
}

