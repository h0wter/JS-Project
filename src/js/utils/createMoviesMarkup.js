import movieCardTpl from '../movie-card.hbs';
import { getGenreName } from '../getGenreName';
import { getImg } from './defaultImg';

export default function createMoviesMarkup(data) {
  return data
    .map(entry => {
      entry.genreNames = getGenreName(entry.genre_ids);
      if (!entry.release_date) {
        entry.shortDate = '';
        return entry;
      }
      entry.img = getImg(poster_path);
      entry.shortDate = entry.release_date.slice(0, 4);
      entry.showDivider = entry.genreNames && entry.shortDate;
      return entry;
    })
    .map(movieCardTpl);
}
// export default function createMoviesMarkup(data) {
//   const markup = data
//     .map(entry => {
//       entry.genreNames = getGenreName(entry.genre_ids);
//       if (!entry.release_date) {
//         entry.shortDate = '';
//         return entry;
//       }
//       entry.shortDate = entry.release_date.slice(0, 4);
//       entry.showDivider = entry.genreNames && entry.shortDate;
//       return entry;
//     })

//     .map(movieCardTpl)
//     .join('');
//   refs.galleryList.innerHTML = '';
//   refs.galleryList.insertAdjacentHTML('beforeend', markup);
//   return markup;
// }
