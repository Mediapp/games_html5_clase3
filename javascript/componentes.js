//agregar nuevos componentes al Framewoerk de qUintus

Q.component("pacmanControles", {
	added : function(){
		var p = this.entity.p;
		
		//p.velocidad = 0;
		p.direccion = "";
		
		
		//agrega la propiedad siempre y cuando no exista en el objeto "p"
		//viene de una libreria "underscore" buscar en google
		Q._defaults(p,{
			velocidad : 100
		});
		
		this.entity.on("step", this, "controles");
	},
	controles : function(){
		
		var p = this.entity.p;
		//Lo que hace quintus
		//Q.inputs.left = true;
		//Q.inputs.right = true;
		p.direccion = (Q.inputs["left"]) ? "izquierda" : (Q.inputs["right"]) ? "derecha" : (Q.inputs["up"]) ? "arriba" : (Q.inputs["down"]) ? "abajo" : p.direccion;    
		
		
		switch(p.direccion) {
			case "izquierda":

				p.vx = -p.velocidad;

				break;

			case "derecha":

				p.vx = p.velocidad;

				break;

			case "arriba":

				p.vy = -p.velocidad;

				break;

			case "abajo":

				p.vy = p.velocidad;

				break;
			
			//default:
			
				//p.vx = 0;
				//p.vy = 0;
				//break;
		}

		
	}
});


Q.component("aiEnemigo", {
	added : function() {
		var p = this.entity.p;

		//p.velocidad = 0;
		p.velocidad = 100;
		p.direccion = "izquierda";
		p.porcentajeCambio = 0.02;

		this.entity.on("step", this, "controles");
		this.entity.on("hit", this, "cambiarEnAtasco");
	},

	controles : function() {

		var p = this.entity.p;

		// de manera aleatoria tratamos de cambiar direcciones
		if (Math.random() < p.porcentajeCambio) {
			this.cambiarEnMovimiento();
		}

		//incrementamos la velocidad
		//en funcion de la direccion
		switch(p.direccion) {
			case "izquierda":
				p.vx = -p.velocidad;
				break;
			case "derecha":
				p.vx = p.velocidad;
				break;
			case "arriba":
				p.vy = -p.velocidad;
				break;
			case "abajo":
				p.vy = p.velocidad;
				break;
		}

	},

	cambiarEnAtasco : function(colision) {
		var p = this.entity.p;
		//si el enemigo se atoro
		//su velocidad es cero en X y Y
		if (p.vx == 0 && p.vy == 0) {

			//la propiedad normalY de quintus es 1(arriba) o -1(abajo)
			if (colision.normalY) {

				//intenamos salir del atasco moviendonos a la derecha o izquierda
				p.direccion = Math.random() < 0.5 ? 'izquierda' : 'derecha';

				//la propiedad normalX de quintus es 1(izquierda) o -1(derecha)
			} else if (colision.normalX) {

				//intenamos salir del atasco moviendonos hacia arriba o abajo
				p.direccion = Math.random() < 0.5 ? 'arriba' : 'abajo';
			}
		}
	},

	cambiarEnMovimiento : function() {
		var p = this.entity.p;
		//si se esta moviendo sobre el eje y
		if (p.vy != 0 && p.vx == 0) {
			//tratamos de movernos sobre el eje x
			p.direccion = Math.random() < 0.5 ? 'izquierda' : 'derecha';

			//si se esta moviendo sobre el eje x
		} else if (p.vx != 0 && p.vy == 0) {
			//tratamos de movernos sobre el eje y
			p.direccion = Math.random() < 0.5 ? 'arriba' : 'abajo';
		}
	}
});
