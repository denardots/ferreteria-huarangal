"use strict";

// Función que recibe los productos
const loadProducts = async () => {
  let url = "../model/products.php";
  const response = await fetch(url);
  const data = await response.json();
  // Llamamos a una función y le enviamos la data para mostrar los productos
  viewProducts(data);
};

// Función que recibe los productos y los muestra en la tabla
const viewProducts = data => {
  data.forEach(product => {
    const article = document.createElement("article");
    article.classList.add("product");
    article.innerHTML = `
      <img src="${product.file}" alt="${product.name}" loading="lazy" class="product__img">
      <div class="product__content">
        <p>${product.name}</p>
        <p>S/ ${product.price.toFixed(2)}</p>
      </div>`;
    // Para agregar productos a la venta debemos crear los elementos, ya que su uso será dinámico sin redirigir a otra página
    const icons = document.createElement("div");
    icons.classList.add("product__icons");
    const cartButton = document.createElement("button");
    cartButton.classList.add("product__icon")
    cartButton.id = product.code;
    cartButton.innerHTML = `<i class="fa-solid fa-cart-shopping"></i>`;
    // Listener que llama una función para obtener los datos del producto y agregarlo al carrito
    cartButton.addEventListener("click", e => loadProduct(e));
    const link = document.createElement("a");
    link.classList.add("product__icon");
    link.href = `product.html?code=${product.code}`;
    link.innerHTML = `<i class="fa-solid fa-search"></i>`;
    icons.append(cartButton, link);
    article.appendChild(icons);
    productContainer.appendChild(article);
  });
};

// Función que obtiene los datos del producto seleccionado para enviarlos al carrito
const loadProduct = async e => {
  let code = e.target.parentNode.id
  let url = "../model/load_product.php";
  const response = await fetch(url, {
    method: "POST",
    body: JSON.stringify(code)
  });
  const data = await response.json();
  // Enviamos la data a otra función para agregar al carrito
  addCart(data);
};

const addCart = data => {
  if (shopCart.some(product => product.code === data.code)) {
    window.location.href = "cart.html";
  } else {
    data.quantity = 1;
    data.subtotal = data.price
    shopCart.push(data);
    localStorage.setItem("shopCart", JSON.stringify(shopCart));
  };
  // Actualizamos el numero del carrito
  updateCart();
};

const productContainer = document.getElementById("productContainer");

// Llamamos a la función que recibirá los productos del servidor
loadProducts();