// Здесь ссылка на фильмотеку, АПИ_КЕЙ

const settings = {
  BASE_URL: 'https://api.themoviedb.org/3/',
  API_KEY: 'e900ddd99edc3affd146f1905e638fd1',
  PAGE: 1,
};

const IMG_URL = 'https://image.tmdb.org/t/p/w500/';

const API_URL =
  settings.BASE_URL +
  'discover/movie?sort_by=popularity.desc&api_key=' +
  settings.API_KEY +
  '&page=' +
  settings.PAGE;
const searchURL =
  settings.BASE_URL + 'search/movie?&api_key=' + settings.API_KEY + '&page=' + settings.PAGE;
const GENRE_URL = settings.BASE_URL + 'genre/movie/list?api_key=' + settings.API_KEY;

export { API_URL, searchURL, IMG_URL, GENRE_URL, settings };
