import moviesStorage from './moviesStorage';
import movieModalTpl from '../movie-modal.hbs';
import refs from './refs';
import getMoviesVideo from '../api/fetch-videos';
import onWatchedBtn from './onWatchedBtn';
import onQueueBtn from './onQueueBtn';
import { getFullGerneNames } from '../getGenreName';

const movieModalBackdropElement = document.querySelector('[data-modal]');

if (!localStorage.getItem('Watched')) {
  const itemsWatchedId = []; // пустий масив для id watched
  localStorage.setItem('Watched', JSON.stringify(itemsWatchedId)); // фальшивий localStorage
}

if (!localStorage.getItem('Queue')) {
  const itemsQueueId = []; // пустий масив для id queue
  localStorage.setItem('Queue', JSON.stringify(itemsQueueId)); // фальшивий localStorage
}

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
  const movie = moviesStorage.getMovieById(id);

  if(!movie.video){
    movie.video = await getMoviesVideo(id)
  }
  const markup = createMovieModalMarkup(movie);

  movieModalBackdropElement.innerHTML = markup;
  movieModalBackdropElement.classList.remove('is-hidden');

  //disable scroll for background when modal is open
  const movieModalElement = movieModalBackdropElement.querySelector('.modal')
  const bodyWidth = refs.body.clientWidth;
  refs.body.style.overflow = 'hidden';
  refs.body.style.width = bodyWidth + "px";

  const modalCloseBtn = document.querySelector('[data-modal-close]');
  modalCloseBtn.addEventListener('click', onClose);
  refs.backdrop.addEventListener('click', onClose);
  document.addEventListener('keydown', onClose);

  // ------------------------------НИЖЧЕ ВСЕ ДЛЯ БІБЛІОТЕКИ ----------------------------//
  const watchedModalBtn = document.querySelector('.modal__btn--watch');
  const queueModalBtn = document.querySelector('.modal__btn--queue');
  const modalEl = document.querySelector('.modal__title'); // для id

  const modalFilmId = Number(modalEl.dataset.id); // отримую id фільму

  //------------------------------ДЛЯ КНОПКИ WATCHED---------------------------//

  const savedWatchedId = localStorage.getItem('Watched'); // отримую збережені id + перезаписую фальшиву пам'ять
  const parseSavedWatchedId = JSON.parse(savedWatchedId); // роблю масив збережених id для перебору

  const itemsWatchedId = parseSavedWatchedId; // віддає дані з сховища, щоб можна було дальше добавляти до них нові фільми

  // перевірка чи є щось в сховищі, чи ні
  if (!parseSavedWatchedId) {
    watchedModalBtn.textContent = 'Add to Watched'; // якщо фільм збережений, то кнопка зразу показує додати
  } else if (parseSavedWatchedId.includes(modalFilmId)) {
    watchedModalBtn.textContent = 'Remove From Watched'; // якщо фільм збережений, то кнопка зразу показує видалити
    watchedModalBtn.classList.add('js-modal-btn') // кнопка міняє колір на активну
  }

  watchedModalBtn.addEventListener('click', onWatchedModalBtn);

  function onWatchedModalBtn() {
    if (itemsWatchedId.includes(modalFilmId)) {
      // якщо id вже є в масиві, то його видаляє з масиву
      const indexId = itemsWatchedId.indexOf(modalFilmId); // шукаю індекс id
      const deleteId = itemsWatchedId.splice(indexId, 1); // якщо є, то видаляю його
      watchedModalBtn.textContent = 'Add to Watched'; // міняю текст в кнопці коли видаляю фільм з переглянутих
      watchedModalBtn.classList.remove('js-modal-btn') // кнопка знімає колір
    } else {
      itemsWatchedId.push(modalFilmId); // якщо немає, добавляю в масив
      watchedModalBtn.textContent = 'Remove From Watched'; // міняю текст в кнопці коли додаю фільм в переглянуті
      watchedModalBtn.classList.add('js-modal-btn') // кнопка міняє колір на активну
    }

    const notRepeatId = itemsWatchedId.filter((id, index, array) => array.indexOf(id) === index); // не записує двічі одне і теж id
    localStorage.setItem('Watched', JSON.stringify(notRepeatId)); // зберігаю в сховище всі id
  }

  //--------------------------------ДЛЯ КНОПКИ QUEUE------------------------------------//
  const savedQueueId = localStorage.getItem('Queue'); // отримую збережені id + перезаписую фальшиву пам'ять
  const parseSavedQueueId = JSON.parse(savedQueueId); // роблю масив збережених id для перебору

  const itemsQueueId = parseSavedQueueId; // віддає дані з сховища, щоб можна було дальше добавляти до них нові фільми

  // перевірка чи є щось в сховищі, чи ні
  if (!parseSavedQueueId) {
    queueModalBtn.textContent = 'Add to Queue'; // якщо фільм збережений, то кнопка зразу показує додати
  } else if (parseSavedQueueId.includes(modalFilmId)) {
    queueModalBtn.textContent = 'Remove From Queue'; // якщо фільм збережений, то кнопка зразу показує видалити
    queueModalBtn.classList.add('js-modal-btn') // кнопка міняє колір на активну
  }

  queueModalBtn.addEventListener('click', onQueueModalBtn);

  function onQueueModalBtn() {
    if (itemsQueueId.includes(modalFilmId)) {
      // якщо id вже є в масиві, то його видаляє з масиву
      const indexId = itemsQueueId.indexOf(modalFilmId); // шукаю індекс id
      const deleteId = itemsQueueId.splice(indexId, 1); // якщо є, то видаляю його
      queueModalBtn.textContent = 'Add to Queue'; // міняю текст в кнопці коли видаляю фільм з черги
      queueModalBtn.classList.remove('js-modal-btn') // кнопка стає простою
    } else {
      itemsQueueId.push(modalFilmId); // якщо немає, добавляю в масив
      queueModalBtn.textContent = 'Remove From Watched'; // міняю текст в кнопці коли додаю фільм в чергу
      queueModalBtn.classList.add('js-modal-btn') // кнопка міняє колір на активну
    }

    const notRepeatQueueId = itemsQueueId.filter((id, index, array) => array.indexOf(id) === index); // не записує двічі одне і теж id
    localStorage.setItem('Queue', JSON.stringify(notRepeatQueueId)); // зберігаю в сховище всі id
  }
}

function createMovieModalMarkup(movie) {
  movie.gerneNamesFull = getFullGerneNames(movie.genre_ids);
  return movieModalTpl(movie);
}

function onClose(event) {
  event.stopPropagation() // відміняє подвійний клік
  if (
    event.target.classList.contains('backdrop') ||
    event.target.classList.contains('modal__btn--close') ||
    event.keyCode == 27
  ) {
    movieModalBackdropElement.classList.add('is-hidden');
    refs.modal.innerHTML = ""
    refs.body.style.overflow = 'auto';
    refs.body.style.width = 'auto';
    document.removeEventListener('keydown', onClose);
  }

  if (refs.libraryBtn.classList.contains('current') && refs.watchedBtn.classList.contains('active')) {
    return onWatchedBtn(); // оновлюю переглянуті фільми
  }

  if (refs.libraryBtn.classList.contains('current') && refs.queueBtn.classList.contains('active')) {
    return onQueueBtn(); // оновлюю чергу фільмів
  }
}
