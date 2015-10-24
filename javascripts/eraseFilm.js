define(function(require) {

    var $ = require("jquery");
    var ref = new Firebase("https://movie-viewer.firebaseio.com/");

    return {

        eraseFilm : function(user, imdbID) {

            // console.log("trying to erase", imdbID);
            ref.child("users").child(user).child(imdbID).remove();

        },
        hideFilm : function(user, imdbID) {
            ref.child("users").child(user).child(imdbID).child("invisible").set(true);
            console.log("should be hidden");
        }
    };
});