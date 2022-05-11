import { getMovieById } from './moviesCache';
import movieModalTpl from '../movie-modal.hbs';
import getMoviesVideo from '../api/fetch-videos';
import { getFullGerneNames } from '../getGenreName';
import refs from './refs';

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
  refs.body.style.overflow = "hidden";

  const modalCloseBtn = document.querySelector('[data-modal-close]');
  modalCloseBtn.addEventListener('click', onClose);
  refs.backdrop.addEventListener('click', onClose);
  document.addEventListener('keydown', onClose);
}

function createMovieModalMarkup(movie) {
  movie.gerneNamesFull = getFullGerneNames(movie.genre_ids);
  return movieModalTpl(movie);
}

function onClose(event) {
  if (event.target.classList.contains('backdrop')||event.target.classList.contains('modal__btn--close')||event.keyCode==27) 
  {
    movieModalElement.classList.add('is-hidden');
    refs.body.style.overflow = "auto";
    document.removeEventListener('keydown', onClose);
  }
}


