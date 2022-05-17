const API_KEY = 'e900ddd99edc3affd146f1905e638fd1';
const BASE_URL = 'https://api.themoviedb.org/3';

export default class NewsApiService {
  constructor() {
    // this.activePage = 1;

    this.url = '';
  }

  getData() {
    return fetch(this.url)
      .then(r => {
        if (!r.ok) {
          throw Error(r.statusText);
        }
        return r.json();
      })
      .then(data => {
        if (data.total_pages === 0) {
          throw Error(r.statusText);
        }

        return data;
      });
  }

  getStartURL(activePage) {
    const startURL = `${BASE_URL}/trending/movie/day?api_key=${API_KEY}&page=${activePage}`;
    this.url = startURL;
  }

  getGenreURL() {
    const GENRE_URL = `${BASE_URL}/genre/movie/list?api_key=${API_KEY}`;
    this.url = GENRE_URL;
  }

  getsearchURL(activePage, query) {
    const searchURL = `${BASE_URL}/search/movie?&api_key=${API_KEY}&page=${activePage}&query=${query}`;
    this.url = searchURL;
  }
  getSearchURLbyGenre(activePage, query){
    const searchURLbyGenre = `${BASE_URL}/discover/movie?with_genres=${query}&api_key=${API_KEY}&page=${activePage}`;
    this.url = searchURLbyGenre;
  }
}
