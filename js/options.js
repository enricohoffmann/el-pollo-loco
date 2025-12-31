let languageListOpen = false;
let difficultyListOpen = false;
let audioListOpen = false;
let themeListOpen = false;
let currentLanguage = '';
let currentDifficulty = '';
let currentAudioSetting = '';
let currentTheme = '';

function showOrHideLanguageList(showOrHide = 'show', buttonID = '') {
    if(showOrHide === 'show'){
        hideNotSelectedLists('lang');
        showLanguageListForSelection();
    } else {
        hideLanguageListForSelection();
    }
}

function showOrHideDifficultyList(showOrHide = 'show', buttonID = '') {
    if(showOrHide === 'show'){
        hideNotSelectedLists('difficulty');
        showDifficultyListForSelection();
    } else {
        hideDifficultyListForSelection();
    }
}

function showOrHideAudioList(showOrHide = 'show', buttonID = '') {
    if(showOrHide === 'show'){
        hideNotSelectedLists('audio');
        showAudioListForSelection();
    } else {
        hideAudioListForSelection();
    }
}

function showOrHideThemeList(showOrHide = 'show', buttonID = '') {
    if(showOrHide === 'show'){
        hideNotSelectedLists('theme');
        showThemeListForSelection();
    } else {
        hideThemeListForSelection();
    }
}

function showLanguageListForSelection(){
    languageListOpen = true;
    const languageListContainer = document.querySelector('#langListContainer');
    const height = getHeightOfSelectButtons('langButtonList') + 29;
    if(languageListContainer){
            languageListContainer.style.maxHeight = `${height}px`;
    }
    const languageButtonsList = document.querySelector('#langButtonList'); 
    if(languageButtonsList){
        languageButtonsList.style.maxHeight = `${height}px`;
    }
    setBorderActiveState('langSelectContainer', true);
}

function showDifficultyListForSelection(){
    difficultyListOpen = true;
    const difficultyListContainer = document.querySelector('#difficultyListContainer');
    const height = getHeightOfSelectButtons('difficultyButtonList') + 29;
    if(difficultyListContainer){
            difficultyListContainer.style.maxHeight = `${height}px`;
    }
    const difficultyButtonsList = document.querySelector('#difficultyButtonList'); 
    if(difficultyButtonsList){
        difficultyButtonsList.style.maxHeight = `${height}px`;
    }
    setBorderActiveState('difficultySelectContainer', true);
}

function showAudioListForSelection(){
    audioListOpen = true;
    const audioListContainer = document.querySelector('#audioListContainer');
    const height = getHeightOfSelectButtons('audioButtonList') + 29;
    if(audioListContainer){
            audioListContainer.style.maxHeight = `${height}px`;
    }
    const audioButtonsList = document.querySelector('#audioButtonList'); 
    if(audioButtonsList){
        audioButtonsList.style.maxHeight = `${height}px`;
    }
    setBorderActiveState('audioSelectContainer', true);
}

function showThemeListForSelection(){
    themeListOpen = true;
    const themeListContainer = document.querySelector('#themeListContainer');
    const height = getHeightOfSelectButtons('themeButtonList') + 29;
    if(themeListContainer){
            themeListContainer.style.maxHeight = `${height}px`;
    }
    const themeButtonsList = document.querySelector('#themeButtonList'); 
    if(themeButtonsList){
        themeButtonsList.style.maxHeight = `${height}px`;
    }
    setBorderActiveState('themeSelectContainer', true);
}

