define(function(require) {

  var $ = require("jquery");
  var ref = new Firebase("https://movie-viewer.firebaseio.com");

  return {

    watchedMovie : function(user,imdbID) {

      console.log("accessed watched movie module");
      console.log("user", user);
      console.log("imdbID", imdbID);
      ref.child("users").child(user).child(imdbID).child("watched").set(true);

    }
  };
});
