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
      // refs.galleryList.insertAdjacentHTML('beforeend', movieCardTpl(movie));
      refs.galleryList.innerHTML = movieCardTpl(movie);
    });
  });
}

// повідомлення, якщо немає фільмів
function noQueue() {
  return '<h2 class="js-library-empty">oops...no movies in the queue</h2>';
}
