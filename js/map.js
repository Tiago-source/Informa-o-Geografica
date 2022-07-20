
/* global ol, L, omnivore, Terraformer */

// initialize the map
	var map = L.map('map').setView([41.531540, -8.618960], 10);
	//var polygonsLayer;

	// load a tile layer
	L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
		{
			attribution: 'Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
			maxZoom: 17,
			minZoom: 2
		}).addTo(map);

var portugal_freguesias = L.tileLayer.wms("http://localhost:8081/geoserver/ig/wms", {
    layers: 'ig:gadm36_prt_3',
    format: 'image/png',
    transparent: true,
    version: '1.1.1',
    attribution: "myattribution"
});

		
		$("#wms1").change(function(){
			if(this.checked) {
				portugal_freguesias.addTo(map);
			}else{
				map.removeLayer(portugal_freguesias);
			}
		});


var portugal_concelhos = L.tileLayer.wms("http://localhost:8081/geoserver/ig/wms", {
    layers: 'ig:gadm36_prt_2',
    format: 'image/png',
    transparent: true,
    version: '1.1.1',
    attribution: "myattribution"
});

		
		$("#wfs1").change(function(){
			if(this.checked) {
				portugal_concelhos.addTo(map);
			}else{
				map.removeLayer(portugal_concelhos);
			}
		});



var portugal_distritos = L.tileLayer.wms("http://localhost:8081/geoserver/ig/wms", {
    layers: 'ig:gadm36_prt_1',
    format: 'image/png',
    transparent: true,
    version: '1.1.1',
    attribution: "myattribution"
});

		
		$("#distritos").change(function(){
			if(this.checked) {
				portugal_distritos.addTo(map);
			}else{
				map.removeLayer(portugal_distritos);
			}
		});

//--------------------ESTRADAS
var portugal_estradas = L.tileLayer.wms("http://localhost:8081/geoserver/ig/wms", {
    layers: 'ig:prt_roads',
    format: 'image/png',
    transparent: true,
    version: '1.1.0',
    attribution: "myattribution"
});

		
		$("#estradas").change(function(){
			if(this.checked) {
				portugal_estradas.addTo(map);
			}else{
				map.removeLayer(portugal_estradas);
			}
		});

//--------------------- load categorias
function loadCat(){
	clearMap();
	var geoserver_url = 'http://localhost:8081/geoserver/ig/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=ig%3Acategorias_view&maxFeatures=50&outputFormat=application%2Fjson';
	var e = document.getElementById("list");
	var catg = e.value;
	console.log(catg);
	console.log("aqui");

	var cat = $.getJSON(geoserver_url, function(e){
		e.features.forEach(function(val){
			if(val.properties.categoria == catg && val.properties.tipo == "ponto"){
			var marker = L.marker({
				lat:val.geometry.coordinates[1],
				lng:val.geometry.coordinates[0]
			}
			,{
				color:val.properties.cor
			}).addTo(map);
			
			
			marker.bindPopup('Categoria: ' + val.properties.categoria + "<br>");
		}else if(val.properties.categoria == catg && val.properties.tipo == "linha"){
			var line = L.polyline(val.geometry.coordinates).addTo(map);
			line.bindPopup('Categoria: ' + val.properties.categoria);
		}else if(val.properties.categoria == catg && val.properties.tipo == "poligno"){
				var area = L.polygon(val.geometry.coordinates).addTo(map);
			area.bindPopup('Categoria: ' + val.properties.categoria);
			drawnItems.addLayer(area);
		}
		});

	});
}


function clearMap(){
	map.eachLayer(function(layer){
		if (layer instanceof L.Marker || layer instanceof L.Polyline || layer instanceof L.Polygon) {
		map.removeLayer(layer);
		}
	});
}



//----------------------------ESTUFAS

