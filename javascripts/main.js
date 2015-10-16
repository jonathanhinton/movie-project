requirejs.config({
  baseUrl: './javascripts',
  paths: {
    'jquery': '../lib/bower_components/jquery/dist/jquery.min',
    // 'hbs': '../lib/bower_components/require-handlebars-plugin/hbs',
    'bootstrap': '../lib/bower_components/bootstrap/dist/js/bootstrap.min',
    'q': '../lib/bower_components/q/q'
  },
    shim: {
      'bootstrap': ['jquery']
    }
});

require(['jquery', 'search'], function($, search) {
	

	$('#submit').click(function(e) {
		
		e.preventDefault();

		search.searchFilms()
			.then(function(filmData) {
				console.log('filmData = ', filmData);
				$('#output').html(filmData.Title);
			});
		
	});

});

