import refs from "./refs";
import onWatchedBtn from "./onWatchedBtn";
import markupQueueFilm from "./markupQueueFilm";

export default function onQueueBtn() {
    refs.galleryList.innerHTML = '';
    refs.watchedBtn.classList.remove('active') // вимикаю стилі з неактивної кнопки
    refs.queueBtn.classList.add('active') // роблю активною кнопку черги
    refs.queueBtn.removeEventListener('click', onQueueBtn); // виключаємо слухач
    refs.watchedBtn.addEventListener('click', onWatchedBtn); // включаю слухач на тепер вже неактивну кнопку
    refs.paginationEl.classList.add('display-none') // не потрібна пагінація, бо такі фільми зберігає більше 20

    markupQueueFilm()
}

