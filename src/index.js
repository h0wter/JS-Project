import './sass/main.scss';
import './js/api/fetch-api';
import './js/searchByGenreForm';
import './js/utils/onSearchByGenre';
import Main from './js/main';
import { API_URL, searchURL } from './js/utils/settings.js';
import getMovies from './js/api/fetch-api';
import createMoviesMarkup from './js/utils/createMoviesMarkup';
import showMovies from './js/utils/showMovies';
import { attachOpenModalEvent } from './js/utils/movieModal';
import onHomeBtn from './js/utils/onHomeBtn';
import onLibraryBtn from './js/utils/onLibraryBtn';
import changeTheme from './js/utils/body-change-theme';
import refs from './js/utils/refs';
import Notiflix from 'notiflix';
import { getGenre } from './js/getGenre.js';
import { onScroll, goUp } from './js/utils/uparrow';
import { closeLoader, showLoader } from './js/utils/loader';
import onFormSubmit from './js/utils/onSubmit';
export let genreList;

getGenre()
  .then(entry => {
    return (genreList = entry);
  })
  .catch(error => console.log(error));
const main = new Main();

refs.form.addEventListener('submit', onFormSubmit);
refs.headerLogo.addEventListener('click', e => {
  main.init();
});

refs.homeBtn.addEventListener('click', e => {
  main.init();
});

refs.homeBtn.addEventListener('click', onHomeBtn);
refs.libraryBtn.addEventListener('click', onLibraryBtn);

attachOpenModalEvent();

// async function onFormSubmit(e) {
//   e.preventDefault();
//   const isActive = refs.inputError.classList.contains('input-error-active');

//   const searchTerm = refs.search.value;

//   if (!searchTerm.trim()) {
//     if (isActive) return;
//     refs.inputError.classList.replace('input-error', 'input-error-active'); //тут будет уведомление о неуспешном поиске
//     return;
//   }
//   if (searchTerm.trim()) {
//     refs.inputError.classList.replace('input-error-active', 'input-error');
//   }
//   const url = searchURL + '&query=' + searchTerm;
//   await startSearch(url);
//   if (result.results.length === 0) {
//     Notiflix.Notify.warning('По вашему запросу ничего не найдено');
//   }
// }
addEventListener('scroll', onScroll);
refs.upBtn.addEventListener('click', goUp);
