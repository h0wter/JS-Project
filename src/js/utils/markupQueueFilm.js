import refs from './refs';
import movieCardTpl from '../movie-card.hbs';

export default function markupQueueFilm() {
  const savedQueueMovie = localStorage.getItem('Queue'); // отримую збережені фільми з пам'яті
  const parseSavedQueueMovie = JSON.parse(savedQueueMovie); // роблю масив збережених фільми для перебору

  // якщо немає збережених фільмів або немає localStorage то пише, що немає фільмів
  if (localStorage.getItem('Queue') === null || parseSavedQueueMovie.length === 0) {
    return (refs.galleryList.innerHTML = noQueue());
  }

  parseSavedQueueMovie.forEach(movie => {
    // створюю об'єкт з необхідними даними для розмітки
    let film = {
      backdrop_path: movie.backdrop_path,
      poster_path: movie.poster_path,
      original_title: movie.original_title,
      id: movie.id,
      genreNames: movie.genreNames,
      shortDate: Number.parseInt(movie.release_date),
      vote_average: movie.vote_average, // рейтинг записую під інше імя, щоб додавався тільки в бібліотеку
    };

    const genre = movie.genreNames;
    const genres = genre.split(','); // створюю масив жанрів
    film.genreNames = getGenreName(genres);

    // перевірка на кількість жанрів
    function getGenreName(genres) {
      if (!genres.length || genres.length === 0) {
        return;
      }
      if (genres.length <= 3) {
        return `${genres} | `;
      }
      return `${genres[0]}, ${genres[1]}, Other | `;
    }

    refs.galleryList.insertAdjacentHTML('beforeend', movieCardTpl(film)); // розмітка
  });
}

// повідомлення, якщо немає фільмів
function noQueue() {
  return '<h2 class="js-library-empty">oops...&nbsp no movies in the queue</h2>';
}
