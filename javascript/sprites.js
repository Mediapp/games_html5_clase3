Q.Sprite.extend("Punto", {
	init : function(p) {
		this._super(p, {
			sheet : "mosaicos"
		});
	}
});

Q.Sprite.extend("Pacman", {
	init : function(p) {

		this._super(p, {
			sheet : "mosaicos"
		});

		this.add("2d");
	}
}); 