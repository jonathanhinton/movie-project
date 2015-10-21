define(function(require) {

	var $ = require('jquery');
	var q = require('q');

	return {

		searchFilms: function() {

			var deferred = q.defer();
			var query = $('#search').val();


			$.ajax({
				type: 'GET',
				url: 'http://www.omdbapi.com/?s=' + query
			}).done(function(searchData) {
          deferred.resolve(searchData);
          // console.log('Search data from OMDB API = ', searchData);
			}).fail(function(xhr, status, error) {
          deferred.reject(error);
          });

			return deferred.promise;

		},

		searchFirebase: function(uid) {

			var deferred = q.defer();
			var query = $('#search').val();
			var URL = 'https://movie-history-project.firebaseio.com/profiles';

			$.ajax({
				type: 'GET',
				url: 'https://movie-history-project.firebaseio.com/profiles/' + uid +'.json'
			}).done(function(firebaseData) {
					deferred.resolve(firebaseData);
					// console.log('Search data from Firebase = ', firebaseData);
			}).fail(function(xhr, status, error) {
				deferred.reject(error);
			});

			return deferred.promise;

		}		

	}; // End of return statement

}); // End of module definition