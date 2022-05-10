import movieCardTpl from '../movie-card.hbs';
import { getGenreName } from '../getGenreName';
import refs from './refs';

// export default function createMoviesMarkup(data) {
//   return data
//     .map(entry => {
//       entry.genreNames = getGenreName(entry.genre_ids);
//       if (entry.release_date === '') {
//         entry.shortDate = '';
//         return entry;
//       }
//       entry.shortDate = entry.release_date.slice(0, 4);
//       return entry;
//     })
//     .map(movieCardTpl);
// }
export default function createMoviesMarkup(data) {
  const markup = data
    .map(entry => {
      entry.genreNames = getGenreName(entry.genre_ids);
      if (entry.release_date === '') {
        entry.shortDate = '';
        return entry;
      }
      entry.shortDate = entry.release_date.slice(0, 4);
      return entry;
    })

    .map(movieCardTpl)
    .join('');
  refs.galleryList.innerHTML = '';
  refs.galleryList.insertAdjacentHTML('beforeend', markup);
}
