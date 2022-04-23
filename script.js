// HTML QuerySelector
const imageContainer = document.querySelector("#image-container");
const loader = document.querySelector("#loader");

// Array of fetched Photos
let photosArray = [];

// For tracking images
let ready = false;
let imagesLoaded = 0;
let totalImages = 0;

// Unsplash API
const count = 10;
const apiKey = "CXWA21eRbzanoMWvD4-SbIR-3LM4V0HpFhYmrG0fGXw";
const query = "supercars";
const apiURL = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}&query=${query}`;

// ======================================================================================= //

// Helper functions
function setAttributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

function imageLoaded() {
  imagesLoaded++;
  if (imagesLoaded === totalImages) {
    ready = true;
    loader.hidden = true;
    console.log(`ready = ${ready}`);
  }
}

// Create and append each photo to the DOM
function displayPhotos() {
  imagesLoaded = 0;
  totalImages = photosArray.length;

  photosArray.forEach((photo) => {
    //   Create <a /> and <img />
    const item = document.createElement("a");
    setAttributes(item, {
      href: photo.links.html,
      target: "_blank",
    });
    const img = document.createElement("img");
    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    });
    img.addEventListener("load", imageLoaded);

    // Append <a />
    item.appendChild(img);
    imageContainer.appendChild(item);
  });
}

// Get photos from Unsplash
async function getPhotos() {
  try {
    const response = await fetch(apiURL);
    photosArray = await response.json();
    displayPhotos();
  } catch (error) {
    alert(error);
  }
}

// Add EventListener for scrolling
window.addEventListener("scroll", () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    ready
  ) {
    ready = false;
    getPhotos();
  }
});

// On Page Load
getPhotos();
