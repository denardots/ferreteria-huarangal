"use strict";

// Función que recibe las categorías de productos
const loadCategory = async () => {
  let url = "../model/load_category.php";
  const response = await fetch(url);
  const data = await response.json();
  // Llamamos a una función y le enviamos la data para mostrar las categorias
  viewCategory(data);
};

// Función que recibe las categorías de productos y las muestra en el formulario
const viewCategory = data => {
  data.forEach(category => {
    const option = document.createElement("OPTION");
    option.value = category.id;
    option.textContent = category.category;
    list.appendChild(option);
  });
};

const formFile = document.getElementById("formFile");
const list = document.getElementById("list");
const fileName = document.getElementById("fileName");
const inputFile = document.getElementById("inputFile");
const img = document.getElementById("img");
let pattern = /[0-9a-zA-Z\^\&\'\@\{\}\[\]\,\$\=\!\-\#\(\)\.\%\+\~\_ ]+$/;

// Listener que vincula nuestro ícono de nube con el input file
formFile.addEventListener("click", () => inputFile.click());

// Listener que muestra la imagen elegida por el usuario
inputFile.addEventListener("change", function(){
  const file = this.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result;
      img.src = result;
      formFile.classList.add("active");
    }
    reader.readAsDataURL(file);
  }
  // Mostramos el nombre del archivo sin la ruta de dirección
  if (this.value) {
    let valueStore = this.value.match(pattern);
    fileName.textContent = valueStore;
  }
});

// Llamamos a la función que recibirá las categorías del servidor
loadCategory();