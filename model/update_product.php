<?php
  require_once('connect.php');

  // Clase hija que permitirá actualizar los productos
  class Product extends Database{
    // Función que recibe la conexión, los datos del formulario y actualiza la base de datos
    public function updateProduct($connect, $code, $name, $stock, $price, $description){
      $connect->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
      $query=$connect->prepare("UPDATE products SET
          name = :name,
          stock = :stock,
          price = :price,
          description = :description
      WHERE code = :code");
      $query->bindParam(":code", $code);
      $query->bindParam(":name", $name);
      $query->bindParam(":stock", $stock);
      $query->bindParam(":price", $price);
      $query->bindParam(":description", $description);
      $query->execute();
    }
  }

  $code = $_POST['code'];
  $name = $_POST['name'];
  $stock = $_POST['stock'];
  $price = $_POST['price'];
  $description = $_POST['description'];

  $product = new Product;
  $connect = $product->connect();
  $product->updateProduct($connect, $code, $name, $stock, $price, $description);
  $product->close($connect);
  // Finalmente redireccionamos a la lista de productos
  header('location:../view/product_list.html');
?>