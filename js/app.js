function innerDOM() {
  document.querySelector(
    ".timer"
  ).style.height = `calc(${document.documentElement.clientHeight}px - 120px)`;
}

document.addEventListener("DOMContentLoaded", innerDOM);
