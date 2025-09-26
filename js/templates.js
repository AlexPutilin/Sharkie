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
                    <div class="key spacebar">Spacebar</div>
                </div>
                <span>Attack</span>
            </div>
        </div>
    `
}


function getLegalNoticeTemplate() {
    return `
        <h2>Legal Notice</h2>
        <span>Information according to § 5 TMG (German Telemedia Act):</span><br>
        <br>
        <span>Alexander Putilin</span><br>
        <span>Germany</span><br>
        <br>
        <span>Email: alexander.putilin@yahoo.de</span><br>
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
        <br><br>
        <table>
            <ul>- No personal data is collected, stored, or processed.</ul>
            <ul>- No cookies are used.</ul>
            <ul>- No tracking (e.g., Google Analytics) is implemented.</ul>
            <ul>- No server logs with personal data are analyzed.</ul>
        </table>
        <br>
        <span>The game can be played completely anonymously.</span>
    `
}

