import refs from "./refs";
import NewsApiService from "../api/newsApiService";


refs.searcGenreForm.addEventListener("change",showResulte)
const apiService = new NewsApiService();



function showResulte() {
  const genreID = Number(refs.searcGenreForm.value);
 console.log(genreID)
     if ( genreID === 0){
// отрисовка стартовой страницы
   }
   else {

// отрисовка по поиску чрез новый метод
   }
}