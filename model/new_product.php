<?php
  require_once('connect.php');

  // Clase hija que permitirá insertar nuevos productos
  class Product extends Database{
    // Función que recibe la conexión, los datos del formulario y los inserta en la base de datos
    public function newProduct($connect, $code, $name, $brand, $category, $stock, $price, $description, $img, $temp, $file){
      // Comvertimos el dato de la imagen en la ruta a guardar en la base de datos
      $route = $file.'/'.$img;
      // Movemos la ubicación de la imagen a nuestro directorio
      move_uploaded_file($temp,$file.'/'.$img);
      $connect->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
      $query = $connect->prepare("INSERT INTO products VALUES(
        '',
        :code,
        :name,
        :brand,
        :category,
        :stock,
        :price,
        :description,
        :route
      )");
      $query->bindParam(":code", $code);
      $query->bindParam(":name", $name);
      $query->bindParam(":brand", $brand);
      $query->bindParam(":category", $category);
      $query->bindParam(":stock", $stock);
      $query->bindParam(":price", $price);
      $query->bindParam(":description", $description);
      $query->bindParam(":route", $route);
      $query->execute();
    }

    // Función que crea un código random y comprueba si ya existe previamente, en caso de que no, devuelve el código creado
    public function getCode($connect) {
      $exists = TRUE;
      while ($exists == TRUE) {
        $code = random_int(100000, 999999);
        $connect->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
        $query = $connect->prepare("SELECT code FROM products WHERE code= :code");
        $query->bindParam(":code",$code);
        $query->execute();
        $result = $query->fetch(PDO::FETCH_ASSOC);
        // Comprobamos que el código no sea repetido y en caso de que no, devuelve el código creado
        if ($result) {
          $exists = TRUE;
        } else {
          return $code;
        }
      }
    }
  }

  $name = $_POST['name'];
  $brand = $_POST['brand'];
  $category = $_POST['category'];
  $stock = $_POST['stock'];
  $price = $_POST['price'];
  $description = $_POST['description'];
  // Cuando necesitemos subir imagenes, debemos pedir dos datos: el nombre de la imagen y su ruta actual
  $img = $_FILES['file']['name'];
  $temp = $_FILES['file']['tmp_name'];
  // Creamos una variable con la ruta de nuestra directorio
  $file = '../view/assets/img/products';

  $product = new Product;
  $connect = $product->connect();
  $code = $product->getCode($connect);
  $product->newProduct($connect, $code, $name, $brand, $category, $stock, $price, $description, $img, $temp, $file);
  $product->close($connect);
  // Redireccionamos a la lista de productos
  header('location:../view/admin.html');
?>