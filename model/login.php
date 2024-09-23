<?php
  require_once('connect.php');

  // Clase hija que permitirá realizar el login
  class Login extends Database {
    // Función que recibe la conexión, los datos del formulario para verficiar el login y devuelve la respuesta en una variable
    public function enter($connect, $username, $password){
      $connect->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
      $query = $connect->prepare("SELECT degree FROM users WHERE username = :username AND password = :password");
      $query->bindParam(":username", $username);
      $query->bindParam(":password", $password);
      $query->execute();
      $exists = $query->fetch(PDO::FETCH_ASSOC);
      return $exists;
    }
  }

  $username = $_POST['username'];
  $password = $_POST['password'];
  
  $login = new Login;
  $connect = $login->connect();
  // Llamamos a la función login y guardamos la respuesta del sevidor en una variable
  $exists = $login->enter($connect, $username, $password);
  $login->close($connect);
  // Devolvemos la respuesta a frontend
  if ($exists) {
    echo json_encode($exists);
  } else {
    echo json_encode("Datos Incorrectos");
  }
?>