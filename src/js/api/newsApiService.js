const API_KEY = 'e900ddd99edc3affd146f1905e638fd1';
const BASE_URL = 'https://api.themoviedb.org/3';

export default class NewsApiService {
  constructor() {
    // this.activePage = 1;

    const searchURL = `${BASE_URL}/search/movie?&api_key=${API_KEY}&page=${this.activePage}`;

    this.url = '';
  }

  getData() {
    console.log(this.url);
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
    const startURL = `${BASE_URL}/discover/movie?sort_by=popularity.desc&api_key=${API_KEY}&page=${activePage}`;
    this.url = startURL;
  }

  getGenreURL() {
    const GENRE_URL = `${BASE_URL}/genre/movie/list?api_key=${API_KEY}`;
    this.url = GENRE_URL;
  }

  // get page() {
  //   return this.activePage;
  // }

  // set page(newPage) {
  //   this.activePage = newPage;
  // }
}