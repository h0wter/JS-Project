import { getMovieById } from './moviesCache';
import movieModalTpl from '../movie-modal.hbs';
import getMoviesVideo from '../api/fetch-videos';

const movieModalElement = document.querySelector('[data-modal]');

export function attachOpenModalEvent() {
  const galleryElement = document.querySelector('.gallery__list');

  galleryElement.addEventListener('click', event => {
    if (event.target.nodeName !== 'IMG') {
      return;
    }

    const id = event.target.dataset.action;
    showMovieModal(id);
  });
}

async function showMovieModal(id) {
  const movie = getMovieById(id);
  // let video;
  // if (movie.video) {
  //   video = await getMoviesVideo(id);
  // }
  // if (video) {
  //   movie.trailer = video.data.results[0].key;
  // }
  const markup = createMovieModalMarkup(movie);

  movieModalElement.innerHTML = markup;
  movieModalElement.classList.remove('is-hidden');

  const modalCloseBtn = document.querySelector('[data-modal-close]');
  modalCloseBtn.addEventListener('click', onClose);
}

function createMovieModalMarkup(movie) {
  return movieModalTpl(movie);
}

function onClose() {
  movieModalElement.classList.add('is-hidden');
}
