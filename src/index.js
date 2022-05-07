import './sass/main.scss';
import './js/api/fetch-api';
import { toggleModal } from './js/utils/modal';
import { API_URL, searchURL } from './js/utils/settings.js';
import getMovies from './js/api/fetch-api';
import createMoviesMarkup from './js/utils/createMoviesMarkup';
import showMovies from './js/utils/showMovies';
import refs from './js/utils/refs';
import { getGenre } from './js/getGenre.js';
export let genreList;

getGenre()
  .then(entry => {
    return (genreList = entry);
  })
  .catch(error => console.log(error));

addEventListener('DOMContentLoaded', startSearch(API_URL));

refs.form.addEventListener('submit', onFormSubmit);

async function startSearch(API_URL) {
  const result = await getMovies(API_URL);
  const markup = createMoviesMarkup(result.results);
  showMovies(markup.join(''));
}

async function onFormSubmit(e) {
  e.preventDefault();

  const searchTerm = refs.search.value;
  if (!searchTerm) {
    console.log('empty field'); //тут будет уведомление о неуспешном поиске
    return;
  }
  const url = searchURL + '&query=' + searchTerm;
  startSearch(url);
}
