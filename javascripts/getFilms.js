define(function(require) {

	var $ = require('jquery');
	var q = require('q');

	return {

		getFilm: function(filmID) {
		
			var deferred = q.defer();

			$.ajax({
				type: 'GET',
	      url: 'http://www.omdbapi.com/?i=' + filmID
				}).done(function(filmObj) {
					deferred.resolve(filmObj);
					console.log('filmObj', filmObj);
				}).fail(function(xhr, status, error) {
					deffered.reject(error);
			});
		
			return deferred.promise;

		} // End of getFilm definition

	};
	
}); // End of module definition