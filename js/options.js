let difficultyListOpen = false;
let audioListOpen = false;
let themeListOpen = false;
let currentDifficulty = 'Easy';
let currentAudioSetting = '';
let currentTheme = '';
let safeDialogOpen = false;


const selectLists = {
    difficulty: {
        openFlag: () => difficultyListOpen,
        setOpenFlag: v => (difficultyListOpen = v),
        containerId: 'difficultyListContainer',
        listId: 'difficultyButtonList',
        selectContainerId: 'difficultySelectContainer',
        toggleBtnId: 'difficultyShowHideBtn',
        inputId: 'difficultyInput',
    },
    audio: {
        openFlag: () => audioListOpen,
        setOpenFlag: v => (audioListOpen = v),
        containerId: 'audioListContainer',
        listId: 'audioButtonList',
        selectContainerId: 'audioSelectContainer',
        toggleBtnId: 'audioShowOrHideBtn',
        inputId: 'audioInput',
    },
    theme: {
        openFlag: () => themeListOpen,
        setOpenFlag: v => (themeListOpen = v),
        containerId: 'themeListContainer',
        listId: 'themeButtonList',
        selectContainerId: 'themeSelectContainer',
        toggleBtnId: 'themeShowHideBtn',
        inputId: 'themeInput',
    }
};



function initOptions() {
    loadCurrentGameSettings();
    updateAudioSetting();
    updateThemeSetting();
    updateDifficultySetting();
    updateGameSettingFields();
}

function showOrHideSelectedList(key, showOrHide = 'show') {
    const config = selectLists[key];
    if (!config) return;

    if (showOrHide === 'show') {
        hideNotSelectedLists(key);
        setShowOrHideButtonIcon(showOrHide, config.toggleBtnId);
        openListForSelection(config);

    } else {
        closeListForSelection(config);
        setShowOrHideButtonIcon(showOrHide, config.toggleBtnId);
    }
}

function openListForSelection(config) {
    config.setOpenFlag(true);
    const listContainer = document.querySelector(`#${config.containerId}`);
    const height = getHeightOfSelectButtons(config.listId) + 29;
    if (listContainer) {
        listContainer.style.maxHeight = `${height}px`;
    }
    const buttonsList = document.querySelector(`#${config.listId}`);
    if (buttonsList) {
        buttonsList.style.maxHeight = `${height}px`;
    }
    setBorderActiveState(config.selectContainerId, true);
}

function closeListForSelection(config) {
    config.setOpenFlag(false);
    const listContainer = document.querySelector(`#${config.containerId}`);
    if (listContainer) {
        listContainer.style.maxHeight = '0';
    }
    const buttonsList = document.querySelector(`#${config.listId}`);
    if (buttonsList) {
        buttonsList.style.maxHeight = '0';
    }
    setBorderActiveState(config.selectContainerId, false);
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


function hideNotSelectedLists(exceptList = '') {
    Object.entries(selectLists).forEach(([key, cfg]) => {
        if (key !== exceptList && cfg.openFlag()) {
            closeList(cfg);
            setShowOrHideButtonIcon('hide', cfg.toggleBtnId);
        }
    });
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

function selectOption(key, value, button) {
    if (button?.getAttribute('data-selected') === 'true') { return; }

    const config = selectLists[key];
    if (!config) return;

    if (key === 'difficulty') { currentDifficulty = value; }
    if (key === 'audio') { currentAudioSetting = value; }
    if (key === 'theme') { currentTheme = value; }

    updateSelectedOption(config.inputId, value);
    closeListForSelection(config);

    if (button) { updateActiveButtons(button); }

    if (key === 'difficulty') { updateGameSettingFields(); }

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

function updateGameSettingFields() {

    const difficulty = difficultySettings[currentDifficulty];

    document.getElementById('enemyCountInput').value = difficulty.countOfEnemies;
    document.getElementById('coinCountInput').value = difficulty.countOfMinCoins;
    document.getElementById('bottleCountInput').value = difficulty.countOfMinBottles;
    document.getElementById('gameLengthInput').value = difficulty.gameLengthFrames;

    const isCustom = currentDifficulty === 'Custom';
    setInputfieldReadonly('enemyCountInput', !isCustom);
    setInputfieldReadonly('coinCountInput', !isCustom);
    setInputfieldReadonly('bottleCountInput', !isCustom);
    setInputfieldReadonly('gameLengthInput', !isCustom);

}

function setInputfieldReadonly(id, readonly = true) {
    const inputField = document.getElementById(id);
    if (!inputField) return;

    if (readonly) {
        inputField.setAttribute('readonly', true);
    } else {
        inputField.removeAttribute('readonly');
    }
}


function createGameSettingsObject() {
    return {
        difficulty: currentDifficulty,
        audioSetting: currentAudioSetting,
        theme: currentTheme,
        countOfEnemies: parseInt(document.getElementById('enemyCountInput').value) || difficultySettings[currentDifficulty].countOfEnemies,
        countOfMinCoins: parseInt(document.getElementById('coinCountInput').value) || difficultySettings[currentDifficulty].countOfMinCoins,
        countOfMinBottles: parseInt(document.getElementById('bottleCountInput').value) || difficultySettings[currentDifficulty].countOfMinBottles,
        gameLengthFrames: parseInt(document.getElementById('gameLengthInput').value) || difficultySettings[currentDifficulty].gameLengthFrames
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
        currentDifficulty = settings.difficulty || 'Easy';
        currentAudioSetting = settings.audioSetting || 'Audio On';
        currentTheme = settings.theme || 'Blue';
        difficultySettings[currentDifficulty].countOfEnemies = settings.countOfEnemies || 3;
        difficultySettings[currentDifficulty].countOfMinCoins = settings.countOfMinCoins || 5;
        difficultySettings[currentDifficulty].countOfMinBottles = settings.countOfMinBottles || 5;
        difficultySettings[currentDifficulty].gameLengthFrames = settings.gameLengthFrames || 3;
    } else {
        createDeafaultGameSettings();
    }
}

function createDeafaultGameSettings() {
    currentDifficulty = 'Easy';
    currentAudioSetting = 'Audio On';
    currentTheme = 'Blue';
}

function setActiveButton(buttonId) {
    const button = document.getElementById(buttonId);
    if (!button) return;

    button.classList.add('btn-yellow-active');
    button.setAttribute('data-selected', 'true');
}

function updateAudioSetting() {
    const map = { 'Audio On': 'btnAudioOn', 'Audio Off': 'btnAudioOff' };
    setActiveButton(map[currentAudioSetting]);
    document.getElementById('audioInput').value = currentAudioSetting;
}

function updateThemeSetting() {
    const map = { Blue: 'btnThemeBlue', Green: 'btnThemeGreen', Orange: 'btnThemeOrange' };
    setActiveButton(map[currentTheme]);
    document.getElementById('themeInput').value = currentTheme;
}

function updateDifficultySetting() {
    const map = {
        Easy: 'btnDifficultyEasy',
        Medium: 'btnDifficultyMedium',
        Hard: 'btnDifficultyHard',
        Custom: 'btnDifficultyCustom'
    };
    setActiveButton(map[currentDifficulty]);
    document.getElementById('difficultyInput').value = currentDifficulty;
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