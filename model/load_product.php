<?php
  require_once('connect.php');

  // Clase hija que permitirá visualizar los productos
  class Product extends Database{
    // Función que recibe la conexión y obtiene los datos de los productos
    public function viewProducts($connect){
      $connect->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
      $query = $connect->prepare("SELECT * FROM products INNER JOIN categories ON products.idCategory = categories.id");
      $query->execute();
      return $query;
    }
  }

  $product = new Product;
  $connect = $product->connect();
  // Llamamos a la función de Ver Categorías y lo guardamos en un array
  $list = $product->viewProducts($connect);
  // Guardamos la respuesta en un array
  $products = [];
  while ($row = $list->fetch(PDO::FETCH_ASSOC)){
    array_push($products, $row);
  }
  $product->close($connect);
  // Devolvemos la respuesta al frontend
  echo json_encode($products);