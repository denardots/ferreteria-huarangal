"use strict";

const checkCart = () => {
  if (shopCart) {
    shopCart = JSON.parse(shopCart);
    loadCart(shopCart);
  } else {
    const article = document.createElement("article");
    article.classList.add("cart__product");
    article.style.padding = "20px";
    article.innerHTML = `<h2>El carrito esta vacío</h2>`;
    tbody.appendChild(article);
  }
}

// Función que recibe los productos y los muestra en la tabla
const loadCart = shopCart => {
  shopCart.forEach(product => {
    const article = document.createElement("article");
    article.classList.add("cart__product");
    article.innerHTML = `
      <img src="${product.file}" alt="${product.name}" class="cart__img" >
      <p class="cart__name">${product.name}</p>`;
    // Para agregar productos a la venta debemos crear los elementos, ya que su uso será dinámico sin redirigir a otra página
    const cell = document.createElement("p");
    cell.classList.add("cart_quantity")
    const lessButton = document.createElement("button");
    lessButton.id = product.code;
    lessButton.classList.add("cart__icon");
    lessButton.textContent = "-";
    // Listener que llama una función para disminuir la cantidad en el carrito
    lessButton.addEventListener("click", e => lessProduct(e));
    const plusButton = document.createElement("button");
    plusButton.id = product.code;
    plusButton.classList.add("cart__icon");
    plusButton.textContent = "+";
    // Listener que llama una función para aumentar la cantidad en el carrito
    plusButton.addEventListener("click", e => plusProduct(e));
    const quantity = document.createElement("span");
    quantity.classList.add("cart__number")
    quantity.textContent = product.quantity
    quantity.value = product.quantity
    cell.append(lessButton, quantity, plusButton);
    const deleteCell = document.createElement("p");
    deleteCell.classList.add("cart__subtotal")
    deleteCell.textContent = `S/ ${product.subtotal.toFixed(2)}`;
    const deleteButton = document.createElement("p");
    deleteButton.id = product.code;
    deleteButton.classList.add("cart__delete");
    deleteButton.innerHTML = `<i class="fa-solid fa-trash"></i>`;
    // Listener que llama una función para disminuir la cantidad en el carrito
    deleteButton.addEventListener("click", e => deleteProduct(e));
    article.append(cell, deleteCell, deleteButton);
    tbody.appendChild(article);
  });
  updateTotal();
};

// Función para aumentar la cantidad de productos
const plusProduct = e => {
  let code = e.target.id;
  let amount = e.target.previousSibling;
  let subtotal = e.target.parentNode.nextSibling;
  const index = shopCart.findIndex(product => product.code === code);
  if (amount.value >= shopCart[index].stock ) {
    console.log("lleno");
  } else {
    amount.value = parseInt(amount.value + 1);
    amount.textContent = amount.value;
    shopCart[index].quantity = amount.value;
    shopCart[index].subtotal = amount.value * shopCart[index].price;
    subtotal.innerHTML = `S/ ${shopCart[index].subtotal.toFixed(2)}`;
    localStorage.setItem("shopCart", JSON.stringify(shopCart));
  }
  updateTotal();
};

// Función para reducir la cantidad de productos
const lessProduct = e => {
  let code = e.target.id;
  let amount = e.target.nextSibling;
  let subtotal = e.target.parentNode.nextSibling;
  const index = shopCart.findIndex(product => product.code === code);
  if (amount.value <= 1 ) {
    console.log("vacio");
  } else {
    amount.value = parseInt(amount.value - 1);
    amount.textContent = amount.value;
    shopCart[index].quantity = amount.value;
    shopCart[index].subtotal = amount.value * shopCart[index].price;
    subtotal.innerHTML = `S/ ${shopCart[index].subtotal.toFixed(2)}`;
    localStorage.setItem("shopCart", JSON.stringify(shopCart));
  }
  updateTotal();
};

// Función para actualizar el total
const updateTotal = () => {
  total = 0;
  shopCart.forEach(product => total = total + product.subtotal);
  cartTotal.innerHTML = `<span class="cart__word">Total: </span>S/ ${total.toFixed(2)}`;
}

// Función para eliminar un producto del carrito
const deleteProduct = e => {
  let code = e.target.parentNode.id;
  const index = shopCart.findIndex(product => product.code === code);
  shopCart.splice(index, 1);
  shopCart.length === 0 ? localStorage.removeItem("shopCart") : localStorage.setItem("shopCart", JSON.stringify(shopCart));
  window.location.href = "cart.html";
}

// Función asíncrona para finalizar la venta
const generateOrder = async () => {
  // let url = "../model/finish_sale.php";
  // await fetch(url, {
  //   method: "POST",
  //   body: JSON.stringify(shopCart)
  // });
  // localStorage.removeItem("currentSale");
  // window.location.href = "current_sale.html";
  console.log("df")
};

const tbody = document.getElementById("tbody");
const cartTotal = document.getElementById("cartTotal");
const finishButton = document.getElementById("finishButton");

let total = 0;
shopCart = localStorage.getItem("shopCart");

// Listener que llama a una función para finalizar la venta
finishButton.addEventListener("click", () => generateOrder());

// Llamamos a la función para cargar el carrito de compras
checkCart();