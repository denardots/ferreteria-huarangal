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
    tbody.appendChild(row);
  });
};

const tbody = document.getElementById("tbody");

// Llamamos a la función que recibirá los productos del servidor
loadProducts();