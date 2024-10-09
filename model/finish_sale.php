<?php
  require_once('connect.php');

  // Clase hija que permitirá actualizar los productos
  class Product extends Database{
    // Función que recibe la conexión, el código y el nuevo stock para modificar la base de datos
    public function updateProduct($connect, $code, $newStock){
      $connect->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
      $query=$connect->prepare("UPDATE products SET stock = :stock WHERE code = :code");
      $query->bindParam(":code", $code);
      $query->bindParam(":stock", $newStock);
      $query->execute();
    }
  }

  $data = file_get_contents("php://input");
  $code = json_decode($data, true);
  $stocks = [];
  $product = new Product;
  $connect = $product->connect();
  // Modificamos los stocks de los productos vendidos
  foreach ($code as $row => $value) {
    $newStock = $value['stock'] - $value['quantity'];
    $exists = $product->updateProduct($connect, $value['code'], $newStock);
    array_push($stocks, $exists);
  }
  // $product->close($connect);
  echo json_encode($stocks);
?>