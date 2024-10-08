"use strict";

// Función que recibe los productos
const loadProducts = async () => {
  let url = "../model/load_products.php";
  const response = await fetch(url);
  const data = await response.json();
  // Llamamos a una función y le enviamos la data para mostrar los productos
  viewProducts(data);
};

// Función que recibe los productos y los muestra en la tabla
const viewProducts = data => {
  data.forEach(product => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${product.code}</td>
      <td>${product.name}</td>
      <td>${product.brand}</td>
      <td>${product.stock}</td>
      <td><strong>S/ ${product.price.toFixed(2)}</strong></td>`;
    // Para agregar productos a la venta debemos crear los elementos, ya que su uso será dinámico sin redirigir a otra página
    const cell = document.createElement("td");
    const cartButton = document.createElement("button");
    cartButton.id = product.code;
    cartButton.classList.add("cart");
    cartButton.innerHTML = `<i class="fa-solid fa-cart-shopping"></i>`;
    // Listener que llama una función para obtener los datos del producto y agregarlo al carrito
    cartButton.addEventListener("click", e => loadProduct(e));
    cell.appendChild(cartButton);
    row.appendChild(cell);
    tbody.appendChild(row);
    tbody.appendChild(row);
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
    window.location.href = "current_sale.html";
  } else {
    data.quantity = 1;
    data.subtotal = data.price
    shopCart.push(data);
    localStorage.setItem("currentSale", JSON.stringify(shopCart));
  };
};

const tbody = document.getElementById("tbody");

let shopCart = localStorage.getItem("currentSale");

// Comprobamos si existe datos en el localStorage y en caso de no haber creamos un nuevo carrito
shopCart = shopCart ? shopCart = JSON.parse(shopCart) : shopCart = [];

// Llamamos a la función que recibirá los productos del servidor
loadProducts();