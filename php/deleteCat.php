<?php
	$id = $_POST['cate'];

	$db = pg_connect('host=localhost dbname=postgres user=postgres password=admin');

	if (!$db){
		die("no connection to database ". pg_last_error());
	}  

	$query = "delete from categorias  where id = '$id' ";
	$result = pg_query($query);


	if (!$result) {
		die("Error with query: " . pg_last_error());
	}

	header('Location: index.html/../../');


	pg_close();
?> 
