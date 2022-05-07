const refs = {
  openModalBtn: document.querySelector('[data-modal-open]'),
  closeModalBtn: document.querySelector('[data-modal-close]'),
  modal: document.querySelector('[data-modal]'),
  galleryList: document.querySelector('.gallery__list'),
  form: document.getElementById('form'),
  search: document.getElementById('search'),
  homeBtn: document.querySelector('.js-home'),
  libraryBtn: document.querySelector('.js-library'),
  watchedBtn: document.querySelector('.js-watched'),
  queueBtn: document.querySelector('.js-queue'),
  libraryConteiner: document.querySelector('.header_buttons-conteiner'),
  homeConteiner: document.querySelector('.header_form-container'),
  paginationEl: document.querySelector('.footer__action'),
  headerEl: document.querySelector('header'),
  inputError: document.getElementById('input-error'),
};

export default refs;
