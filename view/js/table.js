"use strict";

// Función que permite buscar un dato en cualquier columna de la tabla
const searchDate = () => {
  let tableRows = document.querySelectorAll('.tbody tr');
  let word = search.value.toLowerCase();
  tableRows.forEach((row, i) => {
    let table_data = row.textContent.toLowerCase();
    row.classList.toggle('hide', table_data.indexOf(word) < 0);
    row.style.setProperty('--delay', i / 25 + 's');
  })
  document.querySelectorAll('.tbody tr:not(.hide)').forEach((visibleRow, i) => {
    visibleRow.style.backgroundColor = (i % 2 == 0) ? 'transparent' : '#0000000b';
  });
};

const search = document.getElementById("search");

// Listener que permite buscar datos dentro de la tabla
search.addEventListener('input', () => searchDate());