import movieCardTpl from '../movie-card.hbs';
import { getGenreName } from '../getGenreName';

export default function createMoviesMarkup(data) {
  return data
    .map(entry => {
      entry.genreNames = getGenreName(entry.genre_ids);
      entry.shortDate = entry.release_date.slice(0, 4);
      return entry;
    })
    .map(movieCardTpl);
}
