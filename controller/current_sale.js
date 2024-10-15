"use strict";

const checkCart = () => {
  if (shopCart) {
    shopCart = JSON.parse(shopCart);
    finishButton.disabled = false;
    loadCart(shopCart);
  } else {
    const row = document.createElement("tr");
    const cell = document.createElement("td");
    cell.textContent = "No se agregó ningún producto";
    row.appendChild(cell);
    tbody.appendChild(row);
  }
}

// Función que recibe los productos y los muestra en la tabla
const loadCart = shopCart => {
  shopCart.forEach(product => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${product.code}</td>
      <td>${product.name}</td>
      <td value="${product.stock}">${product.stock}</td>
      <td value="${product.subtotal}"><strong>S/ ${product.subtotal.toFixed(2)}</strong></td>`;
    // Para agregar productos a la venta debemos crear los elementos, ya que su uso será dinámico sin redirigir a otra página
    const cell = document.createElement("td");
    cell.classList.add("cell-cart")
    const lessButton = document.createElement("button");
    lessButton.id = product.code;
    lessButton.classList.add("cart-button");
    lessButton.textContent = "-";
    // Listener que llama una función para disminuir la cantidad en el carrito
    lessButton.addEventListener("click", e => lessProduct(e));
    const plusButton = document.createElement("button");
    plusButton.id = product.code;
    plusButton.classList.add("cart-button");
    plusButton.textContent = "+";
    // Listener que llama una función para aumentar la cantidad en el carrito
    plusButton.addEventListener("click", e => plusProduct(e));
    const quantity = document.createElement("div");
    quantity.textContent = product.quantity
    quantity.value = product.quantity
    cell.append(lessButton, quantity, plusButton);
    const deleteCell = document.createElement("td");
    const deleteButton = document.createElement("p");
    deleteButton.id = product.code;
    deleteButton.classList.add("cart-delete");
    deleteButton.innerHTML = `<i class="fa-solid fa-trash"></i>`;
    // Listener que llama una función para disminuir la cantidad en el carrito
    deleteButton.addEventListener("click", e => deleteProduct(e));
    deleteCell.appendChild(deleteButton);
    row.append(cell, deleteCell);
    tbody.appendChild(row);
  });
  shopCart.forEach(product => total = total + product.subtotal);
  totalCell.innerHTML = `<strong>S/ ${total.toFixed(2)}</strong>`;
};

// Función para aumentar la cantidad de productos
const plusProduct = e => {
  let code = e.target.id;
  let amount = e.target.previousSibling;
  let subtotal = e.target.parentNode.previousSibling;
  const index = shopCart.findIndex(product => product.code === code);
  if (amount.value >= shopCart[index].stock ) {
    console.log("lleno");
  } else {
    amount.value = parseInt(amount.value + 1);
    amount.textContent = amount.value;
    shopCart[index].quantity = amount.value;
    shopCart[index].subtotal = amount.value * shopCart[index].price;
    subtotal.innerHTML = `<strong>S/ ${shopCart[index].subtotal.toFixed(2)}</strong>`;
    localStorage.setItem("currentSale", JSON.stringify(shopCart));
  }
  updateTotal();
};

// Función para reducir la cantidad de productos
const lessProduct = e => {
  let code = e.target.id;
  let amount = e.target.nextSibling;
  let subtotal = e.target.parentNode.previousSibling;
  const index = shopCart.findIndex(product => product.code === code);
  if (amount.value <= 1 ) {
    console.log("vacio");
  } else {
    amount.value = parseInt(amount.value - 1);
    amount.textContent = amount.value;
    shopCart[index].quantity = amount.value;
    shopCart[index].subtotal = amount.value * shopCart[index].price;
    subtotal.innerHTML = `<strong>S/ ${shopCart[index].subtotal.toFixed(2)}</strong>`;
    localStorage.setItem("currentSale", JSON.stringify(shopCart));
  }
  updateTotal();
};

// Función para actualizar el total
const updateTotal = () => {
  total = 0;
  shopCart.forEach(product => total = total + product.subtotal);
  totalCell.innerHTML = `<strong>S/ ${total.toFixed(2)}</strong>`;
}

// Función para eliminar un producto del carrito
const deleteProduct = e => {
  let code = e.target.parentNode.id;
  const index = shopCart.findIndex(product => product.code === code);
  shopCart.splice(index, 1);
  shopCart.length === 0 ? localStorage.removeItem("currentSale") : localStorage.setItem("currentSale", JSON.stringify(shopCart));
  window.location.href = "current_sale.html";
}

// Función asíncrona para finalizar la venta
const finishSale = async () => {
  let url = "../model/update_stocks.php";
  await fetch(url, {
    method: "POST",
    body: JSON.stringify(shopCart)
  });
  url = "../model/finish_sale.php";
  await fetch(url, {
    method: "POST",
    body: JSON.stringify(shopCart)
  });
  localStorage.removeItem("currentSale");
  window.location.href = "current_sale.html";
};

const tbody = document.getElementById("tbody");
const totalCell = document.getElementById("totalCell");
const finishButton = document.getElementById("finishButton");
const clearButton = document.getElementById("clearButton");

let shopCart = localStorage.getItem("currentSale");
let total = 0;

// Listener que llama a una función para finalizar la venta
finishButton.addEventListener("click", () => finishSale());

// Listener para vaciar el carrito
clearButton.addEventListener("click", () => {
  localStorage.removeItem("currentSale");
  window.location.href = "current_sale.html";
});

// Llamamos a la función para cargar el carrito de compras
checkCart();