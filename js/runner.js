(function(window){
	function p( name, image, language, quotes) {
		return { name: name,
			image: image,
			language: language,
			quotes: quotes || [] };
	}

	window.slides = window.slides || {};

	var kColorCycleTime = 5000;
	var kImageDwellTime = 1000;

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
		//var brightness = Math.sin(fracTime);
		var brightness = 0.5;

		var primaryColor = window.slides.utils.hslToCss( Math.sin(fracTime), 1, brightness, 1);
		var secondaryColor = window.slides.utils.hslToCss( Math.cos(fracTime + (kColorCycleTime / 2)), 1, brightness, 1);
		var ctx = this.context;
	
		ctx.globalCompositeOperation = 'source-over';
		ctx.drawImage( this.images[this.currImageIndex],0,0,ctx.canvas.width,ctx.canvas.height);		

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
