(function(window){
	function p( name, image, language, quotes) {
		return { name: name,
			image: image,
			language: language,
			quotes: quotes || [] };
	}

	window.slides = window.slides || {};

	var kColorCycleTime = 3000;
	var kImageDwellTime = 30000;

	function SlideRunner( slides, $canvas, $textContainer ){
		this.startTime = new Date();
		this.currTime = this.startTime
		this.currImageTime = this.startTime;
		this.slides = slides;
		this.$canvas = $canvas;
		this.context = this.$canvas.getContext('2d');
		this.$textContainer = $textContainer;
		this.images = [];
		this.currImageIndex = 0;
	}
	SlideRunner.prototype.init = function () {
		Promise.all(
			window.slides.personae.map( function(p) {
				return window.slides.utils.loadImage('images/' + p.image);
			})
		).then( function (images) {
			this.images = images
			this.currImageTime = this.startTime;
			window.requestAnimationFrame( this.render.bind(this) );	
		}.bind(this));
    };

	SlideRunner.prototype.render = function () {
		this.currTime = new Date();
		var dt = this.currTime - this.startTime;
		var dtImage = this.currTime - this.currImageTime;

		var fracTime = dt / kColorCycleTime;
		var brightness = 0.5;

		var primaryColor = window.slides.utils.hslToCss( Math.sin(fracTime), 1, brightness, 1);
		var secondaryColor = window.slides.utils.hslToCss( Math.cos(fracTime + (kColorCycleTime / 2)), 1, brightness, 1);
		var ctx = this.context;
	
		ctx.globalCompositeOperation = 'source-over';
		ctx.fillStyle = "#000";
		ctx.fillRect(0,0, ctx.canvas.width, ctx.canvas.height);
		var img = this.images[this.currImageIndex];
		var ih = img.height;
		var iw = img.width;
		var ch = ctx.canvas.height;
		var cw = ctx.canvas.width;
		var ar = iw/ih;
		var sx = iw / cw;
		var sy = ih / ch;

		var bx = cw /2;
		var by = ch /2;

		this.$textContainer.innerHTML = '<h1>' + this.slides[this.currImageIndex].name + '</h1>'
										+ '<h2 style="text-align:right">creator of ' + this.slides[this.currImageIndex].language + '</h2>';


		if (sy <= 1.0 && sx <= 1.0 ) {
			bx -= iw/2;
			by -= ih/2;
			ctx.drawImage( img,bx,by,iw,ih);
		} else {
			if (ar > 1){ // width  > height
				bx -= (iw/2)/sx;
				by -= (ih/2)/sx;
				ctx.drawImage( img,bx,by,img.width/sx,img.height/sx);
			} else {
				bx -= (iw/2)/sy;
				by -= (ih/2)/sy;
				ctx.drawImage( img,bx,by,img.width/sy,img.height/sy);
			}
		}		

		ctx.globalCompositeOperation = 'overlay';
		ctx.fillStyle = primaryColor;
		ctx.fillRect(0,0, ctx.canvas.width, ctx.canvas.height);

		ctx.globalCompositeOperation = 'screen';
		ctx.fillStyle = secondaryColor;
		ctx.fillRect(0,0, ctx.canvas.width, ctx.canvas.height);

		if ( dtImage > kImageDwellTime) {
			this.currImageTime = new Date();
			this.currImageIndex = (this.currImageIndex+1) % this.images.length ;
		}

		window.requestAnimationFrame( this.render.bind(this) );		

	};


	window.slides.SlideRunner = SlideRunner;

})(window);
