<?php
  require_once('connect.php');

  // Clase hija que permitirá eliminar el pedido
  class History extends Database{
    // Función que recibe la conexión, los datos de la URL y elimina el pedido
    public function deleteProduct($connect,$code){
      $connect->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
      $query=$connect->prepare("DELETE FROM history WHERE code = :code");
      $query->bindParam(":code", $code);
      $query->execute();
    }
  }

  $data = file_get_contents("php://input");
  $code = json_decode($data, true);
  
  $history = new History;
  $connect = $history->connect();
  $history->deleteProduct($connect, $code);
  $history->close($connect);
?>