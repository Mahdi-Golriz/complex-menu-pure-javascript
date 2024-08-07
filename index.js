// definite height for images

let Menu = function () {
  let _config = {
    index: 0,
    items: Array.from(document.querySelector("ul.items").children),
    displayDiv: document.querySelector("div.display"),
  };

  function _displayImages() {
    _config.items.forEach((item) =>
      item.addEventListener("click", () => {
        const figures = item.querySelectorAll("figure");

        _config.displayDiv.innerHTML = "";
        figures.forEach((item) => {
          const clonedImage = item.cloneNode(true);
          _config.displayDiv.appendChild(clonedImage);
        });
        _adjustPictureHeight();
      })
    );
  }

  function _adjustPictureHeight() {
    var containerHeight = 586;
    var numImages = document.querySelector("div.display").children.length;

    var ItemsHeight = containerHeight / (Math.floor((numImages - 1) / 3) + 1);
    document.documentElement.style.setProperty("--height", `${ItemsHeight}px`);
    console.log(ItemsHeight);
  }

  function _adjustArrowTop() {
    _config.items.forEach((item, i) => {
      item.addEventListener("click", () => {
        document.documentElement.style.setProperty("--top", `${i * 13 + 2}rem`);
      });
    });
  }

  _displayImages();
  _adjustArrowTop();
};

window.Menu = Menu;
Menu();
