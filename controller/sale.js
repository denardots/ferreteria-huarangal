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
  title.textContent = `Venta Nº: ${data.code}`;
  dateCell.textContent = `FECHA: ${data.date}`;
  totalCell.innerHTML = `<strong>S/ ${data.price.toFixed(2)}</strong>`;
  const returnButton = document.createElement("a");
  returnButton.href = `pdf/PruebaV.php?code=${data.code}`;
  returnButton.target = "__blank";
  returnButton.classList.add("button");
  returnButton.innerHTML = `<i class="fa-solid fa-file-pdf"></i> Generar Reporte`;
  buttons.append(returnButton);
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