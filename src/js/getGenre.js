// import axios from 'axios';
// import { GENRE_URL } from './utils/settings';

// // const KEY = 'a96c6afcb6324213a620b6851c83fc98';
// // axios.defaults.baseURL = `https://api.themoviedb.org/3/genre/movie/list?api_key=${KEY}&language=en-US`;

// export async function getGenre() {
//   const response = await axios.get(GENRE_URL);
//   const listObj = {};
//   for (const { id, name } of response.data.genres) {
//     listObj[id] = name;
//   }
//   // console.log(listObj);
//   return listObj;
// }
