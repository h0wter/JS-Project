import { genreList } from '../index';

export function getGenreName(idList) {
  const foundGenres = idList.map(id => genreList[id]).filter(genre => genre);

  if (foundGenres.length <= 3) {
    return foundGenres.join(', ');
  }
  return `${foundGenres[0]}, ${foundGenres[1]}, Other`;
}

export function getFullGerneNames(idList) {
  return idList.map(id => genreList[id]).filter(genre => genre).join(', ');
}