import loadLazyImages from "./lazyLoading.js";

let Menu = function () {
  // define active indexes for menu and submenu
  let activeIndex = 0;
  let submenuActiveIndex = null;
  let isAnimating = false;

  // define general selectors to access easier to inner elements
  let galleryItems = Array.from(
    document.querySelector("div.first-level__container").children
  );
  let menuItems = Array.from(document.querySelector("ul.menu-items").children);

  let secondGalleryItems = Array.from(
    document.querySelector("div.second-gallery__container").children
  );

  let submenuItems = Array.from(
    document.querySelector("ul.submenu-items").children
  );

  // handle changing images for Menu
  function _displayMenuImages() {
    menuItems.forEach((item, i) =>
      item.addEventListener("click", async () => {
        // early return
        if (i === activeIndex || isAnimating) return;
        isAnimating = true;

        // inactive submenu
        if (submenuActiveIndex !== null) {
          const figures =
            secondGalleryItems[submenuActiveIndex].querySelectorAll("figure");
          await _animateElements(Array.from(figures), _removePreviousImages);

          document
            .querySelector("div.second-level__container")
            .classList.remove("active");
        }

        const currentFigures = Array.from(galleryItems[activeIndex].children);
        await _animateElements(currentFigures, _removePreviousImages);

        await _delay(500);

        _changeActiveIndex(i);

        loadLazyImages(galleryItems[i]);

        _adjustArrowLevel(item, "ul.menu-items", "--top", 20);
        _adjustPictureHeight(
          ".first-level__container",
          "ul.galley-items.active"
        );

        const newFigures = Array.from(galleryItems[i].children);
        await _animateElements(newFigures, _showNewImages);

        await _delay(500);

        isAnimating = false;
      })
    );
  }

  // create a delay
  function _delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async function _animateElements(elements, animationFunc, delay = 60) {
    for (let i = 0; i < elements.length; i++) {
      animationFunc(elements[i]);
      await _delay(delay);
    }
  }

  function _removePreviousImages(element, opacity = 1, scale = 1) {
    function animate() {
      if (opacity > 0 || scale > 0.7) {
        opacity -= 1 / 60;
        scale -= 0.3 / 60;

        element.style.opacity = opacity;
        element.style.transform = `scale(${scale})`;

        requestAnimationFrame(animate);
      }
    }
    animate();
  }

  function _showNewImages(element, opacity = 0, scale = 0.7) {
    function animate() {
      if (opacity < 1 || scale < 1) {
        opacity += 1 / 60;
        scale += 0.3 / 60;

        element.style.opacity = opacity;
        element.style.transform = `scale(${scale})`;

        requestAnimationFrame(animate);
      }
    }
    animate();
  }

  function _changeActiveIndex(i) {
    galleryItems[activeIndex].classList.remove("active");
    menuItems[activeIndex].children[0].style.color = "black";
    activeIndex = i;
    menuItems[activeIndex].children[0].style.color = "darkblue";
    galleryItems[activeIndex].classList.add("active");
  }

  function _changeSubmenuActiveIndex(i) {
    secondGalleryItems[submenuActiveIndex].classList.remove("active");
    submenuActiveIndex = i;
    secondGalleryItems[submenuActiveIndex].classList.add("active");
  }

  function _adjustPictureHeight(container, element) {
    var firstContainerHeight = document.querySelector(
      `${container}`
    ).offsetHeight;
    var numImages = document.querySelector(`${element}`).children.length;
    var ItemsHeight =
      firstContainerHeight / (Math.floor((numImages - 1) / 3) + 1);
    document.documentElement.style.setProperty("--height", `${ItemsHeight}px`);
  }

  function _addEventListeners() {
    window.addEventListener("resize", () => {
      _adjustPictureHeight(
        ".first-level__container",
        !submenuActiveIndex ? "ul.galley-items.active" : "ul.submenu-items"
      );

      if (!submenuActiveIndex) {
        _adjustArrowLevel(menuItems[activeIndex], "ul.menu-items", "--top", 20);
      } else {
        _adjustArrowLevel(
          submenuItems[submenuActiveIndex],
          "ul.submenu-items",
          "--inner-top",
          15
        );
      }
    });

    document.addEventListener("DOMContentLoaded", async () => {
      const firstItemImages = Array.from(galleryItems[activeIndex].children);
      await _animateElements(firstItemImages, _showNewImages);

      _adjustArrowLevel(menuItems[activeIndex], "ul.menu-items", "--top", 20);
    });
  }

  function _adjustArrowLevel(item, container, cssVariable, arrowLength) {
    const itemTop = item.getBoundingClientRect().top;
    const itemHeight = item.offsetHeight;
    const listTop = document
      .querySelector(`${container}`)
      .getBoundingClientRect().top;

    const arrowTop =
      itemHeight / 2 +
      itemTop -
      listTop -
      Math.sqrt(2 * Math.pow(arrowLength, 2)) / 2;
    document.documentElement.style.setProperty(
      `${cssVariable}`,
      `${arrowTop}px`
    );
  }

  function _displaySubmenu() {
    const images = Array.from(galleryItems[0].children);
    const secondContainer = document.querySelector(
      "div.second-level__container"
    );

    images.forEach((figure, index) => {
      figure.addEventListener("click", async () => {
        await _animateElements(images, _removePreviousImages);

        await _delay(500);

        galleryItems[activeIndex].classList.remove("active");
        secondContainer.classList.add("active");
        secondGalleryItems[index].classList.add("active");
        submenuActiveIndex = index;

        galleryItems[activeIndex].classList.remove("active");

        secondContainer.classList.add("active");

        secondGalleryItems[index].classList.add("active");
        submenuActiveIndex = index;

        loadLazyImages(secondGalleryItems[index]);

        const item = Array.from(
          document.querySelector("ul.submenu-items").children
        )[index];

        _adjustArrowLevel(item, "ul.submenu-items", "--inner-top", 15);

        let firstImages = secondGalleryItems[index].querySelectorAll("figure");
        _animateElements(firstImages, _showNewImages);
      });
    });
  }

  function _changeSubmenuItems() {
    submenuItems.forEach((item, i) =>
      item.addEventListener("click", async () => {
        if (i === submenuActiveIndex || isAnimating) return;

        isAnimating = true;

        const currentFigures = Array.from(
          secondGalleryItems[submenuActiveIndex].querySelectorAll("figure")
        );

        await _animateElements(currentFigures, _removePreviousImages);

        await _delay(500);
        _changeSubmenuActiveIndex(i);

        loadLazyImages(secondGalleryItems[i]);

        _adjustArrowLevel(item, "ul.submenu-items", "--inner-top", 15);
        _adjustPictureHeight(".first-level__container", "ul.submenu-items");

        const newFigures = Array.from(
          secondGalleryItems[i].querySelectorAll("figure")
        );

        await _animateElements(newFigures, _showNewImages);

        await _delay(500);

        isAnimating = false;
      })
    );
  }

  _addEventListeners();
  _displayMenuImages();
  _displaySubmenu();
  _changeSubmenuItems();
};

window.Menu = Menu;
Menu();
