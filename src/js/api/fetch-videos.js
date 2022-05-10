import axios from "axios";
import { settings } from "../utils/settings";


export default async function getMoviesVideo(id) {
    // console.log(`${settings.BASE_URL}movie/${id}/videos?api_key=${settings.API_KEY}&language=en-US`)
    const result = await axios.get(`${settings.BASE_URL}movie/${id}/videos?api_key=${settings.API_KEY}&language=en-US`);
    console.log(result)
    return result;
  }

//   https://api.themoviedb.org/3/movie/{movie_id}/videos?api_key=<<api_key>>&language=en-US