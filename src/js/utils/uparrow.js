import refs from './refs.js';
export function onScroll() {
  if (window.pageYOffset > 200) {
    refs.upBtn.classList.remove('notvisible');
    refs.upBtn.classList.add('arrowspin');
  } else {
    refs.upBtn.classList.add('notvisible');
    refs.upBtn.classList.remove('arrowspin');
  }
}
export function goUp() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
}
