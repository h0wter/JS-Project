import refs from './refs';
import movieCardTpl from '../movie-card.hbs';

export default function markupWatchedFilm() {
  const savedWatchedMovie = localStorage.getItem('Watched'); // отримую збережені фільми з пам'яті
  const parseSavedWatchedMovie = JSON.parse(savedWatchedMovie); // роблю масив збережених фільмів для перебору

  // якщо немає збережених фільмів або немає localStorage то пише, що немає фільмів
  if (localStorage.getItem('Watched') === null || parseSavedWatchedMovie.length === 0) {
    return (refs.galleryList.innerHTML = noWatched());
  }

  const film = parseSavedWatchedMovie.map(e => movieCardTpl(e)).join('');
  refs.galleryList.insertAdjacentHTML('beforeend', film);
}

// повідомлення, якщо немає фільмів
function noWatched() {
  return '<h2 class="js-library-empty">hey...no movies watched</h2>';
}
