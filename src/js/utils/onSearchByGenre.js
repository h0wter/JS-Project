import refs from './refs';
import NewsApiService from '../api/newsApiService';
import renderListOfPages from './renderListOfPages';
import showMovies from './showMovies';
import createMoviesMarkup from './createMoviesMarkup';
import moviesStorage from './moviesStorage';
import { showLoader, closeLoader } from './loader';
import {searchClickedPage} from './onSubmit';

refs.searcGenreForm.addEventListener("change",showResulte)
const apiService = new NewsApiService();



function showResulte(e) {
  refs.search.value = '';
  const genreID = Number(refs.searcGenreForm.value);
  localStorage.setItem ("Genre Id", genreID)
 

 let page = 1;
     if ( genreID === 0){
      localStorage.setItem ("Search by", "Start")
      apiService.getStartURL(page)
// отрисовка стартовой страницы
   }
   else {
    localStorage.setItem ("Search by", "Genre");
    apiService.getSearchURLbyGenre(page, genreID);}
// отрисовка по поиску чрез новый 


apiService
    .getData()
    .then(data => {
      showLoader();
      
      const markup = createMoviesMarkup(data.results);
      showMovies(markup.join(''));
      moviesStorage.addMoviesToStorage(data.results);
      closeLoader();

      let totalPages = data.total_pages;
      localStorage.setItem ("Totalpages", totalPages);
      if (totalPages > 500) {
        totalPages = 500;
      }

      renderListOfPages(page, totalPages);
      searchClickedPage(page);
      return { page, totalPages };
    })
    .then(({ page, totalPages }) => {
      renderListOfPages(page, totalPages);
    })
   }
