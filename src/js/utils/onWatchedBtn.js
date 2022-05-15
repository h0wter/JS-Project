import refs from "./refs";
import onQueueBtn from "./onQueueBtn";
import markupWatchedFilm from "./markupWatchedFilm";

export default function onWatchedBtn() {
    refs.galleryList.innerHTML = '';
    refs.watchedBtn.removeEventListener('click', onWatchedBtn); //виключаю слухач
    refs.queueBtn.addEventListener('click', onQueueBtn); //включаю на неактивну кнопку
    refs.queueBtn.classList.remove('active') // вимикаю стилі з неактивної кнопки
    refs.watchedBtn.classList.add('active'); // додаю стилі на активну кнопку
    refs.paginationEl.classList.add('display-none') // не потрібна пагінація, бо такі фільми зберігає більше 20
    
    markupWatchedFilm()
}