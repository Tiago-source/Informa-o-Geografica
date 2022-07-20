<?php

	$db = pg_connect('host=localhost dbname=postgres user=postgres password=admin');
	if (!$db){
		die("no connection to database ". pg_last_error());
	}

	$wkt=pg_escape_string($_POST['geo_edit']);
	$nome=pg_escape_string($_POST['nome_edit']);
	$tipo_producao=pg_escape_string($_POST['tipo_producao_edit']);
	$area=pg_escape_string($_POST['area_edit']);

	$query = "update estufas set geometry = ST_SetSRID(ST_GeomFromText('".$wkt."'), 4326),
	tipo_producao = '".$tipo_producao."', area = '".$area."' where nome = '".$nome."'";
	$result = pg_query($query);

	if (!$result) {
		die("Error with query: " . pg_last_error());
	}

	header('Location: index.html/../../');

	pg_close();
?> 
