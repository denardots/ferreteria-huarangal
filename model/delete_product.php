<?php
  require_once('connect.php');

  // Clase hija que permitirá eliminar los productos
  class Product extends Database{
    // Función que recibe la conexión, los datos de la URL y elimina la imagen del directorio
    public function deleteImage($connect, $code){
      $connect->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
      $query=$connect->prepare("SELECT file FROM products WHERE code = :code");
      $query->bindParam(":code", $code);
      $query->execute();
      $exists = $query->fetch(PDO::FETCH_ASSOC);
      // Eliminamos la imagen del directorio
      unlink($exists['file']);
    }
    // Función que recibe la conexión, los datos de la URL y elimina el producto
    public function deleteProduct($connect,$code){
      $connect->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
      $query=$connect->prepare("DELETE FROM products WHERE code = :code");
      $query->bindParam(":code", $code);
      $query->execute();
    }
  }

  $data = file_get_contents("php://input");
  $code = json_decode($data, true);
  
  $product = new Product;
  $connect = $product->connect();
  $product->deleteImage($connect, $code);
  $product->deleteProduct($connect, $code);
  $product->close($connect);
?>