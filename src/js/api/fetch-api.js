import axios from 'axios';

export default async function getMovies(url) {
  const result = await axios.get(url);
  console.log(result.data);
  return result.data;
}
