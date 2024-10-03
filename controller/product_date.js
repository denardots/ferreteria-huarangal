"use strict";

// Función que recibe las categorías de productos
const loadProduct = async () => {
  let url = "../model/load_product.php";
  const response = await fetch(url);
  const data = await response.json();
  // Llamamos a una función y le enviamos la data para mostrar las categorias
  viewProduct(data);
};

// Función que recibe las categorías de productos y las muestra en el formulario
const viewProduct = data => {
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
loadProduct();