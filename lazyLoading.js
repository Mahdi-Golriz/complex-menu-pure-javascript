const loadLazyImages = (container) => {
  if (!container) return;

  const allImages = container.querySelectorAll("[data-src]");
  let numImages = allImages.length;

  if (!numImages) return;

  document.querySelector(".loader").style.display = "block";

  allImages.forEach((image) => {
    let path = image.getAttribute("data-src");

    image.addEventListener("load", function () {
      numImages -= 1;
      if (numImages <= 0) {
        document.querySelector(".loader").style.display = "none";
      }
    });

    image.src = path;
    image.removeAttribute("data-src");
  });
};

export default loadLazyImages;
