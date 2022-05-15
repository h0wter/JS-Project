import refs from './refs';
import fetchId from './fetchId';
import movieCardTpl from '../movie-card.hbs';

export default function markupQueueFilm() {
  const savedQueueId = localStorage.getItem('Queue'); // отримую збережені id з пам'яті
  const parseSavedQueueId = JSON.parse(savedQueueId); // роблю масив збережених id для перебору

  // якщо немає збережених фільмів або немає localStorage то пише, що немає фільмів
  if (localStorage.getItem('Queue') === null || parseSavedQueueId.length === 0) {
    return (refs.galleryList.innerHTML = noQueue());
  }

  // створюю картки фільмів
  parseSavedQueueId.forEach(e => {
    fetchId(e).then(movie => {
      // створюю об'єкт з необхідними даними для розмітки
      let film = {
        backdrop_path: movie.backdrop_path,
        poster_path: movie.poster_path,
        original_title: movie.original_title,
        id: movie.id,
        genreNames: movie.genres,
        shortDate: Number.parseInt(movie.release_date),
      };

      // дістаю жанри
      const genres = movie.genres.map(m => m.name);
      film.genreNames = getGenreName(genres);

      // функція з перевіркою на кількість жанрів
      function getGenreName(genres) {
        if (genres.length === 0) {
          return;
        }
        if (genres.length <= 3) {
          let str = genres.join(', ');
          return `${str} | `;
        }
        return `${genres[0]}, ${genres[1]}, Other | `;
      }

      refs.galleryList.insertAdjacentHTML('beforeend', movieCardTpl(film));
      return;
    });
  });
}

// повідомлення, якщо немає фільмів
function noQueue() {
  return '<h2 class="js-library-empty">oops...no movies in the queue</h2>';
}
