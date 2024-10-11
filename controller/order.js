"use strict";

// Función asíncrona que recibe el código y lo envía al servidor para recibir los datos del producto
const loadHistory = async code => {
  let url = "../model/load_history.php";
  const response = await fetch(url, {
    method: "POST",
    body: JSON.stringify(code)
  });
  const data = await response.json();
  // Enviamos la data a otra función para mostrar los datos del producto
  viewHistory(data);
};

// Función que recibe los datos y los muestra en el formulario
const viewHistory = data => {
  const details = JSON.parse(data.details);
  const number = Object.keys(details).length;
  for (let index = 0; index < number; index++) {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${Object.values(details)[index][0]}</td>
      <td>${Object.keys(details)[index]}</td>
      <td>${Object.values(details)[index][1]}</td>
      <td><strong>S/ ${Object.values(details)[index][2].toFixed(2)}</strong></td>`;
    tbody.appendChild(row);
  };
  title.textContent = `Pedido Nº: ${data.code}`;
  dateCell.textContent = `FECHA: ${data.date}`;
  totalCell.innerHTML = `<strong>S/ ${data.price.toFixed(2)}</strong>`;
  const finishButton = document.createElement("button");
  finishButton.classList.add("button");
  finishButton.textContent = "Entregar";
  finishButton.addEventListener("click", () => deliverOrder(data));
  const deleteButton = document.createElement("button");
  deleteButton.classList.add("button", "clear");
  deleteButton.textContent = "Cancelar";
  deleteButton.addEventListener("click", () => viewMessage(data.code));
  buttons.append(finishButton, deleteButton);
};

// Función asíncrona para finalizar la venta
const deliverOrder = async data => {
  let url = "../model/deliver_order.php";
  await fetch(url, {
    method: "POST",
    body: JSON.stringify(data)
  });
  window.location.href = "sales.html";
};

// Función que muestra un mensaje para confirmar la acción de cancelar el pedido
const viewMessage = code => {
  Swal.fire({
    title: "¿Estás seguro?",
    text: `Se eliminará el Pedido Nº: ${code}`,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Eliminar producto",
    cancelButtonText: "Cancelar"
  }).then(result => {
    // Si el usuario confirma la acción, enviamos el código a otra función para eliminar el producto
    if (result.isConfirmed) {
      deleteSale(code);
    }
  });
};

// Función asíncrona para finalizar la venta
const deleteSale = async code => {
  let url = "../model/delete_order.php";
  await fetch(url, {
    method: "POST",
    body: code
  });
  window.location.href = "orders.html";
};

const title = document.getElementById("title");
const tbody = document.getElementById("tbody");
const dateCell = document.getElementById("dateCell");
const totalCell = document.getElementById("totalCell");
const buttons = document.getElementById("buttons");

// Obtenemos el código de producto de la url
let queryStrings = new URLSearchParams(window.location.search);
let code = queryStrings.get('code');

// Enviamos el código al servidor para obtener los datos
loadHistory(code);