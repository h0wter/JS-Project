import movieCardTpl from '../movie-card.hbs';

export default function createMoviesMarkup(data) {
  return data.map(movieCardTpl);
}
