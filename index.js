// definite height for images

let Menu = function () {
  let _config = {
    index: 0,
    items: Array.from(document.querySelector("ul.items").children),
  };

  function _selectItem() {}

  function _adjustPictureHeight() {
    var containerHeight = 586;
    var numImages = document.querySelector("div.pictures").children.length;
    var ItemsHeight = containerHeight / (Math.floor((numImages - 1) / 3) + 1);
    document.documentElement.style.setProperty("--height", `${ItemsHeight}px`);
  }

  function _adjustArrowTop() {
    _config.items.forEach((item, i) => {
      item.addEventListener("click", () => {
        document.documentElement.style.setProperty("--top", `${i * 13 + 2}rem`);
      });
    });
  }

  _adjustArrowTop();
  _adjustPictureHeight();
};

window.Menu = Menu;
Menu();
