Q.scene("nivel1", function(stage) {
	
	var mapa = stage.collisionLayer(new Q.Mapa());
	
	mapa.configurar();

//	stage.insert(new Q.Punto({//mas adelante probar lo dinamico desde aqui para punto
//		x : 50,
//		y : 50,
//		frame : 29
//	}));

	stage.insert(new Q.UI.Text({//se debe habilitar en inicializar el modulo "UI"
		label : "Puntuación actual",
		size : 15,
		x : 520,
		y : 30,
		color : "white",
		family : "Fascinate Inline"
	}));

});

Q.scene("gameOver", function(stage){
	
	//texto para pantalla de fin de juego
	stage.insert(new Q.UI.Text({
		label : "Haz perdido",
		color : "#FFEE00",
		x : 300,
		y : 100,
		size : 60,
		family : "Fascinate Inline"
	}));
	
	//creacion de boton
	var boton = stage.insert(new Q.UI.Button({
		label : "Volver a jugar",
		fontColor : "white",
		fill : "#DDCC98",
		x : 300,
		y : 200,
	}));
	
	//escuchar el evento clic sobre el boton
	boton.on("click", function(){
		Q.clearStages();
		Q.stageScene("nivel1",{
			sort : true
		});
	});
});
