import { getMovieById } from "./moviesCache";
import movieModalTpl from '../movie-modal.hbs';

const movieModalElement = document.querySelector('[data-modal]')

export function attachOpenModalEvents() {
  const cardElements = document.querySelectorAll('.movie__body')
  console.log("cardElements", cardElements)

  for (const card of cardElements) {
    const id = card.children[0].attributes["data-action"].value;
    card.addEventListener('click', () => showMovieModal(id))
  }
}

function showMovieModal(id) {
    const movie = getMovieById(id)
    console.log('movie', movie)
    const markup = createMovieModalMarkup(movie)
    movieModalElement.innerHTML = markup;
    console.log('markup', markup)
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

