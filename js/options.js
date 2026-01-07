let difficultyListOpen = false;
let audioListOpen = false;
let themeListOpen = false;
let currentDifficulty = {};
let currentAudioSetting = '';
let currentTheme = '';
let safeDialogOpen = false;


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


function initOptions() {
    loadCurrentGameSettings();
    updateGameSettingFields();
    updateAudoSetting();
    updateThemeSetting();
    updateDifficultySetting();
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

    if (currentDifficulty === difficultySettings.Custom) {
        document.getElementById('enemyCountInput').removeAttribute('readonly');
        document.getElementById('coinCountInput').removeAttribute('readonly');
        document.getElementById('bottleCountInput').removeAttribute('readonly');
    } else {
        document.getElementById('enemyCountInput').setAttribute('readonly', true);
        document.getElementById('coinCountInput').setAttribute('readonly', true);
        document.getElementById('bottleCountInput').setAttribute('readonly', true);
    }
}

function createGameSettingsObject() {
    return {
        difficulty: getDifficultyNameBySettings(currentDifficulty),
        audioSetting: currentAudioSetting,
        theme: currentTheme
    };
}

function safeCurrentGameSettings() {
    const settings = createGameSettingsObject();
    safeGameSettings(settings);
    showSafeDialog();
    setTimeout(() => {
        safeDialogClose();
    }, 5000);
}

function loadCurrentGameSettings() {
    const settings = loadGameSettings();
    if (settings) {
        currentDifficulty = difficultySettings[settings.difficulty];
        currentAudioSetting = settings.audioSetting;
        currentTheme = settings.theme;
    } else {
        createDeafaultGameSettings();
    }
}

function createDeafaultGameSettings() {
    currentDifficulty = difficultySettings.Easy;
    currentAudioSetting = 'Audio On';
    currentTheme = 'Blue';
}

function updateAudoSetting() {
    if (currentAudioSetting === 'Audio On') {
        document.getElementById('btnAudioOn').classList.add('btn-yellow-active');
        document.getElementById('btnAudioOn').setAttribute('data-selected', 'true');
    } else if (currentAudioSetting === 'Audio Off') {
        document.getElementById('btnAudioOff').classList.add('btn-yellow-active');
        document.getElementById('btnAudioOff').setAttribute('data-selected', 'true');
    }

    document.getElementById('audioInput').value = currentAudioSetting;
}

function updateThemeSetting() {
    if (currentTheme === 'Blue') {
        document.getElementById('btnThemeBlue').classList.add('btn-yellow-active');
        document.getElementById('btnThemeBlue').setAttribute('data-selected', 'true');
    } else if (currentTheme === 'Green') {
        document.getElementById('btnThemeGreen').classList.add('btn-yellow-active');
        document.getElementById('btnThemeGreen').setAttribute('data-selected', 'true');
    } else if (currentTheme === 'Orange') {
        document.getElementById('btnThemeOrange').classList.add('btn-yellow-active');
        document.getElementById('btnThemeOrange').setAttribute('data-selected', 'true');
    }

    document.getElementById('themeInput').value = currentTheme;
}

function updateDifficultySetting() {
    if (currentDifficulty === difficultySettings.Easy) {
        document.getElementById('btnDifficultyEasy').classList.add('btn-yellow-active');
        document.getElementById('btnDifficultyEasy').setAttribute('data-selected', 'true');
    } else if (currentDifficulty === difficultySettings.Medium) {
        document.getElementById('btnDifficultyMedium').classList.add('btn-yellow-active');
        document.getElementById('btnDifficultyMedium').setAttribute('data-selected', 'true');
    } else if (currentDifficulty === difficultySettings.Hard) {
        document.getElementById('btnDifficultyHard').classList.add('btn-yellow-active');
        document.getElementById('btnDifficultyHard').setAttribute('data-selected', 'true');
    } else if (currentDifficulty === difficultySettings.Custom) {
        document.getElementById('btnDifficultyCustom').classList.add('btn-yellow-active');
        document.getElementById('btnDifficultyCustom').setAttribute('data-selected', 'true');
    }

    document.getElementById('difficultyInput').value = getDifficultyNameBySettings(currentDifficulty);
}

function getDifficultyNameBySettings(difficultySettingsObj) {
    for (const [key, value] of Object.entries(difficultySettings)) {
        if (value === difficultySettingsObj) {
            return key;
        }   
    }
    return '';
}

function safeDialogClose() {
    if (safeDialogOpen) {
        const dialog = document.getElementById('safeOptionDialog');
        dialog.close();
        dialog.classList.add('visually-hidden');
        dialog.classList.remove('safe-dialog-show');
        safeDialogOpen = false;
    }
}

function showSafeDialog() {
    const dialog = document.getElementById('safeOptionDialog');
    dialog.classList.remove('visually-hidden');
    dialog.classList.add('safe-dialog-show');
    dialog.showModal();
    safeDialogOpen = true;
}