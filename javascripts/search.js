define(function(require) {

	var $ = require('jquery');
	var q = require('q');

	return {

		searchFilms: function() {

			var deferred = q.defer();
			var titleQuery = $('#search').val();
			
			$.ajax({
				type: 'GET',
				url: 'http://www.omdbapi.com/?t=' + titleQuery
			}).done(function(data) {
					deferred.resolve(data);
					console.log('Data from OMDB API = ', data);
				})
				.fail(function(xhr, status, error) {
					deferred.reject(error);
				});
			
			return deferred.promise;

		} // End of searchFilms function
	
	}; // End of return statement 

}); // End of module definition