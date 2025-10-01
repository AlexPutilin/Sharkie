window.addEventListener('resize', updateScreenMessageVisibility);


// window.addEventListener('contextmenu', function(e) {
//     e.preventDefault();
// });

/**
 * Toggles the "d-none" CSS class on a given element,
 * effectively showing or hiding it.
 * @param {HTMLElement} element - The DOM element to toggle.
 * @returns {void}
 */
function toggleDisplayNone(element) {
    element.classList.toggle('d-none');
}

/**
 * Closes the currently open dialog by hiding the overlay.
 * @returns {void}
 */
function closeDialog() {
    const overlay = document.getElementById('overlay');
    overlay.classList.add('d-none');
}

/**
 * Toggles the overlay visibility and updates its content
 * with the specified dialog template.
 * @param {string} [dialog=""] - The dialog type to display ("controls", "legal-notice", "private-policy").
 * @returns {void}
 */
function toggleDialog(dialog = "") {
    const overlay = document.getElementById('overlay');
    const dialogContent = document.getElementById('dialog-content');
    dialogContent.innerHTML = getDialogContent(dialog);
    toggleDisplayNone(overlay);
}

/**
 * Returns the HTML template string for a given dialog type.
 * @param {string} [dialog=""] - The dialog type to retrieve.
 * @returns {string} The corresponding HTML template string.
 */
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

/**
 * Updates the visibility of the screen orientation message.
 * Shows the message if the game is active and the device is in portrait mode.
 * @returns {void}
 */
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