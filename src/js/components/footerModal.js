(() => {
  const openModalBtn = document.querySelector('.goit-student');
  const closeModalBtn = document.querySelector('[data-footer-modal-close]');
  const modal = document.querySelector('[data-footer-modal]');

  openModalBtn.addEventListener('click', onOpen);

  function onOpen() {
    modal.classList.remove('is-hidden');
    modal.addEventListener('click', onClose);
    document.addEventListener('keydown', onClose);
    closeModalBtn.addEventListener('click', onClose);
  }

  function onClose(event) {
    if (
      event.target.classList.contains('footer-backdrop') ||
      event.keyCode == 27 ||
      event.target.classList.contains('footer__btn-close')
    ) {
      modal.classList.toggle('is-hidden');
      modal.removeEventListener('click', onClose);
      document.removeEventListener('keydown', onClose);
      closeModalBtn.removeEventListener('click', onClose);
    }
  }
})();
