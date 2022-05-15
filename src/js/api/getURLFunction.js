const API_KEY = 'e900ddd99edc3affd146f1905e638fd1';
const BASE_URL = 'https://api.themoviedb.org/3';

export default class GetURLFunction {
  constructor() {}

  getStartURL(activePage) {
    const startURL = `${BASE_URL}/trending/all/day?sort_by=popularity.desc&api_key=${API_KEY}&page=${activePage}`;

    return startURL;
  }

  getGenreURL() {
    const GENRE_URL = `${BASE_URL}/genre/movie/list?api_key=${API_KEY}`;
    return GENRE_URL;
  }

  getSearchURL(activePage, query) {
    console.log(activePage);
    const searchURL = `${BASE_URL}/search/movie?&api_key=${API_KEY}&page=${activePage}&query=${query}`;
    return searchURL;
  }
}
