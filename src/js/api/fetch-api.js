const BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = 'api_key=e900ddd99edc3affd146f1905e638fd1';
const API_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc&'+API_KEY;
const IMG_URL = 'https://image.tmdb.org/t/p/w500';
const searchURL = BASE_URL + '/search/movie?'+API_KEY;

const main = document.getElementById('main');
const form =  document.getElementById('form');
const search = document.getElementById('search');

getMovies(API_URL);

function getMovies(url) {
    fetch(url).then(res => res.json()).then(data => {
        showMovies(data.results);
    })
}

function showMovies(data) {
    main.innerHTML = '';

    data.forEach(movie => {
        const {title, poster_path, vote_average, id} = movie;
        const movieEl = document.createElement('div');
        movieEl.classList.add('movie');
        movieEl.innerHTML = `
             <img class="gallery__img" src="${poster_path? IMG_URL+poster_path: "http://via.placeholder.com/1080x1580" }" alt="${title}">
            <div class="gallery__thumb">
                <h3 class="gallery__name">${title}</h3>
                <p "gallery__description">
                  <span>${vote_average}</span>
                </p>

            </div>`

        main.appendChild(movieEl);

        document.getElementById(id).addEventListener('click', () => {
          console.log(id)
          openNav(movie)
        })
    })
}

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const searchTerm = search.value;
    if(searchTerm) {
        getMovies(searchURL+'&query='+searchTerm)
    }

})
