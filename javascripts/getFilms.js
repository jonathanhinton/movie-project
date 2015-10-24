define(function(require) {

	var $ = require('jquery');
	var q = require('q');

	return {
		getOmdbFilm : function(imdbID) {
      var deferred = q.defer();
      //ajax call using promises
      $.ajax({ url : "http://www.omdbapi.com/?i=" + imdbID + "&y=&plot=short&r=json" }).done(function(myMovie){
        console.log("myMovie", myMovie);
        //return movie object Search key value
        deferred.resolve(myMovie);
      })
    .fail(function(xhr, status, error){
      deferred.reject(error);
    });
    return deferred.promise;


		}, //End of getOmdbFilm defenition
		getUserFilm: function(uid, filmID) {

			var deferred = q.defer();

			$.ajax({
				type: 'GET',
	      url: 'https://movie-viewer.firebaseio.com/users/' + uid +'/' + filmID + '.json'
				}).done(function(filmObj) {
					deferred.resolve(filmObj);
					// console.log('filmObj', filmObj);
				}).fail(function(xhr, status, error) {
					deffered.reject(error);
			});

			return deferred.promise;

		} // End of getFilm definition

	};

}); // End of module definition