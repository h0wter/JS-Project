import renderListOfPages from './renderListOfPages';

import NewsApiService from './news-service';







export default class PaginationMain {
  constructor() {
    this.pagination = document.querySelector('.js-pagination');
    this.init()
  }
  

  init() {
    
    const apiService = new NewsApiService()
    apiService.request().then(({data}) => {
      let page = 1;
      let totalPages = data.total_pages;
      console.log('39',totalPages)
      renderListOfPages(page, totalPages, this.pagination)
      return {page, totalPages};
    }).then(({ page, totalPages }) => {
      Number(page);
       document.addEventListener('click', (e) => {
         const classes = e.target.classList;
        //  page = e.target.dataset?.page;
        
         const dataAtrrPage = e.target.dataset?.page;
        
        if (dataAtrrPage === "next") { page += 1 }
        else if (dataAtrrPage === "prev") { page -= 1; }
        else{page = dataAtrrPage}
         
        const isPagination = classes.contains('footer__item');
     
         const shouldRender = isPagination && !classes.contains('active') && page;
         
         if (!shouldRender) {
            return true;
          }
        renderListOfPages(page, totalPages, this.pagination);
      })
    })
  
  }
    
}
