<?php
require_once('../../model/connect.php');

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


require('./fpdf.php');
class PDF extends FPDF
{

   // Cabecera de página
   function Header()
   {
      $code = $_REQUEST['code'];

      $history = new History;
      $connect = $history->connect();
      $exists = $history->viewProducts($connect, $code);
 
      $this->Image('logo.png', 7, 7, 40); //logo de la empresa,moverDerecha,moverAbajo,tamañoIMG
      $this->SetFont('Arial', 'B', 20); //tipo fuente, negrita(B-I-U-BIU), tamañoTexto
      $this->Cell(45); // Movernos a la derecha
      $this->SetTextColor(0, 0, 0); //color
      //creamos una celda o fila
      $this->Cell(110, 15, utf8_decode('Ferretería El Huarangal'), 1, 1, 'C', 0); // AnchoCelda,AltoCelda,titulo,borde(1-0),saltoLinea(1-0),posicion(L-C-R),ColorFondo(1-0)
      $this->Ln(3); // Salto de línea
      $this->SetTextColor(103); //color

      /* UBICACION */
      $this->Cell(60);  // mover a la derecha
      $this->SetFont('Arial', 'B', 11);
      $this->Cell(96, 10, utf8_decode("Dirección : Asoc. El Huarangal Zona B, Mza. V Lote 16"), 0, 0, '', 0);
      $this->Ln(5);

      /* RUC */
      $this->Cell(60);  // mover a la derecha
      $this->SetFont('Arial', 'B', 11);
      $this->Cell(59, 10, utf8_decode("RUC : 10432637773"), 0, 0, '', 0);
      $this->Ln(5);

      /* FECHA */
      $this->Cell(60);  // mover a la derecha
      $this->SetFont('Arial', 'B', 11);
      $this->Cell(59, 10, utf8_decode("Fecha: ".$exists['date'].""), 0, 0, '', 0);
      $this->Ln(15);

      /* TITULO DE LA TABLA */
      //color
      $this->SetTextColor(228, 100, 0);
      $this->Cell(50); // mover a la derecha
      $this->SetFont('Arial', 'B', 20);
      $this->Cell(100, 10, utf8_decode("Venta Nº".$exists['code'].""), 0, 1, 'C', 0);
      $this->Ln(7);

      /* CAMPOS DE LA TABLA */
      //color
      $this->SetFillColor(255, 211, 51); //colorFondo
      $this->SetTextColor(0, 0, 0); //colorTexto
      $this->SetDrawColor(0, 0, 0); //colorBorde
      $this->SetFont('Arial', 'B', 11);
      $this->Cell(25, 10, utf8_decode('CÓDIGO'), 1, 0, 'C', 1);
      $this->Cell(100, 10, utf8_decode('NOMBRE'), 1, 0, 'C', 1);
      $this->Cell(30, 10, utf8_decode('CANTIDAD'), 1, 0, 'C', 1);
      $this->Cell(35, 10, utf8_decode('SUBTOTAL'), 1, 1, 'C', 1);
   }

   // Pie de página
   function Footer()
   {
      $this->SetY(-15); // Posición: a 1,5 cm del final
      $this->SetFont('Arial', 'I', 8); //tipo fuente, cursiva, tamañoTexto
      $hoy = date('d/m/Y');
      $this->Cell(355, 10, utf8_decode($hoy), 0, 0, 'C'); // pie de pagina(fecha de pagina)
   }
}

//include '../../recursos/Recurso_conexion_bd.php';
//require '../../funciones/CortarCadena.php';
/* CONSULTA INFORMACION DEL HOSPEDAJE */
//$consulta_info = $conexion->query(" select *from hotel ");
//$dato_info = $consulta_info->fetch_object();

$pdf = new PDF();
$pdf->AddPage(); /* aqui entran dos para parametros (horientazion,tamaño)V->portrait H->landscape tamaño (A3.A4.A5.letter.legal) */
$pdf->AliasNbPages(); //muestra la pagina / y total de paginas

$i = 0;
$pdf->SetFont('Arial', '', 12);
$pdf->SetDrawColor(163, 163, 163); //colorBorde

$code = $_REQUEST['code'];

$history = new History;
$connect = $history->connect();
$exists = $history->viewProducts($connect, $code);
$record=json_decode($exists['details'],true);
$total = 0;
foreach ($record as $name => $value) {
  $total = $total + $value[2];
  $pdf->Cell(25, 10, utf8_decode($value[0]), 1, 0, 'C', 0);
  $pdf->Cell(100, 10, utf8_decode($name), 1, 0, 'C', 0);
  $pdf->Cell(30, 10, utf8_decode($value[1]), 1, 0, 'C', 0);
  $pdf->Cell(35, 10, utf8_decode("S/ ".number_format($value[2],2,'.','')), 1, 1, 'C', 0);
}

$pdf->SetFillColor(255, 211, 51); //colorFondo
$pdf->SetTextColor(0, 0, 0); //colorTexto
$pdf->SetDrawColor(0, 0, 0); //colorBorde
$pdf->SetFont('Arial', 'B', 11);
$pdf->Cell(155, 10, utf8_decode('TOTAL'), 1, 0, 'C', 1);
$pdf->Cell(35, 10, utf8_decode("S/ ".number_format($total,2,'.','')), 1, 1, 'C', 0);

/* TABLA */



$pdf->Output('Prueba.pdf', 'I');//nombreDescarga, Visor(I->visualizar - D->descargar)
