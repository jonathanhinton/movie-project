define(function(require) {

	var $ = require('jquery');
	var q = require('q');

      var loginRef = new Firebase("https://movie-history-project.firebaseio.com/");

      var ref = new Firebase("movie-history-project.firebaseio.com");
      var userAuth = ref.getAuth();

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

		}

	}; // End of return statement

}); // End of module definition