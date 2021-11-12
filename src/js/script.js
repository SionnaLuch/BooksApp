
{
  'use strict';
  const select = {
    templateOf: {
      book: '#template-book',
    },
    containerOf: {
      image: '.book__image',
      list: '.books-list',
      filters: '.filters'
    }
  };
  const templates = {
    book: Handlebars.compile(document.querySelector(select.templateOf.book).innerHTML),

  };
  function render(){
    for(let book of dataSource.books){
      const bookData= {
        id: book.id,
        name: book.name,
        price: book.price,
        rating: book.rating,
        image: book.image,
      };
      const generatedHTML = templates.book(bookData);
      const generatedDOM = utils.createDOMFromHTML(generatedHTML);
      const containerOfList = document.querySelector(select.containerOf.list);
      containerOfList.appendChild(generatedDOM);
    }
  }
  function initActions(){
    const favoriteBooks = [];
    const booksList = document.querySelector(select.containerOf.list);
    //const bookImages = booksList.querySelectorAll(select.containerOf.image);
    booksList.addEventListener('click', function(event){
      event.preventDefault();
      const image = event.target.offsetParent;
      const bookID = image.getAttribute('data-id');
      
      if(favoriteBooks.includes(bookID)){
        image.classList.remove('favorite');
        favoriteBooks.pop(bookID);
      }else{
        image.classList.add('favorite');
        favoriteBooks.push(bookID);
      }
    });
    const filters = [];
    const filterBooks = document.querySelector(select.containerOf.filters);
    filterBooks.addEventListener('click',function(event){
      const filter = event.target;
      if(filter.tagName == 'INPUT' && filter.name == 'filter' && filter.type == 'checkbox'){
        if(filter.checked){
          filters.push(filter.value);
        }else{
          const valueIndexof = filters.indexOf(filter.value);
          filters.splice(valueIndexof, 1);
          
        }
      }
    });
  }



  render();
  initActions();
}
