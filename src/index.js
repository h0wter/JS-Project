import './sass/main.scss';
import './js/api/fetch-api';
import { toggleModal } from './js/utils/modal';
import { API_URL, searchURL } from './js/utils/settings.js';
import getMovies from './js/api/fetch-api';
import createMoviesMarkup from './js/utils/createMoviesMarkup';
import showMovies from './js/utils/showMovies';
import refs from './js/utils/refs';
import Notiflix from 'notiflix';

addEventListener('DOMContentLoaded', startSearch(API_URL));

refs.form.addEventListener('submit', onFormSubmit);
let result = null;
async function startSearch(API_URL) {
  result = await getMovies(API_URL);
  const markup = createMoviesMarkup(result.results);
  showMovies(markup.join(''));
}

async function onFormSubmit(e) {
  e.preventDefault();
  const isActive = refs.inputError.classList.contains('input-error-active');

  const searchTerm = refs.search.value;

  if (!searchTerm.trim()) {
    if (isActive) return;
    refs.inputError.classList.replace('input-error', 'input-error-active'); //тут будет уведомление о неуспешном поиске
    return;
  }
  if (searchTerm.trim()) {
    refs.inputError.classList.replace('input-error-active', 'input-error');
  }
  const url = searchURL + '&query=' + searchTerm;
  await startSearch(url);
  if (result.results.length === 0) {
    Notiflix.Notify.warning('По вашему запросу ничего не найдено');
  }
}
