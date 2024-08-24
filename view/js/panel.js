const logo = document.getElementById("logo");
const aside = document.getElementById("aside");
const spans = document.querySelectorAll("span");
const menu = document.getElementById("menu");
const main = document.getElementById("main");

// Listener que muestra el menú en responsive
menu.addEventListener("click", () => {
  aside.classList.toggle("max-aside");
  if (aside.classList.contains("max-aside")) {
    menu.children[0].style.display = "none";
    menu.children[1].style.display = "block";
  } else {
    menu.children[0].style.display = "block";
    menu.children[1].style.display = "none";
  };
  if (window.innerWidth <= 320) {
    aside.classList.add("min-aside");
    main.classList.add("min-main");
    spans.forEach(span => span.classList.add("oculto"));
  };
});

// Listener que cambia el ancho de la barra lateral
logo.addEventListener("click", () => {
  aside.classList.toggle("min-aside");
  main.classList.toggle("min-main");
  spans.forEach(span => span.classList.toggle("oculto"));
});