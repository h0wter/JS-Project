import refs from './refs';
import NewsApiService from '../api/newsApiService';
import renderListOfPages from './renderListOfPages';
import showMovies from './showMovies';
import createMoviesMarkup from './createMoviesMarkup';

const apiService = new NewsApiService();

export default function onFormSubmit(e) {
  e.preventDefault();

  const isErrorHidden = refs.inputError.classList.contains('visually-hidden');

  const searchTerm = refs.search.value;

  if (!searchTerm.trim()) {
    if (!isErrorHidden) return;
    showError();
    return;
  }
  if (searchTerm.trim()) {
    hideError();
  }
  let page = 1;
  apiService.getsearchURL(page, searchTerm);
  apiService
    .getData()
    .then(data => {
      const markup = createMoviesMarkup(data.results);
      showMovies(markup.join(''));

      let totalPages = data.total_pages;
      if (totalPages > 500) {
        totalPages = 500;
      }

      renderListOfPages(page, totalPages);
      return { page, totalPages };
    })
    .then(({ page, totalPages }) => {
      Number(page);
      document.addEventListener('click', e => {
        const classes = e.target.classList;
        const dataAtrrPage = e.target.dataset?.page;

        if (dataAtrrPage === 'next') {
          Number((page += 1));
        } else if (dataAtrrPage === 'prev') {
          page -= 1;
        } else {
          page = dataAtrrPage;
        }

        const isPagination = classes.contains('footer__item');

        const shouldRender = isPagination && !classes.contains('active') && page;

        if (!shouldRender) {
          return true;
        }

        apiService.getsearchURL(page, searchTerm);

        apiService.getData().then(data => {
          const markup = createMoviesMarkup(data.results);
          showMovies(markup.join(''));
        });
        renderListOfPages(page, totalPages);
      });
    })
    .catch(r => {
      showError();
    });
}

function showError() {
  refs.inputError.classList.remove('visually-hidden');
  setTimeout(hideError, 5000);
}

export function hideError() {
  refs.inputError.classList.add('visually-hidden');
  refs.search.value = '';
}
