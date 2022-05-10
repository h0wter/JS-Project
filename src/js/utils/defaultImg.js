import IMG_URL from './settings';
import defaultImg from '../../images/default_img/filmoteka.jpg';
import movieCardTpl from '../movie-card.hbs';
import { refs } from './refs';

export const getImgPath = imgPath => (!imgPath ? `${defaultImg}` : `${IMG_URL}${imgPath}`);

// export default function imagePath(results) {
//   const normalObjs = results.map(element => {
//     let temp = normalizationMovieObj(element);
//     const imgPath = temp.img.value;
//     imgPath == null || image=='' ? `${defaultImg}` : `${IMG_URL}${imgPath}`;

//   });
//   refs.galleryList.insertAdjacentHTML('beforeend', movieCardTpl(normalObjs));
// }

export const normalizationMovieObj = ({
  genre_ids,
  id,
  original_title,
  overview,
  popularity,
  poster_path,
  release_date,
  vote_average,
  vote_count,
}) => ({
  genre: genre_ids,
  id: id,
  title: original_title,
  about: overview,
  popularity: popularity,
  img: defaultImgPath(poster_path),
  releaseDate: release_date,
  vote_average: vote_average,
  vote_count: vote_count,
});
