define(function(require) {

	var $ = require('jquery');

	return {

		addFilm: function(filmObj) {
			$.ajax({
				url: 'https://movie-history-project.firebaseio.com/movie-history-project/',
				method: 'POST',
				data: JSON.stringify(filmObj)
				}).done(function(filmObj) {
					console.log('filmObj', filmObj);
				});			

		} // End of addFilm defintion

	}; // End of return statement

}); // End of module definition