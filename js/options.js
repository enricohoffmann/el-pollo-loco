let languageListOpen = false;

function showOrHideLanguageList(showOrHide = 'show', buttonID = '') {
    if(showOrHide === 'show'){
        showLanguageListForSelection();
    } else {
        hideLanguageListForSelection();
    }
}

function showLanguageListForSelection(){
    languageListOpen = true;
    const languageListContainer = document.querySelector('#langListContainer');
    if(languageListContainer){
        languageListContainer.style.height = 'auto';
    }
}

function hideLanguageListForSelection(){
    languageListOpen = false;
    const languageListContainer = document.querySelector('#langListContainer');
    if(languageListContainer){
        languageListContainer.style.height = '0px';
    }
}
    

function setShowOrHideButtonIcon(showOrHide = 'show', buttonID = '') {

}