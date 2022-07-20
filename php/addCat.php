<?php
	$cat = $_POST['cat'];
	$cor = $_POST['cor'];
	$tipo = $_POST['tipo'];


	$db = pg_connect('host=localhost dbname=postgres user=postgres password=admin');

	if (!$db){
		die("no connection to database ". pg_last_error());
	}  

	$query = "insert into categorias  (categoria , cor , tipo) values ('$cat', '$cor' , '$tipo')";
	$result = pg_query($query);


	if (!$result) {
		die("Error with query: " . pg_last_error());
	}

	header('Location: index.html/../../');


	pg_close();
?> 
