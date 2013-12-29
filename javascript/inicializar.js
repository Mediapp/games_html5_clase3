var Q = Quintus({
	development : true
});

Q.include("Sprites, Scenes, Input, 2D, Touch, Audio,Anim, UI");
Q.setup("juego");
Q.enableSound();
Q.controls();
Q.touch();

var PACMAN = 1;
var MAPA = 2;
var ENEMIGO = 4;
var PUNTO = 8;
var ALIMENTO = 16;
var PODER = 32;

Q.gravityX = 0;//por default el valor es 0
Q.gravityY = 0;

Q.load("mapa.tmx, mosaicos.png", function() {

	Q.sheet("mosaicos", "mosaicos.png", {
		tileW : 20,
		tileH : 20
	});

	Q.stageScene("nivel1", {
		sort : true
	});
	
	
});

