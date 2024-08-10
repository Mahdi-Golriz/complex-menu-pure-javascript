let Menu = function () {
  let _config = {
    activeIndex: 0,
    items: Array.from(
      document.querySelector(".first-level__container").children
    ),
    menuItems: Array.from(document.querySelector("ul.items").children),
    isAnimating: false,

    innerActiveIndex: null,
  };

  function _displayImages() {
    _config.menuItems.forEach((item, i) =>
      item.addEventListener("click", () => {
        if (i === _config.activeIndex || _config.isAnimating) return;

        _config.isAnimating = true;

        Array.from(_config.items[_config.activeIndex].children).forEach(
          (figure, i) => {
            setTimeout(() => _removePreviousImages(figure), i * 60);
          }
        );

        setTimeout(() => {
          _changeActiveIndex(i);
          _adjustArrowLevel(item);
        }, _config.items.length * 60 + 1000);

        Array.from(_config.items[i].children).forEach((figure, i) => {
          setTimeout(() => {
            _showNewImages(figure);
          }, _config.items.length * 60 + 1000 + i * 60);
        });

        setTimeout(
          () => (_config.isAnimating = false),
          _config.items.length * 120 + 1300
        );
      })
    );
  }

  function _removePreviousImages(element, opacity = 1, scale = 1) {
    if (opacity > 0 || scale > 0.7) {
      opacity -= 1 / 60;
      scale -= 0.3 / 60;

      element.style.opacity = opacity;
      element.style.transform = `scale(${scale})`;

      requestAnimationFrame(() =>
        _removePreviousImages(element, opacity, scale)
      );
    }
  }

  function _showNewImages(element, opacity = 0, scale = 0.7) {
    if (opacity < 1 || scale < 1) {
      opacity += 1 / 60;
      scale += 0.3 / 60;

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

  function _changeInnerActiveIndex(i) {
    document
      .querySelectorAll("div.submenu-items ul")
      [_config.innerActiveIndex].classList.remove("active");

    _config.innerActiveIndex = i;

    document
      .querySelectorAll("div.submenu-items ul")
      [_config.innerActiveIndex].classList.add("active");
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
    window.addEventListener("resize", () => {
      _adjustPictureHeight;
    });
    document.addEventListener("DOMContentLoaded", () => {
      Array.from(_config.items[_config.activeIndex].children).forEach(
        (figure, i) => {
          setTimeout(() => _showNewImages(figure), i * 60);
        }
      );

      const firstItem = _config.menuItems[0];
      const firstArrowLevel =
        firstItem.getBoundingClientRect().top +
        firstItem.offsetHeight / 2 -
        document.querySelector("ul.items").getBoundingClientRect().top -
        14;
      document.documentElement.style.setProperty(
        "--top",
        `${firstArrowLevel}px`
      );
    });
  }

  function _adjustArrowLevel(item) {
    const itemTop = item.getBoundingClientRect().top;
    const itemHeight = item.offsetHeight;
    const listTop = document
      .querySelector("ul.items")
      .getBoundingClientRect().top;

    const arrowTop = itemHeight / 2 + itemTop - listTop - 14;
    document.documentElement.style.setProperty("--top", `${arrowTop}px`);
  }

  function _adjustInnerArrowLevel(item) {
    const itemTop = item.getBoundingClientRect().top;
    const itemHeight = item.offsetHeight;
    const listTop = document
      .querySelector("ul.subitems")
      .getBoundingClientRect().top;

    const arrowTop = itemHeight / 2 + itemTop - listTop - 7;
    document.documentElement.style.setProperty("--inner-top", `${arrowTop}px`);
  }

  function _displaySubmenu() {
    const images = Array.from(_config.items[0].children);
    const secondContainer = document.querySelector(
      "div.second-level__container"
    );
    const imagesContainer = Array.from(
      document.querySelector("div.submenu-items").children
    );

    images.forEach((figure, index) => {
      figure.addEventListener("click", () => {
        images.forEach((image, i) => {
          setTimeout(() => _removePreviousImages(image), i * 60);
        });

        setTimeout(() => {
          _config.items[_config.activeIndex].classList.remove("active");

          secondContainer.classList.add("active");

          imagesContainer[index].classList.add("active");
          _config.innerActiveIndex = index;

          const item = Array.from(
            document.querySelector("ul.subitems").children
          )[index];

          _adjustInnerArrowLevel(item);
        }, _config.items.length * 60 + 1000);

        document
          .querySelector("div.submenu-items")
          .children[index].querySelectorAll("figure")
          .forEach((figure, i) => {
            setTimeout(() => {
              _showNewImages(figure);
            }, 5 * 60 + 1000 + i * 60);
          });
      });
    });
  }

  function _changeSubmenuItems() {
    const subItems = Array.from(document.querySelector("ul.subitems").children);
    const subImages = document.querySelector("div.submenu-items").children;

    subItems.forEach((item, i) =>
      item.addEventListener("click", () => {
        if (i === _config.innerActiveIndex || _config.isAnimating) return;

        _config.isAnimating = true;

        Array.from(
          subImages[_config.innerActiveIndex].querySelectorAll("figure")
        ).forEach((figure, i) => {
          setTimeout(() => _removePreviousImages(figure), i * 60);
        });

        setTimeout(() => {
          _changeInnerActiveIndex(i);
          _adjustInnerArrowLevel(item);
        }, _config.items.length * 60 + 1000);

        Array.from(
          subImages[_config.innerActiveIndex].querySelectorAll("figure")
        ).forEach((figure, i) => {
          setTimeout(() => {
            _showNewImages(figure);
          }, _config.items.length * 60 + 1000 + i * 60);
        });

        setTimeout(
          () => (_config.isAnimating = false),
          _config.items.length * 120 + 1300
        );
      })
    );
  }

  _addEventListeners();
  _displayImages();
  _displaySubmenu();
  _changeSubmenuItems();
};

window.Menu = Menu;
Menu();
