import refs from './refs';
import movieCardTpl from '../movie-card.hbs';

export default function markupQueueFilm() {
  const savedQueueMovie = localStorage.getItem('Queue'); // отримую збережені фільми з пам'яті
  const parseSavedQueueMovie = JSON.parse(savedQueueMovie); // роблю масив збережених фільми для перебору

  // якщо немає збережених фільмів або немає localStorage то пише, що немає фільмів
  if (localStorage.getItem('Queue') === null || parseSavedQueueMovie.length === 0) {
    return (refs.galleryList.innerHTML = noQueue());
  }

  const film = parseSavedQueueMovie.map(e => movieCardTpl(e)).join('');
  refs.galleryList.insertAdjacentHTML('beforeend', film);
}

// повідомлення, якщо немає фільмів
function noQueue() {
  return '<h2 class="js-library-empty">oops...no movies in the queue</h2>';
}
