<<<<<<< Updated upstream
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






      
=======
import refs  from "./utils/refs";
import NewsApiService from "./api/newsApiService";

const apiService = new NewsApiService();

apiService.getGenreURL();

apiService.getData()
.then(entry => {
    const genreList =entry.genres;

    let searchMarcup = '<option value=0>All</option>'
    for (let i=0; i < genreList.length; i+=1) {       
      searchMarcup += "<option value="+ genreList[i].id +">"+genreList[i].name + "</option>"
            }
    refs.searcGenreForm.innerHTML = searchMarcup;


  })
  .catch(error => console.log(error));
>>>>>>> Stashed changes
