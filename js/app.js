function innerDOM() {
  // DOM
  const settingsBtnsEl = document.querySelectorAll(".settings"),
    overSettingsEl = document.querySelector(".settings__over"),
    settingCloseBtnEl = document.querySelector(".setting__close__btn"),
    inputModeEl = document.querySelector(".mode"),
    inputAutoEl = document.querySelector(".auto__play"),
    inputMusicEl = document.querySelector(".music"),
    inputNotifiEl = document.querySelector(".notifications"),
    focusLengthEl = document.querySelector("#focus-length"),
    shortLengthEl = document.querySelector("#short-length"),
    longLengthEl = document.querySelector("#long-length"),
    skipBtnEl = document.querySelector("#timer-skip"),
    timerPlayEl = document.querySelector("#timer-play"),
    timerClockEl = document.querySelector("#timer-clock"),
    timerTitleEl = document.querySelector("#timer-title"),
    timerIconEl = document.querySelector("#timer-icon");

  let interval;
  let val = focusLengthEl.value * 60;
  let settingsObj = {
    toggles: {
      modeToggle: false,
      autoPlayToggle: false,
      musicToggle: false,
      notificationsToggle: true,
      play: false,
    },
    inputVals: {
      focusVal: focusLengthEl.value,
      shortVal: shortLengthEl.value,
    },
    skipCount: 0,
    timerIcon: "./assets/img/svg/focus-brain.svg",
    timerTitle: "Focus",
  };

  timerTitleEl.textContent = settingsObj.timerTitle;

  function getSkip() {
    settingsObj.skipCount++;

    if (settingsObj.skipCount === 3) {
      settingsObj.skipCount = 0;
    }

    if (settingsObj.skipCount === 0) {
      timerTitleEl.textContent = "Focus";
      timerIconEl.src = "/assets/img/svg/focus-brain.svg";
      val = focusLengthEl.value * 60;
      innerTimerClock(+focusLengthEl.value * 60);
      resetTimer(focusLengthEl.value);
    } else if (settingsObj.skipCount === 1) {
      timerIconEl.src = "/assets/img/svg/coffee.svg";
      timerTitleEl.textContent = "Short Break";
      val = shortLengthEl.value * 60;
      innerTimerClock(+shortLengthEl.value * 60);
      resetTimer(shortLengthEl.value);
    } else {
      timerTitleEl.textContent = "Long Break";
      val = longLengthEl.value * 60;
      innerTimerClock(+longLengthEl.value * 60);
      resetTimer(longLengthEl.value);
    }

    if (!settingsObj.toggles.autoPlayToggle) {
      settingsObj.toggles["play"] = false;
      stopTimer();
    }
  }

  function autoPlay() {
    if (settingsObj.toggles.autoPlayToggle) {
      getSkip();
    }
  }

  // get timer clock
  function innerTimerClock(timeLeft) {
    let minutes = Math.floor(timeLeft / 60);
    let secounds = timeLeft % 60;
    let formattedTime = `${minutes.toString().padStart(2, "0")} ${secounds
      .toString()
      .padStart(2, "0")}`;
    timerClockEl.innerHTML = formattedTime;
  }
  innerTimerClock(+settingsObj.inputVals.focusVal * 60);

  // start timer
  function startTimer() {
    interval = setInterval(() => {
      val--;
      innerTimerClock(val);
      if (val === 0) {
        if (settingsObj.toggles["notificationsToggle"]) {
          document.querySelector("#stop-audio").play();
        }
        resetTimer(focusLengthEl.value);
        autoPlay();
      }
    }, 1000);
  }

  // stop timer
  function stopTimer() {
    clearInterval(interval);
    timerPlayEl.querySelector("img").src = "./assets/img/svg/play.svg";
    timerClockEl.style.fontWeight = "200";
  }

  function resetTimer(time) {
    innerTimerClock(time * 60);
    val = time * 60;
    stopTimer();
    playToggle();
  }

  function playToggle() {
    settingsObj.toggles["play"] = !settingsObj.toggles["play"];

    if (settingsObj.toggles["play"]) {
      startTimer();
      timerPlayEl.querySelector("img").src = "./assets/img/svg/pause.svg";
      timerClockEl.style.fontWeight = "800";
      document.querySelector("#start-audio").play();
    } else {
      stopTimer();
    }
  }

  function getInputVal(e) {
    let count = +e.target.value;
    settingsObj.inputVals.focusVal = +count;
    settingsObj.toggles["play"] = false;
    innerTimerClock(count * 60);
    val = count * 60;
    stopTimer();
  }

  // Setting inputs
  function inputToggler(obj, el) {
    settingsObj.toggles[obj] = !settingsObj.toggles[obj];
    if (settingsObj.toggles[obj]) {
      el.classList.add("input__toggle--active");
    } else {
      el.classList.remove("input__toggle--active");
    }
  }

  // Settings Modal
  function showOverSettings() {
    overSettingsEl.classList.add("settings__show");
    overSettingsEl.classList.remove("settings__hide");
  }

  function removeOverSettings() {
    overSettingsEl.classList.remove("settings__show");
    overSettingsEl.classList.add("settings__hide");
  }

  function removeOverBySettings(e) {
    if (e.target && e.target.classList.contains("settings__over")) {
      removeOverSettings();
    }
  }

  document.querySelector(
    ".timer"
  ).style.height = `calc(${document.documentElement.clientHeight}px - 120px)`;

  // Events
  settingsBtnsEl.forEach((item) =>
    item.addEventListener("click", showOverSettings)
  );
  window.addEventListener("keydown", (e) => {
    if (e.keyCode === 27) removeOverSettings();
  });
  settingCloseBtnEl.addEventListener("click", removeOverSettings);
  overSettingsEl.addEventListener("click", removeOverBySettings);
  inputModeEl.addEventListener("click", () =>
    inputToggler("modeToggle", inputModeEl)
  );
  inputAutoEl.addEventListener("click", () =>
    inputToggler("autoPlayToggle", inputAutoEl)
  );
  inputMusicEl.addEventListener("click", () =>
    inputToggler("musicToggle", inputMusicEl)
  );
  inputNotifiEl.addEventListener("click", () =>
    inputToggler("notificationsToggle", inputNotifiEl)
  );

  // play toggle
  timerPlayEl.addEventListener("click", playToggle);
  // input val
  focusLengthEl.addEventListener("input", getInputVal);
  longLengthEl.addEventListener("input", getInputVal);
  shortLengthEl.addEventListener("input", getInputVal);

  // skipped
  skipBtnEl.addEventListener("click", () => {
    getSkip();
    stopTimer();
  });
}

document.addEventListener("DOMContentLoaded", innerDOM);
