import IMG_URL from './settings';
import defaultImg from '../../images/default_img/filmoteka.jpg';

// export function getImgPath(imgPath) {
//   (!imgPath ? `${defaultImg}` : `${IMG_URL}${imgPath}`)
// };

// export default function imagePath(results) {
//   const normalObjs = results.map(element => {
//     let temp = normalizationMovieObj(element);
//     const imgPath = temp.img.value;
//     imgPath == null || image=='' ? `${defaultImg}` : `${IMG_URL}${imgPath}`;

//   });
//   refs.galleryList.insertAdjacentHTML('beforeend', movieCardTpl(normalObjs));
// }

export function getImg(poster_path) {
  if (poster_path) {
    return `${IMG_URL} + poster_path`;
  } else {
    return defaultImg;
  }
}

