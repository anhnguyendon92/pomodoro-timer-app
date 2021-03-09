//
// dialog and buttons
//

const settingsBtn = document.getElementById('cog')
const settingsDiag = document.getElementById('dialog-settings')
const applyBtn = document.getElementById('button-apply')
const closeBtn = document.getElementById('close-button')
const actionBtn = document.getElementById("action")
settingsBtn.addEventListener('click', () => {
    settingsDiag.open = true
})

closeBtn.addEventListener('click', () => {
    settingsDiag.open = false
})

//
// timer class
//

class Timer {
    constructor(settingsObj) {
        this.timerSettings = settingsObj
        this.type = "pomodoro";
        this.circle = document.querySelector('#ring > circle')
        this.clock = document.getElementById("countdown");
        this.actionElmt = document.getElementById("action");
        this.timer = settingsObj.pomodoro;
        this.text = `${this.timer <= 9 ? "0" + this.timer : this.timer}`
    }

    //select
    // 1. get type
    // 2. set timer 
    // 3. reset
    select(selectedType) {
        console.log(selectedType)
        this.type = selectedType
        switch (this.type) {
            case "pomodoro":
                this.timer = this.timerSettings.pomodoro
                this.reset(this.timer)
                this.type = "pomodoro"
                break;
            case "short break":
                this.timer = this.timerSettings.shortBreak
                this.reset(this.timer)
                this.type = "short break"
                break;
            case "long break":
                this.timer = this.timerSettings.longBreak
                this.reset(this.timer)
                this.type = "long break"
                break;
        }
    }
    //settings
    // 1. object: font, timers, colors
    settings(settingsobj) {
        //set values
        this.timerSettings.pomodoro = settingsobj.pomodoro
        this.timerSettings.shortBreak = settingsobj.shortBreak
        this.timerSettings.longBreak = settingsobj.longBreak
        this.select(this.type)
        //set font
        let fontClass = document.getElementsByClassName("font-class")
        console.log(fontClass)
        console.log(settingsobj.font)
        for (const i of fontClass) {
            i.style.fontFamily = settingsobj.font
        }

        //set color
        let navButton = document.getElementById("bg-indicator")
        console.log(this.circle)
        navButton.style.backgroundColor = settingsobj.color
        this.circle.style.stroke = settingsobj.color
    }

    reset(defaultTime = this.timer) {
        //stop the timer
        this.stop();
        this.timer = defaultTime
        this.text = `${this.timer <= 9 ? "0" + this.timer : this.timer}`
        this.actionElmt.innerHTML = "start"
        //text reset
        this.clock.innerHTML = this.text + ":00"
        this.circle.style.strokeDashoffset = 1024
        //timer reset
        //action to reset
    }
    start() {
        function format(timeFormat) {
            return timeFormat < 10 ? `0${timeFormat}` : `${timeFormat}`;
        }
        this.clock.innerHTML = `${this.text}:00`
        this.circle.style.strokeDashoffset = 1024

        let time = this.timer * 60;
        let startTime = time;
        let minutes = 0;
        let seconds = 0;
        time--
        //timer count by secs
        this.interval = setInterval(() => {

            minutes = Math.floor(time / 60);
            seconds = Math.floor(time % 60);

            //change clock text
            let minutesText = format(minutes);
            let secondsText = format(seconds);

            this.clock.innerHTML = `${minutesText}:${secondsText}`;
            const percent = ((time % startTime) / startTime)
            const offset = percent * 1024;
            this.circle.style.strokeDashoffset = offset;
            console.log(percent)
            if (--time < 0) {
                this.time = 0

                clearInterval(this.interval);
            }
            return timer
        }, 1000);

        //action text change
        this.actionElmt.innerHTML = 'pause'
    }

    stop() {
        //pause time
        clearInterval(this.interval);
        this.actionElmt.innerHTML = "start"
    }
}

//
// Timer Functions
//
let DEFsettingsObj = {
    pomodoro: 25,
    shortBreak: 5,
    longBreak: 15,
    font: "'Kumbh Sans', sans-serif",
    color: "var(--orange)"
}
const countdownTimer = new Timer(DEFsettingsObj);
countdownTimer.reset();

function action(str) {

    switch (str.toLowerCase()) {
        case "start":
            countdownTimer.start()
            break;
        default:
            countdownTimer.stop()
            break;
    }
}

//
// Nav functions
//


const navLinks = document.querySelectorAll("nav > ul > li")
const navBg = document.getElementById("bg-indicator")
navLinks.forEach((navLink, index) => {

    navLink.addEventListener("click", (ev) => {

        console.log(navLink, index)
        navLinks.forEach(link => link.classList.remove("active"))

        countdownTimer.select(navLink.innerHTML)

        navBg.style.marginLeft = `calc(calc(100%/3) * ${index})`;
        ev.target.classList.add("active")
    })

})

//
// Settings Pseudo-code
// 

let fontSetting = DEFsettingsObj.font
let colorSetting = DEFsettingsObj.color
const inputBtn = document.querySelectorAll("label > input")
console.log(inputBtn)
inputBtn.forEach(input => {
    input.addEventListener("click", () => {
        let setting = input.id
        if (setting === "kumbh" || setting === "roboto" || setting === "space") {
            if (setting === "kumbh") { fontSetting = "'Kumbh Sans', sans-serif" }
            if (setting === "roboto") { fontSetting = "'Roboto Slab', serif" }
            if (setting === "space") {
                fontSetting = "'Space Mono', monospace"
            }
        }
        else {
            if (setting === "orange-id") { colorSetting = "var(--orange)" }
            if (setting === "cyan-id") { colorSetting = "var(--cyan)" }
            if (setting === "magenta-id") {
                colorSetting = "var(--purple)"
            }
        }

    })
})
applyBtn.addEventListener('click', () => {
    settingsDiag.open = false
    let NEWsettingsObj = {
        pomodoro: parseInt(document.getElementById("select-pomodoro").value),
        shortBreak: parseInt(document.getElementById("select-short-break").value),
        longBreak: parseInt(document.getElementById("select-long-break").value),
        font: fontSetting,
        color: colorSetting
    }
    console.log(NEWsettingsObj)
    countdownTimer.settings(NEWsettingsObj)
})