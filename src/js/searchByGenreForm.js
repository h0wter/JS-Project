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

