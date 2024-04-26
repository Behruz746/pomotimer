function innerDOM() {
  const settingsBtnsEl = document.querySelectorAll(".settings"),
    overSettingsEl = document.querySelector(".settings__over"),
    settingCloseBtnEl = document.querySelector(".setting__close__btn"),
    inputModeEl = document.querySelector(".mode"),
    inputAutoEl = document.querySelector(".auto__play"),
    inputMusicEl = document.querySelector(".music"),
    inputNotifiEl = document.querySelector(".notifications");

  let toggleObj = {
    modeToggle: false,
    autoPlayToggle: false,
    musicToggle: false,
    notificationsToggle: false,
  };

  // Setting inputs

  function inputToggler(obj, el) {
    toggleObj[obj] = toggleObj[obj] ? false : true;
    if (toggleObj[obj]) {
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
