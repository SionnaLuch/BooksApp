
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
  const filters = [];
  const favoriteBooks = [];
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
    //const favoriteBooks = [];
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
    //const filters = [];
    const filterBooks = document.querySelector(select.containerOf.filters);
    filterBooks.addEventListener('click',function(event){
      const clickedElm = event.target;
      if(clickedElm.tagName == 'INPUT' && clickedElm.name == 'filter' && clickedElm.type == 'checkbox'){
        if(clickedElm.checked){
          filters.push(clickedElm.value);
        }else{
          const valueIndexof = filters.indexOf(clickedElm.value);
          filters.splice(valueIndexof, 1);
          
        }
      }
      books();
    });
    
  }
  function books(){
    for(let book of dataSource.books){
      const filteredBook  = document.querySelector('.book__image[data-id="' + book.id + '"]');
      let shouldBeHidden = false;
      for( const filter of filters){
        if(!book.details[filter]){
          shouldBeHidden = true;
          break;
        }
      }
      //const filteredBook  = document.querySelector('.book__image[data-id="' + book.id + '"]');
      if(shouldBeHidden === true){
        filteredBook.classList.add('hidden');
      }else{
        filteredBook.classList.remove('hidden');
      }


    }
  }

  


  render();
  initActions();
}
