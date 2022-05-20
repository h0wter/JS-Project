import './sass/main.scss';
import './js/api/fetch-api';
import Main from './js/main';

import { attachOpenModalEvent } from './js/utils/movieModal';
import onHomeBtn from './js/utils/onHomeBtn';
import onLibraryBtn from './js/utils/onLibraryBtn';

import refs from './js/utils/refs';

import { onScroll, goUp } from './js/utils/uparrow';

import onFormSubmit from './js/utils/onSubmit';
import './js/components/footerModal';


import './js/searchGenreForm';
import './js/utils/onSearchByGenre'


const main = new Main();

refs.form.addEventListener('submit', onFormSubmit);
refs.headerLogo.addEventListener('click', e => {
  e.preventDefault();
  main.init();
  onHomeBtn();
});

refs.homeBtn.addEventListener('click', e => {
  main.init();
});

refs.homeBtn.addEventListener('click', onHomeBtn);
refs.libraryBtn.addEventListener('click', onLibraryBtn);

attachOpenModalEvent();

addEventListener('scroll', onScroll);
refs.upBtn.addEventListener('click', goUp);
