'use strict';

export  {
    
}



// При нажатии на картинку - открывает, скрывает баннер "информация о товаре" для одной карточки на странице
// const toggleLink = document.getElementById('toggleLink');
// const blockToToggle = document.getElementById('blockToToggle');
// const toggleButton = document.getElementById('toggleButton');

// toggleLink.addEventListener('click', function(event) {
//   event.preventDefault();
//   blockToToggle.style.display = blockToToggle.style.display === 'none' ? 'block' : 'none';
// });

// toggleButton.addEventListener('click', function() {
//   blockToToggle.style.display = 'none';
// });






// При нажатии на картинку - открывает, скрывает баннер "информация о товаре" для всех карточек на странице
// const toggleLinks = document.querySelectorAll('.card__image');
// const productBlocks = document.querySelectorAll('.product');
// const toggleButtons = document.querySelectorAll('.popup__close');

// toggleLinks.forEach((toggleLink, index) => {
//   toggleLink.addEventListener('click', function(event) {
//     event.preventDefault();
//     productBlocks[index].style.display = productBlocks[index].style.display === 'none' ? 'block' : 'none';
//   });
// });

// toggleButtons.forEach((toggleButton, index) => {
//   toggleButton.addEventListener('click', function() {
//     productBlocks[index].style.display = 'none';
//   });
// });


// При клике на картинку - открывает баннер "информация о товаре". При клике на пустое место на экране закрывает баннер. Для всех карточек на странице
const toggleLinks = document.querySelectorAll('.card__image');
const productBlocks = document.querySelectorAll('.product');
const toggleButtons = document.querySelectorAll('.popup__close');

toggleLinks.forEach((toggleLink, index) => {
  toggleLink.addEventListener('click', function(event) {
    event.preventDefault();
    productBlocks[index].style.display = productBlocks[index].style.display === 'none' ? 'block' : 'none';
  });
});

toggleButtons.forEach((toggleButton, index) => {
  toggleButton.addEventListener('click', function() {
    productBlocks[index].style.display = 'none';
  });
});

document.addEventListener('click', function(event) {
  if (!event.target.closest('.product') && !event.target.closest('.card__image') && !event.target.closest('.popup__close')) {
    productBlocks.forEach((productBlock) => {
      productBlock.style.display = 'none';
    });
  }
});



