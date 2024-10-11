"use strict";

// Función que envia los datos del login al backend y reciba una respuesta
const login = async e => {
  e.preventDefault();
  let fields = new FormData(form);
  let url = "../model/login.php";
  const response = await fetch(url, {
    method: "POST",
    body: fields
  });
  const data = await response.json();
  // Si los datos son incorrectos mostramos un mensaje al usuario, en caso de ser correctos llamamos a una función para redirigir al usuario
  data === "Datos Incorrectos" ? message.textContent = "Datos Incorrectos" : window.location.href = "user.html";
};

const form = document.getElementById("form");
const message = document.getElementById("message");

// Listener que recibe el submit del formulario y llama a la función para realizar el login
form.addEventListener("submit", e => login(e));