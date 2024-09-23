"use strict";

// Función que permite cargar los datos desde el servidor
const chargeData = async () => {
  let url = "js/data.json";
  const response = await fetch(url);
  const data = await response.json();
  data.forEach(date => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${date.id}</td>
      <td>${date.customer}</td>
      <td>${date.location}</td>
      <td>${date.orderDate}</td>
      <td>${date.status}</td>
      <td><strong>${date.amount}</strong></td>`;
    tbody.appendChild(row);
  });
};

// Función que permite buscar un dato en cualquier columna de la tabla
const searchDate = () => {
  let tableRows = document.querySelectorAll('.tbody tr');
  tableRows.forEach((row, i) => {
    let table_data = row.textContent.toLowerCase();
    word = search.value.toLowerCase();
    row.classList.toggle('hide', table_data.indexOf(word) < 0);
    row.style.setProperty('--delay', i / 25 + 's');
  })
  document.querySelectorAll('.tbody tr:not(.hide)').forEach((visibleRow, i) => {
    visibleRow.style.backgroundColor = (i % 2 == 0) ? 'transparent' : '#0000000b';
  });
};

const search = document.querySelector('.form__input');
const tbody = document.getElementById("tbody");

// 1. Searching for specific data of HTML table
// Cargamos los datos del servidor
chargeData();

// Listener que permite buscar datos dentro de la tabla
search.addEventListener('input', () => searchDate());