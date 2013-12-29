Q.animations("mosaicos_anim",{
	brillar : {
		frames : [27, 28],
		rate : 1 / 2,
		loop : true
	}
});

Q.Sprite.extend("Poder", {
	init : function(p) {
		this._super(p, {
			sheet : "mosaicos",
			sprite : "mosaicos_anim",
			sensor : true,
			type : PODER
		});
		
		this.add("animation");
		this.play("brillar");
		
		this.on("sensor", function(){
			this.destroy();
		});
		
	}
});


Q.Sprite.extend("Fantasma", {
	init : function(p) {
		this._super(p, {
			sheet : "mosaicos",
			sensor : true,
			type : ENEMIGO,
			collisionMask : PACMAN | MAPA | ENEMIGO,
			z : 10 
		});
		
		this.add("2d, aiEnemigo");
		//this.on("sensor", function(colision){
			//var golpePacman = colision.obj.isA("Pacman") ? (colision.obj.isA("Pacman"))   ;
		//});
	}
});


Q.Sprite.extend("Alimento", {
	init : function(p) {
		this._super(p, {
			sheet : "mosaicos",
			sensor : true,
			type : ALIMENTO
		});
		
		this.on("sensor", function(){
			this.destroy();
		});
	}
});

Q.Sprite.extend("Punto", {
	init : function(p) {
		this._super(p, {
			sheet : "mosaicos",
			sensor : true,
			type : PUNTO
		});
		
		this.on("sensor", function(){
			this.destroy();
		});
	}
});

Q.Sprite.extend("Pacman", {
	init : function(p) {

		this._super(p, {
			sheet : "mosaicos",
			type : PACMAN,
			collisionMask : ENEMIGO | MAPA | PUNTO | ALIMENTO | PODER,
			z : 10
		});

		this.add("2d, pacmanControles");
		this.on("hit", function(colision) {
			if (colision.obj.isA("Fantasma")){
				Q.clearStages();
				
				Q.stageScene("gameOver");
			}
			
			

		});
	}
}); 

//extendemos la definicion original del tiledLayer
Q.TileLayer.extend("Mapa", {
	init : function(){
		this._super({
			dataAsset : "mapa.tmx",
			sheet : "mosaicos",
			tileH : 20,
			tileW : 20,
			type : MAPA
		});
	},
	
	configurar : function(){
		//obtenemos ña matriz de mosaicos
		var matrizMosaicos = this.p.tiles;
		//obtenemos el numero de renglones de la matriz
		for(var renglon = 0 ; renglon < matrizMosaicos.length; renglon++){
			
			var renglonMosaicos = matrizMosaicos[renglon];
			
			//por cada renglon recorremos cada columna
			for(var columna = 0; columna < renglonMosaicos.length ; columna++){
				var numeroMosaico = renglonMosaicos[columna];
				
				var posX = columna * 20 + 10;//+10 para centrar la imagen del mosaico
				var posY = renglon * 20 + 10;
				var nombreClase = null;
					
				
				switch(numeroMosaico) {
					case -1:
						//con esto pinta cada celda vacia del arreglo
						numeroMosaico = 29;
						nombreClase = "Punto";

						break;

					case 70:
						//para insertar dinamicamente el Pacman
						nombreClase = "Pacman";

						break;
					case 90:	
					case 92:
					
						nombreClase = "Alimento";
						
						break;
					
					case 30:
					case 40:
					case 50:
					case 60:
						nombreClase = "Fantasma";
						
						break;
					
					case 27:
						nombreClase = "Poder";
						
						break;

				}

				
				
				if (nombreClase != null) {
					this.stage.insert(new Q[nombreClase]({
						
						x : posX,
						y : posY,
						frame : numeroMosaico
						
					}));
					
					renglonMosaicos[columna] = -1;
					
				};
				
				
				
			}
			
		}
	}
});
