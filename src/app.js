import { galleryItems } from "./galleryList";

import "../css/styles.css";
console.log("list", galleryItems);
const imageList = document.querySelector(".js-gallery");
const imageBox = document.querySelector(".lightbox");
const imageBoxContent = document.querySelector(".lightbox__content");
const lightImage = document.querySelector(".lightbox__image");
const btn = document.querySelector(".lightbox__button");
const overlay = document.querySelector(".lightbox__overlay");

galleryItems.map((image) => {
  imageList.insertAdjacentHTML(
    "beforeend",
    `<li class="gallery__item">
      <a
        class="gallery__link"
        href="${image.original}">
        <img class="gallery__image" 
        src="${image.preview}" 
        data-source="${image.original}" 
        alt="${image.description}"
        />
      </a>
    </li>`,
  );
});

imageList.addEventListener("click", onClick);
imageList.addEventListener("keydown", changeImg);
function onClick(e) {
  e.preventDefault();
  if (e.target.nodeName === "IMG") {
    return (
      (lightImage.src = e.target.dataset.source),
      imageBox.classList.add("is-open")
    );
  }
}

btn.addEventListener("click", outOfPicture);

// console.log(lightImage);
function outOfPicture() {
  imageBox.classList.remove("is-open");
  lightImage.src = "";
}

overlay.addEventListener("click", overlayClick);
function overlayClick() {
  imageBox.classList.remove("is-open");
  lightImage.src = "";
}

function changeImg() {
  document.addEventListener("keydown", (event) => {
    if (event.code === "Escape") {
      outOfPicture();
    }
    const lightBoxImage = document.querySelector(".lightbox__image");
    let currentIndex = 0;
    galleryItems.forEach((img) => {
      if (img.original === lightBoxImage.src) {
        currentIndex = galleryItems.indexOf(img);
      }
    });

    let nextIndex = currentIndex + 1;
    let previousIndex = currentIndex - 1;
    if (event.code === "ArrowRight") {
      if (nextIndex >= galleryItems.length) {
        nextIndex = 0;
      }
      lightBoxImage.src = galleryItems[nextIndex].original;
    }
    if (event.code === "ArrowLeft") {
      if (previousIndex < 0) {
        previousIndex = galleryItems.length - 1;
      }
      lightBoxImage.src = galleryItems[previousIndex].original;
    }
  });
}
