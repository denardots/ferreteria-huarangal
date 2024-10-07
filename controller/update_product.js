"use strict";

// Función asíncrona que recibe el código y lo envía al servidor para recibir los datos del producto
const loadProduct = async code => {
  let url = "../model/load_product.php";
  const response = await fetch(url, {
    method: "POST",
    body: JSON.stringify(code)
  });
  const data = await response.json();
  // Enviamos la data a otra función para mostrar los datos del producto
  viewProducts(data);
};

// Función que recibe los datos y los muestra en el formulario
const viewProducts = data => {
  const formCode = document.getElementById("formCode");
  const name = document.getElementById("name");
  const brand = document.getElementById("brand");
  const stock = document.getElementById("stock");
  const price = document.getElementById("price");
  const description = document.getElementById("description");
  formCode.value = data.code;
  name.value = data.name;
  brand.value = data.brand;
  stock.value = data.stock;
  price.value = data.price;
  description.value = data.description;
};

// Obtenemos el código de producto de la url
let queryStrings = new URLSearchParams(window.location.search);
let code = queryStrings.get('code');

// Enviamos el código al servidor para obtener los datos
loadProduct(code);