import moviesStorage from './moviesStorage';
import movieModalTpl from '../movie-modal.hbs';
import refs from './refs';
import getMoviesVideo from '../api/fetch-videos';
import onWatchedBtn from './onWatchedBtn';
import onQueueBtn from './onQueueBtn';
import { getFullGerneNames } from '../getGenreName';
import { createTrailerModal } from '../utils/trailerBtn';

const movieModalBackdropElement = document.querySelector('[data-modal]');

if (!localStorage.getItem('Watched')) {
  const itemsWatchedMovie = []; // пустий масив для id watched
  localStorage.setItem('Watched', JSON.stringify(itemsWatchedMovie)); // фальшивий localStorage
}

if (!localStorage.getItem('Queue')) {
  const itemsQueueMovie = []; // пустий масив для id queue
  localStorage.setItem('Queue', JSON.stringify(itemsQueueMovie)); // фальшивий localStorage
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
  const movie = await moviesStorage.getMovieById(id);
  const movieLib = movie; // для бібліотеки
  const video = await getMoviesVideo(id);

  if (video) {
    movie.video = video;
  }

  const markup = createMovieModalMarkup(movie);

  movieModalBackdropElement.innerHTML = markup;
  movieModalBackdropElement.classList.remove('is-hidden');
  if (movie.video) createTrailerModal(movie);

  //disable scroll for background when modal is open
  const movieModalElement = movieModalBackdropElement.querySelector('.modal');
  const bodyWidth = refs.body.clientWidth;
  refs.body.style.overflow = 'hidden';
  refs.body.style.width = bodyWidth + 'px';

  const modalCloseBtn = document.querySelector('[data-modal-close]');
  modalCloseBtn.addEventListener('click', onClose);
  refs.backdrop.addEventListener('click', onClose);
  document.addEventListener('keydown', onClose);

  // ------------------------------НИЖЧЕ ВСЕ ДЛЯ БІБЛІОТЕКИ ----------------------------//

  const watchedModalBtn = document.querySelector('.modal__btn--watch');
  const queueModalBtn = document.querySelector('.modal__btn--queue');

  //------------------------------ДЛЯ КНОПКИ WATCHED---------------------------//

  const savedWatchedId = localStorage.getItem('Watched'); // отримую збережені фільми + перезаписую фальшиву пам'ять
  const parseSavedWatchedId = JSON.parse(savedWatchedId); // роблю масив збережених фільмів для перебору
  const arrayWatchedId = parseSavedWatchedId.map(mov => mov.id); // окремі id

  // перевірка чи є щось в сховищі, чи ні
  if (!arrayWatchedId) {
    watchedModalBtn.textContent = 'Add to Watched'; // якщо фільм не збережений, то кнопка зразу показує додати
  } else if (arrayWatchedId.includes(movieLib.id)) {
    watchedModalBtn.textContent = 'Remove From Watched'; // якщо фільм збережений, то кнопка зразу показує видалити
    watchedModalBtn.classList.add('js-modal-btn'); // кнопка міняє колір на активну
  }

  watchedModalBtn.addEventListener('click', onWatchedModalBtn);

  function onWatchedModalBtn() {
    const itemsWatchedMovie = parseSavedWatchedId; // віддає дані з сховища, щоб можна було дальше добавляти до них нові фільми
    const itemsWatchedId = itemsWatchedMovie.map(mov => mov.id); // тільки id

    if (itemsWatchedId.includes(movieLib.id)) {
      // якщо id вже є в масиві, то фільм видаляє з масиву
      const indexId = itemsWatchedId.indexOf(movieLib.id); // шукаю індекс id
      const deleteId = itemsWatchedMovie.splice(indexId, 1); // якщо є, то видаляю фільм
      watchedModalBtn.textContent = 'Add to Watched'; // міняю текст в кнопці коли видаляю фільм з переглянутих
      watchedModalBtn.classList.remove('js-modal-btn'); // кнопка знімає колір
    } else {
      itemsWatchedMovie.push(movieLib); // якщо немає, добавляю в масив
      watchedModalBtn.textContent = 'Remove From Watched'; // міняю текст в кнопці коли додаю фільм в переглянуті
      watchedModalBtn.classList.add('js-modal-btn'); // кнопка міняє колір на активну
    }
    // const notRepeatId = itemsWatchedMovie.filter((id, index, array) => array.indexOf(id) === index); // не записує двічі один і той же фільм
    localStorage.setItem('Watched', JSON.stringify(itemsWatchedMovie)); // зберігаю в сховище всі фільми
  }

  //--------------------------------ДЛЯ КНОПКИ QUEUE------------------------------------//
  const savedQueueId = localStorage.getItem('Queue'); // отримую збережені фільми + перезаписую фальшиву пам'ять
  const parseSavedQueueId = JSON.parse(savedQueueId); // роблю масив збережених фільмів для перебору
  const arrayQueueId = parseSavedQueueId.map(mov => mov.id); // окремі id

  // перевірка чи є щось в сховищі, чи ні
  if (!arrayQueueId) {
    queueModalBtn.textContent = 'Add to Queue'; // якщо фільм збережений, то кнопка зразу показує додати
  } else if (arrayQueueId.includes(movieLib.id)) {
    queueModalBtn.textContent = 'Remove From Queue'; // якщо фільм збережений, то кнопка зразу показує видалити
    queueModalBtn.classList.add('js-modal-btn'); // кнопка міняє колір на активну
  }

  queueModalBtn.addEventListener('click', onQueueModalBtn);

  function onQueueModalBtn() {
    const itemsQueueMovie = parseSavedQueueId; // віддає дані з сховища, щоб можна було дальше добавляти до них нові фільми
    const itemsQueueId = itemsQueueMovie.map(mov => mov.id); // тільки id

    if (itemsQueueId.includes(movieLib.id)) {
      // якщо id вже є в масиві, то його видаляє з масиву
      const indexId = itemsQueueId.indexOf(movieLib.id); // шукаю індекс id
      const deleteId = itemsQueueMovie.splice(indexId, 1); // якщо є, то видаляю його
      queueModalBtn.textContent = 'Add to Queue'; // міняю текст в кнопці коли видаляю фільм з черги
      queueModalBtn.classList.remove('js-modal-btn'); // кнопка стає простою
    } else {
      itemsQueueMovie.push(movie); // якщо немає, добавляю в масив
      queueModalBtn.textContent = 'Remove From Queue'; // міняю текст в кнопці коли додаю фільм в чергу
      queueModalBtn.classList.add('js-modal-btn'); // кнопка міняє колір на активну
    }

    const notRepeatQueueId = itemsQueueMovie.filter(
      (id, index, array) => array.indexOf(id) === index,
    ); // не записує двічі одні і тіж фільми
    localStorage.setItem('Queue', JSON.stringify(notRepeatQueueId)); // зберігаю в сховище всі фільми
  }
}

function createMovieModalMarkup(movie) {
  movie.genreNames = getFullGerneNames(movie.genre_ids);
  return movieModalTpl(movie);
}

function onClose(event) {
  event.stopPropagation(); // відміняє подвійний клік
  if (
    event.target.classList.contains('backdrop') ||
    event.target.classList.contains('modal__btn--close') ||
    event.keyCode == 27
  ) {
    movieModalBackdropElement.classList.add('is-hidden');
    refs.modal.innerHTML = '';
    refs.body.style.overflow = 'auto';
    refs.body.style.width = 'auto';
    document.removeEventListener('keydown', onClose);
  }

  if (
    refs.libraryBtn.classList.contains('current') &&
    refs.watchedBtn.classList.contains('active')
  ) {
    return onWatchedBtn(); // оновлюю переглянуті фільми
  }

  if (refs.libraryBtn.classList.contains('current') && refs.queueBtn.classList.contains('active')) {
    return onQueueBtn(); // оновлюю чергу фільмів
  }
}
