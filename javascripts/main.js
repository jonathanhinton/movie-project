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
    'bootstrap-star-rating': '../lib/bower_components/bootstrap-star-rating/js/star-rating.min',
    'seiyria-bootstrap-slider': '../lib/bower_components/seiyria-bootstrap-slider/dist/bootstrap-slider.min'
  },
    shim: {
      'bootstrap': ['jquery'],
      'bootstrap-star-rating': ['bootstrap'],
      'seiyria-bootstrap-slider': ['bootstrap']
    }
});


require(['jquery', 'search', 'getFilms', 'lodash', 'hbs!../templates/titleSearch', 'register', 'login', 'addMovie', 'bootstrap-star-rating', 'seiyria-bootstrap-slider', 'eraseFilm', 'watchedMovie'],
  function($, search, getFilms, _, searchHbs, register, login, addMovie, starRating, bootstrapSlider, eraseFilm, watchedMovie) {
//JONATHAN COMMENT: changing all firebase url's to movie-viewer
  var ref = new Firebase("https://movie-viewer.firebaseio.com");
  var user = ref.getAuth().uid;
  var mySlider = $("input.slider").slider();
  var value = mySlider.slider('getValue');

//LOADS CURRENT STATE SNAPSHOT FROM FIREBASE

  $('#submit').click(function(e) {
    var globalFilmData;
    var firebaseArray = [];

    e.preventDefault();
    search.currentState(user);

    search.searchFilms()
    .then(function(filmData) {
        var globalFilmData = filmData.Search;
        console.log('globalFilmData', globalFilmData);
    // globalFilmData is the array of film objects retrieved from the OMDB API
      //   return search.searchFirebase(user);
      // })
      // .then(function(firebaseData) {
      //   console.log('firebaseData', firebaseData);
      //   firebaseArray = Object.keys(firebaseData).map(key => firebaseData[key]);

      //   console.log('firebaseArray', firebaseArray);
      //   // console.log('filmsToRender', filmsToRender);
      //   console.log('globalFilmData', globalFilmData);
      //   var imdbFilmArray = _.chain(firebaseData).pluck('imdbID').uniq().value();
      //   console.log('imdbFilmArray', imdbFilmArray);
      //   var filteredFilmData = globalFilmData.filter(function(value, index) {
      //     console.log('$.inArray(value.imdbID, imdbFilmArray)', $.inArray(value.imdbID, imdbFilmArray));
      //     console.log('imdbID', value.imdbID);
      //     if ($.inArray(value.imdbID, imdbFilmArray) === -1) {
      //       return true;
      //     }
      //   });
      //   console.log('firebaseArray', firebaseArray);
      //   // console.log('filteredFilmData', filteredFilmData);
      //   var concatFilmArray = firebaseArray.concat(filteredFilmData);
      //   console.log('concatFilmArray',concatFilmArray);
        $('#output').html(searchHbs({'Search': globalFilmData}));
        $('.stars').rating();
      });
  });
//ADD functionality working as of 10/24
  $(document).on('click', '.addFilm', function(e) {
  	var filmID = this.id;
    console.log('userID, filmID', user, filmID);
    getFilms.getOmdbFilm(filmID)
    .then(function(filmObj) {
      console.log('filmObj', filmObj);
      // console.log("user", user);
      addMovie.addMovie(user, filmObj);
    });
    console.log(this);
    $(this).hide();
  });

//RATING functionality marginal as of 10/24
  $(document).on('rating.change', '.stars', function(e, value, caption) {
    // console.log('value', value);
    var filmID = this.id;
    console.log('filmID', filmID);
    getFilms.getUserFilm(user, filmID)
    .then(function(filmObj) {
      addMovie.addRating(user, filmObj, value);
    });
  });

//DELETE functionality working as of 10/24
  $(document).on('click', '.delete-movie', function() {

    // console.log("delete button clicked");
    var filmID = this.id;
    $(this).parent().hide('fast');
    eraseFilm.eraseFilm(user, filmID);
  });

//MAKE INACTIVE IN SEARCH : can hide from the DOM and set a key of invisible to true.
  //   $(document).on('click', '.delete-movie', function() {
  //   // console.log("delete button clicked");
  //   var filmID = this.id;
  //   // eraseFilm.eraseFilm(user, filmID);
  //   eraseFilm.hideFilm(user, filmID);
  //   $(this).parent().hide('fast');
  // });

//WATCHED functionality working as of 10/24
  $(document).on("click", ".watched-movie", function() {

    console.log("watched button clicked");
    var filmID = this.id;
    watchedMovie.watchedMovie(user, this.id);
    console.log(this);
    $(this).find('.glyphicon').removeClass("glyphicon-eye-open").addClass("glyphicon-ok");
    $(this).parent().hide().fadeIn("slow");

  });
  //EXPERIMENTAL SORT FUNCTIONALITY working as of 10/26 (show unwatched)
  $(document).on("click", "#unviewed", function(){
    $(".viewed-true").hide('fast');
    $(".viewed-false").show('fast');
  });
//EXPERIMENTAL SORT FUNCTIONALITY working as of 10/26 (show watched)
  $(document).on("click", "#viewed", function(){
    $(".viewed-true").show('fast');
    $(".viewed-false").hide('fast');
  });
//EXPERIMENTAL SORT FUNCTIONALITY working as of 10/26 (show all Films)
  $(document).on("click", "#allFilms", function(){
    // $(".viewed-true").show('fast');
    // $(".viewed-false").show('fast');
    search.currentState(user);
  });
//LOGOUT FUNCTIONALITY
  $(document).on("click", "#logOut", function(){
    window.location = "/index.html";
  });
});
