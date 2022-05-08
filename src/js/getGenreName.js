import { genreList } from './searchByGenreForm';

export function getGenreName(idList) {
  if (idList.length <= 3) {
    return idList.map(id => genreList[id]).join(', ');
  }
  return `${genreList[idList[0]]}, ${genreList[idList[1]]}, Other`;
}
