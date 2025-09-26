window.addEventListener('resize', updateScreenMessageVisibility);

function toggleDisplayNone(element) {
    element.classList.toggle('d-none');
}


function closeDialog() {
    const overlay = document.getElementById('overlay');
    overlay.classList.add('d-none');
}


function toggleDialog(dialog = "") {
    const overlay = document.getElementById('overlay');
    const dialogContent = document.getElementById('dialog-content');
    dialogContent.innerHTML = getDialogContent(dialog);
    toggleDisplayNone(overlay);
}


function getDialogContent(dialog = "") {
    switch (dialog) {
        case "controls":
            return getControlsTemplate();
        case "legal-notice":
            return getLegalNoticeTemplate();
        case "private-policy":
            return getPrivacyPolicyTemplate();
        default:
            return "Something goes wrong...";
    }
}


function fullscreen() {
    const fullscreen = document.getElementById('fullscreen');
    enterFullscreen(fullscreen)
}


function enterFullscreen(element) {
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
    }
}


function updateScreenMessageVisibility() {
    const gameWindow = document.getElementById('game-window');
    const screenMessage = document.getElementById('screen-message');
    const isPortrait = window.innerWidth < window.innerHeight && window.innerWidth <= 1080;
    const isGameActive = !gameWindow.classList.contains('d-none');
    if (isGameActive && isPortrait) {
        screenMessage.style.display = 'flex';
    } else {
        screenMessage.style.display = 'none';
    }
}