import refs from "./refs";
import onQueueBtn from "./onQueueBtn";

export default function onWatchedBtn() {
    refs.galleryList.innerHTML = '';
    refs.watchedBtn.removeEventListener('click', onWatchedBtn); //виключаю слухач
    refs.queueBtn.addEventListener('click', onQueueBtn); //включаю на неактивну кнопку
    refs.queueBtn.classList.remove('active')
    refs.watchedBtn.classList.add('active');

    //якщо не буде переглянутих фільмів
    refs.paginationEl.classList.add('display-none') // немає фільмів, то не потрібна пагінація
    refs.galleryList.innerHTML = noWatched(); // пишу що нічого не подивилися ще
}

// повідомлення, якщо немає фільмів
function noWatched() {
    return '<h2 class="js-library-empty">hey...no movies watched</h2>'
}