import refs from './refs';
import onWatchedBtn from './onWatchedBtn';

export default function onLibraryBtn() {
    refs.homeContainer.classList.add('display-none'); //ховає все з меню форми
    refs.libraryContainer.classList.remove('display-none'); //відкриває приховану бібліотеку
    refs.libraryBtn.removeEventListener('click', onLibraryBtn); //немає потреби ще раз робити щось при натисканні на кнопку
    refs.homeBtn.classList.remove('current'); // знімає підсвітку з невідеритої кнопки
    refs.libraryBtn.classList.add('current'); // підсвічує теперішню кнопку
    refs.headerEl.classList.add('header-fon'); // міняє фон 
    refs.headerEl.classList.add('js-header') // менший падінг
    
    onWatchedBtn()
    // refs.queueBtn.addEventListener('click', onQueueBtn);
};