function getHeightOfSelectButtons(listId){
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

function hideLanguageListForSelection(){
    languageListOpen = false;
    const languageListContainer = document.querySelector('#langListContainer');
    if(languageListContainer){
        languageListContainer.style.maxHeight = '0px';
    }
    const languageButtonsList = document.querySelector('#langButtonList'); 
    if(languageButtonsList){
        languageButtonsList.style.maxHeight = '0px';
    }
    setBorderActiveState('langSelectContainer', false);
}
    
function hideDifficultyListForSelection(){
    difficultyListOpen = false;
    const difficultyListContainer = document.querySelector('#difficultyListContainer');
    if(difficultyListContainer){
        difficultyListContainer.style.maxHeight = '0px';
    }
    const difficultyButtonsList = document.querySelector('#difficultyButtonList'); 
    if(difficultyButtonsList){
        difficultyButtonsList.style.maxHeight = '0px';
    }
    setBorderActiveState('difficultySelectContainer', false);
}

function hideAudioListForSelection(){
    audioListOpen = false;
    const audioListContainer = document.querySelector('#audioListContainer');
    if(audioListContainer){
        audioListContainer.style.maxHeight = '0px';
    }
    const audioButtonsList = document.querySelector('#audioButtonList'); 
    if(audioButtonsList){
        audioButtonsList.style.maxHeight = '0px';
    }
    setBorderActiveState('audioSelectContainer', false);
}

function hideThemeListForSelection(){
    themeListOpen = false;
    const themeListContainer = document.querySelector('#themeListContainer');   
    if(themeListContainer){
        themeListContainer.style.maxHeight = '0px';
    }
    const themeButtonsList = document.querySelector('#themeButtonList'); 
    if(themeButtonsList){
        themeButtonsList.style.maxHeight = '0px';
    }
    setBorderActiveState('themeSelectContainer', false);
}


function hideNotSelectedLists(exceptList = ''){
    const currentListState = getCurrentlyOpenList();
    for(const [key, value] of Object.entries(currentListState)){
        if(key !== exceptList && value === true){
            switch(key){
                case 'lang':
                    hideLanguageListForSelection();
                    break;
                case 'difficulty':
                    hideDifficultyListForSelection();
                    break;
                case 'audio':
                    hideAudioListForSelection();
                    break;
                case 'theme':
                    hideThemeListForSelection();
                    break;
                default:
                    break;
            }
        }
    }   
}

function getCurrentlyOpenList(){
    return {
        "lang": languageListOpen,
        "difficulty": difficultyListOpen,
        "audio": audioListOpen,
        "theme": themeListOpen
    };
}

function setShowOrHideButtonIcon(showOrHide = 'show', buttonID = '') {

}

function setBorderActiveState(selectContainerID = '', isActive = false){
    const selectContainer = document.getElementById(selectContainerID);
    if(selectContainer){
        if(isActive){
            selectContainer.classList.add('select-container-active');
        } else {
            selectContainer.classList.remove('select-container-active');
        }
    }
}

function updateSelectedOption(inputID = '', selectedValue = ''){
    const inputElement = document.getElementById(inputID);
    if(inputElement){
        inputElement.value = selectedValue;
    }   
}

function selectLanguage(languageName = '', button = null){
    currentLanguage = languageName;
    updateSelectedOption('languageInput', languageName);
    hideLanguageListForSelection();
    if(button){
        updateActiveButtons(button);
    }
}

function selectDifficulty(difficultyName = '', button = null){
    currentDifficulty = difficultyName;
    updateSelectedOption('difficultyInput', difficultyName);
    hideDifficultyListForSelection();
}

function selectAudioSetting(audioSettingName = '', button = null){
    currentAudioSetting = audioSettingName;
    updateSelectedOption('audioInput', audioSettingName);
    hideAudioListForSelection();
    if(button){
        updateActiveButtons(button);
    }
}

function selectTheme(themeName = '', button = null){
    currentTheme = themeName;
    updateSelectedOption('themeInput', themeName);
    hideThemeListForSelection();
    if(button){
        updateActiveButtons(button);
    }
}

function updateActiveButtons(selectedButton){
    const buttons = selectedButton.parentElement.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.classList.remove('btn-yellow-active');
    });
    selectedButton.classList.add('btn-yellow-active');
}