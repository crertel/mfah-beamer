(function(window){
	function p( name, image, language, quotes) {
		return { name: name,
			image: image,
			language: language,
			quotes: quotes || [] };
	}

	window.slides = window.slides || {};

	function SlideRunner( slides, $canvas, $textContainer ){
		this.slides = slides;
		this.$canvas = $canvas;
		this.$textContainer = $textContainer;
	}
	SlideRunner.prototype.init = function () {
		alert( 'init' );
	};
	SlideRunner.prototype.render = function () {
	};


	window.slides.SlideRunner = SlideRunner;

})(window);