function loadEstufas(){
	clearEstufas();

	var geoserver_url = 'http://localhost:8081/geoserver/ig/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=ig%3Aestufas&maxFeatures=50&outputFormat=application%2Fjson';


	var estufas = $.getJSON(geoserver_url, function(e){
			
		e.features.forEach(function(val){

			var myIcon = L.icon({
				iconUrl: 'img/estufa.png',
				iconSize:     [35, 35], // size of the icon
				
				});
			var marker = L.marker({

				lat:val.geometry.coordinates[1],
				lng:val.geometry.coordinates[0]
			}
			,{
				draggable : 'true' ,
				icon:myIcon
			}).addTo(map);
			
			
			marker.bindPopup('Nome: ' + val.properties.nome + "<br>" + 'Tipo de producao: ' + val.properties.tipo_producao + "<br>" + 'Area: '+ val.properties.area);

			


			marker.on('dragend', function(event){
				document.getElementById("formPointEdit").style.display = "block";

				$('#nome_edit').val(val.properties.nome);
				$('#tipo_producao_edit').val(val.properties.tipo_producao);
				$('#area_edit').val(val.properties.area);


				var lat = event.target._latlng.lat;
				var lng = event.target._latlng.lng;

				var geo = ('POINT(' + lng + ' ' + lat + ')');

				document.getElementById("geo_edit").value = geo; 
				var nome= document.getElementById("nome_edit").value;
				var geo = document.getElementById("geo_edit").value;
			});
		});
	});
}

function clearEstufas(){
	map.eachLayer(function(layer){
		if (layer instanceof L.Marker) {
		map.removeLayer(layer);
	   }
	});
}

$("#estufas").change(function(){
			if(this.checked) {
				loadEstufas();
			}else{
				clearEstufas();
			}
		});




	
//---------------------------------------CURSOS DE AGUA		


function loadCursos_agua(){
	clearCursos_agua();
	var geoserver_url = 'http://localhost:8081/geoserver/ig/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=ig%3Alinhas&maxFeatures=50&outputFormat=application%2Fjson';

	var cursos_agua = $.getJSON(geoserver_url, function(e){
		e.features.forEach(function(val){
			var line = L.polyline(val.geometry.coordinates).addTo(map);
			line.bindPopup('Nome: ' + val.properties.descricao);
		});
	});
}

	function clearCursos_agua(){
	map.eachLayer(function(layer){
		if (layer instanceof L.Polyline) {
		map.removeLayer(layer);
	   }
	});
}

$("#cursos_agua").change(function(){
			if(this.checked) {
				loadCursos_agua();
			}else{
				clearCursos_agua();
			}
		});




//-----------------------------ZONAS AGRO


function loadZonas_agro(){
	clearZonas_agro();
	var geoserver_url = 'http://localhost:8081/geoserver/ig/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=ig%3Azonas_agro&maxFeatures=50&outputFormat=application%2Fjson';

	var zonas_agro = $.getJSON(geoserver_url, function(e){
		e.features.forEach(function(val){
			/*$.each(val.geometry.coordinates, function(index, value){
				value.forEach(trocaValoresLinha)
			});*/
			var area = L.polygon(val.geometry.coordinates).addTo(map);
			area.bindPopup('Nome: ' + val.properties.nome);
			drawnItems.addLayer(area);
		});
	});

}


function clearZonas_agro(){
	map.eachLayer(function(layer){
		if (layer instanceof L.Polygon) {
		map.removeLayer(layer);
	   }
	});
}

$("#zonas_agro").change(function(){
			if(this.checked) {
				loadZonas_agro();
			}else{
				clearZonas_agro();
			}
		});

