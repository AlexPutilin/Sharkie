function getControlsTemplate() {
    return `
        <h2>Controls</h2>
        <div class="controls-container">
            <div class="d-row-space">
                <div class="d-col">
                    <div class="key-wrapper">
                        <div class="key">&uarr;</div>
                    </div>
                    <div class="key-wrapper">
                        <div class="key">&larr;</div>
                        <div class="key">&darr;</div>
                        <div class="key">&rarr;</div>
                    </div>
                </div>
                <span>Move</span>
            </div>
            <div class="d-row-space">
                <div class="key-wrapper">
                    <div class="key" style="width: 176px;">Spacebar</div>
                </div>
                <span>Attack</span>
            </div>
        </div>
    `
}


function getLegalNoticeTemplate() {
    return `
        <h2>Legal Notice</h2>
        <span>Information according to § 5 TMG (German Telemedia Act):</span>
        <span>Alexander Putilin</span>
        <span>Germany</span>
        <br>
        <span>Email: alexander.putilin@yahoo.de</span>
        <br>
        <p>
            Responsible for the content according to § 55 Abs. 2 RStV:<br>
            Alexander Putilin
        </p>
    `
}


function getPrivacyPolicyTemplate() {
    return `
        <h2>Privacy Policy</h2>
        <span>This website only provides access to a small browser game.</span>
        <table>
            <ul>No personal data is collected, stored, or processed.</ul>
            <ul>No cookies are used.</ul>
            <ul>No tracking (e.g., Google Analytics) is implemented.</ul>
            <ul>No server logs with personal data are analyzed.</ul>
        </table>
        <span>The game can be played completely anonymously.</span>
    `
}

