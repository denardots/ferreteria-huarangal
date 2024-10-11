<?php
  require_once('connect.php');

  // Clase hija que permitirá guardar la venta
  class History extends Database{
      // Función que recibe la conexión, los datos del carrito y los inserta en la base de datos
      public function newHistory($connect, $code, $amount, $total, $object, $status, $today){
          $connect->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
          $query = $connect->prepare("INSERT INTO history VALUES(
              '',
              :code,
              :amount,
              :total,
              :object,
              :status,
              :today
          )");
          $query->bindParam(":code", $code);
          $query->bindParam(":amount", $amount);
          $query->bindParam(":total", $total);
          $query->bindParam(":object", $object);
          $query->bindParam(":status", $status);
          $query->bindParam(":today", $today);
          $query->execute();
      }
  }

  // Recibimos los datos del carrito
  $data = file_get_contents("php://input");
  $cart = json_decode($data, true);
  $code = rand(100000, 999999);
  $amount = 0 ;
  $total = 0 ;
  $details = [];
  $status = "sale";
  date_default_timezone_set('America/Los_Angeles');
  $today = date('d-m-Y');
  $history = new History;
  $connect = $history->connect();
  // Modificamos los stocks de los productos vendidos
  foreach ($cart as $row => $value) {
    $amount = $amount + $value['quantity'];
    $total = $total + $value['subtotal'];
    $details[$value['name']] = [$value['code'], $value['quantity'], $value['subtotal']];
  }

  // Convertimos nuestro array de detalles en un objeto JSON
  $object = json_encode($details);
  // Luego enviamos la conexión a la función de agregar registro y guardamos el pedido
  $history->newHistory($connect, $code, $amount, $total, $object, $status, $today);
  $history->close($connect);
  echo json_encode($code);
?>