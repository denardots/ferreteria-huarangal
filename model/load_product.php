<?php
  require_once('connect.php');
 
  class Product extends Database{
    // Función que recibe la conexión, el código del producto y obtiene los datos del producto
    public function viewProduct($connect, $code){
      $connect->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
      $query = $connect->prepare("SELECT * FROM products INNER JOIN categories ON products.idCategory = categories.id WHERE code = :code");
      $query->bindParam(":code", $code);
      $query->execute();
      $exists = $query->fetch(PDO::FETCH_ASSOC);
      return $exists;
    }
  }

  $data = file_get_contents("php://input");
  $code = json_decode($data, true);

  $product = new Product;
  $connect = $product->connect();
  // Luego enviamos la conexión a la función de ver producto y guardamos la respuesta en una variable
  $exists = $product->viewProduct($connect, $code);
  // Devolvemos la respuesta al frontend
  echo json_encode($exists);
?>