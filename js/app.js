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

  let settingsObj = {
    toggles: {
      modeToggle: false,
      autoPlayToggle: false,
      musicToggle: false,
      notificationsToggle: false,
      play: false,
    },
    inputVals: {
      focusVal: focusLengthEl.value,
    },
  };

  function timerFun(num) {
    let count = num * 60;
    const timer = setInterval(function () {
      let minutes = Math.floor(count / 60);
      let seconds = count % 60;

      timerClockEl.innerHTML = `${minutes.toString().padStart(2, "0")} ${seconds
        .toString()
        .padStart(2, "0")}`;

      if (count === 0) {
        clearInterval(timer);
      } else {
        count--;
      }
    }, 1000);
  }

  function playToggle() {
    settingsObj.toggles["play"] = !settingsObj.toggles["play"];
    timerClockEl.style.fontWeight = "800";

    if (settingsObj.toggles["play"]) {
      timerFun(settingsObj.inputVals["focusVal"]);
      timerPlayEl.querySelector("img").src = "./assets/img/svg/pause.svg";
    } else {
      timerPlayEl.querySelector("img").src = "./assets/img/svg/play.svg";
    }

    console.log(settingsObj.toggles["play"]);
  }

  timerPlayEl.addEventListener("click", playToggle);
  focusLengthEl.addEventListener("input", (e) => {
    settingsObj.inputVals["focusVal"] = +e.target.value;
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
