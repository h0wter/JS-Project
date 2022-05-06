import { getMovieById } from "./moviesCache";
import movieModalTpl from '../movie-modal.hbs';

const movieModalElement = document.querySelector('[data-modal]')

export function attachOpenModalEvent() {

  const galleryElement = document.querySelector('.gallery__list')

  galleryElement.addEventListener('click', (event) => {

    if (event.target.nodeName !== "IMG") {
      return;
    }

    const id = event.target.dataset.action;
    showMovieModal(id)
  
  })

}

function showMovieModal(id) {
    const movie = getMovieById(id)
    const markup = createMovieModalMarkup(movie)

    movieModalElement.innerHTML = markup;
    movieModalElement.classList.remove("is-hidden");

    const modalCloseBtn = document.querySelector('[data-modal-close]')
    modalCloseBtn.addEventListener('click', onClose)
  }

function createMovieModalMarkup (movie) {
  return movieModalTpl(movie)
}

function onClose() {
  movieModalElement.classList.add("is-hidden");
}

