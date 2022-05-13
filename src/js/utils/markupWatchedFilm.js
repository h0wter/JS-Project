import refs from './refs';
import fetchId from './fetchId';
import movieCardTpl from '../movie-card.hbs';

export default function markupWatchedFilm() {
  const savedWatchedId = localStorage.getItem('watched'); // отримую збережені id з пам'яті
  const parseSavedWatchedId = JSON.parse(savedWatchedId); // роблю масив збережених id для перебору

  // якщо немає збережених фільмів або немає localStorage то пише, що немає фільмів
  if (localStorage.getItem('watched') === null || parseSavedWatchedId.length === 0) {
    return (refs.galleryList.innerHTML = noWatched());
  }

  // створюю картки фільмів
  parseSavedWatchedId.forEach(e => {
    fetchId(e).then(movie => {
      //refs.galleryList.insertAdjacentHTML('beforeend', movieCardTpl(movie));
      refs.galleryList.innerHTML = movieCardTpl(movie);
    });
  });
}

// повідомлення, якщо немає фільмів
function noWatched() {
  return '<h2 class="js-library-empty">hey...no movies watched</h2>';
}
