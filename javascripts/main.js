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

  var ref = new Firebase("https://movie-history-project.firebaseio.com");
  var user = ref.getAuth().uid;

  $('#submit').click(function(e) {
    var globalFilmData;
    var globalIds;

    e.preventDefault();

    search.searchFilms()
    .then(function(filmData) {
      globalFilmData = filmData;
      // console.log('globalFilmData', globalFilmData);
      $('#output').html(searchHbs(globalFilmData));
      $('.stars').rating();
    }).done();
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
  });

  $(document).on('rating.change', '.stars', function(e, value, caption) {
    // console.log('value', value);
    var filmID = this.id;
    console.log('filmID', filmID);
    getFilms.getFilm(filmID)
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
  });

});