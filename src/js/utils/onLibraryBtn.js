import refs from './refs'

export default function onLibraryBtn() {
    refs.homeConteiner.classList.add('display-none'); //ховає все з меню форми
    refs.libraryConteiner.classList.remove('display-none'); //відкриває приховану бібліотеку
    refs.libraryBtn.removeEventListener('click', onLibraryBtn); //немає потреби ще раз робити щось при натисканні на кнопку
    refs.homeBtn.classList.remove('curent'); // знімає підсвітку з невідеритої кнопки
    refs.libraryBtn.classList.add('curent'); // підсвічує теперішню кнопку
    refs.headerEl.classList.add('header-fon'); // міняє фон 
    
    onWatchedBtn()
    // refs.queueBtn.addEventListener('click', onQueueBtn);

    // перевірка якщо будуть клацати кнопками 
    if (!refs.watchedBtn.classList.contains('active')) {
        refs.queueBtn.classList.remove('active')
        refs.watchedBtn.classList.add('active');
    }
};

function onWatchedBtn() {
    refs.galleryList.innerHTML = '';
    refs.watchedBtn.removeEventListener('click', onWatchedBtn); //виключаю слухач
    refs.queueBtn.addEventListener('click', onQueueBtn); //включаю на неактивну кнопку
    refs.queueBtn.classList.remove('active')
    refs.watchedBtn.classList.add('active');

    //якщо не буде переглянутих фільмів
    refs.paginationEl.classList.add('display-none') // немає фільмів, то не потрібна пагінація
    refs.galleryList.innerHTML = noWatched(); // пишу що нічого не подивилися ще
}

function onQueueBtn() {
    refs.galleryList.innerHTML = '';
    refs.watchedBtn.classList.remove('active')
    refs.queueBtn.classList.add('active') // роблю активною кнопку черги
    refs.queueBtn.removeEventListener('click', onQueueBtn); // виключаємо слухач
    refs.watchedBtn.addEventListener('click', onWatchedBtn); // включаю слухач на тепер вже неактивну кнопку

    //якщо не буде фільмів в черзі то
    refs.paginationEl.classList.add('display-none') // немає фільмів, то не потрібна пагінація
    refs.galleryList.innerHTML = noQueue(); // пишу що немає фільмів в черзі
}

function noWatched() {
    return '<h2 class="js-library-empty">hey...no movies watched</h2>'
}

function noQueue() {
    return '<h2 class="js-library-empty">oops...no movies in the queue</h2>'
}