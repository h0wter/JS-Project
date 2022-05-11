import './sass/main.scss';
import './js/api/fetch-api';
import Main from './js/main';
import { API_URL, searchURL } from './js/utils/settings.js';
import getMovies from './js/api/fetch-api';
import defaultImg from './js/utils/defaultImg';
import createMoviesMarkup from './js/utils/createMoviesMarkup';
import showMovies from './js/utils/showMovies';
import { attachOpenModalEvent } from './js/utils/movieModal';
import { addMoviesToCache } from './js/utils/moviesCache';
import onHomeBtn from './js/utils/onHomeBtn';
import onLibraryBtn from './js/utils/onLibraryBtn';
import changeTheme from './js/utils/body-change-theme';
import refs from './js/utils/refs';
import Notiflix from 'notiflix';
import { getGenre } from './js/getGenre.js';
export let genreList;

getGenre()
  .then(entry => {
    return (genreList = entry);
  })
  .catch(error => console.log(error));
new Main();
addEventListener('DOMContentLoaded', startSearch(API_URL));

refs.homeBtn.addEventListener('click', onHomeBtn);
refs.libraryBtn.addEventListener('click', onLibraryBtn);
refs.form.addEventListener('submit', onFormSubmit);
let result = null;
async function startSearch(API_URL) {
  result = await getMovies(API_URL);

  addMoviesToCache(result.results);

  const markup = createMoviesMarkup(result.results).join('');
  showMovies(markup);
  attachOpenModalEvent();
  const video = result.results.filter(el => {
    return el.video;
  });
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
