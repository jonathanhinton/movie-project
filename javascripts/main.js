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

require(['jquery', 'search', 'getFilms', 'addMovie', 'hbs!../templates/titleSearch','bootstrap-star-rating'], function($, search, getFilms, addMovie, searchHbs, starRating) {

	

	var ref = new Firebase('https://movie-history-project.firebaseio.com');
	var user = ref.getAuth().uid;

  $('#submit').click(function(e) {
    var globalFilmData;
    var globalIds;

    e.preventDefault();

    search.searchFilms()
      .then(function(filmData) {
        globalFilmData = filmData;
        console.log('globalFilmData', globalFilmData);
        $('#output').html(searchHbs(globalFilmData));
        $('.stars').rating();
      }).done();


    search.searchFirebase(user)
    	.then(function(firebaseData) {
    		console.log('firebaseData', firebaseData);
    	})
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

  });

// Inside this function, we want to insert a conditional statement that says 'if you rate this film, then you watched it,'' and the rating gets pushed (along with the film object) to the user's Firebase
  

  $(document).on('rating.change', '.stars', function(e, value, caption) {
    // console.log('value', value);
    var filmID = this.id;
    console.log('filmID', filmID);
    getFilms.getFilm(filmID)
    .then(function(filmObj) {
      addMovie.addMovie(user, filmObj, value)  
    });
      // console.log('value', value);
      // console.log('filmObj.imdbID', filmObj.imdbID);
      // console.log('value', value);
      // if ((ref.child('profiles').child(user).child(this.id)) === (filmObj.imdbID)) {
      //   ref.child('profiles').child(user).child(this.id).child('rating').set(value);
      //   } else {
      //   }
  
    
  });

});
