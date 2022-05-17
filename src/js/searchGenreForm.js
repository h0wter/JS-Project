import refs from './utils/refs';

import NewsApiService from './api/newsApiService';

const apiService = new NewsApiService();

apiService.getGenreURL();
apiService.getData().then(entry => {
  const genreList = entry.genres;
  localStorage.setItem('Genre list', JSON.stringify(genreList));

  // const savedSettings = localStorage.getItem("Genre list")
  // const genreList = JSON.parse(savedSettings)

  let searchMarcup = '<option value=0>All Genres</option>';
  for (let i = 0; i < genreList.length; i += 1) {
    searchMarcup += '<option value=' + genreList[i].id + '>' + genreList[i].name + '</option>';
  }
  refs.searcGenreForm.innerHTML = searchMarcup;
});
