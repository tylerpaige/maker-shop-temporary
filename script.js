const ALLOWED_COLORS = ["white", "kraft", "chartreuse", "pink"];
const INITIALIZED_CLASS = "initialized";

const state = {};

const readColorFromLocalStorage = () => {
  return window.localStorage.getItem("maker-shop-color");
}

const setColorInLocalStorage = (color) => {
  return window.localStorage.setItem("maker-shop-color", color);
}

const getClassNameFromColor = (color) => {
  return `color-${color}`;
}

const update = (update) => {
  const previousState = Object.assign({}, state);
  Object.assign(state, update);
  render(update, previousState);
}

const updateColor = (color) => {
  if (!ALLOWED_COLORS.includes(color)) {
    return;
  }

  update({ color });
  setColorInLocalStorage(color);
}

const render = (update, previousState) => {
  if (update.hasOwnProperty("initialized")) {
    renderInitializedState();
  }

  if (update.hasOwnProperty("color")) {
    renderColor(previousState);
  }
}

const renderInitializedState = () => {
  if (state.initialized) {
    document.body.classList.add(INITIALIZED_CLASS);
  } else {
    document.body.classList.remove(INITIALIZED_CLASS);
  }
}

const renderColor = (previousState) => {
  if (previousState.color) {
    document.body.classList.remove(getClassNameFromColor(previousState.color))
  }

  document.body.classList.add(getClassNameFromColor(state.color))
}

const handleFormChange = (e) => {
  const color = e.target.value || "white";
  updateColor(color);
};

const init = () => {
  // Elements
  const colorPicker = document.querySelector(".js-color-picker");
  const colorOptions = colorPicker.querySelectorAll(".js-color-swatch");

  // Initial state
  update({
    initialized: false,
    color: readColorFromLocalStorage() || "white"
  })

  // Events
  colorPicker.addEventListener("change", handleFormChange);

  // Initial render
  const shouldBeSelected = [...colorOptions].find(option => (
    option.value == state.color
  )) || colorOptions[0];
  shouldBeSelected.checked = true;
  update({ initialized: true });
};

document.addEventListener("DOMContentLoaded", init);
