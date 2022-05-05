const galleryList = document.querySelector('.gallery__list');

export default function showMovies(markup) {
  galleryList.innerHTML = '';
  galleryList.insertAdjacentHTML('beforeend', markup);
}
