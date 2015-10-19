define(["jquery"], function($) {

  var ref = new Firebase("https://movie-history-project.firebaseio.com/");

  return {

    addMovie: function(uid, film) {

      var firebaseFilm = {
        title : film.Title,
        year : film.Year,
        actors : film.Actors,
        watched : false,
        rating : 0,
        poster : "http://img.omdbapi.com/?i=" + film.imdbID + "&apikey=8513e0a1"
      };

      ref.child("profiles").child(uid).child(film.imdbID).set(firebaseFilm);

      console.log("new movie", firebaseFilm);

    }

  };

});