import refs from './refs';

function createTrailerModal(movie) {
  if (!movie) return;
  const modalBtnPlayer = document.querySelector('.modal__btn--player');
  modalBtnPlayer.addEventListener('click', () => {
    onCreateMarkup(movie);
  });
}

function onCreateMarkup(movie) {
  const modalTrailer = document.querySelector('.backdrop-trailer');
  modalTrailer.classList.remove('is-hidden');
  modalTrailer.innerHTML = `
    <div class="modal-trailer"> 
    <iframe
      class='info-video-frame'
      src='https://www.youtube.com/embed/${movie.video}?autoplay=1'
      frameborder='0'
      frameborder='0'
      allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
      allowfullscreen
    >
    </iframe>
    </div>
    `;
  modalTrailer.addEventListener('click', onCloseModal);
  document.addEventListener('keydown', onCloseModal);
}

function onCloseModal(e) {
  const modalTrailer = document.querySelector('.backdrop-trailer');
  if (e.target.classList.contains('backdrop-trailer')) {
    modalTrailer.classList.add('is-hidden');
    modalTrailer.innerHTML = '';
  }

  if (e.key === 'Escape') {
    modalTrailer.classList.add('is-hidden');
    modalTrailer.innerHTML = '';
  }
  modalTrailer.removeEventListener('click', onCloseModal);
  document.removeEventListener('keydown', onCloseModal);
}

export { createTrailerModal };
