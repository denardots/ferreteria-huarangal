"use strict";

const headerIcon = document.getElementById("headerIcon");
const responsive = document.getElementById("responsive");
const responsiveIcon = document.getElementById("responsiveIcon");

// Listener para mostrar menú responsive
headerIcon.addEventListener("click", () => responsive.style.right = "0");

// Listener para ocultar menú responsive
responsiveIcon.addEventListener("click", () => responsive.style.right = "-100vw");