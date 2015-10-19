requirejs.config({
  baseUrl: './javascripts',
  paths: {
    'jquery': '../lib/bower_components/jquery/dist/jquery.min',
    'lodash': '../lib/bower_components/lodash/lodash.min',
    'hbs': '../lib/bower_components/require-handlebars-plugin/hbs',
    'bootstrap': '../lib/bower_components/bootstrap/dist/js/bootstrap.min',
    'q': '../lib/bower_components/q/q',
    'firebase': '../lib/bower_components/firebase/firebase'
  },
    shim: {
      'bootstrap': ['jquery']
    }
});

require(['jquery', 'search', 'getFilms', 'addMovie', 'hbs!../templates/titleSearch'], function($, search, getFilms, addMovie, searchHbs) {

	var ref = new Firebase('https://movie-history-project.firebaseio.com');

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

  $(document).on('click', '.addFilm', function(e) {
		var filmID = this.id;
		console.log('filmID', filmID);
		getFilms.getFilm(filmID)
		.then(function(filmObj) {
	    console.log('filmObj', filmObj);
	    var user = ref.getAuth().uid;
	    console.log("user", user);
	    addMovie.addMovie(user, filmObj);
		});

  });

});