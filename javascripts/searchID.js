define(require(function() {

	var $ = require('jquery');
	var q = require('q');

	return {

		searchById: function(arrayOfIds) {

			var deferred = q.defer();
			var query = $('#search').val();

			$.ajax({
				type: 'GET',
				url: 'http://www.omdbapi.com/?i=' + query
			}).done( function(idData) {
				deferred.resolve(idData);
				console.log('Data from OMDB API = ', idData);
			})
			.fail( function(xhr, status, error) {
				deferred.reject(error);
			});

			return deferred.promise;

            }

      }; // End of return

})); // End of module definition