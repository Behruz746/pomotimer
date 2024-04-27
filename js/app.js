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
    timerPlayEl = document.querySelector("#timer-play"),
    timerClockEl = document.querySelector("#timer-clock");

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
    },
  };

  // get timer clock
  function innerTimerClock(timeLeft) {
    let num = timeLeft * 60;
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
        resetTimer();
      }
    }, 1000);
  }

  // stop timer
  function stopTimer() {
    clearInterval(interval);
    timerPlayEl.querySelector("img").src = "./assets/img/svg/play.svg";
    timerClockEl.style.fontWeight = "200";
  }

  function resetTimer() {
    innerTimerClock(focusLengthEl.value * 60);
    val = focusLengthEl.value * 60;
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

  timerPlayEl.addEventListener("click", playToggle);
  focusLengthEl.addEventListener("input", (e) => {
    let count = +e.target.value;
    settingsObj.inputVals.focusVal = +count;
    settingsObj.toggles["play"] = false;
    innerTimerClock(count * 60);
    val = count * 60;
    stopTimer();
  });

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
}

document.addEventListener("DOMContentLoaded", innerDOM);
