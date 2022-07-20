<?php
	$poligono = $_POST['zona'];
	$nome_zona = $_POST['nome_zona'];
	$categoria_zona = $_POST['categoria_zona'];
	$zona_agro = $_POST['zona_agro'];
	$catZona = $_POST['catZona'];


	
	$db = pg_connect('host=localhost dbname=postgres user=postgres password=admin');
	
	if (!$db){
		die("no connection to database ". pg_last_error());
	}

	if (isset($_POST['zona_agro']) && $_POST['zona_agro'] == 'simzona_agro'){
	$query = "insert into zonas_agro  (nome, geometry) values ('$nome_zona',ST_GeomFromText('".$poligono."', 4326))";
	$result = pg_query($query);


	if (!$result) {
		die("Error with query: " . pg_last_error());
	}
}else if (isset($_POST['categoria_zona']) && $_POST['categoria_zona'] == 'simcategoria_zona') {
	$query = "insert into cords  (cords, cat) values (ST_GeomFromText('".$poligono."', 4326), '$catZona')";
	$result = pg_query($query);


	if (!$result) {
		die("Error with query: " . pg_last_error());
	}
}

	header('Location: index.html/../../');


	pg_close();
?> 