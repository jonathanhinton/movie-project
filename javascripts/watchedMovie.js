define(function(require) {

  var $ = "jquery";
  var ref = new Firebase("https://movie-history-project.firebaseio.com");

  return {

    watchedMovie : function(user,imdbID) {

      console.log("accessed watched movie module");
      console.log("user", user);
      console.log("imdbID", imdbID);
      ref.child("profiles").child(user).child(imdbID).child("watched").set(true);

    }
  };
});