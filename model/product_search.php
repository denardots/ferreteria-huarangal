<?php
  require_once('connect.php');
 
  // Clase hija que permitirá visualizar los productos
  class Product extends Database{
    // Función que recibe la conexión, el código del producto y obtiene los datos del producto
    public function viewProducts($connect, $search){
      $connect->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
      $query = $connect->prepare("SELECT * FROM products WHERE name LIKE :search");
      $query->execute(['search' => '%' . $search . '%']);
      return $query;
    }
  }

  $search = file_get_contents("php://input");
  
  $product = new Product;
  $connect = $product->connect();
  // Llamamos a la función de Ver Categorías y lo guardamos en un array
  $list = $product->viewProducts($connect, $search);
  // Guardamos la respuesta en un array
  $products = [];
  $quantity = 0;
  if ($list) {
    while ($row = $list->fetch(PDO::FETCH_ASSOC)){
      array_push($products, $row);
      $quantity++;
      if ($quantity  == 9) {
        break;
      }
    }
  } else {
    $products = ["error" => "No se encontraron productos con ese nombre"];
  }
  $product->close($connect);
  // Devolvemos la respuesta al frontend
  echo json_encode($products);
?>