// JavaScript Document

/* 
* variables de la aplicación
*/
	var existe_db
	var db
	


/* 
* carga inicial de la app
*/
function onBodyLoad() {    
	document.addEventListener("deviceready", onDeviceReady, false);
}

function onDeviceReady(){
	alert("prueba de base de datos");
	existe_db = window.localStorage.getItem("existe_db");
	db = window.openDatabase("Database", "1.0", "prueba db", 200000);
	if(existe_db == null){
		creaDB();
	}else{
		cargarDatos();
	}
}

function creaDB(){
	alert("crearDB");
	db.transaction(crearNuebaBD, errorCB, successCB);	
}


function crearNuebaBD(tx){
	tx.executeSql('DROP TABLE IF EXISTS DEMO');
	tx.executeSql('CREATE TABLE IF NOT EXISTS DEMO (id INTEGER PRIMARY KEY AUTOINCREMENT, nombre VARCHAR(50), apellido VARCHAR(50))');
}

function errorCB(tx, err){
	alert("Error procesando SQL: " +err);	
}

function successCB(){
	alert("bien!");
	window.localStorage.setItem("existe_db",1);
}

function cargarDatos(){
	alert("cargar Datos");
	db.transaction(getBD,errorCB);	
}

function getBD(tx){
	alert("haciendo la consulta");
	tx.executeSql('SELECT * FROM DEMO', [], querySuccess, errorCB);	
}

function querySuccess(tx, results){
	var len = results.rows.length;
	if(len == 0){
		alert("No se encontrarón registros");
	}
	
	alert("tabla Demo: " + len + " fila encontradas.");
	for (var i = 0; i < len; i++){
		alert("fila = " + i + " ID= " + results.rows.item(i).id + " nombre = " + results.rows.item(i).nombre + " apellido= " + results.rows.item(i).apellido);
	}
	
	var nombre = results.rows.item(0).nombre;
	var nombre = results.rows.item(0).apellido;
	$('#result1').html(nombre);
	$('#result2').html(apellido);
		
}

function guardar(){
	alert("guardar datos");
	db.transaction(guardarEnDB, errorCB);
}

function guardarEnDB(tx){
	alert("insert");	
	tx.executeSql("INSERT INTO DEMO (nombre, apellido) VALUES ('"+ $("#ti_name").val() +"','"+ $("#ti_apellido").val() +"')",[], newFormSuccess, errorCB);
}

function newFormSuccess(tx, results){
	
	
		alert("los datos fuerón guardados con exito");
		$("#resultados").css("display","block");
		$("#caja_name").css("display","none");
		$("#caja_apellido").css("display","none");
		
}