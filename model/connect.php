<?php
	$connect=null;
  // Clase para realizar la conexión
  class Database {
    private $server = "localhost";
    private $database = "ferreteria_huarangal";
    private $username = "root";
    private $password = "";
    // Función que nos permitirá conectarnos a la base de datos
    public function connect() {
        try {
          $connect = new PDO("mysql:host=".$this->server.";dbname=".$this->database, $this->username, $this->password);
          return $connect;
        } catch (Exception $e) {
          echo 'Excepción capturada: '. $e -> getMessage();
        }
    }
    // Función que recibe la variable de conexión y cierra la conexión a la base de datos
    public function close($connect) {
      $connect = null;
    }
  }
?>