import renderListOfPages from './utils/renderListOfPages';
import createMoviesMarkup from './utils/createMoviesMarkup';
import NewsApiService from './api/newsApiService';
import showMovies from './utils/showMovies';
import moviesStorage from './utils/moviesStorage';

const apiService = new NewsApiService();
import { showLoader, closeLoader } from './utils/loader';

export default class Main {
  constructor() {
    this.init();
  }

  init() {
    let page = 1;
    apiService.getStartURL(page);
    apiService
      .getData()
      .then(data => {
        moviesStorage.addMoviesToStorage(data.results);
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
        this.pagination(page, totalPages);
      });
  }

  pagination(page, totalPages) {
    document.addEventListener('click', e => {
      const classes = e.target.classList;
      const dataAtrrPage = e.target.dataset?.page;

      if (dataAtrrPage === 'next') {
        Number((page += 1));
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

      apiService.getStartURL(page);

      apiService.getData().then(data => {
        moviesStorage.addMoviesToStorage(data.results);
        showLoader();
        // startSearch.addMoviesToCache(data.results);
        const markup = createMoviesMarkup(data.results);
        showMovies(markup.join(''));
        closeLoader();
      });
      renderListOfPages(page, totalPages);
    });
  }
}
