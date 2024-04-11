'use strict';
export{

} 


import { 
    
} from './product.js';


import { 
    
} from './category.js';

import { 
    
} from './upButton.js';

function toNum(str) {
    const num = parseFloat(str.replace(/ /g, "").replace(",", "."));
    return num;
}

function toCurrency(num) {
    const format = new Intl.NumberFormat("ru-RU", {
        style: "currency",
        currency: "RUB",
        minimumFractionDigits: 0,
    }).format(num);
    return format;
}

const cardAddArr = Array.from(document.querySelectorAll(".card__add"));
const cartNum = document.querySelector("#cart_num");
const cart = document.querySelector("#cart");

const popup = document.querySelector(".popup");
const popupClose = document.querySelector("#popup_close");
const body = document.body;
const popupContainer = document.querySelector("#popup_container");
const popupProductList = document.querySelector("#popup_product_list");
const popupCost = document.querySelector("#popup_cost");
const popupDiscount = document.querySelector("#popup_discount");
const popupCostDiscount = document.querySelector("#popup_cost_discount");

cart.addEventListener("click", (e) => {
    e.preventDefault();
    popup.classList.add("popup--open");
    body.classList.add("lock");
});

popupClose.addEventListener("click", (e) => {
    e.preventDefault();
    popup.classList.remove("popup--open");
    body.classList.remove("lock");
});





class Product {
    constructor(card, discountPercentage) {
        this.imageSrc = card.querySelector(".card__image img").src;
        this.name = card.querySelector(".card__title").innerText;
        this.price = card.querySelector(".card__price--common").innerText;
        this.discountPercentage = discountPercentage;
        this.priceDiscount = calculateDiscountedPrice(this.price, this.discountPercentage);
    }
}

function calculateDiscountedPrice(price, discountPercentage) {
    const discountedPrice = parseFloat(price) * (1 - discountPercentage / 100);
    return discountedPrice.toFixed(2); // Округление до двух знаков после запятой
}

class Cart {
    constructor() {
        this.products = [];
    }
    
    get count() {
        return this.products.length;
    }
    
    addProduct(product) {
        this.products.push(product);
    }
    
    removeProduct(index) {
        if (index >= 0 && index < this.products.length) {
            this.products.splice(index, 1);
        }
    }
    
    get cost() {
        return this.products.reduce((acc, product) => acc + toNum(product.price), 0);
    }
    
    get costDiscount() {
        return this.products.reduce((acc, product) => acc + toNum(product.priceDiscount), 0);
    }
    
    get discount() {
        return this.cost - this.costDiscount;
    }
}

const myCart = new Cart();

if (localStorage.getItem("cart") === null) {
    localStorage.setItem("cart", JSON.stringify(myCart));
}

const savedCart = JSON.parse(localStorage.getItem("cart"));
myCart.products = savedCart.products;
cartNum.textContent = myCart.count;

cardAddArr.forEach((cardAdd) => {
    cardAdd.addEventListener("click", (e) => {
        e.preventDefault();
        const card = e.target.closest(".card");
        
        const discountPercentage = parseInt(card.dataset.discount); // Получаем процент скидки из атрибута data-discount
        
        const product = new Product(card, discountPercentage); // Устанавливаем процент скидки
        
        myCart.addProduct(product);
        
        localStorage.setItem("cart", JSON.stringify(myCart));
        
        cartNum.textContent = myCart.count;
        
        popupContainerFill();
    });
});

function popupContainerFill() {
    popupProductList.innerHTML = "";
    
    myCart.products.forEach((product, index) => {
        const productItem = document.createElement("div");
        productItem.classList.add("popup__product");

        const productImage = document.createElement("img");
        productImage.classList.add("popup__product-image");
        productImage.src = product.imageSrc;

        const productTitle = document.createElement("h2");
        productTitle.classList.add("popup__product-title");
        productTitle.textContent = product.name;

        const productPrice = document.createElement("div");
        productPrice.classList.add("popup__product-price");
        productPrice.textContent = toCurrency(toNum(product.priceDiscount));

        const productDelete = document.createElement("button");
        productDelete.classList.add("popup__product-delete");
        productDelete.textContent = "удалить";
        
         // Обработчик удаления продукта
         productDelete.addEventListener("click", () => { 
            myCart.removeProduct(index); 
            localStorage.setItem("cart", JSON.stringify(myCart)); 
            popupContainerFill(); 
            cartNum.textContent=myCart.count; 
            popupCost.textContent=toCurrency(myCart.cost); 
            popupDiscount.textContent=toCurrency(myCart.discount); 
            popupCostDiscount.textContent=toCurrency(myCart.costDiscount); 
         });
        
         productItem.appendChild(productImage);
         productItem.appendChild(productTitle);
         productItem.appendChild(productPrice);
         productItem.appendChild(productDelete);
         
         popupProductList.appendChild(productItem);
     });
     
     popupCost.textContent=toCurrency(myCart.cost);
     popupDiscount.textContent=toCurrency(myCart.discount);
     popupCostDiscount.textContent=toCurrency(myCart.costDiscount);

}

popupContainerFill();


function toggleAddress() {
    var delivery_option = document.getElementById("delivery_option").value;
    if (delivery_option == "pickup") {
      document.getElementById("address").style.display = "block";
    } else {
      document.getElementById("address").style.display = "none";
    }
  }
























  