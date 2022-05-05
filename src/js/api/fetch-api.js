import axios from 'axios';

export default async function getMovies(url) {
  const result = await axios.get(url);
  return result.data;
}
