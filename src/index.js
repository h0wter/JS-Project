import './sass/main.scss';
import './js/api/fetch-api';
import { toggleModal } from './js/utils/modal';
import { API_URL, searchURL } from './js/utils/settings.js';
import getMovies from './js/api/fetch-api';
import createMoviesMarkup from './js/utils/createMoviesMarkup';
import showMovies from './js/utils/showMovies';
import changeTheme from './js/utils/body-change-theme';

addEventListener('DOMContentLoaded', startSearch(API_URL));

const form = document.getElementById('form');
const search = document.getElementById('search');

form.addEventListener('submit', onFormSubmit);

async function startSearch(API_URL) {
  const result = await getMovies(API_URL);
  const markup = createMoviesMarkup(result.results);
  showMovies(markup.join(''));
}

async function onFormSubmit(e) {
  e.preventDefault();

  const searchTerm = search.value;
  if (!searchTerm) {
    console.log('empty field'); //тут будет уведомление о неуспешном поиске
    return;
  }
  const url = searchURL + '&query=' + searchTerm;
  startSearch(url);
}