function trocaValoresLinha(item, index, arr) {
	var lat = item[1];
 	var lng = item[0];
		console.log("a");
  	item[0] = lat;
 	item[1] = lng;
}

	

	//var group = new L.featureGroup().addTo(map);
	var geojsonlayer;
	var selectedFeature = null;
	function handleJson(data) {

		console.log("quero isto ",data);
		//		console.log(data);
		geojsonlayer=L.geoJson(data, {
			style: function (feature) {
				return {
					"weight": 2,
					"opacity": 0.65
				};
			},
			onEachFeature: function (feature, layer) {
				layer.bindPopup("ID : "+feature.properties.id+"<br />Name : "+feature.properties.microzone);
				var id=feature.properties.id;
				layer.on('click', function(e){
					if(selectedFeature){
						selectedFeature=null;
					}
					selectedFeature = e.target;
					drawnItems.addLayer(selectedFeature);
					console.log(e.target.feature.properties.id);
					//e.target.editing.enable();
				});
			}
		});
		geojsonlayer.addTo(map);
		map.fitBounds(geojsonlayer.getBounds());
		//console.log(geojsonlayer.toGeoJSON());

	}


	function getJson(data) {
		console.log("callback function fired");
	}

	// Initialize the FeatureGroup to store editable layers
	var drawnItems = new L.FeatureGroup();
	map.addLayer(drawnItems);


	// Initialize the draw control and pass it the FeatureGroup of editable layers
	var drawControl = new L.Control.Draw({
		edit: {
				featureGroup: drawnItems
		}
	});
	map.addControl(drawControl);

	//desenha ponto

	map.on('draw:created', function (e) {
		var type = e.layerType,
				layer = e.layer;
		if (type === 'marker') {
			document.getElementById("formPoint").style.display = "block";
			var geojson = e.layer.toGeoJSON();

		var wkt = Terraformer.WKT.convert(geojson.geometry);
		console.log(wkt);
		var lat = wkt.substring(wkt.length -19, wkt.length-1);
		var lng = wkt.substring(wkt.indexOf(" ") + 2,wkt.lastIndexOf(" "));
		var geo = wkt;
		console.log(geo);
		document.getElementById("geo").value = wkt; 
		var nome= document.getElementById("nome").value;
		var geo = document.getElementById("geo").value;

		// Do whatever else you need to. (save to db, add to map etc)
		drawnItems.addLayer(layer);
		}
		
	});

	//desenha poligono
	
	map.on('draw:created', function (e) {


		var type = e.layerType,
				layer = e.layer;
		if (type === 'polygon') {
			document.getElementById("formPolygon").style.display = "block";
					var geojson = e.layer.toGeoJSON();

		coordenadas = geojson.geometry.coordinates[0];

		console.log(geojson.geometry.coordinates[0])

		$.each(coordenadas, function(index , item){
			if (index != 0) {
				var lat = item[1];
				var lng = item[0];

				item[0] = lat;
				item[1] = lng;
			}
		});

		var wkt = Terraformer.WKT.convert(geojson.geometry);
		var poligono = wkt;
		console.log(poligono);
		document.getElementById("zona").value = poligono; 
		var nome = document.getElementById("nome").value;
		var poligono = document.getElementById("zona").value;

		$.ajax({
			type: 'POST',
			url: 'php/drawPolygon.php',
			dataType: "json",
			data: {
				poligono: poligono,
				nome: nome,
			},
			success:function(data){
				alert(data);
				//window.location.reload();
			},
			error:function(response){
				console.log(response);
			} 
		}) 
		// Do whatever else you need to. (save to db, add to map etc)
		drawnItems.addLayer(layer);


		}
		
	}); 

	//desenha linha

	map.on('draw:created', function (e) {
		var type = e.layerType,
				layer = e.layer;
		if (type === 'polyline') {
			document.getElementById("formLine").style.display = "block";


			var geojson = e.layer.toGeoJSON();

			coordenadas = geojson.geometry.coordinates;

			$.each(coordenadas, function(index , item){
				var lat = item[1];
				var lng = item[0];

				item[0] = lat;
				item[1] = lng;
			});

			
			var wkt = Terraformer.WKT.convert(geojson.geometry);
			var lng_dois = wkt.substring(wkt.lastIndexOf("-"), wkt.lastIndexOf(" "));
			var lat_dois = wkt.substring(wkt.lastIndexOf(" ")+1, wkt.length-1);
			var lng = wkt.substring(12, wkt.indexOf(" ",17));
			var lat = wkt.substring(wkt.indexOf(" ",17)+1, wkt.indexOf(","));
			var linha = ('LINESTRING (' + lat + ' ' + lng + ', ' + lat_dois + ' ' + lng_dois + ')');
			
			document.getElementById("linha").value = wkt; 
			
			var descricao = document.getElementById("descricao").value;
			//var poligono = document.getElementById("linha").value;

			
			// Do whatever else you need to. (save to db, add to map etc)
			drawnItems.addLayer(layer);
		}
		
	}); 



