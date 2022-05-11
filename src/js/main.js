import renderListOfPages from './utils/renderListOfPages';
import createMoviesMarkup from './utils/createMoviesMarkup';
import NewsApiService from './api/newsApiService';
import showMovies from './utils/showMovies';
// import StartSearch from './startSearch';

export default class Main {
  constructor() {
    this.pagination = document.querySelector('.js-pagination');
    this.init();
  }

  init() {
    const apiService = new NewsApiService();
    // const startSearch = new StartSearch();

    let page = 1;
    apiService.getStartURL(page);
    apiService
      .getData()
      .then(data => {
        // startSearch.addMoviesToCache(data.results);

        //showMovies(createMoviesMarkup(data.results).join(''));

        let totalPages = data.total_pages;
        if (totalPages > 500) {
          totalPages = 500;
        }

        renderListOfPages(page, totalPages, this.pagination);
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

          apiService.getStartURL(page);

          apiService.getData().then(data => {
            // startSearch.addMoviesToCache(data.results);
            const markup = createMoviesMarkup(data.results);
            showMovies(markup.join(''));
          });
          renderListOfPages(page, totalPages, this.pagination);
        });
      });
  }
}
