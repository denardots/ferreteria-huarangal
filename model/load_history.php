<?php
  require_once('connect.php');

  // Clase hija que permitirá visualizar los productos
  class History extends Database{
    // Función que recibe la conexión y obtiene los datos de los productos
    public function viewProducts($connect, $code){
      $connect->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
      $query = $connect->prepare("SELECT * FROM history WHERE code = :code");
      $query->bindParam(":code", $code);
      $query->execute();
      $exists = $query->fetch(PDO::FETCH_ASSOC);
      return $exists;
    }
  }

  $data = file_get_contents("php://input");
  $code = json_decode($data, true);

  $history = new History;
  $connect = $history->connect();
  $exists = $history->viewProducts($connect, $code);
  $history->close($connect);
  // Devolvemos la respuesta al frontend
  echo json_encode($exists);