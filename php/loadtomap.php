<?php 

$id = $_POST['id'];

$db = pg_connect('host=localhost dbname=postgres user=postgres password=admin');

if (!$db){
		die("no connection to database ". pg_last_error());
	}

  $query = "select cords.id, cor , cat , categoria ,ST_AsText (ST_Transform (cords, 4326)) as cords,tipo from cords full join categorias on cords.cat = categorias.id where cat = '$id'";

  $result = pg_query($query);
  $response = array();

  while ($row = pg_fetch_assoc($result) ){

     $id = $row['id'];
     $cat = $row['cat'];
     $cords = $row['cords'];
     $cor = $row['cor'];
     $categoria = $row['categoria'];
     $tipo = $row['tipo'];


     $response[] = array(
        "id" => $id,
        "cat" => $cat,
        "cords" => $cords,
        "cor" => $cor,
        "categoria" => $categoria,
        "tipo" => $tipo,

     );
  }

  echo json_encode($response);
  die;





?>