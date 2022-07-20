<?php
	$geo = $_POST['geo'];
	$nome = $_POST['nome'];
	$tipo_producao = $_POST['tipo_producao'];
	$area = $_POST['area'];
	$estufas = $_POST['estufas'];
	$categoria = $_POST['categoria'];
	$catPontos = $_POST['catPontos'];

	$db = pg_connect('host=localhost dbname=postgres user=postgres password=admin');

	if (!$db){
		die("no connection to database ". pg_last_error());
	}  

	if (isset($_POST['estufas']) && $_POST['estufas'] == 'simestufas'){
		   	$query = "insert into estufas  (nome, geometry, tipo_producao, area) values ('$nome',ST_GeomFromText('".$geo."', 4326), '$tipo_producao', '$area')";
			$result = pg_query($query);


			if (!$result) {
				die("Error with query: " . pg_last_error());
			}
		}else if (isset($_POST['categoria']) && $_POST['categoria'] == 'simcategoria') {
		   	$query = "insert into cords (cords , cat ) values (ST_GeomFromText('".$geo."', 4326), '$catPontos')";
			$result = pg_query($query);


			if (!$result) {
				die("Error with query: " . pg_last_error());
			}
		}

	header('Location: index.html/../../');


	pg_close();
?> 
