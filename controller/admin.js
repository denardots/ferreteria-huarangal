"use strict";

// Función que recibe los productos
const loadProducts = async () => {
  let url = "../model/load_products.php";
  const response = await fetch(url);
  const data = await response.json();
  // Llamamos a una función y le enviamos la data para mostrar los productos
  viewProducts(data);
};

// Función que recibe los productos y los muestra en la tabla
const viewProducts = data => {
  data.forEach(product => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${product.code}</td>
      <td>${product.name}</td>
      <td>${product.category}</td>
      <td>${product.stock}</td>
      <td><strong>S/ ${product.price.toFixed(2)}</strong></td>
      <td><a href="update_product.html?code=${product.code}"><i class="fa-solid fa-gear"></i></a></td>`;
    // En el caso de eliminar debemos crear los elementos, ya que su uso será dinámico sin redirigir a otra página
    const cell = document.createElement("td");
    const deleteButton = document.createElement("button");
    deleteButton.name = product.code;
    deleteButton.value = product.name;
    deleteButton.innerHTML = `<i class="fa-solid fa-trash-can"></i>`;
    // Listener que llama una función y le envia el evento para mostrar un mensaje
    deleteButton.addEventListener("click", e => viewMessage(e));
    cell.appendChild(deleteButton);
    row.appendChild(cell);
    tbody.appendChild(row);
  });
};

// Función que muestra un mensaje para confirmar la acción de eliminar un producto
const viewMessage = e => {
  let selectedProduct = e.target.parentNode;
  Swal.fire({
    title: "¿Estás seguro?",
    text: `Se eliminará ${selectedProduct.value}`,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Eliminar producto",
    cancelButtonText: "Cancelar"
  }).then(result => {
    // Si el usuario confirma la acción, enviamos el código a otra función para eliminar el producto
    if (result.isConfirmed) {
      deleteProduct(selectedProduct.name);
    }
  });
};

// Función asíncrona que envia el código del producto al backend para eliminar el producto
const deleteProduct = async code => {
  let url = "../model/delete_product.php";
  await fetch(url, {
    method: "POST",
    body: JSON.stringify(code)
  });
  location.reload();
};

const tbody = document.getElementById("tbody");

// Llamamos a la función que recibirá los productos del servidor
loadProducts();