define(["jquery"], function($) {

  var ref = new Firebase("https://movie-viewer.firebaseio.com/");

  return {

    addMovie: function(uid, film, value) {

      var firebaseFilm = {
        Title : film.Title,
        Year : film.Year,
        Actors : film.Actors,
        watched : false,
        rating : value || 0,
        Poster : "http://img.omdbapi.com/?i=" + film.imdbID + "&apikey=8513e0a1",
        Added : true,
        imdbID : film.imdbID
      };

      ref.child("users").child(uid).child(film.imdbID).set(firebaseFilm);

      console.log("new movie", firebaseFilm);

    }

  };

});