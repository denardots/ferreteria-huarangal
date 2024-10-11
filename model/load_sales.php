<?php
  require_once('connect.php');

  // Clase hija que permitirá visualizar los productos
  class History extends Database{
    // Función que recibe la conexión y obtiene los datos de los productos
    public function viewHistory($connect){
      $connect->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
      $query = $connect->prepare("SELECT * FROM history WHERE status = 'sale'");
      $query->execute();
      return $query;
    }
  }

  $history = new History;
  $connect = $history->connect();
  $list = $history->viewHistory($connect);
  // Guardamos la respuesta en un array
  $data = [];
  while ($row = $list->fetch(PDO::FETCH_ASSOC)){
    array_push($data, $row);
  }
  $history->close($connect);
  // Devolvemos la respuesta al frontend
  echo json_encode($data);