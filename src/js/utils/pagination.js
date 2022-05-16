import renderListOfPages from './renderListOfPages';
import createMoviesMarkup from './createMoviesMarkup';
import GetURLFunction from '../api/getURLFunction';
// import { getURLFunction } from '../main';
import showMovies from './showMovies';
import NewsApiService from '../api/newsApiService';
import { showLoader, closeLoader } from '../utils/loader';
const apiService = new NewsApiService();
const getURLFunction = new GetURLFunction();

export default class Pagination {
  constructor() {
    this.search = false;
  }
  init(page, totalPages) {
    document.addEventListener('click', e => {
      const classes = e.target.classList;
      const dataAtrrPage = e.target.dataset?.page;

      if (dataAtrrPage === 'next') {
        page += 1;
      } else if (dataAtrrPage === 'prev') {
        page -= 1;
      } else {
        page = Number(dataAtrrPage);
      }

      const isPagination = classes.contains('footer__item');

      const shouldRender = isPagination && !classes.contains('active') && page;

      if (!shouldRender) {
        return true;
      }
      debugger;
      console.log('search', search);
      if (this.search) {
        const url = getURLFunction.getSearchURL(page, this.search);

        apiService.getData(url).then(data => {
          showLoader();
          // startSearch.addMoviesToCache(data.results);
          const markup = createMoviesMarkup(data.results);
          showMovies(markup.join(''));
          closeLoader();
        });

        renderListOfPages(page, totalPages);
      } else {
        const url = getURLFunction.getStartURL(page);

        apiService.getData(url).then(data => {
          showLoader();
          // startSearch.addMoviesToCache(data.results);
          const markup = createMoviesMarkup(data.results);
          showMovies(markup.join(''));
          closeLoader();
        });
        renderListOfPages(page, totalPages);
      }
    });
  }
}

// .catch(r => {
//   showError();
// });
