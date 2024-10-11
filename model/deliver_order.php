<?php
  require_once('connect.php');

  // Clase hija que permitirá actualizar los productos
  class History extends Database{
    // Función que recibe la conexión, el código y el nuevo stock para modificar la base de datos
    public function updateStatus($connect, $code, $status, $today){
      $connect->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
      $query=$connect->prepare("UPDATE history SET 
        status = :status,
        date = :date
      WHERE code = :code");
      $query->bindParam(":code", $code);
      $query->bindParam(":date", $today);
      $query->bindParam(":status", $status);
      $query->execute();
    }

    // Función que recibe la conexión, el código y el nuevo stock para modificar la base de datos
    public function updateProduct($connect, $code, $newStock){
      $connect->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
      $query=$connect->prepare("UPDATE products SET stock = :stock WHERE code = :code");
      $query->bindParam(":code", $code);
      $query->bindParam(":stock", $newStock);
      $query->execute();
    }

    // Función que recibe la conexión, el código del producto y obtiene los datos del producto
    public function viewProduct($connect, $code){
      $connect->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
      $query = $connect->prepare("SELECT stock FROM products WHERE code = :code");
      $query->bindParam(":code", $code);
      $query->execute();
      $exists = $query->fetch(PDO::FETCH_ASSOC);
      return $exists;
    }
  }

  $response = file_get_contents("php://input");
  $data = json_decode($response, true);
  $code = $data['code'];
  $details = json_decode($data['details']);
  $status = "sale";
  date_default_timezone_set('America/Los_Angeles');
  $today = date('d-m-Y');
  $history = new History;
  $connect = $history->connect();
  foreach ($details as $row => $value) {
    $stock = $history->viewProduct($connect, $value[0]);
    $newStock = $stock['stock'] - $value[1];
    $history->updateProduct($connect, $value[0], $newStock);
  }
  $history->updateStatus($connect, $code, $status, $today);
  $history->close($connect);
?>