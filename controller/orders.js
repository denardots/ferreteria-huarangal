"use strict";

// Función que recibe los productos
const loadOrders = async () => {
  let url = "../model/load_orders.php";
  const response = await fetch(url);
  const data = await response.json();
  // Llamamos a una función y le enviamos la data para mostrar los productos
  viewOrders(data);
};

// Función que recibe los productos y los muestra en la tabla
const viewOrders = data => {
  data.forEach(history => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${history.code}</td>
      <td>${history.date}</td>
      <td>${history.quantity}</td>
      <td><strong>S/ ${history.price.toFixed(2)}</strong></td>
      <td><a href="order.html?code=${history.code}" class="order"><i class="fa-solid fa-magnifying-glass"></i> Ver Detalles</a></td>`;
    tbody.appendChild(row);
  });
};

const tbody = document.getElementById("tbody");

// Llamamos a la función que recibirá los productos del servidor
loadOrders();