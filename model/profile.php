<?php
  require_once('connect.php');

  // Clase hija que permitirá realizar el login
  class Login extends Database {
    // Función que recibe la conexión, los datos del formulario para verficiar el login y devuelve la respuesta en una variable
    public function enter($connect, $username, $password, $degree){
      $connect->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
      $query = $connect->prepare("UPDATE users SET
          username = :username,
          password = :password
      WHERE degree = :degree");
      $query->bindParam(":username", $username);
      $query->bindParam(":password", $password);
      $query->bindParam(":degree", $degree);
      $query->execute();
    }
  }

  $username = $_POST['username'];
  $password = $_POST['password'];
  $degree = "admin";
  $login = new Login;
  $connect = $login->connect();
  // Llamamos a la función login y guardamos la respuesta del sevidor en una variable
  $exists = $login->enter($connect, $username, $password, $degree);
  $login->close($connect);
  header("location:../view/login.html");
?>