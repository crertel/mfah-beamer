(function(window){
	function p( name, image, language, quotes) {
		return { name: name,
			image: image,
			language: language,
			quotes: quotes || [] };
	}

	window.slides = window.slides || {};
	window.slides.personae = [
		p('Alain Colmerauer', 'alain_colmerauer.jpg', 'prolog'),
		p('Alan Kay', 'alan_kay.jpg', 'smalltalk'),
		p('Brendan Eich', 'brendan_eich.jpg', 'javascript'),
		p('Brian Kerningham.jpg', 'brian_kerningham.jpg', 'c'),
		p('Cleve Moler', 'cleve_moler.jpg', 'matlab'),
		p('Dennis Ritchie', 'dennis_ritchie.jpg', 'c'),
		p('Donald Knuth', 'donald_knuth.jpg', 'tex'),
		p('Edsger Wybe Dijkstra', 'edsger_wybe_dijkstra.jpg', 'algol 60'),
		p('Grace Hopper', 'grace_hopper.jpg', 'flow-matic'),
		p('Guido von Rossum', 'guido_von_rossum.jpg', 'python'),
		p('James Gosling', 'james_gosling.jpg', 'java'),
		p('Jean Ichbiah', 'jean_ichbiah.jpg', 'ada'),
		p('Joe Armstrong', 'joe_armstrong.jpg', 'erlang'),
		p('John Backus', 'john_backus.jpg', 'fortran'),
		p('John Carmack', 'john_carmack.jpg', 'quakec'),
		p('John McCarthy', 'john_mccarthy.jpg', 'lisp'),
		p('Jose Valim', 'jose_valheem.jpg', 'elixir'),
		p('Kenneth Iverson', 'kenneth_iverson.jpg', 'apl'),
		p('Larry Wall', 'larry_wall.jpg', 'perl'),
		p('Martin Odersky', 'martin_odersky.jpg', 'scala'),
		p('Yukihiro Matsumoto', 'matz.jpg', 'ruby'),
		p('Mike Williams', 'mike_williams.jpg', 'erlang'),
		p('Neil Pappalardo', 'neil_pappalardo.jpg', 'mumps'),
		p('Richard Stallman', 'richard_stallman.jpg', 'emacs lisp'),
		p('Roberto Ierusalimschy', 'roberto_ierusalimschy.jpg', 'lua'),
		p('Robert Verding', 'robert_verding.jpg', 'erlang'),
		p('Rob Pike', 'rob_pike.jpg', 'go'),
		p('Seymour Papert', 'seymour_papert.jpg', 'logo'),
		p('Stephen Wolfram', 'stephen_wolfram.jpg', 'mathematica'),
		p('Tim Sweeney', 'tim_sweeney.jpg', 'unrealscript')
	];
})(window);
