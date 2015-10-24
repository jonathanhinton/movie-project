/* jshint esnext: true */
define(function(require) {

	var $ = require('jquery');
	var q = require('q');
  var inMyLibHbs = require("hbs!../templates/titleInLibrary");
  var loginRef = new Firebase("https://movie-viewer.firebaseio.com/");
  var userAuth = loginRef.getAuth();

  if(userAuth) {
    console.log("Authenticated user with uid:", userAuth.uid);
  }

	return {

		searchFilms: function() {

			var deferred = q.defer();
			var query = $('#search').val();

			$.ajax({
          type: 'GET',
          url: 'http://www.omdbapi.com/?s=' + query
			}).done(function(searchData) {
          deferred.resolve(searchData);
          console.log('Search data from OMDB API = ', searchData);
			}).fail(function(xhr, status, error) {
          deferred.reject(error);
          });

			return deferred.promise;

		},

		searchFirebase: function(uid) {

			var deferred = q.defer();
			var query = $('#search').val();
			var URL = 'https://movie-viewer.firebaseio.com/users';

			$.ajax({
				type: 'GET',
				url: 'https://movie-viewer.firebaseio.com/users/' + uid +'.json'
			}).done(function(firebaseData) {
					deferred.resolve(firebaseData);
					// console.log('Search data from Firebase = ', firebaseData);
			}).fail(function(xhr, status, error) {
				deferred.reject(error);
			});

			return deferred.promise;

		},

    currentState: function(uid) {
      loginRef.child("users/" + uid).on("value", function(snapshot){
        var movies = snapshot.val();
        // console.log("movies", movies);

        var allMoviesArray = Object.keys(movies).map(key => movies[key]);
        // console.log("allMoviesArray", allMoviesArray);
        var allMoviesObject = {movies : allMoviesArray};
        // console.log("allMoviesObject", allMoviesObject);
        var originalMoviesArray = allMoviesArray.slice();

        $("#output").html(inMyLibHbs({'Search' : allMoviesObject.movies}));
      });
    }

	}; // End of return statement

}); // End of module definition