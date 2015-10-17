requirejs.config({
  baseUrl: './javascripts',
  paths: {
    'jquery': '../lib/bower_components/jquery/dist/jquery.min',
    'lodash': '../lib/bower_components/lodash/lodash.min',
    'hbs': '../lib/bower_components/require-handlebars-plugin/hbs',
    'bootstrap': '../lib/bower_components/bootstrap/dist/js/bootstrap.min',
    'q': '../lib/bower_components/q/q'
  },
    shim: {
      'bootstrap': ['jquery']
    }
});

require(['jquery', 'search', 'lodash', 'hbs!../templates/titleSearch'], function($, search, _, searchHbs) {
	

	$('#submit').click(function(e) {
		var globalFilmData;
		var globalIds;

		e.preventDefault();

		search.searchFilms()
			.then(function(filmData) {
				globalFilmData = filmData;
				console.log('globalFilmData', globalFilmData);
				$('#output').html(searchHbs(globalFilmData));
			}).done();
				
        
	});
			
});


