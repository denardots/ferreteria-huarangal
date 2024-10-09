"use strict";

// Función que recibe las categorías de productos
const loadCategory = async () => {
  let url = "../model/load_category.php";
  const response = await fetch(url);
  const data = await response.json();
  // Llamamos a una función y le enviamos la data para mostrar las categorias
  viewCategory(data);
};

// Función que recibe las categorías de productos y las muestra en el formulario
const viewCategory = data => {
  data.forEach(category => {
    const link = document.createElement("LI");
    link.innerHTML = `<a href="products.html?id=${category.id}" class="categories__link">${category.category}</a>`;
    categoriesMenu.appendChild(link);
  });
};

const updateCart = () => {
  menuCart.textContent = shopCart.length;
  responsiveCart.textContent = shopCart.length;
};

const headerIcon = document.getElementById("headerIcon");
const responsive = document.getElementById("responsive");
const responsiveIcon = document.getElementById("responsiveIcon");
const categoriesMenu = document.getElementById("categoriesMenu");
const searchForm = document.getElementById("searchForm");
const responsiveForm = document.getElementById("responsiveForm");
const menuCart = document.getElementById("menuCart");
const responsiveCart = document.getElementById("responsiveCart");

let shopCart = localStorage.getItem("shopCart");

// Comprobamos si existe datos en el localStorage y en caso de no haber creamos un nuevo carrito
shopCart = shopCart ? shopCart = JSON.parse(shopCart) : shopCart = [];

// Listener para mostrar menú responsive
headerIcon.addEventListener("click", () => responsive.style.right = "0");

// Listener para ocultar menú responsive
responsiveIcon.addEventListener("click", () => responsive.style.right = "-100vw");

searchForm.addEventListener("submit", e => {
  e.preventDefault();
  const searchInput = document.getElementById("searchInput");
  const searchValue = searchInput.value.trim();
  if (searchValue) {
    window.location.href = `products.html?name=${searchValue}`
  }
});

responsiveForm.addEventListener("submit", e => {
  e.preventDefault();
  const responsiveInput = document.getElementById("responsiveInput");
  const responsiveValue = responsiveInput.value.trim();
  if (responsiveValue) {
    window.location.href = `products.html?name=${responsiveValue}`
  }
});

// Llamamos a la función que recibirá las categorías del servidor
loadCategory();

updateCart();