import refs from './refs'
import onLibraryBtn from './onLibraryBtn';

export default function onHomeBtn () {
    refs.libraryContainer.classList.add('display-none'); //показує пошук
    refs.homeContainer.classList.remove('display-none'); // ховає меню з бібліотеки
    refs.libraryBtn.addEventListener('click', onLibraryBtn); // щоб працювала кнопка бібліотеки
    refs.libraryBtn.classList.remove('current'); // знімає підсвітку з невідкритої кнопки
    refs.homeBtn.classList.add('current'); // підсвічує теперішню кнопку
    refs.headerEl.classList.remove('header-fon'); // міняє фон 

    // перевірка на видимість пагінації з кнопки library
    if (refs.paginationEl.classList.contains('display-none')) {
        refs.paginationEl.classList.remove('display-none')
    }
}