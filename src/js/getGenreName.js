import { genreList } from '../index.js';




export function getGenreName(idList) {


  const list = localStorage.getItem("Genre list")

  const glist = JSON.parse(list)
  const listObj = {};
    for (const { id, name } of glist) {
      listObj[id] = name;
    }



  const foundGenres = idList.map(id => listObj[id]).filter(genre => genre);

  if (foundGenres.length <= 3) {
    return foundGenres.join(', ');
  }
  return `${foundGenres[0]}, ${foundGenres[1]}, Other`;
}

export function getFullGerneNames(idList) {
  const list = localStorage.getItem("Genre list")

  const glist = JSON.parse(list)
  const listObj = {};
    for (const { id, name } of glist) {
      listObj[id] = name;
    }

  return idList.map(id => listObj[id]).filter(genre => genre).join(', ');
}