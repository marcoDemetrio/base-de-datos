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
	
//	guardar();
}

function guardar(){
	db = window.openDatabase("Database", "1.0", "prueba db", 200000);
	db.transaction(populateDb, errorCB, successCB);
}

function populateDb(tx){
	tx.executeSql('DROP TABLE IF EXISTS DEMO');
	tx.executeSql('CREATE TABLE IF NOT EXISTS DEMO (id unique, data)');	
	tx.executeSql('INSERT INTO DEMO (id, data) VALUES (1, "Pimer dato")');
}

function errorCB(tx, err){
	alert("Error procesando SQL: " +err);	
}

function successCB(){
	alert("bien!");
}

function getBD(tx){
	tx.executeSql('SELECT * FROM DEMO', [], querySuccess, errorCB);	
}

function querySuccess(tx, results){
	var len = results.rows.lengt;
	alert("tabla Demo: " + len + "fila encontradas.");
	for (var i = 0; i < len; i++){
		console.log("fila = " + i + " ID= " + results.rows.item(i).id + " datos = " + results.rows.item(i).data);
	}
		
}