import refs from './utils/refs';
import { getGenre } from './getGenre';

export let genreList;

getGenre()
  .then(entry => {
    let searchMarcup = '<option value=0>All</option>'
    for (let key in entry) {       
      searchMarcup += "<option value="+key +">"+entry[key] + "</option>"
            }
    refs.searcGenreForm.innerHTML = searchMarcup;
      
  

    return (genreList = entry);
  })
  .catch(error => console.log(error));






      