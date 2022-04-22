const ALLOWED_COLORS = ["white", "kraft", "chartreuse", "pink"];
const COLORS = {
  black: "#000000",
  blue: "#0048C1",
  chartreuse: "#A7D75C",
  cyan: "#00A1E0",
  "kelly-green": "#008000",
  kraft: "#FFC000",
  pink: "#FFA7EB",
  purple: "#9F1894",
  red: "#F70000",
  white: "#ffffff",
  yellow: "#F7EB61",
};
const INITIALIZED_CLASS = "initialized";

const state = {};

const readColorFromLocalStorage = () => {
  return window.localStorage.getItem("maker-shop-color");
};

const setColorInLocalStorage = (color) => {
  return window.localStorage.setItem("maker-shop-color", color);
};

const getClassNameFromColor = (color) => {
  return `color-${color}`;
};

const getBrowserColorFromColor = (color) => {
  switch (color) {
    case "white":
      return COLORS.red;
    case "kraft":
      return COLORS.purple;
    case "pink":
      return COLORS["kelly-green"];
    case "chartreuse":
      return COLORS.blue;
  }
};

const update = (update) => {
  const previousState = Object.assign({}, state);
  Object.assign(state, update);
  render(update, previousState);
};

const updateColor = (color) => {
  if (!ALLOWED_COLORS.includes(color)) {
    return;
  }

  update({ color });
  setColorInLocalStorage(color);
  document
    .querySelector("meta[name=theme-color]")
    .setAttribute("content", getBrowserColorFromColor(color));
};

const render = (update, previousState) => {
  if (update.hasOwnProperty("initialized")) {
    renderInitializedState();
  }

  if (update.hasOwnProperty("color")) {
    renderColor(previousState);
  }
};

const renderInitializedState = () => {
  if (state.initialized) {
    document.body.classList.add(INITIALIZED_CLASS);
  } else {
    document.body.classList.remove(INITIALIZED_CLASS);
  }
};

const renderColor = (previousState) => {
  if (previousState.color) {
    document.body.classList.remove(getClassNameFromColor(previousState.color));
  }

  document.body.classList.add(getClassNameFromColor(state.color));
};

const handleFormChange = (e) => {
  const color = e.target.value || "white";
  updateColor(color);
};

const init = () => {
  console.log("loaded");
  // Elements
  const colorPicker = document.querySelector(".js-color-picker");
  const colorOptions = colorPicker.querySelectorAll(".js-color-swatch");

  // Initial state
  update({
    initialized: false,
    color: readColorFromLocalStorage() || "white",
  });

  // Events
  colorPicker.addEventListener("change", handleFormChange);

  // Initial render
  const shouldBeSelected =
    [...colorOptions].find((option) => option.value == state.color) ||
    colorOptions[0];
  shouldBeSelected.checked = true;
  update({ initialized: true });
};

document.addEventListener("DOMContentLoaded", init);
