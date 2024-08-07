let Menu = function () {
  let _config = {
    index: 0,
    items: Array.from(document.querySelector("ul.items").children),
    displayDiv: document.querySelector("div.display"),
  };

  function _displayImages() {
    _config.items.forEach((item, i) =>
      item.addEventListener("click", () => {
        if (i === _config.index) return;

        _removePreviousImages();

        setTimeout(() => {
          _showNewImages(item);
          _adjustPictureHeight();
        }, 400);

        _config.items.forEach((i) => {
          i.classList.contains("active") && i.classList.remove("active");
        });
        item.classList.add("active");

        _config.index = i;
      })
    );
  }

  function _removePreviousImages() {
    Array.from(_config.displayDiv.children).forEach((figure) => {
      figure.classList.remove("scale-enter");
      figure.classList.add("scale-exit");
    });
  }

  function _showNewImages(item) {
    const figures = item.querySelectorAll("figure");
    _config.displayDiv.innerHTML = "";
    figures.forEach((item) => {
      const clonedImage = item.cloneNode(true);
      _config.displayDiv.appendChild(clonedImage);
      clonedImage.classList.add("scale-enter");
    });
  }

  function _adjustPictureHeight() {
    var containerHeight = 586;
    var numImages = document.querySelector("div.display").children.length;

    var ItemsHeight = containerHeight / (Math.floor((numImages - 1) / 3) + 1);
    document.documentElement.style.setProperty("--height", `${ItemsHeight}px`);
    console.log(ItemsHeight);
  }

  function _adjustArrowHeight() {
    _config.items.forEach((item, i) => {
      item.addEventListener("click", () => {
        document.documentElement.style.setProperty("--top", `${i * 13 + 2}rem`);
      });
    });
  }

  _displayImages();
  _adjustArrowHeight();
};

window.Menu = Menu;
Menu();
