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
    timerIconEl = document.querySelector("#timer-icon"),
    timerMusicEl = document.querySelector("#timer-music");

  let interval;
  let val = focusLengthEl.value * 60;

  let settingsObj = {
    toggles: {
      modeToggle: localStorage.getItem("darkMode") === "true",
      autoPlayToggle: localStorage.getItem("autoPlay") === "true",
      musicToggle: localStorage.getItem("playMusic") === "true",
      notificationsToggle: localStorage.getItem("NotifiCall") === "true",
      play: false,
    },
    inputVals: {
      focusVal: focusLengthEl.value,
      shortVal: shortLengthEl.value,
      longVal: longLengthEl.value,
    },
    skipCount: 0,
    timerIcon: "./assets/img/svg/focus-brain.svg",
    timerTitle: "Focus",
  };

  // skip
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

  // skip auto play
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
        if (settingsObj.toggles.notificationsToggle) {
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
    timerMusicEl.pause();
  }

  function resetTimer(time) {
    innerTimerClock(time * 60);
    val = time * 60;
    stopTimer();
    playToggle();
  }

  function timerStartMusic() {
    if (settingsObj.toggles.musicToggle && settingsObj.toggles.play) {
      timerMusicEl.play();
      timerMusicEl.loop = true;
      timerMusicEl.volume = 0.4;
      timerMusicEl.autoplay = true;
    }
  }

  function playToggle() {
    settingsObj.toggles["play"] = !settingsObj.toggles["play"];
    function timerPlay() {
      if (settingsObj.toggles.notificationsToggle) {
        document.querySelector("#start-audio").play();
        document.querySelector("#start-audio").currentTime = 0;
      }
      timerStartMusic();
      startTimer();
      timerPlayEl.querySelector("img").src = "./assets/img/svg/pause.svg";
      timerClockEl.style.fontWeight = "800";
    }

    if (settingsObj.toggles["play"]) {
      timerPlay();
    } else {
      stopTimer();
      timerMusicEl.pause();
    }
  }

  function getInputVal(e) {
    let count = +e.target.value;
    settingsObj.inputVals.focusVal = +count;
    settingsObj.toggles["play"] = false;
    innerTimerClock(count * 60);
    val = count * 60;
    stopTimer();

    if (e.target === focusLengthEl) {
      timerTitleEl.textContent = "Focus";
      timerIconEl.src = "/assets/img/svg/focus-brain.svg";
      settingsObj.skipCount = 0;
    } else if (e.target === shortLengthEl) {
      timerIconEl.src = "/assets/img/svg/coffee.svg";
      timerTitleEl.textContent = "Short Break";
      settingsObj.skipCount = 1;
    } else {
      timerTitleEl.textContent = "Long Break";
      settingsObj.skipCount = 2;
    }
  }

  // Setting inputs
  function inputToggler(obj, el, toggle) {
    if (!toggle) {
      settingsObj.toggles[obj] = !settingsObj.toggles[obj];
    }

    timerStartMusic();
    if (!settingsObj.toggles.musicToggle) {
      timerMusicEl.pause();
    }

    if (settingsObj.toggles.modeToggle) {
      document.body.classList.add("dark-theme");
      localStorage.setItem("darkMode", "true");
    } else {
      document.body.classList.remove("dark-theme");
      localStorage.setItem("darkMode", "false");
    }

    if (settingsObj.toggles.autoPlayToggle) {
      localStorage.setItem("autoPlay", "true");
    } else {
      localStorage.setItem("autoPlay", "false");
    }

    if (settingsObj.toggles.musicToggle) {
      localStorage.setItem("playMusic", "true");
    } else {
      localStorage.setItem("playMusic", "false");
    }

    if (settingsObj.toggles.notificationsToggle) {
      localStorage.setItem("NotifiCall", "true");
    } else {
      localStorage.setItem("NotifiCall", "false");
    }

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
  timerTitleEl.textContent = settingsObj.timerTitle;

  // skipped
  skipBtnEl.addEventListener("click", () => {
    getSkip();
    stopTimer();
  });
  inputToggler("modeToggle", inputModeEl, true);
  inputToggler("autoPlayToggle", inputAutoEl, true);
  inputToggler("musicToggle", inputMusicEl, true);
  inputToggler("notificationsToggle", inputNotifiEl, true);
}

document.addEventListener("DOMContentLoaded", innerDOM);
