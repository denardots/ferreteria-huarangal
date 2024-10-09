<?php
  require_once('connect.php');
 
  // Clase hija que permitirá visualizar los productos
  class Product extends Database{
    // Función que recibe la conexión, el código del producto y obtiene los datos del producto
    public function viewProducts($connect, $idCategory){
      $connect->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
      $query = $connect->prepare("SELECT * FROM products INNER JOIN categories ON products.idCategory = categories.id WHERE idCategory = :id");
      $query->bindParam(":id", $idCategory);
      $query->execute();
      return $query;
    }
  }

  $data = file_get_contents("php://input");
  $idCategory = json_decode($data, true);

  $product = new Product;
  $connect = $product->connect();
  // Llamamos a la función de Ver Categorías y lo guardamos en un array
  $list = $product->viewProducts($connect, $idCategory);
  // Guardamos la respuesta en un array
  $products = [];
  $quantity = 0;
  while ($row = $list->fetch(PDO::FETCH_ASSOC)){
    array_push($products, $row);
    $quantity++;
    if ($quantity  == 9) {
      break;
    }
  }
  $product->close($connect);
  // Devolvemos la respuesta al frontend
  echo json_encode($products);
?>