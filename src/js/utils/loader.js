function hideLoader() {
  const refLoader = document.querySelector('.loading');
  refLoader.classList.add('d-none');
}
export function showLoader() {
  const refLoader = document.querySelector('.loading');
  refLoader.classList.remove('d-none');
}
export function closeLoader() {
  const refGalleryImgs = document.querySelectorAll('.gallery__img');
  let imgLoaded = 0;
  for (const refGalleryImg of refGalleryImgs) {
    refGalleryImg.addEventListener('load', () => {
      imgLoaded += 1;
      if (imgLoaded === refGalleryImgs.length) {
        hideLoader();
      }
    });
  }
}
