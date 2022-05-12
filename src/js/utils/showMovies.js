import refs from './refs';

export default function showMovies(markup) {
  refs.galleryList.innerHTML = '';
  refs.galleryList.insertAdjacentHTML('beforeend', markup);
}
