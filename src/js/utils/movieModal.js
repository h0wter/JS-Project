import { getMovieById } from './moviesCache';
import movieModalTpl from '../movie-modal.hbs';
import refs from './refs';
import getMoviesVideo from '../api/fetch-videos';
import onWatchedBtn from './onWatchedBtn';
import onQueueBtn from './onQueueBtn';
import { getFullGerneNames } from '../getGenreName';

const movieModalElement = document.querySelector('[data-modal]');

if (!localStorage.getItem('watched')) {
  const itemsWatchedId = []; // пустий масив для id watched
  localStorage.setItem('watched', JSON.stringify(itemsWatchedId)); // фальшивий localStorage
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
  refs.body.style.overflow = 'hidden';
  refs.body.style.marginRight = '16px';

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

  const savedWatchedId = localStorage.getItem('watched'); // отримую збережені id + перезаписую фальшиву пам'ять
  const parseSavedWatchedId = JSON.parse(savedWatchedId); // роблю масив збережених id для перебору

  const itemsWatchedId = parseSavedWatchedId; // віддає дані з сховища, щоб можна було дальше добавляти до них нові фільми

  // перевірка чи є щось в сховищі, чи ні
  if (!parseSavedWatchedId) {
    watchedModalBtn.textContent = 'Add to Watched'; // якщо фільм збережений, то кнопка зразу показує додати
  } else if (parseSavedWatchedId.includes(modalFilmId)) {
    watchedModalBtn.textContent = 'Remove From Watched'; // якщо фільм збережений, то кнопка зразу показує видалити
  }

  watchedModalBtn.addEventListener('click', onWatchedModalBtn);

  function onWatchedModalBtn() {
    if (itemsWatchedId.includes(modalFilmId)) {
      // якщо id вже є в масиві, то його видаляє з масиву
      const indexId = itemsWatchedId.indexOf(modalFilmId); // шукаю індекс id
      const deleteId = itemsWatchedId.splice(indexId, 1); // якщо є, то видаляю його
      watchedModalBtn.textContent = 'Add to Watched'; // міняю текст в кнопці коли видаляю фільм з переглянутих
    } else {
      itemsWatchedId.push(modalFilmId); // якщо немає, добавляю в масив
      watchedModalBtn.textContent = 'Remove From Watched'; // міняю текст в кнопці коли додаю фільм в переглянуті
    }

    const notRepeatId = itemsWatchedId.filter((id, index, array) => array.indexOf(id) === index); // не записує двічі одне і теж id
    localStorage.setItem('watched', JSON.stringify(notRepeatId)); // зберігаю в сховище всі id
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
  }

  queueModalBtn.addEventListener('click', onQueueModalBtn);

  function onQueueModalBtn() {
    if (itemsQueueId.includes(modalFilmId)) {
      // якщо id вже є в масиві, то його видаляє з масиву
      const indexId = itemsQueueId.indexOf(modalFilmId); // шукаю індекс id
      const deleteId = itemsQueueId.splice(indexId, 1); // якщо є, то видаляю його
      queueModalBtn.textContent = 'Add to Queue'; // міняю текст в кнопці коли видаляю фільм з черги
    } else {
      itemsQueueId.push(modalFilmId); // якщо немає, добавляю в масив
      queueModalBtn.textContent = 'Remove From Watched'; // міняю текст в кнопці коли додаю фільм в чергу
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
  if (
    refs.libraryBtn.classList.contains('current') &&
    refs.watchedBtn.classList.contains('active')
  ) {
    return onWatchedBtn(); // оновлюю переглянуті фільми
  }

  if (refs.libraryBtn.classList.contains('current') && refs.queueBtn.classList.contains('active')) {
    return onQueueBtn(); // оновлюю чергу фільмів
  }
  if (
    event.target.classList.contains('backdrop') ||
    event.target.classList.contains('modal__btn--close') ||
    event.keyCode == 27
  ) {
    movieModalElement.classList.add('is-hidden');
    refs.body.style.overflow = 'auto';
    refs.body.style.marginRight = '0px';
    document.removeEventListener('keydown', onClose);
  }
}
