export const refUpbtn = document.querySelector('.upbtn');
export function onScroll() {
  if (window.pageYOffset > 200) {
    refUpbtn.classList.remove('notVisible');
    refUpbtn.animate(
      [{ transform: 'rotate(0)' }, { transform: 'rotate(180deg' }],
      2000,
      'forwards',
    );
  } else {
    refUpbtn.classList.add('notVisible');
  }
}
export function goUp() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
  console.log(window);
  window.scrollY = 0;
}
