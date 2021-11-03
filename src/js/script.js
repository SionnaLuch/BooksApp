{
  'use strict';
  const select = {
    templateOf: {
      book: '#template-book',
    },
    containerOf: {
      image: '.book__image',
      list: '.books-list',
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
    const favouriteBooks = [];
    const booksList = document.querySelector(select.containerOf.list);
    const bookImages = booksList.querySelectorAll(select.containerOf.image);
    for(let image of bookImages){
      image.addEventListener('click', function(event){
        event.preventDefault();
        image.classList.add('favorite');
        const bookID = image.getAttribute('data-id');
        favouriteBooks.push(bookID);
      });

    }

  }
  render();
  initActions();
}
