import refs from './refs'
import onLibraryBtn from './onLibraryBtn';

export default function onHomeBtn () {
    refs.libraryConteiner.classList.add('display-none'); //показує пошук
    refs.homeConteiner.classList.remove('display-none'); // ховає меню з бібліотеки
    refs.libraryBtn.addEventListener('click', onLibraryBtn); // щоб працювала кнопка бібліотеки
    refs.libraryBtn.classList.remove('curent'); // знімає підсвітку з невідеритої кнопки
    refs.homeBtn.classList.add('curent'); // підсвічує теперішню кнопку
    refs.headerEl.classList.remove('header-fon'); // міняє фон 

    // перевірка на видимість пагінації з кнопки library
    if (refs.paginationEl.classList.contains('display-none')) {
        refs.paginationEl.classList.remove('display-none')
    }
}