"use strict";

// Función asíncrona que recibe el código y lo envía al servidor para recibir los datos del producto
const loadProduct = async code => {
  let url = "../model/load_product.php";
  const response = await fetch(url, {
    method: "POST",
    body: JSON.stringify(code)
  });
  const data = await response.json();
  // Enviamos la data a otra función para mostrar los datos del producto
  viewProduct(data);
};

// Función que recibe los datos y los muestra en el formulario
const viewProduct = data => {
  productContainer.innerHTML = `<img src="${data.file}" alt="producto" loading="lazy" class="product__img">`;
  const article = document.createElement("article");
  article.classList.add("product__content")
  article.innerHTML = `
    <h2 class="product__title">${data.name}</h2>
    <h3 class="product__price">S/ ${data.price.toFixed(2)}</h3>
    <p>${data.description}</p>`;
  const div = document.createElement("div");
  div.classList.add("product__actions");
  const lessButton = document.createElement("button");
  lessButton.id = data.code;
  lessButton.classList.add("product__icon");
  lessButton.innerHTML = `<i class="fa-solid fa-minus"></i>`;
  // Listener que llama una función para disminuir la cantidad de productos
  lessButton.addEventListener("click", () => lessProduct());
  const plusButton = document.createElement("button");
  plusButton.id = data.code;
  plusButton.classList.add("product__icon");
  plusButton.innerHTML = `<i class="fa-solid fa-plus"></i>`;
  // Listener que llama una función para aumentar la cantidad de productos
  plusButton.addEventListener("click", () => plusProduct());
  const quantity = document.createElement("span");
  quantity.classList.add("product__quantity");
  quantity.textContent = 1;
  quantity.value = 1;
  div.append(lessButton, quantity, plusButton);
  const button = document.createElement("button");
  button.classList.add("product__button");
  button.textContent = "Agregar al Carrito";
  button.addEventListener("click", () => addCart(data));
  article.append(div, button);
  productContainer.appendChild(article);
};

// Función para aumentar la cantidad de productos
const plusProduct = () => {
  let quantity = document.querySelector(".product__quantity")
  if (quantity.value >= 10 ) {
    console.log("lleno");
  } else {
    quantity.value = parseInt(quantity.value + 1);
    quantity.textContent = quantity.value;
  }
};

// Función para reducir la cantidad de productos
const lessProduct = () => {
  let quantity = document.querySelector(".product__quantity")
  if (quantity.value <= 1 ) {
    console.log("vacio");
  } else {
    quantity.value = parseInt(quantity.value - 1);
    quantity.textContent = quantity.value;
  }
};

const addCart = data => {
  let quantity = document.querySelector(".product__quantity")
  if (shopCart.some(product => product.code === data.code)) {
    window.location.href = "cart.html";
  } else {
    data.quantity = quantity.value;
    data.subtotal = data.price * data.quantity;
    shopCart.push(data);
    localStorage.setItem("shopCart", JSON.stringify(shopCart));
  };
  updateCart();
};

const productContainer = document.getElementById("productContainer");

// Obtenemos el código de producto de la url
let queryStrings = new URLSearchParams(window.location.search);
let code = queryStrings.get('code');

// Enviamos el código al servidor para obtener los datos
loadProduct(code);