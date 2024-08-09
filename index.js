let Menu = function () {
  let _config = {
    activeIndex: 0,
    items: Array.from(
      document.querySelector(".first-level__container").children
    ),
    menuItems: Array.from(document.querySelector("ul.items").children),
    isAnimating: false,
  };

  function _displayImages() {
    _config.menuItems.forEach((item, i) =>
      item.addEventListener("click", () => {
        if (i === _config.activeIndex || _config.isAnimating) return;

        _config.isAnimating = true;

        Array.from(_config.items[_config.activeIndex].children).forEach(
          (figure, i) => {
            setTimeout(() => _removePreviousImages(figure), i * 30);
          }
        );

        setTimeout(() => {
          _changeActiveIndex(i);
          _config.isAnimating = false;
        }, _config.items.length * 30 + 1000);

        Array.from(_config.items[i].children).forEach((figure, i) => {
          setTimeout(() => {
            _showNewImages(figure);
          }, _config.items.length * 30 + 1000 + i * 30);
        });
      })
    );
  }

  function _removePreviousImages(element, opacity = 1, scale = 1) {
    if (opacity > 0 || scale > 0.7) {
      opacity -= 1 / 30;
      scale -= 0.3 / 30;

      element.style.opacity = opacity;
      element.style.transform = `scale(${scale})`;

      requestAnimationFrame(() =>
        _removePreviousImages(element, opacity, scale)
      );
    }
  }

  function _showNewImages(element, opacity = 0, scale = 0.7) {
    if (opacity < 1 || scale < 1) {
      opacity += 1 / 30;
      scale += 0.3 / 30;

      element.style.opacity = opacity;
      element.style.transform = `scale(${scale})`;

      requestAnimationFrame(() => _showNewImages(element, opacity, scale));
    }
  }

  function _changeActiveIndex(i) {
    _config.items[_config.activeIndex].classList.remove("active");

    _config.activeIndex = i;
    _config.items[_config.activeIndex].classList.add("active");
    _adjustPictureHeight();
  }

  function _adjustPictureHeight() {
    var firstContainerHeight =
      document.querySelector("div.items.active").offsetHeight;
    var numImages = document.querySelector("div.items.active").children.length;

    var ItemsHeight =
      firstContainerHeight / (Math.floor((numImages - 1) / 3) + 1);
    document.documentElement.style.setProperty("--height", `${ItemsHeight}px`);
  }

  function _addEventListeners() {
    window.addEventListener("resize", _adjustPictureHeight);
    document.addEventListener("DOMContentLoaded", () => {
      Array.from(_config.items[_config.activeIndex].children).forEach(
        (figure, i) => {
          setTimeout(() => _showNewImages(figure), i * 60);
        }
      );
    });
  }

  _addEventListeners();
  _displayImages();
};

window.Menu = Menu;
Menu();
