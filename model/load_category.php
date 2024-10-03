<?php
  require_once('connect.php');
  
  // Clase hija que permitirá visualizar las categorías
  class Category extends Database {
    // Función que recibe la conexión y obtiene los datos de las categorías
    public function loadCategory($connect){
      $connect->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
      $query = $connect->prepare("SELECT * FROM categories");
      $query->execute();
      return $query;
    }
  }

  $category = new Category;
  $connect = $category->connect();
  // Llamamos a la función de Ver Categorías y lo guardamos en un array
  $list = $category->loadCategory($connect);
  // Guardamos la respuesta en un array
  $categories = [];
  while ($row = $list->fetch(PDO::FETCH_ASSOC)){
    array_push($categories, $row);
  }
  $category->close($connect);
  // Devolvemos la respuesta al frontend
  echo json_encode($categories);
?>