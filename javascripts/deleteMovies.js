define(["jquery"], function($) {

  var ref = new Firebase("https://movie-history-project.firebaseio.com/");

  return {

    deleteMovie: function(uid, film, value) {

      var firebaseFilm = {
        Title : film.Title,
        Year : film.Year,
        Actors : film.Actors,
        watched : false,
        rating : value || 0,
        Poster : "http://img.omdbapi.com/?i=" + film.imdbID + "&apikey=8513e0a1"
      };

      ref.child("profiles").child(uid).child(film.imdbID).remove(firebaseFilm);

      console.log("new movie", firebaseFilm);

    }

  };

});
