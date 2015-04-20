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
	tx.executeSql('CREATE TABLE IF NOT EXISTS DEMO (id unique, data)');	
	tx.executeSql('INSERT INTO DEMO (id, data) VALUES (1, "Pimer dato")');
}

function errorCB(tx, err){
	alert("Error procesando SQL: " +err);	
}

function successCB(){
	alert("bien!");
	window.localStorage.setItem("existe_db",1);
}


function guardar(){
	
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
		alert("fila = " + i + " ID= " + results.rows.item(i).id + " datos = " + results.rows.item(i).data);
		console.log("fila = " + i + " ID= " + results.rows.item(i).id + " datos = " + results.rows.item(i).data);
	}
		
}