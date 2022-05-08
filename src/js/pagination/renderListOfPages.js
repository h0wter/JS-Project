export default function renderListOfPages(activePage, totalPages, pagination) {
  pagination.innerHTML = '';
  
console.log(totalPages - 6)
  
  
  function markupLi(page, text, addClass) {
    const dataAttr = page ? `data-page="${page}"` : '';
    const activeClass = Number(activePage) === Number(page) ? 'is-active' : '';

    
    return `<li class="footer__item ${activeClass} ${addClass || ''}" ${dataAttr}>${text}</li>`
  }

  const markupFirstLi = markupLi(1, 1);
  const markupLastLi = markupLi(totalPages, totalPages);
  const markupDots = markupLi(null, '...')
  const markupArrowLeft = markupLi('prev', '&#x02190', 'footer__arrow footer__arrow-left')
  const markupArrowRight = markupLi('next', '&#x02192', 'footer__arrow footer__arrow-right')

  let markup = []
  if (totalPages <= 11) {
    for (let i = 1; i <= totalPages; i += 1) {
      markup.push(markupLi(i, i));
    }

    pagination.insertAdjacentHTML('beforeend', markup.join(''));
  }
  

  if (activePage > 6 && activePage < (totalPages - 6)) {
    markup.push(markupArrowLeft);
    markup.push(markupFirstLi);

    markup.push(markupDots);

    for (let i = Number(activePage) - 2; i <= Number(activePage) + 2; i += 1) {
      markup.push(markupLi(i, i));
    }
    markup.push(markupDots);
    markup.push(markupLastLi);
    markup.push(markupArrowRight);

    pagination.insertAdjacentHTML('beforeend', markup.join(''));
  }
  
 

  if (activePage <= 6) {
    for (let i = 1; i <= 8; i += 1) {
      markup.push(markupLi(i, i));
    }
    markup.push(markupDots);
    markup.push(markupLastLi);
    markup.push(markupArrowRight);
    console.log(markup);

    pagination.insertAdjacentHTML('beforeend', markup.join(''));
  }
  
  
 

  if (activePage >= Number(totalPages - 6)) {
    markup.push(markupArrowLeft);
    markup.push(markupFirstLi);
    markup.push(markupDots);

    for (let i = Number(totalPages - 7) ; i <= totalPages; i += 1) {
      markup.push(markupLi(i, i));
    }

    pagination.insertAdjacentHTML('beforeend', markup.join(''));
  }


  return markup

}
