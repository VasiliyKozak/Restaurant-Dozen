'use strict';

export  {
    
}

 // Находим все элементы на странице с атрибутом onclick
 const elementsWithOnClick = document.querySelectorAll('[onclick]');

 // Перебираем найденные элементы
 elementsWithOnClick.forEach(element => {
   element.addEventListener('click', function() {
     // Получаем значение атрибута onclick
     const onClickValue = this.getAttribute('onclick');
     
     // Извлекаем ID из значения атрибута onclick
     const id = onClickValue.match(/'(.*?)'/)[1];
     
     // Переходим к элементу с соответствующим ID
     const targetElement = document.getElementById(id);
     
     // Проверяем, что элемент с указанным ID существует
     if (targetElement) {
       // Прокручиваем страницу к элементу с указанным ID
       targetElement.scrollIntoView({ behavior: 'smooth' });
     }
   });
 });