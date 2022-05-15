import refs from './refs';
import NewsApiService from '../api/newsApiService';
import renderListOfPages from './renderListOfPages';
import showMovies from './showMovies';
import createMoviesMarkup from './createMoviesMarkup';
import moviesStorage from './moviesStorage';
import { showLoader, closeLoader } from './loader';
import GetURLFunction from '../api/getURLFunction';
const apiService = new NewsApiService();
const getURLFunction = new GetURLFunction();

export default function onFormSubmit(e) {
  e.preventDefault();
  const isErrorHidden = refs.inputError.classList.contains('visually-hidden');
  // const searchTerm = refs.search.value;
  let searchTerm = e.currentTarget.elements.search.value;

  if (!searchTerm.trim()) {
    if (!isErrorHidden) return;
    showError();
    return;
  }
  if (searchTerm.trim()) {
    hideError();
  }
  let page = 1;
  const url = getURLFunction.getSearchURL(page, searchTerm);

  apiService
    .getData(url)
    .then(data => {
      showLoader();
      const markup = createMoviesMarkup(data.results);
      showMovies(markup.join(''));
      moviesStorage.addMoviesToStorage(data.results);
      closeLoader();

      let totalPages = data.total_pages;
      if (totalPages > 500) {
        totalPages = 500;
      }

      renderListOfPages(page, totalPages);

      return { page, totalPages, searchTerm };
    })
    .then(({ page, totalPages, searchTerm }) => {
      console.log('🚀 ~ file: onSubmit.js ~ line 48 ~ .then ~ searchTerm', searchTerm);

      pagination(page, totalPages, searchTerm);
    });

  // .catch(r => {
  //   showError();
  // });
}

function showError() {
  refs.inputError.classList.remove('visually-hidden');
  setTimeout(hideError, 5000);
}

export function hideError() {
  refs.inputError.classList.add('visually-hidden');
  refs.search.value = '';
}
