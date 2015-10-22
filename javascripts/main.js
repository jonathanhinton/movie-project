requirejs.config({
  baseUrl: './javascripts',
  paths: {
    'jquery': '../lib/bower_components/jquery/dist/jquery.min',
    'lodash': '../lib/bower_components/lodash/lodash.min',
    'hbs': '../lib/bower_components/require-handlebars-plugin/hbs',
    'bootstrap': '../lib/bower_components/bootstrap/dist/js/bootstrap.min',
    'q': '../lib/bower_components/q/q',
    'firebase': '../lib/bower_components/firebase/firebase',
    'bootstrap-star-rating': '../lib/bower_components/bootstrap-star-rating/js/star-rating.min'
  },
    shim: {
      'bootstrap': ['jquery'],
      'bootstrap-star-rating': ['bootstrap']
    }
});

require(['jquery', 'lodash', 'login', 'search', 'getFilms', 'addMovie', 'hbs!../templates/titleSearch','bootstrap-star-rating'], function($, _, login, search, getFilms, addMovie, searchHbs, starRating) {

	

	var ref = new Firebase('https://movie-history-project.firebaseio.com');
	var user = ref.getAuth().uid;

  $('#submit').click(function(e) {
    var globalFilmData;
    var firebaseArray = [];

    e.preventDefault();

    search.searchFilms()
      .then(function(filmData) {
        globalFilmData = filmData.Search;
        console.log('globalFilmData', globalFilmData);


    // globalFilmData is the array of film objects retrieved from the OMDB API
    
        return search.searchFirebase(user)
      })
      .then(function(firebaseData) {
        // console.log('firebaseData', firebaseData);
        firebaseArray = Object.keys(firebaseData).map(key => firebaseData[key]);
        
        // console.log('firebaseArray', firebaseArray);
        // console.log('filmsToRender', filmsToRender);
        console.log('globalFilmData', globalFilmData);
        var imdbFilmArray = _.chain(firebaseData).pluck('imdbID').uniq().value();
        console.log('imdbFilmArray', imdbFilmArray);
        var filteredFilmData = globalFilmData.filter(function(value, index) {
          console.log('$.inArray(value.imdbID, imdbFilmArray)', $.inArray(value.imdbID, imdbFilmArray));
          console.log('imdbID', value.imdbID);
          if ($.inArray(value.imdbID, imdbFilmArray) === -1) {
            return true;
          }
        });
        console.log('firebaseArray', firebaseArray);
        console.log('filteredFilmData', filteredFilmData);
        var concatFilmArray = firebaseArray.concat(filteredFilmData);
        console.log('concatFilmArray',concatFilmArray);
        $('#output').html(searchHbs({'Search': concatFilmArray}));
        $('.stars').rating();
      });    

  });

  $(document).on('click', '.addFilm', function(e) {
		var filmID = this.id;
    var value;
		// console.log('filmID', filmID);
		getFilms.getFilm(filmID)
		.then(function(filmObj) {
	    console.log('filmObj', filmObj);
	    console.log("user", user);
	    addMovie.addMovie(user, filmObj, value);
		});

  $(document).on('click', '.deleteFilm', function(e) {
    getFilms.getFilm(filmID)
    .then(function(filmObj) {
      deleteMovies.deleteMovie(user, filmObj, value);
    });
      console.log('Remove button clicked');
    // Create promise and callback to remove film from Firebase
  }); 

    
  });

});
