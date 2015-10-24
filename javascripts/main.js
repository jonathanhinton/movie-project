/* jshint esnext: true */
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


require(['jquery', 'search', 'getFilms', 'lodash', 'hbs!../templates/titleSearch', 'register', 'login', 'addMovie', 'bootstrap-star-rating', 'eraseFilm', 'watchedMovie'],
  function($, search, getFilms, _, searchHbs, register, login, addMovie, starRating, eraseFilm, watchedMovie) {
//JONATHAN COMMENT: changing all firebase url's to movie-viewer
  var ref = new Firebase("https://movie-viewer.firebaseio.com");
  var user = ref.getAuth().uid;
  search.currentState(user);

  $('#submit').click(function(e) {
    var globalFilmData;
    var firebaseArray = [];

    e.preventDefault();

    search.searchFilms()
    .then(function(filmData) {
        var globalFilmData = filmData.Search;
        console.log('globalFilmData', globalFilmData);
    // globalFilmData is the array of film objects retrieved from the OMDB API
        return search.searchFirebase(user);
      })
      .then(function(firebaseData) {
        console.log('firebaseData', firebaseData);
        firebaseArray = Object.keys(firebaseData).map(key => firebaseData[key]);

        console.log('firebaseArray', firebaseArray);
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
        // console.log('filteredFilmData', filteredFilmData);
        var concatFilmArray = firebaseArray.concat(filteredFilmData);
        console.log('concatFilmArray',concatFilmArray);
        $('#output').html(searchHbs({'Search': concatFilmArray}));
        $('.stars').rating();
      });
  });

  $(document).on('click', '.addFilm', function(e) {
  	var filmID = this.id;
  	console.log('filmID', filmID);
  	getFilms.getFilm(filmID)
  	.then(function(filmObj) {
      // console.log('filmObj', filmObj);
      var user = ref.getAuth().uid;
      // console.log("user", user);
      addMovie.addMovie(user, filmObj);
  	});
    console.log(this);
    $(this).hide();
  });

  $(document).on('rating.change', '.stars', function(e, value, caption) {
    // console.log('value', value);
    var filmID = this.id;
    console.log('filmID', filmID);
    getFilms.getFilm(user, filmID)
    .then(function(filmObj) {
      addMovie.addMovie(user, filmObj, value);
    });
  });

  $(document).on('click', '.delete-movie', function() {

    // console.log("delete button clicked");
    var filmID = this.id;
    eraseFilm.eraseFilm(user, filmID);
    $(this).parent().hide();
  });

  $(document).on("click", ".watched-movie", function() {

    console.log("watched button clicked");
    var filmID = this.id;
    watchedMovie.watchedMovie(user, this.id);
    console.log(this);
    $(this).find('.glyphicon').removeClass("glyphicon-eye-open").addClass("glyphicon-ok");
    $(this).parent().hide().fadeIn("slow");

  });

});


