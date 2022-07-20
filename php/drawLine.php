<?php
	$linha = $_POST['linha'];
	$descricao = $_POST['descricao'];
	$curso_agua = $_POST['curso_agua'];
	$categoria_linha = $_POST['categoria_linha'];
	$catLinha = $_POST['catLinha'];


	$db = pg_connect('host=localhost dbname=postgres user=postgres password=admin');
	
	if (!$db){
		die("no connection to database ". pg_last_error());
	}
if (isset($_POST['curso_agua']) && $_POST['curso_agua'] == 'simcurso_agua'){
	$query = "insert into linhas (descricao, geometry) values ('$descricao',ST_GeomFromText('".$linha."', 4326))";
	$result = pg_query($query);


	if (!$result) {
		die("Error with query: " . pg_last_error());
	}
}else if (isset($_POST['categoria_linha']) && $_POST['categoria_linha'] == 'simcategoria_linha') {
	$query = "insert into cords ( cords , cat ) values (ST_GeomFromText('".$linha."', 4326), '$catLinha')";
	$result = pg_query($query);


	if (!$result) {
		die("Error with query: " . pg_last_error());
	}
}
	header('Location: index.html/../../');


	pg_close();
?> 