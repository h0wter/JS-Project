import refs from "./refs";
import onWatchedBtn from "./onWatchedBtn";

export default function onQueueBtn() {
    refs.galleryList.innerHTML = '';
    refs.watchedBtn.classList.remove('active')
    refs.queueBtn.classList.add('active') // роблю активною кнопку черги
    refs.queueBtn.removeEventListener('click', onQueueBtn); // виключаємо слухач
    refs.watchedBtn.addEventListener('click', onWatchedBtn); // включаю слухач на тепер вже неактивну кнопку

    //якщо не буде фільмів в черзі то
    refs.paginationEl.classList.add('display-none') // немає фільмів, то не потрібна пагінація
    refs.galleryList.innerHTML = noQueue(); // пишу що немає фільмів в черзі
}

// повідомлення, якщо немає фільмів
function noQueue() {
    return '<h2 class="js-library-empty">oops...no movies in the queue</h2>'
}