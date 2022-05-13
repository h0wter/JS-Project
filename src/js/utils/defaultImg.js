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

