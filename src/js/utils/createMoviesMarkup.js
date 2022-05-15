import movieCardTpl from '../movie-card.hbs';
import { getGenreName } from '../getGenreName';

export default function createMoviesMarkup(data) {


  return data
    .map(entry => {
      entry.genreNames = getGenreName(entry.genre_ids);
      if (!entry.release_date&&!entry.first_air_date) {
        entry.shortDate = '';
        return entry;
      }
      entry.shortDate = entry.release_date?entry.release_date.slice(0, 4):entry.first_air_date.slice(0, 4);
      entry.showDivider = entry.genreNames && entry.shortDate;
      return entry;
    })
    .map(movieCardTpl);
}
