<?php

$db = pg_connect('host=localhost dbname=postgres user=postgres password=admin');

if (!$db){
		die("no connection to database ". pg_last_error());
	}

  $query = "SELECT * FROM categorias where tipo = 'poligno'";

  $result = pg_query($query);
  $response = array();

  while ($row = pg_fetch_assoc($result) ){

     $id = $row['id'];
     $categoria = $row['categoria'];

     $response[] = array(
        "id" => $id,
        "categoria" => $categoria
     );
  }

  echo json_encode($response);
  die;

?> 
